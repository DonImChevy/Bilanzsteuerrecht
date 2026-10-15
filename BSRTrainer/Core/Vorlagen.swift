import Foundation

/// Eine Aufgabenvorlage erzeugt bei jedem Aufruf eine neue Aufgabe mit zufälligen Beträgen.
public struct Vorlage: Identifiable {
    public let id: String
    public let thema: Thema
    public let erzeugen: (inout Zufall) -> Frage

    public init(_ id: String, _ thema: Thema, _ erzeugen: @escaping (inout Zufall) -> Frage) {
        self.id = id
        self.thema = thema
        self.erzeugen = erzeugen
    }
}

/// Auswirkung eines Geschäftsvorfalls auf die Bilanz (Skript Teil I, Kap. U).
public enum Bilanzwirkung: String, CaseIterable {
    case aktivtausch = "Aktivtausch"
    case passivtausch = "Passivtausch"
    case mehrung = "Aktiv-Passiv-Mehrung"
    case minderung = "Aktiv-Passiv-Minderung"
    case aufwand = "BV-Minderung – Aufwand (erfolgswirksam)"
    case ertrag = "BV-Mehrung – Ertrag (erfolgswirksam)"
    case entnahme = "BV-Minderung – Entnahme (privat veranlasst)"
    case einlage = "BV-Mehrung – Einlage (privat veranlasst)"

    public var erklaerung: String {
        switch self {
        case .aktivtausch: return "Nur die Aktivseite ändert sich, die Bilanzsumme bleibt gleich; erfolgsneutral."
        case .passivtausch: return "Nur die Passivseite ändert sich, die Bilanzsumme bleibt gleich; erfolgsneutral."
        case .mehrung: return "Aktiv- und Passivseite steigen; Bilanzsumme erhöht sich; erfolgsneutral."
        case .minderung: return "Aktiv- und Passivseite sinken; Bilanzsumme vermindert sich; erfolgsneutral."
        case .aufwand: return "Betrieblich veranlasste Minderung des Betriebsvermögens – mindert den Gewinn."
        case .ertrag: return "Betrieblich veranlasste Mehrung des Betriebsvermögens – erhöht den Gewinn."
        case .entnahme: return "Privat veranlasste BV-Minderung – i.d.R. erfolgsneutral (§ 4 I 2 EStG)."
        case .einlage: return "Privat veranlasste BV-Mehrung – i.d.R. erfolgsneutral (§ 4 I 8 EStG)."
        }
    }
}

// MARK: - Hilfsfunktionen

enum H {
    static func eur(_ d: Decimal) -> String { Geld.euro(d) }
    static func ust(_ netto: Decimal, _ satz: Decimal = 19) -> Decimal { Geld.prozent(netto, satz) }

    static func buchung(_ id: String, _ thema: Thema, _ text: String, _ satz: Buchungssatz,
                        _ erklaerung: String, alternativen: [Buchungssatz] = [], quelle: String? = nil) -> Frage {
        Frage(id: id, thema: thema, text: text, typ: .buchung(BuchungsAufgabe([satz] + alternativen)),
              erklaerung: erklaerung, quelle: quelle)
    }

    static func zahl(_ id: String, _ thema: Thema, _ text: String, _ loesung: Decimal, einheit: String = "€",
                     toleranz: Decimal = Geld.cent(1), _ erklaerung: String, quelle: String? = nil) -> Frage {
        Frage(id: id, thema: thema, text: text,
              typ: .zahl(ZahlAufgabe(loesung: loesung, einheit: einheit, toleranz: toleranz)),
              erklaerung: erklaerung, quelle: quelle)
    }

    static func auswahl(_ id: String, _ thema: Thema, _ text: String, _ optionen: [String], richtig: Set<Int>,
                        _ erklaerung: String, quelle: String? = nil, rng: inout Zufall) -> Frage {
        let aufgabe = AuswahlAufgabe(optionen: optionen, richtig: richtig).gemischt(&rng)
        return Frage(id: id, thema: thema, text: text, typ: .auswahl(aufgabe), erklaerung: erklaerung, quelle: quelle)
    }
}

// MARK: - Geschäftsvorfälle ohne Umsatzsteuer (für Bestandskonten und Bilanzveränderungen)

/// Ein einfacher Geschäftsvorfall, der sowohl als Buchungs- als auch als Klassifizierungsaufgabe dient.
struct Vorfall {
    let id: String
    let text: (Decimal) -> String
    let satz: (Decimal) -> Buchungssatz
    let wirkung: Bilanzwirkung
    let erklaerung: String
    let von: Int
    let bis: Int
}

enum Vorfaelle {
    static let alle: [Vorfall] = [
        Vorfall(id: "bareinzahlung",
                text: { "Der Unternehmer zahlt \(H.eur($0)) aus der Geschäftskasse auf das betriebliche Bankkonto ein." },
                satz: { Buchungssatz(.bank, an: .kasse, $0) },
                wirkung: .aktivtausch,
                erklaerung: "Bank (Aktivkonto) nimmt zu → Soll. Kasse (Aktivkonto) nimmt ab → Haben.",
                von: 200, bis: 5_000),
        Vorfall(id: "barabhebung",
                text: { "Barabhebung vom betrieblichen Bankkonto i.H.v. \(H.eur($0)) für die Geschäftskasse." },
                satz: { Buchungssatz(.kasse, an: .bank, $0) },
                wirkung: .aktivtausch,
                erklaerung: "Kasse nimmt zu → Soll. Bank nimmt ab → Haben.",
                von: 200, bis: 3_000),
        Vorfall(id: "kunde-zahlt",
                text: { "Ein Kunde begleicht eine bereits gebuchte Forderung aus L.u.L. über \(H.eur($0)) durch Banküberweisung." },
                satz: { Buchungssatz(.bank, an: .forderungenLuL, $0) },
                wirkung: .aktivtausch,
                erklaerung: "Bank nimmt zu → Soll. Die Forderung erlischt (Abgang Aktivkonto) → Haben.",
                von: 500, bis: 20_000),
        Vorfall(id: "lieferant-bezahlen",
                text: { "Eine Verbindlichkeit aus L.u.L. über \(H.eur($0)) wird per Banküberweisung beglichen." },
                satz: { Buchungssatz(.verbindlichkeitenLuL, an: .bank, $0) },
                wirkung: .minderung,
                erklaerung: "Verbindlichkeit (Passivkonto) nimmt ab → Soll. Bank nimmt ab → Haben.",
                von: 500, bis: 20_000),
        Vorfall(id: "darlehen-tilgen",
                text: { "Ein Bankdarlehen wird i.H.v. \(H.eur($0)) durch Banküberweisung getilgt (Zinsen sind nicht angefallen)." },
                satz: { Buchungssatz(.darlehensverbindlichkeiten, an: .bank, $0) },
                wirkung: .minderung,
                erklaerung: "Darlehensverbindlichkeit nimmt ab → Soll. Bank nimmt ab → Haben. Die Tilgung ist kein Aufwand.",
                von: 1_000, bis: 30_000),
        Vorfall(id: "darlehen-aufnehmen",
                text: { "Das Unternehmen nimmt ein Darlehen über \(H.eur($0)) auf; der Betrag wird dem Bankkonto gutgeschrieben." },
                satz: { Buchungssatz(.bank, an: .darlehensverbindlichkeiten, $0) },
                wirkung: .mehrung,
                erklaerung: "Bank nimmt zu → Soll. Darlehensverbindlichkeit nimmt zu → Haben.",
                von: 5_000, bis: 100_000),
        Vorfall(id: "umschuldung",
                text: { "Eine Verbindlichkeit aus L.u.L. über \(H.eur($0)) wird auf Wunsch des Lieferanten in ein langfristiges Darlehen umgewandelt." },
                satz: { Buchungssatz(.verbindlichkeitenLuL, an: .darlehensverbindlichkeiten, $0) },
                wirkung: .passivtausch,
                erklaerung: "Verbindlichkeit aus L.u.L. nimmt ab → Soll. Darlehensverbindlichkeit nimmt zu → Haben.",
                von: 2_000, bis: 30_000),
        Vorfall(id: "darlehensschuldner",
                text: { "Ein Darlehensschuldner des Unternehmens zahlt sein Darlehen über \(H.eur($0)) per Banküberweisung zurück." },
                satz: { Buchungssatz(.bank, an: .darlehensforderungen, $0) },
                wirkung: .aktivtausch,
                erklaerung: "Bank nimmt zu → Soll. Die Darlehensforderung (Aktivkonto) erlischt → Haben.",
                von: 1_000, bis: 20_000),
        Vorfall(id: "grundstueck",
                text: { "Kauf eines unbebauten Betriebsgrundstücks (Grund und Boden) für \(H.eur($0)) gegen Banküberweisung. Die Umsatzsteuer ist nicht zu berücksichtigen (§ 4 Nr. 9a UStG)." },
                satz: { Buchungssatz(.grundUndBoden, an: .bank, $0) },
                wirkung: .aktivtausch,
                erklaerung: "Grund und Boden (Anlagevermögen) nimmt zu → Soll. Bank nimmt ab → Haben.",
                von: 20_000, bis: 200_000),
        Vorfall(id: "zinsen-zahlen",
                text: { "Darlehenszinsen i.H.v. \(H.eur($0)) werden per Banküberweisung gezahlt." },
                satz: { Buchungssatz(.zinsaufwendungen, an: .bank, $0) },
                wirkung: .aufwand,
                erklaerung: "Zinsen sind Aufwand (Soll). Bank nimmt ab → Haben.",
                von: 100, bis: 3_000),
        Vorfall(id: "zinsgutschrift",
                text: { "Die Bank schreibt dem Geschäftskonto Zinsen i.H.v. \(H.eur($0)) gut." },
                satz: { Buchungssatz(.bank, an: .zinsertraege, $0) },
                wirkung: .ertrag,
                erklaerung: "Bank nimmt zu → Soll. Zinserträge sind Ertrag → Haben.",
                von: 100, bis: 800),
        Vorfall(id: "barentnahme",
                text: { "Der Inhaber entnimmt der Geschäftskasse \(H.eur($0)) für private Zwecke." },
                satz: { Buchungssatz(.privatentnahmen, an: .kasse, $0) },
                wirkung: .entnahme,
                erklaerung: "Privatentnahmen (Unterkonto EK) im Soll. Kasse nimmt ab → Haben. Erfolgsneutral.",
                von: 100, bis: 5_000),
        Vorfall(id: "geldeinlage",
                text: { "Der Inhaber legt \(H.eur($0)) aus seinem Privatvermögen in die Geschäftskasse ein." },
                satz: { Buchungssatz(.kasse, an: .privateinlagen, $0) },
                wirkung: .einlage,
                erklaerung: "Kasse nimmt zu → Soll. Privateinlagen (Unterkonto EK) im Haben. Erfolgsneutral.",
                von: 500, bis: 10_000),
        Vorfall(id: "ladenmiete",
                text: { "Die Ladenmiete i.H.v. \(H.eur($0)) wird vom Geschäftskonto überwiesen (umsatzsteuerfrei)." },
                satz: { Buchungssatz(.mietaufwendungen, an: .bank, $0) },
                wirkung: .aufwand,
                erklaerung: "Mietaufwendungen im Soll, Bank im Haben.",
                von: 500, bis: 4_000),
    ]
}

