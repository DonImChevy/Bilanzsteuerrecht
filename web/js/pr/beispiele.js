// Klausurbeispiele Privatrecht: eigener Sachverhalt im Klausurstil und knappe Musterlösung – jede Aussage mit
// tragender Norm; Fallfragen mit Obersatz im Gutachtenstil, Wissensfragen in wenigen Sätzen. Kein Klausurtext übernommen.
// Format: { titel, sv, aufgabe, loesung: [Absätze] }. Rechtsstand 2026.

export const BEISPIELE_PR = {
  "pr-grundlagen": [
    {
      titel: "Die Kantine der Landesfinanzschule",
      sv: "Die Landesfinanzschule schließt mit dem Caterer C einen Vertrag über den Betrieb ihrer Kantine. Später setzt das Finanzamt gegen C Umsatzsteuer-Vorauszahlungen fest; C hält beides für „Behördensache“.",
      aufgabe: "Ordnen Sie beide Vorgänge dem öffentlichen Recht oder dem Privatrecht zu und nennen Sie den Rechtsweg.",
      loesung: [
        "Cateringvertrag: Die Schule tritt wie ein privater Auftraggeber auf; Grundlage sind die für jedermann geltenden Vorschriften über Verträge (§ 311 Abs. 1 BGB) → Privatrecht, Streit vor den ordentlichen Gerichten.",
        "Steuerfestsetzung: Das Finanzamt handelt hoheitlich auf Grundlage von Normen, die nur Hoheitsträger als solche berechtigen (Sonderrechtstheorie) → öffentliches Recht, Rechtsweg zum Finanzgericht.",
      ],
    },
  ],
  "pr-anspruch": [
    {
      titel: "Zug um Zug am Flohmarkt",
      sv: "Auf dem Flohmarkt sagt Sammlerin S zum Händler H: „Die Schallplatte nehme ich für 25 €.“ H antwortet: „Abgemacht.“ Als H das Geld verlangt, hält S die Hand auf und sagt, sie zahle, sobald sie die Platte habe.",
      aufgabe: "Kann H von S Zahlung von 25 € verlangen?",
      loesung: [
        "H könnte gegen S einen Anspruch auf Zahlung von 25 € aus § 433 Abs. 2 BGB haben.",
        "Entstanden: S hat ein Angebot abgegeben, H hat es sofort angenommen (§§ 145, 147 Abs. 1 BGB) → wirksamer Kaufvertrag.",
        "Erloschen: S hat nicht gezahlt; keine Erfüllung (§ 362 Abs. 1 BGB).",
        "Durchsetzbar: S kann die Zahlung bis zur Übergabe und Übereignung der Platte verweigern – Einrede des nicht erfüllten Vertrags (§ 320 Abs. 1 BGB).",
        "Ergebnis: Anspruch aus § 433 Abs. 2 BGB besteht, aber nur Zug um Zug gegen Übergabe und Übereignung der Schallplatte (§ 322 Abs. 1 BGB).",
      ],
    },
  ],
  "pr-privatautonomie": [
    {
      titel: "Der Handschlag-Grundstückskauf",
      sv: "G und H einigen sich mündlich, dass H das Gartengrundstück des G für 40.000 € kauft. Später will H davon nichts mehr wissen.",
      aufgabe: "Kann G von H Zahlung verlangen? Welche Grenze der Privatautonomie ist berührt?",
      loesung: [
        "G könnte gegen H einen Anspruch auf Zahlung von 40.000 € aus § 433 Abs. 2 BGB haben.",
        "Ein Vertrag über die Übertragung eines Grundstücks bedarf der notariellen Beurkundung (§ 311b Abs. 1 S. 1 BGB); die mündliche Einigung ist formnichtig (§ 125 S. 1 BGB) – Grenze der Formfreiheit.",
        "Eine Heilung durch Auflassung und Eintragung (§ 311b Abs. 1 S. 2 BGB) ist nicht erfolgt.",
        "Ergebnis: Kein Anspruch.",
      ],
    },
  ],
  "pr-rechtssubjekte": [
    {
      titel: "Das Planungsbüro in Gründung",
      sv: "Die Ingenieurinnen A und B schließen beim Notar den Gesellschaftsvertrag der „Nordplan GmbH“, bestellen A zur Geschäftsführerin und zahlen die Hälfte des Stammkapitals ein. Vor der Eintragung kauft A im Namen der GmbH sechs Laptops für 9.000 €.",
      aufgabe: "Besteht die GmbH bereits als juristische Person? Wer haftet für die Laptops?",
      loesung: [
        "Vor der Eintragung ins Handelsregister besteht die GmbH als solche nicht (§ 11 Abs. 1 GmbHG); nach der Beurkundung liegt eine Vor-GmbH vor.",
        "A hat vor der Eintragung im Namen der Gesellschaft gehandelt und haftet persönlich (§ 11 Abs. 2 GmbHG) – neben der Vor-GmbH.",
        "Mit der Eintragung entsteht die GmbH als juristische Person; ab dann haftet nur das Gesellschaftsvermögen (§ 13 Abs. 1, 2 GmbHG).",
      ],
    },
  ],
  "pr-rechtsobjekte": [
    {
      titel: "Was gehört zum Hausverkauf?",
      sv: "V verkauft sein Einfamilienhaus. Im Haus sind eine vom Bauträger eingebaute Heizung, eine maßgefertigte Einbauküche und der Rasenmäher im Gartenschuppen; im Garten steht ein Gerätehaus, das der frühere Mieter für die Mietzeit aufgestellt hat.",
      aufgabe: "Ordnen Sie die Gegenstände ein.",
      loesung: [
        "Heizung: zur Herstellung des Gebäudes eingefügt → wesentlicher Bestandteil (§ 94 Abs. 2 BGB), geht zwingend mit dem Grundstück über (§ 93 BGB).",
        "Einbauküche: maßgefertigt eingepasst, nach örtlicher Verkehrsanschauung wesentlicher Bestandteil (§ 94 Abs. 2 BGB); sonst jedenfalls Zubehör (§ 97 Abs. 1 BGB).",
        "Rasenmäher: bewegliche Sache, die dem Grundstück dient → Zubehör (§ 97 Abs. 1 BGB), im Zweifel mitverkauft (§ 311c BGB).",
        "Gerätehaus: nur für die Mietzeit verbunden → Scheinbestandteil (§ 95 Abs. 1 S. 1 BGB), Eigentum des Mieters.",
      ],
    },
  ],
  "pr-geschaeftsfaehigkeit": [
    {
      titel: "Die Spielekonsole",
      sv: "Der 15-jährige F kauft ohne Wissen seiner Eltern bei Händler H eine Konsole für 450 € und vereinbart Ratenzahlung; die erste Rate von 50 € zahlt er aus seinem Taschengeld. Die Eltern sind empört.",
      aufgabe: "Ist der Kaufvertrag wirksam?",
      loesung: [
        "F ist beschränkt geschäftsfähig (§§ 2, 106 BGB). Der Kaufvertrag verpflichtet ihn zur Zahlung und ist daher nicht lediglich rechtlich vorteilhaft (§ 107 BGB); eine Einwilligung fehlt.",
        "§ 110 BGB greift nicht, weil F die Leistung nicht vollständig mit überlassenen Mitteln bewirkt hat.",
        "Der Vertrag ist schwebend unwirksam (§ 108 Abs. 1 BGB); verweigern die Eltern die Genehmigung, ist er endgültig unwirksam.",
      ],
    },
  ],
  "pr-willenserklaerung": [
    {
      titel: "Die Kündigung im Briefkasten",
      sv: "Vermieter V wirft am Freitag um 22 Uhr ein Kündigungsschreiben in den Briefkasten seiner Mieterin M. Am Samstag um 7 Uhr ruft er sie an und widerruft die Kündigung; M hat den Brief noch nicht gesehen.",
      aufgabe: "Ist die Kündigung wirksam?",
      loesung: [
        "Die Kündigung ist eine empfangsbedürftige Willenserklärung unter Abwesenden; sie wird mit Zugang wirksam (§ 130 Abs. 1 S. 1 BGB).",
        "Zugang liegt vor, wenn die Erklärung in den Machtbereich gelangt ist und unter normalen Umständen mit Kenntnisnahme zu rechnen ist – bei Einwurf um 22 Uhr erst am nächsten Morgen.",
        "Der telefonische Widerruf um 7 Uhr ging M zu, bevor mit der Leerung des Briefkastens zu rechnen war – also vor dem Zugang der Kündigung. Die Kündigung ist nicht wirksam geworden (§ 130 Abs. 1 S. 2 BGB).",
        "Hätte V erst nach der üblichen Leerung angerufen, wäre die Kündigung wirksam – ob M den Brief gelesen hat, ist für den Zugang unerheblich.",
      ],
    },
  ],
  "pr-rechtsgeschaefte": [
    {
      titel: "Äpfel vom Wochenmarkt",
      sv: "Rentner R kauft am Marktstand der Obstbäuerin O zwei Kilo Äpfel, zahlt mit einem 10-€-Schein und nimmt die Tüte mit.",
      aufgabe: "Wie viele Rechtsgeschäfte und Willenserklärungen liegen vor? Wann wird R Eigentümer der Äpfel?",
      loesung: [
        "Drei Rechtsgeschäfte: Kaufvertrag (§ 433 BGB), Übereignung der Äpfel und Übereignung des Geldes (je § 929 S. 1 BGB) – Trennungsprinzip.",
        "Jedes Geschäft beruht auf zwei übereinstimmenden Willenserklärungen – insgesamt sechs.",
        "Eigentümer wird R nicht durch den Kaufvertrag, sondern erst durch Einigung und Übergabe (§ 929 S. 1 BGB).",
      ],
    },
  ],
  "pr-vertragsschluss": [
    {
      titel: "Der Oldtimer im Inserat",
      sv: "O inseriert in einem Anzeigenblatt: „Biete meinen Käfer, Bj. 1972, für 9.500 € zum Kauf an. Meldet euch!“ Käufer K schreibt: „Ich nehme ihn für 9.000 €.“ O antwortet eine Stunde später: „Okay, 9.000 € passt.“",
      aufgabe: "Ist ein Kaufvertrag zustande gekommen?",
      loesung: [
        "Ein Kaufvertrag kommt durch Angebot und Annahme zustande (§§ 145 ff. BGB).",
        "Inserat des O: trotz des Wortlauts kein Angebot, sondern invitatio ad offerendum – O will nicht mit jedem Leser gebunden sein und die Zahlungsfähigkeit prüfen können (Rechtsbindungswille fehlt).",
        "Angebot des K: Sache, Preis und Parteien bestimmt → Angebot.",
        "Annahme des O: vorbehaltlose Zustimmung, rechtzeitig unter Abwesenden (§ 147 Abs. 2 BGB).",
        "Ergebnis: Kaufvertrag über 9.000 € (§ 433 BGB).",
      ],
    },
  ],
  "pr-anfechtung": [
    {
      titel: "Die vertippte Zahl",
      sv: "Antiquitätenhändlerin A will einem Sammler eine Kommode für 2.150 € anbieten, tippt aber 1.250 € in ihre E-Mail. Der Sammler nimmt sofort an. A bemerkt den Fehler am nächsten Tag und schreibt ihm sofort, sie lasse den Vertrag wegen eines Tippfehlers nicht gelten.",
      aufgabe: "Muss A die Kommode für 1.250 € liefern?",
      loesung: [
        "Der Sammler könnte einen Anspruch aus § 433 Abs. 1 S. 1 BGB haben; ein Kaufvertrag über 1.250 € ist durch Angebot und Annahme zustande gekommen (§§ 145 ff. BGB).",
        "Er könnte durch Anfechtung von Anfang an nichtig sein (§ 142 Abs. 1 BGB). Anfechtungserklärung gegenüber dem Vertragspartner liegt vor (§ 143 Abs. 1, 2 BGB).",
        "Anfechtungsgrund: Vertippen = Erklärungsirrtum (§ 119 Abs. 1 Var. 2 BGB), ursächlich für die Erklärung.",
        "Frist: unverzüglich nach Kenntnis (§ 121 Abs. 1 S. 1 BGB) eingehalten.",
        "Ergebnis: Kein Lieferanspruch; A schuldet ggf. den Vertrauensschaden (§ 122 Abs. 1 BGB).",
      ],
    },
  ],
  "pr-stellvertretung": [
    {
      titel: "Der Kinderwagen für die Schwester",
      sv: "Die hochschwangere S bittet ihren 17-jährigen Bruder B, im Babyfachmarkt des M „einen guten Kinderwagen bis 700 €“ für sie zu kaufen; das Modell solle er aussuchen. B erklärt M, er kaufe für seine Schwester S, und entscheidet sich für ein Modell zu 640 €. Seine Eltern wissen nichts.",
      aufgabe: "Kann M von S Zahlung von 640 € verlangen?",
      loesung: [
        "M könnte gegen S einen Anspruch auf Zahlung von 640 € aus § 433 Abs. 2 BGB haben. S selbst hat nichts erklärt; die Erklärung des B wirkt für sie, wenn er sie wirksam vertreten hat (§ 164 Abs. 1 S. 1 BGB).",
        "Kein höchstpersönliches Geschäft. B hatte bei der Auswahl Entscheidungsspielraum → eigene Willenserklärung, kein Bote.",
        "B ist beschränkt geschäftsfähig (§ 106 BGB); als Vertreter wird er selbst nicht verpflichtet, deshalb genügt das (§ 165 BGB).",
        "B handelte ausdrücklich im Namen der S (§ 164 Abs. 1 S. 1 BGB) und mit Innenvollmacht (§ 167 Abs. 1 Var. 1 BGB) im vorgegebenen Rahmen.",
        "Ergebnis: Kaufvertrag zwischen M und S – Anspruch aus § 433 Abs. 2 BGB besteht.",
      ],
    },
  ],
  "pr-schuldverhaeltnis": [
    {
      titel: "Ziel oder Dauer?",
      sv: "Firma F hat (1) einen Laptop gekauft, (2) Büroräume für unbestimmte Zeit gemietet, (3) eine Werbeagentur mit einem Logo beauftragt und (4) eine Aushilfe befristet für sechs Monate eingestellt.",
      aufgabe: "Ordnen Sie die Verträge ein und erläutern Sie, wie sie ordentlich enden.",
      loesung: [
        "(1) Kauf (§ 433 BGB) und (3) Werkvertrag (§ 631 BGB) sind Zielschuldverhältnisse – sie enden durch Erfüllung (§ 362 Abs. 1 BGB).",
        "(2) Unbefristete Miete (§ 535 BGB) ist ein Dauerschuldverhältnis – Ende durch ordentliche Kündigung (§ 542 Abs. 1 BGB).",
        "(4) Befristetes Arbeitsverhältnis (§ 611a BGB) – Ende mit Zeitablauf (§ 620 Abs. 1 BGB).",
        "Außerordentlich können Dauerschuldverhältnisse aus wichtigem Grund gekündigt werden (§ 314 BGB, § 543, § 626 BGB).",
      ],
    },
  ],
  "pr-gesetzlich": [
    {
      titel: "Das Skateboard und die Glastür",
      sv: "Der 16-jährige T lässt vor einer Bäckerei aus Übermut sein Skateboard mit Schwung gegen die Glastür rollen, um zu sehen, „ob sie hält“. Die Scheibe springt; der Austausch kostet 350 €. T wusste, dass Glas brechen kann.",
      aufgabe: "Kann die Inhaberin I von T Ersatz verlangen? (Merkmale stichpunktartig)",
      loesung: [
        "Anspruchsgrundlage: § 823 Abs. 1 BGB – ein Vertrag besteht nicht.",
        "Eigentumsverletzung an der Glastür durch das Anrollen-Lassen des Boards, kausal.",
        "Rechtswidrigkeit indiziert, kein Rechtfertigungsgrund.",
        "Verschulden: T ist 16 und hatte die nötige Einsicht (§ 828 Abs. 3 BGB); er handelte zumindest fahrlässig (§ 276 Abs. 2 BGB).",
        "Rechtsfolge: der für den Austausch erforderliche Geldbetrag, 350 € (§ 249 Abs. 2 S. 1 BGB).",
      ],
    },
  ],
  "pr-verjaehrung": [
    {
      titel: "Die vergessene Rechnung",
      sv: "Tischler T stellt seiner Kundin am 20.08.2026 eine fällige Rechnung über 3.000 €. Sie zahlt nicht. Am 15.03.2028 zahlt sie 500 € „als Abschlag“. Ende Mai 2031 verklagt T sie auf den Rest.",
      aufgabe: "Ist der Anspruch verjährt?",
      loesung: [
        "Regelmäßige Frist drei Jahre (§ 195 BGB), Beginn mit Schluss des Jahres 2026 (§ 199 Abs. 1 BGB) → Ende ursprünglich 31.12.2029.",
        "Die Abschlagszahlung am 15.03.2028 ist ein Anerkenntnis; die Verjährung beginnt neu (§ 212 Abs. 1 Nr. 1 BGB) und endet mit Ablauf des 15.03.2031.",
        "Die Klage Ende Mai 2031 kommt zu spät; die Kundin kann die Leistung verweigern (§ 214 Abs. 1 BGB).",
      ],
    },
  ],
  "pr-kauf": [
    {
      titel: "Die streikende Kaffeemaschine",
      sv: "Verbraucherin V kauft im Elektromarkt E eine Kaffeemaschine für 600 €. Nach drei Monaten heizt sie nicht mehr. V verlangt sofort ihr Geld zurück.",
      aufgabe: "Welche Rechte hat V?",
      loesung: [
        "Zwischen V und E besteht ein Kaufvertrag (§ 433 BGB), als Verbrauchsgüterkauf (§ 474 Abs. 1 BGB).",
        "Ein Sachmangel (§ 434 Abs. 1, 3 BGB) bei Gefahrübergang wird vermutet, weil er sich innerhalb eines Jahres zeigt (§ 477 Abs. 1 BGB).",
        "V muss zunächst Nacherfüllung verlangen und kann zwischen Reparatur und neuer Maschine wählen (§ 437 Nr. 1 BGB, § 439 Abs. 1 BGB).",
        "Erst nach erfolglosem Ablauf einer angemessenen Frist kann sie zurücktreten (§ 437 Nr. 2 BGB, § 323 Abs. 1 BGB) oder mindern (§ 441 BGB).",
      ],
    },
  ],
  "pr-sachenrecht": [
    {
      titel: "Das verliehene Rennrad",
      sv: "E leiht ihrem Bekannten B ihr Rennrad. B verkauft es über eine Kleinanzeige an D, der B für den Eigentümer hält, und übergibt es gegen 700 €.",
      aufgabe: "Wer ist Eigentümer des Rennrads?",
      loesung: [
        "Ursprünglich war E Eigentümerin. B und D haben sich geeinigt, das Rad wurde übergeben (§ 929 S. 1 BGB); B war aber nicht Eigentümer.",
        "D könnte gutgläubig erworben haben (§ 932 Abs. 1 S. 1 BGB). Er hielt B für den Eigentümer; grobe Fahrlässigkeit ist nicht ersichtlich (§ 932 Abs. 2 BGB).",
        "Das Rad ist E nicht abhanden gekommen, da sie den Besitz freiwillig an B übertrug (§ 935 Abs. 1 BGB).",
        "Ergebnis: D ist Eigentümer; E kann sich an B halten (§ 816 Abs. 1 S. 1 BGB).",
      ],
    },
  ],
};
