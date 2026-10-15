import XCTest
@testable import BSRCore

final class GeldTests: XCTestCase {
    func testLesen() {
        XCTAssertEqual(Geld.lesen("1.234,56"), Decimal(string: "1234.56"))
        XCTAssertEqual(Geld.lesen("1234,56"), Decimal(string: "1234.56"))
        XCTAssertEqual(Geld.lesen("1234.56"), Decimal(string: "1234.56"))
        XCTAssertEqual(Geld.lesen("1.000"), 1000)
        XCTAssertEqual(Geld.lesen("12.500.000"), 12_500_000)
        XCTAssertEqual(Geld.lesen("-500"), -500)
        XCTAssertEqual(Geld.lesen("1.190 €"), 1190)
        XCTAssertEqual(Geld.lesen(" 25 % "), 25)
        XCTAssertEqual(Geld.lesen("0,5"), Decimal(string: "0.5"))
        XCTAssertNil(Geld.lesen(""))
        XCTAssertNil(Geld.lesen("abc"))
        XCTAssertNil(Geld.lesen("1-2"))
    }

    func testFormat() {
        XCTAssertEqual(Geld.text(Decimal(string: "1234.5")!), "1.234,50")
        XCTAssertEqual(Geld.euro(1200), "1.200 €")
        XCTAssertEqual(Geld.euro(Decimal(string: "41.666")!), "41,67 €")
        XCTAssertEqual(Geld.prozentText(25), "25 %")
    }

    func testRunden() {
        XCTAssertEqual(Geld.prozent(95, 3), Decimal(string: "2.85"))
        XCTAssertEqual(Geld.prozent(1_000, 19), 190)
    }
}

final class PrueferTests: XCTestCase {
    let loesung = Buchungssatz([(.wareneingang, 1_000), (.vorsteuer, 190)], an: [(.verbindlichkeitenLuL, 1_190)])

    func testRichtigInBeliebigerReihenfolge() {
        let eingabe = [
            Eingabezeile(seite: .haben, konto: .verbindlichkeitenLuL, betragText: "1.190,00"),
            Eingabezeile(seite: .soll, konto: .vorsteuer, betragText: "190"),
            Eingabezeile(seite: .soll, konto: .wareneingang, betragText: "1000"),
        ]
        XCTAssertTrue(Buchungspruefer.pruefe(eingabe, loesungen: [loesung]).korrekt)
    }

    func testGleichesKontoMehrfachWirdAddiert() {
        let eingabe = [
            Eingabezeile(seite: .soll, konto: .wareneingang, betragText: "600"),
            Eingabezeile(seite: .soll, konto: .wareneingang, betragText: "400"),
            Eingabezeile(seite: .soll, konto: .vorsteuer, betragText: "190"),
            Eingabezeile(seite: .haben, konto: .verbindlichkeitenLuL, betragText: "1190"),
        ]
        XCTAssertTrue(Buchungspruefer.pruefe(eingabe, loesungen: [loesung]).korrekt)
    }

    func testFalscherBetragUndFehlendeZeile() {
        let falsch = Eingabezeile(seite: .soll, konto: .wareneingang, betragText: "1190")
        let eingabe = [falsch, Eingabezeile(seite: .haben, konto: .verbindlichkeitenLuL, betragText: "1190")]
        let b = Buchungspruefer.pruefe(eingabe, loesungen: [loesung])
        XCTAssertFalse(b.korrekt)
        XCTAssertEqual(b.zeilen[falsch.id], .falscherBetrag(erwartet: 1_000))
        XCTAssertEqual(b.fehlend.map(\.konto), [.vorsteuer])
    }

    func testFalscheSeite() {
        let zeile = Eingabezeile(seite: .haben, konto: .wareneingang, betragText: "1000")
        let b = Buchungspruefer.pruefe([zeile], loesungen: [loesung])
        XCTAssertEqual(b.zeilen[zeile.id], .falschesKonto)
        XCTAssertFalse(b.korrekt)
    }

    func testLeereEingabeIstFalsch() {
        XCTAssertFalse(Buchungspruefer.pruefe([], loesungen: [loesung]).korrekt)
        XCTAssertFalse(Buchungspruefer.pruefe([Eingabezeile(seite: .soll)], loesungen: [loesung]).korrekt)
    }

    func testAlternativeLoesung() {
        let alternative = Buchungssatz([(.wareneingang, 1_040)], an: [(.verbindlichkeitenLuL, 1_040)])
        let haupt = Buchungssatz([(.wareneingang, 1_000), (.warenbezugskosten, 40)], an: [(.verbindlichkeitenLuL, 1_040)])
        let eingabe = [Eingabezeile(seite: .soll, konto: .wareneingang, betragText: "1040"),
                       Eingabezeile(seite: .haben, konto: .verbindlichkeitenLuL, betragText: "1040")]
        XCTAssertTrue(Buchungspruefer.pruefe(eingabe, loesungen: [haupt, alternative]).korrekt)
    }
}

