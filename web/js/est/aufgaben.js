// Einkommensteuer (GS I) – Aufgaben nach den Skripten und Folien der Akademie, Rechtsstand 2026.
// Rechenaufgaben würfeln bei jedem Aufruf neue Zahlen; Einordnungsfälle ziehen einen von mehreren Sachverhalten.
// Frage-Antwort-Aufgaben tragen ihre Multiple-Choice-Fassung (r = richtig, f = falsch) gleich mit.
import { auswahl, zahl, reihum } from "../kern.js";
import * as G from "../geld.js";
import { grundtarif, splitting, zone } from "./tarif.js";

const M = (r, f, frage) => ({ r, f, frage });
const A = (id, thema, text, antwort, normen, mc, { fall = false, erklaerung = "" } = {}) => ({
  id, thema, mc, erzeugen: () => ({ id, thema, typ: "offen", fall, text, antwort, normen, erklaerung, quelle: null }),
});
/** Rechenaufgabe: erzeugen(r) liefert {text, euro, erklaerung, normen}. Toleranz unter 1 € (auf- oder abgerundete Euro werden akzeptiert). */
const R = (id, thema, erzeugen) => ({
  id, thema, kategorie: "rechnen",
  erzeugen: (r) => { const a = erzeugen(r); return { ...zahl(id, thema, a.text, Math.round(a.euro * 100), a.erklaerung, { toleranz: 99 }), normen: a.normen || [] }; },
});
/** Einordnungsfall: zieht einen Fall {text, richtig, erkl} und stellt ihn mit festen Antwortmöglichkeiten (richtig = Index oder Optionstext). */
const F = (id, thema, frage, optionen, faelle, normen = []) => ({
  id, thema, kategorie: "fall",
  erzeugen: ((ziehe) => (r) => {
    const f = ziehe(r); // reihum – jeder Fall kommt dran, bevor sich einer wiederholt
    const richtig = typeof f.richtig === "string" ? optionen.indexOf(f.richtig) : f.richtig;
    return { ...auswahl(id, thema, `${f.text}\n\n${frage}`, optionen, [richtig], f.erkl, r), normen: f.normen || normen };
  })(reihum(faelle)),
});

const eur = (e) => G.euro(Math.round(e * 100));
const km = (x) => String(x).replace(".", ",");
const EP = 0.38; // Entfernungspauschale je km ab 2026 (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 EStG)
const MAX_OEPNV = 4500;
const AN_PB = 1230; // Arbeitnehmer-Pauschbetrag (§ 9a S. 1 Nr. 1 a EStG)
const UEL = 3300; // Übungsleiterfreibetrag ab 2026 (§ 3 Nr. 26 EStG)
const HO_TAG = 6, HO_MAX = 1260; // Home-Office-Pauschale (§ 4 Abs. 5 S. 1 Nr. 6c EStG)

// ======================================================================= Grundlagen (Skript „Allgemeine Einführung“)
const grundlagen = [
  A("est-steuerart", "est-grundlagen",
    "Ordnen Sie die Einkommensteuer in die Einteilung der Steuern ein. Wem steht ihr Aufkommen zu?",
    "• Personensteuer: Steuersubjekt ist die natürliche Person (§ 1 Abs. 1 S. 1 EStG); persönliche Umstände wie Familienstand, Kinder, Krankheit spielen eine Rolle.\n• Direkte Steuer: Steuerschuldner und Steuerträger sind identisch.\n• Besitzsteuer.\n• Veranlagungssteuer: Festsetzung nach Ablauf des Kalenderjahres (§§ 25, 46 EStG); verwaltet von den Landesfinanzbehörden.\n• Gemeinschaftsteuer (Art. 106 Abs. 3 GG): Gemeinden 15 %, Bund und Länder je 42,5 %.\n• Die Körperschaftsteuer ist die „Einkommensteuer der juristischen Personen“.",
    ["EStG 1 1", "EStG 25 1"],
    M(["Die Einkommensteuer ist eine Personensteuer.", "Die Einkommensteuer ist eine direkte Steuer.", "Die Einkommensteuer ist eine Gemeinschaftsteuer von Bund, Ländern und Gemeinden.", "Die Gemeinden erhalten 15 % des Aufkommens."],
      ["Die Einkommensteuer ist eine Verkehrsteuer wie die Umsatzsteuer.", "Die Einkommensteuer ist eine indirekte Steuer, die auf den Verbraucher abgewälzt wird.", "Das Aufkommen der Einkommensteuer steht allein dem Bund zu.", "Juristische Personen zahlen Einkommensteuer."],
      "Welche Aussagen zur Einordnung der Einkommensteuer sind richtig?")),
  A("est-erhebungsformen", "est-grundlagen",
    "Auf welche Weise wird die Einkommensteuer erhoben? Erläutern Sie die Erhebungsformen.",
    "• Als Quellensteuer (Steuerabzug an der Einkunftsquelle):\n  – Lohnsteuer: Der Arbeitgeber behält sie vom Arbeitslohn ein und führt sie ab.\n  – Kapitalertragsteuer (25 %, §§ 43, 43a EStG): Mit dem Abzug ist die ESt grundsätzlich abgegolten (Abgeltungsteuer, § 43 Abs. 5 EStG).\n• Im Wege der Veranlagung (§ 25 EStG): förmliches Verfahren, in dem die Besteuerungsgrundlagen ermittelt (Steuererklärung) und die ESt festgesetzt wird (Steuerbescheid).\n• Lohnsteuer und Kapitalertragsteuer sind keine eigenen Steuern, sondern besondere Erhebungsformen der ESt; die Lohnsteuer wird bei der Veranlagung angerechnet (§ 36 Abs. 2 Nr. 2 EStG).",
    ["EStG 25 1", "EStG 36 2"],
    M(["Die Lohnsteuer ist eine besondere Erhebungsform der Einkommensteuer.", "Mit dem Kapitalertragsteuerabzug ist die Einkommensteuer grundsätzlich abgegolten.", "Die Veranlagung ist das förmliche Verfahren zur Ermittlung der Besteuerungsgrundlagen und Festsetzung der Steuer.", "Die einbehaltene Lohnsteuer wird auf die festzusetzende Einkommensteuer angerechnet."],
      ["Die Lohnsteuer ist eine eigenständige Steuer neben der Einkommensteuer.", "Die Kapitalertragsteuer beträgt 45 %.", "Die Lohnsteuer behält das Finanzamt beim Arbeitnehmer ein.", "Bei der Veranlagung wird die Lohnsteuer nicht berücksichtigt."],
      "Welche Aussagen zu den Erhebungsformen der Einkommensteuer sind richtig?")),
  A("est-rechtsgrundlagen", "est-grundlagen",
    "Welche Rechtsgrundlagen und Verwaltungsanweisungen gibt es für die Einkommensteuer, und wen binden sie?",
    "• Rechtsgrundlagen (binden alle): EStG, Einkommensteuer-Durchführungsverordnung (EStDV), Lohnsteuer-Durchführungsverordnung (LStDV); ergänzend AO und BewG.\n• Verwaltungsanweisungen: Einkommensteuerrichtlinien (EStR), Einkommensteuerhinweise (EStH), Lohnsteuerrichtlinien (LStR), Lohnsteuerhinweise (LStH), BMF-Schreiben und Erlasse.\n• Verwaltungsvorschriften haben keinen Gesetzesrang: Sie binden nur die Verwaltung, nicht die Steuerpflichtigen und nicht die Gerichte.\n• In den Hinweisen (EStH, LStH) ist auch die Rechtsprechung des BFH eingearbeitet.\n• Aufbau des EStG: Steuerpflicht (§§ 1–1a, wer), Einkommen (§§ 2–24a, was), Veranlagung (§§ 25–28, wie), Tarif (§§ 31–34b, wieviel) …",
    ["EStG 1 1"],
    M(["Die Einkommensteuerrichtlinien binden die Finanzverwaltung.", "Die Einkommensteuerrichtlinien binden die Finanzgerichte nicht.", "Die EStDV ist eine Rechtsverordnung und damit Rechtsgrundlage.", "Die Hinweise (EStH) enthalten auch Rechtsprechung des BFH."],
      ["Die Einkommensteuerrichtlinien haben Gesetzesrang.", "Die Einkommensteuerrichtlinien binden auch die Steuerpflichtigen.", "Die Steuerpflicht ist in den §§ 25–28 EStG geregelt.", "BMF-Schreiben binden den Bundesfinanzhof."],
      "Welche Aussagen zu Rechtsgrundlagen und Verwaltungsanweisungen der ESt sind richtig?")),
];

// ======================================================================= Persönliche Steuerpflicht (§ 1 EStG)
const stpfl = [
  A("est-unbeschraenkt", "est-steuerpflicht",
    "Unter welchen Voraussetzungen ist eine Person unbeschränkt einkommensteuerpflichtig, und welche Rechtsfolge hat das?",
    "§ 1 Abs. 1 S. 1 EStG – Tatbestandsmerkmale:\n• natürliche Person (Mensch von der Geburt bis zum Tod, § 1 BGB; Alter, Staatsangehörigkeit, Geschäftsfähigkeit spielen keine Rolle),\n• Wohnsitz (§ 8 AO) oder gewöhnlicher Aufenthalt (§ 9 AO)\n• im Inland (Bundesgebiet einschließlich Festlandsockel und Anteil an der ausschließlichen Wirtschaftszone, § 1 Abs. 1 S. 2 EStG).\nRechtsfolge: Besteuert wird das gesamte Welteinkommen (§ 2 Abs. 1 EStG, H 1a EStH).\nJuristische Personen unterliegen nicht der ESt, sondern der Körperschaftsteuer.",
    ["EStG 1 1", "AO 8", "AO 9", "EStG 2 1"],
    M(["Unbeschränkt steuerpflichtig sind natürliche Personen mit Wohnsitz oder gewöhnlichem Aufenthalt im Inland.", "Bei unbeschränkter Steuerpflicht wird das Welteinkommen besteuert.", "Ein Kleinkind kann unbeschränkt einkommensteuerpflichtig sein.", "Die Staatsangehörigkeit spielt für die unbeschränkte Steuerpflicht keine Rolle."],
      ["Unbeschränkt steuerpflichtig sind nur deutsche Staatsangehörige.", "Eine GmbH mit Sitz in Hamburg ist unbeschränkt einkommensteuerpflichtig.", "Bei unbeschränkter Steuerpflicht werden nur die inländischen Einkünfte besteuert.", "Für die unbeschränkte Steuerpflicht ist die Anmeldung beim Einwohnermeldeamt entscheidend."],
      "Welche Aussagen zur unbeschränkten Einkommensteuerpflicht sind richtig?")),
  A("est-wohnsitz", "est-steuerpflicht",
    "Wann hat jemand einen Wohnsitz im Sinne des § 8 AO? Nennen Sie Beispiele.",
    "§ 8 AO: Einen Wohnsitz hat jemand dort, wo er eine Wohnung unter Umständen innehat, die darauf schließen lassen, dass er sie beibehalten und benutzen wird.\n• Wohnung = zum Wohnen geeignete Räume (weit auszulegen). Auch Kinder, die bei den Eltern wohnen, haben dort einen Wohnsitz.\n• Ständige Nutzung ist nicht nötig – regelmäßige Aufenthalte (Wochenenden, Ferien) genügen; auch ein regelmäßig genutztes Ferienhaus ist ein Wohnsitz.\n• Mehrere Wohnsitze sind möglich.\n• Die behördliche Meldung ist unerheblich.\n• Kein Wohnsitz: Hotelzimmer, Wohnwagen und Zelte; Strafgefangene in der Vollzugsanstalt (keine Verfügungsbefugnis).",
    ["AO 8", "EStG 1 1"],
    M(["Ein regelmäßig genutztes Ferienhaus kann einen Wohnsitz begründen.", "Man kann mehrere Wohnsitze gleichzeitig haben.", "Die Anmeldung beim Einwohnermeldeamt ist für den Wohnsitz unerheblich.", "Ein Kind, das bei seinen Eltern lebt, hat dort einen Wohnsitz."],
      ["Ein dauerhaft bewohntes Hotelzimmer begründet einen Wohnsitz.", "Ein Wohnsitz setzt voraus, dass die Wohnung ständig genutzt wird.", "Ohne Meldung beim Einwohnermeldeamt gibt es keinen Wohnsitz.", "Ein Strafgefangener hat in der Vollzugsanstalt seinen Wohnsitz."],
      "Welche Aussagen zum Wohnsitz (§ 8 AO) sind richtig?")),
  A("est-gew-aufenthalt", "est-steuerpflicht",
    "Wann hat jemand seinen gewöhnlichen Aufenthalt im Inland (§ 9 AO)?",
    "• Dort, wo er sich unter Umständen aufhält, die erkennen lassen, dass er dort nicht nur vorübergehend verweilt (§ 9 S. 1 AO).\n• Stets und von Beginn an: zeitlich zusammenhängender Aufenthalt von mehr als sechs Monaten (§ 9 S. 2 AO) – die Steuerpflicht beginnt dann rückwirkend mit Beginn des Aufenthalts.\n• Die Frist ist unabhängig vom Kalenderjahr; kurzfristige Unterbrechungen (z. B. Urlaub, Heimfahrt über Weihnachten) bleiben unberücksichtigt.\n• Ausnahme (§ 9 S. 3 AO): Aufenthalt ausschließlich zu Besuchs-, Erholungs-, Kur- oder ähnlichen privaten Zwecken, der nicht länger als ein Jahr dauert.\n• Der gewöhnliche Aufenthalt ist nur zu prüfen, wenn kein Wohnsitz im Inland vorliegt.",
    ["AO 9", "EStG 1 1"],
    M(["Ein zusammenhängender Aufenthalt von mehr als sechs Monaten begründet stets einen gewöhnlichen Aufenthalt.", "Kurzfristige Unterbrechungen sind für die Sechsmonatsfrist unbeachtlich.", "Die Sechsmonatsfrist muss nicht innerhalb eines Kalenderjahres liegen.", "Ein reiner Erholungsaufenthalt bis zu einem Jahr begründet keinen gewöhnlichen Aufenthalt."],
      ["Die Sechsmonatsfrist muss in ein Kalenderjahr fallen.", "Nach Ablauf von sechs Monaten beginnt die Steuerpflicht erst ab dem siebten Monat.", "Jede Urlaubsreise unterbricht die Sechsmonatsfrist.", "Ein Erholungsaufenthalt von zehn Monaten begründet immer einen gewöhnlichen Aufenthalt."],
      "Welche Aussagen zum gewöhnlichen Aufenthalt (§ 9 AO) sind richtig?")),
  A("est-beschraenkt", "est-steuerpflicht",
    "Wann ist jemand beschränkt einkommensteuerpflichtig? Was ist die erweiterte unbeschränkte Steuerpflicht?",
    "Beschränkte Steuerpflicht (§ 1 Abs. 4 EStG):\n• natürliche Person,\n• ohne Wohnsitz und ohne gewöhnlichen Aufenthalt im Inland,\n• mit inländischen Einkünften im Sinne des § 49 EStG.\nRechtsfolge: Nur die inländischen Einkünfte werden besteuert (Territorialprinzip).\nErweiterte unbeschränkte Steuerpflicht (§ 1 Abs. 2 EStG): deutsche Staatsangehörige ohne Wohnsitz/gewöhnlichen Aufenthalt im Inland, die zu einer inländischen juristischen Person des öffentlichen Rechts in einem Dienstverhältnis stehen und Arbeitslohn aus einer inländischen öffentlichen Kasse beziehen (z. B. Diplomaten), wenn sie im Wohnsitzstaat nur beschränkt steuerpflichtig behandelt werden; gilt auch für deutsche Familienangehörige ohne oder mit nur inländischen Einkünften.",
    ["EStG 1 1", "EStG 1 4"],
    M(["Beschränkt steuerpflichtig ist, wer im Inland weder Wohnsitz noch gewöhnlichen Aufenthalt hat, aber inländische Einkünfte erzielt.", "Bei beschränkter Steuerpflicht werden nur die inländischen Einkünfte besteuert.", "Ein deutscher Diplomat im Ausland, der aus einer inländischen öffentlichen Kasse bezahlt wird, kann erweitert unbeschränkt steuerpflichtig sein."],
      ["Bei beschränkter Steuerpflicht wird das Welteinkommen besteuert.", "Beschränkt steuerpflichtig ist, wer im Inland einen Zweitwohnsitz hat.", "Die erweiterte unbeschränkte Steuerpflicht gilt für alle Deutschen im Ausland.", "Beschränkt steuerpflichtig ist jede ausländische Kapitalgesellschaft."],
      "Welche Aussagen zur beschränkten und erweiterten unbeschränkten Steuerpflicht sind richtig?")),
];

const STPFL_OPT = ["Unbeschränkt einkommensteuerpflichtig (§ 1 Abs. 1 EStG)", "Erweitert unbeschränkt einkommensteuerpflichtig (§ 1 Abs. 2 EStG)",
  "Beschränkt einkommensteuerpflichtig (§ 1 Abs. 4 EStG)", "Nicht einkommensteuerpflichtig"];
const stpflFall = F("est-stpfl-fall", "est-steuerpflicht", "Wie ist die Person einkommensteuerlich einzuordnen?", STPFL_OPT, [
  { text: "Mats ist 4 Jahre alt und wohnt bei seinen Eltern in Kiel. Eigene Einkünfte hat er nicht.", richtig: 0,
    erkl: "Natürliche Person (§ 1 BGB) mit Wohnsitz bei den Eltern (§ 8 AO) im Inland → unbeschränkt steuerpflichtig (§ 1 Abs. 1 S. 1 EStG). Alter und fehlende Einkünfte sind unerheblich.", normen: ["EStG 1 1", "AO 8"] },
  { text: "Clara hat Wohnungen in Wien, Madrid und Hamburg und nutzt alle drei regelmäßig.", richtig: 0,
    erkl: "Man kann mehrere Wohnsitze haben. Die regelmäßig genutzte Hamburger Wohnung ist ein inländischer Wohnsitz (§ 8 AO) → unbeschränkt steuerpflichtig; besteuert wird das Welteinkommen.", normen: ["EStG 1 1", "AO 8"] },
  { text: "Ein Schauspieler hat keine eigene Wohnung und lebt seit zwei Jahren dauerhaft in einem Münchner Hotel.", richtig: 0,
    erkl: "Ein Hotelzimmer ist keine Wohnung, also kein Wohnsitz. Er hält sich aber zeitlich zusammenhängend mehr als sechs Monate im Inland auf → gewöhnlicher Aufenthalt (§ 9 S. 2 AO) → unbeschränkt steuerpflichtig.", normen: ["EStG 1 1", "AO 9"] },
  { text: "Ömer wohnt in Istanbul und betreibt über eine Filiale in Frankfurt einen Gewerbebetrieb.", richtig: 2,
    erkl: "Natürliche Person ohne Wohnsitz und gewöhnlichen Aufenthalt im Inland, aber mit inländischen Einkünften (§ 49 EStG, Gewerbebetrieb mit Betriebsstätte im Inland) → beschränkt steuerpflichtig (§ 1 Abs. 4 EStG), nur mit den inländischen Einkünften.", normen: ["EStG 1 4"] },
  { text: "Lucie hat eine Wohnung in Lyon. Vom 01.09.01 bis zum 20.03.02 arbeitet sie als Dolmetscherin in Hamburg und wohnt dort in einer Pension. Über Weihnachten (22.12.01 bis 03.01.02) fährt sie nach Lyon.", richtig: 0,
    erkl: "Die Pension ist kein Wohnsitz. Der Aufenthalt dauert zusammenhängend mehr als sechs Monate; die kurze Unterbrechung über Weihnachten ist unbeachtlich (§ 9 S. 2 AO) → gewöhnlicher Aufenthalt von Beginn an (ab 01.09.01) → unbeschränkt steuerpflichtig.", normen: ["AO 9", "EStG 1 1"] },
  { text: "Ein US-amerikanisches Rentnerehepaar ohne Einkünfte im Inland verbringt acht Monate auf einer Erholungsreise durch Deutschland und wohnt in Hotels und Ferienwohnungen.", richtig: 3,
    erkl: "Kein Wohnsitz. Kein gewöhnlicher Aufenthalt, weil der Aufenthalt ausschließlich der Erholung dient und nicht länger als ein Jahr dauert (§ 9 S. 3 AO). Inländische Einkünfte liegen nicht vor → nicht einkommensteuerpflichtig.", normen: ["AO 9"] },
  { text: "Die Nordwind GmbH hat ihren Sitz und ihre Geschäftsleitung in Rostock.", richtig: 3,
    erkl: "Die GmbH ist eine juristische Person, keine natürliche Person. Sie unterliegt nicht der Einkommensteuer, sondern der Körperschaftsteuer.", normen: ["EStG 1 1"] },
  { text: "Dr. Weber ist deutscher Diplomat an der Botschaft in Paris. Einen Wohnsitz in Deutschland hat er nicht; sein Gehalt zahlt die Bundeskasse. Frankreich besteuert ihn nur wie einen beschränkt Steuerpflichtigen.", richtig: 1,
    erkl: "Deutscher Staatsangehöriger ohne Wohnsitz/gewöhnlichen Aufenthalt im Inland, Dienstverhältnis zu einer inländischen juristischen Person des öffentlichen Rechts, Arbeitslohn aus inländischer öffentlicher Kasse, im Ausland nur beschränkt steuerpflichtig → erweitert unbeschränkt steuerpflichtig (§ 1 Abs. 2 EStG).", normen: ["EStG 1 1"] },
]);

// ======================================================================= Sachliche Steuerpflicht, Einkunftsarten (§ 2 EStG)
const einkuenfte = [
  A("est-einkunftsarten", "est-einkuenfte",
    "Welche Einkünfte unterliegen der Einkommensteuer? Nennen Sie Beispiele für nicht steuerbare Zuflüsse.",
    "§ 2 Abs. 1 S. 1 EStG – abschließende Aufzählung der sieben Einkunftsarten:\n1. Land- und Forstwirtschaft (§ 13)\n2. Gewerbebetrieb (§ 15)\n3. selbständige Arbeit (§ 18)\n4. nichtselbständige Arbeit (§ 19)\n5. Kapitalvermögen (§ 20)\n6. Vermietung und Verpachtung (§ 21)\n7. sonstige Einkünfte (§ 22)\nNicht steuerbar sind Zuflüsse außerhalb dieser Einkunftsarten, z. B. Taschengeld, Spiel- und Lottogewinne, Erbschaften und Schenkungen, Erlöse aus dem Verkauf von Privatvermögen (soweit nicht §§ 17, 20, 23 EStG), Liebhaberei.\nDie Einkunftsarten selbst werden in den §§ 13–24 EStG definiert.",
    ["EStG 2 1"],
    M(["Das EStG kennt sieben Einkunftsarten.", "Die Aufzählung der Einkunftsarten in § 2 Abs. 1 EStG ist abschließend.", "Ein Lottogewinn ist nicht steuerbar.", "Eine Erbschaft unterliegt nicht der Einkommensteuer."],
      ["Ein Lottogewinn gehört zu den sonstigen Einkünften.", "Jeder Vermögenszufluss unterliegt der Einkommensteuer.", "Das EStG kennt neun Einkunftsarten.", "Der Verkauf des privaten Sofas führt immer zu Einkünften aus Gewerbebetrieb."],
      "Welche Aussagen zu den Einkunftsarten sind richtig?")),
  A("est-dualismus", "est-einkuenfte",
    "Was versteht man unter dem Dualismus der Einkunftsarten? Wie werden die Einkünfte jeweils ermittelt?",
    "Die Einkunftsarten werden in zwei Gruppen mit unterschiedlicher Einkünfteermittlung geteilt (§ 2 Abs. 2 EStG):\n• Gewinneinkünfte (Nr. 1–3: LuF, Gewerbebetrieb, selbständige Arbeit): Einkünfte sind der Gewinn – ermittelt durch Betriebsvermögensvergleich (§ 4 Abs. 1, § 5 EStG) oder Einnahmenüberschussrechnung (§ 4 Abs. 3 EStG: Betriebseinnahmen − Betriebsausgaben).\n• Überschusseinkünfte (Nr. 4–7: nichtselbständige Arbeit, Kapitalvermögen, Vermietung und Verpachtung, sonstige Einkünfte): Einkünfte sind der Überschuss der Einnahmen (§ 8) über die Werbungskosten (§§ 9, 9a).\nDas Ergebnis kann positiv oder negativ (Verlust) sein. Die Einkünfte werden für jeden Steuerpflichtigen getrennt ermittelt – auch bei Zusammenveranlagung.",
    ["EStG 2 2", "EStG 8 1", "EStG 9 1"],
    M(["Bei den Gewinneinkunftsarten sind die Einkünfte der Gewinn.", "Bei den Überschusseinkunftsarten sind die Einkünfte der Überschuss der Einnahmen über die Werbungskosten.", "Einkünfte aus nichtselbständiger Arbeit sind Überschusseinkünfte.", "Einkünfte aus selbständiger Arbeit sind Gewinneinkünfte."],
      ["Einkünfte aus Vermietung und Verpachtung sind Gewinneinkünfte.", "Bei Arbeitnehmern werden Betriebsausgaben abgezogen.", "Bei Zusammenveranlagung werden die Einkünfte der Ehegatten von Anfang an gemeinsam ermittelt.", "Einkünfte können nie negativ sein."],
      "Welche Aussagen zum Dualismus der Einkunftsarten sind richtig?")),
  A("est-begriffe", "est-einkuenfte",
    "Grenzen Sie die Begriffe Betriebseinnahmen, Betriebsausgaben, Einnahmen, Werbungskosten und Einkünfte voneinander ab.",
    "• Betriebseinnahmen: im EStG nicht definiert; alle Zuflüsse in Geld oder Geldeswert im Rahmen der Gewinneinkunftsarten (§ 4 Abs. 4 EStG im Umkehrschluss, § 8 Abs. 1 EStG analog).\n• Betriebsausgaben: Aufwendungen, die durch den Betrieb veranlasst sind (§ 4 Abs. 4 EStG).\n• Einnahmen: alle Güter in Geld oder Geldeswert, die im Rahmen der Überschusseinkunftsarten zufließen (§ 8 Abs. 1 EStG).\n• Werbungskosten: Aufwendungen zur Erwerbung, Sicherung und Erhaltung der Einnahmen (§ 9 Abs. 1 S. 1 EStG).\n• Einkünfte: rechnerisches Ergebnis – Gewinn bzw. Überschuss (§ 2 Abs. 2 EStG).\nKlausurtipp: Die Begriffe sind sauber zu trennen – bei Arbeitnehmern gibt es keine Betriebsausgaben, bei Freiberuflern keine Werbungskosten.",
    ["EStG 4 4", "EStG 8 1", "EStG 9 1", "EStG 2 2"],
    M(["Betriebsausgaben sind die Aufwendungen, die durch den Betrieb veranlasst sind.", "Werbungskosten sind Aufwendungen zur Erwerbung, Sicherung und Erhaltung der Einnahmen.", "Einnahmen im Sinne des § 8 EStG gibt es nur bei den Überschusseinkunftsarten.", "Einkünfte sind das rechnerische Ergebnis aus Einnahmen und Ausgaben."],
      ["Der Begriff der Betriebseinnahmen ist in § 4 Abs. 4 EStG ausdrücklich definiert.", "Werbungskosten gibt es bei den Einkünften aus Gewerbebetrieb.", "Einkünfte und Einnahmen sind dasselbe.", "Ein selbständiger Arzt macht seine Praxismiete als Werbungskosten geltend."],
      "Welche Aussagen zu den einkommensteuerlichen Grundbegriffen sind richtig?")),
];

const EINKUNFTSARTEN = ["Land- und Forstwirtschaft (§ 13 EStG)", "Gewerbebetrieb (§ 15 EStG)", "Selbständige Arbeit (§ 18 EStG)",
  "Nichtselbständige Arbeit (§ 19 EStG)", "Kapitalvermögen (§ 20 EStG)", "Vermietung und Verpachtung (§ 21 EStG)", "Sonstige Einkünfte (§ 22 EStG)", "Nicht steuerbar"];
