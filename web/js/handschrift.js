// Handschriftliche Karteikarten: Schreiben mit Apple Pencil, anderen Stiften oder dem Finger.
// Zeichnung = { g: Hintergrund ("l" liniert, "k" kariert, "" leer), s: [{ w: "s" Stift | "m" Textmarker, c: Farbe, p: [[x, y, druck], …] }] }
// Fläche 600 × 400 (3 : 2). Gespeichert wird kein Bild, sondern die Striche als kurzer Text (kodieren/dekodieren):
// Punkte vereinfacht (Ramer-Douglas-Peucker), als Differenzen zum Vorgänger in Base64-VLQ – so bleibt eine Karte
// meist bei wenigen Kilobyte und passt in den Sync. Farben laufen über CSS-Variablen (--hs-*), damit Tinte im Dunkeln hell wird.

export const BREITE = 600, HOEHE = 400;
export const FARBEN = ["tinte", "blau", "rot", "gruen"];
export const MARKER = ["gelb", "rosa", "blau"];
export const MAX_ZEICHEN = 60000; // je Seite – der Lernstand darf auf dem Server höchstens 1 MB groß sein

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function vlq(n) {
  let z = n < 0 ? (-n << 1) | 1 : n << 1, out = "";
  do { let d = z & 31; z >>>= 5; if (z > 0) d |= 32; out += B64[d]; } while (z > 0);
  return out;
}
function vlqLesen(t) {
  const out = []; let z = 0, shift = 0;
  for (const ch of t) {
    const d = B64.indexOf(ch);
    if (d < 0) continue;
    z += (d & 31) << shift;
    if (d & 32) { shift += 5; continue; }
    out.push(z & 1 ? -(z >>> 1) : z >>> 1); z = 0; shift = 0;
  }
  return out;
}

/** Punkte vereinfachen: Abweichung unter eps (Einheiten der 600er-Fläche) fällt weg. */
export function vereinfachen(p, eps = 0.7) {
  if (p.length < 3) return p.slice();
  const abst = ([x, y], [ax, ay], [bx, by]) => {
    const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
    if (!l) return Math.hypot(x - ax, y - ay);
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l));
    return Math.hypot(x - (ax + t * dx), y - (ay + t * dy));
  };
  const behalten = new Uint8Array(p.length); behalten[0] = behalten[p.length - 1] = 1;
  const stapel = [[0, p.length - 1]];
  while (stapel.length) {
    const [a, b] = stapel.pop();
    let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      // Druckwechsel zählt mit, damit dicker/dünner werdende Linien erhalten bleiben
      const d = abst(p[i], p[a], p[b]) + Math.abs(p[i][2] - (p[a][2] + p[b][2]) / 2) * 0.4;
      if (d > max) { max = d; idx = i; }
    }
    if (max > eps) { behalten[idx] = 1; stapel.push([a, idx], [idx, b]); }
  }
  return p.filter((_, i) => behalten[i]);
}

/** Zeichnung → kurzer Text. Leere Zeichnung → "". */
export function kodieren(z) {
  if (!z?.s?.length) return "";
  const striche = z.s.filter((s) => s.p.length).map((s) => {
    let px = 0, py = 0, pd = 0, t = (s.w === "m" ? "m" : "s") + (s.c || 0);
    for (const [x, y, d] of vereinfachen(s.p.map(([x, y, d]) => [Math.round(x), Math.round(y), Math.round(d)]))) {
      t += vlq(x - px) + vlq(y - py) + vlq(d - pd); px = x; py = y; pd = d;
    }
    return t;
  });
  return "1" + (z.g || "-") + ";" + striche.join(";");
}
/** Kurzer Text → Zeichnung (fehlerhafte Teile werden übersprungen). */
export function dekodieren(t) {
  const z = { g: "l", s: [] };
  if (typeof t !== "string" || !t.startsWith("1")) return z;
  const [kopf, ...striche] = t.split(";");
  z.g = kopf[1] === "-" ? "" : kopf[1] || "";
  for (const st of striche) {
    if (st.length < 2) continue;
    const w = st[0] === "m" ? "m" : "s", c = Number(st[1]) || 0, zahlen = vlqLesen(st.slice(2)), p = [];
    let x = 0, y = 0, d = 0;
    for (let i = 0; i + 2 < zahlen.length; i += 3) { x += zahlen[i]; y += zahlen[i + 1]; d += zahlen[i + 2]; p.push([x, y, d]); }
    if (p.length) z.s.push({ w, c, p });
  }
  return z;
}
export const hatStriche = (z) => (typeof z === "string" ? z.length > 3 : !!z?.s?.length);

