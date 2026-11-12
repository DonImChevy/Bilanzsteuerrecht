---
name: feinschliff
description: "Kompletter Design-Durchgang für den Finanzwirt-Trainer mit dem Skill impeccable: Kontext, Bewertung (audit, critique), Reparatur (harden, adapt, optimize, clarify), Verfeinerung (typeset, layout, polish) und Aufwertung (animate, delight, onboard) – in einem Lauf, nach den Regeln aus CLAUDE.md. Aufruf: /feinschliff [bereich|phase|bericht]."
user-invocable: true
argument-hint: "[leer = alles] · [bereich: start|modul|aufgabe|kompakt|klausur|karten|lernpfad|garderobe|einstellungen] · [phase: kontext|bewerten|reparieren|verfeinern|aufwerten] · [bericht]"
---

# /feinschliff – alles aus impeccable für die App, in einem Lauf

Dieser Befehl steuert den Projekt-Skill **impeccable** (`.claude/skills/impeccable`) für den Finanzwirt-Trainer.
Er ruft dessen Befehle in fester Reihenfolge auf, jeweils mit dem Playbook aus `.claude/skills/impeccable/reference/<befehl>.md`,
und hält dabei die Projektregeln aus `CLAUDE.md` ein. Antworten und Berichte an den Nutzer auf Deutsch.

## Argumente

- **leer:** alle Phasen 0–4 über alle Bereiche.
- **Bereich** (z. B. `aufgabe`): alle Phasen, aber nur für diesen Bereich.
- **Phase** (z. B. `bewerten`): nur diese Phase über alle Bereiche.
- **`bericht`:** nur Phase 0 und 1 – Befunde und Plan, keine Codeänderung.
- Kombinierbar: `/feinschliff kompakt verfeinern`.

## Bereiche der App (Ziele für impeccable)

| Bereich | Ansicht | Dateien | impeccable-Modus |
|---|---|---|---|
| `start` | Startseite (Kopf, Tagesziel, Level, Taler, Suche, Countdown, Bereiche) | `web/js/app.js` (Start, `START_BEREICHE`), `levelansicht.js`, `maskottchen.js` | Operate |
| `modul` | Modulseite mit Themenkarten, Lernen-/Klausur-Tab | `app.js` (`.themen-karte`, `teilSchalter`) | Operate |
| `aufgabe` | Aufgabe, Prüfen, Rückmeldung, Lösung, Buchungssatz-Eingabe | `app.js`, `satz.js`, `denkfehler.js` | Operate |
| `kompakt` | Kompaktwissen, Abdecken, Vorlesen-Leiste, Schaubilder | `kompakt.js`, `vorlesen.js`, `schaubilder.js` | Read |
| `klausur` | Klausur, Klausursimulation, Bewertungsbogen | `klausursim.js`, `app.js` | Operate |
| `karten` | Lernkartei, eigene Karten, Editor, Handschrift, Paare | `meinekarten.js`, `handschrift.js`, `app.js` (`paareView`) | Operate |
| `lernpfad` | Lernpfad (eigenes Design `.pfad`/`.pf-*`) | `lernpfad.js`, `*/pfad.js` | Experience |
| `garderobe` | Level-Seite, Münzalbum, Garderobe, Hintergründe | `levelansicht.js`, `garderobeansicht.js`, `garderobe.js` | Experience |
| `einstellungen` | Einstellungen, Neuigkeiten, Statistik, Backup, Gruppe/Duell | `app.js`, `statistikansicht.js`, `neuigkeiten.js` | Operate |

CSS liegt zentral in `web/css/style.css` (Basis oben, „Design 2.0“ darunter, `.ts*` Textsatz, `.sb-*` Schaubilder).

## Feste Regeln (gehen jedem impeccable-Playbook vor)

1. **Fachinhalt bleibt.** Aufgaben, Lösungen, Kompaktwissen, Normtexte und Beispiele werden inhaltlich nicht verändert. `clarify` gilt nur für Bedien-Texte (Knöpfe, Hinweise, Leerzustände, Fehlermeldungen) – im Du-Ton, kurz, deutsch.
2. **Schrift Inter bleibt** (vom Nutzer so gewählt). Kein Schriftwechsel ohne ausdrückliche Zustimmung. `typeset` darf Größen, Gewichte, Zeilenabstand, Hierarchie, `font-feature-settings` und Ziffern (tabular für Beträge) verbessern.
3. **Farben nur über Variablen** (`--m`, `--m-licht`, `--m-tief`, `--glas*`, `--schatten*`, `--sb-*`, `--hg-*`, `--rang-*`, `--taler-*`, `--gz-*`). Jede Änderung **hell und dunkel** (System + `data-theme`) und für alle Farbwelten (`data-farbwelt`) und Hintergründe prüfen.
4. **Lernpfad** hat bewusst eigene Farben (Amber/Pink/Violett). App-Styles dürfen `.pfad`/`.pf-*` nicht treffen.
5. **Bewegung:** nur unter `:root[data-bewegung="an"]` bzw. mit Abschaltung unter `:root[data-bewegung="aus"]` (nicht über `prefers-reduced-motion`). Teure Effekte (backdrop-filter, große Blur, Dauer-Animationen) unter `:root[data-leistung="spar"]` abschalten. Bewegung nur einmal je Anlass, nie in Klausur/Simulation ablenkend.
6. **Kein Build, keine neuen Abhängigkeiten.** Vanilla JS, ES-Module, `render()` baut `#app` neu. Neue Dateien → `DATEIEN` in `web/sw.js`.
7. **Listen als Glaskarten**, Gestaltung transportiert Fachinhalt (Soll/Haben, Bilanzseiten), nicht bloße Deko.
8. **Kein Umbau der Identität.** Keine Redesigns (`shape`, `craft`, `overdrive`, `bolder`) ohne ausdrücklichen Auftrag. `quieter`/`distill` nur, wenn `critique` es als P0/P1 begründet.
9. **Barrierefreiheit:** Kontrast WCAG AA, Touch-Ziele ≥ 44 px, Fokus sichtbar, `aria-label` an Symbolknöpfen, iPhone-Safe-Areas.

