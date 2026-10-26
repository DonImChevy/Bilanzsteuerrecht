// Bilanzsteuerrecht GS I, Teil II: GoB und Betriebsvermögen, Zurechnung, Anschaffungskosten, Grundstücke, Abschreibungen, Teilwert,
// Rechnungsabgrenzung, Entnahmen und Einlagen. Nach Skript und Übungsheft Teil II (2026/2027) und den
// Lösungshinweisen der Semesterklausuren; Rechtsstand 2026. Reine Daten- und Generatordatei.
import { zahl, auswahl, buchung, satz, einfach, reihum } from "../kern.js";
import * as G from "../geld.js";

const eur = G.euro, E = G.E, ust = (n, s = 19) => G.prozent(n, s);
const MONAT = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const Q = "Übungen Teil II";
const V = (id, thema, erzeugen) => ({ id, thema, erzeugen });
/** Rechenaufgabe; Abweichungen unter 1 € (kaufmännische Rundung wie in der Klausur erlaubt) zählen als richtig. */
const rechnen = (id, thema, text, cent, erkl, quelle = Q) => zahl(id, thema, text, Math.round(cent), erkl, { toleranz: 99, quelle });
/** Einordnungsfall: zieht einen Fall; optionen gelten für alle Fälle oder je Fall (f.optionen). */
const F = (id, thema, frage, optionen, faelle) => V(id, thema, ((ziehe) => (r) => {
  const f = ziehe(r); // reihum – jeder Fall kommt dran, bevor sich einer wiederholt
  return { ...auswahl(id, thema, `${f.text}\n\n${f.frage || frage}`, f.optionen || optionen, [f.richtig], f.erkl, r), normen: f.normen || [] };
})(reihum(faelle)));
/** Frage-Antwort mit Multiple-Choice-Fassung (mc) und Stichworten für die automatische Prüfung (sw). */
const A = (id, thema, text, antwort, normen, mc, sw, { fall = false } = {}) => ({
  id, thema, mc, sw, erzeugen: () => ({ id, thema, typ: "offen", fall, text, antwort, normen, erklaerung: "", quelle: Q }),
});
const M = (r, f, frage) => ({ r, f, frage });
/** Volle Monate ab dem Zugangsmonat bis Jahresende (Monat des Zugangs zählt voll, § 7 Abs. 1 S. 4 EStG). */
const monate = (m) => 13 - m;

// ======================================================================= Zurechnung und Zugangszeitpunkt
const zurechnung = [
  A("t2-wirtschaftliches-eigentum", "bsr-zurechnung",
    "Wem ist ein Wirtschaftsgut zuzurechnen, und ab wann ist es beim Erwerber zu bilanzieren? Gehen Sie auf den Eigentumsvorbehalt und den Grundstückserwerb ein.",
    "• Grundsatz: Zurechnung beim (rechtlichen) Eigentümer (§ 39 Abs. 1 AO, § 246 Abs. 1 S. 2 Hs. 1 HGB).\n• Ausnahme wirtschaftliches Eigentum (§ 39 Abs. 2 Nr. 1 AO, § 246 Abs. 1 S. 2 Hs. 2 HGB): Wer die tatsächliche Herrschaft so ausübt, dass er den Eigentümer auf Dauer von der Einwirkung ausschließen kann, bilanziert das Wirtschaftsgut.\n• Zeitpunkt: Angeschafft ist ein Wirtschaftsgut mit der Lieferung (§ 9a EStDV) = Verschaffung der Verfügungsmacht, also Übergang von Besitz, Gefahr, Nutzen und Lasten (H 7.4 „Lieferung“ EStH). Kaufvertrag und Bezahlung sind unerheblich.\n• Eigentumsvorbehalt (§ 449 BGB): Der Käufer wird mit Lieferung wirtschaftlicher Eigentümer und bilanziert die Sache; rechtlicher Eigentümer wird er erst mit vollständiger Bezahlung.\n• Grundstück: maßgeblich ist der Übergang von Nutzen und Lasten – nicht der notarielle Kaufvertrag und nicht die Eintragung im Grundbuch.\n• Herstellung: Jahr der Fertigstellung (§ 9a EStDV).",
    ["AO 39", "EStDV 9a", "BGB 449 1"],
    M(["Unter Eigentumsvorbehalt gelieferte Ware bilanziert der Käufer ab Lieferung.", "Ein Grundstück ist ab dem Übergang von Nutzen und Lasten zu bilanzieren.", "Jahr der Anschaffung ist das Jahr der Lieferung.", "Wirtschaftliches Eigentum geht dem rechtlichen Eigentum bei der Zurechnung vor."],
      ["Ein Grundstück ist erst ab der Eintragung im Grundbuch zu bilanzieren.", "Unter Eigentumsvorbehalt gelieferte Ware bilanziert bis zur Bezahlung der Verkäufer.", "Maßgeblich für die Anschaffung ist der Abschluss des Kaufvertrags.", "Ein Wirtschaftsgut ist stets beim rechtlichen Eigentümer zu bilanzieren."],
      "Welche Aussagen zur Zurechnung und zum Zugangszeitpunkt sind richtig?"),
    { norm: ["AO 39|HGB 246"], s: ["wirtschaftlich eigentum|wirtschaftlicher eigentuemer", "lieferung|verfuegungsmacht", "nutzen lasten", "eigentumsvorbehalt|449", "grundbuch|kaufvertrag"] }),
  A("t2-schwebendes-geschaeft", "bsr-zurechnung",
    "Was ist ein schwebendes Geschäft, und wie werden Anzahlungen darauf bilanziert?",
    "• Schwebendes Geschäft: gegenseitiger Vertrag, den noch keine Seite erfüllt hat (z. B. bestellte, noch nicht gelieferte Ware). Es wird nicht bilanziert – Anspruch und Verpflichtung gleichen sich aus (Grundsatz der Nichtbilanzierung schwebender Geschäfte; Ausnahme drohende Verluste, steuerlich nicht, § 5 Abs. 4a EStG).\n• Leistet der Käufer vorab eine Zahlung, ist sie als geleistete Anzahlung zu aktivieren (Forderung auf die Lieferung); die Vorsteuer daraus ist bei ordnungsgemäßer Rechnung schon mit Zahlung abziehbar (§ 15 Abs. 1 S. 1 Nr. 1 S. 3 UStG).\n• Beim Verkäufer: erhaltene Anzahlung als Verbindlichkeit passivieren; die Umsatzsteuer entsteht mit Vereinnahmung (§ 13 Abs. 1 Nr. 1 a S. 4 UStG).\n• Mit der Lieferung wird die Anzahlung umgebucht (z. B. Maschinen an geleistete Anzahlungen).\n• Erfolgsneutral: Anzahlungen berühren den Gewinn nicht.",
    ["HGB 246 1", "UStG 15 1"],
    M(["Ein beiderseits noch nicht erfülltes Geschäft wird grundsätzlich nicht bilanziert.", "Eine vor der Lieferung geleistete Zahlung wird als geleistete Anzahlung aktiviert.", "Erhaltene Anzahlungen sind beim Verkäufer zu passivieren.", "Anzahlungen sind erfolgsneutral."],
      ["Bestellte Waren sind bereits mit der Bestellung zu aktivieren.", "Geleistete Anzahlungen sind sofort als Aufwand zu buchen.", "Eine erhaltene Anzahlung ist sofort als Umsatzerlös zu buchen.", "Die Vorsteuer aus einer Anzahlung ist erst bei Lieferung abziehbar."],
      "Welche Aussagen zum schwebenden Geschäft und zu Anzahlungen sind richtig?"),
    { norm: [], s: ["schwebend", "nicht bilanz|keine bilanz|nicht zu bilanz|nicht aktiv", "geleistete anzahlung", "erhaltene anzahlung", "erfolgsneutral|gewinn nicht|kein aufwand|keine gewinnauswirkung"] }),
  F("t2-zeitpunkt", "bsr-zurechnung", "Wann ist das Wirtschaftsgut angeschafft bzw. hergestellt (Zugang in der Bilanz, Beginn der AfA)?", null, [
    { text: "Ein Fahrradhändler bestellt online ein Rennrad für einen Kunden (Lieferung unter Eigentumsvorbehalt): Bestellung am 01.04., Versandbestätigung am 01.04. abends, Entgegennahme beim Händler am 02.04., Bezahlung unter Skontoabzug am 12.04.",
      optionen: ["01.04. (Bestellung)", "02.04. (Entgegennahme)", "12.04. (Bezahlung)"], richtig: 1,
      erkl: "Angeschafft ist mit der Lieferung = Verschaffung der Verfügungsmacht (§ 9a EStDV, H 7.4 „Lieferung“ EStH), hier mit der Entgegennahme am 02.04. Der Eigentumsvorbehalt (§ 449 BGB) ändert daran nichts: wirtschaftliches Eigentum ab Lieferung (§ 39 Abs. 2 Nr. 1 AO).", normen: ["EStDV 9a", "BGB 449 1", "AO 39 2"] },
    { text: "Kauf eines bebauten Betriebsgrundstücks: notarieller Kaufvertrag am 15.11., Zahlung des Kaufpreises am 30.11., Übergang von Nutzen und Lasten am 01.12., Eintragung im Grundbuch am 29.12.",
      optionen: ["15.11. (Kaufvertrag)", "30.11. (Zahlung)", "01.12. (Nutzen und Lasten)", "29.12. (Grundbuch)"], richtig: 2,
      erkl: "Mit dem Übergang von Nutzen und Lasten erlangt der Käufer das wirtschaftliche Eigentum (§ 39 Abs. 2 Nr. 1 AO, § 246 Abs. 1 S. 2 Hs. 2 HGB) – das ist der Anschaffungszeitpunkt. Die Gebäude-AfA beginnt im Dezember.", normen: ["AO 39 2", "HGB 246 1"] },
    { text: "Ein Fahrradhändler kauft einen Werkstattwagen: Kaufvertrag am 20.11., Vorkasse per Überweisung am 22.11., Übergabe des Fahrzeugs am 05.12.",
      optionen: ["20.11. (Kaufvertrag)", "22.11. (Vorkasse)", "05.12. (Übergabe)"], richtig: 2,
      erkl: "Angeschafft mit der Übergabe (Lieferung, § 9a EStDV). Die Vorkasse am 22.11. ist bis dahin eine geleistete Anzahlung. AfA ab Dezember: 1/12 der Jahres-AfA.", normen: ["EStDV 9a"] },
    { text: "Eine Händlerin bestellt am 11.11. Fernseher; die Lieferung unter Eigentumsvorbehalt erfolgt am 20.11.; sie bezahlt am 30.11. unter Abzug von Skonto.",
      optionen: ["11.11. (Bestellung)", "20.11. (Lieferung)", "30.11. (Bezahlung)"], richtig: 1,
      erkl: "Zugang mit Lieferung am 20.11. (wirtschaftliches Eigentum, § 39 Abs. 2 Nr. 1 AO); rechtliches Eigentum erst mit vollständiger Bezahlung (§ 449 BGB). Bis zur Lieferung lag ein schwebendes Geschäft vor.", normen: ["AO 39 2", "BGB 449 1"] },
    { text: "Ein Unternehmer lässt ein Betriebsgebäude errichten: Baubeginn am 01.03., Fertigstellung und Bauabnahme am 10.09., Bezahlung des Bauunternehmers am 15.09.",
      optionen: ["01.03. (Baubeginn)", "10.09. (Fertigstellung)", "15.09. (Bezahlung)"], richtig: 1,
      erkl: "Hergestellt ist das Gebäude im Zeitpunkt der Fertigstellung (§ 9a EStDV). Die AfA nach § 7 Abs. 4 EStG beginnt im September (zeitanteilig für 4 Monate).", normen: ["EStDV 9a"] },
    { text: "Ein Weinhändler bestellt am 10.11. eine Warenwirtschafts-Software. Lieferung und Installation erfolgen am 28.11., die Bezahlung am 29.11.",
      optionen: ["10.11. (Bestellung)", "28.11. (Lieferung)", "29.11. (Bezahlung)"], richtig: 1,
      erkl: "Anschaffung mit der Lieferung (§ 9a EStDV) am 28.11. – AfA für November und Dezember (2/12).", normen: ["EStDV 9a"] },
  ]),
  F("t2-schwebend", "bsr-zurechnung", "Wie ist der Vorgang zum Bilanzstichtag 31.12.01 beim Unternehmer zu behandeln?",
    ["Schwebendes Geschäft – nicht bilanzieren", "Geleistete Anzahlung aktivieren", "Wirtschaftsgut aktivieren", "Erhaltene Anzahlung passivieren"], [
      { text: "Ein Sportartikelhändler bestellt am 31.12.01 Trikots für 100.000 € zzgl. USt. Die Lieferung ist für Februar 02 vereinbart; bezahlt hat er noch nichts.", richtig: 0,
        erkl: "Keine Seite hat bisher geleistet → schwebendes Geschäft, das nicht bilanziert wird (Ansprüche und Verpflichtungen gleichen sich aus).", normen: ["HGB 246 1"] },
      { text: "Ein Sportartikelhändler bestellt am 31.12.01 Trikots für 100.000 € zzgl. USt (Lieferung Februar 02) und leistet laut Rechnung noch am 31.12.01 eine Anzahlung von 23.800 €.", richtig: 1,
        erkl: "Die Vorleistung des Käufers ist als geleistete Anzahlung (20.000 €) zu aktivieren; die Vorsteuer (3.800 €) ist bei Rechnung und Zahlung schon in 01 abziehbar (§ 15 Abs. 1 S. 1 Nr. 1 S. 3 UStG).", normen: ["UStG 15 1"] },
      { text: "Eine Maschine wird am 20.12.01 unter Eigentumsvorbehalt geliefert und in Betrieb genommen; die Rechnung wird erst im Januar 02 bezahlt.", richtig: 2,
        erkl: "Mit Lieferung ist der Käufer wirtschaftlicher Eigentümer (§ 39 Abs. 2 Nr. 1 AO) → Maschine aktivieren, Verbindlichkeit passivieren, AfA für Dezember.", normen: ["AO 39 2", "BGB 449 1"] },
      { text: "Ein Kunde zahlt am 15.12.01 vereinbarungsgemäß 5.950 € an; die bestellte Ware wird erst im Februar 02 geliefert.", richtig: 3,
        erkl: "Beim Verkäufer ist die Vorleistung des Kunden als erhaltene Anzahlung zu passivieren (Erfolg entsteht erst mit Lieferung); die USt entsteht bereits mit Vereinnahmung.", normen: ["HGB 246 1"] },
    ]),
  V("t2-anzahlung-lieferung", "bsr-zurechnung", (r) => {
    const preis = r.betrag(20000, 120000, 1000), anz = Math.round(preis * r.wahl([0.3, 0.4, 0.5]) / 100000) * 100000;
    const rest = preis - anz, uRest = ust(rest);
    return buchung("t2-anzahlung-lieferung", "bsr-zurechnung",
      `Ein Unternehmer hat für eine bestellte Maschine (Kaufpreis ${eur(preis)} zzgl. 19 % USt) im Vorjahr eine Anzahlung von ${eur(anz)} zzgl. ${eur(ust(anz))} USt geleistet und zutreffend gebucht. Jetzt wird die Maschine geliefert; den Restbetrag überweist er sofort.\n\nBilden Sie den Buchungssatz für die Lieferung und Restzahlung.`,
      satz([["maschinen", preis], ["vorsteuer", uRest]], [["geleisteteAnzahlungen", anz], ["bank", rest + uRest]]),
      `Mit der Lieferung (§ 9a EStDV) ist die Maschine mit den vollen Anschaffungskosten von ${eur(preis)} zu aktivieren; die geleistete Anzahlung (${eur(anz)}) wird aufgelöst. Vorsteuer nur noch auf den Restbetrag (${eur(uRest)}), weil die Vorsteuer aus der Anzahlung schon abgezogen wurde.`,
      { quelle: Q + " – Wiederholung, Anzahlung" });
  }),
];

