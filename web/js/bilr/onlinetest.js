// Generalprobe Online-Lernstandstest Bilanzrecht (Teil I bis Privatkonten): Aufmachung wie der Online-Test der Hochschule
// (Single Choice, Multiple Choice, Lückentext-Buchungssätze mit Auswahllisten, Zahleneingabe), eigene Fälle mit
// immer neuen Zahlen. Nur zeitlich begrenzt sichtbar (SICHTBAR) – zur Vorbereitung auf den Lernstandstest.

export const SICHTBAR = { von: "2026-11-09", bis: "2026-11-10" }; // je einschließlich, Ortszeit

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

/** Kontenarten: A aktiv, P passiv, EK Eigenkapital, AUF Aufwand, ERT Ertrag, ENT Entnahmen, EIN Einlagen. */
const KA = { Kasse: "A", Bank: "A", "Forderungen aLuL": "A", BGA: "A", Fuhrpark: "A", Darlehen: "P", "Verbindlichkeiten aLuL": "P", Eigenkapital: "EK",
  Mietaufwand: "AUF", Löhne: "AUF", Zinsaufwand: "AUF", Büromaterial: "AUF", "Kfz-Versicherung": "AUF", Telefonkosten: "AUF", Werbekosten: "AUF", Energiekosten: "AUF",
  Mieterträge: "ERT", Zinserträge: "ERT", Provisionserträge: "ERT", Entnahmen: "ENT", Einlagen: "EIN" };
/** Konten für die Auswahllisten: immer die typischen Verwechslungen, dazu das „Gegenstück“ jedes richtigen Kontos. */
const GRUNDKONTEN = ["Bank", "Kasse", "Eigenkapital", "Entnahmen", "Einlagen", "GuV", "SBK", "EBK"];
const GEGEN = { Zinsaufwand: "Zinserträge", Zinserträge: "Zinsaufwand", Mietaufwand: "Mieterträge", Mieterträge: "Mietaufwand", "Forderungen aLuL": "Verbindlichkeiten aLuL",
  "Verbindlichkeiten aLuL": "Forderungen aLuL", BGA: "Büromaterial", Büromaterial: "BGA", Fuhrpark: "Kfz-Versicherung", "Kfz-Versicherung": "Fuhrpark", Darlehen: "Zinsaufwand",
  Provisionserträge: "Forderungen aLuL", Löhne: "Verbindlichkeiten aLuL", Werbekosten: "Verbindlichkeiten aLuL", Telefonkosten: "Energiekosten", Energiekosten: "Telefonkosten" };
const WEITERE = Object.keys(KA).filter((k) => !GRUNDKONTEN.includes(k));

const BS = (soll, haben) => ({ soll, haben });

/** Wie wirkt ein Buchungssatz? Eigenkapital, Gewinn (GuV), Bilanzsumme, Zahlungsmittel, Geldvermögen, einzelne Konten. */
export function wirkung(bs) {
  const w = { ek: 0, guv: 0, bilanz: 0, zm: 0, gv: 0, aufwand: false, ertrag: false, privat: false, konto: {} };
  for (const [seite, vz] of [["soll", 1], ["haben", -1]]) for (const [k, x] of bs[seite]) {
    const a = KA[k], b = vz * x; // Soll +, Haben −
    w.konto[k] = (w.konto[k] || 0) + (a === "A" ? b : -b); // Bestandsveränderung des Kontos
    if (a === "A") w.bilanz += b;
    if (a === "AUF") { w.ek -= x; w.guv -= x; w.aufwand = true; }
    if (a === "ERT") { w.ek += x; w.guv += x; w.ertrag = true; }
    if (a === "ENT") { w.ek -= x; w.privat = true; }
    if (a === "EIN") { w.ek += x; w.privat = true; }
    if (k === "Kasse" || k === "Bank") w.zm += b;
    if (k === "Kasse" || k === "Bank" || k === "Forderungen aLuL") w.gv += b;
    if (k === "Verbindlichkeiten aLuL" || k === "Darlehen") w.gv += b; // Schuld sinkt (Soll) → Geldvermögen steigt
  }
  return w;
}
const vz = (n) => (n > 0 ? "+" : n < 0 ? "−" : "±") + euro(Math.abs(n));

// ---------- Geschäftsvorfälle (Grundlage für alle Fragetypen) ----------
// E: einfacher Buchungssatz (ein Betrag x), Z: zusammengesetzt. art = Indizes in ART.
const E = (id, art, soll, haben, [von, bis, raster], text) => ({ id, art, einfach: true, von, bis,
  betr: (r) => ({ x: r.betrag(von, bis, raster) }), text: ({ x }) => text(euro(x)), bs: ({ x }) => BS([[soll, x]], [[haben, x]]), konten: [soll, haben] });
