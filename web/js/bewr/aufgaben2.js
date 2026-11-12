// Bewertungsrecht (GS I bis § 198 BewG) – Teil 2: allgemeines Bewertungsrecht und Bedarfsbewertung des Grundvermögens.
// Eigene Sachverhalte, Rechtsstand 2026 (BewG zuletzt geändert am 22.06.2026). Verbraucherpreisindizes in Rechenaufgaben sind
// ausdrücklich als Annahme gekennzeichnet; Vervielfältiger nach Anlage 21 BewG (rechnen.js, gegen die Tabelle geprüft).
import { A, F, M, R, eur } from "../ao/hilfen.js";
import { ertragswert, vervielfaeltiger, indiziert, liegenschaftszins } from "./rechnen.js";

const n2 = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const n4 = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: 4, maximumFractionDigits: 4 });

// ======================================================================= Allgemeines Bewertungsrecht
const allgemein = [
  A("bew-gemeiner-wert", "bew-allgemein",
    "Was ist der gemeine Wert? Welche Umstände sind bei seiner Ermittlung zu berücksichtigen, welche nicht?",
    "• Bei Bewertungen ist, soweit nichts anderes vorgeschrieben ist, der gemeine Wert zugrunde zu legen (§ 9 Abs. 1 BewG) – er ist der allgemeine Bewertungsmaßstab, auch für die Erbschaftsteuer (§ 12 Abs. 1 ErbStG).\n• Der gemeine Wert wird durch den Preis bestimmt, der im gewöhnlichen Geschäftsverkehr nach der Beschaffenheit des Wirtschaftsguts bei einer Veräußerung zu erzielen wäre (§ 9 Abs. 2 S. 1 BewG) – also der Verkehrswert aus Sicht eines fremden Erwerbers.\n• Alle preisbeeinflussenden Umstände sind zu berücksichtigen (S. 2), z. B. Zustand, Lage, Mängel.\n• Ungewöhnliche oder persönliche Verhältnisse bleiben außer Betracht (S. 3), z. B. Liebhaberpreise, Notverkäufe, Erinnerungswert.\n• Als persönliche Verhältnisse gelten auch Verfügungsbeschränkungen, die in der Person des Steuerpflichtigen oder eines Rechtsvorgängers begründet sind, insbesondere aus letztwilligen Anordnungen (§ 9 Abs. 3 BewG).",
    ["BewG 9", "ErbStG 12 1"],
    M(["Der gemeine Wert ist der Preis, der im gewöhnlichen Geschäftsverkehr bei einer Veräußerung zu erzielen wäre.", "Mängel des Wirtschaftsguts mindern den gemeinen Wert.", "Ein Liebhaberpreis bleibt außer Betracht.", "Ein testamentarisches Verkaufsverbot mindert den gemeinen Wert nicht."],
      ["Der gemeine Wert entspricht stets den Anschaffungskosten.", "Der Erinnerungswert eines Familienerbstücks erhöht den gemeinen Wert.", "Der gemeine Wert gilt nur für Grundstücke.", "Ein Notverkauf unter Wert bestimmt den gemeinen Wert."],
      "Welche Aussagen zum gemeinen Wert sind richtig?"),
    { norm: ["BewG 9"], s: ["gewoehnlichen geschaeftsverkehr", "veraeusserung", "preis", "umstaende", "ungewoehnlich|persoenlich", "verfuegungsbeschraenk"] }),
  A("bew-massstaebe", "bew-allgemein",
    "Erläutern Sie den Teilwert sowie die Bewertung von Wertpapieren, nicht notierten Anteilen und Kapitalforderungen nach dem BewG.",
    "• Teilwert (§ 10 BewG): Betrag, den ein Erwerber des ganzen Unternehmens im Rahmen des Gesamtkaufpreises für das einzelne Wirtschaftsgut ansetzen würde, wobei er das Unternehmen fortführt – Maßstab für Wirtschaftsgüter, die einem Unternehmen dienen, soweit nichts anderes vorgeschrieben ist.\n• Börsennotierte Wertpapiere: niedrigster am Stichtag im regulierten Markt notierter Kurs; ohne Notierung am Stichtag der letzte Kurs innerhalb von 30 Tagen davor (§ 11 Abs. 1 BewG).\n• Nicht notierte Anteile an Kapitalgesellschaften: gemeiner Wert – vorrangig aus Verkäufen unter fremden Dritten innerhalb des letzten Jahres, sonst nach den Ertragsaussichten oder einer anderen anerkannten Methode; Mindestwert ist der Substanzwert (§ 11 Abs. 2 BewG). Für die Erbschaftsteuer wird der Wert gesondert festgestellt (§ 151 Abs. 1 S. 1 Nr. 3 BewG, § 12 Abs. 2 ErbStG).\n• Kapitalforderungen und Schulden: Nennwert, wenn nicht besondere Umstände (z. B. Unverzinslichkeit, zweifelhafte Einbringlichkeit) einen höheren oder geringeren Wert begründen (§ 12 Abs. 1 BewG).",
    ["BewG 10", "BewG 11 1", "BewG 11 2", "BewG 12 1"],
    M(["Börsennotierte Aktien werden mit dem niedrigsten Kurs am Stichtag angesetzt.", "Kapitalforderungen werden grundsätzlich mit dem Nennwert angesetzt.", "Für nicht notierte GmbH-Anteile ist der Substanzwert die Untergrenze.", "Der Teilwert unterstellt die Fortführung des Unternehmens."],
      ["Börsennotierte Aktien werden mit dem höchsten Kurs des Jahres angesetzt.", "Schulden werden stets mit dem Barwert angesetzt.", "GmbH-Anteile werden immer mit dem Nennwert des Stammkapitals angesetzt.", "Der Teilwert ist der Einzelveräußerungspreis bei Zerschlagung des Betriebs."],
      "Welche Aussagen zu den Bewertungsmaßstäben sind richtig?"),
    { norm: ["BewG 11|BewG 12|BewG 10"], s: ["teilwert", "gesamtkaufpreis|ganzen unternehmens", "niedrigsten", "kurs", "ertragsaussicht|verkaeuf", "substanzwert", "nennwert"] }),
  A("bew-einheit", "bew-allgemein",
    "Was ist eine wirtschaftliche Einheit im Sinne des § 2 BewG, und wem werden Wirtschaftsgüter für die Bewertung zugerechnet?",
    "• Jede wirtschaftliche Einheit ist für sich zu bewerten; ihr Wert ist im Ganzen festzustellen (§ 2 Abs. 1 S. 1, 2 BewG).\n• Was als wirtschaftliche Einheit gilt, entscheidet die Verkehrsauffassung; zu berücksichtigen sind örtliche Gewohnheit, tatsächliche Übung, Zweckbestimmung und wirtschaftliche Zusammengehörigkeit (S. 3, 4) – z. B. Grundstück mit Garage und Garten.\n• Mehrere Wirtschaftsgüter bilden nur dann eine Einheit, wenn sie demselben Eigentümer gehören (§ 2 Abs. 2 BewG) – ein Grundstück im Alleineigentum und ein Miteigentumsanteil an einem Nachbargrundstück sind zwei Einheiten.\n• Wirtschaftliche Einheit des Grundvermögens ist das Grundstück im bewertungsrechtlichen Sinn, nicht das Grundbuchgrundstück.\n• Zurechnung: grundsätzlich dem zivilrechtlichen Eigentümer, bei abweichendem wirtschaftlichem Eigentum diesem (§ 39 AO).",
    ["BewG 2", "AO 39"],
    M(["Jede wirtschaftliche Einheit ist für sich zu bewerten.", "Maßgebend ist die Verkehrsauffassung.", "Zu einer wirtschaftlichen Einheit gehören nur Wirtschaftsgüter desselben Eigentümers.", "Ein Wohnhaus mit zugehöriger Garage auf demselben Grundstück bildet regelmäßig eine wirtschaftliche Einheit."],
      ["Jedes Flurstück im Grundbuch ist zwingend eine eigene wirtschaftliche Einheit.", "Grundstücke von Ehegatten bilden stets eine gemeinsame wirtschaftliche Einheit.", "Die wirtschaftliche Einheit wird vom Steuerpflichtigen frei bestimmt.", "Wirtschaftsgüter sind immer dem Besitzer zuzurechnen."],
      "Welche Aussagen zur wirtschaftlichen Einheit sind richtig?"),
    { norm: ["BewG 2"], s: ["wirtschaftliche einheit", "fuer sich", "verkehr", "zweckbestimmung|zusammengehoerigkeit", "selben eigentuemer|demselben", "39"] }),
  F("bew-massstab-fall", "bew-allgemein", "Mit welchem Wert ist das Wirtschaftsgut für die Erbschaftsteuer anzusetzen?", null, [
      { text: "200 Aktien einer DAX-Gesellschaft; am Todestag notieren sie im regulierten Markt zwischen 81,20 € und 84,60 €.", optionen: ["Niedrigster Kurs am Stichtag (81,20 € je Aktie)", "Höchster Kurs am Stichtag", "Durchschnittskurs des Vorjahres", "Nennwert der Aktien"], richtig: 0, erkl: "§ 12 Abs. 1 ErbStG i. V. m. § 11 Abs. 1 S. 1 BewG.", normen: ["BewG 11 1"] },
      { text: "Ein unverzinsliches, in zwei Monaten fälliges Darlehen über 10.000 €, das der Erblasser einem zahlungskräftigen Freund gewährt hat.", optionen: ["Nennwert, keine besonderen Umstände", "Barwert über 30 Jahre", "Gemeiner Wert nach Ertragsaussichten", "Teilwert"], richtig: 0, erkl: "Kapitalforderung mit Nennwert (§ 12 Abs. 1 S. 1 BewG); bei kurzer Restlaufzeit und sicherer Einbringlichkeit liegt kein besonderer Umstand vor.", normen: ["BewG 12 1"] },
      { text: "Ein Ölgemälde aus dem Nachlass; ein Auktionshaus schätzt den erzielbaren Verkaufserlös auf 18.000 €, die Erbin hängt aus Familientradition besonders daran.", optionen: ["Gemeiner Wert 18.000 €", "Erinnerungswert der Erbin", "Anschaffungskosten des Erblassers", "Versicherungswert"], richtig: 0, erkl: "Gemeiner Wert (§ 9 Abs. 1, 2 BewG); persönliche Verhältnisse wie der Erinnerungswert bleiben außer Betracht (§ 9 Abs. 2 S. 3 BewG).", normen: ["BewG 9"] },
      { text: "Ein 40-%-Anteil an einer nicht börsennotierten GmbH mit Sitz in Hamburg.", optionen: ["Gesondert festgestellter Wert (gemeiner Wert nach § 11 Abs. 2 BewG)", "Nennwert des Geschäftsanteils", "Buchwert laut Bilanz", "Niedrigster Börsenkurs"], richtig: 0, erkl: "§ 12 Abs. 2 ErbStG i. V. m. § 151 Abs. 1 S. 1 Nr. 3 und § 11 Abs. 2 BewG.", normen: ["ErbStG 12 2", "BewG 11 2"] },
      { text: "Ein bebautes Grundstück in Rostock.", optionen: ["Gesondert festgestellter Grundbesitzwert", "Verkehrswert laut Maklerschätzung", "Einheitswert", "Anschaffungskosten"], richtig: 0, erkl: "§ 12 Abs. 3 ErbStG i. V. m. § 151 Abs. 1 S. 1 Nr. 1, § 157 BewG.", normen: ["ErbStG 12 3", "BewG 151 1"] },
      { text: "Eine Ferienwohnung in Spanien.", optionen: ["Gemeiner Wert nach § 31 BewG", "Gesondert festgestellter Grundbesitzwert nach § 157 BewG", "Spanischer Katasterwert", "Nicht anzusetzen"], richtig: 0, erkl: "Ausländischer Grundbesitz: § 12 Abs. 7 ErbStG i. V. m. § 31 Abs. 1, § 9 BewG.", normen: ["ErbStG 12 7", "BewG 31"] },
    ]),
  R("bew-r-aktien", "bew-allgemein", (r) => {
    const n = r.zahl(5, 40) * 10, tief = r.zahl(4000, 9000) / 100, hoch = tief + r.zahl(50, 400) / 100, schluss = tief + r.zahl(10, 40) / 100;
    return {
      text: `Zum Nachlass gehören ${n} börsennotierte Aktien. Am Todestag notieren sie im regulierten Markt: Eröffnung ${n2(schluss)} €, Höchstkurs ${n2(hoch)} €, Tiefstkurs ${n2(tief)} €, Schlusskurs ${n2(schluss)} €. Zwei Wochen später ist der Kurs um 20 % gefallen.\nMit welchem Wert sind die Aktien anzusetzen?`,
      cent: Math.round(n * tief * 100),
      erklaerung: `Niedrigster am Stichtag notierter Kurs (§ 11 Abs. 1 S. 1 BewG i. V. m. § 12 Abs. 1 ErbStG): ${n} × ${n2(tief)} € = ${eur(Math.round(n * tief * 100) / 100)}. Der spätere Kursverfall ist unbeachtlich (Stichtagsprinzip, § 11 ErbStG).`,
      normen: ["BewG 11 1", "ErbStG 11"],
    };
  }),
];

