import { VORLAGEN } from "./vorlagen.js";
import { FESTE } from "./feste.js";
import { OER_FRAGEN } from "./oer/fragen.js";
import { KLAUSUR_HAEUFIG } from "./oer/skript.js";
import { OER_UEBERTRAGUNG } from "./oer/uebertragung.js";
import { EST_AUFGABEN } from "./est/aufgaben.js";
import { BSR_TEIL2 } from "./bilr/teil2.js";
import { BSR_TEIL1_ZUSATZ } from "./bilr/teil1_zusatz.js";
import { UST_AUFGABEN } from "./ust/aufgaben.js";
import { LERNKARTEN as BSR_KARTEN } from "./lernkarten.js";
import { THEMA, pruefungsThemen, imTeil, Zufall } from "./kern.js";
import { normenAusText } from "./oer/normtext.js";
import { MARKIERUNG } from "./markierungen.js";

// Gesetzestexte zu jeder Aufgabe: Bilanzrecht aus den Zitaten in Text/Erklärung/Fundstelle, beide Module
// ergänzt um die maßgeblichen Fundstellen aus markierungen.js (die dort genannten Sätze werden hervorgehoben).
const mitNormen = (v) => {
  const zusatz = MARKIERUNG[v.id] || "";
  const bsr = THEMA[v.thema].fach === "bsr";
  if (!bsr && !zusatz) return v;
  return { ...v, erzeugen: (r) => {
    const f = v.erzeugen(r);
    const vorhanden = f.normen || [];
    const kopf = (ref) => ref.split(" ").slice(0, 2).join(" ");
    const neu = normenAusText(bsr && !vorhanden.length ? [f.text, f.erklaerung, f.quelle, zusatz].join(" ") : zusatz)
      .filter((ref) => !vorhanden.some((x) => x === ref || x === kopf(ref))); // ganzer Paragraf schon da → nichts ergänzen
    const normen = [...vorhanden, ...neu];
    return normen.length ? { ...f, normen, zusatzZitate: zusatz } : f;
  } };
};

export const ALLE = [...VORLAGEN, ...FESTE, ...OER_FRAGEN, ...OER_UEBERTRAGUNG, ...BSR_TEIL1_ZUSATZ, ...EST_AUFGABEN, ...BSR_TEIL2, ...UST_AUFGABEN].map(mitNormen);

export const vorlagenFuer = (thema) => ALLE.filter((v) => v.thema === thema);
export const fachVon = (vorlage) => THEMA[vorlage.thema].fach;

const istBuchung = (v) => v.erzeugen(new Zufall(1)).typ === "buchung";
const BUCHUNGS_IDS = new Set(ALLE.filter(istBuchung).map((v) => v.id));
/** Klausurfälle (lange Sachverhalte) – im Multiple-Choice-Modus ausgelassen. */
export const FALL_IDS = new Set(ALLE.filter((v) => v.erzeugen(new Zufall(1)).fall).map((v) => v.id));

/**
 * Zieht `anzahl` Aufgaben; jede Vorlage kommt erst wieder dran, wenn alle anderen einmal dran waren.
 * filter: "buchung" (nur Buchungssätze), "uebertragung" (ÖR-Übertragungsaufgaben), "qa" (ÖR Frage-Antwort) oder null
 * ohneFaelle: Klausurfälle auslassen (Multiple-Choice-Modus)
 */
export function fragen(themen, anzahl, r, filter = null, ohneFaelle = false) {
  let pool = ALLE.filter((v) => themen.includes(v.thema) && !(ohneFaelle && FALL_IDS.has(v.id)));
  if (filter === true || filter === "buchung") pool = pool.filter((v) => BUCHUNGS_IDS.has(v.id));
  if (filter === "uebertragung") pool = pool.filter((v) => v.kategorie === "uebertragung");
  if (filter === "qa") pool = pool.filter((v) => v.kategorie !== "uebertragung" && v.kategorie !== "rechnen" && v.kategorie !== "fall");
  if (filter === "rechnen") pool = pool.filter((v) => v.kategorie === "rechnen");
  if (filter === "fall") pool = pool.filter((v) => v.kategorie === "fall");
  if (!pool.length || anzahl <= 0) return [];
  const out = [];
  let runde = [];
  while (out.length < anzahl) {
    if (!runde.length) runde = r.mischen(pool);
    out.push(runde.pop().erzeugen(r));
  }
  return out;
}

