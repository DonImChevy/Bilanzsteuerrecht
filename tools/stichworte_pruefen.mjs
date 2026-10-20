// Prüft die Stichwort-Dateien: node tools/stichworte_pruefen.mjs [teil]   (teil = oer-skript | oer-fragen-a | oer-fragen-b | est)
// Gibt fehlende Einträge und Musterantworten aus, die an ihren eigenen Stichworten scheitern.
import { ALLE } from "../web/js/katalog.js";
import { Zufall } from "../web/js/kern.js";
import { STICHWORTE } from "../web/js/stichworte/index.js";
import { pruefeOffen } from "../web/js/offen.js";
import { OER_SKRIPT } from "../web/js/oer/skript.js";
import { EST_AUFGABEN } from "../web/js/est/aufgaben.js";

const offen = ALLE.map((v) => v.erzeugen(new Zufall(1))).filter((f) => f.typ === "offen");
const skript = new Set(OER_SKRIPT.map((v) => v.id)), est = new Set(EST_AUFGABEN.map((v) => v.id));
const oerRest = offen.filter((f) => !skript.has(f.id) && !est.has(f.id)).map((f) => f.id);
const haelfte = Math.ceil(oerRest.length / 2);
const TEILE = {
  "oer-skript": (f) => skript.has(f.id), "est": (f) => est.has(f.id),
  "oer-fragen-a": (f) => oerRest.slice(0, haelfte).includes(f.id), "oer-fragen-b": (f) => oerRest.slice(haelfte).includes(f.id),
};
const teil = process.argv[2];
const liste = teil ? offen.filter(TEILE[teil]) : offen;
if (process.argv[3] === "--liste") { for (const f of liste) console.log(JSON.stringify({ id: f.id, text: f.text, antwort: f.antwort, normen: f.normen })); process.exit(0); }
let fehler = 0;
for (const f of liste) {
  if (!STICHWORTE[f.id]) { console.log("FEHLT", f.id); fehler++; continue; }
  const p = pruefeOffen(f, f.antwort);
  if (!p.korrekt) { fehler++; console.log("MUSTER SCHEITERT", f.id, p.normen.filter((n) => !n.ok).map((n) => "Norm " + n.label).join(", "), p.stichworte.filter((s) => !s.ok).map((s) => s.wort).join(", ")); }
  else if (p.treffer < p.stichworte.length) console.log("Hinweis", f.id, "Muster trifft nur", p.treffer + "/" + p.stichworte.length, p.stichworte.filter((s) => !s.ok).map((s) => s.wort).join(", "));
}
const ids = new Set(offen.map((f) => f.id));
for (const id of Object.keys(STICHWORTE)) if (!ids.has(id)) { console.log("UNBEKANNT", id); fehler++; }
console.log(`${liste.length} Aufgaben, ${fehler} Probleme`);
process.exit(fehler ? 1 : 0);
