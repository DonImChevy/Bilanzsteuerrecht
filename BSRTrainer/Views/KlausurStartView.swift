import SwiftUI

struct KlausurStartView: View {
    @Environment(Lernstand.self) private var lernstand
    @State private var anzahl = 20
    @State private var minuten = 45
    @State private var sitzung: Sitzung?

    private let zeitOptionen = [0, 30, 45, 60, 90]

    var body: some View {
        NavigationStack {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 8) {
                        Label("Klausursimulation", systemImage: "graduationcap")
                            .font(.title3.bold())
                        Text("Gemischte Aufgaben aus allen Themen, Schwerpunkt Buchungssätze (ca. 60 %). Die Auswertung gibt es erst nach Abgabe – wie in der echten Klausur.")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 4)
                }

                Section("Einstellungen") {
                    Stepper(value: $anzahl, in: 5...60, step: 5) {
                        LabeledContent("Aufgaben", value: "\(anzahl)")
                    }
                    Picker("Zeitlimit", selection: $minuten) {
                        ForEach(zeitOptionen, id: \.self) { m in
                            Text(m == 0 ? "ohne" : "\(m) min").tag(m)
                        }
                    }
                }

                Section {
                    Button {
                        sitzung = .klausur(anzahl: anzahl, minuten: minuten == 0 ? nil : minuten)
                    } label: {
                        Label("Klausur starten", systemImage: "play.fill")
                            .frame(maxWidth: .infinity)
                            .font(.headline)
                    }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.large)
                    .listRowBackground(Color.clear)
                    .listRowInsets(EdgeInsets())
                }

                if !lernstand.statistik.klausuren.isEmpty {
                    Section("Bisherige Klausuren") {
                        ForEach(lernstand.statistik.klausuren.reversed()) { k in
                            HStack {
                                VStack(alignment: .leading) {
                                    Text(k.datum, format: .dateTime.day().month().year().hour().minute())
                                    Text("\(k.dauerSekunden / 60) min").font(.caption).foregroundStyle(.secondary)
                                }
                                Spacer()
                                Text("\(k.richtig)/\(k.gesamt)")
                                    .font(.headline.monospacedDigit())
                                    .foregroundStyle(k.quote >= 0.5 ? Color.richtig : Color.falsch)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Klausur")
            .fullScreenCover(item: $sitzung) { s in
                SitzungView(sitzung: s)
            }
        }
    }
}
