// Schaubilder zum Kompaktwissen: kleine Grafiken, die eine Regel sichtbar machen (Tausch, Vermittlungsausschuss,
// Fristen, T-Konten …). Sie werden nur auf Knopfdruck gezeigt und nie vorgelesen. Inhalte in schaubilder_daten.js.
// Zeichen-Bausteine (alle liefern HTML bzw. SVG als Text, Farben nur über CSS-Variablen --sb-*):
//   fluss   – Kästen mit beschrifteten Pfeilen (Personen, Konten, Organe)
//   ablauf  – zwei Beteiligte mit Pfeilen nacheinander (Angebot → Annahme)
//   achse   – Zeitstrahl oder Skala mit Bereichen und Markierungen
//   stufen  – Schritte untereinander, mit Rechenzeichen und Verzweigungen
//   baum    – Oberbegriff mit Ästen und Blättern
//   matrix  – Raster mit Zeilen- und Spaltenköpfen
//   balken  – Balken aus Anteilen (Netto + USt, Freibetrag …)
//   bilanz  – kleine Bilanzen mit + / − (Bilanzveränderungen)
//   tkonten – T-Konten mit Soll und Haben
import { SCHAUBILDER } from "./schaubilder_daten.js";
export { SCHAUBILDER };

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const FARBEN = ["a", "b", "c", "d", "e", "f", "n"];
const fk = (f) => `sb-f-${FARBEN.includes(f) ? f : "a"}`;
const r1 = (x) => Math.round(x * 10) / 10;

/** Schaubilder eines Themas (leer, wenn es keine gibt). */
export const schaubilderVon = (id) => SCHAUBILDER[id] || [];

// ---------------------------------------------------------------------------------------------
// SVG-Hilfen
/** Mehrzeiliger Text („\n“ trennt Zeilen), zentriert um y. */
function text(x, y, t, cls, anker = "middle", zh = 13.5) {
  const zeilen = String(t).split("\n");
  const y0 = y - ((zeilen.length - 1) * zh) / 2;
  return `<text class="${cls}" x="${r1(x)}" y="${r1(y0)}" text-anchor="${anker}" dominant-baseline="central">${zeilen
    .map((z, i) => `<tspan x="${r1(x)}" ${i ? `dy="${zh}"` : ""}>${esc(z)}</tspan>`).join("")}</text>`;
}
const svgRahmen = (w, h, inhalt, label) => `<svg class="sb-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label || "Schaubild")}">${inhalt}</svg>`;

/** Pfeilspitze an p in Richtung u. */
function spitze(p, u) {
  const n = [-u[1], u[0]], L = 9, B = 4.6;
  return `${r1(p[0])},${r1(p[1])} ${r1(p[0] - u[0] * L + n[0] * B)},${r1(p[1] - u[1] * L + n[1] * B)} ${r1(p[0] - u[0] * L - n[0] * B)},${r1(p[1] - u[1] * L - n[1] * B)}`;
}
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };

