// Neuigkeiten: erscheinen beim ersten Start nach einem Update (einmal, wie die Einführung des Levelsystems).
// Neueste zuerst. Bei jeder für Nutzer sichtbaren Änderung einen Eintrag oben anfügen (neue, eindeutige id).
// punkte: [icon, Titel, Text, Aktion (data-a der App, optional), Wert (data-v, optional)]
// klein: true = kleine Verbesserung – erscheint nicht beim Start, nur unter Einstellungen → Neuigkeiten.

export const NEUIGKEITEN = [
  {
    id: "2026-11-taler-neu",
    datum: "2026-11-13",
    titel: "Taler neu gezeichnet",
    klein: true,
    punkte: [
      ["muenze", "Mehr Tiefe und echte Hände", "Taler hat einen geprägten Rand, weichere Lichter und Hände mit Daumen. Was er hält, greift er jetzt richtig: Die Finger schließen sich um den Griff, der Gegenstand liegt vor der Münze.", "garderobe", "hand"],
      ["hut", "Garderobe aufgefrischt", "Alle Gegenstände für die Hand sind neu gezeichnet, die Hüte haben Verläufe, Glanz und einen Schatten auf der Münze.", "garderobe", "kopf"],
    ],
  },
  {
    id: "2026-11-edition",
    datum: "2026-11-12",
    titel: "Neues Design: die Edition",
    punkte: [
      ["sterne", "Wie ein gebundenes Gesetzeswerk", "Jedes Modul ist ein Band in Leinen mit Goldprägung, Titel und große Zahlen stehen in einer klassischen Buchschrift, Karten sind Papier statt Milchglas. Inhalte und Funktionen sind unverändert."],
      ["mond", "Dunkel als Bühne, hell als Papier", "Beide Ansichten sind neu gestaltet; Farbwelten, Hintergründe und der Sparmodus funktionieren weiter.", "einstellungen"],
    ],
  },
  {
    id: "2026-11-teilpunkte",
    datum: "2026-11-12",
    titel: "Teilpunkte im Selbstkontrollbogen",
    punkte: [
      ["haken", "Gerecht bewerten", "Wo die Klausur z. B. zwei von drei Merkmalen verlangt oder eine Prüfung aus mehreren Schritten besteht, tippst du jetzt einzeln an, was in deiner Lösung steht – der Ring zeigt die Teilpunkte, mehr als die volle Punktzahl gibt es nie.", "tab", "klausur"],
    ],
  },
  {
    id: "2026-11-modulleiste",
    datum: "2026-11-12",
    titel: "Modul-Leiste besser sichtbar",
    klein: true,
    punkte: [
      ["start", "Übersicht, Klausur, Karten, Normen", "Auf dem iPad steht die Leiste jetzt oben mittig, auf dem Handy unten in der Modulfarbe mit größerer Schrift."],
    ],
  },
  {
    id: "2026-11-bewertungsrecht",
    datum: "2026-11-12",
    titel: "Neues Modul: Bewertungsrecht",
    punkte: [
      ["haus", "Bewertungsrecht (GS I)", "14 Themen von der Schenkung über Steuerklassen, Familienheim, § 13d und Betriebsvermögen bis zum Ertragswertverfahren – mit Lernpfad, Kompaktwissen, Rechenaufgaben und ErbStG/BewG zum Nachschlagen.", "modul", "bewr"],
      ["klausur", "Probeklausur 120 Minuten", "Ein Erbfall mit drei Erwerbern im Aufbau der Hauptklausur – mit Musterlösung, Selbstkontrollbogen und Stichworten."],
    ],
  },
  {
    id: "2026-11-stichworte",
    datum: "2026-11-12",
    titel: "Stichworte im Selbstkontrollbogen",
    klein: true,
    punkte: [
      ["haken", "Stichworte je Bewertungspunkt", "Unter jedem Punkt im Selbstkontrollbogen stehen jetzt die Formulierungen, die in deiner Lösung vorkommen müssen – Definitionen, Tatbestandsmerkmale und Begründung, nicht nur die Paragrafen.", "tab", "klausur"],
    ],
  },
  {
    id: "2026-11-teilklausuren",
    datum: "2026-11-12",
    titel: "Probeklausuren in Teilen",
    punkte: [
      ["ziel", "Einzelne Teile üben", "Auf dem Deckblatt wählst du alle Aufgaben oder nur einzelne (z. B. nur Teil II) – Zeit, Punkte und Note passen sich an, die Zahlen bleiben dieselben.", "tab", "klausur"],
      ["haken", "Erwartungshorizont überall", "Auch die Bilanzrecht-Klausuren zeigen jetzt zu jedem Bewertungspunkt, was genau erwartet wird – mit Beträgen und Normen."],
    ],
  },
  {
    id: "2026-11-probeklausuren",
    datum: "2026-11-12",
    titel: "Probeklausuren mit Selbstkontrollbogen",
    punkte: [
      ["klausur", "Drei Klausuren je Fach", "Für Bilanzrecht, BilBf, Umsatzsteuer, Privatrecht und Öffentliches Recht gibt es jetzt je drei vollständige Probeklausuren im Aufbau der echten Prüfung – mit Deckblatt, Uhr und Vorspann.", "tab", "klausur"],
      ["stift", "Mit der Hand schreiben", "Löse auf Papier oder direkt mit dem Stift im Klausurblatt. Fotos deiner Blätter erscheinen neben der Musterlösung."],
      ["haken", "Selbstkontrollbogen", "Nach der Abgabe hakst du jedes Merkmal ab, das deine Lösung enthält – zu jedem Punkt steht, was genau erwartet wird. Die Note rechnet mit."],
    ],
  },
  {
    id: "2026-11-updates",
    datum: "2026-11-12",
    klein: true,
    titel: "Updates kommen von selbst",
    punkte: [
      ["stern", "Kein Neustart mehr nötig", "Die App sucht bei jeder Rückkehr nach Updates und lädt eine neue Version automatisch – aber nie mitten in einer Übung oder Klausur."],
      ["ziel", "Selbst nachsehen", "Unter Einstellungen → Hinweis siehst du die genaue Version und kannst mit „Nach Update suchen“ sofort aktualisieren.", "einstellungen"],
    ],
  },
  {
    id: "2026-11-textsatz",
    datum: "2026-11-12",
    klein: true,
    titel: "Aufgaben sauber gesetzt",
    punkte: [
      ["stift", "Neue Schrift", "Die App nutzt jetzt durchgehend die Schrift Inter – auf allen Geräten gleich und gut lesbar."],
      ["karten", "Aufgeräumte Lösungen", "Rechenwege Zeile für Zeile mit Rechenzeichen, Aufzählungen und Nummerierungen als echte Listen, einheitliche Abkürzungen – und Paragrafen in Lösungen sind antippbar."],
    ],
  },
  {
    id: "2026-11-schaubilder",
    datum: "2026-11-11",
    titel: "Schaubilder zum Kompaktwissen",
    punkte: [
      ["karten", "Regeln auf einen Blick", "In vielen Überblicken gibt es jetzt türkise Knöpfe „Schaubild: …“ – z. B. Tausch, Kommission, Vermittlungsausschuss, Fristen am Zeitstrahl oder die vier Bilanzveränderungen.", "kompakt", "ust-leistung"],
      ["ziel", "Antippen statt lesen", "Die Grafiken öffnen sich nur auf Knopfdruck und werden beim Anhören nicht mit vorgelesen. Normzitate darin sind antippbar."],
    ],
  },
  {
    id: "2026-11-suche",
    datum: "2026-11-10",
    klein: true,
    titel: "Schlauere Suche",
    punkte: [
      ["suche", "Direkt-Antworten", "„GWG Grenze“ oder „Verspätungszuschlag Höhe“ zeigt die Zahl sofort oben – mit Fundstelle."],
      ["akte", "Paragrafen und Fragen", "„15 UStG“ zeigt den Wortlaut direkt im Treffer; Fragen wie „Was ist ein Verwaltungsakt?“ funktionieren auch."],
      ["haken", "Filter und Verlauf", "Treffer nach Modul filtern, zuletzt Gesuchtes per Antippen wiederholen."],
    ],
  },
  {
    id: "2026-11-lernen-neu",
    datum: "2026-11-09",
    titel: "Abdecken, Denkfehler – und der Kursraum",
    punkte: [
      ["karten", "Kompaktwissen abdecken", "Schalte im Überblick auf „Abdecken“: Textmarker und Zahlen werden zu Lücken. Erst überlegen, dann aufdecken – die nicht gewussten kommen beim nächsten Mal zuerst."],
      ["ziel", "Denkfehler-Radar", "Bei einer falschen Buchung sagt dir die App, welcher Denkfehler dahintersteckt – brutto statt netto, Soll und Haben vertauscht, Privates als Aufwand … – und übt ihn gezielt mit dir."],
      ["akte", "Kursraum", "Lehrende können Hinweise, Dateien und Aufgabenblätter direkt ins Modul stellen. Du findest sie unter „Aus dem Kurs“."],
      ["haken", "Nichts geht mehr verloren", "Eine angefangene Klausur übersteht jetzt auch das Schließen der App – „weitermachen“ bringt dich zurück. In Klausuren bleibt der Bildschirm an."],
    ],
  },
  {
    id: "2026-11-ksim-handschrift",
    datum: "2026-11-06",
    titel: "Klausur mit der Hand schreiben",
    punkte: [
      ["stift", "Tippen oder Schreiben", "In der Klausursimulation kannst du je Sachverhalt auf „Schreiben“ umschalten und mit Stift oder Finger auf liniertem Papier lösen – so schnell wie in der echten Klausur.", "tab", "klausur"],
      ["plus", "Beliebig viele Blätter", "Mit „Blatt hinzufügen“ geht es auf dem nächsten Blatt weiter. Stift, Textmarker, Radierer und Rückgängig wie im Karteneditor; alles bleibt auf dem Gerät gespeichert."],
      ["haken", "Vergleich in der Auswertung", "Nach der Abgabe stehen deine Blätter direkt über der Musterlösung und dem Bewertungsbogen."],
    ],
  },
  {
    id: "2026-11-klausursim",
    datum: "2026-11-06",
    titel: "Klausur simulieren – wie in echt",
    punkte: [
      ["klausur", "60, 90 oder 180 Minuten", "Bilanzrecht: Deckblatt mit Zeiteinteilung, Einzelsachverhalte im Stil der Semesterklausur – Warenkonten, Grundstückskauf, Darlehen, Firmenwagen, RAP und mehr – mit immer neuen Zahlen.", "tab", "klausur"],
      ["stift", "Schreiben wie auf Papier", "Würdigung, Berechnungen und Buchungssätze mit GuV- und BVV-Auswirkung frei eingeben. Die Uhr läuft, nach Ablauf wird abgegeben; dein Entwurf bleibt auf dem Gerät gespeichert."],
      ["haken", "Bewertungsbogen und Note", "Nach der Abgabe: Musterlösung je Sachverhalt, Bewertungsbogen zum Abhaken und Note von 0 bis 15 Punkten. Weitere Module folgen."],
    ],
  },
  {
    id: "2026-11-handtaschen",
    datum: "2026-11-06",
    klein: true,
    titel: "Drei Handtaschen in der Garderobe",
    punkte: [["muenze", "Neu für Talers Hand", "Henkeltasche aus Cognac-Leder, gesteppte Kettentasche (ab Level 8) und Bügeltasche aus Samt mit Kussverschluss.", "garderobe", "hand"]],
  },
  {
    id: "2026-11-profi-stimme",
    datum: "2026-11-06",
    titel: "Überblicke mit echter Sprecherstimme",
    punkte: [
      ["play", "Sprecher Cedar", "Alle Überblicke im Kompaktwissen sind jetzt professionell vertont – natürliche Betonung, ruhig wie ein Dozent, Paragrafen ausgeschrieben. Einfach „Anhören“ tippen."],
      ["haken", "Läuft auch bei gesperrtem Bildschirm", "Mit Kopfhörern unterwegs lernen: Pause, Vor und Zurück gehen auch über den Sperrbildschirm. „Alle Überblicke anhören“ spielt das ganze Modul am Stück."],
      ["info", "Ohne Internet", "Die Aufnahmen werden beim Anhören geladen (ca. 1–2 MB je Thema). Offline liest wie bisher die Gerätestimme."],
    ],
  },
  {
    id: "2026-11-pr-modul",
    datum: "2026-11-06",
    titel: "Neues Modul: Privatrecht",
    punkte: [
      ["waage", "Privatrecht (GS I)", "16 Themen von der Rechtsfähigkeit über Willenserklärung, Anfechtung und Stellvertretung bis zu Kauf, Verjährung und Eigentum – mit Frage-Antwort, Fällen, Klausur und BGB-, HGB- und GmbHG-Text (Stand 2026).", "modul", "pr"],
      ["stift", "Gutachten-Fälle wie in der Klausur", "Zahlungsansprüche mit Stellvertretung, minderjährigen Vertretern, Anfechtung und Delikt – mit Musterlösung im Gutachtenstil und Klausur-Fahrplan im Kompaktwissen."],
      ["karten", "Lernpfad, Kompaktwissen, Paare", "Für jedes Thema ein Lernpfad-Block, eine Zusammenfassung mit Klausurbeispiel (auch zum Anhören) und das Normen-Paare-Spiel."],
    ],
  },
  {
    id: "2026-11-vorlesen",
    datum: "2026-11-05",
    titel: "Überblicke zum Anhören",
    punkte: [
      ["play", "Kompaktwissen vorlesen lassen", "Jeder Überblick hat jetzt „Anhören“: Kernsatz, Zahlen, Prüfungsschema, das Wichtigste, typische Fehler und Klausurbeispiele – Paragrafen und Abkürzungen werden ausgeschrieben („Paragraf 11 Absatz 2 Satz 4 Einkommensteuergesetz“). Der gerade gelesene Punkt leuchtet zum Mitlesen."],
      ["wiederholen", "Pause, Springen, Tempo", "Punkt vor oder zurück, Tempo von 0,8× bis 1,3× (startet etwas langsamer). In der Themenliste: „Alle Überblicke anhören“ spielt das ganze Modul nacheinander."],
      ["info", "Kein Speicherplatz nötig", "Es liest die eingebaute Stimme deines Geräts – nichts wird heruntergeladen, es geht auch offline. Der Bildschirm muss dabei an bleiben: Beim Sperren hält das Vorlesen an, „Weiter“ macht an derselben Stelle weiter."],
    ],
  },
  {
    id: "2026-11-gobt",
    datum: "2026-11-04",
    klein: true,
    titel: "Geschäftsordnung des Bundestages im Normen-Tab",
    punkte: [["akte", "GOBT zum Nachschlagen", "Öffentliches Recht: die wichtigsten Paragrafen der Geschäftsordnung des Bundestages (Stand Juli 2026) – u. a. Fraktionen, Beschlussfähigkeit, Beratungen, Misstrauens- und Vertrauensantrag. Zitate wie „§ 10 GOBT“ sind jetzt antippbar."]],
  },
  {
    id: "2026-11-ao-modul",
    datum: "2026-11-02",
    titel: "Neues Modul: Abgabenordnung",
    punkte: [
      ["akte", "Abgabenordnung (GS I)", "14 Themen vom Steuergeheimnis über Bekanntgabe und Nichtigkeit bis zu Fristen und Säumniszuschlägen – mit Frage-Antwort, Fällen, Klausur und AO-Gesetzestext (Stand 2026).", "modul", "ao"],
      ["kalender", "Fristen mit echten Daten", "Bekanntgabe, Einspruchsfrist und Wiedereinsetzung werden mit echten Kalendertagen 2026 gerechnet – inklusive Wochenenden, Feiertagen und Vier-Tages-Fiktion."],
      ["karten", "Lernpfad, Zusammenfassungen, Paare", "Für jedes Thema ein Lernpfad-Block, Kompaktwissen mit Klausurbeispiel und das Normen-Paare-Spiel."],
    ],
  },
  {
    id: "2026-11-lernkartei",
    datum: "2026-11-01",
    titel: "Lernkartei wiederholt jetzt alles",
    punkte: [
      ["wiederholen", "Jede Aufgabe kommt morgen wieder", "Nicht nur die Fehler: Alles, was du übst, steht am nächsten Tag unter „Wiederholen“ – danach nach 3, 7, 14 und 30 Tagen. Pro Tag rückt eine Aufgabe höchstens ein Fach vor, auch wenn sie in einer Übung mehrmals drankommt."],
      ["haken", "Fehler zuerst", "In der Wiederholung kommen Fehler zuerst. Als behoben gilt ein Fehler erst, wenn du die Aufgabe an einem späteren Tag richtig löst. Nach jeder Runde geht es mit „Weiter“ durch den Rest."],
      ["kalender", "Einmal nachholen", "Was in den letzten 3 Tagen zu weit nach hinten gesprungen ist, kommt einmalig zurück – verteilt auf die nächsten 3 Tage."],
    ],
  },
  {
    id: "2026-10-rangliste-namen",
    datum: "2026-10-30",
    klein: true,
    titel: "Rangliste ohne doppelte Einträge",
    punkte: [["pokal", "Keine doppelten Einträge mehr", "Alte Kopien (entstanden durch ältere App-Versionen) werden beim Öffnen aufgeräumt. Heißen zwei Personen gleich, stehen trotzdem beide in der Liste.", "rangliste"]],
  },
  {
    id: "2026-10-leistung",
    datum: "2026-10-30",
    titel: "Flüssiger auf älteren Geräten",
    punkte: [
      ["blitz", "Grafik & Tempo", "Neu in den Einstellungen: „Schnell“ verzichtet auf Glas-Unschärfe, bewegten Hintergrund und Dauer-Animationen. „Automatisch“ misst beim Start, ob das Gerät ins Stocken kommt, und schaltet selbst um.", "einstellungen"],
      ["suche", "Schnellere Suche", "Die Suche bereitet sich im Hintergrund vor – die erste Suche hängt nicht mehr."],
    ],
  },
  {
    id: "2026-10-rangliste-doppelt",
    datum: "2026-10-30",
    klein: true,
    titel: "Rangliste repariert",
    punkte: [["pokal", "Jede Person nur einmal", "Wer mehrere Geräte synchronisiert, stand in der Rangliste teils mehrfach. Die ID bleibt jetzt beim Abgleich erhalten, doppelte Einträge verschwinden beim nächsten Öffnen.", "rangliste"]],
  },
  {
    id: "2026-10-handschrift",
    datum: "2026-10-30",
    titel: "Karteikarten mit der Hand schreiben",
    punkte: [
      ["stift", "Mit Apple Pencil, Stift oder Finger", "Bei „Neue Karte“ je Seite auf „Schreiben“ tippen: Stift mit Druckstärke, Textmarker, Radierer, vier Farben, Rückgängig und liniertes oder kariertes Papier.", "tab", "karten"],
      ["karten", "Lernen wie gewohnt", "Handschrift und Text lassen sich mischen – etwa Frage getippt, Lösung von Hand. Die Karten laufen in der Lernkartei und werden mit dem Sync-Code übertragen."],
    ],
  },
  {
    id: "2026-10-rangliste-taler",
    datum: "2026-10-30",
    klein: true,
    titel: "Rangliste mit Talern",
    punkte: [["pokal", "Jeder Taler im eigenen Outfit", "In der Rangliste siehst du jetzt alle Taler groß so, wie jede und jeder sie gestaltet hat – mit Level und XP der Woche.", "rangliste"]],
  },
  {
    id: "2026-10-nachtschwinge-maske",
    datum: "2026-10-30",
    titel: "Masken: Nachtschwinge",
    punkte: [["muenze", "Nachtschwinge", "Fledermaus-Kopfmaske in der neuen Kategorie Masken – zu jedem Metall kombinierbar. Mit Make-up leuchten die Augen rosa, Wimpern bleiben sichtbar.", "garderobe", "maske"]],
  },
  {
    id: "2026-10-beauty",
    datum: "2026-10-30",
    titel: "Neu in der Garderobe: Make-up & Wimpern",
    punkte: [
      ["auge", "Make-up & Wimpern", "Schimmernder Lidschatten, Lidstrich mit Schwung, Rouge mit Highlighter und glänzende Lippen (250 Taler), geschwungene Wimpern (150 Taler) – oder beides im Set für 300 Taler.", "garderobe", "gesicht"],
      ["ohrring", "Ohrringe", "Herzchen, Goldcreolen, §-Ohrringe, Perlen und Diamantstecker.", "garderobe", "ohr"],
    ],
  },
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
