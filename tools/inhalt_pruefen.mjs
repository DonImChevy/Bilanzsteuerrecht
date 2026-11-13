// Inhaltsprüfung für Überblicke (Kompaktwissen) und Lernpfad: node tools/inhalt_pruefen.mjs [fach] [--kurz]
// Meldet je Thema bzw. Block:
//   BEGRIFF  – ein Fachbegriff kommt vor, die Norm, die ihn definiert, wird im selben Thema aber nicht zitiert
//   NORM     – ein Zitat verweist auf einen Paragrafen, dessen Wortlaut in der App fehlt (nicht antippbar)
//   UNSCHARF – weiche Formulierungen („ca.“, „usw.“, „in etwa“ …), die in einem Überblick präzisiert gehören
// Das Werkzeug ist eine Arbeitsliste, kein Test: Nicht jeder Treffer ist ein Fehler.
import { THEMEN } from "../web/js/kern.js";
import { KOMPAKT } from "../web/js/kompakt.js";
import { PFADE } from "../web/js/lernpfad.js";
import { norm } from "../web/js/oer/normtext.js";
import { BEGRIFFE as GLOSSAR } from "../web/js/begriffe.js";

const GESETZE = "HGB|AO|EStG|UStG|BWahlG|PartG|GG|BGB|EStDV|LStDV|VwZG|GOBT|GmbHG|ErbStG|BewG|UStDV";
/** Alle zitierten Paragrafen eines Textes als „Gesetz Nr“ (auch aus „§§ 14, 14a UStG“ und „Art. 20, 28 GG“). */
export function zitierte(text) {
  const erg = new Set();
  const re = new RegExp(String.raw`(§§?|Art\.)\s*([^§;„“<>]{1,70}?)\s*\b(${GESETZE})\b`, "g");
  for (const m of String(text).matchAll(re)) {
    const g = m[3], teil = m[2];
    // Paragrafennummern: die erste Zahl und jede weitere nach „, “ / „und“ / „bis“, die nicht zu Abs./S./Nr. gehört
    const ohne = teil.replace(/(Abs\.|S\.|Satz|Nr\.|Nrn\.|Buchst\.|Alt\.|Hs\.)\s*\d+[a-z]?(\s*(,|und|bis|–|-)\s*\d+[a-z]?(?!\s*(Abs|S\.|Nr)))*/g, " ");
    for (const z of ohne.matchAll(/\b(\d+[a-z]?)\b/g)) erg.add(`${g} ${z[1]}`);
    if (m[1] === "Art." && g !== "GG") continue;
  }
  for (const m of String(text).matchAll(/Art\.\s*(\d+[a-z]?)(?![^§;]{0,60}\b(?:HGB|AO|EStG|UStG|BGB)\b)/g)) erg.add(`GG ${m[1]}`);
  return erg;
}

