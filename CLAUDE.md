# Finanzwirt-Trainer – Hinweise für Claude

Lern-App (PWA) zum Diplom-Finanzwirt, Grundstudium I. Vanilla-JS-ES-Module **ohne Build**, alles in `web/`,
Deploy über GitHub Pages (`.github/workflows/pages.yml`). Antworten an den Nutzer auf Deutsch.

## Regeln des Nutzers (immer einhalten)
- **Gesetzestexte / Skriptinhalte:** Wenn ein Gesetzestext gebraucht wird oder etwas nur im Skript steht, erst sagen, was benötigt wird, bevor umgesetzt wird. UStDV/UStAE (Stand 2026) darf selbst geladen werden.
- **Urheberrecht:** Skripte und Klausuren sind privat. Keine Texte daraus ins öffentliche Repo kopieren, eigene Fälle formulieren. Nichts nach `DonImChevy/oer-klausuren` pushen.
- **Punktesammler (ESt):** Neue Sätze erst vorschlagen, dann einpflegen.
- **Supabase:** Nie nach Secret-/service_role-Key oder DB-Passwort fragen oder damit arbeiten (nur anon-Key in `web/js/sync-config.js`).
- Inhalte fachlich verständlich erklären; Rechtsstand 2026.

## Arbeitsablauf
- Branch `claude/bsr-trainer-app`. Der Nutzer merged die PRs selbst. Vor neuer Arbeit: `git fetch origin main && git merge --ff-only origin/main`.
  Liegt nichts vor `origin/main`, ist der letzte PR gemergt → neuen PR anlegen (sonst den offenen aktualisieren). Kein Force-Push.
- **Bei jeder Änderung an `web/`:** `VERSION` in `web/sw.js` erhöhen (`bsr-vNN`), neue Dateien in dessen `DATEIEN`-Liste aufnehmen.
  Nach dem Deploy die App zweimal schließen/öffnen, damit das Update lädt.
- Prüfen vor dem Push:
  - `node --test web/tests/kern.test.mjs`
  - `node tools/stichworte_pruefen.mjs` (Stichworte der Frage-Antwort-Aufgaben)
  - Screenshots: `cd web && python3 -m http.server 8765 &` dann `node tools/screens.mjs bsr <ordner>` (hell + dunkel, meldet JS-Fehler). Modul-IDs: `bsr`, `oer`, `est`, `ust`.

## Aufbau
- `web/js/app.js` – gesamte UI: `render()` baut `app.innerHTML` neu; Aktionen über `data-a`/`data-v` und die Map `AKTIONEN`; Zustand in `state`, Lernstand `stat` in localStorage `bsr.stat.v1`. Einstellungen über `einstellungMerken()` (werden synchronisiert).
- `web/js/module.js` – Modulliste (Farbe, Icon, aktiv/bald). `kern.js` – `THEMEN` (mit `fach`, bei BilR `teil: 1|2`). `katalog.js` – Aufgabenauswahl/Klausur.
- Fachinhalte je Modul: `web/js/bilr/`, `oer/`, `est/`, `ust/` (`aufgaben.js`, `normen.js`, `paare.js`, `pfad.js` = Lernpfad-Blöcke).
- `lernpfad.js` – Lernpfad-Modus (eigenes Design `.pfad`/`.pf-*`; jeder Block muss für sich verständlich sein).
- `sync.js` – Supabase-Sync, führt Zähler pro Gerät zusammen; neue Felder in `stat` dort mit aufnehmen.
- Normtexte: `python3 -I tools/bilr_normen.py` erzeugt `*/normen.js` aus Gesetzesdateien.

## Design
- `web/css/style.css`: Basis oben, darunter „Design 2.0“ (Glas, Leuchten, 3D-Knöpfe) und Komponenten wie `.themen-karte`.
- Farben nur über Variablen: `--m` (Modulfarbe, Indigo auf der Startseite), `--m-licht`, `--m-tief`, `--glas*`, `--schatten*`. Hell **und** dunkel prüfen (`prefers-color-scheme` und `data-theme`).
- Lernpfad hat bewusst eigene Farben (Amber/Pink/Violett) – App-Styles dürfen `.pfad`/`.pf-*` nicht treffen.
- Neue Listen als einzelne Glaskarten gestalten, nicht als schlichte Tabelle (Vorbilder: `.themen-karte`, `.t-konto` mit T-Konto-Seite, `.stapel`).
- Gestaltung soll Fachinhalt transportieren (z. B. Soll/Haben-Seite im Kontenplan), nicht nur dekorieren. Plugin-Skill `frontend-design` nutzen.
