// Denkfehler-Radar: erkennt bei einer falschen Buchung das typische Fehlermuster (regelbasiert, ohne KI)
// und erklärt es in einem Satz mit Rückfrage. Rein und getestet.
import { KONTEN } from "./konten.js";
import * as G from "./geld.js";

const art = (k) => KONTEN[k]?.art;
const name = (k) => KONTEN[k]?.kurz || k;
const STEUER = ["vorsteuer", "umsatzsteuer"];
/** Leicht verwechselbare Konten (gleiche Seite, gleicher Betrag, falsches Konto). */
const PAARE = [
  ["forderungenLuL", "sonstigeForderungen"], ["verbindlichkeitenLuL", "sonstigeVerbindlichkeiten"], ["arap", "sonstigeForderungen"], ["prap", "sonstigeVerbindlichkeiten"],
  ["wareneingang", "warenbestand"], ["erhalteneSkonti", "gewaehrteSkonti"], ["preisnachlaesse", "erloesschmaelerungen"], ["erhalteneBoni", "gewaehrteBoni"],
  ["zinsaufwendungen", "zinsertraege"], ["mietaufwendungen", "mietertraege"], ["vorsteuer", "umsatzsteuer"], ["kasse", "bank"],
  ["privatentnahmen", "privateinlagen"], ["afa", "ausserplanmaessigeAbschreibung"], ["gwg", "bga"], ["darlehensverbindlichkeiten", "verbindlichkeitenLuL"],
];
const istPaar = (a, b) => PAARE.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

/** Benutzerzeilen → { soll: Map(konto → cent), haben: Map } (nur vollständige Zeilen). */
function lesen(zeilen) {
  const m = { soll: new Map(), haben: new Map() };
  for (const z of zeilen || []) {
    const c = G.lesen(z.betrag);
    if (!z.konto || c == null) continue;
    m[z.seite].set(z.konto, (m[z.seite].get(z.konto) || 0) + c);
  }
  return m;
}
const alsMap = (l) => { const m = new Map(); for (const [k, c] of l) m.set(k, (m.get(k) || 0) + c); return m; };

/**
 * Diagnose einer falschen Buchung. zeilen = Benutzerzeilen, loesung = { soll: [[konto, cent]], haben: [...] }.
 * Ergebnis: [{ id, titel, text, frage, antwort }] (höchstens 2, wichtigste zuerst).
 */
