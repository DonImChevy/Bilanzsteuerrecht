// Learning plan up to the on-site test on 23.11.2026. Focus from the online test result:
// processing speed (daily) and English sentence structure / gap texts (daily); the rest rotates.

import { tageBis } from "./speicher.js";
import { TYPEN } from "./typen.js";

export const TESTTAG = "2026-11-23";

export const PHASEN = [
  { id: "verstehen", bis: "2026-11-09", titel: "Verstehen", text: "Aufgabentypen im Lernmodus durchdringen – Lösungswege nachrechnen.", modus: "lernen" },
  { id: "tempo", bis: "2026-11-16", titel: "Tempo", text: "Dieselben Typen mit Zeitlimit wie im Test.", modus: "tempo" },
  { id: "simulation", bis: "2026-11-21", titel: "Simulation", text: "Testsimulationen und gezieltes Fehlertraining.", modus: "tempo" },
  { id: "final", bis: "2026-11-22", titel: "Ausruhen", text: "Nur kurz aufwärmen, früh schlafen.", modus: "lernen" },
  { id: "test", bis: TESTTAG, titel: "Testtag", text: "Viel Erfolg in Berlin!", modus: "lernen" },
];

export function phase(heute) {
  return PHASEN.find((p) => heute <= p.bis) || { id: "danach", titel: "Nach dem Test", text: "Weiter üben, wenn du magst.", modus: "lernen" };
}

export const tageBisTest = (heute) => tageBis(heute, TESTTAG);

const WECHSEL = {
  1: { id: "w-logik", titel: "Schlussfolgern", text: "10 Regeltexte", icon: "gehirn", start: { typen: ["logik"], anzahl: 10 } },
  4: { id: "w-logik", titel: "Schlussfolgern", text: "10 Regeltexte", icon: "gehirn", start: { typen: ["logik"], anzahl: 10 } },
  2: { id: "w-zahlen", titel: "Umgang mit Zahlen", text: "10 gemischte Aufgaben", icon: "prozent", start: { bereich: "zahlen", anzahl: 10 } },
  5: { id: "w-zahlen", titel: "Umgang mit Zahlen", text: "10 gemischte Aufgaben", icon: "prozent", start: { bereich: "zahlen", anzahl: 10 } },
  3: { id: "w-englisch", titel: "Englisch: Sätze & Texte", text: "Sätze ergänzen + Texte zuordnen", icon: "lernen", start: { typen: ["e-saetze", "e-texte"], anzahl: 10 } },
  6: { id: "w-englisch", titel: "Englisch: Sätze & Texte", text: "Sätze ergänzen + Texte zuordnen", icon: "lernen", start: { typen: ["e-saetze", "e-texte"], anzahl: 10 } },
  0: { id: "w-sim", titel: "Testsimulation", text: "Alle Module unter Echtbedingungen", icon: "klausur", start: { simulation: true } },
};

/** Today's units. schwach = weakest type ids, fehler = number of open errors. */
export function tagesplan(heute, { schwach = [], fehler = 0 } = {}) {
  const p = phase(heute), wochentag = new Date(heute + "T12:00:00").getDay();
  const modus = p.modus;
  if (p.id === "test") return [{ id: "warm", titel: "Aufwärmen", text: "1 Minute Formen-Sprint – mehr nicht", icon: "blitz", start: { sprint: 60 } }];
  if (p.id === "final") return [
    { id: "warm", titel: "Formen-Sprint", text: "1 Durchgang · 2 Min", icon: "blitz", start: { sprint: 120 } },
    { id: "e-kurz", titel: "Englisch locker", text: "5 Aufgaben Satzbau", icon: "lernen", start: { typen: ["e-satzbau"], anzahl: 5, modus: "lernen" } },
  ];
  const liste = [
    { id: "sprint", titel: "Formen-Sprint", text: "Verarbeitungsgeschwindigkeit · 3 Min – dein Schwerpunkt", icon: "blitz", start: { sprint: 180 }, schwerpunkt: true },
    { id: "e-fokus", titel: "Englisch: Satzbau & Lückentext", text: "10 Aufgaben – dein zweiter Schwerpunkt", icon: "lernen", start: { typen: ["e-satzbau", "e-luecken"], anzahl: 10, modus }, schwerpunkt: true },
  ];
  if (p.id === "simulation") {
    liste.push(wochentag % 2 === 0
      ? { id: "w-sim", titel: "Testsimulation", text: "Alle Module unter Echtbedingungen", icon: "klausur", start: { simulation: true } }
      : { ...WECHSEL[wochentag === 0 ? 1 : wochentag], start: { ...WECHSEL[wochentag === 0 ? 1 : wochentag].start, modus: "tempo" } });
    if (fehler) liste.push({ id: "fehler", titel: "Fehlertraining", text: `${fehler} offene Fehler wiederholen`, icon: "wiederholen", start: { fehler: true } });
  } else {
    const w = WECHSEL[wochentag];
    liste.push(w.start.simulation ? w : { ...w, start: { ...w.start, modus } });
  }
  if (schwach[0]) liste.push({ id: "schwach", titel: "Schwächster Typ", text: `5 Aufgaben: ${TYPEN[schwach[0]]?.name ?? ""}`, icon: "ziel", start: { typen: [schwach[0]], anzahl: 5, modus }, typ: schwach[0] });
  return liste;
}