// ---------------------------------------------------------------- Darstellung

/** Strichbreite aus dem Druck (0–15): Stift 1,8–6, Textmarker breit und gleichmäßig. */
const breite = (w, d) => (w === "m" ? 22 : 1.8 + d * 0.28);
const farbe = (w, c) => `var(--hs-${w === "m" ? "m-" + (MARKER[c] || MARKER[0]) : FARBEN[c] || FARBEN[0]})`;

/** Linien des Papiers (liniert / kariert) als SVG-Pfade. */
const linienPfade = (g) => !g ? "" : g === "k"
  ? Array.from({ length: 23 }, (_, i) => `<path d="M${(i + 1) * 25} 0V400"/>`).join("") + Array.from({ length: 15 }, (_, i) => `<path d="M0 ${(i + 1) * 25}H600"/>`).join("")
  : Array.from({ length: 9 }, (_, i) => `<path d="M0 ${(i + 1) * 40 + 5}H600"/>`).join("");
/** Nur das Papier (für den Hintergrund der Zeichenfläche). */
export const papier = (g) => `<svg class="hs-papier-linien" viewBox="0 0 ${BREITE} ${HOEHE}" preserveAspectRatio="none" aria-hidden="true"><g class="hs-linien" stroke-width="1">${linienPfade(g)}</g></svg>`;

/** Zeichnung als SVG (skaliert mit der Breite des Elternelements). */
export function svg(zeichnung, { hintergrund = true, klasse = "" } = {}) {
  const z = typeof zeichnung === "string" ? dekodieren(zeichnung) : zeichnung;
  if (!z?.s?.length) return "";
  const pfade = (w) => z.s.filter((s) => s.w === w).map((s) => {
    if (s.p.length === 1) { const [x, y, d] = s.p[0]; return `<circle cx="${x}" cy="${y}" r="${(breite(s.w, d) / 2).toFixed(1)}" fill="${farbe(s.w, s.c)}"/>`; }
    if (w === "m") return `<path d="M${s.p.map(([x, y]) => `${x} ${y}`).join(" L")}" stroke="${farbe(w, s.c)}" stroke-width="22"/>`;
    // Stift: gleiche Breiten zu einem Pfad zusammenfassen – so wirkt die Linie druckempfindlich und bleibt schlank im DOM
    let out = "", start = 0;
    for (let i = 1; i <= s.p.length; i++) {
      const bw = (j) => breite("s", (s.p[j][2] + s.p[Math.max(0, j - 1)][2]) / 2).toFixed(1);
      if (i === s.p.length || bw(i) !== bw(start + 1)) {
        const teil = s.p.slice(start, i);
        if (teil.length > 1) out += `<path d="M${teil.map(([x, y]) => `${x} ${y}`).join(" L")}" stroke="${farbe("s", s.c)}" stroke-width="${bw(start + 1)}"/>`;
        start = i - 1;
      }
    }
    return out;
  }).join("");
  const linien = hintergrund ? linienPfade(z.g) : "";
  return `<svg class="hs-svg ${klasse}" viewBox="0 0 ${BREITE} ${HOEHE}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Handschrift">
    ${linien ? `<g class="hs-linien" stroke-width="1">${linien}</g>` : ""}
    <g fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="hs-marker">${pfade("m")}</g>${pfade("s")}</g></svg>`;
}

// ---------------------------------------------------------------- Zeichenfläche (Editor)

let nurStift = false; // sobald ein Stift schreibt, ignoriert die Fläche Finger und Handballen
const cssFarbe = (el, w, c) => getComputedStyle(el).getPropertyValue(`--hs-${w === "m" ? "m-" + (MARKER[c] || MARKER[0]) : FARBEN[c] || FARBEN[0]}`).trim() || "#222";

/**
 * Zeichenfläche an ein <canvas> binden. z = Zeichnung (wird direkt verändert), werkzeug() = { art: "s"|"m"|"r", farbe },
 * geaendert() wird nach jedem fertigen Strich bzw. Radieren aufgerufen.
 */
