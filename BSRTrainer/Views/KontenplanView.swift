import SwiftUI

struct KontenplanView: View {
    @State private var suche = ""

    var body: some View {
        NavigationStack {
            List {
                if suche.isEmpty {
                    Section {
                        NavigationLink {
                            MerksaetzeView()
                        } label: {
                            Label("Merksätze zum Buchen", systemImage: "lightbulb")
                        }
                    }
                }
                ForEach(Konto.klassen, id: \.self) { klasse in
                    let konten = Konto.konten(inKlasse: klasse).filter(passt)
                    if !konten.isEmpty {
                        Section(Konto.klassenTitel(klasse)) {
                            ForEach(konten) { konto in
                                NavigationLink {
                                    KontoDetailView(konto: konto)
                                } label: {
                                    KontoZeile(konto: konto)
                                }
                            }
                        }
                    }
                }
            }
            .searchable(text: $suche, prompt: "Konto suchen")
            .navigationTitle("Kontenplan")
        }
    }

    private func passt(_ konto: Konto) -> Bool {
        suche.isEmpty || konto.name.localizedStandardContains(suche) || konto.kurzname.localizedStandardContains(suche)
    }
}

struct KontoDetailView: View {
    let konto: Konto

    var body: some View {
        List {
            Section {
                LabeledContent("Kontenklasse", value: konto.klasse == 9 ? "Abschlusskonto" : "\(konto.klasse)")
                LabeledContent("Kontoart", value: konto.art.bezeichnung)
            }

            Section("T-Konto") {
                TKonto(konto: konto)
                    .padding(.vertical, 8)
            }

            Section("Buchungsregel") {
                Text(konto.buchungsregel)
                if let hinweis = konto.hinweis {
                    Text(hinweis).foregroundStyle(.secondary)
                }
            }
        }
        .navigationTitle(konto.kurzname)
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// Schematische Darstellung eines T-Kontos mit Zu- und Abgangsseite.
struct TKonto: View {
    let konto: Konto

    private var seiten: (soll: [String], haben: [String]) {
        switch konto.art {
        case .aktiv: return (["Anfangsbestand", "Zugänge"], ["Abgänge", "Schlussbestand (Saldo → SBK)"])
        case .passiv, .eigenkapital: return (["Abgänge", "Schlussbestand (Saldo → SBK)"], ["Anfangsbestand", "Zugänge"])
        case .aufwand:
            if konto.hinweis?.contains("im Haben") == true {
                return (["Saldo → WEK"], ["Minderungen (z. B. Skonto, Bonus)"])
            }
            return (["Aufwendungen"], ["Saldo → GuV / WEK"])
        case .ertrag:
            if konto.hinweis?.contains("im Soll") == true {
                return (["Erlösminderungen"], ["Saldo → WVK"])
            }
            return (["Saldo → GuV"], ["Erträge"])
        case .privat:
            return konto == .privatentnahmen ? (["Entnahmen"], ["Saldo → Eigenkapital"]) : (["Saldo → Eigenkapital"], ["Einlagen"])
        case .erfolg: return (["Bestandsminderung"], ["Bestandsmehrung"])
        case .abschluss:
            switch konto {
            case .ebk: return (["Anfangsbestände Passiva"], ["Anfangsbestände Aktiva"])
            case .sbk: return (["Schlussbestände Aktiva"], ["Schlussbestände Passiva"])
            default: return (["Aufwendungen", "(Gewinn → EK)"], ["Erträge", "(Verlust → EK)"])
            }
        }
    }

    var body: some View {
        VStack(spacing: 6) {
            Text(konto.kurzname).font(.headline)
            HStack(alignment: .top, spacing: 0) {
                spalte("Soll", seiten.soll, ausrichtung: .leading)
                Rectangle().frame(width: 2)
                spalte("Haben", seiten.haben, ausrichtung: .trailing)
            }
            .overlay(alignment: .top) {
                Rectangle().frame(height: 2).offset(y: 22)
            }
            .frame(minHeight: 110)
        }
    }

    private func spalte(_ titel: String, _ eintraege: [String], ausrichtung: HorizontalAlignment) -> some View {
        VStack(alignment: ausrichtung, spacing: 6) {
            Text(titel).font(.caption.weight(.bold)).foregroundStyle(.secondary)
                .frame(height: 20)
            ForEach(eintraege, id: \.self) { e in
                Text(e).font(.subheadline)
                    .multilineTextAlignment(ausrichtung == .leading ? .leading : .trailing)
            }
        }
        .frame(maxWidth: .infinity, alignment: ausrichtung == .leading ? .leading : .trailing)
        .padding(.horizontal, 10)
        .padding(.top, 4)
    }
}

struct MerksaetzeView: View {
    private let saetze: [(String, String)] = [
        ("Soll an Haben", "Zuerst das Konto der Sollbuchung, dann mit „an“ das Konto der Habenbuchung."),
        ("Keine Buchung ohne Gegenbuchung", "Jeder Geschäftsvorfall berührt mindestens zwei Konten; Summe Soll = Summe Haben."),
        ("Vier Fragen vor jeder Buchung", "1. Welche Konten? 2. Aktiv oder Passiv (Aufwand/Ertrag)? 3. Zu- oder Abgang? 4. Soll oder Haben?"),
        ("Aktivkonten", "Anfangsbestand und Zugänge im Soll, Abgänge im Haben."),
        ("Passivkonten", "Anfangsbestand und Zugänge im Haben, Abgänge im Soll."),
        ("Aufwand / Ertrag", "Unterkonten des Eigenkapitals: Aufwand mindert EK → Soll; Ertrag mehrt EK → Haben."),
        ("Entnahmen / Einlagen", "Privatentnahmen im Soll, Privateinlagen im Haben – erfolgsneutral."),
        ("Nettomethode", "Netto auf das Sachkonto, USt bzw. Vorsteuer auf eigene Konten, Brutto auf Geld-/Personenkonto."),
        ("Belasten / Gutschreiben", "Belasten = Soll (Lastschrift), Gutschreiben = Haben (Gutschrift)."),
        ("Saldo", "Steht auf der kleineren Seite und wird nach der größeren Seite benannt."),
        ("USt herausrechnen", "19 %: Brutto × 19/119 · 7 %: Brutto × 7/107"),
        ("Skonto mit USt", "Skonto netto auf Skontokonto, Skonto × USt-Satz als Steuerkorrektur (§ 17 UStG)."),
    ]

    var body: some View {
        List(saetze, id: \.0) { satz in
            VStack(alignment: .leading, spacing: 4) {
                Text(satz.0).font(.headline)
                Text(satz.1).foregroundStyle(.secondary)
            }
            .padding(.vertical, 2)
        }
        .navigationTitle("Merksätze")
    }
}
