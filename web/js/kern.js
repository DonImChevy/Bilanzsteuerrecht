import { K } from "./konten.js";
import * as G from "./geld.js";
import { pruefeOffen } from "./offen.js";

export const THEMEN = [
  { id: "buchfuehrungspflicht", titel: "Buchführungspflicht", unter: "§§ 238, 241a HGB, §§ 140, 141 AO", icon: "📕", fach: "bsr", teil: 1 },
  { id: "inventurBilanz", titel: "Inventur, Inventar & Bilanz", unter: "§§ 240, 242, 247, 257 HGB", icon: "📋", fach: "bsr", teil: 1 },
  { id: "bilanzveraenderungen", titel: "Bilanzveränderungen", unter: "Aktivtausch, Passivtausch, Mehrung, Minderung", icon: "⇄", fach: "bsr", teil: 1 },
  { id: "bestandskonten", titel: "Bestandskonten", unter: "Aktiv- und Passivkonten buchen", icon: "🗂️", fach: "bsr", teil: 1 },
  { id: "erfolgskonten", titel: "Erfolgskonten", unter: "Aufwand und Ertrag", icon: "📈", fach: "bsr", teil: 1 },
  { id: "privatkonten", titel: "Privatkonten", unter: "Entnahmen und Einlagen", icon: "👤", fach: "bsr", teil: 1 },
  { id: "warenkonten", titel: "Viergeteiltes Warenkonto", unter: "WBK, WEK, BVK, WVK", icon: "📦", fach: "bsr", teil: 1 },
  { id: "warenunterkonten", titel: "Rabatte, Skonti, Boni & Co.", unter: "Bezugskosten, Rücksendungen, Nachlässe", icon: "％", fach: "bsr", teil: 1 },
  { id: "umsatzsteuer", titel: "Umsatzsteuer & Vorsteuer", unter: "Nettomethode, Entgeltsminderung, Abschluss", icon: "€", fach: "bsr", teil: 1 },
  { id: "abschluss", titel: "Eröffnung & Abschluss", unter: "EBK, SBK, GuV, vorbereitende Buchungen", icon: "✅", fach: "bsr", teil: 1 },
  { id: "kalkulation", titel: "Kalkulation", unter: "Rohgewinn, Aufschlagsätze, Einstandspreis", icon: "🧮", fach: "bsr", teil: 1 },
  { id: "gewinnermittlung", titel: "Gewinnermittlung & GuV/BVV", unter: "§ 4 I 1 EStG, Mehr- und Weniger-Rechnung", icon: "Σ", fach: "bsr", teil: 1 },
  { id: "grundbegriffe", titel: "Grundbegriffe", unter: "Auszahlung, Ausgabe, Aufwand, Kosten", icon: "📖", fach: "bsr", teil: 1 },
  { id: "buecher", titel: "Grund-, Haupt- & Nebenbücher", unter: "Journal, Kassenbericht, Belege", icon: "📚", fach: "bsr", teil: 1 },
  // Bilanzsteuerrecht Teil II (Übungen Teil II, Semesterklausuren)
  { id: "bsr-gob", titel: "GoB, Betriebsvermögen & Bewertung", unter: "§ 252 HGB, § 5 I EStG, R 4.2 EStR, § 4 V Nr. 1 EStG", icon: "🧭", fach: "bsr", teil: 2 },
  { id: "bsr-zurechnung", titel: "Zurechnung & Zugangszeitpunkt", unter: "§ 39 AO, § 246 HGB, § 9a EStDV, § 449 BGB", icon: "🔑", fach: "bsr", teil: 2 },
  { id: "bsr-ak", titel: "Anschaffungskosten", unter: "§ 255 I HGB, § 9b EStG", icon: "🏷️", fach: "bsr", teil: 2 },
  { id: "bsr-grundstueck", titel: "Grundstückserwerb & Gebäude-AfA", unter: "§ 255 HGB, § 7 IV EStG", icon: "🏠", fach: "bsr", teil: 2 },
  { id: "bsr-afa", titel: "Abschreibungen & GWG", unter: "§ 253 III HGB, § 6 II, IIa, § 7 I EStG", icon: "📉", fach: "bsr", teil: 2 },
  { id: "bsr-teilwert", titel: "Teilwert & Wertaufholung", unter: "§ 253 III–V HGB, § 6 I Nr. 1, 2 EStG", icon: "⚖️", fach: "bsr", teil: 2 },
  { id: "bsr-abgrenzung", titel: "Rechnungsabgrenzung & Verbindlichkeiten", unter: "§§ 250, 252, 256a HGB, § 5 V EStG", icon: "📆", fach: "bsr", teil: 2 },
  // Ausbildung (FTA I): Buchführung und Bilanzwesen – eigene Themen; die übrigen Themen teilt BilBf mit Bilanzrecht Teil I (THEMEN_BBF)
  { id: "bbf-afa", titel: "AfA – Grundzüge", unter: "§ 7 I EStG · Digital-AfA · Buchung", icon: "📉", fach: "bbf" },
  { id: "bsr-entnahme-einlage", titel: "Entnahmen & Einlagen", unter: "§ 4 I, § 6 I Nr. 4, 5 EStG", icon: "🔄", fach: "bsr", teil: 2 },
  // Öffentliches Recht (Unterrichtsskript ÖR GS I – Kapitel 1 Staatsrecht und 2 Gesetzgebung)
  { id: "oer-staatsziele", titel: "Staat & Staatsformmerkmale", unter: "Skript 1.3–1.4.1 · Drei-Elemente-Lehre, Art. 20, 28, 79 GG", icon: "📜", fach: "oer" },
  { id: "oer-republik", titel: "Republik, Sozialstaat & Staatsziele", unter: "Skript 1.4.2.4–1.4.2.6 · Art. 20 I, 20a GG", icon: "🏛️", fach: "oer" },
  { id: "oer-demokratie", titel: "Demokratie", unter: "Skript 1.4.2.2 · Art. 20 II, 29, 42 GG", icon: "🗳️", fach: "oer" },
  { id: "oer-rechtsstaat", titel: "Rechtsstaat", unter: "Skript 1.4.2.3 · Gewaltenteilung, Gesetzesvorbehalt, Verhältnismäßigkeit, Rückwirkung", icon: "⚖️", fach: "oer" },
  { id: "oer-bundesstaat", titel: "Bundesstaat", unter: "Skript 1.4.2.1 · Art. 28, 30, 31, 37 GG", icon: "🗺️", fach: "oer" },
  { id: "oer-parteien", titel: "Die Parteien", unter: "Skript 1.5.1.3 · Art. 21 GG, PartG", icon: "🎗️", fach: "oer" },
  { id: "oer-bundestag", titel: "Bundestag, Abgeordnete & Fraktionen", unter: "Skript 1.5.1 · Art. 38–48 GG, GOBT", icon: "🏢", fach: "oer" },
  { id: "oer-wahl", titel: "Wahl zum Bundestag", unter: "Skript 1.5.1.2 · Art. 38 GG, BWahlG", icon: "✉️", fach: "oer" },
  { id: "oer-bundesrat", titel: "Bundesrat", unter: "Skript 1.5.2 · Art. 50–53 GG", icon: "🤝", fach: "oer" },
  { id: "oer-bundespraesident", titel: "Bundespräsident", unter: "Skript 1.5.3 · Art. 54–61, 82 GG", icon: "🎖️", fach: "oer" },
  { id: "oer-bundesregierung", titel: "Bundesregierung", unter: "Skript 1.5.4 · Art. 62–69 GG", icon: "👥", fach: "oer" },
  { id: "oer-bverfg", titel: "Verfassungsorgane & BVerfG", unter: "Skript 1.5, 1.5.5 · Art. 92–94, 100 GG", icon: "🏛", fach: "oer" },
  { id: "oer-gesetzgebung", titel: "Gesetzgebung", unter: "Skript 2 · Art. 70–82, 105, 106 GG", icon: "📝", fach: "oer" },
  { id: "oer-zusatz", titel: "Zusatzwissen", unter: "Nicht im Skript – nicht klausurrelevant", icon: "➕", fach: "oer", zusatz: true },
  // Einkommensteuer (Skripte und Folien GS I, Rechtsstand 2026)
  { id: "est-grundlagen", titel: "Einführung in die ESt", unter: "Steuerart, Erhebungsformen, Rechtsgrundlagen", icon: "📘", fach: "est" },
  { id: "est-steuerpflicht", titel: "Persönliche Steuerpflicht", unter: "§ 1 EStG, §§ 8, 9 AO", icon: "🧑", fach: "est" },
  { id: "est-einkuenfte", titel: "Einkunftsarten", unter: "§ 2 Abs. 1, 2 EStG · Dualismus", icon: "🧾", fach: "est" },
  { id: "est-zve", titel: "Zu versteuerndes Einkommen", unter: "§ 2 Abs. 3–5 EStG · Schema", icon: "Σ", fach: "est" },
  { id: "est-veranlagung", titel: "Veranlagung", unter: "§§ 25, 26, 26a, 26b, 46 EStG", icon: "💍", fach: "est" },
  { id: "est-tarif", titel: "Tarif & festzusetzende ESt", unter: "§§ 32a, 2 Abs. 6, 36 EStG", icon: "📊", fach: "est" },
  { id: "est-einnahmen", titel: "Einnahmen & Steuerbefreiungen", unter: "§§ 8, 3, 3c EStG · Übungsleiter", icon: "💶", fach: "est" },
  { id: "est-ausgaben", titel: "Nicht abziehbare Ausgaben", unter: "§ 12 EStG · gemischte Aufwendungen", icon: "🚫", fach: "est" },
  { id: "est-zufluss", titel: "Zu- und Abfluss", unter: "§ 11 EStG", icon: "📅", fach: "est" },
  { id: "est-werbungskosten", titel: "Werbungskosten", unter: "§§ 9, 9a EStG · Begriff, Pauschbetrag", icon: "💼", fach: "est" },
  { id: "est-arbeitsmittel", titel: "Arbeitsmittel", unter: "§ 9 Abs. 1 S. 3 Nr. 6, 7 EStG · Berufskleidung, AfA, GWG", icon: "💻", fach: "est" },
  { id: "est-homeoffice", titel: "Arbeitszimmer & Home-Office", unter: "§ 4 Abs. 5 S. 1 Nr. 6b, 6c, § 9 Abs. 5 EStG", icon: "🏠", fach: "est" },
  { id: "est-entfernung", titel: "Entfernungspauschale", unter: "§ 9 Abs. 1 S. 3 Nr. 4, Abs. 2, 4 EStG", icon: "🚗", fach: "est" },
  { id: "est-reisekosten", titel: "Reisekosten", unter: "§ 9 Abs. 1 S. 3 Nr. 4a, 5a, Abs. 4a EStG · Auswärtstätigkeit", icon: "🧳", fach: "est" },
  // Umsatzsteuer (Skript GS I, Klausurtechnik, Semesterklausuren; Rechtsstand 2026)
  { id: "ust-grundlagen", titel: "System & Unternehmer", unter: "§§ 1, 2 UStG · Rahmen des Unternehmens", icon: "🏢", fach: "ust" },
  { id: "ust-leistung", titel: "Lieferung & sonstige Leistung", unter: "§ 3 Abs. 1, 9 UStG · Nebenleistungen", icon: "📦", fach: "ust" },
  { id: "ust-ort", titel: "Ort der Leistung", unter: "§ 3 Abs. 6, 7, § 3a, § 1 Abs. 2 UStG", icon: "📍", fach: "ust" },
  { id: "ust-entgelt", titel: "Leistungsaustausch & Prüfschema", unter: "§ 1 Abs. 1 Nr. 1 UStG · Schadensersatz", icon: "🔁", fach: "ust" },
  { id: "ust-befreiung", titel: "Steuerbefreiungen & Option", unter: "§ 4 Nr. 12, 14, 28, § 9 UStG", icon: "🏠", fach: "ust" },
  { id: "ust-bmg", titel: "Bemessungsgrundlage & Steuersatz", unter: "§§ 10, 12 UStG · Anlage 2", icon: "％", fach: "ust" },
  { id: "ust-entstehung", titel: "Entstehung & Änderung", unter: "§§ 13, 13a, 17 UStG · Anzahlungen", icon: "📅", fach: "ust" },
  { id: "ust-vorsteuer", titel: "Vorsteuer & Rechnungen", unter: "§§ 14, 14c, 15 UStG", icon: "🧾", fach: "ust" },
  { id: "ust-wertabgabe", titel: "Unentgeltliche Wertabgaben", unter: "§ 3 Abs. 1b, 9a, § 10 Abs. 4 UStG", icon: "🎁", fach: "ust" },
  { id: "ust-sonder", titel: "Sonderfälle & Kleinunternehmer", unter: "§ 3 Abs. 3, 4, 6a, § 10 Abs. 5, § 19 UStG", icon: "🧩", fach: "ust" },
];
export const THEMA = Object.fromEntries(THEMEN.map((t) => [t.id, t]));

