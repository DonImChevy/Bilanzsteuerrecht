// Garderobe: Taler auf der Bühne (mit Anprobe), Guthaben, Kategorien und Artikelkarten.
import { ic } from "./icons.js";
import { taler } from "./maskottchen.js";
import { SLOTS, ARTIKEL, STANDARD, FARBWELTEN, artikel, besitzt, kaufbar } from "./garderobe.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const zahl = (n) => Math.round(n).toLocaleString("de-DE");

/** Kleine Münze mit Betrag (Taler-Währung). */
export const talerBetrag = (n, klasse = "") => `<span class="taler-betrag ${klasse}"><i aria-hidden="true"></i>${zahl(n)}</span>`;

/** Vorschau eines Artikels: Taler mit genau diesem Teil (Hintergründe als Farbfeld). */
function vorschau(a) {
  if (a.slot === "hintergrund") return `<span class="hg-muster hg-${a.id}" aria-hidden="true"></span>`;
  return taler("hallo", { groesse: 72, klasse: "ruhig", outfit: { ...STANDARD, [a.slot]: a.id } });
}

/**
 * Inhalt der Garderobe.
 * z = {slot, probe}; outfit = getragenes Outfit; gekauft; guthaben; level; farbwelt; hatBild = eigenes Bild gespeichert.
 */
export function garderobeView(z, { outfit, gekauft, guthaben, level, farbwelt = "standard", hatBild = false }) {
  const probe = z.probe ? artikel(z.probe) : null;
  const zeige = probe && probe.slot !== "hintergrund" ? { ...outfit, [probe.slot]: probe.id } : outfit;
  let aktion = "";
  if (probe) {
    const k = kaufbar(probe.id, { gekauft, guthaben, level }), an = outfit[probe.slot] === probe.id;
    const bildWahl = probe.id === "eigenesbild" && besitzt(probe.id, gekauft)
      ? `<label class="knopf${hatBild ? " zweit" : ""}" style="cursor:pointer">${ic("bild")} ${hatBild ? "Anderes Bild wählen" : "Bild aus der Galerie wählen"}<input type="file" id="hgBildDatei" accept="image/*" hidden></label>` : "";
    const knopf = probe.id === "eigenesbild" && besitzt(probe.id, gekauft) && !hatBild ? ""
      : besitzt(probe.id, gekauft)
      ? (an ? (["augen", "metall", "hintergrund"].includes(probe.slot) ? `<button class="knopf zweit" disabled>${ic("haken")} ${probe.slot === "hintergrund" ? "Wird verwendet" : "Wird getragen"}</button>`
        : `<button class="knopf zweit" data-a="garAblegen" data-v="${probe.slot}">Ablegen</button>`)
        : `<button class="knopf" data-a="garAnziehen" data-v="${probe.id}">${probe.slot === "hintergrund" ? "Verwenden" : "Anziehen"}</button>`)
      : k.ok ? `<button class="knopf gold" data-a="garKaufen" data-v="${probe.id}">Kaufen für ${talerBetrag(probe.preis, "im-knopf")}</button>`
      : k.grund === "level" ? `<button class="knopf zweit" disabled>${ic("schloss")} Ab Level ${probe.level}</button>`
      : `<button class="knopf zweit" disabled>Noch ${talerBetrag(k.fehlt, "im-knopf")} fehlen</button>`;
    aktion = `<div class="gar-info"><div><b>${esc(probe.name)}</b><span>${esc(probe.text)}</span></div>${bildWahl}${knopf}</div>`;
  }
  const slot = z.slot || "kopf";
  const karten = ARTIKEL.filter((a) => a.slot === slot).map((a) => {
    const hat = besitzt(a.id, gekauft), an = outfit[a.slot] === a.id;
    const gesperrt = !hat && level < a.level;
    const marke = an ? `<span class="gk-marke an">${ic("haken", "klein")} Getragen</span>` : hat ? `<span class="gk-marke">Im Schrank</span>`
      : gesperrt ? `<span class="gk-marke zu">${ic("schloss", "klein")} Level ${a.level}</span>` : talerBetrag(a.preis, a.preis > guthaben ? "zu-teuer" : "");
    return `<button class="gar-karte${z.probe === a.id ? " gewaehlt" : ""}${gesperrt ? " gesperrt" : ""}${hat ? " hat" : ""}" data-a="garProbe" data-v="${a.id}" aria-pressed="${z.probe === a.id}" aria-label="${esc(a.name)}${hat ? ", im Schrank" : `, ${a.preis} Taler`}">
      <span class="gk-bild">${vorschau(a)}</span><span class="gk-name">${esc(a.name)}</span>${marke}</button>`;
  }).join("");
  const anzahl = ARTIKEL.filter((a) => a.preis > 0 && gekauft[a.id]).length, kaufbarGesamt = ARTIKEL.filter((a) => a.preis > 0).length;
  return `<div class="garderobe">
    <section class="gar-buehne">
      <div class="gar-kasse">${talerBetrag(guthaben, "gross")}<small>Taler</small></div>
      <div class="gar-licht" aria-hidden="true"></div>
      ${probe?.slot === "hintergrund" ? `<div class="gar-hg-vorschau hg-${probe.id}" aria-hidden="true"></div>` : ""}
      <div class="gar-figur">${taler(probe ? "jubeln" : "hallo", { groesse: 150, outfit: zeige, label: "Taler mit deinem Outfit" })}</div>
      <div class="gar-podest" aria-hidden="true"></div>
      ${aktion || `<div class="gar-info leer"><span>Tippe einen Artikel an, um ihn anzuprobieren.</span></div>`}
    </section>
    <div class="gar-tabs" role="tablist">${SLOTS.map((s) => `<button role="tab" aria-selected="${slot === s.id}" class="${slot === s.id ? "aktiv" : ""}" data-a="garSlot" data-v="${s.id}">${ic(s.icon, "klein")}${s.name}</button>`).join("")}</div>
    ${slot === "hintergrund" ? `<div class="gruppe-titel" style="margin:4px 0 8px">Farbwelt der App <span class="sub" style="text-transform:none;letter-spacing:0">kostenlos</span></div>
      <div class="farbwelten">${FARBWELTEN.map((f) => `<button class="farbwelt-karte${farbwelt === f.id ? " aktiv" : ""}" data-a="farbwelt" data-v="${f.id}" aria-pressed="${farbwelt === f.id}" style="--fw:${f.hell};--fw-d:${f.dunkel}">
        <span class="fw-muster fw-${f.id}" aria-hidden="true"><i></i><i></i><i></i></span><b>${esc(f.name)}</b><small>${esc(f.text)}</small></button>`).join("")}</div>
      <div class="gruppe-titel" style="margin:16px 0 8px">Hintergründe</div>` : ""}
    <div class="gar-raster">${karten}</div>
    <div class="gruppe-fuss" style="margin:12px 4px 20px">Für je 10 XP bekommst du einen Taler – alle bisherigen XP zählen mit. ${anzahl} von ${kaufbarGesamt} Artikeln im Schrank. Gekauftes bleibt für immer und wird mit dem Sync-Code auf alle Geräte übertragen.</div>
  </div>`;
}
