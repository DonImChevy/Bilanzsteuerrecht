// Probeklausur Bewertungsrecht und Vermögensbesteuerung (GS I, 120 Minuten, 60 Punkte) – eigener Sachverhalt im Aufbau der
// Hauptklausur: ein Erbfall mit drei Erwerbern, Grundbesitzwert im Ertragswertverfahren, § 13d, §§ 13a/13b, Familienheim,
// Härteausgleich. Alle Beträge aus rechnen.js (Vervielfältiger gegen Anlage 21 geprüft). Rechtsstand 2026.
// Bewertungsbogen: [Punkte, Merkmal, Erwartet]; Stichworte je Merkmal in ../klausur_stichworte.js.
import { ertragswert, verschonung, erbst, abrunden100, liegenschaftszins } from "./rechnen.js";

const eur = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: Number.isInteger(x) ? 0 : 2, maximumFractionDigits: 2 }) + " €";
const n4 = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: 4 });

// ------------------------------------------------------------------ Zahlen des Falls
const VPI = [123.0, 77.1]; // Klausurannahme (2020 = 100)
const G = { flaeche: 520, brw: 1150, mieteWohnJahr: 7200 * 12, mieteGewerbeJahr: 2400 * 12, wohnungen: 6, wohnQm: 480, gewerbeQm: 120, baujahr: 1958, jahr: 2026, gnd: 80 };
const LIZ = liegenschaftszins(G.wohnQm, G.gewerbeQm);
const EW = ertragswert({ ...G, liz: LIZ, vpi: VPI });
const WOHN = Math.round(EW.ertragswert * 0.8), WOHN90 = Math.round(WOHN * 0.9), GEWERBE = EW.ertragswert - WOHN, ANSATZ_T = WOHN90 + GEWERBE;
const DARLEHEN = 560000, ABZ_T = Math.round(DARLEHEN * ANSATZ_T / EW.ertragswert), BER_T = ANSATZ_T - ABZ_T;
const STPF_T = abrunden100(BER_T - 400000), ST_T = erbst(STPF_T, 1);
const GMBH = 1800000, VV = 216000, V = verschonung(GMBH, VV, { option: true });
const GOLD = 18000, MOEBEL = 9000, BER_N = V.steuerpflichtig + GOLD, STPF_N = abrunden100(BER_N - 20000), ST_N = erbst(STPF_N, 2);
const HEIM = 980000, HAUSRAT = 55000, AKTIEN = 6000 * 98.40, BANK = 180000, KOSTEN = 15000;
const BER_K = HAUSRAT - 41000 + AKTIEN + BANK - KOSTEN, FB_K = 500000 + 256000, STPF_K = abrunden100(BER_K - FB_K), ST_K = erbst(STPF_K, 1);

export const VORBEMERKUNGEN_BEWR = [
  "Bewertungsstichtage liegen im Jahr 2026; maßgebend ist der Rechtsstand 2026.",
  "Gesondert festzustellende Werte sind so zu ermitteln, als wäre über sie bereits entschieden; Verfahrensfragen der Feststellung sind nicht zu erörtern.",
  "Beträge sind auf volle Euro zu runden; der Vervielfältiger ist der Anlage 21 BewG mit vier Nachkommastellen zu entnehmen.",
];