// MARK: - Vorlagen

public enum Vorlagen {

    public static let alle: [Vorlage] =
        bestandskonten + bilanzveraenderungen + erfolgskonten + privatkonten + warenkonten
        + warenunterkonten + umsatzsteuer + abschluss + kalkulation + gewinnermittlung

    // MARK: Bestandskonten

    static let bestandskonten: [Vorlage] = {
        let bestand = ["bareinzahlung", "barabhebung", "kunde-zahlt", "lieferant-bezahlen", "darlehen-tilgen",
                       "darlehen-aufnehmen", "umschuldung", "darlehensschuldner", "grundstueck"]
        var liste: [Vorlage] = Vorfaelle.alle.filter { bestand.contains($0.id) }.map { v in
            Vorlage("bk-\(v.id)", .bestandskonten) { rng in
                let b = rng.betrag(v.von, v.bis, raster: 100)
                return H.buchung("bk-\(v.id)", .bestandskonten, v.text(b), v.satz(b), v.erklaerung)
            }
        }

        liste.append(Vorlage("bk-teilzahlung", .bestandskonten) { rng in
            let bar = rng.betrag(100, 2_000, raster: 100)
            let bank = rng.betrag(500, 8_000, raster: 100)
            return H.buchung("bk-teilzahlung", .bestandskonten,
                             "Ein Kunde begleicht unsere Forderung aus L.u.L. über \(H.eur(bar + bank)): \(H.eur(bar)) bar und \(H.eur(bank)) per Banküberweisung.",
                             Buchungssatz([(.kasse, bar), (.bank, bank)], an: [(.forderungenLuL, bar + bank)]),
                             "Zusammengesetzter Buchungssatz: Summe Soll = Summe Haben. Kasse und Bank nehmen zu, die Forderung erlischt.",
                             quelle: "Skript Teil I, Zusammengesetzter Buchungssatz")
        })

        liste.append(Vorlage("bk-anlage-ziel", .bestandskonten) { rng in
            let (konto, gegenstand) = rng.wahl([(Konto.bga, "eine Regalanlage für den Verkaufsraum"),
                                                (Konto.maschinen, "eine Verpackungsmaschine"),
                                                (Konto.fuhrpark, "einen Lieferwagen")])
            let netto = rng.betrag(2_000, 40_000, raster: 100)
            let ust = H.ust(netto)
            return H.buchung("bk-anlage-ziel", .bestandskonten,
                             "Kauf auf Ziel: \(gegenstand) für \(H.eur(netto)) zzgl. 19 % USt (\(H.eur(ust))).",
                             Buchungssatz([(konto, netto), (.vorsteuer, ust)], an: [(.verbindlichkeitenLuL, netto + ust)]),
                             "Das Anlagegut wird mit den Anschaffungskosten (netto) aktiviert. Die abziehbare Vorsteuer ist eine Forderung gegenüber dem FA. Gegenkonto: Verbindlichkeiten aus L.u.L. (brutto).")
        })
        return liste
    }()

    // MARK: Bilanzveränderungen (Klassifizierung)

    static let bilanzveraenderungen: [Vorlage] = [
        Vorlage("bv-klassifizieren", .bilanzveraenderungen) { rng in
            let v = rng.wahl(Vorfaelle.alle)
            let b = rng.betrag(v.von, v.bis, raster: 100)
            var optionen = [v.wirkung]
            let andere = Bilanzwirkung.allCases.filter { $0 != v.wirkung }.shuffled(using: &rng)
            optionen += andere.prefix(3)
            optionen.shuffle(using: &rng)
            let richtig = optionen.firstIndex(of: v.wirkung)!
            return Frage(id: "bv-klassifizieren", thema: .bilanzveraenderungen,
                         text: "Wie wirkt sich der Geschäftsvorfall auf die Bilanz aus?\n\n\(v.text(b))",
                         typ: .auswahl(AuswahlAufgabe(optionen: optionen.map(\.rawValue), richtig: [richtig])),
                         erklaerung: "Buchungssatz: \(v.satz(b).text)\n\n\(v.wirkung.rawValue): \(v.wirkung.erklaerung)",
                         quelle: "Skript Teil I, Kap. U – Übersicht Veränderungen des Bilanzbildes")
        },
        Vorlage("bv-erfolgswirksam", .bilanzveraenderungen) { rng in
            let v = rng.wahl(Vorfaelle.alle)
            let b = rng.betrag(v.von, v.bis, raster: 100)
            let wirksam = v.wirkung == .aufwand || v.wirkung == .ertrag
            return Frage(id: "bv-erfolgswirksam", thema: .bilanzveraenderungen,
                         text: "Ist der folgende Geschäftsvorfall erfolgswirksam?\n\n\(v.text(b))",
                         typ: .auswahl(AuswahlAufgabe(optionen: ["Ja, erfolgswirksam", "Nein, erfolgsneutral"],
                                                      richtig: [wirksam ? 0 : 1])),
                         erklaerung: "\(v.wirkung.rawValue): \(v.wirkung.erklaerung)\n\nBuchungssatz: \(v.satz(b).text)")
        },
    ]

    // MARK: Erfolgskonten

