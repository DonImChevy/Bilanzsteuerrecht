import * as G from "./geld.js";
import { KONTEN, KLASSEN, KLASSEN_TITEL, kontenInKlasse, K } from "./konten.js";
import { THEMEN, THEMA, Zufall, bewerte, leereAntwort, neueZeile, istLeer, loesungText, typBezeichnung } from "./kern.js";
import { fragen, klausur, vorlagenFuer, ALLE } from "./katalog.js";
import { LERNKARTEN } from "./lernkarten.js";

// ======================= Speicher =======================
const SPEICHER = "bsr.stat.v1";
function laden() {
  try {
    const s = JSON.parse(localStorage.getItem(SPEICHER));
    if (s && s.proThema) return { klausuren: [], karten: [], ...s };
  } catch (_) { /* leer */ }
  return { proThema: {}, klausuren: [], karten: [] };
}
let stat = laden();
function speichern() {
  try { localStorage.setItem(SPEICHER, JSON.stringify(stat)); } catch (_) { /* privat-Modus */ }
}
const zaehler = (t) => stat.proThema[t] || { b: 0, r: 0 };
const quote = (z) => (z.b ? z.r / z.b : 0);
function erfasse(frage, korrekt) {
  const z = { ...zaehler(frage.thema) };
  z.b += 1;
  if (korrekt) z.r += 1;
  stat.proThema[frage.thema] = z;
  speichern();
}
function schwaechstesThema() {
  return THEMEN.filter((t) => zaehler(t.id).b >= 3).sort((a, b) => quote(zaehler(a.id)) - quote(zaehler(b.id)))[0];
}

// ======================= Zustand =======================
const state = {
  tab: "ueben",
  sitzung: null,
  sheet: null, // {art: "konto"|"kontoDetail"|"info"|"raster", ...}
  deck: null,
  kontoSuche: "",
  klausurAnzahl: 20,
  klausurMinuten: 45,
  kartenThemen: new Set(),
};

const app = document.getElementById("app");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const farbklasse = (q) => (q >= 0.8 ? "gut" : q >= 0.5 ? "mittel" : "schlecht");

// ======================= Sitzung =======================
function neueSitzung(opt) {
  const r = new Zufall();
  const fr = opt.modus === "klausur"
    ? klausur(opt.anzahl, r)
    : fragen(opt.themen, opt.anzahl || 10, r, opt.nurBuchung);
  return {
    ...opt, fragen: fr, antworten: fr.map(leereAntwort), bewertungen: fr.map(() => null),
    index: 0, beendet: false, start: Date.now(), ende: null, review: null,
  };
}
function starte(opt) {
  state.sitzung = neueSitzung(opt);
  render();
  scrollOben();
}
const s = () => state.sitzung;
const aktFrage = () => s().fragen[s().index];
const aktAntwort = () => s().antworten[s().index];

function sitzungTitel(x) {
  if (x.modus === "klausur") return "Klausur";
  if (x.nurBuchung) return "Buchungssätze";
  if (x.themen.length === 1) return THEMA[x.themen[0]].titel;
  return "Gemischte Übung";
}

function pruefen() {
  const x = s();
  if (x.bewertungen[x.index]) return;
  const b = bewerte(aktFrage(), aktAntwort());
  x.bewertungen[x.index] = b;
  erfasse(aktFrage(), b.korrekt);
  if (navigator.vibrate) navigator.vibrate(b.korrekt ? 20 : [30, 40, 30]);
  render();
  setTimeout(() => document.getElementById("auswertung")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
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
      erfasse(f, x.bewertungen[i].korrekt);
    }
  });
  x.beendet = true;
  x.ende = Date.now();
  const richtig = x.bewertungen.filter((b) => b.korrekt).length;
  stat.klausuren.push({ datum: x.start, richtig, gesamt: x.fragen.length, sek: Math.round((x.ende - x.start) / 1000) });
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
setInterval(() => {
  const r = restSekunden();
  if (r == null || s().beendet) return;
  const el = document.getElementById("timer");
  if (el) {
    el.textContent = `⏱ ${Math.floor(r / 60)}:${String(r % 60).padStart(2, "0")}`;
    el.classList.toggle("knapp", r < 300);
  }
  if (r === 0) { abgeben(); toast("Zeit abgelaufen – Klausur wurde abgegeben."); }
}, 1000);

