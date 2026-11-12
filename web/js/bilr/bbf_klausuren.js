// Probeklausuren Buchführung und Bilanzwesen (FTA I) – drei vollständige Klausuren à 90 Minuten / 45 Punkte.
// Aufbau wie die Semesterklausuren: Teil I Wissensfragen (u. a. Buchführungspflicht), ggf. Teil II Einordnung von
// Geschäftsvorfällen, Teil III Buchführungstechnik (Eröffnung, Journal, AfA, vorbereitende Abschlussbuchungen,
// GuV-Konto, Schlussbilanzkonto, Gewinn durch Betriebsvermögensvergleich). Eigene Sachverhalte, Rechtsstand 2026.
// Teil III rechnet eine kleine Buchungsmaschine (buche()) – Soll = Haben, SBK ausgeglichen und
// Gewinn lt. GuV = Gewinn lt. Betriebsvermögensvergleich werden beim Erzeugen geprüft.

const r2 = (x) => Math.round(x * 100 + Number.EPSILON * 100) / 100;
const e = (x) => r2(x).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const fest = (id, titel, teil, min, f) => ({ id, titel, min, teil, fest: true, erzeugen: f });

// Kontenarten: A = Aktivkonto, P = Passivkonto, EK = Eigenkapital, AW = Aufwand, ER = Ertrag,
// PE = Privatentnahmen, PI = Privateinlagen, VST = Vorsteuer, UST = Umsatzsteuer
const ART = {
  "Bank": "A", "Kasse": "A", "BGA": "A", "Fuhrpark": "A", "Forderungen aLL": "A", "Warenbestand (WBK)": "A",
  "Darlehensverbindlichkeiten": "P", "Verbindlichkeiten aLL": "P", "Eigenkapital": "EK",
  "Vorsteuer": "VST", "Umsatzsteuer": "UST", "Privatentnahmen": "PE", "Privateinlagen": "PI",
  "Wareneinkauf (WEK)": "AW", "Bestandsveränderungen (BVK)": "AW", "Mietaufwand": "AW", "Werbeaufwand": "AW", "Zinsaufwand": "AW",
  "Abschreibungen": "AW", "Löhne": "AW", "Kfz-Kosten": "AW", "Bezugskosten": "AW", "Bürobedarf": "AW", "Stromkosten": "AW",
  "Warenverkauf (WVK)": "ER", "Erhaltene Skonti": "ER", "Unentgeltliche Wertabgaben": "ER", "Zinserträge": "ER", "Gewährte Skonti": "AW",
  "Rücksendungen an Lieferanten": "ER",
};
const bsText = (b) => `${b.soll.map(([k, x]) => `${k} ${e(x)}`).join(", ")} an ${b.haben.map(([k, x]) => `${k} ${e(x)}`).join(", ")}`;

/** Bucht Eröffnung, laufende Vorgänge und vorbereitende Abschlussbuchungen; liefert Salden, GuV, SBK und Gewinn. */
export function buche({ eb, laufend, vorbereitend }) {
  const k = {}; // konto → {s, h}
  const auf = (konto) => (k[konto] ||= { s: 0, h: 0 });
  for (const [konto, betrag] of Object.entries(eb)) {
    if (!ART[konto]) throw new Error("Kontenart fehlt: " + konto);
    if (ART[konto] === "A") auf(konto).s += betrag; else auf(konto).h += betrag;
  }
  const buchen = (b) => {
    const s = r2(b.soll.reduce((n, [, x]) => n + x, 0)), h = r2(b.haben.reduce((n, [, x]) => n + x, 0));
    if (Math.abs(s - h) > 0.001) throw new Error(`Buchung ${b.nr}: Soll ${s} ≠ Haben ${h}`);
    for (const [konto, x] of b.soll) { if (!ART[konto]) throw new Error("Kontenart fehlt: " + konto); auf(konto).s = r2(auf(konto).s + x); }
    for (const [konto, x] of b.haben) { if (!ART[konto]) throw new Error("Kontenart fehlt: " + konto); auf(konto).h = r2(auf(konto).h + x); }
  };
  laufend.forEach(buchen);
  const saldo = (konto) => r2((k[konto]?.s || 0) - (k[konto]?.h || 0));
  const vor = vorbereitend(saldo); // Funktion, damit Beträge aus den Salden kommen
  vor.forEach(buchen);
  // Abschluss
  const guvS = [], guvH = [], sbkA = [], sbkP = [];
  for (const [konto, v] of Object.entries(k)) {
    const sd = r2(v.s - v.h), art = ART[konto];
    if (Math.abs(sd) < 0.005) continue;
    if (art === "AW" || art === "ER") (sd > 0 ? guvS : guvH).push([konto, Math.abs(sd)]);
    else if (art === "PE" || art === "PI") throw new Error("Privatkonto nicht abgeschlossen: " + konto);
    else if (art !== "EK") (sd > 0 ? sbkA : sbkP).push([konto, Math.abs(sd)]);
  }
  const summe = (l) => r2(l.reduce((n, [, x]) => n + x, 0));
  const gewinn = r2(summe(guvH) - summe(guvS));
  const ekEnde = r2(-saldo("Eigenkapital") + gewinn);
  sbkP.push(["Eigenkapital", ekEnde]);
  if (Math.abs(summe(sbkA) - summe(sbkP)) > 0.005) throw new Error(`SBK nicht ausgeglichen: ${summe(sbkA)} / ${summe(sbkP)}`);
  return { k, saldo, vor, guvS, guvH, sbkA, sbkP, gewinn, ekEnde, summe };
}

/** Lösungsteile aus einem Buchungsfall: Journal, vorbereitende Buchungen, GuV, SBK, BVV. */
function loesungTeil3(f, x, { ebEk, entnahmen, einlagen, afaZeilen }) {
  const L = [];
  L.push("Laufende Buchungen (Journal):");
  f.laufend.forEach((b) => L.push(`${b.nr}. ${b.datum}: ${bsText(b)}${b.hinweis ? ` – ${b.hinweis}` : ""}`));
  if (afaZeilen?.length) { L.push("Berechnung der AfA:"); afaZeilen.forEach((z) => L.push(z)); }
  L.push("Vorbereitende Abschlussbuchungen:");
  x.vor.forEach((b) => L.push(`${b.nr}. 31.12.: ${bsText(b)}${b.hinweis ? ` – ${b.hinweis}` : ""}`));
  L.push(`GuV-Konto: Aufwendungen ${x.guvS.map(([k, v]) => `${k} ${e(v)}`).join(", ")}; Erträge ${x.guvH.map(([k, v]) => `${k} ${e(v)}`).join(", ")}; Saldo (Gewinn) ${e(x.gewinn)} an Eigenkapital.`);
  L.push(`Schlussbilanzkonto: Aktiva ${x.sbkA.map(([k, v]) => `${k} ${e(v)}`).join(", ")} = ${e(x.summe(x.sbkA))}; Passiva ${x.sbkP.map(([k, v]) => `${k} ${e(v)}`).join(", ")} = ${e(x.summe(x.sbkP))}.`);
  L.push(`Betriebsvermögensvergleich (§ 4 Abs. 1 S. 1 EStG, § 5 Abs. 1 EStG): BV 31.12. ${e(x.ekEnde)} − BV Anfang ${e(ebEk)} + Entnahmen ${e(entnahmen)} − Einlagen ${e(einlagen)} = Gewinn ${e(x.gewinn)}.`);
  const bvv = r2(x.ekEnde - ebEk + entnahmen - einlagen);
  if (Math.abs(bvv - x.gewinn) > 0.005) throw new Error(`BVV ${bvv} ≠ GuV ${x.gewinn}`);
  return L;
}

