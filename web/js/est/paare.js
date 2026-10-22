// Normen-Paare (Spiel „Paare finden“) – Einkommensteuer.
// Auswahl: Normen, die in den Lösungen der ESt-Altklausuren GS I immer wieder zitiert werden, plus die
// Grunddefinitionen, ohne die keine Klausurlösung auskommt. Kurzerklärungen bewusst knapp (eine Karte).
export const PAARE_EST = [
  ["§ 1 Abs. 1 EStG", "Unbeschränkte Steuerpflicht"],
  ["§ 1 BGB", "Rechtsfähigkeit ab Vollendung der Geburt"],
  ["§ 8 AO", "Wohnsitz"],
  ["§ 9 AO", "Gewöhnlicher Aufenthalt (> 6 Monate)"],
  ["§ 140 AO", "Abgeleitete Buchführungspflicht (HGB)"],
  ["§ 141 AO", "Originäre Buchführungspflicht (Grenzen)"],
  ["§ 52 AO", "Gemeinnützige Zwecke"],
  ["§ 54 AO", "Kirchliche Zwecke"],
  ["§ 3 Abs. 4 AO", "Steuerliche Nebenleistungen"],
  ["§ 2 Abs. 1 EStG", "Die sieben Einkunftsarten"],
  ["§ 2 Abs. 2 EStG", "Gewinn- und Überschusseinkünfte"],
  ["§ 3 Nr. 26 EStG", "Übungsleiterfreibetrag 3.300 €"],
  ["§ 4 Abs. 4 EStG", "Betriebsausgaben"],
  ["§ 6 Abs. 2 EStG", "GWG bis 800 € netto sofort abziehbar"],
  ["§ 7 Abs. 1 EStG", "Lineare AfA"],
  ["§ 8 Abs. 1 EStG", "Einnahmen in Geld oder Geldeswert"],
  ["§ 9 Abs. 1 S. 1 EStG", "Werbungskosten – Definition"],
  ["§ 9 Abs. 1 S. 3 Nr. 4 EStG", "Entfernungspauschale 0,38 € je km"],
  ["§ 9 Abs. 1 S. 3 Nr. 6 EStG", "Arbeitsmittel"],
  ["§ 9a S. 1 Nr. 1 a EStG", "Arbeitnehmer-Pauschbetrag 1.230 €"],
  ["§ 9a EStDV", "Anschaffung = Zeitpunkt der Lieferung"],
  ["§ 11 Abs. 1 EStG", "Zuflussprinzip"],
  ["§ 11 Abs. 2 EStG", "Abflussprinzip"],
  ["§ 12 Nr. 1 EStG", "Kosten der Lebensführung nicht abziehbar"],
  ["§ 19 Abs. 1 EStG", "Einkünfte aus nichtselbständiger Arbeit"],
  ["§ 2 LStDV", "Arbeitslohn – Definition"],
  ["§ 26 Abs. 1 EStG", "Voraussetzungen Ehegatten-Wahlrecht"],
  ["§ 32a Abs. 5 EStG", "Splittingverfahren"],
  ["§ 36 Abs. 1 EStG", "ESt entsteht mit Ablauf des VZ"],
  ["§ 255 Abs. 1 HGB", "Anschaffungskosten"],
];

/** Paar-Sammlungen je Modul (weitere Module können hier ergänzt werden). */
export const PAARE = { est: PAARE_EST };