// ======================================================================= Grundbesitzwert und unbebaute Grundstücke
const grundbesitz = [
  A("bew-feststellung", "bew-grundbesitz",
    "Wie wird inländischer Grundbesitz für die Erbschaftsteuer bewertet? Erläutern Sie Bedarfsbewertung und gesonderte Feststellung.",
    "• Grundbesitz ist mit dem nach § 151 Abs. 1 S. 1 Nr. 1 BewG auf den Bewertungsstichtag gesondert festgestellten Wert anzusetzen (§ 12 Abs. 3 ErbStG).\n• Bedarfsbewertung: Der Grundbesitzwert wird nur festgestellt, wenn er für die Erbschaft- oder Schenkungsteuer benötigt wird – nicht turnusmäßig.\n• Der Feststellungsbescheid ist Grundlagenbescheid für den Erbschaftsteuerbescheid (Folgebescheid, § 182 Abs. 1 AO); Einwendungen gegen den Wert sind gegen den Feststellungsbescheid zu richten.\n• Maßgebend sind die tatsächlichen Verhältnisse und die Wertverhältnisse zum Bewertungsstichtag (§ 157 Abs. 1 S. 1 BewG); ermittelt wird nach §§ 176 bis 198 BewG (§ 157 Abs. 3 BewG), Maßstab ist der gemeine Wert (§ 177 Abs. 1 BewG).\n• Zum Grundvermögen gehören Grund und Boden, Gebäude, sonstige Bestandteile und Zubehör, nicht aber Bodenschätze und Betriebsvorrichtungen (§ 176 BewG).",
    ["ErbStG 12 3", "BewG 151 1", "BewG 157 1", "BewG 176", "BewG 177"],
    M(["Inländischer Grundbesitz wird mit dem gesondert festgestellten Grundbesitzwert angesetzt.", "Grundbesitzwerte werden nur bei Bedarf festgestellt.", "Maßgebend sind die Verhältnisse am Bewertungsstichtag.", "Betriebsvorrichtungen gehören nicht zum Grundvermögen."],
      ["Grundbesitzwerte werden jährlich für alle Grundstücke festgestellt.", "Für die Erbschaftsteuer gilt der Einheitswert.", "Einwendungen gegen den Grundbesitzwert sind im Erbschaftsteuerbescheid geltend zu machen.", "Maßgebend sind die Verhältnisse am Tag der Steuerfestsetzung."],
      "Welche Aussagen zur Bewertung von Grundbesitz sind richtig?"),
    { norm: ["BewG 151|BewG 157|ErbStG 12"], s: ["gesondert", "festgestellt|feststellung", "bedarf", "grundlagenbescheid", "stichtag", "gemeine wert", "betriebsvorrichtung"] }),
  A("bew-unbebaut", "bew-grundbesitz",
    "Wann ist ein Grundstück unbebaut, und wie wird es bewertet? Welcher Bodenrichtwert ist maßgebend?",
    "• Unbebaut sind Grundstücke, auf denen sich keine benutzbaren Gebäude befinden (§ 178 Abs. 1 S. 1 BewG). Die Benutzbarkeit beginnt mit der Bezugsfertigkeit – wenn den Benutzern der Bezug zugemutet werden kann; auf die Bauabnahme kommt es nicht an (S. 2, 3).\n• Als unbebaut gelten auch Grundstücke mit Gebäuden, die auf Dauer keiner Nutzung zugeführt werden können, und Grundstücke, auf denen infolge Zerstörung oder Verfall kein benutzbarer Raum mehr vorhanden ist (§ 178 Abs. 2 BewG).\n• Bewertung: Fläche × Bodenrichtwert (§ 179 S. 1 BewG).\n• Maßgebend ist stets der Bodenrichtwert, der vom Gutachterausschuss zuletzt vor dem Bewertungsstichtag zu ermitteln war (§ 179 S. 3 BewG) – also der turnusmäßige Wert, auch wenn er erst nach dem Stichtag veröffentlicht wird.\n• Fehlt ein Bodenrichtwert, wird der Bodenwert aus Werten vergleichbarer Flächen abgeleitet (§ 179 S. 4 BewG).",
    ["BewG 178", "BewG 179"],
    M(["Ein Grundstück mit einem noch nicht bezugsfertigen Rohbau ist unbebaut.", "Unbebaute Grundstücke werden mit Fläche mal Bodenrichtwert bewertet.", "Maßgebend ist der Bodenrichtwert, der zuletzt vor dem Stichtag zu ermitteln war.", "Ein Grundstück mit einer dauerhaft unbenutzbaren Ruine gilt als unbebaut."],
      ["Ein Gebäude ist erst mit der Abnahme durch die Bauaufsicht benutzbar.", "Maßgebend ist der Bodenrichtwert, der dem Finanzamt zuletzt vor dem Stichtag mitgeteilt wurde.", "Der Bodenrichtwert wird um die Vermessungskosten erhöht.", "Unbebaute Grundstücke werden im Sachwertverfahren bewertet."],
      "Welche Aussagen zu unbebauten Grundstücken sind richtig?"),
    { norm: ["BewG 178|BewG 179"], s: ["benutzbar", "bezugsfertig", "zumut", "flaeche", "bodenrichtwert", "zuletzt vor", "verfall|zerstoerung|ruine"] }),
  R("bew-r-unbebaut", "bew-grundbesitz", (r) => {
    const qm = r.zahl(30, 120) * 10, alt = r.zahl(20, 60) * 10, neu = alt + r.zahl(2, 15) * 10, monat = r.zahl(2, 4);
    return {
      text: `Am ${String(r.zahl(3, 25)).padStart(2, "0")}.0${monat}.2026 erbt die Tochter ein unbebautes Baugrundstück (${qm} m²). Der Gutachterausschuss ermittelt die Bodenrichtwerte alle zwei Jahre zum 01.01. Zum 01.01.2024 beträgt der Bodenrichtwert ${alt} €/m². Den Bodenrichtwert zum 01.01.2026 von ${neu} €/m² beschließt der Gutachterausschuss im Mai 2026 und übermittelt ihn im Juni 2026 dem Finanzamt.\nWie hoch ist der Grundbesitzwert?`,
      cent: qm * neu * 100,
      erklaerung: `§ 179 S. 1, 3 BewG: Maßgebend ist der Bodenrichtwert, der vom Gutachterausschuss zuletzt vor dem Bewertungsstichtag zu ermitteln war – der zum 01.01.2026 (${neu} €/m²), auch wenn er erst später beschlossen und übermittelt wurde. ${qm} m² × ${neu} €/m² = ${eur(qm * neu)}.`,
      normen: ["BewG 179"],
    };
  }),
  F("bew-unbebaut-fall", "bew-grundbesitz", "Ist das Grundstück bewertungsrechtlich bebaut oder unbebaut?", ["Bebautes Grundstück (§ 180 BewG)", "Unbebautes Grundstück (§ 178 BewG)"], [
      { text: "Auf dem Grundstück steht ein Rohbau ohne Fenster, Heizung und Sanitäranlagen.", richtig: 1, erkl: "Kein benutzbares Gebäude, da noch nicht bezugsfertig (§ 178 Abs. 1 S. 1, 2 BewG).", normen: ["BewG 178"] },
      { text: "Das Einfamilienhaus ist fertiggestellt und wird bereits bewohnt; die Schlussabnahme durch die Bauaufsicht steht noch aus.", richtig: 0, erkl: "Bezugsfertig, weil den Bewohnern die Nutzung zugemutet werden kann – die Abnahme ist nicht entscheidend (§ 178 Abs. 1 S. 3 BewG).", normen: ["BewG 178", "BewG 180"] },
      { text: "Auf dem Grundstück steht ein seit Jahren verfallenes Bauernhaus ohne Dach, in dem kein benutzbarer Raum mehr vorhanden ist.", richtig: 1, erkl: "Infolge Verfalls kein benutzbarer Raum → gilt als unbebaut (§ 178 Abs. 2 S. 2 BewG).", normen: ["BewG 178"] },
      { text: "Ein Mehrfamilienhaus wird in zwei Bauabschnitten errichtet; der erste Abschnitt mit vier Wohnungen ist bezugsfertig, der zweite noch im Bau.", richtig: 0, erkl: "Der fertiggestellte Teil ist als benutzbares Gebäude anzusehen (§ 180 Abs. 1 S. 2 BewG).", normen: ["BewG 180"] },
      { text: "Auf dem Grundstück steht nur eine Gartenlaube ohne Strom- und Wasseranschluss, die zur Aufbewahrung von Geräten dient.", richtig: 1, erkl: "Kein Gebäude, das als benutzbares Gebäude im Sinne des Bewertungsrechts dem Aufenthalt von Menschen dient – das Grundstück ist unbebaut (§ 178 Abs. 1 BewG).", normen: ["BewG 178"] },
    ]),
];

