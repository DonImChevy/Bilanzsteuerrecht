// Vorlesen: Kompaktwissen als gesprochener Text (für auditive Lerner, z. B. mit Kopfhörern).
// Nutzt die eingebaute Sprachausgabe des Geräts (speechSynthesis) – nichts wird heruntergeladen, funktioniert offline.
// Rein (getestet): sprechbar() macht Text hörbar (Normen und Abkürzungen ausgeschrieben), hoerSegmente() baut den Ablauf.

const GESETZ = {
  EStG: "Einkommensteuergesetz", UStG: "Umsatzsteuergesetz", HGB: "Handelsgesetzbuch", AO: "Abgabenordnung", GG: "Grundgesetz",
  BGB: "Bürgerliches Gesetzbuch", BWahlG: "Bundeswahlgesetz", PartG: "Parteiengesetz", EStDV: "Einkommensteuer-Durchführungsverordnung",
  LStDV: "Lohnsteuer-Durchführungsverordnung", UStDV: "Umsatzsteuer-Durchführungsverordnung", VwZG: "Verwaltungszustellungsgesetz",
  GOBT: "Geschäftsordnung des Bundestages", UStAE: "Umsatzsteuer-Anwendungserlass", EStR: "Einkommensteuer-Richtlinien",
  EStH: "Einkommensteuer-Hinweise", LStR: "Lohnsteuer-Richtlinien", LStH: "Lohnsteuer-Hinweise", BRKG: "Bundesreisekostengesetz",
  BVerfGG: "Bundesverfassungsgerichtsgesetz", StPO: "Strafprozessordnung", KStG: "Körperschaftsteuergesetz", GewStG: "Gewerbesteuergesetz",
  GrEStG: "Grunderwerbsteuergesetz", BewG: "Bewertungsgesetz", GoBD: "G o B D",
};
// Fachkürzel → ausgesprochen (nur eindeutige; Rechtsformen wie GmbH liest die Stimme selbst richtig)
const KUERZEL = {
  USt: "Umsatzsteuer", VSt: "Vorsteuer", ESt: "Einkommensteuer", LSt: "Lohnsteuer", KSt: "Körperschaftsteuer", GewSt: "Gewerbesteuer",
  GrESt: "Grunderwerbsteuer", SolZ: "Solidaritätszuschlag", AfA: "Absetzung für Abnutzung", BS: "Buchungssatz",
  GuV: "Gewinn- und Verlustrechnung", BVV: "Betriebsvermögensvergleich", BMG: "Bemessungsgrundlage", VAZ: "Voranmeldungszeitraum",
  AK: "Anschaffungskosten", HK: "Herstellungskosten", GWG: "geringwertiges Wirtschaftsgut", RAP: "Rechnungsabgrenzungsposten",
  WEK: "Wareneinkaufskonto", WVK: "Warenverkaufskonto", WBK: "Warenbestandskonto", BVK: "Bestandsveränderungskonto",
  EBK: "Eröffnungsbilanzkonto", SBK: "Schlussbilanzkonto", LuL: "Lieferungen und Leistungen", WG: "Wirtschaftsgut", WGs: "Wirtschaftsgüter",
  BV: "Betriebsvermögen", ND: "Nutzungsdauer", GoB: "Grundsätze ordnungsmäßiger Buchführung", BGA: "Betriebs- und Geschäftsausstattung",
  WK: "Werbungskosten", VZ: "Veranlagungszeitraum", BMF: "Bundesfinanzministerium", BFH: "Bundesfinanzhof", BVerfG: "Bundesverfassungsgericht",
  EuGH: "Europäischer Gerichtshof", AV: "Anlagevermögen", UV: "Umlaufvermögen", EK: "Eigenkapital", FK: "Fremdkapital", FA: "Finanzamt",
  VA: "Verwaltungsakt", EÜR: "Einnahmenüberschussrechnung", zvE: "zu versteuerndes Einkommen", GdE: "Gesamtbetrag der Einkünfte",
  agB: "außergewöhnliche Belastungen", SB: "Schlussbestand", AB: "Anfangsbestand", BT: "Bundestag", BR: "Bundesrat",
  KV: "Krankenversicherung", MwSt: "Mehrwertsteuer", KapESt: "Kapitalertragsteuer", LuF: "Land- und Forstwirtschaft", StGB: "Strafgesetzbuch",
  IdNr: "Identifikationsnummer", II: "zwei", III: "drei", IV: "vier", IIa: "zwei a", StPfl: "Steuerpflichtige", Stpfl: "Steuerpflichtige", PKW: "Pkw", Kfz: "Kfz",
};
const WORTE = [
  [/\bi\. ?V\. ?m\./g, "in Verbindung mit"], [/\bi\. ?S\. ?d\./g, "im Sinne des"], [/\bi\. ?S\. ?v\./g, "im Sinne von"],
  [/\bi\. ?d\. ?R\./g, "in der Regel"], [/\bz\. ?B\./g, "zum Beispiel"], [/\bd\. ?h\./g, "das heißt"], [/\bu\. ?a\./g, "unter anderem"],
  [/\bv\. ?a\./g, "vor allem"], [/\bo\. ?Ä\./g, "oder Ähnliches"], [/\bu\. ?U\./g, "unter Umständen"], [/\bh\. ?M\./g, "herrschender Meinung"], [/\bvs\./g, "gegenüber"], [/\s&\s/g, " und "], [/\s>\s?(?=\d)/g, " mehr als "],
  [/\s<\s?(?=\d)/g, " weniger als "], [/^<\s?(?=\d)/g, "weniger als "], [/^>\s?(?=\d)/g, "mehr als "], [/\s>\s/g, " größer als "], [/\s<\s/g, " kleiner als "], [/\bbzw\./g, "beziehungsweise"],
  [/\bggf\./g, "gegebenenfalls"], [/\bvgl\./g, "vergleiche"], [/\bVgl\./g, "Vergleiche"], [/\bgem\./g, "gemäß"], [/\blt\./g, "laut"],
  [/\bzzgl\./g, "zuzüglich"], [/\babzgl\./g, "abzüglich"], [/\binkl\./g, "inklusive"], [/\bca\./g, "circa"], [/\bgrds\./g, "grundsätzlich"],
  [/\binsb\./g, "insbesondere"], [/\bsog\./g, "sogenannte"], [/\busw\./g, "und so weiter"], [/\betc\./g, "et cetera"], [/\bevtl\./g, "eventuell"],
  [/\bmax\./g, "maximal"], [/\bmind\./g, "mindestens"], [/\bStd\./g, "Stunden"], [/\bMio\./g, "Millionen"], [/\bMrd\./g, "Milliarden"],
  [/\bMin\./g, "Minuten"], [/\bStpfl\./g, "Steuerpflichtige"], [/\bNrn\./g, "Nummern"], [/\bNr\./g, "Nummer"], [/\bAbs\./g, "Absatz"],
  [/\bArtt?\.(?= ?\d)/g, "Artikel"], [/(?<!\p{L})S\.(?= ?\d)/gu, "Satz"], [/\b(?:Hs\.|HS\.?)(?= ?\d|\b)/g, "Halbsatz"], [/\bBuchst\./g, "Buchstabe"],
  [/\blit\./g, "Buchstabe"], [/\bAlt\./g, "Alternative"], [/\bVar\./g, "Variante"], [/\bff\./g, "folgende"], [/(\d) f\./g, "$1 folgender"],
  [/(?<!\p{L})R (?=\d)/gu, "Richtlinie "], [/(?<!\p{L})H (?=\d)/gu, "Hinweis "], [/(?<!\p{L})A (?=\d+\.\d)/gu, "Abschnitt "],
];

