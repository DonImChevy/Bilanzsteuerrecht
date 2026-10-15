// swift-tools-version:5.9
// Swift-Package nur für die plattformunabhängige Kernlogik (Konten, Buchungssätze, Aufgaben),
// damit sie ohne Simulator mit `swift test` geprüft werden kann. Die App selbst wird über
// BSRTrainer.xcodeproj gebaut und kompiliert dieselben Dateien direkt mit.
import PackageDescription

let package = Package(
    name: "BSRCore",
    platforms: [.macOS(.v13), .iOS(.v17)],
    products: [
        .library(name: "BSRCore", targets: ["BSRCore"]),
    ],
    targets: [
        .target(name: "BSRCore", path: "BSRTrainer/Core"),
        .testTarget(name: "BSRCoreTests", dependencies: ["BSRCore"], path: "Tests/BSRCoreTests"),
    ]
)