// ======================================================================= Bebaute Grundstücke und Verfahren
const ART = ["Ein- oder Zweifamilienhaus · Vergleichswertverfahren", "Mietwohngrundstück · Ertragswertverfahren", "Wohnungseigentum · Vergleichswertverfahren",
  "Geschäftsgrundstück · Ertragswertverfahren", "Gemischt genutztes Grundstück · Ertragswertverfahren", "Geschäftsgrundstück · Sachwertverfahren"];
const bebaut = [
  A("bew-arten", "bew-bebaut",
    "Welche Grundstücksarten unterscheidet § 181 BewG? Nennen Sie die Abgrenzungsmerkmale.",
    "• Ein- und Zweifamilienhäuser: Wohngrundstücke mit bis zu zwei Wohnungen, kein Wohnungseigentum; sie bleiben es auch, wenn sie zu weniger als 50 % (Wohn-/Nutzfläche) anders mitbenutzt werden und die Eigenart nicht wesentlich beeinträchtigt wird (§ 181 Abs. 2 BewG).\n• Mietwohngrundstücke: zu mehr als 80 % Wohnzwecken dienend, kein Ein-/Zweifamilienhaus und kein Wohnungseigentum (Abs. 3).\n• Wohnungs- und Teileigentum: Sondereigentum an einer Wohnung bzw. an nicht Wohnzwecken dienenden Räumen mit Miteigentumsanteil (Abs. 4, 5).\n• Geschäftsgrundstücke: zu mehr als 80 % eigenen oder fremden betrieblichen oder öffentlichen Zwecken dienend (Abs. 6).\n• Gemischt genutzte Grundstücke: teils Wohn-, teils betrieblichen Zwecken dienend, soweit keine der vorigen Arten (Abs. 7).\n• Sonstige bebaute Grundstücke (Abs. 8), z. B. Clubhäuser, Wochenendhäuser.\n• Wohnung: abgeschlossene Wohneinheit mit eigenem Zugang, Küche, Bad oder Dusche und Toilette, in der Regel mindestens 20 m² (Abs. 9).",
    ["BewG 181"],
    M(["Ein Haus mit zwei Wohnungen ist ein Zweifamilienhaus.", "Ein Grundstück, das zu 85 % Wohnzwecken dient und fünf Wohnungen hat, ist ein Mietwohngrundstück.", "Dient ein Grundstück zu mehr als 80 % betrieblichen Zwecken, ist es ein Geschäftsgrundstück.", "Eine Wohnung muss in der Regel mindestens 20 m² groß sein."],
      ["Ein Haus mit drei Wohnungen ist ein Zweifamilienhaus.", "Ein Grundstück, das zu 70 % Wohnzwecken dient, ist ein Mietwohngrundstück.", "Wohnungseigentum ist stets ein Mietwohngrundstück.", "Eine Wohnung braucht keinen eigenen Zugang."],
      "Welche Aussagen zu den Grundstücksarten sind richtig?"),
    { norm: ["BewG 181"], s: ["zwei wohnungen|zweifamilien", "80", "mietwohn", "geschaeftsgrundstueck", "gemischt", "wohnungseigentum", "50"] }),
  A("bew-verfahren", "bew-bebaut",
    "Welches Bewertungsverfahren ist für welche Grundstücksart anzuwenden? Wie funktioniert das Vergleichswertverfahren?",
    "• Vergleichswertverfahren (§ 182 Abs. 2 BewG): Wohnungseigentum, Teileigentum, Ein- und Zweifamilienhäuser.\n• Ertragswertverfahren (§ 182 Abs. 3 BewG): Mietwohngrundstücke sowie Geschäftsgrundstücke und gemischt genutzte Grundstücke, für die sich auf dem örtlichen Grundstücksmarkt eine übliche Miete ermitteln lässt.\n• Sachwertverfahren (§ 182 Abs. 4 BewG): Grundstücke des Vergleichswertverfahrens ohne Vergleichswert, Geschäfts- und gemischt genutzte Grundstücke ohne übliche Miete, sonstige bebaute Grundstücke.\n• Vergleichswertverfahren (§ 183 BewG): Herangezogen werden Kaufpreise hinreichend vergleichbarer Grundstücke, vorrangig die vom Gutachterausschuss mitgeteilten Vergleichspreise (Abs. 1). Stattdessen können Vergleichsfaktoren je Flächeneinheit verwendet werden; beziehen sie sich nur auf das Gebäude, ist der Bodenwert nach § 179 BewG gesondert hinzuzurechnen (Abs. 2).",
    ["BewG 182", "BewG 183"],
    M(["Ein Einfamilienhaus wird vorrangig im Vergleichswertverfahren bewertet.", "Mietwohngrundstücke werden im Ertragswertverfahren bewertet.", "Ein Geschäftsgrundstück ohne ortsübliche Miete wird im Sachwertverfahren bewertet.", "Bei gebäudebezogenen Vergleichsfaktoren ist der Bodenwert gesondert anzusetzen."],
      ["Wohnungseigentum wird stets im Ertragswertverfahren bewertet.", "Mietwohngrundstücke werden im Sachwertverfahren bewertet.", "Der Steuerpflichtige kann das Bewertungsverfahren frei wählen.", "Im Vergleichswertverfahren werden die Baukosten des Gebäudes angesetzt."],
      "Welche Aussagen zu den Bewertungsverfahren sind richtig?"),
    { norm: ["BewG 182"], s: ["vergleichswert", "ertragswert", "sachwert", "uebliche miete", "vergleichspreis|vergleichsfaktor", "bodenwert"] }),
  F("bew-art-fall", "bew-bebaut", "Welche Grundstücksart liegt vor, und nach welchem Verfahren ist zu bewerten?", ART, [
      { text: "Ein Haus mit zwei Wohnungen; die Eigentümerin bewohnt das Erdgeschoss, das Obergeschoss ist vermietet. Für vergleichbare Häuser liegen Vergleichsfaktoren des Gutachterausschusses vor.", richtig: 0, erkl: "Bis zu zwei Wohnungen → Zweifamilienhaus (§ 181 Abs. 2 BewG) → Vergleichswertverfahren (§ 182 Abs. 2 Nr. 3 BewG).", normen: ["BewG 181", "BewG 182"] },
      { text: "Ein Haus mit einer Wohnung (120 m²) und einem Steuerberaterbüro des Eigentümers (40 m²); die Eigenart als Wohnhaus bleibt erhalten. Vergleichsfaktoren liegen vor.", richtig: 0, erkl: "Weniger als 50 % anderweitige Mitbenutzung (25 %), Eigenart nicht wesentlich beeinträchtigt → Einfamilienhaus (§ 181 Abs. 2 S. 2 BewG) → Vergleichswertverfahren.", normen: ["BewG 181", "BewG 182"] },
      { text: "Ein Haus mit acht vermieteten Wohnungen (640 m²) und einem kleinen Kiosk im Erdgeschoss (40 m²).", richtig: 1, erkl: "Mehr als 80 % Wohnzwecke (640/680 = 94 %), mehr als zwei Wohnungen → Mietwohngrundstück (§ 181 Abs. 3 BewG) → Ertragswertverfahren (§ 182 Abs. 3 Nr. 1 BewG).", normen: ["BewG 181", "BewG 182"] },
      { text: "Eine vermietete Eigentumswohnung (Sondereigentum mit Miteigentumsanteil). Vergleichspreise liegen vor.", richtig: 2, erkl: "Wohnungseigentum (§ 181 Abs. 4 BewG) → Vergleichswertverfahren (§ 182 Abs. 2 Nr. 1 BewG).", normen: ["BewG 181", "BewG 182"] },
      { text: "Ein Bürohaus, zu 95 % an Unternehmen vermietet, im Dachgeschoss eine Hausmeisterwohnung (5 %). Ortsübliche Büromieten lassen sich ermitteln.", richtig: 3, erkl: "Mehr als 80 % betriebliche Zwecke → Geschäftsgrundstück (§ 181 Abs. 6 BewG); übliche Miete ermittelbar → Ertragswertverfahren (§ 182 Abs. 3 Nr. 2 BewG).", normen: ["BewG 181", "BewG 182"] },
      { text: "Ein Gebäude mit sechs Wohnungen (600 m²) und einem vermieteten Ladenlokal (200 m²); ortsübliche Mieten lassen sich ermitteln.", richtig: 4, erkl: "75 % Wohnen, 25 % Gewerbe – weder über 80 % Wohnen noch über 80 % Gewerbe → gemischt genutztes Grundstück (§ 181 Abs. 7 BewG) → Ertragswertverfahren bei üblicher Miete (§ 182 Abs. 3 Nr. 2 BewG).", normen: ["BewG 181", "BewG 182"] },
      { text: "Eine eigengenutzte Produktionshalle mit Verwaltungstrakt; für solche Gebäude gibt es am örtlichen Markt keine übliche Miete.", richtig: 5, erkl: "Geschäftsgrundstück (§ 181 Abs. 6 BewG) ohne ermittelbare übliche Miete → Sachwertverfahren (§ 182 Abs. 4 Nr. 2 BewG).", normen: ["BewG 181", "BewG 182"] },
    ]),
  R("bew-r-vergleich", "bew-bebaut", (r) => {
    const wfl = r.zahl(90, 180), faktor = r.zahl(28, 55) * 100, nurGebaeude = r.muenze(), qm = r.zahl(40, 90) * 10, brw = r.zahl(25, 90) * 10;
    const wert = wfl * faktor + (nurGebaeude ? qm * brw : 0);
    return {
      text: `Zu bewerten ist ein Einfamilienhaus mit ${wfl} m² Wohnfläche auf einem ${qm} m² großen Grundstück (Bodenrichtwert ${brw} €/m²). Der Gutachterausschuss hat für vergleichbare Einfamilienhäuser einen Vergleichsfaktor von ${eur(faktor)} je m² Wohnfläche ermittelt, der sich ${nurGebaeude ? "nur auf das Gebäude bezieht (ohne Bodenwert)" : "auf das bebaute Grundstück einschließlich Bodenwert bezieht"}.\nWie hoch ist der Vergleichswert?`,
      cent: wert * 100,
      erklaerung: nurGebaeude
        ? `Gebäudebezogener Vergleichsfaktor: ${wfl} m² × ${eur(faktor)} = ${eur(wfl * faktor)} zuzüglich Bodenwert nach § 179 BewG ${qm} m² × ${brw} €/m² = ${eur(qm * brw)} (§ 183 Abs. 2 S. 2 BewG) = ${eur(wert)}.`
        : `Vergleichsfaktor für das gesamte Grundstück: ${wfl} m² × ${eur(faktor)} = ${eur(wert)} (§ 183 Abs. 2 S. 1 BewG); der Bodenwert ist darin enthalten.`,
      normen: ["BewG 183"],
    };
  }),
];

