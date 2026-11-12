// Textsatz für Aufgaben, Lösungen und Erläuterungen (rein, getestet).
// typografie(): einheitliche Schreibweise (Abkürzungen, Gedankenstrich, Minus, Anführungszeichen, …)
// satz():       gliedert mehrzeilige Texte in Absätze, Aufzählungen, Nummerierungen und Rechenwege
//               und hebt kurze Etiketten am Zeilenanfang („Vorspann: …“) hervor.
// Die Inhalte selbst bleiben unverändert in den Datendateien; nur die Darstellung wird vereinheitlicht.

const NB = " "; // geschütztes Leerzeichen
const ABK = [
  [/\bz\.\s?B\./g, `z.${NB}B.`], [/\bi\.\s?H\.\s?v\./g, `i.${NB}H.${NB}v.`], [/\bd\.\s?h\./g, `d.${NB}h.`],
  [/\bi\.\s?V\.\s?m\./g, `i.${NB}V.${NB}m.`], [/\bu\.\s?a\.(?=[\s,;:)]|$)/g, `u.${NB}a.`], [/\bv\.\s?a\.(?=[\s,;:)]|$)/g, `v.${NB}a.`],
  [/\bz\.\s?T\./g, `z.${NB}T.`], [/\bi\.\s?d\.\s?R\./g, `i.${NB}d.${NB}R.`], [/\bu\.\s?U\./g, `u.${NB}U.`], [/\bo\.\s?ä\./g, `o.${NB}ä.`],
  [/\bs\.\s?o\./g, `s.${NB}o.`], [/\bs\.\s?u\./g, `s.${NB}u.`], [/\bi\.\s?S\.\s?d\./g, `i.${NB}S.${NB}d.`], [/\bm\.\s?E\./g, `m.${NB}E.`],
  [/\bL\.\s?u\.\s?L\.\.?/g, "LuL"],
];

/** Einheitliche Schreibweise für eine Textzeile (ohne HTML). */
export function typografie(t) {
  let s = String(t ?? "").replace(/\r/g, "").replace(/[ \t]+$/gm, "");
  for (const [re, ersatz] of ABK) s = s.replace(re, ersatz);
  s = s
    .replace(/\s?\.\/\.\s?/g, " − ")                         // „./.“ (abzüglich) → Minus
    .replace(/(\d)\s?\.\/\.(?=\s?\d)/g, "$1 − ")
    .replace(/(^|\()-(?=\s?\d)/gm, "$1−")                     // Minus am Zeilenanfang bzw. in Klammern
    .replace(/(\d(?:\s?(?:€|%))?) - (?=\d)/g, "$1 − ")          // Minus zwischen Beträgen
    .replace(/ - /g, " – ")                                   // Gedankenstrich
    .replace(/(§§?|Abs\.|Nr\.|Art\.|\bS\.)(?=\d)/g, "$1 ")         // „Abs.1“ → „Abs. 1“
    .replace(/\.\.\.(?!\.)/g, "…")
    .replace(/"([^"\n]+)"/g, "„$1“")                          // gerade Anführungszeichen
    .replace(/(\d) ?x ?(?=\d)/g, "$1 × ")                     // Malzeichen
    .replace(/\s?(->|=>)\s?/g, " → ")
    .replace(/(\S)  +(?=\S)/g, "$1 ")                         // doppelte Leerzeichen
    .replace(/ ([,.;:!?])(?=\s|$)/g, "$1");                   // Leerzeichen vor Satzzeichen
  return s;
}

/** Geschützte Leerzeichen in fertigem HTML: Zahl + Einheit, § / Abs. / Nr. / S. / Art. + Zahl. */
export function schuetzen(html) {
  return html
    .replace(/(\d) (€|%|Euro|Std\.|Tage?n?\b|Monate?n?\b|Jahre?n?\b|km\b)/g, `$1${NB}$2`)
    .replace(/(§§?|Abs\.|Nr\.|\bS\.|Art\.|Satz|Buchst\.|Anlage) (?=\d)/g, `$1${NB}`);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Eine Zeile: Typografie, dann Inline-Formatierung (Standard: nur maskieren). */
export const satzZeile = (t, inline = esc) => schuetzen(inline(typografie(t)));

// ---------------------------------------------------------------------------------------------
// Gliederung mehrzeiliger Texte
const PUNKT = /^([•·▪]|[-–](?=\s))\s+/;
const NUMMER = /^(\d{1,2}[.)]|[a-h]\)|\(\d{1,2}\)|[IVX]{1,4}\.)\s+/;
const OP = /^(=|\+|−|-|\.\/\.)\s+(?=\S)/;
const BETRAG = /^(.*?[^\d.,\s−-])\s*[:=]?\s+(−?\s?\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?\s?(?:€|%))\s*\.?$/;
const hatZahl = (t) => /\d/.test(t);

/** Kurzes Etikett am Zeilenanfang („Vorspann: …“, „Ergebnis: …“) – ohne Zahlen und Normzeichen. */
function etikett(t) {
  const m = /^([A-ZÄÖÜ][A-Za-zÄÖÜäöüß/\- ]{1,32}):\s+(\S.*)$/.exec(t);
  if (!m || m[1].trim().split(/\s+/).length > 4) return null;
  return [m[1], m[2]];
}

function zeileHtml(t, inline) {
  const e = etikett(t);
  return e ? `<b class="ts-etikett">${satzZeile(e[0], inline)}:</b> ${satzZeile(e[1], inline)}` : satzZeile(t, inline);
}

