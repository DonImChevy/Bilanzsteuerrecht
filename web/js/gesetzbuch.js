// Gesetzbuch: vollständige Gesetze (web/gesetze/<g>.json, erzeugt mit tools/gesetzbuch.py) – werden beim ersten
// Öffnen geladen, im Cache „bsr-gesetze“ offline gehalten und in den Normindex aufgenommen (antippbar, Satznummern).
import { GESETZBUCH } from "./gesetzbuch_index.js";
import { registriere } from "./oer/normtext.js";

export { GESETZBUCH };
const GELADEN = new Map(), LAEDT = new Map();
export const CACHE_GESETZE = "bsr-gesetze";

export const imGesetzbuch = (g) => GESETZBUCH.find((x) => x.g === g) || null;
export const gesetzGeladen = (g) => GELADEN.get(g) || null;
const url = (e) => `./gesetze/${e.g}.json?v=${e.v}`;

/** Lädt ein Gesetz (einmal), nimmt seine Paragrafen in den Index auf und liefert {g, titel, stand, gl, normen, …}. */
export function ladeGesetz(g) {
  if (GELADEN.has(g)) return Promise.resolve(GELADEN.get(g));
  if (LAEDT.has(g)) return LAEDT.get(g);
  const e = imGesetzbuch(g);
  if (!e) return Promise.resolve(null);
  const p = fetch(url(e)).then((r) => { if (!r.ok) throw new Error(`Gesetz ${g}: ${r.status}`); return r.json(); }).then((d) => {
    const normen = d.n.map(([nr, titel, gl, abs]) => ({ g, nr, titel, gl, abs: abs.map(([a, text, enden]) => ({ abs: a, text, enden: enden || [] })) }));
    const gesetz = { ...d, normen, pos: new Map(normen.map((n, i) => [n.nr, i])), baum: baum(d.gl, normen) };
    registriere(normen);
    GELADEN.set(g, gesetz);
    return gesetz;
  }).finally(() => LAEDT.delete(g));
  LAEDT.set(g, p);
  return p;
}

/**
 * Gliederung als Baum: Knoten {i, ebene, bez, titel, kinder: [i…], normen: [Index…], von, bis}; Wurzel i = -1.
 * Ein Paragraf gehört zur letzten Gliederungseinheit davor (gl), von/bis = erster und letzter Paragraf im Teilbaum.
 */
function baum(gl, normen) {
  const knoten = new Map([[-1, { i: -1, ebene: 0, bez: "", titel: "", kinder: [], normen: [] }]]);
  const stapel = [knoten.get(-1)];
  gl.forEach(([ebene, bez, titel], i) => {
    const k = { i, ebene, bez, titel, kinder: [], normen: [] };
    while (stapel.length > 1 && stapel[stapel.length - 1].ebene >= ebene) stapel.pop();
    stapel[stapel.length - 1].kinder.push(i);
    stapel.push(k);
    knoten.set(i, k);
  });
  normen.forEach((n, j) => (knoten.get(n.gl) || knoten.get(-1)).normen.push(j));
  const spanne = (k) => {
    const alle = [...k.normen];
    for (const c of k.kinder) { const s = spanne(knoten.get(c)); if (s) alle.push(...s); }
    alle.sort((a, b) => a - b);
    if (alle.length) { k.von = alle[0]; k.bis = alle[alle.length - 1]; }
    return alle.length ? [alle[0], alle[alle.length - 1]] : null;
  };
  spanne(knoten.get(-1));
  // Elternverweis für die Brotkrumen
  for (const k of knoten.values()) for (const c of k.kinder) knoten.get(c).eltern = k.i;
  return knoten;
}

const norma = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss");
/** Suche im ganzen Gesetz: „152“/„§ 152“ trifft die Nummer, sonst Wörter in Überschrift und Text (alle Wörter müssen vorkommen). */
export function sucheImGesetz(gesetz, frage, max = 60) {
  const q = norma(frage.trim()).replace(/^(?:§§?|art\.?)\s*/, "");
  if (!q) return [];
  const nummer = gesetz.normen.findIndex((n) => norma(n.nr) === q);
  const woerter = q.split(/\s+/).filter((w) => w.length > 1);
  const erg = [];
  if (nummer >= 0) erg.push({ j: nummer, stelle: "" });
  if (!woerter.length) return erg;
  gesetz.normen.forEach((n, j) => {
    if (j === nummer || erg.length >= max) return;
    const titel = norma(n.titel), text = norma(n.abs.map((a) => a.text).join(" "));
    if (!woerter.every((w) => titel.includes(w) || text.includes(w))) return;
    const i = text.indexOf(woerter.find((w) => text.includes(w)) || "");
    const roh = n.abs.map((a) => a.text).join(" ").replace(/\s+/g, " ");
    erg.push({ j, titelTreffer: woerter.every((w) => titel.includes(w)), stelle: i >= 0 ? roh.slice(Math.max(0, i - 50), i + 110) : "" });
  });
  return erg.sort((a, b) => (a.stelle === "" ? -1 : b.stelle === "" ? 1 : (b.titelTreffer ? 1 : 0) - (a.titelTreffer ? 1 : 0)));
}

/** Offline: wie viele Gesetze (in der aktuellen Fassung) im Cache liegen. */
export async function offlineStand() {
  if (!("caches" in self)) return { da: 0, alle: GESETZBUCH.length };
  const c = await caches.open(CACHE_GESETZE);
  let da = 0;
  for (const e of GESETZBUCH) if (await c.match(new URL(url(e), location.href).href)) da++;
  return { da, alle: GESETZBUCH.length };
}
/** Alle Gesetze laden (der Service Worker legt sie in den Cache); fortschritt(n, alle) nach jedem Gesetz. */
export async function alleOffline(fortschritt = () => {}) {
  let n = 0;
  for (const e of GESETZBUCH) {
    try { const r = await fetch(url(e)); if (r.ok && "caches" in self) await (await caches.open(CACHE_GESETZE)).put(new URL(url(e), location.href).href, r.clone()); } catch (_) { /* später erneut */ }
    fortschritt(++n, GESETZBUCH.length);
  }
}
