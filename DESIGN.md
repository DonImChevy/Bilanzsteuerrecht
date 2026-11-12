---
name: Finanzwirt-Trainer
description: Lern-App zum Diplom-Finanzwirt (GS I) und FTA I – Glas, Leuchten und 3D-Knöpfe in der Farbe des Moduls.
colors:
  akzent-start: "#4f46e5"
  akzent-start-dunkel: "#8b8cf8"
  modul-bilanzrecht: "#4f46e5"
  modul-oeffentliches-recht: "#e11d48"
  modul-einkommensteuer: "#059669"
  modul-umsatzsteuer: "#d97706"
  modul-buchfuehrung: "#0e7490"
  modul-abgabenordnung: "#7c3aed"
  modul-privatrecht: "#c026d3"
  hintergrund: "#eef0f8"
  hintergrund-dunkel: "#070814"
  karte: "#ffffff"
  karte-dunkel: "#161924"
  text: "#11131f"
  text-dunkel: "#eef0f7"
  text-zwei: "#5c6178"
  text-zwei-dunkel: "#a4aabd"
  text-drei: "#9ba1b5"
  linie: "#e7e9f0"
  richtig: "#12a150"
  richtig-dunkel: "#34c77b"
  falsch: "#e5484d"
  falsch-dunkel: "#ff6b70"
  warnung: "#e8900c"
  gold: "#f59e0b"
typography:
  titel:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.9px"
  karten-titel:
    fontFamily: "Inter, sans-serif"
    fontSize: "16.5px"
    fontWeight: 750
    lineHeight: 1.25
    letterSpacing: "-0.2px"
  text:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.42
  klein:
    fontFamily: "Inter, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.35
  gruppen-titel:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "1.1px"
rounded:
  klein: "12px"
  mittel: "18px"
  karte: "22px"
  hero: "28px"
  pille: "99px"
spacing:
  rand: "16px"
  zeile: "12px"
  gruppe: "22px"
  karten-abstand: "10px"
components:
  knopf:
    backgroundColor: "{colors.akzent-start}"
    textColor: "#ffffff"
    rounded: "16px"
    padding: "15px 16px"
  knopf-zweit:
    backgroundColor: "rgba(255,255,255,0.72)"
    textColor: "{colors.akzent-start}"
    rounded: "16px"
  glaskarte:
    backgroundColor: "rgba(255,255,255,0.72)"
    rounded: "{rounded.karte}"
  chip:
    rounded: "{rounded.pille}"
    padding: "7px 12px"
---

# Design System: Finanzwirt-Trainer

## Overview

Eine ruhige, helle Lernoberfläche aus **Glaskarten** über einem weichen, langsam treibenden **Leuchten in der Farbe des Moduls**. Jedes Fach hat seine eigene Farbe (`--m`); die Startseite ist Indigo. Primäre Aktionen sind **3D-Knöpfe mit Lippe** (sie „drücken sich ein“), Überschriften tragen einen Verlauf in die Modulfarbe. Das Maskottchen **Taler** (Münze mit Brille) gibt der App ein Gesicht.

Die Gestaltung transportiert Fachinhalt: T-Konten mit Soll- und Haben-Seite, Mini-Bilanzen, Rechenwege mit Rechenzeichen und Betrag rechts, Normzitate als antippbare Verweise, Gesetzesfarben als Buchrücken. Der Lernpfad hat bewusst eine eigene Welt (Amber/Pink/Violett, `.pfad`/`.pf-*`).

Hell und dunkel sind gleichwertig. Bewegung ist abschaltbar (`data-bewegung`), teure Effekte entfallen im Sparmodus (`data-leistung="spar"`).

## Colors

Alle Farben laufen über CSS-Variablen in `web/css/style.css`; feste Hex-Werte nur in den Variablen selbst.

### Primary
- **Modulfarbe `--m`** (per JS aus `web/js/module.js` gesetzt, je hell/dunkel): Bilanzrecht Indigo `#4f46e5`, ÖR Rose `#e11d48`, ESt Smaragd `#059669`, USt Bernstein `#d97706`, BilBf Petrol `#0e7490`, AO Violett `#7c3aed`, Privatrecht Fuchsia `#c026d3`. Abgeleitet: `--m-licht`, `--m-tief`, `--accent-weak` (12 %).

### Neutral
- Hintergrund `--bg` `#eef0f8` / dunkel `#070814`; Glas `--glas` (72 % Weiß / dunkles Blaugrau 62 %), Rand `--glas-rand`, Linie `--glas-linie`.
- Text `--text`, `--text2` (sekundär), `--text3` (Hinweise, Chevrons).

