// Klausursimulation: echte Klausurlänge (60 / 90 / 180 Minuten), zusammengestellt aus Einzelsachverhalten mit empfohlener
// Bearbeitungszeit, Deckblatt wie in der Prüfung, Bearbeitung mit Uhr (Entwurf wird laufend auf dem Gerät gespeichert),
// nach der Abgabe Musterlösung und Bewertungsbogen zum Abhaken → Punkte und Note (0–15 Punkte, Tabelle wie StBAPO-Bögen).
// Rein bis auf die Ansichten: zusammenstellen(), note() und die Bausteine sind getestet.
import { Zufall } from "./kern.js";
import { SV_BSR, VORBEMERKUNGEN as VB_BSR } from "./bilr/klausur_sv.js";
import { SV_UST, KLAUSUREN_UST, VORBEMERKUNGEN_UST } from "./ust/klausuren.js";
import { SV_PR, KLAUSUREN_PR, VORBEMERKUNGEN_PR } from "./pr/klausuren.js";
import * as HS from "./handschrift.js";

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
    teilNamen: { 1: "Teil I · Buchführung", 2: "Teil II · Bilanzierung und Bewertung" },
    feldHinweis: "Würdigung, Berechnungen, Buchungssätze mit GuV/BVV",
  },
};
SIM.ust = {
  titel: "Umsatzsteuerrecht", amt: "Klausur Umsatzsteuer – Grundstudium I", nurFest: true,
  hilfsmittel: ["UStG, UStDV, UStAE (Handausgabe)", "Nicht programmierbarer Taschenrechner"],
  vorbemerkungen: VORBEMERKUNGEN_UST, pool: SV_UST, klausuren: KLAUSUREN_UST,
  feldHinweis: "Urteilsstil: Leistung, Ort, Steuerbarkeit, Steuerpflicht/Satz, BMG, USt, Entstehung, Vorsteuer – jeweils mit Norm",
  startText: "Drei vollständige Klausuren à 180 Minuten wie in der Semesterklausur: Vorspann, sechs Aufgaben, Würdigung im Urteilsstil. Danach Musterlösung und Selbstkontrollbogen mit Erwartungshorizont und Note.",
};
SIM.pr = {
  titel: "Privatrecht", amt: "Hauptklausur Privatrecht – Grundstudium I", nurFest: true,
  hilfsmittel: ["BGB, HGB (Textausgaben)", "Teil A ohne Hilfsmittel bearbeiten"],
  vorbemerkungen: VORBEMERKUNGEN_PR, pool: SV_PR, klausuren: KLAUSUREN_PR,
  teilNamen: { 1: "Teil A · Allgemeine Fragen", 2: "Teil B · Sachverhaltsbearbeitung" }, svName: "Aufgabe",
  feldHinweis: "Teil A in ganzen Sätzen; Teil B im Gutachtenstil: Obersatz – Definition – Subsumtion – Ergebnis",
  startText: "Drei vollständige Klausuren à 120 Minuten wie die Hauptklausur: Teil A allgemeine Fragen, Teil B Fälle im Gutachtenstil. Danach Musterlösung und Selbstkontrollbogen (70 Punkte) mit Erwartungshorizont und Note.",
};

