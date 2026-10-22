// Umsatzsteuer (GS I) – Aufgaben nach Skript, Klausurtechnik und den Lösungshinweisen der Semesterklausuren,
// Rechtsstand 2026. Eigene Sachverhalte im Klausurstil; Rechenaufgaben würfeln bei jedem Aufruf neue Zahlen.
// Frage-Antwort-Aufgaben tragen ihre Multiple-Choice-Fassung (mc) und die Stichworte für die automatische Prüfung (sw).
import { auswahl, zahl } from "../kern.js";
import * as G from "../geld.js";

const eur = G.euro;
const MONAT = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const M = (r, f, frage) => ({ r, f, frage });
const A = (id, thema, text, antwort, normen, mc, sw, { fall = false } = {}) => ({
  id, thema, mc, sw, erzeugen: () => ({ id, thema, typ: "offen", fall, text, antwort, normen, erklaerung: "", quelle: null }),
});
/** Rechenaufgabe: erzeugen(r) liefert {text, cent, erklaerung, normen}; Rundungsdifferenzen bis 1 Cent zählen als richtig. */
const R = (id, thema, erzeugen) => ({
  id, thema, kategorie: "rechnen",
  erzeugen: (r) => { const a = erzeugen(r); return { ...zahl(id, thema, a.text, Math.round(a.cent), a.erklaerung, { toleranz: 1 }), normen: a.normen || [] }; },
});
/** Einordnungsfall: zieht einen Fall {text, richtig, erkl, normen, optionen?}. */
const F = (id, thema, frage, optionen, faelle) => ({
  id, thema, kategorie: "fall",
  erzeugen: (r) => {
    const f = r.wahl(faelle);
    return { ...auswahl(id, thema, `${f.text}\n\n${f.frage || frage}`, f.optionen || optionen, [f.richtig], f.erkl, r), normen: f.normen || [] };
  },
});
/** Umsatzsteuer aus einem Bruttobetrag (Cent), kaufmännisch gerundet. */
const ustAus = (brutto, satz) => Math.round(brutto * satz / (100 + satz));
const tag = (d, m) => `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.`;

// ======================================================================= Grundlagen und Unternehmer (§ 2 UStG)
const grundlagen = [
  A("ust-system", "ust-grundlagen",
    "Erläutern Sie das System der Umsatzsteuer. Wer trägt die Steuer wirtschaftlich?",
    "• Allphasen-Netto-Umsatzsteuer mit Vorsteuerabzug: Besteuert wird jede Umsatzstufe, der Unternehmer zieht die ihm in Rechnung gestellte Steuer als Vorsteuer ab (§ 15 UStG). Belastet wird so nur der Mehrwert der jeweiligen Stufe („Mehrwertsteuer“).\n• Auf den Unternehmerstufen wirkt die Steuer kostenneutral; wirtschaftlich trägt sie der Endverbraucher.\n• Verkehrsteuer und indirekte Steuer: Steuerschuldner ist der leistende Unternehmer (§ 13a Abs. 1 Nr. 1 UStG), Steuerträger der Verbraucher.\n• Gemeinschaftsteuer (Art. 106 Abs. 3 GG); harmonisiert durch die Mehrwertsteuer-Systemrichtlinie.\n• Steuerbare Umsätze: § 1 Abs. 1 UStG; Haupttatbestand ist die Lieferung oder sonstige Leistung eines Unternehmers im Inland gegen Entgelt im Rahmen seines Unternehmens (§ 1 Abs. 1 Nr. 1 UStG).\n• Verfahren: monatliche bzw. vierteljährliche Voranmeldungen, Jahreserklärung; Besteuerungszeitraum ist das Kalenderjahr.",
    ["UStG 1 1", "UStG 15 1", "UStG 13a 1"],
    M(["Die Umsatzsteuer ist eine Allphasen-Netto-Umsatzsteuer mit Vorsteuerabzug.", "Wirtschaftlich belastet ist der Endverbraucher.", "Steuerschuldner ist regelmäßig der leistende Unternehmer.", "Auf den Unternehmerstufen wirkt die Umsatzsteuer durch den Vorsteuerabzug kostenneutral."],
      ["Die Umsatzsteuer ist eine direkte Steuer, weil Steuerschuldner und Steuerträger identisch sind.", "Jede Handelsstufe trägt die Umsatzsteuer endgültig selbst.", "Steuerschuldner ist regelmäßig der Endverbraucher.", "Das Aufkommen steht allein den Gemeinden zu."],
      "Welche Aussagen zum System der Umsatzsteuer sind richtig?"),
    { norm: ["UStG 15|UStG 1"], s: ["vorsteuer", "allphasen|jede stufe|mehrwert", "endverbraucher|verbraucher", "kostenneutral|neutral", "steuerschuldner|13a"] }),
  A("ust-unternehmer", "ust-grundlagen",
    "Wer ist Unternehmer im Sinne des UStG? Erläutern Sie die Tatbestandsmerkmale.",
    "§ 2 Abs. 1 UStG: Unternehmer ist, wer eine gewerbliche oder berufliche Tätigkeit selbständig ausübt.\n• Unternehmerfähig ist jedes Gebilde, das nach außen auftritt – natürliche und juristische Personen, Personenzusammenschlüsse (z. B. Ehegatten als Vermietungsgemeinschaft); auf die Rechtsfähigkeit kommt es nicht an.\n• Gewerblich oder beruflich ist jede nachhaltige Tätigkeit zur Erzielung von Einnahmen (§ 2 Abs. 1 S. 3 UStG):\n  – nachhaltig: auf Wiederholung angelegt (Wiederholungsabsicht genügt, z. B. zweimal im Jahr ein Kurs),\n  – Einnahmeerzielungsabsicht: Leistungen gegen Entgelt; Gewinnabsicht ist nicht erforderlich.\n• Selbständig: auf eigene Rechnung und eigene Verantwortung; nicht selbständig sind Arbeitnehmer (§ 2 Abs. 2 Nr. 1 UStG) – ein leitender Angestellter mit Vollmachten handelt für den Unternehmer.\n• Unternehmenseinheit: Das Unternehmen umfasst die gesamte gewerbliche oder berufliche Tätigkeit (§ 2 Abs. 1 S. 2 UStG) – ein Unternehmer hat nur ein Unternehmen, auch mit Tätigkeiten im Ausland. Leistungen zwischen den Betrieben sind nicht steuerbare Innenumsätze.",
    ["UStG 2 1"],
    M(["Gewinnerzielungsabsicht ist für die Unternehmereigenschaft nicht erforderlich.", "Nachhaltigkeit setzt eine Wiederholungsabsicht voraus.", "Ein Unternehmer hat nur ein Unternehmen.", "Arbeitnehmer sind mangels Selbständigkeit keine Unternehmer."],
      ["Unternehmer kann nur sein, wer im Handelsregister eingetragen ist.", "Ein Arzt mit Praxis und Kiosk hat zwei getrennte Unternehmen.", "Ein leitender Angestellter mit Prokura ist Unternehmer für den Betrieb, den er leitet.", "Eine Vermietung im Ausland gehört nicht zum Unternehmen."],
      "Welche Aussagen zur Unternehmereigenschaft sind richtig?"),
    { norm: ["UStG 2"], s: ["selbstaendig", "nachhaltig|wiederhol", "einnahme", "gewinn", "unternehmen umfasst|gesamte|ein unternehmen|einheit"] }),
  A("ust-rahmen", "ust-grundlagen",
    "Wann wird ein Umsatz im Rahmen des Unternehmens ausgeführt? Grenzen Sie Grund-, Hilfs- und Nebengeschäfte ab.",
    "• Im Rahmen des Unternehmens (§ 1 Abs. 1 Nr. 1, § 2 Abs. 1 S. 2 UStG) liegen alle Umsätze, die der unternehmerischen Tätigkeit zuzurechnen sind (Abschn. 2.7 UStAE):\n  – Grundgeschäfte: die eigentliche, den Unternehmenszweck bildende Tätigkeit (z. B. Warenverkauf im Laden, Heilbehandlung des Arztes, Vermietung),\n  – Hilfsgeschäfte: Umsätze, die die Haupttätigkeit mit sich bringt, z. B. der Verkauf von Anlagevermögen (gebrauchtes Untersuchungsgerät, alte Registrierkasse) – auch wenn sie nicht nachhaltig sind,\n  – Nebengeschäfte: Tätigkeiten, die mit dem Grundgeschäft zusammenhängen und als dessen Ergänzung erscheinen.\n• Nicht im Rahmen des Unternehmens: Umsätze aus dem Privatbereich (Verkauf des privaten Pkw).\n• Innenumsätze zwischen Unternehmensteilen (z. B. „Miete“ des eigenen Ladenlokals im eigenen Gebäude) sind mangels Leistungsaustausch nicht steuerbar (Abschn. 2.7 Abs. 1 S. 3 UStAE).",
    ["UStG 2 1", "UStG 1 1"],
    M(["Der Verkauf eines gebrauchten Geräts des Anlagevermögens ist ein Hilfsgeschäft.", "Hilfsgeschäfte sind auch dann steuerbar, wenn sie nicht nachhaltig ausgeführt werden.", "Zahlungen zwischen zwei Betrieben desselben Unternehmers sind nicht steuerbare Innenumsätze.", "Der Verkauf des privat genutzten Pkw liegt nicht im Rahmen des Unternehmens."],
      ["Hilfsgeschäfte sind nicht steuerbar, weil sie nicht zum Unternehmenszweck gehören.", "Die Miete, die ein Unternehmer für den eigenen Laden auf sein Vermietungskonto überweist, ist steuerbar.", "Nur Grundgeschäfte werden im Rahmen des Unternehmens ausgeführt.", "Ein Hilfsgeschäft liegt nur vor, wenn es mindestens zweimal jährlich vorkommt."],
      "Welche Aussagen zum Rahmen des Unternehmens sind richtig?"),
    { norm: ["UStG 2|UStG 1"], s: ["grundgeschaeft", "hilfsgeschaeft", "nebengeschaeft", "anlagevermoegen|geraet", "innenumsatz|nicht steuerbar"] }),
  F("ust-unternehmer-fall", "ust-grundlagen", "Ist die Person mit dieser Tätigkeit Unternehmer im Sinne des § 2 Abs. 1 UStG?",
    ["Ja – Unternehmer", "Nein – nicht selbständig", "Nein – nicht nachhaltig bzw. ohne Einnahmeerzielungsabsicht"], [
      { text: "Eine Rentnerin verkauft einmalig einen selbst gestrickten Pullover an eine Boutique, weil sie knapp bei Kasse ist.", richtig: 2, erkl: "Ein einmaliger Verkauf ohne Wiederholungsabsicht ist nicht nachhaltig (§ 2 Abs. 1 S. 3 UStG) → kein Unternehmer; die Boutique hat daraus keinen Vorsteuerabzug.", normen: ["UStG 2 1"] },
      { text: "Eine Hausärztin vermietet regelmäßig eine Ferienwohnung an der Ostsee an wechselnde Gäste.", richtig: 0, erkl: "Die Vermietung ist auf Dauer angelegt und auf Einnahmen gerichtet → nachhaltig; sie gehört zum einheitlichen Unternehmen der Ärztin (§ 2 Abs. 1 S. 2 UStG).", normen: ["UStG 2 1"] },
      { text: "Der leitende Angestellte eines Kiosks trifft mit Vollmacht der Inhaberin alle Entscheidungen des Tagesgeschäfts.", richtig: 1, erkl: "Er handelt nicht auf eigene Rechnung, sondern als Arbeitnehmer (§ 2 Abs. 2 Nr. 1 UStG); die Umsätze sind der Inhaberin zuzurechnen.", normen: ["UStG 2 1"] },
      { text: "Eine Einzelhändlerin gibt zweimal im Jahr in ihrem Laden Strickkurse gegen Teilnahmegebühr.", richtig: 0, erkl: "Zweimal jährlich mit Wiederholungsabsicht ist nachhaltig; die Kurse gehören zu ihrem einheitlichen Unternehmen (§ 2 Abs. 1 S. 2, 3 UStG).", normen: ["UStG 2 1"] },
      { text: "Ein Ehepaar vermietet gemeinsam Wohnungen und Gewerberäume in seinem Mehrfamilienhaus.", richtig: 0, erkl: "Unternehmerfähig ist auch ein Personenzusammenschluss; er vermietet nachhaltig gegen Entgelt → Unternehmer.", normen: ["UStG 2 1"] },
      { text: "Ein angestellter Steuerfachangestellter bearbeitet in seiner Arbeitszeit Mandate seines Arbeitgebers.", richtig: 1, erkl: "Weisungsgebunden und eingegliedert → nicht selbständig (§ 2 Abs. 2 Nr. 1 UStG).", normen: ["UStG 2 1"] },
      { text: "Ein Student verkauft einmalig sein privates Fahrrad über ein Kleinanzeigenportal.", richtig: 2, erkl: "Einmaliger Verkauf aus dem Privatvermögen ohne Wiederholungsabsicht → nicht nachhaltig, kein Unternehmer.", normen: ["UStG 2 1"] },
    ]),
  F("ust-geschaeftsart", "ust-grundlagen", "Wie ist der Umsatz einzuordnen?",
    ["Grundgeschäft", "Hilfsgeschäft", "Nicht im Rahmen des Unternehmens", "Nicht steuerbarer Innenumsatz"], [
      { text: "Eine Hausärztin verkauft ihr nicht mehr benötigtes Untersuchungsgerät an einen Kollegen.", richtig: 1, erkl: "Verkauf von Anlagevermögen → Hilfsgeschäft im Rahmen des Unternehmens (Abschn. 2.7 Abs. 2 UStAE).", normen: ["UStG 2 1"] },
      { text: "Ein Kioskbetreiber verkauft eine Tageszeitung an einen Kunden.", richtig: 0, erkl: "Warenverkauf ist die eigentliche Tätigkeit → Grundgeschäft.", normen: ["UStG 2 1"] },
      { text: "Ein Tischlermeister verkauft seinen ausschließlich privat genutzten Pkw.", richtig: 2, erkl: "Der Pkw gehört nicht zum Unternehmen → Verkauf außerhalb des Unternehmens, nicht steuerbar.", normen: ["UStG 1 1"] },
      { text: "Eine Einzelhändlerin, der das Geschäftsgebäude gehört, überweist monatlich „Miete“ für ihr Ladenlokal von ihrem Geschäftskonto auf ihr Vermietungskonto.", richtig: 3, erkl: "Laden und Vermietung gehören zu einem Unternehmen; zwischen zwei Unternehmensteilen gibt es keinen Leistungsaustausch (Abschn. 2.7 Abs. 1 S. 3 UStAE).", normen: ["UStG 2 1"] },
      { text: "Ein Getränkehändler verkauft seinen alten Lieferwagen an einen Gebrauchtwagenhändler.", richtig: 1, erkl: "Veräußerung von Anlagevermögen → Hilfsgeschäft, steuerbar und steuerpflichtig (keine Befreiung).", normen: ["UStG 2 1"] },
      { text: "Eine Physiotherapeutin behandelt einen Privatpatienten.", richtig: 0, erkl: "Heilbehandlung ist die eigentliche berufliche Tätigkeit → Grundgeschäft (steuerfrei nach § 4 Nr. 14 a UStG).", normen: ["UStG 2 1", "UStG 4"] },
    ]),
];