function scrollOben() {
  requestAnimationFrame(() => { const el = document.querySelector(".vb-inhalt"); if (el) el.scrollTop = 0; });
}

// ======================= Render: Tabs =======================
const TABS = [
  ["ueben", "✏️", "Üben"],
  ["klausur", "⏱️", "Klausur"],
  ["karten", "🗂️", "Karten"],
  ["konten", "📒", "Konten"],
  ["fortschritt", "📊", "Fortschritt"],
];

function render() {
  const aktiv = document.activeElement;
  const fokusId = aktiv && aktiv.dataset ? aktiv.dataset.fokus : null;
  let html = "";
  const tab = { ueben: tabUeben, klausur: tabKlausur, karten: tabKarten, konten: tabKonten, fortschritt: tabFortschritt }[state.tab]();
  html += `<main class="screen">${tab}</main>`;
  html += `<nav class="tabbar">${TABS.map(([id, i, t]) => `<button data-a="tab" data-v="${id}" class="${state.tab === id ? "aktiv" : ""}"><span class="ti">${i}</span>${t}</button>`).join("")}</nav>`;
  if (state.sitzung) html += sitzungView();
  if (state.deck) html += deckView();
  if (state.sheet) html += sheetView();
  app.innerHTML = html;
  document.body.style.overflow = state.sitzung || state.deck || state.sheet ? "hidden" : "";
  if (fokusId) document.querySelector(`[data-fokus="${fokusId}"]`)?.focus();
}

function istStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function tabUeben() {
  const schwach = schwaechstesThema();
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  return `
    <div class="kopfzeile"><h1 class="titel">BSR-Trainer</h1><button class="icon-btn" data-a="info" aria-label="Info">ⓘ</button></div>
    ${!istStandalone() ? `<div class="hinweis-box"><span>📲</span><div><b>Als App installieren:</b> ${ios ? "In Safari unten auf <b>Teilen</b> ⬆️ tippen → <b>„Zum Home-Bildschirm“</b>." : installEvent ? "Ein Tipp genügt:" : "In Chrome oben rechts auf <b>⋮</b> tippen → <b>„Zum Startbildschirm hinzufügen“</b> bzw. <b>„App installieren“</b> → <b>„Installieren“</b>."} Danach funktioniert alles auch offline.
      ${!ios && installEvent ? `<button class="knopf" style="margin-top:10px" data-a="installieren">⬇ App installieren</button>` : ""}</div></div>` : ""}
    <div class="gruppe"><div class="gruppe-titel">Schnellstart</div><div class="liste">
      ${schnell("buchung", "✍️", "Buchungssätze trainieren", "10 zufällige Geschäftsvorfälle aus allen Themen – jedes Mal mit neuen Beträgen.")}
      ${schnell("alles", "🔀", "Alles gemischt", "Buchungssätze, Theorie- und Rechenaufgaben quer durch das Skript.")}
      ${schwach && quote(zaehler(schwach.id)) < 0.8 ? schnell("schwach", "🎯", "Schwächstes Thema", `${schwach.titel} – bisher ${Math.round(quote(zaehler(schwach.id)) * 100)} % richtig.`, schwach.id) : ""}
    </div></div>
    <div class="gruppe"><div class="gruppe-titel">Themen (Skript Teil I)</div><div class="liste">
      ${THEMEN.map((t) => {
        const z = zaehler(t.id), q = quote(z);
        return `<button class="zeile" data-a="thema" data-v="${t.id}">
          <span class="symbol">${t.icon}</span>
          <span class="grow"><div>${esc(t.titel)}</div><div class="sub">${esc(t.unter)}</div>
            ${z.b ? `<div class="balken"><span class="${farbklasse(q)}" style="width:${Math.round(q * 100)}%"></span></div>` : ""}</span>
          ${z.b ? `<span class="sub mono">${z.r}/${z.b}</span>` : ""}<span class="chev">›</span></button>`;
      }).join("")}
    </div></div>`;
}
const schnell = (a, icon, titel, text, v = "") => `<button class="zeile" data-a="schnell" data-v="${a}" data-t="${v}"><span class="symbol">${icon}</span><span class="grow"><div><b>${titel}</b></div><div class="sub">${esc(text)}</div></span><span class="chev">›</span></button>`;

