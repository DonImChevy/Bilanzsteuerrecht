// Kontenplan laut Skript (Kontenklassen 0–5) plus Abschlusskonten (Klasse 9).
// [id, Name, Kurzname|null, Klasse]
const LISTE = [
  ["immaterielleVG", "Immaterielle Vermögensgegenstände", null, 0],
  ["grundUndBoden", "Grund und Boden", null, 0],
  ["gebaeude", "Gebäude", null, 0],
  ["fuhrpark", "Fuhrpark", null, 0],
  ["maschinen", "Technische Anlagen und Maschinen", null, 0],
  ["bga", "Betriebs- und Geschäftsausstattung (BGA)", "BGA", 0],
  ["gwg", "Geringwertige Wirtschaftsgüter (GWG)", "GWG", 0],
  ["beteiligungen", "Beteiligungen", null, 0],
  ["wertpapiere", "Wertpapiere", null, 0],
  ["darlehensforderungen", "Darlehensforderungen", null, 0],

  ["warenbestand", "Warenbestandskonto (WBK)", "WBK", 1],
  ["geleisteteAnzahlungen", "Geleistete Anzahlungen", null, 1],
  ["forderungenLuL", "Forderungen aus L.u.L.", null, 1],
  ["forderungenGewSt", "Forderungen aus Gewerbesteuerüberzahlungen", "Forderungen GewSt", 1],
  ["sonstigeForderungen", "Sonstige Forderungen", null, 1],
  ["forderungenMitarbeiter", "Forderungen gegen Mitarbeiter (Vorschüsse)", "Vorschüsse", 1],
  ["vorsteuer", "Vorsteuer", null, 1],
  ["nichtVerrechenbareVorsteuer", "Noch nicht verrechenbare Vorsteuer", null, 1],
  ["kasse", "Kasse", null, 1],
  ["bank", "Bank", null, 1],
  ["arap", "Aktive Rechnungsabgrenzung (ARAP)", "ARAP", 1],

  ["eigenkapital", "Eigenkapital", null, 2],
  ["privatentnahmen", "Privatentnahmen", null, 2],
  ["privateinlagen", "Privateinlagen", null, 2],

  ["darlehensverbindlichkeiten", "Darlehensverbindlichkeiten", null, 3],
  ["erhalteneAnzahlungen", "Erhaltene Anzahlungen", null, 3],
  ["verbindlichkeitenLuL", "Verbindlichkeiten aus L.u.L.", null, 3],
  ["verbindlichkeitenSteuern", "Verbindlichkeiten aus Steuern und Abgaben", null, 3],
  ["verbindlichkeitenSV", "Verbindlichkeiten im Rahmen der sozialen Sicherheit", "Verbindlichkeiten soziale Sicherheit", 3],
  ["sonstigeVerbindlichkeiten", "Sonstige Verbindlichkeiten", null, 3],
  ["umsatzsteuer", "Umsatzsteuer", null, 3],
  ["nichtFaelligeUmsatzsteuer", "Noch nicht fällige Umsatzsteuer", null, 3],
  ["prap", "Passive Rechnungsabgrenzung (PRAP)", "PRAP", 3],

  ["umsatzerloese", "Umsatzerlöse (WVK)", "WVK", 4],
  ["erloesschmaelerungen", "Erlösschmälerungen", null, 4],
  ["gewaehrteSkonti", "Gewährte Skonti", null, 4],
  ["gewaehrteBoni", "Gewährte Boni", null, 4],
  ["mietertraege", "Mieterträge", null, 4],
  ["zinsertraege", "Zinserträge", null, 4],
  ["provisionserloese", "Provisionserlöse", null, 4],
  ["sonstigeErtraege", "Sonstige betriebliche Erträge", null, 4],
  ["ertraegeZuschreibung", "Erträge aus Zuschreibung des AV", "Erträge Zuschreibung AV", 4],
  ["ertraegeAbgangAV", "Erträge aus Abgängen des AV", null, 4],
  ["warenentnahmen", "Entnahmen für Zwecke außerhalb des Unternehmens (Warenentnahmen)", "Warenentnahmen", 4],
  ["privateKfzNutzung", "Verwendung von Gegenständen für Zwecke außerhalb des Unternehmens (private Kfz-Nutzung)", "Private Kfz-Nutzung", 4],

  ["wareneingang", "Wareneingang (WEK)", "WEK", 5],
  ["bestandsveraenderung", "Bestandsveränderungskonto (BVK)", "BVK", 5],
  ["warenbezugskosten", "Warenbezugskosten", null, 5],
  ["preisnachlaesse", "Preisnachlässe", null, 5],
  ["erhalteneSkonti", "Erhaltene Skonti", null, 5],
  ["erhalteneBoni", "Erhaltene Boni", null, 5],
  ["warenverluste", "Warenverluste", null, 5],
  ["warenvertriebskosten", "Warenvertriebskosten", null, 5],
  ["afa", "Absetzungen für Abnutzung (AfA)", "AfA", 5],
  ["ausserplanmaessigeAbschreibung", "Außerplanmäßige Abschreibungen", null, 5],
  ["afaa", "AfaA", null, 5],
  ["sofortabschreibungGWG", "Sofortabschreibung GWG", null, 5],
  ["aufwendungenAbgangAV", "Aufwendungen aus Abgängen des AV", null, 5],
  ["provisionsaufwendungen", "Provisionsaufwendungen", null, 5],
  ["sonstigeAufwendungen", "Sonstige betriebliche Aufwendungen", null, 5],
  ["avk", "Allgemeine Verwaltungskosten (AVK)", "AVK", 5],
  ["mietaufwendungen", "Mietaufwendungen", null, 5],
  ["raumkosten", "Raumkosten", null, 5],
  ["energie", "Energieaufwendungen", null, 5],
  ["reparatur", "Reparaturaufwendungen", null, 5],
  ["kfzKosten", "Kfz-Kosten", null, 5],
  ["reisekosten", "Reisekosten", null, 5],
  ["telefon", "Telefon", null, 5],
  ["buerobedarf", "Bürobedarf", null, 5],
  ["zinsaufwendungen", "Zinsaufwendungen", null, 5],
  ["loehne", "Löhne und Gehälter", null, 5],
  ["sozialeAbgaben", "Gesetzliche soziale Aufwendungen", null, 5],
  ["rechtsBeratung", "Rechts- und Beratungskosten", null, 5],

  ["ebk", "Eröffnungsbilanzkonto (EBK)", "EBK", 9],
  ["sbk", "Schlussbilanzkonto (SBK)", "SBK", 9],
  ["guv", "Gewinn- und Verlustkonto (GuV)", "GuV", 9],
];