// ======================================================================= Lieferung und sonstige Leistung, Einheitlichkeit
const leistung = [
  A("ust-lieferung", "ust-leistung",
    "Grenzen Sie Lieferung und sonstige Leistung voneinander ab. Wann ist die Verfügungsmacht verschafft?",
    "• Lieferung (§ 3 Abs. 1 UStG): Der Unternehmer (oder ein Dritter in seinem Auftrag) verschafft dem Abnehmer die Verfügungsmacht an einem Gegenstand – der Abnehmer kann wirtschaftlich wie ein Eigentümer darüber verfügen. Gegenstände sind körperliche Sachen, auch Sachgesamtheiten, Strom und Wärme.\n• Ein Eigentumsvorbehalt hindert die Lieferung nicht: Mit Übergabe hat der Käufer die Verfügungsmacht (Abschn. 3.1 Abs. 3 UStAE).\n• Sonstige Leistung (§ 3 Abs. 9 UStG): alle Leistungen, die keine Lieferungen sind – Tun, Dulden oder Unterlassen (z. B. Vermietung, Heilbehandlung, Beratung, Unterricht).\n• Abgrenzung bei gemischten Leistungen nach dem Wesen des Umsatzes aus Sicht des Durchschnittsverbrauchers.\n• Keine Leistung ist die bloße Hingabe von Geld (Zahlung des Kaufpreises, Versicherungsleistung).",
    ["UStG 3 1", "UStG 3 9"],
    M(["Eine Lieferung setzt die Verschaffung der Verfügungsmacht an einem Gegenstand voraus.", "Ein Eigentumsvorbehalt steht der Lieferung nicht entgegen.", "Die Vermietung eines Grundstücks ist eine sonstige Leistung.", "Die Zahlung einer Versicherung nach einem Brandschaden ist keine Leistung im umsatzsteuerlichen Sinne."],
      ["Eine Lieferung liegt erst vor, wenn das zivilrechtliche Eigentum übergegangen ist.", "Strom kann nicht geliefert werden, weil er kein körperlicher Gegenstand ist.", "Eine sonstige Leistung kann nicht in einem Unterlassen bestehen.", "Die Heilbehandlung durch einen Arzt ist eine Lieferung."],
      "Welche Aussagen zur Abgrenzung von Lieferung und sonstiger Leistung sind richtig?"),
    { norm: ["UStG 3"], s: ["verfuegungsmacht", "eigentumsvorbehalt", "sonstige leistung", "dulden|unterlassen|tun", "gegenstand"] }),
  A("ust-einheitlich", "ust-leistung",
    "Wann liegt eine einheitliche Leistung vor? Was gilt für Nebenleistungen?",
    "• Grundsatz: Jeder Umsatz ist für sich zu beurteilen. Beim Verkauf mehrerer Waren zu einem Gesamtpreis (z. B. Präsentkorb) liegen mehrere Lieferungen vor; der Steuersatz ist für jede einzeln zu bestimmen und das Entgelt aufzuteilen.\n• Einheitliche Leistung: Ein wirtschaftlich einheitlicher Vorgang darf nicht künstlich aufgespalten werden (Abschn. 3.10 UStAE).\n• Unselbständige Nebenleistung (Abschn. 3.10 Abs. 5 UStAE): Sie ist im Vergleich zur Hauptleistung nebensächlich, hängt eng mit ihr zusammen und kommt üblicherweise mit ihr vor; sie ist für den Empfänger kein eigener Zweck, sondern Mittel, die Hauptleistung unter optimalen Bedingungen in Anspruch zu nehmen.\n• Folge: Die Nebenleistung teilt das Schicksal der Hauptleistung (Ort, Steuerbefreiung, Steuersatz); ihr Entgelt gehört zur Bemessungsgrundlage der Hauptleistung (§ 10 Abs. 1 UStG).\n• Beispiele: Versandkosten beim Warenverkauf, Betriebs- und Heizkosten bei der Miete, Stellplatz beim Mietvertrag über Praxisräume, Wollknäuel im Strickkurs, Medikament während der Heilbehandlung.",
    ["UStG 3 1", "UStG 3 9", "UStG 10 1"],
    M(["Eine unselbständige Nebenleistung teilt das umsatzsteuerliche Schicksal der Hauptleistung.", "Mitberechnete Versandkosten gehören zum Entgelt für die Warenlieferung.", "Betriebskosten, die der Mieter neben der Miete zahlt, teilen die Steuerfreiheit der Vermietung.", "Werden mehrere Waren zu einem Gesamtpreis verkauft, ist der Steuersatz für jede Ware gesondert zu bestimmen."],
      ["Eine Nebenleistung unterliegt stets dem Regelsteuersatz.", "Versandkosten sind ein eigenständiger, nicht steuerbarer Umsatz.", "Ein Präsentkorb ist immer eine einheitliche Lieferung zum Regelsteuersatz.", "Die Wolle in einem Strickkurs ist stets eine eigene Lieferung zum ermäßigten Satz."],
      "Welche Aussagen zur Einheitlichkeit der Leistung sind richtig?"),
    { norm: ["UStG 3|UStG 10"], s: ["nebenleistung", "hauptleistung", "schicksal", "einheitlich", "versand|betriebskosten|heizkosten"] }),
  F("ust-leistungsart", "ust-leistung", "Welche Leistung erbringt der zu beurteilende Unternehmer?",
    ["Lieferung (§ 3 Abs. 1 UStG)", "Sonstige Leistung (§ 3 Abs. 9 UStG)", "Keine Leistung im umsatzsteuerlichen Sinne"], [
      { text: "Ein Bioladen verkauft einem Kunden eine Salami, die dieser sofort mitnimmt.", richtig: 0, erkl: "Der Kunde erhält die Verfügungsmacht an der Ware → Lieferung.", normen: ["UStG 3 1"] },
      { text: "Eine Vermieterin überlässt einem Rechtsanwalt Büroräume gegen Monatsmiete.", richtig: 1, erkl: "Die Vermieterin duldet die Nutzung, Verfügungsmacht wird nicht verschafft → sonstige Leistung.", normen: ["UStG 3 9"] },
      { text: "Ware eines Händlers verbrennt vor dem Versand; seine Versicherung zahlt ihm den Nettowert.", richtig: 2, erkl: "Der Händler hat weder dem Kunden die Verfügungsmacht verschafft noch der Versicherung etwas zugewendet. Die Hingabe von Geld ist keine Leistung → kein steuerbarer Umsatz.", normen: ["UStG 1 1"] },
      { text: "Ein Stadtwerk versorgt einen Bäcker mit Strom.", richtig: 0, erkl: "Elektrizität gilt als Gegenstand → Lieferung.", normen: ["UStG 3 1"] },
      { text: "Ein Händler verpflichtet sich gegen Zahlung, ein Jahr lang keine Konkurrenzprodukte zu vertreiben.", richtig: 1, erkl: "Ein Unterlassen gegen Entgelt ist eine sonstige Leistung (§ 3 Abs. 9 S. 2 UStG).", normen: ["UStG 3 9"] },
      { text: "Eine Hausärztin untersucht einen Privatpatienten.", richtig: 1, erkl: "Ärztliches Tätigwerden → sonstige Leistung (steuerfrei nach § 4 Nr. 14 a UStG).", normen: ["UStG 3 9"] },
      { text: "Ein Unternehmer liefert Tischsets unter Eigentumsvorbehalt; der Kaufpreis wird in Raten gezahlt.", richtig: 0, erkl: "Mit Übergabe kann der Abnehmer wie ein Eigentümer verfügen; der Eigentumsvorbehalt ist unerheblich (Abschn. 3.1 Abs. 3 UStAE) → Lieferung.", normen: ["UStG 3 1"] },
    ]),
  F("ust-nebenleistung-fall", "ust-leistung", "Wie ist die zusätzliche Leistung umsatzsteuerlich zu behandeln?",
    ["Unselbständige Nebenleistung – teilt das Schicksal der Hauptleistung", "Eigenständige Leistung – gesondert zu beurteilen", "Kein Entgelt für eine Leistung – nicht steuerbar"], [
      { text: "Eine Händlerin berechnet beim Versand eines Pullovers zusätzlich eine Versandpauschale von 15 €.", richtig: 0, erkl: "Versand ist typische Nebenleistung zur Lieferung (Abschn. 3.10 Abs. 5 UStAE) → Teil des Entgelts, 19 %.", normen: ["UStG 10 1"] },
      { text: "Im Preis eines Strickkurses ist ein Wollknäuel enthalten, das im Kurs verstrickt wird.", richtig: 0, erkl: "Die Wolle ermöglicht den Kurs unter optimalen Bedingungen und ist zweckgebunden → Nebenleistung zur sonstigen Leistung „Strickkurs“.", normen: ["UStG 3 9"] },
      { text: "Ein Vermieter erhält neben der Miete für Praxisräume monatlich Heizkosten von 200 €.", richtig: 0, erkl: "Die Wärmelieferung ist Nebenleistung zur Grundstücksvermietung (Abschn. 4.12.1 Abs. 5 UStAE) → teilt deren Steuerfreiheit.", normen: ["UStG 4"] },
      { text: "Mit den Praxisräumen vermieten dieselben Vermieter die Parkplätze vor dem Gebäude an die Ärztin.", richtig: 0, erkl: "Räumlicher Zusammenhang und dieselben Vertragsparteien → Nebenleistung zur steuerfreien Vermietung (Abschn. 4.12.2 Abs. 3 UStAE).", normen: ["UStG 4"] },
      { text: "Ein Kunde zahlt wegen verspäteter Zahlung zusätzlich 200 € Mahngebühren.", richtig: 2, erkl: "Mahngebühren werden nicht für die Leistung, sondern als Schadensersatz für die verspätete Zahlung gezahlt (Abschn. 1.3 Abs. 3, 6 UStAE) → nicht steuerbar.", normen: ["UStG 1 1"] },
      { text: "Eine Kundin kauft in einem Feinkostladen einen Präsentkorb mit Wein, Käse, Kaffee und Socken zum Gesamtpreis.", richtig: 1, erkl: "Mehrere eigenständige Lieferungen (Abschn. 3.1 UStAE) – der Steuersatz ist für jede Ware gesondert zu bestimmen.", normen: ["UStG 3 1", "UStG 12 2"] },
      { text: "Eine Ärztin gibt einem Patienten während der Behandlung ein Schmerzmittel und berechnet es auf der Honorarrechnung.", richtig: 0, erkl: "Das Medikament ist unselbständige Nebenleistung zur Heilbehandlung → ebenfalls steuerfrei (Abschn. 4.14.1 Abs. 4 UStAE).", normen: ["UStG 4"] },
    ]),
];

// ======================================================================= Ort der Leistung, Inland
const ort = [
  A("ust-ort-lieferung", "ust-ort",
    "Wo wird eine Lieferung ausgeführt? Unterscheiden Sie Beförderung, Versendung und unbewegte Lieferung.",
    "• Bewegte Lieferung (§ 3 Abs. 6 S. 1 UStG): Ort ist dort, wo die Beförderung oder Versendung an den Abnehmer beginnt.\n  – Beförderung: Lieferer oder Abnehmer transportiert selbst; auch der Abholfall (Kunde nimmt die Ware im Laden mit) → Ort am Laden.\n  – Versendung (§ 3 Abs. 6 S. 3, 4 UStG): Ein selbständiger Beauftragter (Spediteur, Post, DHL) befördert; sie beginnt mit der Übergabe an den Beauftragten.\n• Unbewegte Lieferung (§ 3 Abs. 7 S. 1 UStG): Ort ist, wo sich der Gegenstand bei Verschaffung der Verfügungsmacht befindet (z. B. Grundstück, Ware bleibt beim Käufer).\n• Steuerbar nur, wenn der Ort im Inland liegt (§ 1 Abs. 2 S. 1 UStG): Bundesrepublik ohne Büsingen, Helgoland, Freizonen und Gewässer/Watten zwischen Hoheitsgrenze und Strandlinie.",
    ["UStG 3 6", "UStG 3 7", "UStG 1 2"],
    M(["Bei der Versendung beginnt die Lieferung mit der Übergabe an den Spediteur.", "Holt der Kunde die Ware im Laden ab, ist der Lieferort beim Laden.", "Bei einer unbewegten Lieferung ist der Ort dort, wo sich der Gegenstand bei Verschaffung der Verfügungsmacht befindet.", "Helgoland gehört nicht zum umsatzsteuerlichen Inland."],
      ["Bei der Versendung ist der Lieferort stets dort, wo die Ware ankommt.", "Der Lieferort richtet sich immer nach dem Wohnsitz des Abnehmers.", "Helgoland gehört zum umsatzsteuerlichen Inland.", "Holt der Kunde die Ware ab, liegt eine unbewegte Lieferung vor."],
      "Welche Aussagen zum Ort der Lieferung sind richtig?"),
    { norm: ["UStG 3"], s: ["beginn", "befoerderung", "versendung", "uebergabe|beauftragt|spediteur", "inland"] }),
  A("ust-ort-sonstige", "ust-ort",
    "Wo wird eine sonstige Leistung ausgeführt? Nennen Sie Grundregeln und klausurrelevante Sonderregeln.",
    "• B2C-Grundregel (§ 3a Abs. 1 UStG): Ort ist dort, wo der leistende Unternehmer sein Unternehmen betreibt (z. B. Arztpraxis).\n• B2B-Grundregel (§ 3a Abs. 2 UStG): Bei Leistungen an einen Unternehmer für dessen Unternehmen ist der Ort dort, wo der Empfänger sein Unternehmen betreibt.\n• Sonderregeln gehen vor (§ 3a Abs. 3 UStG):\n  – Grundstücksleistungen (Abs. 3 Nr. 1): Ort ist, wo das Grundstück liegt – Vermietung, Ferienwohnung, Makler, Architekt; das Ferienhaus in Barcelona ist im Inland nicht steuerbar.\n  – Kulturelle, unterrichtende, unterhaltende Leistungen an Nichtunternehmer (Abs. 3 Nr. 3): dort, wo sie tatsächlich erbracht werden (z. B. Strickkurs im Laden).\n• Prüfungsreihenfolge: erst Sonderregel, dann B2B oder B2C.\n• Liegt der Ort nicht im Inland (§ 1 Abs. 2 UStG), ist der Umsatz in Deutschland nicht steuerbar.",
    ["UStG 3a 1", "UStG 3a 2", "UStG 3a 3"],
    M(["Bei einer Grundstücksvermietung ist der Ort dort, wo das Grundstück liegt.", "Eine Beratung an einen Unternehmer für dessen Unternehmen wird am Sitz des Empfängers ausgeführt.", "Eine Heilbehandlung an Privatpatienten wird am Sitz der Praxis ausgeführt.", "Die Vermietung eines Ferienhauses in Spanien ist im Inland nicht steuerbar."],
      ["Die Vermietung eines Ferienhauses in Spanien durch einen deutschen Unternehmer ist in Deutschland steuerbar.", "Sonstige Leistungen werden immer dort ausgeführt, wo der Leistende wohnt.", "Die B2C-Grundregel geht den Sonderregeln des § 3a Abs. 3 UStG vor.", "Bei B2B-Leistungen ist stets der Sitz des Leistenden maßgeblich."],
      "Welche Aussagen zum Ort der sonstigen Leistung sind richtig?"),
    { norm: ["UStG 3a"], s: ["grundstueck|belegen", "empfaenger", "leistende|sitz", "b2b|unternehmer fuer", "inland"] }),
  F("ust-ort-fall", "ust-ort", "Wo ist der Ort der Leistung, und ist der Umsatz im Inland steuerbar?", null, [
      { text: "Eine Händlerin aus Hannover verkauft einen Pullover an eine Kundin in München und übergibt ihn am 30.05. in Hannover an DHL.", optionen: ["Hannover – steuerbar", "München – steuerbar", "Kein Ort im Inland – nicht steuerbar"], richtig: 0, erkl: "Versendungslieferung: Ort bei Übergabe an den Beauftragten (§ 3 Abs. 6 S. 1, 3, 4 UStG) → Hannover, Inland.", normen: ["UStG 3 6"] },
      { text: "Eine Ärztin aus Bremerhaven vermietet ihr Ferienhaus in Barcelona an Feriengäste.", optionen: ["Bremerhaven – steuerbar", "Barcelona – im Inland nicht steuerbar", "Wohnort der Gäste"], richtig: 1, erkl: "Grundstücksleistung: Ort, wo das Grundstück liegt (§ 3a Abs. 3 Nr. 1 UStG) → Spanien, im Inland nicht steuerbar. Zum Unternehmen gehört das Ferienhaus trotzdem.", normen: ["UStG 3a 3"] },
      { text: "Eine Unternehmerin vermietet ihre Ferienwohnung in Lübeck an Feriengäste aus Frankreich.", optionen: ["Lübeck – steuerbar", "Frankreich – nicht steuerbar", "Sitz der Unternehmerin"], richtig: 0, erkl: "Belegenheitsort des Grundstücks (§ 3a Abs. 3 Nr. 1 UStG) → Lübeck, Inland. Die Herkunft der Gäste ist unerheblich.", normen: ["UStG 3a 3"] },
      { text: "Eine Händlerin beauftragt eine Spedition, die bestellte Ware in ihrem Außenlager in Hemmingen abholt und beim Kunden in Hannover abliefert.", optionen: ["Hemmingen – steuerbar", "Hannover (Kunde) – steuerbar", "Sitz der Spedition"], richtig: 0, erkl: "Versendung beginnt mit Übergabe an den Spediteur im Lager (§ 3 Abs. 6 S. 4 UStG) → Hemmingen.", normen: ["UStG 3 6"] },
      { text: "Ein Steuerberater aus Hamburg berät eine französische GmbH zu deren Unternehmen.", optionen: ["Hamburg – steuerbar", "Frankreich – im Inland nicht steuerbar", "Ort der Beratungsgespräche"], richtig: 1, erkl: "B2B-Leistung: Sitz des Empfängers (§ 3a Abs. 2 UStG) → Frankreich, im Inland nicht steuerbar.", normen: ["UStG 3a 2"] },
      { text: "Ein Steuerberater aus Hamburg berät eine Privatperson aus Lyon zu deren Erbschaft.", optionen: ["Hamburg – steuerbar", "Lyon – im Inland nicht steuerbar", "Ort des Nachlasses"], richtig: 0, erkl: "B2C-Grundregel: Sitz des leistenden Unternehmers (§ 3a Abs. 1 UStG) → Hamburg, Inland.", normen: ["UStG 3a 1"] },
      { text: "Ein Kunde kauft im Kiosk in Hamburg eine Zeitung und nimmt sie mit.", optionen: ["Hamburg – steuerbar", "Wohnort des Kunden", "Kein Ort – Bargeschäft"], richtig: 0, erkl: "Abholfall = Beförderungslieferung durch den Abnehmer; Ort, wo die Beförderung beginnt (§ 3 Abs. 6 S. 1 UStG) → Hamburg.", normen: ["UStG 3 6"] },
      { text: "Ein Bäcker aus Cuxhaven verkauft auf Helgoland Brötchen an Touristen.", optionen: ["Helgoland – kein Inland, nicht steuerbar", "Cuxhaven – steuerbar", "Wohnort der Touristen"], richtig: 0, erkl: "Helgoland gehört nicht zum Inland (§ 1 Abs. 2 S. 1 UStG) → im Inland nicht steuerbar.", normen: ["UStG 1 2"] },
    ]),
];

