// Probeklausuren Umsatzsteuer (GS I) – drei vollständige Klausuren à 180 Minuten.
// Eigene Sachverhalte nach Aufbau, Prüfungsschema und Bewertungslogik der Semesterklausuren (Vorspann/Allgemeines,
// 5–6 Sachverhalte, Urteilsstil „… gem. § …, da …“). Kein Klausurtext übernommen. Rechtsstand 2026 (UStG Stand 29.06.2026).
// Alle Beträge werden hier berechnet (bmgAus, ustAus …), damit Sachverhalt, Lösung und Bogen nie auseinanderlaufen.
// Bewertung: [Punkte, Merkmal, Erwartet] – „Erwartet“ ist der Maßstab für die Selbstkontrolle.

const r2 = (x) => Math.round(x * 100 + Number.EPSILON * 100) / 100;
const e = (x) => r2(x).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
/** Brutto → BMG und USt (BMG gerundet, USt = Brutto − BMG, wie in den Lösungshinweisen). */
const aus = (brutto, satz) => { const bmg = r2((brutto * 100) / (100 + satz)); return { bmg, ust: r2(brutto - bmg) }; };
const auf = (netto, satz) => r2((netto * satz) / 100);

export const VORBEMERKUNGEN_UST = [
  "Die Sachverhalte sind nach dem Rechtsstand 2026 zu beurteilen. Voranmeldungszeitraum (VAZ) ist der Kalendermonat; die Unternehmer versteuern nach vereinbarten Entgelten (§ 16 Abs. 1 S. 1 UStG).",
  "Zu würdigen sind jeweils: Leistungsart, Ort, Steuerbarkeit, Steuerbefreiung bzw. Steuersatz, Bemessungsgrundlage, Höhe und Entstehung der Steuer, Steuerschuldner; bei steuerfreien Umsätzen BMG und VAZ der Anmeldung; beim Vorsteuerabzug Recht, Höhe und VAZ.",
  "Rechnungen und Verträge entsprechen den gesetzlichen Anforderungen, soweit der Sachverhalt nichts anderes sagt; erforderliche Nachweise liegen vor. Die §§ 19, 20, 24 und 25a UStG sind nicht anzuwenden.",
  "Alle Beteiligten wollen umsatzsteuerlich das günstigste Ergebnis und üben Wahlrechte entsprechend aus. Eingangsleistungen werden, soweit möglich, dem Unternehmen zugeordnet.",
];

const fest = (id, titel, min, f) => ({ id, titel, min, teil: 1, fest: true, erzeugen: f });

// ===================================================================================== Klausur A – Fahrradhaus
const A_VORSPANN = "Nora Nolte (N) betreibt in Kassel das „Fahrradhaus Nolte“: Verkauf von Fahrrädern und E-Bikes, eine Werkstatt und einen Fahrradverleih. Außerdem gehört ihr eine Ferienwohnung in Westerland (Sylt), die sie über ein Buchungsportal vermietet und selbst nicht nutzt. N beschäftigt zwei Angestellte.";

const a0 = fest("ust-a0", "Allgemeines – Unternehmereigenschaft", 10, () => ({
  sv: "Siehe Vorspann.",
  aufgaben: ["Gehen Sie auf die Unternehmereigenschaft von N und den Umfang ihres Unternehmens ein."],
  loesung: [
    "N ist Unternehmerin gem. § 2 Abs. 1 S. 1 UStG, da sie als natürliche Person eine gewerbliche Tätigkeit selbständig ausübt; gewerblich ist sie, weil sie nachhaltig zur Erzielung von Einnahmen tätig wird (§ 2 Abs. 1 S. 3 UStG).",
    "Selbständig ist sie, da sie in kein fremdes Unternehmen eingegliedert und an keine Weisungen gebunden ist (Umkehrschluss aus § 2 Abs. 2 Nr. 1 UStG).",
    "Zum Unternehmen gehört gem. § 2 Abs. 1 S. 2 UStG ihre gesamte gewerbliche Tätigkeit: Handel, Werkstatt, Verleih und die Vermietung der Ferienwohnung auf Sylt (ein Unternehmer hat nur ein Unternehmen).",
  ],
  bewertung: [
    [1, "Unternehmerin gem. § 2 Abs. 1 S. 1 UStG", "natürliche Person, gewerbliche Tätigkeit, Norm genannt"],
    [1.5, "Merkmale begründet: selbständig, nachhaltig, Einnahmeerzielungsabsicht", "§ 2 Abs. 1 S. 3 UStG; Selbständigkeit ggf. mit § 2 Abs. 2 Nr. 1 UStG"],
    [1.5, "Unternehmensumfang: alle Tätigkeiten einschließlich Ferienwohnung", "§ 2 Abs. 1 S. 2 UStG – Handel, Werkstatt, Verleih, Vermietung = ein Unternehmen"],
  ],
}));

const a1 = fest("ust-a1", "Verkauf von E-Bikes und Fahrrädern", 45, () => {
  const g = aus(3570, 19), anz = aus(595, 19), rest = { bmg: r2(g.bmg - anz.bmg), ust: r2(g.ust - anz.ust) };
  const t = aus(1190 + 238, 19);
  const k = aus(9520, 19), sk = r2(9520 * 0.02), skA = aus(sk, 19);
  return {
    sv: "a) Am 12.05.2026 bestellt die Privatkundin Clara Christ (C) aus Göttingen ein E-Bike zum Preis von 3.570 € (einschließlich USt) und zahlt bei Bestellung bar eine Anzahlung von 595 €. N bringt das E-Bike am 03.06.2026 mit dem eigenen Transporter von Kassel nach Göttingen und übergibt es dort. C überweist den Rest am 10.06.2026.\n" +
      "b) Am 20.07.2026 kauft der Privatmann Theo Tamm (T) ein Citybike, das N für 1.428 € (einschließlich USt) anbietet. N nimmt das gebrauchte Fahrrad des T für 238 € in Zahlung; dieser Betrag entspricht dem gemeinen Wert des Altrads. T zahlt 1.190 € bar und nimmt das Citybike sofort mit.\n" +
      "c) Am 28.08.2026 holt die Kurierdienst Flink GmbH (Kassel) vier Lastenräder bei N ab. Die Rechnung vom selben Tag lautet über 8.000 € zuzüglich 1.520 € USt. Die GmbH überweist am 15.09.2026 unter zulässigem Abzug von 2 % Skonto 9.329,60 €.",
    aufgaben: ["Beurteilen Sie die Vorgänge a) bis c) für N."],
    loesung: [
      `a) N verschafft C die Verfügungsmacht am E-Bike und erbringt damit eine Lieferung gem. § 3 Abs. 1 UStG. Da N das Rad selbst befördert, gilt die Lieferung gem. § 3 Abs. 6 S. 1, 2 UStG dort als ausgeführt, wo die Beförderung beginnt: in Kassel, im Inland gem. § 1 Abs. 2 S. 1 UStG. Die Lieferung erfolgt gegen Entgelt im Rahmen des Unternehmens und ist daher steuerbar gem. § 1 Abs. 1 Nr. 1 UStG; mangels Befreiung nach § 4 UStG ist sie steuerpflichtig. Steuersatz 19 % gem. § 12 Abs. 1 UStG.`,
      `BMG ist das Entgelt gem. § 10 Abs. 1 S. 1, 2 UStG: 3.570 € : 1,19 = ${e(g.bmg)}; USt ${e(g.ust)}.`,
      `Die Anzahlung von 595 € wird vor Ausführung der Lieferung vereinnahmt; insoweit entsteht die USt von ${e(anz.ust)} (BMG ${e(anz.bmg)}) gem. § 13 Abs. 1 Nr. 1 Buchst. a S. 4 UStG mit Ablauf des VAZ Mai 2026. Die restliche USt von ${e(rest.ust)} (BMG ${e(rest.bmg)}) entsteht gem. § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG mit Ablauf des VAZ Juni 2026 (Lieferung am 03.06.2026). Steuerschuldnerin ist N gem. § 13a Abs. 1 Nr. 1 UStG.`,
      `b) Mit dem Citybike liefert N an T gem. § 3 Abs. 1 UStG; Ort gem. § 3 Abs. 6 S. 1, 2 UStG in Kassel (T befördert selbst), steuerbar gem. § 1 Abs. 1 Nr. 1 UStG und steuerpflichtig, 19 % gem. § 12 Abs. 1 UStG. Da das Entgelt teilweise in der Lieferung des Altrads besteht, liegt ein Tausch mit Baraufgabe vor (§ 3 Abs. 12 S. 1 UStG). Gem. § 10 Abs. 2 S. 2 UStG gilt der Wert des Altrads (gemeiner Wert 238 €) als Entgelt; hinzu kommt die Baraufgabe von 1.190 €.`,
      `BMG: (1.190 € + 238 €) : 1,19 = ${e(t.bmg)}; USt ${e(t.ust)}, entstanden gem. § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG mit Ablauf des VAZ Juli 2026. Aus dem Erwerb des Altrads hat N keinen Vorsteuerabzug, da T kein Unternehmer ist (§ 15 Abs. 1 S. 1 Nr. 1 S. 1 UStG); die Hingabe des Altrads durch T ist mangels Unternehmereigenschaft nicht steuerbar.`,
      `c) Lieferung gem. § 3 Abs. 1 UStG; Ort gem. § 3 Abs. 6 S. 1 UStG in Kassel (die GmbH holt ab und befördert), steuerbar und steuerpflichtig, 19 %. BMG gem. § 10 Abs. 1 S. 1, 2 UStG ${e(k.bmg)}; USt ${e(k.ust)}, entstanden mit Ablauf des VAZ August 2026 (§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG).`,
      `Der Skontoabzug von ${e(sk)} mindert die BMG um ${e(skA.bmg)} (§ 17 Abs. 1 S. 1 UStG). N hat ihre USt um ${e(skA.ust)} zu berichtigen, und zwar für den VAZ September 2026, in dem die Änderung eingetreten ist (§ 17 Abs. 1 S. 8 UStG).`,
    ],
    bewertung: [
      [1.5, "a) Lieferung, Beförderungslieferung, Ort Kassel", "§ 3 Abs. 1, § 3 Abs. 6 S. 1, 2 UStG; Beginn der Beförderung in Kassel = Inland (§ 1 Abs. 2 S. 1 UStG)"],
      [1, "a) steuerbar und steuerpflichtig, 19 %", "§ 1 Abs. 1 Nr. 1, § 4 (keine Befreiung), § 12 Abs. 1 UStG"],
      [2, `a) BMG ${e(g.bmg)}, USt ${e(g.ust)}`, "§ 10 Abs. 1 S. 1, 2 UStG – Herausrechnen aus dem Bruttopreis"],
      [3, `a) Anzahlung: ${e(anz.ust)} USt mit Ablauf Mai 2026`, "§ 13 Abs. 1 Nr. 1 Buchst. a S. 4 UStG – Vereinnahmung vor Leistung"],
      [1.5, `a) Rest ${e(rest.ust)} USt mit Ablauf Juni 2026; Steuerschuldnerin N`, "§ 13 Abs. 1 Nr. 1 Buchst. a S. 1, § 13a Abs. 1 Nr. 1 UStG"],
      [1, "b) Lieferung, Ort Kassel, steuerbar, steuerpflichtig, 19 %", "§ 3 Abs. 1, Abs. 6 S. 1, 2, § 1 Abs. 1 Nr. 1, § 12 Abs. 1 UStG"],
      [2.5, "b) Tausch mit Baraufgabe erkannt", "§ 3 Abs. 12 S. 1 UStG – Entgelt besteht teilweise in einer Lieferung"],
      [2.5, `b) BMG ${e(t.bmg)} (Altrad + Baraufgabe), USt ${e(t.ust)}`, "§ 10 Abs. 2 S. 2 UStG – gemeiner Wert 238 € + 1.190 €, dann : 1,19; Entstehung Juli 2026"],
      [1.5, "b) kein Vorsteuerabzug aus dem Altrad", "T ist kein Unternehmer (§ 15 Abs. 1 S. 1 Nr. 1 UStG); sein Umsatz ist nicht steuerbar"],
      [1.5, `c) Lieferung, Ort Kassel, BMG ${e(k.bmg)}, USt ${e(k.ust)}, Entstehung August 2026`, "§ 3 Abs. 6 S. 1, § 10 Abs. 1, § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG"],
      [2.5, `c) Skonto: BMG −${e(skA.bmg)}, USt −${e(skA.ust)}`, "§ 17 Abs. 1 S. 1 UStG – Minderung der BMG"],
      [1.5, "c) Berichtigung im VAZ September 2026", "§ 17 Abs. 1 S. 8 UStG – VAZ, in dem die Änderung eintritt (Zahlung 15.09.)"],
    ],
    zahlen: [
      { frage: "a) USt Mai 2026 (€)", wert: anz.ust, toleranz: 0.02 },
      { frage: "b) BMG Citybike (€)", wert: t.bmg, toleranz: 0.02 },
      { frage: "c) USt-Berichtigung (€)", wert: skA.ust, toleranz: 0.02 },
    ],
  };
});

