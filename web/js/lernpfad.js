// Lernpfad-Modus: eigene Vollbild-Welt mit Karte (Stationen auf einem Pfad) und in sich geschlossenen Blöcken
// (Intro → Lernkarten → Fragen → Abschluss). Inhalte je Modul in PFADE; Fortschritt (beste Sterne je Block) in localStorage.
import { PFAD_UST } from "./ust/pfad.js";
import { PFAD_EST } from "./est/pfad.js";
import { PFAD_OER } from "./oer/pfad.js";
import { PFAD_BSR1, PFAD_BSR2 } from "./bilr/pfad.js";
import { PFAD_BBF } from "./bilr/bbf_pfad.js";
import * as G from "./geld.js";
import { normenVerlinken } from "./kompakt.js";
import { taler, talerBuehne } from "./maskottchen.js";

// Schlüssel = Modul; Bilanzrecht je nach Auswahl Teil I (bsr1), Teil II (bsr2) oder beide (bsr).
export const PFADE = {
  ust: { titel: "Umsatzsteuer", untertitel: "Vom System bis zum Kleinunternehmer – Block für Block", bloecke: PFAD_UST },
  est: { titel: "Einkommensteuer", untertitel: "Von der Steuerpflicht bis zu den Reisekosten", bloecke: PFAD_EST },
  oer: { titel: "Öffentliches Recht", untertitel: "Vom Staat bis zum Gesetz – Staatsrecht Schritt für Schritt", bloecke: PFAD_OER },
  bsr1: { titel: "Bilanzrecht Teil I", untertitel: "Buchführung – vom Geschäftsvorfall bis zum Abschluss", bloecke: PFAD_BSR1 },
  bsr2: { titel: "Bilanzrecht Teil II", untertitel: "Bilanzierung und Bewertung – vom Betriebsvermögen bis zur Einlage", bloecke: PFAD_BSR2 },
  bsr: { titel: "Bilanzrecht", untertitel: "Teil I und II – Buchführung, Bilanzierung und Bewertung", bloecke: [...PFAD_BSR1, ...PFAD_BSR2] },
  bbf: { titel: "Bilanz und Buchführung", untertitel: "Ausbildung FTA I – von der Buchführungspflicht bis zum Abschluss", bloecke: PFAD_BBF },
};
/** Fortschritt wird je Modul gespeichert – Teil I, Teil II und „beide“ teilen sich die Sterne. */
const speicherVon = (schluessel) => (schluessel.startsWith("bsr") ? "bsr" : schluessel);
/** Lernpfad-Schlüssel für ein Modul (Bilanzrecht abhängig vom gewählten Skriptteil). */
export const pfadSchluessel = (fach, teil = "beide") => (fach === "bsr" ? { 1: "bsr1", 2: "bsr2" }[teil] || "bsr" : fach);

// Speicher stellt die App bereit (Lernstand stat.pfad – wird mit dem Sync-Code abgeglichen).
let speicher = { lesen: () => ({}), schreiben: () => {} };
export const pfadSpeicherSetzen = (s) => { speicher = s; };
export const fortschrittLesen = () => speicher.lesen() || {};
const fortschrittSchreiben = (f) => speicher.schreiben(f);
export function sterneSpeichern(schluessel, id, sterne) {
  const fach = speicherVon(schluessel), f = fortschrittLesen(), alt = f[fach]?.[id]?.sterne || 0;
  f[fach] = { ...(f[fach] || {}), [id]: { sterne: Math.max(alt, sterne), t: Date.now() } };
  fortschrittSchreiben(f);
}
export const pfadStand = (fach) => {
  const f = fortschrittLesen()[speicherVon(fach)] || {}, b = PFADE[fach]?.bloecke || [];
  return { fertig: b.filter((x) => f[x.id]).length, sterne: b.reduce((a, x) => a + (f[x.id]?.sterne || 0), 0), gesamt: b.length, f };
};