// ======================================================================= Leistungsaustausch, Steuerbarkeit
const entgelt = [
  A("ust-leistungsaustausch", "ust-entgelt",
    "Wann liegt ein Leistungsaustausch vor? Wie sind Schadensersatz und Mahngebühren zu behandeln?",
    "• Leistungsaustausch („gegen Entgelt“, § 1 Abs. 1 Nr. 1 UStG): Leistender und Empfänger sind verschiedene Personen, der Leistung steht eine Gegenleistung gegenüber, und beide sind wirtschaftlich verknüpft (die Gegenleistung wird gerade für die Leistung erbracht). Die Höhe ist für die Steuerbarkeit unerheblich.\n• Die Gegenleistung muss nicht in Geld bestehen (Tausch, § 3 Abs. 12 UStG).\n• Echter Schadensersatz ist nicht steuerbar (Abschn. 1.3 UStAE): Der Zahlende leistet, weil er für einen Schaden einstehen muss, nicht als Gegenleistung. Dazu gehören Vertragsstrafen, Verzugszinsen und Mahngebühren – sie erhöhen das Entgelt nicht.\n• Kein Leistungsaustausch bei Innenumsätzen zwischen Teilen desselben Unternehmens.\n• Fehlt ein Entgelt, kann eine unentgeltliche Wertabgabe vorliegen (§ 3 Abs. 1b, 9a UStG).",
    ["UStG 1 1", "UStG 3 12"],
    M(["Ein Leistungsaustausch setzt eine wirtschaftliche Verknüpfung von Leistung und Gegenleistung voraus.", "Mahngebühren sind echter Schadensersatz und nicht steuerbar.", "Ein unangemessen niedriges Entgelt schließt die Steuerbarkeit nicht aus.", "Die Gegenleistung kann auch in einer Lieferung bestehen."],
      ["Mahngebühren erhöhen die Bemessungsgrundlage der Lieferung.", "Ohne Geldzahlung liegt nie ein steuerbarer Umsatz vor.", "Eine Vertragsstrafe ist Entgelt für eine sonstige Leistung des Gläubigers.", "Ein Leistungsaustausch ist auch zwischen zwei Betrieben desselben Unternehmers möglich."],
      "Welche Aussagen zum Leistungsaustausch sind richtig?"),
    { norm: ["UStG 1"], s: ["gegenleistung", "verknuepf|wirtschaftlich", "schadensersatz", "mahngebuehr|vertragsstrafe|verzug", "nicht steuerbar"] }),
  A("ust-pruefung", "ust-entgelt",
    "Nennen Sie die Prüfungsreihenfolge für einen entgeltlichen Umsatz in der Klausur.",
    "1. Steuerbarkeit (§ 1 Abs. 1 Nr. 1 UStG): Unternehmer (§ 2), im Rahmen des Unternehmens, Lieferung (§ 3 Abs. 1) oder sonstige Leistung (§ 3 Abs. 9), gegen Entgelt (Leistungsaustausch), im Inland (§ 1 Abs. 2) – dafür den Ort bestimmen (§ 3 Abs. 6, 7 bzw. § 3a).\n2. Steuerbefreiung (§ 4 UStG) – erst nach festgestellter Steuerbarkeit; ggf. Option (§ 9 Abs. 1, dann Abs. 2).\n3. Bemessungsgrundlage (§ 10 Abs. 1 UStG: Entgelt = Gegenleistung ohne USt; auch bei steuerfreien Umsätzen angeben) und Steuersatz (§ 12).\n4. Entstehung (§ 13 Abs. 1 Nr. 1 a UStG: Ablauf des VAZ der Leistung; Anzahlungen nach S. 4) bzw. VAZ des steuerfreien Umsatzes; Steuerschuldner (§ 13a Abs. 1 Nr. 1).\n5. Änderungen der Bemessungsgrundlage (§ 17 UStG).\nDanach: unentgeltliche Wertabgaben, ggf. § 14c UStG, zuletzt der Vorsteuerabzug (Recht, Höhe, Zeitpunkt). Ausgangsumsätze vor dem Vorsteuerabzug prüfen – sie entscheiden über § 15 Abs. 2 bzw. Abs. 4 UStG.",
    ["UStG 1 1", "UStG 4", "UStG 10 1", "UStG 13 1", "UStG 15 1"],
    M(["Eine Steuerbefreiung ist erst nach festgestellter Steuerbarkeit zu prüfen.", "Bei steuerfreien Umsätzen sind ebenfalls Bemessungsgrundlage und Voranmeldungszeitraum anzugeben.", "Die Ausgangsumsätze sollten vor dem Vorsteuerabzug geprüft werden.", "Für die Steuerbarkeit muss der Ort der Leistung im Inland liegen."],
      ["Die Steuerbefreiung ist vor der Steuerbarkeit zu prüfen.", "Bei steuerfreien Umsätzen erübrigt sich die Angabe der Bemessungsgrundlage.", "Der Vorsteuerabzug ist stets vor den Ausgangsumsätzen zu prüfen.", "Die Unternehmereigenschaft spielt für die Steuerbarkeit keine Rolle."],
      "Welche Aussagen zur Prüfungsreihenfolge sind richtig?"),
    { norm: ["UStG 1"], s: ["steuerbar", "befreiung|steuerfrei", "bemessungsgrundlage", "entsteh", "vorsteuer"] }),
  F("ust-steuerbar-fall", "ust-entgelt", "Ist der Vorgang beim zu beurteilenden Unternehmer steuerbar nach § 1 Abs. 1 Nr. 1 UStG?",
    ["Steuerbar", "Nicht steuerbar"], [
      { text: "Ein Kunde überweist dem Händler neben dem Restkaufpreis 200 € Mahngebühren.", richtig: 1, erkl: "Mahngebühren sind echter Schadensersatz (Abschn. 1.3 Abs. 3 UStAE) – keine Gegenleistung für eine Leistung des Händlers.", normen: ["UStG 1 1"] },
      { text: "Eine Hausärztin verkauft ihr gebrauchtes Untersuchungsgerät an einen Kollegen.", richtig: 0, erkl: "Hilfsgeschäft im Rahmen des Unternehmens, Lieferung gegen Entgelt im Inland → steuerbar (aber steuerfrei nach § 4 Nr. 28 UStG).", normen: ["UStG 1 1", "UStG 4"] },
      { text: "Eine Einzelhändlerin nutzt das Erdgeschoss ihres eigenen Geschäftshauses für ihren Laden und überweist dafür monatlich „Miete“ auf ihr Vermietungskonto.", richtig: 1, erkl: "Nicht steuerbarer Innenumsatz innerhalb desselben Unternehmens.", normen: ["UStG 2 1"] },
      { text: "Ein Händler verkauft Tischsets an einen Bauunternehmer, der damit Kunden beschenken will.", richtig: 0, erkl: "Lieferung gegen Entgelt im Inland im Rahmen des Unternehmens → steuerbar und steuerpflichtig (19 %). Die Verwendung beim Käufer ist für den Händler unerheblich.", normen: ["UStG 1 1"] },
      { text: "Der Unfallgegner ersetzt einem Taxiunternehmer die Reparaturkosten seines Taxis.", richtig: 1, erkl: "Echter Schadensersatz aus unerlaubter Handlung – keine Leistung des Taxiunternehmers.", normen: ["UStG 1 1"] },
      { text: "Eine Ärztin vermietet ihre Ferienwohnung auf Sylt an Urlauber.", richtig: 0, erkl: "Sonstige Leistung gegen Entgelt, Ort Sylt (§ 3a Abs. 3 Nr. 1 UStG), im Rahmen des Unternehmens → steuerbar; kurzfristige Beherbergung ist steuerpflichtig zu 7 %.", normen: ["UStG 1 1", "UStG 3a 3"] },
      { text: "Ein Arzt verkauft sein privates Wohnmobil, das er nie beruflich genutzt hat.", richtig: 1, erkl: "Kein Umsatz im Rahmen des Unternehmens → nicht steuerbar.", normen: ["UStG 1 1"] },
    ]),
];

