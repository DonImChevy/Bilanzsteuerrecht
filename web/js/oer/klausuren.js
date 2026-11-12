// Probeklausuren Öffentliches Recht (GS I) – drei vollständige Klausuren à 180 Minuten / 90 Punkte.
// Aufbau wie die Klausuren nach § 18 Abs. 7 StBAPO: fünf voneinander unabhängige Aufgabenteile (A–E) – Allgemeine Fragen,
// Gesetzgebung, Wahl bzw. Verfassungsorgane, Fallfragen und ein Gutachten. Eigene Sachverhalte, kein Klausurtext übernommen.
// Rechtsstand 2026: GG in der Fassung mit Art. 93 n. F. (BVerfG-Status) – Verfahren in Art. 94 GG; BWahlG nach der Reform
// 2023 (630 Sitze, Zweitstimmendeckung, keine Überhang- und Ausgleichsmandate).
// Bewertung: [Punkte, Merkmal, Erwartet].

const fest = (id, titel, min, f) => ({ id, titel, min, teil: 1, fest: true, erzeugen: f });

export const VORBEMERKUNGEN_OER = [
  "Die Klausur besteht aus fünf Aufgabenteilen mit voneinander unabhängigen Fragestellungen.",
  "Geben Sie zu Ihren Lösungen stets die maßgeblichen Bestimmungen des Grundgesetzes und der Nebengesetze eindeutig zugeordnet an. Gutachten sind im Gutachtenstil zu erstellen.",
  "Offenbare Unrichtigkeiten oder fehlende Angaben: kurz vermerken, wie Sie den Sachverhalt ergänzt haben. Rechtsstand 2026.",
];

// ===================================================================================== Klausur A
const a1 = fest("oer-a1", "A. Allgemeine Fragen", 30, () => ({
  sv: "Beantworten Sie die folgenden Fragen in ganzen Sätzen mit Fundstellen.",
  aufgaben: [
    "Was besagt das Rechtsstaatsprinzip, wo ist es verankert? Nennen Sie drei Ausprägungen.",
    "Welche Organisationsprinzipien gelten innerhalb der Bundesregierung? Erläutern Sie sie.",
    "Kann der Bundestag sich selbst auflösen? Begründen Sie Ihre Antwort.",
    "Was versteht man unter der Wesentlichkeitstheorie?",
    "Was besagt das Homogenitätsprinzip?",
  ],
  loesung: [
    "1. Im Rechtsstaat ist alle Staatsgewalt an Recht und Gesetz gebunden und wird geteilt und kontrolliert. Verankert ist das Prinzip in Art. 20 Abs. 3 GG (Bindung der Gesetzgebung an die verfassungsmäßige Ordnung, von Verwaltung und Rechtsprechung an Gesetz und Recht), ausdrücklich genannt in Art. 28 Abs. 1 S. 1 GG. Ausprägungen: Gewaltenteilung (Art. 20 Abs. 2 S. 2 GG), Vorrang und Vorbehalt des Gesetzes, Rechtssicherheit und Vertrauensschutz (Rückwirkungsverbot), Verhältnismäßigkeit, Rechtsschutzgarantie (Art. 19 Abs. 4 GG), unabhängige Richter (Art. 97 GG).",
    "2. Kanzlerprinzip: Der Bundeskanzler bestimmt die Richtlinien der Politik und trägt dafür die Verantwortung (Art. 65 S. 1 GG). Ressortprinzip: Innerhalb dieser Richtlinien leitet jeder Bundesminister seinen Geschäftsbereich selbständig und unter eigener Verantwortung (Art. 65 S. 2 GG). Kollegialprinzip: Über Meinungsverschiedenheiten zwischen den Bundesministern entscheidet die Bundesregierung als Kollegium (Art. 65 S. 3 GG).",
    "3. Nein. Der Bundestag wird auf vier Jahre gewählt (Art. 39 Abs. 1 S. 1 GG); diese zeitliche Legitimation darf er nicht selbst verkürzen. Eine vorzeitige Auflösung ist nur durch den Bundespräsidenten in den Fällen des Art. 63 Abs. 4 S. 3 GG (Kanzler nur mit relativer Mehrheit gewählt) und des Art. 68 Abs. 1 S. 1 GG (gescheiterte Vertrauensfrage) möglich.",
    "4. Der Gesetzgeber muss die für die Grundrechtsverwirklichung wesentlichen Entscheidungen selbst treffen und darf sie nicht der Verwaltung (Rechtsverordnung, Satzung) überlassen; der Vorbehalt des Gesetzes wird insoweit zum Parlamentsvorbehalt. Begründung: Nur das Parlament ist unmittelbar demokratisch legitimiert (Art. 20 Abs. 2, 3 GG).",
    "5. Die verfassungsmäßige Ordnung in den Ländern muss den Grundsätzen des republikanischen, demokratischen und sozialen Rechtsstaates im Sinne des Grundgesetzes entsprechen (Art. 28 Abs. 1 S. 1 GG). Die Länder behalten ihre Verfassungsautonomie, sind aber an diese Prinzipien gebunden; der Bund gewährleistet die Übereinstimmung (Art. 28 Abs. 3 GG).",
  ],
  bewertung: [
    [1.5, "1. Inhalt und Fundstellen Rechtsstaat", "Art. 20 Abs. 3 GG; Art. 28 Abs. 1 S. 1 GG"],
    [1.5, "1. drei Ausprägungen", "z. B. Gewaltenteilung, Vorbehalt des Gesetzes, Vertrauensschutz, Verhältnismäßigkeit, Art. 19 Abs. 4 GG"],
    [3, "2. Kanzler-, Ressort-, Kollegialprinzip mit Satzangabe", "Art. 65 S. 1, 2, 3 GG"],
    [1.5, "3. kein Selbstauflösungsrecht, Wahlperiode vier Jahre", "Art. 39 Abs. 1 S. 1 GG"],
    [1.5, "3. Auflösung nur in zwei Fällen durch den Bundespräsidenten", "Art. 63 Abs. 4 S. 3, Art. 68 Abs. 1 S. 1 GG"],
    [3, "4. Wesentlichkeitstheorie: Parlamentsvorbehalt mit Begründung", "unmittelbare demokratische Legitimation; keine Delegation des Wesentlichen"],
    [3, "5. Homogenität und Bundesgarantie", "Art. 28 Abs. 1 S. 1, Abs. 3 GG"],
  ],
}));

const a2 = fest("oer-a2", "B. Gesetzgebungskompetenz", 30, () => ({
  sv: "Prüfen Sie ausführlich, wer die Gesetzgebungskompetenz für folgende Vorhaben hat:\n1. ein Gesetz über die Sicherheit an Verkehrsflughäfen und im Luftverkehr,\n2. ein Versammlungsgesetz, das Anmeldefristen für Demonstrationen regelt,\n3. eine Änderung des Strafgesetzbuchs, die einen neuen Straftatbestand einführt,\n4. eine Neuregelung der Grundsteuer.",
  aufgaben: ["Prüfen Sie die Gesetzgebungskompetenz für die Vorhaben 1 bis 4 mit Begründung."],
  loesung: [
    "Grundsatz: Die Länder haben das Recht der Gesetzgebung, soweit das Grundgesetz nicht dem Bund Gesetzgebungsbefugnisse verleiht (Art. 70 Abs. 1 GG). Die Abgrenzung erfolgt nach den Vorschriften über die ausschließliche (Art. 71, 73 GG) und die konkurrierende Gesetzgebung (Art. 72, 74 GG; Art. 70 Abs. 2 GG).",
    "1. Der Luftverkehr gehört zur ausschließlichen Gesetzgebung des Bundes (Art. 73 Abs. 1 Nr. 6 GG). Die Länder dürfen hier nur bei ausdrücklicher Ermächtigung durch Bundesgesetz tätig werden (Art. 71 GG). Zuständig ist der Bund.",
    "2. Das Versammlungsrecht ist weder in Art. 73 noch in Art. 74 GG genannt (seit der Föderalismusreform 2006 nicht mehr in Art. 74 Abs. 1 Nr. 3 GG). Es bleibt daher bei der Grundregel des Art. 70 Abs. 1 GG – zuständig sind die Länder.",
    "3. Das Strafrecht gehört zur konkurrierenden Gesetzgebung (Art. 74 Abs. 1 Nr. 1 GG). Der Bund darf es regeln; die Länder nur, solange und soweit der Bund nicht Gebrauch gemacht hat (Art. 72 Abs. 1 GG). Eine Erforderlichkeitsprüfung nach Art. 72 Abs. 2 GG entfällt, da Nr. 1 dort nicht genannt ist. Zuständig ist der Bund.",
    "4. Für die Grundsteuer hat der Bund die konkurrierende Gesetzgebung (Art. 105 Abs. 2 S. 1 GG) – ohne Erforderlichkeitsprüfung. Die Länder können jedoch abweichende Regelungen treffen (Art. 72 Abs. 3 S. 1 Nr. 7 GG); im Verhältnis von Bundes- und Landesrecht geht dann das spätere Gesetz vor (Art. 72 Abs. 3 S. 3 GG).",
  ],
  bewertung: [
    [2, "Grundsatz Länderkompetenz und Systematik", "Art. 70 Abs. 1, 2 GG; Art. 71–74 GG"],
    [3, "1. ausschließliche Bundeskompetenz Luftverkehr", "Art. 73 Abs. 1 Nr. 6 GG; Art. 71 GG"],
    [3, "2. Versammlungsrecht → Länder", "nicht in Art. 73/74 GG → Art. 70 Abs. 1 GG"],
    [3.5, "3. Strafrecht konkurrierend, keine Erforderlichkeitsprüfung", "Art. 74 Abs. 1 Nr. 1, Art. 72 Abs. 1, 2 GG"],
    [3.5, "4. Grundsteuer: konkurrierend + Abweichungsrecht der Länder", "Art. 105 Abs. 2 S. 1, Art. 72 Abs. 3 S. 1 Nr. 7 GG"],
  ],
}));