## Ablauf

Vor Beginn: `git fetch origin main && git merge --ff-only origin/main` (Workflow aus CLAUDE.md). Dann Setup aus `.claude/skills/impeccable/SKILL.md`
(Launcher `impeccable context`; ist er blockiert, die Fallback-Regel dort befolgen und PRODUCT.md/DESIGN.md direkt lesen).
Server für Sichtprüfungen: `cd web && python3 -m http.server 8765 &`, Screens mit `node tools/screens.mjs <modul> <ordner>` (hell + dunkel, meldet JS-Fehler),
gezielte Ansichten per Playwright (`window.__bsr`, Viewport iPhone 390×844 und iPad 820×1180).

### Phase 0 – Kontext (`init`, `document`)
- Fehlt `PRODUCT.md`: `init` – aus `CLAUDE.md` vorbefüllen (Nutzer: Studierende Diplom-Finanzwirt GS I und FTA I; Plattform `web`, installierbare PWA, vor allem iPhone/iPad; Zweck: Klausurvorbereitung; Prinzipien: Fachinhalt zuerst, verständlich, Rechtsstand 2026). Nur echte Lücken fragen, höchstens eine Runde.
- Fehlt `DESIGN.md`: `document` – aus `style.css` ableiten (Glas, Leuchten, 3D-Knöpfe, Modulfarben, Inter, Taler). Danach Kontext nicht erneut erzeugen.

### Phase 1 – Bewerten (`audit`, `critique`)
- Je Bereich `audit` (Barrierefreiheit, Leistung, Theming hell/dunkel, Responsive, Anti-Patterns) und `critique` (Hierarchie, kognitive Last, Persona: Studentin kurz vor der Klausur am iPhone in der Bahn).
- Ergebnis: **eine** zusammengeführte Liste, P0–P3, jeweils mit Bereich, Datei, Befehl, der es behebt.
- Bei `bericht` hier stoppen: Bericht als Datei `docs/ideen/<datum>-feinschliff.md` und kurze Zusammenfassung an den Nutzer.

### Phase 2 – Reparieren (`harden`, `adapt`, `optimize`, `clarify`)
- `harden`: lange Wörter/Normzitate, leere Zustände, offline, sehr lange Listen, Zahlenformate.
- `adapt`: iPhone schmal (≤ 375 px), iPad quer, Safe Areas, Tastatur über Eingaben, Querformat.
- `optimize`: Start-Zeit, render-Kosten, Sparmodus, Bilder/SVG, Service-Worker-Cache.
- `clarify`: Bedien-Texte nach Regel 1.
- Zuerst alle P0/P1, dann P2.

### Phase 3 – Verfeinern (`typeset`, `layout`, `extract`, `polish`)
- `typeset` nach Regel 2, `layout` (Abstände, Rhythmus, Ausrichtung, Raster der Karten), `extract` nur zum Zusammenführen doppelter Werte in bestehende Variablen (keine neue Token-Architektur), zuletzt `polish` je Bereich.

### Phase 4 – Aufwerten (`animate`, `delight`, `onboard`, ggf. `colorize`)
- `animate`: Mikro-Interaktionen mit Zweck (Prüfen, richtig/falsch, Karte umdrehen, Fortschritt) nach Regel 5.
- `delight`: Momente rund um Taler, Level-Up, Serie – sparsam, nie in Klausur/Simulation.
- `onboard`: Willkommen/Rollenwahl, Leerzustände (keine Karten, nichts fällig, keine Termine), erste Aufgabe.
- `colorize` nur, wo `critique` eine Fläche als zu grau meldet.

### Nicht verwenden
`live`, `generate` (brauchen Dev-Server mit HMR – gibt es hier nicht), `shape`, `craft`, `overdrive`, `bolder` (Regel 8), Hooks (`/impeccable hooks`) nur auf ausdrücklichen Wunsch.

## Nach jeder Phase
1. Prüfen: `node --test web/tests/kern.test.mjs`, `node tools/stichworte_pruefen.mjs`, Screens der betroffenen Module hell + dunkel, keine JS-Fehler, Screenshots selbst ansehen.
2. `VERSION` in `web/sw.js` erhöhen.
3. Ein Commit je Phase (deutsche Nachricht, was und warum).
4. Neuigkeiten nach CLAUDE.md: reine Feinschliffe ohne Eintrag; sichtbar neue Hilfen (z. B. neue Leerzustände) mit `klein: true`.

## Abschluss
- Push auf `claude/bsr-trainer-app`; PR anlegen bzw. offenen aktualisieren (Workflow aus CLAUDE.md). PR-Text: Phasen, behobene P0/P1, offene Punkte.
- Kurzbericht an den Nutzer: was je Phase geändert wurde, was bewusst offen bleibt (mit Grund), Vorher/Nachher-Screenshots der wichtigsten Ansichten per `SendUserFile`.
- Wenn ein Schritt eine Entscheidung des Nutzers braucht (Redesign, Schriftwechsel, Entfernen einer Funktion): nicht umsetzen, im Bericht als Frage aufführen.