const a2 = fest("ust-a2", "Werkstatt und Fahrradverleih", 35, () => {
  const i = aus(238, 19), v = aus(210, 19);
  return {
    sv: "a) Am 06.03.2026 führt die Werkstatt für den Privatkunden Paul Peters (Kassel) eine Inspektion an seinem E-Bike durch (Einstellen von Bremsen und Schaltung, Prüfung des Akkus, keine Ersatzteile). P bezahlt bei Abholung 238 €.\n" +
      "b) Die niederländische Fahrradverleih B.V. (Enschede, Niederlande) lässt im April 2026 zehn ihrer Mietfahrräder in der Werkstatt in Kassel reparieren. Die B.V. hat unter ihrer niederländischen USt-IdNr. bestellt; die Arbeiten sind am 24.04.2026 abgeschlossen. N berechnet 1.500 € (ohne Ersatzteile).\n" +
      "c) Ein Ehepaar aus Hamburg mietet vom 14.08. bis 16.08.2026 (3 Tage) zwei E-Bikes, die es im Laden in Kassel übernimmt und dort zurückgibt. N berechnet 35 € je Rad und Tag einschließlich USt; das Ehepaar zahlt bei Rückgabe.",
    aufgaben: ["Beurteilen Sie die Vorgänge a) bis c) für N."],
    loesung: [
      `a) Die Inspektion ist eine sonstige Leistung gem. § 3 Abs. 9 S. 1 UStG (keine Verschaffung der Verfügungsmacht). Es handelt sich um eine Arbeit an einem beweglichen körperlichen Gegenstand für einen Nichtunternehmer; sie wird gem. § 3a Abs. 3 Nr. 3a Buchst. b UStG dort ausgeführt, wo N tätig wird: in Kassel (Inland, § 1 Abs. 2 S. 1 UStG). Steuerbar gem. § 1 Abs. 1 Nr. 1 UStG, steuerpflichtig, 19 % (§ 12 Abs. 1 UStG).`,
      `BMG gem. § 10 Abs. 1 S. 1, 2 UStG: 238 € : 1,19 = ${e(i.bmg)}; USt ${e(i.ust)}, entstanden mit Ablauf des VAZ März 2026 (§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG); Steuerschuldnerin N (§ 13a Abs. 1 Nr. 1 UStG).`,
      `b) Die Reparatur ist eine sonstige Leistung gem. § 3 Abs. 9 S. 1 UStG an einen Unternehmer für dessen Unternehmen (Verwendung der USt-IdNr.). Ort gem. § 3a Abs. 2 S. 1 UStG ist der Sitz des Empfängers in Enschede, also nicht im Inland; § 3a Abs. 3 Nr. 3a Buchst. b UStG gilt nur gegenüber Nichtunternehmern. Der Umsatz ist in Deutschland nicht steuerbar (§ 1 Abs. 1 Nr. 1 UStG). Die Steuer schuldet in den Niederlanden die B.V. als Leistungsempfängerin; N stellt eine Rechnung mit dem Hinweis „Steuerschuldnerschaft des Leistungsempfängers“ aus (§ 14a Abs. 1 UStG).`,
      `c) Die Vermietung der E-Bikes ist eine sonstige Leistung gem. § 3 Abs. 9 S. 1 UStG. Fahrräder sind Beförderungsmittel; bei einer kurzfristigen Vermietung (nicht mehr als 30 Tage) ist der Ort gem. § 3a Abs. 3 Nr. 2 S. 1, 2 Buchst. b UStG dort, wo die Räder tatsächlich zur Verfügung gestellt werden: in Kassel (Inland). Steuerbar gem. § 1 Abs. 1 Nr. 1 UStG, steuerpflichtig, 19 %.`,
      `Entgelt 2 Räder × 3 Tage × 35 € = 210 €; BMG 210 € : 1,19 = ${e(v.bmg)}; USt ${e(v.ust)}, entstanden mit Ablauf des VAZ August 2026 (§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG).`,
    ],
    bewertung: [
      [1, "a) sonstige Leistung", "§ 3 Abs. 9 S. 1 UStG – keine Verschaffung der Verfügungsmacht"],
      [2.5, "a) Ort: Arbeit an beweglichem Gegenstand für Privatperson, Kassel", "§ 3a Abs. 3 Nr. 3a Buchst. b UStG – Tätigkeitsort"],
      [1, "a) steuerbar, steuerpflichtig, 19 %", "§ 1 Abs. 1 Nr. 1, § 12 Abs. 1 UStG"],
      [1.5, `a) BMG ${e(i.bmg)}, USt ${e(i.ust)}, Entstehung März 2026`, "§ 10 Abs. 1, § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG"],
      [1, "b) sonstige Leistung an Unternehmer für dessen Unternehmen", "Bezug unter der USt-IdNr."],
      [3, "b) Ort Enschede, in Deutschland nicht steuerbar", "§ 3a Abs. 2 S. 1 UStG (B2B-Grundregel), nicht § 3a Abs. 3 Nr. 3a UStG"],
      [1, "b) Steuerschuld beim Empfänger in den Niederlanden, Rechnungshinweis", "§ 14a Abs. 1 UStG – „Steuerschuldnerschaft des Leistungsempfängers“"],
      [1, "c) Vermietung = sonstige Leistung", "§ 3 Abs. 9 S. 1 UStG"],
      [3, "c) kurzfristige Vermietung eines Beförderungsmittels, Ort Kassel", "§ 3a Abs. 3 Nr. 2 S. 1, 2 Buchst. b UStG – Übergabeort, höchstens 30 Tage"],
      [1.5, `c) BMG ${e(v.bmg)}, USt ${e(v.ust)}`, "210 € : 1,19; § 10 Abs. 1 UStG"],
      [1, "c) Entstehung mit Ablauf August 2026", "§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG"],
    ],
    zahlen: [{ frage: "c) USt Verleih (€)", wert: v.ust, toleranz: 0.02 }],
  };
});

const a3 = fest("ust-a3", "Ferienwohnung auf Sylt", 25, () => {
  const g = aus(1498, 7), anz = aus(428, 7), rest = { bmg: r2(g.bmg - anz.bmg), ust: r2(g.ust - anz.ust) }, w = aus(238, 19);
  return {
    sv: "a) Familie Berger aus Köln mietet die Ferienwohnung vom 01.07. bis 14.07.2026 für insgesamt 1.498 €. Sie zahlt am 15.03.2026 eine Anzahlung von 428 €, den Rest bei der Anreise.\n" +
      "b) Ab dem 01.10.2026 vermietet N die Wohnung für zunächst ein Jahr an einen Krankenpfleger, der dort wohnt. Die Miete beträgt 950 € monatlich und wird jeweils am Monatsersten gezahlt.\n" +
      "c) Für die Feriengäste kauft N am 10.06.2026 neue Bettwäsche. Die Rechnung des Händlers vom selben Tag lautet über 200 € zuzüglich 38 € USt.",
    aufgaben: ["Beurteilen Sie die Vorgänge a) bis c) für N."],
    loesung: [
      `a) Die Vermietung ist eine sonstige Leistung gem. § 3 Abs. 9 S. 1 UStG. Ort gem. § 3a Abs. 3 Nr. 1 S. 1, S. 2 Buchst. a UStG am Belegenheitsort Westerland (Inland). Steuerbar gem. § 1 Abs. 1 Nr. 1 UStG. Die Befreiung nach § 4 Nr. 12 S. 1 Buchst. a UStG greift nicht, da N Wohnräume zur kurzfristigen Beherbergung von Fremden vermietet (§ 4 Nr. 12 S. 2 UStG); steuerpflichtig zum ermäßigten Satz von 7 % gem. § 12 Abs. 2 Nr. 11 S. 1 UStG.`,
      `BMG 1.498 € : 1,07 = ${e(g.bmg)}; USt ${e(g.ust)}. Für die Anzahlung entsteht die USt von ${e(anz.ust)} gem. § 13 Abs. 1 Nr. 1 Buchst. a S. 4 UStG mit Ablauf des VAZ März 2026; der Rest von ${e(rest.ust)} entsteht mit Ablauf des VAZ Juli 2026, da die Leistung mit Ende der Mietzeit am 14.07.2026 ausgeführt ist (§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG).`,
      `b) Sonstige Leistung, Ort Westerland (§ 3a Abs. 3 Nr. 1 S. 1, 2 Buchst. a UStG), steuerbar. Die Vermietung zu Wohnzwecken über ein Jahr dient nicht der kurzfristigen Beherbergung und ist steuerfrei gem. § 4 Nr. 12 S. 1 Buchst. a UStG. Ein Verzicht nach § 9 Abs. 1 UStG ist nicht möglich, da der Mieter kein Unternehmer ist.`,
      `Es liegen Teilleistungen vor (monatlich vereinbartes Entgelt, § 13 Abs. 1 Nr. 1 Buchst. a S. 2, 3 UStG). Die BMG von je 950 € (§ 10 Abs. 1 UStG) ist in den VAZ Oktober, November und Dezember 2026 anzumelden.`,
      `c) N bezieht eine Lieferung von einem anderen Unternehmer für ihr Unternehmen und besitzt eine Rechnung (§ 15 Abs. 1 S. 1 Nr. 1 S. 1, 2 UStG). Die Bettwäsche dient der steuerpflichtigen kurzfristigen Vermietung; ein Ausschluss nach § 15 Abs. 2 UStG besteht nicht. Vorsteuer ${e(w.ust)} im VAZ Juni 2026 (Lieferung und Rechnung am 10.06.2026).`,
    ],
    bewertung: [
      [1.5, "a) sonstige Leistung, Ort Belegenheit Sylt", "§ 3 Abs. 9, § 3a Abs. 3 Nr. 1 S. 1, 2 Buchst. a UStG"],
      [2.5, "a) keine Befreiung: kurzfristige Beherbergung", "§ 4 Nr. 12 S. 2 UStG (Ausnahme von S. 1 Buchst. a)"],
      [1.5, "a) 7 %", "§ 12 Abs. 2 Nr. 11 S. 1 UStG"],
      [2, `a) BMG ${e(g.bmg)}; ${e(anz.ust)} USt März, ${e(rest.ust)} USt Juli 2026`, "§ 10 Abs. 1; § 13 Abs. 1 Nr. 1 Buchst. a S. 4 bzw. S. 1 UStG"],
      [2.5, "b) langfristige Wohnraumvermietung steuerfrei, keine Option", "§ 4 Nr. 12 S. 1 Buchst. a UStG; § 9 Abs. 1 UStG scheitert (Mieter kein Unternehmer)"],
      [1.5, "b) Teilleistungen, BMG 950 € je Monat, VAZ 10–12/2026", "§ 13 Abs. 1 Nr. 1 Buchst. a S. 2, 3 UStG"],
      [2, `c) Vorsteuer ${e(w.ust)} im VAZ Juni 2026`, "§ 15 Abs. 1 S. 1 Nr. 1 S. 1, 2 UStG; kein Ausschluss nach § 15 Abs. 2 UStG, da steuerpflichtige Verwendung"],
    ],
    zahlen: [{ frage: "a) USt Juli 2026 (€)", wert: rest.ust, toleranz: 0.02 }],
  };
});

