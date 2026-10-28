// Maskottchen „Taler“: eine goldene Münze mit geriffeltem Rand, Studierbrille und kleinem eingeprägten §.
// Begrüßt auf der Startseite, lobt bei richtigen und muntert bei falschen Antworten auf.
// Reines SVG (keine Bilddatei); Farben über die CSS-Variablen --taler-*; Bewegung in style.css (.taler …),
// bei „Bewegung reduzieren“ abgeschaltet.

import { outfitTeile, STANDARD } from "./garderobe.js";

let nr = 0;
// Getragenes Outfit (Garderobe); gilt für jeden Taler, der kein eigenes Outfit mitbekommt
let aktuellesOutfit = STANDARD;
export const talerOutfitSetzen = (o) => { aktuellesOutfit = o || STANDARD; };

/** Arm als Doppelstrich (Umriss + Füllung) mit Hand am Ende. */
const arm = (d, hx, hy, extra = "") =>
  `<path d="${d}" class="t-umriss" stroke-width="9" fill="none" stroke-linecap="round"/>
   <path d="${d}" stroke="var(--taler-tief)" stroke-width="4.6" fill="none" stroke-linecap="round"/>
   <circle cx="${hx}" cy="${hy}" r="5.4" fill="var(--taler-gold)" class="t-umriss" stroke-width="2.4"/>${extra}`;

const POSE = {
  // linker Arm hängt, rechter Arm winkt
  hallo: {
    links: arm("M25 70 Q16 76 17 86", 17, 87),
    rechts: `<g class="t-winkarm">${arm("M95 62 Q108 53 106 38", 106, 37)}</g>`,
    augen: "offen", mund: "M52.5 72.5 Q60 80 67.5 72.5", hand: [17, 87],
  },
  // beide Arme hoch, Augen zu Bögen, Mund offen
  jubeln: {
    links: arm("M25 62 Q12 50 14 35", 14, 34),
    rechts: arm("M95 62 Q108 50 106 35", 106, 34),
    augen: "froh", mund: null, hand: [14, 34],
  },
  // wartet neben dem Prüfen-Knopf: Arme unten, schaut nach oben zur Aufgabe
  warte: {
    links: arm("M25 70 Q16 76 17 86", 17, 87),
    rechts: arm("M95 70 Q104 76 103 86", 103, 87),
    augen: "offen", blick: [-0.8, -1.6], mund: "M55.5 74.5 Q60 77.5 64.5 74.5", hand: [17, 87],
  },
  // Daumen hoch, sanftes Lächeln, Augenbrauen mitfühlend
  mut: {
    links: arm("M25 70 Q16 76 17 86", 17, 87),
    rechts: arm("M95 70 Q106 70 107 60", 107, 58, `<rect x="101.2" y="45" width="5.6" height="11" rx="2.8" transform="rotate(-18 104 51)" fill="var(--taler-gold)" class="t-umriss" stroke-width="2.3"/><circle cx="107" cy="58" r="5.4" fill="var(--taler-gold)"/><path d="M103.5 57.5 h6 M104 60.5 h5.5" class="t-strich" stroke-width="1.4" opacity="0.6"/>`),
    augen: "offen", brauen: true, mund: "M54 74.5 Q60 78.5 66 74.5", hand: [17, 87],
  },
};

const funkeln = (x, y, s, i) =>
  `<path class="t-funke" style="--i:${i}" d="M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z" fill="var(--taler-hell)"/>`;

/**
 * SVG-Markup des Maskottchens.
 * stimmung: "hallo" | "jubeln" | "mut"; groesse in px; label = Text für Screenreader (sonst dekorativ).
 * outfit = Garderobe {kopf, augen, hals, hand, metall, aura} (Standard: das getragene Outfit).
 */
