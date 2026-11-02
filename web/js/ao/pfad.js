// Lernpfad Abgabenordnung: Blöcke, jeder in sich geschlossen – die Lernkarten eines Blocks erklären alles,
// was seine Fragen abfragen; kein Block setzt einen anderen voraus. Die Reihenfolge folgt dem Besteuerungsverfahren.
// Format wie js/ust/pfad.js. Rechtsstand 2026.

export const PFAD_AO = [
  {
    id: "ao-mantel", titel: "Die AO als Mantelgesetz", kurz: "§§ 1, 3 AO", icon: "📘", normen: ["AO 1 1", "AO 3 1", "AO 3 4"],
    karten: [
      { art: "merksatz", titel: "Was die AO regelt", text: "Die Einzelsteuergesetze (EStG, UStG …) bestimmen, **was** geschuldet wird. Die AO regelt für alle Steuern, **wie** es läuft: Ermittlung → Festsetzung → Erhebung, bei Bedarf Korrektur und Vollstreckung (§ 1 Abs. 1 AO)." },
      { art: "erklaerung", titel: "Die fünf Merkmale einer Steuer", text: "Nach § 3 Abs. 1 AO ist eine Steuer:\n• eine **Geldleistung**,\n• **keine Gegenleistung** für eine besondere Leistung,\n• von einem **öffentlich-rechtlichen Gemeinwesen** auferlegt,\n• **allen**, die den Tatbestand erfüllen,\n• zur **Erzielung von Einnahmen** (darf Nebenzweck sein)." },
      { art: "beispiel", titel: "Gebühr, Beitrag, Nebenleistung", text: "• **Gebühr:** Gegenleistung, z. B. 37 € für den Personalausweis.\n• **Beitrag:** für eine Einrichtung, egal ob genutzt, z. B. Kurbeitrag.\n• **Steuerliche Nebenleistung** (§ 3 Abs. 4 AO): z. B. Verspätungszuschlag, Säumniszuschlag, Zwangsgeld, Zinsen – keine Steuern." },
      { art: "klausur", titel: "Merkhilfe", text: "Realsteuern sind nur **Grund- und Gewerbesteuer** (§ 3 Abs. 2 AO). Die Umsatzsteuer ist eine **Verkehrsteuer** und indirekt – Schuldner ist der Unternehmer, Träger der Verbraucher." },
    ],
    fragen: [
      { art: "wahl", frage: "Für einen neuen Reisepass zahlt Jan 70 €. Was ist das?", optionen: ["Eine Gebühr", "Eine Steuer", "Ein Beitrag", "Eine steuerliche Nebenleistung"], richtig: 0, erkl: "Gegenleistung für eine besondere Leistung der Verwaltung → Gebühr." },
      { art: "wahl", frage: "Welche Abgabe ist eine steuerliche Nebenleistung?", optionen: ["Säumniszuschlag", "Grundsteuer", "Hundesteuer", "Kurbeitrag"], richtig: 0, erkl: "§ 3 Abs. 4 Nr. 5 AO." },
      { art: "wahl", frage: "Welche Steuern sind Realsteuern?", optionen: ["Grundsteuer und Gewerbesteuer", "Einkommensteuer und Körperschaftsteuer", "Umsatzsteuer und Grunderwerbsteuer", "Alle Gemeindesteuern"], richtig: 0, erkl: "§ 3 Abs. 2 AO nennt nur diese beiden." },
      { art: "wahl", frage: "Was regelt die AO?", optionen: ["Wie Steuern ermittelt, festgesetzt und erhoben werden", "Wie hoch der Einkommensteuertarif ist", "Welche Umsätze steuerfrei sind", "Nur das Strafrecht"], richtig: 0, erkl: "Die AO ist das Verfahrens-Mantelgesetz; die Höhe regeln die Einzelsteuergesetze." },
    ],
  },
  {
    id: "ao-geheimnis", titel: "Das Steuergeheimnis", kurz: "§§ 30, 7 AO", icon: "🤫", normen: ["AO 30 1", "AO 30 2", "AO 30 4", "AO 7"],
    karten: [
      { art: "merksatz", titel: "Kern", text: "**Amtsträger haben das Steuergeheimnis zu wahren** (§ 30 Abs. 1 AO). Wer dienstlich etwas über andere erfährt, darf es nicht offenbaren, verwerten oder grundlos abrufen." },
      { art: "erklaerung", titel: "Prüfschema", text: "• **Amtsträger** (§ 7 AO: Beamte, Richter, angestellte Verwaltungskräfte) oder **gleichgestellt** (§ 30 Abs. 3 AO: förmlich Verpflichtete, Sachverständige)\n• **geschützte Daten** – auch Privates, auch über Dritte\n• **dienstlich** bekannt geworden – Privates zählt nicht\n• **offenbart, verwertet oder abgerufen**\n• **ohne Befugnis** nach § 30 Abs. 4 oder 5 AO" },
      { art: "erklaerung", titel: "Wann es erlaubt ist", text: "§ 30 Abs. 4 AO u. a.:\n• für ein **Steuerverfahren** (Nr. 1), z. B. Kontrollmitteilung an ein anderes Finanzamt,\n• wenn ein **Gesetz es ausdrücklich zulässt** (Nr. 2),\n• mit **vorheriger Zustimmung** des Betroffenen (Nr. 3),\n• bei **zwingendem öffentlichem Interesse** (Nr. 5).\nVorsätzlich **falsche Anzeigen** dürfen der Staatsanwaltschaft offenbart werden (§ 30 Abs. 5 AO)." },
      { art: "beispiel", titel: "Mittagspause", text: "Prüfer P erzählt Kollegin K vom Umsatz eines geprüften Betriebs, K erzählt es abends weiter. **P** verletzt das Steuergeheimnis (dienstlich erfahren). **K** nicht – sie hat es privat in der Pause gehört." },
    ],
    fragen: [
      { art: "wahl", frage: "Eine Steuerberaterin plaudert über ihren Mandanten. Verletzt sie § 30 AO?", optionen: ["Nein – sie ist keine Amtsträgerin", "Ja – jeder Steuerkundige ist gebunden", "Ja – wegen § 7 Nr. 3 AO", "Nur wenn sie Beamtin ist und es dienstlich erfuhr"], richtig: 0, erkl: "§ 30 AO bindet nur Amtsträger und Gleichgestellte. Sie verletzt aber ihre berufliche Schweigepflicht." },
      { art: "wahl", frage: "Ein Finanzbeamter ruft aus Neugier die Daten seines Nachbarn ab, erzählt aber niemandem davon. Ergebnis?", optionen: ["Verletzung – schon das Abrufen genügt", "Keine Verletzung, weil niemand etwas erfahren hat", "Keine Verletzung, weil er Beamter ist", "Nur eine Ordnungswidrigkeit ohne Bezug zu § 30 AO"], richtig: 0, erkl: "Tathandlung kann auch das Abrufen gespeicherter Daten sein (§ 30 Abs. 2 Nr. 3 AO)." },
      { art: "wahl", frage: "Wann rechtfertigt eine Zustimmung die Offenbarung?", optionen: ["Wenn sie vorher erteilt wurde", "Auch wenn sie nachträglich erteilt wird", "Nie", "Nur bei Steuerberatern"], richtig: 0, erkl: "§ 30 Abs. 4 Nr. 3 AO – die Zustimmung muss vor der Offenbarung vorliegen." },
      { art: "wahl", frage: "Wer ist kein Amtsträger nach § 7 AO?", optionen: ["Ein Bundestagsabgeordneter", "Eine Finanzanwärterin", "Ein angestellter Sachbearbeiter im Finanzamt", "Eine Richterin am Finanzgericht"], richtig: 0, erkl: "Abgeordnete sind Volksvertreter, nicht Amtsträger." },
    ],
  },
  {
    id: "ao-personen", titel: "Wer handelt im Verfahren?", kurz: "§§ 33, 78–80, 34 AO", icon: "👥", normen: ["AO 33 1", "AO 78", "AO 79 1", "AO 80 1", "AO 34 1", "AO 45 1"],
    karten: [
      { art: "erklaerung", titel: "Steuerpflichtig – beteiligt", text: "• **Steuerpflichtiger** (§ 33 Abs. 1 AO): wer eine Steuer schuldet, haftet, für andere einbehält (Arbeitgeber), Erklärungen abgibt oder Bücher führt.\n• **Beteiligter** (§ 78 AO): vor allem, an wen ein Verwaltungsakt gerichtet ist.\n• Wer nur in fremder Sache Auskunft gibt, ist **nicht** steuerpflichtig (§ 33 Abs. 2 AO)." },
      { art: "erklaerung", titel: "Handlungsfähigkeit", text: "§ 79 Abs. 1 AO:\n• **Volljährige** handeln selbst (Nr. 1).\n• **Minderjährige** nur, soweit anerkannt (Nr. 2): mit familiengerichtlich genehmigtem Geschäft für die **betrieblichen Steuern** (USt, GewSt) – **nicht** für die ESt.\n• **GmbH, AG** handeln durch ihre Vertreter (Nr. 3).\nSonst handeln die **gesetzlichen Vertreter** (§ 34 AO)." },
      { art: "erklaerung", titel: "Bevollmächtigte und Beistände", text: "• Der Bevollmächtigte (§ 80 AO) darf alle Verfahrenshandlungen vornehmen – aber **kein Geld empfangen**, wenn es nicht ausdrücklich erlaubt ist.\n• Stirbt der Vollmachtgeber, gilt die Vollmacht weiter (§ 80 Abs. 4 AO).\n• Ein **Beistand** unterstützt nur, er vertritt nicht (§ 80 Abs. 6 AO)." },
      { art: "merksatz", titel: "Erben", text: "Der Erbe tritt in die **Fußstapfen** des Erblassers: Steuerschulden und -forderungen gehen auf ihn über (§ 45 Abs. 1 AO) – **Zwangsgelder nicht**." },
    ],
    fragen: [
      { art: "wahl", frage: "Die 17-jährige Tara hat ein genehmigtes Gewerbe. Für welche Steuer darf sie selbst handeln?", optionen: ["Umsatzsteuer ihres Gewerbes", "Einkommensteuer", "Beide", "Keine"], richtig: 0, erkl: "§ 79 Abs. 1 Nr. 2 AO i. V. m. § 112 BGB – nur für betriebsbezogene Steuern." },
      { art: "wahl", frage: "Ist der Arbeitgeber Steuerpflichtiger im Sinne des § 33 AO?", optionen: ["Ja – er behält die Lohnsteuer ein und führt sie ab", "Nein – er schuldet keine eigene Steuer", "Nur bei Minijobs", "Nur wenn er eine GmbH ist"], richtig: 0, erkl: "§ 33 Abs. 1 AO nennt ausdrücklich, wer für Rechnung eines Dritten einbehält und abführt." },
      { art: "wahl", frage: "Der Erblasser schuldete ein Zwangsgeld von 300 €. Muss die Erbin zahlen?", optionen: ["Nein", "Ja, in voller Höhe", "Nur zur Hälfte", "Nur wenn sie es angefochten hat"], richtig: 0, erkl: "§ 45 Abs. 1 S. 2 AO – Zwangsgelder gehen bei der Erbfolge nicht über." },
      { art: "wahl", frage: "Darf das Finanzamt eine Erstattung ohne weiteres an den bevollmächtigten Steuerberater überweisen?", optionen: ["Nein – nur mit ausdrücklicher Geldempfangsvollmacht", "Ja, jede Vollmacht umfasst das", "Ja, wenn der Mandant verstorben ist", "Nur bei Beträgen unter 1.000 €"], richtig: 0, erkl: "§ 80 Abs. 1 S. 2 AO." },
    ],
  },
  {
    id: "ao-ermitteln", titel: "Ermitteln und mitwirken", kurz: "§§ 88, 90, 93, 101 AO", icon: "🔎", normen: ["AO 88 1", "AO 90 1", "AO 93 1", "AO 101 1", "AO 102 1"],
    karten: [
      { art: "merksatz", titel: "Zwei Seiten", text: "Das Finanzamt ermittelt **von Amts wegen** – auch Günstiges (§ 88 Abs. 1 AO). Der Beteiligte muss **mitwirken**: Tatsachen offenlegen, Beweismittel nennen (§ 90 Abs. 1 AO)." },
      { art: "erklaerung", titel: "Folgen fehlender Mitwirkung", text: "• **Zwangsmittel** (§ 328 AO), z. B. Zwangsgeld,\n• **Schätzung** (§ 162 AO),\n• nicht belegte Werbungskosten werden **gestrichen** (freie Beweiswürdigung)." },
      { art: "erklaerung", titel: "Auskunft von Dritten", text: "Erst den **Beteiligten** fragen, Dritte erst, wenn das nicht zum Ziel führt (§ 93 Abs. 1 S. 3 AO). Dritte dürfen verweigern:\n• **Angehörige** (§ 101 AO) – mit Belehrung, nicht für eigene Verhältnisse,\n• **Berufsgeheimnisträger** (§ 102 AO) – Ärzte, Steuerberater, Anwälte,\n• bei **Gefahr der Verfolgung** (§ 103 AO).\nDer Beteiligte selbst hat **kein** Verweigerungsrecht." },
      { art: "beispiel", titel: "Zusammenveranlagte Ehefrau", text: "Wird die Ehefrau zu den **gemeinsamen** Vermietungseinkünften befragt, darf sie nicht schweigen – es sind ihre eigenen steuerlichen Verhältnisse (§ 101 Abs. 1 S. 1 AO)." },
    ],
    fragen: [
      { art: "wahl", frage: "Darf das Finanzamt sofort den Bruder des Steuerpflichtigen befragen?", optionen: ["Nein – zuerst den Steuerpflichtigen", "Ja – Angehörige sind immer zuerst zu fragen", "Ja, wenn es schneller geht", "Nur schriftlich"], richtig: 0, erkl: "§ 93 Abs. 1 S. 3 AO – Dritte nachrangig." },
      { art: "wahl", frage: "Muss eine Hausärztin über die Behandlung eines Steuerpflichtigen Auskunft geben?", optionen: ["Nein – § 102 AO", "Ja – Ärzte haben kein Verweigerungsrecht", "Nur nach Belehrung", "Nur wenn der Patient zustimmt"], richtig: 0, erkl: "§ 102 Abs. 1 Nr. 3 c AO; eine Belehrungspflicht besteht dort nicht." },
      { art: "wahl", frage: "Ein Angehöriger wurde nicht belehrt und hat ausgesagt. Folge?", optionen: ["Die Aussage ist nicht verwertbar", "Die Aussage gilt uneingeschränkt", "Der Angehörige muss ein Bußgeld zahlen", "Der Bescheid ist nichtig"], richtig: 0, erkl: "§ 101 Abs. 1 S. 2 AO verlangt die Belehrung." },
      { art: "wahl", frage: "Der Steuerpflichtige belegt Werbungskosten trotz Aufforderung nicht. Was darf das Finanzamt?", optionen: ["Sie streichen", "Sie trotzdem voll anerkennen müssen", "Ihn verhaften", "Nichts – es muss selbst ermitteln"], richtig: 0, erkl: "Verletzung der Mitwirkungspflicht → nachteilige Beweiswürdigung." },
    ],
  },
  {
    id: "ao-erklaerung-zuschlag", titel: "Erklärung und Verspätungszuschlag", kurz: "§§ 149, 152 AO", icon: "📝", normen: ["AO 149 2", "AO 149 3", "AO 152 1", "AO 152 2", "AO 152 5"],
    karten: [
      { art: "merksatz", titel: "Abgabefristen", text: "• **Ohne Berater:** bis **31.07.** des Folgejahres (§ 149 Abs. 2 AO).\n• **Mit Steuerberater:** bis **Ende Februar des zweiten Folgejahres** (§ 149 Abs. 3 AO) – für 2025 also 28.02.2027, ein Sonntag → Montag, 01.03.2027." },
      { art: "erklaerung", titel: "Kann oder muss?", text: "• **Kann** (§ 152 Abs. 1 AO): bei jeder verspäteten Abgabe – nicht, wenn die Verspätung entschuldbar ist.\n• **Muss** (§ 152 Abs. 2 AO): Jahreserklärung später als **14 Monate** nach Jahresende.\n• Kein Muss u. a. bei rückwirkender Fristverlängerung, Steuer 0 € oder **Erstattung** (§ 152 Abs. 3 AO)." },
      { art: "erklaerung", titel: "Die Formel", text: "Je **angefangenen** Monat **0,25 %** der Abschlusszahlung (Steuer − Vorauszahlungen − Lohnsteuer), **mindestens 25 €** je Monat; auf volle Euro abrunden, höchstens **25.000 €** (§ 152 Abs. 5, 10 AO)." },
      { art: "beispiel", titel: "Durchgerechnet", text: "Frist 31.07.2026, Abgabe 22.11.2026 → **4** angefangene Monate. Abschlusszahlung 11.000 € × 0,25 % = 27,50 € je Monat → 4 × 27,50 € = **110 €**." },
    ],
    fragen: [
      { art: "zahl", frage: "Abschlusszahlung 20.000 €, 3 angefangene Monate Verspätung. Verspätungszuschlag in €?", cent: 15000, erkl: "20.000 € × 0,25 % = 50 € je Monat × 3 = 150 €." },
      { art: "zahl", frage: "Erstattung statt Nachzahlung, 4 angefangene Monate Verspätung, das Finanzamt setzt einen Zuschlag fest. Wie hoch (in €)?", cent: 10000, erkl: "Mindestbetrag 25 € je Monat × 4 = 100 €." },
      { art: "wahl", frage: "Bis wann muss die nicht beratene Anna ihre ESt-Erklärung 2025 abgeben?", optionen: ["31.07.2026", "31.05.2026", "01.03.2027", "31.12.2026"], richtig: 0, erkl: "§ 149 Abs. 2 S. 1 AO – sieben Monate nach Ablauf des Kalenderjahres." },
      { art: "wahl", frage: "Erklärung für das Jahr 01 kommt im Mai 03, Nachzahlung 5.000 €. Verspätungszuschlag?", optionen: ["Zwingend", "Im Ermessen", "Ausgeschlossen", "Nur auf Antrag"], richtig: 0, erkl: "Mehr als 14 Monate nach Ablauf des Jahres 01 → § 152 Abs. 2 Nr. 1 AO." },
    ],
  },
  {
    id: "ao-zwangsgeld-schaetzung", titel: "Zwangsgeld und Schätzung", kurz: "§§ 328–335, 162 AO", icon: "⚖️", normen: ["AO 328 1", "AO 329", "AO 332 1", "AO 335", "AO 162 1"],
    karten: [
      { art: "erklaerung", titel: "Der Weg zum Zwangsgeld", text: "1. Verwaltungsakt verlangt ein **Tun, Dulden oder Unterlassen** (z. B. Erklärung abgeben).\n2. **Schriftliche Androhung** mit Frist, bestimmter Höhe, je Pflicht getrennt (§ 332 AO).\n3. Frist verstrichen → **Festsetzung** (§ 333 AO).\n4. Pflicht erfüllt → **Vollzug einstellen** (§ 335 AO)." },
      { art: "merksatz", titel: "Grenzen", text: "Höchstens **25.000 €** je Zwangsgeld (§ 329 AO). **Nicht erzwingbar** sind Zahlungen – dafür gibt es die Vollstreckung." },
      { art: "erklaerung", titel: "Schätzung", text: "Kann das Finanzamt die Besteuerungsgrundlagen nicht ermitteln, **muss** es schätzen (§ 162 Abs. 1 AO). Geschätzt werden **Besteuerungsgrundlagen**, nicht die Steuer. **Unsicherheitszuschlag** ja, **Strafschätzung** nein. Die Erklärungspflicht bleibt." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Zwangsgeld über 30.000 € wird angedroht. Zulässig?", optionen: ["Nein – höchstens 25.000 €", "Ja", "Nur bei Unternehmern", "Nur mit Zustimmung des Amtsgerichts"], richtig: 0, erkl: "§ 329 AO." },
      { art: "wahl", frage: "Kann das Finanzamt die Zahlung der Steuer mit Zwangsgeld erzwingen?", optionen: ["Nein – Geldleistungen werden vollstreckt", "Ja", "Nur bei Säumnis über drei Monate", "Nur bei der Umsatzsteuer"], richtig: 0, erkl: "§ 328 Abs. 1 AO erfasst Handlungen, Duldungen und Unterlassungen." },
      { art: "wahl", frage: "Muss das Finanzamt schätzen, wenn trotz Zwangsgeld keine Erklärung kommt?", optionen: ["Ja – es hat zu schätzen", "Nein – es entscheidet nach Ermessen", "Nur mit Zustimmung", "Nein – es muss auf die Erklärung warten"], richtig: 0, erkl: "§ 162 Abs. 1 S. 1 AO: „hat sie zu schätzen“." },
      { art: "wahl", frage: "Nach Festsetzung des Zwangsgelds gibt S die Erklärung ab. Was gilt?", optionen: ["Der Vollzug ist einzustellen", "Das Zwangsgeld ist trotzdem beizutreiben", "Das Zwangsgeld verdoppelt sich", "S muss Ersatzzwangshaft antreten"], richtig: 0, erkl: "§ 335 AO." },
    ],
  },
  {
    id: "ao-verwaltungsakt", titel: "Der Verwaltungsakt", kurz: "§§ 118–121, 157 AO", icon: "📄", normen: ["AO 118", "AO 119 1", "AO 120 2", "AO 121 1", "AO 157 1"],
    karten: [
      { art: "merksatz", titel: "Definition", text: "**Hoheitliche Maßnahme einer Behörde** auf dem Gebiet des öffentlichen Rechts **zur Regelung eines Einzelfalls** mit **Außenwirkung** (§ 118 S. 1 AO)." },
      { art: "beispiel", titel: "Kein Verwaltungsakt", text: "• Telefonische Auskunft zur Rechtslage → **keine Regelung**\n• Einkommensteuer-Richtlinien → **kein Einzelfall**\n• Weisung der Sachgebietsleiterin → **keine Außenwirkung**" },
      { art: "erklaerung", titel: "Steuerbescheid", text: "**Muss:** schriftlich oder elektronisch, Steuer nach **Art und Betrag**, **Steuerschuldner**, erlassende **Behörde** – sonst nichtig.\n**Soll:** Rechtsbehelfsbelehrung, Begründung (§ 121 AO) – Fehler machen nur rechtswidrig." },
      { art: "erklaerung", titel: "Nebenbestimmungen", text: "Steuerbescheide nur mit gesetzlich erlaubten: **Vorbehalt der Nachprüfung** (§ 164 AO), **Vorläufigkeit** (§ 165 AO). Bei Ermessensentscheidungen auch **Befristung, Bedingung, Widerrufsvorbehalt, Auflage** (§ 120 Abs. 2 AO)." },
    ],
    fragen: [
      { art: "wahl", frage: "Die Sachgebietsleiterin weist an, Arbeitsmittel zu kürzen. Verwaltungsakt?", optionen: ["Nein – keine Außenwirkung", "Ja", "Ja, eine Allgemeinverfügung", "Nein – kein öffentliches Recht"], richtig: 0, erkl: "Innerdienstliche Weisung." },
      { art: "wahl", frage: "Eine Stundung gilt „bis 30.06.“. Welche Nebenbestimmung?", optionen: ["Befristung", "Bedingung", "Auflage", "Widerrufsvorbehalt"], richtig: 0, erkl: "Fester Zeitpunkt → § 120 Abs. 2 Nr. 1 AO." },
      { art: "wahl", frage: "Einem Steuerbescheid fehlt die Rechtsbehelfsbelehrung. Folge?", optionen: ["Er ist wirksam, die Einspruchsfrist verlängert sich", "Er ist nichtig", "Er ist nie bekannt gegeben", "Er gilt als vorläufig"], richtig: 0, erkl: "Sollinhalt; Einspruchsfrist dann ein Jahr (§ 356 Abs. 2 AO)." },
      { art: "wahl", frage: "Welche Nebenbestimmung ist selbständig anfechtbar?", optionen: ["Die Auflage", "Die Bedingung", "Die Befristung", "Der Vorbehalt der Nachprüfung"], richtig: 0, erkl: "Die Auflage ist eine eigene Regelung; die anderen sind unselbständig." },
    ],
  },
  {
    id: "ao-nichtig", titel: "Wirksam, rechtswidrig, nichtig", kurz: "§§ 124–127 AO", icon: "🧪", normen: ["AO 124 1", "AO 124 3", "AO 125 1", "AO 125 2", "AO 125 3", "AO 126 1", "AO 127"],
    karten: [
      { art: "merksatz", titel: "Grundregel", text: "Ein **rechtswidriger** Verwaltungsakt ist **wirksam**, bis er aufgehoben wird (§ 124 Abs. 2 AO). **Unwirksam** ist nur der **nichtige** (§ 124 Abs. 3 AO)." },
      { art: "erklaerung", titel: "Prüfreihenfolge § 125 AO", text: "1. **Abs. 2** – immer nichtig: keine erkennbare Behörde, unmöglich, verlangt eine Straftat, sittenwidrig.\n2. **Abs. 3** – allein deshalb **nicht** nichtig: örtliche Unzuständigkeit, ausgeschlossene Person hat mitgewirkt.\n3. **Abs. 1** – schwerer **und offenkundiger** Fehler (z. B. Steuerschuldner fehlt).\n4. **Abs. 4** – Teilnichtigkeit." },
      { art: "erklaerung", titel: "Reparatur", text: "• **§ 126 AO:** Begründung, Anhörung oder Antrag nachholen → Fehler geheilt.\n• **§ 127 AO:** Nur Form-, Verfahrens- oder Zuständigkeitsfehler und in der Sache keine andere Entscheidung möglich (gebundener VA) → keine Aufhebung. Bei **Ermessen** greift § 127 AO nicht." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein örtlich unzuständiges Finanzamt erlässt einen richtigen ESt-Bescheid. Ergebnis?", optionen: ["Rechtswidrig, aber wirksam – Aufhebung ausgeschlossen (§ 127 AO)", "Nichtig", "Rechtmäßig", "Kein Verwaltungsakt"], richtig: 0, erkl: "§ 125 Abs. 3 Nr. 1 und § 127 AO." },
      { art: "wahl", frage: "Ein Bescheid lässt die erlassende Behörde nicht erkennen. Ergebnis?", optionen: ["Nichtig", "Rechtswidrig, aber wirksam", "Rechtmäßig", "Heilbar nach § 126 AO"], richtig: 0, erkl: "§ 125 Abs. 2 Nr. 1 AO." },
      { art: "wahl", frage: "Die fehlende Begründung wird in der Einspruchsentscheidung nachgeholt. Folge?", optionen: ["Der Fehler ist geheilt", "Der Bescheid bleibt nichtig", "Der Bescheid ist aufzuheben", "Nichts – Begründungen sind nie nötig"], richtig: 0, erkl: "§ 126 Abs. 1 Nr. 2 AO." },
      { art: "wahl", frage: "Ein unzuständiges Finanzamt setzt einen Verspätungszuschlag fest (Ermessen). Erfolgt eine Aufhebung auf Einspruch?", optionen: ["Ja – § 127 AO greift bei Ermessen nicht", "Nein – § 127 AO", "Nein – der Bescheid ist nichtig", "Nur wenn er über 1.000 € liegt"], richtig: 0, erkl: "Ein anderes Finanzamt hätte anders entscheiden können." },
    ],
  },
  {
    id: "ao-bekanntgeben", titel: "Bekanntgabe", kurz: "§§ 122, 124 AO", icon: "📬", normen: ["AO 122 1", "AO 122 2", "AO 122 7", "AO 124 1", "AO 108 3"],
    karten: [
      { art: "merksatz", titel: "Ohne Bekanntgabe kein Verwaltungsakt", text: "Wirksam wird der Verwaltungsakt erst mit der **Bekanntgabe** – mit dem Inhalt, mit dem er bekannt gegeben wird (§ 124 Abs. 1 AO). Die Behörde muss das **Ob** und **Wie** wollen (Bekanntgabewille)." },
      { art: "erklaerung", titel: "Vier Tage", text: "Per Post im Inland gilt der Bescheid am **vierten Tag** nach Aufgabe zur Post als bekannt gegeben (§ 122 Abs. 2 Nr. 1 AO) – seit 2025, vorher drei Tage. Fällt der Tag auf **Samstag, Sonntag oder Feiertag**, gilt der **nächste Werktag** (§ 108 Abs. 3 AO)." },
      { art: "beispiel", titel: "Durchgezählt", text: "Aufgabe zur Post **Mittwoch, 22.04.2026** → vierter Tag **Sonntag, 26.04.** → bekannt gegeben **Montag, 27.04.2026**." },
      { art: "erklaerung", titel: "Formell und materiell bestandskräftig", text: "• **Formell bestandskräftig** (unanfechtbar) wird der Bescheid, wenn die Einspruchsfrist ungenutzt abläuft (§ 355 Abs. 1 AO).\n• **Materiell bestandskräftig** heißt: Änderung nur noch mit einer Korrekturvorschrift. Ein **Vorbehalt der Nachprüfung** verhindert das (§ 164 Abs. 2 AO).\n• Bei **förmlicher Zustellung** (VwZG) gilt der Zustellungstag, keine Vier-Tages-Fiktion." },
      { art: "erklaerung", titel: "Richtig adressieren", text: "• **Kind:** Inhaltsadressat das Kind, bekannt gegeben an die Eltern.\n• **Ehegatten:** eine Ausfertigung an die gemeinsame Anschrift mit beiden Namen (§ 122 Abs. 7 AO).\n• **Erbin:** „als Gesamtrechtsnachfolgerin des …“.\n• **Steuerberater mit Empfangsvollmacht:** Bescheid soll an ihn gehen (§ 122 Abs. 1 S. 4 AO)." },
    ],
    fragen: [
      { art: "wahl", frage: "Aufgabe zur Post am Donnerstag, 11.06.2026. Bekanntgabe?", optionen: ["Montag, 15.06.2026", "Sonntag, 14.06.2026", "Freitag, 12.06.2026", "Dienstag, 16.06.2026"], richtig: 0, erkl: "Vierter Tag = Montag, 15.06.2026 (§ 122 Abs. 2 Nr. 1 AO)." },
      { art: "wahl", frage: "Aufgabe zur Post am Mittwoch, 25.11.2026. Bekanntgabe?", optionen: ["Montag, 30.11.2026", "Sonntag, 29.11.2026", "Samstag, 28.11.2026", "Freitag, 27.11.2026"], richtig: 0, erkl: "Vierter Tag Sonntag, 29.11. → nächster Werktag Montag, 30.11.2026 (§ 108 Abs. 3 AO)." },
      { art: "wahl", frage: "S nimmt seinen Bescheid heimlich vom Schreibtisch der Bearbeiterin mit. Bekanntgegeben?", optionen: ["Nein – kein Bekanntgabewille", "Ja, mit Mitnahme", "Ja, nach vier Tagen", "Ja, weil er ihn in den Händen hält"], richtig: 0, erkl: "Die Behörde wollte weder das Ob noch das Wie." },
      { art: "wahl", frage: "Der Brief liegt im Briefkasten, das Kind wirft ihn weg. Bekanntgegeben?", optionen: ["Ja – der Brief war im Machtbereich", "Nein – niemand hat ihn gelesen", "Nur wenn das Kind volljährig ist", "Erst nach erneuter Zusendung"], richtig: 0, erkl: "Zugang = Machtbereich mit Möglichkeit der Kenntnisnahme; das weitere Risiko trägt der Empfänger." },
    ],
  },
  {
    id: "ao-vorbehalt-vorlaeufig", titel: "Vorbehalt, Vorläufigkeit, Anmeldung", kurz: "§§ 164, 165, 168 AO", icon: "⏳", normen: ["AO 164 1", "AO 164 2", "AO 164 4", "AO 165 1", "AO 168"],
    karten: [
      { art: "erklaerung", titel: "Vorbehalt der Nachprüfung", text: "• Solange der Fall **nicht abschließend geprüft** ist (§ 164 Abs. 1 AO), ohne Begründung.\n• Fall bleibt **ganz offen**: jederzeit änderbar (§ 164 Abs. 2 AO).\n• Entfällt mit Ablauf der **Festsetzungsfrist** (§ 164 Abs. 4 AO).\n• Kraft Gesetzes bei **Vorauszahlungen** und **Steueranmeldungen**." },
      { art: "erklaerung", titel: "Vorläufigkeit", text: "Bei **Ungewissheit** über die Entstehung der Steuer oder wegen anhängiger Verfahren beim BVerfG, EuGH oder BFH (§ 165 Abs. 1 AO). Änderbar nur, **soweit** vorläufig – **Umfang und Grund** stehen im Bescheid." },
      { art: "erklaerung", titel: "Steueranmeldung", text: "Der Steuerpflichtige rechnet selbst (USt-Voranmeldung, LSt-Anmeldung). Mit **Eingang** wirkt sie wie eine Vorbehaltsfestsetzung (§ 168 S. 1 AO). Bei **Erstattung** erst mit **Zustimmung** – formlos, z. B. durch Auszahlung (§ 168 S. 2, 3 AO)." },
    ],
    fragen: [
      { art: "wahl", frage: "USt-Voranmeldung mit Erstattung geht ein. Wann wirkt sie als Festsetzung?", optionen: ["Mit Zustimmung des Finanzamts", "Mit Eingang", "Mit Ablauf des Monats", "Nie"], richtig: 0, erkl: "§ 168 S. 2 AO." },
      { art: "wahl", frage: "Was hält den ganzen Steuerfall offen?", optionen: ["Der Vorbehalt der Nachprüfung", "Der Vorläufigkeitsvermerk", "Die Rechtsbehelfsbelehrung", "Die Begründung"], richtig: 0, erkl: "§ 164 Abs. 2 AO – die Vorläufigkeit wirkt nur punktuell." },
      { art: "wahl", frage: "Ein ESt-Vorauszahlungsbescheid enthält keinen Vorbehalt. Gilt er trotzdem?", optionen: ["Ja – kraft Gesetzes", "Nein", "Nur auf Antrag", "Nur für ein Jahr"], richtig: 0, erkl: "§ 164 Abs. 1 S. 2 AO." },
      { art: "wahl", frage: "Wann entfällt der Vorbehalt der Nachprüfung automatisch?", optionen: ["Mit Ablauf der Festsetzungsfrist", "Nach einem Monat", "Mit Zahlung der Steuer", "Nie"], richtig: 0, erkl: "§ 164 Abs. 4 AO." },
    ],
  },
  {
    id: "ao-feststellen", titel: "Gesonderte Feststellung", kurz: "§§ 179–182 AO", icon: "🧩", normen: ["AO 157 2", "AO 179 1", "AO 180 1", "AO 182 1", "AO 175 1"],
    karten: [
      { art: "merksatz", titel: "Warum feststellen?", text: "Normalerweise sind die Besteuerungsgrundlagen nur ein **unselbständiger Teil** des Steuerbescheids (§ 157 Abs. 2 AO). Werden sie **gesondert festgestellt**, entsteht ein eigener Bescheid mit Bindung (§ 179 Abs. 1 AO)." },
      { art: "erklaerung", titel: "Die zwei Hauptfälle", text: "• **Nr. 2 a – gesondert und einheitlich:** Mehrere sind an Einkünften beteiligt – OHG, KG, Grundstücksgemeinschaft.\n• **Nr. 2 b – gesondert:** Gewinneinkünfte **einer** Person, wenn Betriebs- bzw. Tätigkeitsfinanzamt **nicht** das Wohnsitzfinanzamt ist.\nÜberschusseinkünfte einer Einzelperson werden **nie** gesondert festgestellt." },
      { art: "erklaerung", titel: "Grundlagen- und Folgebescheid", text: "Der Feststellungsbescheid **bindet** den Steuerbescheid (§ 182 Abs. 1 AO); dieser wird angepasst (§ 175 Abs. 1 S. 1 Nr. 1 AO). Fehler in den festgestellten Einkünften greift man **nur** beim Feststellungsbescheid an (§ 351 Abs. 2 AO)." },
    ],
    fragen: [
      { art: "wahl", frage: "Drei Gesellschafter betreiben eine OHG. Welche Feststellung?", optionen: ["Gesondert und einheitlich (Nr. 2 a)", "Gesondert (Nr. 2 b)", "Keine", "Nur auf Antrag"], richtig: 0, erkl: "Mehrere Beteiligte → § 180 Abs. 1 S. 1 Nr. 2 a AO." },
      { art: "wahl", frage: "Otto wohnt in Bremen, sein Gewerbebetrieb liegt in Verden. Feststellung?", optionen: ["Gesondert (Nr. 2 b)", "Gesondert und einheitlich", "Keine", "Nur für die Umsatzsteuer"], richtig: 0, erkl: "Gewinneinkünfte, Betriebsfinanzamt ≠ Wohnsitzfinanzamt." },
      { art: "wahl", frage: "Otto vermietet allein ein Haus in einer anderen Stadt. Feststellung?", optionen: ["Keine – Überschusseinkünfte", "Gesondert (Nr. 2 b)", "Gesondert und einheitlich", "Nur bei mehr als drei Wohnungen"], richtig: 0, erkl: "Nr. 2 b gilt nur für Gewinneinkünfte." },
      { art: "wahl", frage: "Die Einkünfte im OHG-Feststellungsbescheid sind zu hoch. Wogegen legt der Gesellschafter Einspruch ein?", optionen: ["Gegen den Feststellungsbescheid", "Gegen seinen ESt-Bescheid", "Gegen beide gleichzeitig", "Gar nicht – das ist nicht anfechtbar"], richtig: 0, erkl: "§ 351 Abs. 2 AO." },
    ],
  },
  {
    id: "ao-zustaendig", titel: "Welches Finanzamt?", kurz: "§§ 8–12, 17–29 AO", icon: "🗺️", normen: ["AO 8", "AO 9", "AO 19 1", "AO 20 1", "AO 21 1", "AO 125 3"],
    karten: [
      { art: "erklaerung", titel: "Grundbegriffe", text: "• **Wohnsitz** (§ 8 AO): Wohnung, die beibehalten und benutzt wird.\n• **Gewöhnlicher Aufenthalt** (§ 9 AO): stets bei mehr als **sechs Monaten** zusammenhängend.\n• **Geschäftsleitung** (§ 10 AO): Mittelpunkt der Oberleitung.\n• **Sitz** (§ 11 AO): laut Satzung." },
      { art: "merksatz", titel: "Wer ist zuständig?", text: "• **ESt:** Wohnsitzfinanzamt (§ 19 AO)\n• **KSt:** Finanzamt der Geschäftsleitung (§ 20 AO)\n• **USt:** von wo aus das Unternehmen betrieben wird (§ 21 AO)\n• **Grundsteuermessbetrag:** Lagefinanzamt (§ 22 AO)" },
      { art: "erklaerung", titel: "Großstadtregelung (§ 19 Abs. 3 AO)", text: "Wohnung und Betrieb liegen in **derselben Gemeinde** mit mehreren Finanzämtern (z. B. Hamburg), aber in **verschiedenen Bezirken** → das **Betriebs- bzw. Tätigkeitsfinanzamt** ist auch für die ESt zuständig, eine gesonderte Feststellung entfällt. Zusammenveranlagte Ehegatten gelten dabei als ein Steuerpflichtiger (§ 19 Abs. 4 AO). Liegt der Betrieb in einer **anderen Gemeinde**, bleibt es beim Wohnsitzfinanzamt plus gesonderter Feststellung." },
      { art: "erklaerung", titel: "Fehler und Wechsel", text: "• Unzuständiges Finanzamt: **rechtswidrig, nicht nichtig** (§ 125 Abs. 3 Nr. 1 AO).\n• Umzug: Zuständigkeit wechselt, sobald eines der Finanzämter davon **erfährt** (§ 26 AO).\n• Mehrere zuständig: das **zuerst befasste** (§ 25 AO)." },
    ],
    fragen: [
      { art: "wahl", frage: "GmbH: Satzungssitz Hamburg, Geschäftsleitung Bremen. KSt-Finanzamt?", optionen: ["Bremen", "Hamburg", "Beide", "Wohnsitz des Geschäftsführers"], richtig: 0, erkl: "§ 20 Abs. 1 AO – Geschäftsleitung." },
      { art: "wahl", frage: "Friseurin wohnt in Lübeck, Salon in Kiel. USt-Finanzamt?", optionen: ["Kiel", "Lübeck", "Das ihrer Wahl", "Das Bundeszentralamt"], richtig: 0, erkl: "§ 21 Abs. 1 AO." },
      { art: "wahl", frage: "Saisonkraft ohne Wohnung bleibt sieben Monate am Stück in Uelzen. Folge?", optionen: ["Gewöhnlicher Aufenthalt in Uelzen", "Kein Aufenthalt im Inland", "Wohnsitz in Uelzen", "Nur bei Meldung beim Einwohneramt"], richtig: 0, erkl: "§ 9 S. 2 AO – mehr als sechs Monate." },
      { art: "wahl", frage: "Bäcker wohnt in Hamburg-Altona, Bäckerei in Hamburg-Barmbek (anderer Finanzamtsbezirk). ESt-Finanzamt?", optionen: ["Betriebsfinanzamt Barmbek, keine gesonderte Feststellung", "Wohnsitzfinanzamt Altona mit gesonderter Feststellung", "Beide Finanzämter gemeinsam", "Das Finanzamt seiner Wahl"], richtig: 0, erkl: "§ 19 Abs. 3 AO – gleiche Gemeinde, anderer Bezirk." },
      { art: "wahl", frage: "Folge eines Bescheids vom örtlich unzuständigen Finanzamt?", optionen: ["Rechtswidrig, aber nicht nichtig", "Nichtig", "Rechtmäßig", "Kein Verwaltungsakt"], richtig: 0, erkl: "§ 125 Abs. 3 Nr. 1 AO." },
    ],
  },
  {
    id: "ao-frist", titel: "Fristen berechnen", kurz: "§§ 108, 110, 355 AO", icon: "📅", normen: ["AO 108 1", "AO 108 3", "AO 355 1", "AO 110 1", "AO 110 2"],
    karten: [
      { art: "merksatz", titel: "Beginn – Dauer – Ende", text: "Bei der **Ereignisfrist** zählt der Ereignistag **nicht** mit (§ 108 Abs. 1 AO i. V. m. § 187 Abs. 1 BGB). Eine Monatsfrist endet am Tag **gleicher Zahl** (§ 188 Abs. 2 BGB); fehlt er, am **letzten Tag** des Monats (§ 188 Abs. 3 BGB)." },
      { art: "erklaerung", titel: "Wochenende und Feiertag", text: "Fällt das **Ende** auf Samstag, Sonntag oder Feiertag, endet die Frist mit dem **nächsten Werktag** (§ 108 Abs. 3 AO). Der Beginn verschiebt sich nicht." },
      { art: "beispiel", titel: "Einspruchsfrist", text: "Bekanntgabe **Montag, 31.08.2026** → Beginn 01.09., Dauer ein Monat (§ 355 Abs. 1 AO) → den 31.09. gibt es nicht → Ende **Mittwoch, 30.09.2026**." },
      { art: "erklaerung", titel: "Wiedereinsetzung", text: "Gesetzliche Frist **ohne Verschulden** versäumt (§ 110 Abs. 1 AO) → binnen **eines Monats** nach Wegfall des Hindernisses Antrag stellen und Handlung nachholen (§ 110 Abs. 2 AO), spätestens nach einem Jahr ist Schluss. Arbeitsüberlastung entschuldigt **nicht**, plötzliche schwere Krankheit schon." },
    ],
    fragen: [
      { art: "wahl", frage: "Bekanntgabe Dienstag, 13.01.2026. Ende der Einspruchsfrist?", optionen: ["Freitag, 13.02.2026", "Donnerstag, 12.02.2026", "Montag, 16.02.2026", "Samstag, 14.02.2026"], richtig: 0, erkl: "Tag gleicher Zahl im Folgemonat (§ 188 Abs. 2 BGB)." },
      { art: "wahl", frage: "Ein Bescheid wird am Samstag, 31.01.2026, mit Postzustellungsurkunde zugestellt. Wann ist er bekannt gegeben?", optionen: ["Samstag, 31.01.2026 (Tag der Zustellung)", "Mittwoch, 04.02.2026 (vierter Tag)", "Montag, 02.02.2026 (nächster Werktag)", "Erst mit dem Öffnen des Briefs"], richtig: 0, erkl: "Bei förmlicher Zustellung gilt keine Bekanntgabefiktion; Bekanntgabetag ist der Zustellungstag (§ 122 Abs. 5 AO)." },
      { art: "wahl", frage: "Bekanntgabe am Samstag, 31.01.2026. Wann endet die Einspruchsfrist?", optionen: ["Montag, 02.03.2026", "Samstag, 28.02.2026", "Dienstag, 03.03.2026", "Freitag, 27.02.2026"], richtig: 0, erkl: "Den 31.02. gibt es nicht → 28.02. (§ 188 Abs. 3 BGB); das ist ein Samstag → nächster Werktag Montag, 02.03.2026 (§ 108 Abs. 3 AO)." },
      { art: "wahl", frage: "Welche Fristversäumnis rechtfertigt Wiedereinsetzung?", optionen: ["Plötzliche schwere Krankheit", "Arbeitsüberlastung", "Irrtum über die Frist", "Vergessen durch den Steuerberater"], richtig: 0, erkl: "Ohne Verschulden; Vertreterverschulden wird zugerechnet (§ 110 Abs. 1 S. 2 AO)." },
    ],
  },
  {
    id: "ao-zahlen", titel: "Entstehung, Fälligkeit, Säumnis", kurz: "§§ 38, 220, 240 AO", icon: "💶", normen: ["AO 38", "AO 220 1", "AO 240 1", "AO 240 3"],
    karten: [
      { art: "merksatz", titel: "Entstehung", text: "Der Anspruch entsteht, **sobald der Tatbestand verwirklicht** ist (§ 38 AO) – der Bescheid stellt ihn nur fest (deklaratorisch). Die ESt entsteht mit Ablauf des Jahres, die LSt mit Zufluss des Lohns." },
      { art: "erklaerung", titel: "Fälligkeit", text: "Nach den Einzelsteuergesetzen (§ 220 Abs. 1 AO): ESt-Abschlusszahlung **einen Monat** nach Bekanntgabe des Bescheids, USt-Vorauszahlung am **10. Tag** nach Ablauf des Voranmeldungszeitraums. Ohne Regelung: mit Entstehung (§ 220 Abs. 2 AO)." },
      { art: "erklaerung", titel: "Säumniszuschlag", text: "Nicht bis zum Ablauf des Fälligkeitstags gezahlt → je **angefangenen Monat 1 %** des auf volle **50 € abgerundeten** Rückstands (§ 240 Abs. 1 AO). Er entsteht **automatisch**. Bis zu **drei Tage** Verspätung bei Überweisung bleiben ohne Zuschlag (§ 240 Abs. 3 AO)." },
      { art: "beispiel", titel: "Durchgerechnet", text: "4.560 € fällig am 10.06., gezahlt am 09.09. → drei angefangene Monate. 4.560 € → **4.550 €** × 1 % × 3 = **136,50 €**." },
    ],
    fragen: [
      { art: "zahl", frage: "Rückstand 2.380 €, zwei angefangene Monate Säumnis. Säumniszuschläge in €?", cent: 4700, erkl: "Abgerundet 2.350 € × 1 % × 2 = 47 €." },
      { art: "zahl", frage: "Rückstand 10.049 €, ein angefangener Monat Säumnis. Säumniszuschlag in €?", cent: 10000, erkl: "Abgerundet 10.000 € × 1 % = 100 €." },
      { art: "wahl", frage: "Wann entsteht die Einkommensteuer 2026?", optionen: ["Mit Ablauf des 31.12.2026", "Mit Bekanntgabe des Bescheids", "Mit Abgabe der Erklärung", "Am 01.01.2026"], richtig: 0, erkl: "§ 38 AO i. V. m. § 36 Abs. 1 EStG." },
      { art: "wahl", frage: "Muss ein Säumniszuschlag durch Bescheid festgesetzt werden?", optionen: ["Nein – er entsteht kraft Gesetzes", "Ja, immer", "Nur über 100 €", "Nur bei der Umsatzsteuer"], richtig: 0, erkl: "§ 240 Abs. 1 AO, § 218 Abs. 1 S. 1 AO." },
    ],
  },
];