const a3 = fest("oer-a3", "C. Bundestagswahl", 40, () => ({
  sv: "Vor der Bundestagswahl diskutiert eine Lerngruppe folgende Punkte:\n1. Die Briefwahl.\n2. Ein Gesetzentwurf will eine Wahlpflicht mit Bußgeld einführen.\n3. Die 5-Prozent-Sperrklausel.\n4. Ein Wahlkreisbewerber gewinnt seinen Wahlkreis, zieht aber nicht in den Bundestag ein, weil seine Partei im Land zu wenige Zweitstimmen erhalten hat.\n5. Ein Fernsehsender will am Wahltag um 14 Uhr die Ergebnisse einer Befragung von Wählern nach ihrer Stimmabgabe veröffentlichen.",
  aufgaben: ["Erläutern Sie die fünf Punkte und prüfen Sie jeweils, ob ein Wahlrechtsgrundsatz des Art. 38 Abs. 1 S. 1 GG verletzt ist."],
  loesung: [
    "Nach Art. 38 Abs. 1 S. 1 GG werden die Abgeordneten in allgemeiner, unmittelbarer, freier, gleicher und geheimer Wahl gewählt.",
    "1. Briefwahl (§ 36 BWahlG): Stimmabgabe ohne Gang ins Wahllokal. Sie berührt die Grundsätze der freien und geheimen Wahl, weil der Staat die unbeeinflusste und unbeobachtete Stimmabgabe zu Hause nicht sichern kann. Sie dient aber der Allgemeinheit der Wahl, weil sie mehr Bürgern die Teilnahme ermöglicht; diese Abwägung ist verfassungsgemäß – kein Verstoß.",
    "2. Wahlpflicht: Die Freiheit der Wahl umfasst nach überwiegender Auffassung auch die Freiheit, nicht zu wählen. Eine bußgeldbewehrte Wahlpflicht wäre daher mit Art. 38 Abs. 1 S. 1 GG unvereinbar.",
    "3. Sperrklausel (§ 4 Abs. 2 S. 2 Nr. 2 BWahlG): Parteien unter 5 % der Zweitstimmen nehmen an der Sitzverteilung nicht teil. Das beeinträchtigt die Gleichheit der Wahl (Erfolgswertgleichheit) und die Chancengleichheit der Parteien. Gerechtfertigt ist dies durch das Ziel, die Funktionsfähigkeit des Parlaments zu sichern (Vermeidung von Zersplitterung). Für Parteien nationaler Minderheiten gilt die Klausel nicht. Kein Verstoß. (Zusatz: Das BVerfG hat 2024 beanstandet, dass die Sperrklausel ohne Grundmandatsklausel gilt, und bis zu einer Neuregelung angeordnet, dass Parteien mit mindestens drei Wahlkreissiegern an der Sitzverteilung teilnehmen.)",
    "4. Zweitstimmendeckung (§ 6 Abs. 1 BWahlG): Seit der Wahlrechtsreform werden die Sitze allein nach den Zweitstimmen verteilt (630 Sitze, § 1 Abs. 1 BWahlG); ein Wahlkreissieger erhält den Sitz nur, wenn seine Partei im Land genügend Zweitstimmensitze hat. Überhang- und Ausgleichsmandate gibt es nicht mehr. Unmittelbarkeit und Gleichheit sind nicht verletzt, da der Wähler weiß, dass seine Erststimme nur im Rahmen der Zweitstimmendeckung wirkt, und alle Stimmen den gleichen Erfolgswert haben (vom BVerfG 2024 gebilligt). Kein Verstoß.",
    "5. Wahlprognose: Die Veröffentlichung von Ergebnissen von Wählerbefragungen nach der Stimmabgabe ist vor Ablauf der Wahlzeit (18 Uhr) unzulässig (§ 32 Abs. 2 BWahlG). Sie könnte noch nicht abstimmende Wähler beeinflussen und damit die Freiheit der Wahl beeinträchtigen. Eine Veröffentlichung um 14 Uhr verstößt gegen § 32 Abs. 2 BWahlG und berührt die Freiheit der Wahl.",
  ],
  bewertung: [
    [1.5, "fünf Wahlrechtsgrundsätze genannt", "Art. 38 Abs. 1 S. 1 GG"],
    [3.5, "1. Briefwahl: Spannung frei/geheim vs. allgemein; zulässig", "§ 36 BWahlG; Abwägung"],
    [3, "2. Wahlpflicht verletzt die Freiheit der Wahl", "negative Wahlfreiheit"],
    [4, "3. Sperrklausel: Eingriff in Erfolgswertgleichheit, Rechtfertigung Funktionsfähigkeit", "§ 4 Abs. 2 S. 2 Nr. 2 BWahlG; Minderheitenausnahme"],
    [4, "4. Zweitstimmendeckung erklärt, keine Überhangmandate, kein Verstoß", "§ 6 Abs. 1, § 1 Abs. 1 BWahlG"],
    [4, "5. Veröffentlichung vor 18 Uhr unzulässig, Freiheit der Wahl", "§ 32 Abs. 2 BWahlG"],
  ],
}));

