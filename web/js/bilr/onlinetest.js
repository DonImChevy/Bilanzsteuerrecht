// Generalprobe Online-Lernstandstest Bilanzrecht (Teil I bis Privatkonten): Aufmachung wie der Online-Test der Hochschule
// (Single Choice, Multiple Choice, Lückentext-Buchungssätze mit Auswahllisten, Zahleneingabe), eigene Fälle mit
// immer neuen Zahlen. Nur zeitlich begrenzt sichtbar (SICHTBAR) – zur Vorbereitung auf den Lernstandstest.

export const SICHTBAR = { von: "2026-11-09", bis: "2026-11-10" }; // je einschließlich, Ortszeit
export const MINUTEN = 40;

const tag = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
/** Ist der Test heute freigeschaltet? */
export const sichtbar = (d = new Date()) => tag(d) >= SICHTBAR.von && tag(d) <= SICHTBAR.bis;

// ---------- Zufall (eigener Startwert je Durchlauf, damit der Entwurf nach dem Neuladen gleich bleibt) ----------
function zufall(seed) {
  let s = seed >>> 0;
  const next = () => { let t = (s = (s + 0x6d2b79f5) >>> 0); t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const r = {
    next,
    zahl: (a, b) => a + Math.floor(next() * (b - a + 1)),
    /** Betrag a…b im Raster */
    betrag: (a, b, raster = 10) => r.zahl(Math.ceil(a / raster), Math.floor(b / raster)) * raster,
    wahl: (l) => l[Math.floor(next() * l.length)],
    mischen: (l) => { const a = [...l]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  };
  return r;
}
export const euro = (n) => Number(n).toLocaleString("de-DE", { maximumFractionDigits: 2 });

// ---------- Bausteine ----------
const ART = ["ein Aktivtausch", "ein Passivtausch", "eine Aktiv-Passiv-Mehrung", "eine Aktiv-Passiv-Minderung",
  "eine betrieblich veranlasste Betriebsvermögensmehrung", "eine betrieblich veranlasste Betriebsvermögensminderung",
  "eine privat veranlasste Betriebsvermögensmehrung", "eine privat veranlasste Betriebsvermögensminderung"];
const ART_ERKL = ["Aktivtausch: ein Aktivposten nimmt zu, ein anderer ab – Bilanzsumme und Eigenkapital bleiben gleich.",
  "Passivtausch: ein Passivposten nimmt zu, ein anderer ab – Bilanzsumme und Eigenkapital bleiben gleich.",
  "Aktiv-Passiv-Mehrung: Vermögen und Schulden steigen um denselben Betrag – das Eigenkapital bleibt gleich.",
  "Aktiv-Passiv-Minderung: Vermögen und Schulden sinken um denselben Betrag – das Eigenkapital bleibt gleich.",
  "Ertrag: betrieblich veranlasste Mehrung des Betriebsvermögens (Eigenkapital steigt).",
  "Aufwand: betrieblich veranlasste Minderung des Betriebsvermögens (Eigenkapital sinkt).",
  "Einlage: privat veranlasste Mehrung des Betriebsvermögens.",
  "Entnahme: privat veranlasste Minderung des Betriebsvermögens."];

/** Konten für die Auswahllisten (immer dabei: die typischen Verwechslungen). */
const GRUNDKONTEN = ["Bank", "Kasse", "Eigenkapital", "Entnahmen", "Einlagen", "GuV", "SBK", "EBK"];
const WEITERE = ["Darlehen", "Forderungen aLuL", "Verbindlichkeiten aLuL", "BGA", "Fuhrpark", "Mietaufwand", "Mieterträge", "Löhne", "Zinsaufwand", "Zinserträge", "Büromaterial", "Kfz-Versicherung", "Telefonkosten", "Provisionserträge", "Werbekosten", "Energiekosten"];

const BS = (soll, haben) => ({ soll, haben });

// ---------- Fragenpools ----------
// Jede Vorlage: { nr (Frage-Nummer), typ, erzeugen(r) → { text, bs?, optionen?, richtig?, zeilen?, wert?, erkl } }

/** Was ist passiert? – vom Buchungssatz auf den Geschäftsvorfall schließen (Single Choice). */
const RUECK = [
  { nr: 1, erzeugen: (r) => { const x = r.betrag(120, 900); return { bs: BS([["Entnahmen", x]], [["Bank", x]]),
    optionen: ["Der Unternehmer hat eine private Rechnung vom betrieblichen Bankkonto überwiesen.", "Der Unternehmer hat eine betriebliche Rechnung vom privaten Bankkonto überwiesen.", "Der Unternehmer hat Geld von seinem privaten Sparkonto auf das betriebliche Bankkonto überwiesen.", "Der Unternehmer hat ein betriebliches Darlehen vom betrieblichen Bankkonto getilgt."],
    richtig: 0, erkl: "Entnahmen im Soll = privat veranlasste Minderung des Betriebsvermögens; das Geld fließt vom betrieblichen Bankkonto (Haben) ab." }; } },
  { nr: 2, erzeugen: (r) => { const x = r.betrag(500, 5000, 100); return { bs: BS([["Bank", x]], [["Einlagen", x]]),
    optionen: ["Ein Kunde begleicht eine Forderung per Überweisung.", "Der Unternehmer überweist Geld von seinem privaten Sparkonto auf das betriebliche Bankkonto.", "Die Bank zahlt ein Darlehen auf das Geschäftskonto aus.", "Der Unternehmer hebt Geld vom Geschäftskonto für private Zwecke ab."],
    richtig: 1, erkl: "Bank (Aktivkonto) nimmt im Soll zu, Gegenkonto Einlagen: Geld kommt aus dem Privatvermögen – privat veranlasste BV-Mehrung." }; } },
  { nr: 3, erzeugen: (r) => { const x = r.betrag(200, 3000, 50); return { bs: BS([["Kasse", x]], [["Bank", x]]),
    optionen: ["Der Unternehmer zahlt Bargeld aus der Kasse auf das Bankkonto ein.", "Der Unternehmer hebt Geld vom betrieblichen Bankkonto ab und legt es in die Ladenkasse.", "Der Unternehmer nimmt Bargeld für private Zwecke aus der Kasse.", "Ein Kunde zahlt eine Rechnung bar."],
    richtig: 1, erkl: "Kasse nimmt zu (Soll), Bank nimmt ab (Haben) – Aktivtausch: Abhebung vom Bankkonto in die Kasse." }; } },
  { nr: 4, erzeugen: (r) => { const x = r.betrag(40, 180, 1); return { bs: BS([["Telefonkosten", x]], [["Einlagen", x]]),
    optionen: ["Der Unternehmer hat die private Telefonrechnung vom betrieblichen Bankkonto bezahlt.", "Der Unternehmer hat die betriebliche Telefonrechnung vom betrieblichen Bankkonto bezahlt.", "Der Unternehmer hat die betriebliche Telefonrechnung vom privaten Bankkonto bezahlt.", "Der Unternehmer hat die private Telefonrechnung vom privaten Bankkonto bezahlt."],
    richtig: 2, erkl: "Telefonkosten = betrieblicher Aufwand; bezahlt wurde aus dem Privatvermögen, daher Gegenbuchung auf Einlagen." }; } },
  { nr: 5, erzeugen: (r) => { const x = r.betrag(1000, 8000, 100); return { bs: BS([["Darlehen", x]], [["Bank", x]]),
    optionen: ["Ein betriebliches Darlehen wird vom betrieblichen Bankkonto getilgt.", "Ein Darlehen wird aufgenommen und auf das Bankkonto ausgezahlt.", "Für ein betriebliches Darlehen werden Zinsen bezahlt.", "Ein privates Darlehen wird vom betrieblichen Bankkonto getilgt."],
    richtig: 0, erkl: "Darlehen (Passivkonto) nimmt im Soll ab, Bank im Haben ab – Aktiv-Passiv-Minderung, also Tilgung. Zinsen wären Zinsaufwand, ein privates Darlehen liefe über Entnahmen." }; } },
  { nr: 6, erzeugen: (r) => { const x = r.betrag(15, 400, 1); return { bs: BS([["Bank", x]], [["Zinserträge", x]]),
    optionen: ["Der Unternehmer zahlt Zinsen für ein betriebliches Darlehen.", "Die Bank zahlt ein Darlehen aus.", "Die Bank schreibt Zinsen für das betriebliche Guthaben gut.", "Die Zinsen für das private Sparbuch werden auf dem Sparbuch gutgeschrieben."],
    richtig: 2, erkl: "Zinserträge = betrieblich veranlasste BV-Mehrung, das Geld geht auf dem betrieblichen Bankkonto ein." }; } },
  { nr: 7, erzeugen: (r) => { const b = r.betrag(1000, 4000, 100), p = r.betrag(200, 900, 100); return { bs: BS([["Verbindlichkeiten aLuL", b + p]], [["Bank", b], ["Einlagen", p]]),
    optionen: ["Eine Lieferantenrechnung wurde teils vom betrieblichen, teils vom privaten Bankkonto beglichen.", "Ein Kunde hat seine Rechnung teils per Bank, teils bar bezahlt.", "Ware wurde teils gegen Überweisung, teils auf Ziel eingekauft.", "Der Unternehmer hat eine private Rechnung teils vom betrieblichen Konto bezahlt."],
    richtig: 0, erkl: "Die Verbindlichkeit sinkt um den vollen Betrag; ein Teil fließt vom betrieblichen Bankkonto ab, der Rest kommt aus dem Privatvermögen (Einlage)." }; } },
  { nr: 8, erzeugen: (r) => { const x = r.betrag(6000, 30000, 100); return { bs: BS([["Eigenkapital", x]], [["Entnahmen", x]]),
    optionen: ["Der Unternehmer entnimmt Geld aus der Kasse.", "Das Konto Entnahmen wird zum Jahresende über das Eigenkapital abgeschlossen.", "Das Konto Entnahmen wird über das GuV-Konto abgeschlossen.", "Ein Verlust wird auf das Eigenkapital übertragen."],
    richtig: 1, erkl: "Das Privatkonto Entnahmen ist Unterkonto des Eigenkapitals und wird über das Eigenkapital abgeschlossen – nicht über die GuV." }; } },
  { nr: 9, erzeugen: (r) => { const x = r.betrag(8000, 60000, 100); return { bs: BS([["GuV", x]], [["Eigenkapital", x]]),
    optionen: ["Ein Verlust wird auf das Eigenkapital übertragen.", "Der Gewinn wird auf das Eigenkapital übertragen.", "Das Eigenkapital wird über das SBK abgeschlossen.", "Der Unternehmer legt Geld in den Betrieb ein."],
    richtig: 1, erkl: "Ist im GuV-Konto die Habenseite (Erträge) größer, steht der Saldo im Soll: GuV an Eigenkapital = Gewinn erhöht das Eigenkapital." }; } },
  { nr: 10, erzeugen: (r) => { const x = r.betrag(150, 2500, 10); return { bs: BS([["Kasse", x]], [["Forderungen aLuL", x]]),
    optionen: ["Ein Kunde begleicht eine offene Rechnung bar.", "Ein Kunde kauft auf Ziel.", "Der Unternehmer legt privates Bargeld in die Kasse.", "Der Unternehmer begleicht eine Lieferantenrechnung bar."],
    richtig: 0, erkl: "Kasse nimmt zu (Soll), die Forderung erlischt (Haben) – Aktivtausch." }; } },
  { nr: 11, erzeugen: (r) => { const x = r.betrag(5000, 40000, 1000); return { bs: BS([["Bank", x]], [["Darlehen", x]]),
    optionen: ["Ein betriebliches Darlehen wird getilgt.", "Ein Darlehen wird aufgenommen und dem Geschäftskonto gutgeschrieben.", "Die Bank schreibt Zinsen gut.", "Der Unternehmer überweist privates Geld auf das Geschäftskonto."],
    richtig: 1, erkl: "Bank und Darlehen nehmen beide zu – Aktiv-Passiv-Mehrung: Auszahlung eines Darlehens." }; } },
];

/** Einordnung eines Vorgangs in die acht Arten (Single Choice, Optionen wie im Online-Test). */
const ART_FAELLE = [
  [0, "Ein Kunde begleicht eine offene Rechnung durch Überweisung auf das betriebliche Bankkonto. Dieser Vorgang ist …"],
  [0, "Der Kauf eines Laptops für das Büro gegen Barzahlung ist …"],
  [1, "Die Umwandlung einer Lieferantenverbindlichkeit in ein langfristiges Darlehen ist …"],
  [2, "Der Kauf einer Büroeinrichtung auf Ziel ist …"],
  [2, "Die Auszahlung eines betrieblichen Bankdarlehens auf das Geschäftskonto ist …"],
  [3, "Die Begleichung einer Lieferantenrechnung vom betrieblichen Bankkonto ist …"],
  [4, "Die Gutschrift von Zinsen auf dem betrieblichen Bankkonto ist …"],
  [4, "Ein Untermieter überweist die Miete für einen Lagerraum auf das Geschäftskonto. Dieser Vorgang ist …"],
  [5, "Die Barzahlung des Lohns an eine Aushilfe ist …"],
  [5, "Die Überweisung der Miete für das Ladenlokal vom Geschäftskonto ist …"],
  [6, "Der Unternehmer bringt seinen bisher privat genutzten Laptop dauerhaft in den Betrieb ein. Das ist …"],
  [6, "Der Unternehmer begleicht eine betriebliche Lieferantenrechnung von seinem privaten Bankkonto. Das ist …"],
  [7, "Die Überweisung der privaten Einkommensteuer vom betrieblichen Bankkonto ist …"],
  [7, "Der Unternehmer nimmt Geld aus der Ladenkasse, um seinen Urlaub zu bezahlen. Das ist …"],
];
const ARTEN = ART_FAELLE.map(([art, text], i) => ({ nr: 20 + i, gruppe: art, erzeugen: () => ({ text, optionen: ART, richtig: art, erkl: ART_ERKL[art] }) }));

/** Zusammengesetzte Vorgänge – mehrere Arten zugleich (Multiple Choice). */
const ART_MC = [
  { nr: 40, erzeugen: (r) => { const g = r.betrag(24000, 40000, 1000), b = r.betrag(5000, 12000, 1000);
    return { text: `Ein Lieferwagen wird für ${euro(g)} € gekauft: ${euro(b)} € werden sofort vom Geschäftskonto überwiesen, der Rest wird über ein neues Bankdarlehen finanziert. Der Vorgang ist … (mehrere Antworten möglich)`, optionen: ART, richtig: [0, 2],
      erkl: `Fuhrpark ${euro(g)} an Bank ${euro(b)}, Darlehen ${euro(g - b)}: Bank → Fuhrpark ist ein Aktivtausch, der finanzierte Teil eine Aktiv-Passiv-Mehrung.` }; } },
  { nr: 41, erzeugen: (r) => { const b = r.betrag(1000, 5000, 100), p = r.betrag(300, 1500, 100);
    return { text: `Eine Lieferantenrechnung über ${euro(b + p)} € wird zu ${euro(b)} € vom betrieblichen und zu ${euro(p)} € vom privaten Bankkonto beglichen. Der Vorgang ist … (mehrere Antworten möglich)`, optionen: ART, richtig: [3, 6],
      erkl: "Verbindlichkeiten an Bank = Aktiv-Passiv-Minderung; der privat bezahlte Teil (an Einlagen) mindert die Schulden ohne betriebliches Geld – privat veranlasste BV-Mehrung." }; } },
  { nr: 42, erzeugen: () => ({ text: "Die betriebliche Telefonrechnung wird vom privaten Bankkonto bezahlt. Der Vorgang ist … (mehrere Antworten möglich)", optionen: ART, richtig: [5, 6],
    erkl: "Telefonkosten an Einlagen: Der Aufwand mindert das BV betrieblich veranlasst, die Einlage erhöht es privat veranlasst – beides zugleich." }) },
  { nr: 43, erzeugen: (r) => { const l = r.betrag(900, 2400, 50), w = r.betrag(600, 1400, 50);
    return { text: `Mit einer Überweisung vom Geschäftskonto werden die Miete für das Ladenlokal (${euro(l)} €) und die Miete der privaten Wohnung (${euro(w)} €) bezahlt. Der Vorgang ist … (mehrere Antworten möglich)`, optionen: ART, richtig: [5, 7],
      erkl: `Mietaufwand ${euro(l)}, Entnahmen ${euro(w)} an Bank ${euro(l + w)}: betrieblich veranlasste und privat veranlasste BV-Minderung.` }; } },
  { nr: 44, erzeugen: (r) => { const g = r.betrag(800, 3000, 100), k = r.betrag(200, 600, 50);
    return { text: `Ein Kunde begleicht eine Forderung über ${euro(g)} € per Überweisung; zugleich zahlt der Unternehmer ${euro(k)} € aus der Ladenkasse auf das Bankkonto ein. Beide Vorgänge sind … (mehrere Antworten möglich)`, optionen: ART, richtig: [0],
      erkl: "Bank an Forderungen und Bank an Kasse: zweimal Aktivtausch – nur Aktivposten ändern sich, das Eigenkapital bleibt gleich." }; } },
];

/** Lückentext-Buchungssätze (Auswahllisten für Konto und Betrag). */
const LUECKE = [
  // laufende Buchungen, betrieblich
  { nr: 60, gruppe: "lauf", erzeugen: (r) => { const x = r.betrag(400, 2500, 10), o = r.wahl(["eine Lagerhalle", "eine Werkstatt", "Büroräume", "einen Ausstellungsraum"]); return { text: `Ein Unternehmer mietet ${o} und überweist die Monatsmiete von ${euro(x)} € vom Geschäftskonto.`, zeilen: BS([["Mietaufwand", x]], [["Bank", x]]), erkl: "Mietaufwand (Aufwandskonto) im Soll, Bank im Haben." }; } },
  { nr: 61, gruppe: "lauf", erzeugen: (r) => { const g = r.betrag(18000, 36000, 500), k = r.betrag(1000, 3000, 500), b = r.betrag(5000, 10000, 500);
    return { text: `Ein Unternehmer kauft einen Lieferwagen für ${euro(g)} €. Er zahlt ${euro(k)} € bar an, ${euro(b)} € überweist er vom Geschäftskonto, den Rest schuldet er dem Autohaus.`, zeilen: BS([["Fuhrpark", g]], [["Kasse", k], ["Bank", b], ["Verbindlichkeiten aLuL", g - k - b]]), erkl: "Zusammengesetzter Buchungssatz: Summe Soll = Summe Haben." }; } },
  { nr: 62, gruppe: "lauf", erzeugen: (r) => { const k = r.betrag(100, 800, 10), b = r.betrag(800, 4000, 10);
    return { text: `Ein Kunde begleicht seine offene Rechnung über ${euro(k + b)} €: ${euro(k)} € zahlt er bar, den Rest überweist er.`, zeilen: BS([["Kasse", k], ["Bank", b]], [["Forderungen aLuL", k + b]]), erkl: "Kasse und Bank nehmen zu (Soll), die Forderung erlischt (Haben) – Aktivtausch." }; } },
  { nr: 63, gruppe: "lauf", erzeugen: (r) => { const x = r.betrag(150, 600, 10), o = r.wahl(["einen Kellerraum", "eine Garage", "einen Lagerplatz", "ein Büro"]); return { text: `Ein Untermieter zahlt die Miete für ${o} des Betriebs von ${euro(x)} € bar.`, zeilen: BS([["Kasse", x]], [["Mieterträge", x]]), erkl: "Mieterträge (Ertragskonto) nehmen im Haben zu." }; } },
  { nr: 64, gruppe: "lauf", erzeugen: (r) => { const k = r.betrag(200, 600, 10), b = r.betrag(1500, 3500, 10);
    return { text: `Der Lohn einer Mitarbeiterin von ${euro(k + b)} € wird zu ${euro(k)} € bar ausgezahlt, der Rest wird überwiesen.`, zeilen: BS([["Löhne", k + b]], [["Kasse", k], ["Bank", b]]), erkl: "Löhne sind Aufwand (Soll); Kasse und Bank nehmen ab (Haben)." }; } },
  { nr: 65, gruppe: "lauf", erzeugen: (r) => { const z = r.betrag(80, 400, 1), t = r.betrag(800, 2500, 100);
    return { text: `Für ein betriebliches Darlehen wird eine Rate von ${euro(z + t)} € vom Geschäftskonto abgebucht. Darin sind ${euro(z)} € Zinsen enthalten, der Rest ist Tilgung.`, zeilen: BS([["Darlehen", t], ["Zinsaufwand", z]], [["Bank", z + t]]), erkl: "Nur die Zinsen sind Aufwand; die Tilgung mindert die Darlehensschuld (Aktiv-Passiv-Minderung)." }; } },
  // privat veranlasst
  { nr: 70, gruppe: "privat", erzeugen: (r) => { const p = r.betrag(500, 1500, 100), b = r.betrag(2000, 5000, 100);
    return { text: `Ein Unternehmer begleicht eine Tilgungsrate für ein betriebliches Darlehen (${euro(p + b)} €) in Höhe von ${euro(p)} € vom privaten und in Höhe von ${euro(b)} € vom betrieblichen Bankkonto.`, zeilen: BS([["Darlehen", p + b]], [["Bank", b], ["Einlagen", p]]), erkl: "Die Schuld sinkt um die ganze Rate; der privat bezahlte Teil ist eine Einlage." }; } },
  { nr: 71, gruppe: "privat", erzeugen: (r) => { const x = r.betrag(60, 250, 1), o = r.wahl(["Stromrechnung", "Gasrechnung", "Internetrechnung", "Handwerkerrechnung"]); return { text: `Die Unternehmerin überweist die ${o} ihrer Privatwohnung über ${euro(x)} € vom betrieblichen Bankkonto.`, zeilen: BS([["Entnahmen", x]], [["Bank", x]]), erkl: "Private Rechnung, betriebliches Geld: Entnahme – kein Aufwand." }; } },
  { nr: 72, gruppe: "privat", erzeugen: (r) => { const x = r.betrag(300, 1200, 1); return { text: `Die Unternehmerin bezahlt die Versicherung für den betrieblichen Lieferwagen von ${euro(x)} € von ihrem privaten Bankkonto.`, zeilen: BS([["Kfz-Versicherung", x]], [["Einlagen", x]]), erkl: "Betrieblicher Aufwand, privates Geld: Gegenbuchung auf Einlagen." }; } },
  { nr: 73, gruppe: "privat", erzeugen: (r) => { const x = r.betrag(300, 900, 50), o = r.wahl(["Schreibtisch", "Aktenschrank", "Drucker", "Bürostuhl"]); return { text: `Ein Unternehmer bringt seinen bisher privat genutzten ${o} dauerhaft in sein Büro ein. Der Wert (Teilwert) beträgt ${euro(x)} €.`, zeilen: BS([["BGA", x]], [["Einlagen", x]]), erkl: "Sacheinlage: BGA nimmt zu, Gegenkonto Einlagen." }; } },
  { nr: 74, gruppe: "privat", erzeugen: (r) => { const l = r.betrag(900, 2400, 50), w = r.betrag(600, 1400, 50);
    return { text: `Mit einer Überweisung vom Geschäftskonto über ${euro(l + w)} € bezahlt ein Unternehmer die Miete für sein Ladenlokal (${euro(l)} €) und die Miete seiner Privatwohnung (${euro(w)} €).`, zeilen: BS([["Mietaufwand", l], ["Entnahmen", w]], [["Bank", l + w]]), erkl: "Nur die Ladenmiete ist Aufwand; die private Miete ist eine Entnahme." }; } },
  { nr: 75, gruppe: "privat", erzeugen: (r) => { const x = r.betrag(100, 600, 10); return { text: `Ein Unternehmer nimmt ${euro(x)} € aus der Ladenkasse für ${r.wahl(["einen Wochenendausflug mit der Familie", "Geburtstagsgeschenke", "einen Restaurantbesuch mit Freunden", "neue Kleidung"])}.`, zeilen: BS([["Entnahmen", x]], [["Kasse", x]]), erkl: "Bargeldentnahme: Entnahmen an Kasse." }; } },
  // Eröffnung und Abschluss
  { nr: 80, gruppe: "abschluss", erzeugen: (r) => { const x = r.betrag(18000, 42000, 100); return { text: `Das Konto Löhne weist zum 31.12. einen Saldo von ${euro(x)} € aus. Buchen Sie den Abschluss des Kontos.`, zeilen: BS([["GuV", x]], [["Löhne", x]]), erkl: "Aufwandskonten werden über das GuV-Konto abgeschlossen; der Saldo steht im Haben des Aufwandskontos." }; } },
  { nr: 81, gruppe: "abschluss", erzeugen: (r) => { const x = r.betrag(200, 2000, 10); return { text: `Das Konto Zinserträge weist zum 31.12. einen Saldo von ${euro(x)} € aus. Buchen Sie den Abschluss des Kontos.`, zeilen: BS([["Zinserträge", x]], [["GuV", x]]), erkl: "Ertragskonten: Saldo im Soll, Gegenbuchung im Haben des GuV-Kontos." }; } },
  { nr: 82, gruppe: "abschluss", erzeugen: (r) => { const a = r.betrag(60000, 120000, 100), g = r.betrag(4000, 30000, 100), verlust = r.next() < 0.35, e = verlust ? a - g : a + g;
    return { text: `Im GuV-Konto stehen zum 31.12. Aufwendungen von ${euro(a)} € und Erträge von ${euro(e)} €. Buchen Sie den Abschluss des GuV-Kontos.`, zeilen: verlust ? BS([["Eigenkapital", g]], [["GuV", g]]) : BS([["GuV", g]], [["Eigenkapital", g]]),
      erkl: verlust ? `Verlust von ${euro(g)} € (Aufwendungen > Erträge): Saldo im Haben des GuV-Kontos, das Eigenkapital sinkt.` : `Gewinn von ${euro(g)} € (Erträge > Aufwendungen): Saldo im Soll des GuV-Kontos, das Eigenkapital steigt.` }; } },
  { nr: 83, gruppe: "abschluss", erzeugen: (r) => { const x = r.betrag(8000, 30000, 100); return { text: `Das Konto Entnahmen weist zum 31.12. einen Saldo von ${euro(x)} € aus. Buchen Sie den Abschluss des Kontos.`, zeilen: BS([["Eigenkapital", x]], [["Entnahmen", x]]), erkl: "Privatkonten werden über das Eigenkapital abgeschlossen – Entnahmen mindern das Eigenkapital, nicht den Gewinn." }; } },
  { nr: 84, gruppe: "abschluss", erzeugen: (r) => { const x = r.betrag(1000, 9000, 100); return { text: `Das Konto Einlagen weist zum 31.12. einen Saldo von ${euro(x)} € aus. Buchen Sie den Abschluss des Kontos.`, zeilen: BS([["Einlagen", x]], [["Eigenkapital", x]]), erkl: "Einlagen erhöhen das Eigenkapital: Saldo im Soll der Einlagen, Haben des Eigenkapitals." }; } },
  { nr: 85, gruppe: "abschluss", erzeugen: (r) => { const x = r.betrag(10000, 50000, 100); return { text: `Zu Beginn des Wirtschaftsjahres besteht ein betriebliches Darlehen von ${euro(x)} €. Buchen Sie die Eröffnungsbuchung.`, zeilen: BS([["EBK", x]], [["Darlehen", x]]), erkl: "Passivkonten beginnen mit dem Anfangsbestand im Haben, Gegenkonto ist das EBK (Spiegelbild der Eröffnungsbilanz)." }; } },
  { nr: 86, gruppe: "abschluss", erzeugen: (r) => { const x = r.betrag(3000, 15000, 10); return { text: `Das Konto Verbindlichkeiten aLuL weist zum 31.12. einen Endbestand von ${euro(x)} € aus. Buchen Sie den Abschluss des Kontos.`, zeilen: BS([["Verbindlichkeiten aLuL", x]], [["SBK", x]]), erkl: "Passivkonten: Endbestand im Soll des Kontos, Gegenbuchung im Haben des SBK." }; } },
  { nr: 87, gruppe: "abschluss", erzeugen: (r) => { const x = r.betrag(2000, 25000, 10); return { text: `Das betriebliche Bankkonto weist zum 31.12. einen Endbestand von ${euro(x)} € aus. Buchen Sie den Abschluss des Kontos.`, zeilen: BS([["SBK", x]], [["Bank", x]]), erkl: "Aktivkonten: Endbestand im Haben des Kontos, Gegenbuchung im Soll des SBK." }; } },
];

/** Wohin wird das Konto abgeschlossen? (Single Choice SBK / GuV / EK) */
const WOHIN = [["Zinserträge", 1], ["BGA", 0], ["Entnahmen", 2], ["Einlagen", 2], ["GuV", 2], ["Darlehen", 0], ["Löhne", 1], ["Eigenkapital", 0], ["Mietaufwand", 1], ["Kasse", 0], ["Provisionserträge", 1], ["Forderungen aLuL", 0]];
const WOHIN_ERKL = ["Bestandskonten (und das Eigenkapital) werden über das SBK abgeschlossen.", "Aufwands- und Ertragskonten werden über das GuV-Konto abgeschlossen.", "Unterkonten des Eigenkapitals (GuV, Entnahmen, Einlagen) werden über das Eigenkapital abgeschlossen."];
const ABSCHLUSS = WOHIN.map(([k, i], j) => ({ nr: 100 + j, erzeugen: () => ({ text: `Wohin wird das Konto „**${k}**“ im Rahmen der Abschlussbuchungen abgeschlossen?`, optionen: ["SBK", "GuV", "EK"], richtig: i, erkl: WOHIN_ERKL[i] }) }));

/** Soll oder Haben? (Single Choice) */
const SEITE = [
  ["Auf welcher Seite des Kontos Darlehen steht der Anfangsbestand?", 1, "Passivkonten: Anfangsbestand im Haben (wie in der Bilanz)."],
  ["Auf welcher Seite des GuV-Kontos steht der Saldo des Kontos Mieterträge?", 1, "Erträge stehen im GuV-Konto im Haben."],
  ["Auf welcher Seite des Kontos Eigenkapital wird ein Verlust gebucht?", 0, "Ein Verlust mindert das Eigenkapital – Minderungen eines Passivkontos stehen im Soll."],
  ["Auf welcher Seite des Kontos Eigenkapital steht der Saldo (Endkapital), der ins SBK übertragen wird?", 0, "Das Endkapital gleicht das Konto auf der kleineren Seite aus – beim Eigenkapital im Soll (Gegenbuchung im Haben des SBK)."],
  ["Auf welcher Seite des SBK erscheint der Endbestand des Kontos Kasse?", 0, "Aktive Bestände stehen im SBK im Soll."],
  ["Auf welcher Seite des Kontos Einlagen werden die Einlagen während des Jahres gebucht?", 1, "Einlagen erhöhen das Eigenkapital – Zugänge stehen wie beim Eigenkapital im Haben."],
  ["Auf welcher Seite eines Aufwandskontos werden die laufenden Aufwendungen gebucht?", 0, "Aufwand mindert das Eigenkapital – daher im Soll."],
].map(([text, i, erkl], j) => ({ nr: 120 + j, erzeugen: () => ({ text, optionen: ["Soll", "Haben"], richtig: i, erkl }) }));

/** Aussagen zum Kontensystem (Multiple Choice, aus einem Pool gemischt). */
const AUSSAGEN_KONTEN = [
  [["Aktive Bestandskonten weisen den Anfangsbestand im Soll aus.", true], ["Abgänge auf Passivkonten werden im Haben gebucht.", false], ["Der Saldo wird auf der kleineren Kontoseite eingesetzt und gleicht das Konto aus.", true], ["Ein Aktivtausch verändert die Bilanzsumme.", false], ["Belasten bedeutet, im Soll zu buchen.", true]],
  [["Das Schlussbilanzkonto enthält den Buchbestand (Sollbestand), das Inventar den tatsächlichen Bestand (Istbestand).", true], ["Die Einrichtung eines Schlussbilanzkontos ist gesetzlich vorgeschrieben.", false], ["Das Eröffnungsbilanzkonto ist das Spiegelbild der Eröffnungsbilanz.", true], ["Das Eröffnungsbilanzkonto ist das Gegenkonto für die Abschlussbuchungen der Bestandskonten.", false], ["Gutschreiben bedeutet, im Haben zu buchen.", true]],
  [["Bei einem zusammengesetzten Buchungssatz muss die Summe der Sollbeträge der Summe der Habenbeträge entsprechen.", true], ["Im Buchungssatz wird zuerst das Konto der Habenbuchung genannt.", false], ["Zugänge auf Aktivkonten werden im Haben gebucht.", false], ["Eine Aktiv-Passiv-Minderung verringert die Bilanzsumme.", true], ["Ein Passivtausch verändert das Eigenkapital.", false]],
];
const AUSSAGEN_ERFOLG = [
  [["Aufwands- und Ertragskonten sind Unterkonten des Eigenkapitals.", true], ["Ertragskonten werden über das SBK abgeschlossen.", false], ["Entnahmen mindern den Gewinn.", false], ["Ein Gewinn steht als Saldo auf der Sollseite des GuV-Kontos.", true], ["Aufwendungen sind betrieblich veranlasste Minderungen des Betriebsvermögens.", true]],
  [["Das GuV-Konto wird über das Eigenkapital abgeschlossen.", true], ["Privatkonten werden über das GuV-Konto abgeschlossen.", false], ["Die Tilgung eines betrieblichen Darlehens ist Aufwand.", false], ["Einlagen erhöhen das Eigenkapital, aber nicht den Gewinn.", true], ["Für Unterkonten gelten dieselben Buchungsregeln wie für das Hauptkonto.", true]],
  [["Erträge sind betrieblich veranlasste Mehrungen des Betriebsvermögens.", true], ["Ein Verlust erhöht das Eigenkapital.", false], ["Das Konto Zinsaufwand wird über das GuV-Konto abgeschlossen.", true], ["Die Bezahlung einer privaten Rechnung vom Geschäftskonto ist Aufwand.", false], ["Beim Abschluss des Kontos Entnahmen steht der Saldo im Haben.", true]],
];
const aussagen = (nr, gruppen, titel) => ({ nr, erzeugen: (r, d = 0) => {
  const w = r.mischen(gruppen[d % gruppen.length]);
  return { text: `${titel} (mehrere Antworten möglich)`, optionen: w.map((a) => a[0]), richtig: w.flatMap((a, i) => (a[1] ? [i] : [])), erkl: "Falsch: " + w.filter((a) => !a[1]).map((a) => `„${a[0]}“`).join(" · ") }; } });
const AUSSAGEN = [aussagen(140, AUSSAGEN_KONTEN, "Welche Aussagen zu Konten und Buchungssätzen sind richtig?"), aussagen(141, AUSSAGEN_ERFOLG, "Welche Aussagen zu Erfolgs- und Privatkonten sind richtig?")];

/** Zahleneingabe. */
const ZAHL = [
  { nr: 160, erzeugen: (r) => { const ak = r.betrag(40000, 90000, 1000), a = r.betrag(50000, 90000, 500), g = r.betrag(10000, 35000, 500), e = a + g, en = r.betrag(15000, 30000, 500), ei = r.betrag(1000, 6000, 500), end = ak + g - en + ei;
    return { text: `Anfangskapital ${euro(ak)} € · Aufwendungen ${euro(a)} € · Erträge ${euro(e)} € · Entnahmen ${euro(en)} € · Einlagen ${euro(ei)} €. Wie hoch ist das Eigenkapital, das ins SBK übernommen wird (in €)?`, wert: end,
      erkl: `Gewinn ${euro(e)} − ${euro(a)} = ${euro(g)} €; Endkapital ${euro(ak)} + ${euro(g)} − ${euro(en)} + ${euro(ei)} = ${euro(end)} €.` }; } },
  { nr: 161, erzeugen: (r) => { const ea = r.betrag(50000, 90000, 1000), en = r.betrag(15000, 35000, 500), ei = r.betrag(1000, 8000, 500), g = r.betrag(-5000, 40000, 500), ee = ea + g - en + ei;
    return { text: `Eigenkapital am 1.1.: ${euro(ea)} €, am 31.12.: ${euro(ee)} €. Im Laufe des Jahres hat der Unternehmer ${euro(en)} € entnommen und ${euro(ei)} € eingelegt. Wie hoch ist der Gewinn (Verlust mit Minuszeichen) in €?`, wert: g,
      erkl: `Kapitalvergleich: ${euro(ee)} − ${euro(ea)} + Entnahmen ${euro(en)} − Einlagen ${euro(ei)} = ${euro(g)} €.` }; } },
  { nr: 162, erzeugen: (r) => { const ab = r.betrag(3000, 12000, 10), z = [r.betrag(500, 3000, 10), r.betrag(200, 1500, 10)], ab2 = [r.betrag(300, 2000, 10), r.betrag(100, 900, 10)], end = ab + z[0] + z[1] - ab2[0] - ab2[1];
    return { text: `Konto Bank: Anfangsbestand ${euro(ab)} €. Ein Kunde überweist ${euro(z[0])} €, der Unternehmer zahlt ${euro(z[1])} € aus der Kasse ein, die Ladenmiete von ${euro(ab2[0])} € wird abgebucht und der Unternehmer überweist ${euro(ab2[1])} € für eine private Rechnung. Welcher Endbestand wird ins SBK übernommen (in €)?`, wert: end,
      erkl: `${euro(ab)} + ${euro(z[0])} + ${euro(z[1])} − ${euro(ab2[0])} − ${euro(ab2[1])} = ${euro(end)} € (Saldo im Haben der Bank, Soll des SBK).` }; } },
  { nr: 163, erzeugen: (r) => { const l = r.betrag(20000, 40000, 100), m = r.betrag(8000, 15000, 100), z = r.betrag(300, 2000, 10), p = r.betrag(30000, 70000, 100), me = r.betrag(1000, 5000, 100), en = r.betrag(5000, 15000, 100), g = p + me - l - m - z;
    return { text: `Salden zum 31.12.: Löhne ${euro(l)} €, Mietaufwand ${euro(m)} €, Zinsaufwand ${euro(z)} €, Provisionserträge ${euro(p)} €, Mieterträge ${euro(me)} €, Entnahmen ${euro(en)} €. Welcher Saldo ergibt sich im GuV-Konto (Gewinn positiv, Verlust mit Minuszeichen) in €?`, wert: g,
      erkl: `Erträge ${euro(p + me)} − Aufwendungen ${euro(l + m + z)} = ${euro(g)} €. Die Entnahmen gehören nicht ins GuV-Konto.` }; } },
  { nr: 164, erzeugen: (r) => { const bga = r.betrag(8000, 30000, 100), fp = r.betrag(15000, 45000, 500), bank = r.betrag(3000, 20000, 10), kasse = r.betrag(300, 2500, 10), dar = r.betrag(10000, 30000, 500), vb = r.betrag(2000, 12000, 10), ek = bga + fp + bank + kasse - dar - vb;
    return { text: `Laut Inventar zum 31.12.: BGA ${euro(bga)} €, Fuhrpark ${euro(fp)} €, Bank ${euro(bank)} €, Kasse ${euro(kasse)} €, Darlehen ${euro(dar)} €, Verbindlichkeiten aLuL ${euro(vb)} €. Wie hoch ist das Eigenkapital (in €)?`, wert: ek,
      erkl: `Bilanzgleichung: Eigenkapital = Vermögen ${euro(bga + fp + bank + kasse)} − Schulden ${euro(dar + vb)} = ${euro(ek)} €.` }; } },
  { nr: 165, erzeugen: (r) => { const m = r.betrag(600, 2000, 10), z = r.betrag(30, 300, 1), en = r.betrag(300, 1500, 10), bga = r.betrag(1000, 5000, 100), t = r.betrag(1000, 4000, 100), ei = r.betrag(200, 2000, 100), d = -m + z - en + ei;
    return { text: `Welche Auswirkung haben folgende Vorgänge insgesamt auf das Eigenkapital (Minderung mit Minuszeichen, in €)? Ladenmiete ${euro(m)} € per Bank · Zinsgutschrift ${euro(z)} € · Bargeldentnahme ${euro(en)} € · Kauf einer Regalanlage auf Ziel ${euro(bga)} € · Darlehenstilgung ${euro(t)} € per Bank · Einlage ${euro(ei)} € auf das Geschäftskonto`, wert: d,
      erkl: `Nur Aufwand, Ertrag, Entnahme und Einlage ändern das Eigenkapital: −${euro(m)} + ${euro(z)} − ${euro(en)} + ${euro(ei)} = ${euro(d)} €. Kauf auf Ziel und Tilgung sind Aktiv-Passiv-Mehrung bzw. -Minderung.` }; } },
];

// ---------- Zusammenstellung ----------
export const FRAGETYP = { sc: "Single Choice", mc: "Multiple Choice", luecke: "Lückentextfrage", zahl: "Numerische Frage" };
const PLAN = [
  [RUECK, "sc", 3], [ARTEN, "sc", 3], [ART_MC, "mc", 1], [LUECKE.filter((v) => v.gruppe === "lauf"), "luecke", 2],
  [LUECKE.filter((v) => v.gruppe === "privat"), "luecke", 2], [LUECKE.filter((v) => v.gruppe === "abschluss"), "luecke", 2],
  [ABSCHLUSS, "sc", 2], [SEITE, "sc", 1], [AUSSAGEN, "mc", 2], [ZAHL, "zahl", 2],
];
export const ALLE_VORLAGEN = PLAN.flatMap(([pool, typ]) => pool.map((v) => ({ ...v, typ })));

/** Durchgänge je Runde, in denen keine Aufgabe doppelt vorkommt. */
export const RUNDE = 3;
/**
 * Fragen eines Durchgangs (deterministisch aus Startwert, schon gezogenen Vorlagen `ohne` und Durchgang `d`).
 * Noch nicht gezogene Vorlagen haben Vorrang – so bringen die Durchgänge einer Runde lauter verschiedene Aufgaben.
 */
export function testErzeugen(seed, ohne = [], d = 0) {
  const r = zufall(seed), fragen = [], weg = new Set(ohne);
  for (const [pool, typ, n] of PLAN) {
    const gemischt = r.mischen(pool), wahl = [...gemischt.filter((v) => !weg.has(v.nr)), ...gemischt.filter((v) => weg.has(v.nr))];
    let pick = [];
    if (pool === ARTEN) { // möglichst verschiedene Arten
      const ges = new Set();
      for (const v of wahl) if (pick.length < n && !weg.has(v.nr) && !ges.has(v.gruppe)) { pick.push(v); ges.add(v.gruppe); }
      for (const v of wahl) if (pick.length < n && !pick.includes(v)) pick.push(v);
    } else pick = wahl.slice(0, n);
    for (const v of pick) fragen.push(frage(v, typ, zufall(seed * 7919 + v.nr), d));
  }
  return r.mischen(fragen);
}
/** Fragen eines gespeicherten Durchgangs. */
export const fragenVon = (t) => testErzeugen(t.seed, t.ohne || [], t.d || 0);
function frage(v, typ, r, d) {
  const f = { nr: v.nr, id: 1066000 + v.nr * 7, typ, ...v.erzeugen(r, d) };
  if (f.text == null && f.bs) f.text = "";
  if (typ === "sc" && f.optionen.length === 4) { // Antwortreihenfolge mischen (die Achter-Liste und SBK/GuV/EK bleiben fest)
    const o = r.mischen(f.optionen.map((t, i) => [t, i])); f.richtig = o.findIndex(([, i]) => i === f.richtig); f.optionen = o.map(([t]) => t);
  }
  if (typ === "luecke") {
    const alle = [...f.zeilen.soll, ...f.zeilen.haben], richtigeKonten = alle.map(([k]) => k);
    const extra = r.mischen(WEITERE.filter((k) => !richtigeKonten.includes(k))).slice(0, 3);
    f.konten = [...new Set([...GRUNDKONTEN, ...richtigeKonten, ...extra])].sort((a, b) => a.localeCompare(b, "de"));
    const b = alle.map(([, x]) => x), summe = b.reduce((s, x) => s + x, 0) / 2;
    const fallen = [summe, ...b.map((x) => x * 2), ...b.map((x) => Math.round(x * 1.1)), ...(b.length > 2 ? [b[1] + b[2]] : [])];
    f.betraege = [...new Set([...b, ...fallen])].filter((x) => x > 0).sort((a, c) => a - c).slice(0, 9);
    if (!b.every((x) => f.betraege.includes(x))) f.betraege = [...new Set([...b, ...f.betraege])].sort((a, c) => a - c);
    f.zeilenZahl = Math.max(2, f.zeilen.soll.length, f.zeilen.haben.length); // wie im Online-Test: immer mindestens zwei Zeilen
  }
  f.punkte = typ === "luecke" ? (f.zeilen.soll.length + f.zeilen.haben.length) * 0.5 : 1;
  return f;
}

// ---------- Bewertung ----------
/** Punkte einer Antwort. Lückentext: je richtig gewähltem Konto bzw. Betrag 0,25 Punkte, überzählige Einträge kosten 0,25. */
export function bewerten(f, a) {
  if (a == null) return 0;
  if (f.typ === "sc") return a === f.richtig ? 1 : 0;
  if (f.typ === "mc") { const s = new Set(a); return f.richtig.length === s.size && f.richtig.every((i) => s.has(i)) ? 1 : 0; }
  if (f.typ === "zahl") { const z = zahlLesen(a); return z != null && Math.abs(z - f.wert) < 0.005 ? 1 : 0; }
  let p = 0;
  for (const seite of ["soll", "haben"]) {
    const offen = f.zeilen[seite].map(([k, b]) => ({ k, b, frei: true }));
    const eingaben = Array.from({ length: f.zeilenZahl }, (_, i) => ({ k: a[`${seite}${i}k`] || "", b: a[`${seite}${i}b`] ? Number(a[`${seite}${i}b`]) : null }));
    // erst exakte Treffer (Konto + Betrag) zuordnen, dann nur Konten
    for (const genau of [true, false]) for (const e of eingaben) {
      if (e.zu || !e.k) continue;
      const t = offen.find((o) => o.frei && o.k === e.k && (!genau || o.b === e.b));
      if (t) { t.frei = false; e.zu = t; p += 0.25 + (t.b === e.b ? 0.25 : 0); }
    }
    for (const e of eingaben) if (!e.zu) p -= (e.k ? 0.25 : 0) + (e.b != null ? 0.25 : 0);
  }
  return Math.max(0, p);
}
export function zahlLesen(t) {
  if (t == null || String(t).trim() === "") return null;
  const s = String(t).replace(/\s|€/g, "").replace(/[−–]/g, "-").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  const z = Number(s); return Number.isFinite(z) ? z : null;
}
export const gesamtPunkte = (fragen) => fragen.reduce((s, f) => s + f.punkte, 0);
export const erreicht = (fragen, antworten) => fragen.reduce((s, f, i) => s + bewerten(f, antworten[i]), 0);
export const beantwortet = (f, a) => a != null && (f.typ === "mc" ? a.length > 0 : f.typ === "luecke" ? Object.values(a).some(Boolean) : a !== "");
const pz = (n) => n.toLocaleString("de-DE", { maximumFractionDigits: 2 });
const prozent = (a, b) => (b ? (a / b) * 100 : 0).toLocaleString("de-DE", { maximumFractionDigits: 2 });

// ---------- Ansicht ----------
const md = (t, esc) => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const bsZeile = (bs) => `<div class="ot-bs" aria-label="Buchungssatz">${[0, 1].map((s) => `<span class="ot-bs-seite">${(s ? bs.haben : bs.soll).map(([k, x]) => `<span class="ot-bs-posten">${k}&nbsp;&nbsp;${euro(x)}</span>`).join("")}</span>`).join(`<b class="ot-an">AN</b>`)}</div>`;
const fragKopf = (f, h) => f.bs ? `<p class="ot-text">Folgender Buchungssatz wurde erfasst:</p>${bsZeile(f.bs)}<p class="ot-text">Was ist passiert?</p>` : `<p class="ot-text">${md(f.text, h.esc)}</p>`;
const nrText = (f) => `Frage ${String(f.nr).padStart(3, "0")}`;

/** Wahl-Liste (Single/Multiple Choice); nach der Abgabe mit Lösung. */
function wahlListe(f, a, i, h, fertig) {
  const mc = f.typ === "mc", gewaehlt = (j) => (mc ? (a || []).includes(j) : a === j), richtig = (j) => (mc ? f.richtig.includes(j) : f.richtig === j);
  return `<div class="ot-wahl${mc ? " mc" : ""}" role="${mc ? "group" : "radiogroup"}">${f.optionen.map((o, j) => {
    const zustand = fertig ? (richtig(j) ? " soll" : "") + (gewaehlt(j) && !richtig(j) ? " falsch" : "") : "";
    const inhalt = `<span class="ot-marke" aria-hidden="true"></span><span class="ot-opt">${md(o, h.esc)}</span>${fertig ? (gewaehlt(j) === richtig(j) ? `<span class="ot-ok" title="richtig">${h.ic("haken", "klein")}</span>` : `<span class="ot-nok" title="falsch">${h.ic("kreuz", "klein")}</span>`) : ""}`;
    return fertig ? `<div class="ot-option${gewaehlt(j) ? " an" : ""}${zustand}">${inhalt}</div>`
      : `<button class="ot-option${gewaehlt(j) ? " an" : ""}" role="${mc ? "checkbox" : "radio"}" aria-checked="${gewaehlt(j)}" data-a="otWahl" data-v="${i}|${j}">${inhalt}</button>`;
  }).join("")}</div>`;
}
/** Lückentext: Buchungssatz mit Auswahllisten. */
function lueckeView(f, a, i, h, fertig) {
  a ||= {};
  const auswahl = (feld, liste, fmt, breit) => {
    const wert = a[feld] || "";
    if (fertig) return `<span class="ot-gap fest${wert ? "" : " leer"}">${wert ? h.esc(fmt(wert)) : "—"}</span>`;
    return `<label class="ot-gap${breit ? " konto" : ""}${wert ? " voll" : ""}"><select data-ot-luecke="${i}|${feld}" aria-label="${feld.startsWith("soll") ? "Soll" : "Haben"} ${breit ? "Konto" : "Betrag"}">
      <option value=""${wert ? "" : " selected"}>${breit ? "Konto" : "Betrag"}</option>${liste.map((x) => `<option value="${x}"${String(x) === String(wert) ? " selected" : ""}>${h.esc(fmt(x))}</option>`).join("")}</select>
      <svg class="ot-pfeile" viewBox="0 0 10 16" aria-hidden="true"><path d="M2 6l3-3 3 3M2 10l3 3 3-3"/></svg></label>`;
  };
  const block = (seite) => `<div class="ot-block" aria-label="${seite === "soll" ? "Soll" : "Haben"}"><span class="ot-block-titel">${seite === "soll" ? "Soll" : "Haben"}</span>${Array.from({ length: f.zeilenZahl }, (_, z) =>
    `<span class="ot-seite">${auswahl(`${seite}${z}k`, f.konten, String, true)}${auswahl(`${seite}${z}b`, f.betraege, euro)}</span>`).join("")}</div>`;
  return `<div class="ot-luecke">${block("soll")}<b class="ot-an">AN</b>${block("haben")}</div>`;
}
function zahlView(f, a, i, h, fertig) {
  if (fertig) return `<div class="ot-zahl-fest"><span>Ihre Eingabe</span><b>${a ? h.esc(a) : "—"}</b> €</div>`;
  return `<label class="ot-zahl"><input type="text" inputmode="decimal" autocomplete="off" data-ot-zahl="${i}" data-fokus="ot${i}" value="${h.esc(a || "")}" placeholder="0"><span>€</span></label>`;
}
const antwortView = (f, a, i, h, fertig) => f.typ === "luecke" ? lueckeView(f, a, i, h, fertig) : f.typ === "zahl" ? zahlView(f, a, i, h, fertig) : wahlListe(f, a, i, h, fertig);

/** Musterlösung einer Frage (nach der Abgabe). */
function loesung(f, h) {
  if (f.typ === "luecke") return `<div class="ot-muster"><span>Korrekte Lösung</span>${bsZeile(f.zeilen)}<p>${md(f.erkl, h.esc)}</p></div>`;
  if (f.typ === "zahl") return `<div class="ot-muster"><span>Korrekte Lösung: <b>${euro(f.wert)} €</b></span><p>${md(f.erkl, h.esc)}</p></div>`;
  return `<div class="ot-muster"><p>${md(f.erkl, h.esc)}</p></div>`;
}

/** Kachel im Modul (Lernen- und Klausur-Tab). */
export function startKarte(h) {
  const v = h.verlauf || [], best = v.length ? Math.max(...v.map((x) => x.p)) : null;
  return `<section class="ot-karte">
    <div class="ot-karte-kopf"><span class="ot-ilias">Online-Lernstandstest</span><span class="ot-frist">${h.ic("kalender", "klein")} nur bis ${new Date(SICHTBAR.bis + "T12:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "numeric" })}</span></div>
    <b class="ot-karte-titel">Generalprobe für den Vortest</b>
    <span class="sub">Schwerer als die Generalprobe der Hochschule: Bilanzveränderungen, Bestandskonten, Buchungssätze, EBK/SBK, Aufwands- und Ertragskonten, GuV-Abschluss und Privatkonten – 20 Fragen in ${MINUTEN} Minuten. ${RUNDE} Durchgänge mit lauter verschiedenen Aufgaben, jedes Mal neue Zahlen.</span>
    <div class="ot-karte-fuss">
      <button class="knopf" data-a="otStart">${h.ic("play", "fill")} ${h.laufend ? "Test fortsetzen" : `Durchgang ${(h.durchgang % RUNDE) + 1} von ${RUNDE} starten`}</button>
      ${best != null ? `<span class="ot-best"><b>${pz(best)} %</b><span>bestes Ergebnis · ${v.length}×</span></span>` : ""}
    </div>
  </section>`;
}

/** Vollbild: Testdurchlauf bzw. Ergebnis. */
export function testView(t, h) {
  const fragen = fragenVon(t), n = fragen.length;
  const kopf = (rechts) => `<div class="vb-kopf"><button class="rund" data-a="otZu" aria-label="Schließen">${h.ic("kreuz")}</button><div class="mitte">Generalprobe Bilanz${t.d != null ? ` · ${(t.d % RUNDE) + 1}/${RUNDE}` : ""}</div>${rechts}</div>`;
  if (t.ende) {
    const max = gesamtPunkte(fragen), p = erreicht(fragen, t.antworten), q = max ? p / max : 0;
    return `<div class="vollbild ot" role="dialog" aria-label="Testergebnis">${kopf("")}
    <div class="vb-inhalt">
      <section class="ot-ergebnis" style="--q:${Math.round(q * 100)}">
        <div class="ot-ring"><b>${Math.round(q * 100)}<small>%</small></b></div>
        <div><h2>Generalprobe für den Online-Lernstandstest in Bilanz</h2>
          <div class="ot-meta-zeile">Testdurchlauf beendet am: ${new Date(t.ende).toLocaleString("de-DE", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
          <div class="ot-meta-zeile"><b>Testergebnis in Punkten:</b> ${pz(p)} von ${pz(max)} (${prozent(p, max)} %)</div></div>
      </section>
      ${fragen.map((f, i) => { const a = t.antworten[i], pk = bewerten(f, a), voll = pk >= f.punkte - 1e-9;
        return `<details class="ot-auswertung"${voll ? "" : " open"}><summary><span class="ot-status ${voll ? "ok" : pk > 0 ? "teil" : "nok"}">${h.ic(voll ? "haken" : pk > 0 ? "haken" : "kreuz", "klein")}</span><span class="grow">${nrText(f)}</span><span class="ot-pkt">${pz(pk)}/${pz(f.punkte)}</span></summary>
          <dl class="ot-tabelle"><dt>Position:</dt><dd>${i + 1}</dd><dt>Fragen-ID:</dt><dd class="ot-id">${f.id}</dd><dt>Fragetyp:</dt><dd>${FRAGETYP[f.typ]}</dd><dt>Punkte:</dt><dd>${pz(pk)}/${pz(f.punkte)} (${prozent(pk, f.punkte)}%)</dd></dl>
          <div class="ot-ihre">Frage und Ihre Antwort:</div>
          <div class="ot-frage fertig">${fragKopf(f, h)}${antwortView(f, a, i, h, true)}${loesung(f, h)}</div></details>`; }).join("")}
    </div>
    <div class="vb-fuss"><button class="knopf" data-a="otNeu">${h.ic("wiederholen", "klein")} Neuer Durchlauf mit neuen Zahlen</button></div></div>`;
  }
  const i = Math.min(t.pos || 0, n - 1), f = fragen[i];
  const offen = fragen.filter((x, j) => !beantwortet(x, t.antworten[j])).length;
  return `<div class="vollbild ot" role="dialog" aria-label="Online-Test">${kopf(`<span class="timer ot-uhr" id="otUhr">${h.ic("klausur", "klein")}<span>${h.uhr}</span></span>`)}
    <div class="ot-navi" data-quer="otNavi">${fragen.map((x, j) => `<button class="ot-nr${j === i ? " aktiv" : ""}${beantwortet(x, t.antworten[j]) ? " fertig" : ""}" data-a="otGehe" data-v="${j}" aria-label="Frage ${j + 1}${beantwortet(x, t.antworten[j]) ? ", beantwortet" : ""}">${j + 1}</button>`).join("")}</div>
    <div class="vb-inhalt">
      <article class="ot-blatt">
        <div class="ot-kopf"><span class="ot-titel">${nrText(f)}</span><span class="ot-chip">${FRAGETYP[f.typ]}</span><span class="ot-chip">${pz(f.punkte)} ${f.punkte === 1 ? "Punkt" : "Punkte"}</span></div>
        <div class="ot-frage">${fragKopf(f, h)}${antwortView(f, t.antworten[i], i, h, false)}</div>
      </article>
      <p class="ot-hinweis">${f.typ === "luecke" ? "Je Auswahlliste 0,25 Punkte. Nicht benötigte Felder leer lassen – überzählige Einträge kosten Punkte." : f.typ === "mc" ? "Volle Punktzahl nur, wenn genau die richtigen Antworten markiert sind." : f.typ === "zahl" ? "Nur die Zahl eingeben, z. B. 12.345 oder −2.500." : "Genau eine Antwort ist richtig."}</p>
    </div>
    <div class="vb-fuss ot-fuss">
      <button class="knopf zweit" data-a="otGehe" data-v="${i - 1}"${i ? "" : " disabled"}>${h.ic("zurueck", "klein")} Zurück</button>
      ${i < n - 1 ? `<button class="knopf" data-a="otGehe" data-v="${i + 1}">Weiter ${h.ic("pfeil", "klein")}</button>`
        : `<button class="knopf" data-a="otAbgeben">${h.ic("haken", "klein")} Test beenden${offen ? ` (${offen} offen)` : ""}</button>`}
    </div></div>`;
}
