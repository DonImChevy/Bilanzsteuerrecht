// Rückblick (Woche/Monat) und Statistik: reine Auswertungen des Lernstands (testbar).
// Datengrundlage: stat.tage (Aufgaben je Tag), stat.log (je Tag und Thema [bearbeitet, richtig], seit dem Levelsystem-Update),
// stat.stunden (Aufgaben je Tageszeit), stat.erfolge, stat.klausuren.
import { tagesBonus, XP, erfolgVon } from "./level.js";
import { tagSchluessel } from "./aktivitaet.js";

const tagNr = (k) => { const [j, m, t] = k.split("-").map(Number); return Date.UTC(j, m - 1, t) / 864e5; };
const ausNr = (n) => { const d = new Date(n * 864e5); return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`; };
const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

/**
 * Zeitraum: art "woche" (Montag–Sonntag) oder "monat"; versatz 0 = aktuell, −1 = davor …
 * Gibt {von, bis, tage: [Schlüssel], titel} zurück.
 */
export function zeitraum(art, versatz = 0, jetzt = Date.now()) {
  const heute = tagNr(tagSchluessel(jetzt));
  if (art === "monat") {
    const d = new Date(jetzt), m = new Date(Date.UTC(d.getFullYear(), d.getMonth() + versatz, 1));
    const von = m.getTime() / 864e5, bis = Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + 1, 1) / 864e5 - 1;
    return { art, von: ausNr(von), bis: ausNr(bis), tage: Array.from({ length: bis - von + 1 }, (_, i) => ausNr(von + i)), titel: `${MONATE[m.getUTCMonth()]} ${m.getUTCFullYear()}` };
  }
  const wt = (new Date(heute * 864e5).getUTCDay() + 6) % 7; // 0 = Montag
  const von = heute - wt + 7 * versatz, bis = von + 6;
  const f = (n) => new Date(n * 864e5).toLocaleDateString("de-DE", { day: "numeric", month: "short", timeZone: "UTC" });
  return { art, von: ausNr(von), bis: ausNr(bis), tage: Array.from({ length: 7 }, (_, i) => ausNr(von + i)), titel: `${f(von)} – ${f(bis)}` };
}

/** Kennzahlen eines Zeitraums. */
export function auswerten(stat, z) {
  const tage = z.tage.map((k) => ({ k, n: stat.tage?.[k] || 0, log: stat.log?.[k] || null }));
  const aufgaben = tage.reduce((s, t) => s + t.n, 0);
  let b = 0, r = 0;
  const themen = {};
  for (const t of tage) if (t.log) for (const [th, [tb, tr]] of Object.entries(t.log)) { b += tb; r += tr; const x = (themen[th] ||= { b: 0, r: 0 }); x.b += tb; x.r += tr; }
  const xp = tage.reduce((s, t) => {
    if (!t.n) return s;
    const lb = t.log ? Object.values(t.log).reduce((a, [x]) => a + x, 0) : 0, lr = t.log ? Object.values(t.log).reduce((a, [, x]) => a + x, 0) : 0;
    // ohne Protokoll (vor dem Update) mit 75 % richtig geschätzt
    const rr = t.log ? lr + Math.round((t.n - lb) * 0.75) : Math.round(t.n * 0.75);
    return s + rr * XP.richtig + (t.n - rr) * XP.falsch + tagesBonus(t.n);
  }, 0);
  const erfolge = Object.entries(stat.erfolge || {}).filter(([, t]) => { const k = tagSchluessel(t); return k >= z.von && k <= z.bis; }).map(([id]) => erfolgVon(id)).filter(Boolean);
  const klausuren = (stat.klausuren || []).filter((k) => { const d = tagSchluessel(k.datum); return d >= z.von && d <= z.bis; });
  const bester = tage.reduce((m, t) => (t.n > m.n ? t : m), { k: null, n: 0 });
  return {
    aufgaben, lerntage: tage.filter((t) => t.n > 0).length, tage, xp,
    quote: b ? r / b : null, bearbeitetMitLog: b,
    themen: Object.entries(themen).map(([id, x]) => ({ id, ...x, q: x.b ? x.r / x.b : 0 })).sort((a, c) => c.b - a.b),
    erfolge, klausuren, besterTag: bester.n ? bester : null,
  };
}

/** Veränderung gegenüber dem Vorzeitraum in Prozent (null, wenn es keinen Vergleich gibt). */
export const veraenderung = (jetzt, vorher) => (vorher ? Math.round(((jetzt - vorher) / vorher) * 100) : null);

/** Kalender-Heatmap: die letzten `wochen` Wochen (Montag bis Sonntag), je Tag {k, n, zukunft}. */
export function heatmap(stat, wochen = 26, jetzt = Date.now()) {
  const heute = tagNr(tagSchluessel(jetzt)), wt = (new Date(heute * 864e5).getUTCDay() + 6) % 7, start = heute - wt - 7 * (wochen - 1);
  return Array.from({ length: wochen }, (_, w) => Array.from({ length: 7 }, (_, d) => {
    const n = start + w * 7 + d, k = ausNr(n);
    return { k, n: stat.tage?.[k] || 0, zukunft: n > heute };
  }));
}

/** Aufgaben je Woche der letzten `wochen` Wochen (älteste zuerst): [{von, n, r, b}]. */
export function wochenTrend(stat, wochen = 12, jetzt = Date.now()) {
  return Array.from({ length: wochen }, (_, i) => {
    const z = zeitraum("woche", i - wochen + 1, jetzt), a = auswerten(stat, z);
    return { von: z.von, n: a.aufgaben, b: a.bearbeitetMitLog, q: a.quote };
  });
}

/** Aufgaben je Wochentag (Mo–So) über alle Tage. */
export function wochentage(stat) {
  const w = [0, 0, 0, 0, 0, 0, 0];
  for (const [k, n] of Object.entries(stat.tage || {})) w[(new Date(tagNr(k) * 864e5).getUTCDay() + 6) % 7] += n;
  return w;
}

/** Aufgaben je Stunde (0–23). */
export const tageszeiten = (stat) => Array.from({ length: 24 }, (_, h) => stat.stunden?.[h] || 0);

/** Rekorde: meiste Aufgaben an einem Tag, aktivster Monat, beste Klausur. */
export function rekorde(stat) {
  const tage = Object.entries(stat.tage || {});
  const tag = tage.reduce((m, [k, n]) => (n > m.n ? { k, n } : m), { k: null, n: 0 });
  const monate = {};
  for (const [k, n] of tage) monate[k.slice(0, 7)] = (monate[k.slice(0, 7)] || 0) + n;
  const monat = Object.entries(monate).reduce((m, [k, n]) => (n > m.n ? { k, n } : m), { k: null, n: 0 });
  const klausur = (stat.klausuren || []).filter((k) => k.gesamt).reduce((m, k) => (!m || k.richtig / k.gesamt > m.richtig / m.gesamt ? k : m), null);
  return { tag, monat: monat.k ? { ...monat, name: `${MONATE[Number(monat.k.slice(5)) - 1]} ${monat.k.slice(0, 4)}` } : null, klausur, gesamt: tage.reduce((s, [, n]) => s + n, 0) };
}