const a4 = fest("oer-a4", "D. Änderungen des Grundgesetzes", 30, () => ({
  sv: "Im Bundestag werden drei Vorhaben diskutiert:\n1. Der Bundesrat soll abgeschafft werden; die Länder sollen künftig nur noch angehört werden.\n2. Ab der nächsten Wahlperiode soll der Bundestag für fünf statt vier Jahre gewählt werden.\n3. Bremen und Niedersachsen wollen sich zu einem Land zusammenschließen.",
  aufgaben: ["Prüfen und erläutern Sie, ob und unter welchen Voraussetzungen die Vorhaben mit dem Grundgesetz vereinbar wären. Auf die Gesetzgebungskompetenz ist nicht einzugehen."],
  loesung: [
    "Vorbemerkung: Das Grundgesetz kann nur durch ein Gesetz geändert werden, das seinen Wortlaut ausdrücklich ändert oder ergänzt (Art. 79 Abs. 1 S. 1 GG), mit Zustimmung von zwei Dritteln der Mitglieder des Bundestages und zwei Dritteln der Stimmen des Bundesrates (Art. 79 Abs. 2 GG). Unzulässig sind Änderungen, die die Gliederung des Bundes in Länder, die grundsätzliche Mitwirkung der Länder bei der Gesetzgebung oder die Grundsätze der Art. 1 und 20 GG berühren (Ewigkeitsklausel, Art. 79 Abs. 3 GG).",
    "1. Über den Bundesrat wirken die Länder bei der Gesetzgebung mit (Art. 50 GG). Eine bloße Anhörung genügt nicht für die grundsätzliche Mitwirkung der Länder an der Gesetzgebung. Die Abschaffung des Bundesrates ohne gleichwertigen Ersatz berührt Art. 79 Abs. 3 GG und ist unzulässig – auch mit Zweidrittelmehrheiten.",
    "2. Die Dauer der Wahlperiode (Art. 39 Abs. 1 S. 1 GG) ist nicht durch Art. 79 Abs. 3 GG geschützt. Das Demokratieprinzip verlangt Herrschaft auf Zeit durch periodische Wahlen; fünf Jahre sind damit vereinbar (so auch in den meisten Ländern). Zulässig durch verfassungsänderndes Gesetz nach Art. 79 Abs. 1, 2 GG – und nur für künftige Wahlperioden, weil die Abgeordneten vom Volk für vier Jahre legitimiert sind.",
    "3. Eine Neugliederung ist möglich (Art. 29 GG). Die Länder können sie für ihr Gebiet abweichend von Art. 29 Abs. 2–7 GG durch Staatsvertrag regeln; dieser bedarf der Bestätigung durch Volksentscheid in jedem beteiligten Land und der Zustimmung des Bundestages (Art. 29 Abs. 8 GG). Alternativ: Bundesgesetz mit Bestätigung durch Volksentscheid (Art. 29 Abs. 2 GG). Art. 79 Abs. 3 GG steht nicht entgegen – geschützt ist die Gliederung in Länder überhaupt, nicht der Bestand einzelner Länder.",
  ],
  bewertung: [
    [3, "Voraussetzungen der Verfassungsänderung und Ewigkeitsklausel", "Art. 79 Abs. 1, 2, 3 GG"],
    [4, "1. Abschaffung des Bundesrates unzulässig", "grundsätzliche Mitwirkung der Länder, Art. 50, Art. 79 Abs. 3 GG"],
    [4, "2. fünfjährige Wahlperiode zulässig, nur für künftige Wahlperioden", "Art. 39 Abs. 1 S. 1, Art. 79 Abs. 1, 2 GG; Demokratieprinzip"],
    [4, "3. Zusammenschluss über Staatsvertrag mit Volksentscheid und Zustimmung des Bundestages; Art. 79 Abs. 3 GG unberührt", "Art. 29 Abs. 8 (bzw. Abs. 2) GG; kein Bestandsschutz einzelner Länder"],
  ],
}));

const a5 = fest("oer-a5", "E. Gutachten: Rückwirkung eines Steuergesetzes", 50, () => ({
  sv: "Um Steuersparmodelle zu beenden, beschließt der Bundestag am 15.10.2026 ein Gesetz, das eine bisher steuerfreie Zulage für Arbeitnehmer ab dem 01.01.2026 steuerpflichtig macht. Das Gesetz wird am 18.12.2026 verkündet und soll rückwirkend zum 01.01.2026 in Kraft treten.\nAbwandlung: Wegen eines Verfahrensfehlers wird das inhaltsgleiche Gesetz erst am 20.01.2027 verkündet; es soll ebenfalls zum 01.01.2026 in Kraft treten.\nDie Arbeitnehmerin Jana Jordan, die 2026 regelmäßig die Zulage erhalten hat, meint, ein rückwirkendes Steuergesetz sei immer verfassungswidrig.",
  aufgaben: ["Prüfen Sie gutachterlich, ob das Gesetz (Ausgangsfall und Abwandlung) mit dem Rückwirkungsverbot vereinbar ist. Formelle Verfassungsmäßigkeit, Grundrechte und Verhältnismäßigkeit im Übrigen sind nicht zu prüfen."],
  loesung: [
    "Obersatz: Das Gesetz könnte gegen das aus dem Rechtsstaatsprinzip (Art. 20 Abs. 3 GG) folgende Gebot der Rechtssicherheit und des Vertrauensschutzes verstoßen, das rückwirkende belastende Gesetze begrenzt.",
    "I. Maßstab: Ein ausdrückliches Rückwirkungsverbot enthält das Grundgesetz nur für das Strafrecht (Art. 103 Abs. 2 GG). Für Steuergesetze folgt der Schutz aus Art. 20 Abs. 3 GG. Das BVerfG unterscheidet: Echte Rückwirkung (Rückbewirkung von Rechtsfolgen) liegt vor, wenn ein Gesetz nachträglich ändernd in einen abgeschlossenen Sachverhalt eingreift; sie ist grundsätzlich unzulässig. Unechte Rückwirkung (tatbestandliche Rückanknüpfung) liegt vor, wenn ein Gesetz auf gegenwärtige, noch nicht abgeschlossene Sachverhalte für die Zukunft einwirkt; sie ist grundsätzlich zulässig, wenn das Vertrauen des Einzelnen nicht schutzwürdiger ist als das Anliegen des Gesetzgebers.",
    "II. Abgeschlossenheit bei der Einkommensteuer: Die Einkommensteuer ist eine Jahressteuer; sie entsteht mit Ablauf des Veranlagungszeitraums (§ 36 Abs. 1 EStG, § 25 Abs. 1 EStG). Bis zum 31.12. ist der steuerliche Sachverhalt eines Jahres noch nicht abgeschlossen.",
    "III. Ausgangsfall: Das Gesetz wird am 18.12.2026 verkündet, also vor Ablauf des Veranlagungszeitraums 2026. Die Steuer für 2026 ist noch nicht entstanden – es liegt eine unechte Rückwirkung vor. Sie ist grundsätzlich zulässig. Abzuwägen ist das Vertrauen der J in den Fortbestand der Steuerfreiheit gegen das Ziel, Steuersparmodelle zu beenden und die Gleichmäßigkeit der Besteuerung zu sichern. Ein besonderer, schutzwürdiger Vertrauenstatbestand (etwa langfristige Dispositionen im Vertrauen auf die Steuerfreiheit) ist nicht ersichtlich; spätestens mit dem Gesetzesbeschluss des Bundestages am 15.10.2026 musste J mit der Änderung rechnen. Das Gesetz ist insoweit mit Art. 20 Abs. 3 GG vereinbar.",
    "IV. Abwandlung: Bei Verkündung am 20.01.2027 ist der Veranlagungszeitraum 2026 abgelaufen und die Steuer mit dem 31.12.2026 entstanden. Das Gesetz greift nachträglich ändernd in einen abgeschlossenen Sachverhalt ein – echte Rückwirkung, grundsätzlich unzulässig.",
    "Ausnahmen bestehen nur, wenn kein schutzwürdiges Vertrauen entstehen konnte: etwa wenn der Bürger mit der Regelung rechnen musste, die Rechtslage unklar und verworren war, nur ein ganz unerheblicher Schaden entsteht oder zwingende Gründe des Gemeinwohls vorliegen. Hier war die Rechtslage klar (Steuerfreiheit); vor dem Gesetzesbeschluss am 15.10.2026 musste niemand mit der Änderung rechnen, und Gemeinwohlgründe von solchem Gewicht sind nicht ersichtlich. Zumindest für die Zeit bis zum Gesetzesbeschluss ist die Rückwirkung unzulässig.",
    "Ergebnis: Im Ausgangsfall ist das Gesetz mit dem Rückwirkungsverbot vereinbar; die Ansicht der J, jede Rückwirkung sei unzulässig, trifft nicht zu. In der Abwandlung verstößt das Gesetz – jedenfalls für den Zeitraum vor dem 15.10.2026 – gegen Art. 20 Abs. 3 GG.",
  ],
  bewertung: [
    [2, "Obersatz: Rechtsstaatsprinzip, Vertrauensschutz", "Art. 20 Abs. 3 GG"],
    [2, "Art. 103 Abs. 2 GG gilt nur im Strafrecht", "kein ausdrückliches Verbot für Steuergesetze"],
    [4, "Definition echte/unechte Rückwirkung mit Rechtsfolge", "Rückbewirkung von Rechtsfolgen vs. tatbestandliche Rückanknüpfung"],
    [3, "Entstehung der ESt mit Ablauf des Veranlagungszeitraums", "§ 36 Abs. 1, § 25 Abs. 1 EStG – Jahressteuer"],
    [5, "Ausgangsfall: unechte Rückwirkung, Abwägung, zulässig", "Verkündung vor dem 31.12.2026; Vertrauen ab Gesetzesbeschluss nicht schutzwürdig"],
    [3, "Abwandlung: echte Rückwirkung", "VZ 2026 abgelaufen, Steuer entstanden"],
    [4, "Ausnahmen geprüft und verneint", "Rechnen-Müssen, unklare Rechtslage, Bagatelle, zwingendes Gemeinwohl"],
    [2, "Ergebnis zu beiden Fällen und zur Ansicht der J", "Gutachtenstil, klares Ergebnis"],
  ],
}));

