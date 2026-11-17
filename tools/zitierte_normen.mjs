// Ermittelt je Modul die zitierten Normen, die im Normen-Tab fehlen (Bedarf für tools/xml_normen.py).
// Aufruf: node tools/zitierte_normen.mjs > bedarf.json
//   → { fach: { tab: [Normen mit Text, die noch nicht im Tab des Moduls stehen], text: [Normen ganz ohne Text] } }
// Normen aus oer/normen_zitiert.js (zitiert: true) zählen dabei als „ohne Text“, damit die Datei neu entsteht.
import path from "node:path";
import { zitateJeModul } from "./zitate.mjs";
const WURZEL = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
await import(path.join(WURZEL, "web/js/kern.js"));
const { THEMEN } = await import(path.join(WURZEL, "web/js/kern.js"));
const { KOMPAKT } = await import(path.join(WURZEL, "web/js/kompakt.js"));
const { NORMEN } = await import(path.join(WURZEL, "web/js/oer/normtext.js"));
const basis = new Map(NORMEN.filter((n) => !n.zitiert).map((n) => [`${n.g} ${n.nr}`, n]));
const sortiert = (a) => [...a].sort((x, y) => x.localeCompare(y, "de", { numeric: true }));
const erg = {};
for (const [fach, z] of Object.entries(zitateJeModul(WURZEL, KOMPAKT, THEMEN))) {
  const tab = [], text = [];
  for (const k of z.keys()) {
    const n = basis.get(k);
    if (!n) text.push(k);
    else if (!(n.faecherBasis || n.faecher).includes(fach)) tab.push(k);
  }
  erg[fach] = { tab: sortiert(tab), text: sortiert(text) };
}
console.log(JSON.stringify(erg, null, 1));