function tabKlausur() {
  const zeiten = [0, 30, 45, 60, 90];
  return `
    <h1 class="titel">Klausur</h1>
    <div class="liste"><div class="zeile"><span class="symbol">🎓</span><span class="grow"><div><b>Klausursimulation</b></div>
      <div class="sub">Gemischte Aufgaben aus allen Themen, Schwerpunkt Buchungssätze (ca. 60 %). Die Auswertung gibt es erst nach Abgabe – wie in der echten Klausur.</div></span></div></div>
    <div class="gruppe"><div class="gruppe-titel">Einstellungen</div><div class="liste">
      <div class="zeile"><span class="grow">Aufgaben</span>
        <button class="badge art-abschluss" style="font-size:18px;padding:4px 14px" data-a="anzahl" data-v="-5">−</button>
        <b class="mono" style="min-width:32px;text-align:center">${state.klausurAnzahl}</b>
        <button class="badge art-abschluss" style="font-size:18px;padding:4px 14px" data-a="anzahl" data-v="5">+</button></div>
      <div class="zeile"><span class="grow">Zeitlimit</span>
        ${zeiten.map((m) => `<button class="badge ${state.klausurMinuten === m ? "art-aktiv" : "art-abschluss"}" style="font-size:13px;padding:5px 9px" data-a="minuten" data-v="${m}">${m ? m + " min" : "ohne"}</button>`).join("")}</div>
    </div></div>
    <button class="knopf" data-a="klausurStart">▶ Klausur starten</button>
    ${stat.klausuren.length ? `<div class="gruppe"><div class="gruppe-titel">Bisherige Klausuren</div><div class="liste">
      ${[...stat.klausuren].reverse().slice(0, 30).map((k) => `<div class="zeile"><span class="grow"><div>${new Date(k.datum).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" })}</div><div class="sub">${Math.round(k.sek / 60)} min</div></span>
        <b class="mono" style="color:${k.richtig / k.gesamt >= 0.5 ? "var(--ok)" : "var(--err)"}">${k.richtig}/${k.gesamt}</b></div>`).join("")}
    </div></div>` : ""}`;
}

function tabKarten() {
  const gewusst = new Set(stat.karten);
  const offen = LERNKARTEN.filter((k) => !gewusst.has(k.id));
  const themen = THEMEN.filter((t) => LERNKARTEN.some((k) => k.thema === t.id));
  return `
    <h1 class="titel">Lernkarten</h1>
    <div class="liste">
      <button class="zeile" data-a="deck" data-v="alle"><span class="symbol">🔀</span><span class="grow">Alle Karten mischen (${LERNKARTEN.length})</span><span class="chev">›</span></button>
      ${offen.length && offen.length < LERNKARTEN.length ? `<button class="zeile" data-a="deck" data-v="offen"><span class="symbol">❓</span><span class="grow">Nur noch nicht gewusste (${offen.length})</span><span class="chev">›</span></button>` : ""}
    </div>
    <div class="gruppe"><div class="gruppe-titel">Nach Themen</div><div class="liste">
      ${themen.map((t) => {
        const ks = LERNKARTEN.filter((k) => k.thema === t.id), an = state.kartenThemen.has(t.id);
        return `<button class="zeile" data-a="kartenThema" data-v="${t.id}"><span style="font-size:20px;color:${an ? "var(--accent)" : "var(--text3)"}">${an ? "●" : "○"}</span>
          <span class="grow">${esc(t.titel)}</span><span class="sub mono">${ks.filter((k) => gewusst.has(k.id)).length}/${ks.length}</span></button>`;
      }).join("")}
    </div><div class="gruppe-fuss">Die Karten fassen Merksätze, Definitionen, Fristen und Formeln aus dem Skript zusammen.</div></div>
    ${state.kartenThemen.size ? `<button class="knopf" data-a="deck" data-v="auswahl">▶ Auswahl lernen</button>` : ""}`;
}