const einkunftsartFall = F("est-einkunftsart-fall", "est-einkuenfte", "Zu welcher Einkunftsart gehören die Einnahmen?", EINKUNFTSARTEN, [
  { text: "Jana betreibt in Lübeck einen Fahrradladen.", richtig: 1, erkl: "Selbständige, nachhaltige Tätigkeit mit Gewinnerzielungsabsicht und Beteiligung am allgemeinen wirtschaftlichen Verkehr (Handel) → Gewerbebetrieb (§ 2 Abs. 1 Nr. 2 i.V.m. § 15 EStG). Einkünfte = Gewinn.", normen: ["EStG 2 1", "EStG 2 2"] },
  { text: "Dr. Uhl ist Zahnärztin in eigener Praxis.", richtig: 2, erkl: "Zahnärztin ist ein Katalogberuf des § 18 Abs. 1 Nr. 1 EStG → selbständige (freiberufliche) Arbeit (§ 2 Abs. 1 Nr. 3 EStG). Einkünfte = Gewinn.", normen: ["EStG 2 1"] },
  { text: "Tim ist als Steuerberater in einer großen Kanzlei angestellt.", richtig: 3, erkl: "Angestellt, weisungsgebunden und in die Kanzlei eingegliedert → Arbeitnehmer; Einkünfte aus nichtselbständiger Arbeit (§ 2 Abs. 1 Nr. 4 i.V.m. § 19 EStG). Einkünfte = Einnahmen − Werbungskosten.", normen: ["EStG 2 1", "EStG 2 2"] },
  { text: "Herr Bode vermietet eine Eigentumswohnung in Hannover an einen Studenten.", richtig: 5, erkl: "Vermietung von privatem unbeweglichem Vermögen → Vermietung und Verpachtung (§ 2 Abs. 1 Nr. 6 i.V.m. § 21 EStG). Einkünfte = Einnahmen − Werbungskosten.", normen: ["EStG 2 1"] },
  { text: "Frau Paulsen erhält eine Altersrente aus der gesetzlichen Rentenversicherung.", richtig: 6, erkl: "Renten aus der gesetzlichen Rentenversicherung sind sonstige Einkünfte (§ 2 Abs. 1 Nr. 7 i.V.m. § 22 Nr. 1 EStG).", normen: ["EStG 2 1"] },
  { text: "Ole erhält Zinsen auf sein Festgeldkonto.", richtig: 4, erkl: "Zinsen aus privaten Kapitalanlagen → Kapitalvermögen (§ 2 Abs. 1 Nr. 5 i.V.m. § 20 EStG); in der Regel mit dem Kapitalertragsteuerabzug abgegolten.", normen: ["EStG 2 1"] },
  { text: "Bauer Thies verkauft Weizen und Milch aus seinem Hof.", richtig: 0, erkl: "Ackerbau und Tierhaltung → Land- und Forstwirtschaft (§ 2 Abs. 1 Nr. 1 i.V.m. § 13 EStG).", normen: ["EStG 2 1"] },
  { text: "Pia gewinnt 50.000 € im Lotto.", richtig: 7, erkl: "Lottogewinne fallen unter keine der sieben Einkunftsarten → nicht steuerbar. Die Zinsen aus der Anlage des Gewinns wären dagegen Einkünfte aus Kapitalvermögen.", normen: ["EStG 2 1"] },
  { text: "Ein pensionierter Beamter erhält sein Ruhegehalt.", richtig: 3, erkl: "Bezüge aus einem früheren Dienstverhältnis (Versorgungsbezüge) gehören zu den Einkünften aus nichtselbständiger Arbeit (§ 19 Abs. 1 S. 1 Nr. 2 EStG).", normen: ["EStG 2 1"] },
]);

// Arbeitnehmer und Arbeitslohn (§§ 1, 2 LStDV) – Einstieg jeder Klausurlösung zu § 19 EStG
const arbeitnehmer = A("est-arbeitnehmer", "est-einkuenfte",
  "Wann ist jemand Arbeitnehmer im Sinne des Einkommensteuerrechts, und was gehört zum Arbeitslohn?",
  "• Arbeitnehmer sind Personen, die im öffentlichen oder privaten Dienst angestellt oder beschäftigt sind oder waren und aus diesem oder einem früheren Dienstverhältnis Arbeitslohn beziehen (§ 1 Abs. 1 S. 1 LStDV); auch ihre Rechtsnachfolger, soweit sie Arbeitslohn aus dem früheren Dienstverhältnis des Rechtsvorgängers beziehen, z. B. die Witwe mit Witwengeld (§ 1 Abs. 1 S. 2 LStDV).\n• Ein Dienstverhältnis liegt vor, wenn der Beschäftigte dem Arbeitgeber seine Arbeitskraft schuldet: Er steht unter dessen Leitung oder ist in dessen geschäftlichen Organismus eingegliedert und weisungsgebunden (§ 1 Abs. 2 LStDV).\n• Abgrenzung zur Selbständigkeit nach dem Gesamtbild (vgl. H 19.0 LStH): feste Arbeitszeit, Urlaubsanspruch, Lohnfortzahlung im Krankheitsfall, Bezahlung nach Zeit statt nach Erfolg, kein Unternehmerrisiko und keine eigene Unternehmerinitiative.\n• Arbeitslohn sind alle Einnahmen, die dem Arbeitnehmer aus dem Dienstverhältnis oder einem früheren Dienstverhältnis zufließen – gleich unter welcher Bezeichnung und in welcher Form, also auch Sachbezüge und Pensionen (§ 2 Abs. 1 LStDV, § 19 Abs. 1 EStG).\n• Folge: Einkünfte aus nichtselbständiger Arbeit (§ 2 Abs. 1 S. 1 Nr. 4 i. V. m. § 19 EStG), ermittelt als Überschuss der Einnahmen über die Werbungskosten (§ 2 Abs. 2 S. 1 Nr. 2 EStG); die ESt wird durch Lohnsteuerabzug erhoben (§ 38 Abs. 1 EStG).\n• Auch der angestellte Geschäftsführer einer GmbH ist Arbeitnehmer.",
  ["EStG 19 1", "EStG 2 1", "EStG 38 1"],
  M(["Arbeitnehmer ist, wer dem Arbeitgeber seine Arbeitskraft schuldet und weisungsgebunden eingegliedert ist.", "Die Witwe, die Witwengeld bezieht, ist als Rechtsnachfolgerin Arbeitnehmerin.", "Zum Arbeitslohn gehören auch Sachbezüge.", "Der angestellte Geschäftsführer einer GmbH ist Arbeitnehmer."],
    ["Arbeitnehmer ist nur, wer einen schriftlichen Arbeitsvertrag hat.", "Pensionen gehören nicht zum Arbeitslohn, weil kein Dienstverhältnis mehr besteht.", "Wer ein Unternehmerrisiko trägt, ist typischerweise Arbeitnehmer.", "Arbeitslohn sind nur Geldzahlungen mit der Bezeichnung „Gehalt“."],
    "Welche Aussagen zum Arbeitnehmerbegriff und zum Arbeitslohn sind richtig?"));
const AN_OPT = ["Arbeitnehmer – § 19 EStG", "Selbständige Arbeit – § 18 EStG", "Gewerbebetrieb – § 15 EStG"];
const arbeitnehmerFall = F("est-arbeitnehmer-fall", "est-einkuenfte", "Ist die Person Arbeitnehmer?", AN_OPT, [
  { text: "Donna ist angestellte Steuerberaterin in einer Kanzlei: feste Arbeitszeit, 30 Tage Urlaub, Gehalt monatlich.", richtig: 0, erkl: "Weisungsgebunden und in die Kanzlei eingegliedert → Dienstverhältnis (§ 1 Abs. 2 LStDV) → Arbeitnehmerin, Einkünfte aus § 19 Abs. 1 S. 1 Nr. 1 EStG.", normen: ["EStG 19 1"] },
  { text: "Arne ist angestellter Geschäftsführer einer IT-GmbH und erhält ein festes Gehalt.", richtig: 0, erkl: "Der angestellte GmbH-Geschäftsführer ist in das Unternehmen eingegliedert und weisungsgebunden → Arbeitnehmer (§ 1 Abs. 1, 2 LStDV), § 19 EStG.", normen: ["EStG 19 1"] },
  { text: "Birgit ist pensionierte Beamtin und erhält monatlich ihr Ruhegehalt.", richtig: 0, erkl: "Bezüge aus einem früheren Dienstverhältnis (§ 1 Abs. 1 S. 1, § 2 Abs. 1 LStDV) → Arbeitnehmerin, § 19 Abs. 1 S. 1 Nr. 2 EStG (Versorgungsbezüge, § 19 Abs. 2 EStG).", normen: ["EStG 19 1", "EStG 19 2"] },
  { text: "Nach dem Tod ihres Mannes, eines Beamten, erhält Gerda Witwengeld.", richtig: 0, erkl: "Rechtsnachfolgerin, die Arbeitslohn aus dem früheren Dienstverhältnis des Verstorbenen bezieht → Arbeitnehmerin (§ 1 Abs. 1 S. 2 LStDV), § 19 Abs. 1 S. 1 Nr. 2 EStG.", normen: ["EStG 19 1"] },
  { text: "Donna unterrichtet nebenberuflich als freie Dozentin an einer Hochschule; Honorar je Vorlesungsstunde, keine Eingliederung.", richtig: 1, erkl: "Selbständige unterrichtende Tätigkeit → § 18 Abs. 1 Nr. 1 EStG (ggf. steuerfrei nach § 3 Nr. 26 EStG).", normen: ["EStG 3"] },
  { text: "Birgit leitet als selbständige Chorleiterin einen Kirchenchor gegen Honorar.", richtig: 1, erkl: "Künstlerische Tätigkeit auf eigene Rechnung → § 18 Abs. 1 Nr. 1 EStG.", normen: ["EStG 2 1"] },
  { text: "Malte arbeitet als selbständiger Handelsvertreter und erhält nur Provisionen für vermittelte Verträge; Arbeitszeit und Kundenbesuche bestimmt er selbst.", richtig: 2, erkl: "Eigenes Unternehmerrisiko, Bezahlung nach Erfolg, keine Weisungsbindung → kein Arbeitnehmer, sondern Gewerbetreibender (§ 15 Abs. 2 EStG).", normen: ["EStG 15 2"] },
  { text: "Lisa ist Werkstudentin bei einer Bank: 15 Stunden pro Woche nach Dienstplan, Stundenlohn.", richtig: 0, erkl: "Auch Aushilfen und Werkstudenten schulden ihre Arbeitskraft nach Weisung → Arbeitnehmerin (§ 1 Abs. 1, 2 LStDV), § 19 EStG.", normen: ["EStG 19 1"] },
]);

const einkuenfteRechnen = R("est-einkuenfte-19", "est-einkuenfte", (r) => {
  const lohn = r.betrag(28000, 70000, 500) / 100;
  const sonst = r.zahl(2, 30) * 50; // andere Werbungskosten
  const gew = r.muenze() ? r.zahl(12, 36) * 10 : 0;
  const wk = Math.max(sonst, AN_PB) + gew;
  return {
    text: `Die Angestellte Svenja erhält 2026 einen Bruttoarbeitslohn von ${eur(lohn)}. Sie weist Werbungskosten für Fachliteratur und Arbeitsmittel von ${eur(sonst)} nach${gew ? ` und zahlt Gewerkschaftsbeiträge von ${eur(gew)}` : ""}.\n\nWie hoch sind ihre Einkünfte aus nichtselbständiger Arbeit (in €)?`,
    euro: lohn - wk,
    erklaerung: `Einkünfte = Einnahmen (§ 8 Abs. 1 EStG) − Werbungskosten (§§ 9, 9a EStG), § 2 Abs. 2 S. 1 Nr. 2 EStG.\n• ${sonst < AN_PB ? `Die nachgewiesenen ${eur(sonst)} liegen unter dem Arbeitnehmer-Pauschbetrag – anzusetzen sind ${eur(AN_PB)} (§ 9a S. 1 Nr. 1 a EStG).` : `Die nachgewiesenen ${eur(sonst)} übersteigen den Arbeitnehmer-Pauschbetrag von ${eur(AN_PB)} – anzusetzen sind die tatsächlichen Werbungskosten.`}${gew ? `\n• Gewerkschaftsbeiträge (§ 9 Abs. 1 S. 3 Nr. 3 EStG) werden seit 2026 zusätzlich zum Pauschbetrag berücksichtigt (§ 9a S. 3 EStG): + ${eur(gew)}.` : ""}\n• ${eur(lohn)} − ${eur(wk)} = ${eur(lohn - wk)}`,
    normen: ["EStG 2 2", "EStG 9a"],
  };
});

// ======================================================================= Vom Einkommen zum zvE
const zve = [
  A("est-zve-schema", "est-zve",
    "Wie wird das zu versteuernde Einkommen ermittelt? Nennen Sie das Schema mit Fundstellen.",
    "§ 2 EStG, R 2 Abs. 1 EStR:\n  Einkünfte aus den sieben Einkunftsarten (§ 2 Abs. 1, 2)\n= Summe der Einkünfte (§ 2 Abs. 3) – nach horizontalem und vertikalem Verlustausgleich\n− Altersentlastungsbetrag (§ 24a), Entlastungsbetrag für Alleinerziehende (§ 24b), Freibetrag für Land- und Forstwirte (§ 13 Abs. 3)\n= Gesamtbetrag der Einkünfte (§ 2 Abs. 3)\n− Verlustabzug (§ 10d), Sonderausgaben (§§ 10–10c), außergewöhnliche Belastungen (§§ 33–33b)\n= Einkommen (§ 2 Abs. 4)\n− Freibeträge für Kinder (§ 32 Abs. 6)\n= zu versteuerndes Einkommen (§ 2 Abs. 5) – Bemessungsgrundlage der tariflichen ESt.\nKlausurtipp: Alle Zwischenschritte mit den Begriffen des § 2 EStG nennen.",
    ["EStG 2 3", "EStG 2 4", "EStG 2 5", "EStR 2 1"],
    M(["Die Summe der Einkünfte vermindert um den Altersentlastungsbetrag ist (ein Schritt zum) Gesamtbetrag der Einkünfte.", "Sonderausgaben werden vom Gesamtbetrag der Einkünfte abgezogen.", "Das Einkommen vermindert um die Kinderfreibeträge ist das zu versteuernde Einkommen.", "Außergewöhnliche Belastungen mindern den Gesamtbetrag der Einkünfte zum Einkommen."],
      ["Sonderausgaben werden bei der Ermittlung der Einkünfte als Werbungskosten abgezogen.", "Das zu versteuernde Einkommen ist der Gesamtbetrag der Einkünfte vor Abzug der Sonderausgaben.", "Kinderfreibeträge werden von der Summe der Einkünfte abgezogen.", "Der Entlastungsbetrag für Alleinerziehende mindert das Einkommen zum zu versteuernden Einkommen."],
      "Welche Aussagen zum Schema des § 2 EStG sind richtig?")),
  A("est-verlustausgleich", "est-zve",
    "Was versteht man unter horizontalem und vertikalem Verlustausgleich?",
    "Bei der Ermittlung der Summe der Einkünfte werden positive und negative Einkünfte verrechnet:\n• Horizontaler Verlustausgleich: Verrechnung innerhalb derselben Einkunftsart (z. B. Gewinn aus einem Gewerbebetrieb mit Verlust aus einem zweiten Gewerbebetrieb).\n• Vertikaler Verlustausgleich: Verrechnung zwischen verschiedenen Einkunftsarten (z. B. Verlust aus Vermietung mit Einkünften aus nichtselbständiger Arbeit).\nNicht immer unbeschränkt möglich – Einschränkungen z. B. bei privaten Veräußerungsgeschäften und Kapitaleinkünften. Bei Zusammenveranlagung werden die Einkünfte der Ehegatten zusammengerechnet (§ 26b EStG) – so ist auch ein Ausgleich zwischen den Ehegatten möglich.",
    ["EStG 2 3", "EStG 26b"],
    M(["Der horizontale Verlustausgleich verrechnet innerhalb derselben Einkunftsart.", "Der vertikale Verlustausgleich verrechnet zwischen verschiedenen Einkunftsarten.", "Der Verlustausgleich ist nicht in allen Fällen unbeschränkt möglich."],
      ["Der horizontale Verlustausgleich verrechnet Verluste mit Vorjahren.", "Verluste aus Vermietung dürfen nie mit Arbeitslohn verrechnet werden.", "Der vertikale Verlustausgleich verrechnet nur zwischen Ehegatten.", "Ein Verlustausgleich ist im Einkommensteuerrecht unzulässig."],
      "Welche Aussagen zum Verlustausgleich sind richtig?")),
];

const zveRechnen = R("est-zve-rechnen", "est-zve", (r) => {
  const gewerbe = r.betrag(15000, 60000, 500) / 100;
  const kiosk = -r.betrag(1000, 9000, 500) / 100;
  const vuv = r.betrag(2000, 12000, 500) / 100;
  const sa = r.betrag(3000, 9000, 100) / 100, agb = r.muenze() ? r.betrag(500, 3000, 100) / 100 : 0;
  const sde = gewerbe + kiosk + vuv, eink = sde - sa - agb;
  return {
    text: `Der ledige, kinderlose Malte (35 Jahre, Wohnsitz Bremen) erzielt 2026:\n• Gewinn aus einem Malerbetrieb: ${eur(gewerbe)}\n• Verlust aus einem Kiosk: ${eur(-kiosk)}\n• Einkünfte aus Vermietung einer Wohnung: ${eur(vuv)}\nAbziehbare Sonderausgaben: ${eur(sa)}${agb ? `; außergewöhnliche Belastungen: ${eur(agb)}` : ""}.\n\nWie hoch ist sein zu versteuerndes Einkommen (in €)?`,
    euro: eink,
    erklaerung: `Einkünfte aus Gewerbebetrieb (§ 15 EStG): ${eur(gewerbe)} − ${eur(-kiosk)} = ${eur(gewerbe + kiosk)} (horizontaler Verlustausgleich)\n+ Vermietung und Verpachtung (§ 21 EStG): ${eur(vuv)} (vertikaler Verlustausgleich)\n= Summe der Einkünfte = Gesamtbetrag der Einkünfte (§ 2 Abs. 3 EStG): ${eur(sde)}\n− Sonderausgaben: ${eur(sa)}${agb ? `\n− außergewöhnliche Belastungen: ${eur(agb)}` : ""}\n= Einkommen (§ 2 Abs. 4 EStG) = zu versteuerndes Einkommen (§ 2 Abs. 5 EStG, keine Kinder): ${eur(eink)}`,
    normen: ["EStG 2 3", "EStG 2 4", "EStG 2 5"],
  };
});

// ======================================================================= Veranlagung (§§ 25, 26, 46 EStG)
const veranlagung = [
  A("est-wahlrecht", "est-veranlagung",
    "Unter welchen Voraussetzungen haben Ehegatten ein Veranlagungswahlrecht, und wie wird es ausgeübt?",
    "Voraussetzungen (§ 26 Abs. 1 S. 1 EStG) – einzeln zu prüfen:\n• Ehegatten: rechtsgültige Ehe nach BGB (auch eingetragene Lebenspartner, § 2 Abs. 8 EStG),\n• beide unbeschränkt einkommensteuerpflichtig (Nr. 1),\n• nicht dauernd getrennt lebend (Nr. 2),\n• die Voraussetzungen lagen zu Beginn des VZ vor oder sind im Laufe des VZ eingetreten (Nr. 3) – ein Tag genügt.\nWahl: Einzelveranlagung (§ 26a) oder Zusammenveranlagung (§ 26b).\nAusübung (§ 26 Abs. 2, 3 EStG):\n• Einzelveranlagung, wenn (mindestens) einer sie wählt – unbeachtlich bei einem Ehegatten ohne eigene Einkünfte (H 26 EStH).\n• Zusammenveranlagung, wenn beide sie wählen.\n• Keine Wahl getroffen → Zusammenveranlagung von Amts wegen (§ 26 Abs. 3).\n• Die Wahl ist mit Eingang der Erklärung grundsätzlich bindend.",
    ["EStG 26 1", "EStG 26 2", "EStG 26 3"],
    M(["Beide Ehegatten müssen unbeschränkt einkommensteuerpflichtig sein.", "Die Ehegatten dürfen nicht dauernd getrennt leben.", "Wird keine Wahl getroffen, wird eine Zusammenveranlagung durchgeführt.", "Ein einziger Tag im Veranlagungszeitraum mit erfüllten Voraussetzungen genügt."],
      ["Die Voraussetzungen müssen das ganze Jahr über vorliegen.", "Wird keine Wahl getroffen, wird jeder Ehegatte einzeln veranlagt.", "Wählt ein Ehegatte ohne eigene Einkünfte die Einzelveranlagung, ist diese durchzuführen.", "Für die Zusammenveranlagung genügt es, wenn ein Ehegatte unbeschränkt steuerpflichtig ist."],
      "Welche Aussagen zum Veranlagungswahlrecht von Ehegatten sind richtig?")),
  A("est-getrennt", "est-veranlagung",
    "Wann leben Ehegatten „dauernd getrennt“? Nennen Sie Beispiele, in denen trotz räumlicher Trennung kein dauerndes Getrenntleben vorliegt.",
    "• Dauerndes Getrenntleben liegt vor, wenn die Lebens- und Wirtschaftsgemeinschaft nach dem Gesamtbild der Verhältnisse auf Dauer nicht mehr besteht.\n• Erforderlich sind ein objektives Merkmal (tatsächliche, räumliche Trennung) und ein subjektives Merkmal (Wille zur dauernden Trennung).\n• Eine vorübergehende Trennung ist unbeachtlich.\n• Kein dauerndes Getrenntleben trotz räumlicher Trennung, wenn der Trennungswille fehlt: Verbüßung einer Freiheitsstrafe, längerer beruflicher Auslandsaufenthalt, Krankenhaus- oder Heimaufenthalt (R 26 Abs. 1 EStR).\n• Indizien für eine dauernde Trennung: entsprechende Angabe in der Erklärung, Scheidungsantrag, verschiedene Anschriften.\n• Ein verschollener Ehegatte gilt weiter als lebend.",
    ["EStG 26 1"],
    M(["Dauerndes Getrenntleben setzt eine räumliche Trennung und den Willen zur dauernden Trennung voraus.", "Ein Gefängnisaufenthalt eines Ehegatten führt allein nicht zum dauernden Getrenntleben.", "Ein Scheidungsantrag ist ein Indiz für dauerndes Getrenntleben."],
      ["Jede räumliche Trennung führt zum dauernden Getrenntleben.", "Ein beruflicher Auslandsaufenthalt eines Ehegatten beendet immer das Veranlagungswahlrecht.", "Für das dauernde Getrenntleben genügt der Trennungswille ohne räumliche Trennung.", "Ein verschollener Ehegatte gilt als verstorben."],
      "Welche Aussagen zum dauernden Getrenntleben sind richtig?")),
  A("est-erklaerungspflicht", "est-veranlagung",
    "Wer muss eine Einkommensteuererklärung abgeben? Wann werden Arbeitnehmer veranlagt?",
    "• § 25 Abs. 3 EStG i.V.m. § 56 EStDV: Erklärungspflicht insbesondere, wenn der Gesamtbetrag der Einkünfte den Grundfreibetrag (2026: 12.348 €) übersteigt, oder wenn zum Ende des Vorjahres ein Verlustvortrag festgestellt wurde.\n• Arbeitnehmer („Nur-Arbeitnehmer“): Die ESt ist grundsätzlich durch den Lohnsteuerabzug abgegolten (§ 46 Abs. 4 EStG).\n• Pflichtveranlagung in den Fällen des § 46 Abs. 2 Nr. 1–7 EStG (z. B. Nebeneinkünfte über 410 €, Lohn von mehreren Arbeitgebern, Steuerklassenkombination III/V).\n• Antragsveranlagung (§ 46 Abs. 2 Nr. 8 EStG), wenn eine Erstattung zu erwarten ist.\n• Die Erklärung ist nach amtlichem Vordruck oder elektronisch (ELSTER, § 25 Abs. 4 EStG) abzugeben und eigenhändig zu unterschreiben bzw. zu authentifizieren (§ 25 Abs. 3 EStG).",
    ["EStG 25 3", "EStG 46 2", "EStG 46 4"],
    M(["Bei reinen Arbeitnehmern ist die Einkommensteuer grundsätzlich durch den Lohnsteuerabzug abgegolten.", "Arbeitnehmer können eine Veranlagung beantragen, wenn sie eine Erstattung erwarten.", "In den Fällen des § 46 Abs. 2 Nr. 1–7 EStG werden Arbeitnehmer von Amts wegen veranlagt.", "Die Steuererklärung kann elektronisch über ELSTER abgegeben werden."],
      ["Jeder Arbeitnehmer muss jedes Jahr eine Steuererklärung abgeben.", "Arbeitnehmer dürfen keine Steuererklärung abgeben.", "Die Erklärungspflicht beginnt erst ab einem Gesamtbetrag der Einkünfte von 50.000 €.", "Die Steuererklärung muss nicht unterschrieben werden."],
      "Welche Aussagen zur Erklärungspflicht und zur Veranlagung von Arbeitnehmern sind richtig?")),
  A("est-26a-26b", "est-veranlagung",
    "Wie unterscheiden sich Einzelveranlagung von Ehegatten (§ 26a EStG) und Zusammenveranlagung (§ 26b EStG)?",
    "Einzelveranlagung (§ 26a EStG):\n• Jedem Ehegatten werden die von ihm bezogenen Einkünfte zugerechnet.\n• zvE und ESt werden für jeden getrennt ermittelt; jeder gibt eine eigene Erklärung ab.\n• Tarif: ausschließlich Grundtarif (§ 32a Abs. 6 S. 2 EStG).\nZusammenveranlagung (§ 26b EStG):\n• Die Einkünfte werden für jeden Ehegatten getrennt ermittelt (bis zur Summe der Einkünfte),\n• dann zusammengerechnet – ab dem Gesamtbetrag der Einkünfte werden die Ehegatten wie ein Steuerpflichtiger behandelt; dadurch Verlustausgleich zwischen den Ehegatten.\n• Gemeinsame Erklärung, gemeinsames zvE.\n• Tarif: Splittingverfahren (§ 32a Abs. 5 EStG).",
    ["EStG 26a 1", "EStG 26b", "EStG 32a 5"],
    M(["Bei der Zusammenveranlagung werden die Einkünfte zunächst für jeden Ehegatten getrennt ermittelt.", "Bei der Zusammenveranlagung ist ein Verlustausgleich zwischen den Ehegatten möglich.", "Bei der Einzelveranlagung von Ehegatten gilt der Grundtarif.", "Bei der Zusammenveranlagung wird das Splittingverfahren angewendet."],
      ["Bei der Einzelveranlagung von Ehegatten gilt das Splittingverfahren.", "Bei der Zusammenveranlagung werden die Einnahmen beider Ehegatten vor Abzug der Werbungskosten zusammengerechnet.", "Bei der Einzelveranlagung von Ehegatten geben beide eine gemeinsame Erklärung ab.", "Bei der Zusammenveranlagung ist kein Verlustausgleich zwischen den Ehegatten möglich."],
      "Welche Aussagen zu Einzel- und Zusammenveranlagung von Ehegatten sind richtig?")),
];

const VER_OPT = ["Wahlrecht: Einzelveranlagung (§ 26a) oder Zusammenveranlagung (§ 26b) – bei Zusammenveranlagung Splittingtarif",
  "Einzelveranlagung (§ 25 Abs. 1 EStG) mit Grundtarif", "Einzelveranlagung (§ 25 Abs. 1 EStG) mit Splittingtarif (§ 32a Abs. 6 EStG)"];
