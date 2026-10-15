import { K } from "./konten.js";
import * as G from "./geld.js";

export const THEMEN = [
  { id: "buchfuehrungspflicht", titel: "Buchführungspflicht", unter: "§§ 238, 241a HGB, §§ 140, 141 AO", icon: "📕" },
  { id: "inventurBilanz", titel: "Inventur, Inventar & Bilanz", unter: "§§ 240, 242, 247, 257 HGB", icon: "📋" },
  { id: "bilanzveraenderungen", titel: "Bilanzveränderungen", unter: "Aktivtausch, Passivtausch, Mehrung, Minderung", icon: "⇄" },
  { id: "bestandskonten", titel: "Bestandskonten", unter: "Aktiv- und Passivkonten buchen", icon: "🗂️" },
  { id: "erfolgskonten", titel: "Erfolgskonten", unter: "Aufwand und Ertrag", icon: "📈" },
  { id: "privatkonten", titel: "Privatkonten", unter: "Entnahmen und Einlagen", icon: "👤" },
  { id: "warenkonten", titel: "Viergeteiltes Warenkonto", unter: "WBK, WEK, BVK, WVK", icon: "📦" },
  { id: "warenunterkonten", titel: "Rabatte, Skonti, Boni & Co.", unter: "Bezugskosten, Rücksendungen, Nachlässe", icon: "％" },
  { id: "umsatzsteuer", titel: "Umsatzsteuer & Vorsteuer", unter: "Nettomethode, Entgeltsminderung, Abschluss", icon: "€" },
  { id: "abschluss", titel: "Eröffnung & Abschluss", unter: "EBK, SBK, GuV, vorbereitende Buchungen", icon: "✅" },
  { id: "kalkulation", titel: "Kalkulation", unter: "Rohgewinn, Aufschlagsätze, Einstandspreis", icon: "🧮" },
  { id: "gewinnermittlung", titel: "Gewinnermittlung & GuV/BVV", unter: "§ 4 I 1 EStG, Mehr- und Weniger-Rechnung", icon: "Σ" },
  { id: "grundbegriffe", titel: "Grundbegriffe", unter: "Auszahlung, Ausgabe, Aufwand, Kosten", icon: "📖" },
  { id: "buecher", titel: "Grund-, Haupt- & Nebenbücher", unter: "Journal, Kassenbericht, Belege", icon: "📚" },
];
export const THEMA = Object.fromEntries(THEMEN.map((t) => [t.id, t]));

// ---------- Zufall (mulberry32, reproduzierbar) ----------
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

let zeilenZaehler = 0;
export function neueZeile(seite) {
  return { id: "z" + ++zeilenZaehler, seite, konto: null, betrag: "" };
}

export function istLeer(frage, antwort) {
  if (frage.typ === "buchung") return antwort.zeilen.every((z) => !z.konto && !z.betrag.trim());
  if (frage.typ === "auswahl") return antwort.gewaehlt.length === 0;
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
  const wert = G.lesen(antwort.text);
  if (wert == null) return { korrekt: false, lesbar: false };
  return { korrekt: Math.abs(wert - frage.loesung) <= frage.toleranz, lesbar: true };
}

export function loesungText(frage) {
  return frage.einheit === "%" ? G.prozentText(frage.loesung) : G.text(frage.loesung) + " " + frage.einheit;
}

export function typBezeichnung(frage) {
  if (frage.typ === "buchung") return "Buchungssatz";
  if (frage.typ === "auswahl") return frage.richtig.length > 1 ? "Mehrfachauswahl" : "Auswahl";
  return "Berechnung";
}

// Fabriken für Fragen
export function buchung(id, thema, text, loesung, erklaerung, { alternativen = [], quelle = null } = {}) {
  return { id, thema, typ: "buchung", text, loesungen: [loesung, ...alternativen], erklaerung, quelle };
}
export function zahl(id, thema, text, loesung, erklaerung, { einheit = "€", toleranz = 1, quelle = null } = {}) {
  return { id, thema, typ: "zahl", text, loesung, einheit, toleranz, erklaerung, quelle };
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