/** Neuer Durchgang durch einen Block; Antwortoptionen werden einmal gemischt. */
export function blockStarten(fach, id, r) {
  const b = PFADE[fach].bloecke.find((x) => x.id === id);
  return { id, schritt: 0, fehler: 0, antwort: null, start: Date.now(), reihen: b.fragen.map((q) => (q.optionen ? r.mischen(q.optionen.map((_, i) => i)) : null)) };
}
export const schritte = (b) => 1 + b.karten.length + b.fragen.length + 1; // Intro, Karten, Fragen, Abschluss
export const sterneFuer = (fehler) => (fehler === 0 ? 3 : fehler === 1 ? 2 : 1);

/** Antwort auswerten; gibt {ok, richtigText} zurück. */
export function auswerten(q, eingabe) {
  if (q.art === "wahl") return { ok: Number(eingabe) === q.richtig };
  const c = G.lesen(eingabe);
  return { ok: c != null && Math.abs(c - q.cent) <= 1, wert: c };
}

// ------------------------------------------------------------------ Ansichten
// Normzitate, deren Text in der App steht, öffnen beim Antippen den Gesetzestext
const fett = (t, esc) => normenVerlinken(esc(t)).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
function textHtml(t, esc) {
  const zeilen = t.split("\n"), out = [];
  let liste = [];
  const flush = () => { if (liste.length) { out.push(`<ul>${liste.map((l) => `<li>${fett(l, esc)}</li>`).join("")}</ul>`); liste = []; } };
  for (const z of zeilen) { if (z.startsWith("• ")) liste.push(z.slice(2)); else { flush(); if (z.trim()) out.push(`<p>${fett(z, esc)}</p>`); } }
  flush();
  return out.join("");
}
/** Zahl im deutschen Format ohne Cent, wenn glatt (5.000 €). */
const betrag = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: Number.isInteger(x) ? 0 : 2, maximumFractionDigits: 2 }) + " €";
/**
 * Grafik einer Lernkarte (optional): Mini-Bilanz und/oder T-Konten mit Soll- und Habenseite.
 * grafik = { bilanz: { aktiv: [[Posten, €]], passiv: [[Posten, €]] }, konten: [{ name, art: "aktiv"|"passiv", soll: [[Text, €]], haben: [[Text, €]] }] }
 * Zeilen, deren Text mit „AB“ bzw. „SB“ beginnt, werden als Anfangs- bzw. Schlussbestand hervorgehoben; „+“/„−“ am Anfang färbt Zu- und Abgänge.
 */
function grafikHtml(g, esc) {
  if (!g) return "";
  const zeile = ([t, x]) => {
    const art = /^AB\b/.test(t) ? "ab" : /^SB\b/.test(t) ? "sb" : t.startsWith("+") ? "plus" : t.startsWith("−") ? "minus" : "";
    return `<li class="${art}"><span>${esc(t.replace(/^([+−]) /, "$1\u00a0"))}</span><b>${betrag(x)}</b></li>`;
  };
  const summe = (l) => l.reduce((a, [, x]) => a + x, 0);
  const seite = (titel, l, mitSumme) => `<div class="pf-tk-seite"><div class="pf-tk-kopf">${titel}</div><ul>${l.map(zeile).join("")}</ul>${mitSumme ? `<div class="pf-tk-summe">${betrag(summe(l))}</div>` : ""}</div>`;
  const bilanz = g.bilanz ? `<figure class="pf-tk bilanz" aria-label="Bilanz"><figcaption>Bilanz</figcaption><div class="pf-tk-t">${seite("Aktiva", g.bilanz.aktiv, true)}${seite("Passiva", g.bilanz.passiv, true)}</div></figure>` : "";
  const konten = (g.konten || []).map((k, _, __, sb = [...k.soll, ...k.haben].some(([t]) => /^SB\b/.test(t))) => `<figure class="pf-tk ${k.art || ""}" aria-label="Konto ${esc(k.name)}"><figcaption>${esc(k.name)}${k.art ? ` <small>${k.art === "aktiv" ? "Aktivkonto" : "Passivkonto"}</small>` : ""}</figcaption><div class="pf-tk-t">${seite("Soll", k.soll, sb)}${seite("Haben", k.haben, sb)}</div></figure>`).join("");
  return `<div class="pf-grafik">${bilanz}${konten}</div>`;
}
const ART = {
  merksatz: ["Merksatz", "✦", "amber"], erklaerung: ["So funktioniert's", "◆", "cyan"],
  beispiel: ["Beispiel", "▲", "gruen"], klausur: ["Klausursatz", "✎", "pink"],
};
/** „Block 3“ bzw. bei Bilanzrecht „Teil II · Block 3“ (gezählt innerhalb des Teils). */
const blockNr = (alle, x) => {
  const gleich = alle.filter((y) => y.teil === x.teil);
  return `${x.teil ? `Teil ${x.teil === 1 ? "I" : "II"} · ` : ""}Block ${gleich.indexOf(x) + 1}`;
};
const X = [70, 77, 70, 30, 23, 30]; // Zickzack der Stationen (Prozent der Breite); Beschriftung jeweils auf der freien Seite

