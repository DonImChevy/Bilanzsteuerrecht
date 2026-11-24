// Spiel „Paare finden“: Normen-Paare je Modul.
import { PAARE_EST } from "./est/paare.js";
import { PAARE_BSR } from "./bilr/paare.js";
import { PAARE_OER } from "./oer/paare.js";
import { PAARE_UST } from "./ust/paare.js";
import { PAARE_AO } from "./ao/paare.js";
import { PAARE_PR } from "./pr/paare.js";
import { PAARE_BEWR } from "./bewr/paare.js";

export const PAARE = { est: PAARE_EST, bsr: PAARE_BSR, oer: PAARE_OER, ust: PAARE_UST, ao: PAARE_AO, pr: PAARE_PR, bewr: PAARE_BEWR };

// ---------- Paare je Überblick (Themenwahl im Spiel) ----------
const GESETZE = "HGB|AO|EStG|EStDV|UStG|UStDV|BWahlG|PartG|LStDV|GOBT|BGB|GmbHG|ErbStG|BewG|VwZG|KStG|GrEStG|AktG|StGB|FGO|BVerfGG";
const ROEM = { I: 1, II: 1, III: 1, IV: 1, V: 1, VI: 1, VII: 1, VIII: 1, IX: 1, X: 1 };
/** Alle zitierten Paragrafen eines Textes als Schlüssel „AO 30“, „GG 21“ (Absatz und Satz egal). */
export function paragrafe(text) {
  const s = String(text), erg = new Set();
  for (const m of s.matchAll(/Art\.\s*(\d+[a-z]?)[^§]*?\bGG\b/g)) erg.add(`GG ${m[1]}`);
  for (const m of s.matchAll(new RegExp(String.raw`§§?[\s ]*([^§]*?)[\s ](${GESETZE})\b`, "g"))) {
    const doppel = m[0].startsWith("§§");
    for (const teil of m[1].split(/,|\bi\.\s?V\.\s?m\.|\bund\b|\bbis\b|–/)) {
      const t = teil.trim().match(/^(\d+[a-z]?)\b/);
      if (!t || ROEM[teil.trim().split(/\s/)[0]]) continue;
      erg.add(`${m[2]} ${t[1]}`);
      if (!doppel) break; // „§ 30 Abs. 2, 4 AO“: nur § 30 – weitere Zahlen sind Absätze
    }
  }
  return erg;
}
/** Paare je Thema: Ein Paar gehört zu jedem Thema, dessen Überblick seinen Paragrafen zitiert. */
export function paareJeThema(paare, themen, kompakt) {
  const erg = {};
  for (const t of themen) {
    const k = kompakt[t.id];
    const zitiert = paragrafe(k ? JSON.stringify(k) : "");
    erg[t.id] = paare.map((p, i) => [i, [...paragrafe(p[0])][0]]).filter(([, s]) => s && zitiert.has(s)).map(([i]) => i);
  }
  return erg;
}
