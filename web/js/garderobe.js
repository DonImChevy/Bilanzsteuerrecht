// Garderobe für Taler: Katalog (Preise in Talern, ggf. Mindestlevel) und die Grafiken der Gegenstände.
// Währung: 1 Taler je 10 XP (alle XP zählen, auch rückwirkend). Ausgegeben wird nur, was gekauft wurde (stat.gekauft).
// Die Grafiken liegen im Koordinatensystem von Taler (viewBox 0 0 120 120): Münze Mitte (60|62), Radius 40,
// Augen bei (47|59) und (73|59), Mund um (60|74), Füße bei y = 105. Umrisse über die Klasse t-umriss (Taler-Tinte).

export const TALER_JE_XP = 0.1;

export const SLOTS = [
  { id: "kopf", name: "Kopf", icon: "hut" },
  { id: "hintergrund", name: "Hintergrund & Farben", icon: "bild" },
  { id: "augen", name: "Brille", icon: "suche" },
  { id: "hals", name: "Hals", icon: "herz" },
  { id: "ohr", name: "Ohrringe", icon: "ohrring" },
  { id: "hand", name: "Hand", icon: "akte" },
  { id: "metall", name: "Metall", icon: "muenze" },
  { id: "aura", name: "Aura", icon: "sterne" },
];

/** Farbwelten der App (kostenlos): Startfarbe hell/dunkel; Flächen und Text in style.css über data-farbwelt. */
export const FARBWELTEN = [
  { id: "standard", name: "Indigo", text: "Standard", hell: "#4f46e5", dunkel: "#8b8cf8" },
  { id: "rosa", name: "Rosa", text: "Helles Rosa", hell: "#e0609a", dunkel: "#f9a8d4" },
  { id: "salbei", name: "Salbei", text: "Gedecktes Grün", hell: "#3f8f6f", dunkel: "#7fd1a8" },
];

// Standard (kostenlos, immer im Besitz): Brille „Lernbrille“, Metall „Gold“, Hintergrund „Leuchten“
export const STANDARD = { kopf: "", augen: "brille", hals: "", ohr: "", hand: "", metall: "gold", aura: "", hintergrund: "leuchten" };

/** Katalog: [id, slot, name, preis, mindestlevel, kurzbeschreibung] */
const K = [
  // Kopf
  ["schirmmuetze", "kopf", "Basecap", 80, 0, "Sportlich in die Lernrunde"],
  ["partyhut", "kopf", "Partyhut", 100, 0, "Für jedes geschaffte Tagesziel"],
  ["bommelmuetze", "kopf", "Bommelmütze", 120, 0, "Warm durch die Klausurphase"],
  ["augenschirm", "kopf", "Buchhalter-Schirm", 150, 0, "Der grüne Augenschirm der alten Buchhalter"],
  ["doktorhut", "kopf", "Doktorhut", 200, 0, "Bereit für den Abschluss"],
  ["kopfhoerer", "kopf", "Kopfhörer", 250, 0, "Konzentriert lernen"],
  ["zylinder", "kopf", "Zylinder", 350, 0, "Für feine Bilanzen"],
  ["wikingerhelm", "kopf", "Wikingerhelm", 450, 0, "Erobert jede Klausur"],
  ["zauberhut", "kopf", "Zauberhut", 600, 0, "Bucht wie von Zauberhand"],
  ["lorbeerkranz", "kopf", "Lorbeerkranz", 900, 25, "Ab Level 25"],
  ["krone", "kopf", "Krone", 2000, 50, "Ab Level 50 – König der Konten"],
  // Brille
  ["brille", "augen", "Lernbrille", 0, 0, "Talers Klassiker"],
  ["ohne", "augen", "Ohne Brille", 0, 0, "Mal ganz ohne"],
  ["hornbrille", "augen", "Hornbrille", 80, 0, "Kantig und klug"],
  ["sonnenbrille", "augen", "Sonnenbrille", 120, 0, "Cool bleiben in der Klausur"],
  ["halbmond", "augen", "Lesebrille", 150, 0, "Für das Kleingedruckte im Gesetz"],
  ["herzbrille", "augen", "Herzbrille", 180, 0, "Verliebt ins Steuerrecht"],
  ["sternbrille", "augen", "Sternbrille", 220, 0, "Partybrille mit Glitzer"],
  ["pilotenbrille", "augen", "Pilotenbrille", 300, 0, "Im Steilflug durch den Stoff"],
  ["monokel", "augen", "Monokel", 400, 0, "Sehr vornehm, sehr gründlich"],
  // Hals
  ["fliege", "hals", "Fliege", 60, 0, "Immer gut angezogen"],
  ["krawatte", "hals", "Krawatte", 90, 0, "Bereit für den Außendienst"],
  ["halstuch", "hals", "Halstuch", 110, 0, "Lässig gebunden"],
  ["schal", "hals", "Schal", 140, 0, "Gestreift und gemütlich"],
  ["perlenkette", "hals", "Perlenkette", 300, 0, "Am Münzrand entlang – wie ein Perlkreis"],
  ["medaille", "hals", "Medaille", 400, 10, "Ab Level 10"],
  ["goldkette", "hals", "Goldkette", 700, 20, "Ab Level 20 – mit §-Anhänger"],
  // Ohrringe (hängen am Münzrand, auf Höhe der Brillenbügel)
  ["perlenohrringe", "ohr", "Perlenohrringe", 250, 0, "Passend zur Perlenkette"],
  // Hand
  ["faehnchen", "hand", "Fähnchen", 50, 0, "Feuert dich an"],
  ["kaffee", "hand", "Kaffeebecher", 70, 0, "Treibstoff fürs Lernen"],
  ["fueller", "hand", "Füller", 90, 0, "Für saubere Buchungssätze"],
  ["gesetzbuch", "hand", "Gesetzbuch", 120, 0, "Immer die Norm zur Hand"],
  ["ordner", "hand", "Aktenordner", 140, 0, "Belege ordentlich abgeheftet"],
  ["taschenrechner", "hand", "Taschenrechner", 160, 0, "Rechnet jede AfA"],
  ["lupe", "hand", "Lupe", 180, 0, "Prüft jeden Beleg"],
  ["stempel", "hand", "Stempel", 220, 0, "Geprüft und abgezeichnet"],
  ["pokal", "hand", "Pokal", 500, 15, "Ab Level 15"],
  // Metall
  ["gold", "metall", "Gold", 0, 0, "Talers Original"],
  ["silber", "metall", "Silber", 400, 0, "Glänzt kühl"],
  ["kupfer", "metall", "Kupfer", 400, 0, "Warm und ehrlich"],
  ["rosegold", "metall", "Roségold", 600, 0, "Sanft schimmernd"],
  ["jade", "metall", "Jade", 800, 0, "Grün wie ein ausgeglichenes Konto"],
  ["saphir", "metall", "Saphir", 1000, 0, "Tiefblau"],
  ["rubin", "metall", "Rubin", 1000, 0, "Feurig rot"],
  ["platin", "metall", "Platin", 1500, 30, "Ab Level 30"],
  ["holo", "metall", "Holo", 2500, 40, "Ab Level 40 – schillert in allen Farben"],
  ["pinkdiamond", "metall", "Pink Diamond", 1500, 0, "Die Krönung: geschliffener Stein statt Münzrand, funkelnd im Brillantschliff"],
  // Aura
  ["funkeln", "aura", "Funkeln", 300, 0, "Kleine Glitzersterne"],
  ["herzen", "aura", "Herzen", 400, 0, "Schwebende Herzen"],
  ["strahlen", "aura", "Strahlenkranz", 600, 0, "Taler strahlt"],
  ["sternenkranz", "aura", "Sternenkranz", 800, 0, "Ein Ring aus Sternen"],
  ["heiligenschein", "aura", "Heiligenschein", 1200, 20, "Ab Level 20 – fehlerfrei gebucht"],
  ["flammen", "aura", "Flammen", 1500, 35, "Ab Level 35 – Lernen in Flammen"],
  // Hintergrund der App
  // Hintergründe – Standard „Leuchten“, alle anderen kosten. Jeder hat eine helle und eine dunkle Fassung. Namen und Texte sachlich halten.
  ["leuchten", "hintergrund", "Leuchten", 0, 0, "Standard: Farbflächen in der Modulfarbe"],
  ["schlicht", "hintergrund", "Schlicht", 100, 0, "Einfarbig, ohne Muster"],
  ["nebel", "hintergrund", "Nebel", 150, 0, "Grau-blauer Verlauf"],
  ["karopapier", "hintergrund", "Rechenpapier", 150, 0, "Kariert"],
  ["kontenblatt", "hintergrund", "Kontenblatt", 200, 0, "Liniert, mit Mittellinie für Soll und Haben"],
  ["zuckerwatte", "hintergrund", "Pastell", 250, 0, "Verlauf in Rosa, Hellblau und Flieder"],
  ["pfirsich", "hintergrund", "Apricot", 250, 0, "Apricot-Verlauf mit Bögen"],
  ["lavendel", "hintergrund", "Lavendel", 300, 0, "Flieder mit kleinem Muster"],
  ["marmor", "hintergrund", "Marmor", 350, 0, "Marmoriert, dunkel mit goldenen Adern"],
  ["konfetti", "hintergrund", "Punkte", 350, 0, "Farbige Punkte"],
  ["regenbogen", "hintergrund", "Streifen", 400, 0, "Diagonale Streifen in Pastellfarben"],
  ["aurora", "hintergrund", "Polarlicht", 400, 0, "Grün-violetter Verlauf"],
  ["abendrot", "hintergrund", "Abendrot", 400, 0, "Verlauf in Orange, Rot und Violett"],
  ["kirschbluete", "hintergrund", "Kirschblüte", 450, 0, "Rosa mit Blütenblättern"],
  ["artdeco", "hintergrund", "Art déco", 500, 0, "Goldenes Fächermuster"],
  ["ozean", "hintergrund", "Ozean", 500, 0, "Blau mit Wellenlinien"],
  ["sternennacht", "hintergrund", "Sternenhimmel", 600, 0, "Dunkelblau mit Sternen"],
  ["lava", "hintergrund", "Glut", 600, 0, "Verlauf in Rot und Orange"],
  ["datenregen", "hintergrund", "Linien", 600, 0, "Grüne senkrechte Linien"],
  ["neon", "hintergrund", "Neon", 700, 0, "Leuchtgitter mit Horizont"],
  ["galaxie", "hintergrund", "Galaxie", 800, 0, "Farbiger Nebel mit Sternen"],
  ["schatzkammer", "hintergrund", "Goldmünzen", 900, 15, "Ab Level 15 – verstreute Goldmünzen"],
  ["eigenesbild", "hintergrund", "Eigenes Bild", 1000, 0, "Ein Foto aus deiner Galerie (nur auf diesem Gerät)"],
];
export const ARTIKEL = K.map(([id, slot, name, preis, level, text]) => ({ id, slot, name, preis, level, text }));
const ART = Object.fromEntries(ARTIKEL.map((a) => [a.id, a]));
export const artikel = (id) => ART[id];

