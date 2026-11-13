---
name: Finanzwirt-Trainer
description: Lern-App zum Diplom-Finanzwirt (GS I) und FTA I – „Edition“, das Gesetzeswerk als Prachtausgabe in Leinen, Papier und Goldprägung.
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

# Design System: Finanzwirt-Trainer – „Edition“

## Overview

Die App ist eine **Prachtausgabe**: Jedes Modul ist ein Band in **Leinen** (Modulfarbe, abgedunkelt, mit feinem Gewebe) mit **Goldprägung** (Rahmenlinie, Ziffern, Embleme). Inhalte liegen auf **Papier** mit Haarlinien – kein Milchglas, kein Leuchten, keine Verläufe als Schmuck. Titel und große Zahlen stehen in **Bodoni Moda**, alles Lesbare und Bedienbare in **Inter**. Dunkel („Lesesaal bei Nacht“) ist die Bühne, hell („Papier“) gleichwertig.

Die Schicht liegt in `web/css/edition.css` über `style.css` (oben Werte, darunter Bausteine). Der Lernpfad (`.pfad`/`.pf-*`) behält seine eigene Welt. Farbwelten, App-Hintergründe, `data-bewegung` und `data-leistung="spar"` gelten weiter.

## Colors

- Grund/Papier: `--bg` `#f3f0e9` / dunkel `#0d0c0e`; Flächen `--glas` (deckend) `#fffdf8` / `#17151a`; Rand `--glas-rand` (goldgetönte Haarlinie).
- Text: `--text` `#1b1814` / `#f3eee3`, `--text2`, `--text3`.
- Gold: `--gold-ton` (Schrift, Rauten), `--gold-linie` (Haarlinien), `--folie` (Flächen wie Fortschritt), auf Leinen `--blattgold` und `--elfenbein`.
- Leinen: `--leinen`, `--leinen-tief` aus `--m-hell`; Gewebe `--gewebe`; Knöpfe `--knopf`.
- **Farbe heißt Fach** bleibt: Modulfarbe `--m` für Akzente, als Leinen für Einbände. Kontenarten und Gesetzesfarben unverändert.

## Typography

- `--serif` Bodoni Moda (variabel, `web/fonts/bodoni-moda-latin-var*.woff2`, OFL): `h1.titel`, Hero, Modul-Banner, Band-Titel, Sheet-Titel, Kernsatz im Kompaktwissen, Deckblatt, Kartenfrage, Kennzahlen. Gewicht 500, nie unter 15 px.
- Inter für Fließtext, Aufgaben, Lösungen, Normen, Knöpfe. Gruppen-Titel: Versalien 11,5 px mit goldener Raute und Haarlinie.

## Shapes, Depth, Motion

- Radien klein und buchartig: 10/14/18 px, Bände 6/12 px (Rücken links), Pillen nur für die Navigation.
- Tiefe über weiche, neutrale Schatten und Lichtkanten; keine farbigen Halos.
- Ein inszenierter Moment: Licht wandert einmal über die Goldprägung von Hero/Banner; Bände gleiten gestaffelt herein. Sonst ruhiges Einblenden (`cubic-bezier(0.16,1,0.3,1)`).

## Components

- **Einband** (`.hero`, `.modul-banner`): Leinen, Goldrahmen als `outline`, Serifentitel, Kennzahlen mit Haarlinien getrennt.
- **Band** (`.modul-kachel`): Leinenrücken links, Rahmen, Emblem im Goldkreis, Bauchbinde für „heute fällig“.
- **Knopf** (`.knopf`): gefärbtes Leinen mit Lichtkante, drückt 1 px; `.zweit` als Haarlinien-Knopf; im Hero elfenbeinfarben.
- **Papierkarten** (`.liste`, `.kachel`, `.themen-karte`, `.option`, `.aufgabe`): deckend, Haarlinie, Symbole als Kreis mit Linie.
- **Menükarte** (`.kachel-grid`): Zeilen auf einem Blatt – Liniensymbol, Serifentitel, Goldpfeil; keine Kachelraster.
- **Kapitelblätter** (`.themen-karte`): je Thema ein eigenes Blatt – Kapitelziffer in Gold, Serifentitel, Haarlinien-Fortschritt; rechts „Überblick“ als kleines Schriftstück (`.tk-lesen`, Eselsohr, Textzeilen), das die Höhe füllt.
- **Gesetzte Listen** (`.liste .zeile`, `.hebel`, `.ks-fest`): Serifentitel, Goldziffern statt Kästchen, Haarlinien.
- **Registerreiter** (`.segment`): Text mit Goldlinie unter dem aktiven Reiter, kein Kasten.
- **Navigation** (`.tabbar`): Lackleiste mit Goldkante, aktiv in Leinen.

## Do's and Don'ts

- Farben nur über Variablen; hell **und** dunkel sowie Farbwelten prüfen.
- Kein `backdrop-filter`, keine Leucht-Schatten, kein Verlaufstext, keine 3D-„Gummi“-Knöpfe.
- Serifenschrift nur für Titel und Zahlen, nie für Aufgaben- oder Gesetzestext.
- `.pfad`/`.pf-*` nicht anfassen; Fachinhalt nie für die Optik umschreiben.
- Touch-Ziele ≥ 44 px, Kontrast WCAG AA.