const a4 = fest("ust-a4", "Entnahme, Privatnutzung, Zuwendung", 35, () => {
  const ent = auf(320, 19), pkwM = r2(35000 * 0.01 * 0.8), pkwU = auf(pkwM, 19);
  return {
    sv: "a) Am 18.09.2026 nimmt N ein Kinderfahrrad aus dem Lager und schenkt es ihrem Enkel. N hatte das Rad im März 2026 für 300 € zuzüglich USt eingekauft und die Vorsteuer abgezogen. Im September 2026 kostet ein gleichartiges Rad im Einkauf 320 € zuzüglich USt; im Laden wird es für 476 € angeboten.\n" +
      "b) Seit dem 02.01.2026 gehört ein Pkw mit Verbrennungsmotor (Bruttolistenpreis 35.000 €) vollständig zum Unternehmen; N hat die Vorsteuer aus dem Kauf voll abgezogen. Sie nutzt den Wagen auch privat; ein Fahrtenbuch führt sie nicht.\n" +
      "c) Zum 40. Geburtstag ihres Mechanikers am 05.11.2026 schenkt N ihm einen Fahrradhelm aus dem Sortiment (Einkaufspreis 45 € zuzüglich USt, Vorsteuer abgezogen).",
    aufgaben: ["Beurteilen Sie die Vorgänge a) bis c) für N (Pkw: für das Kalenderjahr 2026)."],
    loesung: [
      `a) Die Entnahme des Rads für private Zwecke ist gem. § 3 Abs. 1b S. 1 Nr. 1 UStG einer Lieferung gegen Entgelt gleichgestellt, da das Rad zum vollen Vorsteuerabzug berechtigt hat (§ 3 Abs. 1b S. 2 UStG). Die Entnahme erfolgt in Kassel, also im Inland (§ 1 Abs. 2 S. 1 UStG); sie ist steuerbar gem. § 1 Abs. 1 Nr. 1 UStG und steuerpflichtig, 19 % (§ 12 Abs. 1 UStG).`,
      `BMG ist gem. § 10 Abs. 4 S. 1 Nr. 1 UStG der Einkaufspreis zum Zeitpunkt der Entnahme: 320 € (nicht die historischen 300 €, nicht der Verkaufspreis). USt ${e(ent)}, entstanden gem. § 13 Abs. 1 Nr. 2 UStG mit Ablauf des VAZ September 2026; Steuerschuldnerin N (§ 13a Abs. 1 Nr. 1 UStG).`,
      `b) Die Privatnutzung des voll dem Unternehmen zugeordneten Pkw, der zum Vorsteuerabzug berechtigt hat, ist gem. § 3 Abs. 9a Nr. 1 UStG einer sonstigen Leistung gegen Entgelt gleichgestellt; Ort gem. § 3a Abs. 1 S. 1 UStG in Kassel, steuerbar und steuerpflichtig, 19 %.`,
      `BMG sind die vorsteuerbelasteten Ausgaben (§ 10 Abs. 4 S. 1 Nr. 2 UStG). Ohne Fahrtenbuch darf N vom ertragsteuerlichen 1-%-Wert ausgehen und für nicht vorsteuerbelastete Kosten pauschal 20 % abziehen (Abschn. 15.23 Abs. 5 UStAE): 1 % × 35.000 € = 350 € − 20 % = ${e(pkwM)} monatlich; USt ${e(pkwU)} monatlich. Für 2026: BMG ${e(pkwM * 12)}, USt ${e(pkwU * 12)}. Die Steuer entsteht jeweils mit Ablauf des Monats der Nutzung (§ 13 Abs. 1 Nr. 2 UStG).`,
      `c) Eine unentgeltliche Zuwendung an das Personal ist gem. § 3 Abs. 1b S. 1 Nr. 2 UStG nur steuerbar, sofern keine Aufmerksamkeit vorliegt. Der Helm (45 € netto = 53,55 € brutto) ist ein Geschenk aus besonderem persönlichem Anlass bis 60 € und damit eine Aufmerksamkeit (Abschn. 1.8 Abs. 3 UStAE). Die Zuwendung ist nicht steuerbar; der Vorsteuerabzug aus dem Einkauf bleibt bestehen.`,
    ],
    bewertung: [
      [2, "a) Entnahme gleichgestellt; Vorsteuerabzug als Voraussetzung", "§ 3 Abs. 1b S. 1 Nr. 1 und S. 2 UStG"],
      [1, "a) steuerbar, steuerpflichtig, 19 %", "§ 1 Abs. 1 Nr. 1, § 12 Abs. 1 UStG"],
      [3, `a) BMG 320 € (Einkaufspreis im Entnahmezeitpunkt), USt ${e(ent)}`, "§ 10 Abs. 4 S. 1 Nr. 1 UStG – weder 300 € noch 476 €"],
      [1, "a) Entstehung mit Ablauf September 2026", "§ 13 Abs. 1 Nr. 2 UStG"],
      [2, "b) Privatnutzung als sonstige Leistung gleichgestellt", "§ 3 Abs. 9a Nr. 1 UStG; Ort § 3a Abs. 1 S. 1 UStG"],
      [3, `b) BMG ${e(pkwM)} je Monat (1 % abzgl. 20 %), USt ${e(pkwU)} je Monat`, "§ 10 Abs. 4 S. 1 Nr. 2 UStG i. V. m. Abschn. 15.23 Abs. 5 UStAE"],
      [1, `b) Jahreswerte 2026: BMG ${e(pkwM * 12)}, USt ${e(pkwU * 12)}; Entstehung monatlich`, "§ 13 Abs. 1 Nr. 2 UStG"],
      [1.5, "c) Zuwendung an Personal grundsätzlich § 3 Abs. 1b S. 1 Nr. 2 UStG", "Norm und Ausnahme „Aufmerksamkeiten“ genannt"],
      [2.5, "c) Aufmerksamkeit (persönlicher Anlass, bis 60 €) → nicht steuerbar", "Abschn. 1.8 Abs. 3 UStAE; 53,55 € brutto ≤ 60 €"],
    ],
    zahlen: [{ frage: "b) USt Privatnutzung 2026 (€)", wert: r2(pkwU * 12), toleranz: 0.05 }],
  };
});

const a5 = fest("ust-a5", "Eingangsleistungen und Vorsteuer", 30, () => {
  const rc = auf(2000, 19), kb = aus(178.5, 19);
  return {
    sv: "a) Für die Werkstatt erhält N am 28.01.2026 eine Montagehebebühne. Die Rechnung des Lieferanten aus Fulda datiert vom 02.02.2026 und lautet über 4.000 € zuzüglich 760 € USt; N bezahlt am 20.02.2026.\n" +
      "b) Ein Webdesigner aus Kopenhagen (Dänemark, Unternehmer) erstellt für N einen neuen Online-Auftritt. Die Arbeiten sind am 15.04.2026 abgeschlossen. Seine Rechnung vom 30.04.2026 lautet über 2.000 € ohne USt mit dem Hinweis „Steuerschuldnerschaft des Leistungsempfängers“. N hat ihm ihre deutsche USt-IdNr. mitgeteilt.\n" +
      "c) Am 23.11.2026 kauft N in einem Baumarkt in Kassel Schmierstoffe und Werkzeug für die Werkstatt und zahlt bar 178,50 €. Der Kassenbon enthält Name und Anschrift des Baumarkts, das Datum, Menge und Art der Waren, den Bruttobetrag und den Hinweis „enthält 19 % USt“, aber keinen Namen der N.",
    aufgaben: ["Beurteilen Sie die Vorgänge a) bis c) für N."],
    loesung: [
      `a) N bezieht eine Lieferung von einem anderen Unternehmer für ihr Unternehmen; die Rechnung liegt vor (§ 15 Abs. 1 S. 1 Nr. 1 S. 1, 2 UStG). Die Hebebühne dient steuerpflichtigen Umsätzen; ein Ausschluss nach § 15 Abs. 2 UStG besteht nicht. Vorsteuer 760 €. Abziehbar erst im VAZ Februar 2026, da erst dann Lieferung (28.01.) und Rechnung (02.02.) gemeinsam vorliegen; auf die Zahlung kommt es nicht an.`,
      `b) Die Webdesign-Leistung ist eine sonstige Leistung (§ 3 Abs. 9 S. 1 UStG) an einen Unternehmer für dessen Unternehmen; Ort gem. § 3a Abs. 2 S. 1 UStG in Kassel. Sie ist steuerbar (§ 1 Abs. 1 Nr. 1 UStG) und steuerpflichtig, 19 %. Da der Leistende im übrigen Gemeinschaftsgebiet ansässig ist, schuldet N als Leistungsempfängerin die Steuer (§ 13b Abs. 1, Abs. 5 S. 1 UStG).`,
      `BMG 2.000 € (§ 10 Abs. 1 UStG; Nettobetrag, da keine USt enthalten ist); USt ${e(rc)}, entstanden mit Ablauf des VAZ April 2026, in dem die Leistung ausgeführt wurde (§ 13b Abs. 1 UStG). Zugleich hat N gem. § 15 Abs. 1 S. 1 Nr. 4 UStG einen Vorsteuerabzug von ${e(rc)} im VAZ April 2026 (keine Rechnung erforderlich); per Saldo keine Belastung.`,
      `c) Lieferung von einem anderen Unternehmer für das Unternehmen. Der Kassenbon ist eine Kleinbetragsrechnung (Gesamtbetrag bis 250 €): Name und Anschrift des Leistungsempfängers sind nicht erforderlich; Entgelt und Steuer dürfen in einer Summe stehen, wenn der Steuersatz angegeben ist (§ 33 UStDV). Vorsteuer 178,50 € × 19/119 = ${e(kb.ust)} im VAZ November 2026 (§ 15 Abs. 1 S. 1 Nr. 1 UStG; § 35 Abs. 1 UStDV).`,
    ],
    bewertung: [
      [1.5, "a) Voraussetzungen Vorsteuerabzug: Lieferung, anderer Unternehmer, für das Unternehmen, Rechnung", "§ 15 Abs. 1 S. 1 Nr. 1 S. 1, 2 UStG"],
      [2.5, "a) 760 € erst im VAZ Februar 2026 (Rechnung)", "beide Voraussetzungen erst am 02.02.; Zahlung unerheblich"],
      [1, "b) sonstige Leistung an Unternehmer", "§ 3 Abs. 9 S. 1 UStG"],
      [1.5, "b) Ort Kassel, steuerbar, steuerpflichtig", "§ 3a Abs. 2 S. 1, § 1 Abs. 1 Nr. 1 UStG"],
      [3, "b) N schuldet die Steuer (Reverse Charge)", "§ 13b Abs. 1, Abs. 5 S. 1 UStG – Leistender im übrigen Gemeinschaftsgebiet"],
      [1.5, `b) USt ${e(rc)} auf 2.000 € netto, Entstehung April 2026`, "§ 13b Abs. 1 UStG – Ablauf des VAZ der Ausführung"],
      [2, `b) Vorsteuer ${e(rc)} im VAZ April 2026`, "§ 15 Abs. 1 S. 1 Nr. 4 UStG"],
      [3, `c) Kleinbetragsrechnung, Vorsteuer ${e(kb.ust)} im November 2026`, "§ 33 UStDV (bis 250 € brutto), Herausrechnen 178,50 × 19/119"],
    ],
    zahlen: [{ frage: "c) Vorsteuer Baumarkt (€)", wert: kb.ust, toleranz: 0.02 }],
  };
});