/** Verdiente Taler (aus den Gesamt-XP), ausgegebene Taler und Guthaben. */
export function kasse(xpGesamt, gekauft = {}) {
  const verdient = Math.floor(xpGesamt * TALER_JE_XP);
  const ausgegeben = Object.keys(gekauft || {}).reduce((s, id) => s + (ART[id]?.preis || 0), 0);
  return { verdient, ausgegeben, guthaben: verdient - ausgegeben };
}
/** Besitzt man den Artikel? (Kostenlose immer.) */
export const besitzt = (id, gekauft = {}) => !!ART[id] && (ART[id].preis === 0 || !!gekauft?.[id]);
/** Kann man den Artikel jetzt kaufen? Grund, falls nicht: "besitz" | "level" | "geld". */
export function kaufbar(id, { gekauft, guthaben, level }) {
  const a = ART[id];
  if (!a) return { ok: false, grund: "unbekannt" };
  if (besitzt(id, gekauft)) return { ok: false, grund: "besitz" };
  if (level < a.level) return { ok: false, grund: "level" };
  if (guthaben < a.preis) return { ok: false, grund: "geld", fehlt: a.preis - guthaben };
  return { ok: true };
}
/** Getragenes Outfit (nur Gegenstände im Besitz; sonst Standard). */
export function outfitVon(outfit, gekauft) {
  const o = { ...STANDARD };
  for (const s of Object.keys(STANDARD)) {
    const id = outfit?.[s];
    if (id === "" && s !== "metall" && s !== "augen" && s !== "hintergrund") o[s] = "";
    else if (id && ART[id]?.slot === s && besitzt(id, gekauft)) o[s] = id;
  }
  return o;
}

// ---------------------------------------------------------------- Grafiken

const U = 'class="t-umriss"';
const sw = (w) => `stroke-width="${w}"`;

/** Münzmetalle: überschreiben die Taler-Farben. */
export const METALL = {
  gold: null,
  silber: ["#f7f9fb", "#c9d0d7", "#8f99a3", "#5d6772"],
  kupfer: ["#ffc8a2", "#dc8752", "#a8562c", "#713618"],
  rosegold: ["#ffe1dc", "#eba8a1", "#c2746f", "#8b4846"],
  jade: ["#c3f3dc", "#55c493", "#2d8d61", "#195c3e"],
  saphir: ["#d2deff", "#6a8ff2", "#3a5bbd", "#20367c"],
  rubin: ["#ffcad3", "#e85e78", "#b02f4a", "#71162b"],
  platin: ["#ffffff", "#e3eaee", "#aebdc4", "#71838c"],
  holo: ["#fff6b8", "#ff9fd6", "#83a9ff", "#5b42c0"],
  pinkdiamond: ["#fff0f8", "#ff8fc8", "#e0459a", "#8f1659"],
};

