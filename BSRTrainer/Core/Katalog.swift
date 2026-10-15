import Foundation

/// Zentrale Sammlung aller Aufgaben und Auswahl für Übungs- und Klausurmodus.
public enum Katalog {

    public static let vorlagen: [Vorlage] = Vorlagen.alle + FesteFragen.alle

    public static func vorlagen(fuer thema: Thema) -> [Vorlage] {
        vorlagen.filter { $0.thema == thema }
    }

    public static func anzahlVorlagen(fuer thema: Thema) -> Int {
        vorlagen(fuer: thema).count
    }

    /// Zieht `anzahl` Aufgaben aus den Themen. Jede Vorlage wird erst wiederholt,
    /// wenn alle Vorlagen einmal dran waren (bei Generatoren mit neuen Zahlen).
    public static func fragen(themen: Set<Thema>, anzahl: Int, nurBuchungssaetze: Bool = false,
                              rng: inout Zufall) -> [Frage] {
        var pool = vorlagen.filter { themen.contains($0.thema) }
        guard !pool.isEmpty, anzahl > 0 else { return [] }

        if nurBuchungssaetze {
            // Probeweise erzeugen und nur Buchungsaufgaben behalten.
            pool = pool.filter { vorlage in
                var probe = Zufall(seed: 1)
                if case .buchung = vorlage.erzeugen(&probe).typ { return true }
                return false
            }
            if pool.isEmpty { return [] }
        }

        var ergebnis: [Frage] = []
        var runde: [Vorlage] = []
        while ergebnis.count < anzahl {
            if runde.isEmpty { runde = pool.shuffled(using: &rng) }
            let vorlage = runde.removeLast()
            ergebnis.append(vorlage.erzeugen(&rng))
        }
        return ergebnis
    }

    /// Klausur: Mischung über alle Themen, Buchungssätze sind stärker gewichtet (wie in der Klausur).
    public static func klausur(anzahl: Int, rng: inout Zufall) -> [Frage] {
        let buchungen = fragen(themen: Set(Thema.allCases), anzahl: (anzahl * 6 + 9) / 10,
                               nurBuchungssaetze: true, rng: &rng)
        let rest = fragen(themen: Set(Thema.allCases), anzahl: anzahl - buchungen.count, rng: &rng)
        return (buchungen + rest).shuffled(using: &rng)
    }
}