// ===================================================================================== Klausur B – Rösterei-Café
const B_VORSPANN = "Ben Brandt (B) betreibt in Lüneburg die Kaffeerösterei „Bohne & Brot“ mit einem Café (Bedienung an Tischen), einem Ladenverkauf und einem Online-Shop. Daneben gibt er Barista-Kurse. B ist Eigentümer des viergeschossigen Geschäftshauses Am Sande 7 in Lüneburg, das er 2018 errichtet und insgesamt seinem Unternehmen zugeordnet hat.";

const b0 = fest("ust-b0", "Allgemeines – Unternehmereigenschaft", 10, () => ({
  sv: "Siehe Vorspann.",
  aufgaben: ["Gehen Sie auf die Unternehmereigenschaft von B und den Umfang seines Unternehmens ein."],
  loesung: [
    "B ist Unternehmer gem. § 2 Abs. 1 S. 1 UStG, da er als natürliche Person selbständig eine gewerbliche Tätigkeit ausübt, nämlich nachhaltig zur Erzielung von Einnahmen (§ 2 Abs. 1 S. 3 UStG).",
    "Sein Unternehmen umfasst gem. § 2 Abs. 1 S. 2 UStG die gesamte gewerbliche Tätigkeit: Rösterei mit Café, Laden und Online-Shop, die Kurse sowie die Vermietung im Geschäftshaus.",
  ],
  bewertung: [
    [1, "Unternehmer gem. § 2 Abs. 1 S. 1 UStG", "natürliche Person, selbständig, gewerblich"],
    [1.5, "Merkmale nachhaltig und Einnahmeerzielungsabsicht", "§ 2 Abs. 1 S. 3 UStG"],
    [1.5, "ein Unternehmen: Café, Laden, Online-Shop, Kurse, Vermietung", "§ 2 Abs. 1 S. 2 UStG"],
  ],
}));

const b1 = fest("ust-b1", "Café, Online-Shop und Gutschein", 40, () => {
  const sp = aus(1284, 7), gt = aus(1071, 19), on = aus(214, 7), gs = aus(32.1, 7);
  return {
    sv: "a) Am Samstag, 13.06.2026, nimmt B im Café für Speisen (Frühstück, Kuchen) 1.284 € und für Getränke (Kaffee-, Tee- und Saftgetränke) 1.071 € ein, jeweils einschließlich USt. Die Gäste verzehren alles an den Tischen und werden bedient.\n" +
      "b) Ein Privatkunde aus München bestellt im Online-Shop zehn Packungen gerösteter Kaffeebohnen für 203,30 € zuzüglich einer Versandkostenpauschale von 10,70 €. Der Kunde bestellt und bezahlt am 20.09.2026 (insgesamt 214 €); B übergibt das Paket am 22.09.2026 in Lüneburg an DHL.\n" +
      "c) Am 18.12.2026 verkauft B im Laden einen Gutschein „1 kg Hausmischung, Kaffeebohnen – einzulösen im Laden Am Sande“ für 32,10 €. Die Beschenkte löst ihn am 08.01.2027 ein und nimmt die Bohnen mit.",
    aufgaben: ["Beurteilen Sie die Vorgänge a) bis c) für B für das Jahr 2026."],
    loesung: [
      `a) Die Abgabe von Speisen und Getränken zum Verzehr an Ort und Stelle mit Bedienung ist eine sonstige Leistung (Restaurationsleistung, § 3 Abs. 9 S. 1 UStG; Abschn. 3.6 UStAE). Ort gem. § 3a Abs. 3 Nr. 3a Buchst. a UStG dort, wo B sie tatsächlich erbringt: Lüneburg (Inland). Steuerbar gem. § 1 Abs. 1 Nr. 1 UStG, steuerpflichtig.`,
      `Seit 2026 gilt für Restaurant- und Verpflegungsdienstleistungen der ermäßigte Satz von 7 %, ausgenommen die Abgabe von Getränken (§ 12 Abs. 2 Nr. 15 UStG). Speisen: BMG 1.284 € : 1,07 = ${e(sp.bmg)}, USt ${e(sp.ust)}. Getränke 19 % (§ 12 Abs. 1 UStG): BMG 1.071 € : 1,19 = ${e(gt.bmg)}, USt ${e(gt.ust)}. Entstehung mit Ablauf des VAZ Juni 2026 (§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG); Steuerschuldner B (§ 13a Abs. 1 Nr. 1 UStG).`,
      `b) Lieferung gem. § 3 Abs. 1 UStG. Da DHL als selbständiger Beauftragter befördert, liegt eine Versendungslieferung vor; Ort gem. § 3 Abs. 6 S. 1, 3, 4 UStG mit Übergabe an DHL in Lüneburg (Inland). Steuerbar und steuerpflichtig. Kaffee unterliegt gem. § 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2 lfd. Nr. 12 dem Satz von 7 %. Die Versandpauschale ist unselbständige Nebenleistung zur Lieferung (Abschn. 3.10 Abs. 5 UStAE) und teilt deren Steuersatz.`,
      `BMG (203,30 € + 10,70 €) : 1,07 = ${e(on.bmg)}; USt ${e(on.ust)}. Die Zahlung am 20.09. geht der Lieferung voraus (Anzahlung, § 13 Abs. 1 Nr. 1 Buchst. a S. 4 UStG); da Vereinnahmung und Lieferung in denselben VAZ fallen, entsteht die USt mit Ablauf des VAZ September 2026.`,
      `c) Der Gutschein ist ein Einzweck-Gutschein, da Ort (Abholung im Laden in Lüneburg) und geschuldete Steuer (7 % für Kaffeebohnen) bei Ausstellung feststehen (§ 3 Abs. 14 S. 1 UStG). Seine Übertragung gilt bereits als Lieferung der Bohnen (§ 3 Abs. 14 S. 2 UStG): steuerbar, steuerpflichtig, 7 %. BMG 32,10 € : 1,07 = ${e(gs.bmg)}; USt ${e(gs.ust)}, entstanden mit Ablauf des VAZ Dezember 2026. Die Einlösung 2027 ist kein eigener Umsatz (§ 3 Abs. 14 S. 5 UStG).`,
    ],
    bewertung: [
      [2, "a) Restaurationsleistung = sonstige Leistung", "§ 3 Abs. 9 S. 1 UStG; Verzehr an Ort und Stelle mit Bedienung (Abschn. 3.6 UStAE)"],
      [1.5, "a) Ort Lüneburg", "§ 3a Abs. 3 Nr. 3a Buchst. a UStG – Ort der tatsächlichen Erbringung"],
      [2.5, "a) Speisen 7 %, Getränke 19 %", "§ 12 Abs. 2 Nr. 15 UStG (ab 2026), Getränke ausgenommen → § 12 Abs. 1 UStG"],
      [2, `a) BMG/USt: ${e(sp.bmg)}/${e(sp.ust)} und ${e(gt.bmg)}/${e(gt.ust)}, Juni 2026`, "getrennt herausgerechnet; § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG"],
      [2, "b) Versendungslieferung, Ort Lüneburg", "§ 3 Abs. 6 S. 1, 3, 4 UStG – Übergabe an DHL"],
      [1.5, "b) 7 % für Kaffee", "§ 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2 lfd. Nr. 12"],
      [2, `b) Versand als Nebenleistung; BMG ${e(on.bmg)}, USt ${e(on.ust)}`, "Abschn. 3.10 Abs. 5 UStAE; Pauschale gehört zum Entgelt (§ 10 Abs. 1 S. 2 UStG)"],
      [1, "b) Entstehung September 2026", "§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 bzw. S. 4 UStG"],
      [2, "c) Einzweck-Gutschein", "§ 3 Abs. 14 S. 1 UStG – Ort und Steuer stehen bei Ausstellung fest"],
      [2, `c) Übertragung = Lieferung, USt ${e(gs.ust)} im Dezember 2026`, "§ 3 Abs. 14 S. 2 UStG; Einlösung 2027 kein eigener Umsatz (S. 5)"],
      [1.5, "c) BMG und Steuersatz richtig", `${e(gs.bmg)}, 7 %`],
    ],
    zahlen: [{ frage: "a) USt auf die Getränke (€)", wert: gt.ust, toleranz: 0.02 }, { frage: "c) USt Gutschein (€)", wert: gs.ust, toleranz: 0.02 }],
  };
});

const b2 = fest("ust-b2", "Barista-Kurse", 25, () => {
  const k = aus(8 * 119, 19);
  return {
    sv: "a) Am 07.03.2026 veranstaltet B im Café einen Barista-Grundkurs für acht Privatpersonen. Jede Person zahlt 119 €; enthalten sind ein Skript und eine Kaffeeverkostung während des Kurses.\n" +
      "b) Am 10.11.2026 schult B die Servicekräfte der Hotel Hanseblick GmbH in deren Hotel in Hamburg. Die GmbH hat die Schulung für ihren Betrieb bestellt. B berechnet 1.500 € zuzüglich 285 € USt.",
    aufgaben: ["Beurteilen Sie die Vorgänge a) und b) für B."],
    loesung: [
      `a) Der Kurs ist eine sonstige Leistung (§ 3 Abs. 9 S. 1 UStG); Skript und Verkostung sind unselbständige Nebenleistungen und teilen das Schicksal der Hauptleistung (Abschn. 3.10 Abs. 5 UStAE). Als unterrichtende Leistung an Nichtunternehmer wird der Kurs gem. § 3a Abs. 3 Nr. 3 S. 1 UStG dort ausgeführt, wo B tätig wird: in Lüneburg (Inland). Steuerbar gem. § 1 Abs. 1 Nr. 1 UStG; eine Befreiung (insbesondere § 4 Nr. 21 UStG) liegt nicht vor – steuerpflichtig, 19 %.`,
      `BMG 8 × 119 € = 952 € : 1,19 = ${e(k.bmg)}; USt ${e(k.ust)}, entstanden mit Ablauf des VAZ März 2026 (§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG).`,
      `b) Sonstige Leistung an einen Unternehmer für dessen Unternehmen. § 3a Abs. 3 Nr. 3 UStG gilt nur gegenüber Nichtunternehmern; Ort ist daher gem. § 3a Abs. 2 S. 1 UStG der Sitz der GmbH in Hamburg (Inland). Steuerbar, steuerpflichtig, 19 %. BMG 1.500 € (§ 10 Abs. 1 UStG), USt 285 €, entstanden mit Ablauf des VAZ November 2026.`,
    ],
    bewertung: [
      [1.5, "a) sonstige Leistung; Skript und Verkostung als Nebenleistungen", "§ 3 Abs. 9 S. 1 UStG; Abschn. 3.10 Abs. 5 UStAE"],
      [2.5, "a) Ort Lüneburg (unterrichtende Leistung an Nichtunternehmer)", "§ 3a Abs. 3 Nr. 3 S. 1 UStG – Tätigkeitsort"],
      [1, "a) steuerbar, steuerpflichtig, 19 %", "§ 1 Abs. 1 Nr. 1, § 12 Abs. 1 UStG; keine Befreiung"],
      [2, `a) BMG ${e(k.bmg)}, USt ${e(k.ust)}, März 2026`, "952 € : 1,19; § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG"],
      [2.5, "b) Ort nach B2B-Grundregel in Hamburg", "§ 3a Abs. 2 S. 1 UStG; § 3a Abs. 3 Nr. 3 UStG nur für Nichtunternehmer"],
      [1.5, "b) BMG 1.500 €, USt 285 €, November 2026", "§ 10 Abs. 1, § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG"],
    ],
    zahlen: [{ frage: "a) USt Grundkurs (€)", wert: k.ust, toleranz: 0.02 }],
  };
});