// ---------------------------------------------------------------- Pink Diamond: Brillantschliff auf der Münze
// Draufsicht eines Brillanten im Münzfeld (Mitte 60/62, Radius 34): Tafel (Achteck), 8 Sternfacetten,
// 8 Hauptfacetten (Drachen), 16 Rondistfacetten. Helle und dunkle Facetten wechseln sich ab – so wirkt der Stein plastisch.
const PD = (() => {
  const pt = (gr, r) => { const w = (gr - 90) * Math.PI / 180; return [60 + Math.cos(w) * r, 62 + Math.sin(w) * r]; };
  const poly = (ps) => ps.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const T = (k) => pt(k * 45 + 22.5, 14.5), S = (k) => pt(k * 45, 24.5), G = (j) => pt(j * 22.5, 35);
  const f = [], blitz = [];
  // Licht von oben links (−45°): je näher eine Facette dieser Richtung, desto heller; gegenüber liegt der Schatten.
  const licht = (gr) => Math.cos(((gr + 45) * Math.PI) / 180);
  const facette = (ps, gr, basis, i) => {
    const l = licht(gr) + basis;
    const fill = l > 0.35 ? "#fff" : l > -0.2 ? "#ffd0e8" : "var(--taler-dunkel)";
    const op = l > 0.35 ? 0.3 + l * 0.35 : l > -0.2 ? 0.28 : 0.22 - l * 0.22;
    const poly1 = `<polygon points="${poly(ps)}" fill="${fill}" fill-opacity="${op.toFixed(2)}"/>`;
    f.push(poly1);
    // jede dritte Facette blitzt nacheinander auf – wie ein Stein, der im Licht gedreht wird
    if (i % 3 === 0) blitz.push(`<polygon class="t-facette" style="--i:${(i / 3) % 12}" points="${poly(ps)}" fill="#fff"/>`);
  };
  let i = 0;
  for (let k = 0; k < 8; k++) {
    facette([S(k), T(k), S(k + 1), G(2 * k + 1)], k * 45 + 22.5, 0, i++);          // Hauptfacette (Drachen)
    facette([T(k), T(k + 1), S(k + 1)], k * 45 + 45, 0.15, i++);                       // Sternfacette
    facette([S(k), G(2 * k), G(2 * k + 1)], k * 45 + 11, -0.1, i++);                    // obere Rondistfacetten
    facette([S(k), G(2 * k - 1), G(2 * k)], k * 45 - 11, 0.05, i++);
  }
  // Pfeile im Kern (Spiegelung der Unterteil-Facetten durch die Tafel) und Farbfeuer (Dispersion)
  const pfeile = Array.from({ length: 8 }, (_, k) => `<polygon points="${poly([[60, 62], pt(k * 45 - 7, 13.5), pt(k * 45, 9.5), pt(k * 45 + 7, 13.5)])}" fill="var(--taler-dunkel)" fill-opacity="0.32"/>`).join("");
  const feuer = [["#7ff3ff", 3, 0.55], ["#fff27a", 6, 0.5], ["#c9a2ff", 9, 0.55], ["#8bffc6", 13, 0.4], ["#ffb38a", 0, 0.45]].map(([farbe, k, op], n) => {
    const a = pt(k * 22.5 + 6, 27), b = pt(k * 22.5 + 14, 31.5), c = pt(k * 22.5 + 9, 23);
    return `<polygon class="t-feuer" style="--i:${n}" points="${poly([a, b, c])}" fill="${farbe}" fill-opacity="${op}"/>`;
  }).join("");
  const tafel = poly(Array.from({ length: 8 }, (_, k) => T(k)));
  const kanten = Array.from({ length: 8 }, (_, k) => `M${poly([S(k), T(k), S(k + 1), G(2 * k + 1), S(k)]).replace(/ /g, " L")} M${poly([S(k), G(2 * k)]).replace(" ", " L")}`).join(" ");
  const stern = (x, y, r, i, aussen = false) => `<path class="t-edelfunke${aussen ? " aussen" : ""}" style="--i:${i}" d="M${x} ${y - r} Q${x + r * 0.14} ${y - r * 0.14} ${x + r} ${y} Q${x + r * 0.14} ${y + r * 0.14} ${x} ${y + r} Q${x - r * 0.14} ${y + r * 0.14} ${x - r} ${y} Q${x - r * 0.14} ${y - r * 0.14} ${x} ${y - r}Z" fill="#fff"/>`;
  const funken = [stern(...T(7), 4.2, 0), stern(...S(3), 3.4, 1), stern(...G(11), 3.8, 2), stern(...T(2), 2.8, 3), stern(...G(5), 3, 4)].join("");
  const aussen = [stern(16, 30, 5.2, 0.5, true), stern(104, 22, 4.4, 1.7, true), stern(108, 92, 3.6, 2.9, true), stern(13, 88, 3.2, 3.6, true)].join("");
  // Umriss: kein glatter Kreis, sondern ein unregelmäßig geschliffener Rand – 26 Ecken mit leicht
  // wechselndem Radius und Winkel (fest vorgegeben, damit der Stein immer gleich aussieht).
  const ZACKEN = [0.6, -0.9, 1.1, -0.3, 0.8, -1.2, 0.2, 1.0, -0.7, 0.5, -1.0, 0.9, -0.2, 1.2, -0.8, 0.3, -1.1, 0.7, -0.4, 1.0, -0.6, 0.4, -1.3, 0.9, -0.1, 0.6];
  const N = ZACKEN.length, ecke = (i) => { const j = ((i % N) + N) % N; return { gr: j * (360 / N) + ZACKEN[(j + 7) % N] * 2.6, r: 40.6 + ZACKEN[j] * 1.15 }; };
  const V = (i) => pt(ecke(i).gr, ecke(i).r);
  const mitte = (i) => (ecke(i).gr + (ecke(i + 1).gr < ecke(i).gr ? ecke(i + 1).gr + 360 : ecke(i + 1).gr)) / 2;
  const C = (i) => pt(mitte(i), 33.6);
  const umriss = Array.from({ length: N }, (_, i) => V(i));
  // Kranz: je Kante ein Dreieck nach innen und je Ecke ein Dreieck zwischen zwei Kantenmitten – Helligkeit nach Lichteinfall
  const kranz = [];
  for (let i = 0; i < N; i++) {
    const a = mitte(i), b = ecke(i).gr;
    const l1 = licht(a), l2 = licht(b) - 0.25;
    const ton = (l) => (l > 0.45 ? ["#fff", 0.55 + l * 0.25] : l > 0 ? ["#ffd6ec", 0.5] : l > -0.5 ? ["var(--taler-tief)", 0.55] : ["var(--taler-dunkel)", 0.7]);
    const [f1, o1] = ton(l1), [f2, o2] = ton(l2);
    kranz.push(`<polygon points="${poly([V(i), V(i + 1), C(i)])}" fill="${f1}" fill-opacity="${o1.toFixed(2)}"/>`);
    kranz.push(`<polygon points="${poly([V(i), C(i - 1), C(i)])}" fill="${f2}" fill-opacity="${o2.toFixed(2)}"/>`);
  }
  const kranzKanten = Array.from({ length: N }, (_, i) => `M${poly([C(i - 1), V(i), C(i)]).replace(/ /g, " L")}`).join(" ");
  // Glanzkanten oben links, wo das Licht die Schliffkanten trifft
  const glanzKanten = Array.from({ length: N }, (_, i) => i).filter((i) => licht(mitte(i)) > 0.6).map((i) => `M${poly([V(i), V(i + 1)]).replace(" ", " L")}`).join(" ");
  const koerper = (id) => `<polygon points="${poly(umriss)}" fill="var(--taler-tief)" stroke="#7a124b" stroke-width="1.5" stroke-linejoin="round"/>
    ${kranz.join("")}
    <path d="${kranzKanten}" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="0.5" stroke-linejoin="round"/>
    <path d="${glanzKanten}" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-opacity="0.9"/>
    <circle cx="60" cy="62" r="34" fill="url(#${id})"/>`;
  return { f: f.join(""), blitz: blitz.join(""), pfeile, feuer, tafel, kanten, funken, aussen, koerper };
})();

