import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            ThemenView()
                .tabItem { Label("Üben", systemImage: "pencil.and.list.clipboard") }
            KlausurStartView()
                .tabItem { Label("Klausur", systemImage: "timer") }
            LernkartenStartView()
                .tabItem { Label("Karten", systemImage: "rectangle.on.rectangle.angled") }
            KontenplanView()
                .tabItem { Label("Konten", systemImage: "list.bullet.rectangle") }
            StatistikView()
                .tabItem { Label("Fortschritt", systemImage: "chart.bar") }
        }
    }
}

extension Color {
    static let richtig = Color.green
    static let falsch = Color.red
}

#Preview {
    ContentView()
        .environment(Lernstand())
}
