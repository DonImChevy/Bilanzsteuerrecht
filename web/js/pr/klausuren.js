// Probeklausuren Privatrecht (GS I) – drei vollständige Klausuren à 120 Minuten / 70 Punkte.
// Aufbau wie die Hauptklausuren: Teil A allgemeine Fragen (ca. 30 Min.), Teil B Sachverhaltsbearbeitung im
// Gutachtenstil (ca. 90 Min.). Eigene Sachverhalte, kein Klausurtext übernommen. Rechtsstand 2026 (BGB nach MoPeG).
// Bewertung: [Punkte, Merkmal, Erwartet] – „Erwartet“ ist der Maßstab für die Selbstkontrolle.

const fest = (id, titel, teil, min, f) => ({ id, titel, min, teil, fest: true, erzeugen: f });

export const VORBEMERKUNGEN_PR = [
  "Nennen Sie, soweit möglich, die Rechtsgrundlagen und begründen Sie Ihre Antworten in ganzen Sätzen.",
  "Teil B ist im Gutachtenstil zu bearbeiten (Obersatz – Definition – Subsumtion – Ergebnis); Unproblematisches kurz, Problematisches ausführlich.",
  "Offenbare Unrichtigkeiten oder fehlende Angaben im Sachverhalt: kurz vermerken, wie Sie den Sachverhalt ergänzt haben. Rechtsstand 2026.",
];

// ===================================================================================== Klausur A
const a1 = fest("pr-a1", "Allgemeine Fragen", 1, 30, () => ({
  sv: "Beantworten Sie die folgenden Fragen so kurz wie möglich und so ausführlich wie nötig in ganzen Sätzen.",
  aufgaben: [
    "Nach welchen Theorien lassen sich Privatrecht und öffentliches Recht abgrenzen? Erläutern Sie zwei davon und nennen Sie je ein Beispiel.",
    "Was verstehen Sie unter Rechtsfähigkeit und unter Geschäftsfähigkeit? Wann beginnen sie bei natürlichen Personen?",
    "Erläutern Sie das Trennungs- und das Abstraktionsprinzip. Wie viele Rechtsgeschäfte liegen vor, wenn jemand ein Fahrrad im Laden kauft, bar bezahlt und mitnimmt?",
    "Was ist eine invitatio ad offerendum? Nennen Sie zwei Beispiele und den entscheidenden Grund, warum dort kein Angebot vorliegt.",
    "Grenzen Sie den Boten vom Stellvertreter ab. Welche Folge hat die Abgrenzung, wenn die handelnde Person minderjährig ist?",
  ],
  loesung: [
    "1. Nach der Subordinationstheorie gehört ein Rechtsverhältnis zum öffentlichen Recht, wenn ein Über- und Unterordnungsverhältnis besteht (z. B. Steuerbescheid des Finanzamts), zum Privatrecht bei Gleichordnung (z. B. Kaufvertrag zwischen Privatleuten). Nach der modifizierten Subjektstheorie (Sonderrechtstheorie) ist eine Norm öffentlich-rechtlich, wenn sie ausschließlich einen Träger hoheitlicher Gewalt berechtigt oder verpflichtet (z. B. Abgabenordnung); Normen, die für jedermann gelten, sind Privatrecht (z. B. § 433 BGB – auch wenn das Finanzamt Büropapier kauft). Weitere Theorie: Interessentheorie (öffentliches oder privates Interesse).",
    "2. Rechtsfähigkeit ist die Fähigkeit, Träger von Rechten und Pflichten zu sein; sie beginnt bei natürlichen Personen mit Vollendung der Geburt (§ 1 BGB). Geschäftsfähigkeit ist die Fähigkeit, Rechtsgeschäfte selbst wirksam vorzunehmen. Das BGB regelt sie negativ: geschäftsunfähig ist, wer das 7. Lebensjahr nicht vollendet hat (§ 104 Nr. 1 BGB); beschränkt geschäftsfähig ist ein Minderjähriger ab 7 Jahren (§ 106 BGB); voll geschäftsfähig wird man mit Volljährigkeit, also mit Vollendung des 18. Lebensjahres (§ 2 BGB).",
    "3. Trennungsprinzip: Das schuldrechtliche Verpflichtungsgeschäft (z. B. Kaufvertrag, § 433 BGB) und das dingliche Verfügungsgeschäft (z. B. Übereignung, § 929 S. 1 BGB) sind getrennte Rechtsgeschäfte. Abstraktionsprinzip: Die Wirksamkeit der Verfügung ist von der Wirksamkeit des Verpflichtungsgeschäfts unabhängig; ist der Kaufvertrag nichtig, bleibt die Übereignung wirksam und wird über §§ 812 ff. BGB rückabgewickelt. Beim Fahrradkauf liegen drei Rechtsgeschäfte vor: Kaufvertrag, Übereignung des Fahrrads, Übereignung des Geldes.",
    "4. Eine invitatio ad offerendum ist eine Aufforderung an andere, ihrerseits ein Angebot abzugeben. Beispiele: Schaufensterauslage, Katalog, Zeitungsinserat, Warenpräsentation im Online-Shop. Es fehlt am Rechtsbindungswillen: Der Anbietende will sich nicht gegenüber einer unbestimmten Vielzahl von Personen binden, weil er sonst bei begrenztem Vorrat mehrfach verpflichtet wäre und Bonität und Vertragspartner nicht prüfen könnte (Auslegung nach §§ 133, 157 BGB).",
    "5. Der Bote übermittelt eine fremde Willenserklärung ohne eigenen Entscheidungsspielraum; der Stellvertreter gibt eine eigene Willenserklärung im Namen des Vertretenen ab (§ 164 Abs. 1 S. 1 BGB). Maßgeblich ist das Auftreten nach außen (objektiver Empfängerhorizont, §§ 133, 157 BGB). Folge: Der Bote braucht keine Geschäftsfähigkeit, auch ein Geschäftsunfähiger kann Bote sein. Ein Vertreter muss mindestens beschränkt geschäftsfähig sein (§ 165 BGB); die Willenserklärung eines Geschäftsunfähigen ist nichtig (§ 105 Abs. 1 BGB).",
  ],
  bewertung: [
    [2, "1. Subordinationstheorie mit Beispiel", "Über-/Unterordnung = öffentliches Recht, Gleichordnung = Privatrecht"],
    [2, "1. Sonderrechts-/Subjektstheorie (oder Interessentheorie) mit Beispiel", "Norm berechtigt/verpflichtet ausschließlich Hoheitsträger"],
    [2, "2. Rechtsfähigkeit definiert, Beginn mit Vollendung der Geburt", "Träger von Rechten und Pflichten; § 1 BGB"],
    [2, "2. Geschäftsfähigkeit definiert, Altersstufen", "§§ 104 Nr. 1, 106, 2 BGB"],
    [2, "3. Trennungs- und Abstraktionsprinzip zutreffend erklärt", "Verpflichtung (§ 433) / Verfügung (§ 929); Rückabwicklung §§ 812 ff. BGB"],
    [2, "3. drei Rechtsgeschäfte benannt", "Kaufvertrag, Übereignung Rad, Übereignung Geld"],
    [2, "4. Definition und zwei Beispiele", "Aufforderung zur Abgabe eines Angebots; Schaufenster, Katalog, Inserat, Online-Shop"],
    [2, "4. Grund: fehlender Rechtsbindungswille", "begrenzter Vorrat, Auswahl/Bonität des Vertragspartners; §§ 133, 157 BGB"],
    [2, "5. Abgrenzung nach eigenem Entscheidungsspielraum und Auftreten nach außen", "§ 164 Abs. 1 S. 1, §§ 133, 157 BGB"],
    [2, "5. Folge bei Minderjährigen", "Bote: keine Geschäftsfähigkeit nötig; Vertreter: § 165 BGB, Geschäftsunfähiger § 105 Abs. 1 BGB"],
  ],
}));

