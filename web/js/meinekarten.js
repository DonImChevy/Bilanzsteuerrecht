// Eigene Karteikarten: selbst geschrieben oder mit „+ Als Karte“ aus Aufgaben, Kompaktwissen, Normen und Lernpfad
// übernommen. Gespeichert im Lernstand unter stat.meineKarten = { id: Karte } und mit dem Sync-Code abgeglichen.
//
// Karte: { v: Vorderseite, h: Rückseite, zv/zh: Handschrift vorne/hinten (kodiert, handschrift.js), f: Fach, st: Stapel, q: Quelle (Text, optional), e: erstellt,
//          t: zuletzt bearbeitet, x: gelöscht (bleibt als Grabstein, damit der Abgleich das Löschen kennt),
//          l: Lernkartei {fach, faellig, t} – fehlt bei neuen Karten (= sofort fällig) }
// **fett** wird wie im Kompaktwissen zum Textmarker, Normzitate werden antippbar.
import { planen } from "./wiederholung.js";
import { hatStriche, MAX_ZEICHEN } from "./handschrift.js";

export const STANDARD_STAPEL = "Meine Karten";
const MAX_TEXT = 2000; // Zeichen je Seite – der gesamte Lernstand darf auf dem Server höchstens 1 MB groß sein

const zufall = () => [...crypto.getRandomValues(new Uint8Array(6))].map((b) => b.toString(36).padStart(2, "0")).join("").slice(0, 10);
export const neueId = () => "m-" + Date.now().toString(36) + zufall();

const sauber = (t) => String(t ?? "").replace(/\r\n?/g, "\n").trim().slice(0, MAX_TEXT);
const stapelName = (s) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, 40) || STANDARD_STAPEL;

/** Gültiger Entwurf: jede Seite hat Text oder Handschrift. */
export const entwurfOk = (e) => !!((sauber(e?.v) || hatStriche(e?.zv)) && (sauber(e?.h) || hatStriche(e?.zh)));
const zeichnung = (z) => (typeof z === "string" && z.length > 3 ? z.slice(0, MAX_ZEICHEN) : "");

/** Neue Karte aus einem Entwurf {v, h, f, st, q} anlegen bzw. eine vorhandene (id) überschreiben. Gibt die neue Sammlung zurück. */
export function speichernKarte(meine = {}, entwurf, jetzt = Date.now()) {
  const id = entwurf.id && meine[entwurf.id] ? entwurf.id : neueId();
  const alt = meine[id];
  const karte = { v: sauber(entwurf.v), h: sauber(entwurf.h), f: entwurf.f || alt?.f || "bsr", st: stapelName(entwurf.st),
    e: alt?.e || jetzt, t: jetzt };
  if (entwurf.q || alt?.q) karte.q = String(entwurf.q || alt.q).slice(0, 120);
  for (const s of ["zv", "zh"]) if (zeichnung(entwurf[s])) karte[s] = zeichnung(entwurf[s]);
  if (alt?.l) karte.l = alt.l;
  return { ...meine, [id]: karte };
}

/** Karte löschen: Grabstein mit Zeitstempel, damit andere Geräte sie beim Abgleich ebenfalls entfernen. */
export const loeschenKarte = (meine, id, jetzt = Date.now()) => (meine[id] ? { ...meine, [id]: { x: 1, t: jetzt } } : meine);

/** Antwort beim Lernen: Lernkartei-Fach weiter (gewusst) bzw. zurück auf 1 (nochmal). */
export function bewerteKarte(meine, id, gewusst, jetzt = Date.now()) {
  const k = meine[id];
  if (!k || k.x) return meine;
  return { ...meine, [id]: { ...k, l: planen(k.l, gewusst, jetzt) } };
}

