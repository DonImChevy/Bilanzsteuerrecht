// Löst Normverweise wie "GG 51 3 2" (Art. 51 Abs. 3 Satz 2 GG) in Text auf.
import { NORMEN } from "./normen.js";

const INDEX = new Map(NORMEN.map((n) => [`${n.g} ${n.nr}`, n]));

export function norm(ref) {
  const [g, nr, abs, satz] = ref.split(" ");
  const n = INDEX.get(`${g} ${nr}`);
  if (!n) return null;
  const absaetze = abs ? n.abs.filter((a) => a.abs === abs) : n.abs;
  if (abs && !absaetze.length) return null;
  const teile = [];
  if (g === "GG") teile.push(nr === "Präambel" ? "Präambel" : `Art. ${nr}`);
  else teile.push(`§ ${nr}`);
  if (abs) teile.push(`Abs. ${abs}`);
  if (satz) teile.push(`S. ${satz}`);
  return { ref, label: `${teile.join(" ")} ${g}`, titel: n.titel, absaetze };
}

export const normGueltig = (ref) => norm(ref) !== null;
export { NORMEN };
