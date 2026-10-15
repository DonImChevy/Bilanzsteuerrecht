import SwiftUI

/// Eingabe eines (zusammengesetzten) Buchungssatzes: Soll-Positionen „an“ Haben-Positionen.
struct BuchungEingabeView: View {
    @Binding var zeilen: [Eingabezeile]
    let bewertung: BuchungsBewertung?
    let gesperrt: Bool

    @State private var kontoZiel: KontoZiel?
    @FocusState private var fokus: UUID?

    struct KontoZiel: Identifiable {
        let id: UUID
    }

    var body: some View {
        seite(.soll)
            .sheet(item: $kontoZiel) { ziel in
                KontoAuswahlView { konto in
                    if let i = zeilen.firstIndex(where: { $0.id == ziel.id }) {
                        zeilen[i].konto = konto
                        fokus = ziel.id
                    }
                }
            }
        seite(.haben)
        summen
        if let bewertung {
            loesung(bewertung)
        }
    }

    // MARK: Soll / Haben

    private func seite(_ seite: Seite) -> some View {
        let ids = zeilen.filter { $0.seite == seite }.map(\.id)
        return Section {
            ForEach($zeilen) { $zeile in
                if zeile.seite == seite {
                    zeileView($zeile)
                }
            }
            .onDelete { offsets in
                // Offsets beziehen sich auf alle Zeilen; nur Zeilen dieser Seite löschen.
                let zuLoeschen = offsets.map { zeilen[$0].id }.filter { ids.contains($0) }
                zeilen.removeAll { zuLoeschen.contains($0.id) }
            }
            .deleteDisabled(gesperrt)

            if !gesperrt {
                Button {
                    let neu = Eingabezeile(seite: seite)
                    zeilen.append(neu)
                    kontoZiel = KontoZiel(id: neu.id)
                } label: {
                    Label(seite == .soll ? "Soll-Position hinzufügen" : "Haben-Position hinzufügen",
                          systemImage: "plus.circle")
                }
            }
        } header: {
            HStack {
                Text(seite == .soll ? "Soll" : "an Haben")
                Spacer()
                Text("Betrag in €")
            }
        }
    }

    private func zeileView(_ zeile: Binding<Eingabezeile>) -> some View {
        let wert = zeile.wrappedValue
        let status = bewertung?.zeilen[wert.id]
        return VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 8) {
                if wert.seite == .haben {
                    Text("an").foregroundStyle(.secondary)
                }
                Button {
                    kontoZiel = KontoZiel(id: wert.id)
                } label: {
                    HStack(spacing: 4) {
                        Text(wert.konto?.kurzname ?? "Konto wählen …")
                            .foregroundStyle(wert.konto == nil ? Color.accentColor : Color.primary)
                            .lineLimit(2)
                            .multilineTextAlignment(.leading)
                        if !gesperrt {
                            Image(systemName: "chevron.up.chevron.down")
                                .font(.caption2)
                                .foregroundStyle(.tertiary)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.borderless)
                .disabled(gesperrt)

                TextField("0,00", text: zeile.betragText)
                    .keyboardType(.decimalPad)
                    .multilineTextAlignment(.trailing)
                    .font(.body.monospacedDigit())
                    .frame(width: 110)
                    .focused($fokus, equals: wert.id)
                    .disabled(gesperrt)

                if let status {
                    Image(systemName: status == .richtig ? "checkmark.circle.fill" : "xmark.circle.fill")
                        .foregroundStyle(status == .richtig ? Color.richtig : Color.falsch)
                }
            }
            if let status, let hinweis = hinweis(status) {
                Text(hinweis)
                    .font(.caption)
                    .foregroundStyle(Color.falsch)
            }
        }
        .listRowBackground(hintergrund(status))
    }

    private func hinweis(_ status: BuchungsBewertung.Status) -> String? {
        switch status {
        case .richtig: return nil
        case .falscherBetrag(let erwartet): return "Konto richtig, Betrag falsch – erwartet \(Geld.text(erwartet))"
        case .falschesKonto: return "Dieses Konto gehört nicht (auf diese Seite) in den Buchungssatz"
        case .unvollstaendig: return "Konto oder Betrag fehlt bzw. ist nicht lesbar"
        }
    }

    private func hintergrund(_ status: BuchungsBewertung.Status?) -> Color? {
        guard let status else { return nil }
        return status == .richtig ? Color.richtig.opacity(0.1) : Color.falsch.opacity(0.1)
    }

    // MARK: Summen

    private var summen: some View {
        let soll = summe(.soll)
        let haben = summe(.haben)
        let gleich = soll == haben
        return Section {
            HStack {
                VStack(alignment: .leading) {
                    Text("Summe Soll").font(.caption).foregroundStyle(.secondary)
                    Text(Geld.text(soll)).font(.headline.monospacedDigit())
                }
                Spacer()
                Image(systemName: gleich ? "equal.circle.fill" : "exclamationmark.triangle.fill")
                    .foregroundStyle(gleich ? Color.secondary : Color.orange)
                Spacer()
                VStack(alignment: .trailing) {
                    Text("Summe Haben").font(.caption).foregroundStyle(.secondary)
                    Text(Geld.text(haben)).font(.headline.monospacedDigit())
                }
            }
        } footer: {
            if !gleich {
                Text("Soll und Haben stimmen noch nicht überein (Differenz \(Geld.text(abs(soll - haben)))).")
            } else if !gesperrt {
                Text("Tipp: Beträge im Format 1.234,56 eingeben. Zeilen zum Löschen nach links wischen.")
            }
        }
    }

    private func summe(_ seite: Seite) -> Decimal {
        zeilen.filter { $0.seite == seite }.compactMap(\.betrag).reduce(0, +)
    }

    // MARK: Musterlösung

    private func loesung(_ b: BuchungsBewertung) -> some View {
        Section {
            ForEach(Array(b.loesung.soll.enumerated()), id: \.offset) { _, posten in
                loesungsZeile(posten, praefix: "")
            }
            ForEach(Array(b.loesung.haben.enumerated()), id: \.offset) { _, posten in
                loesungsZeile(posten, praefix: "an ")
            }
            if !b.fehlend.isEmpty && !b.korrekt {
                VStack(alignment: .leading, spacing: 4) {
                    Text("In deiner Lösung fehlt:")
                        .font(.caption.weight(.semibold))
                    ForEach(b.fehlend, id: \.self) { f in
                        Text("• \(f.seite.titel): \(f.konto.kurzname) \(Geld.text(f.betrag))")
                            .font(.caption)
                    }
                }
                .foregroundStyle(Color.falsch)
            }
        } header: {
            Text("Musterlösung")
        }
    }

    private func loesungsZeile(_ posten: Posten, praefix: String) -> some View {
        HStack(alignment: .firstTextBaseline) {
            Text(praefix + posten.konto.name)
                .padding(.leading, praefix.isEmpty ? 0 : 24)
            Spacer()
            Text(Geld.text(posten.betrag))
                .font(.body.monospacedDigit())
        }
    }
}