/** Vorsteuer mit Umsatzsteuer verrechnen (der kleinere Saldo wird ausgebucht). */
const ustVerrechnung = (nr, s) => {
  const v = s("Vorsteuer"), u = -s("Umsatzsteuer"), m = r2(Math.min(v, u));
  return { nr, soll: [["Umsatzsteuer", m]], haben: [["Vorsteuer", m]], hinweis: u >= v ? `Zahllast ${e(u - v)} bleibt auf dem USt-Konto` : `Erstattungsanspruch ${e(v - u)} bleibt auf dem Vorsteuerkonto` };
};

export const VORBEMERKUNGEN_BBF = [
  "Die Teile der Klausur sind voneinander unabhängig und können in beliebiger Reihenfolge bearbeitet werden.",
  "Für alle Geschäftsvorfälle liegen ordnungsgemäße Rechnungen und Belege vor. Die Unternehmer versteuern nach vereinbarten Entgelten und sind voll zum Vorsteuerabzug berechtigt. Gebucht wird nach dem Nettoverfahren.",
  "Wahlrechte sind so auszuüben, dass ein möglichst niedriger Gewinn entsteht; von der degressiven AfA und von § 6 Abs. 2, 2a EStG ist kein Gebrauch zu machen. Voll abgeschriebene Wirtschaftsgüter werden mit 1 € Erinnerungswert fortgeführt.",
  "Offenbare Unrichtigkeiten oder fehlende Angaben: kurz vermerken, wie Sie den Sachverhalt ergänzt haben. Rechtsstand 2026.",
];

// ===================================================================================== Klausur A
const a1 = fest("bbf-a1", "Teil I – Geschäftsvorfälle, Buchführungspflicht, Inventur", 1, 25, () => ({
  sv: "Aufgabe 1: In welche zwei Gruppen lassen sich Geschäftsvorfälle einteilen? Worin unterscheiden sie sich? Nennen Sie die jeweiligen Unterarten mit je einem Beispiel.\n" +
    "Aufgabe 2: Sabine Sander (S) betreibt in Lübeck seit 2019 ein Fahrradgeschäft und ist als Einzelkauffrau im Handelsregister eingetragen. Ihre Umsatzerlöse und Jahresüberschüsse betrugen 2024: 650.000 € / 70.000 €, 2025: 700.000 € / 75.000 €. Bisher ermittelt sie ihren Gewinn nach § 4 Abs. 3 EStG.\n" +
    "Aufgabe 3: S möchte die Inventur zum 31.12.2026 bereits am 15.11.2026 durchführen. Ist das zulässig?",
  aufgaben: ["Aufgabe 1 beantworten.", "Aufgabe 2: Ist S für 2026 handels- und steuerrechtlich buchführungspflichtig? Wie wäre es, wenn S nicht eingetragen wäre und ihr Betrieb keinen kaufmännisch eingerichteten Geschäftsbetrieb erforderte?", "Aufgabe 3 mit Begründung beantworten."],
  loesung: [
    "Aufgabe 1: Geschäftsvorfälle sind entweder Betriebsvermögensumschichtungen – das Eigenkapital bleibt unverändert – oder Betriebsvermögensänderungen – das Eigenkapital ändert sich.",
    "Umschichtungen: Aktivtausch (Kauf einer Ladeneinrichtung gegen Banküberweisung), Passivtausch (Umwandlung einer Lieferantenverbindlichkeit in ein Darlehen), Aktiv-Passiv-Mehrung (Wareneinkauf auf Ziel), Aktiv-Passiv-Minderung (Tilgung eines Darlehens per Überweisung).",
    "Änderungen: betrieblich veranlasst als Aufwand (Mietzahlung) oder Ertrag (Zinsgutschrift), privat veranlasst als Entnahme (private Rechnung vom Betriebskonto bezahlt) oder Einlage (betriebliche Miete vom Privatkonto bezahlt).",
    "Aufgabe 2: Als eingetragene Einzelkauffrau ist S Kaufmann (§ 1 Abs. 1 HGB) und grundsätzlich nach § 238 Abs. 1 S. 1 HGB buchführungspflichtig. Sie ist aber nach § 241a S. 1 HGB befreit, weil sie an den Abschlussstichtagen zweier aufeinanderfolgender Geschäftsjahre (2024 und 2025) jeweils nicht mehr als 800.000 € Umsatzerlöse und 80.000 € Jahresüberschuss hatte.",
    "Steuerrechtlich entfällt damit die abgeleitete Pflicht nach § 140 AO. Eine originäre Pflicht nach § 141 Abs. 1 AO besteht nicht, da weder der Umsatz 800.000 € noch der Gewinn 80.000 € übersteigt. S ist 2026 nicht buchführungspflichtig; die Gewinnermittlung nach § 4 Abs. 3 EStG bleibt zulässig.",
    "Abwandlung: Ohne kaufmännisch eingerichteten Geschäftsbetrieb betreibt S kein Handelsgewerbe (§ 1 Abs. 2 HGB) und ist ohne Eintragung kein Kaufmann – keine Pflicht nach § 238 HGB und damit auch keine nach § 140 AO. Steuerlich gilt allein § 141 AO; die Grenzen sind nicht überschritten – keine Buchführungspflicht.",
    "Aufgabe 3: Nach § 241 Abs. 3 HGB darf der Bestand in einem besonderen Inventar für einen Tag innerhalb der letzten drei Monate vor oder der ersten zwei Monate nach dem Schluss des Geschäftsjahrs verzeichnet werden, wenn er durch Fortschreibung auf den Bilanzstichtag ordnungsgemäß bewertet werden kann. Der 15.11.2026 liegt innerhalb der Dreimonatsfrist – zulässig, sofern S den Bestand bis zum 31.12.2026 fortschreibt.",
  ],
  bewertung: [
    [1.5, "Umschichtung vs. Änderung (Eigenkapital unverändert/verändert)", "beide Gruppen mit dem Unterscheidungsmerkmal Eigenkapital"],
    [2, "vier Arten der Umschichtung mit Beispiel", "Aktivtausch, Passivtausch, Aktiv-Passiv-Mehrung, Aktiv-Passiv-Minderung"],
    [1.5, "Änderungen: Aufwand/Ertrag und Entnahme/Einlage mit Beispiel", "betrieblich vs. privat veranlasst"],
    [1.5, "Kaufmann, grundsätzlich § 238 Abs. 1 S. 1 HGB", "Eintragung/Einzelkauffrau, § 1 HGB"],
    [2, "Befreiung nach § 241a S. 1 HGB (zwei Stichtage, beide Grenzen)", "800.000 € Umsatzerlöse und 80.000 € Jahresüberschuss 2024 und 2025"],
    [1.5, "steuerlich: § 140 AO entfällt, § 141 AO nicht erfüllt → § 4 Abs. 3 EStG", "Grenzen § 141 Abs. 1 S. 1 Nr. 1 und Nr. 4 AO nicht überschritten"],
    [1, "Abwandlung: kein Kaufmann (§ 1 Abs. 2 HGB), nur § 141 AO", "keine Buchführungspflicht"],
    [1, "Aufgabe 3: vorverlegte Inventur zulässig mit Fortschreibung", "§ 241 Abs. 3 Nr. 1, 2 HGB – drei Monate vor dem Stichtag"],
  ],
}));