// ---------------------------------------------------------------------------------------------
// fluss: { w, h, knoten: [{ id, x, y, t, sub, f, w, h }], pfeile: [{ von, nach, t, f, b, str, beide, lp, dx, dy }],
//          notizen: [{ x, y, t, f, anker, klein }], rahmen: [{ x, y, w, h, t, f }] }
function knotenMasse(k) {
  const zeilen = String(k.t).split("\n").length, sub = k.sub ? String(k.sub).split("\n").length : 0;
  return { w: k.w || 108, h: k.h || 14 + zeilen * 15 + sub * 12.5 };
}
function rand(k, richtung) {
  const { w, h } = knotenMasse(k), u = norm(richtung);
  const s = Math.min((w / 2 + 3) / (Math.abs(u[0]) || 1e-9), (h / 2 + 3) / (Math.abs(u[1]) || 1e-9));
  return [k.x + u[0] * s, k.y + u[1] * s];
}
function fluss(s) {
  const W = s.w || 360, H = s.h || 240, K = Object.fromEntries(s.knoten.map((k) => [k.id, k]));
  const rahmen = (s.rahmen || []).map((r) => `<g class="${fk(r.f || "n")}"><rect class="sb-rahmen" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="12"/>${r.t ? text(r.x + 10, r.y + 11, r.t, "sb-rahmen-t", "start") : ""}</g>`).join("");
  const pfeile = (s.pfeile || []).map((p) => {
    const a = K[p.von], z = K[p.nach];
    const mitte = [(a.x + z.x) / 2, (a.y + z.y) / 2], d = norm([z.x - a.x, z.y - a.y]), n = [-d[1], d[0]];
    const c = [mitte[0] + n[0] * (p.b || 0), mitte[1] + n[1] * (p.b || 0)];
    const p0 = rand(a, [c[0] - a.x, c[1] - a.y]), p1 = rand(z, [c[0] - z.x, c[1] - z.y]);
    const t = p.lp ?? 0.5, bez = (i) => (1 - t) ** 2 * p0[i] + 2 * (1 - t) * t * c[i] + t ** 2 * p1[i];
    const lab = p.t ? text(bez(0) + (p.dx || 0), bez(1) + (p.dy || 0), p.t, "sb-pl") : "";
    return `<g class="${fk(p.f)}"><path class="sb-pfad${p.str ? " str" : ""}" d="M${r1(p0[0])} ${r1(p0[1])} Q${r1(c[0])} ${r1(c[1])} ${r1(p1[0])} ${r1(p1[1])}"/>
      <polygon class="sb-spitze" points="${spitze(p1, norm([p1[0] - c[0], p1[1] - c[1]]))}"/>${p.beide ? `<polygon class="sb-spitze" points="${spitze(p0, norm([p0[0] - c[0], p0[1] - c[1]]))}"/>` : ""}${lab}</g>`;
  }).join("");
  const knoten = s.knoten.map((k) => {
    const { w, h } = knotenMasse(k), sub = k.sub ? String(k.sub).split("\n").length : 0, zt = String(k.t).split("\n").length;
    const yt = k.y - (sub * 12.5) / 2;
    return `<g class="${fk(k.f)}"><rect class="sb-knoten" x="${r1(k.x - w / 2)}" y="${r1(k.y - h / 2)}" width="${w}" height="${r1(h)}" rx="10"/>
      ${text(k.x, yt, k.t, "sb-kt")}${k.sub ? text(k.x, yt + (zt * 15) / 2 + (sub * 12.5) / 2 + 2, k.sub, "sb-ks", "middle", 12.5) : ""}</g>`;
  }).join("");
  const notizen = (s.notizen || []).map((n) => `<g class="${fk(n.f || "n")}">${text(n.x, n.y, n.t, n.klein ? "sb-notiz klein" : "sb-notiz", n.anker || "middle")}</g>`).join("");
  return svgRahmen(W, H, rahmen + pfeile + knoten + notizen, s.titel);
}

// ---------------------------------------------------------------------------------------------
// ablauf: { links, rechts, fl, fr, schritte: [{ von: "l"|"r", t, f, str }], ende: { t, f } }
function ablauf(s) {
  const W = 360, xl = 62, xr = 298, kopf = 46, dy = 50, n = s.schritte.length, H = kopf + 22 + n * dy + (s.ende ? 44 : 6);
  const kasten = (x, t, f) => `<g class="${fk(f)}"><rect class="sb-knoten" x="${x - 54}" y="8" width="108" height="32" rx="10"/>${text(x, 24, t, "sb-kt")}</g>`;
  const linien = `<g class="sb-f-n"><line class="sb-leben" x1="${xl}" y1="40" x2="${xl}" y2="${H - (s.ende ? 44 : 6)}"/><line class="sb-leben" x1="${xr}" y1="40" x2="${xr}" y2="${H - (s.ende ? 44 : 6)}"/></g>`;
  const schritte = s.schritte.map((p, i) => {
    const y = kopf + 30 + i * dy, a = p.von === "l" ? xl : xr, z = p.von === "l" ? xr : xl, u = [Math.sign(z - a), 0];
    const p0 = [a + u[0] * 4, y], p1 = [z - u[0] * 4, y];
    return `<g class="${fk(p.f)}"><circle class="sb-punkt" cx="${a}" cy="${y}" r="4"/><path class="sb-pfad${p.str ? " str" : ""}" d="M${p0[0]} ${y} L${p1[0]} ${y}"/>
      <polygon class="sb-spitze" points="${spitze(p1, u)}"/>${text(W / 2, y - 13, p.t, "sb-pl")}${p.sub ? text(W / 2, y + 12, p.sub, "sb-ks") : ""}</g>`;
  }).join("");
  const ende = s.ende ? `<g class="${fk(s.ende.f || "b")}"><rect class="sb-knoten" x="${xl - 20}" y="${H - 38}" width="${xr - xl + 40}" height="30" rx="10"/>${text(W / 2, H - 23, s.ende.t, "sb-kt")}</g>` : "";
  return svgRahmen(W, H, linien + kasten(xl, s.links, s.fl || "a") + kasten(xr, s.rechts, s.fr || "e") + schritte + ende, s.titel);
}