const a2 = fest("pr-a2", "Fall: Die Siebträgermaschine", 2, 60, () => ({
  sv: "Hanna Holm (H) betreibt in Kiel das „Café Holm“. Sie bittet am 02.03.2026 ihren 16-jährigen Neffen Nils (N), der sich für Kaffeetechnik begeistert: „Such mir bitte eine gebrauchte Siebträgermaschine aus und kauf sie in meinem Namen. Welche, entscheidest du – sie darf nur nicht mehr als 1.500 € kosten.“ Die Eltern des N haben nichts dagegen.\n" +
    "Am 04.03.2026 entdeckt N im Online-Portal „Kiel kauft“ eine Anzeige von Viktor Voss (V): „Siebträger Barista Pro, 3 Jahre alt, top gepflegt – 1.600 € VB.“ N schreibt V über die Nachrichtenfunktion: „Ich suche für meine Tante Hanna Holm vom Café Holm eine Maschine. Ich kaufe die Barista Pro für sie für 1.400 €.“ V antwortet zehn Minuten später: „1.400 ist zu wenig. Für 1.450 € gehört sie Ihrer Tante.“ N schreibt sofort zurück: „Einverstanden.“ Am nächsten Tag holt N die Maschine bei V ab und bringt sie ins Café.\n" +
    "H ist verärgert: Sie hätte lieber eine Maschine einer anderen Marke gehabt. Außerdem sei N erst 16 und habe deshalb gar nichts für sie kaufen können. Sie will nicht zahlen.",
  aufgaben: ["Prüfen Sie gutachterlich, ob V von H Zahlung von 1.450 € verlangen kann."],
  loesung: [
    "Obersatz: V könnte gegen H einen Anspruch auf Zahlung von 1.450 € aus § 433 Abs. 2 BGB haben. Dann müsste zwischen V und H ein wirksamer Kaufvertrag zustande gekommen sein; dieser setzt zwei übereinstimmende Willenserklärungen, Angebot und Annahme, voraus (§§ 145 ff. BGB). Der Anspruch dürfte zudem nicht erloschen und müsste durchsetzbar sein.",
    "I. Anspruch entstanden",
    "1. Angebot durch die Anzeige des V? Ein Angebot ist eine einseitige, empfangsbedürftige Willenserklärung, die alle wesentlichen Vertragsbestandteile enthält, sodass der Vertrag durch ein bloßes „Ja“ zustande kommen kann, und die mit Rechtsbindungswillen abgegeben wird. Die Anzeige richtet sich an eine unbestimmte Vielzahl von Personen; V hat nur eine Maschine und will sich seinen Vertragspartner aussuchen. Mit „VB“ zeigt er zudem, dass der Preis noch verhandelt werden soll. Aus Sicht eines objektiven Empfängers (§§ 133, 157 BGB) fehlt der Rechtsbindungswille – es liegt nur eine invitatio ad offerendum vor, kein Angebot.",
    "2. Angebot durch die Nachricht des N über 1.400 €? H selbst hat keine Erklärung abgegeben. Die Erklärung des N wirkt aber für und gegen H, wenn N sie wirksam vertreten hat (§ 164 Abs. 1 S. 1 BGB): Zulässigkeit der Stellvertretung, eigene Willenserklärung des Vertreters, Handeln im fremden Namen, Vertretungsmacht.",
    "a) Zulässigkeit: Der Kaufvertrag ist kein höchstpersönliches Rechtsgeschäft; Stellvertretung ist zulässig.",
    "b) Eigene Willenserklärung: Abzugrenzen ist vom Boten, der nur eine fremde Erklärung übermittelt. H hat N die Auswahl der Maschine und den Preis bis 1.500 € überlassen; N sucht selbst aus und verhandelt. Er hat einen eigenen Entscheidungsspielraum und tritt nach außen so auf (§§ 133, 157 BGB) – N ist Stellvertreter, nicht Bote.",
    "Problematisch ist, dass N mit 16 Jahren beschränkt geschäftsfähig ist (§§ 2, 106 BGB). Die §§ 104 ff. BGB schützen Minderjährige davor, durch eigene Rechtsgeschäfte rechtlich belastet zu werden. Als Vertreter wird N aber selbst nicht verpflichtet; die Rechtsfolgen treffen allein H. Dieser Gedanke ist in § 165 BGB normiert: Die Wirksamkeit der von einem Vertreter abgegebenen Willenserklärung wird nicht dadurch beeinträchtigt, dass er in der Geschäftsfähigkeit beschränkt ist. Auf eine Zustimmung der Eltern kommt es nicht an. Die Einwände der H wegen des Alters gehen daher fehl.",
    "c) Im fremden Namen: N schreibt ausdrücklich, er kaufe „für meine Tante Hanna Holm vom Café Holm“. Er handelt erkennbar im Namen der H (§ 164 Abs. 1 S. 1, 2 BGB).",
    "d) Vertretungsmacht: In Betracht kommt eine Vollmacht, also eine durch Rechtsgeschäft erteilte Vertretungsmacht (§ 166 Abs. 2 S. 1 BGB). H hat sie am 02.03.2026 durch Erklärung gegenüber N erteilt (Innenvollmacht, § 167 Abs. 1 Alt. 1 BGB). Sie umfasst den Kauf einer gebrauchten Siebträgermaschine bis 1.500 €; 1.400 € liegen innerhalb dieses Rahmens.",
    "e) Ergebnis: N hat H wirksam vertreten. Ein Angebot der H über 1.400 € liegt vor.",
    "3. Annahme durch V? Eine Annahme ist die vorbehaltlose Zustimmung zum Angebot. V verlangt 1.450 € statt 1.400 €. Eine Annahme unter Änderungen gilt als Ablehnung verbunden mit einem neuen Antrag (§ 150 Abs. 2 BGB). Das Angebot der H über 1.400 € ist damit erloschen (§ 146 BGB); V hat ein neues Angebot über 1.450 € abgegeben. Es ist an H gerichtet („gehört sie Ihrer Tante“) und ging N als ihrem Vertreter zu (passive Stellvertretung, § 164 Abs. 3 BGB).",
    "4. Annahme dieses Angebots durch N („Einverstanden“): N gibt erneut eine eigene Willenserklärung im Namen der H ab; die Voraussetzungen der Stellvertretung liegen wie oben vor (§ 165 BGB). 1.450 € liegen innerhalb der Vollmacht bis 1.500 €. Die Annahme erfolgt sofort und damit rechtzeitig (§ 147 BGB). Sie wirkt für und gegen H.",
    "5. Zwischenergebnis: Zwischen V und H ist ein Kaufvertrag über die Maschine zum Preis von 1.450 € zustande gekommen. Der Anspruch ist entstanden.",
    "II. Anspruch nicht erloschen: H hat nicht gezahlt (§ 362 Abs. 1 BGB). Eine Anfechtung hat sie nicht erklärt; ihr Wunsch nach einer anderen Marke wäre zudem ein unbeachtlicher Motivirrtum, und für Willensmängel käme es nach § 166 Abs. 1 BGB ohnehin auf die Person des N an, der sich nicht geirrt hat.",
    "III. Anspruch durchsetzbar: Einreden sind nicht ersichtlich; V hat die Maschine bereits übergeben, sodass auch § 320 BGB nicht greift.",
    "Ergebnis: V kann von H Zahlung von 1.450 € aus § 433 Abs. 2 BGB verlangen.",
  ],
  bewertung: [
    [2, "Obersatz: Anspruch V gegen H auf 1.450 € aus § 433 Abs. 2 BGB; entstanden, nicht erloschen, durchsetzbar", "Anspruchsteller, -gegner, Ziel und Grundlage genannt"],
    [1.5, "Kaufvertrag = zwei übereinstimmende Willenserklärungen", "§§ 145 ff. BGB"],
    [2.5, "Definition Angebot mit Rechtsbindungswillen", "einseitig empfangsbedürftig, essentialia negotii, „Ja“ genügt"],
    [3, "Anzeige = invitatio ad offerendum (begründet)", "unbestimmter Personenkreis, nur eine Maschine, „VB“; §§ 133, 157 BGB"],
    [1.5, "Keine eigene Erklärung der H; Prüfung § 164 Abs. 1 BGB mit vier Voraussetzungen", "Zulässigkeit, eigene WE, fremder Name, Vertretungsmacht"],
    [3, "Abgrenzung Bote/Vertreter: Entscheidungsspielraum → Vertreter", "freie Auswahl, Preisrahmen, eigenes Verhandeln"],
    [4, "Minderjährigkeit: Schutzzweck §§ 104 ff. BGB, N wird nicht gebunden, § 165 BGB", "beschränkt geschäftsfähig §§ 2, 106 BGB; Elternzustimmung unerheblich"],
    [1.5, "Handeln im fremden Namen", "„für meine Tante Hanna Holm“ – § 164 Abs. 1 BGB"],
    [3, "Vollmacht: Definition, Innenvollmacht, Umfang bis 1.500 €", "§ 166 Abs. 2 S. 1, § 167 Abs. 1 Alt. 1 BGB"],
    [3, "Antwort des V = Ablehnung und neues Angebot über 1.450 €", "§ 150 Abs. 2 BGB (ggf. § 146 BGB); Zugang an N, § 164 Abs. 3 BGB"],
    [2.5, "„Einverstanden“ = Annahme durch N im Namen der H, innerhalb der Vollmacht", "Stellvertretung wie oben; 1.450 € ≤ 1.500 €"],
    [1.5, "Ergebnis: Kaufvertrag über 1.450 €", "Zwischenergebnis klar formuliert"],
    [2, "Nicht erloschen: keine Erfüllung, Markenwunsch unbeachtlich", "§ 362 Abs. 1 BGB; Motivirrtum; ggf. § 166 Abs. 1 BGB"],
    [1, "Durchsetzbar, Endergebnis", "keine Einreden (§ 320 BGB entfällt); Anspruch (+)"],
  ],
}));