const b3 = fest("ust-b3", "Geschäftshaus Am Sande", 40, () => {
  const st = aus(120, 19);
  return {
    sv: "Das Geschäftshaus Am Sande 7 (vier gleich große Geschosse) wird seit Jahren unverändert wie folgt genutzt:\n" +
      "• Erdgeschoss: Café und Laden des B.\n" +
      "• 1. Obergeschoss: vermietet an die Steuerberaterin Dr. Sophie Stein für ihre Kanzlei; laut Mietvertrag 2.000 € zuzüglich 380 € USt monatlich.\n" +
      "• 2. Obergeschoss: vermietet an den Zahnarzt Jan Jansen für seine Praxis, 1.500 € monatlich.\n" +
      "• Dachgeschoss: vermietet an eine Studentin als Wohnung, 700 € monatlich.\n" +
      "• Zwei Pkw-Stellplätze im Hof: aufgrund eines gesonderten Vertrags an einen Nachbarn (Privatmann, kein Mieter im Haus) für zusammen 120 € monatlich.\n" +
      "Alle Mieten werden vereinbarungsgemäß monatlich gezahlt.",
    aufgaben: ["Beurteilen Sie die Nutzung des Geschäftshauses für B im Kalenderjahr 2026."],
    loesung: [
      "Erdgeschoss: Die Nutzung durch B selbst ist kein Leistungsaustausch, da es an einem Leistungsempfänger fehlt; es liegt ein nicht steuerbarer Innenumsatz vor (Abschn. 2.7 Abs. 1 S. 3 UStAE).",
      "Vermietungen allgemein: Die Vermietungen sind sonstige Leistungen (§ 3 Abs. 9 S. 2 UStG – Dulden). Ort gem. § 3a Abs. 3 Nr. 1 S. 1, S. 2 Buchst. a UStG am Belegenheitsort Lüneburg (Inland); gegen Entgelt im Rahmen des Unternehmens → steuerbar gem. § 1 Abs. 1 Nr. 1 UStG. Grundsätzlich steuerfrei gem. § 4 Nr. 12 S. 1 Buchst. a UStG. Da die Entgelte monatlich vereinbart sind, liegen Teilleistungen vor (§ 13 Abs. 1 Nr. 1 Buchst. a S. 2, 3 UStG).",
      "1. OG: Die Vermietung an die Steuerberaterin erfolgt an eine Unternehmerin für deren Unternehmen – Verzicht nach § 9 Abs. 1 UStG möglich. Die Kanzlei erzielt steuerpflichtige Umsätze, die den Vorsteuerabzug nicht ausschließen, daher ist der Verzicht auch nach § 9 Abs. 2 S. 1 UStG zulässig; B hat optiert (USt im Vertrag ausgewiesen). Steuerpflichtig, 19 % (§ 12 Abs. 1 UStG): BMG 2.000 € monatlich, USt 380 € monatlich, entstanden jeweils mit Ablauf des Monats (§ 13 Abs. 1 Nr. 1 Buchst. a S. 1–3 UStG); für 2026 BMG 24.000 €, USt 4.560 €.",
      "2. OG: Der Zahnarzt ist Unternehmer, erzielt aber steuerfreie Heilbehandlungsumsätze (§ 4 Nr. 14 Buchst. a UStG), die den Vorsteuerabzug ausschließen (§ 15 Abs. 2 S. 1 Nr. 1 UStG). Ein Verzicht ist nach § 9 Abs. 2 S. 1 UStG ausgeschlossen. Steuerfrei; BMG 1.500 € monatlich in den VAZ Januar bis Dezember 2026 anzumelden.",
      "Dachgeschoss: Die Studentin ist keine Unternehmerin – kein Verzicht möglich (§ 9 Abs. 1 UStG). Steuerfrei gem. § 4 Nr. 12 S. 1 Buchst. a UStG; BMG 700 € monatlich, VAZ Januar bis Dezember 2026.",
      `Stellplätze: Die Vermietung von Plätzen für das Abstellen von Fahrzeugen ist nicht befreit (§ 4 Nr. 12 S. 2 UStG). Eine Nebenleistung zu einer steuerfreien Wohnungsvermietung liegt nicht vor, weil der Nachbar keine Räume im Haus mietet (Abschn. 4.12.2 Abs. 3 UStAE). Steuerpflichtig, 19 %: BMG 120 € : 1,19 = ${e(st.bmg)}, USt ${e(st.ust)} je Monat; Entstehung jeweils mit Ablauf des Monats.`,
    ],
    bewertung: [
      [2, "EG: nicht steuerbarer Innenumsatz", "kein Leistungsaustausch mit sich selbst (Abschn. 2.7 Abs. 1 S. 3 UStAE)"],
      [2, "Vermietung = sonstige Leistung, Ort Belegenheit, steuerbar", "§ 3 Abs. 9, § 3a Abs. 3 Nr. 1 S. 1, 2 Buchst. a, § 1 Abs. 1 Nr. 1 UStG"],
      [1.5, "Grundsatz: steuerfrei; Teilleistungen", "§ 4 Nr. 12 S. 1 Buchst. a; § 13 Abs. 1 Nr. 1 Buchst. a S. 2, 3 UStG"],
      [3, "1. OG: Option zulässig (Unternehmerin, vorsteuerunschädliche Umsätze)", "§ 9 Abs. 1 und Abs. 2 S. 1 UStG geprüft"],
      [2, "1. OG: BMG 2.000 €, USt 380 € je Monat, 2026: 4.560 €", "§ 12 Abs. 1, § 13 Abs. 1 Nr. 1 Buchst. a S. 1–3 UStG"],
      [3, "2. OG: Option ausgeschlossen wegen steuerfreier Zahnarztumsätze", "§ 9 Abs. 2 S. 1 i. V. m. § 4 Nr. 14 Buchst. a, § 15 Abs. 2 S. 1 Nr. 1 UStG"],
      [1, "2. OG: BMG 1.500 € monatlich anmelden", "VAZ Januar bis Dezember 2026"],
      [2, "DG: steuerfrei, keine Option (Mieterin keine Unternehmerin)", "§ 4 Nr. 12 S. 1 Buchst. a, § 9 Abs. 1 UStG; BMG 700 € je Monat"],
      [2.5, "Stellplätze: nicht befreit, keine Nebenleistung", "§ 4 Nr. 12 S. 2 UStG; gesonderter Vertrag mit Nichtmieter"],
      [3, `Stellplätze: BMG ${e(st.bmg)}, USt ${e(st.ust)} je Monat`, "120 € : 1,19; monatliche Entstehung"],
    ],
    zahlen: [{ frage: "USt Stellplätze je Monat (€)", wert: st.ust, toleranz: 0.02 }],
  };
});

const b4 = fest("ust-b4", "Skonto und Forderungsausfall", 30, () => {
  const sk = r2(5350 * 0.03), skA = aus(sk, 7), quote = aus(214, 7);
  return {
    sv: "a) Am 20.05.2026 bringt B mit dem eigenen Lieferwagen 250 kg Kaffeebohnen zum Hotel Seeblick GmbH in Lüneburg. Die Rechnung vom selben Tag lautet über 5.000 € zuzüglich 350 € USt. Das Hotel zahlt am 05.06.2026 unter zulässigem Abzug von 3 % Skonto 5.189,50 €.\n" +
      "b) Am 14.07.2026 liefert B Kaffeebohnen an das Restaurant „Da Toni“ in Lüneburg (Rechnung: 2.000 € zuzüglich 140 € USt, Abholung durch den Inhaber). Am 10.11.2026 wird über das Vermögen des Inhabers das Insolvenzverfahren eröffnet; mit einer Zahlung ist nicht mehr zu rechnen. Am 12.02.2027 erhält B vom Insolvenzverwalter überraschend eine Quote von 214 €.",
    aufgaben: ["Beurteilen Sie die Vorgänge a) und b) für B (bei b) auch mit Blick auf 2027)."],
    loesung: [
      `a) Lieferung gem. § 3 Abs. 1 UStG; B befördert selbst, Ort gem. § 3 Abs. 6 S. 1, 2 UStG in Lüneburg. Steuerbar, steuerpflichtig, 7 % (§ 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2 lfd. Nr. 12). BMG 5.000 €, USt 350 €, entstanden mit Ablauf des VAZ Mai 2026.`,
      `Durch den Skontoabzug von ${e(sk)} mindert sich die BMG um ${e(skA.bmg)} (§ 17 Abs. 1 S. 1 UStG). B berichtigt seine USt um ${e(skA.ust)} im VAZ Juni 2026, in dem die Änderung eingetreten ist (§ 17 Abs. 1 S. 8 UStG).`,
      `b) Lieferung, Ort Lüneburg (§ 3 Abs. 6 S. 1 UStG, Abholung), steuerbar, steuerpflichtig, 7 %; BMG 2.000 €, USt 140 €, entstanden mit Ablauf des VAZ Juli 2026 (Sollversteuerung, auf die Zahlung kommt es nicht an).`,
      `Mit Eröffnung des Insolvenzverfahrens ist das Entgelt uneinbringlich. B hat die USt gem. § 17 Abs. 2 Nr. 1 S. 1 i. V. m. Abs. 1 S. 1 UStG um 140 € zu berichtigen, und zwar im VAZ November 2026 (§ 17 Abs. 1 S. 8 UStG).`,
      `Wird das Entgelt nachträglich vereinnahmt, ist erneut zu berichtigen (§ 17 Abs. 2 Nr. 1 S. 2 UStG): Auf die Quote von 214 € entfällt USt von 214 € × 7/107 = ${e(quote.ust)}, die B im VAZ Februar 2027 schuldet.`,
    ],
    bewertung: [
      [2, "a) Lieferung, Ort Lüneburg, 7 %, BMG 5.000 €, USt 350 € im Mai 2026", "§ 3 Abs. 6 S. 1, 2, § 12 Abs. 2 Nr. 1 i. V. m. Anlage 2 UStG"],
      [2.5, `a) Skonto mindert BMG um ${e(skA.bmg)}, USt um ${e(skA.ust)}`, "§ 17 Abs. 1 S. 1 UStG"],
      [1.5, "a) Berichtigung im VAZ Juni 2026", "§ 17 Abs. 1 S. 8 UStG"],
      [1.5, "b) Lieferung Juli 2026: USt 140 € unabhängig von der Zahlung", "Sollversteuerung, § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG"],
      [3, "b) Uneinbringlichkeit → Berichtigung −140 € im November 2026", "§ 17 Abs. 2 Nr. 1 S. 1 i. V. m. Abs. 1 S. 1, 8 UStG"],
      [3, `b) Quote 2027: erneute Berichtigung, USt ${e(quote.ust)} im Februar 2027`, "§ 17 Abs. 2 Nr. 1 S. 2 UStG; 214 € × 7/107"],
      [1.5, "Rechenweg mit dem richtigen Steuersatz (7 %)", "Herausrechnen mit 107 bzw. 1,07"],
    ],
    zahlen: [{ frage: "a) USt-Minderung Skonto (€)", wert: skA.ust, toleranz: 0.02 }, { frage: "b) USt auf die Quote 2027 (€)", wert: quote.ust, toleranz: 0.02 }],
  };
});

