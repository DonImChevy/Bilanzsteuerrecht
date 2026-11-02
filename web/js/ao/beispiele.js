// Klausurbeispiele Abgabenordnung: eigener Sachverhalt im Klausurstil und knappe Musterlösung – jede Aussage mit
// tragender Norm, Fallfragen mit kurzem Obersatz („… könnte …“). Kein Klausurtext übernommen; Rechtsstand 2026.
// Format: { titel, sv, aufgabe, loesung: [Absätze] }.

export const BEISPIELE_AO = {
  "ao-grundlagen": [
    {
      titel: "Steuer oder nicht?",
      sv: "Die Gemeinde Seedorf verlangt (1) von jedem Hundehalter jährlich 80 €, (2) für die Ausstellung eines Personalausweises 37 € und (3) von allen Anliegern einer neu gebauten Straße einen Erschließungsbeitrag. Das Finanzamt setzt gegen eine Bürgerin außerdem (4) einen Verspätungszuschlag fest.",
      aufgabe: "Ordnen Sie die Abgaben ein.",
      loesung: [
        "(1) Steuer gem. § 3 Abs. 1 AO, da eine Geldleistung ohne Gegenleistung allen Hundehaltern zur Einnahmeerzielung auferlegt wird.",
        "(2) Gebühr, keine Steuer (§ 3 Abs. 1 AO), da sie Gegenleistung für eine besondere Leistung der Verwaltung ist.",
        "(3) Beitrag, keine Steuer, da er für die Bereitstellung einer Einrichtung unabhängig von der tatsächlichen Nutzung erhoben wird.",
        "(4) Steuerliche Nebenleistung gem. § 3 Abs. 4 Nr. 2 AO, keine Steuer.",
      ],
    },
  ],
  "ao-steuergeheimnis": [
    {
      titel: "Der redselige Prüfer",
      sv: "Betriebsprüfer Paul (Beamter) prüft die Bäckerei B. In der Kantine erzählt er seiner Kollegin Klara, B habe 300.000 € Umsatz. Klara erzählt es abends ihrer Nachbarin. Außerdem schickt Paul eine Kontrollmitteilung über Barzahlungen eines Mehllieferanten an dessen Finanzamt.",
      aufgabe: "Haben Paul und Klara das Steuergeheimnis verletzt?",
      loesung: [
        "Paul könnte das Steuergeheimnis nach § 30 Abs. 1 AO verletzt haben. Er ist als Beamter Amtsträger (§ 7 Nr. 1 AO). Der Umsatz ist ein Betriebs- und Geschäftsgeheimnis bzw. personenbezogenes Datum (§ 30 Abs. 2 Nr. 1, 2 AO), das ihm in der Außenprüfung dienstlich bekannt wurde (§ 30 Abs. 2 Nr. 1 a AO). Durch die Erzählung an Klara offenbart er es; eine Befugnis nach § 30 Abs. 4 AO besteht nicht → Verletzung.",
        "Klara ist Amtsträgerin, hat die Information aber nicht in einem Verfahren, sondern privat in der Kantine erfahren → nicht dienstlich, keine Verletzung des § 30 AO.",
        "Die Kontrollmitteilung dient der Durchführung eines Verwaltungsverfahrens in Steuersachen → befugt nach § 30 Abs. 4 Nr. 1 AO.",
      ],
    },
  ],
  "ao-beteiligte": [
    {
      titel: "Die minderjährige Onlinehändlerin",
      sv: "Die 17-jährige Lina betreibt mit Genehmigung des Familiengerichts einen Onlineshop. Sie reicht selbst die Umsatzsteuer-Voranmeldungen und ihre Einkommensteuererklärung ein. Ihre Eltern haben Steuerberaterin S bevollmächtigt; die Vollmacht enthält nichts zum Empfang von Geld.",
      aufgabe: "Beurteilen Sie die Verfahrenshandlungen und die Erstattung einer Einkommensteuer an S.",
      loesung: [
        "Für die Umsatzsteuer ist Lina handlungsfähig gem. § 79 Abs. 1 Nr. 2 AO i. V. m. § 112 BGB, da das genehmigte Erwerbsgeschäft die betrieblichen Steuern umfasst → wirksame Voranmeldungen.",
        "Für die Einkommensteuer ist sie nicht handlungsfähig, da diese auch außerbetriebliche Verhältnisse erfasst; ihre Eltern haben als gesetzliche Vertreter die Pflichten zu erfüllen (§ 34 Abs. 1 AO).",
        "Eine Erstattung darf nicht an S geleistet werden, da die Vollmacht nicht zum Empfang von Steuererstattungen ermächtigt (§ 80 Abs. 1 S. 2 AO).",
      ],
    },
  ],
  "ao-ermittlung": [
    {
      titel: "Die Schwester als Zeugin",
      sv: "Das Finanzamt bezweifelt, dass Vermieter V die Miete seiner Ferienwohnung vollständig erklärt hat. Ohne V zu fragen, schreibt es Vs Schwester S an, die die Wohnung verwaltet, und bittet um Auskunft über alle Buchungen. S antwortet sofort; über ein Verweigerungsrecht wurde sie nicht belehrt.",
      aufgabe: "Beurteilen Sie das Vorgehen.",
      loesung: [
        "Andere Personen als der Beteiligte sollen erst gefragt werden, wenn die Aufklärung durch ihn nicht zum Ziel führt (§ 93 Abs. 1 S. 3 AO). Das Finanzamt hätte zuerst V fragen müssen → das Ersuchen ist rechtswidrig.",
        "S ist als Schwester Angehörige (§ 15 Abs. 1 Nr. 4 AO) und durfte die Auskunft verweigern (§ 101 Abs. 1 S. 1 AO); sie war zu belehren (§ 101 Abs. 1 S. 2 AO). Ohne Belehrung ist ihre Auskunft nicht verwertbar.",
      ],
    },
  ],
  "ao-erklaerung": [
    {
      titel: "Verspätungszuschlag berechnen",
      sv: "Die nicht beratene Steuerpflichtige T gibt ihre Einkommensteuererklärung 2025 am 20.11.2026 ab. Festgesetzte Einkommensteuer 12.400 €, Vorauszahlungen 4.000 €, anzurechnende Lohnsteuer 2.400 €. Gründe für die Verspätung sind nicht vorgetragen; das Finanzamt übt sein Ermessen dahin aus, einen Zuschlag festzusetzen.",
      aufgabe: "Ermitteln Sie den Verspätungszuschlag.",
      loesung: [
        "Abgabefrist 31.07.2026 (§ 149 Abs. 2 S. 1 AO). Abgabe innerhalb von 14 Monaten → kein Muss-Zuschlag, Ermessen nach § 152 Abs. 1 AO.",
        "Verspätung: August bis November 2026 = 4 angefangene Monate.",
        "Bemessungsgrundlage: 12.400 € − 4.000 € − 2.400 € = 6.000 € (§ 152 Abs. 5 S. 2 AO); 0,25 % = 15 € je Monat, Mindestbetrag 25 € je Monat greift.",
        "4 × 25 € = 100 € Verspätungszuschlag (§ 152 Abs. 5 S. 2, Abs. 10 AO).",
      ],
    },
  ],
  "ao-zwang": [
    {
      titel: "Zwangsgeld für zwei Erklärungen",
      sv: "Unternehmer U hat weder die Einkommensteuer- noch die Umsatzsteuererklärung 2024 abgegeben. Das Finanzamt fordert ihn auf, beide binnen eines Monats abzugeben, und droht „ein Zwangsgeld von 600 €“ an. Nach Fristablauf setzt es 600 € fest; zwei Tage später reicht U beide Erklärungen ein.",
      aufgabe: "Beurteilen Sie Androhung und Festsetzung.",
      loesung: [
        "Die Androhung muss für jede einzelne Verpflichtung getrennt ergehen (§ 332 Abs. 2 S. 2 AO). Ein Gesamtbetrag für zwei Erklärungen ist unzulässig → die Androhung ist unwirksam, die darauf gestützte Festsetzung (§ 333 AO) rechtswidrig.",
        "Selbst bei wirksamer Androhung wäre der Vollzug nach Abgabe der Erklärungen einzustellen (§ 335 AO).",
      ],
    },
  ],
  "ao-va": [
    {
      titel: "Verwaltungsakt oder nicht?",
      sv: "(1) Die Sachgebietsleiterin weist Sachbearbeiter S an, im Fall K die Arbeitsmittel zu kürzen. (2) S kürzt die Arbeitsmittel im Einkommensteuerbescheid des K. (3) Auf Antrag verlängert S die Frist für die Erklärung des L bis 30.09., „sofern bis dahin die Belege vorliegen“.",
      aufgabe: "Liegen Verwaltungsakte vor? Welche Nebenbestimmung enthält (3)?",
      loesung: [
        "(1) Keine Außenwirkung, da innerdienstliche Weisung → kein Verwaltungsakt (§ 118 S. 1 AO).",
        "(2) Hoheitliche Regelung eines Einzelfalls mit Außenwirkung → Verwaltungsakt (§ 118 S. 1 AO), und zwar Steuerbescheid (§ 155 Abs. 1 AO).",
        "(3) Verwaltungsakt (§ 118 S. 1 AO); die Verlängerung ist eine Ermessensentscheidung (§ 109 Abs. 1 AO). Ihr Bestand hängt vom ungewissen Vorliegen der Belege ab → Bedingung (§ 120 Abs. 2 Nr. 2 AO).",
      ],
    },
  ],
  "ao-wirksamkeit": [
    {
      titel: "Bescheid aus dem falschen Finanzamt",
      sv: "Ida wohnt in Kiel. Das Finanzamt Neumünster erlässt ihren Einkommensteuerbescheid; inhaltlich ist er richtig. Ein zweiter Bescheid über einen Verspätungszuschlag (Ermessensentscheidung) stammt ebenfalls vom Finanzamt Neumünster. Ida legt gegen beide Einspruch ein, gestützt nur auf die Unzuständigkeit.",
      aufgabe: "Haben die Einsprüche Erfolg?",
      loesung: [
        "Zuständig ist das Wohnsitzfinanzamt Kiel (§ 19 Abs. 1 S. 1 AO). Die Bescheide sind deshalb rechtswidrig, aber nicht nichtig (§ 125 Abs. 3 Nr. 1 AO) und damit wirksam (§ 124 Abs. 2 AO).",
        "Steuerbescheid: gebundene Entscheidung, in der Sache wäre nichts anderes festgesetzt worden → keine Aufhebung (§ 127 AO), Einspruch erfolglos.",
        "Verspätungszuschlag: Ermessensentscheidung, das zuständige Finanzamt hätte anders entscheiden können → § 127 AO greift nicht, Aufhebung.",
      ],
    },
  ],
  "ao-bekanntgabe": [
    {
      titel: "Bescheid an die Erbin",
      sv: "Rentner Rolf ist im März 2026 verstorben; Alleinerbin ist seine Tochter Tanja. Das Finanzamt erlässt im Juni 2026 den Einkommensteuerbescheid 2025 für Rolf und gibt ihn am Donnerstag, 11.06.2026, zur Post.",
      aufgabe: "An wen ist der Bescheid zu richten, und wann wird er bekannt gegeben?",
      loesung: [
        "Die Steuerschuld des Rolf ist auf Tanja übergegangen (§ 45 Abs. 1 S. 1 AO). Der Bescheid ist an Tanja als Inhaltsadressatin zu richten mit dem Hinweis, dass er an sie als Gesamtrechtsnachfolgerin des Rolf ergeht (§ 122 Abs. 1 S. 1 AO).",
        "Er gilt am vierten Tag nach Aufgabe zur Post als bekannt gegeben (§ 122 Abs. 2 Nr. 1 AO) = Montag, 15.06.2026.",
      ],
    },
  ],
  "ao-vorbehalt": [
    {
      titel: "Voranmeldung mit Erstattung",
      sv: "Unternehmerin U reicht am 08.05.2026 ihre Umsatzsteuer-Voranmeldung April ein; wegen einer großen Investition ergibt sich ein Erstattungsbetrag von 4.000 €. Das Finanzamt überweist den Betrag am 20.05.2026 ohne weiteres Schreiben.",
      aufgabe: "Welche Wirkung hat die Voranmeldung, und bis wann kann U Einspruch einlegen?",
      loesung: [
        "Die Voranmeldung ist eine Steueranmeldung (§ 150 Abs. 1 S. 3 AO). Da sie zu einer Erstattung führt, steht sie erst mit Zustimmung des Finanzamts einer Festsetzung unter Vorbehalt der Nachprüfung gleich (§ 168 S. 2 AO).",
        "Die Zustimmung ist formfrei (§ 168 S. 3 AO) und liegt in der Auszahlung; mit ihrem Bekanntwerden beginnt die Einspruchsfrist von einem Monat (§ 355 Abs. 1 S. 2 AO).",
        "Die Festsetzung bleibt als Vorauszahlung unter Vorbehalt jederzeit änderbar (§ 164 Abs. 1 S. 2, Abs. 2 AO).",
      ],
    },
  ],
  "ao-feststellung": [
    {
      titel: "Gewürzhändler mit Mietshaus",
      sv: "Otto wohnt in Bremen. Er betreibt als Einzelunternehmer einen Gewürzhandel in Verden (anderer Finanzamtsbezirk) und vermietet allein ein Mehrfamilienhaus in Syke. Außerdem ist er an der Hansa OHG beteiligt.",
      aufgabe: "Welche Einkünfte werden gesondert festgestellt?",
      loesung: [
        "Gewürzhandel: Gewinneinkünfte einer Person; das Betriebsfinanzamt Verden (§ 18 Abs. 1 Nr. 2 AO) ist nicht zugleich Wohnsitzfinanzamt (§ 19 Abs. 1 AO) → gesonderte Feststellung gem. § 180 Abs. 1 S. 1 Nr. 2 b AO.",
        "Vermietung: Überschusseinkünfte einer Person → keine gesonderte Feststellung, Erfassung im Einkommensteuerbescheid (§ 157 Abs. 2 AO).",
        "OHG: Einkünfte, an denen mehrere beteiligt sind → gesonderte und einheitliche Feststellung (§ 179 Abs. 2 S. 2, § 180 Abs. 1 S. 1 Nr. 2 a AO); der Feststellungsbescheid bindet Ottos Einkommensteuerbescheid (§ 182 Abs. 1 AO).",
      ],
    },
  ],
  "ao-zustaendigkeit": [
    {
      titel: "Wer ist zuständig?",
      sv: "Die Nord GmbH hat laut Satzung ihren Sitz in Hamburg; die Geschäftsführerin leitet das Unternehmen aber ausschließlich von Lübeck aus, wo auch die Buchhaltung sitzt. Die Geschäftsführerin selbst wohnt in Bad Oldesloe.",
      aufgabe: "Welches Finanzamt ist für die Körperschaftsteuer und die Umsatzsteuer der GmbH sowie für die Einkommensteuer der Geschäftsführerin zuständig?",
      loesung: [
        "Körperschaftsteuer: Finanzamt der Geschäftsleitung (§ 20 Abs. 1 AO), also Lübeck, da dort der Mittelpunkt der geschäftlichen Oberleitung liegt (§ 10 AO); der Satzungssitz (§ 11 AO) ist nachrangig.",
        "Umsatzsteuer: Lübeck, da das Unternehmen von dort aus betrieben wird (§ 21 Abs. 1 AO).",
        "Einkommensteuer der Geschäftsführerin: Wohnsitzfinanzamt Bad Oldesloe (§ 19 Abs. 1 S. 1 AO).",
      ],
    },
  ],
  "ao-fristen": [
    {
      titel: "Einspruchsfrist mit Feiertag",
      sv: "Der Einkommensteuerbescheid 2025 von Emma wird am Mittwoch, 22.04.2026, im Inland zur Post gegeben. Emma legt am 27.05.2026 Einspruch ein.",
      aufgabe: "Ist der Einspruch fristgerecht?",
      loesung: [
        "Bekanntgabe am vierten Tag nach Aufgabe zur Post (§ 122 Abs. 2 Nr. 1 AO) = Sonntag, 26.04.2026 → nächster Werktag Montag, 27.04.2026 (§ 108 Abs. 3 AO entsprechend).",
        "Einspruchsfrist ein Monat (§ 355 Abs. 1 S. 1 AO); Beginn 28.04.2026, 0 Uhr (§ 108 Abs. 1 AO i. V. m. § 187 Abs. 1 BGB), Ende Mittwoch, 27.05.2026, 24 Uhr (§ 188 Abs. 2 BGB).",
        "Der Einspruch am 27.05.2026 ist fristgerecht.",
      ],
    },
  ],
  "ao-erhebung": [
    {
      titel: "Säumniszuschläge",
      sv: "Die Einkommensteuer-Abschlusszahlung von Malte über 4.560 € ist am Mittwoch, 10.06.2026, fällig. Malte überweist; die Zahlung gilt am Mittwoch, 09.09.2026, als entrichtet.",
      aufgabe: "Berechnen Sie die Säumniszuschläge.",
      loesung: [
        "Nicht bis zum Ablauf des Fälligkeitstags entrichtet → Säumniszuschläge gem. § 240 Abs. 1 S. 1 AO; die Schonfrist (§ 240 Abs. 3 AO) ist überschritten.",
        "Angefangene Monate: 11.06.–10.07., 11.07.–10.08., 11.08.–10.09. = 3.",
        "Rückstand abgerundet auf volle 50 €: 4.550 € → 3 × 1 % × 4.550 € = 136,50 €.",
      ],
    },
  ],
};
