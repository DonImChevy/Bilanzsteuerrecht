# BSR-Trainer – Bilanzsteuerrecht & Öffentliches Recht GS I

Lern-App zur Klausurvorbereitung im Grundstudium I mit zwei Reitern:

- **Bilanzsteuerrecht** – Teil I (Buchführung), orientiert am Skript und an den Übungen bzw. Lösungshinweisen.
- **Öffentliches Recht** – Staatsrecht nach Lehrplan 1.1 bis 1.3.4.5 (Staatsziele bis Bundesregierung).
  Quellen: Grundgesetz, Bundeswahlgesetz, Parteiengesetz. Aufbau wie in der Klausur: ca. 75 % Frage-Antwort
  (Musterantwort mit wörtlichem Normzitat, Selbstbewertung) und 25 % Übertragungsaufgaben mit Grafiken
  (Kanzlerwahl, Misstrauensvotum, Bundesrat-Abstimmungen, Sitzverteilung, Zweitstimmendeckung, Stimmzettel, Fristen …).

**Kostenlos, ohne App Store, offline nutzbar:** Die App ist eine Web-App (PWA). Man öffnet sie einmal im
Browser und legt sie auf den Home-Bildschirm – danach startet sie wie eine normale App, auch ohne Internet.

➡️ **App öffnen:** `https://donimchevy.github.io/Bilanzsteuerrecht/` (nach der Einrichtung unten)

## Installation auf dem iPhone (für alle Nutzer:innen)

1. Link oben in **Safari** öffnen (nicht in Chrome oder in der Instagram-/WhatsApp-Vorschau).
2. Unten auf **Teilen** ⬆️ tippen → **„Zum Home-Bildschirm“** → **Hinzufügen**.
3. App über das neue Icon starten. Ab jetzt funktioniert alles offline, der Lernfortschritt bleibt auf dem Gerät.

Android: Link in Chrome öffnen → Menü ⋮ → **„App installieren“**.

## Einmalige Einrichtung (Repository-Inhaber)

1. Den Branch mit der App in `main` mergen (Pull Request auf GitHub → **Merge**).
2. Auf GitHub: **Settings → Pages → Build and deployment → Source: „GitHub Actions“** auswählen.
3. **Actions → „Web-App veröffentlichen (GitHub Pages)“ → Run workflow** (oder einfach etwas in `web/` ändern und pushen).
4. Nach ca. 1 Minute ist die App unter der Adresse oben erreichbar.

Jede Änderung an `web/` auf `main` wird automatisch getestet und veröffentlicht. Installierte Apps
laden das Update beim nächsten Start mit Internet automatisch.

## Funktionen

| Bereich | Inhalt |
|---|---|
| **Üben** | 14 Themen aus Skript Teil I, 10 Aufgaben pro Runde, sofortige Auswertung mit Erklärung und Fundstelle |
| **Buchungssätze** | Eingabe wie in der Klausur: Soll-Positionen „an“ Haben-Positionen, Konten aus dem Kontenplan des Skripts (mit Suche), zusammengesetzte Buchungssätze, Summenkontrolle |
| **Generatoren** | rund 80 Aufgabentypen erzeugen bei jedem Aufruf **neue Beträge** (USt 19 %/7 %, Skonto, Boni, Rabatte, Rücksendungen …) |
| **Feste Fragen** | rund 90 Theorie- und Fallfragen, viele direkt aus den Übungen |
| **Klausurmodus** | Anzahl und Zeitlimit wählbar, ca. 60 % Buchungssätze, Auswertung erst nach Abgabe |
| **Lernkarten** | 47 Karten mit Merksätzen, Definitionen, Fristen und Formeln |
| **Kontenplan** | Alle Konten mit Kontoart, T-Konto und Buchungsregel |
| **Fortschritt** | Quote je Thema, schwächstes Thema direkt üben |

## Projektstruktur

```
web/                     Die Web-App (wird veröffentlicht)
  index.html             Einstieg
  manifest.webmanifest   App-Name, Icons (Home-Bildschirm)
  sw.js                  Service Worker → Offline-Funktion
  css/style.css          Gestaltung (hell/dunkel)
  js/geld.js             Beträge in Cent, deutsches Zahlenformat
  js/konten.js           Kontenplan laut Skript
  js/kern.js             Themen, Buchungssatz-Prüfung, Bewertung
  js/vorlagen.js         Aufgabengeneratoren mit Zufallsbeträgen
  js/feste.js            Feste Fragen aus Skript und Übungen
  js/lernkarten.js       Lernkarten
  js/katalog.js          Auswahl für Übung und Klausur
  js/oer/normen.js       Gesetzestexte GG/BWahlG/PartG (erzeugt mit tools/normen_extrahieren.py)
  js/oer/fragen.js       ÖR Frage-Antwort-Aufgaben
  js/oer/uebertragung.js ÖR Übertragungsaufgaben (Generatoren mit Grafiken)
  js/oer/grafik.js       SVG-Diagramme, Sitzverteilung, Stimmzettel, Tabellen
  js/app.js              Oberfläche
  tests/                 node --test web/tests/kern.test.mjs

BSRTrainer/, BSRTrainer.xcodeproj, Package.swift, Tests/
                         Native iOS-Version (SwiftUI) mit denselben Inhalten –
                         nur relevant mit Apple Developer Program (99 €/Jahr) für TestFlight/App Store.
```

Neue Aufgaben ergänzt man in `web/js/vorlagen.js` (generiert) oder `web/js/feste.js` (fest).
Die Tests prüfen automatisch für jede Aufgabe, dass Soll = Haben gilt und die Musterlösung akzeptiert wird.

Lokal ausprobieren: `cd web && python3 -m http.server 8000` → <http://localhost:8000>

## Native iOS-Version (optional)

Die Ordner `BSRTrainer/` usw. enthalten dieselbe App als SwiftUI-Projekt (iOS 17+). Sie wird bei jedem Push per
GitHub Actions gebaut und getestet. Für die Verteilung über TestFlight ist das kostenpflichtige
Apple Developer Program nötig; der Workflow `.github/workflows/testflight.yml` lädt die App dann ohne eigenen Mac hoch
(benötigte Secrets: `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8`, `APPLE_TEAM_ID`, Variable `BUNDLE_ID`).

## Hinweis

Inoffizielle Lernhilfe ohne Gewähr. Maßgeblich sind Skript, Gesetz und Lehrveranstaltung.