const b5 = fest("ust-b5", "Vorsteuer: Anzahlung, Bewirtung, falscher Steuerausweis", 35, () => {
  const tueten = aus(535, 19);
  return {
    sv: "a) Für die Rösterei bestellt B bei einem Hersteller in Bremen eine neue Röstmaschine (Kaufpreis 40.000 € zuzüglich 7.600 € USt). Am 02.03.2026 erhält er eine Anzahlungsrechnung über 10.000 € zuzüglich 1.900 € USt und überweist 11.900 € am 10.03.2026. Die Maschine wird am 15.05.2026 geliefert; die Schlussrechnung vom selben Tag weist die Anzahlung ordnungsgemäß aus. Den Rest überweist B am 10.06.2026.\n" +
      "b) Am 22.04.2026 bewirtet B zwei Geschäftsfreunde in einem Restaurant. Die ordnungsgemäße Rechnung lautet: Speisen 200 € zuzüglich 14 € USt, Getränke 100 € zuzüglich 19 € USt. Die Aufwendungen sind angemessen und nachgewiesen.\n" +
      "c) Ein Lieferant aus Hannover liefert am 07.08.2026 bedruckte Kaffeetüten (Verpackungsmaterial). Seine Rechnung vom selben Tag lautet versehentlich über 500 € zuzüglich 7 % USt = 35 €, gesamt 535 €; B zahlt 535 €.",
    aufgaben: ["Beurteilen Sie für B jeweils Recht, Höhe und Zeitpunkt (VAZ) des Vorsteuerabzugs."],
    loesung: [
      "a) B bezieht eine Lieferung von einem anderen Unternehmer für sein Unternehmen; die Maschine dient steuerpflichtigen Umsätzen (kein Ausschluss nach § 15 Abs. 2 UStG). Die auf die Anzahlung entfallende Steuer von 1.900 € ist abziehbar, sobald die Rechnung vorliegt und die Zahlung geleistet ist (§ 15 Abs. 1 S. 1 Nr. 1 S. 3 UStG): im VAZ März 2026.",
      "Die restliche Vorsteuer von 7.600 € − 1.900 € = 5.700 € ist im VAZ Mai 2026 abziehbar, da dann Lieferung und Schlussrechnung vorliegen (§ 15 Abs. 1 S. 1 Nr. 1 S. 1, 2 UStG); die Zahlung im Juni ist unerheblich.",
      "b) Die Bewirtungsleistung wird von einem anderen Unternehmer für das Unternehmen des B erbracht; eine Rechnung liegt vor (§ 15 Abs. 1 S. 1 Nr. 1 UStG). Das ertragsteuerliche Abzugsverbot für 30 % der Bewirtungsaufwendungen (§ 4 Abs. 5 S. 1 Nr. 2 EStG) schließt den Vorsteuerabzug nicht aus (§ 15 Abs. 1a S. 2 UStG). Vorsteuer 14 € + 19 € = 33 € in voller Höhe im VAZ April 2026.",
      `c) Für die Lieferung der Tüten schuldet der Lieferant tatsächlich 19 % (§ 12 Abs. 1 UStG; Verpackungsmaterial gehört nicht zur Anlage 2): gesetzlich geschuldet wären 535 € × 19/119 = ${e(tueten.ust)}. Abziehbar ist nur die gesetzlich geschuldete Steuer, soweit sie in der Rechnung ausgewiesen ist (§ 15 Abs. 1 S. 1 Nr. 1 S. 1, 2 UStG). Vorsteuer daher nur 35 € im VAZ August 2026; erst eine berichtigte Rechnung ermöglicht den Abzug des Restbetrags.`,
    ],
    bewertung: [
      [1.5, "a) Grundvoraussetzungen Vorsteuerabzug, keine Ausschlussumsätze", "§ 15 Abs. 1 S. 1 Nr. 1 S. 1, 2; § 15 Abs. 2 UStG"],
      [3, "a) 1.900 € schon im VAZ März 2026 (Anzahlung)", "§ 15 Abs. 1 S. 1 Nr. 1 S. 3 UStG – Rechnung und Zahlung liegen vor"],
      [2.5, "a) 5.700 € im VAZ Mai 2026", "Lieferung + Schlussrechnung; Zahlung im Juni unerheblich"],
      [2, "b) Bewirtung: Vorsteuer 33 € voll abziehbar, April 2026", "§ 15 Abs. 1a S. 2 UStG – 70-%-Grenze des § 4 Abs. 5 S. 1 Nr. 2 EStG gilt nicht"],
      [1.5, "b) Speisen 7 % / Getränke 19 % auf der Rechnung zutreffend", "§ 12 Abs. 2 Nr. 15, § 12 Abs. 1 UStG"],
      [2.5, `c) gesetzlich geschuldet 19 % (${e(tueten.ust)}), aber nur 35 € ausgewiesen`, "Verpackung nicht in Anlage 2; Herausrechnen aus 535 €"],
      [3, "c) Vorsteuer nur 35 € im VAZ August 2026", "§ 15 Abs. 1 S. 1 Nr. 1 UStG – Obergrenze ausgewiesene Steuer; Rest erst nach Berichtigung"],
      [2, "Zeitpunkte durchgehend nach Leistung und Rechnung bestimmt", "nicht nach dem Zahlungstag (außer Anzahlung)"],
    ],
    zahlen: [{ frage: "a) Vorsteuer Mai 2026 (€)", wert: 5700, toleranz: 0.5 }],
  };
});

// ===================================================================================== Klausur C – Physiotherapiepraxis
const C_VORSPANN = "Pia Petersen (P) ist selbständige Physiotherapeutin in Kiel. In ihrer Praxis behandelt sie Patienten, verkauft Massageöle und Therapiebänder und bietet Wellness-Massagen an. Außerdem behandelt sie Pferde für einen Reiterhof. Das Praxisgebäude in Kiel (2019 errichtet, insgesamt dem Unternehmen zugeordnet) gehört ihr; nicht selbst genutzte Flächen vermietet sie. P beschäftigt eine angestellte Masseurin.";

const c0 = fest("ust-c0", "Allgemeines – Unternehmereigenschaft", 10, () => ({
  sv: "Siehe Vorspann.",
  aufgaben: ["Gehen Sie auf die Unternehmereigenschaft von P und den Umfang ihres Unternehmens ein."],
  loesung: [
    "P ist Unternehmerin gem. § 2 Abs. 1 S. 1 UStG, da sie als natürliche Person selbständig eine berufliche bzw. gewerbliche Tätigkeit nachhaltig zur Erzielung von Einnahmen ausübt (§ 2 Abs. 1 S. 3 UStG).",
    "Das Unternehmen umfasst gem. § 2 Abs. 1 S. 2 UStG alle Tätigkeiten: Heilbehandlungen, Verkauf, Wellness-Massagen, Pferdebehandlung und Vermietung. Ob einzelne Umsätze steuerfrei sind, ist für die Unternehmenszugehörigkeit ohne Bedeutung.",
  ],
  bewertung: [
    [1, "Unternehmerin gem. § 2 Abs. 1 S. 1 UStG", "selbständig, berufliche/gewerbliche Tätigkeit"],
    [1.5, "nachhaltig, Einnahmeerzielungsabsicht", "§ 2 Abs. 1 S. 3 UStG"],
    [1.5, "Unternehmensumfang einschließlich Vermietung; Steuerfreiheit unerheblich", "§ 2 Abs. 1 S. 2 UStG"],
  ],
}));

const c1 = fest("ust-c1", "Leistungen der Praxis", 40, () => {
  const wm = aus(20 * 59.5, 19), oel = aus(357, 19);
  return {
    sv: "Im April 2026 erbringt P u. a. folgende Leistungen:\n" +
      "1. Krankengymnastik auf ärztliche Verordnung für gesetzlich versicherte Patienten; die Krankenkassen überweisen dafür im Mai 3.200 €.\n" +
      "2. Zwanzig Wellness-Massagen ohne ärztliche Verordnung, die die Kunden nach eigenen Angaben „zur Entspannung“ buchen; Preis je 59,50 €.\n" +
      "3. Physiotherapeutische Behandlung von sechs Turnierpferden der Reiterhof Hansen GmbH in Kiel (für deren Betrieb bestellt); P berechnet 3.000 € zuzüglich 570 € USt.\n" +
      "4. Verkauf von Massageölen an Patienten in der Praxis für insgesamt 357 €.",
    aufgaben: ["Beurteilen Sie die Umsätze 1. bis 4. für P (Leistungsart, Ort, Steuerbarkeit, Steuerpflicht, BMG, USt, VAZ)."],
    loesung: [
      "1. Die Behandlungen sind sonstige Leistungen (§ 3 Abs. 9 S. 1 UStG); Ort gem. § 3a Abs. 1 S. 1 UStG am Praxissitz Kiel; steuerbar gem. § 1 Abs. 1 Nr. 1 UStG. Als Heilbehandlungen im Bereich der Humanmedizin durch eine Physiotherapeutin sind sie steuerfrei gem. § 4 Nr. 14 Buchst. a S. 1 UStG. BMG 3.200 € (§ 10 Abs. 1 S. 1, 2 UStG); anzumelden im VAZ April 2026, in dem die Leistungen ausgeführt sind (analog § 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG) – der Zahlungseingang im Mai ist unerheblich.",
      `2. Sonstige Leistungen, Ort Kiel (§ 3a Abs. 1 S. 1 UStG), steuerbar. Eine Heilbehandlung setzt ein therapeutisches Ziel voraus (Abschn. 4.14.1 Abs. 1 UStAE); reine Wellness-Massagen zur Entspannung erfüllen das nicht – steuerpflichtig, 19 %. BMG 20 × 59,50 € = 1.190 € : 1,19 = ${e(wm.bmg)}; USt ${e(wm.ust)}, Ablauf VAZ April 2026.`,
      "3. Sonstige Leistung an einen Unternehmer für dessen Unternehmen; Ort gem. § 3a Abs. 2 S. 1 UStG am Sitz der GmbH in Kiel; steuerbar. § 4 Nr. 14 Buchst. a UStG erfasst nur die Humanmedizin – die Behandlung von Tieren ist steuerpflichtig, 19 %. BMG 3.000 €, USt 570 €, Ablauf VAZ April 2026.",
      `4. Lieferungen (§ 3 Abs. 1 UStG), Ort Kiel (§ 3 Abs. 6 S. 1 UStG, die Patienten nehmen die Öle mit), steuerbar, steuerpflichtig, 19 % (Massageöle sind nicht in Anlage 2 aufgeführt). BMG 357 € : 1,19 = ${e(oel.bmg)}; USt ${e(oel.ust)}, Ablauf VAZ April 2026.`,
      "Steuerschuldnerin ist jeweils P (§ 13a Abs. 1 Nr. 1 UStG).",
    ],
    bewertung: [
      [1.5, "1. sonstige Leistung, Ort Kiel, steuerbar", "§ 3 Abs. 9 S. 1, § 3a Abs. 1 S. 1, § 1 Abs. 1 Nr. 1 UStG"],
      [2.5, "1. steuerfrei als Heilbehandlung (Physiotherapeutin genannt)", "§ 4 Nr. 14 Buchst. a S. 1 UStG"],
      [2, "1. BMG 3.200 €, anzumelden im VAZ April 2026 (nicht Mai)", "§ 10 Abs. 1 UStG; maßgeblich ist die Ausführung, nicht der Zahlungseingang"],
      [3, "2. keine Heilbehandlung ohne therapeutisches Ziel → steuerpflichtig", "Abschn. 4.14.1 Abs. 1 UStAE"],
      [2, `2. BMG ${e(wm.bmg)}, USt ${e(wm.ust)}`, "1.190 € : 1,19"],
      [2, "3. B2B-Ort Kiel", "§ 3a Abs. 2 S. 1 UStG"],
      [2.5, "3. Tierbehandlung nicht befreit (nur Humanmedizin), USt 570 €", "§ 4 Nr. 14 Buchst. a UStG greift nicht"],
      [2.5, `4. Lieferung, 19 %, BMG ${e(oel.bmg)}, USt ${e(oel.ust)}`, "§ 3 Abs. 1, Abs. 6 S. 1; § 12 Abs. 1 UStG"],
      [2, "Entstehung jeweils mit Ablauf April 2026, Steuerschuldnerin P", "§ 13 Abs. 1 Nr. 1 Buchst. a S. 1, § 13a Abs. 1 Nr. 1 UStG"],
    ],
    zahlen: [{ frage: "2. USt Wellness-Massagen (€)", wert: wm.ust, toleranz: 0.02 }, { frage: "4. USt Massageöle (€)", wert: oel.ust, toleranz: 0.02 }],
  };
});

