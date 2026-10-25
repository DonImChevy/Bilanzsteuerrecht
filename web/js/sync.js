// Geräte-Synchronisierung per Sync-Code (ohne Konto). Server: Supabase, siehe server/supabase.sql.
//
// Zusammenführen ohne Doppelzählung:
// • Zähler (Aufgaben je Thema, je Tag) und Klausuren: Jedes Gerät führt seinen eigenen Anteil („eigen“),
//   angezeigt wird die Summe aller Geräte. Was seit dem letzten Abgleich dazukam, ergibt sich aus dem
//   Vergleich mit dem Stand direkt nach dem letzten Abgleich („basis“).
// • Lernkartei (lern) und gewusste Lernkarten: pro Aufgabe gewinnt der neueste Eintrag (Zeitstempel t).
// • Lernpfade (pfad): je Block gewinnt die beste Sternzahl. Einstellungen und „Weiterlernen“ (zuletzt): der neueste Stand.
// • Gelesene Zusammenfassungen (kompakt): Vereinigung, je Thema der neueste Zeitpunkt.
import { SYNC_SERVER } from "./sync-config.js";

export const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // ohne 0/O und 1/I
export const syncVerfuegbar = () => !!(SYNC_SERVER.url && SYNC_SERVER.key);
const zufall = (n) => [...crypto.getRandomValues(new Uint8Array(n))].map((b) => ALPHABET[b % 32]).join("");
/** 16 Zeichen aus 32 = 80 Bit Zufall – nicht zu erraten. */
export const neuerCode = () => zufall(16);
export const neueGeraeteId = () => zufall(10);
export const codeNormal = (t) => String(t || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
export const codeGueltig = (c) => new RegExp(`^[${ALPHABET}]{16}$`).test(c);
export const codeAnzeige = (c) => (c.match(/.{1,4}/g) || []).join("-");

// ---------------------------------------------------------------- Zusammenführen (rein, testbar)

const kopie = (x) => JSON.parse(JSON.stringify(x));
const LEER = () => ({ proThema: {}, tage: {}, klausuren: [] });
const kKey = (k) => `${k.datum}|${k.fach || "bsr"}`;

/** Der zählende Teil eines Lernstands. */
export const beitrag = (stat) => kopie({ proThema: stat.proThema || {}, tage: stat.tage || {}, klausuren: stat.klausuren || [] });

/** Was in `stat` seit `basis` dazugekommen ist (Zähler als Differenz, Klausuren neu oder geändert). */
export function differenz(stat, basis) {
  const b = basis || LEER(), d = LEER();
  for (const [t, z] of Object.entries(stat.proThema || {})) {
    const alt = b.proThema[t] || { b: 0, r: 0 };
    if (z.b !== alt.b || z.r !== alt.r) d.proThema[t] = { b: z.b - alt.b, r: z.r - alt.r };
  }
  for (const [tag, n] of Object.entries(stat.tage || {})) if (n !== (b.tage[tag] || 0)) d.tage[tag] = n - (b.tage[tag] || 0);
  const alt = new Map(b.klausuren.map((k) => [kKey(k), JSON.stringify(k)]));
  d.klausuren = (stat.klausuren || []).filter((k) => alt.get(kKey(k)) !== JSON.stringify(k));
  return d;
}

/** Differenz auf einen Beitrag bzw. Lernstand anwenden (Zähler addieren, Klausuren ersetzen/anhängen). */
export function addiere(ziel, d) {
  const z = kopie(ziel);
  z.proThema ||= {}; z.tage ||= {}; z.klausuren ||= [];
  for (const [t, x] of Object.entries(d.proThema)) {
    const a = z.proThema[t] || { b: 0, r: 0 };
    z.proThema[t] = { b: a.b + x.b, r: a.r + x.r };
  }
  for (const [tag, n] of Object.entries(d.tage)) z.tage[tag] = (z.tage[tag] || 0) + n;
  for (const k of d.klausuren) {
    const i = z.klausuren.findIndex((x) => kKey(x) === kKey(k));
    if (i >= 0) z.klausuren[i] = k; else z.klausuren.push(k);
  }
  return z;
}

/** Pro Schlüssel gewinnt der neuere Eintrag (t). */
export function neuester(a = {}, b = {}) {
  const out = { ...a };
  for (const [id, e] of Object.entries(b)) if (!out[id] || (e.t || 0) > (out[id].t || 0)) out[id] = e;
  return out;
}

/** Lernpfad-Fortschritt {fach: {block: {sterne, t}}} vereinen: je Block die beste Sternzahl, bei Gleichstand der neuere Eintrag. */
export function pfadVereinen(a = {}, b = {}) {
  const out = {};
  for (const quelle of [a, b]) for (const [fach, bloecke] of Object.entries(quelle || {})) {
    out[fach] ||= {};
    for (const [id, e] of Object.entries(bloecke || {})) {
      const da = out[fach][id];
      if (!da || e.sterne > da.sterne || (e.sterne === da.sterne && (e.t || 0) > (da.t || 0))) out[fach][id] = e;
    }
  }
  return out;
}
/** Gelesene Zusammenfassungen {thema: t} vereinen: was auf einem Gerät gelesen wurde, gilt überall als gelesen. */
export function gelesenVereinen(a = {}, b = {}) {
  const out = { ...(a || {}) };
  for (const [id, t] of Object.entries(b || {})) if (!out[id] || t > out[id]) out[id] = t;
  return out;
}
/** Von zwei Ständen mit Zeitstempel t den neueren (Einstellungen, zuletzt). */
export const neuerer = (a, b) => ((b?.t || 0) > (a?.t || 0) ? b : a) ?? null;

/** Änderungen an den gewussten Lernkarten seit `basisKarten` als Einträge {g, t}. */
export function kartenAenderungen(karten = [], basisKarten = null, jetzt = Date.now()) {
  const neu = new Set(karten), alt = new Set(basisKarten || []), out = {};
  for (const id of neu) if (!alt.has(id)) out[id] = { g: true, t: jetzt };
  if (basisKarten) for (const id of alt) if (!neu.has(id)) out[id] = { g: false, t: jetzt };
  return out;
}

/** Gesamtstand aus den Serverdaten: Summe aller Geräte, Lernkartei und Karten wie gespeichert. */
export function gesamt(daten) {
  let s = LEER();
  for (const g of Object.values(daten.geraete || {})) s = addiere(s, { proThema: g.proThema || {}, tage: g.tage || {}, klausuren: g.klausuren || [] });
  s.klausuren.sort((a, b) => a.datum - b.datum);
  return { ...s, lern: daten.lern || {}, karten: Object.entries(daten.karten || {}).filter(([, e]) => e.g).map(([id]) => id),
    pfad: daten.pfad || {}, kompakt: daten.kompakt || {}, einstellungen: daten.einstellungen || null, zuletzt: daten.zuletzt || null };
}

/**
 * Ein Abgleich. stat = aktueller Lernstand, lokal = {code, geraet, eigen, basis, basisKarten},
 * server = {holen(code) → {daten, version} | null, speichern(code, daten, version) → neue Version | null}.
 * Gibt {ergebnis(statJetzt) → neuer Lernstand, lokal} zurück. `ergebnis` bekommt den Lernstand zum Zeitpunkt
 * des Abschlusses, damit Antworten, die während des Abgleichs gegeben wurden, nicht verloren gehen.
 */
export async function abgleichen(stat, lokal, server, jetzt = Date.now()) {
  const vorher = kopie(stat);
  const eigen = addiere(lokal.eigen || LEER(), differenz(vorher, lokal.basis));
  const karten = kartenAenderungen(vorher.karten, lokal.basisKarten, jetzt);
  for (let versuch = 0; versuch < 4; versuch++) {
    const alt = await server.holen(lokal.code);
    const d = alt?.daten || { v: 1, geraete: {}, lern: {}, karten: {} };
    const daten = {
      v: 1,
      geraete: { ...d.geraete, [lokal.geraet]: eigen },
      lern: neuester(d.lern, vorher.lern),
      karten: neuester(d.karten, karten),
      pfad: pfadVereinen(d.pfad, vorher.pfad),
      kompakt: gelesenVereinen(d.kompakt, vorher.kompakt),
      einstellungen: neuerer(d.einstellungen, vorher.einstellungen),
      zuletzt: neuerer(d.zuletzt, vorher.zuletzt),
    };
    const version = await server.speichern(lokal.code, daten, alt?.version || 0);
    if (version == null) continue; // ein anderes Gerät war schneller – neu holen und erneut zusammenführen
    const g = gesamt(daten);
    const neuLokal = { ...lokal, eigen, basis: beitrag(g), basisKarten: g.karten, version, zuletzt: jetzt, fehler: null };
    const ergebnis = (statJetzt) => {
      // Was während des Abgleichs dazukam, obendrauf (wird beim nächsten Abgleich hochgeladen)
      const waehrend = differenz(statJetzt, beitrag(vorher));
      const s = addiere({ ...statJetzt, ...g }, waehrend);
      s.lern = neuester(g.lern, statJetzt.lern);
      s.pfad = pfadVereinen(g.pfad, statJetzt.pfad);
      s.kompakt = gelesenVereinen(g.kompakt, statJetzt.kompakt);
      s.einstellungen = neuerer(g.einstellungen, statJetzt.einstellungen);
      s.zuletzt = neuerer(g.zuletzt, statJetzt.zuletzt);
      const kNeu = kartenAenderungen(statJetzt.karten, vorher.karten, jetzt);
      const kSet = new Set(g.karten);
      for (const [id, e] of Object.entries(kNeu)) if (e.g) kSet.add(id); else kSet.delete(id);
      s.karten = [...kSet];
      s.klausuren.sort((a, b) => a.datum - b.datum);
      return s;
    };
    return { ergebnis, lokal: neuLokal };
  }
  throw new Error("Abgleich nicht möglich – zu viele gleichzeitige Änderungen");
}

// ---------------------------------------------------------------- Server (Supabase REST)

async function rpc(name, body) {
  const kopf = { apikey: SYNC_SERVER.key, "Content-Type": "application/json" };
  if (SYNC_SERVER.key.startsWith("eyJ")) kopf.Authorization = "Bearer " + SYNC_SERVER.key; // älterer anon key (JWT)
  const r = await fetch(`${SYNC_SERVER.url.replace(/\/$/, "")}/rest/v1/rpc/${name}`, { method: "POST", headers: kopf, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`Server ${r.status}`);
  const t = await r.text();
  return t ? JSON.parse(t) : null;
}

export const SERVER = {
  async holen(code) {
    const z = await rpc("sync_holen", { p_code: code });
    return Array.isArray(z) && z.length ? { daten: z[0].daten, version: z[0].version } : null;
  },
  speichern: (code, daten, version) => rpc("sync_speichern", { p_code: code, p_daten: daten, p_version: version }),
  loeschen: (code) => rpc("sync_loeschen", { p_code: code }),
};