const A_FALL = {
  eb: { "Bank": 12000, "Kasse": 500, "Eigenkapital": 12500 },
  laufend: [
    { nr: 1, datum: "01.12.", soll: [["Bank", 20000]], haben: [["Darlehensverbindlichkeiten", 20000]] },
    { nr: 2, datum: "01.12.", soll: [["Wareneinkauf (WEK)", 15000], ["Vorsteuer", 2850]], haben: [["Verbindlichkeiten aLL", 17850]] },
    { nr: 3, datum: "01.12.", soll: [["BGA", 6000], ["Vorsteuer", 1140]], haben: [["Bank", 7140]] },
    { nr: 4, datum: "02.12.", soll: [["BGA", 1200], ["Vorsteuer", 228]], haben: [["Bank", 1428]] },
    { nr: 5, datum: "02.12.", soll: [["Mietaufwand", 1000], ["Vorsteuer", 190]], haben: [["Privateinlagen", 1190]], hinweis: "Zahlung vom privaten Konto = Einlage" },
    { nr: 6, datum: "03.12.", soll: [["Kasse", 300]], haben: [["Bank", 300]] },
    { nr: 7, datum: "Dezember", soll: [["Bank", 17136], ["Kasse", 4284]], haben: [["Warenverkauf (WVK)", 18000], ["Umsatzsteuer", 3420]] },
    { nr: 8, datum: "10.12.", soll: [["Verbindlichkeiten aLL", 17850]], haben: [["Bank", 17493], ["Erhaltene Skonti", 300], ["Vorsteuer", 57]], hinweis: "2 % Skonto = 357 € brutto; Vorsteuerkorrektur 57 € (§ 17 Abs. 1 UStG)" },
    { nr: 9, datum: "15.12.", soll: [["Werbeaufwand", 400], ["Vorsteuer", 76]], haben: [["Verbindlichkeiten aLL", 476]] },
    { nr: 10, datum: "20.12.", soll: [["Privatentnahmen", 2000]], haben: [["Kasse", 2000]] },
    { nr: 11, datum: "28.12.", soll: [["Forderungen aLL", 595]], haben: [["Warenverkauf (WVK)", 500], ["Umsatzsteuer", 95]] },
    { nr: 12, datum: "31.12.", soll: [["Zinsaufwand", 80], ["Darlehensverbindlichkeiten", 500]], haben: [["Bank", 580]] },
  ],
  vorbereitend: (s) => [
    { nr: 13, soll: [["Warenbestand (WBK)", 4000]], haben: [["Bestandsveränderungen (BVK)", 4000]], hinweis: "Endbestand lt. Inventur 4.000 €, Anfangsbestand 0 € → Bestandsmehrung" },
    { nr: 14, soll: [["Bestandsveränderungen (BVK)", 4000]], haben: [["Wareneinkauf (WEK)", 4000]], hinweis: "Mehrung mindert den Wareneinsatz" },
    { nr: 15, soll: [["Erhaltene Skonti", 300]], haben: [["Wareneinkauf (WEK)", 300]], hinweis: "Unterkonto über das WEK abschließen" },
    { nr: 16, soll: [["Abschreibungen", 1249]], haben: [["BGA", 1249]] },
    ustVerrechnung(17, s),
    { nr: 18, soll: [["Eigenkapital", 2000]], haben: [["Privatentnahmen", 2000]] },
    { nr: 19, soll: [["Privateinlagen", 1190]], haben: [["Eigenkapital", 1190]] },
  ],
};