// ===================================================================================== Klausur B
const b1 = fest("oer-b1", "A. Allgemeine Fragen", 30, () => ({
  sv: "Beantworten Sie die folgenden Fragen in ganzen Sätzen mit Fundstellen.",
  aufgaben: [
    "Was besagt der Grundsatz der Gewaltenteilung, wo ist er verankert und welchen Zweck hat er?",
    "Unterscheiden Sie Indemnität und Immunität der Abgeordneten.",
    "Was bedeutet das freie Mandat? Ist Fraktionsdisziplin damit vereinbar?",
    "Nennen Sie die ständigen Verfassungsorgane des Bundes.",
    "Was versteht man unter dem Parteienprivileg?",
  ],
  loesung: [
    "1. Die Staatsgewalt wird durch besondere Organe der Gesetzgebung, der vollziehenden Gewalt und der Rechtsprechung ausgeübt (Art. 20 Abs. 2 S. 2 GG; horizontale Gewaltenteilung). Hinzu tritt die vertikale Teilung zwischen Bund und Ländern. Zweck: Machtbegrenzung durch gegenseitige Kontrolle und Schutz der Freiheit des Einzelnen. Das Grundgesetz kennt Gewaltenverschränkungen (z. B. Regierung bringt Gesetze ein, Art. 76 Abs. 1 GG).",
    "2. Indemnität (Art. 46 Abs. 1 GG): Ein Abgeordneter darf wegen Abstimmungen oder Äußerungen im Bundestag oder seinen Ausschüssen zu keiner Zeit gerichtlich oder dienstlich verfolgt werden – ausgenommen verleumderische Beleidigungen; dauerhaft, nicht aufhebbar. Immunität (Art. 46 Abs. 2 GG): Wegen jeder Straftat darf er nur mit Genehmigung des Bundestages zur Verantwortung gezogen oder verhaftet werden, außer bei Festnahme bei Begehung der Tat oder im Laufe des folgenden Tages; sie gilt nur während des Mandats und kann aufgehoben werden.",
    "3. Abgeordnete sind Vertreter des ganzen Volkes, an Aufträge und Weisungen nicht gebunden und nur ihrem Gewissen unterworfen (Art. 38 Abs. 1 S. 2 GG). Fraktionsdisziplin (Erwartung geschlossenen Abstimmens) ist als politisches Mittel zulässig; rechtlich durchsetzbarer Fraktionszwang mit Sanktionen auf das Mandat (z. B. Mandatsverlust) wäre unzulässig.",
    "4. Bundestag, Bundesrat, Bundespräsident, Bundesregierung und Bundesverfassungsgericht (vgl. Art. 93 Abs. 1 GG zum BVerfG als Verfassungsorgan); daneben die nicht ständigen Organe Bundesversammlung (Art. 54 GG) und Gemeinsamer Ausschuss (Art. 53a GG).",
    "5. Über die Verfassungswidrigkeit einer Partei entscheidet ausschließlich das Bundesverfassungsgericht (Art. 21 Abs. 4 GG). Bis zu dieser Entscheidung darf eine Partei nicht als verfassungswidrig behandelt und in ihrer politischen Tätigkeit nicht behindert werden.",
  ],
  bewertung: [
    [3, "1. Gewaltenteilung: Inhalt, Fundstelle, Zweck", "Art. 20 Abs. 2 S. 2 GG; horizontal/vertikal; Machtbegrenzung"],
    [3.5, "2. Indemnität und Immunität mit Unterschieden", "Art. 46 Abs. 1, 2 GG – Äußerungen/dauerhaft vs. Straftaten/aufhebbar"],
    [3, "3. freies Mandat; Fraktionsdisziplin ja, Fraktionszwang nein", "Art. 38 Abs. 1 S. 2 GG"],
    [2.5, "4. fünf ständige Verfassungsorgane", "BT, BR, BPräs, BReg, BVerfG"],
    [3, "5. Parteienprivileg", "Art. 21 Abs. 4 GG – Entscheidungsmonopol des BVerfG"],
  ],
}));

const b2 = fest("oer-b2", "B. Gesetzgebungsverfahren", 30, () => ({
  sv: "Die Bundesregierung will den Grundfreibetrag im Einkommensteuergesetz anheben. Der Entwurf wird beschlossen und unmittelbar dem Bundestag zugeleitet. Der Bundestag nimmt das Gesetz mit der Mehrheit der abgegebenen Stimmen an. Der Bundesrat ruft den Vermittlungsausschuss an; dieser schlägt keine Änderung vor. Anschließend verweigert der Bundesrat seine Zustimmung. Die Bundesregierung meint, der Bundestag könne den Bundesrat mit der Mehrheit seiner Mitglieder überstimmen.",
  aufgaben: ["Beschreiben Sie den Ablauf des Gesetzgebungsverfahrens und beurteilen Sie die Vorgänge."],
  loesung: [
    "1. Einbringung: Gesetzesvorlagen werden durch die Bundesregierung, aus der Mitte des Bundestages oder durch den Bundesrat eingebracht (Art. 76 Abs. 1 GG). Vorlagen der Bundesregierung sind zunächst dem Bundesrat zuzuleiten, der innerhalb von sechs Wochen Stellung nehmen kann (Art. 76 Abs. 2 S. 1, 2 GG). Die unmittelbare Zuleitung an den Bundestag ist fehlerhaft (ein Ausnahmefall der Eilbedürftigkeit nach Art. 76 Abs. 2 S. 4 GG liegt nicht vor).",
    "2. Beschluss: Die Bundesgesetze werden vom Bundestag beschlossen (Art. 77 Abs. 1 S. 1 GG), grundsätzlich mit der Mehrheit der abgegebenen Stimmen (Art. 42 Abs. 2 S. 1 GG) – hier erfüllt.",
    "3. Zustimmungsbedürftigkeit: Das Aufkommen der Einkommensteuer steht Bund und Ländern gemeinsam zu (Art. 106 Abs. 3 S. 1 GG). Bundesgesetze über Steuern, deren Aufkommen den Ländern ganz oder zum Teil zufließt, bedürfen der Zustimmung des Bundesrates (Art. 105 Abs. 3 GG). Es handelt sich um ein Zustimmungsgesetz.",
    "4. Vermittlungsausschuss und Zustimmung: Der Bundesrat kann den Vermittlungsausschuss anrufen (Art. 77 Abs. 2 S. 1 GG); schlägt dieser keine Änderung vor, hat der Bundesrat in angemessener Frist über die Zustimmung zu beschließen (Art. 77 Abs. 2a GG). Ein Zustimmungsgesetz kommt nur zustande, wenn der Bundesrat zustimmt (Art. 78 GG). Bei Verweigerung ist es gescheitert – ein Überstimmen durch den Bundestag ist nur beim Einspruch nach Art. 77 Abs. 4 GG möglich, nicht bei Zustimmungsgesetzen. Die Ansicht der Bundesregierung ist unzutreffend.",
    "5. Wäre das Gesetz zustande gekommen, würde es nach Gegenzeichnung vom Bundespräsidenten ausgefertigt und im Bundesgesetzblatt verkündet (Art. 82 Abs. 1 S. 1 GG); Inkrafttreten nach Art. 82 Abs. 2 GG.",
  ],
  bewertung: [
    [3, "Einbringung und Erster Durchgang beim Bundesrat; Fehler erkannt", "Art. 76 Abs. 1, Abs. 2 S. 1, 2 GG"],
    [1.5, "Beschluss mit einfacher Mehrheit", "Art. 77 Abs. 1 S. 1, Art. 42 Abs. 2 S. 1 GG"],
    [3.5, "Zustimmungsgesetz wegen Gemeinschaftsteuer", "Art. 106 Abs. 3 S. 1, Art. 105 Abs. 3 GG"],
    [2, "Vermittlungsausschuss ohne Änderungsvorschlag → Beschluss über Zustimmung", "Art. 77 Abs. 2, 2a GG"],
    [3.5, "Verweigerte Zustimmung → gescheitert; kein Überstimmen", "Art. 78 GG; Art. 77 Abs. 4 GG nur beim Einspruchsgesetz"],
    [1.5, "Ausfertigung und Verkündung", "Art. 82 Abs. 1, 2 GG"],
  ],
}));

