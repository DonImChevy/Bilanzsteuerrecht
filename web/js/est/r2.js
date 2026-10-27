// R 2 EStR „Umfang der Besteuerung“ (Amtliches Einkommensteuer-Handbuch des BMF, Ausgabe 2025):
// Abs. 1 Ermittlung des zu versteuernden Einkommens, Abs. 2 Ermittlung der festzusetzenden Einkommensteuer.
// Als Grafik dargestellt – Stufen farbig, klausurwichtige Zeilen hervorgehoben, seltene Sonderfälle zurückgenommen.
// Zeile: [Nr., Rechenzeichen, Text, Gewicht] – Gewicht: "erg" = Ergebniszeile, "wichtig" = klausurwichtig, "selten" = Sonderfall.

const Z = (nr, op, text, gewicht = "") => ({ nr, op, text, gewicht });

/** Abs. 1: die vier Stufen des § 2 EStG, jede mit eigener Farbe. */
export const R2_ABS1 = [
  { stufe: "sde", titel: "Summe der Einkünfte", norm: "§ 2 Abs. 2, 3 EStG", zeilen: [
    Z(1, "", "S. d. E. aus den Einkunftsarten", "wichtig"),
    Z(2, "=", "S. d. E.", "erg"),
  ] },
  { stufe: "gde", titel: "Gesamtbetrag der Einkünfte", norm: "§ 2 Abs. 3 EStG", zeilen: [
    Z(3, "−", "Altersentlastungsbetrag (§ 24a EStG)", "wichtig"),
    Z(4, "−", "Entlastungsbetrag für Alleinerziehende (§ 24b EStG)", "wichtig"),
    Z(5, "−", "Freibetrag für Land- und Forstwirte (§ 13 Abs. 3 EStG)"),
    Z(6, "+", "Hinzurechnungsbetrag (§ 52 Abs. 3 Satz 5 EStG sowie § 8 Abs. 5 Satz 2 AIG)", "selten"),
    Z(7, "=", "G. d. E. (§ 2 Abs. 3 EStG)", "erg"),
  ] },
  { stufe: "eink", titel: "Einkommen", norm: "§ 2 Abs. 4 EStG", zeilen: [
    Z(8, "−", "Verlustabzug nach § 10d EStG"),
    Z(9, "−", "Sonderausgaben (§§ 10, 10a, 10b, 10c EStG)", "wichtig"),
    Z(10, "−", "außergewöhnliche Belastungen (§§ 33 bis 33b EStG)", "wichtig"),
    Z(11, "−", "Steuerbegünstigung der zu Wohnzwecken genutzten Wohnungen, Gebäude und Baudenkmale sowie der schutzwürdigen Kulturgüter (§§ 10e bis 10i EStG, § 52 Abs. 21 Satz 6 EStG i. d. F. vom 16.4.1997, BGBl. I S. 821 und § 7 FördG)", "selten"),
    Z(12, "+", "Erstattungsüberhänge (§ 10 Abs. 4b Satz 3 EStG)"),
    Z(13, "+", "zuzurechnendes Einkommen gem. § 15 Abs. 1 AStG", "selten"),
    Z(14, "=", "Einkommen (§ 2 Abs. 4 EStG)", "erg"),
  ] },
  { stufe: "zve", titel: "Zu versteuerndes Einkommen", norm: "§ 2 Abs. 5 EStG", zeilen: [
    Z(15, "−", "Freibeträge für Kinder (§§ 31, 32 Abs. 6 EStG)", "wichtig"),
    Z(16, "−", "Härteausgleich nach § 46 Abs. 3 EStG, § 70 EStDV"),
    Z(17, "=", "z. v. E. (§ 2 Abs. 5 EStG)", "erg"),
  ] },
];

/** Abs. 2: vom z. v. E. zur festzusetzenden Einkommensteuer. */
export const R2_ABS2 = [
  { stufe: "tarif", titel: "Tarifliche Einkommensteuer", norm: "§ 32a EStG", zeilen: [
    Z(1, "", "Steuerbetrag a) nach § 32a Abs. 1, 5, § 50 Abs. 1 Satz 2 EStG oder b) nach dem bei Anwendung des Progressionsvorbehalts (§ 32b EStG) oder der Steuersatzbegrenzung sich ergebenden Steuersatz", "wichtig"),
    Z(2, "+", "Steuer auf Grund Berechnung nach den §§ 34, 34b EStG"),
    Z(3, "+", "Steuer auf Grund der Berechnung nach § 34a Abs. 1, 4 bis 6 EStG", "selten"),
    Z(4, "=", "tarifliche Einkommensteuer (§ 32a Abs. 1, 5 EStG)", "erg"),
  ] },
  { stufe: "fest", titel: "Festzusetzende Einkommensteuer", norm: "§ 2 Abs. 6 EStG", zeilen: [
    Z(5, "−", "Minderungsbetrag nach Punkt 11 Ziffer 2 des Schlussprotokolls zu Artikel 23 DBA Belgien in der durch Artikel 2 des Zusatzabkommens vom 5.11.2002 geänderten Fassung (BGBl. 2003 II S. 1615)", "selten"),
    Z(6, "−", "ausländische Steuern nach § 34c Abs. 1 und 6 EStG, § 12 AStG"),
    Z(7, "−", "Steuerermäßigung nach § 35 EStG"),
    Z(8, "−", "Steuerermäßigung für Stpfl. mit Kindern bei Inanspruchnahme erhöhter Absetzungen für Wohngebäude oder der Steuerbegünstigungen für eigengenutztes Wohneigentum (§ 34f Abs. 1 und 2 EStG)", "selten"),
    Z(9, "−", "Steuerermäßigung bei Zuwendungen an politische Parteien und unabhängige Wählervereinigungen (§ 34g EStG)", "wichtig"),
    Z(10, "−", "Steuerermäßigung nach § 34f Abs. 3 EStG", "selten"),
    Z(11, "−", "Steuerermäßigung nach § 35a EStG", "wichtig"),
    Z(12, "−", "Ermäßigung bei Belastung mit Erbschaftsteuer (§ 35b EStG)", "selten"),
    Z(13, "+", "Steuer auf Grund Berechnung nach § 32d Abs. 3 und 4 EStG"),
    Z(14, "+", "Steuern nach § 34c Abs. 5 EStG", "selten"),
    Z(15, "+", "Nachsteuer nach § 10 Abs. 5 EStG i. V. m. § 30 EStDV", "selten"),
    Z(16, "+", "Zuschlag nach § 3 Abs. 4 Satz 2 Forstschäden-Ausgleichsgesetz", "selten"),
    Z(17, "+", "Anspruch auf Zulage für Altersvorsorge, wenn Beiträge als Sonderausgaben abgezogen worden sind (§ 10a Abs. 2 EStG)"),
    Z(18, "+", "Anspruch auf Kindergeld oder vergleichbare Leistungen, soweit in den Fällen des § 31 EStG das Einkommen um Freibeträge für Kinder gemindert wurde", "wichtig"),
    Z(19, "=", "festzusetzende Einkommensteuer (§ 2 Abs. 6 EStG)", "erg"),
  ] },
];

