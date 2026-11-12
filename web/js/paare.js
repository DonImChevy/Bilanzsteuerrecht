// Spiel „Paare finden“: Normen-Paare je Modul.
import { PAARE_EST } from "./est/paare.js";
import { PAARE_BSR } from "./bilr/paare.js";
import { PAARE_OER } from "./oer/paare.js";
import { PAARE_UST } from "./ust/paare.js";
import { PAARE_AO } from "./ao/paare.js";
import { PAARE_PR } from "./pr/paare.js";
import { PAARE_BEWR } from "./bewr/paare.js";

export const PAARE = { est: PAARE_EST, bsr: PAARE_BSR, oer: PAARE_OER, ust: PAARE_UST, ao: PAARE_AO, pr: PAARE_PR, bewr: PAARE_BEWR };
