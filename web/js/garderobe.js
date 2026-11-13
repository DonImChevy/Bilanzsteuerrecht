// Garderobe für Taler: Katalog (Preise in Talern, ggf. Mindestlevel) und die Grafiken der Gegenstände.
// Währung: 1 Taler je 10 XP (alle XP zählen, auch rückwirkend). Ausgegeben wird nur, was gekauft wurde (stat.gekauft).
// Die Grafiken liegen im Koordinatensystem von Taler (viewBox 0 0 120 120): Münze Mitte (60|62), Radius 40,
// Augen bei (47|59) und (73|59), Mund um (60|74), Füße bei y = 105. Umrisse über die Klasse t-umriss (Taler-Tinte).

export const TALER_JE_XP = 0.1;

export const SLOTS = [
  { id: "kopf", name: "Kopf", icon: "hut" },
  { id: "hintergrund", name: "Hintergrund & Farben", icon: "bild" },
  { id: "augen", name: "Brille", icon: "suche" },
  { id: "gesicht", name: "Make-up", icon: "auge" },
  { id: "maske", name: "Masken", icon: "maske" },
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
  // Premium-Farbgebungen (250 Taler, Vorschau 30 s): feste Helligkeit, eigene Metallic- bzw. Opal-Flächen (css/premium.css)
  { id: "feingold", name: "Feingold", text: "Gold und Silber, gebürstet. Der Glanz folgt der Handy-Neigung.", hell: "#d3ab4f", dunkel: "#e6c46d", premium: "fw-feingold", modus: "dark", preis: 250 },
  { id: "rosegold", name: "Roségold", text: "Helles Rosé-Metallic mit Perlen und Kupfer statt Alarmrot.", hell: "#b9707a", dunkel: "#d99aa2", premium: "fw-rosegold", modus: "light", preis: 250 },
  { id: "opalnacht", name: "Opalnacht", text: "Nachtblau mit schillerndem Opal. Die Farbe wandert langsam.", hell: "#8f9bff", dunkel: "#a9b4ff", premium: "fw-opalnacht", modus: "dark", preis: 250 },
];

// Standard (kostenlos, immer im Besitz): Brille „Lernbrille“, Metall „Gold“, Hintergrund „Leuchten“
export const STANDARD = { kopf: "", augen: "brille", gesicht: "", maske: "", hals: "", ohr: "", hand: "", metall: "gold", aura: "", hintergrund: "leuchten" };

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
  ["goldrand", "augen", "Goldrandbrille", 260, 0, "Rund, fein und zeitlos"],
  ["cateye", "augen", "Cat-Eye-Brille", 340, 0, "Geschwungen, mit kleinen Steinen"],
  // Hals
  ["fliege", "hals", "Fliege", 60, 0, "Immer gut angezogen"],
  ["krawatte", "hals", "Krawatte", 90, 0, "Bereit für den Außendienst"],
  ["halstuch", "hals", "Halstuch", 110, 0, "Lässig gebunden"],
  ["schal", "hals", "Schal", 140, 0, "Gestreift und gemütlich"],
  ["medaille", "hals", "Medaille", 400, 10, "Ab Level 10"],
  ["goldkette", "hals", "Goldkette", 700, 20, "Ab Level 20 – mit §-Anhänger"],
  ["dienstausweis", "hals", "Dienstausweis", 160, 0, "Am blauen Band – wie im Finanzamt"],
  // Ohrringe (hängen am Münzrand, auf Höhe der Brillenbügel)
  ["herzohrringe", "ohr", "Herzchen", 180, 0, "Kleine rote Herzen am Goldhaken"],
  ["creolen", "ohr", "Goldcreolen", 200, 0, "Große Ringe mit Glanz"],
  ["paragrafohrringe", "ohr", "§-Ohrringe", 220, 0, "Goldene Plaketten mit Paragraf"],
  ["perlenohrringe", "ohr", "Perlenohrringe", 250, 0, "Klassisch: Perle am Goldhaken"],
  ["diamantstecker", "ohr", "Diamantstecker", 400, 0, "Funkelnde Brillanten"],
  ["sternohrringe", "ohr", "Sternchen", 280, 0, "Zwei goldene Sterne am Haken"],
  ["saphirtropfen", "ohr", "Saphirtropfen", 450, 0, "Blaue Tropfen in Goldfassung"],
  // Masken – liegen über Augen und Brille, passen zu jedem Metall
  ["nachtschwinge", "maske", "Nachtschwinge", 1500, 0, "Fledermaus-Kopfmaske mit spitzen Ohren und leuchtenden Augenschlitzen – mit Make-up leuchten sie rosa, Wimpern bleiben sichtbar"],
  ["venezia", "maske", "Venezianische Maske", 1200, 0, "Goldene Halbmaske mit Federbusch und Edelsteinen – für den großen Auftritt"],
  // Gesicht – Make-up und Wimpern einzeln oder als Set (paket: enthält die Einzelteile)
  ["wimpern", "gesicht", "Wimpern", 150, 0, "Geschwungen und voll – für den großen Augenaufschlag"],
  ["makeup", "gesicht", "Make-up", 250, 0, "Schimmernder Lidschatten, Lidstrich mit Schwung, Rouge mit Highlighter und dezent glänzende Lippen"],
  ["glamour", "gesicht", "Make-up & Wimpern", 300, 0, "Das Set: beides zusammen – 100 Taler gespart"],
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
  ["henkeltasche", "hand", "Henkeltasche", 320, 0, "Cognac-Leder mit Ziernaht"],
  ["kettentasche", "hand", "Kettentasche", 480, 8, "Gesteppt mit Goldkette – ab Level 8"],
  ["buegeltasche", "hand", "Bügeltasche", 400, 0, "Samt mit Kussverschluss"],
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
  ["paragrafen", "aura", "Paragrafen", 500, 0, "Schwebende §-Zeichen"],
  ["strahlen", "aura", "Strahlenkranz", 600, 0, "Taler strahlt"],
  ["sternenkranz", "aura", "Sternenkranz", 800, 0, "Ein Ring aus Sternen"],
  ["muenzregen", "aura", "Münzkreis", 1000, 10, "Ab Level 10 – kleine Münzen kreisen um Taler"],
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
  // Premium-Farbgebungen der App (siehe FARBWELTEN) – gehören zum Reiter „Hintergrund & Farben“, haben keinen eigenen Reiter
  ["fw-feingold", "farbwelt", "Feingold", 250, 0, "Gold und Silber, gebürstet"],
  ["fw-rosegold", "farbwelt", "Roségold", 250, 0, "Rosé-Metallic mit Perlen"],
  ["fw-opalnacht", "farbwelt", "Opalnacht", 250, 0, "Nachtblau mit Opalschimmer"],
];
/** Sets: enthalten mehrere Artikel und kosten weniger als die Einzelteile. */
const PAKETE = { glamour: ["makeup", "wimpern"] };
export const ARTIKEL = K.map(([id, slot, name, preis, level, text]) => ({ id, slot, name, preis, level, text, ...(PAKETE[id] ? { paket: PAKETE[id] } : {}) }));
const ART = Object.fromEntries(ARTIKEL.map((a) => [a.id, a]));
const IM_PAKET = new Set(Object.values(PAKETE).flat());
export const artikel = (id) => ART[id];

/** Verdiente Taler (aus den Gesamt-XP), ausgegebene Taler und Guthaben. */
export function kasse(xpGesamt, gekauft = {}) {
  const verdient = Math.floor(xpGesamt * TALER_JE_XP);
  // Ein Set kostet insgesamt nie mehr als sein Preis – auch wenn vorher schon Einzelteile gekauft wurden
  const g = gekauft || {};
  const einzeln = Object.keys(g).filter((id) => !PAKETE[id] && !IM_PAKET.has(id)).reduce((s, id) => s + (ART[id]?.preis || 0), 0);
  const sets = Object.entries(PAKETE).reduce((s, [p, teile]) => s + (g[p] ? ART[p].preis : teile.reduce((t, id) => t + (g[id] ? ART[id].preis : 0), 0)), 0);
  const ausgegeben = einzeln + sets;
  return { verdient, ausgegeben, guthaben: verdient - ausgegeben };
}
/** Besitzt man den Artikel? (Kostenlose immer.) */
export const besitzt = (id, gekauft = {}) => !!ART[id] && (ART[id].preis === 0 || !!gekauft?.[id]
  || (ART[id].paket || []).length > 0 && ART[id].paket.every((t) => gekauft?.[t])
  || Object.entries(PAKETE).some(([p, teile]) => gekauft?.[p] && teile.includes(id)));
