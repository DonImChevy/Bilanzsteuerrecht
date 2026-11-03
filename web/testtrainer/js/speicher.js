// Local progress (localStorage, this device only) + JSON export/import.
// Spaced repetition on task-type level: wrong or too slow → box 1 (due tomorrow), right and fast → next box.

import { TYPEN } from "./typen.js";

const KEY = "tt.stat.v1";
export const INTERVALLE = [0, 1, 2, 4, 7, 14]; // days per box 1–5
const MAX_FEHLER = 400;

const leer = () => ({ version: 1, typen: {}, tage: {}, fehler: [], boxen: {}, sims: [], plan: {}, einst: { ziel: 40, theme: "system" } });

export function laden(roh = null) {
  try {
    const s = JSON.parse(roh ?? localStorage.getItem(KEY) ?? "null");
    if (s && s.version === 1) return { ...leer(), ...s, einst: { ...leer().einst, ...(s.einst || {}) } };
  } catch (_) { /* fall through */ }
  return leer();
}

export let stat = typeof localStorage === "undefined" ? leer() : laden();
export const statSetzen = (s) => { stat = s; };

export function speichern() {
  try { localStorage.setItem(KEY, JSON.stringify(stat)); } catch (_) { /* private mode etc. */ }
}

export const tag = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const plusTage = (iso, n) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return tag(d); };
export const tageBis = (von, bis) => Math.round((new Date(bis + "T12:00:00") - new Date(von + "T12:00:00")) / 86400000);

/** Record one answer (gewaehlt = -1 for timeout). Returns true when correct. */
export function erfassen(a, gewaehlt, ms, jetzt = new Date()) {
  const typ = a.statTyp, ok = gewaehlt === a.richtig, heute = tag(jetzt);
  const zeit = Math.min(ms, 5 * 60000);
  const t = (stat.typen[typ] ||= { n: 0, r: 0, ms: 0 });
  t.n++; if (ok) t.r++; t.ms += zeit;
  const d = (stat.tage[heute] ||= { n: 0, r: 0, ms: 0, typen: {} });
  d.n++; if (ok) d.r++; d.ms += zeit;
  const dt = (d.typen[typ] ||= [0, 0, 0]);
  dt[0]++; if (ok) dt[1]++; dt[2] += zeit;
  if (!ok) {
    stat.fehler.unshift({ typ: a.typ, statTyp: typ, seed: a.seed, stufe: a.stufe, idx: a.idx ?? null, gewaehlt, richtig: a.richtig, zeit, t: jetzt.getTime() });
    if (stat.fehler.length > MAX_FEHLER) stat.fehler.length = MAX_FEHLER;
  }
  const ziel = (TYPEN[typ]?.zeit ?? 60) * 1000;
  const b = (stat.boxen[typ] ||= { fach: 1, faellig: heute, tag: null });
  if (!ok || zeit > ziel) { b.fach = 1; b.faellig = plusTage(heute, 1); b.tag = heute; }
  else if (b.tag !== heute) { b.fach = Math.min(5, b.fach + 1); b.faellig = plusTage(heute, INTERVALLE[b.fach]); b.tag = heute; }
  speichern();
  return ok;
}

/** A wrong task was solved correctly when repeated → remove it from the error list. */
export function fehlerErledigt(a) {
  stat.fehler = stat.fehler.filter((f) => !(f.typ === a.typ && f.seed === a.seed && f.stufe === a.stufe && (f.idx ?? null) === (a.idx ?? null)));
  speichern();
}

/** Distinct open errors (newest first, one per task). */
export function offeneFehler() {
  const gesehen = new Set();
  return stat.fehler.filter((f) => { const k = `${f.typ}|${f.seed}|${f.stufe}|${f.idx}`; if (gesehen.has(k)) return false; gesehen.add(k); return true; });
}

export const quote = (t) => (t && t.n ? t.r / t.n : null);
export const schnitt = (t) => (t && t.n ? t.ms / t.n / 1000 : null);

/** Weakness score: low hit rate and slow answers relative to the target time. */
export function schwaeche(typ) {
  const t = stat.typen[typ];
  if (!t || t.n < 3) return null;
  return (1 - quote(t)) + Math.max(0, schnitt(t) / TYPEN[typ].zeit - 1) * 0.5;
}

export function schwaechste(n = 3) {
  return Object.keys(TYPEN).map((typ) => [typ, schwaeche(typ)]).filter(([, s]) => s !== null && s > 0.12).sort((a, b) => b[1] - a[1]).slice(0, n).map(([typ]) => typ);
}

export function faelligeTypen(heute = tag()) {
  return Object.entries(stat.boxen).filter(([, b]) => b.faellig <= heute).sort((a, b) => a[1].fach - b[1].fach).map(([typ]) => typ);
}

export function serie(heute = tag()) {
  let n = 0, d = heute;
  if (!stat.tage[d]?.n) d = plusTage(d, -1);
  while (stat.tage[d]?.n) { n++; d = plusTage(d, -1); }
  return n;
}

export const heuteAnzahl = (heute = tag()) => stat.tage[heute]?.n || 0;

export function planErledigt(id, heute = tag()) {
  const l = (stat.plan[heute] ||= []);
  if (!l.includes(id)) l.push(id);
  speichern();
}

export function simSpeichern(ergebnis) {
  stat.sims.unshift(ergebnis);
  stat.sims.length = Math.min(stat.sims.length, 30);
  speichern();
}

export const exportText = () => JSON.stringify({ app: "testtrainer", exportiert: new Date().toISOString(), stat }, null, 1);

export function importText(text) {
  const j = JSON.parse(text);
  const s = laden(JSON.stringify(j.stat ?? j));
  if (!s.typen || !s.tage) throw new Error("Keine gültige Sicherung");
  stat = s;
  speichern();
}

export function zuruecksetzen() {
  const einst = stat.einst;
  stat = { ...leer(), einst };
  speichern();
}