/** Text so umbauen, dass eine Stimme ihn verständlich vorliest. */
export function sprechbar(text) {
  let s = String(text).replace(/\*\*/g, "").replace(/[„“”"]/g, "");
  s = s.replace(/§§/g, " Paragrafen ").replace(/§/g, " Paragraf ");
  for (const [re, w] of WORTE) s = s.replace(re, w);
  s = s.replace(/(\d)([a-z])\b/g, "$1 $2"); // „§ 241a“ → „241 a“
  s = s.replace(/(?<![\p{L}\d])(\p{L}{2,8})(?![\p{L}\d])/gu, (m) => GESETZ[m] || KUERZEL[m] || m);
  s = s
    .replace(/(\d\.?)\s?[–—]\s?(?=\d)/g, "$1 bis ").replace(/(\p{L})\/(?=\p{L})/gu, "$1 oder ")
    .replace(/±\s?0\b/g, "unverändert").replace(/±/g, "plus minus ")
    .replace(/(^|\s)\+(?=\s?\d)/g, "$1plus ").replace(/(^|\s)[−-](?=\s?\d)/g, "$1minus ")
    .replace(/\s[−-]\s(?=\d)/g, " minus ").replace(/\s\+\s/g, " plus ").replace(/\s[×x·]\s(?=\d)/g, " mal ")
    .replace(/\s÷\s/g, " geteilt durch ").replace(/\s=\s/g, " gleich ").replace(/≥/g, " mindestens ").replace(/≤/g, " höchstens ")
    .replace(/\s?→\s?/g, ": ").replace(/\s[–—]\s/g, ", ").replace(/\s·\s/g, ". ").replace(/\s\/\s/g, " beziehungsweise ")
    .replace(/[()]/g, ", ").replace(/[\[\]]/g, "").replace(/\s+,/g, ",").replace(/,\s*,/g, ",").replace(/,\s*\./g, ".")
    .replace(/\s{2,}/g, " ").trim();
  return s;
}

/** Ein Segment in Sätze teilen (kurze Äußerungen brechen in manchen Browsern nicht ab). */
export function saetze(text) {
  const teile = text.split(/(?<=[.!?:;])\s+(?=[A-ZÄÖÜ0-9])/).map((t) => t.trim()).filter(Boolean);
  // Sehr lange Sätze an Kommas teilen
  return teile.flatMap((t) => t.length <= 260 ? [t] : t.split(/(?<=,)\s+/).reduce((a, x) => {
    if (a.length && (a[a.length - 1] + " " + x).length <= 220) a[a.length - 1] += " " + x; else a.push(x);
    return a;
  }, []));
}

const ORDINAL = ["Erstens", "Zweitens", "Drittens", "Viertens", "Fünftens", "Sechstens", "Siebtens", "Achtens", "Neuntens", "Zehntens"];

/**
 * Ablauf eines Themas: [{ text, ziel, teil, pause }] – ziel = data-hoer im Kompaktwissen (zum Mitlesen hervorheben),
 * pause = Millisekunden Stille davor (zwischen den Abschnitten zum Mitdenken).
 */
export function hoerSegmente(k, thema) {
  const seg = [], add = (text, ziel, teil, pause = 0) => text && seg.push({ text: sprechbar(text), ziel, teil, pause });
  add(`${thema.titel}. ${thema.unter || ""}`, "kopf", "Thema");
  add(k.satz, "satz", "Kernsatz", 500);
  if (k.zahlen?.length) {
    add("Wichtige Zahlen.", "zahlen-0", "Zahlen", 900);
    k.zahlen.forEach(([w, b], i) => add(`${w}: ${b}.`, `zahlen-${i}`, "Zahlen", 300));
  }
  if (k.schema?.length) {
    add("Prüfungsschema.", "schema-0", "Prüfungsschema", 900);
    k.schema.forEach((s, i) => add(`${ORDINAL[i] ? ORDINAL[i] + ": " : `Schritt ${i + 1}: `}${s}`, `schema-${i}`, "Prüfungsschema", 400));
  }
  if (k.punkte?.length) {
    add("Das Wichtigste.", "punkte-0", "Das Wichtigste", 900);
    k.punkte.forEach((p, i) => add(p, `punkte-${i}`, "Das Wichtigste", 700));
  }
  if (k.fallen?.length) {
    add("Typische Fehler.", "fallen-0", "Typische Fehler", 900);
    k.fallen.forEach((p, i) => add(p, `fallen-${i}`, "Typische Fehler", 700));
  }
  (k.beispiele || []).forEach((b, i) => {
    add(`Klausurbeispiel ${i + 1}: ${b.titel}.`, `bsp-${i}`, "Klausurbeispiel", 1100);
    add(`Sachverhalt: ${b.sv}`, `bsp-${i}`, "Klausurbeispiel", 300);
    if (b.aufgabe) add(`Aufgabe: ${b.aufgabe}`, `bsp-${i}`, "Klausurbeispiel", 300);
    add("Lösung.", `bsp-${i}`, "Klausurbeispiel", 600);
    b.loesung.forEach((z) => {
      if (!z.startsWith("BS:")) return add(z, `bsp-${i}`, "Klausurbeispiel", 250);
      const [satz, wirkung] = z.slice(3).trim().split(" → ");
      add(`Buchungssatz: ${satz}.${wirkung ? ` Auswirkung: ${wirkung}.` : ""}`, `bsp-${i}`, "Klausurbeispiel", 250);
    });
  });
  add(`Ende des Überblicks ${thema.titel}.`, "ende", "Ende", 900);
  return seg;
}

/** Hördauer in Minuten (ca. 140 Wörter je Minute bei Tempo 1, plus Pausen). */
export function hoerMinuten(seg, tempo = 1) {
  const woerter = seg.reduce((n, s) => n + s.text.split(/\s+/).length, 0);
  const pausen = seg.reduce((n, s) => n + s.pause, 0) / 60000;
  return Math.max(1, Math.round(woerter / (140 * tempo) + pausen));
}

// ---------------------------------------------------------------------------------------------
// Abspielen (Browser). Zustand außerhalb von render(), damit die Ausgabe beim Neuzeichnen weiterläuft.

export const TEMPI = [0.8, 0.9, 1, 1.15, 1.3];
const lies = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const P = { an: false, pausiert: false, id: null, teile: [], i: 0, token: 0, tempo: Number(lies("bsr.hoerTempo", "0.9")) || 0.9, liste: null, weiter: null, zuletztZiel: null };
const synth = () => (typeof window !== "undefined" && window.speechSynthesis) || null;
export const vorlesenMoeglich = () => !!synth() && typeof SpeechSynthesisUtterance !== "undefined";
export const hoerTempo = () => P.tempo;
export const hoertGerade = (id) => P.an && (!id || P.id === id);
export const hoertModul = () => P.an && !!P.liste;

let stimme = null;
function stimmeWaehlen() {
  const alle = synth()?.getVoices() || [];
  const de = alle.filter((v) => /^de(-|_|$)/i.test(v.lang));
  const punkte = (v) => (/premium|enhanced|erweitert|neural|natural/i.test(v.name) ? 4 : 0) + (/google/i.test(v.name) ? 2 : 0)
    + (/anna|petra|helena|katja|marlene/i.test(v.name) ? 1 : 0) + (/de-DE/i.test(v.lang) ? 1 : 0);
  stimme = de.sort((a, b) => punkte(b) - punkte(a))[0] || null;
}
if (vorlesenMoeglich()) {
  stimmeWaehlen();
  synth().addEventListener?.("voiceschanged", stimmeWaehlen);
  // App im Hintergrund (Bildschirm gesperrt): Ausgabe stoppt am Gerät – Stand anhalten, damit „Weiter“ an derselben Stelle fortsetzt
  document.addEventListener("visibilitychange", () => { if (document.hidden && P.an && !P.pausiert) pause(); });
}

/** Thema vorlesen. liste = Themen-IDs für „ganzes Modul“, weiter(id) öffnet das nächste Thema in der App. */
export function vorlesen(id, segmente, { liste = null, weiter = null, ab = 0 } = {}) {
  if (!vorlesenMoeglich()) return false;
  P.token++; synth().cancel();
  P.teile = segmente.flatMap((s) => saetze(s.text).map((text, j) => ({ text, ziel: s.ziel, teil: s.teil, pause: j ? 0 : s.pause })));
  Object.assign(P, { an: true, pausiert: false, id, i: ab, liste, weiter, zuletztZiel: null });
  sprich();
  return true;
}

function sprich() {
  const token = ++P.token;
  if (P.i >= P.teile.length) return themaEnde();
  const t = P.teile[P.i];
  leisteAktualisieren(true);
  const los = () => {
    if (token !== P.token) return;
    const u = new SpeechSynthesisUtterance(t.text);
    u.lang = stimme?.lang || "de-DE"; if (stimme) u.voice = stimme; u.rate = P.tempo; u.pitch = 1;
    const fertig = () => { if (token !== P.token || P.pausiert) return; P.i++; sprich(); };
    u.onend = fertig;
    u.onerror = (e) => { if (e.error === "interrupted" || e.error === "canceled") return; fertig(); };
    synth().speak(u);
  };
  t.pause && P.i ? setTimeout(los, t.pause / P.tempo) : los();
}

function themaEnde() {
  const n = P.liste ? P.liste.indexOf(P.id) + 1 : 0;
  if (P.liste && n > 0 && n < P.liste.length && P.weiter) { P.weiter(P.liste[n]); return; }
  stopp();
}

export function pause() { if (!P.an) return; P.pausiert = true; P.token++; synth()?.cancel(); leisteAktualisieren(); }
export function fortsetzen() { if (!P.an) return; P.pausiert = false; sprich(); }
export function umschalten() { P.pausiert ? fortsetzen() : pause(); }
export function stopp() { P.token++; synth()?.cancel(); Object.assign(P, { an: false, pausiert: false, id: null, teile: [], liste: null, weiter: null }); leisteAktualisieren(); }

/** Zum nächsten / vorherigen Punkt springen (nicht Satz). */
export function springen(richtung) {
  if (!P.an) return;
  const start = (i) => { while (i > 0 && P.teile[i - 1].ziel === P.teile[i].ziel && !P.teile[i].pause) i--; return i; };
  let i = P.i;
  if (richtung > 0) { const z = P.teile[i]?.ziel; i++; while (i < P.teile.length && P.teile[i].ziel === z && !P.teile[i].pause) i++; }
  else { const a = start(i); i = a > 0 ? start(a - 1) : 0; }
  P.i = Math.min(i, P.teile.length);
  P.pausiert = false; P.token++; synth().cancel();
  sprich();
}

export function tempoWechseln() {
  const i = TEMPI.indexOf(P.tempo);
  P.tempo = TEMPI[(i + 1) % TEMPI.length];
  try { localStorage.setItem("bsr.hoerTempo", String(P.tempo)); } catch { /* egal */ }
  if (P.an && !P.pausiert) { P.token++; synth().cancel(); sprich(); } else leisteAktualisieren();
  return P.tempo;
}

const tempoText = (t) => String(t).replace(".", ",") + "×";
const SYM = {
  play: '<path d="M7 4.5v15l12.5-7.5z"/>', pause: '<path d="M7 4.5h3.5v15H7zM13.5 4.5H17v15h-3.5z"/>',
  vor: '<path d="M5 5v14l9-7zM15 5h3v14h-3z"/>', zurueck: '<path d="M19 5v14l-9-7zM6 5h3v14H6z"/>', kreuz: '<path d="M6 6l12 12M18 6 6 18"/>',
};
const sym = (n, fill = true) => `<svg viewBox="0 0 24 24" class="hl-sym" aria-hidden="true" ${fill ? 'fill="currentColor" stroke="none"' : 'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"'}>${SYM[n]}</svg>`;

/** Leiste zeichnen und den gerade gelesenen Punkt hervorheben (nach jedem render() und bei jedem neuen Satz). */
export function leisteAktualisieren(rollen = false) {
  if (typeof document === "undefined") return;
  const el = document.getElementById("hoerLeiste");
  const knopf = document.querySelector(".hoer-start");
  knopf?.classList.toggle("an", P.an && el?.dataset.thema === P.id);
  document.querySelectorAll(".hoer-jetzt").forEach((x) => x.classList.remove("hoer-jetzt"));
  if (!el) return;
  if (!P.an || el.dataset.thema !== P.id) { el.hidden = true; el.innerHTML = ""; return; }
  const t = P.teile[Math.min(P.i, P.teile.length - 1)] || {};
  const punkte = [...new Set(P.teile.map((x) => x.ziel))], nr = punkte.indexOf(t.ziel) + 1;
  const modul = P.liste ? ` · Thema ${P.liste.indexOf(P.id) + 1}/${P.liste.length}` : "";
  el.hidden = false;
  el.innerHTML = `<div class="hl-info"><b>${P.pausiert ? "Pausiert" : "Wird vorgelesen"}</b><span>${t.teil || ""} · ${nr}/${punkte.length}${modul}</span>
      <div class="hl-balken"><i style="width:${Math.round((P.i / Math.max(1, P.teile.length)) * 100)}%"></i></div></div>
    <div class="hl-knoepfe">
      <button class="hl-k" data-a="hoerSprung" data-v="-1" aria-label="Vorheriger Punkt">${sym("zurueck")}</button>
      <button class="hl-k hl-haupt" data-a="hoerPause" aria-label="${P.pausiert ? "Weiter vorlesen" : "Pause"}">${sym(P.pausiert ? "play" : "pause")}</button>
      <button class="hl-k" data-a="hoerSprung" data-v="1" aria-label="Nächster Punkt">${sym("vor")}</button>
      <button class="hl-tempo" data-a="hoerTempo" aria-label="Tempo ändern">${tempoText(P.tempo)}</button>
      <button class="hl-k hl-zu" data-a="hoerStopp" aria-label="Vorlesen beenden">${sym("kreuz", false)}</button>
    </div>`;
  const ziel = document.querySelector(`[data-hoer="${t.ziel}"]`);
  if (ziel) {
    ziel.classList.add("hoer-jetzt");
    if (rollen && P.zuletztZiel !== t.ziel) {
      P.zuletztZiel = t.ziel;
      const ruhig = document.documentElement.dataset.bewegung === "aus";
      ziel.scrollIntoView({ block: "center", behavior: ruhig ? "auto" : "smooth" });
    }
  }
}

export { tempoText };