const a2 = fest("bbf-a2", "Teil III – Buchführungstechnik: Gewürzhandel Lange", 2, 65, () => {
  const x = buche(A_FALL), vst = 2850 + 1140 + 228 + 190 - 57 + 76, ust = 3420 + 95;
  const L = loesungTeil3(A_FALL, x, { ebEk: 12500, entnahmen: 2000, einlagen: 1190, afaZeilen: [
    "Ladeneinrichtung (BGA): 6.000 € : 10 Jahre × 1/12 (Dezember) = 50,00 € (§ 7 Abs. 1 S. 1, 4 EStG)",
    "Notebook: Digital-AfA mit einer Nutzungsdauer von einem Jahr (BMF vom 22.02.2022), keine zeitanteilige Kürzung: 1.200 € − 1 € Erinnerungswert = 1.199,00 €",
    "AfA gesamt 1.249,00 €",
  ] });
  return {
    sv: "Die im Handelsregister eingetragene Kauffrau Lisa Lange (L) eröffnet am 01.12.2026 in Bremen einen Einzelhandel mit Tee und Gewürzen (Steuersatz für alle Umsätze 19 %). Wirtschaftsjahr ist das Kalenderjahr.\n" +
      "Eröffnungsbilanz 01.12.2026: Bank 12.000 €, Kasse 500 € / Eigenkapital 12.500 €.\n" +
      "1. 01.12.: Die Bank zahlt ein betriebliches Darlehen über 20.000 € auf das Betriebskonto aus.\n" +
      "2. 01.12.: Wareneinkauf auf Ziel, Rechnung 15.000 € zzgl. 19 % USt.\n" +
      "3. 01.12.: Kauf von Ladenregalen für 6.000 € zzgl. 19 % USt, Zahlung per Überweisung (Nutzungsdauer 10 Jahre).\n" +
      "4. 02.12.: Kauf eines Notebooks für die Warenwirtschaft für 1.200 € zzgl. 19 % USt, Zahlung per EC-Karte vom Betriebskonto.\n" +
      "5. 02.12.: L überweist die Dezembermiete für den Laden (1.000 € zzgl. 190 € USt) von ihrem privaten Konto.\n" +
      "6. 03.12.: Abhebung von 300 € Wechselgeld vom Betriebskonto für die Kasse.\n" +
      "7. Dezember: Warenverkäufe insgesamt 21.420 € einschließlich USt; 80 % per EC-Karte (Gutschrift auf dem Betriebskonto), 20 % bar.\n" +
      "8. 10.12.: L begleicht die Rechnung aus Nr. 2 per Überweisung unter Abzug von 2 % Skonto.\n" +
      "9. 15.12.: Rechnung einer Werbeagentur über 400 € zzgl. 76 € USt, zahlbar im Januar 2027.\n" +
      "10. 20.12.: L entnimmt der Kasse 2.000 € für Weihnachtseinkäufe ihrer Familie.\n" +
      "11. 28.12.: Verkauf von Waren an einen Gastronomen auf Ziel, Rechnung 500 € zzgl. 95 € USt.\n" +
      "12. 31.12.: Die Bank belastet das Betriebskonto mit 80 € Darlehenszinsen und 500 € Tilgung.\n" +
      "13. Die Inventur zum 31.12.2026 ergibt einen Warenendbestand von 4.000 € (Anschaffungskosten).",
    aufgaben: [
      "Eröffnen Sie die Konten (ohne Buchungssätze) und bilden Sie die Buchungssätze zu Nr. 1–12 in zeitlicher Reihenfolge.",
      "Berechnen Sie die Abschreibungen 2026 nachvollziehbar.",
      "Bilden Sie die vorbereitenden Abschlussbuchungen (Warenkonten, Skonti, AfA, Umsatzsteuer, Privatkonten) und schließen Sie die Konten ab.",
      "Erstellen Sie GuV-Konto und Schlussbilanzkonto und ermitteln Sie den Gewinn durch Betriebsvermögensvergleich mit Rechtsgrundlage.",
    ],
    loesung: L,
    bewertung: [
      [1, "Nr. 1 Darlehensauszahlung", "Bank an Darlehensverbindlichkeiten 20.000 €"],
      [1.5, "Nr. 2 Wareneinkauf auf Ziel", "WEK 15.000 €, Vorsteuer 2.850 € an Verbindlichkeiten aLL 17.850 €"],
      [1, "Nr. 3 Ladenregale", "BGA 6.000 €, Vorsteuer 1.140 € an Bank 7.140 €"],
      [1, "Nr. 4 Notebook", "BGA 1.200 €, Vorsteuer 228 € an Bank 1.428 €"],
      [1.5, "Nr. 5 Miete vom Privatkonto = Einlage", "Mietaufwand 1.000 €, Vorsteuer 190 € an Privateinlagen 1.190 €"],
      [0.5, "Nr. 6 Wechselgeld", "Kasse an Bank 300 €"],
      [1, "Nr. 7 Warenverkäufe aufgeteilt", "Bank 17.136 €, Kasse 4.284 € an WVK 18.000 €, Umsatzsteuer 3.420 €"],
      [3, "Nr. 8 Zahlung mit Skonto inkl. Vorsteuerkorrektur", "Verbindlichkeiten aLL 17.850 € an Bank 17.493 €, Erhaltene Skonti 300 €, Vorsteuer 57 €"],
      [1, "Nr. 9 Werbung auf Ziel", "Werbeaufwand 400 €, Vorsteuer 76 € an Verbindlichkeiten aLL 476 €"],
      [1, "Nr. 10 Barentnahme", "Privatentnahmen an Kasse 2.000 €"],
      [1, "Nr. 11 Verkauf auf Ziel", "Forderungen aLL 595 € an WVK 500 €, Umsatzsteuer 95 €"],
      [1, "Nr. 12 Zins und Tilgung", "Zinsaufwand 80 €, Darlehensverbindlichkeiten 500 € an Bank 580 €"],
      [3, "AfA richtig berechnet (50 € + 1.199 €)", "Regale zeitanteilig 1/12; Notebook Digital-AfA mit 1 € Erinnerungswert"],
      [2, "Warenabschluss: Bestandsmehrung 4.000 €", "WBK an BVK 4.000 €; BVK an WEK 4.000 €"],
      [1, "Erhaltene Skonti über WEK abgeschlossen", "Erhaltene Skonti an WEK 300 €"],
      [1.5, `USt-Verrechnung: Vorsteuerüberhang ${e(vst - ust)} als Forderung ins SBK`, `Umsatzsteuer an Vorsteuer ${e(ust)} – Vorsteuer (${e(vst)}) übersteigt die USt (${e(ust)})`],
      [1, "Privatkonten über Eigenkapital", "EK an Privatentnahmen 2.000 €; Privateinlagen an EK 1.190 €"],
      [3.5, `GuV-Konto mit Gewinn ${e(x.gewinn)}`, `Aufwendungen ${e(x.summe(x.guvS))}, Erträge ${e(x.summe(x.guvH))}`],
      [3.5, `SBK ausgeglichen (${e(x.summe(x.sbkA))}), Eigenkapital ${e(x.ekEnde)}`, "alle Bestandskonten mit Schlussbestand"],
      [3, `BVV: Gewinn ${e(x.gewinn)} nach § 4 Abs. 1 S. 1 EStG`, "BV Ende − BV Anfang + Entnahmen − Einlagen"],
    ],
    zahlen: [{ frage: "Gewinn 2026 (€)", wert: x.gewinn, toleranz: 0.5 }, { frage: "Vorsteuerüberhang (€)", wert: r2(vst - ust), toleranz: 0.5 }, { frage: "SBK-Summe (€)", wert: x.summe(x.sbkA), toleranz: 0.5 }],
  };
});

// ===================================================================================== Klausur B
const b1 = fest("bbf-b1", "Teil I – Buchführungspflicht eines Blumenhändlers", 1, 15, () => ({
  sv: "Ole Olsen (O) betreibt seit 2020 in Hamburg ein Blumengeschäft als Einzelunternehmer. Er ist nicht im Handelsregister eingetragen; sein Betrieb erfordert nach Art und Umfang keinen kaufmännisch eingerichteten Geschäftsbetrieb. O ermittelt seinen Gewinn nach § 4 Abs. 3 EStG. 2025 erzielte er einen Umsatz von 420.000 € und einen Gewinn von 90.000 €. Am 10.04.2026 erhält O eine Mitteilung des Finanzamts, dass er wegen Überschreitens der Gewinngrenze Bücher zu führen habe.",
  aufgaben: ["Nehmen Sie zur handels- und steuerrechtlichen Buchführungspflicht des O Stellung. Ab wann muss O Bücher führen? Begründen Sie mit den Rechtsvorschriften."],
  loesung: [
    "Handelsrecht: Nach § 238 Abs. 1 S. 1 HGB ist jeder Kaufmann buchführungspflichtig. O betreibt zwar ein Gewerbe, das aber nach Art und Umfang keinen kaufmännisch eingerichteten Geschäftsbetrieb erfordert – kein Handelsgewerbe (§ 1 Abs. 2 HGB). Da er auch nicht eingetragen ist, ist O kein Kaufmann; handelsrechtlich besteht keine Buchführungspflicht.",
    "Steuerrecht – abgeleitet: § 140 AO greift nicht, da O nicht nach anderen Gesetzen buchführungspflichtig ist.",
    "Steuerrecht – originär: Nach § 141 Abs. 1 S. 1 Nr. 4 AO müssen gewerbliche Unternehmer Bücher führen, wenn ihr Gewinn aus Gewerbebetrieb im Wirtschaftsjahr mehr als 80.000 € beträgt. O hatte 2025 einen Gewinn von 90.000 € (Umsatzgrenze 800.000 € dagegen nicht überschritten).",
    "Beginn: Die Pflicht ist vom Beginn des Wirtschaftsjahrs an zu erfüllen, das auf die Bekanntgabe der Mitteilung des Finanzamts folgt (§ 141 Abs. 2 S. 1 AO). Mitteilung im April 2026 → O muss ab dem 01.01.2027 Bücher führen; für 2026 bleibt § 4 Abs. 3 EStG zulässig.",
  ],
  bewertung: [
    [2, "kein Kaufmann: Kleingewerbe, nicht eingetragen → keine Pflicht nach § 238 HGB", "§ 1 Abs. 2 HGB; § 238 Abs. 1 S. 1 HGB"],
    [1, "§ 140 AO scheidet aus", "keine außersteuerliche Buchführungspflicht"],
    [2, "§ 141 Abs. 1 S. 1 Nr. 4 AO: Gewinn 90.000 € > 80.000 €", "Umsatzgrenze nicht überschritten, Gewinngrenze schon"],
    [2, "Beginn 01.01.2027 nach Mitteilung", "§ 141 Abs. 2 S. 1 AO – WJ nach Bekanntgabe der Mitteilung"],
  ],
}));

