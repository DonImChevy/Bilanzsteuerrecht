// Kompaktwissen Bewertungsrecht und Vermögensbesteuerung (GS I bis zur Klausur, Rechtsstand 2026) – eigene Zusammenfassungen.
// Felder: satz, zahlen [[Wert, Bedeutung]], punkte, schema, fallen. **fett**; Normzitate werden in der App antippbar.

export const KOMPAKT_BEWR = {
  "bew-vorgaenge": {
    satz: "Die Erbschaftsteuer besteuert die **Bereicherung des einzelnen Erwerbers** – von Todes wegen oder durch Schenkung; für Schenkungen gelten die Regeln über Erwerbe von Todes wegen entsprechend.",
    zahlen: [["4", "steuerpflichtige Vorgänge (§ 1 Abs. 1 ErbStG)"], ["30 Jahre", "Ersatzerbschaftsteuer der Familienstiftung"]],
    punkte: [
      "**Steuerpflichtige Vorgänge** (§ 1 Abs. 1 ErbStG): Erwerb von Todes wegen, Schenkung unter Lebenden, Zweckzuwendung, Familienstiftung alle 30 Jahre. Vorschriften über Erwerbe von Todes wegen gelten auch für Schenkungen (§ 1 Abs. 2 ErbStG).",
      "**Erwerbe von Todes wegen** (§ 3 Abs. 1 ErbStG): Erbanfall (§ 1922 BGB), Vermächtnis, **geltend gemachter** Pflichtteil, Schenkung auf den Todesfall, Vertrag zugunsten Dritter (z. B. Lebensversicherung an Bezugsberechtigte).",
      "**Freigebige Zuwendung** (§ 7 Abs. 1 Nr. 1 ErbStG): objektiv Bereicherung **auf Kosten** des Zuwendenden, subjektiv Wille zur Unentgeltlichkeit. Bei Gegenleistung (z. B. Schuldübernahme) ist nur die Bereicherung steuerpflichtig (gemischte Schenkung).",
      "**Erbanfallsteuer:** Jeder Erwerber wird für sich besteuert – eigene Steuerklasse, eigener Freibetrag, eigener Satz (§ 10 Abs. 1 S. 1 ErbStG).",
    ],
    fallen: [
      "Ein **nicht geltend gemachter** Pflichtteil ist kein Erwerb.",
      "Ein Verkauf zum Marktpreis ist keine Schenkung – es fehlt die Bereicherung.",
    ],
  },
  "bew-pflicht": {
    satz: "**Unbeschränkt** steuerpflichtig ist der gesamte Erwerb, wenn **einer** der Beteiligten Inländer ist; sonst besteht nur **beschränkte** Steuerpflicht für Inlandsvermögen nach § 121 BewG.",
    zahlen: [["5 Jahre", "erweiterte unbeschränkte Steuerpflicht deutscher Staatsangehöriger"], ["10 %", "Mindestbeteiligung für Inlandsvermögen bei Kapitalgesellschaften (§ 121 Nr. 4 BewG)"]],
    schema: [
      "Ist der **Erblasser/Schenker** oder der **Erwerber** Inländer? (§ 2 Abs. 1 Nr. 1 ErbStG) → unbeschränkt, gesamter Vermögensanfall",
      "Inländer: **Wohnsitz** (§ 8 AO) oder **gewöhnlicher Aufenthalt** (§ 9 AO) im Inland; **Deutsche** bis fünf Jahre nach Wegzug ohne Wohnsitz",
      "Sonst: Liegt **Inlandsvermögen** nach § 121 BewG vor? → beschränkt (§ 2 Abs. 1 Nr. 3 ErbStG)",
      "Sonst: keine deutsche Steuerpflicht",
    ],
    punkte: [
      "**Maßgebende Zeitpunkte:** Erblasser zur Zeit des Todes, Schenker zur Zeit der Ausführung, Erwerber zur Zeit der Entstehung der Steuer (§ 2 Abs. 1 Nr. 1 S. 1 ErbStG).",
      "**Inlandsvermögen** (§ 121 BewG): inländisches Grund- und Betriebsvermögen, Anteile an inländischen Kapitalgesellschaften ab 10 %, grundpfandrechtlich gesicherte Forderungen – **nicht** gewöhnliche Bankguthaben.",
      "**Beschränkte Steuerpflicht:** Freibetrag wird um den Anteil des nicht steuerpflichtigen Vermögens gekürzt (§ 16 Abs. 2 ErbStG); nur zugehörige Schulden abzugsfähig (§ 10 Abs. 6 S. 2 ErbStG).",
    ],
    fallen: [
      "Die **Staatsangehörigkeit** allein begründet keine Steuerpflicht – sie zählt nur für die Fünfjahresfrist.",
      "Es reicht, wenn **nur der Erwerber** Inländer ist – dann ist auch Auslandsvermögen steuerpflichtig.",
    ],
  },
  "bew-stichtag": {
    satz: "Die Steuer entsteht beim Erbfall mit dem **Tod**, bei Schenkungen mit der **Ausführung** der Zuwendung – und dieser Tag ist zugleich **Bewertungsstichtag** (§ 11 ErbStG).",
    punkte: [
      "**Erbfall:** Tod des Erblassers (§ 9 Abs. 1 Nr. 1 ErbStG); Pflichtteil erst mit **Geltendmachung** (Buchst. b); bedingte Erwerbe mit Eintritt der Bedingung (Buchst. a).",
      "**Schenkung:** Ausführung der Zuwendung (§ 9 Abs. 1 Nr. 2 ErbStG) – Geld mit Gutschrift; Grundstück nach Verwaltungsauffassung, sobald **Auflassung** (§ 925 BGB) und **Eintragungsbewilligung** vorliegen, nicht erst mit der Eintragung.",
      "**Stichtagsprinzip:** Wertänderungen nach dem Stichtag bleiben unberücksichtigt (§ 11 ErbStG) – Kursverluste nach dem Tod mindern den Wert nicht.",
    ],
    fallen: [
      "Erbschein, Steuererklärung oder Festsetzung verschieben den Stichtag **nicht**.",
      "Bei Schenkungen ist das bloße **Versprechen** noch keine Ausführung.",
    ],
  },
  "bew-erwerb": {
    satz: "Steuerpflichtiger Erwerb = **Vermögensanfall nach Steuerwerten** − Befreiungen − Nachlassverbindlichkeiten − Freibeträge, abgerundet auf volle **100 €**.",
    zahlen: [["15.000 €", "Pauschbetrag für Bestattungs- und Abwicklungskosten (§ 10 Abs. 5 Nr. 3 S. 2 ErbStG)"], ["100 €", "Abrundung des steuerpflichtigen Erwerbs"]],
    schema: [
      "Vermögensanfall nach Steuerwerten (§ 12 ErbStG)",
      "− sachliche Befreiungen (§§ 13, 13a, 13d ErbStG)",
      "− Nachlassverbindlichkeiten (§ 10 Abs. 5 ErbStG), gekürzt nach § 10 Abs. 6, 6a ErbStG",
      "= **Bereicherung** (§ 10 Abs. 1 ErbStG)",
      "− persönliche Freibeträge (§§ 16, 17 ErbStG)",
      "= **steuerpflichtiger Erwerb**, abgerundet auf volle 100 € (§ 10 Abs. 1 S. 6 ErbStG)",
    ],
    punkte: [
      "**Nachlassverbindlichkeiten** (§ 10 Abs. 5 ErbStG): Erblasserschulden (Nr. 1), Vermächtnisse, Auflagen, geltend gemachte Pflichtteile (Nr. 2), Bestattung, Grabdenkmal, Grabpflege, Abwicklung (Nr. 3) – **ohne Nachweis 15.000 €**.",
      "**Nicht abzugsfähig:** Kosten der Nachlass**verwaltung**, die **eigene** Erbschaftsteuer (§ 10 Abs. 8 ErbStG), Schulden, soweit der zugehörige Gegenstand **steuerbefreit** ist (§ 10 Abs. 6a ErbStG, ab 2025).",
      "**§ 13d-Grundstück:** zugehörige Schuld nur zu **90 %** abzugsfähig; bei § 13a ErbStG im Verhältnis Wert nach/vor Verschonung (§ 10 Abs. 6a S. 2 ErbStG).",
      "**Grundstücksbezogene Belastungen,** die schon den Grundbesitzwert gemindert haben (z. B. im Gutachten nach § 198 BewG), sind nicht nochmals abziehbar (§ 10 Abs. 6b ErbStG).",
    ],
    fallen: [
      "Pauschbetrag **und** Einzelnachweis gibt es nicht nebeneinander – der höhere Betrag zählt.",
      "Abgerundet wird **nach** Abzug der Freibeträge, nicht vorher.",
    ],
  },
  "bew-klassen": {
    satz: "Die **Steuerklasse** folgt dem Verwandtschaftsverhältnis zum Erblasser oder Schenker – sie bestimmt **Freibetrag** und **Steuersatz**.",
    zahlen: [["500.000 €", "Ehegatte, Lebenspartner"], ["400.000 €", "Kinder, Stiefkinder, Kinder verstorbener Kinder"], ["200.000 €", "Enkel"], ["100.000 €", "übrige Klasse I (Eltern beim Erbfall)"], ["20.000 €", "Klasse II und III"], ["256.000 €", "Versorgungsfreibetrag Ehegatte (§ 17 ErbStG)"]],
    punkte: [
      "**Klasse I** (§ 15 Abs. 1 ErbStG): Ehegatte, Lebenspartner, Kinder, Stiefkinder, deren Abkömmlinge, **Eltern bei Erwerb von Todes wegen**.",
      "**Klasse II:** Eltern bei Schenkung, Geschwister, Nichten/Neffen, Stiefeltern, Schwiegerkinder, Schwiegereltern, geschiedener Ehegatte. **Klasse III:** alle übrigen, z. B. Lebensgefährte, Cousin.",
      "**Versorgungsfreibetrag** nur bei Erwerben **von Todes wegen** (§ 17 ErbStG): Ehegatte 256.000 €, Kinder gestaffelt nach Alter 52.000 € bis 10.300 € (bis 27 Jahre); Kürzung um den Kapitalwert steuerfreier Hinterbliebenenbezüge.",
    ],
    fallen: [
      "Eltern: beim **Erbfall** Klasse I (100.000 €), bei **Schenkung** Klasse II (20.000 €).",
      "Der **Lebensgefährte** ohne Ehe oder eingetragene Partnerschaft ist Klasse III.",
    ],
  },
  "bew-befreiungen": {
    satz: "Hausrat und andere bewegliche Gegenstände bleiben bis zu **Freibeträgen** steuerfrei; der Rückfall geschenkten Vermögens an Eltern und übliche Gelegenheitsgeschenke sind ganz befreit.",
    zahlen: [["41.000 €", "Hausrat, Klasse I"], ["12.000 €", "andere bewegliche Gegenstände, Klasse I"], ["12.000 €", "Hausrat und andere bewegliche Gegenstände zusammen, Klassen II und III"]],
    punkte: [
      "**Hausrat** (§ 13 Abs. 1 Nr. 1 ErbStG): Klasse I Hausrat bis 41.000 € (a) **plus** andere bewegliche Gegenstände bis 12.000 € (b); Klassen II/III zusammen 12.000 € (c). Nur der **übersteigende** Teil ist steuerpflichtig.",
      "**Ausgenommen** (§ 13 Abs. 1 Nr. 1 S. 2 ErbStG): Zahlungsmittel, Wertpapiere, **Münzen, Edelmetalle, Edelsteine, Perlen** und Gegenstände des Grund- oder Betriebsvermögens.",
      "**Rückfall** (§ 13 Abs. 1 Nr. 10 ErbStG): Was Eltern oder Voreltern ihren Abkömmlingen geschenkt haben und **von Todes wegen** an sie zurückfällt, ist steuerfrei.",
      "**Gelegenheitsgeschenke** (§ 13 Abs. 1 Nr. 14 ErbStG): übliche Geschenke zu Geburtstag, Hochzeit, Weihnachten – Maßstab sind Anlass und Vermögensverhältnisse, keine feste Grenze.",
    ],
    fallen: [
      "Eine **Münzsammlung** ist kein befreiter beweglicher Gegenstand.",
      "Die Rückfallbefreiung gilt **nicht** für eine Rückschenkung unter Lebenden.",
    ],
  },
  "bew-familienheim": {
    satz: "Das **Familienheim** bleibt steuerfrei – unter Ehegatten auch zu Lebzeiten und ohne Wertgrenze, von Todes wegen nur bei **Selbstnutzung für zehn Jahre**, bei Kindern bis **200 m²**.",
    zahlen: [["10 Jahre", "Selbstnutzung nach Erbfall (Nr. 4b, 4c)"], ["200 m²", "Flächengrenze für Kinder (Nr. 4c)"]],
    punkte: [
      "**Nr. 4a – Schenkung unter Ehegatten/Lebenspartnern:** bebautes Grundstück (§ 181 Abs. 1 Nr. 1–5 BewG) im Inland, in der EU oder im EWR, darin eine selbst bewohnte Wohnung; keine Wert-, Flächen- oder Behaltensgrenze.",
      "**Nr. 4b – Erwerb von Todes wegen durch Ehegatten:** Erblasser hat bis zum Erbfall selbst darin gewohnt (oder war aus **zwingenden Gründen** gehindert); beim Erwerber **unverzüglich** zur Selbstnutzung bestimmt; **zehn Jahre** Selbstnutzung, sonst rückwirkender Wegfall.",
      "**Nr. 4c – Erwerb von Todes wegen durch Kinder:** wie 4b, aber nur **soweit die Wohnfläche 200 m²** nicht übersteigt.",
      "Nur der **selbst bewohnte** Teil ist befreit; vermietete Wohnungen im selben Haus können unter § 13d ErbStG fallen.",
    ],
    fallen: [
      "**Ferienhaus** oder Zweitwohnung ist kein Familienheim.",
      "Grundstück in der **Schweiz** oder in einem anderen Drittstaat: keine Befreiung.",
      "Kein Familienheim für Lebensgefährten oder Geschwister.",
    ],
  },
  "bew-wohnraum": {
    satz: "Zu Wohnzwecken **vermietete** Grundstücke werden nur mit **90 %** angesetzt; bei gemischter Nutzung wird nach Flächen aufgeteilt, und zugehörige Schulden sind nur zu 90 % abzugsfähig.",
    zahlen: [["90 %", "Wertansatz (§ 13d Abs. 1 ErbStG)"]],
    punkte: [
      "**Voraussetzungen** (§ 13d Abs. 3 ErbStG): bebaut, **zu Wohnzwecken vermietet**, Inland/EU/EWR (Drittstaat nur bei Amtshilfe), **nicht** begünstigtes Betriebsvermögen nach § 13a ErbStG.",
      "**Aufteilung** des Grundbesitzwerts nach dem Verhältnis der Wohnfläche der vermieteten Wohnungen zur gesamten Wohn-/Nutzfläche; nur der Wohnanteil erhält den Abschlag.",
      "**Schulden:** soweit das Grundstück befreit ist, nicht abzugsfähig (§ 10 Abs. 6a S. 1 ErbStG) → Schuld × Wert nach / Wert vor § 13d ErbStG.",
      "**Weitergabeverpflichtung:** keine Befreiung, soweit das Grundstück an Dritte übertragen werden muss (§ 13d Abs. 2 ErbStG).",
    ],
    fallen: [
      "Selbst genutzte oder **gewerblich** vermietete Flächen erhalten den Abschlag nicht.",
      "Abschlag **10 %** – nicht 15 % wie beim Betriebsvermögen.",
    ],
  },
  "bew-betrieb": {
    satz: "Begünstigtes Betriebsvermögen ist zu **85 %** (Regelverschonung) oder auf Antrag zu **100 %** (Option, Verwaltungsvermögen höchstens 20 %) steuerfrei – schädliches Verwaltungsvermögen bleibt voll steuerpflichtig.",
    zahlen: [["85 %", "Verschonungsabschlag Regelverschonung"], ["100 %", "Optionsverschonung"], ["150.000 €", "Abzugsbetrag, abschmelzend um 50 % des Mehrbetrags"], ["25 %", "Mindestbeteiligung KapG (mehr als)"], ["10 %", "unschädliches Verwaltungsvermögen"], ["20 % / 90 %", "Grenze Option / volle Versagung"], ["26 Mio. €", "Grenze der Regelverschonung"]],
    schema: [
      "**Begünstigungsfähig?** (§ 13b Abs. 1 ErbStG) – Betrieb, Mitunternehmeranteil, KapG-Anteil > 25 %",
      "Verwaltungsvermögen **≥ 90 %** → nichts begünstigt (§ 13b Abs. 2 S. 2 ErbStG)",
      "**Unschädlich:** 10 % von (gemeiner Wert − Nettoverwaltungsvermögen) (§ 13b Abs. 7 ErbStG); schädlich = Rest",
      "**Begünstigt** = gemeiner Wert − schädliches Verwaltungsvermögen (§ 13b Abs. 2 S. 1 ErbStG)",
      "**Regelverschonung** 85 % → Rest 15 % − Abzugsbetrag 150.000 € (− 50 % des Mehrbetrags) (§ 13a Abs. 1, 2 ErbStG) – oder **Option** 100 % bei Verwaltungsvermögen ≤ 20 % (§ 13a Abs. 10 ErbStG)",
      "Steuerpflichtig = verbleibendes begünstigtes Vermögen + **schädliches Verwaltungsvermögen**",
    ],
    punkte: [
      "**KapG-Anteile:** Sitz oder Geschäftsleitung im Inland/EU/EWR, **Erblasser oder Schenker** unmittelbar zu **mehr als 25 %** beteiligt (§ 13b Abs. 1 Nr. 3 ErbStG).",
      "**Verwaltungsvermögen** (§ 13b Abs. 4 ErbStG): u. a. an Dritte überlassene Grundstücke, KapG-Anteile bis 25 %, Kunst, Münzen, Oldtimer, Wertpapiere, Finanzmittel über 15 %.",
      "**Abzugsbetrag:** ab 450.000 € Rest entfällt er; nur einmal in zehn Jahren von derselben Person (§ 13a Abs. 2 S. 3 ErbStG).",
    ],
    fallen: [
      "Die Option ist **unwiderruflich** und scheitert schon bei 20,1 % Verwaltungsvermögen.",
      "Maßgebend für die 25 % ist die Beteiligung des **Schenkers**, nicht die des Erwerbers.",
    ],
  },
  "bew-steuer": {
    satz: "Die Steuer ergibt sich aus **Steuerklasse und Wertstufe**; knapp über einer Wertgrenze begrenzt der **Härteausgleich** die Mehrsteuer.",
    zahlen: [["7–30 %", "Steuerklasse I"], ["15–43 %", "Steuerklasse II"], ["30 / 50 %", "Steuerklasse III"], ["50 €", "Kleinbetragsgrenze (§ 22 ErbStG)"]],
    schema: [
      "Satz nach § 19 Abs. 1 ErbStG (Tabelle) auf den **ganzen** steuerpflichtigen Erwerb",
      "**Härteausgleich?** Steuer an der letzten Wertgrenze + **½** (Satz bis 30 %) bzw. **¾** (Satz über 30 %) des übersteigenden Betrags (§ 19 Abs. 3 ErbStG)",
      "Festzusetzen ist der **niedrigere** der beiden Beträge",
      "Steuer bis 50 €: keine Festsetzung (§ 22 ErbStG)",
    ],
    punkte: [
      "**Wertstufen:** bis 75.000 € – 300.000 € – 600.000 € – 6 Mio. € – 13 Mio. € – 26 Mio. € – darüber.",
      "**Beispiel Härteausgleich** Klasse I, 75.800 €: 11 % = 8.338 €; 75.000 € × 7 % = 5.250 € + ½ × 800 € = 400 € → **5.650 €**.",
      "**Steuerschuldner** (§ 20 Abs. 1 ErbStG): der Erwerber, bei Schenkungen **auch der Schenker** – Gesamtschuldner (§ 44 AO).",
    ],
    fallen: [
      "Der Steuersatz gilt für den **ganzen** Erwerb, nicht stufenweise wie bei der Einkommensteuer.",
      "Härteausgleich prüfen, sobald ein Erwerb **knapp** über einer Wertgrenze liegt.",
    ],
  },
  "bew-allgemein": {
    satz: "Allgemeiner Maßstab ist der **gemeine Wert** – der Preis im gewöhnlichen Geschäftsverkehr ohne ungewöhnliche oder persönliche Verhältnisse; Forderungen gelten mit dem **Nennwert**, Aktien mit dem **niedrigsten Kurs** am Stichtag.",
    punkte: [
      "**Gemeiner Wert** (§ 9 BewG): erzielbarer Veräußerungspreis; alle preisbeeinflussenden Umstände zählen, **ungewöhnliche oder persönliche** nicht (auch keine Verfügungsbeschränkungen aus letztwilligen Anordnungen, § 9 Abs. 3 BewG).",
      "**Teilwert** (§ 10 BewG): Anteil am Gesamtkaufpreis bei **Fortführung** des Unternehmens.",
      "**Wertpapiere** (§ 11 Abs. 1 BewG): niedrigster Kurs am Stichtag im regulierten Markt; **nicht notierte Anteile** (§ 11 Abs. 2 BewG): Verkäufe < 1 Jahr, sonst Ertragsaussichten, mindestens **Substanzwert**.",
      "**Kapitalforderungen und Schulden** (§ 12 Abs. 1 BewG): Nennwert, außer besondere Umstände.",
      "**Wirtschaftliche Einheit** (§ 2 BewG): nach Verkehrsauffassung, nur Wirtschaftsgüter **desselben Eigentümers**; Zurechnung nach § 39 AO.",
      "**Ausländischer Grundbesitz:** gemeiner Wert nach § 31 BewG (§ 12 Abs. 7 ErbStG).",
    ],
    fallen: [
      "Der Erinnerungs- oder Liebhaberwert erhöht den gemeinen Wert nicht.",
      "Bei Aktien zählt der **niedrigste**, nicht der Schlusskurs.",
    ],
  },
  "bew-grundbesitz": {
    satz: "Inländischer Grundbesitz wird nur **bei Bedarf** bewertet und **gesondert festgestellt**; unbebaute Grundstücke sind **Fläche × Bodenrichtwert**.",
    punkte: [
      "**Feststellung** (§ 12 Abs. 3 ErbStG, § 151 Abs. 1 S. 1 Nr. 1 BewG): Grundlagenbescheid für den Erbschaftsteuerbescheid; Verhältnisse und Wertverhältnisse **am Stichtag** (§ 157 Abs. 1 BewG); Verfahren nach §§ 176–198 BewG (§ 157 Abs. 3 BewG).",
      "**Grundvermögen** (§ 176 BewG): Grund und Boden, Gebäude, Bestandteile, Zubehör, Erbbaurecht, Wohnungseigentum – **ohne** Bodenschätze und Betriebsvorrichtungen.",
      "**Unbebaut** (§ 178 BewG): kein benutzbares Gebäude; benutzbar ab **Bezugsfertigkeit** (Zumutbarkeit, nicht Bauabnahme); Ruinen und dauerhaft unbenutzbare Gebäude gelten als unbebaut.",
      "**Bodenwert** (§ 179 BewG): Fläche × Bodenrichtwert, und zwar der Wert, der **zuletzt vor dem Stichtag zu ermitteln** war – auch wenn er erst später veröffentlicht wird.",
      "**Typisierung:** Besonderheiten und Belastungen bleiben außer Betracht (§ 177 Abs. 4 BewG) – Ausweg ist § 198 BewG.",
    ],
    fallen: [
      "Nicht der zuletzt **mitgeteilte**, sondern der zuletzt **zu ermittelnde** Bodenrichtwert zählt.",
      "Ein Rohbau ist noch **unbebaut**.",
    ],
  },
  "bew-bebaut": {
    satz: "Erst die **Grundstücksart** (§ 181 BewG) bestimmt das **Verfahren** (§ 182 BewG): Vergleichswert für Wohnungseigentum und Ein-/Zweifamilienhäuser, Ertragswert für Mietwohn-, Geschäfts- und gemischt genutzte Grundstücke mit üblicher Miete, sonst Sachwert.",
    zahlen: [["2", "Wohnungen höchstens im Ein-/Zweifamilienhaus"], ["> 80 %", "Wohnzwecke → Mietwohngrundstück"], ["> 80 %", "betriebliche Zwecke → Geschäftsgrundstück"], ["< 50 %", "Mitbenutzung im Ein-/Zweifamilienhaus unschädlich"], ["20 m²", "Mindestgröße einer Wohnung (Regel)"]],
    schema: [
      "Benutzbares Gebäude? → bebautes Grundstück (§ 180 BewG)",
      "Grundstücksart nach Wohn- und Nutzfläche bestimmen (§ 181 BewG)",
      "Verfahren: Vergleichswert (§ 182 Abs. 2 BewG, § 183 BewG) – Ertragswert (§ 182 Abs. 3 BewG, §§ 184–188 BewG) – Sachwert (§ 182 Abs. 4 BewG)",
    ],
    punkte: [
      "**Vergleichswertverfahren** (§ 183 BewG): Kaufpreise vergleichbarer Grundstücke, vorrangig Vergleichspreise des Gutachterausschusses; alternativ **Vergleichsfaktoren** je m² – beziehen sie sich nur aufs Gebäude, kommt der **Bodenwert** hinzu.",
      "**Geschäfts- und gemischt genutzte Grundstücke:** Ertragswert nur, wenn sich eine **übliche Miete** ermitteln lässt – sonst Sachwert.",
      "**Wohnung** (§ 181 Abs. 9 BewG): abgeschlossen, eigener Zugang, Küche, Bad/Dusche, Toilette.",
    ],
    fallen: [
      "Drei Wohnungen sind **kein** Zweifamilienhaus mehr.",
      "Genau 80 % Wohnfläche reicht **nicht** für ein Mietwohngrundstück (mehr als 80 %).",
    ],
  },
  "bew-ertragswert": {
    satz: "Ertragswert = **Bodenwert + Gebäudeertragswert**; der Gebäudeertragswert ist der um die Bodenwertverzinsung gekürzte Reinertrag, kapitalisiert mit dem **Vervielfältiger** aus Liegenschaftszins und Restnutzungsdauer.",
    zahlen: [["3,5 %", "Liegenschaftszins Mietwohngrundstücke"], ["4,5 %", "gemischt genutzt, gewerblich bis 50 %"], ["5,0 %", "gemischt genutzt, gewerblich über 50 %"], ["6,0 %", "Geschäftsgrundstücke"], ["30 %", "Mindest-Restnutzungsdauer der Gesamtnutzungsdauer"], ["80 Jahre", "Gesamtnutzungsdauer Wohn- und gemischt genutzte Gebäude (Anlage 22)"], ["20 %", "Mietabweichung, ab der die übliche Miete gilt"], ["1 Jahr", "Kaufpreisnachweis vor oder nach dem Stichtag (§ 198 BewG)"]],
    schema: [
      "Bodenwert = Fläche × Bodenrichtwert (§ 184 Abs. 2 BewG, § 179 BewG)",
      "Rohertrag = Jahresnettokaltmiete ohne Umlagen; übliche Miete bei Eigennutzung, Leerstand oder Abweichung > 20 % (§ 186 BewG)",
      "− Bewirtschaftungskosten nach Anlage 23: Verwaltung, Instandhaltung (Wohnen indexiert), Mietausfallwagnis 2 % / 4 % (§ 187 BewG)",
      "= Reinertrag − Bodenwert × Liegenschaftszins (§ 185 Abs. 2 BewG, § 188 BewG) = **Gebäudereinertrag**",
      "× Vervielfältiger (Anlage 21) nach Liegenschaftszins und Restnutzungsdauer = **Gebäudeertragswert** (§ 185 Abs. 3 BewG)",
      "Bodenwert + Gebäudeertragswert = **Ertragswert**, mindestens Bodenwert (§ 184 Abs. 3 BewG)",
    ],
    punkte: [
      "**Bewirtschaftungskosten** (Anlage 23 BewG): Wohnen – Verwaltung 230 € je Wohnung, Instandhaltung 9 € je m², beides **indexiert** mit dem VPI (Oktober Vorjahr ÷ Oktober 2001; Verwaltung auf volle Euro, Instandhaltung auf eine Nachkommastelle), Mietausfall 2 %; Gewerbe – Verwaltung 3 %, Instandhaltung je m² wie Wohnen, Mietausfall 4 % des Rohertrags.",
      "**Restnutzungsdauer** (§ 185 Abs. 3 BewG): Gesamtnutzungsdauer − (Bewertungsjahr − Jahr der Bezugsfertigkeit), **mindestens 30 %** der Gesamtnutzungsdauer; bei **Abbruchverpflichtung** begrenzt auf die tatsächliche Restdauer.",
      "**Liegenschaftszins** (§ 188 BewG): vorrangig vom Gutachterausschuss, sonst 3,5 / 4,5 / 5,0 / 6,0 %.",
      "**§ 198 BewG:** niedrigerer gemeiner Wert durch **Gutachten** (Gutachterausschuss, zertifizierter Sachverständiger) oder **Kaufpreis** innerhalb eines Jahres um den Stichtag – Nachweislast beim Steuerpflichtigen.",
    ],
    fallen: [
      "Betriebskosten-**Umlagen** gehören nicht zum Rohertrag.",
      "Der Vervielfältiger hat **vier** Nachkommastellen – nicht runden.",
      "Die Mindest-Restnutzungsdauer gilt **nicht**, wenn eine Abbruchverpflichtung besteht.",
    ],
  },
};