export function taler(stimmung = "hallo", { groesse = 64, klasse = "", label = "", outfit = aktuellesOutfit } = {}) {
  const p = POSE[stimmung] || POSE.hallo, id = `tg${++nr}`, o = outfitTeile(outfit);
  const [hx, hy] = p.hand;
  const handDing = o.hand ? `<g transform="translate(${hx} ${hy}) scale(1.3) translate(${-hx} ${-hy})">${o.hand(hx, hy)}</g><circle cx="${hx}" cy="${hy}" r="5.4" fill="var(--taler-gold)" class="t-umriss" stroke-width="2.4"/>` : "";
  const augen = p.augen === "froh"
    ? `<path d="M42.5 60.5 Q47 54.5 51.5 60.5" class="t-strich" stroke-width="3.2"/><path d="M68.5 60.5 Q73 54.5 77.5 60.5" class="t-strich" stroke-width="3.2"/>`
    : `<g class="t-augen"><g transform="translate(${(p.blick || [0, 0]).join(" ")})"><ellipse cx="47" cy="59" rx="3.7" ry="4.7" class="t-tinte"/><ellipse cx="73" cy="59" rx="3.7" ry="4.7" class="t-tinte"/>
       <circle cx="48.4" cy="57.2" r="1.35" fill="#fff"/><circle cx="74.4" cy="57.2" r="1.35" fill="#fff"/></g></g>`;
  const brauen = p.brauen ? `<path d="M40.5 44.5 Q46 42 51.5 45.5" class="t-strich" stroke-width="2.4"/><path d="M68.5 45.5 Q74 42 79.5 44.5" class="t-strich" stroke-width="2.4"/>` : "";
  const mund = p.mund
    ? `<path d="${p.mund}" class="t-strich" stroke-width="3"/>`
    : `<path d="M50.5 70.5 Q60 86 69.5 70.5 Z" class="t-tinte" stroke-linejoin="round"/><path d="M55 78.6 Q60 74.8 65 78.6 Q60 81.6 55 78.6Z" fill="var(--taler-wange)"/>`;
  const extra = stimmung === "jubeln" ? funkeln(12, 16, 6, 0) + funkeln(107, 14, 5, 1) + funkeln(113, 52, 4, 2) : "";
  return `<svg class="taler ${stimmung} ${klasse}" width="${groesse}" height="${groesse}" viewBox="0 0 120 120" ${o.farben ? `style="${o.farben}"` : ""} ${label ? `role="img" aria-label="${label}"` : `aria-hidden="true"`} focusable="false">
  <defs>
    <radialGradient id="${id}" cx="0.38" cy="0.32" r="0.75"><stop offset="0" stop-color="var(--taler-hell)"/><stop offset="0.55" stop-color="var(--taler-gold)"/><stop offset="1" stop-color="var(--taler-tief)"/></radialGradient>
  </defs>
  ${o.hinten ? `<g class="t-aura">${o.hinten}</g>` : ""}
  <ellipse cx="60" cy="113" rx="25" ry="4.2" class="t-schatten"/>
  <g class="t-ganz">
    <ellipse cx="47.5" cy="105" rx="9" ry="5.2" fill="var(--taler-tief)" class="t-umriss" stroke-width="2.6"/>
    <ellipse cx="72.5" cy="105" rx="9" ry="5.2" fill="var(--taler-tief)" class="t-umriss" stroke-width="2.6"/>
    ${p.links}${handDing}${p.rechts}
    <circle cx="60" cy="62" r="40" fill="var(--taler-tief)" class="t-umriss" stroke-width="3"/>
    <circle cx="60" cy="62" r="37.4" fill="none" stroke="var(--taler-dunkel)" stroke-width="3.4" stroke-dasharray="1.5 2.3" opacity="0.55"/>
    <circle cx="60" cy="62" r="34" fill="url(#${id})"/>
    <circle cx="60" cy="62" r="30.2" fill="none" stroke="var(--taler-hell)" stroke-width="1.4" opacity="0.75"/>
    <clipPath id="${id}c"><circle cx="60" cy="62" r="34"/></clipPath>
    <g clip-path="url(#${id}c)"><g transform="rotate(24 60 62)"><rect class="t-glanz" x="53" y="12" width="13" height="100" rx="6" fill="#fff"/></g></g>
    <path d="M36 46 A27 27 0 0 1 52 33.5" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity="0.55"/>
    <text x="60" y="40.5" text-anchor="middle" font-size="10.5" font-weight="800" font-family="Georgia, 'Times New Roman', serif" fill="var(--taler-tief)" opacity="0.8">§</text>
    <ellipse cx="37.5" cy="71.5" rx="5.2" ry="3.1" fill="var(--taler-wange)" opacity="0.6"/>
    <ellipse cx="82.5" cy="71.5" rx="5.2" ry="3.1" fill="var(--taler-wange)" opacity="0.6"/>
    ${augen}${brauen}
    ${o.augen !== null ? o.augen : `<g class="t-brille" fill="none">
      <circle cx="47" cy="58.5" r="10.6" fill="#fff" fill-opacity="0.16" class="t-umriss" stroke-width="2.5"/>
      <circle cx="73" cy="58.5" r="10.6" fill="#fff" fill-opacity="0.16" class="t-umriss" stroke-width="2.5"/>
      <path d="M57.4 57.2 Q60 54.6 62.6 57.2" class="t-umriss" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M36.5 56 L29.5 53.5 M83.5 56 L90.5 53.5" class="t-umriss" stroke-width="2.5" stroke-linecap="round"/>
    </g>`}
    ${mund}${o.hals}
    <path class="t-tropfen t-umriss" d="M93 33 Q98.5 41.5 96.5 45 Q93 48.5 89.5 45 Q87.5 41.5 93 33Z" fill="#bfe6ff" stroke-width="1.8"/>
    ${o.kopf}
  </g>
  ${extra}
</svg>`;
}