const veranlagungFall = F("est-veranlagung-fall", "est-veranlagung", "Welche Veranlagungsart und welcher Tarif gelten für den Veranlagungszeitraum 01?", VER_OPT, [
  { text: "Kai und Bea sind seit Jahren verheiratet und wohnen in Hamburg. Am 03.01.01 trennen sie sich endgültig; Kai zieht aus.", richtig: 0,
    erkl: "Die Voraussetzungen des § 26 Abs. 1 S. 1 EStG lagen zu Beginn des VZ (1. und 2. Januar) vor – das genügt (Nr. 3). Wahlrecht zwischen Einzelveranlagung (§ 26a) und Zusammenveranlagung (§ 26b).", normen: ["EStG 26 1"] },
  { text: "Jonas und Mia heiraten am 31.12.01 und wohnen gemeinsam in Leipzig. Beide sind unbeschränkt steuerpflichtig.", richtig: 0,
    erkl: "Die Voraussetzungen sind im Laufe des VZ eingetreten (§ 26 Abs. 1 S. 1 Nr. 3 EStG) – ein Tag genügt. Wahlrecht; bei Zusammenveranlagung Splitting (§ 32a Abs. 5 EStG).", normen: ["EStG 26 1"] },
  { text: "Leon und Sara leben seit drei Jahren dauernd getrennt, sind aber noch nicht geschieden.", richtig: 1,
    erkl: "Wegen des dauernden Getrenntlebens fehlt die Voraussetzung des § 26 Abs. 1 S. 1 Nr. 2 EStG → kein Wahlrecht; jeder wird nach § 25 Abs. 1 EStG einzeln mit Grundtarif veranlagt.", normen: ["EStG 26 1", "EStG 25 1"] },
  { text: "Herr Ali verbüßt im gesamten Jahr 01 eine Freiheitsstrafe. Seine Ehefrau lebt weiter in der gemeinsamen Wohnung; beide wollen an der Ehe festhalten.", richtig: 0,
    erkl: "Räumliche Trennung allein genügt nicht – es fehlt der Wille zur dauernden Trennung (R 26 Abs. 1 EStR). Die Ehegatten leben nicht dauernd getrennt → Wahlrecht nach § 26 EStG.", normen: ["EStG 26 1"] },
  { text: "Frau Lenz ist ledig und kinderlos.", richtig: 1,
    erkl: "Keine Ehe → kein Wahlrecht nach § 26 EStG; Einzelveranlagung nach § 25 Abs. 1 EStG mit Grundtarif (§ 32a Abs. 1 EStG).", normen: ["EStG 25 1"] },
  { text: "Herr Brandt und seine Frau waren seit Jahren verheiratet und lebten zusammen. Frau Brandt ist im Dezember 00 verstorben. Gefragt ist nach der Veranlagung von Herrn Brandt für 01 (er hat nicht wieder geheiratet).", richtig: 2,
    erkl: "Im Todesjahr 00 besteht noch das Wahlrecht. Im Folgejahr 01 wird Herr Brandt einzeln veranlagt (§ 25 Abs. 1 EStG), erhält aber das Verwitwetensplitting (§ 32a Abs. 6 S. 1 Nr. 1 EStG). Ab 02 gilt der Grundtarif.", normen: ["EStG 32a 6", "EStG 25 1"] },
  { text: "Herr Kraft und seine Frau waren seit Jahren verheiratet und lebten zusammen. Frau Kraft ist im März 00 verstorben. Gefragt ist nach der Veranlagung von Herrn Kraft für 02.", richtig: 1,
    erkl: "Das Verwitwetensplitting gilt nur im Jahr nach dem Tod (01). Im VZ 02 wird Herr Kraft einzeln mit Grundtarif veranlagt (§ 25 Abs. 1, § 32a Abs. 1 EStG).", normen: ["EStG 32a 6", "EStG 25 1"] },
  { text: "Anna und Ben waren verheiratet und lebten bis Januar 01 zusammen; am 01.02.01 trennen sie sich endgültig, die Ehe wird im Sommer geschieden. Ben heiratet am 01.12.01 Carla; beide leben zusammen in Hamburg. Gefragt ist nach der Veranlagung von Anna für 01.", richtig: 2,
    erkl: "Für Ben bleibt die aufgelöste Ehe mit Anna unberücksichtigt, weil er im selben Jahr neu geheiratet hat und mit Carla die Voraussetzungen des § 26 Abs. 1 S. 1 EStG erfüllt (§ 26 Abs. 1 S. 2 EStG). Anna wird einzeln veranlagt (§ 25 Abs. 1 EStG), erhält aber das Splittingverfahren (§ 32a Abs. 6 S. 1 Nr. 2 EStG, „Härte-“ bzw. „Betrogenensplitting“).", normen: ["EStG 26 1", "EStG 32a 6"] },
]);

// ======================================================================= Tarif und festzusetzende ESt
const tarif = [
  A("est-tarifzonen", "est-tarif",
    "Wie ist der Einkommensteuertarif 2026 aufgebaut?",
    "§ 32a Abs. 1 EStG – Bemessungsgrundlage ist das auf volle Euro abgerundete zvE:\n• bis 12.348 €: Grundfreibetrag (Nullzone)\n• 12.349 – 17.799 €: untere Progressionszone (14 – 24 %)\n• 17.800 – 69.878 €: obere Progressionszone (24 – 42 %)\n• 69.879 – 277.825 €: Proportionalzone I (42 %)\n• ab 277.826 €: Proportionalzone II („Reichensteuer“, 45 %)\nEs ist nur die eine Formel anzuwenden, in deren Bereich das zvE fällt; y = (zvE − 12.348) / 10.000, z = (zvE − 17.799) / 10.000. Der Steuerbetrag wird auf volle Euro abgerundet (§ 32a Abs. 1 S. 6 EStG).\nDurchschnittsteuersatz = ESt / zvE; Grenzsteuersatz = Belastung des nächsten Euros – der Durchschnittssteuersatz ist immer niedriger.",
    ["EStG 32a 1"],
    M(["Der Grundfreibetrag beträgt 2026 12.348 €.", "Der Spitzensteuersatz von 42 % beginnt 2026 bei 69.879 €.", "Der Steuerbetrag wird auf volle Euro abgerundet.", "Der Durchschnittsteuersatz ist immer niedriger als der Grenzsteuersatz."],
      ["Der Grundfreibetrag beträgt 2026 11.784 €.", "Der Eingangssteuersatz beträgt 24 %.", "Für jedes zvE werden alle fünf Tarifformeln nacheinander angewendet.", "Der Steuerbetrag wird kaufmännisch auf volle Euro gerundet."],
      "Welche Aussagen zum Einkommensteuertarif 2026 sind richtig?")),
  A("est-splitting", "est-tarif",
    "Wie funktioniert das Splittingverfahren, und in welchen Fällen wird es angewendet?",
    "Verfahren (§ 32a Abs. 5 EStG): Das gemeinsame zvE wird halbiert (auf volle Euro abgerundet), darauf die Tarifformel des § 32a Abs. 1 angewendet, abgerundet und der Betrag verdoppelt.\nWirkung: doppelte Nutzung von Grundfreibetrag und unteren Tarifzonen; Ausgleich unterschiedlich hoher Einkommen der Ehegatten (maximaler Splittingvorteil 2026 rund 19.470 €).\nAnwendung:\n• Zusammenveranlagung (§ 26b EStG),\n• Verwitwetensplitting: im Jahr nach dem Tod des Ehegatten, wenn im Zeitpunkt des Todes die Voraussetzungen des § 26 Abs. 1 S. 1 vorlagen (§ 32a Abs. 6 S. 1 Nr. 1 EStG),\n• im Jahr der Auflösung der Ehe, wenn der bisherige Ehegatte im selben Jahr wieder heiratet und die Voraussetzungen jeweils vorliegen (§ 32a Abs. 6 S. 1 Nr. 2 EStG).\nBei Einzelveranlagung von Ehegatten nach § 26a gilt nur der Grundtarif.",
    ["EStG 32a 5", "EStG 32a 6"],
    M(["Beim Splitting wird das gemeinsame zvE halbiert und die Steuer darauf verdoppelt.", "Das Splittingverfahren gilt bei der Zusammenveranlagung.", "Verwitwete erhalten das Splitting im Jahr nach dem Tod des Ehegatten.", "Der Splittingvorteil ist umso größer, je unterschiedlicher die Einkommen der Ehegatten sind."],
      ["Beim Splitting wird die Steuer jedes Ehegatten getrennt berechnet und addiert.", "Verwitwete erhalten das Splitting für drei Jahre nach dem Tod des Ehegatten.", "Bei der Einzelveranlagung von Ehegatten gilt das Splittingverfahren.", "Der Splittingvorteil ist bei gleich hohen Einkommen am größten."],
      "Welche Aussagen zum Splittingverfahren sind richtig?")),
  A("est-festsetzung", "est-tarif",
    "Wie gelangen Sie von der tariflichen Einkommensteuer zur Abschlusszahlung bzw. Erstattung?",
    "Festzusetzende ESt (§ 2 Abs. 6 EStG, R 2 Abs. 2 EStR):\n  tarifliche ESt (§ 32a Abs. 1 oder 5)\n− Steuerermäßigungen, z. B. § 34g (Parteispenden), § 35a (haushaltsnahe Leistungen)\n+ Anspruch auf Kindergeld (bei Ansatz der Kinderfreibeträge)\n= festzusetzende ESt – sie entsteht mit Ablauf des VZ (§ 36 Abs. 1).\nErhebungsverfahren (§ 36 EStG):\n− Einkommensteuer-Vorauszahlungen (§ 36 Abs. 2 Nr. 1)\n− Lohnsteuer und andere Steuerabzugsbeträge (§ 36 Abs. 2 Nr. 2)\n= Abschlusszahlung (fällig einen Monat nach Bekanntgabe des Bescheids, § 36 Abs. 4 S. 1) bzw. Erstattung (§ 36 Abs. 4 S. 2).\nDie Anrechnung gehört nicht mehr zur Festsetzung, sondern zur Erhebung.",
    ["EStG 2 6", "EStR 2 2", "EStG 36 1", "EStG 36 2", "EStG 36 4"],
    M(["Die Einkommensteuer entsteht mit Ablauf des Veranlagungszeitraums.", "Lohnsteuer und Vorauszahlungen werden auf die festzusetzende Einkommensteuer angerechnet.", "Eine Abschlusszahlung ist innerhalb eines Monats nach Bekanntgabe des Bescheids zu leisten.", "Die Anrechnung gehört zum Steuererhebungsverfahren."],
      ["Die Lohnsteuer wird bei der Ermittlung der Einkünfte als Werbungskosten abgezogen.", "Die Einkommensteuer entsteht mit Abgabe der Steuererklärung.", "Vorauszahlungen werden vom zu versteuernden Einkommen abgezogen.", "Eine Abschlusszahlung ist sofort bei Abgabe der Erklärung fällig."],
      "Welche Aussagen zur festzusetzenden Einkommensteuer und zur Abschlusszahlung sind richtig?")),
];

function zufallsZvE(r, zonen = [2, 3, 3, 3, 4]) {
  const z = r.wahl(zonen);
  if (z === 2) return r.zahl(12400, 17790);
  if (z === 3) return r.zahl(18000, 69800);
  if (z === 4) return r.zahl(70000, 250000);
  return r.zahl(280000, 500000);
}
const tarifGrund = R("est-tarif-grund", "est-tarif", (r) => {
  const x = zufallsZvE(r, [2, 3, 3, 3, 4, 4, 5]);
  const st = grundtarif(x);
  return {
    text: `Ein lediger Steuerpflichtiger hat 2026 ein zu versteuerndes Einkommen von ${eur(x)}.\n\nWie hoch ist die tarifliche Einkommensteuer nach dem Grundtarif (in €)?`,
    euro: st,
    erklaerung: `§ 32a Abs. 1 EStG, Formel ${zone(x).text}\n→ ${eur(st)} (auf volle Euro abgerundet, § 32a Abs. 1 S. 6 EStG).`,
    normen: ["EStG 32a 1"],
  };
});
const tarifSplit = R("est-tarif-splitting", "est-tarif", (r) => {
  const x = r.zahl(30000, 220000), h = Math.floor(x / 2), st = splitting(x);
  return {
    text: `Die Eheleute Kowalski werden 2026 zusammen veranlagt. Ihr gemeinsames zu versteuerndes Einkommen beträgt ${eur(x)}.\n\nWie hoch ist die tarifliche Einkommensteuer (in €)?`,
    euro: st,
    erklaerung: `Splittingverfahren (§ 32a Abs. 5 EStG):\n1. Halbes zvE: ${eur(x)} / 2 = ${eur(h)}\n2. ESt auf ${eur(h)} nach § 32a Abs. 1: ${zone(h).text} → ${eur(grundtarif(h))}\n3. Verdoppeln: 2 × ${eur(grundtarif(h))} = ${eur(st)}\nZum Vergleich nach Grundtarif: ${eur(grundtarif(x))} – Splittingvorteil ${eur(grundtarif(x) - st)}.`,
    normen: ["EStG 32a 5", "EStG 32a 1"],
  };
});
const abschluss = R("est-abschluss", "est-tarif", (r) => {
  const ehe = r.muenze();
  const x = ehe ? r.zahl(50000, 150000) : r.zahl(30000, 90000);
  const st = ehe ? splitting(x) : grundtarif(x);
  const lst = Math.round(st * (0.75 + r.next() * 0.45));
  const vz = r.muenze() ? r.zahl(2, 20) * 250 : 0;
  const erg = st - lst - vz;
  return {
    text: `${ehe ? "Die zusammen veranlagten Eheleute Yilmaz haben" : "Der ledige Herr Petersen hat"} 2026 ein zu versteuerndes Einkommen von ${eur(x)}. Einbehaltene Lohnsteuer: ${eur(lst)}${vz ? `; geleistete ESt-Vorauszahlungen: ${eur(vz)}` : ""}. Steuerermäßigungen und Kinder gibt es nicht.\n\nErmitteln Sie die Abschlusszahlung bzw. Erstattung (in €; eine Erstattung mit Minus eingeben).`,
    euro: erg,
    erklaerung: `Tarifliche ESt (${ehe ? "Splittingverfahren, § 32a Abs. 5" : "Grundtarif, § 32a Abs. 1"} EStG) = festzusetzende ESt (§ 2 Abs. 6 EStG): ${eur(st)}\n− Lohnsteuer (§ 36 Abs. 2 Nr. 2 EStG): ${eur(lst)}${vz ? `\n− Vorauszahlungen (§ 36 Abs. 2 Nr. 1 EStG): ${eur(vz)}` : ""}\n= ${erg >= 0 ? `Abschlusszahlung ${eur(erg)} (§ 36 Abs. 4 S. 1 EStG: fällig einen Monat nach Bekanntgabe)` : `Erstattung ${eur(-erg)} (§ 36 Abs. 4 S. 2 EStG)`}`,
    normen: ["EStG 2 6", "EStG 36 2", "EStG 36 4"],
  };
});

// ======================================================================= Einnahmen, steuerfreie Einnahmen
const einnahmen = [
  A("est-einnahmen-begriff", "est-einnahmen",
    "Was sind Einnahmen im Sinne des EStG? Unterscheiden Sie steuerbare, steuerfreie und nicht steuerbare Zuflüsse.",
    "• Einnahmen sind alle Güter in Geld oder Geldeswert (Geld, Sachen, Leistungen, Nutzungen), die im Rahmen einer Einkunftsart zufließen (§ 8 Abs. 1 EStG; bei Gewinneinkünften Betriebseinnahmen).\n• Steuerbar sind nur Zuflüsse im Rahmen der sieben Einkunftsarten (§ 2 Abs. 1 EStG). Sie sind steuerpflichtig, wenn nichts anderes geregelt ist.\n• Steuerfrei sind steuerbare Einnahmen nur, wenn das Gesetz es ausdrücklich anordnet (§§ 3–3c EStG).\n• Nicht steuerbar sind Zuflüsse auf der privaten Vermögensebene: private Geschenke, Erbschaften, Glücksspielgewinne, Zufallsfunde, private Verkäufe, Aufmerksamkeiten an Arbeitnehmer.\n• Auch rechts- oder sittenwidrige Einnahmen sind steuerbar (§ 40 AO).",
    ["EStG 8 1", "EStG 2 1", "EStG 3"],
    M(["Einnahmen sind alle Güter in Geld oder Geldeswert, die im Rahmen einer Einkunftsart zufließen.", "Steuerfrei sind Einnahmen nur, wenn das Gesetz dies ausdrücklich bestimmt.", "Eine private Schenkung ist nicht steuerbar.", "Sachzuwendungen können ebenfalls Einnahmen sein."],
      ["Steuerfreie Einnahmen sind dasselbe wie nicht steuerbare Zuflüsse.", "Einnahmen liegen nur bei Geldzahlungen vor.", "Einnahmen aus illegalen Geschäften sind nicht steuerbar.", "Jeder Zufluss ist steuerpflichtig, wenn er nicht in § 3 EStG steht."],
      "Welche Aussagen zu Einnahmen im Sinne des EStG sind richtig?")),
  A("est-progressionsvorbehalt", "est-einnahmen",
    "Was bedeutet Progressionsvorbehalt? Nennen Sie Beispiele für steuerfreie Einnahmen mit und ohne Progressionsvorbehalt.",
    "• Progressionsvorbehalt (§ 32b EStG): Die steuerfreien Einnahmen bleiben zwar steuerfrei, werden aber bei der Berechnung des Steuersatzes auf das zvE einbezogen – das übrige Einkommen wird mit einem höheren Satz besteuert.\n• Mit Progressionsvorbehalt (Einkommensersatzleistungen): Arbeitslosengeld, Kurzarbeitergeld, Insolvenzgeld (§ 3 Nr. 2), Mutterschaftsgeld, Elterngeld (§ 3 Nr. 67).\n• Ohne Progressionsvorbehalt z. B.: Reisekostenerstattungen (§ 3 Nr. 13, 16), Zuschüsse zum Job-Ticket (§ 3 Nr. 15), typische Berufskleidung (§ 3 Nr. 31), Kinderbetreuung (§ 3 Nr. 33), Gesundheitsförderung (§ 3 Nr. 34), Dienstfahrrad (§ 3 Nr. 37), Überlassung von PC und Handy (§ 3 Nr. 45), Trinkgelder an Arbeitnehmer (§ 3 Nr. 51), Arbeitgeberanteil zur Sozialversicherung (§ 3 Nr. 62), kleine Photovoltaikanlagen (§ 3 Nr. 72), Übungsleiterfreibetrag (§ 3 Nr. 26).",
    ["EStG 3"],
    M(["Arbeitslosengeld ist steuerfrei, unterliegt aber dem Progressionsvorbehalt.", "Elterngeld unterliegt dem Progressionsvorbehalt.", "Der Arbeitgeberanteil zur Sozialversicherung ist steuerfrei (§ 3 Nr. 62 EStG).", "Freiwillige Trinkgelder an Arbeitnehmer sind steuerfrei (§ 3 Nr. 51 EStG)."],
      ["Beim Progressionsvorbehalt wird die steuerfreie Leistung voll besteuert.", "Trinkgelder an den Betriebsinhaber sind nach § 3 Nr. 51 EStG steuerfrei.", "Arbeitslosengeld ist steuerpflichtiger Arbeitslohn.", "Der Progressionsvorbehalt senkt den Steuersatz auf das übrige Einkommen."],
      "Welche Aussagen zu steuerfreien Einnahmen und zum Progressionsvorbehalt sind richtig?")),
  A("est-3c", "est-einnahmen",
    "Dürfen Ausgaben, die mit steuerfreien Einnahmen zusammenhängen, abgezogen werden? Nennen Sie Beispiele.",
    "• Grundsatz § 3c Abs. 1 EStG: Ausgaben, die mit steuerfreien Einnahmen in unmittelbarem wirtschaftlichen Zusammenhang stehen, dürfen nicht als Betriebsausgaben oder Werbungskosten abgezogen werden.\n• Beispiele: Reisekosten, die der Arbeitgeber steuerfrei erstattet, kürzen die abziehbaren Werbungskosten; steuerfreie Arbeitgeberzuschüsse zum Job-Ticket mindern die Entfernungspauschale (§ 3 Nr. 15 S. 3 EStG).\n• Ausnahme Übungsleiter- und Ehrenamtsfreibetrag (§ 3 Nr. 26 S. 2, Nr. 26a S. 3 EStG): Ausgaben sind abziehbar, soweit sie die steuerfreien Einnahmen übersteigen.",
    ["EStG 3c 1", "EStG 3"],
    M(["Ausgaben im Zusammenhang mit steuerfreien Einnahmen sind grundsätzlich nicht abziehbar.", "Ein steuerfreier Job-Ticket-Zuschuss mindert die Entfernungspauschale.", "Beim Übungsleiterfreibetrag sind Ausgaben abziehbar, soweit sie die steuerfreien Einnahmen übersteigen."],
      ["Ausgaben im Zusammenhang mit steuerfreien Einnahmen sind doppelt abziehbar.", "Steuerfrei erstattete Reisekosten können zusätzlich als Werbungskosten abgezogen werden.", "Beim Übungsleiterfreibetrag sind sämtliche Ausgaben stets voll abziehbar.", "§ 3c EStG gilt nur für Gewerbetreibende."],
      "Welche Aussagen zu Ausgaben bei steuerfreien Einnahmen sind richtig?")),
  A("est-uebungsleiter", "est-einnahmen",
    "Unter welchen Voraussetzungen sind Einnahmen nach § 3 Nr. 26 EStG steuerfrei? Was gilt nach § 3 Nr. 26a EStG?",
    "§ 3 Nr. 26 EStG (Übungsleiterfreibetrag) – steuerfrei bis 3.300 € im Jahr (ab 2026):\n• begünstigte Tätigkeit: Übungsleiter, Ausbilder, Erzieher, Betreuer, künstlerische Tätigkeit, Pflege alter, kranker oder behinderter Menschen (R 3.26 Abs. 1 LStR),\n• nebenberuflich: nicht mehr als ein Drittel einer Vollzeitstelle (14 Stunden pro Woche); eine Haupttätigkeit ist nicht nötig (auch Studierende, Rentner, Hausfrauen/-männer),\n• im Dienst oder Auftrag einer juristischen Person des öffentlichen Rechts (z. B. Universität, Akademie, Kammer) oder einer gemeinnützigen Einrichtung (§ 5 Abs. 1 Nr. 9 KStG),\n• zur Förderung gemeinnütziger, mildtätiger oder kirchlicher Zwecke.\nEinkunftsart: § 18 (selbständig) oder § 19 (nichtselbständig) – „nebenberuflich“ ist keine Einkunftsart.\nAusgaben sind abziehbar, soweit sie die steuerfreien Einnahmen übersteigen (§ 3 Nr. 26 S. 2).\n§ 3 Nr. 26a EStG (Ehrenamtspauschale): andere nebenberufliche Tätigkeiten für solche Träger (z. B. Vereinsvorstand, Kassenwart, Platzwart, Schiedsrichter) bis 960 € im Jahr; § 3 Nr. 26 hat Vorrang.",
    ["EStG 3", "EStG 3c 1"],
    M(["Der Übungsleiterfreibetrag beträgt ab 2026 3.300 € im Jahr.", "Nebenberuflich ist eine Tätigkeit von höchstens einem Drittel einer Vollzeitstelle.", "Eine Haupttätigkeit ist für den Übungsleiterfreibetrag nicht erforderlich.", "Die Ehrenamtspauschale beträgt 960 € im Jahr."],
      ["Der Übungsleiterfreibetrag gilt auch für Tätigkeiten für ein gewerbliches Fitnessstudio.", "„Nebenberufliche Tätigkeit“ ist eine eigene Einkunftsart nach § 2 Abs. 1 EStG.", "Ein Kassenwart im Sportverein erhält den Übungsleiterfreibetrag.", "Der Übungsleiterfreibetrag setzt voraus, dass der Steuerpflichtige einen Hauptberuf ausübt."],
      "Welche Aussagen zum Übungsleiterfreibetrag und zur Ehrenamtspauschale sind richtig?")),
];

// Versorgungsbezüge (§ 19 Abs. 2 EStG): Prozentsatz, Höchstbetrag und Zuschlag nach dem Jahr des Versorgungsbeginns
const VERSORGUNG = { 2018: [19.2, 1440, 432], 2019: [17.6, 1320, 396], 2020: [16.0, 1200, 360], 2021: [15.2, 1140, 342], 2022: [14.4, 1080, 324],
  2023: [14.0, 1050, 315], 2024: [13.6, 1020, 306], 2025: [13.2, 990, 297], 2026: [12.8, 960, 288] };
const pz = (x) => String(x.toFixed(1)).replace(".", ",");
const versorgung = A("est-versorgung", "est-einnahmen",
  "Ein pensionierter Beamter bezieht Ruhegehalt. Wie werden diese Bezüge besteuert, und welche Freibeträge stehen ihm zu?",
  "• Das Ruhegehalt ist Arbeitslohn aus einem früheren Dienstverhältnis → Einkünfte aus nichtselbständiger Arbeit (§ 19 Abs. 1 S. 1 Nr. 2 EStG); es ist ein Versorgungsbezug (§ 19 Abs. 2 S. 2 Nr. 1 a EStG).\n• Steuerfrei bleiben der Versorgungsfreibetrag (Prozentsatz der Bemessungsgrundlage, höchstens ein Höchstbetrag) und ein Zuschlag zum Versorgungsfreibetrag (§ 19 Abs. 2 S. 1 EStG).\n• Prozentsatz, Höchstbetrag und Zuschlag richten sich nach dem Jahr des Versorgungsbeginns (Tabelle in § 19 Abs. 2 S. 3 EStG) – z. B. Beginn 2026: 12,8 %, höchstens 960 €, Zuschlag 288 €.\n• Bemessungsgrundlage: das Zwölffache des Versorgungsbezugs für den ersten vollen Monat (§ 19 Abs. 2 S. 4 b EStG).\n• Die so berechneten Beträge gelten für die gesamte Laufzeit; regelmäßige Anpassungen (Erhöhungen) führen nicht zu einer Neuberechnung (§ 19 Abs. 2 S. 8, 9 EStG).\n• Für jeden vollen Kalendermonat ohne Versorgungsbezüge ermäßigen sich Freibetrag und Zuschlag um je ein Zwölftel (§ 19 Abs. 2 S. 12 EStG) – wichtig im Jahr des Beginns.\n• Werbungskosten-Pauschbetrag für Versorgungsbezüge: 102 € (§ 9a S. 1 Nr. 1 b EStG) statt des Arbeitnehmer-Pauschbetrags.",
  ["EStG 19 2", "EStG 9a"],
  M(["Das Ruhegehalt eines Beamten ist ein Versorgungsbezug im Sinne des § 19 Abs. 2 EStG.", "Prozentsatz und Höchstbetrag des Versorgungsfreibetrags richten sich nach dem Jahr des Versorgungsbeginns.", "Eine regelmäßige Erhöhung der Pension führt nicht zu einer Neuberechnung des Versorgungsfreibetrags.", "Für Versorgungsbezüge beträgt der Werbungskosten-Pauschbetrag 102 €."],
    ["Der Versorgungsfreibetrag wird jedes Jahr nach dem aktuellen Ruhegehalt neu berechnet.", "Für Versorgungsbezüge gilt der Arbeitnehmer-Pauschbetrag von 1.230 €.", "Maßgeblich ist immer der Prozentsatz des laufenden Veranlagungszeitraums.", "Ruhegehalt eines Beamten gehört zu den sonstigen Einkünften nach § 22 EStG."],
    "Welche Aussagen zur Besteuerung von Versorgungsbezügen sind richtig?"));
const versorgungRechnen = R("est-versorgung-rechnen", "est-einnahmen", (r) => {
  if (r.zahl(0, 2) === 0) { // Versorgungsbeginn im Jahr 2026 – Zwölftelung
    const m = r.zahl(2, 10), mon = 13 - m, b = r.zahl(40, 70) * 50, [p, hb, zs] = VERSORGUNG[2026];
    const e = mon * b, vfb = Math.min(12 * b * p / 100, hb) * mon / 12, z = zs * mon / 12, eink = e - vfb - z - 102;
    const MONAT = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    return {
      text: `Beamtin Gerda tritt mit Ablauf des Monats ${MONAT[m - 1]} 2026 in den Ruhestand. Ab ${MONAT[m]} 2026 erhält sie ein Ruhegehalt von ${eur(b)} monatlich. Werbungskosten weist sie nicht nach.

Wie hoch sind ihre Einkünfte aus nichtselbständiger Arbeit aus dem Ruhegehalt 2026 (in €)?`,
      euro: eink,
      erklaerung: `Ruhegehalt = Versorgungsbezug (§ 19 Abs. 2 S. 2 Nr. 1 a EStG); Versorgungsbeginn 2026 → ${pz(p)} %, höchstens ${eur(hb)}, Zuschlag ${eur(zs)} (§ 19 Abs. 2 S. 3 EStG).
• Einnahmen: ${mon} × ${eur(b)} = ${eur(e)}
• Bemessungsgrundlage: 12 × ${eur(b)} = ${eur(12 * b)} (§ 19 Abs. 2 S. 4 b); ${pz(p)} % = ${eur(12 * b * p / 100)} → höchstens ${eur(hb)}
• Für ${12 - mon} volle Monate ohne Bezüge je ein Zwölftel weniger (§ 19 Abs. 2 S. 12): Versorgungsfreibetrag ${eur(hb)} × ${mon}/12 = ${eur(vfb)}, Zuschlag ${eur(zs)} × ${mon}/12 = ${eur(z)}
• Werbungskosten-Pauschbetrag (§ 9a S. 1 Nr. 1 b EStG): 102 €
= ${eur(e)} − ${eur(vfb)} − ${eur(z)} − 102 € = ${eur(eink)}`,
      normen: ["EStG 19 2", "EStG 9a"],
    };
  }
  const jahr = r.zahl(2018, 2025), [p, hb, zs] = VERSORGUNG[jahr], b0 = r.zahl(40, 64) * 50;
  const b1 = Math.round(b0 * (1 + (2026 - jahr) * r.zahl(15, 30) / 1000) / 10) * 10, b2 = Math.round(b1 * (1 + r.zahl(15, 35) / 1000) / 10) * 10;
  const e = 6 * b1 + 6 * b2, eink = e - hb - zs - 102;
  return {
    text: `Pensionär Horst ist seit 01.01.${jahr} im Ruhestand. Sein Ruhegehalt betrug im Januar ${jahr} ${eur(b0)}. Nach mehreren regelmäßigen Anpassungen erhält er von Januar bis Juni 2026 ${eur(b1)} und ab Juli 2026 ${eur(b2)} monatlich. Werbungskosten weist er nicht nach.

Wie hoch sind seine Einkünfte aus nichtselbständiger Arbeit 2026 (in €)?`,
    euro: eink,
    erklaerung: `Ruhegehalt = Versorgungsbezug (§ 19 Abs. 2 S. 2 Nr. 1 a EStG). Maßgeblich ist das Jahr des Versorgungsbeginns ${jahr}: ${pz(p)} %, höchstens ${eur(hb)}, Zuschlag ${eur(zs)} (§ 19 Abs. 2 S. 3 EStG).
• Bemessungsgrundlage: 12 × ${eur(b0)} (erster voller Monat) = ${eur(12 * b0)} (§ 19 Abs. 2 S. 4 b); ${pz(p)} % = ${eur(12 * b0 * p / 100)} → höchstens ${eur(hb)}
• Die Anpassungen führen nicht zu einer Neuberechnung (§ 19 Abs. 2 S. 8, 9 EStG).
• Einnahmen 2026: 6 × ${eur(b1)} + 6 × ${eur(b2)} = ${eur(e)}
− Versorgungsfreibetrag ${eur(hb)} − Zuschlag ${eur(zs)} − Werbungskosten-Pauschbetrag 102 € (§ 9a S. 1 Nr. 1 b EStG)
= ${eur(eink)}`,
    normen: ["EStG 19 2", "EStG 9a"],
  };
});