// ---------------------------------------------------------------------------------------------
// achse: { min, max, ticks: [[wert, text]], reihen: [{ t, spannen: [{ a, b, t, f }] }], marken: [{ v, t, sub, f, z }], pfeil }
function achse(s) {
  const W = 360, L = 14, R = 346, x = (v) => L + ((v - s.min) / (s.max - s.min)) * (R - L);
  const reihen = s.reihen || [], marken = s.marken || [];
  let y = 8, svg = "";
  for (const r of reihen) {
    if (r.t) { svg += `<g class="sb-f-n">${text(L, y + 6, r.t, "sb-reihe-t", "start")}</g>`; y += 15; }
    for (const sp of r.spannen) {
      const xa = x(sp.a), xb = x(sp.b), w = Math.max(2, xb - xa);
      svg += `<g class="${fk(sp.f)}"><rect class="sb-spanne" x="${r1(xa)}" y="${y}" width="${r1(w)}" height="26" rx="7"/>${sp.t ? text(xa + w / 2, y + 13, sp.t, w < 70 ? "sb-st klein" : "sb-st") : ""}</g>`;
    }
    y += 34;
  }
  const ay = y + 8;
  const zeilenUnten = Math.max(0, ...marken.map((m) => (m.z ?? 0) + 1));
  const H = ay + 22 + (s.ticks?.length ? 14 : 0) + zeilenUnten * 34 + 6;
  svg += `<g class="sb-f-n"><line class="sb-achse" x1="${L - 4}" y1="${ay}" x2="${R + (s.pfeil === false ? 4 : 2)}" y2="${ay}"/>${s.pfeil === false ? "" : `<polygon class="sb-spitze" points="${spitze([R + 6, ay], [1, 0])}"/>`}</g>`;
  for (const [v, t] of s.ticks || []) {
    const xt = x(v), anker = xt < 40 ? "start" : xt > 320 ? "end" : "middle";
    svg += `<g class="sb-f-n"><line class="sb-tick" x1="${r1(xt)}" y1="${ay - 4}" x2="${r1(xt)}" y2="${ay + 4}"/>${text(anker === "start" ? Math.max(xt - 4, 2) : anker === "end" ? Math.min(xt + 4, W - 2) : xt, ay + 14, t, "sb-tick-t", anker)}</g>`;
  }
  const unten = ay + (s.ticks?.length ? 30 : 18);
  for (const m of marken) {
    const xm = x(m.v), ly = unten + (m.z ?? 0) * 34 + 6, anker = xm < 62 ? "start" : xm > 298 ? "end" : "middle", tx = anker === "start" ? Math.max(xm - 6, 4) : anker === "end" ? Math.min(xm + 6, W - 4) : xm;
    svg += `<g class="${fk(m.f)}"><line class="sb-marke" x1="${r1(xm)}" y1="${reihen.length ? 8 : ay - 10}" x2="${r1(xm)}" y2="${ly - 7}"/><circle class="sb-punkt" cx="${r1(xm)}" cy="${ay}" r="4.5"/>
      ${text(tx, ly, m.t, "sb-mt", anker)}${m.sub ? text(tx, ly + 13, m.sub, "sb-ms", anker) : ""}</g>`;
  }
  return svgRahmen(W, H, svg, s.titel);
}

