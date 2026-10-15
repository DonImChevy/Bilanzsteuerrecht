import SwiftUI

struct ThemenView: View {
    @Environment(Lernstand.self) private var lernstand
    @State private var sitzung: Sitzung?
    @State private var zeigeInfo = false

    var body: some View {
        NavigationStack {
            List {
                Section {
                    SchnellstartKarte(
                        titel: "Buchungssätze trainieren",
                        text: "10 zufällige Geschäftsvorfälle aus allen Themen – jedes Mal mit neuen Beträgen.",
                        symbol: "square.and.pencil"
                    ) {
                        sitzung = .uebung(themen: Set(Thema.allCases), nurBuchungssaetze: true)
                    }
                    SchnellstartKarte(
                        titel: "Alles gemischt",
                        text: "Buchungssätze, Theorie- und Rechenaufgaben quer durch das Skript.",
                        symbol: "shuffle"
                    ) {
                        sitzung = .uebung(themen: Set(Thema.allCases))
                    }
                    if let schwach = lernstand.statistik.schwaechsteThemen.first,
                       lernstand.statistik.zaehler(schwach).quote < 0.8 {
                        SchnellstartKarte(
                            titel: "Schwächstes Thema",
                            text: "\(schwach.titel) – bisher \(Int(lernstand.statistik.zaehler(schwach).quote * 100)) % richtig.",
                            symbol: "target"
                        ) {
                            sitzung = .uebung(themen: [schwach])
                        }
                    }
                } header: {
                    Text("Schnellstart")
                }

                Section {
                    ForEach(Thema.allCases) { thema in
                        Button {
                            sitzung = .uebung(themen: [thema])
                        } label: {
                            ThemaZeile(thema: thema, zaehler: lernstand.statistik.zaehler(thema))
                        }
                        .buttonStyle(.plain)
                    }
                } header: {
                    Text("Themen (Skript Teil I)")
                }
            }
            .navigationTitle("BSR-Trainer")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        zeigeInfo = true
                    } label: {
                        Image(systemName: "info.circle")
                    }
                    .accessibilityLabel("Info")
                }
            }
            .sheet(isPresented: $zeigeInfo) {
                InfoView()
            }
            .fullScreenCover(item: $sitzung) { s in
                SitzungView(sitzung: s)
            }
        }
    }
}

struct SchnellstartKarte: View {
    let titel: String
    let text: String
    let symbol: String
    let aktion: () -> Void

    var body: some View {
        Button(action: aktion) {
            HStack(spacing: 14) {
                Image(systemName: symbol)
                    .font(.title2)
                    .frame(width: 44, height: 44)
                    .background(Color.accentColor.opacity(0.15), in: RoundedRectangle(cornerRadius: 10))
                    .foregroundStyle(Color.accentColor)
                VStack(alignment: .leading, spacing: 2) {
                    Text(titel).font(.headline)
                    Text(text).font(.subheadline).foregroundStyle(.secondary)
                }
                Spacer(minLength: 0)
                Image(systemName: "chevron.right").foregroundStyle(.tertiary)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}

struct ThemaZeile: View {
    let thema: Thema
    let zaehler: Statistik.Zaehler

    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: thema.symbol)
                .font(.title3)
                .frame(width: 32)
                .foregroundStyle(Color.accentColor)
            VStack(alignment: .leading, spacing: 4) {
                Text(thema.titel).font(.body.weight(.medium))
                Text(thema.untertitel).font(.caption).foregroundStyle(.secondary)
                if zaehler.beantwortet > 0 {
                    ProgressView(value: zaehler.quote)
                        .tint(zaehler.quote >= 0.8 ? .green : zaehler.quote >= 0.5 ? .orange : .red)
                }
            }
            Spacer(minLength: 0)
            if zaehler.beantwortet > 0 {
                Text("\(zaehler.richtig)/\(zaehler.beantwortet)")
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
        .contentShape(Rectangle())
    }
}

#Preview {
    ThemenView()
        .environment(Lernstand())
}