const b2 = fest("bbf-b2", "Teil II – Geschäftsvorfälle einordnen", 1, 15, () => ({
  sv: "1. Kauf eines Schreibtischs für 1.000 € zzgl. 190 € USt, Barzahlung aus der Kasse.\n2. Ein Darlehen über 5.000 € wird auf dem Betriebskonto gutgeschrieben.\n3. Eine Lieferantenverbindlichkeit über 3.000 € wird in ein Darlehen des Lieferanten umgewandelt.\n4. Eine Lieferantenrechnung über 2.380 € wird per Überweisung bezahlt.\n5. Die Bank schreibt 50 € Guthabenzinsen gut.\n6. Die private Handyrechnung des Inhabers (59,50 €) wird vom Betriebskonto bezahlt.",
  aufgaben: ["Bilden Sie die Buchungssätze und geben Sie an, ob eine Betriebsvermögensumschichtung oder -änderung vorliegt und welche Art."],
  loesung: [
    "1. BGA 1.000 €, Vorsteuer 190 € an Kasse 1.190 € – Umschichtung, Aktivtausch.",
    "2. Bank an Darlehensverbindlichkeiten 5.000 € – Umschichtung, Aktiv-Passiv-Mehrung.",
    "3. Verbindlichkeiten aLL an Darlehensverbindlichkeiten 3.000 € – Umschichtung, Passivtausch.",
    "4. Verbindlichkeiten aLL an Bank 2.380 € – Umschichtung, Aktiv-Passiv-Minderung.",
    "5. Bank an Zinserträge 50 € – Änderung, betrieblich veranlasst (Ertrag), Eigenkapital steigt.",
    "6. Privatentnahmen an Bank 59,50 € – Änderung, privat veranlasst (Entnahme), Eigenkapital sinkt; kein Vorsteuerabzug für private Aufwendungen.",
  ],
  bewertung: [
    [1.5, "1. BS mit Vorsteuer, Aktivtausch", "BGA 1.000 €, Vorsteuer 190 € an Kasse 1.190 €"],
    [1, "2. Aktiv-Passiv-Mehrung", "Bank an Darlehensverbindlichkeiten 5.000 €"],
    [1.5, "3. Passivtausch", "Verbindlichkeiten aLL an Darlehensverbindlichkeiten 3.000 €"],
    [1, "4. Aktiv-Passiv-Minderung", "Verbindlichkeiten aLL an Bank 2.380 €"],
    [1.5, "5. BV-Änderung durch Ertrag", "Bank an Zinserträge 50 €"],
    [1.5, "6. BV-Änderung durch Entnahme, ohne Vorsteuer", "Privatentnahmen an Bank 59,50 €"],
  ],
}));

const B_FALL = {
  eb: { "Fuhrpark": 18000, "BGA": 6000, "Warenbestand (WBK)": 8000, "Bank": 15000, "Kasse": 1000, "Eigenkapital": 28000, "Darlehensverbindlichkeiten": 20000 },
  laufend: [
    { nr: 1, datum: "01.12.", soll: [["Wareneinkauf (WEK)", 6000], ["Vorsteuer", 420]], haben: [["Verbindlichkeiten aLL", 6420]] },
    { nr: 2, datum: "03.12.", soll: [["Bezugskosten", 100], ["Vorsteuer", 19]], haben: [["Kasse", 119]] },
    { nr: 3, datum: "05.12.", soll: [["Verbindlichkeiten aLL", 535]], haben: [["Wareneinkauf (WEK)", 500], ["Vorsteuer", 35]], hinweis: "Rücksendung mindert Einkauf und Vorsteuer" },
    { nr: 4, datum: "Dezember", soll: [["Kasse", 26750]], haben: [["Warenverkauf (WVK)", 25000], ["Umsatzsteuer", 1750]] },
    { nr: 5, datum: "10.12.", soll: [["Kfz-Kosten", 150], ["Vorsteuer", 28.5]], haben: [["Kasse", 178.5]] },
    { nr: 6, datum: "15.12.", soll: [["Löhne", 600]], haben: [["Kasse", 600]] },
    { nr: 7, datum: "18.12.", soll: [["Verbindlichkeiten aLL", 5885]], haben: [["Bank", 5885]], hinweis: "6.420 € − 535 € Rücksendung" },
    { nr: 8, datum: "20.12.", soll: [["Privatentnahmen", 214]], haben: [["Unentgeltliche Wertabgaben", 200], ["Umsatzsteuer", 14]], hinweis: "Warenentnahme zum Einkaufspreis, 7 % USt (§ 3 Abs. 1b S. 1 Nr. 1, § 10 Abs. 4 S. 1 Nr. 1 UStG)" },
    { nr: 9, datum: "22.12.", soll: [["Bank", 20000]], haben: [["Kasse", 20000]] },
    { nr: 10, datum: "30.12.", soll: [["Zinsaufwand", 150], ["Darlehensverbindlichkeiten", 1000]], haben: [["Bank", 1150]] },
  ],
  vorbereitend: (s) => [
    { nr: 11, soll: [["Abschreibungen", 500]], haben: [["Fuhrpark", 400], ["BGA", 100]] },
    { nr: 12, soll: [["Bestandsveränderungen (BVK)", 1500]], haben: [["Warenbestand (WBK)", 1500]], hinweis: "Anfangsbestand 8.000 € − Endbestand 6.500 € = Bestandsminderung" },
    { nr: 13, soll: [["Wareneinkauf (WEK)", 1500]], haben: [["Bestandsveränderungen (BVK)", 1500]], hinweis: "Minderung erhöht den Wareneinsatz" },
    { nr: 14, soll: [["Wareneinkauf (WEK)", 100]], haben: [["Bezugskosten", 100]], hinweis: "Bezugskosten über das WEK abschließen" },
    ustVerrechnung(15, s),
    { nr: 16, soll: [["Eigenkapital", 214]], haben: [["Privatentnahmen", 214]] },
  ],
};

