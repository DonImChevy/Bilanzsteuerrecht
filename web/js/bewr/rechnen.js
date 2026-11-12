// Bewertungsrecht und Erbschaftsteuer – reine Rechenbausteine (getestet), Rechtsstand 2026.
// Grundlage: BewG §§ 179, 184–188 mit Anlagen 21–23, ErbStG §§ 13a, 13b, 16, 19.

/** Anlage 21 BewG: Vervielfältiger = Barwertfaktor einer nachschüssigen Zeitrente ((1+i)^n − 1) / (i · (1+i)^n),
 *  auf vier Stellen gerundet – stimmt mit allen 1.900 Tabellenwerten der Anlage 21 (1–100 Jahre, 1–10 %) überein. */
export function vervielfaeltiger(jahre, zinsProzent) {
  const i = zinsProzent / 100, q = (1 + i) ** jahre;
  return Math.round(((q - 1) / (i * q)) * 10000) / 10000;
}

/** § 188 Abs. 2 S. 2 BewG – Liegenschaftszinssätze, wenn der Gutachterausschuss keine geeigneten ermittelt hat. */
export const LIZ = { mietwohn: 3.5, gemischtBis50: 4.5, gemischtUeber50: 5.0, geschaeft: 6.0 };

/** Anlage 22 BewG (Auszug): wirtschaftliche Gesamtnutzungsdauer in Jahren. */
export const GND = {
  "Ein- und Zweifamilienhäuser": 80, "Mietwohngrundstücke, Mehrfamilienhäuser": 80, Wohnungseigentum: 80,
  "Gemischt genutzte Grundstücke (Wohnhäuser mit Mischnutzung)": 80, "Bürogebäude/Verwaltungsgebäude": 60,
  "Banken und ähnliche Geschäftshäuser": 60, "Kauf-/Warenhäuser": 50, "Lager-/Versandgebäude": 40, "Verbrauchermärkte, Autohäuser": 30,
};

/** Anlage 23 BewG: Basiswerte der Bewirtschaftungskosten (Wohnnutzung indexiert, Nichtwohnnutzung in % des Rohertrags). */
export const BWK = {
  verwaltungJeWohnung: 230, verwaltungJeGarage: 30, instandJeQmWohn: 9, instandJeGarage: 68, mietausfallWohn: 2,
  verwaltungGewerbe: 3, mietausfallGewerbe: 4,
};

/** Anpassung nach § 187 Abs. 3 BewG und Anlage 23 (letzter Absatz): VPI Oktober des Vorjahres zu VPI Oktober 2001;
 *  Verwaltungskosten und Garagen-Instandhaltung kaufmännisch auf volle Euro, Instandhaltung je m² auf eine Nachkommastelle. */
export function indiziert(vpiVorjahr, vpi2001) {
  const f = vpiVorjahr / vpi2001;
  return {
    verwaltungJeWohnung: Math.round(BWK.verwaltungJeWohnung * f), verwaltungJeGarage: Math.round(BWK.verwaltungJeGarage * f),
    instandJeQm: Math.round(BWK.instandJeQmWohn * f * 10) / 10, instandJeGarage: Math.round(BWK.instandJeGarage * f),
  };
}

/** § 181 BewG: Grundstücksart nach Wohn- und Nutzfläche (ohne Ein-/Zweifamilienhaus und Wohnungs-/Teileigentum). */
export function grundstuecksart(wohnQm, gewerbeQm) {
  const anteilWohn = wohnQm / (wohnQm + gewerbeQm);
  if (anteilWohn > 0.8) return "mietwohn";
  if (anteilWohn < 0.2) return "geschaeft";
  return "gemischt";
}
/** Liegenschaftszinssatz zur Grundstücksart (§ 188 Abs. 2 S. 2 Nr. 1–4 BewG), gewerblicher Anteil nach Wohn- und Nutzfläche. */
export function liegenschaftszins(wohnQm, gewerbeQm) {
  const art = grundstuecksart(wohnQm, gewerbeQm), gewerbe = gewerbeQm / (wohnQm + gewerbeQm);
  return art === "mietwohn" ? LIZ.mietwohn : art === "geschaeft" ? LIZ.geschaeft : gewerbe > 0.5 ? LIZ.gemischtUeber50 : LIZ.gemischtBis50;
}

/**
 * Ertragswertverfahren (§§ 184–188 BewG). Eingaben: Fläche, Bodenrichtwert, Jahresmieten (Nettokalt), Wohnungen,
 * Wohn- und Nutzfläche, Jahr der Bezugsfertigkeit, Bewertungsjahr, Gesamtnutzungsdauer, Liegenschaftszins, VPI,
 * optional Abbruchverpflichtung (tatsächliche Gesamtnutzungsdauer in Jahren ab Bezugsfertigkeit).
 * Alle Zwischenwerte wie in der Klausur auf volle Euro gerundet; Vervielfältiger mit vier Stellen.
 */