// ======================================================================= Anschaffungskosten
const AK_OPT = ["Anschaffungs(neben)kosten – aktivieren", "Minderung der Anschaffungskosten", "Sofort abziehbare Betriebsausgabe", "Weder Anschaffungskosten noch Betriebsausgabe"];
const ak = [
  A("t2-ak-begriff", "bsr-ak",
    "Was gehört zu den Anschaffungskosten eines Wirtschaftsguts, was nicht?",
    "§ 255 Abs. 1 HGB (über § 5 Abs. 1, § 6 Abs. 1 Nr. 1 und 2 EStG auch steuerlich):\n• Anschaffungskosten sind die Aufwendungen, um einen Vermögensgegenstand zu erwerben und in einen betriebsbereiten Zustand zu versetzen, soweit sie ihm einzeln zugeordnet werden können (S. 1).\n• Dazu gehören der Anschaffungspreis, die Nebenkosten (Fracht, Verpackung, Transportversicherung, Montage, Überführung, Zulassung, Kennzeichen, Installation, Notar und Grunderwerbsteuer, Makler, Fahrtkosten zum Erwerb) und nachträgliche Anschaffungskosten (S. 2).\n• Anschaffungspreisminderungen (Rabatt, Skonto, Bonus) sind abzusetzen (S. 3) – Skonto erst bei Inanspruchnahme (H 6.2 „Skonto“ EStH).\n• Nicht dazu gehören: abziehbare Vorsteuer (§ 9b Abs. 1 EStG), Finanzierungskosten (Zinsen, Grundschuldkosten), laufende Kosten (Kfz-Steuer, Versicherung, Wartung, Schulung), Kosten vor dem Erwerbsentschluss (allgemeine Messebesuche) und die eigene Arbeitsleistung des Unternehmers (kein Aufwand).",
    ["HGB 255 1", "EStG 9b 1"],
    M(["Anschaffungsnebenkosten gehören zu den Anschaffungskosten.", "Skonto mindert die Anschaffungskosten.", "Die abziehbare Vorsteuer gehört nicht zu den Anschaffungskosten.", "Finanzierungszinsen gehören nicht zu den Anschaffungskosten."],
      ["Die Kfz-Steuer für einen neu gekauften Pkw gehört zu dessen Anschaffungskosten.", "Die abziehbare Vorsteuer erhöht die Anschaffungskosten.", "Skonto ist als Ertrag zu buchen, wenn ein Anlagegut bezahlt wird.", "Die eigene Arbeitszeit des Unternehmers ist mit einem angemessenen Stundensatz zu aktivieren."],
      "Welche Aussagen zu den Anschaffungskosten sind richtig?"),
    { norm: ["HGB 255"], s: ["betriebsbereit", "nebenkosten", "minderung|rabatt|skonto", "vorsteuer", "finanzierung|zinsen"] }),
  F("t2-ak-einordnung", "bsr-ak", "Wie sind die Aufwendungen beim Erwerb einzuordnen (Unternehmer mit vollem Vorsteuerabzug)?", AK_OPT, [
    { text: "Für die Anlieferung einer neuen Produktionsmaschine berechnet der Lieferant Transportkosten von 3.500 € zzgl. USt.", richtig: 0, erkl: "Transportkosten sind Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB).", normen: ["HGB 255 1"] },
    { text: "Für die Montage der neuen Maschine im Betrieb fallen 4.700 € zzgl. USt an.", richtig: 0, erkl: "Die Montage versetzt die Maschine in den betriebsbereiten Zustand → Anschaffungskosten (§ 255 Abs. 1 S. 1 HGB).", normen: ["HGB 255 1"] },
    { text: "Der Lieferant hat für den Transport der Maschine eine Transportversicherung (umsatzsteuerfrei) im Namen des Käufers abgeschlossen und ihm 800 € berechnet.", richtig: 0, erkl: "Die Transportversicherung dient dem Erwerb → Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB).", normen: ["HGB 255 1"] },
    { text: "Beim Kauf eines Firmenwagens fallen Überführungskosten von 500 € zzgl. USt an.", richtig: 0, erkl: "Überführungskosten sind Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB).", normen: ["HGB 255 1"] },
    { text: "Für den neuen Firmenwagen zahlt der Unternehmer Zulassungsgebühren von 30 € und für die Kennzeichen 20 € zzgl. USt.", richtig: 0, erkl: "Zulassung und Kennzeichen sind nötig, um das Fahrzeug betriebsbereit zu machen → Anschaffungsnebenkosten.", normen: ["HGB 255 1"] },
    { text: "Für den neuen Firmenwagen wird die Kfz-Steuer für das laufende Jahr abgebucht.", richtig: 2, erkl: "Die Kfz-Steuer ist laufender Aufwand für die Nutzung → Betriebsausgabe (§ 4 Abs. 4 EStG); Vorauszahlungen über den Stichtag hinaus sind aktiv abzugrenzen.", normen: ["EStG 4 4"] },
    { text: "Der Unternehmer absolviert mit dem neuen Firmenwagen ein Fahrsicherheitstraining für 250 € zzgl. USt.", richtig: 2, erkl: "Das Training macht das Fahrzeug nicht betriebsbereit → sofort abziehbare Betriebsausgabe.", normen: ["EStG 4 4"] },
    { text: "Der Unternehmer bezahlt die Rechnung über eine Maschine unter Abzug von 3 % Skonto.", richtig: 1, erkl: "Skonto ist eine Anschaffungspreisminderung (§ 255 Abs. 1 S. 3 HGB) – beim Anlagevermögen direkt auf dem Anlagekonto; die Vorsteuer ist zu berichtigen (§ 17 Abs. 1 UStG).", normen: ["HGB 255 1", "UStG 17 1"] },
    { text: "Ein Versicherungsvertreter (steuerfreie Umsätze nach § 4 Nr. 11 UStG) kauft für seinen Betrieb einen Pkw für 40.000 € zzgl. 7.600 € USt.", richtig: 0, erkl: "Die Vorsteuer ist nach § 15 Abs. 2 UStG nicht abziehbar und gehört deshalb zu den Anschaffungskosten (§ 9b Abs. 1 EStG Umkehrschluss): AK = 47.600 €.", normen: ["EStG 9b 1"] },
    { text: "Die Vorsteuer aus der Rechnung über eine Maschine ist voll abziehbar.", richtig: 3, erkl: "Abziehbare Vorsteuer gehört nicht zu den Anschaffungskosten (§ 9b Abs. 1 EStG); sie ist eine Forderung gegenüber dem Finanzamt und kein Aufwand.", normen: ["EStG 9b 1"] },
    { text: "Für ein Darlehen, mit dem die Maschine finanziert wurde, fallen im Jahr 6.000 € Zinsen an.", richtig: 2, erkl: "Finanzierungskosten gehören nicht zu den Anschaffungskosten → Betriebsausgabe (Zinsaufwand).", normen: ["EStG 4 4"] },
    { text: "Der Unternehmer besucht im Februar eine Fachmesse, um sich allgemein über Produktionsmaschinen zu informieren; im Juli kauft er eine Maschine eines Ausstellers.", richtig: 2, erkl: "Kosten vor der konkreten Erwerbsentscheidung sind keine Anschaffungsnebenkosten → Reisekosten als Betriebsausgabe.", normen: ["EStG 4 4"] },
    { text: "Der Unternehmer reist im Mai zum Hersteller, um sich eine bestimmte Produktionsmaschine vorführen zu lassen, die er dort im Juni kauft. Die Reisekosten betragen 900 €.", richtig: 0, erkl: "Die Reise dient dem Erwerb genau dieser Maschine (Einzelkosten nach der konkreten Erwerbsentscheidung) → Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB). Anders der allgemeine Messebesuch (Gemeinkosten).", normen: ["HGB 255 1"] },
    { text: "Beim Kauf eines Motorrads lässt der Unternehmer einen Hecklederkoffer für 700 € zzgl. USt mitliefern und montieren.", richtig: 0, erkl: "Zubehör, das mit dem Fahrzeug erworben wird, gehört als Nebenkosten zu den Anschaffungskosten (§ 255 Abs. 1 S. 2 HGB).", normen: ["HGB 255 1"] },
    { text: "Für die Installation und Einrichtung einer Warenwirtschafts-Software berechnet der Anbieter 850 € zzgl. USt.", richtig: 0, erkl: "Installation und Einrichtung versetzen die Software in den betriebsbereiten Zustand → Anschaffungskosten (§ 255 Abs. 1 S. 1 HGB).", normen: ["HGB 255 1"] },
    { text: "Ein externer Berater, den der Unternehmer mit der Auswahl einer Warenwirtschafts-Software beauftragt hat, berechnet 600 € zzgl. USt.", richtig: 0, erkl: "Die Beratung steht im Zusammenhang mit dem konkreten Erwerb → Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB).", normen: ["HGB 255 1"] },
    { text: "Der Anbieter einer neuen Software berechnet eine Anwenderschulung für den Unternehmer über 200 € zzgl. USt.", richtig: 2, erkl: "Die Schulung betrifft den Anwender, nicht die Betriebsbereitschaft der Software → sofort abziehbare Betriebsausgabe.", normen: ["EStG 4 4"] },
    { text: "Der Unternehmer hält für die Zeit, die er mit der Besichtigung und dem Notartermin verbracht hat, eine Vergütung von 100 € für angemessen und nimmt sich das Geld aus der Kasse.", richtig: 3, erkl: "Die eigene Arbeitsleistung ist kein Aufwand → keine Anschaffungskosten. Die Geldentnahme ist eine Privatentnahme (§ 4 Abs. 1 S. 2 EStG).", normen: ["EStG 4 1"] },
    { text: "Der Unternehmer erhält für eine Lieferung von Waren nachträglich einen Bonus des Lieferanten.", richtig: 1, erkl: "Ein Bonus ist eine nachträgliche Anschaffungspreisminderung (§ 255 Abs. 1 S. 3 HGB); bei Waren über das Konto Erhaltene Boni, die Vorsteuer ist zu berichtigen (§ 17 UStG).", normen: ["HGB 255 1"] },
  ]),
  V("t2-ak-maschine", "bsr-ak", (r) => {
    const preis = r.betrag(40000, 150000, 1000), verp = r.betrag(500, 3000, 100), transp = r.betrag(1000, 5000, 100), mont = r.betrag(1500, 6000, 100), vers = r.betrag(300, 1200, 50);
    const s = r.wahl([2, 3]), mon = r.zahl(3, 11), messe = r.betrag(800, 2500, 100), zins = r.betrag(2000, 8000, 500);
    const brutto = preis + verp + transp + mont, sk = Math.round((brutto + vers) * s / 100), ak = brutto + vers - sk;
    return rechnen("t2-ak-maschine", "bsr-ak",
      `Kaufmann A erhält am ${r.zahl(2, 26)}. ${MONAT[mon - 1]} eine neue Produktionsmaschine. Die Rechnung lautet (netto): Maschine ${eur(preis)}, Verpackung ${eur(verp)}, Transport ${eur(transp)}, Montage ${eur(mont)}, verauslagte Transportversicherung (umsatzsteuerfrei) ${eur(vers)}, jeweils zzgl. 19 % USt außer der Versicherung. A zahlt unter Abzug von ${s} % Skonto auf den gesamten Rechnungsbetrag.\nVorher hatte er auf einer Fachmesse Reisekosten von ${eur(messe)}; für das Finanzierungsdarlehen fallen ${eur(zins)} Zinsen an.\n\nWie hoch sind die Anschaffungskosten der Maschine (in €)?`,
      ak,
      `§ 255 Abs. 1 HGB:\nKaufpreis ${eur(preis)} + Verpackung ${eur(verp)} + Transport ${eur(transp)} + Montage ${eur(mont)} + Transportversicherung ${eur(vers)} = ${eur(brutto + vers)}\n− Skonto ${s} % (Anschaffungspreisminderung, S. 3): ${eur(sk)}\n= Anschaffungskosten ${eur(ak)}\nDie Vorsteuer gehört nicht dazu (§ 9b Abs. 1 EStG). Messe-Reisekosten (vor der Erwerbsentscheidung) und Zinsen (Finanzierung) sind Betriebsausgaben.`);
  }),
  V("t2-ak-kfz", "bsr-ak", (r) => {
    const liste = r.betrag(25000, 60000, 100), rabatt = r.betrag(500, 5000, 100), ueberf = r.betrag(300, 900, 50), schild = r.betrag(20, 80, 5), zul = r.betrag(30, 80, 5);
    const steuer = r.betrag(150, 600, 10), vers = r.betrag(400, 1200, 50), ak = liste - rabatt + ueberf + schild + zul;
    return rechnen("t2-ak-kfz", "bsr-ak",
      `Ein Unternehmer kauft einen Firmenwagen (ausschließlich betriebliche Nutzung): Listenpreis ${eur(liste)}, Rabatt ${eur(rabatt)}, Überführung ${eur(ueberf)}, Kennzeichen ${eur(schild)} – jeweils netto zzgl. 19 % USt. Außerdem zahlt er Zulassungsgebühren ${eur(zul)} (ohne USt), die Kfz-Steuer ${eur(steuer)} und die Kfz-Versicherung ${eur(vers)}.\n\nWie hoch sind die Anschaffungskosten des Fahrzeugs (in €)?`,
      ak,
      `Listenpreis ${eur(liste)} − Rabatt ${eur(rabatt)} + Überführung ${eur(ueberf)} + Kennzeichen ${eur(schild)} + Zulassung ${eur(zul)} = ${eur(ak)} (§ 255 Abs. 1 HGB).\nKfz-Steuer und Versicherung sind laufende Betriebsausgaben (ggf. aktive Rechnungsabgrenzung), die Vorsteuer ist abziehbar (§ 9b Abs. 1 EStG).`);
  }),
  V("t2-kfz-kauf", "bsr-ak", (r) => {
    const netto = r.betrag(20000, 50000, 100), zul = r.betrag(40, 90, 5), steuer = r.betrag(150, 500, 10), u = ust(netto);
    return buchung("t2-kfz-kauf", "bsr-ak",
      `Kauf eines Lieferwagens per Banküberweisung: Kaufpreis einschließlich Überführung ${eur(netto)} zzgl. ${eur(u)} USt. Mit derselben Überweisung werden verauslagte Zulassungsgebühren (${eur(zul)}, ohne USt) und die Kfz-Steuer für das laufende Jahr (${eur(steuer)}) bezahlt.`,
      satz([["fuhrpark", netto + zul], ["vorsteuer", u], ["kfzKosten", steuer]], [["bank", netto + u + zul + steuer]]),
      `Anschaffungskosten = Kaufpreis + Zulassung = ${eur(netto + zul)} (§ 255 Abs. 1 HGB). Die Vorsteuer ist abziehbar (§ 9b Abs. 1 EStG), die Kfz-Steuer ist laufender Aufwand (§ 4 Abs. 4 EStG).`,
      { quelle: Q + " – Abschreibungen § 7 Abs. 1 EStG, Sachverhalt 5" });
  }),
  V("t2-software", "bsr-ak", (r) => {
    const sw = r.betrag(2000, 8000, 100), inst = r.betrag(300, 1500, 50), schul = r.betrag(100, 500, 50), wart = r.betrag(30, 120, 10);
    const u = ust(sw + inst + schul + wart);
    return buchung("t2-software", "bsr-ak",
      `Ein Händler erhält eine Rechnung für ein Warenwirtschaftssystem und bezahlt sie per Bank: Software ${eur(sw)}, Installation und Einrichtung ${eur(inst)}, Anwenderschulung ${eur(schul)}, Wartungsgebühr für den laufenden Monat ${eur(wart)} – zusammen zzgl. ${eur(u)} USt.`,
      satz([["immaterielleVG", sw + inst], ["sonstigeAufwendungen", schul + wart], ["vorsteuer", u]], [["bank", sw + inst + schul + wart + u]]),
      `Software und Installation/Einrichtung = Anschaffungskosten (§ 255 Abs. 1 S. 1 HGB) → Immaterielle Vermögensgegenstände ${eur(sw + inst)}. Schulung und Wartung betreffen nicht den Erwerb → sofort abziehbare Betriebsausgaben (§ 4 Abs. 4 EStG). Vorsteuer abziehbar (§ 9b Abs. 1 EStG).`,
      { quelle: "Semesterklausur 10/24, Sachverhalt 1 (Muster)" });
  }),
];