/** Zusatzschichten eines Edelstein-Metalls (id = eindeutige Kennung der Grafik für Verläufe und Masken). */
const EDEL = {
  pinkdiamond: (id) => `<defs>
      <linearGradient id="${id}ir" x1="0" y1="0" x2="1" y2="0.35">
        <stop offset="0.25" stop-color="#ff5fae" stop-opacity="0"/><stop offset="0.38" stop-color="#ffc2e4" stop-opacity="0.3"/>
        <stop offset="0.45" stop-color="#d8c4ff" stop-opacity="0.45"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0.6"/>
        <stop offset="0.55" stop-color="#ffd4b8" stop-opacity="0.45"/><stop offset="0.62" stop-color="#9ff3ff" stop-opacity="0.3"/><stop offset="0.75" stop-color="#ff5fae" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="${id}tiefe" cx="0.5" cy="0.55" r="0.55"><stop offset="0" stop-color="var(--taler-dunkel)" stop-opacity="0.35"/><stop offset="0.55" stop-color="var(--taler-tief)" stop-opacity="0.12"/><stop offset="1" stop-color="#fff" stop-opacity="0.15"/></radialGradient>
      <radialGradient id="${id}tf" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stop-color="#fff" stop-opacity="0.75"/><stop offset="0.6" stop-color="#ffd1e8" stop-opacity="0.3"/><stop offset="1" stop-color="var(--taler-gold)" stop-opacity="0.1"/></radialGradient>
      <clipPath id="${id}e"><circle cx="60" cy="62" r="34"/></clipPath>
    </defs>
    <g clip-path="url(#${id}e)">
      <circle cx="60" cy="62" r="34" fill="url(#${id}tiefe)"/>
      ${PD.f}
      <polygon points="${PD.tafel}" fill="url(#${id}tf)" stroke="#fff" stroke-opacity="0.8" stroke-width="0.7"/>
      ${PD.pfeile}
      ${PD.feuer}
      <path d="${PD.kanten}" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="0.6" stroke-linejoin="round"/>
      ${PD.blitz}
      <g class="t-edelschimmer"><rect x="-10" y="20" width="140" height="84" fill="url(#${id}ir)" style="mix-blend-mode:screen"/></g>
      <path d="M33 52 Q38 34 56 29 Q44 38 40 54 Z" fill="#fff" opacity="0.55"/>
      <ellipse cx="78" cy="84" rx="7" ry="2.2" transform="rotate(-38 78 84)" fill="#fff" opacity="0.28"/>
      ${PD.funken}
    </g>`,
};
const EDEL_AUSSEN = { pinkdiamond: PD.aussen };
/** Eigener Münzkörper statt des runden Rands (Umriss, Randfacetten, Münzfeld). */
const EDEL_KOERPER = { pinkdiamond: PD.koerper };

