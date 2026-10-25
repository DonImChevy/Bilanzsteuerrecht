// Klausurbeispiele Umsatzsteuer: eigener Sachverhalt im Stil der Semesterklausuren und Musterlösung nach der
// Prüfungsreihenfolge der Klausurtechnik – jede Aussage mit der tragenden Norm. Kein Klausurtext übernommen.
// Format: { titel, sv, aufgabe, loesung: [Absätze] }. Rechtsstand 2026; VAZ = Kalendermonat, Soll-Versteuerung.

export const BEISPIELE_UST = {
  "ust-grundlagen": [
    {
      titel: "Klausureinleitung: Unternehmer und Unternehmen",
      sv: "Dr. Pia Prager (P) betreibt in Bremen eine Hausarztpraxis. Außerdem vermietet sie eine Ferienwohnung in Lübeck an wechselnde Gäste.",
      aufgabe: "Beurteilen Sie die Unternehmereigenschaft der P.",
      loesung: [
        "**Unternehmer:** P ist Unternehmerin i. S. d. § 2 Abs. 1 S. 1 UStG, da sie eine berufliche Tätigkeit (Arztpraxis) und eine gewerbliche Tätigkeit (Vermietung) selbständig ausübt. Beide sind nachhaltig und auf die Erzielung von Einnahmen gerichtet (§ 2 Abs. 1 S. 3 UStG).",
        "**Unternehmenseinheit:** Das Unternehmen umfasst die gesamte gewerbliche und berufliche Tätigkeit (§ 2 Abs. 1 S. 2 UStG). Praxis und Ferienwohnung bilden **ein** Unternehmen; Leistungen zwischen beiden Bereichen wären nicht steuerbare Innenumsätze.",
        "**Rahmen des Unternehmens:** Dazu gehören die Grundgeschäfte (Behandlungen, Vermietung) sowie Hilfsgeschäfte wie der Verkauf eines alten Praxisgeräts.",
        "**Besteuerung:** P versteuert ihre Umsätze nach vereinbarten Entgelten (§ 16 Abs. 1 S. 1 UStG); Voranmeldungszeitraum ist der Kalendermonat (§ 18 Abs. 2 UStG). Steuerschuldnerin ist sie selbst (§ 13a Abs. 1 Nr. 1 UStG).",
      ],
    },
    {
      titel: "Ehepaar vermietet gemeinsam",
      sv: "Die Eheleute Karla und Lothar (K und L) sind gemeinsam Eigentümer eines Hauses. Sie vermieten Räume an eine Physiotherapeutin und eine Wohnung an ein Rentnerpaar; die Miete geht auf ein gemeinsames Konto.",
      aufgabe: "Wer ist umsatzsteuerlich Unternehmer?",
      loesung: [
        "**Unternehmerfähigkeit:** Unternehmer kann jedes Gebilde sein, das nach außen selbständig Leistungen erbringt (§ 2 Abs. 1 S. 1 UStG) – auch eine Personengemeinschaft ohne eigene Rechtsform.",
        "**Subsumtion:** K und L treten gemeinsam als Vermieter auf und erzielen nachhaltig Einnahmen. Leistender ist daher die **Ehegattengemeinschaft (GbR)**, nicht K oder L allein.",
        "**Ergebnis:** Die GbR aus K und L ist Unternehmerin; K und L sind als Einzelpersonen insoweit keine Unternehmer.",
      ],
    },
    {
      titel: "Einmaliger Verkauf durch eine Privatperson",
      sv: "Rentnerin R verkauft einmalig einen selbst gestrickten Pullover für 120 € an die Inhaberin eines Modegeschäfts. Sie stellt eine Quittung mit dem Vermerk „inkl. 19 % MwSt.“ aus.",
      loesung: [
        "**Unternehmer:** R müsste eine Tätigkeit nachhaltig zur Erzielung von Einnahmen ausüben (§ 2 Abs. 1 S. 3 UStG). Ein einmaliger Verkauf ohne Wiederholungsabsicht ist nicht nachhaltig.",
        "**Folge:** R ist keine Unternehmerin; der Verkauf ist nicht nach § 1 Abs. 1 Nr. 1 UStG steuerbar.",
        "**Steuerausweis:** Weist eine Nichtunternehmerin Steuer gesondert aus, schuldet sie den Betrag nach § 14c Abs. 2 UStG (sofern § 14c in der Klausur nicht ausgeschlossen ist).",
        "**Käuferin:** Kein Vorsteuerabzug, denn die Leistung stammt nicht von einem Unternehmer und die Steuer ist nicht für einen Umsatz gesetzlich geschuldet (§ 15 Abs. 1 S. 1 Nr. 1 UStG).",
      ],
    },
  ],

  "ust-leistung": [
    {
      titel: "Präsentkorb zum Gesamtpreis",
      sv: "Im Bioladen der Ute U in Hannover stellt ein Kunde am 12.03. einen Präsentkorb für insgesamt 150 € zusammen: Rotwein 27 €, Wollsocken 23 €, Salami 18 €, Bergkäse 27 €, Apfelsaft 5 €, Kaffeebohnen 26 €, Weidenkorb 24 €. Er zahlt mit Karte und nimmt den Korb mit.",
      aufgabe: "Zu beurteilen ist U.",
      loesung: [
        "**Steuerbarkeit:** U ist Unternehmerin (§ 2 Abs. 1 UStG) und handelt im Rahmen ihres Unternehmens. Sie verschafft dem Kunden die Verfügungsmacht an den Waren und führt damit Lieferungen aus (§ 3 Abs. 1 UStG). Der Kunde befördert die Ware selbst; Ort ist Hannover (§ 3 Abs. 6 S. 1 UStG), also Inland (§ 1 Abs. 2 S. 1 UStG). Gegen Entgelt → steuerbar nach § 1 Abs. 1 Nr. 1 UStG; eine Befreiung nach § 4 UStG greift nicht.",
        "**Einheitlichkeit:** Der Korb besteht aus mehreren selbständigen Gegenständen; keiner ist Nebenleistung zu einem anderen. Der Weidenkorb ist wegen seines eigenen Gebrauchswerts keine bloße Verpackung. Der Gesamtpreis ist nach den Einzelpreisen aufzuteilen.",
        "**7 % (§ 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2):** Salami, Käse, Kaffeebohnen = 71 € → BMG 71 € ÷ 1,07 = 66,36 € (§ 10 Abs. 1 S. 1, 2 UStG), USt 4,64 €.",
        "**19 % (§ 12 Abs. 1 UStG):** Wein, Saft (Getränke sind nicht begünstigt), Socken, Korb = 79 € → BMG 79 € ÷ 1,19 = 66,39 €, USt 12,61 €.",
        "**Entstehung:** mit Ablauf des VAZ März 01 (§ 13 Abs. 1 Nr. 1 a S. 1 UStG); Steuerschuldnerin U (§ 13a Abs. 1 Nr. 1 UStG).",
      ],
    },
    {
      titel: "Maßanzug und Hosenänderung",
      sv: "Schneider S fertigt für einen Kunden einen Maßanzug aus eigenem Stoff (1.190 €) und kürzt für einen anderen Kunden eine mitgebrachte Hose (23,80 €).",
      loesung: [
        "**Maßanzug:** S bearbeitet einen Gegenstand und verwendet dafür **selbst beschaffte Hauptstoffe** → Werklieferung, die als Lieferung gilt (§ 3 Abs. 4 S. 1 UStG). BMG 1.190 € ÷ 1,19 = 1.000 €, USt 190 € (§ 10 Abs. 1, § 12 Abs. 1 UStG).",
        "**Hosenänderung:** Der Kunde stellt den Hauptstoff; S erbringt nur seine Arbeit (Garn ist Zutat) → Werkleistung = sonstige Leistung (§ 3 Abs. 9 S. 1 UStG). BMG 20 €, USt 3,80 €.",
        "**Bedeutung:** Die Einordnung entscheidet über den Ort (§ 3 Abs. 6, 7 UStG bzw. § 3a UStG) und damit über die Steuerbarkeit.",
      ],
    },
  ],

  "ust-ort": [
    {
      titel: "Versand per Paketdienst mit Versandpauschale",
      sv: "Händlerin H aus Hannover verkauft am 29.05. einen Wollmantel über ihren Onlineshop an eine Privatkundin in München: 150 € zuzüglich 15 € Versandpauschale. Am 30.05. übergibt H das Paket an DHL; es kommt am 01.06. an.",
      aufgabe: "Zu beurteilen ist H.",
      loesung: [
        "**Art:** H verschafft der Kundin die Verfügungsmacht am Mantel → Lieferung (§ 3 Abs. 1 UStG).",
        "**Ort:** H beauftragt mit DHL einen selbständigen Dritten → Versendung (§ 3 Abs. 6 S. 3 UStG). Die Lieferung gilt dort als ausgeführt, wo die Versendung beginnt (§ 3 Abs. 6 S. 1 UStG) → Hannover, Inland (§ 1 Abs. 2 S. 1 UStG). Steuerbar nach § 1 Abs. 1 Nr. 1 UStG, steuerpflichtig.",
        "**Versandpauschale:** Sie ist Nebenleistung zur Lieferung, da sie für die Kundin keinen eigenen Zweck hat; sie teilt deren Schicksal und gehört zum Entgelt.",
        "**BMG und Steuer:** 165 € ÷ 1,19 = 138,66 € (§ 10 Abs. 1 S. 1, 2 UStG); USt 19 % = 26,34 € (§ 12 Abs. 1 UStG).",
        "**Entstehung:** Die Lieferung ist mit Beginn der Versendung am 30.05. ausgeführt → Steuer entsteht mit Ablauf des VAZ Mai (§ 13 Abs. 1 Nr. 1 a S. 1 UStG) – nicht im Juni (Ankunft).",
      ],
    },
    {
      titel: "Drei Beratungsleistungen – drei Orte",
      sv: "Architektin A aus Hamburg (1) berät einen dänischen Bauunternehmer für dessen Unternehmen, (2) berät eine dänische Privatperson zu Einrichtungsfragen ohne Grundstücksbezug und (3) plant für einen Österreicher ein Ferienhaus auf Sylt.",
      loesung: [
        "**Art:** Alle drei sind sonstige Leistungen (§ 3 Abs. 9 S. 1 UStG).",
        "**(3) zuerst Sonderregel:** Leistungen im Zusammenhang mit einem Grundstück – dazu gehört die Vorbereitung von Bauleistungen durch Architekten – werden dort ausgeführt, wo das Grundstück liegt (§ 3a Abs. 3 Nr. 1 S. 1, S. 2 c UStG) → Sylt, Inland, steuerbar und steuerpflichtig.",
        "**(1) Unternehmer als Empfänger:** Ort ist der Sitz des Empfängers (§ 3a Abs. 2 S. 1 UStG) → Dänemark; in Deutschland nicht steuerbar (die Steuer schuldet der Empfänger in Dänemark).",
        "**(2) Privatperson als Empfänger:** Ort ist der Sitz des leistenden Unternehmers (§ 3a Abs. 1 S. 1 UStG) → Hamburg, steuerbar und steuerpflichtig.",
        "**Merke:** Immer zuerst die Sonderregeln des § 3a Abs. 3 UStG prüfen, dann die Grundregeln.",
      ],
    },
  ],

  "ust-entgelt": [
    {
      titel: "Die Versicherung zahlt für verbrannte Ware",
      sv: "Unternehmer U hat Ware für 1.000 € zuzüglich 190 € an Kunde K verkauft. Vor dem Versand verbrennt die Ware in seinem Lager. Die Versicherung zahlt U 1.000 €.",
      aufgabe: "Zu beurteilen ist U.",
      loesung: [
        "**Obersatz:** Ein nach § 1 Abs. 1 Nr. 1 UStG steuerbarer Umsatz setzt eine Lieferung oder sonstige Leistung des Unternehmers gegen Entgelt voraus.",
        "**Leistung an K?** U hat K keine Verfügungsmacht verschafft (§ 3 Abs. 1 UStG) – die Ware ist zerstört.",
        "**Leistung an die Versicherung?** U hat der Versicherung nichts zugewendet. Die Zahlung ist echter Schadensersatz und keine Gegenleistung für eine Leistung (kein Leistungsaustausch).",
        "**Ergebnis:** Für U fehlt es an einer Leistung im umsatzsteuerrechtlichen Sinn → kein steuerbarer Umsatz. (Nicht: „steuerfrei nach § 4 UStG“ – eine Befreiung setzt Steuerbarkeit voraus.)",
      ],
    },
    {
      titel: "„Miete“ an sich selbst",
      sv: "Ladeninhaberin T ist Eigentümerin eines Geschäftshauses. Das Erdgeschoss nutzt sie für ihr eigenes Geschäft und überweist dafür monatlich 1.000 € „Miete“ von ihrem Geschäftskonto auf ihr Vermietungskonto. Die übrigen Etagen vermietet sie.",
      loesung: [
        "**Unternehmenseinheit:** Laden und Vermietung gehören zu **einem** Unternehmen der T (§ 2 Abs. 1 S. 2 UStG).",
        "**Kein Leistungsaustausch:** Ein Leistungsaustausch setzt zwei verschiedene Beteiligte voraus. T kann an sich selbst nichts leisten.",
        "**Ergebnis:** Die Nutzung des Erdgeschosses ist ein **nicht steuerbarer Innenumsatz**; die Umbuchung ist umsatzsteuerlich bedeutungslos.",
      ],
    },
  ],

  "ust-befreiung": [
    {
      titel: "Geschäftshaus mit drei Mietern",
      sv: "Vermieter V vermietet in seinem Geschäftshaus in Kiel ab Januar: das Erdgeschoss an einen Versicherungsvertreter (2.000 € im Monat), das Obergeschoss an eine Rechtsanwältin (1.500 € zuzüglich gesetzlicher USt) und einen Stellplatz an einen privaten Nachbarn (50 €). Die Anwältin führt nur steuerpflichtige Umsätze aus. V möchte das steuerlich optimale Ergebnis.",
      loesung: [
        "**Steuerbarkeit:** V ist Unternehmer (§ 2 Abs. 1 UStG); die Vermietungen sind sonstige Leistungen (§ 3 Abs. 9 UStG) gegen Entgelt, Ort ist die Lage des Grundstücks in Kiel (§ 3a Abs. 3 Nr. 1 S. 2 a UStG) → steuerbar nach § 1 Abs. 1 Nr. 1 UStG.",
        "**Versicherungsvertreter:** Vermietung von Grundstücken ist steuerfrei (§ 4 Nr. 12 S. 1 a UStG). Option scheidet aus: Der Mieter führt ausschließlich steuerfreie Umsätze aus (§ 4 Nr. 11 UStG), die den Vorsteuerabzug ausschließen (§ 9 Abs. 2 S. 1 UStG). BMG 2.000 € monatlich, steuerfrei; Anmeldung im jeweiligen VAZ.",
        "**Rechtsanwältin:** Ebenfalls steuerfrei nach § 4 Nr. 12 S. 1 a UStG, aber V kann verzichten: Umsatz an eine Unternehmerin für deren Unternehmen (§ 9 Abs. 1 UStG) und diese verwendet die Räume für Umsätze, die den Vorsteuerabzug nicht ausschließen (§ 9 Abs. 2 S. 1 UStG). Mit Option: BMG 1.500 €, USt 285 € monatlich (§ 12 Abs. 1 UStG), Entstehung mit Ablauf des jeweiligen Monats (§ 13 Abs. 1 Nr. 1 a S. 2, 3 UStG).",
        "**Stellplatz:** Die Vermietung von Plätzen zum Abstellen von Fahrzeugen ist von der Befreiung ausgenommen (§ 4 Nr. 12 S. 2 UStG) → steuerpflichtig: 50 € ÷ 1,19 = 42,02 €, USt 7,98 €.",
        "**Vorsteuer:** Eingangsleistungen für das Gebäude sind nur abziehbar, soweit sie auf die steuerpflichtigen Umsätze entfallen; aufzuteilen nach § 15 Abs. 4 UStG (i. d. R. nach Flächen).",
      ],
    },
    {
      titel: "Steuerfrei oder steuerpflichtig? Leistungen einer Ärztin",
      sv: "Ärztin Ä erbringt: (1) Vorsorgeuntersuchung, (2) Gutachten über den Gesundheitszustand für eine private Lebensversicherung, (3) Wurmkur für ihren Praxishund – abgerechnet an eine Bekannte, die den Hund hält, (4) Schmerzmittel, das während einer Behandlung verabreicht und mit abgerechnet wird.",
      loesung: [
        "**Maßstab:** Steuerfrei sind Heilbehandlungen im Bereich der Humanmedizin im Rahmen der Tätigkeit als Arzt (§ 4 Nr. 14 a S. 1 UStG). Entscheidend ist ein **therapeutisches Ziel** (Diagnose, Behandlung, Vorbeugung).",
        "**(1) Vorsorgeuntersuchung:** dient der Vorbeugung → steuerfrei.",
        "**(2) Gutachten für Lebensversicherung:** dient der Risikoeinschätzung der Versicherung, nicht der Gesundheit des Patienten → steuerpflichtig.",
        "**(3) Behandlung eines Tieres:** keine Humanmedizin → steuerpflichtig.",
        "**(4) Medikament:** unselbständige Nebenleistung zur Heilbehandlung → teilt deren Schicksal, steuerfrei.",
        "**Vorsteuer:** Für Eingangsleistungen, die für die steuerfreien Heilbehandlungen verwendet werden, ist der Vorsteuerabzug ausgeschlossen (§ 15 Abs. 2 S. 1 Nr. 1 UStG).",
      ],
    },
    {
      titel: "Ferienwohnung mit Anzahlung",
      sv: "Unternehmer V vermietet seine Ferienwohnung in Lübeck vom 20.05. bis 05.06. an Gäste aus Frankreich für 1.605 €. Die Gäste zahlen am 15.04. 1.070 € an, den Rest erst am 10.07. zusammen mit 30 € Mahngebühren.",
      loesung: [
        "**Steuerbarkeit:** sonstige Leistung (§ 3 Abs. 9 UStG), Ort am Grundstück in Lübeck (§ 3a Abs. 3 Nr. 1 S. 2 a UStG) → steuerbar (§ 1 Abs. 1 Nr. 1 UStG); die Herkunft der Gäste ist unerheblich.",
        "**Steuerpflicht:** Die kurzfristige Vermietung von Wohnräumen zur Beherbergung ist von der Befreiung ausgenommen (§ 4 Nr. 12 S. 2 UStG) → steuerpflichtig mit **7 %** (§ 12 Abs. 2 Nr. 11 UStG).",
        "**BMG:** 1.605 € ÷ 1,07 = 1.500 €, USt 105 € (§ 10 Abs. 1 S. 1, 2 UStG).",
        "**Entstehung:** Anzahlung: 1.070 € × 7/107 = 70 € mit Ablauf des VAZ April (§ 13 Abs. 1 Nr. 1 a S. 4 UStG). Rest 35 € mit Ablauf des VAZ Juni, in dem die Leistung vollendet ist (§ 13 Abs. 1 Nr. 1 a S. 1 UStG) – die spätere Zahlung im Juli ist unerheblich.",
        "**Mahngebühren:** Schadensersatz, kein Entgelt → nicht steuerbar.",
      ],
    },
  ],

  "ust-bmg": [
    {
      titel: "Einkauf am Kiosk",
      sv: "Kioskbetreiber K verkauft am 10.06. an einen Kunden: Apfelsaft 2,38 €, Tageszeitung 2,14 €, Kekse 3,21 €. Der Kunde zahlt 7,73 € bar und erhält keine Rechnung.",
      loesung: [
        "**Steuerbarkeit:** drei Lieferungen (§ 3 Abs. 1 UStG) im Inland gegen Entgelt → steuerbar nach § 1 Abs. 1 Nr. 1 UStG, steuerpflichtig.",
        "**Apfelsaft:** Getränke sind (außer Milch und Milchmischgetränken) nicht in Anlage 2 begünstigt → 19 % (§ 12 Abs. 1 UStG): BMG 2,00 €, USt 0,38 €.",
        "**Tageszeitung:** 7 % (§ 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2): BMG 2,00 €, USt 0,14 €.",
        "**Kekse:** Lebensmittel, 7 % (§ 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2): BMG 3,00 €, USt 0,21 €.",
        "**Rechenweg:** Die Steuer wird aus dem Gesamtaufwand herausgerechnet, weil das Entgelt ohne USt die BMG ist (§ 10 Abs. 1 S. 2 UStG). Entstehung mit Ablauf VAZ Juni (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
      ],
    },
    {
      titel: "Verkauf unter Einkaufspreis an den Bruder",
      sv: "Unternehmer U verkauft seinem Bruder eine Spülmaschine aus dem Warenbestand für 357 € brutto. Der aktuelle Einkaufspreis beträgt 500 € netto; im Laden kostet sie 714 € brutto.",
      loesung: [
        "**Grundsatz:** BMG ist das Entgelt (§ 10 Abs. 1 S. 1 UStG): 357 € ÷ 1,19 = 300 €.",
        "**Mindestbemessungsgrundlage:** Bei Lieferungen an nahestehende Personen ist mindestens der Wert nach § 10 Abs. 4 UStG anzusetzen, wenn dieser das Entgelt übersteigt (§ 10 Abs. 5 S. 1 Nr. 1 UStG). Nach § 10 Abs. 4 S. 1 Nr. 1 UStG ist das der Einkaufspreis im Zeitpunkt des Umsatzes = 500 €. Begrenzt wird die Mindest-BMG auf das marktübliche Entgelt (600 € netto) – das ist hier nicht überschritten.",
        "**Ergebnis:** BMG 500 €, USt 95 € (§ 12 Abs. 1 UStG).",
      ],
    },
    {
      titel: "Essen und Getränke im Restaurant",
      sv: "Gastwirt G berechnet einem Gast für ein Menü 32,10 € und für Getränke 17,85 €, insgesamt 49,95 €, Verzehr im Lokal.",
      loesung: [
        "**Art und Ort:** Restaurantleistung = sonstige Leistung (§ 3 Abs. 9 UStG), Ort dort, wo sie tatsächlich erbracht wird (§ 3a Abs. 3 Nr. 3 b UStG) → Inland, steuerbar und steuerpflichtig.",
        "**Steuersatz:** Restaurant- und Verpflegungsdienstleistungen sind seit 2026 dauerhaft ermäßigt (§ 12 Abs. 2 Nr. 15 UStG) – **mit Ausnahme der Abgabe von Getränken**.",
        "**Speisen:** 32,10 € ÷ 1,07 = 30 €, USt 2,10 €. **Getränke:** 17,85 € ÷ 1,19 = 15 €, USt 2,85 € (§ 12 Abs. 1 UStG).",
      ],
    },
  ],

  "ust-entstehung": [
    {
      titel: "Ratenkauf mit Anzahlung und Eigentumsvorbehalt",
      sv: "Händlerin H verkauft am 28.03. an Bauunternehmer B 50 Tischdecken für insgesamt 11.900 € brutto unter Eigentumsvorbehalt. B zahlt am 31.03. 2.380 € an, der Rest in Raten von Mai bis August; die letzte Rate zahlt er erst nach Mahnung mit 100 € Mahngebühren. Die Ware wird am 03.04. von einem Spediteur in H's Lager in Celle abgeholt und an B geliefert.",
      aufgabe: "Zu beurteilen ist H.",
      loesung: [
        "**Lieferung:** H verschafft B mit der Übergabe die Verfügungsmacht (§ 3 Abs. 1 UStG); der Eigentumsvorbehalt (§ 449 BGB) steht dem nicht entgegen. Versendung durch Spediteur → Ort Celle, wo die Versendung beginnt (§ 3 Abs. 6 S. 1, 3 UStG); Lieferzeitpunkt 03.04. Steuerbar und steuerpflichtig.",
        "**BMG:** 11.900 € ÷ 1,19 = 10.000 € (§ 10 Abs. 1 S. 1, 2 UStG), USt 1.900 € (§ 12 Abs. 1 UStG).",
        "**Anzahlung:** Wird das Entgelt vor der Leistung vereinnahmt, entsteht die Steuer insoweit mit Ablauf des VAZ der Vereinnahmung (§ 13 Abs. 1 Nr. 1 a S. 4 UStG): 2.380 € × 19/119 = **380 € im VAZ März**.",
        "**Rest:** Die übrige Steuer entsteht mit Ablauf des VAZ, in dem die Lieferung ausgeführt wurde (§ 13 Abs. 1 Nr. 1 a S. 1 UStG): 1.900 € − 380 € = **1.520 € im VAZ April**. Die späteren Raten lösen keine Steuer mehr aus.",
        "**Mahngebühren:** Schadensersatz, kein Entgelt für die Lieferung → nicht steuerbar.",
      ],
    },
    {
      titel: "Skonto im Folgemonat und Zahlungsausfall",
      sv: "Großhändler G liefert am 20.01. Waren für 11.900 € brutto an Einzelhändler E. E zahlt am 05.02. unter Abzug von 2 % Skonto. Eine weitere Forderung über 2.380 € brutto aus Dezember wird im März wegen Insolvenz des Kunden endgültig uneinbringlich.",
      loesung: [
        "**Lieferung Januar:** BMG 10.000 €, USt 1.900 €, Entstehung mit Ablauf VAZ Januar (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
        "**Skonto:** Die BMG ändert sich in einem späteren VAZ → Berichtigung nach § 17 Abs. 1 S. 1 UStG im VAZ Februar: Skonto 238 € brutto → BMG-Minderung 200 €, USt-Minderung 38 €. E muss seine Vorsteuer im Februar entsprechend um 38 € berichtigen (§ 17 Abs. 1 S. 2 UStG).",
        "**Uneinbringlichkeit:** Wird das Entgelt uneinbringlich, ist die Steuer zu berichtigen (§ 17 Abs. 2 Nr. 1 UStG) → im VAZ März 380 € weniger USt. Geht später doch Geld ein, ist erneut zu berichtigen.",
        "**Merke:** Bloßer Zahlungsverzug genügt nicht; die Forderung muss endgültig nicht durchsetzbar sein.",
      ],
    },
  ],

  "ust-vorsteuer": [
    {
      titel: "Falscher Steuersatz und Rechnung kommt später",
      sv: "Kioskbetreiber K bestellt am 20.07. Cola für seinen Verkauf, bezahlt sofort und erhält die Ware am 30.07. Die Rechnung vom 05.08. lautet: Cola 300 €, USt 7 % 21 €, gesamt 321 €. Am 20.09. erhält er eine Registrierkasse mit Rechnung: Kasse 400 €, USt 100 €, gesamt 500 €; er zahlt am 05.10.",
      aufgabe: "Ermitteln Sie die abziehbare Vorsteuer des K.",
      loesung: [
        "**Voraussetzungen (§ 15 Abs. 1 S. 1 Nr. 1 UStG):** K ist Unternehmer und bezieht beide Leistungen von anderen Unternehmern für sein Unternehmen; es liegen Rechnungen vor (§§ 14, 14a UStG). Abziehbar ist nur die **gesetzlich geschuldete** Steuer, höchstens die ausgewiesene.",
        "**Cola:** Getränk → gesetzlich 19 % = 57 €; ausgewiesen sind nur 21 € → Vorsteuer **21 €**. Zeitpunkt: Leistung (30.07.) **und** Rechnung müssen vorliegen → **VAZ August** (Rechnung 05.08.). Die frühere Zahlung ändert daran nichts, da bei Zahlung noch keine Rechnung vorlag.",
        "**Registrierkasse:** Gesetzlich geschuldet ist 500 € × 19/119 = **79,83 €** (Entgelt 420,17 €). Abziehbar nur 79,83 € im **VAZ September** (Lieferung und Rechnung am 20.09.); die Zahlung im Oktober ist unerheblich. Den zu viel ausgewiesenen Betrag von 20,17 € schuldet der Lieferant nach § 14c Abs. 1 UStG – K kann ihn nicht abziehen.",
      ],
    },
    {
      titel: "Arztpraxis kauft Liegen",
      sv: "Ärztin Ä kauft für ihre Praxis zwei Untersuchungsliegen (Rechnung: 800 € zzgl. 152 € USt, erhalten am 20.02.). Ein ausschließlich in der Praxis genutztes altes Gerät verkauft sie im April für 4.000 € an einen Kollegen.",
      loesung: [
        "**Liegen:** Grundsätzlich liegen die Voraussetzungen des § 15 Abs. 1 S. 1 Nr. 1 UStG vor. Der Vorsteuerabzug ist aber ausgeschlossen, weil Ä die Liegen für steuerfreie Heilbehandlungen (§ 4 Nr. 14 a UStG) verwendet (§ 15 Abs. 2 S. 1 Nr. 1 UStG). Eine Rückausnahme nach § 15 Abs. 3 UStG greift nicht → **keine Vorsteuer**.",
        "**Verkauf des Geräts:** Hilfsgeschäft im Rahmen des Unternehmens, Lieferung im Inland gegen Entgelt → steuerbar (§ 1 Abs. 1 Nr. 1 UStG). Steuerfrei nach § 4 Nr. 28 UStG, weil das Gerät ausschließlich für steuerfreie Tätigkeiten nach § 4 Nr. 14 UStG verwendet wurde. BMG 4.000 € (§ 10 Abs. 1 UStG), anzugeben im VAZ April.",
      ],
    },
    {
      titel: "Teure Kundengeschenke",
      sv: "Unternehmer U kauft im Dezember 20 Weinkisten zu je 100 € zzgl. 19 € USt und schenkt sie Geschäftskunden.",
      loesung: [
        "**Vorsteuerausschluss:** Kein Abzug für Aufwendungen, für die das Abzugsverbot des § 4 Abs. 5 S. 1 Nr. 1 EStG gilt (§ 15 Abs. 1a S. 1 UStG). Geschenke an Geschäftsfreunde sind nur abziehbar, wenn sie je Empfänger und Jahr 50 € nicht übersteigen. 100 € > 50 € → **keine Vorsteuer** (380 €).",
        "**Keine Wertabgabe:** Die spätere Schenkung ist keine steuerbare unentgeltliche Wertabgabe, weil die Weinkisten nicht zum Vorsteuerabzug berechtigt haben (§ 3 Abs. 1b S. 2 UStG).",
      ],
    },
  ],

  "ust-wertabgabe": [
    {
      titel: "Warenentnahme aus dem eigenen Laden",
      sv: "Kioskbetreiber K nimmt im Mai für seine Familienfeier Getränke (aktueller Einkaufspreis 40 € netto, ursprünglich gekauft für 36 €) und Zeitschriften (10 € netto) aus seinem Kiosk mit.",
      loesung: [
        "**Tatbestand:** Entnahme eines Gegenstands aus dem Unternehmen für Zwecke außerhalb des Unternehmens → einer entgeltlichen Lieferung gleichgestellt (§ 3 Abs. 1b S. 1 Nr. 1 UStG). Die Waren haben zum vollen Vorsteuerabzug berechtigt (§ 3 Abs. 1b S. 2 UStG).",
        "**Ort:** wie bei einer entgeltlichen Lieferung im Inland → steuerbar nach § 1 Abs. 1 Nr. 1 UStG.",
        "**BMG:** Einkaufspreis zuzüglich Nebenkosten **im Zeitpunkt des Umsatzes** (§ 10 Abs. 4 S. 1 Nr. 1 UStG) → 40 € (nicht 36 €) und 10 €.",
        "**Steuer:** Getränke 19 % = 7,60 € (§ 12 Abs. 1 UStG); Zeitschriften 7 % = 0,70 € (§ 12 Abs. 2 Nr. 1 UStG).",
        "**Entstehung:** mit Ablauf des VAZ Mai (§ 13 Abs. 1 Nr. 2 UStG).",
      ],
    },
    {
      titel: "Firmenwagen auch privat genutzt",
      sv: "Unternehmer U nutzt seinen voll dem Unternehmen zugeordneten Pkw (Bruttolistenpreis 40.000 €, Vorsteuer aus dem Kauf voll abgezogen) auch privat. Ein Fahrtenbuch führt er nicht.",
      loesung: [
        "**Tatbestand:** Verwendung eines dem Unternehmen zugeordneten Gegenstands für Zwecke außerhalb des Unternehmens, der zum Vorsteuerabzug berechtigt hat → einer sonstigen Leistung gegen Entgelt gleichgestellt (§ 3 Abs. 9a Nr. 1 UStG).",
        "**BMG:** die auf die Privatnutzung entfallenden Ausgaben, soweit sie zum Vorsteuerabzug berechtigt haben (§ 10 Abs. 4 S. 1 Nr. 2 UStG). Vereinfachend: 1 % des Listenpreises je Monat = 400 €, davon 20 % Abschlag für nicht vorsteuerbelastete Kosten → 320 € monatlich, 3.840 € im Jahr.",
        "**Steuer:** 19 % = 60,80 € monatlich (729,60 € im Jahr), Entstehung jeweils mit Ablauf des VAZ (§ 13 Abs. 1 Nr. 2 UStG).",
      ],
    },
  ],

  "ust-sonder": [
    {
      titel: "Kleinunternehmerin weist Steuer aus",
      sv: "Grafikerin G hatte im Vorjahr 22.000 € Umsatz, im laufenden Jahr erwartet sie 30.000 €. Sie hat nicht auf die Kleinunternehmerregelung verzichtet. Einem Kunden stellt sie trotzdem 1.000 € zzgl. 190 € USt in Rechnung.",
      loesung: [
        "**Kleinunternehmerin:** Vorjahresumsatz nicht über 25.000 € und laufendes Jahr nicht über 100.000 € → ihre Umsätze sind steuerfrei (§ 19 Abs. 1 UStG); einen Vorsteuerabzug hat sie nicht.",
        "**Unberechtigter Steuerausweis:** Wer in einer Rechnung Steuer gesondert ausweist, obwohl er dazu nicht berechtigt ist, schuldet den ausgewiesenen Betrag (§ 14c Abs. 2 UStG) → G schuldet 190 €; Entstehung mit Ausgabe der Rechnung (§ 13 Abs. 1 Nr. 4 UStG). Eine Berichtigung ist möglich.",
        "**Kunde:** kein Vorsteuerabzug, da die Steuer nicht für den Umsatz gesetzlich geschuldet ist (§ 15 Abs. 1 S. 1 Nr. 1 UStG).",
      ],
    },
    {
      titel: "Reihengeschäft",
      sv: "Einzelhändler A (Hamburg) bestellt eine Maschine bei Großhändler B (München). B bestellt sie bei Hersteller C (Leipzig). C transportiert die Maschine mit eigenem Lkw direkt von Leipzig zu A.",
      loesung: [
        "**Reihengeschäft:** Mehrere Unternehmer schließen über denselben Gegenstand Liefergeschäfte ab und der Gegenstand gelangt unmittelbar vom ersten Lieferer zum letzten Abnehmer (§ 3 Abs. 6a S. 1 UStG).",
        "**Bewegte Lieferung:** Befördert der erste Unternehmer (C), ist die Beförderung seiner Lieferung zuzuordnen (§ 3 Abs. 6a S. 2 UStG) → C an B ist die bewegte Lieferung, Ort Leipzig (§ 3 Abs. 6 S. 1 UStG).",
        "**Ruhende Lieferung:** B an A folgt der Beförderung → Ort dort, wo die Beförderung endet: Hamburg (§ 3 Abs. 7 S. 2 Nr. 2 UStG).",
        "**Ergebnis:** Beide Lieferungen sind im Inland steuerbar und steuerpflichtig. Tipp: Für jede Reihe zuerst eine Skizze zeichnen.",
      ],
    },
  ],
};