final class KatalogTests: XCTestCase {

    /// Erzeugt aus der Musterlösung die passende Nutzereingabe.
    private func eingabe(aus satz: Buchungssatz) -> [Eingabezeile] {
        satz.soll.map { Eingabezeile(seite: .soll, konto: $0.konto, betragText: Geld.text($0.betrag)) }
            + satz.haben.map { Eingabezeile(seite: .haben, konto: $0.konto, betragText: Geld.text($0.betrag)) }
    }

    func testEindeutigeIDs() {
        let ids = Katalog.vorlagen.map(\.id)
        XCTAssertEqual(ids.count, Set(ids).count, "Doppelte Vorlagen-IDs")
        let karten = Lernkarten.alle.map(\.id)
        XCTAssertEqual(karten.count, Set(karten).count, "Doppelte Lernkarten-IDs")
    }

    func testJedesThemaHatAufgaben() {
        for thema in Thema.allCases {
            XCTAssertGreaterThanOrEqual(Katalog.anzahlVorlagen(fuer: thema), 3, "Zu wenige Aufgaben: \(thema)")
        }
    }

    func testAlleVorlagenErzeugenLoesbareAufgaben() {
        for vorlage in Katalog.vorlagen {
            for seed in 0..<300 {
                var rng = Zufall(seed: UInt64(seed))
                let frage = vorlage.erzeugen(&rng)
                let kontext = "\(vorlage.id) seed \(seed)"
                XCTAssertEqual(frage.thema, vorlage.thema, kontext)
                XCTAssertFalse(frage.text.isEmpty, kontext)
                XCTAssertFalse(frage.erklaerung.isEmpty, kontext)

                switch frage.typ {
                case .buchung(let aufgabe):
                    for satz in aufgabe.loesungen {
                        XCTAssertTrue(satz.istAusgeglichen, "Soll ≠ Haben: \(kontext): \(satz.text)")
                        XCTAssertFalse(satz.soll.isEmpty, kontext)
                        XCTAssertFalse(satz.haben.isEmpty, kontext)
                        for p in satz.soll + satz.haben {
                            XCTAssertGreaterThan(p.betrag, 0, "Betrag ≤ 0: \(kontext): \(satz.text)")
                            XCTAssertEqual(p.betrag, Geld.runden(p.betrag), "Mehr als 2 Nachkommastellen: \(kontext)")
                        }
                        let bewertung = frage.bewerte(.buchung(eingabe(aus: satz)))
                        XCTAssertTrue(bewertung.korrekt, "Musterlösung wird nicht akzeptiert: \(kontext)")
                    }
                    XCTAssertFalse(frage.bewerte(.buchung([])).korrekt, kontext)

                case .auswahl(let aufgabe):
                    XCTAssertGreaterThanOrEqual(aufgabe.optionen.count, 2, kontext)
                    XCTAssertFalse(aufgabe.richtig.isEmpty, kontext)
                    XCTAssertTrue(aufgabe.richtig.allSatisfy { aufgabe.optionen.indices.contains($0) }, kontext)
                    XCTAssertEqual(Set(aufgabe.optionen).count, aufgabe.optionen.count, "Doppelte Optionen: \(kontext)")
                    XCTAssertTrue(frage.bewerte(.auswahl(aufgabe.richtig)).korrekt, kontext)
                    if aufgabe.richtig.count < aufgabe.optionen.count {
                        let falsch = Set(aufgabe.optionen.indices).subtracting(aufgabe.richtig)
                        XCTAssertFalse(frage.bewerte(.auswahl(falsch)).korrekt, kontext)
                    }

                case .zahl(let aufgabe):
                    XCTAssertEqual(aufgabe.loesung, Geld.runden(aufgabe.loesung), kontext)
                    XCTAssertTrue(frage.bewerte(.zahl(Geld.text(aufgabe.loesung))).korrekt, "Lösung nicht akzeptiert: \(kontext)")
                    XCTAssertFalse(frage.bewerte(.zahl(Geld.text(aufgabe.loesung + 1))).korrekt, kontext)
                }
            }
        }
    }

    func testKlausurMischung() {
        var rng = Zufall(seed: 42)
        let fragen = Katalog.klausur(anzahl: 20, rng: &rng)
        XCTAssertEqual(fragen.count, 20)
        let buchungen = fragen.filter { if case .buchung = $0.typ { return true }; return false }
        XCTAssertGreaterThanOrEqual(buchungen.count, 12)
    }

    func testUebungOhneWiederholungInnerhalbEinerRunde() {
        var rng = Zufall(seed: 7)
        let thema = Thema.buchfuehrungspflicht
        let n = Katalog.anzahlVorlagen(fuer: thema)
        let fragen = Katalog.fragen(themen: [thema], anzahl: n, rng: &rng)
        XCTAssertEqual(Set(fragen.map(\.id)).count, n)
    }
}