/** Zieht `anzahl` verschiedene Vorlagen; in den Altklausuren häufig geprüfte Themen zählen doppelt. */
function gewichtet(pool, anzahl, r) {
  const rest = [...pool], out = [];
  while (out.length < anzahl && rest.length) {
    const gewicht = (v) => (KLAUSUR_HAEUFIG.has(v.id) ? 2 : 1);
    let x = r.next() * rest.reduce((s, v) => s + gewicht(v), 0);
    let i = 0;
    while ((x -= gewicht(rest[i])) > 0) i++;
    out.push(rest.splice(i, 1)[0].erzeugen(r));
  }
  return out;
}

export function klausur(anzahl, r, fach = "bsr", ohneFaelle = false, teil = "beide") {
  const alle = pruefungsThemen(fach).filter((t) => imTeil(t, teil)).map((t) => t.id);
  if (fach === "oer") {
    // Klausurstruktur ÖR: ca. 75 % Frage-Antwort (davon häufige Klausurthemen doppelt gewichtet), 25 % Übertragungsaufgaben
    const ue = fragen(alle, Math.round(anzahl * 0.25), r, "uebertragung");
    const pool = ALLE.filter((v) => alle.includes(v.thema) && v.kategorie !== "uebertragung" && !(ohneFaelle && FALL_IDS.has(v.id)));
    const qa = gewichtet(pool, anzahl - ue.length, r);
    return r.mischen([...qa, ...ue]);
  }
  if (fach === "est" || fach === "ust") {
    // Klausurstruktur ESt: Gesamtfall-Charakter – ca. 50 % Rechenaufgaben, Rest Einordnungsfälle und Frage-Antwort
    const re = fragen(alle, Math.round(anzahl * 0.5), r, "rechnen");
    const fa = fragen(alle, Math.round(anzahl * 0.2), r, "fall");
    const qa = fragen(alle, anzahl - re.length - fa.length, r, "qa", ohneFaelle);
    return r.mischen([...re, ...fa, ...qa]);
  }
  if (fach === "bsr" && teil === "beide") {
    // Wie die Semesterklausur: Teil I (Buchführung) ca. 25 %, Teil II (Bilanzierung und Bewertung) ca. 75 %
    const t1 = pruefungsThemen(fach).filter((t) => t.teil === 1).map((t) => t.id), t2 = alle.filter((id) => !t1.includes(id));
    const anz1 = Math.round(anzahl * 0.25), b1 = fragen(t1, Math.ceil(anz1 * 0.6), r, "buchung");
    const teil1 = [...b1, ...fragen(t1, anz1 - b1.length, r)];
    const b2 = fragen(t2, Math.round((anzahl - anz1) * 0.4), r, "buchung");
    return r.mischen([...teil1, ...b2, ...fragen(t2, anzahl - anz1 - b2.length, r, null, ohneFaelle)]);
  }
  // Teil I: Schwerpunkt Buchungssätze (ca. 60 %); Teil II: ca. 40 % Buchungen, Rest Würdigung und Berechnung
  const b = fragen(alle, Math.ceil(anzahl * (teil === "2" ? 0.4 : 0.6)), r, "buchung");
  const rest = fragen(alle, anzahl - b.length, r, null, ohneFaelle);
  return r.mischen([...b, ...rest]);
}

// Lernkarten: BSR-Karten plus alle offenen ÖR- und ESt-Fragen (Vorderseite Frage, Rückseite Musterantwort)
const OER_KARTEN = [...OER_FRAGEN, ...EST_AUFGABEN.filter((v) => v.mc), ...BSR_TEIL2.filter((v) => v.mc), ...UST_AUFGABEN.filter((v) => v.mc)].map((v) => v.erzeugen(new Zufall(1)))
  .filter((f) => f.typ === "offen")
  .map((f) => ({ id: "k-" + f.id, thema: f.thema, vorne: (f.fall ? "Klausurfall: " : "") + f.text, hinten: f.antwort, normen: f.normen }));

export const LERNKARTEN = [...BSR_KARTEN, ...OER_KARTEN];
export const kartenFuer = (fach) => LERNKARTEN.filter((k) => THEMA[k.thema].fach === fach);