const ZUFLUSS_OPT = ["Nicht steuerbar", "Steuerbar und steuerpflichtig", "Steuerbar, aber steuerfrei"];
const zuflussFall = F("est-zufluss-fall", "est-einnahmen", "Wie ist der Zufluss einkommensteuerlich einzuordnen?", ZUFLUSS_OPT, [
  { text: "Eine Finanzbeamtin gewinnt 80.000 € im Lotto.", richtig: 0, erkl: "Glücksspielgewinne fallen unter keine Einkunftsart (§ 2 Abs. 1 EStG) → nicht steuerbar.", normen: ["EStG 2 1"] },
  { text: "Die Finanzbeamtin legt ihren Lottogewinn an und erhält 2.400 € Zinsen.", richtig: 1, erkl: "Zinsen sind Einnahmen aus Kapitalvermögen (§ 20 EStG) → steuerbar und steuerpflichtig (i.d.R. mit Kapitalertragsteuer abgegolten).", normen: ["EStG 2 1"] },
  { text: "Ein angestellter Kellner erhält von einem Gast freiwillig 15 € Trinkgeld.", richtig: 2, erkl: "Arbeitslohn von Dritten anlässlich der Arbeitsleistung, freiwillig und ohne Rechtsanspruch → steuerfrei nach § 3 Nr. 51 EStG.", normen: ["EStG 3"] },
  { text: "Eine selbständige Friseurin (Inhaberin des Salons) erhält von einer Kundin 10 € Trinkgeld.", richtig: 1, erkl: "Die Steuerbefreiung des § 3 Nr. 51 EStG gilt nur für Arbeitnehmer. Beim Betriebsinhaber ist das Trinkgeld eine steuerpflichtige Betriebseinnahme (§ 15 EStG).", normen: ["EStG 3"] },
  { text: "Der Arbeitgeber zahlt für seinen Arbeitnehmer den gesetzlichen Arbeitgeberanteil zur Sozialversicherung von 560 € monatlich.", richtig: 2, erkl: "Ausgaben des Arbeitgebers für die gesetzlich vorgeschriebene Zukunftssicherung → steuerfrei nach § 3 Nr. 62 EStG.", normen: ["EStG 3"] },
  { text: "Ein Kellner erhält von seiner Großmutter 500 € zum Geburtstag.", richtig: 0, erkl: "Private Schenkung – kein Zusammenhang mit einer Einkunftsart → nicht steuerbar.", normen: ["EStG 2 1"] },
  { text: "Eine Privatperson erhält monatlich 850 € Miete für eine vermietete Eigentumswohnung.", richtig: 1, erkl: "Einnahmen aus Vermietung und Verpachtung (§ 21 EStG) → steuerbar und steuerpflichtig.", normen: ["EStG 2 1", "EStG 8 1"] },
  { text: "Ein Drogendealer nimmt an einem Tag 1.500 € ein.", richtig: 1, erkl: "Auch gesetzes- oder sittenwidrige Einnahmen sind steuerbar (§ 40 AO) – hier Einkünfte aus Gewerbebetrieb → steuerpflichtig.", normen: ["EStG 2 1"] },
  { text: "Ein beamteter Betriebsprüfer darf den dienstlichen Laptop auch privat nutzen.", richtig: 2, erkl: "Der private Nutzungsvorteil ist zwar Arbeitslohn, aber nach § 3 Nr. 45 EStG steuerfrei (Überlassung betrieblicher Datenverarbeitungsgeräte).", normen: ["EStG 3"] },
  { text: "Eine Bank stellt einem Kundenberater einen dunkelblauen Anzug im Wert von 450 € zur Verfügung, den er auch privat tragen kann.", richtig: 1, erkl: "Bürgerliche Kleidung ist keine typische Berufskleidung → § 3 Nr. 31 EStG greift nicht; der Sachbezug ist steuerpflichtiger Arbeitslohn (§ 8 Abs. 1 EStG).", normen: ["EStG 8 1", "EStG 3"] },
  { text: "Eine Privatperson verkauft einmalig ihr gebrauchtes Sofa über Kleinanzeigen für 200 €.", richtig: 0, erkl: "Veräußerung von Privatvermögen außerhalb der §§ 17, 20, 23 EStG → nicht steuerbar.", normen: ["EStG 2 1"] },
  { text: "Eine Arbeitnehmerin bezieht während der Elternzeit Elterngeld.", richtig: 2, erkl: "Elterngeld ist steuerfrei (§ 3 Nr. 67 EStG), unterliegt aber dem Progressionsvorbehalt (§ 32b EStG).", normen: ["EStG 3"] },
  { text: "Ein Student erhält für 4 Stunden pro Woche als nebenberuflicher Dozent an einer staatlichen Hochschule 2.000 € im Jahr.", richtig: 2, erkl: "Nebenberufliche unterrichtende Tätigkeit im Auftrag einer juristischen Person des öffentlichen Rechts → steuerfrei nach § 3 Nr. 26 EStG (bis 3.300 €).", normen: ["EStG 3"] },
  { text: "Ein Arbeitnehmer erhält von seinem Arbeitgeber 60 € in bar zum Geburtstag.", richtig: 1, erkl: "Geldzuwendungen des Arbeitgebers sind stets Arbeitslohn – auch aus persönlichem Anlass (R 19.6 Abs. 1 S. 3 LStR) → steuerpflichtig.", normen: ["EStG 8 1"] },
  { text: "Zur bestandenen Steuerberaterprüfung schenkt der Arbeitgeber seiner angestellten Steuerberaterin eine Flasche Champagner im Wert von 55 €.", richtig: 0, erkl: "Sachzuwendung aus Anlass eines besonderen persönlichen Ereignisses bis 60 € = Aufmerksamkeit, kein Arbeitslohn (R 19.6 Abs. 1 S. 2 LStR) → nicht steuerbar.", normen: ["EStG 8 1"] },
  { text: "Zum 40. Geburtstag schenkt der Arbeitgeber einem Mitarbeiter eine Armbanduhr im Wert von 85 €. Weitere Sachbezüge erhält er in diesem Monat nicht.", richtig: 1, erkl: "Die 60-€-Grenze für Aufmerksamkeiten (R 19.6 Abs. 1 S. 2 LStR) ist überschritten – dann ist der gesamte Wert Arbeitslohn (§ 8 Abs. 1 EStG); auch die Sachbezugsfreigrenze von 50 € (§ 8 Abs. 2 S. 11 EStG) ist überschritten → steuerpflichtig.", normen: ["EStG 8 1"] },
  { text: "Die Kolleginnen und Kollegen einer Finanzbeamtin sammeln zu ihrer Hochzeit und schenken ihr einen Gutschein über 150 €.", richtig: 0, erkl: "Keine Zuwendung des Arbeitgebers und keine Gegenleistung für die Arbeitsleistung, sondern eine private Schenkung → nicht steuerbar.", normen: ["EStG 2 1"] },
  { text: "Der Arbeitgeber stellt seinen Mitarbeitern in der Teeküche kostenlos Kaffee, Mineralwasser und Obst zur Verfügung.", richtig: 0, erkl: "Getränke und Genussmittel, die der Arbeitgeber zum Verzehr im Betrieb unentgeltlich überlässt, gehören nicht zum Arbeitslohn (R 19.6 Abs. 2 S. 1 LStR) → nicht steuerbar.", normen: ["EStG 8 1"] },
]);

const uebungsleiterRechnen = R("est-uebungsleiter-rechnen", "est-einnahmen", (r) => {
  const e = r.wahl([r.zahl(8, 30) * 100, r.zahl(34, 60) * 100]);
  const a = r.zahl(0, 50) * 100;
  const frei = Math.min(e, UEL), stpfl = e - frei, abz = Math.max(0, a - frei), eink = stpfl - abz;
  return {
    text: `Die Finanzwirtin Femke unterrichtet nebenberuflich (5 Stunden pro Woche) an einer staatlichen Hochschule. Sie erhält 2026 Honorare von ${eur(e)}; damit zusammenhängende Ausgaben: ${eur(a)}.\n\nWie hoch sind ihre Einkünfte aus selbständiger Arbeit aus dieser Tätigkeit (in €; Verlust mit Minus)?`,
    euro: eink,
    erklaerung: `Unterrichtende Tätigkeit → § 18 Abs. 1 Nr. 1 EStG. Nebenberuflich im Auftrag einer juristischen Person des öffentlichen Rechts → § 3 Nr. 26 EStG.\n• Steuerfreie Einnahmen: ${eur(frei)} (höchstens 3.300 €); steuerpflichtig: ${eur(stpfl)}\n• Ausgaben sind abweichend von § 3c nur abziehbar, soweit sie die steuerfreien Einnahmen übersteigen (§ 3 Nr. 26 S. 2 EStG): ${eur(a)} − ${eur(frei)} → ${eur(abz)}\n• Einkünfte: ${eur(stpfl)} − ${eur(abz)} = ${eur(eink)}`,
    normen: ["EStG 3", "EStG 3c 1"],
  };
});

// ======================================================================= Ausgaben, § 12 EStG
const ausgaben = [
  A("est-12", "est-ausgaben",
    "Welche Ausgaben sind nach § 12 EStG nicht abziehbar?",
    "Weder bei den Einkünften noch vom Gesamtbetrag der Einkünfte abziehbar (soweit nicht als Sonderausgaben oder außergewöhnliche Belastungen ausdrücklich zugelassen):\n• Nr. 1: Kosten der Lebensführung – Haushalt, Unterhalt der Familie, auch wenn sie den Beruf fördern; gemischte Aufwendungen ohne objektiven Aufteilungsmaßstab.\n• Nr. 2: freiwillige Zuwendungen (Spenden, Geschenke) und Zuwendungen aufgrund gesetzlicher Unterhaltspflicht.\n• Nr. 3: Steuern vom Einkommen und sonstige Personensteuern – festgesetzte ESt, ESt-Vorauszahlungen, Lohnsteuer, Kapitalertragsteuer, Kirchensteuer, Solidaritätszuschlag, Erbschaft- und Schenkungsteuer – sowie deren Nebenleistungen.\n• Nr. 4: in einem Strafverfahren festgesetzte Geldstrafen und damit zusammenhängende Aufwendungen.",
    ["EStG 12"],
    M(["Einkommensteuer-Vorauszahlungen sind nicht abziehbar.", "Die Lohnsteuer ist keine Werbungskosten.", "Gerichtlich festgesetzte Geldstrafen sind nicht abziehbar.", "Aufwendungen für den Haushalt des Steuerpflichtigen sind Kosten der Lebensführung."],
      ["Einkommensteuer-Vorauszahlungen eines Arztes sind Betriebsausgaben.", "Die Lohnsteuer mindert als Werbungskosten den Arbeitslohn.", "Geldstrafen sind abziehbar, wenn die Tat im Beruf begangen wurde.", "Kosten der Lebensführung sind abziehbar, wenn sie den Beruf fördern."],
      "Welche Aussagen zu den nicht abziehbaren Ausgaben nach § 12 EStG sind richtig?")),
  A("est-gemischt", "est-ausgaben",
    "Wie werden gemischt veranlasste Aufwendungen behandelt? Nennen Sie Beispiele für aufteilbare und nicht aufteilbare Aufwendungen.",
    "• Gemischte Aufwendungen sind teils beruflich/betrieblich und teils privat veranlasst.\n• Gibt es einen objektiven Aufteilungsmaßstab, ist der berufliche Teil als WK/BA abziehbar (BMF vom 06.07.2010); Anteile unter 10 % bleiben außer Betracht (unter 10 % privat → voller Abzug, unter 10 % beruflich → kein Abzug).\n• Ohne objektiven Maßstab sind die Aufwendungen insgesamt nicht abziehbar (§ 12 Nr. 1 S. 2 EStG).\n• Aufteilbar: PKW (nach km), Telefon (nach Minuten), PC (nach Zeitanteilen), Waschmaschine (nach Ladungen), Reise mit beruflichem und privatem Teil (nach Tagen), Feier mit beruflichen und privaten Gästen (nach Köpfen).\n• Nicht aufteilbar: Anzug einer Bankangestellten, Friseurbesuch einer Fernsehmoderatorin, Tageszeitung eines Politiklehrers, Konzertbesuch eines Musiklehrers, Führerschein Klasse B, allgemeiner Sprachkurs, Geburtstagsfeier mit Kollegen.",
    ["EStG 12", "EStG 9 1"],
    M(["Gemischte Aufwendungen sind aufzuteilen, wenn es einen objektiven Aufteilungsmaßstab gibt.", "Eine Reise mit beruflichem und privatem Teil kann nach Tagen aufgeteilt werden.", "Der Anzug einer Bankangestellten ist nicht abziehbar.", "Ein privater Anteil unter 10 % ist unbeachtlich."],
      ["Gemischte Aufwendungen sind immer voll abziehbar.", "Gemischte Aufwendungen sind nach dem Willen des Steuerpflichtigen aufzuteilen.", "Der PKW-Führerschein Klasse B ist als Werbungskosten abziehbar.", "Der Konzertbesuch eines Musiklehrers ist voll abziehbar."],
      "Welche Aussagen zu gemischt veranlassten Aufwendungen sind richtig?")),
];

const AUFWAND_OPT = ["Werbungskosten", "Betriebsausgaben", "Nicht abziehbar (private Lebensführung bzw. § 12 EStG)"];
const aufwandFall = F("est-aufwand-fall", "est-ausgaben", "Wie sind die Aufwendungen einzuordnen?", AUFWAND_OPT, [
  { text: "Ein Finanzbeamter zahlt Gewerkschaftsbeiträge.", richtig: 0, erkl: "Beiträge zu Berufsverbänden → Werbungskosten bei § 19 (§ 9 Abs. 1 S. 3 Nr. 3 EStG); seit 2026 zusätzlich zum Arbeitnehmer-Pauschbetrag (§ 9a S. 3).", normen: ["EStG 9 1", "EStG 9a"] },
  { text: "Eine Arbeitnehmerin bezahlt ihre Urlaubsreise nach Kreta.", richtig: 2, erkl: "Rein privat veranlasst → Kosten der Lebensführung (§ 12 Nr. 1 EStG).", normen: ["EStG 12"] },
  { text: "Ein Bäckermeister zahlt die Grundsteuer für sein Betriebsgrundstück.", richtig: 1, erkl: "Durch den Betrieb veranlasst → Betriebsausgabe (§ 4 Abs. 4 EStG).", normen: ["EStG 4 4"] },
  { text: "Ein selbständiger Arzt kauft sich einen weißen Arztkittel.", richtig: 1, erkl: "Typische Berufskleidung, betrieblich veranlasst → Betriebsausgabe (§ 4 Abs. 4 EStG).", normen: ["EStG 4 4"] },
  { text: "Eine Bankangestellte kauft ein Jackett, das sie nachweislich nur im Dienst trägt.", richtig: 2, erkl: "Bürgerliche Kleidung kann auch privat getragen werden – kein objektiver Aufteilungsmaßstab → nicht abziehbar (§ 12 Nr. 1 S. 2 EStG), auch bei ausschließlich beruflicher Nutzung.", normen: ["EStG 12"] },
  { text: "Ein Spediteur zahlt Kfz-Steuer und Haftpflichtversicherung für seinen LKW.", richtig: 1, erkl: "Betrieblich veranlasst → Betriebsausgaben (§ 4 Abs. 4 EStG).", normen: ["EStG 4 4"] },
  { text: "Ein Vermieter zahlt Schuldzinsen für das Darlehen, mit dem er die vermietete Wohnung gekauft hat.", richtig: 0, erkl: "Schuldzinsen im Zusammenhang mit Einnahmen aus Vermietung → Werbungskosten (§ 9 Abs. 1 S. 3 Nr. 1 EStG). Die Tilgung dagegen betrifft die Vermögensebene und ist nicht abziehbar.", normen: ["EStG 9 1"] },
  { text: "Ein Vermieter tilgt das Darlehen, mit dem er die vermietete Wohnung gekauft hat.", richtig: 2, erkl: "Die Tilgung ist Rückzahlung von Kapital (Vermögensebene) – kein Aufwand → nicht abziehbar. Abziehbar sind nur die Zinsen (§ 9 Abs. 1 S. 3 Nr. 1 EStG).", normen: ["EStG 9 1"] },
  { text: "Ein Finanzanwärter kauft sich jeden Morgen vor dem Unterricht einen Energy-Drink.", richtig: 2, erkl: "Verpflegung ist Kosten der Lebensführung (§ 12 Nr. 1 EStG).", normen: ["EStG 12"] },
  { text: "Ein Steuerberater zahlt seine Einkommensteuer-Vorauszahlungen vom betrieblichen Konto.", richtig: 2, erkl: "Steuern vom Einkommen sind nicht abziehbar (§ 12 Nr. 3 EStG); sie werden auf die ESt angerechnet (§ 36 Abs. 2 Nr. 1 EStG).", normen: ["EStG 12", "EStG 36 2"] },
  { text: "Ein Spanier, der nach Berlin gezogen ist, besucht einen allgemeinen Deutschkurs, um sich im Alltag und im Beruf verständigen zu können.", richtig: 2, erkl: "Allgemeine Sprachkenntnisse dienen auch der privaten Lebensführung – kein objektiver Aufteilungsmaßstab → nicht abziehbar (§ 12 Nr. 1 EStG).", normen: ["EStG 12"] },
  { text: "Ein Beamter im Finanzamt kauft das aktuelle Einkommensteuer-Handbuch für die Arbeit.", richtig: 0, erkl: "Fachliteratur ist Arbeitsmittel → Werbungskosten (§ 9 Abs. 1 S. 3 Nr. 6 EStG).", normen: ["EStG 9 1"] },
  { text: "Ein Arbeitnehmer zahlt eine vom Strafgericht verhängte Geldstrafe wegen einer Trunkenheitsfahrt auf dem Weg zur Arbeit.", richtig: 2, erkl: "In einem Strafverfahren festgesetzte Geldstrafen sind nicht abziehbar (§ 12 Nr. 4 EStG).", normen: ["EStG 12"] },
]);

const gemischtRechnen = R("est-gemischt-reise", "est-ausgaben", (r) => {
  const tage = r.zahl(6, 10), beruf = r.zahl(2, 4), gebuehr = r.zahl(8, 30) * 100;
  const flug = r.zahl(4, 12) * 90, hotel = r.zahl(12, 30) * 10 * tage; // Hotel je Tag 120–300 €
  const ba = gebuehr + (flug + hotel) * beruf / tage;
  return {
    text: `Eine selbständige Zahnärztin besucht einen Fachkongress, der an ${beruf} Tagen ganztägig stattfindet (Teilnahmegebühr ${eur(gebuehr)}). Sie bleibt insgesamt ${tage} Tage am Kongressort und verbringt die übrige Zeit mit Skifahren. Flugkosten (Hin- und Rückflug): ${eur(flug)}, Hotel: ${eur(hotel)}.\n\nWie hoch sind die abziehbaren Betriebsausgaben (in €)?`,
    euro: ba,
    erklaerung: `• Die Kongressgebühr ist ausschließlich betrieblich veranlasst: ${eur(gebuehr)}\n• Flug und Hotel sind gemischt veranlasst und nach Reisetagen (objektiver Maßstab) aufzuteilen: ${beruf}/${tage}\n  (${eur(flug)} + ${eur(hotel)}) × ${beruf}/${tage} = ${eur((flug + hotel) * beruf / tage)}\n• Betriebsausgaben (§ 4 Abs. 4 EStG) gesamt: ${eur(ba)}`,
    normen: ["EStG 4 4", "EStG 12"],
  };
});

// ======================================================================= Zufluss und Abfluss (§ 11 EStG)
const zufluss = [
  A("est-11-grundsatz", "est-zufluss",
    "Was regelt § 11 EStG, und wofür gilt die Vorschrift nicht?",
    "• Einnahmen sind in dem Kalenderjahr bezogen, in dem sie zugeflossen sind (§ 11 Abs. 1 S. 1); Ausgaben sind in dem Kalenderjahr abzusetzen, in dem sie geleistet worden sind (§ 11 Abs. 2 S. 1).\n• Anwendung: Überschusseinkünfte, Einnahmenüberschussrechnung (§ 4 Abs. 3), Sonderausgaben und außergewöhnliche Belastungen.\n• Keine Anwendung: Betriebsvermögensvergleich (§ 4 Abs. 1, § 5) – § 11 Abs. 1 S. 5, Abs. 2 S. 6 EStG.\n• Sonderregel für Arbeitslohn: § 11 Abs. 1 S. 4 i.V.m. § 38a Abs. 1 EStG (laufender Arbeitslohn im Jahr, in dem der Lohnzahlungszeitraum endet).\n• Ausnahmen: regelmäßig wiederkehrende Zahlungen kurz vor/nach dem Jahreswechsel (§ 11 Abs. 1 S. 2, Abs. 2 S. 2) und Vorauszahlungen für Nutzungsüberlassungen über mehr als fünf Jahre (§ 11 Abs. 1 S. 3, Abs. 2 S. 3).",
    ["EStG 11"],
    M(["Einnahmen sind in dem Kalenderjahr bezogen, in dem sie zugeflossen sind.", "§ 11 EStG gilt für die Einnahmenüberschussrechnung.", "§ 11 EStG gilt nicht für den Betriebsvermögensvergleich.", "Für Arbeitslohn gilt eine Sonderregel (§ 38a EStG)."],
      ["Einnahmen sind in dem Jahr zu erfassen, zu dem sie wirtschaftlich gehören.", "§ 11 EStG gilt vor allem für bilanzierende Kaufleute.", "Ausgaben sind im Jahr der Rechnungsstellung abzusetzen.", "§ 11 EStG gilt nicht für Sonderausgaben."],
      "Welche Aussagen zu § 11 EStG sind richtig?")),
  A("est-11-zahlungswege", "est-zufluss",
    "Wann fließen Zahlungen bei Scheck, Überweisung, Kartenzahlung und Zahlung an einen Bevollmächtigten zu bzw. ab?",
    "(H 11 EStH)\n• Barzahlung: Abfluss mit Hingabe, Zufluss mit Entgegennahme.\n• Scheck: Abfluss mit Hingabe bzw. Aufgabe zur Post, Zufluss mit Erhalt – der Zeitpunkt der Einlösung ist grundsätzlich unbeachtlich.\n• Überweisung: Abfluss mit Erteilung des Überweisungsauftrags (auch online/Freigabe in der App), wenn das Konto gedeckt ist; Zufluss mit Gutschrift beim Empfänger.\n• EC-/Kreditkarte: Abfluss mit Freigabe des Zahlungsvorgangs (PIN, Unterschrift, kontaktlos); Zufluss mit Gutschrift.\n• Lastschrift: Abfluss mit Fälligkeit, wenn eine Einzugsermächtigung (SEPA-Mandat) vorliegt und das Konto gedeckt ist.\n• Zahlung an einen Bevollmächtigten: Zufluss beim Steuerpflichtigen mit Eingang beim Bevollmächtigten (R 11 S. 1 EStR) – z. B. privatärztliche Verrechnungsstelle (R 11 S. 2 EStR).\n• Aufrechnung und Novation: Zu- und Abfluss im Zeitpunkt der wirksamen Aufrechnung bzw. Umwandlung.",
    ["EStG 11"],
    M(["Bei einer Überweisung fließt der Betrag mit Erteilung des Überweisungsauftrags ab.", "Bei Scheckzahlung fließt der Betrag beim Empfänger mit Erhalt des Schecks zu.", "Honorare, die eine privatärztliche Verrechnungsstelle einzieht, fließen dem Arzt bereits mit Eingang bei der Verrechnungsstelle zu.", "Bei Kartenzahlung fließt der Betrag mit Freigabe des Zahlungsvorgangs ab."],
      ["Bei einer Überweisung fließt der Betrag erst mit der Belastung des Kontos ab.", "Bei Scheckzahlung ist der Tag der Einlösung maßgeblich.", "Honorare über eine Verrechnungsstelle fließen erst mit Gutschrift auf dem Konto des Arztes zu.", "Bei Kartenzahlung ist die monatliche Kreditkartenabrechnung maßgeblich."],
      "Welche Aussagen zum Zeitpunkt von Zu- und Abfluss sind richtig?")),
  A("est-11-wiederkehrend", "est-zufluss",
    "Was gilt für regelmäßig wiederkehrende Einnahmen und Ausgaben um den Jahreswechsel?",
    "§ 11 Abs. 1 S. 2, Abs. 2 S. 2 EStG:\n• Regelmäßig wiederkehrend: Zahlungen in gleichen zeitlichen Abständen aufgrund eines Dauerschuldverhältnisses (Miete, Darlehenszinsen, Versicherungsbeiträge), oft in gleicher Höhe.\n• Werden sie kurze Zeit vor Beginn oder nach Ende des Kalenderjahres gezahlt, zu dem sie wirtschaftlich gehören, gelten sie in diesem Jahr als bezogen bzw. geleistet.\n• Kurze Zeit = 10 Tage vor und nach dem Jahreswechsel (22.12. – 10.01., H 11 EStH).\n• Sowohl die Zahlung als auch die Fälligkeit müssen in diesem Zeitraum liegen; die Fälligkeit muss nicht im Jahr der wirtschaftlichen Zugehörigkeit liegen.\n• Nicht anwendbar auf Arbeitslohn (§ 11 Abs. 1 S. 4 EStG).",
    ["EStG 11"],
    M(["Kurze Zeit bedeutet 10 Tage vor und nach dem Jahreswechsel.", "Sowohl Zahlung als auch Fälligkeit müssen innerhalb der kurzen Zeit liegen.", "Mieten sind typische regelmäßig wiederkehrende Ausgaben.", "Eine Januarmiete, die am 28.12. gezahlt und am 03.01. fällig ist, gilt im neuen Jahr als geleistet."],
      ["Kurze Zeit bedeutet einen Monat vor und nach dem Jahreswechsel.", "Liegt nur die Zahlung innerhalb der kurzen Zeit, genügt das bereits.", "Die Regel gilt auch für einmalige Warenrechnungen.", "Die Regel gilt vor allem für den Arbeitslohn."],
      "Welche Aussagen zu regelmäßig wiederkehrenden Zahlungen nach § 11 EStG sind richtig?")),
  A("est-11-vorauszahlung", "est-zufluss",
    "Wie werden Vorauszahlungen für eine Nutzungsüberlassung (z. B. Miete für mehrere Jahre im Voraus) behandelt?",
    "• Grundsatz: Erfassung in voller Höhe im Zeitpunkt des tatsächlichen Zu- bzw. Abflusses; eine zeitliche Abgrenzung wie in der Bilanz gibt es nicht.\n• Ausnahme bei Vorauszahlungen für einen Zeitraum von mehr als fünf Jahren:\n  – Ausgaben sind zwingend gleichmäßig auf den Zeitraum der Nutzungsüberlassung zu verteilen (§ 11 Abs. 2 S. 3 EStG: „sind“).\n  – Einnahmen können verteilt werden (Wahlrecht, § 11 Abs. 1 S. 3 EStG: „können“).\nBeispiel: Zahlung von 72.000 € am 01.10.01 für sechs Jahre → BA 01: 72.000 € / 72 Monate × 3 Monate = 3.000 €.",
    ["EStG 11"],
    M(["Bei Vorauszahlungen für mehr als fünf Jahre sind die Ausgaben gleichmäßig zu verteilen.", "Bei Vorauszahlungen für mehr als fünf Jahre kann der Empfänger die Einnahmen verteilen.", "Eine Mietvorauszahlung für zwei Jahre ist im Jahr der Zahlung voll abziehbar."],
      ["Jede Mietvorauszahlung ist auf die Mietdauer zu verteilen.", "Bei mehr als fünf Jahren muss der Empfänger die Einnahmen verteilen.", "Vorauszahlungen sind erst bei Ablauf der Mietzeit abziehbar.", "Ausgaben für mehr als fünf Jahre darf der Zahlende wahlweise sofort abziehen."],
      "Welche Aussagen zu Vorauszahlungen für Nutzungsüberlassungen sind richtig?")),
];