/** Kopfbedeckungen (über dem Gesicht gezeichnet). */
const KOPF = {
  schirmmuetze: `<path d="M37 30 Q36 9 60 8 Q84 9 83 30Z" fill="#e11d48" ${U} ${sw(2.4)}/>
    <path d="M60 8 V29 M47 11 Q45 20 46 29 M73 11 Q75 20 74 29" stroke="#9f1239" stroke-width="1.4" fill="none"/>
    <path d="M41 14 Q48 10 56 10" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.45"/>
    <circle cx="60" cy="8.5" r="2.6" fill="#be123c" ${U} ${sw(1.6)}/>
    <path d="M34 29 Q60 24 86 29 Q90 33 84 35 Q60 31 36 35 Q30 33 34 29Z" fill="#be123c" ${U} ${sw(2.4)}/>`,
  partyhut: `<path d="M45 29 L60 -6 L75 29Z" fill="#fbbf24" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <clipPath id="ph"><path d="M45 29 L60 -6 L75 29Z"/></clipPath>
    <g clip-path="url(#ph)" stroke-width="5"><path d="M40 22 L80 10 M40 8 L80 -4 M40 36 L80 24" stroke="#ec4899"/></g>
    <circle cx="51" cy="18" r="1.6" fill="#fff"/><circle cx="66" cy="9" r="1.4" fill="#fff"/><circle cx="63" cy="22" r="1.5" fill="#22d3ee"/>
    <circle cx="60" cy="-7" r="5" fill="#22d3ee" ${U} ${sw(2.2)}/><path d="M57 -9 Q59 -11 61 -10.5" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M44 29 Q60 33 76 29" stroke="#ec4899" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
  bommelmuetze: `<path d="M36 30 Q35 6 60 5 Q85 6 84 30Z" fill="#2563eb" ${U} ${sw(2.4)}/>
    <path d="M44 9 Q47 18 46 28 M60 5 V28 M76 9 Q73 18 74 28" stroke="#1e40af" stroke-width="1.5" fill="none"/>
    <path d="M42 13 Q48 8 55 7.5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
    <rect x="33" y="24" width="54" height="10" rx="5" fill="#1d4ed8" ${U} ${sw(2.4)}/>
    <path d="M39 25.5 v7 M45 25.5 v7 M51 25.5 v7 M57 25.5 v7 M63 25.5 v7 M69 25.5 v7 M75 25.5 v7 M81 25.5 v7" stroke="#1e3a8a" stroke-width="1.3"/>
    <circle cx="60" cy="2" r="7" fill="#f8fafc" ${U} ${sw(2.2)}/><path d="M56 -1 l2 2 M62 -2 l1 2.4 M58 4 l2 1 M64 3 l-1 2" stroke="#cbd5e1" stroke-width="1.4" stroke-linecap="round"/>`,
  augenschirm: `<path d="M33 31 Q60 18 87 31" stroke="#1f2937" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M32 31 Q60 17 88 31 L83 40 Q60 30 37 40Z" fill="#16a34a" fill-opacity="0.78" ${U} ${sw(2.3)} stroke-linejoin="round"/>
    <path d="M38 33 Q60 24 82 33" stroke="#bbf7d0" stroke-width="1.6" fill="none" opacity="0.7"/>
    <path d="M37 40 Q60 30 83 40" stroke="#14532d" stroke-width="1.4" fill="none"/>`,
  doktorhut: `<path d="M44 21 L44 30 Q60 35 76 30 L76 21Z" fill="#26283a" ${U} ${sw(2.4)}/>
    <path d="M28 18 L60 6 L92 18 L60 30Z" fill="#33364c" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M36 18 L60 9 L70 13" stroke="#5b5f7a" stroke-width="1.6" fill="none"/>
    <path d="M60 18 Q76 16 86 19 L87 31" stroke="#f6c945" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="18" r="2.4" fill="#f6c945" ${U} ${sw(1.2)}/>
    <path d="M84.5 30 h5 l1 9 h-7Z" fill="#f6c945" ${U} ${sw(1.4)}/><path d="M85.5 33 v5.5 M87 33 v5.5 M88.5 33 v5.5" stroke="#b7791f" stroke-width="0.8"/>`,
  kopfhoerer: `<path d="M24 60 Q21 13 60 12 Q99 13 96 60" stroke="#1f2937" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    <path d="M24 60 Q21 13 60 12 Q99 13 96 60" stroke="#475569" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <rect x="13" y="49" width="13" height="22" rx="6.5" fill="#8b5cf6" ${U} ${sw(2.4)}/><rect x="94" y="49" width="13" height="22" rx="6.5" fill="#8b5cf6" ${U} ${sw(2.4)}/>
    <rect x="16" y="53" width="3" height="10" rx="1.5" fill="#c4b5fd"/><rect x="101" y="53" width="3" height="10" rx="1.5" fill="#c4b5fd"/>`,
  zylinder: `<path d="M44 26 L46 -4 Q60 -8 74 -4 L76 26Z" fill="#1f2030" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M45 17 Q60 20 75 17 L75.6 24 Q60 27 44.4 24Z" fill="#b91c1c"/>
    <path d="M50 -2 L49 15" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.18"/>
    <ellipse cx="60" cy="-4.5" rx="14" ry="3" fill="#2d2f44" ${U} ${sw(1.8)}/>
    <path d="M30 27 Q60 21 90 27 Q93 31 88 32 Q60 27 32 32 Q27 31 30 27Z" fill="#1f2030" ${U} ${sw(2.4)}/>`,
  wikingerhelm: `<path d="M38 31 Q38 9 60 8 Q82 9 82 31Z" fill="#9ca3af" ${U} ${sw(2.4)}/>
    <path d="M60 8 V31" stroke="#6b7280" stroke-width="4"/><path d="M45 13 Q50 10 55 10" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
    <rect x="35" y="26" width="50" height="7" rx="3" fill="#a16207" ${U} ${sw(2.2)}/>
    <circle cx="44" cy="29.5" r="1.3" fill="#fde68a"/><circle cx="60" cy="29.5" r="1.3" fill="#fde68a"/><circle cx="76" cy="29.5" r="1.3" fill="#fde68a"/>
    <path d="M39 22 Q26 20 22 4 Q31 12 41 15Z" fill="#fef3c7" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M81 22 Q94 20 98 4 Q89 12 79 15Z" fill="#fef3c7" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M28 12 l3 3 M25 7 l3 2 M92 12 l-3 3 M95 7 l-3 2" stroke="#d6b97a" stroke-width="1.3" stroke-linecap="round"/>`,
  zauberhut: `<path d="M38 28 Q52 20 56 4 Q60 -10 74 -12 Q66 -4 68 8 Q72 20 82 28Z" fill="#6d28d9" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M62 -2 l1.3 2.6 2.9.4 -2.1 2 .5 2.9 -2.6-1.4 -2.6 1.4 .5-2.9 -2.1-2 2.9-.4z" fill="#fde047"/>
    <path d="M52 16 l.9 1.8 2 .3 -1.4 1.4 .3 2 -1.8-1 -1.8 1 .3-2 -1.4-1.4 2-.3z" fill="#fde047"/>
    <circle cx="66" cy="18" r="1.4" fill="#e9d5ff"/><circle cx="58" cy="8" r="1.1" fill="#e9d5ff"/>
    <path d="M28 28 Q60 21 92 28 Q95 33 89 34 Q60 28 31 34 Q25 33 28 28Z" fill="#5b21b6" ${U} ${sw(2.4)}/>
    <path d="M40 27 Q60 23 80 27" stroke="#fde047" stroke-width="2.6" fill="none"/>`,
  lorbeerkranz: (() => {
    const blatt = (x, y, w) => `<ellipse cx="${x}" cy="${y}" rx="5.4" ry="2.5" transform="rotate(${w} ${x} ${y})" fill="#65a30d" ${U} ${sw(1.4)}/>`;
    const links = [[24, 50, -70], [26, 42, -55], [30, 35, -42], [36, 29, -28], [43, 24, -16], [51, 21, -6]], rechts = links.map(([x, y, w]) => [120 - x, y, -w]);
    return [...links, ...rechts].map(([x, y, w]) => blatt(x, y, w)).join("") + `<circle cx="60" cy="20" r="2.4" fill="#f59e0b" ${U} ${sw(1.2)}/>`;
  })(),
  krone: `<path d="M37 31 L34 9 L46 19 L60 3 L74 19 L86 9 L83 31Z" fill="#facc15" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M40 27 L39 15 M60 9 L60 18 M80 27 L81 15" stroke="#fef08a" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
    <rect x="36" y="25" width="48" height="8" rx="2.5" fill="#eab308" ${U} ${sw(2.2)}/>
    <circle cx="48" cy="29" r="2.3" fill="#ef4444"/><circle cx="60" cy="29" r="2.6" fill="#3b82f6"/><circle cx="72" cy="29" r="2.3" fill="#22c55e"/>
    <circle cx="34" cy="8.5" r="2.4" fill="#fde047" ${U} ${sw(1.4)}/><circle cx="60" cy="2.5" r="2.6" fill="#fde047" ${U} ${sw(1.4)}/><circle cx="86" cy="8.5" r="2.4" fill="#fde047" ${U} ${sw(1.4)}/>`,
};