export function kartenView(fach, { esc, ic, normLabel }) {
  const p = PFADE[fach], st = pfadStand(fach), b = p.bloecke, zeile = 132;
  const naechster = b.findIndex((x) => !st.f[x.id]);
  const punkte = b.map((_, i) => [X[i % X.length], 70 + i * zeile]);
  const hoehe = 70 + (b.length - 1) * zeile + 90;
  const kurve = (bis) => punkte.slice(0, bis).map(([x, y], i) => {
    if (!i) return `M ${x} ${y}`;
    const [px, py] = punkte[i - 1];
    return `C ${px} ${py + zeile * 0.55}, ${x} ${y - zeile * 0.55}, ${x} ${y}`;
  }).join(" ");
  const fertigBis = naechster < 0 ? b.length : naechster + 1;
  const ring = Math.round((st.fertig / st.gesamt) * 100);
  const stationen = b.map((x, i) => {
    const s = st.f[x.id]?.sterne || 0, zustand = s ? "fertig" : i === naechster ? "aktiv" : "offen";
    const links = punkte[i][0] >= 50;
    return `<div class="pf-station ${zustand}" style="top:${punkte[i][1]}px;left:${punkte[i][0]}%;--i:${i}">
      ${zustand === "aktiv" ? `<div class="pf-blase">${s ? "Wiederholen" : st.fertig ? "Weiter" : "Start"}</div>` : ""}
      <button class="pf-knoten" data-a="pfadBlock" data-v="${x.id}" aria-label="${esc(x.titel)}"><span class="pf-icon">${x.icon}</span>${zustand === "fertig" ? `<span class="pf-haken">${ic("haken", "klein")}</span>` : ""}</button>
      <div class="pf-sterne">${[1, 2, 3].map((k) => `<i class="${k <= s ? "an" : ""}">★</i>`).join("")}</div>
      <button class="pf-label ${links ? "links" : "rechts"}" data-a="pfadBlock" data-v="${x.id}"><span class="pf-nr">${blockNr(b, x)}</span><b>${esc(x.titel)}</b><span>${esc(x.kurz)}</span></button>
    </div>`;
  }).join("");
  return `<div class="vollbild pfad">
    <div class="pf-himmel" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="pf-kopf"><button class="pf-rund" data-a="pfadZu" aria-label="Schließen">${ic("kreuz")}</button><span class="pf-marke">Lernpfad</span>
      <span class="pf-chip">★ ${st.sterne}<small>/${st.gesamt * 3}</small></span></div>
    <div class="vb-inhalt pf-inhalt">
      <div class="pf-hero">
        <div class="pf-ring" style="--p:${ring}"><div><b>${st.fertig}</b><small>von ${st.gesamt}</small></div></div>
        <div><div class="pf-ueber">Eigener Modus · ${b.length} Blöcke</div><h1 class="pf-titel">${esc(p.titel)}</h1><p class="pf-unter">${esc(p.untertitel)}</p></div>
      </div>
      <div class="pf-hinweis">Jeder Block steht für sich: Lernkarten erklären alles, was die Fragen danach abfragen. Die Reihenfolge ist ein Vorschlag – du kannst jeden Block jederzeit öffnen.</div>
      <div class="pf-karte" style="height:${hoehe}px">
        <svg class="pf-pfad" viewBox="0 0 100 ${hoehe}" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="pfGlut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbbf24"/><stop offset="0.5" stop-color="#f472b6"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs>
          <path d="${kurve(b.length)}" class="pf-spur"/>
          ${fertigBis > 1 ? `<path d="${kurve(fertigBis)}" class="pf-glut"/>` : ""}
        </svg>
        ${stationen}
      </div>
      <div class="pf-ziel">${st.fertig === st.gesamt ? "🏆 Alle Blöcke geschafft – stark!" : "🏁 Ziel: alle Blöcke mit drei Sternen"}</div>
    </div></div>`;
}

