// Klausurbeispiele Bilanzsteuerrecht: eigener Sachverhalt im Stil der Semesterklausuren (Teil I Buchführung,
// Teil II Würdigung → Buchung → Gewinnauswirkung lt. GuV und BVV) – jede Aussage mit der tragenden Norm.
// Kein Klausurtext übernommen. Zeilen mit „BS:“ werden als Buchungssatz dargestellt.
// Vorbemerkung wie in der Klausur: Gewerbetreibende mit BVV nach § 5 Abs. 1 i. V. m. § 4 Abs. 1 S. 1 EStG,
// Wirtschaftsjahr = Kalenderjahr, voller Vorsteuerabzug, Nettomethode, Wahlrechte für die geringste Steuerbelastung.

export const BEISPIELE_BSR = {
  // ---------------------------------------------------------------- Teil I
  grundbegriffe: [
    {
      titel: "Vorgänge den Begriffspaaren zuordnen",
      sv: "(a) Kauf einer Maschine für 10.000 € auf Ziel. (b) Bezahlung dieser Rechnung per Bank. (c) AfA auf die Maschine 2.000 €. (d) Tilgung eines Darlehens 5.000 € per Bank. (e) Zinsen 300 € per Bank.",
      aufgabe: "Liegt jeweils Auszahlung, Ausgabe und/oder Aufwand vor?",
      loesung: [
        "**(a)** Geldvermögen sinkt (Verbindlichkeit +) → **Ausgabe**; keine Auszahlung, kein Aufwand (Vermögensumschichtung: Maschine wird aktiviert).",
        "**(b)** Bankbestand sinkt → **Auszahlung**; Geldvermögen bleibt gleich (Bank −, Verbindlichkeit −) → keine Ausgabe, kein Aufwand.",
        "**(c)** Werteverzehr, der das Eigenkapital mindert → **Aufwand** (GuV, § 242 Abs. 2 HGB); keine Auszahlung, keine Ausgabe.",
        "**(d)** **Auszahlung**; Geldvermögen gleich (Bank −, Darlehen −) → keine Ausgabe, kein Aufwand.",
        "**(e)** **Auszahlung, Ausgabe und Aufwand** zugleich.",
      ],
    },
  ],

  buchfuehrungspflicht: [
    {
      titel: "Drei Unternehmer – wer muss Bücher führen?",
      sv: "(1) Einzelhändler E (im Handelsregister eingetragen, kaufmännisch eingerichteter Betrieb): Umsatz 900.000 €, Gewinn 60.000 €. (2) Kioskbetreiberin K (kein kaufmännisch eingerichteter Betrieb nötig, nicht eingetragen): Umsatz 400.000 €, Gewinn 95.000 €; das Finanzamt hat ihr am 10.11.01 die Buchführungspflicht mitgeteilt. (3) Ärztin Ä: Gewinn 250.000 €.",
      loesung: [
        "**(1) E:** Istkaufmann, da er ein Handelsgewerbe betreibt, das einen kaufmännisch eingerichteten Geschäftsbetrieb erfordert (§ 1 Abs. 1, 2 HGB) → buchführungspflichtig nach § 238 Abs. 1 HGB. Befreiung nach § 241a HGB scheidet aus, weil die Umsatzerlöse 800.000 € übersteigen (beide Grenzen müssen eingehalten sein). Die Pflicht gilt nach § 140 AO auch für die Besteuerung.",
        "**(2) K:** Kein Kaufmann (§ 1 Abs. 2 HGB) → keine Pflicht nach HGB, daher auch nicht nach § 140 AO. Aber: Gewerbliche Unternehmerin mit einem Gewinn aus Gewerbebetrieb von mehr als 80.000 € (§ 141 Abs. 1 S. 1 Nr. 4 AO) → originär buchführungspflichtig, und zwar ab Beginn des Wirtschaftsjahres, das auf die Bekanntgabe der Mitteilung folgt (§ 141 Abs. 2 S. 1 AO) → ab 01.01.02.",
        "**(3) Ä:** Freiberuflerin (§ 18 Abs. 1 Nr. 1 EStG), kein Gewerbe → weder § 238 HGB noch § 141 AO. Gewinnermittlung nach § 4 Abs. 3 EStG möglich.",
      ],
    },
  ],

  inventurBilanz: [
    {
      titel: "Von der Inventurliste zur Bilanz",
      sv: "Die Inventur zum 31.12. ergibt: Grundstück 200.000 €, Betriebs- und Geschäftsausstattung 30.000 €, Waren 50.000 €, Forderungen 20.000 €, Bank 15.000 €, Kasse 5.000 €, Darlehen 120.000 €, Verbindlichkeiten aus LuL 40.000 €.",
      aufgabe: "Erstellen Sie Inventar und Bilanz.",
      loesung: [
        "**Inventar (Staffelform):** A. Vermögen: Anlagevermögen 230.000 € (Grundstück, BGA), Umlaufvermögen 90.000 € (Waren, Forderungen, Bank, Kasse – nach steigender Liquidität) = 320.000 €. B. Schulden: Darlehen 120.000 €, Verbindlichkeiten 40.000 € = 160.000 €. C. Reinvermögen (Eigenkapital) = 320.000 € − 160.000 € = **160.000 €**.",
        "**Bilanz (Kontenform):** Aktiva: Anlagevermögen 230.000 €, Umlaufvermögen 90.000 € = 320.000 €. Passiva: Eigenkapital 160.000 €, Verbindlichkeiten 160.000 € = 320.000 € (Gliederung nach § 247 Abs. 1 HGB).",
      ],
    },
  ],

  bilanzveraenderungen: [
    {
      titel: "Vier Vorfälle, vier Arten",
      sv: "(a) Barabhebung 1.000 € vom Bankkonto. (b) Eine Lieferantenverbindlichkeit von 8.000 € wird in ein Darlehen umgewandelt. (c) Wareneinkauf auf Ziel 5.000 € (ohne USt). (d) Tilgung eines Darlehens 3.000 € per Bank.",
      loesung: [
        "**(a) Aktivtausch:** Kasse +1.000 €, Bank −1.000 €; Bilanzsumme unverändert.",
        "**(b) Passivtausch:** Darlehen +8.000 €, Verbindlichkeiten aus LuL −8.000 €; Bilanzsumme unverändert.",
        "**(c) Aktiv-Passiv-Mehrung:** Waren +5.000 €, Verbindlichkeiten +5.000 €; Bilanzsumme +5.000 €.",
        "**(d) Aktiv-Passiv-Minderung:** Bank −3.000 €, Darlehen −3.000 €; Bilanzsumme −3.000 €. Die Tilgung ist kein Aufwand.",
      ],
    },
  ],

  bestandskonten: [
    {
      titel: "Buchungssätze zu Bestandsvorgängen",
      sv: "(a) Kauf von Büromöbeln auf Ziel: 5.000 € + 950 € USt. (b) Bareinzahlung von 2.000 € auf das Bankkonto. (c) Ein Kunde begleicht eine Forderung von 1.190 € per Überweisung. (d) Aufnahme eines Darlehens über 20.000 €, Gutschrift auf dem Bankkonto.",
      loesung: [
        "BS: BGA 5.000 € / Vorsteuer 950 € an Verbindlichkeiten aus LuL 5.950 €",
        "BS: Bank 2.000 € an Kasse 2.000 €",
        "BS: Bank 1.190 € an Forderungen aus LuL 1.190 €",
        "BS: Bank 20.000 € an Darlehen 20.000 €",
      ],
    },
  ],

  erfolgskonten: [
    {
      titel: "Erfolgsvorgänge buchen und abschließen",
      sv: "Im Dezember: Mietzahlung für die Geschäftsräume 1.000 € per Bank, Zinsgutschrift 200 € auf dem Bankkonto, Kfz-Steuer für den Firmenwagen 300 € per Lastschrift. Weitere Vorgänge gab es nicht.",
      loesung: [
        "BS: Mietaufwand 1.000 € an Bank 1.000 €",
        "BS: Bank 200 € an Zinserträge 200 €",
        "BS: Kfz-Steuer 300 € an Bank 300 €",
        "**Abschluss über die GuV (§ 242 Abs. 2 HGB):**",
        "BS: GuV 1.300 € an Mietaufwand 1.000 € / Kfz-Steuer 300 €",
        "BS: Zinserträge 200 € an GuV 200 €",
        "BS: Eigenkapital 1.100 € an GuV 1.100 € (Verlust)",
      ],
    },
  ],

  privatkonten: [
    {
      titel: "Privat bezahlt, privat entnommen",
      sv: "(a) Inhaber I bezahlt eine Rechnung über Waren (2.000 € + 380 € USt) von seinem privaten Konto. (b) I überweist seine Einkommensteuer-Vorauszahlung (1.500 €) vom Geschäftskonto. (c) I entnimmt Waren für seinen Haushalt; aktueller Einkaufspreis 300 € netto.",
      loesung: [
        "BS: (a) Wareneingang 2.000 € / Vorsteuer 380 € an Privateinlagen 2.380 € (Einlage, § 4 Abs. 1 S. 8 EStG)",
        "BS: (b) Privatentnahmen 1.500 € an Bank 1.500 € (Entnahme, § 4 Abs. 1 S. 2 EStG; § 12 Nr. 3 EStG)",
        "BS: (c) Privatentnahmen 357 € an Unentgeltliche Wertabgaben 300 € / Umsatzsteuer 57 € (§ 6 Abs. 1 Nr. 4 S. 1 EStG; § 3 Abs. 1b S. 1 Nr. 1, § 10 Abs. 4 S. 1 Nr. 1 UStG)",
      ],
    },
  ],

  warenkonten: [
    {
      titel: "Warenkonten fortführen und abschließen",
      sv: "Warenbestand lt. EBK 80.000 €. Wareneinkäufe (netto, im WEK gebucht) 150.000 €, Erlöse (netto, im WVK) 230.000 €. Schlussbestand lt. Inventur 70.000 €.",
      aufgabe: "Abschlussbuchungen, Wareneinsatz, Rohgewinn und Rohgewinnaufschlagsatz.",
      loesung: [
        "**Bestandsveränderung:** SB 70.000 € − AB 80.000 € = **Minderung 10.000 €**.",
        "BS: Bestandsveränderung 10.000 € an Warenbestand 10.000 €",
        "BS: Schlussbilanzkonto 70.000 € an Warenbestand 70.000 €",
        "BS: Wareneinkauf 10.000 € an Bestandsveränderung 10.000 € (BVK über das WEK abschließen)",
        "BS: GuV 160.000 € an Wareneinkauf 160.000 €",
        "BS: Warenverkauf 230.000 € an GuV 230.000 €",
        "**Wareneinsatz** = AB 80.000 € + Einkäufe 150.000 € − SB 70.000 € = **160.000 €**.",
        "**Rohgewinn** = Erlöse 230.000 € − Wareneinsatz 160.000 € = **70.000 €**.",
        "**Rohgewinnaufschlagsatz** = 70.000 € ÷ 160.000 € × 100 = **43,75 %** (bezogen auf den Wareneinsatz, nicht auf die Erlöse).",
      ],
    },
  ],

  warenunterkonten: [
    {
      titel: "Rücksendung, Skonto und Zahlung",
      sv: "(a) Einkauf von Waren auf Ziel, netto 30.000 €. (b) Verkauf von Waren auf Ziel, brutto 23.800 €. (c) Der Kunde sendet Waren im Wert von netto 3.000 € zurück. (d) Der Kunde zahlt den Rest unter Abzug von 2 % Skonto per Bank. (e) Rücksendung an den Lieferanten, netto 5.000 €. (f) Bezahlung der restlichen Lieferantenrechnung per Bank.",
      loesung: [
        "BS: (a) Wareneinkauf 30.000 € / Vorsteuer 5.700 € an Verbindlichkeiten aus LuL 35.700 €",
        "BS: (b) Forderungen aus LuL 23.800 € an Warenverkauf 20.000 € / Umsatzsteuer 3.800 €",
        "BS: (c) Warenverkauf 3.000 € / Umsatzsteuer 570 € an Forderungen aus LuL 3.570 €",
        "**(d) Skonto:** Restforderung 23.800 € − 3.570 € = 20.230 €; 2 % = 404,60 € brutto = 340,00 € netto + 64,60 € USt (Entgeltsminderung, § 17 Abs. 1 S. 1 UStG).",
        "BS: (d) Bank 19.825,40 € / Gewährte Skonti 340,00 € / Umsatzsteuer 64,60 € an Forderungen aus LuL 20.230,00 €",
        "BS: (e) Verbindlichkeiten aus LuL 5.950 € an Wareneinkauf 5.000 € / Vorsteuer 950 €",
        "BS: (f) Verbindlichkeiten aus LuL 29.750 € an Bank 29.750 €",
        "BS: Warenverkauf 340 € an Gewährte Skonti 340 € (Abschluss über das WVK)",
      ],
    },
  ],

  umsatzsteuer: [
    {
      titel: "Zahllast ermitteln und buchen",
      sv: "Im Januar betragen die Umsatzsteuer 4.750 € und die Vorsteuer 3.200 €. Die Zahllast wird am 10.02. überwiesen.",
      loesung: [
        "BS: Umsatzsteuer 3.200 € an Vorsteuer 3.200 €",
        "**Zahllast** = 4.750 € − 3.200 € = 1.550 € (Umsatzsteuer-Vorauszahlung, § 18 Abs. 1 UStG).",
        "BS: Umsatzsteuer 1.550 € an Bank 1.550 €",
      ],
    },
    {
      titel: "Umtausch mit Barauszahlung",
      sv: "Kunde K hat am 02.05. ein Gerät für 2.380 € brutto bar gekauft (korrekt gebucht). Am 16.05. bringt er es wegen eines Mangels zurück und nimmt stattdessen ein Gerät für 1.190 € brutto; die Differenz von 1.190 € erhält er bar zurück.",
      loesung: [
        "Rückgängigmachung und neuer Verkauf; die USt ist zu berichtigen (§ 17 Abs. 2 Nr. 3, Abs. 1 S. 1 UStG).",
        "BS: Warenverkauf 2.000 € / Umsatzsteuer 380 € an Kasse 2.380 € (Rücknahme)",
        "BS: Kasse 1.190 € an Warenverkauf 1.000 € / Umsatzsteuer 190 € (neuer Verkauf)",
        "Zusammengefasst (gleiche Wirkung wie beide Buchungen):",
        "BS: Warenverkauf 1.000 € / Umsatzsteuer 190 € an Kasse 1.190 €",
        "**Gewinnauswirkung:** GuV −1.000 € · BVV −1.000 € (Kasse −1.190 €, USt-Schuld −190 €).",
      ],
    },
  ],

  abschluss: [
    {
      titel: "Vorbereitende Abschlussbuchungen und Abschlussbuchungen",
      sv: "Salden zum 31.12.: Warenbezugskosten 2.000 €, Erhaltene Skonti 1.500 €, Gewährte Skonti 800 €, Privatentnahmen 24.000 €, Privateinlagen 3.000 €, Vorsteuer 9.000 €, Umsatzsteuer 15.000 €. Bestandsmehrung lt. Inventur 4.000 €.",
      loesung: [
        "**Vorbereitende Abschlussbuchungen (innerhalb der Konten):**",
        "BS: Wareneinkauf 2.000 € an Warenbezugskosten 2.000 €",
        "BS: Erhaltene Skonti 1.500 € an Wareneinkauf 1.500 €",
        "BS: Warenverkauf 800 € an Gewährte Skonti 800 €",
        "BS: Warenbestand 4.000 € an Bestandsveränderung 4.000 € · Bestandsveränderung 4.000 € an Wareneinkauf 4.000 €",
        "BS: Umsatzsteuer 9.000 € an Vorsteuer 9.000 € (Zahllast 6.000 € bleibt auf dem USt-Konto)",
        "BS: Eigenkapital 24.000 € an Privatentnahmen 24.000 € · Privateinlagen 3.000 € an Eigenkapital 3.000 €",
        "BS: Umsatzsteuer 6.000 € an SBK 6.000 € (Zahllast als Verbindlichkeit)",
      ],
    },
  ],

  kalkulation: [
    {
      titel: "Vom Listeneinkaufspreis zum Listenverkaufspreis",
      sv: "Listeneinkaufspreis 1.000 €, Liefererrabatt 10 %, Liefererskonto 2 %, Bezugskosten 18 €, Handlungskosten 30 %, Gewinn 10 %, Kundenskonto 2 %, Kundenrabatt 10 %.",
      loesung: [
        "Listeneinkaufspreis 1.000,00 € − 10 % Rabatt 100,00 € = Zieleinkaufspreis 900,00 €",
        "− 2 % Skonto 18,00 € = Bareinkaufspreis 882,00 € + Bezugskosten 18,00 € = **Einstandspreis 900,00 €**",
        "+ 30 % Handlungskosten 270,00 € = Selbstkosten 1.170,00 € + 10 % Gewinn 117,00 € = Barverkaufspreis 1.287,00 €",
        "+ Kundenskonto **im Hundert**: 1.287,00 € ÷ 0,98 = Zielverkaufspreis 1.313,27 €",
        "+ Kundenrabatt **im Hundert**: 1.313,27 € ÷ 0,90 = **Listenverkaufspreis netto 1.459,18 €**",
        "**Kalkulationszuschlag** = (1.459,18 € − 900,00 €) ÷ 900,00 € × 100 = 62,13 %; **Kalkulationsfaktor** 1,6213.",
      ],
    },
  ],

  gewinnermittlung: [
    {
      titel: "Mehr- und Weniger-Rechnung",
      sv: "Vorläufiger Gewinn 50.000 €. Berichtigungen: (1) Kauf einer Maschine (12.000 € netto) als Aufwand gebucht; AfA zutreffend 1.000 €. (2) Wareneinkauf 2.000 € + 380 € USt vom Privatkonto bezahlt, nicht gebucht. (3) Privatfahrten mit dem Firmenwagen: Nutzungsentnahme 3.000 € nicht gebucht (USt 456 €).",
      loesung: [
        "BS: (1) Maschinen 12.000 € an sonstiger Aufwand 12.000 € → GuV +12.000 € · BVV +12.000 €",
        "BS: (1) AfA 1.000 € an Maschinen 1.000 € → GuV −1.000 € · BVV −1.000 €",
        "BS: (2) Wareneingang 2.000 € / Vorsteuer 380 € an Privateinlagen 2.380 € → GuV −2.000 € · BVV: +380 € − Einlage 2.380 € = −2.000 €",
        "BS: (3) Privatentnahmen 3.456 € an Unentgeltliche Wertabgaben 3.000 € / Umsatzsteuer 456 € → GuV +3.000 € · BVV: −456 € + Entnahme 3.456 € = +3.000 €",
        "**Berichtigter Gewinn:** 50.000 € + 12.000 € − 1.000 € − 2.000 € + 3.000 € = **62.000 €** (§ 4 Abs. 1 S. 1 EStG).",
      ],
    },
  ],

  buecher: [
    {
      titel: "Tageslosung aus dem Kassenbericht",
      sv: "Kassenbestand am Abend lt. Zählung 1.200 €, Anfangsbestand 800 €. Am Tag: bar bezahlter Wareneinkauf 300 €, Privatentnahme 200 €, Einzahlung auf das Bankkonto 2.000 €. Alle Umsätze unterliegen 19 %.",
      loesung: [
        "Tageslosung (§ 146 Abs. 1 S. 2 AO) = Endbestand 1.200 € + Ausgaben 300 € + Privatentnahme 200 € + Bankeinzahlung 2.000 € − Anfangsbestand 800 € = **2.900 €**.",
        "BS: Kasse 2.900,00 € an Warenverkauf 2.436,97 € / Umsatzsteuer 463,03 €",
      ],
    },
  ],

  // ---------------------------------------------------------------- Teil II
  "bsr-gob": [
    {
      titel: "Betriebsvermögen oder Privatvermögen?",
      sv: "Gewerbetreibender G nutzt (1) einen Laptop zu 60 % betrieblich, (2) einen Pkw zu 30 % betrieblich und (3) ein Ferienhaus ausschließlich privat. Alle drei Wirtschaftsgüter gehören ihm.",
      loesung: [
        "**(1) Laptop:** Betriebliche Nutzung über 50 % → **notwendiges Betriebsvermögen** (R 4.2 Abs. 1 EStR); er ist zu aktivieren (§ 246 Abs. 1 HGB i. V. m. § 5 Abs. 1 S. 1 EStG). Die private Nutzung ist eine Nutzungsentnahme (§ 4 Abs. 1 S. 2 EStG).",
        "**(2) Pkw:** Betriebliche Nutzung zwischen 10 % und 50 % → **gewillkürtes Betriebsvermögen** möglich, wenn G ihn durch Aufnahme in die Buchführung dem Betrieb widmet (R 4.2 Abs. 1 EStR). Sonst Privatvermögen.",
        "**(3) Ferienhaus:** notwendiges Privatvermögen, kein Bilanzansatz (R 4.2 Abs. 1 EStR).",
      ],
    },
    {
      titel: "Geschenke an Geschäftsfreunde",
      sv: "Händler H verschenkt im Dezember an zehn Kunden je einen Präsentkorb für 40 € netto und an drei weitere Kunden je ein Weinpaket für 80 € netto (jeweils zzgl. 19 % USt). Alles wurde als „Werbeaufwand“ gebucht, die Vorsteuer voll abgezogen.",
      loesung: [
        "**Präsentkörbe (40 €):** abziehbar, da nicht über 50 € je Empfänger (§ 4 Abs. 5 S. 1 Nr. 1 EStG).",
        "**Weinpakete (80 €):** nicht abziehbar (§ 4 Abs. 5 S. 1 Nr. 1 EStG), kein Vorsteuerabzug (§ 15 Abs. 1a S. 1 UStG).",
        "BS: Geschenke nicht abzugsfähig 285,60 € an Werbeaufwand 240,00 € / Vorsteuer 45,60 € → GuV −45,60 € · BVV −45,60 €",
        "Außerbilanziell sind 285,60 € hinzuzurechnen.",
      ],
    },
  ],

  "bsr-zurechnung": [
    {
      titel: "Firmenwagen unter Eigentumsvorbehalt",
      sv: "Unternehmer U kauft am 19.11. einen Firmenwagen unter Eigentumsvorbehalt; er wird ihm am selben Tag übergeben. Die letzte Rate wird erst im Folgejahr gezahlt. U hat den Wagen nicht aktiviert, weil er „noch nicht Eigentümer“ sei.",
      loesung: [
        "U ist wirtschaftlicher Eigentümer, da er beim Kauf unter Eigentumsvorbehalt (§ 449 BGB) Besitz, Nutzen und Lasten erhält (§ 246 Abs. 1 S. 2 HS. 2 HGB, § 39 Abs. 2 Nr. 1 S. 1 AO).",
        "Angeschafft ist der Wagen mit der Lieferung am 19.11. (§ 9a EStDV).",
        "Er ist zu aktivieren (§ 246 Abs. 1 HGB i. V. m. § 5 Abs. 1 S. 1 EStG); die offenen Raten sind Verbindlichkeiten.",
      ],
    },
    {
      titel: "Wann ist das Grundstück angeschafft?",
      sv: "Notarieller Kaufvertrag am 20.05., Übergang von Besitz, Nutzen und Lasten sowie Zahlung am 07.06., Eintragung im Grundbuch am 27.09.",
      loesung: [
        "Angeschafft ist das Grundstück am **07.06.**, da dann Besitz, Nutzen und Lasten übergehen (wirtschaftliches Eigentum, § 39 Abs. 2 Nr. 1 AO) – nicht schon mit dem Vertrag und nicht erst mit der Grundbucheintragung.",
        "Die Gebäude-AfA beginnt im Juni (§ 9a EStDV, § 7 Abs. 1 S. 4 EStG) → 7/12 im ersten Jahr.",
      ],
    },
  ],

  "bsr-ak": [
    {
      titel: "Anschaffungskosten eines Firmenwagens",
      sv: "Am 15.11. kauft U einen ausschließlich betrieblich genutzten Pkw (ND 6 Jahre): Listenpreis 52.000 €, Rabatt 4.000 €, Überführung 700 €, zzgl. 19 % USt = 57.953 €, bezahlt per Bank. Zulassungsgebühren 40 € und Kennzeichen 35,70 € (inkl. USt) zahlt U bar. Kfz-Steuer 60 € wird am 01.12. abgebucht. Gebucht hat U bisher nichts.",
      loesung: [
        "Der Pkw ist abnutzbares bewegliches Anlagevermögen (§ 247 Abs. 2 HGB), notwendiges Betriebsvermögen (R 4.2 Abs. 1 EStR) → aktivieren (§ 246 Abs. 1 HGB i. V. m. § 5 Abs. 1 S. 1 EStG).",
        "Bewertung mit den AK abzüglich AfA (§ 253 Abs. 1 S. 1, Abs. 3 HGB; § 6 Abs. 1 Nr. 1 S. 1 EStG).",
        "AK (§ 255 Abs. 1 HGB): 52.000 € − Rabatt 4.000 € + Überführung 700 € + Zulassung 40 € + Kennzeichen 30 € = **48.770 €**; Vorsteuer nicht (§ 9b Abs. 1 EStG), Kfz-Steuer ist laufender Aufwand.",
        "BS: Fuhrpark 48.700,00 € / Vorsteuer 9.253,00 € an Bank 57.953,00 € → GuV 0 · BVV 0",
        "BS: Fuhrpark 70,00 € / Vorsteuer 5,70 € an Kasse 75,70 € → GuV 0 · BVV 0",
        "BS: Kfz-Steuer 60,00 € an Bank 60,00 € → GuV −60 € · BVV −60 €",
        "AfA linear (§ 7 Abs. 1 S. 1, 4 EStG): 48.770 € ÷ 6 × 2/12 = **1.355 €**.",
        "BS: AfA 1.355,00 € an Fuhrpark 1.355,00 € → GuV −1.355 € · BVV −1.355 €",
        "**Bilanzansatz 31.12.:** 48.770 € − 1.355 € = 47.415 €.",
      ],
    },
    {
      titel: "Waren privat bezahlt, Fracht falsch gebucht",
      sv: "Händler H kauft 20 Rasentrimmer à 300 € abzüglich 5 % Händlerrabatt zzgl. 19 % USt (Rechnung 6.783 €) und bezahlt vom Privatkonto; gebucht hat er nichts. Den Spediteur bezahlt er bar (150 € + 28,50 € USt) und bucht: sonstiger betrieblicher Aufwand 178,50 € an Kasse 178,50 €.",
      loesung: [
        "Die Trimmer sind Waren (Umlaufvermögen, § 247 Abs. 2 HGB e contrario). AK = 6.000 € − 5 % Rabatt = 5.700 € (§ 255 Abs. 1 S. 3 HGB). Die Zahlung vom Privatkonto ist eine Einlage (§ 4 Abs. 1 S. 8 EStG, Bewertung § 6 Abs. 1 Nr. 5 EStG). Die Fracht ist Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB) und gehört auf Warenbezugskosten; die Vorsteuer ist abziehbar (§ 15 Abs. 1 S. 1 Nr. 1 UStG).",
        "BS: Wareneingang 5.700,00 € / Vorsteuer 1.083,00 € an Privateinlagen 6.783,00 € → GuV −5.700 € · BVV −5.700 €",
        "BS: Warenbezugskosten 150,00 € / Vorsteuer 28,50 € an sonstiger betrieblicher Aufwand 178,50 € → GuV +28,50 € · BVV +28,50 €",
      ],
    },
  ],

  "bsr-grundstueck": [
    {
      titel: "Der Klassiker: bebautes Grundstück",
      sv: "Kaufmann K erwirbt ein ausschließlich betrieblich genutztes bebautes Grundstück (Bauantrag 1995, kein Wohngebäude) für 500.000 €, davon 30 % Grund und Boden. Kaufvertrag 10.04., Nutzen und Lasten sowie Zahlung 01.05., Grundbucheintragung 15.08. Gebucht hat K: Aufwand 500.000 € an Bank 500.000 €. Weiter: Makler 10.000 € + 1.900 € USt, privat bezahlt; Notar 1.000 € (Kaufvertrag) + 400 € (Grundschuld) + 266 € USt, per Bank; Gericht 800 € (Eigentumsumschreibung) + 300 € (Grundschuld), per Bank; Grunderwerbsteuer 6,5 % = 32.500 €, per Bank. Zur Finanzierung: Darlehen 300.000 € ab 01.05., 4 % Zinsen jährlich nachschüssig zum 30.04. Außer der ersten Buchung ist nichts gebucht.",
      aufgabe: "Würdigung, Berichtigungsbuchungen und Gewinnauswirkung für das Jahr 01.",
      loesung: [
        "Grund und Boden und Gebäude sind zwei Wirtschaftsgüter des Anlagevermögens (§ 247 Abs. 2 HGB, H 7.1 EStH), notwendiges Betriebsvermögen (R 4.2 Abs. 1, 7 EStR); zu aktivieren nach § 246 Abs. 1 HGB i. V. m. § 5 Abs. 1 S. 1 EStG. Zugang am 01.05. mit Übergang von Nutzen und Lasten (§ 39 Abs. 2 Nr. 1 AO).",
        "**Anschaffungskosten (§ 255 Abs. 1 HGB, § 6 Abs. 1 Nr. 1, 2 EStG):** Kaufpreis 500.000 € + Makler 10.000 € + Notar Kaufvertrag 1.000 € + Gericht Eigentum 800 € + GrESt 32.500 € = 544.300 €; Aufteilung 30 : 70 → **Grund und Boden 163.290 €, Gebäude 381.010 €**. Die Vorsteuer gehört nicht dazu (§ 9b Abs. 1 EStG).",
        "Notar 400 € und Gericht 300 € für die Grundschuld sind Finanzierungskosten → sofort Aufwand.",
        "BS: Grund und Boden 150.000 € / Gebäude 350.000 € an Aufwand 500.000 € → GuV +500.000 € · BVV +500.000 €",
        "BS: Grund und Boden 3.000 € / Gebäude 7.000 € / Vorsteuer 1.900 € an Privateinlagen 11.900 € → GuV 0 · BVV 0 (Einlage, § 4 Abs. 1 S. 8 EStG)",
        "BS: Grund und Boden 300 € / Gebäude 700 € / Rechts- und Beratungskosten 400 € / Vorsteuer 266 € an Bank 1.666 € → GuV −400 € · BVV −400 €",
        "BS: Grund und Boden 240 € / Gebäude 560 € / Nebenkosten des Geldverkehrs 300 € an Bank 1.100 € → GuV −300 € · BVV −300 €",
        "BS: Grund und Boden 9.750 € / Gebäude 22.750 € an Bank 32.500 € → GuV 0 · BVV 0",
        "Gebäude-AfA 3 % (§ 7 Abs. 4 S. 1 Nr. 1 EStG), zeitanteilig (§ 7 Abs. 1 S. 4 EStG): 381.010 € × 3 % × 8/12 = **7.620 €**. Grund und Boden ist nicht abnutzbar.",
        "BS: AfA 7.620 € an Gebäude 7.620 € → GuV −7.620 € · BVV −7.620 €",
        "Zinsen Mai–Dezember als sonstige Verbindlichkeit (§ 252 Abs. 1 Nr. 5 HGB): 300.000 € × 4 % × 8/12 = 8.000 €.",
        "BS: Zinsaufwand 8.000 € an sonstige Verbindlichkeiten 8.000 € → GuV −8.000 € · BVV −8.000 €",
        "**Bilanzansätze 31.12.:** Grund und Boden 163.290 €, Gebäude 373.390 €.",
      ],
    },
  ],

  "bsr-afa": [
    {
      titel: "Maschine im Juli angeschafft",
      sv: "Eine Maschine (AK 36.000 €, ND 10 Jahre) wird am 10.07. geliefert und am 25.08. bezahlt. Bisher ist keine AfA gebucht.",
      loesung: [
        "Die AfA beginnt mit der Lieferung im Juli (§ 9a EStDV), linear und zeitanteilig (§ 7 Abs. 1 S. 1, 4 EStG): 36.000 € ÷ 10 × 6/12 = **1.800 €**.",
        "BS: AfA 1.800 € an Maschinen 1.800 € → GuV −1.800 € · BVV −1.800 €",
      ],
    },
    {
      titel: "GWG oder Sammelposten?",
      sv: "Im Oktober kauft U einen Bürostuhl für 650 € netto und einen Aktenschrank für 900 € netto (ND 13 Jahre). Er möchte die geringste Steuerbelastung.",
      loesung: [
        "**Bürostuhl:** abnutzbar, beweglich, selbständig nutzbar, AK bis 800 € → Sofortabzug als GWG möglich (§ 6 Abs. 2 S. 1 EStG).",
        "**Aktenschrank:** über 800 € → kein GWG; entweder lineare AfA (§ 7 Abs. 1 EStG) 900 € ÷ 13 × 3/12 = 17 € oder Sammelposten (§ 6 Abs. 2a EStG).",
        "**Vergleich:** Wählt U den Sammelposten, muss er ihn für **alle** Wirtschaftsgüter von 250 € bis 1.000 € des Jahres bilden (§ 6 Abs. 2a S. 5 EStG) – dann auch für den Stuhl: (650 € + 900 €) × 20 % = 310 €. Ohne Sammelposten: 650 € (GWG) + 17 € (AfA) = 667 € → günstiger.",
        "BS: GWG-Aufwand 650 € an BGA 650 € · AfA 17 € an BGA 17 €",
      ],
    },
  ],

  "bsr-teilwert": [
    {
      titel: "Wertverlust bei Waren und Maschinen",
      sv: "(1) Waren mit Anschaffungskosten 10.000 € sind am Bilanzstichtag wegen eines Modewechsels dauerhaft nur noch 6.000 € wert. (2) Der Wert einer Maschine (Restbuchwert 20.000 €, Restnutzungsdauer 8 Jahre) liegt wegen einer kurzfristigen Marktschwäche am Stichtag bei 15.000 €, nach zwei Jahren aber wieder über dem planmäßigen Restbuchwert. U will die geringste Steuerbelastung.",
      loesung: [
        "**(1) Handelsrecht:** Abschreibung auf 6.000 € ist Pflicht (§ 253 Abs. 4 HGB).",
        "**(1) Steuerrecht:** Wahlrecht bei dauernder Wertminderung (§ 6 Abs. 1 Nr. 2 S. 2 EStG, § 5 Abs. 1 S. 1 HS. 2 EStG) → Ansatz 6.000 €, Gewinnminderung 4.000 €.",
        "**(2)** Keine Teilwertabschreibung, da die Minderung nicht dauernd ist: Der Wert liegt nur zwei Jahre und damit nicht mindestens die halbe Restnutzungsdauer (4 Jahre) unter dem Restbuchwert (§ 253 Abs. 3 S. 5 HGB, § 6 Abs. 1 Nr. 1 S. 2 EStG).",
      ],
    },
  ],

  "bsr-abgrenzung": [
    {
      titel: "Vier Abgrenzungen zum 31.12.",
      sv: "(1) Kfz-Versicherung 1.200 € für 01.10.01–30.09.02 am 01.10.01 bezahlt und als Aufwand gebucht. (2) Miete für Januar 02 (2.000 €) von einem Mieter am 20.12.01 erhalten und als Ertrag gebucht. (3) Darlehen 300.000 € ab 01.05.01, Zinsen 4 % jährlich nachschüssig am 30.04. – noch nichts gebucht. (4) Darlehen 100.000 € am 01.07.01 mit 96.000 € ausgezahlt (Laufzeit 5 Jahre); gebucht: Bank 96.000 € an Darlehen 96.000 €.",
      loesung: [
        "**(1) Aktiver RAP** (§ 250 Abs. 1 HGB, § 5 Abs. 5 S. 1 Nr. 1 EStG): 9/12 von 1.200 € = 900 €. BS: Aktive RAP 900 € an Versicherungen 900 € → GuV +900 € · BVV +900 €",
        "**(2) Passiver RAP** (§ 250 Abs. 2 HGB, § 5 Abs. 5 S. 1 Nr. 2 EStG). BS: Mieterträge 2.000 € an Passive RAP 2.000 € → GuV −2.000 € · BVV −2.000 €",
        "**(3) Sonstige Verbindlichkeit** (§ 252 Abs. 1 Nr. 5 HGB): 300.000 € × 4 % × 8/12 = 8.000 €. BS: Zinsaufwand 8.000 € an sonstige Verbindlichkeiten 8.000 € → GuV −8.000 € · BVV −8.000 €",
        "**(4) Disagio:** Darlehen mit dem Erfüllungsbetrag 100.000 € (§ 253 Abs. 1 S. 2 HGB, § 6 Abs. 1 Nr. 3 EStG); Disagio als aktiver RAP (§ 5 Abs. 5 S. 1 Nr. 1 EStG), Auflösung 4.000 € ÷ 5 × 6/12 = 400 €.",
        "BS: Aktive RAP 4.000 € an Darlehen 4.000 € → GuV 0 · BVV 0",
        "BS: Zinsaufwand 400 € an Aktive RAP 400 € → GuV −400 € · BVV −400 €",
      ],
    },
  ],

  "bsr-entnahme-einlage": [
    {
      titel: "Warenentnahme und Privatnutzung des Firmenwagens",
      sv: "(1) Händler H entnimmt im Dezember Waren für private Zwecke (aktueller Einkaufspreis 500 € netto, Verkaufspreis 800 € netto). (2) Den Firmenwagen (inländischer Bruttolistenpreis 45.090 €, betriebliche Nutzung 70 %, kein Fahrtenbuch) nutzt H das ganze Jahr auch privat. Nichts davon ist gebucht.",
      loesung: [
        "**(1)** Entnahme (§ 4 Abs. 1 S. 2 EStG) zum Teilwert 500 € (§ 6 Abs. 1 Nr. 4 S. 1 EStG); USt nach § 3 Abs. 1b S. 1 Nr. 1, § 10 Abs. 4 S. 1 Nr. 1 UStG, nicht abziehbar (§ 12 Nr. 3 EStG).",
        "BS: Privatentnahmen 595 € an Unentgeltliche Wertabgaben 500 € / Umsatzsteuer 95 € → GuV +500 € · BVV +500 €",
        "**(2)** Nutzungsentnahme nach der 1-%-Regel, da betriebliche Nutzung über 50 % (§ 6 Abs. 1 Nr. 4 S. 2 EStG): Listenpreis auf volle 100 € abgerundet 45.000 € × 1 % × 12 = 5.400 €. USt nach § 3 Abs. 9a Nr. 1 UStG: BMG 80 % von 5.400 € = 4.320 € (20 % Abschlag für nicht vorsteuerbelastete Kosten), USt 820,80 €.",
        "BS: Privatentnahmen 6.220,80 € an Unentgeltliche Wertabgaben (Kfz-Nutzung) 5.400,00 € / Umsatzsteuer 820,80 € → GuV +5.400 € · BVV +5.400 €",
      ],
    },
  ],
};
