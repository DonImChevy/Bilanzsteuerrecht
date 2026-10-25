// Klausurbeispiele Einkommensteuer (Rechtsstand 2026): eigener Sachverhalt und Musterlösung mit Rechenweg –
// jede Aussage mit der tragenden Norm. Kein Klausurtext übernommen.
// Format: { titel, sv, aufgabe, loesung: [Absätze] }.

export const BEISPIELE_EST = {
  "est-grundlagen": [
    {
      titel: "Wie wird die Einkommensteuer erhoben?",
      sv: "(1) Angestellte A erhält monatlich Gehalt. (2) Sparer S erhält 600 € Zinsen von seiner Bank. (3) Gewerbetreibender G erzielt einen Gewinn von 80.000 €.",
      aufgabe: "Ordnen Sie die Einkommensteuer ein und nennen Sie die jeweilige Erhebungsform.",
      loesung: [
        "**Einordnung:** Die ESt ist eine Personensteuer und direkte Steuer; ihr Aufkommen steht Bund und Ländern gemeinsam zu (Gemeinschaftsteuer, Art. 106 Abs. 3 S. 1 GG), die Gemeinden erhalten einen Anteil (Art. 106 Abs. 5 GG). Gesetzgebung: konkurrierend durch den Bund mit Zustimmung des Bundesrates (Art. 105 Abs. 2, 3 GG).",
        "**(1) A – Lohnsteuer:** Der Arbeitgeber behält die ESt bei jeder Lohnzahlung ein (§ 38 Abs. 1 EStG). Für Arbeitnehmer ohne weitere Einkünfte gilt sie grundsätzlich als abgegolten (§ 46 Abs. 4 EStG).",
        "**(2) S – Kapitalertragsteuer:** Die Bank behält 25 % ein (§ 43 Abs. 1, § 43a Abs. 1 EStG); damit ist die ESt grundsätzlich abgegolten (§ 43 Abs. 5 S. 1 EStG). Der Sparer-Pauschbetrag von 1.000 € bleibt über einen Freistellungsauftrag steuerfrei.",
        "**(3) G – Veranlagung:** Die ESt wird nach Ablauf des Kalenderjahres veranlagt (§ 25 Abs. 1 EStG); im Laufe des Jahres leistet G Vorauszahlungen (§ 37 Abs. 1 EStG), die angerechnet werden (§ 36 Abs. 2 Nr. 1 EStG).",
      ],
    },
  ],

  "est-steuerpflicht": [
    {
      titel: "Drei Personen – drei Arten der Steuerpflicht",
      sv: "(1) Die Spanierin S studiert von September 01 bis April 02 in Hamburg und mietet dort ein Zimmer. (2) Der Pole P wohnt in Stettin und arbeitet als Arbeitnehmer in Berlin; sein gesamtes Einkommen stammt aus dieser Tätigkeit. (3) Der deutsche Diplomat D lebt mit seiner Familie in Paris und bezieht sein Gehalt vom Auswärtigen Amt.",
      loesung: [
        "**(1) S – unbeschränkt:** Natürliche Personen mit Wohnsitz oder gewöhnlichem Aufenthalt im Inland sind unbeschränkt steuerpflichtig (§ 1 Abs. 1 S. 1 EStG). S hat eine Wohnung inne, die sie beibehalten und benutzen will (Wohnsitz, § 8 AO); zudem hält sie sich mehr als sechs Monate zusammenhängend im Inland auf (gewöhnlicher Aufenthalt, § 9 S. 2 AO). Sie ist mit ihrem Welteinkommen steuerpflichtig.",
        "**(2) P – beschränkt, auf Antrag unbeschränkt:** Kein Wohnsitz und kein gewöhnlicher Aufenthalt im Inland, aber inländische Einkünfte aus nichtselbständiger Arbeit (§ 49 Abs. 1 Nr. 4 EStG) → beschränkt steuerpflichtig (§ 1 Abs. 4 EStG). Da mindestens 90 % seiner Einkünfte der deutschen ESt unterliegen, kann er beantragen, als unbeschränkt steuerpflichtig behandelt zu werden (§ 1 Abs. 3 S. 1, 2 EStG).",
        "**(3) D – erweitert unbeschränkt:** Deutscher Staatsangehöriger ohne Inlandswohnsitz, der zu einer inländischen juristischen Person des öffentlichen Rechts in einem Dienstverhältnis steht und Arbeitslohn aus einer öffentlichen Kasse bezieht (§ 1 Abs. 2 S. 1 EStG); Voraussetzung ist, dass er im Gastland nur beschränkt steuerpflichtig ist (§ 1 Abs. 2 S. 2 EStG).",
      ],
    },
  ],

  "est-einkuenfte": [
    {
      titel: "Einkunftsarten zuordnen",
      sv: "Frau F (1) gibt selbständig Nachhilfe, (2) betreibt nebenbei einen Onlinehandel mit Druckerpatronen, (3) ist halbtags angestellt, (4) vermietet eine Eigentumswohnung, (5) erhält Zinsen auf ihr Sparkonto und (6) verkauft eine vor sieben Jahren gekaufte vermietete Wohnung mit Gewinn.",
      loesung: [
        "**(1) Selbständige Arbeit:** unterrichtende Tätigkeit (§ 18 Abs. 1 Nr. 1 S. 2 EStG) → Gewinneinkunftsart (§ 2 Abs. 2 S. 1 Nr. 1 EStG).",
        "**(2) Gewerbebetrieb:** selbständige, nachhaltige Betätigung mit Gewinnerzielungsabsicht und Beteiligung am allgemeinen wirtschaftlichen Verkehr, weder freiberuflich noch Vermögensverwaltung (§ 15 Abs. 2 S. 1 EStG) → § 15 Abs. 1 S. 1 Nr. 1 EStG.",
        "**(3) Nichtselbständige Arbeit:** Arbeitslohn aus einem Dienstverhältnis (§ 19 Abs. 1 S. 1 Nr. 1 EStG) → Überschusseinkunftsart (§ 2 Abs. 2 S. 1 Nr. 2 EStG).",
        "**(4) Vermietung und Verpachtung:** § 21 Abs. 1 S. 1 Nr. 1 EStG.",
        "**(5) Kapitalvermögen:** Zinsen aus sonstigen Kapitalforderungen (§ 20 Abs. 1 Nr. 7 EStG).",
        "**(6) Sonstige Einkünfte:** privates Veräußerungsgeschäft, weil zwischen Anschaffung und Veräußerung eines Grundstücks nicht mehr als zehn Jahre liegen (§ 22 Nr. 2 i. V. m. § 23 Abs. 1 S. 1 Nr. 1 EStG).",
        "**Ermittlung:** (1) und (2) Gewinn (§§ 4–7k EStG); (3)–(6) Überschuss der Einnahmen über die Werbungskosten (§§ 8–9a EStG) bzw. Veräußerungsgewinn (§ 23 Abs. 3 EStG) – Dualismus der Einkunftsermittlung.",
      ],
    },
  ],

  "est-zve": [
    {
      titel: "Vom Arbeitslohn zum zu versteuernden Einkommen",
      sv: "Die alleinerziehende Mutter M (ein Kind, das ganze Jahr in ihrem Haushalt) hat 45.000 € Arbeitslohn, Werbungskosten 900 € und einen Verlust aus Vermietung von 2.000 €. Sonderausgaben: Vorsorgeaufwendungen abziehbar 7.000 €, Kirchensteuer 500 €. Das Kindergeld ist günstiger als der Kinderfreibetrag.",
      loesung: [
        "**Einkünfte § 19 EStG:** 45.000 € − Arbeitnehmer-Pauschbetrag 1.230 € (§ 9a S. 1 Nr. 1 a EStG, da höher als 900 €) = 43.770 €.",
        "**Einkünfte § 21 EStG:** −2.000 € (vertikaler Verlustausgleich).",
        "**Summe der Einkünfte** (§ 2 Abs. 3 EStG): 41.770 €.",
        "− **Entlastungsbetrag für Alleinerziehende** (§ 24b Abs. 2 S. 1 EStG): 4.260 € → **Gesamtbetrag der Einkünfte** 37.510 €.",
        "− **Sonderausgaben:** Vorsorgeaufwendungen 7.000 € (§ 10 Abs. 1 Nr. 2, 3 EStG) und Kirchensteuer 500 € (§ 10 Abs. 1 Nr. 4 EStG) → **Einkommen** (§ 2 Abs. 4 EStG) 30.010 €.",
        "**Kinderfreibetrag:** wird nicht abgezogen, weil das Kindergeld günstiger ist (Günstigerprüfung, § 31 S. 4 EStG) → **zu versteuerndes Einkommen** (§ 2 Abs. 5 EStG) **30.010 €**.",
        "**Tarif:** 30.010 € liegen in Zone 3 (§ 32a Abs. 1 S. 2 Nr. 3 EStG) → tarifliche ESt 4.219 €.",
      ],
    },
  ],

  "est-veranlagung": [
    {
      titel: "Heirat im Dezember",
      sv: "Anna und Ben heiraten am 28.12.01; beide wohnen in Köln. Anna verdient 70.000 €, Ben 20.000 € (jeweils zvE-Anteil). Sie fragen, wie sie für 01 veranlagt werden.",
      loesung: [
        "**Voraussetzungen des Wahlrechts (§ 26 Abs. 1 S. 1 EStG):** Ehegatten, beide unbeschränkt steuerpflichtig (§ 1 Abs. 1 EStG), nicht dauernd getrennt lebend – und diese Voraussetzungen liegen zu Beginn des VZ vor oder sind im Laufe des VZ eingetreten. Ein Tag (28.12.) genügt.",
        "**Wahl:** Einzelveranlagung (§ 26a EStG) oder Zusammenveranlagung (§ 26b EStG); ohne Erklärung wird zusammen veranlagt (§ 26 Abs. 3 EStG).",
        "**Zusammenveranlagung:** Die Einkünfte werden zusammengerechnet; die ESt wird nach dem **Splittingverfahren** ermittelt (§ 32a Abs. 5 EStG): ESt auf die Hälfte des gemeinsamen zvE, verdoppelt. Bei so unterschiedlichen Einkommen ist das günstiger als zwei Einzelveranlagungen.",
        "**Ergebnis:** Für das ganze Jahr 01 ist die Zusammenveranlagung möglich und vorteilhaft.",
      ],
    },
    {
      titel: "Muss der Arbeitnehmer eine Erklärung abgeben?",
      sv: "Arbeitnehmer A hat nur ein Dienstverhältnis (Steuerklasse I). Nebenbei vermietet er einen Stellplatz und erzielt daraus Einkünfte von 600 €.",
      loesung: [
        "**Grundsatz:** Bei Arbeitnehmern ist die ESt grundsätzlich durch den Lohnsteuerabzug abgegolten (§ 46 Abs. 4 S. 1 EStG).",
        "**Pflichtveranlagung:** Eine Veranlagung ist durchzuführen, wenn die Einkünfte, die nicht dem Lohnsteuerabzug unterlagen, mehr als 410 € betragen (§ 46 Abs. 2 Nr. 1 EStG). 600 € > 410 € → A muss eine Erklärung abgeben (§ 25 Abs. 3 EStG); Frist 31.07. des Folgejahres (§ 149 Abs. 2 S. 1 AO).",
        "**Ohne die Nebeneinkünfte:** Er könnte freiwillig eine Antragsveranlagung beantragen (§ 46 Abs. 2 Nr. 8 EStG), z. B. um zu viel gezahlte Lohnsteuer erstattet zu bekommen – innerhalb der vierjährigen Festsetzungsfrist (§ 169 Abs. 2 S. 1 Nr. 2 AO).",
      ],
    },
  ],

  "est-tarif": [
    {
      titel: "Einkommensteuer berechnen – Grund- und Splittingtarif",
      sv: "(1) Ledige L hat ein zvE von 30.010 €. (2) Die zusammen veranlagten Eheleute E haben ein gemeinsames zvE von 60.020 €.",
      loesung: [
        "**(1) Grundtarif:** 30.010 € liegen in der Zone von 17.800 € bis 69.878 € (§ 32a Abs. 1 S. 2 Nr. 3 EStG): ESt = (173,10 · z + 2.397) · z + 1.034,87 mit z = (30.010 − 17.799) ÷ 10.000 = 1,2211 → (211,37 + 2.397) · 1,2211 + 1.034,87 = 4.219,95 € → abgerundet **4.219 €** (§ 32a Abs. 1 S. 6 EStG).",
        "**Durchschnittsteuersatz:** 4.219 € ÷ 30.010 € = 14,1 %; der Grenzsteuersatz liegt deutlich höher (rund 28 %).",
        "**(2) Splittingtarif:** ESt = 2 × ESt auf die Hälfte des zvE (§ 32a Abs. 5 EStG): 60.020 € ÷ 2 = 30.010 € → 2 × 4.219 € = **8.438 €**. Ohne Splitting betrüge die ESt auf 60.020 € nach Grundtarif 14.240 €.",
        "**Weiter zur Abschlusszahlung:** tarifliche ESt − Steuerermäßigungen = festzusetzende ESt (§ 2 Abs. 6 EStG); darauf werden Vorauszahlungen und Lohnsteuer angerechnet (§ 36 Abs. 2 EStG) → Abschlusszahlung oder Erstattung (§ 36 Abs. 4 EStG).",
      ],
    },
  ],

  "est-einnahmen": [
    {
      titel: "Trainer im Sportverein",
      sv: "Studentin S trainiert sechs Stunden pro Woche eine Jugendmannschaft eines gemeinnützigen Sportvereins und erhält dafür 4.000 € im Jahr. Für Fahrten und Material gibt sie 400 € aus.",
      loesung: [
        "**Einkunftsart:** Selbständige, unterrichtende Tätigkeit → § 18 Abs. 1 Nr. 1 EStG.",
        "**Steuerbefreiung:** Einnahmen aus nebenberuflichen Tätigkeiten als Übungsleiter im Dienst einer gemeinnützigen Körperschaft sind bis 3.300 € im Jahr steuerfrei (§ 3 Nr. 26 S. 1 EStG). Nebenberuflich: nicht mehr als ein Drittel einer Vollzeitstelle (6 Std./Woche) – eine Haupttätigkeit ist nicht erforderlich.",
        "**Ausgaben:** Abweichend von § 3c Abs. 1 EStG sind sie nur abziehbar, soweit sie die steuerfreien Einnahmen übersteigen (§ 3 Nr. 26 S. 2 EStG): 400 € < 3.300 € → 0 €.",
        "**Einkünfte:** 4.000 € − 3.300 € − 0 € = **700 €**.",
      ],
    },
    {
      titel: "Tankgutschein vom Arbeitgeber",
      sv: "Arbeitgeber AG schenkt Arbeitnehmerin N monatlich einen Tankgutschein über (a) 50 € bzw. (b) 60 €.",
      loesung: [
        "**Einnahme:** Der Gutschein ist ein Sachbezug (Gut in Geldeswert) und gehört zum Arbeitslohn (§ 8 Abs. 1 S. 1, § 19 Abs. 1 S. 1 Nr. 1 EStG); Bewertung mit dem üblichen Endpreis (§ 8 Abs. 2 S. 1 EStG).",
        "**Freigrenze:** Sachbezüge bleiben außer Ansatz, wenn sie insgesamt **50 € im Monat** nicht übersteigen (§ 8 Abs. 2 S. 11 EStG).",
        "**(a) 50 €:** steuerfrei. **(b) 60 €:** Die Freigrenze ist überschritten → der **gesamte** Betrag von 60 € ist steuerpflichtig (Freigrenze, kein Freibetrag).",
      ],
    },
  ],

  "est-ausgaben": [
    {
      titel: "Was ist abziehbar?",
      sv: "Lehrer L macht als Werbungskosten geltend: (1) Laptop, den er nachweislich zu 70 % beruflich nutzt, (2) Anzug für Elternabende, (3) Brille, (4) Arbeitskittel für den Chemieunterricht, (5) Geldbuße wegen zu schnellen Fahrens zur Schule.",
      loesung: [
        "**(1) Laptop:** gemischt veranlasst, aber nach objektivem Maßstab (Nutzungszeit) aufteilbar → 70 % als Arbeitsmittel (§ 9 Abs. 1 S. 3 Nr. 6, 7 EStG) abziehbar; 30 % private Lebensführung (§ 12 Nr. 1 EStG).",
        "**(2) Anzug:** bürgerliche Kleidung, auch wenn beruflich getragen → nicht abziehbar (§ 12 Nr. 1 S. 2 EStG, Lebensführung, die die berufliche Stellung mit sich bringt).",
        "**(3) Brille:** private Lebensführung (Sehhilfe ist nicht trennbar) → nicht abziehbar (§ 12 Nr. 1 EStG).",
        "**(4) Arbeitskittel:** typische Berufskleidung → Arbeitsmittel, abziehbar (§ 9 Abs. 1 S. 3 Nr. 6 EStG).",
        "**(5) Geldbuße:** nicht abziehbar (§ 9 Abs. 5 S. 1 i. V. m. § 4 Abs. 5 S. 1 Nr. 8 EStG).",
      ],
    },
  ],

  "est-zufluss": [
    {
      titel: "Zahlungen um den Jahreswechsel",
      sv: "Vermieter V (Überschussrechnung) erhält: (1) Dezembermiete 01, fällig am 03.01.02, gezahlt am 05.01.02; (2) Novembermiete 01, gezahlt am 08.01.02; (3) eine einmalige Abstandszahlung, gezahlt am 30.12.01 für eine Vertragsänderung ab 02. Er zahlt (4) die Grundsteuer für das 4. Quartal 01 (fällig 15.11.01) erst am 04.01.02.",
      loesung: [
        "**Grundsatz:** Einnahmen sind in dem Kalenderjahr bezogen, in dem sie zufließen (§ 11 Abs. 1 S. 1 EStG); Ausgaben sind in dem Jahr abzusetzen, in dem sie geleistet werden (§ 11 Abs. 2 S. 1 EStG).",
        "**Ausnahme:** Regelmäßig wiederkehrende Einnahmen und Ausgaben, die kurze Zeit (10 Tage) vor Beginn oder nach Ende des Kalenderjahres, zu dem sie wirtschaftlich gehören, zu- bzw. abfließen, gelten als in diesem Jahr bezogen bzw. geleistet (§ 11 Abs. 1 S. 2, Abs. 2 S. 2 EStG). Auch die Fälligkeit muss innerhalb der 10 Tage liegen.",
        "**(1)** Regelmäßig wiederkehrend, Fälligkeit und Zahlung innerhalb von 10 Tagen nach Jahresende → **Einnahme 01**.",
        "**(2)** Die Zahlung liegt zwar innerhalb der 10 Tage, die Fälligkeit (Anfang November) aber nicht → **Einnahme 02**.",
        "**(3)** Einmalige Zahlung → keine Ausnahme, Zufluss am 30.12. → **Einnahme 01**.",
        "**(4)** Fälligkeit im November liegt außerhalb der 10 Tage → **Werbungskosten 02**.",
      ],
    },
  ],

  "est-werbungskosten": [
    {
      titel: "Pauschbetrag oder tatsächliche Werbungskosten?",
      sv: "Arbeitnehmerin A fährt an 220 Tagen mit dem eigenen Pkw 15 km zur ersten Tätigkeitsstätte. Sie kauft Fachbücher für 80 €, zahlt 240 € Gewerkschaftsbeitrag und 16 € Kontoführungsgebühren (Pauschale der Verwaltung).",
      loesung: [
        "**Werbungskosten** sind Aufwendungen zur Erwerbung, Sicherung und Erhaltung der Einnahmen (§ 9 Abs. 1 S. 1 EStG).",
        "**Entfernungspauschale:** 220 Tage × 15 km × 0,38 € = 1.254 € (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 EStG).",
        "**Arbeitsmittel:** Fachbücher 80 € (§ 9 Abs. 1 S. 3 Nr. 6 EStG); **Kontoführung** 16 €.",
        "**Vergleich:** 1.254 € + 80 € + 16 € = 1.350 € > Arbeitnehmer-Pauschbetrag 1.230 € (§ 9a S. 1 Nr. 1 a EStG) → tatsächliche Werbungskosten 1.350 €.",
        "**Gewerkschaftsbeitrag:** Seit 2026 zusätzlich zu berücksichtigen (§ 9a S. 3 EStG; Beiträge zu Berufsverbänden, § 9 Abs. 1 S. 3 Nr. 3 EStG) → insgesamt **1.590 €**.",
      ],
    },
    {
      titel: "Laptop über 800 €",
      sv: "Arbeitnehmer B kauft im Oktober einen Laptop für 1.428 € (1.200 € netto), den er zu 90 % beruflich nutzt.",
      loesung: [
        "**Arbeitsmittel:** abziehbar zum beruflichen Anteil (§ 9 Abs. 1 S. 3 Nr. 6 EStG); Aufteilung nach Nutzungsanteil (§ 12 Nr. 1 EStG für den privaten Teil).",
        "**GWG-Grenze:** Die Grenze von 800 € wird **netto** geprüft (§ 9 Abs. 1 S. 3 Nr. 7 S. 2 i. V. m. § 6 Abs. 2 S. 1 EStG): 1.200 € > 800 € → kein Sofortabzug als GWG.",
        "**AfA:** Für Computerhardware wird nach Verwaltungsauffassung eine Nutzungsdauer von einem Jahr angenommen; die Aufwendungen können im Anschaffungsjahr vollständig abgezogen werden (§ 9 Abs. 1 S. 3 Nr. 7 i. V. m. § 7 Abs. 1 EStG).",
        "**Betrag:** Beim Arbeitnehmer gehört die USt dazu (kein Vorsteuerabzug): 1.428 € × 90 % = **1.285,20 €** Werbungskosten.",
      ],
    },
  ],

  "est-entfernung": [
    {
      titel: "Pkw, Bahn und Park & Ride",
      sv: "(1) A fährt an 220 Tagen mit dem eigenen Pkw zur ersten Tätigkeitsstätte; kürzeste Straßenverbindung 27,8 km. (2) B fährt an 230 Tagen mit der Bahn 60 km; Jahreskarte 1.800 €. (3) C fährt an 220 Tagen 20 km mit dem Pkw zum Bahnhof und 40 km mit der Bahn weiter (Jahreskarte 1.500 €).",
      loesung: [
        "**Rechtsgrundlage:** Für jeden Arbeitstag, an dem die erste Tätigkeitsstätte aufgesucht wird, 0,38 € für jeden vollen Kilometer der Entfernung (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 EStG); maßgeblich ist die kürzeste Straßenverbindung (§ 9 Abs. 1 S. 3 Nr. 4 S. 4 EStG).",
        "**(1) A:** 220 × 27 km (abgerundet) × 0,38 € = **2.257,20 €**. Der Höchstbetrag von 4.500 € gilt nicht, weil A einen eigenen Pkw benutzt (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 HS. 2 EStG).",
        "**(2) B:** 230 × 60 km × 0,38 € = 5.244 € → begrenzt auf **4.500 €**. Die tatsächlichen Kosten (1.800 €) übersteigen die Pauschale nicht (§ 9 Abs. 2 S. 2 EStG) → 4.500 €.",
        "**(3) C:** Pkw-Teilstrecke ohne Höchstbetrag: 220 × 20 × 0,38 € = 1.672 €; Bahnstrecke: 220 × 40 × 0,38 € = 3.344 € (unter 4.500 €) → **5.016 €**. Die Jahreskarte (1.500 €) ist geringer und bleibt unberücksichtigt.",
        "**Abgeltung:** Mit der Pauschale sind alle Aufwendungen für die Wege abgegolten (§ 9 Abs. 2 S. 1 EStG) – Parkgebühren und Reparaturen sind nicht zusätzlich abziehbar, Unfallkosten schon.",
      ],
    },
  ],
};