// ======================================================================= Grundstückserwerb und Gebäude-AfA
const gebaeudeFaelle = [
  { text: "Das Gebäude gehört zum Betriebsvermögen und wird für eigenbetriebliche Zwecke (Lager, Büro) genutzt. Der Bauantrag wurde 1993 gestellt.", satz: 3, richtig: 0,
    erkl: "Wirtschaftsgebäude: Betriebsvermögen, keine Wohnzwecke, Bauantrag nach dem 31.03.1985 → 3 % (§ 7 Abs. 4 S. 1 Nr. 1 EStG)." },
  { text: "Das Gebäude gehört zum Betriebsvermögen und wird eigenbetrieblich als Ladengeschäft genutzt (Baujahr 2016).", satz: 3, richtig: 0,
    erkl: "Betriebsgebäude, nicht zu Wohnzwecken, Bauantrag nach dem 31.03.1985 → 3 % (§ 7 Abs. 4 S. 1 Nr. 1 EStG)." },
  { text: "Das Gebäude gehört zum Betriebsvermögen und wird eigenbetrieblich genutzt; der Bauantrag wurde 1965 gestellt.", satz: 2, richtig: 1,
    erkl: "Nr. 1 scheidet aus (Bauantrag vor dem 01.04.1985). Fertigstellung nach 1924 und vor 2023 → 2 % (§ 7 Abs. 4 S. 1 Nr. 2 b EStG)." },
  { text: "Das Gebäude gehört zum Betriebsvermögen, wird aber als Wohnung an Arbeitnehmer vermietet; fertiggestellt 1991.", satz: 2, richtig: 1,
    erkl: "Wohnzwecke → keine Nr. 1. Fertigstellung vor 2023 und nach 1924 → 2 % (§ 7 Abs. 4 S. 1 Nr. 2 b EStG)." },
  { text: "Das Gebäude gehört zum Betriebsvermögen und wird eigenbetrieblich genutzt; Baujahr 1901.", satz: 2.5, richtig: 2,
    erkl: "Bauantrag vor 1985 → keine Nr. 1. Fertigstellung vor dem 01.01.1925 → 2,5 % (§ 7 Abs. 4 S. 1 Nr. 2 c EStG)." },
  { text: "Ein im Jahr 2025 fertiggestelltes Mietwohnhaus gehört zum Betriebsvermögen.", satz: 3, richtig: 0,
    erkl: "Wohnzwecke → keine Nr. 1, aber Fertigstellung nach dem 31.12.2022 → 3 % (§ 7 Abs. 4 S. 1 Nr. 2 a EStG)." },
];
const grundstueck = [
  A("t2-grundstueck-ak", "bsr-grundstueck",
    "Welche Aufwendungen gehören beim Erwerb eines bebauten Grundstücks zu den Anschaffungskosten, und wie werden sie verteilt?",
    "• Grund und Boden und Gebäude sind zwei selbständige Wirtschaftsgüter (R 4.2 Abs. 3 EStR): Grund und Boden ist nicht abnutzbar, das Gebäude wird nach § 7 Abs. 4 EStG abgeschrieben.\n• Anschaffungskosten (§ 255 Abs. 1 HGB): Kaufpreis (umsatzsteuerfrei, § 4 Nr. 9 a UStG), Grunderwerbsteuer, Maklerprovision (netto), Notarkosten für Beurkundung, Abwicklung und Vollzug des Kaufvertrags, Grundbuchkosten für Auflassungsvormerkung und Eigentumsumschreibung, Fahrtkosten zum Notar.\n• Nicht dazu gehören die Finanzierungskosten: Notar- und Gerichtskosten für die Grundschuld sowie Zinsen → sofort abziehbare Betriebsausgaben; ebenso die abziehbare Vorsteuer (§ 9b Abs. 1 EStG).\n• Aufteilung: Die gesamten Anschaffungskosten (einschließlich Nebenkosten) werden im Verhältnis der Verkehrswerte bzw. der vertraglichen Kaufpreisaufteilung auf Grund und Boden und Gebäude verteilt.\n• Zugang: mit Übergang von Nutzen und Lasten (§ 39 Abs. 2 Nr. 1 AO).",
    ["HGB 255 1", "EStG 7 4"],
    M(["Die Grunderwerbsteuer gehört zu den Anschaffungskosten.", "Die Notarkosten für die Grundschuldbestellung sind sofort abziehbare Betriebsausgaben.", "Die Nebenkosten werden im Verhältnis auf Grund und Boden und Gebäude aufgeteilt.", "Grund und Boden ist nicht planmäßig abzuschreiben."],
      ["Die Kosten der Grundschuldeintragung gehören zu den Anschaffungskosten des Gebäudes.", "Die Nebenkosten entfallen vollständig auf den Grund und Boden.", "Das Grundstück ist erst ab der Eintragung im Grundbuch zu bilanzieren.", "Die Vorsteuer aus der Maklerrechnung erhöht die Anschaffungskosten."],
      "Welche Aussagen zum Grundstückserwerb sind richtig?"),
    { norm: ["HGB 255"], s: ["grunderwerbsteuer", "makler", "notar", "grundschuld", "aufteil|verhaeltnis", "grund boden"] }),
  A("t2-gebaeude-afa", "bsr-grundstueck",
    "Wie werden Gebäude im Betriebsvermögen abgeschrieben? Nennen Sie die AfA-Sätze und den Beginn der AfA.",
    "• Handelsrecht: planmäßige Abschreibung über die Nutzungsdauer (§ 253 Abs. 3 S. 1, 2 HGB); aus Vereinfachungsgründen wird oft der steuerliche Satz übernommen.\n• Steuerrecht § 7 Abs. 4 EStG (typisierte Sätze von den Anschaffungs-/Herstellungskosten):\n  – Nr. 1: Betriebsvermögen, nicht Wohnzwecke, Bauantrag nach dem 31.03.1985 → 3 % (Wirtschaftsgebäude)\n  – Nr. 2 a: übrige Gebäude, fertiggestellt nach dem 31.12.2022 → 3 %\n  – Nr. 2 b: fertiggestellt nach dem 31.12.1924 und vor dem 01.01.2023 → 2 %\n  – Nr. 2 c: fertiggestellt vor dem 01.01.1925 → 2,5 %\n• Beginn: mit Anschaffung (Übergang von Nutzen und Lasten) bzw. Fertigstellung (§ 9a EStDV); im ersten Jahr zeitanteilig nach Monaten (§ 7 Abs. 4 S. 1 2. Hs. i. V. m. Abs. 1 S. 4 EStG).\n• Grund und Boden wird nicht planmäßig abgeschrieben.\n• Betriebsvorrichtungen und Außenanlagen (z. B. Platzbefestigung) sind eigene Wirtschaftsgüter → AfA nach § 7 Abs. 1 EStG.",
    ["EStG 7 4", "HGB 253 3"],
    M(["Wirtschaftsgebäude mit Bauantrag nach dem 31.03.1985 werden mit 3 % abgeschrieben.", "Vor 1925 fertiggestellte Gebäude außerhalb von Nr. 1 werden mit 2,5 % abgeschrieben.", "Die Gebäude-AfA beginnt mit dem Übergang von Nutzen und Lasten.", "Im Anschaffungsjahr wird die Gebäude-AfA zeitanteilig nach Monaten berechnet."],
      ["Gebäude werden stets mit 2 % abgeschrieben.", "Die Gebäude-AfA beginnt erst mit der Eintragung im Grundbuch.", "Im Anschaffungsjahr ist immer die volle Jahres-AfA anzusetzen.", "Grund und Boden wird zusammen mit dem Gebäude abgeschrieben."],
      "Welche Aussagen zur Gebäude-AfA sind richtig?"),
    { norm: ["EStG 7"], s: ["bauantrag", "1985", "1925|1924", "wohnzweck", "nutzen lasten|fertigstell", "zeitanteil|monat"] }),
  F("t2-grundstueck-kosten", "bsr-grundstueck", "Wie sind die Aufwendungen beim Kauf des Betriebsgrundstücks zu behandeln (voller Vorsteuerabzug)?", AK_OPT, [
    { text: "Grunderwerbsteuer laut Bescheid", richtig: 0, erkl: "Erwerbsnebenkosten → Anschaffungskosten, aufzuteilen auf Grund und Boden und Gebäude (§ 255 Abs. 1 S. 2 HGB).", normen: ["HGB 255 1"] },
    { text: "Maklerprovision für die Vermittlung des Grundstücks (netto)", richtig: 0, erkl: "Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB); die Vorsteuer ist abziehbar.", normen: ["HGB 255 1"] },
    { text: "Notarkosten für die Beurkundung und Abwicklung des Kaufvertrags (netto)", richtig: 0, erkl: "Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB).", normen: ["HGB 255 1"] },
    { text: "Notarkosten für die Bestellung der Grundschuld zugunsten der finanzierenden Bank", richtig: 2, erkl: "Finanzierungskosten gehören nicht zu den Anschaffungskosten → sofort abziehbare Betriebsausgaben (§ 4 Abs. 4 EStG).", normen: ["EStG 4 4"] },
    { text: "Gerichtskosten (Grundbuchamt) für die Eintragung der Grundschuld", richtig: 2, erkl: "Finanzierungskosten → Betriebsausgabe (§ 4 Abs. 4 EStG).", normen: ["EStG 4 4"] },
    { text: "Gerichtskosten (Grundbuchamt) für die Eigentumsumschreibung", richtig: 0, erkl: "Dient dem Eigentumserwerb → Anschaffungsnebenkosten.", normen: ["HGB 255 1"] },
    { text: "Gerichtskosten für die Eintragung und spätere Löschung der Auflassungsvormerkung", richtig: 0, erkl: "Die Auflassungsvormerkung sichert den Eigentumserwerb → Anschaffungsnebenkosten.", normen: ["HGB 255 1"] },
    { text: "Taxikosten für die Fahrt zum Notartermin (eine Straßenbahnfahrt wäre billiger gewesen)", richtig: 0, erkl: "Fahrtkosten zum Erwerb gehören zu den Anschaffungsnebenkosten – unabhängig davon, ob es billiger gegangen wäre.", normen: ["HGB 255 1"] },
    { text: "Zinsen für das Finanzierungsdarlehen ab Übergang von Nutzen und Lasten", richtig: 2, erkl: "Zinsen sind Finanzierungskosten → Betriebsausgabe; zum Stichtag ggf. als sonstige Verbindlichkeit abzugrenzen.", normen: ["EStG 4 4"] },
    { text: "Skontoabzug bei der Zahlung der Maklerrechnung", richtig: 1, erkl: "Anschaffungspreisminderung (§ 255 Abs. 1 S. 3 HGB) – mindert anteilig Grund und Boden und Gebäude; Vorsteuerberichtigung nach § 17 Abs. 1 UStG.", normen: ["HGB 255 1", "UStG 17 1"] },
    { text: "Umsatzsteuer aus der Notarrechnung über den Kaufvertrag", richtig: 3, erkl: "Abziehbare Vorsteuer gehört nicht zu den Anschaffungskosten (§ 9b Abs. 1 EStG) und ist kein Aufwand.", normen: ["EStG 9b 1"] },
  ]),
  V("t2-grundstueck-ak-rechnen", "bsr-grundstueck", (r) => {
    const preis = r.betrag(200000, 900000, 10000), gub = r.wahl([20, 25, 30, 33, 40]), makl = Math.round(preis * r.wahl([3, 3.57, 5, 6]) / 100);
    const grest = Math.round(preis * r.wahl([3.5, 5, 6, 6.5]) / 100), notarKV = r.betrag(1000, 4000, 50), notarGS = r.betrag(300, 900, 50), gbE = r.betrag(400, 1500, 50), gbGS = r.betrag(200, 700, 50);
    const ak = preis + makl + grest + notarKV + gbE, geb = Math.round(ak * (100 - gub) / 100), frageGeb = r.muenze();
    return rechnen("t2-grundstueck-ak-rechnen", "bsr-grundstueck",
      `Ein Unternehmer erwirbt ein bebautes Betriebsgrundstück für ${eur(preis)}; ${gub} % des Kaufpreises entfallen auf den Grund und Boden. Nebenkosten (jeweils netto): Makler ${eur(makl)}, Grunderwerbsteuer ${eur(grest)}, Notar Kaufvertrag ${eur(notarKV)}, Notar Grundschuld ${eur(notarGS)}, Grundbuch Eigentumsumschreibung ${eur(gbE)}, Grundbuch Grundschuldeintragung ${eur(gbGS)}.\n\nWie hoch sind die Anschaffungskosten ${frageGeb ? "des Gebäudes" : "des Grund und Bodens"} (in €)?`,
      frageGeb ? geb : ak - geb,
      `Anschaffungskosten gesamt (§ 255 Abs. 1 HGB): Kaufpreis ${eur(preis)} + Makler ${eur(makl)} + Grunderwerbsteuer ${eur(grest)} + Notar Kaufvertrag ${eur(notarKV)} + Eigentumsumschreibung ${eur(gbE)} = ${eur(ak)}.\nNicht dazu: Notar- und Grundbuchkosten der Grundschuld (${eur(notarGS + gbGS)}) = Finanzierungskosten → Betriebsausgaben.\nAufteilung: Grund und Boden ${gub} % = ${eur(ak - geb)}, Gebäude ${100 - gub} % = ${eur(geb)}.`);
  }),
  V("t2-gebaeude-afa-rechnen", "bsr-grundstueck", (r) => {
    const f = r.wahl(gebaeudeFaelle), ak = r.betrag(150000, 900000, 1000), m = r.zahl(1, 12), afa = ak * f.satz / 100 * monate(m) / 12;
    const satzT = String(f.satz).replace(".", ",");
    return rechnen("t2-gebaeude-afa-rechnen", "bsr-grundstueck",
      `${f.text} Die Anschaffungskosten des Gebäudes betragen ${eur(ak)}; Nutzen und Lasten sind am 1. ${MONAT[m - 1]} 01 übergegangen.\n\nWie hoch ist die höchstzulässige (lineare) Gebäude-AfA im Jahr 01 (in €)?`,
      afa,
      `${f.erkl}\nAfA 01 = ${eur(ak)} × ${satzT} % × ${monate(m)}/12 (ab ${MONAT[m - 1]}, Übergang von Nutzen und Lasten) = ${eur(Math.round(afa))}.`);
  }),
  F("t2-gebaeude-satz", "bsr-grundstueck", "Mit welchem Satz ist das Gebäude nach § 7 Abs. 4 EStG abzuschreiben?", ["3 %", "2 %", "2,5 %"],
    gebaeudeFaelle.map((g) => ({ text: g.text, richtig: g.richtig, erkl: g.erkl, normen: ["EStG 7 4"] }))),
  V("t2-notar-buchung", "bsr-grundstueck", (r) => {
    const gub = r.wahl([20, 25, 30, 40]), kv = r.betrag(1000, 3000, 100), gs = r.betrag(300, 900, 50);
    const kvG = Math.round(kv * gub / 100), u = ust(kv + gs);
    return buchung("t2-notar-buchung", "bsr-grundstueck",
      `Ein Unternehmer hat ein bebautes Betriebsgrundstück erworben (Kaufpreisaufteilung: ${gub} % Grund und Boden, ${100 - gub} % Gebäude). Er bezahlt per Bank die Notarrechnung: Beurkundung und Abwicklung des Kaufvertrags ${eur(kv)}, Grundschuldbestellung ${eur(gs)}, zusammen zzgl. ${eur(u)} USt.`,
      satz([["grundUndBoden", kvG], ["gebaeude", kv - kvG], ["rechtsBeratung", gs], ["vorsteuer", u]], [["bank", kv + gs + u]]),
      `Die Kaufvertragskosten sind Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB) und werden im Verhältnis ${gub} : ${100 - gub} aufgeteilt: Grund und Boden ${eur(kvG)}, Gebäude ${eur(kv - kvG)}. Die Grundschuldkosten sind Finanzierungskosten → sofort abziehbare Betriebsausgabe (Rechts- und Beratungskosten). Vorsteuer abziehbar (§ 9b Abs. 1 EStG).`,
      { quelle: Q + " – Anschaffungskosten Grundstückskauf" });
  }),
];

