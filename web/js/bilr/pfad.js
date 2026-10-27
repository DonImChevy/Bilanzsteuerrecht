// Lernpfade Bilanzrecht – Teil I (Buchführung) und Teil II (Bilanzierung und Bewertung).
// Jeder Block ist in sich geschlossen: Seine Lernkarten erklären alles, was seine Fragen abfragen.
// Format wie js/ust/pfad.js: Karten {art, titel, text} (**fett**, „• “ = Liste), Fragen {art: "wahl" | "zahl", …}.

export const PFAD_BSR1 = [
  {
    id: "b1-pflicht", teil: 1, titel: "Wer muss Bücher führen?", kurz: "§§ 238, 241a HGB · §§ 140, 141 AO", icon: "📚", normen: ["HGB 238", "HGB 241a", "AO 140", "AO 141"],
    karten: [
      { art: "merksatz", titel: "Buchführung in einem Satz", text: "Buchführung ist die **lückenlose, planmäßige und ordnungsgemäße Aufzeichnung aller Geschäftsvorfälle** eines Unternehmens – zeitlich geordnet im **Grundbuch** (Journal) und sachlich geordnet auf den **Konten** des Hauptbuchs. Ein **Geschäftsvorfall** ist alles, was das Vermögen des Unternehmens verändert: Waren verkaufen, Miete zahlen, tanken." },
      { art: "erklaerung", titel: "Pflicht nach Handelsrecht", text: "• **Jeder Kaufmann** muss Bücher führen (§ 238 Abs. 1 HGB).\n• Kaufmann ist, wer ein **Handelsgewerbe** betreibt (§ 1 HGB) – also einen Gewerbebetrieb, der nach Art und Umfang einen kaufmännisch eingerichteten Geschäftsbetrieb braucht. Kleingewerbetreibende werden durch **Eintragung** ins Handelsregister Kaufmann (§ 2 HGB); OHG, KG, GmbH und AG sind es immer.\n• **Befreiung** (§ 241a HGB): Einzelkaufleute mit an **zwei aufeinanderfolgenden** Stichtagen höchstens **800.000 € Umsatz und 80.000 € Jahresüberschuss**." },
      { art: "erklaerung", titel: "Pflicht nach Steuerrecht", text: "• **§ 140 AO – abgeleitet**: Wer schon nach HGB Bücher führen muss, muss das auch fürs Finanzamt.\n• **§ 141 AO – originär**: Gewerbetreibende und Land- und Forstwirte, die nicht schon nach § 140 verpflichtet sind, müssen buchen, wenn **Umsatz über 800.000 €** oder **Gewinn über 80.000 €** liegt. Es genügt, dass **eine** Grenze überschritten ist. Die Pflicht beginnt mit dem Wirtschaftsjahr, das auf die **Mitteilung des Finanzamts** folgt (§ 141 Abs. 2 AO).\n• **Freiberufler** (Ärzte, Anwälte) sind keine Kaufleute und fallen nicht unter § 141 AO – sie dürfen ihren Gewinn mit der Einnahmen-Überschuss-Rechnung ermitteln." },
      { art: "beispiel", titel: "Durchgespielt", text: "• GmbH mit 100.000 € Umsatz → Kaufmann kraft Rechtsform → **Buchführungspflicht** (§ 238 HGB, § 140 AO).\n• Einzelhändler, nicht eingetragen, kein kaufmännischer Betrieb nötig, Gewinn 95.000 € → nicht nach HGB, aber nach **§ 141 AO** (Gewinn > 80.000 €).\n• Steuerberaterin mit 300.000 € Gewinn → **keine** Buchführungspflicht (freier Beruf)." },
    ],
    fragen: [
      { art: "wahl", frage: "Wer ist nach § 238 Abs. 1 HGB zur Buchführung verpflichtet?", optionen: ["Jeder Kaufmann", "Jeder Steuerpflichtige", "Nur Kapitalgesellschaften", "Jeder Freiberufler"], richtig: 0, erkl: "§ 238 Abs. 1 S. 1 HGB: Jeder Kaufmann ist verpflichtet, Bücher zu führen." },
      { art: "wahl", frage: "Ein Gewerbetreibender (kein Kaufmann) hat 90.000 € Gewinn und 500.000 € Umsatz. Muss er Bücher führen?", optionen: ["Ja, nach § 141 AO – Gewinngrenze überschritten", "Nein, weil der Umsatz unter 800.000 € liegt", "Nein, weil er kein Kaufmann ist", "Nur wenn er sich eintragen lässt"], richtig: 0, erkl: "Für § 141 AO genügt es, wenn eine Grenze überschritten ist: Gewinn 90.000 € > 80.000 €." },
      { art: "wahl", frage: "Eine Zahnärztin erzielt 250.000 € Gewinn. Ist sie buchführungspflichtig?", optionen: ["Nein – freier Beruf, kein Kaufmann, nicht von § 141 AO erfasst", "Ja, nach § 141 AO", "Ja, nach § 238 HGB", "Nur ab 800.000 € Umsatz"], richtig: 0, erkl: "§ 141 AO gilt nur für Gewerbetreibende und Land- und Forstwirte; Freiberufler sind keine Kaufleute." },
      { art: "wahl", frage: "Was ist ein Geschäftsvorfall?", optionen: ["Ein Vorgang, der das Vermögen des Unternehmens verändert", "Jedes Gespräch mit einem Kunden", "Nur ein Verkauf von Waren", "Nur Vorgänge über 250 €"], richtig: 0, erkl: "Geschäftsvorfälle verändern Vermögen oder Schulden – z. B. Verkauf, Mietzahlung, Tanken." },
    ],
  },
  {
    id: "b1-inventur", teil: 1, titel: "Inventur, Inventar, Bilanz", kurz: "§§ 240, 242, 247, 257 HGB", icon: "📋", normen: ["HGB 240", "HGB 242", "HGB 247", "HGB 257"],
    karten: [
      { art: "merksatz", titel: "Drei Begriffe – drei Schritte", text: "• **Inventur** = die **Tätigkeit**: alles zählen, messen, wiegen und bewerten (§ 240 HGB).\n• **Inventar** = das **Ergebnis**: ein ausführliches Verzeichnis aller Vermögensgegenstände und Schulden nach Art, Menge und Wert.\n• **Bilanz** = die **Kurzfassung** in Kontoform: links Vermögen, rechts Kapital (§ 242 HGB)." },
      { art: "erklaerung", titel: "Aufbau der Bilanz", text: "• **Aktiva** (links) zeigen, **wofür** das Geld verwendet wurde: **Anlagevermögen** (soll dem Betrieb dauernd dienen, z. B. Gebäude, Maschinen, § 247 Abs. 2 HGB) und **Umlaufvermögen** (Waren, Forderungen, Bank, Kasse).\n• **Passiva** (rechts) zeigen, **woher** das Geld kommt: **Eigenkapital** und **Fremdkapital** (Schulden).\n• Bilanzgleichung: **Aktiva = Passiva**, also Vermögen = Eigenkapital + Fremdkapital." },
      { art: "beispiel", titel: "Eigenkapital ausrechnen", text: "Vermögen 180.000 €, Schulden 110.000 € → Eigenkapital = **70.000 €** (Vermögen − Fremdkapital). Das Eigenkapital ist also der „Rest“, der dem Unternehmer gehört." },
      { art: "erklaerung", titel: "Wie lange aufbewahren? (§ 257 HGB)", text: "• Bücher, Inventare, Bilanzen: **10 Jahre**\n• Buchungsbelege (Rechnungen, Kassenzettel): **8 Jahre** (seit 2025)\n• Empfangene und abgesandte Handelsbriefe: **6 Jahre**" },
    ],
    fragen: [
      { art: "wahl", frage: "Was ist die Inventur?", optionen: ["Die körperliche Bestandsaufnahme (Zählen, Messen, Bewerten)", "Das Verzeichnis aller Vermögensgegenstände", "Die Kurzfassung in Kontoform", "Die Gewinnermittlung"], richtig: 0, erkl: "Inventur = Tätigkeit; Inventar = Ergebnis; Bilanz = Kurzfassung." },
      { art: "zahl", frage: "Vermögen 250.000 €, Schulden 140.000 €. Wie hoch ist das Eigenkapital (in €)?", cent: 11000000, erkl: "Eigenkapital = Vermögen − Fremdkapital = 250.000 € − 140.000 € = 110.000 €." },
      { art: "wahl", frage: "Was steht auf der Passivseite der Bilanz?", optionen: ["Eigenkapital und Fremdkapital", "Anlage- und Umlaufvermögen", "Aufwendungen und Erträge", "Entnahmen und Einlagen"], richtig: 0, erkl: "Passiva zeigen die Mittelherkunft: Eigen- und Fremdkapital." },
      { art: "wahl", frage: "Wie lange sind Buchungsbelege aufzubewahren?", optionen: ["8 Jahre", "10 Jahre", "6 Jahre", "5 Jahre"], richtig: 0, erkl: "Seit 2025 gilt für Buchungsbelege eine Frist von 8 Jahren; Bücher und Bilanzen 10 Jahre." },
    ],
  },
  {
    id: "b1-veraenderung", teil: 1, titel: "Wie sich die Bilanz verändert", kurz: "Die vier Bilanzveränderungen", icon: "⇄", normen: [],
    karten: [
      { art: "merksatz", titel: "Jeder Vorgang ändert zwei Posten", text: "Jeder Geschäftsvorfall verändert **mindestens zwei** Bilanzposten. Weil beide Seiten immer gleich groß sein müssen, gibt es genau **vier Möglichkeiten**." },
      { art: "erklaerung", titel: "Die vier Arten", text: "• **Aktivtausch**: Nur die Aktivseite ändert sich, Bilanzsumme gleich – Ware wird **bar** gekauft (Waren ↑, Kasse ↓).\n• **Passivtausch**: Nur die Passivseite ändert sich – eine Lieferantenschuld wird in ein **Darlehen** umgewandelt.\n• **Aktiv-Passiv-Mehrung**: Beide Seiten steigen – Ware wird **auf Ziel** gekauft (Waren ↑, Verbindlichkeiten ↑).\n• **Aktiv-Passiv-Minderung**: Beide Seiten sinken – eine Rechnung wird per **Bank bezahlt** (Bank ↓, Verbindlichkeiten ↓)." },
      { art: "beispiel", titel: "Eselsbrücke", text: "Frag dich: **Welche Seite** ist betroffen – nur links, nur rechts oder beide? Bei „beide“: Wird die Bilanz **länger** (Mehrung) oder **kürzer** (Minderung)?" },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Händler kauft Waren auf Ziel. Welche Bilanzveränderung liegt vor?", optionen: ["Aktiv-Passiv-Mehrung", "Aktivtausch", "Passivtausch", "Aktiv-Passiv-Minderung"], richtig: 0, erkl: "Waren (Aktiva) und Verbindlichkeiten (Passiva) steigen – die Bilanzsumme wird größer." },
      { art: "wahl", frage: "Bargeld wird auf das Bankkonto eingezahlt. Welche Art liegt vor?", optionen: ["Aktivtausch", "Aktiv-Passiv-Mehrung", "Passivtausch", "Aktiv-Passiv-Minderung"], richtig: 0, erkl: "Bank ↑, Kasse ↓ – beides Aktivposten, die Summe bleibt gleich." },
      { art: "wahl", frage: "Eine Lieferantenschuld wird per Banküberweisung bezahlt. Welche Art liegt vor?", optionen: ["Aktiv-Passiv-Minderung", "Aktivtausch", "Passivtausch", "Aktiv-Passiv-Mehrung"], richtig: 0, erkl: "Bank (Aktiva) und Verbindlichkeiten (Passiva) sinken." },
      { art: "wahl", frage: "Eine Lieferantenschuld wird in ein langfristiges Darlehen umgewandelt. Welche Art?", optionen: ["Passivtausch", "Aktivtausch", "Aktiv-Passiv-Minderung", "Aktiv-Passiv-Mehrung"], richtig: 0, erkl: "Nur die Passivseite ändert sich: Verbindlichkeiten ↓, Darlehen ↑." },
    ],
  },
  {
    id: "b1-konten", teil: 1, titel: "Bestandskonten & Buchungssatz", kurz: "Von der Bilanz zu Soll an Haben", icon: "🗂️", normen: [],
    karten: [
      { art: "merksatz", titel: "Warum überhaupt Konten?", text: "Die **Bilanz** ist ein **Foto** des Betriebs an einem Stichtag: links das Vermögen (**Aktiva**), rechts, woher das Geld kommt (**Passiva**).\nIm Laufe des Jahres passiert aber ständig etwas – Rechnungen werden bezahlt, Kunden zahlen, Waren kommen. Nach jedem Vorgang eine neue Bilanz zu schreiben, wäre viel zu aufwendig.\nDeshalb **zerlegt** man die Bilanz: **Jeder Bilanzposten bekommt ein eigenes Konto**, auf dem alle Veränderungen gesammelt werden.", grafik: { bilanz: { aktiv: [["BGA (Möbel)", 10000], ["Bank", 5000]], passiv: [["Eigenkapital", 9000], ["Verbindlichkeiten", 6000]] } } },
      { art: "erklaerung", titel: "Das Konto ist ein „T“", text: "Ein Konto sieht aus wie ein großes **T**: Oben steht der Name, darunter gibt es **zwei Seiten**.\n• Die **linke** Seite heißt **Soll**.\n• Die **rechte** Seite heißt **Haben**.\n„Soll“ und „Haben“ sind **nur Namen für links und rechts** – sie bedeuten nicht „man soll“ oder „man hat“. Du musst dir also nur merken: **Soll = links, Haben = rechts.**" },
      { art: "erklaerung", titel: "Aktivkonto: Der Bestand steht links – wie in der Bilanz", text: "Die **Bank** steht in der Bilanz **links** (Aktiva). Darum steht ihr **Anfangsbestand** auch im Konto **links, im Soll**.\nDie Logik ist ganz einfach: **Was dazukommt, kommt auf dieselbe Seite wie der Bestand** – also ins **Soll**. **Was weggeht, kommt auf die andere Seite** – ins **Haben**.\nAm Ende rechnet man den **Schlussbestand (SB)** aus und schreibt ihn auf die kleinere Seite, damit **beide Seiten gleich groß** sind: 7.000 € − 1.500 € = **5.500 €**.", grafik: { konten: [{ name: "Bank", art: "aktiv", soll: [["AB", 5000], ["+ Darlehen erhalten", 2000]], haben: [["− Lieferant bezahlt", 1500], ["SB", 5500]] }] } },
      { art: "erklaerung", titel: "Passivkonto: Der Bestand steht rechts – wie in der Bilanz", text: "Die **Verbindlichkeiten** stehen in der Bilanz **rechts** (Passiva). Darum steht ihr **Anfangsbestand** im Konto **rechts, im Haben**.\nGleiche Logik, nur gespiegelt: **Neue Schulden** kommen dazu → **Haben**. **Schulden werden bezahlt** → sie gehen weg → **Soll**.\nSchlussbestand: 9.000 € − 1.500 € = **7.500 €**, diesmal auf der linken Seite.", grafik: { konten: [{ name: "Verbindlichkeiten", art: "passiv", soll: [["− Rechnung bezahlt", 1500], ["SB", 7500]], haben: [["AB", 6000], ["+ Wareneinkauf auf Ziel", 3000]] }] } },
      { art: "merksatz", titel: "Die eine Regel für alle Bestandskonten", text: "**Zugang auf die Seite des Anfangsbestands, Abgang auf die Gegenseite.**\n• **Aktivkonto** (Bank, Kasse, Waren, Forderungen, BGA): AB und Zugänge im **Soll**, Abgänge im **Haben**, Schlussbestand im **Haben**.\n• **Passivkonto** (Eigenkapital, Darlehen, Verbindlichkeiten): AB und Zugänge im **Haben**, Abgänge im **Soll**, Schlussbestand im **Soll**.\nWer weiß, wo ein Posten in der Bilanz steht, weiß also sofort, wie sein Konto funktioniert." },
      { art: "erklaerung", titel: "Vom Konto zum Buchungssatz", text: "Jeder Vorgang betrifft **mindestens zwei Konten** – und der Betrag steht **einmal im Soll und einmal im Haben**.\nBeispiel: Wir bezahlen eine Lieferantenrechnung über **1.500 €** per Bank.\n• Verbindlichkeiten (passiv) nehmen **ab** → **Soll**.\n• Bank (aktiv) nimmt **ab** → **Haben**.\nIm Konto schreibt man jeweils das **Gegenkonto** dazu. Der **Buchungssatz** ist nur die Kurzform davon – erst Soll, dann „an“, dann Haben:\n**Verbindlichkeiten an Bank 1.500 €**", grafik: { konten: [{ name: "Verbindlichkeiten", art: "passiv", soll: [["Bank", 1500]], haben: [] }, { name: "Bank", art: "aktiv", soll: [], haben: [["Verbindlichkeiten", 1500]] }] } },
      { art: "erklaerung", titel: "Der zusammengesetzte Buchungssatz", text: "Manchmal sind **mehr als zwei Konten** betroffen. Dann stehen auf einer Seite (oder auf beiden) **mehrere Konten** – das ist ein **zusammengesetzter Buchungssatz**. Die mit „/“ getrennten Konten gehören zur selben Seite.\nBeispiel: Wir kaufen eine Maschine für **10.000 €**, zahlen **4.000 €** per Bank, den **Rest auf Ziel**.\n• Maschinen (aktiv) nehmen **zu** → **Soll** 10.000 €\n• Bank (aktiv) nimmt **ab** → **Haben** 4.000 €\n• Verbindlichkeiten (passiv) nehmen **zu** → **Haben** 6.000 €\n→ **Maschinen 10.000 an Bank 4.000 / Verbindlichkeiten 6.000**\nDie Regel bleibt: **Summe Soll = Summe Haben** (10.000 € = 4.000 € + 6.000 €). Ein **einfacher** Buchungssatz hat dagegen genau ein Soll- und ein Habenkonto.", grafik: { konten: [{ name: "Maschinen", art: "aktiv", soll: [["Bank / Verbindl.", 10000]], haben: [] }, { name: "Bank", art: "aktiv", soll: [], haben: [["Maschinen", 4000]] }, { name: "Verbindlichkeiten", art: "passiv", soll: [], haben: [["Maschinen", 6000]] }] } },
      { art: "beispiel", titel: "So gehst du bei jeder Buchung vor", text: "„Wir kaufen einen Schreibtisch für 600 € und zahlen per Bank.“\n1. **Welche Konten?** Betriebs- und Geschäftsausstattung (BGA) und Bank.\n2. **Aktiv oder passiv?** Beide aktiv (Vermögen, links in der Bilanz).\n3. **Zugang oder Abgang?** BGA nimmt **zu**, Bank nimmt **ab**.\n4. **Soll oder Haben?** Zugang Aktivkonto → Soll; Abgang Aktivkonto → Haben.\n→ **BGA an Bank 600 €**" },
    ],
    fragen: [
      { art: "wahl", frage: "Auf welcher Seite bucht man den Zugang auf einem Aktivkonto?", optionen: ["Soll", "Haben", "Beide Seiten", "Gar nicht – nur der Endbestand"], richtig: 0, erkl: "Aktivkonten: Anfangsbestand und Zugänge im Soll." },
      { art: "wahl", frage: "Ein Darlehen wird aufgenommen und auf dem Bankkonto gutgeschrieben. Buchungssatz?", optionen: ["Bank an Darlehensverbindlichkeiten", "Darlehensverbindlichkeiten an Bank", "Bank an Eigenkapital", "Kasse an Bank"], richtig: 0, erkl: "Bank (Aktiv) nimmt zu → Soll; Darlehen (Passiv) nimmt zu → Haben." },
      { art: "wahl", frage: "Eine Lieferantenrechnung wird per Bank bezahlt. Buchungssatz?", optionen: ["Verbindlichkeiten aus L.u.L. an Bank", "Bank an Verbindlichkeiten aus L.u.L.", "Waren an Bank", "Bank an Kasse"], richtig: 0, erkl: "Verbindlichkeiten (Passiv) nehmen ab → Soll; Bank (Aktiv) nimmt ab → Haben." },
      { art: "wahl", frage: "Wo steht der Anfangsbestand eines Passivkontos?", optionen: ["Im Haben", "Im Soll", "Auf beiden Seiten", "Nur im Schlussbilanzkonto"], richtig: 0, erkl: "Passivkonten spiegeln die Bilanz: Kapital steht rechts, also im Haben." },
      { art: "zahl", frage: "Konto Bank: Anfangsbestand 3.000 €, Zugänge 1.200 €, Abgänge 800 €. Wie hoch ist der Schlussbestand (in €)?", cent: 340000, erkl: "3.000 € + 1.200 € − 800 € = 3.400 € – er steht im Haben, damit beide Seiten gleich groß sind." },
      { art: "wahl", frage: "Warum steht der Anfangsbestand eines Aktivkontos im Soll?", optionen: ["Weil Aktiva in der Bilanz links stehen – und Soll ist die linke Seite", "Weil das Unternehmen den Betrag noch zahlen soll", "Weil im Soll immer Schulden stehen", "Das ist reiner Zufall"], richtig: 0, erkl: "Das Konto übernimmt die Seite aus der Bilanz: Aktiva links = Soll." },
      { art: "wahl", frage: "Waren für 3.000 € werden gekauft: 1.000 € bar, der Rest auf Ziel. Welcher Buchungssatz ist richtig?", optionen: ["Waren 3.000 an Kasse 1.000 / Verbindlichkeiten 2.000", "Waren 3.000 an Verbindlichkeiten 3.000", "Kasse 1.000 / Verbindlichkeiten 2.000 an Waren 3.000", "Waren 1.000 / Verbindlichkeiten 2.000 an Kasse 3.000"], richtig: 0, erkl: "Waren nehmen zu (Soll 3.000 €); Kasse nimmt ab (Haben 1.000 €), Verbindlichkeiten nehmen zu (Haben 2.000 €). Summe Soll = Summe Haben." },
      { art: "wahl", frage: "Was ist ein zusammengesetzter Buchungssatz?", optionen: ["Ein Buchungssatz mit mehr als zwei Konten", "Zwei Buchungssätze am selben Tag", "Ein Buchungssatz, bei dem Soll und Haben verschieden hoch sind", "Ein Buchungssatz nur mit Erfolgskonten"], richtig: 0, erkl: "Auf mindestens einer Seite stehen mehrere Konten – die Summen von Soll und Haben sind trotzdem gleich." },
      { art: "wahl", frage: "Auf einem Passivkonto steht ein Betrag im Soll. Was bedeutet das?", optionen: ["Die Schuld bzw. das Kapital hat abgenommen", "Die Schuld hat zugenommen", "Das ist der Anfangsbestand", "Ein Fehler – Passivkonten haben kein Soll"], richtig: 0, erkl: "Passivkonten: Bestand und Zugänge im Haben, Abgänge im Soll." },
    ],
  },
  {
    id: "b1-buecher", teil: 1, titel: "Grundbuch, Hauptbuch, Nebenbücher", kurz: "§§ 238, 239 HGB · § 146 AO", icon: "📒", normen: ["HGB 238", "HGB 239", "AO 146"],
    karten: [
      { art: "merksatz", titel: "Keine Buchung ohne Beleg", text: "Jeder Geschäftsvorfall braucht einen **Beleg** (Rechnung, Kontoauszug, Quittung; notfalls ein selbst erstellter Eigenbeleg). Vom Beleg geht es in zwei Ordnungen:\n• **Grundbuch (Journal)**: **zeitlich** – Datum, Beleg, Buchungssatz, Betrag.\n• **Hauptbuch**: **sachlich** – alle **Sachkonten** (Bestands- und Erfolgskonten)." },
      { art: "erklaerung", titel: "Nebenbücher", text: "Nebenbücher halten **Einzelheiten** fest, die im Hauptbuch nur als Summe stehen:\n• **Kontokorrent**: je Kunde (Debitoren) und je Lieferant (Kreditoren)\n• **Anlagenkartei**: jedes Anlagegut mit Anschaffungskosten und AfA\n• **Lohnkonten**, **Lagerbuch**" },
      { art: "erklaerung", titel: "Ordnungsregeln (§ 239 HGB, § 146 AO)", text: "Buchungen müssen **vollständig, richtig, zeitgerecht und geordnet** sein.\n• **Kasseneinnahmen und -ausgaben täglich** aufzeichnen.\n• **Radierverbot**: Nichts so ändern, dass der ursprüngliche Inhalt nicht mehr erkennbar ist (§ 239 Abs. 3 HGB).\n• Die **Kasse** darf **nie ins Minus** gehen – ein negativer Kassenbestand ist ein Buchführungsmangel." },
      { art: "beispiel", titel: "Kassenbericht – rückwärts gerechnet", text: "Wer seine Bareinnahmen nicht einzeln aufzeichnet, ermittelt sie am Abend rückwärts:\nKassenendbestand 800 € + Ausgaben 300 € + Privatentnahme 200 € + Einzahlung auf die Bank 1.000 € − Anfangsbestand 500 € = **Tageseinnahmen 1.800 €**." },
    ],
    fragen: [
      { art: "wahl", frage: "In welchem Buch stehen alle Geschäftsvorfälle in zeitlicher Reihenfolge?", optionen: ["Im Grundbuch (Journal)", "Im Hauptbuch", "Im Kontokorrent", "Im Inventar"], richtig: 0, erkl: "Grundbuch = zeitliche Ordnung; Hauptbuch = sachliche Ordnung." },
      { art: "wahl", frage: "Wo findet man, wie viel ein bestimmter Kunde noch schuldet?", optionen: ["Im Kontokorrent (Debitoren)", "Im Grundbuch", "In der GuV", "Im Kassenbuch"], richtig: 0, erkl: "Das Kontokorrent führt je Kunde ein eigenes Konto." },
      { art: "zahl", frage: "Kassenbericht: Endbestand 600 €, Ausgaben 150 €, Privatentnahme 100 €, Bankeinzahlung 500 €, Anfangsbestand 400 €. Tageseinnahmen (in €)?", cent: 95000, erkl: "600 + 150 + 100 + 500 − 400 = 950 €." },
      { art: "wahl", frage: "Wie oft sind Kasseneinnahmen und -ausgaben aufzuzeichnen?", optionen: ["Täglich", "Wöchentlich", "Monatlich", "Zum Jahresabschluss"], richtig: 0, erkl: "§ 146 Abs. 1 S. 2 AO." },
    ],
  },
  {
    id: "b1-deuten", teil: 1, titel: "Buchungssätze deuten", kurz: "Rückwärts denken", icon: "🔍", normen: [],
    karten: [
      { art: "merksatz", titel: "Den Satz zurückübersetzen", text: "Beim **Deuten** liest du einen fertigen Buchungssatz und erklärst, **welcher Geschäftsvorfall** dahintersteckt." },
      { art: "erklaerung", titel: "Die sechs Fragen", text: "**Aktivkonten**: Kasse, Bank, Waren, Forderungen, Maschinen, BGA. **Passivkonten**: Eigenkapital, Darlehen, Verbindlichkeiten. (L.u.L. = Lieferungen und Leistungen)\n1. Welches Konto steht **vorn** (im Soll)?\n2. Ist es ein **Aktiv- oder Passivkonto**?\n3. Also **Zugang oder Abgang**? (Aktiv im Soll = Zugang; Passiv im Soll = Abgang)\n4. Welches Konto steht **hinten** (im Haben)?\n5. Aktiv- oder Passivkonto?\n6. Also Zugang oder Abgang? (Aktiv im Haben = Abgang; Passiv im Haben = Zugang)" },
      { art: "beispiel", titel: "Drei Beispiele", text: "• **Waren an Verbindlichkeiten**: Waren nehmen zu, Schulden nehmen zu → Wareneinkauf **auf Ziel**.\n• **Bank an Kasse**: Bank nimmt zu, Kasse nimmt ab → **Bareinzahlung** aufs Bankkonto.\n• **Verbindlichkeiten an Waren**: Schulden nehmen ab, Waren nehmen ab → **Rücksendung** an den Lieferer." },
    ],
    fragen: [
      { art: "wahl", frage: "Was bedeutet „Kasse an Bank 500 €“?", optionen: ["500 € wurden vom Bankkonto abgehoben", "500 € wurden bar eingezahlt", "Ein Kunde hat bar bezahlt", "Ein Darlehen wurde aufgenommen"], richtig: 0, erkl: "Kasse (Aktiv) im Soll = Zugang; Bank (Aktiv) im Haben = Abgang → Barabhebung." },
      { art: "wahl", frage: "Was bedeutet „Bank an Forderungen aus L.u.L.“?", optionen: ["Ein Kunde hat seine Rechnung überwiesen", "Wir haben eine Rechnung bezahlt", "Wir haben Waren auf Ziel verkauft", "Wir haben ein Darlehen getilgt"], richtig: 0, erkl: "Bank nimmt zu, Forderungen nehmen ab → der Kunde zahlt." },
      { art: "wahl", frage: "Was bedeutet „Darlehensverbindlichkeiten an Bank“?", optionen: ["Ein Darlehen wurde per Bank getilgt", "Ein Darlehen wurde aufgenommen", "Ein Kunde hat gezahlt", "Bargeld wurde eingezahlt"], richtig: 0, erkl: "Passivkonto im Soll = Abgang (Schuld sinkt); Bank im Haben = Abgang → Tilgung." },
      { art: "wahl", frage: "Ein Aktivkonto steht im Haben. Was bedeutet das?", optionen: ["Abgang", "Zugang", "Anfangsbestand", "Eröffnung"], richtig: 0, erkl: "Aktivkonten: Zugänge im Soll, Abgänge im Haben." },
    ],
  },
  {
    id: "b1-erfolg", teil: 1, titel: "Aufwand, Ertrag & GuV", kurz: "Erfolgskonten", icon: "📈", normen: ["HGB 242"],
    karten: [
      { art: "merksatz", titel: "Erfolgskonten sind Unterkonten des Eigenkapitals", text: "**Aufwendungen** (Miete, Löhne, Zinsen) mindern das Eigenkapital, **Erträge** (Umsatzerlöse, Zinserträge) erhöhen es. Damit nicht jede Kleinigkeit direkt aufs Eigenkapital gebucht wird, sammelt man sie auf eigenen **Erfolgskonten**." },
      { art: "erklaerung", titel: "Buchungsregeln", text: "• **Aufwandskonten**: Buchung im **Soll** (wie eine Minderung des Eigenkapitals).\n• **Ertragskonten**: Buchung im **Haben** (wie eine Mehrung des Eigenkapitals).\n• Am Jahresende werden alle Erfolgskonten über die **Gewinn- und Verlustrechnung (GuV)** abgeschlossen (§ 242 Abs. 2 HGB); der Saldo der GuV ist der **Gewinn oder Verlust** und geht ins Eigenkapital." },
      { art: "beispiel", titel: "Beispiele", text: "• Miete für den Laden per Bank: **Mietaufwand an Bank**\n• Zinsgutschrift der Bank: **Bank an Zinserträge**\n• GuV: Erträge 90.000 €, Aufwendungen 65.000 € → **Gewinn 25.000 €** → GuV an Eigenkapital" },
    ],
    fragen: [
      { art: "wahl", frage: "Wo werden Aufwendungen gebucht?", optionen: ["Im Soll des Aufwandskontos", "Im Haben des Aufwandskontos", "Direkt im Haben des Eigenkapitals", "Im Schlussbilanzkonto"], richtig: 0, erkl: "Aufwand mindert das Eigenkapital – daher Buchung im Soll." },
      { art: "wahl", frage: "Die Bank schreibt 120 € Zinsen gut. Buchungssatz?", optionen: ["Bank an Zinserträge", "Zinsaufwand an Bank", "Zinserträge an Bank", "Bank an Eigenkapital"], richtig: 0, erkl: "Bank nimmt zu (Soll), Ertrag im Haben." },
      { art: "zahl", frage: "Erträge 140.000 €, Aufwendungen 112.000 €. Wie hoch ist der Gewinn (in €)?", cent: 2800000, erkl: "Gewinn = Erträge − Aufwendungen = 28.000 €." },
      { art: "wahl", frage: "Worüber werden Erfolgskonten abgeschlossen?", optionen: ["Über die GuV", "Über das Schlussbilanzkonto", "Über die Privatkonten", "Gar nicht – sie laufen weiter"], richtig: 0, erkl: "Erfolgskonten → GuV → Eigenkapital." },
    ],
  },
  {
    id: "b1-grundbegriffe", teil: 1, titel: "Auszahlung, Ausgabe, Aufwand, Kosten", kurz: "Die Grundbegriffe", icon: "🔤", normen: ["HGB 242"],
    karten: [
      { art: "merksatz", titel: "Vier Paare – vier Ebenen", text: "• **Auszahlung / Einzahlung**: Bargeld und Bankguthaben fließen ab oder zu.\n• **Ausgabe / Einnahme**: das **Geldvermögen** ändert sich (Zahlungsmittel + Forderungen − Verbindlichkeiten).\n• **Aufwand / Ertrag**: **Werteverzehr bzw. -zuwachs** des Jahres – mindert oder erhöht das **Eigenkapital** (GuV).\n• **Kosten / Leistungen**: der **betriebsbedingte** Werteverzehr (Kostenrechnung)." },
      { art: "erklaerung", titel: "Wo sie auseinanderfallen", text: "• **Wareneinkauf auf Ziel**: Ausgabe (Verbindlichkeit), aber noch **keine Auszahlung**.\n• **Maschine bar gekauft**: Auszahlung, aber **kein Aufwand** – nur Geld wird zu Maschine.\n• **AfA**: **Aufwand ohne Auszahlung**.\n• **Darlehen tilgen**: Auszahlung, aber **weder Ausgabe noch Aufwand** (Schuld sinkt gleich mit). Nur die **Zinsen** sind Aufwand.\n• **Spende**: Aufwand, aber **keine Kosten** (nicht betriebsbedingt)." },
      { art: "beispiel", titel: "Bestand oder Strom?", text: "**Bestandsgrößen** gelten für einen **Stichtag** und stehen in der **Bilanz** (Kasse, Forderungen).\n**Stromgrößen** gelten für einen **Zeitraum** und stehen in der **GuV** (Aufwand, Ertrag)." },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Händler tilgt 5.000 € seines Bankdarlehens. Was liegt vor?", optionen: ["Nur eine Auszahlung", "Auszahlung und Aufwand", "Aufwand, aber keine Auszahlung", "Ausgabe und Aufwand"], richtig: 0, erkl: "Geld fließt ab, aber die Schuld sinkt gleich mit – Geldvermögen und Eigenkapital ändern sich nicht." },
      { art: "wahl", frage: "Waren werden auf Ziel eingekauft. Was liegt vor?", optionen: ["Ausgabe, aber keine Auszahlung", "Auszahlung", "Ertrag", "Nichts"], richtig: 0, erkl: "Die Verbindlichkeit mindert das Geldvermögen; gezahlt wird erst später." },
      { art: "wahl", frage: "Die Jahres-AfA für eine Maschine ist …", optionen: ["Aufwand ohne Auszahlung", "Auszahlung ohne Aufwand", "Weder Aufwand noch Auszahlung", "Eine Einnahme"], richtig: 0, erkl: "Werteverzehr, aber kein Geldabfluss im Jahr der AfA." },
      { art: "wahl", frage: "Eine Spende an das Rote Kreuz ist …", optionen: ["Aufwand, aber keine Kosten", "Kosten", "Kein Aufwand", "Ein Ertrag"], richtig: 0, erkl: "Neutraler Aufwand – nicht betriebsbedingt." },
    ],
  },
  {
    id: "b1-privat", teil: 1, titel: "Entnahmen & Einlagen buchen", kurz: "Privatkonten", icon: "👤", normen: ["EStG 4 1"],
    karten: [
      { art: "merksatz", titel: "Privat ist kein Erfolg", text: "Nimmt der Unternehmer Geld oder Waren für sich **privat** heraus, ist das eine **Entnahme**; bringt er privates Geld oder Sachen in den Betrieb, ist das eine **Einlage**. Beides verändert das Eigenkapital, ist aber **kein Gewinn und kein Verlust** – also **erfolgsneutral**." },
      { art: "erklaerung", titel: "Buchen und abschließen", text: "• **Privatentnahmen** im **Soll** (Eigenkapital sinkt): z. B. **Privatentnahmen an Kasse**.\n• **Privateinlagen** im **Haben** (Eigenkapital steigt): z. B. **Bank an Privateinlagen**.\n• Abschluss **direkt über das Eigenkapital**, nicht über die GuV: Eigenkapital an Privatentnahmen; Privateinlagen an Eigenkapital." },
      { art: "beispiel", titel: "Typische Fälle", text: "• Unternehmer nimmt 300 € aus der Kasse für private Einkäufe → **Privatentnahmen an Kasse 300 €**\n• Er bezahlt eine betriebliche Reparatur von seinem Privatkonto → **Einlage**: Reparatur (und Vorsteuer) an Privateinlagen\n• Er zahlt 5.000 € aus seinem Ersparten auf das Geschäftskonto → **Bank an Privateinlagen 5.000 €**" },
    ],
    fragen: [
      { art: "wahl", frage: "Der Unternehmer nimmt 200 € aus der Geschäftskasse für private Zwecke. Buchungssatz?", optionen: ["Privatentnahmen an Kasse", "Kasse an Privatentnahmen", "Aufwand an Kasse", "Privateinlagen an Kasse"], richtig: 0, erkl: "Entnahmen werden im Soll gebucht; Kasse nimmt ab (Haben)." },
      { art: "wahl", frage: "Wie wirken sich Entnahmen auf den Gewinn aus?", optionen: ["Gar nicht – sie sind erfolgsneutral", "Sie mindern den Gewinn", "Sie erhöhen den Gewinn", "Sie sind Betriebsausgaben"], richtig: 0, erkl: "Entnahmen und Einlagen sind privat veranlasst und beeinflussen den Gewinn nicht." },
      { art: "wahl", frage: "Worüber werden die Privatkonten abgeschlossen?", optionen: ["Über das Eigenkapital", "Über die GuV", "Über das Schlussbilanzkonto", "Über die Bank"], richtig: 0, erkl: "Privatkonten sind Unterkonten des Eigenkapitals und werden direkt dorthin abgeschlossen." },
      { art: "wahl", frage: "Der Unternehmer überweist 3.000 € von seinem privaten Sparkonto auf das Geschäftskonto. Buchungssatz?", optionen: ["Bank an Privateinlagen", "Privatentnahmen an Bank", "Bank an Umsatzerlöse", "Privateinlagen an Bank"], richtig: 0, erkl: "Bank nimmt zu (Soll); Einlage im Haben." },
    ],
  },
  {
    id: "b1-ust", teil: 1, titel: "Umsatzsteuer buchen", kurz: "Vorsteuer, Umsatzsteuer, Zahllast", icon: "％", normen: ["UStG 15 1"],
    karten: [
      { art: "merksatz", titel: "Zwei Konten für die Steuer", text: "Unternehmer buchen nach der **Nettomethode**: Der Nettobetrag und die Steuer werden auf **getrennten Konten** gebucht.\n• Steuer beim **Einkauf** = **Vorsteuer** → Forderung gegen das Finanzamt → **Aktivkonto**.\n• Steuer beim **Verkauf** = **Umsatzsteuer** → Schuld gegenüber dem Finanzamt → **Passivkonto**." },
      { art: "beispiel", titel: "Einkauf und Verkauf", text: "• Einkauf von Waren auf Ziel, 1.000 € + 190 € USt:\n**Wareneingang 1.000 / Vorsteuer 190 an Verbindlichkeiten 1.190**\n• Verkauf auf Ziel, 1.500 € + 285 € USt:\n**Forderungen 1.785 an Umsatzerlöse 1.500 / Umsatzsteuer 285**" },
      { art: "erklaerung", titel: "Zahllast am Monatsende", text: "Umsatzsteuer − Vorsteuer = **Zahllast** (ans Finanzamt zu zahlen). Im Beispiel: 285 € − 190 € = **95 €**.\nAbschluss: Das kleinere Konto wird auf das größere übertragen (**Umsatzsteuer an Vorsteuer 190**). Bleibt eine Zahllast offen, steht sie als Schuld in der Bilanz; ist die Vorsteuer höher, entsteht ein **Erstattungsanspruch**." },
    ],
    fragen: [
      { art: "wahl", frage: "Welches Konto ist die Vorsteuer?", optionen: ["Ein Aktivkonto (Forderung gegen das Finanzamt)", "Ein Passivkonto", "Ein Aufwandskonto", "Ein Ertragskonto"], richtig: 0, erkl: "Die Vorsteuer bekommt der Unternehmer vom Finanzamt zurück – sie ist eine Forderung." },
      { art: "zahl", frage: "Umsatzsteuer im Monat 4.750 €, Vorsteuer 3.100 €. Wie hoch ist die Zahllast (in €)?", cent: 165000, erkl: "4.750 € − 3.100 € = 1.650 €." },
      { art: "wahl", frage: "Verkauf von Waren auf Ziel: 2.000 € + 380 € USt. Welcher Buchungssatz ist richtig?", optionen: ["Forderungen 2.380 an Umsatzerlöse 2.000 / Umsatzsteuer 380", "Umsatzerlöse 2.000 / Umsatzsteuer 380 an Forderungen 2.380", "Forderungen 2.380 an Umsatzerlöse 2.380", "Forderungen 2.000 / Vorsteuer 380 an Umsatzerlöse 2.380"], richtig: 0, erkl: "Forderung brutto im Soll; Erlös netto und Umsatzsteuer im Haben." },
      { art: "wahl", frage: "Wie schließt man die Konten ab, wenn die Umsatzsteuer größer ist als die Vorsteuer?", optionen: ["Umsatzsteuer an Vorsteuer (Vorsteuer wird übertragen)", "Vorsteuer an Umsatzsteuer", "GuV an Umsatzsteuer", "Umsatzsteuer an Umsatzerlöse"], richtig: 0, erkl: "Das kleinere Konto (Vorsteuer) wird auf das größere übertragen; der Rest ist die Zahllast." },
    ],
  },
  {
    id: "b1-waren", teil: 1, titel: "Warenkonten & Wareneinsatz", kurz: "WBK, WEK, BVK, WVK", icon: "📦", normen: [],
    karten: [
      { art: "merksatz", titel: "Das viergeteilte Warenkonto", text: "Im Handel wird der Warenverkehr auf **vier Konten** aufgeteilt:\n• **WBK** – Warenbestandskonto (der Lagerbestand, Aktivkonto)\n• **WEK** – Wareneinkaufskonto (Einkäufe zu Einkaufspreisen, Aufwand)\n• **BVK** – Bestandsveränderungskonto\n• **WVK** – Warenverkaufskonto (Verkäufe zu Verkaufspreisen, Ertrag)" },
      { art: "erklaerung", titel: "Der Wareneinsatz", text: "Der **Wareneinsatz** ist der Einkaufswert der Waren, die tatsächlich **verkauft** wurden:\n**Anfangsbestand + Einkäufe − Schlussbestand = Wareneinsatz**.\nIst der Lagerbestand gestiegen (Mehrung), wurde weniger verkauft als eingekauft; ist er gesunken (Minderung), wurde mehr verkauft." },
      { art: "erklaerung", titel: "Bestandsveränderung buchen", text: "• **Bestandsmehrung**: WBK an BVK, danach BVK an WEK (der Wareneinsatz wird kleiner).\n• **Bestandsminderung**: BVK an WBK, danach WEK an BVK (der Wareneinsatz wird größer).\nAm Ende: WEK an GuV (Wareneinsatz als Aufwand), WVK an GuV (Umsatz als Ertrag)." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "AB 92.000 €, Einkäufe 91.000 €, SB 80.000 € → Wareneinsatz = 92.000 + 91.000 − 80.000 = **103.000 €**. Der Bestand ist um 12.000 € gesunken (Minderung)." },
    ],
    fragen: [
      { art: "zahl", frage: "AB 40.000 €, Einkäufe 120.000 €, SB 35.000 €. Wie hoch ist der Wareneinsatz (in €)?", cent: 12500000, erkl: "40.000 + 120.000 − 35.000 = 125.000 €." },
      { art: "wahl", frage: "Der Schlussbestand ist höher als der Anfangsbestand. Wie bucht man die Bestandsveränderung zuerst?", optionen: ["WBK an BVK", "BVK an WBK", "WEK an WBK", "WVK an BVK"], richtig: 0, erkl: "Bestandsmehrung: WBK an BVK; danach BVK an WEK." },
      { art: "wahl", frage: "Auf welchem Konto stehen die Verkäufe zu Verkaufspreisen?", optionen: ["WVK", "WEK", "WBK", "BVK"], richtig: 0, erkl: "Warenverkaufskonto = Erlöse." },
      { art: "wahl", frage: "Was ist der Wareneinsatz?", optionen: ["Der Einkaufswert der verkauften Waren", "Der Verkaufswert aller Waren", "Der Lagerbestand am Jahresende", "Die Summe aller Einkäufe"], richtig: 0, erkl: "Wareneinsatz = AB + Einkäufe − SB – also was verkauft (eingesetzt) wurde, zum Einkaufspreis." },
    ],
  },
  {
    id: "b1-nachlaesse", teil: 1, titel: "Skonto, Rabatt, Bonus, Rücksendung", kurz: "Unterkonten im Warenverkehr", icon: "🏷️", normen: ["UStG 17 1"],
    karten: [
      { art: "merksatz", titel: "Was ist was?", text: "• **Rabatt**: Sofortnachlass auf der Rechnung – wird **gar nicht gebucht**, man bucht gleich den niedrigeren Preis.\n• **Skonto**: Nachlass für schnelle Zahlung (z. B. 2 %).\n• **Bonus**: nachträglicher Nachlass, z. B. am Jahresende für hohe Umsätze.\n• **Rücksendung**: Ware geht zurück – die Buchung wird storniert.\n• **Bezugskosten**: Fracht, Rollgeld, Zölle beim Einkauf – gehören zum Einkaufspreis; sie werden auf dem Unterkonto **Warenbezugskosten** gebucht und über das **WEK** abgeschlossen." },
      { art: "erklaerung", titel: "Die Steuer muss mit", text: "Jeder nachträgliche Nachlass (Skonto, Bonus, Rücksendung) ändert die Bemessungsgrundlage der Umsatzsteuer. Deshalb wird die **Steuer anteilig berichtigt** (§ 17 Abs. 1 UStG): beim Einkauf die **Vorsteuer**, beim Verkauf die **Umsatzsteuer**." },
      { art: "beispiel", titel: "Lieferantenskonto Schritt für Schritt", text: "Rechnung 1.190 € (1.000 € + 190 € USt), Zahlung mit 2 % Skonto:\n• Skonto brutto: 23,80 € → netto **20 €**, Steuer **3,80 €**\n• Überweisung: 1.166,20 €\n• Buchung: **Verbindlichkeiten 1.190 an Bank 1.166,20 / Erhaltene Skonti 20 / Vorsteuer 3,80**\n• Abschluss: Erhaltene Skonti an WEK (mindert den Einkauf)." },
    ],
    fragen: [
      { art: "zahl", frage: "Eine Rechnung über 2.380 € (2.000 € + 380 € USt) wird mit 3 % Skonto bezahlt. Wie hoch ist die Überweisung (in €)?", cent: 230860, erkl: "3 % von 2.380 € = 71,40 €; 2.380 € − 71,40 € = 2.308,60 €." },
      { art: "zahl", frage: "Im gleichen Fall: Um wie viel € wird die Vorsteuer berichtigt?", cent: 1140, erkl: "Skonto brutto 71,40 € enthält 19/119 Steuer = 11,40 € (netto 60 €)." },
      { art: "wahl", frage: "Wie wird ein Sofortrabatt auf der Rechnung gebucht?", optionen: ["Gar nicht – man bucht direkt den niedrigeren Preis", "Auf dem Konto Erhaltene Rabatte", "Als Ertrag", "Als Einlage"], richtig: 0, erkl: "Rabatte werden nicht gesondert erfasst." },
      { art: "wahl", frage: "Wohin gehören Eingangsfrachten beim Wareneinkauf?", optionen: ["Zum Einkaufspreis (Warenbezugskosten → WEK)", "In die GuV als Vertriebskosten", "Auf das Privatkonto", "Ins Eigenkapital"], richtig: 0, erkl: "Bezugskosten sind Anschaffungsnebenkosten und werden über das WEK abgeschlossen." },
    ],
  },
  {
    id: "b1-abschluss", teil: 1, titel: "Vom Eröffnen bis zum Abschluss", kurz: "EBK, SBK, GuV", icon: "✅", normen: ["HGB 242"],
    karten: [
      { art: "merksatz", titel: "Der Buchungskreislauf", text: "1. **Eröffnung**: Anfangsbestände aus der Bilanz über das **Eröffnungsbilanzkonto (EBK)** auf die Konten.\n2. **Laufende Buchungen** im Jahr.\n3. **Vorbereitende Abschlussbuchungen** (z. B. Abschreibungen, Unterkonten abschließen).\n4. **Abschluss**: Erfolgskonten → GuV; Bestandskonten → **Schlussbilanzkonto (SBK)**." },
      { art: "erklaerung", titel: "Eröffnungsbuchungen", text: "Das EBK ist ein **Spiegelbild** der Bilanz:\n• Aktivkonten: **Aktivkonto an EBK** (Anfangsbestand ins Soll)\n• Passivkonten: **EBK an Passivkonto** (Anfangsbestand ins Haben)" },
      { art: "erklaerung", titel: "Abschlussbuchungen", text: "• Aktivkonten: **SBK an Aktivkonto** (Endbestand)\n• Passivkonten: **Passivkonto an SBK**\n• Erfolgskonten: Aufwand → **GuV an Aufwand**; Ertrag → **Ertrag an GuV**\n• Gewinn: **GuV an Eigenkapital**\n• Privatkonten: direkt über das **Eigenkapital**" },
    ],
    fragen: [
      { art: "wahl", frage: "Wie wird der Anfangsbestand eines Aktivkontos eröffnet?", optionen: ["Aktivkonto an EBK", "EBK an Aktivkonto", "SBK an Aktivkonto", "Aktivkonto an GuV"], richtig: 0, erkl: "Aktivkonten erhalten ihren Anfangsbestand im Soll – Gegenbuchung im EBK." },
      { art: "wahl", frage: "Wie wird der Endbestand der Kasse abgeschlossen?", optionen: ["SBK an Kasse", "Kasse an SBK", "GuV an Kasse", "Kasse an EBK"], richtig: 0, erkl: "Aktivkonto: Endbestand im Haben, Gegenbuchung im Soll des SBK." },
      { art: "wahl", frage: "Wie wird ein Gewinn abgeschlossen?", optionen: ["GuV an Eigenkapital", "Eigenkapital an GuV", "GuV an SBK", "SBK an GuV"], richtig: 0, erkl: "Gewinn erhöht das Eigenkapital (Haben)." },
      { art: "wahl", frage: "Was gehört zu den vorbereitenden Abschlussbuchungen?", optionen: ["Abschluss der Unterkonten wie Skonti oder Bezugskosten", "Die Eröffnung über das EBK", "Der laufende Wareneinkauf", "Die Inventur"], richtig: 0, erkl: "Vor dem eigentlichen Abschluss werden u. a. Unterkonten abgeschlossen und Abschreibungen gebucht." },
    ],
  },
  {
    id: "b1-kalkulation", teil: 1, titel: "Kalkulation im Handel", kurz: "Rohgewinn, Aufschlag, Spanne", icon: "🧮", normen: [],
    karten: [
      { art: "merksatz", titel: "Rohgewinn", text: "**Rohgewinn = Umsatz − Wareneinsatz**. Umsatz meint die Nettoerlöse **nach Abzug** von Skonti, Rabatten und Rücksendungen („wirtschaftlicher Umsatz“). Er zeigt, was der Handel mit Waren „brutto“ verdient – bevor Miete, Löhne und andere Kosten abgezogen sind." },
      { art: "erklaerung", titel: "Die zwei wichtigsten Sätze", text: "• **Rohgewinnaufschlagsatz** (Kalkulationszuschlag) = Rohgewinn × 100 ÷ **Wareneinsatz** – um wie viel Prozent wird auf den Einkaufspreis aufgeschlagen?\n• **Rohgewinnsatz** (Handelsspanne) = Rohgewinn × 100 ÷ **Umsatz** – wie viel Prozent vom Verkaufspreis sind Rohgewinn?" },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Umsatz 150.000 €, Wareneinsatz 100.000 €:\n• Rohgewinn = **50.000 €**\n• Aufschlagsatz = 50.000 × 100 ÷ 100.000 = **50 %**\n• Rohgewinnsatz = 50.000 × 100 ÷ 150.000 = **33,33 %**" },
      { art: "erklaerung", titel: "Einkaufskalkulation", text: "Listenpreis − Rabatt = Zieleinkaufspreis − Skonto = Bareinkaufspreis + Bezugskosten = **Einstandspreis**." },
    ],
    fragen: [
      { art: "zahl", frage: "Umsatz 240.000 €, Wareneinsatz 160.000 €. Wie hoch ist der Rohgewinn (in €)?", cent: 8000000, erkl: "240.000 € − 160.000 € = 80.000 €." },
      { art: "zahl", einheit: "%", frage: "Im gleichen Fall: Wie hoch ist der Rohgewinnaufschlagsatz (in %)?", cent: 5000, erkl: "80.000 × 100 ÷ 160.000 = 50 %." },
      { art: "wahl", frage: "Worauf bezieht sich der Rohgewinnsatz (Handelsspanne)?", optionen: ["Auf den Umsatz", "Auf den Wareneinsatz", "Auf das Eigenkapital", "Auf den Einkaufspreis"], richtig: 0, erkl: "Rohgewinnsatz = Rohgewinn × 100 ÷ Umsatz." },
      { art: "zahl", frage: "Listenpreis 1.000 €, 10 % Rabatt, 2 % Skonto, Bezugskosten 30 €. Wie hoch ist der Einstandspreis (in €)?", cent: 91200, erkl: "1.000 − 100 = 900; 900 − 18 = 882; 882 + 30 = 912 €." },
    ],
  },
  {
    id: "b1-bvv", teil: 1, titel: "Gewinn durch Betriebsvermögensvergleich", kurz: "§ 4 Abs. 1 EStG", icon: "Σ", normen: ["EStG 4 1"],
    karten: [
      { art: "merksatz", titel: "Die Formel", text: "**Gewinn = Betriebsvermögen am Ende des Jahres − Betriebsvermögen am Ende des Vorjahres + Entnahmen − Einlagen** (§ 4 Abs. 1 S. 1 EStG). Betriebsvermögen bedeutet hier das **Eigenkapital** laut Bilanz." },
      { art: "erklaerung", titel: "Warum + Entnahmen und − Einlagen?", text: "• Hat der Unternehmer Geld **entnommen**, ist das Eigenkapital gesunken – aber nicht, weil der Betrieb schlecht gewirtschaftet hat. Darum wird die Entnahme **wieder hinzugerechnet**.\n• Hat er Geld **eingelegt**, ist das Eigenkapital gestiegen, ohne dass der Betrieb etwas verdient hat. Darum wird die Einlage **abgezogen**." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "BV 31.12.02: 120.000 €; BV 31.12.01: 100.000 €; Entnahmen 30.000 €; Einlagen 5.000 €.\nGewinn = 120.000 − 100.000 + 30.000 − 5.000 = **45.000 €**." },
    ],
    fragen: [
      { art: "zahl", frage: "BV Ende 02: 80.000 €, BV Ende 01: 70.000 €, Entnahmen 25.000 €, Einlagen 0 €. Gewinn (in €)?", cent: 3500000, erkl: "80.000 − 70.000 + 25.000 − 0 = 35.000 €." },
      { art: "wahl", frage: "BV Ende 02: 60.000 €, BV Ende 01: 75.000 €, Entnahmen 20.000 €, Einlagen 10.000 €. Ergebnis?", optionen: ["Verlust von 5.000 €", "Gewinn von 5.000 €", "Verlust von 25.000 €", "Gewinn von 45.000 €"], richtig: 0, erkl: "60.000 − 75.000 + 20.000 − 10.000 = −5.000 € → Verlust." },
      { art: "wahl", frage: "Warum werden Einlagen abgezogen?", optionen: ["Sie haben das Betriebsvermögen erhöht, ohne Gewinn zu sein", "Sie sind Betriebsausgaben", "Sie sind steuerfrei", "Weil das Gesetz es nur so vorgibt, ohne Grund"], richtig: 0, erkl: "Einlagen kommen aus dem Privatvermögen, nicht aus der betrieblichen Tätigkeit." },
    ],
  },
];

