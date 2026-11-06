// Klausursimulation: echte Klausurlänge (60 / 90 / 180 Minuten), zusammengestellt aus Einzelsachverhalten mit empfohlener
// Bearbeitungszeit, Deckblatt wie in der Prüfung, Bearbeitung mit Uhr (Entwurf wird laufend auf dem Gerät gespeichert),
// nach der Abgabe Musterlösung und Bewertungsbogen zum Abhaken → Punkte und Note (0–15 Punkte, Tabelle wie StBAPO-Bögen).
// Rein bis auf die Ansichten: zusammenstellen(), note() und die Bausteine sind getestet.
import { Zufall } from "./kern.js";
import { SV_BSR, VORBEMERKUNGEN as VB_BSR } from "./bilr/klausur_sv.js";

export const DAUERN = [60, 90, 180];
export const SIM = {
  bsr: {
    titel: "Bilanzsteuerrecht und betriebliches Rechnungswesen",
    hilfsmittel: ["EStG, EStDV, HGB, UStG (Textausgaben)", "EStR/EStH (amtliches Handbuch)", "Nicht programmierbarer Taschenrechner"],
    vorbemerkungen: VB_BSR,
    pool: SV_BSR,
    // Teil I je nach Dauer (Buchführung), Teil II füllt den Rest (Bilanzierung und Bewertung)
    teil1: { 60: [["bsr-k-guv"], ["bsr-k-lohn"]], 90: [["bsr-k-lohn", "bsr-k-guv"], ["bsr-k-lohn"]], 180: [["bsr-k-waren"]] },
    pflicht: { 180: ["bsr-k-grundstueck"] },
  },
};
export const simFaecher = () => Object.keys(SIM);

/** Notentabelle (Prozent der Höchstpunktzahl → Notenpunkte), wie auf den Bewertungsbögen. */
const STUFEN = [[96, 15], [91, 14], [87, 13], [82, 12], [78, 11], [73, 10], [68, 9], [64, 8], [59, 7], [54, 6], [50, 5], [40, 4], [30, 3], [25, 2], [20, 1], [0, 0]];
export const note = (prozent) => STUFEN.find(([ab]) => prozent >= ab)[1];
export const noteText = (n) => (n >= 14 ? "sehr gut" : n >= 11 ? "gut" : n >= 8 ? "befriedigend" : n >= 5 ? "ausreichend" : n >= 2 ? "mangelhaft" : "ungenügend");

/** Sachverhalte wählen, deren empfohlene Zeiten genau die Dauer ergeben (Teil I zuerst). */
export function zusammenstellen(fach, minuten, seed) {
  const d = SIM[fach], r = new Zufall(seed), nachId = Object.fromEntries(d.pool.map((s) => [s.id, s]));
  const t1 = r.wahl(d.teil1[minuten]).map((id) => nachId[id]);
  const pflicht = (d.pflicht[minuten] || []).map((id) => nachId[id]);
  let rest = minuten - t1.reduce((n, s) => n + s.min, 0) - pflicht.reduce((n, s) => n + s.min, 0);
  const kandidaten = r.mischen(d.pool.filter((s) => s.teil === 2 && !pflicht.includes(s) && s.min <= rest));
  const wahl = [];
  const suche = (i, offen) => {
    if (offen === 0) return true;
    for (let j = i; j < kandidaten.length; j++) {
      if (kandidaten[j].min > offen) continue;
      wahl.push(kandidaten[j]);
      if (suche(j + 1, offen - kandidaten[j].min)) return true;
      wahl.pop();
    }
    return false;
  };
  suche(0, rest);
  return [...t1, ...pflicht, ...wahl].map((s) => s.id);
}

