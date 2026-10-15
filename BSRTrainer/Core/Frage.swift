import Foundation

/// Themengebiete laut Skript Bilanzsteuerrecht GS I, Teil I.
public enum Thema: String, CaseIterable, Identifiable, Codable, Hashable {
    case buchfuehrungspflicht
    case inventurBilanz
    case bilanzveraenderungen
    case bestandskonten
    case erfolgskonten
    case privatkonten
    case warenkonten
    case warenunterkonten
    case umsatzsteuer
    case abschluss
    case kalkulation
    case gewinnermittlung
    case grundbegriffe
    case buecher

    public var id: String { rawValue }

    public var titel: String {
        switch self {
        case .buchfuehrungspflicht: return "Buchführungspflicht"
        case .inventurBilanz: return "Inventur, Inventar & Bilanz"
        case .bilanzveraenderungen: return "Bilanzveränderungen"
        case .bestandskonten: return "Bestandskonten"
        case .erfolgskonten: return "Erfolgskonten"
        case .privatkonten: return "Privatkonten"
        case .warenkonten: return "Viergeteiltes Warenkonto"
        case .warenunterkonten: return "Rabatte, Skonti, Boni & Co."
        case .umsatzsteuer: return "Umsatzsteuer & Vorsteuer"
        case .abschluss: return "Eröffnung & Abschluss"
        case .kalkulation: return "Kalkulation"
        case .gewinnermittlung: return "Gewinnermittlung & GuV/BVV"
        case .grundbegriffe: return "Grundbegriffe"
        case .buecher: return "Grund-, Haupt- & Nebenbücher"
        }
    }

    public var untertitel: String {
        switch self {
        case .buchfuehrungspflicht: return "§§ 238, 241a HGB, §§ 140, 141 AO"
        case .inventurBilanz: return "§§ 240, 242, 247, 257 HGB"
        case .bilanzveraenderungen: return "Aktivtausch, Passivtausch, Mehrung, Minderung"
        case .bestandskonten: return "Aktiv- und Passivkonten buchen"
        case .erfolgskonten: return "Aufwand und Ertrag"
        case .privatkonten: return "Entnahmen und Einlagen"
        case .warenkonten: return "WBK, WEK, BVK, WVK"
        case .warenunterkonten: return "Bezugskosten, Rücksendungen, Nachlässe"
        case .umsatzsteuer: return "Nettomethode, Entgeltsminderung, Abschluss"
        case .abschluss: return "EBK, SBK, GuV, vorbereitende Buchungen"
        case .kalkulation: return "Rohgewinn, Aufschlagsätze, Einstandspreis"
        case .gewinnermittlung: return "§ 4 I 1 EStG, Mehr- und Weniger-Rechnung"
        case .grundbegriffe: return "Auszahlung, Ausgabe, Aufwand, Kosten"
        case .buecher: return "Journal, Kassenbericht, Belege"
        }
    }

    public var symbol: String {
        switch self {
        case .buchfuehrungspflicht: return "book.closed"
        case .inventurBilanz: return "list.clipboard"
        case .bilanzveraenderungen: return "arrow.left.arrow.right"
        case .bestandskonten: return "tray.2"
        case .erfolgskonten: return "chart.line.uptrend.xyaxis"
        case .privatkonten: return "person.crop.circle"
        case .warenkonten: return "shippingbox"
        case .warenunterkonten: return "percent"
        case .umsatzsteuer: return "eurosign.circle"
        case .abschluss: return "checkmark.seal"
        case .kalkulation: return "function"
        case .gewinnermittlung: return "sum"
        case .grundbegriffe: return "text.book.closed"
        case .buecher: return "books.vertical"
        }
    }
}

// MARK: - Aufgabentypen

public struct BuchungsAufgabe: Hashable {
    /// Zulässige Lösungen (meist genau eine).
    public let loesungen: [Buchungssatz]

    public init(_ loesungen: [Buchungssatz]) {
        precondition(!loesungen.isEmpty)
        self.loesungen = loesungen
    }
}

public struct AuswahlAufgabe: Hashable {
    public let optionen: [String]
    public let richtig: Set<Int>

    public init(optionen: [String], richtig: Set<Int>) {
        self.optionen = optionen
        self.richtig = richtig
    }

    public var mehrfachauswahl: Bool { richtig.count > 1 }

    /// Liefert die Aufgabe mit zufällig gemischten Antwortoptionen.
    public func gemischt(_ rng: inout Zufall) -> AuswahlAufgabe {
        let reihenfolge = Array(optionen.indices).shuffled(using: &rng)
        let neueOptionen = reihenfolge.map { optionen[$0] }
        let neuRichtig = Set(reihenfolge.enumerated().filter { richtig.contains($0.element) }.map { $0.offset })
        return AuswahlAufgabe(optionen: neueOptionen, richtig: neuRichtig)
    }
}

public struct ZahlAufgabe: Hashable {
    public let loesung: Decimal
    public let einheit: String
    /// Zulässige absolute Abweichung (z. B. 0,01 für Cent-Rundung).
    public let toleranz: Decimal

    public init(loesung: Decimal, einheit: String = "€", toleranz: Decimal = Geld.cent(1)) {
        self.loesung = loesung
        self.einheit = einheit
        self.toleranz = toleranz
    }

