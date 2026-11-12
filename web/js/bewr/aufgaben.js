// Bewertungsrecht und Vermögensbesteuerung (GS I bis zur Klausur) – Teil 1: Erbschaft- und Schenkungsteuer.
// Eigene Sachverhalte, Rechtsstand 2026 (ErbStG zuletzt geändert am 22.06.2026; § 10 Abs. 6a, § 10 Abs. 5 Nr. 3 S. 2 i. d. F. JStG 2024).
// Frage-Antwort-Aufgaben tragen ihre Multiple-Choice-Fassung (mc) und Stichworte für die automatische Prüfung (sw).
import { A, F, M, R, eur } from "../ao/hilfen.js";
import { erbst, abrunden100, verschonung, FREIBETRAG } from "./rechnen.js";
import { BEWR_TEIL2 } from "./aufgaben2.js";

const KL = ["Steuerklasse I", "Steuerklasse II", "Steuerklasse III"];

// ======================================================================= Steuerpflichtige Vorgänge
const vorgaenge = [
  A("bew-vorgang-arten", "bew-vorgaenge",
    "Welche Vorgänge unterliegen der Erbschaft- und Schenkungsteuer? In welchem Verhältnis stehen die Vorschriften über Erwerbe von Todes wegen zu denen über Schenkungen?",
    "• Steuerpflichtig sind nach § 1 Abs. 1 ErbStG: der Erwerb von Todes wegen (Nr. 1), die Schenkungen unter Lebenden (Nr. 2), die Zweckzuwendungen (Nr. 3) und das Vermögen einer Familienstiftung oder eines Familienvereins im Abstand von 30 Jahren (Ersatzerbschaftsteuer, Nr. 4).\n• Nach § 1 Abs. 2 ErbStG gelten die Vorschriften über Erwerbe von Todes wegen auch für Schenkungen, soweit nichts anderes bestimmt ist – ein Gesetz für beide Vorgänge, damit Vermögen nicht steuerfrei zu Lebzeiten übertragen werden kann.\n• Die Erbschaftsteuer ist eine Erbanfallsteuer: Besteuert wird die Bereicherung des einzelnen Erwerbers (§ 10 Abs. 1 S. 1 ErbStG), nicht der Nachlass als Ganzes.",
    ["ErbStG 1 1", "ErbStG 1 2", "ErbStG 10 1"],
    M(["Schenkungen unter Lebenden sind nach § 1 Abs. 1 Nr. 2 ErbStG steuerpflichtig.", "Die Vorschriften über Erwerbe von Todes wegen gelten grundsätzlich auch für Schenkungen.", "Besteuert wird die Bereicherung des einzelnen Erwerbers.", "Zweckzuwendungen unterliegen der Erbschaft- und Schenkungsteuer."],
      ["Schenkungen unterliegen einem eigenen Schenkungsteuergesetz.", "Besteuert wird der Nachlass als Ganzes, unabhängig von der Zahl der Erben.", "Nur Erwerbe über 1 Mio. € sind steuerpflichtig.", "Familienstiftungen sind von der Erbschaftsteuer ausgenommen."],
      "Welche Aussagen zu den steuerpflichtigen Vorgängen sind richtig?"),
    { norm: ["ErbStG 1"], s: ["von todes wegen", "schenkung", "zweckzuwendung", "stiftung|30 jahr", "auch fuer schenkung|gelten auch", "bereicherung|erbanfall"] }),
  A("bew-todes-wegen", "bew-vorgaenge",
    "Nennen Sie die wichtigsten Erwerbe von Todes wegen nach § 3 ErbStG mit den zugehörigen Vorschriften des BGB.",
    "• Erwerb durch Erbanfall (§ 3 Abs. 1 Nr. 1 ErbStG i. V. m. § 1922 BGB): Mit dem Tod geht das Vermögen als Ganzes auf den oder die Erben über (Gesamtrechtsnachfolge).\n• Erwerb durch Vermächtnis (§§ 2147 ff. BGB): schuldrechtlicher Anspruch gegen den Erben auf einen bestimmten Gegenstand.\n• Erwerb auf Grund eines geltend gemachten Pflichtteilsanspruchs (§§ 2303 ff. BGB) – erst die Geltendmachung macht ihn steuerpflichtig (§ 9 Abs. 1 Nr. 1 Buchst. b ErbStG).\n• Schenkung auf den Todesfall (§ 3 Abs. 1 Nr. 2 ErbStG, § 2301 BGB).\n• Vermögensvorteile aus einem Vertrag des Erblassers, die ein Dritter bei dessen Tod unmittelbar erwirbt, z. B. die Lebensversicherung an den Bezugsberechtigten (§ 3 Abs. 1 Nr. 4 ErbStG).",
    ["ErbStG 3 1", "ErbStG 9 1"],
    M(["Der Erwerb durch Erbanfall knüpft an die Gesamtrechtsnachfolge des § 1922 BGB an.", "Ein Pflichtteil ist erst steuerpflichtig, wenn er geltend gemacht wird.", "Die Lebensversicherung an einen Bezugsberechtigten ist ein Erwerb nach § 3 Abs. 1 Nr. 4 ErbStG.", "Der Vermächtnisnehmer erwirbt von Todes wegen."],
      ["Ein Vermächtnis ist eine Schenkung unter Lebenden.", "Der Pflichtteil ist schon mit dem Tod steuerpflichtig, auch wenn er nie verlangt wird.", "Nur der gesetzliche Erbe erwirbt von Todes wegen, nicht der testamentarische.", "Die Auszahlung einer Lebensversicherung ist nie erbschaftsteuerpflichtig."],
      "Welche Aussagen zu Erwerben von Todes wegen sind richtig?"),
    { norm: ["ErbStG 3"], s: ["erbanfall", "1922", "vermaechtnis", "pflichtteil", "geltend", "versicherung|vertrag"] }),
  A("bew-schenkung", "bew-vorgaenge",
    "Wann liegt eine freigebige Zuwendung im Sinne des § 7 Abs. 1 Nr. 1 ErbStG vor? Was gilt, wenn der Beschenkte eine Gegenleistung erbringt?",
    "• Freigebige Zuwendung = jede Zuwendung unter Lebenden, soweit der Bedachte durch sie auf Kosten des Zuwendenden bereichert wird (§ 7 Abs. 1 Nr. 1 ErbStG).\n• Objektiv: Vermögensverschiebung – der Zuwendende wird ärmer, der Bedachte reicher (Bereicherung auf Kosten des Zuwendenden).\n• Subjektiv: Wille zur Unentgeltlichkeit (freigebig) – der Zuwendende weiß, dass er nicht zu einer Leistung verpflichtet ist und keine gleichwertige Gegenleistung erhält.\n• Gegenleistung, z. B. Übernahme einer durch Grundschuld gesicherten Darlehensschuld: gemischte Schenkung – steuerpflichtig ist nur die Bereicherung, also der Wert der Zuwendung abzüglich der Gegenleistung.",
    ["ErbStG 7 1"],
    M(["Eine freigebige Zuwendung setzt eine Bereicherung des Bedachten auf Kosten des Zuwendenden voraus.", "Subjektiv muss der Zuwendende unentgeltlich zuwenden wollen.", "Übernimmt der Beschenkte eine Schuld, mindert das seine Bereicherung.", "Eine Geldschenkung unter Lebenden fällt unter § 7 Abs. 1 Nr. 1 ErbStG."],
      ["Eine Schenkung liegt nur vor, wenn ein notarieller Vertrag geschlossen wurde.", "Bei einer Gegenleistung liegt nie eine Schenkung vor.", "Der Zuwendende muss durch die Zuwendung reicher werden.", "Freigebig ist eine Zuwendung nur zwischen Verwandten."],
      "Welche Aussagen zur freigebigen Zuwendung sind richtig?"),
    { norm: ["ErbStG 7"], s: ["bereicher", "auf kosten", "unentgeltlich|freigebig", "aermer|vermoegensverschieb", "gegenleistung", "gemischte"] }),
  F("bew-vorgang-fall", "bew-vorgaenge", "Wie ist der Vorgang erbschaftsteuerlich einzuordnen?",
    ["Erwerb von Todes wegen (§ 3 ErbStG)", "Schenkung unter Lebenden (§ 7 ErbStG)", "Kein steuerpflichtiger Erwerb"], [
      { text: "Tochter T wird Alleinerbin ihres verstorbenen Vaters.", richtig: 0, erkl: "Erwerb durch Erbanfall, § 3 Abs. 1 Nr. 1 ErbStG i. V. m. § 1922 BGB.", normen: ["ErbStG 3 1"] },
      { text: "Der Erblasser vermacht seinem Patenkind testamentarisch seine Uhrensammlung.", richtig: 0, erkl: "Vermächtnis (§§ 2147 ff. BGB) → Erwerb von Todes wegen, § 3 Abs. 1 Nr. 1 ErbStG.", normen: ["ErbStG 3 1"] },
      { text: "Der enterbte Sohn verlangt von der Erbin schriftlich seinen Pflichtteil.", richtig: 0, erkl: "Geltend gemachter Pflichtteilsanspruch, § 3 Abs. 1 Nr. 1 ErbStG; Steuer entsteht mit der Geltendmachung (§ 9 Abs. 1 Nr. 1 Buchst. b ErbStG).", normen: ["ErbStG 3 1", "ErbStG 9 1"] },
      { text: "Die enterbte Tochter verzichtet darauf, ihren Pflichtteil zu verlangen.", richtig: 2, erkl: "Nur der geltend gemachte Pflichtteil ist ein Erwerb (§ 3 Abs. 1 Nr. 1 ErbStG); ohne Geltendmachung erwirbt sie nichts.", normen: ["ErbStG 3 1"] },
      { text: "Nach dem Tod ihres Lebensgefährten erhält Frau L als Bezugsberechtigte die Auszahlung seiner Lebensversicherung.", richtig: 0, erkl: "Vermögensvorteil aus einem vom Erblasser geschlossenen Vertrag, den ein Dritter bei dessen Tod unmittelbar erwirbt, § 3 Abs. 1 Nr. 4 ErbStG.", normen: ["ErbStG 3 1"] },
      { text: "Ein Großvater überweist seinem Enkel zum Studienbeginn 30.000 € ohne Gegenleistung.", richtig: 1, erkl: "Freigebige Zuwendung, § 7 Abs. 1 Nr. 1 ErbStG.", normen: ["ErbStG 7 1"] },
      { text: "Der Sohn erhält von seinem Vater 50.000 € als Abfindung dafür, dass er auf sein künftiges Erbe verzichtet.", richtig: 1, erkl: "Abfindung für einen Erbverzicht, § 7 Abs. 1 Nr. 5 ErbStG.", normen: ["ErbStG 7 1"] },
      { text: "Eine Mutter verkauft ihrem Sohn ein Auto zum üblichen Marktpreis.", richtig: 2, erkl: "Voll entgeltlich – keine Bereicherung auf Kosten der Mutter, also keine freigebige Zuwendung (§ 7 Abs. 1 Nr. 1 ErbStG).", normen: ["ErbStG 7 1"] },
    ]),
  A("bew-erbanfallsteuer", "bew-vorgaenge",
    "Warum wird die Erbschaftsteuer als Erbanfallsteuer bezeichnet, und welche Folgen hat das bei mehreren Erben?",
    "• Besteuert wird nicht der Nachlass als solcher, sondern die Bereicherung jedes einzelnen Erwerbers (§ 10 Abs. 1 S. 1 ErbStG).\n• Bei mehreren Erben ist für jeden Erwerber gesondert zu rechnen: eigener Anteil am Nachlass, eigene Steuerklasse (§ 15 ErbStG), eigener Freibetrag (§ 16 ErbStG), eigener Steuersatz (§ 19 ErbStG).\n• Folge: Je enger das Verwandtschaftsverhältnis und je kleiner der einzelne Erwerb, desto geringer die Steuer – Verteilung auf mehrere Erwerber senkt wegen der Freibeträge und der Progression die Gesamtbelastung.",
    ["ErbStG 10 1", "ErbStG 15 1", "ErbStG 16 1"],
    M(["Besteuert wird die Bereicherung jedes einzelnen Erwerbers.", "Jeder Erbe hat seinen eigenen persönlichen Freibetrag.", "Steuerklasse und Steuersatz werden für jeden Erwerber gesondert bestimmt.", "Die Verteilung auf mehrere Erwerber kann die Gesamtsteuer senken."],
      ["Die Erbengemeinschaft zahlt eine gemeinsame Steuer auf den gesamten Nachlass.", "Der Freibetrag steht dem Nachlass nur einmal zu.", "Der Steuersatz richtet sich nach der Höhe des gesamten Nachlasses.", "Die Steuerklasse richtet sich nach dem ältesten Erben."],
      "Welche Aussagen zur Erbanfallsteuer sind richtig?"),
    { norm: ["ErbStG 10"], s: ["bereicherung", "einzeln|jede", "nachlass", "freibetrag", "steuerklasse", "progression|steuersatz"] }),
];