/** Begriffe je Fach: [Muster im Text, verlangte Norm(en) – eine genügt, Bezeichnung]. */
const B = (re, normen, name) => [re, normen, name];
const BEGRIFFE = {
  ust: [
    B(/\bUnternehmer(s|n)?\b/, ["UStG 2"], "Unternehmer → § 2 Abs. 1 UStG"),
    B(/Rahmen (seines|des|ihres) Unternehmens/, ["UStG 2"], "Unternehmen → § 2 Abs. 1 S. 2 UStG"),
    B(/\bLieferung(en)?\b/, ["UStG 3"], "Lieferung → § 3 Abs. 1 UStG"),
    B(/sonstige[nr]? Leistung/, ["UStG 3"], "sonstige Leistung → § 3 Abs. 9 UStG"),
    B(/\bInland\b/, ["UStG 1"], "Inland → § 1 Abs. 2 UStG"),
    B(/\bEntgelt\b/, ["UStG 10", "UStG 1"], "Entgelt → § 10 Abs. 1 UStG"),
    B(/\bsteuerbar/, ["UStG 1"], "steuerbar → § 1 Abs. 1 UStG"),
    B(/Vorsteuer/, ["UStG 15"], "Vorsteuerabzug → § 15 UStG"),
    B(/\bRechnung(en)?\b/, ["UStG 14"], "Rechnung → § 14 UStG"),
    B(/Kleinunternehmer/, ["UStG 19"], "Kleinunternehmer → § 19 UStG"),
    B(/Steuerschuldner/, ["UStG 13a", "UStG 13b"], "Steuerschuldner → § 13a UStG"),
    B(/Steuersatz|19 %|7 %/, ["UStG 12"], "Steuersatz → § 12 UStG"),
    B(/Gemeinschaftsgebiet|Drittland/, ["UStG 1"], "Gemeinschaftsgebiet/Drittland → § 1 Abs. 2a UStG"),
    B(/innergemeinschaftliche[nr]? Erwerb/, ["UStG 1a"], "innergemeinschaftlicher Erwerb → § 1a UStG"),
    B(/innergemeinschaftliche[nr]? Lieferung/, ["UStG 6a"], "innergemeinschaftliche Lieferung → § 6a UStG"),
    B(/Ausfuhr/, ["UStG 6"], "Ausfuhrlieferung → § 6 UStG"),
    B(/unentgeltliche Wertabgabe|Entnahme/, ["UStG 3"], "unentgeltliche Wertabgabe → § 3 Abs. 1b, 9a UStG"),
    B(/Werklieferung/, ["UStG 3"], "Werklieferung → § 3 Abs. 4 UStG"),
    B(/Bemessungsgrundlage/, ["UStG 10"], "Bemessungsgrundlage → § 10 UStG"),
    B(/Voranmeldung/, ["UStG 18"], "Voranmeldung → § 18 UStG"),
  ],
  est: [
    B(/unbeschränkt (einkommen)?steuerpflichtig|unbeschränkte (Einkommen)?[Ss]teuerpflicht/, ["EStG 1"], "unbeschränkte Steuerpflicht → § 1 Abs. 1 EStG"),
    B(/\bWohnsitz/, ["AO 8"], "Wohnsitz → § 8 AO"),
    B(/gewöhnliche[nr]? Aufenthalt/, ["AO 9"], "gewöhnlicher Aufenthalt → § 9 AO"),
    B(/Einkunftsart/, ["EStG 2"], "Einkunftsarten → § 2 Abs. 1 EStG"),
    B(/Betriebsausgabe/, ["EStG 4"], "Betriebsausgaben → § 4 Abs. 4 EStG"),
    B(/Werbungskosten/, ["EStG 9", "EStG 9a"], "Werbungskosten → § 9 Abs. 1 S. 1 EStG"),
    B(/\bEinnahmen\b/, ["EStG 8"], "Einnahmen → § 8 Abs. 1 EStG"),
    B(/Zufluss|Abfluss/, ["EStG 11"], "Zufluss/Abfluss → § 11 EStG"),
    B(/Sonderausgabe/, ["EStG 10", "EStG 10c"], "Sonderausgaben → § 10 EStG"),
    B(/außergewöhnliche[nr]? Belastung/, ["EStG 33", "EStG 33a", "EStG 33b"], "außergewöhnliche Belastungen → § 33 EStG"),
    B(/Zusammenveranlagung/, ["EStG 26", "EStG 26b"], "Zusammenveranlagung → §§ 26, 26b EStG"),
    B(/\bArbeitnehmer(s|n)?\b/, ["LStDV 1"], "Arbeitnehmer → § 1 LStDV"),
    B(/Arbeitslohn/, ["LStDV 2", "EStG 19"], "Arbeitslohn → § 2 LStDV, § 19 Abs. 1 EStG"),
    B(/Gewerbebetrieb/, ["EStG 15"], "Gewerbebetrieb → § 15 Abs. 2 EStG"),
    B(/Gesamtbetrag der Einkünfte/, ["EStG 2"], "Gesamtbetrag der Einkünfte → § 2 Abs. 3 EStG"),
    B(/zu versteuernde[sn]? Einkommen/, ["EStG 2"], "zu versteuerndes Einkommen → § 2 Abs. 5 EStG"),
    B(/Grundfreibetrag|Splitting|Tarif/, ["EStG 32a"], "Tarif → § 32a EStG"),
    B(/\bKind(er|es|ern)?\b/, ["EStG 32"], "Kind → § 32 EStG"),
    B(/Veranlagungszeitraum/, ["EStG 25", "EStG 2"], "Veranlagungszeitraum → § 25 Abs. 1 EStG"),
  ],
  bsr: [
    B(/\bKaufmann|Kaufleute/, ["HGB 1"], "Kaufmann → § 1 HGB"),
    B(/Buchführungspflicht/, ["HGB 238", "AO 140", "AO 141"], "Buchführungspflicht → § 238 HGB, §§ 140, 141 AO"),
    B(/\bInventar\b/, ["HGB 240"], "Inventar → § 240 HGB"),
    B(/Anschaffungskosten/, ["HGB 255"], "Anschaffungskosten → § 255 Abs. 1 HGB"),
    B(/Herstellungskosten/, ["HGB 255"], "Herstellungskosten → § 255 Abs. 2 HGB"),
    B(/\bAfA\b|Absetzung für Abnutzung/, ["EStG 7"], "AfA → § 7 EStG"),
    B(/\bGWG\b|geringwertige/, ["EStG 6"], "GWG → § 6 Abs. 2 EStG"),
    B(/Rückstellung/, ["HGB 249"], "Rückstellungen → § 249 HGB"),
    B(/Rechnungsabgrenzung|\bRAP\b/, ["HGB 250", "EStG 5"], "RAP → § 250 HGB, § 5 Abs. 5 EStG"),
    B(/Anlagevermögen/, ["HGB 247"], "Anlagevermögen → § 247 Abs. 2 HGB"),
    B(/\bEntnahme/, ["EStG 4", "EStG 6"], "Entnahme → § 4 Abs. 1 S. 2 EStG"),
    B(/\bEinlage/, ["EStG 4", "EStG 6"], "Einlage → § 4 Abs. 1 S. 8 EStG"),
    B(/Teilwert/, ["EStG 6"], "Teilwert → § 6 Abs. 1 Nr. 1 S. 3 EStG"),
    B(/Vorsteuer/, ["UStG 15"], "Vorsteuerabzug → § 15 UStG"),
    B(/Umsatzsteuer/, ["UStG 1", "UStG 12", "UStG 13", "UStG 10"], "Umsatzsteuer → § 1 Abs. 1 Nr. 1, § 12 UStG"),
    B(/Maßgeblichkeit/, ["EStG 5"], "Maßgeblichkeit → § 5 Abs. 1 EStG"),
    B(/Niederstwert|Wertminderung|außerplanmäßig/, ["HGB 253", "EStG 6"], "Niederstwertprinzip → § 253 Abs. 3, 4 HGB"),
    B(/Vorsichtsprinzip|Realisationsprinzip|Imparitätsprinzip/, ["HGB 252"], "Bewertungsgrundsätze → § 252 Abs. 1 Nr. 4 HGB"),
    B(/Betriebsvermögensvergleich/, ["EStG 4", "EStG 5"], "Betriebsvermögensvergleich → § 4 Abs. 1 S. 1 EStG"),
    B(/Wirtschaftsgut/, ["EStG 4", "EStG 5", "EStG 6", "HGB 246"], "Wirtschaftsgut/Vermögensgegenstand → § 246 Abs. 1 HGB"),
  ],
  ao: [
    B(/\bSteuern\b/, ["AO 3"], "Steuern → § 3 Abs. 1 AO"),
    B(/Steuerpflichtige/, ["AO 33"], "Steuerpflichtiger → § 33 AO"),
    B(/Verwaltungsakt/, ["AO 118"], "Verwaltungsakt → § 118 AO"),
    B(/Bekanntgabe|bekannt gegeben/, ["AO 122", "AO 124"], "Bekanntgabe → § 122 AO"),
    B(/\bWohnsitz/, ["AO 8"], "Wohnsitz → § 8 AO"),
    B(/gewöhnliche[nr]? Aufenthalt/, ["AO 9"], "gewöhnlicher Aufenthalt → § 9 AO"),
    B(/Angehörige/, ["AO 15"], "Angehörige → § 15 AO"),
    B(/Finanzbehörde/, ["AO 6"], "Finanzbehörden → § 6 Abs. 2 AO"),
    B(/Einspruch/, ["AO 347"], "Einspruch → § 347 AO"),
    B(/Einspruchsfrist/, ["AO 355"], "Einspruchsfrist → § 355 Abs. 1 AO"),
    B(/Wiedereinsetzung/, ["AO 110"], "Wiedereinsetzung → § 110 AO"),
    B(/Steuerschuldverhältnis/, ["AO 37"], "Steuerschuldverhältnis → § 37 AO"),
    B(/Fälligkeit|fällig\b/, ["AO 220"], "Fälligkeit → § 220 AO"),
    B(/Steuergeheimnis/, ["AO 30"], "Steuergeheimnis → § 30 AO"),
    B(/Handlungsfähig/, ["AO 79"], "Handlungsfähigkeit → § 79 AO"),
    B(/Bevollmächtigte/, ["AO 80"], "Bevollmächtigte → § 80 AO"),
    B(/Verspätungszuschlag/, ["AO 152"], "Verspätungszuschlag → § 152 AO"),
    B(/Säumniszuschlag/, ["AO 240"], "Säumniszuschlag → § 240 AO"),
    B(/Ermessen/, ["AO 5"], "Ermessen → § 5 AO"),
    B(/Amtsträger/, ["AO 7"], "Amtsträger → § 7 AO"),
    B(/Gesamtrechtsnachfolge|Erbe\b/, ["AO 45"], "Gesamtrechtsnachfolge → § 45 AO"),
    B(/Steuerbescheid/, ["AO 155", "AO 157"], "Steuerbescheid → § 155 Abs. 1 AO"),
    B(/Steuererklärung/, ["AO 149", "AO 150"], "Steuererklärung → §§ 149, 150 AO"),
    B(/Untersuchungsgrundsatz|von Amts wegen/, ["AO 88"], "Untersuchungsgrundsatz → § 88 AO"),
    B(/Mitwirkung/, ["AO 90"], "Mitwirkungspflicht → § 90 AO"),
    B(/\bFrist(en)?\b/, ["AO 108"], "Fristen → § 108 AO"),
  ],
  pr: [
    B(/Rechtsfähig/, ["BGB 1"], "Rechtsfähigkeit → § 1 BGB"),
    B(/Geschäftsfähig|geschäftsunfähig/, ["BGB 104", "BGB 106"], "Geschäftsfähigkeit → §§ 104, 106 BGB"),
    B(/Minderjährig/, ["BGB 106", "BGB 107", "BGB 2"], "Minderjährige → §§ 2, 106 BGB"),
    B(/\bVerbraucher/, ["BGB 13"], "Verbraucher → § 13 BGB"),
    B(/\bUnternehmer/, ["BGB 14"], "Unternehmer → § 14 BGB"),
    B(/\bKaufmann|Kaufleute/, ["HGB 1"], "Kaufmann → § 1 HGB"),
    B(/Stellvertret|Vertreter/, ["BGB 164"], "Stellvertretung → § 164 BGB"),
    B(/Vollmacht/, ["BGB 167", "BGB 166"], "Vollmacht → § 167 BGB"),
    B(/Anfechtung|anfechten/, ["BGB 142", "BGB 119", "BGB 123"], "Anfechtung → §§ 119, 142 BGB"),
    B(/Kaufvertrag/, ["BGB 433"], "Kaufvertrag → § 433 BGB"),
    B(/\bAngebot|Antrag\b/, ["BGB 145"], "Angebot → § 145 BGB"),
    B(/\bAnnahme\b/, ["BGB 147", "BGB 146", "BGB 150", "BGB 151"], "Annahme → §§ 146 ff. BGB"),
    B(/Willenserklärung/, ["BGB 130", "BGB 116", "BGB 133"], "Willenserklärung → §§ 116 ff., 130 BGB"),
    B(/Eigentum\b/, ["BGB 903", "BGB 929"], "Eigentum → §§ 903, 929 BGB"),
    B(/\bBesitz/, ["BGB 854"], "Besitz → § 854 BGB"),
    B(/Verjährung|verjähr/, ["BGB 194", "BGB 195", "BGB 214"], "Verjährung → §§ 194, 195 BGB"),
    B(/Schadensersatz/, ["BGB 280", "BGB 823", "BGB 249"], "Schadensersatz → §§ 280, 823 BGB"),
    B(/Prokura/, ["HGB 48"], "Prokura → § 48 HGB"),
    B(/Handlungsvollmacht/, ["HGB 54"], "Handlungsvollmacht → § 54 HGB"),
    B(/\bGbR\b|Gesellschaft bürgerlichen Rechts/, ["BGB 705"], "GbR → § 705 BGB"),
    B(/\boHG\b|\bOHG\b/, ["HGB 105"], "oHG → § 105 HGB"),
    B(/\bKG\b/, ["HGB 161"], "KG → § 161 HGB"),
    B(/\bGmbH\b/, ["GmbHG 13", "GmbHG 1"], "GmbH → § 13 GmbHG"),
    B(/juristische Person/, ["BGB 21", "GmbHG 13"], "juristische Person → §§ 21 ff. BGB"),
    B(/\bSache(n)?\b/, ["BGB 90"], "Sache → § 90 BGB"),
    B(/\bForm\b|Schriftform|notariell/, ["BGB 125", "BGB 126", "BGB 128"], "Form → §§ 125 ff. BGB"),
    B(/\bnichtig/, ["BGB 105", "BGB 125", "BGB 134", "BGB 138", "BGB 142"], "Nichtigkeit → §§ 105, 125, 134, 138, 142 BGB"),
    B(/\bErbe|Erbfall/, ["BGB 1922"], "Erbfall → § 1922 BGB"),
  ],
  oer: [
    B(/Demokratie/, ["GG 20"], "Demokratie → Art. 20 Abs. 1, 2 GG"),
    B(/Rechtsstaat/, ["GG 20"], "Rechtsstaat → Art. 20 Abs. 3 GG"),
    B(/Bundesstaat/, ["GG 20"], "Bundesstaat → Art. 20 Abs. 1 GG"),
    B(/Sozialstaat/, ["GG 20"], "Sozialstaat → Art. 20 Abs. 1 GG"),
    B(/Ewigkeits/, ["GG 79"], "Ewigkeitsklausel → Art. 79 Abs. 3 GG"),
    B(/\bBundestag(s|es)?\b/, ["GG 38", "GG 39", "GG 40"], "Bundestag → Art. 38 ff. GG"),
    B(/\bBundesrat(s|es)?\b/, ["GG 50", "GG 51"], "Bundesrat → Art. 50, 51 GG"),
    B(/Bundespräsident/, ["GG 54"], "Bundespräsident → Art. 54 GG"),
    B(/Bundeskanzler/, ["GG 63", "GG 65", "GG 62"], "Bundeskanzler → Art. 62, 63, 65 GG"),
    B(/Bundesregierung/, ["GG 62"], "Bundesregierung → Art. 62 GG"),
    B(/Bundesverfassungsgericht|BVerfG/, ["GG 93", "GG 94"], "BVerfG → Art. 93, 94 GG"),
    B(/\bPartei(en)?\b/, ["GG 21"], "Parteien → Art. 21 GG"),
    B(/Abgeordnete/, ["GG 38"], "Abgeordnete → Art. 38 Abs. 1 S. 2 GG"),
    B(/Immunität|Indemnität/, ["GG 46"], "Indemnität/Immunität → Art. 46 GG"),
    B(/Fraktion/, ["GOBT 10"], "Fraktion → § 10 GOBT"),
    B(/Vertrauensfrage/, ["GG 68"], "Vertrauensfrage → Art. 68 GG"),
    B(/Misstrauensvotum/, ["GG 67"], "Misstrauensvotum → Art. 67 GG"),
    B(/Gegenzeichnung/, ["GG 58"], "Gegenzeichnung → Art. 58 GG"),
    B(/Richtlinienkompetenz|Ressortprinzip|Kollegialprinzip/, ["GG 65"], "Art. 65 GG"),
    B(/Vermittlungsausschuss/, ["GG 77"], "Vermittlungsausschuss → Art. 77 Abs. 2 GG"),
    B(/Gesetzesinitiative|Gesetzesvorlage/, ["GG 76"], "Gesetzesinitiative → Art. 76 Abs. 1 GG"),
    B(/Ausfertigung|Verkündung/, ["GG 82"], "Ausfertigung/Verkündung → Art. 82 GG"),
    B(/Grundrecht/, ["GG 1", "GG 19"], "Grundrechtsbindung → Art. 1 Abs. 3 GG"),
    B(/Gewaltenteilung/, ["GG 20"], "Gewaltenteilung → Art. 20 Abs. 2 S. 2 GG"),
  ],
  bewr: [
    B(/Erwerb von Todes wegen/, ["ErbStG 3"], "Erwerb von Todes wegen → § 3 ErbStG"),
    B(/Schenkung/, ["ErbStG 7"], "Schenkung → § 7 ErbStG"),
    B(/unbeschränkt|Inländer/, ["ErbStG 2"], "persönliche Steuerpflicht → § 2 ErbStG"),
    B(/Steuerklasse/, ["ErbStG 15"], "Steuerklassen → § 15 ErbStG"),
    B(/Freibetrag/, ["ErbStG 16", "ErbStG 17", "ErbStG 13", "ErbStG 13a"], "Freibeträge → §§ 16, 17 ErbStG"),
    B(/Steuersatz/, ["ErbStG 19"], "Steuersatz → § 19 ErbStG"),
    B(/steuerpflichtige[nr]? Erwerb/, ["ErbStG 10"], "steuerpflichtiger Erwerb → § 10 ErbStG"),
    B(/gemeine[nr]? Wert/, ["BewG 9"], "gemeiner Wert → § 9 BewG"),
    B(/Familienheim/, ["ErbStG 13"], "Familienheim → § 13 Abs. 1 Nr. 4a–4c ErbStG"),
    B(/Grundbesitzwert/, ["BewG 157", "ErbStG 12"], "Grundbesitzwert → § 157 BewG"),
    B(/Ertragswert/, ["BewG 184", "BewG 182"], "Ertragswertverfahren → §§ 182, 184 BewG"),
    B(/Vergleichswert/, ["BewG 183", "BewG 182"], "Vergleichswertverfahren → § 183 BewG"),
    B(/Bodenwert|Bodenrichtwert/, ["BewG 179"], "Bodenwert → § 179 BewG"),
    B(/Betriebsvermögen/, ["ErbStG 13a", "ErbStG 13b", "BewG 95"], "begünstigtes Vermögen → §§ 13a, 13b ErbStG"),
    B(/Nachlassverbindlichkeit|Erbfallkosten/, ["ErbStG 10"], "Nachlassverbindlichkeiten → § 10 Abs. 5 ErbStG"),
    B(/Steuerschuldner/, ["ErbStG 20"], "Steuerschuldner → § 20 ErbStG"),
    B(/Vorerwerb|Zusammenrechnung/, ["ErbStG 14"], "Zusammenrechnung → § 14 ErbStG"),
    B(/Stichtag/, ["ErbStG 11", "ErbStG 9"], "Bewertungsstichtag → §§ 9, 11 ErbStG"),
    B(/Grundstücksart|Mietwohngrundstück|Einfamilienhaus/, ["BewG 181"], "Grundstücksarten → § 181 BewG"),
  ],
};
BEGRIFFE.bbf = BEGRIFFE.bsr;

