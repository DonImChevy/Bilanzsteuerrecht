// Maskottchen „Taler“: eine goldene Münze mit geriffeltem Rand, Studierbrille und kleinem eingeprägten §.
// Begrüßt auf der Startseite, lobt bei richtigen und muntert bei falschen Antworten auf.
// Reines SVG (keine Bilddatei); Farben über die CSS-Variablen --taler-*; Bewegung in style.css (.taler …),
// bei „Bewegung reduzieren“ abgeschaltet.

import { outfitTeile, STANDARD } from "./garderobe.js";

let nr = 0;
// Getragenes Outfit (Garderobe); gilt für jeden Taler, der kein eigenes Outfit mitbekommt
let aktuellesOutfit = STANDARD;
export const talerOutfitSetzen = (o) => { aktuellesOutfit = o || STANDARD; };

/** Hand als Fäustling: Daumen hinten, Handfläche mit Verlauf, zwei Fingerfalten, Glanzpunkt. dreh in Grad, spiegel = -1 für die rechte Hand. */
export const hand = (x, y, { dreh = 0, spiegel = 1 } = {}) =>
  `<g transform="translate(${x} ${y}) rotate(${dreh}) scale(${spiegel} 1)">
    <ellipse cx="-4.3" cy="-2.4" rx="2.5" ry="3.1" transform="rotate(-58 -4.3 -2.4)" fill="var(--taler-gold)" class="t-umriss" stroke-width="2"/>
    <circle r="5.6" fill="var(--taler-gold)" class="t-umriss" stroke-width="2.4"/>
    <path d="M-3.6 3.2 A4.9 4.9 0 0 0 4.6 1.6 A6.4 6.4 0 0 1 -3.6 3.2Z" fill="var(--taler-tief)" opacity="0.55"/>
    <path d="M1.9 -2.5 q2.3 .3 3.2 1.5 M2.1 .7 q2.1 .2 3 1.2" class="t-strich" stroke-width="1.1" opacity="0.4"/>
    <ellipse cx="-1.7" cy="-2.3" rx="2.1" ry="1.3" transform="rotate(-25 -1.7 -2.3)" fill="#fff" opacity="0.5"/></g>`;
