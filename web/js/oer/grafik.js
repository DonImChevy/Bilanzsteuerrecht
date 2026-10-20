// Kleine SVG-/HTML-Grafiken für die Übertragungsaufgaben (hell/dunkel über CSS-Variablen).

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const zahl = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const FARBEN = ["#2563eb", "#dc2626", "#16a34a", "#d97706", "#7c3aed", "#0891b2", "#db2777", "#64748b"];
export const STIMMFARBE = { ja: "#16a34a", nein: "#dc2626", enthaltung: "#a1a1aa", ungueltig: "#d97706", fehlt: "#cbd5e1" };

/**
 * Horizontales Balkendiagramm.
 * daten: [{label, wert, farbe, text?}], optionen: {titel, max, linie: {wert, label}, einheit, fuss}
 */
export function balken(daten, { titel = "", max, linie, einheit = "", fuss = "" } = {}) {
  const b = 340, labelB = 118, zeileH = 30, oben = titel ? 30 : 8;
  const h = oben + daten.length * zeileH + (linie ? 22 : 8) + (fuss ? 18 : 0);
  const m = max ?? Math.max(...daten.map((d) => d.wert), linie?.wert ?? 0) * 1.08;
  const x = (w) => labelB + (w / m) * (b - labelB - 58);
  let s = `<svg viewBox="0 0 ${b} ${h}" class="grafik" role="img" aria-label="${esc(titel)}">`;
  if (titel) s += `<text x="${b / 2}" y="18" text-anchor="middle" class="g-titel">${esc(titel)}</text>`;
  daten.forEach((d, i) => {
    const y = oben + i * zeileH;
    s += `<text x="${labelB - 8}" y="${y + 19}" text-anchor="end" class="g-text">${esc(d.label)}</text>`;
    s += `<rect x="${labelB}" y="${y + 5}" width="${Math.max(2, x(d.wert) - labelB)}" height="20" rx="4" fill="${d.farbe || FARBEN[i % FARBEN.length]}"/>`;
    s += `<text x="${x(d.wert) + 6}" y="${y + 19}" class="g-wert">${esc(d.text ?? zahl(d.wert) + einheit)}</text>`;
  });
  if (linie) {
    const lx = x(linie.wert), unten = oben + daten.length * zeileH;
    s += `<line x1="${lx}" y1="${oben}" x2="${lx}" y2="${unten + 4}" class="g-linie"/>`;
    s += `<text x="${lx}" y="${unten + 17}" text-anchor="middle" class="g-klein">${esc(linie.label)}</text>`;
  }
  if (fuss) s += `<text x="${b / 2}" y="${h - 4}" text-anchor="middle" class="g-klein">${esc(fuss)}</text>`;
  return s + "</svg>";
}

/** Halbkreis-Sitzverteilung. sitze: [{label, n, farbe}] */
export function halbkreis(sitze, { titel = "" } = {}) {
  const gesamt = sitze.reduce((a, s) => a + s.n, 0);
  const b = 340, h = 200, cx = b / 2, cy = 172, rAussen = 150, rInnen = 62;
  const reihen = Math.max(3, Math.min(10, Math.round(Math.sqrt(gesamt / 4))));
  // Plätze je Reihe proportional zum Radius
  const radien = Array.from({ length: reihen }, (_, i) => rInnen + ((rAussen - rInnen) * (i + 0.5)) / reihen);
  const summeR = radien.reduce((a, r) => a + r, 0);
  let proReihe = radien.map((r) => Math.round((gesamt * r) / summeR));
  proReihe[reihen - 1] += gesamt - proReihe.reduce((a, n) => a + n, 0);
  const punkte = [];
  radien.forEach((r, i) => {
    const n = proReihe[i];
    for (let k = 0; k < n; k++) {
      const winkel = Math.PI - (Math.PI * (k + 0.5)) / n;
      punkte.push({ x: cx + r * Math.cos(winkel), y: cy - r * Math.sin(winkel), w: winkel });
    }
  });
  punkte.sort((a, b2) => b2.w - a.w);
  const radius = Math.max(1.6, Math.min(6, ((rAussen - rInnen) / reihen) * 0.42));
  let s = `<svg viewBox="0 0 ${b} ${h + (titel ? 0 : 0)}" class="grafik" role="img" aria-label="${esc(titel)}">`;
  let idx = 0;
  sitze.forEach((p, i) => {
    for (let k = 0; k < p.n; k++, idx++) {
      const pt = punkte[idx];
      s += `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="${radius}" fill="${p.farbe || FARBEN[i % FARBEN.length]}"/>`;
    }
  });
  s += `<text x="${cx}" y="${cy - 8}" text-anchor="middle" class="g-gross">${zahl(gesamt)}</text>`;
  s += `<text x="${cx}" y="${cy + 12}" text-anchor="middle" class="g-klein">${esc(titel || "Sitze")}</text>`;
  s += "</svg>";
  const legende = sitze.map((p, i) => `<span class="leg"><i style="background:${p.farbe || FARBEN[i % FARBEN.length]}"></i>${esc(p.label)}: <b>${zahl(p.n)}</b></span>`).join("");
  return s + `<div class="legende">${legende}</div>`;
}

