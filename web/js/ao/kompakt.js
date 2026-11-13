// Kompaktwissen Abgabenordnung (GS I, Modul 1, Rechtsstand 2026) – eigene Zusammenfassungen, kein Skripttext.
// Felder: satz, zahlen [[Wert, Bedeutung]], punkte, schema, fallen. **fett**; Normzitate werden in der App antippbar.

export const KOMPAKT_AO = {
  "ao-grundlagen": {
    satz: "Die AO ist das Mantelgesetz des Steuerrechts: Die Einzelsteuergesetze sagen, was geschuldet wird – die AO sagt, wie es ermittelt, festgesetzt, erhoben und durchgesetzt wird (§ 1 Abs. 1 AO).",
    zahlen: [["5", "Merkmale der Steuer (§ 3 Abs. 1 AO)"], ["2", "Realsteuern: Grund- und Gewerbesteuer (§ 3 Abs. 2 AO)"], ["9", "Teile der AO"]],
    punkte: [
      "**Formelles Recht** regelt das Verfahren (Ermittlung → Festsetzung → Erhebung → ggf. Korrektur und Vollstreckung); **materielles Recht** regelt Entstehung, Änderung und Erlöschen der Ansprüche – vor allem in den Einzelsteuergesetzen, in der AO z. B. § 38 AO und § 240 AO.",
      "**Anwendungsbereich (§ 1 Abs. 1 AO):** alle bundes- oder EU-rechtlich geregelten Steuern, die von Bundes- oder Landesfinanzbehörden verwaltet werden; für die Realsteuern der Gemeinden gilt die AO teilweise (§ 1 Abs. 2 AO).",
      "**Steuer (§ 3 Abs. 1 AO):** Geldleistung · keine Gegenleistung für eine besondere Leistung · von einem öffentlich-rechtlichen Gemeinwesen · allen auferlegt, die den Tatbestand erfüllen · zur Erzielung von Einnahmen (auch als Nebenzweck).",
      "**Gebühr** = Gegenleistung für eine bestimmte Leistung (Passgebühr); **Beitrag** = für die Bereitstellung einer Einrichtung, unabhängig von der Nutzung (Erschließungs-, Kurbeitrag) – beides keine Steuern.",
      "**Einteilung:** Personen- und Sachsteuern (Realsteuern: § 3 Abs. 2 AO), Verkehr- und Verbrauchsteuern; direkt (Schuldner = Träger, ESt) und indirekt (USt); Abzugsteuern (LSt, KapESt) sind nur eine Erhebungsform; Bundes-, Landes-, Gemeinde- und Gemeinschaftsteuern.",
      "**Steuerliche Nebenleistungen (§ 3 Abs. 4 AO):** u. a. Verspätungszuschläge, Zinsen, Säumniszuschläge, Zwangsgelder, Kosten – keine Steuern, aber Ansprüche aus dem Steuerschuldverhältnis (§ 37 Abs. 1 AO).",
    ],
    fallen: [
      "Die Umsatzsteuer ist eine **Verkehrsteuer**, keine Verbrauchsteuer.",
      "Die Lohnsteuer ist keine eigene Steuer, sondern die Einkommensteuer im Abzugsverfahren.",
      "Nebenleistungen sind keine Steuern – der Verspätungszuschlag ist kein Steuerbescheid.",
    ],
  },

  "ao-steuergeheimnis": {
    satz: "Wer als Amtsträger dienstlich etwas über andere erfährt, darf es weder weitererzählen noch für sich nutzen oder grundlos abrufen – außer eine Erlaubnisnorm des § 30 Abs. 4 oder 5 AO greift.",
    schema: [
      "Amtsträger (§ 7 AO) oder gleichgestellte Person (§ 30 Abs. 3 AO)?",
      "Geschützte Daten: personenbezogene Daten eines anderen (§ 30 Abs. 2 Nr. 1 AO) oder ein fremdes Betriebs- oder Geschäftsgeheimnis (§ 30 Abs. 2 Nr. 2 AO)?",
      "Dienstlich bekannt geworden (§ 30 Abs. 2 Nr. 1 a–c AO)?",
      "Offenbaren oder verwerten (§ 30 Abs. 2 Nr. 1, 2 AO) oder im automatisierten Verfahren abrufen (§ 30 Abs. 2 Nr. 3 AO)?",
      "Ohne Befugnis – greift keine Erlaubnisnorm? Steuerverfahren (§ 30 Abs. 4 Nr. 1 AO), Gesetz (§ 30 Abs. 4 Nr. 2 AO), Zustimmung (§ 30 Abs. 4 Nr. 3 AO), nichtsteuerliche Straftat (§ 30 Abs. 4 Nr. 4 AO), zwingendes öffentliches Interesse (§ 30 Abs. 4 Nr. 5 AO), falsche Angaben (§ 30 Abs. 5 AO)",
    ],
    punkte: [
      "**Amtsträger (§ 7 AO):** Beamte und Richter (Nr. 1), sonstige öffentlich-rechtliche Amtsverhältnisse wie Minister oder Notare (Nr. 2), alle, die sonst Aufgaben der öffentlichen Verwaltung wahrnehmen, z. B. angestellte Sachbearbeiter (Nr. 3).",
      "**Gleichgestellt (§ 30 Abs. 3 AO):** förmlich besonders Verpflichtete (Schreibkraft, Hausmeister, Rechenzentrum), amtlich zugezogene Sachverständige, Kirchenamtsträger.",
      "**Personenbezogene Daten** (§ 30 Abs. 2 Nr. 1 AO) sind weit zu verstehen – auch Privates wie Wohnungseinrichtung oder Kinderzahl, auch Daten Dritter (Angehörige, Geschäftspartner). Anonymisierte Angaben sind nicht geschützt.",
      "**Dienstlich** = aus einem Verfahren in Steuersachen oder sonstigem dienstlichen Anlass; **privat Erfahrenes** fällt nicht unter § 30 AO.",
      "**Offenbaren:** ein Dritter erfährt etwas Neues – durch Tun, Dulden, Unterlassen, auch schlüssig; ein Wille dazu ist nicht nötig. **Verwerten:** zum eigenen oder fremden Vorteil ausnutzen. **Abrufen:** unbefugter Zugriff auf geschützte Daten, die in einem automationsgestützten Dateisystem gespeichert sind (§ 30 Abs. 2 Nr. 3 AO).",
      "**Erlaubnisnormen (§ 30 Abs. 4 AO)** – offenbaren oder verwerten ist zulässig, soweit es …",
      "**Nr. 1 – Steuerverfahren:** der Durchführung eines Verwaltungs- oder Gerichtsverfahrens in Steuersachen oder eines Steuerstraf- oder Bußgeldverfahrens dient (Abs. 2 Nr. 1 Buchst. a, b) – z. B. **Kontrollmitteilung** an ein anderes Finanzamt, Akten an das Finanzgericht. (Nr. 1a, 1b: Weiterverarbeitung nach § 29c AO, Datenschutz-Bußgeldverfahren.)",
      "**Nr. 2 – Gesetz:** **ausdrücklich** durch Bundesgesetz zugelassen, z. B. § 31 AO (Besteuerungsgrundlagen an öffentlich-rechtliche Körperschaften, etwa für IHK-Beiträge, und an Sozialleistungsträger), § 31a AO (illegale Beschäftigung, Leistungsmissbrauch), § 31b AO (Geldwäsche); allgemeine Amtshilfe (Art. 35 GG) genügt **nicht**. (Nr. 2a–2d: EU-Recht, Statistik, Gesetzesfolgenabschätzung, Archive.)",
      "**Nr. 3 – Zustimmung** der betroffenen Person – sie muss **vorher** vorliegen.",
      "**Nr. 4 – nichtsteuerliche Straftat:** Strafverfahren wegen einer Tat, die keine Steuerstraftat ist, **und** die Kenntnisse stammen a) aus einem Steuerstraf- oder Bußgeldverfahren (nicht: was der Steuerpflichtige vorher im Besteuerungsverfahren offenbart hat) oder b) wurden ohne steuerliche Pflicht bzw. unter Verzicht auf ein Auskunftsverweigerungsrecht erlangt.",
      "**Nr. 5 – zwingendes öffentliches Interesse,** namentlich a) Abwehr erheblicher Nachteile für das Gemeinwohl oder Gefahren für die öffentliche Sicherheit, Verfolgung von Verbrechen und vorsätzlichen schweren Vergehen gegen Leib und Leben oder den Staat, b) schwere Wirtschaftsstraftaten, c) Richtigstellung unwahrer Tatsachen in der Öffentlichkeit (Entscheidung der obersten Finanzbehörde mit dem BMF).",
      "**§ 30 Abs. 5 AO:** Vorsätzlich falsche Angaben der betroffenen Person dürfen den Strafverfolgungsbehörden offenbart werden – z. B. die falsche Anzeige eines Denunzianten.",
      "**Folgen eines Bruchs:** Strafbarkeit (§ 355 StGB), Amtshaftung (Art. 34 GG i. V. m. § 839 BGB), Disziplinarmaßnahmen. Die Pflicht endet nicht mit dem Dienstende.",
    ],
    fallen: [
      "Steuerberater sind keine Amtsträger – sie haben eine eigene Schweigepflicht, verletzen aber nicht § 30 AO.",
      "Die Zustimmung muss **vor** der Offenbarung vorliegen.",
      "Erzählt ein Kollege privat Weitergegebenes weiter, hat er es nicht dienstlich erlangt – wohl aber der, der es ihm erzählt hat.",
    ],
  },

  "ao-beteiligte": {
    satz: "Steuerpflichtiger ist, wen die Steuergesetze in die Pflicht nehmen; Beteiligter ist, an wen sich ein Verwaltungsakt richtet – und handeln kann nur, wer handlungsfähig ist, sonst handelt der gesetzliche Vertreter (§§ 33, 78, 79, 34 AO).",
    punkte: [
      "**Steuerpflichtiger (§ 33 Abs. 1 AO):** wer eine Steuer schuldet, haftet, sie für Dritte einbehält und abführt (Arbeitgeber), Erklärungen abgibt, Bücher führt oder andere steuerliche Pflichten hat. **Nicht**, wer nur in fremder Sache Auskunft gibt oder Urkunden vorlegt (§ 33 Abs. 2 AO).",
      "**Beteiligte (§ 78 AO):** Antragsteller und -gegner, Adressaten eines Verwaltungsakts (Hauptfall Nr. 2), Vertragspartner. Wichtig für die Reihenfolge bei Auskünften (§ 93 Abs. 1 S. 3 AO).",
      "**Steuerrechtsfähigkeit** ergibt sich aus den Einzelsteuergesetzen: Eine OHG ist für USt und GewSt steuerrechtsfähig, nicht für ESt/KSt.",
      "**Handlungsfähigkeit (§ 79 Abs. 1 AO):** Volljährige (Nr. 1); beschränkt Geschäftsfähige nur soweit anerkannt – § 112 BGB (genehmigtes Erwerbsgeschäft → betriebliche Steuern, nicht ESt) und § 113 BGB (Arbeitsverhältnis, nicht Ausbildung) (Nr. 2); juristische Personen durch ihre Vertreter (Nr. 3).",
      "**Bevollmächtigte (§ 80 AO):** Vollmacht für alle Verfahrenshandlungen, aber nicht zum Geldempfang; Widerruf wirkt erst mit Zugang beim Finanzamt; der Tod des Vollmachtgebers beendet sie nicht (§ 80 Abs. 4 AO); das Finanzamt soll sich an den Bevollmächtigten wenden (§ 80 Abs. 5 AO). **Beistand** (§ 80 Abs. 6 AO): unterstützt, vertritt nicht.",
      "**Gesetzliche Vertreter, Vermögensverwalter (§ 34 AO), Verfügungsberechtigte (§ 35 AO)** erfüllen die steuerlichen Pflichten der Vertretenen und sorgen für die Zahlung aus den verwalteten Mitteln.",
      "**Gesamtschuldner (§ 44 AO):** wer dieselbe Leistung schuldet oder zusammen veranlagt wird (Ehegatten, Miterben) – jeder schuldet alles, die Zahlung eines wirkt für alle; zusammengefasster Bescheid möglich (§ 155 Abs. 3 AO).",
      "**Gesamtrechtsnachfolge (§ 45 Abs. 1 AO):** Forderungen und Schulden gehen auf den Erben über („Fußstapfen“) – **Zwangsgelder nicht**.",
    ],
    fallen: [
      "Ein Kind kann Beteiligter sein, auch wenn es nicht handlungsfähig ist – dann handeln die Eltern.",
      "§ 112 BGB macht nicht für die Einkommensteuer handlungsfähig, weil sie auch Privates erfasst.",
      "Ohne ausdrückliche Geldempfangsvollmacht darf das Finanzamt Erstattungen nicht an den Berater zahlen (§ 80 Abs. 1 S. 2 AO).",
    ],
  },

  "ao-ermittlung": {
    satz: "Das Finanzamt ermittelt von Amts wegen, der Beteiligte muss mitwirken – wer nicht mitwirkt, riskiert Zwangsmittel, Schätzung oder gestrichene Kosten (§§ 88, 90, 162 AO).",
    punkte: [
      "**Besteuerungsgrundsätze (§ 85 AO):** gesetzmäßig und gleichmäßig festsetzen und erheben.",
      "**Opportunitätsprinzip (§ 86 S. 1 AO):** Ob und wann ein Verfahren durchgeführt wird, liegt im Ermessen – außer eine Rechtsvorschrift verlangt das Tätigwerden (Legalitätsprinzip, § 86 S. 2 AO).",
      "**Untersuchungsgrundsatz (§ 88 AO):** von Amts wegen, auch günstige Umstände; Art und Umfang nach Verhältnismäßigkeit, Wirtschaftlichkeit und Zweckmäßigkeit; Risikomanagementsysteme sind zulässig.",
      "**Mitwirkungspflicht (§ 90 Abs. 1 AO):** erhebliche Tatsachen vollständig und wahrheitsgemäß offenlegen, Beweismittel angeben; dazu Auskunft (§ 93 AO), Urkundenvorlage (§ 97 AO), Buchführung, Erklärungen.",
      "**Anhörung (§ 91 AO):** vor belastenden Verwaltungsakten, besonders bei wesentlicher Abweichung von der Erklärung; unterbleibt sie, ist der Verwaltungsakt rechtswidrig, aber heilbar (§ 126 Abs. 1 Nr. 3 AO).",
      "**Auskunft Dritter (§ 93 Abs. 1 S. 3 AO):** erst, wenn der Beteiligte nicht weiterhilft; nicht „ins Blaue hinein“. Das Ersuchen ist ein Verwaltungsakt.",
      "**Verweigerungsrechte nur für Dritte:** Angehörige (§ 101 AO, mit Belehrung, nicht für eigene Verhältnisse), Berufsgeheimnisträger (§ 102 AO, ohne Belehrung), Gefahr der Verfolgung (§ 103 AO, mit Belehrung). Der Beteiligte selbst hat keines.",
      "**Beweislast:** Das Finanzamt für steuererhöhende, der Steuerpflichtige für steuermindernde Tatsachen.",
    ],
    fallen: [
      "Zusammenveranlagte Ehegatten können über die gemeinsamen Einkünfte nicht nach § 101 AO schweigen – das sind ihre eigenen Verhältnisse.",
      "Eltern als gesetzliche Vertreter müssen für ihr Kind Auskunft geben.",
      "Ohne Belehrung ist die Aussage eines Angehörigen nicht verwertbar.",
    ],
  },

  "ao-erklaerung": {
    satz: "Wer erklärungspflichtig ist und zu spät abgibt, muss mit einem Verspätungszuschlag rechnen – im Ermessen nach § 152 Abs. 1 AO, zwingend ab 14 Monaten nach Jahresende (§ 152 Abs. 2 AO).",
    zahlen: [["31.07.", "Abgabe ohne Berater (§ 149 Abs. 2 AO)"], ["Ende Feb.", "des zweiten Folgejahres mit Berater (§ 149 Abs. 3 AO)"], ["0,25 %", "je angefangenen Monat (§ 152 Abs. 5 AO)"], ["25 €", "Mindestbetrag je Monat bei Jahreserklärungen"], ["25.000 €", "Höchstbetrag (§ 152 Abs. 10 AO)"]],
    punkte: [
      "**Erklärungspflicht (§ 149 Abs. 1 AO):** nach den Einzelsteuergesetzen oder auf Aufforderung; sie bleibt nach einer Schätzung bestehen.",
      "**Fristen:** ohne Berater sieben Monate nach Ablauf des Kalenderjahres (§ 149 Abs. 2 AO); mit Berater bis Ende Februar des zweiten Folgejahres (§ 149 Abs. 3 AO), bei Vorabanforderung vier Monate ab Bekanntgabe (§ 149 Abs. 4 AO). Voranmeldungen: 10. Tag nach Ablauf des Zeitraums.",
      "**Form (§ 150 AO):** amtlicher Vordruck oder elektronisch; Steueranmeldung = Steuer selbst berechnet; Unterschrift durch Bevollmächtigte nur ausnahmsweise (§ 150 Abs. 3 AO).",
      "**Berichtigung (§ 153 AO):** Erkennt der Steuerpflichtige nachträglich einen Fehler, der zu einer Steuerverkürzung führen kann, muss er ihn unverzüglich anzeigen und richtigstellen.",
      "**Verspätungszuschlag – Ermessen (§ 152 Abs. 1 AO):** bei verspäteter Abgabe; kein Zuschlag, wenn die Verspätung entschuldbar ist (Vertreterverschulden zählt).",
      "**Muss (§ 152 Abs. 2 AO):** Jahreserklärung später als 14 Monate nach Jahresende oder vorab angeforderte Erklärung nicht rechtzeitig – **außer** in den Fällen des § 152 Abs. 3 AO (Fristverlängerung, Steuer 0 oder negativ, Erstattungsfall, bestimmte Anmeldungen).",
      "**Berechnung bei Jahreserklärungen (§ 152 Abs. 5 S. 2 AO):** je **angefangenen** Monat 0,25 % der Steuer **abzüglich** Vorauszahlungen und Steuerabzugsbeträgen, mindestens 25 € je Monat; auf volle Euro abrunden, höchstens 25.000 € (§ 152 Abs. 10 AO).",
    ],
    schema: [
      "Erklärungspflicht und Frist bestimmen (§ 149 AO)",
      "Verspätung in angefangenen Monaten (bis Eingang bzw. bis zur Schätzung, § 152 Abs. 9 AO)",
      "Muss (Abs. 2) oder Ermessen (Abs. 1)? Ausnahmen nach Abs. 3 prüfen",
      "Höhe: 0,25 % × (Steuer − Vorauszahlungen − Abzugsbeträge), mind. 25 € je Monat",
      "Abrunden auf volle Euro, max. 25.000 €",
    ],
    fallen: [
      "Monate werden **angefangen**, nicht voll gezählt.",
      "Bemessungsgrundlage ist die **Abschlusszahlung**, nicht die festgesetzte Steuer – im Erstattungsfall bleibt der Mindestbetrag.",
      "Fällt der letzte Februartag auf ein Wochenende, verschiebt sich die Frist nach § 108 Abs. 3 AO (2027: Montag, 01.03.).",
    ],
  },

  "ao-zwang": {
    satz: "Zwangsgeld setzt Handlungspflichten durch, die Schätzung ersetzt fehlende Besteuerungsgrundlagen – beides ist Mittel zum Zweck, keine Strafe (§§ 328 ff., 162 AO).",
    zahlen: [["25.000 €", "Höchstbetrag je Zwangsgeld (§ 329 AO)"]],
    schema: [
      "Verwaltungsakt, der auf Handlung, Duldung oder Unterlassung gerichtet ist (§ 328 Abs. 1 AO)",
      "Schriftliche Androhung mit angemessener Frist, bestimmter Höhe, je Verpflichtung getrennt (§ 332 AO)",
      "Frist fruchtlos verstrichen → Festsetzung (§ 333 AO)",
      "Pflicht erfüllt → Vollzug einstellen (§ 335 AO); uneinbringlich → Ersatzzwangshaft (§ 334 AO)",
    ],
    punkte: [
      "**Zwangsmittel (§ 328 Abs. 1 AO):** Zwangsgeld, Ersatzvornahme, unmittelbarer Zwang – das mildeste geeignete Mittel wählen (§ 328 Abs. 2 AO).",
      "**Nicht erzwingbar:** Geldleistungen (dafür Vollstreckung nach §§ 249 ff. AO), Auskünfte trotz Verweigerungsrecht, Selbstbelastung wegen einer Steuerstraftat (§ 393 Abs. 1 AO).",
      "**Androhung** und **Festsetzung** sind eigene Verwaltungsakte – jeweils mit dem Einspruch anfechtbar; Fehler in der Androhung machen sie unwirksam.",
      "**Zwangsgelder** sind steuerliche Nebenleistungen (§ 3 Abs. 4 Nr. 6 AO) und gehen bei der Erbfolge **nicht** auf den Erben über (§ 45 Abs. 1 S. 2 AO).",
      "**Schätzung (§ 162 Abs. 1 AO):** Pflicht, wenn die Besteuerungsgrundlagen nicht ermittelt werden können – geschätzt werden Besteuerungsgrundlagen, nicht die Steuer; Unsicherheitszuschläge ja, Strafschätzung nein.",
      "Grobe Schätzungsfehler machen den Bescheid **rechtswidrig**; nichtig nur bei Willkür ohne Bezug zur Wirklichkeit. Die Erklärungspflicht bleibt (§ 149 Abs. 1 S. 4 AO).",
    ],
    fallen: [
      "Für ESt- und USt-Erklärung braucht es zwei getrennte Androhungen (§ 332 Abs. 2 S. 2 AO).",
      "Ein gezahltes Zwangsgeld wird nicht erstattet, wenn die Pflicht später erfüllt wird.",
      "Ob geschätzt wird, ist keine Ermessensfrage – „hat sie zu schätzen“.",
    ],
  },

  "ao-va": {
    satz: "Ein Verwaltungsakt regelt hoheitlich und verbindlich einen Einzelfall mit Außenwirkung – nur er wird durch Bekanntgabe wirksam, ist mit dem Einspruch anfechtbar und vollstreckbar (§ 118 AO).",
    schema: [
      "Hoheitliche Maßnahme einer Behörde",
      "auf dem Gebiet des öffentlichen Rechts",
      "zur Regelung (verbindliche Rechtsfolge)",
      "eines Einzelfalls",
      "mit unmittelbarer Rechtswirkung nach außen",
    ],
    punkte: [
      "**Kein Verwaltungsakt:** schlichte Auskünfte und Hinweise (keine Regelung), Richtlinien und BMF-Schreiben (kein Einzelfall), innerdienstliche Weisungen (keine Außenwirkung), Kauf von Büromaterial (privatrechtlich).",
      "**Bestimmtheit und Form (§ 119 AO):** inhaltlich hinreichend bestimmt; schriftlich, elektronisch, mündlich oder schlüssig; schriftliche Verwaltungsakte müssen die Behörde erkennen lassen. **Steuerbescheide** brauchen Schrift- oder elektronische Form (§ 157 Abs. 1 AO).",
      "**Begründung (§ 121 AO):** soweit zum Verständnis erforderlich – entbehrlich, wenn dem Antrag entsprochen wird, die Auffassung bekannt ist oder bei Massenverwaltungsakten; Nachholung heilt (§ 126 Abs. 1 Nr. 2 AO).",
      "**Steuerbescheid – Mussinhalte:** Steuer nach Art und Betrag, Steuerschuldner, erlassende Behörde (sonst nichtig). **Sollinhalte:** Rechtsbehelfsbelehrung (sonst Einspruchsfrist ein Jahr, § 356 Abs. 2 AO), Begründung.",
      "**Besteuerungsgrundlagen** sind ein unselbständiger Teil des Steuerbescheids (§ 157 Abs. 2 AO) – außer sie werden gesondert festgestellt.",
      "**Nebenbestimmungen (§ 120 AO):** bei gebundenen Verwaltungsakten nur, wenn gesetzlich zugelassen (Vorbehalt § 164 AO, Vorläufigkeit § 165 AO); bei Ermessensentscheidungen Befristung, Bedingung, Widerrufsvorbehalt, Auflage. Nur die **Auflage** ist selbständig anfechtbar.",
      "**Einteilung:** Steuerbescheide und gleichgestellte Bescheide (Feststellungs-, Messbescheide) vs. sonstige Verwaltungsakte (Verspätungszuschlag, Stundung, Zwangsgeld) – entscheidend für Korrektur und Verjährung.",
    ],
    fallen: [
      "Der Verspätungszuschlag ist kein Steuerbescheid, sondern ein sonstiger Verwaltungsakt.",
      "Befristung = fester Zeitpunkt; Bedingung = ungewisses künftiges Ereignis.",
      "Eine fehlende Rechtsbehelfsbelehrung macht den Bescheid nicht nichtig.",
    ],
  },

  "ao-wirksamkeit": {
    satz: "Rechtswidrig heißt nicht unwirksam: Ein fehlerhafter Verwaltungsakt gilt, bis er aufgehoben wird – unwirksam ist nur der nichtige (§ 124 Abs. 2, 3 AO).",
    schema: [
      "Intern entstanden? (Willensbildung, -äußerung, Zeichnung durch befugten Amtsträger)",
      "Wirksam bekannt gegeben? (§§ 122, 124 Abs. 1 AO)",
      "Nichtig? § 125 Abs. 2 → Abs. 3 → Abs. 1 → Abs. 4 AO",
      "Wenn nur rechtswidrig: Heilung nach § 126 AO? Unbeachtlich nach § 127 AO?",
    ],
    punkte: [
      "**Internes Entstehen:** fehlt, wenn ein Nichtbefugter handelt (Hausmeister → Nichtakt) oder ein Ausdruck versehentlich verschickt wird. Die Überschreitung der **internen Zeichnungsbefugnis** schadet nicht.",
      "**§ 125 Abs. 2 AO – immer nichtig:** keine erkennbare Behörde (Nr. 1), tatsächlich unmöglich (Nr. 2), verlangt eine Straftat (Nr. 3), sittenwidrig (Nr. 4).",
      "**§ 125 Abs. 3 AO – allein deshalb nicht nichtig:** örtliche Unzuständigkeit (Nr. 1), Mitwirkung einer ausgeschlossenen Person nach § 82 Abs. 1 S. 1 Nr. 2–6 AO (Nr. 2), fehlende Mitwirkung eines Ausschusses oder einer anderen Behörde.",
      "**§ 125 Abs. 1 AO – Generalklausel:** besonders schwerwiegender **und** offenkundiger Fehler; Maßstab: aufmerksamer Bürger ohne juristische Kenntnisse. Beispiele: Steuerschuldner fehlt, Unbestimmtheit, mündlicher Steuerbescheid.",
      "**Heilung (§ 126 Abs. 1 AO):** Antrag, Begründung oder Anhörung nachholen – bis zum Ende der Tatsacheninstanz beim Finanzgericht (§ 126 Abs. 2 AO).",
      "**§ 127 AO:** Keine Aufhebung allein wegen Verfahrens-, Form- oder örtlicher Zuständigkeitsfehler, wenn in der Sache nichts anderes hätte entschieden werden können – gilt für **gebundene** Verwaltungsakte, nicht für Ermessensentscheidungen (außer Ermessensreduzierung auf null).",
    ],
    fallen: [
      "Erst § 125 Abs. 2, dann Abs. 3, dann erst die Generalklausel Abs. 1 prüfen.",
      "Örtliche Unzuständigkeit allein führt nie zur Nichtigkeit.",
      "Nichtige Verwaltungsakte lassen sich nicht heilen – §§ 126, 127 AO setzen einen wirksamen Verwaltungsakt voraus.",
    ],
  },

  "ao-bekanntgabe": {
    satz: "Erst die Bekanntgabe macht den Verwaltungsakt wirksam: Die Behörde muss ihn bewusst dem Richtigen zugehen lassen – per Post gilt er am vierten Tag als bekannt gegeben (§ 122 Abs. 1, 2, § 124 Abs. 1 AO).",
    zahlen: [["4 Tage", "Bekanntgabefiktion Inland und Datenabruf (seit 2025)"], ["1 Monat", "Bekanntgabefiktion Ausland"]],
    punkte: [
      "**Bekanntgabewille:** Die Behörde will das „Ob“ und „Wie“. Aufgabe des Willens nur bis zum Verlassen des Machtbereichs (dokumentiert); danach nur Widerruf, der spätestens mit dem Bescheid zugehen muss (auch telefonisch).",
      "**Zugang:** im Machtbereich des Empfängers, mit Kenntnisnahme ist zu rechnen (Briefkasten). Was danach passiert, ist sein Risiko. Fehlt der Bekanntgabewille bei der Weiterleitung, Heilung mit tatsächlichem Erhalt (§ 8 VwZG entsprechend).",
      "**Drei Rollen:** Inhaltsadressat (für wen – Bescheidkopf), Bekanntgabeadressat (wem – bei Handlungsunfähigen der gesetzliche Vertreter), Empfänger (wohin – z. B. Steuerberater mit Empfangsvollmacht, § 122 Abs. 1 S. 4 AO).",
      "**Ehegatten:** zusammengefasster Bescheid (§ 155 Abs. 3 AO); eine Ausfertigung an die gemeinsame Anschrift mit beiden Namen genügt (§ 122 Abs. 7 AO); bei ernsten Meinungsverschiedenheiten Einzelbekanntgabe.",
      "**Erben:** Bescheid an den Gesamtrechtsnachfolger mit Hinweis auf die Rechtsnachfolge; ein dem Erblasser schon bekannt gegebener Bescheid wirkt gegen den Erben (§ 45 AO).",
      "**Personengesellschaften:** schuldet die Gesellschaft selbst (USt, GewSt) → an sie; Feststellungsbescheide an die rechtsfähige Gesellschaft in Vertretung der Beteiligten (§ 183 Abs. 1 AO), sonst an einen gemeinsamen Empfangsbevollmächtigten (§ 183a AO).",
      "**Zeitpunkt (§ 122 Abs. 2 AO):** vierter Tag nach Aufgabe zur Post (Inland), ein Monat (Ausland); Wochenende oder Feiertag → nächster Werktag (§ 108 Abs. 3 AO entsprechend). Gilt nicht bei späterem Zugang – der Steuerpflichtige muss das substantiiert darlegen. Datenabruf: vierter Tag nach Bereitstellung (§ 122a Abs. 4 AO).",
      "**Förmliche Zustellung (§ 122 Abs. 5 AO, § 2 Abs. 1 VwZG):** Bekanntgabetag = Zustellungstag, keine Fiktion; Mängel heilen mit tatsächlichem Zugang (§ 8 VwZG).",
      "**Bestandskraft:** formell = unanfechtbar nach Ablauf der Einspruchsfrist (§ 355 Abs. 1 AO); materiell = inhaltlich bindend, Änderung nur über Korrekturvorschriften – ein Vorbehalt der Nachprüfung verhindert sie (§ 164 Abs. 2 AO).",
    ],
    fallen: [
      "Seit 2025 vier statt drei Tage – alte Lösungen mit drei Tagen sind überholt.",
      "Die Fiktion verschiebt sich vom Samstag auf den Montag, nicht auf den Freitag.",
      "Hat der Steuerberater Empfangsvollmacht, beginnt die Einspruchsfrist erst mit Zugang bei ihm.",
    ],
  },

  "ao-vorbehalt": {
    satz: "Der Vorbehalt der Nachprüfung hält den ganzen Fall offen, die Vorläufigkeit nur einzelne ungewisse Punkte – und eine Steueranmeldung wirkt schon mit Eingang wie eine Vorbehaltsfestsetzung (§§ 164, 165, 168 AO).",
    punkte: [
      "**Vorbehalt (§ 164 Abs. 1 AO):** solange der Fall nicht abschließend geprüft ist; ohne Begründung, aber erkennbar im Bescheid. Kraft Gesetzes bei Vorauszahlungen und Steueranmeldungen.",
      "**Wirkung (§ 164 Abs. 2 AO):** jederzeit ganz änderbar – auch nach Ablauf der Einspruchsfrist; auch der Steuerpflichtige kann jederzeit Änderung beantragen.",
      "**Aufhebung (§ 164 Abs. 3 AO):** jederzeit möglich, steht einer endgültigen Festsetzung gleich (Schriftform, Rechtsbehelfsbelehrung); nach einer Außenprüfung ohne Änderungen ist er aufzuheben. **Wegfall (§ 164 Abs. 4 AO):** mit Ablauf der Festsetzungsfrist.",
      "**Vorläufigkeit (§ 165 Abs. 1 AO):** bei tatsächlicher Ungewissheit über die Entstehung der Steuer (S. 1) oder wegen anhängiger Verfahren beim BVerfG, EuGH oder BFH (S. 2). **Umfang und Grund** sind anzugeben.",
      "**Wirkung der Vorläufigkeit:** änderbar nur „soweit“ vorläufig; nach Wegfall der Ungewissheit aufheben, ändern oder für endgültig erklären (§ 165 Abs. 2 AO). Kombination mit dem Vorbehalt möglich (§ 165 Abs. 3 AO).",
      "**Steueranmeldung (§ 168 AO):** Steuer selbst berechnet (USt-Voranmeldung, LSt-Anmeldung) → mit Eingang Vorbehaltsfestsetzung. Bei Erstattung oder Herabsetzung erst mit **Zustimmung** – formfrei, z. B. durch Auszahlung.",
      "Beide Nebenbestimmungen sind **nicht isoliert** anfechtbar – Einspruch gegen den Bescheid.",
    ],
    fallen: [
      "Bei USt-Voranmeldungen kann der Vorbehalt nicht aufgehoben werden – es sind Vorauszahlungen.",
      "Eine ungeklärte Rechtsfrage allein ist kein Fall des § 165 Abs. 1 S. 1 AO.",
      "Einspruchsfrist bei Anmeldungen: ein Monat ab Eingang bzw. ab Bekanntwerden der Zustimmung (§ 355 Abs. 1 S. 2 AO).",
    ],
  },

  "ao-feststellung": {
    satz: "Normalerweise sind Besteuerungsgrundlagen nur Rechenweg im Steuerbescheid; wo mehrere beteiligt sind oder ein anderes Finanzamt zuständig ist, werden sie vorab verbindlich festgestellt (§§ 157 Abs. 2, 179, 180 AO).",
    schema: [
      "Mehrere Beteiligte, ESt-/KSt-pflichtige Einkünfte? → gesondert und einheitlich (§ 179 Abs. 2 S. 2, § 180 Abs. 1 S. 1 Nr. 2 a AO)",
      "Ausnahmen: nur ein Beteiligter im Inland steuerpflichtig, Fall geringer Bedeutung (§ 180 Abs. 3 AO)",
      "Eine Person, Gewinneinkünfte, Betriebs-/Tätigkeitsfinanzamt ≠ Wohnsitzfinanzamt? → gesondert (§ 180 Abs. 1 S. 1 Nr. 2 b AO)",
      "Zuständig: § 18 Abs. 1 Nr. 1–4 AO",
    ],
    punkte: [
      "**Regelungsinhalt** des Feststellungsbescheids sind Besteuerungsgrundlagen (z. B. Einkünfte und ihre Verteilung), keine Steuer.",
      "**Typische Fälle Nr. 2 a:** OHG, KG und andere Mitunternehmerschaften, Grundstücksgemeinschaften mit Vermietungseinkünften, gemeinsame Kapitalerträge.",
      "**Nr. 2 b** nur für **Gewinneinkünfte** (Land- und Forstwirtschaft, Gewerbe, freiberuflich) – Überschusseinkünfte einer Einzelperson werden nie gesondert festgestellt.",
      "**§ 180 Abs. 1 S. 1 Nr. 1 AO:** Grundsteuerwerte nach dem Bewertungsgesetz.",
      "**Verfahren (§ 181 AO):** Vorschriften über die Besteuerung gelten sinngemäß (Feststellungsfrist, Korrektur); erklärungspflichtig sind die Beteiligten bzw. die rechtsfähige Personenvereinigung.",
      "**Bindung (§ 182 Abs. 1 AO):** Der Grundlagenbescheid bindet den Folgebescheid, auch wenn er noch anfechtbar ist; Anpassung nach § 175 Abs. 1 S. 1 Nr. 1 AO; Ablaufhemmung von zwei Jahren (§ 171 Abs. 10 AO).",
      "**Rechtsschutz:** Einwendungen nur gegen den Grundlagenbescheid (§ 351 Abs. 2 AO).",
    ],
    fallen: [
      "Gemeinsame Vermietung zusammenveranlagter Ehegatten ist meist ein Fall geringer Bedeutung – keine Feststellung.",
      "Einspruch gegen den ESt-Bescheid hilft nicht gegen falsch festgestellte Einkünfte aus der OHG.",
      "Einheitswerte sind für die Grundsteuer durch Grundsteuerwerte ersetzt.",
    ],
  },

  "ao-zustaendigkeit": {
    satz: "Welches Finanzamt zuständig ist, folgt aus Wohnsitz, Geschäftsleitung, Betrieb oder Lage – geprüft wird im Zeitpunkt der Amtshandlung, und ein Verstoß macht nur rechtswidrig, nicht nichtig (§§ 17–29, 125 Abs. 3 Nr. 1 AO).",
    zahlen: [["> 6 Monate", "zusammenhängender Aufenthalt = gewöhnlicher Aufenthalt (§ 9 AO)"]],
    punkte: [
      "**Begriffe:** Wohnsitz (§ 8 AO: Wohnung, die beibehalten und benutzt wird), gewöhnlicher Aufenthalt (§ 9 AO), Geschäftsleitung (§ 10 AO: Mittelpunkt der Oberleitung), Sitz (§ 11 AO: laut Satzung/Vertrag), Betriebsstätte (§ 12 AO: feste Geschäftseinrichtung).",
      "**Einkommensteuer (§ 19 Abs. 1 AO):** Wohnsitzfinanzamt, ersatzweise gewöhnlicher Aufenthalt; bei mehreren Wohnsitzen der vorwiegende (Familie).",
      "**Großstadtregelung (§ 19 Abs. 3 AO):** Wohnung und Betrieb in derselben Gemeinde, aber verschiedenen Bezirken → Betriebsfinanzamt auch für die ESt.",
      "**Körperschaften (§ 20 AO):** Geschäftsleitung. **Umsatzsteuer (§ 21 AO):** von wo aus das Unternehmen betrieben wird. **Realsteuern (§ 22 AO):** Messbeträge – Grundsteuer Lagefinanzamt, Gewerbesteuer Betriebsfinanzamt.",
      "**Feststellungen (§ 18 Abs. 1 AO):** Lage- (Nr. 1), Betriebs- (Nr. 2), Tätigkeits- (Nr. 3), Verwaltungsfinanzamt (Nr. 4).",
      "**Sonderregeln:** Ersatzzuständigkeit (§ 24 AO), mehrfache Zuständigkeit – das zuerst befasste (§ 25 AO), Zuständigkeitsstreit – Aufsichtsbehörde (§ 28 AO), Gefahr im Verzug (§ 29 AO).",
      "**Wechsel (§ 26 AO):** sobald eine der Behörden von der Änderung erfährt; Fortführung mit Zustimmung möglich.",
      "**Verstoß:** rechtswidrig, nicht nichtig; bei gebundenen Verwaltungsakten keine Aufhebung (§ 127 AO), bei Ermessen schon.",
    ],
    fallen: [
      "Für die Körperschaftsteuer zählt die Geschäftsleitung, nicht der Satzungssitz.",
      "Maßgeblich ist die Zuständigkeit im Zeitpunkt der Amtshandlung, nicht der Steuerentstehung.",
      "Die Grund- und Gewerbesteuer selbst setzt meist die Gemeinde fest – das Finanzamt nur den Messbetrag.",
    ],
  },

  "ao-fristen": {
    satz: "Fristen rechnet man in drei Schritten – Beginn, Dauer, Ende –, und wer eine gesetzliche Frist ohne Verschulden versäumt, bekommt Wiedereinsetzung (§§ 108, 110 AO, §§ 187 ff. BGB).",
    zahlen: [["1 Monat", "Einspruchsfrist (§ 355 Abs. 1 AO)"], ["1 Monat", "Antrag auf Wiedereinsetzung nach Wegfall des Hindernisses (§ 110 Abs. 2 AO)"], ["1 Jahr", "Ausschlussfrist für Wiedereinsetzung (§ 110 Abs. 3 AO)"]],
    schema: [
      "Ereignis bestimmen (z. B. Bekanntgabe nach § 122 Abs. 2 AO)",
      "Beginn: Tag nach dem Ereignis, 0 Uhr (§ 108 Abs. 1 AO i. V. m. § 187 Abs. 1 BGB)",
      "Dauer laut Gesetz (z. B. ein Monat)",
      "Ende: Tag gleicher Zahl, 24 Uhr (§ 188 Abs. 2 BGB); fehlt er, letzter Tag des Monats (§ 188 Abs. 3 BGB)",
      "Samstag, Sonntag, Feiertag → nächster Werktag (§ 108 Abs. 3 AO)",
    ],
    punkte: [
      "**Frist** = Zeitraum, **Termin** = Zeitpunkt (z. B. Vorlagetermin, Schlussbesprechung); behördliche Termine gelten auch am Wochenende (§ 108 Abs. 5 AO).",
      "**Gesetzliche Fristen** (Einspruch, Klage) sind Ausschlussfristen – nur Wiedereinsetzung hilft; **behördliche Fristen** sind verlängerbar, auch rückwirkend (§ 109 Abs. 1 AO). Steuererklärungsfristen sind trotz Gesetz verlängerbar.",
      "**Ereignisfrist (§ 187 Abs. 1 BGB):** Ereignistag zählt nicht mit – Einspruchsfrist, Wiedereinsetzungsfrist, Zahlungsfristen. **Tagesbeginnfrist (§ 187 Abs. 2 BGB):** Anfangstag zählt mit – Lebensalter.",
      "**Wiedereinsetzung (§ 110 AO):** gesetzliche Frist versäumt · ohne Verschulden (einfache Fahrlässigkeit schadet; Vertreterverschulden wird zugerechnet) · Antrag und Nachholung binnen eines Monats nach Wegfall des Hindernisses · Jahresfrist.",
      "**Kein Verschulden** z. B. bei plötzlicher schwerer Krankheit, urlaubsbedingter Abwesenheit von bis zu sechs Wochen, verzögertem Postlauf; **Verschulden** bei Arbeitsüberlastung oder Rechtsirrtum.",
      "**§ 126 Abs. 3 AO:** Fehlen Begründung oder Anhörung und wird deshalb die Einspruchsfrist versäumt, gilt das als unverschuldet.",
    ],
    fallen: [
      "Bekanntgabe am 31.01. → Fristende Ende Februar (§ 188 Abs. 3 BGB), nicht Anfang März.",
      "§ 108 Abs. 3 AO verschiebt nur das Ende (und die Bekanntgabefiktion), nicht den Beginn.",
      "Wiedereinsetzung gibt es nicht für behördliche Fristen – dort hilft § 109 AO.",
    ],
  },

  "ao-erhebung": {
    satz: "Steueransprüche entstehen kraft Gesetzes, werden nach den Einzelsteuergesetzen fällig – und wer zu spät zahlt, schuldet automatisch Säumniszuschläge (§§ 38, 220, 240 AO).",
    zahlen: [["1 %", "Säumniszuschlag je angefangenen Monat (§ 240 Abs. 1 AO)"], ["50 €", "Abrundung des Rückstands"], ["3 Tage", "Schonfrist bei Überweisung (§ 240 Abs. 3 AO)"]],
    punkte: [
      "**Ablauf:** Entstehung → Ermittlung → Festsetzung → Erhebung (Fälligkeit, Zahlung) → ggf. Vollstreckung.",
      "**Entstehung (§ 38 AO):** sobald der Tatbestand verwirklicht ist – die Festsetzung wirkt nur **deklaratorisch**. ESt mit Ablauf des Veranlagungszeitraums (§ 36 Abs. 1 EStG), LSt mit Zufluss des Lohns, USt mit Ablauf des Voranmeldungszeitraums der Leistung.",
      "**Verwirklichung (§ 218 Abs. 1 AO):** Grundlage sind Steuerbescheide, Haftungsbescheide und Festsetzungen von Nebenleistungen; Steueranmeldungen stehen gleich; bei Säumniszuschlägen genügt die Verwirklichung des Tatbestands.",
      "**Fälligkeit (§ 220 AO):** nach den Einzelsteuergesetzen (ESt-Abschlusszahlung einen Monat nach Bekanntgabe, USt-Vorauszahlung am 10. Tag); sonst mit Entstehung, bei Festsetzungen nicht vor deren Bekanntgabe.",
      "**Säumniszuschlag (§ 240 Abs. 1 AO):** nicht bis zum Ablauf des Fälligkeitstags gezahlt → je **angefangenen** Monat 1 % des auf volle 50 € **abgerundeten** Rückstands; entsteht kraft Gesetzes, nicht vor Festsetzung oder Anmeldung der Steuer.",
      "**Schonfrist (§ 240 Abs. 3 AO):** bis zu drei Tagen Säumnis wird kein Zuschlag erhoben – nicht bei Bar- oder Scheckzahlung.",
      "Spätere Herabsetzung der Steuer lässt verwirkte Säumniszuschläge bestehen (§ 240 Abs. 1 S. 4 AO).",
    ],
    fallen: [
      "Säumniszuschlag (1 %, Monat, Zahlung) nicht mit Verspätungszuschlag (0,25 %, Erklärung) verwechseln.",
      "Der Rückstand wird **ab**gerundet, auf durch 50 € teilbare Beträge.",
      "Der Steuerbescheid lässt die Steuer nicht entstehen – er stellt sie nur fest.",
    ],
  },
};