    static let erfolgskonten: [Vorlage] = [
        Vorlage("ek-zinsen", .erfolgskonten) { rng in
            let b = rng.betrag(100, 3_000, raster: 10)
            return H.buchung("ek-zinsen", .erfolgskonten,
                             "Darlehenszinsen i.H.v. \(H.eur(b)) werden per Banküberweisung gezahlt.",
                             Buchungssatz(.zinsaufwendungen, an: .bank, b),
                             "Zinsen sind Aufwand → Soll. Bank nimmt ab → Haben. Zinsen sind umsatzsteuerlich irrelevant (keine Vorsteuer).")
        },
        Vorlage("ek-zinsgutschrift", .erfolgskonten) { rng in
            let b = rng.betrag(10, 600, raster: 5)
            return H.buchung("ek-zinsgutschrift", .erfolgskonten,
                             "Die Bank schreibt Guthabenzinsen i.H.v. \(H.eur(b)) gut.",
                             Buchungssatz(.bank, an: .zinsertraege, b),
                             "Bank nimmt zu → Soll. Zinserträge → Haben.")
        },
        Vorlage("ek-miete", .erfolgskonten) { rng in
            let b = rng.betrag(500, 4_000, raster: 50)
            return H.buchung("ek-miete", .erfolgskonten,
                             "Die Ladenmiete für den laufenden Monat über \(H.eur(b)) wird vom Geschäftskonto überwiesen. Der Vermieter hat nicht zur Umsatzsteuer optiert.",
                             Buchungssatz(.mietaufwendungen, an: .bank, b),
                             "Mietaufwendungen → Soll, Bank → Haben. Ohne Option (§ 9 UStG) ist die Vermietung steuerfrei (§ 4 Nr. 12 UStG), es gibt keine Vorsteuer.")
        },
        Vorlage("ek-miete-ust", .erfolgskonten) { rng in
            let netto = rng.betrag(500, 3_000, raster: 50)
            let ust = H.ust(netto)
            return H.buchung("ek-miete-ust", .erfolgskonten,
                             "Die Büromiete für Dezember wird per Bank überwiesen: \(H.eur(netto)) zzgl. 19 % USt (\(H.eur(ust))). Der Vermieter hat wirksam zur Umsatzsteuer optiert.",
                             Buchungssatz([(.mietaufwendungen, netto), (.vorsteuer, ust)], an: [(.bank, netto + ust)]),
                             "Aufwand in Höhe des Nettobetrags, die Vorsteuer ist abziehbar.",
                             quelle: "Übung Wiederholung, Tz. 5")
        },
        Vorlage("ek-telefon", .erfolgskonten) { rng in
            let netto = rng.betrag(40, 600, raster: 10)
            let ust = H.ust(netto)
            return H.buchung("ek-telefon", .erfolgskonten,
                             "Die Telefonrechnung über \(H.eur(netto)) zzgl. \(H.eur(ust)) USt wird per Bank bezahlt.",
                             Buchungssatz([(.telefon, netto), (.vorsteuer, ust)], an: [(.bank, netto + ust)]),
                             "Nettomethode: Aufwand (netto) und Vorsteuer werden getrennt gebucht.",
                             quelle: "Übung USt-/Vorsteuerkonten, Tz. 2")
        },
        Vorlage("ek-kfz", .erfolgskonten) { rng in
            let netto = rng.betrag(100, 1_500, raster: 10)
            let ust = H.ust(netto)
            return H.buchung("ek-kfz", .erfolgskonten,
                             "Die Inspektion des betrieblichen Lieferwagens kostet \(H.eur(netto)) zzgl. 19 % USt und wird bar bezahlt.",
                             Buchungssatz([(.kfzKosten, netto), (.vorsteuer, ust)], an: [(.kasse, netto + ust)]),
                             "Kfz-Kosten (Aufwand) netto im Soll, Vorsteuer im Soll, Kasse brutto im Haben.",
                             quelle: "Skript Teil I, Auswirkungen von Buchungen – Beispiel 1")
        },
        Vorlage("ek-buero-brutto", .erfolgskonten) { rng in
            let netto = rng.betrag(20, 400, raster: 10)
            let ust = H.ust(netto)
            return H.buchung("ek-buero-brutto", .erfolgskonten,
                             "Büromaterial wird bar eingekauft. Der Kassenbon lautet über \(H.eur(netto + ust)) einschließlich 19 % USt.",
                             Buchungssatz([(.buerobedarf, netto), (.vorsteuer, ust)], an: [(.kasse, netto + ust)]),
                             "Herausrechnen der USt: Brutto ÷ 1,19 = Netto (\(H.eur(netto))); USt = Brutto × 19/119 (\(H.eur(ust))).")
        },
        Vorlage("ek-provision", .erfolgskonten) { rng in
            let netto = rng.betrag(300, 5_000, raster: 50)
            let ust = H.ust(netto)
            return H.buchung("ek-provision", .erfolgskonten,
                             "Für eine Vermittlung erhält der Unternehmer eine Provision von \(H.eur(netto)) zzgl. 19 % USt auf das Geschäftskonto.",
                             Buchungssatz([(.bank, netto + ust)], an: [(.provisionserloese, netto), (.umsatzsteuer, ust)]),
                             "Bank brutto im Soll; Provisionserlöse (netto) und Umsatzsteuer im Haben.")
        },
        Vorlage("ek-anwalt", .erfolgskonten) { rng in
            let netto = rng.betrag(200, 3_000, raster: 100)
            let ust = H.ust(netto)
            return H.buchung("ek-anwalt", .erfolgskonten,
                             "Rechtsanwaltskosten über \(H.eur(netto + ust)) einschließlich 19 % USt werden durch Banküberweisung bezahlt.",
                             Buchungssatz([(.rechtsBeratung, netto), (.vorsteuer, ust)], an: [(.bank, netto + ust)]),
                             "Netto = \(H.eur(netto + ust)) ÷ 1,19 = \(H.eur(netto)); Vorsteuer \(H.eur(ust)).",
                             quelle: "Übung Buchungen – Auswirkungen auf GuV/BVV, Tz. 6")
        },
        Vorlage("ek-reparatur", .erfolgskonten) { rng in
            let netto = rng.betrag(150, 4_000, raster: 50)
            let ust = H.ust(netto)
            return H.buchung("ek-reparatur", .erfolgskonten,
                             "Ein Handwerker repariert die Ladeneinrichtung und stellt \(H.eur(netto)) zzgl. 19 % USt in Rechnung. Die Rechnung wird erst im nächsten Monat bezahlt.",
                             Buchungssatz([(.reparatur, netto), (.vorsteuer, ust)], an: [(.verbindlichkeitenLuL, netto + ust)]),
                             "Erhaltungsaufwand → Reparaturaufwendungen. Noch nicht bezahlt → Verbindlichkeiten aus L.u.L.")
        },
        Vorlage("ek-energie", .erfolgskonten) { rng in
            let netto = rng.betrag(100, 2_000, raster: 10)
            let ust = H.ust(netto)
            return H.buchung("ek-energie", .erfolgskonten,
                             "Die Stromrechnung für die Geschäftsräume über \(H.eur(netto)) zzgl. \(H.eur(ust)) USt wird abgebucht.",
                             Buchungssatz([(.energie, netto), (.vorsteuer, ust)], an: [(.bank, netto + ust)]),
                             "Energieaufwendungen (netto) und Vorsteuer im Soll, Bank im Haben.")
        },
        Vorlage("ek-hotel", .erfolgskonten) { rng in
            let netto = rng.betrag(80, 600, raster: 10)
            let ust = H.ust(netto, 7)
            return H.buchung("ek-hotel", .erfolgskonten,
                             "Auf einer Geschäftsreise zahlt der Unternehmer die Hotelübernachtung (ohne Frühstück) bar: \(H.eur(netto)) zzgl. 7 % USt.",
                             Buchungssatz([(.reisekosten, netto), (.vorsteuer, ust)], an: [(.kasse, netto + ust)]),
                             "Übernachtungsleistungen unterliegen dem ermäßigten Steuersatz von 7 % (§ 12 II Nr. 11 UStG). Vorsteuer = \(H.eur(ust)).")
        },
        Vorlage("ek-mietertrag", .erfolgskonten) { rng in
            let b = rng.betrag(300, 2_500, raster: 50)
            return H.buchung("ek-mietertrag", .erfolgskonten,
                             "Ein Mieter überweist die Monatsmiete für eine zum Betriebsvermögen gehörende Wohnung über \(H.eur(b)) auf das Geschäftskonto (umsatzsteuerfrei).",
                             Buchungssatz(.bank, an: .mietertraege, b),
                             "Bank → Soll, Mieterträge → Haben. Wohnungsvermietung ist nach § 4 Nr. 12 UStG steuerfrei.")
        },
    ]

    // MARK: Privatkonten

    static let privatkonten: [Vorlage] = [
        Vorlage("pk-barentnahme", .privatkonten) { rng in
            let b = rng.betrag(100, 5_000, raster: 50)
            return H.buchung("pk-barentnahme", .privatkonten,
                             "Der Inhaber entnimmt für seinen Lebensunterhalt \(H.eur(b)) aus der Ladenkasse.",
                             Buchungssatz(.privatentnahmen, an: .kasse, b),
                             "Privat veranlasste BV-Minderung → Privatentnahmen (Soll). Erfolgsneutral.",
                             quelle: "Übung Einführung Privatkonten, Tz. 1")
        },
        Vorlage("pk-geldeinlage", .privatkonten) { rng in
            let b = rng.betrag(500, 10_000, raster: 100)
            let (konto, text) = rng.wahl([(Konto.kasse, "in die Geschäftskasse"), (Konto.bank, "auf das betriebliche Bankkonto")])
            return H.buchung("pk-geldeinlage", .privatkonten,
                             "Der Inhaber zahlt \(H.eur(b)) aus seinem Privatvermögen \(text) ein.",
                             Buchungssatz(konto, an: .privateinlagen, b),
                             "Privat veranlasste BV-Mehrung → Privateinlagen (Haben). Erfolgsneutral.")
        },
        Vorlage("pk-krankenkasse", .privatkonten) { rng in
            let b = rng.betrag(200, 1_200, raster: 10)
            return H.buchung("pk-krankenkasse", .privatkonten,
                             "Der Beitrag zur privaten Krankenversicherung des Inhabers über \(H.eur(b)) wird vom Geschäftskonto überwiesen.",
                             Buchungssatz(.privatentnahmen, an: .bank, b),
                             "Private Ausgaben, die vom Betriebskonto bezahlt werden, sind Entnahmen – keine Betriebsausgaben.",
                             quelle: "Übung Privatkonten – Journal/Konten, Tz. 3")
        },
        Vorlage("pk-est", .privatkonten) { rng in
            let b = rng.betrag(500, 8_000, raster: 100)
            return H.buchung("pk-est", .privatkonten,
                             "Die Einkommensteuer-Vorauszahlung des Inhabers über \(H.eur(b)) wird vom betrieblichen Bankkonto an das Finanzamt überwiesen.",
                             Buchungssatz(.privatentnahmen, an: .bank, b),
                             "Die Einkommensteuer ist eine Personensteuer des Inhabers und damit privat (§ 12 Nr. 3 EStG) → Privatentnahme.")
        },
        Vorlage("pk-miete-privat", .privatkonten) { rng in
            let b = rng.betrag(500, 4_000, raster: 100)
            return H.buchung("pk-miete-privat", .privatkonten,
                             "Die (umsatzsteuerfreie) Büromiete über \(H.eur(b)) wird vom privaten Bankkonto des Inhabers überwiesen.",
                             Buchungssatz(.mietaufwendungen, an: .privateinlagen, b),
                             "Betrieblicher Aufwand, bezahlt mit privaten Mitteln → Gegenkonto Privateinlagen.",
                             quelle: "Übung Buchungen – Auswirkungen auf GuV/BVV, Tz. 5")
        },
        Vorlage("pk-benzin-privat", .privatkonten) { rng in
            let netto = rng.betrag(40, 150, raster: 5)
            let ust = H.ust(netto)
            return H.buchung("pk-benzin-privat", .privatkonten,
                             "Der Inhaber tankt den betrieblichen Lieferwagen und bezahlt mit privatem Geld: \(H.eur(netto)) zzgl. \(H.eur(ust)) USt (ordnungsgemäße Rechnung liegt vor).",
                             Buchungssatz([(.kfzKosten, netto), (.vorsteuer, ust)], an: [(.privateinlagen, netto + ust)]),
                             "Betrieblicher Aufwand mit Vorsteuerabzug; bezahlt aus privaten Mitteln → Privateinlage in Höhe des Bruttobetrags.")
        },
        Vorlage("pk-provision-privat", .privatkonten) { rng in
            let netto = rng.betrag(300, 3_000, raster: 100)
            let ust = H.ust(netto)
            return H.buchung("pk-provision-privat", .privatkonten,
                             "Eine betriebliche Vermittlungsprovision von \(H.eur(netto)) zzgl. 19 % USt geht auf dem privaten Bankkonto des Inhabers ein.",
                             Buchungssatz([(.privatentnahmen, netto + ust)], an: [(.provisionserloese, netto), (.umsatzsteuer, ust)]),
                             "Betrieblicher Ertrag, das Geld fließt aber ins Privatvermögen → Gegenkonto Privatentnahmen (brutto).",
                             quelle: "Skript Teil I, Auswirkungen von Buchungen – Beispiel 2")
        },
        Vorlage("pk-warenentnahme", .privatkonten) { rng in
            let netto = rng.betrag(50, 1_500, raster: 10)
            let ust = H.ust(netto)
            return H.buchung("pk-warenentnahme", .privatkonten,
                             "Der Inhaber entnimmt Waren für private Zwecke. Einkaufspreis (= Wiederbeschaffungskosten) netto: \(H.eur(netto)). Die Waren berechtigten beim Einkauf zum vollen Vorsteuerabzug.",
                             Buchungssatz([(.privatentnahmen, netto + ust)], an: [(.warenentnahmen, netto), (.umsatzsteuer, ust)]),
                             "Unentgeltliche Wertabgabe (§ 3 Ib Nr. 1 UStG), Bemessungsgrundlage = Einkaufspreis (§ 10 IV Nr. 1 UStG). Ertragskonto Warenentnahmen laut Kontenplan, USt \(H.eur(ust)).")
        },
    ]