const Z = (id, art, betr, text, bs) => ({ id, art, einfach: false, betr, text, bs });
const VORGAENGE = [
  E(1, [0], "Bank", "Forderungen aLuL", [300, 6000, 10], (x) => `Ein Kunde begleicht eine offene Rechnung über ${x} € durch Überweisung auf das Geschäftskonto.`),
  E(2, [0], "Kasse", "Forderungen aLuL", [100, 1500, 10], (x) => `Ein Kunde bezahlt eine offene Rechnung über ${x} € bar.`),
  E(3, [0], "Bank", "Kasse", [200, 3000, 50], (x) => `Der Unternehmer zahlt ${x} € Bargeld aus der Ladenkasse auf das Geschäftskonto ein.`),
  E(4, [0], "Kasse", "Bank", [200, 3000, 50], (x) => `Der Unternehmer hebt ${x} € vom Geschäftskonto ab und legt das Geld in die Ladenkasse.`),
  E(5, [0], "BGA", "Kasse", [300, 1500, 10], (x) => `Für das Büro wird ein Laptop für ${x} € bar gekauft.`),
  E(6, [0], "BGA", "Bank", [500, 4000, 10], (x) => `Ein Regalsystem für das Lager wird für ${x} € gekauft und sofort überwiesen.`),
  E(7, [2], "BGA", "Verbindlichkeiten aLuL", [800, 6000, 10], (x) => `Büromöbel für ${x} € werden auf Ziel gekauft.`),
  E(8, [2], "Fuhrpark", "Verbindlichkeiten aLuL", [12000, 40000, 100], (x) => `Ein Lieferwagen für ${x} € wird gekauft; der Kaufpreis ist erst in 30 Tagen fällig.`),
  E(9, [2], "Bank", "Darlehen", [5000, 50000, 1000], (x) => `Die Bank zahlt ein betriebliches Darlehen über ${x} € auf das Geschäftskonto aus.`),
  E(10, [1], "Verbindlichkeiten aLuL", "Darlehen", [2000, 15000, 100], (x) => `Eine Lieferantenverbindlichkeit über ${x} € wird in ein langfristiges Darlehen umgewandelt.`),
  E(11, [3], "Verbindlichkeiten aLuL", "Bank", [300, 6000, 10], (x) => `Eine Lieferantenrechnung über ${x} € wird vom Geschäftskonto überwiesen.`),
  E(12, [3], "Verbindlichkeiten aLuL", "Kasse", [50, 900, 10], (x) => `Eine Lieferantenrechnung über ${x} € wird bar bezahlt.`),
  E(13, [3], "Darlehen", "Bank", [1000, 8000, 100], (x) => `Ein betriebliches Darlehen wird mit ${x} € vom Geschäftskonto getilgt.`),
  E(14, [5], "Mietaufwand", "Bank", [600, 2500, 10], (x) => `Die Miete für das Ladenlokal (${x} €) wird vom Geschäftskonto überwiesen.`),
  E(15, [5], "Löhne", "Kasse", [200, 900, 10], (x) => `Eine Aushilfe erhält ihren Lohn von ${x} € bar.`),
  E(16, [5], "Löhne", "Bank", [1500, 4000, 10], (x) => `Das Gehalt einer Verkäuferin (${x} €) wird vom Geschäftskonto überwiesen.`),
  E(17, [5], "Zinsaufwand", "Bank", [30, 600, 1], (x) => `Die Bank bucht ${x} € Zinsen für das betriebliche Darlehen vom Geschäftskonto ab.`),
  E(18, [5], "Büromaterial", "Kasse", [10, 150, 1], (x) => `Druckerpapier und Toner werden für ${x} € bar gekauft und sofort verbraucht.`),
  E(19, [5], "Kfz-Versicherung", "Bank", [300, 1200, 1], (x) => `Die Versicherung für den betrieblichen Lieferwagen (${x} €) wird vom Geschäftskonto abgebucht.`),
  E(20, [5], "Telefonkosten", "Bank", [30, 200, 1], (x) => `Die Telefonrechnung des Betriebs über ${x} € wird vom Geschäftskonto abgebucht.`),
  E(21, [5], "Werbekosten", "Bank", [100, 2000, 10], (x) => `Eine Zeitungsanzeige für das Geschäft (${x} €) wird überwiesen.`),
  E(22, [5], "Energiekosten", "Bank", [80, 600, 1], (x) => `Die Stromrechnung für den Laden (${x} €) wird vom Geschäftskonto abgebucht.`),
  E(23, [5], "Werbekosten", "Verbindlichkeiten aLuL", [200, 2500, 10], (x) => `Eine Druckerei liefert Werbeprospekte, die sofort verteilt werden. Die Rechnung über ${x} € ist noch nicht bezahlt.`),
  E(24, [4], "Bank", "Zinserträge", [10, 400, 1], (x) => `Die Bank schreibt ${x} € Zinsen auf dem Geschäftskonto gut.`),
  E(25, [4], "Kasse", "Mieterträge", [100, 600, 10], (x) => `Ein Untermieter zahlt die Miete für eine Garage des Betriebs (${x} €) bar.`),
  E(26, [4], "Bank", "Mieterträge", [200, 1200, 10], (x) => `Ein Untermieter überweist die Miete für einen Lagerraum (${x} €) auf das Geschäftskonto.`),
  E(27, [4], "Kasse", "Provisionserträge", [100, 1500, 10], (x) => `Für eine Vermittlung erhält der Unternehmer eine Provision von ${x} € bar.`),
  E(28, [4], "Forderungen aLuL", "Provisionserträge", [300, 4000, 10], (x) => `Der Unternehmer rechnet eine Vermittlungsprovision von ${x} € ab; der Kunde zahlt erst im nächsten Monat.`),
  E(29, [6], "Bank", "Einlagen", [500, 8000, 100], (x) => `Der Unternehmer überweist ${x} € von seinem privaten Sparkonto auf das Geschäftskonto.`),
  E(30, [6], "Kasse", "Einlagen", [100, 1000, 10], (x) => `Die Unternehmerin legt ${x} € privates Bargeld in die Ladenkasse.`),
  E(31, [6], "BGA", "Einlagen", [200, 1200, 10], (x) => `Der Unternehmer bringt seinen bisher privat genutzten Drucker dauerhaft ins Büro ein (Teilwert ${x} €).`),
  E(32, [6], "Verbindlichkeiten aLuL", "Einlagen", [300, 4000, 10], (x) => `Die Unternehmerin begleicht eine Lieferantenrechnung über ${x} € von ihrem privaten Bankkonto.`),
  E(33, [6], "Darlehen", "Einlagen", [500, 3000, 100], (x) => `Der Unternehmer tilgt das betriebliche Darlehen mit ${x} € von seinem privaten Bankkonto.`),
  E(34, [5, 6], "Telefonkosten", "Einlagen", [30, 200, 1], (x) => `Die Telefonrechnung des Betriebs über ${x} € wird vom privaten Bankkonto der Unternehmerin bezahlt.`),
  E(35, [5, 6], "Kfz-Versicherung", "Einlagen", [300, 1200, 1], (x) => `Die Versicherung für den betrieblichen Lieferwagen (${x} €) bezahlt der Unternehmer von seinem privaten Konto.`),
  E(36, [7], "Entnahmen", "Kasse", [50, 800, 10], (x) => `Der Unternehmer nimmt ${x} € aus der Ladenkasse für einen Restaurantbesuch mit seiner Familie.`),
  E(37, [7], "Entnahmen", "Bank", [60, 300, 1], (x) => `Die Stromrechnung der Privatwohnung (${x} €) wird vom Geschäftskonto abgebucht.`),
  E(38, [7], "Entnahmen", "Bank", [500, 6000, 10], (x) => `Die Einkommensteuer-Vorauszahlung der Unternehmerin (${x} €) wird vom Geschäftskonto überwiesen.`),
  E(39, [7], "Entnahmen", "Bank", [150, 700, 1], (x) => `Der Beitrag zur privaten Krankenversicherung des Unternehmers (${x} €) wird vom Geschäftskonto abgebucht.`),
  E(40, [7], "Entnahmen", "BGA", [200, 900, 10], (x) => `Die Unternehmerin nimmt einen betrieblichen Laptop dauerhaft für private Zwecke mit nach Hause (Buchwert und Teilwert je ${x} €).`),
  Z(41, [0, 2], (r) => { const g = r.betrag(18000, 36000, 500), k = r.betrag(1000, 3000, 500), b = r.betrag(5000, 10000, 500); return { g, k, b }; },
    ({ g, k, b }) => `Ein Lieferwagen wird für ${euro(g)} € gekauft: ${euro(k)} € werden bar angezahlt, ${euro(b)} € vom Geschäftskonto überwiesen, den Rest schuldet der Unternehmer dem Autohaus.`,
    ({ g, k, b }) => BS([["Fuhrpark", g]], [["Kasse", k], ["Bank", b], ["Verbindlichkeiten aLuL", g - k - b]])),
  Z(42, [3, 6], (r) => ({ b: r.betrag(1000, 4000, 100), p: r.betrag(200, 900, 100) }),
    ({ b, p }) => `Eine Lieferantenrechnung über ${euro(b + p)} € wird zu ${euro(b)} € vom betrieblichen und zu ${euro(p)} € vom privaten Bankkonto beglichen.`,
    ({ b, p }) => BS([["Verbindlichkeiten aLuL", b + p]], [["Bank", b], ["Einlagen", p]])),
  Z(43, [5, 7], (r) => ({ l: r.betrag(900, 2400, 50), w: r.betrag(600, 1400, 50) }),
    ({ l, w }) => `Mit einer Überweisung vom Geschäftskonto über ${euro(l + w)} € werden die Miete für das Ladenlokal (${euro(l)} €) und die Miete der Privatwohnung (${euro(w)} €) bezahlt.`,
    ({ l, w }) => BS([["Mietaufwand", l], ["Entnahmen", w]], [["Bank", l + w]])),
  Z(44, [3, 5], (r) => ({ z: r.betrag(80, 400, 1), t: r.betrag(800, 2500, 100) }),
    ({ z, t }) => `Für ein betriebliches Darlehen wird eine Rate von ${euro(z + t)} € vom Geschäftskonto abgebucht. Darin sind ${euro(z)} € Zinsen enthalten, der Rest ist Tilgung.`,
    ({ z, t }) => BS([["Darlehen", t], ["Zinsaufwand", z]], [["Bank", z + t]])),
  Z(45, [0], (r) => ({ k: r.betrag(100, 800, 10), b: r.betrag(800, 4000, 10) }),
    ({ k, b }) => `Ein Kunde begleicht seine offene Rechnung über ${euro(k + b)} €: ${euro(k)} € zahlt er bar, den Rest überweist er.`,
    ({ k, b }) => BS([["Kasse", k], ["Bank", b]], [["Forderungen aLuL", k + b]])),
  Z(46, [5], (r) => ({ k: r.betrag(200, 600, 10), b: r.betrag(1500, 3500, 10) }),
    ({ k, b }) => `Der Lohn einer Mitarbeiterin von ${euro(k + b)} € wird zu ${euro(k)} € bar ausgezahlt, der Rest wird überwiesen.`,
    ({ k, b }) => BS([["Löhne", k + b]], [["Kasse", k], ["Bank", b]])),
  Z(47, [0, 2], (r) => ({ g: r.betrag(20000, 45000, 500), a: r.betrag(4000, 12000, 500) }),
    ({ g, a }) => `Ein Pkw für den Betrieb kostet ${euro(g)} €. ${euro(a)} € werden vom Geschäftskonto überwiesen, der Rest wird über ein neues Bankdarlehen finanziert.`,
    ({ g, a }) => BS([["Fuhrpark", g]], [["Bank", a], ["Darlehen", g - a]])),
  Z(48, [3, 6], (r) => ({ p: r.betrag(500, 1500, 100), b: r.betrag(2000, 5000, 100) }),
    ({ p, b }) => `Eine Tilgungsrate für ein betriebliches Darlehen (${euro(p + b)} €) wird zu ${euro(p)} € vom privaten und zu ${euro(b)} € vom betrieblichen Bankkonto bezahlt.`,
    ({ p, b }) => BS([["Darlehen", p + b]], [["Bank", b], ["Einlagen", p]])),
];
const V = Object.fromEntries(VORGAENGE.map((v) => [v.id, v]));
const EINFACH = VORGAENGE.filter((v) => v.einfach);
/** Ein Vorgang mit gewürfelten Beträgen: Text, Buchungssatz, Wirkung. */
const fall = (v, r) => { const b = v.betr(r), bs = v.bs(b); return { v, b, text: v.text(b), bs, w: wirkung(bs) }; };
const bsText = (bs) => `${bs.soll.map(([k, x]) => `${k} ${euro(x)}`).join(", ")} an ${bs.haben.map(([k, x]) => `${k} ${euro(x)}`).join(", ")}`;
const nummeriert = (l) => l.map((t, i) => `(${i + 1}) ${t}`).join(" ");