export function diagnose(zeilen, loesung) {
  const u = lesen(zeilen), l = { soll: alsMap(loesung.soll), haben: alsMap(loesung.haben) }, d = [];
  const add = (id, titel, text, frage, antwort) => { if (!d.some((x) => x.id === id)) d.push({ id, titel, text, frage, antwort }); };
  const uAlle = [...u.soll.keys(), ...u.haben.keys()];
  if (!uAlle.length) return [];
  const gleich = (a, b) => a.size === b.size && [...a].every(([k, c]) => b.get(k) === c);

  // 1. Soll und Haben vertauscht (ganz oder einzelne Konten)
  if (gleich(u.soll, l.haben) && gleich(u.haben, l.soll)) add("seiten", "Soll und Haben vertauscht",
    "Alle Konten und Beträge stimmen – aber jeweils auf der falschen Seite.", "Nimmt das erste Konto zu oder ab – und ist es ein Aktiv- oder Passivkonto?",
    "Aktivkonten und Aufwand nehmen im Soll zu, Passivkonten, Eigenkapital und Erträge im Haben.");
  else for (const s of ["soll", "haben"]) {
    const g = s === "soll" ? "haben" : "soll";
    for (const k of u[s].keys()) if (!l[s].has(k) && l[g].has(k)) add("seite-" + k, `${name(k)} auf der falschen Seite`,
      `${name(k)} gehört hier ins ${g === "soll" ? "Soll" : "Haben"}.`, `Nimmt ${name(k)} durch den Vorgang zu oder ab?`,
      art(k) === "aktiv" || art(k) === "aufwand" ? `${name(k)} ist ein ${art(k) === "aktiv" ? "Aktivkonto" : "Aufwandskonto"}: Zugänge im Soll, Abgänge im Haben.` : `${name(k)} ist ein ${{ passiv: "Passivkonto", ertrag: "Ertragskonto", eigenkapital: "Kapitalkonto", privat: "Privatkonto" }[art(k)] || "Konto"}: Zugänge im Haben, Abgänge im Soll (Entnahmen im Soll).`);
  }

  // 2. Umsatzsteuer/Vorsteuer: brutto statt netto, Steuer vergessen, 19 % vom Brutto
  for (const st of STEUER) {
    const s = l.soll.has(st) ? "soll" : l.haben.has(st) ? "haben" : null;
    if (!s) continue;
    const steuer = l[s].get(st), uSteuer = u[s].get(st) ?? u[s === "soll" ? "haben" : "soll"].get(st);
    if (uSteuer == null) {
      // Bruttobetrag auf einem anderen Konto derselben Seite?
      const brutto = [...u[s]].find(([k, c]) => l[s].has(k) && c === l[s].get(k) + steuer);
      if (brutto) add("brutto", "Brutto statt netto gebucht", `Du hast ${name(brutto[0])} mit dem Bruttobetrag gebucht und die ${name(st)} weggelassen.`,
        `Welcher Teil des Rechnungsbetrags ist für den Unternehmer gar kein ${st === "vorsteuer" ? "Aufwand bzw. keine Anschaffungskosten" : "Erlös"}?`,
        st === "vorsteuer" ? "Die Vorsteuer – sie ist eine Forderung gegenüber dem Finanzamt (vgl. § 15 Abs. 1 Nr. 1 UStG); gebucht wird netto (vgl. § 9b Abs. 1 EStG)." : "Die Umsatzsteuer – sie ist eine Schuld gegenüber dem Finanzamt; Erlös ist nur das Nettoentgelt (vgl. § 10 Abs. 1 UStG).");
      else add("steuer-fehlt", `${name(st)} fehlt`, `In der Lösung steht ${name(st)} ${G.text(steuer)} – bei dir fehlt die Steuer ganz.`,
        st === "vorsteuer" ? "Ist der Unternehmer zum Vorsteuerabzug berechtigt und liegt eine Rechnung vor?" : "Ist der Umsatz steuerbar und steuerpflichtig?",
        st === "vorsteuer" ? "Dann wird die ausgewiesene Steuer als Vorsteuer gesondert gebucht (vgl. § 15 Abs. 1 Nr. 1 UStG)." : "Dann schuldet der Unternehmer die Umsatzsteuer – sie wird gesondert auf dem Konto Umsatzsteuer gebucht.");
    } else if (uSteuer !== steuer) {
      const netto = [...l[s]].filter(([k]) => k !== st).reduce((a, [, c]) => a + c, 0);
      const rate = Math.round((steuer / netto) * 100);
      if (rate && Math.abs(uSteuer - Math.round((netto + steuer) * rate / 100)) <= 1) add("vom-brutto", `${rate} % vom Bruttobetrag gerechnet`,
        `Die Steuer hast du vom Bruttobetrag berechnet (${G.text(uSteuer)} statt ${G.text(steuer)}).`, "Wie zieht man die Steuer aus einem Bruttobetrag heraus?",
        `Brutto × ${rate}/${100 + rate} – nicht brutto × ${rate} %.`);
    }
  }

  // 3. Privat ↔ betrieblich
  const ent = l.soll.get("privatentnahmen");
  if (ent != null && !u.soll.has("privatentnahmen")) {
    const a = [...u.soll].find(([k, c]) => art(k) === "aufwand" && c === ent);
    if (a) add("privat-als-aufwand", "Privates als Aufwand gebucht", `${name(a[0])} ist hier falsch – der Vorgang ist privat veranlasst.`,
      "Wem kommt die Ausgabe zugute – dem Betrieb oder dem Unternehmer privat?", "Privat veranlasst → Entnahme (Privatentnahmen im Soll). Entnahmen mindern das Eigenkapital, aber nicht den Gewinn (vgl. § 4 Abs. 1 EStG).");
  }
  const ein = l.haben.get("privateinlagen");
  if (ein != null && !u.haben.has("privateinlagen")) {
    const z = [...u.haben].find(([k, c]) => (k === "bank" || k === "kasse") && c === ein);
    if (z) add("einlage-ueber-bank", "Privat bezahlt – aber über das Geschäftskonto gebucht", `Das Geld kam nicht aus der Kasse bzw. vom Geschäftskonto, sondern aus dem Privatvermögen.`,
      "Von welchem Konto wurde wirklich bezahlt?", "Zahlt der Unternehmer aus privaten Mitteln, ist die Gegenbuchung Privateinlagen (vgl. § 4 Abs. 1 EStG).");
  }
  for (const [k, c] of l.soll) if (art(k) === "aufwand" && u.soll.get("privatentnahmen") === c && !u.soll.has(k)) add("aufwand-als-privat", "Betriebliches als Entnahme gebucht",
    `${name(k)} ist betrieblich veranlasst – keine Entnahme.`, "Dient die Ausgabe dem Betrieb?", "Betrieblich veranlasst → Aufwand; Entnahmen sind nur privat veranlasste Vorgänge.");

  // 4. Aktivieren ↔ Aufwand
  for (const [k, c] of l.soll) {
    if (art(k) === "aktiv" && k !== "vorsteuer" && !u.soll.has(k)) {
      const a = [...u.soll].find(([x, cc]) => art(x) === "aufwand" && cc === c);
      if (a) add("aufwand-statt-aktiv", "Anschaffung als Aufwand gebucht", `${name(k)} bleibt im Betrieb und wird genutzt – das ist (zunächst) kein Aufwand.`,
        "Ist das Wirtschaftsgut am Jahresende noch vorhanden?", "Dann wird es mit den Anschaffungskosten aktiviert (vgl. § 253 Abs. 1 S. 1 HGB, § 6 Abs. 1 Nr. 1 EStG); Aufwand entsteht erst über die AfA.");
    }
    if (art(k) === "aufwand" && !u.soll.has(k)) {
      const a = [...u.soll].find(([x, cc]) => art(x) === "aktiv" && x !== "vorsteuer" && cc === c && !l.soll.has(x));
      if (a) add("aktiv-statt-aufwand", "Verbrauch aktiviert", `${name(a[0])} ist hier falsch – das Geld ist für ${name(k)} verbraucht.`,
        "Bleibt etwas Bleibendes im Betrieb?", "Nein → Aufwand; aktiviert wird nur, was am Bilanzstichtag noch als Wirtschaftsgut vorhanden ist.");
    }
  }

  // 5. Verwechselte Konten (gleiche Seite, gleicher Betrag)
  for (const s of ["soll", "haben"]) for (const [k, c] of u[s]) {
    if (l[s].has(k)) continue;
    const r = [...l[s]].find(([x, cc]) => cc === c && istPaar(x, k) && !u[s].has(x));
    if (r) add("paar-" + r[0], `${name(k)} statt ${name(r[0])}`, `Die Konten werden leicht verwechselt.`, `Was unterscheidet ${name(k)} von ${name(r[0])}?`,
      KONTEN[r[0]]?.hinweis ? `${name(r[0])}: ${KONTEN[r[0]].hinweis}` : `${name(r[0])} ist hier das richtige Konto (${KONTEN[r[0]]?.artName || ""}).`);
  }

  // 6. Summen ungleich
  const summe = (m) => [...m.values()].reduce((a, c) => a + c, 0);
  if (!d.length && u.soll.size && u.haben.size && summe(u.soll) !== summe(u.haben)) add("summe", "Soll ≠ Haben",
    `Deine Sollseite ergibt ${G.text(summe(u.soll))}, die Habenseite ${G.text(summe(u.haben))}.`, "Was gilt bei jedem Buchungssatz?", "Summe Soll = Summe Haben – keine Buchung ohne Gegenbuchung.");
  return d.slice(0, 2);
}

