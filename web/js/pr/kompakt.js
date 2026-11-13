// Kompaktwissen Privatrecht (GS I, Kapitel 1–12 bis zur Klausur, Rechtsstand 2026) – eigene Zusammenfassungen, kein Skripttext.
// Felder: satz, zahlen [[Wert, Bedeutung]], punkte, schema, fallen. **fett**; Normzitate werden in der App antippbar.

export const KOMPAKT_PR = {
  "pr-grundlagen": {
    satz: "Privatrecht regelt Beziehungen auf **Augenhöhe**, öffentliches Recht das **Über- und Unterordnungsverhältnis** zum Staat – entscheidend ist nicht, wer handelt, sondern wie.",
    zahlen: [["5", "Bücher des BGB"], ["§§ 1–240 BGB", "Allgemeiner Teil"], ["§§ 241–853 BGB", "Schuldrecht (AT bis § 432 BGB, BT ab § 433 BGB)"], ["1900", "BGB in Kraft (1. Januar)"]],
    punkte: [
      "**Sonderrechtstheorie (modifizierte Subjektstheorie):** Öffentlich-rechtlich ist eine Norm, die ausschließlich einen Hoheitsträger **gerade als solchen** berechtigt oder verpflichtet. Kauft das Finanzamt Papier, gilt § 433 BGB wie für jeden – Privatrecht. Erlässt es einen Steuerbescheid, handelt es hoheitlich.",
      "**Folgen der Zuordnung:** anwendbare Normen (Verjährung §§ 194 ff. BGB oder Zahlungsverjährung §§ 228 ff. AO – nicht mischbar) und **Rechtsweg** (Amts-/Landgericht oder Verwaltungs-, Finanz-, Sozialgericht).",
      "**Aufbau des BGB:** Allgemeiner Teil – Schuldrecht – Sachenrecht – Familienrecht – Erbrecht. Der AT ist **vor die Klammer gezogen** und gilt für alles Folgende, soweit dort nichts Spezielleres steht; ebenso Schuldrecht AT für alle Schuldverhältnisse.",
      "**HGB = Sonderprivatrecht der Kaufleute:** Kaufmann ist, wer ein Handelsgewerbe betreibt (§ 1 Abs. 1 HGB); das HGB geht dem BGB als spezielleres Recht vor und soll den Handelsverkehr erleichtern und beschleunigen (z. B. § 350 HGB, § 377 HGB); im Übrigen gilt das BGB.",
      "**Brücke ins Steuerrecht:** Steuertatbestände knüpfen an Zivilrecht an – Grundstückskauf (§ 1 Abs. 1 Nr. 1 GrEStG), Mietvertrag (§ 21 EStG), Ehe (§ 26 EStG). **Wirtschaftliche Betrachtungsweise:** wirtschaftliches Eigentum (§ 39 AO), Besteuerung trotz Gesetz- oder Sittenwidrigkeit (§ 40 AO) und trotz Unwirksamkeit (§ 41 AO).",
    ],
    fallen: [
      "Staatliche Beteiligung allein macht einen Vorgang **nicht** öffentlich-rechtlich.",
      "Das Steuerrecht ist öffentliches Recht – die Begriffe kommen aber oft aus dem BGB.",
      "Arbeitsrecht ist Privatrecht – zuständig sind die Arbeitsgerichte.",
    ],
  },

  "pr-anspruch": {
    satz: "Jeder Fall beginnt mit der Frage **„Wer will was von wem woraus?“** – und jede Anspruchsgrundlage wird in drei Stufen geprüft: entstanden, erloschen, durchsetzbar.",
    schema: [
      "Anspruch **entstanden?** – Voraussetzungen der Anspruchsgrundlage, keine rechtshindernden Einwendungen (§§ 105, 117, 125, 134, 138 BGB)",
      "Anspruch **erloschen?** – rechtsvernichtende Einwendungen (Erfüllung § 362 BGB, Anfechtung § 142 BGB, Aufrechnung § 389 BGB, Rücktritt § 346 BGB, Erlass § 397 BGB)",
      "Anspruch **durchsetzbar?** – rechtshemmende Einreden (Verjährung § 214 BGB, Zurückbehaltungsrecht § 273 BGB, § 320 BGB)",
      "**Ergebnis**",
    ],
    punkte: [
      "**Anspruch** = Recht, von einem anderen ein Tun oder Unterlassen zu verlangen (§ 194 Abs. 1 BGB). **Anspruchsgrundlage** = Norm mit Tatbestand und Rechtsfolge, z. B. § 433 Abs. 2 BGB.",
      "**Reihenfolge bei mehreren Anspruchsgrundlagen:** vertraglich (erst Primär-, dann Sekundäransprüche wie § 280 Abs. 1 BGB) → quasivertraglich (§ 280 Abs. 1 BGB i. V. m. §§ 311 Abs. 2, 241 Abs. 2 BGB; GoA §§ 677 ff. BGB) → dinglich (§ 985 BGB) → **Delikt** (§ 823 BGB) → **Bereicherung** (§ 812 BGB). Grundsätzlich **alle** in Betracht kommenden prüfen, auch wenn die erste schon trägt.",
      "**Wer, von wem?** Ist die Rechtsfähigkeit eines Beteiligten zweifelhaft (Verein, Gesellschaft, Erbengemeinschaft), vor der Anspruchsgrundlage prüfen (§ 1 BGB, § 13 Abs. 1 GmbHG, § 105 Abs. 2 HGB).",
      "**§ 433 Abs. 2 BGB – entstanden?** Angebot und Annahme, ggf. Stellvertretung; Geschäftsfähigkeit, bewusste Willensmängel (§§ 116 ff. BGB), Form (§ 125 BGB), Verbot (§ 134 BGB), Sitten (§ 138 BGB).",
      "**Erloschen?** Anfechtung (§ 142 BGB), Erfüllung und Surrogate (§§ 362, 364, 389, 397 BGB), Unmöglichkeit (§§ 275, 326 BGB), Rücktritt, Kündigung, Widerruf.",
      "**Durchsetzbar?** Verjährung, Stundung, Zurückbehaltungsrechte (§§ 273, 320 BGB).",
      "**Obersatz-Varianten:** „V könnte gegen K einen Anspruch auf … aus § 433 Abs. 2 BGB haben.“ oder „Fraglich ist, ob dem V gegen K ein Anspruch auf … aus § 433 Abs. 2 BGB zusteht.“ – immer mit Wer, von wem, was (Betrag, Sache) und woraus.",
      "**Einwendungen** sind von Amts wegen zu beachten; **Einreden** wirken nur, wenn sich der Schuldner auf sie beruft.",
      "**Gutachtenstil:** Obersatz im Konjunktiv („V könnte … aus § 433 Abs. 2 BGB haben“) → Definition/Voraussetzungen → Subsumtion → Ergebnis. Unproblematisches darf kurz im **Urteilsstil** festgestellt werden.",
      "**Auslegung von Gesetzen:** Wortlaut (Grenze), Systematik, Historie, Telos (Sinn und Zweck). Verträge und Willenserklärungen dagegen nach §§ 133, 157 BGB.",
    ],
    fallen: [
      "Die Verjährung lässt den Anspruch **nicht erlöschen** – sie ist eine Einrede.",
      "Keine Definitionen „auf Vorrat“: nur die Merkmale ausführlich prüfen, zu denen der Sachverhalt etwas hergibt.",
      "Den Obersatz nie ohne Anspruchsgrundlage formulieren – Wer, von wem, was, woraus.",
    ],
  },

  "pr-privatautonomie": {
    satz: "Jeder darf seine Rechtsverhältnisse grundsätzlich **selbst und frei** gestalten (Art. 2 Abs. 1 GG) – die Grenzen schützen den Schwächeren und die Rechtsordnung.",
    zahlen: [["3", "Säulen der Vertragsfreiheit: Abschluss, Inhalt, Form"], ["4", "weitere Erscheinungsformen: Vereinigungs-, Testier-, Eigentums-, Eheschließungsfreiheit"]],
    punkte: [
      "**Vertragsfreiheit** (vgl. § 311 Abs. 1 BGB): **Abschlussfreiheit** (ob und mit wem), **Inhaltsfreiheit** (was), **Formfreiheit** (wie – Umkehrschluss aus § 125 BGB).",
      "**Weitere Ausprägungen:** Vereinigungsfreiheit (Art. 9 GG, §§ 21 ff., 705 ff. BGB), Testierfreiheit (Art. 14 GG, § 1937 BGB), Eigentumsfreiheit (Art. 14 GG, § 903 BGB), Eheschließungsfreiheit (Art. 6 GG).",
      "**Grenzen der Abschlussfreiheit:** Kontrahierungszwang, z. B. Grundversorgung mit Strom (§ 17 Abs. 1 EnWG), Kfz-Haftpflicht.",
      "**Grenzen der Inhaltsfreiheit:** gesetzliches Verbot (§ 134 BGB), Sittenwidrigkeit (§ 138 Abs. 1 BGB) und Wucher – Ausbeutung einer Zwangslage oder Unerfahrenheit bei auffälligem Missverhältnis von Leistung und Gegenleistung (§ 138 Abs. 2 BGB) –, AGB-Kontrolle (§§ 305 ff. BGB), zwingendes Recht (§ 444 BGB, § 476 BGB), Typenzwang im Sachenrecht.",
      "**Grenzen der Formfreiheit:** § 311b Abs. 1 S. 1 BGB (Grundstück), § 518 Abs. 1 BGB (Schenkungsversprechen), § 766 S. 1 BGB (Bürgschaft), § 2247 BGB (Testament) – Verstoß: Nichtigkeit (§ 125 S. 1 BGB).",
      "**Dispositives Recht** (z. B. § 434 BGB) dürfen die Parteien abbedingen, **zwingendes** nicht. Grundrechte wirken nur **mittelbar** über Generalklauseln (§§ 138, 242, 826 BGB).",
    ],
    fallen: [
      "Formfreiheit ist die **Regel**, Formzwang die Ausnahme.",
      "Kontrahierungszwang betrifft die **Abschluss**-, nicht die Inhaltsfreiheit.",
    ],
  },

  "pr-rechtssubjekte": {
    satz: "Rechtsfähig ist, wer **Träger von Rechten und Pflichten** sein kann – jeder Mensch ab Vollendung der Geburt (§ 1 BGB) und jede juristische Person, der das Gesetz die Rechtsfähigkeit verleiht.",
    zahlen: [["§ 1 BGB", "Vollendung der Geburt"], ["7", "Mindestmitglieder für die Vereinseintragung (§ 56 BGB)"], ["25.000 €", "Mindeststammkapital GmbH (§ 5 Abs. 1 GmbHG)"]],
    punkte: [
      "**Natürliche Personen:** rechtsfähig von der Vollendung der Geburt bis zum Tod (Hirntod). Der **nasciturus** ist geschützt: Erbfähigkeit (§ 1923 Abs. 2 BGB), Unterhaltsersatz (§ 844 Abs. 2 S. 2 BGB). Tiere sind keine Rechtssubjekte (§ 90a BGB).",
      "**Rechts-, Handlungs-, Geschäfts-, Deliktsfähigkeit:** Rechtsfähigkeit = Träger von Rechten sein; Handlungsfähigkeit = durch eigenes Handeln Rechtsfolgen auslösen (Oberbegriff); Geschäftsfähigkeit = Rechtsgeschäfte selbst wirksam vornehmen (§§ 104 ff. BGB); Deliktsfähigkeit = für unerlaubte Handlungen verantwortlich sein (§§ 827, 828 BGB).",
      "**Juristische Personen:** Privatrecht – e. V. (§ 21 BGB), Stiftung (§ 80 BGB), GmbH (§ 13 Abs. 1 GmbHG), AG, eG; öffentliches Recht – Bund, Länder, Gemeinden, Anstalten. Sie handeln durch **Organe**: Vorstand (§ 26 BGB), Geschäftsführer (§ 35 GmbHG), Bürgermeister.",
      "**Rechtsfähige Personengesellschaften** sind keine juristischen Personen, ihre Gesellschafter **haften persönlich:** GbR (§ 705 Abs. 2 BGB, § 721 BGB), oHG (§ 105 Abs. 2 HGB, § 126 HGB), KG (§ 161 HGB; Kommanditisten bis zur Einlage, § 171 Abs. 1 HGB).",
      "**Nicht rechtsfähig:** Innen-GbR (§ 740 BGB), Erbengemeinschaft, Bruchteilsgemeinschaft (§§ 741 ff. BGB, jeder verfügt über seinen Anteil, § 747 BGB).",
      "**GmbH-Gründung:** Vorgründungsgesellschaft (GbR/oHG, volle Haftung) → notarieller Vertrag → **Vor-GmbH** (Handelndenhaftung § 11 Abs. 2 GmbHG) → **Eintragung = Entstehung** (§ 11 Abs. 1 GmbHG, konstitutiv). Ende erst mit **Löschung** nach Auflösung und Liquidation.",
      "**Steuerrechtsfähigkeit** folgt eigenen Regeln: GbR und oHG sind nicht einkommen- oder körperschaftsteuerpflichtig, können aber Unternehmer im Sinne des UStG sein.",
    ],
    fallen: [
      "Rechtsfähigkeit ≠ Geschäftsfähigkeit: Ein Baby kann Eigentümer sein, aber keine Verträge schließen.",
      "Die oHG ist rechtsfähig, aber **keine** juristische Person.",
      "Auflösung einer GmbH ist nicht ihr Ende – erst die Löschung beendet die Rechtsfähigkeit.",
    ],
  },

  "pr-rechtsobjekte": {
    satz: "Sachen sind nur **körperliche Gegenstände** (§ 90 BGB) – Rechte, Forderungen und Tiere sind keine Sachen; Bestandteile und Zubehör entscheiden, was mit übereignet wird.",
    zahlen: [["§ 90 BGB", "Sachbegriff"], ["§§ 93, 94 BGB", "wesentliche Bestandteile"], ["§ 95 BGB", "Scheinbestandteile"], ["§ 97 BGB", "Zubehör"]],
    punkte: [
      "**Bewegliche Sachen** werden nach §§ 929 ff. BGB übereignet, **Grundstücke** nach §§ 873, 925 BGB.",
      "**Vertretbar** (§ 91 BGB): nach Zahl, Maß, Gewicht bestimmbar (Geld, Serienware). **Verbrauchbar** (§ 92 BGB): zum Verbrauch oder zur Veräußerung bestimmt.",
      "**Wesentliche Bestandteile** (§ 93 BGB): nicht trennbar ohne Zerstörung oder Wesensänderung – sie können **nicht Gegenstand besonderer Rechte** sein.",
      "**Grundstück (§ 94 BGB):** fest verbundene Sachen, insbesondere **Gebäude**, sind wesentliche Bestandteile; zum Gebäude gehören die **zur Herstellung eingefügten** Sachen (Fenster, Heizung).",
      "**Scheinbestandteile (§ 95 BGB):** nur zu einem **vorübergehenden Zweck** verbunden (Gartenhaus des Mieters, Baucontainer) – bleiben selbständige bewegliche Sachen.",
      "**Zubehör (§ 97 BGB):** bewegliche Sache, die dem wirtschaftlichen Zweck der Hauptsache dient und in räumlichem Verhältnis zu ihr steht (Maschinen im Betrieb, Hotelinventar § 98 BGB) – bleibt selbständig, wird aber im Zweifel **mitverkauft** (§ 311c BGB).",
      "**Tiere** sind keine Sachen, werden aber wie Sachen behandelt, soweit nichts anderes gilt (§ 90a BGB).",
    ],
    fallen: [
      "Zubehör ist **kein** Bestandteil – es bleibt eine eigene Sache.",
      "Gebäude und Boden sind zivilrechtlich **eine** Sache, bilanziell aber zwei Wirtschaftsgüter.",
    ],
  },

  "pr-geschaeftsfaehigkeit": {
    satz: "Unter 7 geschäftsunfähig, von 7 bis 17 beschränkt geschäftsfähig, ab 18 voll geschäftsfähig – Minderjährige werden vor **rechtlichen** Nachteilen geschützt, nicht vor schlechten Geschäften.",
    zahlen: [["< 7", "geschäftsunfähig (§ 104 Nr. 1 BGB)"], ["7–17", "beschränkt geschäftsfähig (§ 106 BGB)"], ["18", "volljährig (§ 2 BGB)"], ["2 Wochen", "Frist für die Genehmigung nach Aufforderung (§ 108 Abs. 2 BGB)"]],
    schema: [
      "Ist der Minderjährige mindestens 7 Jahre alt? Sonst: Erklärung nichtig (§ 104 Nr. 1 BGB, § 105 Abs. 1 BGB)",
      "Ist das Geschäft lediglich rechtlich vorteilhaft? Dann wirksam (§ 107 BGB)",
      "Liegt eine Einwilligung vor (§ 107 BGB) – auch als Taschengeld (§ 110 BGB) oder Generaleinwilligung (§§ 112, 113 BGB)?",
      "Sonst: Vertrag schwebend unwirksam – Genehmigung (§ 108 Abs. 1 BGB), nach Volljährigkeit durch den Minderjährigen selbst (§ 108 Abs. 3 BGB)",
      "Einseitige Rechtsgeschäfte ohne Einwilligung: unwirksam (§ 111 BGB)",
    ],
    punkte: [
      "**Lediglich rechtlich vorteilhaft** heißt: keine rechtlichen Pflichten, kein Rechtsverlust. Eigentumserwerb und Annahme einer Schenkung ja; **jeder Kaufvertrag nein** – auch ein Schnäppchen verpflichtet zur Zahlung.",
      "**Taschengeldparagraf (§ 110 BGB):** wirksam, sobald die Leistung **vollständig mit überlassenen Mitteln bewirkt** ist – Ratenkäufe erst mit der letzten Rate.",
      "**§ 108 Abs. 2 BGB:** Nach Aufforderung des Vertragspartners kann nur noch ihm gegenüber genehmigt werden; Schweigen zwei Wochen lang = Verweigerung. **§ 109 BGB:** Widerrufsrecht des Partners bis zur Genehmigung.",
      "**Vorübergehende Störung (§ 105 Abs. 2 BGB):** Wer **bewusstlos** ist oder dessen Geistestätigkeit **vorübergehend gestört** ist (Volltrunkenheit, Drogenrausch, hohes Fieber), gibt eine **nichtige** Willenserklärung ab – auch als Volljähriger. Anders als bei § 104 Nr. 2 BGB bleibt er geschäftsfähig; unwirksam ist nur die Erklärung in diesem Zustand.",
      "**Als Vertreter** kann ein beschränkt Geschäftsfähiger wirksam handeln (§ 165 BGB) – ihn treffen die Folgen nicht.",
      "**Rausch – zwei Regeln:** Verträge im Vollrausch sind **nichtig** (§ 105 Abs. 2 BGB), egal ob selbst verschuldet. Für Schäden im **selbstverschuldeten** Rausch haftet man dagegen wie bei Fahrlässigkeit (§ 827 S. 2 BGB); nur wer ohne Verschulden hineingeraten ist (K.-o.-Tropfen), ist nicht verantwortlich (§ 827 S. 1 BGB).",
      "**Deliktsfähigkeit:** unter 7 nie verantwortlich; 7 bis 9 nicht bei Unfällen mit Kfz oder Bahnen (außer Vorsatz); bis 17 verantwortlich bei **Einsichtsfähigkeit** (§ 828 BGB); Billigkeitshaftung § 829 BGB.",
    ],
    fallen: [
      "Volljährigkeit macht einen schwebend unwirksamen Vertrag **nicht automatisch** wirksam – es braucht die Genehmigung (§ 108 Abs. 3 BGB).",
      "§ 110 BGB hilft nur beschränkt Geschäftsfähigen – nicht dem Sechsjährigen.",
      "Der Volltrunkene ist **nicht** geschäftsunfähig (§ 104 BGB) – seine Erklärung ist aber nach **§ 105 Abs. 2 BGB** nichtig. Ein angetrunkener, aber noch steuerungsfähiger Käufer bleibt gebunden.",
      "Wirtschaftlich günstig ≠ rechtlich vorteilhaft.",
    ],
  },

  "pr-willenserklaerung": {
    satz: "Eine Willenserklärung ist eine Willensäußerung, die auf eine **Rechtsfolge** gerichtet ist – außen ein erkennbares Verhalten, innen Handlungswille, Erklärungsbewusstsein und Geschäftswille.",
    schema: [
      "**Objektiver Tatbestand:** Verhalten, das nach dem objektiven Empfängerhorizont einen Rechtsbindungswillen erkennen lässt – ausdrücklich oder konkludent (§§ 133, 157 BGB)",
      "**Handlungswille:** bewusstes Handeln überhaupt (fehlt bei Reflex, vis absoluta) – sonst keine Erklärung",
      "**Erklärungsbewusstsein:** Bewusstsein, etwas rechtlich Erhebliches zu erklären – fehlt es, Zurechnung bei Erkennbarkeit, aber Anfechtung entsprechend § 119 Abs. 1 BGB",
      "**Geschäftswille:** Wille zu einer bestimmten Rechtsfolge – fehlt er, ist die Erklärung wirksam, aber ggf. anfechtbar",
      "**Abgabe und Zugang** (§ 130 BGB)",
    ],
    punkte: [
      "**Auslegung:** wirklicher Wille (§ 133 BGB) und Treu und Glauben mit Rücksicht auf die Verkehrssitte (§ 157 BGB) – empfangsbedürftige Erklärungen nach dem **objektiven Empfängerhorizont**. Gemeinsam Gewolltes geht dem Wortlaut vor (falsa demonstratio non nocet).",
      "**Rechtsbindungswille** fehlt bei Gefälligkeiten des täglichen Lebens und bei der **invitatio ad offerendum** (Schaufenster, Prospekt, Inserat, Speisekarte): Der Anbieter will Bonität und Vorrat prüfen und nicht mehrfach gebunden sein.",
      "**Schweigen** ist grundsätzlich keine Erklärung – Ausnahmen: Vereinbarung, Gesetz (§ 108 Abs. 2 BGB, § 177 Abs. 2 BGB, § 362 HGB), kaufmännisches Bestätigungsschreiben.",
      "**Abgabe:** willentlich in den Verkehr gebracht. **Zugang unter Abwesenden:** im **Machtbereich** des Empfängers mit Möglichkeit der Kenntnisnahme unter **normalen Umständen** (§ 130 Abs. 1 S. 1 BGB). Widerruf muss vorher oder gleichzeitig zugehen (§ 130 Abs. 1 S. 2 BGB); Tod nach Abgabe schadet nicht (§ 130 Abs. 2 BGB).",
    ],
    fallen: [
      "Zugang heißt nicht Kenntnisnahme – es genügt die **Möglichkeit**.",
      "Fehlendes Erklärungsbewusstsein ≠ keine Willenserklärung: Sie wird zugerechnet, wenn der Erklärende es hätte erkennen können.",
    ],
  },

  "pr-rechtsgeschaefte": {
    satz: "Verpflichten und Verfügen sind **getrennte** Geschäfte, deren Wirksamkeit **unabhängig** voneinander ist – der Kaufvertrag macht den Käufer noch nicht zum Eigentümer.",
    zahlen: [["3", "Rechtsgeschäfte beim Barkauf (§ 433 BGB, § 929 S. 1 BGB)"], ["6", "Willenserklärungen beim Barkauf"]],
    punkte: [
      "**Einseitige** Rechtsgeschäfte (Kündigung, Anfechtung, Testament) und **mehrseitige** (Vertrag, Beschluss). Verträge: einseitig verpflichtend (Schenkung, Bürgschaft), unvollkommen zweiseitig (Leihe, Auftrag), **gegenseitig/synallagmatisch** (Kauf, Miete, Werkvertrag – „do ut des“, §§ 320 ff. BGB).",
      "**Trennungsprinzip:** Verpflichtungsgeschäft (§ 433 BGB) begründet nur Pflichten; Verfügungsgeschäft (§ 929 BGB, § 398 BGB) überträgt, belastet, ändert oder hebt ein Recht unmittelbar auf.",
      "**Abstraktionsprinzip:** Ist der Kaufvertrag nichtig, bleibt die Übereignung wirksam – Rückabwicklung über **§ 812 BGB**. Nur bei Fehlern, die beide Geschäfte treffen (Geschäftsunfähigkeit, Täuschung), scheitert auch die Verfügung → § 985 BGB.",
      "**Form:** Schriftform (§ 126 BGB), elektronische Form (§ 126a BGB), Textform (§ 126b BGB), Beglaubigung (§ 129 BGB), Beurkundung (§ 128 BGB). Verstoß → **nichtig** (§ 125 S. 1 BGB); Heilung durch Erfüllung in § 311b Abs. 1 S. 2 BGB, § 518 Abs. 2 BGB, § 766 S. 3 BGB.",
      "**Nichtig** auch: Scheingeschäft (§ 117 Abs. 1 BGB, verdecktes Geschäft gilt ggf. nach Abs. 2), Scherzerklärung (§ 118 BGB, Vertrauensschaden § 122 BGB), Verbotsgesetz (§ 134 BGB), Sittenwidrigkeit und Wucher (§ 138 BGB). Der **geheime Vorbehalt** schadet nicht (§ 116 BGB).",
    ],
    fallen: [
      "„Abstrakt“ heißt nicht „egal“: Mängel, die auch die Einigung treffen, machen die Übereignung ebenfalls unwirksam.",
      "Beim Schwarzkauf eines Grundstücks sind **beide** Verträge unwirksam – der beurkundete (Schein) und der gewollte (Form) –, bis Auflassung und Eintragung heilen.",
    ],
  },

  "pr-vertragsschluss": {
    satz: "Ein Vertrag entsteht aus **zwei übereinstimmenden Willenserklärungen** – Angebot und Annahme (§§ 145 ff. BGB).",
    schema: [
      "**Angebot:** empfangsbedürftige Willenserklärung mit allen wesentlichen Bestandteilen (beim Kauf: Sache, Preis, Parteien), sodass ein „Ja“ genügt – Abgrenzung zur invitatio ad offerendum",
      "**Annahme:** vorbehaltlose Zustimmung zum Angebot",
      "**Rechtzeitigkeit:** Anwesende sofort (§ 147 Abs. 1 BGB), Abwesende bis zum regelmäßig zu erwartenden Eingang (§ 147 Abs. 2 BGB), gesetzte Frist (§ 148 BGB)",
      "**Kein Erlöschen** durch Ablehnung (§ 146 BGB)",
      "**Übereinstimmung** – sonst Dissens (§§ 154, 155 BGB)",
    ],
    punkte: [
      "Der Antragende ist an sein Angebot **gebunden** (§ 145 BGB), außer er schließt die Bindung aus („freibleibend“).",
      "**Verspätete Annahme** = neuer Antrag (§ 150 Abs. 1 BGB); **Annahme mit Änderungen** = Ablehnung und neuer Antrag (§ 150 Abs. 2 BGB).",
      "**Annahme ohne Zugang** (§ 151 BGB), wenn die Verkehrssitte das nicht erwarten lässt – z. B. Versand bestellter Ware.",
      "**Ablehnung** setzt voraus, dass erkennbar nicht zu den Bedingungen angenommen wird. „Ich denke darüber nach“ ist keine Ablehnung.",
      "**Versteigerung:** Vertrag erst mit dem **Zuschlag** (§ 156 BGB); **unbestellte Ware** begründet gegenüber Verbrauchern keinen Anspruch (§ 241a BGB).",
    ],
    fallen: [
      "Eine Anzeige „Ich biete zum Kauf an …“ ist trotz des Wortlauts meist nur eine **invitatio** – Auslegung nach dem Empfängerhorizont.",
      "Unter Anwesenden zählt auch das Telefonat (§ 147 Abs. 1 S. 2 BGB).",
    ],
  },

  "pr-anfechtung": {
    satz: "Wer sich bei der Erklärung geirrt hat oder getäuscht bzw. bedroht wurde, kann sie **anfechten** – dann ist das Geschäft **von Anfang an nichtig** (§ 142 Abs. 1 BGB).",
    zahlen: [["unverzüglich", "Frist bei §§ 119, 120 BGB (§ 121 Abs. 1 BGB)"], ["1 Jahr", "Frist bei Täuschung und Drohung (§ 124 Abs. 1 BGB)"], ["10 Jahre", "Höchstfrist (§§ 121 Abs. 2, 124 Abs. 3 BGB)"]],
    schema: [
      "Anfechtbare Willenserklärung",
      "**Anfechtungserklärung** gegenüber dem Anfechtungsgegner (§ 143 BGB)",
      "**Anfechtungsgrund** (§§ 119, 120, 123 BGB) – ursächlich für die Erklärung",
      "**Frist** (§§ 121, 124 BGB)",
      "Kein **Ausschluss** durch Bestätigung (§ 144 BGB)",
      "**Rechtsfolge:** Nichtigkeit ex tunc (§ 142 Abs. 1 BGB); bei §§ 119, 120 BGB Ersatz des Vertrauensschadens (§ 122 BGB)",
    ],
    punkte: [
      "**Inhaltsirrtum** (§ 119 Abs. 1 Var. 1 BGB): Irrtum über die **Bedeutung** des Erklärten – auch, wer ein Formular mit einer **bestimmten falschen Vorstellung** vom Inhalt unterschreibt.",
      "**Erklärungsirrtum** (§ 119 Abs. 1 Var. 2 BGB): Versprechen, Verschreiben, Vertippen.",
      "**Eigenschaftsirrtum** (§ 119 Abs. 2 BGB): verkehrswesentliche Eigenschaften der Person oder Sache – Echtheit, Alter, Herkunft; **nicht** der Wert als solcher.",
      "**Übermittlungsfehler** des Boten (§ 120 BGB); **arglistige Täuschung** und **widerrechtliche Drohung** (§ 123 BGB) – Täuschung durch Dritte nur, wenn der Empfänger sie kannte oder kennen musste (§ 123 Abs. 2 BGB).",
      "**Motivirrtum** und interner **Kalkulationsirrtum** berechtigen nicht zur Anfechtung.",
      "Das Wort „anfechten“ muss nicht fallen – erkennbar muss sein, dass der Erklärende das Geschäft wegen des Willensmangels nicht gelten lassen will.",
    ],
    fallen: [
      "Wer **bewusst ungelesen** unterschreibt, irrt nicht – wer sich eine bestimmte falsche Vorstellung macht, schon.",
      "Anfechtung wegen Täuschung: Frist ein **Jahr**, nicht „unverzüglich“; und **kein** Vertrauensschaden zugunsten des Täuschenden.",
    ],
  },

  "pr-stellvertretung": {
    satz: "Der Vertreter gibt eine **eigene** Erklärung **im Namen** des Vertretenen **mit Vertretungsmacht** ab – dann wirkt sie unmittelbar für und gegen den Vertretenen (§ 164 Abs. 1 S. 1 BGB).",
    schema: [
      "**Zulässigkeit:** kein höchstpersönliches Geschäft (Ehe § 1311 BGB, Testament § 2064 BGB)",
      "**Eigene Willenserklärung:** Entscheidungsspielraum → Vertreter; nur Übermittlung → Bote. Vertreter mindestens beschränkt geschäftsfähig (§ 165 BGB)",
      "**Im fremden Namen** (Offenkundigkeit, § 164 Abs. 1 S. 2 BGB) – Ausnahmen: unternehmensbezogenes Geschäft, Geschäft für den, den es angeht",
      "**Vertretungsmacht:** Gesetz, Organstellung oder Vollmacht (§ 167 BGB); Rechtsschein (§§ 170–172 BGB, Duldungs- und Anscheinsvollmacht)",
      "**Rechtsfolge:** Wirkung für und gegen den Vertretenen – sonst §§ 177 ff. BGB oder Eigengeschäft (§ 164 Abs. 2 BGB)",
    ],
    punkte: [
      "**Bote oder Vertreter?** Entscheidend ist das Auftreten nach außen (objektiver Empfängerhorizont, §§ 133, 157 BGB). Wer selbst aussucht, verhandelt oder den Partner wählt, ist Vertreter. Der Bote braucht keine Geschäftsfähigkeit.",
      "**Minderjährige als Vertreter:** wirksam, weil sie selbst nicht verpflichtet werden – Rechtsgedanke des Minderjährigenschutzes, normiert in **§ 165 BGB**. Ein **Geschäftsunfähiger** kann nicht vertreten (§ 105 BGB) – wohl aber Bote sein.",
      "**Vollmacht:** einseitige empfangsbedürftige Erklärung, grundsätzlich **formfrei** (§ 167 Abs. 2 BGB), als **Innenvollmacht** gegenüber dem Vertreter oder **Außenvollmacht** gegenüber dem Dritten (§ 167 Abs. 1 BGB). Das Wort „Vollmacht“ muss nicht fallen.",
      "**Ohne Vertretungsmacht:** schwebend unwirksam, Genehmigung (§ 177 BGB); verweigert → Vertreter haftet auf Erfüllung oder Schadensersatz (§ 179 Abs. 1 BGB), gutgläubig nur auf den Vertrauensschaden (§ 179 Abs. 2 BGB), Minderjährige ohne Zustimmung gar nicht (§ 179 Abs. 3 S. 2 BGB).",
      "**Insichgeschäft** verboten, außer gestattet oder reine Erfüllung (§ 181 BGB). **Willensmängel** des Vertreters zählen (§ 166 Abs. 1 BGB).",
      "**Prokura** (§§ 48–53 HGB): nur vom Kaufmann, ausdrücklich, Umfang gesetzlich festgelegt und nach außen **nicht beschränkbar**; keine Grundstücksveräußerung ohne besondere Befugnis (§ 49 Abs. 2 HGB). **Handlungsvollmacht** (§ 54 HGB) nur für branchenübliche Geschäfte; Ladenangestellte § 56 HGB.",
    ],
    fallen: [
      "Nicht die **Minderjährigkeit** des Vertreters prüfen und mit §§ 107, 108 BGB scheitern lassen – § 165 BGB!",
      "„Für meinen Arbeitgeber“ genügt nur, wenn erkennbar ist, **wer** gemeint ist – dazu alle Umstände würdigen (unternehmensbezogenes Geschäft, § 164 Abs. 1 S. 2 BGB).",
      "Ein Sechsjähriger kann **Bote** sein, aber nicht **Vertreter** (§§ 104, 105, 165 BGB).",
    ],
  },

  "pr-schuldverhaeltnis": {
    satz: "Kraft eines Schuldverhältnisses kann der Gläubiger vom Schuldner eine **Leistung** fordern (§ 241 Abs. 1 BGB) – entstanden durch Vertrag oder kraft Gesetzes, beendet meist durch Erfüllung.",
    zahlen: [["§ 241 BGB", "Pflichten aus dem Schuldverhältnis"], ["§ 362 BGB", "Erfüllung"], ["§ 389 BGB", "Wirkung der Aufrechnung"]],
    punkte: [
      "**Vertraglich** (§ 311 Abs. 1 BGB) oder **gesetzlich** (Delikt §§ 823 ff. BGB, Bereicherung §§ 812 ff. BGB, GoA §§ 677 ff. BGB). Schon Vertragsverhandlungen begründen Rücksichtnahmepflichten (§ 311 Abs. 2 BGB, § 241 Abs. 2 BGB).",
      "**Zielschuldverhältnis:** einmaliger Austausch (Kauf § 433 BGB, Werkvertrag § 631 BGB) – endet durch **Erfüllung**, außerordentlich durch Rücktritt oder Anfechtung.",
      "**Dauerschuldverhältnis:** Leistung über Zeit (Miete § 535 BGB, Arbeitsvertrag § 611a BGB, Darlehen § 488 BGB) – endet durch **Zeitablauf** oder **ordentliche Kündigung**, immer auch durch **Kündigung aus wichtigem Grund** (§ 314 BGB) oder Aufhebungsvertrag.",
      "**Stückschuld** (diese Sache) – **Gattungsschuld** (mittlere Art und Güte, § 243 Abs. 1 BGB; Konkretisierung § 243 Abs. 2 BGB).",
      "**Leistungsort:** im Zweifel Wohnsitz des Schuldners – **Holschuld** (§ 269 BGB); Bring- und Schickschuld nach Vereinbarung. **Leistungszeit:** im Zweifel **sofort** (§ 271 Abs. 1 BGB).",
      "**Gesamtschuld** (§ 421 BGB): jeder schuldet alles, der Gläubiger bekommt es nur einmal; Ausgleich im Innenverhältnis zu gleichen Teilen (§ 426 BGB).",
      "**Abtretung** (§ 398 BGB) ohne Zustimmung des Schuldners, Einwendungen bleiben (§ 404 BGB); **Schuldübernahme** braucht den Gläubiger (§§ 414, 415 BGB).",
      "**Erlöschen:** Erfüllung (§ 362 BGB), Leistung an Erfüllungs statt (§ 364 BGB), **Aufrechnung** gleichartiger, gegenseitiger Forderungen durch Erklärung (§§ 387, 388, 389 BGB), Erlassvertrag (§ 397 BGB).",
    ],
    fallen: [
      "Werkvertrag = Erfolg geschuldet (Ziel), Dienstvertrag = Tätigkeit (Dauer).",
      "Ein befristeter Vertrag endet **ohne** Kündigung mit Zeitablauf.",
    ],
  },

  "pr-gesetzlich": {
    satz: "Wer rechtswidrig und schuldhaft ein geschütztes Rechtsgut verletzt, muss den Schaden ersetzen (§ 823 Abs. 1 BGB) – ganz ohne Vertrag.",
    schema: [
      "**Rechtsgutverletzung:** Leben, Körper, Gesundheit, Freiheit, Eigentum, sonstiges (absolutes) Recht",
      "**Verletzungshandlung** (Tun oder Unterlassen) und **haftungsbegründende Kausalität**",
      "**Rechtswidrigkeit** – indiziert; Rechtfertigungsgründe (§§ 227, 228, 904 BGB, Einwilligung)?",
      "**Verschulden:** Deliktsfähigkeit (§§ 827, 828 BGB) und Vorsatz/Fahrlässigkeit (§ 276 BGB)",
      "**Schaden** und **haftungsausfüllende Kausalität**",
      "**Rechtsfolge:** §§ 249 ff. BGB",
    ],
    punkte: [
      "Das bloße **Vermögen** ist kein „sonstiges Recht“ – reine Vermögensschäden nur über § 823 Abs. 2 BGB (Schutzgesetz) oder § 826 BGB.",
      "**Verschulden im Rausch:** Bewusstlose sind nicht verantwortlich (§ 827 S. 1 BGB); wer sich selbst betrunken hat, haftet wie bei Fahrlässigkeit (§ 827 S. 2 BGB).",
      "**Schadensersatz:** Naturalrestitution (§ 249 Abs. 1 BGB) oder der erforderliche Geldbetrag (§ 249 Abs. 2 BGB); Wertersatz (§ 251 BGB); entgangener Gewinn (§ 252 BGB); Schmerzensgeld (§ 253 Abs. 2 BGB); Mitverschulden (§ 254 BGB).",
      "**Leistungskondiktion (§ 812 Abs. 1 S. 1 Alt. 1 BGB):** etwas erlangt, durch Leistung, ohne Rechtsgrund → Herausgabe, sonst Wertersatz (§ 818 Abs. 2 BGB), Entreicherung (§ 818 Abs. 3 BGB).",
      "**Herausgabeanspruch (§ 985 BGB):** Eigentümer gegen Besitzer ohne Recht zum Besitz (§ 986 BGB).",
      "**Nichtiger Vertrag – was jetzt?** Nur Verpflichtung nichtig → § 812 BGB (Abstraktionsprinzip). Auch Übereignung nichtig → § 985 BGB. Daneben § 823 BGB, wenn ein Rechtsgut verletzt ist.",
    ],
    fallen: [
      "Erst prüfen, ob ein **Vertrag** fehlt – sonst vertragliche Ansprüche zuerst.",
      "§ 828 Abs. 2 BGB gilt nur für 7- bis 9-Jährige und nur bei Unfällen mit Kraftfahrzeugen oder Bahnen.",
    ],
  },

  "pr-verjaehrung": {
    satz: "Nach Ablauf der Verjährung darf der Schuldner die Leistung **verweigern** (§ 214 Abs. 1 BGB) – der Anspruch besteht fort, ist aber nicht mehr durchsetzbar.",
    zahlen: [["3 Jahre", "regelmäßige Frist (§ 195 BGB)"], ["31.12.", "Beginn mit Jahresende (§ 199 Abs. 1 BGB)"], ["10 Jahre", "Grundstücksrechte (§ 196 BGB), Höchstfrist (§ 199 Abs. 4 BGB)"], ["30 Jahre", "Herausgabe aus Eigentum, Titel (§ 197 BGB)"], ["2 Jahre", "Mängel beim Kauf ab Ablieferung (§ 438 BGB)"]],
    punkte: [
      "Es verjähren **Ansprüche** (§ 194 Abs. 1 BGB), nicht das Eigentum oder Gestaltungsrechte.",
      "**Regelmäßige Verjährung:** drei Jahre ab **Schluss des Jahres**, in dem der Anspruch entstanden ist **und** der Gläubiger Kenntnis von Umständen und Schuldner hat oder grob fahrlässig nicht hat (§§ 195, 199 Abs. 1 BGB). Anspruch aus Mai 2026 → Verjährung mit Ablauf des 31.12.2029.",
      "**Hemmung:** Die Zeit wird nicht mitgezählt (§ 209 BGB) – bei Verhandlungen (§ 203 BGB), Klage oder Mahnbescheid (§ 204 Abs. 1 Nr. 1, 3 BGB).",
      "**Neubeginn:** Die Frist beginnt von vorn bei **Anerkenntnis** – Abschlag, Zinsen, Sicherheit (§ 212 Abs. 1 Nr. 1 BGB) – oder Vollstreckungshandlung (Nr. 2).",
      "Trotz Verjährung Geleistetes kann **nicht zurückgefordert** werden (§ 214 Abs. 2 BGB).",
      "Steuerrecht anders: Die **Zahlungsverjährung** (§ 228 AO) lässt den Anspruch **erlöschen** (§ 47 AO).",
    ],
    fallen: [
      "Die regelmäßige Frist beginnt am **Jahresende**, Mängelansprüche aber mit **Ablieferung** (§ 438 Abs. 2 BGB).",
      "Eine bloße Mahnung hemmt nicht – ein **Mahnbescheid** schon.",
      "Neubeginn nach § 212 BGB läuft ab dem Ereignis, **nicht** ab Jahresende.",
    ],
  },

  "pr-kauf": {
    satz: "Der Verkäufer schuldet **Übergabe und Eigentum** an einer mangelfreien Sache, der Käufer **Zahlung und Abnahme** (§ 433 BGB) – bei Mängeln zuerst Nacherfüllung.",
    zahlen: [["§ 433 BGB", "Hauptpflichten"], ["§ 437 BGB", "Rechte bei Mängeln"], ["2 Jahre", "Verjährung ab Ablieferung (§ 438 Abs. 1 Nr. 3 BGB)"], ["1 Jahr", "Beweislastumkehr beim Verbrauchsgüterkauf (§ 477 BGB)"]],
    schema: [
      "Wirksamer **Kaufvertrag**",
      "**Mangel** bei Gefahrübergang (§§ 434, 435, 446 BGB)",
      "Kein Ausschluss (§ 442 BGB Kenntnis, § 444 BGB Haftungsausschluss nur ohne Arglist/Garantie)",
      "**Nacherfüllung** nach Wahl des Käufers (§ 439 BGB)",
      "Nach erfolgloser Frist: **Rücktritt** (§§ 440, 323 BGB) oder **Minderung** (§ 441 BGB); daneben **Schadensersatz** (§§ 280, 281 BGB)",
      "Keine **Verjährung** (§ 438 BGB)",
    ],
    punkte: [
      "**Sachmangel (§ 434 BGB):** Abweichung von den subjektiven (Vereinbarung, vorausgesetzte Verwendung), objektiven (gewöhnliche Verwendung, übliche Beschaffenheit) oder Montageanforderungen bei Gefahrübergang. **Rechtsmangel** (§ 435 BGB): Rechte Dritter.",
      "**Gefahrübergang** mit Übergabe (§ 446 BGB); beim **Versendungskauf** mit Auslieferung an die Transportperson (§ 447 BGB) – **nicht** beim Verbrauchsgüterkauf (§ 475 Abs. 2 BGB).",
      "**Eigentumsvorbehalt (§ 449 BGB):** Übereignung unter der aufschiebenden Bedingung vollständiger Zahlung (§ 158 Abs. 1 BGB).",
      "**Verbrauchsgüterkauf (§ 474 BGB):** Verbraucher (§ 13 BGB) kauft vom Unternehmer (§ 14 BGB) – zwingender Schutz (§ 476 BGB), Beweislastumkehr ein Jahr (§ 477 BGB).",
      "**Tausch** (§ 480 BGB) folgt Kaufrecht; **Schenkungsversprechen** braucht notarielle Form (§ 518 Abs. 1 BGB), Heilung durch Bewirken.",
      "**Handelskauf:** Rügeobliegenheit des Kaufmanns (§ 377 HGB).",
    ],
    fallen: [
      "Kein Rücktritt ohne vorherige Frist zur Nacherfüllung (Ausnahmen § 440 BGB, § 323 Abs. 2 BGB).",
      "Bei der Nacherfüllung wählt der **Käufer**, nicht der Verkäufer.",
    ],
  },

  "pr-sachenrecht": {
    satz: "Besitz ist die **tatsächliche**, Eigentum die **rechtliche** Herrschaft über eine Sache – übertragen wird Eigentum durch Einigung und Übergabe (§ 929 BGB) bzw. Auflassung und Eintragung (§§ 873, 925 BGB).",
    schema: [
      "**Einigung** über den Eigentumsübergang (dinglicher Vertrag, Stellvertretung möglich)",
      "**Übergabe** oder Ersatz (§ 929 S. 2 BGB, §§ 930, 931 BGB)",
      "**Einigsein** bei Übergabe",
      "**Berechtigung** des Veräußerers – sonst gutgläubiger Erwerb (§§ 932–935 BGB)",
    ],
    punkte: [
      "**Besitz** (§ 854 BGB): tatsächliche Gewalt – Erwerb ist **Realakt**, keine Stellvertretung. **Mittelbarer Besitz** über Besitzmittler (§ 868 BGB, Mieter); **Besitzdiener** (§ 855 BGB, Angestellte) sind selbst keine Besitzer; Erbenbesitz (§ 857 BGB).",
      "**Eigentum** (§ 903 BGB): mit der Sache nach Belieben verfahren und andere ausschließen.",
      "**Gutgläubiger Erwerb** vom Nichteigentümer (§ 932 BGB): Erwerber weiß es nicht und ist nicht **grob fahrlässig** ahnungslos; **nicht bei abhanden gekommenen** Sachen – gestohlen, verloren (§ 935 Abs. 1 BGB) –, außer Geld und öffentliche Versteigerung (§ 935 Abs. 2 BGB).",
      "**Grundstück:** Kaufvertrag **notariell beurkundet** (§ 311b Abs. 1 BGB); **Auflassung** bei gleichzeitiger Anwesenheit vor dem Notar (§ 925 Abs. 1 BGB), bedingungsfeindlich; Eigentum erst mit **Eintragung** (§ 873 Abs. 1 BGB). Gutgläubiger Erwerb über das Grundbuch (§ 892 BGB).",
      "**Zweck der doppelten Form:** Warnung vor übereilten, weitreichenden Vermögensentscheidungen, Beratung durch den Notar, Beweis und ein verlässliches Grundbuch.",
      "**Bei Eigentumsfragen** im Fall: Wem gehörte die Sache ursprünglich? Wer hat wann wirksam übereignet? Stellvertretung bei der Einigung prüfen (Geschäft für den, den es angeht beim Bargeschäft).",
    ],
    fallen: [
      "Der Kaufvertrag beim Notar macht den Käufer **noch nicht** zum Eigentümer – erst die Eintragung.",
      "Verliehen ist **nicht** abhanden gekommen – gutgläubiger Erwerb möglich.",
    ],
  },
};

