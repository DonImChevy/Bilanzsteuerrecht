// Lernpfad Umsatzsteuer: Blöcke, jeder in sich geschlossen – die Lernkarten eines Blocks erklären alles,
// was seine Fragen abfragen; kein Block setzt einen anderen voraus. Die Reihenfolge ist nur ein Vorschlag.
// Karten: {art: "merksatz" | "erklaerung" | "beispiel" | "klausur", titel, text}; **fett**, Zeilen mit „• “ = Liste.
// Fragen: {art: "wahl", frage, optionen, richtig (Index), erkl} | {art: "zahl", frage, cent, erkl}. Normen: Verweise für den Normen-Tab.

export const PFAD_UST = [
  {
    id: "system", titel: "Das System der Umsatzsteuer", kurz: "Wer zahlt, wer trägt?", icon: "🧭", normen: ["UStG 1", "UStG 15", "UStG 13a"],
    karten: [
      { art: "merksatz", titel: "Allphasen-Netto-Umsatzsteuer", text: "Die Umsatzsteuer wird auf **jeder Stufe** der Wirtschaft erhoben. Jeder Unternehmer zieht die Steuer, die ihm selbst berechnet wurde, als **Vorsteuer** ab (§ 15 UStG). So wird auf jeder Stufe nur der **Mehrwert** besteuert." },
      { art: "erklaerung", titel: "Wer zahlt – wer trägt?", text: "• **Steuerschuldner** ist der leistende Unternehmer (§ 13a Abs. 1 Nr. 1 UStG) – er meldet die Steuer beim Finanzamt an.\n• **Wirtschaftlich belastet** ist der **Endverbraucher**: Er kann keine Vorsteuer abziehen.\n• Für Unternehmer ist die Umsatzsteuer daher **kostenneutral** – ein „durchlaufender“ Betrag." },
      { art: "beispiel", titel: "Die Kette in Zahlen", text: "• Großhändler verkauft an Einzelhändler: 100 € + **19 € USt**\n• Einzelhändler verkauft an Kundin: 150 € + **28,50 € USt**\n• Einzelhändler zahlt ans Finanzamt: 28,50 € − 19 € Vorsteuer = **9,50 €** (= 19 % von 50 € Mehrwert)\n• Die Kundin trägt die gesamten **28,50 €**." },
      { art: "klausur", titel: "So startet jede Klausurlösung", text: "Geprüft wird immer in dieser Reihenfolge: **Steuerbarkeit** (§ 1 Abs. 1 Nr. 1 UStG) → **Steuerbefreiung** → **Bemessungsgrundlage und Steuersatz** → **Entstehung** und Steuerschuldner → zuletzt die **Vorsteuer**." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer ist von der Umsatzsteuer wirtschaftlich belastet?", optionen: ["Der Endverbraucher", "Der Hersteller", "Jeder Händler auf seiner Stufe", "Das Finanzamt"], richtig: 0, erkl: "Unternehmer ziehen die Vorsteuer ab; nur der Endverbraucher kann das nicht und trägt die Steuer." },
      { art: "zahl", frage: "Ein Händler kauft Ware für 1.000 € + 190 € USt und verkauft sie für 1.500 € + 285 € USt. Wie viel zahlt er ans Finanzamt (in €)?", cent: 9500, erkl: "285 € Umsatzsteuer − 190 € Vorsteuer = 95 € (19 % auf 500 € Mehrwert)." },
      { art: "wahl", frage: "Wer schuldet die Umsatzsteuer gegenüber dem Finanzamt?", optionen: ["Der leistende Unternehmer", "Der Kunde", "Der Hersteller der Ware", "Die Bank des Kunden"], richtig: 0, erkl: "§ 13a Abs. 1 Nr. 1 UStG: Steuerschuldner ist der Unternehmer, der die Leistung ausführt." },
      { art: "wahl", frage: "Was wird in der Klausur zuerst geprüft?", optionen: ["Die Steuerbarkeit", "Die Steuerbefreiung", "Der Steuersatz", "Die Vorsteuer"], richtig: 0, erkl: "Ohne steuerbaren Umsatz gibt es nichts zu befreien oder zu berechnen – die Steuerbarkeit steht am Anfang." },
    ],
  },
  {
    id: "unternehmer", titel: "Wer ist Unternehmer?", kurz: "§ 2 UStG", icon: "🏢", normen: ["UStG 2 1"],
    karten: [
      { art: "merksatz", titel: "Definition", text: "Unternehmer ist, wer eine **gewerbliche oder berufliche Tätigkeit selbständig** ausübt (§ 2 Abs. 1 S. 1 UStG)." },
      { art: "erklaerung", titel: "Die drei Prüfpunkte", text: "• **Selbständig**: auf eigene Rechnung und Verantwortung – Arbeitnehmer sind es nicht.\n• **Nachhaltig**: auf Wiederholung angelegt; schon die Absicht genügt (z. B. zweimal im Jahr ein Kurs).\n• **Einnahmeerzielung**: Leistungen gegen Entgelt. **Gewinnabsicht ist nicht nötig.**\nAuf die Rechtsform kommt es nicht an – auch ein Ehepaar, das gemeinsam vermietet, kann Unternehmer sein." },
      { art: "erklaerung", titel: "Ein Unternehmer – ein Unternehmen", text: "Das Unternehmen umfasst die **gesamte** gewerbliche und berufliche Tätigkeit (§ 2 Abs. 1 S. 2 UStG). Eine Ärztin mit Praxis, Kiosk und Ferienwohnung hat **ein** Unternehmen. Zahlungen zwischen ihren Bereichen sind nicht steuerbare **Innenumsätze**." },
      { art: "klausur", titel: "Klausursatz", text: "„X ist Unternehmerin i. S. d. § 2 Abs. 1 S. 1 und 3 UStG, da sie selbständig, nachhaltig und mit Einnahmeerzielungsabsicht tätig wird. Zum Unternehmen gehört nach § 2 Abs. 1 S. 2 UStG ihre gesamte gewerbliche und berufliche Tätigkeit.“" },
    ],
    fragen: [
      { art: "wahl", frage: "Eine Rentnerin verkauft einmalig einen selbst gestrickten Pullover. Ist sie Unternehmerin?", optionen: ["Nein – nicht nachhaltig", "Ja – sie erzielt Einnahmen", "Ja – weil sie selbständig handelt", "Nein – weil sie keinen Gewinn macht"], richtig: 0, erkl: "Einmalig und ohne Wiederholungsabsicht ist nicht nachhaltig. Auf Gewinn käme es ohnehin nicht an." },
      { art: "wahl", frage: "Ein leitender Angestellter führt mit Vollmacht einen Kiosk. Wem sind die Umsätze zuzurechnen?", optionen: ["Der Inhaberin", "Dem Angestellten", "Beiden je zur Hälfte", "Niemandem"], richtig: 0, erkl: "Der Angestellte ist nicht selbständig; der Kiosk wird auf Rechnung der Inhaberin betrieben." },
      { art: "wahl", frage: "Welche Aussage ist richtig?", optionen: ["Gewinnabsicht ist nicht erforderlich", "Nur Kaufleute können Unternehmer sein", "Wer zwei Betriebe hat, hat zwei Unternehmen", "Unternehmer muss eine juristische Person sein"], richtig: 0, erkl: "§ 2 Abs. 1 S. 3 UStG: Einnahmeerzielung genügt, auch ohne Gewinnabsicht. Ein Unternehmer hat nur ein Unternehmen." },
      { art: "wahl", frage: "Eine Händlerin „vermietet“ ihr eigenes Ladenlokal im eigenen Haus an ihren Laden. Wie ist das zu werten?", optionen: ["Nicht steuerbarer Innenumsatz", "Steuerfreie Vermietung", "Steuerpflichtige Vermietung", "Unentgeltliche Wertabgabe"], richtig: 0, erkl: "Laden und Vermietung gehören zu einem Unternehmen – zwischen eigenen Bereichen gibt es keinen Leistungsaustausch." },
    ],
  },
  {
    id: "leistung", titel: "Lieferung oder sonstige Leistung?", kurz: "§ 3 Abs. 1, 9 UStG", icon: "📦", normen: ["UStG 3 1", "UStG 3 9"],
    karten: [
      { art: "merksatz", titel: "Lieferung", text: "Eine Lieferung liegt vor, wenn der Unternehmer dem Abnehmer die **Verfügungsmacht** an einem **Gegenstand** verschafft (§ 3 Abs. 1 UStG) – der Abnehmer kann darüber wie ein Eigentümer verfügen." },
      { art: "erklaerung", titel: "Gegenstand und Eigentumsvorbehalt", text: "• Gegenstände sind körperliche Sachen und Güter, die im Verkehr wie Sachen behandelt werden – z. B. **Strom** und **Wärme**.\n• Ein **Eigentumsvorbehalt** ändert nichts: Mit der Übergabe hat der Käufer die Verfügungsmacht, auch wenn er noch in Raten zahlt." },
      { art: "merksatz", titel: "Sonstige Leistung", text: "Alles, was **keine Lieferung** ist, ist eine sonstige Leistung (§ 3 Abs. 9 UStG): ein **Tun, Dulden oder Unterlassen** – z. B. Vermietung, Behandlung, Beratung, Unterricht, ein Wettbewerbsverbot gegen Geld." },
      { art: "beispiel", titel: "Keine Leistung", text: "Die bloße **Zahlung von Geld** ist keine Leistung. Zahlt eine Versicherung nach einem Brand, erbringt weder sie noch der Geschädigte eine Leistung im umsatzsteuerlichen Sinne." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Stadtwerk versorgt einen Bäcker mit Strom. Was liegt vor?", optionen: ["Lieferung", "Sonstige Leistung", "Keine Leistung", "Werkleistung"], richtig: 0, erkl: "Strom gilt als Gegenstand – also Lieferung." },
      { art: "wahl", frage: "Eine Vermieterin überlässt Büroräume gegen Miete. Was liegt vor?", optionen: ["Sonstige Leistung (Dulden)", "Lieferung", "Keine Leistung", "Lieferung, weil ein Grundstück betroffen ist"], richtig: 0, erkl: "Die Vermieterin duldet die Nutzung; Verfügungsmacht wird nicht verschafft." },
      { art: "wahl", frage: "Ware wird unter Eigentumsvorbehalt übergeben, bezahlt wird in vier Raten. Wann ist geliefert?", optionen: ["Mit der Übergabe", "Mit der letzten Rate", "Mit der ersten Rate", "Mit Vertragsschluss"], richtig: 0, erkl: "Die Verfügungsmacht geht mit der Übergabe über; der Eigentumsvorbehalt ist unerheblich." },
      { art: "wahl", frage: "Ein Händler verpflichtet sich gegen Geld, ein Jahr keine Konkurrenzprodukte zu verkaufen. Was liegt vor?", optionen: ["Sonstige Leistung (Unterlassen)", "Lieferung", "Keine Leistung", "Schadensersatz"], richtig: 0, erkl: "§ 3 Abs. 9 S. 2 UStG: Auch ein Unterlassen kann eine sonstige Leistung sein." },
    ],
  },
  {
    id: "ort-lieferung", titel: "Wo wird geliefert?", kurz: "§ 3 Abs. 6, 7 · § 1 Abs. 2 UStG", icon: "📍", normen: ["UStG 3 6", "UStG 3 7", "UStG 1 2"],
    karten: [
      { art: "merksatz", titel: "Warum der Ort zählt", text: "Steuerbar ist ein Umsatz nur, wenn er **im Inland** ausgeführt wird (§ 1 Abs. 1 Nr. 1 UStG). Deshalb muss der **Ort** jeder Lieferung bestimmt werden." },
      { art: "erklaerung", titel: "Bewegte Lieferung (§ 3 Abs. 6 UStG)", text: "Wird der Gegenstand **befördert oder versendet**, ist der Ort dort, wo die Beförderung bzw. Versendung **beginnt**.\n• **Beförderung**: Lieferer oder Abnehmer fährt selbst – auch wenn der Kunde die Ware im Laden **abholt**.\n• **Versendung**: Ein selbständiger Beauftragter (Spedition, DHL) transportiert – Beginn mit der **Übergabe** an ihn." },
      { art: "erklaerung", titel: "Unbewegte Lieferung (§ 3 Abs. 7 UStG)", text: "Wird nichts bewegt, ist der Ort dort, wo sich der Gegenstand bei Verschaffung der Verfügungsmacht **befindet** – z. B. beim Verkauf eines Grundstücks." },
      { art: "beispiel", titel: "Was ist Inland?", text: "Inland ist die Bundesrepublik Deutschland **ohne** Büsingen, **Helgoland**, die Freizonen und die Gewässer zwischen Hoheitsgrenze und Strandlinie (§ 1 Abs. 2 S. 1 UStG)." },
    ],
    fragen: [
      { art: "wahl", frage: "Eine Händlerin in Hannover übergibt einen Pullover an DHL; die Kundin in München erhält ihn zwei Tage später. Wo ist der Lieferort?", optionen: ["Hannover", "München", "Am Sitz von DHL", "Es gibt keinen Lieferort"], richtig: 0, erkl: "Versendungslieferung: Beginn mit Übergabe an den Beauftragten (§ 3 Abs. 6 S. 3, 4 UStG) – in Hannover." },
      { art: "wahl", frage: "Ein Kunde kauft im Kiosk in Hamburg eine Zeitung und nimmt sie mit. Welche Lieferart liegt vor?", optionen: ["Beförderungslieferung (Abholfall)", "Versendungslieferung", "Unbewegte Lieferung", "Sonstige Leistung"], richtig: 0, erkl: "Der Abnehmer befördert selbst – Ort ist, wo die Beförderung beginnt: Hamburg." },
      { art: "wahl", frage: "Ein Bäcker verkauft auf Helgoland Brötchen. Ist der Umsatz im Inland steuerbar?", optionen: ["Nein – Helgoland ist kein Inland", "Ja – Helgoland gehört zu Deutschland", "Ja, aber steuerfrei", "Nur wenn der Bäcker aus Cuxhaven kommt"], richtig: 0, erkl: "§ 1 Abs. 2 S. 1 UStG nimmt Helgoland ausdrücklich vom Inland aus." },
      { art: "wahl", frage: "Ein Spediteur holt Ware im Außenlager des Verkäufers in Hemmingen ab und bringt sie zum Kunden nach Hannover. Wo ist der Lieferort?", optionen: ["Hemmingen", "Hannover", "Sitz des Spediteurs", "Sitz des Verkäufers"], richtig: 0, erkl: "Die Versendung beginnt mit Übergabe an den Spediteur im Lager." },
    ],
  },
  {
    id: "ort-sonstige", titel: "Wo wird die sonstige Leistung erbracht?", kurz: "§ 3a UStG", icon: "🛰️", normen: ["UStG 3a 1", "UStG 3a 2", "UStG 3a 3"],
    karten: [
      { art: "merksatz", titel: "Erst Sonderregel, dann Grundregel", text: "Sonstige Leistungen (Tun, Dulden, Unterlassen – z. B. Beratung, Vermietung, Unterricht) haben eigene Ortsregeln in § 3a UStG. Zuerst prüfen, ob eine **Sonderregel** greift – erst dann die Grundregel." },
      { art: "erklaerung", titel: "Die zwei Grundregeln", text: "• **B2C** – an Privatpersonen (§ 3a Abs. 1 UStG): Ort ist dort, wo der **Leistende** sein Unternehmen betreibt.\n• **B2B** – an einen Unternehmer für dessen Unternehmen (§ 3a Abs. 2 UStG): Ort ist dort, wo der **Empfänger** sein Unternehmen betreibt." },
      { art: "erklaerung", titel: "Die wichtigsten Sonderregeln", text: "• **Grundstücke** (§ 3a Abs. 3 Nr. 1 UStG): Ort ist, wo das Grundstück **liegt** – Vermietung, Ferienwohnung, Makler, Architekt.\n• **Unterricht, Kultur, Unterhaltung** an Privatpersonen (§ 3a Abs. 3 Nr. 3 UStG): dort, wo die Leistung **tatsächlich erbracht** wird." },
      { art: "beispiel", titel: "Typischer Klausurfall", text: "Eine Ärztin aus Bremerhaven vermietet ihr Ferienhaus in **Barcelona**: Ort Spanien → in Deutschland **nicht steuerbar**. Zum Unternehmen gehört das Ferienhaus trotzdem." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Steuerberater aus Hamburg berät eine französische GmbH für deren Unternehmen. Wo ist der Ort?", optionen: ["Frankreich (Sitz des Empfängers)", "Hamburg", "Ort des Gesprächs", "Es gibt keinen Ort"], richtig: 0, erkl: "B2B: § 3a Abs. 2 UStG – Sitz des Empfängers. Im Inland nicht steuerbar." },
      { art: "wahl", frage: "Derselbe Steuerberater berät eine Privatperson aus Lyon. Wo ist der Ort?", optionen: ["Hamburg (Sitz des Leistenden)", "Lyon", "Paris", "Dort, wo das Vermögen liegt"], richtig: 0, erkl: "B2C-Grundregel § 3a Abs. 1 UStG: Sitz des leistenden Unternehmers." },
      { art: "wahl", frage: "Eine Unternehmerin vermietet ihre Ferienwohnung in Lübeck an Gäste aus Frankreich. Wo ist der Ort?", optionen: ["Lübeck", "Frankreich", "Sitz der Vermieterin", "Wohnsitz der Gäste"], richtig: 0, erkl: "Grundstücksleistung: § 3a Abs. 3 Nr. 1 UStG – wo das Grundstück liegt." },
      { art: "wahl", frage: "Eine Händlerin gibt in ihrem Laden in Hannover einen Strickkurs für Privatleute. Wo ist der Ort?", optionen: ["Hannover – wo der Kurs stattfindet", "Am Wohnort der Teilnehmer", "Am Sitz des Wollherstellers", "Überall, wo die Teilnehmer stricken"], richtig: 0, erkl: "Unterrichtende Leistung an Nichtunternehmer: § 3a Abs. 3 Nr. 3 UStG – Ort der tatsächlichen Erbringung." },
    ],
  },
  {
    id: "sonderfaelle", titel: "Werklieferung, Kommission, Reihengeschäft", kurz: "§ 3 Abs. 3, 4, 6a, 7 UStG", icon: "🔗", normen: ["UStG 3 3", "UStG 3 4", "UStG 3 6a", "UStG 3 7"],
    karten: [
      { art: "merksatz", titel: "Werklieferung oder Werkleistung? (§ 3 Abs. 4 UStG)", text: "Bearbeitet ein Unternehmer einen **fremden** Gegenstand und verwendet dabei **selbst beschaffte Hauptstoffe**, ist das eine **Lieferung** (Werklieferung) – auch wenn das Ergebnis mit Grund und Boden fest verbunden wird (Hausbau).\nStellt er nur **Zutaten oder Nebensachen** (Garn, Schrauben), bleibt es eine **sonstige Leistung** (Werkleistung)." },
      { art: "erklaerung", titel: "Kommission (§ 3 Abs. 3 UStG)", text: "Ein **Kommissionär** verkauft (oder kauft) **im eigenen Namen für fremde Rechnung**.\nUmsatzsteuerlich gibt es **zwei Lieferungen**: zwischen Kommittent und Kommissionär **und** zwischen Kommissionär und Kunde.\nBei der **Verkaufskommission** gilt der **Kommissionär als Abnehmer** – die Lieferung an ihn findet erst statt, wenn er an den Kunden liefert." },
      { art: "erklaerung", titel: "Reihengeschäft (§ 3 Abs. 6a, 7 UStG)", text: "Mehrere Unternehmer verkaufen **denselben Gegenstand** hintereinander, er gelangt aber **direkt vom Ersten zum Letzten**.\n• Nur **eine** Lieferung ist die **bewegte** – Ort: Beginn der Beförderung (§ 3 Abs. 6 S. 1).\n• Transportiert der **erste** Unternehmer → seine Lieferung ist bewegt; holt der **letzte** Abnehmer ab → die Lieferung an ihn.\n• **Ruhende** Lieferungen **vor** der bewegten: Ort am **Beginn**, **danach**: am **Ende** der Beförderung (§ 3 Abs. 7 S. 2 Nr. 1, 2)." },
      { art: "beispiel", titel: "Reihengeschäft in Zahlen", text: "A (Hamburg) verkauft an B (Berlin), B an C (München). **A** lässt die Ware direkt von Hamburg nach München fahren.\n• A → B: **bewegte** Lieferung, Ort **Hamburg** (Beginn).\n• B → C: ruhende Lieferung **nach** der bewegten, Ort **München** (Ende)." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Bauunternehmer errichtet auf dem Grundstück seiner Kundin ein Haus mit eigenem Material. Was liegt vor?", optionen: ["Werklieferung (Lieferung)", "Werkleistung (sonstige Leistung)", "Zwei getrennte Leistungen", "Kein Umsatz"], richtig: 0, erkl: "Selbst beschaffte Hauptstoffe → Werklieferung, auch bei fester Verbindung mit dem Grund und Boden (§ 3 Abs. 4 UStG)." },
      { art: "wahl", frage: "Eine Schneiderin kürzt die Hose eines Kunden und verwendet dafür eigenes Garn. Was liegt vor?", optionen: ["Werkleistung (sonstige Leistung)", "Werklieferung", "Lieferung des Garns", "Kein Umsatz"], richtig: 0, erkl: "Garn ist nur Zutat – es bleibt eine sonstige Leistung (§ 3 Abs. 4, 9 UStG)." },
      { art: "wahl", frage: "Kunsthändler K verkauft im eigenen Namen Bilder der Malerin M auf deren Rechnung. Wie viele Lieferungen liegen beim Verkauf an eine Kundin vor?", optionen: ["Zwei: M an K und K an die Kundin", "Eine: M an die Kundin", "Eine: K an die Kundin", "Keine – K vermittelt nur"], richtig: 0, erkl: "Verkaufskommission: Lieferung M → K und K → Kundin; K gilt als Abnehmer (§ 3 Abs. 3 UStG)." },
      { art: "wahl", frage: "A (Köln) verkauft an B (Bonn), B an C (Dresden). C holt die Ware selbst in Köln ab. Welche Lieferung ist die bewegte?", optionen: ["B an C", "A an B", "Beide", "Keine"], richtig: 0, erkl: "Holt der letzte Abnehmer ab, ist die Lieferung an ihn bewegt (§ 3 Abs. 6a S. 3 UStG)." },
      { art: "wahl", frage: "Reihengeschäft: Die bewegte Lieferung ist A an B; danach liefert B an C. Wo ist die Lieferung B an C ausgeführt?", optionen: ["Am Ende der Beförderung", "Am Beginn der Beförderung", "Am Sitz von B", "Am Sitz von C, egal wo die Ware ankommt"], richtig: 0, erkl: "Ruhende Lieferung nach der bewegten → Ende der Beförderung (§ 3 Abs. 7 S. 2 Nr. 2 UStG)." },
    ],
  },
  {
    id: "entgelt", titel: "Gegen Entgelt? Leistungsaustausch", kurz: "§ 1 Abs. 1 Nr. 1 UStG", icon: "🔁", normen: ["UStG 1 1"],
    karten: [
      { art: "merksatz", titel: "Leistungsaustausch", text: "Steuerbar ist eine Leistung nur **gegen Entgelt**: Leistung und Gegenleistung müssen **wirtschaftlich verknüpft** sein – das Geld wird gerade **für** die Leistung gezahlt. Die Höhe spielt dafür keine Rolle." },
      { art: "erklaerung", titel: "Echter Schadensersatz", text: "Wer zahlt, weil er für einen **Schaden einstehen** muss, zahlt kein Entgelt. Das gilt für **Mahngebühren, Verzugszinsen, Vertragsstrafen** und Schadensersatz nach einem Unfall – sie sind **nicht steuerbar** und erhöhen auch den Kaufpreis nicht." },
      { art: "erklaerung", titel: "Kein Austausch mit sich selbst", text: "Zahlungen **innerhalb eines Unternehmens** (z. B. „Miete“ des eigenen Ladens im eigenen Haus) sind kein Leistungsaustausch – nicht steuerbarer **Innenumsatz**." },
      { art: "klausur", titel: "Die fünf Merkmale von § 1 Abs. 1 Nr. 1 UStG", text: "Ein Unternehmer führt im Rahmen seines Unternehmens eine Lieferung oder sonstige Leistung gegen Entgelt im Inland aus. Fehlt **ein** Merkmal, ist der Vorgang nicht nach § 1 Abs. 1 Nr. 1 UStG steuerbar. (Ausnahme: bestimmte **unentgeltliche** Entnahmen und Zuwendungen werden gesetzlich wie entgeltliche Leistungen behandelt.)" },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Kunde zahlt mit der letzten Rate 200 € Mahngebühren. Wie sind die 200 € zu behandeln?", optionen: ["Nicht steuerbar – echter Schadensersatz", "Teil des Kaufpreises", "Eigene steuerpflichtige Leistung", "Steuerfrei"], richtig: 0, erkl: "Mahngebühren werden für den Verzugsschaden gezahlt, nicht für die Lieferung." },
      { art: "wahl", frage: "Der Unfallgegner ersetzt einem Taxiunternehmer die Reparatur. Steuerbar?", optionen: ["Nein – echter Schadensersatz", "Ja – das Taxi wurde repariert", "Ja, zum ermäßigten Satz", "Nur wenn eine Rechnung erstellt wird"], richtig: 0, erkl: "Der Taxiunternehmer erbringt dem Unfallgegner keine Leistung." },
      { art: "wahl", frage: "Ein Händler verkauft seinem Sohn einen Fernseher weit unter Preis. Fehlt die Steuerbarkeit?", optionen: ["Nein – auch ein niedriges Entgelt ist ein Entgelt", "Ja – das Entgelt ist zu niedrig", "Ja – Angehörige zählen nicht", "Nur wenn unter Einkaufspreis"], richtig: 0, erkl: "Die Höhe des Entgelts ist für die Steuerbarkeit unerheblich; sie spielt erst bei der Bemessungsgrundlage eine Rolle." },
      { art: "wahl", frage: "Wie viele Merkmale hat der Tatbestand des § 1 Abs. 1 Nr. 1 UStG?", optionen: ["Fünf", "Drei", "Vier", "Sechs"], richtig: 0, erkl: "Unternehmer · Rahmen des Unternehmens · Lieferung/sonstige Leistung · gegen Entgelt · im Inland." },
    ],
  },
  {
    id: "satz", titel: "Steuersatz & Herausrechnen", kurz: "§§ 10, 12 UStG · Anlage 2", icon: "％", normen: ["UStG 12 1", "UStG 12 2", "UStG 10 1"],
    karten: [
      { art: "merksatz", titel: "19 % oder 7 %", text: "Der Regelsteuersatz beträgt **19 %** (§ 12 Abs. 1 UStG). **7 %** gelten u. a. für die Gegenstände der **Anlage 2** – vor allem Lebensmittel, Bücher und Zeitungen (§ 12 Abs. 2 Nr. 1 UStG)." },
      { art: "erklaerung", titel: "Die typischen Fallen", text: "• **7 %**: Käse, Salami, Kaffee, Kekse, Honig, Bücher, Zeitungen, Leitungswasser, Milch.\n• **19 %**: Wein, Saft, Cola, **Mineralwasser in Flaschen**, Kleidung, Körbe.\n• Seit 2026 **7 %** für Speisen im Restaurant – **Getränke bleiben bei 19 %**.\n• Mehrere Waren zum Gesamtpreis (Präsentkorb): **jede Ware einzeln** besteuern." },
      { art: "erklaerung", titel: "Herausrechnen", text: "Preise enthalten die Steuer, wenn nichts anderes vereinbart ist. Bemessungsgrundlage ist das **Entgelt ohne USt** (§ 10 Abs. 1 UStG):\n• USt = Brutto × **19/119** bzw. **7/107**\n• Netto = Brutto ÷ **1,19** bzw. **1,07**" },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Kiosk-Einkauf: Saft 4,20 € und Kekse 5,60 €.\n• Saft (19 %): 4,20 × 19/119 = **0,67 €**\n• Kekse (7 %): 5,60 × 7/107 = **0,37 €**" },
    ],
    fragen: [
      { art: "wahl", frage: "Welcher Steuersatz gilt für eine Flasche Mineralwasser im Supermarkt?", optionen: ["19 %", "7 %", "0 %", "Steuerfrei"], richtig: 0, erkl: "Wasser in Fertigpackungen ist von der Anlage 2 ausgenommen – 19 %." },
      { art: "wahl", frage: "Welcher Steuersatz gilt für eine Tageszeitung?", optionen: ["7 %", "19 %", "Steuerfrei", "0 %"], richtig: 0, erkl: "Zeitungen stehen in Anlage 2 (lfd. Nr. 49) – 7 %." },
      { art: "zahl", frage: "Ein Kunde zahlt 59,50 € für einen Pullover (19 %). Wie hoch ist die Umsatzsteuer (in €)?", cent: 950, erkl: "59,50 × 19/119 = 9,50 €; Netto 50,00 €." },
      { art: "zahl", frage: "Ein Buch kostet 21,40 € (7 %). Wie hoch ist das Entgelt ohne Umsatzsteuer (in €)?", cent: 2000, erkl: "21,40 ÷ 1,07 = 20,00 € (USt 1,40 €)." },
      { art: "wahl", frage: "Ein Restaurant serviert 2026 ein Mittagessen und eine Cola. Welche Steuersätze gelten?", optionen: ["Essen 7 %, Cola 19 %", "Beides 19 %", "Beides 7 %", "Essen 19 %, Cola 7 %"], richtig: 0, erkl: "Seit 2026 sind Restaurantleistungen ermäßigt (§ 12 Abs. 2 Nr. 15 UStG) – ausgenommen Getränke." },
    ],
  },
  {
    id: "entstehung", titel: "Wann entsteht die Steuer?", kurz: "§ 13 UStG", icon: "📅", normen: ["UStG 13 1"],
    karten: [
      { art: "merksatz", titel: "Grundregel (Sollbesteuerung)", text: "Die Steuer entsteht mit **Ablauf des Voranmeldungszeitraums**, in dem die Leistung **ausgeführt** wurde (§ 13 Abs. 1 Nr. 1 Buchst. a S. 1 UStG). Rechnung und Zahlung spielen dafür **keine** Rolle." },
      { art: "erklaerung", titel: "Wann ist ausgeführt?", text: "• Lieferung: mit Übergabe bzw. Beginn der Beförderung oder Versendung.\n• Sonstige Leistung: mit ihrer **Vollendung** – eine Ferienwohnung am letzten Miettag.\n• **Teilleistungen** (S. 2, 3): Wird z. B. Monatsmiete vereinbart, entsteht die Steuer **jeden Monat** – auch wenn der Mieter zu spät zahlt." },
      { art: "erklaerung", titel: "Anzahlungen (S. 4)", text: "Wird Geld **vor** der Leistung vereinnahmt, entsteht die Steuer **insoweit** schon mit Ablauf des Monats der **Zahlung**. (Wir unterstellen monatliche Voranmeldungen: Voranmeldungszeitraum = Monat.) Der Rest folgt im Monat der Ausführung." },
      { art: "beispiel", titel: "Beispiel Anzahlung", text: "Kaufpreis 9.600 € brutto, Anzahlung 1.600 € im März, Lieferung im April:\n• März: 1.600 × 19/119 = **255,46 €**\n• April: 9.600 × 19/119 = 1.532,77 € − 255,46 € = **1.277,31 €**" },
    ],
    fragen: [
      { art: "wahl", frage: "Lieferung am 03.04., Zahlung in Raten von Mai bis August. Wann entsteht die Steuer?", optionen: ["Mit Ablauf April", "Mit jeder Rate", "Mit Ablauf August", "Mit Ablauf März"], richtig: 0, erkl: "Maßgeblich ist die Ausführung der Lieferung – Raten sind unerheblich." },
      { art: "wahl", frage: "Ein Mieter zahlt die (steuerpflichtige) Maimiete erst im Juli. Wann entsteht die Steuer dafür?", optionen: ["Mit Ablauf Mai", "Mit Ablauf Juli", "Mit Ablauf Dezember", "Erst bei Mahnung"], richtig: 0, erkl: "Monatliche Teilleistung – die Steuer entsteht mit Ablauf des Monats, für den die Miete geschuldet ist." },
      { art: "zahl", frage: "Kaufpreis 2.380 € brutto (19 %). Anzahlung 595 € im Mai, Lieferung im Juni. Wie viel USt entsteht mit Ablauf Mai (in €)?", cent: 9500, erkl: "Anzahlung vor Ausführung → § 13 Abs. 1 Nr. 1 a S. 4 UStG: 595 × 19/119 = 95,00 €." },
      { art: "wahl", frage: "Ferienwohnung vom 20.05. bis 05.06., Restzahlung nach Ende. Wann entsteht die Steuer für den Rest?", optionen: ["Mit Ablauf Juni", "Mit Ablauf Mai", "Mit Ablauf des Zahlungsmonats", "Mit Vertragsschluss"], richtig: 0, erkl: "Die Vermietung ist am 05.06. vollendet." },
    ],
  },
  {
    id: "aenderung", titel: "Wenn sich das Entgelt ändert", kurz: "§ 17 UStG", icon: "↩️", normen: ["UStG 17 1", "UStG 17 2"],
    karten: [
      { art: "merksatz", titel: "Später weniger bekommen? Berichtigen!", text: "Ändert sich das Entgelt **nachträglich** – Skonto, Rabatt, Bonus, Rücksendung –, berichtigt der **Leistende** seine Umsatzsteuer und der **Empfänger** seine Vorsteuer (§ 17 Abs. 1 S. 1, 2 UStG).\nBerichtigt wird im Voranmeldungszeitraum der **Änderung** – nicht rückwirkend (§ 17 Abs. 1 S. 8 UStG)." },
      { art: "erklaerung", titel: "Weitere Fälle (§ 17 Abs. 2 UStG)", text: "• **Uneinbringlich** (z. B. Insolvenz des Kunden): Steuer berichtigen; zahlt er später doch, erneut berichtigen (Nr. 1). Bloßer Zahlungsverzug reicht **nicht**.\n• **Anzahlung** geleistet, Leistung aber nie erbracht (Nr. 2).\n• Leistung **rückgängig** gemacht, z. B. Rücktritt vom Kauf (Nr. 3)." },
      { art: "beispiel", titel: "Skonto in Zahlen", text: "Lieferung im März: 10.000 € + 1.900 € USt = 11.900 €. Der Kunde zahlt im April mit **2 % Skonto** (238 € weniger).\nIm April: USt-Minderung = 238 € × 19/119 = **38 €** beim Lieferanten – und **38 €** weniger Vorsteuer beim Kunden." },
    ],
    fragen: [
      { art: "zahl", frage: "Rechnung 5.950 € brutto (19 %). Der Kunde zieht 3 % Skonto ab. Um wie viel € mindert sich die Umsatzsteuer?", cent: 2850, erkl: "Skonto 178,50 € brutto × 19/119 = 28,50 €." },
      { art: "wahl", frage: "Lieferung im Mai, Skontoabzug bei Zahlung im Juni. Wann wird die Umsatzsteuer berichtigt?", optionen: ["Im Juni", "Im Mai", "Gar nicht", "Am Jahresende"], richtig: 0, erkl: "Im VAZ der Änderung (§ 17 Abs. 1 S. 8 UStG)." },
      { art: "wahl", frage: "Ein Kunde zahlt seit drei Monaten nicht, ist aber zahlungsfähig. Darf der Unternehmer die Steuer berichtigen?", optionen: ["Nein – bloßer Verzug ist keine Uneinbringlichkeit", "Ja, sofort", "Ja, nach 30 Tagen", "Nur mit Zustimmung des Kunden"], richtig: 0, erkl: "§ 17 Abs. 2 Nr. 1 UStG setzt Uneinbringlichkeit voraus." },
      { art: "wahl", frage: "Wer muss bei einem nachträglichen Rabatt außer dem Lieferanten noch etwas berichtigen?", optionen: ["Der unternehmerische Abnehmer seine Vorsteuer", "Niemand", "Das Finanzamt", "Der Steuerberater"], richtig: 0, erkl: "§ 17 Abs. 1 S. 2 UStG." },
    ],
  },
  {
    id: "befreiung", titel: "Steuerfrei: Vermietung & Heilbehandlung", kurz: "§ 4 Nr. 12, 14, 28 UStG", icon: "🏠", normen: ["UStG 4"],
    karten: [
      { art: "merksatz", titel: "Erst steuerbar, dann befreit", text: "Eine Steuerbefreiung wird **erst geprüft, wenn der Umsatz steuerbar ist**. Steuerfreie Umsätze sind trotzdem mit **Bemessungsgrundlage** und **Voranmeldungszeitraum** anzugeben." },
      { art: "erklaerung", titel: "Grundstücksvermietung (§ 4 Nr. 12 a UStG)", text: "Vermietung und Verpachtung von Grundstücken ist **steuerfrei**. **Nicht** befreit sind (S. 2):\n• **kurzfristige Beherbergung** (bis zu 6 Monate) – Ferienwohnung, Hotel → steuerpflichtig zu **7 %**\n• einzeln vermietete **Stellplätze**\n• Betriebsvorrichtungen\nBetriebs- und Heizkosten sowie ein mitvermieteter Stellplatz teilen als **Nebenleistung** die Steuerfreiheit." },
      { art: "erklaerung", titel: "Heilbehandlung (§ 4 Nr. 14 a UStG)", text: "Steuerfrei sind **Heilbehandlungen im Bereich der Humanmedizin** durch Ärzte, Zahnärzte, Heilpraktiker, Physiotherapeuten, Hebammen – auch **Vorsorge**.\n**Nicht** befreit: Gutachten für Versicherungen (kein therapeutisches Ziel) und **Tierbehandlungen**. Ein Medikament während der Behandlung ist steuerfreie Nebenleistung." },
      { art: "erklaerung", titel: "Verkauf von Praxisgeräten (§ 4 Nr. 28 UStG)", text: "Verkauft die Ärztin ein Gerät ihrer Praxis (ein sog. **Hilfsgeschäft** – auch das gehört zum Unternehmen), das sie **nur für steuerfreie Behandlungen** genutzt hat, ist der Verkauf steuerbar, aber nach § 4 Nr. 28 UStG **steuerfrei**." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Vermieter vermietet eine Wohnung an ein Rentnerehepaar. Wie ist der Umsatz zu behandeln?", optionen: ["Steuerfrei nach § 4 Nr. 12 a", "Steuerpflichtig 19 %", "Steuerpflichtig 7 %", "Nicht steuerbar"], richtig: 0, erkl: "Grundstücksvermietung ist steuerfrei." },
      { art: "wahl", frage: "Eine Ferienwohnung wird für zwei Wochen an Urlauber vermietet. Wie ist der Umsatz zu behandeln?", optionen: ["Steuerpflichtig zu 7 %", "Steuerfrei", "Steuerpflichtig zu 19 %", "Nicht steuerbar"], richtig: 0, erkl: "Kurzfristige Beherbergung ist von der Befreiung ausgenommen; Steuersatz 7 % (§ 12 Abs. 2 Nr. 11 UStG)." },
      { art: "wahl", frage: "Eine Ärztin erstellt ein Gutachten für eine Lebensversicherung. Steuerfrei?", optionen: ["Nein – kein therapeutisches Ziel", "Ja – sie ist Ärztin", "Ja – Gutachten sind immer frei", "Nur bis 50 €"], richtig: 0, erkl: "Nur Heilbehandlungen sind befreit; das Gutachten dient der Versicherung." },
      { art: "wahl", frage: "Die Ärztin verkauft ihr Ultraschallgerät, das sie nur für Behandlungen genutzt hat. Wie ist der Verkauf zu behandeln?", optionen: ["Steuerfrei nach § 4 Nr. 28", "Nicht steuerbar", "Steuerpflichtig 19 %", "Steuerfrei nach § 4 Nr. 14"], richtig: 0, erkl: "Hilfsgeschäft – steuerbar; befreit, weil das Gerät nur für steuerfreie Umsätze verwendet wurde." },
    ],
  },
  {
    id: "option", titel: "Verzicht auf die Steuerbefreiung", kurz: "§ 9 UStG", icon: "🔓", normen: ["UStG 9 1", "UStG 9 2", "UStG 4"],
    karten: [
      { art: "merksatz", titel: "Warum verzichten?", text: "Vermietung von Grundstücken ist grundsätzlich **steuerfrei** (§ 4 Nr. 12 a UStG) – dann bekommt der Vermieter aber **keine Vorsteuer** aus Bau- und Reparaturkosten. Verzichtet er auf die Befreiung (Option), wird die Miete **steuerpflichtig** und er erhält den **Vorsteuerabzug**." },
      { art: "erklaerung", titel: "Voraussetzung 1 – § 9 Abs. 1 UStG", text: "Vermietet wird an einen **anderen Unternehmer für dessen Unternehmen**. An Privatleute (z. B. Wohnung an Rentner) ist **kein** Verzicht möglich." },
      { art: "erklaerung", titel: "Voraussetzung 2 – § 9 Abs. 2 UStG", text: "Der Mieter nutzt die Räume **ausschließlich** für Umsätze, die den **Vorsteuerabzug nicht ausschließen**.\n• **möglich**: Rechtsanwalt, Tischler, Einzelhändler, Architekt\n• **nicht möglich**: Arzt, Physiotherapeut (§ 4 Nr. 14), Versicherungsvertreter (§ 4 Nr. 11), Bank (§ 4 Nr. 8) – deren Umsätze sind steuerfrei" },
      { art: "beispiel", titel: "Folge in Zahlen", text: "Der Anwalt zahlt 1.785 € Miete (nach Option): 1.785 ÷ 1,19 = **1.500 €** Entgelt, **285 €** USt. Der Anwalt zieht die 285 € als Vorsteuer ab – für ihn kostenneutral." },
    ],
    fragen: [
      { art: "wahl", frage: "Mieter ist ein Rechtsanwalt mit Kanzlei. Kann der Vermieter optieren?", optionen: ["Ja", "Nein – Anwälte sind keine Unternehmer", "Nein – Kanzleien sind steuerfrei", "Nur für Wohnräume"], richtig: 0, erkl: "Unternehmer, Nutzung für steuerpflichtige Umsätze → § 9 Abs. 1 und 2 UStG erfüllt." },
      { art: "wahl", frage: "Mieter ist ein Versicherungsvertreter. Kann der Vermieter optieren?", optionen: ["Nein – § 9 Abs. 2 UStG", "Ja – er ist Unternehmer", "Ja, aber nur zu 7 %", "Ja, wenn er zustimmt"], richtig: 0, erkl: "Seine Umsätze sind steuerfrei (§ 4 Nr. 11 UStG) und schließen den Vorsteuerabzug aus." },
      { art: "wahl", frage: "Mieter ist ein Rentnerehepaar. Kann der Vermieter optieren?", optionen: ["Nein – kein Unternehmer", "Ja", "Ja, mit Zustimmung der Mieter", "Nur bei hoher Miete"], richtig: 0, erkl: "§ 9 Abs. 1 UStG verlangt einen Unternehmer als Leistungsempfänger." },
      { art: "zahl", frage: "Nach Option zahlt ein Tischler 2.380 € Monatsmiete. Wie hoch ist die monatliche Umsatzsteuer (in €)?", cent: 38000, erkl: "2.380 × 19/119 = 380,00 € (Entgelt 2.000 €)." },
    ],
  },
  {
    id: "vorsteuer", titel: "Vorsteuerabzug", kurz: "§ 15 UStG", icon: "🧾", normen: ["UStG 15 1", "UStG 15 2", "UStG 14 4"],
    karten: [
      { art: "merksatz", titel: "Voraussetzungen", text: "Ein Unternehmer kann die Umsatzsteuer abziehen, die ihm ein **anderer Unternehmer** für eine Leistung **für sein Unternehmen** in Rechnung stellt – wenn er eine **ordnungsgemäße Rechnung** besitzt (§ 15 Abs. 1 S. 1 Nr. 1 UStG). Bei Rechnungen bis 250 € brutto genügt eine Kleinbetragsrechnung mit Bruttobetrag und Steuersatz." },
      { art: "erklaerung", titel: "Höhe", text: "Abziehbar ist die **gesetzlich geschuldete** Steuer, **höchstens** die in der Rechnung ausgewiesene.\n• **zu hoch** ausgewiesen → nur der gesetzliche Betrag; ihn rechnet man aus dem Gesamtbetrag heraus: **Brutto × 19/119**\n• **zu niedrig** ausgewiesen → nur der ausgewiesene Betrag\n• Kauf von einer **Privatperson** → keine Vorsteuer, auch wenn sie Steuer ausweist" },
      { art: "erklaerung", titel: "Zeitpunkt", text: "Abzug im Voranmeldungszeitraum, in dem **Leistung und Rechnung** vorliegen – das spätere Ereignis zählt. Bei **Anzahlungen**: sobald **Rechnung und Zahlung** vorliegen." },
      { art: "erklaerung", titel: "Ausschluss", text: "Kein Abzug, soweit die Eingangsleistung für **steuerfreie Umsätze** verwendet wird (§ 15 Abs. 2 S. 1 Nr. 1 UStG) – z. B. Liegen in der Arztpraxis. Bei gemischter Nutzung wird **aufgeteilt** (§ 15 Abs. 4 UStG), bei Gebäuden meist nach Fläche." },
    ],
    fragen: [
      { art: "wahl", frage: "Getränke werden am 20.07. bezahlt, am 30.07. geliefert, die Rechnung kommt am 05.08. Wann ist die Vorsteuer abziehbar?", optionen: ["August", "Juli", "September", "Gar nicht"], richtig: 0, erkl: "Erst im August liegen Leistung und Rechnung vor." },
      { art: "zahl", frage: "Rechnung über eine Kasse: 324 € + 76 € USt = 400 €. Wie hoch ist die abziehbare Vorsteuer (in €)?", cent: 6387, erkl: "Der Ausweis ist zu hoch. Gesetzlich geschuldet: 400 × 19/119 = 63,87 € – nur das ist abziehbar." },
      { art: "wahl", frage: "Eine Hausärztin kauft Untersuchungsliegen für die Praxis. Vorsteuerabzug?", optionen: ["Nein – Verwendung für steuerfreie Umsätze", "Ja, voll", "Ja, zur Hälfte", "Ja, wenn sie bar zahlt"], richtig: 0, erkl: "§ 15 Abs. 2 S. 1 Nr. 1 UStG schließt den Abzug aus." },
      { art: "zahl", frage: "Gebäude: 300 m² für steuerpflichtige Umsätze, 150 m² steuerfrei vermietet. Dachreparatur mit 1.800 € Vorsteuer. Wie viel ist abziehbar (in €)?", cent: 120000, erkl: "Aufteilung nach Fläche (§ 15 Abs. 4 UStG): 1.800 × 300/450 = 1.200 €." },
    ],
  },
  {
    id: "rechnung", titel: "Rechnung & falscher Steuerausweis", kurz: "§§ 14, 14c UStG", icon: "🧾", normen: ["UStG 14 4", "UStG 14c 1", "UStG 14c 2", "UStG 15 1"],
    karten: [
      { art: "merksatz", titel: "Was in eine Rechnung gehört (§ 14 Abs. 4 UStG)", text: "• Name und Anschrift von **Leistendem und Empfänger**\n• **Steuernummer** oder USt-IdNr. des Leistenden\n• **Ausstellungsdatum** und fortlaufende **Rechnungsnummer**\n• **Menge und Art** der Leistung, **Zeitpunkt** der Leistung\n• **Entgelt**, **Steuersatz** und **Steuerbetrag**\nOhne ordnungsgemäße Rechnung **kein Vorsteuerabzug** (§ 15 Abs. 1 S. 1 Nr. 1 S. 2 UStG). Bis **250 € brutto** genügt eine Kleinbetragsrechnung mit weniger Angaben (§ 33 UStDV)." },
      { art: "erklaerung", titel: "Zu viel ausgewiesen (§ 14c Abs. 1 UStG)", text: "Ein Unternehmer weist **mehr** Steuer aus, als er schuldet (z. B. 19 % statt 7 %).\n• Er schuldet den **ausgewiesenen** Betrag – auch den **Mehrbetrag**.\n• Der Empfänger darf nur die **gesetzlich geschuldete** Steuer als Vorsteuer abziehen – sie wird aus dem **Gesamtbetrag** herausgerechnet.\n• Die Rechnung kann **berichtigt** werden." },
      { art: "erklaerung", titel: "Gar nicht berechtigt (§ 14c Abs. 2 UStG)", text: "Wer Steuer ausweist, obwohl er es **nicht darf** – **Privatperson**, **Kleinunternehmer**, Scheinrechnung ohne Leistung –, schuldet den ausgewiesenen Betrag.\nDer Empfänger hat **keinen** Vorsteuerabzug." },
      { art: "beispiel", titel: "Fachbuch mit 19 %", text: "Rechnung über Fachbücher (richtig wären 7 %): 1.000 € + **190 €** USt = 1.190 €.\n• Gesetzlich geschuldet: 1.190 € × 7/107 = **77,85 €**.\n• Händler schuldet **190 €** (77,85 € + 112,15 € Mehrbetrag nach § 14c Abs. 1).\n• Der Käufer zieht nur **77,85 €** Vorsteuer ab." },
    ],
    fragen: [
      { art: "zahl", frage: "Rechnung über Bücher (7 %): 500 € + 95 € USt (19 %) = 595 €. Wie viel Vorsteuer darf der unternehmerische Käufer abziehen (in €)?", cent: 3893, erkl: "Nur die gesetzlich geschuldete Steuer, aus dem Gesamtbetrag herausgerechnet: 595 € × 7/107 = 38,93 €." },
      { art: "zahl", frage: "Gleicher Fall: Wie viel Umsatzsteuer schuldet der Händler insgesamt (in €)?", cent: 9500, erkl: "Den ausgewiesenen Betrag: 38,93 € gesetzlich + 56,07 € Mehrbetrag nach § 14c Abs. 1 UStG = 95 €." },
      { art: "wahl", frage: "Eine Privatperson verkauft ihr altes Sofa und schreibt eine Rechnung mit 19 % USt. Folge?", optionen: ["Sie schuldet den ausgewiesenen Betrag (§ 14c Abs. 2)", "Nichts – sie ist kein Unternehmer", "Der Käufer schuldet die Steuer", "Die Steuer wird erstattet"], richtig: 0, erkl: "Unberechtigter Steuerausweis – geschuldet wird der ausgewiesene Betrag." },
      { art: "wahl", frage: "Bis zu welchem Bruttobetrag gilt die Kleinbetragsrechnung?", optionen: ["250 €", "150 €", "500 €", "1.000 €"], richtig: 0, erkl: "§ 33 UStDV: bis 250 € einschließlich Steuer." },
      { art: "wahl", frage: "Was gehört nicht zu den Pflichtangaben einer Rechnung?", optionen: ["Die Bankverbindung", "Die fortlaufende Rechnungsnummer", "Der Zeitpunkt der Leistung", "Der Steuersatz"], richtig: 0, erkl: "§ 14 Abs. 4 UStG verlangt keine Bankverbindung." },
    ],
  },
  {
    id: "wertabgabe", titel: "Unentgeltliche Wertabgaben", kurz: "§ 3 Abs. 1b, 9a · § 10 Abs. 4 UStG", icon: "🎁", normen: ["UStG 3 1b", "UStG 3 9a", "UStG 10 4", "UStG 10 5"],
    karten: [
      { art: "merksatz", titel: "Warum besteuert wird", text: "Ein Unternehmer, der Waren seines Unternehmens **privat** verbraucht, soll nicht besser stehen als ein Verbraucher. Deshalb werden bestimmte **unentgeltliche** Vorgänge wie Leistungen gegen Entgelt besteuert." },
      { art: "erklaerung", titel: "Wie eine Lieferung (§ 3 Abs. 1b UStG)", text: "• **Entnahme** für private Zwecke (Waren aus dem Laden)\n• **Sachzuwendungen ans Personal** – außer **Aufmerksamkeiten bis 60 €**\n• **Geschenke** – außer Geschenke von **geringem Wert bis 50 €** und Warenmuster\nVoraussetzung: Der Gegenstand hat beim Einkauf zum **Vorsteuerabzug** berechtigt." },
      { art: "erklaerung", titel: "Wie eine sonstige Leistung (§ 3 Abs. 9a UStG)", text: "• **Private Nutzung** eines Unternehmensgegenstands (z. B. Firmenwagen)\n• **Andere Leistungen** für private Zwecke (Mitarbeiter streichen das Privathaus)" },
      { art: "beispiel", titel: "Bemessungsgrundlage (§ 10 Abs. 4 UStG)", text: "Bei Entnahmen gilt der **Einkaufspreis im Zeitpunkt der Entnahme** – **nicht** der Verkaufspreis. Die Steuer wird daraufgeschlagen. Beispiel: Wein, Einkaufspreis jetzt 100 € → USt 19 €." },
      { art: "erklaerung", titel: "Verbilligt an Nahestehende (§ 10 Abs. 5 UStG)", text: "Verkauft ein Unternehmer **verbilligt** an sein **Personal** oder an **nahestehende Personen** (z. B. Angehörige, Gesellschafter), gilt eine **Mindestbemessungsgrundlage**: mindestens der Wert nach § 10 Abs. 4 (z. B. Einkaufspreis), höchstens das **marktübliche Entgelt**.\nBeispiel: Einkaufspreis 600 €, Verkauf an die Tochter für 200 € netto → BMG **600 €**." },
    ],
    fragen: [
      { art: "wahl", frage: "Eine Händlerin nimmt Lebensmittel (mit Vorsteuerabzug gekauft) für ihre Feier mit. Was liegt vor?", optionen: ["Entnahme nach § 3 Abs. 1b", "Nichts – eigene Ware", "Sonstige Leistung nach § 3 Abs. 9a", "Steuerfreier Umsatz"], richtig: 0, erkl: "Entnahme für private Zwecke – gleichgestellt mit einer Lieferung." },
      { art: "wahl", frage: "Ein Arbeitgeber schenkt einer Mitarbeiterin Blumen für 35 € zum Geburtstag. Steuerbar?", optionen: ["Nein – Aufmerksamkeit", "Ja – Sachzuwendung", "Ja, zu 7 %", "Nur mit Rechnung"], richtig: 0, erkl: "Aufmerksamkeiten bis 60 € sind nicht steuerbar." },
      { art: "zahl", frage: "Entnahme von Wein: Einkaufspreis beim Kauf 80 €, jetzt 90 €, Ladenpreis 160 €. Wie hoch ist die USt (in €)?", cent: 1710, erkl: "Einkaufspreis im Zeitpunkt der Entnahme 90 € × 19 % = 17,10 €." },
      { art: "wahl", frage: "Eine Händlerin entnimmt einen Pullover, den sie ohne Vorsteuerabzug von einer Privatperson gekauft hatte. Wertabgabe?", optionen: ["Nein – kein Vorsteuerabzug beim Erwerb", "Ja – wie jede Entnahme", "Ja, aber steuerfrei", "Nur über 50 €"], richtig: 0, erkl: "§ 3 Abs. 1b S. 2 UStG setzt voraus, dass der Gegenstand zum Vorsteuerabzug berechtigt hat." },
      { art: "zahl", frage: "Ein Möbelhändler verkauft seinem Mitarbeiter einen Schrank (Einkaufspreis 800 €, Ladenpreis 1.500 € netto) für 300 € netto. Bemessungsgrundlage (in €)?", cent: 80000, erkl: "Mindestbemessungsgrundlage: Einkaufspreis 800 € > Entgelt 300 € (§ 10 Abs. 5 Nr. 2 i. V. m. Abs. 4 Nr. 1 UStG)." },
    ],
  },
  {
    id: "kleinunternehmer", titel: "Kleinunternehmer", kurz: "§ 19 UStG", icon: "🌱", normen: ["UStG 19 1", "UStG 19 2", "UStG 19 3"],
    karten: [
      { art: "merksatz", titel: "Die zwei Grenzen (seit 2025)", text: "Die Umsätze eines Kleinunternehmers sind **steuerfrei**, wenn sein Gesamtumsatz\n• im **Vorjahr** höchstens **25.000 €** betrug **und**\n• im **laufenden Jahr** **100.000 €** nicht übersteigt (§ 19 Abs. 1 S. 1 UStG).\nWird die 100.000-€-Grenze im laufenden Jahr überschritten, ist **ab diesem Umsatz** Schluss mit der Befreiung." },
      { art: "erklaerung", titel: "Was das bedeutet", text: "• Keine Umsatzsteuer auf die Umsätze – also auch **keine Steuer in der Rechnung** ausweisen.\n• **Kein Vorsteuerabzug** aus Eingangsrechnungen (§ 15 Abs. 2 S. 1 Nr. 1 UStG).\n• Weist er trotzdem Steuer aus, **schuldet** er sie nach § 14c Abs. 2 UStG.\n• **Verzicht** möglich (z. B. wegen hoher Vorsteuern) – bindet **fünf Jahre** (§ 19 Abs. 3 UStG)." },
      { art: "beispiel", titel: "Durchgespielt", text: "• Vorjahr 22.000 €, dieses Jahr voraussichtlich 60.000 € → **Kleinunternehmer**.\n• Vorjahr 27.000 € → **kein** Kleinunternehmer, egal wie wenig er dieses Jahr umsetzt.\n• Gründer, der im Vorjahr noch nichts umgesetzt hat → kann Kleinunternehmer sein." },
    ],
    fragen: [
      { art: "wahl", frage: "Umsatz im Vorjahr 24.000 €, im laufenden Jahr voraussichtlich 45.000 €. Kleinunternehmer?", optionen: ["Ja", "Nein – 45.000 € sind zu viel", "Nur mit Antrag", "Nein – über 22.000 €"], richtig: 0, erkl: "Vorjahr ≤ 25.000 € und laufendes Jahr ≤ 100.000 € (§ 19 Abs. 1 S. 1 UStG)." },
      { art: "wahl", frage: "Umsatz im Vorjahr 26.000 €, im laufenden Jahr nur 15.000 €. Kleinunternehmer?", optionen: ["Nein – Vorjahresgrenze überschritten", "Ja", "Ja, ab Juli", "Nur für die Hälfte der Umsätze"], richtig: 0, erkl: "Das Vorjahr liegt über 25.000 €." },
      { art: "wahl", frage: "Kann ein Kleinunternehmer Vorsteuer aus dem Kauf eines Laptops abziehen?", optionen: ["Nein", "Ja, voll", "Ja, zur Hälfte", "Nur bei über 1.000 €"], richtig: 0, erkl: "Seine Umsätze sind steuerfrei → kein Vorsteuerabzug (§ 15 Abs. 2 S. 1 Nr. 1 UStG)." },
      { art: "wahl", frage: "Ein Kleinunternehmer weist in einer Rechnung 19 % USt aus. Folge?", optionen: ["Er schuldet den ausgewiesenen Betrag", "Nichts – er ist ja befreit", "Der Kunde schuldet die Steuer", "Die Rechnung ist nichtig"], richtig: 0, erkl: "Unberechtigter Steuerausweis (§ 14c Abs. 2 UStG)." },
      { art: "wahl", frage: "Wie lange bindet der Verzicht auf die Kleinunternehmerregelung?", optionen: ["Mindestens fünf Kalenderjahre", "Ein Jahr", "Zehn Jahre", "Er ist jederzeit widerruflich"], richtig: 0, erkl: "§ 19 Abs. 3 S. 3 UStG." },
    ],
  },
];
