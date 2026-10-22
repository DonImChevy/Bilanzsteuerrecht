// Stichworte aller Frage-Antwort-Aufgaben (automatische Prüfung, siehe ../offen.js).
// Format je Aufgabe: { norm?: ["GG 51|GG 50"], s: ["stichwort|synonym", "zwei wortteile", …], min? }
// norm fehlt → erste Norm der Aufgabe ist Pflicht; norm: [] → keine Pflichtnorm. min fehlt → 60 % der Stichworte.
import { SW_OER_SKRIPT } from "./oer-skript.js";
import { SW_OER_FRAGEN_A } from "./oer-fragen-a.js";
import { SW_OER_FRAGEN_B } from "./oer-fragen-b.js";
import { SW_EST } from "./est.js";
import { SW_UST } from "../ust/aufgaben.js";
import { SW_BSR_TEIL2 } from "../bilr/teil2.js";

export const STICHWORTE = { ...SW_OER_SKRIPT, ...SW_OER_FRAGEN_A, ...SW_OER_FRAGEN_B, ...SW_EST, ...SW_BSR_TEIL2, ...SW_UST };