/** Sichtbare Karten eines Fachs (ohne gelöschte), neueste zuerst. */
export function kartenVon(meine = {}, fach) {
  return Object.entries(meine).filter(([, k]) => !k.x && (!fach || k.f === fach))
    .map(([id, k]) => ({ id, ...k })).sort((a, b) => b.e - a.e);
}
export const istFaellig = (k, jetzt = Date.now()) => !k.l || k.l.faellig <= jetzt;
/** Fällige Karten: neue zuerst, dann am längsten überfällige. */
export function faelligeKarten(meine, fach, jetzt = Date.now()) {
  return kartenVon(meine, fach).filter((k) => istFaellig(k, jetzt))
    .sort((a, b) => (a.l?.faellig ?? -1) - (b.l?.faellig ?? -1));
}
/** Stapel eines Fachs mit Anzahl und fälligen Karten, alphabetisch („Meine Karten“ zuerst). */
export function stapelVon(meine, fach, jetzt = Date.now()) {
  const m = new Map();
  for (const k of kartenVon(meine, fach)) {
    const s = m.get(k.st) || { name: k.st, n: 0, faellig: 0, gelernt: 0 };
    s.n += 1; if (istFaellig(k, jetzt)) s.faellig += 1; if ((k.l?.fach || 0) >= 3) s.gelernt += 1;
    m.set(k.st, s);
  }
  return [...m.values()].sort((a, b) => (a.name === STANDARD_STAPEL ? -1 : b.name === STANDARD_STAPEL ? 1 : a.name.localeCompare(b.name, "de")));
}

/**
 * Zwei Sammlungen zusammenführen (Geräte-Abgleich): je Karte gewinnt beim Inhalt der neuere Stand (t, auch Löschen),
 * bei der Lernkartei der neuere Lernstand (l.t) – so geht weder eine Bearbeitung noch eine Wiederholung verloren.
 */
export function meineVereinen(a = {}, b = {}) {
  const out = { ...(a || {}) };
  for (const [id, kb] of Object.entries(b || {})) {
    const ka = out[id];
    if (!ka) { out[id] = kb; continue; }
    const inhalt = (kb.t || 0) > (ka.t || 0) ? kb : ka;
    if (inhalt.x) { out[id] = inhalt; continue; }
    const la = ka.x ? null : ka.l, lb = kb.x ? null : kb.l;
    const l = (lb?.t || 0) > (la?.t || 0) ? lb : la;
    const k = { ...inhalt };
    if (l) k.l = l; else delete k.l;
    out[id] = k;
  }
  return out;
}

// ---------------------------------------------------------------- Export / Import

/** Export als JSON (zum Sichern oder Weitergeben – ohne Lernstand). */
export function exportJson(meine, fach = null) {
  const karten = kartenVon(meine, fach).reverse().map(({ v, h, zv, zh, f, st, q }) => ({ vorne: v, hinten: h, fach: f, stapel: st, ...(q ? { quelle: q } : {}),
    ...(zv ? { handschriftVorne: zv } : {}), ...(zh ? { handschriftHinten: zh } : {}) }));
  return JSON.stringify({ app: "finanzwirt-trainer", art: "karteikarten", version: 1, karten }, null, 2);
}
/** Export als Textdatei für Anki & Co.: je Zeile Vorderseite TAB Rückseite (Zeilenumbrüche als <br>). */
export function exportText(meine, fach = null) {
  // Anki & Co. kennen keine Handschrift – dort steht ein Hinweis
  const zelle = (t, z) => (t || (z ? "(Handschrift – nur in der App)" : "")).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\t/g, " ").replace(/\n/g, "<br>");
  return "#separator:tab\n#html:true\n" + kartenVon(meine, fach).reverse().map((k) => `${zelle(k.v, k.zv)}\t${zelle(k.h, k.zh)}`).join("\n") + "\n";
}

/**
 * Import: eigenes JSON-Format oder Text mit Vorder-/Rückseite je Zeile, getrennt durch Tab oder Semikolon (Anki, Excel).
 * Gibt {meine, neu, doppelt} zurück. Karten, die es mit gleichem Text schon gibt, werden übersprungen.
 */
