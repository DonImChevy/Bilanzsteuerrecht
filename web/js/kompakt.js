// Kompaktwissen: je Thema eine Zusammenfassung zum Wiederholen – nicht vollständig, aber mit dem, was in Klausuren
// immer wieder gefragt wird. Lese-Ansicht und Bibliothek; Normzitate im Text öffnen den Gesetzestext.
import { KOMPAKT_UST, KLAUSUR_UST } from "./ust/kompakt.js";
import { KOMPAKT_BSR, KLAUSUR_BSR } from "./bilr/kompakt.js";
import { KOMPAKT_EST, KLAUSUR_EST } from "./est/kompakt.js";
import { KOMPAKT_OER, KLAUSUR_OER } from "./oer/kompakt.js";
import { normenAusText } from "./oer/normtext.js";

export const KOMPAKT = { ...KOMPAKT_BSR, ...KOMPAKT_OER, ...KOMPAKT_EST, ...KOMPAKT_UST };
export const KLAUSURPLAN = { bsr: KLAUSUR_BSR, oer: KLAUSUR_OER, est: KLAUSUR_EST, ust: KLAUSUR_UST };

/** Alle Texte einer Zusammenfassung (für Suche und Lesezeit). */
export function kompaktText(k) {
  return [k.satz, ...(k.zahlen || []).flat(), ...(k.punkte || []), ...(k.schema || []), ...(k.klausur || []), ...(k.fallen || []), k.formulierung || ""]
    .join(" ").replace(/\*\*/g, "");
}
/** Lesezeit in Minuten (ca. 170 Wörter je Minute für Lernstoff). */
export const lesezeit = (k) => Math.max(1, Math.round(kompaktText(k).split(/\s+/).length / 170));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ZITAT = /(§§?|Art\.)\s?[^§*():;„“<>]{0,48}?\b(HGB|AO|EStG|UStG|BWahlG|PartG|GG)\b/g;

/** Fließtext: **fett** wird zum Textmarker, Normzitate werden antippbar (öffnen den Gesetzestext). */
export function kompaktInline(text) {
  let h = esc(text).replace(ZITAT, (m) => {
    const ref = normenAusText(m.replace(/&amp;/g, "&"))[0];
    return ref ? `<span class="km-norm" role="button" tabindex="0" data-a="normDetail" data-v="${esc(ref)}">${m}</span>` : m;
  });
  return h.replace(/\*\*(.+?)\*\*/g, '<mark class="km">$1</mark>');
}

/** Gelesen-Status: {thema: Zeitpunkt}. */
export const gelesenAnteil = (themen, gelesen = {}) => themen.filter((t) => KOMPAKT[t.id] && gelesen[t.id]).length;

/**
 * Lese-Ansicht eines Themas. h = { ic, thema, nachbarn: [vorher, nachher], gelesen, ausSitzung }.
 * Aufbau als „Spickzettel“: ein Satz als Kern, Zahlen, das Wichtigste mit Textmarker, Schema, Klausur, Fallen, Formulierung.
 */
