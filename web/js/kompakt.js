// Kompaktwissen: je Thema eine Zusammenfassung zum Wiederholen – nicht vollständig, aber mit dem, was in Klausuren
// immer wieder gefragt wird. Lese-Ansicht und Bibliothek; Normzitate im Text öffnen den Gesetzestext.
import { KOMPAKT_UST, KLAUSUR_UST } from "./ust/kompakt.js";
import { KOMPAKT_BSR, KLAUSUR_BSR } from "./bilr/kompakt.js";
import { KOMPAKT_EST, KLAUSUR_EST } from "./est/kompakt.js";
import { KOMPAKT_OER, KLAUSUR_OER } from "./oer/kompakt.js";
import { KOMPAKT_BBF, BEISPIELE_BBF, KLAUSUR_BBF } from "./bilr/bbf_kompakt.js";
import { BEISPIELE_UST } from "./ust/beispiele.js";
import { KOMPAKT_AO, KLAUSUR_AO } from "./ao/kompakt.js";
import { KOMPAKT_PR, KLAUSUR_PR } from "./pr/kompakt.js";
import { BEISPIELE_AO } from "./ao/beispiele.js";
import { BEISPIELE_PR } from "./pr/beispiele.js";
import { KOMPAKT_BEWR, KLAUSUR_BEWR } from "./bewr/kompakt.js";
import { BEISPIELE_BEWR } from "./bewr/beispiele.js";
import { BEISPIELE_BSR } from "./bilr/beispiele.js";
import { BEISPIELE_EST } from "./est/beispiele.js";
import { BEISPIELE_OER } from "./oer/beispiele.js";
import { normenAusText, norm } from "./oer/normtext.js";

const BEISPIELE = { ...BEISPIELE_BSR, ...BEISPIELE_OER, ...BEISPIELE_EST, ...BEISPIELE_UST, ...BEISPIELE_BBF, ...BEISPIELE_AO, ...BEISPIELE_PR, ...BEISPIELE_BEWR };
/** Zusammenfassung je Thema, ergänzt um die Klausurbeispiele (Sachverhalt + Musterlösung). */
export const KOMPAKT = Object.fromEntries(Object.entries({ ...KOMPAKT_BSR, ...KOMPAKT_OER, ...KOMPAKT_EST, ...KOMPAKT_UST, ...KOMPAKT_BBF, ...KOMPAKT_AO, ...KOMPAKT_PR, ...KOMPAKT_BEWR })
  .map(([id, k]) => [id, { ...k, beispiele: BEISPIELE[id] || [] }]));
export const KLAUSURPLAN = { bsr: KLAUSUR_BSR, bbf: KLAUSUR_BBF, oer: KLAUSUR_OER, est: KLAUSUR_EST, ust: KLAUSUR_UST, ao: KLAUSUR_AO, pr: KLAUSUR_PR, bewr: KLAUSUR_BEWR };

/** Alle Texte einer Zusammenfassung (für Suche und Lesezeit). */
export function kompaktText(k) {
  return [k.satz, ...(k.zahlen || []).flat(), ...(k.punkte || []), ...(k.schema || []), ...(k.fallen || []),
    ...(k.beispiele || []).flatMap((b) => [b.titel, b.sv, b.aufgabe || "", ...b.loesung])]
    .join(" ").replace(/\*\*/g, "");
}
/** Lesezeit in Minuten (ca. 170 Wörter je Minute für Lernstoff). */
export const lesezeit = (k) => Math.max(1, Math.round(kompaktText(k).split(/\s+/).length / 170));

import { hoerSegmente, hoerInfo, vorlesenMoeglich, hoertGerade, offlineMoeglich } from "./vorlesen.js";
import { schaubildKnoepfe } from "./schaubilder.js";
import { typografie } from "./satz.js";

const dauerText = (min) => min < 90 ? `${min} Min.` : `${String(Math.round(min / 6) / 10).replace(".", ",")} Std.`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ZITAT = /(?:§§?|Art\.|Präambel)\s?[^§*():;„“<>]{0,48}?\b(?:HGB|AO|EStG|UStG|BWahlG|PartG|GG|BGB|EStDV|LStDV|VwZG|GOBT|GmbHG|ErbStG|BewG)\b|\bR \d+[a-z]?(?: Abs\. \d+)? EStR\b/g;