// ======================================================================= Steuerbefreiungen und Option
const befreiung = [
  A("ust-vermietung", "ust-befreiung",
    "Wie ist die Vermietung von Grundstücken umsatzsteuerlich zu behandeln? Gehen Sie auf Ausnahmen und Nebenleistungen ein.",
    "• Sonstige Leistung (§ 3 Abs. 9 UStG), Ort am Grundstück (§ 3a Abs. 3 Nr. 1 UStG), steuerbar bei Entgelt im Inland.\n• Steuerfrei nach § 4 Nr. 12 S. 1 a UStG (vorsteuerschädlich, § 15 Abs. 2 S. 1 Nr. 1 UStG).\n• Nicht befreit (§ 4 Nr. 12 S. 2 UStG): kurzfristige Beherbergung von Fremden (Ferienwohnung, Hotel – 7 % nach § 12 Abs. 2 Nr. 11 UStG), Vermietung von Stellplätzen für Fahrzeuge (als eigene Leistung), kurzfristige Vermietung auf Campingplätzen, Betriebsvorrichtungen.\n• Nebenleistungen (Betriebs-, Heizkosten; Stellplatz im räumlichen Zusammenhang mit denselben Vertragsparteien) teilen das Schicksal der Vermietung (Abschn. 4.12.1 Abs. 5, 4.12.2 Abs. 3 UStAE).\n• Verzicht nach § 9 UStG möglich, wenn an einen Unternehmer für dessen Unternehmen vermietet wird und der Mieter das Grundstück ausschließlich für vorsteuerunschädliche Umsätze nutzt.\n• Monatliche Miete = Teilleistungen (§ 13 Abs. 1 Nr. 1 a S. 2, 3 UStG): Entstehung bzw. Anmeldung monatlich; Vorauszahlungen nach S. 4 im VAZ der Vereinnahmung.",
    ["UStG 4", "UStG 9 1", "UStG 12 2", "UStG 13 1"],
    M(["Die Vermietung von Grundstücken ist grundsätzlich nach § 4 Nr. 12 a UStG steuerfrei.", "Die kurzfristige Vermietung einer Ferienwohnung ist steuerpflichtig und unterliegt 7 %.", "Betriebskosten teilen als Nebenleistung das Schicksal der Vermietung.", "Monatliche Mietzahlungen sind Teilleistungen."],
      ["Die Vermietung einer Ferienwohnung an Urlauber ist nach § 4 Nr. 12 a UStG steuerfrei.", "Betriebskosten sind stets mit 19 % steuerpflichtig.", "Die steuerfreie Vermietung berechtigt zum Vorsteuerabzug.", "Auf die Steuerfreiheit der Vermietung kann nie verzichtet werden."],
      "Welche Aussagen zur Grundstücksvermietung sind richtig?"),
    { norm: ["UStG 4"], s: ["steuerfrei", "kurzfristig|beherberg|ferien", "nebenleistung|betriebskosten", "verzicht|option|9", "teilleistung|monatlich"] }),
  A("ust-option", "ust-befreiung",
    "Unter welchen Voraussetzungen kann ein Vermieter auf die Steuerbefreiung verzichten? Welche Folgen hat das?",
    "• § 9 Abs. 1 UStG: Verzicht bei Umsätzen nach § 4 Nr. 12 UStG (u. a.) möglich, wenn der Umsatz an einen anderen Unternehmer für dessen Unternehmen ausgeführt wird – nicht bei Vermietung an Privatpersonen (Wohnung an ein Rentnerehepaar).\n• § 9 Abs. 2 UStG: Bei Grundstücksvermietung nur, soweit der Mieter das Grundstück ausschließlich für Umsätze verwendet, die den Vorsteuerabzug nicht ausschließen.\n  – möglich: Rechtsanwalt, Tischler, Einzelhändler (steuerpflichtige Umsätze),\n  – nicht möglich: Arzt (§ 4 Nr. 14), Versicherungsvertreter (§ 4 Nr. 11), Bank (§ 4 Nr. 8) – deren Umsätze schließen den Vorsteuerabzug nach § 15 Abs. 2 S. 1 Nr. 1 UStG aus.\n• Der Vermieter hat die Voraussetzungen nachzuweisen; die Option ist für jeden Umsatz (jede Mieteinheit) gesondert möglich.\n• Folge: Die Vermietung ist steuerpflichtig (19 %, Miete in der Regel brutto, also herausrechnen) und der Vermieter erhält den Vorsteuerabzug aus den Kosten dieser Einheit; der Mieter kann die Vorsteuer abziehen.",
    ["UStG 9 1", "UStG 9 2", "UStG 15 2"],
    M(["Ein Verzicht setzt die Vermietung an einen Unternehmer für dessen Unternehmen voraus.", "An einen Arzt, der in den Räumen steuerfreie Heilbehandlungen ausführt, kann nicht steuerpflichtig vermietet werden.", "An einen Rechtsanwalt kann steuerpflichtig vermietet werden.", "Durch den Verzicht erhält der Vermieter insoweit den Vorsteuerabzug."],
      ["Auf die Steuerbefreiung kann auch bei Vermietung an Privatpersonen verzichtet werden.", "Der Verzicht ist bei einem Versicherungsvertreter als Mieter möglich, weil er Unternehmer ist.", "Die Option kann nur für das gesamte Gebäude einheitlich ausgeübt werden.", "Nach dem Verzicht ist die Miete mit 7 % zu versteuern."],
      "Welche Aussagen zum Verzicht auf die Steuerbefreiung sind richtig?"),
    { norm: ["UStG 9"], s: ["unternehmer fuer|fuer dessen unternehmen", "ausschliesslich", "vorsteuerabzug nicht ausschliessen|vorsteuerunschaedlich|nicht ausschliessen", "arzt|versicherung|bank", "steuerpflichtig"] }),
  A("ust-heilbehandlung", "ust-befreiung",
    "Welche Leistungen eines Arztes sind nach § 4 Nr. 14 a UStG steuerfrei? Was gilt für den Verkauf seiner Praxisgeräte?",
    "• Steuerfrei sind Heilbehandlungen im Bereich der Humanmedizin im Rahmen der Tätigkeit als Arzt, Zahnarzt, Heilpraktiker, Physiotherapeut, Hebamme oder ähnlicher Heilberufe (§ 4 Nr. 14 a UStG).\n• Heilbehandlung = Tätigkeiten zur Diagnose, Behandlung und, soweit möglich, Heilung von Krankheiten oder Gesundheitsstörungen, auch zur Vorbeugung (Vorsorgeuntersuchung) (Abschn. 4.14.1 UStAE).\n• Nicht befreit: Leistungen ohne therapeutisches Ziel, z. B. Gutachten für eine Lebensversicherung oder für Versicherungsfragen, sowie die Tiermedizin (Wurmkur beim Hund) → steuerpflichtig.\n• Ein während der Behandlung verabreichtes Medikament ist unselbständige Nebenleistung → ebenfalls steuerfrei.\n• Folge: Kein Vorsteuerabzug aus Eingangsleistungen für die Praxis (§ 15 Abs. 2 S. 1 Nr. 1 UStG, keine Rückausnahme nach Abs. 3).\n• Verkauf eines Geräts, das ausschließlich für steuerfreie Heilbehandlungen genutzt wurde: Hilfsgeschäft, steuerbar, aber steuerfrei nach § 4 Nr. 28 UStG; BMG und VAZ sind trotzdem anzugeben.",
    ["UStG 4", "UStG 15 2"],
    M(["Vorsorgeuntersuchungen sind steuerfreie Heilbehandlungen.", "Ein Gutachten für eine Lebensversicherung ist steuerpflichtig.", "Die Behandlung eines Hundes ist nicht nach § 4 Nr. 14 a UStG befreit.", "Der Verkauf eines nur für Heilbehandlungen genutzten Praxisgeräts ist nach § 4 Nr. 28 UStG steuerfrei."],
      ["Jede Leistung eines Arztes ist steuerfrei.", "Ein in der Behandlung verabreichtes Medikament ist stets mit 19 % steuerpflichtig.", "Der Arzt kann die Vorsteuer aus dem Kauf von Untersuchungsliegen abziehen.", "Der Verkauf des Praxisgeräts ist nicht steuerbar, weil er kein Grundgeschäft ist."],
      "Welche Aussagen zur Steuerbefreiung von Heilbehandlungen sind richtig?"),
    { norm: ["UStG 4"], s: ["heilbehandlung", "humanmedizin", "gutachten|vorsorge", "28", "vorsteuer"] }),
  F("ust-befreiung-fall", "ust-befreiung", "Wie ist der steuerbare Umsatz zu behandeln?",
    ["Steuerpflichtig", "Steuerfrei nach § 4 Nr. 12 a UStG", "Steuerfrei nach § 4 Nr. 14 a UStG", "Steuerfrei nach § 4 Nr. 28 UStG"], [
      { text: "Ein Vermieter überlässt eine Wohnung an ein Rentnerehepaar für 800 € monatlich.", richtig: 1, erkl: "Grundstücksvermietung → steuerfrei; ein Verzicht scheidet aus, weil nicht an einen Unternehmer vermietet wird (§ 9 Abs. 1 UStG).", normen: ["UStG 4", "UStG 9 1"] },
      { text: "Eine Unternehmerin vermietet ihre Ferienwohnung für zwei Wochen an Urlauber.", richtig: 0, erkl: "Kurzfristige Beherbergung von Fremden ist nach § 4 Nr. 12 S. 2 UStG nicht befreit → steuerpflichtig zu 7 % (§ 12 Abs. 2 Nr. 11 UStG).", normen: ["UStG 4", "UStG 12 2"] },
      { text: "Ein Vermieter vermietet Praxisräume an eine Hausärztin.", richtig: 1, erkl: "Steuerfrei; die Option ist nach § 9 Abs. 2 UStG ausgeschlossen, weil die Ärztin steuerfreie, vorsteuerschädliche Umsätze ausführt.", normen: ["UStG 4", "UStG 9 2"] },
      { text: "Ein Vermieter vermietet Gewerberäume an einen Tischler und hat wirksam auf die Steuerbefreiung verzichtet.", richtig: 0, erkl: "Verzicht nach § 9 Abs. 1, 2 UStG (Tischler nutzt für steuerpflichtige Umsätze) → steuerpflichtig zu 19 %.", normen: ["UStG 9 1", "UStG 9 2"] },
      { text: "Eine Landärztin führt bei einem 60-jährigen Mann eine Vorsorgeuntersuchung durch.", richtig: 2, erkl: "Vorbeugung gehört zur Heilbehandlung (Abschn. 4.14.1 Abs. 1 UStAE) → steuerfrei.", normen: ["UStG 4"] },
      { text: "Eine Landärztin erstellt für einen Versicherungsantrag ein Gutachten über die Vorerkrankungen eines Kunden.", richtig: 0, erkl: "Kein therapeutisches Ziel → keine Heilbehandlung (Abschn. 4.14.1 Abs. 5 UStAE) → steuerpflichtig.", normen: ["UStG 4"] },
      { text: "Eine Landärztin gibt einem dreijährigen Hund eine Wurmkur.", richtig: 0, erkl: "§ 4 Nr. 14 a UStG erfasst nur die Humanmedizin → Tierbehandlung steuerpflichtig.", normen: ["UStG 4"] },
      { text: "Eine Hausärztin verkauft ein Ultraschallgerät, das sie ausschließlich für Heilbehandlungen genutzt hat.", richtig: 3, erkl: "Hilfsgeschäft; das Gerät wurde nur für steuerfreie Umsätze verwendet → steuerfrei nach § 4 Nr. 28 UStG.", normen: ["UStG 4"] },
      { text: "Ein Physiotherapeut behandelt einen Patienten mit Rückenschmerzen.", richtig: 2, erkl: "Heilbehandlung durch einen Physiotherapeuten → steuerfrei.", normen: ["UStG 4"] },
      { text: "Ein Hauseigentümer vermietet einen einzelnen Tiefgaragenstellplatz an einen Nachbarn, der bei ihm nichts sonst mietet.", richtig: 0, erkl: "Stellplatzvermietung als eigenständige Leistung ist nach § 4 Nr. 12 S. 2 UStG nicht befreit → steuerpflichtig.", normen: ["UStG 4"] },
    ]),
  F("ust-option-fall", "ust-befreiung", "Kann der Vermieter auf die Steuerbefreiung der Vermietung verzichten (§ 9 UStG)?",
    ["Ja – Verzicht möglich", "Nein – Mieter ist kein Unternehmer bzw. nutzt nicht für sein Unternehmen", "Nein – Mieter führt vorsteuerschädliche Umsätze aus (§ 9 Abs. 2 UStG)"], [
      { text: "Mieter des Dachgeschosses ist ein Rechtsanwalt, der dort seine Kanzlei betreibt.", richtig: 0, erkl: "Unternehmer, Nutzung für steuerpflichtige Umsätze → § 9 Abs. 1 und 2 UStG erfüllt.", normen: ["UStG 9 1", "UStG 9 2"] },
      { text: "Mieter des 1. Obergeschosses ist ein Versicherungsvertreter, der dort sein Büro hat.", richtig: 2, erkl: "Seine Umsätze sind nach § 4 Nr. 11 UStG steuerfrei und schließen den Vorsteuerabzug aus → Verzicht nach § 9 Abs. 2 UStG ausgeschlossen.", normen: ["UStG 9 2", "UStG 15 2"] },
      { text: "Mieterin ist eine Studentin, die die Wohnung selbst bewohnt.", richtig: 1, erkl: "Keine Vermietung an einen Unternehmer für dessen Unternehmen (§ 9 Abs. 1 UStG).", normen: ["UStG 9 1"] },
      { text: "Mieterin ist eine Zahnärztin, die die Räume als Praxis nutzt.", richtig: 2, erkl: "Steuerfreie Heilbehandlungen (§ 4 Nr. 14 a UStG) sind vorsteuerschädlich → kein Verzicht.", normen: ["UStG 9 2"] },
      { text: "Mieter ist ein Getränkehändler, der die Halle als Lager für seinen Handel nutzt.", richtig: 0, erkl: "Steuerpflichtige Umsätze des Mieters → Verzicht möglich.", normen: ["UStG 9 1", "UStG 9 2"] },
      { text: "Mieterin ist eine Bank, die im Erdgeschoss eine Filiale betreibt.", richtig: 2, erkl: "Bankumsätze sind überwiegend nach § 4 Nr. 8 UStG steuerfrei und vorsteuerschädlich → kein Verzicht.", normen: ["UStG 9 2"] },
      { text: "Ein Unternehmer mietet eine Wohnung, in der er ausschließlich privat mit seiner Familie lebt.", richtig: 1, erkl: "Der Mieter ist zwar Unternehmer, nutzt die Wohnung aber nicht für sein Unternehmen.", normen: ["UStG 9 1"] },
    ]),
  R("ust-miete-option", "ust-befreiung", (r) => {
    const miete = r.betrag(800, 4000, 1), bk = r.betrag(100, 500, 10), brutto = miete + bk, u = ustAus(brutto, 19);
    return {
      text: `Eine Vermieterin hat Büroräume an eine Steuerberaterin vermietet und wirksam auf die Steuerbefreiung verzichtet. Die monatliche Miete beträgt ${eur(miete)}, für Betriebskosten zahlt die Mieterin monatlich weitere ${eur(bk)}. Umsatzsteuer ist nicht gesondert vereinbart.\n\nWie hoch ist die monatlich entstehende Umsatzsteuer (in €)?`,
      cent: u,
      erklaerung: `Steuerpflichtige Vermietung nach Option (§ 9 Abs. 1, 2 UStG), 19 % (§ 12 Abs. 1 UStG). Die Betriebskosten sind Nebenleistung und gehören zum Entgelt.\nGesamtbetrag ${eur(brutto)} enthält die USt: BMG = ${eur(brutto)} / 1,19 = ${eur(brutto - u)}; USt = ${eur(u)}.\nMonatliche Teilleistung → Entstehung mit Ablauf jedes Monats (§ 13 Abs. 1 Nr. 1 a S. 1–3 UStG), Zahlungsverzug ist unerheblich.`,
      normen: ["UStG 9 1", "UStG 10 1", "UStG 13 1"],
    };
  }),
];

