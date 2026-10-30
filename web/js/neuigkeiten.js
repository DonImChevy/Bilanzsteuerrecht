// Neuigkeiten: erscheinen beim ersten Start nach einem Update (einmal, wie die Einführung des Levelsystems).
// Neueste zuerst. Bei jeder für Nutzer sichtbaren Änderung einen Eintrag oben anfügen (neue, eindeutige id).
// punkte: [icon, Titel, Text, Aktion (data-a der App, optional), Wert (data-v, optional)]
// klein: true = kleine Verbesserung – erscheint nicht beim Start, nur unter Einstellungen → Neuigkeiten.

export const NEUIGKEITEN = [
  {
    id: "2026-10-ueberblick-suche",
    datum: "2026-10-30",
    klein: true,
    titel: "Überblick und Suche aufgeräumt",
    punkte: [
      ["akte", "Überblick deutlicher", "Der Knopf „Überblick“ an jedem Thema ist jetzt gut sichtbar – und hakt nichts mehr ab. In der Liste siehst du stattdessen, wann du eine Zusammenfassung zuletzt geöffnet hast; vorgeschlagen wird, was du am längsten nicht wiederholt hast."],
      ["suche", "Suche sortiert", "Zusammenfassungen stehen oben (gelb wie ein Textmarker), danach der Lernpfad, dann der Rest."],
      ["muenze", "Garderobe", "Beim Wechsel der Reiter springt die Leiste nicht mehr an den Anfang."],
    ],
  },
  {
    id: "2026-10-suche-stichworte",
    datum: "2026-10-30",
    klein: true,
    titel: "Schlauere Suche",
    punkte: [["suche", "Stichworte und Abkürzungen", "Die Suche auf der Startseite versteht jetzt Abkürzungen und Synonyme wie „B to B“, B2C, AfA, VSt oder Pendlerpauschale, verzeiht kleine Tippfehler und durchsucht alle Fälle samt Lösungen. Suchst du ein Detail wie „Witwengeld“ oder „Brille“, zeigt sie oben, in welchem Thema es vorkommt – dazu passende Lernpfad-Blöcke."]],
  },
  {
    id: "2026-10-lernpfad-normen",
    datum: "2026-10-30",
    titel: "Lernpfad: Gesetz zum Antippen",
    punkte: [
      ["nachschlagen", "Paragrafen antippen", "Im Lernpfad öffnet jetzt jedes Normzitat auf den Lernkarten und in den Erklärungen den Gesetzestext – wie im Kompaktwissen."],
      ["lernen", "Neue Blöcke in ESt", "„Wer ist Arbeitnehmer?“ (§§ 1, 2 LStDV) und „Gewinn nach § 4 Abs. 3“ mit 1 %-Regelung. Dazu neue Karten zu Pensionen, Weihnachtsgeld & Co. und Fortbildung – und im Bilanzrecht zur Gehaltsbuchung."],
    ],
  },
  {
    id: "2026-10-est-lohn",
    datum: "2026-10-30",
    titel: "Lohnsteuer und Gehaltsbuchung",
    punkte: [
      ["kalender", "Sonstige Bezüge", "Dezembergehalt im Januar, Weihnachtsgeld, Tantieme: In welchem Jahr ist der Arbeitslohn bezogen? Laufender Arbeitslohn und sonstige Bezüge nach § 38a Abs. 1 EStG.", "thema", "est-zufluss"],
      ["rechner", "Fortbildung mit Erstattung", "Neue Rechenaufgabe wie in der Klausur: Fahrtkosten, steuerfreie Erstattung des Arbeitgebers und Kürzung der Pauschale für das Mittagessen.", "thema", "est-reisekosten"],
      ["haken", "Wer ist Arbeitnehmer?", "Arbeitnehmerbegriff und Arbeitslohn nach §§ 1, 2 LStDV – mit Fällen von Geschäftsführer bis Witwengeld. Die LStDV kannst du jetzt auch unter Nachschlagen lesen.", "thema", "est-einkuenfte"],
      ["tkonto", "Gehaltsbuchung", "Im Bilanzrecht: Gehaltsabrechnung als zusammengesetzter Buchungssatz mit Lohnsteuer, Sozialversicherung, Arbeitgeberanteil und Vorschuss – dazu Vorschuss und Abführung. Im Buchungssatz-Filter unter „Löhne und Gehälter“.", "thema", "erfolgskonten"],
    ],
  },
  {
    id: "2026-10-countdown-leiste",
    datum: "2026-10-29",
    klein: true,
    titel: "Klausuren kompakter",
    punkte: [["kalender", "Klausur-Countdown zum Wischen", "Die Klausurtermine auf der Startseite stehen jetzt als kleine Karten nebeneinander – seitlich wischen, alle Termine statt nur drei."]],
  },
  {
    id: "2026-10-lernpfad-tablet",
    datum: "2026-10-29",
    klein: true,
    titel: "Lernpfad: Tablet und § 12 EStG",
    punkte: [["lernen", "Karten mittig", "Lernkarten und Fragen im Lernpfad stehen auf breiten Bildschirmen wieder in der Mitte statt am linken Rand."],
      ["haken", "ESt § 12 vollständig", "Lernpfad und Kompaktwissen nennen jetzt alle Abzugsverbote: Zuwendungen (Nr. 2) und sämtliche Personensteuern (Nr. 3) – gemischte Aufwendungen haben eine eigene Karte."]],
  },
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
