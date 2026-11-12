# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Studierende des Grundstudiums I zum Diplom-Finanzwirt (Bilanzrecht Teil I und II, Einkommensteuer, Umsatzsteuer, Öffentliches Recht, Abgabenordnung, Privatrecht) und Auszubildende FTA I (Buchführung und Bilanzwesen) – der Jahrgang des Entwicklers und die Azubis, die die App installiert haben. Beim ersten Start wählen sie „Studium“ oder „Ausbildung“.

Gelernt wird auf iPhone und iPad gleichermaßen: auf dem iPhone in kurzen Einheiten zwischendurch (Bahn, Pause, abends), auf dem iPad in langen Sitzungen am Schreibtisch – Klausursimulation, handschriftliche Lösungen und Karten mit dem Apple Pencil.

Weitere Nutzergruppe: Dozierende, die über den Kursraum (Einstellungen → „Für Lehrende“) Hinweise, Dateien und Aufgabenblätter bereitstellen.

## Product Purpose

Lern-App zur Vorbereitung auf die Klausuren des Grundstudiums I bzw. der FTA-I-Ausbildung. Drei Ziele gelten gleichrangig:
- **Klausur bestehen:** im Klausurstil üben (Buchungssätze, Gutachten, Urteilsstil), Klausursimulation mit Zeit und Bewertungsbogen, Lücken gezielt schließen.
- **Verstehen:** Kompaktwissen, Schaubilder, Lernpfad und Erläuterungen mit tragender Norm.
- **Dranbleiben:** Lernkartei mit Wiederholung, Tagesziel, Serien, Level, Taler und Garderobe, Lerngruppe und Duell.

Erfolg heißt: bestandene Klausuren und tägliches Üben, das sich nicht nach Pflicht anfühlt.

## Positioning

Eigene, im Klausurstil formulierte Aufgaben mit Zufallszahlen (über 700 Aufgabentypen) zu genau dem Lehrstoff des Grundstudiums I und der FTA I – Rechtsstand 2026, jede Aussage mit tragender Norm, Normtexte direkt antippbar. Kein allgemeines Steuer-Lernportal, sondern auf diesen Lehrplan und diese Klausuren zugeschnitten.

## Operating Context

- Installierbare PWA (Home-Bildschirm), funktioniert offline; Updates kommen über den Service Worker.
- Lernstand lokal, optional geräteübergreifend synchronisiert (Supabase, nur anon-Key) und als Backup-Datei.
- Begleitet Vorlesungen, Skripte und Übungen der Hochschule bzw. Ausbildung; Material der Hochschule ist privat und wird nicht übernommen.
- Klausurtermine als Countdown und Kalender-Export.

## Capabilities and Constraints

- Vanilla-JS-ES-Module ohne Build, gehostet über GitHub Pages; keine neuen Abhängigkeiten.
- Module: Bilanzrecht (`bsr`), Buchführung und Bilanzwesen (`bbf`), Einkommensteuer (`est`), Umsatzsteuer (`ust`), Öffentliches Recht (`oer`), Abgabenordnung (`ao`), Privatrecht (`pr`).
- Funktionen: Aufgaben mit Prüfen und Lösung, Buchungssatz-Eingabe mit Denkfehler-Radar, Kompaktwissen (Lesen/Abdecken/Vorlesen mit Profistimme), Schaubilder, Lernpfad, Lernkartei, eigene Karten mit Handschrift, Paare-Spiel, Klausur und Klausursimulation, Suche, Statistik, Level/Taler/Garderobe, Lerngruppe/Duell, Kursraum.
- Fachinhalte (Aufgaben, Lösungen, Kompaktwissen, Normtexte) sind fachlich geprüft und werden bei Designarbeit nicht verändert.
- Rechtsstand 2026.

## Brand Commitments

- Name: „Finanzwirt-Trainer“.
- Maskottchen „Taler“: eine Münze mit Brille, mit Stimmungen und Outfits aus der Garderobe.
- Schrift Inter (vom Entwickler gewählt) – bleibt.
- Eigene Farbwelt des Lernpfads (Amber/Pink/Violett).
- Ton: Du-Form, deutsch, kurz und verständlich.

## Evidence on Hand

- Inhalte: `web/js/**` (Aufgaben, Kompaktwissen, Normen, Lernpfad, Beispiele).
- Keine Testimonials, Nutzerzahlen oder Bewertungen vorhanden – nicht erfinden.

## Product Principles

1. **Fachinhalt zuerst:** Gestaltung transportiert Inhalt (Soll/Haben, Bilanzseiten, Rechenwege) statt ihn zu dekorieren.
2. **Klausurnah:** Was geübt wird, sieht aus und funktioniert wie in der Klausur.
3. **Verständlich:** jede Lösung erklärt, mit Norm, ohne Fachjargon-Hürden.
4. **Kurze Wege:** zwischendurch auf dem iPhone in Sekunden drin, unterbrochene Sitzungen lassen sich fortsetzen.
5. **Motivierend, nicht ablenkend:** Belohnungen gehören zum Lernen, nie in Klausur oder Simulation.

## Accessibility & Inclusion

Hell- und Dunkelmodus, Animationen abschaltbar (`data-bewegung`), Sparmodus für langsame Geräte (`data-leistung`), Vorlesen des Kompaktwissens. Kontrast nach WCAG AA, Touch-Ziele ≥ 44 px.
