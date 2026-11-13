// Kompaktwissen Umsatzsteuer (GS I, Rechtsstand 2026) – eigene Zusammenfassungen, kein Skripttext.
// Felder: satz, zahlen [[Wert, Bedeutung]], punkte, schema, klausur, fallen, formulierung. **fett**; Normzitate werden in der App antippbar.

export const KOMPAKT_UST = {
  "ust-grundlagen": {
    satz: "Die Umsatzsteuer belastet am Ende nur den privaten Verbrauch – Unternehmer schulden sie auf ihre Umsätze und holen sich die gezahlte Steuer über den Vorsteuerabzug zurück (§ 1 Abs. 1 Nr. 1, § 15 Abs. 1 UStG).",
    zahlen: [["19 %", "Regelsteuersatz (§ 12 Abs. 1 UStG)"], ["7 %", "ermäßigter Satz (§ 12 Abs. 2 UStG)"], ["Monat", "Voranmeldungszeitraum, wenn die Steuer des Vorjahres mehr als 9.000 € betrug – sonst das Kalendervierteljahr (§ 18 Abs. 2 S. 1, 2 UStG)"]],
    punkte: [
      "**System:** Allphasen-Netto-Umsatzsteuer mit Vorsteuerabzug – jede Stufe versteuert ihren Umsatz, zieht aber die ihr berechnete Steuer ab (§ 15 UStG). Nur der Endverbraucher bleibt belastet.",
      "**Unternehmer (§ 2 Abs. 1 S. 1 UStG):** wer eine gewerbliche oder berufliche Tätigkeit **selbständig** ausübt. Gewerblich oder beruflich ist jede **nachhaltige** Tätigkeit zur **Erzielung von Einnahmen** – Gewinnabsicht ist nicht nötig (§ 2 Abs. 1 S. 3 UStG).",
      "**Unternehmerfähig** ist jedes Gebilde, das nach außen auftritt: natürliche Person, OHG, KG, GmbH, auch eine **GbR oder ein Ehepaar**, das gemeinsam ein Gebäude vermietet (§ 2 Abs. 1 S. 1 UStG).",
      "**Unternehmenseinheit (§ 2 Abs. 1 S. 2 UStG):** Ein Unternehmer hat nur **ein** Unternehmen – Arztpraxis und vermietete Ferienwohnung gehören zusammen. Leistungen zwischen den Betriebsteilen sind **nicht steuerbare Innenumsätze**.",
      "**Rahmen des Unternehmens (§ 1 Abs. 1 Nr. 1 S. 1 UStG):** Dazu gehören **Grundgeschäfte** (der eigentliche Unternehmenszweck), **Hilfsgeschäfte** (z. B. der Verkauf von Anlagevermögen wie dem alten Praxisgerät) und **Nebengeschäfte** (vgl. Abschn. 2.7 Abs. 2 UStAE).",
      "**Inland (§ 1 Abs. 2 S. 1 UStG):** das Gebiet der Bundesrepublik Deutschland ohne Büsingen, Helgoland und die Freihäfen. Nur Umsätze, deren Ort im Inland liegt, sind steuerbar.",
      "**Beginn und Ende:** Die Unternehmereigenschaft beginnt mit der ersten nach außen erkennbaren Vorbereitungshandlung (z. B. Kauf der Ladeneinrichtung) und endet erst, wenn der Unternehmer alle Rechtsbeziehungen abgewickelt hat, die mit dem Betrieb zusammenhängen (vgl. § 2 Abs. 1 UStG, Abschn. 2.6 Abs. 1, 6 UStAE).",
      "**Steuerschuldner** ist grundsätzlich der leistende Unternehmer (§ 13a Abs. 1 Nr. 1 UStG); er berechnet die Steuer selbst und übermittelt die Voranmeldung bis zum **10. Tag nach Ablauf** des Voranmeldungszeitraums (§ 18 Abs. 1 S. 1 UStG).",
    ],
    fallen: [
      "Arbeitnehmer sind nicht selbständig (§ 2 Abs. 2 Nr. 1 UStG) – auch leitende Angestellte sind keine Unternehmer.",
      "„Gewinnerzielungsabsicht“ ist **kein** Merkmal – Einnahmeerzielung genügt (§ 2 Abs. 1 S. 3 UStG).",
      "Die Unternehmereigenschaft nur einmal prüfen – außer der Rahmen des Unternehmens ändert sich im Sachverhalt.",
    ],
  },

  "ust-leistung": {
    satz: "Erst die Art der Leistung bestimmen – Lieferung oder sonstige Leistung –, denn davon hängen Ort, Steuersatz und Entstehung ab (§ 3 Abs. 1, 9 UStG).",
    punkte: [
      "**Lieferung (§ 3 Abs. 1 UStG):** Der Unternehmer verschafft dem Abnehmer die **Verfügungsmacht** an einem Gegenstand – der Abnehmer kann wirtschaftlich wie ein Eigentümer darüber verfügen. Maßgeblich ist die Übergabe, nicht die Zahlung.",
      "**Eigentumsvorbehalt (§ 449 BGB):** Die Lieferung ist trotzdem mit der **Übergabe** ausgeführt – zivilrechtliches Eigentum ist nicht entscheidend.",
      "**Sonstige Leistung (§ 3 Abs. 9 S. 1 UStG):** alle Leistungen, die keine Lieferungen sind – Vermietung, Beratung, Reparatur, Unterricht, Beförderung, Restaurantumsätze. Auch ein **Unterlassen oder Dulden** kann eine sonstige Leistung sein (§ 3 Abs. 9 S. 2 UStG).",
      "**Werklieferung (§ 3 Abs. 4 UStG):** Der Unternehmer bearbeitet einen Gegenstand und verwendet dabei **eigene Hauptstoffe** → Lieferung. Steuert er nur **Zutaten oder sonstige Nebensachen** bei, bleibt es eine Werkleistung, also eine sonstige Leistung (§ 3 Abs. 4 S. 1 UStG).",
      "**Einheitlichkeit der Leistung:** Eine **Nebenleistung** teilt das Schicksal der Hauptleistung (Ort, Steuersatz, Befreiung). Nebenleistung = für den Kunden kein eigener Zweck, sondern Mittel, die Hauptleistung besser in Anspruch zu nehmen (Abschn. 3.10 Abs. 5 UStAE).",
      "**Typische Nebenleistungen:** Verpackung und **Versandkosten** zur Lieferung, das **Wollknäuel im Strickkurs**, **Heizkosten** und Betriebskosten zur Miete, das Medikament bei der Heilbehandlung (Abschn. 3.10 Abs. 5 UStAE).",
      "**Mehrere Hauptleistungen** zu einem Gesamtpreis (z. B. ein zusammengestellter **Präsentkorb**): Preis nach den Einzelwerten aufteilen und jede Lieferung mit ihrem Steuersatz besteuern (Aufteilung des Entgelts nach § 10 Abs. 1 UStG).",
    ],
    fallen: [
      "Geld ist kein Gegenstand einer Lieferung – Zahlungen (auch der Versicherung) sind keine Leistung (§ 3 Abs. 1 UStG).",
      "Die Versandkostenpauschale nicht als eigene Beförderungsleistung besteuern – sie ist Teil der Lieferung (Nebenleistung, Abschn. 3.10 Abs. 5 UStAE).",
      "Nicht mit dem Zahlungszeitpunkt argumentieren, wenn nach dem Zeitpunkt der Lieferung gefragt ist (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
    ],
  },

  "ust-ort": {
    satz: "Steuerbar ist nur, was im Inland ausgeführt wird – der Ort entscheidet, und für Lieferungen und sonstige Leistungen gelten ganz verschiedene Regeln (§ 1 Abs. 1 Nr. 1, Abs. 2 S. 1 UStG).",
    schema: [
      "Lieferung oder sonstige Leistung? (Art bestimmen)",
      "Lieferung: Wird der Gegenstand befördert oder versendet? → § 3 Abs. 6 S. 1 UStG, sonst § 3 Abs. 7 S. 1 UStG",
      "Sonstige Leistung: zuerst die Sonderregeln (§ 3a Abs. 3 UStG, § 3b UStG), dann die Grundregel – Empfänger ist Unternehmer (§ 3a Abs. 2 UStG) oder nicht (§ 3a Abs. 1 UStG)",
      "Liegt der Ort im Inland (§ 1 Abs. 2 UStG)?",
    ],
    punkte: [
      "**Bewegte Lieferung (§ 3 Abs. 6 S. 1 UStG):** Ort ist dort, wo die Beförderung oder Versendung **beginnt** – Pullover per DHL von Hannover nach München: Ort Hannover.",
      "**Befördern** = der Lieferer/Abnehmer transportiert selbst; **versenden** = ein selbständiger Dritter (Spediteur, DHL) wird beauftragt (§ 3 Abs. 6 S. 2, 3 UStG).",
      "**Unbewegte Lieferung (§ 3 Abs. 7 S. 1 UStG):** Ort ist dort, wo sich der Gegenstand bei Verschaffung der Verfügungsmacht befindet – z. B. Grundstücke, Verkauf im Laden.",
      "**Leistung an einen Unternehmer für dessen Unternehmen („B2B“, § 3a Abs. 2 S. 1 UStG):** Ort ist dort, von wo aus der **Empfänger** sein Unternehmen betreibt.",
      "**Leistung an einen Nichtunternehmer („B2C“, § 3a Abs. 1 S. 1 UStG):** Ort ist dort, von wo aus der **leistende** Unternehmer sein Unternehmen betreibt.",
      "**Grundstücksleistungen (§ 3a Abs. 3 Nr. 1 UStG):** Lage des Grundstücks – Vermietung, Makler, Architekt, Bauleistungen, Ferienwohnung.",
      "**Kurzfristige Vermietung eines Beförderungsmittels** (bis 30 Tage, Wasserfahrzeuge bis 90 Tage): dort, wo es dem Empfänger **übergeben** wird (§ 3a Abs. 3 Nr. 2 UStG).",
      "**Kultur, Unterricht, Sport, Unterhaltung an Nichtunternehmer:** dort, wo die Leistung **tatsächlich erbracht** wird; bei Streaming am Wohnsitz des Empfängers (§ 3a Abs. 3 Nr. 3 UStG).",
      "**Restaurationsleistungen** (an alle Kunden) und **Arbeiten an beweglichen Gegenständen** für Nichtunternehmer: dort, wo sie tatsächlich erbracht werden (§ 3a Abs. 3 Nr. 3a UStG).",
      "**Eintrittsberechtigungen** zu Messen und Veranstaltungen für Unternehmer: am **Veranstaltungsort** (§ 3a Abs. 3 Nr. 5 UStG). **Personenbeförderung:** dort, wo sie bewirkt wird, also auf der Strecke (§ 3b Abs. 1 S. 1 UStG).",
    ],
    fallen: [
      "§ 3a Abs. 2 UStG nicht prüfen, bevor die Sonderregeln des Abs. 3 ausgeschlossen sind.",
      "Bei Versendung zählt der **Beginn** – nicht der Wohnort des Kunden (§ 3 Abs. 6 S. 1, 4 UStG).",
      "Ort und Zeitpunkt nicht verwechseln: Der Ort beantwortet nur, **ob** der Umsatz im Inland steuerbar ist (§ 1 Abs. 2 UStG gegenüber § 13 Abs. 1 UStG).",
    ],
  },

  "ust-entgelt": {
    satz: "Steuerbar nach § 1 Abs. 1 Nr. 1 UStG ist ein Umsatz nur, wenn alle fünf Merkmale vorliegen – Unternehmer, Rahmen des Unternehmens, Leistung, Entgelt, Inland.",
    schema: [
      "Unternehmer (§ 2 Abs. 1 UStG)",
      "im Rahmen seines Unternehmens (§ 2 Abs. 1 S. 2 UStG)",
      "Lieferung (§ 3 Abs. 1 UStG) oder sonstige Leistung (§ 3 Abs. 9 UStG)",
      "gegen Entgelt – Leistungsaustausch (§ 1 Abs. 1 Nr. 1 S. 1 UStG)",
      "im Inland (§ 1 Abs. 2 UStG; Ort nach §§ 3 ff., 3a UStG)",
      "→ steuerbar; danach: Steuerbefreiung (§ 4 UStG) und Option (§ 9 UStG), Bemessungsgrundlage (§ 10 UStG) und Steuersatz (§ 12 UStG), Entstehung (§ 13 UStG), Änderungen (§ 17 UStG), Vorsteuer (§ 15 UStG)",
    ],
    punkte: [
      "**Leistungsaustausch:** Leistung und Gegenleistung sind **wirtschaftlich verknüpft** – die eine wird gerade wegen der anderen erbracht. Die Höhe ist hier egal; ein zu niedriger Preis ist erst eine Frage der Bemessungsgrundlage (§ 10 Abs. 5 UStG).",
      "**Kein Leistungsaustausch:** echter **Schadensersatz** (Versicherungszahlung, Mahngebühren, Verzugszinsen), echte Zuschüsse, Erbschaften, Schenkungen von Geld (es fehlt die Gegenleistung i. S. d. § 1 Abs. 1 Nr. 1 UStG).",
      "**Tausch (§ 3 Abs. 12 S. 1 UStG):** Das Entgelt für eine Lieferung besteht in einer Lieferung. **Tauschähnlicher Umsatz (§ 3 Abs. 12 S. 2 UStG):** Das Entgelt für eine sonstige Leistung besteht in einer Lieferung oder sonstigen Leistung. Bemessungsgrundlage ist jeweils der Wert der Gegenleistung (§ 10 Abs. 2 S. 2 UStG).",
      "**Innenumsätze** innerhalb desselben Unternehmens sind nicht steuerbar – z. B. wenn die Ladeninhaberin an ihr eigenes Vermietungskonto „Miete“ überweist (§ 2 Abs. 1 S. 2 UStG).",
      "**Fehlt das Entgelt**, ist der Fall nicht erledigt: Dann **unentgeltliche Wertabgabe** prüfen (§ 3 Abs. 1b, Abs. 9a UStG).",
      "**Ausgangsumsätze zuerst:** Erst alle Ausgangsumsätze prüfen, dann die Vorsteuer – ob Vorsteuer abziehbar ist, hängt von den eigenen Ausgangsumsätzen ab (§ 15 Abs. 2 UStG).",
    ],
    fallen: [
      "Nie mit § 4 UStG beginnen – eine Befreiung setzt voraus, dass die Steuerbarkeit bejaht wurde.",
      "Schlagworte wie „Schadensersatz ist nicht steuerbar“ ersetzen nicht die Prüfung der Merkmale (Prüfung nach § 1 Abs. 1 Nr. 1 UStG).",
      "Auch bei steuerfreien Umsätzen die Bemessungsgrundlage und den Anmeldezeitraum angeben – das gibt Punkte (§ 10 Abs. 1, § 18 Abs. 1 UStG).",
    ],
  },

  "ust-befreiung": {
    satz: "Steuerbefreiungen greifen erst nach bejahter Steuerbarkeit – und bei manchen kann der Unternehmer auf die Befreiung verzichten, um Vorsteuer zu retten (§ 4, § 9 Abs. 1 UStG).",
    zahlen: [["§ 4 Nr. 12", "Vermietung von Grundstücken"], ["§ 4 Nr. 14", "Heilbehandlungen"], ["§ 9", "Option zur Steuerpflicht"]],
    punkte: [
      "**§ 4 Nr. 12 a UStG – Vermietung von Grundstücken** ist steuerfrei. **Ausnahmen (S. 2):** kurzfristige Beherbergung (Hotel, **Ferienwohnung**), Vermietung von **Stellplätzen**, Betriebsvorrichtungen → steuerpflichtig. Parkplätze **zusammen mit** der Wohnung/Praxis sind aber Nebenleistung und ebenfalls frei.",
      "**§ 4 Nr. 14 a UStG – Heilbehandlungen** von Ärzten, Heilpraktikern, Physiotherapeuten sind steuerfrei, wenn ein **therapeutisches Ziel** im Vordergrund steht: Vorsorge, Diagnose, Behandlung, Beratung zur Krankheitsvorbeugung.",
      "**Nicht frei** sind z. B. Gutachten für eine **Lebensversicherung** und Schönheitsoperationen ohne medizinischen Grund (kein therapeutisches Ziel) sowie **Tierarztleistungen** (keine Humanmedizin, § 4 Nr. 14 a UStG). Ein im Rahmen der Behandlung verabreichtes Medikament ist Nebenleistung → ebenfalls frei (Abschn. 3.10 Abs. 5 UStAE).",
      "**§ 4 Nr. 9 a UStG:** Umsätze, die unter das Grunderwerbsteuergesetz fallen (Grundstücksverkauf). **§ 4 Nr. 8 UStG:** Geld- und Kreditgeschäfte. **§ 4 Nr. 10, 11 UStG:** Versicherungen und Versicherungsvertreter.",
      "**§ 4 Nr. 28 UStG:** Verkauf von Gegenständen, die **ausschließlich für steuerfreie Tätigkeiten** nach § 4 Nr. 8–27, 29 genutzt wurden (z. B. Untersuchungsgerät der Ärztin) oder für die der Vorsteuerabzug nach § 15 Abs. 1a ausgeschlossen war – steuerfrei.",
      "**Option (§ 9 Abs. 1 UStG):** Verzicht auf die Befreiung bei bestimmten Umsätzen (u. a. Nr. 8, 9a, 12), wenn der Umsatz an einen **anderen Unternehmer für dessen Unternehmen** ausgeführt wird.",
      "**Zusätzlich bei Grundstücksvermietung (§ 9 Abs. 2 UStG):** Option nur, wenn der **Mieter** das Grundstück ausschließlich für Umsätze verwendet, die den Vorsteuerabzug **nicht ausschließen**. Rechtsanwalt, Tischler → ja. **Arzt, Versicherungsvertreter → nein.** Wohnung an Privatleute → nein (kein Unternehmer).",
      "**Folge der Befreiung:** Vorsteuer aus zugehörigen Eingangsleistungen ist ausgeschlossen (§ 15 Abs. 2 S. 1 Nr. 1 UStG).",
    ],
    fallen: [
      "„Alle optimalen Wahlrechte nutzen“ im Vorspann heißt: Option prüfen und – wenn zulässig – ausüben (§ 9 Abs. 1 UStG).",
      "§ 9 Abs. 2 S. 1 UStG stellt auf die Umsätze des **Mieters** ab, nicht auf die des Vermieters.",
      "Auch steuerfreie Umsätze brauchen Bemessungsgrundlage und Anmeldezeitraum in der Lösung (§ 10 Abs. 1, § 18 Abs. 1 UStG).",
    ],
  },

  "ust-bmg": {
    satz: "Die Bemessungsgrundlage ist alles, was der Kunde aufwendet – ohne die Umsatzsteuer selbst; aus Bruttobeträgen wird die Steuer herausgerechnet (§ 10 Abs. 1 S. 2 UStG).",
    zahlen: [["÷ 1,19", "Brutto → Netto bei 19 %"], ["× 19/119", "Steuer aus Brutto"], ["× 7/107", "Steuer aus Brutto bei 7 %"]],
    punkte: [
      "**Entgelt (§ 10 Abs. 1 S. 2 UStG):** alles, was den Wert der Gegenleistung bildet, die der Unternehmer vom Empfänger oder von einem Dritten erhält – **abzüglich der gesetzlich geschuldeten Umsatzsteuer**.",
      "**Durchlaufende Posten (§ 10 Abs. 1 S. 4 UStG)** gehören nicht dazu – Beträge, die der Unternehmer im Namen und für Rechnung eines anderen vereinnahmt (z. B. Zulassungsgebühren im Namen des Kunden).",
      "**Regelsatz 19 % (§ 12 Abs. 1 UStG).** **7 % (§ 12 Abs. 2 UStG)** u. a. für Gegenstände der **Anlage 2** (Lebensmittel, Bücher, **Zeitungen**), kurzfristige **Beherbergung** (Nr. 11) und **Restaurant- und Verpflegungsleistungen** (Nr. 15) – **Getränke bleiben 19 %**.",
      "**Getränke in Anlage 2:** Milch und Milchmischgetränke sind ermäßigt; **Säfte, Cola, Wein, Bier, Kaffee als Getränk** sind 19 %. Kaffee**bohnen** sind Lebensmittel → 7 %.",
      "**Nebenleistungen** erhalten den Steuersatz der Hauptleistung (z. B. Versandkosten, Verpackung, Heizkosten zur Miete) (Abschn. 3.10 Abs. 5 UStAE).",
      "**Mindestbemessungsgrundlage (§ 10 Abs. 5 UStG):** Bei Leistungen an nahestehende Personen oder Personal ist mindestens der Wert nach § 10 Abs. 4 UStG anzusetzen, wenn das Entgelt niedriger ist.",
      "**Wertabgaben:** eigene Bemessungsgrundlage nach § 10 Abs. 4 UStG (Einkaufspreis bzw. Ausgaben).",
    ],
    fallen: [
      "Steuer aus Brutto nicht mit 19 % des Bruttobetrags rechnen – richtig ist × 19/119 (§ 10 Abs. 1 S. 2 UStG).",
      "Mahngebühren und Schadensersatz gehören nicht zum Entgelt (kein Entgelt i. S. d. § 10 Abs. 1 S. 2 UStG).",
      "Bei Rabatt oder Skonto im selben Voranmeldungszeitraum gleich die geminderte Bemessungsgrundlage ansetzen; sonst wird später berichtigt (§ 17 Abs. 1 S. 1 UStG).",
    ],
  },

  "ust-entstehung": {
    satz: "Bei Soll-Versteuerung entsteht die Steuer mit Ablauf des Monats der Leistung – Anzahlungen ziehen sie vor, spätere Änderungen werden nach § 17 UStG korrigiert.",
    zahlen: [["Monatsende", "Die Steuer entsteht mit Ablauf des Voranmeldungszeitraums der Leistung (§ 13 Abs. 1 Nr. 1 a S. 1 UStG)"], ["Zahlung", "Bei Anzahlungen entsteht sie mit Ablauf des Voranmeldungszeitraums der Vereinnahmung (§ 13 Abs. 1 Nr. 1 a S. 4 UStG)"]],
    schema: [
      "Wann ist die (Teil-)Leistung ausgeführt? → Voranmeldungszeitraum bestimmen",
      "Gab es vorher Anzahlungen? → Steuer insoweit im Voranmeldungszeitraum der Vereinnahmung (§ 13 Abs. 1 Nr. 1 a S. 4 UStG)",
      "Rest-Steuer im Voranmeldungszeitraum der Leistung",
      "Ändert sich das Entgelt später? → § 17 UStG im Voranmeldungszeitraum der Änderung",
    ],
    punkte: [
      "**Vereinbarte Entgelte (Soll-Versteuerung, § 16 Abs. 1 UStG):** Die Steuer entsteht mit **Ablauf des Voranmeldungszeitraums**, in dem die Leistung **ausgeführt** wurde (§ 13 Abs. 1 Nr. 1 a S. 1 UStG) – egal, wann der Kunde zahlt.",
      "**Ratenzahlung:** volle Steuer im Monat der Lieferung – nicht nach Raten verteilen (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
      "**Anzahlungen (§ 13 Abs. 1 Nr. 1 a S. 4 UStG):** Wird vor der Leistung gezahlt, entsteht die Steuer insoweit mit Ablauf des Voranmeldungszeitraum der **Vereinnahmung** („Mindest-Ist-Versteuerung“).",
      "**Dauerleistungen** wie Vermietung: monatliche Teilleistungen (§ 13 Abs. 1 Nr. 1 a S. 2, 3 UStG) – jede Monatsmiete entsteht im Mietmonat, auch wenn sie später gezahlt wird; Quartalsmieten im Voraus sind Anzahlungen.",
      "**Änderung der Bemessungsgrundlage (§ 17 Abs. 1 UStG):** Skonto, Rabatt, Rücksendung, Gutschrift → Steuer im Voranmeldungszeitraum der Änderung berichtigen; der Empfänger berichtigt seine Vorsteuer entsprechend (§ 17 Abs. 1 S. 2 UStG).",
      "**Uneinbringlichkeit (§ 17 Abs. 2 Nr. 1 UStG):** Steuer berichtigen; wird später doch gezahlt, erneut erhöhen. Bloßer Zahlungsverzug reicht nicht.",
      "**Wertabgaben** entstehen mit Ablauf des Voranmeldungszeitraum ihrer Ausführung (§ 13 Abs. 1 Nr. 2 UStG); die nach § 14c UStG geschuldete Steuer entsteht im Zeitpunkt der **Ausgabe der Rechnung** (§ 13 Abs. 1 Nr. 3 UStG).",
      "**Ist-Versteuerung (§ 20 S. 1 UStG):** Besteuerung nach **vereinnahmten** Entgelten – nur auf Antrag, u. a. bei einem Vorjahresumsatz bis **800.000 €** und für Freiberufler. Die Steuer entsteht dann mit Ablauf des Voranmeldungszeitraums der Vereinnahmung (§ 13 Abs. 1 Nr. 1 b UStG). In Klausuren ist sie meist ausgeschlossen.",
    ],
    fallen: [
      "Nicht den Zahlungstag nennen, wenn nach Soll-Versteuerung gefragt ist (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
      "Entstehung „mit Ablauf“ des Monats – nicht „am Tag der Lieferung“ (§ 13 Abs. 1 Nr. 1 a S. 1 UStG).",
      "Ändert sich das Entgelt noch im selben Voranmeldungszeitraum, ist keine Berichtigung nach § 17 Abs. 1 UStG nötig – dann gleich die richtige Bemessungsgrundlage ansetzen.",
    ],
  },

  "ust-vorsteuer": {
    satz: "Vorsteuer darf nur abziehen, wer als Unternehmer eine Leistung für sein Unternehmen von einem anderen Unternehmer bezieht und eine ordnungsgemäße Rechnung hat – und nur, soweit er keine steuerfreien Umsätze damit ausführt (§ 15 Abs. 1 S. 1 Nr. 1, Abs. 2 S. 1 Nr. 1 UStG).",
    zahlen: [["10 %", "Mindestnutzung für Zuordnung (§ 15 Abs. 1 S. 2)"], ["250 €", "Kleinbetragsrechnung brutto (§ 33 UStDV)"], ["50 €", "Geschenkgrenze netto je Empfänger und Jahr (§ 4 Abs. 5 S. 1 Nr. 1 EStG, § 15 Abs. 1a UStG)"]],
    schema: [
      "Leistungsempfänger ist Unternehmer und bezieht für sein Unternehmen (§ 15 Abs. 1 S. 1 Nr. 1 UStG)",
      "Leistung von einem **anderen Unternehmer** (§ 15 Abs. 1 S. 1 Nr. 1 UStG, § 2 Abs. 1 UStG)",
      "Ordnungsgemäße Rechnung mit den Pflichtangaben (§ 14 Abs. 4 UStG) – der Unternehmer muss sie **besitzen** (§ 15 Abs. 1 S. 1 Nr. 1 S. 2 UStG)",
      "Steuer ist **gesetzlich geschuldet** (§ 15 Abs. 1 S. 1 Nr. 1 UStG) – Höhe: die gesetzliche Steuer, höchstens die ausgewiesene",
      "Zeitpunkt: Leistung **und** Rechnung liegen vor (bei Anzahlung: Zahlung und Rechnung)",
      "Kein Ausschluss: nicht abziehbare Aufwendungen (§ 15 Abs. 1a UStG), steuerfreie Ausgangsumsätze (§ 15 Abs. 2 S. 1 Nr. 1 UStG) mit Rückausnahme (§ 15 Abs. 3 UStG); bei gemischter Verwendung Aufteilung (§ 15 Abs. 4 UStG)",
    ],
    punkte: [
      "**Rechnungspflichtangaben (§ 14 Abs. 4 UStG):** Name und Anschrift beider Seiten, Steuernummer/USt-IdNr., Ausstellungsdatum, fortlaufende Nummer, Menge und Art, Leistungszeitpunkt, Entgelt nach Steuersätzen, Steuersatz und Steuerbetrag. Seit 2025 müssen Unternehmer **elektronische Rechnungen** empfangen können (§ 14 Abs. 1 S. 3, Abs. 2 UStG).",
      "**Kleinbetragsrechnung bis 250 € brutto (§ 33 UStDV):** Name und Anschrift des Leistenden, Datum, Menge und Art, Bruttobetrag und Steuersatz genügen – Vorsteuer herausrechnen.",
      "**Falscher Steuerbetrag:** Abziehbar ist nur die **gesetzlich geschuldete** Steuer. Zu hoch ausgewiesen → nur der richtige Betrag (den Mehrbetrag schuldet der Lieferant nach § 14c Abs. 1 UStG); zu niedrig ausgewiesen → höchstens der ausgewiesene Betrag.",
      "**Kein Vorsteuerabzug** aus Rechnungen von Privatpersonen und Kleinunternehmern – dort wird keine Steuer für eine Leistung gesetzlich geschuldet. Weist der Aussteller trotzdem Steuer aus, schuldet er sie selbst (§ 14c Abs. 2 UStG); der Empfänger darf sie nicht abziehen.",
      "**Zuordnung (§ 15 Abs. 1 S. 2 UStG):** Gegenstände, die zu weniger als 10 % unternehmerisch genutzt werden, gelten nicht als für das Unternehmen bezogen. In Klausuren bei gemischter Nutzung meist 100 % Zuordnung.",
      "**§ 15 Abs. 1a UStG:** kein Abzug für Aufwendungen, die nach § 4 Abs. 5 EStG nicht abziehbar sind – v. a. **Geschenke über 50 €** je Empfänger und Jahr.",
      "**§ 15 Abs. 2 S. 1 Nr. 1 UStG:** kein Abzug für Leistungen, die für **steuerfreie** Ausgangsumsätze verwendet werden (Arzt, Vermietung ohne Option). Bei gemischter Verwendung **aufteilen** (§ 15 Abs. 4 UStG), z. B. nach Flächen.",
    ],
    fallen: [
      "Vorsteuer nie im Zahlungsmonat abziehen, wenn Leistung und Rechnung schon vorher vorlagen (§ 15 Abs. 1 S. 1 Nr. 1 UStG).",
      "Eine Quittung einer Privatperson ist keine Rechnung mit Steuerausweis (§ 14 Abs. 1, 4 UStG).",
      "Erst die Ausgangsumsätze klären, dann über § 15 Abs. 2 UStG entscheiden.",
    ],
  },

  "ust-wertabgabe": {
    satz: "Was der Unternehmer ohne Gegenleistung aus dem Unternehmen herausgibt, wird wie ein Umsatz besteuert – damit der Vorsteuerabzug nicht zu unversteuertem Privatverbrauch führt (§ 3 Abs. 1b, Abs. 9a UStG).",
    zahlen: [["50 €", "Geschenke von geringem Wert, netto je Empfänger und Jahr (§ 3 Abs. 1b S. 1 Nr. 3 UStG, § 4 Abs. 5 S. 1 Nr. 1 EStG)"], ["60 €", "Aufmerksamkeiten an Personal, brutto (§ 3 Abs. 1b S. 1 Nr. 2 UStG, Abschn. 1.8 Abs. 3 UStAE)"], ["1 %", "des Listenpreises je Monat bei privater Pkw-Nutzung (Abschn. 15.23 Abs. 5 UStAE)"]],
    punkte: [
      "**§ 3 Abs. 1b S. 1 Nr. 1 UStG – Entnahme:** Der Unternehmer entnimmt einen Gegenstand für **private** Zwecke (Ware aus dem Laden für den eigenen Haushalt).",
      "**Nr. 2 – Zuwendung an das Personal** für dessen privaten Bedarf – außer **Aufmerksamkeiten** (bis 60 € brutto, z. B. Blumen zum Geburtstag) (§ 3 Abs. 1b S. 1 Nr. 2 UStG).",
      "**Nr. 3 – jede andere unentgeltliche Zuwendung** (Geschenke an Kunden) – außer **Geschenke von geringem Wert** (bis 50 € netto je Empfänger und Jahr) und Warenmuster (§ 3 Abs. 1b S. 1 Nr. 3 UStG).",
      "**Voraussetzung (§ 3 Abs. 1b S. 2 UStG):** Der Gegenstand oder seine Bestandteile haben zum **vollen oder teilweisen Vorsteuerabzug** berechtigt. Ohne Vorsteuerabzug keine Wertabgabe.",
      "**§ 3 Abs. 9a Nr. 1 UStG – Verwendung** eines Unternehmensgegenstands für private Zwecke (private Pkw-Nutzung); **Nr. 2** – unentgeltliche sonstige Leistung (Mitarbeiter des Betriebs streicht privat das Haus des Chefs).",
      "**Bemessungsgrundlage (§ 10 Abs. 4 UStG):** Nr. 1 Einkaufspreis zzgl. Nebenkosten zum **Zeitpunkt der Entnahme** (sonst Selbstkosten); Nr. 2 die vorsteuerbelasteten **Ausgaben** (anteilig); Nr. 3 Ausgaben für die sonstige Leistung.",
      "**Pkw-Privatnutzung:** Vereinfachend 1 % des Listenpreises je Monat, davon **20 % Abschlag** für nicht vorsteuerbelastete Kosten; alternativ Fahrtenbuch (§ 10 Abs. 4 S. 1 Nr. 2 UStG, Abschn. 15.23 UStAE).",
      "**Ort** wie bei einer entgeltlichen Leistung, **Entstehung** mit Ablauf des Voranmeldungszeitraum der Ausführung (§ 13 Abs. 1 Nr. 2 UStG).",
    ],
    fallen: [
      "Nicht den ursprünglichen Einkaufspreis ansetzen, sondern den **aktuellen** im Zeitpunkt der Entnahme (§ 10 Abs. 4 S. 1 Nr. 1 UStG).",
      "Ohne vorherigen Vorsteuerabzug (z. B. von Privat gekauft) keine Entnahmebesteuerung (§ 3 Abs. 1b S. 2 UStG).",
      "Wertabgaben sind steuerbar nach § 1 Abs. 1 Nr. 1 UStG – sie werden einer entgeltlichen Leistung gleichgestellt.",
    ],
  },

  "ust-sonder": {
    satz: "Kleinunternehmer, falsch ausgewiesene Steuer, Kommission, Reihengeschäft und Umkehr der Steuerschuld sind Spezialfälle, die in Klausuren als Zusatzpunkte auftauchen (§ 19 UStG, § 14c UStG, § 3 Abs. 3 UStG, § 3 Abs. 6a UStG, § 13b UStG, § 25a UStG).",
    zahlen: [["25.000 €", "Gesamtumsatz des Vorjahres, den ein Kleinunternehmer nicht überschreiten darf (§ 19 Abs. 1 S. 1 UStG)"], ["100.000 €", "Grenze im laufenden Jahr (§ 19 Abs. 1 S. 1 UStG)"], ["5 Jahre", "Bindung an den Verzicht (§ 19 Abs. 3 S. 3 UStG)"]],
    punkte: [
      "**Kleinunternehmer (§ 19 Abs. 1 S. 1 UStG, seit 2025):** Umsätze sind **steuerfrei**, wenn der Gesamtumsatz im Vorjahr **25.000 €** nicht überschritten hat und im laufenden Jahr **100.000 €** nicht überschreitet. Wird die 100.000-€-Grenze überschritten, endet die Befreiung **sofort** – schon der Umsatz, mit dem die Grenze überschritten wird, ist steuerpflichtig (vgl. Abschn. 19.1 UStAE).",
      "**Folgen:** kein Steuerausweis, **kein Vorsteuerabzug** (§ 15 Abs. 2 S. 1 Nr. 1 UStG). Der Unternehmer kann auf die Befreiung **verzichten** (§ 19 Abs. 3 S. 1 UStG) – der Verzicht bindet ihn mindestens fünf Kalenderjahre (§ 19 Abs. 3 S. 3 UStG).",
      "**§ 14c Abs. 1 UStG – unrichtiger Ausweis:** Ein Unternehmer weist **zu viel** Steuer aus (19 % statt 7 %, Steuer auf steuerfreien Umsatz) → er schuldet den Mehrbetrag; berichtigen ist möglich. Der Empfänger darf den Mehrbetrag **nicht** als Vorsteuer abziehen.",
      "**§ 14c Abs. 2 UStG – unberechtigter Ausweis:** Wer gar nicht berechtigt ist (Privatperson, Kleinunternehmer, Scheinrechnung), schuldet den ausgewiesenen Betrag (§ 14c Abs. 2 S. 1 UStG). In beiden Fällen entsteht die Steuer mit **Ausgabe der Rechnung** (§ 13 Abs. 1 Nr. 3 UStG).",
      "**Umkehr der Steuerschuldnerschaft (§ 13b UStG, „Reverse Charge“):** Der **Leistungsempfänger** schuldet die Steuer (§ 13b Abs. 5 UStG), z. B. bei Werklieferungen und sonstigen Leistungen eines im **Ausland ansässigen Unternehmers** (§ 13b Abs. 2 Nr. 1 UStG) und bei **Bauleistungen** an Bauunternehmer (§ 13b Abs. 2 Nr. 4 UStG). Er kann sie unter den übrigen Voraussetzungen zugleich als Vorsteuer abziehen (§ 15 Abs. 1 S. 1 Nr. 4 UStG).",
      "**Kommission (§ 3 Abs. 3 UStG):** Der Kommissionär kauft oder verkauft im eigenen Namen für fremde Rechnung. Zwischen Kommittent und Kommissionär liegt **eine eigene Lieferung** vor – bei der Verkaufskommission erst, wenn der Kommissionär an den Kunden liefert.",
      "**Reihengeschäft (§ 3 Abs. 6a UStG):** Mehrere Unternehmer schließen über denselben Gegenstand Umsatzgeschäfte ab, und er gelangt **unmittelbar** vom ersten zum letzten Abnehmer. Nur **eine** Lieferung ist die bewegte (Ort nach § 3 Abs. 6 UStG), die anderen sind ruhende (Ort nach § 3 Abs. 7 S. 2 UStG). Eine Skizze hilft.",
      "**Differenzbesteuerung (§ 25a Abs. 1 UStG):** Ein **Wiederverkäufer**, der bewegliche Gegenstände ohne Steuerausweis eingekauft hat (z. B. von einer Privatperson), versteuert nur die **Marge**: Verkaufspreis abzüglich Einkaufspreis, daraus die Umsatzsteuer herausgerechnet (§ 25a Abs. 3 S. 1 UStG).",
    ],
    fallen: [
      "Die Grenzen des Kleinunternehmers beziehen sich auf den **Gesamtumsatz ohne Umsatzsteuer**, berechnet nach vereinnahmten Entgelten (§ 19 Abs. 2 S. 1 UStG).",
      "§ 14c Abs. 1 UStG betrifft Unternehmer mit zu hohem Steuerausweis, § 14c Abs. 2 UStG Personen, die gar keine Steuer ausweisen dürfen – nicht verwechseln.",
      "Der Leistungsempfänger kann nie mehr Vorsteuer abziehen, als gesetzlich geschuldet ist (§ 15 Abs. 1 S. 1 Nr. 1 UStG).",
    ],
  },
};

