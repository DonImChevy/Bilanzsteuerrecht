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
    for (const teil of m[1].split(/,|\bi\.\s?V\.\s?m\.|\bund\b/)) {
      const t = teil.trim().match(/^(\d+[a-z]?)(?:\s+(?:Abs\.\s*(\d+[a-z]?)|([IVX]+)\b))?/);
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