// ======================================================================= Ertragswertverfahren und § 198
const VPI = [[121.4, 77.1], [123.0, 77.1], [119.6, 77.1]]; // Annahmen für Rechenaufgaben (VPI Oktober Vorjahr, Oktober 2001; 2020 = 100)
const ertrag = [
  A("bew-ertragswert-schema", "bew-ertragswert",
    "Stellen Sie das Ertragswertverfahren nach §§ 184 bis 188 BewG in Schritten dar.",
    "1. Bodenwert wie unbebautes Grundstück: Fläche × Bodenrichtwert (§ 184 Abs. 2, § 179 BewG).\n2. Rohertrag: vertraglich vereinbarte Jahresmiete ohne Umlagen für Betriebskosten (§ 186 Abs. 1 BewG); bei Eigennutzung, Leerstand, unentgeltlicher Überlassung oder Abweichung von mehr als 20 % die übliche Miete (§ 186 Abs. 2 BewG).\n3. − Bewirtschaftungskosten nach Anlage 23: Verwaltungs- und Instandhaltungskosten (Wohnnutzung indexiert), Mietausfallwagnis (§ 187 BewG)\n4. = Reinertrag (§ 185 Abs. 1 BewG)\n5. − Bodenwertverzinsung: Bodenwert × Liegenschaftszinssatz (§ 185 Abs. 2, § 188 BewG)\n6. = Gebäudereinertrag\n7. × Vervielfältiger aus Anlage 21 nach Liegenschaftszins und Restnutzungsdauer (§ 185 Abs. 3 BewG); Restnutzungsdauer = Gesamtnutzungsdauer (Anlage 22) − Alter, mindestens 30 % der Gesamtnutzungsdauer, bei Abbruchverpflichtung begrenzt\n8. = Gebäudeertragswert\n9. Bodenwert + Gebäudeertragswert = Ertragswert, mindestens der Bodenwert (§ 184 Abs. 3 BewG); Außenanlagen sind abgegolten (§ 184 Abs. 4 BewG).",
    ["BewG 184", "BewG 185", "BewG 186", "BewG 187", "BewG 188"],
    M(["Bodenwert und Gebäudeertragswert werden getrennt ermittelt.", "Umlagen für Betriebskosten gehören nicht zum Rohertrag.", "Der Reinertrag wird um die Verzinsung des Bodenwerts gemindert.", "Der Ertragswert ist mindestens der Bodenwert."],
      ["Der Rohertrag ist die Warmmiete einschließlich Nebenkosten.", "Der Vervielfältiger richtet sich nach dem Baujahr allein.", "Die Restnutzungsdauer kann null Jahre betragen, solange das Gebäude genutzt wird.", "Außenanlagen werden zusätzlich zum Ertragswert angesetzt."],
      "Welche Aussagen zum Ertragswertverfahren sind richtig?"),
    { norm: ["BewG 185|BewG 184"], s: ["bodenwert", "rohertrag", "bewirtschaftungskosten", "reinertrag", "liegenschaftszins", "gebaeudereinertrag", "vervielfaeltiger", "restnutzungsdauer"] }),
  R("bew-r-rohertrag", "bew-ertragswert", (r) => {
    const w = r.zahl(4, 8), miete = r.zahl(6, 12) * 100, nk = r.zahl(15, 30) * 10, eigen = r.zahl(7, 14) * 100, ueblich = r.zahl(6, 12) * 100;
    const verwandt = Math.round(ueblich * r.wahl([0.6, 0.7, 0.9]) / 10) * 10, weicht = verwandt < ueblich * 0.8;
    const roh = 12 * (w * miete + eigen + (weicht ? ueblich : verwandt));
    return {
      text: `Ein Mietwohngrundstück hat ${w + 2} Wohnungen. ${w} Wohnungen sind zu je ${eur(miete)} Kaltmiete zuzüglich ${eur(nk)} Betriebskostenvorauszahlung monatlich fremdvermietet. Eine Wohnung bewohnt der Eigentümer selbst (übliche Miete ${eur(eigen)} monatlich). Eine Wohnung ist an seine Tochter für ${eur(verwandt)} kalt vermietet; die übliche Miete beträgt ${eur(ueblich)}.\nWie hoch ist der jährliche Rohertrag?`,
      cent: roh * 100,
      erklaerung: `Vertragliche Kaltmiete ohne Umlagen (§ 186 Abs. 1 BewG): ${w} × ${eur(miete)}; eigengenutzte Wohnung mit üblicher Miete ${eur(eigen)} (§ 186 Abs. 2 Nr. 1 BewG); Tochter: ${weicht ? `Abweichung von mehr als 20 % → übliche Miete ${eur(ueblich)} (§ 186 Abs. 2 Nr. 2 BewG)` : `Abweichung nicht mehr als 20 % → vereinbarte Miete ${eur(verwandt)}`}. Jahresbetrag: 12 × ${eur(w * miete + eigen + (weicht ? ueblich : verwandt))} = ${eur(roh)}.`,
      normen: ["BewG 186"],
    };
  }),
  R("bew-r-bwk", "bew-ertragswert", (r) => {
    const [neu, alt] = r.wahl(VPI), w = r.zahl(4, 10), wfl = w * r.zahl(55, 90), mieteW = 12 * Math.round(wfl * r.zahl(80, 140) / 10), gewQm = r.muenze() ? r.zahl(5, 15) * 10 : 0, mieteG = gewQm ? 12 * gewQm * r.zahl(10, 18) : 0;
    const ix = indiziert(neu, alt), verw = w * ix.verwaltungJeWohnung + Math.round(mieteG * 0.03), inst = Math.round((wfl + gewQm) * ix.instandJeQm), maw = Math.round(mieteW * 0.02) + Math.round(mieteG * 0.04);
    const sum = verw + inst + maw;
    return {
      text: `Für ein ${gewQm ? "gemischt genutztes Grundstück" : "Mietwohngrundstück"} sind die Bewirtschaftungskosten nach Anlage 23 BewG zu ermitteln: ${w} Wohnungen mit zusammen ${wfl} m² Wohnfläche, Jahresrohertrag Wohnungen ${eur(mieteW)}${gewQm ? `; ein Laden mit ${gewQm} m² Nutzfläche, Jahresrohertrag ${eur(mieteG)}` : ""}. Annahme: Verbraucherpreisindex Oktober des Vorjahres ${n2(neu).replace(/0$/, "")}, Oktober 2001 ${n2(alt).replace(/0$/, "")}.\nWie hoch sind die Bewirtschaftungskosten insgesamt?`,
      cent: sum * 100,
      erklaerung: `Indexierung (§ 187 Abs. 3 BewG, Anlage 23): Verwaltung 230 € × ${n2(neu)}/${n2(alt)} = ${eur(ix.verwaltungJeWohnung)} je Wohnung (volle Euro); Instandhaltung 9 € × ${n2(neu)}/${n2(alt)} = ${n2(ix.instandJeQm)} € je m² (eine Nachkommastelle). Verwaltung ${w} × ${eur(ix.verwaltungJeWohnung)}${gewQm ? ` + 3 % von ${eur(mieteG)}` : ""} = ${eur(verw)}; Instandhaltung ${wfl + gewQm} m² × ${n2(ix.instandJeQm)} € = ${eur(inst)}; Mietausfallwagnis 2 % von ${eur(mieteW)}${gewQm ? ` + 4 % von ${eur(mieteG)}` : ""} = ${eur(maw)}. Summe ${eur(sum)}.`,
      normen: ["BewG 187"],
    };
  }),
  R("bew-r-rnd", "bew-ertragswert", (r) => {
    const fall = r.wahl(["normal", "mindest", "abbruch"]), jahr = 2026, gnd = 80;
    const bau = fall === "normal" ? r.zahl(1975, 2010) : r.zahl(1930, 1965), alter = jahr - bau, abbruch = fall === "abbruch" ? r.zahl(5, 15) : null;
    const regel = Math.max(gnd - alter, 0), min = Math.ceil(gnd * 0.3), rnd = abbruch != null ? Math.min(Math.max(regel, min), abbruch) : Math.max(regel, min);
    const liz = 3.5, vv = vervielfaeltiger(rnd, liz), ger = r.zahl(30, 90) * 1000 + r.zahl(0, 9) * 37, gew = Math.round(ger * vv);
    return {
      text: `Ein Mietwohngrundstück (Gesamtnutzungsdauer nach Anlage 22 BewG: 80 Jahre) wurde ${bau} bezugsfertig. Bewertungsstichtag ist der 01.07.${jahr}.${abbruch != null ? ` Der Eigentümer ist verpflichtet, das Gebäude in ${abbruch} Jahren abzubrechen.` : ""} Liegenschaftszins 3,5 % (§ 188 Abs. 2 S. 2 Nr. 1 BewG); der Gebäudereinertrag beträgt ${eur(ger)}.\nWie hoch ist der Gebäudeertragswert (Vervielfältiger nach Anlage 21 BewG)?`,
      cent: gew * 100,
      erklaerung: `Alter ${jahr} − ${bau} = ${alter} Jahre (§ 185 Abs. 3 S. 4 BewG). Restnutzungsdauer ${gnd} − ${alter} = ${regel} Jahre${regel < min ? `, mindestens 30 % von ${gnd} = ${min} Jahre (§ 185 Abs. 3 S. 6 BewG)` : ""}${abbruch != null ? `; wegen der Abbruchverpflichtung begrenzt auf ${abbruch} Jahre (§ 185 Abs. 3 S. 7 BewG)` : ""} → ${rnd} Jahre. Vervielfältiger bei 3,5 % und ${rnd} Jahren: ${n4(vv)} (Anlage 21). Gebäudeertragswert ${eur(ger)} × ${n4(vv)} = ${eur(gew)} (§ 185 Abs. 3 S. 1 BewG).`,
      normen: ["BewG 185"],
    };
  }),
  R("bew-r-ertragswert", "bew-ertragswert", (r) => {
    const [neu, alt] = r.wahl(VPI), w = r.zahl(6, 12), wfl = w * r.zahl(60, 85), gewQm = r.wahl([0, 0, r.zahl(10, 40) * 10]);
    const mieteW = 12 * Math.round(wfl * r.zahl(85, 130) / 10), mieteG = gewQm ? 12 * gewQm * r.zahl(10, 16) : 0, flaeche = r.zahl(40, 120) * 10, brw = r.zahl(30, 120) * 10, bau = r.zahl(1960, 2005);
    const liz = liegenschaftszins(wfl, gewQm), e = ertragswert({ flaeche, brw, mieteWohnJahr: mieteW, mieteGewerbeJahr: mieteG, wohnungen: w, wohnQm: wfl, gewerbeQm: gewQm, baujahr: bau, jahr: 2026, gnd: 80, liz, vpi: [neu, alt] });
    return {
      text: `Bewerten Sie zum 15.05.2026 ein ${gewQm ? "gemischt genutztes Grundstück" : "Mietwohngrundstück"} im Ertragswertverfahren:\n• Grundstück ${flaeche} m², maßgebender Bodenrichtwert ${brw} €/m²\n• ${w} Wohnungen, ${wfl} m² Wohnfläche, Jahreskaltmiete ohne Umlagen ${eur(mieteW)} (ortsüblich)${gewQm ? `\n• Laden mit ${gewQm} m² Nutzfläche, Jahreskaltmiete ${eur(mieteG)} (ortsüblich)` : ""}\n• bezugsfertig ${bau}, Gesamtnutzungsdauer 80 Jahre; kein Liegenschaftszins des Gutachterausschusses\n• Annahme: VPI Oktober 2025 = ${n2(neu).replace(/0$/, "")}, Oktober 2001 = ${n2(alt).replace(/0$/, "")}\nWie hoch ist der Grundbesitzwert?`,
      cent: e.ertragswert * 100,
      erklaerung: `Bodenwert ${flaeche} × ${brw} = ${eur(e.bodenwert)}. Rohertrag ${eur(e.rohertrag)} − Bewirtschaftungskosten ${eur(e.bwk)} (Verwaltung ${eur(e.verwaltung)}, Instandhaltung ${eur(e.instand)}, Mietausfall ${eur(e.mietausfall)}) = Reinertrag ${eur(e.reinertrag)} − Bodenwertverzinsung ${n2(liz).replace(/0$/, "")} % = ${eur(e.verzinsung)} → Gebäudereinertrag ${eur(e.gebaeudereinertrag)}. Restnutzungsdauer 80 − ${e.alter} = ${e.rndRegel}${e.rndRegel < e.rndMin ? `, mindestens ${e.rndMin}` : ""} Jahre; Vervielfältiger ${n4(e.vv)} → Gebäudeertragswert ${eur(e.gebaeudeertragswert)}. Ertragswert ${eur(e.bodenwert)} + ${eur(e.gebaeudeertragswert)} = ${eur(e.ertragswert)} (§§ 184–188 BewG).`,
      normen: ["BewG 184", "BewG 185", "BewG 187", "BewG 188"],
    };
  }),
  A("bew-198", "bew-ertragswert",
    "Wie kann der Steuerpflichtige einen niedrigeren Grundbesitzwert erreichen? Erläutern Sie § 198 BewG.",
    "• Weist der Steuerpflichtige nach, dass der gemeine Wert der wirtschaftlichen Einheit am Bewertungsstichtag niedriger ist als der nach §§ 179, 182 bis 196 BewG ermittelte Wert, ist dieser niedrigere Wert anzusetzen (§ 198 Abs. 1 S. 1 BewG) – Öffnungsklausel.\n• Die Nachweislast trägt der Steuerpflichtige; es gelten grundsätzlich die Vorschriften zur Verkehrswertermittlung nach dem Baugesetzbuch (ImmoWertV).\n• Nachweis durch ein Gutachten des örtlichen Gutachterausschusses oder eines öffentlich bestellten bzw. zertifizierten Sachverständigen (§ 198 Abs. 2 BewG).\n• Oder durch einen im gewöhnlichen Geschäftsverkehr innerhalb eines Jahres vor oder nach dem Stichtag erzielten Kaufpreis für das Grundstück, wenn sich die maßgeblichen Verhältnisse nicht geändert haben (§ 198 Abs. 3 BewG).\n• Bedeutung: Besonderheiten wie Altlasten, Bauschäden oder Belastungen bleiben im typisierenden Verfahren unberücksichtigt (§ 177 Abs. 4 BewG) und lassen sich nur über § 198 BewG berücksichtigen. Wirkt sich eine grundstücksbezogene Belastung im Gutachtenwert aus, darf sie nicht noch einmal als Schuld abgezogen werden (§ 10 Abs. 6b ErbStG).",
    ["BewG 198", "BewG 177", "ErbStG 10 6b"],
    M(["Der Steuerpflichtige kann einen niedrigeren gemeinen Wert nachweisen.", "Als Nachweis dient regelmäßig ein Gutachten des Gutachterausschusses oder eines zertifizierten Sachverständigen.", "Ein Verkaufspreis innerhalb eines Jahres vor oder nach dem Stichtag kann als Nachweis dienen.", "Altlasten können über § 198 BewG berücksichtigt werden."],
      ["Das Finanzamt muss von Amts wegen prüfen, ob der Verkehrswert niedriger ist.", "Ein Verkaufspreis drei Jahre nach dem Stichtag reicht als Nachweis.", "Über § 198 BewG kann auch ein höherer Wert angesetzt werden.", "Ein Maklerexposé genügt als Nachweis."],
      "Welche Aussagen zu § 198 BewG sind richtig?"),
    { norm: ["BewG 198"], s: ["nachweis", "niedriger", "gemeine wert", "gutachten", "sachverstaendig|gutachterausschuss", "kaufpreis", "ein jahr|eines jahres"] }),
  F("bew-liz-fall", "bew-ertragswert", "Welcher Liegenschaftszinssatz ist anzuwenden, wenn der Gutachterausschuss keinen geeigneten Zinssatz ermittelt hat?",
    ["3,5 %", "4,5 %", "5,0 %", "6,0 %"], [
      { text: "Mietwohngrundstück mit zehn Wohnungen.", richtig: 0, erkl: "§ 188 Abs. 2 S. 2 Nr. 1 BewG.", normen: ["BewG 188"] },
      { text: "Gemischt genutztes Grundstück: 600 m² Wohnfläche, 200 m² vermietete Gewerbefläche.", richtig: 1, erkl: "Gewerblicher Anteil 25 % – bis zu 50 % (§ 188 Abs. 2 S. 2 Nr. 2 BewG).", normen: ["BewG 188"] },
      { text: "Gemischt genutztes Grundstück: 300 m² Wohnfläche, 450 m² Büroflächen.", richtig: 2, erkl: "Gewerblicher Anteil 60 % – mehr als 50 % (§ 188 Abs. 2 S. 2 Nr. 3 BewG).", normen: ["BewG 188"] },
      { text: "Geschäftsgrundstück: Bürogebäude, zu 92 % fremdvermietete Büros.", richtig: 3, erkl: "§ 188 Abs. 2 S. 2 Nr. 4 BewG.", normen: ["BewG 188"] },
      { text: "Gemischt genutztes Grundstück: 400 m² Wohnfläche, 400 m² Praxisflächen.", richtig: 1, erkl: "Gewerblicher Anteil genau 50 % – „bis zu 50 %“ (§ 188 Abs. 2 S. 2 Nr. 2 BewG).", normen: ["BewG 188"] },
    ]),
];

export const BEWR_TEIL2 = [...allgemein, ...grundbesitz, ...bebaut, ...ertrag];
