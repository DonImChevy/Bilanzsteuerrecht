// Lernpfad BilBf (Ausbildung, FTA I – Buchführung und Bilanzwesen).
// Übernimmt die passenden Blöcke aus Bilanzrecht Teil I (ohne Skonti/Rabatte und Kalkulation, die nicht im Lehrplan stehen)
// und ergänzt eigene Blöcke: Inventurarten mit Fortschreibung, BV-Umschichtung oder BV-Änderung, AfA-Grundzüge.
import { PFAD_BSR1 } from "./pfad.js";

const aus = (id) => {
  const b = PFAD_BSR1.find((x) => x.id === id);
  const { teil, ...rest } = b; // ohne Teil-Angabe – BilBf ist nicht in Teil I/II geteilt
  return { ...rest, id: id.replace(/^b1-/, "bbf-") };
};

const INVENTURARTEN = {
  id: "bbf-inventurarten", titel: "Wann und wie wird inventarisiert?", kurz: "§§ 240, 241 HGB · R 5.3 EStR", icon: "🗓️", normen: ["HGB 240", "HGB 241"],
  karten: [
    { art: "merksatz", titel: "Zählen oder aus den Büchern?", text: "Zu Beginn des Gewerbes und zum Schluss jedes Geschäftsjahres werden alle Bestände aufgenommen (§ 240 HGB):\n• **körperlich** – messen, zählen, wiegen (Waren, Kasse, Einrichtung),\n• **buchmäßig** – aus den Unterlagen (Forderungen, Schulden, Bankguthaben).\nBei großen Vorräten reicht unter Umständen eine **Stichprobeninventur** mit anerkannten statistischen Methoden (§ 241 Abs. 1 HGB)." },
    { art: "erklaerung", titel: "Drei Zeitpunkte", text: "• **Stichtagsinventur:** am Bilanzstichtag – „zeitnah“ heißt in der Regel **bis 10 Tage davor oder danach** (R 5.3 Abs. 1 S. 1 EStR).\n• **Zeitverschobene Inventur:** an einem Tag bis **3 Monate vor** oder **2 Monate nach** dem Stichtag; der Wert wird auf den Stichtag **fortgeschrieben** bzw. **zurückgerechnet** (§ 241 Abs. 3 HGB).\n• **Permanente Inventur:** Bestände laufend aus der Lagerbuchführung, aber **mindestens einmal im Jahr** körperlich prüfen (§ 241 Abs. 2 HGB)." },
    { art: "beispiel", titel: "Fortschreiben auf den 31.12.", text: "Inventur am 15.11.: Warenbestand zu Anschaffungskosten **6.000 €**.\nBis 31.12. kommen Waren für **2.400 €** (netto) hinzu; verkauft werden Waren, die **1.100 €** gekostet haben.\nBestand 31.12. = 6.000 € + 2.400 € − 1.100 € = **7.300 €**.\nWichtig: Abgänge mit ihren **Anschaffungskosten** abziehen, nicht mit dem Verkaufspreis – und ohne Umsatzsteuer." },
  ],
  fragen: [
    { art: "wahl", frage: "Bis wann gilt eine Stichtagsinventur zum 31.12. in der Regel noch als zeitnah?", optionen: ["Bis 10 Tage vor oder nach dem Stichtag", "Bis 3 Monate danach", "Nur genau am 31.12.", "Bis zur Abgabe der Steuererklärung"], richtig: 0, erkl: "R 5.3 Abs. 1 S. 1 EStR: in der Regel innerhalb von 10 Tagen vor oder nach dem Bilanzstichtag." },
    { art: "wahl", frage: "Wie weit darf eine zeitverschobene Inventur vor dem Bilanzstichtag liegen?", optionen: ["Bis zu 3 Monate", "Bis zu 2 Monate", "Bis zu 6 Monate", "Gar nicht"], richtig: 0, erkl: "§ 241 Abs. 3 HGB: 3 Monate vor oder 2 Monate nach dem Stichtag – mit Fortschreibung bzw. Rückrechnung." },
    { art: "zahl", frage: "Inventur am 20.11.: Warenbestand 4.500 €. Bis 31.12. Zugänge 1.800 € (netto), Abgänge zu Anschaffungskosten 700 €. Warenbestand am 31.12. (in €)?", cent: 560000, erkl: "4.500 € + 1.800 € − 700 € = 5.600 €." },
    { art: "wahl", frage: "Wie werden Bankguthaben und Forderungen inventarisiert?", optionen: ["Buchmäßig aus den Unterlagen", "Durch Zählen", "Durch Schätzen", "Gar nicht"], richtig: 0, erkl: "Nicht körperliche Werte werden aus Kontoauszügen und Büchern ermittelt." },
    { art: "wahl", frage: "Was verlangt die permanente Inventur zusätzlich zur laufenden Lagerbuchführung?", optionen: ["Mindestens einmal im Jahr eine körperliche Bestandsaufnahme", "Eine Inventur jeden Monat", "Gar nichts", "Die Zustimmung des Finanzamts"], richtig: 0, erkl: "§ 241 Abs. 2 HGB; der Buchbestand muss mindestens einmal jährlich körperlich überprüft werden." },
  ],
};

