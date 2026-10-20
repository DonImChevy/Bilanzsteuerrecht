// Automatische Prüfung offener Antworten (Frage – Antwort):
// richtig, wenn die maßgebliche Norm zitiert ist und genug Stichworte vorkommen.
// Tolerant: Groß-/Kleinschreibung, Umlaute (ä = ae), Wortformen (Stichworte sind Wortanfänge bzw. -teile),
// Reihenfolge und Formulierung sind egal; das Gesetz darf beim Zitat fehlen (§ 26 reicht für § 26 EStG).
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

const nummerVon = (ref) => nrNorm(ref.split(" ")[1] || "");
/** Norm aus einer Referenz wie "EStG 26 1" lesbar machen: "§ 26 EStG" bzw. "Art. 51 GG". */
export const normLabel = (ref) => { const [g, nr] = ref.split(" "); return g === "GG" ? `Art. ${nr} GG` : `§ ${nr} ${g}`; };

/** Prüfdaten einer Frage: Pflichtnormen (Liste von Alternativ-Gruppen) und Stichworte. Null = keine automatische Prüfung. */
export function pruefdaten(frage) {
  const d = STICHWORTE[frage.id];
  if (!d) return null;
  const norm = (d.norm ?? (frage.normen?.length ? [frage.normen[0]] : [])).map((g) => g.split("|"));
  const s = d.s.map((w) => w.split("|").map((alt) => normalisiere(alt).split(" ").filter(Boolean)));
  return { norm, s, roh: d.s, min: d.min ?? Math.max(1, Math.ceil(d.s.length * QUOTE)) };
}

/**
 * Prüft eine Antwort. Ergebnis: null (keine Prüfdaten oder leere Antwort → Selbstbewertung) oder
 * { korrekt, normen: [{label, ok}], stichworte: [{wort, ok}], treffer, min }.
 */
export function pruefeOffen(frage, text) {
  const d = pruefdaten(frage);
  if (!d || !String(text || "").trim()) return null;
  const t = " " + normalisiere(text) + " ";
  const zitiert = zitierteNummern(text);
  const normen = d.norm.map((gruppe) => ({ label: gruppe.map(normLabel).join(" oder "), ok: gruppe.some((ref) => zitiert.has(nummerVon(ref))) }));
  const stichworte = d.s.map((alts, i) => ({ wort: d.roh[i].split("|")[0], ok: alts.some((teile) => teile.every((w) => t.includes(w))) }));
  const treffer = stichworte.filter((x) => x.ok).length;
  return { korrekt: normen.every((n) => n.ok) && treffer >= d.min, normen, stichworte, treffer, min: d.min };
}