export function anbinden(canvas, z, werkzeug, geaendert) {
  const ctx = canvas.getContext("2d");
  const skalieren = () => {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(canvas.width / BREITE, 0, 0, canvas.height / HOEHE, 0, 0);
    zeichneAlles();
  };
  const strich = (s, ab = 1) => {
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = cssFarbe(canvas, s.w, s.c);
    ctx.globalAlpha = s.w === "m" ? 0.38 : 1;
    if (s.p.length === 1) { const [x, y, d] = s.p[0]; ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.arc(x, y, breite(s.w, d) / 2, 0, 7); ctx.fill(); }
    // Textmarker als ein Pfad – sonst werden die durchscheinenden Stücke an den Übergängen dunkler
    if (s.w === "m" && s.p.length > 1) { ctx.lineWidth = 22; ctx.beginPath(); s.p.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.globalAlpha = 1; return; }
    for (let i = Math.max(1, ab); i < s.p.length; i++) {
      const [x0, y0, d0] = s.p[i - 1], [x1, y1, d1] = s.p[i];
      ctx.lineWidth = breite(s.w, (d0 + d1) / 2);
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };
  function zeichneAlles() {
    ctx.clearRect(0, 0, BREITE, HOEHE);
    for (const s of z.s) if (s.w === "m") strich(s);
    for (const s of z.s) if (s.w !== "m") strich(s);
  }
  const punkt = (e) => {
    const r = canvas.getBoundingClientRect();
    const druck = e.pointerType === "pen" ? Math.max(0.05, e.pressure || 0.5) : 0.5;
    return [Math.max(0, Math.min(BREITE, ((e.clientX - r.left) / r.width) * BREITE)), Math.max(0, Math.min(HOEHE, ((e.clientY - r.top) / r.height) * HOEHE)), Math.round(druck * 15)];
  };
  let aktiv = null, radiert = false;
  const radieren = (pt) => {
    const vorher = z.s.length;
    z.s = z.s.filter((s) => !s.p.some(([x, y]) => Math.hypot(x - pt[0], y - pt[1]) < 14));
    if (z.s.length !== vorher) { radiert = true; zeichneAlles(); }
  };
  canvas.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "pen") nurStift = true;
    else if (nurStift && e.pointerType === "touch") return;
    e.preventDefault(); canvas.setPointerCapture(e.pointerId);
    const w = werkzeug();
    if (w.art === "r") { (z._rueck ||= []).push(z.s.slice()); aktiv = { radierer: true, id: e.pointerId }; radieren(punkt(e)); return; }
    (z._rueck ||= []).push(z.s.slice());
    aktiv = { id: e.pointerId, s: { w: w.art, c: w.farbe || 0, p: [punkt(e)] } };
    z.s.push(aktiv.s); strich(aktiv.s);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!aktiv || e.pointerId !== aktiv.id) return;
    e.preventDefault();
    const liste = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    for (const ev of liste.length ? liste : [e]) {
      if (aktiv.radierer) { radieren(punkt(ev)); continue; }
      const p = punkt(ev), l = aktiv.s.p[aktiv.s.p.length - 1];
      if (Math.hypot(p[0] - l[0], p[1] - l[1]) < 0.8) continue;
      aktiv.s.p.push(p);
      if (aktiv.s.w === "m") zeichneAlles(); else strich(aktiv.s, aktiv.s.p.length - 1);
    }
  });
  const ende = (e) => {
    if (!aktiv || e.pointerId !== aktiv.id) return;
    const war = aktiv; aktiv = null;
    if (war.radierer) { if (radiert) { radiert = false; geaendert(); } else z._rueck.pop(); return; }
    geaendert();
  };
  canvas.addEventListener("pointerup", ende);
  canvas.addEventListener("pointercancel", ende);
  // Safari: Doppeltipp-Zoom und Lupe beim Schreiben verhindern
  canvas.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  if (window.ResizeObserver) new ResizeObserver(skalieren).observe(canvas); else skalieren();
  skalieren();
}
/** Letzten Schritt zurücknehmen (Strich oder Radieren). */
export function rueckgaengig(z) {
  const alt = z._rueck?.pop();
  if (alt) z.s = alt; else z.s.pop();
}