// ---------- Fragen aus den Geschäftsvorfällen ----------
const artErkl = (w, arts) => arts.map((a) => ART_ERKL[a]).join(" ");
/** Lückentext: Buchungssatz zum Vorgang. */
const lueckeAus = (v) => ({ nr: 200 + v.id, vid: v.id, erzeugen: (r) => { const f = fall(v, r);
  return { text: f.text, zeilen: f.bs, erkl: artErkl(f.w, v.art) }; } });
/** Was ist passiert? – Ablenker teilen ein Konto mit dem richtigen Buchungssatz (z. B. Bank an Kasse ↔ Kasse an Bank). */
const rueckAus = (v) => ({ nr: 300 + v.id, vid: v.id, erzeugen: (r) => {
  const { x } = v.betr(r), paar = (c) => c.konten.join("|"), teilt = (c) => c.konten.some((k) => v.konten.includes(k)), passt = (c) => x >= c.von && x <= c.bis;
  const rest = r.mischen(EINFACH.filter((c) => c.id !== v.id && paar(c) !== paar(v)));
  const ablenker = [...rest.filter((c) => teilt(c) && passt(c)), ...rest.filter((c) => teilt(c) && !passt(c)), ...rest.filter((c) => !teilt(c))].slice(0, 3);
  return { bs: v.bs({ x }), optionen: [v.text({ x }), ...ablenker.map((c) => c.text({ x }))], richtig: 0, erkl: `${bsText(v.bs({ x }))}: ${artErkl(null, v.art)}` }; } });
/** Einordnung in die acht Arten (nur Vorgänge mit genau einer Art). */
const artAus = (v) => ({ nr: 400 + v.id, vid: v.id, gruppe: v.art[0], erzeugen: (r) => { const f = fall(v, r);
  return { text: `${f.text} Dieser Vorgang ist …`, optionen: ART, richtig: v.art[0], erkl: `${bsText(f.bs)}: ${ART_ERKL[v.art[0]]}` }; } });

/** Zusammengesetzte Vorgänge aus Rückschluss-Sicht (handverlesen). */
const RUECK_EXTRA = [
  { nr: 7, erzeugen: (r) => { const b = r.betrag(1000, 4000, 100), p = r.betrag(200, 900, 100); return { bs: BS([["Verbindlichkeiten aLuL", b + p]], [["Bank", b], ["Einlagen", p]]),
    optionen: ["Eine Lieferantenrechnung wurde teils vom betrieblichen, teils vom privaten Bankkonto beglichen.", "Ein Kunde hat seine Rechnung teils per Bank, teils bar bezahlt.", "Ware wurde teils gegen Überweisung, teils auf Ziel eingekauft.", "Der Unternehmer hat eine private Rechnung teils vom betrieblichen Konto bezahlt."],
    richtig: 0, erkl: "Die Verbindlichkeit sinkt um den vollen Betrag; ein Teil fließt vom betrieblichen Bankkonto ab, der Rest kommt aus dem Privatvermögen (Einlage)." }; } },
  { nr: 8, erzeugen: (r) => { const x = r.betrag(6000, 30000, 100); return { bs: BS([["Eigenkapital", x]], [["Entnahmen", x]]),
    optionen: ["Der Unternehmer entnimmt Geld aus der Kasse.", "Das Konto Entnahmen wird zum Jahresende über das Eigenkapital abgeschlossen.", "Das Konto Entnahmen wird über das GuV-Konto abgeschlossen.", "Ein Verlust wird auf das Eigenkapital übertragen."],
    richtig: 1, erkl: "Das Privatkonto Entnahmen ist Unterkonto des Eigenkapitals und wird über das Eigenkapital abgeschlossen – nicht über die GuV." }; } },
  { nr: 9, erzeugen: (r) => { const x = r.betrag(8000, 60000, 100); return { bs: BS([["GuV", x]], [["Eigenkapital", x]]),
    optionen: ["Ein Verlust wird auf das Eigenkapital übertragen.", "Der Gewinn wird auf das Eigenkapital übertragen.", "Das Eigenkapital wird über das SBK abgeschlossen.", "Der Unternehmer legt Geld in den Betrieb ein."],
    richtig: 1, erkl: "Ist im GuV-Konto die Habenseite (Erträge) größer, steht der Saldo im Soll: GuV an Eigenkapital = Gewinn erhöht das Eigenkapital." }; } },
  { nr: 6, erzeugen: (r) => { const x = r.betrag(4000, 30000, 100); return { bs: BS([["Eigenkapital", x]], [["GuV", x]]),
    optionen: ["Der Gewinn wird auf das Eigenkapital übertragen.", "Ein Verlust wird auf das Eigenkapital übertragen.", "Das GuV-Konto wird über das SBK abgeschlossen.", "Der Unternehmer entnimmt Geld."],
    richtig: 1, erkl: "Sind die Aufwendungen größer als die Erträge, steht der Saldo im Haben des GuV-Kontos: Eigenkapital an GuV = Verlust mindert das Eigenkapital." }; } },
];