// ======================================================================= Bemessungsgrundlage und Steuersatz
const WAREN = [
  ["3 Flaschen Rotwein", 19, "Wein ist nicht in Anlage 2 aufgeführt"],
  ["ein Paar Wollsocken", 19, "Textilien → Regelsteuersatz"],
  ["eine Flasche Apfelsaft", 19, "Getränke (außer Milch, Milchmischgetränken und Leitungswasser) → Regelsteuersatz"],
  ["ein Weidenkorb", 19, "kein Gegenstand der Anlage 2"],
  ["eine Flasche Mineralwasser", 19, "Wasser in Fertigpackungen ist von lfd. Nr. 34 ausgenommen"],
  ["eine Bio-Salami", 7, "Zubereitung von Fleisch, Anlage 2 lfd. Nr. 28"],
  ["ein Hartkäse", 7, "Milcherzeugnis, Anlage 2 lfd. Nr. 4"],
  ["ein Päckchen Röstkaffee", 7, "Kaffee, Anlage 2 lfd. Nr. 12"],
  ["eine Packung Kekse", 7, "Backwaren, Anlage 2 lfd. Nr. 31"],
  ["eine Tageszeitung", 7, "Zeitungen, Anlage 2 lfd. Nr. 49"],
  ["ein Glas Honig", 7, "natürlicher Honig, Anlage 2 lfd. Nr. 4"],
  ["ein Kochbuch", 7, "Bücher, Anlage 2 lfd. Nr. 49"],
];
const bmg = [
  A("ust-bmg", "ust-bmg",
    "Was gehört zur Bemessungsgrundlage eines entgeltlichen Umsatzes, und wie wird die Umsatzsteuer ermittelt?",
    "• Bemessungsgrundlage ist das Entgelt (§ 10 Abs. 1 S. 1 UStG): alles, was den Wert der Gegenleistung bildet, die der Leistende vom Empfänger oder einem Dritten für die Leistung erhält oder erhalten soll, abzüglich der Umsatzsteuer (§ 10 Abs. 1 S. 2 UStG).\n• Dazu gehören auch Nebenleistungen (Versandpauschale) und Teilzahlungszuschläge; nicht dazu gehören echter Schadensersatz (Mahngebühren) und durchlaufende Posten.\n• Preise sind im Zweifel Bruttopreise: BMG = Gesamtbetrag / 1,19 bzw. / 1,07; USt = Gesamtbetrag × 19/119 bzw. 7/107. Ist „netto“ vereinbart, wird die Steuer aufgeschlagen.\n• Steuersätze (§ 12 UStG): 19 % allgemein; 7 % u. a. für Gegenstände der Anlage 2 (Lebensmittel – Getränke nur ausnahmsweise wie Milch und Leitungswasser –, Bücher, Zeitungen), kurzfristige Beherbergung (Nr. 11) und seit 2026 Restaurant- und Verpflegungsdienstleistungen ohne Getränke (Nr. 15).\n• Bei verbilligten Leistungen an nahestehende Personen oder Personal greift ggf. die Mindestbemessungsgrundlage (§ 10 Abs. 5 UStG).",
    ["UStG 10 1", "UStG 12 1", "UStG 12 2"],
    M(["Bemessungsgrundlage ist das Entgelt ohne Umsatzsteuer.", "Eine mitberechnete Versandpauschale gehört zum Entgelt.", "Aus einem Bruttobetrag von 119 € sind 19 € Umsatzsteuer herauszurechnen.", "Mahngebühren gehören nicht zur Bemessungsgrundlage."],
      ["Die Umsatzsteuer gehört zur Bemessungsgrundlage.", "Bei einem Bruttopreis ist die Umsatzsteuer mit 19 % des Bruttobetrags zu berechnen.", "Teilzahlungszuschläge mindern das Entgelt.", "Getränke unterliegen grundsätzlich dem ermäßigten Steuersatz."],
      "Welche Aussagen zur Bemessungsgrundlage sind richtig?"),
    { norm: ["UStG 10"], s: ["entgelt", "gegenleistung", "abzueglich|ohne umsatzsteuer|herausrechn|119|1 19", "7|ermaessig", "19|regelsteuersatz"] }),
  F("ust-satz", "ust-bmg", "Welcher Steuersatz gilt für die Lieferung?",
    ["19 % (§ 12 Abs. 1 UStG)", "7 % (§ 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2)"],
    WAREN.map(([w, s, grund]) => ({ text: `Ein Einzelhändler verkauft ${w} an einen Kunden.`, richtig: s === 19 ? 0 : 1, erkl: `${s} %: ${grund}.`, normen: ["UStG 12 1", "UStG 12 2"] }))),
  F("ust-satz-sonstige", "ust-bmg", "Welcher Steuersatz gilt?",
    ["19 % (§ 12 Abs. 1 UStG)", "7 % (§ 12 Abs. 2 UStG)", "Steuerfrei"], [
      { text: "Ein Restaurant serviert 2026 einem Gast ein Mittagessen.", richtig: 1, erkl: "Seit 01.01.2026 unterliegen Restaurant- und Verpflegungsdienstleistungen dem ermäßigten Satz (§ 12 Abs. 2 Nr. 15 UStG).", normen: ["UStG 12 2"] },
      { text: "Ein Restaurant serviert 2026 zum Essen eine Flasche Wein.", richtig: 0, erkl: "Die Abgabe von Getränken ist von § 12 Abs. 2 Nr. 15 UStG ausgenommen → 19 %.", normen: ["UStG 12 2"] },
      { text: "Eine Unternehmerin vermietet ihre Ferienwohnung eine Woche lang an Urlauber.", richtig: 1, erkl: "Kurzfristige Beherbergung: steuerpflichtig (§ 4 Nr. 12 S. 2 UStG), 7 % nach § 12 Abs. 2 Nr. 11 UStG.", normen: ["UStG 12 2", "UStG 4"] },
      { text: "Eine Einzelhändlerin veranstaltet einen Strickkurs gegen Teilnahmegebühr.", richtig: 0, erkl: "Unterrichtsleistung ohne Befreiung (§ 4 Nr. 21 UStG greift nicht) → 19 %; die enthaltene Wolle ist Nebenleistung.", normen: ["UStG 12 1"] },
      { text: "Ein Vermieter vermietet ein Ladenlokal an einen Bäcker, ohne auf die Steuerbefreiung zu verzichten.", richtig: 2, erkl: "Grundstücksvermietung ohne Option → steuerfrei nach § 4 Nr. 12 a UStG.", normen: ["UStG 4"] },
      { text: "Ein Hotel vermietet einem Geschäftsreisenden ein Zimmer für drei Nächte.", richtig: 1, erkl: "Kurzfristige Beherbergung → 7 % (§ 12 Abs. 2 Nr. 11 UStG).", normen: ["UStG 12 2"] },
    ]),
  R("ust-herausrechnen", "ust-bmg", (r) => {
    const satz = r.wahl([19, 19, 7]), brutto = r.betrag(10, 9000, 1) + r.zahl(0, 99), u = ustAus(brutto, satz);
    return {
      text: `Ein Unternehmer erhält für eine steuerpflichtige Lieferung (Steuersatz ${satz} %) insgesamt ${eur(brutto)}. Über die Umsatzsteuer wurde nichts vereinbart.\n\nWie hoch ist die Umsatzsteuer (in €)?`,
      cent: u,
      erklaerung: `Vereinbarte Preise sind Bruttopreise. BMG = ${eur(brutto)} / 1,${satz === 19 ? "19" : "07"} = ${eur(brutto - u)} (§ 10 Abs. 1 S. 2 UStG); USt = ${eur(brutto)} × ${satz}/${100 + satz} = ${eur(u)}.`,
      normen: ["UStG 10 1", satz === 19 ? "UStG 12 1" : "UStG 12 2"],
    };
  }),
  R("ust-korb", "ust-bmg", (r) => {
    const posten = r.mischen(WAREN).slice(0, r.zahl(4, 6)).map(([w, s]) => [w, s, r.betrag(3, 30, 1)]);
    if (!posten.some((p) => p[1] === 7)) posten[0] = ["ein Hartkäse", 7, posten[0][2]];
    if (!posten.some((p) => p[1] === 19)) posten[1] = ["ein Weidenkorb", 19, posten[1][2]];
    const s19 = posten.filter((p) => p[1] === 19).reduce((a, p) => a + p[2], 0), s7 = posten.filter((p) => p[1] === 7).reduce((a, p) => a + p[2], 0);
    const u19 = ustAus(s19, 19), u7 = ustAus(s7, 7), ges = s19 + s7;
    return {
      text: `Eine Feinkosthändlerin stellt einem Kunden in ihrem Laden einen Präsentkorb zusammen, den er bezahlt und sofort mitnimmt (Gesamtpreis ${eur(ges)}):\n${posten.map(([w, , p]) => `• ${w} (${eur(p)})`).join("\n")}\n\nWie hoch ist die insgesamt entstehende Umsatzsteuer (in €)?`,
      cent: u19 + u7,
      erklaerung: `Kein einheitlicher Umsatz, sondern mehrere Lieferungen (Abschn. 3.1 UStAE); Ort im Laden (§ 3 Abs. 6 S. 1 UStG), steuerbar und steuerpflichtig. Steuersatz je Ware:\n• 19 % (§ 12 Abs. 1 UStG): ${posten.filter((p) => p[1] === 19).map((p) => p[0]).join(", ")} = ${eur(s19)} → USt ${eur(s19)} × 19/119 = ${eur(u19)}\n• 7 % (§ 12 Abs. 2 Nr. 1 UStG, Anlage 2): ${posten.filter((p) => p[1] === 7).map((p) => p[0]).join(", ")} = ${eur(s7)} → USt ${eur(s7)} × 7/107 = ${eur(u7)}\nSumme ${eur(u19 + u7)}; Entstehung mit Ablauf des VAZ der Lieferung (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).`,
      normen: ["UStG 12 1", "UStG 12 2", "UStG 10 1"],
    };
  }),
  R("ust-versand", "ust-bmg", (r) => {
    const preis = r.betrag(40, 400, 5), versand = r.wahl([490, 590, 990, 1500]), ges = preis + versand, u = ustAus(ges, 19);
    return {
      text: `Eine Händlerin verkauft über ein Kleinanzeigenportal eine Jacke für ${eur(preis)} an eine Kundin in München und berechnet zusätzlich eine Versandpauschale von ${eur(versand)}. Sie übergibt die Jacke in Hannover an DHL.\n\nWie hoch ist die Bemessungsgrundlage der Lieferung (in €)?`,
      cent: ges - u,
      erklaerung: `Versendungslieferung, Ort Hannover (§ 3 Abs. 6 S. 1, 3, 4 UStG) → steuerbar, steuerpflichtig, 19 %.\nDie Versandpauschale ist unselbständige Nebenleistung (Abschn. 3.10 Abs. 5 UStAE) und gehört zum Entgelt: ${eur(ges)} / 1,19 = ${eur(ges - u)} (USt ${eur(u)}).`,
      normen: ["UStG 10 1", "UStG 3 6"],
    };
  }),
];

// ======================================================================= Entstehung, Steuerschuldner, Änderung der BMG
const entstehung = [
  A("ust-entstehung", "ust-entstehung",
    "Wann entsteht die Umsatzsteuer bei der Sollbesteuerung? Gehen Sie auf Teilleistungen und Anzahlungen ein.",
    "• Sollbesteuerung (vereinbarte Entgelte, § 16 Abs. 1 S. 1 UStG) ist der Regelfall: Die Steuer entsteht mit Ablauf des Voranmeldungszeitraums, in dem die Leistung ausgeführt worden ist (§ 13 Abs. 1 Nr. 1 a S. 1 UStG) – unabhängig von Rechnung und Zahlung; Ratenzahlung ändert daran nichts.\n• Lieferung ausgeführt mit Verschaffung der Verfügungsmacht bzw. mit Beginn der Beförderung/Versendung; sonstige Leistung mit Vollendung (Ferienwohnung: am letzten Miettag).\n• Teilleistungen (S. 2, 3): wirtschaftlich teilbare Leistung mit gesondert vereinbartem Teilentgelt, z. B. monatliche oder vierteljährliche Miete → Entstehung je Zeitabschnitt.\n• Anzahlungen (S. 4, Mindest-Istversteuerung): Wird Entgelt vor Ausführung vereinnahmt, entsteht die Steuer insoweit mit Ablauf des VAZ der Vereinnahmung; der Rest mit Ablauf des VAZ der Ausführung.\n• Istbesteuerung (§ 20 UStG, § 13 Abs. 1 Nr. 1 b): mit Ablauf des VAZ der Vereinnahmung.\n• Steuerschuldner ist der leistende Unternehmer (§ 13a Abs. 1 Nr. 1 UStG).\n• Bei steuerfreien Umsätzen ist der VAZ anzugeben, in dem sie anzumelden sind (analog § 13 Abs. 1 Nr. 1 a UStG).",
    ["UStG 13 1", "UStG 13a 1"],
    M(["Bei der Sollbesteuerung entsteht die Steuer mit Ablauf des VAZ, in dem die Leistung ausgeführt wird.", "Für vor der Leistung vereinnahmte Anzahlungen entsteht die Steuer mit Ablauf des VAZ der Vereinnahmung.", "Monatliche Mietzahlungen sind Teilleistungen.", "Steuerschuldner ist der leistende Unternehmer."],
      ["Die Steuer entsteht erst, wenn der Kunde vollständig bezahlt hat.", "Bei Ratenzahlung entsteht die Steuer anteilig mit jeder Rate.", "Die Steuer entsteht stets im Monat der Rechnungserteilung.", "Bei Anzahlungen entsteht die Steuer erst mit Ausführung der Leistung."],
      "Welche Aussagen zur Steuerentstehung sind richtig?"),
    { norm: ["UStG 13"], s: ["ablauf", "voranmeldungszeitraum|vaz", "ausgefuehrt|ausfuehrung", "teilleistung", "anzahlung|vereinnahm"] }),
  F("ust-vaz-fall", "ust-entstehung", "Mit Ablauf welches Voranmeldungszeitraums entsteht die Steuer bzw. ist der Umsatz anzumelden (Sollbesteuerung, VAZ = Monat)?", null, [
      { text: "Kaufvertrag vom 30.03.; die Ware wird am 03.04. an den Spediteur übergeben; der Kaufpreis wird in Raten von Mai bis August gezahlt.", optionen: ["März", "April", "August"], richtig: 1, erkl: "Lieferung mit Übergabe an den Spediteur am 03.04. ausgeführt (§ 3 Abs. 6 S. 4 UStG) → Ablauf April (§ 13 Abs. 1 Nr. 1 a S. 1 UStG); Raten und Eigentumsvorbehalt sind unerheblich.", normen: ["UStG 13 1"] },
      { text: "Eine Ärztin behandelt am 15.01. einen Privatpatienten, stellt am 20.02. die Rechnung, die am 05.03. bezahlt wird.", optionen: ["Januar", "Februar", "März"], richtig: 0, erkl: "Steuerfreie sonstige Leistung, ausgeführt am 15.01. → im VAZ Januar anzumelden (analog § 13 Abs. 1 Nr. 1 a S. 1 UStG).", normen: ["UStG 13 1"] },
      { text: "Ferienwohnung vermietet vom 20.05. bis 05.06.; Anzahlung von 1.000 € am 15.04. Für welchen Teil entsteht die Steuer zuerst – und wann?", optionen: ["April (für die Anzahlung)", "Mai (Mietbeginn)", "Juni (für den gesamten Betrag)"], richtig: 0, erkl: "Für die vor Ausführung vereinnahmte Anzahlung entsteht die Steuer mit Ablauf April (§ 13 Abs. 1 Nr. 1 a S. 4 UStG); der Rest mit Ablauf Juni (Vollendung am 05.06.).", normen: ["UStG 13 1"] },
      { text: "Ein Mieter zahlt die Miete für Mai und Juni (steuerpflichtig nach Option) erst im Juli. Wann entsteht die Steuer für die Maimiete?", optionen: ["Mai", "Juli", "Dezember"], richtig: 0, erkl: "Monatliche Teilleistung (§ 13 Abs. 1 Nr. 1 a S. 2, 3 UStG) → Ablauf Mai; die verspätete Zahlung ist unerheblich.", normen: ["UStG 13 1"] },
      { text: "Ein Tischler zahlt die vierteljährliche Miete (steuerpflichtig nach Option) für Juli bis September am 01.07.", optionen: ["Juli", "September", "Oktober"], richtig: 0, erkl: "Die Teilleistung ist Ende September ausgeführt, das Entgelt aber schon im Juli vereinnahmt → Entstehung mit Ablauf Juli (§ 13 Abs. 1 Nr. 1 a S. 4 UStG).", normen: ["UStG 13 1"] },
      { text: "Ein Händler versendet am 30.05. einen Pullover per DHL; die Kundin erhält ihn am 01.06. Bezahlt hatte sie am 29.05.", optionen: ["Mai", "Juni", "Juli"], richtig: 0, erkl: "Lieferung ausgeführt mit Übergabe an DHL am 30.05. → Ablauf Mai.", normen: ["UStG 13 1"] },
      { text: "Eine Strickkursleiterin hält am 15.02. einen Kurs; die Teilnehmer haben bei der Anmeldung im Januar bezahlt.", optionen: ["Januar", "Februar", "März"], richtig: 0, erkl: "Vereinnahmung vor Ausführung → Entstehung mit Ablauf Januar (§ 13 Abs. 1 Nr. 1 a S. 4 UStG).", normen: ["UStG 13 1"] },
    ]),
  R("ust-anzahlung", "ust-entstehung", (r) => {
    const m = r.zahl(3, 11), ges = r.betrag(2000, 20000, 100), anz = Math.round(ges * r.wahl([0.1, 0.2, 0.25, 0.3]) / 10000) * 10000;
    const uGes = ustAus(ges, 19), uAnz = ustAus(anz, 19), rest = uGes - uAnz, frageAnz = r.muenze();
    return {
      text: `Ein Händler verkauft eine Maschine für ${eur(ges)} (brutto). Der Käufer zahlt am 28.${String(m - 1).padStart(2, "0")}. eine Anzahlung von ${eur(anz)}; der Händler liefert am 10.${String(m).padStart(2, "0")}., der Rest wird im Folgemonat gezahlt. Der Händler versteuert nach vereinbarten Entgelten.\n\nWie viel Umsatzsteuer entsteht mit Ablauf ${frageAnz ? MONAT[m - 2] : MONAT[m - 1]} (in €)?`,
      cent: frageAnz ? uAnz : rest,
      erklaerung: `Gesamte USt: ${eur(ges)} × 19/119 = ${eur(uGes)}.\nAnzahlung vor Ausführung → insoweit Entstehung mit Ablauf ${MONAT[m - 2]} (§ 13 Abs. 1 Nr. 1 a S. 4 UStG): ${eur(anz)} × 19/119 = ${eur(uAnz)}.\nRest mit Ablauf des VAZ der Lieferung, ${MONAT[m - 1]} (S. 1): ${eur(uGes)} − ${eur(uAnz)} = ${eur(rest)}. Die spätere Restzahlung ist unerheblich.`,
      normen: ["UStG 13 1"],
    };
  }),
  A("ust-aenderung", "ust-entstehung",
    "Wann und wie ist die Bemessungsgrundlage nach § 17 UStG zu berichtigen?",
    "• Ändert sich die Bemessungsgrundlage eines steuerpflichtigen Umsatzes nachträglich (Skonto, Rabatt, Bonus, Rückgabe), hat der leistende Unternehmer die geschuldete Steuer zu berichtigen (§ 17 Abs. 1 S. 1 UStG); der Empfänger berichtigt spiegelbildlich seinen Vorsteuerabzug (S. 2).\n• Berichtigung für den VAZ, in dem die Änderung eingetreten ist (§ 17 Abs. 1 S. 7 UStG) – keine Rückwirkung.\n• Tritt die Änderung noch im VAZ der Leistung ein, wird gleich die geänderte BMG angesetzt.\n• Uneinbringlichkeit des Entgelts wird ebenso behandelt (§ 17 Abs. 2 Nr. 1 UStG); bei späterer Zahlung ist erneut zu berichtigen.\n• Mahngebühren oder Verzugszinsen führen nicht zu einer Änderung, weil sie nicht zum Entgelt gehören.",
    ["UStG 17 1"],
    M(["Ein Skontoabzug in einem späteren Monat mindert die Steuer im Monat der Zahlung.", "Der Leistungsempfänger muss seinen Vorsteuerabzug entsprechend berichtigen.", "Eine Änderung im selben VAZ wird direkt bei der Bemessungsgrundlage berücksichtigt.", "Mahngebühren führen nicht zu einer Erhöhung der Bemessungsgrundlage."],
      ["Ein Skonto wird rückwirkend im Monat der Lieferung berücksichtigt.", "Nur der leistende Unternehmer berichtigt, der Leistungsempfänger nicht.", "Mahngebühren erhöhen die Bemessungsgrundlage nach § 17 UStG.", "Eine Berichtigung setzt stets eine neue Rechnung voraus."],
      "Welche Aussagen zur Änderung der Bemessungsgrundlage sind richtig?"),
    { norm: ["UStG 17"], s: ["skonto|rabatt|bonus", "berichtig", "vorsteuer", "voranmeldungszeitraum|vaz|eingetreten", "nachtraeglich|aendert"] }),
  R("ust-skonto", "ust-entstehung", (r) => {
    const netto = r.betrag(1000, 30000, 100), u = Math.round(netto * 0.19), sk = r.wahl([2, 3]), m = r.zahl(1, 11);
    const minderung = Math.round(u * sk / 100);
    return {
      text: `Ein Großhändler liefert am 20.${String(m).padStart(2, "0")}. Waren für ${eur(netto)} zzgl. ${eur(u)} USt an einen Einzelhändler. Dieser zahlt am 05.${String(m + 1).padStart(2, "0")}. unter Abzug von ${sk} % Skonto.\n\nUm wie viel € mindert sich die Umsatzsteuer des Großhändlers?`,
      cent: minderung,
      erklaerung: `Lieferung im ${MONAT[m - 1]}: USt ${eur(u)} entsteht mit Ablauf ${MONAT[m - 1]}.\nSkonto ist eine Entgeltminderung (§ 17 Abs. 1 S. 1 UStG), eingetreten im ${MONAT[m]} → Berichtigung im VAZ ${MONAT[m]} (§ 17 Abs. 1 S. 7 UStG): ${sk} % von ${eur(u)} = ${eur(minderung)}. Der Einzelhändler mindert seine Vorsteuer im selben VAZ um denselben Betrag.`,
      normen: ["UStG 17 1"],
    };
  }),
];