// ======================================================================= Abschreibungen und GWG
const afa = [
  A("t2-afa-linear", "bsr-afa",
    "Wie wird abnutzbares bewegliches Anlagevermögen planmäßig abgeschrieben? Gehen Sie auf das Anschaffungsjahr, nachträgliche Anschaffungskosten und den Abgang ein.",
    "• Handelsrecht: Anschaffungskosten um planmäßige Abschreibungen über die Nutzungsdauer mindern (§ 253 Abs. 3 S. 1, 2 HGB).\n• Steuerrecht: lineare AfA in gleichen Jahresbeträgen über die betriebsgewöhnliche Nutzungsdauer (§ 7 Abs. 1 S. 1, 2 EStG; AfA-Tabellen). Für Anschaffungen vom 01.07.2025 bis 31.12.2027 ist wahlweise wieder eine degressive AfA möglich (§ 7 Abs. 2 EStG).\n• Anschaffungsjahr: zeitanteilig, für jeden vollen Monat vor dem Anschaffungsmonat 1/12 weniger (§ 7 Abs. 1 S. 4 EStG) – der Monat der Lieferung zählt voll.\n• Nachträgliche Anschaffungskosten: werden so behandelt, als wären sie zu Beginn des Jahres angefallen (R 7.4 Abs. 9 S. 3 EStR): AfA = (Restbuchwert + nachträgliche AK) / Restnutzungsdauer.\n• Abgang (Verkauf): AfA zeitanteilig bis zum Ausscheiden; Erlös (netto) − Restbuchwert = Ertrag bzw. Aufwand aus Abgang; der Verkauf ist umsatzsteuerpflichtig.",
    ["EStG 7 1", "HGB 253 3"],
    M(["Im Anschaffungsjahr wird die AfA zeitanteilig nach Monaten berechnet.", "Der Monat der Lieferung zählt bei der AfA voll mit.", "Nachträgliche Anschaffungskosten werden zusammen mit dem Restbuchwert auf die Restnutzungsdauer verteilt.", "Beim Verkauf ergibt sich der Abgangserfolg aus Nettoerlös minus Restbuchwert."],
      ["Im Anschaffungsjahr ist stets die volle Jahres-AfA anzusetzen.", "Die AfA beginnt mit der Bezahlung des Kaufpreises.", "Nachträgliche Anschaffungskosten sind sofort als Aufwand zu buchen.", "Im Jahr des Verkaufs entfällt die AfA vollständig."],
      "Welche Aussagen zur linearen AfA sind richtig?"),
    { norm: ["EStG 7"], s: ["linear|gleichen jahresbetr", "nutzungsdauer", "zeitanteil|monat", "nachtraeglich", "restbuchwert|buchwert"] }),
  A("t2-gwg", "bsr-afa",
    "Welche Möglichkeiten gibt es für geringwertige Wirtschaftsgüter und den Sammelposten?",
    "Voraussetzungen jeweils: abnutzbares, bewegliches Wirtschaftsgut des Anlagevermögens, selbständig nutzungsfähig (§ 6 Abs. 2 S. 2 EStG – z. B. nicht Monitor oder Drucker einer EDV-Anlage). Maßgeblich sind die Anschaffungskosten ohne Vorsteuer (nach Abzug von Skonto/Rabatt).\n• Bis 250 €: Sofortabzug als Betriebsausgabe, ohne Verzeichnis.\n• Über 250 € bis 800 €: Wahlrecht Sofortabschreibung als GWG (§ 6 Abs. 2 EStG; Verzeichnis bzw. Ausweis in der Buchführung) oder lineare AfA.\n• Über 250 € bis 1.000 €: Wahlrecht Sammelposten (§ 6 Abs. 2a EStG) – jährlich 1/5 gewinnmindernd auflösen, unabhängig vom Anschaffungsmonat; ein Ausscheiden mindert den Sammelposten nicht. Das Wahlrecht gilt einheitlich für alle Wirtschaftsgüter des Jahres zwischen 250 € und 1.000 €.\n• Über 1.000 €: nur AfA nach § 7 Abs. 1 EStG.",
    ["EStG 6 2", "EStG 6 2a"],
    M(["Bei Anschaffungskosten bis 800 € netto ist eine Sofortabschreibung als GWG möglich.", "Der Sammelposten ist jährlich mit einem Fünftel aufzulösen.", "Für den Sammelposten gelten Anschaffungskosten über 250 € bis 1.000 €.", "Ein GWG muss selbständig nutzungsfähig sein."],
      ["Die GWG-Grenze von 800 € bezieht sich auf den Bruttobetrag.", "Der Sammelposten wird im ersten Jahr nur zeitanteilig aufgelöst.", "Scheidet ein Wirtschaftsgut aus, wird der Sammelposten entsprechend vermindert.", "Ein Drucker einer EDV-Anlage ist als GWG sofort abschreibbar."],
      "Welche Aussagen zu GWG und Sammelposten sind richtig?"),
    { norm: ["EStG 6"], s: ["800", "250", "1.000|1000", "fuenftel|1/5|20 prozent", "selbstaendig nutz|selbststaendig nutz"] }),
  A("t2-afaa", "bsr-afa",
    "Was sind Absetzungen für außergewöhnliche Abnutzung (AfaA)? Was gilt, wenn der Grund später entfällt?",
    "• § 7 Abs. 1 S. 7 EStG: Neben der normalen AfA sind AfaA zulässig, wenn die wirtschaftliche oder technische Nutzbarkeit eines Wirtschaftsguts durch ein besonderes Ereignis gesunken ist (z. B. Unfall, Brand, Wasserschaden). Handelsrechtlich: außerplanmäßige Abschreibung (§ 253 Abs. 3 S. 5 HGB).\n• Bemessung: im Umfang der eingetretenen Minderung des Nutzenpotentials (z. B. 15 % des Restbuchwerts), im Jahr des Schadens.\n• Entfällt der Grund später (z. B. durch Reparatur), ist bei Bilanzierenden eine Zuschreibung vorzunehmen (§ 7 Abs. 1 S. 7 2. Hs. EStG); die Reparaturkosten selbst sind Aufwand.\n• Die AfaA ist keine Teilwertabschreibung – sie setzt keinen gesunkenen Teilwert, sondern eine außergewöhnliche Abnutzung voraus.",
    ["EStG 7 1", "HGB 253 3"],
    M(["AfaA setzen ein besonderes Ereignis wie einen Unfall oder Brand voraus.", "Entfällt der Grund für die AfaA, ist eine Zuschreibung vorzunehmen.", "Handelsrechtlich entspricht der AfaA die außerplanmäßige Abschreibung."],
      ["AfaA ersetzen die planmäßige AfA vollständig.", "AfaA sind nur bei Gebäuden zulässig.", "Nach einer Reparatur bleibt die AfaA dauerhaft bestehen.", "AfaA setzen voraus, dass der Unternehmer einen Verlust erzielt."],
      "Welche Aussagen zur AfaA sind richtig?"),
    { norm: ["EStG 7"], s: ["aussergewoehnlich", "ereignis|unfall|schaden|brand", "zuschreibung", "ausserplanm"] }),
  V("t2-afa-jahr1", "bsr-afa", (r) => {
    const [name, nd] = r.wahl([["eine Produktionsmaschine", 10], ["einen Lieferwagen", 6], ["eine Ladeneinrichtung", 8], ["einen Gabelstapler", 8], ["eine Verpackungsanlage", 13]]);
    const ak = r.betrag(6000, 120000, 100), m = r.zahl(1, 12), a = ak / nd * monate(m) / 12;
    return rechnen("t2-afa-jahr1", "bsr-afa",
      `Ein Unternehmer erwirbt ${name} (Anschaffungskosten ${eur(ak)}, Nutzungsdauer ${nd} Jahre). Die Lieferung erfolgt am ${r.zahl(2, 27)}. ${MONAT[m - 1]} 01.\n\nWie hoch ist die lineare AfA für das Jahr 01 (in €)?`,
      a, `§ 7 Abs. 1 S. 1, 2, 4 EStG: ${eur(ak)} / ${nd} Jahre × ${monate(m)}/12 (ab ${MONAT[m - 1]}, Monat der Lieferung zählt voll) = ${eur(Math.round(a))}.`);
  }),
  V("t2-afa-buchwert", "bsr-afa", (r) => {
    const nd = r.wahl([5, 6, 8, 10]), ak = r.betrag(5000, 80000, 100), m = r.zahl(1, 12);
    const a1 = Math.round(ak / nd * monate(m) / 12), a2 = Math.round(ak / nd), bw = ak - a1 - a2;
    return rechnen("t2-afa-buchwert", "bsr-afa",
      `Eine Maschine wurde am ${r.zahl(2, 27)}. ${MONAT[m - 1]} 01 geliefert (Anschaffungskosten ${eur(ak)}, Nutzungsdauer ${nd} Jahre, lineare AfA).\n\nMit welchem Wert ist sie am 31.12.02 zu bilanzieren (in €)?`,
      bw, `AfA 01: ${eur(ak)} / ${nd} × ${monate(m)}/12 = ${eur(a1)}\nAfA 02: ${eur(ak)} / ${nd} = ${eur(a2)}\nBilanzansatz 31.12.02 (§ 253 Abs. 3 HGB, § 6 Abs. 1 Nr. 1 EStG): ${eur(ak)} − ${eur(a1)} − ${eur(a2)} = ${eur(bw)}`);
  }),
  V("t2-nachtraeglich", "bsr-afa", (r) => {
    const nd = r.wahl([5, 6, 8, 10]), ak = r.betrag(12000, 60000, 1200), m = r.zahl(1, 12), nak = r.betrag(500, 5000, 100);
    const ndM = nd * 12, verbraucht = monate(m) + 12, a1 = ak * monate(m) / ndM, a2 = ak * 12 / ndM, bw = ak - a1 - a2;
    const rnd = ndM - verbraucht, a3 = (bw + nak) * 12 / rnd;
    return rechnen("t2-nachtraeglich", "bsr-afa",
      `Ein Werkstattwagen wurde im ${MONAT[m - 1]} 01 für ${eur(ak)} angeschafft (Nutzungsdauer ${nd} Jahre, lineare AfA). Im März 03 lässt der Unternehmer eine Anhängerkupplung nachrüsten; nachträgliche Anschaffungskosten ${eur(nak)} netto.\n\nWie hoch ist die AfA für das Jahr 03 (in €)?`,
      a3,
      `AfA 01: ${eur(Math.round(a1))} (${monate(m)} Monate), AfA 02: ${eur(Math.round(a2))} → Restbuchwert 01.01.03: ${eur(Math.round(bw))}.\nNachträgliche Anschaffungskosten gelten als zu Beginn des Jahres entstanden (R 7.4 Abs. 9 S. 3 EStR).\nRestnutzungsdauer ab 01.01.03: ${ndM} − ${verbraucht} = ${rnd} Monate.\nAfA 03 = (${eur(Math.round(bw))} + ${eur(nak)}) / ${rnd} × 12 = ${eur(Math.round(a3))}.`);
  }),
  V("t2-abgang", "bsr-afa", (r) => {
    const nd = r.wahl([5, 8, 10]), ak = r.betrag(6000, 40000, 600), jahre = r.zahl(2, nd - 2), m = r.zahl(2, 11);
    const jahresAfa = ak / nd, bw = ak - jahresAfa * jahre, afaV = jahresAfa * m / 12, rbw = bw - afaV;
    const erloes = Math.round(rbw * (0.6 + r.next() * 0.8) / 10000) * 10000, erg = erloes - rbw;
    return rechnen("t2-abgang", "bsr-afa",
      `Eine am 02.01.01 für ${eur(ak)} angeschaffte Geschäftsausstattung (Nutzungsdauer ${nd} Jahre) wurde bis 31.12.${String(jahre).padStart(2, "0")} planmäßig mit jährlich ${eur(Math.round(jahresAfa))} abgeschrieben. Am ${[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30][m - 1]}.${String(m).padStart(2, "0")}.${String(jahre + 1).padStart(2, "0")} wird sie für ${eur(erloes)} zzgl. 19 % USt verkauft.\n\nWie hoch ist der Ertrag aus dem Abgang (Verlust = Aufwand mit Minus, in €)?`,
      erg,
      `Buchwert 31.12.${String(jahre).padStart(2, "0")}: ${eur(Math.round(bw))}\nAfA bis zum Verkauf: ${eur(Math.round(jahresAfa))} × ${m}/12 = ${eur(Math.round(afaV))} → Restbuchwert ${eur(Math.round(rbw))}\nNettoerlös ${eur(erloes)} − Restbuchwert ${eur(Math.round(rbw))} = ${erg >= 0 ? "Ertrag" : "Aufwand"} aus dem Abgang ${eur(Math.round(Math.abs(erg)))}. Die USt (${eur(ust(erloes))}) ist an das Finanzamt abzuführen.`);
  }),
  V("t2-gwg-max", "bsr-afa", (r) => {
    const [name, nd] = r.wahl([["einen Bürostuhl", 13], ["eine Schreibtischleuchte", 13], ["ein Akkuwerkzeug-Set", 5], ["einen Aktenschrank", 13], ["ein Lastenfahrrad-Zubehörset", 7], ["ein Tablet", 5]]);
    const liste = r.wahl([r.betrag(280, 790, 10), r.betrag(810, 990, 10), r.betrag(1050, 2500, 50)]), sk = r.muenze() ? 2 : 0;
    const ak = Math.round(liste * (100 - sk) / 100), m = r.zahl(1, 12), linear = ak / nd * monate(m) / 12;
    let wert, erkl;
    if (ak <= E(800)) { wert = ak; erkl = `Anschaffungskosten ${eur(ak)} ≤ 800 € → Sofortabschreibung als GWG (§ 6 Abs. 2 EStG): ${eur(ak)}.`; }
    else if (ak <= E(1000)) {
      const sp = ak / 5;
      wert = Math.max(sp, linear);
      erkl = `Anschaffungskosten ${eur(ak)} > 800 € → kein GWG. Zur Wahl: Sammelposten (§ 6 Abs. 2a EStG) 1/5 = ${eur(Math.round(sp))} unabhängig vom Monat, oder lineare AfA ${eur(ak)} / ${nd} × ${monate(m)}/12 = ${eur(Math.round(linear))} → höchstmöglich ${eur(Math.round(wert))}.`;
    } else { wert = linear; erkl = `Anschaffungskosten ${eur(ak)} > 1.000 € → weder GWG noch Sammelposten; lineare AfA (§ 7 Abs. 1 EStG): ${eur(ak)} / ${nd} × ${monate(m)}/12 = ${eur(Math.round(linear))}.`; }
    return rechnen("t2-gwg-max", "bsr-afa",
      `Ein Unternehmer kauft im ${MONAT[m - 1]} 01 ${name} für sein Büro bzw. seine Werkstatt (selbständig nutzbar, Nutzungsdauer ${nd} Jahre) für ${eur(liste)} zzgl. 19 % USt${sk ? " und zahlt unter Abzug von 2 % Skonto" : ""}.\n\nWie hoch ist die höchstmögliche Abschreibung im Jahr 01 (in €)?`,
      wert, (sk ? `Anschaffungskosten nach Skonto: ${eur(liste)} − 2 % = ${eur(ak)} (§ 255 Abs. 1 S. 3 HGB).\n` : "") + erkl);
  }),
  F("t2-gwg-fall", "bsr-afa", "Welche Abschreibungsmöglichkeit besteht (Anschaffungskosten netto, voller Vorsteuerabzug)?",
    ["Sofortabschreibung als GWG möglich (§ 6 Abs. 2 EStG)", "Sammelposten oder lineare AfA (§ 6 Abs. 2a / § 7 Abs. 1 EStG)", "Nur lineare AfA (§ 7 Abs. 1 EStG)", "Keine GWG-Regelung – nicht selbständig nutzungsfähig"], [
      { text: "Schreibtischleuchte, Kaufpreis 810 € zzgl. USt, bezahlt unter Abzug von 2 % Skonto (Anschaffungskosten 793,80 €).", richtig: 0, erkl: "Nach Skonto liegen die Anschaffungskosten unter 800 € → GWG-Sofortabschreibung möglich (§ 6 Abs. 2 EStG).", normen: ["EStG 6 2"] },
      { text: "Bürostuhl für 950 € zzgl. USt.", richtig: 1, erkl: "Über 800 €, aber nicht über 1.000 € → Sammelposten (1/5 jährlich) oder lineare AfA.", normen: ["EStG 6 2a"] },
      { text: "Gabelstapler für 18.000 € zzgl. USt.", richtig: 2, erkl: "Über 1.000 € → nur AfA nach § 7 Abs. 1 EStG (bei Anschaffung 07/2025 – 2027 wahlweise degressiv).", normen: ["EStG 7 1"] },
      { text: "Monitor für den vorhandenen Büro-PC für 650 € zzgl. USt.", richtig: 3, erkl: "Peripheriegeräte einer EDV-Anlage sind nicht selbständig nutzungsfähig (§ 6 Abs. 2 S. 2 EStG, H 6.13 EStH) → keine GWG-/Sammelpostenregelung; AfA mit der Anlage bzw. eigene Nutzungsdauer.", normen: ["EStG 6 2"] },
      { text: "Bücherregal aus 10 Regalelementen zu je 450 € zzgl. USt; der Unternehmer will die Einteilung je nach Bedarf ändern. Ein einzelnes Element ist allein nicht standfest.", richtig: 3, erkl: "Die Regalelemente sind selbständige Wirtschaftsgüter, aber nicht selbständig nutzbar (technische Verbindung, keine Standfestigkeit; § 6 Abs. 2 S. 2 EStG, H 6.13 EStH) → keine GWG; nur AfA nach § 7 Abs. 1 EStG, im Zugangsjahr zeitanteilig.", normen: ["EStG 6 2", "EStG 7 1"] },
      { text: "Aktenvernichter für 240 € zzgl. USt.", richtig: 0, erkl: "Bis 250 € sofort als Betriebsausgabe; ohne Verzeichnis (§ 6 Abs. 2 EStG).", normen: ["EStG 6 2"] },
      { text: "Kaffeevollautomat für das Büro für 1.190 € einschließlich 19 % USt.", richtig: 1, erkl: "Maßgeblich ist der Nettobetrag: 1.190 € / 1,19 = 1.000 €. Das übersteigt 800 € → kein GWG; Sammelposten ist möglich (nicht über 1.000 €), alternativ lineare AfA.", normen: ["EStG 6 2a"] },
    ]),
  V("t2-gwg-buchung", "bsr-afa", (r) => {
    const n = r.betrag(260, 790, 10);
    return buchung("t2-gwg-buchung", "bsr-afa",
      `Ein Unternehmer hat einen Bürostuhl (Anschaffungskosten ${eur(n)}) auf dem Konto GWG aktiviert. Er möchte zum 31.12. die Sofortabschreibung nach § 6 Abs. 2 EStG in Anspruch nehmen.`,
      einfach("sofortabschreibungGWG", "gwg", n),
      "GWG bis 800 € netto können im Jahr der Anschaffung in voller Höhe abgeschrieben werden (§ 6 Abs. 2 EStG): Sofortabschreibung GWG an GWG.", { quelle: Q + " – Abschreibungen § 6 Abs. 2 EStG" });
  }),
  V("t2-afaa-rechnen", "bsr-afa", (r) => {
    const ak = r.betrag(18000, 48000, 600), nd = 6, schaden = r.wahl([10, 15, 20, 25]);
    const bw = ak - ak / nd - ak / nd * 6 / 12, afaa = bw * schaden / 100;
    return rechnen("t2-afaa-rechnen", "bsr-afa",
      `Ein ausschließlich betrieblich genutzter Pkw wurde am 04.01.04 für ${eur(ak)} netto angeschafft (Nutzungsdauer 6 Jahre, lineare AfA). Am 30.06.05 verursacht der Unternehmer auf einer Dienstfahrt einen Blechschaden, durch den ${schaden} % des Nutzenpotentials verloren gehen; die Nutzungsdauer ändert sich nicht. Repariert wird erst 06.\n\nWie hoch ist die AfaA im Jahr 05 (in €)?`,
      afaa,
      `Buchwert nach planmäßiger AfA bis zum Schadenstag: ${eur(ak)} − AfA 04 ${eur(Math.round(ak / nd))} − AfA 05 (6/12) ${eur(Math.round(ak / nd / 2))} = ${eur(Math.round(bw))}.\nAfaA (§ 7 Abs. 1 S. 7 EStG) = ${schaden} % von ${eur(Math.round(bw))} = ${eur(Math.round(afaa))}. Nach der Reparatur in 06 ist entsprechend zuzuschreiben.`);
  }),
];

// Anlagengitter (Anlagenspiegel, § 284 Abs. 3 HGB): Entwicklung von AK und kumulierter AfA
afa.push(V("t2-anlagengitter", "bsr-afa", (r) => {
  const ak = r.betrag(30000, 300000, 6000), nd = r.wahl([5, 6, 8, 10]), jahre = r.zahl(1, nd - 2), zugang = r.muenze() ? r.betrag(6000, 60000, 1200) : 0;
  const afaAlt = ak / nd, kumAlt = afaAlt * jahre, afaZu = zugang ? zugang / 5 * 6 / 12 : 0, kumNeu = kumAlt + afaAlt + afaZu;
  const bwNeu = ak + zugang - kumNeu, frageBw = r.muenze();
  return rechnen("t2-anlagengitter", "bsr-afa",
    `Anlagengitter „Maschinen“ zum 31.12.02 (lineare AfA, volle Jahre):\n• Anschaffungskosten Stand 01.01.02: ${eur(ak)} (Nutzungsdauer ${nd} Jahre, angeschafft am 02.01. vor ${jahre} Jahr${jahre > 1 ? "en" : ""})\n• Kumulierte Abschreibungen Stand 01.01.02: ${eur(kumAlt)}${zugang ? `\n• Zugang 01.07.02: eine weitere Maschine für ${eur(zugang)} (Nutzungsdauer 5 Jahre)` : "\n• Keine Zu- und Abgänge in 02"}\n\n${frageBw ? "Wie hoch ist der Buchwert der Maschinen zum 31.12.02 (in €)?" : "Wie hoch sind die kumulierten Abschreibungen zum 31.12.02 (in €)?"}`,
    frageBw ? bwNeu : kumNeu,
    `Das Anlagengitter (§ 284 Abs. 3 HGB) entwickelt Anschaffungskosten und kumulierte Abschreibungen getrennt.\nAK 31.12.02: ${zugang ? `${eur(ak)} + Zugang ${eur(zugang)} = ` : ""}${eur(ak + zugang)}.\nAbschreibungen 02: ${eur(ak)} / ${nd} = ${eur(afaAlt)}${zugang ? ` + ${eur(zugang)} / 5 × 6/12 = ${eur(afaZu)} (zeitanteilig, § 7 Abs. 1 S. 4 EStG), zusammen ${eur(afaAlt + afaZu)}` : ""}.\nKumulierte Abschreibungen 31.12.02: ${eur(kumAlt)} + ${eur(afaAlt + afaZu)} = ${eur(kumNeu)}.\nBuchwert 31.12.02 = AK − kumulierte AfA = ${eur(bwNeu)} (Buchwert 31.12.01: ${eur(ak - kumAlt)}).`,
    "Folien Teil II – Anlagengitter");
}));

