// Klausurbeispiele Bewertungsrecht: eigener Sachverhalt im Klausurstil und knappe Lösung im Urteilsstil – jede Aussage mit
// tragender Norm, Beträge aus rechnen.js (keine Handrechnung). Format: { titel, sv, aufgabe, loesung: [Absätze] }. Rechtsstand 2026.
import { erbst, verschonung, ertragswert, vervielfaeltiger } from "./rechnen.js";

const eur = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: Number.isInteger(x) ? 0 : 2, maximumFractionDigits: 2 }) + " €";
const n4 = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: 4 });

const st1 = erbst(312000, 1), v = verschonung(3000000, 600000), vOpt = verschonung(3000000, 450000, { option: true });
const ew = ertragswert({ flaeche: 600, brw: 450, mieteWohnJahr: 86400, mieteGewerbeJahr: 0, wohnungen: 8, wohnQm: 640, gewerbeQm: 0, baujahr: 1972, jahr: 2026, gnd: 80, liz: 3.5, vpi: [123.0, 77.1] });

export const BEISPIELE_BEWR = {
  "bew-vorgaenge": [{
    titel: "Lebensversicherung und Pflichtteil",
    sv: "Witwer W stirbt am 03.02.2026. Alleinerbin ist seine Tochter T. Aus einer Lebensversicherung des W erhält seine Lebensgefährtin L als Bezugsberechtigte 120.000 €. Sein enterbter Sohn S verlangt im April 2026 seinen Pflichtteil.",
    aufgabe: "Welche steuerpflichtigen Erwerbe liegen vor?",
    loesung: [
      "T: Erwerb durch Erbanfall gem. § 3 Abs. 1 Nr. 1 ErbStG i. V. m. § 1922 BGB.",
      "L: Erwerb von Todes wegen gem. § 3 Abs. 1 Nr. 4 ErbStG, da sie den Anspruch aus dem von W geschlossenen Versicherungsvertrag bei dessen Tod unmittelbar erwirbt.",
      "S: Erwerb von Todes wegen gem. § 3 Abs. 1 Nr. 1 ErbStG, da er den Pflichtteil geltend gemacht hat; bei T ist die Pflichtteilsschuld abzugsfähig (§ 10 Abs. 5 Nr. 2 ErbStG).",
    ],
  }],
  "bew-pflicht": [{
    titel: "Der Ruhestand in Portugal",
    sv: "Der deutsche Staatsangehörige D zog am 01.10.2022 von Bremen nach Lissabon und gab seine Wohnung in Deutschland auf. Am 15.09.2026 schenkt er seiner in Lissabon lebenden portugiesischen Enkelin ein Depot bei einer Lissabonner Bank.",
    aufgabe: "Ist die Schenkung in Deutschland steuerpflichtig?",
    loesung: [
      "Die Enkelin ist keine Inländerin (kein Wohnsitz und gewöhnlicher Aufenthalt im Inland, § 2 Abs. 1 Nr. 1 S. 2 Buchst. a ErbStG).",
      "D gilt als Inländer gem. § 2 Abs. 1 Nr. 1 S. 2 Buchst. b ErbStG, da er als deutscher Staatsangehöriger bei Ausführung der Schenkung noch nicht länger als fünf Jahre im Ausland lebt.",
      "Unbeschränkte Steuerpflicht für den gesamten Erwerb gem. § 2 Abs. 1 Nr. 1 S. 1 ErbStG – auch für das ausländische Depot.",
    ],
  }],
  "bew-stichtag": [{
    titel: "Grundstücksschenkung im Advent",
    sv: "Mutter M schenkt ihrem Sohn eine Eigentumswohnung. Der notarielle Vertrag vom 18.12.2026 enthält Auflassung und Eintragungsbewilligung; Nutzen und Lasten gehen am 01.01.2027 über, eingetragen wird der Sohn am 10.03.2027.",
    aufgabe: "Wann entsteht die Schenkungsteuer, welcher Stichtag gilt für die Bewertung?",
    loesung: [
      "Die Steuer entsteht mit Ausführung der Zuwendung (§ 9 Abs. 1 Nr. 2 ErbStG); eine Grundstücksschenkung ist nach Verwaltungsauffassung ausgeführt, sobald Auflassung (§ 925 BGB) und Eintragungsbewilligung vorliegen – am 18.12.2026.",
      "Bewertungsstichtag ist ebenfalls der 18.12.2026 (§ 11 ErbStG); der spätere Übergang von Nutzen und Lasten und die Eintragung sind unerheblich.",
    ],
  }],
  "bew-erwerb": [{
    titel: "Nachlass mit Darlehen und Vermächtnis",
    sv: "Sohn S erbt allein: Bankguthaben 180.000 €, vermietetes Büro (Grundbesitzwert 420.000 €), Darlehen des Erblassers für das Büro 150.000 €. Er muss der Haushälterin ein Vermächtnis von 10.000 € zahlen; Bestattungskosten weist er nicht nach.",
    aufgabe: "Ermitteln Sie die Bereicherung.",
    loesung: [
      "Vermögensanfall 600.000 € (Nennwert § 12 Abs. 1 BewG, Grundbesitzwert § 12 Abs. 3 ErbStG).",
      "− Erblasserschuld 150.000 € (§ 10 Abs. 5 Nr. 1 ErbStG), voll abzugsfähig, da das Büro nicht befreit ist; − Vermächtnis 10.000 € (§ 10 Abs. 5 Nr. 2 ErbStG); − Pauschbetrag 15.000 € (§ 10 Abs. 5 Nr. 3 S. 2 ErbStG).",
      "Bereicherung 425.000 € (§ 10 Abs. 1 S. 1, 2 ErbStG).",
    ],
  }],
  "bew-klassen": [{
    titel: "Witwe und Enkel",
    sv: "Erblasser E (Hamburg) hinterlässt seiner Ehefrau Vermögen mit einer Bereicherung von 1.000.000 € und seinem Enkel (dessen Mutter lebt) ein Vermächtnis von 250.000 €. Versorgungsbezüge aus Anlass des Todes erhält die Witwe nicht.",
    aufgabe: "Bestimmen Sie Steuerklasse und Freibeträge.",
    loesung: [
      "Ehefrau: Steuerklasse I (§ 15 Abs. 1 ErbStG), Freibetrag 500.000 € (§ 16 Abs. 1 Nr. 1 ErbStG), besonderer Versorgungsfreibetrag 256.000 € (§ 17 Abs. 1 ErbStG), da sie von Todes wegen erwirbt.",
      "Enkel: Steuerklasse I (§ 15 Abs. 1 ErbStG, Abkömmling eines Kindes), Freibetrag 200.000 € (§ 16 Abs. 1 Nr. 3 ErbStG); kein Versorgungsfreibetrag (§ 17 Abs. 2 ErbStG nur für Kinder).",
    ],
  }],
  "bew-befreiungen": [{
    titel: "Möbel, Auto und Goldmünzen",
    sv: "Neffe N erbt von seiner Tante Hausrat im Wert von 9.000 €, ihren Pkw (8.000 €) und eine Goldmünzensammlung (25.000 €).",
    aufgabe: "Mit welchem Wert sind die Gegenstände anzusetzen?",
    loesung: [
      "Steuerklasse II (§ 15 Abs. 1 ErbStG): Hausrat und Pkw zusammen 17.000 € − Freibetrag 12.000 € = 5.000 € (§ 13 Abs. 1 Nr. 1 Buchst. c ErbStG).",
      "Goldmünzen voll 25.000 € – Münzen und Edelmetalle sind ausgenommen (§ 13 Abs. 1 Nr. 1 S. 2 ErbStG). Ansatz insgesamt 30.000 €.",
    ],
  }],
  "bew-familienheim": [{
    titel: "Das große Elternhaus",
    sv: "Tochter T erbt das Einfamilienhaus (Grundbesitzwert 750.000 €, Wohnfläche 250 m²), das ihre verwitwete Mutter bis zum Tod bewohnt hat. T zieht drei Wochen nach dem Erbfall ein.",
    aufgabe: "Ist das Haus steuerfrei?",
    loesung: [
      "Erwerb von Todes wegen eines bebauten Grundstücks im Inland durch ein Kind, von der Erblasserin bis zum Erbfall selbst bewohnt und von T unverzüglich selbst genutzt → § 13 Abs. 1 Nr. 4c ErbStG.",
      "Befreit nur, soweit die Wohnfläche 200 m² nicht übersteigt: 750.000 € × 200/250 = 600.000 € frei; 150.000 € steuerpflichtig.",
      "T muss zehn Jahre selbst darin wohnen, sonst entfällt die Befreiung rückwirkend (§ 13 Abs. 1 Nr. 4c ErbStG), außer bei zwingenden Gründen.",
    ],
  }],
  "bew-wohnraum": [{
    titel: "Wohn- und Geschäftshaus mit Hypothek",
    sv: "Nichte N erhält ein Haus in Lübeck geschenkt (Grundbesitzwert 1.200.000 €): 600 m² zu Wohnzwecken vermietet, 200 m² an eine Bäckerei. N übernimmt ein durch Grundschuld gesichertes Darlehen von 400.000 €.",
    aufgabe: "Ermitteln Sie die Bereicherung aus dem Grundstück.",
    loesung: [
      "Wohnanteil 600/800 = 900.000 € × 90 % = 810.000 € (§ 13d Abs. 1, 3 ErbStG); Bäckerei 300.000 € voll. Ansatz 1.110.000 €.",
      "Darlehen nur abzugsfähig, soweit das Grundstück nicht befreit ist (§ 10 Abs. 6a S. 1 ErbStG): 400.000 € × 1.110.000/1.200.000 = 370.000 €.",
      "Bereicherung 1.110.000 € − 370.000 € = 740.000 € (§ 10 Abs. 1 ErbStG).",
    ],
  }],
  "bew-betrieb": [{
    titel: "GmbH-Anteil mit Wertpapierdepot",
    sv: "Mutter M (Beteiligung 70 %) schenkt ihrem Sohn den gesamten Anteil an einer GmbH mit Sitz in Kiel. Festgestellter Wert 3.000.000 €, Nettowert des Verwaltungsvermögens 600.000 € (20 %). Variante: Verwaltungsvermögen 450.000 € (15 %), Antrag auf Optionsverschonung.",
    aufgabe: "Mit welchem Wert ist der Anteil steuerpflichtig?",
    loesung: [
      `Begünstigungsfähig gem. § 13b Abs. 1 Nr. 3 ErbStG (Beteiligung über 25 %, Sitz im Inland). Unschädlich 10 % × 2.400.000 € = ${eur(v.unschaedlich)} (§ 13b Abs. 7 ErbStG); schädlich ${eur(v.schaedlich)}; begünstigt ${eur(v.beguenstigt)} (§ 13b Abs. 2 S. 1 ErbStG).`,
      `Regelverschonung 85 % = ${eur(v.abschlag)} (§ 13a Abs. 1 ErbStG); Rest ${eur(v.rest)}. Abzugsbetrag 150.000 € − 50 % × ${eur(v.rest - 150000)} = ${eur(v.abzug)} (§ 13a Abs. 2 ErbStG). Steuerpflichtig ${eur(v.rest)} − ${eur(v.abzug)} + ${eur(v.schaedlich)} = ${eur(v.steuerpflichtig)}.`,
      `Variante: Verwaltungsvermögen 15 % ≤ 20 % → Optionsverschonung möglich (§ 13a Abs. 10 ErbStG): begünstigt ${eur(vOpt.beguenstigt)} zu 100 % frei; steuerpflichtig nur das schädliche Verwaltungsvermögen ${eur(vOpt.steuerpflichtig)}.`,
    ],
  }],
  "bew-steuer": [{
    titel: "Knapp über der Wertgrenze",
    sv: "Der steuerpflichtige Erwerb der Tochter beträgt nach Abzug des Freibetrags und Abrundung 312.000 € (Steuerklasse I).",
    aufgabe: "Berechnen Sie die Erbschaftsteuer.",
    loesung: [
      `Steuersatz 15 % (§ 19 Abs. 1 ErbStG): 312.000 € × 15 % = ${eur(st1.normal)}.`,
      `Härteausgleich (§ 19 Abs. 3 Buchst. a ErbStG): 300.000 € × 11 % = ${eur(st1.beiGrenze)} + ½ × 12.000 € = ${eur(st1.deckung)} → ${eur(st1.beiGrenze + st1.deckung)}. Festzusetzen ${eur(st1.steuer)}.`,
      "Steuerschuldnerin ist die Tochter (§ 20 Abs. 1 S. 1 ErbStG).",
    ],
  }],
  "bew-allgemein": [{
    titel: "Aktien, Darlehen und ein Gemälde",
    sv: "Zum Nachlass gehören 500 Aktien (Kurse am Todestag im regulierten Markt: 42,10 € bis 44,80 €), eine Darlehensforderung über 30.000 € gegen den solventen Neffen (marktüblich verzinst) und ein Gemälde, das ein Auktionshaus auf 15.000 € schätzt.",
    aufgabe: "Bewerten Sie die Gegenstände.",
    loesung: [
      "Aktien: niedrigster Kurs am Stichtag gem. § 12 Abs. 1 ErbStG i. V. m. § 11 Abs. 1 S. 1 BewG: 500 × 42,10 € = 21.050 €.",
      "Darlehensforderung: Nennwert 30.000 € gem. § 12 Abs. 1 BewG, da keine besonderen Umstände vorliegen.",
      "Gemälde: gemeiner Wert 15.000 € gem. § 9 Abs. 1, 2 BewG.",
    ],
  }],
  "bew-grundbesitz": [{
    titel: "Baugrundstück und Bodenrichtwert",
    sv: "Am 20.03.2026 wird ein unbebautes Baugrundstück (720 m²) vererbt. Bodenrichtwert zum 01.01.2024: 380 €/m²; zum 01.01.2026 (beschlossen im Mai 2026): 410 €/m². Die Richtwerte werden alle zwei Jahre ermittelt.",
    aufgabe: "Ermitteln Sie den Grundbesitzwert.",
    loesung: [
      "Unbebautes Grundstück gem. § 178 Abs. 1 BewG; Wert = Fläche × Bodenrichtwert (§ 179 S. 1 BewG).",
      "Maßgebend ist der Bodenrichtwert, der zuletzt vor dem Stichtag zu ermitteln war (§ 179 S. 3 BewG) – der zum 01.01.2026: 720 m² × 410 €/m² = 295.200 €.",
      "Der Wert wird gesondert festgestellt (§ 151 Abs. 1 S. 1 Nr. 1 BewG) und für die Erbschaftsteuer übernommen (§ 12 Abs. 3 ErbStG).",
    ],
  }],
  "bew-bebaut": [{
    titel: "Drei Grundstücke, drei Verfahren",
    sv: "Zu bewerten sind: (1) ein Einfamilienhaus mit Vergleichsfaktor des Gutachterausschusses, (2) ein Haus mit sechs Wohnungen (600 m²) und einem Laden (200 m²) mit ortsüblicher Miete, (3) eine eigengenutzte Werkhalle ohne übliche Miete.",
    aufgabe: "Bestimmen Sie Grundstücksart und Verfahren.",
    loesung: [
      "(1) Ein- und Zweifamilienhaus (§ 181 Abs. 2 BewG) → Vergleichswertverfahren (§ 182 Abs. 2 Nr. 3, § 183 Abs. 2 BewG).",
      "(2) 75 % Wohnen, 25 % Gewerbe → gemischt genutztes Grundstück (§ 181 Abs. 7 BewG); übliche Miete ermittelbar → Ertragswertverfahren (§ 182 Abs. 3 Nr. 2 BewG).",
      "(3) Geschäftsgrundstück (§ 181 Abs. 6 BewG) ohne übliche Miete → Sachwertverfahren (§ 182 Abs. 4 Nr. 2 BewG).",
    ],
  }],
  "bew-ertragswert": [{
    titel: "Mietwohngrundstück in Altona",
    sv: "Mietwohngrundstück, 600 m², Bodenrichtwert 450 €/m², acht Wohnungen mit 640 m², Jahreskaltmiete ohne Umlagen 86.400 € (ortsüblich), bezugsfertig 1972, Stichtag 2026. Kein Liegenschaftszins des Gutachterausschusses. Annahme: VPI Oktober 2025 = 123,0, Oktober 2001 = 77,1.",
    aufgabe: "Ermitteln Sie den Grundbesitzwert.",
    loesung: [
      `Bodenwert 600 × 450 = ${eur(ew.bodenwert)} (§ 184 Abs. 2, § 179 BewG). Rohertrag ${eur(ew.rohertrag)} (§ 186 Abs. 1 BewG).`,
      `Bewirtschaftungskosten (§ 187 BewG, Anlage 23): Verwaltung 8 × ${eur(ew.ix.verwaltungJeWohnung)} = ${eur(ew.verwaltung)}, Instandhaltung 640 m² × ${ew.ix.instandJeQm.toLocaleString("de-DE")} € = ${eur(ew.instand)}, Mietausfall 2 % = ${eur(ew.mietausfall)}; zusammen ${eur(ew.bwk)}. Reinertrag ${eur(ew.reinertrag)} (§ 185 Abs. 1 BewG).`,
      `Bodenwertverzinsung 3,5 % (§ 188 Abs. 2 S. 2 Nr. 1 BewG) = ${eur(ew.verzinsung)} → Gebäudereinertrag ${eur(ew.gebaeudereinertrag)} (§ 185 Abs. 2 BewG).`,
      `Restnutzungsdauer 80 − 54 = 26 Jahre (Anlage 22, § 185 Abs. 3 S. 3, 4 BewG; Mindestdauer 24 Jahre überschritten); Vervielfältiger ${n4(ew.vv)} (Anlage 21) → Gebäudeertragswert ${eur(ew.gebaeudeertragswert)}.`,
      `Ertragswert ${eur(ew.bodenwert)} + ${eur(ew.gebaeudeertragswert)} = ${eur(ew.ertragswert)} (§ 184 Abs. 3 BewG).`,
    ],
  }],
};
export const PRUEF_VV = vervielfaeltiger(26, 3.5);