export const FAECHER = {
  bsr: { id: "bsr", titel: "Bilanzsteuerrecht", kurz: "BSR" },
  bbf: { id: "bbf", titel: "Bilanz und Buchführung", kurz: "BilBf" },
  oer: { id: "oer", titel: "Öffentliches Recht", kurz: "ÖR" },
  est: { id: "est", titel: "Einkommensteuer", kurz: "ESt" },
  ust: { id: "ust", titel: "Umsatzsteuer", kurz: "USt" },
};
/**
 * BilBf (Ausbildung FTA I) nutzt die Buchführungsthemen aus Bilanzrecht Teil I mit – in der Reihenfolge des Lehrplans,
 * teils mit angepasstem Titel. Aufgaben, die über den Lehrplan hinausgehen, blendet NICHT_IN aus.
 */
const THEMEN_BBF = [
  ["buchfuehrungspflicht", { unter: "§§ 238, 241a HGB, §§ 140, 141 AO · Beginn und Ende" }],
  ["buecher", { unter: "Grundbuch, Hauptbuch, Belege, Kassenbericht" }],
  ["grundbegriffe", { unter: "Auszahlung, Ausgabe, Aufwand" }],
  ["inventurBilanz", { unter: "§§ 240, 241, 242, 247, 257 HGB · Inventurarten" }],
  ["bilanzveraenderungen", { titel: "Bilanzveränderungen", unter: "BV-Umschichtung und BV-Änderung" }],
  ["bestandskonten"], ["erfolgskonten"],
  ["privatkonten", { unter: "Entnahmen und Einlagen von Geld" }],
  ["umsatzsteuer", { unter: "Umsatzsteuer, Vorsteuer, Abschluss (Grundfälle)" }],
  ["warenkonten"], ["bbf-afa"], ["abschluss"],
  ["gewinnermittlung", { titel: "Betriebsvermögensvergleich", unter: "§ 4 I 1 EStG · Gewinnbegriff" }],
];
export const themenFuer = (fach) => fach === "bbf"
  ? THEMEN_BBF.map(([id, anders]) => ({ ...THEMA[id], ...(anders || {}) }))
  : THEMEN.filter((t) => t.fach === fach);