// ---------------------------------------------------------------------------------------------
// HTML-Bausteine
const inline = (t, fmt) => (fmt ? fmt(String(t)) : esc(t));
function stufen(s, fmt) {
  const box = (x) => typeof x === "string" ? `<div class="sb-schritt ${fk("a")}"><b>${inline(x, fmt)}</b></div>`
    : x.op ? `<div class="sb-op ${fk(x.f || (x.op.trim().startsWith("−") ? "d" : "b"))}">${inline(x.op, fmt)}</div>`
    : x.zweig ? `<div class="sb-zweige" style="--n:${x.zweig.length}">${x.zweig.map((z) => `<div class="sb-zweig ${fk(z.f)}">${z.titel ? `<div class="sb-zweig-kopf">${inline(z.titel, fmt)}</div>` : ""}${z.schritte.map((t) => `<div class="sb-zweig-schritt">${inline(t, fmt)}</div>`).join("")}</div>`).join("")}</div>`
    : `<div class="sb-schritt ${fk(x.f)}${x.ergebnis ? " ergebnis" : ""}">${x.nr ? `<span class="sb-nr">${esc(x.nr)}</span>` : ""}<div><b>${inline(x.t, fmt)}</b>${x.sub ? `<span>${inline(x.sub, fmt)}</span>` : ""}</div></div>`;
  let html = "";
  s.schritte.forEach((x, i) => {
    const vor = s.schritte[i - 1];
    if (i && typeof x === "object" && !x.op && !(vor && typeof vor === "object" && vor.op)) html += `<div class="sb-ab" aria-hidden="true"></div>`;
    html += box(x);
  });
  return `<div class="sb-stufen">${html}</div>`;
}
function baum(s, fmt) {
  const blatt = (b) => typeof b === "string" ? `<li>${inline(b, fmt)}</li>` : `<li class="${fk(b.f)}"><b>${inline(b.t, fmt)}</b>${b.sub ? `<span>${inline(b.sub, fmt)}</span>` : ""}</li>`;
  return `<div class="sb-baum"><div class="sb-wurzel ${fk(s.wurzel.f)}"><b>${inline(s.wurzel.t, fmt)}</b>${s.wurzel.sub ? `<span>${inline(s.wurzel.sub, fmt)}</span>` : ""}</div>
    <div class="sb-aeste${s.aeste.length >= 3 ? " viele" : ""}" style="--n:${s.aeste.length}">${s.aeste.map((a) => `<div class="sb-ast ${fk(a.f)}"><div class="sb-ast-kopf"><b>${inline(a.t, fmt)}</b>${a.sub ? `<span>${inline(a.sub, fmt)}</span>` : ""}</div>
      ${a.blaetter?.length ? `<ul>${a.blaetter.map(blatt).join("")}</ul>` : ""}</div>`).join("")}</div></div>`;
}
function matrix(s, fmt) {
  const zelle = (z) => typeof z === "string" ? `<div class="sb-zelle">${inline(z, fmt)}</div>` : `<div class="sb-zelle ${fk(z.f)} farbig">${z.gross ? `<b class="gross">${inline(z.gross, fmt)}</b>` : ""}${z.t ? `<span>${inline(z.t, fmt)}</span>` : ""}</div>`;
  return `<div class="sb-matrix breit" style="--sp:${s.spalten.length}">
    <div class="sb-ecke">${s.ecke ? inline(s.ecke, fmt) : ""}</div>${s.spalten.map((k) => `<div class="sb-kopf">${inline(k, fmt)}</div>`).join("")}
    ${s.zeilen.map((z) => `<div class="sb-zkopf">${inline(z.t, fmt)}</div>${z.zellen.map(zelle).join("")}`).join("")}</div>`;
}
function balken(s, fmt) {
  return `<div class="sb-balken">${s.balken.map((b) => {
    const summe = b.teile.reduce((a, t) => a + t.wert, 0), max = b.max || summe;
    return `<div class="sb-balken-z"><div class="sb-balken-t">${inline(b.titel, fmt)}</div>
      <div class="sb-balken-b">${b.teile.map((t) => `<div class="sb-teil ${fk(t.f)}" style="flex-basis:${r1((t.wert / max) * 100)}%"><span>${inline(t.t, fmt)}</span></div>`).join("")}</div>
      ${b.unter ? `<div class="sb-balken-u">${inline(b.unter, fmt)}</div>` : ""}</div>`;
  }).join("")}</div>`;
}
function bilanz(s, fmt) {
  const seite = (l) => l.map(([t, z]) => `<li><span>${inline(t, fmt)}</span>${z ? `<i class="${z === "+" ? "plus" : "minus"}">${z === "+" ? "+" : "−"}</i>` : ""}</li>`).join("");
  return `<div class="sb-bilanzen">${s.bilanzen.map((b) => `<div class="sb-bilanz ${fk(b.f)}"><div class="sb-bil-titel">${inline(b.titel, fmt)}</div>
    <div class="sb-bil-t"><div><small>Aktiva</small><ul>${seite(b.aktiva)}</ul></div><div><small>Passiva</small><ul>${seite(b.passiva)}</ul></div></div>
    <div class="sb-bil-summe">Bilanzsumme <b>${esc(b.summe)}</b></div>${b.bsp ? `<div class="sb-bil-bsp">${inline(b.bsp, fmt)}</div>` : ""}</div>`).join("")}</div>`;
}
function tkonten(s, fmt) {
  const seite = (l) => (l || []).map(([t, b, f]) => `<li class="${f ? fk(f) + " farbig" : ""}"><span>${inline(t, fmt)}</span>${b ? `<b>${inline(b, fmt)}</b>` : ""}</li>`).join("");
  return `<div class="sb-tkonten" style="--n:${Math.min(s.konten.length, 2)}">${s.konten.map((k) => `<div class="sb-tk ${fk(k.f)}">
    <div class="sb-tk-name">${inline(k.name, fmt)}${k.art ? `<small>${inline(k.art, fmt)}</small>` : ""}</div>
    <div class="sb-tk-t"><div><small>Soll</small><ul>${seite(k.soll)}</ul></div><div><small>Haben</small><ul>${seite(k.haben)}</ul></div></div>
    ${k.unter ? `<div class="sb-tk-u">${inline(k.unter, fmt)}</div>` : ""}</div>`).join("")}</div>`;
}