    // MARK: Warenkonten

    static let warenkonten: [Vorlage] = [
        Vorlage("wk-einkauf-ziel", .warenkonten) { rng in
            let netto = rng.betrag(500, 30_000, raster: 100)
            let ust = H.ust(netto)
            return H.buchung("wk-einkauf-ziel", .warenkonten,
                             "Wareneinkauf auf Ziel: \(H.eur(netto)) zzgl. 19 % USt.",
                             Buchungssatz([(.wareneingang, netto), (.vorsteuer, ust)], an: [(.verbindlichkeitenLuL, netto + ust)]),
                             "Wareneinkäufe werden zu Anschaffungskosten im Soll des WEK gebucht; Vorsteuer separat (Nettomethode).",
                             quelle: "Skript Teil I, Vorsteuerkonto – Nettomethode")
        },
        Vorlage("wk-einkauf-bar", .warenkonten) { rng in
            let netto = rng.betrag(100, 3_000, raster: 10)
            let ust = H.ust(netto)
            return H.buchung("wk-einkauf-bar", .warenkonten,
                             "Waren werden bar eingekauft: \(H.eur(netto)) zzgl. 19 % USt.",
                             Buchungssatz([(.wareneingang, netto), (.vorsteuer, ust)], an: [(.kasse, netto + ust)]),
                             "WEK und Vorsteuer im Soll, Kasse (brutto) im Haben.")
        },
        Vorlage("wk-verkauf-ziel", .warenkonten) { rng in
            let netto = rng.betrag(500, 40_000, raster: 100)
            let ust = H.ust(netto)
            return H.buchung("wk-verkauf-ziel", .warenkonten,
                             "Warenverkauf auf Ziel: \(H.eur(netto)) zzgl. 19 % USt.",
                             Buchungssatz([(.forderungenLuL, netto + ust)], an: [(.umsatzerloese, netto), (.umsatzsteuer, ust)]),
                             "Verkäufe werden zu Verkaufspreisen (netto) im Haben des WVK gebucht, die USt als Verbindlichkeit gegenüber dem FA.",
                             quelle: "Skript Teil I, Umsatzsteuerkonto – Nettomethode")
        },
        Vorlage("wk-verkauf-bank", .warenkonten) { rng in
            let stueck = rng.zahl(2...25)
            let preis = rng.betrag(200, 5_000, raster: 100)
            let netto = preis * Decimal(stueck)
            let ust = H.ust(netto)
            return H.buchung("wk-verkauf-bank", .warenkonten,
                             "Verkauf von \(stueck) Fahrrädern zum Stückpreis von \(H.eur(preis)) zzgl. 19 % USt gegen Banküberweisung.",
                             Buchungssatz([(.bank, netto + ust)], an: [(.umsatzerloese, netto), (.umsatzsteuer, ust)]),
                             "Nettoerlös \(stueck) × \(H.eur(preis)) = \(H.eur(netto)); USt \(H.eur(ust)).",
                             quelle: "Übung Einführung USt-/Vorsteuerkonten, Tz. 2")
        },
        Vorlage("wk-verkauf-gemischt", .warenkonten) { rng in
            let netto = rng.betrag(1_000, 20_000, raster: 100)
            let ust = H.ust(netto)
            let brutto = netto + ust
            let bar = Geld.runden(brutto * Decimal(rng.wahl([20, 25, 50])) / 100)
            return H.buchung("wk-verkauf-gemischt", .warenkonten,
                             "Warenverkauf über \(H.eur(netto)) zzgl. 19 % USt. Der Kunde zahlt \(H.eur(bar)) sofort bar, der Rest wird ihm gestundet.",
                             Buchungssatz([(.kasse, bar), (.forderungenLuL, brutto - bar)], an: [(.umsatzerloese, netto), (.umsatzsteuer, ust)]),
                             "Zusammengesetzter Buchungssatz: Kasse \(H.eur(bar)) + Forderung \(H.eur(brutto - bar)) = Brutto \(H.eur(brutto)).")
        },
        Vorlage("wk-bestandsveraenderung", .warenkonten) { rng in
            let ab = rng.betrag(5_000, 80_000, raster: 1_000)
            var eb = rng.betrag(5_000, 80_000, raster: 1_000)
            if eb == ab { eb += 2_000 }
            let mehrung = eb > ab
            let diff = mehrung ? eb - ab : ab - eb
            let satz = mehrung ? Buchungssatz(.warenbestand, an: .bestandsveraenderung, diff)
                               : Buchungssatz(.bestandsveraenderung, an: .warenbestand, diff)
            return H.buchung("wk-bestandsveraenderung", .warenkonten,
                             "Warenanfangsbestand lt. Eröffnungsbilanz: \(H.eur(ab)). Warenendbestand lt. Inventur: \(H.eur(eb)). Buchen Sie die Bestandsveränderung.",
                             satz,
                             mehrung ? "Bestandsmehrung um \(H.eur(diff)): WBK an BVK. Das BVK hat einen Habensaldo (Ertrag) und korrigiert den Wareneinsatz nach unten."
                                     : "Bestandsminderung um \(H.eur(diff)): BVK an WBK. Das BVK hat einen Sollsaldo (Aufwand) und erhöht den Wareneinsatz.",
                             quelle: "Skript Teil I, Bestandsveränderungskonto")
        },
        Vorlage("wk-bvk-abschluss", .warenkonten) { rng in
            let diff = rng.betrag(1_000, 30_000, raster: 500)
            let mehrung = rng.muenzwurf()
            let satz = mehrung ? Buchungssatz(.bestandsveraenderung, an: .wareneingang, diff)
                               : Buchungssatz(.wareneingang, an: .bestandsveraenderung, diff)
            return H.buchung("wk-bvk-abschluss", .warenkonten,
                             "Der Warenbestand hat sich im Wirtschaftsjahr um \(H.eur(diff)) \(mehrung ? "erhöht" : "vermindert"); die Bestandsveränderung ist bereits gebucht. Schließen Sie das Bestandsveränderungskonto ab.",
                             satz,
                             "Das BVK wird gegen das WEK abgeschlossen. " + (mehrung ? "Bei Mehrung steht der Saldo im Haben des BVK → BVK an WEK (Wareneinsatz sinkt)." : "Bei Minderung steht der Saldo im Soll des BVK → WEK an BVK (Wareneinsatz steigt)."),
                             quelle: "Skript Teil I, Bestandsveränderungskonto")
        },
        Vorlage("wk-wek-guv", .warenkonten) { rng in
            let saldo = rng.betrag(10_000, 500_000, raster: 1_000)
            let wek = rng.muenzwurf()
            return H.buchung("wk-wek-guv", .warenkonten,
                             wek ? "Das Wareneinkaufskonto weist nach allen vorbereitenden Abschlussbuchungen einen Saldo (Wareneinsatz) von \(H.eur(saldo)) aus. Schließen Sie das Konto ab."
                                 : "Das Warenverkaufskonto weist nach allen vorbereitenden Abschlussbuchungen einen Saldo (Umsatzerlöse) von \(H.eur(saldo)) aus. Schließen Sie das Konto ab.",
                             wek ? Buchungssatz(.guv, an: .wareneingang, saldo) : Buchungssatz(.umsatzerloese, an: .guv, saldo),
                             wek ? "Das WEK ist ein Aufwandskonto und wird über die GuV abgeschlossen: GuV an WEK."
                                 : "Das WVK ist ein Ertragskonto und wird über die GuV abgeschlossen: WVK an GuV.")
        },
        Vorlage("wk-wareneinsatz", .warenkonten) { rng in
            let ab = rng.betrag(10_000, 100_000, raster: 1_000)
            let zugang = rng.betrag(50_000, 400_000, raster: 1_000)
            let eb = rng.betrag(5_000, 50_000, raster: 1_000)
            let we = ab + zugang - eb
            return H.zahl("wk-wareneinsatz", .warenkonten,
                          "Warenanfangsbestand \(H.eur(ab)), Wareneinkäufe \(H.eur(zugang)), Warenendbestand lt. Inventur \(H.eur(eb)). Wie hoch ist der Wareneinsatz?",
                          we,
                          "Wareneinsatz = Anfangsbestand + Zugänge ./. Endbestand = \(H.eur(ab)) + \(H.eur(zugang)) ./. \(H.eur(eb)) = \(H.eur(we)).",
                          quelle: "Skript Teil I, Kalkulation – Wareneinsatz")
        },
    ]

    // MARK: Warenunterkonten

