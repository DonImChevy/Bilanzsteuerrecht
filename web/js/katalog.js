import { VORLAGEN } from "./vorlagen.js";
import { FESTE } from "./feste.js";
import { OER_FRAGEN } from "./oer/fragen.js";
import { OER_UEBERTRAGUNG } from "./oer/uebertragung.js";
import { LERNKARTEN as BSR_KARTEN } from "./lernkarten.js";
import { THEMA, themenFuer, Zufall } from "./kern.js";
import { normenAusText } from "./oer/normtext.js";

// Bilanzrecht: Gesetzestexte zu jeder Aufgabe – aus den Zitaten in Text/Erklärung/Fundstelle
// und ergänzend dort, wo die Aufgabe inhaltlich auf eine Vorschrift zielt, sie aber nicht nennt.
const ZUSATZ_NORMEN = {
  "wu-einkauf-fracht": ["UStG 15 1"], "wu-anlage-nebenkosten": ["UStG 15 1"],
  "wu-skonto-lieferant": ["UStG 17 1"], "wu-skonto-kunde": ["UStG 17 1"], "wu-bonus-gewaehrt": ["UStG 17 1"],
  "us-skonto-einzelhaendler": ["UStG 17 1"], "us-skonto-grosshaendler": ["UStG 17 1"], "us-skonto-r": ["UStG 17 1"],
  "us-herausrechnen": ["UStG 12 1", "UStG 12 2"],
};
const mitNormen = (v) => {
  if (THEMA[v.thema].fach !== "bsr") return v;
  return { ...v, erzeugen: (r) => {
    const f = v.erzeugen(r);
    if (f.normen?.length) return f;
    const refs = [...normenAusText([f.text, f.erklaerung, f.quelle].join(" ")), ...(ZUSATZ_NORMEN[v.id] || [])];
    return refs.length ? { ...f, normen: [...new Set(refs)] } : f;
  } };
};

export const ALLE = [...VORLAGEN, ...FESTE, ...OER_FRAGEN, ...OER_UEBERTRAGUNG].map(mitNormen);

export const vorlagenFuer = (thema) => ALLE.filter((v) => v.thema === thema);
export const fachVon = (vorlage) => THEMA[vorlage.thema].fach;

const istBuchung = (v) => v.erzeugen(new Zufall(1)).typ === "buchung";
const BUCHUNGS_IDS = new Set(ALLE.filter(istBuchung).map((v) => v.id));

/**
 * Zieht `anzahl` Aufgaben; jede Vorlage kommt erst wieder dran, wenn alle anderen einmal dran waren.
 * filter: "buchung" (nur Buchungssätze), "uebertragung" (ÖR-Übertragungsaufgaben), "qa" (ÖR Frage-Antwort) oder null
 */
export function fragen(themen, anzahl, r, filter = null) {
  let pool = ALLE.filter((v) => themen.includes(v.thema));
  if (filter === true || filter === "buchung") pool = pool.filter((v) => BUCHUNGS_IDS.has(v.id));
  if (filter === "uebertragung") pool = pool.filter((v) => v.kategorie === "uebertragung");
  if (filter === "qa") pool = pool.filter((v) => v.kategorie !== "uebertragung");
  if (!pool.length || anzahl <= 0) return [];
  const out = [];
  let runde = [];
  while (out.length < anzahl) {
    if (!runde.length) runde = r.mischen(pool);
    out.push(runde.pop().erzeugen(r));
  }
  return out;
}

export function klausur(anzahl, r, fach = "bsr") {
  const alle = themenFuer(fach).map((t) => t.id);
  if (fach === "oer") {
    // Klausurstruktur ÖR: ca. 75 % Frage-Antwort, 25 % Übertragungsaufgaben
    const ue = fragen(alle, Math.round(anzahl * 0.25), r, "uebertragung");
    const qa = fragen(alle, anzahl - ue.length, r, "qa");
    return r.mischen([...qa, ...ue]);
  }
  const b = fragen(alle, Math.ceil(anzahl * 0.6), r, "buchung");
  const rest = fragen(alle, anzahl - b.length, r);
  return r.mischen([...b, ...rest]);
}

// Lernkarten: BSR-Karten plus alle offenen ÖR-Fragen (Vorderseite Frage, Rückseite Musterantwort)
const OER_KARTEN = OER_FRAGEN.map((v) => v.erzeugen(new Zufall(1)))
  .filter((f) => f.typ === "offen")
  .map((f) => ({ id: "k-" + f.id, thema: f.thema, vorne: f.text, hinten: f.antwort, normen: f.normen }));

export const LERNKARTEN = [...BSR_KARTEN, ...OER_KARTEN];
export const kartenFuer = (fach) => LERNKARTEN.filter((k) => THEMA[k.thema].fach === fach);
