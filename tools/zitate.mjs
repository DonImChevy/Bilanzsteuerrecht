// Findet alle Normzitate in den Inhalten eines Moduls (Überblicke, Aufgaben, Lernpfad, Beispiele, Probeklausuren).
// Genutzt von tools/zitierte_normen.mjs (welche Normen in den Normen-Tab gehören) und vom Test.
import fs from "node:fs";
import path from "node:path";

export const GESETZE_ALLE = "HGB|AO|EStG|EStDV|UStG|UStDV|BWahlG|PartG|LStDV|GOBT|BGB|GmbHG|ErbStG|ErbStDV|BewG|VwZG|GG|KStG|GewStG|AktG|StGB|FGO|BVerfGG|SolZG|GrEStG|GrStG|StBerG|InsO|ZPO";
/** Bewusst nicht aufgenommen: erfundener Artikel in einem Fall, Ende eines Bereichs „§§ 4–7k EStG“ (aufgehoben). */
export const AUSNAHMEN = ["GG 20b", "EStG 7k"];
/** Quellordner je Modul (Normdateien selbst ausgenommen). */
export const ORDNER = { oer: ["oer"], bsr: ["bilr"], est: ["est"], ust: ["ust"], ao: ["ao"], pr: ["pr"], bewr: ["bewr"] };

/** Zitate in einem Text → ["AO 122", "GG 38", "EStR 4.2", …] (mit Wiederholungen). */
export function zitate(t) {
  const out = [];
  t = String(t).replace(/\\n/g, " ").replace(/ /g, " ");
  /** Welche Teile einer Liste neue Paragrafen sind: „§§ 188 Abs. 2, 3“ → nur 188; „§§ 4 Nr. 1b, 6a“ → 4, 6a; „Art. 77, 78“ → beide. */
  const paragrafen = (liste, doppel) => {
    const teile = liste.split(/\s*(?:,|\bund\b|\bbis\b|–|-|i\.\s?V\.\s?m\.|\bsowie\b|\boder\b)\s*/).map((x) => x.replace(/^(?:§§?|Artt?\.)\s*/, "").trim());
    const nrn = [];
    let vorher = -1, qualifiziert = false;
    for (const [i, teil] of teile.entries()) {
      const nr = teil.match(/^(\d+[a-z]?)/)?.[1];
      if (!nr) continue;
      const nackt = /^\d+[a-z]?$/.test(teil), groesser = parseInt(nr) > vorher;
      // einfaches „§“/„Art.“: nach Abs./S./Nr. folgen nur noch Absätze bzw. Nummern („§ 4 Nr. 12, 14, 28 UStG“)
      if (i === 0 || (doppel ? groesser : nackt && !qualifiziert && groesser)) { nrn.push(nr); vorher = parseInt(nr); }
      if (!nackt) qualifiziert = true;
    }
    return nrn;
  };
  const TEIL = String.raw`\d+[a-z]?(?:\s*(?:Abs\.|Absatz|S\.|Satz|Nr\.|Nrn\.|Nummer|Buchst\.|Halbsatz|HS)\s*\d*[a-z]?)*`;
  const LISTE = String.raw`${TEIL}(?:\s*(?:,|und|bis|–|-|i\.\s?V\.\s?m\.|sowie|oder)\s*(?:§§?\s*)?${TEIL})*`;
  for (const m of t.matchAll(new RegExp(String.raw`§§?\s*(${LISTE})\s*(?:des\s+|der\s+)?(${GESETZE_ALLE})\b`, "g")))
    for (const nr of paragrafen(m[1], m[0].startsWith("§§"))) out.push(`${m[2]} ${nr}`);
  for (const m of t.matchAll(new RegExp(String.raw`Artt?\.\s*(${LISTE})\s*(?:des\s+)?GG\b`, "g")))
    for (const nr of paragrafen(m[1], m[0].startsWith("Artt"))) out.push(`GG ${nr}`);
  for (const m of t.matchAll(/\bR\s*(\d+[a-z]?(?:\.\d+[a-z]?)?)(?:\s+(?:Abs\.|S\.|Satz)\s*\d+[a-z]?)*\s+EStR\b/g)) out.push(`EStR ${m[1]}`);
  return out.filter((z) => !AUSNAHMEN.includes(z));
}

/** Alle Zitate je Modul: { fach: Map(ref → Anzahl) }. kompakt = KOMPAKT, themen = THEMEN. */
export function zitateJeModul(wurzel, kompakt, themen) {
  const erg = {};
  for (const [fach, ordner] of Object.entries(ORDNER)) {
    let text = "";
    for (const d of ordner) for (const f of fs.readdirSync(path.join(wurzel, "web/js", d)).sort())
      if (f.endsWith(".js") && !/normen|^gobt\.js|normtext|listenende|^r2\.js/.test(f)) text += fs.readFileSync(path.join(wurzel, "web/js", d, f), "utf8") + "\n";
    for (const t of themen.filter((t) => t.fach === fach)) text += JSON.stringify(kompakt[t.id] || {}) + "\n";
    const z = new Map();
    for (const k of zitate(text)) z.set(k, (z.get(k) || 0) + 1);
    erg[fach] = z;
  }
  return erg;
}
