# Finanzwirt-Trainer – Lern-App zum Diplom-Finanzwirt

Lern-App zur Klausurvorbereitung im Grundstudium I. Startseite mit Tagesziel, Lernserie, Wiederholungen,
Suche über alle Inhalte und Modul-Kacheln. Verfügbar:

- **Bilanzrecht (BilR)** – Bilanzsteuerrecht Teil I (Buchführung) und Teil II (GoB und Betriebsvermögen, Zurechnung, Anschaffungskosten, Grundstücke und Gebäude-AfA, AfA/GWG, Teilwert, Rechnungsabgrenzung, Entnahmen/Einlagen), orientiert am Skript, an den Übungen bzw. Lösungshinweisen und an den Semesterklausuren.
- **Öffentliches Recht** – Staatsrecht und Gesetzgebung nach dem Unterrichtsskript ÖR GS I (Kapitel 1–2), abgeglichen mit den Altklausuren 2020–2025: Klausurfälle im Gutachtenstil, häufige Klausurthemen doppelt gewichtet, nicht klausurrelevante Fragen unter „Zusatzwissen“.
- **Einkommensteuer** – Grundstudium I nach den Skripten und Folien, Rechtsstand 2026 (Grundfreibetrag 12.348 €, Entfernungspauschale 0,38 € ab km 1, Übungsleiter 3.300 €): Rechenaufgaben mit immer neuen Zahlen (Tarif/Splitting, Werbungskosten, Entfernungspauschale, § 11, AfA/GWG), Einordnungsfälle, Frage-Antwort mit Multiple-Choice-Fassung und zwei Gesamtfälle. Dazu „Punkte sammeln“: Kartei mit Klausursätzen zum Auswendiglernen und ihrer Punktzahl (wird Stück für Stück ergänzt).
  Quellen: Grundgesetz, Bundeswahlgesetz, Parteiengesetz. Aufbau wie in der Klausur: ca. 75 % Frage-Antwort
  (Musterantwort mit wörtlichem Normzitat, Selbstbewertung) und 25 % Übertragungsaufgaben mit Grafiken
  (Kanzlerwahl, Misstrauensvotum, Bundesrat-Abstimmungen, Sitzverteilung, Zweitstimmendeckung, Stimmzettel, Fristen …).
  Zwei Antwortmodi: **Frage – Antwort** (selbst formulieren) oder **Multiple Choice** (jede Frage mit plausiblen
  Falschantworten aus benachbarten Normen, oft mehrere richtig) – umschaltbar im Reiter Üben und Klausur.

In Vorbereitung (als „Bald verfügbar“ sichtbar): Einkommensteuer (ESt), Umsatzsteuer (USt),
Abgabenordnung (AO), Bewertungsrecht (BewR), Privatrecht (PrivR). Neue Module werden in `web/js/module.js` eingetragen.

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
| **Start** | Tagesziel-Ring, Lernserie, „Wiederholen“/„Weiterlernen“, Suche (Themen, Aufgaben, Normen, Konten), Module, Wochenverlauf |
| **Modul** | Jedes Modul ist in sich geschlossen (untere Leiste: Übersicht, Klausur, Karten, Normen/Konten; „‹ Alle Module“ zurück). Übersicht: Schnellstart, filterbare Themen mit Trefferquote, Lernkartei |
| **Üben** | 10 Aufgaben pro Runde, sofortiges Feedback mit Erklärung und Fundstelle, Tastatursteuerung am PC |
| **Buchungssätze** | Eingabe wie in der Klausur: Soll-Positionen „an“ Haben-Positionen, Konten aus dem Kontenplan des Skripts (mit Suche), zusammengesetzte Buchungssätze, Summenkontrolle |
| **Generatoren** | rund 80 Aufgabentypen erzeugen bei jedem Aufruf **neue Beträge** (USt 19 %/7 %, Skonto, Boni, Rabatte, Rücksendungen …) |
| **Feste Fragen** | rund 90 Theorie- und Fallfragen, viele direkt aus den Übungen |
| **Klausurmodus** | Anzahl und Zeitlimit wählbar, ca. 60 % Buchungssätze, Auswertung erst nach Abgabe |
| **Lernkarten** | 47 Karten mit Merksätzen, Definitionen, Fristen und Formeln |
| **Kontenplan** | Alle Konten mit Kontoart, T-Konto und Buchungsregel |
| **Wiederholung** | Lernkartei mit 5 Fächern: jede beantwortete Aufgabe kommt nach 1, 3, 7, 16 und 35 Tagen wieder, Fehler am nächsten Tag (verteiltes Lernen) |
| **Fortschritt** | Quote je Thema, Lernkartei, schwächstes Thema direkt üben |

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
  js/wiederholung.js     Lernintervalle (Leitner-Lernkartei)
  js/oer/normen.js       Gesetzestexte GG/BWahlG/PartG (erzeugt mit tools/normen_extrahieren.py)
  js/bilr/teil2.js       Bilanzsteuerrecht Teil II: Zurechnung, AK, Grundstücke, AfA/GWG, Teilwert, Abgrenzung, Entnahmen/Einlagen
  js/bilr/normen_zusatz.js  § 449 BGB, § 9a EStDV (von Hand)
  js/bilr/normen.js      Gesetzestexte Bilanzrecht – HGB/AO/EStG/UStG, Auszüge (erzeugt mit tools/bilr_normen.py aus den PDFs von gesetze-im-internet.de)
  js/oer/fragen.js       ÖR Frage-Antwort-Aufgaben
  js/oer/mc.js           Multiple-Choice-Fassungen dieser Aufgaben (richtige/falsche Aussagen)
  js/oer/uebertragung.js ÖR Übertragungsaufgaben (Generatoren mit Grafiken)
  js/est/aufgaben.js     ESt-Aufgaben (Rechengeneratoren, Fälle, Frage-Antwort mit MC)
  js/sync.js             Geräte-Synchronisierung per Sync-Code (Zusammenführen ohne Doppelzählung)
  js/sync-config.js      Server-Adresse und öffentlicher Schlüssel (Supabase); leer = ausgeblendet
  js/lib/qrcode.js       QR-Code-Erzeugung (qrcode-generator, MIT)
  js/paare.js           Spiel „Paare finden“: Normen-Paare je Modul (est/, bilr/, oer/paare.js)
  js/est/punkte.js       ESt-Punktesammler (Klausursätze zum Auswendiglernen, § 1 BGB)
  js/est/tarif.js        Einkommensteuertarif 2026 (§ 32a EStG, Grund- und Splittingtarif)
  js/est/normen.js       Gesetzestexte EStG/AO für das ESt-Modul (tools/bilr_normen.py --est)
  js/oer/grafik.js       SVG-Diagramme, Sitzverteilung, Stimmzettel, Tabellen
  js/module.js           Module/Fächer (aktive und angekündigte)
  js/aktivitaet.js       Lernserie, Tagesziel, Wochenverlauf
  js/icons.js            Linien-Icons (SVG)
  js/app.js              Oberfläche
  tests/                 node --test web/tests/kern.test.mjs

server/supabase.sql      Datenbank für die Synchronisierung (einmal im Supabase-SQL-Editor ausführen)

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