const ARTEN = { fluss, ablauf, achse, stufen, baum, matrix, balken, bilanz, tkonten };
/** Grafik eines Schaubilds (fmt = Funktion für Fließtext mit **fett** und antippbaren Normen). */
export function schaubildGrafik(s, fmt) {
  const f = ARTEN[s.art];
  if (!f) throw new Error("Unbekannte Schaubild-Art: " + s.art);
  return f(s, fmt);
}
/** Knöpfe im Kompaktwissen (eigene Farbe, nicht Teil des Vorlesens). */
export function schaubildKnoepfe(id) {
  const l = schaubilderVon(id);
  if (!l.length) return "";
  return `<div class="km-schaubilder" role="group" aria-label="Schaubilder">${l.map((s, i) => `<button class="sb-knopf" data-a="schaubild" data-v="${esc(id)}|${i}">
    <svg class="ic klein" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="7" height="6" rx="1.5"/><rect x="14" y="14" width="7" height="6" rx="1.5"/><path d="M10 7h4a3 3 0 0 1 3 3v4"/></svg>
    <span>Schaubild: ${esc(s.knopf)}</span></button>`).join("")}</div>`;
}
/** Inhalt des Blatts mit einem Schaubild. */
export function schaubildBlatt(id, i, fmt) {
  const l = schaubilderVon(id), s = l[i];
  if (!s) return "";
  const andere = l.length > 1 ? `<div class="sb-wahl">${l.map((x, j) => `<button class="chip${j === i ? " aktiv" : ""}" data-a="schaubild" data-v="${esc(id)}|${j}">${esc(x.knopf)}</button>`).join("")}</div>` : "";
  return `<div class="sb-blatt">${andere}
    ${s.text ? `<p class="sb-text">${inline(s.text, fmt)}</p>` : ""}
    <figure class="sb-figur">${schaubildGrafik(s, fmt)}</figure>
    ${s.merke ? `<div class="sb-merke"><b>Merke</b> ${inline(s.merke, fmt)}</div>` : ""}
    ${s.legende ? `<div class="sb-legende">${s.legende.map(([f, t]) => `<span class="${fk(f)}"><i></i>${esc(t)}</span>`).join("")}</div>` : ""}</div>`;
}