export function kompaktView(id, h) {
  const k = KOMPAKT[id], t = h.thema;
  const [vor, nach] = h.nachbarn;
  const abschnitt = (cls, titel, inhalt) => inhalt ? `<section class="km-abschnitt ${cls}"><h3>${titel}</h3>${inhalt}</section>` : "";
  const liste = (arr, cls = "") => arr?.length ? `<ul class="km-liste ${cls}">${arr.map((p) => `<li>${kompaktInline(p)}</li>`).join("")}</ul>` : "";
  return `<div class="vollbild kompakt" role="dialog" aria-label="Zusammenfassung ${esc(t.titel)}">
    <div class="vb-kopf"><button class="rund" data-a="kompaktZu" aria-label="Schließen">${h.ic("kreuz")}</button>
      <div class="mitte">Kompaktwissen</div><span class="km-zeit">${lesezeit(k)} Min.</span></div>
    <div class="vb-inhalt km-inhalt">
      <header class="km-kopf"><span class="km-icon">${t.icon}</span>
        <div><h2>${esc(t.titel)}</h2><div class="sub">${esc(t.unter)}</div></div></header>
      <p class="km-satz">${kompaktInline(k.satz)}</p>
      ${k.zahlen?.length ? `<div class="km-zahlen">${k.zahlen.map(([w, b]) => `<div><b>${esc(w)}</b><span>${kompaktInline(b)}</span></div>`).join("")}</div>` : ""}
      ${abschnitt("km-schema", "Prüfungsschema", k.schema?.length ? `<ol class="km-schritte">${k.schema.map((s) => `<li>${kompaktInline(s)}</li>`).join("")}</ol>` : "")}
      ${abschnitt("km-kern", "Das Wichtigste", liste(k.punkte))}
      ${abschnitt("km-klausur", "So kommt es in der Klausur", liste(k.klausur))}
      ${abschnitt("km-fallen", "Typische Fehler", liste(k.fallen))}
      ${k.formulierung ? `<section class="km-abschnitt km-formulierung"><h3>So formulierst du in der Klausur</h3><blockquote>${kompaktInline(k.formulierung)}</blockquote></section>` : ""}
      <p class="km-hinweis">Die Zusammenfassung gibt einen Überblick über die klausurrelevanten Punkte – sie ersetzt nicht das Skript. Paragrafen antippen, um den Gesetzestext zu lesen.</p>
    </div>
    <div class="vb-fuss km-fuss">
      ${h.ausSitzung
        ? `<button class="knopf" data-a="kompaktZu">${h.ic("zurueck", "klein")} Zurück zur Aufgabe</button>`
        : `<button class="knopf" data-a="kompaktUeben" data-v="${id}">${h.ic("play", "fill")} Jetzt üben</button>
           <div class="km-nav">${vor ? `<button class="knopf zweit" data-a="kompakt" data-v="${vor.id}" aria-label="Vorheriges Thema: ${esc(vor.titel)}">${h.ic("zurueck", "klein")}</button>` : "<span></span>"}
             ${nach ? `<button class="knopf zweit" data-a="kompakt" data-v="${nach.id}">${esc(nach.titel)} ${h.ic("pfeil", "klein")}</button>` : `<button class="knopf zweit" data-a="kompaktListe">Alle Themen</button>`}</div>`}
    </div></div>`;
}

/** Bibliothek eines Moduls: Klausur-Fahrplan oben, darunter alle Zusammenfassungen mit Gelesen-Status. */
export function bibliothekView(fach, themen, h) {
  const plan = KLAUSURPLAN[fach];
  const mit = themen.filter((t) => KOMPAKT[t.id]);
  const n = gelesenAnteil(mit, h.gelesen);
  const top = new Set(plan?.top || []);
  return `<div class="vollbild kompakt" role="dialog" aria-label="Kompaktwissen">
    <div class="vb-kopf"><button class="rund" data-a="kompaktZu" aria-label="Schließen">${h.ic("kreuz")}</button>
      <div class="mitte">Kompaktwissen</div><span class="km-zeit">${n}/${mit.length}</span></div>
    <div class="vb-inhalt km-inhalt">
      <header class="km-bib-kopf"><h2>Das Wichtigste für die Klausur</h2>
        <p class="sub">${mit.length} Zusammenfassungen – je ein paar Minuten. Ideal zum Wiederholen vor dem Üben und in den Tagen vor der Klausur.</p>
        <div class="km-fortschritt" role="progressbar" aria-valuemin="0" aria-valuemax="${mit.length}" aria-valuenow="${n}"><span style="width:${mit.length ? (n / mit.length) * 100 : 0}%"></span></div></header>
      ${plan ? `<section class="km-plan"><h3>${esc(plan.titel)}</h3>
        <ul class="km-liste">${plan.aufbau.map((p) => `<li>${kompaktInline(p)}</li>`).join("")}</ul>
        <div class="km-tipps">${plan.tipps.map((p) => `<p>${kompaktInline(p)}</p>`).join("")}</div></section>` : ""}
      <div class="km-bib">${mit.map((t) => {
        const g = !!h.gelesen[t.id];
        return `<button class="km-eintrag${g ? " gelesen" : ""}" data-a="kompakt" data-v="${t.id}">
          <span class="km-eintrag-icon">${t.icon}</span>
          <span class="km-eintrag-text"><b>${esc(t.titel)}</b><span>${kompaktInline(KOMPAKT[t.id].satz).replace(/<span class="km-norm"[^>]*>(.*?)<\/span>/g, "$1")}</span></span>
          <span class="km-eintrag-meta">${top.has(t.id) ? `<i class="km-top" title="Klausurschwerpunkt">Schwerpunkt</i>` : ""}${g ? h.ic("haken", "klein") : `${lesezeit(KOMPAKT[t.id])} Min.`}</span></button>`;
      }).join("")}</div>
    </div></div>`;
}
