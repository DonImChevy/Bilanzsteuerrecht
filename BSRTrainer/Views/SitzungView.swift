import SwiftUI

/// Führt durch eine Übungs- oder Klausursitzung.
struct SitzungView: View {
    @State var sitzung: Sitzung
    @Environment(Lernstand.self) private var lernstand
    @Environment(\.dismiss) private var dismiss
    @State private var jetzt = Date()
    @State private var zeigeAbbrechen = false
    @State private var zeigeAbgeben = false
    @State private var zeigeUebersicht = false

    var body: some View {
        NavigationStack {
            Group {
                if sitzung.fragen.isEmpty {
                    ContentUnavailableView("Keine Aufgaben", systemImage: "tray",
                                           description: Text("Für diese Auswahl gibt es noch keine Aufgaben."))
                } else if sitzung.beendet {
                    ErgebnisView(sitzung: sitzung) {
                        sitzung = sitzung.wiederholen()
                    } schliessen: {
                        dismiss()
                    }
                } else {
                    frageSeite
                }
            }
            .navigationTitle(sitzung.titel)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar { toolbarInhalt }
            .confirmationDialog("Sitzung abbrechen?", isPresented: $zeigeAbbrechen, titleVisibility: .visible) {
                Button("Abbrechen", role: .destructive) { dismiss() }
                Button("Weiter lernen", role: .cancel) {}
            } message: {
                Text(sitzung.istKlausur ? "Die Klausur wird nicht gewertet." : "Bereits geprüfte Aufgaben bleiben in der Statistik.")
            }
            .confirmationDialog("Klausur abgeben?", isPresented: $zeigeAbgeben, titleVisibility: .visible) {
                Button("Abgeben") { sitzung.abgeben(lernstand) }
                Button("Weiter bearbeiten", role: .cancel) {}
            } message: {
                Text("\(sitzung.anzahlBeantwortet) von \(sitzung.fragen.count) Aufgaben bearbeitet.")
            }
            .sheet(isPresented: $zeigeUebersicht) {
                KlausurUebersicht(sitzung: sitzung) { i in
                    sitzung.index = i
                    zeigeUebersicht = false
                }
                .presentationDetents([.medium, .large])
            }
            .task(id: sitzung.id) {
                guard sitzung.istKlausur else { return }
                while !Task.isCancelled && !sitzung.beendet {
                    try? await Task.sleep(for: .seconds(1))
                    jetzt = Date()
                    if let rest = sitzung.restSekunden(jetzt: jetzt), rest == 0 {
                        sitzung.abgeben(lernstand)
                    }
                }
            }
        }
        .interactiveDismissDisabled()
    }

    // MARK: Aufgabe

    private var frageSeite: some View {
        FrageView(frage: sitzung.aktuelleFrage,
                  antwort: $sitzung.antworten[sitzung.index],
                  bewertung: sitzung.istKlausur ? nil : sitzung.aktuelleBewertung,
                  kopf: "Aufgabe \(sitzung.index + 1) von \(sitzung.fragen.count)")
            .id(sitzung.index)
            .safeAreaInset(edge: .bottom) { aktionsleiste }
            .sensoryFeedback(trigger: sitzung.aktuelleBewertung) { _, neu in
                guard let neu else { return nil }
                return neu.korrekt ? .success : .error
            }
    }

    @ViewBuilder
    private var aktionsleiste: some View {
        VStack(spacing: 8) {
            ProgressView(value: Double(sitzung.index + 1), total: Double(sitzung.fragen.count))
            HStack(spacing: 12) {
                if sitzung.istKlausur {
                    Button {
                        sitzung.zurueck()
                    } label: {
                        Label("Zurück", systemImage: "chevron.left").frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.bordered)
                    .disabled(sitzung.index == 0)

                    if sitzung.istLetzte {
                        Button {
                            zeigeAbgeben = true
                        } label: {
                            Label("Abgeben", systemImage: "checkmark").frame(maxWidth: .infinity)
                        }
                        .buttonStyle(.borderedProminent)
                    } else {
                        Button {
                            sitzung.weiter()
                        } label: {
                            Label("Weiter", systemImage: "chevron.right").frame(maxWidth: .infinity)
                        }
                        .buttonStyle(.borderedProminent)
                    }
                } else if sitzung.aktuelleBewertung == nil {
                    Button {
                        withAnimation { _ = sitzung.pruefen(lernstand) }
                    } label: {
                        Text("Prüfen").frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(sitzung.antworten[sitzung.index].istLeer)
                } else {
                    Button {
                        withAnimation { sitzung.weiter() }
                    } label: {
                        Text(sitzung.istLetzte ? "Auswertung" : "Nächste Aufgabe").frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.borderedProminent)
                }
            }
            .controlSize(.large)
        }
        .padding(.horizontal)
        .padding(.top, 8)
        .padding(.bottom, 4)
        .background(.bar)
    }

    @ToolbarContentBuilder
    private var toolbarInhalt: some ToolbarContent {
        ToolbarItem(placement: .cancellationAction) {
            Button(sitzung.beendet ? "Fertig" : "Beenden") {
                if sitzung.beendet || sitzung.fragen.isEmpty { dismiss() } else { zeigeAbbrechen = true }
            }
        }
        if sitzung.istKlausur && !sitzung.beendet {
            ToolbarItem(placement: .principal) {
                if let rest = sitzung.restSekunden(jetzt: jetzt) {
                    Label(zeitText(rest), systemImage: "timer")
                        .font(.headline.monospacedDigit())
                        .foregroundStyle(rest < 300 ? .red : .primary)
                } else {
                    Text("Klausur").font(.headline)
                }
            }
            ToolbarItem(placement: .primaryAction) {
                Button {
                    zeigeUebersicht = true
                } label: {
                    Image(systemName: "square.grid.3x3")
                }
                .accessibilityLabel("Aufgabenübersicht")
            }
        }
    }

    private func zeitText(_ sekunden: Int) -> String {
        String(format: "%d:%02d", sekunden / 60, sekunden % 60)
    }
}

/// Raster aller Klausuraufgaben zum Springen.
struct KlausurUebersicht: View {
    let sitzung: Sitzung
    let auswahl: (Int) -> Void

