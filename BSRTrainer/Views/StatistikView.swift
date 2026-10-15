import SwiftUI

struct StatistikView: View {
    @Environment(Lernstand.self) private var lernstand
    @State private var zeigeReset = false

    var body: some View {
        NavigationStack {
            List {
                let gesamt = lernstand.statistik.gesamt
                Section {
                    HStack(spacing: 20) {
                        Gauge(value: gesamt.quote) {
                            EmptyView()
                        } currentValueLabel: {
                            Text("\(Int((gesamt.quote * 100).rounded()))")
                        }
                        .gaugeStyle(.accessoryCircularCapacity)
                        .tint(.accentColor)
                        .scaleEffect(1.3)
                        .padding(8)
                        VStack(alignment: .leading, spacing: 4) {
                            Text("\(gesamt.richtig) von \(gesamt.beantwortet) richtig")
                                .font(.headline)
                            Text("\(lernstand.statistik.klausuren.count) Klausuren · \(lernstand.statistik.lernkartenGewusst.count)/\(Lernkarten.alle.count) Lernkarten gewusst")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .padding(.vertical, 6)
                } header: {
                    Text("Gesamt")
                }

                Section("Nach Thema") {
                    ForEach(Thema.allCases) { thema in
                        let z = lernstand.statistik.zaehler(thema)
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Label(thema.titel, systemImage: thema.symbol)
                                Spacer()
                                Text(z.beantwortet == 0 ? "–" : "\(Int((z.quote * 100).rounded())) %")
                                    .font(.subheadline.monospacedDigit())
                                    .foregroundStyle(.secondary)
                            }
                            ProgressView(value: z.quote)
                                .tint(z.beantwortet == 0 ? .gray : z.quote >= 0.8 ? .green : z.quote >= 0.5 ? .orange : .red)
                            Text("\(z.richtig)/\(z.beantwortet) richtig · \(Katalog.anzahlVorlagen(fuer: thema)) Aufgabentypen")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        .padding(.vertical, 2)
                    }
                }

                Section {
                    Button("Fortschritt zurücksetzen", role: .destructive) {
                        zeigeReset = true
                    }
                }
            }
            .navigationTitle("Fortschritt")
            .confirmationDialog("Gesamten Fortschritt löschen?", isPresented: $zeigeReset, titleVisibility: .visible) {
                Button("Löschen", role: .destructive) { lernstand.zuruecksetzen() }
            }
        }
    }
}