/** Eröffnung und Abschluss als Lückentext. */
const AB = (nr, text, soll, haben, [von, bis, raster], erkl) => ({ nr, erzeugen: (r) => { const x = r.betrag(von, bis, raster); return { text: text(euro(x)), zeilen: BS([[soll, x]], [[haben, x]]), erkl }; } });
const saldo = (k) => (x) => `Das Konto ${k} weist zum 31.12. einen Saldo von ${x} € aus. Buchen Sie den Abschluss des Kontos.`;
const endb = (k) => (x) => `Das Konto ${k} weist zum 31.12. einen Endbestand von ${x} € aus. Buchen Sie den Abschluss des Kontos.`;
const ABSCHLUSS_LUECKE = [
  AB(80, saldo("Löhne"), "GuV", "Löhne", [18000, 42000, 100], "Aufwandskonten werden über das GuV-Konto abgeschlossen; der Saldo steht im Haben des Aufwandskontos."),
  AB(81, saldo("Zinserträge"), "Zinserträge", "GuV", [200, 2000, 10], "Ertragskonten: Saldo im Soll, Gegenbuchung im Haben des GuV-Kontos."),
  { nr: 82, erzeugen: (r) => { const a = r.betrag(60000, 120000, 100), g = r.betrag(4000, 30000, 100), verlust = r.next() < 0.4, e = verlust ? a - g : a + g;
    return { text: `Im GuV-Konto stehen zum 31.12. Aufwendungen von ${euro(a)} € und Erträge von ${euro(e)} €. Buchen Sie den Abschluss des GuV-Kontos.`, zeilen: verlust ? BS([["Eigenkapital", g]], [["GuV", g]]) : BS([["GuV", g]], [["Eigenkapital", g]]),
      erkl: verlust ? `Verlust von ${euro(g)} € (Aufwendungen > Erträge): Saldo im Haben des GuV-Kontos, das Eigenkapital sinkt.` : `Gewinn von ${euro(g)} € (Erträge > Aufwendungen): Saldo im Soll des GuV-Kontos, das Eigenkapital steigt.` }; } },
  AB(83, saldo("Entnahmen"), "Eigenkapital", "Entnahmen", [8000, 30000, 100], "Privatkonten werden über das Eigenkapital abgeschlossen – Entnahmen mindern das Eigenkapital, nicht den Gewinn."),
  AB(84, saldo("Einlagen"), "Einlagen", "Eigenkapital", [1000, 9000, 100], "Einlagen erhöhen das Eigenkapital: Saldo im Soll der Einlagen, Haben des Eigenkapitals."),
  AB(85, (x) => `Zu Beginn des Wirtschaftsjahres besteht ein betriebliches Darlehen von ${x} €. Buchen Sie die Eröffnungsbuchung.`, "EBK", "Darlehen", [10000, 50000, 100], "Passivkonten beginnen mit dem Anfangsbestand im Haben, Gegenkonto ist das EBK (Spiegelbild der Eröffnungsbilanz)."),
  AB(86, endb("Verbindlichkeiten aLuL"), "Verbindlichkeiten aLuL", "SBK", [3000, 15000, 10], "Passivkonten: Endbestand im Soll des Kontos, Gegenbuchung im Haben des SBK."),
  AB(87, endb("Bank"), "SBK", "Bank", [2000, 25000, 10], "Aktivkonten: Endbestand im Haben des Kontos, Gegenbuchung im Soll des SBK."),
  AB(88, saldo("Mieterträge"), "Mieterträge", "GuV", [1200, 9000, 100], "Ertragskonten werden über das GuV-Konto abgeschlossen: Mieterträge an GuV."),
  AB(89, saldo("Werbekosten"), "GuV", "Werbekosten", [500, 8000, 10], "Aufwandskonten werden über das GuV-Konto abgeschlossen: GuV an Werbekosten."),
  AB(90, endb("Kasse"), "SBK", "Kasse", [200, 3000, 10], "Aktivkonten: Endbestand im Haben, Gegenbuchung im Soll des SBK."),
  AB(91, (x) => `Das Eigenkapitalkonto weist nach Übernahme von GuV und Privatkonten ein Endkapital von ${x} € aus. Buchen Sie den Abschluss.`, "Eigenkapital", "SBK", [20000, 90000, 100], "Das Endkapital steht im Soll des Eigenkapitalkontos und im Haben des SBK."),
  AB(92, (x) => `Die Eröffnungsbilanz weist ein Bankguthaben von ${x} € aus. Buchen Sie die Eröffnungsbuchung.`, "Bank", "EBK", [2000, 20000, 10], "Aktivkonten beginnen mit dem Anfangsbestand im Soll, Gegenkonto ist das EBK."),
  AB(93, (x) => `Die Eröffnungsbilanz weist ein Eigenkapital von ${x} € aus. Buchen Sie die Eröffnungsbuchung.`, "EBK", "Eigenkapital", [20000, 90000, 100], "Das Eigenkapital ist ein Passivposten: Anfangsbestand im Haben, Gegenkonto EBK im Soll."),
  AB(94, endb("Darlehen"), "Darlehen", "SBK", [5000, 40000, 100], "Passivkonten: Endbestand im Soll des Kontos, Gegenbuchung im Haben des SBK."),
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
  ["Auf welcher Seite des Kontos Forderungen aLuL wird der Zahlungseingang eines Kunden gebucht?", 1, "Die Forderung erlischt – Abgänge eines Aktivkontos stehen im Haben."],
  ["Auf welcher Seite des GuV-Kontos steht ein Gewinn als Saldo?", 0, "Erträge > Aufwendungen: Der Saldo gleicht die kleinere Sollseite aus (GuV an Eigenkapital)."],
].map(([text, i, erkl], j) => ({ nr: 120 + j, erzeugen: () => ({ text, optionen: ["Soll", "Haben"], richtig: i, erkl }) }));

