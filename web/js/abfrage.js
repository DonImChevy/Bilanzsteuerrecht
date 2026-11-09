// „Frag mich ab“: fällige Wiederholungen werden vorgelesen – Frage → Denkpause → Lösung → Bewertung
// (Bildschirmknöpfe oder Kopfhörertasten: vor = gewusst, zurück = nicht gewusst). Gerätestimme, Normen ausgeschrieben.
import { sprechbar, hoerTempo } from "./vorlesen.js";
import { loesungText } from "./kern.js";

const BUCHSTABEN = ["A", "B", "C", "D"];
/** Taugt die Aufgabe zum Abfragen ohne Bildschirm? */
export function geeignet(f) {
  if (!f || f.grafik || f.tabelle || f.fall) return false;
  if (f.typ === "auswahl") return f.optionen.length <= 4 && f.optionen.every((o) => o.length <= 140) && f.text.length <= 320;
  if (f.typ === "zahl") return f.text.length <= 260;
  if (f.typ === "offen") return f.text.length <= 220 && !!kurzAntwort(f);
  return false;
}
/** Kurzfassung einer Musterantwort: erster Spiegelstrich bzw. die ersten zwei Sätze, höchstens ca. 320 Zeichen. */
export function kurzAntwort(f) {
  const t = String(f.antwort || "").split("\n").map((z) => z.replace(/^[•\-–]\s*/, "").trim()).filter(Boolean);
  // ganze Musterantwort, solange sie kurz genug zum Zuhören ist (sonst ist die Aufgabe nicht geeignet)
  const ganz = t.join(" ");
  return ganz.length <= 480 ? ganz : "";
}
/** Text-Teile zum Vorlesen. */
export function teile(f) {
  let frage = f.text.replace(/\n+/g, " ");
  if (f.typ === "auswahl") frage += " " + f.optionen.map((o, i) => `Antwort ${BUCHSTABEN[i]}: ${o}.`).join(" ");
  let loesung;
  if (f.typ === "auswahl") loesung = `Richtig ist ${f.richtig.map((i) => `${BUCHSTABEN[i]}: ${f.optionen[i]}`).join(", und ")}.`;
  else if (f.typ === "zahl") loesung = `Lösung: ${loesungText(f)}.`;
  else loesung = `Lösung: ${kurzAntwort(f)}`;
  const erkl = f.typ === "offen" ? "" : String(f.erklaerung || "").split(/(?<=[.!?])\s+/)[0];
  return { frage: sprechbar(frage), loesung: sprechbar(loesung + (erkl ? " " + erkl : "")), anzeigeLoesung: loesung, anzeigeErkl: erkl };
}

// ---------------------------------------------------------------------------------------------
// Abspielen
const synth = () => (typeof window !== "undefined" && window.speechSynthesis) || null;
export const abfrageMoeglich = () => !!synth() && typeof SpeechSynthesisUtterance !== "undefined";
let token = 0, stille = null;
function stimme() { const v = synth()?.getVoices?.() || []; return v.find((x) => /de[-_]DE/i.test(x.lang) && /premium|enhanced|anna|petra|helena/i.test(x.name)) || v.find((x) => /^de/i.test(x.lang)) || null; }
/** Spricht einen Text; das Versprechen erfüllt sich am Ende (oder sofort, wenn abgebrochen). */
export function sprich(text) {
  const t = token;
  return new Promise((ok) => {
    const s = synth(); if (!s) return ok();
    s.cancel();
    const u = new SpeechSynthesisUtterance(text), v = stimme();
    let fertig = false; const ende = (w) => { if (!fertig) { fertig = true; ok(w); } };
    u.lang = v?.lang || "de-DE"; if (v) u.voice = v; u.rate = hoerTempo(); u.onend = () => ende(t === token); u.onerror = (e) => ende(e.error === "interrupted" || e.error === "canceled" ? false : t === token);
    s.speak(u);
    // Sicherheitsnetz: manche Geräte melden das Ende nie
    setTimeout(() => ende(t === token), 2500 + (text.length * 75) / (hoerTempo() || 1));
  });
}
export const warte = (ms) => { const t = token; return new Promise((ok) => setTimeout(() => ok(t === token), ms)); };
export function stopp() { token++; synth()?.cancel(); if (stille) { stille.pause(); } if (typeof navigator !== "undefined" && navigator.mediaSession) { for (const a of ["nexttrack", "previoustrack", "play", "pause"]) try { navigator.mediaSession.setActionHandler(a, null); } catch (_) { /* egal */ } } }
export const neu = () => ++token;
export const aktuell = () => token;
/** Kopfhörertasten: vor = gewusst, zurück = nicht gewusst. Ein leiser Ton im Hintergrund hält die Medien-Steuerung aktiv. */
export function tastenAn(gewusst, nicht, titel) {
  if (typeof navigator === "undefined" || !navigator.mediaSession) return;
  try {
    if (!stille) { stille = new Audio(stilleWav()); stille.loop = true; stille.volume = 0.01; }
    stille.play().catch(() => {});
    navigator.mediaSession.metadata = new MediaMetadata({ title: titel || "Abfrage", artist: "Finanzwirt-Trainer · Frag mich ab" });
    navigator.mediaSession.setActionHandler("nexttrack", () => gewusst());
    navigator.mediaSession.setActionHandler("previoustrack", () => nicht());
    navigator.mediaSession.setActionHandler("play", () => stille.play().catch(() => {}));
    navigator.mediaSession.setActionHandler("pause", () => {});
  } catch (_) { /* egal */ }
}
/** 1 s Stille als WAV (8 kHz, 8 bit). */
function stilleWav() {
  const n = 8000, b = new Uint8Array(44 + n), d = new DataView(b.buffer), w = (o, s) => [...s].forEach((c, i) => (b[o + i] = c.charCodeAt(0)));
  w(0, "RIFF"); d.setUint32(4, 36 + n, true); w(8, "WAVEfmt "); d.setUint32(16, 16, true); d.setUint16(20, 1, true); d.setUint16(22, 1, true);
  d.setUint32(24, 8000, true); d.setUint32(28, 8000, true); d.setUint16(32, 1, true); d.setUint16(34, 8, true); w(36, "data"); d.setUint32(40, n, true); b.fill(128, 44);
  return URL.createObjectURL(new Blob([b], { type: "audio/wav" }));
}