// ======================================================================= Teilwert und Wertaufholung
const teilwert = [
  A("t2-teilwert", "bsr-teilwert",
    "Was ist der Teilwert? Unter welchen Voraussetzungen ist eine Teilwertabschreibung zulässig, und was gilt handelsrechtlich?",
    "• Teilwert (§ 6 Abs. 1 Nr. 1 S. 3 EStG): Betrag, den ein Erwerber des ganzen Betriebs im Rahmen des Gesamtkaufpreises für das einzelne Wirtschaftsgut ansetzen würde (Fortführung unterstellt).\n• Steuerrecht: Ansatz des niedrigeren Teilwerts nur bei voraussichtlich dauernder Wertminderung (§ 6 Abs. 1 Nr. 1 S. 2, Nr. 2 S. 2 EStG) – Wahlrecht.\n• Dauerhaftigkeit (BMF vom 02.09.2016): abnutzbares Anlagevermögen, wenn der Wert mindestens die halbe Restnutzungsdauer unter dem planmäßigen Restbuchwert liegt; Umlaufvermögen, wenn die Minderung bis zur Bilanzaufstellung anhält (spätere Erkenntnisse bis dahin berücksichtigen); börsennotierte Aktien, wenn der Kurs am Stichtag mehr als 5 % unter den Anschaffungskosten liegt.\n• Handelsrecht: Anlagevermögen gemildertes Niederstwertprinzip – bei dauernder Wertminderung Pflicht (§ 253 Abs. 3 S. 5 HGB); Umlaufvermögen strenges Niederstwertprinzip – stets Pflicht (§ 253 Abs. 4 HGB).\n• Wertaufholung: Steigt der Wert wieder, ist zuzuschreiben (§ 253 Abs. 5 HGB, § 6 Abs. 1 Nr. 1 S. 4 EStG), höchstens bis zu den (fortgeführten) Anschaffungskosten.",
    ["EStG 6 1", "HGB 253 3"],
    M(["Eine Teilwertabschreibung setzt steuerlich eine voraussichtlich dauernde Wertminderung voraus.", "Handelsrechtlich gilt für das Umlaufvermögen das strenge Niederstwertprinzip.", "Steigt der Wert wieder, ist eine Wertaufholung vorzunehmen.", "Die Wertaufholung ist auf die fortgeführten Anschaffungskosten begrenzt."],
      ["Steuerlich ist jede vorübergehende Wertminderung abzuschreiben.", "Nach einer Teilwertabschreibung darf der niedrigere Wert immer beibehalten werden.", "Die Wertaufholung darf die ursprünglichen Anschaffungskosten übersteigen.", "Handelsrechtlich gilt für das Umlaufvermögen das gemilderte Niederstwertprinzip."],
      "Welche Aussagen zur Teilwertabschreibung sind richtig?"),
    { norm: ["EStG 6"], s: ["dauernd|dauerhaft", "erwerber ganzen betrieb|gesamtkaufpreis", "niederstwert", "wertaufholung|zuschreib", "wahlrecht"] }),
  F("t2-teilwert-fall", "bsr-teilwert", "Ist steuerlich eine Teilwertabschreibung zulässig?",
    ["Ja – voraussichtlich dauernde Wertminderung", "Nein – keine dauernde Wertminderung"], [
      { text: "Eine Maschine (Restnutzungsdauer 8 Jahre) hat am Bilanzstichtag einen Teilwert, der voraussichtlich während der nächsten 6 Jahre unter dem planmäßigen Restbuchwert liegt.", richtig: 0, erkl: "Der Wert liegt mehr als die halbe Restnutzungsdauer (4 Jahre) unter dem planmäßigen Restbuchwert → dauernd (BMF 02.09.2016).", normen: ["EStG 6 1"] },
      { text: "Eine Maschine (Restnutzungsdauer 8 Jahre) hat am Bilanzstichtag einen Teilwert, der voraussichtlich nur in den nächsten 2 Jahren unter dem planmäßigen Restbuchwert liegt.", richtig: 1, erkl: "Weniger als die halbe Restnutzungsdauer → nicht dauernd; keine Teilwertabschreibung.", normen: ["EStG 6 1"] },
      { text: "Waren (Anschaffungskosten 20.000 €) haben am 31.12. einen Marktpreis von 16.000 €; bei Aufstellung der Bilanz im März liegt er bei 17.000 €.", richtig: 0, erkl: "Die Wertminderung hält bis zur Bilanzaufstellung an → dauernd; Teilwertabschreibung auf 17.000 € (Erkenntnisse bis zur Aufstellung berücksichtigen). Handelsrechtlich: strenges Niederstwertprinzip, 16.000 €.", normen: ["EStG 6 1", "HGB 253 4"] },
      { text: "Waren (Anschaffungskosten 20.000 €) haben am 31.12. einen Marktpreis von 16.000 €; bei Aufstellung der Bilanz im März liegt er wieder bei 21.000 €.", richtig: 1, erkl: "Bis zur Bilanzaufstellung ist der Wert wieder gestiegen → keine dauernde Wertminderung; steuerlich keine Teilwertabschreibung (handelsrechtlich dennoch 16.000 € nach § 253 Abs. 4 HGB).", normen: ["EStG 6 1", "HGB 253 4"] },
      { text: "Börsennotierte Aktien im Anlagevermögen (Anschaffungskosten 200 € je Stück) notieren am Bilanzstichtag bei 160 €; im April des Folgejahres steigt der Kurs auf 180 €.", richtig: 0, erkl: "Kursrückgang am Stichtag um mehr als 5 % → dauernd; maßgeblich ist der Stichtagskurs, spätere Kursentwicklungen sind unbeachtlich (BMF 02.09.2016). Ansatz 160 €.", normen: ["EStG 6 1"] },
      { text: "Börsennotierte Aktien (Anschaffungskosten 200 € je Stück) notieren am Bilanzstichtag bei 192 €.", richtig: 1, erkl: "Der Kursrückgang beträgt nur 4 % und liegt innerhalb der Bagatellgrenze von 5 % → keine dauernde Wertminderung.", normen: ["EStG 6 1"] },
    ]),
  V("t2-ware-ansatz", "bsr-teilwert", (r) => {
    const ak = r.betrag(10000, 60000, 500), stichtag = Math.round(ak * r.wahl([0.7, 0.75, 0.8, 0.85]) / 10000) * 10000;
    const aufst = r.wahl([Math.round((stichtag + (ak - stichtag) / 2) / 10000) * 10000, ak + r.betrag(500, 3000, 500), stichtag]);
    const wert = aufst >= ak ? ak : Math.max(stichtag, aufst);
    return rechnen("t2-ware-ansatz", "bsr-teilwert",
      `Ein Warenbestand mit Anschaffungskosten von ${eur(ak)} hat am Bilanzstichtag 31.12.02 einen Marktpreis (Wiederbeschaffungskosten) von ${eur(stichtag)}. Bei Aufstellung der Bilanz im März 03 beträgt der Marktpreis ${eur(aufst)}. Der Unternehmer möchte einen möglichst niedrigen Gewinn ausweisen.\n\nMit welchem Wert ist die Ware in der Steuerbilanz 31.12.02 anzusetzen (in €)?`,
      wert,
      aufst >= ak
        ? `Bei Bilanzaufstellung ist der Wert wieder auf mindestens die Anschaffungskosten gestiegen → keine voraussichtlich dauernde Wertminderung; Ansatz mit den Anschaffungskosten ${eur(ak)} (§ 6 Abs. 1 Nr. 2 S. 2 EStG). Handelsrechtlich gilt dagegen das strenge Niederstwertprinzip: ${eur(stichtag)} (§ 253 Abs. 4 HGB).`
        : `Die Wertminderung hält bis zur Bilanzaufstellung an → dauernd (BMF 02.09.2016). Erkenntnisse bis zur Aufstellung sind zu berücksichtigen: Ansatz mit ${eur(wert)} (§ 6 Abs. 1 Nr. 2 S. 2 EStG, Wahlrecht).${aufst < stichtag ? "" : ` Handelsrechtlich: strenges Niederstwertprinzip, ${eur(stichtag)} (§ 253 Abs. 4 HGB).`}`);
  }),
  V("t2-aktien-ansatz", "bsr-teilwert", (r) => {
    const n = r.wahl([50, 100, 200]), kurs = r.betrag(80, 400, 1), stichtag = Math.round(kurs * r.wahl([0.97, 0.96, 0.9, 0.8, 0.75]) / 100) * 100, spaeter = Math.round(stichtag * 1.15 / 100) * 100;
    const dauernd = stichtag < kurs * 0.95, wert = (dauernd ? stichtag : kurs) * n;
    return rechnen("t2-aktien-ansatz", "bsr-teilwert",
      `Ein Unternehmer hat ${n} börsennotierte Aktien für das Anlagevermögen erworben (Anschaffungskosten einschließlich Nebenkosten ${eur(kurs)} je Aktie). Am Bilanzstichtag beträgt der Kurs ${eur(stichtag)}; bis zur Bilanzaufstellung steigt er auf ${eur(spaeter)}. Er möchte einen möglichst niedrigen Gewinn ausweisen.\n\nMit welchem Wert sind die Aktien in der Steuerbilanz anzusetzen (in €, insgesamt)?`,
      wert,
      dauernd
        ? `Kursrückgang am Stichtag um mehr als 5 % (${eur(stichtag)} < 95 % von ${eur(kurs)}) → voraussichtlich dauernd (BMF 02.09.2016); spätere Kursanstiege bleiben unberücksichtigt. Ansatz: ${n} × ${eur(stichtag)} = ${eur(wert)} (§ 6 Abs. 1 Nr. 2 S. 2 EStG).`
        : `Der Kursrückgang liegt innerhalb der Bagatellgrenze von 5 % → keine dauernde Wertminderung. Ansatz mit den Anschaffungskosten: ${n} × ${eur(kurs)} = ${eur(wert)}.`);
  }),
  V("t2-teilwert-maschine", "bsr-teilwert", (r) => {
    const ak = r.betrag(6000, 60000, 1200), m = r.zahl(1, 12), nd = 10, mon = ak / (nd * 12);
    const bw = ak - mon * (monate(m) + 24), rnd = nd * 12 - monate(m) - 24, halb = bw / 2;
    const tw = Math.round(halb * r.wahl([0.8, 0.9, 1.1, 1.3]) / 10000) * 10000, dauernd = tw < halb, wert = dauernd ? tw : bw;
    return rechnen("t2-teilwert-maschine", "bsr-teilwert",
      `Eine Produktionsmaschine wurde im ${MONAT[m - 1]} 01 für ${eur(ak)} netto angeschafft (Nutzungsdauer 10 Jahre, lineare AfA). Wegen einer technischen Neuerung beträgt ihr Teilwert am 31.12.03 nur noch ${eur(tw)}. Der Unternehmer möchte einen möglichst niedrigen Gewinn ausweisen.\n\nMit welchem Wert ist die Maschine in der Steuerbilanz 31.12.03 anzusetzen (in €)?`,
      wert,
      `Planmäßiger Buchwert 31.12.03: ${eur(ak)} − AfA ${monate(m) + 24} Monate × ${eur(mon)} = ${eur(bw)}; Restnutzungsdauer ${rnd} Monate.\nDauernde Wertminderung beim abnutzbaren Anlagevermögen, wenn der Teilwert unter dem planmäßigen Buchwert nach der halben Restnutzungsdauer liegt (BMF 02.09.2016, Rn. 8): ${eur(bw)} − ${String(rnd / 2).replace(".", ",")} Monate × ${eur(mon)} = ${eur(halb)}.\n` +
        (dauernd
          ? `${eur(tw)} < ${eur(halb)} → voraussichtlich dauernd; Teilwertabschreibung auf ${eur(tw)} (§ 6 Abs. 1 Nr. 1 S. 2 EStG, Wahlrecht; handelsrechtlich Pflicht nach § 253 Abs. 3 S. 5 HGB). Danach AfA vom Teilwert über die Restnutzungsdauer.`
          : `${eur(tw)} ≥ ${eur(halb)} → nicht dauernd; keine Teilwertabschreibung, Ansatz mit dem planmäßigen Buchwert ${eur(bw)}.`),
      Q + " – Lösungshinweis Teilwertabschreibung");
  }),
  V("t2-wertpapiere", "bsr-teilwert", (r) => {
    const nenn = r.betrag(10000, 100000, 5000), k0 = r.wahl([102, 103, 104, 105, 106]), k1 = r.wahl([94, 95, 96, 97, 98]);
    const ak = nenn * k0 / 100 * 1.01, tw = nenn * k1 / 100 * 1.01, hb = r.muenze(), av = r.muenze();
    const wert = hb ? tw : nenn;
    return rechnen("t2-wertpapiere", "bsr-teilwert",
      `Ein Unternehmer erwirbt am 01.09.01 festverzinsliche, börsennotierte Wertpapiere im Nennwert von ${eur(nenn)} zum Kurs von ${k0} % zuzüglich 1 % Bankgebühren für das ${av ? "Anlage" : "Umlauf"}vermögen. Die Papiere werden bei Fälligkeit zu 100 % eingelöst; ein Bonitätsrisiko besteht nicht. Am 31.12.01 notieren sie bei ${k1} %. Der Unternehmer möchte einen möglichst niedrigen Gewinn ausweisen.\n\nMit welchem Wert sind die Wertpapiere ${hb ? "in der Handelsbilanz" : "in der Steuerbilanz"} 31.12.01 anzusetzen (in €)?`,
      wert,
      `Anschaffungskosten: ${k0} % von ${eur(nenn)} + 1 % Bankgebühren (Anschaffungsnebenkosten, § 255 Abs. 1 S. 2 HGB) = ${eur(Math.round(ak))}.\nNiedrigerer Wert am Stichtag einschließlich anteiliger Nebenkosten eines gedachten Erwerbers: ${k1} % + 1 % = ${eur(Math.round(tw))}.\n` +
        (hb
          ? (av ? `Handelsbilanz, Finanzanlage: außerplanmäßige Abschreibung auch bei nur vorübergehender Wertminderung zulässig (§ 253 Abs. 3 S. 6 HGB) → niedrigster Ansatz ${eur(Math.round(tw))}.`
            : `Handelsbilanz, Umlaufvermögen: strenges Niederstwertprinzip (§ 253 Abs. 4 S. 1 HGB) → ${eur(Math.round(tw))}.`)
          : `Steuerbilanz: Teilwertabschreibung nur, soweit die Wertminderung dauerhaft ist (§ 6 Abs. 1 Nr. 2 S. 2 EStG). Da die Papiere zum Nennwert eingelöst werden, ist eine Minderung unter 100 % nicht von Dauer – ${av ? "" : "auch im Umlaufvermögen; "}Teilwertabschreibung nur bis auf den Nennwert ${eur(nenn)} (BMF 02.09.2016, Rn. 21).`),
      Q + " – Lösungshinweis Teilwertabschreibung");
  }),
];