/** Kaufpreis jetzt: Bei Sets werden schon gekaufte Einzelteile angerechnet. */
export const preisFuer = (id, gekauft = {}) => {
  const a = ART[id];
  if (!a?.paket) return a?.preis || 0;
  return Math.max(0, a.preis - a.paket.reduce((s, t) => s + (gekauft?.[t] ? ART[t].preis : 0), 0));
};
/** Kann man den Artikel jetzt kaufen? Grund, falls nicht: "besitz" | "level" | "geld". */
export function kaufbar(id, { gekauft, guthaben, level }) {
  const a = ART[id];
  if (!a) return { ok: false, grund: "unbekannt" };
  if (besitzt(id, gekauft)) return { ok: false, grund: "besitz" };
  if (level < a.level) return { ok: false, grund: "level" };
  const preis = preisFuer(id, gekauft);
  if (guthaben < preis) return { ok: false, grund: "geld", fehlt: preis - guthaben };
  return { ok: true };
}
/** Getragenes Outfit (nur Gegenstände im Besitz; sonst Standard). */
export function outfitVon(outfit, gekauft) {
  const o = { ...STANDARD };
  // Nachtschwinge war kurz ein Metall – wer sie so trägt, trägt sie jetzt als Maske (zum Standardmetall)
  if (outfit?.metall === "nachtschwinge") outfit = { ...outfit, metall: "", maske: outfit.maske ?? "nachtschwinge" };
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
/** Linearer Verlauf mit gleichmäßig verteilten Farben (id + Kürzel = Name). */
const vl = (id, k, farben, { x1 = 0, y1 = 0, x2 = 1, y2 = 0 } = {}) => `<linearGradient id="${id}${k}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${farben.map((f, i) => `<stop offset="${(i / (farben.length - 1)).toFixed(2)}" stop-color="${f}"/>`).join("")}</linearGradient>`;

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
// ---------------------------------------------------------------- Masken: Nachtschwinge (Fledermaus-Kopfmaske, passt zu jedem Metall)
// Eigene Gestaltung (kein Markenlogo): Kopfmaske über Stirn, Augen und Nase mit spitzen Ohren, Nasenspitze und schmalen
// weißen Augenschlitzen; Mund und Kinn bleiben frei. Ersetzt Augen und Brille (maskottchen.js: o.kappe).
// Mit Make-up leuchten die Augen rosa, mit Wimpern bekommen die Schlitze helle Wimpern.
const KAPPE_FARBE = "#151821";
const NS = {
  // Emblem auf der Stirn: § mit zwei gezackten Schwingen (eigene Form, keine Ellipse)
  schwingen: [[-1], [1]].map(([s]) => {
    const x = (v) => (60 + s * v).toFixed(1);
    return `<path d="M${x(4.5)} 35.6 Q${x(9)} 31.4 ${x(17)} 32.2 Q${x(15.4)} 34.2 ${x(15.8)} 36.4 Q${x(13.4)} 35.4 ${x(11.8)} 37.6 Q${x(10.2)} 36 ${x(8.4)} 38 Q${x(7)} 36.4 ${x(4.5)} 37Z" fill="#9fb0dc"/>`;
  }).join(""),
};
/** Wimpern am äußeren oberen Rand der Augenschlitze (hell, damit sie auf der dunklen Maske sichtbar sind). */
function maskenWimpern(art) {
  return [[47, -1], [73, 1]].map(([cx, s]) => {
    const basis = art === "froh"
      ? [0.04, 0.18, 0.32].map((t) => [cx + s * 6 * (1 - 2 * t), 59.6 - 13.6 * t * (1 - t)]) // entlang des Lachbogens von außen
      : [0, 0.16, 0.32].map((t) => [cx + s * (9 - 14.6 * t), 54.6 + 2.8 * t]); // entlang der Oberkante des Schlitzes
    return basis.map(([bx, by], k) => {
      const l = [5, 4.2, 3.4][k], w = ((s > 0 ? -30 - 20 * k : -150 + 20 * k) * Math.PI) / 180;
      const tx = bx + l * Math.cos(w), ty = by + l * Math.sin(w), qx = bx + l * 0.6 * Math.cos(w + s * 0.4), qy = by + l * 0.6 * Math.sin(w + s * 0.4);
      return `<path d="M${bx.toFixed(1)} ${by.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}" fill="none" stroke="#fdf2ff" stroke-width="${(1.4 - k * 0.15).toFixed(2)}" stroke-linecap="round"/>`;
    }).join("");
  }).join("");
}
/** Kopfmaske samt Augenschlitzen (art = "offen" | "froh"). rosa = Make-up getragen (Augen leuchten rosa), wimpern = Wimpern getragen. */
function kappe(id, art, { rosa = false, wimpern = false } = {}) {
  const [kern, schein] = rosa ? ["#ffd6ec", "#ff5fb0"] : ["#fff", "#9fc0ff"];
  const augen = art === "froh"
    ? `<path d="M40.5 60 Q46.5 53.6 52.5 58.6 M79.5 60 Q73.5 53.6 67.5 58.6" fill="none" stroke="${schein}" stroke-width="5.4" stroke-linecap="round" opacity="${rosa ? 0.55 : 0.35}"/>
       <path d="M40.5 60 Q46.5 53.6 52.5 58.6 M79.5 60 Q73.5 53.6 67.5 58.6" fill="none" stroke="${kern}" stroke-width="2.8" stroke-linecap="round"/>`
    : `<path d="M38 54.6 L52.6 57.4 Q52 61.6 47 61.8 Q40.6 61.6 38 54.6Z M82 54.6 L67.4 57.4 Q68 61.6 73 61.8 Q79.4 61.6 82 54.6Z" fill="${schein}" opacity="${rosa ? 0.55 : 0.35}" stroke="${schein}" stroke-width="${rosa ? 3 : 2.4}" stroke-linejoin="round"/>
       <path d="M38 54.6 L52.6 57.4 Q52 61.6 47 61.8 Q40.6 61.6 38 54.6Z M82 54.6 L67.4 57.4 Q68 61.6 73 61.8 Q79.4 61.6 82 54.6Z" fill="${kern}"/>
       ${rosa ? `<path d="M41 56.4 L49 57.9" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.9"/><path d="M79 56.4 L71 57.9" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.9"/>` : ""}`;
  return `<defs><linearGradient id="${id}kp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3243"/><stop offset="0.6" stop-color="${KAPPE_FARBE}"/><stop offset="1" stop-color="#0a0b0f"/></linearGradient></defs>
    <path d="M22.4 75.7 A40 40 0 0 1 29.4 36.3 L35 2.5 L45 24.9 A40 40 0 0 1 75 24.9 L85 2.5 L90.6 36.3 A40 40 0 0 1 97.6 75.7 C92 70 86 66.6 79 66.2 C72.5 65.9 67 64.6 63.6 62.8 L60 68.4 L56.4 62.8 C53 64.6 47.5 65.9 41 66.2 C34 66.6 28 70 22.4 75.7Z" fill="url(#${id}kp)" class="t-umriss" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M33.6 31 L35.8 10 L41.6 25.6 M86.4 31 L84.2 10 L78.4 25.6" fill="none" stroke="#4d5875" stroke-width="1.1" stroke-linejoin="round" opacity="0.8"/>
    <path d="M27 50 A34 34 0 0 1 48 27.5" fill="none" stroke="#6b7896" stroke-width="2.4" stroke-linecap="round" opacity="0.6"/>
    <path d="M60 46 L60 61" stroke="#000" stroke-width="1" opacity="0.35"/>
    ${NS.schwingen}<text x="60" y="40.5" text-anchor="middle" font-size="10.5" font-weight="800" font-family="Georgia, 'Times New Roman', serif" fill="#c9d5ff">§</text>
    ${augen}${wimpern ? maskenWimpern(art) : ""}`;
}
/** Venezianische Halbmaske in Gold mit Federbusch: liegt über den Augen, die durch die Schlitze schauen (art = "offen" | "froh"). */
function venezia(id, art) {
  const augen = art === "froh"
    ? `<path d="M42.5 60.5 Q47 54.5 51.5 60.5 M68.5 60.5 Q73 54.5 77.5 60.5" class="t-strich" stroke-width="3.2"/>`
    : `<ellipse cx="47" cy="59" rx="3.8" ry="4.8" class="t-tinte"/><ellipse cx="73" cy="59" rx="3.8" ry="4.8" class="t-tinte"/><circle cx="48.4" cy="57.1" r="1.45" fill="#fff"/><circle cx="74.4" cy="57.1" r="1.45" fill="#fff"/>`;
  const feder = (w, l, f1, f2) => `<g transform="rotate(${w} 84 47)"><path d="M84 47 Q${84 - l * 0.22} ${47 - l * 0.55} 84 ${47 - l} Q${84 + l * 0.22} ${47 - l * 0.55} 84 47Z" fill="${f1}" stroke="#3a2710" stroke-width="1.3" stroke-linejoin="round"/><path d="M84 47 V${47 - l * 0.92}" stroke="${f2}" stroke-width="0.9"/>
    <path d="M84 ${47 - l * 0.3} l${-l * 0.09} ${-l * 0.1} M84 ${47 - l * 0.3} l${l * 0.09} ${-l * 0.1} M84 ${47 - l * 0.55} l${-l * 0.09} ${-l * 0.1} M84 ${47 - l * 0.55} l${l * 0.09} ${-l * 0.1}" stroke="${f2}" stroke-width="0.7" opacity="0.8"/></g>`;
  return `<defs>${vl(id, "vz", ["#8a5a0c", "#fde68a", "#d4a017", "#fff3c4", "#a16207"], { x2: 1, y2: 1 })}</defs>
    ${feder(28, 40, "#7c3aed", "#ddd6fe")}${feder(10, 46, "#0d9488", "#99f6e4")}${feder(46, 32, "#db2777", "#fbcfe8")}
    <path d="M24 52 Q30 43.6 46 45.6 Q55 46.6 60 51.4 Q65 46.6 74 45.6 Q90 43.6 96 52 Q93 66 80 69.4 Q69 71.4 63.6 63.6 L60 67.6 L56.4 63.6 Q51 71.4 40 69.4 Q27 66 24 52Z" fill="url(#${id}vz)" class="t-umriss" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M28 52.6 Q32.6 47.2 46 48.8 Q54.6 49.8 60 55 Q65.4 49.8 74 48.8 Q87.4 47.2 92 52.6" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0.7"/>
    <path d="M38.4 55.2 Q47 49.6 55 56.4 Q54 64 47 64.8 Q40 64.6 38.4 55.2Z M81.6 55.2 Q73 49.6 65 56.4 Q66 64 73 64.8 Q80 64.6 81.6 55.2Z" fill="var(--taler-gold)" stroke="#3a2710" stroke-width="1.6" stroke-linejoin="round"/>
    ${augen}
    <path d="M30 57 q2.6 3.6 6 4.4 M90 57 q-2.6 3.6 -6 4.4 M41 67 q5 1.4 9 -1.4 M79 67 q-5 1.4 -9 -1.4" stroke="#8a5a0c" stroke-width="0.9" fill="none" stroke-linecap="round" opacity="0.8"/>
    <circle cx="60" cy="50.6" r="2.3" fill="#ef4444" stroke="#3a2710" stroke-width="0.9"/><circle cx="59.3" cy="49.9" r="0.7" fill="#fff" opacity="0.9"/>
    <circle cx="84" cy="47" r="2.6" fill="#2563eb" stroke="#3a2710" stroke-width="0.9"/><circle cx="83.2" cy="46.2" r="0.8" fill="#fff" opacity="0.9"/>
    <circle cx="27.4" cy="52" r="1" fill="#fff3c4"/><circle cx="33" cy="48.4" r="1" fill="#fff3c4"/><circle cx="40" cy="47" r="1" fill="#fff3c4"/>`;
}
const KAPPE = { nachtschwinge: kappe, venezia };
const EDEL_AUSSEN = { pinkdiamond: PD.aussen };
/** Eigener Münzkörper statt des runden Rands (Umriss, Randfacetten, Münzfeld). */
const EDEL_KOERPER = {
  pinkdiamond: PD.koerper,
};

/** Kopfbedeckungen (über dem Gesicht gezeichnet). */
const KOPF = {
  schirmmuetze: `<defs>${vl("gk", "sm", ["#fb7185", "#e11d48", "#9f1239"], { x2: 1, y2: 1 })}${vl("gk", "sb", ["#e11d48", "#881337"], { x2: 0, y2: 1 })}</defs><path d="M37 30 Q36 9 60 8 Q84 9 83 30Z" fill="url(#gksm)" ${U} ${sw(2.4)}/>
    <path d="M60 8 V29 M47 11 Q45 20 46 29 M73 11 Q75 20 74 29" stroke="#9f1239" stroke-width="1.4" fill="none"/>
    <path d="M41 14 Q48 10 56 10" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.45"/>
    <circle cx="60" cy="8.5" r="2.6" fill="#be123c" ${U} ${sw(1.6)}/>
    <path d="M34 29 Q60 24 86 29 Q90 33 84 35 Q60 31 36 35 Q30 33 34 29Z" fill="url(#gksb)" ${U} ${sw(2.4)}/>
    <path d="M38 29.6 Q60 25.6 82 29.6" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0.4"/>`,
  partyhut: `<defs>${vl("gk", "ph", ["#fde68a", "#fbbf24", "#d97706"])}</defs><path d="M45 29 L60 -6 L75 29Z" fill="url(#gkph)" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <clipPath id="ph"><path d="M45 29 L60 -6 L75 29Z"/></clipPath>
    <g clip-path="url(#ph)" stroke-width="5"><path d="M40 22 L80 10 M40 8 L80 -4 M40 36 L80 24" stroke="#ec4899"/></g>
    <path d="M66 8 L75 29 L64 29Z" fill="#7c2d12" opacity="0.22" clip-path="url(#ph)"/><path d="M52 24 L59 3" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.4"/><circle cx="51" cy="18" r="1.6" fill="#fff"/><circle cx="66" cy="9" r="1.4" fill="#fff"/><circle cx="63" cy="22" r="1.5" fill="#22d3ee"/>
    <circle cx="60" cy="-7" r="5" fill="#22d3ee" ${U} ${sw(2.2)}/><path d="M57 -9 Q59 -11 61 -10.5" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M44 29 Q60 33 76 29" stroke="#ec4899" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
  bommelmuetze: `<defs>${vl("gk", "bm", ["#60a5fa", "#2563eb", "#1e3a8a"], { x2: 1, y2: 1 })}${vl("gk", "bc", ["#3b82f6", "#1e40af"], { x2: 0, y2: 1 })}${vl("gk", "bp", ["#ffffff", "#cbd5e1"], { x2: 1, y2: 1 })}</defs><path d="M36 30 Q35 6 60 5 Q85 6 84 30Z" fill="url(#gkbm)" ${U} ${sw(2.4)}/>
    <path d="M44 9 Q47 18 46 28 M60 5 V28 M76 9 Q73 18 74 28" stroke="#1e40af" stroke-width="1.5" fill="none"/>
    <path d="M42 13 Q48 8 55 7.5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
    <rect x="33" y="24" width="54" height="10" rx="5" fill="url(#gkbc)" ${U} ${sw(2.4)}/>
    <path d="M39 25.5 v7 M45 25.5 v7 M51 25.5 v7 M57 25.5 v7 M63 25.5 v7 M69 25.5 v7 M75 25.5 v7 M81 25.5 v7" stroke="#1e3a8a" stroke-width="1.3"/>
    <circle cx="60" cy="2" r="7" fill="url(#gkbp)" ${U} ${sw(2.2)}/><path d="M56 -1 l2 2 M62 -2 l1 2.4 M58 4 l2 1 M64 3 l-1 2" stroke="#cbd5e1" stroke-width="1.4" stroke-linecap="round"/>`,
  augenschirm: `<path d="M33 31 Q60 18 87 31" stroke="#1f2937" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M32 31 Q60 17 88 31 L83 40 Q60 30 37 40Z" fill="#16a34a" fill-opacity="0.78" ${U} ${sw(2.3)} stroke-linejoin="round"/>
    <path d="M38 33 Q60 24 82 33" stroke="#bbf7d0" stroke-width="1.6" fill="none" opacity="0.7"/>
    <path d="M37 40 Q60 30 83 40" stroke="#14532d" stroke-width="1.4" fill="none"/>`,
  doktorhut: `<defs>${vl("gk", "dh", ["#565a7c", "#33364c", "#1c1d2b"], { x2: 1, y2: 1 })}${vl("gk", "dg", ["#a16207", "#fde68a", "#ca8a04"])}</defs><path d="M44 21 L44 30 Q60 35 76 30 L76 21Z" fill="#1c1d2b" ${U} ${sw(2.4)}/>
    <path d="M28 18 L60 6 L92 18 L60 30Z" fill="url(#gkdh)" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M36 18 L60 9 L70 13" stroke="#5b5f7a" stroke-width="1.6" fill="none"/>
    <path d="M60 18 Q76 16 86 19 L87 31" stroke="#f6c945" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="18" r="2.4" fill="#f6c945" ${U} ${sw(1.2)}/>
    <path d="M84.5 30 h5 l1 9 h-7Z" fill="url(#gkdg)" ${U} ${sw(1.4)}/><path d="M85.5 33 v5.5 M87 33 v5.5 M88.5 33 v5.5" stroke="#b7791f" stroke-width="0.8"/>`,
  kopfhoerer: `<defs>${vl("gk", "kh", ["#c4b5fd", "#8b5cf6", "#5b21b6"], { x2: 1, y2: 1 })}</defs><path d="M24 60 Q21 13 60 12 Q99 13 96 60" stroke="#1f2937" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    <path d="M24 60 Q21 13 60 12 Q99 13 96 60" stroke="#475569" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <rect x="13" y="49" width="13" height="22" rx="6.5" fill="url(#gkkh)" ${U} ${sw(2.4)}/><rect x="94" y="49" width="13" height="22" rx="6.5" fill="url(#gkkh)" ${U} ${sw(2.4)}/>
    <rect x="16" y="53" width="3" height="10" rx="1.5" fill="#c4b5fd"/><rect x="101" y="53" width="3" height="10" rx="1.5" fill="#c4b5fd"/>`,
  zylinder: `<defs>${vl("gk", "zy", ["#12131d", "#474a66", "#1f2030", "#0c0d14"])}${vl("gk", "zb", ["#7f1d1d", "#ef4444", "#991b1b"])}</defs><path d="M44 26 L46 -4 Q60 -8 74 -4 L76 26Z" fill="url(#gkzy)" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M45 17 Q60 20 75 17 L75.6 24 Q60 27 44.4 24Z" fill="url(#gkzb)"/>
    <path d="M50 -2 L49 15" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.18"/>
    <ellipse cx="60" cy="-4.5" rx="14" ry="3" fill="#2d2f44" ${U} ${sw(1.8)}/>
    <path d="M30 27 Q60 21 90 27 Q93 31 88 32 Q60 27 32 32 Q27 31 30 27Z" fill="url(#gkzy)" ${U} ${sw(2.4)}/>`,
  wikingerhelm: `<defs>${vl("gk", "wh", ["#f3f4f6", "#9ca3af", "#4b5563"], { x2: 1, y2: 1 })}${vl("gk", "wb", ["#ca8a04", "#713f12"], { x2: 0, y2: 1 })}${vl("gk", "wo", ["#fffbeb", "#e7cf9a"], { x2: 0, y2: 1 })}</defs><path d="M38 31 Q38 9 60 8 Q82 9 82 31Z" fill="url(#gkwh)" ${U} ${sw(2.4)}/>
    <path d="M60 8 V31" stroke="#6b7280" stroke-width="4"/><path d="M45 13 Q50 10 55 10" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
    <rect x="35" y="26" width="50" height="7" rx="3" fill="url(#gkwb)" ${U} ${sw(2.2)}/>
    <circle cx="44" cy="29.5" r="1.3" fill="#fde68a"/><circle cx="60" cy="29.5" r="1.3" fill="#fde68a"/><circle cx="76" cy="29.5" r="1.3" fill="#fde68a"/>
    <path d="M39 22 Q26 20 22 4 Q31 12 41 15Z" fill="url(#gkwo)" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M81 22 Q94 20 98 4 Q89 12 79 15Z" fill="url(#gkwo)" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M28 12 l3 3 M25 7 l3 2 M92 12 l-3 3 M95 7 l-3 2" stroke="#d6b97a" stroke-width="1.3" stroke-linecap="round"/>`,
  zauberhut: `<defs>${vl("gk", "zh", ["#a78bfa", "#6d28d9", "#3b0f8a"])}${vl("gk", "zk", ["#7c3aed", "#4c1d95"], { x2: 0, y2: 1 })}</defs><path d="M38 28 Q52 20 56 4 Q60 -10 74 -12 Q66 -4 68 8 Q72 20 82 28Z" fill="url(#gkzh)" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M62 -2 l1.3 2.6 2.9.4 -2.1 2 .5 2.9 -2.6-1.4 -2.6 1.4 .5-2.9 -2.1-2 2.9-.4z" fill="#fde047"/>
    <path d="M52 16 l.9 1.8 2 .3 -1.4 1.4 .3 2 -1.8-1 -1.8 1 .3-2 -1.4-1.4 2-.3z" fill="#fde047"/>
    <circle cx="66" cy="18" r="1.4" fill="#e9d5ff"/><circle cx="58" cy="8" r="1.1" fill="#e9d5ff"/>
    <path d="M28 28 Q60 21 92 28 Q95 33 89 34 Q60 28 31 34 Q25 33 28 28Z" fill="url(#gkzk)" ${U} ${sw(2.4)}/>
    <path d="M40 27 Q60 23 80 27" stroke="#fde047" stroke-width="2.6" fill="none"/>`,
  lorbeerkranz: (() => {
    const blatt = (x, y, w) => `<ellipse cx="${x}" cy="${y}" rx="5.4" ry="2.5" transform="rotate(${w} ${x} ${y})" fill="url(#gklb)" ${U} ${sw(1.4)}/><path d="M${x - 3.4} ${y} h6.8" transform="rotate(${w} ${x} ${y})" stroke="#365314" stroke-width="0.7" opacity="0.7"/>`;
    const links = [[24, 50, -70], [26, 42, -55], [30, 35, -42], [36, 29, -28], [43, 24, -16], [51, 21, -6]], rechts = links.map(([x, y, w]) => [120 - x, y, -w]);
    return [...links, ...rechts].map(([x, y, w]) => blatt(x, y, w)).join("") + `<defs>${vl("gk", "lb", ["#bef264", "#65a30d", "#3f6212"], { x2: 0, y2: 1 })}</defs><circle cx="60" cy="20" r="2.4" fill="#f59e0b" ${U} ${sw(1.2)}/>`;
  })(),
  krone: `<defs>${vl("gk", "kr", ["#a16207", "#fde047", "#eab308", "#fef08a", "#a16207"])}</defs><path d="M37 31 L34 9 L46 19 L60 3 L74 19 L86 9 L83 31Z" fill="url(#gkkr)" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M40 27 L39 15 M60 9 L60 18 M80 27 L81 15" stroke="#fef08a" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
    <rect x="36" y="25" width="48" height="8" rx="2.5" fill="url(#gkkr)" ${U} ${sw(2.2)}/>
    <circle cx="48" cy="29" r="2.3" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.7"/><circle cx="60" cy="29" r="2.6" fill="#3b82f6" stroke="#1e3a8a" stroke-width="0.7"/><circle cx="72" cy="29" r="2.3" fill="#22c55e" stroke="#14532d" stroke-width="0.7"/><circle cx="47.3" cy="28.3" r="0.7" fill="#fff" opacity="0.85"/><circle cx="59.2" cy="28.2" r="0.8" fill="#fff" opacity="0.85"/><circle cx="71.3" cy="28.3" r="0.7" fill="#fff" opacity="0.85"/>
    <circle cx="34" cy="8.5" r="2.4" fill="#fde047" ${U} ${sw(1.4)}/><circle cx="60" cy="2.5" r="2.6" fill="#fde047" ${U} ${sw(1.4)}/><circle cx="86" cy="8.5" r="2.4" fill="#fde047" ${U} ${sw(1.4)}/>`,
};

/** Brillen (ersetzen die Lernbrille). Leer = ohne Brille. Verläufe mit festem Präfix „ga“. */
const GOLDV = ["#8a5a0c", "#fde68a", "#d4a017", "#fff3c4", "#a16207"];
const glasGlanz = (cx, cy = 58.5, r = 8) => `<path d="M${cx - r * 0.9} ${cy - r * 0.5} A${r} ${r} 0 0 1 ${cx - r * 0.15} ${cy - r}" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.8"/><path d="M${cx + r * 0.7} ${cy + r * 0.75} A${r} ${r} 0 0 1 ${cx + r * 0.2} ${cy + r * 1.02}" stroke="#fff" stroke-width="0.9" fill="none" stroke-linecap="round" opacity="0.4"/>`;
const AUGEN = {
  brille: null, // Taler zeichnet seine Standardbrille selbst
  ohne: "",
  hornbrille: `<defs>${vl("ga", "ho", ["#2a1708", "#8a5a2b", "#3b2412", "#a8743a", "#2a1708"], { x2: 1, y2: 1 })}</defs>
    <rect x="35" y="49.5" width="23" height="18" rx="5" fill="#fff" fill-opacity="0.14" stroke="#1a0f05" stroke-width="5"/><rect x="62" y="49.5" width="23" height="18" rx="5" fill="#fff" fill-opacity="0.14" stroke="#1a0f05" stroke-width="5"/>
    <path d="M58 55.5 Q60 53.6 62 55.5 M35 53.5 L28 50.6 M85 53.5 L92 50.6" stroke="#1a0f05" stroke-width="4.6" stroke-linecap="round" fill="none"/>
    <rect x="35" y="49.5" width="23" height="18" rx="5" fill="none" stroke="url(#gaho)" stroke-width="3"/><rect x="62" y="49.5" width="23" height="18" rx="5" fill="none" stroke="url(#gaho)" stroke-width="3"/>
    <path d="M58 55.5 Q60 53.6 62 55.5 M35 53.5 L28 50.6 M85 53.5 L92 50.6" stroke="url(#gaho)" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    <circle cx="37.6" cy="52" r="0.8" fill="#fde68a"/><circle cx="82.4" cy="52" r="0.8" fill="#fde68a"/>
    <path d="M38.5 55 L43.5 51.5 M65.5 55 L70.5 51.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.75"/>`,
  sonnenbrille: `<defs>${vl("ga", "so", ["#020617", "#1e293b", "#475569"], { x2: 0, y2: 1 })}</defs>
    <path d="M34 52 Q34 49 37 49 H57 Q59 49 58.6 52 L57 61 Q56 67 49 67 H43 Q36 67 35 61Z" fill="url(#gaso)" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M86 52 Q86 49 83 49 H63 Q61 49 61.4 52 L63 61 Q64 67 71 67 H77 Q84 67 85 61Z" fill="url(#gaso)" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M38 51.5 L47 51.5 L41 62 L36.6 60Z M65 51.5 L74 51.5 L68 62 L63.6 60Z" fill="#fff" opacity="0.2"/>
    <path d="M49.5 51.5 L52.5 51.5 L47 62 L44.6 62Z M76.5 51.5 L79.5 51.5 L74 62 L71.6 62Z" fill="#fff" opacity="0.12"/>
    <path d="M58 52 Q60 50.2 62 52 M34 52 L28 50 M86 52 L92 50" class="t-umriss" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M36.5 50.4 H56.5 M63.5 50.4 H83.5" stroke="#94a3b8" stroke-width="0.8" stroke-linecap="round" opacity="0.7"/>`,
  halbmond: `<defs>${vl("ga", "hm", GOLDV)}</defs>
    <path d="M36 60 H58 Q57 70 47 70 Q37 70 36 60Z" fill="#e0f2fe" fill-opacity="0.3" stroke="#3a2710" stroke-width="3.6" stroke-linejoin="round"/><path d="M62 60 H84 Q83 70 73 70 Q63 70 62 60Z" fill="#e0f2fe" fill-opacity="0.3" stroke="#3a2710" stroke-width="3.6" stroke-linejoin="round"/>
    <path d="M36 60 H58 Q57 70 47 70 Q37 70 36 60Z M62 60 H84 Q83 70 73 70 Q63 70 62 60Z" fill="none" stroke="url(#gahm)" stroke-width="1.9" stroke-linejoin="round"/>
    <path d="M58 61 Q60 59 62 61 M36 60 L29 55 M84 60 L91 55" stroke="#3a2710" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M58 61 Q60 59 62 61 M36 60 L29 55 M84 60 L91 55" stroke="url(#gahm)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M40 62.5 L45 62.5 M66 62.5 L71 62.5" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity="0.8"/>`,
  herzbrille: `<defs>${vl("ga", "hz", ["#fda4af", "#f43f5e", "#9f1239"], { x2: 1, y2: 1 })}</defs>
    <path d="M47 68.5 L36.3 57.6 Q32.6 53 36 49.8 Q40 46.2 47 51.4 Q54 46.2 58 49.8 Q61.4 53 57.7 57.6Z" fill="url(#gahz)" fill-opacity="0.9" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M73 68.5 L62.3 57.6 Q58.6 53 62 49.8 Q66 46.2 73 51.4 Q80 46.2 84 49.8 Q87.4 53 83.7 57.6Z" fill="url(#gahz)" fill-opacity="0.9" ${U} ${sw(2.4)} stroke-linejoin="round"/>
    <path d="M38 53.4 Q38.6 50.4 42.4 50.6 M64 53.4 Q64.6 50.4 68.4 50.6" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.85"/>
    <circle cx="52.6" cy="52.4" r="0.9" fill="#fff" opacity="0.7"/><circle cx="78.6" cy="52.4" r="0.9" fill="#fff" opacity="0.7"/>
    <path d="M58 54 Q60 52.4 62 54 M35 54 L28 51.5 M85 54 L92 51.5" class="t-umriss" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  sternbrille: (() => {
    const stern = (cx, cy, a = 13, i2 = 6) => { const p = []; for (let i = 0; i < 10; i++) { const r = i % 2 ? i2 : a, w = (Math.PI / 5) * i - Math.PI / 2; p.push(`${(cx + r * Math.cos(w)).toFixed(1)} ${(cy + r * Math.sin(w)).toFixed(1)}`); } return `M${p.join(" L")}Z`; };
    return `<defs>${vl("ga", "s1", ["#fef08a", "#facc15", "#ca8a04"], { x2: 1, y2: 1 })}${vl("ga", "s2", ["#e9d5ff", "#a855f7", "#6b21a8"], { x2: 1, y2: 1 })}</defs>
      <path d="${stern(47, 59)}" fill="url(#gas1)" fill-opacity="0.92" ${U} ${sw(2.3)} stroke-linejoin="round"/><path d="${stern(73, 59)}" fill="url(#gas2)" fill-opacity="0.92" ${U} ${sw(2.3)} stroke-linejoin="round"/>
      <circle cx="47" cy="59" r="4.6" fill="#fff" fill-opacity="0.38"/><circle cx="73" cy="59" r="4.6" fill="#fff" fill-opacity="0.38"/>
      <path d="${stern(41.5, 51.5, 2.2, 0.8)}" fill="#fff"/><path d="${stern(67.5, 51.5, 2.2, 0.8)}" fill="#fff"/>
      <path d="M58.5 56 Q60 54.5 61.5 56 M35 54 L28 51 M85 54 L92 51" class="t-umriss" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  })(),
  pilotenbrille: `<defs><linearGradient id="gapl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c4a6e" stop-opacity="0.92"/><stop offset="0.55" stop-color="#0e7490" stop-opacity="0.8"/><stop offset="1" stop-color="#fdba74" stop-opacity="0.75"/></linearGradient>${vl("ga", "pg", GOLDV)}</defs>
    <path d="M35 51 H57 Q59 51 58 55 Q56 67 47 67 Q37 67 35.5 57 Q35 53 35 51Z" fill="url(#gapl)" stroke="#3a2710" stroke-width="3.6" stroke-linejoin="round"/><path d="M85 51 H63 Q61 51 62 55 Q64 67 73 67 Q83 67 84.5 57 Q85 53 85 51Z" fill="url(#gapl)" stroke="#3a2710" stroke-width="3.6" stroke-linejoin="round"/>
    <path d="M35 51 H57 Q59 51 58 55 Q56 67 47 67 Q37 67 35.5 57 Q35 53 35 51Z M85 51 H63 Q61 51 62 55 Q64 67 73 67 Q83 67 84.5 57 Q85 53 85 51Z" fill="none" stroke="url(#gapg)" stroke-width="1.9" stroke-linejoin="round"/>
    <path d="M56 50.4 H64 M57.6 54.5 Q60 52.6 62.4 54.5 M35 51 L28 49 M85 51 L92 49" stroke="#3a2710" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M56 50.4 H64 M57.6 54.5 Q60 52.6 62.4 54.5 M35 51 L28 49 M85 51 L92 49" stroke="url(#gapg)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M38.5 53.6 L46 53.6 L41.4 61 L38 58.6Z M65.5 53.6 L73 53.6 L68.4 61 L65 58.6Z" fill="#fff" opacity="0.28"/>`,
  monokel: `<defs>${vl("ga", "mo", GOLDV, { x2: 1, y2: 1 })}</defs>
    <path d="M83.6 63.4 Q92.5 77 87 91 Q83.4 100 88.6 108" stroke="#3a2710" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M83.6 63.4 Q92.5 77 87 91 Q83.4 100 88.6 108" stroke="url(#gamo)" stroke-width="1.4" fill="none" stroke-dasharray="2.2 1.3" stroke-linecap="round"/>
    <circle cx="73" cy="58.5" r="11.2" fill="#e0f2fe" fill-opacity="0.28" stroke="#3a2710" stroke-width="4.6"/><circle cx="73" cy="58.5" r="11.2" fill="none" stroke="url(#gamo)" stroke-width="2.8"/>
    <circle cx="73" cy="58.5" r="8.9" fill="none" stroke="#fff" stroke-width="0.7" opacity="0.5"/><circle cx="83.2" cy="63.4" r="1.6" fill="url(#gamo)" stroke="#3a2710" stroke-width="0.8"/>
    ${glasGlanz(73, 58.5, 7.4)}`,
  cateye: `<defs>${vl("ga", "ce", ["#0f172a", "#334155", "#020617"], { x2: 1, y2: 1 })}</defs>
    <path d="M36 54 Q34 48 28.5 45.5 Q38 46 47 49.5 Q55 49 58.4 52.4 Q59 60 56 64.6 Q51.6 68.6 45 67.6 Q37.6 65.6 36 54Z" fill="#fbcfe8" fill-opacity="0.3" stroke="url(#gace)" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M84 54 Q86 48 91.5 45.5 Q82 46 73 49.5 Q65 49 61.6 52.4 Q61 60 64 64.6 Q68.4 68.6 75 67.6 Q82.4 65.6 84 54Z" fill="#fbcfe8" fill-opacity="0.3" stroke="url(#gace)" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M58.4 54 Q60 52.6 61.6 54" stroke="#0f172a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <circle cx="32.6" cy="47.6" r="1.1" fill="#f0abfc" stroke="#86198f" stroke-width="0.5"/><circle cx="36.6" cy="48.9" r="0.9" fill="#fff"/><circle cx="87.4" cy="47.6" r="1.1" fill="#f0abfc" stroke="#86198f" stroke-width="0.5"/><circle cx="83.4" cy="48.9" r="0.9" fill="#fff"/>
    <path d="M40 54.6 L45.6 52.2 M67.4 54.6 L73 52.2" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>`,
  goldrand: `<defs>${vl("ga", "gr", GOLDV, { x2: 1, y2: 1 })}</defs>
    <circle cx="47" cy="58.5" r="10.4" fill="#fff" fill-opacity="0.14" stroke="#3a2710" stroke-width="3"/><circle cx="73" cy="58.5" r="10.4" fill="#fff" fill-opacity="0.14" stroke="#3a2710" stroke-width="3"/>
    <path d="M57.2 56.6 Q60 53.6 62.8 56.6 M36.8 56 L29.5 53.5 M83.2 56 L90.5 53.5" stroke="#3a2710" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="47" cy="58.5" r="10.4" fill="none" stroke="url(#gagr)" stroke-width="1.5"/><circle cx="73" cy="58.5" r="10.4" fill="none" stroke="url(#gagr)" stroke-width="1.5"/>
    <path d="M57.2 56.6 Q60 53.6 62.8 56.6 M36.8 56 L29.5 53.5 M83.2 56 L90.5 53.5" stroke="url(#gagr)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    ${glasGlanz(47)}${glasGlanz(73)}`,
};

/** Halsschmuck (unter dem Mund, am unteren Rand der Münze). Verläufe mit festem Präfix „gh“. */
const HALS = {
  fliege: `<defs>${vl("gh", "fl", ["#f87171", "#dc2626", "#7f1d1d"], { x2: 0, y2: 1 })}</defs>
    <path d="M60 98 L45.6 90.4 Q42.4 98 45.6 105.6Z" fill="url(#ghfl)" ${U} ${sw(2.2)} stroke-linejoin="round"/><path d="M60 98 L74.4 90.4 Q77.6 98 74.4 105.6Z" fill="url(#ghfl)" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M48.6 94 Q52 98 48.6 102 M52.6 96 Q54 98 52.6 100 M71.4 94 Q68 98 71.4 102 M67.4 96 Q66 98 67.4 100" stroke="#7f1d1d" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.8"/>
    <path d="M46.6 92.6 L53 95.6 M73.4 92.6 L67 95.6" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity="0.4"/>
    <rect x="56.4" y="94.2" width="7.2" height="7.6" rx="2.6" fill="url(#ghfl)" ${U} ${sw(2)}/><path d="M57.8 96 h2.6" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.5"/>`,
  krawatte: `<defs>${vl("gh", "kw", ["#1e3a8a", "#3b82f6", "#1d4ed8", "#1e3a8a"])}</defs><clipPath id="ghkc"><path d="M57.5 101 L54 117 L60 123 L66 117 L62.5 101Z"/></clipPath>
    <path d="M57.5 101 L54 117 L60 123 L66 117 L62.5 101Z" fill="url(#ghkw)" ${U} ${sw(2)} stroke-linejoin="round"/>
    <g clip-path="url(#ghkc)"><path d="M52 104 L68 110 M52 110 L68 116 M52 116 L68 122" stroke="#bfdbfe" stroke-width="1.7"/><path d="M52 107 L68 113 M52 113 L68 119" stroke="#fde68a" stroke-width="0.7"/><path d="M58.6 102 L56.6 117.5" stroke="#fff" stroke-width="1.1" opacity="0.3"/></g>
    <path d="M55.6 94.6 H64.4 L62.6 101.4 H57.4Z" fill="url(#ghkw)" ${U} ${sw(2)} stroke-linejoin="round"/><path d="M58.6 97 Q60 99 61.4 97" stroke="#1e3a8a" stroke-width="1" fill="none" stroke-linecap="round"/>`,
  halstuch: `<defs>${vl("gh", "ht", ["#fdba74", "#f97316", "#c2410c"], { x2: 0, y2: 1 })}</defs>
    <path d="M37 89.6 Q60 100 83 89.6 L74.6 99.4 Q66 104 60 113 Q54 104 45.4 99.4Z" fill="url(#ghht)" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <path d="M41 92.4 Q60 100.6 79 92.4" stroke="#7c2d12" stroke-width="1" fill="none" opacity="0.5"/><path d="M52 100.6 Q57 104.6 60 110 M68 100.6 Q63 104.6 60 110" stroke="#7c2d12" stroke-width="0.9" fill="none" opacity="0.45"/>
    ${[[50, 96.6], [60, 98.8], [70, 96.6], [55.4, 101.6], [64.6, 101.6], [60, 105.6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.25" fill="#fff7ed"/>`).join("")}
    <path d="M40.6 91 Q50 95 59 96" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.4"/>`,
  schal: `<defs>${vl("gh", "sc", ["#ef4444", "#b91c1c", "#7f1d1d"], { x2: 0, y2: 1 })}</defs><clipPath id="ghs1"><path d="M28 84 Q60 102 92 84 L93 93 Q60 112 27 93Z"/></clipPath><clipPath id="ghs2"><path d="M76 95 L84 118 L72 120 L68 99Z"/></clipPath>
    <path d="M72 120 l-1.2 3.4 M75 120 l-.2 3.6 M78 119.5 l.8 3.4 M81 119 l1.6 3" stroke="#fecaca" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M76 95 L84 118 L72 120 L68 99Z" fill="url(#ghsc)" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <g clip-path="url(#ghs2)"><path d="M66 103.6 L84 100 M67 110.6 L86 107 M69 117.4 L88 113.6" stroke="#fef2f2" stroke-width="3"/><path d="M70 99 L74 119" stroke="#fff" stroke-width="1" opacity="0.25"/></g>
    <path d="M28 84 Q60 102 92 84 L93 93 Q60 112 27 93Z" fill="url(#ghsc)" ${U} ${sw(2.2)} stroke-linejoin="round"/>
    <g clip-path="url(#ghs1)"><path d="M38 84 L36.6 102 M50 88 L50 108 M62 90 L62 110 M74 88 L75 106 M86 82 L87.4 100" stroke="#fef2f2" stroke-width="3.2"/><path d="M30 86.6 Q60 104 90 86.6" stroke="#fff" stroke-width="1.2" fill="none" opacity="0.3"/><path d="M28 92 Q60 110.6 92 92" stroke="#450a0a" stroke-width="1.6" fill="none" opacity="0.3"/></g>`,
  medaille: `<defs>${vl("gh", "mg", GOLDV, { x2: 1, y2: 1 })}${vl("gh", "mb", ["#1e3a8a", "#3b82f6", "#1e40af"])}</defs>
    <path d="M50 84 L57 101 H63 L70 84 H64 L60 96 L56 84Z" fill="url(#ghmb)" ${U} ${sw(1.8)} stroke-linejoin="round"/><path d="M56 84 L60 96 L64 84" fill="#dc2626"/><path d="M52.6 85 L58.4 99.6 M67.4 85 L61.6 99.6" stroke="#fff" stroke-width="0.9" opacity="0.5"/>
    <rect x="57" y="99.6" width="6" height="2.6" rx="0.8" fill="url(#ghmg)" ${U} ${sw(1)}/>
    <circle cx="60" cy="108" r="8.2" fill="url(#ghmg)" ${U} ${sw(2.2)}/><circle cx="60" cy="108" r="6" fill="none" stroke="#8a5a0c" stroke-width="0.8" opacity="0.6"/><circle cx="60" cy="108" r="5.4" fill="none" stroke="#fff3c4" stroke-width="0.7"/>
    <path d="M60 103.8 l1.25 2.6 2.9 .4 -2.1 2 .5 2.9 -2.55-1.4 -2.55 1.4 .5-2.9 -2.1-2 2.9-.4z" fill="#8a5a0c"/><path d="M54.6 105 A6.4 6.4 0 0 1 59 102" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.8"/>`,
  goldkette: (() => {
    let s = ""; for (let i = 0; i <= 16; i++) { const t = i / 16, x = (30 + 60 * t).toFixed(1), y = (82 + 17 * Math.sin(Math.PI * t)).toFixed(1), d = `rotate(${i % 2 ? 50 : -40} ${x} ${y})`;
      s += `<ellipse cx="${x}" cy="${y}" rx="2.5" ry="1.7" transform="${d}" fill="none" stroke="#3a2710" stroke-width="2.4"/><ellipse cx="${x}" cy="${y}" rx="2.5" ry="1.7" transform="${d}" fill="none" stroke="${i % 2 ? "#fde68a" : "#d4a017"}" stroke-width="1.3"/>`; }
    return `<defs>${vl("gh", "gk", GOLDV, { x2: 1, y2: 1 })}</defs>${s}<circle cx="60" cy="105.6" r="7.8" fill="url(#ghgk)" ${U} ${sw(2.2)}/><circle cx="60" cy="105.6" r="5.8" fill="none" stroke="#8a5a0c" stroke-width="0.7" opacity="0.6"/>
      <text x="60.4" y="109.9" text-anchor="middle" font-size="10" font-weight="900" font-family="Georgia, serif" fill="#fff3c4">§</text><text x="60" y="109.5" text-anchor="middle" font-size="10" font-weight="900" font-family="Georgia, serif" fill="#713f12">§</text>
      <path d="M54.8 102.8 A6 6 0 0 1 58.8 100" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0.8"/>`;
  })(),
  dienstausweis: `<defs>${vl("gh", "da", ["#1e3a8a", "#3b82f6", "#1e40af"])}</defs>
    <path d="M36 86 L57.4 102 M84 86 L62.6 102" stroke="#172554" stroke-width="5" stroke-linecap="round"/><path d="M36 86 L57.4 102 M84 86 L62.6 102" stroke="url(#ghda)" stroke-width="3" stroke-linecap="round"/>
    <path d="M40 89 l1.6 1.2 M46 93.5 l1.6 1.2 M52 98 l1.6 1.2 M80 89 l-1.6 1.2 M74 93.5 l-1.6 1.2 M68 98 l-1.6 1.2" stroke="#bfdbfe" stroke-width="1" stroke-linecap="round"/>
    <rect x="57.6" y="100.6" width="4.8" height="4.4" rx="1" fill="#cbd5e1" ${U} ${sw(1.1)}/>
    <rect x="50.6" y="104.6" width="18.8" height="13.4" rx="2" fill="#f8fafc" ${U} ${sw(1.8)}/><rect x="50.6" y="104.6" width="18.8" height="3.6" rx="1.6" fill="#1d4ed8"/>
    <circle cx="55.6" cy="113" r="2.9" fill="var(--taler-gold)" stroke="#3a2710" stroke-width="0.8"/><circle cx="54.7" cy="112.6" r="0.45" fill="#3a2710"/><circle cx="56.5" cy="112.6" r="0.45" fill="#3a2710"/>
    <path d="M60.4 111 h7 M60.4 113.2 h5.4 M60.4 115.4 h6.4" stroke="#64748b" stroke-width="0.9" stroke-linecap="round"/>`,
};