// ======================================================================= Persönliche Steuerpflicht
const pflicht = [
  A("bew-unbeschraenkt", "bew-pflicht",
    "Wann besteht unbeschränkte Erbschaft- bzw. Schenkungsteuerpflicht, und was umfasst sie? Wer gilt als Inländer?",
    "• Unbeschränkte Steuerpflicht besteht, wenn der Erblasser zur Zeit seines Todes, der Schenker zur Zeit der Ausführung der Schenkung oder der Erwerber zur Zeit der Entstehung der Steuer ein Inländer ist (§ 2 Abs. 1 Nr. 1 S. 1 ErbStG). Es genügt, dass einer der Beteiligten Inländer ist.\n• Sie erfasst den gesamten Vermögensanfall – auch Auslandsvermögen (Weltvermögen).\n• Inländer sind natürliche Personen mit Wohnsitz (§ 8 AO) oder gewöhnlichem Aufenthalt (§ 9 AO) im Inland (Buchst. a), deutsche Staatsangehörige, die sich nicht länger als fünf Jahre dauernd im Ausland aufhalten, ohne im Inland einen Wohnsitz zu haben (Buchst. b, erweiterte unbeschränkte Steuerpflicht), bestimmte Auslandsbedienstete (Buchst. c) sowie Körperschaften mit Sitz oder Geschäftsleitung im Inland (Buchst. d).",
    ["ErbStG 2 1"],
    M(["Unbeschränkte Steuerpflicht besteht schon, wenn nur der Erwerber Inländer ist.", "Die unbeschränkte Steuerpflicht erfasst auch ausländisches Vermögen.", "Ein Deutscher, der vor drei Jahren ins Ausland gezogen ist, gilt noch als Inländer.", "Körperschaften mit Sitz im Inland sind Inländer."],
      ["Erblasser und Erwerber müssen beide Inländer sein.", "Die unbeschränkte Steuerpflicht erfasst nur das Inlandsvermögen.", "Ausländische Staatsangehörige können nie Inländer sein.", "Die Fünfjahresfrist gilt für alle Personen ohne Rücksicht auf die Staatsangehörigkeit."],
      "Welche Aussagen zur unbeschränkten Steuerpflicht sind richtig?"),
    { norm: ["ErbStG 2"], s: ["erblasser", "schenker", "erwerber", "inlaender", "wohnsitz", "gewoehnlich", "fuenf jahre", "gesamte|weltvermoegen"] }),
  A("bew-beschraenkt", "bew-pflicht",
    "Wann besteht beschränkte Steuerpflicht nach dem ErbStG, was wird besteuert, und welche Besonderheit gilt für den Freibetrag?",
    "• Beschränkte Steuerpflicht besteht in allen anderen Fällen, also wenn weder Erblasser/Schenker noch Erwerber Inländer sind (§ 2 Abs. 1 Nr. 3 ErbStG).\n• Besteuert wird nur der Vermögensanfall, der in Inlandsvermögen im Sinne des § 121 BewG besteht – z. B. inländisches Grundvermögen (Nr. 2), inländisches Betriebsvermögen (Nr. 3) und Anteile an inländischen Kapitalgesellschaften bei einer Beteiligung von mindestens einem Zehntel (Nr. 4).\n• Schulden sind nur abziehbar, soweit sie mit dem Inlandsvermögen in wirtschaftlichem Zusammenhang stehen (§ 10 Abs. 6 S. 2 ErbStG).\n• Der Freibetrag nach § 16 Abs. 1 ErbStG wird um den Teil gekürzt, der auf das nicht steuerpflichtige (ausländische) Vermögen entfällt (§ 16 Abs. 2 ErbStG).",
    ["ErbStG 2 1", "BewG 121", "ErbStG 16 2"],
    M(["Bei beschränkter Steuerpflicht wird nur Inlandsvermögen im Sinne des § 121 BewG besteuert.", "Ein inländisches Mietshaus gehört zum Inlandsvermögen.", "Ein GmbH-Anteil gehört zum Inlandsvermögen, wenn die GmbH Sitz oder Geschäftsleitung im Inland hat und der Gesellschafter zu mindestens 10 % beteiligt ist.", "Der Freibetrag wird bei beschränkter Steuerpflicht anteilig gekürzt."],
      ["Ein Bankguthaben bei einer deutschen Bank gehört stets zum Inlandsvermögen.", "Bei beschränkter Steuerpflicht gibt es überhaupt keinen Freibetrag.", "Beschränkte Steuerpflicht besteht, wenn nur der Erwerber Inländer ist.", "Schulden sind bei beschränkter Steuerpflicht nie abziehbar."],
      "Welche Aussagen zur beschränkten Steuerpflicht sind richtig?"),
    { norm: ["ErbStG 2|BewG 121"], s: ["kein|weder", "inlaender", "inlandsvermoegen", "121", "grund", "kapitalgesellschaft|zehntel", "freibetrag"] }),
  F("bew-pflicht-fall", "bew-pflicht", "Welche Steuerpflicht besteht in Deutschland?",
    ["Unbeschränkte Steuerpflicht", "Beschränkte Steuerpflicht (nur Inlandsvermögen)", "Keine Steuerpflicht in Deutschland"], [
      { text: "Die Erblasserin wohnte bis zu ihrem Tod in Hamburg. Ihr Sohn, Erbe, lebt seit 20 Jahren in Kalifornien.", richtig: 0, erkl: "Die Erblasserin war Inländerin (§ 2 Abs. 1 Nr. 1 S. 2 Buchst. a ErbStG) → unbeschränkte Steuerpflicht für den gesamten Erwerb.", normen: ["ErbStG 2 1"] },
      { text: "Ein Spanier mit Wohnsitz in Madrid schenkt seiner Nichte, die in Köln wohnt, eine Ferienwohnung auf Mallorca.", richtig: 0, erkl: "Die Erwerberin ist Inländerin → unbeschränkte Steuerpflicht, auch für die spanische Wohnung (§ 2 Abs. 1 Nr. 1 ErbStG).", normen: ["ErbStG 2 1"] },
      { text: "Ein deutscher Staatsangehöriger zog vor drei Jahren nach Wien und hat seither keinen Wohnsitz in Deutschland. Er schenkt seiner in Wien lebenden österreichischen Freundin Wertpapiere.", richtig: 0, erkl: "Erweiterte unbeschränkte Steuerpflicht: Deutscher, nicht länger als fünf Jahre im Ausland (§ 2 Abs. 1 Nr. 1 S. 2 Buchst. b ErbStG).", normen: ["ErbStG 2 1"] },
      { text: "Ein Deutscher lebt seit zwölf Jahren in Kanada und vererbt seinem dort lebenden kanadischen Sohn ein Mietshaus in Berlin und ein Konto in Toronto.", richtig: 1, erkl: "Niemand ist Inländer (Fünfjahresfrist abgelaufen) → beschränkte Steuerpflicht nur für das Berliner Grundstück (§ 2 Abs. 1 Nr. 3 ErbStG, § 121 Nr. 2 BewG).", normen: ["ErbStG 2 1", "BewG 121"] },
      { text: "Eine Französin mit Wohnsitz in Lyon schenkt ihrer in Paris lebenden Tochter eine Wohnung in Nizza.", richtig: 2, erkl: "Keine Inländerin beteiligt, kein Inlandsvermögen → keine deutsche Steuerpflicht.", normen: ["ErbStG 2 1"] },
      { text: "Ein Niederländer (Wohnsitz Utrecht) schenkt seinem Sohn (Wohnsitz Utrecht) seine 30-%-Beteiligung an einer GmbH mit Sitz und Geschäftsleitung in Bremen.", richtig: 1, erkl: "Anteil an einer inländischen Kapitalgesellschaft bei einer Beteiligung von mindestens 10 % → Inlandsvermögen (§ 121 Nr. 4 BewG), beschränkte Steuerpflicht (§ 2 Abs. 1 Nr. 3 ErbStG).", normen: ["ErbStG 2 1", "BewG 121"] },
      { text: "Eine Italienerin (Wohnsitz Mailand) vererbt ihrer in Mailand lebenden Schwester ein Sparguthaben bei einer Münchener Bank.", richtig: 2, erkl: "Ein Bankguthaben gehört nicht zum Inlandsvermögen nach § 121 BewG (keine der Nummern 1–9) → keine deutsche Steuerpflicht.", normen: ["BewG 121"] },
    ]),
  A("bew-inlandsvermoegen", "bew-pflicht",
    "Was gehört zum Inlandsvermögen nach § 121 BewG? Nennen Sie vier Beispiele und ein Gegenbeispiel.",
    "• Inländisches land- und forstwirtschaftliches Vermögen (§ 121 Nr. 1 BewG) und inländisches Grundvermögen (Nr. 2).\n• Inländisches Betriebsvermögen, wenn im Inland eine Betriebsstätte unterhalten oder ein ständiger Vertreter bestellt ist (Nr. 3).\n• Anteile an einer Kapitalgesellschaft mit Sitz oder Geschäftsleitung im Inland, wenn der Gesellschafter allein oder mit nahestehenden Personen zu mindestens einem Zehntel beteiligt ist (Nr. 4).\n• Durch inländischen Grundbesitz gesicherte Forderungen, z. B. Hypotheken und Grundschulden (Nr. 7); Nutzungsrechte an diesen Gegenständen (Nr. 9).\n• Gegenbeispiel: ein gewöhnliches Bankguthaben bei einer deutschen Bank oder börsennotierte Aktien in Streubesitz – sie fallen unter keine Nummer.",
    ["BewG 121"],
    M(["Ein Grundstück in Leipzig gehört zum Inlandsvermögen.", "Ein 15-%-Anteil an einer GmbH mit Sitz in Hamburg gehört zum Inlandsvermögen.", "Eine durch ein inländisches Grundstück gesicherte Darlehensforderung gehört zum Inlandsvermögen.", "Ein Gewerbebetrieb mit inländischer Betriebsstätte gehört zum Inlandsvermögen."],
      ["Jedes Konto bei einer deutschen Bank gehört zum Inlandsvermögen.", "Ein 5-%-Anteil an einer deutschen AG gehört stets zum Inlandsvermögen.", "Ein Ferienhaus in Dänemark eines Deutschen gehört zum Inlandsvermögen.", "Hausrat in einer inländischen Wohnung gehört stets zum Inlandsvermögen."],
      "Welche Aussagen zum Inlandsvermögen sind richtig?"),
    { norm: ["BewG 121"], s: ["grundvermoegen", "betriebsvermoegen", "betriebsstaette|vertreter", "kapitalgesellschaft", "zehntel|10", "hypothek|grundschuld", "bankguthaben|konto"] }),
];

