// Neuigkeiten: erscheinen beim ersten Start nach einem Update (einmal, wie die Einführung des Levelsystems).
// Neueste zuerst. Bei jeder für Nutzer sichtbaren Änderung einen Eintrag oben anfügen (neue, eindeutige id).
// punkte: [icon, Titel, Text, Aktion (data-a der App, optional), Wert (data-v, optional)]
// klein: true = kleine Verbesserung – erscheint nicht beim Start, nur unter Einstellungen → Neuigkeiten.

export const NEUIGKEITEN = [
  {
    id: "2026-10-buchungsfilter",
    datum: "2026-10-29",
    titel: "Buchungssätze gezielt üben",
    punkte: [
      ["tkonto", "Lernfilter für Buchungssätze", "Unter „Buchungssätze“ wählst du jetzt die Form – einfach, mehrere Soll an ein Haben, ein Soll an mehrere Haben, mehrere an mehrere – oder den Anlass: Berichtigung, Skonto, Privat, Abschluss. Dazu siehst du, wie oft jede Form in den Klausuren vorkam."],
      ["stift", "Neue Berichtigungsbuchungen", "Falsch Gebuchtes direkt umbuchen wie in der Klausur – Anlagegut oder Grundstück als Aufwand gebucht, Fracht ohne Vorsteuer, Zahlung vom Privatkonto. Dazu: Gutschrift mit Gegenkauf."],
    ],
  },
  {
    id: "2026-10-pink-diamond",
    datum: "2026-10-29",
    titel: "Pink Diamond",
    punkte: [
      ["muenze", "Die neue Endstufe für Taler", "Taler wird selbst zum Edelstein: geschliffener, unebener Rand statt Münzkreis, Brillantschliff, Facetten blitzen nacheinander auf, ein Regenbogenschimmer zieht über den Stein. 1.500 Taler, in der Garderobe unter Metall.", "garderobe"],
    ],
  },
  {
    id: "2026-10-est-gewinnermittlung",
    datum: "2026-10-28",
    titel: "ESt: was in jeder Klausur drankommt",
    punkte: [
      ["tkonto", "Neues Thema: Gewinnermittlung § 4 Abs. 3", "Vorläufigen Gewinn korrigieren wie in Teil II der Klausur: Grundstück, Darlehen, Diebstahl, Vorauszahlungen, Entnahmen – und der Praxis-Pkw mit 1 %-Regelung, 0,03 % und Kostendeckelung.", "thema", "est-gewinn"],
      ["person", "Versorgungsbezüge und Aufmerksamkeiten", "Versorgungsfreibetrag nach dem Jahr des Versorgungsbeginns rechnen; Geschenke vom Arbeitgeber und von Kollegen richtig einordnen."],
      ["nachschlagen", "Gesetzestext ergänzt", "§ 4 Abs. 3, § 6 Abs. 1 Nr. 4 und § 19 Abs. 2 EStG (mit Tabelle) stehen jetzt im Normen-Tab."],
    ],
  },
  {
    id: "2026-10-termine-bearbeiten",
    datum: "2026-10-28",
    klein: true,
    titel: "Klausurtermine bearbeiten",
    punkte: [
      ["kalender", "Termine ändern", "Datum, Fach oder Bezeichnung falsch? Über den Stift neben dem Termin lässt er sich jetzt ändern, statt ihn neu anzulegen.", "termine"],
      ["akte", "Alle Fächer wählbar", "Auch Abgabenordnung, Bewertungsrecht, Privatrecht und „Anderes Fach“ lassen sich eintragen – der Countdown läuft für jede Klausur."],
    ],
  },
  {
    id: "2026-10-gesetzesfarben",
    datum: "2026-10-28",
    titel: "Eigene Farben für die Gesetzbücher",
    punkte: [
      ["einstellungen", "Farben selbst festlegen", "Über das Regler-Symbol an „Paare finden“ bekommt jedes Gesetz die Farbe, die du willst – aus Vorschlägen oder frei gemischt.", "gesetzFarben"],
    ],
  },
  {
    id: "2026-10-paare-gesetzbuch",
    datum: "2026-10-28",
    titel: "Paare finden im neuen Look",
    punkte: [
      ["karten", "Normen mit Buchrücken", "Jede Norm trägt die Farbe ihres Gesetzes – HGB, EStG, AO, UStG, GG … So prägt sich nebenbei ein, wo sie steht."],
      ["stern", "Dein Regal füllt sich", "Jedes gefundene Paar wandert als Buchrücken ins Regal. Am Ende siehst du deine ganze Sammlung."],
    ],
  },
  {
    id: "2026-10-inhalte-geprueft",
    datum: "2026-10-28",
    titel: "Inhalte geprüft",
    punkte: [
      ["haken", "Alle Module durchgesehen", "Aufgaben, Überblick, Klausurbeispiele und Lernpfade wurden mit dem Gesetz (Stand 2026) abgeglichen – Zitate und Formulierungen sind an einigen Stellen genauer."],
      ["nachschlagen", "Gesetzestext: Satznummern stimmen", "Die Sätze eines Absatzes werden jetzt auch bei Verweisen wie „Satz 2.“ oder Fundstellen im Text richtig gezählt."],
      ["info", "Hinweis zu einer Aufgabe senden", "Etwas falsch oder unklar? Nach jeder Aufgabe auf „Hinweis“ tippen, kurz beschreiben und absenden – der Hinweis kommt mit der Aufgabe direkt beim Entwickler an."],
    ],
  },
  {
    id: "2026-10-bild-anpassen",
    datum: "2026-10-28",
    titel: "Eigenes Bild anpassen",
    punkte: [
      ["einstellungen", "Ausschnitt und Zoom", "Bild im Handy-Rahmen ziehen und heranzoomen – so landet das Wichtigste dort, wo es nicht verdeckt wird.", "hintergrundWaehlen"],
      ["auge", "Bild oder Schrift?", "Mit dem Regler entscheidest du selbst: kräftiges Bild oder besser lesbare Schrift.", "hintergrundWaehlen"],
    ],
  },
  {
    id: "2026-10-vorschau",
    datum: "2026-10-28",
    titel: "Erst ansehen, dann kaufen",
    punkte: [
      ["auge", "Vorschau für Hintergründe", "Jeden Hintergrund kannst du vor dem Kauf auf der ganzen App ausprobieren – mit „Zurück“ oder „Kaufen“ unten.", "hintergrundWaehlen"],
      ["bild", "Eigenes Bild vorher testen", "Foto aus der Galerie wählen, ansehen und erst dann für 1.000 Taler übernehmen.", "hintergrundWaehlen"],
    ],
  },
  {
    id: "2026-10-hintergruende",
    datum: "2026-10-28",
    titel: "Neue Hintergründe und Farbwelten",
    punkte: [
      ["bild", "13 neue Hintergründe", "Unter anderem Marmor, Art déco, Pastell, Kirschblüte, Galaxie und Neon – jeweils mit heller und dunkler Fassung.", "hintergrundWaehlen"],
      ["bild", "Eigenes Bild als Hintergrund", "Für 1.000 Taler wird ein Foto aus deiner Galerie zum Hintergrund der App.", "hintergrundWaehlen"],
      ["herz", "Drei Farbwelten", "Indigo, Rosa oder Salbei – kostenlos umschaltbar in der Garderobe und in den Einstellungen.", "hintergrundWaehlen"],
      ["muenze", "Hintergründe kosten jetzt Taler", "Außer dem Standard „Leuchten“. Zu finden unter Garderobe → Hintergrund & Farben."],
    ],
  },
  {
    id: "2026-10-garderobe",
    datum: "2026-10-28",
    titel: "Garderobe, Countdown und mehr",
    punkte: [
      ["muenze", "Taler als Währung", "Für je 10 XP bekommst du einen Taler – auch rückwirkend. Damit kaufst du in der Garderobe Hüte, Brillen, Metalle, Auren und App-Hintergründe.", "garderobe"],
      ["kalender", "Klausur-Countdown", "Trag deine Klausurtermine ein: Die Startseite zählt die Tage herunter und zeigt, wie viel du pro Tag schaffen solltest.", "termine"],
      ["diagramm", "Rückblick und Statistik", "Wochen- und Monatsrückblick, Lernkalender, deine beste Lernzeit und Trefferquoten je Modul.", "rueckblick", "woche"],
      ["blitz", "Duell", "Fordere jemanden per Link heraus: dieselben 10 Aufgaben für beide – wer mehr richtig hat, gewinnt.", "duell"],
      ["pokal", "Lerngruppe mit Rangliste", "Gründe eine Gruppe mit deinem Kurs und seht, wer diese Woche die meisten XP sammelt.", "rangliste"],
      ["einstellungen", "Startseite anpassen", "Bereiche verschieben und ausblenden – Level und Taler bleiben oben.", "startAnpassen"],
      ["export", "Backup", "Lernstand als Datei sichern und wiederherstellen – in den Einstellungen unter „Datensicherung“.", "einstellungen"],
      ["sterne", "Neuigkeiten", "Nach jedem Update zeigt dir Taler hier, was neu ist. Später wieder aufrufen: Einstellungen → Neuigkeiten."],
    ],
  },
  {
    id: "2026-10-level",
    datum: "2026-10-28",
    titel: "Level und Erfolge",
    punkte: [
      ["pokal", "Levelsystem", "Jede Aufgabe bringt XP – Level 1 bis 100, Ränge von Kupfer bis Goldener Taler.", "level"],
      ["stern", "Münzalbum", "55 Erfolge in Stufen: richtige Aufgaben, Serien, Buchungssätze am Stück, Lerntage …", "level"],
    ],
  },
];

export const NEUESTE = NEUIGKEITEN[0].id;

/** Einträge, die seit `gesehen` dazugekommen sind (ohne Kennung: nur der neueste). */
export function ungesehen(gesehen) {
  if (!gesehen) return [NEUIGKEITEN[0]];
  const i = NEUIGKEITEN.findIndex((n) => n.id === gesehen);
  return i < 0 ? [NEUIGKEITEN[0]] : NEUIGKEITEN.slice(0, i);
}