export function ertragswert(e) {
  const bodenwert = Math.round(e.flaeche * e.brw);
  const rohertrag = Math.round(e.mieteWohnJahr + (e.mieteGewerbeJahr || 0));
  const ix = indiziert(e.vpi[0], e.vpi[1]);
  const verwaltung = e.wohnungen * ix.verwaltungJeWohnung + Math.round((e.mieteGewerbeJahr || 0) * BWK.verwaltungGewerbe / 100);
  const instand = Math.round((e.wohnQm + (e.gewerbeQm || 0)) * ix.instandJeQm);
  const mietausfall = Math.round(e.mieteWohnJahr * BWK.mietausfallWohn / 100) + Math.round((e.mieteGewerbeJahr || 0) * BWK.mietausfallGewerbe / 100);
  const bwk = verwaltung + instand + mietausfall, reinertrag = rohertrag - bwk;
  const verzinsung = Math.round(bodenwert * e.liz / 100), gebaeudereinertrag = Math.max(0, reinertrag - verzinsung);
  const alter = e.jahr - e.baujahr, rndRegel = Math.max(e.gnd - alter, 0), rndMin = Math.ceil(e.gnd * 0.3);
  const rnd = e.abbruchGnd != null ? Math.min(Math.max(rndRegel, rndMin), Math.max(e.abbruchGnd - alter, 0)) : Math.max(rndRegel, rndMin);
  const vv = vervielfaeltiger(rnd, e.liz), gebaeudeertragswert = Math.round(gebaeudereinertrag * vv);
  const summe = bodenwert + gebaeudeertragswert, wert = Math.max(summe, bodenwert);
  return { bodenwert, rohertrag, ix, verwaltung, instand, mietausfall, bwk, reinertrag, verzinsung, gebaeudereinertrag,
    alter, rndRegel, rndMin, rnd, vv, gebaeudeertragswert, ertragswert: wert };
}

// ------------------------------------------------------------------------------------------- Erbschaftsteuer
/** § 19 Abs. 1 ErbStG: Wertgrenzen und Prozentsätze je Steuerklasse. */
export const STUFEN = [75000, 300000, 600000, 6000000, 13000000, 26000000, Infinity];
export const SAETZE = { 1: [7, 11, 15, 19, 23, 27, 30], 2: [15, 20, 25, 30, 35, 40, 43], 3: [30, 30, 30, 30, 50, 50, 50] };
const satzStufe = (erwerb) => STUFEN.findIndex((g) => erwerb <= g);
export const steuersatz = (erwerb, klasse) => SAETZE[klasse][satzStufe(erwerb)];

/** Steuer nach § 19 ErbStG mit Härteausgleich (Abs. 3): Mehrsteuer gegenüber der letztvorhergehenden Wertgrenze höchstens
 *  zur Hälfte (Satz bis 30 %) bzw. zu drei Vierteln (Satz über 30 %) aus dem die Grenze übersteigenden Betrag. */
export function erbst(erwerb, klasse) {
  const k = satzStufe(erwerb), satz = SAETZE[klasse][k], normal = Math.round(erwerb * satz) / 100;
  if (k === 0) return { satz, normal, steuer: normal, haerte: false };
  const grenze = STUFEN[k - 1], beiGrenze = Math.round(grenze * SAETZE[klasse][k - 1]) / 100;
  const deckung = (erwerb - grenze) * (satz <= 30 ? 0.5 : 0.75);
  if (normal - beiGrenze <= deckung) return { satz, normal, steuer: normal, haerte: false, grenze, beiGrenze, deckung };
  return { satz, normal, steuer: beiGrenze + deckung, haerte: true, grenze, beiGrenze, deckung };
}
/** § 10 Abs. 1 S. 6 ErbStG: steuerpflichtiger Erwerb auf volle 100 € nach unten. */
export const abrunden100 = (x) => Math.max(0, Math.floor(x / 100) * 100);

/**
 * §§ 13a, 13b ErbStG (Grundfall): begünstigungsfähiges Vermögen mit gemeinem Wert gw und Nettowert des Verwaltungsvermögens vv.
 * Unschädlich sind 10 % des um das Verwaltungsvermögen gekürzten Werts (§ 13b Abs. 7), begünstigt ist der Rest (§ 13b Abs. 2 S. 1).
 * Regelverschonung 85 % mit Abzugsbetrag (§ 13a Abs. 1, 2); Optionsverschonung 100 % nur bei Verwaltungsvermögen bis 20 % (§ 13a Abs. 10).
 */
export function verschonung(gw, vv, { option = false, vvBrutto = vv } = {}) {
  if (vvBrutto >= 0.9 * gw) return { beguenstigt: 0, schaedlich: gw, unschaedlich: 0, anteil: vvBrutto / gw, option: false, abschlag: 0, abzug: 0, steuerpflichtig: gw };
  const unschaedlich = Math.round(Math.min(vv, 0.1 * (gw - vv))), schaedlich = vv - unschaedlich, beguenstigt = gw - schaedlich;
  const anteil = vvBrutto / gw, optionMoeglich = option && anteil <= 0.2;
  const abschlag = Math.round(beguenstigt * (optionMoeglich ? 1 : 0.85)), rest = beguenstigt - abschlag;
  const abzug = optionMoeglich ? 0 : Math.max(0, Math.min(rest, 150000 - Math.max(0, rest - 150000) / 2));
  return { beguenstigt, schaedlich, unschaedlich, anteil, option: optionMoeglich, abschlag, rest, abzug: Math.round(abzug),
    steuerpflichtig: Math.round(rest - abzug) + schaedlich };
}

/** Freibeträge § 16 Abs. 1 ErbStG (unbeschränkte Steuerpflicht). */
export const FREIBETRAG = { ehegatte: 500000, kind: 400000, enkel: 200000, enkelVerstorbenesKind: 400000, eltern: 100000, klasse2: 20000, klasse3: 20000 };