// ======================================================================= Rechnungsabgrenzung und Verbindlichkeiten
const abgrenzung = [
  A("t2-rap", "bsr-abgrenzung",
    "Erläutern Sie die Rechnungsabgrenzungsposten und grenzen Sie sie von sonstigen Forderungen und Verbindlichkeiten ab.",
    "Grundsatz der Periodenabgrenzung (§ 252 Abs. 1 Nr. 5 HGB): Aufwendungen und Erträge sind unabhängig vom Zahlungszeitpunkt dem Jahr zuzuordnen, zu dem sie wirtschaftlich gehören.\n• Transitorische Posten = Rechnungsabgrenzungsposten (§ 250 HGB, § 5 Abs. 5 EStG): Zahlung vor dem Stichtag, Aufwand bzw. Ertrag für eine bestimmte Zeit danach.\n  – Aktiver RAP: Ausgabe vor dem Stichtag, Aufwand danach (z. B. Miete, Versicherung, Kfz-Steuer im Voraus bezahlt).\n  – Passiver RAP: Einnahme vor dem Stichtag, Ertrag danach (z. B. im Voraus erhaltene Miete oder Zinsen, Zuschüsse für eine bestimmte Zeit).\n• Antizipative Posten: Aufwand bzw. Ertrag im alten Jahr, Zahlung erst danach → sonstige Verbindlichkeit (z. B. nachschüssige Zinsen) bzw. sonstige Forderung.\n• Berechnung zeitanteilig nach Monaten bzw. Tagen.",
    ["HGB 250", "EStG 5 5"],
    M(["Ein aktiver RAP setzt eine Ausgabe vor dem Stichtag für Aufwand nach dem Stichtag voraus.", "Im Voraus erhaltene Mieten werden passiv abgegrenzt.", "Nachschüssig gezahlte Zinsen für das alte Jahr sind als sonstige Verbindlichkeit zu erfassen.", "Rechnungsabgrenzungsposten dienen der periodengerechten Gewinnermittlung."],
      ["Ein aktiver RAP entsteht, wenn Aufwand des alten Jahres erst im neuen Jahr bezahlt wird.", "Im Voraus erhaltene Mieten sind sofort in voller Höhe als Ertrag zu buchen.", "Nachschüssige Zinsen sind erst im Jahr der Zahlung zu erfassen.", "Rechnungsabgrenzungsposten sind steuerlich unzulässig."],
      "Welche Aussagen zur Rechnungsabgrenzung sind richtig?"),
    { norm: ["HGB 250|EStG 5"], s: ["aktiv", "passiv", "bestimmte zeit|zeitraum", "sonstige verbindlichkeit|sonstige forderung|antizipativ", "periode|wirtschaftlich"] }),
  A("t2-verbindlichkeiten", "bsr-abgrenzung",
    "Wie sind Verbindlichkeiten zu bewerten? Gehen Sie auf unverzinsliche Darlehen und Fremdwährungsverbindlichkeiten ein.",
    "• Handelsrecht: Ansatz mit dem Erfüllungsbetrag (§ 253 Abs. 1 S. 2 HGB).\n• Steuerrecht: § 6 Abs. 1 Nr. 3 i. V. m. Nr. 2 EStG – Anschaffungskosten = Erfüllungsbetrag; ein höherer Teilwert nur bei voraussichtlich dauernder Erhöhung.\n• Unverzinsliche Verbindlichkeiten werden seit 2023 nicht mehr abgezinst (Wegfall des Abzinsungsgebots in § 6 Abs. 1 Nr. 3 EStG) → Ansatz mit dem Rückzahlungsbetrag.\n• Fremdwährung: Umrechnung zum Devisenkassamittelkurs (§ 256a HGB). Bei Restlaufzeit über einem Jahr gilt das Höchstwertprinzip: Ein gestiegener Euro-Wert ist anzusetzen, ein gesunkener nicht (Realisationsprinzip); bei Restlaufzeit bis zu einem Jahr ist der Stichtagskurs maßgeblich, auch wenn er niedriger ist (§ 256a S. 2 HGB). Steuerlich: höherer Teilwert nur bei dauernder Kurserhöhung.\n• Zinsen für das alte Jahr, die erst später gezahlt werden, sind als sonstige Verbindlichkeit zu passivieren.",
    ["HGB 253 1", "HGB 256a", "EStG 6 1"],
    M(["Verbindlichkeiten sind handelsrechtlich mit dem Erfüllungsbetrag anzusetzen.", "Unverzinsliche Verbindlichkeiten werden steuerlich nicht mehr abgezinst.", "Fremdwährungsverbindlichkeiten werden zum Devisenkassamittelkurs umgerechnet.", "Bei langfristigen Fremdwährungsverbindlichkeiten gilt das Höchstwertprinzip."],
      ["Unverzinsliche Darlehen sind steuerlich mit 5,5 % abzuzinsen.", "Verbindlichkeiten sind mit dem Auszahlungsbetrag abzüglich Tilgungen der Vorjahre um 10 % zu kürzen.", "Bei langfristigen Fremdwährungsverbindlichkeiten ist ein gesunkener Euro-Wert immer anzusetzen.", "Fremdwährungsverbindlichkeiten bleiben stets mit dem Kurs bei Entstehung bewertet."],
      "Welche Aussagen zur Bewertung von Verbindlichkeiten sind richtig?"),
    { norm: ["HGB 253|EStG 6"], s: ["erfuellungsbetrag", "abzins", "devisenkassamittelkurs|256a", "hoechstwert", "ein jahr|laufzeit"] }),
  V("t2-arap", "bsr-abgrenzung", (r) => {
    const [was, dauer, konto] = r.wahl([["die Kfz-Versicherung", 12, "Kfz-Kosten"], ["die Kfz-Steuer", 12, "Kfz-Kosten"], ["die Büromiete", 24, "Mietaufwendungen"], ["die Büromiete", 12, "Mietaufwendungen"], ["einen Wartungsvertrag", 12, "Reparaturaufwendungen"]]);
    const m = r.zahl(2, 12), betrag = r.betrag(900, 6000, 60), folge = dauer - monate(m), arap = betrag * folge / dauer;
    return rechnen("t2-arap", "bsr-abgrenzung",
      `Ein Unternehmer überweist am 01.${String(m).padStart(2, "0")}.01 ${was} für ${dauer} Monate ab diesem Tag im Voraus: ${eur(betrag)} (ohne USt). Die Zahlung wurde voll als Aufwand gebucht.\n\nWelcher aktive Rechnungsabgrenzungsposten ist zum 31.12.01 zu bilden (in €)?`,
      arap,
      `Ausgabe vor dem Stichtag, Aufwand für eine bestimmte Zeit danach → aktiver RAP (§ 250 Abs. 1 HGB, § 5 Abs. 5 S. 1 Nr. 1 EStG); die Ausgabe übersteigt 800 €, das Wahlrecht nach § 5 Abs. 5 S. 2 EStG greift nicht.\nAuf 01 entfallen ${monate(m)} Monate, auf die Folgezeit ${folge} Monate: ${eur(betrag)} × ${folge}/${dauer} = ${eur(Math.round(arap))}.\nBuchung: ARAP an ${konto} ${eur(Math.round(arap))}.`);
  }),
  V("t2-zinsen-abgrenzung", "bsr-abgrenzung", (r) => {
    const d = r.betrag(50000, 500000, 10000), z = r.wahl([2, 3, 3.5, 4, 4.5, 5, 6]), m = r.zahl(2, 11), forderung = r.muenze();
    const zinsen = d * z / 100 * monate(m) / 12;
    return rechnen("t2-zinsen-abgrenzung", "bsr-abgrenzung",
      `Ein Unternehmer hat am 01.${String(m).padStart(2, "0")}.01 ein Darlehen über ${eur(d)} ${forderung ? "einem Geschäftspartner gewährt" : "bei seiner Bank aufgenommen"} (Zinssatz ${String(z).replace(".", ",")} % p. a.). Die Zinsen werden jährlich nachschüssig jeweils zum 01.${String(m).padStart(2, "0")}. gezahlt.\n\nWelcher Betrag ist zum 31.12.01 als ${forderung ? "sonstige Forderung" : "sonstige Verbindlichkeit"} anzusetzen (in €)?`,
      zinsen,
      `Die Zinsen für ${MONAT[m - 1]} bis Dezember 01 gehören wirtschaftlich zu 01 (Periodenabgrenzung, § 252 Abs. 1 Nr. 5 HGB), werden aber erst in 02 gezahlt → antizipativer Posten: ${forderung ? "sonstige Forderung (Zinsertrag)" : "sonstige Verbindlichkeit (Zinsaufwand)"}.\n${eur(d)} × ${String(z).replace(".", ",")} % × ${monate(m)}/12 = ${eur(Math.round(zinsen))}.\nBuchung: ${forderung ? "Sonstige Forderungen an Zinserträge" : "Zinsaufwendungen an Sonstige Verbindlichkeiten"}.`);
  }),
  V("t2-prap", "bsr-abgrenzung", (r) => {
    const d = r.betrag(30000, 200000, 10000), z = r.wahl([3, 4, 5, 6]), m = r.zahl(2, 12), zins = d * z / 100, prap = zins * (m - 1) / 12;
    return rechnen("t2-prap", "bsr-abgrenzung",
      `Ein Unternehmer hat am 01.${String(m).padStart(2, "0")}.01 einem Geschäftspartner ein Darlehen über ${eur(d)} gewährt (${z} % p. a.). Die Zinsen für die ersten 12 Monate (${eur(zins)}) erhält er am selben Tag im Voraus und bucht sie als Zinsertrag.\n\nWelcher passive Rechnungsabgrenzungsposten ist zum 31.12.01 zu bilden (in €)?`,
      prap,
      `Einnahme vor dem Stichtag, Ertrag für eine bestimmte Zeit danach → passiver RAP (§ 250 Abs. 2 HGB, § 5 Abs. 5 S. 1 Nr. 2 EStG); die Einnahme übersteigt 800 € (§ 5 Abs. 5 S. 2 EStG).\nAuf 02 entfallen ${m - 1} Monate: ${eur(zins)} × ${m - 1}/12 = ${eur(Math.round(prap))}.\nBuchung: Zinserträge an PRAP.`);
  }),
  F("t2-abgrenzung-art", "bsr-abgrenzung", "Welcher Posten ist zum Bilanzstichtag 31.12.01 zu bilden?",
    ["Aktiver Rechnungsabgrenzungsposten", "Passiver Rechnungsabgrenzungsposten", "Sonstige Forderung", "Sonstige Verbindlichkeit", "Kein Abgrenzungsposten"], [
      { text: "Am 20.12.01 wird die Januarmiete 02 für das Büro überwiesen.", richtig: 0, erkl: "Ausgabe vor dem Stichtag für Aufwand in 02 → aktiver RAP (§ 250 Abs. 1 HGB).", normen: ["HGB 250"] },
      { text: "Ein Mieter überweist am 28.12.01 die Januarmiete 02 für eine betriebliche Lagerfläche.", richtig: 1, erkl: "Einnahme vor dem Stichtag für Ertrag in 02 → passiver RAP (§ 250 Abs. 2 HGB).", normen: ["HGB 250"] },
      { text: "Die Darlehenszinsen für Oktober bis Dezember 01 bucht die Bank erst am 31.01.02 ab.", richtig: 3, erkl: "Aufwand 01, Zahlung 02 → sonstige Verbindlichkeit (antizipative Abgrenzung).", normen: ["HGB 252 1"] },
      { text: "Ein Geschäftspartner zahlt die Zinsen für ein vom Unternehmer gewährtes Darlehen für das Jahr 01 erst im Juli 02.", richtig: 2, erkl: "Ertrag 01, Zahlung 02 → sonstige Forderung.", normen: ["HGB 252 1"] },
      { text: "Am 01.11.01 wird die Kfz-Versicherung für 01.11.01 bis 31.10.02 bezahlt.", richtig: 0, erkl: "Ausgabe in 01, Aufwand zu 10/12 in 02 → aktiver RAP.", normen: ["HGB 250"] },
      { text: "Am 01.09.01 erhält der Unternehmer einen öffentlichen Zuschuss für einen Ausbildungsplatz, der für drei Jahre zu besetzen ist.", richtig: 1, erkl: "Einnahme vor dem Stichtag als Gegenleistung für eine bestimmte Zeit danach → passiver RAP, über die Laufzeit aufzulösen.", normen: ["HGB 250"] },
      { text: "Ein Landwirt erhält am 01.01.01 eine Prämie von 8.000 € dafür, dass er seine Milch 5 Jahre lang nicht vermarktet.", richtig: 1, erkl: "Die Prämie ist Gegenleistung für die Nichtvermarktung während einer bestimmten Zeit → passiver RAP (§ 250 Abs. 2 HGB, § 5 Abs. 5 S. 1 Nr. 2 EStG): 8.000 € × 4/5 = 6.400 €. Auch ein Forderungszugang ist eine Einnahme.", normen: ["HGB 250", "EStG 5 5"] },
      { text: "Am 01.03.01 wird die Kfz-Steuer für den Lkw für 12 Monate im Voraus abgebucht (2.400 €).", richtig: 0, erkl: "Die Steuer entfällt zu 2/12 auf die Zulassungszeit in 02 → aktiver RAP 400 € (H 5.6 EStH). Die Ausgabe übersteigt 800 €, das Wahlrecht nach § 5 Abs. 5 S. 2 EStG greift nicht.", normen: ["HGB 250", "EStG 5 5"] },
      { text: "Die Dezembermiete 01 wird am 30.12.01 bezahlt.", richtig: 4, erkl: "Aufwand und Zahlung fallen in dasselbe Jahr → keine Abgrenzung.", normen: ["HGB 252 1"] },
    ]),
  V("t2-zinsen-buchung", "bsr-abgrenzung", (r) => {
    const z = r.betrag(500, 9000, 50);
    return buchung("t2-zinsen-buchung", "bsr-abgrenzung",
      `Für ein betriebliches Darlehen fallen für den Zeitraum bis 31.12.01 Zinsen von ${eur(z)} an, die die Bank erst im Folgejahr abbucht. Buchen Sie zum 31.12.01.`,
      einfach("zinsaufwendungen", "sonstigeVerbindlichkeiten", z),
      "Aufwand des alten Jahres, Zahlung im neuen Jahr → Zinsaufwendungen an Sonstige Verbindlichkeiten (Periodenabgrenzung, § 252 Abs. 1 Nr. 5 HGB). Auf den Zahlungszeitpunkt kommt es nicht an.",
      { quelle: Q + " – Verbindlichkeiten; Semesterklausur 10/24, Sachverhalt 3" });
  }),
  V("t2-arap-buchung", "bsr-abgrenzung", (r) => {
    const b = r.betrag(960, 2400, 120), m = r.zahl(7, 12), arap = b * (12 - monate(m)) / 12;
    return buchung("t2-arap-buchung", "bsr-abgrenzung",
      `Am 01.${String(m).padStart(2, "0")}.01 wurde die Kfz-Versicherung für 12 Monate im Voraus (${eur(b)}) bezahlt und voll als Kfz-Kosten gebucht. Buchen Sie zum 31.12.01 die erforderliche Abgrenzung.`,
      einfach("arap", "kfzKosten", Math.round(arap)),
      `Auf 02 entfallen ${12 - monate(m)} Monate: ${eur(b)} × ${12 - monate(m)}/12 = ${eur(Math.round(arap))} → ARAP an Kfz-Kosten (§ 250 Abs. 1 HGB, § 5 Abs. 5 S. 1 Nr. 1 EStG).`,
      { quelle: Q + " – Rechnungsabgrenzungsposten" });
  }),
  V("t2-fremdwaehrung-ware", "bsr-abgrenzung", (r) => {
    const usd = r.betrag(50000, 200000, 10000), k0 = r.wahl([1.1, 1.15, 1.2, 1.25]), hoch = r.muenze();
    const k1 = Math.round((hoch ? k0 * r.wahl([0.86, 0.9, 0.94]) : k0 * r.wahl([1.04, 1.08])) * 100) / 100;
    const k2 = Math.round(k0 * r.wahl([0.92, 0.96, 1.02]) * 100) / 100, hb = r.muenze();
    const e0 = usd / k0, e1 = usd / k1, e2 = usd / k2, kurs = (k) => k.toFixed(2).replace(".", ","), dollar = (c) => eur(c).replace("€", "USD");
    const stb = Math.max(e0, Math.min(e1, e2)), wert = hb ? e1 : stb;
    return rechnen("t2-fremdwaehrung-ware", "bsr-abgrenzung",
      `Ein Händler kauft am 11.11.01 Waren für ${dollar(usd)} auf Ziel; Zahlung am 15.02.02, die Bilanz wird am 31.03.02 aufgestellt. Devisenkassamittelkurse (1 € = … USD): 11.11.01 ${kurs(k0)}; 31.12.01 ${kurs(k1)}; 15.02.02 ${kurs(k2)}. Er möchte einen möglichst niedrigen Gewinn ausweisen.\n\nMit welchem Wert ist die Verbindlichkeit in der ${hb ? "Handelsbilanz" : "Steuerbilanz"} 31.12.01 anzusetzen (in €)?`,
      wert,
      `Kurswerte: 11.11.01 ${eur(Math.round(e0))}; 31.12.01 ${eur(Math.round(e1))}; 15.02.02 ${eur(Math.round(e2))}.\n` +
        (hb
          ? `Handelsbilanz: Restlaufzeit bis zu einem Jahr → Stichtagskurs, auch wenn der Wert gesunken ist (§ 256a S. 2 HGB): ${eur(Math.round(e1))}.`
          : `Steuerbilanz (§ 6 Abs. 1 Nr. 3 i. V. m. Nr. 2 EStG): Ein gesunkener Erfüllungsbetrag darf nicht angesetzt werden (§ 252 Abs. 1 Nr. 4 HGB). Ein höherer nur, soweit die Werterhöhung voraussichtlich dauerhaft ist – bei Verbindlichkeiten des laufenden Geschäftsverkehrs, soweit sie bis zur Tilgung bzw. Aufstellung anhält (BMF 02.09.2016, Rn. 36) → ${eur(Math.round(stb))}.`),
      "Folien Teil II – Verbindlichkeiten");
  }),
  V("t2-fremdwaehrung", "bsr-abgrenzung", (r) => {
    const usd = r.betrag(50000, 300000, 10000), k0 = r.wahl([0.95, 1, 1.05, 1.1]), k1 = Math.round(k0 * r.wahl([0.96, 0.98, 1.02, 1.04]) * 10000) / 10000;
    const kurz = r.muenze(), hb = r.wahl([true, true, false]);
    const e0 = usd / k0, e1 = usd / k1, kurs = (k) => k.toFixed(4).replace(".", ","), dollar = (c) => eur(c).replace("€", "USD");
    const wert = !hb ? e0 : kurz ? e1 : Math.max(e0, e1);
    return rechnen("t2-fremdwaehrung", "bsr-abgrenzung",
      `Ein Unternehmer nimmt am 01.07.01 zur Stärkung des Betriebskapitals ein Darlehen über ${dollar(usd)} auf (Devisenkassamittelkurs ${kurs(k0)} USD je 1 €). Am 31.12.01 beträgt der Kurs ${kurs(k1)} USD je 1 €; die Restlaufzeit beträgt ${kurz ? "10 Monate" : "3 Jahre"}. Die Kursänderung entspricht üblichen Schwankungen am Devisenmarkt.\n\nMit welchem Wert ist das Darlehen in der ${hb ? "Handelsbilanz" : "Steuerbilanz"} 31.12.01 anzusetzen (in €)?`,
      wert,
      `Erstverbuchung zum Kurs bei Entstehung: ${dollar(usd)} / ${kurs(k0)} = ${eur(Math.round(e0))}; Stichtagswert: ${dollar(usd)} / ${kurs(k1)} = ${eur(Math.round(e1))}.\n` +
        (!hb
          ? `Steuerbilanz: höherer Teilwert nur bei voraussichtlich dauernder Erhöhung (§ 6 Abs. 1 Nr. 3 i. V. m. Nr. 2 S. 2 EStG). Bei einem Darlehen, das dauerhaft das Betriebskapital stärkt, sind übliche Kursschwankungen nicht dauerhaft (BMF 02.09.2016, Rn. 33); ein niedrigerer Wert scheidet nach dem Realisationsprinzip aus → Anschaffungskosten ${eur(Math.round(e0))}.`
          : kurz
            ? `Handelsbilanz, Restlaufzeit bis zu einem Jahr: Umrechnung zum Stichtagskurs ohne Rücksicht auf Anschaffungskosten- und Realisationsprinzip (§ 256a S. 2 HGB) → ${eur(Math.round(e1))}.`
            : `Handelsbilanz, Restlaufzeit über einem Jahr: Höchstwertprinzip (§ 256a S. 1, § 253 Abs. 1 S. 2 HGB) – ein gestiegener Erfüllungsbetrag ist anzusetzen, ein gesunkener nicht → ${eur(Math.round(wert))}.`),
      Q + " – Lösungshinweis Verbindlichkeiten");
  }),
];

