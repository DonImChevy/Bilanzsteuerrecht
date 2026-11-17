// App-Icon „Hamburger Rathaus im Art-déco-Bogen“ (Nutzerwahl 17.11.2026): zeichnet das Icon als SVG in der App-Seite
// (Bodoni Moda aus web/fonts) und speichert es als PNG mit 1024 px.
// Aufruf: (cd web && python3 -m http.server 8765 &) ; node tools/app_icon.mjs <ausgabe.png>
// Danach: python3 -I tools/app_icon_groessen.py <ausgabe.png>  → web/icons/*.png
import { createRequire } from "module"; const { chromium } = createRequire(process.cwd() + "/x.js")("playwright");
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1100, height: 1100 } });
const f = []; p.on("pageerror", (e) => f.push(e.message));
await p.goto("http://localhost:8765/index.html"); await p.waitForTimeout(800);
const r1 = (n) => (+n).toFixed(1);
const GOLD = (id, dreh = 0) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${dreh} .5 .5)"><stop offset="0" stop-color="#7a5714"/><stop offset=".2" stop-color="#e8cd84"/><stop offset=".4" stop-color="#a67b27"/><stop offset=".6" stop-color="#f7e9b9"/><stop offset=".8" stop-color="#b38936"/><stop offset="1" stop-color="#6b4b10"/></linearGradient>`;
const BEVEL = (id, t = 3, k = 1) => `<filter id="${id}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur in="SourceAlpha" stdDeviation="${t}" result="b"/>
  <feSpecularLighting in="b" surfaceScale="${t * 1.7}" specularConstant="${k}" specularExponent="20" lighting-color="#fff6d6" result="s"><feDistantLight azimuth="225" elevation="40"/></feSpecularLighting>
  <feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>
  <feDiffuseLighting in="b" surfaceScale="${t * 1.7}" diffuseConstant="1" lighting-color="#fff" result="d"><feDistantLight azimuth="225" elevation="52"/></feDiffuseLighting>
  <feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="g"/>
  <feComposite in="g" in2="s2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="h"/><feComposite in="h" in2="SourceAlpha" operator="in"/></filter>`;
const strahlen = Array.from({ length: 56 }, (_, i) => { const a = (-180 + i * (360 / 56)) * Math.PI / 180, a2 = a + 1.8 * Math.PI / 180, cx = 512, cy = 500, r = 900, r0 = 330;
  return `<path d="M${r1(cx + r0 * Math.cos(a))} ${r1(cy + r0 * Math.sin(a))} L${r1(cx + r * Math.cos(a))} ${r1(cy + r * Math.sin(a))} L${r1(cx + r * Math.cos(a2))} ${r1(cy + r * Math.sin(a2))} Z" fill="url(#goldS)" opacity="${i % 2 ? .07 : .2}"/>`; }).join("");