// ======================================================================= Vorsteuerabzug und Rechnungen
const vorsteuer = [
  A("ust-vorsteuer", "ust-vorsteuer",
    "Unter welchen Voraussetzungen kann ein Unternehmer Vorsteuer abziehen? In welcher Höhe und wann?",
    "Recht (§ 15 Abs. 1 S. 1 Nr. 1 UStG):\n• Der Abziehende ist Unternehmer und Leistungsempfänger (zivilrechtlicher Auftraggeber).\n• Lieferung oder sonstige Leistung von einem anderen Unternehmer (nicht von einer Privatperson).\n• Für sein Unternehmen bezogen (bei einheitlichen Gegenständen Zuordnung bei mindestens 10 % unternehmerischer Nutzung, § 15 Abs. 1 S. 2 UStG).\n• Ordnungsgemäße Rechnung nach §§ 14, 14a UStG mit gesondertem Steuerausweis (Kleinbetragsrechnung bis 250 € brutto nach § 33 UStDV genügt).\nHöhe: die gesetzlich geschuldete Steuer, höchstens die in der Rechnung ausgewiesene; zu hoch ausgewiesene Steuer (§ 14c) ist nicht abziehbar.\nZeitpunkt: VAZ, in dem Leistung und Rechnung vorliegen; bei Anzahlungen, sobald Rechnung und Zahlung vorliegen (§ 15 Abs. 1 S. 1 Nr. 1 S. 3 UStG).\nAusschluss: § 15 Abs. 1a (nicht abziehbare Betriebsausgaben, z. B. Geschenke über 50 €), § 15 Abs. 2 S. 1 Nr. 1 (Verwendung für steuerfreie Umsätze) mit Rückausnahmen nach Abs. 3; bei gemischter Verwendung Aufteilung nach Abs. 4.",
    ["UStG 15 1", "UStG 15 2", "UStG 14 4"],
    M(["Der Vorsteuerabzug setzt eine Leistung von einem anderen Unternehmer voraus.", "Abziehbar ist höchstens die in der Rechnung ausgewiesene Steuer.", "Zu hoch ausgewiesene Steuer ist nur in Höhe der gesetzlich geschuldeten Steuer abziehbar.", "Bei einer Anzahlung ist die Vorsteuer abziehbar, sobald Rechnung und Zahlung vorliegen."],
      ["Aus dem Kauf bei einer Privatperson kann Vorsteuer abgezogen werden, wenn eine Quittung vorliegt.", "Die Vorsteuer ist stets im Monat der Zahlung abziehbar.", "Ein Arzt kann die Vorsteuer aus Praxiseinrichtung voll abziehen.", "Zu hoch ausgewiesene Steuer ist in voller Höhe abziehbar."],
      "Welche Aussagen zum Vorsteuerabzug sind richtig?"),
    { norm: ["UStG 15"], s: ["unternehmer", "rechnung", "gesetzlich geschuldet", "ausgewiesen", "zeitpunkt|vaz|voranmeldungszeitraum"] }),
  A("ust-rechnung", "ust-vorsteuer",
    "Welche Angaben muss eine Rechnung enthalten? Was gilt für Kleinbetragsrechnungen und für falsch ausgewiesene Steuer?",
    "• Pflichtangaben (§ 14 Abs. 4 UStG): Name und Anschrift von Leistendem und Empfänger; Steuernummer oder USt-IdNr. des Leistenden; Ausstellungsdatum; fortlaufende Rechnungsnummer; Menge und Art der Lieferung bzw. Art und Umfang der Leistung; Zeitpunkt der Leistung bzw. der Vereinnahmung; Entgelt nach Steuersätzen aufgeschlüsselt sowie jede Minderung; Steuersatz und Steuerbetrag bzw. Hinweis auf die Steuerbefreiung.\n• Kleinbetragsrechnung bis 250 € brutto (§ 33 UStDV): Name und Anschrift des Leistenden, Ausstellungsdatum, Menge und Art, Entgelt und Steuer in einer Summe, Steuersatz.\n• Unrichtiger Steuerausweis (§ 14c Abs. 1 UStG): Weist der Unternehmer mehr Steuer aus, als er schuldet, schuldet er auch den Mehrbetrag (berichtigungsfähig). Der Empfänger zieht nur die gesetzlich geschuldete Steuer ab.\n• Zu niedriger Ausweis: Der Leistende schuldet die gesetzliche Steuer; der Empfänger zieht nur den ausgewiesenen Betrag ab.\n• Unberechtigter Ausweis (§ 14c Abs. 2 UStG): Wer zum Ausweis nicht berechtigt ist (Privatperson, Kleinunternehmer), schuldet den ausgewiesenen Betrag; Vorsteuerabzug besteht nicht.",
    ["UStG 14 4", "UStG 14c 1", "UStG 14c 2"],
    M(["Bei einer Kleinbetragsrechnung bis 250 € genügt die Angabe des Bruttobetrags und des Steuersatzes.", "Wer zu viel Steuer ausweist, schuldet auch den Mehrbetrag.", "Bei zu niedrigem Steuerausweis kann der Empfänger nur den ausgewiesenen Betrag abziehen.", "Eine Privatperson, die in einer Quittung Umsatzsteuer ausweist, schuldet diese nach § 14c Abs. 2 UStG."],
      ["Kleinbetragsrechnungen berechtigen nicht zum Vorsteuerabzug.", "Bei zu hohem Steuerausweis kann der Empfänger den vollen ausgewiesenen Betrag abziehen.", "Eine fortlaufende Rechnungsnummer ist entbehrlich, wenn das Datum angegeben ist.", "Eine zu niedrig ausgewiesene Steuer schuldet der Leistende nur in der ausgewiesenen Höhe."],
      "Welche Aussagen zu Rechnungen und Steuerausweis sind richtig?"),
    { norm: ["UStG 14|UStG 14c"], s: ["pflichtangabe|rechnungsnummer|steuernummer", "250|kleinbetrag", "14c|unrichtig|unberechtigt", "mehrbetrag|zu hoch", "gesetzlich geschuldet"] }),
  R("ust-vorsteuer-ausweis", "ust-vorsteuer", (r) => {
    const zuHoch = r.muenze();
    if (zuHoch) {
      const brutto = r.betrag(200, 3000, 1) * 1 + r.zahl(0, 99), ausgewiesen = Math.round(brutto * 0.19), entgelt = brutto - ausgewiesen, gesetzlich = ustAus(brutto, 19);
      return {
        text: `Ein Kioskbetreiber kauft eine Registrierkasse. Die Rechnung weist aus:\nRegistrierkasse ${eur(entgelt)}\nUmsatzsteuer ${eur(ausgewiesen)}\nRechnungssumme ${eur(brutto)}\n\nWie hoch ist sein Vorsteuerabzug (in €)?`,
        cent: gesetzlich,
        erklaerung: `Die ausgewiesene Steuer ist zu hoch (19 % vom Bruttobetrag statt herausgerechnet). Abziehbar ist nur die gesetzlich geschuldete Steuer (§ 15 Abs. 1 S. 1 Nr. 1 UStG): ${eur(brutto)} × 19/119 = ${eur(gesetzlich)}. Den Mehrbetrag schuldet der Verkäufer nach § 14c Abs. 1 UStG.`,
        normen: ["UStG 15 1", "UStG 14c 1"],
      };
    }
    const netto = r.betrag(100, 3000, 10), ausgewiesen = Math.round(netto * 0.07);
    return {
      text: `Ein Kioskbetreiber kauft Cola für den Weiterverkauf. Die Rechnung weist aus:\nCola ${eur(netto)}\nUmsatzsteuer 7 % ${eur(ausgewiesen)}\nRechnungssumme ${eur(netto + ausgewiesen)}\n\nWie hoch ist sein Vorsteuerabzug (in €)?`,
      cent: ausgewiesen,
      erklaerung: `Cola unterliegt als Getränk 19 % (§ 12 Abs. 1 UStG); gesetzlich geschuldet wären ${eur(netto + ausgewiesen)} × 19/119 = ${eur(ustAus(netto + ausgewiesen, 19))}. Abziehbar ist aber höchstens die in der Rechnung ausgewiesene Steuer: ${eur(ausgewiesen)}.`,
      normen: ["UStG 15 1", "UStG 12 1"],
    };
  }),
  F("ust-vorsteuer-zeitpunkt", "ust-vorsteuer", "In welchem VAZ kann die Vorsteuer abgezogen werden?", null, [
      { text: "Getränke werden am 20.07. bestellt und bezahlt, am 30.07. geliefert; die Rechnung geht am 05.08. ein.", optionen: ["Juli", "August", "September"], richtig: 1, erkl: "Erst im August liegen Leistung und Rechnung vor (§ 15 Abs. 1 S. 1 Nr. 1 S. 1, 2 UStG). Die Zahlung im Juli hilft nicht, weil keine Rechnung vorlag.", normen: ["UStG 15 1"] },
      { text: "Eine Registrierkasse wird am 20.09. mit Rechnung geliefert und am 05.10. bezahlt.", optionen: ["August", "September", "Oktober"], richtig: 1, erkl: "Leistung und Rechnung liegen im September vor; die Zahlung ist unerheblich.", normen: ["UStG 15 1"] },
      { text: "Ein Spediteur stellt am 30.03. eine Vorausrechnung, die am 02.04. bezahlt wird; der Transport erfolgt am 03.04.", optionen: ["März", "April", "Mai"], richtig: 1, erkl: "Im März liegt nur die Rechnung vor. Im April liegen Rechnung und Zahlung bzw. Leistung vor → April.", normen: ["UStG 15 1"] },
      { text: "Ein Händler leistet am 15.11. eine Anzahlung auf eine Maschine; die Anzahlungsrechnung mit gesondertem Steuerausweis liegt seit dem 10.11. vor. Geliefert wird im Januar.", optionen: ["November", "Dezember", "Januar"], richtig: 0, erkl: "Bei Anzahlungen ist die Vorsteuer abziehbar, sobald Rechnung und Zahlung vorliegen (§ 15 Abs. 1 S. 1 Nr. 1 S. 3 UStG) → November.", normen: ["UStG 15 1"] },
      { text: "Büromöbel werden am 28.12. geliefert; die Rechnung kommt am 08.01., bezahlt wird am 20.01.", optionen: ["Dezember", "Januar", "Februar"], richtig: 1, erkl: "Ohne Rechnung kein Abzug; im Januar liegen Leistung und Rechnung vor.", normen: ["UStG 15 1"] },
    ]),
  F("ust-vorsteuer-fall", "ust-vorsteuer", "In welchem Umfang ist die Vorsteuer abziehbar?",
    ["Voller Vorsteuerabzug", "Kein Vorsteuerabzug", "Teilweiser Vorsteuerabzug (Aufteilung nach § 15 Abs. 4 UStG)"], [
      { text: "Eine Hausärztin kauft zwei Untersuchungsliegen für ihre Praxis (Rechnung liegt vor).", richtig: 1, erkl: "Verwendung für steuerfreie Heilbehandlungen → Ausschluss nach § 15 Abs. 2 S. 1 Nr. 1 UStG, keine Rückausnahme nach Abs. 3.", normen: ["UStG 15 2"] },
      { text: "Ein Kioskbetreiber kauft eine neue Registrierkasse für den Kiosk.", richtig: 0, erkl: "Verwendung für steuerpflichtige Umsätze → voller Abzug.", normen: ["UStG 15 1"] },
      { text: "Eine Händlerin kauft einen Pullover von einer Privatperson zum Weiterverkauf; die Quittung weist 19 % MwSt. aus.", richtig: 1, erkl: "Keine Leistung von einem Unternehmer → kein Vorsteuerabzug; die Privatperson schuldet den Betrag nach § 14c Abs. 2 UStG.", normen: ["UStG 15 1", "UStG 14c 2"] },
      { text: "Ein Bauunternehmer kauft Tischsets zu je 120 € (netto über 100 €) als Weihnachtsgeschenke für Kunden.", richtig: 1, erkl: "Geschenke über 50 € je Empfänger sind nicht abziehbare Betriebsausgaben (§ 4 Abs. 5 S. 1 Nr. 1 EStG) → Vorsteuer nach § 15 Abs. 1a UStG ausgeschlossen.", normen: ["UStG 15 1a"] },
      { text: "Eine Vermieterin lässt das Dach ihres Gebäudes reparieren; ein Geschoss ist steuerfrei an einen Versicherungsvertreter, eines nach Option steuerpflichtig an einen Rechtsanwalt vermietet.", richtig: 2, erkl: "Gemischte Verwendung → Aufteilung nach § 15 Abs. 4 UStG, bei Gebäuden regelmäßig nach dem Flächenschlüssel.", normen: ["UStG 15 4"] },
      { text: "Eine Ärztin mietet Praxisräume; der Vermieter stellt ihr die steuerfreie Miete in Rechnung.", richtig: 1, erkl: "Für eine steuerfreie Leistung wird keine Steuer geschuldet → nichts abzuziehen (abgesehen vom Ausschluss nach § 15 Abs. 2 UStG).", normen: ["UStG 15 1"] },
      { text: "Ein Einzelhändler kauft bei einem Spediteur eine Transportleistung für die Auslieferung seiner Waren.", richtig: 0, erkl: "Eingangsleistung für steuerpflichtige Lieferungen → voller Abzug.", normen: ["UStG 15 1"] },
    ]),
  R("ust-aufteilung", "ust-vorsteuer", (r) => {
    const flaechen = [r.wahl([120, 150, 200]), r.wahl([120, 150, 200]), r.wahl([100, 150, 200])];
    const [eg, og, dg] = flaechen, ges = eg + og + dg, vst = r.betrag(3000, 40000, 10), mieterOg = r.wahl(["einen Versicherungsvertreter", "eine Zahnärztin", "eine Bank"]);
    const abz = Math.round(vst * (eg + dg) / ges);
    return {
      text: `Eine Unternehmerin lässt die Fassade ihres Geschäftshauses sanieren; die ordnungsgemäße Rechnung weist ${eur(vst)} USt aus. Nutzung:\n• Erdgeschoss (${eg} m²): eigener Einzelhandelsladen (steuerpflichtige Umsätze)\n• 1. Obergeschoss (${og} m²): vermietet an ${mieterOg}\n• Dachgeschoss (${dg} m²): an einen Rechtsanwalt vermietet, auf die Steuerbefreiung wurde verzichtet\n\nWie hoch ist die abziehbare Vorsteuer (in €)?`,
      cent: abz,
      erklaerung: `EG: eigene steuerpflichtige Umsätze → abziehbar. 1. OG: Verzicht nach § 9 Abs. 2 UStG unmöglich (Mieter mit vorsteuerschädlichen Umsätzen) → steuerfrei nach § 4 Nr. 12 a, Ausschluss nach § 15 Abs. 2 S. 1 Nr. 1 UStG. DG: steuerpflichtig nach Option → abziehbar.\nAufteilung nach § 15 Abs. 4 UStG (Flächenschlüssel): (${eg} + ${dg}) / ${ges} m² × ${eur(vst)} = ${eur(abz)}.`,
      normen: ["UStG 15 4", "UStG 15 2", "UStG 9 2"],
    };
  }),
];