const a3 = fest("pr-a3", "Fall: Das Fahrrad vom Großvater", 2, 30, () => ({
  sv: "Großvater Otto (O) übergibt am 10.05.2026 seiner Enkelin Emma (E) zu ihrem 8. Geburtstag sein altes Damenrad und sagt: „Das gehört jetzt dir.“ E strahlt und schiebt das Rad in die Garage ihrer Eltern. Die Eltern sind dagegen, weil das Rad noch zu groß sei, und erklären O, sie seien mit dem Geschenk nicht einverstanden.",
  aufgaben: ["Wer ist Eigentümer des Fahrrads? Prüfen Sie gutachterlich.", "Ändert sich das Ergebnis, wenn E erst 6 Jahre alt ist? (kurze Begründung genügt)"],
  loesung: [
    "Obersatz: E könnte das Eigentum am Fahrrad durch Übereignung von O nach § 929 S. 1 BGB erworben haben. Erforderlich sind eine Einigung über den Eigentumsübergang, die Übergabe der Sache und die Berechtigung des O.",
    "1. Einigung: Die Einigung ist ein dinglicher Vertrag aus zwei übereinstimmenden Willenserklärungen. O hat mit den Worten „Das gehört jetzt dir“ ein Angebot zur Übereignung abgegeben. Da E beschränkt geschäftsfähig ist (§§ 2, 106 BGB), wird es ihr gegenüber mit Zugang wirksam, wenn es ihr lediglich einen rechtlichen Vorteil bringt (§ 131 Abs. 2 S. 2 BGB).",
    "E hat das Angebot angenommen, indem sie das Rad annimmt und in die Garage schiebt (konkludent). Für ihre Willenserklärung braucht sie nach § 107 BGB die Einwilligung der Eltern nur, wenn sie nicht lediglich einen rechtlichen Vorteil erlangt. Durch den Eigentumserwerb erhält E ein Recht, ohne rechtliche Pflichten einzugehen; wirtschaftliche Nachteile (etwa Reparaturkosten) sind unerheblich. Die Übereignung ist lediglich rechtlich vorteilhaft – E kann sie ohne Zustimmung der Eltern wirksam annehmen. Der Widerspruch der Eltern ist unbeachtlich. Eine Einigung liegt vor.",
    "2. Übergabe: O hat E den unmittelbaren Besitz verschafft (§ 854 Abs. 1 BGB) und seinen eigenen Besitz vollständig aufgegeben.",
    "3. Berechtigung: O war Eigentümer und damit zur Verfügung berechtigt.",
    "Ergebnis: E ist Eigentümerin des Fahrrads.",
    "Abwandlung: Mit 6 Jahren ist E geschäftsunfähig (§ 104 Nr. 1 BGB). Ihre Annahmeerklärung ist nichtig (§ 105 Abs. 1 BGB); das Angebot des O wird ihr gegenüber erst mit Zugang bei den Eltern als gesetzlichen Vertretern wirksam (§ 131 Abs. 1 BGB). Da die Eltern ablehnen, fehlt die Einigung – O bleibt Eigentümer. (Nur die Eltern könnten für E annehmen, § 1629 Abs. 1 S. 1 BGB.)",
  ],
  bewertung: [
    [1.5, "Obersatz § 929 S. 1 BGB mit Einigung, Übergabe, Berechtigung", "Prüfungsschema genannt"],
    [1.5, "Einigung = dinglicher Vertrag; Angebot des O", "„Das gehört jetzt dir“"],
    [1.5, "Zugang bei Minderjähriger: lediglich rechtlicher Vorteil", "§ 131 Abs. 2 S. 2 BGB"],
    [1.5, "Annahme durch E (konkludent); beschränkt geschäftsfähig", "§§ 2, 106 BGB"],
    [3.5, "§ 107 BGB: Eigentumserwerb lediglich rechtlich vorteilhaft; wirtschaftliche Nachteile unerheblich", "keine Einwilligung nötig, Widerspruch der Eltern unbeachtlich"],
    [1.5, "Übergabe und Berechtigung", "Besitzverschaffung § 854 Abs. 1 BGB; O Eigentümer"],
    [1, "Ergebnis: E Eigentümerin", "klar formuliert"],
    [2.5, "Abwandlung: geschäftsunfähig, WE nichtig", "§ 104 Nr. 1, § 105 Abs. 1 BGB"],
    [2, "Abwandlung: Zugang erst bei den Eltern; keine Einigung, O bleibt Eigentümer", "§ 131 Abs. 1 BGB; ggf. § 1629 Abs. 1 BGB"],
    [1.5, "Gutachtenstil eingehalten", "Obersatz – Definition – Subsumtion – Ergebnis"],
  ],
}));

