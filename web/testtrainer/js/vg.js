// "Verarbeitungsgeschwindigkeit": two expressions built from geometric shapes, a legend
// (bottom left) assigns each shape a value from 1 to 9 – which side is larger (or smaller)?
// The legend changes with every task, as in the real test. Similar shapes (triangle up/down,
// trapezoid/parallelogram) are deliberate traps.
import { zahl } from "./zufall.js";


const STERN = (() => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const w = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? 4.4 : 10.5;
    p.push(`${(12 + rr * Math.cos(w)).toFixed(1)} ${(12.6 + rr * Math.sin(w)).toFixed(1)}`);
  }
  return `M${p.join("L")}Z`;
})();
const ECK = (n, rr = 10, dreh = -Math.PI / 2) => `M${Array.from({ length: n }, (_, i) => { const w = dreh + (2 * Math.PI * i) / n; return `${(12 + rr * Math.cos(w)).toFixed(1)} ${(12.4 + rr * Math.sin(w)).toFixed(1)}`; }).join("L")}Z`;

export const FORMEN = {
  kreis: { name: "Kreis", d: "M12 3a9 9 0 1 0 0.01 0Z" },
  quadrat: { name: "Quadrat", d: "M4 4h16v16H4Z" },
  dreieckOben: { name: "Dreieck (Spitze oben)", d: "M12 3 21.5 20H2.5Z" },
  dreieckUnten: { name: "Dreieck (Spitze unten)", d: "M2.5 4h19L12 21Z" },
  raute: { name: "Raute", d: "M12 2 22 12 12 22 2 12Z" },
  fuenfeck: { name: "Fünfeck", d: ECK(5) },
  sechseck: { name: "Sechseck", d: ECK(6, 10, 0) },
  stern: { name: "Stern", d: STERN },
  trapez: { name: "Trapez", d: "M7 5h10l5 14H2Z" },
  parallelogramm: { name: "Parallelogramm", d: "M8 5h14l-6 14H2Z" },
  kreuz: { name: "Kreuz", d: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z" },
  halbmond: { name: "Halbmond", d: "M15.5 3.2a9 9 0 1 0 0 17.6 7.2 7.2 0 0 1 0-17.6Z" },
  herz: { name: "Herz", d: "M12 20.5 4 12.6A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8 6.2Z" },
  rechteck: { name: "Rechteck (quer)", d: "M2 7h20v10H2Z" },
};
const IDS = Object.keys(FORMEN);

export const form = (id, gr = 30, kl = "") => `<svg class="vg-form ${kl}" width="${gr}" height="${gr}" viewBox="0 0 24 24" role="img" aria-label="${FORMEN[id].name}"><path d="${FORMEN[id].d}"/></svg>`;

const OPS = { "+": (a, b) => a + b, "−": (a, b) => a - b, "×": (a, b) => a * b };

/** Evaluate tokens [id, op, id, op, id] with × before +/−. */
export function auswerten(tok, wert) {
  const zahlen = [wert[tok[0]]], ops = [];
  for (let i = 1; i < tok.length; i += 2) {
    const o = tok[i], v = wert[tok[i + 1]];
    if (o === "×") zahlen[zahlen.length - 1] *= v;
    else { ops.push(o); zahlen.push(v); }
  }
  return ops.reduce((s, o, i) => OPS[o](s, zahlen[i + 1]), zahlen[0]);
}

function ausdruck(r, ids, stufe) {
  const n = stufe === 1 ? 2 : r.pick(stufe === 2 ? [2, 3] : [2, 3, 3]);
  const opsMoeglich = stufe === 1 ? ["+", "−"] : stufe === 2 ? ["+", "−", "−"] : ["+", "−", "×"];
  const tok = [r.pick(ids)];
  for (let i = 1; i < n; i++) {
    let o = r.pick(opsMoeglich);
    if (o === "×" && tok.includes("×")) o = "+";
    tok.push(o, r.pick(ids.filter((x) => !tok.includes(x))));
  }
  return tok;
}

const zeigen = (tok, wert) => tok.map((t, i) => (i % 2 ? ` ${t} ` : wert[t])).join("");

export function vergleich(r, stufe = 2) {
  const ids = r.shuffle(IDS).slice(0, 9);
  const werte = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const wert = Object.fromEntries(ids.map((id, i) => [id, werte[i]]));
  const frage = stufe === 1 ? "groesser" : r.pick(["groesser", "kleiner"]);
  for (let versuch = 0; versuch < 60; versuch++) {
    const L = ausdruck(r, ids, stufe), R = ausdruck(r, ids, stufe);
    const l = auswerten(L, wert), rr = auswerten(R, wert);
    if (l === rr) continue;
    if (stufe === 3 && Math.abs(l - rr) > 4 && versuch < 50) continue; // close values are harder
    const links = frage === "groesser" ? l > rr : l < rr;
    return {
      vg: true, frageArt: frage,
      frage: frage === "groesser" ? "Welcher Wert ist größer?" : "Welcher Wert ist kleiner?",
      links: L, rechts: R,
      legende: ids.map((id) => [id, wert[id]]).sort((a, b) => a[1] - b[1]),
      optionen: ["Links", "Rechts"], richtig: links ? 0 : 1, festeReihenfolge: true,
      werte: [l, rr],
      schritte: [
        `Links: ${L.map((t, i) => (i % 2 ? ` ${t} ` : form(t, 18, "inline"))).join("")} = ${zeigen(L, wert)} = <b>${zahl(l)}</b>`,
        `Rechts: ${R.map((t, i) => (i % 2 ? ` ${t} ` : form(t, 18, "inline"))).join("")} = ${zeigen(R, wert)} = <b>${zahl(rr)}</b>`,
        `${zahl(l)} ${l > rr ? ">" : "<"} ${zahl(rr)} → ${frage === "groesser" ? "größer" : "kleiner"} ist <b>${links ? "links" : "rechts"}</b>`,
      ],
      schema: ["Frage lesen: größer oder kleiner? (wechselt!)", "Werte aus der Legende unten links ablesen – sie ändert sich bei jeder Aufgabe", "Punkt vor Strich, dann vergleichen", "Ähnliche Formen genau unterscheiden (Dreieck oben/unten, Trapez/Parallelogramm)"],
    };
  }
  return vergleich(r, stufe);
}

// tokens are shape ids (even positions) and operators (odd positions)
export const ausdruckHtml = (tok, gr = 34) => tok.map((t, i) => (i % 2 ? `<span class="vg-op">${t}</span>` : form(t, gr))).join("");