// ======================================================================= Unentgeltliche Wertabgaben
const wertabgabe = [
  A("ust-wertabgabe", "ust-wertabgabe",
    "Welche unentgeltlichen Wertabgaben werden besteuert? Wie werden sie bemessen?",
    "Zweck: unversteuerten Letztverbrauch verhindern – der Unternehmer soll nicht besser stehen als ein Verbraucher.\n• Gleichgestellt einer Lieferung gegen Entgelt (§ 3 Abs. 1b UStG): Nr. 1 Entnahme für außerunternehmerische (private) Zwecke, Nr. 2 Zuwendungen an das Personal für dessen privaten Bedarf (außer Aufmerksamkeiten bis 60 €), Nr. 3 andere unentgeltliche Zuwendungen (außer Geschenke von geringem Wert bis 50 € und Warenmuster).\n• Voraussetzung (S. 2): Der Gegenstand oder seine Bestandteile haben zum vollen oder teilweisen Vorsteuerabzug berechtigt.\n• Gleichgestellt einer sonstigen Leistung (§ 3 Abs. 9a UStG): Nr. 1 private Verwendung eines dem Unternehmen zugeordneten Gegenstands (mit Vorsteuerabzug), Nr. 2 andere unentgeltliche sonstige Leistungen für private Zwecke (z. B. Arbeitnehmer renovieren das Privathaus).\n• Ort: wie bei entgeltlichen Leistungen (§ 3 Abs. 6, 7 bzw. § 3a UStG).\n• BMG (§ 10 Abs. 4 UStG): Nr. 1 Einkaufspreis zzgl. Nebenkosten bzw. Selbstkosten im Zeitpunkt des Umsatzes; Nr. 2 und 3 die vorsteuerbelasteten Ausgaben (bei Gebäuden verteilt). Steuer jeweils aufschlagen.\n• Entstehung mit Ablauf des VAZ der Wertabgabe (§ 13 Abs. 1 Nr. 2 UStG).",
    ["UStG 3 1b", "UStG 3 9a", "UStG 10 4"],
    M(["Die Warenentnahme für private Zwecke wird einer Lieferung gegen Entgelt gleichgestellt.", "Die Besteuerung setzt voraus, dass der Gegenstand zum Vorsteuerabzug berechtigt hat.", "Bemessungsgrundlage einer Entnahme ist der Einkaufspreis im Zeitpunkt der Entnahme.", "Geschenke von geringem Wert bis 50 € lösen keine Wertabgabe aus."],
      ["Bemessungsgrundlage einer Entnahme ist der Verkaufspreis im Laden.", "Gegenstände, die ohne Vorsteuerabzug erworben wurden, lösen bei Entnahme ebenfalls Umsatzsteuer aus.", "Aufmerksamkeiten an Arbeitnehmer sind stets steuerbar.", "Die private Pkw-Nutzung wird einer Lieferung gleichgestellt."],
      "Welche Aussagen zu unentgeltlichen Wertabgaben sind richtig?"),
    { norm: ["UStG 3|UStG 10"], s: ["entnahme", "vorsteuerabzug berechtigt|vorsteuer", "einkaufspreis", "private verwendung|privat", "50|geringe"] }),
  F("ust-wertabgabe-fall", "ust-wertabgabe", "Liegt eine steuerbare unentgeltliche Wertabgabe vor?",
    ["Ja – nach § 3 Abs. 1b UStG (wie eine Lieferung)", "Ja – nach § 3 Abs. 9a UStG (wie eine sonstige Leistung)", "Nein – keine steuerbare Wertabgabe"], [
      { text: "Eine Bioladenbesitzerin nimmt Lebensmittel aus dem Laden für ihr Familienfest mit (beim Einkauf Vorsteuer abgezogen).", richtig: 0, erkl: "Entnahme für private Zwecke (§ 3 Abs. 1b S. 1 Nr. 1 UStG); BMG Einkaufspreis (§ 10 Abs. 4 Nr. 1 UStG), 7 %.", normen: ["UStG 3 1b", "UStG 10 4"] },
      { text: "Ein Unternehmer nutzt seinen dem Unternehmen zugeordneten Pkw (mit Vorsteuerabzug erworben) auch für Urlaubsfahrten.", richtig: 1, erkl: "Private Verwendung eines Unternehmensgegenstands (§ 3 Abs. 9a Nr. 1 UStG); BMG vorsteuerbelastete Ausgaben (§ 10 Abs. 4 Nr. 2 UStG).", normen: ["UStG 3 9a"] },
      { text: "Ein Arbeitgeber schenkt einer Mitarbeiterin zum Geburtstag einen Blumenstrauß für 35 €.", richtig: 2, erkl: "Aufmerksamkeit bis 60 € (Abschn. 1.8 Abs. 3 UStAE) → nicht steuerbar.", normen: ["UStG 3 1b"] },
      { text: "Ein Händler verschenkt an Kunden Kugelschreiber mit Firmenaufdruck für je 3 €.", richtig: 2, erkl: "Geschenke von geringem Wert (bis 50 €) sind nach § 3 Abs. 1b S. 1 Nr. 3 UStG ausgenommen.", normen: ["UStG 3 1b"] },
      { text: "Ein Bauunternehmer verschenkt Tischsets zu je 120 € an Kunden; beim Kauf war der Vorsteuerabzug nach § 15 Abs. 1a UStG ausgeschlossen.", richtig: 2, erkl: "Ohne Vorsteuerabzug beim Erwerb keine Wertabgabe (§ 3 Abs. 1b S. 2 UStG) – die Belastung ist schon durch den versagten Vorsteuerabzug hergestellt.", normen: ["UStG 3 1b", "UStG 15 1a"] },
      { text: "Mitarbeiter eines Malerbetriebs streichen während der Arbeitszeit das Wohnhaus des Inhabers.", richtig: 1, erkl: "Unentgeltliche sonstige Leistung für private Zwecke (§ 3 Abs. 9a Nr. 2 UStG); BMG die Ausgaben, auch Löhne (§ 10 Abs. 4 Nr. 3 UStG).", normen: ["UStG 3 9a"] },
      { text: "Eine Händlerin nimmt einen Pullover für sich mit, den sie von einer Privatperson ohne Vorsteuerabzug angekauft hatte.", richtig: 2, erkl: "Der Pullover hat nicht zum Vorsteuerabzug berechtigt → § 3 Abs. 1b S. 2 UStG nicht erfüllt.", normen: ["UStG 3 1b"] },
      { text: "Ein Getränkehändler schenkt seinem Lagerarbeiter zum Dienstjubiläum einen Fernseher für 400 € (mit Vorsteuerabzug gekauft).", richtig: 0, erkl: "Zuwendung an das Personal für dessen privaten Bedarf, keine Aufmerksamkeit (§ 3 Abs. 1b S. 1 Nr. 2 UStG).", normen: ["UStG 3 1b"] },
    ]),
  R("ust-entnahme", "ust-wertabgabe", (r) => {
    const [ware, satz] = r.wahl([["Lebensmittel", 7], ["Wein", 19], ["Bücher", 7], ["Textilien", 19], ["Kaffee", 7]]);
    const ek = r.betrag(50, 800, 1), vk = Math.round(ek * r.wahl([1.4, 1.6, 1.8]) * (1 + satz / 100) / 100) * 100, ekAktuell = Math.round(ek * r.wahl([1, 1.05, 1.1]) / 100) * 100;
    const u = Math.round(ekAktuell * satz / 100);
    return {
      text: `Eine Einzelhändlerin entnimmt im Dezember ${ware} aus ihrem Laden für ihre private Weihnachtsfeier. Beim Einkauf hat sie die Vorsteuer abgezogen. Einkaufspreis bei der Anschaffung im Herbst: ${eur(ek)} netto; Einkaufspreis im Zeitpunkt der Entnahme: ${eur(ekAktuell)} netto; Ladenverkaufspreis: ${eur(vk)} brutto.\n\nWie hoch ist die Umsatzsteuer auf die Entnahme (in €)?`,
      cent: u,
      erklaerung: `Entnahme nach § 3 Abs. 1b S. 1 Nr. 1 UStG (Vorsteuerabzug beim Erwerb, S. 2). BMG = Einkaufspreis im Zeitpunkt des Umsatzes (§ 10 Abs. 4 S. 1 Nr. 1 UStG): ${eur(ekAktuell)} – nicht der Verkaufspreis. Steuersatz ${satz} %: USt ${eur(u)}; Entstehung mit Ablauf Dezember (§ 13 Abs. 1 Nr. 2 UStG).`,
      normen: ["UStG 3 1b", "UStG 10 4"],
    };
  }),
];

// ======================================================================= Sonderfälle (GS I)
const sonder = [
  A("ust-kleinunternehmer", "ust-sonder",
    "Erläutern Sie die Kleinunternehmerregelung seit 2025.",
    "• § 19 Abs. 1 UStG: Umsätze eines im Inland ansässigen Kleinunternehmers sind steuerfrei, wenn der Gesamtumsatz im Vorjahr 25.000 € nicht überschritten hat und im laufenden Jahr 100.000 € nicht überschreitet.\n• Gesamtumsatz (§ 19 Abs. 2 UStG): steuerbare Umsätze nach vereinnahmten Entgelten (netto, ohne USt), abzüglich bestimmter steuerfreier Umsätze und der Umsätze mit Anlagevermögen.\n• Wird im laufenden Jahr 100.000 € überschritten, ist bereits der Umsatz, mit dem die Grenze überschritten wird, steuerpflichtig; wird 25.000 € überschritten, entfällt die Regelung erst im Folgejahr. Bei Neugründung gilt im ersten Jahr die Grenze von 25.000 €.\n• Folgen: kein Steuerausweis (sonst § 14c Abs. 2 UStG), kein Vorsteuerabzug (§ 15 Abs. 2 S. 1 Nr. 1 UStG), kein Verzicht nach § 9.\n• Verzicht auf die Regelung möglich (§ 19 Abs. 3 UStG), Bindung für fünf Kalenderjahre.",
    ["UStG 19 1", "UStG 14c 2"],
    M(["Die Vorjahresgrenze beträgt 25.000 €, die Grenze im laufenden Jahr 100.000 €.", "Der Gesamtumsatz wird nach vereinnahmten Entgelten ohne Umsatzsteuer berechnet.", "Kleinunternehmer haben keinen Vorsteuerabzug.", "Weist ein Kleinunternehmer Umsatzsteuer aus, schuldet er sie nach § 14c Abs. 2 UStG."],
      ["Die Umsätze des Kleinunternehmers sind nicht steuerbar.", "Die Grenze im Vorjahr beträgt 50.000 €.", "Kleinunternehmer dürfen Umsatzsteuer ausweisen, müssen sie aber nicht abführen.", "Wird die 100.000-€-Grenze überschritten, ist erst der nächste Umsatz steuerpflichtig."],
      "Welche Aussagen zur Kleinunternehmerregelung seit 2025 sind richtig?"),
    { norm: ["UStG 19"], s: ["25 000|25000", "100 000|100000", "vereinnahmt", "vorsteuer", "steuerfrei"] }),
  F("ust-kleinunternehmer-fall", "ust-sonder", "Sind die Umsätze im laufenden Jahr nach § 19 Abs. 1 UStG steuerfrei?",
    ["Ja – Kleinunternehmerregelung anwendbar", "Nein – nicht (mehr) anwendbar"], [
      { text: "Gesamtumsatz im Vorjahr 23.000 €, im laufenden Jahr voraussichtlich 31.000 €.", richtig: 0, erkl: "Vorjahr ≤ 25.000 € und laufendes Jahr ≤ 100.000 € → anwendbar; erst im Folgejahr scheidet die Regelung aus.", normen: ["UStG 19 1"] },
      { text: "Gesamtumsatz im Vorjahr 26.000 €, im laufenden Jahr voraussichtlich 20.000 €.", richtig: 1, erkl: "Die Vorjahresgrenze von 25.000 € ist überschritten → im laufenden Jahr nicht anwendbar.", normen: ["UStG 19 1"] },
      { text: "Gesamtumsatz im Vorjahr 18.000 €; im laufenden Jahr wird mit einem Auftrag im Oktober die Grenze von 100.000 € überschritten. Gefragt ist nach diesem Oktober-Umsatz.", richtig: 1, erkl: "Bereits der Umsatz, mit dem 100.000 € überschritten werden, ist steuerpflichtig.", normen: ["UStG 19 1"] },
      { text: "Gründung am 01.03. des laufenden Jahres; Gesamtumsatz bis Jahresende 22.000 €.", richtig: 0, erkl: "Bei Neuaufnahme gilt im laufenden Jahr die Grenze von 25.000 € (ohne Hochrechnung) → anwendbar.", normen: ["UStG 19 1"] },
      { text: "Gesamtumsatz im Vorjahr 24.000 € zuzüglich des Verkaufs eines betrieblichen Lieferwagens für 8.000 €.", richtig: 0, erkl: "Umsätze mit Anlagevermögen bleiben beim Gesamtumsatz außer Ansatz (§ 19 Abs. 2 S. 2 UStG) → 24.000 € ≤ 25.000 €.", normen: ["UStG 19 1"] },
    ]),
  A("ust-sonderfaelle", "ust-sonder",
    "Erläutern Sie Werklieferung, Kommissionsgeschäft und Reihengeschäft in ihren Grundzügen.",
    "• Werklieferung (§ 3 Abs. 4 UStG): Der Unternehmer bearbeitet einen fremden Gegenstand und verwendet dabei selbst beschaffte Hauptstoffe → Lieferung (z. B. Einbau einer Heizungsanlage mit eigenem Material). Verwendet er nur Zutaten oder Nebensachen, liegt eine Werkleistung (sonstige Leistung) vor.\n• Kommissionsgeschäft (§ 3 Abs. 3 UStG): Der Kommissionär verkauft im eigenen Namen für fremde Rechnung. Zwischen Kommittent und Kommissionär liegt eine Lieferung vor; bei der Verkaufskommission gilt der Kommissionär als Abnehmer – es gibt also zwei Lieferungen.\n• Reihengeschäft (§ 3 Abs. 6a UStG): Mehrere Unternehmer schließen über denselben Gegenstand Umsatzgeschäfte ab, und der Gegenstand gelangt unmittelbar vom ersten Lieferer zum letzten Abnehmer. Nur eine Lieferung ist die bewegte (Ort nach § 3 Abs. 6), die übrigen sind ruhende Lieferungen (Ort nach § 3 Abs. 7). Befördert der erste Lieferer, ist seine Lieferung die bewegte.\n• Mindestbemessungsgrundlage (§ 10 Abs. 5 UStG): Bei verbilligten Leistungen an nahestehende Personen oder an das Personal sind mindestens die Werte nach § 10 Abs. 4 anzusetzen (höchstens das marktübliche Entgelt).",
    ["UStG 3 4", "UStG 3 3", "UStG 3 6a", "UStG 10 5"],
    M(["Bei einer Werklieferung verwendet der Unternehmer selbst beschaffte Hauptstoffe.", "Beim Kommissionsgeschäft liegt zwischen Kommittent und Kommissionär eine Lieferung vor.", "Beim Reihengeschäft ist nur eine Lieferung die bewegte Lieferung.", "Die Mindestbemessungsgrundlage gilt für verbilligte Leistungen an nahestehende Personen."],
      ["Eine Werklieferung ist immer eine sonstige Leistung.", "Beim Reihengeschäft sind alle Lieferungen bewegte Lieferungen.", "Der Kommissionär erbringt nur eine Vermittlungsleistung.", "Die Mindestbemessungsgrundlage gilt für jeden Verkauf unter Einkaufspreis an fremde Dritte."],
      "Welche Aussagen zu den Sonderfällen sind richtig?"),
    { norm: ["UStG 3"], s: ["werklieferung|hauptstoff", "kommission", "reihengeschaeft", "bewegte", "mindestbemessung|nahestehend"] }),
  R("ust-mindest-bmg", "ust-sonder", (r) => {
    const ek = r.betrag(300, 3000, 10), preis = Math.round(ek * r.wahl([0.4, 0.5, 0.6]) / 100) * 100 * 1.19, entgelt = Math.round(preis / 1.19);
    const u = Math.round(ek * 0.19);
    return {
      text: `Ein Elektrohändler verkauft seinem Sohn, der kein Unternehmer ist, einen Fernseher für ${eur(Math.round(preis))} (brutto). Der Einkaufspreis des Händlers im Zeitpunkt des Verkaufs beträgt ${eur(ek)} netto; der übliche Ladenpreis liegt deutlich darüber.\n\nWie hoch ist die Umsatzsteuer auf den Verkauf (in €)?`,
      cent: u,
      erklaerung: `Entgeltliche Lieferung an eine nahestehende Person. Entgelt ${eur(Math.round(preis))} / 1,19 = ${eur(entgelt)} liegt unter dem Einkaufspreis → Mindestbemessungsgrundlage nach § 10 Abs. 5 i. V. m. Abs. 4 Nr. 1 UStG: ${eur(ek)} (marktübliches Entgelt ist höher, deckelt also nicht). USt 19 % = ${eur(u)}.`,
      normen: ["UStG 10 5", "UStG 10 4"],
    };
  }),
];