const b3 = fest("oer-b3", "C. Wahl und Sturz des Bundeskanzlers", 40, () => ({
  sv: "Nach der Bundestagswahl (630 Mitglieder) schlägt der Bundespräsident die Abgeordnete Klara König (K) vor. Im ersten Wahlgang erhält sie 300 Stimmen. Zehn Tage später wählt der Bundestag den Abgeordneten Lars Lehmann (L) mit 320 Stimmen.\nZwei Jahre später: (a) Die Opposition will Kanzler L stürzen und beantragt eine Abstimmung, in der der Bundestag ihm „das Misstrauen ausspricht“; ein Nachfolger wird nicht benannt. (b) L stellt die Vertrauensfrage; 290 Abgeordnete stimmen für ihn. L schlägt dem Bundespräsidenten vor, den Bundestag aufzulösen.",
  aufgaben: ["Beurteilen Sie die Kanzlerwahl.", "Beurteilen Sie (a) und (b) und die Handlungsmöglichkeiten des Bundespräsidenten."],
  loesung: [
    "Kanzlerwahl: Der Bundeskanzler wird auf Vorschlag des Bundespräsidenten vom Bundestag ohne Aussprache gewählt (Art. 63 Abs. 1 GG). Gewählt ist, wer die Stimmen der Mehrheit der Mitglieder auf sich vereinigt (Art. 63 Abs. 2 S. 1 GG): bei 630 Mitgliedern mindestens 316 Stimmen. K erreicht mit 300 Stimmen diese Mehrheit nicht.",
    "Binnen vierzehn Tagen kann der Bundestag mit mehr als der Hälfte seiner Mitglieder einen Bundeskanzler wählen (Art. 63 Abs. 3 GG). L wird nach zehn Tagen mit 320 Stimmen gewählt – mehr als 315; er ist gewählt und vom Bundespräsidenten zu ernennen (Art. 63 Abs. 2 S. 2 GG).",
    "(a) Der Bundestag kann dem Bundeskanzler das Misstrauen nur dadurch aussprechen, dass er mit der Mehrheit seiner Mitglieder einen Nachfolger wählt und den Bundespräsidenten ersucht, den Kanzler zu entlassen (konstruktives Misstrauensvotum, Art. 67 Abs. 1 S. 1 GG); zwischen Antrag und Wahl müssen 48 Stunden liegen (Art. 67 Abs. 2 GG). Ein bloßes Misstrauensvotum ohne Nachfolger ist rechtlich wirkungslos; L bleibt im Amt.",
    "(b) Findet der Antrag des Kanzlers, ihm das Vertrauen auszusprechen, nicht die Zustimmung der Mehrheit der Mitglieder (316), kann der Bundespräsident auf Vorschlag des Kanzlers binnen 21 Tagen den Bundestag auflösen (Art. 68 Abs. 1 S. 1 GG). 290 Stimmen genügen nicht – die Vertrauensfrage ist gescheitert. Der Bundespräsident kann, muss aber nicht auflösen (Ermessen); das Auflösungsrecht erlischt, sobald der Bundestag mit der Mehrheit seiner Mitglieder einen anderen Kanzler wählt (Art. 68 Abs. 1 S. 2 GG). Bei Auflösung findet die Neuwahl innerhalb von 60 Tagen statt (Art. 39 Abs. 1 S. 4 GG).",
  ],
  bewertung: [
    [2, "Vorschlag des Bundespräsidenten, Wahl ohne Aussprache", "Art. 63 Abs. 1 GG"],
    [3, "Kanzlermehrheit 316 erklärt, K nicht gewählt", "Art. 63 Abs. 2 S. 1 GG – Mehrheit der Mitglieder"],
    [3.5, "zweite Wahlphase: L innerhalb von 14 Tagen mit 320 Stimmen gewählt, Ernennung", "Art. 63 Abs. 3, Abs. 2 S. 2 GG"],
    [4.5, "(a) konstruktives Misstrauensvotum: Nachfolgerwahl nötig, sonst wirkungslos", "Art. 67 Abs. 1 S. 1, Abs. 2 GG"],
    [4, "(b) Vertrauensfrage gescheitert (290 < 316)", "Art. 68 Abs. 1 S. 1 GG"],
    [3, "(b) Auflösungsermessen des Bundespräsidenten, 21 Tage, Erlöschen bei Neuwahl", "Art. 68 Abs. 1 S. 1, 2 GG; Neuwahl Art. 39 Abs. 1 S. 4 GG"],
  ],
}));

const b4 = fest("oer-b4", "D. Der Bundespräsident und die Ausfertigung", 30, () => ({
  sv: "Der Bundespräsident erhält drei Gesetze zur Ausfertigung:\n1. Ein Gesetz, das er für politisch unklug hält, das aber ordnungsgemäß zustande gekommen ist.\n2. Ein Zustimmungsgesetz, dem der Bundesrat nicht zugestimmt hat.\n3. Ein Gesetz, das nach einhelliger Auffassung offenkundig gegen die Menschenwürde (Art. 1 Abs. 1 GG) verstößt.",
  aufgaben: ["Darf bzw. muss der Bundespräsident die Gesetze ausfertigen? Begründen Sie Ihre Antwort und gehen Sie dabei auf sein Prüfungsrecht ein."],
  loesung: [
    "Die nach den Vorschriften des Grundgesetzes zustande gekommenen Gesetze werden vom Bundespräsidenten nach Gegenzeichnung ausgefertigt und verkündet (Art. 82 Abs. 1 S. 1 GG). Aus der Formulierung „nach den Vorschriften dieses Grundgesetzes zustande gekommen“ folgt ein Prüfungsrecht.",
    "Formelles Prüfungsrecht: unstreitig umfassend – Zuständigkeit, Verfahren, Form. Materielles Prüfungsrecht: nach überwiegender Auffassung nur bei offenkundigen, schwerwiegenden Verstößen gegen das Grundgesetz (Evidenzkontrolle), da der Bundespräsident an Gesetz und Recht gebunden ist (Art. 20 Abs. 3 GG) und das Verwerfungsmonopol beim BVerfG liegt. Ein politisches Prüfungsrecht besteht nicht.",
    "1. Politische Bedenken berechtigen nicht zur Verweigerung. Das Gesetz ist formell und materiell nicht zu beanstanden – der Bundespräsident muss ausfertigen.",
    "2. Ein Zustimmungsgesetz kommt nur mit Zustimmung des Bundesrates zustande (Art. 78 GG). Es ist nicht nach den Vorschriften des Grundgesetzes zustande gekommen; der Bundespräsident darf und muss die Ausfertigung verweigern (formelles Prüfungsrecht).",
    "3. Ein offenkundiger Verstoß gegen Art. 1 Abs. 1 GG ist ein evidenter, schwerwiegender materieller Mangel; der Bundespräsident darf die Ausfertigung verweigern.",
  ],
  bewertung: [
    [2.5, "Ausfertigung und Verkündung, Prüfungsrecht aus dem Wortlaut", "Art. 82 Abs. 1 S. 1 GG"],
    [3, "formelles Prüfungsrecht umfassend, materielles nur evident; kein politisches", "Evidenzkontrolle; Art. 20 Abs. 3 GG"],
    [3, "1. politische Bedenken: Pflicht zur Ausfertigung", "kein politisches Prüfungsrecht"],
    [3.5, "2. fehlende Zustimmung → nicht zustande gekommen → Verweigerung", "Art. 78 GG; formelles Prüfungsrecht"],
    [3, "3. offenkundiger Verstoß gegen die Menschenwürde → Verweigerung zulässig", "Art. 1 Abs. 1 GG; evident"],
  ],
}));

