// Ansichten zum Levelsystem: Level-Münze, Levelseite mit Rangleiter, XP-Quellen und Münzalbum (Erfolge),
// Level-Up-Feier und Erfolgs-Banner. Die Münzen tragen das Metall des Rangs (CSS-Variablen --rang-<id>).
import { ic } from "./icons.js";
import { taler } from "./maskottchen.js";
import { XP, RAENGE, REIHEN, ERFOLGE, levelAus, xpGesamt, kennzahlen, fortschritt, xpFuerLevel } from "./level.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const zahl = (n) => Math.round(n).toLocaleString("de-DE");

/** Münze im Metall eines Rangs; innen die Levelzahl oder ein Icon. */
export function muenze(rangId, inhalt, { groesse = 44, klasse = "", label = "" } = {}) {
  return `<span class="muenze ${klasse}" style="--rang:var(--rang-${rangId});--rang-tinte:var(--rang-${rangId}-tinte);--g:${groesse}px"${label ? ` role="img" aria-label="${esc(label)}"` : ` aria-hidden="true"`}><span class="mz-feld">${inhalt}</span></span>`;
}
export const levelMuenze = (lv, groesse, klasse = "") =>
  muenze(lv.rang.id, `<b class="mz-zahl${lv.level >= 100 ? " drei" : ""}">${lv.level}</b>`, { groesse, klasse, label: `Level ${lv.level}, Rang ${lv.rang.name}` });

/** Kompakte Levelzeile für die Startseite (öffnet die Levelseite). */
export function levelZeile(stat) {
  const lv = levelAus(xpGesamt(stat).gesamt);
  return `<button class="lv-zeile" data-a="level" aria-label="Level ${lv.level}, ${zahl(lv.imLevel)} von ${zahl(lv.noetig)} XP – Level und Erfolge öffnen">
    ${levelMuenze(lv, 40)}
    <span class="lv-text"><span class="lv-oben"><b>Level ${lv.level}</b><span>${esc(lv.rang.name)}</span></span>
      <span class="lv-balken"><span style="width:${Math.round(lv.anteil * 100)}%"></span></span>
      <span class="lv-unten">${lv.max ? "Höchstes Level erreicht" : `${zahl(lv.imLevel)} / ${zahl(lv.noetig)} XP bis Level ${lv.level + 1}`}</span></span>
    ${ic("pfeil", "klein")}</button>`;
}

const QUELLEN = [
  [`+${XP.richtig}`, "je richtig gelöste Aufgabe"],
  [`+${XP.falsch}`, "auch bei falscher Antwort – dranbleiben zählt"],
  [`+${XP.buchung}`, "extra für einen richtigen Buchungssatz"],
  [`+${XP.serieSchritt} bis +${XP.serieMax}`, `Serienbonus ab der ${XP.serieAb}. richtigen Antwort in Folge`],
  [`+${XP.tag[0][1]} · +${XP.tag[1][1]} · +${XP.tag[2][1]}`, `Tagesbonus ab ${XP.tag[0][0]}, ${XP.tag[1][0]} und ${XP.tag[2][0]} Aufgaben an einem Tag`],
  [`+${XP.pfadFrage}`, "je richtige Frage im Lernpfad"],
  [`+${XP.pfadStern}`, "je Stern eines Lernpfad-Blocks (Bestwert)"],
  [`+${XP.klausur}`, `je abgegebene Klausur, +${XP.klausurGut} ab 80 % richtig`],
  [`+${XP.paare}`, `je geschaffte Runde „Paare finden“, +${XP.paareFehlerfrei} ohne Fehler`],
  [`+${XP.duellSieg}`, "je gewonnenes Duell"],
  ["+25 bis +1.500", "je freigeschalteter Erfolg – je höher die Stufe, desto mehr"],
];

