// BilBf – Bilanz und Buchführung (Ausbildung, FTA I): eigene Aufgaben zum Thema „AfA – Grundzüge“.
// Lehrplan: nur lineare AfA nach § 7 Abs. 1 EStG, Digital-AfA (BMF-Schreiben vom 22.02.2022) und die Buchungstechnik.
// Alle übrigen BilBf-Themen teilt das Modul mit Bilanzrecht Teil I (siehe THEMEN_BBF in kern.js).
import { auswahl, zahl, buchung, einfach } from "../kern.js";
import * as G from "../geld.js";

const T = "bbf-afa";
const eur = G.euro;
const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
// Wirtschaftsgut, Konto, Nutzungsdauer laut AfA-Tabelle, Spanne der Anschaffungskosten (€)
const GUETER = [
  ["eine Verpackungsmaschine", "maschinen", 10, 20000, 90000],
  ["einen Lieferwagen", "fuhrpark", 6, 24000, 60000],
  ["eine Ladeneinrichtung", "bga", 8, 8000, 40000],
  ["einen Gabelstapler", "maschinen", 8, 12000, 36000],
  ["Büromöbel", "bga", 13, 5200, 26000],
];
const KONTO = { maschinen: "Technische Anlagen und Maschinen", fuhrpark: "Fuhrpark", bga: "Betriebs- und Geschäftsausstattung" };

/** AK als Vielfaches der Nutzungsdauer × 12, damit Jahres- und Monatsbeträge glatt sind. */
const anschaffung = (r, nd, von, bis) => r.zahl(Math.ceil(von / (nd * 1200)), Math.floor(bis / (nd * 1200))) * nd * 1200;

const jahr1 = {
  id: "bbf-afa-jahr1", thema: T,
  erzeugen: (r) => {
    const [gut, , nd, von, bis] = r.wahl(GUETER), ak = anschaffung(r, nd, von, bis);
    const bestellt = r.zahl(1, 9), geliefert = bestellt + r.zahl(1, 2), monate = 13 - geliefert, afa = (ak / nd) * monate / 12;
    return zahl("bbf-afa-jahr1", T,
      `Ein Einzelhändler bestellt am ${r.zahl(3, 25)}. ${MONATE[bestellt - 1]} 01 verbindlich ${gut} für ${eur(ak * 100)} zzgl. ${eur(ak * 19)} USt. Geliefert wird am ${r.zahl(2, 27)}. ${MONATE[geliefert - 1]} 01. Betriebsgewöhnliche Nutzungsdauer: ${nd} Jahre (lineare AfA).\n\nWie hoch ist die AfA im Jahr 01 (in €)?`,
      Math.round(afa * 100),
      `Angeschafft ist das Wirtschaftsgut mit der Lieferung im ${MONATE[geliefert - 1]} – nicht mit der Bestellung. Anschaffungskosten ohne Vorsteuer: ${eur(ak * 100)}.\nJahres-AfA: ${eur(ak * 100)} / ${nd} Jahre = ${eur(ak / nd * 100)} (§ 7 Abs. 1 S. 1 EStG).\nIm Anschaffungsjahr zeitanteilig, der Liefermonat zählt voll (§ 7 Abs. 1 S. 4 EStG): ${MONATE[geliefert - 1]}–Dezember = ${monate} Monate → ${eur(ak / nd * 100)} × ${monate}/12 = ${eur(afa * 100)}.`);
  },
};

const buchwert = {
  id: "bbf-afa-buchwert", thema: T,
  erzeugen: (r) => {
    const [gut, , nd, von, bis] = r.wahl(GUETER), ak = anschaffung(r, nd, von, bis);
    const monat = r.zahl(1, 12), jahre = r.zahl(2, Math.min(4, nd - 1)), jahresAfa = ak / nd;
    const afa1 = jahresAfa * (13 - monat) / 12, bw = ak - afa1 - jahresAfa * (jahre - 1);
    return zahl("bbf-afa-buchwert", T,
      `${gut[0].toUpperCase() + gut.slice(1)} wurde im ${MONATE[monat - 1]} 01 für ${eur(ak * 100)} (netto) angeschafft und wird linear über ${nd} Jahre abgeschrieben.\n\nWie hoch ist der Buchwert zum 31.12.0${jahre} (in €)?`,
      Math.round(bw * 100),
      `Jahres-AfA: ${eur(ak * 100)} / ${nd} = ${eur(jahresAfa * 100)} (§ 7 Abs. 1 S. 1 EStG).\n• 01: ${13 - monat}/12 → ${eur(afa1 * 100)} (§ 7 Abs. 1 S. 4 EStG)\n• 02${jahre > 2 ? `–0${jahre}` : ""}: ${jahre - 1} × ${eur(jahresAfa * 100)} = ${eur(jahresAfa * (jahre - 1) * 100)}\nBuchwert 31.12.0${jahre}: ${eur(ak * 100)} − ${eur(afa1 * 100)} − ${eur(jahresAfa * (jahre - 1) * 100)} = ${eur(bw * 100)}.`);
  },
};