const b5 = fest("oer-b5", "E. Gutachten: Formelle Verfassungsmäßigkeit eines Steuergesetzes", 50, () => ({
  sv: "Auf Antrag der Bundesregierung beschließt der Bundestag am 05.06.2026 mit der Mehrheit der abgegebenen Stimmen eine Erhöhung der Tabaksteuer. Der Entwurf war zuvor dem Bundesrat zugeleitet worden, der fristgerecht Stellung genommen hatte. Der Bundesrat ruft den Vermittlungsausschuss an, der das Gesetz ohne Änderungsvorschlag bestätigt. Danach legt der Bundesrat fristgerecht mit 40 von 69 Stimmen Einspruch ein. Der Bundestag weist den Einspruch mit 330 von 630 Stimmen zurück. Der Bundespräsident fertigt das Gesetz nach Gegenzeichnung aus; es wird verkündet.\nHinweis: Das Aufkommen der Tabaksteuer steht dem Bund zu (Art. 106 Abs. 1 Nr. 2 GG).",
  aufgaben: ["Prüfen Sie gutachterlich, ob das Gesetz formell verfassungsgemäß ist (Zuständigkeit, Verfahren, Form)."],
  loesung: [
    "Obersatz: Das Gesetz ist formell verfassungsgemäß, wenn der Bund zuständig war und das Gesetzgebungsverfahren sowie die Formvorschriften eingehalten wurden.",
    "I. Zuständigkeit: Die Länder haben das Recht der Gesetzgebung, soweit das Grundgesetz nicht dem Bund Gesetzgebungsbefugnisse verleiht (Art. 70 Abs. 1 GG). Für Steuern gilt Art. 105 GG: Der Bund hat die konkurrierende Gesetzgebung über die übrigen Steuern, wenn ihm das Aufkommen ganz oder zum Teil zusteht (Art. 105 Abs. 2 S. 2 GG). Das Aufkommen der Tabaksteuer steht dem Bund zu (Art. 106 Abs. 1 Nr. 2 GG). Der Bund ist zuständig; einer Prüfung der Erforderlichkeit nach Art. 72 Abs. 2 GG bedarf es bei dieser ersten Alternative nicht.",
    "II. Verfahren: 1. Einbringung durch die Bundesregierung (Art. 76 Abs. 1 GG) mit vorheriger Zuleitung an den Bundesrat und dessen Stellungnahme (Art. 76 Abs. 2 GG) – ordnungsgemäß. 2. Beschluss des Bundestages mit der Mehrheit der abgegebenen Stimmen (Art. 77 Abs. 1 S. 1, Art. 42 Abs. 2 S. 1 GG) – ordnungsgemäß.",
    "3. Zustimmungs- oder Einspruchsgesetz: Art. 105 Abs. 3 GG verlangt die Zustimmung des Bundesrates nur bei Steuern, deren Aufkommen den Ländern oder Gemeinden zufließt; die Tabaksteuer steht allein dem Bund zu. Eine andere Vorschrift, die die Zustimmung verlangt, ist nicht ersichtlich – Einspruchsgesetz.",
    "4. Einspruch: Erst nach Abschluss des Vermittlungsverfahrens (Art. 77 Abs. 2 GG) kann der Bundesrat binnen zwei Wochen Einspruch einlegen (Art. 77 Abs. 3 S. 1 GG); ohne Anrufung des Vermittlungsausschusses wäre das Gesetz bereits zustande gekommen (Art. 78 GG). Hier wurde der Ausschuss angerufen, der Einspruch ist statthaft und fristgerecht. Er beschließt mit mindestens der Mehrheit seiner Stimmen (Art. 52 Abs. 3 S. 1 GG): 40 von 69 Stimmen sind mehr als 34, aber weniger als zwei Drittel (46). Ein mit einfacher Mehrheit beschlossener Einspruch kann durch Beschluss der Mehrheit der Mitglieder des Bundestages zurückgewiesen werden (Art. 77 Abs. 4 S. 1 GG): erforderlich sind 316 von 630; 330 Stimmen genügen. Das Gesetz ist zustande gekommen (Art. 78 GG).",
    "III. Form: Das Gesetz wurde nach Gegenzeichnung vom Bundespräsidenten ausgefertigt und verkündet (Art. 82 Abs. 1 S. 1 GG).",
    "Ergebnis: Das Gesetz ist formell verfassungsgemäß.",
  ],
  bewertung: [
    [2, "Obersatz: Zuständigkeit, Verfahren, Form", "Prüfungsaufbau formelle Verfassungsmäßigkeit"],
    [5, "Zuständigkeit des Bundes über Art. 105 Abs. 2 S. 2 GG i. V. m. Art. 106 Abs. 1 Nr. 2 GG", "Grundsatz Art. 70 Abs. 1 GG; keine Erforderlichkeitsprüfung"],
    [3, "Einbringung und Erster Durchgang", "Art. 76 Abs. 1, 2 GG"],
    [2, "Beschluss des Bundestages", "Art. 77 Abs. 1 S. 1, Art. 42 Abs. 2 S. 1 GG"],
    [4, "Einspruchsgesetz begründet", "Art. 105 Abs. 3 GG greift nicht – Aufkommen allein beim Bund"],
    [4, "Einspruch erst nach Vermittlungsverfahren; mit einfacher Mehrheit (40 von 69, unter zwei Dritteln)", "Art. 77 Abs. 2, 3 S. 1, Art. 52 Abs. 3 S. 1 GG"],
    [3, "Zurückweisung mit Mehrheit der Mitglieder (330 ≥ 316); Gesetz zustande gekommen", "Art. 77 Abs. 4 S. 1, Art. 78 GG"],
    [2, "Form und Ergebnis", "Art. 82 Abs. 1 S. 1 GG; formell verfassungsgemäß"],
  ],
}));

// ===================================================================================== Klausur C
const c1 = fest("oer-c1", "A. Allgemeine Fragen", 30, () => ({
  sv: "Beantworten Sie die folgenden Fragen in ganzen Sätzen mit Fundstellen.",
  aufgaben: [
    "Was besagt das Demokratieprinzip? Erläutern Sie Volkssouveränität und Legitimationskette.",
    "Was folgt aus dem Sozialstaatsprinzip? Ergeben sich daraus unmittelbare Leistungsansprüche des Einzelnen?",
    "Was versteht man unter Bundestreue?",
    "Wie setzt sich das Bundesverfassungsgericht zusammen, und wie werden seine Richter gewählt?",
    "Unter welchen Voraussetzungen muss der Bundestag einen Untersuchungsausschuss einsetzen?",
  ],
  loesung: [
    "1. Alle Staatsgewalt geht vom Volke aus (Volkssouveränität, Art. 20 Abs. 2 S. 1 GG); sie wird vom Volk in Wahlen und Abstimmungen und durch besondere Organe ausgeübt (Art. 20 Abs. 2 S. 2 GG). Jedes staatliche Handeln muss sich über eine ununterbrochene Legitimationskette auf das Volk zurückführen lassen: Volk wählt Bundestag, dieser den Kanzler, der Kanzler bestimmt die Minister, diese leiten die Verwaltung.",
    "2. Die Bundesrepublik ist ein sozialer Bundesstaat (Art. 20 Abs. 1 GG). Der Staat ist verpflichtet, für eine gerechte Sozialordnung zu sorgen und das Existenzminimum zu sichern. Wegen des weiten Gestaltungsspielraums des Gesetzgebers folgen daraus grundsätzlich keine unmittelbaren Leistungsansprüche; Ausnahme: das menschenwürdige Existenzminimum (Art. 1 Abs. 1 i. V. m. Art. 20 Abs. 1 GG).",
    "3. Bundestreue (bundesfreundliches Verhalten) ist ein ungeschriebener Verfassungsgrundsatz, abgeleitet aus dem Bundesstaatsprinzip (Art. 20 Abs. 1 GG): Bund und Länder müssen bei der Ausübung ihrer Kompetenzen aufeinander Rücksicht nehmen und dürfen ihre Befugnisse nicht missbrauchen.",
    "4. Das BVerfG gliedert sich in zwei Senate; in jeden Senat werden je zur Hälfte vom Bundestag und vom Bundesrat acht Richter gewählt (Art. 93 Abs. 2 S. 1, 2 GG). Die Amtszeit beträgt zwölf Jahre, längstens bis zum Ende des Monats, in dem das 68. Lebensjahr vollendet wird; eine Wiederwahl ist ausgeschlossen (Art. 93 Abs. 3 GG).",
    "5. Der Bundestag hat das Recht und auf Antrag eines Viertels seiner Mitglieder die Pflicht, einen Untersuchungsausschuss einzusetzen (Art. 44 Abs. 1 S. 1 GG); bei 630 Mitgliedern also auf Antrag von mindestens 158 Abgeordneten. Das Minderheitenrecht schützt die Opposition.",
  ],
  bewertung: [
    [3, "1. Volkssouveränität und Legitimationskette", "Art. 20 Abs. 2 S. 1, 2 GG"],
    [3, "2. Sozialstaat: Auftrag, keine unmittelbaren Ansprüche, Ausnahme Existenzminimum", "Art. 20 Abs. 1 GG; Art. 1 Abs. 1 GG"],
    [2.5, "3. Bundestreue als ungeschriebener Grundsatz", "aus Art. 20 Abs. 1 GG abgeleitet; Rücksichtnahme"],
    [3.5, "4. zwei Senate, je acht Richter, Wahl je zur Hälfte BT/BR, 12 Jahre, keine Wiederwahl", "Art. 93 Abs. 2, 3 GG"],
    [3, "5. Pflicht auf Antrag eines Viertels (158 von 630)", "Art. 44 Abs. 1 S. 1 GG – Minderheitenrecht"],
  ],
}));

