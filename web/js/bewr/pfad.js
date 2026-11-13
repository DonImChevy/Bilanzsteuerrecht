// Lernpfad Bewertungsrecht und Vermögensbesteuerung: ein Block je Thema, jeder in sich geschlossen – die Lernkarten
// erklären alles, was die Fragen abfragen. Reihenfolge wie der Lehrplan (Erbschaftsteuer, dann Bewertungsrecht bis § 198 BewG).
// Format wie js/pr/pfad.js. Rechtsstand 2026.

export const PFAD_BEWR = [
  {
    id: "bew-p-vorgaenge", titel: "Was wird besteuert?", kurz: "§§ 1, 3, 7 ErbStG", icon: "🎁", normen: ["ErbStG 1 1", "ErbStG 3 1", "ErbStG 7 1"],
    karten: [
      { art: "merksatz", titel: "Ein Gesetz, zwei Wege", text: "Die Erbschaftsteuer erfasst den **Erwerb von Todes wegen** und die **Schenkung unter Lebenden** (§ 1 Abs. 1 ErbStG). Was für Erbfälle gilt, gilt grundsätzlich auch für Schenkungen (§ 1 Abs. 2 ErbStG) – sonst könnte man sein Vermögen kurz vor dem Tod steuerfrei verschenken." },
      { art: "erklaerung", titel: "Erwerbe von Todes wegen", text: "• **Erbanfall** – der Erbe tritt in alles ein (§ 1922 BGB)\n• **Vermächtnis** – Anspruch auf einen bestimmten Gegenstand\n• **Pflichtteil** – aber nur, wenn er **geltend gemacht** wird\n• **Vertrag zugunsten Dritter** – z. B. Lebensversicherung an den Bezugsberechtigten (§ 3 Abs. 1 Nr. 4 ErbStG)" },
      { art: "erklaerung", titel: "Die freigebige Zuwendung", text: "Schenkung im Sinne des § 7 Abs. 1 Nr. 1 ErbStG: Der Beschenkte wird **auf Kosten** des Schenkers **bereichert**, und der Schenker will **unentgeltlich** geben. Bei einer Gegenleistung zählt nur die Bereicherung." },
      { art: "klausur", titel: "Für jeden einzeln", text: "Die Erbschaftsteuer ist eine **Erbanfallsteuer**: Jeder Erwerber hat seine eigene Steuerklasse, seinen eigenen Freibetrag und seinen eigenen Steuersatz." },
    ],
    fragen: [
      { art: "wahl", frage: "Die enterbte Tochter verlangt ihren Pflichtteil nicht. Folge?", optionen: ["Kein steuerpflichtiger Erwerb", "Erwerb von Todes wegen", "Schenkung unter Lebenden", "Erwerb erst nach drei Jahren"], richtig: 0, erkl: "Nur der geltend gemachte Pflichtteil ist ein Erwerb (§ 3 Abs. 1 Nr. 1 ErbStG)." },
      { art: "wahl", frage: "Die Lebensversicherung des Erblassers wird an seine Lebensgefährtin ausgezahlt. Welche Vorschrift?", optionen: ["§ 3 Abs. 1 Nr. 4 ErbStG", "§ 7 Abs. 1 Nr. 1 ErbStG", "§ 13 Abs. 1 Nr. 14 ErbStG", "Nicht steuerbar"], richtig: 0, erkl: "Vermögensvorteil aus einem Vertrag des Erblassers, den ein Dritter bei dessen Tod unmittelbar erwirbt." },
      { art: "wahl", frage: "Eine Mutter verkauft ihrem Sohn ihr Auto zum Marktpreis. Schenkung?", optionen: ["Nein – keine Bereicherung", "Ja, immer unter Verwandten", "Ja, wenn der Preis bar gezahlt wird", "Nur bei Sohn unter 18"], richtig: 0, erkl: "Voll entgeltlich – § 7 Abs. 1 Nr. 1 ErbStG setzt eine Bereicherung voraus." },
    ],
  },
  {
    id: "bew-p-pflicht", titel: "Wer ist in Deutschland steuerpflichtig?", kurz: "§ 2 ErbStG · § 121 BewG", icon: "🌍", normen: ["ErbStG 2 1", "BewG 121"],
    karten: [
      { art: "merksatz", titel: "Einer genügt", text: "**Unbeschränkt** steuerpflichtig ist der **ganze** Erwerb, wenn der Erblasser, der Schenker **oder** der Erwerber Inländer ist (§ 2 Abs. 1 Nr. 1 ErbStG)." },
      { art: "erklaerung", titel: "Wer ist Inländer?", text: "• Wer im Inland **wohnt** (§ 8 AO) oder sich **gewöhnlich aufhält** (§ 9 AO)\n• **Deutsche**, die seit **höchstens fünf Jahren** im Ausland leben und keinen inländischen Wohnsitz haben\n• Körperschaften mit Sitz oder Geschäftsleitung im Inland" },
      { art: "erklaerung", titel: "Sonst: nur Inlandsvermögen", text: "Ist niemand Inländer, besteht **beschränkte** Steuerpflicht für **Inlandsvermögen** nach § 121 BewG (§ 2 Abs. 1 Nr. 3 ErbStG): z. B. inländische Grundstücke, Betriebsvermögen, Anteile an inländischen Kapitalgesellschaften ab **10 %** – aber **kein** gewöhnliches Bankguthaben." },
      { art: "beispiel", titel: "Drei Kurzfälle", text: "• Erblasserin in Hamburg, Erbe in Kalifornien → unbeschränkt\n• Deutscher seit 3 Jahren in Wien schenkt einer Österreicherin → unbeschränkt (Fünfjahresfrist)\n• Kanadier vererbt Kanadier ein Berliner Mietshaus → beschränkt, nur das Haus" },
    ],
    fragen: [
      { art: "wahl", frage: "Spanier (Madrid) schenkt seiner Nichte in Köln eine Wohnung auf Mallorca. Steuerpflicht in Deutschland?", optionen: ["Unbeschränkt", "Beschränkt", "Keine"], richtig: 0, erkl: "Die Erwerberin ist Inländerin → unbeschränkt, auch für die spanische Wohnung." },
      { art: "wahl", frage: "Wie lange bleibt ein ausgewanderter Deutscher ohne inländischen Wohnsitz Inländer?", optionen: ["Fünf Jahre", "Zehn Jahre", "Ein Jahr", "Für immer"], richtig: 0, erkl: "§ 2 Abs. 1 Nr. 1 S. 2 Buchst. b ErbStG." },
      { art: "wahl", frage: "Gehört ein Sparguthaben bei einer Münchener Bank zum Inlandsvermögen nach § 121 BewG?", optionen: ["Nein", "Ja, immer", "Nur über 50.000 €", "Nur bei deutschen Erben"], richtig: 0, erkl: "Gewöhnliche Bankguthaben fallen unter keine Nummer des § 121 BewG." },
    ],
  },
  {
    id: "bew-p-stichtag", titel: "Wann entsteht die Steuer?", kurz: "§§ 9, 11 ErbStG", icon: "📅", normen: ["ErbStG 9 1", "ErbStG 11"],
    karten: [
      { art: "merksatz", titel: "Tod oder Ausführung", text: "Erbfall: Steuer entsteht mit dem **Tod** (§ 9 Abs. 1 Nr. 1 ErbStG). Schenkung: mit der **Ausführung** der Zuwendung (§ 9 Abs. 1 Nr. 2 ErbStG). Dieser Tag ist zugleich **Bewertungsstichtag** (§ 11 ErbStG)." },
      { art: "erklaerung", titel: "Sonderfälle", text: "• **Pflichtteil:** erst mit der Geltendmachung\n• **Bedingung, Befristung:** mit deren Eintritt\n• **Grundstücksschenkung:** sobald **Auflassung** und **Eintragungsbewilligung** vorliegen – nicht erst bei Eintragung" },
      { art: "erklaerung", titel: "Stichtagsprinzip", text: "Maßgebend sind die Werte **am Stichtag**. Was danach passiert – Kurssturz, Mieterhöhung, Brand – ändert den Wert nicht." },
    ],
    fragen: [
      { art: "wahl", frage: "Tod am 14.03., Erbschein am 20.05., Steuererklärung am 01.08. Stichtag?", optionen: ["14.03.", "20.05.", "01.08.", "31.12."], richtig: 0, erkl: "§ 9 Abs. 1 Nr. 1 ErbStG, § 11 ErbStG." },
      { art: "wahl", frage: "Notarvertrag mit Auflassung und Eintragungsbewilligung am 10.04., Eintragung am 20.08. Wann ist die Grundstücksschenkung ausgeführt?", optionen: ["10.04.", "20.08.", "Mit Übergang von Nutzen und Lasten", "31.12."], richtig: 0, erkl: "Ausführung, sobald Auflassung und Eintragungsbewilligung vorliegen (§ 9 Abs. 1 Nr. 2 ErbStG)." },
      { art: "wahl", frage: "Die geerbten Aktien verlieren nach dem Todestag 30 %. Folge?", optionen: ["Keine – Stichtagswert bleibt", "Wert sinkt um 30 %", "Steuer wird erlassen", "Neuer Stichtag"], richtig: 0, erkl: "Stichtagsprinzip, § 11 ErbStG." },
    ],
  },
  {
    id: "bew-p-erwerb", titel: "Vom Nachlass zur Bereicherung", kurz: "§ 10 ErbStG", icon: "🧮", normen: ["ErbStG 10 1", "ErbStG 10 5", "ErbStG 10 6a", "ErbStG 10 8"],
    karten: [
      { art: "erklaerung", titel: "Das Schema", text: "1. Vermögensanfall nach **Steuerwerten**\n2. − Befreiungen (§§ 13, 13a, 13d ErbStG)\n3. − Nachlassverbindlichkeiten\n4. = **Bereicherung**\n5. − Freibeträge (§§ 16, 17 ErbStG)\n6. = steuerpflichtiger Erwerb, **abgerundet auf volle 100 €**" },
      { art: "erklaerung", titel: "Was abgezogen wird", text: "• Schulden des Erblassers (§ 10 Abs. 5 Nr. 1 ErbStG)\n• Vermächtnisse, geltend gemachte Pflichtteile (Nr. 2)\n• Bestattung, Grabdenkmal, Grabpflege, Abwicklung (Nr. 3) – **ohne Nachweis 15.000 €**" },
      { art: "erklaerung", titel: "Was nicht abgezogen wird", text: "• Kosten der Nachlass**verwaltung**\n• die **eigene** Erbschaftsteuer (§ 10 Abs. 8 ErbStG)\n• Schulden, **soweit** der zugehörige Gegenstand **steuerbefreit** ist (§ 10 Abs. 6a ErbStG) – z. B. nur 90 % der Schuld bei einem § 13d-Grundstück" },
    ],
    fragen: [
      { art: "wahl", frage: "Wie hoch ist der Pauschbetrag für Bestattungs- und Abwicklungskosten?", optionen: ["15.000 €", "10.300 €", "5.000 €", "20.000 €"], richtig: 0, erkl: "§ 10 Abs. 5 Nr. 3 S. 2 ErbStG (seit 2025)." },
      { art: "zahl", frage: "Bereicherung nach Freibetrag: 437.880 €. Auf welchen Betrag wird abgerundet (in €)?", cent: 43780000, erkl: "Auf volle 100 € nach unten (§ 10 Abs. 1 S. 6 ErbStG): 437.800 €." },
      { art: "wahl", frage: "Ist die eigene Erbschaftsteuer des Erben abzugsfähig?", optionen: ["Nein", "Ja, voll", "Zur Hälfte", "Nur bei Klasse III"], richtig: 0, erkl: "§ 10 Abs. 8 ErbStG." },
    ],
  },
  {
    id: "bew-p-klassen", titel: "Steuerklassen und Freibeträge", kurz: "§§ 15–17 ErbStG", icon: "👪", normen: ["ErbStG 15 1", "ErbStG 16 1", "ErbStG 17 1"],
    karten: [
      { art: "erklaerung", titel: "Drei Klassen", text: "• **I:** Ehegatte, Lebenspartner, Kinder, Stiefkinder, Enkel, **Eltern beim Erbfall**\n• **II:** Eltern bei Schenkung, Geschwister, Nichten und Neffen, Schwiegerkinder, Schwiegereltern, Stiefeltern, geschiedener Ehegatte\n• **III:** alle übrigen (z. B. Lebensgefährte, Cousin)" },
      { art: "merksatz", titel: "Die Freibeträge", text: "Ehegatte **500.000 €** – Kind **400.000 €** – Enkel **200.000 €** – übrige Klasse I **100.000 €** – Klassen II und III **20.000 €** (§ 16 Abs. 1 ErbStG)." },
      { art: "erklaerung", titel: "Versorgungsfreibetrag", text: "Nur bei **Erwerben von Todes wegen** (§ 17 ErbStG): Ehegatte **256.000 €**, Kinder nach Alter von 52.000 € (bis 5 Jahre) bis 10.300 € (bis 27 Jahre). Gekürzt um den Kapitalwert steuerfreier Hinterbliebenenbezüge." },
    ],
    fragen: [
      { art: "wahl", frage: "Der Vater erhält von seiner Tochter eine Schenkung. Steuerklasse?", optionen: ["II", "I", "III"], richtig: 0, erkl: "Eltern nur beim Erwerb von Todes wegen in Klasse I." },
      { art: "wahl", frage: "Freibetrag der Enkelin, deren Mutter (Tochter des Erblassers) bereits verstorben ist?", optionen: ["400.000 €", "200.000 €", "100.000 €", "20.000 €"], richtig: 0, erkl: "Kinder verstorbener Kinder wie Kinder (§ 16 Abs. 1 Nr. 2 ErbStG)." },
      { art: "zahl", frage: "Witwe, Bereicherung 1.000.000 €, keine Versorgungsbezüge. Steuerpflichtiger Erwerb (in €)?", cent: 24400000, erkl: "1.000.000 € − 500.000 € − 256.000 € = 244.000 € (§§ 16, 17 ErbStG)." },
    ],
  },
  {
    id: "bew-p-befreiungen", titel: "Hausrat, Rückfall, Geschenke", kurz: "§ 13 Abs. 1 Nr. 1, 10, 14 ErbStG", icon: "🛋️", normen: ["ErbStG 13 1"],
    karten: [
      { art: "merksatz", titel: "Hausrat-Freibeträge", text: "Klasse I: Hausrat **41.000 €** plus andere bewegliche Gegenstände **12.000 €**. Klassen II und III: beides zusammen **12.000 €** (§ 13 Abs. 1 Nr. 1 ErbStG). Steuerpflichtig ist nur, was darüber liegt." },
      { art: "erklaerung", titel: "Nicht begünstigt", text: "Zahlungsmittel, Wertpapiere, **Münzen, Edelmetalle, Edelsteine, Perlen** und Gegenstände des Grund- oder Betriebsvermögens (§ 13 Abs. 1 Nr. 1 S. 2 ErbStG)." },
      { art: "erklaerung", titel: "Rückfall und Gelegenheitsgeschenke", text: "• Was Eltern ihren Kindern geschenkt haben und **von Todes wegen zurückfällt**, ist steuerfrei (§ 13 Abs. 1 Nr. 10 ErbStG).\n• **Übliche Gelegenheitsgeschenke** sind steuerfrei (Nr. 14) – Maßstab: Anlass und Vermögen des Schenkers." },
    ],
    fragen: [
      { art: "zahl", frage: "Die Tochter erbt Hausrat für 50.000 € und einen Pkw für 15.000 €. Steuerpflichtiger Teil (in €)?", cent: 1200000, erkl: "Hausrat 50.000 − 41.000 = 9.000 €; Pkw 15.000 − 12.000 = 3.000 €; zusammen 12.000 € (§ 13 Abs. 1 Nr. 1 Buchst. a, b ErbStG)." },
      { art: "wahl", frage: "Ist eine geerbte Goldmünzensammlung nach § 13 Abs. 1 Nr. 1 ErbStG befreit?", optionen: ["Nein", "Ja, bis 12.000 €", "Ja, bis 41.000 €", "Ja, vollständig"], richtig: 0, erkl: "Münzen und Edelmetalle sind ausgenommen." },
      { art: "wahl", frage: "Die vom Vater geschenkte Wohnung fällt nach dem Tod des Sohnes an den Vater zurück. Steuer?", optionen: ["Steuerfrei", "Klasse I, Freibetrag 100.000 €", "Klasse II", "Klasse III"], richtig: 0, erkl: "Rückfall von Todes wegen, § 13 Abs. 1 Nr. 10 ErbStG." },
    ],
  },
  {
    id: "bew-p-familienheim", titel: "Das Familienheim", kurz: "§ 13 Abs. 1 Nr. 4a–4c ErbStG", icon: "🏡", normen: ["ErbStG 13 1"],
    karten: [
      { art: "erklaerung", titel: "Drei Fälle", text: "• **4a:** Schenkung unter **Ehegatten** – ohne Wert-, Flächen- oder Behaltensgrenze\n• **4b:** Erbfall, **Ehegatte** erbt – zehn Jahre Selbstnutzung\n• **4c:** Erbfall, **Kind** erbt – zehn Jahre Selbstnutzung **und höchstens 200 m²**" },
      { art: "merksatz", titel: "Gemeinsame Voraussetzungen", text: "Bebautes Grundstück im **Inland, in der EU oder im EWR**, darin eine **selbst bewohnte** Wohnung. Beim Erbfall: Erblasser wohnte bis zuletzt darin (oder war aus zwingenden Gründen gehindert), Erwerber zieht **unverzüglich** ein." },
      { art: "beispiel", titel: "250 m² Elternhaus", text: "Tochter erbt Haus mit 250 m² für 750.000 € und zieht ein: frei 750.000 × 200/250 = **600.000 €**, steuerpflichtig **150.000 €**." },
      { art: "klausur", titel: "Fallen", text: "Ferienhaus, Zweitwohnung, Haus in der Schweiz, Lebensgefährte – **keine** Befreiung." },
    ],
    fragen: [
      { art: "wahl", frage: "Die Witwe erbt das gemeinsam bewohnte Haus mit 260 m². Wie viel ist befreit?", optionen: ["Alles – keine Flächengrenze für Ehegatten", "Nur 200 m²", "Nichts", "Die Hälfte"], richtig: 0, erkl: "§ 13 Abs. 1 Nr. 4b ErbStG kennt keine Flächengrenze." },
      { art: "wahl", frage: "Der Sohn erbt das Elternhaus und vermietet es sofort. Befreiung?", optionen: ["Nein", "Ja, voll", "Ja, bis 200 m²", "Ja, für zehn Jahre"], richtig: 0, erkl: "Keine unverzügliche Selbstnutzung (§ 13 Abs. 1 Nr. 4c ErbStG)." },
      { art: "wahl", frage: "Wie lange muss der erbende Ehegatte das Familienheim selbst nutzen?", optionen: ["Zehn Jahre", "Fünf Jahre", "Sieben Jahre", "Gar nicht"], richtig: 0, erkl: "Sonst rückwirkender Wegfall, außer bei zwingenden Gründen (§ 13 Abs. 1 Nr. 4b S. 5 ErbStG)." },
    ],
  },
  {
    id: "bew-p-wohnraum", titel: "Vermieteter Wohnraum", kurz: "§ 13d ErbStG · § 10 Abs. 6a ErbStG", icon: "🏢", normen: ["ErbStG 13d 1", "ErbStG 13d 3", "ErbStG 10 6a"],
    karten: [
      { art: "merksatz", titel: "90 statt 100", text: "Bebaute Grundstücke, die **zu Wohnzwecken vermietet** sind, werden nur mit **90 %** angesetzt (§ 13d Abs. 1 ErbStG) – im Inland, in der EU oder im EWR, und nicht als Teil von begünstigtem Betriebsvermögen." },
      { art: "erklaerung", titel: "Gemischte Häuser", text: "Den Grundbesitzwert nach **Flächen** aufteilen: Nur der Anteil der zu Wohnzwecken **vermieteten** Fläche bekommt 90 %. Eigengenutzte Wohnungen und Gewerbeflächen bleiben bei 100 %." },
      { art: "erklaerung", titel: "Schulden mitkürzen", text: "Eine Schuld, die mit dem Grundstück zusammenhängt, ist nur abzugsfähig, **soweit** das Grundstück nicht befreit ist (§ 10 Abs. 6a S. 1 ErbStG): Schuld × Ansatz ÷ Grundbesitzwert." },
      { art: "beispiel", titel: "Lübeck", text: "Wert 1.200.000 €, 600 m² Wohnen, 200 m² Bäckerei: 900.000 × 90 % = 810.000 € + 300.000 € = **1.110.000 €**. Darlehen 400.000 € × 1.110.000/1.200.000 = **370.000 €** abzugsfähig." },
    ],
    fragen: [
      { art: "wahl", frage: "An eine Arztpraxis vermietetes Gebäude – § 13d ErbStG?", optionen: ["Nein", "Ja, 90 %", "Ja, 85 %", "Ja, voll befreit"], richtig: 0, erkl: "Nur zu Wohnzwecken vermietete Flächen." },
      { art: "zahl", frage: "Grundbesitzwert 500.000 €, vollständig zu Wohnzwecken vermietet. Ansatz (in €)?", cent: 45000000, erkl: "500.000 € × 90 % (§ 13d Abs. 1 ErbStG)." },
      { art: "zahl", frage: "Darauf lastet ein Darlehen von 200.000 €. Abzugsfähig (in €)?", cent: 18000000, erkl: "200.000 € × 90 % = 180.000 € (§ 10 Abs. 6a S. 1 ErbStG)." },
    ],
  },
  {
    id: "bew-p-betrieb", titel: "Betriebe und Anteile verschonen", kurz: "§§ 13a, 13b ErbStG", icon: "🏭", normen: ["ErbStG 13a 1", "ErbStG 13a 2", "ErbStG 13a 10", "ErbStG 13b 1", "ErbStG 13b 2", "ErbStG 13b 7"],
    karten: [
      { art: "erklaerung", titel: "Was begünstigt sein kann", text: "Ganze Betriebe, Teilbetriebe, Mitunternehmeranteile und **Anteile an Kapitalgesellschaften**, wenn der **Erblasser oder Schenker zu mehr als 25 %** beteiligt war und die Gesellschaft Sitz oder Geschäftsleitung im Inland, der EU oder dem EWR hat (§ 13b Abs. 1 ErbStG)." },
      { art: "erklaerung", titel: "Verwaltungsvermögen", text: "**Verwaltungsvermögen** sind Dritten zur Nutzung überlassene Grundstücke, Anteile an Kapitalgesellschaften bis 25 %, Kunstgegenstände, Wertpapiere und Finanzmittel, soweit sie 15 % des Unternehmenswerts übersteigen (§ 13b Abs. 4 Nr. 1–5 ErbStG). Bis **10 %** (vom um es gekürzten Wert) gilt es als **unschädlich**; der Rest ist **schädlich** und voll steuerpflichtig. Ab **90 %** ist gar nichts begünstigt." },
      { art: "merksatz", titel: "85 % oder 100 %", text: "**Regelverschonung:** 85 % frei, vom Rest bleiben bis **150.000 €** frei (Abzugsbetrag, schmilzt um 50 % des Mehrbetrags ab). **Optionsverschonung:** 100 % frei, nur bei Verwaltungsvermögen **≤ 20 %**." },
      { art: "beispiel", titel: "Abzugsbetrag", text: "Rest 270.000 €: 150.000 − 50 % × 120.000 = **90.000 €** frei. Rest 450.000 € oder mehr: kein Abzugsbetrag." },
    ],
    fragen: [
      { art: "wahl", frage: "Gesellschafterin mit 20 % schenkt ihren Anteil. Begünstigungsfähig nach § 13b Abs. 1 Nr. 3 ErbStG?", optionen: ["Nein", "Ja", "Nur bei Option", "Nur zu 50 %"], richtig: 0, erkl: "Mindestbeteiligung: mehr als 25 %." },
      { art: "zahl", frage: "Nach dem Verschonungsabschlag verbleiben 230.000 €. Abzugsbetrag (in €)?", cent: 11000000, erkl: "150.000 € − 50 % × 80.000 € = 110.000 € (§ 13a Abs. 2 ErbStG)." },
      { art: "wahl", frage: "Verwaltungsvermögen 22 %, Antrag auf Optionsverschonung. Folge?", optionen: ["Nur Regelverschonung", "100 % Verschonung", "Keine Verschonung", "Verschonung 92 %"], richtig: 0, erkl: "Option nur bis 20 % Verwaltungsvermögen (§ 13a Abs. 10 ErbStG)." },
    ],
  },
  {
    id: "bew-p-steuer", titel: "Steuer berechnen", kurz: "§§ 19, 20, 22 ErbStG", icon: "💶", normen: ["ErbStG 19 1", "ErbStG 19 3", "ErbStG 20 1", "ErbStG 22"],
    karten: [
      { art: "erklaerung", titel: "Die Tabelle", text: "Wertstufen bis **75.000 / 300.000 / 600.000 €** / 6 / 13 / 26 Mio. €:\n• Klasse I: 7 – 11 – 15 – 19 – 23 – 27 – 30 %\n• Klasse II: 15 – 20 – 25 – 30 – 35 – 40 – 43 %\n• Klasse III: 30 % bis 6 Mio. €, darüber 50 %\nDer Satz gilt für den **ganzen** Erwerb." },
      { art: "merksatz", titel: "Härteausgleich", text: "Knapp über einer Wertgrenze: Steuer an der Grenze + **½** (Satz bis 30 %) bzw. **¾** (Satz über 30 %) des übersteigenden Betrags – der niedrigere Wert gilt (§ 19 Abs. 3 ErbStG)." },
      { art: "beispiel", titel: "75.800 € in Klasse I", text: "11 % = 8.338 €. Vergleich: 75.000 × 7 % = 5.250 € + ½ × 800 € = 400 € → **5.650 €**." },
      { art: "erklaerung", titel: "Wer zahlt?", text: "Der **Erwerber**, bei Schenkungen **auch der Schenker** (§ 20 Abs. 1 ErbStG). Steuer bis **50 €** wird nicht festgesetzt (§ 22 ErbStG)." },
    ],
    fragen: [
      { art: "zahl", frage: "Klasse II, steuerpflichtiger Erwerb 200.000 €. Steuer (in €)?", cent: 4000000, erkl: "20 % × 200.000 € = 40.000 € (§ 19 Abs. 1 ErbStG); Härteausgleich: 75.000 × 15 % = 11.250 + ½ × 125.000 = 73.750 € – höher, also kein Ausgleich." },
      { art: "zahl", frage: "Klasse I, steuerpflichtiger Erwerb 301.000 €. Steuer (in €)?", cent: 3350000, erkl: "15 % = 45.150 €; Härteausgleich: 300.000 × 11 % = 33.000 € + ½ × 1.000 € = 500 € → 33.500 € (§ 19 Abs. 3 ErbStG)." },
      { art: "wahl", frage: "Wer schuldet die Schenkungsteuer?", optionen: ["Beschenkter und Schenker", "Nur der Schenker", "Nur der Beschenkte", "Der Notar"], richtig: 0, erkl: "§ 20 Abs. 1 S. 1 ErbStG." },
    ],
  },
  {
    id: "bew-p-allgemein", titel: "Womit wird bewertet?", kurz: "§§ 2, 9–12 BewG", icon: "📐", normen: ["BewG 2", "BewG 9", "BewG 10", "BewG 11 1", "BewG 12 1"],
    karten: [
      { art: "merksatz", titel: "Der gemeine Wert", text: "Grundmaßstab ist der **gemeine Wert**: der Preis, der im **gewöhnlichen Geschäftsverkehr** bei einer Veräußerung zu erzielen wäre – ohne ungewöhnliche oder **persönliche** Verhältnisse (§ 9 BewG)." },
      { art: "erklaerung", titel: "Besondere Maßstäbe", text: "• **Aktien:** niedrigster Kurs am Stichtag (§ 11 Abs. 1 BewG)\n• **Nicht notierte Anteile:** gemeiner Wert, mindestens Substanzwert (§ 11 Abs. 2 BewG)\n• **Forderungen, Schulden:** Nennwert (§ 12 Abs. 1 BewG)\n• **Teilwert:** Anteil am Gesamtkaufpreis bei Fortführung (§ 10 BewG)" },
      { art: "erklaerung", titel: "Die wirtschaftliche Einheit", text: "Jede wirtschaftliche Einheit wird **für sich** bewertet (§ 2 BewG) – nach Verkehrsauffassung, nur Wirtschaftsgüter **desselben Eigentümers**." },
    ],
    fragen: [
      { art: "zahl", frage: "300 Aktien, Kurse am Stichtag zwischen 52,40 € und 55,10 €. Wert (in €)?", cent: 1572000, erkl: "300 × 52,40 € = 15.720 € (§ 11 Abs. 1 BewG)." },
      { art: "wahl", frage: "Das geerbte Bild hat für die Erbin einen hohen Erinnerungswert. Folge für die Bewertung?", optionen: ["Keine – persönliche Verhältnisse bleiben außer Betracht", "Wert steigt", "Wert sinkt", "Bild ist steuerfrei"], richtig: 0, erkl: "§ 9 Abs. 2 S. 3 BewG." },
      { art: "wahl", frage: "Wie wird eine marktüblich verzinste Darlehensforderung bewertet?", optionen: ["Nennwert", "Barwert", "Teilwert", "Kurswert"], richtig: 0, erkl: "§ 12 Abs. 1 BewG." },
    ],
  },
  {
    id: "bew-p-grundbesitz", titel: "Grundbesitzwert und Bodenrichtwert", kurz: "§§ 151, 157, 176–179 BewG", icon: "🗺️", normen: ["BewG 151 1", "BewG 157 1", "BewG 176", "BewG 178", "BewG 179"],
    karten: [
      { art: "erklaerung", titel: "Bedarfsbewertung", text: "Inländische Grundstücke werden nur bewertet, wenn es nötig ist – und dann **gesondert festgestellt** (§ 151 Abs. 1 S. 1 Nr. 1 BewG). Der Feststellungsbescheid ist **Grundlagenbescheid** für die Erbschaftsteuer (§ 12 Abs. 3 ErbStG). Maßgebend: Verhältnisse **am Stichtag** (§ 157 Abs. 1 BewG)." },
      { art: "erklaerung", titel: "Unbebaut oder bebaut?", text: "Unbebaut, wenn kein **benutzbares** Gebäude steht (§ 178 BewG). Benutzbar ab **Bezugsfertigkeit** – wenn man einziehen kann; die Bauabnahme zählt nicht. Ruinen gelten als unbebaut." },
      { art: "merksatz", titel: "Fläche mal Richtwert", text: "Unbebautes Grundstück = **Fläche × Bodenrichtwert** (§ 179 BewG) – und zwar der Richtwert, der **zuletzt vor dem Stichtag zu ermitteln war**, auch wenn er erst danach veröffentlicht wird." },
    ],
    fragen: [
      { art: "zahl", frage: "Stichtag 20.03.2026, 720 m². Richtwert zum 01.01.2024: 380 €, zum 01.01.2026 (beschlossen im Mai): 410 €. Wert (in €)?", cent: 29520000, erkl: "Maßgebend der Richtwert zum 01.01.2026: 720 × 410 € = 295.200 € (§ 179 S. 3 BewG)." },
      { art: "wahl", frage: "Auf dem Grundstück steht ein Rohbau ohne Fenster und Heizung. Grundstück?", optionen: ["Unbebaut", "Bebaut", "Teilbebaut", "Betriebsgrundstück"], richtig: 0, erkl: "Noch nicht bezugsfertig (§ 178 Abs. 1 BewG)." },
      { art: "wahl", frage: "Wo greift man einen falschen Grundbesitzwert an?", optionen: ["Feststellungsbescheid", "Erbschaftsteuerbescheid", "Grundbuchamt", "Gutachterausschuss"], richtig: 0, erkl: "Grundlagenbescheid nach § 151 BewG – bindend für den Folgebescheid." },
    ],
  },
  {
    id: "bew-p-bebaut", titel: "Grundstücksart und Verfahren", kurz: "§§ 180–183 BewG", icon: "🏘️", normen: ["BewG 181", "BewG 182", "BewG 183"],
    karten: [
      { art: "erklaerung", titel: "Die Grundstücksarten", text: "• **Ein-/Zweifamilienhaus:** bis zwei Wohnungen\n• **Mietwohngrundstück:** über 80 % Wohnen\n• **Wohnungs-/Teileigentum**\n• **Geschäftsgrundstück:** über 80 % betrieblich\n• **Gemischt genutzt:** dazwischen\n• **Sonstige** (§ 181 BewG)" },
      { art: "merksatz", titel: "Welches Verfahren?", text: "**Vergleichswert:** Wohnungseigentum, Ein-/Zweifamilienhäuser. **Ertragswert:** Mietwohngrundstücke; Geschäfts- und gemischt genutzte Grundstücke **mit üblicher Miete**. **Sachwert:** der Rest (§ 182 BewG)." },
      { art: "erklaerung", titel: "Vergleichswert", text: "Kaufpreise vergleichbarer Grundstücke oder **Vergleichsfaktoren** je m² des Gutachterausschusses (§ 183 BewG). Bezieht sich der Faktor nur aufs Gebäude, kommt der **Bodenwert** dazu." },
    ],
    fragen: [
      { art: "wahl", frage: "Sechs Wohnungen (600 m²) und ein Laden (200 m²), ortsübliche Miete bekannt. Verfahren?", optionen: ["Ertragswert", "Vergleichswert", "Sachwert", "Bodenwert"], richtig: 0, erkl: "Gemischt genutzt (75 % Wohnen) mit üblicher Miete → § 182 Abs. 3 Nr. 2 BewG." },
      { art: "wahl", frage: "Haus mit genau 80 % Wohnfläche und vier Wohnungen – Mietwohngrundstück?", optionen: ["Nein – erst über 80 %", "Ja", "Nur bei Vermietung", "Nur mit Gutachten"], richtig: 0, erkl: "§ 181 Abs. 3 BewG verlangt mehr als 80 %." },
      { art: "zahl", frage: "Einfamilienhaus 140 m², Vergleichsfaktor nur für das Gebäude 3.000 €/m², Bodenwert 120.000 €. Vergleichswert (in €)?", cent: 54000000, erkl: "140 × 3.000 € = 420.000 € + Bodenwert 120.000 € = 540.000 € (§ 183 Abs. 2 BewG)." },
    ],
  },
  {
    id: "bew-p-ertragswert", titel: "Das Ertragswertverfahren", kurz: "§§ 184–188, 198 BewG", icon: "📈", normen: ["BewG 184", "BewG 185", "BewG 186", "BewG 187", "BewG 188", "BewG 198"],
    karten: [
      { art: "erklaerung", titel: "Der Rechenweg", text: "1. Bodenwert = Fläche × Richtwert\n2. Rohertrag (Jahreskaltmiete ohne Umlagen)\n3. − Bewirtschaftungskosten (Anlage 23)\n4. = Reinertrag − Bodenwert × Liegenschaftszins\n5. = Gebäudereinertrag × **Vervielfältiger** (Anlage 21)\n6. = Gebäudeertragswert + Bodenwert = **Ertragswert**" },
      { art: "erklaerung", titel: "Bewirtschaftungskosten", text: "Wohnen: Verwaltung **230 €** je Wohnung, Instandhaltung **9 €** je m² – beides mit dem **Verbraucherpreisindex** angepasst –, Mietausfall **2 %**. Gewerbe: Verwaltung **3 %**, Mietausfall **4 %** des Rohertrags, Instandhaltung je m² wie Wohnen." },
      { art: "merksatz", titel: "Restnutzungsdauer", text: "Gesamtnutzungsdauer (meist **80 Jahre**) − Alter, aber **mindestens 30 %** der Gesamtnutzungsdauer (24 Jahre). Bei Abbruchverpflichtung höchstens bis zum Abbruch (§ 185 Abs. 3 BewG)." },
      { art: "erklaerung", titel: "Liegenschaftszins und § 198 BewG", text: "Ohne Wert vom Gutachterausschuss: Mietwohn **3,5 %**, gemischt bis 50 % gewerblich **4,5 %**, darüber **5,0 %**, Geschäft **6,0 %** (§ 188 BewG). Ein niedrigerer Verkehrswert kann durch **Gutachten** oder **Kaufpreis** (± 1 Jahr) nachgewiesen werden (§ 198 BewG)." },
    ],
    fragen: [
      { art: "zahl", frage: "Gebäude bezugsfertig 1955, Stichtag 2026, Gesamtnutzungsdauer 80 Jahre. Restnutzungsdauer in Jahren (Eingabe als Zahl)?", cent: 2400, erkl: "80 − 71 = 9 Jahre, mindestens 30 % von 80 = 24 Jahre (§ 185 Abs. 3 S. 6 BewG)." },
      { art: "wahl", frage: "Gehören Betriebskostenvorauszahlungen der Mieter zum Rohertrag?", optionen: ["Nein", "Ja", "Zur Hälfte", "Nur bei Gewerbe"], richtig: 0, erkl: "Umlagen sind nicht anzusetzen (§ 186 Abs. 1 S. 2 BewG)." },
      { art: "wahl", frage: "Liegenschaftszins für ein Mietwohngrundstück ohne Daten des Gutachterausschusses?", optionen: ["3,5 %", "4,5 %", "5,0 %", "6,0 %"], richtig: 0, erkl: "§ 188 Abs. 2 S. 2 Nr. 1 BewG." },
    ],
  },
];