const c2 = fest("ust-c2", "Hilfsgeschäft und Vorsteueraufteilung", 35, () => ({
  sv: "a) P verkauft am 30.04.2026 eine gebrauchte Behandlungsliege, die sie seit 2021 ausschließlich für Krankengymnastik genutzt hat, für 1.000 € an eine Kollegin aus Neumünster, die die Liege in Kiel abholt.\n" +
    "b) Als Ersatz erhält P am 06.05.2026 eine neue Behandlungsliege, die sie ebenfalls nur für Krankengymnastik einsetzen wird. Rechnung vom selben Tag: 3.000 € zuzüglich 570 € USt.\n" +
    "c) Am 12.05.2026 kauft P Massageöle für den Weiterverkauf an Patienten ein (Rechnung: 400 € zuzüglich 76 € USt).\n" +
    "d) Am 20.05.2026 erwirbt P einen Laptop für die gesamte Praxisverwaltung (Terminplanung, Abrechnung aller Leistungen). Rechnung: 1.500 € zuzüglich 285 € USt. Eine genauere Zuordnung als nach den Umsätzen ist nicht möglich; die steuerfreien Umsätze machen 80 %, die steuerpflichtigen 20 % der Gesamtumsätze aus.",
  aufgaben: ["Beurteilen Sie a) die Veräußerung der Liege und b) bis d) den Vorsteuerabzug der P."],
  loesung: [
    "a) Lieferung gem. § 3 Abs. 1 UStG; Ort gem. § 3 Abs. 6 S. 1 UStG in Kiel (Abholung durch die Abnehmerin). Der Verkauf eines Gegenstands des Unternehmensvermögens ist ein Hilfsgeschäft und erfolgt im Rahmen des Unternehmens (Abschn. 2.7 Abs. 2 UStAE); gegen Entgelt → steuerbar gem. § 1 Abs. 1 Nr. 1 UStG.",
    "Da P die Liege ausschließlich für nach § 4 Nr. 14 UStG steuerfreie Tätigkeiten verwendet hat, ist die Lieferung gem. § 4 Nr. 28 UStG steuerfrei. BMG 1.000 € (§ 10 Abs. 1 UStG), anzumelden im VAZ April 2026.",
    "b) Grundsätzlich liegen die Voraussetzungen des § 15 Abs. 1 S. 1 Nr. 1 UStG vor. Die Liege wird aber ausschließlich für steuerfreie Heilbehandlungen verwendet; der Vorsteuerabzug ist daher gem. § 15 Abs. 2 S. 1 Nr. 1 UStG ausgeschlossen, eine Rückausnahme nach § 15 Abs. 3 UStG liegt nicht vor. Kein Abzug der 570 €.",
    "c) Die Öle dienen steuerpflichtigen Lieferungen; Voraussetzungen des § 15 Abs. 1 S. 1 Nr. 1 UStG liegen vor, kein Ausschluss. Vorsteuer 76 € im VAZ Mai 2026.",
    "d) Der Laptop wird sowohl für steuerpflichtige als auch für steuerfreie Umsätze verwendet. Gem. § 15 Abs. 4 S. 1 UStG ist der Teil der Vorsteuer nicht abziehbar, der den Ausschlussumsätzen wirtschaftlich zuzuordnen ist. Da keine präzisere Zuordnung möglich ist, ist die Aufteilung nach dem Umsatzverhältnis zulässig (§ 15 Abs. 4 S. 2, 3 UStG): abziehbar 20 % von 285 € = 57 € im VAZ Mai 2026; 228 € sind nicht abziehbar.",
  ],
  bewertung: [
    [1.5, "a) Lieferung, Ort Kiel, Hilfsgeschäft im Rahmen des Unternehmens", "§ 3 Abs. 1, Abs. 6 S. 1 UStG; Abschn. 2.7 Abs. 2 UStAE"],
    [3, "a) steuerfrei, da ausschließlich für steuerfreie Heilbehandlungen genutzt", "§ 4 Nr. 28 UStG i. V. m. § 4 Nr. 14 UStG"],
    [1, "a) BMG 1.000 €, VAZ April 2026", "§ 10 Abs. 1 UStG"],
    [3, "b) Vorsteuer 570 € ausgeschlossen", "§ 15 Abs. 2 S. 1 Nr. 1 UStG; keine Rückausnahme nach § 15 Abs. 3 UStG"],
    [2, "c) Vorsteuer 76 € im Mai 2026", "§ 15 Abs. 1 S. 1 Nr. 1 UStG – steuerpflichtige Verwendung"],
    [3, "d) gemischte Verwendung erkannt, Aufteilung", "§ 15 Abs. 4 S. 1 UStG – wirtschaftliche Zurechnung"],
    [2, "d) Umsatzschlüssel nur mangels präziserer Zuordnung", "§ 15 Abs. 4 S. 2, 3 UStG"],
    [2.5, "d) abziehbar 57 €, nicht abziehbar 228 €, VAZ Mai 2026", "20 % von 285 €"],
  ],
  zahlen: [{ frage: "d) abziehbare Vorsteuer Laptop (€)", wert: 57, toleranz: 0.02 }],
}));

const c3 = fest("ust-c3", "Reihengeschäft und Werklieferung", 35, () => ({
  sv: "a) P bestellt im Juni 2026 beim Großhändler Gerd Graf (G) in Hamburg 200 Therapiebänder zum Weiterverkauf an Patienten. G bestellt die Bänder beim Hersteller Heiko Haas (H) in Stuttgart. H beauftragt DHL, die Bänder am 15.06.2026 direkt von Stuttgart an P nach Kiel zu bringen. H berechnet G 600 € zuzüglich 114 € USt; G berechnet P mit Rechnung vom 15.06.2026 1.000 € zuzüglich 190 € USt.\n" +
    "b) Der Tischler Tim Timm (T) baut im Juli 2026 in der Praxis der P einen Empfangstresen aus selbst beschafftem Holz und montiert ihn fest. P nimmt den Tresen am 21.07.2026 ab; T berechnet 5.000 € zuzüglich 950 € USt (Rechnung vom 21.07.2026). Der Tresen dient allen Umsätzen der Praxis; der Umsatzschlüssel aus der vorigen Aufgabe (20 % steuerpflichtig) ist anzuwenden.",
  aufgaben: ["a) Beurteilen Sie die Lieferungen von H und G sowie den Vorsteuerabzug der P.", "b) Beurteilen Sie die Leistung des T und den Vorsteuerabzug der P."],
  loesung: [
    "a) H und G schließen über dieselben Bänder Liefergeschäfte ab; die Bänder gelangen unmittelbar vom ersten Unternehmer (H) an den letzten Abnehmer (P) – Reihengeschäft gem. § 3 Abs. 6a S. 1 UStG. Da H als erster Unternehmer versendet, ist die Versendung seiner Lieferung an G zuzuordnen (§ 3 Abs. 6a S. 2 UStG).",
    "Lieferung H → G: bewegte Lieferung, Ort gem. § 3 Abs. 6 S. 1, 3, 4 UStG mit Übergabe an DHL in Stuttgart (Inland); steuerbar, steuerpflichtig, 19 %; BMG 600 €, USt 114 €, Ablauf VAZ Juni 2026; Steuerschuldner H.",
    "Lieferung G → P: ruhende Lieferung, die der Versendung folgt; Ort gem. § 3 Abs. 7 S. 2 Nr. 2 UStG am Ende der Versendung in Kiel (Inland); steuerbar, steuerpflichtig, 19 %; BMG 1.000 €, USt 190 €, Ablauf VAZ Juni 2026; Steuerschuldner G.",
    "P: Lieferung von einem anderen Unternehmer für ihr Unternehmen, Rechnung liegt vor; die Bänder dienen steuerpflichtigen Weiterverkäufen. Vorsteuer 190 € im VAZ Juni 2026 (§ 15 Abs. 1 S. 1 Nr. 1 UStG).",
    "b) T bearbeitet keinen fremden Gegenstand mit bloßen Zutaten, sondern verwendet selbst beschaffte Hauptstoffe – Werklieferung, die als Lieferung gilt (§ 3 Abs. 4 S. 1, 2 UStG; die feste Verbindung mit dem Gebäude ist unschädlich). Der Tresen wird nicht im fertigen Zustand befördert; Ort gem. § 3 Abs. 7 S. 1 UStG dort, wo P die Verfügungsmacht erhält: in der Praxis in Kiel. Steuerbar, steuerpflichtig, 19 %; BMG 5.000 €, USt 950 €, Ablauf VAZ Juli 2026 (Abnahme am 21.07.2026); Steuerschuldner T (§ 13b Abs. 2 Nr. 4, Abs. 5 UStG greift nicht, da P keine Bauleistungen erbringt).",
    "P: Der Tresen dient steuerfreien und steuerpflichtigen Umsätzen – Aufteilung gem. § 15 Abs. 4 UStG: abziehbar 20 % von 950 € = 190 € im VAZ Juli 2026; 760 € sind nicht abziehbar.",
  ],
  bewertung: [
    [2.5, "a) Reihengeschäft erkannt", "§ 3 Abs. 6a S. 1 UStG – Versendung unmittelbar vom ersten an den letzten"],
    [2, "a) Versendung der Lieferung H → G zugeordnet", "§ 3 Abs. 6a S. 2 UStG – erster Unternehmer versendet"],
    [2, "a) H → G: Ort Stuttgart, BMG 600 €, USt 114 €", "§ 3 Abs. 6 S. 1, 3, 4 UStG"],
    [2.5, "a) G → P: ruhende Lieferung, Ort Kiel, BMG 1.000 €, USt 190 €", "§ 3 Abs. 7 S. 2 Nr. 2 UStG"],
    [1.5, "a) P: Vorsteuer 190 € im Juni 2026", "§ 15 Abs. 1 S. 1 Nr. 1 UStG; steuerpflichtige Verwendung"],
    [2.5, "b) Werklieferung (selbst beschaffte Hauptstoffe)", "§ 3 Abs. 4 S. 1, 2 UStG"],
    [2, "b) Ort Kiel, BMG 5.000 €, USt 950 €, Juli 2026", "§ 3 Abs. 7 S. 1 UStG – Verschaffung der Verfügungsmacht bei Abnahme"],
    [1, "b) kein Reverse Charge", "§ 13b Abs. 2 Nr. 4, Abs. 5 UStG: P erbringt keine Bauleistungen"],
    [2, "b) P: Aufteilung, abziehbar 190 €, nicht abziehbar 760 €", "§ 15 Abs. 4 UStG – 20 % von 950 €"],
  ],
  zahlen: [{ frage: "b) abziehbare Vorsteuer Tresen (€)", wert: 190, toleranz: 0.02 }],
}));