/** Feste Klausur eines Fachs (id z. B. "ust-a") oder undefined. */
export const klausurDaten = (fach, id) => SIM[fach]?.klausuren?.find((x) => x.id === id);
/** Neue Simulation anlegen: Dauer (Zahl) = gemischte Sachverhalte, "k:<id>" = feste Klausur. */
export function neueSim(fach, v, seed) {
  const fest = String(v).startsWith("k:") ? klausurDaten(fach, String(v).slice(2)) : null;
  if (fest) return { fach, minuten: fest.minuten, seed, klausur: fest.id, teile: [...fest.teile], phase: "deckblatt", antworten: {}, zahlen: {}, haken: {} };
  const minuten = Number(v);
  return { fach, minuten, seed, teile: zusammenstellen(fach, minuten, seed), phase: "deckblatt", antworten: {}, zahlen: {}, haken: {} };
}
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
/** Höchstpunktzahl einer festen Klausur. */
export const festPunkte = (fach, x) => hoechstpunkte(fach, { teile: x.teile, seed: 1 });
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
  const d = SIM[fach];
  if (!d) return "";
  const esc = h.esc || ((t) => String(t));
  const fest = (d.klausuren || []).map((x) => `<button class="ks-fest" data-a="ksimNeu" data-v="k:${x.id}"><b>${esc(x.kurz)}</b><span>${esc(x.titel)}</span><i>${x.minuten} Min. · ${x.teile.length} Aufgaben · ${String(festPunkte(fach, x)).replace(".", ",")} P.</i></button>`).join("");
  const dauern = d.nurFest ? "" : `${fest ? `<span class="ks-feste-titel">Gemischt nach Dauer</span>` : ""}<div class="ks-dauern">${DAUERN.map((m) => `<button class="ks-dauer" data-a="ksimNeu" data-v="${m}"><b>${m}</b><span>Minuten</span><i>${m === 180 ? "Hauptklausur" : m === 90 ? "halbe Klausur" : "Kurzklausur"}</i></button>`).join("")}</div>`;
  return `<section class="ks-start">
    <div class="ks-start-kopf"><span class="ks-stempel">Prüfungsamt</span><b>Klausur simulieren</b>
      <span class="sub">${d.startText || "Wie die Semesterklausur: Deckblatt, Einzelsachverhalte mit empfohlener Bearbeitungszeit, Würdigung, Buchungssätze und Gewinnauswirkung. Danach Musterlösung und Bewertungsbogen mit Note."}</span></div>
    ${fest ? `<span class="ks-feste-titel">Vollständige Probeklausuren</span><div class="ks-feste">${fest}</div>` : ""}
    ${dauern}
    ${h.laufend ? `<button class="knopf zweit" data-a="ksimWeiter">${h.ic("play", "klein")} Begonnene Klausur fortsetzen</button>` : ""}
  </section>`;
}

/** Zeitwächter: tatsächliche Zeit am Sachverhalt (k.zeit[id] in Sekunden) gegen die Empfehlung. */
function zeitwaechter(k, id, min) {
  const sek = k.zeit?.[id] || 0;
  if (k.phase !== "laufend" && !sek) return "";
  const m = Math.floor(sek / 60), ueber = sek > min * 60;
  return `<span class="ks-zw${ueber ? " ueber" : ""}" data-zw="${id}" data-min="${min}" title="Zeit an diesem Sachverhalt">⏱ ${k.phase === "laufend" ? `du ${m} Min.` : `${m} von ${min} Min.`}</span>`;
}
/** Schreibwerkzeuge (gleiche Aktionen wie im Karteneditor: Stift, Textmarker, Radierer, Farben). */
function werkzeuge(h) {
  const w = h.hs, m = w.art === "m", farben = m ? HS.MARKER : HS.FARBEN, aktiv = m ? w.mfarbe : w.farbe;
  return `<div class="hs-leiste ks-leiste" role="toolbar" aria-label="Schreibwerkzeuge">
    <button class="hs-wz${w.art === "s" ? " an" : ""}" data-a="hsWerkzeug" data-v="s" aria-label="Stift">${h.ic("stift", "klein")}</button>
    <button class="hs-wz${m ? " an" : ""}" data-a="hsWerkzeug" data-v="m" aria-label="Textmarker"><svg class="ic klein" viewBox="0 0 24 24"><path d="M5 19h6M9.5 15.5l-3-3L15 4l3 3z"/><path d="M6.5 12.5 4 17l3.5 1.5 2-3"/></svg></button>
    <button class="hs-wz${w.art === "r" ? " an" : ""}" data-a="hsWerkzeug" data-v="r" aria-label="Radierer"><svg class="ic klein" viewBox="0 0 24 24"><path d="M8 20h12M5.5 14.5 14 6l5 5-8.5 8.5H7.5L4.5 16.5z"/><path d="m9.5 10.5 5 5"/></svg></button>
    <span class="hs-trenn"></span>
    ${w.art === "r" ? `<span class="hs-hinweis">Über den Strich wischen</span>` : farben.map((f, i) => `<button class="hs-farbe${aktiv === i ? " an" : ""}" data-a="hsFarbe" data-v="${i}" style="--f:var(--hs-${m ? "m-" : ""}${f})" aria-label="Farbe ${f}"></button>`).join("")}
  </div>`;
}
/** Handgeschriebene Blätter eines Sachverhalts (Bearbeitung: Zeichenflächen, Auswertung: Bilder). */
function blaetter(k, id, h, lesen = false) {
  const seiten = k.hand?.[id] || [];
  if (lesen) return seiten.filter(HS.hatStriche).map((t, j) => `<figure class="ks-hs-bild"><figcaption>Blatt ${j + 1}</figcaption>${HS.svg(t)}</figure>`).join("");
  return (seiten.length ? seiten : [""]).map((t, j) => `<div class="ks-hs-blatt"><div class="ks-hs-kopf"><span>Blatt ${j + 1}</span>
      <button class="hs-wz" data-a="ksimRueck" data-v="${id}|${j}" aria-label="Rückgängig">${h.ic("zurueck", "klein")}</button>
      <button class="hs-wz" data-a="ksimLeeren" data-v="${id}|${j}" aria-label="Blatt leeren">${h.ic("muell", "klein")}</button></div>
      <div class="hs-papier ks-hs">${HS.papier("l")}<canvas class="hs-canvas" data-ksim-hs="${id}|${j}" aria-label="Schreibfläche Blatt ${j + 1}"></canvas></div></div>`).join("") +
    `<button class="knopf zweit ks-blatt-neu" data-a="ksimBlatt" data-v="${id}">${h.ic("plus", "klein")} Blatt hinzufügen</button>`;
}