// ===================================================================================== Klausur B
const b1 = fest("pr-b1", "Allgemeine Fragen", 1, 30, () => ({
  sv: "Beantworten Sie die folgenden Fragen so kurz wie möglich und so ausführlich wie nötig in ganzen Sätzen.",
  aufgaben: [
    "Nennen und definieren Sie die Bestandteile einer Willenserklärung.",
    "Wann geht eine Willenserklärung unter Abwesenden zu? Wann ist eine E-Mail zugegangen, die um 23:45 Uhr in das Postfach eines Unternehmens gelangt?",
    "Was ist unter Privatautonomie zu verstehen? Nennen Sie drei Erscheinungsformen und zwei gesetzliche Grenzen.",
    "Wer ist Kaufmann nach § 1 HGB? Wie wird Prokura erteilt?",
    "Wie lange beträgt die regelmäßige Verjährungsfrist, wann beginnt sie und welche Wirkung hat der Eintritt der Verjährung?",
  ],
  loesung: [
    "1. Objektiver Tatbestand: ein nach außen erkennbares Verhalten, das auf einen bestimmten Rechtsfolgewillen schließen lässt (ausdrücklich oder konkludent). Subjektiver Tatbestand: Handlungswille (Bewusstsein, überhaupt zu handeln), Erklärungsbewusstsein (Bewusstsein, etwas rechtlich Erhebliches zu erklären) und Geschäftswille (Wille, ein bestimmtes Rechtsgeschäft abzuschließen).",
    "2. Eine Willenserklärung unter Abwesenden wird mit Zugang wirksam (§ 130 Abs. 1 S. 1 BGB). Zugegangen ist sie, wenn sie so in den Machtbereich des Empfängers gelangt ist, dass unter gewöhnlichen Umständen mit seiner Kenntnisnahme zu rechnen ist. Eine E-Mail, die um 23:45 Uhr im Postfach eines Unternehmens eingeht, geht erst am nächsten Geschäftstag zu Beginn der üblichen Geschäftszeit zu.",
    "3. Privatautonomie ist die Freiheit des Einzelnen, seine Rechtsverhältnisse nach eigenem Willen zu gestalten. Erscheinungsformen: Abschlussfreiheit (ob und mit wem), Inhaltsfreiheit (was), Formfreiheit (wie), ferner Eigentums- und Testierfreiheit. Grenzen: gesetzliche Verbote (§ 134 BGB), Sittenwidrigkeit (§ 138 BGB), Formvorschriften (§ 125 BGB, z. B. § 311b Abs. 1 BGB für Grundstückskaufverträge).",
    "4. Kaufmann ist, wer ein Handelsgewerbe betreibt (§ 1 Abs. 1 HGB). Handelsgewerbe ist jeder Gewerbebetrieb, es sei denn, das Unternehmen erfordert nach Art oder Umfang keinen in kaufmännischer Weise eingerichteten Geschäftsbetrieb (§ 1 Abs. 2 HGB). Prokura kann nur der Inhaber des Handelsgeschäfts oder sein gesetzlicher Vertreter und nur mittels ausdrücklicher Erklärung erteilen (§ 48 Abs. 1 HGB).",
    "5. Die regelmäßige Verjährungsfrist beträgt drei Jahre (§ 195 BGB). Sie beginnt mit dem Schluss des Jahres, in dem der Anspruch entstanden ist und der Gläubiger von den anspruchsbegründenden Umständen und der Person des Schuldners Kenntnis erlangt oder ohne grobe Fahrlässigkeit erlangen müsste (§ 199 Abs. 1 BGB). Nach Eintritt der Verjährung ist der Schuldner berechtigt, die Leistung zu verweigern (§ 214 Abs. 1 BGB) – eine Einrede, die er erheben muss; der Anspruch erlischt nicht.",
  ],
  bewertung: [
    [1.5, "1. objektiver Tatbestand", "nach außen erkennbares Verhalten, ausdrücklich oder konkludent"],
    [3, "1. Handlungswille, Erklärungsbewusstsein, Geschäftswille jeweils definiert", "je 1 Punkt"],
    [2, "2. Zugang definiert", "Machtbereich + Möglichkeit der Kenntnisnahme unter gewöhnlichen Umständen; § 130 Abs. 1 S. 1 BGB"],
    [2, "2. E-Mail 23:45 Uhr → Zugang am nächsten Geschäftstag", "keine Kenntnisnahme zur Nachtzeit zu erwarten"],
    [1.5, "3. Begriff Privatautonomie", "Selbstgestaltung der Rechtsverhältnisse"],
    [1.5, "3. drei Erscheinungsformen", "Abschluss-, Inhalts-, Formfreiheit (auch Eigentums-, Testierfreiheit)"],
    [1.5, "3. zwei Grenzen mit Norm", "§ 134, § 138, § 125 BGB"],
    [1.5, "4. Kaufmann nach § 1 HGB", "Handelsgewerbe; kaufmännisch eingerichteter Geschäftsbetrieb erforderlich"],
    [1.5, "4. Erteilung der Prokura", "§ 48 Abs. 1 HGB: Inhaber, ausdrücklich"],
    [1, "5. drei Jahre", "§ 195 BGB"],
    [1.5, "5. Beginn: Jahresende + Entstehung + Kenntnis", "§ 199 Abs. 1 BGB"],
    [1.5, "5. Wirkung: Leistungsverweigerungsrecht (Einrede)", "§ 214 Abs. 1 BGB; Anspruch erlischt nicht"],
  ],
}));

