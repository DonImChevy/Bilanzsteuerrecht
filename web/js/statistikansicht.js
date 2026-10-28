// Ansichten: Wochen-/Monatsrückblick, Statistik und der Bereich auf der Startseite.
// Diagramme als HTML/CSS: eine Datenreihe je Diagramm in der Modulfarbe (--m), Werte über Tooltip (Antippen/Hover)
// und als Text, Gitter zurückhaltend. Mengen in der Heatmap als Abstufungen einer Farbe.
import { ic } from "./icons.js";
import { taler } from "./maskottchen.js";
import { muenze } from "./levelansicht.js";
import { RAENGE, REIHEN } from "./level.js";
import { zeitraum, auswerten, veraenderung, heatmap, wochenTrend, wochentage, tageszeiten, rekorde } from "./statistik.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const zahl = (n) => Math.round(n).toLocaleString("de-DE");
const pz = (q) => (q == null ? "–" : `${Math.round(q * 100)} %`);
const WT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const datumKurz = (k) => new Date(k + "T12:00").toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });

/** Säulendiagramm (eine Reihe). werte: Zahlen; beschrift(i): Achsenbeschriftung oder ""; tip(i): Tooltip-Text. */
function saeulen(werte, { beschrift = () => "", tip = (i) => String(werte[i]), hoehe = 120, hervor = -1, klasse = "" } = {}) {
  const max = Math.max(1, ...werte);
  return `<div class="sl ${klasse}" style="--h:${hoehe}px" role="img" aria-label="${esc(werte.map((w, i) => tip(i)).join(", "))}">
    <div class="sl-flaeche">${werte.map((w, i) => `<span class="sl-spalte" tabindex="0" data-tip="${esc(tip(i))}"><span class="sl-bar${i === hervor ? " hervor" : ""}${w ? "" : " null"}" style="height:${w ? Math.max(3, (w / max) * 100) : 0}%"></span></span>`).join("")}</div>
    <div class="sl-achse">${werte.map((_, i) => `<span>${beschrift(i)}</span>`).join("")}</div></div>`;
}

/** Kennzahl-Kachel mit Veränderung zum Vorzeitraum. */
function kachel(wert, name, delta = null) {
  const d = delta == null ? "" : `<span class="kz-delta ${delta > 0 ? "plus" : delta < 0 ? "minus" : ""}">${delta > 0 ? "▲" : delta < 0 ? "▼" : "■"} ${Math.abs(delta)} %</span>`;
  return `<div class="kz"><b>${wert}</b><span>${name}</span>${d}</div>`;
}

const RANG_STUFE = (i) => RAENGE[Math.min(RAENGE.length - 2, i)].id;

/**
 * Rückblick. opt = {art: "woche"|"monat", versatz}; h = {themaTitel(id), themaFach(id), modulKurz(fach)}.
 */