    static let warenunterkonten: [Vorlage] = [
        Vorlage("wu-bezugskosten", .warenunterkonten) { rng in
            let netto = rng.betrag(50, 1_500, raster: 10)
            let ust = H.ust(netto)
            return H.buchung("wu-bezugskosten", .warenunterkonten,
                             "Für die Anlieferung von Waren zahlt der Unternehmer dem Spediteur bar \(H.eur(netto)) Fracht zzgl. 19 % USt.",
                             Buchungssatz([(.warenbezugskosten, netto), (.vorsteuer, ust)], an: [(.kasse, netto + ust)]),
                             "Eingangsfrachten sind Anschaffungsnebenkosten der Ware (§ 255 I 2 HGB) → Unterkonto Warenbezugskosten; Abschluss: WEK an Warenbezugskosten.",
                             quelle: "Skript Teil I, Warenbezugskosten")
        },
        Vorlage("wu-einkauf-fracht", .warenunterkonten) { rng in
            let ware = rng.betrag(800, 20_000, raster: 100)
            let fracht = rng.betrag(20, 300, raster: 10)
            let ust = H.ust(ware + fracht)
            return H.buchung("wu-einkauf-fracht", .warenunterkonten,
                             "Wareneinkauf auf Ziel: Warenwert netto \(H.eur(ware)) + Frachtkosten \(H.eur(fracht)) = \(H.eur(ware + fracht)) zzgl. 19 % USt \(H.eur(ust)).",
                             Buchungssatz([(.wareneingang, ware), (.warenbezugskosten, fracht), (.vorsteuer, ust)],
                                          an: [(.verbindlichkeitenLuL, ware + fracht + ust)]),
                             "Warenwert auf WEK, Fracht auf Warenbezugskosten, Vorsteuer auf den Gesamtbetrag.",
                             alternativen: [Buchungssatz([(.wareneingang, ware + fracht), (.vorsteuer, ust)],
                                                         an: [(.verbindlichkeitenLuL, ware + fracht + ust)])],
                             quelle: "Übung USt-/Vorsteuerkonten – Warenunterkonten, Tz. 1")
        },
        Vorlage("wu-vertriebskosten", .warenunterkonten) { rng in
            let netto = rng.betrag(50, 800, raster: 10)
            let ust = H.ust(netto)
            return H.buchung("wu-vertriebskosten", .warenunterkonten,
                             "Für die Auslieferung von Waren an einen Kunden stellt der Spediteur \(H.eur(netto)) zzgl. 19 % USt in Rechnung; die Rechnung wird sofort per Bank bezahlt.",
                             Buchungssatz([(.warenvertriebskosten, netto), (.vorsteuer, ust)], an: [(.bank, netto + ust)]),
                             "Ausgangsfrachten sind Vertriebskosten – kein Unterkonto des WVK; Abschluss direkt über die GuV.",
                             quelle: "Skript Teil I, Warenvertriebskosten")
        },
        Vorlage("wu-ruecksendung-lieferant", .warenunterkonten) { rng in
            let netto = rng.betrag(100, 5_000, raster: 50)
            let ust = H.ust(netto)
            return H.buchung("wu-ruecksendung-lieferant", .warenunterkonten,
                             "Vor Bezahlung der Rechnung schickt der Unternehmer beschädigte Ware im Wert von \(H.eur(netto)) netto (zzgl. 19 % USt) an den Lieferanten zurück.",
                             Buchungssatz([(.verbindlichkeitenLuL, netto + ust)], an: [(.wareneingang, netto), (.vorsteuer, ust)]),
                             "Rücksendungen werden direkt auf dem WEK storniert; die Vorsteuer ist nach § 17 I UStG zu berichtigen.",
                             quelle: "Übung USt-/Vorsteuerkonten – Warenunterkonten, Tz. 3a")
        },
        Vorlage("wu-ruecksendung-kunde", .warenunterkonten) { rng in
            let netto = rng.betrag(100, 5_000, raster: 50)
            let ust = H.ust(netto)
            return H.buchung("wu-ruecksendung-kunde", .warenunterkonten,
                             "Ein Kunde schickt vor Zahlung fehlerhafte Ware im Wert von \(H.eur(netto)) netto (zzgl. 19 % USt) zurück.",
                             Buchungssatz([(.umsatzerloese, netto), (.umsatzsteuer, ust)], an: [(.forderungenLuL, netto + ust)]),
                             "Rücksendungen werden direkt auf dem WVK storniert; die Umsatzsteuer wird nach § 17 I UStG berichtigt.",
                             quelle: "Übung USt-/Vorsteuerkonten – Warenunterkonten, Tz. 3b")
        },
        Vorlage("wu-nachlass-lieferant", .warenunterkonten) { rng in
            let netto = rng.betrag(100, 2_000, raster: 50)
            let ust = H.ust(netto)
            return H.buchung("wu-nachlass-lieferant", .warenunterkonten,
                             "Der Lieferant gewährt aufgrund einer Mängelrüge einen Preisnachlass von \(H.eur(netto)) zzgl. 19 % USt, der mit der noch offenen Verbindlichkeit verrechnet wird.",
                             Buchungssatz([(.verbindlichkeitenLuL, netto + ust)], an: [(.preisnachlaesse, netto), (.vorsteuer, ust)]),
                             "Preisnachlässe vom Lieferanten auf das Unterkonto Preisnachlässe (Abschluss: Preisnachlässe an WEK); Vorsteuerkorrektur nach § 17 UStG.",
                             quelle: "Übung USt-/Vorsteuerkonten – Warenunterkonten, Tz. 4")
        },
        Vorlage("wu-nachlass-kunde", .warenunterkonten) { rng in
            let netto = rng.betrag(100, 2_000, raster: 50)
            let ust = H.ust(netto)
            return H.buchung("wu-nachlass-kunde", .warenunterkonten,
                             "Wegen eines Sachmangels gewährt der Unternehmer einem Kunden nachträglich einen Preisnachlass von \(H.eur(netto)) zzgl. 19 % USt; die Forderung ist noch offen.",
                             Buchungssatz([(.erloesschmaelerungen, netto), (.umsatzsteuer, ust)], an: [(.forderungenLuL, netto + ust)]),
                             "Preisnachlässe an Kunden → Erlösschmälerungen (Abschluss: WVK an Erlösschmälerungen); USt-Korrektur nach § 17 UStG.",
                             quelle: "Skript Teil I, Preisnachlässe wegen Sachmängel")
        },
        Vorlage("wu-sofortrabatt", .warenunterkonten) { rng in
            let liste = rng.betrag(1_000, 20_000, raster: 500)
            let prozent = Decimal(rng.wahl([5, 10, 15, 20]))
            let rabatt = Geld.prozent(liste, prozent)
            let netto = liste - rabatt
            let ust = H.ust(netto)
            return H.buchung("wu-sofortrabatt", .warenunterkonten,
                             "Wareneinkauf auf Ziel: Listenpreis \(H.eur(liste)) abzüglich \(Geld.prozentText(prozent)) Mengenrabatt, zzgl. 19 % USt.",
                             Buchungssatz([(.wareneingang, netto), (.vorsteuer, ust)], an: [(.verbindlichkeitenLuL, netto + ust)]),
                             "Sofortrabatte werden nicht gesondert gebucht – gebucht wird nur der Rechnungsbetrag nach Abzug des Rabatts: \(H.eur(liste)) ./. \(H.eur(rabatt)) = \(H.eur(netto)).",
                             quelle: "Skript Teil I, Sofort-Rabatte")
        },
        Vorlage("wu-bonus-erhalten", .warenunterkonten) { rng in
            let umsatz = rng.betrag(10_000, 100_000, raster: 1_000)
            let prozent = Decimal(rng.wahl([1, 2, 3, 5]))
            let netto = Geld.prozent(umsatz, prozent)
            let ust = H.ust(netto)
            return H.buchung("wu-bonus-erhalten", .warenunterkonten,
                             "Der Lieferant gewährt nachträglich einen Bonus von \(Geld.prozentText(prozent)) auf die im Jahr bezogenen Waren (netto \(H.eur(umsatz))). Der Bonus zzgl. USt wird dem Bankkonto gutgeschrieben.",
                             Buchungssatz([(.bank, netto + ust)], an: [(.erhalteneBoni, netto), (.vorsteuer, ust)]),
                             "Bonus netto \(H.eur(netto)) → Erhaltene Boni (Unterkonto WEK). Die Vorsteuer mindert sich um \(H.eur(ust)) (§ 17 I UStG).",
                             quelle: "Skript Teil I, Boni")
        },
        Vorlage("wu-bonus-gewaehrt", .warenunterkonten) { rng in
            let netto = rng.betrag(100, 3_000, raster: 10)
            let ust = H.ust(netto)
            let brutto = netto + ust
            return H.buchung("wu-bonus-gewaehrt", .warenunterkonten,
                             "Der Unternehmer gewährt einem Großkunden nachträglich einen Bonus von \(H.eur(brutto)) brutto (inkl. 19 % USt) und überweist ihn sofort.",
                             Buchungssatz([(.gewaehrteBoni, netto), (.umsatzsteuer, ust)], an: [(.bank, brutto)]),
                             "Netto = \(H.eur(brutto)) ÷ 1,19 = \(H.eur(netto)) → Gewährte Boni; USt-Minderung \(H.eur(ust)).",
                             quelle: "Übung Wiederholung, Tz. 9")
        },
        Vorlage("wu-skonto-lieferant", .warenunterkonten) { rng in
            let netto = rng.betrag(1_000, 30_000, raster: 100)
            let ust = H.ust(netto)
            let brutto = netto + ust
            let prozent = Decimal(rng.wahl([2, 3]))
            let skontoNetto = Geld.prozent(netto, prozent)
            let skontoUst = Geld.prozent(ust, prozent)
            let zahlung = brutto - skontoNetto - skontoUst
            return H.buchung("wu-skonto-lieferant", .warenunterkonten,
                             "Eine bereits gebuchte Lieferantenrechnung über \(H.eur(brutto)) (\(H.eur(netto)) + \(H.eur(ust)) USt) wird innerhalb der Skontofrist unter Abzug von \(Geld.prozentText(prozent)) Skonto per Bank bezahlt.",
                             Buchungssatz([(.verbindlichkeitenLuL, brutto)],
                                          an: [(.bank, zahlung), (.erhalteneSkonti, skontoNetto), (.vorsteuer, skontoUst)]),
                             "Skonto brutto \(H.eur(skontoNetto + skontoUst)) = netto \(H.eur(skontoNetto)) (Erhaltene Skonti) + Vorsteuerkorrektur \(H.eur(skontoUst)). Überweisung \(H.eur(zahlung)).",
                             quelle: "Skript Teil I, Entgeltsminderungen – Beispiel 1")
        },
        Vorlage("wu-skonto-kunde", .warenunterkonten) { rng in
            let netto = rng.betrag(500, 20_000, raster: 100)
            let ust = H.ust(netto)
            let brutto = netto + ust
            let prozent = Decimal(rng.wahl([2, 3]))
            let skontoNetto = Geld.prozent(netto, prozent)
            let skontoUst = Geld.prozent(ust, prozent)
            let zahlung = brutto - skontoNetto - skontoUst
            return H.buchung("wu-skonto-kunde", .warenunterkonten,
                             "Ein Kunde begleicht unsere Rechnung über \(H.eur(brutto)) (\(H.eur(netto)) + \(H.eur(ust)) USt) unter Abzug von \(Geld.prozentText(prozent)) Skonto per Banküberweisung.",
                             Buchungssatz([(.bank, zahlung), (.gewaehrteSkonti, skontoNetto), (.umsatzsteuer, skontoUst)],
                                          an: [(.forderungenLuL, brutto)]),
                             "Gewährte Skonti (netto \(H.eur(skontoNetto))) mindern die Erlöse; die USt wird um \(H.eur(skontoUst)) berichtigt. Zahlungseingang \(H.eur(zahlung)).",
                             quelle: "Skript Teil I, Entgeltsminderungen – Beispiel 1")
        },
        Vorlage("wu-skonto-anlage", .warenunterkonten) { rng in
            let netto = rng.betrag(5_000, 60_000, raster: 1_000)
            let ust = H.ust(netto)
            let brutto = netto + ust
            let (konto, gegenstand) = rng.wahl([(Konto.fuhrpark, "einen Lkw"), (Konto.bga, "eine Ladeneinrichtung"), (Konto.maschinen, "eine Maschine")])
            let skontoNetto = Geld.prozent(netto, 2)
            let skontoUst = Geld.prozent(ust, 2)
            return H.buchung("wu-skonto-anlage", .warenunterkonten,
                             "Der Unternehmer hat \(gegenstand) für \(H.eur(netto)) zzgl. \(H.eur(ust)) USt auf Ziel gekauft (bereits gebucht). Er bezahlt jetzt unter Abzug von 2 % Skonto per Bank.",
                             Buchungssatz([(.verbindlichkeitenLuL, brutto)],
                                          an: [(.bank, brutto - skontoNetto - skontoUst), (konto, skontoNetto), (.vorsteuer, skontoUst)]),
                             "Beim Anlagevermögen wird kein Skontokonto geführt: Der Skonto mindert direkt die Anschaffungskosten auf dem Anlagekonto (§ 255 I 3 HGB).",
                             quelle: "Skript Teil I, Skonti – Hinweis Anlagevermögen")
        },
        Vorlage("wu-warenverlust", .warenunterkonten) { rng in
            let b = rng.betrag(100, 3_000, raster: 50)
            return H.buchung("wu-warenverlust", .warenunterkonten,
                             "Bei einem Einbruch werden Waren mit Anschaffungskosten von \(H.eur(b)) gestohlen. Der Verlust soll gesondert erfasst werden.",
                             Buchungssatz(.warenverluste, an: .wareneingang, b),
                             "Warenverluste an WEK – so wird der Wareneinsatz zutreffend ermittelt. Diebstahl ist keine Lieferung und führt nicht zu einer USt-/Vorsteuerkorrektur.",
                             quelle: "Skript Teil I, Warenverluste durch Diebstahl, Schwund etc.")
        },
        Vorlage("wu-anlage-nebenkosten", .warenunterkonten) { rng in
            let preis = rng.betrag(15_000, 60_000, raster: 500)
            let ueberf = rng.betrag(300, 1_200, raster: 50)
            let ust = H.ust(preis + ueberf)
            return H.buchung("wu-anlage-nebenkosten", .warenunterkonten,
                             "Kauf eines Lieferwagens auf Ziel: Kaufpreis \(H.eur(preis)) + Überführungskosten \(H.eur(ueberf)), jeweils zzgl. 19 % USt (gesamt \(H.eur(ust)) USt).",
                             Buchungssatz([(.fuhrpark, preis + ueberf), (.vorsteuer, ust)], an: [(.verbindlichkeitenLuL, preis + ueberf + ust)]),
                             "Anschaffungsnebenkosten beim Anlagevermögen werden direkt auf dem Anlagekonto aktiviert – kein Konto Bezugskosten.",
                             quelle: "Skript Teil I, Warenbezugskosten – Hinweis")
        },
        Vorlage("wu-vorbereitend", .warenunterkonten) { rng in
            let b = rng.betrag(100, 20_000, raster: 50)
            let faelle: [(String, Buchungssatz, String)] = [
                ("Erhaltene Skonti", Buchungssatz(.erhalteneSkonti, an: .wareneingang, b), "Erhaltene Skonti mindern die Anschaffungskosten → Abschluss über das WEK (Haben)."),
                ("Erhaltene Boni", Buchungssatz(.erhalteneBoni, an: .wareneingang, b), "Erhaltene Boni mindern die Anschaffungskosten → Abschluss über das WEK."),
                ("Preisnachlässe", Buchungssatz(.preisnachlaesse, an: .wareneingang, b), "Preisnachlässe der Lieferanten → Abschluss über das WEK."),
                ("Warenbezugskosten", Buchungssatz(.wareneingang, an: .warenbezugskosten, b), "Bezugskosten erhöhen die Anschaffungskosten → WEK an Warenbezugskosten."),
                ("Gewährte Skonti", Buchungssatz(.umsatzerloese, an: .gewaehrteSkonti, b), "Gewährte Skonti mindern die Erlöse → WVK an Gewährte Skonti."),
                ("Gewährte Boni", Buchungssatz(.umsatzerloese, an: .gewaehrteBoni, b), "Gewährte Boni mindern die Erlöse → WVK an Gewährte Boni."),
                ("Erlösschmälerungen", Buchungssatz(.umsatzerloese, an: .erloesschmaelerungen, b), "Erlösschmälerungen → WVK an Erlösschmälerungen."),
            ]
            let (konto, satz, erklaerung) = rng.wahl(faelle)
            return H.buchung("wu-vorbereitend", .warenunterkonten,
                             "Vorbereitende Abschlussbuchung: Das Konto „\(konto)“ weist einen Saldo von \(H.eur(b)) aus. Schließen Sie es über das zugehörige Hauptkonto ab.",
                             satz, erklaerung,
                             quelle: "Skript Teil I, Buchungskreislauf – vorbereitende Abschlussbuchungen")
        },
    ]