function tabKonten() {
  return `
    <h1 class="titel">Kontenplan</h1>
    <div class="liste"><button class="zeile" data-a="merksaetze"><span class="symbol">💡</span><span class="grow">Merksätze zum Buchen</span><span class="chev">›</span></button></div>
    ${KLASSEN.map((k) => `<div class="gruppe"><div class="gruppe-titel">${KLASSEN_TITEL[k]}</div><div class="liste">
      ${kontenInKlasse(k).map((kt) => `<button class="zeile" data-a="kontoDetail" data-v="${kt.id}"><span class="grow">${esc(kt.name)}</span><span class="badge art-${kt.art}">${kt.artKurz}</span><span class="chev">›</span></button>`).join("")}
    </div></div>`).join("")}`;
}

function tabFortschritt() {
  const ges = Object.values(stat.proThema).reduce((a, z) => ({ b: a.b + z.b, r: a.r + z.r }), { b: 0, r: 0 });
  const q = quote(ges);
  return `
    <h1 class="titel">Fortschritt</h1>
    <div class="liste"><div class="zeile" style="gap:18px">
      <div class="ring" style="--p:${Math.round(q * 100)};width:84px;height:84px;margin:0"><div style="width:66px;height:66px;font-size:18px">${Math.round(q * 100)} %</div></div>
      <div class="grow"><div><b>${ges.r} von ${ges.b} richtig</b></div><div class="sub">${stat.klausuren.length} Klausuren · ${stat.karten.length}/${LERNKARTEN.length} Lernkarten gewusst</div></div>
    </div></div>
    <div class="gruppe"><div class="gruppe-titel">Nach Thema</div><div class="liste">
      ${THEMEN.map((t) => {
        const z = zaehler(t.id), qq = quote(z);
        return `<div class="zeile"><span class="grow"><div style="display:flex;justify-content:space-between"><span>${t.icon} ${esc(t.titel)}</span><span class="sub mono">${z.b ? Math.round(qq * 100) + " %" : "–"}</span></div>
          <div class="balken"><span class="${z.b ? farbklasse(qq) : ""}" style="width:${Math.round(qq * 100)}%"></span></div>
          <div class="sub">${z.r}/${z.b} richtig · ${vorlagenFuer(t.id).length} Aufgabentypen</div></span></div>`;
      }).join("")}
    </div></div>
    <div class="liste"><button class="zeile" data-a="reset" style="color:var(--err);justify-content:center">Fortschritt zurücksetzen</button></div>`;
}

// ======================= Render: Sitzung =======================
function sitzungView() {
  const x = s();
  if (!x.fragen.length) {
    return `<div class="vollbild"><div class="vb-kopf"><button class="link" data-a="beenden">Schließen</button><div class="mitte">Keine Aufgaben</div><span class="link"></span></div></div>`;
  }
  if (x.beendet && x.review != null) return reviewView();
  if (x.beendet) return ergebnisView();

  const f = aktFrage(), b = x.modus === "klausur" ? null : x.bewertungen[x.index];
  const n = x.fragen.length;
  const r = restSekunden();
  const kopfRechts = x.modus === "klausur"
    ? `<button class="link rechts" data-a="raster">▦</button>`
    : `<span class="link rechts sub mono">${x.index + 1}/${n}</span>`;
  const mitte = x.modus === "klausur" && r != null
    ? `<span id="timer" class="timer ${r < 300 ? "knapp" : ""}">⏱ ${Math.floor(r / 60)}:${String(r % 60).padStart(2, "0")}</span>`
    : esc(sitzungTitel(x));

  let fuss;
  if (x.modus === "klausur") {
    fuss = `<button class="knopf zweit" data-a="zurueck" ${x.index === 0 ? "disabled" : ""}>‹ Zurück</button>` +
      (x.index === n - 1 ? `<button class="knopf" data-a="abgeben">✓ Abgeben</button>` : `<button class="knopf" data-a="weiter">Weiter ›</button>`);
  } else if (!b) {
    fuss = `<button class="knopf" id="pruefen" data-a="pruefen" ${istLeer(f, aktAntwort()) ? "disabled" : ""}>Prüfen</button>`;
  } else {
    fuss = `<button class="knopf ${b.korrekt ? "gruen" : ""}" data-a="weiter">${x.index === n - 1 ? "Auswertung" : "Nächste Aufgabe ›"}</button>`;
  }

  return `<div class="vollbild">
    <div class="vb-kopf"><button class="link" data-a="beenden">Beenden</button><div class="mitte">${mitte}</div>${kopfRechts}</div>
    <div class="fortschritt"><span style="width:${((x.index + 1) / n) * 100}%"></span></div>
    <div class="vb-inhalt">
      <div class="nr">Aufgabe ${x.index + 1} von ${n}</div>
      ${frageView(f, aktAntwort(), b, false)}
    </div>
    <div class="vb-fuss"><div class="reihe">${fuss}</div></div>
  </div>`;
}