export const KLAUSUR_PR = {
  titel: "Privatrecht-Klausur: so holst du die Punkte",
  aufbau: [
    "**120 Minuten**, Stoff: Kapitel 1–12 (Stellung des Privatrechts bis Sachenrecht). Hilfsmittel nach Ankündigung, zuletzt die NWB-Textausgaben „Wichtige Wirtschaftsgesetze“ und „Wichtige Steuergesetze“.",
    "**Teil A – allgemeine Fragen** (ca. 30 Minuten): Definitionen und Zusammenhänge in ganzen Sätzen – z. B. Rechts- und Geschäftsfähigkeit, Privatautonomie, Trennungs- und Abstraktionsprinzip, Aufbau des BGB, Bestandteile der Willenserklärung, Bedeutung des Privatrechts fürs Steuerrecht.",
    "**Teil B – Sachverhaltsbearbeitung** (ca. 90 Minuten) **im Gutachtenstil**: fast immer ein Zahlungsanspruch aus § 433 Abs. 2 BGB mit **Stellvertretung** (Bote oder Vertreter, Minderjährigkeit und § 165 BGB, Offenkundigkeit, Vollmacht), dazu Angebot/invitatio, Anfechtung oder ein Deliktsfall (§ 823 BGB mit § 828 BGB).",
    "Mitunter **Teil C – Gesetzesverständnis**: Normen im Gesetz finden und erklären (z. B. Ziel- und Dauerschuldverhältnisse und ihre Beendigung, § 311b BGB und § 925 BGB).",
    "Bewertet werden auch **Sachverhaltsermittlung** (nur das Relevante herausarbeiten), **Obersatz**, **Definitionen**, **Subsumtion** und die Darstellung (Begründung, Klarheit, Ausdruck).",
  ],
  top: ["pr-stellvertretung", "pr-vertragsschluss", "pr-geschaeftsfaehigkeit", "pr-willenserklaerung", "pr-anfechtung", "pr-rechtsgeschaefte", "pr-rechtssubjekte", "pr-gesetzlich"],
  tipps: [
    "Obersatz mit allem: „V könnte gegen K einen Anspruch auf Zahlung von 500 € aus § 433 Abs. 2 BGB haben. Dann müsste der Anspruch entstanden, nicht erloschen und durchsetzbar sein.“",
    "Beim Angebot immer die Definition schreiben (empfangsbedürftige Willenserklärung, essentialia negotii, einfaches „Ja“) – und Inserate oder Auslagen als invitatio ad offerendum aussortieren, mit Begründung (Rechtsbindungswille).",
    "Stellvertretung in vier Punkten: Zulässigkeit – eigene Willenserklärung (Abgrenzung Bote) – im fremden Namen – Vertretungsmacht. Ist der Vertreter minderjährig: Schutzzweck der §§ 104 ff. BGB erklären, dann § 165 BGB.",
    "Argumente der Beteiligten im Sachverhalt sind Hinweise auf Probleme – jedes Argument aufgreifen und würdigen.",
    "Problemlose Punkte (Erlöschen, Durchsetzbarkeit) kurz im Urteilsstil abschließen – aber nicht weglassen.",
  ],
};
