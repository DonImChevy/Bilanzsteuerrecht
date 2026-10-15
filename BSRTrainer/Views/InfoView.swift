import SwiftUI

struct InfoView: View {
    @Environment(\.dismiss) private var dismiss

    private var version: String {
        let v = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "–"
        let b = Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "–"
        return "\(v) (\(b))"
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("BSR-Trainer").font(.title2.bold())
                        Text("Lern-App zur Klausurvorbereitung im Bilanzsteuerrecht, Grundstudium I – Buchführung (Teil I).")
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 4)
                }

                Section("So funktioniert's") {
                    Label("Buchungssätze: Konten über „Konto wählen“ aus dem Kontenplan suchen, Betrag eintippen. Zusammengesetzte Buchungssätze über „Position hinzufügen“.", systemImage: "square.and.pencil")
                    Label("Die Reihenfolge der Positionen ist egal. Mehrere Zeilen mit demselben Konto werden addiert.", systemImage: "arrow.up.arrow.down")
                    Label("Generierte Aufgaben haben bei jedem Durchlauf neue Beträge – du kannst also beliebig oft üben.", systemImage: "dice")
                    Label("Im Klausurmodus gibt es die Auswertung erst nach Abgabe.", systemImage: "timer")
                    Label("USt-Regelsatz 19 %, ermäßigt 7 %. Kontenbezeichnungen nach dem Kontenplan des Skripts.", systemImage: "eurosign.circle")
                }

                Section("Hinweis") {
                    Text("Inoffizielle Lernhilfe. Die Aufgaben sind inhaltlich am Skript „Bilanzsteuerrecht Grundstudium I, Teil I“ und den zugehörigen Übungen orientiert. Für die Richtigkeit wird keine Gewähr übernommen – maßgeblich sind Skript, Gesetz und Lehrveranstaltung.")
                        .font(.footnote)
                    LabeledContent("Version", value: version)
                }
            }
            .navigationTitle("Info")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Fertig") { dismiss() }
                }
            }
        }
    }
}
