// Farben der Gesetzbücher im Spiel „Paare finden“ (Buchrücken, Fundstelle, Regal) – frei wählbar.
// Gespeichert als Einstellung „gesetzFarben“: { hgb: "blau" | "#rrggbb", … }; fehlt ein Eintrag, gilt der Standard.
// Jede Farbe hat eine helle und eine dunkle Fassung; für eigene Farben wird die dunkle aufgehellt.

export const GESETZE = [
  { id: "hgb", name: "HGB", titel: "Handelsgesetzbuch", standard: "blau" },
  { id: "estg", name: "EStG", titel: "Einkommensteuergesetz", standard: "gruen" },
  { id: "ao", name: "AO", titel: "Abgabenordnung", standard: "braun" },
  { id: "ustg", name: "UStG", titel: "Umsatzsteuergesetz", standard: "orange" },
  { id: "gg", name: "GG", titel: "Grundgesetz", standard: "rot" },
  { id: "bgb", name: "BGB", titel: "Bürgerliches Gesetzbuch", standard: "violett" },
  { id: "gobt", name: "GOBT", titel: "Geschäftsordnung des Bundestages", standard: "petrol" },
  { id: "vo", name: "VO", titel: "Verordnungen (EStDV, LStDV, UStDV)", standard: "grau" },
];

export const PALETTE = [
  { id: "blau", name: "Blau", hell: "#2b4f8c", dunkel: "#8fb2f0" },
  { id: "himmel", name: "Himmelblau", hell: "#0369a1", dunkel: "#7dd3fc" },
  { id: "petrol", name: "Petrol", hell: "#0f766e", dunkel: "#5fd8cb" },
  { id: "gruen", name: "Grün", hell: "#1f7a4d", dunkel: "#6fd6a2" },
  { id: "oliv", name: "Oliv", hell: "#5f6b1a", dunkel: "#c5d36b" },
  { id: "gelb", name: "Senfgelb", hell: "#a16207", dunkel: "#fcd34d" },
  { id: "orange", name: "Orange", hell: "#b45309", dunkel: "#f7b955" },
  { id: "braun", name: "Braun", hell: "#8a5524", dunkel: "#e3a96d" },
  { id: "rot", name: "Rot", hell: "#a61e2b", dunkel: "#f4808b" },
  { id: "pink", name: "Pink", hell: "#be185d", dunkel: "#f9a8d4" },
  { id: "violett", name: "Violett", hell: "#6d3f9c", dunkel: "#c39af0" },
  { id: "grau", name: "Grau", hell: "#5b6b76", dunkel: "#b2c0ca" },
];
const PAL = Object.fromEntries(PALETTE.map((p) => [p.id, p]));
const HEX = /^#[0-9a-f]{6}$/i;

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (c) => "#" + c.map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, "0")).join("");
/** relative Leuchtdichte (WCAG) */
function leuchte(h) {
  const [r, g, b] = rgb(h).map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const mischen = (a, b, t) => hex(rgb(a).map((x, i) => x + (rgb(b)[i] - x) * t));
/** Schrift auf dem Buchrücken: weiß oder dunkel – was mehr Kontrast hat. */
export const schriftAuf = (h) => (leuchte(h) > 0.33 ? "#12151d" : "#ffffff");
/** Für die helle Ansicht: zu helle eigene Farben abdunkeln, damit die Fundstelle auf weißer Karte lesbar bleibt. */
const fuerHell = (h) => { let c = h; for (let i = 0; i < 8 && leuchte(c) > 0.22; i++) c = mischen(c, "#000000", 0.18); return c; };
/** Für die dunkle Ansicht: dunkle Farben aufhellen. */
const fuerDunkel = (h) => { let c = h; for (let i = 0; i < 8 && leuchte(c) < 0.32; i++) c = mischen(c, "#ffffff", 0.2); return c; };

/** Wert gültig? (Palette oder #rrggbb) */
export const farbeGueltig = (v) => !!PAL[v] || HEX.test(v || "");

/** Aufgelöste Farben eines Gesetzes: { hell, dunkel } */
export function farbeVon(id, wahl = {}) {
  const g = GESETZE.find((x) => x.id === id) || GESETZE[GESETZE.length - 1];
  const v = farbeGueltig(wahl[id]) ? wahl[id] : g.standard;
  if (PAL[v]) return { hell: PAL[v].hell, dunkel: PAL[v].dunkel };
  return { hell: fuerHell(v.toLowerCase()), dunkel: fuerDunkel(v.toLowerCase()) };
}

/** CSS mit den Variablen --gz-<id> und --gz-<id>-auf für hell und dunkel. */
export function farbenCss(wahl = {}) {
  const teil = (welche) => GESETZE.map((g) => { const c = farbeVon(g.id, wahl)[welche]; return `--gz-${g.id}: ${c}; --gz-${g.id}-auf: ${schriftAuf(c)};`; }).join(" ");
  const hell = teil("hell"), dunkel = teil("dunkel");
  return `:root { ${hell} }\n@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ${dunkel} } }\n:root[data-theme="dark"] { ${dunkel} }`;
}

/** Nur gültige Einträge übernehmen (z. B. nach dem Sync). */
export function farbenBereinigen(w) {
  const aus = {};
  if (w && typeof w === "object") for (const g of GESETZE) if (farbeGueltig(w[g.id])) aus[g.id] = w[g.id];
  return aus;
}

/** Einstellung als Text: „hgb=blau,estg=#1f7a4d“ (so synchronisiert wie die übrigen Einstellungen). */
export const farbenText = (w) => Object.entries(farbenBereinigen(w)).map(([k, v]) => `${k}=${v}`).join(",");
export const farbenAusText = (s) => farbenBereinigen(Object.fromEntries(String(s || "").split(",").map((x) => x.split("=")).filter((x) => x.length === 2)));
