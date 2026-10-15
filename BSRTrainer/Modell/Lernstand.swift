import Foundation
import Observation

/// Hält den Lernfortschritt und speichert ihn in den UserDefaults.
@Observable
final class Lernstand {
    private static let schluessel = "bsrtrainer.statistik.v1"

    var statistik: Statistik {
        didSet { speichern() }
    }

    init() {
        if let daten = UserDefaults.standard.data(forKey: Self.schluessel),
           let gespeichert = try? JSONDecoder().decode(Statistik.self, from: daten) {
            statistik = gespeichert
        } else {
            statistik = Statistik()
        }
    }

    func erfasse(_ frage: Frage, korrekt: Bool) {
        statistik.erfasse(thema: frage.thema, korrekt: korrekt)
    }

    func zuruecksetzen() {
        statistik = Statistik()
    }

    private func speichern() {
        if let daten = try? JSONEncoder().encode(statistik) {
            UserDefaults.standard.set(daten, forKey: Self.schluessel)
        }
    }
}