// ======================================================================= Entstehung und Bewertungsstichtag
const stichtag = [
  A("bew-entstehung", "bew-stichtag",
    "Wann entsteht die Erbschaft- bzw. Schenkungsteuer? Nennen Sie die Grundfälle und die Bedeutung für die Bewertung.",
    "• Erwerb von Todes wegen: grundsätzlich mit dem Tod des Erblassers (§ 9 Abs. 1 Nr. 1 ErbStG).\n• Geltend gemachter Pflichtteil: erst mit der Geltendmachung (§ 9 Abs. 1 Nr. 1 Buchst. b ErbStG).\n• Aufschiebend bedingte oder befristete Erwerbe: mit Eintritt der Bedingung oder des Ereignisses (§ 9 Abs. 1 Nr. 1 Buchst. a ErbStG).\n• Schenkung unter Lebenden: mit der Ausführung der Zuwendung (§ 9 Abs. 1 Nr. 2 ErbStG) – also wenn der Beschenkte das Erhaltene endgültig erlangt hat, bei Geld mit der Gutschrift; bei Grundstücken nach Verwaltungsauffassung, sobald Auflassung (§ 925 BGB) und Eintragungsbewilligung vorliegen.\n• Der Entstehungszeitpunkt ist zugleich Bewertungsstichtag (§ 11 ErbStG): Maßgebend sind die Werte an diesem Tag; spätere Wertänderungen bleiben außer Betracht.",
    ["ErbStG 9 1", "ErbStG 11"],
    M(["Bei Erwerben von Todes wegen entsteht die Steuer grundsätzlich mit dem Tod.", "Bei Schenkungen entsteht die Steuer mit der Ausführung der Zuwendung.", "Für den Pflichtteil entsteht die Steuer erst mit der Geltendmachung.", "Der Zeitpunkt der Entstehung ist zugleich Bewertungsstichtag."],
      ["Die Steuer entsteht erst mit der Abgabe der Steuererklärung.", "Bei Schenkungen ist allein der Tag des Schenkungsversprechens maßgebend.", "Bei Grundstücken entsteht die Steuer erst mit der Eintragung im Grundbuch.", "Wertsteigerungen bis zur Festsetzung sind zu berücksichtigen."],
      "Welche Aussagen zur Entstehung der Steuer sind richtig?"),
    { norm: ["ErbStG 9"], s: ["tod", "pflichtteil", "geltendmach", "ausfuehrung", "auflassung|eintragungsbewilligung", "bewertungsstichtag|11"] }),
  F("bew-stichtag-fall", "bew-stichtag", "Wann entsteht die Steuer (Bewertungsstichtag)?", null, [
      { text: "Vater V stirbt am 14.03.2026. Tochter T ist Alleinerbin; den Erbschein erhält sie am 20.05.2026, die Steuererklärung gibt sie am 01.08.2026 ab.", optionen: ["14.03.2026", "20.05.2026", "01.08.2026", "31.12.2026"], richtig: 0, erkl: "Erwerb durch Erbanfall: Steuer entsteht mit dem Tod (§ 9 Abs. 1 Nr. 1 ErbStG); Erbschein und Erklärung sind ohne Bedeutung.", normen: ["ErbStG 9 1"] },
      { text: "Mutter M stirbt am 02.03.2026. Ihr enterbter Sohn verlangt mit Schreiben vom 10.09.2026 von der Erbin seinen Pflichtteil; gezahlt wird am 15.10.2026.", optionen: ["10.09.2026", "02.03.2026", "15.10.2026", "31.12.2026"], richtig: 0, erkl: "Pflichtteil: Steuer entsteht mit der Geltendmachung (§ 9 Abs. 1 Nr. 1 Buchst. b ErbStG).", normen: ["ErbStG 9 1"] },
      { text: "Onkel O verspricht seiner Nichte am 01.06.2026 schriftlich 20.000 €. Er überweist das Geld am 12.06.2026; auf dem Konto der Nichte wird es am 15.06.2026 gutgeschrieben.", optionen: ["15.06.2026", "01.06.2026", "12.06.2026", "30.06.2026"], richtig: 0, erkl: "Schenkung: Ausführung der Zuwendung (§ 9 Abs. 1 Nr. 2 ErbStG) – die Nichte hat das Geld mit der Gutschrift endgültig erlangt.", normen: ["ErbStG 9 1"] },
      { text: "Großmutter G schenkt ihrem Enkel ein Grundstück. Der notarielle Vertrag vom 10.04.2026 enthält Auflassung und Eintragungsbewilligung; Besitz, Nutzen und Lasten gehen am 01.05.2026 über; die Eintragung im Grundbuch erfolgt am 20.08.2026.", optionen: ["10.04.2026", "01.05.2026", "20.08.2026", "31.12.2026"], richtig: 0, erkl: "Grundstücksschenkung ist ausgeführt, sobald Auflassung und Eintragungsbewilligung vorliegen (Verwaltungsauffassung zu § 9 Abs. 1 Nr. 2 ErbStG) – die Eintragung muss nicht abgewartet werden.", normen: ["ErbStG 9 1"] },
    ]),
  A("bew-stichtagsprinzip", "bew-stichtag",
    "Was besagt das Stichtagsprinzip des § 11 ErbStG? Erläutern Sie es an einem Beispiel mit Wertpapieren.",
    "• Für die Wertermittlung ist der Zeitpunkt der Entstehung der Steuer maßgebend, soweit das Gesetz nichts anderes bestimmt (§ 11 ErbStG).\n• Wertveränderungen nach dem Stichtag – Kursverluste, Wertsteigerungen, Mieterhöhungen – bleiben unberücksichtigt, auch wenn sie bis zur Steuerfestsetzung eintreten.\n• Beispiel: Der Erblasser stirbt am 10.02.; seine börsennotierten Aktien stehen an diesem Tag mit dem niedrigsten Kurs von 120 € je Aktie im regulierten Markt (§ 11 Abs. 1 BewG). Fällt der Kurs bis zur Erbschaftsteuererklärung auf 80 €, bleibt es beim Wert vom 10.02.",
    ["ErbStG 11", "BewG 11 1"],
    M(["Maßgebend für die Bewertung ist der Zeitpunkt der Entstehung der Steuer.", "Ein Kursverlust nach dem Todestag mindert den Wert nicht.", "Börsennotierte Aktien werden mit dem niedrigsten Kurs am Stichtag angesetzt.", "Wertsteigerungen nach dem Stichtag bleiben ebenfalls außer Betracht."],
      ["Maßgebend ist der Tag der Steuerfestsetzung.", "Kursverluste bis zur Abgabe der Erklärung mindern den Wert.", "Aktien werden mit dem Jahresdurchschnittskurs bewertet.", "Der Erbe darf den für ihn günstigsten Stichtag wählen."],
      "Welche Aussagen zum Bewertungsstichtag sind richtig?"),
    { norm: ["ErbStG 11"], s: ["entstehung", "stichtag", "nach dem|spaeter", "unberuecksichtigt|bleiben|aendert nichts", "niedrigsten kurs|kurs"] }),
];