const JAHR_OPT = ["Kalenderjahr 01", "Kalenderjahr 02"];
// Zufluss von Arbeitslohn: laufender Arbeitslohn und sonstige Bezüge (§ 11 Abs. 1 S. 4 i. V. m. § 38a Abs. 1 EStG)
const lohnZufluss = A("est-sonstige-bezuege", "est-zufluss",
  "In welchem Kalenderjahr ist Arbeitslohn bezogen? Unterscheiden Sie laufenden Arbeitslohn und sonstige Bezüge.",
  "• Für Arbeitslohn gilt § 11 Abs. 1 S. 4 EStG: Maßgeblich ist § 38a Abs. 1 S. 2 und 3 EStG – nicht die 10-Tage-Regel.\n• Laufender Arbeitslohn (regelmäßig gezahlt: Monatsgehalt, Stundenlohn, laufende Pension) gilt in dem Kalenderjahr als bezogen, in dem der Lohnzahlungszeitraum endet (§ 38a Abs. 1 S. 2 EStG). Das Dezembergehalt gehört auch bei Zahlung im Januar ins alte Jahr; ein im Dezember vorab gezahltes Januargehalt ins neue Jahr.\n• Sonstige Bezüge (nicht laufend gezahlt: Weihnachtsgeld, Urlaubsgeld, Jubiläumszuwendung, Tantieme, Abfindung) sind in dem Kalenderjahr bezogen, in dem sie dem Arbeitnehmer zufließen (§ 38a Abs. 1 S. 3 EStG) – reines Zuflussprinzip, z. B. mit der Gutschrift auf dem Konto.\n• Beispiel: Jubiläumszuwendung für Dezember 01, gutgeschrieben am 08.01.02 → Arbeitslohn 02.",
  ["EStG 11 1", "EStG 38a 1"],
  M(["Laufender Arbeitslohn gilt im Kalenderjahr als bezogen, in dem der Lohnzahlungszeitraum endet.", "Sonstige Bezüge sind im Kalenderjahr des Zuflusses bezogen.", "Ein Weihnachtsgeld, das erst im Januar ausgezahlt wird, ist Arbeitslohn des neuen Jahres.", "Für Arbeitslohn verweist § 11 Abs. 1 S. 4 EStG auf § 38a Abs. 1 EStG."],
    ["Das im Januar gezahlte Dezembergehalt ist Arbeitslohn des neuen Jahres.", "Für sonstige Bezüge gilt die 10-Tage-Regel des § 11 Abs. 1 S. 2 EStG.", "Sonstige Bezüge gehören immer in das Jahr, für das sie wirtschaftlich gezahlt werden.", "Eine Jubiläumszuwendung ist laufender Arbeitslohn."],
    "Welche Aussagen zum Zufluss von Arbeitslohn sind richtig?"));
const lohnZuflussFall = F("est-lohn-zufluss-fall", "est-zufluss", "In welchem Kalenderjahr ist der Arbeitslohn bezogen?", JAHR_OPT, [
  { text: "Das Gehalt einer Arbeitnehmerin für Dezember 01 wird am 03.01.02 überwiesen.", richtig: 0, erkl: "Laufender Arbeitslohn: Der Lohnzahlungszeitraum (Dezember) endet in 01 → bezogen in 01 (§ 11 Abs. 1 S. 4 i. V. m. § 38a Abs. 1 S. 2 EStG).", normen: ["EStG 38a 1"] },
  { text: "Zum 20-jährigen Dienstjubiläum im Dezember 01 erhält ein Arbeitnehmer eine Jubiläumszuwendung von 5.000 €; sie wird am 08.01.02 gutgeschrieben.", richtig: 1, erkl: "Sonstiger Bezug: bezogen im Jahr des Zuflusses, also mit der Gutschrift am 08.01.02 → 02 (§ 38a Abs. 1 S. 3 EStG).", normen: ["EStG 38a 1"] },
  { text: "Das Weihnachtsgeld für 01 wird wegen eines Abrechnungsfehlers erst am 15.01.02 ausgezahlt.", richtig: 1, erkl: "Weihnachtsgeld ist ein sonstiger Bezug → Zufluss am 15.01.02 → 02 (§ 38a Abs. 1 S. 3 EStG).", normen: ["EStG 38a 1"] },
  { text: "Der Arbeitgeber überweist das Januargehalt 02 bereits am 28.12.01.", richtig: 1, erkl: "Laufender Arbeitslohn: maßgeblich ist das Ende des Lohnzahlungszeitraums (Januar 02), nicht die Zahlung → 02 (§ 38a Abs. 1 S. 2 EStG).", normen: ["EStG 38a 1"] },
  { text: "Eine Tantieme für das Geschäftsjahr 01 wird nach Feststellung des Jahresabschlusses am 20.03.02 ausgezahlt.", richtig: 1, erkl: "Tantieme = sonstiger Bezug → Zufluss in 02 (§ 38a Abs. 1 S. 3 EStG).", normen: ["EStG 38a 1"] },
  { text: "Das Urlaubsgeld für den Sommerurlaub 02 zahlt der Arbeitgeber schon am 30.12.01 aus.", richtig: 0, erkl: "Urlaubsgeld = sonstiger Bezug → maßgeblich ist der Zufluss am 30.12.01 → 01 (§ 38a Abs. 1 S. 3 EStG).", normen: ["EStG 38a 1"] },
  { text: "Das Ruhegehalt eines Pensionärs für Dezember 01 wird am 02.01.02 überwiesen.", richtig: 0, erkl: "Laufende Versorgungsbezüge sind laufender Arbeitslohn → Lohnzahlungszeitraum Dezember 01 → 01 (§ 38a Abs. 1 S. 2 EStG).", normen: ["EStG 38a 1"] },
]);

const elfFall = F("est-11-fall", "est-zufluss", "In welchem Kalenderjahr ist die Zahlung beim Steuerpflichtigen (Überschussrechner bzw. § 4 Abs. 3 EStG) zu berücksichtigen?", JAHR_OPT, [
  { text: "Die Vermieterin V bezahlt eine Handwerkerrechnung für ihre vermietete Wohnung am 27.12.01 mit einem Scheck, den der Handwerker erst am 06.01.02 einlöst.", richtig: 0,
    erkl: "Bei Scheckzahlung erfolgt der Abfluss mit Hingabe des Schecks (H 11 „Scheck“ EStH) → Werbungskosten 01 (§ 11 Abs. 2 S. 1 EStG).", normen: ["EStG 11 2"] },
  { text: "Ein Arbeitnehmer gibt am 30.12.01 in seiner Banking-App eine Überweisung für Fachliteratur frei; sein Konto ist gedeckt. Die Bank belastet das Konto am 03.01.02.", richtig: 0,
    erkl: "Abfluss mit Erteilung des Überweisungsauftrags bei gedecktem Konto (H 11 „Überweisung“ EStH) → 01.", normen: ["EStG 11 2"] },
  { text: "Ein selbständiger Physiotherapeut zahlt die Praxismiete für Januar 02 (fällig 03.01.02) bereits am 28.12.01.", richtig: 1,
    erkl: "Regelmäßig wiederkehrende Ausgabe; Zahlung (28.12.) und Fälligkeit (03.01.) liegen innerhalb von 10 Tagen um den Jahreswechsel → Abzug im Jahr der wirtschaftlichen Zugehörigkeit 02 (§ 11 Abs. 2 S. 2 EStG).", normen: ["EStG 11 2"] },
  { text: "Eine Vermieterin erhält die Dezembermiete 01 (fällig 25.12.01) erst am 06.01.02 auf ihr Konto.", richtig: 0,
    erkl: "Regelmäßig wiederkehrende Einnahme; Fälligkeit (25.12.) und Zahlung (06.01.) innerhalb der kurzen Zeit → gilt im Jahr der wirtschaftlichen Zugehörigkeit 01 als bezogen (§ 11 Abs. 1 S. 2 EStG).", normen: ["EStG 11 1"] },
  { text: "Ein Rechtsanwalt (Gewinnermittlung nach § 4 Abs. 3 EStG) bezahlt eine am 20.12.01 fällige Rechnung für Büromaterial erst am 04.01.02.", richtig: 1,
    erkl: "Keine regelmäßig wiederkehrende Ausgabe (einmalige Warenrechnung) → Abflussprinzip: BA im Jahr der Zahlung 02 (§ 11 Abs. 2 S. 1 EStG).", normen: ["EStG 11 2"] },
  { text: "Ein Handelsvertreter (§ 4 Abs. 3 EStG) zahlt die Kfz-Versicherung für das Jahr 02 (fällig 01.01.02) bereits am 10.12.01.", richtig: 0,
    erkl: "Die Zahlung am 10.12. liegt außerhalb der kurzen Zeit (22.12. – 10.01.) → § 11 Abs. 2 S. 2 greift nicht; Abfluss in 01.", normen: ["EStG 11 2"] },
  { text: "Eine selbständige Ärztin lässt ihre Privathonorare von einer Verrechnungsstelle einziehen. Diese vereinnahmt im Dezember 01 12.000 € und überweist sie am 08.01.02 an die Ärztin.", richtig: 0,
    erkl: "Zahlungen an einen Bevollmächtigten fließen dem Steuerpflichtigen bereits mit Eingang beim Bevollmächtigten zu (R 11 S. 1, 2 EStR) → Betriebseinnahmen 01.", normen: ["EStG 11 1"] },
  { text: "Ein Arbeitnehmer zahlt sein Monatsticket für Dezember 01 (fällig 01.12.01) wegen eines Fehlers der App erst am 04.01.02.", richtig: 1,
    erkl: "Zwar liegt die Zahlung in der kurzen Zeit, die Fälligkeit (01.12.) aber nicht → § 11 Abs. 2 S. 2 greift nicht; Abfluss in 02 (§ 11 Abs. 2 S. 1 EStG).", normen: ["EStG 11 2"] },
  { text: "Ein Kassenarzt erhält die Abschlagszahlung der Kassenärztlichen Vereinigung für Dezember 01 (fällig 10.01.02) am 10.01.02.", richtig: 0,
    erkl: "Die Abschlagszahlungen der KV sind regelmäßig wiederkehrende Einnahmen (H 11 „Arzthonorar“ EStH); Fälligkeit und Zahlung innerhalb der kurzen Zeit → Zufluss im Jahr der wirtschaftlichen Zugehörigkeit 01 (§ 11 Abs. 1 S. 2 EStG).", normen: ["EStG 11 1"] },
  { text: "Eine Arbeitnehmerin bezahlt am 31.12.01 im Fachhandel einen Bürostuhl mit ihrer EC-Karte (PIN-Eingabe). Der Händler erhält die Gutschrift am 02.01.02.", richtig: 0,
    erkl: "Abfluss mit Freigabe des Zahlungsvorgangs durch PIN-Eingabe (H 11 EStH) → 01. (Ob der Stuhl sofort abziehbar ist, richtet sich nach § 9 Abs. 1 S. 3 Nr. 7 EStG.)", normen: ["EStG 11 2"] },
]);

const vorauszahlungRechnen = R("est-11-vorauszahlung-rechnen", "est-zufluss", (r) => {
  const monat = r.zahl(1, 12), jahre = r.wahl([2, 3, 4, 6, 7, 8, 10]), miete = r.zahl(8, 40) * 100;
  const gesamt = miete * 12 * jahre, mon01 = 13 - monat;
  const ba = jahre > 5 ? gesamt / (jahre * 12) * mon01 : gesamt;
  const mn = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"][monat - 1];
  return {
    text: `Ein selbständiger Steuerberater (Gewinnermittlung nach § 4 Abs. 3 EStG) zahlt am 1. ${mn} 01 die Miete für einen Lagerraum für ${jahre} Jahre ab diesem Tag im Voraus: ${eur(gesamt)} (${eur(miete)} monatlich).\n\nWie hoch sind die Betriebsausgaben im Jahr 01 (in €)?`,
    euro: ba,
    erklaerung: jahre > 5
      ? `Vorauszahlung für eine Nutzungsüberlassung von mehr als fünf Jahren → zwingend gleichmäßig zu verteilen (§ 11 Abs. 2 S. 3 EStG).\n${eur(gesamt)} / ${jahre * 12} Monate × ${mon01} Monate (${mn} – Dezember) = ${eur(ba)}`
      : `Die Vorauszahlung betrifft nicht mehr als fünf Jahre → Abzug in voller Höhe im Jahr des Abflusses (§ 11 Abs. 2 S. 1 EStG): ${eur(ba)}`,
    normen: ["EStG 11 2", "EStG 4 4"],
  };
});

// ======================================================================= Werbungskosten (Begriff, Pauschbetrag)
const wk = [
  A("est-wk-begriff", "est-werbungskosten",
    "Was sind Werbungskosten? Unterscheiden Sie laufende, vorweggenommene, vergebliche und nachträgliche Werbungskosten.",
    "• Definition (§ 9 Abs. 1 S. 1 EStG): Aufwendungen zur Erwerbung, Sicherung und Erhaltung der Einnahmen.\n• Aufwendungen = tatsächliche Abflüsse in Geld oder Geldeswert – nicht die eigene Arbeitskraft, nicht entgehende Einnahmen.\n• Veranlassungsprinzip: objektiver Zusammenhang mit der beruflichen Tätigkeit und subjektiv zur Förderung des Berufs; Notwendigkeit, Üblichkeit und Zweckmäßigkeit sind nicht entscheidend.\n• Abzug bei der Einkunftsart, bei der sie erwachsen (§ 9 Abs. 1 S. 2 EStG).\n• Laufende WK: für eine ausgeübte Tätigkeit; vorweggenommene: für eine künftige Tätigkeit; vergebliche: für eine ernsthaft beabsichtigte, aber nicht aufgenommene Tätigkeit; nachträgliche: für eine beendete Tätigkeit.\n• § 9 Abs. 1 S. 3 Nr. 1–7 EStG zählt einzelne WK beispielhaft auf („auch“): Schuldzinsen, Steuern auf Gebäude, Beiträge zu Berufsverbänden, Wege zur ersten Tätigkeitsstätte, Reisekosten, Arbeitsmittel, AfA.",
    ["EStG 9 1"],
    M(["Werbungskosten sind Aufwendungen zur Erwerbung, Sicherung und Erhaltung der Einnahmen.", "Vorweggenommene Werbungskosten für eine künftige Tätigkeit sind abziehbar.", "Die Notwendigkeit einer Aufwendung ist für den Werbungskostenabzug nicht entscheidend.", "Die Aufzählung in § 9 Abs. 1 S. 3 EStG ist nur beispielhaft."],
      ["Der Wert der eigenen Arbeitszeit kann als Werbungskosten abgezogen werden.", "Werbungskosten müssen für die Tätigkeit notwendig und üblich sein.", "Nach Ende der Tätigkeit können keine Werbungskosten mehr entstehen.", "Die Aufzählung in § 9 Abs. 1 S. 3 EStG ist abschließend."],
      "Welche Aussagen zum Begriff der Werbungskosten sind richtig?")),
  A("est-pauschbetrag", "est-werbungskosten",
    "Welche Pauschbeträge für Werbungskosten gibt es, und was ist bei ihrer Anwendung zu beachten?",
    "§ 9a EStG – abzuziehen, wenn nicht höhere Werbungskosten nachgewiesen werden:\n• Arbeitnehmer-Pauschbetrag: 1.230 € bei Einnahmen aus einem aktiven Dienstverhältnis (§ 9a S. 1 Nr. 1 a).\n• 102 € bei Versorgungsbezügen (§ 9a S. 1 Nr. 1 b) und bei bestimmten sonstigen Einkünften (Nr. 3).\nZu beachten:\n• Jahresbetrag – keine zeitanteilige Kürzung bei unterjähriger Beschäftigung.\n• Abzug höchstens bis zur Höhe der Einnahmen (§ 9a S. 2): Der Pauschbetrag kann nie zu negativen Einkünften führen – anders als tatsächliche Werbungskosten.\n• Seit 2026: Gewerkschaftsbeiträge werden zusätzlich zum Pauschbetrag berücksichtigt (§ 9a S. 3 EStG).",
    ["EStG 9a"],
    M(["Der Arbeitnehmer-Pauschbetrag beträgt 1.230 €.", "Der Arbeitnehmer-Pauschbetrag ist ein Jahresbetrag und wird nicht zeitanteilig gekürzt.", "Der Pauschbetrag darf nicht zu negativen Einkünften führen.", "Gewerkschaftsbeiträge sind seit 2026 zusätzlich zum Pauschbetrag abziehbar."],
      ["Der Arbeitnehmer-Pauschbetrag beträgt 1.000 €.", "Bei einer Beschäftigung ab Juli wird der Pauschbetrag halbiert.", "Der Pauschbetrag wird zusätzlich zu den nachgewiesenen Werbungskosten abgezogen.", "Bei Versorgungsbezügen gilt ebenfalls ein Pauschbetrag von 1.230 €."],
      "Welche Aussagen zu den Werbungskosten-Pauschbeträgen sind richtig?")),
];

// ======================================================================= Arbeitsmittel
const arbeitsmittel = [
  A("est-arbeitsmittel", "est-arbeitsmittel",
    "Was sind Arbeitsmittel? Wann ist Kleidung ein Arbeitsmittel, und was gilt bei gemischter Nutzung?",
    "§ 9 Abs. 1 S. 3 Nr. 6 EStG: Gegenstände, die der Ausübung der beruflichen Tätigkeit dienen – z. B. Werkzeuge, Computer, Fachliteratur, Büromöbel.\n• Typische Berufskleidung: Schutzkleidung, uniformartige Kleidung, für den Beruf typische Kleidung (Erkennbarkeit des Berufs) oder dauerhaft mit Firmenemblem gekennzeichnete Kleidung, bei der eine private Nutzung so gut wie ausgeschlossen ist. Bürgerliche Kleidung (Anzug, Kostüm) ist kein Arbeitsmittel.\n• Gemischte Nutzung: Aufteilung nach objektivem Maßstab (PC nach Zeitanteilen, Telefon nach Gesprächsminuten); private Nutzung unter 10 % → voller Abzug, berufliche Nutzung unter 10 % → kein Abzug.\n• Zeitpunkt: grundsätzlich bei Abfluss (§ 11 Abs. 2 EStG); bei Nutzungsdauer über einem Jahr AfA bzw. GWG-Regel (§ 9 Abs. 1 S. 3 Nr. 6 S. 2, Nr. 7 EStG).",
    ["EStG 9 1", "EStG 12"],
    M(["Fachliteratur ist ein Arbeitsmittel.", "Schutzkleidung ist typische Berufskleidung.", "Bei einem privaten Nutzungsanteil unter 10 % ist ein voller Werbungskostenabzug möglich.", "Arbeitsmittel mit einer Nutzungsdauer von mehr als einem Jahr sind grundsätzlich über die AfA abzuziehen."],
      ["Ein Anzug ist ein Arbeitsmittel, wenn er nur im Büro getragen wird.", "Bei gemischter Nutzung ist ein Arbeitsmittel immer voll abziehbar.", "Arbeitsmittel sind immer im Jahr der Bestellung voll abziehbar.", "Bei einem beruflichen Nutzungsanteil von 5 % ist der berufliche Anteil abziehbar."],
      "Welche Aussagen zu Arbeitsmitteln sind richtig?")),
  A("est-afa-gwg", "est-arbeitsmittel",
    "Wie werden Arbeitsmittel mit einer Nutzungsdauer von mehr als einem Jahr abgezogen? Erläutern Sie AfA und GWG-Regelung.",
    "Türöffner: § 9 Abs. 1 S. 3 Nr. 7 EStG (für die EÜR: § 4 Abs. 3 S. 3; für die Bilanz: § 6 Abs. 1 Nr. 1 S. 1).\nAfA (§ 7 Abs. 1 EStG):\n• Anschaffungskosten (§ 255 Abs. 1 HGB) gleichmäßig auf die gewöhnliche Nutzungsdauer verteilen (AfA-Tabellen: Computer 3, PKW 6, Büromöbel 13 Jahre).\n• Bei Arbeitnehmern gehört die Umsatzsteuer zu den Anschaffungskosten (kein Vorsteuerabzug, § 9b Abs. 1 EStG im Umkehrschluss).\n• Beginn mit Anschaffung = Lieferung (§ 9a EStDV), nicht mit Bezahlung; im ersten Jahr zeitanteilig nach Monaten (§ 7 Abs. 1 S. 4), der Anschaffungsmonat zählt voll.\nGWG (§ 6 Abs. 2 EStG): abnutzbares, bewegliches, selbständig nutzbares Wirtschaftsgut mit Anschaffungskosten ohne USt bis 800 € → Wahlrecht, die Anschaffungskosten im Jahr der Lieferung voll abzuziehen.\nComputerhardware und Software: Nach BMF vom 22.02.2022 kann eine Nutzungsdauer von einem Jahr zugrunde gelegt werden → Abzug im Jahr der Anschaffung in voller Höhe (Wahlrecht).\nVerkauf eines Arbeitsmittels: nicht steuerbar; ein Restwert ist nicht abziehbar.",
    ["EStG 9 1", "EStG 7 1", "EStG 6 2"],
    M(["Die AfA beginnt mit der Lieferung, nicht mit der Bezahlung.", "Im Anschaffungsjahr wird die AfA zeitanteilig nach Monaten berechnet; der Anschaffungsmonat zählt voll.", "Bei Arbeitnehmern gehört die Umsatzsteuer zu den Anschaffungskosten.", "Ein Arbeitsmittel mit Anschaffungskosten ohne USt bis 800 € kann sofort abgezogen werden."],
      ["Die AfA beginnt mit der Bezahlung des Kaufpreises.", "Im Anschaffungsjahr wird immer die volle Jahres-AfA angesetzt.", "Bei Arbeitnehmern wird die Umsatzsteuer als Vorsteuer abgezogen.", "Die GWG-Grenze von 800 € bezieht sich auf den Bruttopreis einschließlich USt."],
      "Welche Aussagen zu AfA und GWG bei Arbeitsmitteln sind richtig?")),
];

// ======================================================================= Häusliches Arbeitszimmer, Home-Office-Pauschale
const homeoffice = [
  A("est-homeoffice", "est-homeoffice",
    "Wann sind Aufwendungen für ein häusliches Arbeitszimmer abziehbar? Was gilt für die Home-Office-Pauschale?",
    "Häusliches Arbeitszimmer (§ 4 Abs. 5 S. 1 Nr. 6b, § 9 Abs. 5 EStG):\n• Grundsätzlich nicht abziehbar.\n• Ausnahme: Das Arbeitszimmer bildet den Mittelpunkt der gesamten betrieblichen und beruflichen Tätigkeit (qualitativer Schwerpunkt; z. B. Autor, Heimarbeiter – nicht: Lehrer, Richter).\n• Begriff: abgeschlossener, in die häusliche Sphäre eingebundener, büromäßig eingerichteter Raum, nahezu ausschließlich beruflich genutzt (privat < 10 %); keine Arbeitsecke, kein Durchgangszimmer.\n• Wahlrecht: tatsächliche Kosten (anteilige Miete, AfA, Nebenkosten, Einrichtung) oder Jahrespauschale 1.260 €, zeitanteilig nach Monaten.\nHome-Office-Pauschale (§ 4 Abs. 5 S. 1 Nr. 6c EStG): in allen anderen Fällen 6 € je Kalendertag, höchstens 1.260 € im Jahr (210 Tage):\n• mit anderem Arbeitsplatz: nur für Tage, an denen überwiegend zu Hause gearbeitet und die erste Tätigkeitsstätte nicht aufgesucht wird (dann keine Entfernungspauschale für diesen Tag),\n• ohne anderen Arbeitsplatz (z. B. Lehrer): auch an Tagen, an denen die erste Tätigkeitsstätte aufgesucht wird.\nArbeitsmittel (z. B. Schreibtisch, PC) fallen nicht unter die Abzugsbeschränkung.",
    ["EStG 4 5", "EStG 9 1"],
    M(["Die Home-Office-Pauschale beträgt 6 € je Tag, höchstens 1.260 € im Jahr.", "Aufwendungen für ein häusliches Arbeitszimmer sind nur abziehbar, wenn es den Mittelpunkt der gesamten Tätigkeit bildet.", "Anstelle der tatsächlichen Kosten für ein Arbeitszimmer kann eine Jahrespauschale von 1.260 € angesetzt werden.", "Hat ein Arbeitnehmer einen Arbeitsplatz im Büro, gibt es die Tagespauschale nur für Tage ohne Besuch der ersten Tätigkeitsstätte."],
      ["Die Home-Office-Pauschale beträgt 5 € je Tag ohne Höchstbetrag.", "Für eine Arbeitsecke im Wohnzimmer sind die anteiligen Mietkosten als Arbeitszimmer abziehbar.", "Für einen Lehrer bildet das häusliche Arbeitszimmer den Mittelpunkt seiner Tätigkeit.", "Für denselben Tag können bei vorhandenem Büroarbeitsplatz Entfernungspauschale und Tagespauschale angesetzt werden."],
      "Welche Aussagen zu Arbeitszimmer und Home-Office-Pauschale sind richtig?")),
];

const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const GEGENSTAENDE = [
  { name: "einen Schreibtisch", nd: 13 }, { name: "einen ergonomischen Bürostuhl", nd: 13 }, { name: "ein Bücherregal für Fachliteratur", nd: 13 },
  { name: "einen Aktenschrank", nd: 13 }, { name: "eine hochwertige Aktentasche", nd: 5 }, { name: "ein Diktiergerät", nd: 5 },
];
const afaRechnen = R("est-afa-rechnen", "est-arbeitsmittel", (r) => {
  const g = r.wahl(GEGENSTAENDE), monat = r.zahl(1, 12);
  const brutto = r.muenze() ? r.zahl(20, 60) * 50 - 0.1 : r.zahl(4, 18) * 50 - 0.1; // z. B. 1.249,90 €
  const netto = brutto / 1.19, gwg = netto <= 800;
  const afa = gwg ? brutto : (brutto / g.nd) * (13 - monat) / 12;
  return {
    text: `Die angestellte Sachbearbeiterin Ina kauft am ${r.zahl(2, 26)}. ${MONATE[monat - 1]} 2026 ${g.name} (ausschließlich beruflich genutzt) für ${G.euro(Math.round(brutto * 100))} einschließlich 19 % USt; Lieferung am selben Tag. Gewöhnliche Nutzungsdauer: ${g.nd} Jahre. Sie wünscht den höchstmöglichen Abzug.\n\nWie hoch sind die Werbungskosten 2026 (in €)?`,
    euro: afa,
    erklaerung: `Arbeitsmittel (§ 9 Abs. 1 S. 3 Nr. 6 EStG), Nutzungsdauer über ein Jahr → § 9 Abs. 1 S. 3 Nr. 7 EStG (AfA bzw. GWG).\nAnschaffungskosten ohne USt: ${G.euro(Math.round(brutto * 100))} / 1,19 = ${G.euro(Math.round(netto * 100))} → ${gwg ? "nicht mehr als 800 € → GWG (§ 6 Abs. 2 EStG): Sofortabzug der Anschaffungskosten einschließlich USt (kein Vorsteuerabzug bei Arbeitnehmern)" : "über 800 € → kein GWG; lineare AfA (§ 7 Abs. 1 EStG) auf die Anschaffungskosten einschließlich USt"}.\n${gwg ? `Werbungskosten 2026: ${G.euro(Math.round(brutto * 100))}` : `${G.euro(Math.round(brutto * 100))} / ${g.nd} Jahre × ${13 - monat}/12 (Lieferung im ${MONATE[monat - 1]}, § 9a EStDV, § 7 Abs. 1 S. 4 EStG) = ${G.euro(Math.round(afa * 100))}`}`,
    normen: ["EStG 9 1", "EStG 6 2", "EStG 7 1"],
  };
});