export const KLAUSUR_AO = {
  titel: "AO-Klausur: so holst du die Punkte",
  aufbau: [
    "**180 Minuten.** Prüfungsstoff ist Modul 1 des Lehrplans (bis zur GS-I-Klausur); die meisten Stunden haben Feststellungsverfahren, Ermittlung, Folgen verspäteter Abgabe und Zuständigkeit (inkl. § 19 Abs. 3 AO).",
    "**Wissens- und Fallfragen** aus allen Bereichen von Modul 1: Steuergeheimnis, Beteiligte und Ermittlung, Erklärungen und Zuschläge, Verwaltungsakt, Bekanntgabe, Vorbehalt und Vorläufigkeit, Feststellung, Zuständigkeit, Fristen.",
    "**Hilfsmittel:** Gesetzestexte (AO, BGB-Auszug) – jede Aussage mit der genauen Fundstelle belegen (§, Abs., S., Nr.).",
    "**Fallaufbau:** Obersatz kurz („I könnte das Steuergeheimnis nach § 30 Abs. 1 AO verletzt haben.“), dann Merkmal für Merkmal mit Norm und Sachverhalt, Ergebnis.",
  ],
  top: ["ao-feststellung", "ao-ermittlung", "ao-erklaerung", "ao-zustaendigkeit", "ao-bekanntgabe", "ao-fristen", "ao-steuergeheimnis"],
  tipps: [
    "Fristen immer in drei Schritten aufschreiben: Ereignis/Beginn – Dauer – Ende, jeweils mit Norm und Wochentag.",
    "Bei der Bekanntgabe zuerst die vier Tage zählen, dann Wochenende und Feiertag prüfen (§ 108 Abs. 3 AO).",
    "Bei Nichtigkeit die Reihenfolge § 125 Abs. 2 → 3 → 1 einhalten und das Ergebnis mit § 124 Abs. 3 AO abschließen.",
    "Beim Verspätungszuschlag Muss oder Ermessen begründen, dann rechnen – angefangene Monate, Abschlusszahlung, Mindestbetrag, Abrundung.",
  ],
};