    var body: some View {
        NavigationStack {
            ScrollView {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 52), spacing: 10)], spacing: 10) {
                    ForEach(sitzung.fragen.indices, id: \.self) { i in
                        Button {
                            auswahl(i)
                        } label: {
                            Text("\(i + 1)")
                                .font(.headline)
                                .frame(width: 52, height: 52)
                                .background(sitzung.antworten[i].istLeer ? Color.secondary.opacity(0.15) : Color.accentColor.opacity(0.3),
                                            in: RoundedRectangle(cornerRadius: 10))
                                .overlay(RoundedRectangle(cornerRadius: 10)
                                    .stroke(i == sitzung.index ? Color.accentColor : .clear, lineWidth: 2))
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding()
            }
            .navigationTitle("Übersicht")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

/// Auswertung am Ende einer Sitzung.
struct ErgebnisView: View {
    let sitzung: Sitzung
    let nochmal: () -> Void
    let schliessen: () -> Void

    private var quote: Double {
        sitzung.fragen.isEmpty ? 0 : Double(sitzung.anzahlRichtig) / Double(sitzung.fragen.count)
    }

    var body: some View {
        List {
            Section {
                VStack(spacing: 12) {
                    Gauge(value: quote) {
                        EmptyView()
                    } currentValueLabel: {
                        Text("\(Int((quote * 100).rounded())) %")
                    }
                    .gaugeStyle(.accessoryCircularCapacity)
                    .tint(quote >= 0.8 ? .green : quote >= 0.5 ? .orange : .red)
                    .scaleEffect(1.6)
                    .padding(.vertical, 20)

                    Text("\(sitzung.anzahlRichtig) von \(sitzung.fragen.count) richtig")
                        .font(.title2.bold())
                    Text(lob).foregroundStyle(.secondary).multilineTextAlignment(.center)
                    if sitzung.istKlausur {
                        Text("Bearbeitungszeit: \(sitzung.dauerSekunden / 60) min \(sitzung.dauerSekunden % 60) s")
                            .font(.footnote).foregroundStyle(.secondary)
                    }
                }
                .frame(maxWidth: .infinity)
            }

            Section("Aufgaben") {
                ForEach(sitzung.fragen.indices, id: \.self) { i in
                    NavigationLink {
                        FrageView(frage: sitzung.fragen[i],
                                  antwort: .constant(sitzung.antworten[i]),
                                  bewertung: sitzung.bewertung(i),
                                  kopf: "Aufgabe \(i + 1)",
                                  gesperrt: true)
                            .navigationTitle("Aufgabe \(i + 1)")
                            .navigationBarTitleDisplayMode(.inline)
                    } label: {
                        HStack(spacing: 12) {
                            let korrekt = sitzung.bewertung(i)?.korrekt ?? false
                            Image(systemName: korrekt ? "checkmark.circle.fill" : "xmark.circle.fill")
                                .foregroundStyle(korrekt ? Color.richtig : Color.falsch)
                            VStack(alignment: .leading, spacing: 2) {
                                Text(sitzung.fragen[i].text)
                                    .lineLimit(2)
                                    .font(.subheadline)
                                Text("\(sitzung.fragen[i].thema.titel) · \(sitzung.fragen[i].typ.bezeichnung)")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                }
            }

            Section {
                Button(action: nochmal) {
                    Label(sitzung.istKlausur ? "Neue Klausur" : "Neue Runde", systemImage: "arrow.clockwise")
                }
                Button(action: schliessen) {
                    Label("Schließen", systemImage: "xmark")
                }
            }
        }
    }

    private var lob: String {
        switch quote {
        case 0.9...: return "Hervorragend – klausurreif!"
        case 0.7..<0.9: return "Gut! Sieh dir die falschen Aufgaben noch einmal an."
        case 0.5..<0.7: return "Solide Basis – hier lohnt sich noch eine Runde."
        default: return "Dranbleiben! Lies die Erklärungen zu den falschen Aufgaben."
        }
    }
}
