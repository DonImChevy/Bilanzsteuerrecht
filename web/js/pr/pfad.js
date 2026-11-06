// Lernpfad Privatrecht: Blöcke, jeder in sich geschlossen – die Lernkarten eines Blocks erklären alles,
// was seine Fragen abfragen; kein Block setzt einen anderen voraus. Reihenfolge wie die Lernlandkarte (Kapitel 1–12).
// Format wie js/ust/pfad.js. Rechtsstand 2026.

export const PFAD_PR = [
  {
    id: "pr-system", titel: "Privatrecht oder öffentliches Recht?", kurz: "BGB, HGB, AO", icon: "🏛️", normen: ["BGB 433", "HGB 1 1", "AO 39"],
    karten: [
      { art: "merksatz", titel: "Nicht wer – sondern wie", text: "**Privatrecht** = Beziehungen auf **Augenhöhe** (Kauf, Miete). **Öffentliches Recht** = der Staat handelt **hoheitlich**, im Über- und Unterordnungsverhältnis (Steuerbescheid). Kauft das Finanzamt Papier, gilt § 433 BGB wie für jeden." },
      { art: "erklaerung", titel: "Die fünf Bücher des BGB", text: "1. **Allgemeiner Teil** – gilt für alles Folgende („vor die Klammer gezogen“)\n2. **Schuldrecht** – AT (§§ 241–432) und BT mit Kauf, Miete, Delikt (§§ 433–853)\n3. **Sachenrecht** – Besitz, Eigentum\n4. **Familienrecht**\n5. **Erbrecht**" },
      { art: "erklaerung", titel: "BGB und HGB", text: "Das **HGB** ist das **Sonderprivatrecht der Kaufleute** (§ 1 HGB). Es geht dem BGB als spezielleres Gesetz vor und macht den Handelsverkehr schneller – wo es schweigt, gilt das BGB." },
      { art: "klausur", titel: "Warum Privatrecht im Steuerstudium?", text: "Steuern knüpfen an Zivilrecht an: Grundstückskauf → Grunderwerbsteuer, Mietvertrag → § 21 EStG. Steuerlich zählt aber die **wirtschaftliche** Betrachtung – z. B. wirtschaftliches Eigentum nach § 39 AO." },
    ],
    fragen: [
      { art: "wahl", frage: "Die Finanzbehörde mietet Büroräume. Welches Rechtsgebiet?", optionen: ["Privatrecht", "Öffentliches Recht", "Steuerrecht", "Strafrecht"], richtig: 0, erkl: "Die Behörde handelt wie ein Privater – Mietvertrag nach § 535 BGB." },
      { art: "wahl", frage: "Wo steht der Kaufvertrag im BGB?", optionen: ["Schuldrecht, besonderer Teil", "Allgemeiner Teil", "Sachenrecht", "Familienrecht"], richtig: 0, erkl: "§ 433 BGB – erste Norm des besonderen Schuldrechts." },
      { art: "wahl", frage: "Was gilt für einen Kaufmann, wenn das HGB zu einer Frage nichts regelt?", optionen: ["Das BGB", "Nichts – die Frage ist ungeregelt", "Die AO", "Das Grundgesetz unmittelbar"], richtig: 0, erkl: "Das HGB ergänzt das BGB nur; im Übrigen gilt das BGB." },
    ],
  },
  {
    id: "pr-anspruchsaufbau", titel: "Wer will was von wem woraus?", kurz: "§ 194 BGB · Gutachtenstil", icon: "🧭", normen: ["BGB 194 1", "BGB 362 1", "BGB 214 1"],
    karten: [
      { art: "merksatz", titel: "Der Einstieg", text: "Jede Falllösung beginnt mit der Frage: **Wer will was von wem woraus?** Das „Woraus“ ist die **Anspruchsgrundlage** – eine Norm mit Tatbestand und Rechtsfolge, z. B. § 433 Abs. 2 BGB." },
      { art: "erklaerung", titel: "Drei Stufen", text: "1. **Entstanden?** – Voraussetzungen erfüllt, keine Nichtigkeit (z. B. §§ 105, 125, 138 BGB)\n2. **Erloschen?** – z. B. Erfüllung (§ 362 BGB), Anfechtung (§ 142 BGB), Aufrechnung\n3. **Durchsetzbar?** – Einreden wie Verjährung (§ 214 BGB)" },
      { art: "klausur", titel: "Mehrere Anspruchsgrundlagen", text: "Reihenfolge: **Vertrag** → **quasivertraglich** (c. i. c., GoA) → **dinglich** (§ 985 BGB) → **Delikt** (§ 823 BGB) → **Bereicherung** (§ 812 BGB). Alle in Betracht kommenden prüfen – auch wenn schon die erste trägt." },
      { art: "erklaerung", titel: "Gutachtenstil", text: "**Obersatz** im Konjunktiv („V **könnte** … haben“) → **Definition** → **Subsumtion** (Sachverhalt unter die Definition) → **Ergebnis**. Unproblematisches darf kurz im Urteilsstil stehen." },
      { art: "beispiel", titel: "So klingt ein Obersatz", text: "„V könnte gegen K einen Anspruch auf Zahlung von 500 € aus § 433 Abs. 2 BGB haben. Dann müssten V und K einen wirksamen Kaufvertrag geschlossen haben.“" },
    ],
    fragen: [
      { art: "wahl", frage: "Wo prüfen Sie die Verjährung?", optionen: ["Anspruch durchsetzbar?", "Anspruch entstanden?", "Anspruch erloschen?", "Gar nicht – sie gilt automatisch"], richtig: 0, erkl: "Verjährung ist eine Einrede (§ 214 Abs. 1 BGB)." },
      { art: "wahl", frage: "Wo prüfen Sie die Erfüllung durch Zahlung?", optionen: ["Anspruch erloschen?", "Anspruch entstanden?", "Anspruch durchsetzbar?", "Im Obersatz"], richtig: 0, erkl: "Erfüllung ist eine rechtsvernichtende Einwendung (§ 362 BGB)." },
      { art: "wahl", frage: "Welche Anspruchsgrundlage prüfen Sie zuerst?", optionen: ["§ 433 Abs. 2 BGB (Vertrag)", "§ 985 BGB (dinglich)", "§ 823 Abs. 1 BGB (Delikt)", "§ 812 BGB (Bereicherung)"], richtig: 0, erkl: "Vertragliche Ansprüche zuerst – sie können die gesetzlichen beeinflussen." },
      { art: "wahl", frage: "Welcher Satz ist im Gutachtenstil geschrieben?", optionen: ["„K könnte einen Anspruch aus § 433 Abs. 2 BGB haben.“", "„K hat einen Anspruch, weil …“", "„Der Anspruch besteht.“", "„Es ist klar, dass K zahlen muss.“"], richtig: 0, erkl: "Gutachtenstil: offene Frage im Konjunktiv, Ergebnis erst am Ende." },
    ],
  },
  {
    id: "pr-freiheit", titel: "Privatautonomie und ihre Grenzen", kurz: "§§ 134, 138, 125 BGB", icon: "🗽", normen: ["BGB 134", "BGB 138 1", "BGB 125", "BGB 311b 1"],
    karten: [
      { art: "merksatz", titel: "Freiheit ist die Regel", text: "Jeder darf seine Rechtsverhältnisse **selbst gestalten** (Art. 2 Abs. 1 GG): **ob** und **mit wem** er einen Vertrag schließt, **was** drinsteht und in welcher **Form**." },
      { art: "erklaerung", titel: "Die Grenzen", text: "• **Abschluss:** Kontrahierungszwang (Grundversorger muss Strom liefern)\n• **Inhalt:** Verbotsgesetz (§ 134 BGB), Sittenwidrigkeit und Wucher (§ 138 BGB)\n• **Form:** z. B. Grundstückskauf beim Notar (§ 311b Abs. 1 BGB) – sonst nichtig (§ 125 BGB)" },
      { art: "beispiel", titel: "Drei Fälle", text: "• Pfandleiher nimmt einem Spielsüchtigen 25 % Zinsen im Monat ab → nichtig, § 138 Abs. 2 BGB\n• Wiese per Brief verkauft → nichtig, §§ 311b, 125 BGB\n• Malerarbeiten „ohne Rechnung“ → nichtig, § 134 BGB" },
    ],
    fragen: [
      { art: "wahl", frage: "Zwei Nachbarn verkaufen ein Grundstück mündlich. Folge?", optionen: ["Nichtig wegen Formmangels", "Wirksam – Formfreiheit", "Anfechtbar", "Schwebend unwirksam bis zur Zahlung"], richtig: 0, erkl: "§ 311b Abs. 1 S. 1 BGB i. V. m. § 125 S. 1 BGB." },
      { art: "wahl", frage: "Welche Grenze betrifft den Kontrahierungszwang?", optionen: ["Abschlussfreiheit", "Formfreiheit", "Testierfreiheit", "Eigentumsfreiheit"], richtig: 0, erkl: "Wer abschließen muss, ist nicht frei im „Ob“." },
      { art: "wahl", frage: "Was gilt grundsätzlich für die Form von Verträgen?", optionen: ["Sie sind formfrei", "Sie müssen schriftlich sein", "Sie müssen notariell sein", "Sie brauchen Zeugen"], richtig: 0, erkl: "Formzwang ist die Ausnahme." },
    ],
  },
  {
    id: "pr-personen", titel: "Wer kann Rechte haben?", kurz: "§§ 1, 21, 705 BGB · GmbHG", icon: "👤", normen: ["BGB 1", "BGB 21", "BGB 705 2", "GmbHG 11 1"],
    karten: [
      { art: "merksatz", titel: "Rechtsfähigkeit", text: "Rechtsfähig ist, wer **Träger von Rechten und Pflichten** sein kann – jeder Mensch ab **Vollendung der Geburt** (§ 1 BGB). Tiere nicht (§ 90a BGB)." },
      { art: "erklaerung", titel: "Juristische Personen", text: "Organisationen, denen das Gesetz Rechtsfähigkeit verleiht: **e. V.** (§ 21 BGB), **GmbH**, AG, Gemeinden. Sie handeln durch **Organe** (Vorstand, Geschäftsführer) und haften mit eigenem Vermögen." },
      { art: "erklaerung", titel: "Personengesellschaften", text: "**GbR** (§ 705 Abs. 2 BGB), **oHG**, **KG** sind rechtsfähig, aber **keine** juristischen Personen – die Gesellschafter **haften persönlich** (§ 721 BGB, § 126 HGB)." },
      { art: "beispiel", titel: "Die GmbH entsteht", text: "Notarvertrag → **Vor-GmbH** → **Eintragung ins Handelsregister** = Geburt der GmbH (§ 11 Abs. 1 GmbHG). Wer vorher in ihrem Namen kauft, haftet persönlich (§ 11 Abs. 2 GmbHG)." },
    ],
    fragen: [
      { art: "wahl", frage: "Kann ein Baby Eigentümer eines Hauses sein?", optionen: ["Ja – es ist rechtsfähig", "Nein – erst ab 7 Jahren", "Nein – erst ab 18 Jahren", "Nur mit Genehmigung des Gerichts"], richtig: 0, erkl: "Rechtsfähig ab Geburt (§ 1 BGB); handeln müssen die Eltern." },
      { art: "wahl", frage: "Ab wann besteht die GmbH als juristische Person?", optionen: ["Mit der Eintragung im Handelsregister", "Mit dem Gründungsentschluss", "Mit der notariellen Beurkundung", "Mit der ersten Rechnung"], richtig: 0, erkl: "§ 11 Abs. 1 GmbHG – die Eintragung ist konstitutiv." },
      { art: "wahl", frage: "Wer haftet für Schulden einer oHG?", optionen: ["Die oHG und alle Gesellschafter persönlich", "Nur die oHG", "Nur der Geschäftsführer", "Niemand"], richtig: 0, erkl: "Persönliche Haftung der Gesellschafter (§ 126 HGB)." },
    ],
  },
  {
    id: "pr-sachen-arten", titel: "Sachen, Bestandteile, Zubehör", kurz: "§§ 90–97 BGB", icon: "📦", normen: ["BGB 90", "BGB 93", "BGB 94 1", "BGB 95 1", "BGB 97 1"],
    karten: [
      { art: "merksatz", titel: "Was ist eine Sache?", text: "Sachen sind nur **körperliche Gegenstände** (§ 90 BGB). Forderungen und Rechte sind keine Sachen." },
      { art: "erklaerung", titel: "Wesentliche Bestandteile", text: "Teile, die man nicht trennen kann, ohne etwas zu zerstören (§ 93 BGB) – sie teilen **zwingend** das rechtliche Schicksal der Hauptsache. Beim Grundstück: **Gebäude** und fest verbundene Sachen, beim Gebäude die zur Herstellung eingefügten Teile wie Heizung oder Fenster (§ 94 BGB)." },
      { art: "erklaerung", titel: "Schein und Zubehör", text: "• **Scheinbestandteil** (§ 95 BGB): nur **vorübergehend** verbunden – Baucontainer, Gartenhaus des Mieters.\n• **Zubehör** (§ 97 BGB): bewegliche Sache, die der Hauptsache **dient** – Maschinen im Betrieb; bleibt selbständig, wird aber im Zweifel mitverkauft (§ 311c BGB)." },
    ],
    fragen: [
      { art: "wahl", frage: "Die beim Bau eingebaute Heizung ist …", optionen: ["wesentlicher Bestandteil", "Zubehör", "Scheinbestandteil", "keine Sache"], richtig: 0, erkl: "Zur Herstellung eingefügt (§ 94 Abs. 2 BGB)." },
      { art: "wahl", frage: "Der Baucontainer, der für die Bauzeit auf dem Grundstück steht, ist …", optionen: ["Scheinbestandteil", "wesentlicher Bestandteil", "Zubehör", "Teil des Grundbuchs"], richtig: 0, erkl: "Vorübergehender Zweck (§ 95 Abs. 1 BGB)." },
      { art: "wahl", frage: "Eine Kaufpreisforderung ist …", optionen: ["keine Sache, sondern ein Recht", "eine bewegliche Sache", "eine vertretbare Sache", "Zubehör"], richtig: 0, erkl: "Nicht körperlich (§ 90 BGB)." },
    ],
  },
  {
    id: "pr-minderjaehrige", titel: "Minderjährige im Rechtsverkehr", kurz: "§§ 104–113 BGB", icon: "🧒", normen: ["BGB 104", "BGB 106", "BGB 107", "BGB 108 1", "BGB 110"],
    karten: [
      { art: "merksatz", titel: "Drei Altersstufen", text: "• **unter 7:** geschäftsunfähig – Erklärungen nichtig (§§ 104, 105 BGB)\n• **7 bis 17:** beschränkt geschäftsfähig (§ 106 BGB)\n• **ab 18:** voll geschäftsfähig (§ 2 BGB)" },
      { art: "erklaerung", titel: "Vollrausch", text: "Auch ein Erwachsener gibt keine wirksame Erklärung ab, wenn er **bewusstlos** oder seine Geistestätigkeit **vorübergehend gestört** ist – etwa im Vollrausch (§ 105 Abs. 2 BGB). Er bleibt geschäftsfähig; nichtig ist nur diese eine Erklärung." },
      { art: "erklaerung", titel: "Zustimmung nötig?", text: "Ein Minderjähriger braucht die **Einwilligung** (vorher) seiner Eltern, wenn das Geschäft **nicht lediglich rechtlich vorteilhaft** ist (§ 107 BGB). Fehlt sie, ist ein Vertrag **schwebend unwirksam** – bis die Eltern **genehmigen** (nachträglich, § 108 BGB)." },
      { art: "erklaerung", titel: "Taschengeld", text: "Zahlt der Minderjährige **vollständig** mit Geld, das ihm dafür oder zur freien Verfügung überlassen wurde, ist der Vertrag wirksam (§ 110 BGB). Ratenkäufe erst mit der letzten Rate." },
      { art: "klausur", titel: "Achtung Falle", text: "Jeder **Kaufvertrag** ist rechtlich nachteilig – er verpflichtet zur Zahlung, auch wenn er ein Schnäppchen ist. Ein **Geschenk** anzunehmen ist dagegen lediglich vorteilhaft." },
    ],
    fragen: [
      { art: "wahl", frage: "Die 6-jährige Ella kauft mit Taschengeld ein Eis. Wirksam?", optionen: ["Nein – nichtig, sie ist geschäftsunfähig", "Ja – § 110 BGB", "Schwebend unwirksam", "Ja, weil das Eis billig ist"], richtig: 0, erkl: "Unter 7 Jahren nichtig (§ 104 Nr. 1 BGB, § 105 Abs. 1 BGB)." },
      { art: "wahl", frage: "Der 15-jährige Jan kauft ohne Wissen der Eltern ein Handy auf Raten. Folge?", optionen: ["Schwebend unwirksam bis zur Genehmigung", "Wirksam nach § 110 BGB", "Sofort nichtig", "Wirksam, weil er über 14 ist"], richtig: 0, erkl: "Nicht lediglich vorteilhaft, § 110 BGB greift nicht (Raten) → § 108 Abs. 1 BGB." },
      { art: "wahl", frage: "Die 25-jährige Jana bestellt im Vollrausch, ohne zu wissen, was sie tut, ein teures Kleid. Wirksam?", optionen: ["Nein – nichtig nach § 105 Abs. 2 BGB", "Ja – sie ist volljährig", "Schwebend unwirksam", "Nur anfechtbar"], richtig: 0, erkl: "Vorübergehende Störung der Geistestätigkeit – die Erklärung ist nichtig, obwohl Jana geschäftsfähig ist." },
      { art: "wahl", frage: "Die 12-jährige Pia bekommt ein Fahrrad geschenkt. Brauchen die Eltern zuzustimmen?", optionen: ["Nein – lediglich rechtlich vorteilhaft", "Ja, immer", "Nur bei Fahrrädern über 100 €", "Ja, weil sie unter 14 ist"], richtig: 0, erkl: "§ 107 BGB – kein rechtlicher Nachteil." },
      { art: "wahl", frage: "Ein 17-Jähriger kauft ohne Zustimmung einen Roller und wird dann 18. Ist der Vertrag jetzt wirksam?", optionen: ["Erst wenn er ihn selbst genehmigt", "Ja, automatisch", "Nein, er bleibt immer nichtig", "Nur wenn die Eltern noch zustimmen"], richtig: 0, erkl: "§ 108 Abs. 3 BGB – seine Genehmigung ersetzt die der Eltern." },
    ],
  },
  {
    id: "pr-erklaerung", titel: "Die Willenserklärung", kurz: "§§ 130, 133, 157 BGB", icon: "💬", normen: ["BGB 130 1", "BGB 133", "BGB 157"],
    karten: [
      { art: "merksatz", titel: "Außen und innen", text: "**Außen:** ein Verhalten, das erkennbar auf eine Rechtsfolge zielt – ausdrücklich oder **konkludent** (Ware aufs Kassenband).\n**Innen:** **Handlungswille** (bewusst handeln), **Erklärungsbewusstsein** (etwas rechtlich Erhebliches erklären), **Geschäftswille** (genau diese Rechtsfolge)." },
      { art: "erklaerung", titel: "Auslegung", text: "Wie durfte ein **verständiger Empfänger** die Erklärung verstehen? (§§ 133, 157 BGB – objektiver Empfängerhorizont)" },
      { art: "erklaerung", titel: "Zugang", text: "Eine Erklärung unter Abwesenden wird wirksam, wenn sie in den **Machtbereich** des Empfängers gelangt und er sie **unter normalen Umständen** lesen kann (§ 130 Abs. 1 BGB). Ob er sie wirklich liest, ist egal. Ein Widerruf muss **vorher oder gleichzeitig** ankommen." },
      { art: "beispiel", titel: "Kein Angebot", text: "Schaufenster, Prospekt, Inserat: **invitatio ad offerendum** – nur die Aufforderung, selbst ein Angebot abzugeben. Dem Anbieter fehlt der Rechtsbindungswille." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Brief wird sonntags in den Briefkasten eines Büros geworfen. Wann geht er zu?", optionen: ["Am Montag zu Geschäftsbeginn", "Am Sonntag", "Wenn er gelesen wird", "Nie – sonntags gibt es keinen Zugang"], richtig: 0, erkl: "Maßgeblich ist, wann unter normalen Umständen Kenntnisnahme zu erwarten ist." },
      { art: "wahl", frage: "Was fehlt jemandem, der durch einen Stoß auf einen Bestellknopf fällt?", optionen: ["Handlungswille", "Geschäftswille", "Geschäftsfähigkeit", "Nichts – er hat bestellt"], richtig: 0, erkl: "Ohne bewusstes Handeln keine Willenserklärung." },
      { art: "wahl", frage: "Ist das Preisschild im Schaufenster ein Angebot?", optionen: ["Nein, eine invitatio ad offerendum", "Ja, an jedermann", "Ja, aber nur an Stammkunden", "Nur bei Rabattaktionen"], richtig: 0, erkl: "Kein Rechtsbindungswille gegenüber jedermann." },
    ],
  },
  {
    id: "pr-trennung", titel: "Trennung und Abstraktion", kurz: "§§ 433, 929 BGB", icon: "🧾", normen: ["BGB 433 1", "BGB 929", "BGB 812 1"],
    karten: [
      { art: "merksatz", titel: "Zwei Ebenen", text: "**Verpflichtung** (Kaufvertrag, § 433 BGB): Ich **muss** dir die Sache übereignen.\n**Verfügung** (Übereignung, § 929 BGB): Die Sache **gehört** jetzt dir.\nDas sind **getrennte** Rechtsgeschäfte (Trennungsprinzip)." },
      { art: "erklaerung", titel: "Abstraktionsprinzip", text: "Die Geschäfte sind in ihrer Wirksamkeit **unabhängig**. Ist der Kaufvertrag nichtig, bleibt die Übereignung wirksam – zurückgeholt wird über die Bereicherung (§ 812 BGB)." },
      { art: "beispiel", titel: "Einkauf am Marktstand", text: "Drei Rechtsgeschäfte: Kaufvertrag, Übereignung der Äpfel, Übereignung des Geldes – mit **sechs** Willenserklärungen." },
    ],
    fragen: [
      { art: "wahl", frage: "Wird der Käufer mit dem Kaufvertrag Eigentümer?", optionen: ["Nein, er hat nur einen Anspruch auf Übereignung", "Ja, sofort", "Ja, wenn er bar zahlt", "Nur bei Grundstücken"], richtig: 0, erkl: "§ 433 Abs. 1 S. 1 BGB begründet nur die Pflicht – übereignet wird nach § 929 BGB." },
      { art: "wahl", frage: "Wie viele Willenserklärungen hat ein Barkauf im Laden?", optionen: ["Sechs", "Zwei", "Drei", "Vier"], richtig: 0, erkl: "Drei Rechtsgeschäfte mit je zwei Erklärungen." },
      { art: "wahl", frage: "Der Kaufvertrag ist nichtig, die Übereignung wirksam. Wie bekommt der Verkäufer die Sache zurück?", optionen: ["Über die Bereicherung (§ 812 BGB)", "Mit § 985 BGB – er ist noch Eigentümer", "Gar nicht", "Durch Anfechtung der Übergabe"], richtig: 0, erkl: "Der Käufer ist Eigentümer geworden – aber ohne Rechtsgrund." },
    ],
  },
  {
    id: "pr-vertrag", titel: "Wie ein Vertrag entsteht", kurz: "§§ 145–150 BGB", icon: "🤝", normen: ["BGB 145", "BGB 146", "BGB 147 1", "BGB 150 2"],
    karten: [
      { art: "merksatz", titel: "Angebot + Annahme", text: "Ein Vertrag entsteht aus **zwei übereinstimmenden Willenserklärungen**. Das **Angebot** enthält alles Wesentliche (beim Kauf: Sache, Preis, Parteien), sodass ein einfaches **„Ja“** genügt." },
      { art: "erklaerung", titel: "Wie lange gilt ein Angebot?", text: "• Unter Anwesenden (auch Telefon): **sofort** (§ 147 Abs. 1 BGB)\n• Unter Abwesenden: so lange, wie normalerweise mit einer Antwort zu rechnen ist (§ 147 Abs. 2 BGB)\n• Abgelehnt oder zu spät → erloschen (§ 146 BGB)" },
      { art: "erklaerung", titel: "Ja, aber …", text: "Wer mit **Änderungen** annimmt, lehnt ab und macht ein **neues Angebot** (§ 150 Abs. 2 BGB). Auch eine **verspätete** Annahme ist ein neues Angebot (§ 150 Abs. 1 BGB)." },
    ],
    fragen: [
      { art: "wahl", frage: "V bietet sein Rad für 300 € an, K sagt: „Für 250 € nehme ich es.“ Rechtslage?", optionen: ["Ablehnung und neues Angebot des K", "Vertrag über 250 €", "Vertrag über 300 €", "Vertrag über 275 €"], richtig: 0, erkl: "§ 150 Abs. 2 BGB." },
      { art: "wahl", frage: "Ein Angebot am Telefon kann angenommen werden …", optionen: ["nur sofort", "innerhalb einer Woche", "bis zum Monatsende", "jederzeit"], richtig: 0, erkl: "§ 147 Abs. 1 S. 2 BGB – Telefon gilt als unter Anwesenden." },
      { art: "wahl", frage: "Welche Bestandteile braucht das Angebot beim Kauf mindestens?", optionen: ["Kaufsache, Preis, Vertragsparteien", "Nur den Preis", "Lieferdatum und Garantie", "Unterschrift beider Parteien"], richtig: 0, erkl: "Die essentialia negotii." },
    ],
  },
  {
    id: "pr-irrtum", titel: "Anfechtung", kurz: "§§ 119–124, 142 BGB", icon: "↩️", normen: ["BGB 119 1", "BGB 119 2", "BGB 123 1", "BGB 142 1"],
    karten: [
      { art: "merksatz", titel: "Rückwirkend nichtig", text: "Eine wirksam angefochtene Erklärung ist **von Anfang an nichtig** (§ 142 Abs. 1 BGB)." },
      { art: "erklaerung", titel: "Die Gründe", text: "• **Inhaltsirrtum:** falsche Vorstellung von der Bedeutung (§ 119 Abs. 1 Var. 1 BGB)\n• **Erklärungsirrtum:** verschrieben, vertippt (Var. 2)\n• **Eigenschaftsirrtum:** Echtheit, Alter einer Sache (§ 119 Abs. 2 BGB)\n• **Täuschung, Drohung** (§ 123 BGB)\n**Kein** Grund: Motivirrtum (falsche Erwartungen)." },
      { art: "erklaerung", titel: "Erklärung und Frist", text: "Anfechtung durch **Erklärung** gegenüber dem Vertragspartner (§ 143 BGB). Frist: bei Irrtum **unverzüglich** (§ 121 BGB), bei Täuschung oder Drohung **ein Jahr** (§ 124 BGB). Bei Irrtum schuldet man den **Vertrauensschaden** (§ 122 BGB)." },
    ],
    fragen: [
      { art: "wahl", frage: "Händlerin tippt 150 € statt 1.500 €. Anfechtungsgrund?", optionen: ["Erklärungsirrtum", "Inhaltsirrtum", "Motivirrtum", "Keiner"], richtig: 0, erkl: "§ 119 Abs. 1 Var. 2 BGB." },
      { art: "wahl", frage: "K kauft ein Bild, das er für echt hält; es ist eine Kopie. Anfechtungsgrund?", optionen: ["Eigenschaftsirrtum", "Erklärungsirrtum", "Motivirrtum", "Keiner – Pech gehabt"], richtig: 0, erkl: "Echtheit ist verkehrswesentlich (§ 119 Abs. 2 BGB)." },
      { art: "wahl", frage: "Welche Frist gilt bei arglistiger Täuschung?", optionen: ["Ein Jahr ab Entdeckung", "Unverzüglich", "Zwei Wochen", "Drei Jahre ab Vertragsschluss"], richtig: 0, erkl: "§ 124 Abs. 1, 2 BGB." },
    ],
  },
  {
    id: "pr-vertreter", titel: "Stellvertretung", kurz: "§§ 164–181 BGB", icon: "🧑‍💼", normen: ["BGB 164 1", "BGB 165", "BGB 167 1", "BGB 177 1"],
    karten: [
      { art: "merksatz", titel: "Vier Voraussetzungen", text: "1. Stellvertretung **zulässig** (nicht höchstpersönlich)\n2. **eigene** Willenserklärung des Vertreters\n3. **im Namen** des Vertretenen\n4. mit **Vertretungsmacht**\n→ Die Erklärung wirkt direkt für und gegen den Vertretenen (§ 164 Abs. 1 BGB)." },
      { art: "erklaerung", titel: "Bote oder Vertreter?", text: "Der **Bote** überbringt eine **fremde** fertige Erklärung. Der **Vertreter** entscheidet selbst mit – er sucht aus, verhandelt, wählt den Partner. Ein Bote kann sogar ein Kind sein; ein Vertreter muss mindestens beschränkt geschäftsfähig sein (§ 165 BGB)." },
      { art: "erklaerung", titel: "Minderjährige Vertreter", text: "Ein **17-Jähriger** kann wirksam vertreten (§ 165 BGB) – er selbst wird ja nicht verpflichtet. Ein **6-Jähriger** nicht: Seine Erklärung ist nichtig (§ 105 BGB)." },
      { art: "klausur", titel: "Ohne Vertretungsmacht", text: "Vertrag **schwebend unwirksam** – der Vertretene kann **genehmigen** (§ 177 BGB). Tut er es nicht, haftet der Vertreter (§ 179 BGB)." },
    ],
    fragen: [
      { art: "wahl", frage: "Der 17-jährige Noah kauft im Auftrag seines Großvaters ein Tablet. Hindert sein Alter die Vertretung?", optionen: ["Nein – § 165 BGB", "Ja – er braucht die Zustimmung seiner Eltern", "Ja – Vertreter müssen volljährig sein", "Nur bei Käufen über 500 €"], richtig: 0, erkl: "Beschränkte Geschäftsfähigkeit genügt (§ 165 BGB)." },
      { art: "wahl", frage: "Ein Azubi gibt einen verschlossenen Bestellbrief beim Lieferanten ab. Er ist …", optionen: ["Bote", "Vertreter", "Vertreter ohne Vertretungsmacht", "Vertragspartner"], richtig: 0, erkl: "Keine eigene Entscheidung – nur Übermittlung." },
      { art: "wahl", frage: "Wie wird eine Vollmacht erteilt?", optionen: ["Durch Erklärung gegenüber dem Vertreter oder dem Dritten (§ 167 BGB)", "Nur notariell", "Nur schriftlich", "Durch Eintragung im Handelsregister"], richtig: 0, erkl: "Grundsätzlich formfrei (§ 167 Abs. 2 BGB)." },
    ],
  },
  {
    id: "pr-schuld", titel: "Das Schuldverhältnis", kurz: "§§ 241, 362, 387 BGB", icon: "🔗", normen: ["BGB 241 1", "BGB 362 1", "BGB 387", "BGB 314 1"],
    karten: [
      { art: "merksatz", titel: "Gläubiger und Schuldner", text: "Kraft eines Schuldverhältnisses kann der **Gläubiger** vom **Schuldner** eine **Leistung** fordern (§ 241 Abs. 1 BGB). Es entsteht durch **Vertrag** oder kraft **Gesetzes** (z. B. unerlaubte Handlung)." },
      { art: "erklaerung", titel: "Ziel oder Dauer", text: "• **Zielschuld:** einmaliger Austausch – Kauf, Werkvertrag. Endet durch **Erfüllung** (§ 362 BGB).\n• **Dauerschuld:** Leistung über Zeit – Miete, Arbeitsvertrag. Endet durch **Zeitablauf** (befristet) oder **Kündigung**; aus wichtigem Grund jederzeit (§ 314 BGB)." },
      { art: "erklaerung", titel: "Erlöschen", text: "• **Erfüllung:** geschuldete Leistung bewirkt (§ 362 BGB)\n• **Aufrechnung:** gleichartige gegenseitige Forderungen verrechnen (§§ 387–389 BGB)\n• **Erlass:** Vertrag über den Verzicht (§ 397 BGB)" },
    ],
    fragen: [
      { art: "wahl", frage: "Der Mietvertrag ist ein …", optionen: ["Dauerschuldverhältnis", "Zielschuldverhältnis", "gesetzliches Schuldverhältnis", "Verfügungsgeschäft"], richtig: 0, erkl: "Die Leistung (Gebrauchsüberlassung) erstreckt sich über einen Zeitraum." },
      { art: "wahl", frage: "Wie endet ein Kaufvertrag ordentlich?", optionen: ["Durch Erfüllung", "Durch ordentliche Kündigung", "Durch Zeitablauf", "Durch Verjährung"], richtig: 0, erkl: "§ 362 Abs. 1 BGB." },
      { art: "wahl", frage: "A schuldet B 500 €, B schuldet A 300 €. A rechnet auf. Ergebnis?", optionen: ["A schuldet noch 200 €", "Beide Forderungen erlöschen ganz", "B schuldet noch 200 €", "Nichts ändert sich"], richtig: 0, erkl: "Erlöschen, soweit sich die Forderungen decken (§ 389 BGB)." },
    ],
  },
  {
    id: "pr-delikt", titel: "Schadensersatz ohne Vertrag", kurz: "§§ 823, 828, 249 BGB", icon: "🚲", normen: ["BGB 823 1", "BGB 828 3", "BGB 249 1", "BGB 985"],
    karten: [
      { art: "merksatz", titel: "§ 823 Abs. 1 BGB", text: "Wer **vorsätzlich oder fahrlässig** Leben, Körper, Gesundheit, Freiheit, **Eigentum** oder ein sonstiges Recht eines anderen **widerrechtlich** verletzt, muss den **Schaden** ersetzen." },
      { art: "erklaerung", titel: "Prüfung", text: "Rechtsgut verletzt → Handlung → Kausalität → Rechtswidrigkeit (indiziert) → **Verschulden** mit Deliktsfähigkeit (§ 828 BGB) → Schaden → Ersatz nach §§ 249 ff. BGB." },
      { art: "erklaerung", titel: "Alter des Schädigers", text: "• unter 7: nie verantwortlich\n• 7 bis 9: nicht bei Unfällen mit Kfz oder Bahn (außer Vorsatz)\n• bis 17: verantwortlich, wenn er die nötige **Einsicht** hatte (§ 828 Abs. 3 BGB)" },
      { art: "klausur", titel: "Rausch", text: "Im Vollrausch geschlossene Verträge sind **nichtig** (§ 105 Abs. 2 BGB). Schäden im **selbstverschuldeten** Rausch muss man aber ersetzen – als hätte man fahrlässig gehandelt (§ 827 S. 2 BGB)." },
      { art: "beispiel", titel: "Und wenn der Vertrag nichtig ist?", text: "Geleistetes zurück über die **Bereicherung** (§ 812 BGB); ist man noch Eigentümer, Herausgabe nach **§ 985 BGB** vom Besitzer." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein 16-Jähriger fährt mit dem Rad bei Rot über die Ampel und beschädigt eine Jacke. Haftet er?", optionen: ["Ja, wenn er die nötige Einsicht hatte", "Nein, Minderjährige haften nie", "Nur seine Eltern", "Nur bei Vorsatz"], richtig: 0, erkl: "§ 828 Abs. 3 BGB." },
      { art: "wahl", frage: "Ein Erwachsener tritt im selbst angetrunkenen Vollrausch eine Scheibe ein. Haftet er?", optionen: ["Ja – wie bei Fahrlässigkeit (§ 827 S. 2 BGB)", "Nein – er war nicht bei Sinnen", "Nur wenn er sich erinnert", "Nur seine Eltern"], richtig: 0, erkl: "Das Verschulden liegt im Sich-Betrinken." },
      { art: "wahl", frage: "Ist das bloße Vermögen durch § 823 Abs. 1 BGB geschützt?", optionen: ["Nein", "Ja, als sonstiges Recht", "Ja, als Eigentum", "Nur bei Unternehmen"], richtig: 0, erkl: "Reine Vermögensschäden nur über § 823 Abs. 2 oder § 826 BGB." },
      { art: "wahl", frage: "Was verlangt der Eigentümer vom Besitzer ohne Besitzrecht?", optionen: ["Herausgabe nach § 985 BGB", "Kaufpreis nach § 433 BGB", "Miete nach § 535 BGB", "Nichts"], richtig: 0, erkl: "Vindikation – § 985 BGB." },
    ],
  },
  {
    id: "pr-verjaehrt", titel: "Verjährung", kurz: "§§ 195, 199, 212, 214 BGB", icon: "⌛", normen: ["BGB 195", "BGB 199 1", "BGB 212 1", "BGB 214 1"],
    karten: [
      { art: "merksatz", titel: "Drei Jahre zum Jahresende", text: "Die regelmäßige Frist beträgt **drei Jahre** (§ 195 BGB) und beginnt mit dem **Schluss des Jahres**, in dem der Anspruch entstanden ist und der Gläubiger davon weiß (§ 199 Abs. 1 BGB)." },
      { art: "erklaerung", titel: "Wirkung", text: "Der Schuldner darf die Leistung **verweigern** (§ 214 Abs. 1 BGB) – der Anspruch erlischt nicht. Wer trotzdem zahlt, kann nicht zurückfordern." },
      { art: "erklaerung", titel: "Hemmung und Neubeginn", text: "• **Hemmung:** Uhr steht still – Verhandlungen, Klage, **Mahnbescheid** (§§ 203, 204 BGB)\n• **Neubeginn:** Uhr startet neu – **Anerkenntnis** durch Abschlag oder Zinsen (§ 212 BGB)\nEine einfache Mahnung bewirkt nichts." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Anspruch entsteht am 10.04.2026. Wann verjährt er regelmäßig?", optionen: ["Mit Ablauf des 31.12.2029", "Am 10.04.2029", "Mit Ablauf des 31.12.2028", "Am 10.04.2036"], richtig: 0, erkl: "Beginn 31.12.2026, plus drei Jahre." },
      { art: "wahl", frage: "Der Schuldner zahlt eine Abschlagsrate. Folge?", optionen: ["Die Verjährung beginnt neu", "Die Verjährung ist gehemmt", "Der Anspruch erlischt", "Keine"], richtig: 0, erkl: "Anerkenntnis → Neubeginn (§ 212 Abs. 1 Nr. 1 BGB)." },
      { art: "wahl", frage: "Was bewirkt der Eintritt der Verjährung?", optionen: ["Ein Leistungsverweigerungsrecht", "Das Erlöschen des Anspruchs", "Die Nichtigkeit des Vertrags", "Eine Strafe für den Gläubiger"], richtig: 0, erkl: "§ 214 Abs. 1 BGB – Einrede." },
    ],
  },
  {
    id: "pr-kaufrecht", titel: "Kauf und Mängel", kurz: "§§ 433–441 BGB", icon: "🛒", normen: ["BGB 433 1", "BGB 433 2", "BGB 437", "BGB 439 1"],
    karten: [
      { art: "merksatz", titel: "Pflichten", text: "**Verkäufer:** Übergabe und Eigentum an einer **mangelfreien** Sache (§ 433 Abs. 1 BGB).\n**Käufer:** Kaufpreis zahlen und Sache abnehmen (§ 433 Abs. 2 BGB)." },
      { art: "erklaerung", titel: "Rechte bei Mängeln (§ 437 BGB)", text: "1. **Nacherfüllung** – Reparatur oder neue Sache, **der Käufer wählt** (§ 439 BGB)\n2. Nach erfolgloser Frist: **Rücktritt** oder **Minderung**\n3. **Schadensersatz**, wenn der Verkäufer den Mangel zu vertreten hat\nVerjährung: zwei Jahre ab Ablieferung (§ 438 BGB)." },
      { art: "erklaerung", titel: "Eigentumsvorbehalt", text: "Der Verkäufer übereignet unter der **Bedingung** vollständiger Zahlung (§ 449 BGB) – der Käufer hat die Sache, Eigentümer wird er erst mit der letzten Rate." },
    ],
    fragen: [
      { art: "wahl", frage: "Der neue Laptop ist nach einem Monat defekt. Was verlangt der Käufer zuerst?", optionen: ["Nacherfüllung", "Sofort Rücktritt", "Sofort Minderung", "Nichts – Pech"], richtig: 0, erkl: "Vorrang der Nacherfüllung (§ 439 BGB)." },
      { art: "wahl", frage: "Wer wählt zwischen Reparatur und Neulieferung?", optionen: ["Der Käufer", "Der Verkäufer", "Der Hersteller", "Das Gericht"], richtig: 0, erkl: "§ 439 Abs. 1 BGB." },
      { art: "wahl", frage: "Wann wird der Käufer beim Eigentumsvorbehalt Eigentümer?", optionen: ["Mit vollständiger Zahlung", "Bei Übergabe", "Bei Vertragsschluss", "Nie"], richtig: 0, erkl: "Aufschiebende Bedingung (§ 449 Abs. 1 BGB)." },
    ],
  },
  {
    id: "pr-eigentum", titel: "Besitz und Eigentum", kurz: "§§ 854, 929, 932, 925 BGB", icon: "🏠", normen: ["BGB 854 1", "BGB 929", "BGB 932 1", "BGB 935 1", "BGB 925 1"],
    karten: [
      { art: "merksatz", titel: "Haben und Gehören", text: "**Besitz** = tatsächliche Gewalt (§ 854 BGB) – der Mieter hat die Wohnung. **Eigentum** = rechtliche Herrschaft (§ 903 BGB) – sie **gehört** dem Vermieter." },
      { art: "erklaerung", titel: "Übereignung", text: "Bewegliche Sachen: **Einigung + Übergabe** (§ 929 S. 1 BGB).\nGrundstücke: **Auflassung** vor dem Notar (§ 925 BGB) **+ Eintragung** im Grundbuch (§ 873 BGB); der Kaufvertrag muss beurkundet sein (§ 311b BGB)." },
      { art: "erklaerung", titel: "Gutgläubiger Erwerb", text: "Vom Nichteigentümer kann man erwerben, wenn man gutgläubig ist (§ 932 BGB) – **außer** die Sache ist **gestohlen oder verloren** (abhanden gekommen, § 935 BGB). Verliehene Sachen sind nicht abhanden gekommen." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Dieb verkauft ein gestohlenes Handy an einen gutgläubigen Käufer. Wird der Käufer Eigentümer?", optionen: ["Nein – abhanden gekommen", "Ja – er war gutgläubig", "Ja, wenn er bar zahlt", "Nur nach einem Jahr"], richtig: 0, erkl: "§ 935 Abs. 1 BGB." },
      { art: "wahl", frage: "Wann wird der Käufer eines Grundstücks Eigentümer?", optionen: ["Mit der Eintragung im Grundbuch", "Mit dem Notartermin", "Mit der Kaufpreiszahlung", "Mit der Schlüsselübergabe"], richtig: 0, erkl: "§ 873 Abs. 1 BGB." },
      { art: "wahl", frage: "Die Verkäuferin hinter der Ladentheke ist …", optionen: ["Besitzdienerin", "Eigentümerin der Ware", "unmittelbare Besitzerin", "mittelbare Besitzerin"], richtig: 0, erkl: "§ 855 BGB – Besitzer ist der Ladeninhaber." },
    ],
  },
];