const b2 = fest("pr-b2", "Fall: Das vertippte Angebot", 2, 55, () => ({
  sv: "Vera Vogt (V) betreibt in Rostock ein Elektronikgeschäft. Am 03.03.2026 fragt Karl Kahn (K) per E-Mail, zu welchem Preis sie ihm ein bestimmtes Notebook verkaufen würde. V antwortet noch am selben Tag: „Gern biete ich Ihnen das Notebook zum Preis von 899 € an. Abholung im Laden.“ Tatsächlich wollte sie 989 € schreiben und hat sich vertippt; der Listenpreis des Notebooks liegt bei 1.049 €, im Internet wird es für 899 € bis 1.099 € angeboten. K schreibt am 04.03.2026 um 09:10 Uhr zurück: „Ich nehme Ihr Angebot an.“\n" +
    "Am 05.03.2026 bemerkt V beim Durchsehen ihrer E-Mails den Tippfehler und ruft K sofort an: „Ich fechte meinen Verkauf zu 899 € an – das war ein Tippfehler, ich wollte 989 € schreiben.“ K besteht auf dem Notebook zu 899 €. Er hatte bereits am 04.03.2026 für die Fahrt nach Rostock eine Bahnfahrkarte für 24 € gekauft, die er nicht mehr erstattet bekommt.",
  aufgaben: ["Kann K von V Übergabe und Übereignung des Notebooks gegen Zahlung von 899 € verlangen? Prüfen Sie gutachterlich.", "Kann K von V die 24 € für die Fahrkarte ersetzt verlangen? (kurze Begründung genügt)"],
  loesung: [
    "Obersatz: K könnte gegen V einen Anspruch auf Übergabe und Übereignung des Notebooks aus § 433 Abs. 1 S. 1 BGB haben. Voraussetzung ist ein wirksamer Kaufvertrag; der Anspruch dürfte nicht erloschen sein.",
    "I. Anspruch entstanden",
    "1. Angebot der V: Die E-Mail der V ist an K persönlich gerichtet, nennt Kaufsache und Preis und beantwortet eine konkrete Anfrage. Anders als bei einer Werbung an die Allgemeinheit ist ein Rechtsbindungswille erkennbar – ein Angebot (§ 145 BGB). Maßgeblich ist der objektive Empfängerhorizont (§§ 133, 157 BGB): K durfte 899 € als gewollten Preis verstehen, da dieser Preis im Marktrahmen lag. Das Angebot ist mit Eingang im Postfach des K zugegangen (§ 130 Abs. 1 S. 1 BGB).",
    "2. Annahme des K: K hat vorbehaltlos zugestimmt. Die Annahme unter Abwesenden am Folgetag erfolgte innerhalb der Frist des § 147 Abs. 2 BGB und ist V zugegangen.",
    "3. Zwischenergebnis: Ein Kaufvertrag über das Notebook zu 899 € ist zustande gekommen.",
    "II. Anspruch erloschen durch Anfechtung? Ein angefochtenes Rechtsgeschäft ist als von Anfang an nichtig anzusehen (§ 142 Abs. 1 BGB). Voraussetzungen: Anfechtungserklärung, Anfechtungsgrund, Anfechtungsfrist.",
    "1. Anfechtungserklärung: Die Anfechtung erfolgt durch Erklärung gegenüber dem Anfechtungsgegner (§ 143 Abs. 1 BGB); das ist beim Vertrag der andere Teil (§ 143 Abs. 2 BGB), hier K. V hat am Telefon unmissverständlich erklärt, an ihrer Erklärung nicht festhalten zu wollen.",
    "2. Anfechtungsgrund: In Betracht kommt ein Erklärungsirrtum (§ 119 Abs. 1 Alt. 2 BGB). Er liegt vor, wenn der Erklärende eine Erklärung dieses Inhalts überhaupt nicht abgeben wollte, etwa beim Verschreiben oder Vertippen. V wollte 989 € schreiben und hat sich vertippt – das äußere Erklärungszeichen weicht vom Willen ab. (Abzugrenzen ist der Inhaltsirrtum, § 119 Abs. 1 Alt. 1 BGB, bei dem der Erklärende das Gewollte erklärt, sich aber über dessen Bedeutung irrt.)",
    "Kausalität: Bei Kenntnis der Sachlage und verständiger Würdigung des Falles hätte V die Erklärung zu 899 € nicht abgegeben (§ 119 Abs. 1 a. E. BGB).",
    "3. Anfechtungsfrist: Die Anfechtung muss ohne schuldhaftes Zögern (unverzüglich) erfolgen, nachdem V vom Anfechtungsgrund Kenntnis erlangt hat (§ 121 Abs. 1 S. 1 BGB). V hat den Fehler am 05.03.2026 bemerkt und K sofort angerufen – rechtzeitig.",
    "4. Rechtsfolge: Die Willenserklärung der V und damit der Kaufvertrag sind von Anfang an nichtig (§ 142 Abs. 1 BGB).",
    "III. Ergebnis: Der Anspruch des K ist erloschen. K kann von V weder Übergabe und Übereignung noch den Vertrag zu 989 € verlangen.",
    "Zusatzfrage: K hat gegen V einen Anspruch auf Ersatz des Vertrauensschadens aus § 122 Abs. 1 BGB, weil V wegen eines Irrtums nach § 119 BGB angefochten hat. Zu ersetzen ist der Schaden, den K erleidet, weil er auf die Gültigkeit der Erklärung vertraut hat – hier die nutzlos gekaufte Fahrkarte für 24 € (nicht über das Erfüllungsinteresse hinaus). Ausgeschlossen wäre der Anspruch nur, wenn K den Irrtum kannte oder kennen musste (§ 122 Abs. 2 BGB); bei einem marktüblichen Preis von 899 € musste K keinen Fehler erkennen. K kann 24 € verlangen.",
  ],
  bewertung: [
    [2, "Obersatz: Anspruch K gegen V aus § 433 Abs. 1 S. 1 BGB", "Übergabe und Übereignung; entstanden, nicht erloschen"],
    [3, "Angebot der V: individuelle Antwort mit Rechtsbindungswillen (keine invitatio)", "§ 145 BGB; konkrete Anfrage, bestimmter Empfänger"],
    [2, "Auslegung objektiver Empfängerhorizont; Zugang", "§§ 133, 157; § 130 Abs. 1 S. 1 BGB – Erklärung lautet auf 899 €"],
    [1.5, "Annahme rechtzeitig", "§ 147 Abs. 2 BGB"],
    [1, "Kaufvertrag zu 899 € zustande gekommen", "Zwischenergebnis"],
    [1.5, "Anfechtung als rechtsvernichtende Einwendung; Rechtsfolge § 142 Abs. 1 BGB", "Prüfung Erklärung – Grund – Frist"],
    [2, "Anfechtungserklärung gegenüber K", "§ 143 Abs. 1, 2 BGB"],
    [4, "Erklärungsirrtum (Vertippen) definiert und subsumiert", "§ 119 Abs. 1 Alt. 2 BGB; Abgrenzung Inhaltsirrtum (Alt. 1)"],
    [1.5, "Kausalität des Irrtums", "§ 119 Abs. 1 a. E. BGB"],
    [3, "Frist: unverzüglich nach Kenntnis – rechtzeitig", "§ 121 Abs. 1 S. 1 BGB"],
    [2, "Ergebnis: Vertrag nichtig, Anspruch K (-)", "auch kein Vertrag zu 989 €"],
    [3, "Zusatz: Vertrauensschaden 24 €", "§ 122 Abs. 1 BGB; Grenze Erfüllungsinteresse"],
    [2, "Zusatz: kein Ausschluss nach § 122 Abs. 2 BGB", "Irrtum für K nicht erkennbar (899 € im Marktrahmen)"],
    [1.5, "Gutachtenstil und Aufbau", "Obersatz – Definition – Subsumtion – Ergebnis"],
  ],
}));