const funkel = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -16 C 2 -4, 4 -2, 16 0 C 4 2, 2 4, 0 16 C -2 4, -4 2, -16 0 C -4 -2, -2 -4, 0 -16 Z" fill="#f6e3a6"/>`;
const bogen = (d, sw, op = 1) => `<path d="M${190 + d} 900 V430 A${322 - d} ${322 - d} 0 0 1 ${834 - d} 430 V900" fill="none" stroke="url(#goldS)" stroke-width="${sw}" opacity="${op}" filter="url(#bev)"/>`;
// Fenster: hoch, rundbogig, warm erleuchtet
const fenster = (x, y, w, h, an = true) => `<path d="M${r1(x)} ${r1(y + h)} V${r1(y + w / 2)} A${r1(w / 2)} ${r1(w / 2)} 0 0 1 ${r1(x + w)} ${r1(y + w / 2)} V${r1(y + h)} Z" fill="${an ? "url(#licht)" : "#2b3a35"}"/><path d="M${r1(x + w / 2)} ${r1(y + 3)} V${r1(y + h)}" stroke="#5a4a2a" stroke-width="1.2" opacity=".6"/>`;
const reihe = (x0, x1, y, w, h, n, an = (i) => true) => Array.from({ length: n }, (_, i) => fenster(x0 + (x1 - x0 - w) * i / (n - 1), y, w, h, an(i))).join("");
// Flügel mit steilem Kupferdach, Gauben und zwei Fensterreihen
const fluegel = (x, w, seite) => {
  const dachO = 476, traufe = 560, boden = 790;
  const giebelX = seite < 0 ? x + 20 : x + w - 20;
  return `<g>
    <rect x="${x}" y="${traufe}" width="${w}" height="${boden - traufe}" fill="url(#sandstein)"/>
    <rect x="${x}" y="${traufe}" width="${w}" height="${boden - traufe}" fill="url(#sandstein)" filter="url(#mauer)" opacity=".5"/>
    <path d="M${x - 6} ${traufe} L${x + 22} ${dachO} L${x + w - 22} ${dachO} L${x + w + 6} ${traufe} Z" fill="url(#kupfer)"/>
    <path d="M${x + 22} ${dachO} L${x + w - 22} ${dachO}" stroke="url(#goldS2)" stroke-width="3"/>
    ${[0.25, 0.5, 0.75].map((t) => { const gx = x + w * t; return `<path d="M${r1(gx - 14)} ${traufe - 6} V${traufe - 30} L${r1(gx)} ${traufe - 46} L${r1(gx + 14)} ${traufe - 30} V${traufe - 6} Z" fill="url(#kupfer2)"/><rect x="${r1(gx - 6)}" y="${traufe - 28}" width="12" height="18" rx="5" fill="url(#licht)"/>`; }).join("")}
    <rect x="${x - 6}" y="${traufe - 4}" width="${w + 12}" height="8" fill="#d9c9a2"/><rect x="${x - 6}" y="${traufe + 3}" width="${w + 12}" height="2" fill="url(#goldS2)"/>
    ${reihe(x + 14, x + w - 14, traufe + 22, 18, 52, 6)}
    <rect x="${x}" y="${traufe + 88}" width="${w}" height="5" fill="#cdbb92"/>
    ${reihe(x + 14, x + w - 14, traufe + 108, 18, 60, 6, (i) => i !== 2)}
    <rect x="${x}" y="${boden - 44}" width="${w}" height="44" fill="#b8a47a"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M${r1(x + 10 + i * (w - 20) / 6)} ${boden} V${boden - 26} A${r1((w - 20) / 12 - 3)} ${r1((w - 20) / 12 - 3)} 0 0 1 ${r1(x + 10 + (i + 1) * (w - 20) / 6 - 6)} ${boden - 26} V${boden} Z" fill="#3a2f1c" opacity=".55"/>`).join("")}
  </g>`;
};
// Hamburger Rathaus nach Foto (frontal): breite Sandsteinfassade, flaches Patinadach mit Ziergiebeln,
// Eckpavillons mit Figuren, hoher Turm mit Uhr und mehrstufiger Kupferspitze
function rathaus() {
  const boden = 812, traufe = 668, first = 606, L = 252, R = 772, tl = 484, tr = 540;
  const rechteckFenster = (x, y, w, h, an = true, verdachung = false) => `${verdachung ? `<path d="M${r1(x - 2)} ${r1(y - 2)} L${r1(x + w / 2)} ${r1(y - 7)} L${r1(x + w + 2)} ${r1(y - 2)} Z" fill="#7a5a32"/>` : ""}<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" fill="${an ? "url(#licht)" : "#3a3324"}"/><rect x="${r1(x + w / 2 - .6)}" y="${r1(y)}" width="1.2" height="${r1(h)}" fill="#5a4326" opacity=".6"/><rect x="${r1(x)}" y="${r1(y + h * .38)}" width="${r1(w)}" height="1.2" fill="#5a4326" opacity=".6"/>`;
  const fensterReihe = (x0, x1, y, w, h, n, ver, aus = []) => Array.from({ length: n }, (_, i) => rechteckFenster(x0 + (x1 - x0 - w) * i / (n - 1), y, w, h, !aus.includes(i), ver)).join("");
  // Ziergiebel (Zwerchhaus) im Dach: dunkel, gestuft, mit Fenster und kleiner Spitze
  const ziergiebel = (cx) => `<path d="M${cx - 9} ${traufe} V${traufe - 30} L${cx - 6} ${traufe - 30} L${cx - 6} ${traufe - 38} L${cx - 3} ${traufe - 38} L${cx} ${traufe - 50} L${cx + 3} ${traufe - 38} L${cx + 6} ${traufe - 38} L${cx + 6} ${traufe - 30} L${cx + 9} ${traufe - 30} V${traufe} Z" fill="url(#giebelDunkel)"/><rect x="${cx - 3.5}" y="${traufe - 26}" width="7" height="13" fill="url(#licht)"/><path d="M${cx} ${traufe - 50} V${traufe - 57}" stroke="url(#goldS2)" stroke-width="1.6"/>`;
  // Eckpavillon mit prunkvollem Giebel und goldener Figur
  const pavillon = (x, w) => { const cx = x + w / 2; return `
    <rect x="${x}" y="${traufe - 14}" width="${w}" height="${boden - traufe + 14}" fill="url(#stein)"/>
    <path d="M${x - 2} ${traufe - 12} L${x + 6} ${traufe - 36} L${x + 14} ${traufe - 36} L${x + 18} ${traufe - 52} L${x + 26} ${traufe - 52} L${cx} ${traufe - 74} L${x + w - 26} ${traufe - 52} L${x + w - 18} ${traufe - 52} L${x + w - 14} ${traufe - 36} L${x + w - 6} ${traufe - 36} L${x + w + 2} ${traufe - 12} Z" fill="url(#giebelDunkel)"/>
    <rect x="${cx - 6}" y="${traufe - 46}" width="12" height="16" fill="url(#licht)"/><rect x="${x + 10}" y="${traufe - 30}" width="7" height="10" fill="url(#licht)"/><rect x="${x + w - 17}" y="${traufe - 30}" width="7" height="10" fill="url(#licht)"/>
    <path d="M${cx} ${traufe - 74} V${traufe - 82}" stroke="url(#goldS2)" stroke-width="2"/><path d="M${cx - 3} ${traufe - 82} L${cx} ${traufe - 96} L${cx + 3} ${traufe - 82} Z M${cx - 6} ${traufe - 90} L${cx + 6} ${traufe - 86}" fill="url(#goldS)" stroke="url(#goldS)" stroke-width="1.5"/>
    <rect x="${x - 3}" y="${traufe - 16}" width="${w + 6}" height="5" fill="#7a5a32"/>
    ${fensterReihe(x + 8, x + w - 8, traufe + 10, 9, 22, 3, true)}${fensterReihe(x + 8, x + w - 8, traufe + 50, 9, 28, 3, true)}${fensterReihe(x + 8, x + w - 8, boden - 46, 9, 26, 3, false)}`; };
  const fluegel = (x0, x1) => `
    <rect x="${x0}" y="${traufe}" width="${x1 - x0}" height="${boden - traufe}" fill="url(#stein)"/>
    <path d="M${x0} ${traufe} L${x0 + 6} ${first} L${x1 - 6} ${first} L${x1} ${traufe} Z" fill="url(#patina)"/>
    <path d="M${x0 + 6} ${first} L${x1 - 6} ${first}" stroke="#2f6b58" stroke-width="2"/>
    ${Array.from({ length: 6 }, (_, i) => ziergiebel(x0 + 13 + i * (x1 - x0 - 26) / 5)).join("")}
    <rect x="${x0}" y="${traufe - 2}" width="${x1 - x0}" height="5" fill="#7a5a32"/>
    ${fensterReihe(x0 + 8, x1 - 8, traufe + 10, 9, 22, 7, true)}
    <rect x="${x0}" y="${traufe + 42}" width="${x1 - x0}" height="4" fill="#5c4325"/>${Array.from({ length: Math.floor((x1 - x0) / 5) }, (_, i) => `<rect x="${x0 + 2 + i * 5}" y="${traufe + 38}" width="1.4" height="5" fill="#5c4325"/>`).join("")}
    ${fensterReihe(x0 + 8, x1 - 8, traufe + 52, 9, 28, 7, true, [3])}
    <rect x="${x0}" y="${boden - 52}" width="${x1 - x0}" height="3" fill="#8a673a"/>
    ${Array.from({ length: 6 }, (_, i) => `<rect x="${x0}" y="${boden - 46 + i * 8}" width="${x1 - x0}" height="1" fill="#7a5a32" opacity=".55"/>`).join("")}
    ${fensterReihe(x0 + 8, x1 - 8, boden - 42, 9, 26, 7, false, [1, 5])}`;
  return `
    ${fluegel(318, tl - 10)}${fluegel(tr + 10, 706)}
    ${pavillon(L, 66)}${pavillon(706, 66)}
    <!-- Mittelrisalit mit Portal, Balkon und Figuren -->
    <rect x="${tl - 14}" y="${traufe - 40}" width="${tr - tl + 28}" height="${boden - traufe + 40}" fill="url(#stein)"/>
    <path d="M${tl - 16} ${traufe - 40} L${(tl + tr) / 2} ${traufe - 58} L${tr + 16} ${traufe - 40} Z" fill="url(#giebelDunkel)"/>
    <rect x="${(tl + tr) / 2 - 10}" y="${traufe - 34}" width="20" height="20" fill="url(#licht)"/>
    ${[tl - 8, tl + 4, tr - 4, tr + 8].map((x) => `<rect x="${x - 2}" y="${traufe + 2}" width="4" height="14" rx="2" fill="url(#goldS2)"/>`).join("")}
    <path d="M${(tl + tr) / 2 - 12} ${traufe + 54} V${traufe + 34} A12 12 0 0 1 ${(tl + tr) / 2 + 12} ${traufe + 34} V${traufe + 54} Z" fill="url(#licht)"/>
    <rect x="${tl - 14}" y="${traufe + 56}" width="${tr - tl + 28}" height="4" fill="#5c4325"/>
    <path d="M${(tl + tr) / 2 - 14} ${boden} V${boden - 34} A14 14 0 0 1 ${(tl + tr) / 2 + 14} ${boden - 34} V${boden} Z" fill="#2a2016"/>
    <path d="M${(tl + tr) / 2 - 18} ${boden} V${boden - 34} A18 18 0 0 1 ${(tl + tr) / 2 + 18} ${boden - 34} V${boden}" fill="none" stroke="#7a5a32" stroke-width="3"/>
    <!-- Turmschaft mit Uhr -->
    <rect x="${tl}" y="456" width="${tr - tl}" height="${traufe - 40 - 456}" fill="url(#steinTurm)"/>
    <circle cx="512" cy="524" r="21" fill="url(#goldS)" filter="url(#bev)"/><circle cx="512" cy="524" r="17" fill="#2b2418"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="511.2" y="508" width="1.6" height="${i % 3 ? 2.5 : 4.5}" fill="#e8cd84" transform="rotate(${i * 30} 512 524)"/>`).join("")}
    <text x="512" y="536" text-anchor="middle" font-family="Bodoni Moda" font-weight="680" font-size="31" fill="url(#goldS)">§</text>
    <path d="M504 584 V568 A8 8 0 0 1 520 568 V584 Z" fill="#3a2f1c"/><path d="M506 584 V570 A6 6 0 0 1 518 570 V584 Z" fill="url(#licht)" opacity=".7"/>
    <!-- Glockengeschoss -->
    <rect x="${tl - 4}" y="452" width="${tr - tl + 8}" height="6" fill="#7a5a32"/>
    <rect x="${tl + 2}" y="412" width="${tr - tl - 4}" height="40" fill="url(#steinTurm)"/>
    ${[492, 507, 522].map((x) => `<path d="M${x} 446 V424 A5 5 0 0 1 ${x + 10} 424 V446 Z" fill="url(#licht)"/>`).join("")}
    <rect x="${tl - 6}" y="406" width="${tr - tl + 12}" height="7" fill="#7a5a32"/>
    <!-- Kupferdach des Turms mit Ziergiebel und Eckspitzen -->
    <path d="M${tl - 4} 406 L${tl + 10} 372 L${tr - 10} 372 L${tr + 4} 406 Z" fill="url(#patina)"/>
    <path d="M502 406 V388 L512 374 L522 388 V406 Z" fill="url(#giebelDunkel)"/><rect x="508" y="390" width="8" height="10" fill="url(#licht)"/>
    ${[tl - 2, tr + 2].map((x) => `<path d="M${x - 2} 406 L${x} 384 L${x + 2} 406 Z" fill="url(#patinaS)"/>`).join("")}
    <!-- mehrstufige Kupferspitze -->
    <rect x="${tl + 6}" y="350" width="${tr - tl - 12}" height="22" fill="url(#patinaS)"/>
    ${[500, 508, 516].map((x) => `<rect x="${x}" y="356" width="5" height="12" rx="2" fill="url(#licht)"/>`).join("")}
    <path d="M${tl + 2} 351 C ${tl + 6} 336, 502 330, 512 326 C 522 330, ${tr - 6} 336, ${tr - 2} 351 Z" fill="url(#patinaS)"/>
    <rect x="502" y="310" width="20" height="18" fill="url(#patinaS)"/><rect x="508" y="317" width="3" height="9" fill="url(#licht)"/><rect x="513" y="317" width="3" height="9" fill="url(#licht)"/>
    <path d="M499 311 C 500 302, 508 298, 512 294 C 516 298, 524 302, 525 311 Z" fill="url(#patinaS)"/>
    ${[[496, 340], [528, 340]].map(([x, y]) => `<path d="M${x - 1.5} ${y + 10} L${x} ${y - 8} L${x + 1.5} ${y + 10} Z" fill="url(#patinaS)"/>`).join("")}
    <rect x="508" y="288" width="8" height="10" fill="url(#patinaS)"/>
    <path d="M508.5 289 L512 236 L515.5 289 Z" fill="url(#patinaS)"/>
    <circle cx="512" cy="234" r="4.5" fill="url(#goldS)"/><path d="M510.6 230 L512 214 L513.4 230 Z" fill="url(#goldS)"/>`;
}
const svg = `<svg viewBox="0 0 1024 1024" width="1024" height="1024" xmlns="http://www.w3.org/2000/svg"><defs>
  ${GOLD("goldS")}${GOLD("goldS2", 90)}${BEVEL("bev", 2.6, 1.15)}${BEVEL("bev2", 4, 1.3)}
  <linearGradient id="smaragd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d5444"/><stop offset=".55" stop-color="#083a2f"/><stop offset="1" stop-color="#031912"/></linearGradient>
  <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05261f"/><stop offset=".38" stop-color="#0c4639"/><stop offset=".56" stop-color="#2f5a42"/><stop offset=".66" stop-color="#b08d4b"/><stop offset=".74" stop-color="#f0c374"/><stop offset="1" stop-color="#f6d690"/></linearGradient>
  <radialGradient id="vignette" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
  <linearGradient id="sandstein" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e9dcbc"/><stop offset="1" stop-color="#bba67b"/></linearGradient>
  <linearGradient id="kupfer" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7cc2a6"/><stop offset=".5" stop-color="#4f9a80"/><stop offset="1" stop-color="#2c6a57"/></linearGradient>
  <linearGradient id="kupfer2" x1="0" x2="1"><stop offset="0" stop-color="#2f6f5b"/><stop offset=".45" stop-color="#86c9ad"/><stop offset="1" stop-color="#2b6553"/></linearGradient>
  <radialGradient id="licht" cx=".5" cy=".6" r=".7"><stop offset="0" stop-color="#fff1b8"/><stop offset=".6" stop-color="#f2c15a"/><stop offset="1" stop-color="#b9781f"/></radialGradient>
  <linearGradient id="wasser" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#16473c"/><stop offset="1" stop-color="#05201a"/></linearGradient>
  <radialGradient id="ziffer" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e3d4ac"/></radialGradient>
  <filter id="mauer" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .25" numOctaves="2" seed="3"/><feColorMatrix type="matrix" values="0 0 0 0 .4  0 0 0 0 .33  0 0 0 0 .2  0 0 0 -.8 .55"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  <filter id="korn" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="9"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .22 0"/></filter>
  <filter id="schatten" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#000" flood-opacity=".5"/></filter>
  <filter id="weich"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="wellen" x="-10%" y="0" width="120%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".006 .14" numOctaves="2" seed="5" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="22" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation=".8"/></filter>
  <clipPath id="innen"><path d="M238 900 V430 A274 274 0 0 1 786 430 V900 Z"/></clipPath>
  <linearGradient id="stein" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d9b97f"/><stop offset=".5" stop-color="#c49a5c"/><stop offset="1" stop-color="#9c7440"/></linearGradient>
  <linearGradient id="steinTurm" x1="0" x2="1"><stop offset="0" stop-color="#8a6438"/><stop offset=".14" stop-color="#8a6438"/><stop offset=".15" stop-color="#d6b57a"/><stop offset=".5" stop-color="#e6cc93"/><stop offset=".85" stop-color="#c9a466"/><stop offset=".86" stop-color="#7d5a31"/><stop offset="1" stop-color="#7d5a31"/></linearGradient>
  <linearGradient id="patina" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8fd0b5"/><stop offset=".5" stop-color="#5aa58a"/><stop offset="1" stop-color="#3a7d68"/></linearGradient>
  <linearGradient id="patinaS" x1="0" x2="1"><stop offset="0" stop-color="#1d4337"/><stop offset=".45" stop-color="#5aa58a"/><stop offset="1" stop-color="#1b3d32"/></linearGradient>
  <linearGradient id="giebelDunkel" x1="0" x2="1"><stop offset="0" stop-color="#3c3a2c"/><stop offset=".5" stop-color="#6b604a"/><stop offset="1" stop-color="#36342a"/></linearGradient>
  <linearGradient id="pflaster" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6d6250"/><stop offset="1" stop-color="#2e2a22"/></linearGradient>
  <radialGradient id="laterne" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3c4"/><stop offset=".4" stop-color="#f5c96a" stop-opacity=".7"/><stop offset="1" stop-color="#f5c96a" stop-opacity="0"/></radialGradient>
  <g id="rathaus">${rathaus()}</g></defs>
  <rect width="1024" height="1024" fill="url(#smaragd)"/>
  ${strahlen}
  <rect width="1024" height="1024" filter="url(#korn)" opacity=".7"/>
  <g clip-path="url(#innen)">
    <rect x="200" y="100" width="640" height="720" fill="url(#himmel)"/>
    <ellipse cx="512" cy="790" rx="360" ry="120" fill="#ffd98a" opacity=".35" filter="url(#weich)"/>
    ${funkel(330, 250, .7)}${funkel(700, 220, .55)}${funkel(640, 300, .35)}${funkel(390, 330, .3)}
    <!-- Rathausmarkt: Pflaster mit Lichtinseln -->
    <rect x="200" y="812" width="640" height="110" fill="url(#pflaster)"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${512 + (i - 4) * 26} 812 L${512 + (i - 4) * 120} 920" stroke="#8a7c60" stroke-opacity=".35" stroke-width="1.2"/>`).join("")}
    ${[826, 846, 872, 904].map((y) => `<path d="M200 ${y} H840" stroke="#8a7c60" stroke-opacity=".3" stroke-width="1"/>`).join("")}
    <ellipse cx="512" cy="830" rx="90" ry="14" fill="#ffd98a" opacity=".35" filter="url(#weich)"/>
  </g>
  <g filter="url(#schatten)"><use href="#rathaus"/></g>
  ${[300, 410, 614, 724].map((x) => `<ellipse cx="${x}" cy="842" rx="34" ry="7" fill="#ffd98a" opacity=".3" filter="url(#weich)"/><rect x="${x - 1.6}" y="768" width="3.2" height="74" fill="#1f4a3c"/><rect x="${x - 5}" y="838" width="10" height="5" fill="#1f4a3c"/><path d="M${x - 9} 772 H${x + 9}" stroke="#1f4a3c" stroke-width="2"/>${[x - 9, x + 9].map((lx) => `<circle cx="${lx}" cy="767" r="9" fill="url(#laterne)"/><rect x="${lx - 2.5}" y="761" width="5" height="9" rx="1.5" fill="#fff0bd"/>`).join("")}<circle cx="${x}" cy="759" r="10" fill="url(#laterne)"/><rect x="${x - 2.5}" y="753" width="5" height="9" rx="1.5" fill="#fff0bd"/>`).join("")}
  ${bogen(0, 12)}${bogen(22, 3, .9)}${bogen(40, 6)}${bogen(56, 1.6, .8)}
  <g filter="url(#bev)" fill="url(#goldS)"><path d="M478 84 H546 L538 100 H486 Z"/><path d="M488 100 H536 L530 118 H494 Z"/><path d="M498 118 H526 L520 140 H504 Z"/></g>
  <path d="M512 88 L518 96 L512 104 L506 96 Z" fill="#083a2f"/>
  <g filter="url(#schatten)">
    <path d="M340 884 H684 L700 902 L684 920 H340 L324 902 Z" fill="url(#goldS2)" filter="url(#bev)"/>
    <path d="M352 890 H672 L682 902 L672 914 H352 L342 902 Z" fill="#083a2f"/>
    <text x="512" y="911" text-anchor="middle" font-family="Bodoni Moda" font-weight="680" font-size="25" letter-spacing="11" fill="url(#goldS)">FINANZWIRT</text>
  </g>
  <rect width="1024" height="1024" fill="url(#vignette)"/>
</svg>`;
await p.evaluate((h) => { document.body.innerHTML = `<div id="ic" style="width:1024px;height:1024px;position:fixed;left:0;top:0;z-index:99999">${h}</div>`; document.body.style.margin = "0"; }, svg);
await p.waitForTimeout(1200);
await (await p.$("#ic")).screenshot({ path: process.argv[2] });
console.log("Fehler", f); await b.close();