function frageView(f, antwort, b, gesperrt) {
  const lock = gesperrt || !!b;
  let eingabe = "";
  if (f.typ === "buchung") eingabe = buchungView(antwort, b?.buchung, lock);
  else if (f.typ === "auswahl") eingabe = auswahlView(f, antwort, !!b, lock);
  else eingabe = zahlView(f, antwort, b, lock);
  return `
    <div class="aufgabe"><div class="meta"><span>${THEMA[f.thema].icon} ${esc(THEMA[f.thema].titel)}</span><span class="typ">${typBezeichnung(f)}</span></div>
      <div class="text">${esc(f.text)}</div></div>
    ${eingabe}
    ${b ? auswertungView(f, b) : ""}`;
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
  return `<div class="gruppe"><div class="gruppe-titel">${mehr ? "Mehrere Antworten sind richtig" : "Eine Antwort ist richtig"}</div><div class="liste">
    ${f.optionen.map((o, i) => {
      const an = antwort.gewaehlt.includes(i);
      let kl = an ? "an" : "", zeichen = an ? "✓" : "";
      if (zeige) {
        if (f.richtig.includes(i)) { kl = "richtig"; zeichen = "✓"; } else if (an) { kl = "falsch"; zeichen = "✗"; } else { kl = ""; zeichen = ""; }
      }
      return `<button class="option ${mehr ? "mehr" : ""} ${kl}" data-a="option" data-v="${i}" ${lock ? "disabled" : ""}><span class="kreis">${zeichen}</span><span>${esc(o)}</span></button>`;
    }).join("")}
  </div></div>`;
}

function zahlView(f, antwort, b, lock) {
  return `<div class="gruppe"><div class="gruppe-titel">Deine Lösung</div>
    <div class="zahl-eingabe">
      ${lock ? "" : `<button class="vz" data-a="vorzeichen" aria-label="Vorzeichen wechseln">±</button>`}
      <input id="zahl" inputmode="decimal" autocomplete="off" placeholder="Ergebnis" data-fokus="zahl" value="${esc(antwort.text)}" ${lock ? "disabled" : ""}>
      <span class="einheit">${f.einheit}</span>
      ${b ? `<span style="font-size:22px;color:${b.korrekt ? "var(--ok)" : "var(--err)"}">${b.korrekt ? "✓" : "✗"}</span>` : ""}
    </div>
    <div class="gruppe-fuss">Format z. B. 1.234,56 – negative Werte mit ±. Toleranz ± ${G.text(f.toleranz)}.</div></div>`;
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
  return `<div class="gruppe" id="auswertung"><div class="auswertung ${b.korrekt ? "" : "nein"}">
    <div class="urteil ${b.korrekt ? "ja" : "nein"}">${b.korrekt ? "✓ Richtig!" : "✗ Leider nicht richtig"}</div>
    ${extra}
    <div class="erkl">${esc(f.erklaerung)}</div>
    ${f.quelle ? `<div class="quelle">📖 ${esc(f.quelle)}</div>` : ""}
  </div></div>`;
}