// ======================================================================= Steuerpflichtiger Erwerb
const erwerb = [
  A("bew-schema", "bew-erwerb",
    "Stellen Sie das Schema zur Ermittlung des steuerpflichtigen Erwerbs dar.",
    "1. Vermögensanfall nach Steuerwerten (§ 12 ErbStG i. V. m. BewG – z. B. Grundbesitzwert, festgestellter Anteilswert, Nennwert)\n2. − sachliche Steuerbefreiungen (§ 13 ErbStG, z. B. Hausrat, Familienheim; § 13a ErbStG für begünstigtes Betriebsvermögen; § 13d ErbStG: Wohnraum nur mit 90 %)\n3. − Nachlassverbindlichkeiten bzw. bei Schenkungen übernommene Schulden und Gegenleistungen (§ 10 Abs. 5 ErbStG), gekürzt nach § 10 Abs. 6, 6a ErbStG\n4. = Bereicherung des Erwerbers (§ 10 Abs. 1 S. 1, 2 ErbStG)\n5. − persönlicher Freibetrag (§ 16 ErbStG) und ggf. Versorgungsfreibetrag (§ 17 ErbStG)\n6. = steuerpflichtiger Erwerb, abgerundet auf volle 100 € (§ 10 Abs. 1 S. 6 ErbStG)",
    ["ErbStG 10 1", "ErbStG 12 1", "ErbStG 16 1"],
    M(["Ausgangspunkt ist der Vermögensanfall nach Steuerwerten.", "Nachlassverbindlichkeiten mindern die Bereicherung.", "Persönliche Freibeträge werden von der Bereicherung abgezogen.", "Der steuerpflichtige Erwerb wird auf volle 100 € nach unten abgerundet."],
      ["Der steuerpflichtige Erwerb wird auf volle 1.000 € aufgerundet.", "Die Freibeträge werden vor den Nachlassverbindlichkeiten abgezogen und dürfen negativ werden.", "Ausgangspunkt sind die Buchwerte aus der Bilanz des Erblassers.", "Die eigene Erbschaftsteuer des Erwerbers ist als Nachlassverbindlichkeit abziehbar."],
      "Welche Aussagen zur Ermittlung des steuerpflichtigen Erwerbs sind richtig?"),
    { norm: ["ErbStG 10"], s: ["steuerwert|12", "befreiung|13", "nachlassverbindlich|schulden", "bereicherung", "freibetrag|16", "100"] }),
  A("bew-nachlassverb", "bew-erwerb",
    "Welche Nachlassverbindlichkeiten sind nach § 10 Abs. 5 ErbStG abzugsfähig? Was gilt für Bestattungskosten ohne Nachweis, was ist nicht abziehbar?",
    "• Nr. 1: vom Erblasser herrührende Schulden (Erblasserschulden), z. B. Darlehen, Steuerschulden des Erblassers – soweit sie nicht schon bei der Bewertung eines Betriebs berücksichtigt sind.\n• Nr. 2: Verbindlichkeiten aus Vermächtnissen, Auflagen und geltend gemachten Pflichtteilen (Erbfallschulden).\n• Nr. 3: Kosten der Bestattung, eines angemessenen Grabdenkmals, der üblichen Grabpflege sowie Kosten der Abwicklung, Regelung oder Verteilung des Nachlasses (Erbfallkosten). Ohne Nachweis werden insgesamt 15.000 € abgezogen (§ 10 Abs. 5 Nr. 3 S. 2 ErbStG).\n• Nicht abziehbar: Kosten der Verwaltung des Nachlasses (§ 10 Abs. 5 Nr. 3 S. 3 ErbStG), die eigene Erbschaftsteuer des Erwerbers (§ 10 Abs. 8 ErbStG) und Schulden, soweit sie mit steuerfreiem oder nicht steuerbarem Vermögen zusammenhängen (§ 10 Abs. 6, 6a ErbStG).",
    ["ErbStG 10 5", "ErbStG 10 8", "ErbStG 10 6a"],
    M(["Ein vom Erblasser aufgenommenes Darlehen ist als Erblasserschuld abziehbar.", "Ein Vermächtnis ist beim Erben als Erbfallschuld abziehbar.", "Für Bestattungs- und Abwicklungskosten werden ohne Nachweis 15.000 € abgezogen.", "Die eigene Erbschaftsteuer des Erben ist nicht abziehbar."],
      ["Kosten der Verwaltung des Nachlasses sind als Erbfallkosten abziehbar.", "Der Pauschbetrag für Erbfallkosten beträgt 10.300 € für jeden Erben.", "Ein nicht geltend gemachter Pflichtteil ist beim Erben abziehbar.", "Schulden im Zusammenhang mit steuerfreiem Hausrat sind voll abziehbar."],
      "Welche Aussagen zu Nachlassverbindlichkeiten sind richtig?"),
    { norm: ["ErbStG 10"], s: ["erblasser", "vermaechtnis", "pflichtteil", "bestattung", "15 000|15.000", "verwaltung", "eigene erbschaftsteuer|abs 8"] }),
  R("bew-r-bereicherung", "bew-erwerb", (r) => {
    const haus = r.zahl(30, 90) * 10000, konto = r.zahl(5, 60) * 1000, darlehen = r.zahl(5, 25) * 10000, verm = r.zahl(2, 10) * 1000;
    const nachweis = r.muenze() ? r.zahl(6, 12) * 1000 : r.zahl(16, 22) * 1000, kosten = Math.max(nachweis, 15000);
    const ber = haus + konto - darlehen - verm - kosten;
    return {
      text: `Sohn S ist Alleinerbe seiner Mutter. Zum Nachlass gehören ein vermietetes Geschäftshaus (Grundbesitzwert ${eur(haus)}) und ein Girokonto mit ${eur(konto)}. Die Mutter hatte für das Haus ein Darlehen aufgenommen, das am Todestag mit ${eur(darlehen)} valutiert. Laut Testament muss S der Nachbarin ${eur(verm)} als Vermächtnis auszahlen. Für Beerdigung, Grabstein und Nachlassabwicklung weist S ${eur(nachweis)} nach.\nWie hoch ist die Bereicherung des S (vor Freibeträgen)?`,
      cent: ber * 100,
      erklaerung: `Vermögensanfall ${eur(haus + konto)} − Erblasserschuld (§ 10 Abs. 5 Nr. 1 ErbStG) ${eur(darlehen)} − Vermächtnis (Nr. 2) ${eur(verm)} − Erbfallkosten (Nr. 3) ${eur(kosten)}${nachweis < 15000 ? " (Pauschbetrag 15.000 €, da höher als der Nachweis)" : " (Nachweis höher als der Pauschbetrag von 15.000 €)"} = ${eur(ber)}. Geschäftshaus: keine Befreiung nach § 13d ErbStG (nicht zu Wohnzwecken vermietet), daher volle Schuld abziehbar.`,
      normen: ["ErbStG 10 5", "ErbStG 10 1"],
    };
  }),
  A("bew-schulden-befreit", "bew-erwerb",
    "Wie wirkt sich eine Steuerbefreiung auf den Abzug damit zusammenhängender Schulden aus? Erläutern Sie § 10 Abs. 6a ErbStG am Beispiel eines zu Wohnzwecken vermieteten Grundstücks.",
    "• Schulden und Lasten sind nicht abzugsfähig, soweit die Vermögensgegenstände, mit denen sie in wirtschaftlichem Zusammenhang stehen, steuerbefreit sind (§ 10 Abs. 6a S. 1 ErbStG, anzuwenden auf Erwerbe ab 2025).\n• Beispiel: Ein zu Wohnzwecken vermietetes Grundstück (Wert 1.000.000 €) wird nach § 13d ErbStG nur mit 90 % = 900.000 € angesetzt; 10 % sind steuerbefreit. Ein durch eine Grundschuld auf dem Grundstück gesichertes Darlehen von 400.000 € ist daher nur zu 90 % = 360.000 € abzugsfähig.\n• Für Schulden, die mit begünstigtem Betriebsvermögen zusammenhängen, gilt: abzugsfähig nur im Verhältnis des Werts nach Anwendung der §§ 13a, 13c zum Wert davor (§ 10 Abs. 6a S. 2 ErbStG).\n• Bei beschränkter Steuerpflicht sind nur die mit dem Inlandsvermögen zusammenhängenden Schulden abzugsfähig (§ 10 Abs. 6 S. 2 ErbStG).",
    ["ErbStG 10 6a", "ErbStG 13d 1", "ErbStG 10 6"],
    M(["Schulden sind nicht abzugsfähig, soweit der zugehörige Gegenstand steuerbefreit ist.", "Bei einem nach § 13d ErbStG begünstigten Grundstück ist die Grundstücksschuld nur zu 90 % abzugsfähig.", "Bei beschränkter Steuerpflicht sind die mit dem Inlandsvermögen zusammenhängenden Schulden abzugsfähig.", "Schulden im Zusammenhang mit begünstigtem Betriebsvermögen werden anteilig gekürzt."],
      ["Steuerbefreiungen haben auf den Schuldenabzug keinen Einfluss.", "Bei § 13d ErbStG ist die Schuld zu 110 % abzugsfähig.", "Bei beschränkter Steuerpflicht sind alle Schulden des Erblassers abzugsfähig.", "Die Kürzung gilt nur für Schenkungen, nicht für Erbfälle."],
      "Welche Aussagen zum Schuldenabzug bei steuerbefreitem Vermögen sind richtig?"),
    { norm: ["ErbStG 10"], s: ["nicht abzugsfaehig|nicht abziehbar", "soweit", "steuerbefreit|befreit", "13d", "90", "wirtschaftlichem zusammenhang"] }),
];

// ======================================================================= Steuerklassen und Freibeträge
const klassen = [
  F("bew-klasse-fall", "bew-klassen", "Welche Steuerklasse hat der Erwerber?", KL, [
      { text: "Die Ehefrau erbt von ihrem Mann.", richtig: 0, erkl: "Ehegatte → Steuerklasse I Nr. 1 (§ 15 Abs. 1 ErbStG).", normen: ["ErbStG 15 1"] },
      { text: "Ein Stiefsohn erbt von seinem Stiefvater.", richtig: 0, erkl: "Stiefkinder → Steuerklasse I Nr. 2.", normen: ["ErbStG 15 1"] },
      { text: "Die Enkelin erhält von ihrer Großmutter eine Schenkung.", richtig: 0, erkl: "Abkömmlinge der Kinder → Steuerklasse I Nr. 3.", normen: ["ErbStG 15 1"] },
      { text: "Die Mutter erbt von ihrem verstorbenen Sohn.", richtig: 0, erkl: "Eltern bei Erwerben von Todes wegen → Steuerklasse I Nr. 4.", normen: ["ErbStG 15 1"] },
      { text: "Der Vater erhält von seiner Tochter eine Schenkung.", richtig: 1, erkl: "Eltern gehören nur bei Erwerben von Todes wegen zu Klasse I; bei Schenkungen Steuerklasse II Nr. 1.", normen: ["ErbStG 15 1"] },
      { text: "Der Bruder erbt von seiner Schwester.", richtig: 1, erkl: "Geschwister → Steuerklasse II Nr. 2.", normen: ["ErbStG 15 1"] },
      { text: "Die Nichte erhält eine Schenkung von ihrem Onkel.", richtig: 1, erkl: "Abkömmlinge ersten Grades von Geschwistern (Nichten, Neffen) → Steuerklasse II Nr. 3.", normen: ["ErbStG 15 1"] },
      { text: "Die geschiedene Ehefrau wird im Testament ihres Ex-Mannes bedacht.", richtig: 1, erkl: "Geschiedener Ehegatte → Steuerklasse II Nr. 7.", normen: ["ErbStG 15 1"] },
      { text: "Der Schwiegersohn erhält eine Schenkung von seiner Schwiegermutter.", richtig: 1, erkl: "Schwiegerkinder → Steuerklasse II Nr. 5.", normen: ["ErbStG 15 1"] },
      { text: "Die Lebensgefährtin (nicht verheiratet, keine eingetragene Partnerschaft) erbt von ihrem Partner.", richtig: 2, erkl: "Alle übrigen Erwerber → Steuerklasse III.", normen: ["ErbStG 15 1"] },
      { text: "Der Cousin erbt von seiner Cousine.", richtig: 2, erkl: "Cousins sind weder in Klasse I noch II genannt → Steuerklasse III.", normen: ["ErbStG 15 1"] },
    ]),
  F("bew-freibetrag-fall", "bew-klassen", "Wie hoch ist der persönliche Freibetrag nach § 16 Abs. 1 ErbStG?",
    ["500.000 €", "400.000 €", "200.000 €", "100.000 €", "20.000 €"], [
      { text: "Der Ehemann erbt von seiner Frau (beide wohnen in Hannover).", richtig: 0, erkl: "§ 16 Abs. 1 Nr. 1 ErbStG.", normen: ["ErbStG 16 1"] },
      { text: "Die Tochter erhält von ihrem Vater (Wohnsitz Köln) eine Schenkung.", richtig: 1, erkl: "Kinder → § 16 Abs. 1 Nr. 2 ErbStG.", normen: ["ErbStG 16 1"] },
      { text: "Der Enkel erbt von seinem Großvater; sein Vater lebt noch.", richtig: 2, erkl: "Kinder der Kinder → § 16 Abs. 1 Nr. 3 ErbStG.", normen: ["ErbStG 16 1"] },
      { text: "Die Enkelin erbt von ihrer Großmutter; ihre Mutter (Tochter der Erblasserin) ist bereits verstorben.", richtig: 1, erkl: "Kinder verstorbener Kinder → wie Kinder, § 16 Abs. 1 Nr. 2 ErbStG.", normen: ["ErbStG 16 1"] },
      { text: "Die Mutter erbt von ihrem verstorbenen Sohn.", richtig: 3, erkl: "Übrige Personen der Steuerklasse I (Eltern bei Erwerb von Todes wegen) → § 16 Abs. 1 Nr. 4 ErbStG.", normen: ["ErbStG 16 1"] },
      { text: "Die Schwester erhält von ihrem Bruder eine Schenkung.", richtig: 4, erkl: "Steuerklasse II → § 16 Abs. 1 Nr. 5 ErbStG.", normen: ["ErbStG 16 1"] },
      { text: "Der beste Freund erbt vom Erblasser.", richtig: 4, erkl: "Steuerklasse III → § 16 Abs. 1 Nr. 7 ErbStG.", normen: ["ErbStG 16 1"] },
    ]),
  A("bew-versorgung", "bew-klassen",
    "Wer erhält den besonderen Versorgungsfreibetrag nach § 17 ErbStG, in welcher Höhe, und wann wird er gekürzt?",
    "• Nur bei Erwerben von Todes wegen – bei Schenkungen gibt es ihn nicht.\n• Überlebender Ehegatte bzw. Lebenspartner: 256.000 € neben dem Freibetrag nach § 16 ErbStG (§ 17 Abs. 1 S. 1 ErbStG).\n• Kinder (Steuerklasse I Nr. 2) nach Alter gestaffelt: bis 5 Jahre 52.000 €, bis 10 Jahre 41.000 €, bis 15 Jahre 30.700 €, bis 20 Jahre 20.500 €, bis zur Vollendung des 27. Lebensjahres 10.300 € (§ 17 Abs. 2 ErbStG).\n• Kürzung um den Kapitalwert der nicht erbschaftsteuerpflichtigen Versorgungsbezüge, die aus Anlass des Todes zustehen (z. B. Witwenrente aus der gesetzlichen Rentenversicherung) – § 17 Abs. 1 S. 2, Abs. 2 S. 2 ErbStG.",
    ["ErbStG 17 1", "ErbStG 17 2"],
    M(["Der überlebende Ehegatte erhält einen Versorgungsfreibetrag von 256.000 €.", "Der Versorgungsfreibetrag wird nur bei Erwerben von Todes wegen gewährt.", "Ein 8-jähriges Kind erhält 41.000 €.", "Nicht erbschaftsteuerpflichtige Hinterbliebenenbezüge kürzen den Freibetrag."],
      ["Der Versorgungsfreibetrag gilt auch bei Schenkungen an den Ehegatten.", "Jedes Kind erhält unabhängig vom Alter 52.000 €.", "Ein 30-jähriges Kind erhält 10.300 €.", "Der Versorgungsfreibetrag ersetzt den Freibetrag nach § 16 ErbStG."],
      "Welche Aussagen zum Versorgungsfreibetrag sind richtig?"),
    { norm: ["ErbStG 17"], s: ["todes wegen", "256 000|256.000", "kinder", "alter", "27", "versorgungsbezuege|kapitalwert", "gekuerzt|kuerzung"] }),
  R("bew-r-freibetrag", "bew-klassen", (r) => {
    const fall = r.wahl([
      { wer: "seine Ehefrau", art: "Erbfall", fb: 500000, vfb: 256000, kl: "I Nr. 1", n: "§ 16 Abs. 1 Nr. 1, § 17 Abs. 1 ErbStG" },
      { wer: "seine 12-jährige Tochter", art: "Erbfall", fb: 400000, vfb: 30700, kl: "I Nr. 2", n: "§ 16 Abs. 1 Nr. 2, § 17 Abs. 2 Nr. 3 ErbStG" },
      { wer: "seine 30-jährige Tochter", art: "Erbfall", fb: 400000, vfb: 0, kl: "I Nr. 2", n: "§ 16 Abs. 1 Nr. 2 ErbStG; kein Versorgungsfreibetrag ab 27 Jahren" },
      { wer: "seine Ehefrau", art: "Schenkung", fb: 500000, vfb: 0, kl: "I Nr. 1", n: "§ 16 Abs. 1 Nr. 1 ErbStG; § 17 ErbStG nur bei Erwerben von Todes wegen" },
      { wer: "seinen Neffen", art: "Erbfall", fb: 20000, vfb: 0, kl: "II Nr. 3", n: "§ 16 Abs. 1 Nr. 5 ErbStG" },
    ]);
    const ber = r.zahl(40, 120) * 10000 + r.zahl(0, 99) * 37, stpf = abrunden100(ber - fall.fb - fall.vfb);
    return {
      text: `${fall.art === "Erbfall" ? "Der Erblasser E (Wohnsitz Hamburg) hinterlässt" : "Der in Hamburg wohnende S schenkt"} ${fall.wer} Vermögen; die Bereicherung beträgt ${eur(ber)}. Es gibt keine Vorerwerbe und keine Versorgungsbezüge.\nWie hoch ist der steuerpflichtige Erwerb?`,
      cent: stpf * 100,
      erklaerung: `Steuerklasse ${fall.kl} (§ 15 Abs. 1 ErbStG). ${eur(ber)} − Freibetrag ${eur(fall.fb)}${fall.vfb ? ` − Versorgungsfreibetrag ${eur(fall.vfb)}` : ""} = ${eur(ber - fall.fb - fall.vfb)}, abgerundet auf volle 100 € (§ 10 Abs. 1 S. 6 ErbStG) = ${eur(stpf)}. Normen: ${fall.n}.`,
      normen: ["ErbStG 16 1", "ErbStG 17 1", "ErbStG 10 1"],
    };
  }),
];