export const KLAUSUR_UST = {
  titel: "USt-Klausur: so holst du die Punkte",
  aufbau: [
    "**180 Minuten, 4–6 Sachverhalte** mit vorgegebenen Bearbeitungszeiten (15–60 Minuten). Hilfsmittel: USt-Handausgabe, Gesetzestexte, Taschenrechner.",
    "**Vorspann lesen:** Welche Personen sind zu beurteilen? Welche Normen sind ausgeschlossen (§§ 14c, 19, 20, 25a)? Voranmeldungszeitraum = Kalendermonat. „Optimale Wahlrechte“ = Option prüfen.",
    "**Pro Umsatz** immer dieselbe Reihenfolge: Steuerbarkeit (Art, Ort) → Steuerpflicht/Option → Bemessungsgrundlage und Steuersatz → Steuerbetrag → Entstehung/Voranmeldungszeitraum → Änderungen (§ 17) → Vorsteuer (Recht, Höhe, Zeitpunkt).",
  ],
  top: ["ust-befreiung", "ust-vorsteuer", "ust-entstehung", "ust-bmg", "ust-leistung", "ust-ort"],
  tipps: [
    "Erst alle Ausgangsumsätze, dann die Vorsteuer – sie hängt von den Ausgangsumsätzen ab.",
    "Bei jedem Betrag den Rechenweg zeigen (Brutto ÷ 1,19) und auf den Cent runden.",
    "Auch bei steuerfreien und nicht steuerbaren Umsätzen kurz begründen – „nicht steuerbar, weil …“ bringt Punkte.",
  ],
};