/** Inhalt eines Sachverhalts (deterministisch aus Startwert und Position). */
export function inhalt(fach, id, seed, i) {
  const s = SIM[fach].pool.find((x) => x.id === id);
  return { ...s, ...s.erzeugen(new Zufall(seed * 31 + i * 7 + 1)) };
}
export const hoechstpunkte = (fach, k) => k.teile.reduce((n, id, i) => n + inhalt(fach, id, k.seed, i).bewertung.reduce((a, [p]) => a + p, 0), 0);
export function punkte(fach, k) {
  return k.teile.reduce((n, id, i) => n + inhalt(fach, id, k.seed, i).bewertung.reduce((a, [p], j) => a + (k.haken?.[id]?.[j] ? p : 0), 0), 0);
}
const zahlLesen = (t) => Number(String(t || "").replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", "."));
export const zahlStimmt = (z, eingabe) => eingabe !== undefined && eingabe !== "" && Math.abs(zahlLesen(eingabe) - z.wert) <= z.toleranz;

// ------------------------------------------------------------------------------------------- Ansichten
const uhrText = (s) => `${Math.floor(s / 3600) ? Math.floor(s / 3600) + ":" : ""}${String(Math.floor((s % 3600) / 60)).padStart(Math.floor(s / 3600) ? 2 : 1, "0")}:${String(s % 60).padStart(2, "0")}`;
export const restSekunden = (k) => Math.max(0, k.minuten * 60 - Math.floor((Date.now() - k.start) / 1000));
export { uhrText };

/** Startkarte im Klausur-Tab. */
export function startKarte(fach, h) {
  if (!SIM[fach]) return "";
  return `<section class="ks-start">
    <div class="ks-start-kopf"><span class="ks-stempel">Prüfungsamt</span><b>Klausur simulieren</b>
      <span class="sub">Wie die Semesterklausur: Deckblatt, Einzelsachverhalte mit empfohlener Bearbeitungszeit, Würdigung, Buchungssätze und Gewinnauswirkung. Danach Musterlösung und Bewertungsbogen mit Note.</span></div>
    <div class="ks-dauern">${DAUERN.map((m) => `<button class="ks-dauer" data-a="ksimNeu" data-v="${m}"><b>${m}</b><span>Minuten</span><i>${m === 180 ? "Hauptklausur" : m === 90 ? "halbe Klausur" : "Kurzklausur"}</i></button>`).join("")}</div>
    ${h.laufend ? `<button class="knopf zweit" data-a="ksimWeiter">${h.ic("play", "klein")} Begonnene Klausur fortsetzen</button>` : ""}
  </section>`;
}

const absatz = (t, h) => String(t).split("\n").map((z) => `<p>${h.inline(z)}</p>`).join("");

export function simView(k, h) {
  const d = SIM[k.fach], svs = k.teile.map((id, i) => inhalt(k.fach, id, k.seed, i));
  const teilGrenze = svs.findIndex((s) => s.teil === 2);
  const zuMin = (t) => svs.filter((s) => s.teil === t).reduce((n, s) => n + s.min, 0);
  const kopfZeile = (titel, rechts = "") => `<div class="vb-kopf"><button class="rund" data-a="ksimZu" aria-label="Schließen">${h.ic("kreuz")}</button><div class="mitte">${titel}</div>${rechts}</div>`;

  if (k.phase === "deckblatt") {
    return `<div class="vollbild ksim" role="dialog" aria-label="Klausur – Deckblatt">${kopfZeile("Klausur")}
    <div class="vb-inhalt"><article class="ks-blatt ks-deckblatt">
      <div class="ks-amt">Simulation · Semesterklausur Grundstudium I</div>
      <h2>${h.esc(d.titel)}</h2>
      <dl class="ks-daten"><dt>Bearbeitungszeit</dt><dd>${k.minuten} Minuten</dd>
        <dt>Empfohlene Zeiteinteilung</dt><dd>${zuMin(1) ? `Teil I: ${zuMin(1)} Min. · ` : ""}Teil II: ${zuMin(2)} Min.</dd>
        <dt>Hilfsmittel</dt><dd>${d.hilfsmittel.map(h.esc).join("<br>")}</dd>
        <dt>Umfang</dt><dd>${svs.length} Sachverhalte, ${hoechstpunkte(k.fach, k)} Punkte</dd></dl>
      <h3>Zeiteinteilung</h3>
      <ol class="ks-plan">${svs.map((s, i) => `<li><span>${s.teil === 1 ? "Teil I" : "Teil II"} · ${h.esc(s.titel)}</span><b>ca. ${s.min} Min.</b></li>`).join("")}</ol>
      <h3>Bearbeitungshinweise</h3>
      <ul class="ks-hinweise"><li>Die Teile I und II sind unabhängig voneinander zu bearbeiten.</li><li>Offenbare Unrichtigkeiten oder fehlende Angaben im Sachverhalt: kurz vermerken, wie Sie ergänzt haben.</li><li>Ihre Eingaben werden laufend auf diesem Gerät gespeichert. Nach Ablauf der Zeit wird automatisch abgegeben.</li></ul>
      <h3>Allgemeine Vorbemerkungen</h3>
      <ul class="ks-hinweise">${d.vorbemerkungen.map((v) => `<li>${h.inline(v)}</li>`).join("")}</ul>
    </article></div>
    <div class="vb-fuss"><button class="knopf" data-a="ksimBeginnen">${h.ic("klausur", "klein")} Bearbeitung beginnen – ${k.minuten} Minuten</button></div></div>`;
  }

  const fertig = k.phase === "abgegeben";
  const max = hoechstpunkte(k.fach, k), erreicht = punkte(k.fach, k), proz = max ? Math.round((erreicht / max) * 1000) / 10 : 0, n = note(proz);
  const uhr = fertig ? `<span class="km-zeit">${Math.round((k.ende - k.start) / 60000)} Min.</span>` : `<span id="ksimUhr" class="timer ${restSekunden(k) < 600 ? "knapp" : ""}">${h.ic("klausur", "klein")}<span>${uhrText(restSekunden(k))}</span></span>`;
  const blatt = svs.map((s, i) => {
    const id = s.id, zahlen = s.zahlen || [];
    const ueberschrift = i === 0 && s.teil === 1 ? `<h2 class="ks-teil">Teil I · Buchführung</h2>` : i === teilGrenze ? `<h2 class="ks-teil">Teil II · Bilanzierung und Bewertung</h2>` : "";
    const eigene = k.antworten?.[id] || "";
    const bogen = s.bewertung.map(([p, t], j) => `<label class="ks-haken"><input type="checkbox" data-a="ksimHaken" data-v="${id}|${j}" ${k.haken?.[id]?.[j] ? "checked" : ""}><span>${h.esc(t)}</span><b>${String(p).replace(".", ",")}</b></label>`).join("");
    const erreichtSv = s.bewertung.reduce((a, [p], j) => a + (k.haken?.[id]?.[j] ? p : 0), 0), maxSv = s.bewertung.reduce((a, [p]) => a + p, 0);
    return `${ueberschrift}<article class="ks-blatt ks-sv" id="ks-${id}">
      <header class="ks-sv-kopf"><span class="ks-nr">Sachverhalt ${i + 1}</span><h3>${h.esc(s.titel)}</h3><span class="ks-min">ca. ${s.min} Min. · ${String(maxSv).replace(".", ",")} P.</span></header>
      <div class="ks-text">${absatz(s.sv, h)}</div>
      <div class="ks-aufgaben"><b>Aufgaben</b><ol>${s.aufgaben.map((a) => `<li>${h.inline(a)}</li>`).join("")}</ol></div>
      ${fertig ? `
        ${eigene ? `<details class="ks-eigene"><summary>Deine Lösung</summary><pre>${h.esc(eigene)}</pre></details>` : `<p class="ks-leer">Keine Lösung eingegeben.</p>`}
        ${zahlen.length ? `<div class="ks-kontrolle">${zahlen.map((z, j) => { const ein = k.zahlen?.[id]?.[j]; const ok = zahlStimmt(z, ein); return `<span class="${ein ? (ok ? "ok" : "falsch") : ""}">${h.esc(z.frage)}: <b>${ein ? h.esc(ein) : "–"}</b> ${ein ? (ok ? "✓" : `✗ richtig: ${h.esc(String(z.wert.toLocaleString("de-DE")))} ${z.einheit}`) : `(richtig: ${z.wert.toLocaleString("de-DE")} ${z.einheit})`}</span>`; }).join("")}</div>` : ""}
        <div class="km-loesung ks-loesung"><span class="km-etikett">Musterlösung</span>${s.loesung.map(h.loesungZeile).join("")}</div>
        <div class="ks-bogen"><div class="ks-bogen-kopf"><b>Bewertungsbogen</b><span>${String(erreichtSv).replace(".", ",")} / ${String(maxSv).replace(".", ",")} P.</span></div>${bogen}</div>`
      : `<label class="ks-feld"><span>Ihre Lösung (Würdigung, Berechnungen, Buchungssätze mit GuV/BVV)</span>
          <textarea data-ksim-text="${id}" rows="10" placeholder="z. B. … gem. § 255 Abs. 1 HGB …&#10;Gebäude 1.000 € an Bank 1.000 € (GuV ±0 · BVV ±0)">${h.esc(eigene)}</textarea></label>
        ${zahlen.length ? `<div class="ks-zahlen"><span>Ergebnisse zur Kontrolle (optional)</span>${zahlen.map((z, j) => `<label>${h.esc(z.frage)}<input inputmode="decimal" data-ksim-zahl="${id}|${j}" value="${h.esc(k.zahlen?.[id]?.[j] || "")}" placeholder="${z.einheit}"></label>`).join("")}</div>` : ""}`}
    </article>`;
  }).join("");
  const kopf = fertig ? `<section class="ks-ergebnis">
      <div class="ks-note"><b>${n}</b><span>Punkte</span></div>
      <div><b>${String(erreicht).replace(".", ",")} von ${String(max).replace(".", ",")} Punkten (${String(proz).replace(".", ",")} %)</b>
        <span class="sub">Note: ${noteText(n)}. Hake im Bewertungsbogen jedes Merkmal ab, das deine Lösung enthält – die Note rechnet mit.</span></div>
    </section>` : "";
  return `<div class="vollbild ksim" role="dialog" aria-label="Klausur">${kopfZeile(fertig ? "Auswertung" : `Klausur · ${k.minuten} Min.`, uhr)}
    <div class="vb-inhalt">${kopf}${blatt}</div>
    <div class="vb-fuss">${fertig
      ? `<button class="knopf" data-a="ksimSpeichern">${h.ic("haken", "klein")} ${k.gespeichert ? "Ergebnis aktualisieren" : "Ergebnis speichern"}</button>`
      : `<button class="knopf" data-a="ksimAbgeben">Abgeben</button>`}</div></div>`;
}
