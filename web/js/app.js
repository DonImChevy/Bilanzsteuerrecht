import * as G from "./geld.js";
import { KONTEN, KLASSEN, KLASSEN_TITEL, kontenInKlasse, K } from "./konten.js";
import { THEMEN, THEMA, themenFuer, pruefungsThemen, gleichbleibendErzeugen, imTeil, themaIn, vorlageIn, NICHT_IN, Zufall, bewerte, leereAntwort, neueZeile, istLeer, loesungText, typBezeichnung } from "./kern.js";
import { fragen, klausur, vorlagenFuer, ALLE, kartenFuer, FALL_IDS, neueZiehung } from "./katalog.js";
import { norm, NORMEN, zitate, saetze } from "./oer/normtext.js";
import { alsMultipleChoice } from "./oer/mc.js";
import { pruefdaten } from "./offen.js";
import { PUNKTESAMMLER } from "./est/punkte.js";
import { PAARE } from "./paare.js";
import { gliederungView } from "./bilr/gliederung.js";
import { r2View } from "./est/r2.js";
import { KOMPAKT, KLAUSURPLAN, kompaktView, bibliothekView, kompaktText, gelesenAnteil, lesezeit, kompaktInline } from "./kompakt.js";
import * as MK from "./meinekarten.js";
import { goodnotesLesen } from "./goodnotes.js";
import { PFADE, pfadSpeicherSetzen, pfadSchluessel, pfadStand, blockStarten, kartenView, blockView, auswerten, schritte, sterneFuer, sterneSpeichern } from "./lernpfad.js";
import { planen, faellige, naechste, INTERVALLE, FAECHER_MAX } from "./wiederholung.js";
import { MODULE, MODUL, aktiveModule, moduleDerRolle, rolleVon } from "./module.js";
import { serie, woche, tagSchluessel } from "./aktivitaet.js";
import { ic } from "./icons.js";
import { syncVerfuegbar, neuerCode, neueGeraeteId, codeNormal, codeGueltig, codeAnzeige, abgleichen, SERVER } from "./sync.js";
import qrcode from "./lib/qrcode.js";
import { taler, talerBuehne, TALER_SPRUECHE, talerOutfitSetzen } from "./maskottchen.js";
import { kasse, kaufbar, outfitVon, artikel, STANDARD } from "./garderobe.js";
import { garderobeView, talerBetrag } from "./garderobeansicht.js";
import { kommende, countdownText, proTag } from "./termine.js";
import { rueckblickView, statistikView, statistikStart } from "./statistikansicht.js";
import { DUELL_ANZAHL, neuerSeed, duellLesen, duellLink, duellSieger, zeitText } from "./duell.js";
import { eintragen, austragen, rangliste, gruppeSchreiben } from "./gruppe.js";
import { NEUIGKEITEN, NEUESTE, ungesehen } from "./neuigkeiten.js";
import { zeitraum, auswerten as zeitraumAuswerten } from "./statistik.js";
import { levelAus, xpGesamt, bonusFuerAntwort, erfolgePruefen, tagesBonus, laengsteSerie, XP } from "./level.js";
import { levelZeile, levelSeite, levelFeier, erfolgBanner, levelStartFeier } from "./levelansicht.js";

// ======================= Speicher =======================
const SPEICHER = "bsr.stat.v1";
// xpBonus/erfolge/rekorde: Levelsystem (level.js), lauf: aktuelle Serien dieses Geräts (nicht synchronisiert)
const LEER = () => ({ proThema: {}, klausuren: [], karten: [], lern: {}, tage: {}, zuletzt: null, pfad: {}, kompakt: {}, meineKarten: {}, einstellungen: null,
  xpBonus: 0, erfolge: {}, rekorde: {}, lauf: { serie: 0, bs: 0 },
  // log: Aufgaben je Tag und Thema [bearbeitet, richtig]; stunden: Aufgaben je Tageszeit; Termine, Garderobe, Profil, Lerngruppe, Duelle
  log: {}, stunden: {}, termine: {}, gekauft: {}, outfit: null, profil: null, gruppe: null, duelle: {} });
function laden() {
  let s = LEER();
  try {
    const x = JSON.parse(localStorage.getItem(SPEICHER));
    if (x && x.proThema) s = { ...LEER(), ...x };
  } catch (_) { /* leer */ }
  // Lernpfad-Fortschritt lag anfangs separat – in den Lernstand übernehmen (damit er synchronisiert wird)
  try {
    const alt = JSON.parse(localStorage.getItem("bsr.pfad.v1") || "null");
    if (alt && !Object.keys(s.pfad || {}).length) { s.pfad = alt; localStorage.removeItem("bsr.pfad.v1"); }
  } catch (_) { /* egal */ }
  return s;
}
let stat = laden();
pfadSpeicherSetzen({ lesen: () => stat.pfad, schreiben: (f) => { stat.pfad = f; speichern(); } });
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
    erfolgePruefen(stat); // Erfolge aus dem zusammengeführten Stand (still)
    speichernLokal();
    einstellungenAnwenden();
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
/** Bearbeitete Aufgabe zählen. Gibt die gewonnenen XP und die aktuelle Serie zurück (für die Rückmeldung). */
function erfasse(frage, korrekt) {
  const vorher = levelJetzt(), basisVorher = xpGesamt(stat).basis, heuteVorher = stat.tage[tagSchluessel()] || 0;
  if (korrekt === true || korrekt === false) {
    const l = (stat.lauf ||= { serie: 0, bs: 0 });
    l.serie = korrekt ? l.serie + 1 : 0;
    if (frage.typ === "buchung") l.bs = korrekt ? l.bs + 1 : 0;
    stat.rekorde = { ...stat.rekorde, serie: Math.max(stat.rekorde?.serie || 0, l.serie), bs: Math.max(stat.rekorde?.bs || 0, l.bs) };
    stat.xpBonus = (stat.xpBonus || 0) + bonusFuerAntwort({ korrekt, typ: frage.typ, serie: l.serie });
  }
  const z = { ...zaehler(frage.thema) };
  z.b += 1;
  if (korrekt) z.r += 1;
  stat.proThema[frage.thema] = z;
  if (korrekt !== null && korrekt !== undefined) stat.lern[frage.id] = planen(stat.lern[frage.id], korrekt);
  const heute = tagSchluessel();
  stat.tage[heute] = (stat.tage[heute] || 0) + 1;
  const tl = ((stat.log ||= {})[heute] ||= {}), alt = tl[frage.thema] || [0, 0];
  tl[frage.thema] = [alt[0] + 1, alt[1] + (korrekt ? 1 : 0)];
  const h = new Date().getHours();
  (stat.stunden ||= {})[h] = (stat.stunden[h] || 0) + 1;
  const momente = h >= 23 || h < 4 ? ["nachteule"] : h >= 4 && h < 7 ? ["fruehaufsteher"] : [];
  belohnen(vorher, momente);
  speichern();
  // XP dieser Aufgabe und Tagesbonus getrennt (Erfolge erscheinen als eigenes Banner)
  const tagBonus = tagesBonus(stat.tage[heute]) - tagesBonus(heuteVorher);
  return { plus: xpGesamt(stat).basis - basisVorher - tagBonus, tagBonus, serie: stat.lauf?.serie || 0 };
}