/** Ohrringe: hängen links und rechts am Münzrand (bei x ≈ 20,6 bzw. 99,4), wo die Brillenbügel enden. s = Seite (−1 links, 1 rechts). Verläufe „go“. */
const OHR_X = [[20.6, -1], [99.4, 1]];
const OHR_DEFS = `<defs><radialGradient id="gope" cx="0.36" cy="0.32" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.55" stop-color="#f5f0ea"/><stop offset="1" stop-color="#bfb5a8"/></radialGradient>${vl("go", "gd", GOLDV, { x2: 1, y2: 1 })}${vl("go", "hz", ["#fb7185", "#e11d48", "#881337"], { x2: 0, y2: 1 })}${vl("go", "sa", ["#93c5fd", "#2563eb", "#1e3a8a"], { x2: 1, y2: 1 })}</defs>`;
const perle = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#gope)" stroke="#57534e" stroke-width="1"/><circle cx="${(x - r * 0.34).toFixed(1)}" cy="${(y - r * 0.36).toFixed(1)}" r="${(r * 0.3).toFixed(1)}" fill="#fff"/>`;
const haken = (x, s, bis = 67.5) => `<path d="M${x} 62.5 q${s * -1.6} ${(bis - 62.5) / 2} 0 ${bis - 62.5}" fill="none" stroke="#5b3a0a" stroke-width="2.2" stroke-linecap="round"/><path d="M${x} 62.5 q${s * -1.6} ${(bis - 62.5) / 2} 0 ${bis - 62.5}" fill="none" stroke="#f5c542" stroke-width="1.1" stroke-linecap="round"/>`;
const beide = (f) => OHR_DEFS + OHR_X.map(([x, s]) => f(x, s)).join("");
const funkel = (x, y, r = 1.6) => `<path d="M${x} ${y - r} l${r * 0.3} ${r * 0.7} ${r * 0.7} ${r * 0.3} -${r * 0.7} ${r * 0.3} -${r * 0.3} ${r * 0.7} -${r * 0.3} -${r * 0.7} -${r * 0.7} -${r * 0.3} ${r * 0.7} -${r * 0.3}z" fill="#fff"/>`;
const OHR = {
  perlenohrringe: beide((x, s) => `${haken(x, s)}${perle(x, 61, 2.3)}${perle(x, 71.4, 3.8)}`),
  creolen: beide((x) => `<circle cx="${x}" cy="69" r="6.2" fill="none" stroke="#3a2710" stroke-width="4"/><circle cx="${x}" cy="69" r="6.2" fill="none" stroke="url(#gogd)" stroke-width="2.4"/>
    <path d="M${x - 4.4} 65.2 A6.2 6.2 0 0 1 ${x + 1.6} 63" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.85"/>`),
  herzohrringe: beide((x, s) => `${haken(x, s)}<path d="M${x} 76 l-4.3-4.2 a2.5 2.5 0 0 1 4.3-3.1 a2.5 2.5 0 0 1 4.3 3.1z" fill="url(#gohz)" ${U} ${sw(1.1)} stroke-linejoin="round"/>
    <path d="M${x - 2.9} 70.6 q.2 -1.5 1.6 -1.6" stroke="#fff" stroke-width="0.9" fill="none" stroke-linecap="round" opacity="0.9"/>`),
  paragrafohrringe: beide((x, s) => `${haken(x, s)}<circle cx="${x}" cy="72.2" r="4.6" fill="url(#gogd)" ${U} ${sw(1.2)}/><circle cx="${x}" cy="72.2" r="3.4" fill="none" stroke="#8a5a0c" stroke-width="0.5" opacity="0.7"/>
    <text x="${x}" y="74.6" text-anchor="middle" font-size="6.4" font-weight="900" font-family="Georgia, serif" fill="#713f12">§</text><path d="M${x - 3} 70.4 q.6 -1.6 2.4 -2" stroke="#fff" stroke-width="0.8" fill="none" stroke-linecap="round" opacity="0.8"/>`),
  diamantstecker: beide((x) => `<path d="M${x - 3.4} 61.4 L${x - 1.8} 59 H${x + 1.8} L${x + 3.4} 61.4 L${x} 66Z" fill="#e0f2fe" ${U} ${sw(1)} stroke-linejoin="round"/>
    <path d="M${x - 3.4} 61.4 L${x - 1.8} 59 L${x - 0.9} 61.4Z M${x + 0.9} 61.4 L${x + 1.8} 59 L${x + 3.4} 61.4Z" fill="#7dd3fc"/><path d="M${x - 0.9} 61.4 L${x} 66 L${x + 0.9} 61.4Z" fill="#bae6fd"/><path d="M${x - 3.4} 61.4 L${x} 66 L${x - 0.9} 61.4Z" fill="#fff"/>
    ${funkel(x + 3.6, 57.4, 2)}`),
  saphirtropfen: beide((x, s) => `${haken(x, s, 66.4)}<path d="M${x} 66 Q${x + 4.6} 72.6 ${x + 3.4} 76 Q${x} 79.6 ${x - 3.4} 76 Q${x - 4.6} 72.6 ${x} 66Z" fill="url(#gosa)" ${U} ${sw(1.1)} stroke-linejoin="round"/>
    <path d="M${x - 1.4} 66 h2.8 l.5 1.9 h-3.8z" fill="url(#gogd)" stroke="#3a2710" stroke-width="0.6"/><path d="M${x - 1.9} 72 Q${x - 2.5} 74.6 ${x - 1.2} 76.2" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.85"/>${funkel(x + 2.4, 70.4, 1.3)}`),
  sternohrringe: beide((x, s) => `${haken(x, s, 66.6)}<path d="M${x} 66.4 l1.5 3.1 3.4 .5 -2.5 2.4 .6 3.4 -3-1.6 -3 1.6 .6-3.4 -2.5-2.4 3.4-.5z" fill="url(#gogd)" ${U} ${sw(1.1)} stroke-linejoin="round"/>
    <path d="M${x - 1.6} 70 l1 -1.6" stroke="#fff" stroke-width="0.8" stroke-linecap="round" opacity="0.9"/><path d="M${x} 76.6 V79.4" stroke="#f5c542" stroke-width="0.9"/><path d="M${x} 79 l.8 1.6 1.7 .3 -1.2 1.2 .3 1.7 -1.6-.8 -1.6 .8 .3-1.7 -1.2-1.2 1.7-.3z" fill="url(#gogd)" stroke="#3a2710" stroke-width="0.6" stroke-linejoin="round"/>`),
};

