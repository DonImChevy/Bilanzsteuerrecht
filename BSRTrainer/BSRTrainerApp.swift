import SwiftUI

@main
struct BSRTrainerApp: App {
    @State private var lernstand = Lernstand()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(lernstand)
        }
    }
}