export function blockView(fach, z, { esc, ic, normLabel, konfetti, karteMerken = false, schalter = "" }) {
  const b = PFADE[fach].bloecke.find((x) => x.id === z.id), n = schritte(b), k = b.karten.length;
  const fortschritt = `<div class="pf-schritte">${Array.from({ length: n - 2 }, (_, i) => `<i class="${i + 1 < z.schritt ? "ok" : i + 1 === z.schritt ? "akt" : ""}${i >= k ? " frage" : ""}"></i>`).join("")}</div>`;
  const kopf = `<div class="pf-kopf"><button class="pf-rund" data-a="pfadKarte" aria-label="Zur Lernpfad-Karte">${ic("kreuz")}</button>${z.schritt > 0 && z.schritt < n - 1 ? fortschritt : `<span class="pf-marke">${esc(b.titel)}</span>`}${schalter}<span class="pf-chip">${b.icon}</span></div>`;
  const normen = b.normen.map((r) => `<button class="pf-norm" data-a="normDetail" data-v="${r.split(" ").slice(0, 2).join(" ")}">${esc(normLabel(r))}</button>`).join("");
  let inhalt, fuss = "";
  if (z.schritt === 0) {
    inhalt = `<div class="pf-intro"><div class="pf-orb"><span>${b.icon}</span></div>
      <div class="pf-ueber">${blockNr(PFADE[fach].bloecke, b)} · ${esc(b.kurz)}</div><h1 class="pf-titel">${esc(b.titel)}</h1>
      <div class="pf-fakten"><span><b>${k}</b> Lernkarten</span><span><b>${b.fragen.length}</b> Fragen</span><span><b>~${Math.max(2, Math.round((k * 40 + b.fragen.length * 30) / 60))}</b> Min.</span></div>
      <div class="pf-normen">${normen}</div>
      <p class="pf-unter">Erst lesen, dann prüfen: Alles, was gefragt wird, steht auf den Karten dieses Blocks.</p></div>`;
    fuss = `<button class="pf-los" data-a="pfadWeiter">Los geht's ${ic("pfeil")}</button>`;
  } else if (z.schritt <= k) {
    const c = b.karten[z.schritt - 1], [name, sym, farbe] = ART[c.art];
    inhalt = `<div class="pf-lernkarte ${farbe}" style="--i:${z.schritt}"><div class="pf-tag"><span>${sym}</span>${name}<em>${z.schritt}/${k}</em></div>
      <h2>${esc(c.titel)}</h2><div class="pf-text">${textHtml(c.text, esc)}</div>${grafikHtml(c.grafik, esc)}
      ${karteMerken ? `<button class="pf-merken" data-a="alsKarte" data-q="pfad" aria-label="Diese Lernkarte als eigene Karteikarte speichern">${ic("plus", "klein")} Als Karte</button>` : ""}</div>`;
    fuss = `<div class="pf-reihe"><button class="pf-zurueck" data-a="pfadZurueck" ${z.schritt === 1 ? "disabled" : ""}>${ic("pfeil", "klein")}</button><button class="pf-los" data-a="pfadWeiter">${z.schritt === k ? "Zu den Fragen" : "Weiter"} ${ic("pfeil")}</button></div>`;
  } else if (z.schritt < n - 1) {
    const qi = z.schritt - k - 1, q = b.fragen[qi], a = z.antwort, buchst = "ABCDEFGH";
    let feld;
    if (q.art === "wahl") {
      feld = `<div class="pf-optionen">${z.reihen[qi].map((oi, pos) => {
        const cls = !a ? "" : oi === q.richtig ? " richtig" : Number(a.eingabe) === oi ? " falsch" : " aus";
        return `<button class="pf-option${cls}" data-a="pfadWahl" data-v="${oi}" ${a ? "disabled" : ""} style="--i:${pos}"><span class="pf-buchst">${buchst[pos]}</span>${esc(q.optionen[oi])}</button>`;
      }).join("")}</div>`;
    } else {
      feld = `<div class="pf-zahl${a ? (a.ok ? " richtig" : " falsch") : ""}"><input id="pfadZahl" inputmode="decimal" autocomplete="off" placeholder="0,00" value="${a ? esc(a.eingabe) : ""}" ${a ? "disabled" : ""}><span>${q.einheit || "€"}</span></div>
        ${a && !a.ok ? `<div class="pf-loesung">Richtig: <b>${q.einheit ? `${G.text(q.cent).replace(/,00$/, "")} ${q.einheit}` : G.euro(q.cent)}</b></div>` : ""}`;
    }
    // Taler-Show nur beim ersten Zeichnen der Antwort auf diese Frage; danach ruhiger Endzustand
    const show = a && z.talerShow !== qi;
    if (a) z.talerShow = qi;
    inhalt = `<div class="pf-frage"><div class="pf-tag frage"><span>?</span>Frage ${qi + 1} von ${b.fragen.length}</div><h2>${esc(q.frage)}</h2>${feld}
      ${a ? `<div class="pf-erkl ${a.ok ? "ok" : "err"}${show ? " nach-show" : ""}"><b>${a.ok ? "Richtig!" : "Nicht ganz."}</b> ${fett(q.erkl, esc)}</div>` : ""}</div>`;
    const warte = `<span class="fb-warte">${taler("warte", { groesse: 52 })}</span>`;
    fuss = a ? `<div class="pf-reihe pf-taler-reihe">${talerBuehne(a.ok, { ruhig: !show })}<button class="pf-los ${a.ok ? "ok" : "err"}" data-a="pfadWeiter">${qi + 1 === b.fragen.length ? "Abschließen" : "Nächste Frage"} ${ic("pfeil")}</button></div>`
      : q.art === "zahl" ? `<div class="pf-reihe pf-taler-reihe">${warte}<button class="pf-los" data-a="pfadPruefen">Prüfen</button></div>`
      : `<div class="pf-reihe pf-taler-reihe">${warte}<div class="pf-tipp">Tippe die richtige Antwort an.</div></div>`;
  } else {
    const s = sterneFuer(z.fehler), alle = PFADE[fach].bloecke, i = alle.indexOf(b), naechster = alle[i + 1];
    const sek = Math.round(((z.ende || Date.now()) - z.start) / 1000);
    inhalt = `${s === 3 ? konfetti() : ""}<div class="pf-ende"><div class="pf-gross-sterne">${[1, 2, 3].map((x) => `<span class="${x <= s ? "an" : ""}" style="--i:${x}">★</span>`).join("")}</div>
      ${taler(s >= 2 ? "jubeln" : "mut", { groesse: 92, klasse: "pf-taler" })}
      <h1 class="pf-titel">${s === 3 ? "Perfekt!" : s === 2 ? "Stark gemacht!" : "Block geschafft!"}</h1>
      <p class="pf-unter">${b.fragen.length - z.fehler} von ${b.fragen.length} Fragen auf Anhieb richtig · ${Math.floor(sek / 60)}:${String(sek % 60).padStart(2, "0")} min</p>
      <div class="pf-xp">+${(b.fragen.length - z.fehler) * 10 + 20} XP</div>
      ${s < 3 ? `<button class="pf-link" data-a="pfadBlock" data-v="${b.id}">Nochmal für ${s === 2 ? "drei" : "mehr"} Sterne</button>` : ""}</div>`;
    fuss = naechster ? `<div class="pf-reihe"><button class="pf-zweit" data-a="pfadKarte">Karte</button><button class="pf-los" data-a="pfadBlock" data-v="${naechster.id}">Nächster Block ${naechster.icon}</button></div>`
      : `<button class="pf-los" data-a="pfadKarte">Zur Lernpfad-Karte</button>`;
  }
  return `<div class="vollbild pfad block"><div class="pf-himmel" aria-hidden="true"><i></i><i></i><i></i></div>${kopf}
    <div class="vb-inhalt pf-inhalt" data-schritt="${z.schritt}">${inhalt}</div><div class="pf-fuss">${fuss}</div></div>`;
}