/** Familien für „Deine Denkfehler“ (Diagnose-IDs zusammengefasst). */
export const FAMILIE = (id) => (id.startsWith("seite") ? "seiten" : id.startsWith("paar-") ? "verwechslung" : id);
export const FAMILIEN = {
  seiten: "Soll und Haben vertauscht", brutto: "Brutto statt netto", "steuer-fehlt": "Vorsteuer bzw. USt vergessen", "vom-brutto": "Steuer vom Bruttobetrag",
  "privat-als-aufwand": "Privates als Aufwand", "einlage-ueber-bank": "Privat bezahlt, über Bank gebucht", "aufwand-als-privat": "Betriebliches als Entnahme",
  "aufwand-statt-aktiv": "Anschaffung als Aufwand", "aktiv-statt-aufwand": "Verbrauch aktiviert", verwechslung: "Konten verwechselt", summe: "Soll ≠ Haben",
};
/** Passt eine Musterlösung zu einer Denkfehler-Familie? (für „Gezielt üben“) */
export function provoziert(fam, loesung) {
  const k = [...loesung.soll, ...loesung.haben].map(([x]) => x);
  if (fam === "brutto" || fam === "steuer-fehlt" || fam === "vom-brutto") return k.some((x) => STEUER.includes(x));
  if (fam === "privat-als-aufwand" || fam === "aufwand-als-privat") return k.includes("privatentnahmen");
  if (fam === "einlage-ueber-bank") return k.includes("privateinlagen");
  if (fam === "aufwand-statt-aktiv") return loesung.soll.some(([x]) => art(x) === "aktiv" && x !== "vorsteuer" && !["kasse", "bank"].includes(x));
  if (fam === "aktiv-statt-aufwand") return loesung.soll.some(([x]) => art(x) === "aufwand");
  return true;
}