export function rueckblickView(stat, opt, h) {
  const z = zeitraum(opt.art, opt.versatz), a = auswerten(stat, z), vz = zeitraum(opt.art, opt.versatz - 1), v = auswerten(stat, vz);
  const monat = opt.art === "monat", n = z.tage.length;
  const heuteIdx = z.tage.indexOf(new Date().toISOString().slice(0, 10));
  const beste = a.tage.reduce((m, t, i) => (t.n > (a.tage[m]?.n || 0) ? i : m), -1);
  const balken = saeulen(a.tage.map((t) => t.n), {
    beschrift: (i) => (monat ? ((i + 1) % 7 === 1 ? String(i + 1) : "") : WT[i]),
    tip: (i) => `${datumKurz(z.tage[i])}: ${a.tage[i].n} Aufgaben`, hervor: beste, klasse: monat ? "dicht" : "",
  });
  const top = a.themen.slice(0, 5), topMax = Math.max(1, ...top.map((t) => t.b));
  const satz = !a.aufgaben ? (opt.versatz === 0 ? "Noch nichts gelernt in diesem Zeitraum – eine kleine Runde reicht für den Anfang." : "In diesem Zeitraum hast du nicht gelernt.")
    : v.aufgaben && a.aufgaben > v.aufgaben ? `${zahl(a.aufgaben - v.aufgaben)} Aufgaben mehr als ${monat ? "im Vormonat" : "in der Vorwoche"} – stark!`
    : v.aufgaben && a.aufgaben < v.aufgaben ? `Etwas weniger als ${monat ? "im Vormonat" : "in der Vorwoche"} – dranbleiben lohnt sich.`
    : `${zahl(a.aufgaben)} Aufgaben an ${a.lerntage} ${a.lerntage === 1 ? "Tag" : "Tagen"}.`;
  const erfolge = a.erfolge.length ? `<div class="gruppe"><div class="gruppe-titel">Freigeschaltet</div><div class="rb-erfolge">${a.erfolge.map((e) => {
    const r = REIHEN.find((x) => x.id === e.reihe);
    return `<div class="rb-erfolg">${muenze(e.reihe ? RANG_STUFE(e.stufe) : "gold", ic(e.icon || r?.icon), { groesse: 40 })}<span><b>${esc(e.titel)}</b><small>${esc(e.text)}</small></span></div>`;
  }).join("")}</div></div>` : "";
  return `<div class="rueckblick">
    <div class="segment rb-art">${[["woche", "Woche"], ["monat", "Monat"]].map(([id, t]) => `<button data-a="rbArt" data-v="${id}" class="${opt.art === id ? "aktiv" : ""}" aria-pressed="${opt.art === id}">${t}</button>`).join("")}</div>
    <div class="rb-nav"><button class="icon-btn klein" data-a="rbZurueck" aria-label="Vorheriger Zeitraum">${ic("zurueck", "klein")}</button>
      <div><b>${esc(z.titel)}</b><span>${opt.versatz === 0 ? (monat ? "Dieser Monat" : "Diese Woche") : opt.versatz === -1 ? (monat ? "Letzter Monat" : "Letzte Woche") : `vor ${-opt.versatz} ${monat ? "Monaten" : "Wochen"}`}</span></div>
      <button class="icon-btn klein" data-a="rbVor" ${opt.versatz >= 0 ? "disabled" : ""} aria-label="Nächster Zeitraum">${ic("pfeil", "klein")}</button></div>
    <section class="rb-held">${taler(a.aufgaben ? "jubeln" : "hallo", { groesse: 64, klasse: "ruhig" })}<p>${satz}</p></section>
    <div class="kz-raster">
      ${kachel(zahl(a.aufgaben), "Aufgaben", veraenderung(a.aufgaben, v.aufgaben))}
      ${kachel(pz(a.quote), "richtig")}
      ${kachel(zahl(a.xp), "XP (ca.)", veraenderung(a.xp, v.xp))}
      ${kachel(`${a.lerntage}<small>/${n}</small>`, "Lerntage")}
    </div>
    <div class="gruppe"><div class="gruppe-titel">Aufgaben je Tag</div><div class="diagramm-karte">${balken}
      ${a.besterTag ? `<div class="dk-fuss">Bester Tag: <b>${datumKurz(a.besterTag.k)}</b> mit ${a.besterTag.n} Aufgaben</div>` : ""}</div></div>
    ${top.length ? `<div class="gruppe"><div class="gruppe-titel">Meistgeübte Themen</div><div class="diagramm-karte"><ul class="hbalken">${top.map((t) => `<li>
      <span class="hb-name"><i class="hb-punkt" style="--mc:${h.modulFarbe(h.themaFach(t.id))}"></i>${esc(h.themaTitel(t.id))}<small>${esc(h.modulKurz(h.themaFach(t.id)))}</small></span>
      <span class="hb-spur"><span style="width:${(t.b / topMax) * 100}%"></span></span><span class="hb-wert">${t.b}<small>${pz(t.q)} richtig</small></span></li>`).join("")}</ul></div></div>` : ""}
    ${erfolge}
    ${a.klausuren.length ? `<div class="gruppe"><div class="gruppe-titel">Klausuren</div><div class="liste">${a.klausuren.map((k) => `<div class="zeile"><span class="grow"><b>${esc(h.modulKurz(k.fach || "bsr"))}</b><div class="sub">${datumKurz(new Date(k.datum).toISOString().slice(0, 10))}</div></span><b>${k.richtig}/${k.gesamt}</b></div>`).join("")}</div></div>` : ""}
    ${a.aufgaben && a.quote == null ? `<div class="gruppe-fuss" style="margin:8px 4px">Die Trefferquote je Tag und Thema wird seit dem letzten Update erfasst.</div>` : ""}
  </div>`;
}