// ======================================================================= Klausurfälle
const fall1 = A("ust-fall-feinkost", "ust-befreiung",
  `Klausurfall – Feinkosthändlerin Frieda Falk (FF), Rechtsstand 2026, VAZ = Kalendermonat, Sollbesteuerung, § 19 UStG nicht anwendbar.\nFF betreibt in Kiel ein Feinkostgeschäft im Erdgeschoss ihres eigenen dreigeschossigen Gebäudes (je 150 m²).\n1. Am 14.03. kauft ein Kunde im Laden einen Präsentkorb für 120 € und nimmt ihn mit: Wein 30 €, Käse 25 €, Kaffee 20 €, Honig 15 €, Geschirrtuch 12 €, Korb 18 €.\n2. Am 28.03. verkauft FF einem Gastwirt Parmesan für 4.760 € (brutto). Er zahlt am 30.03. 1.190 € an; FF übergibt die Ware am 02.04. einem Spediteur in Kiel. Der Rest wird am 10.06. mit 50 € Mahngebühren gezahlt.\n3. Das 1. OG vermietet FF für 1.500 € monatlich an eine Physiotherapeutin für deren Praxis, das 2. OG für 1.785 € monatlich an einen Architekten; insoweit hat FF auf die Steuerbefreiung verzichtet.\n4. Am 20.05. erhält FF die Rechnung über eine Dachreparatur vom 15.05.: 9.000 € zzgl. 1.710 € USt.\n\nAufgabe: Beurteilen Sie die Sachverhalte bei FF.`,
  `Vorspann: FF ist Unternehmerin (§ 2 Abs. 1 S. 1, 3 UStG); zum einheitlichen Unternehmen gehören Handel und Vermietung (§ 2 Abs. 1 S. 2). Die Nutzung des EG für den eigenen Laden ist ein nicht steuerbarer Innenumsatz.\n\n1. Präsentkorb: mehrere Lieferungen (§ 3 Abs. 1 UStG), Abholfall, Ort Kiel (§ 3 Abs. 6 S. 1) = Inland (§ 1 Abs. 2 S. 1), gegen Entgelt im Rahmen des Unternehmens → steuerbar (§ 1 Abs. 1 Nr. 1), steuerpflichtig. Steuersatz je Ware:\n• 19 % (§ 12 Abs. 1): Wein, Geschirrtuch, Korb = 60 € → BMG 50,42 €, USt 9,58 €\n• 7 % (§ 12 Abs. 2 Nr. 1, Anlage 2 lfd. Nr. 4, 12): Käse, Kaffee, Honig = 60 € → BMG 56,07 €, USt 3,93 €\nUSt 13,51 € entsteht mit Ablauf März (§ 13 Abs. 1 Nr. 1 a S. 1); Schuldnerin FF (§ 13a Abs. 1 Nr. 1).\n\n2. Parmesan: Lieferung, Versendung → Ort Kiel bei Übergabe an den Spediteur (§ 3 Abs. 6 S. 1, 3, 4), steuerbar, steuerpflichtig, 7 % (Anlage 2 lfd. Nr. 4). BMG 4.760 € / 1,07 = 4.448,60 €, USt 311,40 €.\n• Anzahlung März: 1.190 € × 7/107 = 77,85 € entsteht mit Ablauf März (§ 13 Abs. 1 Nr. 1 a S. 4).\n• Rest 233,55 € mit Ablauf April (Lieferung 02.04., S. 1). Die Restzahlung im Juni ist unerheblich.\n• Mahngebühren: echter Schadensersatz (Abschn. 1.3 UStAE), nicht steuerbar.\n\n3. Vermietung: sonstige Leistungen (§ 3 Abs. 9), Ort Kiel (§ 3a Abs. 3 Nr. 1), steuerbar; monatliche Teilleistungen (§ 13 Abs. 1 Nr. 1 a S. 2, 3).\n• 1. OG: steuerfrei nach § 4 Nr. 12 a; ein Verzicht scheitert an § 9 Abs. 2 (Physiotherapeutin: steuerfreie Heilbehandlungen nach § 4 Nr. 14 a, vorsteuerschädlich). BMG 1.500 €, monatlich Januar–Dezember anzumelden.\n• 2. OG: Verzicht zulässig (§ 9 Abs. 1, 2 – Architekt mit steuerpflichtigen Umsätzen) → steuerpflichtig 19 %: BMG 1.785 € / 1,19 = 1.500 €, USt 285 € je Monat mit Ablauf jedes Monats.\n\n4. Dachreparatur: Leistung von einem Unternehmer für das Unternehmen, Rechnung liegt vor → Vorsteuer 1.710 € (§ 15 Abs. 1 S. 1 Nr. 1). Das Dach dient allen Geschossen: EG (steuerpflichtiger Handel) und 2. OG (steuerpflichtige Vermietung) abziehbar, 1. OG ausgeschlossen (§ 15 Abs. 2 S. 1 Nr. 1, keine Rückausnahme nach Abs. 3). Aufteilung nach Flächen (§ 15 Abs. 4): 1.710 € × 300/450 = 1.140 € abziehbar im VAZ Mai (Leistung und Rechnung liegen vor).`,
  ["UStG 3 6", "UStG 12 2", "UStG 13 1", "UStG 4", "UStG 9 2", "UStG 15 4"],
  M(["Für den Präsentkorb entsteht insgesamt 13,51 € Umsatzsteuer.", "Auf die Anzahlung für den Parmesan entstehen 77,85 € Umsatzsteuer mit Ablauf März.", "Die Vermietung an die Physiotherapeutin ist zwingend steuerfrei.", "Von der Vorsteuer aus der Dachreparatur sind 1.140 € abziehbar."],
    ["Der Präsentkorb ist eine einheitliche Lieferung zu 19 %.", "Die Mahngebühren erhöhen die Bemessungsgrundlage für den Parmesan.", "Die Nutzung des Erdgeschosses für den eigenen Laden ist eine steuerfreie Vermietung.", "Die Vorsteuer aus der Dachreparatur ist voll abziehbar."],
    "Klausurfall Feinkosthändlerin: Welche Aussagen treffen zu?"),
  { norm: ["UStG 4", "UStG 9", "UStG 15"], s: ["mehrere lieferungen|je ware|einzeln", "anzahlung", "schadensersatz", "9 abs 2|vorsteuerschaedlich|heilbehandlung", "aufteil|15 abs 4|flaeche"] },
  { fall: true });

const fall2 = A("ust-fall-aerztin", "ust-vorsteuer",
  `Klausurfall – Zahnärztin Dr. Lena Lorenz (L), Rechtsstand 2026, VAZ = Kalendermonat, Sollbesteuerung.\nL betreibt in Lübeck eine Zahnarztpraxis in gemieteten Räumen. Außerdem gehört ihr eine Ferienwohnung in Travemünde, die sie regelmäßig an Urlauber vermietet.\n1. Am 12.02. behandelt L einen Privatpatienten; die Rechnung über 450 € vom 01.03. wird am 20.03. bezahlt.\n2. L kauft am 05.03. einen Behandlungsstuhl (Lieferung und Rechnung am 05.03.: 12.000 € zzgl. 2.280 € USt), bezahlt am 02.04.\n3. Ihren alten Behandlungsstuhl, den sie nur für Behandlungen genutzt hat, verkauft L an einen Kollegen in Hamburg; ein Spediteur holt ihn am 28.03. ab und liefert am 01.04. Kaufpreis 1.500 €.\n4. Die Ferienwohnung vermietet L vom 25.07. bis 08.08. an eine Familie aus Dänemark für 1.284 €; Anzahlung 428 € am 15.06., Rest am 25.07.\n5. Für die Ferienwohnung kauft sie am 10.05. neue Betten (Rechnung 2.000 € zzgl. 380 € USt, Lieferung und Zahlung am 10.05.).\n\nAufgabe: Beurteilen Sie die Sachverhalte bei L.`,
  `Vorspann: L ist Unternehmerin (§ 2 Abs. 1 S. 1, 3 UStG); Praxis und Ferienwohnung bilden ein Unternehmen (§ 2 Abs. 1 S. 2).\n\n1. Behandlung: sonstige Leistung (§ 3 Abs. 9), Ort Lübeck (§ 3a Abs. 1 – B2C), steuerbar; Heilbehandlung im Bereich der Humanmedizin → steuerfrei nach § 4 Nr. 14 a. BMG 450 € (§ 10 Abs. 1), anzumelden im VAZ Februar (Ausführung 12.02.; Rechnung und Zahlung unerheblich).\n\n2. Behandlungsstuhl: Lieferung von einem Unternehmer für das Unternehmen, Rechnung liegt vor → grundsätzlich Vorsteuer 2.280 €; aber Verwendung für steuerfreie Heilbehandlungen → Ausschluss nach § 15 Abs. 2 S. 1 Nr. 1, keine Rückausnahme (Abs. 3). Kein Vorsteuerabzug.\n\n3. Verkauf des alten Stuhls: Hilfsgeschäft im Rahmen des Unternehmens (Abschn. 2.7 Abs. 2 UStAE); Lieferung, Versendung → Ort Lübeck bei Übergabe an den Spediteur am 28.03. (§ 3 Abs. 6 S. 1, 3, 4), steuerbar. Steuerfrei nach § 4 Nr. 28 (ausschließlich für steuerfreie Umsätze verwendet). BMG 1.500 €, VAZ März.\n\n4. Ferienwohnung: sonstige Leistung, Ort Travemünde (§ 3a Abs. 3 Nr. 1), steuerbar; kurzfristige Beherbergung → nicht befreit (§ 4 Nr. 12 S. 2), 7 % (§ 12 Abs. 2 Nr. 11). BMG 1.284 € / 1,07 = 1.200 €, USt 84 €.\n• Anzahlung 428 € × 7/107 = 28 € entsteht mit Ablauf Juni (§ 13 Abs. 1 Nr. 1 a S. 4).\n• Rest 856 € ebenfalls vor Vollendung (08.08.) am 25.07. vereinnahmt → 56 € mit Ablauf Juli (S. 4). Mit Ablauf August (Ausführung, S. 1) entsteht keine weitere Steuer.\n\n5. Betten: Lieferung für das Unternehmen, Verwendung für die steuerpflichtige Ferienvermietung → Vorsteuer 380 € voll abziehbar (§ 15 Abs. 1 S. 1 Nr. 1) im VAZ Mai.`,
  ["UStG 4", "UStG 15 2", "UStG 3a 3", "UStG 12 2", "UStG 13 1"],
  M(["Die Behandlung ist im VAZ Februar als steuerfreier Umsatz anzumelden.", "Aus dem Kauf des Behandlungsstuhls hat L keinen Vorsteuerabzug.", "Der Verkauf des alten Behandlungsstuhls ist nach § 4 Nr. 28 UStG steuerfrei.", "Für die Ferienwohnung entstehen insgesamt 84 € Umsatzsteuer."],
    ["Die Behandlung ist erst im VAZ März anzumelden, weil dann die Rechnung erteilt wurde.", "Die Vermietung der Ferienwohnung ist nach § 4 Nr. 12 a UStG steuerfrei.", "Der Verkauf des alten Stuhls ist nicht steuerbar, weil er kein Grundgeschäft ist.", "Die Vorsteuer aus den Betten ist nach § 15 Abs. 2 UStG ausgeschlossen."],
    "Klausurfall Zahnärztin: Welche Aussagen treffen zu?"),
  { norm: ["UStG 4", "UStG 15"], s: ["heilbehandlung|14", "28", "15 abs 2|ausgeschlossen|kein vorsteuer", "kurzfristig|beherberg", "anzahlung"] },
  { fall: true });

export const UST_AUFGABEN = [
  ...grundlagen, ...leistung, ...ort, ...entgelt, ...befreiung, fall1, ...bmg, ...entstehung, ...vorsteuer, fall2, ...wertabgabe, ...sonder,
];
export const MC_UST = Object.fromEntries(UST_AUFGABEN.filter((v) => v.mc).map((v) => [v.id, v.mc]));
export const SW_UST = Object.fromEntries(UST_AUFGABEN.filter((v) => v.sw).map((v) => [v.id, v.sw]));
