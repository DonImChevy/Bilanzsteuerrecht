import Foundation

public enum Seite: String, Codable, CaseIterable, Hashable {
    case soll
    case haben

    public var titel: String { self == .soll ? "Soll" : "Haben" }
}

/// Eine Kontierung innerhalb eines Buchungssatzes.
public struct Posten: Hashable, Codable {
    public let konto: Konto
    public let betrag: Decimal

    public init(_ konto: Konto, _ betrag: Decimal) {
        self.konto = konto
        self.betrag = Geld.runden(betrag)
    }
}

/// "Soll an Haben" – einfacher oder zusammengesetzter Buchungssatz.
public struct Buchungssatz: Hashable, Codable {
    public let soll: [Posten]
    public let haben: [Posten]

    public init(soll: [Posten], haben: [Posten]) {
        self.soll = soll
        self.haben = haben
    }

    /// Kurzschreibweise: `Buchungssatz([(.bank, 100)], an: [(.kasse, 100)])`
    public init(_ soll: [(Konto, Decimal)], an haben: [(Konto, Decimal)]) {
        self.soll = soll.map { Posten($0.0, $0.1) }
        self.haben = haben.map { Posten($0.0, $0.1) }
    }

    /// Einfacher Buchungssatz mit einem Betrag.
    public init(_ soll: Konto, an haben: Konto, _ betrag: Decimal) {
        self.init([(soll, betrag)], an: [(haben, betrag)])
    }

    public var summeSoll: Decimal { soll.reduce(0) { $0 + $1.betrag } }
    public var summeHaben: Decimal { haben.reduce(0) { $0 + $1.betrag } }
    public var istAusgeglichen: Bool { summeSoll == summeHaben }

    /// Alle Posten mit Seite, Beträge je Konto und Seite zusammengefasst.
    public var normalisiert: [Kontierung: Decimal] {
        var ergebnis: [Kontierung: Decimal] = [:]
        for p in soll { ergebnis[Kontierung(seite: .soll, konto: p.konto), default: 0] += p.betrag }
        for p in haben { ergebnis[Kontierung(seite: .haben, konto: p.konto), default: 0] += p.betrag }
        return ergebnis.mapValues { Geld.runden($0) }
    }

    /// Lesbare Darstellung: "WEK 1.000,00 / Vorsteuer 190,00 an Verbindlichkeiten aus L.u.L. 1.190,00"
    public var text: String {
        let s = soll.map { "\($0.konto.kurzname) \(Geld.text($0.betrag))" }.joined(separator: " / ")
        let h = haben.map { "\($0.konto.kurzname) \(Geld.text($0.betrag))" }.joined(separator: " / ")
        return "\(s) an \(h)"
    }
}

public struct Kontierung: Hashable, Codable {
    public let seite: Seite
    public let konto: Konto
}

/// Eine vom Nutzer eingegebene Zeile (Betrag als Text, wie eingetippt).
public struct Eingabezeile: Identifiable, Hashable, Codable {
    public var id: UUID
    public var seite: Seite
    public var konto: Konto?
    public var betragText: String

    public init(id: UUID = UUID(), seite: Seite, konto: Konto? = nil, betragText: String = "") {
        self.id = id
        self.seite = seite
        self.konto = konto
        self.betragText = betragText
    }

    public var betrag: Decimal? { Geld.lesen(betragText) }
}

/// Ergebnis der Prüfung eines eingegebenen Buchungssatzes.
public struct BuchungsBewertung: Hashable {
    public enum Status: Hashable {
        case richtig
        case falscherBetrag(erwartet: Decimal)
        case falschesKonto
        case unvollstaendig
    }

    public let korrekt: Bool
    /// Status je Eingabezeile (per ID).
    public let zeilen: [UUID: Status]
    /// Kontierungen der Musterlösung, die in der Eingabe fehlen.
    public let fehlend: [FehlenderPosten]
    public let loesung: Buchungssatz
    public let sollHabenGleich: Bool

    public struct FehlenderPosten: Hashable {
        public let seite: Seite
        public let konto: Konto
        public let betrag: Decimal
    }
}

public enum Buchungspruefer {

    /// Prüft die Eingabe gegen alle zulässigen Lösungen und liefert die beste Übereinstimmung.
    public static func pruefe(_ eingabe: [Eingabezeile], loesungen: [Buchungssatz]) -> BuchungsBewertung {
        precondition(!loesungen.isEmpty, "Mindestens eine Lösung erforderlich")
        let bewertungen = loesungen.map { pruefe(eingabe, loesung: $0) }
        if let richtig = bewertungen.first(where: { $0.korrekt }) { return richtig }
        return bewertungen.min { fehlerzahl($0) < fehlerzahl($1) }!
    }

    private static func fehlerzahl(_ b: BuchungsBewertung) -> Int {
        let falsch = b.zeilen.values.filter { $0 != .richtig }.count
        return falsch + b.fehlend.count
    }

    public static func pruefe(_ eingabe: [Eingabezeile], loesung: Buchungssatz) -> BuchungsBewertung {
        let soll = loesung.normalisiert

        // Eingabe zusammenfassen (gleiches Konto auf gleicher Seite wird addiert).
        var summen: [Kontierung: Decimal] = [:]
        var unvollstaendig = Set<UUID>()
        for zeile in eingabe {
            guard let konto = zeile.konto, let betrag = zeile.betrag else {
                if zeile.konto != nil || !zeile.betragText.isEmpty { unvollstaendig.insert(zeile.id) }
                continue
            }
            summen[Kontierung(seite: zeile.seite, konto: konto), default: 0] += Geld.runden(betrag)
        }

        var status: [UUID: BuchungsBewertung.Status] = [:]
        for zeile in eingabe {
            if unvollstaendig.contains(zeile.id) {
                status[zeile.id] = .unvollstaendig
                continue
            }
            guard let konto = zeile.konto else { continue }
            let schluessel = Kontierung(seite: zeile.seite, konto: konto)
            if let erwartet = soll[schluessel] {
                status[zeile.id] = Geld.runden(summen[schluessel] ?? 0) == erwartet
                    ? .richtig
                    : .falscherBetrag(erwartet: erwartet)
            } else {
                status[zeile.id] = .falschesKonto
            }
        }

        let fehlend = soll
            .filter { summen[$0.key] == nil }
            .map { BuchungsBewertung.FehlenderPosten(seite: $0.key.seite, konto: $0.key.konto, betrag: $0.value) }
            .sorted { ($0.seite == .soll ? 0 : 1, $0.konto.name) < ($1.seite == .soll ? 0 : 1, $1.konto.name) }

        let summeSoll = summen.filter { $0.key.seite == .soll }.values.reduce(0, +)
        let summeHaben = summen.filter { $0.key.seite == .haben }.values.reduce(0, +)

        let korrekt = !status.isEmpty
            && status.values.allSatisfy { $0 == .richtig }
            && fehlend.isEmpty

        return BuchungsBewertung(
            korrekt: korrekt,
            zeilen: status,
            fehlend: fehlend,
            loesung: loesung,
            sollHabenGleich: Geld.runden(summeSoll) == Geld.runden(summeHaben)
        )
    }
}