// ======================================================================= Hausrat, Rückfall, Gelegenheitsgeschenke
const befreiungen = [
  A("bew-hausrat", "bew-befreiungen",
    "Erläutern Sie die Steuerbefreiung für Hausrat und andere bewegliche körperliche Gegenstände nach § 13 Abs. 1 Nr. 1 ErbStG. Für welche Gegenstände gilt sie nicht?",
    "• Steuerklasse I: Hausrat einschließlich Wäsche und Kleidung bis 41.000 € (Buchst. a) und daneben andere bewegliche körperliche Gegenstände bis 12.000 € (Buchst. b), z. B. Pkw, Schmuck.\n• Steuerklassen II und III: Hausrat und andere bewegliche körperliche Gegenstände zusammen bis 12.000 € (Buchst. c).\n• Es sind Freibeträge – nur der übersteigende Wert ist steuerpflichtig („soweit der Wert … nicht übersteigt“).\n• Keine Befreiung für Gegenstände des land- und forstwirtschaftlichen Vermögens, des Grundvermögens oder des Betriebsvermögens sowie für Zahlungsmittel, Wertpapiere, Münzen, Edelmetalle, Edelsteine und Perlen (§ 13 Abs. 1 Nr. 1 S. 2 ErbStG).\n• Die Befreiung gilt für jeden Erwerber gesondert und auch bei Schenkungen.",
    ["ErbStG 13 1"],
    M(["Ein Kind kann Hausrat bis 41.000 € steuerfrei erwerben.", "Ein Neffe erhält für Hausrat und andere bewegliche Gegenstände zusammen 12.000 €.", "Für Münzen und Edelmetalle gilt die Befreiung nicht.", "Nur der Wert über dem Freibetrag ist steuerpflichtig."],
      ["Ein Neffe kann Hausrat bis 41.000 € steuerfrei erwerben.", "Eine Goldmünzensammlung ist als bewegliche Sache bis 12.000 € befreit.", "Übersteigt der Hausrat 41.000 €, ist er insgesamt steuerpflichtig.", "Die Befreiung gilt nur bei Erwerben von Todes wegen."],
      "Welche Aussagen zur Befreiung für Hausrat sind richtig?"),
    { norm: ["ErbStG 13"], s: ["41 000|41.000", "12 000|12.000", "steuerklasse i", "ii und iii|ii", "muenzen|edelmetall", "wertpapier|zahlungsmittel", "soweit|uebersteig"] }),
  R("bew-r-hausrat", "bew-befreiungen", (r) => {
    const kl1 = r.muenze(), hausrat = r.zahl(20, 70) * 1000, auto = r.zahl(5, 30) * 1000, gold = r.zahl(5, 40) * 1000;
    const stpf = kl1 ? Math.max(0, hausrat - 41000) + Math.max(0, auto - 12000) + gold : Math.max(0, hausrat + auto - 12000) + gold;
    return {
      text: `${kl1 ? "Die Tochter" : "Der Neffe"} erbt von ${kl1 ? "ihrer Mutter" : "seiner Tante"} Hausrat (Möbel, Wäsche, Geschirr) im Wert von ${eur(hausrat)}, einen Pkw im Wert von ${eur(auto)} und Goldbarren im Wert von ${eur(gold)}.\nMit welchem Wert gehen diese Gegenstände insgesamt in den steuerpflichtigen Erwerb ein?`,
      cent: stpf * 100,
      erklaerung: kl1
        ? `Steuerklasse I: Hausrat ${eur(hausrat)} − 41.000 € = ${eur(Math.max(0, hausrat - 41000))} (§ 13 Abs. 1 Nr. 1 Buchst. a ErbStG); Pkw ${eur(auto)} − 12.000 € = ${eur(Math.max(0, auto - 12000))} (Buchst. b); Goldbarren voll ${eur(gold)} (Edelmetalle ausgeschlossen, S. 2). Summe ${eur(stpf)}.`
        : `Steuerklasse II: Hausrat und Pkw zusammen ${eur(hausrat + auto)} − 12.000 € = ${eur(Math.max(0, hausrat + auto - 12000))} (§ 13 Abs. 1 Nr. 1 Buchst. c ErbStG); Goldbarren voll ${eur(gold)} (Edelmetalle ausgeschlossen, S. 2). Summe ${eur(stpf)}.`,
      normen: ["ErbStG 13 1"],
    };
  }),
  A("bew-rueckfall-gelegenheit", "bew-befreiungen",
    "Erläutern Sie die Steuerbefreiungen für den Rückfall an die Eltern (§ 13 Abs. 1 Nr. 10 ErbStG) und für Gelegenheitsgeschenke (Nr. 14).",
    "• Rückfall: Steuerfrei sind Vermögensgegenstände, die Eltern oder Voreltern ihren Abkömmlingen durch Schenkung oder Übergabevertrag zugewandt hatten und die an diese Personen von Todes wegen zurückfallen (§ 13 Abs. 1 Nr. 10 ErbStG). Beispiel: Die Mutter schenkt dem Sohn eine Eigentumswohnung; der Sohn stirbt kinderlos, die Mutter erbt die Wohnung zurück – steuerfrei. Erbt sie daneben anderes Vermögen des Sohnes, ist dieses steuerpflichtig (Steuerklasse I Nr. 4).\n• Nur der Rückfall von Todes wegen ist befreit, keine Rückschenkung; befreit ist der zugewandte Gegenstand selbst (nicht ein Ersatzgegenstand).\n• Gelegenheitsgeschenke: Steuerfrei sind die üblichen Gelegenheitsgeschenke (§ 13 Abs. 1 Nr. 14 ErbStG), z. B. zu Geburtstag, Weihnachten, Hochzeit. Maßstab ist, was nach Anlass und den Vermögensverhältnissen des Schenkers üblich ist – eine feste Betragsgrenze nennt das Gesetz nicht.",
    ["ErbStG 13 1"],
    M(["Fällt eine geschenkte Wohnung von Todes wegen an die Mutter zurück, ist das steuerfrei.", "Der Rückfall ist nur bei Erwerb von Todes wegen befreit.", "Übliche Geburtstagsgeschenke sind steuerfrei.", "Was üblich ist, richtet sich auch nach den Vermögensverhältnissen des Schenkers."],
      ["Eine Rückschenkung unter Lebenden ist nach Nr. 10 befreit.", "Gelegenheitsgeschenke sind bis 5.000 € je Jahr steuerfrei.", "Der Rückfall ist auch für Geschwister befreit.", "Das gesamte Erbe der Eltern ist nach Nr. 10 befreit."],
      "Welche Aussagen zu Rückfall und Gelegenheitsgeschenken sind richtig?"),
    { norm: ["ErbStG 13"], s: ["eltern|voreltern", "abkoemmling", "zurueckfall|rueckfall", "von todes wegen", "gelegenheitsgeschenk", "ueblich"] }),
];

