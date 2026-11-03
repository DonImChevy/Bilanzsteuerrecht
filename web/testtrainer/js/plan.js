// Learning plan up to the on-site test on 23.11.2026. Focus: maths (daily, one type per day)
// and processing speed (daily); reasoning and English rotate.

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

// Maths: one type per day in a fixed cycle (all nine types covered), later the weakest maths type.
export const MATHE_ZYKLUS = ["z-prozent", "z-dreisatz", "z-reihe", "z-zins", "z-text", "z-tabelle", "z-kopf", "z-ableitung", "z-graph"];
const ZYKLUS_START = "2026-11-03";

const WECHSEL = {
  1: { id: "w-logik", titel: "Schlussfolgern", text: "10 Regeltexte", icon: "gehirn", start: { typen: ["logik"], anzahl: 10 } },
  4: { id: "w-logik", titel: "Schlussfolgern", text: "10 Regeltexte", icon: "gehirn", start: { typen: ["logik"], anzahl: 10 } },
  2: { id: "w-englisch1", titel: "Englisch: Satzbau & Lückentext", text: "10 Aufgaben", icon: "lernen", start: { typen: ["e-satzbau", "e-luecken"], anzahl: 10 } },
  5: { id: "w-englisch1", titel: "Englisch: Satzbau & Lückentext", text: "10 Aufgaben", icon: "lernen", start: { typen: ["e-satzbau", "e-luecken"], anzahl: 10 } },
  3: { id: "w-englisch2", titel: "Englisch: Sätze & Texte", text: "Sätze ergänzen + Texte zuordnen", icon: "lernen", start: { typen: ["e-saetze", "e-texte"], anzahl: 10 } },
  6: { id: "w-englisch2", titel: "Englisch: Sätze & Texte", text: "Sätze ergänzen + Texte zuordnen", icon: "lernen", start: { typen: ["e-saetze", "e-texte"], anzahl: 10 } },
  0: { id: "w-sim", titel: "Testsimulation", text: "Alle Module unter Echtbedingungen", icon: "klausur", start: { simulation: true } },
};

export function matheDesTages(heute, schwachMathe = null) {
  if (phase(heute).id === "simulation" && schwachMathe) return schwachMathe;
  const i = ((tageBis(ZYKLUS_START, heute) % MATHE_ZYKLUS.length) + MATHE_ZYKLUS.length) % MATHE_ZYKLUS.length;
  return MATHE_ZYKLUS[i];
}

/** Today's units. schwach = weakest type ids, fehler = open errors, einstiegFertig = diagnosis done. */
export function tagesplan(heute, { schwach = [], fehler = 0, einstiegFertig = true } = {}) {
  const p = phase(heute), wochentag = new Date(heute + "T12:00:00").getDay();
  const modus = p.modus;
  if (p.id === "test") return [{ id: "warm", titel: "Aufwärmen", text: "1 Minute Formen-Sprint und 3 Matheaufgaben – mehr nicht", icon: "blitz", start: { sprint: 60 } }];
  if (p.id === "final") return [
    { id: "warm", titel: "Formen-Sprint", text: "1 Durchgang · 2 Min", icon: "blitz", start: { sprint: 120 } },
    { id: "m-kurz", titel: "Mathe locker", text: "5 gemischte Aufgaben im Lernmodus", icon: "prozent", start: { bereich: "zahlen", anzahl: 5, modus: "lernen" } },
  ];
  const liste = [];
  if (!einstiegFertig) liste.push({ id: "einstieg", titel: "Einstiegstest", text: "8 Mathe-Aufgaben zur Diagnose – einmalig, ehrlich und ohne Hilfsmittel", icon: "ziel", start: { einstieg: true }, schwerpunkt: true });
  const schwachMathe = schwach.find((t) => TYPEN[t]?.bereich === "zahlen") || null;
  const mt = matheDesTages(heute, schwachMathe);
  liste.push(
    { id: "mathe", titel: `Mathe: ${TYPEN[mt].name}`, text: `15 Aufgaben · ca. 25 Min – dein Schwerpunkt`, icon: "prozent", start: { typen: [mt], anzahl: 15, modus }, schwerpunkt: true, typ: mt },
    { id: "sprint", titel: "Formen-Sprint", text: "Verarbeitungsgeschwindigkeit · 3 Min", icon: "blitz", start: { sprint: 180 }, schwerpunkt: true },
  );
  if (p.id === "simulation") {
    liste.push(wochentag % 2 === 0
      ? { id: "w-sim", titel: "Testsimulation", text: "Alle Module unter Echtbedingungen", icon: "klausur", start: { simulation: true } }
      : { ...WECHSEL[wochentag], start: { ...WECHSEL[wochentag].start, modus: "tempo" } });
    if (fehler) liste.push({ id: "fehler", titel: "Fehlertraining", text: `${fehler} offene Fehler wiederholen`, icon: "wiederholen", start: { fehler: true } });
  } else {
    const w = WECHSEL[wochentag];
    liste.push(w.start.simulation ? w : { ...w, start: { ...w.start, modus } });
    if (wochentag === 3 || wochentag === 6) liste.push({ id: "m-mix", titel: "Mathe gemischt", text: "8 Aufgaben aus allen Typen", icon: "mischen", start: { bereich: "zahlen", anzahl: 8, modus } });
  }
  const schwachAnders = schwach.find((t) => t !== mt);
  if (schwachAnders) liste.push({ id: "schwach", titel: "Schwächster Typ", text: `5 Aufgaben: ${TYPEN[schwachAnders].name}`, icon: "ziel", start: { typen: [schwachAnders], anzahl: 5, modus }, typ: schwachAnders });
  return liste;
}
