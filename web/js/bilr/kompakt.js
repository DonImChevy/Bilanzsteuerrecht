// Kompaktwissen Bilanzsteuerrecht Teil I und II (GS I, Rechtsstand 2026) – eigene Zusammenfassungen, kein Skripttext.
// Felder: satz, zahlen [[Wert, Bedeutung]], punkte, schema, klausur, fallen, formulierung. **fett**; Normzitate werden in der App antippbar.

export const KOMPAKT_BSR = {
  // ---------------------------------------------------------------- Teil I
  grundbegriffe: {
    satz: "Buchführung trennt sauber zwischen Geldfluss und Erfolg: Nicht jede Zahlung ist Aufwand – und nicht jeder Aufwand fließt sofort ab.",
    punkte: [
      "**Auszahlung / Einzahlung:** Abfluss bzw. Zufluss von **Bargeld und Bankguthaben** (Zahlungsmittelbestand).",
      "**Ausgabe / Einnahme:** Änderung des **Geldvermögens** = Zahlungsmittel + Forderungen − Verbindlichkeiten. Kauf auf Ziel ist Ausgabe, aber noch keine Auszahlung.",
      "**Aufwand / Ertrag:** **Werteverzehr bzw. Wertzuwachs** eines Wirtschaftsjahres, der das Eigenkapital mindert bzw. erhöht – Grundlage der GuV.",
      "**Kosten / Leistungen:** betriebszweckbezogener, periodengerechter Werteverzehr (Kostenrechnung). Neutraler Aufwand (z. B. Spende, Verlust aus Anlagenverkauf) ist kein Kostenbestandteil.",
      "**Beispiele für Abweichungen:** Maschinenkauf bar = Auszahlung, aber kein Aufwand (nur Vermögensumschichtung); AfA = Aufwand ohne Auszahlung; Darlehenstilgung = Auszahlung, aber weder Ausgabe noch Aufwand.",
      "**Bestandsgrößen** stehen in der Bilanz (Stichtag), **Stromgrößen** (Aufwand, Ertrag) in der GuV (Zeitraum).",
      "**Wirtschaftsjahr** = Zeitraum, für den der Gewinn ermittelt wird; bei Kaufleuten in Klausuren meist das Kalenderjahr.",
    ],
    klausur: [
      "**Einordnen in die Begriffspaare:** Eine Tabelle mit Geschäftsvorfällen ist auszufüllen – immer fragen: Ändert sich Bargeld/Bank? Das Geldvermögen? Das Eigenkapital?",
    ],
    fallen: [
      "Tilgung eines Darlehens ist kein Aufwand – nur der Zins ist Aufwand.",
      "Wareneinkauf auf Ziel ist Ausgabe, aber erst die Bezahlung ist Auszahlung.",
    ],
  },

  buchfuehrungspflicht: {
    satz: "Kaufleute müssen nach Handelsrecht Bücher führen, und das Steuerrecht übernimmt diese Pflicht – kleine Gewerbetreibende können über § 141 AO trotzdem buchführungspflichtig werden.",
    zahlen: [["800.000 €", "Umsatzgrenze (§ 241a HGB, § 141 AO)"], ["80.000 €", "Gewinngrenze"], ["10 / 8 Jahre", "Aufbewahrung Bücher / Buchungsbelege"]],
    punkte: [
      "**§ 238 Abs. 1 HGB:** Jeder **Kaufmann** ist verpflichtet, Bücher zu führen und darin seine Handelsgeschäfte und die Lage seines Vermögens nach den GoB ersichtlich zu machen.",
      "**Kaufmann:** Istkaufmann mit Handelsgewerbe (§ 1 HGB) – vermutet, wenn ein **kaufmännisch eingerichteter Geschäftsbetrieb** erforderlich ist; Kannkaufmann durch Eintragung (§ 2 HGB); Formkaufmann (GmbH, AG) kraft Rechtsform (§ 6 HGB).",
      "**Befreiung (§ 241a HGB):** Einzelkaufleute, die an **zwei aufeinanderfolgenden** Abschlussstichtagen jeweils nicht mehr als **800.000 € Umsatzerlöse und 80.000 € Jahresüberschuss** haben. Bei Neugründung genügt der erste Stichtag.",
      "**Steuerrecht – derivativ (§ 140 AO):** Wer nach anderen Gesetzen (v. a. HGB) Bücher führen muss, hat diese Pflicht auch für die Besteuerung.",
      "**Steuerrecht – originär (§ 141 Abs. 1 AO):** Gewerbetreibende sowie Land- und Forstwirte mit **Umsatz > 800.000 €** oder **Gewinn > 80.000 €** im Jahr – **nicht Freiberufler**.",
      "**Beginn (§ 141 Abs. 2 AO):** erst ab dem Wirtschaftsjahr, das auf die **Mitteilung** des Finanzamts folgt.",
      "**Wer nicht buchführungspflichtig ist,** kann den Gewinn durch Einnahmenüberschussrechnung ermitteln (§ 4 Abs. 3 EStG).",
      "**Aufbewahrung (§ 257 HGB, § 147 AO):** Bücher, Inventare, Jahresabschlüsse **10 Jahre**; **Buchungsbelege seit 2025 8 Jahre**; Handels- und Geschäftsbriefe 6 Jahre. Die Frist beginnt mit Schluss des Kalenderjahres.",
    ],
    klausur: [
      "**Prüfung für eine Person:** Kaufmann nach HGB? → Befreiung nach § 241a HGB? → § 140 AO; falls keine HGB-Pflicht: § 141 AO mit Grenzen und Mitteilung.",
      "**Freiberuflerin (Ärztin, Anwalt):** kein Kaufmann, kein § 141 AO → keine Buchführungspflicht, EÜR möglich.",
    ],
    fallen: [
      "§ 241a HGB verlangt **beide** Grenzen (und), § 141 AO löst schon bei **einer** Grenze aus (oder).",
      "Die Pflicht nach § 141 AO beginnt nicht automatisch mit dem Überschreiten – erst nach Mitteilung.",
    ],
    formulierung: "K ist als Istkaufmann (§ 1 HGB) nach § 238 Abs. 1 HGB buchführungspflichtig; eine Befreiung nach § 241a HGB scheidet aus, da die Umsatzerlöse 800.000 € übersteigen. Die handelsrechtliche Pflicht gilt nach § 140 AO auch für die Besteuerung.",
  },

  inventurBilanz: {
    satz: "Inventur ist das Zählen, das Inventar die ausführliche Liste, die Bilanz die knappe Gegenüberstellung – und am Ende muss Aktiva gleich Passiva sein.",
    schema: [
      "Inventur: körperliche und buchmäßige Bestandsaufnahme (§ 240 HGB)",
      "Inventar: ausführliches Verzeichnis A. Vermögen, B. Schulden, C. Reinvermögen (Staffelform)",
      "Bilanz: kurz gefasste Gegenüberstellung in Kontenform (§§ 242, 247 HGB)",
    ],
    punkte: [
      "**Pflicht (§ 240 HGB):** Inventar bei Beginn des Handelsgewerbes und zum Schluss jedes Geschäftsjahres; Mengen und Werte aller Vermögensgegenstände und Schulden.",
      "**Inventurverfahren (§ 241 HGB):** Stichtagsinventur (zeitnah, i. d. R. ±10 Tage), **verlegte Inventur** (bis 3 Monate vor oder 2 Monate nach dem Stichtag, Wert fortschreiben), **permanente Inventur** (laufende Lagerbuchführung), Stichprobeninventur.",
      "**Körperliche Inventur** für Sachen (zählen, messen, wiegen), **Buchinventur** für Forderungen, Bankguthaben, Schulden (Belege, Kontoauszüge, Saldenbestätigungen).",
      "**Bilanz (§ 242 Abs. 1 HGB):** Abschluss, der das Verhältnis von Vermögen und Schulden darstellt. Gliederung (§ 247 Abs. 1, § 266 HGB): **Aktiva** Anlagevermögen, Umlaufvermögen, aktive RAP; **Passiva** Eigenkapital, Rückstellungen, Verbindlichkeiten, passive RAP.",
      "**Anlagevermögen (§ 247 Abs. 2 HGB):** Gegenstände, die **dauernd** dem Geschäftsbetrieb dienen; alles andere ist Umlaufvermögen (Waren, Forderungen, Bank).",
      "**Aktivseite** zeigt die Mittelverwendung (Vermögen), **Passivseite** die Mittelherkunft (Kapital). Eigenkapital = Vermögen − Schulden.",
      "**Unterzeichnung** durch den Kaufmann (§ 245 HGB); Aufbewahrung 10 Jahre (§ 257 HGB).",
    ],
    klausur: [
      "**Aus einer Inventurliste Inventar und Bilanz erstellen:** Vermögen nach steigender Liquidität, Schulden nach Fälligkeit, Eigenkapital als Saldo.",
    ],
    fallen: [
      "Eigenkapital wird nicht gezählt – es ergibt sich als Differenz.",
      "Inventar in Staffelform, Bilanz in Kontenform – nicht vertauschen.",
    ],
  },

  bilanzveraenderungen: {
    satz: "Jeder Geschäftsvorfall verändert die Bilanz auf genau eine von vier Arten – und die Bilanzsumme bleibt immer im Gleichgewicht.",
    zahlen: [["4", "Arten der Bilanzveränderung"], ["Aktiva = Passiva", "gilt nach jedem Vorfall"]],
    punkte: [
      "**Aktivtausch:** Ein Aktivposten nimmt zu, ein anderer ab – Bilanzsumme bleibt gleich. Beispiel: Kauf einer Maschine gegen Banküberweisung.",
      "**Passivtausch:** Ein Passivposten nimmt zu, ein anderer ab – Bilanzsumme bleibt gleich. Beispiel: Lieferantenverbindlichkeit wird in ein Darlehen umgewandelt.",
      "**Aktiv-Passiv-Mehrung (Bilanzverlängerung):** Je ein Aktiv- und ein Passivposten nehmen zu. Beispiel: Wareneinkauf auf Ziel, Darlehensaufnahme mit Gutschrift auf dem Bankkonto.",
      "**Aktiv-Passiv-Minderung (Bilanzverkürzung):** Je ein Aktiv- und ein Passivposten nehmen ab. Beispiel: Begleichung einer Verbindlichkeit per Bank.",
      "**Erfolgswirksame Vorfälle** verändern zusätzlich das Eigenkapital (Aufwand mindert, Ertrag mehrt es).",
    ],
    klausur: [
      "**Zuordnungsaufgabe:** Für jeden Vorfall die betroffenen Bilanzposten und die Art nennen – Tipp: zuerst fragen, ob ein Passivposten betroffen ist.",
    ],
    fallen: [
      "Barabhebung vom Bankkonto ist Aktivtausch (Kasse +, Bank −).",
      "Tilgung eines Darlehens per Bank ist Bilanzverkürzung, kein Aufwand.",
    ],
  },

  bestandskonten: {
    satz: "Die Bilanz wird in Konten aufgelöst: Aktivkonten nehmen im Soll zu, Passivkonten im Haben – jeder Buchungssatz nennt zuerst Soll, dann Haben.",
    schema: [
      "Welche Konten sind berührt?",
      "Aktiv- oder Passivkonto?",
      "Zugang oder Abgang?",
      "Soll oder Haben? → „Soll an Haben“, Summe Soll = Summe Haben",
    ],
    punkte: [
      "**Aktivkonten:** Anfangsbestand und **Zugänge im Soll**, Abgänge im Haben, Schlussbestand als Saldo im Haben.",
      "**Passivkonten:** Anfangsbestand und **Zugänge im Haben**, Abgänge im Soll, Schlussbestand als Saldo im Soll.",
      "**Buchungssatz:** „Soll-Konto **an** Haben-Konto“. Einfacher Buchungssatz: zwei Konten; zusammengesetzter: mehr als zwei Konten (z. B. Wareneinkauf an Bank mit Vorsteuer).",
      "**Doppik:** Jeder Vorfall wird auf mindestens zwei Konten erfasst – die Summen von Soll und Haben sind immer gleich.",
      "**Eröffnung:** Anfangsbestände über das Eröffnungsbilanzkonto (EBK): Aktivkonten an EBK, EBK an Passivkonten.",
      "**Buchungssätze deuten:** z. B. „Verbindlichkeiten aus LuL an Bank“ = Bezahlung einer Lieferantenrechnung per Überweisung.",
    ],
    klausur: [
      "**Teil I der Semesterklausur:** Buchungssätze zu Vorfällen bilden und ins Journal eintragen – sauber mit Betrag in Soll und Haben.",
    ],
    fallen: [
      "Eigenkapital ist ein Passivkonto – Zugänge im Haben.",
      "Vorsteuer (Forderung) ist ein Aktivkonto, Umsatzsteuer (Verbindlichkeit) ein Passivkonto.",
    ],
    formulierung: "BS: Fuhrpark 45.000 € / Vorsteuer 8.550 € an Bank 53.550 €",
  },

  erfolgskonten: {
    satz: "Aufwands- und Ertragskonten sind Unterkonten des Eigenkapitals: Aufwand wird im Soll gebucht, Ertrag im Haben – ihr Saldo landet über die GuV im Eigenkapital.",
    punkte: [
      "**Aufwandskonten** (Mietaufwand, Löhne, AfA, Zinsaufwand): Buchung im **Soll** – Aufwand mindert das Eigenkapital.",
      "**Ertragskonten** (Umsatzerlöse, Zinserträge, Mieterträge): Buchung im **Haben** – Ertrag mehrt das Eigenkapital.",
      "**Abschluss:** Aufwandskonten: **GuV an Aufwandskonto**; Ertragskonten: **Ertragskonto an GuV**.",
      "**GuV-Saldo:** Gewinn → **GuV an Eigenkapital**; Verlust → Eigenkapital an GuV.",
      "**Erfolgswirksam** sind Vorfälle, die das Eigenkapital ändern; **erfolgsneutral** sind reine Vermögensumschichtungen.",
      "**Betriebliche Steuern** (Kfz-Steuer, Grundsteuer, Gewerbesteuer) sind Aufwand – **private** Steuern (Einkommensteuer) sind Privatentnahmen.",
    ],
    klausur: [
      "**Kfz-Steuer für den Firmenwagen per Lastschrift:** Kfz-Steuer (Aufwand) an Bank; bei Vorauszahlung über den Stichtag hinaus aktive Rechnungsabgrenzung.",
    ],
    fallen: [
      "Erlöse werden ohne Umsatzsteuer gebucht (Nettomethode).",
      "Die Einkommensteuer des Inhabers ist nie Betriebsausgabe.",
    ],
  },

  privatkonten: {
    satz: "Privatkonten halten fest, was der Inhaber aus dem Betrieb herausnimmt oder hineingibt – das ändert das Eigenkapital, ist aber kein Gewinn oder Verlust.",
    schema: [
      "Entnahme: Privatentnahmen an … (Bank, Kasse, Unentgeltliche Wertabgaben + USt)",
      "Einlage: … an Privateinlagen",
      "Abschluss: Eigenkapital an Privatentnahmen; Privateinlagen an Eigenkapital",
    ],
    punkte: [
      "**Entnahmen (§ 4 Abs. 1 S. 2 EStG):** alle Wirtschaftsgüter (Geld, Waren, Nutzungen, Leistungen), die der Steuerpflichtige für betriebsfremde Zwecke entnimmt – gebucht im **Soll** auf Privatentnahmen.",
      "**Einlagen (§ 4 Abs. 1 S. 8 EStG):** alle Wirtschaftsgüter, die der Steuerpflichtige dem Betrieb zuführt – gebucht im **Haben** auf Privateinlagen.",
      "**Zahlung einer Betriebsrechnung vom privaten Konto** = Einlage: z. B. Wareneinkauf / Vorsteuer an Privateinlagen.",
      "**Warenentnahme:** Privatentnahmen an Unentgeltliche Wertabgaben und Umsatzsteuer (§ 3 Abs. 1b UStG; Wert nach § 6 Abs. 1 Nr. 4 EStG).",
      "**Private Steuern** (ESt, Kirchensteuer, Soli) und private Versicherungen über das Betriebskonto = Entnahme.",
      "**Gewinnformel (§ 4 Abs. 1 S. 1 EStG):** Betriebsvermögen Ende − Betriebsvermögen Anfang **+ Entnahmen − Einlagen**.",
    ],
    klausur: [
      "**Unternehmer zahlt Lieferantenrechnung privat:** in beiden Semesterklausuren gefragt – Buchung über Privateinlagen, Gewinnauswirkung nur über den Aufwand bzw. die Aktivierung.",
    ],
    fallen: [
      "Privatentnahmen sind kein Aufwand – der Gewinn ändert sich durch die Entnahme selbst nicht.",
      "Die USt auf die Warenentnahme nicht vergessen.",
    ],
    formulierung: "BS: Wareneinkauf 16.200 € / Vorsteuer 3.078 € an Privateinlagen 19.278 €",
  },

  warenkonten: {
    satz: "Das viergeteilte Warenkonto trennt Bestand, Einkauf, Verkauf und Bestandsveränderung – am Ende liefert es Wareneinsatz und Rohgewinn.",
    zahlen: [["WBK", "Warenbestandskonto"], ["WEK", "Wareneinkaufskonto = Wareneinsatz"], ["WVK", "Warenverkaufskonto = Erlöse"], ["BVK", "Bestandsveränderungskonto"]],
    schema: [
      "Bestandsveränderung ermitteln: Schlussbestand lt. Inventur − Anfangsbestand",
      "Mehrung: WBK an BVK · Minderung: BVK an WBK",
      "WBK-Schlussbestand: SBK an WBK",
      "BVK über das WEK abschließen (Mehrung: BVK an WEK · Minderung: WEK an BVK)",
      "Wareneinsatz: GuV an WEK · Erlöse: WVK an GuV",
    ],
    punkte: [
      "**WBK (Bestandskonto):** Im Jahr **keine Buchungen** – nur Anfangsbestand und Schlussbestand lt. Inventur; die Differenz ist die Bestandsveränderung.",
      "**WEK (Aufwandskonto):** Einkäufe zu Einstandspreisen (netto) im Soll. Nach Abschluss der Unterkonten und des BVK steht hier der **Wareneinsatz**.",
      "**WVK (Ertragskonto):** Verkäufe zu Verkaufspreisen (netto) im Haben = **Umsatzerlöse**.",
      "**Wareneinsatz** = Anfangsbestand + Einkäufe (nach Nachlässen und Bezugskosten) − Schlussbestand.",
      "**Warenrohgewinn** = Erlöse − Wareneinsatz.",
      "**Rohgewinnaufschlagsatz** = Rohgewinn ÷ Wareneinsatz × 100. **Handelsspanne** = Rohgewinn ÷ Erlöse × 100.",
    ],
    klausur: [
      "**Teil I der Semesterklausur (ca. 45 Min.):** vorgegebene Warenkonten fortführen, Unterkonten ergänzen, abschließen; vorbereitende und Abschlussbuchungen nennen; Wareneinsatz, Rohgewinn und Aufschlagsatz berechnen.",
    ],
    fallen: [
      "Das BVK wird über das **WEK** abgeschlossen, nicht über die GuV.",
      "Rohgewinnaufschlag auf den Wareneinsatz beziehen – nicht auf die Erlöse.",
      "Bei einer Bestandsminderung erhöht sich der Wareneinsatz.",
    ],
    formulierung: "Wareneinsatz = AB 92.000 € + Einkäufe (netto) − SB 80.000 €; Rohgewinn = Erlöse − Wareneinsatz; Aufschlagsatz = Rohgewinn ÷ Wareneinsatz × 100.",
  },

  warenunterkonten: {
    satz: "Bezugskosten erhöhen den Wareneinkauf, Nachlässe senken ihn; beim Verkauf mindern gewährte Nachlässe die Erlöse – und jedes Mal wird die Umsatzsteuer mit korrigiert.",
    punkte: [
      "**Warenbezugskosten** (Fracht, Verpackung, Transportversicherung): im Soll, Abschluss **WEK an Warenbezugskosten** – sie sind Anschaffungsnebenkosten (§ 255 Abs. 1 S. 2 HGB).",
      "**Preisnachlässe, erhaltene Skonti, erhaltene Boni:** im **Haben** gebucht, Abschluss **Unterkonto an WEK**; die Vorsteuer wird anteilig gekürzt (§ 17 Abs. 1 S. 2 UStG).",
      "**Rücksendungen an Lieferanten:** direkt **Verbindlichkeiten an WEK und Vorsteuer** – es wurde eben nicht eingekauft.",
      "**Rücksendungen von Kunden:** direkt **WVK und Umsatzsteuer an Forderungen**.",
      "**Gewährte Skonti, Boni, Erlösschmälerungen:** im **Soll** gebucht, Abschluss **WVK an Unterkonto**; die Umsatzsteuer wird gekürzt (§ 17 Abs. 1 UStG).",
      "**Sofortrabatte** (Händlerrabatt auf der Rechnung) werden nicht gebucht – es zählt nur der rabattierte Preis.",
      "**Skonto berechnen:** vom **noch offenen Bruttobetrag** (nach Rücksendungen) → in Netto und Steueranteil aufteilen.",
    ],
    klausur: [
      "**Kunde sendet zurück, dann zahlt er mit 2 % Skonto:** erst Rücksendung (netto + USt) von der Forderung abziehen, dann Skonto vom Restbrutto: Bank, Gewährte Skonti (netto), Umsatzsteuer (Steueranteil) an Forderungen.",
      "**Unternehmer zahlt Lieferantenrechnung mit Skonto:** Verbindlichkeiten an Bank, Erhaltene Skonti, Vorsteuer.",
    ],
    fallen: [
      "Skonto nicht vom ursprünglichen Rechnungsbetrag rechnen, wenn vorher zurückgesendet wurde.",
      "Die Steuerkorrektur bei Skonto gehört dazu – sonst stimmen USt-/VSt-Konto nicht.",
      "Bezugskosten nicht als sonstigen Aufwand buchen.",
    ],
    formulierung: "Restforderung 17.850 € − 3.332 € = 14.518 €; Skonto 2 % = 290,36 € brutto = 244,00 € netto + 46,36 € USt. BS: Bank 14.227,64 € / Gewährte Skonti 244,00 € / Umsatzsteuer 46,36 € an Forderungen aus LuL 14.518,00 €.",
  },

  umsatzsteuer: {
    satz: "In der Buchführung ist die Umsatzsteuer ein durchlaufender Posten: Vorsteuer ist eine Forderung ans Finanzamt, Umsatzsteuer eine Verbindlichkeit – die Differenz ist die Zahllast.",
    zahlen: [["19 %", "Regelsatz"], ["7 %", "ermäßigter Satz"], ["USt − VSt", "Zahllast"]],
    punkte: [
      "**Nettomethode:** Erlöse und Einkäufe werden netto gebucht, die Steuer getrennt auf **Vorsteuer** (Aktivkonto) bzw. **Umsatzsteuer** (Passivkonto).",
      "**Einkauf:** Ware/Anlage + Vorsteuer an Verbindlichkeiten. **Verkauf:** Forderungen an WVK + Umsatzsteuer.",
      "**Entgeltsminderungen** (Skonto, Rabatt, Boni, Rücksendung) korrigieren die Steuer im gleichen Verhältnis (§ 17 UStG).",
      "**Abschluss:** Die kleinere Seite auf die größere umbuchen (meist **Umsatzsteuer an Vorsteuer**); die verbleibende **Zahllast** wird überwiesen oder als Verbindlichkeit über das SBK abgeschlossen. Ist die Vorsteuer größer → **Vorsteuerüberhang** = Forderung.",
      "**Nicht abziehbare Vorsteuer** (z. B. Geschenke über 50 €) gehört zu den Anschaffungskosten bzw. zum Aufwand (Umkehrschluss aus § 9b Abs. 1 EStG).",
      "**Keine Vorsteuer** aus Rechnungen ohne Steuerausweis (Privatperson, Kleinunternehmer) und aus Gebühren der öffentlichen Hand (Zulassung, Grunderwerbsteuer, Gerichtskosten).",
    ],
    klausur: [
      "**Gutschrift mit Barauszahlung beim Umtausch:** alter Verkauf wird storniert (WVK und USt an Kasse/Forderung), neuer Verkauf gebucht – USt-Korrektur nach § 17 UStG.",
      "**Rechnung des Notars mit USt, Bescheid über Grunderwerbsteuer ohne USt:** nur aus der Notarrechnung Vorsteuer.",
    ],
    fallen: [
      "Vorsteuer nie als Aufwand und nie als Teil der Anschaffungskosten buchen, wenn sie abziehbar ist.",
      "Umsatzsteuer und Vorsteuer nicht saldiert im Jahr buchen – erst beim Abschluss verrechnen.",
    ],
  },

  abschluss: {
    satz: "Der Abschluss läuft in fester Reihenfolge: erst die Unterkonten in ihre Hauptkonten, dann Erfolgskonten in die GuV, die GuV ins Eigenkapital und alle Bestandskonten ins Schlussbilanzkonto.",
    schema: [
      "Eröffnung: Aktivkonten an EBK · EBK an Passivkonten",
      "Laufende Buchungen",
      "Vorbereitende Abschlussbuchungen: Bezugskosten/Nachlässe → WEK, gewährte Nachlässe → WVK, Bestandsveränderung → BVK → WEK, Privat → EK, USt ↔ VSt",
      "Erfolgskonten → GuV",
      "GuV-Saldo → Eigenkapital",
      "Bestandskonten → SBK (Aktivkonten: SBK an Konto · Passivkonten: Konto an SBK)",
    ],
    punkte: [
      "**EBK (Eröffnungsbilanzkonto)** ist das Spiegelbild der Eröffnungsbilanz – Aktiva stehen im Haben, Passiva im Soll, damit die Konten richtig eröffnet werden.",
      "**SBK (Schlussbilanzkonto)** sammelt die Schlussbestände – aus ihm wird die Schlussbilanz erstellt. Die Werte müssen mit der Inventur übereinstimmen.",
      "**GuV-Konto:** Aufwand im Soll, Ertrag im Haben; Saldo = Gewinn (im Soll) bzw. Verlust (im Haben).",
      "**Privatkonten** werden über das Eigenkapital abgeschlossen, **nicht** über die GuV.",
      "**Zeitliche Abgrenzung** (RAP, sonstige Forderungen/Verbindlichkeiten) und Abschreibungen werden vor dem Abschluss gebucht.",
    ],
    klausur: [
      "**„Nennen Sie die vorbereitenden Abschlussbuchungen und die Abschlussbuchungen“:** Liste sauber trennen – vorbereitend (innerhalb der Konten) und Abschluss (GuV, EK, SBK).",
    ],
    fallen: [
      "Das BVK geht ins WEK, nicht in die GuV.",
      "Beim EBK sind die Seiten vertauscht – nicht mit der Bilanz verwechseln.",
    ],
  },

  kalkulation: {
    satz: "Kalkulation führt vom Listeneinkaufspreis über den Einstandspreis zum Verkaufspreis – und rückwärts zeigen Rohgewinn und Aufschlagsatz, wie viel der Händler aufschlägt.",
    schema: [
      "Listeneinkaufspreis − Liefererrabatt = Zieleinkaufspreis",
      "− Liefererskonto = Bareinkaufspreis",
      "+ Bezugskosten = Bezugspreis (Einstandspreis)",
      "+ Handlungskosten = Selbstkosten",
      "+ Gewinn = Barverkaufspreis",
      "+ Kundenskonto (im Hundert) = Zielverkaufspreis",
      "+ Kundenrabatt (im Hundert) = Listenverkaufspreis netto (+ USt)",
    ],
    punkte: [
      "**Einstandspreis (Bezugspreis)** = Anschaffungskosten der Ware – Grundlage für Wareneinsatz und Aufschlag.",
      "**Kalkulationszuschlag** = (Listenverkaufspreis netto − Einstandspreis) ÷ Einstandspreis × 100.",
      "**Kalkulationsfaktor** = Listenverkaufspreis netto ÷ Einstandspreis.",
      "**Handelsspanne** = (Verkaufspreis − Einstandspreis) ÷ Verkaufspreis × 100.",
      "**Rohgewinnaufschlagsatz** = Rohgewinn ÷ Wareneinsatz × 100 (Gesamtbetrachtung über das WEK).",
      "**Im Hundert:** Kundenskonto und -rabatt werden vom späteren (höheren) Preis berechnet → Barverkaufspreis ÷ (100 − Skontosatz) × 100.",
    ],
    klausur: [
      "**Aufschlagsatz aus dem Warenkonto:** nach dem Abschluss Wareneinsatz und Erlöse ablesen, Rohgewinn und Aufschlagsatz in Prozent angeben.",
    ],
    fallen: [
      "Prozente „im Hundert“ und „vom Hundert“ nicht verwechseln.",
      "Die Umsatzsteuer gehört nicht in die Kalkulation des Nettopreises.",
    ],
  },

  gewinnermittlung: {
    satz: "Der Gewinn ist der Zuwachs des Betriebsvermögens, bereinigt um Entnahmen und Einlagen – GuV und Betriebsvermögensvergleich müssen dasselbe Ergebnis liefern.",
    zahlen: [["BV Ende − BV Anfang", "+ Entnahmen − Einlagen"]],
    punkte: [
      "**Betriebsvermögensvergleich (§ 4 Abs. 1 S. 1 EStG):** Unterschied zwischen dem Betriebsvermögen am Schluss des Wirtschaftsjahres und am Schluss des Vorjahres, **vermehrt um Entnahmen, vermindert um Einlagen**.",
      "**Gewerbetreibende mit Buchführungspflicht** setzen das Betriebsvermögen nach den handelsrechtlichen GoB an (**§ 5 Abs. 1 EStG**, Maßgeblichkeit).",
      "**GuV-Rechnung:** Erträge − Aufwendungen. Beide Methoden ergeben in der doppelten Buchführung denselben Gewinn.",
      "**Mehr- und Weniger-Rechnung:** Ausgehend vom vorläufigen Gewinn werden die Auswirkungen jeder Berichtigungsbuchung addiert bzw. abgezogen → berichtigter Gewinn.",
      "**Gewinnauswirkung lt. GuV:** nur Buchungen auf Aufwands- und Ertragskonten. **Lt. BVV:** Änderung von Aktiva/Passiva, korrigiert um Entnahmen (+) und Einlagen (−). Beide Spalten müssen übereinstimmen – eine gute Selbstkontrolle.",
      "**Erfolgsneutral:** Aktivierung gegen Bank, Einlage einer Zahlung, Tilgung. **Erfolgswirksam:** AfA, Zinsaufwand, Ausbuchung zu Unrecht gebuchter Aufwendungen (Gewinnerhöhung).",
    ],
    klausur: [
      "**Teil II:** Für jede Berichtigungsbuchung die Gewinnauswirkung „lt. GuV“ und „lt. BVV“ angeben und am Ende den berichtigten Gewinn ermitteln.",
      "**Aufwand statt Aktivierung gebucht (Grundstück 570.000 € als Aufwand):** Umbuchung auf Grund und Boden/Gebäude → Gewinnerhöhung um 570.000 €, dann AfA → Minderung.",
    ],
    fallen: [
      "Einlagen erhöhen das Betriebsvermögen, sind aber kein Gewinn – im BVV abziehen.",
      "Vorzeichen in der Mehr- und Weniger-Rechnung immer aus Sicht des Gewinns.",
    ],
  },

  buecher: {
    satz: "Keine Buchung ohne Beleg: Belege landen zeitlich geordnet im Grundbuch, sachlich geordnet im Hauptbuch und in Details in den Nebenbüchern.",
    punkte: [
      "**Grundbuch (Journal):** alle Vorfälle in **zeitlicher** Reihenfolge mit Datum, Beleg, Buchungssatz und Betrag.",
      "**Hauptbuch:** alle **Sachkonten** (Bestands- und Erfolgskonten) – **sachliche** Ordnung.",
      "**Nebenbücher:** Kontokorrent (Debitoren/Kreditoren je Kunde und Lieferant), Lager-, Anlagen-, Lohnbuchhaltung.",
      "**Ordnungsvorschriften (§ 239 HGB, § 146 AO):** vollständig, richtig, **zeitgerecht** und geordnet; **Kasseneinnahmen und -ausgaben täglich** aufzeichnen; keine Änderung, die den ursprünglichen Inhalt unkenntlich macht (Radierverbot, § 239 Abs. 3 HGB).",
      "**Belegprinzip:** Jede Buchung braucht einen Beleg (Fremd-, Eigen-, Notbeleg).",
      "**Kassenbericht (retrograd):** Kassenendbestand lt. Zählung + Ausgaben + Entnahmen + Bankeinzahlungen − Anfangsbestand − Einlagen = **Tageslosung** (Bareinnahmen).",
      "**Kassenbestand darf nie negativ sein** – ein Minus ist ein formeller Mangel (Kassenfehlbetrag).",
    ],
    klausur: [
      "**Kassenbericht ausfüllen:** die Tageslosung ermitteln und buchen (Kasse an Erlöse und Umsatzsteuer).",
    ],
    fallen: [
      "Einzahlung der Kasse aufs Bankkonto ist im Kassenbericht eine Ausgabe – aber kein Aufwand.",
      "Privatentnahmen aus der Kasse im Kassenbericht hinzurechnen.",
    ],
  },

  // ---------------------------------------------------------------- Teil II
  "bsr-gob": {
    satz: "Die GoB und die Maßgeblichkeit verbinden Handels- und Steuerbilanz – und die Frage, ob etwas überhaupt Betriebsvermögen ist, kommt vor jeder Bewertung.",
    zahlen: [["> 50 %", "notwendiges Betriebsvermögen"], ["10–50 %", "gewillkürtes BV möglich"], ["< 10 %", "notwendiges Privatvermögen"]],
    punkte: [
      "**Maßgeblichkeit (§ 5 Abs. 1 S. 1 EStG):** Gewerbetreibende setzen das Betriebsvermögen an, das nach den handelsrechtlichen **GoB** auszuweisen ist – außer das Steuerrecht schreibt anderes vor (Bewertungsvorbehalt § 5 Abs. 6 EStG) oder ein steuerliches Wahlrecht wird anders ausgeübt.",
      "**Bewertungsgrundsätze (§ 252 Abs. 1 HGB):** Bilanzidentität (Nr. 1), Fortführung (Nr. 2), **Einzelbewertung und Stichtag** (Nr. 3), **Vorsicht – Realisations- und Imparitätsprinzip** (Nr. 4), Periodenabgrenzung (Nr. 5), Stetigkeit (Nr. 6).",
      "**Realisationsprinzip:** Gewinne erst ausweisen, wenn sie durch Umsatz realisiert sind. **Imparitätsprinzip:** absehbare Verluste schon vorher berücksichtigen (z. B. Teilwertabschreibung).",
      "**Anschaffungskostenprinzip (§ 253 Abs. 1 HGB):** Höchstwert sind die (fortgeführten) Anschaffungs- oder Herstellungskosten.",
      "**Betriebsvermögen (R 4.2 EStR):** **notwendiges BV** bei Nutzung zu **mehr als 50 %** betrieblich; **gewillkürtes BV** bei 10–50 % möglich (Zuordnung durch Buchung); **unter 10 %** notwendiges Privatvermögen.",
      "**Gebäudeteile** in unterschiedlichem Nutzungszusammenhang sind **eigenständige Wirtschaftsgüter** (R 4.2 Abs. 3, 4 EStR) – eigengenutzter Teil BV, Wohnung PV.",
      "**Geschenke (§ 4 Abs. 5 S. 1 Nr. 1 EStG):** an Geschäftsfreunde nur abziehbar, wenn die Kosten je Empfänger und Jahr **50 €** nicht übersteigen; ein besonderes Konto ist nötig (§ 4 Abs. 7 EStG).",
    ],
    klausur: [
      "**Würdigung beginnt mit dem Bilanzansatz:** Wirtschaftsgut? Betriebsvermögen (notwendig/gewillkürt)? Anlage- oder Umlaufvermögen? Zurechnung? Dann Bewertung.",
      "**Ware oder Anlage?** Mähroboter beim Händler sind Ware (Umlaufvermögen) – derselbe Roboter beim Gärtner wäre Anlagevermögen.",
    ],
    fallen: [
      "Handelsrecht und Steuerrecht immer beide nennen („§ 246 HGB i. V. m. § 5 Abs. 1 S. 1 EStG“).",
      "Wertaufhellende Erkenntnisse nach dem Stichtag berücksichtigen, wertbegründende nicht.",
    ],
    formulierung: "Das Fahrzeug ist ein abnutzbares, bewegliches Wirtschaftsgut des Anlagevermögens (§ 247 Abs. 2 HGB), das ausschließlich betrieblich genutzt wird und daher zum notwendigen Betriebsvermögen gehört (R 4.2 Abs. 1 EStR). Es ist nach § 246 Abs. 1 HGB i. V. m. § 5 Abs. 1 S. 1 EStG zu bilanzieren.",
  },

  "bsr-zurechnung": {
    satz: "Bilanziert wird beim wirtschaftlichen Eigentümer – und zwar ab dem Zeitpunkt, in dem Besitz, Gefahr, Nutzen und Lasten übergehen, nicht ab Vertrag oder Grundbucheintrag.",
    zahlen: [["Lieferung", "Zugang beweglicher WG"], ["Nutzen & Lasten", "Zugang Grundstück"]],
    punkte: [
      "**Grundsatz (§ 246 Abs. 1 S. 2 HGB, § 39 Abs. 1 AO):** Wirtschaftsgüter sind dem **Eigentümer** zuzurechnen.",
      "**Abweichung (§ 39 Abs. 2 Nr. 1 AO):** Übt ein anderer die tatsächliche Herrschaft so aus, dass er den Eigentümer wirtschaftlich auf Dauer ausschließen kann, ist ihm das Wirtschaftsgut zuzurechnen (**wirtschaftliches Eigentum**).",
      "**Eigentumsvorbehalt (§ 449 BGB):** Der Verkäufer bleibt bis zur vollständigen Zahlung zivilrechtlich Eigentümer – bilanziert aber der **Käufer** (wirtschaftlicher Eigentümer).",
      "**Zugangszeitpunkt bewegliche WG:** mit **Lieferung** = Verschaffung der Verfügungsmacht; dann beginnt auch die AfA (§ 9a EStDV).",
      "**Zugangszeitpunkt Grundstücke:** Übergang von **Besitz, Gefahr, Nutzen und Lasten** – nicht Vertragsabschluss beim Notar, nicht Zahlung, nicht Eintragung im Grundbuch.",
      "**Schwebende Geschäfte** (Vertrag geschlossen, noch nicht erfüllt) werden nicht bilanziert; drohende Verluste daraus nur handelsrechtlich als Rückstellung.",
    ],
    klausur: [
      "**Grundstück: Vertrag 20.05., Nutzen und Lasten 07.06., Grundbuch 27.09.:** Zugang am 07.06. → Gebäude-AfA ab Juni.",
      "**Firmenwagen unter Eigentumsvorbehalt:** trotzdem beim Käufer zu aktivieren (§ 39 Abs. 2 Nr. 1 AO).",
    ],
    fallen: [
      "Den Grundbucheintrag nicht als Anschaffungszeitpunkt nehmen.",
      "„Eigentumsvorbehalt“ ist kein Grund, die Aktivierung abzulehnen.",
    ],
    formulierung: "Trotz des vereinbarten Eigentumsvorbehalts (§ 449 BGB) ist der Pkw F als wirtschaftlichem Eigentümer zuzurechnen (§ 39 Abs. 2 Nr. 1 AO, § 246 Abs. 1 S. 2 HGB). Angeschafft ist er mit der Lieferung am 19.11. (§ 9a EStDV).",
  },

  "bsr-ak": {
    satz: "Anschaffungskosten sind alles, was man aufwendet, um ein Wirtschaftsgut zu erwerben und betriebsbereit zu machen – abzüglich Minderungen und ohne abziehbare Vorsteuer.",
    schema: [
      "Anschaffungspreis (netto)",
      "− Anschaffungspreisminderungen (Rabatt, Skonto, Boni)",
      "+ Anschaffungsnebenkosten (Transport, Überführung, Montage, Zulassung, Kennzeichen, Notar/Grundbuch/GrESt beim Grundstück)",
      "+ nachträgliche Anschaffungskosten",
      "= Anschaffungskosten (§ 255 Abs. 1 HGB, H 6.2 EStH)",
    ],
    punkte: [
      "**Definition (§ 255 Abs. 1 HGB):** Aufwendungen, um einen Vermögensgegenstand zu erwerben und in einen **betriebsbereiten Zustand** zu versetzen, soweit sie ihm einzeln zugeordnet werden können – maßgeblich auch steuerlich (§ 6 Abs. 1 Nr. 1 EStG).",
      "**Vorsteuer (§ 9b Abs. 1 EStG):** gehört nicht zu den AK, soweit sie abziehbar ist. Nicht abziehbare Vorsteuer erhöht die AK.",
      "**Minderungen** (Rabatt, Skonto, Boni, Zuschüsse) senken die AK – **Skonto erst, wenn er tatsächlich in Anspruch genommen wird**.",
      "**Keine AK:** **Finanzierungskosten** (Zinsen, Notar- und Grundbuchkosten für das Darlehen bzw. die Grundschuld), **Kfz-Steuer**, Versicherung, Kosten der laufenden Nutzung, Gemeinkosten.",
      "**Zahlung vom Privatkonto** ändert die AK nicht – sie wird als Einlage gegengebucht.",
      "**Gebühren der Zulassungsstelle** sind AK, enthalten aber keine Vorsteuer; das selbst gekaufte **Kennzeichen** gehört mit seinem Nettobetrag dazu.",
    ],
    klausur: [
      "**Firmenwagen:** Listenpreis 49.500 € − Rabatt 5.000 € + Überführung 500 € + Zulassung 45 € + Kennzeichen 20 € = **45.065 € AK**; Kfz-Steuer 50 € ist Aufwand.",
      "**Händler kauft Ware mit Händlerrabatt, Fracht bar:** Ware (WEK) netto nach Rabatt; Fracht als Bezugskosten – kein sonstiger Aufwand.",
    ],
    fallen: [
      "Überführungskosten gehören dazu, Kfz-Steuer und Versicherung nicht.",
      "Skonto nicht abziehen, wenn ohne Abzug bezahlt wurde.",
      "Vorsteuer nicht in die AK rechnen.",
    ],
    formulierung: "Der Pkw ist nach § 253 Abs. 1 S. 1 HGB, § 6 Abs. 1 Nr. 1 S. 1 EStG mit den Anschaffungskosten zu bewerten. Zu ihnen gehören nach § 255 Abs. 1 HGB neben dem um den Rabatt geminderten Kaufpreis die Überführungs-, Zulassungs- und Kennzeichenkosten als Nebenkosten; die abziehbare Vorsteuer gehört nach § 9b Abs. 1 EStG nicht dazu.",
  },

  "bsr-grundstueck": {
    satz: "Ein bebautes Grundstück besteht aus zwei Wirtschaftsgütern: Grund und Boden (nicht abnutzbar) und Gebäude (AfA nach § 7 Abs. 4 EStG) – Kaufpreis und Nebenkosten werden aufgeteilt, Finanzierungskosten nicht.",
    zahlen: [["3 %", "Wirtschaftsgebäude im BV (Bauantrag nach 31.03.1985)"], ["3 / 2 / 2,5 %", "andere Gebäude: ab 2023 / 1925–2022 / vor 1925 fertiggestellt"], ["monatsgenau", "AfA im Anschaffungsjahr"]],
    schema: [
      "Zugang mit Übergang von Nutzen und Lasten (Zurechnung)",
      "Kaufpreis aufteilen: Grund und Boden / Gebäude (Verhältnis lt. Sachverhalt)",
      "Nebenkosten (Makler, Notar Kaufvertrag, Grundbuch Eigentum, Grunderwerbsteuer) im selben Verhältnis aufteilen",
      "Finanzierungskosten (Darlehen, Grundschuld) als Aufwand ausscheiden",
      "Gebäude-AfA: Satz nach § 7 Abs. 4 EStG × AK Gebäude × Monate/12",
      "Zinsen periodengerecht abgrenzen",
      "Buchungen und Gewinnauswirkung GuV/BVV",
    ],
    punkte: [
      "**Zwei Wirtschaftsgüter:** Grund und Boden ist **nicht abnutzbar** (keine AfA); das Gebäude ist abnutzbar (H 7.1 EStH).",
      "**Anschaffungsnebenkosten:** Maklerprovision, Notarkosten für den **Kaufvertrag**, Gerichtskosten für die **Eigentumsumschreibung**, **Grunderwerbsteuer** – im Verhältnis Boden/Gebäude aufteilen. Vorsteuer aus Makler- und Notarrechnung ist abziehbar und keine AK.",
      "**Keine AK:** Notar- und Grundbuchkosten für die **Darlehens- bzw. Grundschuldeintragung**, Zinsen, Bereitstellungszinsen → sofort Aufwand (Disagio ggf. als aktiver RAP).",
      "**Gebäude-AfA (§ 7 Abs. 4 S. 1 EStG):** **Nr. 1:** Gebäude im Betriebsvermögen, nicht Wohnzwecken dienend, Bauantrag nach dem 31.03.1985 → **3 %**. **Nr. 2:** übrige Gebäude: fertiggestellt nach 2022 → 3 %, nach 1924 und vor 2023 → **2 %**, vor 1925 → 2,5 %.",
      "**Zeitanteilig (§ 7 Abs. 1 S. 4 EStG):** im Anschaffungsjahr für jeden vollen Monat vor der Anschaffung 1/12 weniger – Anschaffung im Juni → 7/12.",
      "**Handelsrecht:** planmäßige Abschreibung nach § 253 Abs. 3 HGB; in Klausuren wird der steuerliche Satz übernommen.",
      "**Grunderwerbsteuer** je nach Land 3,5–6,5 % des Kaufpreises (§ 11 GrEStG, Landesrecht).",
    ],
    klausur: [
      "**Der Klassiker der BilStR-Klausur (bis zu 70 Min.):** Grundstück 570.000 € (40 % Boden) zunächst als Aufwand gebucht; Makler privat bezahlt (Einlage), Gerichtskosten teils Eigentum, teils Darlehen; Notar mit Kaufvertrag und Darlehen; Grunderwerbsteuer 34.200 €; Darlehenszinsen nachschüssig.",
      "**Lösungsweg:** AK Boden und Gebäude getrennt ermitteln, Aufwand stornieren, Nebenkosten aufteilen, Darlehenskosten als Aufwand, AfA 3 % × 7/12, Zinsen Juni–Dezember als sonstige Verbindlichkeit.",
    ],
    fallen: [
      "Notarkosten nicht pauschal aktivieren – nur der Teil für den Kaufvertrag gehört zu den AK.",
      "Keine AfA auf Grund und Boden.",
      "AfA-Beginn mit Nutzen und Lasten, nicht mit Grundbucheintrag.",
    ],
    formulierung: "Das Gebäude ist nach § 7 Abs. 4 S. 1 Nr. 1 EStG mit 3 % abzuschreiben, da es zum Betriebsvermögen gehört, nicht Wohnzwecken dient und der Bauantrag nach dem 31.03.1985 gestellt wurde. Im Jahr der Anschaffung ist die AfA nach § 7 Abs. 1 S. 4 EStG zeitanteilig für 7 Monate anzusetzen.",
  },

  "bsr-afa": {
    satz: "Abnutzbares Anlagevermögen wird über die Nutzungsdauer verteilt abgeschrieben – im ersten Jahr monatsgenau, und kleine Wirtschaftsgüter dürfen sofort oder über einen Sammelposten abgeschrieben werden.",
    zahlen: [["800 €", "GWG-Grenze netto (§ 6 Abs. 2 EStG)"], ["250–1.000 €", "Sammelposten, 5 Jahre je 20 %"], ["bis 250 €", "Sofortaufwand ohne Verzeichnis"]],
    schema: [
      "Abnutzbares bewegliches WG des Anlagevermögens?",
      "Selbständig nutzbar? AK ≤ 800 € → GWG-Wahlrecht (§ 6 Abs. 2 EStG) bzw. Sammelposten (§ 6 Abs. 2a EStG)",
      "Sonst lineare AfA (§ 7 Abs. 1 EStG): AK ÷ Nutzungsdauer (AfA-Tabelle)",
      "Anschaffungsjahr: × volle Monate ab Anschaffungsmonat ÷ 12",
      "Buchung: AfA an Wirtschaftsgut",
    ],
    punkte: [
      "**Lineare AfA (§ 7 Abs. 1 S. 1, 2 EStG):** gleichmäßig über die **betriebsgewöhnliche Nutzungsdauer** (amtliche AfA-Tabellen, z. B. Pkw 6 Jahre, Büromöbel 13 Jahre, Computer 1 Jahr).",
      "**Monatsgenau (§ 7 Abs. 1 S. 4 EStG):** Im Jahr der Anschaffung vermindert sich die AfA um 1/12 für jeden vollen Monat vor dem Anschaffungsmonat – der Anschaffungsmonat zählt voll. Anschaffung 19.11. → 2/12.",
      "**Handelsrecht (§ 253 Abs. 3 S. 1, 2 HGB):** planmäßige Abschreibung über die voraussichtliche Nutzungsdauer – Pflicht.",
      "**GWG (§ 6 Abs. 2 EStG):** abnutzbare, bewegliche, **selbständig nutzbare** Wirtschaftsgüter mit AK **bis 800 € netto** können im Anschaffungsjahr voll abgesetzt werden (Wahlrecht).",
      "**Sammelposten (§ 6 Abs. 2a EStG):** WG über 250 € bis 1.000 € können wahlweise in einen jahrgangsbezogenen Pool, der **5 Jahre mit je 20 %** aufgelöst wird – unabhängig von Abgang oder Nutzungsdauer. Das Wahlrecht gilt einheitlich für alle WG des Jahres.",
      "**Selbständig nutzbar** ist ein WG nicht, wenn es nur mit anderen zusammen genutzt werden kann (Drucker zum PC: technisch abgestimmt → **nicht** selbständig).",
      "**Degressive AfA:** für bewegliche WG, die nach dem 30.06.2025 und vor 2028 angeschafft werden, wieder möglich (bis 30 %) – in Klausuren meist ausdrücklich ausgeschlossen.",
    ],
    klausur: [
      "**Firmenwagen Nov. angeschafft, ND 6 Jahre:** 45.065 € ÷ 6 × 2/12 = 1.252 € AfA.",
      "**Bürostuhl für 650 € netto:** GWG – Sofortabzug wählen, wenn „geringste Steuerbelastung“ gefordert ist.",
    ],
    fallen: [
      "Nicht ab Bestell- oder Zahlungsdatum abschreiben, sondern ab Lieferung.",
      "Bei der GWG-Grenze immer netto rechnen (auch wenn keine Vorsteuer abziehbar ist, zählt der Nettobetrag).",
      "Wer den Sammelposten wählt, muss ihn für alle WG von 250–1.000 € des Jahres nutzen – Sofortabzug dann nur noch bis 250 €.",
    ],
    formulierung: "Der Pkw ist nach § 253 Abs. 3 S. 1 HGB planmäßig und nach § 7 Abs. 1 S. 1 EStG linear über die Nutzungsdauer von 6 Jahren abzuschreiben. Im Anschaffungsjahr ist die AfA nach § 7 Abs. 1 S. 4 EStG für 2 Monate (November, Dezember) anzusetzen: 45.065 € ÷ 6 × 2/12 = 1.252 €.",
  },

  "bsr-teilwert": {
    satz: "Sinkt der Wert unter die fortgeführten Anschaffungskosten, darf (Steuer) bzw. muss (HGB) abgeschrieben werden – steuerlich aber nur bei voraussichtlich dauernder Wertminderung.",
    zahlen: [["dauernd", "Voraussetzung im Steuerrecht"], ["halbe Rest-ND", "Faustregel für abnutzbares AV"]],
    punkte: [
      "**Teilwert (§ 6 Abs. 1 Nr. 1 S. 3 EStG):** Betrag, den ein Erwerber des **ganzen Betriebs** für das einzelne Wirtschaftsgut ansetzen würde, wenn er den Betrieb fortführt. Obergrenze: Wiederbeschaffungskosten.",
      "**Steuerrecht (§ 6 Abs. 1 Nr. 1 S. 2, Nr. 2 S. 2 EStG):** Teilwertabschreibung als **Wahlrecht**, nur bei **voraussichtlich dauernder** Wertminderung.",
      "**Handelsrecht (§ 253 Abs. 3 S. 5 HGB):** Anlagevermögen bei dauernder Wertminderung **Pflicht** (gemildertes Niederstwertprinzip); Finanzanlagen auch bei vorübergehender Minderung wahlweise (S. 6).",
      "**Umlaufvermögen (§ 253 Abs. 4 HGB):** **strenges Niederstwertprinzip** – Abschreibung Pflicht, auch bei vorübergehender Minderung. Steuerlich trotzdem nur bei dauernder.",
      "**Dauernd bei abnutzbarem AV:** wenn der Wert für **mindestens die Hälfte der Restnutzungsdauer** unter dem planmäßigen Restbuchwert liegt (BMF).",
      "**Wertaufholung (§ 6 Abs. 1 Nr. 1 S. 4 EStG, § 253 Abs. 5 HGB):** Fällt der Grund weg, **muss** zugeschrieben werden – höchstens bis zu den fortgeführten Anschaffungskosten.",
      "**Steuerliche Wahlrechte** dürfen unabhängig von der Handelsbilanz ausgeübt werden (§ 5 Abs. 1 S. 1 Hs. 2 EStG), Verzeichnis führen.",
    ],
    klausur: [
      "**Ware im Lager ist zum Stichtag beschädigt:** HGB Pflichtabschreibung (Umlaufvermögen), steuerlich Wahlrecht bei dauernder Minderung – bei „geringster Steuerbelastung“ ausüben.",
      "**Maschine verliert vorübergehend an Wert:** HGB keine Pflicht (AV, nicht dauernd), steuerlich keine Teilwertabschreibung.",
    ],
    fallen: [
      "Vorübergehende Wertminderungen bleiben steuerlich unberücksichtigt.",
      "Die Wertaufholung ist Pflicht, nicht Wahlrecht.",
    ],
    formulierung: "Eine Teilwertabschreibung nach § 6 Abs. 1 Nr. 2 S. 2 EStG ist zulässig, weil die Wertminderung voraussichtlich von Dauer ist. Handelsrechtlich besteht für das Umlaufvermögen nach § 253 Abs. 4 HGB eine Abschreibungspflicht.",
  },

  "bsr-abgrenzung": {
    satz: "Aufwand und Ertrag gehören in das Jahr, das sie wirtschaftlich betreffen: Vorauszahlungen werden über Rechnungsabgrenzung, Nachzahlungen über sonstige Forderungen und Verbindlichkeiten zugeordnet.",
    schema: [
      "Zahlung vor dem Stichtag, Aufwand/Ertrag danach? → aktiver/passiver RAP",
      "Aufwand/Ertrag vor dem Stichtag, Zahlung danach? → sonstige Verbindlichkeit/Forderung",
      "Betrag zeitanteilig nach Monaten berechnen",
    ],
    punkte: [
      "**Aktiver RAP (§ 250 Abs. 1 HGB, § 5 Abs. 5 S. 1 Nr. 1 EStG):** **Ausgaben vor** dem Abschlussstichtag, die **Aufwand für eine bestimmte Zeit danach** sind – z. B. Versicherung, Miete, Kfz-Steuer im Voraus.",
      "**Passiver RAP (§ 250 Abs. 2 HGB, § 5 Abs. 5 S. 1 Nr. 2 EStG):** **Einnahmen vor** dem Stichtag, die **Ertrag für eine bestimmte Zeit danach** sind – z. B. im Voraus erhaltene Miete.",
      "**Sonstige Verbindlichkeit:** Aufwand des alten Jahres, Zahlung erst im neuen Jahr – z. B. **Darlehenszinsen nachschüssig** (Zinsen Juni–Dez. → Zinsaufwand an sonstige Verbindlichkeiten).",
      "**Sonstige Forderung:** Ertrag des alten Jahres, Zahlung erst im neuen Jahr – z. B. Zinserträge, Miete für Dezember im Januar erhalten.",
      "**Disagio/Damnum (§ 250 Abs. 3 HGB):** handelsrechtlich Wahlrecht, steuerlich **Pflicht** zur Aktivierung als RAP und Auflösung über die Laufzeit.",
      "**Verbindlichkeiten:** mit dem **Erfüllungsbetrag** (§ 253 Abs. 1 S. 2 HGB, § 6 Abs. 1 Nr. 3 EStG); eine steuerliche Abzinsung gibt es seit 2023 nicht mehr.",
      "**Fremdwährung (§ 256a HGB):** Umrechnung zum Devisenkassamittelkurs am Stichtag; bei Restlaufzeit über einem Jahr gelten Anschaffungskosten- und Imparitätsprinzip.",
    ],
    klausur: [
      "**Fälligkeitsdarlehen ab 01.06., Zinsen jährlich am 01.06. des Folgejahres:** Zinsaufwand 400.000 € × 3,5 % × 7/12 = 8.167 € an sonstige Verbindlichkeiten.",
      "**Kfz-Versicherung im Dezember für 12 Monate bezahlt:** 11/12 als aktiver RAP.",
    ],
    fallen: [
      "Nachschüssige Zinsen sind kein passiver RAP, sondern eine sonstige Verbindlichkeit.",
      "RAP nur für eine **bestimmte Zeit** – bei unbestimmter Zeit keine Rechnungsabgrenzung.",
    ],
    formulierung: "Die Zinsen für Juni bis Dezember sind wirtschaftlich Aufwand des Jahres 2025 (§ 252 Abs. 1 Nr. 5 HGB). Da sie erst 2026 gezahlt werden, ist eine sonstige Verbindlichkeit (§ 246 Abs. 1 HGB) von 8.167 € zu passivieren.",
  },

  "bsr-entnahme-einlage": {
    satz: "Was den Betrieb für private Zwecke verlässt, wird mit dem Teilwert entnommen – was privat hineinkommt, wird mit dem Teilwert eingelegt; beides ändert den Gewinn nicht unmittelbar, wohl aber die Bewertung.",
    zahlen: [["Teilwert", "Entnahme (§ 6 Abs. 1 Nr. 4)"], ["Teilwert, max. AK", "Einlage innerhalb 3 Jahren (Nr. 5)"], ["1 %", "Bruttolistenpreis je Monat (Pkw > 50 % betrieblich)"]],
    punkte: [
      "**Entnahme (§ 4 Abs. 1 S. 2 EStG):** Wirtschaftsgüter (Gegenstände, Geld, **Nutzungen und Leistungen**) für betriebsfremde Zwecke.",
      "**Bewertung (§ 6 Abs. 1 Nr. 4 S. 1 EStG):** **Teilwert** – bei Waren in der Regel der aktuelle Einkaufspreis. Die Umsatzsteuer auf die Entnahme ist ebenfalls Entnahme (§ 12 Nr. 3 EStG).",
      "**Nutzungsentnahme:** mit den **anteiligen Kosten** (Aufwand, der auf die private Nutzung entfällt).",
      "**Pkw-Privatnutzung (§ 6 Abs. 1 Nr. 4 S. 2 EStG):** bei mehr als 50 % betrieblicher Nutzung **1 % des inländischen Bruttolistenpreises** je Monat (auf volle 100 € abgerundet); Elektrofahrzeuge 0,25 % bzw. 0,5 %; alternativ Fahrtenbuch.",
      "**Einlage (§ 4 Abs. 1 S. 8 EStG):** Wirtschaftsgüter, die der Steuerpflichtige dem Betrieb zuführt – auch **Zahlungen betrieblicher Rechnungen vom Privatkonto**.",
      "**Bewertung (§ 6 Abs. 1 Nr. 5 EStG):** **Teilwert**, höchstens die (fortgeführten) Anschaffungskosten, wenn das WG innerhalb der letzten **3 Jahre** angeschafft wurde.",
      "**Buchung:** Entnahme: Privatentnahmen an Unentgeltliche Wertabgaben + Umsatzsteuer; Einlage: Wirtschaftsgut (+ ggf. Vorsteuer) an Privateinlagen.",
    ],
    klausur: [
      "**Rechnung für Mähroboter vom Privatkonto bezahlt:** Wareneinkauf und Vorsteuer an Privateinlagen – Gewinnauswirkung über den Wareneinkauf.",
      "**Makler für das Betriebsgrundstück privat bezahlt:** Einlage; Maklerkosten bleiben Anschaffungsnebenkosten.",
      "**Firmenwagen auch privat genutzt:** 1-%-Regel als Nutzungsentnahme, Umsatzsteuer darauf nach § 3 Abs. 9a Nr. 1 UStG.",
    ],
    fallen: [
      "Entnahmen und Einlagen sind keine Betriebseinnahmen bzw. -ausgaben.",
      "Bei Warenentnahmen nicht den Verkaufspreis, sondern den Teilwert (Einkaufspreis) ansetzen.",
    ],
    formulierung: "Die Bezahlung der Rechnung vom privaten Bankkonto stellt eine Einlage i. S. d. § 4 Abs. 1 S. 8 EStG dar, die nach § 6 Abs. 1 Nr. 5 EStG mit dem Teilwert (= Nennwert des Geldes) zu bewerten ist.",
  },
};