const c2 = fest("oer-c2", "B. Der Bundesrat", 30, () => ({
  sv: "1. Nordrhein-Westfalen hat rund 18 Mio., Bremen rund 0,7 Mio., Sachsen rund 4 Mio. Einwohner. Wie viele Stimmen haben die Länder im Bundesrat?\n2. Bei einer Abstimmung stimmen von den sechs Vertretern Brandenburgs (4 Stimmen) zwei mit Ja und zwei mit Nein; zwei sind abwesend.\n3. Ein Beschluss erhält 34 Ja-Stimmen, 20 Nein-Stimmen; 15 Stimmen enthalten sich. Ist er angenommen?",
  aufgaben: ["Beantworten Sie die Fragen 1 bis 3 mit Begründung."],
  loesung: [
    "1. Jedes Land hat mindestens drei Stimmen, Länder mit mehr als zwei Millionen Einwohnern vier, mit mehr als sechs Millionen fünf, mit mehr als sieben Millionen sechs Stimmen (Art. 51 Abs. 2 GG). Nordrhein-Westfalen: 6, Bremen: 3, Sachsen: 4.",
    "2. Jedes Land kann so viele Mitglieder entsenden, wie es Stimmen hat (Art. 51 Abs. 3 S. 1 GG) – Brandenburg also vier, nicht sechs. Die Stimmen eines Landes können nur einheitlich und nur durch anwesende Mitglieder oder deren Vertreter abgegeben werden (Art. 51 Abs. 3 S. 2 GG). Bei uneinheitlicher Stimmabgabe (2 Ja, 2 Nein) sind die Stimmen Brandenburgs insgesamt ungültig.",
    "3. Der Bundesrat fasst seine Beschlüsse mit mindestens der Mehrheit seiner Stimmen (Art. 52 Abs. 3 S. 1 GG), also mit der absoluten Mehrheit aller 69 Stimmen: mindestens 35. Enthaltungen und Nein-Stimmen wirken daher wie Nein. Mit 34 Ja-Stimmen ist der Beschluss nicht angenommen.",
  ],
  bewertung: [
    [4, "1. Stimmenverteilung nach Einwohnern: 6, 3, 4", "Art. 51 Abs. 2 GG"],
    [2, "2. Zahl der entsandten Mitglieder", "Art. 51 Abs. 3 S. 1 GG – so viele wie Stimmen"],
    [4, "2. einheitliche Stimmabgabe, sonst ungültig", "Art. 51 Abs. 3 S. 2 GG"],
    [5, "3. Mehrheit seiner Stimmen = 35 von 69; Enthaltung wirkt wie Nein; abgelehnt", "Art. 52 Abs. 3 S. 1 GG"],
  ],
}));

const c3 = fest("oer-c3", "C. Bundestag und Abgeordnete", 40, () => ({
  sv: "1. Die Abgeordnete Anna Albers (A) nennt in einer Rede im Bundestag einen Lobbyisten „korrupt“ (keine verleumderische Beleidigung). Der Lobbyist will sie verklagen.\n2. A wird beim Ladendiebstahl auf frischer Tat ertappt und noch im Geschäft festgenommen. Abwandlung: Die Tat wird erst eine Woche später bekannt, und die Polizei will A verhaften.\n3. 25 Abgeordnete derselben Partei wollen eine Fraktion bilden.\n4. 150 Abgeordnete der Opposition beantragen einen Untersuchungsausschuss; die Mehrheit lehnt ab.\n5. A wechselt aus Protest zu einer anderen Partei; ihre bisherige Partei verlangt, dass sie ihr Mandat zurückgibt.",
  aufgaben: ["Beurteilen Sie die Fälle 1 bis 5 mit Begründung (Bundestag mit 630 Mitgliedern)."],
  loesung: [
    "1. Indemnität: Wegen einer Äußerung im Bundestag darf ein Abgeordneter zu keiner Zeit gerichtlich verfolgt werden; ausgenommen sind nur verleumderische Beleidigungen (Art. 46 Abs. 1 GG). Eine Klage ist unzulässig.",
    "2. Immunität: Wegen einer mit Strafe bedrohten Handlung darf A nur mit Genehmigung des Bundestages zur Verantwortung gezogen oder verhaftet werden, es sei denn, sie wird bei Begehung der Tat oder im Laufe des folgenden Tages festgenommen (Art. 46 Abs. 2 GG). Die Festnahme im Geschäft ist daher ohne Genehmigung zulässig. In der Abwandlung liegt kein solcher Fall vor – die Verhaftung eine Woche später bedarf der Genehmigung des Bundestages. In jedem Fall kann der Bundestag verlangen, dass Haft und Verfahren ausgesetzt werden (Art. 46 Abs. 4 GG).",
    "3. Fraktionen sind Vereinigungen von mindestens fünf vom Hundert der Mitglieder des Bundestages, die derselben Partei angehören (§ 10 Abs. 1 GOBT): 5 % von 630 = 31,5, also mindestens 32 Abgeordnete. 25 Abgeordnete erreichen die Fraktionsstärke nicht; sie können eine Gruppe bilden.",
    "4. Auf Antrag eines Viertels der Mitglieder (mindestens 158) ist der Bundestag verpflichtet, einen Untersuchungsausschuss einzusetzen (Art. 44 Abs. 1 S. 1 GG). 150 Abgeordnete sind weniger als ein Viertel – keine Pflicht; die Mehrheit durfte ablehnen.",
    "5. Freies Mandat: Abgeordnete sind Vertreter des ganzen Volkes, an Aufträge und Weisungen nicht gebunden und nur ihrem Gewissen unterworfen (Art. 38 Abs. 1 S. 2 GG). Ein Parteiwechsel führt nicht zum Mandatsverlust; die Partei kann die Rückgabe nicht verlangen.",
  ],
  bewertung: [
    [3.5, "1. Indemnität: Klage unzulässig", "Art. 46 Abs. 1 GG – Äußerung im Bundestag, keine verleumderische Beleidigung"],
    [4.5, "2. Immunität: Festnahme auf frischer Tat ohne Genehmigung; Verhaftung eine Woche später nur mit Genehmigung", "Art. 46 Abs. 2, 4 GG"],
    [4, "3. Fraktionsstärke 32, daher keine Fraktion", "§ 10 Abs. 1 GOBT – 5 % von 630"],
    [4, "4. Viertel = 158; 150 genügen nicht", "Art. 44 Abs. 1 S. 1 GG"],
    [4, "5. freies Mandat: kein Mandatsverlust bei Parteiwechsel", "Art. 38 Abs. 1 S. 2 GG"],
  ],
}));

