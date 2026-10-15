import Foundation
import Observation

/// Eine Übungs- oder Klausursitzung mit einer festen Liste von Aufgaben.
@Observable
final class Sitzung: Identifiable {

    enum Modus: Equatable {
        case uebung(themen: Set<Thema>, nurBuchungssaetze: Bool)
        case klausur(minuten: Int?)
    }

    static let uebungsLaenge = 10

    let id = UUID()
    let modus: Modus
    let fragen: [Frage]
    var antworten: [Antwort]
    private(set) var bewertungen: [Bewertung?]
    var index = 0
    private(set) var beendet = false
    let start = Date()
    private(set) var ende: Date?

    init(modus: Modus, fragen: [Frage]) {
        self.modus = modus
        self.fragen = fragen
        self.antworten = fragen.map { Antwort.leer(fuer: $0.typ) }
        self.bewertungen = Array(repeating: nil, count: fragen.count)
    }

    static func uebung(themen: Set<Thema>, nurBuchungssaetze: Bool = false, anzahl: Int = uebungsLaenge) -> Sitzung {
        var rng = Zufall()
        let fragen = Katalog.fragen(themen: themen, anzahl: anzahl, nurBuchungssaetze: nurBuchungssaetze, rng: &rng)
        return Sitzung(modus: .uebung(themen: themen, nurBuchungssaetze: nurBuchungssaetze), fragen: fragen)
    }

    static func klausur(anzahl: Int, minuten: Int?) -> Sitzung {
        var rng = Zufall()
        return Sitzung(modus: .klausur(minuten: minuten), fragen: Katalog.klausur(anzahl: anzahl, rng: &rng))
    }

    /// Neue Sitzung mit denselben Einstellungen.
    func wiederholen() -> Sitzung {
        switch modus {
        case .uebung(let themen, let nurBuchung):
            return .uebung(themen: themen, nurBuchungssaetze: nurBuchung, anzahl: fragen.count)
        case .klausur(let minuten):
            return .klausur(anzahl: fragen.count, minuten: minuten)
        }
    }

    var istKlausur: Bool {
        if case .klausur = modus { return true }
        return false
    }

    var titel: String {
        switch modus {
        case .klausur: return "Klausur"
        case .uebung(let themen, let nurBuchung):
            if nurBuchung { return "Buchungssätze" }
            if themen.count == 1, let thema = themen.first { return thema.titel }
            return "Gemischte Übung"
        }
    }

    var aktuelleFrage: Frage { fragen[index] }
    var aktuelleBewertung: Bewertung? { bewertungen[index] }
    var istLetzte: Bool { index == fragen.count - 1 }

    var anzahlRichtig: Int { bewertungen.compactMap { $0 }.filter(\.korrekt).count }
    var anzahlBeantwortet: Int { antworten.filter { !$0.istLeer }.count }

    var dauerSekunden: Int {
        Int((ende ?? Date()).timeIntervalSince(start))
    }

    func restSekunden(jetzt: Date) -> Int? {
        guard case .klausur(let minuten?) = modus else { return nil }
        return max(0, minuten * 60 - Int(jetzt.timeIntervalSince(start)))
    }

    // MARK: Übungsmodus

    /// Prüft die aktuelle Antwort (Übungsmodus) und erfasst das Ergebnis in der Statistik.
    @discardableResult
    func pruefen(_ lernstand: Lernstand) -> Bewertung {
        if let vorhanden = bewertungen[index] { return vorhanden }
        let bewertung = aktuelleFrage.bewerte(antworten[index])
        bewertungen[index] = bewertung
        lernstand.erfasse(aktuelleFrage, korrekt: bewertung.korrekt)
        return bewertung
    }

    func weiter() {
        if istLetzte {
            if !istKlausur {
                ende = Date()
                beendet = true
            }
        } else {
            index += 1
        }
    }

    func zurueck() {
        if index > 0 { index -= 1 }
    }

    // MARK: Klausurmodus

    func abgeben(_ lernstand: Lernstand) {
        guard !beendet else { return }
        for i in fragen.indices where bewertungen[i] == nil {
            let bewertung = fragen[i].bewerte(antworten[i])
            bewertungen[i] = bewertung
            lernstand.erfasse(fragen[i], korrekt: bewertung.korrekt)
        }
        ende = Date()
        beendet = true
        if istKlausur {
            lernstand.statistik.klausuren.append(.init(datum: start, richtig: anzahlRichtig,
                                                       gesamt: fragen.count, dauerSekunden: dauerSekunden))
        }
    }

    func bewertung(_ i: Int) -> Bewertung? { bewertungen[i] }
}