const KEIN = "Nein – nicht abziehbar";
const arbeitsmittelFall = F("est-arbeitsmittel-fall", "est-arbeitsmittel",
  "Sind die Aufwendungen als Werbungskosten abziehbar?",
  ["Ja, in voller Höhe", "Ja, nur anteilig", KEIN],
  [
    { text: "Polizeibeamtin P kauft sich eine zusätzliche Uniformhose, die sie ausschließlich im Dienst trägt.", richtig: "Ja, in voller Höhe",
      erkl: "Uniform = typische Berufskleidung → Arbeitsmittel (§ 9 Abs. 1 S. 3 Nr. 6 S. 1 EStG); eine private Nutzung ist so gut wie ausgeschlossen." },
    { text: "Bankkaufmann B kauft einen dunklen Anzug, den er nach eigenen Angaben nur am Schalter trägt.", richtig: KEIN,
      erkl: "Bürgerliche Kleidung gehört zur Lebensführung (§ 12 Nr. 1 S. 2 EStG) – auch wenn sie tatsächlich nur im Beruf getragen wird. Keine typische Berufskleidung i. S. d. § 9 Abs. 1 S. 3 Nr. 6 EStG." },
    { text: "Koch K kauft zwei Kochjacken und ein Paar Sicherheitsschuhe für die Arbeit in der Restaurantküche.", richtig: "Ja, in voller Höhe",
      erkl: "Schutzkleidung und berufstypische Kleidung sind typische Berufskleidung (§ 9 Abs. 1 S. 3 Nr. 6 S. 1 EStG)." },
    { text: "Steuerfachangestellte S kauft einen EStG-Kommentar, mit dem sie im Büro arbeitet.", richtig: "Ja, in voller Höhe",
      erkl: "Fachliteratur dient unmittelbar der beruflichen Tätigkeit → Arbeitsmittel (§ 9 Abs. 1 S. 3 Nr. 6 EStG)." },
    { text: "Lehrer L abonniert eine überregionale Tageszeitung, um sich auch für den Unterricht auf dem Laufenden zu halten.", richtig: KEIN,
      erkl: "Allgemeine Tageszeitungen dienen der allgemeinen Information und damit (auch) der Lebensführung; eine Aufteilung ist nicht möglich (§ 12 Nr. 1 S. 2 EStG)." },
    { text: "Programmiererin P kauft einen Computer für 1.100 €, den sie nachweislich zu 60 % beruflich und zu 40 % privat nutzt.", richtig: "Ja, nur anteilig",
      erkl: "Gemischt genutztes Arbeitsmittel: Aufteilung nach objektivem Maßstab (Zeitanteile) → 60 % Werbungskosten (§ 9 Abs. 1 S. 3 Nr. 6, 7 EStG); der private Teil fällt unter § 12 Nr. 1 EStG." },
    { text: "Arbeitnehmer A nutzt sein privates Smartphone nur zu etwa 5 % beruflich.", richtig: KEIN,
      erkl: "Berufliche Mitbenutzung von weniger als 10 % ist untergeordnet → keine Werbungskosten (§ 12 Nr. 1 EStG)." },
    { text: "Sachbearbeiterin S kauft für ihre Arbeitsecke im Wohnzimmer einen Schreibtisch, den sie zu 95 % beruflich nutzt.", richtig: "Ja, in voller Höhe",
      erkl: "Private Mitbenutzung unter 10 % ist unschädlich → voller Abzug als Arbeitsmittel (§ 9 Abs. 1 S. 3 Nr. 6 EStG). Das Abzugsverbot für das Arbeitszimmer erfasst Arbeitsmittel nicht." },
    { text: "Ärztin Ä lässt ihre weißen Kittel aus der Klinik in einer Reinigung waschen.", richtig: "Ja, in voller Höhe",
      erkl: "Auch die Reinigung typischer Berufskleidung ist Teil der Aufwendungen für Arbeitsmittel (§ 9 Abs. 1 S. 3 Nr. 6 EStG)." },
  ], ["EStG 9 1", "EStG 12"]);

const GERAETE = [{ name: "eine Spiegelreflexkamera", nd: 7, wer: "Die angestellte Fotojournalistin Mia" }, { name: "einen Beamer", nd: 7, wer: "Der angestellte Vertriebstrainer Tom" },
  { name: "eine Profi-Nähmaschine", nd: 13, wer: "Die angestellte Modedesignerin Lea" }, { name: "ein E-Piano", nd: 10, wer: "Der angestellte Musiklehrer Jan" }];
const gemischtAfa = R("est-arbeitsmittel-gemischt", "est-arbeitsmittel", (r) => {
  const g = r.wahl(GERAETE), monat = r.zahl(1, 12), anteil = r.zahl(6, 9) * 10;
  const brutto = r.zahl(24, 60) * 50, afa = (brutto / g.nd) * (13 - monat) / 12 * anteil / 100;
  return {
    text: `${g.wer} kauft am ${r.zahl(2, 26)}. ${MONATE[monat - 1]} 2026 ${g.name} für ${eur(brutto)} einschließlich 19 % USt (Lieferung am selben Tag). Das Gerät wird nachweislich zu ${anteil} % beruflich genutzt. Gewöhnliche Nutzungsdauer: ${g.nd} Jahre.\n\nWie hoch sind die Werbungskosten 2026 (in €)?`,
    euro: afa,
    erklaerung: `Arbeitsmittel mit privater Mitbenutzung über 10 % → nur der berufliche Anteil (§ 9 Abs. 1 S. 3 Nr. 6 EStG, § 12 Nr. 1 EStG).\nAnschaffungskosten ohne USt ${eur(brutto / 1.19)} > 800 € → kein GWG; lineare AfA auf den Bruttobetrag (§ 9 Abs. 1 S. 3 Nr. 7 EStG, § 7 Abs. 1 EStG).\n${eur(brutto)} / ${g.nd} × ${13 - monat}/12 (Lieferung im ${MONATE[monat - 1]}, § 7 Abs. 1 S. 4 EStG) = ${eur(brutto / g.nd * (13 - monat) / 12)}\n× ${anteil} % beruflich = ${eur(afa)}`,
    normen: ["EStG 9 1", "EStG 7 1", "EStG 12"],
  };
});

const homeofficeRechnen = R("est-homeoffice-rechnen", "est-homeoffice", (r) => {
  const ho = r.zahl(40, 240), buero = r.zahl(0, 120);
  const pausch = Math.min(ho * HO_TAG, HO_MAX);
  return {
    text: `Ein Arbeitnehmer hat in der Firma einen festen Arbeitsplatz. 2026 arbeitet er an ${ho} Tagen ausschließlich in seiner Wohnung (Arbeitsecke im Wohnzimmer) und sucht an diesen Tagen die Firma nicht auf. An ${buero} weiteren Tagen ist er im Büro.\n\nWie hoch ist die Home-Office-Pauschale (in €)?`,
    euro: pausch,
    erklaerung: `Kein häusliches Arbeitszimmer (Arbeitsecke) → Tagespauschale nach § 4 Abs. 5 S. 1 Nr. 6c i.V.m. § 9 Abs. 5 EStG: 6 € je Tag, an dem überwiegend zu Hause gearbeitet und die erste Tätigkeitsstätte nicht aufgesucht wird.\n${ho} Tage × 6 € = ${eur(ho * HO_TAG)}${ho * HO_TAG > HO_MAX ? ` → höchstens ${eur(HO_MAX)}` : ""}.\nDie Bürotage zählen nicht (dort ggf. Entfernungspauschale).`,
    normen: ["EStG 4 5"],
  };
});

const ZIMMER = [
  { wer: "Die angestellte Softwareentwicklerin Nora", vorher: "im Büro ihres Arbeitgebers", nachher: "vereinbart sie Telearbeit und arbeitet an allen Arbeitstagen in ihrem häuslichen Arbeitszimmer; ihr Büroarbeitsplatz entfällt" },
  { wer: "Der Übersetzer Ben", vorher: "als Angestellter in einem Übersetzungsbüro", nachher: "ist er selbständig tätig und übersetzt ausschließlich in seinem häuslichen Arbeitszimmer" },
];
const arbeitszimmerRechnen = R("est-arbeitszimmer-rechnen", "est-homeoffice", (r) => {
  const z = r.wahl(ZIMMER), ab = r.zahl(2, 10), monate = 13 - ab;
  const miete = r.zahl(18, 32) * 50, flaeche = r.zahl(70, 110), zimmer = r.zahl(10, 18);
  const tats = miete * zimmer / flaeche * monate, pausch = HO_MAX * monate / 12, abzug = Math.max(tats, pausch);
  return {
    text: `${z.wer} arbeitete bis Ende ${MONATE[ab - 2]} 2026 ${z.vorher} und war an keinem Tag zu Hause tätig. Ab dem 1. ${MONATE[ab - 1]} ${z.nachher}. Das Arbeitszimmer (${zimmer} m², abgeschlossen, nur beruflich genutzt) liegt in der Mietwohnung (${flaeche} m²; Warmmiete einschließlich Nebenkosten ${eur(miete)} im Monat).\n\nWelcher Betrag ist für das Arbeitszimmer 2026 höchstens abziehbar (in €)?`,
    euro: abzug,
    erklaerung: `Ab ${MONATE[ab - 1]} bildet das Arbeitszimmer den Mittelpunkt der gesamten Tätigkeit → Abzug zulässig (§ 4 Abs. 5 S. 1 Nr. 6b S. 2 EStG${z.wer.includes("Ben") ? "" : ", für Werbungskosten i. V. m. § 9 Abs. 5 S. 1 EStG"}); davor nicht.\n• Tatsächliche Kosten: ${eur(miete)} × ${zimmer}/${flaeche} m² × ${monate} Monate = ${eur(tats)}\n• Jahrespauschale: 1.260 € × ${monate}/12 = ${eur(pausch)} (Kürzung um je 1/12 für ${ab === 2 ? "den vollen Monat" : `die ${ab - 1} vollen Monate`} ohne Mittelpunkt, Nr. 6b S. 3, 4)\nWahlrecht → der höhere Betrag: ${eur(abzug)}.\nFür die Monate davor gibt es auch keine Tagespauschale, weil an keinem Tag zu Hause gearbeitet wurde (Nr. 6c S. 1).`,
    normen: ["EStG 4 5", "EStG 9 5"],
  };
});

const AZ = "Arbeitszimmer: tatsächliche Kosten oder Jahrespauschale (Nr. 6b)";
const HO_NUR = "Tagespauschale nur für reine Home-Office-Tage (Nr. 6c S. 1)";
const HO_AUCH = "Tagespauschale auch an Tagen mit Arbeit auswärts (Nr. 6c S. 2)";
const HO_NICHTS = "Weder Arbeitszimmer noch Tagespauschale";
const homeofficeFall = F("est-homeoffice-fall", "est-homeoffice",
  "Was kann für die Arbeit zu Hause abgezogen werden?",
  [AZ, HO_NUR, HO_AUCH, HO_NICHTS],
  [
    { text: "Die freie Schriftstellerin S schreibt ihre Romane ausschließlich in einem abgeschlossenen, nur beruflich genutzten Zimmer ihrer Wohnung. Lesungen hält sie nur gelegentlich.", richtig: AZ,
      erkl: "Das Arbeitszimmer ist der qualitative Mittelpunkt der gesamten Tätigkeit → tatsächliche Kosten oder Jahrespauschale 1.260 € (§ 4 Abs. 5 S. 1 Nr. 6b S. 2, 3 EStG)." },
    { text: "Sachbearbeiter A hat im Büro seines Arbeitgebers einen festen Arbeitsplatz. An zwei Tagen pro Woche arbeitet er ganztags am Küchentisch.", richtig: HO_NUR,
      erkl: "Kein Arbeitszimmer (Küche ist kein büromäßig eingerichteter Raum), anderer Arbeitsplatz vorhanden → 6 € nur für die Tage, an denen er überwiegend zu Hause arbeitet und das Büro nicht aufsucht (§ 4 Abs. 5 S. 1 Nr. 6c S. 1, § 9 Abs. 5 S. 1 EStG)." },
    { text: "Lehrerin L unterrichtet an einer Schule, in der ihr kein eigener Arbeitsplatz zur Verfügung steht. Unterricht vor- und nachbereiten sowie korrigieren tut sie nachmittags in ihrem häuslichen Arbeitszimmer.", richtig: HO_AUCH,
      erkl: "Mittelpunkt ist der Unterricht in der Schule → kein Abzug nach Nr. 6b. Da dauerhaft kein anderer Arbeitsplatz zur Verfügung steht, gibt es die Tagespauschale auch an Unterrichtstagen (§ 4 Abs. 5 S. 1 Nr. 6c S. 2 EStG)." },
    { text: "Außendienstmitarbeiter M hat beim Arbeitgeber keinen Büroarbeitsplatz. Er ist täglich bei Kunden unterwegs und erledigt morgens und abends Berichte und Terminplanung in seinem Arbeitszimmer.", richtig: HO_AUCH,
      erkl: "Mittelpunkt ist die Tätigkeit beim Kunden → kein Abzug nach Nr. 6b. Kein anderer Arbeitsplatz → Tagespauschale auch an Tagen mit Auswärtstätigkeit (§ 4 Abs. 5 S. 1 Nr. 6c S. 2 EStG)." },
    { text: "Angestellte B arbeitet an drei Tagen pro Woche im Büro ihres Arbeitgebers und an zwei Tagen in ihrem häuslichen Arbeitszimmer, wo sie dieselben Aufgaben erledigt.", richtig: HO_NUR,
      erkl: "Bei gleichwertiger Tätigkeit liegt der Mittelpunkt dort, wo überwiegend gearbeitet wird – im Büro → kein Abzug nach Nr. 6b. Tagespauschale für die reinen Home-Office-Tage (§ 4 Abs. 5 S. 1 Nr. 6c S. 1 EStG)." },
    { text: "Angestellter C erledigt dieselben Aufgaben an vier von fünf Arbeitstagen in seinem häuslichen Arbeitszimmer und fährt nur einmal pro Woche ins Büro.", richtig: AZ,
      erkl: "Gleichwertige Tätigkeit, die überwiegend im Arbeitszimmer ausgeübt wird → Mittelpunkt im Arbeitszimmer (§ 4 Abs. 5 S. 1 Nr. 6b S. 2 EStG); daneben keine Tagespauschale (Nr. 6c S. 3)." },
    { text: "Arbeitnehmer D, der im Betrieb einen festen Arbeitsplatz hat, beantwortet morgens zwei Stunden E-Mails am heimischen Schreibtisch und fährt dann für sechs Stunden ins Büro.", richtig: HO_NICHTS,
      erkl: "Weder überwiegend zu Hause gearbeitet noch ohne Besuch der ersten Tätigkeitsstätte → keine Tagespauschale (§ 4 Abs. 5 S. 1 Nr. 6c S. 1 EStG); für den Tag gibt es nur die Entfernungspauschale." },
  ], ["EStG 4 5", "EStG 9 5"]);

// ======================================================================= Reisekosten (Auswärtstätigkeit)
const VP_VOLL = 28, VP_TEIL = 14, KM_PKW = 0.30; // § 9 Abs. 4a S. 3 EStG; höchste Wegstreckenentschädigung § 5 Abs. 2 BRKG
const reisekosten = [
  A("est-reisekosten", "est-reisekosten",
    "Was ist eine auswärtige berufliche Tätigkeit, und welche Reisekosten kann ein Arbeitnehmer dabei als Werbungskosten abziehen?",
    "Auswärtige berufliche Tätigkeit (§ 9 Abs. 4a S. 2 EStG): beruflich tätig außerhalb der Wohnung und der ersten Tätigkeitsstätte (§ 9 Abs. 4 EStG). Reisekosten:\n• Fahrtkosten (§ 9 Abs. 1 S. 3 Nr. 4a EStG): tatsächliche Kosten oder pauschal je gefahrenem Kilometer nach BRKG, beim Pkw 0,30 € – Hin- und Rückfahrt (keine Entfernungspauschale).\n• Verpflegungsmehraufwand (§ 9 Abs. 4a EStG): nur Pauschalen – 28 € bei 24 Stunden Abwesenheit, 14 € für An- und Abreisetag bei Übernachtung und 14 € bei eintägiger Abwesenheit von mehr als 8 Stunden; nur für die ersten drei Monate an derselben Tätigkeitsstätte (S. 6), Neubeginn nach mindestens vier Wochen Unterbrechung (S. 7). Stellt der Arbeitgeber eine Mahlzeit, wird gekürzt: Frühstück 20 % (5,60 €), Mittag- und Abendessen je 40 % (11,20 €) der 28 € (S. 8).\n• Übernachtungskosten (§ 9 Abs. 1 S. 3 Nr. 5a EStG): tatsächliche Kosten der Unterkunft; Frühstück ist herauszurechnen (Verpflegung, mit der Pauschale abgegolten). Nach 48 Monaten an derselben Tätigkeitsstätte höchstens 1.000 € im Monat.\n• Reisenebenkosten (§ 9 Abs. 1 S. 1 EStG): z. B. Parkgebühren, Maut, Gepäckaufbewahrung.\nSteuerfreie Erstattungen des Arbeitgebers (§ 3 Nr. 16 EStG) schließen den Abzug insoweit aus.",
    ["EStG 9 4a", "EStG 9 1", "EStG 9 4"],
    M(["Bei einer eintägigen Auswärtstätigkeit mit mehr als 8 Stunden Abwesenheit beträgt die Verpflegungspauschale 14 €.", "Fahrtkosten mit dem eigenen Pkw können bei einer Auswärtstätigkeit mit 0,30 € je gefahrenem Kilometer angesetzt werden.", "Ein vom Arbeitgeber gestelltes Mittagessen kürzt die Verpflegungspauschale um 11,20 €.", "Die Verpflegungspauschalen gibt es nur für die ersten drei Monate an derselben Tätigkeitsstätte."],
      ["Für Fahrten zu einer Auswärtstätigkeit gilt die Entfernungspauschale von 0,38 € je Entfernungskilometer.", "Statt der Pauschalen können die tatsächlichen Restaurantrechnungen abgezogen werden.", "Bei einer eintägigen Reise von 7 Stunden gibt es 14 € Verpflegungspauschale.", "Das im Hotelpreis enthaltene Frühstück gehört zu den Übernachtungskosten."],
      "Welche Aussagen zu Reisekosten bei einer Auswärtstätigkeit sind richtig?")),
];

const verpflegungRechnen = R("est-verpflegung-rechnen", "est-reisekosten", (r) => {
  const tage = r.zahl(2, 5), abend = r.muenze(), fr = VP_VOLL * 0.2, essen = VP_VOLL * 0.4;
  const tag = (i) => (i === 0 || i === tage - 1 ? VP_TEIL : VP_VOLL);
  const kuerz = (i) => (i > 0 ? fr : 0) + (abend && i === 0 ? essen : 0);
  const netto = (i) => Math.max(tag(i) - kuerz(i), 0);
  const summe = Array.from({ length: tage }, (_, i) => netto(i)).reduce((a, b) => a + b, 0);
  const zeilen = Array.from({ length: tage }, (_, i) => `• Tag ${i + 1} (${i === 0 ? "Anreise" : i === tage - 1 ? "Abreise" : "24 Std."}): ${eur(tag(i))}${kuerz(i) ? ` − ${[i > 0 ? "Frühstück 5,60 €" : "", abend && i === 0 ? "Abendessen 11,20 €" : ""].filter(Boolean).join(" − ")} = ${eur(netto(i))}` : ""}`);
  return {
    text: `Arbeitnehmerin Jule nimmt 2026 an einer ${tage}-tägigen Schulung in Leipzig teil (Montag früh Anreise, Rückkehr am ${["", "", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"][tage]}abend). Ihr Arbeitgeber hat das Hotel mit Frühstück gebucht und bezahlt${abend ? "; am Anreiseabend lädt er alle Teilnehmer zu einem Abendessen ein" : ""}. Weitere Mahlzeiten bezahlt Jule selbst. Erstattungen erhält sie nicht.\n\nWie hoch sind die abziehbaren Verpflegungsmehraufwendungen (in €)?`,
    euro: summe,
    erklaerung: `Auswärtige berufliche Tätigkeit (§ 9 Abs. 4a S. 2 EStG) mit Übernachtung → An- und Abreisetag je 14 €, volle Tage 28 € (S. 3 Nr. 1, 2).\nVom Arbeitgeber gestellte Mahlzeiten kürzen (S. 8): Frühstück 20 % = 5,60 €, Abendessen 40 % = 11,20 € der 28 €.\n${zeilen.join("\n")}\n= ${eur(summe)}`,
    normen: ["EStG 9 4a"],
  };
});

const ZIELE = [["Hannover", 150], ["Kassel", 230], ["Erfurt", 290], ["Bremen", 120], ["Münster", 180], ["Nürnberg", 210]];
// Fortbildung als Auswärtstätigkeit: Teilnahmegebühr mit Mittagessen trägt der Arbeitgeber, Fahrtkosten teils erstattet (Klausur 10/23)
const fortbildungRechnen = R("est-fortbildung-erstattung", "est-reisekosten", (r) => {
  const tage = r.zahl(2, 5), km = r.zahl(30, 110), essen = r.zahl(0, 3) > 0, gebuehr = r.zahl(4, 15) * 100;
  const fahrt = tage * 2 * km * 0.3, erst = r.wahl([0, Math.floor(fahrt * r.wahl([0.5, 0.75]) / 50) * 50, fahrt]);
  const vma = essen ? 14 - 11.2 : 14, wk = fahrt - erst + tage * vma;
  return {
    text: `Arbeitnehmerin Anja besucht im Auftrag ihres Arbeitgebers an ${tage} aufeinanderfolgenden Tagen eine Fortbildung in einer anderen Stadt (einfache Entfernung ${km} km). Sie fährt jeden Tag mit ihrem eigenen Pkw hin und zurück und ist täglich von 7:00 bis 17:00 Uhr unterwegs. Die Teilnahmegebühr von ${eur(gebuehr)}${essen ? " (einschließlich eines gemeinsamen Mittagessens an jedem Tag)" : ""} zahlt der Arbeitgeber direkt an den Veranstalter. ${erst ? `Für die Fahrtkosten erstattet er Anja steuerfrei ${eur(erst)}.` : "Weitere Kosten erstattet er nicht."}\n\nWie hoch sind Anjas Werbungskosten aus der Fortbildung (in €)?`,
    euro: wk,
    erklaerung: `Die Fortbildung ist eine Auswärtstätigkeit (§ 9 Abs. 4a S. 2 EStG).\n• Fahrtkosten: ${tage} Tage × 2 × ${km} km × 0,30 € = ${eur(fahrt)} (§ 9 Abs. 1 S. 3 Nr. 4a S. 2 EStG)${erst ? `; die steuerfreie Erstattung (§ 3 Nr. 16 EStG) mindert die Werbungskosten (§ 3c Abs. 1 EStG): − ${eur(erst)} → ${eur(fahrt - erst)}` : ""}\n• Teilnahmegebühr: vom Arbeitgeber getragen → kein eigener Aufwand, keine Werbungskosten\n• Verpflegung: mehr als 8 Stunden abwesend → 14 € je Tag (§ 9 Abs. 4a S. 3 Nr. 3 EStG)${essen ? `; das Mittagessen stellt der Arbeitgeber über den Veranstalter → Kürzung um 40 % von 28 € = 11,20 € (§ 9 Abs. 4a S. 8 Nr. 2 EStG) → 2,80 € × ${tage} = ${eur(tage * vma)}` : ` × ${tage} = ${eur(tage * vma)}`}\n= Werbungskosten ${eur(wk)}`,
    normen: ["EStG 9 1", "EStG 9 4a", "EStG 3"],
  };
});

const reiseRechnen = R("est-reise-gesamt", "est-reisekosten", (r) => {
  const [ziel, einfach] = r.wahl(ZIELE), naechte = r.zahl(1, 3), preis = r.zahl(80, 140), frueh = r.zahl(12, 19), park = r.zahl(2, 6) * 5;
  const fahrt = einfach * 2 * KM_PKW, hotel = naechte * (preis - frueh), vma = 2 * VP_TEIL + (naechte - 1) * VP_VOLL;
  const erst = r.muenze() ? Math.floor((fahrt + hotel) * r.zahl(3, 8) / 100) * 10 : 0; // Teilerstattung, immer unter den Kosten
  const summe = fahrt + hotel + vma + park - erst;
  return {
    text: `Vertriebsmitarbeiter Ole fährt 2026 mit seinem eigenen Pkw zu einem Messeauftritt seines Arbeitgebers nach ${ziel} (${einfach} km einfache Strecke) und bleibt dort ${naechte} ${naechte === 1 ? "Nacht" : "Nächte"}. Das Hotel stellt ihm je Nacht ${eur(preis)} in Rechnung, darin ist ein gesondert ausgewiesenes Frühstück von ${eur(frueh)} enthalten. Alle Mahlzeiten bezahlt er selbst. Für das Messeparkhaus zahlt er insgesamt ${eur(park)}.${erst ? ` Sein Arbeitgeber erstattet ihm steuerfrei ${eur(erst)}.` : " Erstattungen erhält er nicht."}\n\nWie hoch sind die Werbungskosten aus der Reise (in €)?`,
    euro: summe,
    erklaerung: `• Fahrtkosten (§ 9 Abs. 1 S. 3 Nr. 4a S. 2 EStG): ${einfach} km × 2 × 0,30 € = ${eur(fahrt)}\n• Übernachtung (Nr. 5a S. 2): ${naechte} × (${eur(preis)} − Frühstück ${eur(frueh)}) = ${eur(hotel)}\n• Verpflegung (§ 9 Abs. 4a S. 3 EStG): 2 × 14 €${naechte > 1 ? ` + ${naechte - 1} × 28 €` : ""} = ${eur(vma)} – keine Kürzung, da Ole das Frühstück selbst bezahlt\n• Parkgebühren (Reisenebenkosten, § 9 Abs. 1 S. 1 EStG): ${eur(park)}${erst ? `\n• − steuerfreie Erstattung (§ 3 Nr. 16 EStG, § 3c Abs. 1 EStG): ${eur(erst)}` : ""}\n= ${eur(summe)}`,
    normen: ["EStG 9 1", "EStG 9 4a", "EStG 3"],
  };
});

const VP = ["28 €", "14 €", "2,80 €", "Keine Verpflegungspauschale"];
const reiseFall = F("est-reisekosten-fall", "est-reisekosten",
  "Welche Verpflegungspauschale steht für den Tag zu?",
  VP,
  [
    { text: "Bauleiter B fährt von seiner Wohnung zu einer Kundenbaustelle und ist insgesamt 9 Stunden unterwegs; er übernachtet zu Hause.", richtig: "14 €",
      erkl: "Eintägige Auswärtstätigkeit mit mehr als 8 Stunden Abwesenheit → 14 € (§ 9 Abs. 4a S. 3 Nr. 3 EStG)." },
    { text: "Referentin R hält einen Vortrag in der Nachbarstadt und ist insgesamt 7 ½ Stunden von Wohnung und erster Tätigkeitsstätte abwesend.", richtig: "Keine Verpflegungspauschale",
      erkl: "Nicht mehr als 8 Stunden → keine Pauschale (§ 9 Abs. 4a S. 3 Nr. 3 EStG)." },
    { text: "Monteur M ist auf einer fünftägigen Dienstreise mit Hotelübernachtung. Gefragt ist der dritte Tag, an dem er 24 Stunden abwesend ist; Mahlzeiten bezahlt er selbst.", richtig: "28 €",
      erkl: "Kalendertag mit 24 Stunden Abwesenheit → 28 € (§ 9 Abs. 4a S. 3 Nr. 1 EStG)." },
    { text: "Beraterin C reist um 20 Uhr zu einem Kundentermin am nächsten Morgen an und übernachtet im Hotel. Gefragt ist der Anreisetag.", richtig: "14 €",
      erkl: "Anreisetag bei Übernachtung → 14 € ohne Mindestabwesenheit (§ 9 Abs. 4a S. 3 Nr. 2 EStG)." },
    { text: "Elektriker E arbeitet seit vier Monaten an derselben Großbaustelle (keine erste Tätigkeitsstätte), zu der er täglich fährt; er ist jeden Tag 10 Stunden abwesend.", richtig: "Keine Verpflegungspauschale",
      erkl: "Der Abzug ist auf die ersten drei Monate an derselben Tätigkeitsstätte beschränkt (§ 9 Abs. 4a S. 6 EStG)." },
    { text: "Elektriker F war drei Monate an einer Großbaustelle, dann sechs Wochen im Urlaub und arbeitet jetzt wieder dort, täglich 10 Stunden abwesend.", richtig: "14 €",
      erkl: "Unterbrechung von mindestens vier Wochen → die Dreimonatsfrist beginnt neu (§ 9 Abs. 4a S. 7 EStG); mehr als 8 Stunden → 14 €." },
    { text: "Sachbearbeiterin S arbeitet wegen eines Projekts 11 Stunden in der Firmenzentrale, ihrer ersten Tätigkeitsstätte.", richtig: "Keine Verpflegungspauschale",
      erkl: "Keine auswärtige berufliche Tätigkeit – sie ist an ihrer ersten Tätigkeitsstätte tätig (§ 9 Abs. 4a S. 2, § 9 Abs. 4 EStG)." },
    { text: "Vertriebler V besucht einen Kunden und ist 10 Stunden unterwegs (ohne Übernachtung). Der Arbeitgeber lädt ihn dort zum Mittagessen mit dem Kunden ein (geschäftlich veranlasste Bewirtung durch den Arbeitgeber).", richtig: "2,80 €",
      erkl: "14 € (§ 9 Abs. 4a S. 3 Nr. 3 EStG) − 40 % von 28 € = 11,20 € für das vom Arbeitgeber gestellte Mittagessen (S. 8 Nr. 2) = 2,80 €." },
  ], ["EStG 9 4a"]);