    // MARK: Umsatzsteuer

    static let umsatzsteuer: [Vorlage] = [
        Vorlage("us-vorauszahlung", .umsatzsteuer) { rng in
            let b = rng.betrag(500, 20_000, raster: 10)
            return H.buchung("us-vorauszahlung", .umsatzsteuer,
                             "Die Umsatzsteuer-Vorauszahlung laut Voranmeldung über \(H.eur(b)) wird an das Finanzamt überwiesen. Die Vorauszahlungen werden direkt auf dem Konto Umsatzsteuer gebucht.",
                             Buchungssatz(.umsatzsteuer, an: .bank, b),
                             "Die Zahlung mindert die Verbindlichkeit gegenüber dem FA → USt im Soll (Methode 1 im Skript).",
                             quelle: "Skript Teil I, Umsatzsteuer-Vorauszahlungen")
        },
        Vorlage("us-abschluss-zahllast", .umsatzsteuer) { rng in
            let vst = rng.betrag(5_000, 50_000, raster: 10)
            let ust = vst + rng.betrag(1_000, 30_000, raster: 10)
            let schritt = rng.muenzwurf()
            return H.buchung("us-abschluss-zahllast", .umsatzsteuer,
                             "Saldo Vorsteuer: \(H.eur(vst)) (Soll). Saldo Umsatzsteuer: \(H.eur(ust)) (Haben). " +
                             (schritt ? "Buchen Sie die Verrechnung der beiden Konten."
                                      : "Die Konten wurden bereits verrechnet. Schließen Sie das verbleibende Konto über das SBK ab."),
                             schritt ? Buchungssatz(.umsatzsteuer, an: .vorsteuer, vst)
                                     : Buchungssatz(.umsatzsteuer, an: .sbk, ust - vst),
                             schritt ? "Das Konto mit dem kleineren Saldo wird auf das Konto mit dem größeren Saldo übertragen: USt an Vorsteuer \(H.eur(vst))."
                                     : "Verbleibende Zahllast \(H.eur(ust - vst)) ist eine Verbindlichkeit → USt an SBK.",
                             quelle: "Skript Teil I, Abschluss von Vorsteuer- und Umsatzsteuerkonto")
        },
        Vorlage("us-abschluss-erstattung", .umsatzsteuer) { rng in
            let ust = rng.betrag(2_000, 30_000, raster: 10)
            let vst = ust + rng.betrag(500, 15_000, raster: 10)
            let schritt = rng.muenzwurf()
            return H.buchung("us-abschluss-erstattung", .umsatzsteuer,
                             "Saldo Vorsteuer: \(H.eur(vst)) (Soll). Saldo Umsatzsteuer: \(H.eur(ust)) (Haben). " +
                             (schritt ? "Buchen Sie die Verrechnung der beiden Konten."
                                      : "Die Konten wurden bereits verrechnet. Schließen Sie das verbleibende Konto über das SBK ab."),
                             schritt ? Buchungssatz(.umsatzsteuer, an: .vorsteuer, ust)
                                     : Buchungssatz(.sbk, an: .vorsteuer, vst - ust),
                             schritt ? "Die USt ist kleiner: USt an Vorsteuer in Höhe des USt-Saldos (\(H.eur(ust)))."
                                     : "Es verbleibt ein Vorsteuerüberhang (Forderung gegenüber dem FA) von \(H.eur(vst - ust)) → SBK an Vorsteuer.",
                             quelle: "Skript Teil I, Abschluss von Vorsteuer- und Umsatzsteuerkonto")
        },
        Vorlage("us-zahllast", .umsatzsteuer) { rng in
            let ust = rng.betrag(40_000, 150_000, raster: 100)
            let vst = rng.betrag(5_000, 19_000, raster: 100)
            let vz = rng.betrag(1_000, 10_000, raster: 100)
            let rest = ust - vst - vz
            return H.zahl("us-zahllast", .umsatzsteuer,
                          "Umsatzsteuer lt. Konto: \(H.eur(ust)); Vorsteuer: \(H.eur(vst)); geleistete Vorauszahlungen (auf dem USt-Konto gebucht): \(H.eur(vz)). Welcher Betrag ist zum Bilanzstichtag als USt-Verbindlichkeit auszuweisen?",
                          rest,
                          "\(H.eur(ust)) ./. \(H.eur(vst)) ./. \(H.eur(vz)) = \(H.eur(rest)).")
        },
        Vorlage("us-herausrechnen", .umsatzsteuer) { rng in
            let satz: Decimal = rng.wahl([19, 7])
            let netto = rng.betrag(100, 10_000, raster: 100)
            let ust = H.ust(netto, satz)
            return H.zahl("us-herausrechnen", .umsatzsteuer,
                          "Ein Bruttobetrag von \(H.eur(netto + ust)) enthält \(Geld.prozentText(satz)) Umsatzsteuer. Wie hoch ist die enthaltene Umsatzsteuer?",
                          ust,
                          "USt = Brutto × \(satz)/\(100 + satz) = \(H.eur(ust)); Netto = \(H.eur(netto)).")
        },
    ]

