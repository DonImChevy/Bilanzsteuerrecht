// Präsenztest-Trainer – UI. Same pattern as the Finanzwirt-Trainer: render() rebuilds #app,
// actions via data-a / data-v and the AKTIONEN map. Design system shared from ../css/style.css.

import { ic } from "../../js/icons.js";
import { BEREICHE, BEREICH, TYPEN, typenIn, erzeuge, EINSTIEG_ANZAHL } from "./typen.js";
import { ausdruckHtml, form } from "./vg.js";
import { LUECKENTEXTE, TEXTSETS } from "./englisch.js";
import { neuerSeed, zahl, esc, rng } from "./zufall.js";
import * as S from "./speicher.js";
import { phase, tagesplan, tageBisTest, TESTTAG, PHASEN } from "./plan.js";

const app = document.getElementById("app");
const root = document.documentElement;
const BUCHST = ["A", "B", "C", "D", "E"];

const state = {
  view: "start", bereich: null, stufe: 2, modus: "lernen",
  s: null, // running session
  ergebnis: null, offen: -1, meldung: "", simKurz: false,
};

// ======================================================= colours / theme
const STANDARD_FARBE = ["#4f46e5", "#8b8cf8"], SIM_FARBE = ["#e11d48", "#fb7185"];
function farbe(f = STANDARD_FARBE) {
  root.style.setProperty("--m-hell", f[0]);
  root.style.setProperty("--m-dunkel", f[1]);
}
function themeAnwenden() {
  const t = S.stat.einst.theme;
  if (t === "hell") root.dataset.theme = "light";
  else if (t === "dunkel") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  root.dataset.bewegung = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "aus" : "an";
}