export const KLAUSUR_BSR = {
  titel: "BilStR-Klausur: so holst du die Punkte",
  aufbau: [
    "**180 Minuten, zwei Teile:** Teil I Buchführung (ca. 45 Min.: Warenkonten fortführen und abschließen, Buchungssätze, Wareneinsatz/Rohgewinn/Aufschlagsatz) und Teil II Einzelsachverhalte (ca. 135 Min.).",
    "**Teil II pro Sachverhalt:** Würdigung mit Handels- und Steuerrecht (Normen und Richtlinien) → Bilanzansatz → Bewertung → Berichtigungsbuchung ins Journal → Gewinnauswirkung lt. GuV und lt. BVV.",
    "**Schwerpunkte nach Zeit:** Grundstückserwerb (bis zu 70 Min.), Anschaffung beweglicher WG mit AfA/GWG (40–45 Min.), Firmenwagen (ca. 40 Min.), kleinere Fälle (Teilwert, Abgrenzung, Waren, Gutschrift).",
  ],
  top: ["bsr-grundstueck", "bsr-ak", "bsr-afa", "bsr-zurechnung", "bsr-abgrenzung", "warenkonten", "warenunterkonten"],
  tipps: [
    "Immer HGB und EStG zusammen zitieren – z. B. § 255 Abs. 1 HGB i. V. m. § 6 Abs. 1 Nr. 1 EStG.",
    "Rechenwege nachvollziehbar zeigen; Beträge dürfen kaufmännisch gerundet werden.",
    "Jede Buchung mit Gewinnauswirkung – GuV und BVV müssen übereinstimmen.",
  ],
};
