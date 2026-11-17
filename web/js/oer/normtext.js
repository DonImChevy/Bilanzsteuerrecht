// Löst Normverweise wie "GG 51 3 2" (Art. 51 Abs. 3 Satz 2 GG) oder "UStG 17 1" in Text auf.
import { NORMEN as NORMEN_OER } from "./normen.js";
import { NORMEN_BILR } from "../bilr/normen.js";
import { NORMEN_EST } from "../est/normen.js";
import { NORMEN_EST_BGB } from "../est/punkte.js";
import { NORMEN_BILR_ZUSATZ } from "../bilr/normen_zusatz.js";
import { NORMEN_UST } from "../ust/normen.js";
import { NORMEN_ESTR } from "../est/r2.js";
import { NORMEN_AO } from "../ao/normen.js";
import { NORMEN_GOBT } from "./gobt.js";
import { NORMEN_PR } from "../pr/normen.js";
import { NORMEN_BEW } from "../bewr/normen.js";
import { LISTENENDE } from "./listenende.js";

// Ein Paragraf kann in mehreren Modulen vorkommen (z. B. § 12 EStG): Absätze werden vereinigt,
// faecher nennt die Module, in deren Nachschlagen-Liste er erscheint.
const INDEX = new Map();
for (const [fach, liste] of [["oer", [...NORMEN_OER, ...NORMEN_GOBT]], ["bsr", [...NORMEN_BILR, ...NORMEN_BILR_ZUSATZ]], ["est", [...NORMEN_EST, ...NORMEN_EST_BGB, ...NORMEN_ESTR]], ["ust", NORMEN_UST], ["ao", NORMEN_AO], ["pr", NORMEN_PR], ["bewr", NORMEN_BEW]]) {
  for (const n of liste) {
    const k = `${n.g} ${n.nr}`, da = INDEX.get(k);
    if (!da) { INDEX.set(k, { ...n, faecher: [fach] }); continue; }
    da.faecher.push(fach);
    // Gleicher Absatz in zwei Auszügen (z. B. § 4 UStG): der längere enthält den kürzeren
    da.abs = da.abs.map((b) => { const a = n.abs.find((x) => x.abs === b.abs); return a && a.text.length > b.text.length ? a : b; });
    const neu = n.abs.filter((a) => !da.abs.some((b) => b.abs === a.abs));
    if (neu.length) da.abs = [...da.abs, ...neu].sort((a, b) => parseInt(a.abs || 0) - parseInt(b.abs || 0));
    da.auszug = da.auszug && n.auszug;
    da.titel ||= n.titel;
  }
}
const NORMEN = [...INDEX.values()];

/** Wo nach einer Aufzählung wieder Sätze des Absatzes folgen (listenende.js), beginnt eine neue Zeile;
 *  `enden` hält diese Stellen fest – satzMarken() zählt dort wieder auf Absatzebene. */
const LISTENENDE_FEHLT = [];
for (const n of NORMEN) {
  n.abs = n.abs.map((a) => {
    const anfaenge = LISTENENDE[`${n.g} ${n.nr} ${a.abs}`.trim()];
    if (!anfaenge) return a;
    let text = a.text;
    const enden = [];
    for (const anfang of anfaenge) {
      const muster = new RegExp(String.raw`(\s)(` + anfang.split(" ").map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(String.raw`\s+`) + ")", "g");
      const ab = text.search(/\n(?:\d+[a-z]?\.|[a-z]\)) /);
      let m = null;
      for (const x of text.matchAll(muster)) if (ab >= 0 && x.index > ab && !enden.includes(x.index + 1)) { m = x; break; }
      if (!m) { LISTENENDE_FEHLT.push(`${n.g} ${n.nr} ${a.abs}: ${anfang}`); continue; }
      if (m[1] !== "\n") text = text.slice(0, m.index) + "\n" + text.slice(m.index + 1);
      enden.push(m.index + 1);
    }
    return { ...a, text, enden };
  });
}
export { LISTENENDE_FEHLT };