const absatz = (t, h) => String(t).split("\n").map((z) => `<p>${h.inline(z)}</p>`).join("");

export function simView(k, h) {
  const d = SIM[k.fach], svs = k.teile.map((id, i) => inhalt(k.fach, id, k.seed, i)), fest = klausurDaten(k.fach, k.klausur), tn = d.teilNamen;
  const teilGrenze = svs.findIndex((s) => s.teil === 2);
  const zuMin = (t) => svs.filter((s) => s.teil === t).reduce((n, s) => n + s.min, 0);
  const kopfZeile = (titel, rechts = "") => `<div class="vb-kopf"><button class="rund" data-a="ksimZu" aria-label="Schließen">${h.ic("kreuz")}</button><div class="mitte">${titel}</div>${rechts}</div>`;

  if (k.phase === "deckblatt") {
    return `<div class="vollbild ksim" role="dialog" aria-label="Klausur – Deckblatt">${kopfZeile("Klausur")}
    <div class="vb-inhalt"><article class="ks-blatt ks-deckblatt">
      <div class="ks-amt">${fest ? `Probeklausur ${h.esc(fest.kurz)}` : "Simulation"} · ${h.esc(d.amt || "Semesterklausur Grundstudium I")}</div>
      <h2>${h.esc(d.titel)}</h2>${fest ? `<p class="ks-unter">${h.esc(fest.titel)}</p>` : ""}
      <dl class="ks-daten"><dt>Bearbeitungszeit</dt><dd>${k.minuten} Minuten</dd>
        ${tn ? `<dt>Empfohlene Zeiteinteilung</dt><dd>${[1, 2].filter((t) => zuMin(t)).map((t) => `${tn[t].split(" · ")[0]}: ${zuMin(t)} Min.`).join(" · ")}</dd>` : ""}
        <dt>Hilfsmittel</dt><dd>${d.hilfsmittel.map(h.esc).join("<br>")}</dd>
        <dt>Umfang</dt><dd>${svs.length} Sachverhalte, ${hoechstpunkte(k.fach, k)} Punkte</dd></dl>
      <h3>Zeiteinteilung</h3>
      <ol class="ks-plan">${svs.map((s, i) => `<li><span>${tn && tn[s.teil] ? tn[s.teil].split(" · ")[0] + " · " : ""}${h.esc(s.titel)}</span><b>ca. ${s.min} Min.</b></li>`).join("")}</ol>
      <h3>Bearbeitungshinweise</h3>
      <ul class="ks-hinweise">${tn ? `<li>Die Teile ${tn[1].split(" · ")[0].replace("Teil ", "")} und ${tn[2].split(" · ")[0].replace("Teil ", "")} sind unabhängig voneinander zu bearbeiten.</li>` : ""}<li>Offenbare Unrichtigkeiten oder fehlende Angaben im Sachverhalt: kurz vermerken, wie Sie ergänzt haben.</li><li>Je Sachverhalt tippen oder mit Stift bzw. Finger auf Blättern schreiben („Schreiben“). Ihre Eingaben werden laufend auf diesem Gerät gespeichert. Nach Ablauf der Zeit wird automatisch abgegeben.</li></ul>
      <h3>Allgemeine Vorbemerkungen</h3>
      <ul class="ks-hinweise">${[...(d.vorbemerkungen || []), ...(fest?.vorbemerkungen || [])].map((v) => `<li>${h.inline(v)}</li>`).join("")}</ul>
    </article></div>
    <div class="vb-fuss"><button class="knopf" data-a="ksimBeginnen">${h.ic("klausur", "klein")} Bearbeitung beginnen – ${k.minuten} Minuten</button></div></div>`;
  }

  const fertig = k.phase === "abgegeben";
  const max = hoechstpunkte(k.fach, k), erreicht = punkte(k.fach, k), proz = max ? Math.round((erreicht / max) * 1000) / 10 : 0, n = note(proz);
  const uhr = fertig ? `<span class="km-zeit">${Math.round((k.ende - k.start) / 60000)} Min.</span>` : `<span id="ksimUhr" class="timer ${restSekunden(k) < 600 ? "knapp" : ""}">${h.ic("klausur", "klein")}<span>${uhrText(restSekunden(k))}</span></span>`;
  const blatt = svs.map((s, i) => {
    const id = s.id, zahlen = s.zahlen || [];
    const ueberschrift = !tn ? "" : i === 0 && s.teil === 1 ? `<h2 class="ks-teil">${tn[1]}</h2>` : i === teilGrenze ? `<h2 class="ks-teil">${tn[2]}</h2>` : "";
    const eigene = k.antworten?.[id] || "";
    const bogen = s.bewertung.map(([p, t, erw], j) => `<label class="ks-haken"><input type="checkbox" data-a="ksimHaken" data-v="${id}|${j}" ${k.haken?.[id]?.[j] ? "checked" : ""}><span>${h.esc(t)}${erw ? `<small class="ks-erw">Erwartet: ${h.inline(erw)}</small>` : ""}</span><b>${String(p).replace(".", ",")}</b></label>`).join("");
    const erreichtSv = s.bewertung.reduce((a, [p], j) => a + (k.haken?.[id]?.[j] ? p : 0), 0), maxSv = s.bewertung.reduce((a, [p]) => a + p, 0);
    return `${ueberschrift}<article class="ks-blatt ks-sv" id="ks-${id}">
      <header class="ks-sv-kopf"><span class="ks-nr">${d.svName || "Sachverhalt"} ${i + 1}</span><h3>${h.esc(s.titel)}</h3><span class="ks-min">ca. ${s.min} Min. · ${String(maxSv).replace(".", ",")} P.</span>
        ${zeitwaechter(k, id, s.min)}</header>
      <div class="ks-text">${absatz(s.sv, h)}</div>
      <div class="ks-aufgaben"><b>Aufgaben</b><ol>${s.aufgaben.map((a) => `<li>${h.inline(a)}</li>`).join("")}</ol></div>
      ${fertig ? `
        ${eigene || blaetter(k, id, h, true) ? `<details class="ks-eigene" open><summary>Deine Lösung</summary>${eigene ? `<pre>${h.esc(eigene)}</pre>` : ""}${blaetter(k, id, h, true)}</details>` : `<p class="ks-leer">Keine Lösung eingegeben.</p>`}
        ${zahlen.length ? `<div class="ks-kontrolle">${zahlen.map((z, j) => { const ein = k.zahlen?.[id]?.[j]; const ok = zahlStimmt(z, ein); return `<span class="${ein ? (ok ? "ok" : "falsch") : ""}">${h.esc(z.frage)}: <b>${ein ? h.esc(ein) : "–"}</b> ${ein ? (ok ? "✓" : `✗ richtig: ${h.esc(String(z.wert.toLocaleString("de-DE")))} ${z.einheit}`) : `(richtig: ${z.wert.toLocaleString("de-DE")} ${z.einheit})`}</span>`; }).join("")}</div>` : ""}
        <div class="km-loesung ks-loesung"><span class="km-etikett">Musterlösung</span>${s.loesung.map(h.loesungZeile).join("")}</div>
        <div class="ks-bogen"><div class="ks-bogen-kopf"><b>Selbstkontrollbogen</b><span>${String(erreichtSv).replace(".", ",")} / ${String(maxSv).replace(".", ",")} P.</span></div>${bogen}</div>`
      : `<div class="ks-feld-kopf"><span>Ihre Lösung (${h.esc(d.feldHinweis || "vollständige Lösung mit Normen")})</span>
          <span class="segment ks-modus">${[["text", "Tippen"], ["hand", "Schreiben"]].map(([m, t]) => `<button data-a="ksimModus" data-v="${id}|${m}" class="${(k.modi?.[id] || h.modus) === m ? "aktiv" : ""}">${m === "hand" ? h.ic("stift", "klein") : ""}${t}</button>`).join("")}</span></div>
        ${(k.modi?.[id] || h.modus) === "hand" ? werkzeuge(h) + blaetter(k, id, h)
          : `<label class="ks-feld"><textarea data-ksim-text="${id}" rows="10" aria-label="Ihre Lösung" placeholder="z. B. … gem. § 255 Abs. 1 HGB …&#10;Gebäude 1.000 € an Bank 1.000 € (GuV ±0 · BVV ±0)">${h.esc(eigene)}</textarea></label>`}
        ${zahlen.length ? `<div class="ks-zahlen"><span>Ergebnisse zur Kontrolle (optional)</span>${zahlen.map((z, j) => `<label>${h.esc(z.frage)}<input inputmode="decimal" data-ksim-zahl="${id}|${j}" value="${h.esc(k.zahlen?.[id]?.[j] || "")}" placeholder="${z.einheit}"></label>`).join("")}</div>` : ""}`}
    </article>`;
  }).join("");
  const kopf = fertig ? `<section class="ks-ergebnis">
      <div class="ks-note"><b>${n}</b><span>Punkte</span></div>
      <div><b>${String(erreicht).replace(".", ",")} von ${String(max).replace(".", ",")} Punkten (${String(proz).replace(".", ",")} %)</b>
        <span class="sub">Note: ${noteText(n)}. Hake im Bewertungsbogen jedes Merkmal ab, das deine Lösung enthält – die Note rechnet mit.</span></div>
    </section>
    <section class="ks-foto"><div><b>Auf Papier geschrieben?</b><span class="sub">Fotografiere deine Blätter – sie erscheinen hier neben Musterlösung und Bewertungsbogen (nur auf diesem Gerät).</span></div>
      <label class="knopf zweit ks-foto-knopf">${h.ic("plus", "klein")} Blätter fotografieren<input type="file" id="ksimFoto" accept="image/*" capture="environment" multiple hidden></label>
      ${(h.fotos || []).length ? `<div class="ks-foto-liste">${h.fotos.map((u, j) => `<figure><img src="${u}" alt="Blatt ${j + 1}" data-a="ksimFotoGross" data-v="${j}"><button class="ks-foto-weg" data-a="ksimFotoWeg" data-v="${j}" aria-label="Foto entfernen">${h.ic("kreuz", "klein")}</button></figure>`).join("")}</div>` : ""}
    </section>` : "";
  return `<div class="vollbild ksim" role="dialog" aria-label="Klausur">${kopfZeile(fertig ? "Auswertung" : `Klausur · ${k.minuten} Min.`, uhr)}
    <div class="vb-inhalt">${kopf}${fest?.vorspann ? `<article class="ks-blatt ks-vorspann"><header class="ks-sv-kopf"><span class="ks-nr">Vorspann</span><h3>${h.esc(fest.vorspannTitel || "Allgemeine Angaben zu allen Sachverhalten")}</h3></header><div class="ks-text">${absatz(fest.vorspann, h)}</div></article>` : ""}${blatt}</div>
    <div class="vb-fuss">${fertig
      ? `<button class="knopf" data-a="ksimSpeichern">${h.ic("haken", "klein")} ${k.gespeichert ? "Ergebnis aktualisieren" : "Ergebnis speichern"}</button>`
      : `<button class="knopf" data-a="ksimAbgeben">Abgeben</button>`}</div></div>`;
}
