// Löst Normverweise wie "GG 51 3 2" (Art. 51 Abs. 3 Satz 2 GG) oder "UStG 17 1" in Text auf.
import { NORMEN as NORMEN_OER } from "./normen.js";
import { NORMEN_BILR } from "../bilr/normen.js";

const NORMEN = [...NORMEN_OER, ...NORMEN_BILR];
const INDEX = new Map(NORMEN.map((n) => [`${n.g} ${n.nr}`, n]));

export function norm(ref) {
  const [g, nr, abs, satz] = ref.split(" ");
  const n = INDEX.get(`${g} ${nr}`);
  if (!n) return null;
  const absaetze = abs ? n.abs.filter((a) => a.abs === abs) : n.abs;
  if (abs && !absaetze.length) return null;
  const teile = [];
  if (g === "GG") teile.push(nr === "Präambel" ? "Präambel" : `Art. ${nr}`);
  else teile.push(`§ ${nr}`);
  if (abs) teile.push(`Abs. ${abs}`);
  if (satz) teile.push(`S. ${satz}`);
  return { ref, label: `${teile.join(" ")} ${g}`, titel: n.titel, absaetze, auszug: !!n.auszug };
}

const ROEMISCH = { I: "1", II: "2", III: "3", IV: "4", V: "5", VI: "6", VII: "7", VIII: "8", IX: "9", X: "10" };

/**
 * Findet Normzitate im Text („§ 17 I UStG“, „§§ 238, 241a HGB“, „§ 4 Abs. 3 EStG“) und liefert die Verweise,
 * deren Text in der App vorhanden ist. Absätze, die im Auszug fehlen, führen zum ganzen Paragrafen.
 */
export function normenAusText(text) {
  const refs = [];
  for (const m of String(text).matchAll(/§§?[\s ]*([^§]*?)[\s ](HGB|AO|EStG|UStG)\b/g)) {
    const g = m[2];
    let vorher = null;
    for (const teil of m[1].split(/,|\bi\.\s?V\.\s?m\.|\bund\b/)) {
      // „§ 257 I, IV HGB“: ein Teil nur mit Absatz gehört zum vorigen Paragrafen
      const nurAbs = teil.trim().match(/^([IVX]+)\b/);
      const t = nurAbs && vorher ? [null, vorher, null, nurAbs[1]] : teil.trim().match(/^(\d+[a-z]?)(?:\s+(?:Abs\.\s*(\d+[a-z]?)|([IVX]+)\b))?/);
      if (t) vorher = t[1];
      if (!t || !INDEX.has(`${g} ${t[1]}`)) continue;
      const abs = t[2] || ROEMISCH[t[3]];
      const ref = abs && norm(`${g} ${t[1]} ${abs}`) ? `${g} ${t[1]} ${abs}` : `${g} ${t[1]}`;
      if (!refs.includes(ref) && !refs.includes(`${g} ${t[1]}`)) refs.push(ref);
    }
  }
  return refs;
}

export const normGueltig = (ref) => norm(ref) !== null;
export { NORMEN };

/**
 * Alle genauen Zitate in einem Text, z. B. „§ 17 I 8 UStG“, „§ 141 I 1 Nr. 1, 4, 5 AO“, „Art. 21 Abs. 1 Satz 1 GG“,
 * „§ 241a S. 1 HGB“. Ergebnis: [{g, nr, abs, satz, nummern}] – dient zum Hervorheben im Gesetzestext.
 */
export function zitate(text) {
  const MODS = String.raw`((?:\s*(?:Abs\.\s*\d+[a-z]?|[IVX]+\b(?!\.)|S\.\s*\d+|Satz\s*\d+|Nr\.\s*\d+[a-z]?(?:\s*(?:,|und)\s*\d+[a-z]?)*|\d+\b(?![.,]?\d|\s*(?:€|%|Euro|Mio|Jahre|Monate|Tage))))*)`;
  const erg = [];
  const lesen = (g, nr, mods) => {
    const z = { g, nr, abs: null, satz: null, nummern: [] };
    for (const t of mods.matchAll(/Abs\.\s*(\d+[a-z]?)|\b([IVX]+)\b|(?:S\.|Satz)\s*(\d+)|Nr\.\s*(\d+[a-z]?(?:\s*(?:,|und)\s*\d+[a-z]?)*)|\b(\d+)\b/g)) {
      if (t[1]) z.abs = t[1];
      else if (t[2]) z.abs = ROEMISCH[t[2]] || z.abs;
      else if (t[3]) z.satz = t[3];
      else if (t[4]) z.nummern = t[4].split(/\s*(?:,|und)\s*/);
      else if (t[5] && z.abs && !z.satz) z.satz = t[5];
    }
    if (z.abs || z.satz || z.nummern.length) erg.push(z);
  };
  const s = String(text);
  for (const m of s.matchAll(new RegExp(String.raw`Art\.\s*(\d+[a-z]?)` + MODS, "g"))) lesen("GG", m[1], m[2]);
  for (const m of s.matchAll(new RegExp(String.raw`§\s*(\d+[a-z]?)` + MODS + String.raw`\s*(?:des\s+)?(HGB|AO|EStG|UStG|BWahlG|PartG|GG)\b`, "g"))) lesen(m[3], m[1], m[2]);
  return erg;
}

const ABKUERZUNG = /^(?:Abs|Nr|Nrn|Art|S|Buchst|bzw|vgl|ggf|Ziff|z|B|u|a|d|h|m|i\.V\.m|i\.S\.d|Bek|BGBl|Ges|Kap)$/;
/** Teilt einen Absatz in Sätze: [[start, ende], …] – Aufzählungsnummern und Abkürzungen sind keine Satzenden. */
export function saetze(text) {
  const grenzen = [];
  for (const m of text.matchAll(/\.(?=\s+[A-ZÄÖÜ„])/g)) {
    const davor = text.slice(0, m.index).match(/(\S+)$/)?.[1] || "";
    if (ABKUERZUNG.test(davor) || /^\d+[a-z]?$/.test(davor) || /^\d+\.$/.test(davor)) continue;
    grenzen.push(m.index + 1);
  }
  const teile = [];
  let start = 0;
  for (const g of [...grenzen, text.length]) {
    const s = text.slice(start, g).match(/^\s*/)[0].length + start;
    teile.push([s, g]);
    start = g;
  }
  return teile;
}