// ======================================================================= Familienheim
const familienheim = [
  A("bew-4a", "bew-familienheim",
    "Unter welchen Voraussetzungen ist die Schenkung eines Familienheims an den Ehegatten nach § 13 Abs. 1 Nr. 4a ErbStG steuerfrei?",
    "• Zuwendung unter Lebenden zwischen Ehegatten oder Lebenspartnern (§ 13 Abs. 1 Nr. 4a S. 1, 3 ErbStG).\n• Gegenstand: Eigentum oder Miteigentum an einem bebauten Grundstück im Sinne des § 181 Abs. 1 Nr. 1 bis 5 BewG im Inland, in der EU oder im EWR.\n• Darin wird eine Wohnung zu eigenen Wohnzwecken genutzt (Familienheim) – befreit ist nur der selbst bewohnte Teil („soweit“).\n• Gleichgestellt: Freistellung des Ehegatten von Verpflichtungen aus Anschaffung oder Herstellung des Familienheims und die Übernahme von nachträglichem Herstellungs- oder Erhaltungsaufwand (S. 2).\n• Keine Wertgrenze, keine Flächengrenze und keine Behaltens- oder Nutzungsfrist; die Befreiung kann mehrfach genutzt werden.",
    ["ErbStG 13 1"],
    M(["Die Schenkung des selbst bewohnten Hauses an die Ehefrau ist ohne Wertgrenze steuerfrei.", "Ein Familienheim in einem anderen EU-Staat kann begünstigt sein.", "Bei einem Zweifamilienhaus ist nur die selbst bewohnte Wohnung befreit, wenn die andere vermietet ist.", "Für die Schenkung unter Lebenden gibt es keine zehnjährige Nutzungsfrist."],
      ["Die Befreiung gilt auch für die Schenkung an den Lebensgefährten ohne eingetragene Partnerschaft.", "Begünstigt ist nur eine Wohnfläche bis 200 m².", "Ein Ferienhaus am Meer ist als Familienheim begünstigt.", "Ein Familienheim in der Schweiz ist begünstigt."],
      "Welche Aussagen zur Schenkung eines Familienheims sind richtig?"),
    { norm: ["ErbStG 13"], s: ["ehegatte|lebenspartner", "unter lebenden", "bebaut", "eigenen wohnzwecken", "eu|europaeischen union|ewr", "keine wertgrenze|wertgrenze", "frist|behalt"] }),
  A("bew-4b-4c", "bew-familienheim",
    "Vergleichen Sie die Befreiung des Familienheims beim Erwerb von Todes wegen durch den Ehegatten (Nr. 4b) und durch Kinder (Nr. 4c).",
    "Gemeinsam (§ 13 Abs. 1 Nr. 4b und 4c ErbStG):\n• Erwerb von Todes wegen eines bebauten Grundstücks (§ 181 Abs. 1 Nr. 1–5 BewG) im Inland, in der EU oder im EWR.\n• Der Erblasser hat darin bis zum Erbfall eine Wohnung zu eigenen Wohnzwecken genutzt oder war aus zwingenden Gründen (z. B. Pflegebedürftigkeit) daran gehindert.\n• Beim Erwerber ist die Wohnung unverzüglich zur Selbstnutzung zu eigenen Wohnzwecken bestimmt.\n• Die Befreiung entfällt rückwirkend, wenn der Erwerber die Selbstnutzung innerhalb von zehn Jahren aufgibt, es sei denn aus zwingenden Gründen.\n• Keine Befreiung, soweit das Familienheim an einen Dritten weitergegeben werden muss.\nUnterschied:\n• Nr. 4b (Ehegatte, Lebenspartner): ohne Flächengrenze.\n• Nr. 4c (Kinder und Kinder verstorbener Kinder): nur soweit die Wohnfläche 200 m² nicht übersteigt – der übersteigende Teil ist steuerpflichtig.",
    ["ErbStG 13 1"],
    M(["Beim Erwerb durch Kinder ist das Familienheim nur bis 200 m² Wohnfläche befreit.", "Der Erwerber muss die Wohnung unverzüglich selbst nutzen.", "Gibt der Erwerber die Selbstnutzung nach vier Jahren ohne zwingenden Grund auf, entfällt die Befreiung rückwirkend.", "Für den überlebenden Ehegatten gibt es keine Flächengrenze."],
      ["Beim überlebenden Ehegatten ist die Wohnfläche auf 200 m² begrenzt.", "Die Befreiung nach Nr. 4c gilt auch für Neffen und Nichten.", "Für die Befreiung genügt es, wenn der Erwerber die Wohnung vermietet.", "Die Nutzungsfrist beträgt fünf Jahre."],
      "Welche Aussagen zum Familienheim beim Erwerb von Todes wegen sind richtig?"),
    { norm: ["ErbStG 13"], s: ["von todes wegen", "erblasser", "selbst|eigenen wohnzwecken", "unverzueglich", "zehn jahre|10 jahre", "200", "zwingend"] }),
  F("bew-familienheim-fall", "bew-familienheim", "Ist das Familienheim (ganz) steuerfrei?",
    ["Ja, in vollem Umfang steuerfrei", "Nur teilweise steuerfrei", "Nein, nicht steuerfrei"], [
      { text: "Der Ehemann schenkt seiner Frau seinen hälftigen Miteigentumsanteil am gemeinsam bewohnten Einfamilienhaus in Lüneburg (Wert 900.000 €).", richtig: 0, erkl: "Zuwendung unter Lebenden an den Ehegatten, selbst bewohntes Familienheim im Inland – keine Wertgrenze (§ 13 Abs. 1 Nr. 4a ErbStG).", normen: ["ErbStG 13 1"] },
      { text: "Die Witwe erbt das bisher gemeinsam bewohnte Einfamilienhaus (240 m² Wohnfläche) und wohnt dort weiter.", richtig: 0, erkl: "§ 13 Abs. 1 Nr. 4b ErbStG – für den Ehegatten gibt es keine Flächengrenze; zehn Jahre Selbstnutzung.", normen: ["ErbStG 13 1"] },
      { text: "Der Sohn erbt das von seiner verwitweten Mutter bis zum Tod bewohnte Einfamilienhaus (250 m² Wohnfläche) und zieht unverzüglich ein.", richtig: 1, erkl: "§ 13 Abs. 1 Nr. 4c ErbStG: nur soweit die Wohnfläche 200 m² nicht übersteigt – 200/250 befreit, 50/250 steuerpflichtig.", normen: ["ErbStG 13 1"] },
      { text: "Die Tochter erbt das Haus ihres Vaters, in dem er bis zum Tod wohnte, und vermietet es sofort, weil sie in München arbeitet.", richtig: 2, erkl: "Keine unverzügliche Selbstnutzung durch die Erwerberin → keine Befreiung nach § 13 Abs. 1 Nr. 4c ErbStG.", normen: ["ErbStG 13 1"] },
      { text: "Die Ehefrau erhält von ihrem Mann das Ferienhaus an der Ostsee geschenkt, das das Paar im Sommer nutzt.", richtig: 2, erkl: "Ein Ferien- oder Zweitwohnsitz ist kein Familienheim (Mittelpunkt des familiären Lebens) → keine Befreiung nach § 13 Abs. 1 Nr. 4a ErbStG.", normen: ["ErbStG 13 1"] },
      { text: "Die Witwe erbt das gemeinsam bewohnte Haus in Zürich (Schweiz) und wohnt dort weiter.", richtig: 2, erkl: "Die Schweiz ist weder EU- noch EWR-Staat → keine Befreiung nach § 13 Abs. 1 Nr. 4b ErbStG.", normen: ["ErbStG 13 1"] },
      { text: "Der Lebensgefährte (nicht verheiratet, keine eingetragene Partnerschaft) erbt die gemeinsam bewohnte Wohnung und wohnt dort weiter.", richtig: 2, erkl: "Begünstigt sind nur Ehegatten und Lebenspartner (Nr. 4b) bzw. Kinder (Nr. 4c).", normen: ["ErbStG 13 1"] },
      { text: "Die Witwe erbt ein Zweifamilienhaus; das Erdgeschoss bewohnten die Eheleute selbst, das gleich große Obergeschoss ist vermietet. Sie wohnt weiter im Erdgeschoss.", richtig: 1, erkl: "Befreit nur, soweit eine Wohnung zu eigenen Wohnzwecken genutzt wird (Nr. 4b) – das vermietete Obergeschoss ist nicht befreit (kann aber unter § 13d ErbStG fallen).", normen: ["ErbStG 13 1", "ErbStG 13d 1"] },
    ]),
  R("bew-r-familienheim", "bew-familienheim", (r) => {
    const wert = r.zahl(50, 150) * 10000, flaeche = r.zahl(210, 300);
    const frei = Math.round(wert * 200 / flaeche), stpf = wert - frei;
    return {
      text: `Die Tochter erbt das Einfamilienhaus ihrer Mutter, die es bis zu ihrem Tod selbst bewohnte (Grundbesitzwert ${eur(wert)}, Wohnfläche ${flaeche} m²). Die Tochter zieht unverzüglich ein.\nMit welchem Wert ist das Haus steuerpflichtig?`,
      cent: stpf * 100,
      erklaerung: `§ 13 Abs. 1 Nr. 4c ErbStG befreit das Familienheim nur, soweit die Wohnfläche 200 m² nicht übersteigt: befreit ${eur(wert)} × 200/${flaeche} = ${eur(frei)}; steuerpflichtig ${eur(stpf)} (Anteil ${flaeche - 200}/${flaeche}).`,
      normen: ["ErbStG 13 1"],
    };
  }),
];