export function norm(ref) {
  const [g, nr, abs, satz] = ref.split(" ");
  const n = INDEX.get(`${g} ${nr}`);
  if (!n) return null;
  const absaetze = abs ? n.abs.filter((a) => a.abs === abs) : n.abs;
  if (abs && !absaetze.length) return null;
  const teile = [];
  if (g === "GG") teile.push(nr === "Präambel" ? "Präambel" : `Art. ${nr}`);
  else if (g === "EStR") teile.push(`R ${nr}`); // Einkommensteuer-Richtlinien
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
  // Richtlinien: „R 2 EStR“, „R 2 Abs. 1 EStR“
  for (const m of String(text).matchAll(/\bR[\s\u00a0]*(\d+[a-z]?(?:\.\d+)?)(?:[\s\u00a0]+Abs\.[\s\u00a0]*(\d+))?[\s\u00a0]+EStR\b/g)) {
    if (!INDEX.has(`EStR ${m[1]}`)) continue;
    const ref = m[2] && norm(`EStR ${m[1]} ${m[2]}`) ? `EStR ${m[1]} ${m[2]}` : `EStR ${m[1]}`;
    if (!refs.includes(ref)) refs.push(ref);
  }
  for (const m of String(text).matchAll(/Art\.\s*(\d+[a-z]?)(?:\s+Abs\.\s*(\d+[a-z]?))?[^§]*?\bGG\b|Präambel[^§]*?\bGG\b/g)) {
    const nr = m[1] || "Präambel";
    if (!INDEX.has(`GG ${nr}`)) continue;
    const ref = m[2] && norm(`GG ${nr} ${m[2]}`) ? `GG ${nr} ${m[2]}` : `GG ${nr}`;
    if (!refs.includes(ref) && !refs.includes(`GG ${nr}`)) refs.push(ref);
  }
  for (const m of String(text).matchAll(/§§?[\s\u00a0]*([^§]*?)[\s\u00a0](HGB|AO|EStG|UStG|BWahlG|PartG|LStDV|GOBT|BGB|GmbHG|ErbStG|BewG)\b/g)) {
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
  for (const m of s.matchAll(/Präambel\s+(?:Satz|S\.)\s*(\d+)/g)) erg.push({ g: "GG", nr: "Präambel", abs: null, satz: m[1], nummern: [] });
  for (const m of s.matchAll(new RegExp(String.raw`Art\.\s*(\d+[a-z]?)` + MODS, "g"))) lesen("GG", m[1], m[2]);
  for (const m of s.matchAll(new RegExp(String.raw`§\s*(\d+[a-z]?)` + MODS + String.raw`\s*(?:des\s+)?(HGB|AO|EStG|UStG|BWahlG|PartG|GG|BGB|GmbHG|ErbStG|BewG)\b`, "g"))) lesen(m[3], m[1], m[2]);
  return erg;
}

const ABKUERZUNG = /^(?:Abs|Nr|Nrn|Art|S|Buchst|bzw|vgl|ggf|Ziff|z|B|u|a|d|h|m|v|E|gem|i\.V\.m|i\.S\.d|Bek|BGBl|ABl|Ges|Kap|Gz|lfd|Rn|Tz)$/;
/** Teilt einen Absatz in Sätze: [[start, ende], …] – Aufzählungsnummern und Abkürzungen sind keine Satzenden. */
export function saetze(text) {
  const grenzen = [];
  for (const m of text.matchAll(/\.["“]?(?=\s+[A-ZÄÖÜ„§])/g)) {
    const vorne = text.slice(0, m.index), davor = (vorne.match(/(\S+)$/)?.[1] || "").replace(/^[(\[„"]+/, "");
    // Innerhalb wörtlich zitierter Texte (z. B. Eidesformel in Art. 56 GG) endet kein Satz
    if (((text.slice(0, m.index + m[0].length).match(/["„“]/g) || []).length % 2) === 1) continue;
    // „… § 40 Absatz 3 Satz 2. Die …“: Zahl nach Satz/Absatz/Nummer ist ein Verweis – danach endet der Satz
    const verweis = /(?:Satz|Sätze|Absatz|Absätze|Abs\.|Nummer|Nr\.|§|Art\.|Artikel)[ \u00a0]+\d+[a-z]?(?:[ \u00a0]*(?:,|und|bis)[ \u00a0]*\d+[a-z]?)*$/.test(vorne);
    if (ABKUERZUNG.test(davor) || (/^\d+[a-z]?$/.test(davor) && !verweis) || /^\d+\.$/.test(davor)) continue;
    grenzen.push(m.index + m[0].length);
  }
  // Tabellen (Zeilen mit „ | “, z. B. § 19 Abs. 2 EStG): der Satz nach der Tabelle beginnt ohne Punkt davor
  for (const m of text.matchAll(/ \| [^\n]*\n(?=[A-ZÄÖÜ])/g)) grenzen.push(m.index + m[0].length);
  grenzen.sort((a, b) => a - b);
  const teile = [];
  let start = 0;
  for (const g of [...grenzen, text.length]) {
    const s = text.slice(start, g).match(/^\s*/)[0].length + start;
    teile.push([s, g]);
    start = g;
  }
  return teile;
}

const NUMMER = /^(\d+[a-z]?)\.\s/, BUCHST = /^([a-z]{1,2})\)\s/;
/**
 * Satznummern eines Absatzes, wie in Gesetzessammlungen: Sätze des Absatzes zählen durch (eine Aufzählung
 * gehört zu dem Satz, der sie einleitet); Sätze innerhalb einer Nummer zählen innerhalb der Nummer
 * (§ 39 Abs. 2 Nr. 1 S. 2 AO). `enden` = Stellen, an denen nach einer Aufzählung der Absatz weitergeht.
 * Ergebnis: marken [{pos, nr, ebene: "abs"|"nr"}] (nur, wo es mindestens zwei Sätze gibt) und
 * absSaetze [[start, ende], …] = die Sätze auf Absatzebene (für das Hervorheben von „Satz 2“).
 */
export function satzMarken(text, enden = []) {
  const starts = saetze(text).map(([s]) => s).filter((s) => s < text.length);
  const zeilen = [];
  let p = 0;
  for (const l of text.split("\n")) { zeilen.push([p, l]); p += l.length + 1; }
  // Ebene je Zeile: "abs" oder Nummer der Aufzählung (Index), "…" = Auslassung
  let ebene = "abs", posten = -1, inNummer = false;
  const art = zeilen.map(([s, l]) => {
    if (NUMMER.test(l)) { posten++; inNummer = true; ebene = posten; return { s, l, ebene, kopf: (l.match(NUMMER)[0] + (l.slice(l.match(NUMMER)[0].length).match(BUCHST)?.[0] || "")).length }; }
    if (BUCHST.test(l)) { if (!inNummer) { posten++; ebene = posten; } return { s, l, ebene, kopf: inNummer ? 0 : l.match(BUCHST)[0].length, buchst: inNummer }; }
    if (l.startsWith("…")) { inNummer = false; return { s, l, ebene: "aus" }; }
    if (enden.includes(s)) { ebene = "abs"; inNummer = false; }
    return { s, l, ebene };
  });
  const ebeneVon = (pos) => { let e = art[0]; for (const z of art) if (z.s <= pos) e = z; return e; };
  const abs = [], nr = new Map();
  const erster = text.search(/\S/);
  if (erster >= 0) abs.push(erster);
  for (const s of starts) {
    if (s === erster) continue;
    const z = ebeneVon(s);
    if (z.ebene === "aus") continue;
    if (z.ebene === "abs") abs.push(s);
    else { if (!nr.has(z.ebene)) nr.set(z.ebene, []); nr.get(z.ebene).push(s); }
  }
  const marken = [];
  if (abs.length > 1) abs.forEach((pos, i) => marken.push({ pos, nr: i + 1, ebene: "abs" }));
  // Nummern: erster Satz beginnt nach „1. “ (bzw. „a) “), weitere an ihren Satzanfängen
  const kopfZeile = new Map();
  for (const z of art) if (typeof z.ebene === "number" && !z.buchst && !kopfZeile.has(z.ebene)) kopfZeile.set(z.ebene, z);
  for (const [e, liste] of nr) {
    const k = kopfZeile.get(e);
    if (!k) continue;
    const alle = [k.s + k.kopf, ...liste.filter((s) => s > k.s + k.kopf)];
    if (alle.length > 1) alle.forEach((pos, i) => marken.push({ pos, nr: i + 1, ebene: "nr" }));
  }
  marken.sort((a, b) => a.pos - b.pos);
  const absSaetze = abs.map((s, i) => [s, i + 1 < abs.length ? abs[i + 1] : text.length]);
  return { marken, absSaetze };
}