export function importieren(meine, text, { fach, stapel } = {}, jetzt = Date.now()) {
  let eintraege = [];
  const roh = String(text || "").replace(/^﻿/, "");
  try {
    const j = JSON.parse(roh);
    const liste = Array.isArray(j) ? j : j?.karten;
    if (Array.isArray(liste)) eintraege = liste.map((k) => ({ v: k.vorne ?? k.v, h: k.hinten ?? k.h, f: k.fach ?? k.f, st: k.stapel ?? k.st, q: k.quelle ?? k.q, zv: k.handschriftVorne ?? k.zv, zh: k.handschriftHinten ?? k.zh }));
  } catch (_) {
    const zellen = (z) => (z.includes("\t") ? z.split("\t") : z.split(";"));
    const ohneHtml = (t) => t.replace(/<br\s*\/?>/gi, "\n").replace(/<\/?b>/gi, "**").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const ent = (t) => t.replace(/^"(.*)"$/s, "$1").replace(/""/g, '"');
    eintraege = roh.split("\n").filter((z) => z.trim() && !z.startsWith("#"))
      .map(zellen).filter((z) => z.length >= 2).map(([v, h]) => ({ v: ohneHtml(ent(v.trim())), h: ohneHtml(ent(h.trim())) }));
  }
  const vorhanden = new Set(kartenVon(meine).map((k) => k.v + "\u0000" + k.h + "\u0000" + (k.zv || "") + (k.zh || "")));
  let out = meine, neu = 0, doppelt = 0, i = 0;
  for (const e of eintraege) {
    const ent = { v: sauber(e.v), h: sauber(e.h), zv: zeichnung(e.zv), zh: zeichnung(e.zh), f: ["bsr", "oer", "est", "ust"].includes(e.f) ? e.f : fach, st: stapel || e.st, q: e.q || "Importiert" };
    if (!entwurfOk(ent)) continue;
    const schluessel = ent.v + "\u0000" + ent.h + "\u0000" + ent.zv + ent.zh;
    if (vorhanden.has(schluessel)) { doppelt += 1; continue; }
    vorhanden.add(schluessel);
    out = speichernKarte(out, ent, jetzt + i++); // eigene Zeitstempel → Reihenfolge bleibt erhalten
    neu += 1;
  }
  return { meine: out, neu, doppelt };
}

// ---------------------------------------------------------------- Entwürfe aus App-Inhalten

const kuerzen = (t, n = 900) => (t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + " …" : t);

/** Kompaktwissen: „**Stichwort (§ …):** Aussage“ → Vorderseite Stichwort, Rückseite Aussage; sonst Thema → Aussage. */
export function ausPunkt(text, themaTitel, feld = "punkte") {
  const m = /^\*\*(.+?):?\*\*:?\s*(.+)$/s.exec(text);
  if (m && m[2].length > 8) return { v: m[1].replace(/:$/, ""), h: m[2] };
  return { v: feld === "fallen" ? `${themaTitel}: Welcher Fehler passiert hier oft?` : `${themaTitel}: Was gilt?`, h: text };
}
/** Klausurbeispiel: Sachverhalt (+ Aufgabe) → Musterlösung. */
export function ausBeispiel(b) {
  const loesung = b.loesung.map((z) => (z.startsWith("BS:") ? "Buchung: " + z.slice(3).trim() : z)).join("\n");
  return { v: `**${b.titel}**\n${b.sv}${b.aufgabe ? "\nAufgabe: " + b.aufgabe : ""}`, h: kuerzen(loesung, 1900) };
}
/** Normblatt: „§ 26 EStG – Titel?“ → Wortlaut (bei langen Normen gekürzt). */
export function ausNorm(n) {
  const text = n.absaetze.map((a) => (a.abs ? `(${a.abs}) ` : "") + a.text).join("\n");
  return { v: `${n.label}${n.titel ? ` – ${n.titel}` : ""}: Was regelt die Vorschrift?`, h: kuerzen(text, 1500) };
}
/** Lernpfad-Karte: Titel → Text. */
export const ausPfadKarte = (c) => ({ v: c.titel, h: c.text });