### Status
- Richtig `--ok`, Falsch `--err`, Warnung `--warn`, Gold `--gold` (Taler, Belohnungen). Je mit `-weak`-Fläche.

### Named Rules
- **Farbe heißt Fach.** Die Akzentfarbe zeigt immer, in welchem Modul man ist.
- **Kontenarten haben feste Farben** (`.art-aktiv` Blau, `.art-passiv` Violett, `.art-aufwand` Rot, `.art-ertrag` Grün …) – sie tragen Bedeutung.
- **Gesetze haben Buchrücken-Farben** (`--gz-*`, vom Nutzer anpassbar).

## Typography

Inter variabel (`web/fonts/inter-latin-var.woff2`), `font-feature-settings: "cv05","cv08","ss03"`, Beträge mit `tabular-nums`.

### Hierarchy
- Titel 32 px / 800 / −0,9 px, Verlauf Text → Modulfarbe.
- Gruppen-Titel 12 px / 700 / Versalien / 1,1 px, mit leuchtendem Punkt in der Modulfarbe.
- Karten-Titel 16,5 px / 750.
- Fließtext 16 px / 1,42; Nebentext 13–13,5 px in `--text2`.
- Aufgaben- und Lösungstext über den Textsatz `satz.js` (`.ts`): Absätze, Listen, Nummerierungen, Rechenwege (`.ts-rechnung`), Etiketten.

## Layout

Einspaltig, max. 760 px, Rand 16 px plus Safe Areas, unten Platz für die schwebende Tab-Leiste. Gruppen mit 22 px Abstand; Karten-Raster mit 10 px Lücke; Kacheln im Zweier-Raster.

## Elevation & Depth

Glasflächen mit `backdrop-filter: blur(16px) saturate(160%)`, Schatten `--schatten`, angehoben `--schatten-hoch` (getönt in der Modulfarbe). Hero und Modul-Banner: mehrschichtiger Verlauf mit Lichtkante und wanderndem Glanz.

## Shapes

Radien: 12 px (Symbole), 16 px (Knöpfe), 18–22 px (Listen, Karten), 28 px (Hero), Pillen 99 px.

## Components

### Buttons
`.knopf`: volle Breite, Verlauf `--m-licht` → `--fill` → `--m-tief`, 5-px-Lippe, beim Drücken 4 px nach unten. Varianten `.zweit` (Glas mit Rand), `.gruen`, `.rot`, `.orange`. `.icon-btn` 40 px rund aus Glas.

### Chips
`.chip` als Glas-Pille, aktiv mit Verlauf in der Modulfarbe; `.pille` und `.badge` für Status.

### Cards / Containers
`.liste` (Glas, Zeilen mit Haarlinie), `.kachel` (Glas, drückbar, `.betont` mit Akzentrand), `.themen-karte` (Farbleiste links, Icon mit Nummer, Fortschrittsbalken, Knopf „Überblick“), `.hinweis-box`.

### Inputs / Fields
Glas-Eingaben (`.suchfeld input`, `.zahl-eingabe`, `.offen-eingabe`); Buchungssatz-Eingabe als Soll/Haben-Zeilen.

### Navigation
Schwebende Tab-Leiste unten (Übersicht, Klausur, Karten, Normen), Sheets von unten für Einstellungen, Normen, Schaubilder, Garderobe.

### Taler (Signature Component)
SVG-Münze mit Brille, Stimmungen `hallo`/`jubeln`/`mut`, Outfit aus der Garderobe, Farben `--taler-*`; Bewegung nur einmal je Anlass.

## Do's and Don'ts

### Do:
- Farben nur über Variablen; jede Änderung hell **und** dunkel prüfen, auch mit Farbwelten und Hintergründen.
- Neue Listen als einzelne Glaskarten; Fachinhalt sichtbar machen (Soll/Haben, Bilanzseiten).
- Bewegung unter `data-bewegung`, teure Effekte unter `data-leistung="spar"` abschalten.
- Touch-Ziele ≥ 44 px, Kontrast WCAG AA.

### Don't:
- `.pfad`/`.pf-*` mit App-Styles treffen.
- Fachinhalt (Aufgaben, Lösungen, Normtexte) für die Optik umschreiben.
- Belohnungsanimationen in Klausur oder Klausursimulation.
- Schrift wechseln oder neue Abhängigkeiten einführen.