// ---------------------------------------------------------------- Gesicht: Make-up und Wimpern
// Augen offen: Ellipsen um (47|59) und (73|59), rx 3,7, ry 4,7; „froh“: Bögen von x−4,5 bis x+4,5 mit Scheitel bei y ≈ 57,5.
// Der Mund ist je Stimmung ein Strich (p.mund) oder der offene Lachmund (null).
const AUGE_X = [47, 73];
const MUND_OFFEN = "M50.5 70.5 Q60 86 69.5 70.5 Z";
/** Wimpern: vier geschwungene Härchen am oberen äußeren Lidrand, außen am längsten. */
function wimpern(art) {
  return AUGE_X.map((cx, i) => {
    const s = i ? 1 : -1; // nach außen
    const basis = art === "froh"
      ? [0.04, 0.17, 0.3, 0.43].map((t) => [cx + s * 4.5 * (1 - 2 * t), 60.5 - 12 * t * (1 - t)])
      : [200, 225, 250, 272].map((w) => { const r = (w * Math.PI) / 180; return [cx - s * 3.7 * Math.cos(r), 59 + 4.7 * Math.sin(r)]; });
    return basis.map(([bx, by], k) => {
      const laenge = [5, 4.4, 3.7, 3][k], winkel = ((s > 0 ? -35 - 18 * k : -145 + 18 * k) * Math.PI) / 180;
      const tx = bx + laenge * Math.cos(winkel), ty = by + laenge * Math.sin(winkel);
      const cx2 = bx + laenge * 0.6 * Math.cos(winkel + s * 0.35), cy2 = by + laenge * 0.6 * Math.sin(winkel + s * 0.35); // Schwung nach oben
      return `<path d="M${bx.toFixed(1)} ${by.toFixed(1)} Q${cx2.toFixed(1)} ${cy2.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}" class="t-strich" stroke-width="${(1.35 - k * 0.12).toFixed(2)}"/>`;
    }).join("");
  }).join("");
}
/** Make-up: Lidschatten mit Schimmer, Lidstrich mit Schwung, Rouge mit Highlighter, glänzende Lippen. */
function makeup(id, art, mund) {
  const defs = `<defs>
    <linearGradient id="${id}ls" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7e22ce"/><stop offset="0.4" stop-color="#c026d3" stop-opacity="0.9"/><stop offset="0.75" stop-color="#f472b6" stop-opacity="0.55"/><stop offset="1" stop-color="#fbcfe8" stop-opacity="0.1"/></linearGradient>
    <radialGradient id="${id}rg" cx="0.5" cy="0.55" r="0.5"><stop offset="0" stop-color="#fb7185" stop-opacity="0.75"/><stop offset="0.6" stop-color="#f472b6" stop-opacity="0.35"/><stop offset="1" stop-color="#f472b6" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}lp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e88a9b"/><stop offset="1" stop-color="#c9637a"/></linearGradient></defs>`;
  const froh = art === "froh";
  const lid = AUGE_X.map((cx, i) => {
    const s = i ? 1 : -1, y = froh ? 57.6 : 54.6;
    const schatten = `<path d="M${cx - 6.8} ${y + 3.2} Q${cx + s * 0.8} ${y - 10.5} ${cx + 6.8} ${y + 3.2} Q${cx + s * 2.4} ${y + 0.4} ${cx} ${y + 0.6} Q${cx - s * 2.4} ${y + 0.4} ${cx - 6.8} ${y + 3.2}Z" fill="url(#${id}ls)"/>`;
    const glitzer = [[-2.4, -2.6, 0.55], [1.2, -3.6, 0.45], [3.3, -1.4, 0.4]].map(([dx, dy, r]) => `<circle cx="${cx + s * dx}" cy="${y + dy}" r="${r}" fill="#fff" opacity="0.9"/>`).join("");
    // Lidstrich: folgt dem oberen Lid und läuft außen als spitzer Schwung aus
    const ax = cx + s * 3.5, ay = froh ? 59.6 : 57.4;
    const strich = froh ? `<path d="M${cx - s * 1} ${y + 0.9} Q${cx + s * 3.2} ${y + 1.6} ${cx + s * 5.6} ${y + 0.2} Q${cx + s * 3.8} ${y + 2.6} ${cx + s * 3.6} ${y + 3.2}" class="t-tinte"/>`
      : `<path d="M${cx - s * 2.2} ${ay - 3.4} Q${ax - s * 0.6} ${ay - 3.4} ${ax + s * 4.6} ${ay - 5.6} Q${ax + s * 1.6} ${ay - 1.2} ${ax - s * 0.4} ${ay - 0.2} Q${cx + s * 1.2} ${ay - 1.4} ${cx - s * 2.2} ${ay - 3.4}Z" class="t-tinte"/>`;
    return schatten + glitzer + strich;
  }).join("");
  const wangen = [37.5, 82.5].map((x, i) => `<ellipse cx="${x}" cy="72" rx="7.6" ry="4.8" fill="url(#${id}rg)"/>
    <path d="M${x + (i ? 1 : -1) * 5.4} 66.4 Q${x} 64.6 ${x - (i ? 1 : -1) * 4} 66" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity="0.45"/>`).join("");
  const lippen = mund
    ? `<path d="${mund}" stroke="url(#${id}lp)" stroke-width="3.3" fill="none" stroke-linecap="round" opacity="0.8"/><path d="${mund}" stroke="#fff1f2" stroke-width="0.7" fill="none" stroke-linecap="round" stroke-dasharray="2 30" stroke-dashoffset="-6.5" opacity="0.7"/>`
    : `<path d="${MUND_OFFEN}" stroke="url(#${id}lp)" stroke-width="1.8" fill="none" stroke-linejoin="round" opacity="0.8"/><ellipse cx="62.6" cy="77.6" rx="1.3" ry="0.5" fill="#fff1f2" opacity="0.7" transform="rotate(-18 62.6 77.6)"/>`;
  return { unter: defs + wangen + lid, ueber: lippen };
}
const GESICHT = {
  makeup: (h) => ({ ...makeup(h.id, h.augen, h.mund), wimpern: "" }),
  wimpern: (h) => ({ unter: "", ueber: "", wimpern: wimpern(h.augen) }),
  glamour: (h) => ({ ...makeup(h.id, h.augen, h.mund), wimpern: wimpern(h.augen) }),
};