/** Gehört das Thema (auch) zu diesem Modul? */
export const themaIn = (themaId, fach) => THEMA[themaId]?.fach === fach || (fach === "bbf" && THEMEN_BBF.some(([id]) => id === themaId));
/** Aufgaben gemeinsamer Themen, die über den Lehrplan des Moduls hinausgehen (FTA I: z. B. Skonto, Kostenrechnung, RAP). */
export const NICHT_IN = {
  bbf: new Set([
    "bf-av-verkauf", "ib-aufstellung", "ib-rap", "ib-zinsschuld", "ib-sonstige-ford",
    "gb-zusatzkosten", "gb-neutral", "gb-anderskosten",
    "pk-warenentnahme",
    "us-17", "us-maengel-rueck", "us-skonto-einzelhaendler", "us-skonto-grosshaendler", "us-skonto-r", "us-zahllastkonto",
    "ge-regeln", "ge-methoden", "ge-5-1", "ko-korrektur-kuli", "ko-korrektur-provision", "ko-korrektur-verkauf", "ge-scott",
  ]),
};
/** Vorlage (Aufgabe) gehört zum Modul: Thema passt und sie ist dort nicht ausgeblendet. */
export const vorlageIn = (v, fach) => themaIn(v.thema, fach) && !NICHT_IN[fach]?.has(v.id);
/** Themen für Klausur und gemischte Übungen – ohne „Zusatzwissen“. */
export const pruefungsThemen = (fach) => themenFuer(fach).filter((t) => !t.zusatz);
/** Bilanzrecht ist in Teil I (Buchführung) und Teil II (Bilanzierung und Bewertung) geteilt; teil = "1", "2" oder "beide". */
export const imTeil = (thema, teil = "beide") => teil === "beide" || !thema.teil || String(thema.teil) === String(teil);

