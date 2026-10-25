// Klausurbeispiele Öffentliches Recht: eigener Sachverhalt im Stil der Semesterklausuren und Musterlösung
// so knapp wie in den Lösungshinweisen – Wissensfragen direkt beantworten, Gutachtenstil („Fraglich ist …“)
// nur bei echten Fallfragen. Jede Aussage mit der tragenden Norm. Kein Klausurtext übernommen.
// Format: { titel, sv (Sachverhalt), aufgabe, loesung: [Absätze] } – **fett** = Textmarker, Normzitate werden antippbar.

export const BEISPIELE_OER = {
  "oer-staatsziele": [
    {
      titel: "Ist Deutschland ein Staat?",
      sv: "Steuerpflichtiger S antwortet auf eine Mahnung des Finanzamts: „Die BRD ist kein Staat, sondern eine Firma. Sie hat keine Verfassung, nur ein ‚Grundgesetz‘.“",
      aufgabe: "Nehmen Sie kurz Stellung.",
      loesung: [
        "Nach der Drei-Elemente-Lehre (Georg Jellinek) ist die Bundesrepublik ein Staat: Sie hat ein **Staatsgebiet** (das Gebiet der 16 Länder, Präambel S. 2 GG), ein **Staatsvolk** (die Deutschen, Art. 116 Abs. 1 GG) und eine **Staatsgewalt**, die vom Volk ausgeht und durch Gesetzgebung, vollziehende Gewalt und Rechtsprechung ausgeübt wird (Art. 20 Abs. 2 GG).",
        "Das Grundgesetz ist trotz seines Namens die Verfassung: Das Deutsche Volk hat es sich kraft seiner verfassungsgebenden Gewalt gegeben (Präambel S. 1 GG), es geht dem einfachen Recht vor (Art. 20 Abs. 3 GG) und ist nur erschwert änderbar (Art. 79 GG). Die Finanzverwaltung handelt daher rechtmäßig (Art. 108 GG).",
      ],
    },
    {
      titel: "Die fünf Staatsstrukturprinzipien",
      sv: "Nennen Sie die Staatsformmerkmale der Bundesrepublik mit Fundstelle und erklären Sie, wie sie geschützt sind.",
      loesung: [
        "Art. 20 Abs. 1 GG: Die Bundesrepublik ist **Republik, Demokratie, Sozialstaat** und **Bundesstaat**; das **Rechtsstaatsprinzip** folgt aus Art. 20 Abs. 2 S. 2 und Abs. 3 GG (ausdrücklich genannt in Art. 28 Abs. 1 S. 1 GG).",
        "Sie sind durch die Ewigkeitsklausel geschützt (Art. 79 Abs. 3 GG) und gelten über das Homogenitätsprinzip auch für die Länder (Art. 28 Abs. 1 S. 1 GG).",
      ],
    },
  ],

  "oer-republik": [
    {
      titel: "Monarchie im Bundesland",
      sv: "Ein Stadtstaat will in seine Landesverfassung aufnehmen, dass künftig ein „Landesfürst“ an der Spitze steht und das Amt auf den ältesten Nachkommen übergeht.",
      aufgabe: "Ist die Änderung mit dem Grundgesetz vereinbar?",
      loesung: [
        "Republik bedeutet, dass das Staatsoberhaupt nicht durch Erbfolge, sondern auf Zeit gewählt wird (Art. 20 Abs. 1 GG). Daran sind auch die Länder gebunden (Homogenitätsprinzip, Art. 28 Abs. 1 S. 1 GG).",
        "Ein erbliches Staatsoberhaupt ist damit unvereinbar. Die Landesverfassungsnorm ist nichtig (Art. 31 GG).",
      ],
    },
    {
      titel: "Begriffe den Prinzipien zuordnen",
      sv: "Ordnen Sie zu: Grundfreibetrag, Bundesversammlung, Bundesrat, 5-%-Sperrklausel, Gesetzesvorbehalt, Verfassungsbeschwerde.",
      loesung: [
        "Grundfreibetrag → **Sozialstaat** (Art. 20 Abs. 1 GG): Das Existenzminimum bleibt steuerfrei.",
        "Bundesversammlung → **Republik** (Art. 54 Abs. 1 GG): Sie wählt das Staatsoberhaupt auf Zeit.",
        "Bundesrat → **Bundesstaat** (Art. 50 GG): Die Länder wirken an Gesetzgebung und Verwaltung des Bundes mit.",
        "5-%-Sperrklausel → **Demokratie** (Art. 38 Abs. 1 S. 1 GG, § 4 Abs. 2 S. 2 Nr. 2 BWahlG): Wahlgleichheit.",
        "Gesetzesvorbehalt und Verfassungsbeschwerde → **Rechtsstaat** (Art. 20 Abs. 3 GG, Art. 94 Abs. 1 Nr. 4a GG).",
      ],
    },
  ],

  "oer-demokratie": [
    {
      titel: "Wahlperiode von acht Jahren",
      sv: "Die Regierungsfraktionen wollen Art. 39 Abs. 1 S. 1 GG ändern: Die Wahlperiode soll acht statt vier Jahre dauern. Die Zweidrittelmehrheiten in Bundestag und Bundesrat sind sicher.",
      aufgabe: "Wäre die Änderung verfassungsgemäß?",
      loesung: [
        "Formell ist die Änderung bei Zweidrittelmehrheit in Bundestag und Bundesrat möglich (Art. 79 Abs. 1, 2 GG).",
        "Fraglich ist, ob sie gegen Art. 79 Abs. 3 GG verstößt. Das Demokratieprinzip (Art. 20 Abs. 1, 2 GG) verlangt Herrschaft auf Zeit: Die Legitimation durch das Volk muss in regelmäßigen Abständen erneuert werden. Acht Jahre lockern die Rückbindung an den Wählerwillen zu stark.",
        "Die Änderung wäre verfassungswidrig.",
      ],
    },
    {
      titel: "Kann sich der Bundestag selbst auflösen?",
      sv: "Eine Abgeordnete schlägt vor, der Bundestag solle mit Zweidrittelmehrheit seine Selbstauflösung beschließen, um Neuwahlen herbeizuführen.",
      loesung: [
        "Der Bundestag hat kein Selbstauflösungsrecht. Die Legitimation durch das Volk soll nicht abgeschwächt und – anders als in Weimar – politische Stabilität gesichert werden.",
        "Aufgelöst werden kann er nur durch den Bundespräsidenten im Rahmen der Kanzlerwahl (Art. 63 Abs. 4 S. 3 GG) oder nach gescheiterter Vertrauensfrage (Art. 68 Abs. 1 S. 1 GG).",
      ],
    },
  ],

  "oer-rechtsstaat": [
    {
      titel: "Steuergesetz mit Rückwirkung – zwei Verkündungstermine",
      sv: "Ein Gesetz streicht die Steuerfreiheit von Trinkgeldern mit Wirkung ab 01.01.01. Es wird am 01.06.01 verkündet. Wegen eines Verfahrensfehlers wird es mit gleichem Inhalt erneut beschlossen und am 01.01.02 verkündet – wieder mit Wirkung ab 01.01.01.",
      aufgabe: "Sind die Gesetze wegen Rückwirkung verfassungswidrig?",
      loesung: [
        "Fraglich ist, ob die Gesetze gegen das Rechtsstaatsprinzip (Art. 20 Abs. 3 GG) verstoßen. Der Bürger darf grundsätzlich auf den Bestand der Rechtslage vertrauen.",
        "**Echte Rückwirkung** liegt vor, wenn ein abgeschlossener Sachverhalt nachträglich ungünstiger geregelt wird; sie ist nur ausnahmsweise zulässig, z. B. wenn der Bürger mit der Regelung rechnen musste. **Unechte Rückwirkung** betrifft einen begonnenen, noch nicht abgeschlossenen Sachverhalt; sie ist zulässig, wenn das Allgemeininteresse den Vertrauensschutz überwiegt.",
        "Die ESt entsteht mit Ablauf des VZ (§ 36 Abs. 1 EStG), also am 31.12.01.",
        "Gesetz vom 01.06.01: Der VZ 01 war noch nicht abgelaufen → unechte Rückwirkung. Ein schutzwürdiges Vertrauen in eine Steuervergünstigung überwiegt nicht → zulässig.",
        "Gesetz vom 01.01.02: Der VZ 01 war abgeschlossen → echte Rückwirkung. Seit dem 01.06.01 musste aber jeder mit der Regelung rechnen → ausnahmsweise zulässig (a. A. vertretbar).",
      ],
    },
    {
      titel: "Rückwirkendes Strafgesetz",
      sv: "Ein Gesetz soll Verstöße gegen eine frühere Hygienevorschrift rückwirkend für die letzten zwei Jahre mit Geldstrafe bedrohen.",
      loesung: [
        "Eine Tat kann nur bestraft werden, wenn die Strafbarkeit vor der Tat gesetzlich bestimmt war (Art. 103 Abs. 2 GG). Das Verbot gilt absolut, ohne Abwägung. Das Gesetz ist verfassungswidrig.",
      ],
    },
  ],

  "oer-bundesstaat": [
    {
      titel: "Landesverfassung mit Todesstrafe",
      sv: "Ein Land will in seine Verfassung aufnehmen: „Bei Mord im Wiederholungsfall kann die Todesstrafe verhängt werden.“",
      aufgabe: "Ist die Regelung wirksam?",
      loesung: [
        "Die Todesstrafe ist abgeschafft (Art. 102 GG). Landesrecht, auch Landesverfassungsrecht, das dem Bundesrecht widerspricht, ist nichtig (Art. 31 GG).",
      ],
    },
    {
      titel: "Zwei Länder wollen fusionieren",
      sv: "Zwei benachbarte Länder wollen sich zu einem Land zusammenschließen.",
      loesung: [
        "Art. 79 Abs. 3 GG schützt nur die Gliederung des Bundes in Länder, nicht den Bestand einzelner Länder. Eine Neugliederung ist zulässig (Art. 29 Abs. 1 GG).",
        "Die Länder können sie durch Staatsvertrag regeln, der in jedem beteiligten Land durch Volksentscheid bestätigt werden muss (Art. 29 Abs. 8 GG); alternativ durch Bundesgesetz mit Volksentscheid (Art. 29 Abs. 2, 3 GG).",
      ],
    },
  ],

  "oer-parteien": [
    {
      titel: "Stadthalle für eine unbeliebte Partei",
      sv: "Die Stadt S vermietet ihre Stadthalle regelmäßig an Parteien. Der Partei P, die vom Verfassungsschutz beobachtet, aber nicht verboten ist, verweigert sie die Halle, weil P „verfassungsfeindlich“ sei.",
      loesung: [
        "Fraglich ist, ob die Ablehnung zulässig ist. Stellt ein Träger öffentlicher Gewalt Parteien Einrichtungen zur Verfügung, sind alle Parteien gleich zu behandeln (§ 5 Abs. 1 S. 1 PartG).",
        "Über die Verfassungswidrigkeit entscheidet allein das BVerfG (Parteienprivileg, Art. 21 Abs. 4 GG). Bis dahin darf P nicht deswegen benachteiligt werden. S muss die Halle überlassen.",
      ],
    },
    {
      titel: "Spenden an eine Partei",
      sv: "Unternehmer U überweist der Partei P im März 60.000 € und im Oktober 5.000 €. Außerdem erhält P eine anonyme Barspende von 800 €.",
      aufgabe: "Welche Regelungen gelten?",
      loesung: [
        "Parteien dürfen Spenden annehmen (§ 25 Abs. 1 S. 1 PartG) und müssen über die Herkunft ihrer Mittel öffentlich Rechenschaft geben (Art. 21 Abs. 1 S. 4 GG).",
        "Die 60.000 € übersteigen 35.000 € und sind dem Bundestagspräsidenten unverzüglich anzuzeigen (§ 25 Abs. 3 S. 2 PartG). Da U im Jahr mehr als 10.000 € spendet, wird er mit Name und Anschrift im Rechenschaftsbericht genannt (§ 25 Abs. 3 S. 1 PartG).",
        "Anonyme Spenden über 500 € darf P nicht annehmen (§ 25 Abs. 2 Nr. 6 PartG); sie sind an den Bundestagspräsidenten weiterzuleiten (§ 25 Abs. 4 PartG).",
      ],
    },
  ],

  "oer-bundestag": [
    {
      titel: "Fraktion ohne Vizepräsidenten",
      sv: "In der ersten Sitzung des neuen Bundestages wird der Kandidat der A-Fraktion als einziger nicht zum Vizepräsidenten gewählt. Die A-Fraktion meint, ihr stehe ein Platz im Präsidium zu.",
      aufgabe: "a) Wie heißt die erste Sitzung und wann findet sie statt? b) Hat die A-Fraktion Recht?",
      loesung: [
        "a) Konstituierende Sitzung, spätestens am 30. Tag nach der Wahl (Art. 39 Abs. 2 GG).",
        "b) Jede Fraktion ist durch mindestens einen Vizepräsidenten vertreten (§ 2 Abs. 1 S. 2 GOBT). Die Vizepräsidenten werden aber gewählt (Art. 40 Abs. 1 S. 1 GG), und die Abgeordneten sind bei der Wahl frei (Art. 38 Abs. 1 S. 2 GG). Die Fraktion hat nur ein Vorschlagsrecht, keinen Anspruch auf die Wahl ihres Kandidaten.",
      ],
    },
    {
      titel: "Fraktionszwang per Satzung",
      sv: "Die Satzung der Partei P bestimmt: „Abgeordnete, die gegen den Beschluss der Fraktion stimmen, zahlen 5.000 € und legen ihr Mandat nieder.“",
      loesung: [
        "Abgeordnete sind an Aufträge und Weisungen nicht gebunden und nur ihrem Gewissen unterworfen (Art. 38 Abs. 1 S. 2 GG). Politischer Druck (Fraktionsdisziplin) ist zulässig, rechtlich verbindliche Sanktionen (Fraktionszwang) nicht. Die Regelung ist nichtig.",
      ],
    },
  ],

  "oer-wahl": [
    {
      titel: "Begriffe zur Bundestagswahl",
      sv: "Ist jeweils Art. 38 Abs. 1 S. 1 GG verletzt? (1) Briefwahl, (2) Veröffentlichung einer Wählerbefragung am Wahltag um 14 Uhr, (3) Rotationsprinzip einer Partei, (4) wählbar erst ab 18 Jahren.",
      loesung: [
        "(1) Briefwahl (§ 36 BWahlG) schwächt Freiheit und Geheimheit, ist aber durch die **Allgemeinheit** der Wahl gerechtfertigt → kein Verstoß.",
        "(2) Wählerbefragungen dürfen vor Ablauf der Wahlzeit nicht veröffentlicht werden (§ 32 Abs. 2 BWahlG) → Verstoß gegen die **Freiheit** der Wahl.",
        "(3) Ein Pflicht-Rücktritt zur Mitte der Wahlperiode verletzt die **Unmittelbarkeit** und das freie Mandat (Art. 38 Abs. 1 S. 2 GG) → Verstoß.",
        "(4) Die Altersgrenze steht im Grundgesetz selbst (Art. 38 Abs. 2 GG) → kein Verstoß.",
      ],
    },
    {
      titel: "Die 5-%-Hürde",
      sv: "Die Kleinpartei K erhält 4,3 % der Zweitstimmen und zwei Wahlkreise. Sie hält die Sperrklausel für verfassungswidrig.",
      loesung: [
        "Parteien unter 5 % werden bei der Sitzverteilung nicht berücksichtigt (§ 4 Abs. 2 S. 2 Nr. 2 BWahlG); eine Ausnahme gilt für nationale Minderheiten (§ 4 Abs. 2 S. 3 BWahlG) und – nach dem BVerfG (2024) – bei mindestens drei Direktmandaten. K hat nur zwei.",
        "Die Klausel beschränkt die **Wahlgleichheit** (Art. 38 Abs. 1 S. 1 GG), ist aber zur Sicherung der Funktionsfähigkeit des Parlaments gerechtfertigt. K erhält keine Sitze.",
      ],
    },
  ],

  "oer-bundesrat": [
    {
      titel: "Uneinheitliche Stimmabgabe",
      sv: "Im Bundesrat ruft die Präsidentin Land L (4 Stimmen) auf. Minister M antwortet „Ja“, Ministerin N gleichzeitig „Nein“. Der Ministerpräsident sagt danach „Ja“. Die Präsidentin wertet vier Ja-Stimmen.",
      loesung: [
        "Die Stimmen eines Landes können nur einheitlich abgegeben werden (Art. 51 Abs. 3 S. 2 GG). Der Widerspruch kann nicht nachträglich durch den Ministerpräsidenten aufgelöst werden. Die Stimmen von L sind ungültig; die Wertung als Ja war fehlerhaft.",
      ],
    },
    {
      titel: "Abstimmung über ein Zustimmungsgesetz",
      sv: "Über ein zustimmungsbedürftiges Steuergesetz stimmen im Bundesrat 34 Stimmen mit Ja, 20 mit Nein; 15 enthalten sich.",
      loesung: [
        "Erforderlich ist die Mehrheit der Stimmen des Bundesrates (Art. 52 Abs. 3 S. 1 GG), also 35 von 69. Enthaltungen wirken wie Nein-Stimmen. Mit 34 Stimmen ist die Zustimmung nicht erteilt; das Gesetz kommt nicht zustande (Art. 78 GG).",
      ],
    },
  ],

  "oer-bundespraesident": [
    {
      titel: "Muss der Bundespräsident das Gesetz unterschreiben?",
      sv: "Bundestag und Bundesrat haben ein Gesetz beschlossen, das Verstöße der letzten zwei Jahre rückwirkend unter Strafe stellt. Bundespräsident P hält es für verfassungswidrig.",
      aufgabe: "Muss P das Gesetz ausfertigen?",
      loesung: [
        "P fertigt die „nach den Vorschriften dieses Grundgesetzes zustande gekommenen“ Gesetze aus (Art. 82 Abs. 1 S. 1 GG). Aus dem Wortlaut folgt ein formelles Prüfungsrecht. Ein materielles Prüfungsrecht hat er nach h. M. nur bei offenkundigen Verstößen; im Übrigen ist die Verwerfung dem BVerfG vorbehalten (Art. 100 Abs. 1 GG).",
        "Rückwirkende Strafgesetze verbietet Art. 103 Abs. 2 GG ausnahmslos – der Verstoß ist offenkundig. P darf die Ausfertigung verweigern.",
      ],
    },
    {
      titel: "Wahl und Wählbarkeit",
      sv: "Für das Amt des Bundespräsidenten werden (a) eine 38-jährige Abgeordnete und (b) der amtierende Präsident vorgeschlagen, der seit zehn Jahren im Amt ist.",
      loesung: [
        "Der Bundespräsident wird von der Bundesversammlung gewählt (Art. 54 Abs. 1 S. 1 GG).",
        "(a) Wählbar ist nur, wer das 40. Lebensjahr vollendet hat (Art. 54 Abs. 1 S. 2 GG) → nicht wählbar.",
        "(b) Anschließende Wiederwahl ist nur einmal zulässig (Art. 54 Abs. 2 GG) → nach zwei Amtszeiten ausgeschlossen.",
      ],
    },
  ],

  "oer-bundesregierung": [
    {
      titel: "Streit zwischen zwei Ministern",
      sv: "Gesundheitsminister G will einen Gesetzentwurf einbringen, den Justizministerin J für verfassungswidrig hält.",
      aufgabe: "Welche Prinzipien gelten und wie wird der Konflikt gelöst?",
      loesung: [
        "Der Kanzler bestimmt die Richtlinien der Politik (Kanzlerprinzip, Art. 65 S. 1 GG). Innerhalb dieser leitet jeder Minister sein Ressort selbständig (Ressortprinzip, Art. 65 S. 2 GG).",
        "Über Meinungsverschiedenheiten zwischen Ministern entscheidet die Bundesregierung (Kollegialprinzip, Art. 65 S. 3 GG).",
      ],
    },
    {
      titel: "Misstrauensvotum gegen eine Ministerin",
      sv: "Der Bundestag beschließt: „Der Bundestag spricht der Bundesministerin M das Misstrauen aus. Sie hat zurückzutreten.“",
      loesung: [
        "Fraglich ist, ob der Bundestag eine Ministerin abberufen kann. Das Misstrauen kann er nur dem Bundeskanzler aussprechen, indem er einen Nachfolger wählt (Art. 67 Abs. 1 S. 1 GG). Minister werden auf Vorschlag des Kanzlers ernannt und entlassen (Art. 64 Abs. 1 GG).",
        "Eine Rücktrittspflicht kann der Bundestag nicht begründen; als bloße politische Missbilligung ist der Beschluss zulässig.",
      ],
    },
    {
      titel: "Kanzlerwahl",
      sv: "Der Bundestag hat 630 Mitglieder. Der vom Bundespräsidenten vorgeschlagene K erhält 312 Stimmen. Zwölf Tage später erhält L 314 Stimmen, im nächsten Wahlgang 318.",
      loesung: [
        "1. Wahlgang: Erforderlich ist die Mehrheit der Mitglieder, 316 Stimmen (Art. 63 Abs. 2 S. 1 GG, Art. 121 GG) → K nicht gewählt.",
        "2. Phase: Binnen 14 Tagen ebenfalls Mehrheit der Mitglieder (Art. 63 Abs. 3 GG) → L mit 314 nicht gewählt.",
        "3. Phase: Gewählt ist, wer die meisten Stimmen erhält (Art. 63 Abs. 4 S. 1 GG). L hat mit 318 sogar die Mehrheit der Mitglieder; der Bundespräsident muss ihn binnen sieben Tagen ernennen (Art. 63 Abs. 4 S. 2 GG).",
      ],
    },
  ],

  "oer-bverfg": [
    {
      titel: "Welches Verfahren?",
      sv: "(a) Eine Fraktion meint, die Bundesregierung verletze das Fragerecht des Bundestages. (b) 170 der 630 Abgeordneten halten ein Gesetz für verfassungswidrig. (c) Ein Finanzgericht hält eine entscheidungserhebliche Steuernorm für verfassungswidrig. (d) Eine Steuerpflichtige sieht sich durch ein BFH-Urteil in ihren Grundrechten verletzt.",
      loesung: [
        "(a) Organstreit (Art. 94 Abs. 1 Nr. 1 GG).",
        "(b) Abstrakte Normenkontrolle auf Antrag eines Viertels der Mitglieder (Art. 94 Abs. 1 Nr. 2 GG) – mindestens 158; 170 genügen.",
        "(c) Konkrete Normenkontrolle: Das Gericht setzt aus und legt dem BVerfG vor (Art. 100 Abs. 1 GG).",
        "(d) Verfassungsbeschwerde (Art. 94 Abs. 1 Nr. 4a GG); der Rechtsweg ist mit dem BFH-Urteil erschöpft (Art. 93 Abs. 5 S. 2 GG).",
      ],
    },
    {
      titel: "Richterwahl",
      sv: "Ein Richter des BVerfG ist 66 Jahre alt und seit acht Jahren im Amt. Die Regierungsfraktionen wollen ihn nach Ablauf seiner Amtszeit erneut wählen.",
      loesung: [
        "Die Amtszeit dauert zwölf Jahre, längstens bis zur Altersgrenze von 68 (Art. 93 Abs. 3 S. 1 GG). Eine Wiederwahl ist ausgeschlossen (Art. 93 Abs. 3 S. 3 GG).",
      ],
    },
  ],

  "oer-gesetzgebung": [
    {
      titel: "Wer darf das Gesetz erlassen?",
      sv: "Wer hat die Gesetzgebungskompetenz für (1) ein Schulgesetz, (2) eine Bundesstatistik, (3) ein Pflanzenschutzgesetz?",
      loesung: [
        "Grundsätzlich die Länder, soweit das Grundgesetz nicht dem Bund Befugnisse verleiht (Art. 70 Abs. 1 GG).",
        "(1) Keine Zuweisung in Art. 73, 74 GG → Länder (Art. 70 Abs. 1 GG).",
        "(2) Ausschließliche Kompetenz des Bundes (Art. 71 i. V. m. Art. 73 Abs. 1 Nr. 11 GG).",
        "(3) Konkurrierende Kompetenz (Art. 72 i. V. m. Art. 74 Abs. 1 Nr. 20 GG); der Bund muss die Erforderlichkeit nach Art. 72 Abs. 2 GG darlegen – bei bundeseinheitlicher Zulassung von Pflanzenschutzmitteln zu bejahen.",
      ],
    },
    {
      titel: "Einspruchsgesetz",
      sv: "Der Bundesrat legt gegen ein nicht zustimmungsbedürftiges Gesetz nach erfolglosem Vermittlungsverfahren mit 40 von 69 Stimmen Einspruch ein.",
      aufgabe: "Kann das Gesetz trotzdem zustande kommen?",
      loesung: [
        "Ja. Ein mit der Mehrheit des Bundesrates beschlossener Einspruch kann vom Bundestag mit der Mehrheit seiner Mitglieder – 316 Stimmen – zurückgewiesen werden (Art. 77 Abs. 4 S. 1 GG). Dann ist das Gesetz zustande gekommen (Art. 78 GG).",
      ],
    },
    {
      titel: "Kompetenz für ein Einkommensteuergesetz",
      sv: "Der Bund will den Einkommensteuertarif ändern. Ein Land meint, Steuern seien Ländersache.",
      loesung: [
        "Ein Zoll oder Finanzmonopol (Art. 105 Abs. 1 GG) liegt nicht vor. Fraglich ist, ob eine konkurrierende Kompetenz nach Art. 105 Abs. 2 S. 2 Alt. 1 GG besteht. Die ESt ist eine Gemeinschaftsteuer (Art. 106 Abs. 3 S. 1 GG) und steht dem Bund teilweise zu → der Bund ist zuständig.",
        "Weil das Aufkommen auch den Ländern zufließt, braucht das Gesetz die Zustimmung des Bundesrates (Art. 105 Abs. 3 GG).",
      ],
    },
  ],
};