/** Fließtext: **fett** wird zum Textmarker, Normzitate werden antippbar (öffnen den Gesetzestext). */
export function kompaktInline(text) {
  const h = normenVerlinken(esc(typografie(text)));
  // Zahl und Einheit nicht trennen („3 %“, „1.500 €“)
  return h.replace(/(\d) (%|€)/g, "$1&nbsp;$2").replace(/\*\*(.+?)\*\*/g, '<mark class="km">$1</mark>');
}

/** Normzitate in bereits maskiertem HTML antippbar machen (nur Normen, deren Text in der App steht). */
export function normenVerlinken(h) {
  return h.replace(ZITAT, (m) => {
    // BGB, EStDV und VwZG erkennt normenAusText nicht – einfache Zitate („§ 449 BGB“, „§ 8 VwZG“) direkt auflösen
    const einfach = /^§\s?(\d+[a-z]?)(?:\s+Abs\.\s?(\d+))?.*\b(BGB|EStDV|VwZG|GmbHG)$/.exec(m);
    const ref = einfach ? [`${einfach[3]} ${einfach[1]}${einfach[2] ? " " + einfach[2] : ""}`, `${einfach[3]} ${einfach[1]}`].find((r) => norm(r))
      : normenAusText(m.replace(/&amp;/g, "&"))[0];
    return ref ? `<span class="km-norm" role="button" tabindex="0" data-a="normDetail" data-v="${esc(ref)}">${m}</span>` : m;
  });
}

/** Eine Zeile der Musterlösung: „BS: …“ wird als Buchungssatz dargestellt, „→ GuV … · BVV …“ als Gewinnauswirkung. */
export function loesungZeile(z) {
  if (!z.startsWith("BS:")) return `<p>${kompaktInline(z)}</p>`;
  const [satz, wirkung] = z.slice(3).trim().split(" → ");
  return `<div class="km-bs"><span class="km-bs-tag">BS</span><span class="km-bs-text">${kompaktInline(satz)}</span>${wirkung ? `<span class="km-bs-wirkung">${kompaktInline(wirkung)}</span>` : ""}</div>`;
}

/** Klausurbeispiel: Sachverhalt wie im Aufgabenblatt, darunter die Lösung auf Klausurpapier. */
function beispielView(b, i, karte = "") {
  return `<article class="km-bsp" data-hoer="bsp-${i}">
    <div class="km-bsp-kopf"><span class="km-bsp-nr">Klausurbeispiel ${i + 1}</span><h4>${esc(b.titel)}</h4></div>
    <div class="km-sv"><span class="km-etikett">Sachverhalt</span><p>${kompaktInline(b.sv)}</p>${b.aufgabe ? `<p class="km-aufgabe"><b>Aufgabe:</b> ${kompaktInline(b.aufgabe)}</p>` : ""}</div>
    <div class="km-loesung"><span class="km-etikett">Lösung – so schreibst du es in der Klausur</span>${b.loesung.map(loesungZeile).join("")}</div>
    ${karte}
  </article>`;
}

/** Gelesen-Status: {thema: Zeitpunkt}. */
export const gelesenAnteil = (themen, gelesen = {}) => themen.filter((t) => KOMPAKT[t.id] && gelesen[t.id]).length;
/** „heute“, „gestern“, „vor 5 Tagen“ – wann eine Zusammenfassung zuletzt geöffnet wurde (Info, kein Abhaken). */
export function zuletztText(ts, jetzt = Date.now()) {
  if (!ts) return "";
  const tag = (x) => Math.floor((x - new Date(x).getTimezoneOffset() * 60000) / 86400000), d = tag(jetzt) - tag(ts);
  return d <= 0 ? "heute" : d === 1 ? "gestern" : d < 60 ? `vor ${d} Tagen` : `vor ${Math.round(d / 30)} Monaten`;
}