// ======================================================================= Vermieteter Wohnraum
const wohnraum = [
  A("bew-13d", "bew-wohnraum",
    "Unter welchen Voraussetzungen werden Grundstücke nach § 13d ErbStG nur mit 90 % angesetzt? Wie wird bei gemischter Nutzung aufgeteilt?",
    "• Bebaute Grundstücke oder Grundstücksteile, die zu Wohnzwecken vermietet werden (§ 13d Abs. 3 Nr. 1 ErbStG).\n• Belegen im Inland, in der EU, im EWR oder in einem Drittstaat, der auf Grund von Abkommen Amtshilfe in Erbschaftsteuersachen leistet (Nr. 2).\n• Nicht Teil von begünstigtem Betriebsvermögen nach § 13a ErbStG (Nr. 3).\n• Rechtsfolge: Ansatz mit 90 % des Werts (§ 13d Abs. 1 ErbStG) – 10 % bleiben steuerfrei.\n• Gemischte Nutzung: Der Grundbesitzwert wird nach dem Verhältnis der Wohnfläche der vermieteten Wohnungen zur gesamten Wohn- und Nutzfläche aufgeteilt; nur der Wohnanteil erhält den Abschlag. Eigengenutzte Wohnungen, gewerblich vermietete Flächen und leerstehende Flächen ohne Vermietungsabsicht sind nicht begünstigt.\n• Keine Befreiung, soweit das Grundstück auf Grund einer Verfügung des Erblassers an einen Dritten weitergegeben werden muss (§ 13d Abs. 2 ErbStG).\n• Zugehörige Schulden sind nur zu 90 % abzugsfähig (§ 10 Abs. 6a ErbStG).",
    ["ErbStG 13d 1", "ErbStG 13d 3", "ErbStG 10 6a"],
    M(["Zu Wohnzwecken vermietete Grundstücke werden mit 90 % angesetzt.", "Ein in Frankreich belegenes Mietwohnhaus kann begünstigt sein.", "Bei einem gemischt genutzten Haus erhält nur der zu Wohnzwecken vermietete Teil den Abschlag.", "Darauf lastende Schulden sind nur zu 90 % abzugsfähig."],
      ["An Gewerbetreibende vermietete Büroflächen erhalten den Abschlag ebenfalls.", "Selbst genutzte Wohnungen werden nach § 13d ErbStG mit 90 % angesetzt.", "Der Abschlag beträgt 15 %.", "Ein Mietwohnhaus in einem Gewerbebetrieb, für den § 13a ErbStG gewährt wird, erhält zusätzlich den Abschlag."],
      "Welche Aussagen zu § 13d ErbStG sind richtig?"),
    { norm: ["ErbStG 13d"], s: ["90", "wohnzwecken vermietet", "bebaut", "eu|ewr|europaeischen", "betriebsvermoegen|13a", "wohnflaeche|flaeche", "schulden|10 abs 6a"] }),
  R("bew-r-13d", "bew-wohnraum", (r) => {
    const wert = r.zahl(80, 250) * 10000, wohn = r.zahl(4, 9) * 100, gew = r.zahl(1, 3) * 100, schuld = r.zahl(20, 60) * 10000;
    const wohnwert = Math.round(wert * wohn / (wohn + gew)), ansatz = Math.round(wohnwert * 0.9) + (wert - wohnwert);
    const abz = Math.round(schuld * ansatz / wert), ergebnis = ansatz - abz;
    return {
      text: `Die Nichte erhält von ihrem Onkel ein Wohn- und Geschäftshaus in Kiel geschenkt (festgestellter Grundbesitzwert ${eur(wert)}). ${wohn} m² sind an Privatleute zu Wohnzwecken vermietet, ${gew} m² an ein Steuerbüro. Die Nichte übernimmt das durch eine Grundschuld auf dem Grundstück gesicherte Darlehen mit ${eur(schuld)}.\nWie hoch ist die Bereicherung aus dieser Zuwendung (Grundstück nach § 13d ErbStG abzüglich abzugsfähiger Schuld)?`,
      cent: ergebnis * 100,
      erklaerung: `Aufteilung nach Flächen: Wohnanteil ${wohn}/${wohn + gew} = ${eur(wohnwert)} × 90 % = ${eur(Math.round(wohnwert * 0.9))} (§ 13d Abs. 1, 3 ErbStG); Gewerbeanteil voll ${eur(wert - wohnwert)}; Ansatz ${eur(ansatz)}. Schuld nur abzugsfähig, soweit das Grundstück nicht befreit ist (§ 10 Abs. 6a S. 1 ErbStG): ${eur(schuld)} × ${eur(ansatz)} / ${eur(wert)} = ${eur(abz)}. Bereicherung ${eur(ergebnis)}.`,
      normen: ["ErbStG 13d 1", "ErbStG 10 6a"],
    };
  }),
  F("bew-13d-fall", "bew-wohnraum", "Gilt der 90-%-Ansatz nach § 13d ErbStG?", ["Ja", "Nein"], [
      { text: "Ein Mehrfamilienhaus in Dresden, alle Wohnungen an Privatleute vermietet, gehört zum Privatvermögen der Erblasserin.", richtig: 0, erkl: "Zu Wohnzwecken vermietetes Grundstück im Inland, kein begünstigtes Betriebsvermögen (§ 13d Abs. 3 ErbStG).", normen: ["ErbStG 13d 3"] },
      { text: "Eine vermietete Eigentumswohnung in Wien (Österreich) wird verschenkt.", richtig: 0, erkl: "Belegenheit in einem EU-Staat genügt (§ 13d Abs. 3 ErbStG).", normen: ["ErbStG 13d 3"] },
      { text: "Ein an eine Arztpraxis vermietetes Gebäude in Bremen wird vererbt.", richtig: 1, erkl: "Nicht zu Wohnzwecken vermietet → kein Abschlag.", normen: ["ErbStG 13d 3"] },
      { text: "Die Tochter erbt die Eigentumswohnung, die ihr Vater selbst bewohnt hat, und vermietet sie anschließend.", richtig: 1, erkl: "Maßgebend sind die Verhältnisse im Besteuerungszeitpunkt (Tod): Die Wohnung war selbst genutzt, nicht vermietet → kein Abschlag nach § 13d ErbStG.", normen: ["ErbStG 13d 3"] },
      { text: "Ein vermietetes Mietwohnhaus gehört zum Betriebsvermögen eines Gewerbebetriebs, für den die Erbin die Verschonung nach § 13a ErbStG erhält.", richtig: 1, erkl: "Ausgeschlossen, wenn das Grundstück zum begünstigten Betriebsvermögen gehört (§ 13d Abs. 3 Nr. 3 ErbStG).", normen: ["ErbStG 13d 3"] },
      { text: "Ein unbebautes, als Parkplatz verpachtetes Grundstück in Hamburg wird verschenkt.", richtig: 1, erkl: "Nur bebaute Grundstücke, die zu Wohnzwecken vermietet werden (§ 13d Abs. 3 ErbStG).", normen: ["ErbStG 13d 3"] },
    ]),
];

// ======================================================================= Betriebsvermögen und Anteile
const betrieb = [
  A("bew-13b-beguenstigungsfaehig", "bew-betrieb",
    "Welches Vermögen ist nach § 13b Abs. 1 ErbStG begünstigungsfähig? Gehen Sie besonders auf Anteile an Kapitalgesellschaften ein.",
    "• Land- und forstwirtschaftliches Vermögen (§ 13b Abs. 1 Nr. 1 ErbStG).\n• Inländisches Betriebsvermögen beim Erwerb eines ganzen Gewerbebetriebs, Teilbetriebs, Mitunternehmeranteils oder Anteils eines persönlich haftenden Gesellschafters einer KGaA; ebenso Betriebsvermögen einer Betriebsstätte in der EU oder im EWR (Nr. 2).\n• Anteile an einer Kapitalgesellschaft (Nr. 3), wenn\n– die Gesellschaft im Zeitpunkt der Entstehung der Steuer Sitz oder Geschäftsleitung im Inland, in der EU oder im EWR hat und\n– der Erblasser oder Schenker unmittelbar zu mehr als 25 % am Nennkapital beteiligt war (Mindestbeteiligung); Anteile mit Poolvereinbarung werden zusammengerechnet.\n• Maßgebend ist die Beteiligung des Schenkers – wer 40 % hält und 20 % verschenkt, überträgt begünstigungsfähiges Vermögen.",
    ["ErbStG 13b 1"],
    M(["Anteile an einer Kapitalgesellschaft sind begünstigungsfähig, wenn der Schenker zu mehr als 25 % beteiligt war.", "Ein ganzer Gewerbebetrieb ist begünstigungsfähig.", "Ein Mitunternehmeranteil ist begünstigungsfähig.", "Verschenkt ein zu 40 % beteiligter Gesellschafter 20 %, ist der Anteil begünstigungsfähig."],
      ["Anteile an einer GmbH sind ab einer Beteiligung von 10 % begünstigungsfähig.", "Maßgebend ist allein die Beteiligung des Erwerbers nach der Schenkung.", "Anteile an einer Kapitalgesellschaft mit Sitz und Geschäftsleitung in den USA sind begünstigungsfähig.", "Einzelne Wirtschaftsgüter eines Betriebs sind begünstigungsfähig."],
      "Welche Aussagen zum begünstigungsfähigen Vermögen sind richtig?"),
    { norm: ["ErbStG 13b"], s: ["betriebsvermoegen", "gewerbebetrieb|teilbetrieb", "kapitalgesellschaft", "25", "unmittelbar", "sitz|geschaeftsleitung", "erblasser oder schenker|schenker"] }),
  A("bew-verschonung", "bew-betrieb",
    "Erläutern Sie Regelverschonung, Abzugsbetrag und Optionsverschonung nach § 13a ErbStG sowie die Rolle des Verwaltungsvermögens (§ 13b Abs. 2, 7 ErbStG).",
    "• Verwaltungsvermögen (§ 13b Abs. 4 ErbStG, z. B. an Dritte überlassene Grundstücke, Wertpapiere, Finanzmittel über 15 %) ist grundsätzlich nicht begünstigt. Beträgt es mindestens 90 % des gemeinen Werts, ist das gesamte Vermögen nicht begünstigt (§ 13b Abs. 2 S. 2 ErbStG).\n• Unschädliches Verwaltungsvermögen: Der Nettowert des Verwaltungsvermögens wird wie begünstigtes Vermögen behandelt, soweit er 10 % des um ihn gekürzten gemeinen Werts nicht übersteigt (§ 13b Abs. 7 ErbStG). Begünstigt = gemeiner Wert − schädliches Verwaltungsvermögen (§ 13b Abs. 2 S. 1).\n• Regelverschonung: 85 % des begünstigten Vermögens bleiben steuerfrei (Verschonungsabschlag, § 13a Abs. 1 ErbStG), wenn der Erwerb 26 Mio. € nicht übersteigt.\n• Abzugsbetrag: Vom verbleibenden Teil (15 %) bleiben bis zu 150.000 € außer Ansatz; übersteigt der Rest 150.000 €, verringert sich der Abzugsbetrag um 50 % des übersteigenden Betrags (§ 13a Abs. 2 ErbStG) – ab 450.000 € Rest entfällt er.\n• Optionsverschonung: Auf unwiderruflichen Antrag 100 % Verschonungsabschlag (§ 13a Abs. 10 ErbStG), aber nur, wenn das Vermögen zu nicht mehr als 20 % aus Verwaltungsvermögen besteht.\n• Das schädliche Verwaltungsvermögen ist immer voll steuerpflichtig.",
    ["ErbStG 13a 1", "ErbStG 13a 2", "ErbStG 13a 10", "ErbStG 13b 2", "ErbStG 13b 7"],
    M(["Die Regelverschonung stellt 85 % des begünstigten Vermögens steuerfrei.", "Der Abzugsbetrag von 150.000 € schmilzt um 50 % des übersteigenden Betrags ab.", "Die Optionsverschonung setzt voraus, dass das Verwaltungsvermögen höchstens 20 % beträgt.", "Bis zu 10 % Verwaltungsvermögen (bezogen auf den gekürzten Wert) gelten als unschädlich."],
      ["Die Optionsverschonung ist bei jedem Verwaltungsvermögensanteil möglich.", "Schädliches Verwaltungsvermögen erhält ebenfalls den Verschonungsabschlag.", "Der Abzugsbetrag beträgt immer 150.000 €.", "Bei 95 % Verwaltungsvermögen ist der Betrieb trotzdem zu 85 % verschont."],
      "Welche Aussagen zur Verschonung von Betriebsvermögen sind richtig?"),
    { norm: ["ErbStG 13a"], s: ["85", "150 000|150.000", "50", "100", "20", "verwaltungsvermoegen", "unschaedlich|10", "90"] }),
  R("bew-r-verschonung", "bew-betrieb", (r) => {
    const gw = r.zahl(8, 40) * 100000, anteil = r.wahl([0.05, 0.1, 0.15, 0.25, 0.3]), vv = Math.round(gw * anteil / 1000) * 1000;
    const option = r.muenze(), v = verschonung(gw, vv, { option });
    return {
      text: `Der Sohn erhält von seinem Vater dessen gesamten 60-%-Anteil an einer GmbH mit Sitz und Geschäftsleitung in Hannover. Festgestellter Wert des Anteils ${eur(gw)}; davon entfallen ${eur(vv)} auf Verwaltungsvermögen (entspricht dem Nettowert). ${option ? "Der Sohn beantragt die Optionsverschonung." : "Ein Antrag auf Optionsverschonung wird nicht gestellt."}\nMit welchem Wert ist der Anteil nach Anwendung der §§ 13a, 13b ErbStG steuerpflichtig?`,
      cent: v.steuerpflichtig * 100,
      erklaerung: `Begünstigungsfähig (§ 13b Abs. 1 Nr. 3 ErbStG: Beteiligung > 25 %, Sitz im Inland). Unschädlich 10 % von (${eur(gw)} − ${eur(vv)}) = ${eur(v.unschaedlich)}; schädlich ${eur(v.schaedlich)} (§ 13b Abs. 7); begünstigt ${eur(v.beguenstigt)} (§ 13b Abs. 2 S. 1). ${option && !v.option ? `Option scheitert: Verwaltungsvermögen ${Math.round(v.anteil * 100)} % > 20 % (§ 13a Abs. 10 S. 2) → Regelverschonung. ` : ""}${v.option ? `Optionsverschonung (Verwaltungsvermögen ${Math.round(v.anteil * 100)} % ≤ 20 %): 100 % frei.` : `Verschonungsabschlag 85 % = ${eur(v.abschlag)}, Rest ${eur(v.rest)}; Abzugsbetrag 150.000 € − 50 % × ${eur(Math.max(0, v.rest - 150000))} = ${eur(v.abzug)} (§ 13a Abs. 2).`} Steuerpflichtig: ${v.option ? "" : `${eur(v.rest)} − ${eur(v.abzug)} + `}schädliches Verwaltungsvermögen ${eur(v.schaedlich)} = ${eur(v.steuerpflichtig)}.`,
      normen: ["ErbStG 13a 1", "ErbStG 13a 2", "ErbStG 13b 7"],
    };
  }),
  R("bew-r-abzugsbetrag", "bew-betrieb", (r) => {
    const rest = r.zahl(10, 60) * 10000 + r.wahl([0, 2500, 5000, 7500]), abzug = Math.max(0, Math.min(rest, 150000 - Math.max(0, rest - 150000) / 2));
    return {
      text: `Nach Abzug des Verschonungsabschlags von 85 % verbleibt beim Erwerber begünstigtes Vermögen von ${eur(rest)}.\nWie hoch ist der Abzugsbetrag nach § 13a Abs. 2 ErbStG?`,
      cent: Math.round(abzug) * 100,
      erklaerung: rest <= 150000
        ? `Der Rest übersteigt 150.000 € nicht → er bleibt vollständig außer Ansatz: Abzugsbetrag ${eur(rest)} (§ 13a Abs. 2 S. 1 ErbStG).`
        : `150.000 € − 50 % × (${eur(rest)} − 150.000 €) = ${eur(Math.round(abzug))}${abzug === 0 ? " (ab 450.000 € entfällt der Abzugsbetrag)" : ""} (§ 13a Abs. 2 S. 2 ErbStG).`,
      normen: ["ErbStG 13a 2"],
    };
  }),
];