/** Brillen (ersetzen die Lernbrille). Leer = ohne Brille. */
const AUGEN = {
  brille: null, // Taler zeichnet seine Standardbrille selbst
  ohne: "",
  hornbrille: `<rect x="35" y="50" width="23" height="17" rx="4" fill="#fff" fill-opacity="0.12" stroke="#1f2937" stroke-width="3.6"/>
    <rect x="62" y="50" width="23" height="17" rx="4" fill="#fff" fill-opacity="0.12" stroke="#1f2937" stroke-width="3.6"/>
    <path d="M58 56 h4 M35 54 L28 51 M85 54 L92 51" stroke="#1f2937" stroke-width="3.2" stroke-linecap="round"/>`,
  sonnenbrille: `<path d="M34 52 Q34 49 37 49 H57 Q59 49 58.6 52 L57 61 Q56 67 49 67 H43 Q36 67 35 61Z" fill="#111827" ${U} ${sw(2.2)}/>
    <path d="M86 52 Q86 49 83 49 H63 Q61 49 61.4 52 L63 61 Q64 67 71 67 H77 Q84 67 85 61Z" fill="#111827" ${U} ${sw(2.2)}/>
    <path d="M39 53 L46 53 M66 53 L73 53" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <path d="M58 52 Q60 50.5 62 52 M34 52 L28 50 M86 52 L92 50" class="t-umriss" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  halbmond: `<path d="M36 60 H58 Q57 70 47 70 Q37 70 36 60Z" fill="#fff" fill-opacity="0.18" stroke="#92400e" stroke-width="2.6"/>
    <path d="M62 60 H84 Q83 70 73 70 Q63 70 62 60Z" fill="#fff" fill-opacity="0.18" stroke="#92400e" stroke-width="2.6"/>
    <path d="M58 61 Q60 59 62 61 M36 60 L29 55 M84 60 L91 55" stroke="#92400e" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  herzbrille: `<path d="M47 68 L36.5 57.5 Q33 53 36 50 Q40 46.5 47 51.5 Q54 46.5 58 50 Q61 53 57.5 57.5Z" fill="#f43f5e" fill-opacity="0.85" ${U} ${sw(2.3)} stroke-linejoin="round"/>
    <path d="M73 68 L62.5 57.5 Q59 53 62 50 Q66 46.5 73 51.5 Q80 46.5 84 50 Q87 53 83.5 57.5Z" fill="#f43f5e" fill-opacity="0.85" ${U} ${sw(2.3)} stroke-linejoin="round"/>
    <path d="M38.5 52.5 Q40 50.5 42.5 51 M64.5 52.5 Q66 50.5 68.5 51" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.8"/>
    <path d="M58 54 Q60 52.5 62 54 M35 54 L28 51.5 M85 54 L92 51.5" class="t-umriss" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  sternbrille: (() => {
    const stern = (cx, cy) => { const p = []; for (let i = 0; i < 10; i++) { const r = i % 2 ? 6 : 13, w = (Math.PI / 5) * i - Math.PI / 2; p.push(`${(cx + r * Math.cos(w)).toFixed(1)} ${(cy + r * Math.sin(w)).toFixed(1)}`); } return `M${p.join(" L")}Z`; };
    return `<path d="${stern(47, 59)}" fill="#facc15" fill-opacity="0.9" ${U} ${sw(2.2)} stroke-linejoin="round"/>
      <path d="${stern(73, 59)}" fill="#a855f7" fill-opacity="0.9" ${U} ${sw(2.2)} stroke-linejoin="round"/>
      <circle cx="47" cy="59" r="4.4" fill="#fff" fill-opacity="0.35"/><circle cx="73" cy="59" r="4.4" fill="#fff" fill-opacity="0.35"/>
      <path d="M58.5 56 Q60 54.5 61.5 56 M35 54 L28 51 M85 54 L92 51" class="t-umriss" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  })(),
  pilotenbrille: `<path d="M35 51 H57 Q59 51 58 55 Q56 67 47 67 Q37 67 35.5 57 Q35 53 35 51Z" fill="url(#pl)" stroke="#ca8a04" stroke-width="2.2"/>
    <path d="M85 51 H63 Q61 51 62 55 Q64 67 73 67 Q83 67 84.5 57 Q85 53 85 51Z" fill="url(#pl)" stroke="#ca8a04" stroke-width="2.2"/>
    <linearGradient id="pl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e7490" stop-opacity="0.85"/><stop offset="1" stop-color="#a5f3fc" stop-opacity="0.75"/></linearGradient>
    <path d="M57 51.5 Q60 48.5 63 51.5 M35 51 L28 49 M85 51 L92 49" stroke="#ca8a04" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M39 54 L44 54" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>`,
  monokel: `<circle cx="73" cy="58.5" r="11" fill="#fff" fill-opacity="0.2" stroke="#ca8a04" stroke-width="2.8"/>
    <circle cx="73" cy="58.5" r="8.6" fill="none" stroke="#fde68a" stroke-width="1" opacity="0.8"/>
    <path d="M83 64 Q92 78 86 92 Q82 100 88 108" stroke="#ca8a04" stroke-width="1.4" fill="none" stroke-dasharray="2 1.6"/>
    <path d="M67 52 Q70 50 73 50.5" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.8"/>`,
};