const b3 = fest("pr-b3", "Fall: Taschengeld und Ratenkauf", 2, 35, () => ({
  sv: "Paul Pohl (P) ist 15 Jahre alt. Seine Eltern haben ihm erlaubt, mit seinem Taschengeld nach eigenem Belieben umzugehen.\n" +
    "a) Am 06.06.2026 kauft P beim Gebrauchtwarenhändler Hugo Hahn (H) eine gebrauchte Spielkonsole für 180 € und zahlt sofort bar mit angespartem Taschengeld. Als die Eltern davon erfahren, sind sie empört und erklären H, sie seien mit dem Kauf nicht einverstanden.\n" +
    "b) Am 10.06.2026 kauft P bei H außerdem einen Fernseher für 600 €. Er zahlt 100 € aus seinem Taschengeld an; der Rest soll in fünf Monatsraten zu je 100 € gezahlt werden. H übergibt den Fernseher. Am 15.06.2026 fordert H die Eltern schriftlich auf, sich zu erklären, ob sie den Kauf genehmigen. Die Eltern reagieren nicht.",
  aufgaben: ["Prüfen Sie gutachterlich, ob die Kaufverträge a) und b) wirksam sind (Stand 15.07.2026)."],
  loesung: [
    "a) Obersatz: Der Kaufvertrag über die Konsole ist wirksam, wenn die Willenserklärung des P wirksam ist. P ist mit 15 Jahren beschränkt geschäftsfähig (§§ 2, 106 BGB). Er bedarf der Einwilligung seiner Eltern, wenn er durch seine Erklärung nicht lediglich einen rechtlichen Vorteil erlangt (§ 107 BGB). Der Kaufvertrag verpflichtet P zur Zahlung des Kaufpreises (§ 433 Abs. 2 BGB) und ist daher rechtlich nachteilig. Eine ausdrückliche Einwilligung zu diesem Kauf liegt nicht vor.",
    "Der Vertrag gilt jedoch als von Anfang an wirksam, wenn P die vertragsmäßige Leistung mit Mitteln bewirkt hat, die ihm zu diesem Zweck oder zur freien Verfügung von den Eltern überlassen wurden (§ 110 BGB). P hat den Kaufpreis vollständig und sofort mit Taschengeld bezahlt, über das er frei verfügen durfte. Die Voraussetzungen liegen vor; der spätere Widerspruch der Eltern ändert daran nichts. Ergebnis: Der Kaufvertrag a) ist wirksam.",
    "b) Auch der Kauf des Fernsehers ist rechtlich nachteilig (§ 107 BGB) und nicht von einer Einwilligung gedeckt. § 110 BGB setzt voraus, dass die vertragsmäßige Leistung vollständig bewirkt ist; bei Ratenzahlung ist das erst mit der letzten Rate der Fall. P hat nur 100 € von 600 € gezahlt – § 110 BGB greift nicht.",
    "Der Vertrag ist daher schwebend unwirksam; seine Wirksamkeit hängt von der Genehmigung der Eltern ab (§ 108 Abs. 1 BGB). H hat die Eltern am 15.06.2026 zur Erklärung aufgefordert. Die Genehmigung kann dann nur bis zum Ablauf von zwei Wochen nach Empfang der Aufforderung erklärt werden; wird sie nicht erklärt, gilt sie als verweigert (§ 108 Abs. 2 S. 2 BGB). Die Eltern haben geschwiegen – die Genehmigung gilt als verweigert.",
    "Ergebnis: Der Kaufvertrag b) ist endgültig unwirksam. Die bereits ausgetauschten Leistungen (Fernseher, 100 €) sind nach §§ 812 ff. BGB zurückzugewähren (Hinweis).",
  ],
  bewertung: [
    [2, "a) beschränkte Geschäftsfähigkeit", "§§ 2, 106 BGB"],
    [2.5, "a) Kaufvertrag rechtlich nachteilig → Einwilligung nötig", "§ 107 BGB; Zahlungspflicht aus § 433 Abs. 2 BGB"],
    [4, "a) § 110 BGB: Leistung vollständig mit Taschengeld bewirkt → wirksam", "Mittel zur freien Verfügung, sofortige Vollzahlung"],
    [1.5, "a) späterer Widerspruch unerheblich; Ergebnis", "Vertrag von Anfang an wirksam"],
    [3, "b) § 110 BGB greift nicht: Leistung nicht vollständig bewirkt (Raten)", "nur 100 € von 600 € gezahlt"],
    [2, "b) schwebende Unwirksamkeit", "§ 108 Abs. 1 BGB"],
    [3, "b) Aufforderung, Zwei-Wochen-Frist, Schweigen = Verweigerung", "§ 108 Abs. 2 S. 1, 2 BGB"],
    [1, "b) Ergebnis: endgültig unwirksam; Rückabwicklung", "§§ 812 ff. BGB (Hinweis)"],
    [1, "Gutachtenstil", "Obersatz – Subsumtion – Ergebnis"],
  ],
}));

// ===================================================================================== Klausur C
const c1 = fest("pr-c1", "Allgemeine Fragen", 1, 30, () => ({
  sv: "Beantworten Sie die folgenden Fragen so kurz wie möglich und so ausführlich wie nötig in ganzen Sätzen.",
  aufgaben: [
    "Grenzen Sie Besitz und Eigentum ab und nennen Sie ein Beispiel, in dem beides auseinanderfällt.",
    "Was sind wesentliche Bestandteile, was ist Zubehör? Welche Bedeutung hat die Unterscheidung?",
    "Kann eine Gesellschaft bürgerlichen Rechts (GbR) Eigentümerin eines Grundstücks sein? Wer haftet für ihre Verbindlichkeiten?",
    "Was ist ein Anspruch? In welcher Reihenfolge prüfen Sie mehrere Anspruchsgrundlagen?",
    "Unterscheiden Sie rechtshindernde, rechtsvernichtende und rechtshemmende Einwendungen und nennen Sie je ein Beispiel.",
  ],
  loesung: [
    "1. Besitz ist die tatsächliche Sachherrschaft (§ 854 Abs. 1 BGB), Eigentum die rechtliche Herrschaft: Der Eigentümer kann mit der Sache nach Belieben verfahren und andere von jeder Einwirkung ausschließen (§ 903 S. 1 BGB). Beispiel: Der Mieter einer Wohnung ist Besitzer, der Vermieter Eigentümer.",
    "2. Wesentliche Bestandteile sind Bestandteile, die nicht voneinander getrennt werden können, ohne dass der eine oder der andere zerstört oder in seinem Wesen verändert wird; sie können nicht Gegenstand besonderer Rechte sein (§ 93 BGB). Zu den wesentlichen Bestandteilen eines Grundstücks gehören die mit dem Grund und Boden fest verbundenen Sachen, insbesondere Gebäude (§ 94 Abs. 1 BGB). Zubehör sind bewegliche Sachen, die, ohne Bestandteile der Hauptsache zu sein, deren wirtschaftlichem Zweck zu dienen bestimmt sind und in einem entsprechenden räumlichen Verhältnis zu ihr stehen (§ 97 Abs. 1 S. 1 BGB). Bedeutung: Wesentliche Bestandteile teilen zwingend das rechtliche Schicksal der Hauptsache; Zubehör bleibt eigenständige Sache, wird im Zweifel aber mitverkauft (§ 311c BGB).",
    "3. Ja. Die GbR kann selbst Rechte erwerben und Verbindlichkeiten eingehen, wenn sie nach dem gemeinsamen Willen der Gesellschafter am Rechtsverkehr teilnehmen soll (rechtsfähige Gesellschaft, § 705 Abs. 2 BGB). Für ihre Verbindlichkeiten haften die Gesellschafter den Gläubigern als Gesamtschuldner persönlich (§ 721 S. 1 BGB).",
    "4. Ein Anspruch ist das Recht, von einem anderen ein Tun oder Unterlassen zu verlangen (§ 194 Abs. 1 BGB). Die Anspruchsgrundlage ist die Norm, aus der sich der Anspruch ergibt; sie besteht aus Tatbestand und Rechtsfolge. Prüfungsreihenfolge: vertragliche, vertragsähnliche, dingliche, deliktische und bereicherungsrechtliche Ansprüche.",
    "5. Rechtshindernde Einwendungen verhindern, dass ein Anspruch entsteht (z. B. Geschäftsunfähigkeit, § 105 Abs. 1 BGB; Formnichtigkeit, § 125 BGB). Rechtsvernichtende Einwendungen lassen einen entstandenen Anspruch erlöschen (z. B. Erfüllung, § 362 Abs. 1 BGB; Anfechtung, § 142 Abs. 1 BGB). Rechtshemmende Einwendungen (Einreden) hindern nur die Durchsetzung und wirken nur, wenn sich der Schuldner auf sie beruft (z. B. Verjährung, § 214 Abs. 1 BGB).",
  ],
  bewertung: [
    [2, "1. Besitz (tatsächlich) und Eigentum (rechtlich) mit Normen", "§ 854 Abs. 1, § 903 S. 1 BGB"],
    [2, "1. Beispiel Auseinanderfallen", "Mieter, Entleiher, Dieb"],
    [2, "2. wesentliche Bestandteile mit Folge", "§ 93, § 94 BGB – keine Sonderrechte"],
    [2, "2. Zubehör definiert", "§ 97 Abs. 1 S. 1 BGB; bleibt eigene Sache"],
    [2, "3. rechtsfähige GbR kann Eigentümerin sein", "§ 705 Abs. 2 BGB (MoPeG)"],
    [2, "3. persönliche Haftung der Gesellschafter als Gesamtschuldner", "§ 721 S. 1 BGB"],
    [2, "4. Anspruch definiert, Anspruchsgrundlage mit Tatbestand/Rechtsfolge", "§ 194 Abs. 1 BGB"],
    [2, "4. Prüfungsreihenfolge", "Vertrag – vertragsähnlich – dinglich – Delikt – Bereicherung"],
    [2, "5. drei Arten unterschieden", "entstehen verhindert / erlöschen / Durchsetzung gehemmt"],
    [2, "5. je ein Beispiel mit Norm", "z. B. § 105, § 362, § 214 BGB"],
  ],
}));