/** Statistik. h = wie oben, dazu module: [{id, kurz, farbe}], proThema, lern, serie(tage) und laengste Serie. */
export function statistikView(stat, h) {
  const hm = heatmap(stat, 26), stufe = (n) => (n <= 0 ? 0 : n < 10 ? 1 : n < 25 ? 2 : n < 50 ? 3 : 4);
  const monatWechsel = hm.map((w, i) => (i === 0 || w[0].k.slice(5, 7) !== hm[i - 1][0].k.slice(5, 7) ? new Date(w[0].k + "T12:00").toLocaleDateString("de-DE", { month: "short" }) : ""));
  const heat = `<div class="heat" role="img" aria-label="Lernkalender der letzten 26 Wochen">
    <div class="heat-monate">${monatWechsel.map((m) => `<span>${m}</span>`).join("")}</div>
    <div class="heat-feld"><div class="heat-wt">${WT.map((w, i) => `<span>${i % 2 === 0 ? w : ""}</span>`).join("")}</div>
      <div class="heat-raster">${hm.map((w) => `<div class="heat-woche">${w.map((t) => `<span class="heat-tag s${stufe(t.n)}${t.zukunft ? " zukunft" : ""}" tabindex="${t.zukunft ? -1 : 0}" data-tip="${datumKurz(t.k)}: ${t.n} Aufgaben"></span>`).join("")}</div>`).join("")}</div></div>
    <div class="heat-legende">weniger ${[0, 1, 2, 3, 4].map((s) => `<span class="heat-tag s${s}"></span>`).join("")} mehr</div></div>`;
  const tr = wochenTrend(stat, 12);
  const trend = saeulen(tr.map((w) => w.n), { beschrift: (i) => (i % 3 === 0 || i === 11 ? new Date(tr[i].von + "T12:00").toLocaleDateString("de-DE", { day: "numeric", month: "numeric" }) : ""), tip: (i) => `Woche ab ${datumKurz(tr[i].von)}: ${tr[i].n} Aufgaben`, hervor: 11 });
  const tz = tageszeiten(stat), tzMax = tz.indexOf(Math.max(...tz));
  const zeit = saeulen(tz, { beschrift: (i) => (i % 6 === 0 ? `${i} Uhr` : ""), tip: (i) => `${i}–${i + 1} Uhr: ${tz[i]} Aufgaben`, hervor: tz[tzMax] ? tzMax : -1, hoehe: 90, klasse: "dicht" });
  const wt = wochentage(stat), wtMax = wt.indexOf(Math.max(...wt));
  const tage = saeulen(wt, { beschrift: (i) => WT[i], tip: (i) => `${WT[i]}: ${wt[i]} Aufgaben`, hervor: wt[wtMax] ? wtMax : -1, hoehe: 90 });
  const mod = h.module.map((m) => {
    const z = h.summeFach(m.id);
    return { ...m, b: z.b, q: z.b ? z.r / z.b : 0 };
  }).filter((m) => m.b);
  const kartei = [0, 0, 0, 0, 0, 0];
  for (const e of Object.values(stat.lern || {})) if (e) kartei[Math.min(5, e.fach || 0)] += 1;
  const karteiSumme = kartei.reduce((a, b) => a + b, 0);
  const rk = rekorde(stat), gesamt = Object.values(stat.proThema || {}).reduce((a, z) => ({ b: a.b + z.b, r: a.r + z.r }), { b: 0, r: 0 });
  return `<div class="statistik">
    <div class="kz-raster">
      ${kachel(zahl(gesamt.b), "Aufgaben gesamt")}
      ${kachel(pz(gesamt.b ? gesamt.r / gesamt.b : null), "richtig gesamt")}
      ${kachel(zahl(Object.values(stat.tage || {}).filter((n) => n > 0).length), "Lerntage")}
      ${kachel(zahl(h.laengsteSerie), "längste Serie")}
    </div>
    <div class="gruppe"><div class="gruppe-titel">Lernkalender</div><div class="diagramm-karte">${heat}</div></div>
    <div class="gruppe"><div class="gruppe-titel">Aufgaben je Woche</div><div class="diagramm-karte">${trend}<div class="dk-fuss">Die letzten 12 Wochen, rechts die aktuelle.</div></div></div>
    <div class="gruppe"><div class="gruppe-titel">Wann du lernst</div><div class="diagramm-karte">${zeit}
      <div class="dk-fuss">${tz[tzMax] ? `Am liebsten lernst du zwischen <b>${tzMax} und ${tzMax + 1} Uhr</b>.` : "Die Tageszeit wird seit dem letzten Update erfasst."}</div>
      <div class="dk-trenner"></div>${tage}${wt[wtMax] ? `<div class="dk-fuss">Dein stärkster Wochentag: <b>${["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"][wtMax]}</b>.</div>` : ""}</div></div>
    ${mod.length ? `<div class="gruppe"><div class="gruppe-titel">Trefferquote je Modul</div><div class="diagramm-karte"><ul class="hbalken">${mod.map((m) => `<li>
      <span class="hb-name"><i class="hb-punkt" style="--mc:${m.farbe}"></i>${esc(m.kurz)}<small>${zahl(m.b)} Aufgaben</small></span>
      <span class="hb-spur skala"><span style="width:${m.q * 100}%"></span></span><span class="hb-wert">${pz(m.q)}</span></li>`).join("")}</ul></div></div>` : ""}
    ${karteiSumme ? `<div class="gruppe"><div class="gruppe-titel">Lernkartei</div><div class="diagramm-karte">
      <div class="stapelbalken" role="img" aria-label="${kartei.map((n, i) => `Fach ${i}: ${n}`).join(", ")}">${kartei.map((n, i) => n ? `<span class="sb-teil f${i}" style="flex:${n}" tabindex="0" data-tip="Fach ${i}: ${n} Aufgabentypen"></span>` : "").join("")}</div>
      <div class="sb-legende">${kartei.map((n, i) => `<span><i class="sb-teil f${i}"></i>Fach ${i} <b>${n}</b></span>`).join("")}</div>
      <div class="dk-fuss">Ab Fach 3 gilt eine Aufgabe als gefestigt: <b>${kartei[3] + kartei[4] + kartei[5]}</b> von ${karteiSumme}.</div></div></div>` : ""}
    <div class="gruppe"><div class="gruppe-titel">Rekorde</div><div class="kz-raster">
      ${kachel(rk.tag.n ? zahl(rk.tag.n) : "–", rk.tag.k ? `Aufgaben am ${datumKurz(rk.tag.k)}` : "meiste an einem Tag")}
      ${kachel(rk.monat ? zahl(rk.monat.n) : "–", rk.monat ? `im ${rk.monat.name}` : "stärkster Monat")}
      ${kachel(rk.klausur ? pz(rk.klausur.richtig / rk.klausur.gesamt) : "–", "beste Klausur")}
      ${kachel(zahl(stat.rekorde?.serie || 0), "in Folge richtig")}
    </div></div>
  </div>`;
}

/** Bereich auf der Startseite: Mini-Verlauf der letzten 8 Wochen und Einstiege. */
export function statistikStart(stat) {
  const tr = wochenTrend(stat, 8), diese = tr[7].n, letzte = tr[6].n, d = veraenderung(diese, letzte);
  return `<div class="gruppe"><div class="gruppe-titel">Rückblick und Statistik</div>
    <div class="stat-start">
      <button class="ss-haupt" data-a="rueckblick" data-v="woche"><span class="ss-text"><b>${zahl(diese)} Aufgaben diese Woche</b>
        <span class="sub">${d == null ? "Wochenrückblick ansehen" : `${d >= 0 ? "▲" : "▼"} ${Math.abs(d)} % zur Vorwoche`}</span></span>
        ${saeulen(tr.map((w) => w.n), { hoehe: 44, hervor: 7, tip: (i) => `${tr[i].n} Aufgaben`, klasse: "mini" })}</button>
      <div class="ss-knoepfe"><button data-a="rueckblick" data-v="monat">${ic("kalender", "klein")} Monat</button><button data-a="statistik">${ic("diagramm", "klein")} Statistik</button></div>
    </div></div>`;
}