/** Aussagen (Multiple Choice): neun feste Fünfergruppen, je Durchgang drei andere. */
const T = true, F = false;
const AUSSAGEN_GRUPPEN = [
  ["Konten und Buchungssätzen", [["Aktive Bestandskonten weisen den Anfangsbestand im Soll aus.", T], ["Abgänge auf Passivkonten werden im Haben gebucht.", F], ["Der Saldo wird auf der kleineren Kontoseite eingesetzt und gleicht das Konto aus.", T], ["Ein Aktivtausch verändert die Bilanzsumme.", F], ["Belasten bedeutet, im Soll zu buchen.", T]]],
  ["Konten und Buchungssätzen", [["Das Schlussbilanzkonto enthält den Buchbestand (Sollbestand), das Inventar den tatsächlichen Bestand (Istbestand).", T], ["Die Einrichtung eines Schlussbilanzkontos ist gesetzlich vorgeschrieben.", F], ["Das Eröffnungsbilanzkonto ist das Spiegelbild der Eröffnungsbilanz.", T], ["Das Eröffnungsbilanzkonto ist das Gegenkonto für die Abschlussbuchungen der Bestandskonten.", F], ["Gutschreiben bedeutet, im Haben zu buchen.", T]]],
  ["Konten und Buchungssätzen", [["Bei einem zusammengesetzten Buchungssatz muss die Summe der Sollbeträge der Summe der Habenbeträge entsprechen.", T], ["Im Buchungssatz wird zuerst das Konto der Habenbuchung genannt.", F], ["Zugänge auf Aktivkonten werden im Haben gebucht.", F], ["Eine Aktiv-Passiv-Minderung verringert die Bilanzsumme.", T], ["Ein Passivtausch verändert das Eigenkapital.", F]]],
  ["Erfolgs- und Privatkonten", [["Aufwands- und Ertragskonten sind Unterkonten des Eigenkapitals.", T], ["Ertragskonten werden über das SBK abgeschlossen.", F], ["Entnahmen mindern den Gewinn.", F], ["Ein Gewinn steht als Saldo auf der Sollseite des GuV-Kontos.", T], ["Aufwendungen sind betrieblich veranlasste Minderungen des Betriebsvermögens.", T]]],
  ["Erfolgs- und Privatkonten", [["Das GuV-Konto wird über das Eigenkapital abgeschlossen.", T], ["Privatkonten werden über das GuV-Konto abgeschlossen.", F], ["Die Tilgung eines betrieblichen Darlehens ist Aufwand.", F], ["Einlagen erhöhen das Eigenkapital, aber nicht den Gewinn.", T], ["Für Unterkonten gelten dieselben Buchungsregeln wie für das Hauptkonto.", T]]],
  ["Erfolgs- und Privatkonten", [["Erträge sind betrieblich veranlasste Mehrungen des Betriebsvermögens.", T], ["Ein Verlust erhöht das Eigenkapital.", F], ["Das Konto Zinsaufwand wird über das GuV-Konto abgeschlossen.", T], ["Die Bezahlung einer privaten Rechnung vom Geschäftskonto ist Aufwand.", F], ["Beim Abschluss des Kontos Entnahmen steht der Saldo im Haben.", T]]],
  ["Privatkonten, Abschluss und Grundbegriffen", [["Das Privatkonto ist ein Unterkonto des Eigenkapitals.", T], ["Entnahmen werden im Soll des Kontos Entnahmen gebucht.", T], ["Eine Sacheinlage wird über das Konto Einlagen gebucht.", T], ["Privatentnahmen sind Aufwand.", F], ["Das Konto Einlagen wird über das SBK abgeschlossen.", F]]],
  ["Privatkonten, Abschluss und Grundbegriffen", [["Das SBK ist das Gegenkonto für die Abschlussbuchungen aller Bestandskonten und des Kapitalkontos.", T], ["Aktivkonten werden mit der Buchung „SBK an Aktivkonto“ abgeschlossen.", T], ["Ein Verlust wird mit „GuV an Eigenkapital“ gebucht.", F], ["Der Saldo des Eigenkapitalkontos steht im SBK auf der Habenseite.", T], ["Eröffnungsbilanz und Schlussbilanz gehören zum Kontensystem der Buchführung.", F]]],
  ["Privatkonten, Abschluss und Grundbegriffen", [["Eine Auszahlung ist immer auch Aufwand.", F], ["Die Tilgung einer Geldschuld per Überweisung ist eine Auszahlung, aber keine Ausgabe.", T], ["Werden Werbeprospekte auf Ziel gekauft und sofort verteilt, liegen Ausgabe und Aufwand vor, aber keine Auszahlung.", T], ["Zum Geldvermögen gehören neben Bar- und Buchgeld auch Geldforderungen und Geldschulden.", T], ["Die Zahlung einer privaten Rechnung vom Geschäftskonto mindert den Gewinn.", F]]],
];
const aussagen = (g) => ({ nr: 140 + g, erzeugen: (r) => {
  const [thema, l] = AUSSAGEN_GRUPPEN[g], w = r.mischen(l);
  return { text: `Welche Aussagen zu ${thema} sind richtig? (mehrere Antworten möglich)`, optionen: w.map((a) => a[0]), richtig: w.flatMap((a, i) => (a[1] ? [i] : [])), erkl: "Falsch: " + w.filter((a) => !a[1]).map((a) => `„${a[0]}“`).join(" · ") }; } });