const c2 = fest("pr-c2", "Fall: Die eigenmächtige Praxismanagerin", 2, 50, () => ({
  sv: "Dr. Clara Clausen (C) betreibt in Bremen eine Zahnarztpraxis. Ihre Praxismanagerin Anna Arndt (A, 34 Jahre) hat sie mündlich beauftragt, im Namen der Praxis Verbrauchsmaterial zu bestellen, „aber nie mehr als 500 € pro Bestellung“. Am 12.02.2026 bestellt A beim Dentalhändler Gustav Götz (G) „für die Zahnarztpraxis Dr. Clausen“ ein Bleaching-Gerät für 2.000 €, weil C einmal erwähnt hatte, so etwas „irgendwann“ anschaffen zu wollen. G weiß nichts von der internen Grenze. Als G liefern will, fragt er C am 16.02.2026 schriftlich, ob sie die Bestellung genehmige. C antwortet am 20.02.2026, sie genehmige nicht.",
  aufgaben: ["Kann G von C Zahlung von 2.000 € verlangen?", "Welche Ansprüche hat G gegen A? Prüfen Sie jeweils gutachterlich."],
  loesung: [
    "1. Anspruch G gegen C aus § 433 Abs. 2 BGB",
    "Obersatz: G könnte gegen C einen Anspruch auf Zahlung von 2.000 € aus § 433 Abs. 2 BGB haben. Dazu müsste ein Kaufvertrag zwischen G und C zustande gekommen sein. C hat selbst keine Erklärung abgegeben; die Bestellung der A wirkt nur für und gegen C, wenn A sie wirksam vertreten hat (§ 164 Abs. 1 S. 1 BGB).",
    "a) Zulässigkeit, eigene Willenserklärung und fremder Name: Der Kauf ist kein höchstpersönliches Geschäft. A entscheidet selbst über Gerät und Bestellung, gibt also eine eigene Willenserklärung ab, und handelt ausdrücklich „für die Zahnarztpraxis Dr. Clausen“.",
    "b) Vertretungsmacht: C hat A eine Innenvollmacht erteilt (§ 167 Abs. 1 Alt. 1 BGB), beschränkt auf Bestellungen von Verbrauchsmaterial bis 500 €. Die Bestellung eines Geräts für 2.000 € überschreitet diese Vollmacht nach Gegenstand und Betrag. Eine Handlungsvollmacht mit gesetzlich bestimmtem Umfang (§ 54 HGB) scheidet aus, da C als Zahnärztin kein Handelsgewerbe betreibt (§ 1 HGB). Für eine Rechtsscheinvollmacht fehlt ein von C gesetzter Rechtsschein. A handelte daher ohne Vertretungsmacht.",
    "c) Folge: Der Vertrag ist schwebend unwirksam; seine Wirksamkeit hängt von der Genehmigung der C ab (§ 177 Abs. 1 BGB). G hat C zur Erklärung aufgefordert; die Erklärung konnte nur ihm gegenüber erfolgen (§ 177 Abs. 2 S. 1 BGB). C hat die Genehmigung am 20.02.2026 verweigert – der Vertrag ist endgültig unwirksam.",
    "Ergebnis: G hat gegen C keinen Anspruch auf Zahlung.",
    "2. Anspruch G gegen A aus § 179 BGB",
    "Obersatz: G könnte gegen A nach seiner Wahl einen Anspruch auf Erfüllung oder Schadensersatz aus § 179 Abs. 1 BGB haben.",
    "a) A hat als Vertreterin einen Vertrag im Namen der C geschlossen, ohne Vertretungsmacht zu haben; C hat die Genehmigung verweigert (§ 179 Abs. 1 BGB).",
    "b) A kannte die Grenze von 500 €, also den Mangel ihrer Vertretungsmacht. Die Haftungsbeschränkung auf den Vertrauensschaden nach § 179 Abs. 2 BGB greift daher nicht.",
    "c) Ausschlussgründe (§ 179 Abs. 3 BGB): G kannte die interne Grenze nicht und musste sie auch nicht kennen (S. 1). A ist volljährig, also nicht in der Geschäftsfähigkeit beschränkt (S. 2).",
    "Ergebnis: G kann von A nach seiner Wahl Erfüllung – also Zahlung von 2.000 € Zug um Zug gegen Lieferung des Geräts – oder Schadensersatz wegen Nichterfüllung verlangen (§ 179 Abs. 1 BGB).",
  ],
  bewertung: [
    [2, "Obersatz G gegen C aus § 433 Abs. 2 BGB; Zurechnung über § 164 Abs. 1 BGB", "Kaufvertrag nur bei wirksamer Stellvertretung"],
    [2, "Zulässigkeit, eigene WE, im fremden Namen", "„für die Zahnarztpraxis Dr. Clausen“"],
    [3, "Innenvollmacht und ihr Umfang", "§ 167 Abs. 1 Alt. 1 BGB; Verbrauchsmaterial bis 500 €"],
    [2.5, "Überschreitung der Vollmacht → ohne Vertretungsmacht", "Gegenstand (Gerät) und Betrag (2.000 €)"],
    [2, "§ 54 HGB ausgeschlossen (kein Handelsgewerbe); kein Rechtsschein", "§ 1 HGB – Zahnärztin ist Freiberuflerin"],
    [2.5, "schwebende Unwirksamkeit", "§ 177 Abs. 1 BGB"],
    [2.5, "Aufforderung und Verweigerung gegenüber G → endgültig unwirksam", "§ 177 Abs. 2 S. 1 BGB"],
    [1, "Ergebnis: kein Anspruch gegen C", "klar formuliert"],
    [2, "Obersatz G gegen A aus § 179 Abs. 1 BGB", "Wahlrecht Erfüllung/Schadensersatz"],
    [2, "Tatbestand § 179 Abs. 1 BGB", "Vertreter ohne Vertretungsmacht, Genehmigung verweigert"],
    [2, "Kenntnis der A vom Mangel → nicht nur Vertrauensschaden", "§ 179 Abs. 2 BGB greift nicht"],
    [2.5, "kein Ausschluss nach § 179 Abs. 3 BGB", "G gutgläubig (S. 1), A volljährig (S. 2)"],
    [2, "Ergebnis: Erfüllung (Zug um Zug) oder Schadensersatz nach Wahl des G", "§ 179 Abs. 1 BGB"],
  ],
}));