const UNSCHARF = /\b(ca\.|circa|usw\.|etc\.|o\. ?Ä\.|u\. ?Ä\.|in etwa|ungefähr|irgendwie|sozusagen|quasi|mehr oder weniger|normalerweise|eigentlich|im Prinzip)(?![\w])/g;

const alleTexte = (x) => { const erg = []; (function geh(v) { if (typeof v === "string") erg.push(v); else if (Array.isArray(v)) v.forEach(geh); else if (v && typeof v === "object") Object.values(v).forEach(geh); })(x); return erg.join("\n"); };

function pruefe(fach, name, text) {
  const z = zitierte(text), meldungen = [];
  // Ein Begriff gilt als erklärt, wenn seine Norm im Text steht oder das Begriffsverzeichnis (begriffe.js) ihn mit dieser Norm führt
  const imGlossar = zitierte((GLOSSAR[fach] || []).map((b) => b[2]).join(" "));
  for (const [re, normen, bez] of BEGRIFFE[fach] || []) if (re.test(text) && !normen.some((n) => z.has(n) || imGlossar.has(n))) meldungen.push(`BEGRIFF  ${bez}`);
  for (const ref of z) { const [g] = ref.split(" "); if (!["EStDV", "LStDV", "VwZG", "GOBT", "UStDV"].includes(g) && !norm(ref)) meldungen.push(`NORM     ${ref} fehlt als Gesetzestext`); }
  for (const m of text.matchAll(UNSCHARF)) meldungen.push(`UNSCHARF „${m[0]}“ – …${text.slice(Math.max(0, m.index - 40), m.index + 30).replace(/\n/g, " ")}…`);
  return meldungen.length ? [`■ ${name}`, ...meldungen.map((m) => "    " + m)] : [];
}

const [, , nurFach] = process.argv;
if (import.meta.url === `file://${process.argv[1]}`) {
  let n = 0, t = 0;
  for (const fach of Object.keys(BEGRIFFE)) {
    if (nurFach && !nurFach.startsWith("-") && nurFach !== fach) continue;
    const aus = [];
    for (const th of THEMEN.filter((x) => x.fach === fach)) if (KOMPAKT[th.id]) { t++; const { beispiele, ...kern } = KOMPAKT[th.id]; aus.push(...pruefe(fach, `Überblick ${th.id} – ${th.titel}`, alleTexte(kern))); }
    for (const b of PFADE[fach]?.bloecke || []) { t++; const { fragen, ...kern } = b; aus.push(...pruefe(fach, `Lernpfad ${b.id} – ${b.titel}`, alleTexte(kern))); }
    n += aus.filter((x) => x.startsWith("    ")).length;
    if (aus.length) console.log(`\n=================== ${fach} ===================\n${aus.join("\n")}`);
  }
  console.log(`\n${t} Texte geprüft, ${n} Hinweise`);
}