/** Multiple Choice über mehrere Vorgänge: 5 Vorgänge, davon 1–4 zutreffend. */
const ohnePrivat = (v) => !v.konten.some((k) => KA[k] === "ENT" || KA[k] === "EIN");
const MC_FAMILIEN = [
  ["Welche Vorgänge verändern das Eigenkapital?", (f) => f.w.ek !== 0, () => true, "Nur Aufwand, Ertrag, Entnahme und Einlage verändern das Eigenkapital."],
  ["Welche Vorgänge sind erfolgswirksam, berühren also das GuV-Konto?", (f) => f.w.guv !== 0, () => true, "Erfolgswirksam sind nur Aufwendungen und Erträge – Entnahmen und Einlagen nicht."],
  ["Welche Vorgänge verändern die Bilanzsumme?", (f) => f.w.bilanz !== 0, () => true, "Aktivtausch und Passivtausch lassen die Bilanzsumme unverändert; alle anderen Vorgänge verändern sie."],
  ["Welche Vorgänge werden (auch) über ein Privatkonto gebucht?", (f) => f.w.privat, () => true, "Privat veranlasst: Entnahmen (private Ausgaben aus Betriebsmitteln) und Einlagen (betriebliche Ausgaben aus Privatmitteln, Geld oder Sachen in den Betrieb)."],
  ["Bei welchen Vorgängen handelt es sich um einen Aktivtausch?", (f) => f.v.art.length === 1 && f.v.art[0] === 0, () => true, "Aktivtausch: Nur Aktivkonten ändern sich (eines nimmt zu, eines ab)."],
  ["Welche Vorgänge führen zu einer Auszahlung?", (f) => f.w.zm < 0, ohnePrivat, "Auszahlung = Abfluss von Bar- oder Buchgeld; Kasse an Bank ist keine Auszahlung, weil das Geld im Betrieb bleibt."],
  ["Welche Vorgänge sind eine Ausgabe, aber kein Aufwand?", (f) => f.w.gv < 0 && !f.w.aufwand, ohnePrivat, "Ausgabe = Minderung des Geldvermögens; kein Aufwand, wenn der Gegenwert (z. B. BGA) im Betrieb bleibt. Tilgungen sind nicht einmal eine Ausgabe."],
  ["Welche Vorgänge erhöhen das Eigenkapital?", (f) => f.w.ek > 0, () => true, "Das Eigenkapital steigt durch Erträge und Einlagen."],
  ["Welche Vorgänge verringern die Bilanzsumme?", (f) => f.w.bilanz < 0, () => true, "Die Bilanzsumme sinkt, wenn Aktiva abnehmen, ohne dass ein anderer Aktivposten zunimmt (z. B. Tilgung, Aufwand per Bank, Entnahme)."],
  ["Welche Vorgänge mindern den Gewinn?", (f) => f.w.guv < 0, () => true, "Nur Aufwand mindert den Gewinn – Entnahmen und Tilgungen nicht."],
];
const mcFamilie = ([titel, trifft, filter, erkl], i) => ({ nr: 500 + i, erzeugen: (r) => {
  const pool = EINFACH.filter(filter);
  for (;;) {
    const l = r.mischen(pool).slice(0, 5).map((v) => fall(v, r)), ok = l.filter(trifft).length;
    if (ok >= 1 && ok <= 4 && new Set(l.map((f) => f.v.konten.join("|"))).size === 5)
      return { text: `${titel} (mehrere Antworten möglich)`, optionen: l.map((f) => f.text), richtig: l.flatMap((f, j) => (trifft(f) ? [j] : [])), erkl: `${erkl} Buchungen: ${l.map((f, j) => `(${j + 1}) ${bsText(f.bs)}`).join(" · ")}` };
  }
} });
const MC_WEITERE = [
  // mehrere Arten zugleich
  { nr: 520, erzeugen: (r) => { const v = r.wahl([V[34], V[35], V[41], V[42], V[43], V[44], V[47], V[48]]), f = fall(v, r);
    return { text: `${f.text} Der Vorgang ist … (mehrere Antworten möglich)`, optionen: ART, richtig: v.art, erkl: `${bsText(f.bs)}: ${artErkl(f.w, v.art)}` }; } },
  // Konten über die GuV abgeschlossen
  { nr: 521, erzeugen: (r) => { const ok = ["Mietaufwand", "Löhne", "Zinsaufwand", "Zinserträge", "Mieterträge", "Provisionserträge", "Werbekosten", "Büromaterial"], nein = ["BGA", "Entnahmen", "Einlagen", "Darlehen", "Forderungen aLuL", "Kasse", "Eigenkapital", "Verbindlichkeiten aLuL"];
    const n = r.zahl(2, 3), l = r.mischen([...r.mischen(ok).slice(0, n), ...r.mischen(nein).slice(0, 5 - n)]);
    return { text: "Welche Konten werden über das GuV-Konto abgeschlossen? (mehrere Antworten möglich)", optionen: l, richtig: l.flatMap((k, j) => (ok.includes(k) ? [j] : [])), erkl: "Über die GuV laufen nur Aufwands- und Ertragskonten; Privatkonten gehen ins Eigenkapital, Bestandskonten ins SBK." }; } },
  // Habenseite des SBK
  { nr: 522, erzeugen: (r) => { const ok = ["Darlehen", "Verbindlichkeiten aLuL", "Eigenkapital"], nein = ["Kasse", "Bank", "BGA", "Fuhrpark", "Forderungen aLuL"];
    const n = r.zahl(1, 3), l = r.mischen([...r.mischen(ok).slice(0, n), ...r.mischen(nein).slice(0, 5 - n)]);
    return { text: "Welche Endbestände erscheinen im SBK auf der Habenseite? (mehrere Antworten möglich)", optionen: l, richtig: l.flatMap((k, j) => (ok.includes(k) ? [j] : [])), erkl: "Im SBK stehen wie in der Bilanz die Passiva (Schulden und Eigenkapital) im Haben, die Aktiva im Soll." }; } },
  // Grundbegriffe zu einem Vorgang
  { nr: 523, erzeugen: (r) => {
    let f, o;
    do { f = fall(r.wahl(EINFACH.filter(ohnePrivat)), r); const w = f.w; o = [["Auszahlung", w.zm < 0], ["Ausgabe", w.gv < 0], ["Aufwand", w.aufwand], ["Einzahlung", w.zm > 0], ["Einnahme", w.gv > 0], ["Ertrag", w.ertrag]]; } while (!o.some(([, j]) => j));
    const w = f.w;
    return { text: `${f.text} Welche Begriffe treffen auf diesen Vorgang zu? (mehrere Antworten möglich)`, optionen: o.map(([t]) => t), richtig: o.flatMap(([, j], i) => (j ? [i] : [])),
      erkl: `${bsText(f.bs)}. Zahlungsmittel ${vz(w.zm)} €, Geldvermögen (inkl. Forderungen/Schulden) ${vz(w.gv)} €, ${w.aufwand ? "Aufwand" : w.ertrag ? "Ertrag" : "weder Aufwand noch Ertrag"}.` }; } },
];

/** Zahleneingabe. Vorgangslisten werden jedes Mal neu zusammengestellt. */
const liste = (r, n, filter = () => true) => { for (;;) { const l = r.mischen(EINFACH.filter(filter)).slice(0, n).map((v) => fall(v, r)); if (new Set(l.map((f) => f.v.konten.join("|"))).size === n) return l; } };
const wirkungsfrage = (nr, groesse, frage, erklWort) => ({ nr, familie: true, erzeugen: (r) => {
  let l, s; do { l = liste(r, 5); s = l.reduce((a, f) => a + f.w[groesse], 0); } while (l.every((f) => f.w[groesse] === 0) || l.every((f) => f.w[groesse] !== 0));
  return { text: `${frage} ${nummeriert(l.map((f) => f.text))}`, wert: s, erkl: `${l.map((f, j) => `(${j + 1}) ${bsText(f.bs)} → ${vz(f.w[groesse])} €`).join(" · ")}. ${erklWort} insgesamt ${vz(s)} €.` }; } });
const bestandsfrage = (nr, konto, [von, bis]) => ({ nr, familie: true, erzeugen: (r) => {
  let ab, l, end;
  do { ab = r.betrag(von, bis, 10); l = liste(r, r.zahl(4, 5), (v) => v.konten.includes(konto)); end = ab + l.reduce((a, f) => a + f.w.konto[konto], 0); } while (end <= 0);
  return { text: `Das Konto ${konto} hat einen Anfangsbestand von ${euro(ab)} €. Im Laufe des Jahres: ${nummeriert(l.map((f) => f.text))} Welcher Endbestand wird ins SBK übernommen (in €)?`, wert: end,
    erkl: `${euro(ab)} ${l.map((f) => `${vz(f.w.konto[konto])}`).join(" ")} = ${euro(end)} €. Buchungen: ${l.map((f, j) => `(${j + 1}) ${bsText(f.bs)}`).join(" · ")}` }; } });