function ergebnisView() {
  const x = s(), n = x.fragen.length, richtig = x.bewertungen.filter((b) => b?.korrekt).length, q = richtig / n;
  const lob = q >= 0.9 ? "Hervorragend – klausurreif!" : q >= 0.7 ? "Gut! Sieh dir die falschen Aufgaben noch einmal an."
    : q >= 0.5 ? "Solide Basis – hier lohnt sich noch eine Runde." : "Dranbleiben! Lies die Erklärungen zu den falschen Aufgaben.";
  const farbe = q >= 0.8 ? "var(--ok)" : q >= 0.5 ? "var(--warn)" : "var(--err)";
  const dauer = Math.round(((x.ende || Date.now()) - x.start) / 1000);
  return `<div class="vollbild">
    <div class="vb-kopf"><button class="link" data-a="beenden">Fertig</button><div class="mitte">Auswertung</div><span class="link"></span></div>
    <div class="vb-inhalt">
      <div class="zentriert">
        <div class="ring" style="--p:${Math.round(q * 100)};--farbe:${farbe}"><div>${Math.round(q * 100)} %</div></div>
        <h2 style="margin:8px 0 4px">${richtig} von ${n} richtig</h2>
        <div class="sub" style="color:var(--text2)">${lob}</div>
        ${x.modus === "klausur" ? `<div class="sub" style="color:var(--text2);margin-top:4px">Bearbeitungszeit: ${Math.floor(dauer / 60)} min ${dauer % 60} s</div>` : ""}
      </div>
      <div class="gruppe"><div class="gruppe-titel">Aufgaben – antippen für Lösung</div><div class="liste">
        ${x.fragen.map((f, i) => {
          const ok = x.bewertungen[i]?.korrekt;
          return `<button class="zeile" data-a="review" data-v="${i}"><span style="font-size:20px;color:${ok ? "var(--ok)" : "var(--err)"}">${ok ? "✓" : "✗"}</span>
            <span class="grow"><div style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:15px">${esc(f.text)}</div>
            <div class="sub">${esc(THEMA[f.thema].titel)} · ${typBezeichnung(f)}</div></span><span class="chev">›</span></button>`;
        }).join("")}
      </div></div>
    </div>
    <div class="vb-fuss"><div class="reihe">
      <button class="knopf zweit" data-a="beenden">Schließen</button>
      <button class="knopf" data-a="nochmal">↻ ${x.modus === "klausur" ? "Neue Klausur" : "Neue Runde"}</button>
    </div></div>
  </div>`;
}

function reviewView() {
  const x = s(), i = x.review;
  return `<div class="vollbild">
    <div class="vb-kopf"><button class="link" data-a="reviewZurueck">‹ Übersicht</button><div class="mitte">Aufgabe ${i + 1}</div><span class="link"></span></div>
    <div class="vb-inhalt">${frageView(x.fragen[i], x.antworten[i], x.bewertungen[i], true)}</div>
    <div class="vb-fuss"><div class="reihe">
      <button class="knopf zweit" data-a="reviewNav" data-v="-1" ${i === 0 ? "disabled" : ""}>‹ Vorherige</button>
      <button class="knopf zweit" data-a="reviewNav" data-v="1" ${i === x.fragen.length - 1 ? "disabled" : ""}>Nächste ›</button>
    </div></div></div>`;
}

// ======================= Render: Lernkarten =======================
function deckView() {
  const d = state.deck;
  if (d.index >= d.karten.length) {
    return `<div class="vollbild"><div class="vb-kopf"><button class="link" data-a="deckZu">Schließen</button><div class="mitte">Lernkarten</div><span class="link"></span></div>
      <div class="vb-inhalt zentriert" style="display:flex;flex-direction:column;justify-content:center">
        <div style="font-size:64px">🎉</div><h2>Stapel geschafft!</h2><p class="sub" style="color:var(--text2)">${d.gewusst} von ${d.karten.length} Karten gewusst.</p>
        <button class="knopf" data-a="deckZu" style="max-width:300px;margin:12px auto">Schließen</button></div></div>`;
  }
  const k = d.karten[d.index];
  return `<div class="vollbild">
    <div class="vb-kopf"><button class="link" data-a="deckZu">Beenden</button><div class="mitte">Karte ${d.index + 1} von ${d.karten.length}</div><span class="link"></span></div>
    <div class="fortschritt"><span style="width:${(d.index / d.karten.length) * 100}%"></span></div>
    <div class="vb-inhalt" style="display:flex;flex-direction:column">
      <div class="karte-buehne"><div class="karte ${d.um ? "um" : ""}" data-a="umdrehen">
        <div class="seite"><div class="klein">${esc(THEMA[k.thema].titel)}</div><div class="gross">${esc(k.vorne)}</div><div class="sub" style="color:var(--text3);margin-top:24px">Tippen zum Umdrehen</div></div>
        <div class="seite rueck"><div class="klein">${esc(k.vorne)}</div><div class="mittel-t">${esc(k.hinten)}</div></div>
      </div></div>
    </div>
    <div class="vb-fuss"><div class="reihe">
      ${d.um ? `<button class="knopf orange" data-a="karte" data-v="0">↺ Nochmal</button><button class="knopf gruen" data-a="karte" data-v="1">✓ Gewusst</button>`
        : `<button class="knopf zweit" data-a="umdrehen">Umdrehen</button>`}
    </div></div></div>`;
}

