// Klausurbeispiele Umsatzsteuer: eigener Sachverhalt im Stil der Semesterklausuren und Musterlösung im Urteilsstil
// wie in den Lösungshinweisen (Ergebnis zuerst, Begründung mit „da …“, kein Obersatz). Prüfungsreihenfolge:
// Leistung – Ort – Steuerbarkeit – Steuerpflicht – Steuersatz – BMG – Entstehung. Kein Klausurtext übernommen.
// Format: { titel, sv, aufgabe, loesung: [Absätze] }. Rechtsstand 2026; VAZ = Kalendermonat, Soll-Versteuerung.

export const BEISPIELE_UST = {
  "ust-grundlagen": [
    {
      titel: "Klausureinleitung: Unternehmer und Unternehmen",
      sv: "Dr. Pia Prager (P) betreibt in Bremen eine Hausarztpraxis. Außerdem vermietet sie eine Ferienwohnung in Lübeck an wechselnde Gäste.",
      aufgabe: "Beurteilen Sie die Unternehmereigenschaft der P.",
      loesung: [
        "P ist Unternehmerin gem. § 2 Abs. 1 S. 1 und 3 UStG, da sie die Praxis und die Vermietung selbständig und nachhaltig zur Erzielung von Einnahmen betreibt.",
        "Beide Tätigkeiten bilden ein Unternehmen (§ 2 Abs. 1 S. 2 UStG, Abschn. 2.7 Abs. 1 UStAE).",
      ],
    },
    {
      titel: "Ehepaar vermietet gemeinsam",
      sv: "Die Eheleute K und L sind gemeinsam Eigentümer eines Hauses. Sie vermieten Räume an eine Physiotherapeutin und eine Wohnung an ein Rentnerpaar; die Miete geht auf ein gemeinsames Konto.",
      aufgabe: "Wer ist umsatzsteuerlich Unternehmer?",
      loesung: [
        "Unternehmerin ist die Ehegattengemeinschaft (GbR) aus K und L gem. § 2 Abs. 1 S. 1 und 3 UStG, da sie nach außen gemeinsam als Vermieterin auftritt und nachhaltig Einnahmen erzielt. K und L sind insoweit nicht selbst Unternehmer.",
      ],
    },
    {
      titel: "Einmaliger Verkauf durch eine Privatperson",
      sv: "Rentnerin R verkauft einmalig einen selbst gestrickten Pullover für 120 € an die Inhaberin eines Modegeschäfts. Sie stellt eine Quittung mit dem Vermerk „inkl. 19 % MwSt.“ aus.",
      loesung: [
        "R ist keine Unternehmerin, da ein einmaliger Verkauf nicht nachhaltig ist (§ 2 Abs. 1 S. 3 UStG). Der Verkauf ist nicht steuerbar (§ 1 Abs. 1 Nr. 1 UStG).",
        "Wegen des Steuerausweises schuldet R die Steuer nach § 14c Abs. 2 UStG. Die Käuferin hat keinen Vorsteuerabzug (§ 15 Abs. 1 S. 1 Nr. 1 UStG).",
      ],
    },
  ],

  "ust-leistung": [
    {
      titel: "Präsentkorb zum Gesamtpreis",
      sv: "Im Bioladen der Ute U in Hannover stellt ein Kunde am 12.03. einen Präsentkorb für insgesamt 150 € zusammen: Rotwein 27 €, Wollsocken 23 €, Salami 18 €, Bergkäse 27 €, Apfelsaft 5 €, Kaffeebohnen 26 €, Weidenkorb 24 €. Er zahlt mit Karte und nimmt den Korb mit.",
      aufgabe: "Zu beurteilen ist U.",
      loesung: [
        "U ist Unternehmerin (§ 2 Abs. 1 UStG). Sie führt mehrere Lieferungen aus (§ 3 Abs. 1 UStG), da jeder Gegenstand selbständig ist; der Weidenkorb ist wegen seines eigenen Gebrauchswerts keine Verpackung. Der Gesamtpreis ist nach den Einzelpreisen aufzuteilen.",
        "Ort ist Hannover (§ 3 Abs. 6 S. 1 UStG, Beförderung durch den Abnehmer). Die Lieferungen sind steuerbar (§ 1 Abs. 1 Nr. 1 UStG) und steuerpflichtig.",
        "7 % (§ 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2) für Salami, Käse, Kaffee = 71 €: BMG 66,36 € (§ 10 Abs. 1 S. 1, 2 UStG), USt 4,64 €.",
        "19 % (§ 12 Abs. 1 UStG) für Wein, Saft, Socken, Korb = 79 €: BMG 66,39 €, USt 12,61 €.",
        "Die Steuer entsteht mit Ablauf des VAZ März (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
      ],
    },
    {
      titel: "Maßanzug und Hosenänderung",
      sv: "Schneider S fertigt für einen Kunden einen Maßanzug aus eigenem Stoff (1.190 €) und kürzt für einen anderen Kunden eine mitgebrachte Hose (23,80 €).",
      loesung: [
        "Maßanzug: Werklieferung (§ 3 Abs. 4 S. 1 UStG), da S den Hauptstoff selbst beschafft. BMG 1.000 €, USt 190 € (§ 10 Abs. 1, § 12 Abs. 1 UStG).",
        "Hosenänderung: Werkleistung = sonstige Leistung (§ 3 Abs. 9 S. 1 UStG), da der Kunde den Hauptstoff stellt. BMG 20 €, USt 3,80 €.",
      ],
    },
  ],

  "ust-ort": [
    {
      titel: "Versand per Paketdienst mit Versandpauschale",
      sv: "Händlerin H aus Hannover verkauft am 29.05. einen Wollmantel über ihren Onlineshop an eine Privatkundin in München: 150 € zuzüglich 15 € Versandpauschale. Am 30.05. übergibt H das Paket an DHL; es kommt am 01.06. an.",
      aufgabe: "Zu beurteilen ist H.",
      loesung: [
        "H führt eine Lieferung aus (§ 3 Abs. 1 UStG). Der Versand ist eine unselbständige Nebenleistung (Abschn. 3.10 Abs. 5 UStAE).",
        "Da H den Mantel durch DHL versendet (§ 3 Abs. 6 S. 3 UStG), gilt die Lieferung mit Beginn der Versendung in Hannover als ausgeführt (§ 3 Abs. 6 S. 1 UStG). Steuerbar (§ 1 Abs. 1 Nr. 1 UStG) und steuerpflichtig.",
        "BMG 165 € ÷ 1,19 = 138,66 € (§ 10 Abs. 1 S. 1, 2 UStG), USt 26,34 € (§ 12 Abs. 1 UStG).",
        "Die Steuer entsteht mit Ablauf des VAZ Mai (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
      ],
    },
    {
      titel: "Drei Beratungsleistungen – drei Orte",
      sv: "Architektin A aus Hamburg (1) berät einen dänischen Bauunternehmer für dessen Unternehmen, (2) berät eine dänische Privatperson zu Einrichtungsfragen ohne Grundstücksbezug und (3) plant für einen Österreicher ein Ferienhaus auf Sylt.",
      loesung: [
        "Alle drei Leistungen sind sonstige Leistungen (§ 3 Abs. 9 S. 1 UStG).",
        "(1) Ort beim Empfänger in Dänemark (§ 3a Abs. 2 S. 1 UStG) → nicht steuerbar.",
        "(2) Ort am Sitz der A in Hamburg (§ 3a Abs. 1 S. 1 UStG) → steuerbar und steuerpflichtig.",
        "(3) Ort am Grundstück auf Sylt (§ 3a Abs. 3 Nr. 1 S. 2 c UStG) → steuerbar und steuerpflichtig.",
      ],
    },
  ],

  "ust-entgelt": [
    {
      titel: "Die Versicherung zahlt für verbrannte Ware",
      sv: "Unternehmer U hat Ware für 1.000 € zuzüglich 190 € an Kunde K verkauft. Vor dem Versand verbrennt die Ware in seinem Lager. Die Versicherung zahlt U 1.000 €.",
      aufgabe: "Zu beurteilen ist U.",
      loesung: [
        "U führt an K keine Lieferung aus, da er ihm keine Verfügungsmacht verschafft (§ 3 Abs. 1 UStG). Die Zahlung der Versicherung ist echter Schadensersatz ohne Leistungsaustausch (Abschn. 1.3 Abs. 1 UStAE) → nicht steuerbar.",
      ],
    },
    {
      titel: "„Miete“ an sich selbst",
      sv: "Ladeninhaberin T ist Eigentümerin eines Geschäftshauses. Das Erdgeschoss nutzt sie für ihr eigenes Geschäft und überweist dafür monatlich 1.000 € „Miete“ von ihrem Geschäftskonto auf ihr Vermietungskonto. Die übrigen Etagen vermietet sie.",
      loesung: [
        "Laden und Vermietung bilden ein Unternehmen (§ 2 Abs. 1 S. 2 UStG). Die Nutzung des Erdgeschosses ist ein nicht steuerbarer Innenumsatz (Abschn. 2.7 Abs. 1 UStAE).",
      ],
    },
  ],

  "ust-befreiung": [
    {
      titel: "Geschäftshaus mit drei Mietern",
      sv: "Vermieter V vermietet in seinem Geschäftshaus in Kiel ab Januar: das Erdgeschoss an einen Versicherungsvertreter (2.000 € im Monat), das Obergeschoss an eine Rechtsanwältin (1.500 € zuzüglich gesetzlicher USt) und einen Stellplatz an einen privaten Nachbarn (50 €). Die Anwältin führt nur steuerpflichtige Umsätze aus. V möchte das steuerlich optimale Ergebnis.",
      loesung: [
        "V führt sonstige Leistungen aus (§ 3 Abs. 9 UStG), Ort ist Kiel (§ 3a Abs. 3 Nr. 1 S. 2 a UStG) → steuerbar (§ 1 Abs. 1 Nr. 1 UStG).",
        "Versicherungsvertreter: steuerfrei (§ 4 Nr. 12 S. 1 a UStG). Eine Option scheidet aus, da der Mieter nur steuerfreie Umsätze ausführt (§ 4 Nr. 11, § 9 Abs. 2 S. 1 UStG).",
        "Rechtsanwältin: steuerfrei, V verzichtet aber nach § 9 Abs. 1, 2 UStG. BMG 1.500 €, USt 285 € monatlich (§ 12 Abs. 1 UStG); Entstehung mit Ablauf des jeweiligen Monats (§ 13 Abs. 1 Nr. 1 a S. 2, 3 UStG).",
        "Stellplatz: steuerpflichtig (§ 4 Nr. 12 S. 2 UStG). BMG 42,02 €, USt 7,98 €.",
      ],
    },
    {
      titel: "Steuerfrei oder steuerpflichtig? Leistungen einer Ärztin",
      sv: "Ärztin Ä erbringt: (1) Vorsorgeuntersuchung, (2) Gutachten über den Gesundheitszustand für eine private Lebensversicherung, (3) Wurmkur für einen Hund einer Bekannten, (4) Schmerzmittel, das während einer Behandlung verabreicht und mit abgerechnet wird.",
      loesung: [
        "(1) Steuerfrei (§ 4 Nr. 14 a S. 1 UStG), da die Untersuchung der Vorbeugung dient.",
        "(2) Steuerpflichtig, da kein therapeutisches Ziel vorliegt (Abschn. 4.14.1 Abs. 5 UStAE).",
        "(3) Steuerpflichtig, da keine Humanmedizin.",
        "(4) Steuerfrei als Nebenleistung zur Heilbehandlung (Abschn. 3.10 Abs. 5 UStAE).",
      ],
    },
    {
      titel: "Ferienwohnung mit Anzahlung",
      sv: "Unternehmer V vermietet seine Ferienwohnung in Lübeck vom 20.05. bis 05.06. an Gäste aus Frankreich für 1.605 €. Die Gäste zahlen am 15.04. 1.070 € an, den Rest erst am 10.07. zusammen mit 30 € Mahngebühren.",
      loesung: [
        "V führt eine sonstige Leistung aus (§ 3 Abs. 9 UStG), Ort ist Lübeck (§ 3a Abs. 3 Nr. 1 S. 2 a UStG) → steuerbar. Steuerpflichtig, da kurzfristige Beherbergung (§ 4 Nr. 12 S. 2 UStG), Steuersatz 7 % (§ 12 Abs. 2 Nr. 11 UStG).",
        "BMG 1.500 €, USt 105 € (§ 10 Abs. 1 S. 1, 2 UStG).",
        "Anzahlung: 70 € USt mit Ablauf des VAZ April (§ 13 Abs. 1 Nr. 1 a S. 4 UStG). Rest: 35 € mit Ablauf des VAZ Juni (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
        "Die Mahngebühren sind Schadensersatz → nicht steuerbar (Abschn. 1.3 Abs. 6 UStAE).",
      ],
    },
  ],

  "ust-bmg": [
    {
      titel: "Einkauf am Kiosk",
      sv: "Kioskbetreiber K verkauft am 10.06. an einen Kunden: Apfelsaft 2,38 €, Tageszeitung 2,14 €, Kekse 3,21 €. Der Kunde zahlt 7,73 € bar und erhält keine Rechnung.",
      loesung: [
        "K führt drei steuerbare und steuerpflichtige Lieferungen aus (§ 1 Abs. 1 Nr. 1, § 3 Abs. 1 UStG).",
        "Apfelsaft: 19 % (§ 12 Abs. 1 UStG) → BMG 2,00 €, USt 0,38 €.",
        "Zeitung und Kekse: 7 % (§ 12 Abs. 2 Nr. 1 UStG i. V. m. Anlage 2) → BMG 2,00 € und 3,00 €, USt 0,14 € und 0,21 €.",
        "Entstehung mit Ablauf des VAZ Juni (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
      ],
    },
    {
      titel: "Verkauf unter Einkaufspreis an den Bruder",
      sv: "Unternehmer U verkauft seinem Bruder eine Spülmaschine aus dem Warenbestand für 357 € brutto. Der aktuelle Einkaufspreis beträgt 500 € netto; im Laden kostet sie 714 € brutto.",
      loesung: [
        "Das Entgelt beträgt 300 € (§ 10 Abs. 1 S. 1, 2 UStG). Da der Bruder eine nahestehende Person ist, gilt die Mindest-BMG (§ 10 Abs. 5 S. 1 Nr. 1 UStG): Einkaufspreis 500 € (§ 10 Abs. 4 S. 1 Nr. 1 UStG), höchstens das marktübliche Entgelt von 600 €.",
        "BMG 500 €, USt 95 € (§ 12 Abs. 1 UStG).",
      ],
    },
    {
      titel: "Essen und Getränke im Restaurant",
      sv: "Gastwirt G berechnet einem Gast für ein Menü 32,10 € und für Getränke 17,85 €, insgesamt 49,95 €, Verzehr im Lokal.",
      loesung: [
        "G erbringt eine sonstige Leistung (§ 3 Abs. 9 UStG), Ort ist das Lokal (§ 3a Abs. 3 Nr. 3a Buchst. a UStG) → steuerbar und steuerpflichtig.",
        "Speisen: 7 % (§ 12 Abs. 2 Nr. 15 UStG) → BMG 30 €, USt 2,10 €. Getränke sind ausgenommen: 19 % (§ 12 Abs. 1 UStG) → BMG 15 €, USt 2,85 €.",
      ],
    },
  ],

  "ust-entstehung": [
    {
      titel: "Ratenkauf mit Anzahlung und Eigentumsvorbehalt",
      sv: "Händlerin H verkauft am 28.03. an Bauunternehmer B 50 Tischdecken für insgesamt 11.900 € brutto unter Eigentumsvorbehalt. B zahlt am 31.03. 2.380 € an, der Rest in Raten von Mai bis August; die letzte Rate zahlt er erst nach Mahnung mit 100 € Mahngebühren. Die Ware wird am 03.04. von einem Spediteur in H's Lager in Celle abgeholt und an B geliefert.",
      aufgabe: "Zu beurteilen ist H.",
      loesung: [
        "H führt am 03.04. eine Lieferung aus (§ 3 Abs. 1 UStG); der Eigentumsvorbehalt steht nicht entgegen (Abschn. 3.1 Abs. 3 UStAE). Ort ist Celle (§ 3 Abs. 6 S. 1, 3 UStG) → steuerbar und steuerpflichtig.",
        "BMG 10.000 € (§ 10 Abs. 1 S. 1, 2 UStG), USt 1.900 € (§ 12 Abs. 1 UStG).",
        "Anzahlung: 380 € entstehen mit Ablauf des VAZ März (§ 13 Abs. 1 Nr. 1 a S. 4 UStG). Rest: 1.520 € mit Ablauf des VAZ April (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
        "Die Mahngebühren sind Schadensersatz → nicht steuerbar.",
      ],
    },
    {
      titel: "Skonto im Folgemonat und Zahlungsausfall",
      sv: "Großhändler G liefert am 20.01. Waren für 11.900 € brutto an Einzelhändler E. E zahlt am 05.02. unter Abzug von 2 % Skonto. Eine weitere Forderung über 2.380 € brutto aus Dezember wird im März wegen Insolvenz des Kunden endgültig uneinbringlich.",
      loesung: [
        "Lieferung: BMG 10.000 €, USt 1.900 €, Entstehung mit Ablauf des VAZ Januar (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
        "Skonto: Berichtigung im VAZ Februar (§ 17 Abs. 1 S. 1, 8 UStG) um 38 € USt; E berichtigt seine Vorsteuer entsprechend (§ 17 Abs. 1 S. 2 UStG).",
        "Uneinbringlichkeit: Berichtigung im VAZ März um 380 € (§ 17 Abs. 2 Nr. 1 UStG).",
      ],
    },
  ],

  "ust-vorsteuer": [
    {
      titel: "Falscher Steuersatz und Rechnung kommt später",
      sv: "Kioskbetreiber K bestellt am 20.07. Cola für seinen Verkauf, bezahlt sofort und erhält die Ware am 30.07. Die Rechnung vom 05.08. lautet: Cola 300 €, USt 7 % 21 €, gesamt 321 €. Am 20.09. erhält er eine Registrierkasse mit Rechnung: Kasse 400 €, USt 100 €, gesamt 500 €; er zahlt am 05.10.",
      aufgabe: "Ermitteln Sie die abziehbare Vorsteuer des K.",
      loesung: [
        "K bezieht beide Leistungen für sein Unternehmen und hat Rechnungen (§ 15 Abs. 1 S. 1 Nr. 1 UStG). Abziehbar ist nur die gesetzlich geschuldete Steuer, höchstens die ausgewiesene.",
        "Cola: gesetzlich 19 %, ausgewiesen 21 € → Vorsteuer 21 € im VAZ August, da erst dann die Rechnung vorliegt.",
        "Kasse: gesetzlich 79,83 € → Vorsteuer 79,83 € im VAZ September. Den Mehrbetrag schuldet der Lieferant (§ 14c Abs. 1 UStG).",
      ],
    },
    {
      titel: "Arztpraxis kauft Liegen",
      sv: "Ärztin Ä kauft für ihre Praxis zwei Untersuchungsliegen (Rechnung: 800 € zzgl. 152 € USt, erhalten am 20.02.). Ein ausschließlich in der Praxis genutztes altes Gerät verkauft sie im April für 4.000 € an einen Kollegen.",
      loesung: [
        "Liegen: kein Vorsteuerabzug, da Ä sie für steuerfreie Heilbehandlungen (§ 4 Nr. 14 a UStG) verwendet (§ 15 Abs. 2 S. 1 Nr. 1 UStG).",
        "Gerät: steuerbare Lieferung (Hilfsgeschäft, § 1 Abs. 1 Nr. 1 UStG), steuerfrei nach § 4 Nr. 28 UStG, da es nur für steuerfreie Umsätze verwendet wurde.",
      ],
    },
    {
      titel: "Teure Kundengeschenke",
      sv: "Unternehmer U kauft im Dezember 20 Weinkisten zu je 100 € zzgl. 19 € USt und schenkt sie Geschäftskunden.",
      loesung: [
        "Kein Vorsteuerabzug (380 €), da die Geschenke 50 € je Empfänger übersteigen (§ 15 Abs. 1a S. 1 UStG i. V. m. § 4 Abs. 5 S. 1 Nr. 1 EStG).",
        "Die Schenkung ist keine unentgeltliche Wertabgabe, da kein Vorsteuerabzug bestand (§ 3 Abs. 1b S. 2 UStG).",
      ],
    },
  ],

  "ust-wertabgabe": [
    {
      titel: "Warenentnahme aus dem eigenen Laden",
      sv: "Kioskbetreiber K nimmt im Mai für seine Familienfeier Getränke (aktueller Einkaufspreis 40 € netto, ursprünglich gekauft für 36 €) und Zeitschriften (10 € netto) aus seinem Kiosk mit.",
      loesung: [
        "Die Entnahme ist einer Lieferung gegen Entgelt gleichgestellt (§ 3 Abs. 1b S. 1 Nr. 1 UStG), da die Waren zum Vorsteuerabzug berechtigt haben (§ 3 Abs. 1b S. 2 UStG) → steuerbar (§ 1 Abs. 1 Nr. 1 UStG).",
        "BMG ist der Einkaufspreis im Zeitpunkt der Entnahme (§ 10 Abs. 4 S. 1 Nr. 1 UStG): 40 € und 10 €. USt 7,60 € (19 %) und 0,70 € (7 %, § 12 Abs. 2 Nr. 1 UStG).",
        "Entstehung mit Ablauf des VAZ Mai (§ 13 Abs. 1 Nr. 2 UStG).",
      ],
    },
    {
      titel: "Firmenwagen auch privat genutzt",
      sv: "Unternehmer U nutzt seinen voll dem Unternehmen zugeordneten Pkw (Bruttolistenpreis 40.000 €, Vorsteuer aus dem Kauf voll abgezogen) auch privat. Ein Fahrtenbuch führt er nicht.",
      loesung: [
        "Die Privatnutzung ist einer sonstigen Leistung gegen Entgelt gleichgestellt (§ 3 Abs. 9a Nr. 1 UStG).",
        "BMG nach § 10 Abs. 4 S. 1 Nr. 2 UStG: 1 % von 40.000 € = 400 € monatlich, abzüglich 20 % für nicht vorsteuerbelastete Kosten = 320 €. USt 60,80 € monatlich, Entstehung mit Ablauf des jeweiligen VAZ (§ 13 Abs. 1 Nr. 2 UStG).",
      ],
    },
  ],

  "ust-sonder": [
    {
      titel: "Kleinunternehmerin weist Steuer aus",
      sv: "Grafikerin G hatte im Vorjahr 22.000 € Umsatz, im laufenden Jahr erwartet sie 30.000 €. Sie hat nicht auf die Kleinunternehmerregelung verzichtet. Einem Kunden stellt sie trotzdem 1.000 € zzgl. 190 € USt in Rechnung.",
      loesung: [
        "G ist Kleinunternehmerin, da ihr Umsatz im Vorjahr 25.000 € und im laufenden Jahr 100.000 € nicht übersteigt; ihre Umsätze sind steuerfrei (§ 19 Abs. 1 UStG).",
        "Wegen des unberechtigten Steuerausweises schuldet G 190 € (§ 14c Abs. 2 UStG), Entstehung mit Ausgabe der Rechnung (§ 13 Abs. 1 Nr. 4 UStG). Der Kunde hat keinen Vorsteuerabzug.",
      ],
    },
    {
      titel: "Reihengeschäft",
      sv: "Einzelhändler A (Hamburg) bestellt eine Maschine bei Großhändler B (München). B bestellt sie bei Hersteller C (Leipzig). C transportiert die Maschine mit eigenem Lkw direkt von Leipzig zu A.",
      loesung: [
        "Es liegt ein Reihengeschäft vor (§ 3 Abs. 6a S. 1 UStG), da die Maschine unmittelbar von C zu A gelangt.",
        "Da C befördert, ist ihm die bewegte Lieferung zuzuordnen (§ 3 Abs. 6a S. 2 UStG): Lieferung C an B in Leipzig (§ 3 Abs. 6 S. 1 UStG).",
        "Die ruhende Lieferung B an A folgt der Beförderung und ist in Hamburg ausgeführt (§ 3 Abs. 7 S. 2 Nr. 2 UStG). Beide sind steuerbar und steuerpflichtig.",
      ],
    },
  ],
};
