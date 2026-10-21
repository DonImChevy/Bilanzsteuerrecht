import * as G from "./geld.js";
import { KONTEN, KLASSEN, KLASSEN_TITEL, kontenInKlasse, K } from "./konten.js";
import { THEMEN, THEMA, themenFuer, pruefungsThemen, Zufall, bewerte, leereAntwort, neueZeile, istLeer, loesungText, typBezeichnung } from "./kern.js";
import { fragen, klausur, vorlagenFuer, ALLE, kartenFuer, FALL_IDS } from "./katalog.js";
import { norm, NORMEN, zitate, saetze } from "./oer/normtext.js";
import { alsMultipleChoice } from "./oer/mc.js";
import { pruefdaten } from "./offen.js";
import { PUNKTESAMMLER } from "./est/punkte.js";
import { planen, faellige, naechste, INTERVALLE, FAECHER_MAX } from "./wiederholung.js";
import { MODULE, MODUL, aktiveModule } from "./module.js";
import { serie, woche, tagSchluessel } from "./aktivitaet.js";
import { ic } from "./icons.js";
import { syncVerfuegbar, neuerCode, neueGeraeteId, codeNormal, codeGueltig, codeAnzeige, abgleichen, SERVER } from "./sync.js";
import qrcode from "./lib/qrcode.js";

// ======================= Speicher =======================
const SPEICHER = "bsr.stat.v1";
const LEER = () => ({ proThema: {}, klausuren: [], karten: [], lern: {}, tage: {}, zuletzt: null });
function laden() {
  try {
    const s = JSON.parse(localStorage.getItem(SPEICHER));
    if (s && s.proThema) return { ...LEER(), ...s };
  } catch (_) { /* leer */ }
  return LEER();
}
let stat = laden();
function speichernLokal() {
  try { localStorage.setItem(SPEICHER, JSON.stringify(stat)); } catch (_) { /* privat-Modus */ }
}
function speichern() {
  speichernLokal();
  planeSync();
}
const lies = (k, standard) => { try { return localStorage.getItem(k) ?? standard; } catch (_) { return standard; } };
const schreib = (k, v) => { try { localStorage.setItem(k, v); } catch (_) { /* egal */ } };

