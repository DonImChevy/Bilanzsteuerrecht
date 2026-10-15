import { VORLAGEN } from "./vorlagen.js";
import { FESTE } from "./feste.js";
import { THEMEN, Zufall } from "./kern.js";

export const ALLE = [...VORLAGEN, ...FESTE];

export const vorlagenFuer = (thema) => ALLE.filter((v) => v.thema === thema);

const istBuchung = (v) => v.erzeugen(new Zufall(1)).typ === "buchung";
const BUCHUNGS_IDS = new Set(ALLE.filter(istBuchung).map((v) => v.id));

/** Zieht `anzahl` Aufgaben; jede Vorlage kommt erst wieder dran, wenn alle anderen einmal dran waren. */
export function fragen(themen, anzahl, r, nurBuchung = false) {
  let pool = ALLE.filter((v) => themen.includes(v.thema));
  if (nurBuchung) pool = pool.filter((v) => BUCHUNGS_IDS.has(v.id));
  if (!pool.length || anzahl <= 0) return [];
  const out = [];
  let runde = [];
  while (out.length < anzahl) {
    if (!runde.length) runde = r.mischen(pool);
    out.push(runde.pop().erzeugen(r));
  }
  return out;
}

export function klausur(anzahl, r) {
  const alle = THEMEN.map((t) => t.id);
  const b = fragen(alle, Math.ceil(anzahl * 0.6), r, true);
  const rest = fragen(alle, anzahl - b.length, r);
  return r.mischen([...b, ...rest]);
}