/** Einfache Tabelle. kopf: [..], zeilen: [[..]], hervor: Zeilenindex */
export function tabelle(kopf, zeilen, { titel = "", hervor = -1, rechts = [] } = {}) {
  const zelle = (z, j, tag) => `<${tag}${rechts.includes(j) ? ' class="r"' : ""}>${esc(z)}</${tag}>`;
  return `<div class="tab-wrap">${titel ? `<div class="tab-titel">${esc(titel)}</div>` : ""}<table class="gtab"><thead><tr>${kopf.map((k, j) => zelle(k, j, "th")).join("")}</tr></thead><tbody>${zeilen
    .map((z, i) => `<tr${i === hervor ? ' class="hervor"' : ""}>${z.map((c, j) => zelle(c, j, "td")).join("")}</tr>`).join("")}</tbody></table></div>`;
}

/**
 * Stimmzettel mit Kreuzen.
 * erst: [{name, partei}], zweit: [{partei}], kreuzE/kreuzZ: Indizes, zusatz: Text
 */
export function stimmzettel({ erst, zweit, kreuzE = [], kreuzZ = [], zusatz = "", durchgestrichen = false }) {
  const b = 340, zeileH = 26, oben = 52, h = oben + Math.max(erst.length, zweit.length) * zeileH + (zusatz ? 34 : 14);
  const kreuz = (x, y) => `<path d="M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x + 7} ${y - 7} L${x - 7} ${y + 7}" class="g-kreuz"/>`;
  let s = `<svg viewBox="0 0 ${b} ${h}" class="grafik stimmzettel" role="img" aria-label="Stimmzettel">`;
  s += `<rect x="1" y="1" width="${b - 2}" height="${h - 2}" rx="6" class="g-papier"/>`;
  s += `<text x="${b / 2}" y="18" text-anchor="middle" class="g-titel">Stimmzettel Bundestagswahl</text>`;
  s += `<text x="${b / 4}" y="40" text-anchor="middle" class="g-erst">Erststimme</text>`;
  s += `<text x="${(3 * b) / 4}" y="40" text-anchor="middle" class="g-zweit">Zweitstimme</text>`;
  s += `<line x1="${b / 2}" y1="28" x2="${b / 2}" y2="${h - 8}" class="g-trenn"/>`;
  erst.forEach((e, i) => {
    const y = oben + i * zeileH;
    s += `<text x="10" y="${y + 12}" class="g-text">${esc(e.name)}</text><text x="10" y="${y + 23}" class="g-klein">${esc(e.partei)}</text>`;
    s += `<circle cx="${b / 2 - 18}" cy="${y + 12}" r="9" class="g-kreis"/>`;
    if (kreuzE.includes(i)) s += kreuz(b / 2 - 18, y + 12);
  });
  zweit.forEach((z, i) => {
    const y = oben + i * zeileH;
    s += `<circle cx="${b / 2 + 18}" cy="${y + 12}" r="9" class="g-kreis"/>`;
    if (kreuzZ.includes(i)) s += kreuz(b / 2 + 18, y + 12);
    s += `<text x="${b / 2 + 34}" y="${y + 16}" class="g-text">${esc(z.partei)}</text>`;
  });
  if (zusatz) s += `<text x="${b / 2}" y="${h - 12}" text-anchor="middle" class="g-hand">${esc(zusatz)}</text>`;
  if (durchgestrichen) s += `<line x1="10" y1="${h - 10}" x2="${b - 10}" y2="30" class="g-kreuz"/>`;
  return s + "</svg>";
}

/** Zeitstrahl mit Ereignissen. ereignisse: [{datum: "05.03.", text}] */
export function zeitstrahl(ereignisse, { titel = "" } = {}) {
  const b = 340, h = 40 + ereignisse.length * 34;
  let s = `<svg viewBox="0 0 ${b} ${h}" class="grafik" role="img" aria-label="${esc(titel)}">`;
  if (titel) s += `<text x="${b / 2}" y="18" text-anchor="middle" class="g-titel">${esc(titel)}</text>`;
  s += `<line x1="86" y1="30" x2="86" y2="${h - 10}" class="g-trenn"/>`;
  ereignisse.forEach((e, i) => {
    const y = 44 + i * 34;
    s += `<circle cx="86" cy="${y}" r="6" fill="${FARBEN[i % FARBEN.length]}"/>`;
    s += `<text x="74" y="${y + 4}" text-anchor="end" class="g-wert">${esc(e.datum)}</text>`;
    s += `<text x="100" y="${y + 4}" class="g-text">${esc(e.text)}</text>`;
  });
  return s + "</svg>";
}