const ZAHL = [
  wirkungsfrage(600, "ek", "Welche Auswirkung haben die folgenden Vorgänge insgesamt auf das Eigenkapital (in €, Minderung mit Minuszeichen)?", "Eigenkapital"),
  wirkungsfrage(601, "ek", "Um wie viel € verändert sich das Eigenkapital durch diese Vorgänge insgesamt (Minderung mit Minuszeichen)?", "Eigenkapital"),
  wirkungsfrage(602, "ek", "Berechnen Sie die Veränderung des Eigenkapitals durch folgende Vorgänge (in €, Minderung mit Minuszeichen).", "Eigenkapital"),
  wirkungsfrage(610, "guv", "Wie wirken sich die folgenden Vorgänge insgesamt auf den Gewinn aus (in €, Gewinnminderung mit Minuszeichen)?", "Gewinnauswirkung"),
  wirkungsfrage(611, "guv", "Um wie viel € verändern diese Vorgänge den Saldo des GuV-Kontos (Minderung mit Minuszeichen)?", "GuV"),
  wirkungsfrage(620, "bilanz", "Um wie viel € verändert sich die Bilanzsumme durch die folgenden Vorgänge insgesamt (Minderung mit Minuszeichen)?", "Bilanzsumme"),
  wirkungsfrage(621, "bilanz", "Wie verändert sich die Bilanzsumme durch diese Vorgänge (in €, Minderung mit Minuszeichen)?", "Bilanzsumme"),
  bestandsfrage(630, "Bank", [3000, 15000]),
  bestandsfrage(631, "Bank", [5000, 20000]),
  bestandsfrage(632, "Kasse", [800, 3000]),
  bestandsfrage(633, "Verbindlichkeiten aLuL", [6000, 20000]),
  { nr: 640, familie: true, erzeugen: (r) => { const ak = r.betrag(40000, 90000, 1000), a = r.betrag(50000, 90000, 500), g = r.betrag(10000, 35000, 500), e = a + g, en = r.betrag(15000, 30000, 500), ei = r.betrag(1000, 6000, 500), end = ak + g - en + ei;
    return { text: `Anfangskapital ${euro(ak)} € · Aufwendungen ${euro(a)} € · Erträge ${euro(e)} € · Entnahmen ${euro(en)} € · Einlagen ${euro(ei)} €. Wie hoch ist das Eigenkapital, das ins SBK übernommen wird (in €)?`, wert: end,
      erkl: `Gewinn ${euro(e)} − ${euro(a)} = ${euro(g)} €; Endkapital ${euro(ak)} + ${euro(g)} − ${euro(en)} + ${euro(ei)} = ${euro(end)} €.` }; } },
  { nr: 641, familie: true, erzeugen: (r) => { const ea = r.betrag(50000, 90000, 1000), en = r.betrag(15000, 35000, 500), ei = r.betrag(1000, 8000, 500), g = r.betrag(-5000, 40000, 500), ee = ea + g - en + ei;
    return { text: `Eigenkapital am 1.1.: ${euro(ea)} €, am 31.12.: ${euro(ee)} €. Im Laufe des Jahres hat der Unternehmer ${euro(en)} € entnommen und ${euro(ei)} € eingelegt. Wie hoch ist der Gewinn (Verlust mit Minuszeichen) in €?`, wert: g,
      erkl: `Kapitalvergleich: ${euro(ee)} − ${euro(ea)} + Entnahmen ${euro(en)} − Einlagen ${euro(ei)} = ${euro(g)} €.` }; } },
  { nr: 642, familie: true, erzeugen: (r) => { const l = r.betrag(20000, 40000, 100), m = r.betrag(8000, 15000, 100), z = r.betrag(300, 2000, 10), p = r.betrag(25000, 70000, 100), me = r.betrag(1000, 5000, 100), en = r.betrag(5000, 15000, 100), ei = r.betrag(500, 3000, 100), g = p + me - l - m - z;
    return { text: `Salden zum 31.12.: Löhne ${euro(l)} €, Mietaufwand ${euro(m)} €, Zinsaufwand ${euro(z)} €, Provisionserträge ${euro(p)} €, Mieterträge ${euro(me)} €, Entnahmen ${euro(en)} €, Einlagen ${euro(ei)} €. Welcher Saldo ergibt sich im GuV-Konto (Gewinn positiv, Verlust mit Minuszeichen) in €?`, wert: g,
      erkl: `Erträge ${euro(p + me)} − Aufwendungen ${euro(l + m + z)} = ${euro(g)} €. Entnahmen und Einlagen gehören nicht ins GuV-Konto.` }; } },
  { nr: 643, familie: true, erzeugen: (r) => { const bga = r.betrag(8000, 30000, 100), fp = r.betrag(15000, 45000, 500), bank = r.betrag(3000, 20000, 10), kasse = r.betrag(300, 2500, 10), ford = r.betrag(1000, 9000, 10), dar = r.betrag(10000, 30000, 500), vb = r.betrag(2000, 12000, 10), ek = bga + fp + bank + kasse + ford - dar - vb;
    return { text: `Laut Inventar zum 31.12.: BGA ${euro(bga)} €, Fuhrpark ${euro(fp)} €, Forderungen aLuL ${euro(ford)} €, Bank ${euro(bank)} €, Kasse ${euro(kasse)} €, Darlehen ${euro(dar)} €, Verbindlichkeiten aLuL ${euro(vb)} €. Wie hoch ist das Eigenkapital (in €)?`, wert: ek,
      erkl: `Bilanzgleichung: Eigenkapital = Vermögen ${euro(bga + fp + bank + kasse + ford)} − Schulden ${euro(dar + vb)} = ${euro(ek)} €.` }; } },
];

// ---------- Zusammenstellung ----------
export const FRAGETYP = { sc: "Single Choice", mc: "Multiple Choice", luecke: "Lückentextfrage", zahl: "Numerische Frage" };
/** Je Fragetyp 15 Fragen. */
export const JE_TYP = 15;
/** Durchgänge je Runde, in denen keine Aufgabe doppelt vorkommt (Familien mit neu gewürfelten Vorgängen ausgenommen). */
export const RUNDE = 3;
const LUECKE_V = VORGAENGE.map(lueckeAus), RUECK_V = EINFACH.map(rueckAus), ART_V = VORGAENGE.filter((v) => v.art.length === 1).map(artAus);
const MC_F = MC_FAMILIEN.map(mcFamilie).map((q) => ({ ...q, familie: true }));
export const ALLE_VORLAGEN = [
  ...LUECKE_V.map((v) => ({ ...v, typ: "luecke" })), ...ABSCHLUSS_LUECKE.map((v) => ({ ...v, typ: "luecke" })),
  ...RUECK_V.map((v) => ({ ...v, typ: "sc" })), ...RUECK_EXTRA.map((v) => ({ ...v, typ: "sc" })), ...ART_V.map((v) => ({ ...v, typ: "sc" })), ...ABSCHLUSS.map((v) => ({ ...v, typ: "sc" })), ...SEITE.map((v) => ({ ...v, typ: "sc" })),
  ...MC_F.map((v) => ({ ...v, typ: "mc" })), ...MC_WEITERE.map((v) => ({ ...v, typ: "mc" })), ...AUSSAGEN_GRUPPEN.map((_, g) => ({ ...aussagen(g), typ: "mc" })),
  ...ZAHL.map((v) => ({ ...v, typ: "zahl" })),
];