// ======================================================================= Entnahmen und Einlagen
const privat = [
  V("t2-fahrten-wohnung", "bsr-entnahme-einlage", (r) => {
    const blp = r.betrag(25000, 70000, 1) + r.zahl(0, 99), abger = Math.floor(blp / 10000) * 10000, km = r.zahl(5, 35), tage = r.wahl([200, 210, 220, 230]);
    const methode = r.wahl(["pauschal", "pauschal", "fahrtenbuch"]);
    const ep = tage * km * 38;
    if (methode === "pauschal") {
      const kosten = Math.round(abger * 0.0003 * km * 12), nicht = Math.max(0, kosten - ep);
      return rechnen("t2-fahrten-wohnung", "bsr-entnahme-einlage",
        `Ein Unternehmer nutzt seinen betrieblichen Pkw (Bruttolistenpreis ${eur(blp)}, kein Fahrtenbuch) auch für Fahrten zwischen Wohnung und Betrieb: einfache Entfernung ${km} km, ${tage} Tage im Jahr.\n\nWie hoch sind die nicht abziehbaren Betriebsausgaben nach § 4 Abs. 5 S. 1 Nr. 6 EStG (in €)?`,
        nicht,
        `0,03-%-Methode: ${eur(abger)} (abgerundet) × 0,03 % × ${km} km × 12 Monate = ${eur(kosten)}\n− abziehbar wie die Entfernungspauschale: ${tage} Tage × ${km} km × 0,38 € = ${eur(ep)}\n= nicht abziehbar ${eur(nicht)} → keine Buchung, sondern außerbilanzielle Hinzurechnung. Umsatzsteuerlich zählen die Fahrten zur unternehmerischen Nutzung (keine Korrektur).`,
        "Folien Teil II – Nichtabzugsfähige Betriebsausgaben");
    }
    const kfz = r.betrag(8000, 20000, 100), gesamtKm = r.wahl([20000, 25000, 30000]), wegKm = tage * km * 2, anteil = Math.round(kfz * wegKm / gesamtKm), nicht = Math.max(0, anteil - ep);
    return rechnen("t2-fahrten-wohnung", "bsr-entnahme-einlage",
      `Ein Unternehmer führt für seinen betrieblichen Pkw ein ordnungsgemäßes Fahrtenbuch. Gesamtkosten des Jahres einschließlich AfA: ${eur(kfz)}; Jahresfahrleistung ${G.text(gesamtKm * 100).replace(",00", "")} km. Fahrten zwischen Wohnung und Betrieb an ${tage} Tagen, einfache Entfernung ${km} km.\n\nWie hoch sind die nicht abziehbaren Betriebsausgaben nach § 4 Abs. 5 S. 1 Nr. 6 EStG (in €)?`,
      nicht,
      `Fahrtenbuchmethode: gefahrene km Wohnung–Betrieb ${tage} × ${km} km × 2 = ${G.text(wegKm * 100).replace(",00", "")} km\nKosten: ${eur(kfz)} × ${G.text(wegKm * 100).replace(",00", "")}/${G.text(gesamtKm * 100).replace(",00", "")} km = ${eur(anteil)}\n− abziehbar: ${tage} × ${km} km × 0,38 € = ${eur(ep)}\n= nicht abziehbar ${eur(nicht)} → außerbilanzielle Hinzurechnung.`,
      "Folien Teil II – Nichtabzugsfähige Betriebsausgaben");
  }),
  A("t2-entnahme-einlage", "bsr-entnahme-einlage",
    "Was sind Entnahmen und Einlagen, wie werden sie bewertet, und wie wirken sie sich auf den Gewinn aus?",
    "• Entnahmen (§ 4 Abs. 1 S. 2 EStG): alle Wirtschaftsgüter (Geld, Waren, Erzeugnisse, Nutzungen und Leistungen), die der Unternehmer für sich, seinen Haushalt oder andere betriebsfremde Zwecke entnimmt. Bewertung mit dem Teilwert (§ 6 Abs. 1 Nr. 4 S. 1 EStG); private Kfz-Nutzung pauschal nach der 1-%-Regelung oder per Fahrtenbuch.\n• Einlagen (§ 4 Abs. 1 S. 8 EStG): alle Wirtschaftsgüter, die der Unternehmer dem Betrieb zuführt – auch die Bezahlung betrieblicher Ausgaben von einem privaten Konto. Bewertung mit dem Teilwert (§ 6 Abs. 1 Nr. 5 EStG), höchstens mit den (um AfA geminderten) Anschaffungs- oder Herstellungskosten, wenn das Wirtschaftsgut innerhalb der letzten drei Jahre angeschafft wurde.\n• Gewinnauswirkung: Entnahmen und Einlagen sind betrieblich nicht veranlasst und dürfen den Gewinn nicht beeinflussen – beim Betriebsvermögensvergleich werden Entnahmen hinzugerechnet und Einlagen abgezogen (§ 4 Abs. 1 S. 1 EStG). Ein Ertrag entsteht nur bei Sach- und Nutzungsentnahmen über die Ertragskonten (z. B. Warenentnahmen, private Kfz-Nutzung).",
    ["EStG 4 1", "EStG 6 1"],
    M(["Entnahmen sind grundsätzlich mit dem Teilwert zu bewerten.", "Die Bezahlung einer Betriebsausgabe vom privaten Konto ist eine Einlage.", "Einlagen innerhalb von drei Jahren nach Anschaffung sind höchstens mit den fortgeführten Anschaffungskosten zu bewerten.", "Beim Betriebsvermögensvergleich werden Einlagen abgezogen."],
      ["Einlagen erhöhen den Gewinn.", "Entnahmen sind stets mit den Anschaffungskosten zu bewerten.", "Eine Zahlung vom privaten Konto für betriebliche Zwecke ist eine Entnahme.", "Beim Betriebsvermögensvergleich werden Entnahmen abgezogen."],
      "Welche Aussagen zu Entnahmen und Einlagen sind richtig?"),
    { norm: ["EStG 4|EStG 6"], s: ["teilwert", "entnahme", "einlage", "drei jahre|3 jahre", "hinzugerechnet|hinzurechn|abgezogen|gewinnneutral|erfolgsneutral"] }),
  A("t2-pkw-nutzung", "bsr-entnahme-einlage",
    "Wie wird die private Nutzung eines betrieblichen Pkw erfasst, und was gilt für Fahrten zwischen Wohnung und Betrieb?",
    "• Voraussetzung der 1-%-Regelung: notwendiges Betriebsvermögen, d. h. betriebliche Nutzung von mehr als 50 % (§ 6 Abs. 1 Nr. 4 S. 2 EStG).\n• Nutzungsentnahme je Kalendermonat 1 % des inländischen Bruttolistenpreises bei Erstzulassung zzgl. Sonderausstattung, abgerundet auf volle 100 € (für reine Elektrofahrzeuge geringere Sätze).\n• Alternativ Fahrtenbuch: tatsächliche Kosten (einschließlich AfA) × privater Nutzungsanteil (§ 6 Abs. 1 Nr. 4 S. 3 EStG).\n• Fahrten Wohnung – Betrieb (§ 4 Abs. 5 S. 1 Nr. 6 EStG): nicht abziehbar ist der Betrag von 0,03 % des Listenpreises je Entfernungskilometer und Monat abzüglich der Entfernungspauschale (2026: 0,38 € je km).\n• Umsatzsteuer: unentgeltliche Wertabgabe (§ 3 Abs. 9a Nr. 1 UStG); bei der 1-%-Methode werden für nicht vorsteuerbelastete Kosten pauschal 20 % abgezogen.\n• Buchung: Privatentnahmen an Verwendung von Gegenständen (private Kfz-Nutzung) und Umsatzsteuer.",
    ["EStG 6 1", "EStG 4 5"],
    M(["Die 1-%-Regelung setzt eine betriebliche Nutzung von mehr als 50 % voraus.", "Bemessungsgrundlage ist der inländische Bruttolistenpreis bei Erstzulassung.", "Alternativ kann der private Anteil per Fahrtenbuch ermittelt werden.", "Für Fahrten zwischen Wohnung und Betrieb gibt es eine Abzugsbeschränkung."],
      ["Bemessungsgrundlage ist der tatsächlich gezahlte Nettokaufpreis.", "Die 1-%-Regelung gilt auch bei einer betrieblichen Nutzung von 30 %.", "Die private Nutzung ist umsatzsteuerlich nie zu erfassen.", "Fahrten zwischen Wohnung und Betrieb sind voll als Betriebsausgaben abziehbar."],
      "Welche Aussagen zur privaten Pkw-Nutzung sind richtig?"),
    { norm: ["EStG 6"], s: ["listenpreis", "50|ueberwiegend", "fahrtenbuch", "kalendermonat|monat", "0,03|0 03"] }),
  V("t2-einlage-wert", "bsr-entnahme-einlage", (r) => {
    const ak = r.betrag(3000, 30000, 600), nd = r.wahl([5, 6, 8]), jahre = r.wahl([1, 2, 4]), tw = Math.round(ak * r.wahl([0.5, 0.65, 0.8, 0.95]) / 10000) * 10000;
    const fortg = ak - ak / nd * jahre, binnen = jahre < 3, wert = binnen ? Math.min(tw, fortg) : tw;
    return rechnen("t2-einlage-wert", "bsr-entnahme-einlage",
      `Ein Unternehmer legt am 01.01.05 einen bisher privat genutzten Gegenstand (Nutzungsdauer ${nd} Jahre) in sein Betriebsvermögen ein, den er vor genau ${jahre} Jahr${jahre > 1 ? "en" : ""} privat für ${eur(ak)} gekauft hatte. Der Teilwert am Einlagetag beträgt ${eur(tw)}.\n\nMit welchem Wert ist die Einlage anzusetzen (in €)?`,
      wert,
      binnen
        ? `Anschaffung innerhalb der letzten drei Jahre → höchstens fortgeführte Anschaffungskosten (§ 6 Abs. 1 Nr. 5 S. 1 a, S. 2 EStG): ${eur(ak)} − AfA für ${jahre} Jahr${jahre > 1 ? "e" : ""} (${eur(Math.round(ak / nd * jahre))}) = ${eur(Math.round(fortg))}. Vergleich mit dem Teilwert ${eur(tw)} → der niedrigere Wert: ${eur(Math.round(wert))}.`
        : `Die Anschaffung liegt mehr als drei Jahre zurück → Ansatz mit dem Teilwert (§ 6 Abs. 1 Nr. 5 S. 1 EStG): ${eur(tw)}.`);
  }),
  V("t2-pkw-1prozent", "bsr-entnahme-einlage", (r) => {
    const blp = r.betrag(25000, 70000, 1) + r.zahl(1, 99) * 100 / 100, m = r.zahl(1, 12), abger = Math.floor(blp / 10000) * 10000;
    const wert = abger / 100 * monate(m);
    return rechnen("t2-pkw-1prozent", "bsr-entnahme-einlage",
      `Ein Unternehmer erwirbt im ${MONAT[m - 1]} 01 einen Pkw (Verbrennungsmotor), den er zu 70 % betrieblich und im Übrigen privat nutzt; ein Fahrtenbuch führt er nicht. Der inländische Bruttolistenpreis bei Erstzulassung beträgt ${eur(blp)}.\n\nWie hoch ist die Nutzungsentnahme für 01 nach der 1-%-Regelung (in €, ohne Umsatzsteuer)?`,
      wert,
      `Betriebliche Nutzung über 50 % → notwendiges Betriebsvermögen, 1-%-Regelung (§ 6 Abs. 1 Nr. 4 S. 2 EStG).\nListenpreis abgerundet auf volle 100 €: ${eur(abger)}; 1 % = ${eur(abger / 100)} je Monat × ${monate(m)} Monate (${MONAT[m - 1]} – Dezember) = ${eur(wert)}.`);
  }),
  V("t2-einlage-buchung", "bsr-entnahme-einlage", (r) => {
    const n = r.betrag(200, 3000, 10), u = ust(n), [konto, was] = r.wahl([["reparatur", "eine Reparatur am Lieferwagen"], ["buerobedarf", "Büromaterial"], ["kfzKosten", "eine Inspektion des Firmenwagens"]]);
    return buchung("t2-einlage-buchung", "bsr-entnahme-einlage",
      `Der Unternehmer bezahlt die Rechnung für ${was} über ${eur(n)} zzgl. ${eur(u)} USt von seinem privaten Bankkonto.`,
      satz([[konto, n], ["vorsteuer", u]], [["privateinlagen", n + u]]),
      `Betrieblicher Aufwand ${eur(n)} mit Vorsteuerabzug; die Zahlung aus privaten Mitteln ist eine Einlage (§ 4 Abs. 1 S. 8 EStG) in Höhe des Bruttobetrags, bewertet mit dem Nennwert (§ 6 Abs. 1 Nr. 5 EStG). Gewinnauswirkung: −${eur(n)} (GuV); beim BVV wird die Einlage abgezogen.`,
      { quelle: Q + " – Einlagen; Semesterklausuren (Zahlung vom privaten Konto)" });
  }),
  V("t2-pkw-entnahme-buchung", "bsr-entnahme-einlage", (r) => {
    const blp = r.betrag(30000, 60000, 100), monat = blp / 100, wert = monat * 12, u = Math.round(wert * 0.8 * 0.19);
    return buchung("t2-pkw-entnahme-buchung", "bsr-entnahme-einlage",
      `Ein Unternehmer nutzt seinen betrieblichen Pkw (Bruttolistenpreis ${eur(blp)}) das ganze Jahr auch privat. Erfassen Sie die Nutzungsentnahme nach der 1-%-Regelung zum 31.12. einschließlich Umsatzsteuer (pauschaler Abschlag von 20 % für nicht vorsteuerbelastete Kosten).`,
      satz([["privatentnahmen", wert + u]], [["privateKfzNutzung", wert], ["umsatzsteuer", u]]),
      `Nutzungsentnahme: 1 % × ${eur(blp)} × 12 = ${eur(wert)} (§ 6 Abs. 1 Nr. 4 S. 2 EStG). USt auf die unentgeltliche Wertabgabe (§ 3 Abs. 9a Nr. 1 UStG): ${eur(wert)} × 80 % × 19 % = ${eur(u)}. Ertrag ${eur(wert)} erhöht den Gewinn; die Entnahme selbst ist erfolgsneutral.`,
      { quelle: Q + " – Entnahmen" });
  }),
  V("t2-einlage-gebaeude", "bsr-entnahme-einlage", (r) => {
    const ak = r.betrag(200000, 600000, 10000), j = r.zahl(4, 9), bisher = ak * 2 / 100 * j, fortg = ak - bisher;
    const tw = Math.round(r.wahl([fortg + bisher / 4, ak * 1.3, fortg * 0.92]) / 1000000) * 1000000;
    const bmg = tw >= fortg ? Math.max(tw - bisher, fortg) : tw, afa = bmg * 3 / 100;
    return rechnen("t2-einlage-gebaeude", "bsr-entnahme-einlage",
      `Ein Unternehmer hat am 02.01.01 privat ein Gebäude (Bauantrag 2015) für ${eur(ak)} erworben und bis Ende ${String(j).padStart(2, "0")} an einen Gewerbetreibenden vermietet (AfA bisher 2 % jährlich, Einkünfte nach § 21 EStG). Ab dem 01.01.${String(j + 1).padStart(2, "0")} nutzt er es ausschließlich für seinen eigenen Betrieb. Der Teilwert beträgt an diesem Tag ${eur(tw)}.\n\nWie hoch ist die AfA für das Gebäude im Jahr ${String(j + 1).padStart(2, "0")} (in €)?`,
      afa,
      `Einlage (§ 4 Abs. 1 S. 8 EStG) mit dem Teilwert ${eur(tw)} (§ 6 Abs. 1 Nr. 5 S. 1 EStG; die Anschaffung liegt mehr als drei Jahre zurück). Buchung: Gebäude an Privateinlagen.\n` +
        `Fortgeführte Anschaffungskosten: ${eur(ak)} − AfA ${j} × 2 % (${eur(bisher)}) = ${eur(fortg)}.\n` +
        (tw >= fortg
          ? `AfA-Bemessungsgrundlage nach § 7 Abs. 1 S. 5 EStG (Einlage nach Nutzung zur Erzielung von Überschusseinkünften): Einlagewert − bisherige AfA, höchstens bis zu den fortgeführten AK: ${eur(tw)} − ${eur(bisher)} = ${eur(tw - bisher)} → ${eur(bmg)}.\n`
          : `Der Einlagewert liegt unter den fortgeführten Anschaffungskosten → AfA vom Einlagewert ${eur(tw)} (§ 7 Abs. 1 S. 5 letzter Halbsatz EStG).\n`) +
        `AfA ${String(j + 1).padStart(2, "0")}: 3 % (§ 7 Abs. 4 S. 1 Nr. 1 EStG – Betriebsvermögen, keine Wohnzwecke) × ${eur(bmg)} = ${eur(Math.round(afa))}.`,
      Q + " – Lösungshinweis Einlagen");
  }),
];