// ---------- Zufall (mulberry32, reproduzierbar) ----------
/** Zieht Elemente reihum aus einem gemischten Stapel: jedes kommt dran, bevor sich eines wiederholt (Fallgeneratoren). */
export function reihum(liste) {
  let stapel = [];
  return (r) => {
    if (gleichbleibend) return liste[r.zahl(0, liste.length - 1)]; // Duell: nur vom Startwert abhängig
    if (!stapel.length) stapel = r.mischen(liste.map((_, i) => i));
    return liste[stapel.pop()];
  };
}
let gleichbleibend = false;
/** fn so ausführen, dass erzeugte Aufgaben nur vom Zufallsstartwert abhängen (gleiche Aufgaben auf allen Geräten). */
export function gleichbleibendErzeugen(fn) {
  gleichbleibend = true;
  try { return fn(); } finally { gleichbleibend = false; }
}

export class Zufall {
  constructor(seed) {
    this.s = (seed ?? Math.floor(Math.random() * 2 ** 32)) >>> 0;
  }
  next() {
    let t = (this.s = (this.s + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  zahl(von, bis) {
    return von + Math.floor(this.next() * (bis - von + 1));
  }
  /** Glatter Betrag in Cent: betrag(500, 20000, 100) = 500…20.000 € im 100-€-Raster */
  betrag(von, bis, raster = 100) {
    return this.zahl(Math.floor(von / raster), Math.floor(bis / raster)) * raster * 100;
  }
  wahl(a) {
    return a[Math.floor(this.next() * a.length)];
  }
  muenze() {
    return this.next() < 0.5;
  }
  mischen(a) {
    const b = [...a];
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }
}

// ---------- Buchungssatz ----------
/** satz([["wareneingang", c], ["vorsteuer", c]], [["verbindlichkeitenLuL", c]]) */
export function satz(soll, haben) {
  for (const [k] of [...soll, ...haben]) K(k);
  return { soll, haben };
}
export const einfach = (s, h, c) => satz([[s, c]], [[h, c]]);

export const summe = (posten) => posten.reduce((a, [, c]) => a + c, 0);

export function satzText(s) {
  const f = (p) => p.map(([k, c]) => `${K(k).kurz} ${G.text(c)}`).join(" / ");
  return `${f(s.soll)} an ${f(s.haben)}`;
}

function normalisiert(s) {
  const m = new Map();
  for (const [k, c] of s.soll) m.set("soll|" + k, (m.get("soll|" + k) || 0) + c);
  for (const [k, c] of s.haben) m.set("haben|" + k, (m.get("haben|" + k) || 0) + c);
  return m;
}

/**
 * zeilen: [{id, seite: "soll"|"haben", konto: id|null, betrag: "1.190,00"}]
 * Ergebnis: {korrekt, status: {zeilenId: "richtig"|"betrag"|"konto"|"unvollstaendig"}, erwartet: {zeilenId: cent}, fehlend: [[seite,konto,cent]], loesung}
 */
export function pruefeBuchung(zeilen, loesungen) {
  const ergebnisse = loesungen.map((l) => pruefeEine(zeilen, l));
  const richtig = ergebnisse.find((e) => e.korrekt);
  if (richtig) return richtig;
  const fehler = (e) => Object.values(e.status).filter((s) => s !== "richtig").length + e.fehlend.length;
  return ergebnisse.reduce((a, b) => (fehler(b) < fehler(a) ? b : a));
}

function pruefeEine(zeilen, loesung) {
  const soll = normalisiert(loesung);
  const summen = new Map();
  const unvollstaendig = new Set();
  for (const z of zeilen) {
    const c = G.lesen(z.betrag);
    if (!z.konto || c == null) {
      if (z.konto || (z.betrag && z.betrag.trim())) unvollstaendig.add(z.id);
      continue;
    }
    const key = z.seite + "|" + z.konto;
    summen.set(key, (summen.get(key) || 0) + c);
  }
  const status = {};
  const erwartet = {};
  for (const z of zeilen) {
    if (unvollstaendig.has(z.id)) { status[z.id] = "unvollstaendig"; continue; }
    if (!z.konto) continue;
    const key = z.seite + "|" + z.konto;
    if (soll.has(key)) {
      status[z.id] = summen.get(key) === soll.get(key) ? "richtig" : "betrag";
      erwartet[z.id] = soll.get(key);
    } else {
      status[z.id] = "konto";
    }
  }
  const fehlend = [...soll.entries()]
    .filter(([key]) => !summen.has(key))
    .map(([key, c]) => [...key.split("|"), c]);
  const werte = Object.values(status);
  return { korrekt: werte.length > 0 && werte.every((s) => s === "richtig") && fehlend.length === 0, status, erwartet, fehlend, loesung };
}

// ---------- Fragen ----------
export function leereAntwort(frage) {
  if (frage.typ === "buchung") return { zeilen: [neueZeile("soll"), neueZeile("haben")] };
  if (frage.typ === "auswahl") return { gewaehlt: [] };
  return { text: "" };
}

/** Offene Fragen: automatisch geprüft (Norm + Stichworte) oder selbst bewertet – korrekt = true/false, null = noch nicht bewertet. */
export const istOffen = (frage) => frage.typ === "offen";

let zeilenZaehler = 0;
export function neueZeile(seite) {
  return { id: "z" + ++zeilenZaehler, seite, konto: null, betrag: "" };
}

export function istLeer(frage, antwort) {
  if (frage.typ === "buchung") return antwort.zeilen.every((z) => !z.konto && !z.betrag.trim());
  if (frage.typ === "auswahl") return antwort.gewaehlt.length === 0;
  if (frage.typ === "offen") return false;
  return !antwort.text.trim();
}

export function bewerte(frage, antwort) {
  if (frage.typ === "buchung") {
    const b = pruefeBuchung(antwort.zeilen || [], frage.loesungen);
    return { korrekt: b.korrekt, buchung: b };
  }
  if (frage.typ === "auswahl") {
    const g = [...(antwort.gewaehlt || [])].sort();
    const r = [...frage.richtig].sort();
    return { korrekt: g.length === r.length && g.every((v, i) => v === r[i]) };
  }
  if (frage.typ === "offen") {
    const p = pruefeOffen(frage, antwort.text);
    return p ? { korrekt: p.korrekt, offen: true, auto: p } : { korrekt: null, offen: true };
  }
  const wert = G.lesen(antwort.text);
  if (wert == null) return { korrekt: false, lesbar: false };
  return { korrekt: Math.abs(wert - frage.loesung) <= frage.toleranz, lesbar: true };
}

export function loesungText(frage) {
  if (frage.ganz) return String(frage.loesung / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " " + frage.einheit;
  return frage.einheit === "%" ? G.prozentText(frage.loesung) : G.text(frage.loesung) + " " + frage.einheit;
}

export function typBezeichnung(frage) {
  if (frage.typ === "buchung") return "Buchungssatz";
  if (frage.typ === "auswahl") return frage.richtig.length > 1 ? "Mehrfachauswahl" : "Auswahl";
  if (frage.typ === "offen") return frage.fall ? "Klausurfall" : "Frage – Antwort";
  return "Berechnung";
}

// Fabriken für Fragen
export function buchung(id, thema, text, loesung, erklaerung, { alternativen = [], quelle = null } = {}) {
  return { id, thema, typ: "buchung", text, loesungen: [loesung, ...alternativen], erklaerung, quelle };
}
export function zahl(id, thema, text, loesung, erklaerung, { einheit = "€", toleranz = 1, quelle = null, ganz = false } = {}) {
  return { id, thema, typ: "zahl", text, loesung, einheit, toleranz, erklaerung, quelle, ganz };
}
export function auswahl(id, thema, text, optionen, richtig, erklaerung, r, { quelle = null } = {}) {
  const reihenfolge = r.mischen(optionen.map((_, i) => i));
  return {
    id, thema, typ: "auswahl", text,
    optionen: reihenfolge.map((i) => optionen[i]),
    richtig: reihenfolge.map((i, neu) => (richtig.includes(i) ? neu : -1)).filter((i) => i >= 0),
    erklaerung, quelle,
  };
}