const ARTEN = {
  aktiv: { name: "Aktives Bestandskonto", kurz: "Aktiv", regel: "Anfangsbestand und Zugänge im Soll, Abgänge im Haben" },
  passiv: { name: "Passives Bestandskonto", kurz: "Passiv", regel: "Anfangsbestand und Zugänge im Haben, Abgänge im Soll" },
  eigenkapital: { name: "Eigenkapitalkonto", kurz: "EK", regel: "Anfangsbestand und Mehrungen im Haben, Minderungen im Soll" },
  privat: { name: "Privatkonto (Unterkonto EK)", kurz: "Privat", regel: "" },
  aufwand: { name: "Aufwandskonto", kurz: "Aufwand", regel: "Aufwendungen im Soll" },
  ertrag: { name: "Ertragskonto", kurz: "Ertrag", regel: "Erträge im Haben" },
  erfolg: { name: "Erfolgskonto (Aufwand oder Ertrag)", kurz: "Erfolg", regel: "Bestandsmehrung im Haben (Ertrag), Bestandsminderung im Soll (Aufwand)" },
  abschluss: { name: "Abschlusskonto", kurz: "Abschluss", regel: "Gegenkonto der Eröffnungs- bzw. Abschlussbuchungen" },
};

const HINWEISE = {
  erloesschmaelerungen: "Unterkonto des WVK – mindert die Erlöse, daher Buchung im Soll. Abschluss: WVK an Erlösschmälerungen.",
  gewaehrteSkonti: "Unterkonto des WVK – mindert die Erlöse, daher Buchung im Soll. Abschluss: WVK an Gewährte Skonti.",
  gewaehrteBoni: "Unterkonto des WVK – mindert die Erlöse, daher Buchung im Soll. Abschluss: WVK an Gewährte Boni.",
  preisnachlaesse: "Unterkonto des WEK – mindert den Wareneinsatz, daher Buchung im Haben. Abschluss: Preisnachlässe an WEK.",
  erhalteneSkonti: "Unterkonto des WEK – mindert den Wareneinsatz, daher Buchung im Haben. Abschluss: Erhaltene Skonti an WEK.",
  erhalteneBoni: "Unterkonto des WEK – mindert den Wareneinsatz, daher Buchung im Haben. Abschluss: Erhaltene Boni an WEK.",
  warenbezugskosten: "Unterkonto des WEK (Anschaffungsnebenkosten, § 255 I 2 HGB). Abschluss: WEK an Warenbezugskosten.",
  warenvertriebskosten: "Kein Unterkonto des WVK – wird direkt über die GuV abgeschlossen.",
  bestandsveraenderung: "Mehrung: WBK an BVK; Minderung: BVK an WBK. Abschluss über das WEK.",
  warenbestand: "Im Laufe des Jahres keine Buchungen – nur Anfangsbestand und Inventur-Endbestand.",
  vorsteuer: "Forderung gegenüber dem Finanzamt.",
  umsatzsteuer: "Verbindlichkeit gegenüber dem Finanzamt.",
  loehne: "Bruttolohn bzw. Bruttogehalt – auch die einbehaltenen Steuern und Arbeitnehmeranteile gehören zum Aufwand.",
  sozialeAbgaben: "Arbeitgeberanteil zur Sozialversicherung – zusätzlicher Personalaufwand neben dem Bruttolohn.",
  verbindlichkeitenSV: "Einbehaltene Arbeitnehmeranteile und Arbeitgeberanteile, bis sie an die Krankenkasse abgeführt sind.",
  forderungenMitarbeiter: "Gezahlter Vorschuss – wird bei der nächsten Lohnabrechnung verrechnet (im Haben).",
  privatentnahmen: "Mindert das Eigenkapital. Abschluss: Eigenkapital an Privatentnahmen.",
  privateinlagen: "Mehrt das Eigenkapital. Abschluss: Privateinlagen an Eigenkapital.",
  warenentnahmen: "Unentgeltliche Wertabgabe – Ertragskonto, Gegenbuchung i.d.R. Privatentnahmen; USt beachten.",
  privateKfzNutzung: "Unentgeltliche Wertabgabe – Ertragskonto, Gegenbuchung i.d.R. Privatentnahmen; USt beachten.",
  ebk: "Gegenkonto der Eröffnungsbuchungen (Spiegelbild der Eröffnungsbilanz).",
  sbk: "Gegenkonto der Abschlussbuchungen aller Bestandskonten.",
  guv: "Sammelt die Salden der Erfolgskonten; Abschluss über das Eigenkapital.",
};