// ======================================================================= GoB, Betriebsvermögen und Bewertung
const gob = [
  A("t2-gob", "bsr-gob",
    "Erläutern Sie das Vorsichtsprinzip mit Realisations- und Imparitätsprinzip sowie das Stichtagsprinzip. Wie wirken die handelsrechtlichen GoB auf die Steuerbilanz?",
    "• Vorsichtsprinzip (§ 252 Abs. 1 Nr. 4 HGB): vorsichtig bewerten; alle vorhersehbaren Risiken und Verluste, die bis zum Abschlussstichtag entstanden sind, sind zu berücksichtigen – auch wenn sie erst bis zur Aufstellung bekannt werden.\n• Realisationsprinzip (§ 252 Abs. 1 Nr. 4 letzter Hs. HGB): Gewinne erst ausweisen, wenn sie realisiert sind – bei Lieferungen mit Erbringung der geschuldeten Leistung (Übergang der Verfügungsmacht); Rechnung und Fälligkeit sind unerheblich. Steuerlich auch durch Entnahme (§ 6 Abs. 1 Nr. 4 EStG).\n• Imparitätsprinzip: Unrealisierte Verluste müssen, unrealisierte Gewinne dürfen nicht berücksichtigt werden (Niederstwertprinzip bei Aktiva, Höchstwertprinzip bei Passiva).\n• Stichtagsprinzip (§ 242 Abs. 1, § 252 Abs. 1 Nr. 3, 4 HGB): Verhältnisse am Bilanzstichtag; Erkenntnisse bis zur Aufstellung sind zu berücksichtigen, wenn sie werterhellend sind (Ursache vor dem Stichtag), nicht wenn sie wertbegründend sind (Ereignis nach dem Stichtag).\n• Wirtschaftliche Betrachtungsweise: maßgebend ist die wirtschaftliche Verursachung; schwebende Geschäfte werden nicht bilanziert.\n• Maßgeblichkeit (§ 5 Abs. 1 S. 1 EStG): Das Betriebsvermögen ist nach den handelsrechtlichen GoB anzusetzen, soweit keine steuerlichen Bewertungsvorbehalte greifen (§ 5 Abs. 6 EStG); steuerliche Wahlrechte können abweichend ausgeübt werden.",
    ["HGB 252 1", "EStG 5 1"],
    M(["Gewinne dürfen erst ausgewiesen werden, wenn sie realisiert sind.", "Unrealisierte Verluste sind zu berücksichtigen, unrealisierte Gewinne nicht.", "Werterhellende Erkenntnisse bis zur Bilanzaufstellung sind zu berücksichtigen.", "Die handelsrechtlichen GoB gelten über § 5 Abs. 1 EStG auch für die Steuerbilanz."],
      ["Gewinne sind mit der Rechnungsstellung realisiert.", "Unrealisierte Gewinne und Verluste werden gleich behandelt.", "Ein Brand im Lager nach dem Bilanzstichtag ist bei der Bewertung zum Stichtag zu berücksichtigen.", "Steuerliche Wahlrechte müssen stets wie in der Handelsbilanz ausgeübt werden."],
      "Welche Aussagen zu den GoB sind richtig?"),
    { norm: ["HGB 252"], s: ["vorsicht", "realisation|realisiert", "imparit|unrealisierte verluste", "stichtag", "werterhellend|wertaufhellend", "massgeblich"] }),
  A("t2-betriebsvermoegen", "bsr-gob",
    "Wann gehört ein Wirtschaftsgut zum notwendigen Betriebsvermögen, wann kann es gewillkürtes Betriebsvermögen sein, wann ist es notwendiges Privatvermögen?",
    "• Notwendiges Betriebsvermögen (R 4.2 Abs. 1 S. 1, 4 EStR): Wirtschaftsgüter, die ausschließlich und unmittelbar eigenbetrieblich genutzt werden oder dazu bestimmt sind; bei gemischter Nutzung von mehr als 50 % betrieblich → in vollem Umfang Betriebsvermögen.\n• Gewillkürtes Betriebsvermögen (R 4.2 Abs. 1 S. 3, 6 EStR): betriebliche Nutzung von mindestens 10 % bis 50 % – Zuordnung zum Betriebsvermögen in vollem Umfang möglich, wenn das Wirtschaftsgut objektiv geeignet und bestimmt ist, den Betrieb zu fördern; die Zuordnung muss unmissverständlich dokumentiert werden (z. B. Aufnahme in die Buchführung). Keine Einlage von absehbar verlustbringenden Wirtschaftsgütern.\n• Notwendiges Privatvermögen (R 4.2 Abs. 1 S. 5 EStR): private Nutzung von mehr als 90 % (betriebliche unter 10 %).\n• Folgen: Nur Betriebsvermögen wird bilanziert und abgeschrieben; die private Nutzung von Betriebsvermögen ist eine Nutzungsentnahme, die betriebliche Nutzung von Privatvermögen eine Nutzungseinlage. Die 1-%-Regelung für Kfz gilt nur bei notwendigem Betriebsvermögen (> 50 %).",
    ["EStG 4 1"],
    M(["Bei einer betrieblichen Nutzung von mehr als 50 % liegt notwendiges Betriebsvermögen vor.", "Bei einer betrieblichen Nutzung von 10 % bis 50 % ist gewillkürtes Betriebsvermögen möglich.", "Bei einer privaten Nutzung von mehr als 90 % liegt notwendiges Privatvermögen vor.", "Die Zuordnung zum gewillkürten Betriebsvermögen muss unmissverständlich dokumentiert werden."],
      ["Bei einer betrieblichen Nutzung von 30 % liegt stets notwendiges Betriebsvermögen vor.", "Bei einer betrieblichen Nutzung von 5 % ist gewillkürtes Betriebsvermögen möglich.", "Gemischt genutzte Wirtschaftsgüter werden immer nach dem Nutzungsanteil aufgeteilt bilanziert.", "Die 1-%-Regelung gilt auch für Fahrzeuge des gewillkürten Betriebsvermögens."],
      "Welche Aussagen zur Zuordnung zum Betriebsvermögen sind richtig?"),
    { norm: [], s: ["notwendig betriebsverm", "gewillkuert", "privatverm", "50", "10", "90"] }),
  F("t2-bv-fall", "bsr-gob", "Wie ist das (bewegliche) Wirtschaftsgut zuzuordnen?",
    ["Notwendiges Betriebsvermögen", "Gewillkürtes Betriebsvermögen möglich (Wahlrecht)", "Notwendiges Privatvermögen"], [
      { text: "Ein Händler nutzt einen Lieferwagen zu 95 % betrieblich und zu 5 % privat.", richtig: 0, erkl: "Betriebliche Nutzung über 50 % → notwendiges Betriebsvermögen in vollem Umfang (R 4.2 Abs. 1 S. 4 EStR); die private Nutzung ist eine Nutzungsentnahme.", normen: ["EStG 4 1"] },
      { text: "Ein Unternehmer nutzt einen Pkw laut Fahrtenbuch zu 30 % betrieblich und zu 70 % privat.", richtig: 1, erkl: "Betriebliche Nutzung zwischen 10 % und 50 % → gewillkürtes Betriebsvermögen möglich (R 4.2 Abs. 1 S. 6 EStR); die 1-%-Regelung gilt dann nicht, die private Nutzung wird mit den anteiligen Kosten bewertet.", normen: ["EStG 4 1"] },
      { text: "Ein Unternehmer nutzt sein privates Motorrad gelegentlich (5 %) für Botenfahrten.", richtig: 2, erkl: "Betriebliche Nutzung unter 10 % → notwendiges Privatvermögen (R 4.2 Abs. 1 S. 5 EStR); die betrieblichen Fahrten sind eine Nutzungseinlage.", normen: ["EStG 4 1"] },
      { text: "Ein Steuerberater kauft einen Laptop, den er ausschließlich in der Kanzlei nutzt.", richtig: 0, erkl: "Ausschließlich und unmittelbar eigenbetrieblich genutzt → notwendiges Betriebsvermögen (R 4.2 Abs. 1 S. 1 EStR).", normen: ["EStG 4 1"] },
      { text: "Ein Händler nutzt einen Pkw zu 60 % betrieblich und zu 40 % privat.", richtig: 0, erkl: "Mehr als 50 % betrieblich → notwendiges Betriebsvermögen; private Nutzung nach der 1-%-Regelung oder per Fahrtenbuch.", normen: ["EStG 4 1", "EStG 6 1"] },
    ]),
  F("t2-wertaufhellung", "bsr-gob", "Die Bilanz zum 31.12.01 wird am 15.03.02 aufgestellt. Ist die Information bei der Bewertung zum 31.12.01 zu berücksichtigen?",
    ["Ja – werterhellend (Ursache vor dem Stichtag)", "Nein – wertbegründend (Ereignis nach dem Stichtag)"], [
      { text: "Im Februar 02 erfährt der Unternehmer, dass ein Kunde bereits seit November 01 zahlungsunfähig ist.", richtig: 0, erkl: "Die Zahlungsunfähigkeit bestand schon am Stichtag; die spätere Kenntnis erhellt nur den Wert zum Stichtag → Teilwertabschreibung auf die Forderung (§ 252 Abs. 1 Nr. 4 HGB).", normen: ["HGB 252 1"] },
      { text: "Am 20.01.02 zerstört ein Brand einen Teil des Warenlagers.", richtig: 1, erkl: "Das schädigende Ereignis liegt nach dem Stichtag → wertbegründend; keine Berücksichtigung zum 31.12.01.", normen: ["HGB 252 1"] },
      { text: "Ein Kunde, dessen Forderung am Stichtag zu 80 % ausfallgefährdet war, stellt im Februar 02 unerwartet eine Sicherheit.", richtig: 1, erkl: "Die Sicherheit wird erst nach dem Stichtag gestellt → wertbegründend; zum 31.12.01 bleibt die Teilwertabschreibung zulässig.", normen: ["HGB 252 1"] },
      { text: "Börsennotierte Aktien fallen im Januar 02 deutlich unter den Stichtagskurs.", richtig: 1, erkl: "Kursänderungen nach dem Stichtag sind wertbegründend (BMF 02.09.2016) und bleiben unberücksichtigt.", normen: ["EStG 6 1"] },
      { text: "Im Januar 02 stellt sich heraus, dass eine am 30.12.01 gelieferte Maschine schon bei Lieferung einen versteckten Mangel hatte.", richtig: 0, erkl: "Der Mangel bestand bereits am Stichtag → werterhellend; bei der Bewertung zum 31.12.01 zu berücksichtigen.", normen: ["HGB 252 1"] },
    ]),
  F("t2-geschenke", "bsr-gob", "Sind die Aufwendungen für das Geschenk als Betriebsausgabe abziehbar (§ 4 Abs. 5 S. 1 Nr. 1 EStG)?",
    ["Ja – Freigrenze nicht überschritten bzw. nicht anwendbar", "Nein – nicht abziehbare Betriebsausgabe"], [
      { text: "Ein Händler mit vollem Vorsteuerabzug schenkt einem Geschäftsfreund ein Präsent für 59,50 € einschließlich 19 % USt (einziges Geschenk an ihn im Jahr).", richtig: 0, erkl: "Bei Vorsteuerabzug zählt der Nettowert: 50 € – die Freigrenze von 50 € wird nicht überschritten (R 9b Abs. 2 S. 3 EStR).", normen: ["EStG 4 5"] },
      { text: "Ein Arzt (umsatzsteuerfreie Umsätze, kein Vorsteuerabzug) schenkt einem Geschäftsfreund ein Präsent für 59,50 € einschließlich USt.", richtig: 1, erkl: "Ohne Vorsteuerabzug zählt der Bruttowert 59,50 € → Freigrenze von 50 € überschritten → in voller Höhe nicht abziehbar.", normen: ["EStG 4 5"] },
      { text: "Ein Unternehmer schenkt einem Kunden einen Kalender (35 € netto) und im Herbst zusätzlich einen Bildband (25 € netto).", richtig: 1, erkl: "Die Freigrenze gilt je Empfänger und Jahr: 35 € + 25 € = 60 € > 50 € → beide Geschenke nicht abziehbar; die Vorsteuer ist nicht abziehbar (§ 15 Abs. 1a UStG).", normen: ["EStG 4 5", "UStG 15 1"] },
      { text: "Ein Unternehmer schenkt seiner Angestellten zum Dienstjubiläum einen Blumenstrauß für 70 €.", richtig: 0, erkl: "§ 4 Abs. 5 S. 1 Nr. 1 EStG gilt nur für Geschenke an Personen, die nicht Arbeitnehmer des Steuerpflichtigen sind → Betriebsausgabe (lohnsteuerlich ggf. Aufmerksamkeit).", normen: ["EStG 4 5"] },
    ]),
  F("t2-zurechnung-wer", "bsr-gob", "Wem ist das Wirtschaftsgut steuerlich zuzurechnen (wer bilanziert es)?", null, [
    { text: "Ein Unternehmer übereignet seinen betrieblichen Lkw zur Sicherung eines Darlehens an seine Bank; er nutzt ihn weiter.", optionen: ["Der Unternehmer (Sicherungsgeber)", "Die Bank (Sicherungsnehmer)"], richtig: 0,
      erkl: "Sicherungseigentum ist dem Sicherungsgeber zuzurechnen (§ 39 Abs. 2 Nr. 1 S. 2 AO) – er bleibt wirtschaftlicher Eigentümer.", normen: ["AO 39 2"] },
    { text: "Ein Treuhänder hält im eigenen Namen, aber für Rechnung eines Unternehmers Aktien.", optionen: ["Der Treuhänder", "Der Unternehmer (Treugeber)"], richtig: 1,
      erkl: "Bei Treuhandverhältnissen ist das Wirtschaftsgut dem Treugeber zuzurechnen (§ 39 Abs. 2 Nr. 1 S. 2 AO).", normen: ["AO 39 2"] },
    { text: "Eine Händlerin erhält Ware unter Eigentumsvorbehalt; bezahlt ist noch nichts.", optionen: ["Die Händlerin (Käuferin)", "Der Lieferant (Vorbehaltsverkäufer)"], richtig: 0,
      erkl: "Die Käuferin ist ab Lieferung wirtschaftliche Eigentümerin (§ 39 Abs. 2 Nr. 1 AO); rechtliches Eigentum erst mit Zahlung (§ 449 BGB).", normen: ["AO 39 2", "BGB 449 1"] },
    { text: "Für ein gekauftes Betriebsgrundstück sind Nutzen und Lasten bereits übergegangen; die Eintragung im Grundbuch steht noch aus.", optionen: ["Der Käufer", "Der Verkäufer (noch eingetragener Eigentümer)"], richtig: 0,
      erkl: "Besitz in Erwartung des Eigentumserwerbs: Mit Übergang von Nutzen und Lasten ist der Käufer wirtschaftlicher Eigentümer (§ 39 Abs. 2 Nr. 1 AO).", normen: ["AO 39 2"] },
  ]),
];

// ======================================================================= Klausurfall
const fall = (() => {
  const ak = 543000, gub = 162900, geb = 380100, afaG = Math.round(geb * 0.03 * 9 / 12 * 100) / 100, zins = 9000, gbk = 1000;
  const f = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  return A("t2-fall-grundstueck", "bsr-grundstueck",
    "Kaufmann K (Bilanzierung nach § 5 EStG, voller Vorsteuerabzug, Wirtschaftsjahr = Kalenderjahr) erwirbt mit notariellem Vertrag vom 10.03.2026 ein bebautes Grundstück, das er ausschließlich für seinen Großhandel nutzt (Bauantrag 1995). Nutzen und Lasten gehen am 01.04.2026 über, die Eintragung im Grundbuch erfolgt am 15.06.2026. Der Kaufpreis von 500.000 € (umsatzsteuerfrei) entfällt zu 30 % auf den Grund und Boden und wird am 01.04.2026 vom betrieblichen Bankkonto überwiesen.\nWeitere Aufwendungen: Makler 15.000 € zzgl. 2.850 € USt (von K privat bezahlt), Grunderwerbsteuer 25.000 €, Notar für den Kaufvertrag 2.000 € zzgl. 380 € USt, Notar für die Grundschuld 600 € zzgl. 114 € USt, Grundbuchamt für die Eigentumsumschreibung 1.000 € und für die Grundschuld 400 € – alles außer dem Makler vom betrieblichen Bankkonto.\nZur Finanzierung erhält K am 01.04.2026 ein Darlehen über 300.000 € (4 % p. a., Zinsen jährlich nachschüssig am 31.03.). Bisher ist nichts gebucht.\n\nAufgabe: Würdigen Sie den Sachverhalt für 2026 (Anschaffungskosten, Bilanzansätze, AfA, Darlehen), bilden Sie die Buchungssätze und geben Sie die Gewinnauswirkung an.",
    `• Zugang: Mit Übergang von Nutzen und Lasten am 01.04.2026 wird K wirtschaftlicher Eigentümer (§ 39 Abs. 2 Nr. 1 AO, § 246 Abs. 1 S. 2 HGB); Kaufvertrag und Grundbuch sind unerheblich. Grund und Boden und Gebäude sind getrennte Wirtschaftsgüter des Anlagevermögens (§ 247 Abs. 2 HGB).\n• Anschaffungskosten (§ 255 Abs. 1 HGB, § 6 Abs. 1 Nr. 1, 2 EStG): Kaufpreis 500.000 € + Makler 15.000 € + Grunderwerbsteuer 25.000 € + Notar Kaufvertrag 2.000 € + Eigentumsumschreibung 1.000 € = ${f(ak)}. Vorsteuer nicht (§ 9b Abs. 1 EStG).\n• Aufteilung 30 : 70: Grund und Boden ${f(gub)}, Gebäude ${f(geb)}.\n• Grundschuldkosten (Notar 600 €, Grundbuch 400 €) = Finanzierungskosten → Betriebsausgaben ${f(gbk)}.\n• Makler vom Privatkonto → Einlage 17.850 € (§ 4 Abs. 1 S. 8, § 6 Abs. 1 Nr. 5 EStG).\n• Gebäude-AfA: Wirtschaftsgebäude, Bauantrag nach dem 31.03.1985 → 3 % (§ 7 Abs. 4 S. 1 Nr. 1 EStG), zeitanteilig April – Dezember: ${f(geb)} × 3 % × 9/12 = ${f(afaG)}. Grund und Boden: keine AfA.\n• Bilanzansätze 31.12.2026: Grund und Boden ${f(gub)} (§ 6 Abs. 1 Nr. 2 EStG); Gebäude ${f(geb - afaG)} (§ 6 Abs. 1 Nr. 1 EStG).\n• Darlehen: Erfüllungsbetrag 300.000 € (§ 253 Abs. 1 S. 2 HGB); Zinsen April – Dezember 300.000 € × 4 % × 9/12 = ${f(zins)} → sonstige Verbindlichkeit (§ 252 Abs. 1 Nr. 5 HGB).\nBuchungssätze:\n1. Grund und Boden 150.000 € / Gebäude 350.000 € an Bank 500.000 €\n2. Grund und Boden 4.500 € / Gebäude 10.500 € / Vorsteuer 2.850 € an Privateinlagen 17.850 €\n3. Grund und Boden 7.500 € / Gebäude 17.500 € an Bank 25.000 €\n4. Grund und Boden 600 € / Gebäude 1.400 € / Rechts- und Beratungskosten 600 € / Vorsteuer 494 € an Bank 3.094 €\n5. Grund und Boden 300 € / Gebäude 700 € / Rechts- und Beratungskosten 400 € an Bank 1.400 €\n6. Bank an Darlehensverbindlichkeiten 300.000 €\n7. AfA an Gebäude ${f(afaG)}\n8. Zinsaufwendungen an Sonstige Verbindlichkeiten ${f(zins)}\nGewinnauswirkung insgesamt: −${f(gbk + afaG + zins)} (Finanzierungskosten, AfA, Zinsen); die Einlage ist erfolgsneutral.`,
    ["AO 39 2", "HGB 255 1", "EStG 7 4", "HGB 252 1"],
    M(["Die Grundschuldkosten sind sofort abziehbare Betriebsausgaben.", `Die Anschaffungskosten des Gebäudes betragen ${f(geb)}.`, "Die Gebäude-AfA beträgt 3 % für neun Monate.", "Die Zinsen für April bis Dezember sind als sonstige Verbindlichkeit zu passivieren."],
      ["Das Grundstück ist erst ab der Eintragung im Grundbuch zu bilanzieren.", "Die Maklerkosten sind als Betriebsausgaben sofort abziehbar.", "Die Gebäude-AfA beträgt 2 % für das ganze Jahr.", "Die Zinsen sind erst 2027 bei Zahlung zu erfassen."],
      "Klausurfall Grundstückserwerb (2026): Welche Aussagen treffen zu?"),
    { norm: ["EStG 7|HGB 255"], s: ["nutzen lasten", "543.000|543000", "380.100|380100", "grundschuld", "1985|wirtschaftsgebaeude", "8.552|8552", "9.000|9000", "einlage"] },
    { fall: true });
})();

export const BSR_TEIL2 = [...gob, ...zurechnung, ...ak, ...grundstueck, fall, ...afa, ...teilwert, ...abgrenzung, ...privat];
export const MC_BSR_TEIL2 = Object.fromEntries(BSR_TEIL2.filter((v) => v.mc).map((v) => [v.id, v.mc]));
export const SW_BSR_TEIL2 = Object.fromEntries(BSR_TEIL2.filter((v) => v.sw).map((v) => [v.id, v.sw]));