const BV_ARTEN = {
  id: "bbf-bvarten", titel: "Umschichtung oder Änderung?", kurz: "Arten von Geschäftsvorfällen", icon: "🔀", normen: ["EStG 4 1"],
  karten: [
    { art: "merksatz", titel: "Zwei Kategorien", text: "Jeder Geschäftsvorfall ist entweder\n• eine **Betriebsvermögensumschichtung** – das Betriebsvermögen (Eigenkapital) bleibt **gleich**, nur die Posten verschieben sich, oder\n• eine **Betriebsvermögensänderung** – das Betriebsvermögen (Eigenkapital) wird **größer oder kleiner**." },
    { art: "erklaerung", titel: "Die vier Umschichtungen", text: "• **Aktivtausch:** Büromöbel bar gekauft (BGA ↑, Kasse ↓)\n• **Passivtausch:** Lieferantenschuld wird Darlehen\n• **Aktiv-Passiv-Mehrung:** Darlehen aufs Bankkonto (Bank ↑, Darlehen ↑)\n• **Aktiv-Passiv-Minderung:** Lieferantenrechnung per Bank bezahlt\nKein Fall berührt den Gewinn." },
    { art: "erklaerung", titel: "Die vier Änderungen", text: "**Betrieblich veranlasst** – über die Erfolgskonten, verändert den **Gewinn**:\n• **Aufwand** (BV-Minderung): Miete, Löhne, AfA, Zinsen\n• **Ertrag** (BV-Mehrung): Zinsgutschrift, Provision, Mieteinnahme\n**Privat veranlasst** – über die Privatkonten, **kein** Gewinn (§ 4 Abs. 1 S. 1 EStG):\n• **Entnahme** (BV-Minderung): Geld aus der Kasse für private Einkäufe\n• **Einlage** (BV-Mehrung): privates Geld auf das Geschäftskonto" },
    { art: "beispiel", titel: "Schnell zugeordnet", text: "• Darlehen von der Bank gutgeschrieben → **Umschichtung**, Aktiv-Passiv-Mehrung\n• Abschreibung auf die BGA → **Änderung**, Aufwand\n• 5.000 € vom privaten aufs betriebliche Konto → **Änderung**, Einlage\n• Bareinzahlung von der Kasse auf die Bank → **Umschichtung**, Aktivtausch" },
  ],
  fragen: [
    { art: "wahl", frage: "Büromöbel werden bar aus der Geschäftskasse bezahlt. Was liegt vor?", optionen: ["BV-Umschichtung – Aktivtausch", "BV-Änderung – Aufwand", "BV-Umschichtung – Aktiv-Passiv-Minderung", "BV-Änderung – Entnahme"], richtig: 0, erkl: "BGA nimmt zu, Kasse nimmt ab – das Betriebsvermögen bleibt gleich." },
    { art: "wahl", frage: "Die Abschreibung auf den Fuhrpark wird gebucht. Was liegt vor?", optionen: ["BV-Änderung – Aufwand", "BV-Umschichtung – Aktivtausch", "BV-Änderung – Entnahme", "Keine Veränderung"], richtig: 0, erkl: "Betrieblich veranlasster Werteverzehr mindert das Betriebsvermögen und den Gewinn." },
    { art: "wahl", frage: "Der Unternehmer überweist Geld von seinem privaten auf das betriebliche Bankkonto. Was liegt vor?", optionen: ["BV-Änderung – Einlage", "BV-Änderung – Ertrag", "BV-Umschichtung – Aktiv-Passiv-Mehrung", "BV-Umschichtung – Passivtausch"], richtig: 0, erkl: "Privat veranlasste Mehrung des Betriebsvermögens – erfolgsneutral." },
    { art: "wahl", frage: "Die Bank zahlt ein Darlehen auf das Geschäftskonto aus. Was liegt vor?", optionen: ["BV-Umschichtung – Aktiv-Passiv-Mehrung", "BV-Änderung – Ertrag", "BV-Änderung – Einlage", "BV-Umschichtung – Passivtausch"], richtig: 0, erkl: "Bank und Darlehensschuld steigen gleichermaßen – das Betriebsvermögen bleibt gleich." },
    { art: "wahl", frage: "Welche Geschäftsvorfälle verändern den Gewinn?", optionen: ["Nur betrieblich veranlasste BV-Änderungen (Aufwand, Ertrag)", "Alle BV-Änderungen", "Alle Umschichtungen", "Nur Entnahmen und Einlagen"], richtig: 0, erkl: "Entnahmen und Einlagen ändern das Betriebsvermögen, sind aber privat veranlasst und kein Gewinn." },
  ],
};

