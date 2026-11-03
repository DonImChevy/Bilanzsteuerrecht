// Registry: areas (Bereiche) and task types with generator, target time and test format.

import { rng, mcText } from "./zufall.js";
import { zahlenreihe, prozentrechnung, dreisatz, zinsrechnung, textaufgabe, tabelle, kopfrechnen, ableitung, ableitungsgraph } from "./zahlen.js";
import { vergleich } from "./vg.js";
import { schlussfolgern } from "./logik.js";
import { saetzeErgaenzen, satzbau, lueckentext, texteZuordnen } from "./englisch.js";

export const BEREICHE = [
  { id: "vg", name: "Verarbeitungsgeschwindigkeit", kurz: "Formen vergleichen auf Zeit", icon: "blitz", farbe: ["#c2410c", "#fb923c"] },
  { id: "logik", name: "Angewandtes Schlussfolgern", kurz: "richtig · unbestimmt · falsch", icon: "gehirn", farbe: ["#7c3aed", "#a78bfa"] },
  { id: "zahlen", name: "Umgang mit Zahlen", kurz: "Ohne Taschenrechner", icon: "prozent", farbe: ["#2563eb", "#60a5fa"] },
  { id: "englisch", name: "Englisch", kurz: "Vier Aufgabenformate", icon: "lernen", farbe: ["#0f766e", "#2dd4bf"] },
];
export const BEREICH = Object.fromEntries(BEREICHE.map((b) => [b.id, b]));

// zeit = seconds per task in tempo mode (close to the real test)
export const TYPEN = {
  vg: { bereich: "vg", name: "Formen-Gleichungen", text: "Welche Seite ist größer oder kleiner?", gen: vergleich, zeit: 6 },
  logik: { bereich: "logik", name: "Regeltexte beurteilen", text: "Sieben Szenarien, unendlich viele Aussagen", gen: schlussfolgern, zeit: 80 },
  "z-reihe": { bereich: "zahlen", name: "Zahlenreihen", text: "Muster erkennen und fortsetzen", gen: zahlenreihe, zeit: 60 },
  "z-prozent": { bereich: "zahlen", name: "Prozentrechnung", text: "Grundwert, Änderungen, Rückrechnung", gen: prozentrechnung, zeit: 75 },
  "z-dreisatz": { bereich: "zahlen", name: "Dreisatz", text: "proportional, antiproportional, zusammengesetzt", gen: dreisatz, zeit: 75 },
  "z-zins": { bereich: "zahlen", name: "Zinsrechnung", text: "Jahres-, Monats-, Tageszinsen, Zinseszins", gen: zinsrechnung, zeit: 75 },
  "z-text": { bereich: "zahlen", name: "Textaufgaben", text: "Mischung, Bewegung, Arbeit, Alter", gen: textaufgabe, zeit: 90 },
  "z-tabelle": { bereich: "zahlen", name: "Tabellen & Diagramme", text: "Rabatte vergleichen, Werte ablesen", gen: tabelle, zeit: 75 },
  "z-kopf": { bereich: "zahlen", name: "Kopfrechnen & Schätzen", text: "Brüche, Dezimalzahlen, Überschlag", gen: kopfrechnen, zeit: 45 },
  "z-ableitung": { bereich: "zahlen", name: "Ableitungen", text: "Potenz-, Ketten-, Produktregel", gen: ableitung, zeit: 70 },
  "z-graph": { bereich: "zahlen", name: "Ableitungsgraphen", text: "Welcher Graph ist f′?", gen: ableitungsgraph, zeit: 70 },
  "e-saetze": { bereich: "englisch", name: "Sätze ergänzen", text: "Grammatik und Wortschatz im Satz", gen: saetzeErgaenzen, zeit: 45, stufenlos: true },
  "e-satzbau": { bereich: "englisch", name: "Satzbau und Verstehen", text: "Wortstellung, Bedeutung, Fehler finden", gen: satzbau, zeit: 60, stufenlos: true },
  "e-luecken": { bereich: "englisch", name: "Lückentext", text: "Zusammenhängende Texte mit Lücken", gen: lueckentext, zeit: 60, stufenlos: true },
  "e-texte": { bereich: "englisch", name: "Texte zuordnen", text: "Vier Texte, eine Aussage", gen: texteZuordnen, zeit: 75, stufenlos: true },
};
export const TYP_IDS = Object.keys(TYPEN);
export const typenIn = (bereich) => TYP_IDS.filter((t) => TYPEN[t].bereich === bereich);

/** Generate a task reproducibly. */
export function erzeuge(typ, seed, stufe = 2, idx = null) {
  if (typ === "einstieg") return einstiegAufgabe(seed);
  const r = rng(seed);
  const a = TYPEN[typ].gen(r, stufe, idx ?? undefined);
  return { ...a, typ, statTyp: typ, seed, stufe, idx };
}