// ======================= Render: Sheets =======================
function sheetView() {
  const sh = state.sheet;
  let inhalt = "", titel = "", halb = false, links = "Schließen";
  if (sh.art === "konto") {
    titel = "Konto wählen"; links = "Abbrechen";
    inhalt = `<div class="suche"><input type="search" id="kontoSuche" placeholder="Konto suchen, z. B. Vorsteuer" autocomplete="off" value="${esc(state.kontoSuche)}"></div>
      <div class="vb-inhalt" id="kontoListe" style="padding-top:0">${kontoListe()}</div>`;
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
  } else if (sh.art === "merksaetze") {
    titel = "Merksätze";
    inhalt = `<div class="liste">${MERKSAETZE.map(([t, x]) => `<div class="zeile"><span class="grow"><b>${esc(t)}</b><div class="sub">${esc(x)}</div></span></div>`).join("")}</div>`;
  } else if (sh.art === "raster") {
    titel = "Aufgabenübersicht"; halb = true;
    const x = s();
    inhalt = `<div class="raster">${x.fragen.map((f, i) => `<button data-a="springe" data-v="${i}" class="${istLeer(f, x.antworten[i]) ? "" : "bearbeitet"} ${i === x.index ? "aktuell" : ""}">${i + 1}</button>`).join("")}</div>
      <div class="gruppe-fuss" style="padding-bottom:16px">${x.antworten.filter((a, i) => !istLeer(x.fragen[i], a)).length} von ${x.fragen.length} bearbeitet</div>`;
  } else if (sh.art === "info") {
    titel = "Info";
    inhalt = `<div class="liste"><div class="zeile"><span class="grow"><b style="font-size:20px">BSR-Trainer</b><div class="sub">Lern-App zur Klausurvorbereitung im Bilanzsteuerrecht, Grundstudium I – Buchführung (Teil I).</div></span></div></div>
      <div class="gruppe"><div class="gruppe-titel">So funktioniert's</div><div class="liste">
        ${[
          ["✍️", "Buchungssätze: Konten über „Konto wählen“ aus dem Kontenplan suchen, Betrag eintippen. Zusammengesetzte Buchungssätze über „Position hinzufügen“."],
          ["↕️", "Die Reihenfolge der Positionen ist egal. Mehrere Zeilen mit demselben Konto werden addiert."],
          ["🎲", `Generierte Aufgaben haben bei jedem Durchlauf neue Beträge – insgesamt ${ALLE.length} Aufgabentypen.`],
          ["⏱️", "Im Klausurmodus gibt es die Auswertung erst nach Abgabe."],
          ["€", "USt-Regelsatz 19 %, ermäßigt 7 %. Kontenbezeichnungen nach dem Kontenplan des Skripts."],
          ["✈️", "Funktioniert offline. Der Lernfortschritt wird nur auf diesem Gerät gespeichert."],
          ["📊", "Beim Start wird anonym gezählt, ob die App im Browser oder vom Home-Bildschirm geöffnet wurde (GoatCounter, ohne Cookies). Lernergebnisse werden nie übertragen."],
        ].map(([i, t]) => `<div class="zeile"><span>${i}</span><span class="grow" style="font-size:15px">${t}</span></div>`).join("")}
      </div></div>
      <div class="gruppe"><div class="gruppe-titel">Hinweis</div><div class="liste"><div class="zeile"><span class="grow sub">Inoffizielle Lernhilfe. Die Aufgaben sind inhaltlich am Skript „Bilanzsteuerrecht Grundstudium I, Teil I“ und den zugehörigen Übungen orientiert. Für die Richtigkeit wird keine Gewähr übernommen – maßgeblich sind Skript, Gesetz und Lehrveranstaltung.</span></div>
      <div class="zeile"><span class="grow">Version</span><span class="sub">${VERSION}</span></div></div></div>`;
  }
  return `<div class="sheet-hg" data-a="sheetZu"><div class="sheet ${halb ? "halb" : ""}" data-stop="1">
    <div class="vb-kopf"><button class="link" data-a="sheetZu">${links}</button><div class="mitte">${esc(titel)}</div><span class="link"></span></div>
    <div class="vb-inhalt">${inhalt}</div></div></div>`;
}