// ======================= Geräte-Synchronisierung =======================
// Abgleich per Sync-Code (sync.js): beim Start, kurz nach jeder Änderung, wenn das Netz zurückkommt
// und wenn die App in den Hintergrund geht. Ohne Internet wird lokal weitergelernt.
const SYNC_SPEICHER = "bsr.sync.v1";
let syncLokal = (() => { try { return JSON.parse(localStorage.getItem(SYNC_SPEICHER)); } catch (_) { return null; } })();
const syncZustand = { laeuft: false, nochmal: false, fehler: null, timer: null };
const syncVerbunden = () => syncVerfuegbar() && !!syncLokal?.code && !syncLokal.getrennt;
function syncMerken() {
  try { if (syncLokal) localStorage.setItem(SYNC_SPEICHER, JSON.stringify(syncLokal)); else localStorage.removeItem(SYNC_SPEICHER); } catch (_) { /* egal */ }
}
function planeSync(ms = 4000) {
  if (!syncVerbunden()) return;
  clearTimeout(syncZustand.timer);
  syncZustand.timer = setTimeout(syncJetzt, ms);
}
async function syncJetzt() {
  if (!syncVerbunden()) return;
  clearTimeout(syncZustand.timer);
  if (syncZustand.laeuft) { syncZustand.nochmal = true; return; }
  if (!navigator.onLine) { syncZustand.fehler = "offline"; return; }
  syncZustand.laeuft = true;
  try {
    const { ergebnis, lokal } = await abgleichen(stat, syncLokal, SERVER);
    stat = ergebnis(stat); // berücksichtigt auch Antworten, die während des Abgleichs gegeben wurden
    speichernLokal();
    syncLokal = lokal; syncMerken();
    syncZustand.fehler = null;
    if (!state.sitzung && !state.deck) render();
  } catch (_) {
    syncZustand.fehler = navigator.onLine ? "server" : "offline";
  } finally {
    syncZustand.laeuft = false;
    if (syncZustand.nochmal) { syncZustand.nochmal = false; planeSync(500); }
  }
}
/** Verbinden: neuer Code (erstes Gerät) oder vorhandenen Code übernehmen. */
async function syncStarten(code, neu) {
  if (!navigator.onLine) { toast("Zum Verbinden wird Internet benötigt."); return; }
  if (!neu) {
    let da;
    try { da = await SERVER.holen(code); } catch (_) { toast("Server nicht erreichbar – bitte später erneut versuchen."); return; }
    if (!da) { toast("Diesen Code gibt es nicht. Bitte prüfen."); return; }
  }
  // Wieder verbinden mit demselben Code: bisherigen Geräteanteil weiterführen (sonst würde doppelt gezählt)
  syncLokal = syncLokal?.code === code ? { ...syncLokal, getrennt: false } : { code, geraet: neueGeraeteId(), eigen: null, basis: null, basisKarten: null };
  syncMerken();
  state.syncEingabe = "";
  await syncJetzt();
  toast(syncZustand.fehler ? "Verbunden – der Abgleich folgt, sobald der Server erreichbar ist." : "Verbunden – Lernstand abgeglichen.");
  render();
}
function syncStatusText() {
  if (!syncVerbunden()) return syncLokal?.getrennt ? "Getrennt" : "Lernstand auf Handy, Tablet und PC gleich halten";
  if (syncZustand.laeuft) return "Wird abgeglichen …";
  if (syncZustand.fehler === "offline") return "Wartet auf Internet";
  if (syncZustand.fehler === "server") return "Server gerade nicht erreichbar – neuer Versuch beim nächsten Mal";
  if (!syncLokal.zuletzt) return "Verbunden";
  const min = Math.round((Date.now() - syncLokal.zuletzt) / 60000);
  return "Zuletzt abgeglichen " + (min < 1 ? "gerade eben" : min < 60 ? `vor ${min} Min.` : new Date(syncLokal.zuletzt).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }));
}
const syncLink = (code) => `${location.origin}${location.pathname}#sync=${code}`;
/** QR-Code als SVG (immer schwarz auf weiß, damit Kameras ihn lesen). */
function qrSvg(text) {
  const q = qrcode(0, "M");
  q.addData(text);
  q.make();
  const n = q.getModuleCount();
  let d = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
  return `<svg class="qr" viewBox="-3 -3 ${n + 6} ${n + 6}" role="img" aria-label="QR-Code"><rect x="-3" y="-3" width="${n + 6}" height="${n + 6}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
}
function syncView() {
  if (!syncVerbunden()) {
    return `<div class="gruppe-fuss" style="margin:4px 4px 14px">Lerne auf Handy, Tablet und PC mit demselben Stand. Ohne Konto und ohne E-Mail: Die Geräte werden über einen Code verbunden. Abgeglichen wird automatisch, sobald Internet da ist.</div>
      <div class="gruppe"><div class="gruppe-titel">Erstes Gerät</div><div class="liste">
        <button class="zeile" data-a="syncErstellen" style="justify-content:center;color:var(--accent);font-weight:700">${ic("wechsel")} Neuen Sync-Code erstellen</button></div></div>
      <div class="gruppe"><div class="gruppe-titel">Weiteres Gerät</div><div class="liste"><div class="zeile" style="flex-wrap:wrap;gap:10px">
        <span class="grow sub" style="min-width:100%">Code vom ersten Gerät eingeben (dort unter Einstellungen → Geräte synchronisieren):</span>
        <input id="syncCode" data-fokus="syncCode" class="sync-eingabe" placeholder="ABCD-EFGH-JKLM-NPQR" autocomplete="off" autocapitalize="characters" spellcheck="false" value="${esc(state.syncEingabe || "")}">
        <button class="knopf" data-a="syncVerbinden" style="width:100%">Verbinden</button></div></div></div>`;
  }
  const code = syncLokal.code;
  return `<div class="gruppe" style="margin-top:4px"><div class="gruppe-titel">Dein Sync-Code</div><div class="liste">
      <div class="zeile" style="flex-direction:column;align-items:stretch;gap:10px">
        <div class="sync-code">${codeAnzeige(code)}</div>
        ${state.syncQR ? `<div class="qr-box">${qrSvg(syncLink(code))}</div><div class="sub" style="text-align:center">Mit der Kamera des anderen Geräts scannen. Bei einer installierten App auf dem iPhone/iPad den Code lieber eintippen.</div>` : ""}
        <button class="link" data-a="syncQR" style="align-self:center">${state.syncQR ? "QR-Code ausblenden" : "QR-Code anzeigen"}</button>
        <div class="sub">Auf dem anderen Gerät: Einstellungen → Geräte synchronisieren → Code eingeben. Gib den Code nur an deine eigenen Geräte weiter.</div>
      </div></div></div>
    <div class="gruppe"><div class="gruppe-titel">Status</div><div class="liste">
      <div class="zeile"><span class="grow">${esc(syncStatusText())}</span></div>
      <button class="zeile" data-a="syncJetzt" style="justify-content:center;color:var(--accent);font-weight:600">Jetzt abgleichen</button></div></div>
    <div class="liste" style="margin-bottom:24px">
      <button class="zeile" data-a="syncTrennen" style="justify-content:center;font-weight:600">Dieses Gerät trennen</button>
      <button class="zeile" data-a="syncLoeschen" style="justify-content:center;color:var(--err);font-weight:600">Daten vom Server löschen</button></div>`;
}
function syncBeimStart() {
  // Link aus dem QR-Code: …#sync=CODE → Verbinden-Dialog mit vorausgefülltem Code
  const m = location.hash.match(/sync=([A-Za-z0-9-]+)/);
  if (m) {
    history.replaceState(null, "", location.pathname + location.search);
    if (syncVerfuegbar() && !(syncVerbunden() && syncLokal.code === codeNormal(m[1]))) {
      state.syncEingabe = codeAnzeige(codeNormal(m[1]));
      state.sheet = { art: "sync" };
      render();
    }
  }
  syncJetzt();
  window.addEventListener("online", () => syncJetzt());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") syncJetzt();
    else if (!syncLokal?.zuletzt || Date.now() - syncLokal.zuletzt > 60 * 1000) syncJetzt();
  });
}

const zaehler = (t) => stat.proThema[t] || { b: 0, r: 0 };
const quote = (z) => (z.b ? z.r / z.b : 0);
function erfasse(frage, korrekt) {
  const z = { ...zaehler(frage.thema) };
  z.b += 1;
  if (korrekt) z.r += 1;
  stat.proThema[frage.thema] = z;
  if (korrekt !== null && korrekt !== undefined) stat.lern[frage.id] = planen(stat.lern[frage.id], korrekt);
  const heute = tagSchluessel();
  stat.tage[heute] = (stat.tage[heute] || 0) + 1;
  speichern();
}
function schwaechstesThema() {
  return pruefungsThemen(state.fach).filter((t) => zaehler(t.id).b >= 3).sort((a, b) => quote(zaehler(a.id)) - quote(zaehler(b.id)))[0];
}
const summeFach = (fach) => themenFuer(fach).map((t) => zaehler(t.id)).reduce((a, z) => ({ b: a.b + z.b, r: a.r + z.r }), { b: 0, r: 0 });

// ======================= Zustand =======================
const state = {
  fach: ["oer", "est"].includes(lies("bsr.fach", "bsr")) ? lies("bsr.fach", "bsr") : "bsr",
  oerModus: lies("bsr.oerModus", "qa") === "mc" ? "mc" : "qa", // "qa" = selbst formulieren, "mc" = Multiple Choice
  ziel: Number(lies("bsr.ziel", "20")) || 20,
  design: lies("bsr.design", "system"),
  hinweisWeg: lies("bsr.hinweisWeg", "") === "1",
  tab: "start",
  suche: "",
  themenFilter: "",
  normSuche: "",
  kontoSuche: "",
  bilrAnsicht: "konten", // Bilanzrecht-Nachschlagen: "konten" | "gesetze"
  sitzung: null,
  sheet: null, // {art: "konto"|"kontoDetail"|"norm"|"info"|"raster"|"einstellungen"|"willkommen"|"merksaetze"|"punktesammler"}
  deck: null,
  klausurAnzahl: 20,
  klausurMinuten: 45,
  kartenThemen: new Set(),
};
if (!lies("bsr.willkommen", "")) state.sheet = { art: "willkommen" };

const app = document.getElementById("app");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const farbklasse = (q) => (q >= 0.8 ? "gut" : q >= 0.5 ? "mittel" : "schlecht");
const farbe = (q) => (q >= 0.8 ? "var(--ok)" : q >= 0.5 ? "var(--warn)" : "var(--err)");
const zahlText = (n) => n.toLocaleString("de-DE");

/** Akzentfarbe und Hell/Dunkel anwenden. */
function designAnwenden() {
  // Startseite in der App-Farbe, innerhalb eines Moduls in dessen Farbe
  const m = state.tab === "start" && !state.sitzung && !state.deck ? { farbe: "#4f46e5", farbeDunkel: "#8b8cf8" } : MODUL[state.fach], root = document.documentElement;
  root.style.setProperty("--m-hell", m.farbe);
  root.style.setProperty("--m-dunkel", m.farbeDunkel);
  if (state.design === "light" || state.design === "dark") root.dataset.theme = state.design;
  else delete root.dataset.theme;
}

// ======================= Sitzung =======================
function neueSitzung(opt) {
  const r = new Zufall(), mc = state.oerModus === "mc";
  // Multiple Choice ist für unterwegs: lange Klausurfälle bleiben dort außen vor (außer es bliebe sonst nichts übrig)
  const vorlagen = opt.ids ? opt.ids.map((id) => ALLE.find((v) => v.id === id)).filter(Boolean) : [];
  const ohneFall = vorlagen.filter((v) => !(mc && FALL_IDS.has(v.id)));
  let fr = opt.ids
    ? r.mischen((ohneFall.length ? ohneFall : vorlagen).map((v) => v.erzeugen(r)))
    : opt.modus === "klausur"
    ? klausur(opt.anzahl, r, opt.fach, mc)
    : fragen(opt.themen, opt.anzahl || 10, r, opt.filter ?? opt.nurBuchung, mc);
  if (mc) fr = fr.map((f) => alsMultipleChoice(f, r));
  return {
    ...opt, fragen: fr, antworten: fr.map(leereAntwort), bewertungen: fr.map(() => null), aufgedeckt: fr.map(() => false),
    index: 0, beendet: false, start: Date.now(), ende: null, review: null,
  };
}
function starte(opt) {
  state.sitzung = neueSitzung(opt);
  if (opt.modus === "uebung" && !opt.ids) {
    stat.zuletzt = { fach: opt.fach || state.fach, themen: opt.themen, nurBuchung: opt.nurBuchung, filter: opt.filter, titel: sitzungTitel(opt) };
    speichern();
  }
  state.sheet = null;
  render();
  scrollOben();
}
const s = () => state.sitzung;
const aktFrage = () => s().fragen[s().index];
const aktAntwort = () => s().antworten[s().index];

function sitzungTitel(x) {
  if (x.modus === "klausur") return "Klausur " + MODUL[x.fach || "bsr"].kurz;
  if (x.wiederholung) return "Wiederholung";
  if (x.einzeln) return "Einzelaufgabe";
  if (x.nurBuchung) return "Buchungssätze";
  if (x.filter === "uebertragung") return "Übertragungsaufgaben";
  if (x.filter === "rechnen") return "Rechenaufgaben";
  if (x.filter === "fall") return "Fälle einordnen";
  if (x.filter === "qa") return state.oerModus === "mc" ? "Multiple Choice" : "Frage – Antwort";
  if (x.themen.length === 1) return THEMA[x.themen[0]].titel;
  return "Gemischte Übung";
}

function pruefen() {
  const x = s();
  if (x.bewertungen[x.index]) return;
  if (aktFrage().typ === "offen") {
    // Offene Frage: automatisch prüfen (Norm + Stichworte); ohne Antwort oder Prüfdaten Musterantwort aufdecken und selbst bewerten
    x.aufgedeckt[x.index] = true;
    const b = bewerte(aktFrage(), aktAntwort());
    if (b.korrekt !== null) {
      x.bewertungen[x.index] = b;
      erfasseMitVorher(aktFrage(), b);
      if (navigator.vibrate) navigator.vibrate(b.korrekt ? 20 : [30, 40, 30]);
    }
    render();
    setTimeout(() => document.getElementById("auswertung")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    return;
  }
  if (istLeer(aktFrage(), aktAntwort())) return;
  const b = bewerte(aktFrage(), aktAntwort());
  x.bewertungen[x.index] = b;
  erfasse(aktFrage(), b.korrekt);
  if (navigator.vibrate) navigator.vibrate(b.korrekt ? 20 : [30, 40, 30]);
  render();
  setTimeout(() => document.getElementById("auswertung")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
}
/** Wie erfasse(), merkt sich aber den Lernstand davor – für eine spätere Korrektur der automatischen Prüfung. */
function erfasseMitVorher(f, b) {
  b.lernVorher = stat.lern[f.id] || null;
  erfasse(f, b.korrekt);
}
/** Automatische Prüfung einer offenen Antwort umkehren („Doch gewusst“ / „Doch nicht gewusst“). */
function korrigieren(i) {
  const x = s(), f = x.fragen[i], b = x.bewertungen[i];
  if (!b?.auto || b.korrigiert) return;
  const korrekt = !b.korrekt;
  const z = { ...zaehler(f.thema) };
  z.r = Math.max(0, z.r + (korrekt ? 1 : -1));
  stat.proThema[f.thema] = z;
  stat.lern[f.id] = planen(b.lernVorher || undefined, korrekt);
  x.bewertungen[i] = { ...b, korrekt, korrigiert: true };
  klausurZaehlen(x);
  speichern();
  render();
}
function klausurZaehlen(x) {
  if (x.klausurEintrag == null) return;
  const k = stat.klausuren.find((e) => e.datum === x.klausurEintrag); // per Datum – die Reihenfolge kann sich durch den Abgleich ändern
  if (k) { k.richtig = x.bewertungen.filter((b) => b?.korrekt === true).length; k.offen = x.bewertungen.filter((b) => b?.korrekt === null).length; speichern(); }
}
/** Selbstbewertung einer offenen Frage (Übung oder Klausur-Rückschau). */
function selbstBewerten(i, korrekt) {
  const x = s(), f = x.fragen[i];
  const vorher = x.bewertungen[i];
  if (vorher && vorher.korrekt !== null) return;
  x.bewertungen[i] = { korrekt, offen: true };
  erfasse(f, korrekt);
  klausurZaehlen(x);
  if (navigator.vibrate) navigator.vibrate(korrekt ? 20 : [30, 40, 30]);
  if (x.review == null && x.modus !== "klausur") { weiter(); return; }
  render();
}

function weiter() {
  const x = s();
  if (x.index < x.fragen.length - 1) { x.index += 1; render(); scrollOben(); return; }
  if (x.modus !== "klausur") { x.beendet = true; x.ende = Date.now(); render(); scrollOben(); }
}
function abgeben() {
  const x = s();
  if (!x || x.beendet) return;
  x.fragen.forEach((f, i) => {
    if (!x.bewertungen[i]) {
      x.bewertungen[i] = bewerte(f, x.antworten[i]);
      if (x.bewertungen[i].korrekt !== null) erfasseMitVorher(f, x.bewertungen[i]);
    }
  });
  x.beendet = true;
  x.ende = Date.now();
  const richtig = x.bewertungen.filter((b) => b.korrekt === true).length;
  const offen = x.bewertungen.filter((b) => b.korrekt === null).length;
  stat.klausuren.push({ datum: x.start, richtig, offen, gesamt: x.fragen.length, sek: Math.round((x.ende - x.start) / 1000), fach: x.fach || "bsr" });
  x.klausurEintrag = x.start;
  speichern();
  state.sheet = null;
  render();
  scrollOben();
}
function restSekunden() {
  const x = s();
  if (!x || x.modus !== "klausur" || !x.minuten) return null;
  return Math.max(0, x.minuten * 60 - Math.floor((Date.now() - x.start) / 1000));
}
const uhr = (r) => `${Math.floor(r / 60)}:${String(r % 60).padStart(2, "0")}`;
setInterval(() => {
  const r = restSekunden();
  if (r == null || s().beendet) return;
  const el = document.getElementById("timer");
  if (el) {
    el.querySelector("span").textContent = uhr(r);
    el.classList.toggle("knapp", r < 300);
  }
  if (r === 0) { abgeben(); toast("Zeit abgelaufen – Klausur wurde abgegeben."); }
}, 1000);

function scrollOben() {
  requestAnimationFrame(() => { const el = document.querySelector(".vb-inhalt"); if (el) el.scrollTop = 0; });
}

// ======================= Wiederholung =======================
const idsVon = (fach) => ALLE.filter((v) => THEMA[v.thema].fach === fach).map((v) => v.id);
const idsAktiv = () => aktiveModule().flatMap((m) => idsVon(m.id));
const faelligVon = (fach) => faellige(stat.lern, fach ? idsVon(fach) : idsAktiv());
const PRO_WIEDERHOLUNG = 20;

function inTagen(t) {
  const tage = Math.round((t - new Date().setHours(0, 0, 0, 0)) / 864e5);
  return tage <= 1 ? "morgen" : `in ${tage} Tagen`;
}

// ======================= Render: Rahmen =======================
// Untere Leiste nur innerhalb eines Moduls – jedes Modul ist in sich geschlossen
const TABS = () => [
  ["lernen", "start", "Übersicht"],
  ["klausur", "klausur", "Klausur"],
  ["karten", "karten", "Karten"],
  ["nachschlagen", "nachschlagen", state.fach === "bsr" ? "Nachschlagen" : "Normen"],
];

function render() {
  const aktiv = document.activeElement;
  const fokusId = aktiv && aktiv.dataset ? aktiv.dataset.fokus : null;
  const pos = fokusId && aktiv.selectionStart != null ? [aktiv.selectionStart, aktiv.selectionEnd] : null;
  designAnwenden();
  // Einblend-Animationen nur, wenn sich die Ansicht wirklich ändert (nicht bei jedem Antippen)
  const neu = (k) => { const w = ansicht[k] !== schluessel[k](); ansicht[k] = schluessel[k](); return w ? " anim" : ""; };
  const animTab = neu("tab"), animVoll = neu("voll"), animSheet = neu("sheet");
  const tab = { start: tabStart, lernen: tabLernen, klausur: tabKlausur, karten: tabKarten, nachschlagen: state.fach === "bsr" ? tabNachschlagenBilr : tabNormen }[state.tab]();
  let html = `<main class="screen${animTab}${state.tab === "start" ? " ohne-leiste" : ""}" data-tab="${state.tab}">${tab}</main>`;
  if (state.tab !== "start") html += `<nav class="tabbar">${TABS().map(([id, i, t]) => `<button data-a="tab" data-v="${id}" class="${state.tab === id ? "aktiv" : ""}" aria-label="${t}"><span class="ti">${ic(i)}</span>${t}</button>`).join("")}</nav>`;
  if (state.sitzung) html += sitzungView();
  if (state.deck) html += deckView();
  if (state.sheet) html += sheetView();
  // Scrollposition innerhalb von Übung und Sheet behalten, solange dieselbe Ansicht bleibt (z. B. beim Ankreuzen)
  const scrollVoll = animVoll ? 0 : app.querySelector(".vollbild .vb-inhalt")?.scrollTop || 0;
  const scrollSheet = animSheet ? 0 : app.querySelector(".sheet .vb-inhalt")?.scrollTop || 0;
  app.innerHTML = html;
  if (scrollVoll) { const el = app.querySelector(".vollbild .vb-inhalt"); if (el) el.scrollTop = scrollVoll; }
  if (scrollSheet) { const el = app.querySelector(".sheet .vb-inhalt"); if (el) el.scrollTop = scrollSheet; }
  if (animVoll) app.querySelector(".vollbild")?.classList.add("anim");
  if (animSheet) app.querySelector(".sheet-hg")?.classList.add("anim");
  verlaufAbgleichen();
  document.body.style.overflow = state.sitzung || state.deck || state.sheet ? "hidden" : "";
  if (fokusId) {
    const el = document.querySelector(`[data-fokus="${fokusId}"]`);
    if (el) { el.focus(); if (pos && el.setSelectionRange) try { el.setSelectionRange(...pos); } catch (_) { /* egal */ } }
  }
}

// ======================= Zurück-Taste / Zurück-Geste =======================
// Jede geöffnete Ebene (Unterseite, Übung, Rückschau, Lernkarten, Menü) bekommt einen Eintrag im Browserverlauf.
// So schließt die Zurück-Geste (Android) bzw. Zurück-Taste die oberste Ebene, statt die App zu verlassen.
let verlaufTiefe = 0, popIgnorieren = 0;
const ansichtTiefe = () => (state.tab !== "start" ? 1 : 0) + (state.sitzung ? 1 : 0) + (state.sitzung?.review != null ? 1 : 0) + (state.deck ? 1 : 0) + (state.sheet ? 1 : 0);
function verlaufAbgleichen() {
  const t = ansichtTiefe();
  while (verlaufTiefe < t) { verlaufTiefe += 1; history.pushState({ tiefe: verlaufTiefe }, ""); }
  if (verlaufTiefe > t) { popIgnorieren += 1; history.go(t - verlaufTiefe); verlaufTiefe = t; }
}
/** Oberste Ebene schließen (Zurück-Geste, Escape-Taste). */
function ebeneZurueck() {
  if (state.sheet) AKTIONEN.sheetZu();
  else if (state.deck) AKTIONEN.deckZu();
  else if (state.sitzung?.review != null) AKTIONEN.reviewZurueck();
  else if (state.sitzung) AKTIONEN.beenden();
  else if (state.tab !== "start") AKTIONEN.tab("start");
  else render();
}
window.addEventListener("popstate", () => {
  if (popIgnorieren) { popIgnorieren -= 1; return; }
  verlaufTiefe = Math.max(0, verlaufTiefe - 1);
  ebeneZurueck(); // bei abgebrochener Rückfrage legt render() den Eintrag wieder an
});

const ansicht = {};
const schluessel = {
  tab: () => state.tab + state.fach,
  voll: () => (state.sitzung ? "s" + state.sitzung.start + (state.sitzung.beendet ? "e" : "") : "") + (state.deck ? "d" + state.deck.karten.length : ""),
  sheet: () => state.sheet?.art || "",
};

function istStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

/** Kopf einer Unterseite mit Modul-Chip zum Wechseln. */
/** Kopfzeile innerhalb eines Moduls: zurück zur Modulauswahl, rechts das aktuelle Modul. */
function modulLeiste() {
  const m = MODUL[state.fach];
  return `<div class="kopfzeile modul-leiste"><button class="zurueck-link" data-a="tab" data-v="start">${ic("zurueck", "klein")} Alle Module</button>
    <span class="modul-chip"><span class="punkt">${ic(m.icon)}</span>${m.kurz}</span></div>`;
}
function seitenKopf(titel, untertitel = "") {
  return `${modulLeiste()}<div class="kopfzeile"><h1 class="titel">${titel}</h1></div>
    ${untertitel ? `<p class="untertitel">${untertitel}</p>` : ""}`;
}

// ======================= Tab: Start =======================
function gruss() {
  const h = new Date().getHours();
  return h < 5 ? "Gute Nacht" : h < 11 ? "Guten Morgen" : h < 17 ? "Hallo" : h < 22 ? "Guten Abend" : "Gute Nacht";
}

function tabStart() {
  const heute = stat.tage[tagSchluessel()] || 0, ziel = state.ziel, p = Math.min(100, Math.round((heute / ziel) * 100));
  const tageSerie = serie(stat.tage);
  const datum = new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
  let titel, text, knopf;
  if (heute >= ziel) { titel = "Tagesziel geschafft!"; text = "Stark. Alles darüber hinaus ist Bonus."; }
  else if (heute) { titel = `Noch ${ziel - heute} bis zum Tagesziel`; text = "Du bist auf einem guten Weg."; }
  else { titel = "Bereit für heute?"; text = `Tagesziel: ${ziel} Aufgaben`; }
  if (stat.zuletzt && MODUL[stat.zuletzt.fach] && !MODUL[stat.zuletzt.fach].bald) knopf = `<button class="knopf" data-a="weiterlernen">${ic("play", "fill")} Weiter: ${esc(stat.zuletzt.titel)}</button>`;
  else knopf = `<button class="knopf" data-a="zuModulen">Modul wählen und loslegen ${ic("pfeil")}</button>`;

  return `
    <div class="kopfzeile">
      <div><div class="gruss">${esc(datum)}</div><h1 class="titel" style="margin-top:2px">${gruss()} 👋</h1></div>
      <div class="kopf-aktionen"><button class="icon-btn" data-a="einstellungen" aria-label="Einstellungen">${ic("einstellungen")}</button></div>
    </div>
    <section class="hero">
      <div class="oben">
        <div class="ziel-ring" style="--p:${p}"><div>${heute}<small>von ${ziel}</small></div></div>
        <div class="grow"><h2>${titel}</h2><div class="zeile-klein">${text}</div>
          <div class="werte">
            <span class="wert-pille"><span class="${tageSerie ? "flamme-an" : ""}">${ic("flamme")}</span>${tageSerie} ${tageSerie === 1 ? "Tag" : "Tage"} in Folge</span>
          </div></div>
      </div>
      ${knopf}
    </section>
    <div class="suchfeld">${ic("suche")}<input type="search" id="homeSuche" data-fokus="homeSuche" placeholder="Themen, Aufgaben, Normen, Konten …" autocomplete="off" enterkeyhint="search" value="${esc(state.suche)}">
      <button class="leeren ${state.suche ? "" : "versteckt"}" data-a="sucheLeeren" aria-label="Suche leeren">${ic("kreuz", "klein")}</button></div>
    <div id="sucheErgebnis">${state.suche.trim() ? suchErgebnisse(state.suche) : ""}</div>
    <div id="startRest" class="${state.suche.trim() ? "versteckt" : ""}">
      <div class="gruppe"><div class="gruppe-titel">Deine Module <span class="sub" style="text-transform:none;letter-spacing:0">${aktiveModule().length} von ${MODULE.length} verfügbar</span></div>
        <div class="modul-grid">${MODULE.map(modulKachel).join("")}</div></div>
      <div class="gruppe"><div class="gruppe-titel">Diese Woche <span class="sub" style="text-transform:none;letter-spacing:0">${zahlText(woche(stat.tage).reduce((a, t) => a + t.n, 0))} Aufgaben</span></div>
        <div class="liste">${wocheView()}</div></div>
      ${installHinweis()}
    </div>`;
}

/** Modul-Kachel: oben öffnen (ca. drei Viertel), unten Streifen mit den heutigen Wiederholungen. */
function modulKachel(m) {
  if (m.bald) {
    return `<div class="modul-kachel geteilt bald" style="--mc:${m.farbe}">
      <button class="m-oben" data-a="bald" data-v="${m.id}"><span class="m-icon">${ic(m.icon)}</span>
        <span><div class="m-titel">${m.titel}</div><div class="m-unter">${m.kurz} · ${m.unter}</div></span></button>
      <div class="m-unten leer">${ic("schloss", "klein")} Bald verfügbar</div></div>`;
  }
  const ids = idsVon(m.id), gelernt = ids.filter((id) => stat.lern[id]?.fach >= 3).length;
  const due = faelligVon(m.id).length, begonnen = ids.some((id) => stat.lern[id]);
  const p = Math.round((gelernt / ids.length) * 100);
  const unten = due
    ? `<button class="m-unten faellig" data-a="wiederholen" data-v="${m.id}" aria-label="${due} Aufgaben heute wiederholen"><span class="grow"><b>${due}</b> heute fällig</span>${ic("pfeil", "klein")}</button>`
    : begonnen
    ? `<div class="m-unten erledigt">${ic("haken", "klein")} Heute erledigt</div>`
    : `<div class="m-unten leer">Noch nicht begonnen</div>`;
  return `<div class="modul-kachel geteilt" style="--mc:${m.farbe}">
    <button class="m-oben" data-a="modul" data-v="${m.id}">
      <span class="m-icon">${ic(m.icon)}</span>
      <span><div class="m-titel">${m.titel}</div><div class="m-unter">${m.kurz} · ${ids.length} Aufgaben</div></span>
      <span class="m-fuss"><span class="balken"><span style="width:${Math.max(p, begonnen ? 3 : 0)}%"></span></span><span>${p} %</span></span></button>
    ${unten}</div>`;
}

function wocheView() {
  const w = woche(stat.tage), max = Math.max(state.ziel, ...w.map((t) => t.n));
  return `<div class="woche">${w.map((t) => `<div class="tag ${t.heute ? "heute" : ""} ${t.n >= state.ziel ? "erreicht" : ""}">
      <div class="zahl">${t.n || ""}</div><div class="saeule"><span style="height:${Math.round((t.n / max) * 100)}%"></span></div><div class="lbl">${t.kurz}</div></div>`).join("")}</div>
    <div class="gruppe-fuss" style="margin:0 16px 12px">Grün = Tagesziel (${state.ziel}) erreicht. Kurz und täglich lernen wirkt besser als selten und lange.</div>`;
}

function installHinweis() {
  if (istStandalone() || state.hinweisWeg) return "";
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  return `<div class="hinweis-box"><span class="symbol">${ic("install")}</span><div class="grow"><b>Als App installieren</b><div class="sub" style="margin-top:2px">${ios
    ? "In Safari unten auf <b>Teilen</b> tippen → <b>„Zum Home-Bildschirm“</b>."
    : installEvent ? "Ein Tipp genügt – danach startet der Trainer wie eine App, auch offline." : "In Chrome oben rechts auf <b>⋮</b> → <b>„App installieren“</b> bzw. <b>„Zum Startbildschirm hinzufügen“</b>."}</div>
    ${!ios && installEvent ? `<button class="knopf" style="margin-top:10px;padding:11px" data-a="installieren">${ic("install")} Installieren</button>` : ""}</div>
    <button class="zu" data-a="hinweisWeg" aria-label="Hinweis ausblenden">${ic("kreuz", "klein")}</button></div>`;
}

// ---------- Suche ----------
let INDEX = null;
const norma = (t) => String(t).toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[.,;:!?()„“"'§]/g, " ");
function suchIndex() {
  if (INDEX) return INDEX;
  const r = new Zufall(1);
  INDEX = {
    themen: THEMEN.map((t) => ({ t, such: norma(`${t.titel} ${t.unter} ${MODUL[t.fach].titel}`) })),
    aufgaben: ALLE.map((v) => { const f = v.erzeugen(r); return { v, f, such: norma(`${f.text} ${f.antwort || ""} ${(f.optionen || []).join(" ")} ${THEMA[v.thema].titel}`) }; }),
    normen: NORMEN.map((n) => ({ n, label: n.g === "GG" ? (n.nr === "Präambel" ? "Präambel GG" : `Art. ${n.nr} GG`) : `§ ${n.nr} ${n.g}`,
      such: norma(`${n.g === "GG" ? "art" : "§"} ${n.nr} ${n.g} ${n.titel} ${n.abs.map((a) => a.text).join(" ")}`) })),
    konten: Object.values(KONTEN).map((k) => ({ k, such: norma(`${k.name} ${k.kurz} ${k.artName}`) })),
    module: MODULE.map((m) => ({ m, such: norma(`${m.titel} ${m.kurz} ${m.unter}`) })),
  };
  return INDEX;
}
/** Ersten Treffer eines Suchworts hervorheben (bevorzugt am Wortanfang). */
function markiere(text, woerter, ausschnitt = false) {
  let t = String(text).replace(/\s+/g, " "), klein = t.toLowerCase();
  if (ausschnitt) {
    const pos = Math.min(...woerter.map((w) => klein.indexOf(w)).filter((i) => i >= 0), Infinity);
    if (pos !== Infinity && pos > 55) { const start = t.lastIndexOf(" ", pos - 30) + 1; t = "… " + t.slice(start); klein = t.toLowerCase(); }
  }
  for (const w of woerter.filter((x) => x.length > 1)) {
    const m = new RegExp(`(^|[^a-zäöüß0-9])(${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`).exec(klein);
    const i = m ? m.index + m[1].length : klein.indexOf(w);
    if (i >= 0) return `${esc(t.slice(0, i))}<mark>${esc(t.slice(i, i + w.length))}</mark>${esc(t.slice(i + w.length))}`;
  }
  return esc(t);
}
/** Treffergüte: Wortanfänge zählen doppelt. */
function guete(such, woerter) {
  return woerter.reduce((a, w) => a + (new RegExp(`(^|[^a-z0-9])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(such) ? 2 : 1), 0);
}
function suchErgebnisse(q) {
  const woerter = norma(q).trim().split(/\s+/).filter(Boolean);
  const hl = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const passt = (x) => woerter.every((w) => x.such.includes(w));
  const beste = (liste, n) => liste.filter(passt).map((x) => [guete(x.such, woerter), x]).sort((a, b) => b[0] - a[0]).slice(0, n).map((e) => e[1]);
  const I = suchIndex();
  const themen = beste(I.themen, 6);
  const aufgaben = beste(I.aufgaben.filter((x) => !MODUL[THEMA[x.v.thema].fach].bald), 8);
  // Normzitat wie „Art. 63“ oder „§ 12 BWahlG“: passende Vorschrift zuerst, Normen-Gruppe nach oben
  const zitat = /^\s*(art\.?|§)\s*(\d+[a-z]?)\s*([a-z]*)/i.exec(q);
  let normen = beste(I.normen, 6);
  if (zitat) {
    const [, art, nr, gesetz] = zitat;
    const exakt = I.normen.filter((x) => x.n.nr.toLowerCase() === nr.toLowerCase() && (art.toLowerCase().startsWith("art") ? x.n.g === "GG" : x.n.g !== "GG")
      && (!gesetz || x.n.g.toLowerCase().startsWith(gesetz.toLowerCase())));
    normen = [...exakt, ...normen.filter((x) => !exakt.includes(x))].slice(0, 6);
  }
  const konten = beste(I.konten, 6);
  const module = I.module.filter(passt);
  const gruppe = (titel, inhalt) => `<div class="treffer-gruppe treffer"><div class="gruppe-titel">${titel}</div><div class="liste">${inhalt}</div></div>`;
  let html = "";
  if (module.length) html += gruppe("Module", module.map(({ m }) => `<button class="zeile" data-a="${m.bald ? "bald" : "modul"}" data-v="${m.id}">
    <span class="symbol" style="background:${m.farbe};color:#fff">${ic(m.icon)}</span><span class="grow"><div>${markiere(m.titel, hl)}</div><div class="sub">${m.bald ? "Bald verfügbar" : m.unter}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join(""));
  if (themen.length) html += gruppe("Themen – direkt üben", themen.map(({ t }) => `<button class="zeile" data-a="thema" data-v="${t.id}">
    <span class="thema-icon">${t.icon}</span><span class="grow"><div>${markiere(t.titel, hl)}</div><div class="sub">${MODUL[t.fach].kurz} · ${esc(t.unter)}</div></span><span class="chev">${ic("play", "klein fill")}</span></button>`).join(""));
  const normHtml = normen.length ? gruppe("Gesetzestexte", normen.map(({ n, label }) => `<button class="zeile" data-a="normDetail" data-v="${n.g} ${n.nr}">
    <span class="symbol">§</span><span class="grow"><div><b>${esc(label)}</b></div><div class="sub">${esc(n.titel || n.abs[0]?.text.slice(0, 80) + " …")}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join("")) : "";
  if (zitat) html += normHtml;
  if (aufgaben.length) html += gruppe("Aufgaben", aufgaben.map(({ v, f }) => `<button class="zeile" data-a="einzeln" data-v="${v.id}">
    <span class="grow"><div style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:15px">${markiere(f.text, hl, true)}</div>
    <div class="sub">${MODUL[THEMA[v.thema].fach].kurz} · ${esc(THEMA[v.thema].titel)} · ${typBezeichnung(f)}</div></span><span class="chev">${ic("play", "klein fill")}</span></button>`).join(""));
  if (!zitat) html += normHtml;
  if (konten.length) html += gruppe("Konten", konten.map(({ k }) => `<button class="zeile" data-a="kontoDetail" data-v="${k.id}">
    <span class="grow">${markiere(k.name, hl)}</span><span class="badge art-${k.art}">${k.artKurz}</span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join(""));
  return html || `<div class="leer-zustand">${ic("suche")}<div><b>Nichts gefunden</b></div><div class="sub">Versuch es mit einem anderen Begriff, z. B. „Skonto“, „Bundesrat“ oder „Art. 63“.</div></div>`;
}

// ======================= Tab: Lernen (Modulseite) =======================
function tabLernen() {
  const m = MODUL[state.fach], ids = idsVon(state.fach), z = summeFach(state.fach);
  const gemeistert = ids.filter((id) => stat.lern[id]?.fach >= 3).length;
  const due = faelligVon(state.fach);
  const schwach = schwaechstesThema();
  let heute;
  if (due.length) {
    heute = `<button class="kachel breit betont" data-a="wiederholen"><span class="k-icon">${ic("wiederholen")}</span>
      <span class="grow"><b>${due.length} ${due.length === 1 ? "Aufgabe" : "Aufgaben"} zum Wiederholen</b><div class="sub">${due.length > PRO_WIEDERHOLUNG ? `Die ${PRO_WIEDERHOLUNG} ältesten zuerst · ` : ""}genau jetzt, bevor du sie vergisst</div></span><span class="rechts">${ic("pfeil")}</span></button>`;
  } else {
    const n = naechste(stat.lern, ids);
    heute = `<div class="kachel breit"><span class="k-icon" style="background:var(--ok-weak);color:var(--ok)">${ic("haken")}</span>
      <span class="grow"><b>${n ? "Heute nichts zu wiederholen" : "Lernkartei startet mit deiner ersten Übung"}</b><div class="sub">${n ? `Nächste Wiederholung ${inTagen(n)}.` : "Jede Aufgabe kommt nach 1, 3, 7, 16 und 35 Tagen wieder."}</div></span></div>`;
  }
  const kachel = (a, icon, titel, text, v = "") => `<button class="kachel" data-a="schnell" data-v="${a}" data-t="${v}"><span class="k-icon">${ic(icon)}</span><span class="k-text"><b>${titel}</b><span class="sub">${esc(text)}</span></span></button>`;
  const schnell = state.fach === "oer"
    ? kachel("qa", state.oerModus === "mc" ? "haken" : "stift", state.oerModus === "mc" ? "Multiple Choice" : "Frage – Antwort", "75 % der Klausur") +
      kachel("uebertragung", "diagramm", "Übertragung", "Grafiken auswerten · 25 %") +
      kachel("alles", "mischen", "Gemischt", "Quer durch das Skript")
    : state.fach === "est"
    ? `<button class="kachel" data-a="punktesammler"><span class="k-icon">${ic("ziel")}</span><span class="k-text"><b>Punkte sammeln</b><span class="sub">Klausursätze zum Auswendiglernen</span></span></button>` +
      kachel("rechnen", "tkonto", "Rechnen", "Tarif, WK, Entfernungspauschale") +
      kachel("fall", "lernen", "Fälle einordnen", "Steuerpflicht, § 11, Einkunftsart") +
      kachel("qa", state.oerModus === "mc" ? "haken" : "stift", state.oerModus === "mc" ? "Multiple Choice" : "Frage – Antwort", "Definitionen und Klausurfälle") +
      kachel("alles", "mischen", "Gemischt", "Quer durch alle Themen")
    : kachel("buchung", "tkonto", "Buchungssätze", "Immer neue Beträge") +
      kachel("alles", "mischen", "Gemischt", "Buchen, Rechnen, Theorie");
  const breit = state.fach === "bsr" ? " breit" : "";
  const schwachKachel = schwach && quote(zaehler(schwach.id)) < 0.8
    ? `<button class="kachel${breit}" data-a="schnell" data-v="schwach" data-t="${schwach.id}"><span class="k-icon" style="background:var(--warn-weak);color:var(--warn)">${ic("ziel")}</span><span class="k-text"><b>Schwächstes Thema</b><span class="sub">${esc(schwach.titel)} · ${Math.round(quote(zaehler(schwach.id)) * 100)} %</span></span></button>`
    : `<button class="kachel${breit}" data-a="tab" data-v="klausur"><span class="k-icon">${ic("klausur")}</span><span class="k-text"><b>Klausur</b><span class="sub">Unter Echtbedingungen</span></span></button>`;

  return `
    ${modulLeiste()}
    <section class="modul-banner">
      <div class="reihe1"><span class="m-icon">${ic(m.icon, "gross")}</span>
        <div style="min-width:0"><h1>${m.titel}</h1><div class="unter">${esc(m.unter)}</div></div></div>
      <div class="zahlen">
        <div><b>${ids.length}</b><span>Aufgabentypen</span></div>
        <div><b>${z.b ? Math.round(quote(z) * 100) + " %" : "–"}</b><span>richtig</span></div>
        <div><b>${gemeistert}</b><span>gefestigt</span></div>
      </div>
    </section>
    ${modusSchalter()}
    <div class="gruppe"><div class="gruppe-titel">Heute</div><div class="kachel-grid">${heute}</div></div>
    <div class="gruppe"><div class="gruppe-titel">Schnellstart</div><div class="kachel-grid">${schnell}${schwachKachel}</div></div>
    <div class="gruppe"><div class="gruppe-titel">${{ oer: "Themen · Skript Kapitel 1–2", est: "Themen · Skripte & Folien" }[state.fach] || "Themen · Skript Teil I"}<span class="sub" style="text-transform:none;letter-spacing:0">${themenFuer(state.fach).length} Themen</span></div>
      <div class="filter-suche"><input type="search" id="themenFilter" data-fokus="themenFilter" placeholder="Thema filtern …" autocomplete="off" value="${esc(state.themenFilter)}"></div>
      <div id="themenListe">${themenListe()}</div></div>
    ${lernkarteiView()}`;
}

function themenListe() {
  const q = norma(state.themenFilter.trim());
  const liste = themenFuer(state.fach).filter((t) => !q || norma(`${t.titel} ${t.unter}`).includes(q));
  if (!liste.length) return `<div class="leer-zustand" style="padding:20px">${ic("suche")}<div class="sub">Kein Thema gefunden.</div></div>`;
  return `<div class="liste">${liste.map((t) => {
    const z = zaehler(t.id), q2 = quote(z), n = vorlagenFuer(t.id).length;
    return `<button class="zeile" data-a="thema" data-v="${t.id}">
      <span class="thema-icon">${t.icon}</span>
      <span class="grow"><div style="font-weight:600">${esc(t.titel)}</div><div class="sub">${esc(t.unter)} · ${n} Aufgaben</div></span>
      ${z.b ? `<span class="mini-ring" style="--p:${Math.round(q2 * 100)};--farbe:${farbe(q2)}"><span>${Math.round(q2 * 100)}</span></span>` : `<span class="pille m">neu</span>`}</button>`;
  }).join("")}</div>`;
}

/** Umschalter Frage-Antwort / Multiple Choice (ÖR und ESt). */
function modusSchalter() {
  if (state.fach === "bsr") return "";
  const m = [["qa", "stift", "Frage – Antwort"], ["mc", "haken", "Multiple Choice"]];
  return `<div class="gruppe"><div class="gruppe-titel">Antwortmodus</div><div class="modus-karte"><div class="segment">${m.map(([id, i, t]) =>
    `<button data-a="oerModus" data-v="${id}" class="${state.oerModus === id ? "aktiv" : ""}">${ic(i, "klein")}${t}</button>`).join("")}</div>
    <div class="gruppe-fuss">${state.oerModus === "mc"
      ? "Ankreuzen statt formulieren – oft sind mehrere Antworten richtig. Ideal für unterwegs: lange Klausurfälle werden hier ausgelassen."
      : "Antwort selbst formulieren wie in der Klausur – automatisch geprüft nach Norm und Kernbegriffen, mit Musterantwort und Normzitat."}</div></div></div>`;
}

/** Verteilung der Aufgaben auf die Fächer der Lernkartei. */
function lernkarteiView() {
  const ids = idsVon(state.fach);
  const n = Array(FAECHER_MAX + 1).fill(0);
  ids.forEach((id) => { n[stat.lern[id]?.fach || 0] += 1; });
  const max = Math.max(1, ...n.slice(1));
  return `<div class="gruppe"><div class="gruppe-titel">Lernkartei · Langzeitgedächtnis</div><div class="liste"><div style="padding:16px">
    <div class="kartei">${n.slice(1).map((k, i) => `<div class="kartei-fach"><div class="kartei-saeule"><span style="height:${Math.round((k / max) * 100)}%"></span></div>
      <b class="mono">${k}</b><div class="sub">Fach ${i + 1}</div><div class="sub" style="font-size:11.5px">${INTERVALLE[i + 1]} ${INTERVALLE[i + 1] === 1 ? "Tag" : "Tage"}</div></div>`).join("")}</div>
    <div class="sub" style="margin-top:10px">${n[0]} von ${ids.length} Aufgaben noch nie beantwortet · ${faelligVon(state.fach).length} heute fällig</div></div></div>
    <div class="gruppe-fuss">Richtig → ein Fach weiter, längere Pause. Falsch → zurück in Fach 1, morgen wieder dran. Ab Fach 3 gilt eine Aufgabe als gefestigt.</div></div>`;
}

// ======================= Tab: Klausur =======================
const klausurenFach = () => stat.klausuren.filter((k) => (k.fach || "bsr") === state.fach);

function tabKlausur() {
  const zeiten = [0, 30, 45, 60, 90];
  const ks = klausurenFach();
  const letzte = ks.slice(-12);
  return `
    ${seitenKopf("Klausur", state.fach === "oer"
      ? (state.oerModus === "mc"
        ? "Ca. 75 % Frage-Antwort als Multiple Choice und 25 % Übertragungsaufgaben. Automatische Auswertung nach der Abgabe."
        : "Wie in der Klausur: ca. 75 % Frage-Antwort und 25 % Übertragungsaufgaben. Nach der Abgabe vergleichst du mit den Musterantworten.")
      : state.fach === "est"
      ? "Ca. 50 % Rechenaufgaben mit immer neuen Zahlen, dazu Einordnungsfälle und Frage-Antwort. Auswertung erst nach der Abgabe."
      : "Gemischte Aufgaben aus allen Themen, Schwerpunkt Buchungssätze (ca. 60 %). Auswertung erst nach der Abgabe.")}
    ${modusSchalter()}
    <div class="gruppe"><div class="gruppe-titel">Einstellungen</div><div class="liste">
      <div class="zeile"><span class="symbol">${ic("lernen")}</span><span class="grow"><b>Aufgaben</b></span>
        <span class="stepper"><button data-a="anzahl" data-v="-5" aria-label="weniger">−</button><b>${state.klausurAnzahl}</b><button data-a="anzahl" data-v="5" aria-label="mehr">+</button></span></div>
      <div class="zeile" style="flex-wrap:wrap"><span class="symbol">${ic("klausur")}</span><span class="grow"><b>Zeitlimit</b></span>
        <span class="segment" style="width:100%">${zeiten.map((m) => `<button class="${state.klausurMinuten === m ? "aktiv" : ""}" data-a="minuten" data-v="${m}">${m ? m + "′" : "ohne"}</button>`).join("")}</span></div>
    </div></div>
    <button class="knopf" data-a="klausurStart">${ic("play", "fill")} Klausur starten</button>
    ${ks.length ? `<div class="gruppe"><div class="gruppe-titel">Deine Klausuren <span class="sub" style="text-transform:none;letter-spacing:0">Ø ${Math.round((ks.reduce((a, k) => a + k.richtig / k.gesamt, 0) / ks.length) * 100)} %</span></div><div class="liste">
      <div class="verlauf-balken" style="padding-top:14px">${letzte.map((k) => { const q = k.richtig / k.gesamt; return `<span style="height:${Math.max(6, Math.round(q * 100))}%;background:${farbe(q)}" title="${Math.round(q * 100)} %"></span>`; }).join("")}</div>
      ${[...ks].reverse().slice(0, 20).map((k) => { const q = k.richtig / k.gesamt; return `<div class="zeile"><span class="mini-ring" style="--p:${Math.round(q * 100)};--farbe:${farbe(q)}"><span>${Math.round(q * 100)}</span></span>
        <span class="grow"><div>${new Date(k.datum).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" })}</div><div class="sub">${Math.round(k.sek / 60)} min${k.offen ? ` · ${k.offen} nicht selbst bewertet` : ""}</div></span>
        <b class="mono">${k.richtig}/${k.gesamt}</b></div>`; }).join("")}
    </div></div>` : `<div class="leer-zustand">${ic("klausur")}<div><b>Noch keine Klausur geschrieben</b></div><div class="sub">Deine Ergebnisse erscheinen hier als Verlauf.</div></div>`}`;
}

// ======================= Tab: Karten =======================
function tabKarten() {
  const LERNKARTEN = kartenFuer(state.fach);
  const gewusst = new Set(stat.karten);
  const offen = LERNKARTEN.filter((k) => !gewusst.has(k.id));
  const themen = themenFuer(state.fach).filter((t) => LERNKARTEN.some((k) => k.thema === t.id));
  const p = Math.round(((LERNKARTEN.length - offen.length) / LERNKARTEN.length) * 100);
  return `
    ${seitenKopf("Lernkarten", state.fach === "bsr" ? "Merksätze, Definitionen, Fristen und Formeln aus dem Skript." : "Jede Frage-Antwort-Aufgabe als Karte – Rückseite mit Musterantwort und Normzitat.")}
    <div class="kachel-grid">
      <button class="kachel" data-a="deck" data-v="alle"><span class="k-icon">${ic("mischen")}</span><span class="k-text"><b>Alle mischen</b><span class="sub">${LERNKARTEN.length} Karten</span></span></button>
      <button class="kachel" data-a="deck" data-v="offen" ${offen.length ? "" : "disabled"}><span class="k-icon" style="background:var(--warn-weak);color:var(--warn)">${ic("ziel")}</span><span class="k-text"><b>Noch nicht gewusst</b><span class="sub">${offen.length} Karten</span></span></button>
    </div>
    <div class="liste" style="margin-top:12px"><div class="zeile"><span class="grow"><div style="display:flex;justify-content:space-between"><b>Gewusst</b><span class="sub mono">${LERNKARTEN.length - offen.length}/${LERNKARTEN.length}</span></div>
      <div class="balken"><span class="gut" style="width:${p}%"></span></div></span></div></div>
    <div class="gruppe"><div class="gruppe-titel">Themen auswählen ${state.kartenThemen.size ? `<button class="link-klein" data-a="kartenKeine">Auswahl aufheben</button>` : `<button class="link-klein" data-a="kartenAlle">Alle</button>`}</div><div class="liste">
      ${themen.map((t) => {
        const ks = LERNKARTEN.filter((k) => k.thema === t.id), an = state.kartenThemen.has(t.id);
        return `<button class="zeile" data-a="kartenThema" data-v="${t.id}"><span class="haekchen ${an ? "an" : ""}">${an ? ic("haken", "klein") : ""}</span>
          <span class="thema-icon" style="width:34px;height:34px;font-size:17px">${t.icon}</span><span class="grow">${esc(t.titel)}</span><span class="sub mono">${ks.filter((k) => gewusst.has(k.id)).length}/${ks.length}</span></button>`;
      }).join("")}
    </div></div>
    ${state.kartenThemen.size ? `<button class="knopf" data-a="deck" data-v="auswahl">${ic("play", "fill")} ${state.kartenThemen.size} ${state.kartenThemen.size === 1 ? "Thema" : "Themen"} lernen</button>` : ""}`;
}

// ======================= Tab: Nachschlagen =======================
/** Bilanzrecht: Kontenplan und Gesetzestexte in einem Reiter. */
function tabNachschlagenBilr() {
  const ansicht = gesetzeFuer("bsr").length ? state.bilrAnsicht : "konten";
  const segment = gesetzeFuer("bsr").length ? `<div class="modus-karte" style="margin:4px 0 12px"><div class="segment">${[["konten", "tkonto", "Kontenplan"], ["gesetze", "waage", "Gesetze"]].map(([id, i, t]) =>
    `<button data-a="bilrAnsicht" data-v="${id}" class="${ansicht === id ? "aktiv" : ""}">${ic(i, "klein")}${t}</button>`).join("")}</div></div>` : "";
  if (ansicht === "gesetze") {
    return `${seitenKopf("Nachschlagen")}${segment}
      <div class="filter-suche"><input type="search" id="normSuche" data-fokus="normSuche" placeholder="Suchen, z. B. Vorsteuer, § 17, Skonto" autocomplete="off" value="${esc(state.normSuche)}"></div>
      <div class="gruppe-fuss" style="margin:0 4px 4px">Die in den Aufgaben zitierten Vorschriften im Wortlaut – lange Paragrafen als Auszug.</div>
      <div id="normListe">${normenListe()}</div>`;
  }
  return `${seitenKopf("Nachschlagen")}${segment}${kontenInhalt()}`;
}

function kontenInhalt() {
  return `
    <div class="filter-suche"><input type="search" id="kontoTabSuche" data-fokus="kontoTabSuche" placeholder="Konto suchen, z. B. Vorsteuer" autocomplete="off" value="${esc(state.kontoSuche)}"></div>
    <div class="liste"><button class="zeile" data-a="merksaetze"><span class="symbol">💡</span><span class="grow"><b>Merksätze zum Buchen</b><div class="sub">Soll an Haben, Aktiv/Passiv, Nettomethode …</div></span><span class="chev">${ic("pfeil", "klein")}</span></button></div>
    <div id="kontoTabListe">${kontoListe("kontoDetail")}</div>`;
}

const GESETZE = {
  oer: [["GG", "Grundgesetz (GG)"], ["BWahlG", "Bundeswahlgesetz (BWahlG)"], ["PartG", "Parteiengesetz (PartG)"]],
  bsr: [["HGB", "Handelsgesetzbuch (HGB)"], ["AO", "Abgabenordnung (AO)"], ["EStG", "Einkommensteuergesetz (EStG)"], ["UStG", "Umsatzsteuergesetz (UStG)"]],
  est: [["EStG", "Einkommensteuergesetz (EStG)"], ["AO", "Abgabenordnung (AO)"], ["BGB", "Bürgerliches Gesetzbuch (BGB)"]],
};
const normenVon = (fach) => NORMEN.filter((n) => n.faecher.includes(fach));
/** Gesetze eines Moduls, deren Text in der App vorliegt. */
const gesetzeFuer = (fach) => (GESETZE[fach] || []).filter(([g]) => normenVon(fach).some((n) => n.g === g));

function normenListe() {
  const q = norma(state.normSuche.trim());
  const html = gesetzeFuer(state.fach).map(([g, titel]) => {
    const liste = normenVon(state.fach).filter((n) => n.g === g).filter((n) => !q || norma(`${n.nr} ${n.titel} ${n.abs.map((a) => a.text).join(" ")}`).includes(q)
      || norma(g === "GG" ? `art ${n.nr}` : `§ ${n.nr}`) === q || norma(g === "GG" ? `art. ${n.nr}` : `§${n.nr}`) === q);
    if (!liste.length) return "";
    return `<div class="gruppe"><div class="gruppe-titel">${titel}<span class="sub" style="text-transform:none;letter-spacing:0">${liste.length}</span></div><div class="liste">
      ${liste.map((n) => `<button class="zeile" data-a="normDetail" data-v="${n.g} ${n.nr}"><span class="symbol" style="font-size:14px;width:46px">${g === "GG" ? (n.nr === "Präambel" ? "Pr." : n.nr) : "§ " + n.nr}</span><span class="grow"><div style="font-weight:600">${g === "GG" ? (n.nr === "Präambel" ? "Präambel" : "Art. " + n.nr) : "§ " + n.nr}</div><div class="sub">${esc(n.titel && n.titel !== "Präambel" ? n.titel : n.abs[0]?.text.slice(0, 70) + " …")}${n.auszug ? " · Auszug" : ""}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join("")}
    </div></div>`;
  }).join("");
  return html || `<div class="leer-zustand">${ic("suche")}<div><b>Keine Vorschrift gefunden</b></div></div>`;
}

function tabNormen() {
  return `
    ${seitenKopf("Normen", "Alle lehrplanrelevanten Vorschriften im Wortlaut – auch offline.")}
    <div class="filter-suche"><input type="search" id="normSuche" data-fokus="normSuche" placeholder="${state.fach === "est" ? "Suchen, z. B. Entfernungspauschale, § 11, Wohnsitz" : "Suchen, z. B. Bundesrat, Art. 63, Wahlrecht"}" autocomplete="off" value="${esc(state.normSuche)}"></div>
    <div id="normListe">${normenListe()}</div>`;
}

/** Text eines Absatzes; die in der Aufgabe zitierten Sätze bzw. Nummern werden hervorgehoben. */
function absatzHtml(n, a, zs) {
  const g = n.ref.split(" ")[0], nr = n.ref.split(" ")[1];
  const passend = zs.filter((z) => z.g === g && z.nr === nr && (z.abs ? z.abs === a.abs : a.abs === "" || n.absaetze.length === 1));
  const nummern = passend.flatMap((z) => z.nummern), satzNr = passend.map((z) => z.satz).filter(Boolean);
  const text = a.text, html = (t) => esc(t).replace(/\n/g, "<br>");
  const mark = (t) => `<mark class="norm-hl">${html(t)}</mark>`;
  let inhalt = html(text), treffer = false;
  if (nummern.length) {
    // Aufzählung: Zeilen der zitierten Nummern (bei „9a“ nur Buchstabe a der Nr. 9)
    let aktuell = null;
    const zeilen = text.split("\n").map((l) => {
      const m = l.match(/^(\d+[a-z]?)\.\s/);
      if (m) aktuell = m[1]; else if (l.startsWith("…")) aktuell = null;
      const buchst = l.match(/^(?:\d+[a-z]?\.\s)?([a-z])\)/)?.[1];
      const an = nummern.some((x) => {
        const [, basis, b] = x.match(/^(\d+)([a-z]?)$/) || [];
        return aktuell === x || (b && aktuell === basis && buchst === b);
      });
      if (an) treffer = true;
      return an ? mark(l) : html(l);
    });
    inhalt = zeilen.join("<br>");
  } else if (satzNr.length) {
    const teile = saetze(text);
    let pos = 0, out = "";
    teile.forEach(([s0, e0], i) => {
      out += html(text.slice(pos, s0));
      out += satzNr.includes(String(i + 1)) ? ((treffer = true), mark(text.slice(s0, e0))) : html(text.slice(s0, e0));
      pos = e0;
    });
    inhalt = out + html(text.slice(pos));
  } else if (passend.length && n.absaetze.length > 1) {
    inhalt = mark(text); treffer = true;
  }
  return { html: `<p>${a.abs ? `<b>(${a.abs})</b> ` : ""}${inhalt}</p>`, treffer };
}

function normBlock(refs, kontext = "") {
  const ns = (refs || []).map(norm).filter(Boolean);
  if (!ns.length) return "";
  const zs = zitate(kontext);
  const bloecke = ns.map((n) => {
    const teile = n.absaetze.map((a) => absatzHtml(n, a, zs));
    const treffer = teile.some((t) => t.treffer);
    return { treffer, html: `<details class="norm"${ns.length <= 2 || treffer ? " open" : ""}><summary>${esc(n.label)}${n.titel ? ` <span class="sub">– ${esc(n.titel)}</span>` : ""}</summary>
    ${teile.map((t) => t.html).join("")}${n.auszug ? `<p class="sub">Auszug – weitere Absätze bzw. Nummern sind nicht abgedruckt.</p>` : ""}</details>` };
  });
  const legende = bloecke.some((x) => x.treffer) ? ` <span class="hl-legende">markiert = in der Aufgabe zitiert</span>` : "";
  return `<div class="normen"><div class="sub" style="margin-bottom:4px;font-weight:600">Gesetzestext${legende}</div>${bloecke.map((x) => x.html).join("")}</div>`;
}

// ======================= Render: Sitzung =======================
const LOB = ["Richtig!", "Sehr gut!", "Genau so!", "Stark!", "Perfekt!"];
const TROST = ["Nicht ganz.", "Knapp daneben.", "Noch nicht ganz."];

function sitzungView() {
  const x = s();
  if (!x.fragen.length) {
    return `<div class="vollbild"><div class="vb-kopf"><button class="rund" data-a="beenden" aria-label="Schließen">${ic("kreuz")}</button><div class="mitte">Keine Aufgaben</div><span class="zaehler"></span></div></div>`;
  }
  if (x.beendet && x.review != null) return reviewView();
  if (x.beendet) return ergebnisView();

  const f = aktFrage(), b = x.modus === "klausur" ? null : x.bewertungen[x.index];
  const n = x.fragen.length;
  const r = restSekunden();
  let mitte;
  if (x.modus === "klausur") {
    mitte = r != null ? `<div class="mitte"><span id="timer" class="timer ${r < 300 ? "knapp" : ""}">${ic("klausur", "klein")}<span>${uhr(r)}</span></span></div>` : `<div class="mitte">${esc(sitzungTitel(x))}</div>`;
  } else if (n <= 20) {
    mitte = `<div class="punkte-leiste">${x.fragen.map((_, i) => {
      const bw = x.bewertungen[i];
      const kl = bw ? (bw.korrekt === true ? "ok" : bw.korrekt === false ? "err" : "offen") : i === x.index ? "akt" : "";
      return `<i class="${kl}"></i>`;
    }).join("")}</div>`;
  } else {
    mitte = `<div class="sitzung-fortschritt"><span style="width:${((x.index + 1) / n) * 100}%"></span></div>`;
  }
  const rechts = x.modus === "klausur"
    ? `<button class="rund" data-a="raster" aria-label="Aufgabenübersicht">${ic("karten")}</button>`
    : `<span class="zaehler">${x.index + 1}/${n}</span>`;

  let fuss, fussKlasse = "", feedback = "";
  if (x.modus === "klausur") {
    fuss = `<button class="knopf zweit" data-a="zurueck" ${x.index === 0 ? "disabled" : ""}>${ic("zurueck")} Zurück</button>` +
      (x.index === n - 1 ? `<button class="knopf" data-a="abgeben">${ic("haken")} Abgeben</button>` : `<button class="knopf" data-a="weiter">Weiter ${ic("pfeil")}</button>`);
  } else if (f.typ === "offen" && !b && !x.aufgedeckt[x.index]) {
    fuss = `<button class="knopf" id="offenKnopf" data-a="pruefen">${offenKnopfText(f, aktAntwort())}</button>`;
  } else if (f.typ === "offen" && !b) {
    feedback = `<div class="feedback" style="color:var(--text);font-size:16px"><span>Hast du es gewusst?<small>Ehrlich vergleichen – das steuert, wann die Frage wiederkommt.</small></span></div>`;
    fuss = `<button class="knopf rot" data-a="selbst" data-v="0">${ic("kreuz")} Nicht gewusst</button><button class="knopf gruen" data-a="selbst" data-v="1">${ic("haken")} Gewusst</button>`;
  } else if (!b) {
    fuss = `<button class="knopf" id="pruefen" data-a="pruefen" ${istLeer(f, aktAntwort()) ? "disabled" : ""}>Prüfen</button>`;
  } else {
    const ok = b.korrekt;
    fussKlasse = ok ? "ok" : "err";
    const satz = (ok ? LOB : TROST)[(x.index + n) % (ok ? LOB.length : TROST.length)];
    feedback = `<div class="feedback"><span class="kreis-ic">${ic(ok ? "haken" : "kreuz")}</span><span>${satz}<small>${ok ? "Kommt in der Lernkartei ein Fach weiter." : "Die Lösung steht oben – morgen kommt die Aufgabe wieder."}</small></span></div>`;
    fuss = `<button class="knopf ${ok ? "gruen" : "rot"}" data-a="weiter">${x.index === n - 1 ? "Auswertung" : "Weiter"} ${ic("pfeil")}</button>`;
  }

  return `<div class="vollbild">
    <div class="vb-kopf"><button class="rund" data-a="beenden" aria-label="Beenden">${ic("kreuz")}</button>${mitte}${rechts}</div>
    <div class="vb-inhalt">
      <div class="nr">Aufgabe ${x.index + 1} von ${n} · ${esc(sitzungTitel(x))}</div>
      ${frageView(f, aktAntwort(), b, false, x.modus !== "klausur" && x.aufgedeckt[x.index])}
    </div>
    <div class="vb-fuss ${fussKlasse}">${feedback}<div class="reihe">${fuss}</div></div>
  </div>`;
}

function frageView(f, antwort, b, gesperrt, aufgedeckt = false) {
  const lock = gesperrt || !!b || aufgedeckt;
  let eingabe = "";
  if (f.typ === "buchung") eingabe = buchungView(antwort, b?.buchung, lock);
  else if (f.typ === "auswahl") eingabe = auswahlView(f, antwort, !!b, lock);
  else if (f.typ === "offen") eingabe = offenView(f, antwort, lock);
  else eingabe = zahlView(f, antwort, b, lock);
  const zeigeAuswertung = b || (f.typ === "offen" && (aufgedeckt || gesperrt));
  return `
    <div class="aufgabe"><div class="meta"><span>${THEMA[f.thema].icon} ${esc(THEMA[f.thema].titel)}</span><span class="typ">${f.uebertragung ? "Übertragung · " : ""}${typBezeichnung(f)}</span></div>
      <div class="text">${esc(f.text)}</div>
      ${f.grafik ? `<div class="grafik-box">${f.grafik}</div>` : ""}</div>
    ${eingabe}
    ${zeigeAuswertung ? auswertungView(f, b || { korrekt: null, offen: true }) : ""}`;
}

const offenKnopfText = (f, a) => (pruefdaten(f) && a.text.trim() ? "Prüfen" : "Antwort zeigen");
function offenView(f, antwort, lock) {
  const auto = !!pruefdaten(f);
  return `<div class="gruppe"><div class="gruppe-titel">Deine Antwort ${lock ? "" : "<span class='sub' style='text-transform:none;letter-spacing:0'>Stichpunkte, optional</span>"}</div>
    <textarea id="offen" class="offen-eingabe" rows="5" data-fokus="offen" placeholder="Antwort mit Normen notieren – z. B. „Art. 51 Abs. 2 GG: …“" ${lock ? "readonly" : ""}>${esc(antwort.text)}</textarea>
    ${lock ? "" : `<div class="gruppe-fuss">${auto
      ? "Wird automatisch geprüft: die richtige Norm (z. B. „§ 26“ oder „Art. 51“) und die wichtigsten Begriffe – Formulierung und Reihenfolge sind egal. Leer lassen, um die Musterantwort aufzudecken und selbst zu bewerten."
      : "Formuliere deine Antwort wie in der Klausur und decke dann die Musterantwort auf."}</div>`}</div>`;
}

function buchungView(antwort, bb, lock) {
  const zeilen = antwort.zeilen;
  const seite = (sd) => {
    const rows = zeilen.filter((z) => z.seite === sd).map((z) => {
      const st = bb?.status[z.id];
      const hinweis = st === "betrag" ? `Konto richtig, Betrag falsch – erwartet ${G.text(bb.erwartet[z.id])}`
        : st === "konto" ? "Dieses Konto gehört nicht (auf diese Seite) in den Buchungssatz"
        : st === "unvollstaendig" ? "Konto oder Betrag fehlt bzw. ist nicht lesbar" : "";
      const kl = st ? (st === "richtig" ? "ok" : "err") : "";
      return `<div class="bz ${kl}">
          ${sd === "haben" ? `<span class="an">an</span>` : ""}
          <button class="konto ${z.konto ? "" : "leer"}" data-a="kontoWahl" data-z="${z.id}" ${lock ? "disabled" : ""}>${z.konto ? esc(K(z.konto).kurz) : "Konto wählen …"}</button>
          <input class="betrag" inputmode="decimal" autocomplete="off" placeholder="0,00" data-z="${z.id}" data-fokus="b-${z.id}" value="${esc(z.betrag)}" ${lock ? "disabled" : ""}>
          ${st ? `<span class="stat" style="color:${st === "richtig" ? "var(--ok)" : "var(--err)"}">${st === "richtig" ? "✓" : "✗"}</span>` : lock ? "" : `<button class="del" data-a="zeileWeg" data-z="${z.id}" aria-label="Zeile löschen">✕</button>`}
        </div>${hinweis ? `<div class="bz-hinweis-wrap ${kl}"><div class="bz-hinweis">${hinweis}</div></div>` : ""}`;
    }).join("");
    return `<div class="gruppe" data-seite="${sd}"><div class="gruppe-titel"><span>${sd === "soll" ? "Soll" : "an Haben"}</span><span>Betrag in €</span></div>
      <div class="liste">${rows}${lock ? "" : `<button class="add" data-a="zeileNeu" data-v="${sd}">⊕ ${sd === "soll" ? "Soll" : "Haben"}-Position hinzufügen</button>`}</div></div>`;
  };
  return seite("soll") + seite("haben") + `<div id="summen">${summenView(zeilen)}</div>`;
}

function summenView(zeilen) {
  const sum = (sd) => zeilen.filter((z) => z.seite === sd).reduce((a, z) => a + (G.lesen(z.betrag) ?? 0), 0);
  const so = sum("soll"), ha = sum("haben"), gleich = so === ha;
  return `<div class="summen"><div><div class="lbl">Summe Soll</div><div class="wert">${G.text(so)}</div></div>
    <div class="gleich ${gleich ? "" : "warn"}">${gleich ? "=" : "≠"}</div>
    <div style="text-align:right"><div class="lbl">Summe Haben</div><div class="wert">${G.text(ha)}</div></div></div>
    <div class="gruppe-fuss">${gleich ? "Beträge z. B. als 1.234,56 eingeben. Reihenfolge der Positionen ist egal." : `Soll und Haben stimmen noch nicht überein (Differenz ${G.text(Math.abs(so - ha))}).`}</div>`;
}

function auswahlView(f, antwort, zeige, lock) {
  const mehr = f.richtig.length > 1;
  return `<div class="gruppe"><div class="gruppe-titel">${mehr ? "Mehrere Antworten sind richtig" : "Eine Antwort ist richtig"}</div><div class="optionen">
    ${f.optionen.map((o, i) => {
      const an = antwort.gewaehlt.includes(i);
      let kl = an ? "an" : "", zeichen = an ? ic("haken") : "";
      if (zeige) {
        if (f.richtig.includes(i)) { kl = an ? "richtig" : "richtig verpasst"; zeichen = ic("haken"); } else if (an) { kl = "falsch"; zeichen = ic("kreuz"); } else { kl = ""; zeichen = ""; }
      }
      return `<button class="option ${mehr ? "mehr" : ""} ${kl}" data-a="option" data-v="${i}" ${lock ? "disabled" : ""}><span class="kreis">${zeichen}</span><span>${esc(o)}</span>${!lock && i < 9 ? `<span class="taste">${i + 1}</span>` : ""}</button>`;
    }).join("")}
  </div></div>`;
}

function zahlView(f, antwort, b, lock) {
  return `<div class="gruppe"><div class="gruppe-titel">Deine Lösung</div>
    <div class="zahl-eingabe">
      ${lock || f.ganz ? "" : `<button class="vz" data-a="vorzeichen" aria-label="Vorzeichen wechseln">±</button>`}
      <input id="zahl" inputmode="decimal" autocomplete="off" placeholder="Ergebnis" data-fokus="zahl" value="${esc(antwort.text)}" ${lock ? "disabled" : ""}>
      <span class="einheit">${f.einheit}</span>
      ${b ? `<span style="font-size:22px;font-weight:800;color:${b.korrekt ? "var(--ok)" : "var(--err)"}">${b.korrekt ? "✓" : "✗"}</span>` : ""}
    </div>
    <div class="gruppe-fuss">${f.ganz ? "Ganze Zahl eingeben." : `Format z. B. 1.234,56 – negative Werte mit ±. Toleranz ± ${G.text(f.toleranz)}.`}</div></div>`;
}

function auswertungView(f, b) {
  let extra = "";
  if (f.typ === "zahl") {
    extra = `${b.lesbar === false ? `<div class="sub">Deine Eingabe konnte nicht als Zahl gelesen werden.</div>` : ""}<div class="loesung"><b>Lösung: ${esc(loesungText(f))}</b></div>`;
  }
  if (f.typ === "buchung") {
    const l = b.buchung.loesung;
    extra = `<div class="loesung"><div class="sub" style="margin-bottom:4px">Musterlösung</div>
      ${l.soll.map(([k, c]) => `<div class="loesung-zeile"><span>${esc(K(k).name)}</span><span>${G.text(c)}</span></div>`).join("")}
      ${l.haben.map(([k, c]) => `<div class="loesung-zeile haben"><span>an ${esc(K(k).name)}</span><span>${G.text(c)}</span></div>`).join("")}</div>
      ${!b.korrekt && b.buchung.fehlend.length ? `<div class="fehlt"><b>In deiner Lösung fehlt:</b><br>${b.buchung.fehlend.map(([sd, k, c]) => `• ${sd === "soll" ? "Soll" : "Haben"}: ${esc(K(k).kurz)} ${G.text(c)}`).join("<br>")}</div>` : ""}`;
  }
  if (f.typ === "offen" && b.auto) {
    const a = b.auto, haken = (ok) => `<span class="pruef-ic ${ok ? "ja" : "nein"}">${ok ? "✓" : "✗"}</span>`;
    return `<div class="gruppe" id="auswertung"><div class="auswertung ${b.korrekt ? "" : "nein"}">
      <div class="urteil ${b.korrekt ? "ja" : "nein"}">${b.korrekt ? "✓ Richtig" : "✗ Noch nicht vollständig"}${b.korrigiert ? ` <span class="sub">(von dir korrigiert)</span>` : ""}</div>
      <div class="pruefung">
        ${a.normen.length ? a.normen.map((n) => `<div class="pruef-zeile">${haken(n.ok)}<span><b>Norm:</b> ${esc(n.label)}${n.ok ? "" : " – nicht zitiert"}</span></div>`).join("") : ""}
        <div class="pruef-zeile">${haken(a.treffer >= a.min)}<span><b>Begriffe:</b> ${a.treffer} von ${a.stichworte.length} genannt (mindestens ${a.min})</span></div>
        <div class="pruef-chips">${a.stichworte.map((w) => `<span class="pruef-chip ${w.ok ? "ja" : "nein"}">${w.ok ? "✓" : "✗"} ${esc(w.wort)}</span>`).join("")}</div>
      </div>
      <div class="sub" style="margin:10px 0 4px">Musterantwort</div>
      <div class="erkl muster">${esc(f.antwort)}</div>
      ${f.erklaerung ? `<div class="erkl sub" style="margin-top:8px">${esc(f.erklaerung)}</div>` : ""}
      ${normBlock(f.normen, [f.text, f.antwort, f.erklaerung, f.quelle, f.zusatzZitate].join(" "))}
      ${!b.korrigiert && (s()?.beendet || s()?.modus !== "klausur") ? `<div class="gruppe-fuss" style="margin:10px 0 0">Die Prüfung achtet nur auf Norm und Schlüsselbegriffe. ${b.korrekt ? "Doch etwas Wesentliches vergessen?" : "Inhaltlich trotzdem richtig?"}
        <button class="link" data-a="korrigieren">${b.korrekt ? "Als „nicht gewusst“ werten" : "Als „gewusst“ werten"}</button></div>` : ""}
    </div></div>`;
  }
  if (f.typ === "offen") {
    const urteil = b.korrekt === true ? `<div class="urteil ja">✓ Gewusst</div>` : b.korrekt === false ? `<div class="urteil nein">✗ Nicht gewusst</div>` : `<div class="urteil">Musterantwort</div>`;
    return `<div class="gruppe" id="auswertung"><div class="auswertung ${b.korrekt === false ? "nein" : b.korrekt === null ? "neutral" : ""}">
      ${urteil}
      <div class="erkl muster">${esc(f.antwort)}</div>
      ${f.erklaerung ? `<div class="erkl sub" style="margin-top:8px">${esc(f.erklaerung)}</div>` : ""}
      ${normBlock(f.normen, [f.text, f.antwort, f.erklaerung, f.quelle, f.zusatzZitate].join(" "))}
      ${b.korrekt === null ? `<div class="gruppe-fuss" style="margin:10px 0 0">Vergleiche mit deiner Antwort: Hast du die wesentlichen Punkte und die richtige Norm genannt?</div>` : ""}
    </div></div>`;
  }
  return `<div class="gruppe" id="auswertung"><div class="auswertung ${b.korrekt ? "" : "nein"}">
    <div class="urteil ${b.korrekt ? "ja" : "nein"}">${b.korrekt ? "✓ Richtig!" : "✗ Leider nicht richtig"}</div>
    ${extra}
    ${f.antwort ? `<div class="erkl muster">${esc(f.antwort)}</div>${f.erklaerung ? `<div class="erkl sub" style="margin-top:8px">${esc(f.erklaerung)}</div>` : ""}` : `<div class="erkl">${esc(f.erklaerung)}</div>`}
    ${normBlock(f.normen, [f.text, f.antwort, f.erklaerung, f.quelle, f.zusatzZitate].join(" "))}
    ${f.quelle ? `<div class="quelle">📖 ${esc(f.quelle)}</div>` : ""}
  </div></div>`;
}

function konfetti() {
  const farben = ["#4f46e5", "#e11d48", "#059669", "#f59e0b", "#0284c7", "#c026d3"];
  return `<div class="konfetti" aria-hidden="true">${Array.from({ length: 36 }, (_, i) =>
    `<i style="left:${(i * 37) % 100}%;background:${farben[i % farben.length]};animation-delay:${(i % 9) * 0.07}s;animation-duration:${1.4 + (i % 5) * 0.2}s"></i>`).join("")}</div>`;
}

function ergebnisView() {
  const x = s(), n = x.fragen.length, richtig = x.bewertungen.filter((b) => b?.korrekt === true).length, q = richtig / n;
  const falsch = x.bewertungen.filter((b) => b?.korrekt === false).length;
  const unbewertet = x.bewertungen.filter((b) => b?.korrekt === null).length;
  const lob = q >= 0.9 ? "Hervorragend – klausurreif!" : q >= 0.7 ? "Gut gemacht! Sieh dir die falschen Aufgaben noch einmal an."
    : q >= 0.5 ? "Solide Basis – hier lohnt sich noch eine Runde." : "Dranbleiben! Lies die Erklärungen zu den falschen Aufgaben.";
  const dauer = Math.round(((x.ende || Date.now()) - x.start) / 1000);
  const feiern = q >= 0.8 && !x.gefeiert;
  x.gefeiert = true;
  return `<div class="vollbild">
    ${feiern ? konfetti() : ""}
    <div class="vb-kopf"><button class="rund" data-a="beenden" aria-label="Schließen">${ic("kreuz")}</button><div class="mitte">Auswertung</div><span class="zaehler"></span></div>
    <div class="vb-inhalt">
      <div class="zentriert">
        <div class="ring" style="--p:${Math.round(q * 100)};--farbe:${farbe(q)}"><div>${Math.round(q * 100)} %</div></div>
        <div class="ergebnis-titel">${q >= 0.9 ? "Hervorragend! 🎉" : q >= 0.7 ? "Gut gemacht! 💪" : q >= 0.5 ? "Solide! 👍" : "Weiter so! 📚"}</div>
        <div class="sub" style="font-size:15px">${lob}</div>
      </div>
      <div class="statistik-reihe" style="margin-top:18px">
        <div class="stat-kachel"><div class="zahl" style="color:var(--ok)">${richtig}</div><div class="lbl">richtig</div></div>
        <div class="stat-kachel"><div class="zahl" style="color:var(--err)">${falsch}</div><div class="lbl">falsch</div></div>
        <div class="stat-kachel"><div class="zahl">${Math.floor(dauer / 60)}:${String(dauer % 60).padStart(2, "0")}</div><div class="lbl">Minuten</div></div>
      </div>
      ${unbewertet ? `<div class="hinweis-box" style="margin-top:14px"><span class="symbol" style="background:var(--warn-weak);color:var(--warn)">${ic("stift")}</span><div><b>${unbewertet} Frage-Antwort-Aufgabe${unbewertet > 1 ? "n" : ""} noch selbst bewerten</b><div class="sub">Antippen, mit der Musterantwort vergleichen und „Gewusst“ oder „Nicht gewusst“ wählen.</div></div></div>` : ""}
      <div class="gruppe"><div class="gruppe-titel">Aufgaben – antippen für die Lösung</div><div class="liste">
        ${x.fragen.map((f, i) => {
          const ok = x.bewertungen[i]?.korrekt;
          const zeichen = ok === null ? "?" : ok ? ic("haken", "klein") : ic("kreuz", "klein"), hg = ok === null ? "var(--warn)" : ok ? "var(--ok)" : "var(--err)";
          return `<button class="zeile" data-a="review" data-v="${i}"><span style="width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;background:${hg};flex:none">${zeichen}</span>
            <span class="grow"><div style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:15px">${esc(f.text)}</div>
            <div class="sub">${esc(THEMA[f.thema].titel)} · ${typBezeichnung(f)}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>`;
        }).join("")}
      </div></div>
    </div>
    <div class="vb-fuss"><div class="reihe">
      <button class="knopf zweit" data-a="beenden">Fertig</button>
      <button class="knopf" data-a="nochmal">${ic("wiederholen")} ${x.modus === "klausur" ? "Neue Klausur" : "Neue Runde"}</button>
    </div></div>
  </div>`;
}

function reviewView() {
  const x = s(), i = x.review;
  return `<div class="vollbild">
    <div class="vb-kopf"><button class="link" data-a="reviewZurueck" style="display:inline-flex;align-items:center;gap:2px">${ic("zurueck", "klein")} Übersicht</button><div class="mitte">Aufgabe ${i + 1} von ${x.fragen.length}</div><span class="zaehler"></span></div>
    <div class="vb-inhalt">${frageView(x.fragen[i], x.antworten[i], x.bewertungen[i], true)}</div>
    <div class="vb-fuss">
    ${x.bewertungen[i]?.korrekt === null ? `<div class="reihe" style="margin-bottom:10px"><button class="knopf rot" data-a="selbstReview" data-v="0">${ic("kreuz")} Nicht gewusst</button><button class="knopf gruen" data-a="selbstReview" data-v="1">${ic("haken")} Gewusst</button></div>` : ""}
    <div class="reihe">
      <button class="knopf zweit" data-a="reviewNav" data-v="-1" ${i === 0 ? "disabled" : ""}>${ic("zurueck")} Vorherige</button>
      <button class="knopf zweit" data-a="reviewNav" data-v="1" ${i === x.fragen.length - 1 ? "disabled" : ""}>Nächste ${ic("pfeil")}</button>
    </div></div></div>`;
}

// ======================= Render: Lernkarten =======================
const deckFuss = (um) => um
  ? `<button class="knopf rot" data-a="karte" data-v="0">${ic("wiederholen")} Nochmal</button><button class="knopf gruen" data-a="karte" data-v="1">${ic("haken")} Gewusst</button>`
  : `<button class="knopf zweit" data-a="umdrehen">Umdrehen</button>`;

function deckView() {
  const d = state.deck;
  if (d.index >= d.karten.length) {
    return `<div class="vollbild">${d.gewusst / d.karten.length >= 0.8 ? konfetti() : ""}<div class="vb-kopf"><button class="rund" data-a="deckZu" aria-label="Schließen">${ic("kreuz")}</button><div class="mitte">Lernkarten</div><span class="zaehler"></span></div>
      <div class="vb-inhalt zentriert" style="display:flex;flex-direction:column;justify-content:center">
        <div style="font-size:64px">🎉</div><div class="ergebnis-titel">Stapel geschafft!</div><p class="sub" style="font-size:15px">${d.gewusst} von ${d.karten.length} Karten gewusst.</p>
        <button class="knopf" data-a="deckZu" style="max-width:300px;margin:12px auto">Fertig</button></div></div>`;
  }
  const k = d.karten[d.index];
  return `<div class="vollbild">
    <div class="vb-kopf"><button class="rund" data-a="deckZu" aria-label="Beenden">${ic("kreuz")}</button><div class="sitzung-fortschritt"><span style="width:${(d.index / d.karten.length) * 100}%"></span></div><span class="zaehler">${d.index + 1}/${d.karten.length}</span></div>
    <div class="vb-inhalt" style="display:flex;flex-direction:column">
      <div class="karte-buehne"><div class="karte ${d.um ? "um" : ""}" data-a="umdrehen">
        <div class="seite"><div class="klein">${esc(THEMA[k.thema].titel)}</div><div class="${k.normen ? "frage-gross" : "gross"}">${esc(k.vorne)}</div><div class="sub" style="color:var(--text3);margin-top:24px">Tippen zum Umdrehen</div></div>
        <div class="seite rueck"><div class="klein">${esc(k.vorne)}</div><div class="mittel-t ${k.normen ? "links" : ""}">${esc(k.hinten)}</div>
          ${k.normen?.length ? `<div class="sub" style="margin-top:12px">${k.normen.map((r) => norm(r)?.label).filter(Boolean).map(esc).join(" · ")}</div>` : ""}</div>
      </div></div>
    </div>
    <div class="vb-fuss"><div class="reihe">${deckFuss(d.um)}</div></div></div>`;
}

// ======================= Render: Sheets =======================
function sheetView() {
  const sh = state.sheet;
  let inhalt = "", titel = "", halb = false, links = "Schließen";
  if (sh.art === "konto") {
    titel = "Konto wählen"; links = "Abbrechen";
    inhalt = `<div class="suche"><input type="search" id="kontoSuche" data-fokus="kontoSuche" placeholder="Konto suchen, z. B. Vorsteuer" autocomplete="off" value="${esc(state.kontoSuche)}"></div>
      <div class="vb-inhalt" id="kontoListe" style="padding-top:0">${kontoListe("kontoGewaehlt")}</div>`;
    return `<div class="sheet-hg" data-a="sheetZu"><div class="sheet" data-stop="1"><div class="vb-kopf"><button class="link" data-a="sheetZu">${links}</button><div class="mitte">${titel}</div><span class="link"></span></div>${inhalt}</div></div>`;
  }
  if (sh.art === "kontoDetail") {
    const k = K(sh.konto);
    titel = k.kurz;
    inhalt = `<div class="liste">
        <div class="zeile"><span class="grow">Kontenklasse</span><span class="sub">${k.klasse === 9 ? "Abschlusskonto" : k.klasse}</span></div>
        <div class="zeile"><span class="grow">Kontoart</span><span class="badge art-${k.art}">${esc(k.artName)}</span></div></div>
      <div class="gruppe"><div class="gruppe-titel">T-Konto</div><div class="liste">${tKonto(k)}</div></div>
      <div class="gruppe"><div class="gruppe-titel">Buchungsregel</div><div class="liste"><div class="zeile"><span class="grow">${esc(k.regel)}${k.hinweis ? `<div class="sub" style="margin-top:6px">${esc(k.hinweis)}</div>` : ""}</span></div></div></div>`;
  } else if (sh.art === "norm") {
    const n = norm(sh.ref);
    titel = n.label;
    inhalt = `<div class="liste"><div class="zeile"><span class="grow">${n.titel ? `<b>${esc(n.titel)}</b>` : ""}
      ${n.absaetze.map((a) => `<p style="margin:8px 0;line-height:1.55">${a.abs ? `<b>(${a.abs})</b> ` : ""}${esc(a.text).replace(/\n/g, "<br>")}</p>`).join("")}</span></div></div>
      <div class="gruppe-fuss">${n.auszug ? "Auszug – weitere Absätze bzw. Nummern sind nicht abgedruckt. " : ""}Quelle: www.gesetze-im-internet.de</div>`;
  } else if (sh.art === "punktesammler") {
    titel = "Punkte sammeln";
    inhalt = `<div class="gruppe-fuss" style="margin:4px 4px 12px">Diese Sätze werden in der Klausur fast wörtlich verlangt – auswendig lernen.</div>
      ${PUNKTESAMMLER.map((p) => `<div class="punkte-karte"><div class="punkte-titel">🎯 ${esc(p.titel)}</div>
        <div class="punkte-satz">${esc(p.satz)}</div>
        <div class="punkte-fuss">${p.punkte} von 60 Punkten · Klausur GS I</div></div>`).join("")}`;
  } else if (sh.art === "sync") {
    titel = "Geräte synchronisieren";
    inhalt = syncView();
  } else if (sh.art === "merksaetze") {
    titel = "Merksätze";
    inhalt = `<div class="liste">${MERKSAETZE.map(([t, x]) => `<div class="zeile"><span class="grow"><b>${esc(t)}</b><div class="sub">${esc(x)}</div></span></div>`).join("")}</div>`;
  } else if (sh.art === "raster") {
    titel = "Aufgabenübersicht"; halb = true;
    const x = s();
    inhalt = `<div class="raster">${x.fragen.map((f, i) => `<button data-a="springe" data-v="${i}" class="${istLeer(f, x.antworten[i]) ? "" : "bearbeitet"} ${i === x.index ? "aktuell" : ""}">${i + 1}</button>`).join("")}</div>
      <div class="gruppe-fuss" style="padding-bottom:16px">${x.antworten.filter((a, i) => !istLeer(x.fragen[i], a)).length} von ${x.fragen.length} bearbeitet</div>`;
  } else if (sh.art === "einstellungen") {
    titel = "Einstellungen";
    inhalt = `
      <div class="gruppe" style="margin-top:4px"><div class="gruppe-titel">Tagesziel</div><div class="liste"><div class="zeile" style="flex-wrap:wrap">
        <span class="grow sub" style="min-width:100%">Wie viele Aufgaben möchtest du pro Tag schaffen?</span>
        <span class="chip-reihe">${[10, 20, 30, 50].map((z) => `<button class="chip ${state.ziel === z ? "aktiv" : ""}" data-a="ziel" data-v="${z}">${z} Aufgaben</button>`).join("")}</span></div></div></div>
      <div class="gruppe"><div class="gruppe-titel">Darstellung</div><div class="modus-karte"><div class="segment">
        ${[["system", "System"], ["light", "Hell"], ["dark", "Dunkel"]].map(([id, t]) => `<button data-a="design" data-v="${id}" class="${state.design === id ? "aktiv" : ""}">${t}</button>`).join("")}</div></div></div>
      ${syncVerfuegbar() ? `<div class="gruppe"><div class="gruppe-titel">Mehrere Geräte</div><div class="liste"><button class="zeile" data-a="syncOeffnen"><span class="symbol">${ic("wechsel")}</span>
        <span class="grow"><b>Geräte synchronisieren</b><div class="sub">${esc(syncStatusText())}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button></div></div>` : ""}
      <div class="gruppe"><div class="gruppe-titel">So funktioniert's</div><div class="liste">
        ${[
          ["🧠", "Lernkartei: Jede Aufgabe kommt nach 1, 3, 7, 16 und 35 Tagen wieder. Fehler kommen am nächsten Tag zurück."],
          ["🔍", "Suche auf der Startseite findet Themen, Aufgaben, Gesetzestexte und Konten über alle Module."],
          ["✍️", "Buchungssätze: Konten über „Konto wählen“ suchen, Betrag eintippen. Die Reihenfolge der Positionen ist egal."],
          ["🎲", `Generierte Aufgaben haben bei jedem Durchlauf neue Zahlen – insgesamt ${ALLE.length} Aufgabentypen.`],
          ["⌨️", "Am Computer: Zifferntasten wählen Antworten, Enter prüft bzw. geht weiter."],
          ["✈️", syncVerfuegbar() ? "Funktioniert offline. Mit „Geräte synchronisieren“ gleicht sich der Lernstand zwischen deinen Geräten ab, sobald Internet da ist." : "Funktioniert offline. Der Lernfortschritt bleibt nur auf diesem Gerät."],
          ["📊", `Beim Start wird anonym gezählt, ob die App im Browser oder vom Home-Bildschirm geöffnet wurde (GoatCounter, ohne Cookies). ${syncVerfuegbar() ? "Lernergebnisse werden nur übertragen, wenn du die Synchronisierung einschaltest – ohne Namen oder E-Mail, gespeichert in der EU." : "Lernergebnisse werden nie übertragen."}`],
        ].map(([i, t]) => `<div class="zeile"><span style="font-size:20px">${i}</span><span class="grow" style="font-size:14.5px">${t}</span></div>`).join("")}
      </div></div>
      <div class="gruppe"><div class="gruppe-titel">Hinweis</div><div class="liste"><div class="zeile"><span class="grow sub">Finanzwirt-Trainer – inoffizielle Lernhilfe für das Studium zum Diplom-Finanzwirt. Inhalte orientiert am Skript „Bilanzsteuerrecht Grundstudium I, Teil I“ mit Übungen sowie am Unterrichtsskript Öffentliches Recht GS I, den Altklausuren und den Gesetzestexten (Stand GG 22.03.2025, BWahlG 03.07.2026). Ohne Gewähr – maßgeblich sind Skript, Gesetz und Lehrveranstaltung.</span></div>
        <div class="zeile"><span class="grow">Version</span><span class="sub">${VERSION}</span></div></div></div>
      <div class="liste" style="margin-bottom:24px"><button class="zeile" data-a="willkommenZeigen" style="justify-content:center;color:var(--accent);font-weight:600">Einführung erneut anzeigen</button>
        <button class="zeile" data-a="reset" style="justify-content:center;color:var(--err);font-weight:600">Gesamten Fortschritt löschen</button></div>`;
  } else if (sh.art === "willkommen") {
    halb = true; titel = ""; links = "Später";
    inhalt = `<div class="willkommen">
      <div class="logo">${ic("hut")}</div>
      <h2>Willkommen beim Finanzwirt-Trainer</h2>
      <div class="sub" style="font-size:15px">Deine Lern-App für das Studium zum Diplom-Finanzwirt – kostenlos und offline.</div>
      <div class="vorteile">
        <div><span class="symbol">${ic("ziel")}</span><div><b>Klausurnah üben</b><span class="sub">Buchungssätze, Frage-Antwort, Übertragungsaufgaben – mit Musterlösung.</span></div></div>
        <div><span class="symbol">${ic("gehirn")}</span><div><b>Nichts mehr vergessen</b><span class="sub">Die Lernkartei holt jede Aufgabe im richtigen Abstand zurück.</span></div></div>
        <div><span class="symbol">${ic("flamme")}</span><div><b>Dranbleiben</b><span class="sub">Tagesziel und Lernserie zeigen dir, wie gut du im Plan bist.</span></div></div>
      </div>
      <div class="gruppe-titel" style="justify-content:center">Womit möchtest du starten?</div>
      <div class="modul-grid" style="margin-bottom:20px">${aktiveModule().map((m) => `<button class="modul-kachel" style="--mc:${m.farbe};min-height:0" data-a="willkommenModul" data-v="${m.id}">
        <span class="m-icon">${ic(m.icon)}</span><span><div class="m-titel">${m.titel}</div><div class="m-unter">${esc(m.unter)}</div></span></button>`).join("")}</div>
    </div>`;
  }
  return `<div class="sheet-hg" data-a="sheetZu"><div class="sheet ${halb ? "halb" : ""}" data-stop="1">
    <div class="vb-kopf"><button class="link" data-a="sheetZu">${links}</button><div class="mitte">${esc(titel)}</div><span class="link"></span></div>
    <div class="vb-inhalt">${inhalt}</div></div></div>`;
}

function kontoListe(aktion) {
  const q = norma(state.kontoSuche.trim());
  const passt = (k) => !q || norma(k.name).includes(q) || norma(k.kurz).includes(q);
  const html = KLASSEN.map((kl) => {
    const ks = kontenInKlasse(kl).filter(passt);
    if (!ks.length) return "";
    return `<div class="gruppe"><div class="gruppe-titel">${KLASSEN_TITEL[kl]}</div><div class="liste">
      ${ks.map((k) => `<button class="zeile" data-a="${aktion}" data-v="${k.id}"><span class="grow">${esc(k.name)}</span><span class="badge art-${k.art}">${k.artKurz}</span>${aktion === "kontoDetail" ? `<span class="chev">${ic("pfeil", "klein")}</span>` : ""}</button>`).join("")}</div></div>`;
  }).join("");
  return html || `<div class="leer-zustand">${ic("suche")}<div><b>Kein Konto gefunden</b></div></div>`;
}

function tKonto(k) {
  let soll, haben;
  switch (k.art) {
    case "aktiv": soll = ["Anfangsbestand", "Zugänge"]; haben = ["Abgänge", "Schlussbestand (Saldo → SBK)"]; break;
    case "passiv": case "eigenkapital": soll = ["Abgänge", "Schlussbestand (Saldo → SBK)"]; haben = ["Anfangsbestand", "Zugänge"]; break;
    case "aufwand":
      if (k.hinweis?.includes("im Haben")) { soll = ["Saldo → WEK"]; haben = ["Minderungen (z. B. Skonto, Bonus)"]; }
      else { soll = ["Aufwendungen"]; haben = ["Saldo → GuV / WEK"]; }
      break;
    case "ertrag":
      if (k.hinweis?.includes("im Soll")) { soll = ["Erlösminderungen"]; haben = ["Saldo → WVK"]; }
      else { soll = ["Saldo → GuV"]; haben = ["Erträge"]; }
      break;
    case "privat": [soll, haben] = k.id === "privatentnahmen" ? [["Entnahmen"], ["Saldo → Eigenkapital"]] : [["Saldo → Eigenkapital"], ["Einlagen"]]; break;
    case "erfolg": soll = ["Bestandsminderung"]; haben = ["Bestandsmehrung"]; break;
    default:
      if (k.id === "ebk") { soll = ["Anfangsbestände Passiva"]; haben = ["Anfangsbestände Aktiva"]; }
      else if (k.id === "sbk") { soll = ["Schlussbestände Aktiva"]; haben = ["Schlussbestände Passiva"]; }
      else { soll = ["Aufwendungen", "(Gewinn → EK)"]; haben = ["Erträge", "(Verlust → EK)"]; }
  }
  return `<div class="tkonto"><div class="name">${esc(k.kurz)}</div><div class="t">
    <div><div class="kopf">Soll</div>${soll.map((x) => `<div>${esc(x)}</div>`).join("")}</div>
    <div><div class="kopf">Haben</div>${haben.map((x) => `<div>${esc(x)}</div>`).join("")}</div></div></div>`;
}

const MERKSAETZE = [
  ["Soll an Haben", "Zuerst das Konto der Sollbuchung, dann mit „an“ das Konto der Habenbuchung."],
  ["Keine Buchung ohne Gegenbuchung", "Jeder Geschäftsvorfall berührt mindestens zwei Konten; Summe Soll = Summe Haben."],
  ["Vier Fragen vor jeder Buchung", "1. Welche Konten? 2. Aktiv oder Passiv (Aufwand/Ertrag)? 3. Zu- oder Abgang? 4. Soll oder Haben?"],
  ["Aktivkonten", "Anfangsbestand und Zugänge im Soll, Abgänge im Haben."],
  ["Passivkonten", "Anfangsbestand und Zugänge im Haben, Abgänge im Soll."],
  ["Aufwand / Ertrag", "Unterkonten des Eigenkapitals: Aufwand mindert EK → Soll; Ertrag mehrt EK → Haben."],
  ["Entnahmen / Einlagen", "Privatentnahmen im Soll, Privateinlagen im Haben – erfolgsneutral."],
  ["Nettomethode", "Netto auf das Sachkonto, USt bzw. Vorsteuer auf eigene Konten, Brutto auf Geld-/Personenkonto."],
  ["Belasten / Gutschreiben", "Belasten = Soll (Lastschrift), Gutschreiben = Haben (Gutschrift)."],
  ["Saldo", "Steht auf der kleineren Seite und wird nach der größeren Seite benannt."],
  ["USt herausrechnen", "19 %: Brutto × 19/119 · 7 %: Brutto × 7/107"],
  ["Skonto mit USt", "Skonto netto auf Skontokonto, Skonto × USt-Satz als Steuerkorrektur (§ 17 UStG)."],
];

// ======================= Ereignisse =======================
function toast(text) {
  document.querySelector(".toast")?.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function zeile(id) {
  return aktAntwort().zeilen.find((z) => String(z.id) === String(id));
}

function fachSetzen(v) {
  if (!MODUL[v] || MODUL[v].bald) return;
  if (state.fach !== v) { state.kartenThemen = new Set(); state.themenFilter = ""; state.normSuche = ""; state.kontoSuche = ""; }
  state.fach = v;
  schreib("bsr.fach", v);
}

const AKTIONEN = {
  tab: (v) => { state.tab = v; state.sheet = null; render(); window.scrollTo(0, 0); },
  einstellungen: () => { state.sheet = { art: "einstellungen" }; render(); },
  syncOeffnen: () => { state.sheet = { art: "sync" }; render(); },
  syncErstellen: () => syncStarten(neuerCode(), true),
  syncVerbinden: () => {
    const c = codeNormal(state.syncEingabe);
    if (!codeGueltig(c)) { toast("Der Code hat 16 Zeichen, z. B. ABCD-EFGH-JKLM-NPQR."); return; }
    if (confirm("Mit diesem Code verbinden? Dein Lernstand auf diesem Gerät wird mit dem der anderen Geräte zusammengeführt.")) syncStarten(c, false);
  },
  syncJetzt: async () => { await syncJetzt(); toast(syncZustand.fehler ? syncStatusText() : "Abgeglichen."); render(); },
  syncQR: () => { state.syncQR = !state.syncQR; render(); },
  syncTrennen: () => {
    if (!confirm("Dieses Gerät trennen? Der Lernstand bleibt hier und auf den anderen Geräten erhalten, wird aber nicht mehr abgeglichen.")) return;
    syncLokal = { ...syncLokal, getrennt: true }; syncMerken(); render(); toast("Gerät getrennt.");
  },
  syncLoeschen: async () => {
    if (!confirm("Gespeicherten Lernstand vom Server löschen und dieses Gerät trennen? Trenne danach auch deine anderen Geräte – sonst laden sie ihren Stand beim nächsten Abgleich wieder hoch.")) return;
    try { await SERVER.loeschen(syncLokal.code); } catch (_) { toast("Server nicht erreichbar – bitte später erneut versuchen."); return; }
    syncLokal = null; syncMerken(); render(); toast("Vom Server gelöscht.");
  },
  info: () => { state.sheet = { art: "einstellungen" }; render(); },
  modul: (v) => { fachSetzen(v); state.sheet = null; state.suche = ""; state.tab = "lernen"; render(); window.scrollTo(0, 0); },
  fach: (v) => { fachSetzen(v); render(); },
  bald: (v) => toast(`${MODUL[v].titel} kommt bald – du wirst es hier als Erstes sehen.`),
  willkommenModul: (v) => { fachSetzen(v); schreib("bsr.willkommen", "1"); state.sheet = null; state.tab = "lernen"; render(); },
  willkommenZeigen: () => { state.sheet = { art: "willkommen" }; render(); },
  ziel: (v) => { state.ziel = Number(v); schreib("bsr.ziel", v); render(); },
  design: (v) => { state.design = v; schreib("bsr.design", v); render(); },
  hinweisWeg: () => { state.hinweisWeg = true; schreib("bsr.hinweisWeg", "1"); render(); },
  zuModulen: () => document.querySelector(".modul-grid")?.scrollIntoView({ behavior: "smooth", block: "start" }),
  sucheLeeren: () => { state.suche = ""; render(); document.getElementById("homeSuche")?.focus(); },
  bilrAnsicht: (v) => { state.bilrAnsicht = v === "gesetze" ? "gesetze" : "konten"; render(); },
  oerModus: (v) => {
    state.oerModus = v === "mc" ? "mc" : "qa";
    schreib("bsr.oerModus", state.oerModus);
    render();
  },
  schnell: (v, el) => {
    state.tab = "lernen";
    const alle = pruefungsThemen(state.fach).map((t) => t.id);
    const basis = { modus: "uebung", fach: state.fach };
    if (v === "buchung") starte({ ...basis, themen: alle, nurBuchung: true });
    else if (["qa", "uebertragung", "rechnen", "fall"].includes(v)) starte({ ...basis, themen: alle, filter: v });
    else if (v === "alles") starte({ ...basis, themen: alle });
    else starte({ ...basis, themen: [el.dataset.t] });
  },
  thema: (v) => { fachSetzen(THEMA[v].fach); if (state.tab === "start") { state.tab = "lernen"; state.suche = ""; } starte({ modus: "uebung", fach: THEMA[v].fach, themen: [v] }); },
  einzeln: (v) => { const t = ALLE.find((x) => x.id === v).thema; fachSetzen(THEMA[t].fach); state.tab = "lernen"; state.suche = ""; starte({ modus: "uebung", fach: THEMA[t].fach, themen: [t], ids: [v], einzeln: true }); },
  weiterlernen: () => { const z = stat.zuletzt; fachSetzen(z.fach); state.tab = "lernen"; starte({ modus: "uebung", fach: z.fach, themen: z.themen, nurBuchung: z.nurBuchung, filter: z.filter }); },
  beenden: () => {
    const x = s();
    if (x && !x.beendet && x.fragen.length && x.bewertungen.some((b) => !b) && (x.modus === "klausur" || x.index > 0 || x.bewertungen[0])) {
      const frage = x.modus === "klausur" ? "Klausur abbrechen? Sie wird nicht gewertet." : "Übung beenden? Bereits geprüfte Aufgaben bleiben in der Statistik.";
      if (!confirm(frage)) return;
    }
    state.sitzung = null; state.sheet = null; render();
  },
  pruefen,
  weiter,
  zurueck: () => { if (s().index > 0) { s().index -= 1; render(); scrollOben(); } },
  abgeben: () => {
    const x = s(), offen = x.antworten.filter((a, i) => istLeer(x.fragen[i], a)).length;
    if (confirm(`Klausur abgeben?${offen ? `\n${offen} Aufgabe(n) noch unbearbeitet.` : ""}`)) abgeben();
  },
  wiederholen: (v) => {
    const alle = v === "alle";
    if (MODUL[v]) { fachSetzen(v); state.tab = "lernen"; }
    const ids = faelligVon(alle ? null : state.fach).slice(0, PRO_WIEDERHOLUNG);
    if (!ids.length) { state.sitzung = null; toast("Gerade ist nichts fällig – super!"); render(); return; }
    starte({ modus: "uebung", fach: state.fach, themen: themenFuer(state.fach).map((t) => t.id), ids, wiederholung: alle ? "alle" : "fach" });
  },
  nochmal: () => {
    const x = s();
    if (x.wiederholung) return AKTIONEN.wiederholen(x.wiederholung === "alle" ? "alle" : "");
    starte({ modus: x.modus, fach: x.fach, themen: x.themen, nurBuchung: x.nurBuchung, filter: x.filter, ids: x.einzeln ? x.ids : undefined, einzeln: x.einzeln, anzahl: x.fragen.length, minuten: x.minuten });
  },
  selbst: (v) => selbstBewerten(s().index, v === "1"),
  korrigieren: () => korrigieren(s().review ?? s().index),
  selbstReview: (v) => selbstBewerten(s().review, v === "1"),
  normDetail: (v) => { state.sheet = { art: "norm", ref: v }; render(); },
  review: (v) => { s().review = Number(v); render(); scrollOben(); },
  reviewZurueck: () => { s().review = null; render(); },
  reviewNav: (v) => { s().review += Number(v); render(); scrollOben(); },
  raster: () => { state.sheet = { art: "raster" }; render(); },
  springe: (v) => { s().index = Number(v); state.sheet = null; render(); scrollOben(); },
  option: (v) => {
    const f = aktFrage(), a = aktAntwort(), i = Number(v);
    if (f.richtig.length > 1) a.gewaehlt = a.gewaehlt.includes(i) ? a.gewaehlt.filter((x) => x !== i) : [...a.gewaehlt, i];
    else a.gewaehlt = [i];
    render();
  },
  vorzeichen: () => {
    const a = aktAntwort(), t = a.text.trim();
    a.text = t.startsWith("-") || t.startsWith("−") ? t.slice(1) : "-" + t;
    render();
    document.getElementById("zahl")?.focus();
  },
  zeileNeu: (v) => {
    const z = neueZeile(v);
    aktAntwort().zeilen.push(z);
    state.sheet = { art: "konto", zeile: z.id };
    state.kontoSuche = "";
    render();
  },
  zeileWeg: (v, el) => {
    const a = aktAntwort();
    a.zeilen = a.zeilen.filter((z) => String(z.id) !== String(el.dataset.z));
    render();
  },
  kontoWahl: (v, el) => { state.sheet = { art: "konto", zeile: el.dataset.z }; state.kontoSuche = ""; render(); },
  kontoGewaehlt: (v) => {
    const z = zeile(state.sheet.zeile);
    if (z) z.konto = v;
    const id = state.sheet.zeile;
    state.sheet = null;
    render();
    const inp = document.querySelector(`.betrag[data-z="${id}"]`);
    if (inp && !inp.value) inp.focus();
  },
  sheetZu: () => {
    if (state.sheet?.art === "willkommen") schreib("bsr.willkommen", "1");
    if (state.sheet?.art === "konto" && state.sitzung) {
      // Abbrechen bei neuer, noch leerer Zeile: Zeile wieder entfernen
      const a = aktAntwort(), z = a.zeilen.find((x) => String(x.id) === String(state.sheet.zeile));
      if (z && !z.konto && !z.betrag && a.zeilen.filter((x) => x.seite === z.seite).length > 1) a.zeilen = a.zeilen.filter((x) => x !== z);
    }
    state.sheet = null; render();
  },
  kontoDetail: (v) => { state.sheet = { art: "kontoDetail", konto: v }; render(); },
  merksaetze: () => { state.sheet = { art: "merksaetze" }; render(); },
  punktesammler: () => { state.sheet = { art: "punktesammler" }; render(); },
  anzahl: (v) => { state.klausurAnzahl = Math.min(60, Math.max(5, state.klausurAnzahl + Number(v))); render(); },
  minuten: (v) => { state.klausurMinuten = Number(v); render(); },
  klausurStart: () => starte({ modus: "klausur", fach: state.fach, anzahl: state.klausurAnzahl, minuten: state.klausurMinuten || null }),
  kartenThema: (v) => { state.kartenThemen.has(v) ? state.kartenThemen.delete(v) : state.kartenThemen.add(v); render(); },
  kartenAlle: () => { state.kartenThemen = new Set(themenFuer(state.fach).map((t) => t.id).filter((id) => kartenFuer(state.fach).some((k) => k.thema === id))); render(); },
  kartenKeine: () => { state.kartenThemen = new Set(); render(); },
  deck: (v) => {
    const r = new Zufall(), gew = new Set(stat.karten);
    const LERNKARTEN = kartenFuer(state.fach);
    const karten = v === "alle" ? LERNKARTEN : v === "offen" ? LERNKARTEN.filter((k) => !gew.has(k.id)) : LERNKARTEN.filter((k) => state.kartenThemen.has(k.thema));
    if (!karten.length) return;
    state.deck = { karten: r.mischen(karten), index: 0, um: false, gewusst: 0 };
    render();
  },
  umdrehen: () => {
    state.deck.um = !state.deck.um;
    // Nur Klassen umschalten, damit die Animation läuft
    document.querySelector(".karte")?.classList.toggle("um", state.deck.um);
    const fuss = document.querySelector(".vb-fuss .reihe");
    if (fuss) fuss.innerHTML = deckFuss(state.deck.um);
  },
  karte: (v) => {
    const d = state.deck, k = d.karten[d.index];
    const gew = new Set(stat.karten);
    if (v === "1") { d.gewusst += 1; gew.add(k.id); } else gew.delete(k.id);
    stat.karten = [...gew];
    speichern();
    d.index += 1; d.um = false;
    render();
  },
  deckZu: () => { state.deck = null; render(); },
  reset: () => {
    const verbunden = syncVerbunden();
    if (!confirm(`Gesamten Fortschritt löschen? Das kann nicht rückgängig gemacht werden.${verbunden ? "\n\nDieses Gerät wird dabei von der Synchronisierung getrennt; auf deinen anderen Geräten bleibt der Lernstand erhalten." : ""}`)) return;
    if (verbunden) { syncLokal = null; syncMerken(); } // sonst würde der Abgleich das Löschen als „Minus“ auf alle Geräte übertragen
    stat = LEER(); speichernLokal(); state.sheet = null; render(); toast("Fortschritt gelöscht.");
  },
};

app.addEventListener("click", (e) => {
  const el = e.target.closest("[data-a]");
  if (!el || el.disabled) return;
  // Klick ins Sheet selbst soll den Hintergrund-Handler nicht auslösen
  if (el.dataset.a === "sheetZu" && el.classList.contains("sheet-hg") && e.target.closest("[data-stop]")) return;
  const f = AKTIONEN[el.dataset.a];
  if (f) f(el.dataset.v, el);
});

app.addEventListener("input", (e) => {
  const t = e.target;
  if (t.classList.contains("betrag")) {
    const z = zeile(t.dataset.z);
    if (z) z.betrag = t.value;
    const sum = document.getElementById("summen");
    if (sum) sum.innerHTML = summenView(aktAntwort().zeilen);
    aktualisierePruefen();
  } else if (t.id === "zahl") {
    aktAntwort().text = t.value;
    aktualisierePruefen();
  } else if (t.id === "offen") {
    aktAntwort().text = t.value;
    const k = document.getElementById("offenKnopf");
    if (k) k.textContent = offenKnopfText(aktFrage(), aktAntwort());
  } else if (t.id === "homeSuche") {
    state.suche = t.value;
    const leer = !t.value.trim();
    document.getElementById("sucheErgebnis").innerHTML = leer ? "" : suchErgebnisse(t.value);
    document.getElementById("startRest").classList.toggle("versteckt", !leer);
    document.querySelector(".suchfeld .leeren")?.classList.toggle("versteckt", !t.value);
  } else if (t.id === "themenFilter") {
    state.themenFilter = t.value;
    document.getElementById("themenListe").innerHTML = themenListe();
  } else if (t.id === "normSuche") {
    state.normSuche = t.value;
    document.getElementById("normListe").innerHTML = normenListe();
  } else if (t.id === "kontoSuche") {
    state.kontoSuche = t.value;
    document.getElementById("kontoListe").innerHTML = kontoListe("kontoGewaehlt");
  } else if (t.id === "syncCode") {
    state.syncEingabe = t.value;
  } else if (t.id === "kontoTabSuche") {
    state.kontoSuche = t.value;
    document.getElementById("kontoTabListe").innerHTML = kontoListe("kontoDetail");
  }
});

app.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (e.target.id === "zahl" || e.target.classList.contains("betrag")) {
    e.target.blur();
    const k = document.getElementById("pruefen");
    if (k && !k.disabled && e.target.id === "zahl") pruefen();
  }
  if (e.target.id === "kontoSuche") {
    const erster = document.querySelector('#kontoListe [data-a="kontoGewaehlt"]');
    if (erster) erster.click();
  }
  if (e.target.id === "homeSuche") e.target.blur();
});

// Tastatur am Computer: Ziffern wählen Antworten, Enter prüft bzw. geht weiter, Leertaste dreht Karten um
document.addEventListener("keydown", (e) => {
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === "Escape") { ebeneZurueck(); return; }
  if (state.sheet) return;
  if (state.deck) {
    if (state.deck.index >= state.deck.karten.length) return;
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!state.deck.um) AKTIONEN.umdrehen(); else AKTIONEN.karte("1"); }
    else if (state.deck.um && (e.key === "1" || e.key === "2")) AKTIONEN.karte(e.key === "2" ? "1" : "0");
    return;
  }
  const x = s();
  if (!x || x.beendet) return;
  const f = aktFrage(), b = x.modus === "klausur" ? null : x.bewertungen[x.index];
  if (/^[1-9]$/.test(e.key) && f.typ === "auswahl" && !b && Number(e.key) <= f.optionen.length) { AKTIONEN.option(String(Number(e.key) - 1)); return; }
  if (e.key === "Enter") {
    e.preventDefault();
    if (x.modus === "klausur") { if (x.index < x.fragen.length - 1) weiter(); return; }
    if (f.typ === "offen" && !b && x.aufgedeckt[x.index]) return;
    if (b) weiter(); else pruefen();
  }
});