    // MARK: Eröffnung & Abschluss

    static let abschluss: [Vorlage] = [
        Vorlage("ab-eroeffnung", .abschluss) { rng in
            let aktiv: [Konto] = [.kasse, .bank, .bga, .forderungenLuL, .warenbestand, .fuhrpark]
            let passiv: [Konto] = [.darlehensverbindlichkeiten, .verbindlichkeitenLuL, .eigenkapital]
            let b = rng.betrag(1_000, 80_000, raster: 100)
            let istAktiv = rng.muenzwurf()
            let konto = istAktiv ? rng.wahl(aktiv) : rng.wahl(passiv)
            return H.buchung("ab-eroeffnung", .abschluss,
                             "Eröffnungsbuchung: Laut Eröffnungsbilanz beträgt der Posten „\(konto.kurzname)“ \(H.eur(b)).",
                             istAktiv ? Buchungssatz(konto, an: .ebk, b) : Buchungssatz(.ebk, an: konto, b),
                             istAktiv ? "Aktivkonten übernehmen den Anfangsbestand im Soll; Gegenkonto ist das EBK: \(konto.kurzname) an EBK."
                                      : "Passivkonten (und das Eigenkapital) übernehmen den Anfangsbestand im Haben: EBK an \(konto.kurzname).",
                             quelle: "Skript Teil I, Eröffnungsbilanzkonto")
        },
        Vorlage("ab-sbk", .abschluss) { rng in
            let aktiv: [Konto] = [.kasse, .bank, .bga, .forderungenLuL, .warenbestand, .fuhrpark, .vorsteuer]
            let passiv: [Konto] = [.darlehensverbindlichkeiten, .verbindlichkeitenLuL, .eigenkapital, .umsatzsteuer]
            let b = rng.betrag(1_000, 80_000, raster: 100)
            let istAktiv = rng.muenzwurf()
            let konto = istAktiv ? rng.wahl(aktiv) : rng.wahl(passiv)
            return H.buchung("ab-sbk", .abschluss,
                             "Abschlussbuchung: Das Konto „\(konto.kurzname)“ weist einen Schlussbestand von \(H.eur(b)) aus. Schließen Sie es ab.",
                             istAktiv ? Buchungssatz(.sbk, an: konto, b) : Buchungssatz(konto, an: .sbk, b),
                             istAktiv ? "Aktivkonto: Der Endbestand steht im Haben des Kontos, die Gegenbuchung im Soll des SBK → SBK an \(konto.kurzname)."
                                      : "Passivkonto: Der Endbestand steht im Soll des Kontos, die Gegenbuchung im Haben des SBK → \(konto.kurzname) an SBK.",
                             quelle: "Skript Teil I, Schlussbilanzkonto")
        },
        Vorlage("ab-erfolgskonto", .abschluss) { rng in
            let aufwand: [Konto] = [.mietaufwendungen, .zinsaufwendungen, .kfzKosten, .telefon, .buerobedarf, .afa, .warenvertriebskosten, .warenverluste]
            let ertrag: [Konto] = [.zinsertraege, .provisionserloese, .mietertraege, .sonstigeErtraege]
            let b = rng.betrag(100, 30_000, raster: 50)
            let istAufwand = rng.muenzwurf()
            let konto = istAufwand ? rng.wahl(aufwand) : rng.wahl(ertrag)
            return H.buchung("ab-erfolgskonto", .abschluss,
                             "Das Konto „\(konto.kurzname)“ weist einen Saldo von \(H.eur(b)) aus. Schließen Sie es ab.",
                             istAufwand ? Buchungssatz(.guv, an: konto, b) : Buchungssatz(konto, an: .guv, b),
                             istAufwand ? "Aufwandskonten werden über die GuV abgeschlossen: GuV an \(konto.kurzname)."
                                        : "Ertragskonten werden über die GuV abgeschlossen: \(konto.kurzname) an GuV.",
                             quelle: "Skript Teil I, Aufwands- und Ertragskonten")
        },
        Vorlage("ab-guv", .abschluss) { rng in
            let aufwand = rng.betrag(50_000, 300_000, raster: 1_000)
            var ertrag = rng.betrag(50_000, 300_000, raster: 1_000)
            if ertrag == aufwand { ertrag += 5_000 }
            let gewinn = ertrag > aufwand
            let diff = gewinn ? ertrag - aufwand : aufwand - ertrag
            return H.buchung("ab-guv", .abschluss,
                             "Im GuV-Konto stehen Aufwendungen von \(H.eur(aufwand)) und Erträge von \(H.eur(ertrag)). Schließen Sie das GuV-Konto ab.",
                             gewinn ? Buchungssatz(.guv, an: .eigenkapital, diff) : Buchungssatz(.eigenkapital, an: .guv, diff),
                             gewinn ? "Gewinn \(H.eur(diff)) erhöht das Eigenkapital → GuV an Eigenkapital."
                                    : "Verlust \(H.eur(diff)) mindert das Eigenkapital → Eigenkapital an GuV.",
                             quelle: "Skript Teil I, Abschluss der Unterkonten")
        },
        Vorlage("ab-privat", .abschluss) { rng in
            let b = rng.betrag(1_000, 60_000, raster: 100)
            let entnahme = rng.muenzwurf()
            return H.buchung("ab-privat", .abschluss,
                             "Das Konto „\(entnahme ? "Privatentnahmen" : "Privateinlagen")“ weist zum Jahresende einen Saldo von \(H.eur(b)) aus. Schließen Sie es ab.",
                             entnahme ? Buchungssatz(.eigenkapital, an: .privatentnahmen, b) : Buchungssatz(.privateinlagen, an: .eigenkapital, b),
                             entnahme ? "Entnahmen mindern das Eigenkapital → Eigenkapital an Privatentnahmen (vorbereitende Abschlussbuchung)."
                                      : "Einlagen erhöhen das Eigenkapital → Privateinlagen an Eigenkapital.",
                             quelle: "Skript Teil I, Privatkonten / Buchungskreislauf")
        },
    ]

    // MARK: Kalkulation

