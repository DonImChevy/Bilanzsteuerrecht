import SwiftUI
import UIKit

/// Zeigt eine Aufgabe mit passendem Eingabebereich und (optional) der Auswertung.
struct FrageView: View {
    let frage: Frage
    @Binding var antwort: Antwort
    let bewertung: Bewertung?
    var kopf: String = ""
    var gesperrt: Bool = false

    private var eingabeGesperrt: Bool { gesperrt || bewertung != nil }

    var body: some View {
        List {
            Section {
                VStack(alignment: .leading, spacing: 10) {
                    HStack {
                        Label(frage.thema.titel, systemImage: frage.thema.symbol)
                        Spacer()
                        Text(frage.typ.bezeichnung)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 2)
                            .background(Color.accentColor.opacity(0.15), in: Capsule())
                    }
                    .font(.caption)
                    .foregroundStyle(.secondary)

                    Text(frage.text)
                        .font(.body)
                        .fixedSize(horizontal: false, vertical: true)
                        .textSelection(.enabled)
                }
                .padding(.vertical, 4)
            } header: {
                if !kopf.isEmpty { Text(kopf) }
            }

            eingabe

            if let bewertung {
                AuswertungSection(frage: frage, bewertung: bewertung)
            }
        }
        .listStyle(.insetGrouped)
        .scrollDismissesKeyboard(.interactively)
        .toolbar {
            ToolbarItemGroup(placement: .keyboard) {
                Spacer()
                Button("Fertig") {
                    UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder),
                                                    to: nil, from: nil, for: nil)
                }
            }
        }
    }

    @ViewBuilder
    private var eingabe: some View {
        switch frage.typ {
        case .buchung:
            BuchungEingabeView(zeilen: zeilenBinding,
                               bewertung: buchungsBewertung,
                               gesperrt: eingabeGesperrt)
        case .auswahl(let aufgabe):
            AuswahlEingabeView(aufgabe: aufgabe,
                               gewaehlt: auswahlBinding,
                               zeigeLoesung: bewertung != nil,
                               gesperrt: eingabeGesperrt)
        case .zahl(let aufgabe):
            ZahlEingabeView(aufgabe: aufgabe,
                            text: zahlBinding,
                            bewertung: bewertung,
                            gesperrt: eingabeGesperrt)
        }
    }

    private var buchungsBewertung: BuchungsBewertung? {
        if case .buchung(let b)? = bewertung { return b }
        return nil
    }

    private var zeilenBinding: Binding<[Eingabezeile]> {
        Binding {
            if case .buchung(let zeilen) = antwort { return zeilen }
            return []
        } set: { antwort = .buchung($0) }
    }

    private var auswahlBinding: Binding<Set<Int>> {
        Binding {
            if case .auswahl(let s) = antwort { return s }
            return []
        } set: { antwort = .auswahl($0) }
    }

    private var zahlBinding: Binding<String> {
        Binding {
            if case .zahl(let t) = antwort { return t }
            return ""
        } set: { antwort = .zahl($0) }
    }
}

// MARK: - Auswertung

struct AuswertungSection: View {
    let frage: Frage
    let bewertung: Bewertung

    var body: some View {
        Section {
            Label(bewertung.korrekt ? "Richtig!" : "Leider nicht richtig",
                  systemImage: bewertung.korrekt ? "checkmark.seal.fill" : "xmark.octagon.fill")
                .font(.headline)
                .foregroundStyle(bewertung.korrekt ? Color.richtig : Color.falsch)

            if case .zahl(_, let loesung, let lesbar) = bewertung {
                if !lesbar {
                    Text("Deine Eingabe konnte nicht als Zahl gelesen werden.")
                        .font(.subheadline).foregroundStyle(.secondary)
                }
                LabeledContent("Lösung", value: loesung)
                    .font(.body.weight(.semibold))
            }

            Text(frage.erklaerung)
                .fixedSize(horizontal: false, vertical: true)
                .textSelection(.enabled)

            if let quelle = frage.quelle {
                Label(quelle, systemImage: "book")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
        } header: {
            Text("Erläuterung")
        }
    }
}

// MARK: - Auswahl

struct AuswahlEingabeView: View {
    let aufgabe: AuswahlAufgabe
    @Binding var gewaehlt: Set<Int>
    let zeigeLoesung: Bool
    let gesperrt: Bool

    var body: some View {
        Section {
            ForEach(aufgabe.optionen.indices, id: \.self) { i in
                Button {
                    waehle(i)
                } label: {
                    HStack(alignment: .top, spacing: 12) {
                        Image(systemName: symbol(i))
                            .foregroundStyle(farbe(i))
                            .font(.title3)
                        Text(aufgabe.optionen[i])
                            .foregroundStyle(.primary)
                            .fixedSize(horizontal: false, vertical: true)
                        Spacer(minLength: 0)
                    }
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .disabled(gesperrt)
                .listRowBackground(hintergrund(i))
            }
        } header: {
            Text(aufgabe.mehrfachauswahl ? "Mehrere Antworten sind richtig" : "Eine Antwort ist richtig")
        }
    }

    private func waehle(_ i: Int) {
        if aufgabe.mehrfachauswahl {
            if gewaehlt.contains(i) { gewaehlt.remove(i) } else { gewaehlt.insert(i) }
        } else {
            gewaehlt = [i]
        }
    }

    private func symbol(_ i: Int) -> String {
        let an = gewaehlt.contains(i)
        if zeigeLoesung {
            if aufgabe.richtig.contains(i) { return "checkmark.circle.fill" }
            if an { return "xmark.circle.fill" }
        }
        if aufgabe.mehrfachauswahl { return an ? "checkmark.square.fill" : "square" }
        return an ? "largecircle.fill.circle" : "circle"
    }

    private func farbe(_ i: Int) -> Color {
        if zeigeLoesung {
            if aufgabe.richtig.contains(i) { return .richtig }
            if gewaehlt.contains(i) { return .falsch }
            return .secondary
        }
        return gewaehlt.contains(i) ? .accentColor : .secondary
    }

    private func hintergrund(_ i: Int) -> Color? {
        guard zeigeLoesung else { return nil }
        if aufgabe.richtig.contains(i) { return Color.richtig.opacity(0.12) }
        if gewaehlt.contains(i) { return Color.falsch.opacity(0.12) }
        return nil
    }
}

// MARK: - Zahl

struct ZahlEingabeView: View {
    let aufgabe: ZahlAufgabe
    @Binding var text: String
    let bewertung: Bewertung?
    let gesperrt: Bool
    @FocusState private var fokus: Bool

    var body: some View {
        Section {
            HStack {
                TextField("Ergebnis", text: $text)
                    .keyboardType(.numbersAndPunctuation)
                    .focused($fokus)
                    .font(.title3.monospacedDigit())
                    .disabled(gesperrt)
                    .submitLabel(.done)
                Text(aufgabe.einheit)
                    .font(.title3)
                    .foregroundStyle(.secondary)
                if let bewertung {
                    Image(systemName: bewertung.korrekt ? "checkmark.circle.fill" : "xmark.circle.fill")
                        .foregroundStyle(bewertung.korrekt ? Color.richtig : Color.falsch)
                }
            }
        } header: {
            Text("Deine Lösung")
        } footer: {
            Text("Format z. B. 1.234,56 – negative Werte mit Minus. Toleranz ± \(Geld.text(aufgabe.toleranz)).")
        }
        .onAppear {
            if !gesperrt && text.isEmpty { fokus = true }
        }
    }
}
