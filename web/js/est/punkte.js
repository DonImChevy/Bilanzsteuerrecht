// Einkommensteuer – Punktesammler: Klausursätze, die in der GS-I-Klausur fast wörtlich verlangt werden.
// Grundlage sind Hinweise der Dozenten; die Sammlung wird Stück für Stück ergänzt. Ohne Gewähr.
// Reine Daten (kein Import aus kern.js), weil auch die Stichwort-Prüfung diese Datei liest.
//
// Je Eintrag: frage, satz (Mustersatz), punkte (von 60 in der Klausur GS I), normen (Gesetzestexte zur Anzeige),
// pruef (strenge Prüfung: alle Normen mit Gesetz/Absatz/Satz und alle Stichworte), mc (Multiple-Choice-Fassung).

export const PUNKTE_HINWEIS = "Nach Hinweisen der Dozenten · wird Stück für Stück ergänzt · ohne Gewähr";

const PUNKTESAMMLER = [
  {
    id: "est-punkte-stpfl",
    frage: "Definieren Sie die unbeschränkte Einkommensteuerpflicht mit allen Tatbestandsmerkmalen und den jeweiligen Normen in einem Satz.",
    satz: "Unbeschränkt einkommensteuerpflichtig (≙ Welteinkommensprinzip) ist gemäß § 1 Abs. 1 S. 1 EStG eine natürliche Person (§ 1 BGB), die im Inland (§ 1 Abs. 1 S. 2 EStG) einen Wohnsitz (§ 8 AO) oder ihren gewöhnlichen Aufenthalt (§ 9 AO) hat.",
    punkte: 4,
    erklaerung: "Jedes Tatbestandsmerkmal mit seiner Norm: natürliche Person (§ 1 BGB), Inland (§ 1 Abs. 1 S. 2 EStG), Wohnsitz (§ 8 AO) oder gewöhnlicher Aufenthalt (§ 9 AO); Rechtsfolge unbeschränkte Steuerpflicht (§ 1 Abs. 1 S. 1 EStG) ≙ Welteinkommensprinzip. „≙“ heißt „entspricht“ – in der App genügt das Wort „Welteinkommen“.",
    normen: ["EStG 1 1", "BGB 1", "AO 8", "AO 9"],
    pruef: {
      norm: ["EStG 1 1 1", "EStG 1 1 2", "BGB 1", "AO 8", "AO 9"],
      s: ["unbeschraenkt steuerpflicht", "welteinkommen", "natuerlich person", "inland", "wohnsitz", "gewoehnlich aufenthalt"],
    },
    mc: {
      frage: "Welche Bestandteile gehören in den Klausursatz zur unbeschränkten Einkommensteuerpflicht?",
      r: ["natürliche Person (§ 1 BGB)", "Wohnsitz (§ 8 AO) oder gewöhnlicher Aufenthalt (§ 9 AO)", "im Inland (§ 1 Abs. 1 S. 2 EStG)", "unbeschränkt steuerpflichtig (§ 1 Abs. 1 S. 1 EStG) ≙ Welteinkommensprinzip"],
      f: ["deutsche Staatsangehörigkeit (Art. 116 GG)", "Meldung beim Einwohnermeldeamt", "volle Geschäftsfähigkeit (§ 104 BGB)", "inländische Einkünfte (§ 49 EStG)"],
    },
  },
];

export const EST_PUNKTE = PUNKTESAMMLER.map((p) => ({
  id: p.id, thema: "est-punkte", kategorie: "punkte",
  erzeugen: () => ({
    id: p.id, thema: "est-punkte", typ: "offen", punkte: p.punkte,
    text: p.frage, antwort: p.satz, normen: p.normen,
    erklaerung: `🎯 Punktesammler: ${p.punkte} von 60 Punkten in der GS-I-Klausur – ${PUNKTE_HINWEIS}.\n${p.erklaerung}`, quelle: null,
  }),
}));

/** Strenge Prüfdaten je Punktesammler (alle Normen und Stichworte Pflicht). */
export const SW_EST_PUNKTE = Object.fromEntries(PUNKTESAMMLER.map((p) => [p.id, { streng: true, ...p.pruef, min: p.pruef.s.length }]));
export const MC_EST_PUNKTE = Object.fromEntries(PUNKTESAMMLER.map((p) => [p.id, p.mc]));

/** § 1 BGB für die Normanzeige (Quelle: www.gesetze-im-internet.de). */
export const NORMEN_EST_BGB = [
  { g: "BGB", nr: "1", titel: "Beginn der Rechtsfähigkeit", abs: [{ abs: "", text: "Die Rechtsfähigkeit des Menschen beginnt mit der Vollendung der Geburt." }] },
];