/**
 * Lese-Ansicht eines Themas. h = { ic, thema, nachbarn: [vorher, nachher], gelesen, ausSitzung, alsKarte(quelle, wert, klasse) }.
 * Aufbau als „Spickzettel“: ein Satz als Kern, Zahlen, Schema, das Wichtigste mit Textmarker, Fallen und zum Schluss
 * Klausurbeispiele mit Musterlösung, in der jede Aussage ihre Norm trägt.
 */
export function kompaktView(id, h) {
  const k = KOMPAKT[id], t = h.thema;
  const [vor, nach] = h.nachbarn;
  const abschnitt = (cls, titel, inhalt) => inhalt ? `<section class="km-abschnitt ${cls}"><h3>${titel}</h3>${inhalt}</section>` : "";
  // Jeder Punkt lässt sich mit „+“ als eigene Karteikarte übernehmen
  const karte = (feld, i) => (h.alsKarte ? h.alsKarte("punkt", `${id}|${feld}|${i}`, "mini") : "");
  const liste = (arr, feld) => arr?.length ? `<ul class="km-liste">${arr.map((p, i) => `<li data-hoer="${feld}-${i}">${kompaktInline(p)}${karte(feld, i)}</li>`).join("")}</ul>` : "";
  const an = hoertGerade(id);
  const info = vorlesenMoeglich() ? hoerInfo(id, hoerSegmente(k, t)) : null;
  const hoeren = info ? `<button class="hoer-start${an ? " an" : ""}" data-a="hoeren" data-v="${id}" aria-label="Überblick anhören">
      <span class="hs-welle" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span class="hs-text"><b>${an ? "Wird vorgelesen" : "Anhören"}</b><span>ca. ${info.min} Min. · ${info.profi ? "Sprecher Cedar" : "Gerätestimme, Normen ausgeschrieben"}</span></span></button>` : "";
  const kern = abdecken(`<p class="km-satz" data-hoer="satz">${kompaktInline(k.satz)}</p>
      ${k.zahlen?.length ? `<div class="km-zahlen">${k.zahlen.map(([w, b], i) => `<div data-hoer="zahlen-${i}"><b>${h.abdecken?.an ? `<mark class="km km-wert">${esc(w)}</mark>` : esc(w)}</b><span>${h.abdecken?.an ? kompaktInline(b).replace(/<\/?mark[^>]*>/g, "") : kompaktInline(b)}</span></div>`).join("")}</div>` : ""}
      ${abschnitt("km-schema", "Prüfungsschema", k.schema?.length ? `<ol class="km-schritte">${k.schema.map((s, i) => `<li data-hoer="schema-${i}">${kompaktInline(s)}</li>`).join("")}</ol>` : "")}
      ${abschnitt("km-kern", "Das Wichtigste", liste(k.punkte, "punkte"))}
      ${abschnitt("km-fallen", "Typische Fehler", liste(k.fallen, "fallen"))}`, h.abdecken);
  if (h.abdecken) h.abdecken.gesamt = (kern.match(/class="km-luecke/g) || []).length;
  return `<div class="vollbild kompakt" role="dialog" aria-label="Zusammenfassung ${esc(t.titel)}">
    <div class="vb-kopf"><button class="rund" data-a="kompaktZu" aria-label="Schließen">${h.ic("kreuz")}</button>
      <div class="mitte">Kompaktwissen</div><span class="km-zeit">${lesezeit(k)} Min.</span></div>
    <div class="vb-inhalt km-inhalt">
      <header class="km-kopf" data-hoer="kopf"><span class="km-icon">${t.icon}</span>
        <div><h2>${esc(t.titel)}</h2><div class="sub">${esc(t.unter)}</div></div></header>
      ${hoeren}
      ${abdeckenLeiste(h.abdecken, h.ic)}
      ${schaubildKnoepfe(id)}
      ${kern}
      ${abschnitt("km-beispiele", k.beispiele.length === 1 ? "Klausurbeispiel" : "Klausurbeispiele", k.beispiele.map((b, i) => beispielView(b, i, h.alsKarte ? `<div class="km-bsp-karte">${h.alsKarte("beispiel", `${id}|${i}`)}</div>` : "")).join(""))}
      <p class="km-hinweis" data-hoer="ende">Die Zusammenfassung gibt einen Überblick über die klausurrelevanten Punkte – sie ersetzt nicht das Skript. Paragrafen antippen, um den Gesetzestext zu lesen.</p>
    </div>
    <div class="hoer-leiste" id="hoerLeiste" data-thema="${id}" role="region" aria-label="Vorlesen" hidden></div>
    <div class="vb-fuss km-fuss">
      ${h.abdecken?.an && h.abdecken.frage != null ? `<div class="km-wertung" role="group" aria-label="Gewusst?"><span>Gewusst?</span>
          <button class="knopf zweit km-nein" data-a="lueckeWertung" data-v="nein">${h.ic("kreuz", "klein")} Nicht gewusst</button>
          <button class="knopf km-ja" data-a="lueckeWertung" data-v="ja">${h.ic("haken", "klein")} Gewusst</button></div>`
      : h.ausSitzung
        ? `<button class="knopf" data-a="kompaktZu">${h.ic("zurueck", "klein")} Zurück zur Aufgabe</button>`
        : `<button class="knopf" data-a="kompaktUeben" data-v="${id}">${h.ic("play", "fill")} Jetzt üben</button>
           <div class="km-nav">${vor ? `<button class="knopf zweit" data-a="kompakt" data-v="${vor.id}" aria-label="Vorheriges Thema: ${esc(vor.titel)}">${h.ic("zurueck", "klein")}</button>` : "<span></span>"}
             ${nach ? `<button class="knopf zweit" data-a="kompakt" data-v="${nach.id}">${esc(nach.titel)} ${h.ic("pfeil", "klein")}</button>` : `<button class="knopf zweit" data-a="kompaktListe">Alle Themen</button>`}</div>`}
    </div></div>`;
}

/** Fettstellen, die als Lücke taugen: keine Überschriften-Labels („… :“) und nicht länger als 8 Wörter. */
export const alsLuecke = (inner) => { const t = inner.replace(/<[^>]+>/g, "").trim(); return t.length > 0 && !/:$/.test(t) && t.split(/\s+/).length <= 8; };
/** Abdecken: Textmarker-Stellen und Zahlenwerte werden zu Lücken (a = { an, auf: [i], wertung: {i: "ja"|"nein"}, alt: [i] }). */
export function abdecken(html, a) {
  if (!a?.an) return html;
  let n = 0;
  return html.replace(/<mark class="km( km-wert)?">([\s\S]*?)<\/mark>/g, (m, wert, inner) => {
    if (!wert && !alsLuecke(inner)) return m;
    const i = n++, auf = a.auf.includes(i), w = a.wertung[i];
    return `<button class="km-luecke${auf ? " auf" : ""}${w ? " " + w : ""}${!auf && a.alt?.includes(i) ? " zuletzt" : ""}${a.frage === i ? " frage" : ""}" data-a="lueckeAuf" data-v="${i}" aria-label="${auf ? "Aufgedeckt" : "Lücke aufdecken"}"><span>${inner}</span></button>`;
  });
}
/** Zahl der Lücken eines Themas (für die Anzeige „x von y“). */
export const lueckenZahl = (html) => (abdecken(html, { an: true, auf: [], wertung: {} }).match(/class="km-luecke/g) || []).length;
function abdeckenLeiste(a, ic) {
  if (!a) return "";
  const n = a.gesamt || 0, auf = a.auf.length, ja = Object.values(a.wertung).filter((w) => w === "ja").length, nein = Object.values(a.wertung).filter((w) => w === "nein").length;
  return `<div class="km-abdecken${a.an ? " an" : ""}">
    <span class="segment km-modus">${[["lesen", "Lesen"], ["abdecken", "Abdecken"]].map(([m, t]) => `<button data-a="abdeckenModus" data-v="${m}" class="${(m === "abdecken") === !!a.an ? "aktiv" : ""}">${t}</button>`).join("")}</span>
    ${a.an ? `<span class="km-ab-stand"><b>${auf}/${n}</b> aufgedeckt${ja + nein ? ` · <span class="ja">${ja} gewusst</span> · <span class="nein">${nein} nicht</span>` : ""}</span>
      <button class="km-ab-knopf" data-a="abdeckenNeu" aria-label="Alles wieder abdecken">${ic("wiederholen", "klein")}</button>`
      : `<span class="km-ab-tipp">Textmarker abdecken und sich selbst abfragen${a.alt?.length ? ` · zuletzt ${a.alt.length} nicht gewusst` : ""}</span>`}
  </div>`;
}

/** Bibliothek eines Moduls: Klausur-Fahrplan oben, darunter alle Zusammenfassungen (mit „zuletzt geöffnet“ als Wiederholungshilfe). */
export function bibliothekView(fach, themen, h) {
  const plan = KLAUSURPLAN[fach];
  const mit = themen.filter((t) => KOMPAKT[t.id]);
  const top = new Set(plan?.top || []);
  return `<div class="vollbild kompakt" role="dialog" aria-label="Kompaktwissen">
    <div class="vb-kopf"><button class="rund" data-a="kompaktZu" aria-label="Schließen">${h.ic("kreuz")}</button>
      <div class="mitte">Kompaktwissen</div><span class="km-zeit">${mit.length} Themen</span></div>
    <div class="vb-inhalt km-inhalt">
      <header class="km-bib-kopf"><h2>Das Wichtigste für die Klausur</h2>
        <p class="sub">${mit.length} Zusammenfassungen mit Klausurbeispielen und Musterlösungen – jede Aussage mit ihrer Norm. Ideal zum Wiederholen vor dem Üben und in den Tagen vor der Klausur.</p>
        ${vorlesenMoeglich() && mit.length ? `<button class="hoer-start hoer-alle" data-a="hoerenAlle" data-v="${fach}">
          <span class="hs-welle" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <span class="hs-text"><b>Alle Überblicke anhören</b><span>${mit.length} Themen nacheinander, ca. ${dauerText(mit.reduce((n, t) => n + hoerInfo(t.id, hoerSegmente(KOMPAKT[t.id], t)).min, 0))}</span></span></button>` : ""}
        ${offlineMoeglich(mit.map((t) => t.id)) ? `<div class="hoer-offline" id="hoerOffline" data-fach="${fach}" data-ids="${mit.map((t) => t.id).join(",")}"></div>` : ""}
</header>
      ${plan ? `<section class="km-plan"><h3>${esc(plan.titel)}</h3>
        <ul class="km-liste">${plan.aufbau.map((p) => `<li>${kompaktInline(p)}</li>`).join("")}</ul>
        <div class="km-tipps">${plan.tipps.map((p) => `<p>${kompaktInline(p)}</p>`).join("")}</div></section>` : ""}
      <div class="km-bib">${mit.map((t) => {
        const zuletzt = zuletztText(h.gelesen[t.id]);
        return `<button class="km-eintrag" data-a="kompakt" data-v="${t.id}">
          <span class="km-eintrag-icon">${t.icon}</span>
          <span class="km-eintrag-text"><b>${esc(t.titel)}</b><span>${kompaktInline(KOMPAKT[t.id].satz).replace(/<span class="km-norm"[^>]*>(.*?)<\/span>/g, "$1")}</span></span>
          <span class="km-eintrag-meta">${top.has(t.id) ? `<i class="km-top" title="Klausurschwerpunkt">Schwerpunkt</i>` : ""}${lesezeit(KOMPAKT[t.id])} Min.${zuletzt ? `<span class="km-zuletzt" title="Zuletzt geöffnet">${h.ic("wiederholen", "klein")}${zuletzt}</span>` : ""}${KOMPAKT[t.id].beispiele.length ? `<span class="km-bsp-zahl">${KOMPAKT[t.id].beispiele.length} ${KOMPAKT[t.id].beispiele.length === 1 ? "Beispiel" : "Beispiele"}</span>` : ""}</span></button>`;
      }).join("")}</div>
    </div></div>`;
}