// ======================================================================= Steuerberechnung und Steuerschuldner
const steuer = [
  R("bew-r-steuer", "bew-steuer", (r) => {
    const kl = r.wahl([1, 1, 2, 3]), grenzen = [75000, 300000, 600000], g = r.wahl(grenzen);
    const erwerb = r.muenze() ? g + r.zahl(1, 40) * 100 : g - r.zahl(10, 200) * 100;
    const s = erbst(erwerb, kl);
    return {
      text: `Der steuerpflichtige Erwerb (bereits auf volle 100 € abgerundet) beträgt ${eur(erwerb)}; der Erwerber gehört zur Steuerklasse ${["", "I", "II", "III"][kl]}.\nWie hoch ist die festzusetzende Erbschaftsteuer?`,
      cent: Math.round(s.steuer * 100),
      erklaerung: s.haerte
        ? `Steuersatz ${s.satz} % (§ 19 Abs. 1 ErbStG): ${eur(erwerb)} × ${s.satz} % = ${eur(s.normal)}. Härteausgleich (§ 19 Abs. 3 ErbStG): Steuer an der letzten Wertgrenze ${eur(s.grenze)} × ${steuersatzText(s.grenze, kl)} % = ${eur(s.beiGrenze)} zuzüglich ${s.satz <= 30 ? "der Hälfte" : "drei Vierteln"} des übersteigenden Betrags (${eur(erwerb - s.grenze)}) = ${eur(s.deckung)}; Steuer ${eur(s.steuer)}.`
        : `Steuersatz ${s.satz} % (§ 19 Abs. 1 ErbStG): ${eur(erwerb)} × ${s.satz} % = ${eur(s.steuer)}.${s.grenze ? ` Kein Härteausgleich: Mehrsteuer ${eur(s.normal - s.beiGrenze)} ist aus ${s.satz <= 30 ? "der Hälfte" : "drei Vierteln"} des übersteigenden Betrags (${eur(s.deckung)}) gedeckt.` : ""}`,
      normen: ["ErbStG 19 1", "ErbStG 19 3"],
    };
  }),
  A("bew-haerteausgleich", "bew-steuer",
    "Was ist der Härteausgleich nach § 19 Abs. 3 ErbStG? Erläutern Sie das Vorgehen an einem Beispiel.",
    "• Zweck: Wird eine Wertgrenze des § 19 Abs. 1 ErbStG nur knapp überschritten, würde der höhere Steuersatz auf den gesamten Erwerb angewendet – der Mehrbetrag an Steuer wäre größer als der Mehrerwerb.\n• Regel: Der Unterschied zwischen der Steuer nach dem höheren Satz und der Steuer, die sich ergäbe, wenn der Erwerb die letztvorhergehende Wertgrenze nicht überstiegen hätte, wird nur erhoben, soweit er bei einem Steuersatz bis 30 % aus der Hälfte, bei einem Steuersatz über 30 % aus drei Vierteln des die Wertgrenze übersteigenden Betrags gedeckt werden kann (§ 19 Abs. 3 ErbStG).\n• Beispiel Steuerklasse I, Erwerb 75.800 €: normal 11 % = 8.338 €. Vergleich: 75.000 € × 7 % = 5.250 € + ½ × 800 € = 400 € → 5.650 €. Festzusetzen sind 5.650 €.",
    ["ErbStG 19 3", "ErbStG 19 1"],
    M(["Der Härteausgleich greift, wenn eine Wertgrenze nur knapp überschritten wird.", "Bei einem Steuersatz bis 30 % wird die Mehrsteuer auf die Hälfte des übersteigenden Betrags begrenzt.", "Bei einem Steuersatz über 30 % wird sie auf drei Viertel begrenzt.", "Verglichen wird mit der Steuer an der letztvorhergehenden Wertgrenze."],
      ["Der Härteausgleich gilt nur in Steuerklasse III.", "Beim Härteausgleich wird der niedrigere Steuersatz auf den ganzen Erwerb angewendet.", "Der Härteausgleich muss beantragt werden und gilt nur bei Schenkungen.", "Der Härteausgleich erhöht die Steuer."],
      "Welche Aussagen zum Härteausgleich sind richtig?"),
    { norm: ["ErbStG 19"], s: ["wertgrenze", "knapp|uebersteig", "haelfte", "drei viertel", "30", "letztvorhergehend|vorhergehend"] }),
  A("bew-steuerschuldner", "bew-steuer",
    "Wer ist Steuerschuldner der Erbschaft- und Schenkungsteuer? Was gilt für kleine Steuerbeträge?",
    "• Steuerschuldner ist der Erwerber; bei einer Schenkung ist auch der Schenker Steuerschuldner (§ 20 Abs. 1 S. 1 ErbStG). Erwerber und Schenker sind Gesamtschuldner (§ 44 AO); das Finanzamt hält sich regelmäßig zuerst an den Erwerber. Übernimmt der Schenker die Steuer, gilt sie als zusätzliche Zuwendung (§ 10 Abs. 2 ErbStG).\n• Bei einer Zweckzuwendung schuldet der mit der Ausführung Beschwerte die Steuer, bei Familienstiftungen die Stiftung.\n• Kleinbetragsgrenze: Von der Festsetzung ist abzusehen, wenn die für den einzelnen Steuerfall festzusetzende Steuer 50 € nicht übersteigt (§ 22 ErbStG).",
    ["ErbStG 20 1", "ErbStG 22"],
    M(["Bei einer Schenkung schulden Beschenkter und Schenker die Steuer.", "Bei einem Erbfall schuldet der Erwerber die Steuer.", "Eine Steuer von 45 € wird nicht festgesetzt.", "Eine Steuer von 51 € wird festgesetzt."],
      ["Bei einer Schenkung schuldet allein der Schenker die Steuer.", "Steuern unter 500 € werden nicht festgesetzt.", "Bei einem Erbfall schuldet der Nachlassverwalter die Steuer persönlich.", "Eine Steuer von genau 50 € wird festgesetzt."],
      "Welche Aussagen zu Steuerschuldner und Kleinbetrag sind richtig?"),
    { norm: ["ErbStG 20"], s: ["erwerber", "schenker", "gesamtschuldner|auch", "50", "festsetzung|abzusehen"] }),
  R("bew-r-gesamt", "bew-steuer", (r) => {
    const kl = r.wahl([{ wer: "Neffe", fb: 20000, k: 2 }, { wer: "Enkelin", fb: 200000, k: 1 }, { wer: "Freundin", fb: 20000, k: 3 }]);
    const geld = r.zahl(10, 80) * 5000, wp = r.zahl(5, 40) * 2500 + r.zahl(0, 9) * 37, erwerb = abrunden100(geld + wp - kl.fb), s = erbst(erwerb, kl.k);
    return {
      text: `Die in Kassel wohnende Erblasserin hinterlässt ihre${kl.wer === "Neffe" ? "m Neffen" : kl.wer === "Enkelin" ? "r Enkelin (deren Vater lebt)" : "r langjährigen Freundin"} durch Vermächtnis ein Bankguthaben von ${eur(geld)} und Wertpapiere im Kurswert von ${eur(wp)}. Weitere Erwerbe, Kosten oder Vorerwerbe gibt es nicht.\nWie hoch ist die Erbschaftsteuer?`,
      cent: Math.round(s.steuer * 100),
      erklaerung: `Bereicherung ${eur(geld + wp)} − Freibetrag ${eur(kl.fb)} (§ 16 Abs. 1 ErbStG, Steuerklasse ${["", "I", "II", "III"][kl.k]}) = ${eur(geld + wp - kl.fb)}, abgerundet ${eur(erwerb)} (§ 10 Abs. 1 S. 6 ErbStG). Steuersatz ${s.satz} %${s.haerte ? `; Härteausgleich (§ 19 Abs. 3 ErbStG): ${eur(s.beiGrenze)} + ${eur(s.deckung)}` : ""} → ${eur(s.steuer)}.`,
      normen: ["ErbStG 16 1", "ErbStG 19 1", "ErbStG 10 1"],
    };
  }),
];
function steuersatzText(grenze, kl) { return { 75000: [7, 15, 30], 300000: [11, 20, 30], 600000: [15, 25, 30] }[grenze][kl - 1]; }

export const BEWR_AUFGABEN = [...vorgaenge, ...pflicht, ...stichtag, ...erwerb, ...klassen, ...befreiungen, ...familienheim, ...wohnraum, ...betrieb, ...steuer, ...BEWR_TEIL2];
export const MC_BEWR = Object.fromEntries(BEWR_AUFGABEN.filter((v) => v.mc).map((v) => [v.id, v.mc]));
export const SW_BEWR = Object.fromEntries(BEWR_AUFGABEN.filter((v) => v.sw).map((v) => [v.id, v.sw]));
export { FREIBETRAG };