/** Gegenstände in Talers linker Hand (Mittelpunkt = Hand). */
// Gegenstände in der Hand: (x, y) = Mitte der Hand, id = eindeutiges Kürzel für Verläufe. Gezeichnet wird zwischen Handfläche und Fingern,
// der Griff läuft deshalb immer durch (x, y). GRIFF = [Richtung "v" senkrecht | "h" waagerecht, Drehung in Grad].
const GRIFF = { faehnchen: ["v", -4], kaffee: ["v", 0], fueller: ["v", -40], gesetzbuch: ["v", -8], ordner: ["v", -6], taschenrechner: ["v", -6], lupe: ["v", -24], stempel: ["v", 0], pokal: ["v", 0],
  henkeltasche: ["h", 0], kettentasche: ["h", 0], buegeltasche: ["h", 0] };
const gross = (x, y, s) => `<g transform="translate(${x} ${y}) scale(1.3) translate(${-x} ${-y})">${s}</g>`;
const HAND = {
  faehnchen: (x, y, id) => `<defs>${vl(id, "fa", ["#4338ca", "#6366f1", "#3730a3", "#4f46e5"])}${vl(id, "fs", ["#5b3a1a", "#a16207", "#5b3a1a"])}</defs>
    <g transform="rotate(-4 ${x} ${y})">
    <path d="M${x} ${y + 10} V${y - 31}" stroke="#2b1a0a" stroke-width="4" stroke-linecap="round"/><path d="M${x} ${y + 10} V${y - 31}" stroke="url(#${id}fs)" stroke-width="2.3" stroke-linecap="round"/>
    <path d="M${x - 0.3} ${y - 29.5} C${x - 5} ${y - 33.5} ${x - 8} ${y - 26.5} ${x - 15} ${y - 29.5} L${x - 13.2} ${y - 18} C${x - 8} ${y - 15} ${x - 5} ${y - 21} ${x - 0.3} ${y - 17}Z" fill="url(#${id}fa)" ${U} ${sw(1.7)} stroke-linejoin="round"/>
    <path d="M${x - 5.6} ${y - 30} C${x - 6.8} ${y - 26} ${x - 6.4} ${y - 22} ${x - 5.2} ${y - 19}" stroke="#1e1b4b" stroke-opacity="0.35" stroke-width="2" fill="none"/>
    <path d="M${x - 1.6} ${y - 28.2} C${x - 4.6} ${y - 30.8} ${x - 7.4} ${y - 25.8} ${x - 13.4} ${y - 27.6}" stroke="#fff" stroke-opacity="0.4" stroke-width="0.9" fill="none" stroke-linecap="round"/>
    <path d="M${x - 9.6} ${y - 26.6} l1 2.1 2.3 .3 -1.7 1.6 .4 2.3 -2-1.1 -2.1 1.1 .4-2.3 -1.6-1.6 2.3-.3z" fill="#fde047" stroke="#a16207" stroke-width="0.6" stroke-linejoin="round"/>
    <circle cx="${x}" cy="${y - 32}" r="2.3" fill="#facc15" ${U} ${sw(1.3)}/><circle cx="${x - 0.7}" cy="${y - 32.7}" r="0.7" fill="#fff" opacity="0.8"/></g>`,
  kaffee: (x, y, id) => `<defs>${vl(id, "ka", ["#cbd5e1", "#ffffff", "#f1f5f9", "#94a3b8"])}</defs>
    <path d="M${x - 5} ${y - 5.5} Q${x + 4.6} ${y - 6.5} ${x + 4.6} ${y} Q${x + 4.6} ${y + 6.5} ${x - 5.6} ${y + 5.5}" stroke="#3a2710" stroke-width="5.4" fill="none" stroke-linecap="round"/>
    <path d="M${x - 5} ${y - 5.5} Q${x + 4.6} ${y - 6.5} ${x + 4.6} ${y} Q${x + 4.6} ${y + 6.5} ${x - 5.6} ${y + 5.5}" stroke="#f1f5f9" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M${x - 21} ${y - 9.5} H${x - 4.5} L${x - 6} ${y + 9} Q${x - 6.4} ${y + 11.5} ${x - 9} ${y + 11.5} H${x - 16.5} Q${x - 19.1} ${y + 11.5} ${x - 19.5} ${y + 9}Z" fill="url(#${id}ka)" ${U} ${sw(2)} stroke-linejoin="round"/>
    <ellipse cx="${x - 12.75}" cy="${y - 9.5}" rx="8.25" ry="2.5" fill="#f8fafc" ${U} ${sw(1.7)}/>
    <ellipse cx="${x - 12.75}" cy="${y - 9.3}" rx="6.5" ry="1.7" fill="#6b3f12"/><path d="M${x - 17} ${y - 9.6} q2 -1 4.4 -.6" stroke="#d6a66a" stroke-width="0.9" fill="none" stroke-linecap="round"/>
    <path d="M${x - 19.4} ${y - 1} H${x - 5.2} L${x - 5.6} ${y + 4} H${x - 19}Z" fill="var(--taler-gold, #f6b93b)" opacity="0.9"/>
    <text x="${x - 12.4}" y="${y + 3.2}" text-anchor="middle" font-size="5.4" font-weight="900" font-family="Georgia, serif" fill="#5b3a0a">§</text>
    <path d="M${x - 18.6} ${y - 6} Q${x - 19} ${y + 3} ${x - 17.6} ${y + 8.6}" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.9"/>
    <path d="M${x - 16} ${y - 14} q-2.4 -3 0 -6 q2.4 -3 0 -6 M${x - 10} ${y - 14} q-2.4 -3 0 -6 q2.4 -3 0 -5" stroke="#e2e8f0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>`,
  fueller: (x, y, id) => `<defs>${vl(id, "fu", ["#0f1d4a", "#2c4bb0", "#16286b", "#0b1438"])}${vl(id, "fg", ["#a16207", "#fde68a", "#ca8a04"])}</defs>
    <g transform="rotate(-40 ${x} ${y})">
    <rect x="${x - 3.3}" y="${y - 24}" width="6.6" height="33" rx="3" fill="url(#${id}fu)" ${U} ${sw(1.8)}/>
    <rect x="${x - 3.3}" y="${y - 12.6}" width="6.6" height="2.2" fill="url(#${id}fg)"/><rect x="${x - 3.3}" y="${y + 6}" width="6.6" height="1.8" fill="url(#${id}fg)"/>
    <path d="M${x + 2.2} ${y - 23} q2.6 .4 2.4 3.4 V${y - 14}" stroke="#3a2710" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M${x + 2.2} ${y - 23} q2.6 .4 2.4 3.4 V${y - 14}" stroke="url(#${id}fg)" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path d="M${x - 2.6} ${y + 9} H${x + 2.6} L${x + 2} ${y + 12} H${x - 2}Z" fill="#111827" ${U} ${sw(1.2)}/>
    <path d="M${x - 2.4} ${y + 12} H${x + 2.4} Q${x + 2} ${y + 17} ${x} ${y + 20.5} Q${x - 2} ${y + 17} ${x - 2.4} ${y + 12}Z" fill="url(#${id}fg)" ${U} ${sw(1.2)} stroke-linejoin="round"/>
    <path d="M${x} ${y + 15.2} V${y + 19.6}" stroke="#713f12" stroke-width="0.7"/><circle cx="${x}" cy="${y + 14.6}" r="0.75" fill="#713f12"/>
    <path d="M${x - 1.6} ${y - 21} V${y + 4.5}" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.45"/></g>`,
  gesetzbuch: (x, y, id) => `<defs>${vl(id, "gb", ["#7f1d1d", "#b91c1c", "#991b1b"])}</defs>
    <g transform="rotate(-8 ${x} ${y}) translate(5 1)">
    <path d="M${x - 21} ${y - 29} H${x - 1.6} Q${x} ${y - 29} ${x} ${y - 27.4} V${y + 3.4} Q${x} ${y + 5} ${x - 1.6} ${y + 5} H${x - 21} Q${x - 23} ${y + 5} ${x - 23} ${y + 3} V${y - 27} Q${x - 23} ${y - 29} ${x - 21} ${y - 29}Z" fill="#fdf6e3" ${U} ${sw(2)} stroke-linejoin="round"/>
    <path d="M${x - 20} ${y + 2.2} H${x - 1.5} M${x - 20} ${y + 3.6} H${x - 1.5}" stroke="#c9b98f" stroke-width="0.6"/>
    <path d="M${x - 21} ${y - 29} H${x - 3.6} Q${x - 2} ${y - 29} ${x - 2} ${y - 27.4} V${y - 0.4} Q${x - 2} ${y + 1.2} ${x - 3.6} ${y + 1.2} H${x - 21} Q${x - 23} ${y + 1.2} ${x - 23} ${y - 0.8} V${y - 27} Q${x - 23} ${y - 29} ${x - 21} ${y - 29}Z" fill="url(#${id}gb)" ${U} ${sw(1.6)} stroke-linejoin="round"/>
    <path d="M${x - 19.4} ${y - 28.4} V${y + 0.6}" stroke="#450a0a" stroke-opacity="0.55" stroke-width="1.5"/>
    <path d="M${x - 22.2} ${y - 23.5} h2.8 M${x - 22.2} ${y - 21.6} h2.8 M${x - 22.2} ${y - 6} h2.8 M${x - 22.2} ${y - 4.1} h2.8" stroke="#fcd34d" stroke-width="0.9"/>
    <rect x="${x - 17}" y="${y - 26}" width="12.4" height="24" rx="0.8" fill="none" stroke="#fcd34d" stroke-width="0.7" opacity="0.9"/>
    <text x="${x - 10.8}" y="${y - 9.4}" text-anchor="middle" font-size="12.5" font-weight="900" font-family="Georgia, serif" fill="#fde68a">§</text>
    <path d="M${x - 14.6} ${y - 22.2} h7.6" stroke="#fcd34d" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M${x - 9} ${y + 4.6} v6.4 l-1.6 -1.5 -1.6 1.5 v-6.4z" fill="#facc15" ${U} ${sw(0.9)} stroke-linejoin="round"/>
    <path d="M${x - 17.8} ${y - 27.6} V${y - 0.4}" stroke="#fff" stroke-opacity="0.22" stroke-width="1.2"/></g>`,
  ordner: (x, y, id) => `<defs>${vl(id, "or", ["#075985", "#0ea5e9", "#0369a1", "#0c4a6e"])}</defs>
    <g transform="rotate(-6 ${x} ${y}) translate(4 1)">
    <rect x="${x - 20}" y="${y - 30}" width="19" height="35" rx="2" fill="#e2e8f0" ${U} ${sw(2)}/>
    <rect x="${x - 20}" y="${y - 30}" width="15.5" height="35" rx="2" fill="url(#${id}or)" ${U} ${sw(1.6)}/>
    <path d="M${x - 3} ${y - 27} V${y + 2} M${x - 1.9} ${y - 27} V${y + 2}" stroke="#94a3b8" stroke-width="0.6"/>
    <rect x="${x - 17.4}" y="${y - 26.4}" width="10.3" height="12.4" rx="1" fill="#f8fafc" stroke="#0c4a6e" stroke-width="0.8"/>
    <path d="M${x - 15.6} ${y - 23} h6.6 M${x - 15.6} ${y - 20.4} h5 M${x - 15.6} ${y - 17.8} h6" stroke="#64748b" stroke-width="0.9" stroke-linecap="round"/>
    <circle cx="${x - 12.2}" cy="${y - 5}" r="3" fill="#0c4a6e" stroke="#e2e8f0" stroke-width="1.4"/><circle cx="${x - 12.2}" cy="${y - 5}" r="1.2" fill="#082f49"/>
    <path d="M${x - 20} ${y + 1.4} h3 M${x - 7.5} ${y + 1.4} h3" stroke="#e2e8f0" stroke-width="1.6"/>
    <path d="M${x - 18.6} ${y - 28} V${y + 3}" stroke="#fff" stroke-opacity="0.3" stroke-width="1.1"/></g>`,
  taschenrechner: (x, y, id) => `<defs>${vl(id, "tr", ["#1e293b", "#475569", "#334155"], { x2: 1, y2: 1 })}</defs>
    <g transform="rotate(-6 ${x} ${y}) translate(5 1)">
    <rect x="${x - 21}" y="${y - 28}" width="20" height="33" rx="3.2" fill="url(#${id}tr)" ${U} ${sw(2)}/>
    <rect x="${x - 18.6}" y="${y - 25.4}" width="15.2" height="8" rx="1.2" fill="#d9f99d" stroke="#0f172a" stroke-width="0.9"/>
    <text x="${x - 4.6}" y="${y - 19.2}" text-anchor="end" font-size="5.6" font-weight="700" font-family="ui-monospace, Menlo, monospace" fill="#1a2e05">19 %</text>
    <path d="M${x - 18} ${y - 24.6} h14" stroke="#fff" stroke-opacity="0.5" stroke-width="0.7"/>
    ${[0, 1, 2, 3].flatMap((r) => [0, 1, 2].map((c) => `<rect x="${x - 18.6 + c * 5.4}" y="${y - 14.6 + r * 4.6}" width="4.4" height="3.5" rx="1" fill="${c === 2 ? (r === 3 ? "#f97316" : "#94a3b8") : "#e2e8f0"}" stroke="#0f172a" stroke-width="0.5"/>`)).join("")}
    <path d="M${x - 19.4} ${y - 24} V${y + 1}" stroke="#fff" stroke-opacity="0.18" stroke-width="1"/></g>`,
  lupe: (x, y, id) => `<defs>${vl(id, "lu", ["#4a2c0f", "#b45309", "#5b3413"])}${vl(id, "lr", ["#f8fafc", "#64748b", "#e2e8f0", "#475569"], { x2: 1, y2: 1 })}
      <radialGradient id="${id}lg" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff" stop-opacity="0.75"/><stop offset="0.5" stop-color="#bae6fd" stop-opacity="0.4"/><stop offset="1" stop-color="#38bdf8" stop-opacity="0.5"/></radialGradient></defs>
    <g transform="rotate(-24 ${x} ${y})">
    <rect x="${x - 2.9}" y="${y - 9}" width="5.8" height="21" rx="2.7" fill="url(#${id}lu)" ${U} ${sw(1.7)}/>
    <rect x="${x - 2.4}" y="${y - 12}" width="4.8" height="4.4" rx="0.9" fill="url(#${id}lr)" ${U} ${sw(1.2)}/>
    <circle cx="${x}" cy="${y - 22}" r="10" fill="url(#${id}lg)"/>
    <circle cx="${x}" cy="${y - 22}" r="10" fill="none" ${U} ${sw(5)}/><circle cx="${x}" cy="${y - 22}" r="10" fill="none" stroke="url(#${id}lr)" stroke-width="3"/>
    <path d="M${x - 5.6} ${y - 26} A7 7 0 0 1 ${x - 0.6} ${y - 29}" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.9"/>
    <circle cx="${x + 4}" cy="${y - 18}" r="1" fill="#fff" opacity="0.6"/></g>`,
  stempel: (x, y, id) => `<defs>${vl(id, "st", ["#5b2c0a", "#c2681c", "#7c3d10"])}</defs>
    <rect x="${x - 2.6}" y="${y - 7}" width="5.2" height="15" fill="url(#${id}st)" ${U} ${sw(1.6)}/>
    <ellipse cx="${x}" cy="${y - 10.6}" rx="6" ry="5.2" fill="url(#${id}st)" ${U} ${sw(1.8)}/>
    <path d="M${x - 3.4} ${y - 13} q1.6 -1.8 4 -1.6" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M${x - 5} ${y + 7.6} H${x + 5} L${x + 11} ${y + 12} V${y + 15.6} H${x - 11} V${y + 12}Z" fill="url(#${id}st)" ${U} ${sw(1.8)} stroke-linejoin="round"/>
    <path d="M${x - 9.6} ${y + 12.4} H${x + 9.6}" stroke="#fde68a" stroke-opacity="0.5" stroke-width="0.8"/>
    <rect x="${x - 11.6}" y="${y + 15.6}" width="23.2" height="3.6" rx="1.2" fill="#dc2626" ${U} ${sw(1.5)}/>
    <path d="M${x - 9} ${y + 21.4} h4 M${x - 3} ${y + 21.4} h7 M${x + 6} ${y + 21.4} h3" stroke="#dc2626" stroke-width="1.1" stroke-linecap="round" opacity="0.55"/>`,
  // Handtaschen: Die Hand (x, y) greift oben Henkel bzw. Kette, die Tasche hängt darunter.
  henkeltasche: (x, y) => {
    const m = x - 2, o = y + 9, u = y + 27;
    return gross(x, y, `<path d="M${m + 6} ${o + 1} Q${m + 6} ${y - 2} ${x} ${y}" stroke="#5b210a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M${m - 12} ${o} H${m + 10} L${m + 12.5} ${u - 3} Q${m + 13} ${u} ${m + 10} ${u} H${m - 12} Q${m - 15} ${u} ${m - 14.5} ${u - 3}Z" fill="#b45309" ${U} ${sw(2)} stroke-linejoin="round"/>
    <path d="M${m + 4} ${o} H${m + 10} L${m + 12.5} ${u - 3} Q${m + 13} ${u} ${m + 10} ${u} H${m + 6}Z" fill="#7c2d12" fill-opacity="0.35"/>
    <path d="M${m - 10.5} ${o + 2.4} Q${m - 12} ${o + 9} ${m - 11} ${u - 4}" stroke="#fff" stroke-opacity="0.32" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M${m - 12} ${o} H${m + 10} L${m + 10.6} ${o + 5} H${m - 12.6}Z" fill="#92400e"/>
    <path d="M${m - 11.4} ${o + 6.4} H${m + 10.2} M${m - 13} ${u - 2.2} H${m + 11.6}" stroke="#fde68a" stroke-opacity="0.75" stroke-width="0.8" stroke-dasharray="1.4 1.2"/>
    <rect x="${m - 2.6}" y="${o + 3.4}" width="5.2" height="4.4" rx="1" fill="#facc15" ${U} ${sw(1.1)}/><circle cx="${m}" cy="${o + 5.6}" r="0.9" fill="#a16207"/>
    <circle cx="${m - 10}" cy="${u + 0.6}" r="1.1" fill="#facc15"/><circle cx="${m + 8}" cy="${u + 0.6}" r="1.1" fill="#facc15"/>
    <path d="M${m - 6} ${o + 1} Q${m - 6} ${y - 2} ${x} ${y}" stroke="#7c2d12" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M${m - 5.3} ${o - 1} Q${m - 5.6} ${y - 0.4} ${x - 1} ${y + 0.6}" stroke="#fdba74" stroke-opacity="0.55" stroke-width="0.8" fill="none" stroke-linecap="round"/>`);
  },
  kettentasche: (x, y) => {
    const m = x - 2, o = y + 11, u = y + 27, links = [m - 11, o + 0.5], rechts = [m + 11, o + 0.5];
    // Kettenglieder von beiden Ecken zur Hand – abwechselnd hell und dunkel, quer bzw. längs
    const kette = (a) => Array.from({ length: 7 }, (_, i) => {
      const t = (i + 0.5) / 7, px = a[0] + (x - a[0]) * t, py = a[1] + (y - a[1]) * t - Math.sin(t * Math.PI) * 1.2;
      return `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${i % 2 ? 0.9 : 1.6}" ry="${i % 2 ? 1.6 : 0.9}" fill="none" stroke="${i % 2 ? "#ca8a04" : "#facc15"}" stroke-width="0.9"/>`;
    }).join("");
    const steppung = [-12, -6, 0, 6, 12, 18].map((d) => `<path d="M${m + d - 8} ${o} L${m + d + 8} ${u}" stroke="#4b5563" stroke-width="0.7"/><path d="M${m + d + 8} ${o} L${m + d - 8} ${u}" stroke="#4b5563" stroke-width="0.7"/>`).join("");
    return gross(x, y, `${kette(rechts)}
    <rect x="${m - 12.5}" y="${o}" width="25" height="${u - o}" rx="3" fill="#111827" ${U} ${sw(2)}/>
    <svg x="${m - 12}" y="${o + 0.5}" width="24" height="${u - o - 1}" viewBox="${m - 12} ${o + 0.5} 24 ${u - o - 1}" overflow="hidden">${steppung}</svg>
    <path d="M${m - 12.5} ${o + 3} Q${m} ${o + 12} ${m + 12.5} ${o + 3} V${o + 2} Q${m + 12.5} ${o} ${m + 10} ${o} H${m - 10} Q${m - 12.5} ${o} ${m - 12.5} ${o + 2}Z" fill="#1f2937" ${U} ${sw(1.4)}/>
    <path d="M${m - 9} ${o + 2.6} Q${m} ${o + 8} ${m + 9} ${o + 2.6}" stroke="#fff" stroke-opacity="0.18" stroke-width="1" fill="none"/>
    <rect x="${m - 3.4}" y="${o + 5.2}" width="6.8" height="4.6" rx="1.4" fill="#facc15" ${U} ${sw(1)}/><rect x="${m - 1.6}" y="${o + 6.3}" width="3.2" height="2.4" rx="0.8" fill="#a16207"/>
    <path d="M${m - 10.5} ${u - 3} Q${m - 11} ${o + 13} ${m - 9.5} ${o + 9}" stroke="#fff" stroke-opacity="0.22" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <circle cx="${links[0]}" cy="${links[1]}" r="1.3" fill="#facc15"/><circle cx="${rechts[0]}" cy="${rechts[1]}" r="1.3" fill="#facc15"/>
    ${kette(links)}`);
  },
  buegeltasche: (x, y) => {
    const m = x - 2, o = y + 12, u = y + 28;
    return gross(x, y, `<path d="M${m - 8.5} ${o - 0.5} Q${m - 9} ${y - 2} ${x} ${y} Q${m + 9} ${y - 2} ${m + 8.5} ${o - 0.5}" stroke="#4c0519" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M${m - 12} ${o} Q${m - 16.5} ${u - 2} ${m - 8} ${u} H${m + 8} Q${m + 16.5} ${u - 2} ${m + 12} ${o}Z" fill="#9f1239" ${U} ${sw(2)} stroke-linejoin="round"/>
    <path d="M${m + 3} ${o + 1} Q${m + 14} ${o + 4} ${m + 10.5} ${u - 0.5} H${m + 7} Q${m + 11} ${o + 8} ${m + 3} ${o + 1}Z" fill="#4c0519" fill-opacity="0.35"/>
    <ellipse cx="${m - 5.5}" cy="${o + 8}" rx="3.2" ry="5" fill="#fff" fill-opacity="0.16" transform="rotate(14 ${m - 5.5} ${o + 8})"/>
    <path d="M${m - 7} ${u - 4.5} q2 -1.4 4 0 t4 0 t4 0" stroke="#fda4af" stroke-opacity="0.45" stroke-width="0.7" fill="none"/>
    <path d="M${m - 12.6} ${o + 1.2} Q${m} ${o - 3.2} ${m + 12.6} ${o + 1.2}" stroke="#ca8a04" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M${m - 12.6} ${o + 1.2} Q${m} ${o - 3.2} ${m + 12.6} ${o + 1.2}" stroke="#fde047" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <circle cx="${m - 1.5}" cy="${o - 3}" r="1.9" fill="#facc15" ${U} ${sw(0.9)}/><circle cx="${m + 1.5}" cy="${o - 3}" r="1.9" fill="#facc15" ${U} ${sw(0.9)}/>
    <circle cx="${m - 2}" cy="${o - 3.6}" r="0.6" fill="#fff" fill-opacity="0.8"/><circle cx="${m + 1}" cy="${o - 3.6}" r="0.6" fill="#fff" fill-opacity="0.8"/>`);
  },
  pokal: (x, y, id) => `<defs>${vl(id, "po", ["#a16207", "#fde047", "#eab308", "#fef08a", "#a16207"])}</defs>
    <path d="M${x - 10} ${y - 23} Q${x - 19} ${y - 24} ${x - 17} ${y - 15.5} Q${x - 15.4} ${y - 10} ${x - 8} ${y - 10.5} M${x + 10} ${y - 23} Q${x + 19} ${y - 24} ${x + 17} ${y - 15.5} Q${x + 15.4} ${y - 10} ${x + 8} ${y - 10.5}" stroke="#3a2710" stroke-width="4.4" fill="none" stroke-linecap="round"/>
    <path d="M${x - 10} ${y - 23} Q${x - 19} ${y - 24} ${x - 17} ${y - 15.5} Q${x - 15.4} ${y - 10} ${x - 8} ${y - 10.5} M${x + 10} ${y - 23} Q${x + 19} ${y - 24} ${x + 17} ${y - 15.5} Q${x + 15.4} ${y - 10} ${x + 8} ${y - 10.5}" stroke="#eab308" stroke-width="2" fill="none" stroke-linecap="round"/>
    <rect x="${x - 2.4}" y="${y - 7}" width="4.8" height="15" fill="url(#${id}po)" ${U} ${sw(1.6)}/>
    <path d="M${x - 11.6} ${y - 27} H${x + 11.6} V${y - 19} Q${x + 11.6} ${y - 6.5} ${x} ${y - 6.5} Q${x - 11.6} ${y - 6.5} ${x - 11.6} ${y - 19}Z" fill="url(#${id}po)" ${U} ${sw(2)} stroke-linejoin="round"/>
    <ellipse cx="${x}" cy="${y - 27}" rx="11.6" ry="2.4" fill="#fef9c3" ${U} ${sw(1.6)}/><ellipse cx="${x}" cy="${y - 26.8}" rx="9.4" ry="1.5" fill="#a16207"/>
    <path d="M${x} ${y - 21.6} l1.5 3 3.3 .5 -2.4 2.3 .6 3.3 -3-1.6 -3 1.6 .6-3.3 -2.4-2.3 3.3-.5z" fill="#fffbeb" stroke="#a16207" stroke-width="0.7" stroke-linejoin="round"/>
    <path d="M${x - 8.6} ${y - 23.5} Q${x - 9} ${y - 15} ${x - 5.4} ${y - 10.6}" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.75"/>
    <path d="M${x - 6} ${y + 7.6} H${x + 6} L${x + 7.4} ${y + 11} H${x - 7.4}Z" fill="url(#${id}po)" ${U} ${sw(1.6)} stroke-linejoin="round"/>
    <rect x="${x - 9.4}" y="${y + 11}" width="18.8" height="4.6" rx="1.2" fill="#5b3413" ${U} ${sw(1.6)}/><rect x="${x - 4.6}" y="${y + 12.2}" width="9.2" height="2.2" rx="0.5" fill="#fde047"/>`,
};