/** Inhalt der Levelseite (Sheet). */
export function levelSeite(stat) {
  const x = xpGesamt(stat), lv = levelAus(x.gesamt), k = kennzahlen(stat, lv.level), frei = stat.erfolge || {};
  const anzahl = ERFOLGE.filter((e) => frei[e.id]).length;
  const leiter = RAENGE.map((r) => {
    const erreicht = lv.level >= r.ab, aktuell = lv.rang.id === r.id;
    return `<li class="lv-stufe${erreicht ? "" : " zu"}${aktuell ? " aktuell" : ""}">${erreicht ? muenze(r.id, `<b class="mz-zahl">${r.ab}</b>`, { groesse: 38 }) : `<span class="mz-slot" style="--g:38px" aria-hidden="true">${r.ab}</span>`}
      <span>${esc(r.name)}</span><small>ab Level ${r.ab}</small></li>`;
  }).join("");
  const reihe = (r) => {
    const stufen = ERFOLGE.filter((e) => e.reihe === r.id);
    let naechsteGezeigt = false;
    const coins = stufen.map((e) => {
      const ok = !!frei[e.id], f = fortschritt(e, k);
      const zeigeFortschritt = !ok && !naechsteGezeigt;
      if (!ok) naechsteGezeigt = true;
      const ziel = e.ziel >= 1000 ? `${e.ziel / 1000} Tsd.` : e.ziel;
      return `<li class="album-platz${ok ? " frei" : ""}" title="${esc(e.titel)}: ${esc(e.text)}${e.lohn ? ` (+${e.lohn} XP)` : ""}">
        ${ok ? muenze(rangFuerStufe(e.stufe), ic(r.icon), { groesse: 46, label: `${e.titel} – freigeschaltet` })
          : `<span class="mz-slot${zeigeFortschritt ? " laeuft" : ""}" style="--g:46px;--p:${Math.round(f.anteil * 100)}" role="img" aria-label="${esc(e.titel)} – ${zahl(f.wert)} von ${zahl(e.ziel)}">${zeigeFortschritt ? `<small>${zahl(f.wert)}</small>` : ic(r.icon)}</span>`}
        <span class="ap-name">${esc(e.titel)}</span><small>${ziel}</small></li>`;
    }).join("");
    const geschafft = stufen.filter((e) => frei[e.id]).length;
    return `<div class="album-reihe"><div class="ar-kopf"><b>${esc(r.titel)}</b><span>${geschafft} von ${stufen.length}</span></div><ol class="album-muenzen">${coins}</ol></div>`;
  };
  const einzeln = ERFOLGE.filter((e) => !e.reihe).map((e) => {
    const ok = !!frei[e.id];
    return `<li class="album-platz${ok ? " frei" : ""}" title="${esc(e.text)} (+${e.lohn} XP)">
      ${ok ? muenze("gold", ic(e.icon), { groesse: 46, label: `${e.titel} – freigeschaltet` }) : `<span class="mz-slot" style="--g:46px" role="img" aria-label="${esc(e.titel)} – noch nicht freigeschaltet">${ic(e.icon)}</span>`}
      <span class="ap-name">${esc(e.titel)}</span><small>${esc(e.text)}</small></li>`;
  }).join("");
  return `<div class="lv-seite">
    <section class="lv-held">
      ${levelMuenze(lv, 104, "gross")}
      <div class="lv-held-text"><h2>Level ${lv.level}</h2><div class="sub">Rang ${esc(lv.rang.name)} · ${zahl(x.gesamt)} XP gesamt</div>
        <span class="lv-balken gross"><span style="width:${Math.round(lv.anteil * 100)}%"></span></span>
        <div class="sub">${lv.max ? "Du hast das höchste Level erreicht." : `Noch ${zahl(lv.noetig - lv.imLevel)} XP bis Level ${lv.level + 1}`}</div></div>
    </section>
    <div class="gruppe"><div class="gruppe-titel">Ränge</div><ol class="lv-leiter">${leiter}</ol>
      <div class="gruppe-fuss">Jedes Level braucht 50 XP mehr als das vorige. Level 100 liegt bei ${zahl(xpFuerLevel(100))} XP – das schafft man mit regelmäßigem Lernen in etwa zwei bis drei Jahren.</div></div>
    <div class="gruppe"><div class="gruppe-titel">So sammelst du XP</div><ul class="xp-quellen">${QUELLEN.map(([w, t]) => `<li><b>${w}</b><span>${t}</span></li>`).join("")}</ul></div>
    <div class="gruppe"><div class="gruppe-titel">Münzalbum <span class="sub" style="text-transform:none;letter-spacing:0">${anzahl} von ${ERFOLGE.length} Erfolgen</span></div>
      ${REIHEN.map(reihe).join("")}
      <div class="album-reihe"><div class="ar-kopf"><b>Besondere Momente</b><span>${ERFOLGE.filter((e) => !e.reihe && frei[e.id]).length} von ${ERFOLGE.filter((e) => !e.reihe).length}</span></div><ol class="album-muenzen einzeln">${einzeln}</ol></div>
    </div>
  </div>`;
}

