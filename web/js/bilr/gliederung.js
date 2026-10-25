// Bilanzgliederungsschema nach § 266 Abs. 2 und 3 HGB (Wortlaut: www.gesetze-im-internet.de, Stand 2026).
// Im Gesetzes-PDF ist das Schema zerstückelt – daher von Hand strukturiert und als Grafik dargestellt.
// Ebenen: Buchstaben (A.) – römische Zahlen (I.) – arabische Zahlen (1.). Kleinstkapitalgesellschaften weisen nur die
// Buchstaben-Posten aus, kleine zusätzlich die römischen, mittelgroße und große alle Posten (§ 266 Abs. 1 S. 2–4 HGB).

const P = (nr, text, unter = []) => ({ nr, text, unter });

export const GLIEDERUNG = {
  aktiva: [
    P("A.", "Anlagevermögen", [
      P("I.", "Immaterielle Vermögensgegenstände", [
        P("1.", "Selbst geschaffene gewerbliche Schutzrechte und ähnliche Rechte und Werte"),
        P("2.", "entgeltlich erworbene Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte sowie Lizenzen an solchen Rechten und Werten"),
        P("3.", "Geschäfts- oder Firmenwert"),
        P("4.", "geleistete Anzahlungen"),
      ]),
      P("II.", "Sachanlagen", [
        P("1.", "Grundstücke, grundstücksgleiche Rechte und Bauten einschließlich der Bauten auf fremden Grundstücken"),
        P("2.", "technische Anlagen und Maschinen"),
        P("3.", "andere Anlagen, Betriebs- und Geschäftsausstattung"),
        P("4.", "geleistete Anzahlungen und Anlagen im Bau"),
      ]),
      P("III.", "Finanzanlagen", [
        P("1.", "Anteile an verbundenen Unternehmen"),
        P("2.", "Ausleihungen an verbundene Unternehmen"),
        P("3.", "Beteiligungen"),
        P("4.", "Ausleihungen an Unternehmen, mit denen ein Beteiligungsverhältnis besteht"),
        P("5.", "Wertpapiere des Anlagevermögens"),
        P("6.", "sonstige Ausleihungen"),
      ]),
    ]),
    P("B.", "Umlaufvermögen", [
      P("I.", "Vorräte", [
        P("1.", "Roh-, Hilfs- und Betriebsstoffe"),
        P("2.", "unfertige Erzeugnisse, unfertige Leistungen"),
        P("3.", "fertige Erzeugnisse und Waren"),
        P("4.", "geleistete Anzahlungen"),
      ]),
      P("II.", "Forderungen und sonstige Vermögensgegenstände", [
        P("1.", "Forderungen aus Lieferungen und Leistungen"),
        P("2.", "Forderungen gegen verbundene Unternehmen"),
        P("3.", "Forderungen gegen Unternehmen, mit denen ein Beteiligungsverhältnis besteht"),
        P("4.", "sonstige Vermögensgegenstände"),
      ]),
      P("III.", "Wertpapiere", [
        P("1.", "Anteile an verbundenen Unternehmen"),
        P("2.", "sonstige Wertpapiere"),
      ]),
      P("IV.", "Kassenbestand, Bundesbankguthaben, Guthaben bei Kreditinstituten und Schecks"),
    ]),
    P("C.", "Rechnungsabgrenzungsposten"),
    P("D.", "Aktive latente Steuern"),
    P("E.", "Aktiver Unterschiedsbetrag aus der Vermögensverrechnung"),
  ],
  passiva: [
    P("A.", "Eigenkapital", [
      P("I.", "Gezeichnetes Kapital"),
      P("II.", "Kapitalrücklage"),
      P("III.", "Gewinnrücklagen", [
        P("1.", "gesetzliche Rücklage"),
        P("2.", "Rücklage für Anteile an einem herrschenden oder mehrheitlich beteiligten Unternehmen"),
        P("3.", "satzungsmäßige Rücklagen"),
        P("4.", "andere Gewinnrücklagen"),
      ]),
      P("IV.", "Gewinnvortrag/Verlustvortrag"),
      P("V.", "Jahresüberschuss/Jahresfehlbetrag"),
    ]),
    P("B.", "Rückstellungen", [
      P("1.", "Rückstellungen für Pensionen und ähnliche Verpflichtungen"),
      P("2.", "Steuerrückstellungen"),
      P("3.", "sonstige Rückstellungen"),
    ]),
    P("C.", "Verbindlichkeiten", [
      P("1.", "Anleihen, davon konvertibel"),
      P("2.", "Verbindlichkeiten gegenüber Kreditinstituten"),
      P("3.", "erhaltene Anzahlungen auf Bestellungen"),
      P("4.", "Verbindlichkeiten aus Lieferungen und Leistungen"),
      P("5.", "Verbindlichkeiten aus der Annahme gezogener Wechsel und der Ausstellung eigener Wechsel"),
      P("6.", "Verbindlichkeiten gegenüber verbundenen Unternehmen"),
      P("7.", "Verbindlichkeiten gegenüber Unternehmen, mit denen ein Beteiligungsverhältnis besteht"),
      P("8.", "sonstige Verbindlichkeiten, davon aus Steuern, davon im Rahmen der sozialen Sicherheit"),
    ]),
    P("D.", "Rechnungsabgrenzungsposten"),
    P("E.", "Passive latente Steuern"),
  ],
};

