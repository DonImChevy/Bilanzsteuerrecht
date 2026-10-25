// Lernpfad Öffentliches Recht (Staatsrecht nach Skript Kapitel 1–2). Jeder Block ist in sich geschlossen:
// Seine Lernkarten erklären alles, was seine Fragen abfragen. Format wie js/ust/pfad.js.

export const PFAD_OER = [
  {
    id: "o-staat", titel: "Was ist ein Staat?", kurz: "Drei-Elemente-Lehre · Art. 20, 79 GG", icon: "🏛️", normen: ["GG 20", "GG 79"],
    karten: [
      { art: "merksatz", titel: "Drei-Elemente-Lehre", text: "Ein **Staat** liegt nach der Drei-Elemente-Lehre (Georg Jellinek) vor, wenn **drei Merkmale** zusammenkommen:\n• **Staatsgebiet** – ein abgegrenzter Teil der Erdoberfläche,\n• **Staatsvolk** – die Menschen, die dauerhaft dazugehören (Staatsangehörige),\n• **Staatsgewalt** – eine Herrschaftsmacht, die nach innen und außen unabhängig ist." },
      { art: "erklaerung", titel: "Die Grundprinzipien des Grundgesetzes", text: "Art. 20 GG legt fest, wie Deutschland aufgebaut ist: Die Bundesrepublik ist eine **Republik**, ein **demokratischer**, **sozialer** und **Bundesstaat** (Abs. 1) und ein **Rechtsstaat** (Abs. 3). Man nennt das die **Staatsstrukturprinzipien**." },
      { art: "erklaerung", titel: "Ewigkeitsgarantie", text: "Diese Prinzipien dürfen **nicht einmal durch eine Verfassungsänderung** abgeschafft werden – genauso wenig wie die Menschenwürde (Art. 1 GG) und die Gliederung des Bundes in Länder (**Art. 79 Abs. 3 GG**, „Ewigkeitsgarantie“). Sonstige Änderungen des GG brauchen **zwei Drittel der Mitglieder des Bundestags** und **zwei Drittel der Stimmen des Bundesrats** (Art. 79 Abs. 2 GG)." },
    ],
    fragen: [
      { art: "wahl", frage: "Welche drei Elemente machen nach Jellinek einen Staat aus?", optionen: ["Staatsgebiet, Staatsvolk, Staatsgewalt", "Parlament, Regierung, Gerichte", "Bund, Länder, Gemeinden", "Verfassung, Gesetze, Verordnungen"], richtig: 0, erkl: "Drei-Elemente-Lehre." },
      { art: "wahl", frage: "Kann der Bundestag mit Zwei-Drittel-Mehrheit das Bundesstaatsprinzip abschaffen?", optionen: ["Nein – Art. 79 Abs. 3 GG verbietet das", "Ja, mit Zustimmung des Bundesrats", "Ja, mit Volksabstimmung", "Ja, wenn das BVerfG zustimmt"], richtig: 0, erkl: "Ewigkeitsgarantie." },
      { art: "wahl", frage: "Welche Mehrheit braucht eine zulässige Änderung des Grundgesetzes?", optionen: ["Zwei Drittel in Bundestag und Bundesrat", "Einfache Mehrheit im Bundestag", "Absolute Mehrheit im Bundestag", "Drei Viertel im Bundesrat"], richtig: 0, erkl: "Art. 79 Abs. 2 GG." },
    ],
  },
  {
    id: "o-republik", titel: "Republik & Sozialstaat", kurz: "Art. 20 Abs. 1, 20a GG", icon: "⚖️", normen: ["GG 20", "GG 20a"],
    karten: [
      { art: "merksatz", titel: "Republik", text: "**Republik** heißt: Das Staatsoberhaupt ist **kein Monarch**, sondern wird **auf Zeit gewählt**. In Deutschland ist das der **Bundespräsident** – gewählt für fünf Jahre." },
      { art: "erklaerung", titel: "Sozialstaat", text: "Das **Sozialstaatsprinzip** (Art. 20 Abs. 1 GG) verpflichtet den Staat, für **soziale Gerechtigkeit** und ein **menschenwürdiges Existenzminimum** zu sorgen – z. B. durch Sozialversicherung, Bürgergeld, Kindergeld. Wie genau, entscheidet der Gesetzgeber; einklagbare Einzelansprüche folgen daraus grundsätzlich **nicht**." },
      { art: "erklaerung", titel: "Staatsziele", text: "**Art. 20a GG** verpflichtet den Staat, die **natürlichen Lebensgrundlagen** und die **Tiere** zu schützen – auch in Verantwortung für künftige Generationen. Ein Staatsziel ist ein **Auftrag an den Staat**, kein Grundrecht des Einzelnen." },
    ],
    fragen: [
      { art: "wahl", frage: "Was bedeutet „Republik“?", optionen: ["Das Staatsoberhaupt wird auf Zeit gewählt – kein Monarch", "Das Volk entscheidet alles direkt", "Es gibt mehrere Bundesländer", "Der Staat sorgt für soziale Gerechtigkeit"], richtig: 0, erkl: "Gegenbegriff ist die Monarchie." },
      { art: "wahl", frage: "Kann ein Bürger direkt aus dem Sozialstaatsprinzip eine bestimmte Geldleistung einklagen?", optionen: ["Grundsätzlich nein – der Gesetzgeber gestaltet aus", "Ja, immer", "Ja, aber nur beim BVerfG", "Nur Beamte"], richtig: 0, erkl: "Das Sozialstaatsprinzip ist ein Gestaltungsauftrag." },
      { art: "wahl", frage: "Was regelt Art. 20a GG?", optionen: ["Schutz der natürlichen Lebensgrundlagen und der Tiere", "Das Wahlrecht", "Die Gewaltenteilung", "Die Parteienfinanzierung"], richtig: 0, erkl: "Staatsziel Umwelt- und Tierschutz." },
    ],
  },
  {
    id: "o-demokratie", titel: "Demokratie", kurz: "Art. 20 Abs. 2 GG", icon: "🗳️", normen: ["GG 20", "GG 38"],
    karten: [
      { art: "merksatz", titel: "Alle Staatsgewalt geht vom Volke aus", text: "Das ist der Kern der Demokratie (**Volkssouveränität**, Art. 20 Abs. 2 S. 1 GG). Das Volk übt die Staatsgewalt aus in **Wahlen und Abstimmungen** und durch besondere Organe der **Gesetzgebung, vollziehenden Gewalt und Rechtsprechung** (S. 2)." },
      { art: "erklaerung", titel: "Repräsentative Demokratie", text: "Deutschland ist eine **repräsentative (mittelbare)** Demokratie: Das Volk wählt den **Bundestag**, und dieser entscheidet stellvertretend. **Volksabstimmungen** sieht das GG auf Bundesebene nur bei der **Neugliederung des Bundesgebiets** vor (Art. 29 GG – abgestimmt wird in den betroffenen Ländern)." },
      { art: "erklaerung", titel: "Mehrheitsprinzip und Opposition", text: "Entschieden wird mit **Mehrheit** – aber die Minderheit muss die Chance haben, selbst zur Mehrheit zu werden. Deshalb gehören **regelmäßige Wahlen**, **Opposition** und **Parteienvielfalt** zur Demokratie." },
    ],
    fragen: [
      { art: "wahl", frage: "Wie übt das Volk nach Art. 20 Abs. 2 GG die Staatsgewalt aus?", optionen: ["In Wahlen und Abstimmungen und durch besondere Organe", "Nur durch den Bundespräsidenten", "Nur durch Volksabstimmungen", "Durch die Parteien allein"], richtig: 0, erkl: "Art. 20 Abs. 2 S. 2 GG." },
      { art: "wahl", frage: "Wann sieht das GG eine Volksabstimmung auf Bundesebene vor?", optionen: ["Bei der Neugliederung des Bundesgebiets (Art. 29)", "Bei jedem Gesetz", "Bei der Wahl des Kanzlers", "Nie"], richtig: 0, erkl: "Ansonsten entscheidet der gewählte Bundestag." },
      { art: "wahl", frage: "Was bedeutet repräsentative Demokratie?", optionen: ["Gewählte Vertreter entscheiden für das Volk", "Das Volk entscheidet alles selbst", "Der Präsident regiert allein", "Gerichte machen die Gesetze"], richtig: 0, erkl: "Mittelbare Demokratie über das Parlament." },
    ],
  },
  {
    id: "o-rechtsstaat", titel: "Rechtsstaat", kurz: "Art. 20 Abs. 2, 3 GG", icon: "📜", normen: ["GG 20"],
    karten: [
      { art: "merksatz", titel: "Der Staat ist an das Recht gebunden", text: "Im Rechtsstaat ist **jede staatliche Macht an Recht und Gesetz gebunden**: Die Gesetzgebung an die Verfassung, Verwaltung und Gerichte an **Gesetz und Recht** (Art. 20 Abs. 3 GG)." },
      { art: "erklaerung", titel: "Die Bausteine", text: "• **Gewaltenteilung** (Art. 20 Abs. 2 S. 2 GG): Gesetzgebung, vollziehende Gewalt, Rechtsprechung kontrollieren sich gegenseitig.\n• **Vorrang des Gesetzes**: Die Verwaltung darf **nicht gegen** ein Gesetz handeln.\n• **Vorbehalt des Gesetzes**: Für **Eingriffe** in Rechte des Bürgers (z. B. Steuern) braucht die Verwaltung eine **gesetzliche Grundlage**.\n• **Rechtssicherheit und Vertrauensschutz**, effektiver **Rechtsschutz** durch Gerichte." },
      { art: "erklaerung", titel: "Verhältnismäßigkeit", text: "Ein staatlicher Eingriff ist nur zulässig, wenn er\n1. einen **legitimen Zweck** verfolgt,\n2. **geeignet** ist (fördert den Zweck),\n3. **erforderlich** ist (kein milderes, gleich wirksames Mittel),\n4. **angemessen** ist (Nachteil steht nicht außer Verhältnis zum Nutzen)." },
      { art: "erklaerung", titel: "Rückwirkung", text: "• **Echte Rückwirkung**: Ein Gesetz ändert die Rechtsfolgen für einen **abgeschlossenen** Sachverhalt der Vergangenheit → grundsätzlich **unzulässig** (Vertrauensschutz).\n• **Unechte Rückwirkung**: Ein Gesetz wirkt auf einen **noch nicht abgeschlossenen** Sachverhalt ein → grundsätzlich **zulässig**, wenn das Vertrauen nicht überwiegt. Bei der Einkommensteuer ist ein Sachverhalt erst **mit Ablauf des Kalenderjahres** abgeschlossen." },
    ],
    fragen: [
      { art: "wahl", frage: "Das Finanzamt will eine Steuer erheben, für die es kein Gesetz gibt. Welcher Grundsatz ist verletzt?", optionen: ["Vorbehalt des Gesetzes", "Vorrang des Gesetzes", "Sozialstaatsprinzip", "Republikprinzip"], richtig: 0, erkl: "Eingriffe brauchen eine gesetzliche Grundlage." },
      { art: "wahl", frage: "In welcher Reihenfolge prüft man die Verhältnismäßigkeit?", optionen: ["Legitimer Zweck, geeignet, erforderlich, angemessen", "Angemessen, geeignet, erforderlich", "Erforderlich, zulässig, gerecht", "Zweck, Mittel, Ergebnis"], richtig: 0, erkl: "Vier Stufen der Verhältnismäßigkeit." },
      { art: "wahl", frage: "Im November wird ein Gesetz verkündet, das den ESt-Satz für das laufende Jahr erhöht. Welche Rückwirkung liegt vor?", optionen: ["Unechte Rückwirkung – das Jahr ist noch nicht abgeschlossen", "Echte Rückwirkung", "Keine Rückwirkung", "Unzulässige echte Rückwirkung"], richtig: 0, erkl: "Die ESt entsteht mit Ablauf des Kalenderjahres; der Sachverhalt ist noch offen." },
      { art: "wahl", frage: "Was bedeutet „erforderlich“?", optionen: ["Es gibt kein milderes, gleich wirksames Mittel", "Das Mittel fördert den Zweck", "Der Zweck ist erlaubt", "Der Nutzen überwiegt den Nachteil"], richtig: 0, erkl: "Erforderlichkeit = mildestes gleich geeignetes Mittel." },
    ],
  },
  {
    id: "o-bundesstaat", titel: "Bundesstaat", kurz: "Art. 20, 28, 30, 31, 37 GG", icon: "🗺️", normen: ["GG 30", "GG 31", "GG 28", "GG 37"],
    karten: [
      { art: "merksatz", titel: "Bund und 16 Länder", text: "Im **Bundesstaat** haben **sowohl der Bund als auch die Länder** eigene Staatsqualität: eigene Verfassungen, Parlamente, Regierungen und Gerichte." },
      { art: "erklaerung", titel: "Wer ist zuständig?", text: "• **Art. 30 GG**: Staatliche Aufgaben sind **Sache der Länder**, soweit das GG nichts anderes bestimmt (Grundsatz der Länderzuständigkeit).\n• **Art. 31 GG**: **Bundesrecht bricht Landesrecht** – widersprechen sich die beiden, gilt das Bundesrecht.\n• **Art. 28 Abs. 1 GG** (Homogenität): Die Landesverfassungen müssen den Grundsätzen des republikanischen, demokratischen und sozialen Rechtsstaats entsprechen." },
      { art: "erklaerung", titel: "Bundeszwang", text: "Erfüllt ein Land seine Pflichten gegenüber dem Bund nicht, kann die Bundesregierung **mit Zustimmung des Bundesrats** den **Bundeszwang** einsetzen (Art. 37 GG)." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer ist für staatliche Aufgaben grundsätzlich zuständig?", optionen: ["Die Länder (Art. 30 GG)", "Der Bund", "Die Gemeinden", "Der Bundesrat"], richtig: 0, erkl: "Der Bund nur, soweit das GG es bestimmt." },
      { art: "wahl", frage: "Ein Landesgesetz widerspricht einem gültigen Bundesgesetz. Was gilt?", optionen: ["Das Bundesgesetz (Art. 31 GG)", "Das Landesgesetz", "Das jüngere Gesetz", "Beide gelten nebeneinander"], richtig: 0, erkl: "Bundesrecht bricht Landesrecht." },
      { art: "wahl", frage: "Wer muss dem Bundeszwang zustimmen?", optionen: ["Der Bundesrat", "Der Bundestag", "Das BVerfG", "Der Bundespräsident"], richtig: 0, erkl: "Art. 37 Abs. 1 GG." },
    ],
  },
  {
    id: "o-parteien", titel: "Die Parteien", kurz: "Art. 21 GG · § 2 PartG", icon: "🎗️", normen: ["GG 21", "PartG 2"],
    karten: [
      { art: "merksatz", titel: "Aufgabe der Parteien", text: "Die Parteien **wirken bei der politischen Willensbildung des Volkes mit** (Art. 21 Abs. 1 S. 1 GG). Ihre Gründung ist **frei**; ihre innere Ordnung muss **demokratisch** sein, und sie müssen über die **Herkunft ihrer Mittel** öffentlich Rechenschaft geben." },
      { art: "erklaerung", titel: "Was ist eine Partei? (§ 2 PartG)", text: "Eine **Vereinigung von Bürgern**, die **dauernd** oder für längere Zeit Einfluss auf die politische Willensbildung nehmen und im **Bundestag oder einem Landtag** mitwirken will – mit ausreichender Ernsthaftigkeit (Organisation, Mitgliederzahl, Auftreten). Sie verliert ihre Rechtsstellung, wenn sie **sechs Jahre** an keiner Bundestags- oder Landtagswahl mit eigenen Wahlvorschlägen teilnimmt." },
      { art: "erklaerung", titel: "Verbot und Finanzierungsausschluss", text: "• Über die **Verfassungswidrigkeit** einer Partei entscheidet **nur das Bundesverfassungsgericht** (Art. 21 Abs. 4 GG) – Parteienprivileg.\n• Parteien, die darauf **ausgerichtet** sind, die freiheitliche demokratische Grundordnung zu beseitigen, können von der **staatlichen Finanzierung ausgeschlossen** werden (Art. 21 Abs. 3 GG)." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer darf eine Partei verbieten?", optionen: ["Nur das Bundesverfassungsgericht", "Der Bundesinnenminister", "Der Bundestag", "Der Bundespräsident"], richtig: 0, erkl: "Art. 21 Abs. 4 GG – Parteienprivileg." },
      { art: "wahl", frage: "Wann verliert eine Vereinigung ihre Rechtsstellung als Partei?", optionen: ["Wenn sie 6 Jahre an keiner Bundestags- oder Landtagswahl teilnimmt", "Nach 4 Jahren ohne Mandat", "Wenn sie unter 5 % bleibt", "Wenn sie weniger als 1.000 Mitglieder hat"], richtig: 0, erkl: "§ 2 Abs. 2 PartG." },
      { art: "wahl", frage: "Wie muss die innere Ordnung einer Partei sein?", optionen: ["Demokratisch", "Hierarchisch", "Beliebig", "Vom Staat vorgegeben"], richtig: 0, erkl: "Art. 21 Abs. 1 S. 3 GG." },
    ],
  },
  {
    id: "o-bundestag", titel: "Bundestag & Abgeordnete", kurz: "Art. 38–48 GG", icon: "🏛", normen: ["GG 38", "GG 39", "GG 46"],
    karten: [
      { art: "merksatz", titel: "Das Parlament", text: "Der **Bundestag** ist das einzige **direkt vom Volk gewählte** Verfassungsorgan des Bundes. Er beschließt die **Gesetze**, wählt den **Bundeskanzler** und **kontrolliert** die Regierung. Die **Wahlperiode** dauert **vier Jahre** (Art. 39 GG)." },
      { art: "erklaerung", titel: "Das freie Mandat", text: "Die Abgeordneten sind **Vertreter des ganzen Volkes**, an Aufträge und Weisungen **nicht gebunden** und **nur ihrem Gewissen** unterworfen (Art. 38 Abs. 1 S. 2 GG). Ein „Fraktionszwang“ kann deshalb rechtlich nicht durchgesetzt werden." },
      { art: "erklaerung", titel: "Schutz der Abgeordneten (Art. 46 GG)", text: "• **Indemnität**: Für **Abstimmungen und Äußerungen im Bundestag** darf ein Abgeordneter nie verfolgt werden – außer bei verleumderischen Beleidigungen.\n• **Immunität**: Strafverfolgung oder Verhaftung nur **mit Genehmigung des Bundestags** (außer bei Festnahme auf frischer Tat)." },
      { art: "erklaerung", titel: "Fraktionen", text: "Eine **Fraktion** ist ein Zusammenschluss von mindestens **5 % der Abgeordneten**, die derselben Partei angehören (Geschäftsordnung des Bundestags). Fraktionen haben besondere Rechte, z. B. Anträge und Redezeit." },
    ],
    fragen: [
      { art: "wahl", frage: "Wie lange dauert eine Wahlperiode des Bundestags?", optionen: ["4 Jahre", "5 Jahre", "6 Jahre", "3 Jahre"], richtig: 0, erkl: "Art. 39 Abs. 1 GG." },
      { art: "wahl", frage: "Darf eine Fraktion einen Abgeordneten zwingen, für ein Gesetz zu stimmen?", optionen: ["Nein – freies Mandat (Art. 38 Abs. 1 S. 2 GG)", "Ja", "Ja, bei Haushaltsgesetzen", "Nur mit Zustimmung des Präsidenten"], richtig: 0, erkl: "Abgeordnete sind nur ihrem Gewissen unterworfen." },
      { art: "wahl", frage: "Was schützt die Indemnität?", optionen: ["Abstimmungen und Äußerungen im Bundestag", "Vor jeder Strafverfolgung", "Das Vermögen des Abgeordneten", "Vor Abwahl"], richtig: 0, erkl: "Art. 46 Abs. 1 GG – dauerhaft." },
      { art: "zahl", einheit: "Abg.", frage: "Wie viele Abgeordnete braucht eine Fraktion bei 630 Mitgliedern mindestens (5 %)?", cent: 3200, erkl: "5 % von 630 = 31,5 → mindestens 32 Abgeordnete." },
    ],
  },
  {
    id: "o-wahl", titel: "Die Bundestagswahl", kurz: "Art. 38 GG · BWahlG", icon: "✉️", normen: ["GG 38", "BWahlG 1", "BWahlG 4", "BWahlG 6"],
    karten: [
      { art: "merksatz", titel: "Fünf Wahlrechtsgrundsätze", text: "Die Abgeordneten werden in **allgemeiner, unmittelbarer, freier, gleicher und geheimer** Wahl gewählt (Art. 38 Abs. 1 S. 1 GG):\n• **allgemein** – alle Staatsbürger dürfen wählen,\n• **unmittelbar** – die Wähler bestimmen die Abgeordneten **direkt**, ohne Wahlmänner,\n• **frei** – ohne Zwang oder Druck,\n• **gleich** – jede Stimme hat das gleiche Gewicht,\n• **geheim** – niemand erfährt, wie man gewählt hat.\nWählen darf, wer das **18. Lebensjahr** vollendet hat; gewählt werden kann, wer **volljährig** ist (Art. 38 Abs. 2 GG)." },
      { art: "erklaerung", titel: "Erst- und Zweitstimme", text: "Der Bundestag hat **630 Sitze** (§ 1 BWahlG).\n• Mit der **Erststimme** wählt man eine Person im **Wahlkreis** (299 Wahlkreise).\n• Mit der **Zweitstimme** wählt man die **Landesliste einer Partei** – sie entscheidet, wie viele Sitze eine Partei insgesamt bekommt.\n• **Zweitstimmendeckung**: Wahlkreissieger ziehen nur ein, soweit ihre Partei genug Zweitstimmen-Sitze hat. **Überhangmandate gibt es nicht mehr.**" },
      { art: "erklaerung", titel: "Hürden", text: "• **Sperrklausel**: Parteien unter **5 %** der Zweitstimmen nehmen an der Sitzverteilung **nicht teil** – wegen der Zweitstimmendeckung ziehen dann auch ihre Wahlkreissieger nicht ein.\n• **Grundmandatsklausel**: Nach dem Urteil des BVerfG von 2024 gilt bis zu einer Neuregelung: Wer in mindestens **drei Wahlkreisen** die meisten Erststimmen holt, nimmt trotzdem an der Sitzverteilung teil.\n• Parteien **nationaler Minderheiten** (z. B. SSW) sind von der 5-%-Hürde befreit." },
    ],
    fragen: [
      { art: "wahl", frage: "Wie viele Sitze hat der Bundestag nach dem BWahlG?", optionen: ["630", "598", "709", "736"], richtig: 0, erkl: "§ 1 Abs. 1 BWahlG." },
      { art: "wahl", frage: "Welche Stimme entscheidet über die Sitzverteilung der Parteien?", optionen: ["Die Zweitstimme", "Die Erststimme", "Beide gleich", "Keine – das Los"], richtig: 0, erkl: "Erststimmen-Sieger brauchen Zweitstimmendeckung." },
      { art: "wahl", frage: "Was bedeutet „unmittelbare“ Wahl?", optionen: ["Die Wähler bestimmen die Abgeordneten direkt, ohne Wahlmänner", "Man darf sofort wählen", "Jede Stimme zählt gleich", "Die Wahl ist geheim"], richtig: 0, erkl: "Keine Zwischeninstanz zwischen Wählern und Gewählten." },
      { art: "wahl", frage: "Eine Partei erhält 4 % der Zweitstimmen und gewinnt 3 Wahlkreise. Nimmt sie an der Sitzverteilung teil?", optionen: ["Ja – Grundmandatsklausel", "Nein – 5-%-Hürde", "Nur mit den 3 Wahlkreissiegern", "Nur wenn sie eine Minderheitenpartei ist"], richtig: 0, erkl: "Nach dem BVerfG-Urteil 2024 gilt die Grundmandatsklausel bis zu einer Neuregelung fort." },
    ],
  },
  {
    id: "o-bundesrat", titel: "Der Bundesrat", kurz: "Art. 50–53 GG", icon: "🧩", normen: ["GG 50", "GG 51", "GG 52"],
    karten: [
      { art: "merksatz", titel: "Die Länderkammer", text: "Durch den **Bundesrat** wirken die **Länder** bei der Gesetzgebung und Verwaltung des Bundes und in EU-Angelegenheiten mit (Art. 50 GG). Er besteht aus **Mitgliedern der Landesregierungen** – nicht aus gewählten Abgeordneten (Art. 51 Abs. 1 GG)." },
      { art: "erklaerung", titel: "Stimmenverteilung (Art. 51 Abs. 2 GG)", text: "Jedes Land hat **mindestens 3** Stimmen;\n• mehr als **2 Mio.** Einwohner: **4** Stimmen,\n• mehr als **6 Mio.**: **5** Stimmen,\n• mehr als **7 Mio.**: **6** Stimmen.\nInsgesamt **69** Stimmen; die absolute Mehrheit sind **35**." },
      { art: "erklaerung", titel: "Einheitliche Abgabe", text: "Die Stimmen eines Landes können **nur einheitlich** abgegeben werden (Art. 51 Abs. 3 S. 2 GG). Stimmen die Vertreter eines Landes unterschiedlich ab, ist die Abgabe des Landes **ungültig**." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer sitzt im Bundesrat?", optionen: ["Mitglieder der Landesregierungen", "Vom Volk gewählte Senatoren", "Bundestagsabgeordnete", "Die Ministerpräsidenten allein, gewählt auf 6 Jahre"], richtig: 0, erkl: "Art. 51 Abs. 1 GG." },
      { art: "zahl", einheit: "Stimmen", frage: "Wie viele Stimmen hat ein Land mit 6,5 Millionen Einwohnern?", cent: 500, erkl: "Mehr als 6 Mio., aber nicht mehr als 7 Mio. → 5 Stimmen." },
      { art: "wahl", frage: "Die Vertreter eines Landes stimmen teils mit Ja, teils mit Nein. Folge?", optionen: ["Die Stimmen des Landes sind ungültig", "Die Mehrheit im Land zählt", "Der Ministerpräsident entscheidet", "Die Stimmen werden geteilt gezählt"], richtig: 0, erkl: "Einheitliche Stimmabgabe, Art. 51 Abs. 3 S. 2 GG." },
    ],
  },
  {
    id: "o-praesident", titel: "Der Bundespräsident", kurz: "Art. 54–61, 82 GG", icon: "🎖️", normen: ["GG 54", "GG 58", "GG 82"],
    karten: [
      { art: "merksatz", titel: "Wahl und Amtszeit", text: "Der Bundespräsident wird von der **Bundesversammlung** gewählt – den Mitgliedern des Bundestags und **ebenso vielen** Vertretern der Länder (Art. 54 GG). Wählbar ist jeder Deutsche ab **40 Jahren**. Die Amtszeit beträgt **fünf Jahre**; eine **anschließende Wiederwahl** ist nur **einmal** möglich." },
      { art: "erklaerung", titel: "Wahlgänge", text: "Gewählt ist, wer im **1. oder 2. Wahlgang** die **absolute Mehrheit** (Mehrheit der Mitglieder) erhält. Im **3. Wahlgang** genügt die **relative Mehrheit** (die meisten Stimmen)." },
      { art: "erklaerung", titel: "Aufgaben", text: "• **Völkerrechtliche Vertretung** des Bundes.\n• **Ausfertigung** der Gesetze (Art. 82 GG): Er prüft, ob das Gesetz **formell** ordnungsgemäß zustande gekommen ist und ob es **offensichtlich** gegen das GG verstößt.\n• Seine Anordnungen brauchen die **Gegenzeichnung** durch den Kanzler oder den zuständigen Minister (Art. 58 GG) – die Regierung übernimmt damit die politische Verantwortung." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer wählt den Bundespräsidenten?", optionen: ["Die Bundesversammlung", "Das Volk direkt", "Der Bundestag", "Der Bundesrat"], richtig: 0, erkl: "Art. 54 Abs. 1 GG." },
      { art: "wahl", frage: "Welche Mehrheit genügt im dritten Wahlgang?", optionen: ["Relative Mehrheit", "Absolute Mehrheit", "Zwei-Drittel-Mehrheit", "Einstimmigkeit"], richtig: 0, erkl: "Art. 54 Abs. 6 S. 2 GG." },
      { art: "wahl", frage: "Was prüft der Bundespräsident bei der Ausfertigung eines Gesetzes?", optionen: ["Formelles Zustandekommen und offensichtliche Verfassungsverstöße", "Ob das Gesetz politisch sinnvoll ist", "Nichts – er muss immer unterschreiben", "Nur die Rechtschreibung"], richtig: 0, erkl: "Art. 82 Abs. 1 GG: formelles und (evidentes) materielles Prüfungsrecht." },
      { art: "wahl", frage: "Wie oft darf ein Bundespräsident unmittelbar wiedergewählt werden?", optionen: ["Einmal", "Beliebig oft", "Gar nicht", "Zweimal"], richtig: 0, erkl: "Art. 54 Abs. 2 S. 2 GG." },
    ],
  },
  {
    id: "o-regierung", titel: "Die Bundesregierung", kurz: "Art. 62–69 GG", icon: "👥", normen: ["GG 63", "GG 65", "GG 67", "GG 68"],
    karten: [
      { art: "merksatz", titel: "Wahl des Bundeskanzlers (Art. 63 GG)", text: "1. Der **Bundespräsident schlägt** einen Kandidaten vor; der Bundestag wählt **ohne Aussprache**. Nötig ist die **Mehrheit der Mitglieder** (Kanzlermehrheit, bei 630 Abgeordneten **316** Stimmen).\n2. Scheitert das, kann der Bundestag **innerhalb von 14 Tagen** selbst jemanden mit Kanzlermehrheit wählen.\n3. Danach genügt die **relative Mehrheit**. Erreicht der Gewählte doch die Kanzlermehrheit, **muss** der Präsident ihn ernennen; sonst ernennt er ihn binnen **7 Tagen** oder **löst den Bundestag auf** (Art. 63 Abs. 4 GG)." },
      { art: "erklaerung", titel: "Drei Prinzipien (Art. 65 GG)", text: "• **Kanzlerprinzip**: Der Kanzler bestimmt die **Richtlinien der Politik**.\n• **Ressortprinzip**: Jeder Minister leitet seinen Bereich **selbständig** und in eigener Verantwortung.\n• **Kollegialprinzip**: Bei Meinungsverschiedenheiten zwischen Ministern entscheidet die **Bundesregierung** als Ganzes." },
      { art: "erklaerung", titel: "Misstrauensvotum und Vertrauensfrage", text: "• **Konstruktives Misstrauensvotum** (Art. 67 GG): Der Bundestag kann den Kanzler nur abwählen, indem er mit Kanzlermehrheit **gleichzeitig einen Nachfolger wählt**.\n• **Vertrauensfrage** (Art. 68 GG): Der Kanzler fragt, ob der Bundestag ihm vertraut. Findet er keine Mehrheit, kann der Bundespräsident auf Vorschlag des Kanzlers den Bundestag **binnen 21 Tagen auflösen**." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer schlägt den Kandidaten für die erste Kanzlerwahl vor?", optionen: ["Der Bundespräsident", "Die stärkste Fraktion", "Der Bundesrat", "Der Bundestagspräsident"], richtig: 0, erkl: "Art. 63 Abs. 1 GG." },
      { art: "zahl", einheit: "Stimmen", frage: "Bundestag mit 630 Mitgliedern: Wie viele Stimmen braucht die Kanzlermehrheit?", cent: 31600, erkl: "Mehr als die Hälfte der Mitglieder: 630 ÷ 2 = 315 → 316." },
      { art: "wahl", frage: "Wie kann der Bundestag den Kanzler abwählen?", optionen: ["Nur durch Wahl eines Nachfolgers (Art. 67 GG)", "Mit einfacher Mehrheit", "Durch Volksentscheid", "Durch den Bundesrat"], richtig: 0, erkl: "Konstruktives Misstrauensvotum." },
      { art: "wahl", frage: "Wer bestimmt die Richtlinien der Politik?", optionen: ["Der Bundeskanzler", "Der Bundespräsident", "Jeder Minister", "Der Bundesrat"], richtig: 0, erkl: "Art. 65 S. 1 GG – Kanzlerprinzip." },
    ],
  },
  {
    id: "o-bverfg", titel: "Das Bundesverfassungsgericht", kurz: "Art. 93, 94, 100 GG", icon: "⚖", normen: ["GG 93", "GG 94", "GG 100"],
    karten: [
      { art: "merksatz", titel: "Hüter der Verfassung", text: "Das **BVerfG** in Karlsruhe wacht darüber, dass das Grundgesetz eingehalten wird. Es hat **16 Richter** in zwei Senaten; je die **Hälfte** wird vom **Bundestag** und vom **Bundesrat** gewählt (Art. 93 Abs. 2 GG), für **12 Jahre** ohne Wiederwahl." },
      { art: "erklaerung", titel: "Die wichtigsten Verfahren", text: "• **Organstreit** (Art. 94 Abs. 1 Nr. 1): Streit zwischen obersten Bundesorganen oder ihren mit eigenen Rechten ausgestatteten Teilen (z. B. **Fraktionen**) über ihre Rechte und Pflichten.\n• **Abstrakte Normenkontrolle** (Nr. 2): Bundesregierung, eine Landesregierung oder **ein Viertel der Bundestagsmitglieder** lassen ein Gesetz überprüfen – ohne konkreten Fall.\n• **Konkrete Normenkontrolle** (Art. 100): Ein **Gericht** hält ein Gesetz, auf das es ankommt, für verfassungswidrig und legt es vor.\n• **Verfassungsbeschwerde** (Nr. 4a): **Jedermann**, der behauptet, durch die öffentliche Gewalt in seinen **Grundrechten** verletzt zu sein." },
      { art: "beispiel", titel: "Welches Verfahren passt?", text: "• Die Opposition (ein Viertel des Bundestags) hält ein neues Gesetz für verfassungswidrig → **abstrakte Normenkontrolle**.\n• Eine Fraktion meint, die Regierung verletze die Rechte des Bundestags → **Organstreit**.\n• Ein Finanzgericht hält eine Steuernorm, die es im Prozess anwenden muss, für verfassungswidrig → **konkrete Normenkontrolle** – nur das BVerfG darf ein Gesetz für nichtig erklären.\n• Eine Bürgerin sieht sich durch ein Urteil in ihrer Meinungsfreiheit verletzt → **Verfassungsbeschwerde**." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Bürger fühlt sich durch ein Gesetz in seinem Grundrecht verletzt. Welches Verfahren?", optionen: ["Verfassungsbeschwerde", "Organstreit", "Abstrakte Normenkontrolle", "Konkrete Normenkontrolle"], richtig: 0, erkl: "Art. 94 Abs. 1 Nr. 4a GG." },
      { art: "wahl", frage: "Ein Finanzgericht hält ein Steuergesetz für verfassungswidrig. Was tut es?", optionen: ["Es legt dem BVerfG vor (konkrete Normenkontrolle)", "Es wendet das Gesetz einfach nicht an", "Es hebt das Gesetz auf", "Es fragt den Bundestag"], richtig: 0, erkl: "Art. 100 Abs. 1 GG – nur das BVerfG darf Gesetze verwerfen." },
      { art: "wahl", frage: "Wer kann eine abstrakte Normenkontrolle beantragen?", optionen: ["Bundesregierung, Landesregierung oder ein Viertel der MdB", "Jeder Bürger", "Jedes Gericht", "Der Bundespräsident allein"], richtig: 0, erkl: "Art. 94 Abs. 1 Nr. 2 GG." },
      { art: "wahl", frage: "Wer wählt die Richter des BVerfG?", optionen: ["Je zur Hälfte Bundestag und Bundesrat", "Der Bundespräsident", "Die Bundesregierung", "Das Volk"], richtig: 0, erkl: "Art. 93 Abs. 2 GG." },
    ],
  },
  {
    id: "o-gesetzgebung", titel: "Wie ein Bundesgesetz entsteht", kurz: "Art. 70–78, 82 GG", icon: "📝", normen: ["GG 70", "GG 72", "GG 76", "GG 77", "GG 78"],
    karten: [
      { art: "merksatz", titel: "Wer darf Gesetze machen?", text: "Grundsätzlich die **Länder** (Art. 70 GG) – der Bund nur, wo das GG es ihm zuweist:\n• **ausschließliche** Gesetzgebung (Art. 71, 73): nur der Bund, z. B. Verteidigung, Währung.\n• **konkurrierende** Gesetzgebung (Art. 72, 74): Die Länder dürfen, **solange und soweit der Bund nicht** tätig geworden ist." },
      { art: "erklaerung", titel: "Das Verfahren", text: "1. **Initiative** (Art. 76): Gesetzentwürfe bringen ein die **Bundesregierung**, der **Bundesrat** oder **aus der Mitte des Bundestags**.\n2. **Beschluss** im Bundestag (Art. 77 Abs. 1).\n3. **Bundesrat** wirkt mit – ggf. über den **Vermittlungsausschuss**.\n4. **Gegenzeichnung** durch den Bundeskanzler oder den zuständigen Minister (Art. 58), **Ausfertigung** durch den Bundespräsidenten und **Verkündung** im Bundesgesetzblatt (Art. 82)." },
      { art: "erklaerung", titel: "Einspruchs- und Zustimmungsgesetze", text: "• **Zustimmungsgesetz**: nur wo das GG die Zustimmung ausdrücklich verlangt (z. B. bei Steuern, deren Aufkommen auch den Ländern zufließt, Art. 105 Abs. 3). Ohne Zustimmung des Bundesrats **scheitert** das Gesetz.\n• **Einspruchsgesetz**: alle anderen. Der Bundesrat kann Einspruch einlegen, der Bundestag kann ihn aber **überstimmen** (Art. 77 Abs. 4)." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer darf einen Gesetzentwurf in den Bundestag einbringen?", optionen: ["Bundesregierung, Bundesrat, Mitte des Bundestags", "Nur die Bundesregierung", "Auch der Bundespräsident", "Jeder Bürger"], richtig: 0, erkl: "Art. 76 Abs. 1 GG." },
      { art: "wahl", frage: "Der Bundesrat verweigert einem Zustimmungsgesetz die Zustimmung. Folge?", optionen: ["Das Gesetz kommt nicht zustande", "Der Bundestag überstimmt ihn", "Der Präsident entscheidet", "Das BVerfG entscheidet"], richtig: 0, erkl: "Ohne Zustimmung kein Zustimmungsgesetz." },
      { art: "wahl", frage: "Wann dürfen die Länder im Bereich der konkurrierenden Gesetzgebung Gesetze erlassen?", optionen: ["Solange und soweit der Bund nicht tätig geworden ist", "Nie", "Immer", "Nur mit Zustimmung des Bundestags"], richtig: 0, erkl: "Art. 72 Abs. 1 GG." },
      { art: "wahl", frage: "Wer ist für die Gesetzgebung grundsätzlich zuständig?", optionen: ["Die Länder (Art. 70 GG)", "Der Bund", "Der Bundesrat", "Die Gemeinden"], richtig: 0, erkl: "Der Bund nur, soweit das GG ihm die Befugnis verleiht." },
    ],
  },
];