// ======================================================= helpers
const heute = () => S.tag();
const pct = (x) => (x === null ? "–" : `${Math.round(x * 100)} %`);
const sek = (x) => (x === null ? "–" : `${zahl(Math.round(x * 10) / 10)} s`);
const uhr = (s) => { const v = Math.max(0, Math.ceil(s)); return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`; };
const ohneHtml = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'" }[e])).replace(/\s+/g, " ").trim();
const datumLang = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });

// ======================================================= sessions
// block: { titel, typen | liste, anzahl, zeitModus: keine|aufgabe|block|sprint, zeit, stufe, feedback: sofort|ende|blitz, farbe }
function starten(cfg) {
  state.s = { ...cfg, bi: 0, ergebnisse: [], zwischen: false, zurueck: state.view === "session" ? "start" : state.view };
  blockStarten();
  state.view = "session";
  render();
}

function blockStarten() {
  const s = state.s, b = s.bloecke[s.bi];
  b.aufgaben = []; b.antworten = []; s.i = 0; s.beantwortet = false; s.blitz = null;
  b.reihe = b.typen ? rng(neuerSeed()).shuffle(b.typen) : null;
  s.blockStart = performance.now(); s.aufgabeStart = performance.now();
  farbe(b.farbe || s.farbe || STANDARD_FARBE);
}

const blockAkt = () => state.s.bloecke[state.s.bi];

function aufgabeAkt() {
  const s = state.s, b = blockAkt();
  if (!b.aufgaben[s.i]) {
    if (b.liste) { const l = b.liste[s.i]; b.aufgaben[s.i] = erzeuge(l.typ, l.seed, l.stufe, l.idx ?? null); }
    else { const typ = b.reihe[s.i % b.reihe.length]; b.aufgaben[s.i] = erzeuge(typ, neuerSeed(), TYPEN[typ].stufenlos ? 2 : b.stufe); }
  }
  return b.aufgaben[s.i];
}

function antworten(g) {
  const s = state.s;
  if (!s || s.zwischen || s.beantwortet) return;
  const b = blockAkt(), a = aufgabeAkt();
  const ms = performance.now() - s.aufgabeStart;
  const ok = S.erfassen(a, g, ms);
  if (ok && s.art === "fehler") S.fehlerErledigt(a);
  b.antworten[s.i] = { g, ms, ok };
  if (b.feedback === "sofort") { s.beantwortet = true; render(); document.getElementById("auswertung")?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  else { s.blitz = { ok, n: (s.blitz?.n || 0) + 1 }; weiter(); }
}

function weiter() {
  const s = state.s, b = blockAkt();
  s.i++; s.beantwortet = false; s.aufgabeStart = performance.now();
  if (s.i >= b.anzahl) return blockEnde();
  render();
}

function blockEnde(zeitUm = false) {
  const s = state.s, b = blockAkt();
  const antw = b.antworten.filter(Boolean);
  const richtig = antw.filter((x) => x.ok).length, falsch = antw.length - richtig;
  const gesamt = b.zeitModus === "sprint" ? antw.length : Number.isFinite(b.anzahl) ? b.anzahl : antw.length;
  const ziel = b.zeitModus === "sprint" ? Math.round(b.zeit / 5) : null;
  const prozent = b.zeitModus === "sprint" ? Math.min(100, Math.round((Math.max(0, richtig - falsch) / ziel) * 100)) : gesamt ? Math.round((richtig / gesamt) * 100) : 0;
  s.ergebnisse.push({ titel: b.titel, richtig, falsch, gesamt, bearbeitet: antw.length, ziel, prozent, ms: antw.reduce((x, y) => x + y.ms, 0), zeitUm, sprint: b.zeitModus === "sprint", aufgaben: b.aufgaben.slice(0, Math.max(antw.length, b.antworten.length)), antworten: b.antworten.slice() });
  if (s.bi < s.bloecke.length - 1) { s.zwischen = true; render(); return; }
  sessionEnde();
}

function sessionEnde() {
  const s = state.s;
  if (s.planId) S.planErledigt(s.planId);
  if (s.art === "simulation") S.simSpeichern({ t: Date.now(), kurz: !!s.kurz, bloecke: s.ergebnisse.map((e) => ({ titel: e.titel, prozent: e.prozent, richtig: e.richtig, gesamt: e.gesamt })) });
  state.ergebnis = { titel: s.titel, art: s.art, ergebnisse: s.ergebnisse, farbe: s.farbe };
  state.offen = -1; state.s = null; state.view = "ergebnis";
  render();
  window.scrollTo(0, 0);
}

// timer loop (only updates the clock text, the full render happens on answers)
setInterval(() => {
  const s = state.s;
  if (!s || state.view !== "session" || s.zwischen) return;
  const b = blockAkt(), jetzt = performance.now();
  const el = document.getElementById("tt-uhr");
  let rest = null;
  if (b.zeitModus === "aufgabe" && !s.beantwortet) { rest = b.zeit - (jetzt - s.aufgabeStart) / 1000; if (rest <= 0) return antworten(-1); }
  else if (b.zeitModus === "block" || b.zeitModus === "sprint") { rest = b.zeit - (jetzt - s.blockStart) / 1000; if (rest <= 0) return blockEnde(true); }
  if (!el) return;
  if (rest !== null) { el.textContent = uhr(rest); el.classList.toggle("knapp", rest <= (b.zeitModus === "aufgabe" ? 10 : 30)); }
  else if (!s.beantwortet) el.textContent = uhr((jetzt - s.aufgabeStart) / 1000);
}, 200);

// ----- session presets
function lernSession({ typen, bereich, anzahl, modus = state.modus, stufe = state.stufe, titel, planId }) {
  const tl = typen || typenIn(bereich);
  const tempo = modus === "tempo";
  const zeit = Math.round(tl.reduce((x, t) => x + TYPEN[t].zeit, 0) / tl.length);
  const f = BEREICH[TYPEN[tl[0]].bereich].farbe;
  starten({
    art: tempo ? "tempo" : "lernen", titel: titel || (tl.length === 1 ? TYPEN[tl[0]].name : BEREICH[TYPEN[tl[0]].bereich].name), farbe: f, planId,
    bloecke: [{ titel: titel || (tl.length === 1 ? TYPEN[tl[0]].name : "Gemischt"), typen: tl, anzahl: anzahl ?? (tempo ? 10 : Infinity), zeitModus: tempo ? "aufgabe" : "keine", zeit, stufe, feedback: tempo ? "ende" : "sofort" }],
  });
}

function sprint(sekunden = 180, planId) {
  starten({
    art: "sprint", titel: "Formen-Sprint", farbe: BEREICH.vg.farbe, planId,
    bloecke: [{ titel: "Verarbeitungsgeschwindigkeit", typen: ["vg"], anzahl: Infinity, zeitModus: "sprint", zeit: sekunden, stufe: 3, feedback: "blitz" }],
  });
}

const ZAHLEN_SIM = ["z-reihe", "z-prozent", "z-dreisatz", "z-zins", "z-text", "z-tabelle", "z-kopf", "z-ableitung", "z-graph"];

function simulation(kurz = false, planId) {
  const r = rng(neuerSeed());
  const h = (n) => (kurz ? Math.ceil(n / 2) : n);
  const liste = (typ, idxe) => idxe.map((idx) => ({ typ, seed: neuerSeed(), stufe: 2, idx }));
  const lt = r.shuffle(LUECKENTEXTE.map((_, i) => i)).slice(0, kurz ? 1 : 2);
  const luecken = lt.flatMap((ti) => [0, 1, 2, 3, 4].map((li) => LUECKENTEXTE.slice(0, ti).reduce((x, t) => x + t.luecken.length, 0) + li));
  const ts = r.shuffle(TEXTSETS.map((_, i) => i)).slice(0, 2);
  const zuordnen = ts.flatMap((si) => r.shuffle(TEXTSETS[si].aussagen.map((_, ai) => TEXTSETS.slice(0, si).reduce((x, s) => x + s.aussagen.length, 0) + ai)).slice(0, kurz ? 3 : 5));
  const zahlenTypen = r.shuffle(ZAHLEN_SIM);
  starten({
    art: "simulation", kurz, titel: kurz ? "Kurz-Simulation" : "Testsimulation", farbe: SIM_FARBE, planId,
    bloecke: [
      { titel: "Angewandtes Schlussfolgern", farbe: BEREICH.logik.farbe, typen: ["logik"], anzahl: h(14), zeitModus: "aufgabe", zeit: 80, stufe: 3, feedback: "ende" },
      { titel: "Umgang mit Zahlen", farbe: BEREICH.zahlen.farbe, liste: Array.from({ length: h(13) }, (_, i) => ({ typ: zahlenTypen[i % zahlenTypen.length], seed: neuerSeed(), stufe: i < 4 ? 2 : 3 })), anzahl: h(13), zeitModus: "aufgabe", zeit: 75, feedback: "ende" },
      { titel: "Verarbeitungsgeschwindigkeit", farbe: BEREICH.vg.farbe, typen: ["vg"], anzahl: Infinity, zeitModus: "sprint", zeit: kurz ? 90 : 180, stufe: 3, feedback: "blitz" },
      { titel: "Sätze ergänzen – Englisch", farbe: BEREICH.englisch.farbe, typen: ["e-saetze"], anzahl: h(10), zeitModus: "block", zeit: h(10) * 50, feedback: "ende" },
      { titel: "Texte zuordnen – Englisch", farbe: BEREICH.englisch.farbe, liste: liste("e-texte", zuordnen), anzahl: zuordnen.length, zeitModus: "block", zeit: zuordnen.length * 60, feedback: "ende" },
      { titel: "Satzbau und Verstehen – Englisch", farbe: BEREICH.englisch.farbe, typen: ["e-satzbau"], anzahl: h(10), zeitModus: "block", zeit: h(10) * 55, feedback: "ende" },
      { titel: "Lückentext – Englisch", farbe: BEREICH.englisch.farbe, liste: liste("e-luecken", luecken), anzahl: luecken.length, zeitModus: "block", zeit: luecken.length * 50, feedback: "ende" },
    ],
  });
}

function einstieg() {
  starten({
    art: "einstieg", titel: "Einstiegstest", farbe: BEREICH.zahlen.farbe,
    bloecke: [{ titel: "Einstiegstest Mathe", liste: Array.from({ length: EINSTIEG_ANZAHL }, (_, i) => ({ typ: "einstieg", seed: i })), anzahl: EINSTIEG_ANZAHL, zeitModus: "keine", feedback: "ende" }],
  });
}

function fehlerTraining(planId) {
  const offen = S.offeneFehler().slice(0, 12);
  const extra = S.faelligeTypen().filter((t) => !offen.some((f) => f.statTyp === t)).slice(0, Math.max(0, 8 - offen.length));
  const liste = [...offen.map((f) => ({ typ: f.typ, seed: f.seed, stufe: f.stufe, idx: f.idx })), ...extra.map((typ) => ({ typ, seed: neuerSeed(), stufe: 2 }))];
  if (!liste.length) { state.meldung = "Keine offenen Fehler und nichts fällig – stark!"; render(); return; }
  starten({ art: "fehler", titel: "Fehlertraining", farbe: ["#b45309", "#fbbf24"], planId, bloecke: [{ titel: "Fehler & fällige Typen", liste, anzahl: liste.length, zeitModus: "keine", feedback: "sofort" }] });
}

function planStarten(item) {
  const st = item.start;
  if (st.sprint) return sprint(st.sprint, item.id);
  if (st.simulation) return simulation(false, item.id);
  if (st.fehler) return fehlerTraining(item.id);
  lernSession({ typen: st.typen, bereich: st.bereich, anzahl: st.anzahl, modus: st.modus || "lernen", stufe: phase(heute()).id === "verstehen" ? 2 : 3, titel: item.titel, planId: item.id });
}

// ======================================================= views
function tabbar() {
  const t = (id, icon, name) => `<button class="${state.view === id ? "aktiv" : ""}" data-a="tab" data-v="${id}"><span class="ti">${ic(icon)}</span>${name}</button>`;
  return `<nav class="tabbar">${t("start", "start", "Start")}${t("plan", "kalender", "Plan")}${t("statistik", "diagramm", "Statistik")}${t("mehr", "einstellungen", "Mehr")}</nav>`;
}

function startView() {
  const h = heute(), p = phase(h), rest = tageBisTest(h);
  const ziel = S.stat.einst.ziel, n = S.heuteAnzahl(), serie = S.serie();
  const plan = tagesplan(h, { schwach: S.schwaechste(1), fehler: S.offeneFehler().length });
  const erledigt = S.stat.plan[h] || [];
  const naechster = plan.find((x) => !erledigt.includes(x.id));
  const countdown = rest > 0 ? `Noch <b>${rest}</b> ${rest === 1 ? "Tag" : "Tage"} bis zum Präsenztest` : rest === 0 ? "<b>Heute</b> ist Testtag" : "Präsenztest vorbei";
  const schwach = S.schwaechste(3);
  return `
  <div class="kopfzeile"><div><div class="gruss">${esc(datumLang(h))}</div><h1 class="titel" style="margin-top:2px">Präsenztest-Trainer</h1></div>
    <div class="kopf-aktionen"><button class="icon-btn" data-a="tab" data-v="mehr" aria-label="Einstellungen">${ic("einstellungen")}</button></div></div>
  <section class="hero">
    <div class="oben">
      <div class="ziel-ring" style="--p:${Math.min(100, Math.round((n / ziel) * 100))}"><div>${n}<small>von ${ziel}</small></div></div>
      <div class="grow"><h2>${countdown}</h2><div class="zeile-klein">Phase „${esc(p.titel)}“: ${esc(p.text)}</div>
        <div class="werte"><span class="wert-pille">${ic("flamme")}${serie} ${serie === 1 ? "Tag" : "Tage"} in Folge</span><span class="wert-pille">${ic("kalender")}23.11. Berlin</span></div></div>
    </div>
    ${naechster ? `<button class="knopf" data-a="plan" data-v="${naechster.id}">${ic("play", "fill")} ${esc(naechster.titel)} starten</button>` : `<div class="hero-fertig">${ic("haken")} Tagesplan erledigt – alles Weitere ist Bonus.</div>`}
  </section>
  ${state.meldung ? `<div class="hinweis-box" style="margin-top:14px"><span class="symbol">${ic("info")}</span><div>${esc(state.meldung)}</div></div>` : ""}
  <div class="gruppe"><div class="gruppe-titel">Heute dran <span class="sub" style="text-transform:none;letter-spacing:0">${erledigt.filter((id) => plan.some((x) => x.id === id)).length} von ${plan.length}</span></div>
    <div class="plan-liste">${plan.map((x, i) => planKarte(x, erledigt.includes(x.id), i)).join("")}</div></div>
  <div class="gruppe"><div class="gruppe-titel">Testmodule</div>
    <div class="bereich-grid">${BEREICHE.map(bereichKachel).join("")}</div></div>
  <div class="gruppe"><div class="gruppe-titel">Prüfungsmodus</div>
    <div class="kachel-grid">
      <button class="kachel betont sim-kachel" data-a="simStart"><span class="k-icon">${ic("klausur")}</span><span class="k-text"><b>Testsimulation</b><span class="sub">Alle 7 Module wie im Online-Test</span></span></button>
      <button class="kachel" data-a="fehler"><span class="k-icon" style="background:var(--warn-weak);color:var(--warn)">${ic("wiederholen")}</span><span class="k-text"><b>Fehlertraining</b><span class="sub">${S.offeneFehler().length} offene Fehler · ${S.faelligeTypen().length} Typen fällig</span></span></button>
      <button class="kachel" data-a="einstieg"><span class="k-icon">${ic("ziel")}</span><span class="k-text"><b>Einstiegstest</b><span class="sub">8 Mathe-Diagnoseaufgaben</span></span></button>
      <button class="kachel" data-a="sprint" data-v="60"><span class="k-icon" style="background:color-mix(in srgb,#ea580c 16%,transparent);color:#ea580c">${ic("blitz")}</span><span class="k-text"><b>1-Minuten-Sprint</b><span class="sub">Formen vergleichen, schnell zwischendurch</span></span></button>
    </div></div>
  ${schwach.length ? `<div class="gruppe"><div class="gruppe-titel">Deine schwächsten Typen</div><div class="themen-karten">${schwach.map((t, i) => typKarte(t, i)).join("")}</div></div>` : ""}
  <p class="fuss-hinweis">Eigene Übungsaufgaben im Stil üblicher Eignungstests – keine Originalaufgaben der Bundesbank oder des Testanbieters.</p>`;
}

function planKarte(x, fertig, i) {
  return `<button class="plan-karte ${fertig ? "fertig" : ""} ${x.schwerpunkt ? "schwerpunkt" : ""}" data-a="plan" data-v="${x.id}" style="--i:${i}">
    <span class="pk-icon">${ic(fertig ? "haken" : x.icon)}</span>
    <span class="pk-text"><b>${esc(x.titel)}</b><span class="sub">${esc(x.text)}</span></span>
    ${x.schwerpunkt && !fertig ? `<span class="pille m">Fokus</span>` : ""}<span class="chev">${ic("pfeil", "klein")}</span></button>`;
}

function bereichWerte(id) {
  const ts = typenIn(id).map((t) => S.stat.typen[t]).filter(Boolean);
  const n = ts.reduce((x, t) => x + t.n, 0), r = ts.reduce((x, t) => x + t.r, 0);
  return { n, q: n ? r / n : null };
}

function bereichKachel(b) {
  const w = bereichWerte(b.id);
  return `<button class="bereich-kachel" data-a="bereich" data-v="${b.id}" style="--bf:${b.farbe[0]};--bf2:${b.farbe[1]}">
    <span class="bk-icon">${ic(b.icon)}</span>
    <b>${esc(b.name)}</b><span class="sub">${esc(b.kurz)}</span>
    <span class="bk-fuss"><span class="bk-balken"><span style="width:${w.q === null ? 0 : Math.round(w.q * 100)}%"></span></span><span class="bk-wert">${w.q === null ? "neu" : pct(w.q)}</span></span>
  </button>`;
}

function typKarte(t, i) {
  const x = S.stat.typen[t], b = BEREICH[TYPEN[t].bereich], q = S.quote(x), z = S.schnitt(x);
  const langsam = z !== null && z > TYPEN[t].zeit;
  return `<button class="themen-karte" data-a="typ" data-v="${t}" style="--farbe:${b.farbe[0]};--i:${i}">
    <span class="tk-text"><b>${esc(TYPEN[t].name)}</b><span class="sub">${esc(TYPEN[t].text)}</span>
      <span class="tk-fuss"><span class="tk-balken"><span style="width:${q === null ? 0 : Math.round(q * 100)}%"></span></span><span class="tk-n">${x ? `${x.n} · Ø ${sek(z)}${langsam ? " ⚠" : ""}` : "noch nicht geübt"}</span></span></span>
    <span class="tk-status ${q === null ? "neu" : ""}">${q === null ? "neu" : pct(q)}</span></button>`;
}

function bereichView() {
  const b = BEREICH[state.bereich];
  const typen = typenIn(b.id);
  const stufenlos = typen.every((t) => TYPEN[t].stufenlos);
  const seg = (name, wert, opts) => `<div class="modus-karte"><div class="segment">${opts.map(([v, t]) => `<button class="${wert === v ? "aktiv" : ""}" data-a="${name}" data-v="${v}">${t}</button>`).join("")}</div></div>`;
  const info = {
    vg: "Eine Legende (unten links) ordnet neun Formen die Werte 1–9 zu und wechselt bei jeder Aufgabe. Rechnen, vergleichen, links oder rechts tippen – Ziel: unter 5 Sekunden pro Aufgabe. Tastatur: ← und →.",
    logik: "Ein Regeltext und eine Schlussfolgerung. Richtig = gilt in jedem passenden Fall, falsch = in keinem, unbestimmt = mal so, mal so. Die Lösung zeigt immer konkrete Beispielfälle.",
    zahlen: "Alle Aufgaben ohne Taschenrechner lösbar. Jede Lösung wird Schritt für Schritt mit den Zahlen der Aufgabe vorgerechnet.",
    englisch: "Die vier Formate aus dem Online-Test. Zu jeder Antwort gibt es die Regel auf Deutsch.",
  }[b.id];
  return `
  <button class="zurueck-link" data-a="tab" data-v="start">${ic("zurueck", "klein")} Start</button>
  <section class="modul-banner"><div class="reihe1"><span class="m-icon">${ic(b.icon, "gross")}</span><div><h1>${esc(b.name)}</h1><div class="unter">${esc(b.kurz)}</div></div></div></section>
  <div class="hinweis-box" style="margin-top:14px"><span class="symbol">${ic("info")}</span><div>${esc(info)}</div></div>
  ${b.id === "vg" ? `
    <div class="gruppe"><div class="gruppe-titel">Sprint auf Zeit</div><div class="kachel-grid">
      ${[[60, "1 Minute", "Aufwärmen"], [180, "3 Minuten", "Standard-Durchgang"], [300, "5 Minuten", "Ausdauer"]].map(([z, t, u], i) => `<button class="kachel ${i === 1 ? "betont" : ""}" data-a="sprint" data-v="${z}"><span class="k-icon">${ic("blitz")}</span><span class="k-text"><b>${t}</b><span class="sub">${u}</span></span></button>`).join("")}
      <button class="kachel" data-a="typStart" data-v="vg"><span class="k-icon">${ic("lernen")}</span><span class="k-text"><b>Lernmodus</b><span class="sub">Ohne Zeit, mit Rechenweg</span></span></button>
    </div></div>
    ${vgRekorde()}` : `
    <div class="gruppe"><div class="gruppe-titel">Modus</div>${seg("modus", state.modus, [["lernen", "Lernen"], ["tempo", "Tempo (Zeitlimit)"]])}
      <div class="gruppe-fuss">${state.modus === "lernen" ? "Ohne Zeitdruck, nach jeder Aufgabe sofort Lösung und Lösungsweg." : "10 Aufgaben mit Zeitlimit wie im Test – Auswertung am Ende."}</div></div>
    ${stufenlos ? "" : `<div class="gruppe"><div class="gruppe-titel">Schwierigkeit</div>${seg("stufe", String(state.stufe), [["1", "Stufe 1"], ["2", "Stufe 2"], ["3", "Stufe 3 · mehrstufig"]])}</div>`}
    <div class="gruppe"><div class="gruppe-titel">Aufgabentypen</div>
      <button class="knopf" data-a="bereichStart" style="margin-bottom:12px">${ic("mischen")} Alle Typen gemischt</button>
      <div class="themen-karten">${typen.map((t, i) => typKarte(t, i)).join("")}</div></div>`}`;
}

function vgRekorde() {
  const t = S.stat.typen.vg;
  if (!t) return "";
  return `<div class="gruppe"><div class="gruppe-titel">Dein Stand</div><div class="stat-reihe">
    <div class="stat-kachel"><div class="zahl">${t.n}</div><div class="lbl">Aufgaben</div></div>
    <div class="stat-kachel"><div class="zahl">${pct(S.quote(t))}</div><div class="lbl">Trefferquote</div></div>
    <div class="stat-kachel"><div class="zahl">${sek(S.schnitt(t))}</div><div class="lbl">Ø je Aufgabe (Ziel ≤ 5 s)</div></div></div></div>`;
}

// ----- session view
function sessionView() {
  const s = state.s, b = blockAkt();
  if (s.zwischen) return zwischenView();
  const a = aufgabeAkt(), antw = b.antworten[s.i];
  const zeigen = s.beantwortet && b.feedback === "sofort";
  const pos = Number.isFinite(b.anzahl) ? `${s.i + 1} / ${b.anzahl}` : b.zeitModus === "sprint" ? `${b.antworten.filter(Boolean).length} gelöst` : `Aufgabe ${s.i + 1}`;
  const uhrStart = b.zeitModus === "aufgabe" ? uhr(b.zeit) : b.zeitModus === "block" || b.zeitModus === "sprint" ? uhr(b.zeit - (performance.now() - s.blockStart) / 1000) : "00:00";
  const blitz = s.blitz ? `<span class="blitz ${s.blitz.ok ? "ja" : "nein"}" style="--n:${s.blitz.n}"></span>` : "";
  return `
  <div class="tt-kopf">
    <button class="icon-btn" data-a="abbrechen" aria-label="Beenden">${ic("kreuz")}</button>
    <div class="tt-titel"><b>${esc(b.titel)}</b>${s.bloecke.length > 1 ? `<span class="sub">Teil ${s.bi + 1} von ${s.bloecke.length}</span>` : ""}</div>
    <div class="tt-pos">${pos}${blitz}</div>
    <div class="tt-uhr ${b.zeitModus === "keine" ? "stopp" : ""}" id="tt-uhr">${uhrStart}</div>
  </div>
  ${Number.isFinite(b.anzahl) ? `<div class="tt-fortschritt"><span style="width:${(s.i / b.anzahl) * 100}%"></span></div>` : ""}
  ${aufgabeHtml(a, zeigen ? antw : null)}
  ${zeigen ? auswertungHtml(a, antw, true) : ""}`;
}

function optionenHtml(a, antw) {
  const lock = !!antw;
  const kl = (i) => (!lock ? "" : i === a.richtig ? "richtig" : i === antw.g ? "falsch" : "");
  if (a.vg) {
    return `<div class="vg-knoepfe">${a.optionen.map((o, i) => `<button class="vg-knopf ${kl(i)}" data-a="antwort" data-v="${i}" ${lock ? "disabled" : ""}>${i === 0 ? ic("zurueck") : ""}<span>${o}</span>${i === 1 ? ic("pfeil") : ""}</button>`).join("")}</div>`;
  }
  if (a.logik || (a.englisch && a.texte) || (a.englisch && a.festeReihenfolge && a.optionen.length === 4 && a.optionen[0] === "(A)")) {
    return `<div class="optionen reihe n${a.optionen.length}">${a.optionen.map((o, i) => `<button class="option kurz ${kl(i)}" data-a="antwort" data-v="${i}" ${lock ? "disabled" : ""}><span>${o}</span>${!lock ? `<span class="taste">${i + 1}</span>` : ""}</button>`).join("")}</div>`;
  }
  if (a.optionenRoh) {
    return `<div class="graph-optionen">${a.optionen.map((o, i) => `<button class="graph-option ${kl(i)}" data-a="antwort" data-v="${i}" ${lock ? "disabled" : ""} aria-label="Graph ${BUCHST[i]}"><span class="kreis">${BUCHST[i]}</span>${o}</button>`).join("")}</div>`;
  }
  return `<div class="optionen">${a.optionen.map((o, i) => `<button class="option ${kl(i)}" data-a="antwort" data-v="${i}" ${lock ? "disabled" : ""}><span class="kreis">${lock && i === a.richtig ? ic("haken") : lock && i === antw.g ? ic("kreuz") : BUCHST[i]}</span><span>${o}</span>${!lock ? `<span class="taste">${i + 1}</span>` : ""}</button>`).join("")}</div>`;
}

function aufgabeHtml(a, antw) {
  const typName = a.typ === "einstieg" ? "Einstiegstest" : TYPEN[a.typ].name;
  const meta = `<div class="meta"><span>${esc(typName)}</span>${a.typ !== "einstieg" && !TYPEN[a.typ]?.stufenlos && a.typ !== "vg" ? `<span class="typ">Stufe ${a.stufe}</span>` : ""}</div>`;
  if (a.vg) {
    return `<div class="aufgabe vg-aufgabe">
      <div class="vg-frage ${a.frageArt}">${a.frageArt === "groesser" ? "Welcher Wert ist <b>größer</b>?" : "Welcher Wert ist <b>kleiner</b>?"}</div>
      <div class="vg-seiten"><div class="vg-seite">${ausdruckHtml(a.links)}</div><div class="vg-vs">?</div><div class="vg-seite">${ausdruckHtml(a.rechts)}</div></div>
      <div class="vg-legende" aria-label="Legende">${a.legende.map(([id, v]) => `<span class="vg-leg">${form(id, 22)}<i>=</i><b>${v}</b></span>`).join("")}</div>
    </div>${optionenHtml(a, antw)}`;
  }
  if (a.logik) {
    return `<div class="aufgabe">${meta}<div class="logik-text">${esc(a.text)}</div>
      <div class="logik-anweisung">${esc(a.frage)}</div>
      <div class="logik-aussage">${a.praemissen.map((p) => `<span class="prae">${esc(p)}</span>`).join(" ")} <span class="also">Also gilt:</span> <span class="schluss">${esc(a.schluss)}</span></div>
    </div>${optionenHtml(a, antw)}`;
  }
  if (a.englisch) {
    let body = "";
    if (a.texte) body = `<div class="lesetexte">${a.texte.map((t, i) => `<div class="lesetext"><b>(${i + 1})</b> ${t}</div>`).join("")}</div><div class="en-aussage">${a.aussage}</div>`;
    else if (a.lesetext) body = `<div class="en-titel">${esc(a.titel)}</div><div class="lesetext lang">${a.lesetext}</div>`;
    else if (a.satz) body = `<div class="en-satz">${a.satz}</div>`;
    return `<div class="aufgabe" lang="en">${meta}<div class="en-frage">${esc(a.frage)}</div>${body}</div>${optionenHtml(a, antw)}`;
  }
  return `<div class="aufgabe">${meta}<div class="text">${esc(a.frage)}</div>
    ${a.reihe ? `<div class="zahlenreihe">${a.reihe.map((z) => `<span class="${z === "?" ? "frage" : ""}">${esc(z)}</span>`).join("")}</div>` : ""}
    ${a.tabelle ? `<div class="tabelle-huelle">${a.tabelle}</div>` : ""}
    ${a.bild ? `<div class="grafik-box">${a.bild}</div>` : ""}
  </div>${optionenHtml(a, antw)}`;
}

function auswertungHtml(a, antw, mitWeiter) {
  const ok = antw.ok, zeit = antw.ms / 1000;
  const ziel = TYPEN[a.statTyp]?.zeit;
  return `<div class="gruppe" id="auswertung"><div class="auswertung ${ok ? "" : "nein"}">
    <div class="urteil ${ok ? "ja" : "nein"}">${ok ? "✓ Richtig" : antw.g === -1 ? "⏱ Zeit abgelaufen" : "✗ Leider falsch"} <span class="zeit-pille ${ziel && zeit > ziel ? "langsam" : ""}">${sek(zeit)}${ziel ? ` · Ziel ${ziel} s` : ""}</span></div>
    ${!ok ? `<div class="richtige">Richtig ist: <b>${a.optionenRoh ? "Graph " + BUCHST[a.richtig] : a.optionen[a.richtig]}</b></div>` : ""}
    <div class="loes-kopf">Lösungsweg</div>
    <ol class="schritte">${a.schritte.map((x) => `<li>${x}</li>`).join("")}</ol>
    <details class="schema"><summary>${ic("ziel", "klein")} Lösungsschema für diesen Typ</summary><ol>${a.schema.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></details>
  </div>
  ${mitWeiter ? `<button class="knopf" data-a="weiter" style="margin-top:14px">Weiter ${ic("pfeil")}</button>` : ""}</div>`;
}

function zwischenView() {
  const s = state.s, e = s.ergebnisse[s.ergebnisse.length - 1], n = s.bloecke[s.bi + 1];
  return `<div class="zwischen">
    <div class="zw-fertig">${ic("haken", "gross")}</div>
    <h1 class="titel">${esc(e.titel)}</h1>
    <p class="untertitel">${e.zeitUm ? "Zeit abgelaufen. " : ""}Teil ${s.bi + 1} von ${s.bloecke.length} geschafft. Die Auswertung kommt am Ende.</p>
    <div class="hinweis-box"><span class="symbol">${ic("play")}</span><div><b>Als Nächstes: ${esc(n.titel)}</b><br>${n.zeitModus === "sprint" ? `${uhr(n.zeit)} Minuten, so viele Aufgaben wie möglich` : n.zeitModus === "block" ? `${n.anzahl} Aufgaben in ${uhr(n.zeit)} Minuten` : `${n.anzahl} Aufgaben, je ${n.zeit} Sekunden`}</div></div>
    <button class="knopf" data-a="naechsterBlock" style="margin-top:18px">Weiter, wenn du bereit bist</button>
  </div>`;
}

// ----- results
function ergebnisView() {
  const e = state.ergebnis;
  const bericht = e.ergebnisse.length > 1 || e.art === "simulation";
  const einzel = e.ergebnisse[0];
  return `
  <h1 class="titel">${bericht ? "Ergebnisübersicht" : esc(e.titel)}</h1>
  <p class="untertitel">${bericht ? "Anteil richtiger Antworten je Modul (Verarbeitungsgeschwindigkeit: richtig minus falsch im Verhältnis zum Ziel von 5 s je Aufgabe)." : einzel.sprint ? "Sprint beendet." : "Auswertung"}</p>
  ${bericht ? `<div class="bericht">${e.ergebnisse.map((x, i) => berichtZeile(x, i)).join("")}</div>` : einzelKacheln(einzel)}
  ${e.art === "einstieg" ? einstiegFazit(einzel) : ""}
  ${e.ergebnisse.map((x, bi) => reviewListe(x, bi, bericht)).join("")}
  <div class="kachel-grid" style="margin-top:18px">
    <button class="kachel" data-a="fehler"><span class="k-icon" style="background:var(--warn-weak);color:var(--warn)">${ic("wiederholen")}</span><span class="k-text"><b>Fehler üben</b><span class="sub">${S.offeneFehler().length} offen</span></span></button>
    <button class="kachel" data-a="tab" data-v="start"><span class="k-icon">${ic("start")}</span><span class="k-text"><b>Zur Startseite</b><span class="sub">Tagesplan ansehen</span></span></button>
  </div>`;
}

function berichtZeile(x, i) {
  return `<div class="bericht-zeile" style="--i:${i}"><div class="bz-titel">${esc(x.titel)}<span class="sub">${x.sprint ? `${x.richtig} richtig, ${x.falsch} falsch · Ziel ${x.ziel}` : `${x.richtig} von ${x.gesamt} richtig${x.zeitUm ? " · Zeit abgelaufen" : ""}`}</span></div>
    <div class="bz-skala"><div class="bz-balken"><span style="width:${x.prozent}%"></span><b style="left:${x.prozent}%">${x.prozent}</b></div><div class="bz-achse"><span>0</span><span>100</span></div></div></div>`;
}

function einzelKacheln(x) {
  const schnitt = x.bearbeitet ? x.ms / x.bearbeitet / 1000 : 0;
  return `<div class="stat-reihe">
    <div class="stat-kachel"><div class="zahl" style="color:var(--ok)">${x.richtig}</div><div class="lbl">richtig</div></div>
    <div class="stat-kachel"><div class="zahl" style="color:var(--err)">${x.falsch + (x.sprint ? 0 : Math.max(0, x.gesamt - x.bearbeitet))}</div><div class="lbl">falsch${x.gesamt > x.bearbeitet && !x.sprint ? " / offen" : ""}</div></div>
    <div class="stat-kachel"><div class="zahl">${sek(schnitt)}</div><div class="lbl">Ø je Aufgabe</div></div>
  </div>${x.sprint ? `<div class="hinweis-box" style="margin-top:12px"><span class="symbol">${ic("blitz")}</span><div>${x.bearbeitet} Aufgaben in ${uhr(x.ms / 1000)} – Genauigkeit ${x.bearbeitet ? Math.round((x.richtig / x.bearbeitet) * 100) : 0} %. ${schnitt <= 5 ? "Tempo im Zielbereich." : `Ziel: unter 5 s je Aufgabe (du: ${sek(schnitt)}).`} Genauigkeit geht vor Raten.</div></div>` : ""}`;
}

function einstiegFazit(x) {
  const falsch = x.aufgaben.map((a, i) => [a, x.antworten[i]]).filter(([, w]) => w && !w.ok).map(([a]) => TYPEN[a.statTyp].name);
  return `<div class="hinweis-box" style="margin-top:12px"><span class="symbol">${ic("ziel")}</span><div>${falsch.length ? `Üben solltest du vor allem: <b>${esc([...new Set(falsch)].join(", "))}</b>. Diese Typen landen automatisch im Fehlertraining.` : "Alles richtig – Mathe sitzt. Konzentriere dich auf Tempo und Englisch."}</div></div>`;
}

function reviewListe(x, bi, mitTitel) {
  if (x.sprint) {
    const fehler = x.aufgaben.map((a, i) => [a, x.antworten[i], i]).filter(([, w]) => w && !w.ok);
    if (!fehler.length) return "";
    return `<div class="gruppe"><div class="gruppe-titel">${mitTitel ? esc(x.titel) + " – " : ""}Falsch beantwortet</div><div class="review">${fehler.map(([a, w, i]) => reviewZeile(a, w, `${bi}-${i}`)).join("")}</div></div>`;
  }
  return `<div class="gruppe"><div class="gruppe-titel">${mitTitel ? esc(x.titel) : "Alle Aufgaben"}</div><div class="review">${x.aufgaben.map((a, i) => reviewZeile(a, x.antworten[i], `${bi}-${i}`)).join("")}</div></div>`;
}

function reviewZeile(a, w, key) {
  const offen = state.offen === key;
  const status = !w ? "leer" : w.ok ? "ja" : "nein";
  const kurz = a.vg ? `${zahl(a.werte[0])} vs. ${zahl(a.werte[1])} – ${a.frage}` : a.logik ? a.aussage : a.englisch ? ohneHtml(a.aussage || a.satz || a.frage) : ohneHtml(a.frage);
  return `<div class="review-zeile ${status}"><button class="rz-kopf" data-a="review" data-v="${key}" aria-expanded="${offen}">
    <span class="rz-status">${status === "ja" ? "✓" : status === "nein" ? "✗" : "–"}</span>
    <span class="rz-text"><b>${esc(a.typ === "einstieg" ? TYPEN[a.statTyp].name : TYPEN[a.typ].name)}</b><span class="sub">${esc(kurz.slice(0, 110))}${kurz.length > 110 ? " …" : ""}</span></span>
    ${w ? `<span class="rz-zeit">${sek(w.ms / 1000)}</span>` : ""}</button>
    ${offen ? `<div class="rz-detail">${aufgabeHtml(a, w || { g: -2, ok: false, ms: 0 })}${auswertungHtml(a, w || { g: -2, ok: false, ms: 0 }, false)}</div>` : ""}</div>`;
}

// ----- plan
function planView() {
  const h = heute(), p = phase(h);
  const plan = tagesplan(h, { schwach: S.schwaechste(1), fehler: S.offeneFehler().length }), erledigt = S.stat.plan[h] || [];
  const wochenplan = [["Mo", "Logik"], ["Di", "Zahlen"], ["Mi", "Englisch"], ["Do", "Logik"], ["Fr", "Zahlen"], ["Sa", "Englisch"], ["So", "Simula­tion"]];
  const wt = (new Date(h + "T12:00:00").getDay() + 6) % 7;
  return `
  <h1 class="titel">Lernplan</h1>
  <p class="untertitel">Bis zum Präsenztest am ${new Date(TESTTAG + "T12:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })} · täglich 45–60 Minuten</p>
  <div class="gruppe"><div class="gruppe-titel">Phasen</div><div class="phasen">${PHASEN.map((x, i) => {
    const von = i === 0 ? null : PHASEN[i - 1].bis;
    const aktiv = x.id === p.id;
    return `<div class="phase ${aktiv ? "aktiv" : h > x.bis ? "vorbei" : ""}"><span class="ph-punkt"></span><div><b>${esc(x.titel)}</b><span class="sub">${von ? "ab " + new Date(S.plusTage(von, 1) + "T12:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "numeric" }) + " · " : "bis " + new Date(x.bis + "T12:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "numeric" }) + " · "}${esc(x.text)}</span></div></div>`;
  }).join("")}</div></div>
  <div class="gruppe"><div class="gruppe-titel">Täglicher Schwerpunkt</div>
    <div class="hinweis-box"><span class="symbol">${ic("blitz")}</span><div><b>Jeden Tag:</b> Formen-Sprint (Verarbeitungsgeschwindigkeit) und Englisch Satzbau + Lückentext – das sind laut Online-Ergebnis die Module mit dem meisten Potenzial. Zahlen und Schlussfolgern laufen zum Warmhalten im Wechsel mit.</div></div></div>
  <div class="gruppe"><div class="gruppe-titel">Wechselbereich</div><div class="gruppe-fuss" style="margin:0 4px 8px">Logik = Schlussfolgern · Englisch = Sätze ergänzen + Texte zuordnen</div><div class="wochen-raster">${wochenplan.map(([d, t], i) => `<div class="wr-tag ${i === wt ? "heute" : ""}"><b>${d}</b><span>${esc(t)}</span></div>`).join("")}</div></div>
  <div class="gruppe"><div class="gruppe-titel">Heute · ${esc(datumLang(h))}</div><div class="plan-liste">${plan.map((x, i) => planKarte(x, erledigt.includes(x.id), i)).join("")}</div></div>`;
}

// ----- statistics
function statistikView() {
  const alle = Object.values(S.stat.typen), n = alle.reduce((x, t) => x + t.n, 0), r = alle.reduce((x, t) => x + t.r, 0);
  const tage = Array.from({ length: 14 }, (_, i) => S.plusTage(heute(), i - 13));
  const maxN = Math.max(10, ...tage.map((d) => S.stat.tage[d]?.n || 0));
  const fehler = S.offeneFehler().slice(0, 15);
  const schwach = S.schwaechste(3);
  return `
  <h1 class="titel">Statistik</h1>
  <div class="stat-reihe">
    <div class="stat-kachel"><div class="zahl">${n}</div><div class="lbl">Aufgaben</div></div>
    <div class="stat-kachel"><div class="zahl">${pct(n ? r / n : null)}</div><div class="lbl">richtig</div></div>
    <div class="stat-kachel"><div class="zahl">${S.serie()}</div><div class="lbl">Tage in Folge</div></div>
  </div>
  <div class="gruppe"><div class="gruppe-titel">Letzte 14 Tage</div><div class="tage-diagramm">${tage.map((d) => { const t = S.stat.tage[d]; const h = t ? Math.round((t.n / maxN) * 100) : 0; return `<div class="td-spalte" title="${d}: ${t?.n || 0} Aufgaben"><span class="td-balken" style="height:${h}%"><span style="height:${t ? Math.round((t.r / t.n) * 100) : 0}%"></span></span><i>${Number(d.slice(8))}</i></div>`; }).join("")}</div>
    <div class="gruppe-fuss">Balkenhöhe = Anzahl, farbiger Teil = Anteil richtig.</div></div>
  ${schwach.length ? `<div class="gruppe"><div class="gruppe-titel">Schwächste Typen</div><div class="themen-karten">${schwach.map((t, i) => typKarte(t, i)).join("")}</div></div>` : ""}
  ${BEREICHE.map((b) => `<div class="gruppe"><div class="gruppe-titel">${esc(b.name)}</div><div class="themen-karten">${typenIn(b.id).map((t, i) => typKarte(t, i)).join("")}</div></div>`).join("")}
  ${S.stat.sims.length ? `<div class="gruppe"><div class="gruppe-titel">Testsimulationen</div><div class="liste">${S.stat.sims.slice(0, 8).map((x) => `<div class="zeile"><div class="grow"><b>${new Date(x.t).toLocaleDateString("de-DE", { day: "numeric", month: "short" })}${x.kurz ? " · kurz" : ""}</b><div class="sub">${x.bloecke.map((y) => `${esc(y.titel.replace(" – Englisch", " (E)"))} ${y.prozent}`).join(" · ")}</div></div></div>`).join("")}</div></div>` : ""}
  <div class="gruppe"><div class="gruppe-titel">Fehlerprotokoll <span class="sub" style="text-transform:none;letter-spacing:0">${S.offeneFehler().length} offen</span></div>
    ${fehler.length ? `<div class="review">${fehler.map((f, i) => fehlerZeile(f, i)).join("")}</div>` : `<div class="hinweis-box"><span class="symbol">${ic("haken")}</span><div>Keine offenen Fehler.</div></div>`}</div>`;
}

function fehlerZeile(f, i) {
  const a = erzeuge(f.typ, f.seed, f.stufe, f.idx);
  const key = `f-${i}`, offen = state.offen === key;
  const deine = f.gewaehlt === -1 ? "Zeit abgelaufen" : a.optionenRoh ? `Graph ${BUCHST[f.gewaehlt]}` : ohneHtml(a.optionen[f.gewaehlt]);
  const richtig = a.optionenRoh ? `Graph ${BUCHST[a.richtig]}` : ohneHtml(a.optionen[a.richtig]);
  return `<div class="review-zeile nein"><button class="rz-kopf" data-a="review" data-v="${key}" aria-expanded="${offen}">
    <span class="rz-status">✗</span><span class="rz-text"><b>${esc(a.typ === "einstieg" ? TYPEN[a.statTyp].name : TYPEN[a.typ].name)}</b><span class="sub">Deine Antwort: ${esc(deine)} · richtig: ${esc(richtig)}</span></span>
    <span class="rz-zeit">${new Date(f.t).toLocaleDateString("de-DE", { day: "numeric", month: "numeric" })}</span></button>
    ${offen ? `<div class="rz-detail">${aufgabeHtml(a, { g: f.gewaehlt, ok: false, ms: f.zeit })}${auswertungHtml(a, { g: f.gewaehlt, ok: false, ms: f.zeit }, false)}</div>` : ""}</div>`;
}

// ----- more / settings
function mehrView() {
  const e = S.stat.einst;
  const seg = (name, wert, opts) => `<div class="modus-karte"><div class="segment">${opts.map(([v, t]) => `<button class="${String(wert) === String(v) ? "aktiv" : ""}" data-a="${name}" data-v="${v}">${t}</button>`).join("")}</div></div>`;
  return `
  <h1 class="titel">Mehr</h1>
  <div class="gruppe"><div class="gruppe-titel">Darstellung</div>${seg("theme", e.theme, [["system", "System"], ["hell", "Hell"], ["dunkel", "Dunkel"]])}</div>
  <div class="gruppe"><div class="gruppe-titel">Tagesziel (Aufgaben)</div>${seg("ziel", e.ziel, [[20, "20"], [40, "40"], [60, "60"], [100, "100"]])}</div>
  <div class="gruppe"><div class="gruppe-titel">Datensicherung</div><div class="liste">
    <button class="zeile" data-a="export"><span class="symbol">${ic("export")}</span><div class="grow"><b>Fortschritt exportieren</b><div class="sub">JSON-Datei – Backup oder Übertragung auf ein anderes Gerät</div></div></button>
    <label class="zeile" style="cursor:pointer"><span class="symbol">${ic("wiederholen")}</span><div class="grow"><b>Fortschritt importieren</b><div class="sub">Ersetzt den Stand auf diesem Gerät</div></div><input type="file" accept="application/json,.json" id="importDatei" hidden></label>
    <button class="zeile" data-a="reset"><span class="symbol" style="background:var(--err-weak);color:var(--err)">${ic("muell")}</span><div class="grow"><b>Alles zurücksetzen</b><div class="sub">Statistik und Fehlerprotokoll löschen</div></div></button>
  </div><div class="gruppe-fuss">Der Lernstand liegt nur auf diesem Gerät (keine Konten, keine Server, keine Tracker).</div></div>
  <div class="gruppe"><div class="gruppe-titel">Über den Test</div><div class="hinweis-box"><span class="symbol">${ic("info")}</span><div>
    Der Online-Test der Bundesbank läuft über die Plattform PERLS (eligo) und wird beim Präsenztest vor Ort überprüft. Module laut Ergebnisbericht: Umgang mit Zahlen, Angewandtes Schlussfolgern, Verarbeitungsgeschwindigkeit sowie Englisch (Sätze ergänzen, Texte zuordnen, Satzbau und Verstehen, Lückentext). Diese App enthält ausschließlich eigene Übungsaufgaben in diesen Formaten – keine Originalaufgaben.</div></div></div>
  <div class="gruppe"><div class="liste"><a class="zeile" href="../"><span class="symbol">${ic("start")}</span><div class="grow"><b>Zum Finanzwirt-Trainer</b></div><span class="chev">${ic("pfeil", "klein")}</span></a></div></div>`;
}

function simStartView() {
  const k = state.simKurz;
  const bl = [["Angewandtes Schlussfolgern", k ? "7 Aufgaben" : "14 Aufgaben", "80 s je Aufgabe"], ["Umgang mit Zahlen", k ? "7 Aufgaben" : "13 Aufgaben", "75 s je Aufgabe"], ["Verarbeitungsgeschwindigkeit", "Sprint", k ? "1:30 Min" : "3 Min"], ["Sätze ergänzen – Englisch", k ? "5 Aufgaben" : "10 Aufgaben", "Blockzeit"], ["Texte zuordnen – Englisch", k ? "6 Aufgaben" : "10 Aufgaben", "Blockzeit"], ["Satzbau und Verstehen – Englisch", k ? "5 Aufgaben" : "10 Aufgaben", "Blockzeit"], ["Lückentext – Englisch", k ? "5 Aufgaben" : "10 Aufgaben", "Blockzeit"]];
  return `
  <button class="zurueck-link" data-a="tab" data-v="start">${ic("zurueck", "klein")} Start</button>
  <h1 class="titel">Testsimulation</h1>
  <p class="untertitel">Alle Module nacheinander unter Echtbedingungen: Zeitlimit, keine Lösungen zwischendurch, Ergebnisübersicht am Ende.</p>
  <div class="modus-karte"><div class="segment"><button class="${!k ? "aktiv" : ""}" data-a="simKurz" data-v="0">Vollständig · ca. 60 Min</button><button class="${k ? "aktiv" : ""}" data-a="simKurz" data-v="1">Kurz · ca. 30 Min</button></div></div>
  <div class="gruppe"><div class="sim-bloecke">${bl.map(([t, n, z], i) => `<div class="sim-block" style="--i:${i}"><span class="sb-nr">${i + 1}</span><div><b>${esc(t)}</b><span class="sub">${n} · ${z}</span></div></div>`).join("")}</div></div>
  <button class="knopf" data-a="simLos">${ic("play", "fill")} Simulation starten</button>`;
}

// ======================================================= render + actions
function render() {
  if (state.view !== "session") farbe(state.view === "bereich" ? BEREICH[state.bereich].farbe : state.view === "simStart" ? SIM_FARBE : state.view === "ergebnis" && state.ergebnis?.farbe ? state.ergebnis.farbe : STANDARD_FARBE);
  const inhalt = { start: startView, bereich: bereichView, session: sessionView, ergebnis: ergebnisView, plan: planView, statistik: statistikView, mehr: mehrView, simStart: simStartView }[state.view]();
  const mitTabs = !["session"].includes(state.view);
  app.innerHTML = `<main class="screen tt ${state.view === "session" ? "tt-session" : ""}">${inhalt}</main>${mitTabs ? tabbar() : ""}`;
  const imp = document.getElementById("importDatei");
  if (imp) imp.addEventListener("change", importieren);
}

async function importieren(ev) {
  const f = ev.target.files?.[0];
  if (!f) return;
  try { S.importText(await f.text()); state.meldung = "Fortschritt importiert."; themeAnwenden(); state.view = "start"; }
  catch (e) { alert("Import fehlgeschlagen: " + e.message); }
  render();
}

const AKTIONEN = {
  tab: (v) => { state.view = v; state.offen = -1; state.meldung = ""; render(); window.scrollTo(0, 0); },
  bereich: (v) => { state.bereich = v; state.view = "bereich"; render(); window.scrollTo(0, 0); },
  modus: (v) => { state.modus = v; render(); },
  stufe: (v) => { state.stufe = Number(v); render(); },
  typ: (v) => { const b = TYPEN[v].bereich; if (v === "vg") return sprint(180); state.bereich = b; lernSession({ typen: [v] }); },
  typStart: (v) => lernSession({ typen: [v], modus: "lernen", stufe: 2 }),
  bereichStart: () => lernSession({ bereich: state.bereich }),
  sprint: (v) => sprint(Number(v)),
  plan: (v) => { const item = tagesplan(heute(), { schwach: S.schwaechste(1), fehler: S.offeneFehler().length }).find((x) => x.id === v); if (item) planStarten(item); },
  simStart: () => { state.view = "simStart"; render(); window.scrollTo(0, 0); },
  simKurz: (v) => { state.simKurz = v === "1"; render(); },
  simLos: () => simulation(state.simKurz),
  einstieg: () => einstieg(),
  fehler: () => fehlerTraining(),
  antwort: (v) => antworten(Number(v)),
  weiter: () => weiter(),
  naechsterBlock: () => { state.s.bi++; state.s.zwischen = false; blockStarten(); render(); window.scrollTo(0, 0); },
  abbrechen: () => {
    const s = state.s, b = blockAkt();
    const beantwortet = s.ergebnisse.length > 0 || b.antworten.some(Boolean);
    if (!beantwortet) { state.s = null; state.view = s.zurueck || "start"; render(); return; }
    if (!(s.art === "lernen" || s.art === "fehler") && !confirm("Durchgang beenden? Bisherige Antworten werden ausgewertet.")) return;
    s.bloecke.length = s.bi + 1; b.anzahl = b.antworten.filter(Boolean).length || 1; blockEnde();
  },
  review: (v) => { state.offen = state.offen === v ? -1 : v; render(); },
  theme: (v) => { S.stat.einst.theme = v; S.speichern(); themeAnwenden(); render(); },
  ziel: (v) => { S.stat.einst.ziel = Number(v); S.speichern(); render(); },
  export: () => {
    const blob = new Blob([S.exportText()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `testtrainer-${heute()}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  },
  reset: () => { if (confirm("Wirklich alle Statistiken und Fehler löschen?")) { S.zuruecksetzen(); render(); } },
};

app.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-a]");
  if (!el || el.disabled) return;
  const f = AKTIONEN[el.dataset.a];
  if (f) f(el.dataset.v);
});

document.addEventListener("keydown", (ev) => {
  if (state.view !== "session" || !state.s || ev.metaKey || ev.ctrlKey || ev.altKey) return;
  const s = state.s;
  if (s.zwischen) { if (ev.key === "Enter") AKTIONEN.naechsterBlock(); return; }
  const a = aufgabeAkt();
  if (s.beantwortet) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); weiter(); } return; }
  if (a.vg && (ev.key === "ArrowLeft" || ev.key === "ArrowRight")) { ev.preventDefault(); antworten(ev.key === "ArrowLeft" ? 0 : 1); return; }
  const n = Number(ev.key);
  if (n >= 1 && n <= a.optionen.length) antworten(n - 1);
});

themeAnwenden();
render();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