const b3 = fest("bbf-b3", "Teil III – Buchführungstechnik: Pflanzenhandel", 2, 60, () => {
  const x = buche(B_FALL), ust = 1750 + 14, vst = r2(420 + 19 + 28.5 - 35);
  const L = loesungTeil3(B_FALL, x, { ebEk: 28000, entnahmen: 214, einlagen: 0, afaZeilen: ["Fuhrpark 400 € + BGA 100 € = 500 € laut Sachverhalt"] });
  return {
    sv: "Die eingetragene Kauffrau Paula Peters (P) übernimmt zum 01.12.2026 einen Pflanzenhandel in Hamburg und ist zur Buchführung verpflichtet. Seine Warenumsätze (Pflanzen) unterliegen 7 % USt; Eingangsleistungen außer Pflanzen 19 %.\n" +
      "Eröffnungsbilanz 01.12.2026: Fuhrpark 18.000 €, BGA 6.000 €, Warenbestand 8.000 €, Bank 15.000 €, Kasse 1.000 € / Eigenkapital 28.000 €, Darlehensverbindlichkeiten 20.000 €.\n" +
      "1. 01.12.: Einkauf von Pflanzen auf Ziel, Rechnung 6.000 € zzgl. 7 % USt.\n" +
      "2. 03.12.: Der Spediteur erhält für die Anlieferung aus Nr. 1 bar 100 € zzgl. 19 % USt.\n" +
      "3. 05.12.: P schickt beschädigte Pflanzen aus Nr. 1 im Wert von 500 € netto zurück; der Lieferant erteilt eine Gutschrift.\n" +
      "4. Dezember: Barverkäufe von Pflanzen insgesamt 26.750 € einschließlich USt.\n" +
      "5. 10.12.: Tankquittung für den Lieferwagen 150 € zzgl. 28,50 € USt, bar bezahlt.\n" +
      "6. 15.12.: Barzahlung des Lohns an eine Aushilfe 600 € (Abzüge sind nicht zu berücksichtigen).\n" +
      "7. 18.12.: P überweist den Restbetrag der Lieferantenrechnung aus Nr. 1.\n" +
      "8. 20.12.: P entnimmt Pflanzen für ihren privaten Garten (Einkaufspreis 200 € netto).\n" +
      "9. 22.12.: P zahlt 20.000 € aus der Kasse auf das Betriebskonto ein.\n" +
      "10. 30.12.: Die Bank belastet 150 € Zinsen und 1.000 € Tilgung.\n" +
      "11. Die AfA für Dezember beträgt für den Fuhrpark 400 € und für die BGA 100 €.\n" +
      "12. Inventur 31.12.2026: Warenendbestand 6.500 € (Anschaffungskosten).",
    aufgaben: ["Eröffnen Sie die Konten und buchen Sie Nr. 1–10.", "Bilden Sie die vorbereitenden Abschlussbuchungen (AfA, Warenkonten, Bezugskosten, Umsatzsteuer, Privatkonto).", "Erstellen Sie GuV-Konto und Schlussbilanzkonto und ermitteln Sie den Gewinn durch Betriebsvermögensvergleich."],
    loesung: L,
    bewertung: [
      [1, "Nr. 1 Einkauf mit 7 % Vorsteuer", "WEK 6.000 €, Vorsteuer 420 € an Verbindlichkeiten aLL 6.420 €"],
      [1.5, "Nr. 2 Bezugskosten mit 19 %", "Bezugskosten 100 €, Vorsteuer 19 € an Kasse 119 €"],
      [2, "Nr. 3 Rücksendung mit Vorsteuerkorrektur", "Verbindlichkeiten aLL 535 € an WEK 500 €, Vorsteuer 35 €"],
      [1, "Nr. 4 Barverkäufe 7 %", "Kasse 26.750 € an WVK 25.000 €, Umsatzsteuer 1.750 €"],
      [1, "Nr. 5 Kfz-Kosten", "Kfz-Kosten 150 €, Vorsteuer 28,50 € an Kasse 178,50 €"],
      [1, "Nr. 6 Lohn", "Löhne an Kasse 600 €"],
      [1.5, "Nr. 7 Restzahlung 5.885 €", "Verbindlichkeiten aLL an Bank 5.885 €"],
      [2.5, "Nr. 8 Warenentnahme mit USt (unentgeltliche Wertabgabe)", "Privatentnahmen 214 € an Unentgeltliche Wertabgaben 200 €, Umsatzsteuer 14 €"],
      [0.5, "Nr. 9 Bareinzahlung", "Bank an Kasse 20.000 €"],
      [1, "Nr. 10 Zinsen und Tilgung", "Zinsaufwand 150 €, Darlehensverbindlichkeiten 1.000 € an Bank 1.150 €"],
      [1, "AfA", "Abschreibungen 500 € an Fuhrpark 400 €, BGA 100 €"],
      [2.5, "Bestandsminderung 1.500 € über BVK ins WEK", "BVK an WBK 1.500 €; WEK an BVK 1.500 €"],
      [1, "Bezugskosten ins WEK", "WEK an Bezugskosten 100 €"],
      [1.5, `USt-Verrechnung, Zahllast ${e(ust - vst)}`, `Umsatzsteuer an Vorsteuer ${e(vst)}`],
      [1, "Privatentnahmen über Eigenkapital", "Eigenkapital an Privatentnahmen 214 €"],
      [3.5, `GuV-Konto mit Gewinn ${e(x.gewinn)}`, `Aufwendungen ${e(x.summe(x.guvS))}, Erträge ${e(x.summe(x.guvH))} (WVK und Wertabgaben)`],
      [3.5, `SBK ausgeglichen (${e(x.summe(x.sbkA))})`, `Eigenkapital ${e(x.ekEnde)}, Zahllast als Verbindlichkeit`],
      [3, `BVV: Gewinn ${e(x.gewinn)}`, "§ 4 Abs. 1 S. 1 EStG: BV Ende − BV Anfang + Entnahmen − Einlagen"],
    ],
    zahlen: [{ frage: "Gewinn Dezember 2026 (€)", wert: x.gewinn, toleranz: 0.5 }, { frage: "USt-Zahllast (€)", wert: r2(ust - vst), toleranz: 0.5 }],
  };
});