/** Auren (hinter Taler). Verläufe mit festem Präfix „gu“. */
const AURA = {
  funkeln: (() => {
    const f = (x, y, s, i) => `<circle cx="${x}" cy="${y}" r="${s * 1.5}" fill="url(#gufu)"/><path class="t-funke" style="--i:${i}" d="M${x} ${y - s} Q${x + s * 0.16} ${y - s * 0.16} ${x + s} ${y} Q${x + s * 0.16} ${y + s * 0.16} ${x} ${y + s} Q${x - s * 0.16} ${y + s * 0.16} ${x - s} ${y} Q${x - s * 0.16} ${y - s * 0.16} ${x} ${y - s}Z" fill="#fff8dc" stroke="var(--taler-gold)" stroke-width="0.5"/>`;
    return `<defs><radialGradient id="gufu"><stop offset="0" stop-color="var(--taler-hell)" stop-opacity="0.55"/><stop offset="1" stop-color="var(--taler-hell)" stop-opacity="0"/></radialGradient></defs>` +
      f(10, 30, 6.5, 0) + f(110, 24, 5.5, 1) + f(112, 80, 5, 2) + f(8, 84, 4.4, 3) + f(100, 4, 3.8, 1) + f(18, 8, 3.8, 2) + f(60, -4, 3, 3) + f(114, 52, 2.6, 0);
  })(),
  herzen: `<defs>${vl("gu", "he", ["#fda4af", "#f43f5e", "#be123c"], { x2: 0, y2: 1 })}</defs>` + [[12, 34, 0.95, 0], [106, 26, 0.75, 1], [110, 76, 0.62, 2], [10, 82, 0.58, 3], [96, 2, 0.45, 2], [24, 6, 0.5, 1]].map(([x, y, s, i]) =>
    `<g class="a-schwebe" style="--i:${i}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M0 9 L-8 1 Q-11 -3 -8 -6 Q-4 -9 0 -4 Q4 -9 8 -6 Q11 -3 8 1Z" fill="url(#guhe)" stroke="#881337" stroke-width="1.2" stroke-linejoin="round"/><path d="M-6.6 -2.6 Q-6.6 -5.4 -3.8 -5.6" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.85"/></g></g>`).join(""),
  strahlen: `<defs><radialGradient id="gust" gradientUnits="userSpaceOnUse" cx="60" cy="62" r="64"><stop offset="0.55" stop-color="var(--taler-hell)" stop-opacity="0.9"/><stop offset="1" stop-color="var(--taler-hell)" stop-opacity="0"/></radialGradient></defs>
    <circle cx="60" cy="62" r="52" fill="url(#gufu2)"/><defs><radialGradient id="gufu2"><stop offset="0.7" stop-color="var(--taler-hell)" stop-opacity="0.35"/><stop offset="1" stop-color="var(--taler-hell)" stop-opacity="0"/></radialGradient></defs>
    <g class="a-dreh" style="transform-origin:60px 62px">${Array.from({ length: 24 }, (_, i) => `<path d="M${i % 2 ? 58.2 : 57} 62 L60 ${i % 2 ? 6 : -4} L${i % 2 ? 61.8 : 63} 62Z" transform="rotate(${i * 15} 60 62)" fill="url(#gust)" opacity="${i % 2 ? 0.5 : 0.85}"/>`).join("")}</g>`,
  sternenkranz: `<defs>${vl("gu", "sk", ["#fef9c3", "#fde047", "#ca8a04"], { x2: 0, y2: 1 })}</defs><g class="a-dreh langsam" style="transform-origin:60px 62px">${Array.from({ length: 12 }, (_, i) => {
    const w = (i / 12) * Math.PI * 2, x = 60 + Math.cos(w) * 55, y = 62 + Math.sin(w) * 55;
    return `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${i % 2 ? 0.75 : 1.15})" d="M0 -5 l1.5 3.2 3.5 .5 -2.5 2.4 .6 3.5 -3.1-1.7 -3.1 1.7 .6-3.5 -2.5-2.4 3.5-.5z" fill="url(#gusk)" stroke="#854d0e" stroke-width="0.9" stroke-linejoin="round"/>`;
  }).join("")}</g>`,
  heiligenschein: `<defs>${vl("gu", "hs", ["#ca8a04", "#fef08a", "#fde047", "#fffbeb", "#ca8a04"])}</defs>
    <ellipse cx="60" cy="10" rx="24" ry="6.5" fill="none" stroke="#fde047" stroke-width="7" opacity="0.35" class="a-glanz"/>
    <ellipse cx="60" cy="10" rx="24" ry="6.5" fill="none" stroke="#854d0e" stroke-width="5.6"/><ellipse cx="60" cy="10" rx="24" ry="6.5" fill="none" stroke="url(#guhs)" stroke-width="3.8"/>
    <path d="M40 7.4 Q50 3.6 62 3.6" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.9"/>`,
  flammen: `<defs><linearGradient id="gufl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dc2626"/><stop offset="0.55" stop-color="#f97316"/><stop offset="0.85" stop-color="#f97316" stop-opacity="0.6"/><stop offset="1" stop-color="#f97316" stop-opacity="0"/></linearGradient>
      <linearGradient id="gufm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fb923c"/><stop offset="0.6" stop-color="#facc15"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/></linearGradient>
      <linearGradient id="gufi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde047"/><stop offset="0.7" stop-color="#fffbeb"/><stop offset="1" stop-color="#fffbeb" stop-opacity="0"/></linearGradient></defs>
    <g class="a-flacker" style="transform-origin:60px 110px">
    <path d="M18 116 Q0 82 16 50 Q17 68 27 73 Q20 46 40 22 Q39 50 50 55 Q46 30 60 6 Q74 30 70 55 Q81 50 80 22 Q100 46 93 73 Q103 68 104 50 Q120 82 102 116Z" fill="url(#gufl)"/>
    <path d="M30 116 Q18 90 28 66 Q32 80 40 82 Q36 62 49 46 Q51 68 58 71 Q57 52 64 40 Q72 58 69 73 Q78 68 80 54 Q94 78 90 116Z" fill="url(#gufm)"/>
    <path d="M42 116 Q36 98 44 84 Q47 94 52 95 Q51 82 60 70 Q68 84 67 96 Q73 92 75 84 Q84 100 78 116Z" fill="url(#gufi)" opacity="0.85"/></g>
    <circle class="a-schwebe" style="--i:1" cx="22" cy="30" r="1.6" fill="#fdba74"/><circle class="a-schwebe" style="--i:2" cx="98" cy="18" r="1.3" fill="#fde047"/><circle class="a-schwebe" style="--i:3" cx="74" cy="2" r="1.1" fill="#fb923c"/>`,
  paragrafen: [[11, 30, 15, 0, -14], [107, 22, 12, 1, 12], [112, 76, 10, 2, -8], [9, 82, 10, 3, 10], [94, 0, 8, 2, 18], [26, 4, 8.5, 1, -20]].map(([x, y, g, i, w]) =>
    `<g class="a-schwebe" style="--i:${i}"><text x="${x + 0.6}" y="${y + 0.7}" text-anchor="middle" font-size="${g}" font-weight="900" font-family="Georgia, 'Times New Roman', serif" fill="var(--taler-dunkel)" transform="rotate(${w} ${x} ${y})">§</text><text x="${x}" y="${y}" text-anchor="middle" font-size="${g}" font-weight="900" font-family="Georgia, 'Times New Roman', serif" fill="var(--taler-hell)" stroke="var(--taler-tief)" stroke-width="0.5" transform="rotate(${w} ${x} ${y})">§</text></g>`).join(""),
  muenzregen: `<defs><radialGradient id="gumz" cx="0.36" cy="0.32" r="0.8"><stop offset="0" stop-color="var(--taler-hell)"/><stop offset="0.6" stop-color="var(--taler-gold)"/><stop offset="1" stop-color="var(--taler-tief)"/></radialGradient></defs><g class="a-dreh langsam" style="transform-origin:60px 62px">${Array.from({ length: 9 }, (_, i) => {
    const w = (i / 9) * Math.PI * 2, x = (60 + Math.cos(w) * 56).toFixed(1), y = (62 + Math.sin(w) * 56).toFixed(1), r = i % 3 === 0 ? 5.4 : 4, q = i % 2 ? 0.55 : 1;
    return `<g transform="translate(${x} ${y}) rotate(${i * 40}) scale(${q} 1)"><circle r="${r}" fill="url(#gumz)" stroke="#3a2710" stroke-width="1.3"/><circle r="${(r * 0.68).toFixed(1)}" fill="none" stroke="var(--taler-hell)" stroke-width="0.7" opacity="0.9"/><path d="M${(-r * 0.5).toFixed(1)} ${(-r * 0.3).toFixed(1)} A${(r * 0.6).toFixed(1)} ${(r * 0.6).toFixed(1)} 0 0 1 ${(r * 0.1).toFixed(1)} ${(-r * 0.6).toFixed(1)}" stroke="#fff" stroke-width="0.8" fill="none" stroke-linecap="round" opacity="0.8"/></g>`;
  }).join("")}</g>`,
};

