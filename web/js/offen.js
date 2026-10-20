// Automatische Prüfung offener Antworten (Frage – Antwort):
// richtig, wenn die maßgebliche Norm zitiert ist und genug Stichworte vorkommen.
// Tolerant: Groß-/Kleinschreibung, Umlaute (ä = ae), Wortformen (Stichworte sind Wortanfänge bzw. -teile),
// Reihenfolge und Formulierung sind egal; das Gesetz darf beim Zitat fehlen (§ 26 reicht für § 26 EStG).
// Ausnahme Punktesammler (streng: true): jede Norm genau mit Gesetz, Absatz und Satz.
import { STICHWORTE } from "./stichworte/index.js";

/** Anteil der Stichworte, der mindestens getroffen werden muss. */
export const QUOTE = 0.6;

export const normalisiere = (t) => String(t || "").toLowerCase()
  .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .replace(/[^a-z0-9§]+/g, " ").trim();

const NR = String.raw`\d+(?:\s?[a-z](?![a-zäöüß]))?`;
const ZITAT = new RegExp(String.raw`(?:§§?|\bart(?:ikel|\.)?|\bparagra(?:ph|f)(?:en)?)\s*(${NR}(?:\s*(?:,|und|u\.|bis|–|-|\/)\s*${NR})*)`, "gi");
const MIT_GESETZ = new RegExp(String.raw`(${NR})\s*(?:abs\.?\s*\d+\s*)?(?:s(?:atz|\.)?\s*\d+\s*)?(?:nr\.?\s*\d+\s*[a-z]?\s*)?(?:gg|estg|ao|bwahlg|partg|hgb|ustg|estdv|kstg|bgb)\b`, "gi");
const nrNorm = (n) => n.toLowerCase().replace(/\s+/g, "");

/** Alle in einem Text zitierten Paragrafen-/Artikelnummern (ohne Gesetz), z. B. {"26", "20a"}. */
export function zitierteNummern(text) {
  const out = new Set();
  for (const m of String(text || "").matchAll(ZITAT)) for (const n of m[1].match(new RegExp(NR, "gi")) || []) out.add(nrNorm(n));
  for (const m of String(text || "").matchAll(MIT_GESETZ)) out.add(nrNorm(m[1]));
  return out;
}

// Genaue Zitate mit Gesetz, Absatz und Satz – für Punktesammler („streng“), z. B. "estg 1 1 2" für § 1 Abs. 1 S. 2 EStG.
const GESETZ = "gg|estg|ao|bgb|bwahlg|partg|hgb|ustg|estdv|lstdv|kstg";
const ZITAT_GENAU = new RegExp(String.raw`(?:§§?|\bart(?:ikel|\.)?(?=\s*\d))\s*([^§;()\n]*?)\s*(?:\b(${GESETZ})\b|(?=[§;()\n]|$))`, "g");
const GRUPPE = /^\s*(\d+[a-z]?)\b\s*(?:(?:abs(?:atz|\.)?\s*(\d+)|\b([ivx]+)\b)\s*(?:(?:s(?:atz|\.)?\s*)?(\d+)\b)?)?\s*(?:nr\.?\s*\d+[a-z]?\s*)?/;
const ROEMISCH = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10 };
/** Alle Zitate als Schlüssel "gesetz nr", "gesetz nr abs", "gesetz nr abs satz" (Gesetz klein geschrieben). */
export function zitate(text) {
  const out = new Set();
  for (const m of String(text || "").toLowerCase().matchAll(ZITAT_GENAU)) {
    const gesetz = m[2] || "";
    let rest = m[1];
    while (rest) {
      const g = rest.match(GRUPPE);
      if (!g || !g[0].trim()) break;
      const [, nr, absZahl, absRoem, satz] = g, abs = absZahl || (absRoem && String(ROEMISCH[absRoem] || ""));
      const k = [gesetz, nr.replace(/\s+/g, "")];
      out.add(k.join(" "));
      if (abs) { out.add([...k, abs].join(" ")); if (satz) out.add([...k, abs, satz].join(" ")); }
      rest = rest.slice(g[0].length);
      const weiter = rest.match(/^\s*(?:,|und|u\.|sowie)\s*(?=\d)/);
      if (!weiter) break;
      rest = rest.slice(weiter[0].length);
    }
  }
  return out;
}

/** Stichwort lesbar anzeigen: „rueckwirk“ → „rückwirk“ (ae/oe/ue nach Konsonant sind Umlaute). */
const lesbar = (w) => w.replace(/([^aeiouq ])(ae|oe|ue)/g, (_, k, v) => k + { ae: "ä", oe: "ö", ue: "ü" }[v]);
const nummerVon = (ref) => nrNorm(ref.split(" ")[1] || "");
/** Norm aus einer Referenz wie "EStG 26 1" lesbar machen: "§ 26 EStG" bzw. "Art. 51 GG". */
export const normLabel = (ref) => { const [g, nr] = ref.split(" "); return g === "GG" ? `Art. ${nr} GG` : `§ ${nr} ${g}`; };
/** Genaue Fassung für strenge Prüfung: "EStG 1 1 2" → "§ 1 Abs. 1 S. 2 EStG". */
const normLabelGenau = (ref) => {
  const [g, nr, abs, satz] = ref.split(" ");
  return `${g === "GG" ? "Art." : "§"} ${nr}${abs ? ` Abs. ${abs}` : ""}${satz ? ` S. ${satz}` : ""} ${g}`;
};

/** Prüfdaten einer Frage: Pflichtnormen (Liste von Alternativ-Gruppen) und Stichworte. Null = keine automatische Prüfung. */
export function pruefdaten(frage) {
  const d = STICHWORTE[frage.id];
  if (!d) return null;
  const norm = (d.norm ?? (frage.normen?.length ? [frage.normen[0]] : [])).map((g) => g.split("|"));
  const s = d.s.map((w) => w.split("|").map((alt) => normalisiere(alt).split(" ").filter(Boolean)));
  return { norm, s, roh: d.s, streng: !!d.streng, min: d.min ?? Math.max(1, Math.ceil(d.s.length * QUOTE)) };
}

/**
 * Prüft eine Antwort. Ergebnis: null (keine Prüfdaten oder leere Antwort → Selbstbewertung) oder
 * { korrekt, normen: [{label, ok}], stichworte: [{wort, ok}], treffer, min }.
 */
export function pruefeOffen(frage, text) {
  const d = pruefdaten(frage);
  if (!d || !String(text || "").trim()) return null;
  const t = " " + normalisiere(text) + " ";
  // streng (Punktesammler): Gesetz, Absatz und Satz müssen stimmen; sonst genügt die Nummer
  const zitiert = d.streng ? zitate(text) : zitierteNummern(text);
  const passt = (ref) => (d.streng ? zitiert.has(ref.toLowerCase()) : zitiert.has(nummerVon(ref)));
  const normen = d.norm.map((gruppe) => ({ label: gruppe.map(d.streng ? normLabelGenau : normLabel).join(" oder "), ok: gruppe.some(passt) }));
  const stichworte = d.s.map((alts, i) => ({ wort: lesbar(d.roh[i].split("|")[0]), ok: alts.some((teile) => teile.every((w) => t.includes(w))) }));
  const treffer = stichworte.filter((x) => x.ok).length;
  return { korrekt: normen.every((n) => n.ok) && treffer >= d.min, normen, stichworte, treffer, min: d.min };
}