// ===================================================================================== Klausur C
const c1 = fest("bbf-c1", "Teil I – Inventur, Inventar, Aufbewahrung", 1, 15, () => ({
  sv: "Erik Ehlers (E) ist eingetragener Einzelkaufmann und buchführungspflichtig. Er fragt Sie:\n1. Was unterscheidet Inventur, Inventar und Bilanz? Wozu ist er jeweils verpflichtet?\n2. Wie lange muss er (a) einen Buchungsbeleg vom 20.12.2026 und (b) das Inventar zum 31.12.2026, das er im Februar 2027 aufstellt, aufbewahren? Wann endet die Frist jeweils?",
  aufgaben: ["Beantworten Sie die Fragen 1 und 2 mit Rechtsgrundlagen."],
  loesung: [
    "1. Die Inventur ist die körperliche (bzw. buchmäßige) Bestandsaufnahme aller Vermögensgegenstände und Schulden nach Art, Menge und Wert. Ihr Ergebnis ist das Inventar, ein ausführliches Bestandsverzeichnis in Staffelform; der Kaufmann muss es zu Beginn seines Handelsgewerbes und für den Schluss jedes Geschäftsjahrs aufstellen (§ 240 Abs. 1, 2 HGB). Die Bilanz ist die kurz gefasste Gegenüberstellung von Vermögen (Aktiva) und Kapital (Passiva) in Kontoform; sie ist zu Beginn des Handelsgewerbes und für den Schluss jedes Geschäftsjahrs aufzustellen (§ 242 Abs. 1 HGB).",
    "2. a) Buchungsbelege sind acht Jahre aufzubewahren (§ 257 Abs. 1 Nr. 4, Abs. 4 HGB). Die Frist beginnt mit dem Schluss des Kalenderjahrs, in dem der Beleg entstanden ist (§ 257 Abs. 5 HGB) – also mit Ablauf des 31.12.2026 – und endet mit Ablauf des 31.12.2034.",
    "b) Inventare sind zehn Jahre aufzubewahren (§ 257 Abs. 1 Nr. 1, Abs. 4 HGB). Die Frist beginnt mit dem Schluss des Kalenderjahrs, in dem das Inventar aufgestellt wurde (§ 257 Abs. 5 HGB) – Aufstellung 2027, Beginn mit Ablauf des 31.12.2027 – und endet mit Ablauf des 31.12.2037.",
  ],
  bewertung: [
    [1, "Inventur = Bestandsaufnahme", "nach Art, Menge und Wert"],
    [1.5, "Inventar = ausführliches Verzeichnis, Pflicht mit Norm", "§ 240 Abs. 1, 2 HGB"],
    [1.5, "Bilanz = kurze Gegenüberstellung, Pflicht mit Norm", "§ 242 Abs. 1 HGB"],
    [1.5, "a) 8 Jahre, Ende 31.12.2034", "§ 257 Abs. 1 Nr. 4, Abs. 4, Abs. 5 HGB"],
    [1.5, "b) 10 Jahre ab Aufstellung 2027, Ende 31.12.2037", "§ 257 Abs. 1 Nr. 1, Abs. 4, Abs. 5 HGB"],
  ],
}));

const c2 = fest("bbf-c2", "Teil II – Kontenarten und Kontenabschluss", 1, 15, () => ({
  sv: "Für die Konten Kasse, Darlehensverbindlichkeiten, Mietaufwand, Provisionserträge, Privatentnahmen und Vorsteuer soll E jeweils angeben, zu welcher Kontenart sie gehören, auf welcher Seite Anfangsbestand bzw. Zugänge gebucht werden und wohin das Konto abgeschlossen wird.",
  aufgaben: ["Beantworten Sie die Frage für alle sechs Konten."],
  loesung: [
    "Kasse: aktives Bestandskonto; Anfangsbestand und Zugänge im Soll; Abschluss über das Schlussbilanzkonto (Saldo im Haben).",
    "Darlehensverbindlichkeiten: passives Bestandskonto; Anfangsbestand und Zugänge im Haben; Abschluss über das Schlussbilanzkonto (Saldo im Soll).",
    "Mietaufwand: Erfolgskonto (Aufwandskonto) als Unterkonto des Eigenkapitals; Aufwendungen im Soll; Abschluss über das GuV-Konto.",
    "Provisionserträge: Erfolgskonto (Ertragskonto); Erträge im Haben; Abschluss über das GuV-Konto.",
    "Privatentnahmen: Privatkonto als Unterkonto des Eigenkapitals; Entnahmen im Soll; Abschluss direkt über das Eigenkapitalkonto.",
    "Vorsteuer: aktives Bestandskonto (Forderung gegenüber dem Finanzamt); Zugänge im Soll; Verrechnung mit der Umsatzsteuer, ein Überhang geht ins Schlussbilanzkonto.",
  ],
  bewertung: [
    [1.5, "Kasse richtig", "aktives Bestandskonto, Soll, SBK"],
    [1.5, "Darlehensverbindlichkeiten richtig", "passives Bestandskonto, Haben, SBK"],
    [1, "Mietaufwand richtig", "Aufwandskonto, Soll, GuV"],
    [1, "Provisionserträge richtig", "Ertragskonto, Haben, GuV"],
    [1.5, "Privatentnahmen richtig", "Unterkonto EK, Soll, Abschluss über Eigenkapital"],
    [1.5, "Vorsteuer richtig", "aktives Bestandskonto, Verrechnung mit USt, Überhang ins SBK"],
  ],
}));

const C_FALL = {
  eb: { "BGA": 12000, "Warenbestand (WBK)": 15000, "Forderungen aLL": 4760, "Bank": 9000, "Kasse": 800, "Eigenkapital": 26560, "Verbindlichkeiten aLL": 5000, "Darlehensverbindlichkeiten": 10000 },
  laufend: [
    { nr: 1, datum: "02.12.", soll: [["Bank", 4664.8], ["Gewährte Skonti", 80], ["Umsatzsteuer", 15.2]], haben: [["Forderungen aLL", 4760]], hinweis: "2 % von 4.760 € = 95,20 € brutto; USt-Korrektur 15,20 € (§ 17 Abs. 1 UStG)" },
    { nr: 2, datum: "03.12.", soll: [["Wareneinkauf (WEK)", 10000], ["Vorsteuer", 1900]], haben: [["Verbindlichkeiten aLL", 11900]] },
    { nr: 3, datum: "05.12.", soll: [["Verbindlichkeiten aLL", 5000]], haben: [["Bank", 5000]] },
    { nr: 4, datum: "Dezember", soll: [["Bank", 23800], ["Kasse", 5950]], haben: [["Warenverkauf (WVK)", 25000], ["Umsatzsteuer", 4750]] },
    { nr: 5, datum: "12.12.", soll: [["Warenverkauf (WVK)", 500], ["Umsatzsteuer", 95]], haben: [["Kasse", 595]], hinweis: "Rücknahme mindert Erlös und USt" },
    { nr: 6, datum: "15.12.", soll: [["Fuhrpark", 9000]], haben: [["Privateinlagen", 9000]], hinweis: "Einlage zum Teilwert, keine Vorsteuer" },
    { nr: 7, datum: "18.12.", soll: [["Stromkosten", 300], ["Vorsteuer", 57]], haben: [["Bank", 357]] },
    { nr: 8, datum: "20.12.", soll: [["Bürobedarf", 80], ["Vorsteuer", 15.2]], haben: [["Kasse", 95.2]] },
    { nr: 9, datum: "22.12.", soll: [["Zinsaufwand", 60], ["Darlehensverbindlichkeiten", 500]], haben: [["Bank", 560]] },
    { nr: 10, datum: "23.12.", soll: [["Privatentnahmen", 450]], haben: [["Bank", 450]], hinweis: "private Krankenversicherung" },
  ],
  vorbereitend: (s) => [
    { nr: 11, soll: [["Abschreibungen", 450]], haben: [["BGA", 200], ["Fuhrpark", 250]] },
    { nr: 12, soll: [["Warenbestand (WBK)", 2000]], haben: [["Bestandsveränderungen (BVK)", 2000]], hinweis: "Endbestand 17.000 € − Anfangsbestand 15.000 € = Mehrung" },
    { nr: 13, soll: [["Bestandsveränderungen (BVK)", 2000]], haben: [["Wareneinkauf (WEK)", 2000]] },
    ustVerrechnung(14, s),
    { nr: 15, soll: [["Eigenkapital", 450]], haben: [["Privatentnahmen", 450]] },
    { nr: 16, soll: [["Privateinlagen", 9000]], haben: [["Eigenkapital", 9000]] },
  ],
};