const wkSumme = R("est-wk-summe", "est-werbungskosten", (r) => {
  const tage = r.zahl(150, 220), entf = r.zahl(3, 14), buecher = r.zahl(2, 30) * 10, gew = r.muenze() ? r.zahl(15, 40) * 10 : 0;
  const ep = tage * entf * EP, sonst = ep + buecher, abz = Math.max(sonst, AN_PB) + gew;
  return {
    text: `Arbeitnehmer Paul fährt 2026 an ${tage} Tagen mit dem eigenen PKW zu seiner ${entf} km entfernten ersten Tätigkeitsstätte. Für Fachbücher gibt er ${eur(buecher)} aus${gew ? `; Gewerkschaftsbeiträge: ${eur(gew)}` : ""}.\n\nWelcher Betrag ist insgesamt als Werbungskosten abzuziehen (in €)?`,
    euro: abz,
    erklaerung: `• Entfernungspauschale: ${tage} × ${entf} km × 0,38 € = ${eur(ep)} (§ 9 Abs. 1 S. 3 Nr. 4 EStG)\n• Fachbücher (Arbeitsmittel, Nr. 6): ${eur(buecher)}\n• Summe ${eur(sonst)} ${sonst < AN_PB ? `< Arbeitnehmer-Pauschbetrag → ${eur(AN_PB)} (§ 9a S. 1 Nr. 1 a EStG)` : `> Arbeitnehmer-Pauschbetrag → tatsächliche Werbungskosten`}${gew ? `\n• Gewerkschaftsbeiträge zusätzlich (§ 9a S. 3 EStG): + ${eur(gew)}` : ""}\n= ${eur(abz)}`,
    normen: ["EStG 9 1", "EStG 9a"],
  };
});

// ======================================================================= Entfernungspauschale
const entfernung = [
  A("est-ep-grundlagen", "est-entfernung",
    "Wie wird die Entfernungspauschale berechnet? Welche Höchstbeträge gelten?",
    "§ 9 Abs. 1 S. 3 Nr. 4 EStG:\n• Werbungskosten für die Wege zwischen Wohnung und erster Tätigkeitsstätte.\n• Für jeden Arbeitstag, an dem die erste Tätigkeitsstätte aufgesucht wird – nur einmal je Tag, auch bei mehreren Wegen (Elternabend) oder Nachtdienst über zwei Kalendertage.\n• Für jeden vollen Kilometer der einfachen Entfernung (abrunden) nach der kürzesten Straßenverbindung; eine längere, verkehrsgünstigere Strecke nur, wenn sie regelmäßig mit dem PKW genutzt wird.\n• Ab 2026 einheitlich 0,38 € je Entfernungskilometer (2025: 0,30 € für die ersten 20 km, 0,38 € ab dem 21. km).\n• Verkehrsmittelunabhängig („Wege“, nicht Fahrten).\n• Höchstbetrag 4.500 € im Jahr – gilt nicht bei Nutzung eines eigenen oder überlassenen PKW (nicht Motorrad; nicht als Mitfahrer).\n• Tatsächliche Kosten für öffentliche Verkehrsmittel sind anzusetzen, soweit sie die Entfernungspauschale übersteigen (§ 9 Abs. 2 S. 2 EStG).\n• Keine Pauschale für Flugstrecken und steuerfreie Sammelbeförderung.",
    ["EStG 9 1", "EStG 9 2"],
    M(["Die Entfernungspauschale beträgt ab 2026 0,38 € je Entfernungskilometer.", "Maßgeblich ist die einfache Entfernung nach der kürzesten Straßenverbindung.", "Bei Nutzung eines eigenen PKW gilt der Höchstbetrag von 4.500 € nicht.", "Höhere tatsächliche Kosten für öffentliche Verkehrsmittel können angesetzt werden."],
      ["Die Entfernungspauschale wird für Hin- und Rückweg gesondert berechnet.", "Angefangene Kilometer werden aufgerundet.", "Der Höchstbetrag von 4.500 € gilt immer, auch bei PKW-Nutzung.", "Ab 2026 gilt für die ersten 20 km ein Satz von 0,30 €."],
      "Welche Aussagen zur Entfernungspauschale sind richtig?")),
  A("est-erste-ts", "est-entfernung",
    "Was ist die erste Tätigkeitsstätte (§ 9 Abs. 4 EStG), und wie wird sie bestimmt?",
    "• Ortsfeste betriebliche Einrichtung des Arbeitgebers, eines verbundenen Unternehmens oder eines vom Arbeitgeber bestimmten Dritten, der der Arbeitnehmer dauerhaft zugeordnet ist (§ 9 Abs. 4 S. 1). Nicht: Fahrzeuge, weiträumiges Tätigkeitsgebiet, Home-Office.\n• Vorrangig: dauerhafte Zuordnung durch den Arbeitgeber (arbeits- oder dienstrechtlich) – unbefristet, für die Dauer des Dienstverhältnisses oder über 48 Monate. Dann genügt ein Tätigwerden in geringem Umfang.\n• Fehlt eine Zuordnung, quantitative Bestimmung (§ 9 Abs. 4 S. 4): typischerweise arbeitstäglich oder je Woche zwei volle Arbeitstage oder mindestens ein Drittel der regelmäßigen Arbeitszeit – mit Aufgaben der eigentlichen Tätigkeit.\n• Höchstens eine erste Tätigkeitsstätte je Dienstverhältnis; bei mehreren die der Wohnung am nächsten gelegene.\n• Sammelpunkt (Busdepot) ist keine erste Tätigkeitsstätte; wird er typischerweise arbeitstäglich aufgesucht, gilt die Entfernungspauschale entsprechend (§ 9 Abs. 1 S. 3 Nr. 4a S. 3).",
    ["EStG 9 4"],
    M(["Die erste Tätigkeitsstätte ist eine ortsfeste betriebliche Einrichtung, der der Arbeitnehmer dauerhaft zugeordnet ist.", "Die Zuordnung durch den Arbeitgeber hat Vorrang vor der quantitativen Bestimmung.", "Ein Arbeitnehmer hat je Dienstverhältnis höchstens eine erste Tätigkeitsstätte.", "Das Home-Office ist keine erste Tätigkeitsstätte."],
      ["Das Home-Office ist die erste Tätigkeitsstätte, wenn dort mehr als die Hälfte gearbeitet wird.", "Ein Busdepot, an dem ein Busfahrer seinen Dienst beginnt, ist seine erste Tätigkeitsstätte.", "Ein Arbeitnehmer kann beliebig viele erste Tätigkeitsstätten haben.", "Ein Firmenfahrzeug kann erste Tätigkeitsstätte sein."],
      "Welche Aussagen zur ersten Tätigkeitsstätte sind richtig?")),
  A("est-ep-abgeltung", "est-entfernung",
    "Welche Aufwendungen sind durch die Entfernungspauschale abgegolten? Gibt es Ausnahmen?",
    "• § 9 Abs. 2 S. 1 EStG: Sämtliche Aufwendungen für die Wege zwischen Wohnung und erster Tätigkeitsstätte sind abgegolten – tatsächliche Kfz-Kosten, Finanzierungskosten, Parkgebühren am Arbeitsplatz oder am Park-&-Ride-Parkplatz.\n• Ausnahmen:\n  – Unfallkosten auf einem solchen Weg sind zusätzlich abziehbar (nicht bei privaten Umwegen oder bei Alkoholeinfluss),\n  – höhere tatsächliche Kosten für öffentliche Verkehrsmittel (§ 9 Abs. 2 S. 2),\n  – Menschen mit Behinderung (GdB mindestens 70, oder mindestens 50 mit Merkzeichen G/aG): tatsächliche Kosten statt Pauschale, bei eigenem PKW pauschal 0,30 € je gefahrenem Kilometer (Hin- und Rückfahrt), § 9 Abs. 2 S. 3 EStG.",
    ["EStG 9 2"],
    M(["Parkgebühren am Arbeitsplatz sind durch die Entfernungspauschale abgegolten.", "Unfallkosten auf dem Weg zur ersten Tätigkeitsstätte sind zusätzlich abziehbar.", "Menschen mit einem GdB von mindestens 70 können die tatsächlichen Kosten ansetzen."],
      ["Parkgebühren am Arbeitsplatz sind zusätzlich zur Entfernungspauschale abziehbar.", "Unfallkosten unter Alkoholeinfluss sind zusätzlich abziehbar.", "Die Finanzierungszinsen für den PKW sind neben der Pauschale abziehbar.", "Menschen mit Behinderung erhalten die doppelte Entfernungspauschale."],
      "Welche Aussagen zur Abgeltungswirkung der Entfernungspauschale sind richtig?")),
];

const epPkw = R("est-ep-pkw", "est-entfernung", (r) => {
  const tage = r.zahl(140, 230), kmVoll = r.zahl(4, 70), nk = r.zahl(0, 9), entf = kmVoll + nk / 10;
  const ep = tage * kmVoll * EP;
  return {
    text: `Arbeitnehmerin Lea fährt 2026 an ${tage} Arbeitstagen mit ihrem eigenen PKW zu ihrer ersten Tätigkeitsstätte und zurück. Die kürzeste Straßenverbindung beträgt ${km(entf)} km.\n\nWie hoch ist die Entfernungspauschale (in €)?`,
    euro: ep,
    erklaerung: `§ 9 Abs. 1 S. 3 Nr. 4 EStG: Arbeitstage × volle Kilometer der einfachen Entfernung × 0,38 €\n${tage} × ${kmVoll} km (abgerundet) × 0,38 € = ${eur(ep)}\nKein Höchstbetrag, da ein eigener PKW genutzt wird. Hin- und Rückweg sind mit der einfachen Entfernung abgegolten.`,
    normen: ["EStG 9 1"],
  };
});
const epOepnv = R("est-ep-oepnv", "est-entfernung", (r) => {
  const tage = r.zahl(180, 225), entf = r.zahl(35, 140), kosten = r.wahl([12 * 63, r.zahl(25, 85) * 100]);
  const roh = tage * entf * EP, ep = Math.min(roh, MAX_OEPNV), abz = Math.max(ep, kosten);
  return {
    text: `Arbeitnehmer Jan fährt 2026 an ${tage} Arbeitstagen ausschließlich mit der Bahn zu seiner ersten Tätigkeitsstätte (kürzeste Straßenverbindung ${entf} km). Seine Fahrkarten kosten im Jahr ${eur(kosten)}.\n\nWelcher Betrag ist für die Wege als Werbungskosten abziehbar (in €)?`,
    euro: abz,
    erklaerung: `Entfernungspauschale: ${tage} × ${entf} km × 0,38 € = ${eur(roh)}${roh > MAX_OEPNV ? ` → begrenzt auf ${eur(MAX_OEPNV)}, weil kein PKW genutzt wird` : " (Höchstbetrag 4.500 € nicht überschritten)"}.\nTatsächliche Kosten öffentlicher Verkehrsmittel: ${eur(kosten)}. ${kosten > ep ? `Sie übersteigen die Pauschale und sind anzusetzen (§ 9 Abs. 2 S. 2 EStG) → ${eur(kosten)}.` : `Sie übersteigen die Pauschale nicht → ${eur(ep)}.`}`,
    normen: ["EStG 9 1", "EStG 9 2"],
  };
});
const epGemischt = R("est-ep-gemischt", "est-entfernung", (r) => {
  const tage = r.zahl(200, 225), pkw = r.zahl(8, 25), gesamt = r.zahl(70, 120), bahn = gesamt - pkw;
  const epPkwT = pkw * EP * tage, epBahnRoh = bahn * EP * tage, epBahn = Math.min(epBahnRoh, MAX_OEPNV), ges = epPkwT + epBahn;
  const ticket = r.zahl(20, Math.floor(ges / 100) - 1) * 100;
  return {
    text: `Ein Arbeitnehmer fährt 2026 an ${tage} Arbeitstagen morgens mit seinem PKW ${pkw} km zum Bahnhof und von dort mit dem Zug zu seiner ersten Tätigkeitsstätte (abends zurück). Die kürzeste Straßenverbindung von der Wohnung zur Tätigkeitsstätte beträgt ${gesamt} km. Seine Jahreskarte kostet ${eur(ticket)}.\n\nWie hoch ist die abziehbare Entfernungspauschale (in €)?`,
    euro: ges,
    erklaerung: `Maßgeblich ist die kürzeste Straßenverbindung der Gesamtstrecke (${gesamt} km).\n• PKW-Teilstrecke (kein Höchstbetrag): ${pkw} km × 0,38 € × ${tage} = ${eur(epPkwT)}\n• Restliche Strecke (${gesamt} − ${pkw} = ${bahn} km) mit der Bahn: ${bahn} km × 0,38 € × ${tage} = ${eur(epBahnRoh)}${epBahnRoh > MAX_OEPNV ? ` → höchstens ${eur(MAX_OEPNV)}` : ""}\n• Insgesamt: ${eur(ges)}\nDie Bahnkosten (${eur(ticket)}) übersteigen die insgesamt abziehbare Pauschale nicht und bleiben unberücksichtigt (§ 9 Abs. 2 S. 2 EStG).`,
    normen: ["EStG 9 1", "EStG 9 2"],
  };
});
const epJobticket = R("est-ep-jobticket", "est-entfernung", (r) => {
  const tage = r.zahl(180, 220), entf = r.zahl(18, 45), monate = r.zahl(6, 12), zuschuss = r.zahl(2, 5) * 10;
  const ep = Math.min(tage * entf * EP, MAX_OEPNV), z = monate * zuschuss, abz = ep - z;
  return {
    text: `Arbeitnehmerin Dilara fährt 2026 an ${tage} Arbeitstagen mit Bus und Bahn zu ihrer ersten Tätigkeitsstätte (kürzeste Straßenverbindung ${entf} km). Ihr Deutschlandticket kostet 63 € im Monat. Der Arbeitgeber zahlt ihr ${monate} Monate lang zusätzlich zum ohnehin geschuldeten Arbeitslohn einen Zuschuss von ${eur(zuschuss)} monatlich.\n\nWelcher Betrag ist für die Wege als Werbungskosten abziehbar (in €)?`,
    euro: abz,
    erklaerung: `• Entfernungspauschale: ${tage} × ${entf} km × 0,38 € = ${eur(tage * entf * EP)}${tage * entf * EP > MAX_OEPNV ? " → höchstens 4.500 €" : ""}\n• Die tatsächlichen Ticketkosten (höchstens 12 × 63 € = 756 €) übersteigen die Pauschale nicht.\n• Der Zuschuss ist steuerfrei (§ 3 Nr. 15 S. 1 EStG) und mindert die Entfernungspauschale (§ 3 Nr. 15 S. 3 EStG): ${monate} × ${eur(zuschuss)} = ${eur(z)}\n= ${eur(ep)} − ${eur(z)} = ${eur(abz)}`,
    normen: ["EStG 3", "EStG 9 1"],
  };
});
const epWechsel = R("est-ep-wechsel", "est-entfernung", (r) => {
  const t1 = r.zahl(90, 115), t2 = r.zahl(90, 115), entf = r.zahl(70, 140), bahnKosten = r.zahl(15, 35) * 100;
  const roh1 = t1 * entf * EP, ep1 = Math.min(roh1, MAX_OEPNV), ep2 = t2 * entf * EP, ges = ep1 + ep2;
  return {
    text: `Ein Arbeitnehmer fährt 2026 von Januar bis Juni an ${t1} Arbeitstagen mit der Bahn (Kosten der Monatskarten: ${eur(bahnKosten)}) und ab Juli an ${t2} Arbeitstagen mit seinem eigenen PKW zu seiner ersten Tätigkeitsstätte. Kürzeste Straßenverbindung: ${entf} km.\n\nWie hoch ist die abziehbare Entfernungspauschale (in €)?`,
    euro: ges,
    erklaerung: `• Januar – Juni (Bahn): ${t1} × ${entf} km × 0,38 € = ${eur(roh1)}${roh1 > MAX_OEPNV ? " → höchstens 4.500 €, da kein PKW" : ""}\n• Juli – Dezember (eigener PKW, kein Höchstbetrag): ${t2} × ${entf} km × 0,38 € = ${eur(ep2)}\n• Insgesamt: ${eur(ges)}\nDie Bahnkosten (${eur(bahnKosten)}) übersteigen die im Jahr insgesamt abziehbare Pauschale nicht (§ 9 Abs. 2 S. 2 EStG).`,
    normen: ["EStG 9 1", "EStG 9 2"],
  };
});

// ======================================================================= Gewinnermittlung nach § 4 Abs. 3 EStG (Klausur Teil II)
const gewinn = [
  A("est-euer", "est-gewinn",
    "Wer darf seinen Gewinn nach § 4 Abs. 3 EStG ermitteln, und welche Besonderheiten gelten gegenüber dem reinen Zu- und Abflussprinzip?",
    "• Berechtigt: wer nicht gesetzlich verpflichtet ist, Bücher zu führen und Abschlüsse zu machen, und dies auch nicht freiwillig tut (§ 4 Abs. 3 S. 1 EStG) – typisch Freiberufler (§ 18 EStG), die als Nicht-Kaufleute weder nach § 238 HGB noch nach §§ 140, 141 AO buchführungspflichtig sind.\n• Gewinn = Betriebseinnahmen − Betriebsausgaben (§ 4 Abs. 4 EStG); es gilt das Zu- und Abflussprinzip (§ 11 EStG).\n• Durchlaufende Posten scheiden aus (§ 4 Abs. 3 S. 2 EStG).\n• Abnutzbares Anlagevermögen: nicht der Kaufpreis, sondern AfA bzw. GWG-Regel (§ 4 Abs. 3 S. 3 EStG); die AfA beginnt mit der Lieferung (§ 9a EStDV).\n• Nicht abnutzbares Anlagevermögen (z. B. Grund und Boden): Anschaffungskosten erst bei Veräußerung oder Entnahme als Betriebsausgabe (§ 4 Abs. 3 S. 4 EStG).\n• Darlehen: Auszahlung ist keine Betriebseinnahme, Tilgung keine Betriebsausgabe; nur die Zinsen sind Betriebsausgaben.\n• Umlaufvermögen (Waren, Material) ist bei Zahlung Betriebsausgabe – Verderb oder Diebstahl führen nicht zu einem zweiten Abzug.\n• Entnahmen werden als fiktive Betriebseinnahmen erfasst (Bewertung § 6 Abs. 1 Nr. 4 EStG); Geldentnahmen bleiben ohne Korrektur, weil das Geld schon bei Zufluss erfasst wurde.",
    ["EStG 4 3", "EStG 4 4", "EStG 11"],
    M(["Ein Freiberufler ohne Buchführungspflicht darf seinen Gewinn nach § 4 Abs. 3 EStG ermitteln.", "Für abnutzbares Anlagevermögen ist auch bei § 4 Abs. 3 EStG die AfA anzusetzen.", "Die Anschaffungskosten für Grund und Boden sind erst bei Veräußerung oder Entnahme Betriebsausgabe.", "Darlehenstilgungen sind keine Betriebsausgaben."],
      ["Bei § 4 Abs. 3 EStG ist der Kaufpreis eines Pkw im Jahr der Zahlung voll Betriebsausgabe.", "Die Auszahlung eines Darlehens ist eine Betriebseinnahme.", "Werden bezahlte Waren gestohlen, ist ihr Wert ein zweites Mal als Betriebsausgabe abziehbar.", "Eine Geldentnahme vom Praxiskonto ist als fiktive Betriebseinnahme zu erfassen."],
      "Welche Aussagen zur Gewinnermittlung nach § 4 Abs. 3 EStG sind richtig?")),
  A("est-pkw-privat", "est-gewinn",
    "Ein Arzt nutzt seinen betrieblichen Pkw auch privat und für die Fahrten zwischen Wohnung und Praxis. Wie sind diese Nutzungen bei der Gewinnermittlung zu erfassen?",
    "• Betriebliche Nutzung über 50 % (Fahrten Wohnung–Praxis zählen dazu) → notwendiges Betriebsvermögen (R 4.2 Abs. 1 S. 4 EStR): AfA und laufende Kosten sind Betriebsausgaben.\n• Die Privatnutzung ist eine Nutzungsentnahme (§ 4 Abs. 1 S. 2 EStG) → fiktive Betriebseinnahme.\n• Bewertung nach der 1 %-Regelung: je Kalendermonat 1 % des inländischen Listenpreises im Zeitpunkt der Erstzulassung zzgl. Sonderausstattung einschließlich USt (§ 6 Abs. 1 Nr. 4 S. 2 EStG) – abgerundet auf volle 100 € (vgl. BMF vom 18.11.2009, Rz. 10). Kaufpreis, Rabatt oder Gebrauchtwagenpreis spielen keine Rolle.\n• Alternativ die tatsächlichen Kosten der Privatfahrten, wenn ein ordnungsgemäßes Fahrtenbuch geführt wird (§ 6 Abs. 1 Nr. 4 S. 3 EStG); es muss das ganze Jahr fortlaufend geführt werden, die Methode gilt einheitlich für das Jahr (vgl. BMF vom 18.11.2009, Rz. 8, 21, 24).\n• Wege Wohnung–Betrieb: nicht abziehbare Betriebsausgaben in Höhe des positiven Unterschieds zwischen 0,03 % des Listenpreises je Kalendermonat und Entfernungskilometer und der Entfernungspauschale (§ 4 Abs. 5 S. 1 Nr. 6 S. 3 EStG) → Gewinn erhöhen.\n• Kostendeckelung: 1 %-Wert und 0,03 %-Betrag zusammen höchstens die Gesamtkosten des Kfz (vgl. BMF vom 18.11.2009, Rz. 18–20).",
    ["EStG 6 1", "EStG 4 5", "EStG 4 1"],
    M(["Die Privatnutzung des betrieblichen Pkw ist als Nutzungsentnahme zu erfassen.", "Bemessungsgrundlage der 1 %-Regelung ist der Bruttolistenpreis bei Erstzulassung einschließlich Sonderausstattung.", "Bei einem Gebrauchtwagen ist ebenfalls der Listenpreis bei Erstzulassung maßgeblich.", "Für die Wege zwischen Wohnung und Betrieb ergeben sich nicht abziehbare Betriebsausgaben nach der 0,03 %-Methode."],
      ["Bemessungsgrundlage der 1 %-Regelung ist der tatsächlich gezahlte Kaufpreis.", "Ein Fahrtenbuch, das nur ein halbes Jahr geführt wird, genügt.", "Die 1 %-Regelung gilt auch für einen Pkw, der nur zu 30 % betrieblich genutzt wird.", "Die Fahrten zwischen Wohnung und Betrieb sind Privatfahrten und zählen nicht zur betrieblichen Nutzung."],
      "Welche Aussagen zur privaten Nutzung eines betrieblichen Pkw sind richtig?")),
];

const KORREKTUR_OPT = ["Gewinn erhöhen", "Gewinn mindern", "Keine Korrektur"];
const SV_Z = "Zahnärztin Zoe ermittelt ihren Gewinn 2026 zulässigerweise nach § 4 Abs. 3 EStG. Sie erzielt nur steuerfreie Umsätze und hat keinen Vorsteuerabzug.";
const korrekturFall = F("est-euer-korrektur", "est-gewinn", "Wie ist der vorläufige Gewinn 2026 zu korrigieren?", KORREKTUR_OPT, [
  { text: `${SV_Z} Für ein unbebautes Grundstück, auf dem sie ihre neue Praxis bauen will, hat sie 90.000 € gezahlt und als Betriebsausgabe abgezogen.`, richtig: 0, erkl: "Grund und Boden ist nicht abnutzbares Anlagevermögen – die Anschaffungskosten sind erst bei Veräußerung oder Entnahme Betriebsausgabe (§ 4 Abs. 3 S. 4 EStG) → + 90.000 €.", normen: ["EStG 4 3"] },
  { text: `${SV_Z} Für ein betriebliches Darlehen hat sie 2026 Tilgungen von 6.000 € gezahlt und als Betriebsausgaben abgezogen.`, richtig: 0, erkl: "Die Tilgung ist Rückzahlung von Kapital und keine Betriebsausgabe (vgl. H 4.5 (2) „Darlehen“ EStH) → + 6.000 €.", normen: ["EStG 4 4"] },
  { text: `${SV_Z} Die Zinsen für ihr Praxisdarlehen (2.400 €) hat sie bezahlt, aber noch nicht erfasst.`, richtig: 1, erkl: "Zinsen für ein betrieblich verwendetes Darlehen sind Betriebsausgaben (§ 4 Abs. 4 EStG), abgezogen im Jahr der Zahlung (§ 11 Abs. 2 S. 1 EStG) → − 2.400 €.", normen: ["EStG 4 4", "EStG 11"] },
  { text: `${SV_Z} Prophylaxeartikel, die sie im November bezahlt und als Betriebsausgabe erfasst hat, wurden im Dezember gestohlen. Den Verlust von 700 € hat sie zusätzlich als Betriebsausgabe abgezogen.`, richtig: 0, erkl: "Umlaufvermögen war schon bei Zahlung Betriebsausgabe (§ 4 Abs. 4, § 11 Abs. 2 S. 1 EStG) – ein zweiter Abzug scheidet aus → + 700 €.", normen: ["EStG 4 4", "EStG 11"] },
  { text: `${SV_Z} Ihre Einkommensteuer-Vorauszahlungen von 20.000 € hat sie vom Praxiskonto gezahlt und als Betriebsausgaben erfasst.`, richtig: 0, erkl: "Steuern vom Einkommen sind nicht abziehbar (§ 12 Nr. 3 EStG); sie werden auf die ESt angerechnet (§ 36 Abs. 2 Nr. 1 EStG) → + 20.000 €.", normen: ["EStG 12", "EStG 36 2"] },
  { text: `${SV_Z} Ihre Einkommensteuer-Vorauszahlungen von 20.000 € hat sie vom Privatkonto gezahlt; in der Gewinnermittlung sind sie nicht erfasst.`, richtig: 2, erkl: "Die Vorauszahlungen sind keine Betriebsausgaben (§ 12 Nr. 3 EStG) und richtigerweise nicht erfasst → keine Korrektur.", normen: ["EStG 12"] },
  { text: `${SV_Z} Sie hat 1.500 € vom Praxiskonto für ihren privaten Urlaub abgehoben. Erfasst ist nichts.`, richtig: 2, erkl: "Eine Geldentnahme (§ 4 Abs. 1 S. 2 EStG) wird nicht als Betriebseinnahme erfasst – das Geld war schon bei Zufluss Betriebseinnahme → keine Korrektur.", normen: ["EStG 4 1"] },
  { text: `${SV_Z} Den Kaufpreis eines am 01.07.2026 gelieferten Behandlungsstuhls (Nutzungsdauer 10 Jahre, 23.800 €) hat sie voll als Betriebsausgabe abgezogen.`, richtig: 0, erkl: "Abnutzbares Anlagevermögen: nur AfA (§ 4 Abs. 3 S. 3, § 7 Abs. 1 EStG), zeitanteilig ab Lieferung: 23.800 € / 10 × 6/12 = 1.190 € → + 23.800 € − 1.190 € = + 22.610 €.", normen: ["EStG 4 3", "EStG 7 1"] },
  { text: `${SV_Z} Den Abschlag der Kassenzahnärztlichen Vereinigung für Dezember 2026 (25.000 €), fällig und gutgeschrieben am 08.01.2027, hat sie nicht erfasst.`, richtig: 0, erkl: "Regelmäßig wiederkehrende Einnahme, die kurze Zeit (bis 10 Tage) nach Jahresende zufließt und fällig ist → gilt im Jahr der wirtschaftlichen Zugehörigkeit als bezogen (§ 11 Abs. 1 S. 2 EStG; vgl. H 11 „Arzthonorar“ EStH) → + 25.000 €.", normen: ["EStG 11"] },
  { text: `${SV_Z} Die privatärztliche Verrechnungsstelle hat am 21.12.2026 Honorare von 2.800 € für sie vereinnahmt und am 14.01.2027 ausgezahlt. Erfasst ist nichts.`, richtig: 0, erkl: "Die Verrechnungsstelle vereinnahmt als Bevollmächtigte – der Zufluss erfolgt schon bei ihr (vgl. R 11 S. 2 EStR) → Betriebseinnahme 2026 → + 2.800 €.", normen: ["EStG 11"] },
  { text: `${SV_Z} Im Dezember 2026 hat sie die Miete für ein Lager für sechs Jahre im Voraus gezahlt (36.000 €, Mietbeginn 01.12.2026) und voll abgezogen.`, richtig: 0, erkl: "Vorauszahlung für eine Nutzungsüberlassung von mehr als fünf Jahren → gleichmäßig verteilen (§ 11 Abs. 2 S. 3 EStG): 2026 nur 36.000 € / 72 = 500 € → + 35.500 €.", normen: ["EStG 11"] },
  { text: `${SV_Z} Einen voll abgeschriebenen Praxis-Laptop (Restbuchwert 0 €, Teilwert 250 €) hat sie ihrem Neffen geschenkt. Erfasst ist nichts.`, richtig: 0, erkl: "Sachentnahme für betriebsfremde Zwecke (§ 4 Abs. 1 S. 2 EStG), bewertet mit dem Teilwert (§ 6 Abs. 1 Nr. 4 S. 1 EStG) → fiktive Betriebseinnahme + 250 € (Restbuchwert 0 €).", normen: ["EStG 4 1", "EStG 6 1"] },
  { text: `${SV_Z} Sie wohnt in der Wohnung über ihrer Praxis und nutzt ihren betrieblichen Pkw für Hausbesuche und privat.`, richtig: 2, erkl: "Ohne Wege zwischen Wohnung und Betriebsstätte fallen keine nicht abziehbaren Betriebsausgaben nach § 4 Abs. 5 S. 1 Nr. 6 EStG an → insoweit keine Korrektur (die Privatnutzung ist gesondert zu erfassen).", normen: ["EStG 4 5"] },
  { text: `${SV_Z} Ihr betrieblicher Pkw (Bruttolistenpreis bei Erstzulassung 48.000 €, kein Fahrtenbuch, betriebliche Nutzung 75 %) wird auch privat genutzt. Erfasst ist dafür nichts.`, richtig: 0, erkl: "Nutzungsentnahme (§ 4 Abs. 1 S. 2 EStG), 1 %-Regelung (§ 6 Abs. 1 Nr. 4 S. 2 EStG): 48.000 € × 1 % × 12 = 5.760 € fiktive Betriebseinnahme → + 5.760 €.", normen: ["EStG 6 1"] },
]);

