import SwiftUI

/// Durchsuchbare Kontenliste (Kontenplan des Skripts) zur Auswahl im Buchungssatz.
struct KontoAuswahlView: View {
    let auswahl: (Konto) -> Void
    @Environment(\.dismiss) private var dismiss
    @State private var suche = ""

    var body: some View {
        NavigationStack {
            List {
                ForEach(Konto.klassen, id: \.self) { klasse in
                    let konten = gefiltert(klasse)
                    if !konten.isEmpty {
                        Section(Konto.klassenTitel(klasse)) {
                            ForEach(konten) { konto in
                                Button {
                                    auswahl(konto)
                                    dismiss()
                                } label: {
                                    KontoZeile(konto: konto)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }
            }
            .searchable(text: $suche, placement: .navigationBarDrawer(displayMode: .always), prompt: "Konto suchen, z. B. Vorsteuer")
            .autocorrectionDisabled()
            .navigationTitle("Konto wählen")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Abbrechen") { dismiss() }
                }
            }
        }
    }

    private func gefiltert(_ klasse: Int) -> [Konto] {
        let konten = Konto.konten(inKlasse: klasse)
        let s = suche.trimmingCharacters(in: .whitespaces)
        guard !s.isEmpty else { return konten }
        return konten.filter {
            $0.name.localizedStandardContains(s) || $0.kurzname.localizedStandardContains(s)
        }
    }
}

struct KontoZeile: View {
    let konto: Konto

    var body: some View {
        HStack {
            Text(konto.name)
                .foregroundStyle(.primary)
            Spacer(minLength: 8)
            KontoartBadge(art: konto.art)
        }
        .contentShape(Rectangle())
    }
}

struct KontoartBadge: View {
    let art: Kontoart

    var body: some View {
        Text(art.kurz)
            .font(.caption2.weight(.semibold))
            .padding(.horizontal, 6)
            .padding(.vertical, 2)
            .background(farbe.opacity(0.18), in: Capsule())
            .foregroundStyle(farbe)
    }

    private var farbe: Color {
        switch art {
        case .aktiv: return .blue
        case .passiv: return .purple
        case .eigenkapital, .privat: return .teal
        case .aufwand: return .red
        case .ertrag: return .green
        case .erfolg: return .orange
        case .abschluss: return .gray
        }
    }
}
