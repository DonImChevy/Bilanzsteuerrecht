// Spiel „Paare finden“: Normen-Paare je Modul.
import { PAARE_EST } from "./est/paare.js";
import { PAARE_BSR } from "./bilr/paare.js";
import { PAARE_OER } from "./oer/paare.js";

export const PAARE = { est: PAARE_EST, bsr: PAARE_BSR, oer: PAARE_OER };
