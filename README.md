# BSR-Trainer – Bilanzsteuerrecht GS I

iOS-App (SwiftUI, iOS 17+) zur Klausurvorbereitung im **Bilanzsteuerrecht, Grundstudium I – Teil I (Buchführung)**.
Inhaltlich orientiert am Skript und an den Übungen bzw. Lösungshinweisen des Grundstudiums.

## Funktionen

| Bereich | Inhalt |
|---|---|
| **Üben** | 14 Themen aus Skript Teil I, je 10 Aufgaben pro Runde, sofortige Auswertung mit Erklärung und Fundstelle |
| **Buchungssätze** | Eingabe wie in der Klausur: Soll-Positionen „an“ Haben-Positionen, Konten aus dem Kontenplan des Skripts, zusammengesetzte Buchungssätze, Summenkontrolle Soll = Haben |
| **Generatoren** | ca. 80 Aufgabentypen erzeugen bei jedem Aufruf **neue Beträge** (inkl. USt 19 %/7 %, Skonto, Boni, Rabatte …) – man kann beliebig oft üben |
| **Klausurmodus** | Wählbare Anzahl und Zeitlimit, ca. 60 % Buchungssätze, Auswertung erst nach Abgabe, Verlauf der Ergebnisse |
| **Lernkarten** | Merksätze, Definitionen, Fristen und Formeln zum Umdrehen |
| **Kontenplan** | Alle Konten des Skripts (Klassen 0–5 + EBK/SBK/GuV) mit Kontoart, T-Konto und Buchungsregel |
| **Fortschritt** | Quote je Thema, schwächstes Thema direkt üben |

### Themen

Buchführungspflicht · Inventur, Inventar & Bilanz · Bilanzveränderungen · Bestandskonten · Erfolgskonten ·
Privatkonten · Viergeteiltes Warenkonto · Rabatte, Skonti, Boni & Co. · Umsatzsteuer & Vorsteuer ·
Eröffnung & Abschluss · Kalkulation · Gewinnermittlung & GuV/BVV · Grundbegriffe · Grund-, Haupt- & Nebenbücher

## Projektstruktur

```
BSRTrainer.xcodeproj        Xcode-Projekt (Xcode 16+, Ordner werden automatisch synchronisiert)
BSRTrainer/
  Core/                     Plattformunabhängige Logik (nur Foundation)
    Konto.swift             Kontenplan laut Skript
    Buchungssatz.swift      Buchungssatz + Prüfung der Eingabe
    Frage.swift             Themen, Aufgabentypen, Bewertung, Zufallsgenerator
    Vorlagen.swift          Aufgabengeneratoren mit Zufallsbeträgen
    FesteFragen.swift       Theorie- und Fallfragen aus den Übungen
    Lernkarten.swift        Lernkarten
    Katalog.swift           Auswahl für Übung und Klausur
  Modell/                   App-Zustand (Sitzung, Lernstand)
  Views/                    SwiftUI-Oberfläche
Config/Info.plist           Zusätzliche Info.plist-Schlüssel (Export-Compliance)
Package.swift + Tests/      `swift test` für die Kernlogik
```

Neue Aufgaben ergänzt man in `Core/Vorlagen.swift` (generiert) oder `Core/FesteFragen.swift` (fest).
Die Tests prüfen automatisch für jede Aufgabe, dass Soll = Haben gilt und die Musterlösung akzeptiert wird.

## Entwickeln

```bash
open BSRTrainer.xcodeproj   # Schema „BSRTrainer“, Simulator wählen, ⌘R
swift test                  # Tests der Kernlogik (macOS oder Linux)
```

Jeder Push baut die App und führt die Tests per GitHub Actions aus (`.github/workflows/ios.yml`).

## Auf TestFlight bringen

Voraussetzung: Mitgliedschaft im Apple Developer Program und ein Mac mit Xcode 16 oder neuer.

1. **Bundle-ID anpassen:** In Xcode Target *BSRTrainer* → *Signing & Capabilities* → Team auswählen und
   den Bundle Identifier auf eine eigene, eindeutige ID ändern (aktuell Platzhalter `de.bsrtrainer.app`).
2. **App in App Store Connect anlegen:** <https://appstoreconnect.apple.com> → *Meine Apps* → *+* → *Neue App*,
   Plattform iOS, gleiche Bundle-ID, Name z. B. „BSR-Trainer“.
3. **Archivieren:** In Xcode als Ziel *Any iOS Device (arm64)* wählen → *Product* → *Archive*.
4. **Hochladen:** Im Organizer *Distribute App* → *App Store Connect* → *Upload*.
   Die Export-Compliance-Frage ist bereits beantwortet (`ITSAppUsesNonExemptEncryption = NO`).
5. **Testen lassen:** In App Store Connect unter *TestFlight* den Build einer Gruppe zuweisen.
   - *Interne Tester* (bis 100, Mitglieder des Teams): sofort verfügbar.
   - *Externe Tester* (bis 10.000, z. B. Kommiliton:innen per öffentlichem Link): einmalige Beta-Review durch Apple nötig.
     Dafür in TestFlight „Beta-App-Beschreibung“, Feedback-E-Mail und ggf. Datenschutz-URL ausfüllen.
6. **Neue Builds:** Vor jedem weiteren Upload `CURRENT_PROJECT_VERSION` (Build-Nummer) erhöhen,
   bei größeren Änderungen auch `MARKETING_VERSION`.

Die App speichert nur den Lernfortschritt lokal auf dem Gerät (UserDefaults), sammelt keine Daten
und braucht keine Netzwerkverbindung – im App-Datenschutz-Fragebogen also „Keine Daten erfasst“.

## Hinweis

Inoffizielle Lernhilfe ohne Gewähr. Maßgeblich sind Skript, Gesetz und Lehrveranstaltung.