const VORSPANN = [
  "Die verwitwet gewesene und 2019 erneut verheiratete Hanna Hollmann (H) lebte mit ihrem Ehemann Karl Hollmann (K) in ihrem Einfamilienhaus in Hamburg-Volksdorf (230 m² Wohnfläche, festgestellter Grundbesitzwert 980.000 €). H starb am 12.03.2026. Alle Beteiligten sind deutsche Staatsangehörige.",
  "Laut Testament ist K Alleinerbe. Er bewohnt das Haus weiter. Zum Nachlass gehören außerdem: Hausrat (Möbel, Wäsche, Geschirr) im Wert von 55.000 €, 6.000 börsennotierte Aktien (Kurse am 12.03.2026 im regulierten Markt: Tiefstkurs 98,40 €, Höchstkurs 101,20 €, Schlusskurs 99,90 €) und ein Bankguthaben von 180.000 €. Für Bestattung und Grabstein weist K 11.000 € nach. Versorgungsbezüge aus Anlass des Todes erhält K nicht.",
  "Vermächtnis an die Tochter Tina (T, 34 Jahre) aus der ersten Ehe der H: das Mietshaus Fuhlsbüttler Straße in Hamburg-Barmbek, unter Übernahme des darauf lastenden, durch Grundschuld gesicherten Darlehens (Stand 12.03.2026: 560.000 €). T hat 2019 ihren Wohnsitz in Hamburg aufgegeben und lebt seitdem ausschließlich in Zürich (Schweiz).",
  "Das Mietshaus (bezugsfertig 1958, Grundstück 520 m²) enthält sechs Wohnungen mit zusammen 480 m², die zu ortsüblichen Mieten von insgesamt 7.200 € monatlich kalt (zuzüglich 1.300 € Betriebskostenvorauszahlungen) an Privatleute vermietet sind, und einen Laden mit 120 m², den ein Optiker für ortsübliche 2.400 € monatlich kalt gemietet hat. Der Gutachterausschuss hat den Bodenrichtwert zum 01.01.2026 im April 2026 mit 1.150 €/m² beschlossen (zum 01.01.2024: 1.050 €/m²); einen Liegenschaftszinssatz für solche Objekte hat er nicht ermittelt. Ein niedrigerer gemeiner Wert wird nicht nachgewiesen.",
  "Vermächtnis an den Neffen Nils (N, Wohnsitz Hamburg), Sohn des Bruders der H: der 40-%-Anteil der H an der Nordlicht Optik GmbH (Sitz und Geschäftsleitung in Lübeck; festgestellter Anteilswert 1.800.000 €; der Wert des Verwaltungsvermögens wurde zutreffend mit 216.000 € festgestellt und entspricht dem Nettowert), außerdem Goldmünzen im Wert von 18.000 € und Möbel aus dem Gästezimmer im Wert von 9.000 €. N beantragt die Optionsverschonung.",
  "Klausurhinweise: Vorerwerbe gibt es nicht. Bei K sind die vermachten Gegenstände und die Vermächtnislasten nicht darzustellen (sie gleichen sich aus). Für die Anpassung der Bewirtschaftungskosten ist von folgenden Verbraucherpreisindizes auszugehen (Annahme): Oktober 2025 = 123,0; Oktober 2001 = 77,1.",
].join("\n");

const sv = (id, titel, min, teil, aufgaben, loesung, bewertung, zahlen) => ({ id, titel, min, teil, fest: true,
  erzeugen: () => ({ sv: "Siehe Sachverhalt (Vorspann).", aufgaben, loesung, bewertung, ...(zahlen ? { zahlen } : {}) }) });