// ======================= Levelsystem =======================
const levelJetzt = () => levelAus(xpGesamt(stat).gesamt);
/** Nach einer Änderung am Lernstand: Erfolge prüfen, Level-Up und neue Erfolge feiern. */
function belohnen(vorher, momente = []) {
  const neu = erfolgePruefen(stat, momente), nachher = levelJetzt();
  neu.forEach((e) => erfolgMelden(e));
  if (nachher.level > vorher.level) feierZeigen(levelFeier(vorher, nachher), 1300);
}
const bannerWarteschlange = [];
function erfolgMelden(e) {
  bannerWarteschlange.push(e);
  if (bannerWarteschlange.length === 1) setTimeout(naechstesBanner, 900);
}
function naechstesBanner() {
  const e = bannerWarteschlange[0];
  if (!e) return;
  const el = document.createElement("div");
  el.className = "erfolg-banner"; el.setAttribute("role", "status");
  el.innerHTML = erfolgBanner(e);
  el.addEventListener("click", () => { el.remove(); state.sheet = { art: "level" }; render(); });
  document.body.appendChild(el);
  if (navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate([12, 30, 12]);
  setTimeout(() => { el.classList.add("weg"); setTimeout(() => { el.remove(); bannerWarteschlange.shift(); naechstesBanner(); }, 350); }, 3200);
}
/** Feier-Ebene (Level-Up, Start des Levelsystems) – liegt außerhalb von #app und überlebt das Neuzeichnen. */
const feierWarteschlange = [];
function feierZeigen(html, verzoegerung = 0) {
  setTimeout(() => {
    // Läuft schon eine Feier (z. B. Level-Up), kommt die nächste danach
    if (document.querySelector(".lv-feier:not(.weg)")) { feierWarteschlange.push(html); return; }
    const el = document.createElement("div");
    el.className = "lv-feier";
    el.innerHTML = konfetti() + html;
    const zu = () => {
      el.classList.add("weg");
      setTimeout(() => { el.remove(); const n = feierWarteschlange.shift(); if (n) feierZeigen(n, 250); }, 260);
    };
    el.addEventListener("click", (e) => {
      const z = e.target.closest("[data-lv]"), a = z?.dataset.lv;
      if (a === "album") { zu(); state.sheet = { art: "level" }; render(); }
      else if (a === "gehe") { zu(); AKTIONEN[z.dataset.ziel]?.(z.dataset.wert); }
      else if (a === "zu" || e.target === el) zu();
    });
    el.addEventListener("keydown", (e) => { if (e.key === "Escape") zu(); });
    document.body.appendChild(el);
    if (navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate([20, 50, 20, 50, 40]);
    el.querySelector(".knopf[data-lv]")?.focus({ preventScroll: true });
  }, verzoegerung);
}
// ======================= Neuigkeiten nach einem Update =======================
function neuigkeitenListe(eintraege, mitAktion = true) {
  return eintraege.map((n) => `<section class="neu-abschnitt">${eintraege.length > 1 || !mitAktion ? `<h3>${esc(n.titel)} <small>${new Date(n.datum + "T12:00").toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}</small></h3>` : ""}
    <ul class="neu-liste">${n.punkte.map(([icon, t, text, ziel, wert]) => `<li><span class="neu-ic">${ic(icon)}</span><span class="neu-text"><b>${esc(t)}</b><span>${esc(text)}</span>
      ${ziel && mitAktion ? `<button class="neu-link" data-lv="gehe" data-ziel="${ziel}"${wert ? ` data-wert="${wert}"` : ""}>Ansehen ${ic("pfeil", "klein")}</button>` : ziel ? `<button class="neu-link" data-a="${ziel}"${wert ? ` data-v="${wert}"` : ""}>Ansehen ${ic("pfeil", "klein")}</button>` : ""}</span></li>`).join("")}</ul></section>`).join("");
}
/** Beim Start nach einem Update einmal zeigen, was neu ist (nicht beim allerersten Start). */
function neuigkeitenPruefen() {
  const gesehen = lies("bsr.neuGesehen", "");
  if (gesehen === NEUESTE) return;
  schreib("bsr.neuGesehen", NEUESTE);
  if (!lies("bsr.willkommen", "")) return; // neue Nutzer bekommen die Einführung
  const neu = ungesehen(gesehen);
  feierZeigen(`<div class="lv-feier-karte neu-karte" role="dialog" aria-modal="true" aria-labelledby="lvFeierTitel">
    <div class="neu-kopf">${taler("jubeln", { groesse: 72 })}<div><small>Neu in der App</small><h2 id="lvFeierTitel">${esc(neu.length > 1 ? "Das ist neu" : neu[0].titel)}</h2></div></div>
    <div class="neu-rolle">${neuigkeitenListe(neu)}</div>
    <button class="knopf" data-lv="zu">Los geht's</button></div>`, 600);
}

/** Erster Start mit Levelsystem: bisherige Aufgaben zählen rückwirkend, Erfolge werden still nachgetragen. */
function levelEinfuehren() {
  if (lies("bsr.levelStart", "")) return;
  schreib("bsr.levelStart", "1");
  if (erfolgePruefen(stat).length) { speichernLokal(); render(); }
  if (levelJetzt().xp > 0 && lies("bsr.willkommen", "")) feierZeigen(levelStartFeier(stat), 400);
}
function schwaechstesThema() {
  return pruefImTeil(state.fach).filter((t) => zaehler(t.id).b >= 3).sort((a, b) => quote(zaehler(a.id)) - quote(zaehler(b.id)))[0];
}
const summeFach = (fach) => themenFuer(fach).map((t) => zaehler(t.id)).reduce((a, z) => ({ b: a.b + z.b, r: a.r + z.r }), { b: 0, r: 0 });

// ======================= Zustand =======================
const state = {
  fach: ["oer", "est", "ust", "bbf"].includes(lies("bsr.fach", "bsr")) ? lies("bsr.fach", "bsr") : "bsr",
  // Studium (Grundstudium I) oder Ausbildung (FTA I); leer = noch nicht gewählt (Willkommen fragt danach). Alte Nutzer: Studium
  rolle: ["studium", "ausbildung"].includes(lies("bsr.rolle", "")) ? lies("bsr.rolle", "") : (lies("bsr.willkommen", "") ? "studium" : ""),
  // "mc" = Multiple Choice (Standard), "qa" = selbst formulieren. Eigener Schlüssel „oerModus2“: Der frühere Standard „qa“
  // (bsr.oerModus) wird bewusst nicht übernommen, damit alle einmal auf Multiple Choice starten.
  oerModus: lies("bsr.oerModus2", "mc") === "qa" ? "qa" : "mc",
  bilrTeil: ["1", "2"].includes(lies("bsr.teil", "beide")) ? lies("bsr.teil", "beide") : "beide", // Bilanzrecht: "1" | "2" | "beide"
  ziel: Number(lies("bsr.ziel", "20")) || 20,
  design: lies("bsr.design", "system"),
  // Animationen aus („Bewegung reduzieren“): eigener Schalter, Startwert = Systemeinstellung des Geräts
  bewegungAus: (() => { const v = lies("bsr.bewegungAus", ""); return v ? v === "1" : !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches; })(),
  hinweisWeg: lies("bsr.hinweisWeg", "") === "1",
  tab: "start",
  suche: "",
  themenFilter: "",
  normSuche: "",
  kontoSuche: "",
  bilrAnsicht: "konten", // Bilanzrecht-Nachschlagen: "konten" | "gesetze"
  sitzung: null,
  talerSpruch: -1, // angetippter Spruch des Maskottchens auf der Startseite (-1 = keiner)
  garderobe: { slot: "kopf", probe: null }, // Garderobe: Kategorie und angeprobter Artikel
  sheet: null, // {art: "konto"|"kontoDetail"|"norm"|"info"|"raster"|"einstellungen"|"willkommen"|"merksaetze"|"punktesammler"}
  deck: null,
  kompakt: null, // Kompaktwissen: {id: Thema | null (Übersicht), fach, liste: aus der Übersicht geöffnet, ausSitzung}
  pfad: null, // Lernpfad-Modus: {fach, block: null | {id, schritt, fehler, antwort, start, reihen}}
  paare: null, // Spiel „Paare finden“: {links, rechts, weg, leben, wahl, start, ende, sperre}
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

// ======================= Einstellungen (werden mit dem Sync-Code abgeglichen) =======================
const EINSTELLUNGEN = ["ziel", "design", "teil", "oerModus2", "bewegungAus", "rolle", "startLayout"];
// Erster Stand ohne Zeitstempel (t = 0): Ein neu verbundenes Gerät übernimmt die Einstellungen der anderen.
if (!stat.einstellungen) stat.einstellungen = { ziel: String(state.ziel), design: state.design, teil: state.bilrTeil, oerModus2: state.oerModus, t: 0 };
/** Einstellung lokal speichern und für den Abgleich mit Zeitstempel im Lernstand vermerken. */
function einstellungMerken(k, v) {
  schreib("bsr." + k, v);
  stat.einstellungen = { ...(stat.einstellungen || {}), [k]: v, t: Date.now() };
  speichern();
}
/** Nach dem Abgleich: neuere Einstellungen eines anderen Geräts übernehmen. */
function einstellungenAnwenden() {
  const e = stat.einstellungen;
  if (!e) return;
  for (const k of EINSTELLUNGEN) if (e[k] != null) schreib("bsr." + k, e[k]);
  if (e.ziel != null) state.ziel = Number(e.ziel) || state.ziel;
  if (e.design) state.design = e.design;
  if (e.teil) state.bilrTeil = ["1", "2"].includes(e.teil) ? e.teil : "beide";
  if (e.oerModus2) state.oerModus = e.oerModus2 === "qa" ? "qa" : "mc";
  if (e.bewegungAus != null) state.bewegungAus = e.bewegungAus === "1";
  if (e.rolle) state.rolle = e.rolle === "ausbildung" ? "ausbildung" : "studium";
}

/** Akzentfarbe und Hell/Dunkel anwenden. */
function designAnwenden() {
  // Startseite in der App-Farbe, innerhalb eines Moduls in dessen Farbe
  const m = state.tab === "start" && !state.sitzung && !state.deck ? { farbe: "#4f46e5", farbeDunkel: "#8b8cf8" } : MODUL[state.fach], root = document.documentElement;
  root.style.setProperty("--m-hell", m.farbe);
  root.style.setProperty("--m-dunkel", m.farbeDunkel);
  if (state.design === "light" || state.design === "dark") root.dataset.theme = state.design;
  else delete root.dataset.theme;
  root.dataset.bewegung = state.bewegungAus ? "aus" : "an";
  const o = meinOutfit();
  talerOutfitSetzen(o);
  root.dataset.hintergrund = o.hintergrund;
}
/** Getragenes Outfit (nur Gekauftes) und Taler-Kasse (1 Taler je 10 XP). */
const meinOutfit = () => outfitVon(stat.outfit, stat.gekauft);
const meineKasse = () => kasse(xpGesamt(stat).gesamt, stat.gekauft);

/** Schalter „Animationen“ (an = Animationen laufen, aus = Bewegung reduziert). Klein für Kopfzeilen, sonst als Zeile. pf = Lernpfad-Design. */
function bewegungSchalter(klein = false, pf = false) {
  const an = !state.bewegungAus;
  return `<button class="${pf ? "pf-schalter" : "schalter"}${klein ? " klein" : ""}" role="switch" aria-checked="${an}" data-a="bewegung" aria-label="Animationen ${an ? "an" : "aus"}" title="Animationen ${an ? "an" : "aus"} – antippen zum Umschalten">
    <span class="sch-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M4 8h7M2 12h9M4 16h7"/><circle cx="17" cy="12" r="4.2"/></svg></span>
    <span class="sch-bahn" aria-hidden="true"><span class="sch-knopf"></span></span></button>`;
}

// ======================= Sitzung =======================
function neueSitzung(opt) {
  const r = new Zufall(opt.duell?.seed), mc = !!opt.duell || state.oerModus === "mc";
  // Multiple Choice ist für unterwegs: lange Klausurfälle bleiben dort außen vor (außer es bliebe sonst nichts übrig)
  const vorlagen = opt.ids ? opt.ids.map((id) => ALLE.find((v) => v.id === id)).filter(Boolean) : [];
  const ohneFall = vorlagen.filter((v) => !(mc && FALL_IDS.has(v.id)));
  let fr = opt.ids
    ? r.mischen((ohneFall.length ? ohneFall : vorlagen).map((v) => v.erzeugen(r)))
    : opt.modus === "klausur"
    ? klausur(opt.anzahl, r, opt.fach, mc, opt.teil)
    : fragen(opt.themen, opt.anzahl || 10, r, opt.filter ?? opt.nurBuchung, mc, neueZiehung(opt.fach));
  if (mc) fr = fr.map((f) => alsMultipleChoice(f, r));
  // Duell: nur automatisch prüfbare Aufgaben, damit beide fair verglichen werden
  if (opt.duell) fr = fr.filter((f) => f.typ !== "offen").slice(0, DUELL_ANZAHL);
  return {
    ...opt, fragen: fr, antworten: fr.map(leereAntwort), bewertungen: fr.map(() => null), aufgedeckt: fr.map(() => false),
    index: 0, beendet: false, start: Date.now(), ende: null, review: null,
  };
}
function starte(opt) {
  state.sitzung = opt.duell ? gleichbleibendErzeugen(() => neueSitzung(opt)) : neueSitzung(opt);
  if (opt.modus === "uebung" && !opt.ids && !opt.duell) {
    stat.zuletzt = { fach: opt.fach || state.fach, themen: opt.themen, nurBuchung: opt.nurBuchung, filter: opt.filter, titel: sitzungTitel(opt), t: Date.now() };
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
  if (x.duell) return "Duell " + MODUL[x.fach || "bsr"].kurz;
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
  Object.assign(b, erfasse(aktFrage(), b.korrekt));
  if (navigator.vibrate) navigator.vibrate(b.korrekt ? 20 : [30, 40, 30]);
  render();
  setTimeout(() => document.getElementById("auswertung")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
}
/** Wie erfasse(), merkt sich aber den Lernstand davor – für eine spätere Korrektur der automatischen Prüfung. */
function erfasseMitVorher(f, b) {
  b.lernVorher = stat.lern[f.id] || null;
  Object.assign(b, erfasse(f, b.korrekt));
}
/** Automatische Prüfung einer offenen Antwort umkehren („Doch gewusst“ / „Doch nicht gewusst“). */
function korrigieren(i) {
  const x = s(), f = x.fragen[i], b = x.bewertungen[i];
  if (!b?.auto || b.korrigiert) return;
  const korrekt = !b.korrekt, vorher = levelJetzt();
  const z = { ...zaehler(f.thema) };
  z.r = Math.max(0, z.r + (korrekt ? 1 : -1));
  stat.proThema[f.thema] = z;
  stat.lern[f.id] = planen(b.lernVorher || undefined, korrekt);
  x.bewertungen[i] = { ...b, korrekt, korrigiert: true };
  klausurZaehlen(x);
  belohnen(vorher);
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
  x.bewertungen[i] = { korrekt, offen: true, ...erfasse(f, korrekt) };
  klausurZaehlen(x);
  if (navigator.vibrate) navigator.vibrate(korrekt ? 20 : [30, 40, 30]);
  if (x.review == null && x.modus !== "klausur") { weiter(); return; }
  render();
}

function weiter() {
  const x = s();
  if (x.index < x.fragen.length - 1) { x.index += 1; render(); scrollOben(); return; }
  if (x.modus !== "klausur") { x.beendet = true; x.ende = Date.now(); if (x.duell) duellAbschliessen(x); render(); scrollOben(); }
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
  const vorher = levelJetzt();
  stat.klausuren.push({ datum: x.start, richtig, offen, gesamt: x.fragen.length, sek: Math.round((x.ende - x.start) / 1000), fach: x.fach || "bsr" });
  x.klausurEintrag = x.start;
  belohnen(vorher);
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
const idsVon = (fach) => ALLE.filter((v) => vorlageIn(v, fach)).map((v) => v.id);
/** Buchführungsmodule (Kontenplan, Buchungssätze): Bilanzrecht und BilBf. */
const buchungsFach = (fach) => fach === "bsr" || fach === "bbf";
/** Zu welchem Modul ein Thema gehört – gemeinsame Buchführungsthemen zählen bei Azubis zu BilBf. */
const fachFuerThema = (id) => (state.rolle === "ausbildung" && themaIn(id, "bbf") ? "bbf" : THEMA[id].fach);
// Bilanzrecht: Auswahl Teil I / Teil II / beide (andere Module immer vollständig)
const teilVon = (fach) => (fach === "bsr" ? state.bilrTeil : "beide");
const themenImTeil = (fach) => themenFuer(fach).filter((t) => imTeil(t, teilVon(fach)));
const pruefImTeil = (fach) => pruefungsThemen(fach).filter((t) => imTeil(t, teilVon(fach)));
const idsImTeil = (fach) => ALLE.filter((v) => vorlageIn(v, fach) && imTeil(THEMA[v.thema], teilVon(fach))).map((v) => v.id);
const kartenImTeil = (fach) => kartenFuer(fach).filter((k) => imTeil(THEMA[k.thema], teilVon(fach)));
const faelligImTeil = (fach) => faellige(stat.lern, idsImTeil(fach));
const idsAktiv = () => aktiveModule(state.rolle || "studium").flatMap((m) => idsVon(m.id));
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
  ["nachschlagen", "nachschlagen", buchungsFach(state.fach) ? "Nachschlagen" : "Normen"],
];

function render() {
  const aktiv = document.activeElement;
  const fokusId = aktiv && aktiv.dataset ? aktiv.dataset.fokus : null;
  const pos = fokusId && aktiv.selectionStart != null ? [aktiv.selectionStart, aktiv.selectionEnd] : null;
  designAnwenden();
  // Einblend-Animationen nur, wenn sich die Ansicht wirklich ändert (nicht bei jedem Antippen)
  const neu = (k) => { const w = ansicht[k] !== schluessel[k](); ansicht[k] = schluessel[k](); return w ? " anim" : ""; };
  const animTab = neu("tab"), animVoll = neu("voll"), animSheet = neu("sheet");
  const tab = { start: tabStart, lernen: tabLernen, klausur: tabKlausur, karten: tabKarten, nachschlagen: buchungsFach(state.fach) ? tabNachschlagenBilr : tabNormen }[state.tab]();
  let html = `<main class="screen${animTab}${state.tab === "start" ? " ohne-leiste" : ""}" data-tab="${state.tab}">${tab}</main>`;
  if (state.tab !== "start") html += `<nav class="tabbar">${TABS().map(([id, i, t]) => `<button data-a="tab" data-v="${id}" class="${state.tab === id ? "aktiv" : ""}" aria-label="${t}"><span class="ti">${ic(i)}</span>${t}</button>`).join("")}</nav>`;
  if (state.sitzung) html += sitzungView();
  if (state.deck) html += deckView();
  if (state.paare) html += paareView();
  if (state.pfad) {
    const hilfe = { esc, ic, konfetti, normLabel: (r) => norm(r)?.label || r, karteMerken: true, schalter: bewegungSchalter(true, true) };
    html += state.pfad.block ? blockView(state.pfad.fach, state.pfad.block, hilfe) : kartenView(state.pfad.fach, hilfe);
  }
  if (state.kompakt) html += kompaktEbene();
  if (state.sheet) html += sheetView();
  // Scrollposition innerhalb von Übung und Sheet behalten, solange dieselbe Ansicht bleibt (z. B. beim Ankreuzen)
  const scrollVoll = animVoll ? [] : [...app.querySelectorAll(".vollbild .vb-inhalt")].map((el) => el.scrollTop);
  const scrollSheet = animSheet ? 0 : app.querySelector(".sheet .vb-inhalt")?.scrollTop || 0;
  app.innerHTML = html;
  if (scrollVoll.some(Boolean)) app.querySelectorAll(".vollbild .vb-inhalt").forEach((el, i) => { if (scrollVoll[i]) el.scrollTop = scrollVoll[i]; });
  if (scrollSheet) { const el = app.querySelector(".sheet .vb-inhalt"); if (el) el.scrollTop = scrollSheet; }
  if (animVoll) app.querySelector(".vollbild")?.classList.add("anim");
  if (animSheet) app.querySelector(".sheet-hg")?.classList.add("anim");
  verlaufAbgleichen();
  document.body.style.overflow = state.sitzung || state.deck || state.paare || state.pfad || state.kompakt || state.sheet ? "hidden" : "";
  if (fokusId) {
    const el = document.querySelector(`[data-fokus="${fokusId}"]`);
    if (el) { el.focus(); if (pos && el.setSelectionRange) try { el.setSelectionRange(...pos); } catch (_) { /* egal */ } }
  }
}

// ======================= Zurück-Taste / Zurück-Geste =======================
// Jede geöffnete Ebene (Unterseite, Übung, Rückschau, Lernkarten, Menü) bekommt einen Eintrag im Browserverlauf.
// So schließt die Zurück-Geste (Android) bzw. Zurück-Taste die oberste Ebene, statt die App zu verlassen.
let verlaufTiefe = 0, popIgnorieren = 0;
const ansichtTiefe = () => (state.tab !== "start" ? 1 : 0) + (state.sitzung ? 1 : 0) + (state.sitzung?.review != null ? 1 : 0) + (state.deck ? 1 : 0) + (state.paare ? 1 : 0) + (state.pfad ? 1 : 0) + (state.pfad?.block ? 1 : 0) + (state.kompakt ? 1 : 0) + (state.sheet ? 1 : 0);
function verlaufAbgleichen() {
  const t = ansichtTiefe();
  while (verlaufTiefe < t) { verlaufTiefe += 1; history.pushState({ tiefe: verlaufTiefe }, ""); }
  if (verlaufTiefe > t) { popIgnorieren += 1; history.go(t - verlaufTiefe); verlaufTiefe = t; }
}
/** Oberste Ebene schließen (Zurück-Geste, Escape-Taste). */
function ebeneZurueck() {
  if (state.sheet) AKTIONEN.sheetZu();
  else if (state.kompakt) AKTIONEN.kompaktZu();
  else if (state.deck) AKTIONEN.deckZu();
  else if (state.paare) AKTIONEN.paareZu();
  else if (state.pfad?.block) AKTIONEN.pfadKarte();
  else if (state.pfad) AKTIONEN.pfadZu();
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
  voll: () => (state.sitzung ? "s" + state.sitzung.start + (state.sitzung.beendet ? "e" : "") : "") + (state.deck ? "d" + state.deck.karten.length : "") + (state.paare ? "p" + state.paare.start + (state.paare.ende ? "e" : "") : "")
    + (state.pfad ? "f" + (state.pfad.block ? state.pfad.block.id + state.pfad.block.start + ":" + state.pfad.block.schritt : "karte") : "")
    + (state.kompakt ? "k" + (state.kompakt.id || "liste") : ""),
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
/** Taler bewegt sich nur beim ersten Anzeigen und direkt nach dem Antippen – nicht bei jedem Neuzeichnen der Startseite. */
function talerBewegt() { const neu = !state.talerGezeigt || state.talerAngetippt; state.talerGezeigt = true; state.talerAngetippt = false; return neu; }

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
      <div class="gruss-block">
        <button class="taler-knopf" data-a="taler" aria-label="Maskottchen Taler antippen">${taler(state.talerSpruch < 0 ? "hallo" : "jubeln", { groesse: 60, klasse: talerBewegt() ? (state.talerSpruch < 0 ? "" : "flip") : "ruhig" })}</button>
        <div><div class="gruss">${esc(datum)}</div><h1 class="titel" style="margin-top:2px">${gruss()}</h1></div>
      </div>
      <div class="kopf-aktionen"><button class="icon-btn" data-a="einstellungen" aria-label="Einstellungen">${ic("einstellungen")}</button></div>
    </div>
    ${state.talerSpruch >= 0 ? `<div class="taler-blase" role="status">${esc(TALER_SPRUECHE[state.talerSpruch % TALER_SPRUECHE.length])}</div>` : ""}
    <section class="hero">
      <div class="oben">
        <div class="ziel-ring" style="--p:${p}"><div>${heute}<small>von ${ziel}</small></div></div>
        <div class="grow"><h2>${titel}</h2><div class="zeile-klein">${text}</div>
          <div class="werte">
            <span class="wert-pille"><span class="${tageSerie ? "flamme-an" : ""}">${ic("flamme")}</span>${tageSerie} ${tageSerie === 1 ? "Tag" : "Tage"} in Folge</span>
            <button class="wert-pille knopf-pille" data-a="garderobe" aria-label="Garderobe öffnen – ${meineKasse().guthaben} Taler">${talerBetrag(meineKasse().guthaben)} Garderobe</button>
          </div></div>
      </div>
      ${levelZeile(stat)}
      ${knopf}
    </section>
    <div class="suchfeld">${ic("suche")}<input type="search" id="homeSuche" data-fokus="homeSuche" placeholder="Themen, Aufgaben, Normen, Konten …" autocomplete="off" enterkeyhint="search" value="${esc(state.suche)}">
      <button class="leeren ${state.suche ? "" : "versteckt"}" data-a="sucheLeeren" aria-label="Suche leeren">${ic("kreuz", "klein")}</button></div>
    <div id="sucheErgebnis">${state.suche.trim() ? suchErgebnisse(state.suche) : ""}</div>
    <div id="startRest" class="${state.suche.trim() ? "versteckt" : ""}">
      ${startReihenfolge().filter((b) => !b.aus).map((b) => START_BEREICHE[b.id].html()).join("")}
      <button class="start-anpassen" data-a="startAnpassen">${ic("einstellungen", "klein")} Startseite anpassen</button>
      ${installHinweis()}
    </div>`;
}

// ======================= Startseite anpassen =======================
// Kopfzeile, Tagesziel, Level und Garderobe stehen fest oben; die Bereiche darunter lassen sich sortieren und ausblenden.
const START_BEREICHE = {
  module: { name: "Deine Module", text: "Module deiner Rolle", html: () => `<div class="gruppe"><div class="gruppe-titel">Deine Module <span class="sub" style="text-transform:none;letter-spacing:0">${aktiveModule(state.rolle || "studium").length} von ${moduleDerRolle(state.rolle || "studium").length} verfügbar</span></div>
        ${rollenSchalter()}
        <div class="modul-grid">${moduleDerRolle(state.rolle || "studium").map(modulKachel).join("")}</div></div>` },
  klausuren: { name: "Klausur-Countdown", text: "Tage bis zur nächsten Klausur", html: () => countdownBereich() },
  woche: { name: "Diese Woche", text: "Aufgaben der letzten sieben Tage", html: () => `<div class="gruppe"><div class="gruppe-titel">Diese Woche <span class="sub" style="text-transform:none;letter-spacing:0">${zahlText(woche(stat.tage).reduce((a, t) => a + t.n, 0))} Aufgaben</span></div>
        <div class="liste">${wocheView()}</div></div>` },
  statistik: { name: "Rückblick und Statistik", text: "Wochen- und Monatsrückblick, Diagramme", html: () => statistikBereich() },
  gemeinsam: { name: "Gemeinsam lernen", text: "Lerngruppe, Rangliste und Duell", html: () => gemeinsamBereich() },
};
const START_STANDARD = ["klausuren", "module", "woche", "statistik", "gemeinsam"];
/** Gespeicherte Reihenfolge („a,b,!c“ – ! = ausgeblendet), ergänzt um neue Bereiche. */
function startReihenfolge() {
  const roh = (lies("bsr.startLayout", "") || "").split(",").filter(Boolean).map((x) => ({ id: x.replace(/^!/, ""), aus: x.startsWith("!") })).filter((b) => START_BEREICHE[b.id]);
  for (const id of START_STANDARD) if (!roh.some((b) => b.id === id)) roh.push({ id, aus: false });
  return roh;
}
const startSpeichern = (liste) => { einstellungMerken("startLayout", liste.map((b) => (b.aus ? "!" : "") + b.id).join(",")); render(); };
function startAnpassenView() {
  const l = startReihenfolge();
  return `<div class="gruppe-fuss" style="margin:0 4px 12px">Kopfzeile, Tagesziel, Level und Garderobe bleiben immer oben. Die Bereiche darunter kannst du verschieben und ausblenden.</div>
    <ol class="start-liste">${l.map((b, i) => `<li class="start-zeile${b.aus ? " aus" : ""}">
      <span class="sz-griff" aria-hidden="true">${i + 1}</span><span class="grow"><b>${START_BEREICHE[b.id].name}</b><span class="sub">${START_BEREICHE[b.id].text}</span></span>
      <button class="icon-btn klein" data-a="startHoch" data-v="${i}" ${i === 0 ? "disabled" : ""} aria-label="${START_BEREICHE[b.id].name} nach oben">${ic("pfeil", "klein hoch")}</button>
      <button class="icon-btn klein" data-a="startRunter" data-v="${i}" ${i === l.length - 1 ? "disabled" : ""} aria-label="${START_BEREICHE[b.id].name} nach unten">${ic("pfeil", "klein runter")}</button>
      <button class="schalter klein" role="switch" aria-checked="${!b.aus}" data-a="startZeigen" data-v="${i}" aria-label="${START_BEREICHE[b.id].name} ${b.aus ? "einblenden" : "ausblenden"}"><span class="sch-bahn" aria-hidden="true"><span class="sch-knopf"></span></span></button></li>`).join("")}</ol>
    <button class="knopf zweit" data-a="startStandard" style="margin:14px 0 20px">Standard wiederherstellen</button>`;
}
// Platzhalter, werden weiter unten ersetzt
function statistikBereich() { return statistikStart(stat); }
/** Hilfen für Rückblick und Statistik. */
const statHilfen = () => ({
  themaTitel: (id) => THEMA[id]?.titel || id, themaFach: (id) => (THEMA[id] ? fachFuerThema(id) : "bsr"), modulKurz: (f) => MODUL[f]?.kurz || f, modulFarbe: (f) => MODUL[f]?.farbe || "var(--m)",
  module: aktiveModule(state.rolle || "studium"), summeFach, laengsteSerie: laengsteSerie(stat.tage),
});
// ======================= Duell =======================
const meinName = () => stat.profil?.name || "";
/** Name aus dem Eingabefeld übernehmen; ohne Namen geht es nicht weiter. */
function namePruefen() {
  const n = document.getElementById("profilName")?.value.trim().slice(0, 20);
  if (n !== undefined && n !== meinName()) { stat.profil = { ...(stat.profil || {}), name: n, t: Date.now() }; speichern(); }
  if (!meinName()) { toast("Bitte zuerst einen Namen eintragen."); document.getElementById("profilName")?.focus(); return false; }
  return true;
}
const duellErgebnisVon = (x) => ({ r: x.bewertungen.filter((b) => b?.korrekt === true).length, z: Math.round(((x.ende || Date.now()) - x.start) / 1000) });
/** Duell beendet: Ergebnis merken, bei Sieg XP und Erfolg. */
function duellAbschliessen(x) {
  const ich = duellErgebnisVon(x), g = x.duell.gegner, id = String(x.duell.seed);
  stat.duelle = { ...(stat.duelle || {}), [id]: { f: x.fach, ich, gegner: g || stat.duelle?.[id]?.gegner || null, t: Date.now() } };
  if (g && duellSieger(ich, g) === 1) {
    const vorher = levelJetzt();
    stat.xpBonus = (stat.xpBonus || 0) + XP.duellSieg;
    belohnen(vorher, ["duellsieg"]);
  }
  speichern();
}
/** VS-Karte: ich gegen Gegner (oder Hinweis zum Herausfordern). */
function duellKarte(ichName, ich, gegner) {
  const sieg = gegner ? duellSieger(ich, gegner) : null;
  const seite = (name, e, mein, gewinnt) => `<div class="vs-seite${gewinnt ? " sieger" : ""}">${taler(gewinnt ? "jubeln" : "hallo", { groesse: 64, klasse: "ruhig", ...(mein ? {} : { outfit: STANDARD }) })}
    <b>${esc(name || (mein ? "Du" : "Gegner"))}</b><span class="vs-wert">${e ? `${e.r}/${DUELL_ANZAHL}` : "?"}</span><small>${e ? zeitText(e.z) : "noch offen"}</small></div>`;
  return `<div class="vs-karte">${seite(ichName || "Du", ich, true, sieg === 1)}<span class="vs-mitte">VS</span>${seite(gegner?.n, gegner, false, sieg === -1)}</div>
    ${gegner ? `<div class="vs-urteil ${sieg === 1 ? "sieg" : sieg === -1 ? "niederlage" : ""}">${sieg === 1 ? `Gewonnen! +${XP.duellSieg} XP` : sieg === -1 ? "Knapp verloren – Revanche?" : "Unentschieden!"}</div>` : ""}`;
}
function duellErgebnis(x) {
  return `<div class="gruppe"><div class="gruppe-titel">Duell</div>${duellKarte(meinName(), duellErgebnisVon(x), x.duell.gegner)}
    ${x.duell.gegner ? `<div class="gruppe-fuss">Schick ${esc(x.duell.gegner.n)} dein Ergebnis zurück, dann sieht ${esc(x.duell.gegner.n)} es auch.</div>` : `<div class="gruppe-fuss">Schick den Link an jemanden aus deinem Kurs: Er oder sie bekommt dieselben ${DUELL_ANZAHL} Aufgaben.</div>`}</div>`;
}
async function linkTeilen(titel, text, url) {
  if (navigator.share) { try { await navigator.share({ title: titel, text, url }); return; } catch (e) { if (e?.name === "AbortError") return; } }
  try { await navigator.clipboard.writeText(`${text} ${url}`); toast("Link kopiert – jetzt in WhatsApp & Co. einfügen."); } catch (_) { prompt("Link kopieren:", url); }
}
function duellView() {
  const module = aktiveModule(state.rolle || "studium"), liste = Object.entries(stat.duelle || {}).filter(([, d]) => d && !d.x).sort((a, b) => b[1].t - a[1].t);
  const bilanz = liste.reduce((a, [, d]) => { if (!d.gegner) return a; const s = duellSieger(d.ich, d.gegner); a[s === 1 ? "s" : s === -1 ? "n" : "u"] += 1; return a; }, { s: 0, n: 0, u: 0 });
  return `<section class="duell-held">${taler("jubeln", { groesse: 72, klasse: "ruhig" })}<span class="vs-mitte gross">VS</span>${taler("hallo", { groesse: 72, klasse: "ruhig", outfit: STANDARD })}
      <p>${DUELL_ANZAHL} Aufgaben, dieselben für beide. Mehr richtig gewinnt – bei Gleichstand die schnellere Zeit.</p></section>
    <div class="gruppe"><div class="gruppe-titel">Dein Name im Duell</div><div class="liste"><label class="zeile"><span class="grow">Name</span>
      <input type="text" id="profilName" class="feld-klein" value="${esc(meinName())}" placeholder="z. B. Alex" maxlength="20" autocomplete="nickname"></label></div></div>
    <div class="gruppe"><div class="gruppe-titel">Modul wählen und starten</div><div class="duell-module">${module.map((m) => `<button class="duell-modul" style="--mc:${m.farbe}" data-a="duellStart" data-v="${m.id}">${ic(m.icon)}<b>${esc(m.kurz)}</b></button>`).join("")}</div></div>
    ${liste.length ? `<div class="gruppe"><div class="gruppe-titel">Bisherige Duelle <span class="sub" style="text-transform:none;letter-spacing:0">${bilanz.s} Siege · ${bilanz.n} Niederlagen${bilanz.u ? ` · ${bilanz.u} unentschieden` : ""}</span></div><div class="liste">${liste.slice(0, 12).map(([, d]) => {
      const s = d.gegner ? duellSieger(d.ich, d.gegner) : null;
      return `<div class="zeile"><span class="duell-marke ${s === 1 ? "sieg" : s === -1 ? "niederlage" : ""}">${s === 1 ? "S" : s === -1 ? "N" : s === 0 ? "U" : "…"}</span><span class="grow"><b>${d.gegner ? `gegen ${esc(d.gegner.n)}` : "Wartet auf Antwort"}</b><div class="sub">${esc(MODUL[d.f]?.kurz || "")} · ${new Date(d.t).toLocaleDateString("de-DE")}</div></span>
        <b class="duell-stand">${d.ich.r}${d.gegner ? ` : ${d.gegner.r}` : ""}</b></div>`;
    }).join("")}</div></div>` : ""}`;
}
function duellEinladungView(d) {
  const m = MODUL[d.f], antwort = !!d.g, abw = d.a && d.a !== ALLE.length;
  if (antwort) {
    // Antwort auf meine Herausforderung: d = Gegner, d.g = mein eigenes Ergebnis
    return `<div class="duell-einladung">${duellKarte(d.g.n, { r: d.g.r, z: d.g.z }, { n: d.n, r: d.r, z: d.z })}
      <div class="gruppe-fuss" style="text-align:center">${esc(d.n)} hat dein Duell in ${esc(m?.kurz || "")} gespielt.</div></div>`;
  }
  return `<div class="duell-einladung"><div class="vs-karte">
      <div class="vs-seite">${taler("hallo", { groesse: 64, klasse: "ruhig", outfit: STANDARD })}<b>${esc(d.n)}</b><span class="vs-wert">${d.r}/${DUELL_ANZAHL}</span><small>${zeitText(d.z)}</small></div>
      <span class="vs-mitte">VS</span><div class="vs-seite">${taler("jubeln", { groesse: 64, klasse: "ruhig" })}<b>${esc(meinName() || "Du")}</b><span class="vs-wert">?</span><small>du bist dran</small></div></div>
    <p class="duell-text"><b>${esc(d.n)}</b> fordert dich heraus: ${DUELL_ANZAHL} Aufgaben in <b>${esc(m?.titel || d.f)}</b>. Schaffst du mehr als ${d.r} richtig – oder gleich viele, aber schneller?</p>
    ${abw ? `<div class="hinweis-box"><div class="sub">Ihr nutzt unterschiedliche App-Versionen – die Aufgaben können sich unterscheiden. Am besten beide die App neu öffnen.</div></div>` : ""}
    ${m && !m.bald ? `<button class="knopf" data-a="duellAnnehmen">${ic("blitz")} Duell annehmen</button>` : `<div class="sub">Dieses Modul gibt es in deiner App noch nicht.</div>`}</div>`;
}
/** Beim Start: Duell-Link aus der Adresse lesen. */
function duellAusAdresse() {
  const gm = location.hash.match(/^#gruppe=([A-Z2-9]{16})$/);
  if (gm) { history.replaceState(null, "", location.pathname + location.search); if (stat.gruppe?.code !== gm[1]) state.sheet = { art: "gruppeEinladung", code: gm[1] }; return; }
  const m = location.hash.match(/^#duell=([A-Za-z0-9_-]+)/);
  if (!m) return;
  history.replaceState(null, "", location.pathname + location.search);
  const d = duellLesen(m[1]);
  if (!d) { toast("Der Duell-Link ist ungültig."); return; }
  if (d.g) { // Antwort: Ergebnis des Gegners eintragen
    const id = String(d.s), alt = stat.duelle?.[id];
    stat.duelle = { ...(stat.duelle || {}), [id]: { f: d.f, ich: alt?.ich || { r: d.g.r, z: d.g.z }, gegner: { n: d.n, r: d.r, z: d.z }, t: Date.now() } };
    if (duellSieger(stat.duelle[id].ich, stat.duelle[id].gegner) === 1 && !alt?.gegner) { const vorher = levelJetzt(); stat.xpBonus = (stat.xpBonus || 0) + XP.duellSieg; belohnen(vorher, ["duellsieg"]); }
    speichern();
  }
  state.sheet = { art: "duellEinladung", d };
}
// ======================= Lerngruppe und Rangliste =======================
const gruppe = { daten: null, laedt: false, fehler: null, art: "woche", zuletzt: 0 };
function profilId() {
  if (!stat.profil?.id) { stat.profil = { ...(stat.profil || {}), id: neueGeraeteId(), t: stat.profil?.t || 0 }; speichernLokal(); }
  return stat.profil.id;
}
function meinEintrag() {
  const lv = levelJetzt(), w = zeitraum("woche", 0), { hintergrund, ...outfit } = meinOutfit();
  return { name: meinName() || "Anonym", xp: lv.xp, level: lv.level, xpWoche: zeitraumAuswerten(stat, w).xp, wocheVon: w.von, outfit, t: Date.now() };
}
/** Eigenen Stand in die Lerngruppe schreiben und die Rangliste holen. */
async function gruppeAktualisieren(erzwingen = false) {
  const code = stat.gruppe?.code;
  if (!code || !syncVerfuegbar() || gruppe.laedt || !navigator.onLine) return;
  if (!erzwingen && Date.now() - gruppe.zuletzt < 60 * 1000) return;
  gruppe.laedt = true;
  try {
    gruppe.daten = await gruppeSchreiben(SERVER, code, (d) => eintragen(d, profilId(), meinEintrag()));
    gruppe.fehler = null; gruppe.zuletzt = Date.now();
  } catch (e) { gruppe.fehler = e.message || "Server nicht erreichbar"; }
  gruppe.laedt = false;
  if (!state.sitzung && !state.deck && !state.pfad && (state.tab === "start" || state.sheet?.art === "rangliste")) render();
}
/** Treppchen für die ersten drei – jeder mit seinem eigenen Taler-Outfit. */
function treppchen(liste) {
  const top = [liste[1], liste[0], liste[2]];
  return `<div class="treppchen">${top.map((e, i) => e ? `<div class="tp-platz p${e.platz}${e.id === stat.profil?.id ? " ich" : ""}">
      ${taler(e.platz === 1 ? "jubeln" : "hallo", { groesse: e.platz === 1 ? 76 : 62, klasse: "ruhig", outfit: { ...STANDARD, ...(e.outfit || {}) } })}
      <b>${esc(e.name)}</b><span>${zahlText(e.wert)} XP</span><div class="tp-stufe">${e.platz}</div></div>` : `<div class="tp-platz leer"></div>`).join("")}</div>`;
}
function ranglisteView() {
  if (!syncVerfuegbar()) return `<div class="gruppe-fuss">Ranglisten brauchen den Sync-Server – in dieser Version nicht verfügbar.</div>`;
  const g = stat.gruppe;
  if (!g?.code) {
    return `<section class="duell-held">${taler("jubeln", { groesse: 72, klasse: "ruhig" })}<p>Lernt ihr zu mehreren? In einer Lerngruppe seht ihr, wer diese Woche die meisten XP sammelt.</p></section>
      <div class="gruppe"><div class="gruppe-titel">Dein Name</div><div class="liste"><label class="zeile"><span class="grow">Name</span><input type="text" id="profilName" class="feld-klein" value="${esc(meinName())}" placeholder="z. B. Alex" maxlength="20"></label></div></div>
      <div class="gruppe"><div class="gruppe-titel">Neue Gruppe</div><div class="liste"><label class="zeile"><span class="grow">Gruppenname</span><input type="text" id="gruppeName" class="feld-klein" placeholder="z. B. Lehrgang 2026 B" maxlength="30"></label></div>
        <button class="knopf" data-a="gruppeErstellen" style="margin-top:10px">${ic("plus")} Gruppe erstellen</button></div>
      <div class="gruppe"><div class="gruppe-titel">Gruppe beitreten</div><div class="liste"><label class="zeile"><span class="grow">Gruppen-Code</span><input type="text" id="gruppeCode" class="feld-klein mono" placeholder="XXXX-XXXX-XXXX-XXXX" maxlength="19" autocapitalize="characters"></label></div>
        <button class="knopf zweit" data-a="gruppeBeitreten" style="margin-top:10px">Beitreten</button></div>
      <div class="gruppe-fuss" style="margin:8px 4px 20px">Geteilt werden nur dein Name, deine XP, dein Level und Talers Outfit – nicht dein Lernstand.</div>`;
  }
  const d = gruppe.daten, liste = d ? rangliste(d, gruppe.art, zeitraum("woche", 0).von) : [];
  const ich = liste.find((e) => e.id === stat.profil?.id);
  return `<section class="gruppen-kopf"><div><b>${esc(d?.name || g.name || "Lerngruppe")}</b><span>${liste.length} ${liste.length === 1 ? "Mitglied" : "Mitglieder"} · Code ${codeAnzeige(g.code)}</span></div>
      <button class="knopf zweit klein-knopf" data-a="gruppeEinladen">${ic("export", "klein")} Einladen</button></section>
    <div class="segment" style="margin-top:12px">${[["woche", "Diese Woche"], ["gesamt", "Gesamt"]].map(([id, t]) => `<button data-a="gruppeArt" data-v="${id}" class="${gruppe.art === id ? "aktiv" : ""}">${t}</button>`).join("")}</div>
    ${!d ? `<div class="gruppe-fuss" style="margin:20px 4px">${gruppe.laedt ? "Rangliste wird geladen …" : gruppe.fehler ? esc(gruppe.fehler) : "Noch nicht geladen."}</div>`
      : `${treppchen(liste)}
    <ol class="rang-liste">${liste.slice(3).map((e) => `<li class="${e.id === stat.profil?.id ? "ich" : ""}"><span class="rl-platz">${e.platz}</span>${taler("hallo", { groesse: 36, klasse: "ruhig", outfit: { ...STANDARD, ...(e.outfit || {}) } })}
      <span class="grow"><b>${esc(e.name)}</b><span class="sub">Level ${e.level || 1}</span></span><b class="rl-xp">${zahlText(e.wert)} XP</b></li>`).join("")}</ol>
    ${ich ? `<div class="gruppe-fuss" style="margin:10px 4px">Du bist auf Platz <b>${ich.platz}</b>${gruppe.art === "woche" ? " dieser Woche. Montags beginnt eine neue Runde." : "."}</div>` : ""}`}
    <button class="knopf zweit" data-a="gruppeNeuLaden" style="margin-top:14px">${ic("wiederholen")} Aktualisieren</button>
    <button class="link gefahr" data-a="gruppeVerlassen" style="display:block;margin:18px auto 24px">Gruppe verlassen</button>`;
}
function gemeinsamStart() {
  const g = stat.gruppe, d = gruppe.daten, liste = g?.code && d ? rangliste(d, "woche", zeitraum("woche", 0).von) : [];
  const ich = liste.find((e) => e.id === stat.profil?.id);
  const mini = liste.length ? `<button class="gm-rangliste" data-a="rangliste"><span class="gm-kopf"><b>${esc(d.name)}</b><span class="sub">Rangliste dieser Woche${ich ? ` · du bist auf Platz ${ich.platz}` : ""}</span></span>
      <span class="gm-top">${liste.slice(0, 3).map((e) => `<span class="gm-person${e.id === stat.profil?.id ? " ich" : ""}">${taler(e.platz === 1 ? "jubeln" : "hallo", { groesse: 40, klasse: "ruhig", outfit: { ...STANDARD, ...(e.outfit || {}) } })}<b>${e.platz}. ${esc(e.name)}</b><small>${zahlText(e.wert)} XP</small></span>`).join("")}</span></button>` : "";
  return `<div class="gruppe"><div class="gruppe-titel">Gemeinsam lernen</div>${mini}
    <div class="ss-knoepfe" style="${mini ? "margin-top:8px" : ""}"><button data-a="rangliste">${ic("pokal", "klein")} ${g?.code ? "Rangliste" : "Lerngruppe"}</button><button data-a="duell">${ic("blitz", "klein")} Duell</button></div></div>`;
}
function gemeinsamBereich() { return gemeinsamStart(); }

/** Umschalter Studium / Ausbildung (Startseite und Einstellungen). */
function rollenSchalter() {
  const r = state.rolle || "studium";
  return `<div class="modus-karte rollen-karte"><div class="segment">${[["studium", "hut", "Studium"], ["ausbildung", "akte", "Ausbildung"]].map(([id, i, t]) =>
    `<button data-a="rolle" data-v="${id}" class="${r === id ? "aktiv" : ""}" aria-pressed="${r === id}">${ic(i, "klein")}${t}</button>`).join("")}</div></div>`;
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

// ======================= Klausur-Countdown =======================
const termineDerRolle = () => kommende(stat.termine, moduleDerRolle(state.rolle || "studium").map((m) => m.id));
const datumLang = (d) => new Date(d + "T12:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
/** Karte eines Klausurtermins: Abreißkalender mit den Tagen bis zur Klausur, darunter der Lernplan. */
function countdownKarte(e) {
  const m = MODUL[e.fach], ids = idsVon(e.fach), offen = ids.filter((id) => !(stat.lern[id]?.fach >= 3)).length, n = proTag(offen, e.tage);
  const plan = !offen ? "Alle Aufgabentypen gefestigt – jetzt nur noch wiederholen." : e.tage <= 1 ? "Ruhig bleiben: Kompaktwissen und Fallen durchgehen."
    : `Noch ${offen} Aufgabentypen festigen – etwa <b>${n} pro Tag</b>.`;
  return `<button class="countdown-karte" style="--mc:${m.farbe}" data-a="modul" data-v="${e.fach}" aria-label="${esc(m.kurz)}: ${esc(e.titel || "Klausur")} ${countdownText(e.tage)}">
    <span class="cd-blatt${e.tage <= 7 ? " bald" : ""}"><span class="cd-ring" aria-hidden="true"></span><b>${e.tage === 0 ? "!" : e.tage}</b><small>${e.tage === 0 ? "heute" : e.tage === 1 ? "Tag" : "Tage"}</small></span>
    <span class="cd-text"><span class="cd-modul">${esc(m.kurz)} · ${esc(e.titel || "Klausur")}</span><b>${countdownText(e.tage)[0].toUpperCase() + countdownText(e.tage).slice(1)}</b>
      <span class="cd-datum">${datumLang(e.datum)}</span><span class="cd-plan">${plan}</span></span></button>`;
}
function countdownBereich() {
  const t = termineDerRolle().slice(0, 3);
  return `<div class="gruppe"><div class="gruppe-titel">Klausuren <button class="titel-link" data-a="termine">${t.length ? "Bearbeiten" : "Eintragen"}</button></div>
    ${t.length ? `<div class="countdown-liste">${t.map(countdownKarte).join("")}</div>`
      : `<button class="countdown-leer" data-a="termine">${ic("kalender")}<span><b>Klausurtermin eintragen</b><span class="sub">Dann zählt die Startseite die Tage herunter und zeigt, wie viel du pro Tag schaffen solltest.</span></span></button>`}</div>`;
}
function termineView() {
  const alle = termineDerRolle(), module = aktiveModule(state.rolle || "studium");
  const heute = tagSchluessel();
  return `<div class="liste">${alle.length ? alle.map((e) => `<div class="zeile"><span class="cd-punkt" style="--mc:${MODUL[e.fach].farbe}"></span><span class="grow"><b>${esc(MODUL[e.fach].kurz)} · ${esc(e.titel || "Klausur")}</b><div class="sub">${datumLang(e.datum)} · ${countdownText(e.tage)}</div></span>
      <button class="icon-btn klein" data-a="terminLoeschen" data-v="${e.id}" aria-label="Termin löschen">${ic("muell")}</button></div>`).join("")
    : `<div class="zeile"><span class="grow sub">Noch keine Klausur eingetragen.</span></div>`}</div>
    <div class="gruppe"><div class="gruppe-titel">Neuer Termin</div><div class="liste termin-form">
      <label class="zeile"><span class="grow">Modul</span><select id="terminFach">${module.map((m) => `<option value="${m.id}"${m.id === state.fach ? " selected" : ""}>${esc(m.titel)}</option>`).join("")}</select></label>
      <label class="zeile"><span class="grow">Datum</span><input type="date" id="terminDatum" min="${heute}"></label>
      <label class="zeile"><span class="grow">Bezeichnung</span><input type="text" id="terminTitel" placeholder="Klausur" maxlength="40"></label>
    </div><button class="knopf" data-a="terminNeu" style="margin-top:12px">${ic("plus")} Termin speichern</button></div>
    <div class="gruppe-fuss" style="margin:8px 4px 20px">Termine werden mit dem Sync-Code auf deine anderen Geräte übertragen.</div>`;
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
    kompakt: Object.entries(KOMPAKT).map(([id, k]) => ({ t: THEMA[id], k, such: norma(`${THEMA[id].titel} ${kompaktText(k)}`) })),
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
  // Nur Inhalte der gewählten Rolle (Studium bzw. Ausbildung); gemeinsame Buchführungsthemen zählen bei Azubis zu BilBf
  const rolle = state.rolle || "studium";
  const inRolle = (themaId) => rolleVon(MODUL[fachFuerThema(themaId)]) === rolle;
  const themen = beste(I.themen.filter((x) => inRolle(x.t.id)), 6);
  const aufgaben = beste(I.aufgaben.filter((x) => !MODUL[THEMA[x.v.thema].fach].bald && inRolle(x.v.thema) && !NICHT_IN[fachFuerThema(x.v.thema)]?.has(x.v.id)), 8);
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
  const kompakt = beste(I.kompakt.filter((x) => !MODUL[x.t.fach].bald && inRolle(x.t.id)), 4);
  const module = I.module.filter((x) => passt(x) && rolleVon(x.m) === rolle);
  const gruppe = (titel, inhalt) => `<div class="treffer-gruppe treffer"><div class="gruppe-titel">${titel}</div><div class="liste">${inhalt}</div></div>`;
  let html = "";
  if (module.length) html += gruppe("Module", module.map(({ m }) => `<button class="zeile" data-a="${m.bald ? "bald" : "modul"}" data-v="${m.id}">
    <span class="symbol" style="background:${m.farbe};color:#fff">${ic(m.icon)}</span><span class="grow"><div>${markiere(m.titel, hl)}</div><div class="sub">${m.bald ? "Bald verfügbar" : m.unter}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join(""));
  if (themen.length) html += gruppe("Themen – direkt üben", themen.map(({ t }) => `<button class="zeile" data-a="thema" data-v="${t.id}">
    <span class="thema-icon">${t.icon}</span><span class="grow"><div>${markiere(t.titel, hl)}</div><div class="sub">${MODUL[fachFuerThema(t.id)].kurz} · ${esc(t.unter)}</div></span><span class="chev">${ic("play", "klein fill")}</span></button>`).join(""));
  if (kompakt.length) html += gruppe("Zusammenfassungen", kompakt.map(({ t, k }) => `<button class="zeile" data-a="kompakt" data-v="${t.id}">
    <span class="thema-icon">${t.icon}</span><span class="grow"><div>${markiere(t.titel, hl)}</div><div class="sub" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${markiere(kompaktText(k), hl, true)}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join(""));
  const normHtml = normen.length ? gruppe("Gesetzestexte", normen.map(({ n, label }) => `<button class="zeile" data-a="normDetail" data-v="${n.g} ${n.nr}">
    <span class="symbol">§</span><span class="grow"><div><b>${esc(label)}</b></div><div class="sub">${esc(n.titel || n.abs[0]?.text.slice(0, 80) + " …")}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join("")) : "";
  if (zitat) html += normHtml;
  if (aufgaben.length) html += gruppe("Aufgaben", aufgaben.map(({ v, f }) => `<button class="zeile" data-a="einzeln" data-v="${v.id}">
    <span class="grow"><div style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:15px">${markiere(f.text, hl, true)}</div>
    <div class="sub">${MODUL[fachFuerThema(v.thema)].kurz} · ${esc(THEMA[v.thema].titel)} · ${typBezeichnung(f)}</div></span><span class="chev">${ic("play", "klein fill")}</span></button>`).join(""));
  if (!zitat) html += normHtml;
  if (konten.length) html += gruppe("Konten", konten.map(({ k }) => `<button class="zeile" data-a="kontoDetail" data-v="${k.id}">
    <span class="grow">${markiere(k.name, hl)}</span><span class="badge art-${k.art}">${k.artKurz}</span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join(""));
  return html || `<div class="leer-zustand">${ic("suche")}<div><b>Nichts gefunden</b></div><div class="sub">Versuch es mit einem anderen Begriff, z. B. „Skonto“, „Bundesrat“ oder „Art. 63“.</div></div>`;
}

// ======================= Tab: Lernen (Modulseite) =======================
function tabLernen() {
  const m = MODUL[state.fach], ids = idsImTeil(state.fach);
  const z = themenImTeil(state.fach).map((t) => zaehler(t.id)).reduce((a, x) => ({ b: a.b + x.b, r: a.r + x.r }), { b: 0, r: 0 });
  const gemeistert = ids.filter((id) => stat.lern[id]?.fach >= 3).length;
  const due = faelligImTeil(state.fach);
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
  const mkFaellig = MK.faelligeKarten(meine(), state.fach).length;
  if (mkFaellig) heute += `<button class="kachel breit" data-a="meineLernen" data-v="faellig"><span class="k-icon">${ic("karten")}</span>
      <span class="grow"><b>${mkFaellig} ${mkFaellig === 1 ? "eigene Karteikarte" : "eigene Karteikarten"} fällig</b><div class="sub">Umdrehen, bewerten – dauert nur kurz</div></span><span class="rechts">${ic("pfeil")}</span></button>`;
  const kachel = (a, icon, titel, text, v = "") => `<button class="kachel" data-a="schnell" data-v="${a}" data-t="${v}"><span class="k-icon">${ic(icon)}</span><span class="k-text"><b>${titel}</b><span class="sub">${esc(text)}</span></span></button>`;
  const paareKachel = PAARE[state.fach] ? `<button class="kachel" data-a="paareStart"><span class="k-icon">${ic("karten")}</span><span class="k-text"><b>Paare finden</b><span class="sub">Klausurnormen und ihre Bedeutung</span></span></button>` : "";
  const schnell = state.fach === "oer"
    ? kachel("qa", state.oerModus === "mc" ? "haken" : "stift", state.oerModus === "mc" ? "Multiple Choice" : "Frage – Antwort", "75 % der Klausur") +
      kachel("uebertragung", "diagramm", "Übertragung", "Grafiken auswerten · 25 %") +
      kachel("alles", "mischen", "Gemischt", "Quer durch das Skript") + paareKachel
    : state.fach === "est"
    ? `<button class="kachel" data-a="punktesammler"><span class="k-icon">${ic("ziel")}</span><span class="k-text"><b>Punkte sammeln</b><span class="sub">Klausursätze zum Auswendiglernen</span></span></button>` +
      kachel("rechnen", "tkonto", "Rechnen", "Tarif, WK, Entfernungspauschale") +
      kachel("fall", "lernen", "Fälle einordnen", "Steuerpflicht, § 11, Einkunftsart") +
      kachel("qa", state.oerModus === "mc" ? "haken" : "stift", state.oerModus === "mc" ? "Multiple Choice" : "Frage – Antwort", "Definitionen und Klausurfälle") +
      kachel("alles", "mischen", "Gemischt", "Quer durch alle Themen") + paareKachel
    : state.fach === "ust"
    ? kachel("rechnen", "tkonto", "Rechnen", "USt, BMG, Anzahlung, Vorsteuer") +
      kachel("fall", "lernen", "Fälle einordnen", "Ort, Befreiung, Steuersatz, VAZ") +
      kachel("qa", state.oerModus === "mc" ? "haken" : "stift", state.oerModus === "mc" ? "Multiple Choice" : "Frage – Antwort", "Prüfschema und Klausurfälle") +
      kachel("alles", "mischen", "Gemischt", "Quer durch alle Themen") + paareKachel
    : kachel("buchung", "tkonto", "Buchungssätze", "Immer neue Beträge") +
      kachel("alles", "mischen", "Gemischt", "Buchen, Rechnen, Theorie") + paareKachel;
  const breit = (schnell.match(/class="kachel/g) || []).length % 2 === 0 ? " breit" : ""; // letzte Kachel füllt die Reihe auf
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
    ${(() => { const e = termineDerRolle().find((x) => x.fach === state.fach); return e ? `<button class="countdown-chip" data-a="termine">${ic("kalender", "klein")} ${esc(e.titel || "Klausur")} ${countdownText(e.tage)} · ${new Date(e.datum + "T12:00").toLocaleDateString("de-DE")}</button>` : ""; })()}
    ${modusSchalter()}
    <div class="gruppe"><div class="gruppe-titel">Heute</div><div class="kachel-grid">${heute}</div></div>
    ${pfadKachel()}
    ${kompaktKachel()}
    <div class="gruppe"><div class="gruppe-titel">Schnellstart</div><div class="kachel-grid">${schnell}${schwachKachel}</div></div>
    <div class="gruppe"><div class="gruppe-titel">${{ oer: "Themen · Skript Kapitel 1–2", est: "Themen · Skripte & Folien", ust: "Themen · Skript & Klausurtechnik" }[state.fach] || { 1: "Themen · Skript Teil I", 2: "Themen · Skript Teil II", beide: "Themen · Skript Teil I und II" }[state.bilrTeil]}<span class="sub" style="text-transform:none;letter-spacing:0">${themenImTeil(state.fach).length} Themen</span></div>
      <div class="filter-suche"><input type="search" id="themenFilter" data-fokus="themenFilter" placeholder="Thema filtern …" autocomplete="off" value="${esc(state.themenFilter)}"></div>
      <div id="themenListe">${themenListe()}</div></div>
    ${lernkarteiView()}`;
}

function themenListe() {
  const q = norma(state.themenFilter.trim());
  const liste = themenImTeil(state.fach).filter((t) => !q || norma(`${t.titel} ${t.unter}`).includes(q));
  if (!liste.length) return `<div class="leer-zustand" style="padding:20px">${ic("suche")}<div class="sub">Kein Thema gefunden.</div></div>`;
  return `<div class="themen-karten">${liste.map((t, i) => {
    const z = zaehler(t.id), q2 = quote(z), n = vorlagenFuer(t.id).length, p = Math.round(q2 * 100);
    const status = z.b ? `<span class="tk-status" style="--farbe:${farbe(q2)}">${p} %</span>` : `<span class="tk-status neu">neu</span>`;
    const lesen = KOMPAKT[t.id] ? `<button class="tk-lesen${stat.kompakt[t.id] ? " gelesen" : ""}" data-a="kompakt" data-v="${t.id}" aria-label="Zusammenfassung ${esc(t.titel)}">${stat.kompakt[t.id] ? ic("haken", "klein") : ic("akte", "klein")}Überblick</button>` : "";
    return `<div class="themen-karte${z.b ? "" : " frisch"}" style="--farbe:${z.b ? farbe(q2) : "var(--m)"};--i:${Math.min(i, 12)}">
      <span class="tk-icon">${t.icon}<i>${i + 1}</i></span>
      <span class="tk-text"><button class="tk-haupt" data-a="thema" data-v="${t.id}"><b>${esc(t.titel)}</b></button><span class="sub">${esc(t.unter)}</span>
        <span class="tk-fuss"><span class="tk-balken"><span style="width:${z.b ? Math.max(p, 4) : 0}%"></span></span><span class="tk-n">${n} Aufgaben</span></span></span>
      <span class="tk-rechts">${status}${lesen}</span></div>`;
  }).join("")}</div>`;
}

/** Umschalter Frage-Antwort / Multiple Choice (ÖR und ESt). */
function modusSchalter() {
  if (state.fach === "bsr") return teilSchalter();
  if (state.fach === "bbf") return "";
  const m = [["mc", "haken", "Multiple Choice"], ["qa", "stift", "Frage – Antwort"]];
  return `<div class="gruppe"><div class="gruppe-titel">Antwortmodus</div><div class="modus-karte"><div class="segment">${m.map(([id, i, t]) =>
    `<button data-a="oerModus" data-v="${id}" class="${state.oerModus === id ? "aktiv" : ""}">${ic(i, "klein")}${t}</button>`).join("")}</div>
    <div class="gruppe-fuss">${state.oerModus === "mc"
      ? "Ankreuzen statt formulieren – oft sind mehrere Antworten richtig. Ideal für unterwegs: lange Klausurfälle werden hier ausgelassen."
      : "Antwort selbst formulieren wie in der Klausur – automatisch geprüft nach Norm und Kernbegriffen, mit Musterantwort und Normzitat."}</div></div></div>`;
}

// ======================= Kompaktwissen =======================
/** Themen eines Moduls mit Zusammenfassung (bei BilR im gewählten Teil). */
const kompaktThemen = (fach) => themenImTeil(fach).filter((t) => KOMPAKT[t.id]);

function kompaktEbene() {
  const { id, fach, ausSitzung } = state.kompakt;
  const themen = kompaktThemen(fach).length ? kompaktThemen(fach) : themenFuer(fach).filter((t) => KOMPAKT[t.id]);
  if (!id) return bibliothekView(fach, themen, { ic, gelesen: stat.kompakt });
  const i = themen.findIndex((t) => t.id === id);
  return kompaktView(id, { ic, thema: THEMA[id], nachbarn: [themen[i - 1], themen[i + 1]], gelesen: stat.kompakt, ausSitzung, alsKarte: alsKarteKnopf });
}

/** Einstieg ins Kompaktwissen auf der Modulseite. */
function kompaktKachel() {
  const themen = kompaktThemen(state.fach);
  if (!themen.length) return "";
  const n = gelesenAnteil(themen, stat.kompakt);
  const naechstes = themen.find((t) => !stat.kompakt[t.id]);
  return `<div class="kompakt-kachel">
    <button class="kk-haupt" data-a="kompaktListe">
      <span class="kk-blatt" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="kk-text"><b>Kompaktwissen</b><span>${themen.length} Zusammenfassungen mit Klausurschwerpunkten${n ? ` · ${n} gelesen` : ""}</span></span>
      <span class="kk-pfeil">${ic("pfeil")}</span></button>
    ${naechstes ? `<button class="kk-weiter" data-a="kompakt" data-v="${naechstes.id}">${n ? "Weiterlesen" : "Erstes Thema lesen"}: ${esc(naechstes.titel)} · ${lesezeit(KOMPAKT[naechstes.id])} Min.</button>` : ""}
  </div>`;
}

/** Einstieg in den Lernpfad-Modus (nur Module mit Lernpfad). */
function pfadKachel() {
  const schluessel = pfadSchluessel(state.fach, teilVon(state.fach));
  if (!PFADE[schluessel]) return "";
  const st = pfadStand(schluessel);
  return `<button class="pfad-kachel" data-a="pfadOeffnen"><span class="pk-glanz"></span>
    <span class="pk-text"><span class="pk-neu">Neu · eigener Modus</span><b>Lernpfad${state.fach === "bsr" && state.bilrTeil !== "beide" ? ` · Teil ${state.bilrTeil === "1" ? "I" : "II"}` : ""}</b><span>${st.fertig ? `${st.fertig} von ${st.gesamt} Blöcken · ★ ${st.sterne}` : `${st.gesamt} Blöcke – Stoff Schritt für Schritt aufbauen`}</span></span>
    <span class="pk-orbit">${PFADE[schluessel].bloecke.slice(0, 3).map((x) => `<i>${x.icon}</i>`).join("")}</span></button>`;
}

/** Bilanzrecht: Teil I (bis Dezember), Teil II oder beide wie in der Klausur. */
function teilSchalter() {
  const m = [["1", "Teil I"], ["2", "Teil II"], ["beide", "Beide"]];
  const fuss = { 1: "Teil I – Buchführung: Buchführungspflicht, Inventur und Bilanz, Konten, Warenverkehr, Umsatzsteuer, Abschluss, Kalkulation (Skript Teil I).", 2: "Teil II – Bilanzierung und Bewertung: Zurechnung, Anschaffungskosten, Grundstücke, AfA und GWG, Teilwert, Rechnungsabgrenzung, Entnahmen und Einlagen (Skript Teil II).", beide: "Beide Teile – wie in der Semesterklausur: Klausur mit ca. 25 % Teil I und 75 % Teil II." }[state.bilrTeil];
  return `<div class="gruppe"><div class="gruppe-titel">Skript</div><div class="modus-karte"><div class="segment">${m.map(([id, t]) =>
    `<button data-a="bilrTeil" data-v="${id}" class="${state.bilrTeil === id ? "aktiv" : ""}">${t}</button>`).join("")}</div>
    <div class="gruppe-fuss">${fuss}</div></div></div>`;
}

/** Verteilung der Aufgaben auf die Fächer der Lernkartei. */
function lernkarteiView() {
  const ids = idsImTeil(state.fach);
  const n = Array(FAECHER_MAX + 1).fill(0);
  ids.forEach((id) => { n[stat.lern[id]?.fach || 0] += 1; });
  const max = Math.max(1, ...n.slice(1));
  return `<div class="gruppe"><div class="gruppe-titel">Lernkartei · Langzeitgedächtnis</div><div class="liste"><div style="padding:16px">
    <div class="kartei">${n.slice(1).map((k, i) => `<div class="kartei-fach"><div class="kartei-saeule"><span style="height:${Math.round((k / max) * 100)}%"></span></div>
      <b class="mono">${k}</b><div class="sub">Fach ${i + 1}</div><div class="sub" style="font-size:11.5px">${INTERVALLE[i + 1]} ${INTERVALLE[i + 1] === 1 ? "Tag" : "Tage"}</div></div>`).join("")}</div>
    <div class="sub" style="margin-top:10px">${n[0]} von ${ids.length} Aufgaben noch nie beantwortet · ${faelligImTeil(state.fach).length} heute fällig</div></div></div>
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
      : state.fach === "est" || state.fach === "ust"
      ? "Ca. 50 % Rechenaufgaben mit immer neuen Zahlen, dazu Einordnungsfälle und Frage-Antwort. Auswertung erst nach der Abgabe."
      : state.fach === "bbf"
      ? "Wie die Semesterklausur FTA I: Schwerpunkt Buchungssätze (ca. 60 %), dazu Wissensfragen, Inventur, AfA und Betriebsvermögensvergleich. Auswertung erst nach der Abgabe."
      : { 1: "Teil I: Buchführung mit Schwerpunkt Buchungssätze (ca. 60 %), dazu Rechnen und Theorie. Auswertung erst nach der Abgabe.",
          2: "Teil II: Bilanzierung und Bewertung – ca. 40 % Buchungssätze, dazu Berechnungen und Würdigung. Auswertung erst nach der Abgabe.",
          beide: "Wie die Semesterklausur: ca. 25 % Teil I (Buchführung) und 75 % Teil II (Bilanzierung und Bewertung). Auswertung erst nach der Abgabe." }[state.bilrTeil])}
    ${modusSchalter()}
    ${KLAUSURPLAN[state.fach] ? `<button class="km-vorher" data-a="kompaktListe"><span class="km-vorher-icon">${ic("akte")}</span>
      <span class="grow"><b>Vor der Klausur</b><span class="sub">Aufbau, Schwerpunkte und alle Zusammenfassungen zum Wiederholen</span></span>${ic("pfeil", "klein")}</button>` : ""}
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

// ======================= Eigene Karteikarten =======================
// Selbst schreiben oder mit „+ Als Karte“ aus Aufgaben, Kompaktwissen, Normen und Lernpfad übernehmen (meinekarten.js).
const meine = () => (stat.meineKarten ||= {});
/** Kartentext: **fett** als Textmarker, Normzitate antippbar, Zeilenumbrüche bleiben. */
const kartenText = (t) => kompaktInline(t).replace(/\n/g, "<br>");
/** In Listen, die selbst angetippt werden: Normzitate nur hervorheben, nicht verlinken. */
const ohneLinks = (html) => html.replace(/<span class="km-norm"[^>]*>(.*?)<\/span>/g, "<b>$1</b>");
/** Knopf „+ Als Karte“ – quelle bestimmt, woraus der Entwurf entsteht (siehe AKTIONEN.alsKarte). */
const alsKarteKnopf = (quelle, v = "", kl = "") => `<button class="als-karte ${kl}" data-a="alsKarte" data-q="${quelle}" data-v="${esc(v)}" aria-label="Als Karteikarte speichern" title="Als Karteikarte speichern">${ic("plus", "klein")}<span>Als Karte</span></button>`;
/** Aufgabe → Karte: Vorderseite Aufgabentext, Rückseite Lösung (mit Erklärung). */
function karteAusFrage(f) {
  const vorne = (f.fall ? "Klausurfall: " : "") + f.text;
  let hinten = "";
  if (f.typ === "offen") hinten = f.antwort;
  else if (f.typ === "zahl") hinten = "Lösung: " + loesungText(f);
  else if (f.typ === "auswahl") hinten = f.richtig.map((i) => "✓ " + f.optionen[i]).join("\n");
  else if (f.typ === "buchung") {
    const l = f.loesungen[0];
    hinten = l.soll.map(([k, c]) => `${K(k).name} ${G.text(c)}`).join("\n") + "\n" + l.haben.map(([k, c]) => `an ${K(k).name} ${G.text(c)}`).join("\n");
  }
  if (f.erklaerung && f.typ !== "offen") hinten += "\n\n" + f.erklaerung;
  return { v: vorne, h: hinten, f: fachFuerThema(f.thema), q: THEMA[f.thema].titel };
}
/** Zuletzt falsch beantwortete Aufgaben des Moduls – ohne Grafikaufgaben. */
function fehlerKarten(fach) {
  return idsImTeil(fach).filter((id) => stat.lern[id]?.falsch).map((id) => ALLE.find((v) => v.id === id).erzeugen(new Zufall(1)))
    .filter((f) => !f.grafik).map((f) => ({ id: f.id, fehler: true, thema: f.thema, ...karteAusFrage(f) }));
}
function karteOeffnen(entwurf) {
  // Aus einem anderen Blatt (Gesetzestext, Stapel) geöffnet: Schließen führt dorthin zurück
  const zurueck = state.sheet && state.sheet.art !== "karteEdit" ? state.sheet : null;
  state.sheet = { art: "karteEdit", e: { f: state.fach, st: lies("bsr.stapel", MK.STANDARD_STAPEL), ...entwurf }, um: false, zurueck };
  render();
}
/** Karteneditor: Vorder- und Rückseite, Stapel (vorhandene als Chips), Vorschau zum Umdrehen. */
function karteEditView(sh) {
  const e = sh.e, stapel = MK.stapelVon(meine(), e.f).map((s) => s.name);
  if (!stapel.includes(MK.STANDARD_STAPEL)) stapel.unshift(MK.STANDARD_STAPEL);
  return `<div class="mk-editor">
    ${e.q ? `<div class="mk-quelle">${ic("akte", "klein")} Aus: ${esc(e.q)}</div>` : ""}
    <label class="mk-feld"><span>Vorderseite <small>Frage oder Stichwort</small></span>
      <textarea class="offen-eingabe mk-text" id="kVorne" data-fokus="kVorne" rows="3" maxlength="2000" placeholder="z. B. Wann gilt das Witwensplitting?">${esc(e.v || "")}</textarea></label>
    <label class="mk-feld"><span>Rückseite <small>Antwort mit Norm</small></span>
      <textarea class="offen-eingabe mk-text" id="kHinten" data-fokus="kHinten" rows="5" maxlength="2000" placeholder="z. B. Im Jahr nach dem Tod des Ehegatten (§ 32a Abs. 6 S. 1 Nr. 1 EStG).">${esc(e.h || "")}</textarea></label>
    <div class="mk-tipp">**Wort** wird zum Textmarker · Paragrafen wie „§ 26 EStG“ werden antippbar.</div>
    <div class="mk-feld"><span>Stapel</span>
      <div class="chip-reihe mk-stapel-chips">${stapel.map((s) => `<button class="chip ${e.st === s ? "aktiv" : ""}" data-a="karteStapel" data-v="${esc(s)}">${esc(s)}</button>`).join("")}</div>
      <input class="offen-eingabe mk-stapel-input" id="kStapel" data-fokus="kStapel" maxlength="40" placeholder="Neuer Stapel, z. B. Fristen" value="${stapel.includes(e.st) ? "" : esc(e.st)}" autocomplete="off"></div>
    <div class="mk-feld"><span>Vorschau <small>antippen zum Umdrehen</small></span>
      <div class="mk-vorschau" id="kVorschau">${kartenVorschau(e, sh.um)}</div></div>
    <div class="mk-aktionen">
      <button class="knopf" id="kSpeichern" data-a="karteSpeichern" ${MK.entwurfOk(e) ? "" : "disabled"}>${ic("haken")} ${e.id ? "Änderungen speichern" : "Karte speichern"}</button>
      ${e.id ? `<button class="knopf zweit rot-text" data-a="karteLoeschen" data-v="${e.id}">${ic("muell")} Karte löschen</button>` : ""}
    </div></div>`;
}
const kartenVorschau = (e, um) => `<div class="mk-mini ${um ? "um" : ""}" data-a="karteVorschauDrehen" role="button" tabindex="0" aria-label="Vorschau umdrehen">
    <div class="mk-mini-seite"><em>Vorne</em><div>${e.v ? kartenText(e.v) : `<span class="sub">Vorderseite …</span>`}</div></div>
    <div class="mk-mini-seite rueck"><em>Hinten</em><div>${e.h ? kartenText(e.h) : `<span class="sub">Rückseite …</span>`}</div></div></div>`;

/** Stapel ansehen: alle Karten als kleine Doppelkarten (vorne | hinten), antippen zum Bearbeiten. */
function stapelView(name) {
  const ks = MK.kartenVon(meine(), state.fach).filter((k) => k.st === name).sort((a, b) => a.e - b.e); // Reihenfolge wie angelegt bzw. importiert
  if (!ks.length) return `<div class="leer-zustand">${ic("karten")}<div><b>Der Stapel ist leer</b></div></div>`;
  const faellig = ks.filter((k) => MK.istFaellig(k)).length;
  return `<div class="kachel-grid" style="margin-bottom:14px">
      <button class="kachel" data-a="meineLernen" data-v="${esc("st:" + name)}"><span class="k-icon">${ic("play", "fill")}</span><span class="k-text"><b>Alle lernen</b><span class="sub">${ks.length} Karten</span></span></button>
      <button class="kachel" data-a="meineLernen" data-v="${esc("sf:" + name)}" ${faellig ? "" : "disabled"}><span class="k-icon" style="background:var(--warn-weak);color:var(--warn)">${ic("wiederholen")}</span><span class="k-text"><b>Fällige</b><span class="sub">${faellig} Karten</span></span></button></div>
    <div class="mk-liste">${ks.map((k) => `<button class="mk-karte" data-a="karteBearbeiten" data-v="${k.id}" aria-label="Karte bearbeiten">
      <span class="mk-vorne">${ohneLinks(kartenText(k.v))}</span><span class="mk-hinten">${ohneLinks(kartenText(k.h))}</span>
      <span class="mk-fach" title="Lernkartei-Fach">${leitnerPunkte(k.l?.fach || 0)}</span></button>`).join("")}</div>`;
}
const leitnerPunkte = (n) => Array.from({ length: FAECHER_MAX }, (_, i) => `<i class="${i < n ? "an" : ""}"></i>`).join("");

/** Export und Import der eigenen Karten (Datei zum Sichern, Weitergeben oder für Anki). */
function kartenIoView() {
  const n = MK.kartenVon(meine(), state.fach).length, alle = MK.kartenVon(meine()).length;
  return `<div class="gruppe" style="margin-top:4px"><div class="gruppe-titel">Exportieren</div><div class="liste">
      <button class="zeile" data-a="kartenExport" data-v="json" ${alle ? "" : "disabled"}><span class="symbol">${ic("export")}</span><span class="grow"><b>Als Datei sichern oder teilen</b><div class="sub">Alle ${alle} eigenen Karten (.json) – kann in der App wieder importiert werden, auch von anderen.</div></span></button>
      <button class="zeile" data-a="kartenExport" data-v="anki" ${n ? "" : "disabled"}><span class="symbol">${ic("karten")}</span><span class="grow"><b>Für Anki & Co.</b><div class="sub">${n} Karten aus ${esc(MODUL[state.fach].titel)} als Textdatei (Vorderseite ⇥ Rückseite).</div></span></button>
    </div></div>
    <div class="gruppe"><div class="gruppe-titel">Importieren</div><div class="liste">
      <label class="zeile mk-datei"><span class="symbol">${ic("plus")}</span><span class="grow"><b>Datei auswählen</b><div class="sub"><b>Goodnotes-Lernset</b> (.goodnotes, getippter Text), .json aus dieser App oder Text/CSV mit Vorderseite und Rückseite je Zeile (getrennt durch Tab oder Semikolon). Neue Karten landen in ${esc(MODUL[state.fach].titel)}.</div></span>
        <input type="file" id="kImport" hidden></label>
    </div></div>
    <div class="gruppe-fuss" style="margin:0 4px 8px"><b>Aus Goodnotes:</b> Lernset öffnen → Teilen → Exportieren → „In Dateien sichern“, dann hier die .goodnotes-Datei auswählen. Übernommen wird getippter Text; der Stapel heißt wie das Lernset.</div>
    <div class="gruppe-fuss" style="margin:0 4px 20px">Doppelte Karten (gleicher Text) werden beim Import übersprungen. Der Lernstand wird nicht mit exportiert.</div>`;
}
function dateiSpeichern(name, inhalt, typ) {
  const datei = new File([inhalt], name, { type: typ });
  if (navigator.canShare?.({ files: [datei] })) { navigator.share({ files: [datei], title: name }).catch(() => {}); return; }
  const url = URL.createObjectURL(datei), a = document.createElement("a");
  a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ======================= Tab: Karten =======================
function meineKartenBereich() {
  const m = meine(), alle = MK.kartenVon(m, state.fach), faellig = MK.faelligeKarten(m, state.fach), stapel = MK.stapelVon(m, state.fach);
  const fehler = fehlerKarten(state.fach).length;
  const stapelHtml = stapel.length ? `<div class="mk-stapel-wahl">${stapel.map((s) => `<button class="mk-stapel" data-a="stapelOeffnen" data-v="${esc(s.name)}">
      <span class="mk-st-blatt" aria-hidden="true"></span><span class="mk-st-blatt" aria-hidden="true"></span>
      <span class="mk-st-inhalt"><b>${esc(s.name)}</b><span class="sub">${s.n} ${s.n === 1 ? "Karte" : "Karten"}</span>
        <span class="mk-st-fuss"><span class="tk-balken"><span style="width:${(s.gelernt / s.n) * 100}%"></span></span>${s.faellig ? `<span class="mk-faellig">${s.faellig} fällig</span>` : `<span class="mk-ok">${ic("haken", "klein")}</span>`}</span></span></button>`).join("")}</div>`
    : `<div class="mk-leer"><div class="mk-leer-karten" aria-hidden="true"><span>§</span><span>?</span></div>
        <div><b>Noch keine eigenen Karten</b><div class="sub">Schreib eine Karte oder tippe bei Aufgaben, im Kompaktwissen, in Gesetzestexten und im Lernpfad auf <b>„+ Als Karte“</b>.</div></div></div>`;
  return `<section class="mk-bereich">
    <div class="gruppe-titel">Meine Karten <span class="sub" style="text-transform:none;letter-spacing:0">${alle.length ? `${alle.length} · Lernkartei 1–3–7–16–35 Tage` : ""}</span></div>
    <div class="kachel-grid">
      <button class="kachel" data-a="meineLernen" data-v="faellig" ${faellig.length ? "" : "disabled"}><span class="k-icon" style="${faellig.length ? "background:var(--warn-weak);color:var(--warn)" : ""}">${ic("wiederholen")}</span><span class="k-text"><b>${faellig.length ? `${faellig.length} fällig` : "Nichts fällig"}</b><span class="sub">${faellig.length ? "Jetzt wiederholen" : alle.length ? "Alles im Plan" : "Erst Karten anlegen"}</span></span></button>
      <button class="kachel" data-a="karteNeu"><span class="k-icon">${ic("karteNeu")}</span><span class="k-text"><b>Neue Karte</b><span class="sub">Selbst schreiben</span></span></button>
    </div>
    ${fehler ? `<button class="kachel breit mk-fehler" data-a="fehlerLernen" style="margin-top:10px"><span class="k-icon" style="background:var(--err-weak);color:var(--err)">${ic("ziel")}</span>
      <span class="grow"><b>Meine Fehler</b><div class="sub">${fehler} falsch beantwortete ${fehler === 1 ? "Aufgabe" : "Aufgaben"} als Karten</div></span><span class="rechts">${ic("pfeil")}</span></button>` : ""}
    ${stapelHtml}
    <button class="link-klein mk-io" data-a="kartenIO">${ic("export", "klein")} Exportieren / Importieren</button>
  </section>`;
}
function tabKarten() {
  const LERNKARTEN = kartenImTeil(state.fach);
  const gewusst = new Set(stat.karten);
  const offen = LERNKARTEN.filter((k) => !gewusst.has(k.id));
  const themen = themenImTeil(state.fach).filter((t) => LERNKARTEN.some((k) => k.thema === t.id));
  const p = Math.round(((LERNKARTEN.length - offen.length) / LERNKARTEN.length) * 100);
  return `
    ${seitenKopf("Karteikarten", "Eigene Karten und fertige Lernkarten – Vorderseite lesen, umdrehen, ehrlich bewerten.")}
    ${meineKartenBereich()}
    <div class="gruppe-titel" style="margin-top:22px">Fertige Lernkarten <span class="sub" style="text-transform:none;letter-spacing:0">${buchungsFach(state.fach) ? "Merksätze, Definitionen, Fristen" : "Frage – Musterantwort"}</span></div>
    ${state.fach === "bsr" ? teilSchalter() : ""}
    <div class="kachel-grid">
      <button class="kachel" data-a="deck" data-v="alle"><span class="k-icon">${ic("mischen")}</span><span class="k-text"><b>Alle mischen</b><span class="sub">${LERNKARTEN.length} Karten</span></span></button>
      <button class="kachel" data-a="deck" data-v="offen" ${offen.length ? "" : "disabled"}><span class="k-icon" style="background:var(--warn-weak);color:var(--warn)">${ic("ziel")}</span><span class="k-text"><b>Noch nicht gewusst</b><span class="sub">${offen.length} Karten</span></span></button>
    </div>
    <div class="liste" style="margin-top:12px"><div class="zeile"><span class="grow"><div style="display:flex;justify-content:space-between"><b>Gewusst</b><span class="sub mono">${LERNKARTEN.length - offen.length}/${LERNKARTEN.length}</span></div>
      <div class="balken"><span class="gut" style="width:${p}%"></span></div></span></div></div>
    <div class="gruppe"><div class="gruppe-titel">Themen auswählen ${state.kartenThemen.size ? `<button class="link-klein" data-a="kartenKeine">Auswahl aufheben</button>` : `<button class="link-klein" data-a="kartenAlle">Alle</button>`}</div><div class="stapel-wahl">
      ${themen.map((t) => {
        const ks = LERNKARTEN.filter((k) => k.thema === t.id), an = state.kartenThemen.has(t.id), g = ks.filter((k) => gewusst.has(k.id)).length;
        return `<button class="stapel${an ? " an" : ""}" data-a="kartenThema" data-v="${t.id}" aria-pressed="${an}"><span class="st-icon">${t.icon}</span>
          <b>${esc(t.titel)}</b><span class="st-fuss"><span class="tk-balken"><span style="width:${ks.length ? (g / ks.length) * 100 : 0}%"></span></span><span class="tk-n">${g}/${ks.length}</span></span>
          <span class="st-haken">${ic("haken", "klein")}</span></button>`;
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
  return `${seitenKopf("Nachschlagen")}${segment}${kompaktZeile()}${kontenInhalt()}`;
}

/** Zeile „Kompaktwissen“ in Nachschlagen/Normen. */
function kompaktZeile() {
  const themen = kompaktThemen(state.fach);
  if (!themen.length) return "";
  return `<button class="km-vorher" data-a="kompaktListe" style="margin-bottom:12px"><span class="km-vorher-icon">${ic("akte")}</span>
    <span class="grow"><b>Kompaktwissen</b><span class="sub">${themen.length} Zusammenfassungen · ${gelesenAnteil(themen, stat.kompakt)} gelesen</span></span>${ic("pfeil", "klein")}</button>`;
}

function kontenInhalt() {
  return `
    <div class="filter-suche"><input type="search" id="kontoTabSuche" data-fokus="kontoTabSuche" placeholder="Konto suchen, z. B. Vorsteuer" autocomplete="off" value="${esc(state.kontoSuche)}"></div>
    <div class="liste"><button class="zeile" data-a="merksaetze"><span class="symbol">💡</span><span class="grow"><b>Merksätze zum Buchen</b><div class="sub">Soll an Haben, Aktiv/Passiv, Nettomethode …</div></span><span class="chev">${ic("pfeil", "klein")}</span></button></div>
    <div id="kontoTabListe">${kontoListe("kontoDetail")}</div>`;
}

const GESETZE = {
  oer: [["GG", "Grundgesetz (GG)"], ["BWahlG", "Bundeswahlgesetz (BWahlG)"], ["PartG", "Parteiengesetz (PartG)"]],
  bsr: [["HGB", "Handelsgesetzbuch (HGB)"], ["AO", "Abgabenordnung (AO)"], ["EStG", "Einkommensteuergesetz (EStG)"], ["EStDV", "Einkommensteuer-Durchführungsverordnung (EStDV)"], ["UStG", "Umsatzsteuergesetz (UStG)"], ["BGB", "Bürgerliches Gesetzbuch (BGB)"]],
  est: [["EStG", "Einkommensteuergesetz (EStG)"], ["EStR", "Einkommensteuer-Richtlinien (EStR)"], ["AO", "Abgabenordnung (AO)"], ["BGB", "Bürgerliches Gesetzbuch (BGB)"]],
  ust: [["UStG", "Umsatzsteuergesetz (UStG)"]],
};
/** Paragrafen in Gesetzesreihenfolge (§ 3 vor § 3a vor § 4); Präambel und Nummern ohne Ziffer zuerst. */
const nrKey = (nr) => { const m = String(nr).match(/^(\d+)(.*)$/); return m ? [Number(m[1]), m[2]] : [-1, String(nr)]; };
const nrVergleich = (a, b) => { const [x, xs] = nrKey(a.nr), [y, ys] = nrKey(b.nr); return x - y || xs.localeCompare(ys); };
const normenVon = (fach) => NORMEN.filter((n) => n.faecher.includes(fach)).sort(nrVergleich);
/** Gesetze eines Moduls, deren Text in der App vorliegt. */
const gesetzeFuer = (fach) => (GESETZE[fach] || []).filter(([g]) => normenVon(fach).some((n) => n.g === g));

function normenListe() {
  const q = norma(state.normSuche.trim());
  const html = gesetzeFuer(state.fach).map(([g, titel]) => {
    const liste = normenVon(state.fach).filter((n) => n.g === g).filter((n) => !q || norma(`${n.nr} ${n.titel} ${n.abs.map((a) => a.text).join(" ")}`).includes(q)
      || norma(g === "GG" ? `art ${n.nr}` : g === "EStR" ? `r ${n.nr}` : `§ ${n.nr}`) === q || norma(g === "GG" ? `art. ${n.nr}` : `§${n.nr}`) === q);
    if (!liste.length) return "";
    return `<div class="gruppe"><div class="gruppe-titel">${titel}<span class="sub" style="text-transform:none;letter-spacing:0">${liste.length}</span></div><div class="liste">
      ${liste.map((n) => `<button class="zeile" data-a="normDetail" data-v="${n.g} ${n.nr}"><span class="symbol" style="font-size:14px;width:46px">${g === "GG" ? (n.nr === "Präambel" ? "Pr." : n.nr) : (g === "EStR" ? "R " : "§ ") + n.nr}</span><span class="grow"><div style="font-weight:600">${g === "GG" ? (n.nr === "Präambel" ? "Präambel" : "Art. " + n.nr) : (g === "EStR" ? "R " : "§ ") + n.nr}</div><div class="sub">${esc(n.titel && n.titel !== "Präambel" ? n.titel : n.abs[0]?.text.slice(0, 70) + " …")}${n.auszug ? " · Auszug" : ""}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>`).join("")}
    </div></div>`;
  }).join("");
  return html || `<div class="leer-zustand">${ic("suche")}<div><b>Keine Vorschrift gefunden</b></div></div>`;
}

function tabNormen() {
  return `
    ${seitenKopf("Normen", "Alle lehrplanrelevanten Vorschriften im Wortlaut – auch offline.")}
    ${kompaktZeile()}
    <div class="filter-suche"><input type="search" id="normSuche" data-fokus="normSuche" placeholder="${state.fach === "est" ? "Suchen, z. B. Entfernungspauschale, § 11, Wohnsitz" : state.fach === "ust" ? "Suchen, z. B. Vorsteuer, § 4, Kleinunternehmer" : "Suchen, z. B. Bundesrat, Art. 63, Wahlrecht"}" autocomplete="off" value="${esc(state.normSuche)}"></div>
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

/** Überschrift über Musterantwort/Erklärung – macht klar, dass hier erläutert und nicht das Gesetz zitiert wird. */
const erlKopf = (titel) => `<div class="loes-kopf erl"><span class="loes-ic" aria-hidden="true">✎</span><b>${titel}</b><span class="loes-tag">Erläuterung – kein Gesetzeswortlaut</span></div>`;

function normBlock(refs, kontext = "") {
  const ns = (refs || []).map(norm).filter(Boolean);
  if (!ns.length) return "";
  const zs = zitate(kontext);
  const bloecke = ns.map((n) => {
    // R 2 EStR: Schema als Grafik statt als Fließtext
    if (n.ref.startsWith("EStR 2")) return { treffer: false, html: `<details class="norm" open><summary>${esc(n.label)} <span class="sub">– ${esc(n.titel)}</span></summary>${r2View(n.ref.split(" ")[2], kompaktInline)}</details>` };
    const teile = n.absaetze.map((a) => absatzHtml(n, a, zs));
    const treffer = teile.some((t) => t.treffer);
    return { treffer, html: `<details class="norm"${ns.length <= 2 || treffer ? " open" : ""}><summary>${esc(n.label)}${n.titel ? ` <span class="sub">– ${esc(n.titel)}</span>` : ""}</summary>
    ${teile.map((t) => t.html).join("")}${n.auszug ? `<p class="sub">Auszug – weitere Absätze bzw. Nummern sind nicht abgedruckt.</p>` : ""}</details>` };
  });
  const legende = bloecke.some((x) => x.treffer) ? ` <span class="hl-legende">markiert = in der Aufgabe zitiert</span>` : "";
  return `<div class="normen"><div class="loes-kopf gesetz"><span class="loes-ic" aria-hidden="true">§</span><b>Gesetzestext</b><span class="loes-tag">Wortlaut</span>${legende}</div>${bloecke.map((x) => x.html).join("")}</div>`;
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
    fuss = `<span class="fb-warte">${taler("warte", { groesse: 52 })}</span><button class="knopf" id="offenKnopf" data-a="pruefen">${offenKnopfText(f, aktAntwort())}</button>`;
  } else if (f.typ === "offen" && !b) {
    feedback = `<div class="feedback" style="color:var(--text);font-size:16px"><span>Hast du es gewusst?<small>Ehrlich vergleichen – das steuert, wann die Frage wiederkommt.</small></span></div>`;
    fuss = `<button class="knopf rot" data-a="selbst" data-v="0">${ic("kreuz")} Nicht gewusst</button><button class="knopf gruen" data-a="selbst" data-v="1">${ic("haken")} Gewusst</button>`;
  } else if (!b) {
    fuss = `<span class="fb-warte">${taler("warte", { groesse: 52 })}</span><button class="knopf" id="pruefen" data-a="pruefen" ${istLeer(f, aktAntwort()) ? "disabled" : ""}>Prüfen</button>`;
  } else {
    const ok = b.korrekt;
    fussKlasse = ok ? "ok" : "err";
    const satz = (ok ? LOB : TROST)[(x.index + n) % (ok ? LOB.length : TROST.length)];
    // Die Show läuft nur beim ersten Zeichnen der Rückmeldung zu dieser Aufgabe
    const showKey = `${x.start}-${x.index}`, neu = state.talerShow !== showKey;
    state.talerShow = showKey;
    const xpInfo = b.plus ? `<span class="xp-chips"><span class="xp-chip${neu ? " neu" : ""}">+${b.plus} XP</span>${b.tagBonus ? `<span class="xp-chip">+${b.tagBonus} Tagesbonus</span>` : ""}${ok && b.serie >= XP.serieAb ? `<span class="xp-chip serie">${ic("flamme", "klein")}${b.serie} in Folge</span>` : ""}</span>` : "";
    feedback = `<div class="feedback">${talerBuehne(ok, { ruhig: !neu })}<span>${satz}${xpInfo}<small>${ok ? "Kommt in der Lernkartei ein Fach weiter." : "Die Lösung steht oben – morgen kommt die Aufgabe wieder."}</small></span></div>`;
    fuss = `<button class="knopf ${ok ? "gruen" : "rot"}" data-a="weiter">${x.index === n - 1 ? "Auswertung" : "Weiter"} ${ic("pfeil")}</button>`;
  }

  return `<div class="vollbild">
    <div class="vb-kopf"><button class="rund" data-a="beenden" aria-label="Beenden">${ic("kreuz")}</button>${mitte}${bewegungSchalter(true)}${rechts}</div>
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
  const html = auswertungInhalt(f, b);
  const x = s();
  if (x?.modus === "klausur" && !x.beendet) return html;
  const karte = f.grafik ? "" : `<div class="mk-aufgabe-fuss">${alsKarteKnopf("frage")}</div>`;
  const link = KOMPAKT[f.thema] ? `<button class="km-link" data-a="kompaktSitzung" data-v="${f.thema}">${ic("akte", "klein")}<span><b>Überblick: ${esc(THEMA[f.thema].titel)}</b><span class="sub">Das Wichtigste in ${lesezeit(KOMPAKT[f.thema])} Min. – danach geht es hier weiter</span></span></button>` : "";
  return html.replace(/<\/div><\/div>\s*$/, `${karte}${link}</div></div>`);
}
function auswertungInhalt(f, b) {
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
      ${erlKopf("Musterantwort")}
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
      ${erlKopf("Musterantwort")}
      <div class="erkl muster">${esc(f.antwort)}</div>
      ${f.erklaerung ? `<div class="erkl sub" style="margin-top:8px">${esc(f.erklaerung)}</div>` : ""}
      ${normBlock(f.normen, [f.text, f.antwort, f.erklaerung, f.quelle, f.zusatzZitate].join(" "))}
      ${b.korrekt === null ? `<div class="gruppe-fuss" style="margin:10px 0 0">Vergleiche mit deiner Antwort: Hast du die wesentlichen Punkte und die richtige Norm genannt?</div>` : ""}
    </div></div>`;
  }
  return `<div class="gruppe" id="auswertung"><div class="auswertung ${b.korrekt ? "" : "nein"}">
    <div class="urteil ${b.korrekt ? "ja" : "nein"}">${b.korrekt ? "✓ Richtig!" : "✗ Leider nicht richtig"}</div>
    ${extra}
    ${f.antwort || f.erklaerung ? erlKopf("Lösung") : ""}
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
        ${taler(q >= 0.7 ? "jubeln" : "mut", { groesse: 96, klasse: "erg-taler" })}
        <div class="ergebnis-titel">${q >= 0.9 ? "Hervorragend!" : q >= 0.7 ? "Gut gemacht!" : q >= 0.5 ? "Solide!" : "Weiter so!"}</div>
        <div class="sub" style="font-size:15px">${lob}</div>
      </div>
      <div class="statistik-reihe" style="margin-top:18px">
        <div class="stat-kachel"><div class="zahl" style="color:var(--ok)">${richtig}</div><div class="lbl">richtig</div></div>
        <div class="stat-kachel"><div class="zahl" style="color:var(--err)">${falsch}</div><div class="lbl">falsch</div></div>
        <div class="stat-kachel"><div class="zahl">${Math.floor(dauer / 60)}:${String(dauer % 60).padStart(2, "0")}</div><div class="lbl">Minuten</div></div>
      </div>
      ${x.duell ? duellErgebnis(x) : ""}
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
      ${x.duell ? `<button class="knopf" data-a="duellTeilen">${ic("export")} ${x.duell.gegner ? "Ergebnis senden" : "Herausfordern"}</button>`
        : `<button class="knopf" data-a="nochmal">${ic("wiederholen")} ${x.modus === "klausur" ? "Neue Klausur" : "Neue Runde"}</button>`}
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
  // Eigene Karten und „Meine Fehler“: Text mit Textmarker und antippbaren Normen; fertige Lernkarten wie bisher
  const reich = !!k.art;
  const kopf = k.art === "eigen" ? k.kopf : k.art === "fehler" ? "Meine Fehler · " + THEMA[k.thema].titel : THEMA[k.thema].titel;
  // Vorderseite: Normen nur hervorgehoben (Antippen dreht die Karte um), auf der Rückseite antippbar
  const vorne = reich ? ohneLinks(kartenText(k.vorne)) : esc(k.vorne), hinten = reich ? kartenText(k.hinten) : esc(k.hinten);
  const lang = k.vorne.length > 90;
  return `<div class="vollbild">
    <div class="vb-kopf"><button class="rund" data-a="deckZu" aria-label="Beenden">${ic("kreuz")}</button><div class="sitzung-fortschritt"><span style="width:${(d.index / d.karten.length) * 100}%"></span></div>
      ${k.art === "eigen" ? `<button class="rund" data-a="karteBearbeiten" data-v="${k.id}" aria-label="Karte bearbeiten">${ic("stift")}</button>` : ""}<span class="zaehler">${d.index + 1}/${d.karten.length}</span></div>
    <div class="vb-inhalt" style="display:flex;flex-direction:column">
      <div class="karte-buehne"><div class="karte ${d.um ? "um" : ""}" data-a="umdrehen">
        <div class="seite"><div class="klein">${esc(kopf)}</div><div class="${k.normen || lang ? "frage-gross" : "gross"}${reich && lang ? " links" : ""}">${vorne}</div><div class="sub" style="color:var(--text3);margin-top:24px">Tippen zum Umdrehen</div></div>
        <div class="seite rueck"><div class="klein">${reich ? esc(kopf) : esc(k.vorne)}</div><div class="mittel-t ${k.normen || reich ? "links" : ""}">${hinten}</div>
          ${k.normen?.length ? `<div class="sub" style="margin-top:12px">${k.normen.map((r) => norm(r)?.label).filter(Boolean).map(esc).join(" · ")}</div>` : ""}</div>
      </div></div>
      ${k.art === "fehler" ? `<div class="gruppe-fuss" style="text-align:center">„Gewusst“ holt die Aufgabe in der Lernkartei ein Fach weiter.</div>` : ""}
    </div>
    <div class="vb-fuss"><div class="reihe">${deckFuss(d.um)}</div></div></div>`;
}

// ======================= Spiel „Paare finden“ =======================
// 10 Normen links, 10 Kurzerklärungen rechts; passende Paare antippen. Drei Leben pro Runde.
const PAAR_ANZAHL = 10, PAAR_LEBEN = 3;
/** Antwort im Lernpfad auswerten: sofortiges Feedback mit Funken bzw. Wackeln. */
function pfadAntwort(eingabe, el) {
  const z = state.pfad?.block;
  if (!z || z.antwort) return;
  const b = PFADE[state.pfad.fach].bloecke.find((x) => x.id === z.id), q = b.fragen[z.schritt - b.karten.length - 1];
  const { ok } = auswerten(q, eingabe);
  z.antwort = { eingabe, ok };
  if (!ok) z.fehler += 1;
  if (ok) { const vorher = levelJetzt(); stat.xpBonus = (stat.xpBonus || 0) + XP.pfadFrage; belohnen(vorher); speichern(); }
  const pos = el ? mitte(el) : null;
  render();
  if (ok && pos) { funken(...pos); schwebeText(pos[0], pos[1] - 10, `+${XP.pfadFrage} XP`); }
  if (!ok) document.querySelector(".pf-frage")?.classList.add("wackeln");
}

function neuePaarRunde() {
  const r = new Zufall();
  const auswahl = r.mischen((PAARE[state.fach] || []).filter((p) => imTeil({ teil: p[2] }, teilVon(state.fach)))).slice(0, PAAR_ANZAHL).map(([norm, text], id) => ({ id, norm, text }));
  state.paare = { links: r.mischen(auswahl), rechts: r.mischen(auswahl), weg: [], leben: PAAR_LEBEN, serie: 0, wahl: null, start: Date.now(), ende: null, sperre: false, frisch: true };
}
function paareView() {
  const p = state.paare, n = p.links.length;
  const herzen = Array.from({ length: PAAR_LEBEN }, (_, i) => `<span class="herz${i < p.leben ? "" : " leer"}">${i < p.leben ? "♥" : "♡"}</span>`).join("");
  const kopf = `<div class="vb-kopf"><button class="rund" data-a="paareZu" aria-label="Beenden">${ic("kreuz")}</button>
    <div class="sitzung-fortschritt" aria-label="${p.weg.length} von ${n} Paaren"><span style="width:${(p.weg.length / n) * 100}%"></span></div>
    <span class="herzen" aria-label="${p.leben} Leben">${herzen}</span></div>`;
  if (p.ende) {
    const geschafft = p.weg.length === n, sek = Math.round((p.ende - p.start) / 1000);
    const rest = p.links.filter((k) => !p.weg.includes(k.id));
    const sterne = geschafft ? `<div class="sterne">${Array.from({ length: PAAR_LEBEN }, (_, i) => `<span class="stern${i < p.leben ? " an" : ""}" style="--i:${i}">★</span>`).join("")}</div>` : `<div style="font-size:60px">💔</div>`;
    return `<div class="vollbild">${geschafft ? konfetti() : ""}${kopf}
      <div class="vb-inhalt zentriert" style="display:flex;flex-direction:column"><div style="margin:auto 0">
        ${sterne}
        <div class="ergebnis-titel">${geschafft ? (p.leben === PAAR_LEBEN ? "Perfekt – ohne Fehler!" : "Alle Paare gefunden!") : "Keine Leben mehr"}</div>
        <p class="sub" style="font-size:15px">${geschafft ? `Mit ${p.leben} von ${PAAR_LEBEN} Leben übrig` : `${p.weg.length} von ${n} Paaren gefunden`} · ${Math.floor(sek / 60)}:${String(sek % 60).padStart(2, "0")} min</p>
        ${rest.length ? `<div class="liste" style="text-align:left;margin-top:8px"><div class="zeile"><span class="grow sub">Diese Paare fehlten noch:</span></div>${rest.map((k) => `<div class="zeile"><span class="grow"><b>${esc(k.norm)}</b><div class="sub">${esc(k.text)}</div></span></div>`).join("")}</div>` : ""}
        <button class="knopf" data-a="paareStart" style="max-width:300px;margin:16px auto 6px">${ic("wiederholen")} Neue Runde</button>
        <button class="link" data-a="paareZu">Fertig</button></div></div></div>`;
  }
  const karte = (seite, k, i) => {
    const weg = p.weg.includes(k.id), gewaehlt = p.wahl?.seite === seite && p.wahl.id === k.id;
    return `<button class="paar-karte ${seite}${weg ? " weg" : ""}${gewaehlt ? " gewaehlt" : ""}${p.frisch ? " neu" : ""}" style="--i:${i * 2 + (seite === "r" ? 1 : 0)}" data-a="paarWahl" data-v="${seite}:${k.id}" ${weg ? "disabled" : ""}>${esc(seite === "l" ? k.norm : k.text)}</button>`;
  };
  return `<div class="vollbild paar-spiel">${kopf}
    <div class="vb-inhalt">
      <div class="sub" style="text-align:center;margin:2px 0 10px">Tippe eine Norm und die passende Bedeutung an.</div>
      <div class="paar-feld"><div class="paar-spalte">${p.links.map((k, i) => karte("l", k, i)).join("")}</div><div class="paar-spalte">${p.rechts.map((k, i) => karte("r", k, i)).join("")}</div></div>
    </div></div>`;
}
const paarKarte = (seite, id) => document.querySelector(`[data-a="paarWahl"][data-v="${seite}:${id}"]`);
const mitte = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
/** Funkenregen an einer Bildschirmposition (liegt außerhalb von #app und überlebt daher das Neuzeichnen). */
function funken(x, y) {
  const ebene = document.createElement("div");
  ebene.className = "funken";
  ebene.style.left = x + "px"; ebene.style.top = y + "px";
  for (let i = 0; i < 16; i++) {
    const f = document.createElement("span"), w = (i / 16) * 2 * Math.PI + Math.random() * 0.4, d = 45 + Math.random() * 55;
    f.style.setProperty("--dx", `${Math.cos(w) * d}px`); f.style.setProperty("--dy", `${Math.sin(w) * d}px`);
    if (i % 3 === 0) f.classList.add("akzent");
    ebene.appendChild(f);
  }
  document.body.appendChild(ebene);
  setTimeout(() => ebene.remove(), 900);
}
function schwebeText(x, y, text, klasse = "") {
  const e = document.createElement("div");
  e.className = "schwebe-text " + klasse; e.textContent = text;
  e.style.left = x + "px"; e.style.top = y + "px";
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 1100);
}
function paarWahl(v) {
  const p = state.paare, [seite, idText] = v.split(":"), id = Number(idText);
  if (!p || p.sperre || p.ende || p.weg.includes(id)) return;
  const el = paarKarte(seite, id);
  // erste Karte wählen, auf derselben Seite umwählen oder abwählen
  if (!p.wahl || p.wahl.seite === seite) {
    document.querySelectorAll(".paar-karte.gewaehlt").forEach((x) => x.classList.remove("gewaehlt"));
    if (p.wahl?.seite === seite && p.wahl.id === id) { p.wahl = null; return; }
    p.wahl = { seite, id };
    el?.classList.add("gewaehlt");
    return;
  }
  const andere = paarKarte(p.wahl.seite, p.wahl.id);
  p.sperre = true;
  if (p.wahl.id === id && el && andere) {
    // Treffer: beide Karten fliegen zueinander und lösen sich in Funken auf
    const [x1, y1] = mitte(el), [x2, y2] = mitte(andere), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    [[el, x1, y1, 1], [andere, x2, y2, -1]].forEach(([k, x, y, s]) => {
      k.classList.remove("gewaehlt");
      k.style.setProperty("--tx", `${mx - x}px`); k.style.setProperty("--ty", `${my - y}px`); k.style.setProperty("--rot", `${s * 12}deg`);
      k.classList.add("treffer");
    });
    p.serie += 1;
    setTimeout(() => { funken(mx, my); schwebeText(mx, my - 10, p.serie >= 2 ? `Serie ×${p.serie} 🔥` : "+1", p.serie >= 2 ? "serie" : ""); }, 260);
    if (navigator.vibrate) navigator.vibrate(p.serie >= 3 ? [15, 40, 15] : 20);
    setTimeout(() => { p.weg.push(id); p.wahl = null; p.sperre = false; if (p.weg.length === p.links.length) { p.ende = Date.now(); paareGeschafft(p); } render(); }, 560);
  } else {
    // Fehler: Karten wackeln, Bildschirm bebt kurz, ein Herz zerbricht
    [el, andere].forEach((x) => { x?.classList.remove("gewaehlt"); x?.classList.add("falsch"); });
    document.querySelector(".paar-spiel")?.classList.add("beben");
    const herz = document.querySelectorAll(".herz:not(.leer)")[p.leben - 1];
    if (herz) { herz.textContent = "💔"; herz.classList.add("verloren"); }
    p.leben -= 1; p.serie = 0;
    if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
    setTimeout(() => { p.wahl = null; p.sperre = false; if (p.leben <= 0) p.ende = Date.now(); render(); }, 700);
  }
}

/** Runde „Paare finden“ geschafft: XP und ggf. der Erfolg „Gutes Gedächtnis“. */
function paareGeschafft(p) {
  const vorher = levelJetzt(), fehlerfrei = p.leben === PAAR_LEBEN;
  stat.xpBonus = (stat.xpBonus || 0) + XP.paare + (fehlerfrei ? XP.paareFehlerfrei : 0);
  belohnen(vorher, fehlerfrei ? ["paareFehlerfrei"] : []);
  speichern();
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
    // § 266 HGB: Absatz 1 als Text, das Gliederungsschema (Abs. 2, 3) als Grafik
    const schema = sh.ref.startsWith("HGB 266");
    // R 2 EStR: Schema zum z. v. E. bzw. zur festzusetzenden ESt nur als Grafik (Stufen farbig)
    const r2 = sh.ref.startsWith("EStR 2");
    inhalt = r2 ? `<div class="sub" style="margin:2px 4px 6px">Einkommensteuer-Richtlinien · ${esc(n.titel)}</div>
      ${r2View(sh.ref.split(" ")[2], kompaktInline)}`
      : `<div class="liste"><div class="zeile"><span class="grow">${n.titel ? `<b>${esc(n.titel)}</b>` : ""}
      ${(schema ? n.absaetze.filter((a) => a.abs === "1") : n.absaetze).map((a) => `<p style="margin:8px 0;line-height:1.55">${a.abs ? `<b>(${a.abs})</b> ` : ""}${esc(a.text).replace(/\n/g, "<br>")}</p>`).join("")}</span></div></div>
      ${schema ? gliederungView() : ""}
      <div class="mk-norm-fuss">${alsKarteKnopf("norm", sh.ref)}</div>
      <div class="gruppe-fuss">${n.auszug ? "Auszug – weitere Absätze bzw. Nummern sind nicht abgedruckt. " : ""}Quelle: ${r2 ? "Amtliches Einkommensteuer-Handbuch des BMF (esth.bundesfinanzministerium.de), Ausgabe 2025" : "www.gesetze-im-internet.de"}</div>`;
  } else if (sh.art === "karteEdit") {
    titel = sh.e.id ? "Karte bearbeiten" : "Neue Karte"; links = sh.zurueck ? "Zurück" : "Abbrechen";
    inhalt = karteEditView(sh);
  } else if (sh.art === "stapel") {
    titel = sh.name;
    inhalt = stapelView(sh.name);
  } else if (sh.art === "kartenIO") {
    titel = "Exportieren / Importieren";
    inhalt = kartenIoView();
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
  } else if (sh.art === "rueckblick") {
    titel = sh.art2 === "monat" ? "Monatsrückblick" : "Wochenrückblick";
    inhalt = rueckblickView(stat, { art: sh.art2, versatz: sh.versatz || 0 }, statHilfen());
  } else if (sh.art === "statistik") {
    titel = "Statistik";
    inhalt = statistikView(stat, statHilfen());
  } else if (sh.art === "rangliste") {
    titel = stat.gruppe?.code ? "Rangliste" : "Lerngruppe";
    inhalt = ranglisteView();
  } else if (sh.art === "gruppeEinladung") {
    titel = "Lerngruppe";
    inhalt = `<section class="duell-held">${taler("jubeln", { groesse: 72, klasse: "ruhig" })}<p>Du wurdest in eine Lerngruppe eingeladen. In der Rangliste sehen alle Mitglieder deinen Namen, deine XP, dein Level und Talers Outfit.</p></section>
      ${stat.gruppe?.code && stat.gruppe.code !== sh.code ? `<div class="gruppe-fuss" style="margin:0 4px 10px">Du bist schon in einer anderen Gruppe – beim Beitreten verlässt du sie.</div>` : ""}
      <div class="liste"><label class="zeile"><span class="grow">Dein Name</span><input type="text" id="profilName" class="feld-klein" value="${esc(meinName())}" placeholder="z. B. Alex" maxlength="20"></label></div>
      <button class="knopf" data-a="gruppeBeitreten" data-v="${sh.code}" style="margin:14px 0 20px">Gruppe beitreten</button>`;
  } else if (sh.art === "duell") {
    titel = "Duell";
    inhalt = duellView();
  } else if (sh.art === "duellEinladung") {
    titel = sh.d.g ? "Duell-Ergebnis" : "Herausforderung";
    inhalt = duellEinladungView(sh.d);
  } else if (sh.art === "neuigkeiten") {
    titel = "Neuigkeiten";
    inhalt = `<div class="neu-seite">${neuigkeitenListe(NEUIGKEITEN, false)}</div>`;
  } else if (sh.art === "startAnpassen") {
    titel = "Startseite anpassen";
    inhalt = startAnpassenView();
  } else if (sh.art === "termine") {
    titel = "Klausurtermine";
    inhalt = termineView();
  } else if (sh.art === "garderobe") {
    titel = "Garderobe";
    inhalt = garderobeView(state.garderobe, { outfit: meinOutfit(), gekauft: stat.gekauft || {}, guthaben: meineKasse().guthaben, level: levelJetzt().level });
  } else if (sh.art === "level") {
    titel = "Level und Erfolge";
    inhalt = levelSeite(stat);
  } else if (sh.art === "einstellungen") {
    titel = "Einstellungen";
    inhalt = `
      <div class="gruppe" style="margin-top:4px"><div class="gruppe-titel">Tagesziel</div><div class="liste"><div class="zeile" style="flex-wrap:wrap">
        <span class="grow sub" style="min-width:100%">Wie viele Aufgaben möchtest du pro Tag schaffen?</span>
        <span class="chip-reihe">${[10, 20, 30, 50].map((z) => `<button class="chip ${state.ziel === z ? "aktiv" : ""}" data-a="ziel" data-v="${z}">${z} Aufgaben</button>`).join("")}</span></div></div></div>
      <div class="gruppe"><div class="gruppe-titel">Darstellung</div><div class="modus-karte"><div class="segment">
        ${[["system", "System"], ["light", "Hell"], ["dark", "Dunkel"]].map(([id, t]) => `<button data-a="design" data-v="${id}" class="${state.design === id ? "aktiv" : ""}">${t}</button>`).join("")}</div></div></div>
      <div class="gruppe"><div class="gruppe-titel">Studium oder Ausbildung</div>${rollenSchalter()}<div class="gruppe-fuss">Bestimmt, welche Module auf der Startseite stehen. Der Lernstand bleibt erhalten.</div></div>
      <div class="gruppe"><div class="gruppe-titel">Animationen</div><div class="liste"><div class="zeile">
        <span class="grow"><b>Animationen</b><div class="sub">Aus = Bewegung reduzieren: Taler, Konfetti und Übergänge bleiben still. Auch während der Aufgaben oben rechts umschaltbar.</div></span>${bewegungSchalter()}</div></div></div>
      ${syncVerfuegbar() ? `<div class="gruppe"><div class="gruppe-titel">Mehrere Geräte</div><div class="liste"><button class="zeile" data-a="syncOeffnen"><span class="symbol">${ic("wechsel")}</span>
        <span class="grow"><b>Geräte synchronisieren</b><div class="sub">${esc(syncStatusText())}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button></div></div>` : ""}
      <div class="gruppe"><div class="gruppe-titel">Was ist neu?</div><div class="liste"><button class="zeile" data-a="neuigkeiten"><span class="symbol">${ic("sterne")}</span>
        <span class="grow"><b>Neuigkeiten</b><div class="sub">${esc(NEUIGKEITEN[0].titel)}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button></div></div>
      <div class="gruppe"><div class="gruppe-titel">Datensicherung</div><div class="liste">
        <button class="zeile" data-a="backupSpeichern"><span class="symbol">${ic("export")}</span><span class="grow"><b>Backup speichern</b><div class="sub">${lies("bsr.letztesBackup", "") ? `Zuletzt am ${new Date(Number(lies("bsr.letztesBackup", "0"))).toLocaleDateString("de-DE")}` : "Lernstand, Garderobe und Einstellungen als Datei"}</div></span><span class="chev">${ic("pfeil", "klein")}</span></button>
        <label class="zeile" style="cursor:pointer"><span class="symbol">${ic("install")}</span><span class="grow"><b>Backup wiederherstellen</b><div class="sub">Ersetzt den Lernstand auf diesem Gerät</div></span><span class="chev">${ic("pfeil", "klein")}</span>
          <input type="file" id="bImport" accept=".json,application/json" hidden></label></div>
        <div class="gruppe-fuss">Praktisch beim Handywechsel oder ohne Synchronisierung. Der Sync-Code wird aus Sicherheitsgründen nicht mitgespeichert.</div></div>
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
      <div class="sub" style="font-size:15px">Deine Lern-App für Studium und Ausbildung in der Steuerverwaltung – kostenlos und offline.</div>
      <div class="vorteile">
        <div><span class="symbol">${ic("ziel")}</span><div><b>Klausurnah üben</b><span class="sub">Buchungssätze, Frage-Antwort, Übertragungsaufgaben – mit Musterlösung.</span></div></div>
        <div><span class="symbol">${ic("gehirn")}</span><div><b>Nichts mehr vergessen</b><span class="sub">Die Lernkartei holt jede Aufgabe im richtigen Abstand zurück.</span></div></div>
        <div><span class="symbol">${ic("flamme")}</span><div><b>Dranbleiben</b><span class="sub">Tagesziel und Lernserie zeigen dir, wie gut du im Plan bist.</span></div></div>
      </div>
      ${!state.rolle ? `<div class="gruppe-titel" style="justify-content:center">Wo stehst du?</div>
      <div class="rollen-wahl">
        <button class="rollen-kachel" data-a="willkommenRolle" data-v="studium"><span class="m-icon">${ic("hut")}</span><span><b>Studium</b><span class="sub">Diplom-Finanzwirt · Grundstudium I</span></span></button>
        <button class="rollen-kachel" data-a="willkommenRolle" data-v="ausbildung"><span class="m-icon">${ic("akte")}</span><span><b>Ausbildung</b><span class="sub">Finanzwirt · Steueranwärter, FTA I</span></span></button>
      </div>` : `<div class="gruppe-titel" style="justify-content:center">Womit möchtest du starten?</div>
      <div class="modul-grid" style="margin-bottom:10px">${aktiveModule(state.rolle).map((m) => `<button class="modul-kachel" style="--mc:${m.farbe};min-height:0" data-a="willkommenModul" data-v="${m.id}">
        <span class="m-icon">${ic(m.icon)}</span><span><div class="m-titel">${m.titel}</div><div class="m-unter">${esc(m.unter)}</div></span></button>`).join("")}</div>
      <div style="text-align:center;margin-bottom:20px"><button class="link" data-a="willkommenRolle" data-v="${state.rolle === "studium" ? "ausbildung" : "studium"}">Doch ${state.rolle === "studium" ? "in der Ausbildung" : "im Studium"}? Umstellen</button></div>`}
    </div>`;
  }
  return `<div class="sheet-hg" data-a="sheetZu"><div class="sheet ${halb ? "halb" : ""}" data-stop="1">
    <div class="vb-kopf"><button class="link" data-a="sheetZu">${links}</button><div class="mitte">${esc(titel)}</div><span class="link"></span></div>
    <div class="vb-inhalt">${inhalt}</div></div></div>`;
}

/** Seite, auf der ein Konto zunimmt bzw. gebucht wird – im Kontenplan als leuchtende T-Konto-Seite. */
const MEHRUNG = { aktiv: "soll", aufwand: "soll", passiv: "haben", eigenkapital: "haben", ertrag: "haben", erfolg: "beide" };
/** Unter- und Privatkonten werden auf der Gegenseite ihrer Kontoart gebucht (vgl. HINWEISE in konten.js). */
const BUCHUNGSSEITE = { erloesschmaelerungen: ["soll", "WVK"], gewaehrteSkonti: ["soll", "WVK"], gewaehrteBoni: ["soll", "WVK"], preisnachlaesse: ["haben", "WEK"], erhalteneSkonti: ["haben", "WEK"], erhalteneBoni: ["haben", "WEK"], privatentnahmen: ["soll", "EK"], privateinlagen: ["haben", "EK"] };
const kontoSeite = (k) => BUCHUNGSSEITE[k.id]?.[0] || MEHRUNG[k.art] || "keine";
const kontoArtText = (k) => { const b = BUCHUNGSSEITE[k.id]; return b ? `Unterkonto des ${b[1]} · Buchung im ${b[0] === "soll" ? "Soll" : "Haben"}` : k.artName; };

function kontoListe(aktion) {
  const q = norma(state.kontoSuche.trim());
  const passt = (k) => !q || norma(k.name).includes(q) || norma(k.kurz).includes(q);
  const html = KLASSEN.map((kl) => {
    const ks = kontenInKlasse(kl).filter(passt);
    if (!ks.length) return "";
    return `<div class="gruppe"><div class="gruppe-titel">${KLASSEN_TITEL[kl]}</div><div class="t-konten">
      ${ks.map((k) => `<button class="t-konto art-${k.art} mehrt-${kontoSeite(k)}" data-a="${aktion}" data-v="${k.id}"><span class="t-text"><b>${esc(k.name)}</b><span class="t-art">${kontoArtText(k)}</span></span><span class="t-seiten" aria-hidden="true"><span>S</span><span>H</span></span></button>`).join("")}</div></div>`;
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
  rolle: (v) => {
    state.rolle = v === "ausbildung" ? "ausbildung" : "studium";
    einstellungMerken("rolle", state.rolle);
    if (rolleVon(MODUL[state.fach]) !== state.rolle) fachSetzen(aktiveModule(state.rolle)[0].id);
    render();
  },
  willkommenRolle: (v) => { AKTIONEN.rolle(v); state.sheet = { art: "willkommen" }; render(); },
  // Ohne Neuzeichnen umschalten – eine laufende Aufgabe bleibt, wie sie ist
  bewegung: () => {
    state.bewegungAus = !state.bewegungAus;
    einstellungMerken("bewegungAus", state.bewegungAus ? "1" : "0");
    document.documentElement.dataset.bewegung = state.bewegungAus ? "aus" : "an";
    const an = !state.bewegungAus;
    document.querySelectorAll('[data-a="bewegung"]').forEach((b) => { b.setAttribute("aria-checked", an); b.setAttribute("aria-label", `Animationen ${an ? "an" : "aus"}`); b.title = `Animationen ${an ? "an" : "aus"} – antippen zum Umschalten`; });
  },
  taler: () => { state.talerSpruch += 1; state.talerAngetippt = true; render(); },
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
  ziel: (v) => { state.ziel = Number(v); einstellungMerken("ziel", String(v)); render(); },
  design: (v) => { state.design = v; einstellungMerken("design", v); render(); },
  hinweisWeg: () => { state.hinweisWeg = true; schreib("bsr.hinweisWeg", "1"); render(); },
  zuModulen: () => document.querySelector(".modul-grid")?.scrollIntoView({ behavior: "smooth", block: "start" }),
  sucheLeeren: () => { state.suche = ""; render(); document.getElementById("homeSuche")?.focus(); },
  bilrAnsicht: (v) => { state.bilrAnsicht = v === "gesetze" ? "gesetze" : "konten"; render(); },
  bilrTeil: (v) => {
    state.bilrTeil = ["1", "2"].includes(v) ? v : "beide";
    einstellungMerken("teil", state.bilrTeil);
    state.kartenThemen = new Set();
    render();
  },
  oerModus: (v) => {
    state.oerModus = v === "qa" ? "qa" : "mc";
    einstellungMerken("oerModus2", state.oerModus);
    render();
  },
  schnell: (v, el) => {
    state.tab = "lernen";
    const alle = pruefImTeil(state.fach).map((t) => t.id);
    const basis = { modus: "uebung", fach: state.fach };
    if (v === "buchung") starte({ ...basis, themen: alle, nurBuchung: true });
    else if (["qa", "uebertragung", "rechnen", "fall"].includes(v)) starte({ ...basis, themen: alle, filter: v });
    else if (v === "alles") starte({ ...basis, themen: alle });
    else starte({ ...basis, themen: [el.dataset.t] });
  },
  thema: (v) => { const f = state.fach === "bbf" && themaIn(v, "bbf") ? "bbf" : fachFuerThema(v); fachSetzen(f); if (state.tab === "start") { state.tab = "lernen"; state.suche = ""; } starte({ modus: "uebung", fach: f, themen: [v] }); },
  einzeln: (v) => { const t = ALLE.find((x) => x.id === v).thema, f = fachFuerThema(t); fachSetzen(f); state.tab = "lernen"; state.suche = ""; starte({ modus: "uebung", fach: f, themen: [t], ids: [v], einzeln: true }); },
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
    const ids = (alle ? faelligVon(null) : faelligImTeil(state.fach)).slice(0, PRO_WIEDERHOLUNG);
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
  level: () => { state.sheet = { art: "level" }; render(); },
  rueckblick: (v) => { state.sheet = { art: "rueckblick", art2: v === "monat" ? "monat" : "woche", versatz: 0 }; render(); },
  rbArt: (v) => { state.sheet = { ...state.sheet, art2: v, versatz: 0 }; render(); },
  rbZurueck: () => { state.sheet.versatz = (state.sheet.versatz || 0) - 1; render(); },
  rbVor: () => { state.sheet.versatz = Math.min(0, (state.sheet.versatz || 0) + 1); render(); },
  statistik: () => { state.sheet = { art: "statistik" }; render(); },
  backupSpeichern: () => {
    const einst = {};
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith("bsr.") && k !== SPEICHER && k !== SYNC_SPEICHER) einst[k] = localStorage.getItem(k); } } catch (_) { /* egal */ }
    const daten = { app: "finanzwirt-trainer", art: "backup", v: 1, erstellt: new Date().toISOString(), version: VERSION, stat, einstellungen: einst };
    dateiSpeichern(`finanzwirt-backup-${tagSchluessel()}.json`, JSON.stringify(daten), "application/json");
    schreib("bsr.letztesBackup", String(Date.now()));
    render();
  },
  duell: () => { state.sheet = { art: "duell" }; render(); },
  rangliste: () => { state.sheet = { art: "rangliste" }; render(); gruppeAktualisieren(true); },
  gruppeArt: (v) => { gruppe.art = v; render(); },
  gruppeNeuLaden: () => gruppeAktualisieren(true),
  gruppeErstellen: async () => {
    const name = document.getElementById("gruppeName")?.value.trim() || "Lerngruppe";
    if (!namePruefen()) return;
    if (!navigator.onLine) { toast("Zum Erstellen wird Internet benötigt."); return; }
    const code = neuerCode();
    try {
      gruppe.daten = await gruppeSchreiben(SERVER, code, (d) => eintragen(d, profilId(), { ...meinEintrag(), gruppenName: name.slice(0, 30) }));
      stat.gruppe = { code, name, t: Date.now() }; speichern(); gruppe.zuletzt = Date.now(); render(); toast("Gruppe erstellt – jetzt einladen!");
    } catch (e) { toast(e.message || "Die Gruppe konnte nicht erstellt werden."); }
  },
  gruppeBeitreten: async (v) => {
    const code = codeNormal(v || document.getElementById("gruppeCode")?.value);
    if (!codeGueltig(code)) { toast("Der Code hat 16 Zeichen, z. B. ABCD-EFGH-JKLM-NPQR."); return; }
    if (!namePruefen()) return;
    if (!navigator.onLine) { toast("Zum Beitreten wird Internet benötigt."); return; }
    try {
      const alt = await SERVER.holen(code);
      if (alt?.daten?.typ !== "gruppe") { toast("Diese Gruppe gibt es nicht."); return; }
      if (stat.gruppe?.code && stat.gruppe.code !== code) await gruppeSchreiben(SERVER, stat.gruppe.code, (d) => austragen(d, profilId())).catch(() => {});
      gruppe.daten = await gruppeSchreiben(SERVER, code, (d) => eintragen(d, profilId(), meinEintrag()));
      stat.gruppe = { code, name: gruppe.daten.name, t: Date.now() }; speichern(); gruppe.zuletzt = Date.now();
      state.sheet = { art: "rangliste" }; render(); toast(`Willkommen in „${gruppe.daten.name}“!`);
    } catch (e) { toast(e.message || "Beitreten hat nicht geklappt."); }
  },
  gruppeEinladen: () => {
    const g = stat.gruppe; if (!g?.code) return;
    linkTeilen("Lerngruppe – Finanzwirt-Trainer", `Komm in unsere Lerngruppe „${gruppe.daten?.name || g.name}“ im Finanzwirt-Trainer (Code ${codeAnzeige(g.code)}):`, `${location.origin}${location.pathname}#gruppe=${g.code}`);
  },
  gruppeVerlassen: async () => {
    const g = stat.gruppe; if (!g?.code || !confirm("Lerngruppe verlassen? Dein Eintrag in der Rangliste wird gelöscht.")) return;
    try { await gruppeSchreiben(SERVER, g.code, (d) => austragen(d, profilId())); } catch (_) { /* offline: Eintrag bleibt, Gruppe trotzdem verlassen */ }
    stat.gruppe = { code: "", name: "", t: Date.now() }; gruppe.daten = null; speichern(); render();
  },
  duellStart: (v) => {
    const name = document.getElementById("profilName")?.value.trim();
    if (name !== undefined && name !== meinName()) stat.profil = { ...(stat.profil || {}), name, t: Date.now() };
    if (!meinName()) { toast("Bitte zuerst einen Namen eintragen."); document.getElementById("profilName")?.focus(); return; }
    fachSetzen(v);
    starte({ modus: "uebung", fach: v, themen: pruefungsThemen(v).map((t) => t.id), anzahl: DUELL_ANZAHL + 6, duell: { seed: neuerSeed(), gegner: null } });
  },
  duellAnnehmen: () => {
    const d = state.sheet?.d;
    if (!d) return;
    if (!meinName()) { const n = prompt("Dein Name für das Duell:", ""); if (!n?.trim()) return; stat.profil = { ...(stat.profil || {}), name: n.trim().slice(0, 20), t: Date.now() }; speichern(); }
    fachSetzen(d.f);
    starte({ modus: "uebung", fach: d.f, themen: pruefungsThemen(d.f).map((t) => t.id), anzahl: DUELL_ANZAHL + 6, duell: { seed: d.s, gegner: { n: d.n, r: d.r, z: d.z } } });
  },
  duellTeilen: () => {
    const x = s(), ich = duellErgebnisVon(x), basis = location.origin + location.pathname;
    const g = x.duell.gegner;
    const daten = { f: x.fach, s: x.duell.seed, n: meinName() || "Jemand", r: ich.r, z: ich.z, a: ALLE.length, ...(g ? { g: { n: g.n, r: g.r, z: g.z } } : {}) };
    const text = g ? `Mein Ergebnis in unserem Duell (${MODUL[x.fach].kurz}): ${ich.r}/${DUELL_ANZAHL} in ${zeitText(ich.z)}.` : `Duell im Finanzwirt-Trainer (${MODUL[x.fach].kurz}): Ich habe ${ich.r}/${DUELL_ANZAHL} in ${zeitText(ich.z)} geschafft. Schaffst du mehr?`;
    linkTeilen("Duell – Finanzwirt-Trainer", text, duellLink(basis, daten));
  },
  neuigkeiten: () => { state.sheet = { art: "neuigkeiten" }; render(); },
  startAnpassen: () => { state.sheet = { art: "startAnpassen" }; render(); },
  startHoch: (v) => { const l = startReihenfolge(), i = Number(v); if (i > 0) { [l[i - 1], l[i]] = [l[i], l[i - 1]]; startSpeichern(l); } },
  startRunter: (v) => { const l = startReihenfolge(), i = Number(v); if (i < l.length - 1) { [l[i + 1], l[i]] = [l[i], l[i + 1]]; startSpeichern(l); } },
  startZeigen: (v) => { const l = startReihenfolge(), i = Number(v); l[i].aus = !l[i].aus; startSpeichern(l); },
  startStandard: () => { einstellungMerken("startLayout", ""); render(); },
  termine: () => { state.sheet = { art: "termine" }; render(); },
  terminNeu: () => {
    const fach = document.getElementById("terminFach")?.value, datum = document.getElementById("terminDatum")?.value;
    const titel = document.getElementById("terminTitel")?.value.trim() || "Klausur";
    if (!fach || !/^\d{4}-\d{2}-\d{2}$/.test(datum || "")) { toast("Bitte ein Datum wählen."); return; }
    if (datum < tagSchluessel()) { toast("Das Datum liegt in der Vergangenheit."); return; }
    stat.termine = { ...(stat.termine || {}), ["k" + Date.now().toString(36)]: { fach, titel, datum, t: Date.now() } };
    speichern(); render(); toast("Termin gespeichert.");
  },
  terminLoeschen: (v) => { if (!stat.termine?.[v]) return; stat.termine = { ...stat.termine, [v]: { x: 1, t: Date.now() } }; speichern(); render(); },
  garderobe: () => { state.garderobe.probe = null; state.sheet = { art: "garderobe" }; render(); },
  garSlot: (v) => { state.garderobe = { slot: v, probe: null }; render(); },
  garProbe: (v) => { state.garderobe.probe = state.garderobe.probe === v ? null : v; render(); document.querySelector(".sheet .vb-inhalt")?.scrollTo({ top: 0, behavior: state.bewegungAus ? "auto" : "smooth" }); },
  garKaufen: (v) => {
    const a = artikel(v), k = kaufbar(v, { gekauft: stat.gekauft || {}, guthaben: meineKasse().guthaben, level: levelJetzt().level });
    if (!a || !k.ok) return;
    stat.gekauft = { ...(stat.gekauft || {}), [v]: Date.now() };
    stat.outfit = { ...meinOutfit(), [a.slot]: v, t: Date.now() };
    speichern();
    render();
    const fig = document.querySelector(".gar-figur");
    if (fig) { const [x, y] = mitte(fig); funken(x, y); schwebeText(x, y - 40, `−${a.preis} Taler`); fig.classList.add("gekauft"); }
    if (navigator.vibrate) navigator.vibrate([15, 40, 25]);
  },
  garAnziehen: (v) => { const a = artikel(v); if (!a) return; stat.outfit = { ...meinOutfit(), [a.slot]: v, t: Date.now() }; speichern(); render(); },
  garAblegen: (v) => { stat.outfit = { ...meinOutfit(), [v]: STANDARD[v] || "", t: Date.now() }; speichern(); render(); },
  sheetZu: () => {
    if (state.sheet?.zurueck) { state.sheet = state.sheet.zurueck; render(); return; }
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
  klausurStart: () => starte({ modus: "klausur", fach: state.fach, teil: teilVon(state.fach), anzahl: state.klausurAnzahl, minuten: state.klausurMinuten || null }),
  kartenThema: (v) => { state.kartenThemen.has(v) ? state.kartenThemen.delete(v) : state.kartenThemen.add(v); render(); },
  kartenAlle: () => { state.kartenThemen = new Set(themenImTeil(state.fach).map((t) => t.id).filter((id) => kartenImTeil(state.fach).some((k) => k.thema === id))); render(); },
  kartenKeine: () => { state.kartenThemen = new Set(); render(); },
  deck: (v) => {
    const r = new Zufall(), gew = new Set(stat.karten);
    const LERNKARTEN = kartenImTeil(state.fach);
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
    if (v === "1") d.gewusst += 1;
    if (k.art === "eigen") stat.meineKarten = MK.bewerteKarte(meine(), k.id, v === "1");
    else if (k.art === "fehler") stat.lern[k.id] = planen(stat.lern[k.id], v === "1");
    else {
      const gew = new Set(stat.karten);
      if (v === "1") gew.add(k.id); else gew.delete(k.id);
      stat.karten = [...gew];
    }
    speichern();
    d.index += 1; d.um = false;
    render();
  },
  deckZu: () => { state.deck = null; render(); },
  // ---------- Eigene Karteikarten ----------
  karteNeu: () => karteOeffnen({}),
  karteBearbeiten: (v) => {
    const k = meine()[v];
    if (!k || k.x) return;
    karteOeffnen({ id: v, v: k.v, h: k.h, f: k.f, st: k.st, q: k.q });
  },
  karteStapel: (v) => { state.sheet.e.st = v; render(); },
  karteVorschauDrehen: () => {
    state.sheet.um = !state.sheet.um;
    document.querySelector(".mk-mini")?.classList.toggle("um", state.sheet.um);
  },
  karteSpeichern: () => {
    const sh = state.sheet, e = sh.e;
    if (!MK.entwurfOk(e)) return;
    stat.meineKarten = MK.speichernKarte(meine(), e);
    schreib("bsr.stapel", e.st || MK.STANDARD_STAPEL);
    speichern();
    // Wird gerade gelernt: geänderten Text sofort auf der Karte zeigen
    const dk = state.deck?.karten.find((k) => k.art === "eigen" && k.id === e.id);
    if (dk) { const k = meine()[e.id]; Object.assign(dk, { vorne: k.v, hinten: k.h, kopf: k.st }); }
    state.sheet = sh.zurueck || null;
    toast(e.id ? "Karte gespeichert." : `Karte gespeichert – Stapel „${e.st || MK.STANDARD_STAPEL}“ im Reiter Karten.`);
    render();
  },
  karteLoeschen: (v) => {
    if (!confirm("Diese Karte löschen? Das gilt auch auf deinen anderen Geräten.")) return;
    stat.meineKarten = MK.loeschenKarte(meine(), v);
    speichern();
    if (state.deck) {
      const i = state.deck.karten.findIndex((k) => k.art === "eigen" && k.id === v);
      if (i >= 0) { state.deck.karten.splice(i, 1); if (i < state.deck.index) state.deck.index -= 1; state.deck.um = false; }
      if (!state.deck.karten.length) state.deck = null;
    }
    const z = state.sheet?.zurueck;
    state.sheet = z && MK.kartenVon(meine(), state.fach).some((k) => k.st === z.name) ? z : null;
    toast("Karte gelöscht.");
    render();
  },
  stapelOeffnen: (v) => { state.sheet = { art: "stapel", name: v }; render(); },
  meineLernen: (v) => {
    const m = meine(), r = new Zufall();
    let ks;
    if (v === "faellig") ks = MK.faelligeKarten(m, state.fach);
    else if (v.startsWith("st:")) ks = r.mischen(MK.kartenVon(m, state.fach).filter((k) => k.st === v.slice(3)));
    else if (v.startsWith("sf:")) ks = MK.faelligeKarten(m, state.fach).filter((k) => k.st === v.slice(3));
    if (!ks?.length) return;
    state.sheet = null;
    state.deck = { karten: ks.map((k) => ({ id: k.id, art: "eigen", kopf: k.st, vorne: k.v, hinten: k.h })), index: 0, um: false, gewusst: 0 };
    render();
  },
  fehlerLernen: () => {
    const ks = new Zufall().mischen(fehlerKarten(state.fach));
    if (!ks.length) return;
    state.deck = { karten: ks.map((k) => ({ id: k.id, art: "fehler", thema: k.thema, vorne: k.v, hinten: k.h })), index: 0, um: false, gewusst: 0 };
    render();
  },
  kartenIO: () => { state.sheet = { art: "kartenIO" }; render(); },
  kartenExport: (v) => {
    const tag = new Date().toISOString().slice(0, 10);
    if (v === "json") dateiSpeichern(`karteikarten-${tag}.json`, MK.exportJson(meine()), "application/json");
    else dateiSpeichern(`karteikarten-${state.fach}-${tag}.txt`, MK.exportText(meine(), state.fach), "text/plain");
  },
  /** „+ Als Karte“: Entwurf aus dem jeweiligen Inhalt, im Editor noch anpassbar. */
  alsKarte: (v, el) => {
    const q = el.dataset.q;
    if (q === "frage") {
      const x = s(), f = x.review != null ? x.fragen[x.review] : aktFrage();
      karteOeffnen(karteAusFrage(f));
    } else if (q === "punkt") {
      const [id, feld, i] = v.split("|"), th = THEMA[id];
      karteOeffnen({ ...MK.ausPunkt(KOMPAKT[id][feld][Number(i)], th.titel, feld), f: th.fach, q: `Kompaktwissen · ${th.titel}` });
    } else if (q === "beispiel") {
      const [id, i] = v.split("|"), th = THEMA[id];
      karteOeffnen({ ...MK.ausBeispiel(KOMPAKT[id].beispiele[Number(i)]), f: th.fach, q: `Klausurbeispiel · ${th.titel}` });
    } else if (q === "norm") {
      const n = norm(v);
      if (n) karteOeffnen({ ...MK.ausNorm(n), q: "Gesetzestext" });
    } else if (q === "pfad") {
      const z = state.pfad?.block, b = z && PFADE[state.pfad.fach].bloecke.find((x) => x.id === z.id), c = b?.karten[z.schritt - 1];
      if (c) karteOeffnen({ ...MK.ausPfadKarte(c), q: `Lernpfad · ${b.titel}` });
    }
  },
  kompakt: (v) => {
    if (!KOMPAKT[v]) return;
    const vorher = state.kompakt;
    state.kompakt = { id: v, fach: state.fach === "bbf" && themaIn(v, "bbf") ? "bbf" : fachFuerThema(v), liste: !!vorher?.liste || (vorher && !vorher.id), ausSitzung: false };
    if (!stat.kompakt[v]) { stat.kompakt[v] = Date.now(); speichern(); }
    render();
  },
  kompaktSitzung: (v) => {
    if (!KOMPAKT[v]) return;
    state.kompakt = { id: v, fach: state.fach === "bbf" && themaIn(v, "bbf") ? "bbf" : fachFuerThema(v), liste: false, ausSitzung: true };
    if (!stat.kompakt[v]) { stat.kompakt[v] = Date.now(); speichern(); }
    render();
  },
  kompaktListe: () => { state.kompakt = { id: null, fach: state.fach, liste: true }; render(); },
  kompaktZu: () => { state.kompakt = state.kompakt?.id && state.kompakt.liste ? { id: null, fach: state.kompakt.fach, liste: true } : null; render(); },
  kompaktUeben: (v) => { state.kompakt = null; AKTIONEN.thema(v); },
  pfadOeffnen: () => { state.pfad = { fach: pfadSchluessel(state.fach, teilVon(state.fach)), block: null }; render(); },
  pfadZu: () => { state.pfad = null; render(); },
  pfadKarte: () => { if (state.pfad) state.pfad.block = null; render(); },
  pfadBlock: (v) => { state.pfad.block = blockStarten(state.pfad.fach, v, new Zufall()); render(); },
  pfadZurueck: () => { const z = state.pfad.block; if (z.schritt > 0) { z.schritt -= 1; render(); } },
  pfadWeiter: () => {
    const z = state.pfad.block, b = PFADE[state.pfad.fach].bloecke.find((x) => x.id === z.id), n = schritte(b);
    const frage = z.schritt > b.karten.length && z.schritt < n - 1;
    if (frage && !z.antwort) return;
    z.schritt = Math.min(n - 1, z.schritt + 1); z.antwort = null;
    if (z.schritt === n - 1) { z.ende = Date.now(); const vorher = levelJetzt(); sterneSpeichern(state.pfad.fach, z.id, sterneFuer(z.fehler)); belohnen(vorher); speichernLokal(); }
    render();
  },
  pfadWahl: (v, el) => pfadAntwort(String(v), el),
  pfadPruefen: () => {
    const wert = document.getElementById("pfadZahl")?.value || "";
    if (!wert.trim()) { toast("Bitte einen Betrag eingeben."); return; }
    pfadAntwort(wert, document.querySelector(".pf-zahl"));
  },
  paareStart: () => { neuePaarRunde(); render(); state.paare.frisch = false; }, // Austeil-Animation nur beim ersten Zeichnen
  paarWahl: (v) => paarWahl(v),
  paareZu: () => { state.paare = null; render(); },
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
  } else if (t.id === "kVorne" || t.id === "kHinten" || t.id === "kStapel") {
    const e = state.sheet?.e;
    if (!e) return;
    if (t.id === "kVorne") e.v = t.value;
    else if (t.id === "kHinten") e.h = t.value;
    else {
      e.st = t.value.trim() || lies("bsr.stapel", MK.STANDARD_STAPEL);
      document.querySelectorAll(".mk-stapel-chips .chip").forEach((c) => c.classList.toggle("aktiv", !t.value.trim() && c.dataset.v === e.st));
    }
    const v = document.getElementById("kVorschau");
    if (v && t.id !== "kStapel") v.innerHTML = kartenVorschau(e, state.sheet.um);
    const k = document.getElementById("kSpeichern");
    if (k) k.disabled = !MK.entwurfOk(e);
  } else if (t.id === "kontoTabSuche") {
    state.kontoSuche = t.value;
    document.getElementById("kontoTabListe").innerHTML = kontoListe("kontoDetail");
  }
});

// Import eigener Karteikarten aus einer Datei
app.addEventListener("change", async (e) => {
  if (e.target.id === "profilName") { const n = e.target.value.trim().slice(0, 20); if (n !== meinName()) { stat.profil = { ...(stat.profil || {}), name: n, t: Date.now() }; speichern(); } return; }
  if (e.target.id === "bImport" && e.target.files?.[0]) { backupLaden(e.target.files[0]); e.target.value = ""; return; }
  if (e.target.id !== "kImport" || !e.target.files?.[0]) return;
  const datei = e.target.files[0], gn = /\.goodnotes$/i.test(datei.name);
  e.target.value = ""; // dieselbe Datei später erneut wählbar
  // Goodnotes-Lernsets können wegen Bildern groß sein – gelesen wird nur das Änderungsprotokoll mit dem Text
  if (datei.size > (gn ? 200e6 : 2e6)) { toast(`Die Datei ist zu groß (höchstens ${gn ? "200" : "2"} MB).`); return; }
  let inhalt = gn ? "" : await datei.text().catch(() => ""), stapel, ohneText = 0;
  if (gn) {
    try {
      const set = await goodnotesLesen(await datei.arrayBuffer());
      inhalt = JSON.stringify({ karten: set.karten.map((k) => ({ vorne: k.v, hinten: k.h, quelle: "Goodnotes" })) });
      stapel = set.titel; ohneText = set.ohneText;
    } catch (err) { toast(err.message?.includes("Browser") ? err.message : "Die Goodnotes-Datei konnte nicht gelesen werden."); return; }
  }
  const { meine: neu, neu: n, doppelt } = MK.importieren(meine(), inhalt, { fach: state.fach, stapel });
  const rest = [doppelt ? `${doppelt} doppelte übersprungen` : "", ohneText ? `${ohneText} ohne getippten Text (Bild/Handschrift) ausgelassen` : ""].filter(Boolean).join(" · ");
  if (!n) { toast(doppelt ? "Alle Karten sind schon vorhanden." : `In der Datei wurden keine Karten gefunden.${rest ? " " + rest + "." : ""}`); return; }
  stat.meineKarten = neu;
  speichern();
  state.sheet = null;
  toast(`${n} ${n === 1 ? "Karte" : "Karten"} importiert${stapel ? ` – Stapel „${stapel}“` : ""}${rest ? ` · ${rest}` : ""}.`);
  render();
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
  if (e.target.classList.contains("km-norm")) { e.preventDefault(); e.target.click(); }
  if (e.target.id === "pfadZahl") { e.preventDefault(); AKTIONEN.pfadPruefen(); }
});

// Tastatur am Computer: Ziffern wählen Antworten, Enter prüft bzw. geht weiter, Leertaste dreht Karten um
document.addEventListener("keydown", (e) => {
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === "Escape") { ebeneZurueck(); return; }
  if (state.sheet) return;
  if (state.pfad?.block) {
    const knoepfe = [...document.querySelectorAll('.pf-option:not([disabled])')];
    if (/^[1-8]$/.test(e.key) && knoepfe[Number(e.key) - 1]) knoepfe[Number(e.key) - 1].click();
    else if (e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); document.querySelector('.pf-fuss [data-a="pfadWeiter"], .pf-fuss [data-a="pfadBlock"]')?.click(); }
    else if (e.key === "ArrowLeft") AKTIONEN.pfadZurueck();
    return;
  }
  if (state.pfad) return;
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
duellAusAdresse();
window.addEventListener("hashchange", () => { if (/^#(duell|gruppe)=/.test(location.hash)) { duellAusAdresse(); render(); } });
render();
levelEinfuehren();
neuigkeitenPruefen();
gruppeAktualisieren();
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") gruppeAktualisieren(); });
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

/** Backup-Datei einlesen und den Lernstand dieses Geräts ersetzen. */
async function backupLaden(datei) {
  if (datei.size > 20e6) { toast("Die Datei ist zu groß für ein Backup."); return; }
  let d;
  try { d = JSON.parse(await datei.text()); } catch (_) { toast("Die Datei ist kein gültiges Backup."); return; }
  if (d?.app !== "finanzwirt-trainer" || d.art !== "backup" || !d.stat?.proThema) { toast("Die Datei ist kein Backup des Finanzwirt-Trainers."); return; }
  const n = Object.values(d.stat.proThema).reduce((a, z) => a + (z.b || 0), 0), verbunden = syncVerbunden();
  if (!confirm(`Backup vom ${new Date(d.erstellt).toLocaleDateString("de-DE")} wiederherstellen (${n} bearbeitete Aufgaben)? Der jetzige Lernstand auf diesem Gerät wird ersetzt.${verbunden ? "\n\nDieses Gerät wird dabei von der Synchronisierung getrennt. Danach kannst du es neu verbinden." : ""}`)) return;
  if (verbunden) { syncLokal = null; syncMerken(); } // sonst würde der Abgleich den Unterschied als Änderung auf alle Geräte übertragen
  stat = { ...LEER(), ...d.stat };
  for (const [k, v] of Object.entries(d.einstellungen || {})) if (k.startsWith("bsr.") && k !== SYNC_SPEICHER && typeof v === "string") schreib(k, v);
  speichernLokal();
  toast("Backup wiederhergestellt – die App lädt neu.");
  setTimeout(() => location.reload(), 900);
}

// Für Tests/Debugging
window.__bsr = { state, KONTEN, render };