    static let kalkulation: [Vorlage] = [
        Vorlage("ka-rohgewinn", .kalkulation) { rng in
            let we = rng.betrag(100_000, 2_000_000, raster: 10_000)
            let aufschlag = Decimal(rng.wahl([20, 25, 30, 35, 40, 50, 60]))
            let umsatz = we + Geld.prozent(we, aufschlag)
            let rg = umsatz - we
            return H.zahl("ka-rohgewinn", .kalkulation,
                          "Wirtschaftlicher Umsatz: \(H.eur(umsatz)); Wareneinsatz: \(H.eur(we)). Wie hoch ist der Rohgewinn?",
                          rg,
                          "Rohgewinn = Umsatz ./. Wareneinsatz = \(H.eur(rg)).",
                          quelle: "Skript Teil I, Kalkulation – Rohgewinn")
        },
        Vorlage("ka-ras", .kalkulation) { rng in
            let we = rng.betrag(100_000, 2_000_000, raster: 10_000)
            let aufschlag = Decimal(rng.wahl([20, 25, 30, 35, 40, 50, 60, 80]))
            let umsatz = we + Geld.prozent(we, aufschlag)
            return H.zahl("ka-ras", .kalkulation,
                          "Wirtschaftlicher Umsatz: \(H.eur(umsatz)); Wareneinsatz: \(H.eur(we)). Ermitteln Sie den Rohgewinnaufschlagsatz.",
                          aufschlag, einheit: "%", toleranz: Geld.cent(1),
                          "Rohgewinnaufschlagsatz = Rohgewinn × 100 ÷ Wareneinsatz = \(H.eur(umsatz - we)) × 100 ÷ \(H.eur(we)) = \(Geld.prozentText(aufschlag)).",
                          quelle: "Skript Teil I, Kalkulation – Rohgewinnaufschlagsatz")
        },
        Vorlage("ka-rgs", .kalkulation) { rng in
            let we = rng.betrag(100_000, 2_000_000, raster: 10_000)
            let aufschlag = Decimal(rng.wahl([20, 25, 30, 40, 50, 60, 100]))
            let umsatz = we + Geld.prozent(we, aufschlag)
            let rgs = Geld.runden((umsatz - we) * 100 / umsatz)
            return H.zahl("ka-rgs", .kalkulation,
                          "Wirtschaftlicher Umsatz: \(H.eur(umsatz)); Wareneinsatz: \(H.eur(we)). Ermitteln Sie den Rohgewinnsatz (auf zwei Nachkommastellen).",
                          rgs, einheit: "%", toleranz: Geld.cent(1),
                          "Rohgewinnsatz = Rohgewinn × 100 ÷ Umsatz = \(H.eur(umsatz - we)) × 100 ÷ \(H.eur(umsatz)) = \(Geld.prozentText(rgs)).",
                          quelle: "Skript Teil I, Kalkulation – Rohgewinnsatz")
        },
        Vorlage("ka-umrechnung", .kalkulation) { rng in
            let ras = Decimal(rng.wahl([20, 25, 40, 50, 60, 80, 100]))
            let rgs = Geld.runden(ras * 100 / (100 + ras))
            return H.zahl("ka-umrechnung", .kalkulation,
                          "Der Rohgewinnaufschlagsatz beträgt \(Geld.prozentText(ras)). Wie hoch ist der Rohgewinnsatz (auf zwei Nachkommastellen)?",
                          rgs, einheit: "%", toleranz: Geld.cent(1),
                          "Rohgewinnsatz = RAS × 100 ÷ (100 + RAS) = \(Geld.prozentText(ras)) × 100 ÷ \(100 + ras) = \(Geld.prozentText(rgs)).",
                          quelle: "Skript Teil I, Kalkulation – Umrechnungsformeln")
        },
        Vorlage("ka-bestand-vk", .kalkulation) { rng in
            let ak = rng.betrag(20_000, 300_000, raster: 1_000)
            let ras = Decimal(rng.wahl([20, 25, 40, 50, 60]))
            let vkNetto = ak + Geld.prozent(ak, ras)
            let vkBrutto = vkNetto + H.ust(vkNetto)
            return H.zahl("ka-bestand-vk", .kalkulation,
                          "Die Inventur wurde zu Verkaufspreisen einschließlich 19 % USt durchgeführt: \(H.eur(vkBrutto)). Der durchschnittliche Rohgewinnaufschlagsatz beträgt \(Geld.prozentText(ras)). Mit welchen Anschaffungskosten ist der Warenbestand anzusetzen?",
                          ak,
                          "1. USt herausrechnen: \(H.eur(vkBrutto)) ÷ 1,19 = \(H.eur(vkNetto)).\n2. Aufschlag herausrechnen: \(H.eur(vkNetto)) × 100 ÷ \(100 + ras) = \(H.eur(ak)).",
                          quelle: "Skript Teil I, Ermittlung des Warenbestandes; Übung Kalkulation Tz. 1")
        },
        Vorlage("ka-einstandspreis", .kalkulation) { rng in
            let liste = rng.betrag(500, 10_000, raster: 100)
            let rabattP = Decimal(rng.wahl([10, 20, 25, 50]))
            let skontoP = Decimal(rng.wahl([2, 3]))
            let bezug = rng.betrag(20, 300, raster: 10)
            let ziel = liste - Geld.prozent(liste, rabattP)
            let bar = ziel - Geld.prozent(ziel, skontoP)
            let einstand = bar + bezug
            return H.zahl("ka-einstandspreis", .kalkulation,
                          "Einkaufskalkulation: Listenpreis \(H.eur(liste)), Wiederverkäuferrabatt \(Geld.prozentText(rabattP)), Skonto \(Geld.prozentText(skontoP)), Bezugskosten \(H.eur(bezug)). Wie hoch ist der Einstandspreis (Bezugspreis)?",
                          einstand,
                          "Listenpreis \(H.eur(liste)) ./. Rabatt = Zieleinkaufspreis \(H.eur(ziel)) ./. Skonto = Bareinkaufspreis \(H.eur(bar)) + Bezugskosten = Einstandspreis \(H.eur(einstand)).",
                          quelle: "Skript Teil I, Einkaufskalkulation")
        },
        Vorlage("ka-verkaufspreis", .kalkulation) { rng in
            let einstand = rng.betrag(200, 5_000, raster: 100)
            let gk = Decimal(rng.wahl([20, 25, 40, 50]))
            let gw = Decimal(rng.wahl([10, 20, 25]))
            let selbst = einstand + Geld.prozent(einstand, gk)
            let vk = selbst + Geld.prozent(selbst, gw)
            return H.zahl("ka-verkaufspreis", .kalkulation,
                          "Verkaufskalkulation: Einstandspreis \(H.eur(einstand)), Geschäftskostenzuschlag \(Geld.prozentText(gk)) (auf den Einstandspreis), Gewinnzuschlag \(Geld.prozentText(gw)) (auf die Selbstkosten). Wie hoch ist der Netto-Verkaufspreis?",
                          vk,
                          "Selbstkostenpreis = \(H.eur(einstand)) + \(Geld.prozentText(gk)) = \(H.eur(selbst)); Verkaufspreis = \(H.eur(selbst)) + \(Geld.prozentText(gw)) = \(H.eur(vk)).",
                          quelle: "Skript Teil I, Verkaufskalkulation")
        },
        Vorlage("ka-reingewinnsatz", .kalkulation) { rng in
            let umsatz = rng.betrag(200_000, 3_000_000, raster: 10_000)
            let satz = Decimal(rng.wahl([4, 5, 8, 10, 12, 15]))
            let reingewinn = Geld.prozent(umsatz, satz)
            return H.zahl("ka-reingewinnsatz", .kalkulation,
                          "Wirtschaftlicher Umsatz: \(H.eur(umsatz)); Reingewinn lt. GuV: \(H.eur(reingewinn)). Ermitteln Sie den Reingewinnsatz.",
                          satz, einheit: "%",
                          "Reingewinnsatz = Reingewinn × 100 ÷ wirtschaftlicher Umsatz = \(Geld.prozentText(satz)).",
                          quelle: "Skript Teil I, Kalkulation – Reingewinnsatz")
        },
    ]

    // MARK: Gewinnermittlung

    static let gewinnermittlung: [Vorlage] = [
        Vorlage("ge-bvv", .gewinnermittlung) { rng in
            let bvEnde = rng.betrag(50_000, 300_000, raster: 1_000)
            let bvVorjahr = rng.betrag(50_000, 300_000, raster: 1_000)
            let entnahmen = rng.betrag(10_000, 80_000, raster: 1_000)
            let einlagen = rng.betrag(0, 20_000, raster: 1_000)
            let gewinn = bvEnde - bvVorjahr + entnahmen - einlagen
            return H.zahl("ge-bvv", .gewinnermittlung,
                          "Betriebsvermögen 31.12.02: \(H.eur(bvEnde)); Betriebsvermögen 31.12.01: \(H.eur(bvVorjahr)); Entnahmen 02: \(H.eur(entnahmen)); Einlagen 02: \(H.eur(einlagen)). Ermitteln Sie den Gewinn 02 nach § 4 I 1 EStG (Verlust mit Minus).",
                          gewinn,
                          "BV Ende 02 ./. BV Ende 01 + Entnahmen ./. Einlagen = \(H.eur(bvEnde)) ./. \(H.eur(bvVorjahr)) + \(H.eur(entnahmen)) ./. \(H.eur(einlagen)) = \(H.eur(gewinn)).",
                          quelle: "Skript Teil I, Betriebsvermögensvergleich; Übung Gewinnermittlung")
        },
        Vorlage("ge-reinvermoegen", .gewinnermittlung) { rng in
            let av = rng.betrag(50_000, 200_000, raster: 500)
            let uv = rng.betrag(20_000, 150_000, raster: 500)
            let schulden = rng.betrag(5_000, 60_000, raster: 500)
            let bv = av + uv - schulden
            return H.zahl("ge-reinvermoegen", .gewinnermittlung,
                          "Anlagevermögen \(H.eur(av)), Umlaufvermögen \(H.eur(uv)), Schulden \(H.eur(schulden)). Wie hoch ist das Betriebsvermögen (Reinvermögen) i.S.v. § 4 I 1 EStG?",
                          bv,
                          "Reinvermögen = Vermögen ./. Schulden = \(H.eur(av + uv)) ./. \(H.eur(schulden)) = \(H.eur(bv)).",
                          quelle: "Skript Teil I, Inventar – Gliederung")
        },
        Vorlage("ge-auswirkung", .gewinnermittlung) { rng in
            let netto = rng.betrag(100, 5_000, raster: 50)
            let ust = H.ust(netto)
            let faelle: [(String, Decimal, String)] = [
                ("Bezahlung einer Kfz-Reparatur bar: \(H.eur(netto)) zzgl. \(H.eur(ust)) USt.", -netto,
                 "Kfz-Kosten −\(H.eur(netto)); Vorsteuer und Kasse heben sich in Höhe der USt auf → Gewinnminderung \(H.eur(netto))."),
                ("Der Inhaber entnimmt \(H.eur(netto)) aus der Geschäftskasse für private Zwecke.", 0,
                 "Entnahmen sind erfolgsneutral: Die BV-Minderung wird durch die Hinzurechnung der Entnahme ausgeglichen."),
                ("Eine betriebliche Provision von \(H.eur(netto)) zzgl. \(H.eur(ust)) USt geht auf dem privaten Bankkonto ein.", netto,
                 "Provisionserlöse +\(H.eur(netto)). Privatentnahme und USt sind erfolgsneutral."),
                ("Die Büromiete (umsatzsteuerfrei) über \(H.eur(netto)) wird vom privaten Konto überwiesen.", -netto,
                 "Mietaufwand −\(H.eur(netto)); die Privateinlage ist erfolgsneutral."),
                ("Tilgung eines Darlehens über \(H.eur(netto)) per Bank.", 0,
                 "Aktiv-Passiv-Minderung – erfolgsneutral."),
                ("Wareneinkauf auf Ziel über \(H.eur(netto)) zzgl. USt; die Ware ist am Bilanzstichtag noch vollständig vorhanden (Bestandsveränderung bereits erfasst).", 0,
                 "WEK −\(H.eur(netto)) wird durch die Bestandsmehrung (BVK +\(H.eur(netto))) ausgeglichen → per Saldo erfolgsneutral."),
                ("Der Inhaber entnimmt Waren (Einkaufspreis \(H.eur(netto)) netto) für private Zwecke.", netto,
                 "Ertragskonto Warenentnahmen +\(H.eur(netto)); die Privatentnahme selbst ist erfolgsneutral."),
            ]
            let (text, wirkung, erklaerung) = rng.wahl(faelle)
            return H.zahl("ge-auswirkung", .gewinnermittlung,
                          "Wie wirkt sich der Vorfall auf den Gewinn aus? (Gewinnminderung mit Minus, keine Auswirkung = 0)\n\n\(text)",
                          wirkung,
                          erklaerung,
                          quelle: "Skript Teil I, Auswirkungen von Buchungen auf Gewinn und BV")
        },
    ]
}