function aktualisierePruefen() {
  const k = document.getElementById("pruefen");
  if (k) k.disabled = istLeer(aktFrage(), aktAntwort());
}

// ======================= Installation (Android/Chrome) =======================
let installEvent = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  installEvent = e;
  if (!state.sitzung && state.tab === "start" && !state.suche) render();
});
window.addEventListener("appinstalled", () => { installEvent = null; render(); toast("App installiert – du findest sie auf dem Startbildschirm."); });
AKTIONEN.installieren = async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice.catch(() => null);
  installEvent = null;
  render();
};

// ======================= Anonyme Zählung (GoatCounter) =======================
// Gezählt werden nur App-Starts (Browser bzw. Home-Bildschirm) und einmalig pro Gerät
// die erste Nutzung als installierte App. Keine Cookies, keine Lernergebnisse.
// Direkter Zählaufruf (Pixel) statt fremdem Skript – funktioniert auch, wenn gc.zgo.at blockiert ist.
const ZAEHLER = "https://bsrtrainer.goatcounter.com/count";
const INSTALL_FLAG = "bsr.installiert.v2";

function zaehle(ereignis, fertig) {
  if (!navigator.onLine || /^(localhost|127\.)/.test(location.hostname)) return;
  const url = `${ZAEHLER}?p=${encodeURIComponent("/" + ereignis)}&t=${encodeURIComponent(ereignis)}&e=true` +
    `&s=${screen.width},${screen.height},${Math.round(devicePixelRatio || 1)}&rnd=${Math.random().toString(36).slice(2)}`;
  // no-cors: Antwort ist nicht lesbar, aber das Promise erfüllt sich nur, wenn die Anfrage angekommen ist
  fetch(url, { mode: "no-cors", keepalive: true, cache: "no-store" }).then(() => fertig?.()).catch(() => {});
}