export const SV_BEWR = [
  sv("bewr-k1", "Allgemeines zu allen Erwerbern", 25, 1,
    ["Würdigen Sie für K, T und N den steuerpflichtigen Vorgang, Entstehung der Steuer und Bewertungsstichtag, die persönliche Steuerpflicht, Steuerklasse und Freibeträge sowie den Steuerschuldner."],
    [
      "K erwirbt durch Erbanfall (§ 3 Abs. 1 Nr. 1 ErbStG i. V. m. § 1922 BGB), T und N durch Vermächtnis (§ 3 Abs. 1 Nr. 1 ErbStG) – Erwerbe von Todes wegen (§ 1 Abs. 1 Nr. 1 ErbStG).",
      "Die Steuer entsteht mit dem Tod der H am 12.03.2026 (§ 9 Abs. 1 Nr. 1 ErbStG); dies ist zugleich der Bewertungsstichtag (§ 11 ErbStG).",
      "H war Inländerin (Wohnsitz Hamburg, § 2 Abs. 1 Nr. 1 S. 2 Buchst. a ErbStG, § 8 AO) → unbeschränkte Steuerpflicht für den gesamten Erwerb aller Erwerber (§ 2 Abs. 1 Nr. 1 S. 1 ErbStG). Dass T seit 2019 – länger als fünf Jahre – in der Schweiz lebt und selbst keine Inländerin mehr ist (§ 2 Abs. 1 Nr. 1 S. 2 Buchst. b ErbStG), ist daher unerheblich.",
      `K: Steuerklasse I (§ 15 Abs. 1 Nr. 1 ErbStG), Freibetrag 500.000 € (§ 16 Abs. 1 Nr. 1 ErbStG), Versorgungsfreibetrag 256.000 € (§ 17 Abs. 1 ErbStG); zusammen ${eur(FB_K)}.`,
      "T: Kind → Steuerklasse I (§ 15 Abs. 1 Nr. 2 ErbStG), Freibetrag 400.000 € (§ 16 Abs. 1 Nr. 2 ErbStG); kein Versorgungsfreibetrag, da älter als 27 Jahre (§ 17 Abs. 2 ErbStG).",
      "N: Abkömmling ersten Grades eines Geschwisters → Steuerklasse II (§ 15 Abs. 1 Steuerklasse II Nr. 3 ErbStG), Freibetrag 20.000 € (§ 16 Abs. 1 Nr. 5 ErbStG).",
      "Steuerschuldner ist jeweils der Erwerber (§ 20 Abs. 1 S. 1 ErbStG).",
    ],
    [[2, "Steuerpflichtige Vorgänge K (Erbanfall) und T, N (Vermächtnis)", "§ 1 Abs. 1 Nr. 1, § 3 Abs. 1 Nr. 1 ErbStG, § 1922 BGB"],
      [2, "Entstehung 12.03.2026 und Bewertungsstichtag", "§ 9 Abs. 1 Nr. 1 ErbStG; § 11 ErbStG"],
      [3, "Unbeschränkte Steuerpflicht über die Erblasserin; T kein Inland, aber unerheblich", "§ 2 Abs. 1 Nr. 1 S. 1, S. 2 Buchst. a ErbStG; Fünfjahresfrist bei T abgelaufen (Buchst. b)"],
      [2, "K: Steuerklasse I, Freibetrag 500.000 €, Versorgungsfreibetrag 256.000 €", `§ 15 Abs. 1, § 16 Abs. 1 Nr. 1, § 17 Abs. 1 ErbStG → zusammen ${eur(FB_K)}`],
      [1.5, "T: Steuerklasse I, Freibetrag 400.000 €, kein § 17", "§ 15 Abs. 1, § 16 Abs. 1 Nr. 2 ErbStG; § 17 Abs. 2 nur bis 27 Jahre"],
      [1.5, "N: Steuerklasse II, Freibetrag 20.000 €", "§ 15 Abs. 1 (II Nr. 3), § 16 Abs. 1 Nr. 5 ErbStG"],
      [1, "Steuerschuldner", "§ 20 Abs. 1 S. 1 ErbStG – der jeweilige Erwerber"]]),

  sv("bewr-k2", "Grundbesitzwert Mietshaus Barmbek", 35, 2,
    ["Ermitteln Sie den Grundbesitzwert des Mietshauses zum Bewertungsstichtag mit Begründung und Rechtsgrundlagen."],
    [
      "Grundbesitz ist mit dem gesondert festgestellten Wert anzusetzen (§ 12 Abs. 3 ErbStG, § 151 Abs. 1 S. 1 Nr. 1, § 157 Abs. 1, 3 BewG), Maßstab ist der gemeine Wert (§ 177 Abs. 1 BewG).",
      "Bebautes Grundstück (§ 180 Abs. 1 BewG). Wohnanteil 480 von 600 m² = 80 % – nicht mehr als 80 % → kein Mietwohngrundstück; betrieblicher Anteil 20 % → kein Geschäftsgrundstück → gemischt genutztes Grundstück (§ 181 Abs. 1 Nr. 5, Abs. 7 BewG). Übliche Miete ermittelbar → Ertragswertverfahren (§ 182 Abs. 3 Nr. 2 BewG).",
      `Bodenwert (§ 184 Abs. 2, § 179 BewG): maßgebend ist der zuletzt vor dem Stichtag zu ermittelnde Bodenrichtwert zum 01.01.2026 (Beschluss im April unerheblich): 520 m² × 1.150 €/m² = ${eur(EW.bodenwert)}.`,
      `Rohertrag (§ 186 Abs. 1 BewG): (7.200 € + 2.400 €) × 12 = ${eur(EW.rohertrag)}; die Betriebskostenvorauszahlungen sind Umlagen und bleiben außer Ansatz.`,
      `Bewirtschaftungskosten (§ 187 Abs. 2, 3 BewG, Anlage 23): Verwaltung Wohnen 230 € × 123,0/77,1 = ${eur(EW.ix.verwaltungJeWohnung)} je Wohnung × 6 = ${eur(6 * EW.ix.verwaltungJeWohnung)}; Laden 3 % von 28.800 € = 864 € → ${eur(EW.verwaltung)}. Instandhaltung 9 € × 123,0/77,1 = ${EW.ix.instandJeQm.toLocaleString("de-DE")} €/m² × 600 m² = ${eur(EW.instand)}. Mietausfallwagnis 2 % von 86.400 € = 1.728 € + 4 % von 28.800 € = 1.152 € → ${eur(EW.mietausfall)}. Zusammen ${eur(EW.bwk)}.`,
      `Reinertrag ${eur(EW.reinertrag)} (§ 185 Abs. 1 BewG) − Bodenwertverzinsung ${LIZ.toLocaleString("de-DE")} % (gemischt genutzt, gewerblicher Anteil bis 50 %, § 188 Abs. 2 S. 2 Nr. 2 BewG) = ${eur(EW.verzinsung)} → Gebäudereinertrag ${eur(EW.gebaeudereinertrag)} (§ 185 Abs. 2 BewG).`,
      `Restnutzungsdauer: Gesamtnutzungsdauer 80 Jahre (Anlage 22) − Alter 2026 − 1958 = 68 Jahre → 12 Jahre; mindestens 30 % von 80 = 24 Jahre (§ 185 Abs. 3 S. 3, 4, 6 BewG). Vervielfältiger bei 4,5 % und 24 Jahren: ${n4(EW.vv)} (Anlage 21).`,
      `Gebäudeertragswert ${eur(EW.gebaeudereinertrag)} × ${n4(EW.vv)} = ${eur(EW.gebaeudeertragswert)} (§ 185 Abs. 3 S. 1 BewG). Ertragswert = Grundbesitzwert ${eur(EW.bodenwert)} + ${eur(EW.gebaeudeertragswert)} = ${eur(EW.ertragswert)} (§ 184 Abs. 3 BewG); der Bodenwert ist überschritten.`,
    ],
    [[1.5, "Ansatz mit festgestelltem Grundbesitzwert, gemeiner Wert", "§ 12 Abs. 3 ErbStG, § 151 Abs. 1 S. 1 Nr. 1, § 157 Abs. 1, 3, § 177 Abs. 1 BewG"],
      [2, "Gemischt genutztes Grundstück (genau 80 % Wohnen reicht nicht)", "§ 181 Abs. 1 Nr. 5, Abs. 3, Abs. 7 BewG; 480/600 = 80 %"],
      [1, "Ertragswertverfahren", "§ 182 Abs. 3 Nr. 2 BewG – übliche Miete ermittelbar"],
      [2, "Bodenwert mit Bodenrichtwert zum 01.01.2026", `§ 179 S. 3 BewG: 520 m² × 1.150 € = ${eur(EW.bodenwert)}`],
      [1.5, "Rohertrag ohne Umlagen", `§ 186 Abs. 1 S. 1, 2 BewG: ${eur(EW.rohertrag)}`],
      [3, "Bewirtschaftungskosten mit Indexierung", `§ 187 BewG, Anlage 23: Verwaltung ${eur(EW.verwaltung)}, Instandhaltung ${eur(EW.instand)}, Mietausfall ${eur(EW.mietausfall)} = ${eur(EW.bwk)}`],
      [2, "Liegenschaftszins 4,5 % und Bodenwertverzinsung", `§ 188 Abs. 2 S. 2 Nr. 2 BewG: ${eur(EW.verzinsung)}; Gebäudereinertrag ${eur(EW.gebaeudereinertrag)}`],
      [2, "Restnutzungsdauer mit Mindestdauer 24 Jahre", "§ 185 Abs. 3 S. 3, 4, 6 BewG, Anlage 22: 80 − 68 = 12 → 24 Jahre"],
      [1.5, "Vervielfältiger und Gebäudeertragswert", `Anlage 21: ${n4(EW.vv)} → ${eur(EW.gebaeudeertragswert)}`],
      [1.5, "Grundbesitzwert", `§ 184 Abs. 3 BewG: ${eur(EW.ertragswert)}`]],
    [{ frage: "Bewirtschaftungskosten", wert: EW.bwk, einheit: "€", toleranz: 2, p: 0 }, { frage: "Grundbesitzwert", wert: EW.ertragswert, einheit: "€", toleranz: 20, p: 0 }]),

  sv("bewr-k3", "Vermieteter Wohnraum und Darlehen (T)", 12, 2,
    ["Mit welchem Wert ist das Mietshaus bei T anzusetzen, und in welcher Höhe ist das übernommene Darlehen abzugsfähig?"],
    [
      "Die Wohnungen sind zu Wohnzwecken vermietet, das Grundstück liegt im Inland und gehört nicht zu begünstigtem Betriebsvermögen → Ansatz mit 90 % (§ 13d Abs. 1, 3 ErbStG). Der Laden ist nicht begünstigt.",
      `Aufteilung nach dem Verhältnis der Wohn- und Nutzflächen: Wohnanteil 480/600 = 80 % = ${eur(WOHN)} × 90 % = ${eur(WOHN90)}; Laden 20 % = ${eur(GEWERBE)}; Ansatz ${eur(ANSATZ_T)}.`,
      `Das übernommene Darlehen mindert die Bereicherung (§ 10 Abs. 1, Abs. 5 ErbStG), ist aber nicht abzugsfähig, soweit das Grundstück steuerbefreit ist (§ 10 Abs. 6a S. 1 ErbStG): 560.000 € × ${eur(ANSATZ_T)} / ${eur(EW.ertragswert)} = ${eur(ABZ_T)}.`,
    ],
    [[2, "§ 13d ErbStG: Wohnteil zu 90 %", "§ 13d Abs. 1, 3 Nr. 1–3 ErbStG; Laden nicht begünstigt"],
      [2, "Aufteilung nach Flächen", `80 % / 20 %: ${eur(WOHN90)} + ${eur(GEWERBE)} = ${eur(ANSATZ_T)}`],
      [2, "Darlehen nur anteilig abzugsfähig", `§ 10 Abs. 6a S. 1 ErbStG: ${eur(ABZ_T)}`]],
    [{ frage: "Ansatz Mietshaus bei T", wert: ANSATZ_T, einheit: "€", toleranz: 20, p: 0 }]),

  sv("bewr-k4", "GmbH-Anteil, Münzen und Möbel (N)", 15, 2,
    ["Mit welchem Wert gehen der GmbH-Anteil, die Goldmünzen und die Möbel in den Erwerb des N ein?"],
    [
      "Der Anteil ist mit dem festgestellten Wert von 1.800.000 € anzusetzen (§ 12 Abs. 2 ErbStG i. V. m. § 151 Abs. 1 S. 1 Nr. 3, § 11 Abs. 2 BewG).",
      "Begünstigungsfähig (§ 13b Abs. 1 Nr. 3 ErbStG): Sitz und Geschäftsleitung im Inland, H war unmittelbar zu mehr als 25 % (40 %) beteiligt.",
      `Verwaltungsvermögen 216.000 € = 12 % < 90 % (§ 13b Abs. 2 S. 2 ErbStG). Unschädlich 10 % von (1.800.000 € − 216.000 €) = ${eur(V.unschaedlich)} (§ 13b Abs. 7 ErbStG); schädlich ${eur(V.schaedlich)}; begünstigt ${eur(V.beguenstigt)} (§ 13b Abs. 2 S. 1 ErbStG).`,
      `Optionsverschonung zulässig, da das Verwaltungsvermögen nicht mehr als 20 % beträgt (§ 13a Abs. 10 S. 1 Nr. 1, S. 2 ErbStG): begünstigtes Vermögen zu 100 % steuerfrei; steuerpflichtig bleibt das schädliche Verwaltungsvermögen von ${eur(V.schaedlich)}.`,
      "Goldmünzen: gemeiner Wert 18.000 € (§ 12 Abs. 1 ErbStG, § 9 BewG); keine Befreiung, Münzen sind ausgenommen (§ 13 Abs. 1 Nr. 1 S. 2 ErbStG). Möbel: Hausrat 9.000 € übersteigt den Freibetrag für Steuerklasse II von 12.000 € nicht → steuerfrei (§ 13 Abs. 1 Nr. 1 Buchst. c ErbStG).",
    ],
    [[1, "Festgestellter Anteilswert", "§ 12 Abs. 2 ErbStG, § 151 Abs. 1 S. 1 Nr. 3 BewG: 1.800.000 €"],
      [1.5, "Begünstigungsfähig: Beteiligung über 25 %, Sitz im Inland", "§ 13b Abs. 1 Nr. 3 ErbStG"],
      [2, "Unschädliches und schädliches Verwaltungsvermögen", `§ 13b Abs. 7, Abs. 2 S. 1 ErbStG: unschädlich ${eur(V.unschaedlich)}, schädlich ${eur(V.schaedlich)}`],
      [2, "Optionsverschonung zulässig (12 % ≤ 20 %), 100 % frei", `§ 13a Abs. 10 ErbStG; steuerpflichtig ${eur(V.schaedlich)}`],
      [1.5, "Münzen voll, Möbel steuerfrei", "§ 13 Abs. 1 Nr. 1 S. 2 und Buchst. c ErbStG: 18.000 € / 0 €"]],
    [{ frage: "Steuerpflichtiger Teil des GmbH-Anteils", wert: V.steuerpflichtig, einheit: "€", toleranz: 1, p: 0 }]),

  sv("bewr-k5", "Erwerb des Ehemanns K", 15, 2,
    ["Würdigen Sie die Erwerbe des K (Haus, Hausrat, Aktien, Bankguthaben) und die Bestattungskosten."],
    [
      "Einfamilienhaus: Erwerb von Todes wegen eines bebauten Grundstücks im Inland durch den überlebenden Ehegatten; H hat es bis zum Erbfall selbst bewohnt, K nutzt es unverzüglich weiter → Familienheim steuerfrei (§ 13 Abs. 1 Nr. 4b ErbStG), ohne Flächengrenze. K muss es zehn Jahre selbst nutzen.",
      "Hausrat 55.000 € − Freibetrag Steuerklasse I 41.000 € = 14.000 € (§ 13 Abs. 1 Nr. 1 Buchst. a ErbStG).",
      `Aktien: niedrigster Kurs am Stichtag, 6.000 × 98,40 € = ${eur(AKTIEN)} (§ 12 Abs. 1 ErbStG, § 11 Abs. 1 S. 1 BewG). Bankguthaben: Nennwert 180.000 € (§ 12 Abs. 1 BewG).`,
      "Bestattungskosten: Pauschbetrag 15.000 € ist höher als der Nachweis von 11.000 € (§ 10 Abs. 5 Nr. 3 S. 2 ErbStG).",
      `Bereicherung des K: 14.000 € + ${eur(AKTIEN)} + 180.000 € − 15.000 € = ${eur(BER_K)} (§ 10 Abs. 1 S. 2 ErbStG).`,
    ],
    [[2, "Familienheim steuerfrei, keine Flächengrenze für Ehegatten", "§ 13 Abs. 1 Nr. 4b ErbStG; zehn Jahre Selbstnutzung"],
      [1.5, "Hausrat 14.000 €", "§ 13 Abs. 1 Nr. 1 Buchst. a ErbStG: 55.000 € − 41.000 €"],
      [1.5, "Aktien zum Tiefstkurs, Bank zum Nennwert", `§ 11 Abs. 1 S. 1, § 12 Abs. 1 BewG: ${eur(AKTIEN)} und 180.000 €`],
      [1, "Pauschbetrag 15.000 €", "§ 10 Abs. 5 Nr. 3 S. 2 ErbStG"],
      [1, "Bereicherung K", `${eur(BER_K)}`]],
    [{ frage: "Bereicherung K", wert: BER_K, einheit: "€", toleranz: 1, p: 0 }]),

  sv("bewr-k6", "Steuerberechnung für K, T und N", 18, 2,
    ["Berechnen Sie für K, T und N den steuerpflichtigen Erwerb und die Erbschaftsteuer."],
    [
      `K: ${eur(BER_K)} − ${eur(FB_K)} = ${eur(BER_K - FB_K)}, abgerundet ${eur(STPF_K)} (§ 10 Abs. 1 S. 6 ErbStG); Steuerklasse I, ${ST_K.satz} % (§ 19 Abs. 1 ErbStG) → ${eur(ST_K.steuer)}.`,
      `T: Ansatz ${eur(ANSATZ_T)} − Darlehen ${eur(ABZ_T)} = Bereicherung ${eur(BER_T)} − 400.000 € = ${eur(BER_T - 400000)}, abgerundet ${eur(STPF_T)}. Steuerklasse I, ${ST_T.satz} % = ${eur(ST_T.normal)}.`,
      `Härteausgleich (§ 19 Abs. 3 Buchst. a ErbStG): 600.000 € × 15 % = ${eur(ST_T.beiGrenze)} + ½ × ${eur(STPF_T - 600000)} = ${eur(ST_T.deckung)} → ${eur(ST_T.beiGrenze + ST_T.deckung)} < ${eur(ST_T.normal)}. Festzusetzen ${eur(ST_T.steuer)}.`,
      `N: ${eur(V.steuerpflichtig)} + 18.000 € = ${eur(BER_N)} − 20.000 € = ${eur(STPF_N)} (Abrundung ohne Auswirkung); Steuerklasse II, ${ST_N.satz} % → ${eur(ST_N.steuer)}.`,
    ],
    [[2, "K: steuerpflichtiger Erwerb und Steuer", `§ 10 Abs. 1 S. 6, § 19 Abs. 1 ErbStG: ${eur(STPF_K)} × ${ST_K.satz} % = ${eur(ST_K.steuer)}`],
      [1.5, "T: steuerpflichtiger Erwerb", `${eur(BER_T)} − 400.000 € → ${eur(STPF_T)}`],
      [2.5, "T: Härteausgleich", `§ 19 Abs. 3 ErbStG: ${eur(ST_T.beiGrenze)} + ${eur(ST_T.deckung)} = ${eur(ST_T.steuer)} statt ${eur(ST_T.normal)}`],
      [2, "N: steuerpflichtiger Erwerb und Steuer", `${eur(STPF_N)} × ${ST_N.satz} % = ${eur(ST_N.steuer)} (§ 19 Abs. 1 ErbStG)`]],
    [{ frage: "Erbschaftsteuer K", wert: ST_K.steuer, einheit: "€", toleranz: 1, p: 0 }, { frage: "Erbschaftsteuer T", wert: ST_T.steuer, einheit: "€", toleranz: 20, p: 0 }, { frage: "Erbschaftsteuer N", wert: ST_N.steuer, einheit: "€", toleranz: 1, p: 0 }]),
];

export const KLAUSUREN_BEWR = [
  { id: "bewr-a", kurz: "A", minuten: 120, titel: "Erbfall Hollmann: Ertragswert, § 13d, Optionsverschonung, Familienheim, Härteausgleich",
    teile: ["bewr-k1", "bewr-k2", "bewr-k3", "bewr-k4", "bewr-k5", "bewr-k6"], vorspann: VORSPANN, vorspannTitel: "Sachverhalt" },
];
export const PRUEF_BEWR = { EW, ANSATZ_T, ABZ_T, BER_T, STPF_T, ST_T, V, BER_N, STPF_N, ST_N, BER_K, FB_K, STPF_K, ST_K, MOEBEL };