/** Metall einer Erfolgsstufe: die erste Kupfer, dann aufsteigend. */
const rangFuerStufe = (i) => RAENGE[Math.min(RAENGE.length - 2, i)].id;

/** Level-Up-Feier als eigene Ebene (liegt außerhalb von #app). */
export function levelFeier(vorher, nachher) {
  const neuerRang = nachher.rang.id !== vorher.rang.id;
  const strahlen = Array.from({ length: 12 }, (_, i) => `<path d="M-6 -34 L0 -100 L6 -34Z" transform="rotate(${i * 30})"/>`).join("");
  return `<div class="lv-feier-karte" role="dialog" aria-modal="true" aria-labelledby="lvFeierTitel">
    <div class="lv-feier-buehne"><svg class="lv-strahlen" viewBox="-100 -100 200 200" aria-hidden="true">${strahlen}</svg>
      ${levelMuenze(nachher, 132, "praegen")}
      <span class="lv-feier-taler">${taler("jubeln", { groesse: 64 })}</span></div>
    <h2 id="lvFeierTitel">Level ${nachher.level}!</h2>
    ${neuerRang ? `<div class="lv-neuer-rang">Neuer Rang: <b>${esc(nachher.rang.name)}</b></div>` : ""}
    <p>${nachher.max ? "Das höchste Level – Taler verneigt sich." : `Bis Level ${nachher.level + 1} brauchst du ${zahl(nachher.noetig)} XP.`}</p>
    <button class="knopf" data-lv="zu">Weiter</button></div>`;
}

/** Banner für einen freigeschalteten Erfolg. */
export function erfolgBanner(e) {
  const reihe = REIHEN.find((r) => r.id === e.reihe);
  return `${muenze(e.reihe ? rangFuerStufe(e.stufe) : "gold", ic(e.icon || reihe?.icon), { groesse: 42 })}
    <span class="eb-text"><small>Erfolg freigeschaltet</small><b>${esc(e.titel)}</b><span>${esc(e.text)}</span></span>${e.lohn ? `<span class="eb-xp">+${zahl(e.lohn)} XP</span>` : ""}`;
}

/** Hinweis beim ersten Start mit Levelsystem für alle, die schon gelernt haben. */
export function levelStartFeier(stat) {
  const lv = levelAus(xpGesamt(stat).gesamt), n = Object.keys(stat.erfolge || {}).length;
  return `<div class="lv-feier-karte" role="dialog" aria-modal="true" aria-labelledby="lvFeierTitel">
    <div class="lv-feier-buehne">${levelMuenze(lv, 120, "praegen")}<span class="lv-feier-taler">${taler("jubeln", { groesse: 60 })}</span></div>
    <h2 id="lvFeierTitel">Neu: Level und Erfolge</h2>
    <p>Für alles, was du schon gelernt hast, startest du direkt auf <b>Level ${lv.level}</b> (${esc(lv.rang.name)})${n ? ` mit <b>${n} ${n === 1 ? "Erfolg" : "Erfolgen"}</b> im Münzalbum` : ""}. Ab jetzt bringt jede Aufgabe XP.</p>
    <button class="knopf" data-lv="album">Münzalbum ansehen</button><button class="knopf zweit" data-lv="zu">Weiter</button></div>`;
}
