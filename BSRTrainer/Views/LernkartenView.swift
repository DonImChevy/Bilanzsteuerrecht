import SwiftUI

struct LernkartenStartView: View {
    @Environment(Lernstand.self) private var lernstand
    @State private var gewaehlt: Set<Thema> = []
    @State private var stapel: Stapel?

    struct Stapel: Identifiable {
        let id = UUID()
        let karten: [Lernkarte]
    }

    private var verfuegbar: [Thema] {
        Thema.allCases.filter { !Lernkarten.karten(themen: [$0]).isEmpty }
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Button {
                        stapel = Stapel(karten: Lernkarten.alle.shuffled())
                    } label: {
                        Label("Alle Karten mischen (\(Lernkarten.alle.count))", systemImage: "shuffle")
                    }
                    let offen = Lernkarten.alle.filter { !lernstand.statistik.lernkartenGewusst.contains($0.id) }
                    if !offen.isEmpty && offen.count < Lernkarten.alle.count {
                        Button {
                            stapel = Stapel(karten: offen.shuffled())
                        } label: {
                            Label("Nur noch nicht gewusste (\(offen.count))", systemImage: "questionmark.circle")
                        }
                    }
                }

                Section {
                    ForEach(verfuegbar) { thema in
                        let karten = Lernkarten.karten(themen: [thema])
                        let gewusst = karten.filter { lernstand.statistik.lernkartenGewusst.contains($0.id) }.count
                        Button {
                            if gewaehlt.contains(thema) { gewaehlt.remove(thema) } else { gewaehlt.insert(thema) }
                        } label: {
                            HStack {
                                Image(systemName: gewaehlt.contains(thema) ? "checkmark.circle.fill" : "circle")
                                    .foregroundStyle(gewaehlt.contains(thema) ? Color.accentColor : .secondary)
                                Text(thema.titel).foregroundStyle(.primary)
                                Spacer()
                                Text("\(gewusst)/\(karten.count)")
                                    .font(.caption.monospacedDigit())
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                    if !gewaehlt.isEmpty {
                        Button {
                            stapel = Stapel(karten: Lernkarten.karten(themen: gewaehlt).shuffled())
                        } label: {
                            Label("Auswahl lernen", systemImage: "play.fill").font(.headline)
                        }
                    }
                } header: {
                    Text("Nach Themen")
                } footer: {
                    Text("Die Karten fassen Merksätze, Definitionen, Fristen und Formeln aus dem Skript zusammen.")
                }
            }
            .navigationTitle("Lernkarten")
            .fullScreenCover(item: $stapel) { s in
                LernkartenView(karten: s.karten)
            }
        }
    }
}

struct LernkartenView: View {
    let karten: [Lernkarte]
    @Environment(Lernstand.self) private var lernstand
    @Environment(\.dismiss) private var dismiss
    @State private var index = 0
    @State private var umgedreht = false
    @State private var gewusst = 0

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                if index < karten.count {
                    ProgressView(value: Double(index), total: Double(karten.count))
                    Text("Karte \(index + 1) von \(karten.count)")
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    karte(karten[index])
                        .onTapGesture {
                            withAnimation(.spring(duration: 0.4)) { umgedreht.toggle() }
                        }

                    if umgedreht {
                        HStack(spacing: 16) {
                            Button {
                                weiter(gewusst: false)
                            } label: {
                                Label("Nochmal", systemImage: "arrow.uturn.backward").frame(maxWidth: .infinity)
                            }
                            .buttonStyle(.bordered)
                            .tint(.orange)
                            Button {
                                weiter(gewusst: true)
                            } label: {
                                Label("Gewusst", systemImage: "checkmark").frame(maxWidth: .infinity)
                            }
                            .buttonStyle(.borderedProminent)
                            .tint(.green)
                        }
                        .controlSize(.large)
                    } else {
                        Text("Tippen zum Umdrehen")
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                            .frame(height: 50)
                    }
                } else {
                    Spacer()
                    Image(systemName: "checkmark.seal.fill")
                        .font(.system(size: 64))
                        .foregroundStyle(.green)
                    Text("Stapel geschafft!").font(.title.bold())
                    Text("\(gewusst) von \(karten.count) Karten gewusst.")
                        .foregroundStyle(.secondary)
                    Button("Schließen") { dismiss() }
                        .buttonStyle(.borderedProminent)
                    Spacer()
                }
            }
            .padding()
            .navigationTitle("Lernkarten")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Beenden") { dismiss() }
                }
            }
        }
    }

    private func karte(_ k: Lernkarte) -> some View {
        ZStack {
            seite(titel: k.thema.titel, text: k.vorderseite, gross: true)
                .opacity(umgedreht ? 0 : 1)
            seite(titel: k.vorderseite, text: k.rueckseite, gross: false)
                .opacity(umgedreht ? 1 : 0)
                .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
        }
        .rotation3DEffect(.degrees(umgedreht ? 180 : 0), axis: (x: 0, y: 1, z: 0))
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private func seite(titel: String, text: String, gross: Bool) -> some View {
        VStack(spacing: 16) {
            Text(titel)
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
            ScrollView {
                Text(text)
                    .font(gross ? .title2.bold() : .title3)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: .infinity)
            }
            .scrollBounceBehavior(.basedOnSize)
        }
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(RoundedRectangle(cornerRadius: 24).fill(Color(.secondarySystemBackground)))
        .overlay(RoundedRectangle(cornerRadius: 24).stroke(Color.accentColor.opacity(0.3), lineWidth: 1))
    }

    private func weiter(gewusst istGewusst: Bool) {
        let karte = karten[index]
        if istGewusst {
            gewusst += 1
            lernstand.statistik.lernkartenGewusst.insert(karte.id)
        } else {
            lernstand.statistik.lernkartenGewusst.remove(karte.id)
        }
        umgedreht = false
        withAnimation { index += 1 }
    }
}