const c3 = fest("pr-c3", "Fall: Der Fußball und der Wintergarten", 2, 40, () => ({
  sv: "Der 12-jährige Moritz Meyer (M) spielt am Nachmittag des 18.04.2026 im Garten seiner Eltern Fußball. Seine Eltern haben ihm schon mehrfach eingeschärft, nie in Richtung des Wintergartens der Nachbarin Nadine Nolte (N) zu schießen, weil die Scheiben zu Bruch gehen könnten. M hat sich bisher stets daran gehalten. An diesem Tag will er einen „Fallrückzieher wie im Fernsehen“ ausprobieren; der Ball fliegt über den Zaun und zerschlägt eine Glasscheibe des Wintergartens. Der Austausch kostet 800 €. Die Eltern waren im Haus.",
  aufgaben: ["Kann N von M Ersatz von 800 € verlangen?", "Kann N von den Eltern des M Ersatz von 800 € verlangen? Prüfen Sie jeweils gutachterlich."],
  loesung: [
    "1. Anspruch N gegen M aus § 823 Abs. 1 BGB",
    "Obersatz: N könnte gegen M einen Anspruch auf Schadensersatz in Höhe von 800 € aus § 823 Abs. 1 BGB haben.",
    "a) Rechtsgutverletzung: Die zerstörte Glasscheibe ist Teil des Eigentums der N; ihr Eigentum ist verletzt.",
    "b) Handlung und haftungsbegründende Kausalität: Der Schuss des M ist ein willensgesteuertes Verhalten, das die Zerstörung der Scheibe verursacht hat (äquivalent und adäquat kausal).",
    "c) Rechtswidrigkeit: Sie wird durch die Rechtsgutverletzung indiziert; Rechtfertigungsgründe bestehen nicht.",
    "d) Verschulden: M müsste verantwortlich sein. Mit 12 Jahren ist seine Verantwortlichkeit nicht nach § 828 Abs. 1 BGB (unter 7 Jahren) oder Abs. 2 BGB (Unfall mit Kfz/Bahn) ausgeschlossen. Nach § 828 Abs. 3 BGB ist er verantwortlich, wenn er die zur Erkenntnis der Verantwortlichkeit erforderliche Einsicht hatte, also allgemein erkennen konnte, dass sein Verhalten Gefahren für andere begründet und er dafür einstehen muss. M wurde mehrfach auf die Gefahr für die Scheiben hingewiesen; die Einsichtsfähigkeit liegt vor. M handelte fahrlässig (§ 276 Abs. 2 BGB): Ein durchschnittlicher 12-Jähriger hätte erkannt, dass ein riskanter Fallrückzieher nahe am Zaun den Wintergarten treffen kann.",
    "e) Schaden und haftungsausfüllende Kausalität: N ist ein Schaden von 800 € entstanden. Statt der Herstellung kann sie den dafür erforderlichen Geldbetrag verlangen (§ 249 Abs. 2 S. 1 BGB).",
    "Ergebnis: N kann von M 800 € aus § 823 Abs. 1 BGB verlangen.",
    "2. Anspruch N gegen die Eltern aus § 832 Abs. 1 BGB",
    "Obersatz: N könnte gegen die Eltern einen Anspruch auf 800 € aus § 832 Abs. 1 S. 1 BGB haben.",
    "a) Die Eltern sind kraft Gesetzes zur Aufsicht über ihr minderjähriges Kind verpflichtet (elterliche Sorge, § 1631 Abs. 1 BGB).",
    "b) M hat N widerrechtlich einen Schaden zugefügt (s. o.).",
    "c) Die Ersatzpflicht tritt nicht ein, wenn die Eltern ihrer Aufsichtspflicht genügt haben (§ 832 Abs. 1 S. 2 BGB); eine Verletzung wird vermutet, die Eltern müssen sich entlasten. Das Maß der Aufsicht richtet sich nach Alter, Eigenart und Charakter des Kindes. Ein 12-Jähriger darf im elterlichen Garten ohne ständige Überwachung spielen. Die Eltern haben M wiederholt belehrt, und M hat sich bisher stets daran gehalten; Anlass zu engerer Aufsicht bestand nicht. Die Eltern haben ihrer Aufsichtspflicht genügt.",
    "Ergebnis: N hat gegen die Eltern keinen Anspruch aus § 832 Abs. 1 BGB. (Ein eigenes Verschulden der Eltern nach § 823 Abs. 1 BGB scheidet aus denselben Gründen aus.)",
  ],
  bewertung: [
    [1.5, "Obersatz N gegen M aus § 823 Abs. 1 BGB", "Schadensersatz 800 €"],
    [2, "Rechtsgutverletzung Eigentum", "Scheibe der N zerstört"],
    [2, "Handlung, Kausalität, Rechtswidrigkeit (indiziert)", "äquivalent/adäquat; keine Rechtfertigung"],
    [1.5, "§ 828 Abs. 1, 2 BGB ausgeschlossen", "12 Jahre; kein Kfz-/Bahnunfall"],
    [3.5, "Einsichtsfähigkeit nach § 828 Abs. 3 BGB definiert und bejaht", "mehrfache Belehrung über die Gefahr"],
    [2, "Fahrlässigkeit nach Altersgruppe", "§ 276 Abs. 2 BGB"],
    [1.5, "Schaden 800 € als Geldbetrag", "§ 249 Abs. 2 S. 1 BGB; Ergebnis (+)"],
    [1.5, "Obersatz Eltern aus § 832 Abs. 1 S. 1 BGB; gesetzliche Aufsichtspflicht", "elterliche Sorge, § 1631 Abs. 1 BGB"],
    [1, "widerrechtliche Schädigung durch M", "Verweis nach oben"],
    [2.5, "vermutete Aufsichtspflichtverletzung, Entlastungsmöglichkeit", "§ 832 Abs. 1 S. 2 BGB – Beweislast bei den Eltern"],
    [2, "Maß der Aufsicht nach Alter; Entlastung gelungen", "12-Jähriger im Garten, Belehrungen befolgt"],
    [1, "Ergebnis: kein Anspruch gegen die Eltern", "klar formuliert"],
  ],
}));

export const SV_PR = [a1, a2, a3, b1, b2, b3, c1, c2, c3];

export const KLAUSUREN_PR = [
  { id: "pr-a", kurz: "A", titel: "Siebträger und Fahrrad – invitatio, Stellvertretung durch Minderjährige, § 107 BGB", minuten: 120, teile: ["pr-a1", "pr-a2", "pr-a3"] },
  { id: "pr-b", kurz: "B", titel: "Tippfehler und Taschengeld – Anfechtung, § 122, §§ 108, 110 BGB", minuten: 120, teile: ["pr-b1", "pr-b2", "pr-b3"] },
  { id: "pr-c", kurz: "C", titel: "Praxismanagerin und Fußball – §§ 177, 179, 823, 828, 832 BGB", minuten: 120, teile: ["pr-c1", "pr-c2", "pr-c3"] },
];
