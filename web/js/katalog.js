import { VORLAGEN } from "./vorlagen.js";
import { FESTE } from "./feste.js";
import { OER_FRAGEN } from "./oer/fragen.js";
import { KLAUSUR_HAEUFIG } from "./oer/skript.js";
import { OER_UEBERTRAGUNG } from "./oer/uebertragung.js";
import { EST_AUFGABEN } from "./est/aufgaben.js";
import { EST_PUNKTE } from "./est/punkte.js";
import { LERNKARTEN as BSR_KARTEN } from "./lernkarten.js";
import { THEMA, pruefungsThemen, Zufall } from "./kern.js";
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

export const ALLE = [...VORLAGEN, ...FESTE, ...OER_FRAGEN, ...OER_UEBERTRAGUNG, ...EST_AUFGABEN, ...EST_PUNKTE].map(mitNormen);

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
  if (filter === "qa") pool = pool.filter((v) => v.kategorie !== "uebertragung" && v.kategorie !== "rechnen" && v.kategorie !== "fall");
  if (filter === "rechnen") pool = pool.filter((v) => v.kategorie === "rechnen");
  if (filter === "fall") pool = pool.filter((v) => v.kategorie === "fall");
  if (filter === "punkte") pool = pool.filter((v) => v.kategorie === "punkte");
  // Punktesammler: jede Karte nur einmal je Runde (die Sammlung ist noch klein)
  if (filter === "punkte" || themen.every((t) => THEMA[t]?.waechst)) anzahl = Math.min(anzahl, pool.length);
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

export function klausur(anzahl, r, fach = "bsr") {
  const alle = pruefungsThemen(fach).map((t) => t.id);
  if (fach === "oer") {
    // Klausurstruktur ÖR: ca. 75 % Frage-Antwort (davon häufige Klausurthemen doppelt gewichtet), 25 % Übertragungsaufgaben
    const ue = fragen(alle, Math.round(anzahl * 0.25), r, "uebertragung");
    const pool = ALLE.filter((v) => alle.includes(v.thema) && v.kategorie !== "uebertragung");
    const qa = gewichtet(pool, anzahl - ue.length, r);
    return r.mischen([...qa, ...ue]);
  }
  if (fach === "est") {
    // Klausurstruktur ESt: Gesamtfall-Charakter – ca. 50 % Rechenaufgaben, Rest Einordnungsfälle und Frage-Antwort
    const re = fragen(alle, Math.round(anzahl * 0.5), r, "rechnen");
    const fa = fragen(alle, Math.round(anzahl * 0.2), r, "fall");
    const qa = fragen(alle, anzahl - re.length - fa.length, r, "qa");
    return r.mischen([...re, ...fa, ...qa]);
  }
  const b = fragen(alle, Math.ceil(anzahl * 0.6), r, "buchung");
  const rest = fragen(alle, anzahl - b.length, r);
  return r.mischen([...b, ...rest]);
}

// Lernkarten: BSR-Karten plus alle offenen ÖR- und ESt-Fragen (Vorderseite Frage, Rückseite Musterantwort)
const OER_KARTEN = [...OER_FRAGEN, ...EST_AUFGABEN.filter((v) => v.mc), ...EST_PUNKTE].map((v) => v.erzeugen(new Zufall(1)))
  .filter((f) => f.typ === "offen")
  .map((f) => ({ id: "k-" + f.id, thema: f.thema, vorne: (f.punkte ? `🎯 Punktesammler (${f.punkte} P.): ` : f.fall ? "Klausurfall: " : "") + f.text, hinten: f.antwort, normen: f.normen }));

export const LERNKARTEN = [...BSR_KARTEN, ...OER_KARTEN];
export const kartenFuer = (fach) => LERNKARTEN.filter((k) => THEMA[k.thema].fach === fach);