const c4 = fest("oer-c4", "D. Verfahren vor dem Bundesverfassungsgericht", 30, () => ({
  sv: "Welches Verfahren vor dem Bundesverfassungsgericht ist jeweils statthaft?\n1. Eine Fraktion meint, der Bundestag habe ihre Rechte bei der Besetzung der Ausschüsse verletzt.\n2. Die Landesregierung Bayerns hält ein soeben verkündetes Bundesgesetz für verfassungswidrig.\n3. Eine Bürgerin sieht sich durch ein Bundesgesetz unmittelbar in ihrer Berufsfreiheit verletzt.\n4. Ein Finanzgericht hält ein Steuergesetz, auf das es in einem anhängigen Verfahren ankommt, für verfassungswidrig.",
  aufgaben: ["Nennen und begründen Sie jeweils die Verfahrensart mit Fundstelle."],
  loesung: [
    "1. Organstreit: Das BVerfG entscheidet über die Auslegung des Grundgesetzes aus Anlass von Streitigkeiten über Rechte und Pflichten eines obersten Bundesorgans oder anderer Beteiligter, die durch das Grundgesetz oder die Geschäftsordnung eines obersten Bundesorgans mit eigenen Rechten ausgestattet sind (Art. 94 Abs. 1 Nr. 1 GG). Fraktionen sind solche Beteiligten (eigene Rechte aus der GOBT).",
    "2. Abstrakte Normenkontrolle: bei Zweifeln über die Vereinbarkeit von Bundesrecht mit dem Grundgesetz auf Antrag u. a. einer Landesregierung (Art. 94 Abs. 1 Nr. 2 GG) – unabhängig von einem konkreten Rechtsstreit.",
    "3. Verfassungsbeschwerde: von jedermann mit der Behauptung, durch die öffentliche Gewalt in einem Grundrecht verletzt zu sein (Art. 94 Abs. 1 Nr. 4a GG).",
    "4. Konkrete Normenkontrolle: Hält ein Gericht ein entscheidungserhebliches Gesetz für verfassungswidrig, hat es das Verfahren auszusetzen und die Entscheidung des BVerfG einzuholen (Art. 100 Abs. 1 S. 1 GG). Das Finanzgericht darf das Gesetz nicht selbst verwerfen.",
    "Die Entscheidungen des BVerfG binden die Verfassungsorgane des Bundes und der Länder sowie alle Gerichte und Behörden (Art. 94 Abs. 4 S. 1 GG).",
  ],
  bewertung: [
    [3.5, "1. Organstreit, Fraktion als Beteiligte", "Art. 94 Abs. 1 Nr. 1 GG"],
    [3.5, "2. abstrakte Normenkontrolle auf Antrag einer Landesregierung", "Art. 94 Abs. 1 Nr. 2 GG"],
    [3, "3. Verfassungsbeschwerde", "Art. 94 Abs. 1 Nr. 4a GG"],
    [3.5, "4. konkrete Normenkontrolle, Aussetzung und Vorlage", "Art. 100 Abs. 1 S. 1 GG"],
    [1.5, "Bindungswirkung", "Art. 94 Abs. 4 S. 1 GG"],
  ],
}));

const c5 = fest("oer-c5", "E. Gutachten: Parteien und Stadthalle", 50, () => ({
  sv: "Die nicht verbotene Partei „Neue Mitte“ (N) beantragt bei der Stadt S die Überlassung der städtischen Stadthalle für ihren Landesparteitag. Die Stadt vergibt die Halle seit Jahren auf Antrag an alle Parteien für Parteitage gegen eine einheitliche Gebühr. Der Bürgermeister lehnt ab: N vertrete „verfassungsfeindliche Positionen“; ein Parteiverbotsverfahren ist nicht beantragt. Außerdem habe N bei der letzten Wahl nur 3 % erreicht.",
  aufgaben: ["Prüfen Sie gutachterlich, ob N einen Anspruch auf Überlassung der Stadthalle hat."],
  loesung: [
    "Obersatz: N könnte einen Anspruch auf Überlassung der Stadthalle aus § 5 Abs. 1 S. 1 PartG i. V. m. Art. 21 Abs. 1, Art. 3 Abs. 1 GG haben.",
    "I. Partei: N müsste eine Partei sein, also eine Vereinigung von Bürgern, die dauernd oder für längere Zeit auf die politische Willensbildung Einfluss nehmen und an der Vertretung des Volkes im Bundestag oder einem Landtag mitwirken will (§ 2 Abs. 1 S. 1 PartG). N nimmt an Wahlen teil – Partei (+).",
    "II. Öffentliche Einrichtung eines Trägers öffentlicher Gewalt: Die Stadt ist Träger öffentlicher Gewalt; die Stadthalle stellt sie den Parteien zur Verfügung (§ 5 Abs. 1 S. 1 PartG).",
    "III. Gleichbehandlung: Stellt ein Träger öffentlicher Gewalt den Parteien Einrichtungen zur Verfügung, sollen alle Parteien gleichbehandelt werden (§ 5 Abs. 1 S. 1 PartG); dies konkretisiert die Chancengleichheit der Parteien aus Art. 21 Abs. 1 i. V. m. Art. 3 Abs. 1 GG. Die Stadt überlässt die Halle allen anderen Parteien – N wird ungleich behandelt.",
    "IV. Rechtfertigung? 1. Verfassungsfeindlichkeit: Über die Verfassungswidrigkeit einer Partei entscheidet ausschließlich das Bundesverfassungsgericht (Art. 21 Abs. 4 GG – Parteienprivileg). Solange kein Verbot ausgesprochen ist, darf eine Behörde eine Partei nicht wegen angeblicher Verfassungsfeindlichkeit benachteiligen. Das Argument trägt nicht.",
    "2. Geringe Bedeutung (3 %): Der Umfang der Gewährung kann nach der Bedeutung der Parteien abgestuft werden (§ 5 Abs. 1 S. 2, 3 PartG) – aber nur bis zu dem für die Erreichung ihres Zweckes erforderlichen Mindestmaß. Ein vollständiger Ausschluss ist keine Abstufung. Auch dieses Argument trägt nicht.",
    "Ergebnis: N hat einen Anspruch auf Überlassung der Stadthalle zu den für alle Parteien geltenden Bedingungen.",
  ],
  bewertung: [
    [2.5, "Obersatz mit Anspruchsgrundlage", "§ 5 Abs. 1 S. 1 PartG i. V. m. Art. 21 Abs. 1, Art. 3 Abs. 1 GG"],
    [3.5, "Parteibegriff definiert und subsumiert", "§ 2 Abs. 1 S. 1 PartG"],
    [3, "Träger öffentlicher Gewalt stellt Einrichtung zur Verfügung", "§ 5 Abs. 1 S. 1 PartG"],
    [4, "Gleichbehandlung / Chancengleichheit, Ungleichbehandlung festgestellt", "Art. 21 Abs. 1 i. V. m. Art. 3 Abs. 1 GG"],
    [6, "Parteienprivileg: Benachteiligung wegen Verfassungsfeindlichkeit unzulässig", "Art. 21 Abs. 4 GG – Entscheidungsmonopol des BVerfG"],
    [4, "abgestufte Gleichbehandlung erlaubt Abstufung, nicht Ausschluss", "§ 5 Abs. 1 S. 2, 3 PartG – Mindestmaß"],
    [2, "Ergebnis: Anspruch (+)", "Gutachtenstil, klares Ergebnis"],
  ],
}));

export const SV_OER = [a1, a2, a3, a4, a5, b1, b2, b3, b4, b5, c1, c2, c3, c4, c5];
export const KLAUSUREN_OER = [
  { id: "oer-a", kurz: "A", titel: "Rechtsstaat, Kompetenzen, Wahlrecht 2026, Ewigkeitsklausel, Rückwirkung", minuten: 180, teile: ["oer-a1", "oer-a2", "oer-a3", "oer-a4", "oer-a5"] },
  { id: "oer-b", kurz: "B", titel: "Abgeordnete, Gesetzgebungsverfahren, Kanzlerwahl, Bundespräsident, Tabaksteuergesetz", minuten: 180, teile: ["oer-b1", "oer-b2", "oer-b3", "oer-b4", "oer-b5"] },
  { id: "oer-c", kurz: "C", titel: "Demokratie, Bundesrat, Bundestag, BVerfG-Verfahren, Parteien und Stadthalle", minuten: 180, teile: ["oer-c1", "oer-c2", "oer-c3", "oer-c4", "oer-c5"] },
];