function artVon(id, klasse) {
  if (klasse <= 1) return "aktiv";
  if (klasse === 2) return id === "eigenkapital" ? "eigenkapital" : "privat";
  if (klasse === 3) return "passiv";
  if (klasse === 4) return "ertrag";
  if (klasse === 9) return "abschluss";
  return id === "bestandsveraenderung" ? "erfolg" : "aufwand";
}

export const KONTEN = {};
for (const [id, name, kurz, klasse] of LISTE) {
  const art = artVon(id, klasse);
  let regel = ARTEN[art].regel;
  if (art === "privat") regel = id === "privatentnahmen" ? "Entnahmen im Soll" : "Einlagen im Haben";
  KONTEN[id] = { id, name, kurz: kurz || name, klasse, art, artName: ARTEN[art].name, artKurz: ARTEN[art].kurz, regel, hinweis: HINWEISE[id] || null };
}

export const KLASSEN = [0, 1, 2, 3, 4, 5, 9];
export const KLASSEN_TITEL = {
  0: "Kontenklasse 0 – Anlagevermögen",
  1: "Kontenklasse 1 – Umlaufvermögen",
  2: "Kontenklasse 2 – Eigenkapitalkonten",
  3: "Kontenklasse 3 – Fremdkapitalkonten",
  4: "Kontenklasse 4 – Betriebliche Erträge",
  5: "Kontenklasse 5 – Betriebliche Aufwendungen",
  9: "Abschlusskonten",
};

export const kontenInKlasse = (k) => LISTE.filter((e) => e[3] === k).map((e) => KONTEN[e[0]]);
export const K = (id) => {
  const k = KONTEN[id];
  if (!k) throw new Error("Unbekanntes Konto: " + id);
  return k;
};