/**
 * Fragen eines Durchgangs (deterministisch aus Startwert, schon gezogenen Vorlagen `ohne` und Durchgang `d`).
 * Noch nicht gezogene Vorlagen haben Vorrang; ein Geschäftsvorfall erscheint je Durchgang höchstens in einer Rolle.
 */
export function testErzeugen(seed, ohne = [], d = 0) {
  const r = zufall(seed), weg = new Set(ohne), fragen = [], vorgaenge = new Set();
  const nimm = (pool, n, typ, { vielfalt } = {}) => {
    const g = r.mischen(pool.filter((c) => c.vid == null || !vorgaenge.has(c.vid)));
    const sortiert = [...g.filter((c) => !weg.has(c.nr)), ...g.filter((c) => weg.has(c.nr))], pick = [], gruppen = new Set();
    if (vielfalt) for (const c of sortiert) if (pick.length < n && !weg.has(c.nr) && !gruppen.has(c.gruppe)) { pick.push(c); gruppen.add(c.gruppe); }
    for (const c of sortiert) if (pick.length < n && !pick.includes(c)) pick.push(c);
    for (const c of pick) { if (c.vid != null) vorgaenge.add(c.vid); fragen.push(frage(c, typ, zufall(seed * 7919 + c.nr), d)); }
  };
  // Lückentext 15: 12 Geschäftsvorfälle (davon 2 sicher zusammengesetzt) + 3 Eröffnung/Abschluss
  nimm(LUECKE_V.filter((c) => !V[c.vid].einfach), 2, "luecke"); nimm(LUECKE_V.filter((c) => V[c.vid].einfach), 10, "luecke"); nimm(ABSCHLUSS_LUECKE, 3, "luecke");
  // Single Choice 15
  nimm(RUECK_V, 4, "sc"); nimm(RUECK_EXTRA, 1, "sc"); nimm(ART_V, 5, "sc", { vielfalt: true }); nimm(ABSCHLUSS, 3, "sc"); nimm(SEITE, 2, "sc");
  // Multiple Choice 15: 3 Aussagengruppen des Durchgangs + 12 aus 14 weiteren
  for (const g of [0, 3, 6]) fragen.push(frage(aussagen(g + (d % 3)), "mc", zufall(seed * 7919 + 140 + g), d));
  nimm([...MC_F, ...MC_WEITERE.map((q) => ({ ...q, familie: true }))], 12, "mc");
  // Zahlen 15
  nimm(ZAHL, 15, "zahl");
  return r.mischen(fragen);
}
/** Fragen eines gespeicherten Durchgangs. */
export const fragenVon = (t) => testErzeugen(t.seed, t.ohne || [], t.d || 0);
function frage(v, typ, r, d) {
  const f = { nr: v.nr, id: 1066000 + v.nr * 7, typ, familie: !!v.familie, ...v.erzeugen(r, d) };
  if (f.text == null && f.bs) f.text = "";
  if (typ === "sc" && f.optionen.length === 4) { // Antwortreihenfolge mischen (die Achter-Liste und SBK/GuV/EK bleiben fest)
    const o = r.mischen(f.optionen.map((t, i) => [t, i])); f.richtig = o.findIndex(([, i]) => i === f.richtig); f.optionen = o.map(([t]) => t);
  }
  if (typ === "luecke") {
    const alle = [...f.zeilen.soll, ...f.zeilen.haben], richtigeKonten = alle.map(([k]) => k);
    const gegen = richtigeKonten.map((k) => GEGEN[k]).filter(Boolean);
    const extra = r.mischen(WEITERE.filter((k) => !richtigeKonten.includes(k) && !gegen.includes(k))).slice(0, 2);
    f.konten = [...new Set([...GRUNDKONTEN, ...richtigeKonten, ...gegen, ...extra])].sort((a, b) => a.localeCompare(b, "de"));
    const b = alle.map(([, x]) => x), summe = b.reduce((s, x) => s + x, 0) / 2;
    const fallen = [summe, ...b.map((x) => x * 2), ...b.map((x) => Math.round(x * 1.1)), ...b.map((x) => Math.round(x / 10)), ...(b.length > 2 ? [b[1] + b[2]] : [])];
    f.betraege = [...new Set([...b, ...fallen])].filter((x) => x > 0).sort((a, c) => a - c).slice(0, 10);
    if (!b.every((x) => f.betraege.includes(x))) f.betraege = [...new Set([...b, ...f.betraege])].sort((a, c) => a - c);
    f.zeilenZahl = Math.max(2, f.zeilen.soll.length, f.zeilen.haben.length) ; // wie im Online-Test: immer mindestens zwei Zeilen
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
    <span class="sub">60 Fragen – je 15 Single Choice, Multiple Choice, Lückentext-Buchungssätze und Rechnen: Bilanzveränderungen, Bestandskonten, EBK/SBK, Aufwand und Ertrag, GuV-Abschluss, Privatkonten, Auszahlung/Ausgabe/Aufwand. Ohne Zeitlimit, ${RUNDE} Durchgänge mit lauter neuen Aufgaben.</span>
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
          <div class="ot-meta-zeile">Bearbeitungszeit: ${((m) => `${m} ${m === 1 ? "Minute" : "Minuten"}`)(Math.max(1, Math.round((t.ende - t.start) / 60000)))}</div>
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
  return `<div class="vollbild ot" role="dialog" aria-label="Online-Test">${kopf(`<span class="timer ot-uhr" id="otUhr" title="Bearbeitungszeit">${h.ic("klausur", "klein")}<span>${h.uhr}</span></span>`)}
    <div class="ot-navi" data-quer="otNavi">${fragen.map((x, j) => `<button class="ot-nr${j === i ? " aktiv" : ""}${beantwortet(x, t.antworten[j]) ? " fertig" : ""}" data-a="otGehe" data-v="${j}" aria-label="Frage ${j + 1}${beantwortet(x, t.antworten[j]) ? ", beantwortet" : ""}">${j + 1}</button>`).join("")}</div>
    <div class="vb-inhalt">
      <article class="ot-blatt">
        <div class="ot-kopf"><span class="ot-titel">${nrText(f)}</span><span class="ot-chip">${i + 1}/${n}</span><span class="ot-chip">${FRAGETYP[f.typ]}</span><span class="ot-chip">${pz(f.punkte)} ${f.punkte === 1 ? "Punkt" : "Punkte"}</span></div>
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
