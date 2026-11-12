// Suche: reine Hilfsfunktionen (getestet) – Normalisierung, Fragewörter, Wortstämme, Gewichtung seltener Begriffe.

/** Kleinbuchstaben, Umlaute ausgeschrieben, Bindestriche zwischen Wörtern entfernt, Satzzeichen zu Leerzeichen. */
export const norma = (t) => String(t).toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/(\w)-(\w)/g, "$1$2").replace(/[.,;:!?()„“"'§]/g, " ").replace(/\s+/g, " ");

/** Füll- und Fragewörter: „Was ist ein Verwaltungsakt?“ sucht nach „verwaltungsakt“. */
export const STOPP = new Set(["der", "die", "das", "den", "dem", "des", "ein", "eine", "einer", "einem", "einen", "eines", "und", "oder", "von", "zu", "zum", "zur", "im", "in", "mit", "bei", "fuer",
  "wie", "was", "ist", "to", "wann", "wer", "wen", "wem", "welche", "welcher", "welches", "welchen", "wo", "woran", "warum", "wieso", "weshalb", "wodurch", "womit",
  "sind", "gilt", "gelten", "bedeutet", "heisst", "versteht", "verstehe", "man", "unter", "ich", "muss", "muessen", "kann", "koennen", "darf", "gibt", "es", "auf", "als", "nach", "ueber",
  "wird", "werden", "hat", "haben", "nicht", "kein", "keine", "sich", "dass", "so", "auch", "noch", "erklaer", "erklaere", "erklaerung", "bitte", "definition", "definiere"]);

/** Leichter deutscher Wortstamm: häufige Endungen abschneiden („rueckstellungen“ → „rueckstellung“, „steuerpflichtigen“ → „steuerpflichtig“). */
const ENDUNGEN = [["ungen", "ung"], ["heiten", "heit"], ["keiten", "keit"], ["ionen", "ion"], ["innen", "in"], ["ern", ""], ["en", ""], ["er", ""], ["es", ""], ["em", ""], ["e", ""], ["n", ""], ["s", ""]];
export function stamm(w) {
  if (w.length < 6 || /\d/.test(w)) return w;
  for (const [e, r] of ENDUNGEN) if (w.endsWith(e) && w.length - e.length + r.length >= 5) return w.slice(0, -e.length) + r;
  return w;
}

/** Normzitat ohne §: „15 ustg“, „§ 15 Abs. 1 UStG“, „art 63“ → { art, nr, gesetz } oder null. */
const GESETZE = ["ustg", "estg", "ao", "hgb", "bgb", "gg", "gmbhg", "ustdv", "estdv", "vwzg", "bwahlg", "gobt", "lstdv", "erbstg", "bewg"];
export function zitatAus(q) {
  const t = norma(q).trim();
  let m = /^(art|§)?\s*(\d+[a-z]?)\b(?:\s+abs\s+\d+)?(?:\s+(?:s|satz|nr)\s+\d+)*\s*([a-z]*)\s*$/.exec(t.replace(/^paragraph\s+/, "§ "));
  if (!m) m = /^(art)\s*(\d+[a-z]?)\s*([a-z]*)$/.exec(t);
  if (!m) return null;
  const [, art0, nr, gesetz] = m, para = /^\s*(§|paragraph)/i.test(q), art = art0 || (para ? "§" : "");
  const istArt = art === "art" || gesetz === "gg";
  if (!art && !GESETZE.includes(gesetz)) return null; // reine Zahl ist kein Zitat
  if (gesetz && !GESETZE.some((g) => g.startsWith(gesetz))) return null;
  return { art: istArt ? "art" : "§", nr, gesetz };
}

/** Gewicht je Begriff nach Seltenheit (IDF): Begriffe, die überall vorkommen („steuer“), zählen weniger. */
export function seltenheit(anzahlTreffer, gesamt) {
  return 1 + Math.log((gesamt + 1) / (anzahlTreffer + 1));
}