/** Klartext für Suche und Normentext (Abs. 2 und 3). */
export function gliederungText(seite) {
  const zeilen = [];
  const lauf = (liste, tiefe) => liste.forEach((p) => { zeilen.push(`${"  ".repeat(tiefe)}${p.nr} ${p.text}`); lauf(p.unter, tiefe + 1); });
  lauf(GLIEDERUNG[seite], 0);
  return zeilen.join("\n");
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ebene = (nr) => (/^[A-E]\.$/.test(nr) ? "buchstabe" : /^[IVX]+\.$/.test(nr) ? "roemisch" : "arabisch");

function posten(liste) {
  return `<ol class="gl-liste">${liste.map((p) => `<li class="gl-${ebene(p.nr)}"><span class="gl-nr">${p.nr}</span><span class="gl-text">${esc(p.text)}</span>${p.unter.length ? posten(p.unter) : ""}</li>`).join("")}</ol>`;
}

/** Grafik: Bilanz in Kontoform – Aktiva links, Passiva rechts (auf dem Handy untereinander). */
export function gliederungView() {
  return `<figure class="gliederung" aria-label="Gliederung der Bilanz nach § 266 Abs. 2 und 3 HGB">
    <div class="gl-legende">
      <span><i class="gl-punkt buchstabe"></i>Buchstaben – alle Kapitalgesellschaften</span>
      <span><i class="gl-punkt roemisch"></i>+ römische Zahlen – kleine</span>
      <span><i class="gl-punkt arabisch"></i>+ arabische Zahlen – mittelgroße und große</span>
    </div>
    <div class="gl-konto">
      <section class="gl-seite"><h4><span>Aktiva</span><small>§ 266 Abs. 2 HGB · Mittelverwendung</small></h4>${posten(GLIEDERUNG.aktiva)}</section>
      <section class="gl-seite"><h4><span>Passiva</span><small>§ 266 Abs. 3 HGB · Mittelherkunft</small></h4>${posten(GLIEDERUNG.passiva)}</section>
    </div>
    <figcaption>Für Einzelkaufleute und Personengesellschaften gilt nur § 247 Abs. 1 HGB (Anlage- und Umlaufvermögen, Eigenkapital, Schulden, Rechnungsabgrenzungsposten); das Schema des § 266 HGB dient ihnen als Orientierung.</figcaption>
  </figure>`;
}