/** Halsschmuck (unter dem Mund, am unteren Rand der Münze). */
const HALS = {
  fliege: `<path d="M60 98 L46 91 Q43 98 46 105Z" fill="#dc2626" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M60 98 L74 91 Q77 98 74 105Z" fill="#dc2626" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M49 95 Q51 98 49 101 M71 95 Q69 98 71 101" stroke="#991b1b" stroke-width="1.4" fill="none"/>
    <rect x="56.5" y="94.5" width="7" height="7" rx="2.4" fill="#b91c1c" ${U} ${sw(2)}/>`,
  krawatte: `<path d="M56 95 H64 L62.5 101 H57.5Z" fill="#1d4ed8" ${U} ${sw(2)} stroke-linejoin="round"/>
    <path d="M57.5 101 L54 117 L60 123 L66 117 L62.5 101Z" fill="#2563eb" ${U} ${sw(2)} stroke-linejoin="round"/>
    <path d="M56 106 L64 110 M55 112 L65 116" stroke="#93c5fd" stroke-width="1.6"/>`,
  halstuch: `<path d="M38 90 Q60 100 82 90 L74 99 Q66 104 60 112 Q54 104 46 99Z" fill="#f97316" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <circle cx="52" cy="97" r="1.3" fill="#fff"/><circle cx="60" cy="101" r="1.3" fill="#fff"/><circle cx="68" cy="97" r="1.3" fill="#fff"/><circle cx="60" cy="107" r="1.1" fill="#fff"/>`,
  schal: `<path d="M28 84 Q60 102 92 84 L93 93 Q60 112 27 93Z" fill="#dc2626" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M38 90 Q38 95 37 99 M50 94 Q50 99 50 104 M62 95 Q62 100 62 105 M74 93 Q74 98 75 102 M86 88 Q86 92 87 96" stroke="#fff" stroke-width="3.2" fill="none"/>
    <path d="M76 95 L84 118 L72 120 L68 99Z" fill="#dc2626" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M73 101 L79 100 M75 108 L81 107 M77 114 L82 113" stroke="#fff" stroke-width="3"/>
    <path d="M72 120 l-1 3 M75 120 l0 3 M78 119.5 l1 3 M81 119 l1.5 2.6" stroke="#dc2626" stroke-width="1.6" stroke-linecap="round"/>`,
  // Taler hat keinen Hals: Die Perlen liegen am unteren Münzrand entlang – wie der Perlkreis echter Sammlermünzen
  perlenkette: (() => {
    let s = ""; for (let i = 0; i <= 16; i++) { const w = ((28 + (124 * i) / 16) * Math.PI) / 180, x = 60 + 41 * Math.cos(w), y = 62 + 41 * Math.sin(w); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.9" fill="#f8fafc" ${U} ${sw(1.1)}/><circle cx="${(x - 0.9).toFixed(1)}" cy="${(y - 0.9).toFixed(1)}" r="0.95" fill="#fff"/>`; }
    return s;
  })(),
  medaille: `<path d="M50 84 L57 101 H63 L70 84 H64 L60 96 L56 84Z" fill="#2563eb" ${U} ${sw(1.8)} stroke-linejoin="round"/>
    <path d="M56 84 L60 96 L64 84" fill="#dc2626"/>
    <circle cx="60" cy="106" r="8" fill="#f6b93b" ${U} ${sw(2.2)}/><circle cx="60" cy="106" r="5.4" fill="none" stroke="#fde68a" stroke-width="1.2"/>
    <path d="M60 101.6 l1.3 2.7 3 .4 -2.2 2.1 .5 3 -2.6-1.4 -2.6 1.4 .5-3 -2.2-2.1 3-.4z" fill="#b45309"/>`,
  goldkette: (() => {
    let s = ""; for (let i = 0; i <= 16; i++) { const t = i / 16, x = 30 + 60 * t, y = 82 + 17 * Math.sin(Math.PI * t); s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.3" ry="1.5" transform="rotate(${(i % 2 ? 50 : -40)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="none" stroke="#eab308" stroke-width="1.6"/>`; }
    return s + `<circle cx="60" cy="105" r="7.6" fill="#facc15" ${U} ${sw(2.2)}/><text x="60" y="109" text-anchor="middle" font-size="10" font-weight="900" font-family="Georgia, serif" fill="#854d0e">§</text>`;
  })(),
};

/** Ohrringe: hängen links und rechts am Münzrand (bei x ≈ 20,5 bzw. 99,5), wo die Brillenbügel enden. */
const perle = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f8fafc" ${U} ${sw(1.1)}/><circle cx="${(x - r * 0.32).toFixed(1)}" cy="${(y - r * 0.32).toFixed(1)}" r="${(r * 0.32).toFixed(1)}" fill="#fff"/>`;
const OHR = {
  // Dieselben Perlen wie bei der Perlenkette (Farbe, Umriss, Glanzpunkt): kleine Perle als Stecker, darunter eine größere am Goldhaken
  perlenohrringe: [[20.6, -1], [99.4, 1]].map(([x, s]) => `<path d="M${x} 62.5 q${s * -1.6} 2.6 0 5.2" fill="none" stroke="#d4a017" stroke-width="1.3" stroke-linecap="round"/>
    ${perle(x, 61, 2.2)}${perle(x, 71.2, 3.6)}`).join(""),
};

/** Gegenstände in Talers linker Hand (Mittelpunkt = Hand). */
const HAND = {
  faehnchen: (x, y) => `<path d="M${x} ${y + 6} V${y - 26}" stroke="#78350f" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M${x} ${y - 26} L${x - 17} ${y - 20} L${x} ${y - 13}Z" fill="#4f46e5" ${U} ${sw(1.8)} stroke-linejoin="round"/>
    <path d="M${x - 5} ${y - 20} l1 2 2 .3 -1.5 1.4 .4 2 -1.9-1 -1.9 1 .4-2 -1.5-1.4 2-.3z" fill="#fde047"/>`,
  kaffee: (x, y) => `<path d="M${x - 9} ${y - 7} H${x + 4} L${x + 2.6} ${y + 9} Q${x + 2} ${y + 12} ${x - 1} ${y + 12} H${x - 5} Q${x - 8} ${y + 12} ${x - 8.4} ${y + 9}Z" fill="#f8fafc" ${U} ${sw(2)} stroke-linejoin="round"/>
    <path d="M${x - 8.6} ${y - 1} H${x + 3.4} L${x + 3} ${y + 4} H${x - 8.2}Z" fill="#a16207"/>
    <path d="M${x - 6} ${y - 11} q-2 -3 0 -6 M${x - 1} ${y - 11} q-2 -3 0 -6" stroke="#94a3b8" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  fueller: (x, y) => `<g transform="rotate(-35 ${x} ${y})"><rect x="${x - 3}" y="${y - 20}" width="6" height="24" rx="2.4" fill="#1e3a8a" ${U} ${sw(1.8)}/>
    <rect x="${x - 3}" y="${y - 20}" width="6" height="6" rx="2" fill="#facc15"/><path d="M${x - 3} ${y + 4} L${x} ${y + 12} L${x + 3} ${y + 4}Z" fill="#facc15" ${U} ${sw(1.6)} stroke-linejoin="round"/>
    <path d="M${x} ${y + 6} V${y + 10}" stroke="#713f12" stroke-width="0.9"/></g>`,
  gesetzbuch: (x, y) => `<rect x="${x - 17}" y="${y - 11}" width="16" height="21" rx="2" fill="#b91c1c" ${U} ${sw(2)}/>
    <rect x="${x - 3.5}" y="${y - 10}" width="3" height="19" fill="#fef3c7"/>
    <text x="${x - 9}" y="${y + 3}" text-anchor="middle" font-size="11" font-weight="900" font-family="Georgia, serif" fill="#fde68a">§</text>
    <path d="M${x - 15} ${y - 7} H${x - 5}" stroke="#fca5a5" stroke-width="1.2"/>`,
  ordner: (x, y) => `<rect x="${x - 16}" y="${y - 14}" width="13" height="26" rx="1.6" fill="#0369a1" ${U} ${sw(2)}/>
    <rect x="${x - 14}" y="${y - 10}" width="9" height="9" rx="1" fill="#f8fafc"/><path d="M${x - 12.5} ${y - 7} h6 M${x - 12.5} ${y - 4.5} h4.5" stroke="#64748b" stroke-width="1"/>
    <circle cx="${x - 9.5}" cy="${y + 5}" r="2.4" fill="#f8fafc" ${U} ${sw(1.2)}/>`,
  taschenrechner: (x, y) => `<rect x="${x - 17}" y="${y - 12}" width="15" height="22" rx="2.6" fill="#334155" ${U} ${sw(2)}/>
    <rect x="${x - 15}" y="${y - 10}" width="11" height="5.5" rx="1" fill="#bef264"/>
    ${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<rect x="${x - 15 + c * 4}" y="${y - 2.5 + r * 4}" width="3" height="3" rx="0.8" fill="${r === 2 && c === 2 ? "#f97316" : "#cbd5e1"}"/>`)).join("")}`,
  lupe: (x, y) => `<path d="M${x - 1} ${y + 2} L${x + 5} ${y + 10}" stroke="#78350f" stroke-width="4.4" stroke-linecap="round"/>
    <circle cx="${x - 7}" cy="${y - 7}" r="9" fill="#bae6fd" fill-opacity="0.45" stroke="#475569" stroke-width="3"/>
    <path d="M${x - 12} ${y - 10} Q${x - 10} ${y - 13} ${x - 7} ${y - 13}" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
  stempel: (x, y) => `<ellipse cx="${x - 7}" cy="${y - 15}" rx="5" ry="4.2" fill="#b45309" ${U} ${sw(1.8)}/>
    <rect x="${x - 9}" y="${y - 12}" width="4" height="9" fill="#92400e" ${U} ${sw(1.4)}/>
    <rect x="${x - 16}" y="${y - 4}" width="18" height="6" rx="1.6" fill="#78350f" ${U} ${sw(1.8)}/>
    <rect x="${x - 16}" y="${y + 2}" width="18" height="3" rx="1" fill="#dc2626"/>`,
  pokal: (x, y) => `<path d="M${x - 16} ${y - 14} H${x + 2} V${y - 9} Q${x + 2} ${y} ${x - 7} ${y} Q${x - 16} ${y} ${x - 16} ${y - 9}Z" fill="#facc15" ${U} ${sw(2)}/>
    <path d="M${x - 16} ${y - 12} Q${x - 22} ${y - 12} ${x - 20} ${y - 6} Q${x - 18} ${y - 3} ${x - 15} ${y - 4} M${x + 2} ${y - 12} Q${x + 8} ${y - 12} ${x + 6} ${y - 6} Q${x + 4} ${y - 3} ${x + 1} ${y - 4}" stroke="#ca8a04" stroke-width="2" fill="none"/>
    <path d="M${x - 9} ${y} h4 v5 h-4z" fill="#eab308"/><rect x="${x - 13}" y="${y + 5}" width="12" height="4" rx="1.2" fill="#a16207" ${U} ${sw(1.6)}/>
    <path d="M${x - 12} ${y - 11} V${y - 5}" stroke="#fef08a" stroke-width="1.8" stroke-linecap="round"/>`,
};

/** Auren (hinter Taler). */
const AURA = {
  funkeln: (() => {
    const f = (x, y, s, i) => `<path class="t-funke" style="--i:${i}" d="M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z" fill="var(--taler-hell)"/>`;
    return f(10, 30, 6, 0) + f(110, 24, 5, 1) + f(112, 80, 4.5, 2) + f(8, 84, 4, 3) + f(100, 4, 3.5, 1) + f(18, 8, 3.5, 2);
  })(),
  herzen: [[12, 34, 0.9, 0], [106, 26, 0.7, 1], [110, 76, 0.6, 2], [10, 82, 0.55, 3]].map(([x, y, s, i]) =>
    `<g class="a-schwebe" style="--i:${i}"><path transform="translate(${x} ${y}) scale(${s})" d="M0 9 L-8 1 Q-11 -3 -8 -6 Q-4 -9 0 -4 Q4 -9 8 -6 Q11 -3 8 1Z" fill="#fb7185"/></g>`).join(""),
  strahlen: `<g class="a-dreh" style="transform-origin:60px 62px">${Array.from({ length: 16 }, (_, i) => `<path d="M57 62 L60 2 L63 62Z" transform="rotate(${i * 22.5} 60 62)" fill="var(--taler-hell)" opacity="${i % 2 ? 0.35 : 0.6}"/>`).join("")}</g>`,
  sternenkranz: `<g class="a-dreh langsam" style="transform-origin:60px 62px">${Array.from({ length: 10 }, (_, i) => {
    const w = (i / 10) * Math.PI * 2, x = 60 + Math.cos(w) * 54, y = 62 + Math.sin(w) * 54;
    return `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${i % 2 ? 0.7 : 1})" d="M0 -5 l1.5 3.2 3.5 .5 -2.5 2.4 .6 3.5 -3.1-1.7 -3.1 1.7 .6-3.5 -2.5-2.4 3.5-.5z" fill="#fde047" stroke="#ca8a04" stroke-width="0.8"/>`;
  }).join("")}</g>`,
  heiligenschein: `<ellipse cx="60" cy="10" rx="24" ry="6.5" fill="none" stroke="#fde047" stroke-width="4.5" class="a-glanz"/><ellipse cx="60" cy="10" rx="24" ry="6.5" fill="none" stroke="#fffbeb" stroke-width="1.4"/>`,
  flammen: `<g class="a-flacker" style="transform-origin:60px 110px">
    <path d="M24 104 Q8 78 22 52 Q22 70 32 74 Q26 52 42 30 Q42 54 52 58 Q50 36 60 16 Q70 36 68 58 Q78 54 78 30 Q94 52 88 74 Q98 70 98 52 Q112 78 96 104Z" fill="#f97316" opacity="0.85"/>
    <path d="M34 104 Q24 86 32 68 Q36 80 42 82 Q40 66 50 52 Q52 70 58 72 Q58 56 64 46 Q70 60 68 74 Q76 70 78 58 Q90 76 86 104Z" fill="#facc15" opacity="0.9"/></g>`,
};

/** Grafik-Bausteine eines Outfits für maskottchen.js: {farben, hinten, kopf, augen (null = Standardbrille), hals, ohr, hand(x, y)} */
export function outfitTeile(o = STANDARD) {
  const m = METALL[o.metall];
  return {
    farben: m ? `--taler-hell:${m[0]};--taler-gold:${m[1]};--taler-tief:${m[2]};--taler-dunkel:${m[3]};` : "",
    edel: EDEL[o.metall] || null, edelAussen: EDEL_AUSSEN[o.metall] || "", koerper: EDEL_KOERPER[o.metall] || null, klasse: EDEL[o.metall] ? `m-${o.metall}` : "",
    hinten: AURA[o.aura] || "",
    kopf: KOPF[o.kopf] || "",
    augen: o.augen in AUGEN ? AUGEN[o.augen] : null,
    hals: HALS[o.hals] || "",
    ohr: OHR[o.ohr] || "",
    hand: HAND[o.hand] || null,
  };
}