const pkwEinProzent = R("est-pkw-1prozent", "est-gewinn", (r) => {
  const lp = r.zahl(280, 700) * 100, sa = r.zahl(0, 90) * 50, ab = r.wahl([1, 1, r.zahl(2, 10)]), mon = 13 - ab;
  const brutto = (lp + sa) * 1.19, blp = Math.floor((lp + sa) * 119 / 10000) * 100, entn = blp / 100 * mon;
  const gebraucht = r.zahl(0, 1) === 1, kauf = gebraucht ? Math.round(blp * r.zahl(45, 70) / 100 / 10) * 10 : Math.round(brutto * (100 - r.zahl(5, 15)) / 100 / 10) * 10;
  const MONAT = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  return {
    text: `Tierarzt Lars ermittelt seinen Gewinn nach § 4 Abs. 3 EStG. Am 01.${String(ab).padStart(2, "0")}.2026 erwirbt er einen ${gebraucht ? "gebrauchten " : ""}Pkw für ${eur(kauf)}${gebraucht ? "" : " (nach Rabatt)"}, den er zu 70 % betrieblich und im Übrigen privat nutzt. Ein Fahrtenbuch führt er nicht. Laut Hersteller betrug der inländische Listenpreis bei Erstzulassung ${eur(lp)} zzgl. USt${sa ? `; werkseitige Sonderausstattung: ${eur(sa)} zzgl. USt` : ", Sonderausstattung hat der Wagen nicht"}.

Mit welchem Betrag ist die private Nutzung 2026 als Betriebseinnahme zu erfassen (in €)?`,
    euro: entn,
    erklaerung: `Betriebliche Nutzung über 50 % → notwendiges Betriebsvermögen; Privatnutzung = Nutzungsentnahme (§ 4 Abs. 1 S. 2 EStG), ohne Fahrtenbuch nach der 1 %-Regelung (§ 6 Abs. 1 Nr. 4 S. 2 EStG).
• ${sa ? `Listenpreis + Sonderausstattung: ${eur(lp)} + ${eur(sa)} = ${eur(lp + sa)}` : `Listenpreis ${eur(lp)}`}, zzgl. 19 % USt = ${eur(brutto)}
• abgerundet auf volle 100 € (vgl. BMF vom 18.11.2009, Rz. 10): ${eur(blp)}
• Der ${gebraucht ? "Gebrauchtwagenpreis" : "rabattierte Kaufpreis"} (${eur(kauf)}) ist ohne Bedeutung.
• ${eur(blp)} × 1 % × ${mon} Monate${mon < 12 ? ` (${MONAT[ab]} bis Dezember)` : ""} = ${eur(entn)}`,
    normen: ["EStG 6 1", "EStG 4 1"],
  };
});

const pkwWohnung = R("est-pkw-wohnung", "est-gewinn", (r) => {
  const blp = r.zahl(300, 800) * 100, km = r.zahl(6, 35), tage = r.zahl(180, 230);
  const pausch = blp * 0.0003 * km * 12, ep = tage * km * EP, nab = pausch - ep;
  return {
    text: `Rechtsanwältin Ida ermittelt ihren Gewinn nach § 4 Abs. 3 EStG. Ihren betrieblichen Pkw (Bruttolistenpreis bei Erstzulassung abgerundet ${eur(blp)}; die private Nutzung wird nach der 1 %-Regelung erfasst) nutzt sie 2026 an ${tage} Tagen für die Fahrt zur ${km} km entfernten Kanzlei. Die gesamten Kfz-Kosten sind als Betriebsausgaben gebucht.

Um welchen Betrag ist der Gewinn wegen der Fahrten zwischen Wohnung und Betriebsstätte zu erhöhen (in €)?`,
    euro: nab,
    erklaerung: `Aufwendungen für Wege zwischen Wohnung und Betriebsstätte dürfen den Gewinn nur in Höhe der Entfernungspauschale mindern (§ 4 Abs. 5 S. 1 Nr. 6 S. 1, 2 EStG). Nicht abziehbar ist der positive Unterschied (S. 3):
• 0,03 % × ${eur(blp)} × ${km} km × 12 Monate = ${eur(pausch)}
• − Entfernungspauschale: ${tage} Tage × ${km} km × 0,38 € = ${eur(ep)}
= nicht abziehbare Betriebsausgaben ${eur(nab)} → Gewinn + ${eur(nab)}`,
    normen: ["EStG 4 5", "EStG 9 1"],
  };
});

// ======================================================================= Klausurfälle
const fall1 = (() => {
  const epP = 210 * 23 * EP, laptop = 1428, gewP = 360, wkP = Math.ceil(epP + laptop + gewP), eP = 52000 - wkP;
  const epR = 200 * 9 * EP, ticket = 12 * 63, hoR = 20 * HO_TAG, buchR = 180, sumR = Math.max(epR, ticket) + hoR + buchR;
  const eR = 46000 - AN_PB, sde = eP + eR, sa = 9800, zv = sde - sa, st = splitting(zv), lst = 7100 + 5900, erg = st - lst;
  return A("est-fall-ehepaar", "est-tarif",
    `Paul (P) und Rana (R) sind seit 2019 verheiratet und wohnen gemeinsam in Hamburg. Für 2026 geben sie eine gemeinsame Erklärung ab, ohne die Veranlagungsart anzukreuzen. Kinder haben sie nicht.\n\nP ist Angestellter einer Versicherung: Bruttoarbeitslohn 52.000 €, Lohnsteuer 7.100 €, Arbeitgeberanteil Sozialversicherung 10.400 €. Er fährt an 210 Tagen mit dem eigenen PKW zur 23,6 km entfernten ersten Tätigkeitsstätte, zahlt 360 € Gewerkschaftsbeiträge und kauft am 14.03.2026 ein Notebook (ausschließlich beruflich) für 1.428 € inkl. USt (Lieferung am selben Tag).\n\nR ist Beamtin: Bezüge 46.000 €, Lohnsteuer 5.900 €. Sie fährt an 200 Tagen mit dem Bus zur Dienststelle (kürzeste Straßenverbindung 9,8 km; Deutschlandticket 63 € im Monat). An 20 weiteren Tagen arbeitet sie ausschließlich zu Hause an ihrem Esstisch. Für Fachbücher zahlt sie 180 €. Nebenberuflich ist sie 4 Stunden pro Woche Übungsleiterin in einem gemeinnützigen Sportverein (Einnahmen 2.400 €, Ausgaben 300 €).\n\nAbziehbare Sonderausgaben: 9.800 €.\n\nAufgabe: Ermitteln Sie das zu versteuernde Einkommen, die tarifliche Einkommensteuer und die Abschlusszahlung bzw. Erstattung für 2026. Gehen Sie vorab auf Steuerpflicht, Veranlagungsart und Tarif ein.`,
    `Steuerpflicht: P und R sind natürliche Personen mit Wohnsitz (§ 8 AO) im Inland → unbeschränkt steuerpflichtig (§ 1 Abs. 1 S. 1 EStG), Welteinkommen (§ 2 Abs. 1). ESt = Jahressteuer (§ 2 Abs. 7), VZ = Kalenderjahr (§ 25 Abs. 1).\nVeranlagung: Ehegatten, beide unbeschränkt steuerpflichtig, nicht dauernd getrennt (§ 26 Abs. 1 S. 1 Nr. 1–3) → Wahlrecht; keine Wahl → Zusammenveranlagung von Amts wegen (§ 26 Abs. 3, § 26b). Tarif: Splitting (§ 32a Abs. 5).\n\nP – nichtselbständige Arbeit (§ 2 Abs. 1 Nr. 4, § 19 Abs. 1 Nr. 1); Einkünfte = Einnahmen − WK (§ 2 Abs. 2 Nr. 2).\n• Einnahmen 52.000 €; AG-Anteil SV steuerfrei (§ 3 Nr. 62); LSt nicht abziehbar (§ 12 Nr. 3).\n• Entfernungspauschale: 210 × 23 km × 0,38 € = ${eur(epP)}\n• Notebook: Arbeitsmittel; Nutzungsdauer 1 Jahr nach BMF vom 22.02.2022 (günstigste Variante) → voll ${eur(laptop)} im Jahr der Lieferung (alternativ AfA 1.428 € / 3 × 10/12)\n• Gewerkschaftsbeiträge (§ 9 Abs. 1 S. 3 Nr. 3): ${eur(gewP)}\n• WK ${eur(wkP)} (aufgerundet) > 1.230 € → tatsächliche WK\n• Einkünfte P: ${eur(eP)}\n\nR – nichtselbständige Arbeit (§ 19 Abs. 1 Nr. 1).\n• Einnahmen 46.000 €.\n• Entfernungspauschale: 200 × 9 km × 0,38 € = ${eur(epR)}; tatsächliche Ticketkosten 756 € sind höher → ${eur(Math.max(epR, ticket))} (§ 9 Abs. 2 S. 2)\n• Home-Office-Pauschale: 20 Tage × 6 € = ${eur(hoR)} (§ 4 Abs. 5 Nr. 6c, § 9 Abs. 5)\n• Fachbücher: ${eur(buchR)}\n• Summe ${eur(sumR)} < 1.230 € → Arbeitnehmer-Pauschbetrag (§ 9a S. 1 Nr. 1 a)\n• Einkünfte R: ${eur(eR)}\n• Übungsleiterin: selbständige Arbeit (§ 18 Abs. 1 Nr. 1), Einnahmen 2.400 € ≤ 3.300 € steuerfrei (§ 3 Nr. 26); Ausgaben übersteigen die steuerfreien Einnahmen nicht → nicht abziehbar → keine Einkünfte.\n\nSumme der Einkünfte = Gesamtbetrag der Einkünfte: ${eur(sde)}\n− Sonderausgaben 9.800 € = Einkommen = zvE (§ 2 Abs. 3–5): ${eur(zv)}\nTarifliche ESt (Splitting): 2 × ESt(${eur(Math.floor(zv / 2))}) = ${eur(st)} = festzusetzende ESt (§ 2 Abs. 6)\n− Lohnsteuer (§ 36 Abs. 2 Nr. 2): ${eur(lst)}\n= ${erg < 0 ? `Erstattung ${eur(-erg)}` : `Abschlusszahlung ${eur(erg)}`} (§ 36 Abs. 4)`,
    ["EStG 1 1", "EStG 26 3", "EStG 32a 5", "EStG 9 1", "EStG 9a", "EStG 3", "EStG 36 2"],
    M([`Die Eheleute sind von Amts wegen zusammen zu veranlagen (§ 26 Abs. 3 EStG).`, `Bei R ist der Arbeitnehmer-Pauschbetrag anzusetzen, weil ihre Werbungskosten darunter liegen.`, `Die Übungsleitereinnahmen von R sind in voller Höhe steuerfrei.`, `Das zu versteuernde Einkommen beträgt ${eur(zv)}.`],
      [`Ohne Wahl der Veranlagungsart wird jeder Ehegatte einzeln veranlagt.`, `Die Entfernungspauschale von P ist auf 4.500 € begrenzt.`, `Die Lohnsteuer mindert als Werbungskosten die Einkünfte.`, `Die Übungsleitereinnahmen sind mit 2.400 € steuerpflichtig.`],
      "Gesamtfall Paul und Rana (2026): Welche Aussagen treffen zu?"),
    { fall: true });
})();

const fall2 = (() => {
  const vor = 61500, a = 2000, b = 3400, c = 21600 - 21600 / 72 * 3, d = 8000, e = 600 + (420 + 980) * 2 / 7, f = 1500;
  const gewinn = vor + a + b + c + d - e + f, sa = 7200, zv = gewinn - sa, st = grundtarif(zv), erg = st - 8000;
  return A("est-fall-physio", "est-zufluss",
    `Die ledige Physiotherapeutin Lena Krüger betreibt in Kiel eine eigene Praxis und ermittelt ihren Gewinn zulässigerweise nach § 4 Abs. 3 EStG. Ihr vorläufiger Gewinn 2026 beträgt 61.500 €. Folgende Vorgänge sind noch zu beurteilen:\n1. Die Praxismiete für Januar 2027 (2.000 €, fällig am 03.01.2027) hat sie am 29.12.2026 überwiesen und als Betriebsausgabe 2026 erfasst.\n2. Ihre Abrechnungsstelle hat am 18.12.2026 Honorare von 3.400 € für sie vereinnahmt und am 07.01.2027 an sie überwiesen. Erfasst ist bisher nichts.\n3. Am 01.10.2026 hat sie die Miete für einen Lagerraum für sechs Jahre im Voraus gezahlt (21.600 €) und voll als Betriebsausgabe 2026 erfasst.\n4. Ihre ESt-Vorauszahlungen 2026 von 8.000 € hat sie als Betriebsausgaben erfasst.\n5. Sie besuchte einen zweitägigen Fachkongress (Gebühr 600 €) und blieb insgesamt sieben Tage zum Wandern am Kongressort (Flug 420 €, Hotel 980 €). Bisher ist nichts erfasst.\n6. Eine Geldstrafe aus einem Strafverfahren (1.500 €) hat sie als Betriebsausgabe erfasst.\nAbziehbare Sonderausgaben: 7.200 €.\n\nAufgabe: Ermitteln Sie den Gewinn, das zu versteuernde Einkommen und die Abschlusszahlung für 2026.`,
    `Einkunftsart: Krankengymnastin/Physiotherapeutin → Katalogberuf, selbständige Arbeit (§ 2 Abs. 1 Nr. 3, § 18 Abs. 1 Nr. 1 EStG); Gewinn nach § 4 Abs. 3 EStG; Zu- und Abflussprinzip (§ 11 EStG).\n\nVorläufiger Gewinn: 61.500 €\n1. Januarmiete: regelmäßig wiederkehrend, Zahlung (29.12.) und Fälligkeit (03.01.) innerhalb der kurzen Zeit → BA 2027 (§ 11 Abs. 2 S. 2) → + ${eur(a)}\n2. Honorare: Zufluss mit Eingang beim Bevollmächtigten (R 11 S. 1, 2 EStR) → BE 2026 → + ${eur(b)}\n3. Vorauszahlung für mehr als fünf Jahre → zwingend verteilen (§ 11 Abs. 2 S. 3): BA 2026 = 21.600 € / 72 × 3 = 900 € → + ${eur(c)}\n4. ESt-Vorauszahlungen: nicht abziehbar (§ 12 Nr. 3), Anrechnung nach § 36 Abs. 2 Nr. 1 → + ${eur(d)}\n5. Kongressgebühr voll BA; Flug und Hotel gemischt, nach Tagen aufteilen: (420 € + 980 €) × 2/7 = 400 € → BA ${eur(e)} → − ${eur(e)}\n6. Geldstrafe: nicht abziehbar (§ 12 Nr. 4) → + ${eur(f)}\nGewinn = Summe der Einkünfte = Gesamtbetrag der Einkünfte: ${eur(gewinn)}\n− Sonderausgaben 7.200 € = Einkommen = zvE: ${eur(zv)}\nTarifliche ESt (Grundtarif, § 32a Abs. 1 Nr. 4: 0,42 × x − 11.135,63): ${eur(st)}\n− Vorauszahlungen (§ 36 Abs. 2 Nr. 1): 8.000 €\n= Abschlusszahlung: ${eur(erg)} (fällig einen Monat nach Bekanntgabe, § 36 Abs. 4 S. 1)`,
    ["EStG 11", "EStG 12", "EStG 4 4", "EStG 32a 1", "EStG 36 2"],
    M(["Die am 29.12.2026 gezahlte Januarmiete ist Betriebsausgabe 2027.", "Die von der Abrechnungsstelle im Dezember vereinnahmten Honorare sind Betriebseinnahmen 2026.", "Von der Lagerraummiete sind 2026 nur 900 € abziehbar.", `Der Gewinn 2026 beträgt ${eur(gewinn)}.`],
      ["Die ESt-Vorauszahlungen sind Betriebsausgaben.", "Die Geldstrafe ist als Betriebsausgabe abziehbar.", "Die Lagerraummiete ist 2026 in voller Höhe abziehbar.", "Die Honorare der Abrechnungsstelle fließen erst 2027 zu."],
      "Fall Physiotherapeutin Lena Krüger (2026): Welche Aussagen treffen zu?"),
    { fall: true });
})();

const fall3 = (() => {
  const vor = 168000, kzv = 28000, pvs = 3200, grund = 95000, zins = 1200, kauf = 30940, afa = kauf / 4, blp = 55000, eins = blp / 100 * 12;
  const w = blp * 0.0003 * 12 * 12, ep = 200 * 12 * EP, nab = w - ep, dieb = 900, vz = 24000, laptop = 250, kosten = afa + 4300;
  const gewinn = vor + kzv + pvs + grund - zins + kauf - afa + eins + nab + dieb + vz + laptop, sa = 9000, zv = gewinn - sa, st = grundtarif(zv), erg = st - vz;
  return A("est-fall-zahnaerztin", "est-gewinn",
    `Die ledige Zahnärztin Dr. Mira Albers betreibt in Lübeck eine eigene Praxis. Sie erzielt ausschließlich steuerfreie Umsätze (kein Vorsteuerabzug) und ermittelt ihren Gewinn nach § 4 Abs. 3 EStG. Ihr vorläufiger Gewinn 2026 beträgt 168.000 €. Noch zu beurteilen sind:\n1. Den Abschlag der Kassenzahnärztlichen Vereinigung für Dezember 2026 (28.000 €), fällig und gutgeschrieben am 08.01.2027, hat sie nicht erfasst.\n2. Die privatärztliche Verrechnungsstelle hat am 20.12.2026 Honorare von 3.200 € für sie vereinnahmt und am 12.01.2027 ausgezahlt. Erfasst ist nichts.\n3. Am 01.09.2026 hat sie ein unbebautes Grundstück für 95.000 € erworben, auf dem 2027 ihre neue Praxis entstehen soll. Den Kaufpreis hat sie als Betriebsausgabe abgezogen.\n4. Den Kauf finanzierte sie teilweise mit einem Bankdarlehen über 60.000 € (Auszahlung 01.09.2026). 2026 zahlte sie Tilgung von 2.000 € und Zinsen von 1.200 €; erfasst ist bisher nichts.\n5. Am 02.01.2026 wurde ihr ein gebrauchter Pkw geliefert (Kaufpreis 30.940 € inkl. USt, Restnutzungsdauer 4 Jahre); den Kaufpreis hat sie als Betriebsausgabe abgezogen. Inländischer Listenpreis bei Erstzulassung: 41.900 € zzgl. USt, werkseitige Sonderausstattung 4.320 € zzgl. USt. Fahrleistung 2026: 8.200 km betrieblich, 4.800 km zwischen Wohnung und Praxis (200 Tage, Entfernung 12 km), 3.000 km privat. Aufzeichnungen über die Fahrten führte sie nur von März bis August. Die laufenden Kfz-Kosten (4.300 €) sind zutreffend als Betriebsausgaben erfasst; für die Nutzung des Pkw ist sonst nichts erfasst.\n6. Prophylaxeartikel, die sie im November für 900 € gekauft, bezahlt und als Betriebsausgabe erfasst hat, wurden im Dezember gestohlen. Den Verlust hat sie nochmals als Betriebsausgabe abgezogen.\n7. Ihre ESt-Vorauszahlungen 2026 (24.000 €) zahlte sie vom Praxiskonto und erfasste sie als Betriebsausgaben.\n8. Für ihren Urlaub hob sie 2.500 € vom Praxiskonto ab. Erfasst ist nichts.\n9. Einen voll abgeschriebenen Praxis-Laptop (Teilwert 250 €) schenkte sie im Dezember ihrem Neffen. Erfasst ist nichts.\nAbziehbare Sonderausgaben: 9.000 €.\n\nAufgabe: Ermitteln Sie den Gewinn 2026, das zu versteuernde Einkommen und die Abschlusszahlung.`,
    `Zahnärztin → Katalogberuf, Einkünfte aus selbständiger Arbeit (§ 2 Abs. 1 Nr. 3, § 18 Abs. 1 Nr. 1 EStG); Gewinn (§ 2 Abs. 2 S. 1 Nr. 1) zulässig nach § 4 Abs. 3 EStG, da keine Buchführungspflicht (§§ 140, 141 AO, § 238 HGB); Zu- und Abflussprinzip (§ 11 EStG).\n\nVorläufiger Gewinn: ${eur(vor)}\n1. KZV-Abschlag: regelmäßig wiederkehrend, Zufluss und Fälligkeit innerhalb kurzer Zeit nach Jahresende → BE 2026 (§ 11 Abs. 1 S. 2; vgl. H 11 „Arzthonorar“ EStH) → + ${eur(kzv)}\n2. Verrechnungsstelle: Zufluss mit Vereinnahmung durch die Bevollmächtigte (vgl. R 11 S. 2 EStR) → BE 2026 → + ${eur(pvs)}\n3. Grundstück: notwendiges BV, nicht abnutzbares Anlagevermögen → AK erst bei Veräußerung oder Entnahme BA (§ 4 Abs. 3 S. 4) → + ${eur(grund)}\n4. Darlehen: Auszahlung keine BE, Tilgung keine BA; Zinsen BA (§ 4 Abs. 4) → − ${eur(zins)}\n5. Pkw: betriebliche Nutzung (8.200 + 4.800) / 16.000 km = 81,25 % → notwendiges BV.\n   • Kaufpreis keine BA, sondern AfA (§ 4 Abs. 3 S. 3, § 7 Abs. 1): AK inkl. USt, da kein Vorsteuerabzug (§ 9b Abs. 1 i. U.); Lieferung im Januar (§ 9a EStDV) → 30.940 € / 4 = ${eur(afa)} → + ${eur(kauf)} − ${eur(afa)}\n   • Privatnutzung = Nutzungsentnahme (§ 4 Abs. 1 S. 2); Aufzeichnungen nur für ein halbes Jahr sind kein ordnungsgemäßes Fahrtenbuch (vgl. BMF vom 18.11.2009, Rz. 21, 24) → 1 %-Regelung (§ 6 Abs. 1 Nr. 4 S. 2): (41.900 € + 4.320 €) × 1,19 = 55.001,80 € → abgerundet ${eur(blp)}; × 1 % × 12 = ${eur(eins)} → + ${eur(eins)}\n   • Wege Wohnung–Praxis (§ 4 Abs. 5 S. 1 Nr. 6 S. 3): 0,03 % × ${eur(blp)} × 12 km × 12 = ${eur(w)} − Entfernungspauschale 200 × 12 km × 0,38 € = ${eur(ep)} → nicht abziehbar ${eur(nab)} → + ${eur(nab)}\n   • Kostendeckelung: ${eur(eins)} + ${eur(w)} = ${eur(eins + w)} übersteigen die Gesamtkosten (${eur(afa)} + 4.300 € = ${eur(kosten)}) nicht (vgl. BMF vom 18.11.2009, Rz. 18–20).\n6. Diebstahl: Umlaufvermögen war bei Zahlung bereits BA – kein zweiter Abzug → + ${eur(dieb)}\n7. ESt-Vorauszahlungen: nicht abziehbar (§ 12 Nr. 3) → + ${eur(vz)}\n8. Geldentnahme: keine Korrektur – das Geld war bei Zufluss bereits BE.\n9. Laptop: Sachentnahme (§ 4 Abs. 1 S. 2) mit dem Teilwert (§ 6 Abs. 1 Nr. 4 S. 1), Restbuchwert 0 € → + ${eur(laptop)}\n\nGewinn = Summe der Einkünfte = Gesamtbetrag der Einkünfte: ${eur(gewinn)}\n− Sonderausgaben 9.000 € = Einkommen = zvE (§ 2 Abs. 3–5): ${eur(zv)}\nTarifliche ESt (Grundtarif, § 32a Abs. 1 Nr. 5: 0,45 × x − 19.470,38): ${eur(st)} = festzusetzende ESt (§ 2 Abs. 6)\n− Vorauszahlungen (§ 36 Abs. 2 Nr. 1): ${eur(vz)}\n= Abschlusszahlung ${eur(erg)} (§ 36 Abs. 4 S. 1)`,
    ["EStG 4 3", "EStG 11", "EStG 6 1", "EStG 4 5", "EStG 12", "EStG 32a 1", "EStG 36 2"],
    M(["Der Kaufpreis des Grundstücks ist 2026 keine Betriebsausgabe.", "Die private Pkw-Nutzung ist nach der 1 %-Regelung mit 6.600 € zu erfassen.", "Für die Wege zwischen Wohnung und Praxis ergeben sich nicht abziehbare Betriebsausgaben von 1.464 €.", `Der Gewinn 2026 beträgt ${eur(gewinn)}.`],
      ["Die Aufzeichnungen von März bis August genügen als Fahrtenbuch.", "Bemessungsgrundlage der 1 %-Regelung ist der Kaufpreis von 30.940 €.", "Die Tilgung des Darlehens ist Betriebsausgabe.", "Die Geldentnahme für den Urlaub erhöht den Gewinn um 2.500 €."],
      "Fall Zahnärztin Dr. Mira Albers (2026): Welche Aussagen treffen zu?"),
    { fall: true });
})();

export const EST_AUFGABEN = [
  ...grundlagen, ...stpfl, stpflFall, ...einkuenfte, einkunftsartFall, arbeitnehmer, arbeitnehmerFall, einkuenfteRechnen, ...zve, zveRechnen,
  ...veranlagung, veranlagungFall, ...tarif, tarifGrund, tarifSplit, abschluss, fall1,
  ...einnahmen, versorgung, versorgungRechnen, zuflussFall, uebungsleiterRechnen, ...ausgaben, aufwandFall, gemischtRechnen,
  ...zufluss, elfFall, lohnZufluss, lohnZuflussFall, vorauszahlungRechnen, fall2, ...wk, wkSumme,
  ...arbeitsmittel, arbeitsmittelFall, afaRechnen, gemischtAfa, ...homeoffice, homeofficeFall, homeofficeRechnen, arbeitszimmerRechnen,
  ...entfernung, epPkw, epOepnv, epGemischt, epJobticket, epWechsel, ...reisekosten, reiseFall, verpflegungRechnen, reiseRechnen, fortbildungRechnen,
  ...gewinn, korrekturFall, pkwEinProzent, pkwWohnung, fall3,
];

export const MC_EST = Object.fromEntries(EST_AUFGABEN.filter((v) => v.mc).map((v) => [v.id, v.mc]));