let letzterStart = 0;
function zaehleStart() {
  letzterStart = Date.now();
  const app = istStandalone();
  zaehle(app ? "start-app" : "start-browser");
  try {
    if (app && !localStorage.getItem(INSTALL_FLAG)) {
      // Merker erst setzen, wenn die Zählung wirklich angekommen ist
      zaehle("installiert", () => { try { localStorage.setItem(INSTALL_FLAG, "1"); } catch (_) { /* egal */ } });
    }
  } catch (_) { /* privat-Modus */ }
}
// iOS hält Home-Bildschirm-Apps oft im Speicher: Rückkehr nach > 30 min zählt als neuer Start
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && Date.now() - letzterStart > 30 * 60 * 1000) {
    zaehleStart();
    if (!state.sitzung && !state.deck && state.tab === "start" && !state.suche) render(); // Datum/Tagesziel aktualisieren
  }
});

// ======================= Start =======================
const VERSION = "1.0.0";
render();
zaehleStart();
syncBeimStart();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const neu = reg.installing;
        neu?.addEventListener("statechange", () => {
          if (neu.state === "installed" && navigator.serviceWorker.controller) toast("Update geladen – beim nächsten Start aktiv.");
        });
      });
    }).catch(() => {});
  });
}

// Für Tests/Debugging
window.__bsr = { state, KONTEN };
