import { auswahl } from "../kern.js";
import { MC_SKRIPT } from "./skript.js";
import { MC_EST } from "../est/aufgaben.js";
import { MC_BSR_TEIL2 } from "../bilr/teil2.js";

// Multiple-Choice-Fassungen der ÖR-Frage-Antwort-Aufgaben.
// r = richtige Aussagen, f = plausible, aber falsche Aussagen (Distraktoren aus benachbarten Normen),
// frage = optional abweichende Fragestellung für den MC-Modus.
const M = (r, f, frage) => ({ r, f, frage });

export const MC = {
  ...MC_EST,
  ...MC_BSR_TEIL2,
  ...MC_SKRIPT,
  // ---------------------------------------------------------------- Staatsziele, Geschichte
  "oer-gg-entstehung": M(
    ["Das GG wurde vom Parlamentarischen Rat beschlossen.", "Das GG wurde am 23. Mai 1949 ausgefertigt und verkündet.", "Das GG trat mit Ablauf des Tages der Verkündung in Kraft (Art. 145 Abs. 2 GG)."],
    ["Das GG wurde durch eine Volksabstimmung angenommen.", "Das GG wurde vom ersten Deutschen Bundestag beschlossen.", "Das GG trat am 3. Oktober 1990 in Kraft."],
    "Welche Aussagen zur Entstehung des Grundgesetzes sind richtig?"),
  "oer-gg-146": M(
    ["Das GG war ursprünglich als Provisorium bis zur Wiedervereinigung gedacht.", "Das GG verliert seine Gültigkeit, wenn eine vom deutschen Volk in freier Entscheidung beschlossene Verfassung in Kraft tritt.", "Seit der Vollendung der Einheit gilt es für das gesamte deutsche Volk."],
    ["Art. 146 GG verbietet jede neue Verfassung (Ewigkeitsklausel).", "Das GG tritt nach Art. 146 automatisch nach 50 Jahren außer Kraft.", "Eine neue Verfassung kann nach Art. 146 vom Bundestag mit Zweidrittelmehrheit beschlossen werden."],
    "Welche Aussagen zur Bezeichnung „Grundgesetz“ und zu Art. 146 GG treffen zu?"),
  "oer-gg-einheit": M(
    ["In der Präambel", "Die Präambel nennt 16 Länder."],
    ["In Art. 23 GG in der heutigen Fassung", "In Art. 146 GG", "Die Präambel nennt 11 Länder.", "Im Einigungsvertrag, nicht im GG"],
    "Wo stellt das GG die Vollendung der deutschen Einheit fest, und wie viele Länder werden dort genannt?"),
  "oer-staatszielbestimmung": M(
    ["Staatszielbestimmungen binden alle staatliche Gewalt.", "Staatszielbestimmungen gewähren grundsätzlich keine einklagbaren subjektiven Rechte.", "Beispiel: Schutz der natürlichen Lebensgrundlagen und der Tiere (Art. 20a GG)", "Beispiel: Sozialstaatsprinzip (Art. 20 Abs. 1 GG)"],
    ["Staatszielbestimmungen sind bloße unverbindliche Programmsätze.", "Beispiel: Bundesrecht bricht Landesrecht (Art. 31 GG)", "Jeder Bürger kann die Erfüllung von Staatszielen mit der Verfassungsbeschwerde unmittelbar einklagen."],
    "Welche Aussagen zu Staatszielbestimmungen sind richtig?"),
  "oer-20a": M(
    ["Die natürlichen Lebensgrundlagen", "Die Tiere", "Schutz auch in Verantwortung für die künftigen Generationen", "Durch Gesetzgebung, vollziehende Gewalt und Rechtsprechung"],
    ["Die Kulturdenkmäler", "Nur durch den Gesetzgeber, nicht durch Verwaltung und Gerichte", "Das Klima als einklagbares Grundrecht jedes Einzelnen"],
    "Was schützt der Staat nach Art. 20a GG, und durch wen?"),
  "oer-strukturprinzipien": M(
    ["Republik", "Demokratie", "Sozialstaat", "Bundesstaat", "Rechtsstaat"],
    ["Monarchie", "Zentralstaat", "Präsidialsystem"],
    "Welche Staatsstrukturprinzipien enthält das Grundgesetz?"),
  "oer-79-3": M(
    ["Die Gliederung des Bundes in Länder", "Die grundsätzliche Mitwirkung der Länder bei der Gesetzgebung", "Die in Art. 1 und Art. 20 GG niedergelegten Grundsätze"],
    ["Die Zahl von 16 Ländern", "Die Amtszeit des Bundespräsidenten von fünf Jahren", "Die Größe des Bundestages von 630 Abgeordneten"],
    "Was darf nach Art. 79 Abs. 3 GG (Ewigkeitsklausel) durch eine Grundgesetzänderung nicht berührt werden?"),
  "oer-79-2": M(
    ["Ein Gesetz, das den Wortlaut des GG ausdrücklich ändert oder ergänzt", "Zustimmung von zwei Dritteln der Mitglieder des Bundestages", "Zustimmung von zwei Dritteln der Stimmen des Bundesrates"],
    ["Zustimmung von zwei Dritteln der anwesenden Abgeordneten", "Bestätigung durch einen Volksentscheid", "Zustimmung der einfachen Mehrheit des Bundesrates"],
    "Welche Voraussetzungen gelten für eine Änderung des Grundgesetzes?"),
  "oer-widerstand": M(
    ["Gegen jeden, der es unternimmt, die Ordnung des Art. 20 GG zu beseitigen", "Nur wenn andere Abhilfe nicht möglich ist"],
    ["Gegen jedes verfassungswidrige Gesetz", "Gegen jede rechtswidrige Verwaltungsmaßnahme", "Nur nach vorheriger Feststellung durch das Bundesverfassungsgericht", "Nur Beamte, nicht alle Deutschen"],
    "Unter welchen Voraussetzungen haben alle Deutschen ein Widerstandsrecht nach Art. 20 Abs. 4 GG?"),
  "oer-homogenitaet": M(
    ["Die Landesverfassungen müssen den Grundsätzen des republikanischen, demokratischen und sozialen Rechtsstaates entsprechen.", "In Ländern, Kreisen und Gemeinden muss es eine aus allgemeinen, unmittelbaren, freien, gleichen und geheimen Wahlen hervorgegangene Volksvertretung geben.", "Der Bund gewährleistet die Einhaltung (Art. 28 Abs. 3 GG)."],
    ["Die Landesverfassungen müssen wortgleich mit dem GG sein.", "Jedes Land muss ein Zweikammerparlament haben.", "Landesverfassungen dürfen keine eigenen Grundrechte enthalten."],
    "Was verlangt das Homogenitätsprinzip des Art. 28 GG?"),

  // ---------------------------------------------------------------- Republik, Sozialstaat
  "oer-republik": M(
    ["Das Staatsoberhaupt wird auf Zeit gewählt.", "Das Amt des Staatsoberhaupts ist nicht erblich.", "Der Bundespräsident wird für fünf Jahre gewählt; anschließende Wiederwahl nur einmal."],
    ["Das Staatsoberhaupt muss direkt vom Volk gewählt werden.", "Die Regierung muss aus mehreren Parteien bestehen.", "Alle Staatsgewalt geht von den Ländern aus."],
    "Was bedeutet das Republikprinzip, und wie zeigt es sich im GG?"),
  "oer-sozialstaat": M(
    ["Auftrag an den Staat, für soziale Gerechtigkeit und soziale Sicherheit zu sorgen", "Sicherung des Existenzminimums", "Verankert in Art. 20 Abs. 1 und Art. 28 Abs. 1 GG", "Vor allem Gestaltungsauftrag an den Gesetzgeber"],
    ["Pflicht zur Verstaatlichung großer Unternehmen", "Anspruch jedes Bürgers auf ein bestimmtes Einkommen", "Verbot eines progressiven Steuertarifs"],
    "Was beinhaltet das Sozialstaatsprinzip?"),
  "oer-sozialstaat-anspruch": M(
    ["Nein, grundsätzlich entstehen Ansprüche erst durch Gesetze.", "Unmittelbar aus dem GG folgt aber ein Anspruch auf ein menschenwürdiges Existenzminimum (Art. 1 Abs. 1 i.V.m. Art. 20 Abs. 1 GG)."],
    ["Ja, jede Sozialleistung kann unmittelbar aus Art. 20 Abs. 1 GG eingeklagt werden.", "Ja, aber nur gegenüber dem Land, nicht gegenüber dem Bund", "Nein, das Sozialstaatsprinzip ist rechtlich völlig unverbindlich.", "Ja, sofern der Bundestag zustimmt"]),

  // ---------------------------------------------------------------- Demokratie
  "oer-volkssouveraenitaet": M(
    ["Alle Staatsgewalt geht vom Volke aus.", "Das Volk übt die Staatsgewalt in Wahlen und Abstimmungen aus.", "Die Staatsgewalt wird durch besondere Organe der Gesetzgebung, der vollziehenden Gewalt und der Rechtsprechung ausgeübt."],
    ["Alle Staatsgewalt geht vom Bundestag aus.", "Alle Staatsgewalt geht vom Bundespräsidenten aus.", "Das Volk übt die Staatsgewalt ausschließlich durch Volksentscheide aus."],
    "Welche Aussagen enthält Art. 20 Abs. 2 GG?"),
  "oer-repraesentativ": M(
    ["Überwiegend repräsentative (mittelbare) Demokratie", "Abgeordnete sind Vertreter des ganzen Volkes (Art. 38 Abs. 1 GG).", "Volksentscheide auf Bundesebene sieht das GG nur bei der Neugliederung des Bundesgebiets vor (Art. 29 GG)."],
    ["Überwiegend unmittelbare Demokratie mit regelmäßigen Volksentscheiden", "Jedes Bundesgesetz bedarf der Bestätigung durch Volksentscheid.", "Der Bundeskanzler wird direkt vom Volk gewählt."],
    "Welche Aussagen zur Form der Demokratie im GG sind richtig?"),
  "oer-legitimationskette": M(
    ["Das Volk wählt den Bundestag.", "Der Bundestag wählt den Bundeskanzler.", "Die Bundesminister werden auf Vorschlag des Kanzlers vom Bundespräsidenten ernannt."],
    ["Das Volk wählt den Bundeskanzler direkt.", "Der Bundesrat wählt die Bundesminister.", "Der Bundespräsident wählt den Bundeskanzler ohne Beteiligung des Bundestages."],
    "Welche Glieder gehören zur demokratischen Legitimationskette der Bundesregierung?"),
  "oer-demokratie-zeit": M(
    ["Macht wird nur befristet übertragen.", "Der Bundestag wird auf vier Jahre gewählt.", "Neuwahl frühestens 46, spätestens 48 Monate nach Beginn der Wahlperiode"],
    ["Der Bundestag wird auf fünf Jahre gewählt.", "Neuwahl frühestens 36, spätestens 40 Monate nach Beginn der Wahlperiode", "Der Bundestag kann seine Wahlperiode durch einfachen Beschluss verlängern."],
    "Was gilt zur „Herrschaft auf Zeit“ beim Bundestag?"),
  "oer-mehrheit-minderheit": M(
    ["Untersuchungsausschuss auf Antrag eines Viertels der Mitglieder (Art. 44 GG)", "Einberufung des Bundestages auf Verlangen eines Drittels der Mitglieder (Art. 39 Abs. 3 GG)", "Antrag auf Ausschluss der Öffentlichkeit durch ein Zehntel der Mitglieder (Art. 42 Abs. 1 GG)"],
    ["Wahl des Bundeskanzlers durch ein Viertel der Mitglieder", "Grundgesetzänderung auf Antrag eines Drittels der Mitglieder", "Auflösung des Bundestages auf Antrag der Opposition"],
    "Welche Minderheitenrechte sieht das GG für den Bundestag vor?"),

  // ---------------------------------------------------------------- Rechtsstaat
  "oer-rechtsstaat-norm": M(
    ["Art. 20 Abs. 3 GG (Bindung an Gesetz und Recht)", "Art. 28 Abs. 1 Satz 1 GG („Rechtsstaates“)", "Art. 20 Abs. 2 Satz 2 GG (Gewaltenteilung)", "Art. 19 Abs. 4 GG (Rechtsschutzgarantie)"],
    ["Art. 20 Abs. 1 GG nennt den „Rechtsstaat“ ausdrücklich.", "Art. 31 GG (Bundesrecht bricht Landesrecht)", "Art. 51 Abs. 2 GG"],
    "Wo ist das Rechtsstaatsprinzip im GG verankert bzw. ausgeprägt?"),
  "oer-gewaltenteilung": M(
    ["Gesetzgebung (Legislative)", "Vollziehende Gewalt (Exekutive)", "Rechtsprechung (Judikative)", "Geregelt in Art. 20 Abs. 2 Satz 2 GG"],
    ["Strikte Trennung ohne jede Verschränkung der Gewalten", "Die Presse als vierte Gewalt im Sinne des GG", "Geregelt in Art. 31 GG"],
    "Welche Aussagen zur Gewaltenteilung treffen zu?"),
  "oer-gesetzmaessigkeit": M(
    ["Vorrang des Gesetzes: Die Verwaltung darf nicht gegen Gesetze handeln.", "Vorbehalt des Gesetzes: Belastende Maßnahmen nur aufgrund eines Gesetzes", "Grundlage ist Art. 20 Abs. 3 GG.", "Steuern dürfen nur aufgrund eines Steuergesetzes erhoben werden."],
    ["Die Verwaltung darf von Gesetzen abweichen, wenn es zweckmäßig ist.", "Der Vorbehalt des Gesetzes gilt nur für begünstigende Maßnahmen.", "Verwaltungsvorschriften gehen Gesetzen vor."],
    "Was gehört zum Grundsatz der Gesetzmäßigkeit der Verwaltung?"),
  "oer-bindung-gesetzgeber": M(
    ["Gesetzgebung an die verfassungsmäßige Ordnung", "Vollziehende Gewalt an Gesetz und Recht", "Rechtsprechung an Gesetz und Recht", "Alle drei Gewalten an die Grundrechte (Art. 1 Abs. 3 GG)"],
    ["Gesetzgebung an Verwaltungsvorschriften", "Rechtsprechung an Weisungen des Justizministers", "Vollziehende Gewalt nur an die Verfassung, nicht an einfache Gesetze"],
    "Woran sind die drei Gewalten jeweils gebunden?"),
  "oer-rechtsschutz": M(
    ["Wird jemand durch die öffentliche Gewalt in seinen Rechten verletzt, steht ihm der Rechtsweg offen.", "Ist keine andere Zuständigkeit begründet, ist der ordentliche Rechtsweg gegeben.", "Beispiel: Klage gegen einen Steuerbescheid vor dem Finanzgericht"],
    ["Der Rechtsweg ist erst nach Zustimmung der Behörde eröffnet.", "Gegen Steuerbescheide ist kein Rechtsweg vorgesehen.", "Art. 19 Abs. 4 GG garantiert ausschließlich die Verfassungsbeschwerde."],
    "Welche Aussagen zu Art. 19 Abs. 4 GG treffen zu?"),
  "oer-richter": M(
    ["Die Richter sind unabhängig und nur dem Gesetz unterworfen (Art. 97 Abs. 1 GG).", "Hauptamtliche, endgültig angestellte Richter können gegen ihren Willen nur kraft richterlicher Entscheidung entlassen oder versetzt werden."],
    ["Richter sind an Weisungen des Justizministers gebunden.", "Richter werden auf vier Jahre vom Volk gewählt.", "Richter können vom Bundestag mit einfacher Mehrheit abberufen werden.", "Richter unterliegen dem Ressortprinzip des Art. 65 GG."],
    "Wie sichert das GG die Unabhängigkeit der Rechtsprechung?"),
  "oer-103": M(
    ["Anspruch auf rechtliches Gehör vor Gericht", "Keine Strafe ohne vorheriges Gesetz (Rückwirkungsverbot im Strafrecht)", "Verbot der Doppelbestrafung wegen derselben Tat"],
    ["Anspruch auf einen kostenlosen Anwalt in jedem Verfahren", "Recht auf eine zweite Instanz in allen Verfahren", "Verbot jeder Rückwirkung von Steuergesetzen"],
    "Welche Garantien enthält Art. 103 GG?"),
  "oer-rueckwirkung": M(
    ["Echte Rückwirkung knüpft belastende Rechtsfolgen an bereits abgeschlossene Sachverhalte.", "Echte Rückwirkung ist grundsätzlich unzulässig.", "Unechte Rückwirkung betrifft begonnene, noch nicht abgeschlossene Sachverhalte und ist nicht grundsätzlich unzulässig.", "Im Strafrecht gilt ein absolutes Rückwirkungsverbot (Art. 103 Abs. 2 GG)."],
    ["Echte Rückwirkung ist immer zulässig, wenn sie im Gesetz ausdrücklich angeordnet ist.", "Unechte Rückwirkung ist stets verboten.", "Grundlage des Vertrauensschutzes ist Art. 31 GG."],
    "Welche Aussagen zur Rückwirkung von Gesetzen sind richtig?"),
  "oer-verhaeltnismaessigkeit": M(
    ["Legitimer Zweck", "Geeignetheit", "Erforderlichkeit (kein milderes, gleich wirksames Mittel)", "Angemessenheit"],
    ["Wirtschaftlichkeit", "Zustimmung des Betroffenen", "Einstimmigkeit im Kabinett"],
    "Welche Prüfungsschritte gehören zum Grundsatz der Verhältnismäßigkeit?"),
  "oer-grundrechtsbindung": M(
    ["Die Grundrechte binden Gesetzgebung, vollziehende Gewalt und Rechtsprechung als unmittelbar geltendes Recht.", "Ein Grundrecht darf in keinem Fall in seinem Wesensgehalt angetastet werden."],
    ["Die Grundrechte binden nur die Verwaltung, nicht den Gesetzgeber.", "Grundrechte gelten erst, wenn ein Ausführungsgesetz erlassen ist.", "Der Wesensgehalt darf mit Zweidrittelmehrheit eingeschränkt werden.", "Grundrechte binden nur die Länder."],
    "Was regeln Art. 1 Abs. 3 und Art. 19 Abs. 2 GG?"),

  // ---------------------------------------------------------------- Bundesstaat
  "oer-bundesstaat": M(
    ["Bund und Länder haben jeweils Staatsqualität.", "Verankert in Art. 20 Abs. 1 GG", "Durch Art. 79 Abs. 3 GG vor Abschaffung geschützt", "Die Länder wirken über den Bundesrat beim Bund mit."],
    ["Die Länder sind bloße Verwaltungsbezirke des Bundes.", "Die Länder können jederzeit aus dem Bund austreten.", "Der Bundesstaat kann mit Zweidrittelmehrheit abgeschafft werden."],
    "Welche Aussagen zum Bundesstaatsprinzip treffen zu?"),
  "oer-art30": M(
    ["Die Erfüllung staatlicher Aufgaben ist Sache der Länder, soweit das GG nichts anderes regelt (Art. 30 GG).", "Für die Gesetzgebung konkretisiert in Art. 70 Abs. 1 GG", "Für die Ausführung der Bundesgesetze konkretisiert in Art. 83 GG"],
    ["Grundsätzlich ist der Bund für alle Aufgaben zuständig.", "Die Aufgaben werden jährlich durch den Bundesrat verteilt.", "Bund und Länder sind für alle Aufgaben gemeinsam zuständig."],
    "Wie verteilt das GG grundsätzlich die staatlichen Aufgaben?"),
  "oer-art83": M(
    ["Die Länder führen die Bundesgesetze grundsätzlich als eigene Angelegenheit aus.", "Die Finanzämter sind Landesbehörden, obwohl sie überwiegend Bundesgesetze anwenden."],
    ["Bundesgesetze werden stets von Bundesbehörden ausgeführt.", "Die Finanzämter sind Bundesbehörden.", "Die Ausführung erfolgt durch den Bundesrat.", "Die Länder brauchen für jede Ausführung die Zustimmung der Bundesregierung."],
    "Wer führt die Bundesgesetze – z. B. die Steuergesetze – aus?"),
  "oer-art31": M(
    ["Bundesrecht bricht Landesrecht (Art. 31 GG).", "Eine Landesnorm, die dem Bundesrecht widerspricht, ist nichtig bzw. unanwendbar."],
    ["Landesrecht bricht Bundesrecht.", "Das jüngere Gesetz geht immer vor.", "Der Bundesrat entscheidet im Einzelfall, welches Recht gilt.", "Beide Normen gelten nebeneinander."],
    "Was gilt, wenn Bundesrecht und Landesrecht einander widersprechen?"),
  "oer-bundeszwang": M(
    ["Die Bundesregierung kann den Bundeszwang einsetzen (Art. 37 GG).", "Für den Bundeszwang ist die Zustimmung des Bundesrates erforderlich.", "Beim Bundeszwang hat die Bundesregierung ein Weisungsrecht gegenüber allen Ländern und ihren Behörden."],
    ["Der Bundespräsident kann das Land eigenmächtig auflösen.", "Der Bundestag muss mit Zweidrittelmehrheit zustimmen.", "Das Bundesverfassungsgericht ordnet den Bundeszwang von Amts wegen an."],
    "Was kann der Bund tun, wenn ein Land seine Bundespflichten nicht erfüllt?"),
  "oer-laender-gesetzgebung": M(
    ["Die Länder, soweit das GG nicht dem Bund Gesetzgebungsbefugnisse verleiht (Art. 70 Abs. 1 GG)", "Die Abgrenzung richtet sich nach ausschließlicher und konkurrierender Gesetzgebung."],
    ["Grundsätzlich der Bund", "Der Bundesrat", "Die Bundesregierung durch Rechtsverordnungen", "Bund und Länder stets gemeinsam"],
    "Wer hat nach dem GG grundsätzlich das Recht der Gesetzgebung?"),

  // ---------------------------------------------------------------- Parteien
  "oer-partei-begriff": M(
    ["Vereinigungen von Bürgern, die dauernd oder für längere Zeit Einfluss auf die politische Willensbildung nehmen wollen", "Parteien wollen an der Vertretung des Volkes im Bundestag oder in einem Landtag mitwirken.", "Parteien müssen eine ausreichende Gewähr für die Ernsthaftigkeit ihrer Zielsetzung bieten.", "Mitglieder können nur natürliche Personen sein."],
    ["Für den Parteibegriff genügt die Teilnahme an Kommunalwahlen.", "Eine Partei muss mindestens 1.000 Mitglieder haben.", "Juristische Personen können Mitglied einer Partei sein."],
    "Welche Merkmale gehören zum Parteibegriff des § 2 Abs. 1 PartG?"),
  "oer-partei-verlust": M(
    ["Sechs Jahre lang keine Teilnahme an einer Bundestags- oder Landtagswahl mit eigenen Wahlvorschlägen", "Sechs Jahre lang kein Rechenschaftsbericht trotz Pflicht"],
    ["Zwei Jahre lang keine Teilnahme an einer Kommunalwahl", "Weniger als 0,5 % bei der letzten Bundestagswahl", "Verfehlen der 5-%-Hürde bei zwei Bundestagswahlen", "Mitgliederzahl unter 100"],
    "Wann verliert eine Vereinigung ihre Rechtsstellung als Partei (§ 2 Abs. 2 PartG)?"),
  "oer-partei-keine": M(
    ["Vereinigungen, deren Mitglieder oder Vorstandsmitglieder in der Mehrheit Ausländer sind", "Vereinigungen mit Sitz oder Geschäftsleitung im Ausland", "Vereinigungen, die nur in Gemeinden tätig sein wollen (Rathausparteien)"],
    ["Vereinigungen, die bei einer Wahl weniger als 5 % der Stimmen erhalten", "Vereinigungen, die überhaupt Ausländer als Mitglieder haben", "Vereinigungen, die nur in einem Land zu Wahlen antreten"],
    "Welche politischen Vereinigungen sind keine Parteien?"),
  "oer-partei-stellung": M(
    ["Die Parteien wirken bei der politischen Willensbildung des Volkes mit (Art. 21 Abs. 1 GG).", "Parteien sind ein verfassungsrechtlich notwendiger Bestandteil der freiheitlichen demokratischen Grundordnung (§ 1 Abs. 1 PartG).", "Parteien sind keine Staatsorgane, sondern Mittler zwischen Volk und Staat."],
    ["Parteien sind Verfassungsorgane wie Bundestag und Bundesrat.", "Parteien sind Behörden der mittelbaren Staatsverwaltung.", "Parteien haben das alleinige Recht zur politischen Willensbildung."],
    "Welche verfassungsrechtliche Stellung haben die Parteien?"),
  "oer-partei-aufgaben": M(
    ["Einfluss auf die Gestaltung der öffentlichen Meinung", "Aufstellung von Bewerbern für Wahlen in Bund, Ländern und Gemeinden", "Anregung und Vertiefung der politischen Bildung", "Ständige lebendige Verbindung zwischen Volk und Staatsorganen"],
    ["Ernennung der Bundesminister", "Wahlprüfung nach einer Bundestagswahl", "Ausfertigung der Bundesgesetze"],
    "Welche Aufgaben haben die Parteien nach § 1 Abs. 2 PartG?"),
  "oer-art21-1": M(
    ["Die Gründung einer Partei ist frei.", "Die innere Ordnung einer Partei muss demokratischen Grundsätzen entsprechen.", "Parteien müssen über Herkunft und Verwendung ihrer Mittel sowie über ihr Vermögen öffentlich Rechenschaft geben."],
    ["Die Gründung einer Partei bedarf der Genehmigung des Bundeswahlleiters.", "Parteien müssen jährlich vom Bundesverfassungsgericht zugelassen werden.", "Parteien dürfen kein eigenes Vermögen haben."],
    "Welche Anforderungen stellt Art. 21 Abs. 1 GG an die Parteien?"),
  "oer-parteiverbot": M(
    ["Die Partei muss darauf ausgehen, die freiheitliche demokratische Grundordnung zu beeinträchtigen oder zu beseitigen oder den Bestand der BRD zu gefährden.", "Entscheidung ausschließlich durch das Bundesverfassungsgericht", "Nach einem Verbot verlieren die Abgeordneten der Partei ihre Bundestagsmandate (§ 46 Abs. 1 Nr. 5 BWahlG).", "Ersatzorganisationen sind verboten (§ 33 PartG)."],
    ["Entscheidung durch den Bundesinnenminister", "Entscheidung durch Beschluss des Bundestages mit Zweidrittelmehrheit", "Ein Verbot ist bereits bei radikalen Forderungen zur Steuerpolitik möglich."],
    "Welche Aussagen zum Parteiverbot sind richtig?"),
  "oer-finanzierungsausschluss": M(
    ["Verfassungsfeindliche Parteien können von der staatlichen Finanzierung ausgeschlossen werden.", "Beim Finanzierungsausschluss entfallen auch steuerliche Begünstigungen der Partei und ihrer Spender.", "Für den Finanzierungsausschluss kommt es nicht darauf an, ob die Partei ihre Ziele realistisch erreichen kann.", "Die Entscheidung trifft das Bundesverfassungsgericht; die Partei bleibt bestehen."],
    ["Der Ausschluss führt automatisch zum Parteiverbot.", "Über den Ausschluss entscheidet der Bundestagspräsident.", "Der Ausschluss gilt nur für Spenden, nicht für staatliche Mittel."],
    "Welche Aussagen zu Art. 21 Abs. 3 GG treffen zu?"),
  "oer-staatliche-finanzierung": M(
    ["Mindestens 0,5 % bei der letzten Europa- oder Bundestagswahl", "Mindestens 1,0 % bei einer Landtagswahl"],
    ["Mindestens 5 % bei der letzten Bundestagswahl", "Mindestens 3 Direktmandate", "Mindestens 1.000 Mitglieder", "Fraktionsstärke im Bundestag"],
    "Ab welchem Wahlergebnis haben Parteien Anspruch auf staatliche Teilfinanzierung nach den Wählerstimmen (§ 18 Abs. 4 PartG)?"),
  "oer-partei-gleichbehandlung": M(
    ["Grundsätzlich sollen alle Parteien gleich behandelt werden.", "Der Umfang kann nach der Bedeutung der Parteien abgestuft werden.", "Eine Partei in Fraktionsstärke im Bundestag muss mindestens halb so viel erhalten wie jede andere Partei."],
    ["Alle Parteien müssen exakt gleich viel erhalten.", "Nur im Bundestag vertretene Parteien erhalten Leistungen.", "Die Verteilung erfolgt ausschließlich nach Mitgliederzahlen."],
    "Was gilt nach § 5 PartG für öffentliche Leistungen an Parteien?"),
  "oer-partei-mitglieder": M(
    ["Gleiches Stimmrecht aller Mitglieder", "Jederzeitiger sofortiger Austritt", "Ausschluss nur bei vorsätzlichem Satzungsverstoß bzw. erheblichem Verstoß mit schwerem Schaden für die Partei", "Über den Ausschluss entscheidet ein Parteischiedsgericht."],
    ["Anspruch jedes Bürgers auf Aufnahme in eine Partei", "Austritt nur zum Jahresende möglich", "Ausschluss durch einfachen Vorstandsbeschluss ohne Begründung"],
    "Welche Aussagen zu den Rechten der Parteimitglieder (§ 10 PartG) sind richtig?"),
  "oer-partei-satzung": M(
    ["Eine schriftliche Satzung", "Ein schriftliches Programm", "Mitteilung an den Bundeswahlleiter"],
    ["Genehmigung der Satzung durch das Bundesverfassungsgericht", "Mitteilung an den Bundespräsidenten", "Eintragung ins Handelsregister"],
    "Was muss eine Partei haben bzw. tun (§ 6 PartG)?"),

  // ---------------------------------------------------------------- Bundestag
  "oer-bt-bedeutung": M(
    ["Beschluss der Bundesgesetze", "Wahl des Bundeskanzlers", "Kontrolle der Bundesregierung, z. B. durch Untersuchungsausschüsse", "Wahl der Hälfte der Bundesverfassungsrichter"],
    ["Ernennung der Bundesminister", "Ausfertigung der Bundesgesetze", "Völkerrechtliche Vertretung des Bundes"],
    "Welche Aufgaben gehören zu den Grundfunktionen des Bundestages (Gesetzgebung, Kreation, Kontrolle)?"),
  "oer-bt-groesse": M(
    ["630 Abgeordnete", "Die Zahl kann sich nach § 4 Abs. 4 BWahlG erhöhen, wenn eine Partei mit mehr als der Hälfte der berücksichtigten Zweitstimmen sonst keine Sitzmehrheit hätte."],
    ["598 Abgeordnete", "736 Abgeordnete", "Die Zahl erhöht sich regelmäßig durch Überhang- und Ausgleichsmandate.", "299 Abgeordnete"],
    "Aus wie vielen Abgeordneten besteht der Bundestag?"),
  "oer-bt-organisation": M(
    ["Der Bundestag wählt seinen Präsidenten, dessen Stellvertreter und die Schriftführer.", "Der Bundestag gibt sich eine Geschäftsordnung.", "Der Präsident übt Hausrecht und Polizeigewalt im Bundestag aus.", "Die Geschäftsordnung des Bundestages ist eine autonome Satzung, kein Verfassungsrecht."],
    ["Der Bundestagspräsident wird vom Bundespräsidenten ernannt.", "Die Geschäftsordnung des Bundestages erlässt die Bundesregierung.", "Ausschüsse für Finanzen und Sport sind im GG vorgeschrieben."],
    "Welche Aussagen zur Organisation des Bundestages sind richtig?"),
  "oer-untersuchungsausschuss": M(
    ["Auf Antrag eines Viertels seiner Mitglieder muss der Bundestag einen Untersuchungsausschuss einsetzen.", "Bei 630 Mitgliedern sind mindestens 158 Abgeordnete nötig.", "Für Angelegenheiten der Verteidigung hat der Verteidigungsausschuss die Rechte eines Untersuchungsausschusses."],
    ["Auf Antrag einer Fraktion", "Auf Antrag eines Drittels der Mitglieder", "Bei 630 Mitgliedern genügen 126 Abgeordnete.", "Nur auf Antrag der Bundesregierung"],
    "Wann muss der Bundestag einen Untersuchungsausschuss einsetzen?"),
  "oer-oeffentlichkeit": M(
    ["Der Bundestag verhandelt grundsätzlich öffentlich.", "Antrag auf Ausschluss: ein Zehntel der Mitglieder oder die Bundesregierung", "Beschluss mit Zweidrittelmehrheit"],
    ["Antrag auf Ausschluss: ein Viertel der Mitglieder", "Beschluss mit einfacher Mehrheit", "Der Bundestagspräsident kann die Öffentlichkeit allein ausschließen."],
    "Was gilt nach Art. 42 Abs. 1 GG zur Öffentlichkeit der Bundestagssitzungen?"),
  "oer-zitierrecht": M(
    ["Bundestag und Ausschüsse können die Anwesenheit jedes Mitglieds der Bundesregierung verlangen.", "Mitglieder von Bundesrat und Bundesregierung haben zu allen Sitzungen Zutritt.", "Mitglieder von Bundesrat und Bundesregierung müssen im Bundestag jederzeit gehört werden."],
    ["Der Bundestag kann den Bundespräsidenten zur Anwesenheit verpflichten.", "Bundesratsmitglieder haben im Bundestag Stimmrecht.", "Das Zutrittsrecht gilt nur für öffentliche Sitzungen."],
    "Was versteht man unter Zitier- und Zutrittsrecht (Art. 43 GG)?"),
  "oer-wahlpruefung": M(
    ["Der Bundestag selbst", "Gegen die Entscheidung des Bundestages ist Beschwerde zum Bundesverfassungsgericht zulässig."],
    ["Der Bundeswahlleiter abschließend", "Der Bundesrat", "Ausschließlich das Bundesverwaltungsgericht", "Der Bundespräsident"],
    "Wer prüft die Gültigkeit der Bundestagswahl (Art. 41 GG)?"),
  "oer-legislatur": M(
    ["Wahl auf vier Jahre", "Die Wahlperiode endet mit dem Zusammentritt eines neuen Bundestages.", "Neuwahl frühestens 46, spätestens 48 Monate nach Beginn der Wahlperiode", "Der neue Bundestag tritt spätestens am 30. Tag nach der Wahl zusammen."],
    ["Die Wahlperiode endet genau vier Jahre nach dem Wahltag.", "Nach einer Auflösung findet die Neuwahl innerhalb von 90 Tagen statt.", "Der neue Bundestag tritt spätestens am 60. Tag nach der Wahl zusammen."],
    "Welche Aussagen zur Wahlperiode des Bundestages sind richtig?"),
  "oer-einberufung": M(
    ["Ein Drittel der Mitglieder des Bundestages", "Der Bundespräsident", "Der Bundeskanzler"],
    ["Ein Zehntel der Mitglieder", "Der Bundesrat", "Eine einzelne Fraktion"],
    "Auf wessen Verlangen muss der Bundestagspräsident den Bundestag einberufen?"),
  "oer-aufloesung": M(
    ["Der Bundestag hat kein Selbstauflösungsrecht.", "Auflösung, wenn der Kanzler im dritten Wahlgang nicht die Mehrheit der Mitglieder erreicht (Art. 63 Abs. 4 GG)", "Auflösung nach gescheiterter Vertrauensfrage binnen 21 Tagen (Art. 68 GG)", "Neuwahl innerhalb von 60 Tagen"],
    ["Der Bundestag kann sich mit Zweidrittelmehrheit selbst auflösen.", "Der Bundespräsident kann den Bundestag jederzeit nach Ermessen auflösen.", "Der Bundesrat kann die Auflösung beschließen."],
    "Welche Aussagen zur Auflösung des Bundestages treffen zu?"),
  "oer-mehrheiten": M(
    ["Einfache Mehrheit = Mehrheit der abgegebenen Stimmen (Art. 42 Abs. 2 GG)", "Absolute Mehrheit = Mehrheit der gesetzlichen Mitgliederzahl, bei 630 also 316", "Grundgesetzänderung: zwei Drittel der Mitglieder (420)", "Kanzlerwahl im ersten Wahlgang: Mehrheit der Mitglieder"],
    ["Absolute Mehrheit = Mehrheit der anwesenden Abgeordneten", "Grundgesetzänderung: zwei Drittel der abgegebenen Stimmen", "Einfache Gesetze brauchen stets 316 Ja-Stimmen."],
    "Welche Aussagen zu den Abstimmungsmehrheiten im Bundestag sind richtig?"),
  "oer-art121": M(
    ["Die Mehrheit der gesetzlichen Mitgliederzahl", "Bei 630 Abgeordneten: mindestens 316 Stimmen"],
    ["Die Mehrheit der anwesenden Abgeordneten", "Die Mehrheit der abgegebenen Stimmen", "Bei 630 Abgeordneten: mindestens 315 Stimmen", "Zwei Drittel der Mitglieder"],
    "Was bedeutet „Mehrheit der Mitglieder des Bundestages“ (Art. 121 GG)?"),
  "oer-freies-mandat": M(
    ["Abgeordnete sind Vertreter des ganzen Volkes.", "Abgeordnete sind an Aufträge und Weisungen nicht gebunden.", "Abgeordnete sind nur ihrem Gewissen unterworfen."],
    ["Bei Fraktionsaustritt verliert der Abgeordnete sein Mandat.", "Abgeordnete sind an Weisungen ihrer Partei gebunden.", "Abgeordnete vertreten nur ihren Wahlkreis."],
    "Was besagt das freie Mandat (Art. 38 Abs. 1 Satz 2 GG)?"),
  "oer-indemnitaet": M(
    ["Indemnität: Schutz vor Verfolgung wegen Abstimmungen und Äußerungen im Bundestag – dauerhaft", "Indemnität gilt nicht für verleumderische Beleidigungen.", "Immunität: Strafverfolgung oder Verhaftung nur mit Genehmigung des Bundestages", "Immunität gilt nicht bei Festnahme auf frischer Tat oder im Laufe des folgenden Tages."],
    ["Die Indemnität kann vom Bundestag aufgehoben werden.", "Die Immunität gilt auch nach dem Ende des Mandats fort.", "Die Indemnität schützt auch Äußerungen in Talkshows."],
    "Welche Aussagen zu Indemnität und Immunität (Art. 46 GG) sind richtig?"),
  "oer-abgeordnete-rechte": M(
    ["Zeugnisverweigerungsrecht", "Anspruch auf Wahlvorbereitungsurlaub", "Kündigungsverbot wegen des Mandats", "Angemessene, die Unabhängigkeit sichernde Entschädigung"],
    ["Anspruch auf einen Dienstwagen mit Fahrer", "Befreiung von der Einkommensteuer", "Recht, an Bundesratssitzungen mit Stimmrecht teilzunehmen"],
    "Welche Rechte gewähren Art. 47 und 48 GG den Abgeordneten?"),
  "oer-mandatsverlust": M(
    ["Verzicht", "Das BVerfG stellt die Verfassungswidrigkeit seiner Partei fest.", "Wegfall einer Voraussetzung der jederzeitigen Wählbarkeit", "Ungültigkeit des Erwerbs der Mitgliedschaft"],
    ["Austritt aus der Partei", "Austritt aus der Fraktion", "Abstimmung gegen die eigene Fraktion"],
    "Wann verliert ein Abgeordneter seine Mitgliedschaft im Bundestag (§ 46 BWahlG)?"),

  // ---------------------------------------------------------------- Wahl
  "oer-wahlgrundsaetze": M(
    ["allgemein", "unmittelbar", "frei", "gleich", "geheim"],
    ["öffentlich", "verpflichtend", "mittelbar"],
    "Welche Wahlrechtsgrundsätze nennt Art. 38 Abs. 1 Satz 1 GG?"),
  "oer-wahlsystem": M(
    ["Bei der Bundestagswahl gelten die Grundsätze der Verhältniswahl.", "Jeder Wähler hat eine Erst- und eine Zweitstimme.", "Die Zweitstimme bestimmt die Sitzverteilung zwischen den Parteien.", "Wahlkreissieger erhalten ihren Sitz nur bei Zweitstimmendeckung."],
    ["Bei der Bundestagswahl gilt die reine Mehrheitswahl.", "Die Erststimme bestimmt die Stärke der Parteien im Bundestag.", "Jeder Wähler hat drei Stimmen."],
    "Welche Aussagen zum Wahlsystem der Bundestagswahl treffen zu?"),
  "oer-zweitstimmendeckung": M(
    ["Eine Partei erhält für ihre Wahlkreissieger nur so viele Sitze, wie ihr nach den Zweitstimmen zustehen.", "Die Wahlkreissieger werden nach fallendem Erststimmenanteil gereiht.", "Wahlkreissieger mit den niedrigsten Anteilen können leer ausgehen."],
    ["Überzählige Wahlkreissieger erhalten Überhangmandate.", "Die Reihenfolge richtet sich nach der Landesliste.", "Für jedes Überhangmandat erhalten die anderen Parteien Ausgleichsmandate."],
    "Was bedeutet Zweitstimmendeckung (§ 6 Abs. 1 BWahlG)?"),
  "oer-sperrklausel": M(
    ["Parteien mit weniger als 5 % der gültigen Zweitstimmen werden grundsätzlich nicht berücksichtigt.", "Parteien nationaler Minderheiten sind von der 5-%-Hürde ausgenommen.", "Parteien mit mindestens drei gewonnenen Wahlkreisen werden trotz weniger als 5 % berücksichtigt (Maßgabe des BVerfG)."],
    ["Parteien mit mehr als 100.000 Mitgliedern sind von der 5-%-Hürde ausgenommen.", "Ein einziger gewonnener Wahlkreis genügt, um trotz weniger als 5 % berücksichtigt zu werden.", "Die Sperrklausel beträgt 3 %."],
    "Welche Parteien werden bei der Sitzverteilung berücksichtigt?"),
  "oer-sitzverteilung": M(
    ["Oberverteilung: Verteilung auf die Parteien nach den Zweitstimmen im ganzen Wahlgebiet", "Unterverteilung: Verteilung auf die Landeslisten jeder Partei", "Divisorverfahren mit Standardrundung (Sainte-Laguë/Schepers)", "Der Divisor wird so bestimmt, dass alle Sitze vergeben werden."],
    ["Verteilung nach dem Höchstzahlverfahren d’Hondt", "Verteilung nach den Erststimmen", "Bruchteile werden immer abgerundet."],
    "Wie werden die Sitze auf die Parteien verteilt (§§ 4, 5 BWahlG)?"),
  "oer-wahlberechtigung": M(
    ["Deutscher im Sinne des Art. 116 Abs. 1 GG", "Vollendung des 18. Lebensjahres am Wahltag", "Seit mindestens drei Monaten Wohnung oder gewöhnlicher Aufenthalt in Deutschland", "Kein Ausschluss vom Wahlrecht nach § 13 BWahlG"],
    ["Seit mindestens einem Jahr Wohnung im Wahlkreis", "Mitgliedschaft in einer Partei", "Staatsangehörigkeit eines EU-Mitgliedstaats genügt."],
    "Welche Voraussetzungen hat die Wahlberechtigung bei der Bundestagswahl (§ 12 Abs. 1 BWahlG)?"),
  "oer-auslandsdeutsche": M(
    ["Ja, wenn sie nach dem 14. Lebensjahr mindestens drei Monate ununterbrochen in Deutschland gewohnt haben und der Wegzug nicht länger als 25 Jahre zurückliegt", "Ja, wenn sie aus anderen Gründen persönlich und unmittelbar mit den politischen Verhältnissen in Deutschland vertraut und von ihnen betroffen sind"],
    ["Nein, Auslandsdeutsche sind nie wahlberechtigt.", "Ja, aber nur, wenn sie weniger als 10 Jahre im Ausland leben", "Ja, ohne jede weitere Voraussetzung", "Ja, wenn der Aufenthalt in Deutschland nicht länger als 40 Jahre zurückliegt"],
    "Dürfen im Ausland lebende Deutsche an der Bundestagswahl teilnehmen (§ 12 Abs. 2 BWahlG)?"),
  "oer-wahlausschluss": M(
    ["Vom Wahlrecht ausgeschlossen ist, wer es infolge Richterspruchs nicht besitzt.", "Nicht wählbar ist auch, wer infolge Richterspruchs die Wählbarkeit oder die Fähigkeit zur Bekleidung öffentlicher Ämter nicht besitzt."],
    ["Ausgeschlossen sind alle Personen in Betreuung.", "Ausgeschlossen sind alle Strafgefangenen.", "Ausgeschlossen ist, wer seine Steuern nicht gezahlt hat.", "Ausgeschlossen ist, wer bei der letzten Wahl nicht gewählt hat."],
    "Wer ist vom Wahlrecht ausgeschlossen bzw. nicht wählbar (§§ 13, 15 BWahlG)?"),
  "oer-waehlbarkeit": M(
    ["Deutscher im Sinne des Art. 116 Abs. 1 GG", "Vollendung des 18. Lebensjahres am Wahltag", "Eine Mindestwohndauer in Deutschland ist nicht erforderlich."],
    ["Vollendung des 25. Lebensjahres", "Mitgliedschaft in einer Partei", "Mindestens drei Monate Wohnung im Wahlkreis"],
    "Wer ist in den Bundestag wählbar (§ 15 BWahlG)?"),
  "oer-wahltag": M(
    ["Der Bundespräsident bestimmt den Wahltag.", "Wahltag muss ein Sonntag oder gesetzlicher Feiertag sein."],
    ["Der Bundestagspräsident bestimmt den Wahltag.", "Die Bundesregierung bestimmt den Wahltag.", "Wahltag muss ein Werktag sein.", "Wahltag muss ein Samstag oder Sonntag sein."],
    "Was regelt § 16 BWahlG zum Wahltag?"),
  "oer-persoenlich": M(
    ["Das Wahlrecht kann nur einmal und nur persönlich ausgeübt werden.", "Vertretung durch eine andere Person ist unzulässig.", "Wer des Lesens unkundig oder behindert ist, darf eine Hilfsperson für technische Hilfe nutzen."],
    ["Ehepartner dürfen füreinander wählen.", "Eltern dürfen für ihre minderjährigen Kinder wählen.", "Mit schriftlicher Vollmacht ist Stellvertretung zulässig."],
    "Was gilt nach § 14 BWahlG zur Stimmabgabe?"),
  "oer-briefwahl": M(
    ["Wahlschein und Stimmzettel (im Stimmzettelumschlag) werden im Wahlbriefumschlag an den Kreiswahlleiter gesandt.", "Der Wahlbrief muss spätestens am Wahltag bis 18 Uhr eingehen.", "Auf dem Wahlschein ist an Eides statt zu versichern, dass persönlich gekennzeichnet wurde."],
    ["Bei der Briefwahl genügt es, wenn der Wahlbrief am Wahltag abgestempelt ist.", "Der Wahlbrief muss bis Freitag vor der Wahl eingehen.", "Der Stimmzettel wird ohne Umschlag direkt im Wahlbrief versandt."],
    "Welche Aussagen zur Briefwahl (§ 36 BWahlG) sind richtig?"),
  "oer-ungueltig": M(
    ["Der Stimmzettel ist nicht amtlich hergestellt.", "Der Stimmzettel enthält keine Kennzeichnung.", "Der Wille des Wählers ist nicht zweifelsfrei erkennbar.", "Der Stimmzettel enthält einen Zusatz oder Vorbehalt."],
    ["Das Kreuz wurde mit Kugelschreiber statt mit dem bereitgelegten Stift gesetzt.", "Erst- und Zweitstimme wurden für verschiedene Parteien abgegeben.", "Das Kreuz ragt leicht über den Kreis hinaus."],
    "Wann sind Stimmen nach § 39 Abs. 1 BWahlG ungültig?"),
  "oer-unabhaengige": M(
    ["Ja, parteilose Einzelbewerber können in einem Wahlkreis kandidieren.", "Einzelbewerber brauchen mindestens 200 Unterschriften Wahlberechtigter des Wahlkreises.", "Einzelbewerber sind mit den meisten Erststimmen gewählt – ohne Zweitstimmendeckung."],
    ["Einzelbewerber können auch eine Landesliste einreichen.", "Nein, nur Parteien können Bewerber aufstellen.", "Einzelbewerber brauchen 2.000 Unterschriften."],
    "Können parteilose Einzelbewerber in den Bundestag gewählt werden?"),
  "oer-wahlgeheimnis": M(
    ["Der Stimmzettel muss unbeobachtet gekennzeichnet und gefaltet werden können (Wahlkabine).", "Die Wahlurnen müssen das Wahlgeheimnis sicherstellen.", "Der Wähler faltet den Stimmzettel so, dass die Stimmabgabe nicht erkennbar ist."],
    ["Der Wahlvorstand notiert, wer welche Partei gewählt hat.", "Der Stimmzettel wird offen in die Urne gelegt.", "Wahlhelfer müssen die Kennzeichnung kontrollieren."],
    "Wie wird das Wahlgeheimnis im Wahllokal gesichert?"),

  // ---------------------------------------------------------------- Bundesrat
  "oer-br-bedeutung": M(
    ["Durch den Bundesrat wirken die Länder bei der Gesetzgebung des Bundes mit.", "Durch den Bundesrat wirken die Länder bei der Verwaltung des Bundes mit.", "Durch den Bundesrat wirken die Länder in Angelegenheiten der Europäischen Union mit."],
    ["Der Bundesrat ist die Vertretung der Gemeinden.", "Der Bundesrat kontrolliert die Landesregierungen.", "Der Bundesrat wählt den Bundeskanzler."],
    "Welche Bedeutung hat der Bundesrat (Art. 50 GG)?"),
  "oer-br-aufgaben": M(
    ["Gesetzesinitiative beim Bundestag", "Einspruch bzw. Zustimmung zu Bundesgesetzen", "Zustimmung zu Grundgesetzänderungen mit zwei Dritteln seiner Stimmen", "Wahl der Hälfte der Bundesverfassungsrichter"],
    ["Wahl des Bundeskanzlers", "Ernennung der Bundesminister", "Ausfertigung und Verkündung der Bundesgesetze"],
    "Welche Aufgaben und Befugnisse hat der Bundesrat?"),
  "oer-br-zusammensetzung": M(
    ["Aus Mitgliedern der Regierungen der Länder", "Die Länder bestellen ihre Bundesratsmitglieder und berufen sie ab.", "Jedes Land kann so viele Mitglieder entsenden, wie es Stimmen hat."],
    ["Aus direkt vom Volk gewählten Senatoren", "Aus Abgeordneten der Landtage", "Aus Vertretern der Parteien im Verhältnis ihrer Bundestagssitze"],
    "Wie setzt sich der Bundesrat zusammen (Art. 51 GG)?"),
  "oer-br-stimmen": M(
    ["Jedes Land hat mindestens drei Stimmen.", "Länder mit mehr als 2 Mio. Einwohnern haben vier Stimmen.", "Länder mit mehr als 6 Mio. Einwohnern haben fünf Stimmen.", "Länder mit mehr als 7 Mio. Einwohnern haben sechs Stimmen."],
    ["Jedes Land hat gleich viele Stimmen.", "Länder mit mehr als 10 Mio. Einwohnern haben acht Stimmen.", "Die Stimmen werden nach der Wirtschaftskraft verteilt."],
    "Wie viele Stimmen hat ein Land im Bundesrat (Art. 51 Abs. 2 GG)?"),
  "oer-br-einheitlich": M(
    ["Die Stimmen eines Landes können nur einheitlich abgegeben werden.", "Die Stimmen eines Landes können nur durch anwesende Mitglieder oder deren Vertreter abgegeben werden.", "Bei uneinheitlicher Abgabe sind die Stimmen des Landes ungültig."],
    ["Jedes Bundesratsmitglied stimmt nach eigenem Gewissen.", "Die Stimmen können schriftlich durch Abwesende abgegeben werden.", "Bei uneinheitlicher Abgabe zählt die Stimme des Ministerpräsidenten."],
    "Wie müssen die Stimmen eines Landes im Bundesrat abgegeben werden?"),
  "oer-br-beschluss": M(
    ["Mit mindestens der Mehrheit seiner Stimmen (absolute Mehrheit)", "Bei 69 Stimmen also mindestens 35 Ja-Stimmen", "Enthaltungen wirken wie Nein-Stimmen."],
    ["Mit der Mehrheit der abgegebenen Stimmen", "Enthaltungen werden nicht mitgezählt.", "Bei 69 Stimmen genügen 30 Ja-Stimmen, wenn weniger Nein-Stimmen abgegeben werden."],
    "Mit welcher Mehrheit fasst der Bundesrat Beschlüsse (Art. 52 Abs. 3 GG)?"),
  "oer-br-praesident": M(
    ["Der Bundesratspräsident wird auf ein Jahr gewählt.", "Der Bundesratspräsident beruft den Bundesrat ein.", "Der Bundesratspräsident nimmt bei Verhinderung des Bundespräsidenten dessen Befugnisse wahr."],
    ["Der Bundesratspräsident wird auf vier Jahre gewählt.", "Der Bundesratspräsident ist zugleich Bundestagspräsident.", "Der Bundesratspräsident wird vom Bundespräsidenten ernannt."],
    "Welche Aussagen zum Präsidenten des Bundesrates sind richtig?"),
  "oer-br-regierung": M(
    ["Mitglieder der Bundesregierung haben das Recht, an den Verhandlungen des Bundesrates teilzunehmen.", "Auf Verlangen des Bundesrates müssen Mitglieder der Bundesregierung an seinen Verhandlungen teilnehmen.", "Mitglieder der Bundesregierung müssen im Bundesrat jederzeit gehört werden.", "Die Bundesregierung muss den Bundesrat über die Führung der Geschäfte auf dem Laufenden halten."],
    ["Bundesminister haben im Bundesrat Stimmrecht.", "Der Bundesrat kann einzelne Minister durch Misstrauensvotum abberufen.", "Die Bundesregierung kann den Bundesrat auflösen."],
    "Welche Rechte und Pflichten bestehen zwischen Bundesregierung und Bundesrat (Art. 53 GG)?"),
  "oer-br-europakammer": M(
    ["Der Bundesrat kann für EU-Angelegenheiten eine Europakammer bilden.", "Beschlüsse der Europakammer gelten als Beschlüsse des Bundesrates.", "Die Stimmenzahl der Länder richtet sich nach Art. 51 Abs. 2 GG."],
    ["Die Europakammer besteht aus den deutschen Europaabgeordneten.", "Jedes Land hat in der Europakammer genau eine Stimme.", "Beschlüsse der Europakammer müssen vom Bundestag bestätigt werden."],
    "Was gilt für die Europakammer des Bundesrates?"),

  // ---------------------------------------------------------------- Bundespräsident
  "oer-bp-wahl": M(
    ["Wahl ohne Aussprache durch die Bundesversammlung", "Wählbar ist jeder Deutsche mit Wahlrecht zum Bundestag", "Mindestalter: vollendetes 40. Lebensjahr"],
    ["Direktwahl durch das Volk", "Wahl durch den Bundestag allein", "Mindestalter: vollendetes 35. Lebensjahr"],
    "Wie wird der Bundespräsident gewählt, und wer ist wählbar?"),
  "oer-bp-bundesversammlung": M(
    ["Mitglieder des Bundestages", "Eine gleiche Anzahl von Mitgliedern, die von den Landesparlamenten gewählt werden", "Einberufung durch den Präsidenten des Bundestages", "Zusammentritt spätestens 30 Tage vor Ablauf der Amtszeit"],
    ["Mitglieder des Bundesrates", "Einberufung durch den Bundeskanzler", "Zusammentritt spätestens 30 Tage nach Ablauf der Amtszeit"],
    "Welche Aussagen zur Bundesversammlung (Art. 54 GG) sind richtig?"),
  "oer-bp-wahlgaenge": M(
    ["In den ersten beiden Wahlgängen ist die Mehrheit der Mitglieder der Bundesversammlung erforderlich.", "Im dritten Wahlgang ist gewählt, wer die meisten Stimmen erhält."],
    ["Bereits im ersten Wahlgang genügt die relative Mehrheit.", "In jedem Wahlgang ist eine Zweidrittelmehrheit erforderlich.", "Nach zwei erfolglosen Wahlgängen wählt der Bundestag.", "Im dritten Wahlgang entscheidet das Los."],
    "Welche Mehrheiten gelten bei der Wahl des Bundespräsidenten (Art. 54 Abs. 6 GG)?"),
  "oer-bp-amtszeit": M(
    ["Das Amt dauert fünf Jahre.", "Anschließende Wiederwahl ist nur einmal zulässig."],
    ["Das Amt dauert vier Jahre.", "Das Amt dauert sieben Jahre.", "Wiederwahl ist unbegrenzt möglich.", "Wiederwahl ist ausgeschlossen."],
    "Was gilt für die Amtszeit des Bundespräsidenten?"),
  "oer-bp-inkompatibilitaet": M(
    ["Mitgliedschaft in der Bundesregierung", "Mitgliedschaft im Bundestag oder in einem Landtag", "Ausübung eines Berufs oder Gewerbes", "Mitgliedschaft im Aufsichtsrat eines Erwerbsunternehmens"],
    ["Mitgliedschaft in einer Partei", "Ehrenamtliche Schirmherrschaften", "Mitgliedschaft in einem Sportverein"],
    "Was ist mit dem Amt des Bundespräsidenten unvereinbar (Art. 55 GG)?"),
  "oer-bp-aufgaben": M(
    ["Völkerrechtliche Vertretung des Bundes", "Ernennung und Entlassung der Bundesminister auf Vorschlag des Kanzlers", "Ausfertigung und Verkündung der Bundesgesetze", "Ernennung der Bundesrichter und Bundesbeamten"],
    ["Bestimmung der Richtlinien der Politik", "Wahl der Bundesverfassungsrichter", "Beschluss des Bundeshaushalts"],
    "Welche Aufgaben hat der Bundespräsident?"),
  "oer-gegenzeichnung": M(
    ["Anordnungen und Verfügungen des Bundespräsidenten bedürfen der Gegenzeichnung durch den Kanzler oder zuständigen Minister.", "Durch die Gegenzeichnung übernimmt die Regierung die politische Verantwortung.", "Ernennung und Entlassung des Bundeskanzlers brauchen keine Gegenzeichnung.", "Die Auflösung des Bundestages nach Art. 63 GG braucht keine Gegenzeichnung."],
    ["Die Ausfertigung der Bundesgesetze braucht keine Gegenzeichnung.", "Die Gegenzeichnung erfolgt durch den Bundestagspräsidenten.", "Gegenzeichnung ist nur bei völkerrechtlichen Verträgen erforderlich."],
    "Welche Aussagen zur Gegenzeichnung (Art. 58 GG) sind richtig?"),
  "oer-bp-vertretung": M(
    ["Der Präsident des Bundesrates"],
    ["Der Präsident des Bundestages", "Der Bundeskanzler", "Der Präsident des Bundesverfassungsgerichts", "Der dienstälteste Bundesminister"],
    "Wer nimmt bei Verhinderung des Bundespräsidenten dessen Befugnisse wahr (Art. 57 GG)?"),
  "oer-praesidentenanklage": M(
    ["Anklage vor dem Bundesverfassungsgericht durch Bundestag oder Bundesrat", "Nur wegen vorsätzlicher Verletzung des GG oder eines anderen Bundesgesetzes", "Antrag: mindestens ein Viertel der Mitglieder des Bundestages oder ein Viertel der Stimmen des Bundesrates", "Beschluss: zwei Drittel der Mitglieder des Bundestages oder zwei Drittel der Stimmen des Bundesrates"],
    ["Abwahl durch den Bundestag mit Kanzlermehrheit", "Die Anklage ist auch wegen politischer Fehlentscheidungen möglich.", "Beschluss mit einfacher Mehrheit genügt"],
    "Welche Aussagen zur Präsidentenanklage (Art. 61 GG) sind richtig?"),
  "oer-bp-eid": M(
    ["Der Bundespräsident leistet den Eid bei seinem Amtsantritt.", "Vor den versammelten Mitgliedern des Bundestages und des Bundesrates", "Der Eid kann auch ohne religiöse Beteuerung geleistet werden."],
    ["Vor dem Bundesverfassungsgericht", "Vor der Bundesversammlung unmittelbar nach der Wahl", "Nur mit religiöser Beteuerung"],
    "Wann und vor wem leistet der Bundespräsident seinen Eid (Art. 56 GG)?"),
  "oer-bp-pruefungsrecht": M(
    ["Der Bundespräsident hat ein formelles Prüfungsrecht (ordnungsgemäßes Gesetzgebungsverfahren).", "Nach h. M. ein materielles Prüfungsrecht bei offensichtlichen Verfassungsverstößen"],
    ["Der Bundespräsident darf die Ausfertigung aus politischen Gründen verweigern.", "Der Bundespräsident hat überhaupt kein Prüfungsrecht.", "Der Bundespräsident muss jedes Gesetz vorher dem BVerfG vorlegen.", "Der Bundespräsident kann ein Gesetz mit Änderungen zurück an den Bundestag senden."],
    "Darf der Bundespräsident die Ausfertigung eines Gesetzes verweigern?"),

  // ---------------------------------------------------------------- Bundesregierung
  "oer-br-zusammen": M(
    ["Bundeskanzler", "Bundesminister"],
    ["Bundespräsident", "Parlamentarische Staatssekretäre", "Ministerpräsidenten der Länder", "Präsident des Bundesrates"],
    "Woraus besteht die Bundesregierung (Art. 62 GG)?"),
  "oer-regierungsbildung": M(
    ["Der Bundeskanzler wird auf Vorschlag des Bundespräsidenten vom Bundestag ohne Aussprache gewählt.", "Die Bundesminister werden auf Vorschlag des Kanzlers vom Bundespräsidenten ernannt.", "Kanzler und Minister leisten den Eid vor dem Bundestag."],
    ["Die Bundesminister werden vom Bundestag einzeln gewählt.", "Der Bundesrat muss der Ministerliste zustimmen.", "Der Bundeskanzler wird von der Bundesversammlung gewählt."],
    "Wie wird die Bundesregierung gebildet?"),
  "oer-kanzlerwahl-phasen": M(
    ["1. Phase: Wahl auf Vorschlag des Bundespräsidenten mit Mehrheit der Mitglieder", "2. Phase: Wahl binnen 14 Tagen mit Mehrheit der Mitglieder", "3. Phase: Gewählt ist, wer die meisten Stimmen erhält.", "Ohne Mehrheit der Mitglieder in der 3. Phase: Ernennung oder Auflösung des Bundestages binnen 7 Tagen"],
    ["2. Phase: Wahl binnen 30 Tagen", "3. Phase: Der Bundespräsident ernennt einen Kanzler ohne Wahl.", "1. Phase: Wahl mit der Mehrheit der abgegebenen Stimmen"],
    "Welche Aussagen zu den Phasen der Kanzlerwahl (Art. 63 GG) sind richtig?"),
  "oer-art65": M(
    ["Kanzlerprinzip: Der Kanzler bestimmt die Richtlinien der Politik.", "Ressortprinzip: Jeder Minister leitet seinen Geschäftsbereich selbständig und eigenverantwortlich.", "Kollegialprinzip: Bei Meinungsverschiedenheiten zwischen Ministern entscheidet die Bundesregierung."],
    ["Der Kanzler darf jedem Minister Einzelweisungen in dessen Ressort erteilen.", "Bei Meinungsverschiedenheiten entscheidet der Bundespräsident.", "Die Minister bestimmen gemeinsam die Richtlinien der Politik."],
    "Was beinhalten Kanzler-, Ressort- und Kollegialprinzip (Art. 65 GG)?"),
  "oer-65a": M(
    ["Der Bundesminister der Verteidigung", "Im Verteidigungsfall geht die Befehls- und Kommandogewalt auf den Bundeskanzler über."],
    ["Der Bundespräsident als Oberbefehlshaber", "Der Generalinspekteur der Bundeswehr", "Der Bundestag", "Der Bundeskanzler auch in Friedenszeiten"],
    "Wer hat die Befehls- und Kommandogewalt über die Streitkräfte?"),
  "oer-art66": M(
    ["Kein anderes besoldetes Amt", "Kein Gewerbe und kein Beruf", "Keine Mitgliedschaft in der Leitung eines Erwerbsunternehmens"],
    ["Kein Bundestagsmandat", "Keine Parteimitgliedschaft", "Kein Ehrenamt in einem Verein"],
    "Was dürfen Bundeskanzler und Bundesminister nach Art. 66 GG nicht?"),
  "oer-misstrauensvotum": M(
    ["Nur durch Wahl eines Nachfolgers mit der Mehrheit der Mitglieder (konstruktives Misstrauensvotum)", "Der Bundespräsident muss den Kanzler entlassen und den Gewählten ernennen.", "Zwischen Antrag und Wahl müssen 48 Stunden liegen."],
    ["Durch einfachen Misstrauensbeschluss ohne Nachfolger", "Der Bundespräsident kann nach Ermessen entscheiden.", "Zwischen Antrag und Wahl müssen 14 Tage liegen."],
    "Wie kann der Bundestag den Bundeskanzler stürzen (Art. 67 GG)?"),
  "oer-vertrauensfrage": M(
    ["Der Kanzler beantragt, ihm das Vertrauen auszusprechen.", "Maßgeblich ist die Zustimmung der Mehrheit der Mitglieder.", "Bei Scheitern kann der Bundespräsident auf Vorschlag des Kanzlers binnen 21 Tagen den Bundestag auflösen.", "Das Auflösungsrecht erlischt, wenn der Bundestag mit Mehrheit seiner Mitglieder einen anderen Kanzler wählt."],
    ["Bei Scheitern ist der Bundestag automatisch aufgelöst.", "Bei Scheitern ist der Kanzler automatisch entlassen.", "Der Bundespräsident muss den Bundestag auflösen."],
    "Welche Aussagen zur Vertrauensfrage (Art. 68 GG) sind richtig?"),
  "oer-art69": M(
    ["Mit dem Zusammentritt eines neuen Bundestages", "Das Amt eines Ministers auch mit jeder anderen Erledigung des Amtes des Kanzlers", "Die Wiederwahl des Bundeskanzlers ist nicht begrenzt."],
    ["Nach höchstens zwei Amtszeiten", "Genau vier Jahre nach der Ernennung", "Mit dem Ende der Amtszeit des Bundespräsidenten"],
    "Wann endet die Amtszeit von Bundeskanzler und Bundesministern?"),
  "oer-geschaeftsfuehrend": M(
    ["Auf Ersuchen des Bundespräsidenten muss der Kanzler die Geschäfte bis zur Ernennung eines Nachfolgers weiterführen.", "Bundesminister müssen auf Ersuchen des Kanzlers oder des Bundespräsidenten die Geschäfte bis zur Ernennung eines Nachfolgers weiterführen.", "Das Ersuchen braucht keine Gegenzeichnung."],
    ["Die Geschäfte führt automatisch der Bundestagspräsident.", "Bis zur Neuwahl gibt es keine Regierung.", "Die Weiterführung bedarf der Zustimmung des Bundesrates."],
    "Was gilt nach Ende der Amtszeit bis zur Ernennung eines Nachfolgers (Art. 69 Abs. 3 GG)?"),
  "oer-vizekanzler": M(
    ["Ein Bundesminister, den der Bundeskanzler zu seinem Stellvertreter ernennt"],
    ["Der Präsident des Bundestages", "Der Präsident des Bundesrates", "Ein vom Bundestag gewählter Abgeordneter", "Der Bundespräsident"],
    "Wer ist Stellvertreter des Bundeskanzlers (Art. 69 Abs. 1 GG)?"),
};

/** Wandelt eine Frage-Antwort-Aufgabe in eine Mehrfachauswahl um (Musterantwort bleibt als Erklärung). */
export function alsMultipleChoice(f, r) {
  const d = MC[f.id];
  if (!d || f.typ !== "offen") return f;
  const optionen = [...d.r, ...d.f];
  const richtig = d.r.map((_, i) => i);
  // Klausurfall: Sachverhalt bleibt stehen, nur die Arbeitsanweisung („Aufgabe: …“) wird durch die MC-Frage ersetzt
  const text = f.fall && d.frage ? `${f.text.replace(/\n\nAufgabe:[\s\S]*$/, "")}\n\n${d.frage}` : d.frage || f.text;
  return { ...auswahl(f.id, f.thema, text, optionen, richtig, f.erklaerung, r), normen: f.normen, antwort: f.antwort, zusatzZitate: f.zusatzZitate, fall: f.fall };
}