const c4 = fest("ust-c4", "Vermietung im Praxisgebäude", 30, () => ({
  sv: "Im Praxisgebäude der P (drei gleich große Einheiten) nutzt P das Erdgeschoss selbst. Das Obergeschoss ist an einen selbständigen Logopäden für seine Praxis vermietet (1.200 € monatlich). Das Ladenlokal im Souterrain ist an die Sanitätshaus Nord GmbH vermietet, die dort Hilfsmittel verkauft; laut Vertrag 2.500 € zuzüglich 475 € USt monatlich, zahlbar am Monatsersten. Bei Einzug am 01.03.2026 zahlte die GmbH außerdem eine Mietkaution von 7.500 €. Die Miete für Januar 2027 überweist die GmbH bereits am 28.12.2026.",
  aufgaben: ["Beurteilen Sie die Vermietungen der P im Jahr 2026 (einschließlich Kaution und Vorauszahlung)."],
  loesung: [
    "Die Vermietungen sind sonstige Leistungen (§ 3 Abs. 9 UStG); Ort gem. § 3a Abs. 3 Nr. 1 S. 1, S. 2 Buchst. a UStG am Belegenheitsort Kiel; steuerbar gem. § 1 Abs. 1 Nr. 1 UStG; grundsätzlich steuerfrei gem. § 4 Nr. 12 S. 1 Buchst. a UStG; monatliche Teilleistungen (§ 13 Abs. 1 Nr. 1 Buchst. a S. 2, 3 UStG). Die Eigennutzung des Erdgeschosses ist kein Umsatz.",
    "Logopäde: Er ist Unternehmer, erzielt aber steuerfreie Heilbehandlungsumsätze (§ 4 Nr. 14 Buchst. a UStG – ähnliche heilberufliche Tätigkeit), die den Vorsteuerabzug ausschließen. Ein Verzicht scheitert an § 9 Abs. 2 S. 1 UStG. Steuerfrei; BMG 1.200 € monatlich, anzumelden in den VAZ Januar bis Dezember 2026.",
    "Sanitätshaus: Vermietung an eine Unternehmerin für deren Unternehmen (§ 9 Abs. 1 UStG); die GmbH erzielt mit dem Verkauf von Hilfsmitteln steuerpflichtige Umsätze, die den Vorsteuerabzug nicht ausschließen (§ 9 Abs. 2 S. 1 UStG). P hat optiert (USt im Vertrag). Steuerpflichtig, 19 %: BMG 2.500 €, USt 475 € je Monat, entstanden jeweils mit Ablauf der Monate März bis Dezember 2026 (10 × 475 € = 4.750 €).",
    "Kaution: Sie ist kein Entgelt für die Vermietung, sondern eine Sicherheitsleistung, die bei ordnungsgemäßem Mietende zurückzuzahlen ist – keine Auswirkung.",
    "Vorauszahlung Januar 2027: Das Teilentgelt wird vor Ausführung der Teilleistung vereinnahmt; die USt von 475 € entsteht daher bereits mit Ablauf des VAZ Dezember 2026 (§ 13 Abs. 1 Nr. 1 Buchst. a S. 4 UStG).",
  ],
  bewertung: [
    [2, "sonstige Leistung, Ort Kiel, steuerbar, grundsätzlich steuerfrei", "§ 3 Abs. 9, § 3a Abs. 3 Nr. 1, § 4 Nr. 12 S. 1 Buchst. a UStG"],
    [1, "Teilleistungen", "§ 13 Abs. 1 Nr. 1 Buchst. a S. 2, 3 UStG"],
    [3, "Logopäde: Option nach § 9 Abs. 2 S. 1 UStG ausgeschlossen", "steuerfreie Heilbehandlungen § 4 Nr. 14 Buchst. a UStG schließen Vorsteuerabzug aus"],
    [1, "Logopäde: BMG 1.200 € monatlich, VAZ 1–12/2026", "Anmeldung steuerfreier Umsätze"],
    [3, "Sanitätshaus: Option zulässig", "§ 9 Abs. 1 und Abs. 2 S. 1 UStG – steuerpflichtige Umsätze der Mieterin"],
    [1.5, "Sanitätshaus: BMG 2.500 €, USt 475 € je Monat ab März 2026", "§ 12 Abs. 1 UStG; 2026: 4.750 €"],
    [1.5, "Kaution kein Entgelt", "Sicherheitsleistung, keine Gegenleistung für die Vermietung"],
    [2, "Januarmiete 2027: USt 475 € schon im VAZ Dezember 2026", "§ 13 Abs. 1 Nr. 1 Buchst. a S. 4 UStG – Vereinnahmung vor Teilleistung"],
  ],
  zahlen: [{ frage: "USt Sanitätshaus 2026 einschl. Vorauszahlung (€)", wert: 5225, toleranz: 0.5 }],
}));

const c5 = fest("ust-c5", "Private Nutzung und Entnahmen", 30, () => {
  const oel = auf(24, 19), mas = auf(30, 19);
  return {
    sv: "a) P hat 2025 einen Pkw angeschafft und dem Unternehmen zugeordnet. Sie nutzt ihn ausschließlich für Hausbesuche bei Patienten (Krankengymnastik) und für Privatfahrten. Die Vorsteuer aus dem Kauf hat sie zutreffend nicht abgezogen.\n" +
      "b) Am 14.09.2026 nimmt P eine Flasche Massageöl aus dem Verkaufsregal für den privaten Gebrauch. Der Einkaufspreis beträgt im September 24 € zuzüglich USt; die Vorsteuer aus dem Einkauf wurde abgezogen.\n" +
      "c) Am 03.10.2026 erhält die Tochter der P während der Arbeitszeit eine unentgeltliche Wellness-Massage durch die angestellte Masseurin. Die anteiligen Lohnkosten der Masseurin betragen 30 €; vorsteuerbelastete Ausgaben fallen nicht an.",
  aufgaben: ["Beurteilen Sie die Vorgänge a) bis c) für P."],
  loesung: [
    "a) Eine Privatnutzung ist nur nach § 3 Abs. 9a Nr. 1 UStG steuerbar, wenn der Gegenstand zum vollen oder teilweisen Vorsteuerabzug berechtigt hat. Der Pkw dient unternehmerisch nur steuerfreien Heilbehandlungen; die Vorsteuer war nach § 15 Abs. 2 S. 1 Nr. 1 UStG ausgeschlossen. Die Privatnutzung ist daher nicht steuerbar.",
    `b) Entnahme gem. § 3 Abs. 1b S. 1 Nr. 1 UStG; die Voraussetzung des Vorsteuerabzugs (§ 3 Abs. 1b S. 2 UStG) ist erfüllt. Die Entnahme erfolgt in Kiel (Inland), steuerbar, steuerpflichtig, 19 %. BMG gem. § 10 Abs. 4 S. 1 Nr. 1 UStG: Einkaufspreis zum Zeitpunkt der Entnahme 24 €; USt ${e(oel)}, entstanden mit Ablauf des VAZ September 2026 (§ 13 Abs. 1 Nr. 2 UStG).`,
    `c) Die Massage ist eine unentgeltliche sonstige Leistung für Zwecke außerhalb des Unternehmens und gem. § 3 Abs. 9a Nr. 2 UStG einer sonstigen Leistung gegen Entgelt gleichgestellt – unabhängig von einem Vorsteuerabzug. Ort gem. § 3a Abs. 1 S. 1 UStG in Kiel; steuerbar. Als Wellness-Massage ohne therapeutisches Ziel ist sie nicht nach § 4 Nr. 14 UStG befreit – steuerpflichtig, 19 %. BMG sind die entstandenen Ausgaben einschließlich der nicht vorsteuerbelasteten Lohnkosten (§ 10 Abs. 4 S. 1 Nr. 3 UStG): 30 €; USt ${e(mas)}, entstanden mit Ablauf des VAZ Oktober 2026 (§ 13 Abs. 1 Nr. 2 UStG).`,
  ],
  bewertung: [
    [2, "a) § 3 Abs. 9a Nr. 1 UStG setzt Vorsteuerabzug voraus", "Tatbestandsvoraussetzung genannt"],
    [3, "a) kein Vorsteuerabzug (steuerfreie Hausbesuche) → nicht steuerbar", "§ 15 Abs. 2 S. 1 Nr. 1 UStG; Ergebnis klar formuliert"],
    [2, "b) Entnahme mit Vorsteuerabzug", "§ 3 Abs. 1b S. 1 Nr. 1, S. 2 UStG"],
    [2, `b) BMG 24 €, USt ${e(oel)}, September 2026`, "§ 10 Abs. 4 S. 1 Nr. 1, § 13 Abs. 1 Nr. 2 UStG"],
    [2.5, "c) unentgeltliche sonstige Leistung, auch ohne Vorsteuerabzug steuerbar", "§ 3 Abs. 9a Nr. 2 UStG"],
    [1.5, "c) keine Heilbehandlung → steuerpflichtig, 19 %", "§ 4 Nr. 14 Buchst. a UStG greift nicht"],
    [2, `c) BMG 30 € (Ausgaben inkl. Lohnkosten), USt ${e(mas)}, Oktober 2026`, "§ 10 Abs. 4 S. 1 Nr. 3 UStG"],
  ],
  zahlen: [{ frage: "c) USt Massage für die Tochter (€)", wert: mas, toleranz: 0.02 }],
};
});

export const SV_UST = [a0, a1, a2, a3, a4, a5, b0, b1, b2, b3, b4, b5, c0, c1, c2, c3, c4, c5];

export const KLAUSUREN_UST = [
  { id: "ust-a", kurz: "A", titel: "Fahrradhaus Nolte – Lieferungen, Orte, Wertabgaben, Reverse Charge", minuten: 180, vorspann: A_VORSPANN, teile: ["ust-a0", "ust-a1", "ust-a2", "ust-a3", "ust-a4", "ust-a5"] },
  { id: "ust-b", kurz: "B", titel: "Rösterei-Café Brandt – Restaurant 2026, Gutschein, Option, § 17, Vorsteuer", minuten: 180, vorspann: B_VORSPANN, teile: ["ust-b0", "ust-b1", "ust-b2", "ust-b3", "ust-b4", "ust-b5"] },
  { id: "ust-c", kurz: "C", titel: "Physiotherapie Petersen – Heilbehandlung, § 4 Nr. 28, § 15 Abs. 4, Reihengeschäft", minuten: 180, vorspann: C_VORSPANN, teile: ["ust-c0", "ust-c1", "ust-c2", "ust-c3", "ust-c4", "ust-c5"] },
];