const DIGITAL = [["ein Notebook", 3], ["einen Büro-PC mit Bildschirm", 3], ["einen Laserdrucker", 3], ["eine Warenwirtschafts-Software", 5], ["ein Tablet für den Außendienst", 3]];
const digital = {
  id: "bbf-afa-digital", thema: T,
  erzeugen: (r) => {
    const [gut, nd] = r.wahl(DIGITAL), monat = r.zahl(2, 11), ak = r.zahl(8, 40) * 60;
    const linear = (ak / nd) * (13 - monat) / 12;
    return zahl("bbf-afa-digital", T,
      `Eine Kauffrau erwirbt am ${r.zahl(2, 27)}. ${MONATE[monat - 1]} 01 ${gut} für ${eur(ak * 100)} zzgl. ${eur(ak * 19)} USt (ausschließlich betriebliche Nutzung). Die betriebsgewöhnliche Nutzungsdauer laut AfA-Tabelle beträgt ${nd} Jahre. Sie möchte im Jahr 01 einen möglichst niedrigen Gewinn ausweisen; § 6 Abs. 2 EStG soll nicht angewendet werden.\n\nWie hoch ist die AfA im Jahr 01 (in €)?`,
      ak * 100,
      `Für Computerhardware und Software darf nach dem BMF-Schreiben vom 22.02.2022 eine Nutzungsdauer von einem Jahr zugrunde gelegt werden (Digital-AfA); eine zeitanteilige Kürzung im Anschaffungsjahr ist nicht nötig.\nAfA 01 = volle Anschaffungskosten ohne Vorsteuer: ${eur(ak * 100)}.\nZum Vergleich linear (§ 7 Abs. 1 S. 1, 4 EStG): ${eur(ak * 100)} / ${nd} × ${13 - monat}/12 = ${eur(linear * 100)} – der Gewinn wäre höher.`);
  },
};

const afaBuchung = {
  id: "bbf-afa-buchung", thema: T,
  erzeugen: (r) => {
    const [gut, konto, nd, von, bis] = r.wahl(GUETER), ak = anschaffung(r, nd, von, bis), afa = ak / nd;
    return buchung("bbf-afa-buchung", T,
      `Zum 31.12.02 ist für ${gut} (Konto „${KONTO[konto]}“, Anschaffung im Januar 01 für ${eur(ak * 100)}, Nutzungsdauer ${nd} Jahre) die AfA für das Jahr 02 zu buchen.`,
      einfach("afa", konto, Math.round(afa * 100)),
      `Jahres-AfA: ${eur(ak * 100)} / ${nd} = ${eur(afa * 100)} (§ 7 Abs. 1 S. 1 EStG).\nDie AfA ist Aufwand → Soll auf dem Aufwandskonto „Abschreibungen“; das Anlagekonto nimmt ab → Haben (direkte Abschreibung). Das Aufwandskonto wird über das GuV-Konto abgeschlossen.`);
  },
};

const was = {
  id: "bbf-afa-was", thema: T,
  erzeugen: (r) => auswahl("bbf-afa-was", T,
    "Welche Wirtschaftsgüter werden planmäßig nach § 7 Abs. 1 EStG abgeschrieben? (Mehrfachauswahl)",
    ["Lieferwagen", "Ladeneinrichtung", "Verpackungsmaschine", "Grund und Boden", "Warenbestand", "Forderungen aus L.u.L."], [0, 1, 2],
    "Planmäßig abgeschrieben wird nur abnutzbares Anlagevermögen, dessen Nutzung sich über mehr als ein Jahr erstreckt (§ 7 Abs. 1 S. 1 EStG). Grund und Boden nutzt sich nicht ab; Waren und Forderungen gehören zum Umlaufvermögen.", r),
};

const regeln = {
  id: "bbf-afa-regeln", thema: T,
  erzeugen: (r) => auswahl("bbf-afa-regeln", T,
    "Welche Aussagen zur linearen AfA sind richtig? (Mehrfachauswahl)",
    ["Im Anschaffungsjahr wird zeitanteilig abgeschrieben; der Anschaffungsmonat zählt voll.",
      "Maßgeblich für den Beginn ist die Lieferung, nicht die Bestellung oder Bezahlung.",
      "Die Jahres-AfA ergibt sich aus Anschaffungskosten geteilt durch die Nutzungsdauer.",
      "Im Anschaffungsjahr wird immer die volle Jahres-AfA angesetzt.",
      "Die AfA beginnt erst mit der Bezahlung des Kaufpreises.",
      "Die abziehbare Vorsteuer gehört zur AfA-Bemessungsgrundlage."], [0, 1, 2],
    "§ 7 Abs. 1 S. 1 EStG: gleiche Jahresbeträge (AK / Nutzungsdauer). § 7 Abs. 1 S. 4 EStG: im Jahr der Anschaffung zeitanteilig, der Monat der Anschaffung zählt voll. Angeschafft ist ein Wirtschaftsgut mit der Lieferung. Die abziehbare Vorsteuer gehört nicht zu den Anschaffungskosten (§ 9b Abs. 1 EStG).", r),
};

const erinnerung = {
  id: "bbf-afa-erinnerung", thema: T,
  erzeugen: (r) => auswahl("bbf-afa-erinnerung", T,
    "Eine Maschine ist nach Ablauf der Nutzungsdauer vollständig abgeschrieben, wird aber weiter im Betrieb genutzt. Wie wird sie in der Praxis üblicherweise behandelt?",
    ["Sie bleibt mit einem Erinnerungswert von 1 € aktiviert.", "Sie wird ausgebucht, obwohl sie noch vorhanden ist.", "Sie wird auf den ursprünglichen Wert zugeschrieben.", "Sie wird als Aufwand erneut abgeschrieben."], [0],
    "Solange das Wirtschaftsgut vorhanden ist, wird es üblicherweise mit einem Erinnerungswert von 1 € fortgeführt – gesetzlich vorgeschrieben ist das nicht. Im letzten Jahr wird deshalb nur bis auf 1 € abgeschrieben.", r),
};

export const BBF_AUFGABEN = [jahr1, buchwert, digital, afaBuchung, was, regeln, erinnerung];