/** Zeilen klassifizieren: leer, text, punkt (mit Ebene), nummer, rechnung. */
function klassen(text) {
  const roh = String(text ?? "").replace(/\r/g, "").split("\n");
  const out = [];
  roh.forEach((z) => {
    const einzug = (/^[ \t]*/.exec(z)[0] || "").replace(/\t/g, "  ").length, t = z.trim();
    if (!t) return out.push({ art: "leer" });
    let m;
    if ((m = NUMMER.exec(t))) return out.push({ art: "nummer", marke: m[1], t: t.slice(m[0].length) });
    if ((m = OP.exec(t)) && hatZahl(t) && !(m[1] === "-" && !/\d\s?(€|%)/.test(t))) return out.push({ art: "rechnung", op: m[1] === "-" || m[1] === "./." ? "−" : m[1], t: t.slice(m[0].length) });
    if ((m = PUNKT.exec(t))) return out.push({ art: "punkt", ebene: einzug >= 2 || m[1] !== "•" ? 1 : 0, marke: m[1], t: t.slice(m[0].length) });
    out.push({ art: "text", t });
  });
  // „–“-Punkte ohne vorangehenden •-Punkt sind normale Aufzählung (Ebene 0)
  let inPunkt = false;
  for (const z of out) {
    if (z.art === "punkt") { if (z.ebene === 1 && !inPunkt && z.marke !== "•") z.ebene = 0; if (z.ebene === 0 && z.marke === "•") inPunkt = true; }
    else if (z.art !== "punkt") inPunkt = z.art === "nummer" ? inPunkt : false;
  }
  // Rechenweg: Zeile mit Zahl direkt vor der ersten Rechenzeile gehört dazu
  for (let i = 1; i < out.length; i++) {
    if (out[i].art === "rechnung" && out[i - 1].art === "text" && hatZahl(out[i - 1].t) && !/:$/.test(out[i - 1].t)) out[i - 1] = { art: "rechnung", op: "", t: out[i - 1].t };
  }
  return out;
}

function rechnungZeile(z, inline) {
  const m = BETRAG.exec(z.t), summe = z.op === "=";
  const inhalt = m ? `<span class="ts-rt">${zeileHtml(m[1], inline)}</span><span class="ts-rb">${satzZeile(m[2].replace(/^−\s/, "−"), inline)}</span>`
    : `<span class="ts-rt ts-breit">${zeileHtml(z.t, inline)}</span>`;
  return `<div class="ts-r${summe ? " summe" : ""}"><span class="ts-op">${z.op ? esc(z.op) : ""}</span>${inhalt}</div>`;
}

/** Mehrzeiliger Text → HTML mit Absätzen, Listen, Nummerierungen und Rechenwegen. */
export function satz(text, inline = esc) {
  const z = klassen(text), html = [];
  let i = 0;
  const liste = (start) => { // Punkte ab start (Ebene 0 mit verschachtelter Ebene 1)
    let h = "", j = start;
    while (j < z.length && z[j].art === "punkt" && z[j].ebene === 0) {
      let li = zeileHtml(z[j].t, inline); j++;
      if (j < z.length && z[j].art === "punkt" && z[j].ebene === 1) {
        let sub = ""; while (j < z.length && z[j].art === "punkt" && z[j].ebene === 1) { sub += `<li>${zeileHtml(z[j].t, inline)}</li>`; j++; }
        li += `<ul class="ts-liste ts-unter">${sub}</ul>`;
      }
      h += `<li>${li}</li>`;
    }
    // reine Unterpunkte ohne Oberpunkt
    while (j < z.length && z[j].art === "punkt" && z[j].ebene === 1) { h += `<li>${zeileHtml(z[j].t, inline)}</li>`; j++; }
    return [`<ul class="ts-liste">${h}</ul>`, j];
  };
  while (i < z.length) {
    const a = z[i];
    if (a.art === "leer") { i++; continue; }
    if (a.art === "punkt") { const [h, j] = liste(i); html.push(h); i = j; continue; }
    if (a.art === "rechnung") {
      let h = ""; while (i < z.length && z[i].art === "rechnung") h += rechnungZeile(z[i++], inline);
      html.push(`<div class="ts-rechnung">${h}</div>`); continue;
    }
    if (a.art === "nummer") {
      let h = "";
      while (i < z.length && z[i].art === "nummer") {
        let li = `<span class="ts-marke">${esc(z[i].marke.replace(/[.)]$/, "").replace(/^\(/, ""))}</span><div class="ts-ni">${zeileHtml(z[i].t, inline)}`; i++;
        // Fortsetzung: Text, Punkte und Rechenzeilen gehören zum Nummernpunkt, bis zur nächsten Nummer oder Leerzeile
        while (i < z.length && ["text", "punkt", "rechnung"].includes(z[i].art)) {
          if (z[i].art === "punkt") { const [ul, j] = liste(i); li += ul; i = j; }
          else if (z[i].art === "rechnung") { let r = ""; while (i < z.length && z[i].art === "rechnung") r += rechnungZeile(z[i++], inline); li += `<div class="ts-rechnung">${r}</div>`; }
          else li += `<p>${zeileHtml(z[i++].t, inline)}</p>`;
        }
        h += `<li>${li}</div></li>`;
        while (i < z.length && z[i].art === "leer" && z[i + 1]?.art === "nummer") i++;
      }
      html.push(`<ol class="ts-num">${h}</ol>`); continue;
    }
    // Absatz: aufeinanderfolgende Textzeilen, Zeilenumbrüche bleiben erhalten
    const zeilen = [];
    while (i < z.length && z[i].art === "text") zeilen.push(zeileHtml(z[i++].t, inline));
    html.push(`<p>${zeilen.join("<br>")}</p>`);
  }
  return `<div class="ts">${html.join("")}</div>`;
}
