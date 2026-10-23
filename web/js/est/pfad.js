// Lernpfad Einkommensteuer (GS I, Rechtsstand 2026). Jeder Block ist in sich geschlossen:
// Seine Lernkarten erklären alles, was seine Fragen abfragen. Format wie js/ust/pfad.js.

export const PFAD_EST = [
  {
    id: "e-einfuehrung", titel: "Was ist die Einkommensteuer?", kurz: "Steuerart und Erhebung", icon: "📘", normen: ["EStG 25 1", "EStG 36 2"],
    karten: [
      { art: "merksatz", titel: "Einordnung", text: "Die Einkommensteuer besteuert das **Einkommen natürlicher Personen**. Sie ist eine\n• **Personensteuer** – persönliche Umstände wie Ehe oder Kinder zählen,\n• **direkte Steuer** – wer sie schuldet, trägt sie auch,\n• **Gemeinschaftsteuer** – das Aufkommen teilen sich Bund und Länder (je 42,5 %) und Gemeinden (15 %)." },
      { art: "erklaerung", titel: "Zwei Wege der Erhebung", text: "• **Steuerabzug an der Quelle**: Der Arbeitgeber behält die **Lohnsteuer** ein, die Bank die **Kapitalertragsteuer**. Das sind keine eigenen Steuern, sondern Formen der Einkommensteuer.\n• **Veranlagung** (§ 25 EStG): Nach Ablauf des Jahres gibt man eine Steuererklärung ab, das Finanzamt setzt die Steuer per **Bescheid** fest. Bereits gezahlte Lohnsteuer wird **angerechnet** (§ 36 Abs. 2 EStG)." },
      { art: "beispiel", titel: "Juristische Personen?", text: "Eine GmbH zahlt **keine** Einkommensteuer, sondern **Körperschaftsteuer** – die „Einkommensteuer der juristischen Personen“." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer zahlt Einkommensteuer?", optionen: ["Natürliche Personen", "GmbHs und AGs", "Jeder Unternehmer für seinen Umsatz", "Nur Arbeitnehmer"], richtig: 0, erkl: "Juristische Personen zahlen Körperschaftsteuer." },
      { art: "wahl", frage: "Was ist die Lohnsteuer?", optionen: ["Eine Erhebungsform der Einkommensteuer", "Eine eigene Steuer neben der ESt", "Eine Steuer des Arbeitgebers", "Eine Gemeindesteuer"], richtig: 0, erkl: "Der Arbeitgeber behält sie für den Arbeitnehmer ein; bei der Veranlagung wird sie angerechnet." },
      { art: "wahl", frage: "Wie viel Prozent des ESt-Aufkommens erhalten die Gemeinden?", optionen: ["15 %", "42,5 %", "50 %", "0 %"], richtig: 0, erkl: "Gemeinden 15 %, Bund und Länder je 42,5 %." },
    ],
  },
  {
    id: "e-steuerpflicht", titel: "Wer ist steuerpflichtig?", kurz: "§ 1 EStG · §§ 8, 9 AO", icon: "🧑", normen: ["EStG 1 1", "EStG 1 4", "AO 8", "AO 9", "BGB 1"],
    karten: [
      { art: "merksatz", titel: "Unbeschränkte Steuerpflicht", text: "Unbeschränkt einkommensteuerpflichtig ist eine **natürliche Person** (§ 1 BGB: ab Vollendung der Geburt), die im **Inland** einen **Wohnsitz** (§ 8 AO) **oder** ihren **gewöhnlichen Aufenthalt** (§ 9 AO) hat (§ 1 Abs. 1 S. 1 EStG). Folge: Besteuert wird das **Welteinkommen** – auch Einkünfte aus dem Ausland." },
      { art: "erklaerung", titel: "Wohnsitz und gewöhnlicher Aufenthalt", text: "• **Wohnsitz** (§ 8 AO): eine **Wohnung**, die man unter Umständen **innehat**, die darauf schließen lassen, dass man sie **beibehalten und benutzen** wird. Eigentum ist nicht nötig – Miete genügt.\n• **Gewöhnlicher Aufenthalt** (§ 9 AO): man hält sich nicht nur vorübergehend auf; immer bei **mehr als sechs Monaten** zusammenhängend (kurze Unterbrechungen zählen nicht). Ausnahme: Besuchs-, Erholungs-, Kur- oder ähnliche private Aufenthalte bis zu einem Jahr." },
      { art: "erklaerung", titel: "Beschränkte Steuerpflicht", text: "Wer im Inland **weder** Wohnsitz **noch** gewöhnlichen Aufenthalt hat, aber **inländische Einkünfte** erzielt (z. B. eine vermietete Wohnung in Hamburg), ist **beschränkt** steuerpflichtig (§ 1 Abs. 4 EStG) – nur mit diesen inländischen Einkünften." },
      { art: "klausur", titel: "Klausursatz (4 Punkte!)", text: "„Unbeschränkt einkommensteuerpflichtig (≙ Welteinkommensprinzip) ist gemäß § 1 Abs. 1 S. 1 EStG eine natürliche Person (§ 1 BGB), die im Inland (§ 1 Abs. 1 S. 2 EStG) einen Wohnsitz (§ 8 AO) oder ihren gewöhnlichen Aufenthalt (§ 9 AO) hat.“" },
    ],
    fragen: [
      { art: "wahl", frage: "Eine Französin lebt in Paris und vermietet eine Wohnung in Köln. Wie ist sie in Deutschland steuerpflichtig?", optionen: ["Beschränkt – nur mit den Mieteinkünften", "Unbeschränkt", "Gar nicht", "Unbeschränkt, aber nur mit dem Welteinkommen aus Frankreich"], richtig: 0, erkl: "Kein Wohnsitz und kein gewöhnlicher Aufenthalt im Inland, aber inländische Einkünfte → § 1 Abs. 4 EStG." },
      { art: "wahl", frage: "Ein Monteur aus Polen arbeitet 8 Monate durchgehend auf einer Baustelle in Leipzig und wohnt im Hotel. Steuerpflicht?", optionen: ["Unbeschränkt – gewöhnlicher Aufenthalt (> 6 Monate)", "Beschränkt", "Keine", "Nur in Polen"], richtig: 0, erkl: "Mehr als sechs Monate zusammenhängend → gewöhnlicher Aufenthalt (§ 9 AO), auch ohne eigene Wohnung." },
      { art: "wahl", frage: "Was bedeutet unbeschränkte Steuerpflicht?", optionen: ["Das Welteinkommen wird besteuert", "Nur inländische Einkünfte werden besteuert", "Es gibt keinen Grundfreibetrag", "Die Steuer ist unbegrenzt hoch"], richtig: 0, erkl: "Welteinkommensprinzip: alle Einkünfte, egal aus welchem Land." },
      { art: "wahl", frage: "Braucht man für einen Wohnsitz Eigentum an der Wohnung?", optionen: ["Nein – innehaben genügt, z. B. als Mieter", "Ja, immer", "Nur bei Ausländern", "Nur bei einer Wohnung über 50 m²"], richtig: 0, erkl: "§ 8 AO verlangt nur, dass man die Wohnung innehat und beibehalten wird." },
    ],
  },
  {
    id: "e-einkunftsarten", titel: "Die sieben Einkunftsarten", kurz: "§ 2 Abs. 1, 2 EStG", icon: "🧾", normen: ["EStG 2 1", "EStG 2 2"],
    karten: [
      { art: "merksatz", titel: "Nur sieben Arten sind steuerbar", text: "Besteuert wird nur, was unter eine der **sieben Einkunftsarten** fällt (§ 2 Abs. 1 EStG):\n1. Land- und Forstwirtschaft\n2. Gewerbebetrieb\n3. selbständige Arbeit\n4. nichtselbständige Arbeit\n5. Kapitalvermögen\n6. Vermietung und Verpachtung\n7. sonstige Einkünfte (§ 22 EStG, z. B. Renten)\nLottogewinne oder Erbschaften fallen unter keine Art → keine Einkommensteuer." },
      { art: "erklaerung", titel: "Gewinn oder Überschuss?", text: "• **Gewinneinkünfte** (Nr. 1–3): Einkünfte = **Gewinn** (§ 2 Abs. 2 Nr. 1 EStG).\n• **Überschusseinkünfte** (Nr. 4–7): Einkünfte = **Einnahmen − Werbungskosten** (§ 2 Abs. 2 Nr. 2 EStG).\nDiese Zweiteilung nennt man **Dualismus der Einkunftsarten**." },
      { art: "beispiel", titel: "Zuordnen", text: "• Angestellte Bankkauffrau → **nichtselbständige Arbeit** (Nr. 4)\n• Ärztin mit eigener Praxis → **selbständige Arbeit** (Nr. 3, freier Beruf)\n• Bäckerei → **Gewerbebetrieb** (Nr. 2)\n• Zinsen vom Sparbuch → **Kapitalvermögen** (Nr. 5)\n• Vermietete Wohnung → **Vermietung und Verpachtung** (Nr. 6)" },
    ],
    fragen: [
      { art: "wahl", frage: "Ein selbständiger Steuerberater erzielt Einkünfte aus …", optionen: ["selbständiger Arbeit", "Gewerbebetrieb", "nichtselbständiger Arbeit", "sonstigen Einkünften"], richtig: 0, erkl: "Freier Beruf → § 2 Abs. 1 Nr. 3, § 18 EStG." },
      { art: "wahl", frage: "Wie ermittelt man Einkünfte aus Vermietung und Verpachtung?", optionen: ["Einnahmen − Werbungskosten", "Als Gewinn", "Einnahmen ohne Abzüge", "Umsatz − Vorsteuer"], richtig: 0, erkl: "Vermietung ist eine Überschusseinkunftsart (Nr. 6)." },
      { art: "wahl", frage: "Jemand gewinnt 100.000 € im Lotto. Einkommensteuer?", optionen: ["Nein – keine der sieben Einkunftsarten", "Ja, sonstige Einkünfte", "Ja, Kapitalvermögen", "Ja, mit 25 %"], richtig: 0, erkl: "Spielgewinne fallen unter keine Einkunftsart." },
      { art: "wahl", frage: "Welche Einkunftsarten sind Gewinneinkünfte?", optionen: ["Land- und Forstwirtschaft, Gewerbebetrieb, selbständige Arbeit", "Alle sieben", "Nur Gewerbebetrieb", "Kapitalvermögen und Vermietung"], richtig: 0, erkl: "§ 2 Abs. 2 Nr. 1 EStG: Nr. 1 bis 3." },
    ],
  },
  {
    id: "e-schema", titel: "Vom Einkommen zum zvE", kurz: "§ 2 Abs. 3–5 EStG", icon: "Σ", normen: ["EStG 2 3", "EStG 2 4", "EStG 2 5"],
    karten: [
      { art: "merksatz", titel: "Das Schema in vier Stufen", text: "**Summe der Einkünfte** (alle sieben Arten zusammen)\n− Altersentlastungsbetrag, Entlastungsbetrag für Alleinerziehende\n= **Gesamtbetrag der Einkünfte** (§ 2 Abs. 3 EStG)\n− **Sonderausgaben** und **außergewöhnliche Belastungen**\n= **Einkommen** (§ 2 Abs. 4 EStG)\n− Kinderfreibeträge (nur wenn günstiger als Kindergeld)\n= **zu versteuerndes Einkommen** (§ 2 Abs. 5 EStG)" },
      { art: "erklaerung", titel: "Was ist was?", text: "• **Sonderausgaben**: private Ausgaben, die das Gesetz trotzdem zum Abzug zulässt – z. B. Vorsorgeaufwendungen (Kranken-, Rentenversicherung), Kirchensteuer, Spenden.\n• **Außergewöhnliche Belastungen**: zwangsläufige, ungewöhnlich hohe Ausgaben, z. B. Krankheitskosten.\n• Auf das **zu versteuernde Einkommen** wird der **Tarif** angewendet." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Arbeitslohn-Einkünfte 40.000 € + Vermietung 6.000 € = **Summe/Gesamtbetrag 46.000 €**\n− Sonderausgaben 8.000 € = **Einkommen 38.000 €** = **zvE 38.000 €** (keine Kinder)." },
    ],
    fragen: [
      { art: "zahl", frage: "Einkünfte aus Gewerbebetrieb 50.000 €, aus Kapitalvermögen 0 €, Sonderausgaben 7.500 €, keine weiteren Abzüge. zvE (in €)?", cent: 4250000, erkl: "Gesamtbetrag 50.000 € − 7.500 € = Einkommen = zvE 42.500 €." },
      { art: "wahl", frage: "Was wird vom Gesamtbetrag der Einkünfte abgezogen, um zum Einkommen zu kommen?", optionen: ["Sonderausgaben und außergewöhnliche Belastungen", "Werbungskosten", "Kinderfreibeträge", "Die Lohnsteuer"], richtig: 0, erkl: "§ 2 Abs. 4 EStG." },
      { art: "wahl", frage: "Worauf wird der Einkommensteuertarif angewendet?", optionen: ["Auf das zu versteuernde Einkommen", "Auf die Summe der Einkünfte", "Auf den Bruttolohn", "Auf die Einnahmen"], richtig: 0, erkl: "§ 2 Abs. 5, § 32a EStG." },
      { art: "wahl", frage: "Sind Beiträge zur Krankenversicherung Werbungskosten?", optionen: ["Nein – Sonderausgaben (Vorsorgeaufwendungen)", "Ja", "Ja, aber nur bei Arbeitnehmern", "Nein – gar nicht abziehbar"], richtig: 0, erkl: "Vorsorgeaufwendungen sind Sonderausgaben." },
    ],
  },
  {
    id: "e-veranlagung", titel: "Einzeln oder zusammen?", kurz: "§§ 25, 26, 26a, 26b EStG", icon: "💍", normen: ["EStG 26 1", "EStG 26b", "EStG 26a 1", "EStG 32a 5"],
    karten: [
      { art: "merksatz", titel: "Wahlrecht für Ehegatten", text: "Ehegatten (und eingetragene Lebenspartner) können **zwischen Einzel- und Zusammenveranlagung wählen** (§ 26 Abs. 1 EStG), wenn **alle drei** Voraussetzungen erfüllt sind:\n1. Beide sind **unbeschränkt steuerpflichtig**.\n2. Sie leben **nicht dauernd getrennt**.\n3. Beides lag **zu Beginn oder im Laufe des Jahres** vor (ein Tag genügt)." },
      { art: "erklaerung", titel: "Zusammenveranlagung und Splitting", text: "Bei der **Zusammenveranlagung** (§ 26b EStG) werden die Einkünfte beider zusammengerechnet. Darauf gilt das **Splittingverfahren** (§ 32a Abs. 5 EStG): Das gemeinsame zvE wird **halbiert**, die Steuer dafür berechnet und **verdoppelt**. Das lohnt sich, wenn die Einkommen sehr unterschiedlich sind.\nWählen die Ehegatten nichts, wird **zusammen veranlagt** (§ 26 Abs. 3 EStG)." },
      { art: "beispiel", titel: "Typische Fälle", text: "• Heirat am 30.12. → Voraussetzungen im Laufe des Jahres erfüllt → **Wahlrecht** für das ganze Jahr.\n• Seit März dauernd getrennt → im Jahr der Trennung noch Wahlrecht (lag zu Beginn vor), im Folgejahr nicht mehr.\n• Ehemann lebt dauerhaft in den USA, Frau in Deutschland → nicht beide unbeschränkt steuerpflichtig → **kein** Wahlrecht." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Paar heiratet am 28.12. Dürfen die beiden für dieses Jahr die Zusammenveranlagung wählen?", optionen: ["Ja – die Voraussetzungen lagen im Laufe des Jahres vor", "Nein – sie waren nicht das ganze Jahr verheiratet", "Nur für den Dezember", "Erst ab dem Folgejahr"], richtig: 0, erkl: "§ 26 Abs. 1 EStG: zu Beginn oder im Laufe des Jahres genügt." },
      { art: "wahl", frage: "Ehegatten wählen nichts. Wie werden sie veranlagt?", optionen: ["Zusammen", "Einzeln", "Gar nicht", "Nach Wahl des Finanzamts"], richtig: 0, erkl: "§ 26 Abs. 3 EStG." },
      { art: "wahl", frage: "Wie funktioniert das Splittingverfahren?", optionen: ["zvE halbieren, Steuer berechnen, verdoppeln", "Jeder zahlt die Hälfte der Steuer", "Die Steuer wird halbiert", "Das zvE wird verdoppelt"], richtig: 0, erkl: "§ 32a Abs. 5 EStG." },
      { art: "wahl", frage: "Welche Voraussetzung gehört nicht zu § 26 Abs. 1 EStG?", optionen: ["Gemeinsame Kinder", "Beide unbeschränkt steuerpflichtig", "Nicht dauernd getrennt", "Voraussetzungen zu Beginn oder im Laufe des Jahres"], richtig: 0, erkl: "Kinder spielen für das Wahlrecht keine Rolle." },
    ],
  },
  {
    id: "e-tarif", titel: "Tarif & Abschlusszahlung", kurz: "§§ 32a, 2 Abs. 6, 36 EStG", icon: "📊", normen: ["EStG 32a 1", "EStG 36 2", "EStG 36 4"],
    karten: [
      { art: "merksatz", titel: "Der Tarif steigt mit dem Einkommen", text: "• Bis zum **Grundfreibetrag** (2026: **12.348 €**) fällt **keine** Einkommensteuer an.\n• Darüber steigt der Steuersatz stufenlos an (**Progression**) – je mehr man verdient, desto höher der Prozentsatz auf den nächsten Euro.\n• Spitzensteuersatz **42 %**, für sehr hohe Einkommen **45 %**." },
      { art: "erklaerung", titel: "Von der Steuer zur Zahlung", text: "Tarifliche Einkommensteuer = **festzusetzende Einkommensteuer** (wenn es keine Ermäßigungen gibt, § 2 Abs. 6 EStG)\n− angerechnete **Lohnsteuer** (§ 36 Abs. 2 Nr. 2 EStG)\n− geleistete **Vorauszahlungen** (§ 36 Abs. 2 Nr. 1 EStG)\n= **Abschlusszahlung** (positiv) oder **Erstattung** (negativ)." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Festzusetzende ESt 9.800 €, einbehaltene Lohnsteuer 8.900 €, keine Vorauszahlungen → **Abschlusszahlung 900 €**." },
    ],
    fragen: [
      { art: "zahl", frage: "Festzusetzende ESt 14.200 €, Lohnsteuer 11.000 €, Vorauszahlungen 2.000 €. Abschlusszahlung (in €)?", cent: 120000, erkl: "14.200 − 11.000 − 2.000 = 1.200 €." },
      { art: "wahl", frage: "Wie hoch ist der Grundfreibetrag 2026?", optionen: ["12.348 €", "10.908 €", "11.604 €", "24.696 €"], richtig: 0, erkl: "2026: 12.348 € (bei Zusammenveranlagung durch das Splitting faktisch doppelt)." },
      { art: "wahl", frage: "Festzusetzende ESt 6.000 €, Lohnsteuer 7.500 €. Ergebnis?", optionen: ["Erstattung von 1.500 €", "Abschlusszahlung von 1.500 €", "Abschlusszahlung von 6.000 €", "Erstattung von 7.500 €"], richtig: 0, erkl: "Es wurde mehr Lohnsteuer einbehalten, als geschuldet wird." },
      { art: "wahl", frage: "Was bedeutet Progression?", optionen: ["Der Steuersatz steigt mit dem Einkommen", "Alle zahlen den gleichen Prozentsatz", "Die Steuer sinkt mit dem Einkommen", "Jeder zahlt einen festen Betrag"], richtig: 0, erkl: "Je höher das zvE, desto höher der Grenzsteuersatz." },
    ],
  },
  {
    id: "e-einnahmen", titel: "Einnahmen & steuerfreie Einnahmen", kurz: "§§ 8, 3, 3c EStG", icon: "💶", normen: ["EStG 8 1", "EStG 3", "EStG 3c 1"],
    karten: [
      { art: "merksatz", titel: "Was sind Einnahmen?", text: "Einnahmen sind alle Güter **in Geld oder Geldeswert**, die einem im Rahmen einer Überschusseinkunftsart **zufließen** (§ 8 Abs. 1 EStG) – also auch Sachbezüge wie ein Firmenwagen oder Gutscheine." },
      { art: "erklaerung", titel: "Steuerfreie Einnahmen (§ 3 EStG)", text: "Manche Einnahmen sind ausdrücklich **steuerfrei**, z. B.:\n• **Übungsleiterpauschale** (§ 3 Nr. 26): nebenberufliche Tätigkeit als Trainer, Ausbilder, Pfleger für gemeinnützige oder öffentliche Träger – bis **3.300 €** im Jahr (seit 2026)\n• **Ehrenamtspauschale** (§ 3 Nr. 26a): bis **960 €**\n• **Arbeitgeberanteil zur Sozialversicherung** (§ 3 Nr. 62)" },
      { art: "erklaerung", titel: "Ausgaben bei steuerfreien Einnahmen", text: "Ausgaben, die mit steuerfreien Einnahmen zusammenhängen, sind **nicht abziehbar** (§ 3c Abs. 1 EStG). Bei Übungsleitern gilt eine Besonderheit: Ausgaben sind nur abziehbar, **soweit sie die steuerfreien Einnahmen übersteigen**." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Fußballtrainerin im Verein: Einnahmen 2.800 € → bis 3.300 € **steuerfrei**, Einkünfte 0 €.\nVariante: Einnahmen 4.000 € → 4.000 − 3.300 = **700 € steuerpflichtig**." },
    ],
    fragen: [
      { art: "zahl", frage: "Ein Übungsleiter im Sportverein erhält 3.900 €. Welcher Betrag ist steuerpflichtig (in €)?", cent: 60000, erkl: "3.900 € − 3.300 € = 600 €." },
      { art: "wahl", frage: "Ist ein vom Arbeitgeber geschenkter Tankgutschein eine Einnahme?", optionen: ["Ja – Einnahme in Geldeswert", "Nein – nur Geld zählt", "Nein – Geschenke sind immer steuerfrei", "Nur ab 1.000 €"], richtig: 0, erkl: "§ 8 Abs. 1 EStG: Geld oder Geldeswert." },
      { art: "wahl", frage: "Ist der Arbeitgeberanteil zur Rentenversicherung steuerpflichtiger Arbeitslohn?", optionen: ["Nein – steuerfrei nach § 3 Nr. 62 EStG", "Ja", "Nur zur Hälfte", "Nur bei Beamten"], richtig: 0, erkl: "Gesetzlich geschuldete Arbeitgeberbeiträge sind steuerfrei." },
      { art: "wahl", frage: "Wie hoch ist der Übungsleiterfreibetrag seit 2026?", optionen: ["3.300 €", "3.000 €", "840 €", "960 €"], richtig: 0, erkl: "§ 3 Nr. 26 EStG: 3.300 € (960 € ist die Ehrenamtspauschale)." },
    ],
  },
  {
    id: "e-paragraf12", titel: "Was nicht abziehbar ist", kurz: "§ 12 EStG", icon: "🚫", normen: ["EStG 12"],
    karten: [
      { art: "merksatz", titel: "Privates bleibt privat", text: "Ausgaben für die **private Lebensführung** sind nicht abziehbar (§ 12 Nr. 1 EStG) – auch dann nicht, wenn sie dem Beruf **auch** nützen. Beispiele: normale Kleidung, Essen, Wohnung, Brille, Armbanduhr." },
      { art: "erklaerung", titel: "Weitere Abzugsverbote", text: "• **Steuern vom Einkommen** (§ 12 Nr. 3): die Einkommensteuer selbst, Solidaritätszuschlag – auch die Vorauszahlungen.\n• **Geldstrafen** aus Strafverfahren (§ 12 Nr. 4).\n• **Gemischte Aufwendungen**: Lassen sich berufliche und private Anteile **klar trennen** (z. B. nach Tagen bei einer Reise), wird **aufgeteilt** – der berufliche Teil ist abziehbar." },
      { art: "beispiel", titel: "Aufteilen nach Tagen", text: "Fachkongress 2 Tage, danach 5 Tage Urlaub am selben Ort. Flug und Hotel 1.400 €:\n• Kongressgebühr: voll abziehbar\n• Flug und Hotel: 1.400 × 2/7 = **400 €** abziehbar" },
    ],
    fragen: [
      { art: "wahl", frage: "Kann eine Bürokauffrau ihren Business-Anzug als Werbungskosten abziehen?", optionen: ["Nein – bürgerliche Kleidung ist Lebensführung (§ 12 Nr. 1)", "Ja, voll", "Ja, zur Hälfte", "Nur mit Quittung"], richtig: 0, erkl: "Normale Kleidung kann auch privat getragen werden." },
      { art: "wahl", frage: "Sind ESt-Vorauszahlungen Betriebsausgaben?", optionen: ["Nein – § 12 Nr. 3 EStG", "Ja", "Nur bei Gewerbetreibenden", "Nur bis 1.000 €"], richtig: 0, erkl: "Steuern vom Einkommen sind nicht abziehbar; sie werden auf die Steuer angerechnet." },
      { art: "zahl", frage: "Fortbildung 3 Tage, danach 3 Tage Urlaub vor Ort; Flug und Hotel 900 €. Abziehbarer Anteil (in €)?", cent: 45000, erkl: "900 € × 3/6 = 450 €." },
      { art: "wahl", frage: "Eine Geldstrafe aus einem Strafverfahren – abziehbar?", optionen: ["Nein – § 12 Nr. 4 EStG", "Ja, wenn beruflich verursacht", "Ja, zur Hälfte", "Nur bei Selbständigen"], richtig: 0, erkl: "Geldstrafen sind ausdrücklich nicht abziehbar." },
    ],
  },
  {
    id: "e-zufluss", titel: "Wann zählt eine Einnahme?", kurz: "§ 11 EStG", icon: "📅", normen: ["EStG 11"],
    karten: [
      { art: "merksatz", titel: "Zufluss und Abfluss", text: "Bei Überschusseinkünften und der Einnahmen-Überschuss-Rechnung gilt: Einnahmen zählen im Jahr, in dem sie **zufließen** (§ 11 Abs. 1 EStG), Ausgaben im Jahr, in dem sie **abfließen** (§ 11 Abs. 2 EStG). Maßgeblich ist die **Zahlung**, nicht die Rechnung." },
      { art: "erklaerung", titel: "Die 10-Tage-Regel", text: "Für **regelmäßig wiederkehrende** Zahlungen (Miete, Zinsen, Versicherungsbeiträge) gibt es eine Ausnahme: Werden sie **kurz vor oder nach dem Jahreswechsel** gezahlt **und** sind sie auch **kurz davor oder danach fällig**, gehören sie in das Jahr, zu dem sie wirtschaftlich gehören. „Kurz“ = **10 Tage** (22.12. bis 10.01.)." },
      { art: "erklaerung", titel: "Vorauszahlungen für mehr als 5 Jahre", text: "Wer Miete oder ähnliche Nutzungsentgelte für **mehr als fünf Jahre im Voraus** zahlt, muss die Ausgabe **gleichmäßig verteilen** (§ 11 Abs. 2 S. 3 EStG)." },
      { art: "beispiel", titel: "Beispiele", text: "• Januarmiete, fällig am 03.01., gezahlt am 29.12. → gehört ins **neue Jahr**.\n• Dezembermiete, gezahlt am 15.01. → gehört nach der 10-Tage-Regel **nicht** ins alte Jahr (15.01. liegt außerhalb) → **neues Jahr**.\n• Honorar für Dezember, überwiesen am 20.01. → Zufluss im **neuen Jahr** (kein regelmäßig wiederkehrender Betrag)." },
    ],
    fragen: [
      { art: "wahl", frage: "Die Januarmiete (fällig 05.01.) wird am 30.12. gezahlt. In welchem Jahr ist sie abziehbar?", optionen: ["Im neuen Jahr (10-Tage-Regel)", "Im alten Jahr (Zahlung)", "Zur Hälfte in jedem Jahr", "Gar nicht"], richtig: 0, erkl: "Regelmäßig wiederkehrend, Zahlung und Fälligkeit innerhalb von 10 Tagen um den Jahreswechsel." },
      { art: "wahl", frage: "Ein Arzt erhält das Honorar für eine Dezember-Behandlung am 20.01. Wann ist es Einnahme?", optionen: ["Im neuen Jahr – Zufluss", "Im alten Jahr – Leistung", "Im Jahr der Rechnung", "Nach Wahl des Arztes"], richtig: 0, erkl: "Zuflussprinzip; die 10-Tage-Regel gilt nur für regelmäßig wiederkehrende Zahlungen." },
      { art: "zahl", frage: "Am 01.10. wird Miete für 8 Jahre im Voraus gezahlt: 9.600 €. Abziehbar im ersten Jahr (in €)?", cent: 30000, erkl: "Mehr als 5 Jahre → verteilen: 9.600 ÷ 96 Monate × 3 Monate = 300 €." },
      { art: "wahl", frage: "Was ist für § 11 EStG entscheidend?", optionen: ["Die Zahlung", "Die Rechnung", "Die Leistung", "Der Vertrag"], richtig: 0, erkl: "Zu- und Abfluss = Zahlung." },
    ],
  },
  {
    id: "e-wk", titel: "Werbungskosten", kurz: "§§ 9, 9a EStG", icon: "💼", normen: ["EStG 9 1", "EStG 9a", "EStG 4 5"],
    karten: [
      { art: "merksatz", titel: "Was sind Werbungskosten?", text: "Werbungskosten sind Aufwendungen zur **Erwerbung, Sicherung und Erhaltung der Einnahmen** (§ 9 Abs. 1 S. 1 EStG) – bei Arbeitnehmern alles, was **beruflich** veranlasst ist: Fachbücher, Arbeitsmittel, Fortbildung, Gewerkschaftsbeiträge, Fahrten zur Arbeit." },
      { art: "erklaerung", titel: "Der Pauschbetrag", text: "Arbeitnehmer bekommen ohne Nachweis den **Arbeitnehmer-Pauschbetrag von 1.230 €** (§ 9a S. 1 Nr. 1 a EStG). Nur wenn die tatsächlichen Werbungskosten **höher** sind, lohnt sich der Einzelnachweis – es wird **immer der höhere** Betrag angesetzt." },
      { art: "erklaerung", titel: "Arbeitsmittel und Home-Office", text: "• **Arbeitsmittel** (Laptop, Schreibtisch): bis **800 € netto** sofort voll abziehbar, sonst über die Nutzungsdauer (AfA). Computer und Software dürfen mit einer Nutzungsdauer von **1 Jahr** voll abgezogen werden.\n• **Home-Office-Pauschale**: **6 € pro Tag** zu Hause, höchstens **1.260 €** im Jahr (210 Tage)." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Fachbücher 180 €, Gewerkschaft 240 €, Home-Office 50 Tage × 6 € = 300 € → 720 € < 1.230 € → es bleibt beim **Pauschbetrag 1.230 €**." },
    ],
    fragen: [
      { art: "zahl", frage: "Tatsächliche Werbungskosten eines Arbeitnehmers: 980 €. Welcher Betrag wird abgezogen (in €)?", cent: 123000, erkl: "980 € < 1.230 € → Arbeitnehmer-Pauschbetrag 1.230 €." },
      { art: "zahl", frage: "Home-Office an 230 Tagen. Wie hoch ist die Pauschale (in €)?", cent: 126000, erkl: "230 × 6 € = 1.380 €, aber höchstens 1.260 €." },
      { art: "wahl", frage: "Ein Arbeitnehmer kauft beruflich einen Schreibtischstuhl für 450 € netto. Was gilt?", optionen: ["Sofort voll als Werbungskosten abziehbar", "Nur über 13 Jahre abschreibbar", "Gar nicht abziehbar", "Nur zur Hälfte"], richtig: 0, erkl: "Arbeitsmittel bis 800 € netto sind sofort abziehbar." },
      { art: "wahl", frage: "Was ist kein Werbungskostenbeispiel?", optionen: ["Bürgerliche Kleidung", "Fachbücher", "Gewerkschaftsbeiträge", "Fortbildungskosten"], richtig: 0, erkl: "Normale Kleidung gehört zur privaten Lebensführung (§ 12 Nr. 1 EStG)." },
    ],
  },
  {
    id: "e-entfernung", titel: "Entfernungspauschale", kurz: "§ 9 Abs. 1 S. 3 Nr. 4, Abs. 2 EStG", icon: "🚗", normen: ["EStG 9 1", "EStG 9 2"],
    karten: [
      { art: "merksatz", titel: "Die Formel (ab 2026)", text: "Für Fahrten zwischen Wohnung und **erster Tätigkeitsstätte** gibt es pro Arbeitstag **0,38 € je Entfernungskilometer** – ab dem **ersten** Kilometer:\n**Arbeitstage × volle km (einfache Strecke) × 0,38 €**.\nGezählt wird die **einfache** Entfernung, nicht Hin- und Rückweg." },
      { art: "erklaerung", titel: "Wichtige Regeln", text: "• Es zählt die **kürzeste Straßenverbindung**; nur **volle** Kilometer.\n• Die Pauschale gilt **unabhängig vom Verkehrsmittel** – auch zu Fuß oder mit dem Rad.\n• **Höchstbetrag 4.500 €** im Jahr – gilt **nicht**, wenn man mit dem eigenen oder überlassenen **Pkw** fährt.\n• Wer mit Bus und Bahn fährt, darf statt der Pauschale die **tatsächlichen Ticketkosten** ansetzen, wenn sie höher sind (§ 9 Abs. 2 S. 2 EStG)." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "220 Arbeitstage, 23,7 km mit dem Auto → 23 volle km:\n220 × 23 × 0,38 € = **1.922,80 €**." },
    ],
    fragen: [
      { art: "zahl", frage: "210 Arbeitstage, einfache Entfernung 15 km mit dem Pkw. Entfernungspauschale (in €)?", cent: 119700, erkl: "210 × 15 × 0,38 € = 1.197 €." },
      { art: "zahl", frage: "200 Tage, 18,9 km einfache Strecke. Entfernungspauschale (in €)?", cent: 136800, erkl: "Nur volle km: 18 → 200 × 18 × 0,38 € = 1.368 €." },
      { art: "wahl", frage: "Gilt der Höchstbetrag von 4.500 € bei Fahrten mit dem eigenen Pkw?", optionen: ["Nein", "Ja", "Nur bei mehr als 50 km", "Nur bei Beamten"], richtig: 0, erkl: "Die Begrenzung gilt nicht für den eigenen oder überlassenen Pkw." },
      { art: "wahl", frage: "Eine Pendlerin fährt Bahn; ihr Jahresticket kostet mehr als die Pauschale. Was darf sie ansetzen?", optionen: ["Die höheren Ticketkosten", "Nur die Pauschale", "Gar nichts", "Pauschale plus Ticket"], richtig: 0, erkl: "§ 9 Abs. 2 S. 2 EStG: tatsächliche Kosten öffentlicher Verkehrsmittel, soweit höher." },
    ],
  },
];
