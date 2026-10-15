import Foundation

/// Lernfortschritt, wird als JSON lokal gespeichert.
public struct Statistik: Codable, Equatable {

    public struct Zaehler: Codable, Equatable {
        public var beantwortet = 0
        public var richtig = 0

        public var quote: Double {
            beantwortet == 0 ? 0 : Double(richtig) / Double(beantwortet)
        }
    }

    public struct Klausurergebnis: Codable, Equatable, Identifiable {
        public var id = UUID()
        public var datum: Date
        public var richtig: Int
        public var gesamt: Int
        public var dauerSekunden: Int

        public var quote: Double { gesamt == 0 ? 0 : Double(richtig) / Double(gesamt) }
    }

    public var proThema: [String: Zaehler] = [:]
    public var klausuren: [Klausurergebnis] = []
    public var lernkartenGewusst: Set<String> = []

    public init() {}

    public func zaehler(_ thema: Thema) -> Zaehler {
        proThema[thema.rawValue] ?? Zaehler()
    }

    public mutating func erfasse(thema: Thema, korrekt: Bool) {
        var z = zaehler(thema)
        z.beantwortet += 1
        if korrekt { z.richtig += 1 }
        proThema[thema.rawValue] = z
    }

    public var gesamt: Zaehler {
        proThema.values.reduce(into: Zaehler()) { summe, z in
            summe.beantwortet += z.beantwortet
            summe.richtig += z.richtig
        }
    }

    /// Themen mit der schlechtesten Quote zuerst (mind. 3 beantwortete Aufgaben).
    public var schwaechsteThemen: [Thema] {
        Thema.allCases
            .filter { zaehler($0).beantwortet >= 3 }
            .sorted { zaehler($0).quote < zaehler($1).quote }
    }
}