function kontoListe() {
  const q = state.kontoSuche.trim().toLowerCase();
  const passt = (k) => !q || k.name.toLowerCase().includes(q) || k.kurz.toLowerCase().includes(q);
  const html = KLASSEN.map((kl) => {
    const ks = kontenInKlasse(kl).filter(passt);
    if (!ks.length) return "";
    return `<div class="gruppe"><div class="gruppe-titel">${KLASSEN_TITEL[kl]}</div><div class="liste">
      ${ks.map((k) => `<button class="zeile" data-a="kontoGewaehlt" data-v="${k.id}"><span class="grow">${esc(k.name)}</span><span class="badge art-${k.art}">${k.artKurz}</span></button>`).join("")}</div></div>`;
  }).join("");
  return html || `<p class="zentriert sub" style="color:var(--text2);margin-top:30px">Kein Konto gefunden.</p>`;
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
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function zeile(id) {
  return aktAntwort().zeilen.find((z) => String(z.id) === String(id));
}

const AKTIONEN = {
  tab: (v) => { state.tab = v; render(); window.scrollTo(0, 0); },
  info: () => { state.sheet = { art: "info" }; render(); },
  schnell: (v, el) => {
    const alle = THEMEN.map((t) => t.id);
    if (v === "buchung") starte({ modus: "uebung", themen: alle, nurBuchung: true });
    else if (v === "alles") starte({ modus: "uebung", themen: alle });
    else starte({ modus: "uebung", themen: [el.dataset.t] });
  },
  thema: (v) => starte({ modus: "uebung", themen: [v] }),
  beenden: () => {
    const x = s();
    if (x && !x.beendet && x.fragen.length) {
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
  nochmal: () => { const x = s(); starte({ modus: x.modus, themen: x.themen, nurBuchung: x.nurBuchung, anzahl: x.fragen.length, minuten: x.minuten }); },
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
  sheetZu: () => { state.sheet = null; render(); },
  kontoDetail: (v) => { state.sheet = { art: "kontoDetail", konto: v }; render(); },
  merksaetze: () => { state.sheet = { art: "merksaetze" }; render(); },
  anzahl: (v) => { state.klausurAnzahl = Math.min(60, Math.max(5, state.klausurAnzahl + Number(v))); render(); },
  minuten: (v) => { state.klausurMinuten = Number(v); render(); },
  klausurStart: () => starte({ modus: "klausur", anzahl: state.klausurAnzahl, minuten: state.klausurMinuten || null }),
  kartenThema: (v) => { state.kartenThemen.has(v) ? state.kartenThemen.delete(v) : state.kartenThemen.add(v); render(); },
  deck: (v) => {
    const r = new Zufall(), gew = new Set(stat.karten);
    const karten = v === "alle" ? LERNKARTEN : v === "offen" ? LERNKARTEN.filter((k) => !gew.has(k.id)) : LERNKARTEN.filter((k) => state.kartenThemen.has(k.thema));
    state.deck = { karten: r.mischen(karten), index: 0, um: false, gewusst: 0 };
    render();
  },
  umdrehen: () => {
    state.deck.um = !state.deck.um;
    // Nur Klassen umschalten, damit die Animation läuft
    document.querySelector(".karte")?.classList.toggle("um", state.deck.um);
    const fuss = document.querySelector(".vb-fuss .reihe");
    if (fuss) fuss.innerHTML = state.deck.um ? `<button class="knopf orange" data-a="karte" data-v="0">↺ Nochmal</button><button class="knopf gruen" data-a="karte" data-v="1">✓ Gewusst</button>` : `<button class="knopf zweit" data-a="umdrehen">Umdrehen</button>`;
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
    if (confirm("Gesamten Fortschritt löschen?")) { stat = { proThema: {}, klausuren: [], karten: [] }; speichern(); render(); }
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
  } else if (t.id === "kontoSuche") {
    state.kontoSuche = t.value;
    document.getElementById("kontoListe").innerHTML = kontoListe();
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
  if (!state.sitzung) render();
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
  if (document.visibilityState === "visible" && Date.now() - letzterStart > 30 * 60 * 1000) zaehleStart();
});

// ======================= Start =======================
const VERSION = "0.1.3";
render();
zaehleStart();

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