/**
 * Große Show nach dem Prüfen: Taler wird wie eine Münze hochgeschnippt.
 * ok: Doppelsalto, Strahlenkranz, Schockwelle, Münz- und Sternenregen, Glanzstreifen, Landung.
 * falsch: kleiner Wurf, wackelige Landung wie eine austrudelnde Münze, Staub, Schweißtropfen, Daumen hoch.
 * ruhig = Endzustand ohne Bewegung (beim erneuten Zeichnen derselben Aufgabe).
 */
export function talerBuehne(ok, { ruhig = false } = {}) {
  const teile = ok ? Array.from({ length: 16 }, (_, i) => {
    const w = (i / 16) * Math.PI * 2 + (i % 2 ? 0.2 : 0), weit = 95 + (i % 3) * 28;
    const dx = Math.round(Math.cos(w) * weit), dy = Math.round(Math.sin(w) * weit * 0.8);
    return `<i class="tb-teil ${i % 3 === 0 ? "stern" : "muenze"}" style="--dx:${dx}px;--dy:${dy}px;--r:${(i % 2 ? 1 : -1) * (180 + i * 25)}deg;--v:${(i % 4) * 0.03}s"></i>`;
  }).join("") : "";
  const effekte = ok
    ? `<div class="tb-mitte"><i class="tb-glut"></i><svg class="tb-strahlen" viewBox="-100 -100 200 200">${Array.from({ length: 12 }, (_, i) => `<path d="M-7 -30 L0 -98 L7 -30Z" transform="rotate(${i * 30})"/>`).join("")}</svg><i class="tb-ring"></i><i class="tb-ring zwei"></i>${teile}</div>`
    : `<i class="tb-staub l"></i><i class="tb-staub r"></i><i class="tb-staub m"></i>`;
  return `<div class="taler-buehne ${ok ? "ok" : "err"}${ruhig ? " ruhig" : ""}" aria-hidden="true">${effekte}<div class="tb-flug">${taler(ok ? "jubeln" : "mut", { groesse: 58, klasse: "ruhig" })}</div></div>`;
}

/** Sprüche, wenn man Taler auf der Startseite antippt (reihum). */
export const TALER_SPRUECHE = [
  "Schön, dass du da bist! Eine kleine Runde geht immer.",
  "Soll ist links, Haben ist rechts. Immer.",
  "Erst die Norm lesen, dann antworten – das bringt Punkte.",
  "Jede richtige Antwort poliert mich ein bisschen.",
  "Zehn Aufgaben am Tag, und die Klausur kann kommen.",
  "Fehler sind okay – genau dafür üben wir ja.",
];