    public var loesungText: String {
        einheit == "%" ? Geld.prozentText(loesung) : Geld.text(loesung) + " " + einheit
    }
}

public enum Aufgabentyp: Hashable {
    case buchung(BuchungsAufgabe)
    case auswahl(AuswahlAufgabe)
    case zahl(ZahlAufgabe)

    public var bezeichnung: String {
        switch self {
        case .buchung: return "Buchungssatz"
        case .auswahl(let a): return a.mehrfachauswahl ? "Mehrfachauswahl" : "Auswahl"
        case .zahl: return "Berechnung"
        }
    }
}

public struct Frage: Identifiable, Hashable {
    public let id: String
    public let thema: Thema
    public let text: String
    public let typ: Aufgabentyp
    public let erklaerung: String
    public let quelle: String?

    public init(id: String, thema: Thema, text: String, typ: Aufgabentyp, erklaerung: String, quelle: String? = nil) {
        self.id = id
        self.thema = thema
        self.text = text
        self.typ = typ
        self.erklaerung = erklaerung
        self.quelle = quelle
    }
}

// MARK: - Antworten

public enum Antwort: Hashable {
    case buchung([Eingabezeile])
    case auswahl(Set<Int>)
    case zahl(String)

    public static func leer(fuer typ: Aufgabentyp) -> Antwort {
        switch typ {
        case .buchung:
            return .buchung([Eingabezeile(seite: .soll), Eingabezeile(seite: .haben)])
        case .auswahl:
            return .auswahl([])
        case .zahl:
            return .zahl("")
        }
    }

    public var istLeer: Bool {
        switch self {
        case .buchung(let zeilen): return zeilen.allSatisfy { $0.konto == nil && $0.betragText.isEmpty }
        case .auswahl(let s): return s.isEmpty
        case .zahl(let t): return t.trimmingCharacters(in: .whitespaces).isEmpty
        }
    }
}

public enum Bewertung: Hashable {
    case buchung(BuchungsBewertung)
    case auswahl(korrekt: Bool, richtig: Set<Int>)
    case zahl(korrekt: Bool, loesung: String, eingabeLesbar: Bool)

    public var korrekt: Bool {
        switch self {
        case .buchung(let b): return b.korrekt
        case .auswahl(let k, _): return k
        case .zahl(let k, _, _): return k
        }
    }
}

public extension Frage {
    func bewerte(_ antwort: Antwort) -> Bewertung {
        switch (typ, antwort) {
        case (.buchung(let aufgabe), .buchung(let zeilen)):
            return .buchung(Buchungspruefer.pruefe(zeilen, loesungen: aufgabe.loesungen))
        case (.auswahl(let aufgabe), .auswahl(let gewaehlt)):
            return .auswahl(korrekt: gewaehlt == aufgabe.richtig, richtig: aufgabe.richtig)
        case (.zahl(let aufgabe), .zahl(let text)):
            guard let wert = Geld.lesen(text) else {
                return .zahl(korrekt: false, loesung: aufgabe.loesungText, eingabeLesbar: false)
            }
            var differenz = wert - aufgabe.loesung
            if differenz < 0 { differenz = -differenz }
            return .zahl(korrekt: differenz <= aufgabe.toleranz, loesung: aufgabe.loesungText, eingabeLesbar: true)
        case (.buchung(let aufgabe), _):
            return .buchung(Buchungspruefer.pruefe([], loesungen: aufgabe.loesungen))
        case (.auswahl(let aufgabe), _):
            return .auswahl(korrekt: false, richtig: aufgabe.richtig)
        case (.zahl(let aufgabe), _):
            return .zahl(korrekt: false, loesung: aufgabe.loesungText, eingabeLesbar: false)
        }
    }
}

// MARK: - Zufallsgenerator

/// Deterministischer Zufallsgenerator (SplitMix64) – reproduzierbar in Tests.
public struct Zufall: RandomNumberGenerator {
    private var zustand: UInt64

    public init(seed: UInt64) {
        zustand = seed
    }

    public init() {
        zustand = UInt64.random(in: .min ... .max)
    }

    public mutating func next() -> UInt64 {
        zustand &+= 0x9E37_79B9_7F4A_7C15
        var z = zustand
        z = (z ^ (z >> 30)) &* 0xBF58_476D_1CE4_E5B9
        z = (z ^ (z >> 27)) &* 0x94D0_49BB_1331_11EB
        return z ^ (z >> 31)
    }

    /// Glatter Betrag im Raster, z. B. `betrag(500, 20_000, raster: 100)`.
    public mutating func betrag(_ von: Int, _ bis: Int, raster: Int = 100) -> Decimal {
        let n = Int.random(in: (von / raster)...(bis / raster), using: &self)
        return Decimal(n * raster)
    }

    public mutating func zahl(_ bereich: ClosedRange<Int>) -> Int {
        Int.random(in: bereich, using: &self)
    }

    public mutating func wahl<T>(_ werte: [T]) -> T {
        werte.randomElement(using: &self)!
    }

    public mutating func muenzwurf() -> Bool {
        Bool.random(using: &self)
    }
}