const ABS = { 1: R2_ABS1, 2: R2_ABS2 };
const EINLEITUNG = { 1: "Das z. v. E. ist wie folgt zu ermitteln:", 2: "Die festzusetzende Einkommensteuer ist wie folgt zu ermitteln:" };

/** Klartext je Absatz (Suche, Normenliste, Kartenentwurf). */
export function r2Text(abs) {
  return [EINLEITUNG[abs], ...ABS[abs].flatMap((s) => s.zeilen.map((z) => `${z.nr} ${z.op ? z.op + " " : ""}${z.text}`))].join("\n");
}

/** Wie ein Paragraf im Normenindex: „R 2 EStR“, Abs. 1 und 2. */
export const NORMEN_ESTR = [{ g: "EStR", nr: "2", titel: "Umfang der Besteuerung", schema: true,
  abs: [{ abs: "1", text: r2Text(1) }, { abs: "2", text: r2Text(2) }] }];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Grafik eines Absatzes (oder beider). inline(text) macht Normzitate antippbar (kompaktInline aus kompakt.js).
 * Ruhig gehalten: oben der Rechenweg in Kurzform, darunter je Stufe eine Karte mit dünner Farbleiste.
 * Wichtige Zeilen fett, seltene Sonderfälle eingeklappt, die Ergebniszeile schließt die Stufe mit „=“ ab.
 */
export function r2View(abs = null, inline = esc) {
  const zeile = (z) => `<li class="r2-z ${z.gewicht}"><span class="r2-nr">${z.nr}</span><span class="r2-op">${z.op || ""}</span><span class="r2-text">${inline(z.text)}</span></li>`;
  const stufe = (s) => {
    const normal = s.zeilen.filter((z) => z.gewicht !== "selten" && z.gewicht !== "erg"), selten = s.zeilen.filter((z) => z.gewicht === "selten");
    const erg = s.zeilen.find((z) => z.gewicht === "erg");
    return `<div class="r2-stufe st-${s.stufe}">
      <div class="r2-stufe-titel">${esc(s.titel)}</div>
      <ol class="r2-zeilen">${normal.map(zeile).join("")}</ol>
      ${selten.length ? `<details class="r2-selten"><summary>${selten.length === 1 ? "1 Sonderfall" : `${selten.length} Sonderfälle`} (Zeile ${selten.map((z) => z.nr).join(", ")})</summary><ol class="r2-zeilen">${selten.map(zeile).join("")}</ol></details>` : ""}
      ${erg ? `<div class="r2-erg"><span class="r2-nr">${erg.nr}</span><span class="r2-op">=</span><span class="r2-text">${inline(erg.text)}</span></div>` : ""}
    </div>`;
  };
  const weg = (a) => `<div class="r2-weg" aria-label="Rechenweg">${ABS[a].map((s, i) => `${i ? `<span class="r2-pfeil">→</span>` : ""}<span class="r2-schritt st-${s.stufe}"><i></i>${esc(s.titel.replace("Zu versteuerndes Einkommen", "z. v. E.").replace("Gesamtbetrag der Einkünfte", "G. d. E.").replace("Summe der Einkünfte", "S. d. E.").replace("Einkommensteuer", "ESt"))}</span>`).join("")}</div>`;
  const block = (a) => `<section class="r2-abs">
      <h4 class="r2-kopf">${abs ? "" : `R 2 Abs. ${a} EStR `}<small>${a === 1 ? "Ermittlung des zu versteuernden Einkommens" : "Ermittlung der festzusetzenden Einkommensteuer"}</small></h4>
      ${weg(a)}
      ${ABS[a].map(stufe).join("")}
    </section>`;
  return `<figure class="r2" aria-label="Schema nach R 2 EStR">
    ${(abs ? [Number(abs)] : [1, 2]).map(block).join("")}
    <figcaption><b>Fett</b> = klausurwichtig · seltene Sonderfälle zum Aufklappen.<br>Wortlaut nach R 2 EStR, Amtliches Einkommensteuer-Handbuch (BMF), Ausgabe 2025.</figcaption>
  </figure>`;
}
