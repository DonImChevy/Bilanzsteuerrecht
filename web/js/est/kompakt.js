// Kompaktwissen Einkommensteuer (GS I, Rechtsstand 2026) – eigene Zusammenfassungen, kein Skripttext.
// Felder: satz, zahlen [[Wert, Bedeutung]], punkte, schema, klausur, fallen, formulierung. **fett**; Normzitate werden in der App antippbar.

export const KOMPAKT_EST = {
  "est-grundlagen": {
    satz: "Die Einkommensteuer besteuert das Einkommen natürlicher Personen für ein Kalenderjahr – erhoben wird sie teils per Abzug an der Quelle, teils durch Veranlagung (§ 1, § 2 Abs. 7 S. 1, § 25 Abs. 1 EStG).",
    zahlen: [["42,5 / 42,5 / 15 %", "Aufkommen Bund / Länder / Gemeinden"], ["25 %", "Abgeltungsteuer auf Kapitalerträge"], ["Kalenderjahr", "Veranlagungszeitraum"]],
    punkte: [
      "**Einordnung:** Personensteuer (knüpft an die persönliche Leistungsfähigkeit an), direkte Steuer (Steuerschuldner = Steuerträger), **Gemeinschaftsteuer** (Art. 106 Abs. 3 GG): Bund und Länder je 42,5 %, Gemeinden 15 % (Art. 106 Abs. 5 GG).",
      "**Gesetzgebung:** konkurrierende Kompetenz des Bundes (Art. 105 Abs. 2 GG), Zustimmung des Bundesrats nötig (Art. 105 Abs. 3 GG); Verwaltung durch die Länder (Art. 108 Abs. 2 GG).",
      "**Rechtsgrundlagen:** EStG und EStDV (Rechtsnormen, binden alle); EStR, EStH und BMF-Schreiben (Verwaltungsanweisungen, binden nur die Verwaltung) (EStDV auf Grundlage von § 51 EStG und Art. 80 Abs. 1 GG).",
      "**Erhebungsformen:** Veranlagung (§ 25 EStG) mit Vorauszahlungen (§ 37 EStG); Abzugsteuern: **Lohnsteuer** (§ 38 EStG) und **Kapitalertragsteuer** (§ 43 EStG) – beide sind Vorauszahlungen auf die ESt bzw. haben abgeltende Wirkung.",
      "**Jahressteuer (§ 2 Abs. 7 EStG):** Die ESt ist eine Jahressteuer, Grundlagen werden für das Kalenderjahr ermittelt (Veranlagungszeitraum, § 25 Abs. 1 EStG).",
      "**Zuschlagsteuern:** Solidaritätszuschlag (5,5 %, mit hoher Freigrenze) und Kirchensteuer (8 bzw. 9 % der ESt) bemessen sich nach der ESt (§ 51a EStG).",
    ],
    fallen: [
      "Richtlinien sind kein Gesetz – für Gerichte nicht bindend (Richter sind nur dem Gesetz unterworfen, Art. 97 Abs. 1 GG).",
      "Lohnsteuer ist keine eigene Steuer, sondern eine Erhebungsform der ESt (§ 38 Abs. 1 EStG).",
    ],
  },

  "est-steuerpflicht": {
    satz: "Wer im Inland wohnt oder sich gewöhnlich aufhält, ist mit seinem gesamten Welteinkommen unbeschränkt steuerpflichtig – alle anderen nur mit ihren inländischen Einkünften (§ 1 Abs. 1, 4 EStG).",
    zahlen: [["> 6 Monate", "gewöhnlicher Aufenthalt (§ 9 S. 2 AO)"], ["90 %", "Grenze fiktive unbeschränkte Stpfl. (§ 1 Abs. 3)"]],
    schema: [
      "Natürliche Person? (von Geburt bis Tod)",
      "Wohnsitz (§ 8 AO) oder gewöhnlicher Aufenthalt (§ 9 AO) im Inland? → § 1 Abs. 1 EStG",
      "Sonst: deutscher Auslandsbediensteter mit Bezügen aus öffentlicher Kasse? → § 1 Abs. 2 EStG",
      "Sonst: Antrag, 90 % der Einkünfte inländisch oder ausländische unter Grundfreibetrag? → § 1 Abs. 3 EStG",
      "Sonst: inländische Einkünfte i. S. d. § 49 EStG? → beschränkt, § 1 Abs. 4 EStG",
    ],
    punkte: [
      "**Unbeschränkte Steuerpflicht (§ 1 Abs. 1 EStG):** natürliche Personen mit **Wohnsitz** oder **gewöhnlichem Aufenthalt** im Inland → **Welteinkommensprinzip** (Doppelbesteuerungsabkommen können entlasten).",
      "**Wohnsitz (§ 8 AO):** eine **Wohnung**, die jemand **innehat** unter Umständen, die darauf schließen lassen, dass er sie **beibehalten und benutzen** wird. Mehrere Wohnsitze sind möglich; Eigentum ist nicht nötig.",
      "**Gewöhnlicher Aufenthalt (§ 9 AO):** nicht nur vorübergehendes Verweilen; stets bei **mehr als 6 Monaten** zusammenhängend (kurze Unterbrechungen zählen mit). Ausnahme: rein private Besuchs-, Erholungs-, Kuraufenthalte bis zu einem Jahr.",
      "**Erweiterte unbeschränkte Steuerpflicht (§ 1 Abs. 2 EStG):** deutsche Staatsangehörige ohne Inlandswohnsitz, die zu einer inländischen juristischen Person des öffentlichen Rechts in einem Dienstverhältnis stehen und Bezüge aus einer öffentlichen Kasse erhalten (z. B. Diplomaten).",
      "**Fiktive unbeschränkte Steuerpflicht (§ 1 Abs. 3 EStG):** auf **Antrag**, wenn mindestens **90 %** der Einkünfte der deutschen ESt unterliegen oder die nicht der deutschen ESt unterliegenden Einkünfte den Grundfreibetrag nicht übersteigen.",
      "**Beschränkte Steuerpflicht (§ 1 Abs. 4 EStG):** keine der obigen Varianten, aber **inländische Einkünfte nach § 49 EStG** – nur diese werden besteuert.",
      "**Beginn und Ende:** mit der Geburt bzw. dem Tod; Wechsel zwischen unbeschränkter und beschränkter Steuerpflicht im Jahr ist möglich (§ 2 Abs. 7 S. 3 EStG).",
    ],
    fallen: [
      "Ein Hotelzimmer oder eine Ferienwohnung, die nur gelegentlich genutzt wird, begründet regelmäßig keinen Wohnsitz (§ 8 AO).",
      "Staatsangehörigkeit spielt für § 1 Abs. 1 EStG keine Rolle.",
    ],
  },

  "est-einkuenfte": {
    satz: "Steuerbar ist nur, was unter eine der sieben Einkunftsarten fällt – bei den ersten drei zählt der Gewinn, bei den übrigen vier der Überschuss der Einnahmen über die Werbungskosten (§ 2 Abs. 1, 2 EStG).",
    zahlen: [["7", "Einkunftsarten (§ 2 Abs. 1 EStG)"], ["3 + 4", "Gewinn- und Überschusseinkünfte"]],
    punkte: [
      "**Gewinneinkunftsarten (§ 2 Abs. 2 S. 1 Nr. 1 EStG):** Land- und Forstwirtschaft (§ 13), **Gewerbebetrieb** (§ 15), **selbständige Arbeit** (§ 18) → Gewinn nach §§ 4–7k EStG.",
      "**Überschusseinkunftsarten (§ 2 Abs. 2 S. 1 Nr. 2 EStG):** **nichtselbständige Arbeit** (§ 19), Kapitalvermögen (§ 20), **Vermietung und Verpachtung** (§ 21), sonstige Einkünfte (§ 22, z. B. Renten, private Veräußerungsgeschäfte § 23) → Einnahmen (§ 8) − Werbungskosten (§§ 9, 9a).",
      "**Dualismus der Einkunftsermittlung:** Bei Gewinneinkünften werden Wertänderungen des Betriebsvermögens erfasst, bei Überschusseinkünften grundsätzlich nur die laufenden Einnahmen (Veräußerung des Vermögens nur in Sonderfällen, §§ 17, 20 Abs. 2, 23).",
      "**Gewerbebetrieb (§ 15 Abs. 2 EStG):** selbständig, nachhaltig, mit **Gewinnerzielungsabsicht**, Beteiligung am allgemeinen wirtschaftlichen Verkehr – und keine LuF, keine freiberufliche Tätigkeit, keine private Vermögensverwaltung.",
      "**Freiberufler (§ 18 Abs. 1 Nr. 1 EStG):** Katalogberufe (Ärzte, Rechtsanwälte, Steuerberater, Architekten, Journalisten …), wissenschaftliche, künstlerische, schriftstellerische, **unterrichtende** und erzieherische Tätigkeit.",
      "**Arbeitnehmer (§ 1 LStDV):** schuldet seine Arbeitskraft, ist weisungsgebunden und in den Betrieb eingegliedert.",
      "**Nicht steuerbar:** Liebhaberei (keine Einkünfteerzielungsabsicht), Erbschaften, Schenkungen, Lottogewinne, private Vermögensumschichtungen außerhalb der §§ 17, 20, 23.",
    ],
    fallen: [
      "Einkünfte aus Kapitalvermögen und V+V sind subsidiär – gehören die Erträge zu einem Betrieb, sind es betriebliche Einkünfte (§ 20 Abs. 8, § 21 Abs. 3 EStG).",
      "„Nebenberuflich“ ist keine Einkunftsart (§ 2 Abs. 1 EStG ist abschließend).",
    ],
  },

  "est-zve": {
    satz: "Vom Einkommen zur Steuer führt ein festes Schema: Summe der Einkünfte, Gesamtbetrag der Einkünfte, Einkommen, zu versteuerndes Einkommen (§ 2 Abs. 3–5 EStG).",
    zahlen: [["36 / 72 €", "Sonderausgaben-Pauschbetrag (§ 10c)"], ["4.260 €", "Entlastungsbetrag Alleinerziehende (1 Kind)"], ["1.000 / 2.000 €", "Sparer-Pauschbetrag"]],
    schema: [
      "Einkünfte aus den 7 Einkunftsarten (§ 2 Abs. 1 EStG)",
      "= Summe der Einkünfte (Verlustausgleich)",
      "− Altersentlastungsbetrag (§ 24a), − Entlastungsbetrag für Alleinerziehende (§ 24b), − Freibetrag für Land- und Forstwirte (§ 13 Abs. 3)",
      "= Gesamtbetrag der Einkünfte (§ 2 Abs. 3 EStG)",
      "− Verlustabzug (§ 10d), − Sonderausgaben (§§ 10–10c), − außergewöhnliche Belastungen (§§ 33–33b)",
      "= Einkommen (§ 2 Abs. 4 EStG)",
      "− Freibeträge für Kinder (§ 32 Abs. 6, nur bei Günstigerprüfung), − Härteausgleich",
      "= zu versteuerndes Einkommen (§ 2 Abs. 5 EStG)",
    ],
    punkte: [
      "**Verlustausgleich:** Verluste werden zuerst innerhalb einer Einkunftsart (horizontal), dann mit anderen Einkunftsarten (vertikal) ausgeglichen (§ 2 Abs. 3 EStG).",
      "**Sonderausgaben:** private Aufwendungen, die der Gesetzgeber zum Abzug zulässt – Vorsorgeaufwendungen (Kranken-, Pflege-, Rentenversicherung), **Kirchensteuer**, Kinderbetreuung, Schulgeld, Spenden. Ohne Nachweis: Pauschbetrag **36 €** (Zusammenveranlagung **72 €**) (§§ 10, 10b, 10c EStG).",
      "**Außergewöhnliche Belastungen (§ 33 EStG):** zwangsläufige, größere Aufwendungen als bei der Mehrzahl (Krankheitskosten), gekürzt um die **zumutbare Belastung**; Pauschbeträge für Menschen mit Behinderung (§ 33b EStG).",
      "**Kinder:** Kindergeld wird monatlich gezahlt; der Kinderfreibetrag wird nur abgezogen, wenn er günstiger ist (Günstigerprüfung, § 31 EStG).",
      "**Die Beträge richtig zuordnen:** Werbungskosten mindern die Einkünfte, Sonderausgaben und agB erst den Gesamtbetrag der Einkünfte (§ 2 Abs. 2–4 EStG).",
    ],
    fallen: [
      "Altersentlastungsbetrag und Entlastungsbetrag für Alleinerziehende werden vor dem Gesamtbetrag der Einkünfte abgezogen – nicht als Sonderausgaben (§ 2 Abs. 3, §§ 24a, 24b EStG).",
      "Kirchensteuer ist Sonderausgabe, Einkommensteuer ist nie abziehbar (§ 12 Nr. 3 EStG).",
    ],
  },

  "est-veranlagung": {
    satz: "Nach Ablauf des Jahres wird die ESt per Bescheid festgesetzt – Ehegatten dürfen zwischen Zusammen- und Einzelveranlagung wählen, Arbeitnehmer werden nur in bestimmten Fällen veranlagt (§ 25 Abs. 1, §§ 26, 46 EStG).",
    zahlen: [["410 €", "Grenze Nebeneinkünfte (§ 46 Abs. 2 Nr. 1)"], ["4 Jahre", "Frist Antragsveranlagung"], ["31.07.", "Abgabefrist ohne Berater"]],
    punkte: [
      "**Veranlagung (§ 25 Abs. 1 EStG):** Die ESt wird nach Ablauf des Kalenderjahres nach dem Einkommen veranlagt, das der Steuerpflichtige in diesem Jahr bezogen hat. Erklärung nach amtlichem Vordruck/elektronisch (§ 25 Abs. 3, 4 EStG).",
      "**Ehegattenwahlrecht (§ 26 Abs. 1 EStG):** Voraussetzungen: Ehe/eingetragene Lebenspartnerschaft, **beide unbeschränkt steuerpflichtig**, **nicht dauernd getrennt lebend** – an mindestens einem Tag des Jahres gleichzeitig erfüllt.",
      "**Zusammenveranlagung (§ 26b EStG):** Einkünfte werden zusammengerechnet, Ehegatten werden gemeinsam als ein Steuerpflichtiger behandelt → **Splittingtarif** (§ 32a Abs. 5 EStG). Ohne Wahl gilt Zusammenveranlagung (§ 26 Abs. 3 EStG).",
      "**Einzelveranlagung (§ 26a EStG):** jeder Ehegatte für seine Einkünfte, Grundtarif; Sonderausgaben, agB und § 35a-Beträge werden dem zugerechnet, der sie getragen hat (auf Antrag hälftig).",
      "**Witwensplitting (§ 32a Abs. 6 S. 1 Nr. 1 EStG):** im Jahr nach dem Tod des Ehegatten noch Splittingtarif.",
      "**Arbeitnehmer (§ 46 EStG):** Lohnsteuer wirkt grundsätzlich abgeltend (§ 46 Abs. 4). **Pflichtveranlagung** z. B. bei Nebeneinkünften über 410 €, Arbeitslohn von mehreren Arbeitgebern, Steuerklassen III/V, Lohnersatzleistungen über 410 €. **Antragsveranlagung** nach § 46 Abs. 2 Nr. 8 EStG (Festsetzungsfrist 4 Jahre).",
      "**Abgabefrist (§ 149 Abs. 2 AO):** 31. Juli des Folgejahres; mit Steuerberater später.",
    ],
    fallen: [
      "Dauerndes Getrenntleben ist mehr als ein vorübergehender Auszug – Lebens- und Wirtschaftsgemeinschaft muss aufgehoben sein (§ 26 Abs. 1 S. 1 Nr. 2 EStG).",
      "Es reicht ein Tag im Jahr, an dem alle Voraussetzungen gleichzeitig vorliegen (§ 26 Abs. 1 S. 1 Nr. 3 EStG).",
    ],
  },

  "est-tarif": {
    satz: "Der Tarif setzt nach einer Nullzone stufenlos steigende Grenzsteuersätze an – das zvE wird auf volle Euro abgerundet, die Steuer ebenfalls (§ 32a Abs. 1 S. 1, 6 EStG).",
    zahlen: [["12.348 €", "Grundfreibetrag 2026"], ["14 → 42 %", "Progressionszonen bis 69.878 €"], ["45 %", "ab 277.826 €"]],
    schema: [
      "zvE auf volle Euro abrunden",
      "Tarifzone bestimmen und nur diese Formel anwenden (§ 32a Abs. 1 EStG)",
      "Bei Zusammenveranlagung: Splitting – Steuer auf zvE/2 berechnen und verdoppeln (§ 32a Abs. 5)",
      "= tarifliche ESt − Steuerermäßigungen (z. B. § 35, § 35a) + Hinzurechnungen = festzusetzende ESt (§ 2 Abs. 6)",
      "− Vorauszahlungen, Lohnsteuer, Kapitalertragsteuer (§ 36 Abs. 2) = Abschlusszahlung oder Erstattung (§ 36 Abs. 4)",
    ],
    punkte: [
      "**Zonen 2026 (§ 32a Abs. 1 EStG):** bis 12.348 € 0; 12.349–17.799 € (14–24 %); 17.800–69.878 € (24–42 %); 69.879–277.825 € 42 %; ab 277.826 € 45 %.",
      "**Formelvariablen:** y = (zvE − 12.348) ÷ 10.000 in Zone 2; z = (zvE − 17.799) ÷ 10.000 in Zone 3 (§ 32a Abs. 1 S. 3, 4 EStG).",
      "**Splittingverfahren:** halbiert das gemeinsame zvE, wendet den Grundtarif an und verdoppelt – vorteilhaft bei unterschiedlich hohen Einkommen (§ 32a Abs. 5 EStG).",
      "**Grenzsteuersatz** = Belastung des nächsten Euros; **Durchschnittsteuersatz** = ESt ÷ zvE – immer niedriger als der Grenzsteuersatz.",
      "**Progressionsvorbehalt (§ 32b EStG):** steuerfreie Lohnersatzleistungen (z. B. Arbeitslosengeld, Elterngeld) erhöhen den Steuersatz auf das übrige zvE.",
      "**Anrechnung (§ 36 Abs. 2 EStG):** Vorauszahlungen und einbehaltene Lohn- und Kapitalertragsteuer werden auf die festgesetzte ESt angerechnet.",
    ],
    fallen: [
      "Nicht mehrere Zonen „stückweise“ rechnen – es gilt nur die eine Formel (§ 32a Abs. 1 S. 2 EStG).",
      "Splitting: nicht den halben Grundfreibetrag abziehen, sondern zvE halbieren (§ 32a Abs. 5 EStG).",
    ],
  },

  "est-einnahmen": {
    satz: "Einnahmen sind alle Güter in Geld oder Geldeswert, die im Rahmen einer Überschusseinkunftsart zufließen – manche davon stellt § 3 EStG ausdrücklich steuerfrei.",
    zahlen: [["50 €", "Sachbezugsfreigrenze monatlich"], ["1.080 €", "Rabattfreibetrag (§ 8 Abs. 3)"], ["3.300 € / 960 €", "Übungsleiter / Ehrenamt"]],
    punkte: [
      "**Einnahmen (§ 8 Abs. 1 EStG):** alle Güter in Geld oder Geldeswert, die dem Steuerpflichtigen im Rahmen einer der Einkunftsarten des § 2 Abs. 1 Nr. 4–7 zufließen.",
      "**Sachbezüge (§ 8 Abs. 2 EStG):** mit dem üblichen Endpreis am Abgabeort; steuerfrei bis **50 € im Monat** (Freigrenze – bei Überschreiten ist alles steuerpflichtig).",
      "**Personalrabatt (§ 8 Abs. 3 EStG):** Waren/Dienstleistungen des Arbeitgebers: 96 % des Endpreises, Rabattfreibetrag **1.080 €** im Jahr.",
      "**Übungsleiterfreibetrag (§ 3 Nr. 26 EStG):** nebenberufliche Tätigkeit als Übungsleiter, Ausbilder, Erzieher, Betreuer, Künstler oder Pfleger für eine juristische Person des öffentlichen Rechts oder eine gemeinnützige Einrichtung – steuerfrei bis **3.300 €** (seit 2026).",
      "**Ehrenamtspauschale (§ 3 Nr. 26a EStG):** andere nebenberufliche Tätigkeiten für solche Träger (Vorstand, Kassenwart, Platzwart) bis **960 €**; § 3 Nr. 26 hat Vorrang.",
      "**Nebenberuflich:** höchstens ein Drittel einer Vollzeitstelle (ca. 14 Std./Woche); eine Haupttätigkeit ist nicht erforderlich (zu § 3 Nr. 26 S. 1 EStG, R 3.26 Abs. 2 LStR).",
      "**§ 3c Abs. 1 EStG:** Ausgaben, die mit steuerfreien Einnahmen unmittelbar zusammenhängen, sind nicht abziehbar. **Ausnahme § 3 Nr. 26 S. 2 EStG:** Ausgaben sind abziehbar, soweit sie die steuerfreien Einnahmen übersteigen.",
      "**Weitere Befreiungen:** z. B. Arbeitslosengeld (§ 3 Nr. 2, mit Progressionsvorbehalt), Reisekostenerstattungen des Arbeitgebers (§ 3 Nr. 13, 16), private Nutzung betrieblicher PCs und Handys (§ 3 Nr. 45).",
    ],
    fallen: [
      "Die Sachbezugsgrenze ist eine Freigrenze, kein Freibetrag (§ 8 Abs. 2 S. 11 EStG).",
      "Der Übungsleiterfreibetrag gilt nicht für Tätigkeiten für private, nicht gemeinnützige Unternehmen (§ 3 Nr. 26 S. 1 EStG).",
    ],
  },

  "est-ausgaben": {
    satz: "Kosten der privaten Lebensführung sind nicht abziehbar – auch wenn sie dem Beruf nützen; gemischte Aufwendungen werden aufgeteilt, wenn das objektiv möglich ist (§ 12 Nr. 1 EStG).",
    zahlen: [["< 10 %", "untergeordneter Anteil – voller Abzug bzw. Ausschluss"]],
    punkte: [
      "**§ 12 Nr. 1 EStG:** Aufwendungen für den Haushalt und den Unterhalt der Familie (Wohnung, Essen, Kleidung) sowie für die Lebensführung, die die wirtschaftliche oder gesellschaftliche Stellung mit sich bringt (**Repräsentationsaufwand**), sind nicht abziehbar – auch wenn sie den Beruf fördern.",
      "**Gemischte Aufwendungen (BFH, Großer Senat):** Lassen sich berufliche und private Veranlassung nach **objektiven Kriterien** trennen (Zeit, Fläche, Kilometer), wird **aufgeteilt**. Ist der private oder berufliche Anteil **untergeordnet (unter 10 %)**, gilt alles als privat bzw. beruflich (§ 12 Nr. 1 S. 2 EStG).",
      "**Nicht trennbar** (z. B. bürgerliche Kleidung, Brille, Tageszeitung) → insgesamt nicht abziehbar (§ 12 Nr. 1 S. 2 EStG).",
      "**Typische Berufskleidung** (Uniform, Robe, Schutzkleidung) ist dagegen Arbeitsmittel (§ 9 Abs. 1 S. 3 Nr. 6 EStG).",
      "**§ 12 Nr. 2 EStG:** freiwillige Zuwendungen und Zuwendungen an gesetzlich unterhaltsberechtigte Personen. **Nr. 3:** Steuern vom Einkommen (ESt, Soli) und die USt auf Entnahmen. **Nr. 4:** Geldstrafen.",
      "**Vorrang:** Was als Sonderausgabe oder außergewöhnliche Belastung ausdrücklich zugelassen ist, bleibt abziehbar („soweit … nichts anderes bestimmt“) (Einleitungssatz des § 12 EStG).",
    ],
    fallen: [
      "„Fördert den Beruf“ reicht nicht – die private Mitveranlassung schließt den Abzug aus, wenn sie nicht trennbar ist (§ 12 Nr. 1 S. 2 EStG).",
      "Kirchensteuer ist trotz § 12 Nr. 3 als Sonderausgabe abziehbar (§ 10 Abs. 1 Nr. 4 EStG).",
    ],
  },

  "est-zufluss": {
    satz: "Bei Überschusseinkünften zählt das Kalenderjahr, in dem Geld tatsächlich zufließt oder abfließt – mit einer 10-Tage-Ausnahme für regelmäßig wiederkehrende Zahlungen um den Jahreswechsel (§ 11 Abs. 1 S. 1, 2, Abs. 2 S. 1, 2 EStG).",
    zahlen: [["10 Tage", "kurze Zeit um den Jahreswechsel"], ["> 5 Jahre", "Vorauszahlung für Nutzung – verteilbar"]],
    punkte: [
      "**Zufluss (§ 11 Abs. 1 S. 1 EStG):** wenn der Steuerpflichtige die **wirtschaftliche Verfügungsmacht** erlangt – Barzahlung, Gutschrift auf dem Konto, Scheck mit Übergabe (bei Deckung).",
      "**Abfluss (§ 11 Abs. 2 S. 1 EStG):** wenn der Steuerpflichtige die wirtschaftliche Verfügungsmacht verliert – bei Überweisung mit Eingang des Auftrags bei der Bank (gedecktes Konto), bei Lastschrift mit Abbuchung.",
      "**Regelmäßig wiederkehrende Einnahmen/Ausgaben (§ 11 Abs. 1 S. 2, Abs. 2 S. 2 EStG):** Werden sie **kurze Zeit (10 Tage)** vor Beginn oder nach Ende des Kalenderjahres gezahlt, zu dem sie wirtschaftlich gehören, gelten sie in diesem Jahr als zu- bzw. abgeflossen. Auch die **Fälligkeit** muss in diesem Zeitraum liegen.",
      "**Typische Fälle:** Miete, Zinsen, **USt-Vorauszahlungen** (fällig am 10.01.), Versicherungsbeiträge (§ 11 Abs. 1 S. 2, Abs. 2 S. 2 EStG; Fälligkeit der USt-Vorauszahlung § 18 Abs. 1 S. 4 UStG).",
      "**Vorauszahlungen für eine Nutzungsüberlassung von mehr als 5 Jahren** können gleichmäßig verteilt werden (Einnahmen: Wahlrecht, § 11 Abs. 1 S. 3; Ausgaben: Pflicht, § 11 Abs. 2 S. 3 EStG).",
      "**Arbeitslohn:** laufender Arbeitslohn gilt im Kalenderjahr als bezogen, in dem der Lohnzahlungszeitraum endet (§ 11 Abs. 1 S. 4 i. V. m. § 38a Abs. 1 EStG).",
      "**Nicht nach § 11:** AfA auf abnutzbare Arbeitsmittel (§ 9 Abs. 1 S. 3 Nr. 7 i. V. m. § 7 EStG) – sie wird über die Nutzungsdauer verteilt, egal wann bezahlt wurde – und die Gewinnermittlung durch Bestandsvergleich.",
    ],
    fallen: [
      "Die 10-Tage-Regel gilt nur für regelmäßig wiederkehrende Zahlungen – nicht für einmalige (§ 11 Abs. 1 S. 2 EStG).",
      "Nicht das Rechnungsdatum, sondern der Zahlungszeitpunkt entscheidet (§ 11 Abs. 1 S. 1, Abs. 2 S. 1 EStG).",
    ],
  },

  "est-werbungskosten": {
    satz: "Werbungskosten sind alle Aufwendungen, die durch die Einnahmeerzielung veranlasst sind – wer weniger als 1.230 € nachweist, bekommt als Arbeitnehmer den Pauschbetrag (§ 9 Abs. 1 S. 1, § 9a S. 1 Nr. 1 a EStG).",
    zahlen: [["1.230 €", "Arbeitnehmer-Pauschbetrag"], ["102 €", "Pauschbetrag Versorgungsbezüge/Renten"], ["6 € / max. 1.260 €", "Home-Office-Pauschale"], ["800 €", "GWG-Grenze netto für Arbeitsmittel"]],
    punkte: [
      "**Definition (§ 9 Abs. 1 S. 1 EStG):** Aufwendungen zur **Erwerbung, Sicherung und Erhaltung** der Einnahmen – abzuziehen bei der Einkunftsart, bei der sie erwachsen sind. Auch vorweggenommene (Bewerbung) und nachträgliche WK sind möglich.",
      "**Katalog (§ 9 Abs. 1 S. 3 EStG):** Beiträge zu Berufsverbänden/**Gewerkschaften** (Nr. 3), Wege zur ersten Tätigkeitsstätte (Nr. 4), doppelte Haushaltsführung (Nr. 5), **Arbeitsmittel** (Nr. 6), AfA (Nr. 7).",
      "**Arbeitsmittel:** Fachbücher, Werkzeug, typische Berufskleidung, Computer. Bis **800 € netto** sofort abziehbar, darüber AfA über die Nutzungsdauer (§ 9 Abs. 1 S. 3 Nr. 7 i. V. m. § 6 Abs. 2 EStG). Computer und Software: Nutzungsdauer 1 Jahr.",
      "**Häusliches Arbeitszimmer:** nur abziehbar, wenn es den **Mittelpunkt** der gesamten Tätigkeit bildet – tatsächliche Kosten oder Jahrespauschale 1.260 €. Sonst **Home-Office-Pauschale 6 € je Tag**, höchstens 1.260 € im Jahr (§ 4 Abs. 5 S. 1 Nr. 6b, 6c EStG).",
      "**Reisekosten (§ 9 Abs. 4a EStG):** Verpflegungspauschale 14 € bei mehr als 8 Stunden Abwesenheit bzw. An- und Abreisetag, 28 € bei 24 Stunden; Fahrtkosten mit 0,30 € je gefahrenem km.",
      "**Pauschbeträge (§ 9a EStG):** **1.230 €** bei Arbeitslohn aus einem aktiven Dienstverhältnis (Nr. 1 a), 102 € bei Versorgungsbezügen (Nr. 1 b) und Renten (Nr. 3) – **Jahresbeträge**, nicht zeitanteilig, höchstens bis zur Höhe der Einnahmen. **Seit 2026 Gewerkschaftsbeiträge zusätzlich** (§ 9a S. 3).",
      "**Vergleich:** tatsächliche WK (ohne Gewerkschaftsbeiträge) gegen den Pauschbetrag – der höhere Betrag wird abgezogen (§ 9a S. 1, 3 EStG).",
    ],
    fallen: [
      "Der Pauschbetrag wird nicht zusätzlich zu nachgewiesenen WK gewährt (§ 9a S. 1 EStG: „wenn nicht höhere Werbungskosten nachgewiesen werden“).",
      "Bei Arbeitnehmern ist die Umsatzsteuer Teil der Werbungskosten – nur die GWG-Grenze wird netto geprüft (§ 9 Abs. 1 S. 3 Nr. 7 S. 2 i. V. m. § 6 Abs. 2 S. 1 EStG).",
    ],
  },

  "est-entfernung": {
    satz: "Für jeden Arbeitstag gibt es 0,38 € pro vollem Kilometer der einfachen Strecke zur ersten Tätigkeitsstätte – unabhängig vom Verkehrsmittel und seit 2026 ab dem ersten Kilometer (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 EStG).",
    zahlen: [["0,38 €", "je Entfernungskilometer ab 2026"], ["4.500 €", "Höchstbetrag ohne eigenen Pkw"], ["einfache Strecke", "kürzeste Straßenverbindung"]],
    schema: [
      "Erste Tätigkeitsstätte bestimmen (§ 9 Abs. 4 EStG)",
      "Arbeitstage mit Aufsuchen der Tätigkeitsstätte zählen",
      "Volle km der kürzesten Straßenverbindung (abrunden; längere Strecke nur, wenn verkehrsgünstiger und regelmäßig genutzt)",
      "Arbeitstage × km × 0,38 €",
      "Höchstbetrag 4.500 € prüfen (gilt nicht für eigenen/überlassenen Pkw)",
      "Höhere Kosten für öffentliche Verkehrsmittel? (§ 9 Abs. 2 S. 2 EStG)",
    ],
    punkte: [
      "**Entfernungspauschale (§ 9 Abs. 1 S. 3 Nr. 4 EStG):** für jeden Arbeitstag, an dem der Arbeitnehmer die erste Tätigkeitsstätte aufsucht, **0,38 €** für jeden vollen Kilometer der Entfernung – **ab 2026 einheitlich ab dem ersten Kilometer** (2025: 0,30 € bis 20 km).",
      "**Nur einmal je Arbeitstag** – auch bei mehreren Wegen; Hin- und Rückweg sind abgegolten (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 EStG).",
      "**Höchstbetrag 4.500 €** im Jahr – **gilt nicht**, soweit ein eigener oder zur Nutzung überlassener **Pkw** benutzt wird (nicht für Motorrad, Fahrgemeinschaft-Mitfahrer, Bahn) (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 HS. 2 EStG).",
      "**Abgeltungswirkung (§ 9 Abs. 2 S. 1 EStG):** Mit der Pauschale sind alle Kosten abgegolten (Parkgebühren, Kfz-Kosten). **Ausnahmen:** Unfallkosten auf dem Arbeitsweg; höhere tatsächliche Kosten für **öffentliche Verkehrsmittel** (§ 9 Abs. 2 S. 2); Menschen mit Behinderung (§ 9 Abs. 2 S. 3).",
      "**Erste Tätigkeitsstätte (§ 9 Abs. 4 EStG):** ortsfeste betriebliche Einrichtung, der der Arbeitnehmer dauerhaft zugeordnet ist (Zuordnung durch den Arbeitgeber, sonst quantitative Kriterien). Je Dienstverhältnis höchstens eine.",
      "**Home-Office-Tage** zählen nicht als Arbeitstage für die Pauschale (bei anderem Arbeitsplatz) (§ 9 Abs. 5 S. 1 i. V. m. § 4 Abs. 5 S. 1 Nr. 6c EStG).",
    ],
    fallen: [
      "Kilometer abrunden, nicht aufrunden („voller Kilometer“, § 9 Abs. 1 S. 3 Nr. 4 S. 2 EStG).",
      "Nicht Hin- und Rückweg doppelt zählen (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 EStG: Entfernung).",
      "Der Höchstbetrag gilt nur für die Strecke ohne Pkw (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 HS. 2 EStG).",
    ],
  },
};

export const KLAUSUR_EST = {
  titel: "ESt-Klausur: so holst du die Punkte",
  aufbau: [
    "**Gesamtfall-Charakter:** Steuerpflicht prüfen → Einkunftsarten bestimmen → Einkünfte berechnen → Schema bis zum zvE → ggf. Tarif.",
    "**Sichere Punkte:** saubere Definitionen (Steuerpflicht, Einkunftsart, Werbungskosten) mit genauer Norm; Rechenwege mit Zwischenergebnissen.",
    "**Punktesammler:** auswendig gelernte Klausursätze bringen Punkte, ohne dass gerechnet werden muss.",
  ],
  top: ["est-werbungskosten", "est-entfernung", "est-steuerpflicht", "est-einkuenfte", "est-zufluss", "est-zve"],
  tipps: [
    "Immer prüfen: Pauschbetrag oder tatsächliche Werbungskosten?",
    "Bei Zahlungen um den Jahreswechsel an § 11 EStG denken.",
    "Das zvE-Schema vollständig hinschreiben – auch Zeilen mit 0 €.",
  ],
};
