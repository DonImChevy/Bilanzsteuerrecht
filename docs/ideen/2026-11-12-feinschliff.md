# Feinschliff 12.11.2026 – Audit und Critique (impeccable)

Grundlage: automatische Messung aller Hauptansichten (Willkommen, Start, Modul, Themen, Kompaktwissen, Schaubild,
Aufgabe Auswahl/Lösung/Buchungssatz, Klausur-Tab, Klausursimulation, Karten, Nachschlagen, Einstellungen, Level,
Garderobe, Lernpfad) auf iPhone 390×844, iPad 820×1180 und schmalem Android 360×740, jeweils hell und dunkel
(Playwright: Überlauf, Tippflächen, Beschriftung, Textkontrast über den echten Hintergrund) plus Sichtprüfung der
Screenshots und Code-Durchsicht von `web/css/style.css` und `web/js/app.js`. Der impeccable-Detektor lief nicht
(Hilfsprogramm in dieser Umgebung blockiert).

## Audit-Wertung

| # | Bereich | Punkte | Wichtigster Befund |
|---|---|---|---|
| 1 | Barrierefreiheit | 2/4 | `--text3` als Textfarbe nur 2,5 : 1 (hell) bzw. 3,7 : 1 (dunkel); viele Tippflächen unter 44 px |
| 2 | Leistung | 3/4 | Sparmodus deckt fast alles ab; Hero-Glanz läuft dort weiter; Erstbesuch ~3 MB JS (danach Service-Worker-Cache) |
| 3 | Theming | 3/4 | Variablen-System mit hell/dunkel/Farbwelten konsequent; Kontenart- und Statusfarben teils fest |
| 4 | Responsive | 3/4 | Kein horizontaler Überlauf auf allen Geräten; Klausur-Deckblatt und „Wie sicher“-Leiste auf dem iPhone eng |
| 5 | Integrität | 4/4 | Eigenständiges System, Gestaltung trägt Fachinhalt (T-Konten, Rechenwege, Gesetzesfarben) |
| **Summe** | | **15/20** | **Gut** |

Kein P0 (nichts verhindert eine Aufgabe).

## Befunde

### P1 – vor dem nächsten Release
1. **Zu schwacher Kontrast der Tertiärschrift** – `--text3` (#9ba1b5 / #6a7086) wird als Lesetext genutzt: Tab-Leiste (inaktive Tabs), „Noch nicht begonnen“, Zähler „0/3“ der Stapel, Soll/Haben-Buchstaben im Kontenplan, Untertitel im Punkte-Hebel, Dauer-Untertitel der Klausursimulation, Wochenzahl. WCAG 1.4.3. → `harden`/`polish`: `--text3` hell und dunkel auf ≥ 4,5 : 1 anheben.
2. **Winzige Tippflächen** – „Hinweis ausblenden“ (20×25 px), „Eintragen“ bei Klausuren (59×18), Taler-Pille (118×26) liegen unter dem WCAG-Minimum 24 px. → `adapt`.

### P2 – nächster Durchgang
3. **Tippflächen unter 44 px**: „+ Als Karte“ im Kompaktwissen (30×30, bis zu 54 je Seite), „Überblick“ (34 hoch), Segment-Schalter (38), „Schließen“ in Sheets (35), runde Kopf-Knöpfe (38–40), „Wie sicher“-Chips (32). → `adapt` (Trefferfläche vergrößern, Optik gleich).
4. **Kein einheitlicher Tastatur-Fokus** für Knöpfe, Chips, Zeilen, Kacheln, Optionen (iPad mit Tastatur). → `harden`.
5. **Mengenangaben**: „1 Aufgaben diese Woche“, „1 Aufgaben“ in Kopfzeilen und Themenkarten. → `clarify`.
6. **Taler-Pille sagt „0 Garderobe“** – gemeint ist das Taler-Guthaben. → `clarify`.
7. **„Knapp daneben.“ bei jeder falschen Antwort**, auch bei Ja/Nein-Fragen – wirkt unpassend. → `clarify`.
8. **Suchfeld-Platzhalter auf dem iPhone abgeschnitten** („… z. B. E“). → `clarify`.
9. **Klausursimulation, Deckblatt (iPhone)**: Etikettenspalte nimmt die Hälfte, „Hilfsmittel“ bricht Wort für Wort um. → `layout`.
10. **„Wie sicher bist du?“** bricht auf dem iPhone in zwei Zeilen um („Geraten“ allein). → `layout`.
11. **Karten-Tab, Gruppentitel „Fertige Lernkarten“** mit gequetschtem Zusatztext rechts. → `layout`.
12. **Lange Wörter** in Stapeln/Lernpfad-Etiketten ragen heraus („Bilanzveränderungen“, „Betriebsvermögensvergleich“). → `harden`.
13. **Hero-/Banner-Glanz** läuft im Sparmodus weiter (Dauer-Animation). → `optimize`.

### P3 – bei Gelegenheit
14. Erstbesuch lädt ~110 Module (~3 MB unkomprimiert, ~4,7 s bei langsamem Netz und 4× CPU); danach aus dem Cache. Normtexte könnten bei Bedarf nachgeladen werden (Architekturentscheidung, nicht jetzt).
15. Nicht erreichte Sterne im Lernpfad sehr blass (1,6 : 1) – im eigenen Lernpfad-Design, bewusst gedimmt.

## Was gut ist
- Kein horizontaler Überlauf auf 360, 390 und 820 px, hell und dunkel.
- Jeder Symbolknopf hat eine Beschriftung (`aria-label`).
- Sparmodus und Animationsschalter decken teure Effekte fast vollständig ab.
- Textsatz, Rechenwege, T-Konten und Schaubilder machen den Fachinhalt sichtbar.

## Plan
Phase 2 (reparieren): 1, 2, 3, 4, 5–8, 12, 13. Phase 3 (verfeinern): 9–11, Typo/Abstände, Polish. Phase 4 (aufwerten): Bewegung, Momente, Leerzustände.

## Ergebnis des Durchgangs

| Befund | Status |
|---|---|
| 1 Kontrast `--text3` | behoben (alle Farbwelten hell/dunkel ≥ 4,5 : 1; Statusfarben als Text abgedunkelt) – Nachmessung: 0 Kontrastfehler außerhalb des Lernpfads |
| 2, 3 Tippflächen | behoben (unsichtbare 44-px-Trefferflächen, Segmente und Schaubild-Knöpfe 44 px hoch) |
| 4 Tastaturfokus | behoben (einheitlicher Ring in der Modulfarbe) |
| 5–8 Texte | behoben („1 Aufgabe“, „0 Taler“, „Diesmal nicht.“, kürzerer Platzhalter + aria-label) |
| 9–11 Layout | behoben (Deckblatt gestapelt, „Wie sicher“ als Dreierreihe, Gruppentitel) |
| 12 lange Wörter | Silbentrennung (`hyphens: auto`, auf iPhone/iPad mit Trennstrich) |
| 13 Sparmodus | behoben |
| 14 Erstbesuch | offen (Architekturentscheidung) |
| 15 Lernpfad-Sterne | bewusst unverändert (eigene Lernpfad-Welt) |

Phase 4: Nach dem Prüfen wird die richtige Antwort einmal „abgestempelt“, eine falsch gewählte zuckt kurz – nur beim ersten Zeichnen, nie in der Klausur, abschaltbar. Taler-Momente und Leerzustände waren bereits vorhanden und wurden nicht erweitert.