/** Finger, die sich vor einem Griff schließen: drei Glieder quer zum Griff (dreh = Richtung des Griffs, 0 = senkrecht). */
const finger = (x, y, dreh = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${dreh})">${[-4.5, -1.45, 1.6].map((d, i) =>
    `<rect x="-4.4" y="${d}" width="${i === 1 ? 9 : 8.4}" height="3.05" rx="1.52" fill="var(--taler-gold)" class="t-umriss" stroke-width="1.5"/><path d="M-2.6 ${d + 0.95} h3.4" stroke="#fff" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>`).join("")}</g>`;

/** Arm als Doppelstrich (Umriss + Füllung + Lichtkante) mit Hand am Ende. */
const arm = (d, hx, hy, extra = "", h = {}) =>
  `<path d="${d}" class="t-umriss" stroke-width="9" fill="none" stroke-linecap="round"/>
   <path d="${d}" stroke="var(--taler-tief)" stroke-width="4.6" fill="none" stroke-linecap="round"/>
   <path d="${d}" stroke="var(--taler-hell)" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.55" transform="translate(-0.9 -0.9)"/>
   ${h.ohne ? "" : hand(hx, hy, h)}${extra}`;
const ARM_HALT = "M25 71 Q15 78 15.5 83"; // linker Arm, wenn die Hand etwas hält

const POSE = {
  // linker Arm hängt, rechter Arm winkt
  hallo: {
    links: arm("M25 70 Q16 76 17 86", 17, 87),
    rechts: `<g class="t-winkarm">${arm("M95 62 Q108 53 106 38", 106, 37, "", { spiegel: -1, dreh: 20 })}</g>`,
    augen: "offen", mund: "M52.5 72.5 Q60 80 67.5 72.5", hand: [17, 87],
  },
  // beide Arme hoch, Augen zu Bögen, Mund offen
  jubeln: {
    links: arm("M25 62 Q12 50 14 35", 14, 34, "", { dreh: -20 }),
    rechts: arm("M95 62 Q108 50 106 35", 106, 34, "", { spiegel: -1, dreh: 20 }),
    augen: "froh", mund: null, hand: [14, 34],
  },
  // wartet neben dem Prüfen-Knopf: Arme unten, schaut nach oben zur Aufgabe
  warte: {
    links: arm("M25 70 Q16 76 17 86", 17, 87),
    rechts: arm("M95 70 Q104 76 103 86", 103, 87, "", { spiegel: -1 }),
    augen: "offen", blick: [-0.8, -1.6], mund: "M55.5 74.5 Q60 77.5 64.5 74.5", hand: [17, 87],
  },
  // Daumen hoch, sanftes Lächeln, Augenbrauen mitfühlend
  mut: {
    links: arm("M25 70 Q16 76 17 86", 17, 87),
    rechts: arm("M95 70 Q106 70 107 60", 107, 58, `<rect x="101.2" y="44.5" width="5.8" height="11.5" rx="2.9" transform="rotate(-16 104 51)" fill="var(--taler-gold)" class="t-umriss" stroke-width="2.2"/><circle cx="107" cy="58" r="5.6" fill="var(--taler-gold)" class="t-umriss" stroke-width="2.4"/><path d="M102.6 47.6 q.5 -1.6 2 -1.9" stroke="#fff" stroke-width="0.9" fill="none" stroke-linecap="round" opacity="0.6"/><path d="M104.4 56.6 h6 M104.6 59.4 h5.8 M105 62 h4.6" class="t-strich" stroke-width="1.2" opacity="0.5"/>`, { ohne: true }),
    augen: "offen", brauen: true, mund: "M54 74.5 Q60 78.5 66 74.5", hand: [17, 87],
  },
};

const funkeln = (x, y, s, i) =>
  `<path class="t-funke" style="--i:${i}" d="M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z" fill="var(--taler-hell)"/>`;

/**
 * SVG-Markup des Maskottchens.
 * stimmung: "hallo" | "jubeln" | "mut"; groesse in px; label = Text für Screenreader (sonst dekorativ).
 * outfit = Garderobe {kopf, augen, gesicht, hals, ohr, hand, metall, aura} (Standard: das getragene Outfit).
 */
export function taler(stimmung = "hallo", { groesse = 64, klasse = "", label = "", outfit = aktuellesOutfit } = {}) {
  const p = POSE[stimmung] || POSE.hallo, id = `tg${++nr}`, o = outfitTeile(outfit);
  const ge = o.gesicht ? o.gesicht({ id, augen: p.augen, mund: p.mund }) : null;
  const blick = `translate(${(p.blick || [0, 0]).join(" ")})`;
  // Hält Taler etwas, rückt die linke Hand etwas nach außen; gezeichnet wird ganz vorn: Handfläche → Gegenstand → Finger um den Griff
  const haelt = !!o.hand, [hx, hy] = haelt && stimmung !== "jubeln" ? [15.5, 83] : p.hand;
  const links = haelt ? arm(stimmung === "jubeln" ? "M25 62 Q12 50 14 35" : ARM_HALT, hx, hy, "", { ohne: true }) : p.links;
  const handDing = haelt ? `<g class="t-hand">${hand(hx, hy, { dreh: o.griff[1] })}${o.hand(hx, hy, id)}${finger(hx, hy, o.griff[1] + (o.griff[0] === "h" ? 90 : 0))}</g>` : "";
  const augen = p.augen === "froh"
    ? `<path d="M42.5 60.5 Q47 54.5 51.5 60.5" class="t-strich" stroke-width="3.2"/><path d="M68.5 60.5 Q73 54.5 77.5 60.5" class="t-strich" stroke-width="3.2"/>`
    : `<g class="t-augen"><g transform="translate(${(p.blick || [0, 0]).join(" ")})"><ellipse cx="47" cy="59" rx="3.8" ry="4.8" fill="url(#${id}a)"/><ellipse cx="73" cy="59" rx="3.8" ry="4.8" fill="url(#${id}a)"/>
       <circle cx="48.4" cy="57.1" r="1.45" fill="#fff"/><circle cx="74.4" cy="57.1" r="1.45" fill="#fff"/></g></g>`;
  const brauen = p.brauen ? `<path d="M40.5 44.5 Q46 42 51.5 45.5" class="t-strich" stroke-width="2.4"/><path d="M68.5 45.5 Q74 42 79.5 44.5" class="t-strich" stroke-width="2.4"/>` : "";
  const mund = p.mund
    ? `<path d="${p.mund}" class="t-strich" stroke-width="3"/>`
    : `<path d="M50.5 70.5 Q60 86 69.5 70.5 Z" class="t-tinte" stroke-linejoin="round"/><path d="M55 78.6 Q60 74.8 65 78.6 Q60 81.6 55 78.6Z" fill="var(--taler-wange)"/>`;
  const extra = stimmung === "jubeln" ? funkeln(12, 16, 6, 0) + funkeln(107, 14, 5, 1) + funkeln(113, 52, 4, 2) : "";
  return `<svg class="taler ${stimmung} ${klasse} ${o.klasse}" width="${groesse}" height="${groesse}" viewBox="0 0 120 120" ${o.farben ? `style="${o.farben}"` : ""} ${label ? `role="img" aria-label="${label}"` : `aria-hidden="true"`} focusable="false">
  <defs>
    <radialGradient id="${id}" cx="0.36" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="0.04" stop-color="var(--taler-hell)"/><stop offset="0.5" stop-color="var(--taler-gold)"/><stop offset="0.86" stop-color="var(--taler-tief)"/><stop offset="1" stop-color="var(--taler-dunkel)"/></radialGradient>
    <radialGradient id="${id}s" cx="0.4" cy="0.36" r="0.66"><stop offset="0.7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.26"/></radialGradient>
    <radialGradient id="${id}w" cx="0.78" cy="0.86" r="0.4"><stop offset="0" stop-color="var(--taler-hell)" stop-opacity="0.55"/><stop offset="1" stop-color="var(--taler-hell)" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}k" gradientUnits="userSpaceOnUse" x1="34" y1="34" x2="88" y2="92"><stop offset="0" stop-color="#fff" stop-opacity="0.95"/><stop offset="0.45" stop-color="#fff" stop-opacity="0"/><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.45"/></linearGradient>
    <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--taler-gold)"/><stop offset="1" stop-color="var(--taler-tief)"/></linearGradient>
    <radialGradient id="${id}a" cx="0.42" cy="0.36" r="0.7"><stop offset="0" stop-color="#57391a"/><stop offset="0.45" stop-color="var(--taler-tinte)"/><stop offset="1" stop-color="#140c03"/></radialGradient>
  </defs>
  ${o.hinten ? `<g class="t-aura">${o.hinten}</g>` : ""}
  <ellipse cx="60" cy="113" rx="27" ry="4.4" class="t-schatten" opacity="0.6"/><ellipse cx="60" cy="112.4" rx="19" ry="2.6" class="t-schatten"/>
  <g class="t-ganz">
    <ellipse cx="47.5" cy="105" rx="9" ry="5.2" fill="url(#${id}f)" class="t-umriss" stroke-width="2.6"/>
    <ellipse cx="72.5" cy="105" rx="9" ry="5.2" fill="url(#${id}f)" class="t-umriss" stroke-width="2.6"/>
    <path d="M40.5 103.4 Q43 100.9 47.6 100.9 M65.5 103.4 Q68 100.9 72.6 100.9" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.55"/>
    <path d="M41 107.6 Q47.5 110.4 54 107.6 M66 107.6 Q72.5 110.4 79 107.6" stroke="var(--taler-dunkel)" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.6"/>
    ${links}${p.rechts}
    ${o.koerper ? o.koerper(id) : `<circle cx="60" cy="62" r="40" fill="var(--taler-tief)" class="t-umriss" stroke-width="3"/>
    <circle cx="60" cy="62" r="37.4" fill="none" stroke="var(--taler-dunkel)" stroke-width="3.4" stroke-dasharray="1.3 2.5" opacity="0.6"/>
    <circle cx="60" cy="62" r="37.4" fill="none" stroke="var(--taler-hell)" stroke-width="3.4" stroke-dasharray="0.7 3.1" stroke-dashoffset="-1.5" opacity="0.22"/>
    <circle cx="60" cy="62" r="34" fill="url(#${id})"/>`}${o.edel ? o.edel(id) : ""}
    <circle cx="60" cy="62" r="34" fill="url(#${id}w)"/><circle cx="60" cy="62" r="34" fill="url(#${id}s)"/>
    <circle cx="60" cy="62" r="34.5" fill="none" stroke="url(#${id}k)" stroke-width="1.5"/>
    <circle cx="60" cy="62" r="30.7" fill="none" stroke="var(--taler-dunkel)" stroke-width="0.9" opacity="0.4"/>
    <circle cx="60" cy="62" r="29.8" fill="none" stroke="var(--taler-hell)" stroke-width="1.1" opacity="0.8"/>
    <clipPath id="${id}c"><circle cx="60" cy="62" r="34"/></clipPath>
    <g clip-path="url(#${id}c)"><g transform="rotate(24 60 62)"><rect class="t-glanz" x="53" y="12" width="13" height="100" rx="6" fill="#fff"/></g></g>
    <ellipse cx="45.5" cy="42" rx="14" ry="5.6" transform="rotate(-38 45.5 42)" fill="url(#${id}g)" opacity="0.7"/>
    <text x="60.6" y="41.2" text-anchor="middle" font-size="10.5" font-weight="800" font-family="Georgia, 'Times New Roman', serif" fill="#fff" opacity="0.5">§</text>
    <text x="60" y="40.5" text-anchor="middle" font-size="10.5" font-weight="800" font-family="Georgia, 'Times New Roman', serif" fill="var(--taler-dunkel)" opacity="0.85">§</text>
    <ellipse cx="37.5" cy="71.5" rx="5.2" ry="3.1" fill="var(--taler-wange)" opacity="0.6"/>
    <ellipse cx="82.5" cy="71.5" rx="5.2" ry="3.1" fill="var(--taler-wange)" opacity="0.6"/>
    ${o.kappe ? o.kappe(id, p.augen) : `${ge ? `<g transform="${blick}">${ge.unter}</g>` : ""}${augen}${ge?.wimpern ? `<g transform="${blick}">${ge.wimpern}</g>` : ""}${brauen}
    ${o.augen !== null ? o.augen : `<g class="t-brille" fill="none">
      <circle cx="47" cy="58.5" r="10.6" fill="#fff" fill-opacity="0.16" class="t-umriss" stroke-width="2.5"/>
      <circle cx="73" cy="58.5" r="10.6" fill="#fff" fill-opacity="0.16" class="t-umriss" stroke-width="2.5"/>
      <path d="M57.4 57.2 Q60 54.6 62.6 57.2" class="t-umriss" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M36.5 56 L29.5 53.5 M83.5 56 L90.5 53.5" class="t-umriss" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M39.6 54.2 A8.2 8.2 0 0 1 45.6 50.4 M65.6 54.2 A8.2 8.2 0 0 1 71.6 50.4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.75"/>
      <path d="M52.4 64.6 A8.4 8.4 0 0 1 48.4 67 M78.4 64.6 A8.4 8.4 0 0 1 74.4 67" stroke="#fff" stroke-width="0.9" stroke-linecap="round" opacity="0.4"/>
    </g>`}`}
    ${mund}${ge ? ge.ueber : ""}${o.hals}${o.ohr}
    <path class="t-tropfen t-umriss" d="M93 33 Q98.5 41.5 96.5 45 Q93 48.5 89.5 45 Q87.5 41.5 93 33Z" fill="#bfe6ff" stroke-width="1.8"/>
    ${o.kopfSchatten ? `<g clip-path="url(#${id}c)"><ellipse cx="60" cy="34" rx="27" ry="5.5" fill="#000" opacity="0.2"/></g>` : ""}${o.kopf}
    ${handDing}
  </g>
  ${o.edelAussen}${extra}
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