// ---------------------------------------------------------------- Einstiegstest (fixed, checked solutions)
const EINSTIEG = [
  { statTyp: "z-reihe", frage: "Welche Zahl setzt die Reihe sinnvoll fort?", reihe: ["3", "7", "15", "31", "63", "?"], ok: "127", f: ["126", "125", "95"], schritte: ["Übergänge: 3 → 7 → 15 → 31 → 63: jeweils ×2 +1", "63 × 2 + 1 = <b>127</b>"], schema: ["Abstände bilden: 4, 8, 16, 32 – sie verdoppeln sich", "Regel ×2+1 prüfen und anwenden"] },
  { statTyp: "z-reihe", frage: "Welche Zahl setzt die Reihe sinnvoll fort?", reihe: ["4", "8", "5", "10", "7", "14", "?"], ok: "11", f: ["28", "17", "9"], schritte: ["Abwechselnd ×2 und −3: 4 ×2 = 8, −3 = 5, ×2 = 10, −3 = 7, ×2 = 14", "Nächster Schritt: 14 − 3 = <b>11</b>"], schema: ["Abstände wechseln? → zwei Rechenarten im Wechsel prüfen"] },
  { statTyp: "z-prozent", frage: "Ein Preis wird zuerst um 20 % erhöht und dann um 20 % gesenkt. Der Endpreis beträgt 96 €. Wie hoch war der ursprüngliche Preis?", ok: "100 €", f: ["96 €", "92,16 €", "104 €"], schritte: ["x × 1,2 × 0,8 = 96", "Gesamtfaktor 1,2 × 0,8 = 0,96", "x = 96 ÷ 0,96 = <b>100 €</b>", "Falle: +20 % und −20 % heben sich nicht auf, weil sich die 20 % auf verschiedene Grundwerte beziehen."], schema: ["Faktoren multiplizieren", "Endwert ÷ Gesamtfaktor"] },
  { statTyp: "z-dreisatz", frage: "6 Mitarbeitende brauchen für eine Aufgabe 10 Tage. Wie lange brauchen 4 Mitarbeitende bei gleichem Tempo?", ok: "15 Tage", f: ["6,7 Tage", "12 Tage", "8 Tage"], schritte: ["Weniger Leute → mehr Tage: antiproportional", "Gesamtarbeit: 6 × 10 = 60 Personentage", "60 ÷ 4 = <b>15 Tage</b>"], schema: ["Je weniger …, desto mehr → antiproportional", "Produkt bleibt gleich"] },
  { statTyp: "z-zins", frage: "5.000 € werden 2 Jahre zu 4 % angelegt, die Zinsen werden mitverzinst. Wie hoch ist das Guthaben danach?", ok: "5.408 €", f: ["5.400 €", "5.200 €", "408 €"], schritte: ["Jahr 1: 5.000 € × 1,04 = 5.200 €", "Jahr 2: 5.200 € × 1,04 = <b>5.408 €</b>", "Ohne Zinseszins wären es nur 5.400 €."], schema: ["Jedes Jahr × (1 + p/100)"] },
  { statTyp: "z-prozent", frage: "Der Ertrag einer Bank steigt von 240 Mio. € auf 276 Mio. €. Um wie viel Prozent ist er gestiegen?", ok: "15 %", f: ["13 %", "36 %", "12 %"], schritte: ["Zuwachs: 276 − 240 = 36 Mio. €", "Bezug alter Wert: 36 ÷ 240 = 0,15", "= <b>15 %</b>"], schema: ["Differenz ÷ alter Wert × 100"] },
  { statTyp: "z-text", frage: "30 l einer Lösung enthalten 20 % Salz. Wie viele Liter Wasser muss man hinzufügen, damit der Salzanteil auf 12 % sinkt?", ok: "20 l", f: ["50 l", "8 l", "18 l"], schritte: ["Salz: 20 % von 30 l = 6 l", "6 l sollen 12 % sein: 6 ÷ 0,12 = 50 l Gesamtmenge", "Wasser: 50 − 30 = <b>20 l</b>"], schema: ["Stoffmenge bleibt gleich", "Neue Gesamtmenge = Stoff ÷ neuer Anteil", "Differenz = Wasser"] },
  { statTyp: "z-text", frage: "Zug A fährt mit 80 km/h los. Zug B startet eine Stunde später auf derselben Strecke mit 120 km/h. Nach wie vielen Stunden Fahrt holt Zug B Zug A ein?", ok: "2 Stunden", f: ["3 Stunden", "1 Stunde", "1,5 Stunden"], schritte: ["Vorsprung von Zug A: 80 km", "Zug B holt pro Stunde 120 − 80 = 40 km auf", "80 ÷ 40 = <b>2 Stunden</b>"], schema: ["Vorsprung ÷ Geschwindigkeitsdifferenz"] },
];
export const EINSTIEG_ANZAHL = EINSTIEG.length;

function einstiegAufgabe(i) {
  const e = EINSTIEG[i];
  const r = rng(1000 + i);
  return { ...e, ...mcText(r, e.ok, e.f), typ: "einstieg", statTyp: e.statTyp, seed: i, stufe: 2 };
}