const c3 = fest("bbf-c3", "Teil III – Buchführungstechnik: Elektrohandel", 2, 60, () => {
  const x = buche(C_FALL), ust = r2(4750 - 15.2 - 95), vst = r2(1900 + 57 + 15.2);
  const L = loesungTeil3(C_FALL, x, { ebEk: 26560, entnahmen: 450, einlagen: 9000, afaZeilen: ["BGA 200 € + eingelegter Pkw 250 € = 450 € laut Sachverhalt"] });
  return {
    sv: "Erik Ehlers (E) betreibt in Kiel einen Elektroeinzelhandel (alle Umsätze 19 %). Wirtschaftsjahr ist das Kalenderjahr; zu buchen ist der Dezember 2026.\n" +
      "Eröffnungsbilanz 01.12.2026: BGA 12.000 €, Warenbestand 15.000 €, Forderungen aLL 4.760 €, Bank 9.000 €, Kasse 800 € / Eigenkapital 26.560 €, Verbindlichkeiten aLL 5.000 €, Darlehensverbindlichkeiten 10.000 €.\n" +
      "1. 02.12.: Ein Kunde begleicht die gesamte Forderung aus der Eröffnungsbilanz (4.760 € einschließlich 19 % USt) unter Abzug von 2 % Skonto per Überweisung.\n" +
      "2. 03.12.: Wareneinkauf auf Ziel, Rechnung 10.000 € zzgl. 19 % USt.\n" +
      "3. 05.12.: Überweisung der Lieferantenverbindlichkeiten aus der Eröffnungsbilanz (5.000 €).\n" +
      "4. Dezember: Warenverkäufe 29.750 € einschließlich USt; 80 % per EC-Karte, 20 % bar.\n" +
      "5. 12.12.: Ein Kunde gibt ein defektes Gerät aus einem Barverkauf zurück; E zahlt ihm 595 € bar zurück.\n" +
      "6. 15.12.: E legt seinen bisher privaten Pkw in das Betriebsvermögen ein (Teilwert 9.000 €).\n" +
      "7. 18.12.: Stromabschlag 300 € zzgl. 57 € USt per Lastschrift.\n" +
      "8. 20.12.: Bürobedarf 80 € zzgl. 15,20 € USt, bar bezahlt.\n" +
      "9. 22.12.: Die Bank belastet 60 € Zinsen und 500 € Tilgung.\n" +
      "10. 23.12.: E überweist den Beitrag zu seiner privaten Krankenversicherung (450 €) vom Betriebskonto.\n" +
      "11. AfA für Dezember: BGA 200 €, Pkw 250 €.\n" +
      "12. Inventur 31.12.2026: Warenendbestand 17.000 €.",
    aufgaben: ["Buchen Sie Nr. 1–10.", "Bilden Sie die vorbereitenden Abschlussbuchungen.", "Erstellen Sie GuV-Konto und Schlussbilanzkonto und ermitteln Sie den Gewinn durch Betriebsvermögensvergleich."],
    loesung: L,
    bewertung: [
      [3, "Nr. 1 Kundenzahlung mit gewährtem Skonto und USt-Korrektur", "Bank 4.664,80 €, Gewährte Skonti 80 €, Umsatzsteuer 15,20 € an Forderungen aLL 4.760 €"],
      [1, "Nr. 2 Wareneinkauf", "WEK 10.000 €, Vorsteuer 1.900 € an Verbindlichkeiten aLL 11.900 €"],
      [0.5, "Nr. 3 Zahlung Verbindlichkeit", "Verbindlichkeiten aLL an Bank 5.000 €"],
      [1, "Nr. 4 Verkäufe aufgeteilt", "Bank 23.800 €, Kasse 5.950 € an WVK 25.000 €, Umsatzsteuer 4.750 €"],
      [2, "Nr. 5 Rücknahme mit USt-Korrektur", "WVK 500 €, Umsatzsteuer 95 € an Kasse 595 €"],
      [2, "Nr. 6 Pkw-Einlage ohne Vorsteuer", "Fuhrpark an Privateinlagen 9.000 €"],
      [1, "Nr. 7 Strom", "Stromkosten 300 €, Vorsteuer 57 € an Bank 357 €"],
      [0.5, "Nr. 8 Bürobedarf", "Bürobedarf 80 €, Vorsteuer 15,20 € an Kasse 95,20 €"],
      [1, "Nr. 9 Zinsen und Tilgung", "Zinsaufwand 60 €, Darlehensverbindlichkeiten 500 € an Bank 560 €"],
      [1.5, "Nr. 10 Privatentnahme, keine Vorsteuer", "Privatentnahmen an Bank 450 €"],
      [1, "AfA", "Abschreibungen 450 € an BGA 200 €, Fuhrpark 250 €"],
      [2, "Bestandsmehrung 2.000 €", "WBK an BVK 2.000 €; BVK an WEK 2.000 €"],
      [1.5, `USt-Verrechnung, Zahllast ${e(ust - vst)}`, `Umsatzsteuer an Vorsteuer ${e(vst)}`],
      [1.5, "Privatkonten über Eigenkapital", "EK an Privatentnahmen 450 €; Privateinlagen an EK 9.000 €"],
      [3.5, `GuV-Konto mit Gewinn ${e(x.gewinn)}`, `Aufwendungen ${e(x.summe(x.guvS))} (inkl. gewährte Skonti), Erträge ${e(x.summe(x.guvH))}`],
      [3.5, `SBK ausgeglichen (${e(x.summe(x.sbkA))})`, `Eigenkapital ${e(x.ekEnde)}`],
      [3.5, `BVV: Gewinn ${e(x.gewinn)}`, "BV Ende − BV Anfang + Entnahmen 450 € − Einlagen 9.000 €"],
    ],
    zahlen: [{ frage: "Gewinn Dezember 2026 (€)", wert: x.gewinn, toleranz: 0.5 }, { frage: "USt-Zahllast (€)", wert: r2(ust - vst), toleranz: 0.5 }],
  };
});

export const SV_BBF = [a1, a2, b1, b2, b3, c1, c2, c3];
export const KLAUSUREN_BBF = [
  { id: "bbf-a", kurz: "A", titel: "Gewürzhandel Lange – Buchführungspflicht, Skonto, Digital-AfA, Abschluss", minuten: 90, teile: ["bbf-a1", "bbf-a2"] },
  { id: "bbf-b", kurz: "B", titel: "Blumenhandel Olsen und Pflanzenhandel Peters – § 141 AO, Einordnung, 7 %, Warenentnahme, Bestandsminderung", minuten: 90, teile: ["bbf-b1", "bbf-b2", "bbf-b3"] },
  { id: "bbf-c", kurz: "C", titel: "Elektrohandel Ehlers – Aufbewahrung, Kontenarten, gewährte Skonti, Einlage, Rücknahme", minuten: 90, teile: ["bbf-c1", "bbf-c2", "bbf-c3"] },
];
