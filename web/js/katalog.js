import { VORLAGEN } from "./vorlagen.js";
import { FESTE } from "./feste.js";
import { OER_FRAGEN } from "./oer/fragen.js";
import { KLAUSUR_HAEUFIG } from "./oer/skript.js";
import { OER_UEBERTRAGUNG } from "./oer/uebertragung.js";
import { EST_AUFGABEN } from "./est/aufgaben.js";
import { BSR_TEIL2 } from "./bilr/teil2.js";
import { BSR_TEIL1_ZUSATZ } from "./bilr/teil1_zusatz.js";
import { BBF_AUFGABEN } from "./bilr/bbf.js";
import { UST_AUFGABEN } from "./ust/aufgaben.js";
import { LERNKARTEN as BSR_KARTEN } from "./lernkarten.js";
import { THEMA, pruefungsThemen, imTeil, Zufall, NICHT_IN, themaIn } from "./kern.js";
import { normenAusText } from "./oer/normtext.js";
import { MARKIERUNG } from "./markierungen.js";

// Gesetzestexte zu jeder Aufgabe: Bilanzrecht aus den Zitaten in Text/Erklärung/Fundstelle, beide Module
// ergänzt um die maßgeblichen Fundstellen aus markierungen.js (die dort genannten Sätze werden hervorgehoben).
const mitNormen = (v) => {
  const zusatz = MARKIERUNG[v.id] || "";
  const bsr = ["bsr", "bbf"].includes(THEMA[v.thema].fach);
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

export const ALLE = [...VORLAGEN, ...FESTE, ...OER_FRAGEN, ...OER_UEBERTRAGUNG, ...BSR_TEIL1_ZUSATZ, ...EST_AUFGABEN, ...BSR_TEIL2, ...UST_AUFGABEN, ...BBF_AUFGABEN].map(mitNormen);

export const vorlagenFuer = (thema) => ALLE.filter((v) => v.thema === thema);
export const fachVon = (vorlage) => THEMA[vorlage.thema].fach;

const istBuchung = (v) => v.erzeugen(new Zufall(1)).typ === "buchung";
const BUCHUNGS_IDS = new Set(ALLE.filter(istBuchung).map((v) => v.id));

/**
 * Lernfilter für Buchungssätze: nach der Form (Anzahl der Soll- und Haben-Konten) und nach dem Anlass.
 * klausur = Anteil an allen Buchungssätzen der Lösungen der Semesterklausuren 01/2024–01/2026 (64 Buchungssätze).
 */
export const BUCHUNGS_ARTEN = [
  { id: "einfach", gruppe: "form", titel: "Einfacher Buchungssatz", text: "Ein Konto im Soll an ein Konto im Haben", soll: 1, haben: 1, klausur: 38 },
  { id: "mehrsoll", gruppe: "form", titel: "Mehrere Soll an ein Haben", text: "Typisch: Einkauf mit Vorsteuer, Anschaffung mit Nebenkosten", soll: 3, haben: 1, klausur: 47 },
  { id: "mehrhaben", gruppe: "form", titel: "Ein Soll an mehrere Haben", text: "Typisch: Verkauf mit Umsatzsteuer, Zahlung mit Skonto", soll: 1, haben: 3, klausur: 12 },
  { id: "viele", gruppe: "form", titel: "Mehrere an mehrere", text: "Selten, aber schwer: z. B. Gutschrift mit Gegenkauf", soll: 2, haben: 3, klausur: 3 },
  { id: "berichtigung", gruppe: "anlass", titel: "Berichtigungsbuchungen", text: "Falsch Gebuchtes direkt umbuchen – kein Storno", icon: "stift" },
  { id: "skonto", gruppe: "anlass", titel: "Skonto", text: "Erhaltene und gewährte Skonti mit Steuerkorrektur", icon: "prozent" },
  { id: "lohn", gruppe: "anlass", titel: "Löhne und Gehälter", text: "Gehaltsabrechnung, Vorschuss, Abführung von Steuern und Beiträgen", icon: "person" },
  { id: "privat", gruppe: "anlass", titel: "Entnahmen und Einlagen", text: "Privatkonten, Zahlungen vom Privatkonto", icon: "person" },
  { id: "abschluss", gruppe: "anlass", titel: "Eröffnung und Abschluss", text: "EBK, SBK, GuV, vorbereitende Abschlussbuchungen", icon: "haken" },
];
const ARTEN_VON = new Map();
/** Arten eines Buchungssatz-Generators (Form und Anlass hängen nicht von den gewürfelten Beträgen ab). */
export function buchungsArtenVon(v) {
  if (!ARTEN_VON.has(v.id)) {
    const f = v.erzeugen(new Zufall(1)), l = f.loesungen?.[0], a = new Set();
    if (l) {
      const s = l.soll.length, h = l.haben.length, k = [...l.soll, ...l.haben].map(([x]) => x);
      a.add(s === 1 && h === 1 ? "einfach" : h === 1 ? "mehrsoll" : s === 1 ? "mehrhaben" : "viele");
      if (/Korrektur|Berichtigungsbuchung|voll als .* gebucht/i.test(f.text)) a.add("berichtigung");
      if (k.some((x) => /Skonti$/.test(x))) a.add("skonto");
      if (k.some((x) => x === "privatentnahmen" || x === "privateinlagen")) a.add("privat");
      if (k.some((x) => ["loehne", "sozialeAbgaben", "verbindlichkeitenSV", "forderungenMitarbeiter"].includes(x))) a.add("lohn");
      if (k.some((x) => ["guv", "sbk", "ebk"].includes(x)) || /abschließ|Abschluss/i.test(f.text)) a.add("abschluss");
    }
    ARTEN_VON.set(v.id, a);
  }
  return ARTEN_VON.get(v.id);
}
/** Zahl der Buchungssatz-Typen je Art in den gewählten Themen (ohne im Modul ausgeblendete). */
export function buchungsAnzahl(themen, fach = null) {
  const ohne = NICHT_IN[fach], n = { alle: 0 };
  for (const v of ALLE) {
    if (!themen.includes(v.thema) || !BUCHUNGS_IDS.has(v.id) || ohne?.has(v.id)) continue;
    n.alle++;
    for (const a of buchungsArtenVon(v)) n[a] = (n[a] || 0) + 1;
  }
  return n;
}
/** Klausurfälle (lange Sachverhalte) – im Multiple-Choice-Modus ausgelassen. */
export const FALL_IDS = new Set(ALLE.filter((v) => v.erzeugen(new Zufall(1)).fall).map((v) => v.id));

/**
 * Zieht `anzahl` Aufgaben; jede Vorlage kommt erst wieder dran, wenn alle anderen einmal dran waren.
 * filter: "buchung" (nur Buchungssätze), "buchung:<art>" (Lernfilter, siehe BUCHUNGS_ARTEN), "uebertragung" (ÖR-Übertragungsaufgaben), "qa" (ÖR Frage-Antwort) oder null
 * ohneFaelle: Klausurfälle auslassen (Multiple-Choice-Modus)
 */
/**
 * Gemeinsamer Stand einer Übung bzw. Klausur, damit auch mehrere Ziehungen nacheinander (Klausur: Buchungen, Rechnen,
 * Fälle, Frage-Antwort) keine Frage doppelt liefern: bereits gestellte Fragetexte und wie oft jede Vorlage dran war.
 */
/** fach: Aufgaben, die im Modul ausgeblendet sind (NICHT_IN, z. B. BilBf), werden nicht gezogen. */
export const neueZiehung = (fach = null) => ({ texte: new Set(), n: new Map(), ohne: NICHT_IN[fach] || null });
const textSchluessel = (f) => String(f.text).replace(/\s+/g, " ").trim().toLowerCase();

export function fragen(themen, anzahl, r, filter = null, ohneFaelle = false, z = neueZiehung()) {
  let pool = ALLE.filter((v) => themen.includes(v.thema) && !(ohneFaelle && FALL_IDS.has(v.id)) && !z.ohne?.has(v.id));
  if (filter === true || filter === "buchung") pool = pool.filter((v) => BUCHUNGS_IDS.has(v.id));
  if (typeof filter === "string" && filter.startsWith("buchung:")) pool = pool.filter((v) => BUCHUNGS_IDS.has(v.id) && buchungsArtenVon(v).has(filter.slice(8)));
  if (filter === "uebertragung") pool = pool.filter((v) => v.kategorie === "uebertragung");
  if (filter === "qa") pool = pool.filter((v) => v.kategorie !== "uebertragung" && v.kategorie !== "rechnen" && v.kategorie !== "fall");
  if (filter === "rechnen") pool = pool.filter((v) => v.kategorie === "rechnen");
  if (filter === "fall") pool = pool.filter((v) => v.kategorie === "fall");
  if (!pool.length || anzahl <= 0) return [];
  // Jede Vorlage kommt erst wieder dran, wenn alle anderen einmal dran waren. Feste Aufgaben (immer gleicher Text)
  // gibt es je Übung nur einmal – bei kleinen Themen wird die Übung dann kürzer statt dieselbe Frage zu wiederholen.
  // Erzeugte Aufgaben (neue Zahlen bzw. neuer Fall) dürfen wiederkommen – höchstens dreimal je Übung, möglichst
  // nicht direkt hintereinander und nie mit einem Fragetext, der schon dran war (dann wird neu erzeugt).
  const out = [], leer = new Set(), oft = (v) => z.n.get(v.id) || 0;
  let runde = r.mischen(pool.filter((v) => !(istFest(v) && oft(v)))), letzte = null;
  while (out.length < anzahl) {
    if (!runde.length) {
      runde = r.mischen(pool.filter((v) => !istFest(v) && oft(v) < 3 && !leer.has(v)));
      if (!runde.length) break;
      if (runde.length > 1 && runde[runde.length - 1] === letzte) runde.unshift(runde.pop());
    }
    const v = runde.pop();
    let f = null;
    for (let i = 0; i < 8 && !f; i++) { const x = v.erzeugen(r); if (!z.texte.has(textSchluessel(x))) f = x; }
    if (!f) { leer.add(v); continue; } // liefert nichts Neues mehr – Vorlage für diese Übung erschöpft
    z.texte.add(textSchluessel(f));
    z.n.set(v.id, oft(v) + 1);
    letzte = v;
    out.push(f);
  }
  return out;
}

/** Feste Aufgabe: erzeugt bei jedem Zufall dieselbe Frage (Frage-Antwort, Merksätze) – im Gegensatz zu Rechen- und Fallgeneratoren. */
const FEST = new Map();
export function istFest(v) {
  if (!FEST.has(v.id)) {
    const text = (s) => { const f = v.erzeugen(new Zufall(s)); return JSON.stringify([f.text, [...(f.optionen || [])].sort(), f.loesung, f.loesungen]); };
    FEST.set(v.id, [2, 3, 4].every((s) => text(s) === text(1)));
  }
  return FEST.get(v.id);
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
  const z = neueZiehung(fach); // alle Teilziehungen teilen sich den Stand → keine Frage doppelt
  if (fach === "oer") {
    // Klausurstruktur ÖR: ca. 75 % Frage-Antwort (davon häufige Klausurthemen doppelt gewichtet), 25 % Übertragungsaufgaben
    const ue = fragen(alle, Math.round(anzahl * 0.25), r, "uebertragung", false, z);
    const pool = ALLE.filter((v) => alle.includes(v.thema) && v.kategorie !== "uebertragung" && !(ohneFaelle && FALL_IDS.has(v.id)));
    const qa = gewichtet(pool, anzahl - ue.length, r);
    return r.mischen([...qa, ...ue]);
  }
  if (fach === "est" || fach === "ust") {
    // Klausurstruktur ESt: Gesamtfall-Charakter – ca. 50 % Rechenaufgaben, Rest Einordnungsfälle und Frage-Antwort
    const re = fragen(alle, Math.round(anzahl * 0.5), r, "rechnen", false, z);
    const fa = fragen(alle, Math.round(anzahl * 0.2), r, "fall", false, z);
    const qa = fragen(alle, anzahl - re.length - fa.length, r, "qa", ohneFaelle, z);
    return r.mischen([...re, ...fa, ...qa]);
  }
  if (fach === "bsr" && teil === "beide") {
    // Wie die Semesterklausur: Teil I (Buchführung) ca. 25 %, Teil II (Bilanzierung und Bewertung) ca. 75 %
    const t1 = pruefungsThemen(fach).filter((t) => t.teil === 1).map((t) => t.id), t2 = alle.filter((id) => !t1.includes(id));
    const anz1 = Math.round(anzahl * 0.25), b1 = fragen(t1, Math.ceil(anz1 * 0.6), r, "buchung", false, z);
    const teil1 = [...b1, ...fragen(t1, anz1 - b1.length, r, null, false, z)];
    const b2 = fragen(t2, Math.round((anzahl - anz1) * 0.4), r, "buchung", false, z);
    return r.mischen([...teil1, ...b2, ...fragen(t2, anzahl - anz1 - b2.length, r, null, ohneFaelle, z)]);
  }
  // Teil I: Schwerpunkt Buchungssätze (ca. 60 %); Teil II: ca. 40 % Buchungen, Rest Würdigung und Berechnung
  const b = fragen(alle, Math.ceil(anzahl * (teil === "2" ? 0.4 : 0.6)), r, "buchung", false, z);
  const rest = fragen(alle, anzahl - b.length, r, null, ohneFaelle, z);
  return r.mischen([...b, ...rest]);
}

// Lernkarten: BSR-Karten plus alle offenen ÖR- und ESt-Fragen (Vorderseite Frage, Rückseite Musterantwort)
const OER_KARTEN = [...OER_FRAGEN, ...EST_AUFGABEN.filter((v) => v.mc), ...BSR_TEIL2.filter((v) => v.mc), ...UST_AUFGABEN.filter((v) => v.mc)].map((v) => v.erzeugen(new Zufall(1)))
  .filter((f) => f.typ === "offen")
  .map((f) => ({ id: "k-" + f.id, thema: f.thema, vorne: (f.fall ? "Klausurfall: " : "") + f.text, hinten: f.antwort, normen: f.normen }));

export const LERNKARTEN = [...BSR_KARTEN, ...OER_KARTEN];
export const kartenFuer = (fach) => LERNKARTEN.filter((k) => themaIn(k.thema, fach) && !NICHT_IN[fach]?.has(k.id?.replace(/^k-/, "")));