const AFA = {
  id: "bbf-afa", titel: "Abschreibung (AfA) – Grundzüge", kurz: "§ 7 Abs. 1 EStG · Digital-AfA", icon: "📉", normen: ["EStG 7 1", "EStG 6 1"],
  karten: [
    { art: "merksatz", titel: "Warum abschreiben?", text: "Ein Lieferwagen hält viele Jahre. Seine Anschaffungskosten werden deshalb **auf die Nutzungsdauer verteilt** – jedes Jahr ein Teil als Aufwand. Das ist die **AfA** (Absetzung für Abnutzung).\nAbgeschrieben wird nur **abnutzbares Anlagevermögen**, also nicht Grund und Boden und nicht Waren, Forderungen oder Bankguthaben." },
    { art: "erklaerung", titel: "Linear und im ersten Jahr anteilig", text: "• **Jahres-AfA** = Anschaffungskosten ÷ Nutzungsdauer laut AfA-Tabelle (§ 7 Abs. 1 S. 1 EStG).\n• Im **Anschaffungsjahr** nur für die Monate ab der Anschaffung – der **Anschaffungsmonat zählt voll** (§ 7 Abs. 1 S. 4 EStG).\n• Angeschafft ist ein Wirtschaftsgut mit der **Lieferung** – nicht mit Bestellung oder Bezahlung.\n• Die abziehbare **Vorsteuer** gehört **nicht** zu den Anschaffungskosten." },
    { art: "erklaerung", titel: "Computer und Software", text: "Für **Computerhardware** (auch Drucker, Bildschirm) und **Software** darf nach dem BMF-Schreiben vom 22.02.2022 eine Nutzungsdauer von **einem Jahr** angesetzt werden – ohne zeitanteilige Kürzung. Das Notebook kann also im Kaufjahr **voll** abgeschrieben werden." },
    { art: "beispiel", titel: "Rechnen und buchen", text: "Maschine, geliefert im **Oktober**, Anschaffungskosten 24.000 € netto, Nutzungsdauer 8 Jahre:\nJahres-AfA 24.000 € ÷ 8 = 3.000 € · Oktober–Dezember = 3 Monate → **750 €**.\nBuchung zum 31.12.: **Abschreibungen 750 € an Maschinen 750 €** – die Abschreibungen gehen in die GuV, der Restbuchwert 23.250 € ins SBK." },
  ],
  fragen: [
    { art: "zahl", frage: "Lieferwagen, geliefert im Juli, Anschaffungskosten 30.000 € netto, Nutzungsdauer 6 Jahre. AfA im ersten Jahr (in €)?", cent: 250000, erkl: "30.000 € ÷ 6 = 5.000 € × 6/12 (Juli–Dezember) = 2.500 €." },
    { art: "wahl", frage: "Eine Maschine wird im März bestellt und im Mai geliefert. Ab wann wird abgeschrieben?", optionen: ["Ab Mai (Lieferung)", "Ab März (Bestellung)", "Ab Zahlung", "Ab Januar"], richtig: 0, erkl: "Angeschafft ist das Wirtschaftsgut mit der Lieferung; der Liefermonat zählt voll." },
    { art: "zahl", frage: "Ein Notebook für 1.200 € netto wird im September gekauft (Nutzungsdauer laut Tabelle 3 Jahre). Höchstmögliche AfA im Kaufjahr (in €)?", cent: 120000, erkl: "Digital-AfA: Nutzungsdauer ein Jahr, keine zeitanteilige Kürzung → 1.200 €." },
    { art: "wahl", frage: "Wie lautet die Buchung der AfA für die Ladeneinrichtung?", optionen: ["Abschreibungen an BGA", "BGA an Abschreibungen", "Abschreibungen an Bank", "GuV an BGA"], richtig: 0, erkl: "Aufwand im Soll, das Anlagekonto nimmt ab (Haben)." },
    { art: "wahl", frage: "Welches Wirtschaftsgut wird nicht planmäßig abgeschrieben?", optionen: ["Grund und Boden", "Lieferwagen", "Ladeneinrichtung", "Maschine"], richtig: 0, erkl: "Grund und Boden nutzt sich nicht ab." },
  ],
};

const reihe = ["b1-pflicht", "b1-buecher", "b1-grundbegriffe", "b1-inventur", INVENTURARTEN, "b1-veraenderung", BV_ARTEN, "b1-konten", "b1-deuten",
  "b1-erfolg", "b1-privat", "b1-ust", "b1-waren", AFA, "b1-abschluss", "b1-bvv"];
export const PFAD_BBF = reihe.map((x) => (typeof x === "string" ? aus(x) : x));