export const KLAUSUR_BEWR = {
  titel: "Klausur Bewertungsrecht: so holst du die Punkte",
  aufbau: [
    "**120 Minuten**, ein zusammenhängender Sachverhalt (Erbfall oder Schenkung an mehrere Erwerber). Hilfsmittel: Textausgabe Erbschaftsteuer-/Bewertungsrecht, Erbschaftsteuer-Handbuch, BGB, Wichtige Steuergesetze.",
    "**Allgemeiner Teil** für alle Erwerber: steuerpflichtiger Vorgang (§ 1 ErbStG, § 3 ErbStG oder § 7 ErbStG), Entstehung und Stichtag (§§ 9, 11 ErbStG), persönliche Steuerpflicht (§ 2 ErbStG mit § 121 BewG), Steuerklasse und Freibetrag (§§ 15–17 ErbStG), Steuerschuldner (§ 20 ErbStG).",
    "**Bewertung** jedes Vermögensgegenstands: Grundbesitzwert im **Ertragswertverfahren** mit Anlagen 21–23, Auslandsgrundstück nach § 31 BewG, festgestellter Anteilswert, Nennwert, Hausrat.",
    "**Befreiungen:** § 13 Abs. 1 Nr. 1 ErbStG (Hausrat), Nr. 4a–4c (Familienheim), § 13d ErbStG (Wohnraum, Aufteilung nach Flächen) mit Schuldenkürzung nach § 10 Abs. 6a ErbStG, §§ 13a, 13b ErbStG (Verwaltungsvermögen, Regel- oder Optionsverschonung, Abzugsbetrag).",
    "**Steuerberechnung** je Erwerber mit Abrundung (§ 10 Abs. 1 S. 6 ErbStG), Steuersatz (§ 19 Abs. 1 ErbStG) und **Härteausgleich** (§ 19 Abs. 3 ErbStG).",
  ],
  top: ["bew-ertragswert", "bew-pflicht", "bew-betrieb", "bew-wohnraum", "bew-steuer", "bew-klassen", "bew-familienheim", "bew-erwerb"],
  tipps: [
    "Für jeden Erwerber dasselbe Gerüst: Vorgang → Stichtag → Steuerpflicht → Steuerklasse/Freibetrag → Werte → Befreiungen → Schulden → Freibetrag → Abrundung → Steuer.",
    "Ertragswert sauber in Schritten: jeden Zwischenwert mit Norm (§ 184 BewG, § 186 BewG, § 187 BewG mit Anlage 23, § 185 BewG, § 188 BewG, Anlage 21, Anlage 22).",
    "Bei Auslandssachverhalten zuerst prüfen, **wer** Inländer ist – meist entscheidet der Erwerber oder die Fünfjahresfrist.",
    "Ist ein Gutachten oder ein Kaufpreis genannt: an § 198 BewG denken und den niedrigeren Wert ansetzen.",
    "Den Härteausgleich immer prüfen, wenn der Erwerb knapp über 75.000 €, 300.000 € oder 600.000 € liegt.",
  ],
};
