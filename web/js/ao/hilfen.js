// Abgabenordnung – gemeinsame Bausteine der Aufgaben: Frage-Antwort (A), Rechenaufgabe (R), Einordnungsfall (F),
// Multiple-Choice-Fassung (M) und Datumsrechnung für Bekanntgabe und Fristen (§ 108, § 122 Abs. 2 AO, §§ 187 ff. BGB).
import { auswahl, zahl, reihum } from "../kern.js";

export const M = (r, f, frage) => ({ r, f, frage });
export const A = (id, thema, text, antwort, normen, mc, sw, { fall = false } = {}) => ({
  id, thema, mc, sw, erzeugen: () => ({ id, thema, typ: "offen", fall, text, antwort, normen, erklaerung: "", quelle: null }),
});
/** Rechenaufgabe: erzeugen(r) liefert {text, cent, erklaerung, normen}; Rundungsdifferenzen bis 1 Cent zählen als richtig. */
export const R = (id, thema, erzeugen) => ({
  id, thema, kategorie: "rechnen",
  erzeugen: (r) => { const a = erzeugen(r); return { ...zahl(id, thema, a.text, Math.round(a.cent), a.erklaerung, { toleranz: 1 }), normen: a.normen || [] }; },
});
/** Einordnungsfall: zieht reihum einen Fall {text, richtig, erkl, normen, optionen?, frage?} aus einem gemischten Stapel. */
export const F = (id, thema, frage, optionen, faelle) => {
  const ziehe = reihum(faelle);
  return { id, thema, kategorie: "fall", erzeugen: (r) => {
    const f = ziehe(r);
    return { ...auswahl(id, thema, `${f.text}\n\n${f.frage || frage}`, f.optionen || optionen, [f.richtig], f.erkl, r), normen: f.normen || [] };
  } };
};
/** Datumsaufgabe (Bekanntgabe, Fristende): erzeugen(r) liefert {text, richtig, falsch[], erkl, normen}; Antwort per Auswahl. */
export const D = (id, thema, erzeugen) => ({
  id, thema, kategorie: "rechnen",
  erzeugen: (r) => {
    const a = erzeugen(r);
    const falsch = [...new Set(a.falsch)].filter((x) => x !== a.richtig).slice(0, 3);
    return { ...auswahl(id, thema, a.text, [a.richtig, ...falsch], [0], a.erkl, r), normen: a.normen || [] };
  },
});

// ------------------------------------------------------------------ Kalender (UTC, damit keine Zeitzone stört)
// Bundeseinheitliche Feiertage 2026/2027. Den Reformationstag (31.10., in Norddeutschland Feiertag) meiden die Aufgaben.
const FEIERTAGE = new Set(["2026-01-01", "2026-04-03", "2026-04-06", "2026-05-01", "2026-05-14", "2026-05-25", "2026-10-03",
  "2026-12-25", "2026-12-26", "2027-01-01", "2027-03-26", "2027-03-29", "2027-05-01", "2027-05-06", "2027-05-17"]);
const FEIERTAG_NAME = { "01-01": "Neujahr", "04-03": "Karfreitag", "04-06": "Ostermontag", "05-01": "Tag der Arbeit", "05-14": "Christi Himmelfahrt",
  "05-25": "Pfingstmontag", "10-03": "Tag der Deutschen Einheit", "12-25": "1. Weihnachtstag", "12-26": "2. Weihnachtstag" };
const WT = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
export const tagUTC = (j, m, t) => new Date(Date.UTC(j, m - 1, t));
export const iso = (x) => x.toISOString().slice(0, 10);
export const plusTage = (x, n) => new Date(x.getTime() + n * 864e5);
/** Gleicher Tag n Monate später; fehlt der Tag im Zielmonat, der letzte Tag des Monats (§ 188 Abs. 2, 3 BGB). */
export const plusMonate = (x, n) => {
  const j = x.getUTCFullYear(), m = x.getUTCMonth() + n, letzter = new Date(Date.UTC(j, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(j, m, Math.min(x.getUTCDate(), letzter)));
};
export const istFrei = (x) => x.getUTCDay() === 0 || x.getUTCDay() === 6 || FEIERTAGE.has(iso(x));
/** Fällt der Tag auf Samstag, Sonntag oder Feiertag: nächster Werktag (§ 108 Abs. 3 AO). */
export const werktag = (x) => { let y = x; while (istFrei(y)) y = plusTage(y, 1); return y; };
export const kurz = (x) => `${String(x.getUTCDate()).padStart(2, "0")}.${String(x.getUTCMonth() + 1).padStart(2, "0")}.${x.getUTCFullYear()}`;
export const lang = (x) => `${WT[x.getUTCDay()]}, ${kurz(x)}`;
/** „Samstag“, „Sonntag“ oder Name des Feiertags – für die Erklärung. */
export const warumFrei = (x) => FEIERTAG_NAME[iso(x).slice(5)] && FEIERTAGE.has(iso(x)) ? `Feiertag (${FEIERTAG_NAME[iso(x).slice(5)]})` : WT[x.getUTCDay()];
/** Liegt einer der Tage auf dem 31.10.? (Reformationstag – regional unterschiedlich, daher meiden) */
export const reformationstag = (...tage) => tage.some((x) => iso(x).endsWith("-10-31"));
/** Euro-Betrag mit Tausenderpunkt, ohne Cent bei ganzen Beträgen. */
export const eur = (betrag) => betrag.toLocaleString("de-DE", { minimumFractionDigits: Number.isInteger(betrag) ? 0 : 2, maximumFractionDigits: 2 }) + " €";
