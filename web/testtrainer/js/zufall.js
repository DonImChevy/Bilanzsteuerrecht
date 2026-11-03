// Seeded random numbers and number formatting (German locale), shared by all task generators.
// Every task is generated from (type, seed, level), so a wrong answer can be reproduced exactly.

/** Mulberry32 PRNG with helpers. */
export function rng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = {
    next,
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    chance: (p) => next() < p,
    shuffle: (arr) => {
      const a2 = arr.slice();
      for (let i = a2.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a2[i], a2[j]] = [a2[j], a2[i]];
      }
      return a2;
    },
  };
  return r;
}

export const neuerSeed = () => Math.floor(Math.random() * 2147483646) + 1;

/** Round to n decimals without floating noise. */
export const rund = (x, n = 2) => {
  const f = 10 ** n;
  return Math.round((x + Number.EPSILON * Math.sign(x)) * f) / f;
};

/** Number in German notation: 1.234,5 – decimals only where needed (max 2 unless dez is given). */
export function zahl(x, dez = null) {
  const v = rund(x, dez ?? 4);
  if (dez === null) dez = Number.isInteger(v) ? 0 : Number.isInteger(rund(v * 10, 6)) ? 1 : Number.isInteger(rund(v * 100, 6)) ? 2 : 3;
  const s = Math.abs(v).toFixed(dez);
  const [g, k] = s.split(".");
  const ganz = g.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (v < 0 ? "−" : "") + ganz + (k ? "," + k : "");
}

/** Euro amount: whole euros without cents, otherwise always two decimals. */
export const euro = (x) => (Number.isInteger(rund(x, 2)) ? zahl(x, 0) : zahl(x, 2)) + " €";
export const prozent = (x) => zahl(x) + " %";

export const ggt = (a, b) => (b ? ggt(b, a % b) : Math.abs(a));

/** Escapes text for safe HTML output. */
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/**
 * Multiple choice from the correct value plus typical-error candidates.
 * Candidates come first (in order), then neighbouring values fill up. Returns shuffled labels + index.
 */
export function mc(r, richtig, kandidaten, fmt = (v) => zahl(v), n = 4, { positiv = true } = {}) {
  const gesehen = new Set([fmt(richtig)]);
  const werte = [richtig];
  const nimm = (v) => {
    if (werte.length >= n || v == null || (typeof v === "number" && (!isFinite(v) || (positiv && v <= 0)))) return;
    const s = fmt(v);
    if (gesehen.has(s)) return;
    gesehen.add(s);
    werte.push(v);
  };
  kandidaten.forEach(nimm);
  if (typeof richtig === "number") {
    const basis = Math.abs(richtig) >= 20 ? Math.max(1, Math.round(Math.abs(richtig) * 0.1)) : Math.abs(richtig) >= 2 || Number.isInteger(richtig) ? 1 : 0.1;
    for (let i = 1; werte.length < n && i < 60; i++) nimm(rund(richtig + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * basis, 2));
  }
  const reihenfolge = r.shuffle(werte.map((_, i) => i));
  return { optionen: reihenfolge.map((i) => fmt(werte[i])), richtig: reihenfolge.indexOf(0) };
}

/** Same as mc() but for ready-made label strings (first = correct). */
export function mcText(r, richtig, falsche) {
  const alle = [richtig, ...falsche.filter((f, i) => f !== richtig && falsche.indexOf(f) === i)];
  const reihenfolge = r.shuffle(alle.map((_, i) => i));
  return { optionen: reihenfolge.map((i) => alle[i]), richtig: reihenfolge.indexOf(0) };
}
