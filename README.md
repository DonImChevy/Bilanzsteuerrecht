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
open BSRTrainer.xcodeproj   # nur mit Mac: Schema „BSRTrainer“, Simulator wählen, ⌘R
swift test                  # Tests der Kernlogik (macOS oder Linux)
```

Jeder Push baut die App und führt die Tests per GitHub Actions aus (`.github/workflows/ios.yml`).

## Auf TestFlight bringen – ohne Mac

Gebaut, signiert und hochgeladen wird auf einem macOS-Runner von GitHub Actions
(`.github/workflows/testflight.yml`). Alles Übrige geht im Browser (oder auf dem iPhone).

**Einmalig einrichten**

1. **Apple Developer Program** beitreten (99 €/Jahr): <https://developer.apple.com/programs/enroll/>
   – geht auch über die App „Apple Developer“ auf dem iPhone.
2. **Team-ID** notieren: <https://developer.apple.com/account> → *Mitgliedschaftsdetails* → *Team-ID* (10 Zeichen).
3. **Bundle-ID festlegen**, z. B. `de.deinname.bsrtrainer` (muss weltweit eindeutig sein).
4. **App anlegen** in <https://appstoreconnect.apple.com> → *Apps* → *+* → *Neue App*:
   Plattform iOS, Name „BSR-Trainer“ (oder ähnlich, Name muss im Store frei sein), Sprache Deutsch,
   Bundle-ID: falls sie in der Liste noch nicht auftaucht, vorher unter
   <https://developer.apple.com/account/resources/identifiers/list> → *+* → *App IDs* → *App* registrieren.
5. **API-Schlüssel erstellen:** App Store Connect → *Benutzer und Zugriff* → *Integrationen* →
   *App Store Connect API* → *Team-Schlüssel* → *+*, Zugriff **Admin** (nötig, damit das
   Verteilungszertifikat automatisch in der Cloud erstellt werden darf).
   *Issuer-ID* und *Schlüssel-ID* notieren und die `.p8`-Datei herunterladen (geht nur einmal!).
6. **In GitHub hinterlegen:** Repository → *Settings* → *Secrets and variables* → *Actions*
   - Tab *Secrets* → *New repository secret*:
     - `ASC_KEY_ID` – Schlüssel-ID
     - `ASC_ISSUER_ID` – Issuer-ID
     - `ASC_KEY_P8` – kompletter Inhalt der `.p8`-Datei (mit `-----BEGIN PRIVATE KEY-----`-Zeilen; Datei mit einem Texteditor öffnen und kopieren)
     - `APPLE_TEAM_ID` – Team-ID
   - Tab *Variables* → *New repository variable*: `BUNDLE_ID` – deine Bundle-ID

**Build hochladen**

1. GitHub → *Actions* → *TestFlight-Upload* → *Run workflow* (Branch wählen) → grün starten.
2. Nach ca. 5–10 Minuten ist der Build hochgeladen; Apple verarbeitet ihn danach noch ca. 10–30 Minuten.
   Die Build-Nummer wird automatisch hochgezählt.
3. App Store Connect → deine App → *TestFlight*:
   - *Interne Tests*: Gruppe anlegen, dich selbst hinzufügen → Einladung per E-Mail.
   - *Externe Tests* (Kommiliton:innen, bis 10.000, öffentlicher Link möglich): Gruppe anlegen,
     Build hinzufügen, Beta-Beschreibung und Feedback-E-Mail ausfüllen → einmalige Beta-Prüfung durch Apple (meist < 1 Tag).
4. Auf dem iPhone die App **TestFlight** aus dem App Store installieren und die Einladung annehmen.

Für eine neue Version reicht es, Änderungen zu pushen und den Workflow erneut zu starten.
Bei größeren Änderungen `MARKETING_VERSION` im Xcode-Projekt erhöhen.

Die App speichert nur den Lernfortschritt lokal auf dem Gerät (UserDefaults), sammelt keine Daten
und braucht keine Netzwerkverbindung – im App-Datenschutz-Fragebogen also „Keine Daten erfasst“.

## Hinweis

Inoffizielle Lernhilfe ohne Gewähr. Maßgeblich sind Skript, Gesetz und Lehrveranstaltung.