export const PFAD_BSR2 = [
  {
    id: "b2-gob", teil: 2, titel: "GoB & Maßgeblichkeit", kurz: "§§ 243, 252 HGB · § 5 Abs. 1 EStG", icon: "⚖️", normen: ["HGB 243", "HGB 252", "EStG 5 1"],
    karten: [
      { art: "merksatz", titel: "Handelsbilanz bestimmt die Steuerbilanz", text: "Kaufleute stellen ihre Bilanz nach den **Grundsätzen ordnungsmäßiger Buchführung (GoB)** auf (§ 243 Abs. 1 HGB). Für die Steuer gilt: Gewerbetreibende setzen das Betriebsvermögen an, das **nach den handelsrechtlichen GoB** auszuweisen ist – das ist die **Maßgeblichkeit** (§ 5 Abs. 1 S. 1 EStG).\nAusnahme: Das Steuerrecht schreibt etwas anderes vor (z. B. § 6, § 7 EStG) – dann geht das Steuerrecht vor." },
      { art: "erklaerung", titel: "Bewertungsgrundsätze (§ 252 Abs. 1 HGB)", text: "• **Nr. 1 Bilanzidentität**: Schlussbilanz = Eröffnungsbilanz des Folgejahres.\n• **Nr. 2 Fortführung** des Unternehmens unterstellen.\n• **Nr. 3 Einzelbewertung** zum **Stichtag**.\n• **Nr. 4 Vorsicht**: Gewinne erst, wenn **realisiert** (Realisationsprinzip); absehbare **Verluste schon vorher** (Imparitätsprinzip).\n• **Nr. 5 Periodenabgrenzung**: Aufwand und Ertrag in das Jahr, zu dem sie gehören.\n• **Nr. 6 Stetigkeit** der Methoden." },
      { art: "erklaerung", titel: "Nach dem Stichtag bekannt geworden", text: "Erkenntnisse zwischen Stichtag und Bilanzaufstellung:\n• **wertaufhellend** – Umstand lag am Stichtag **schon vor** (Kunde war schon insolvent) → **berücksichtigen**.\n• **wertbegründend** – Umstand entsteht **erst danach** (Lagerbrand im Januar) → **nicht** berücksichtigen." },
      { art: "beispiel", titel: "Vorsicht in Zahlen", text: "Wertpapiere: Anschaffungskosten 10.000 €.\n• Kurs am Stichtag 12.000 € → Ansatz **10.000 €** (Gewinn noch nicht realisiert).\n• Kurs am Stichtag 8.000 € → Abschreibung möglich bzw. nötig (Imparitätsprinzip)." },
    ],
    fragen: [
      { art: "wahl", frage: "Welche Vorschrift verknüpft Handels- und Steuerbilanz?", optionen: ["§ 5 Abs. 1 S. 1 EStG (Maßgeblichkeit)", "§ 238 HGB", "§ 141 AO", "§ 4 Abs. 3 EStG"], richtig: 0, erkl: "Maßgeblichkeit der handelsrechtlichen GoB." },
      { art: "wahl", frage: "Grundstück: Anschaffungskosten 200.000 €, Verkehrswert am Stichtag 260.000 €. Ansatz?", optionen: ["200.000 €", "260.000 €", "230.000 €", "Wahlweise"], richtig: 0, erkl: "Realisationsprinzip und Anschaffungskosten als Obergrenze (§ 252 Abs. 1 Nr. 4, § 253 Abs. 1 HGB)." },
      { art: "wahl", frage: "Am 20.01. (vor Aufstellung der Bilanz) erfährt der Kaufmann, dass ein Kunde schon im November insolvent war. Folge für die Bilanz zum 31.12.?", optionen: ["Berücksichtigen – wertaufhellend", "Nicht berücksichtigen – erst im neuen Jahr bekannt", "Nur im Anhang erwähnen", "Neue Bilanz für Januar"], richtig: 0, erkl: "Der Umstand lag am Stichtag schon vor (§ 252 Abs. 1 Nr. 4 HGB)." },
      { art: "wahl", frage: "Im Februar brennt das Lager ab. Bilanz zum 31.12. des Vorjahres?", optionen: ["Nicht berücksichtigen – wertbegründend", "Waren auf 0 € abschreiben", "Rückstellung bilden", "Bilanz nicht aufstellen"], richtig: 0, erkl: "Ereignis nach dem Stichtag." },
      { art: "wahl", frage: "Welcher Grundsatz verlangt, dass Schlussbilanz und Eröffnungsbilanz übereinstimmen?", optionen: ["Bilanzidentität", "Stetigkeit", "Einzelbewertung", "Vorsicht"], richtig: 0, erkl: "§ 252 Abs. 1 Nr. 1 HGB." },
    ],
  },
  {
    id: "b2-bv", teil: 2, titel: "Was gehört ins Betriebsvermögen?", kurz: "R 4.2 EStR · § 246 HGB", icon: "🧭", normen: ["HGB 246", "EStG 5 1"],
    karten: [
      { art: "merksatz", titel: "Drei Arten von Wirtschaftsgütern", text: "• **Notwendiges Betriebsvermögen**: wird ausschließlich und unmittelbar für den Betrieb genutzt – oder bei beweglichen Sachen **zu mehr als 50 %** betrieblich. **Muss** in die Bilanz.\n• **Gewillkürtes Betriebsvermögen**: betriebliche Nutzung **10 % bis 50 %** – **darf** in die Bilanz, wenn der Unternehmer es so entscheidet.\n• **Notwendiges Privatvermögen**: betriebliche Nutzung **unter 10 %** – **darf nicht** in die Bilanz." },
      { art: "erklaerung", titel: "Anlage- oder Umlaufvermögen?", text: "• **Anlagevermögen**: soll dem Betrieb **dauernd dienen** (§ 247 Abs. 2 HGB) – Maschinen, Fahrzeuge, Gebäude.\n• **Umlaufvermögen**: soll **verbraucht oder verkauft** werden – Waren, Forderungen, Bankguthaben.\nDie Einordnung entscheidet z. B. darüber, ob **planmäßig abgeschrieben** wird (AfA gibt es nur beim abnutzbaren Anlagevermögen)." },
      { art: "beispiel", titel: "Pkw-Beispiele", text: "• Pkw zu 70 % betrieblich → **notwendiges BV**\n• Pkw zu 30 % betrieblich → **gewillkürtes BV** möglich (Wahl)\n• Pkw zu 5 % betrieblich → **Privatvermögen**" },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Pkw wird zu 60 % betrieblich genutzt. Wie ist er zuzuordnen?", optionen: ["Notwendiges Betriebsvermögen", "Gewillkürtes Betriebsvermögen", "Notwendiges Privatvermögen", "Wahlweise privat oder betrieblich"], richtig: 0, erkl: "Mehr als 50 % betriebliche Nutzung → notwendiges BV." },
      { art: "wahl", frage: "Ein Laptop wird zu 25 % betrieblich genutzt. Was gilt?", optionen: ["Er kann als gewillkürtes BV behandelt werden", "Er muss ins BV", "Er darf nicht ins BV", "Er ist Umlaufvermögen"], richtig: 0, erkl: "10 % bis 50 % → gewillkürtes BV, Zuordnung ist ein Wahlrecht." },
      { art: "wahl", frage: "Zu welchem Vermögen gehören Waren eines Händlers?", optionen: ["Umlaufvermögen", "Anlagevermögen", "Privatvermögen", "Gewillkürtes Vermögen"], richtig: 0, erkl: "Waren sollen verkauft werden – sie dienen nicht dauernd." },
      { art: "wahl", frage: "Ab welcher betrieblichen Nutzung darf ein beweglicher Gegenstand nicht mehr ins Betriebsvermögen?", optionen: ["Unter 10 %", "Unter 50 %", "Unter 25 %", "Unter 1 %"], richtig: 0, erkl: "Unter 10 % ist er notwendiges Privatvermögen." },
    ],
  },
  {
    id: "b2-zurechnung", teil: 2, titel: "Wem gehört's – und ab wann?", kurz: "§ 39 AO · § 9a EStDV", icon: "🔑", normen: ["AO 39", "EStDV 9a", "BGB 449"],
    karten: [
      { art: "merksatz", titel: "Bilanziert wird beim Eigentümer", text: "Ein Wirtschaftsgut steht in der Bilanz dessen, dem es **zuzurechnen** ist: grundsätzlich dem **Eigentümer** (§ 39 Abs. 1 AO). Hat ein anderer die tatsächliche Herrschaft so, dass er den Eigentümer auf Dauer ausschließen kann, ist es ihm als **wirtschaftlichem Eigentümer** zuzurechnen (§ 39 Abs. 2 Nr. 1 AO)." },
      { art: "erklaerung", titel: "Eigentumsvorbehalt", text: "Beim Kauf unter **Eigentumsvorbehalt** (§ 449 BGB) bleibt der Verkäufer bis zur letzten Rate Eigentümer. Trotzdem bilanziert schon der **Käufer**: Er nutzt die Sache wie ein Eigentümer – er ist wirtschaftlicher Eigentümer." },
      { art: "erklaerung", titel: "Ab wann?", text: "Angeschafft ist ein Wirtschaftsgut im Zeitpunkt der **Lieferung** (§ 9a EStDV) – nicht mit dem Kaufvertrag und nicht mit der Zahlung. Ab diesem Monat wird es aktiviert und abgeschrieben.\n• Vertrag geschlossen, aber noch nicht geliefert = **schwebendes Geschäft** → wird **nicht** bilanziert.\n• Wurde schon bezahlt, aber noch nicht geliefert → **geleistete Anzahlung** (Forderung)." },
    ],
    fragen: [
      { art: "wahl", frage: "Kaufvertrag im November, Lieferung im Januar, Zahlung im Februar. Wann ist die Maschine angeschafft?", optionen: ["Im Januar (Lieferung)", "Im November (Vertrag)", "Im Februar (Zahlung)", "Am 31.12."], richtig: 0, erkl: "§ 9a EStDV: Jahr bzw. Zeitpunkt der Lieferung." },
      { art: "wahl", frage: "Eine Maschine wird unter Eigentumsvorbehalt geliefert. Wer bilanziert sie?", optionen: ["Der Käufer", "Der Verkäufer bis zur letzten Rate", "Beide je zur Hälfte", "Niemand bis zur vollständigen Zahlung"], richtig: 0, erkl: "Der Käufer ist wirtschaftlicher Eigentümer (§ 39 Abs. 2 Nr. 1 AO)." },
      { art: "wahl", frage: "Ein Kaufvertrag ist am 31.12. unterschrieben, aber weder geliefert noch bezahlt. Was wird bilanziert?", optionen: ["Nichts – schwebendes Geschäft", "Die Maschine", "Eine Verbindlichkeit", "Eine Anzahlung"], richtig: 0, erkl: "Schwebende Geschäfte werden nicht bilanziert." },
      { art: "wahl", frage: "Am 20.12. wird auf eine Maschine (Lieferung im Februar) angezahlt. Was steht in der Bilanz?", optionen: ["Eine geleistete Anzahlung", "Die Maschine", "Nichts", "Eine Verbindlichkeit"], richtig: 0, erkl: "Die Zahlung vor Lieferung ist eine Forderung auf die Lieferung." },
    ],
  },
  {
    id: "b2-ak", teil: 2, titel: "Anschaffungskosten ermitteln", kurz: "§ 255 Abs. 1 HGB · § 9b EStG", icon: "🏷️", normen: ["HGB 255 1", "EStG 9b 1"],
    karten: [
      { art: "merksatz", titel: "Das Schema", text: "**Kaufpreis (netto)**\n+ Kosten, um das Gut **betriebsbereit** zu machen (Montage, Installation)\n+ **Anschaffungsnebenkosten** (Transport, Versicherung, Zulassung, Notar)\n+ **nachträgliche** Anschaffungskosten\n− **Minderungen** (Skonto, Rabatt, Bonus)\n= **Anschaffungskosten** (§ 255 Abs. 1 HGB)" },
      { art: "erklaerung", titel: "Was nicht dazugehört", text: "• Die **abziehbare Vorsteuer** (§ 9b Abs. 1 EStG) – sie holt man sich vom Finanzamt zurück.\n• **Finanzierungskosten** (Zinsen) – sie sind laufende Betriebsausgaben.\n• Kosten **vor** der konkreten Kaufentscheidung (allgemeiner Messebesuch).\n• Schulungen für den Bediener (betreffen den Menschen, nicht das Gerät)." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Maschine 50.000 € netto, Transport 2.000 €, Montage 3.000 €, Zinsen fürs Darlehen 1.500 €, bezahlt mit 2 % Skonto auf den Kaufpreis:\n50.000 + 2.000 + 3.000 − 1.000 = **54.000 €** (Zinsen nicht)." },
      { art: "erklaerung", titel: "Ausnahme: kein Vorsteuerabzug", text: "Darf der Unternehmer die Vorsteuer **nicht** abziehen (z. B. Arzt, Versicherungsvertreter), gehört sie **zu den Anschaffungskosten**: Pkw 40.000 € + 7.600 € USt = AK **47.600 €**." },
    ],
    fragen: [
      { art: "zahl", frage: "Kaufpreis 20.000 € netto, Fracht 800 €, Montage 1.200 €, Darlehenszinsen 600 €. Anschaffungskosten (in €)?", cent: 2200000, erkl: "20.000 + 800 + 1.200 = 22.000 €; Zinsen gehören nicht dazu." },
      { art: "wahl", frage: "Gehört die abziehbare Vorsteuer zu den Anschaffungskosten?", optionen: ["Nein (§ 9b Abs. 1 EStG)", "Ja, immer", "Nur bei Fahrzeugen", "Nur bei Skontoabzug"], richtig: 0, erkl: "Abziehbare Vorsteuer ist eine Forderung gegen das Finanzamt." },
      { art: "wahl", frage: "Eine Ärztin kauft ein Gerät für 10.000 € + 1.900 € USt (kein Vorsteuerabzug). Anschaffungskosten?", optionen: ["11.900 €", "10.000 €", "1.900 €", "8.100 €"], richtig: 0, erkl: "Nicht abziehbare Vorsteuer gehört zu den Anschaffungskosten." },
      { art: "wahl", frage: "Wie wird ein Skonto beim Kauf von Anlagevermögen behandelt?", optionen: ["Es mindert die Anschaffungskosten", "Es ist ein Ertrag", "Es wird ignoriert", "Es ist eine Einlage"], richtig: 0, erkl: "§ 255 Abs. 1 S. 3 HGB: Anschaffungspreisminderungen werden abgesetzt." },
    ],
  },
  {
    id: "b2-afa", teil: 2, titel: "Abschreibung (AfA)", kurz: "§ 7 Abs. 1 EStG · § 253 Abs. 3 HGB", icon: "📉", normen: ["EStG 7 1", "HGB 253 3"],
    karten: [
      { art: "merksatz", titel: "Warum abschreiben?", text: "Eine Maschine nutzt sich über Jahre ab. Ihre Anschaffungskosten werden deshalb **auf die Nutzungsdauer verteilt** – jedes Jahr ein Teil als Aufwand. Das ist die **AfA** (Absetzung für Abnutzung)." },
      { art: "erklaerung", titel: "Linear und zeitanteilig", text: "• **Linear**: jedes Jahr der gleiche Betrag = Anschaffungskosten ÷ Nutzungsdauer (§ 7 Abs. 1 S. 1, 2 EStG).\n• **Im ersten Jahr** nur für die Monate ab der Anschaffung – der **Anschaffungsmonat zählt voll** (§ 7 Abs. 1 S. 4 EStG).\n• Beim Verkauf: AfA bis einschließlich des Verkaufsmonats." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Maschine, AK 60.000 €, Nutzungsdauer 10 Jahre, geliefert am 15. April:\n• Jahres-AfA: 6.000 €\n• Monate April–Dezember = **9 Monate** → AfA im 1. Jahr: 6.000 × 9/12 = **4.500 €**\n• Buchwert Ende 1. Jahr: **55.500 €**" },
      { art: "erklaerung", titel: "Buchung", text: "**Abschreibungen an Maschinen** (direkte Abschreibung: das Anlagekonto wird um die AfA vermindert)." },
    ],
    fragen: [
      { art: "zahl", frage: "AK 36.000 €, Nutzungsdauer 6 Jahre, Anschaffung im Oktober. AfA im 1. Jahr (in €)?", cent: 150000, erkl: "36.000 ÷ 6 = 6.000 € pro Jahr; Oktober–Dezember = 3 Monate → 1.500 €." },
      { art: "wahl", frage: "Eine Maschine wird am 28. Juli geliefert. Für wie viele Monate gibt es im 1. Jahr AfA?", optionen: ["6 Monate", "5 Monate", "12 Monate", "7 Monate"], richtig: 0, erkl: "Juli zählt voll: Juli bis Dezember = 6 Monate." },
      { art: "zahl", frage: "AK 24.000 €, Nutzungsdauer 8 Jahre, Anschaffung im Januar. Buchwert nach 2 Jahren (in €)?", cent: 1800000, erkl: "AfA je Jahr 3.000 €; nach 2 Jahren 6.000 € → Buchwert 18.000 €." },
      { art: "wahl", frage: "Wie lautet die Buchung der AfA bei direkter Abschreibung?", optionen: ["Abschreibungen an Maschinen", "Maschinen an Abschreibungen", "Abschreibungen an Bank", "GuV an Maschinen"], richtig: 0, erkl: "Aufwand im Soll, Minderung des Anlagekontos im Haben." },
    ],
  },
  {
    id: "b2-gwg", teil: 2, titel: "Geringwertige Wirtschaftsgüter", kurz: "§ 6 Abs. 2, 2a EStG", icon: "🪑", normen: ["EStG 6 2", "EStG 6 2a"],
    karten: [
      { art: "merksatz", titel: "Kleine Dinge – schneller abschreiben", text: "Für günstige, bewegliche Wirtschaftsgüter des Anlagevermögens gibt es Vereinfachungen. Maßgeblich ist immer der **Nettobetrag** (ohne Vorsteuer):\n• bis **250 €**: sofort als Betriebsausgabe\n• bis **800 €**: **GWG** – im Jahr der Anschaffung **voll abschreiben** (§ 6 Abs. 2 EStG)\n• über 250 € bis **1.000 €**: **Sammelposten** möglich – über **5 Jahre** je 1/5 (§ 6 Abs. 2a EStG)" },
      { art: "erklaerung", titel: "Voraussetzungen", text: "Das Wirtschaftsgut muss **abnutzbar, beweglich** und **selbständig nutzbar** sein. Nicht selbständig nutzbar sind Teile, die nur zusammen mit anderen funktionieren – z. B. **Peripheriegeräte** eines PCs (**Monitor, Drucker, Maus**) oder einzelne **Regalelemente** ohne Standfestigkeit." },
      { art: "beispiel", titel: "Beispiele", text: "• Bürostuhl 650 € netto → GWG, sofort voll abschreiben\n• Kaffeevollautomat 950 € netto → kein GWG; Sammelposten (190 € pro Jahr) oder normale AfA\n• Schreibtischleuchte 810 € mit 2 % Skonto = 793,80 € → GWG" },
    ],
    fragen: [
      { art: "wahl", frage: "Ein Bürostuhl kostet 700 € netto. Was ist möglich?", optionen: ["Sofortabschreibung als GWG", "Nur lineare AfA", "Nur Sammelposten", "Keine Abschreibung"], richtig: 0, erkl: "Bis 800 € netto → GWG (§ 6 Abs. 2 EStG)." },
      { art: "zahl", frage: "Ein Sammelposten enthält Wirtschaftsgüter für 4.500 €. Wie viel wird pro Jahr abgeschrieben (in €)?", cent: 90000, erkl: "Sammelposten: 1/5 pro Jahr → 900 €." },
      { art: "wahl", frage: "Ein Monitor für den vorhandenen PC kostet 300 € netto. GWG?", optionen: ["Nein – nicht selbständig nutzbar", "Ja – unter 800 €", "Ja – unter 1.000 €", "Nur als Sammelposten"], richtig: 0, erkl: "Peripheriegeräte funktionieren nur mit dem PC und sind nicht selbständig nutzbar." },
      { art: "wahl", frage: "Welcher Betrag ist für die GWG-Grenze maßgeblich (Unternehmer mit Vorsteuerabzug)?", optionen: ["Der Nettobetrag ohne Vorsteuer", "Der Bruttobetrag", "Der Listenpreis", "Der Betrag inkl. Finanzierungskosten"], richtig: 0, erkl: "Die Grenzen gelten für die Anschaffungskosten ohne abziehbare Vorsteuer." },
    ],
  },
  {
    id: "b2-grundstueck", teil: 2, titel: "Grundstück & Gebäude", kurz: "§ 255 HGB · § 7 Abs. 4 EStG", icon: "🏠", normen: ["HGB 255 1", "EStG 7 4"],
    karten: [
      { art: "merksatz", titel: "Zwei Wirtschaftsgüter", text: "Zivilrechtlich ist ein bebautes Grundstück eine Sache – in der Bilanz sind es **zwei**: **Grund und Boden** (nutzt sich nicht ab → **keine AfA**) und das **Gebäude** (wird abgeschrieben). Der Kaufpreis wird deshalb **aufgeteilt**, meist nach dem Verhältnis der Verkehrswerte." },
      { art: "erklaerung", titel: "Was gehört zu den AK?", text: "• **Ja**: Kaufpreis, **Grunderwerbsteuer**, **Notar** und **Grundbuch** für den **Kaufvertrag** und die Eigentumsumschreibung, Makler.\n• **Nein**: Kosten für die **Grundschuld** (Notar und Grundbuch für die Finanzierung) und Zinsen – das sind Betriebsausgaben.\n• Die Nebenkosten werden im gleichen Verhältnis auf Grund und Boden und Gebäude verteilt." },
      { art: "erklaerung", titel: "Gebäude-AfA (§ 7 Abs. 4 EStG)", text: "• Betriebsgebäude, **nicht** zu Wohnzwecken (Bauantrag nach dem 31.03.1985): **3 %** jährlich\n• alle übrigen Gebäude (vor allem **Wohngebäude**): fertiggestellt **nach 2022** **3 %**, 1925 bis 2022 **2 %**, **vor 1925** **2,5 %**\nIm ersten Jahr zeitanteilig nach Monaten." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Lagerhalle, AK insgesamt 400.000 €, davon Grund und Boden 25 % → Gebäude 300.000 €. Anschaffung im Juli:\nAfA = 300.000 × 3 % × 6/12 = **4.500 €**. Auf den Grund und Boden (100.000 €) gibt es keine AfA." },
    ],
    fragen: [
      { art: "wahl", frage: "Wird Grund und Boden abgeschrieben?", optionen: ["Nein – er nutzt sich nicht ab", "Ja, mit 3 %", "Ja, mit 2 %", "Nur bei Betriebsgrundstücken"], richtig: 0, erkl: "Grund und Boden ist nicht abnutzbar." },
      { art: "wahl", frage: "Gehören die Notarkosten für die Grundschuld zu den Anschaffungskosten?", optionen: ["Nein – sie betreffen die Finanzierung", "Ja, wie alle Notarkosten", "Nur zur Hälfte", "Nur beim Gebäude"], richtig: 0, erkl: "Finanzierungskosten sind Betriebsausgaben." },
      { art: "zahl", frage: "Bürogebäude (Betriebsvermögen, nicht Wohnzwecke), Gebäudeanteil 500.000 €, ganzes Jahr. AfA (in €)?", cent: 1500000, erkl: "3 % von 500.000 € = 15.000 €." },
      { art: "zahl", frage: "Gebäudeanteil 240.000 €, AfA-Satz 3 %, Anschaffung im Oktober. AfA im 1. Jahr (in €)?", cent: 180000, erkl: "240.000 × 3 % = 7.200 € × 3/12 = 1.800 €." },
    ],
  },
  {
    id: "b2-teilwert", teil: 2, titel: "Teilwert & Wertminderung", kurz: "§ 6 Abs. 1 EStG · § 253 HGB", icon: "⚖️", normen: ["EStG 6 1", "HGB 253 3", "HGB 253 4"],
    karten: [
      { art: "merksatz", titel: "Was ist der Teilwert?", text: "Der **Teilwert** ist der Betrag, den ein Käufer des **ganzen Betriebs** für das einzelne Wirtschaftsgut zahlen würde (§ 6 Abs. 1 Nr. 1 S. 3 EStG). Sinkt er unter den Buchwert, stellt sich die Frage: Darf oder muss abgeschrieben werden?" },
      { art: "erklaerung", titel: "Steuerrecht: nur bei dauerhafter Minderung", text: "Steuerlich **darf** auf den niedrigeren Teilwert abgeschrieben werden, wenn die Wertminderung **voraussichtlich dauernd** ist (Wahlrecht).\n• **Abnutzbares Anlagevermögen**: dauernd, wenn der Wert mindestens die **halbe Restnutzungsdauer** unter dem planmäßigen Buchwert liegt.\n• **Umlaufvermögen**: dauernd, wenn die Minderung **bis zur Aufstellung der Bilanz** anhält.\n• **Börsennotierte Aktien**: dauernd, wenn der Kurs am Stichtag **mehr als 5 %** unter dem Kaufkurs liegt." },
      { art: "erklaerung", titel: "Handelsrecht und Wertaufholung", text: "• Handelsrecht: Anlagevermögen bei dauernder Minderung **Pflicht** (§ 253 Abs. 3 HGB); Umlaufvermögen **immer Pflicht** (strenges Niederstwertprinzip, § 253 Abs. 4 HGB).\n• Steigt der Wert wieder, muss **zugeschrieben** werden – höchstens bis zu den (fortgeführten) Anschaffungskosten." },
      { art: "beispiel", titel: "Beispiel Waren", text: "Waren: AK 20.000 €, Marktpreis am 31.12. 16.000 €, bei Bilanzaufstellung im März 17.000 € → steuerlich Ansatz **17.000 €** (Erkenntnis bis zur Aufstellung zählt), handelsrechtlich **16.000 €**." },
    ],
    fragen: [
      { art: "wahl", frage: "Wann darf steuerlich auf den Teilwert abgeschrieben werden?", optionen: ["Bei voraussichtlich dauernder Wertminderung", "Bei jeder Wertminderung", "Nur bei Grundstücken", "Nie"], richtig: 0, erkl: "§ 6 Abs. 1 Nr. 1 S. 2, Nr. 2 S. 2 EStG." },
      { art: "wahl", frage: "Aktien: Kaufkurs 200 €, Kurs am Stichtag 194 €. Teilwertabschreibung?", optionen: ["Nein – Rückgang nur 3 %, unter der 5-%-Grenze", "Ja, auf 194 €", "Ja, auf 190 €", "Nur handelsrechtlich verboten"], richtig: 0, erkl: "Bagatellgrenze 5 %: 194 € liegt nur 3 % unter 200 €." },
      { art: "wahl", frage: "Welches Prinzip gilt handelsrechtlich für das Umlaufvermögen?", optionen: ["Strenges Niederstwertprinzip – stets abschreiben", "Gemildertes Niederstwertprinzip", "Höchstwertprinzip", "Wahlrecht"], richtig: 0, erkl: "§ 253 Abs. 4 HGB: Umlaufvermögen ist immer mit dem niedrigeren Wert anzusetzen." },
      { art: "zahl", frage: "Waren: AK 10.000 €, Wert am 31.12. 7.000 €, bei Bilanzaufstellung 8.000 €. Niedrigster zulässiger Steueransatz (in €)?", cent: 800000, erkl: "Die Minderung hält bis zur Aufstellung an, aber nur bis 8.000 € → Ansatz 8.000 €." },
    ],
  },
  {
    id: "b2-rap", teil: 2, titel: "Rechnungsabgrenzung", kurz: "§ 250 HGB · § 5 Abs. 5 EStG", icon: "📆", normen: ["HGB 250", "EStG 5 5"],
    karten: [
      { art: "merksatz", titel: "Aufwand gehört ins richtige Jahr", text: "Aufwendungen und Erträge werden dem Jahr zugeordnet, zu dem sie **wirtschaftlich gehören** – egal, wann gezahlt wird (§ 252 Abs. 1 Nr. 5 HGB). Wird **vor** dem Stichtag für eine **bestimmte Zeit danach** gezahlt, wird abgegrenzt." },
      { art: "erklaerung", titel: "Aktiv oder passiv?", text: "• **Aktiver RAP (ARAP)**: Wir haben **vorher bezahlt**, der Aufwand gehört ins nächste Jahr – z. B. Miete, Versicherung, Kfz-Steuer im Voraus.\n• **Passiver RAP (PRAP)**: Wir haben **vorher Geld bekommen**, der Ertrag gehört ins nächste Jahr – z. B. im Voraus erhaltene Miete oder Zinsen.\n• Bis **800 €** darf die Abgrenzung steuerlich unterbleiben (§ 5 Abs. 5 S. 2 EStG)." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Am 01.10. wird die Versicherung für 12 Monate bezahlt: 1.200 €.\n• Auf das alte Jahr entfallen Oktober–Dezember = 3 Monate = 300 €.\n• Auf das neue Jahr 9 Monate = **900 € → ARAP**.\nBuchung zum 31.12.: **ARAP an Versicherungsaufwand 900 €**." },
      { art: "erklaerung", titel: "Und umgekehrt?", text: "Wird **nachher** gezahlt, obwohl der Aufwand ins alte Jahr gehört (z. B. Dezemberzinsen, die im Januar abgebucht werden), ist das **kein RAP**, sondern eine **sonstige Verbindlichkeit** (bzw. sonstige Forderung)." },
    ],
    fragen: [
      { art: "zahl", frage: "Am 01.11. wird Miete für 12 Monate im Voraus gezahlt: 2.400 €. Wie hoch ist der ARAP zum 31.12. (in €)?", cent: 200000, erkl: "Altes Jahr 2 Monate = 400 €; neues Jahr 10 Monate = 2.000 €." },
      { art: "wahl", frage: "Ein Mieter zahlt am 28.12. die Januarmiete von 1.200 € an den Unternehmer. Welcher Posten?", optionen: ["Passiver RAP", "Aktiver RAP", "Sonstige Forderung", "Nichts"], richtig: 0, erkl: "Einnahme vor dem Stichtag, Ertrag danach → PRAP." },
      { art: "wahl", frage: "Zinsen für Dezember werden erst im Januar abgebucht. Was ist zu bilden?", optionen: ["Sonstige Verbindlichkeit", "Aktiver RAP", "Passiver RAP", "Nichts"], richtig: 0, erkl: "Aufwand im alten Jahr, Zahlung im neuen → sonstige Verbindlichkeit." },
      { art: "wahl", frage: "Wie lautet die Buchung für einen ARAP bei vorausbezahlter Versicherung?", optionen: ["ARAP an Versicherungsaufwand", "Versicherungsaufwand an ARAP", "ARAP an Bank", "Bank an ARAP"], richtig: 0, erkl: "Der zu viel gebuchte Aufwand wird auf die Aktivseite übertragen." },
    ],
  },
  {
    id: "b2-verbindlichkeiten", teil: 2, titel: "Verbindlichkeiten bewerten", kurz: "§ 253 Abs. 1 HGB · § 6 Abs. 1 Nr. 3 EStG", icon: "💶", normen: ["HGB 253 1", "EStG 6 1", "HGB 256a"],
    karten: [
      { art: "merksatz", titel: "Erfüllungsbetrag", text: "Schulden stehen in der Bilanz mit dem Betrag, der **zurückgezahlt** werden muss – dem **Erfüllungsbetrag** (§ 253 Abs. 1 S. 2 HGB). Steuerlich gilt dasselbe (§ 6 Abs. 1 Nr. 3 EStG). **Abgezinst** wird seit 2023 nicht mehr – auch zinslose Darlehen stehen mit dem vollen Rückzahlungsbetrag in der Bilanz." },
      { art: "erklaerung", titel: "Schulden in Fremdwährung", text: "Eine Schuld in **US-Dollar** wird zum Kurs bei Entstehung in Euro umgerechnet (Dollar ÷ Kurs). Ändert sich der Kurs, gilt:\n• Wird die Schuld in Euro **höher**, ist sie handelsrechtlich höher anzusetzen (Vorsicht).\n• Wird sie **niedriger**, bleibt es beim alten Wert – außer bei Restlaufzeit **bis zu einem Jahr** (§ 256a S. 2 HGB).\n• Steuerlich höchstens bei **dauerhafter** Erhöhung; ein niedrigerer Wert nie." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Schuld 110.000 USD, Kurs bei Entstehung 1,10 → **100.000 €**. Kurs am 31.12.: 1,00 → 110.000 €. Handelsrechtlich ist die Schuld auf **110.000 €** zu erhöhen." },
    ],
    fragen: [
      { art: "wahl", frage: "Mit welchem Wert stehen Verbindlichkeiten in der Handelsbilanz?", optionen: ["Erfüllungsbetrag", "Barwert", "Auszahlungsbetrag minus 5,5 %", "Teilwert"], richtig: 0, erkl: "§ 253 Abs. 1 S. 2 HGB." },
      { art: "wahl", frage: "Ein zinsloses Darlehen über 50.000 € (Laufzeit 5 Jahre) – steuerlicher Ansatz?", optionen: ["50.000 € – keine Abzinsung mehr", "Abgezinst mit 5,5 %", "0 €", "Nur der Zinsanteil"], richtig: 0, erkl: "Das Abzinsungsgebot ist für Wirtschaftsjahre ab 2023 entfallen." },
      { art: "zahl", frage: "Schuld 60.000 USD, Kurs bei Entstehung 1,20 (1 € = 1,20 USD). Euro-Wert bei Entstehung (in €)?", cent: 5000000, erkl: "60.000 ÷ 1,20 = 50.000 €." },
    ],
  },
  {
    id: "b2-privat", teil: 2, titel: "Entnahmen & Einlagen bewerten", kurz: "§ 4 Abs. 1, § 6 Abs. 1 Nr. 4, 5 EStG", icon: "🔄", normen: ["EStG 4 1", "EStG 6 1"],
    karten: [
      { art: "merksatz", titel: "Mit dem Teilwert", text: "• **Sachentnahmen** (Waren, Gegenstände für private Zwecke) werden mit dem **Teilwert** bewertet (§ 6 Abs. 1 Nr. 4 S. 1 EStG). **Nutzungsentnahmen** (z. B. private Nutzung des Firmenwagens) dagegen mit den **anteiligen Kosten** – beim Pkw per 1-%-Regel oder Fahrtenbuch.\n• **Einlagen** ebenfalls mit dem **Teilwert** (§ 6 Abs. 1 Nr. 5 EStG) – aber **höchstens** mit den (um AfA geminderten) Anschaffungskosten, wenn das Wirtschaftsgut in den **letzten drei Jahren** angeschafft wurde." },
      { art: "erklaerung", titel: "Private Pkw-Nutzung", text: "Nutzt der Unternehmer einen betrieblichen Pkw (mehr als 50 % betrieblich) auch privat, ist das eine **Nutzungsentnahme**:\n• **1-%-Regelung**: monatlich 1 % des **Bruttolistenpreises**, abgerundet auf volle 100 €.\n• Oder per **Fahrtenbuch**: tatsächliche Kosten × privater Anteil.\nBuchung: Privatentnahmen an Erlöse aus Kfz-Nutzung (und Umsatzsteuer)." },
      { art: "beispiel", titel: "Rechenbeispiel", text: "Bruttolistenpreis 45.680 € → abgerundet **45.600 €** × 1 % = 456 € je Monat × 12 = **5.472 €** Nutzungsentnahme im Jahr." },
    ],
    fragen: [
      { art: "zahl", frage: "Bruttolistenpreis 38.950 €, Privatnutzung das ganze Jahr. Nutzungsentnahme nach der 1-%-Regel (in €)?", cent: 466800, erkl: "Abgerundet 38.900 € × 1 % = 389 € × 12 = 4.668 €." },
      { art: "wahl", frage: "Mit welchem Wert werden Sachentnahmen (z. B. Waren) bewertet?", optionen: ["Teilwert", "Anschaffungskosten", "Verkaufspreis", "Buchwert"], richtig: 0, erkl: "§ 6 Abs. 1 Nr. 4 S. 1 EStG." },
      { art: "wahl", frage: "Ein vor 1 Jahr privat gekaufter Laptop (fortgeführte AK 900 €, Teilwert 1.100 €) wird eingelegt. Einlagewert?", optionen: ["900 €", "1.100 €", "0 €", "1.000 €"], richtig: 0, erkl: "Anschaffung innerhalb von drei Jahren → höchstens fortgeführte AK." },
    ],
  },
];