/** Grafik-Bausteine eines Outfits für maskottchen.js: {farben, hinten, kopf, augen (null = Standardbrille), hals, ohr, hand(x, y)} */
export function outfitTeile(o = STANDARD) {
  const m = METALL[o.metall];
  return {
    farben: m ? `--taler-hell:${m[0]};--taler-gold:${m[1]};--taler-tief:${m[2]};--taler-dunkel:${m[3]};` : "",
    edel: EDEL[o.metall] || null, edelAussen: EDEL_AUSSEN[o.metall] || "", koerper: EDEL_KOERPER[o.metall] || null, klasse: EDEL[o.metall] ? `m-${o.metall}` : "",
    hinten: AURA[o.aura] || "",
    kopf: KOPF[o.kopf] || "", kopfSchatten: !!KOPF[o.kopf] && !["lorbeerkranz", "kopfhoerer", "augenschirm"].includes(o.kopf),
    augen: o.augen in AUGEN ? AUGEN[o.augen] : null,
    hals: HALS[o.hals] || "",
    ohr: OHR[o.ohr] || "",
    kappe: KAPPE[o.maske] ? (id, art) => KAPPE[o.maske](id, art, { rosa: ["makeup", "glamour"].includes(o.gesicht), wimpern: ["wimpern", "glamour"].includes(o.gesicht) }) : null,
    gesicht: GESICHT[o.gesicht] || null,
    hand: HAND[o.hand] || null, griff: GRIFF[o.hand] || ["v", 0],
  };
}
