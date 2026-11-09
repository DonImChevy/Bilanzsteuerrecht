// Kursraum für Dozierende: Hinweise, Links, Dateien und Aufgabenblätter je Modul, die alle in der App sehen.
// Schreiben nur mit dem Dozierenden-Passwort (geprüft in der Datenbank, server/kursraum.sql).
// Ergebnisse zu Aufgabenblättern werden anonym als Zähler gemeldet (richtig/falsch je Aufgabe).
import { SYNC_SERVER } from "./sync-config.js";

export const kursVerfuegbar = () => !!(SYNC_SERVER.url && SYNC_SERVER.key);
export const ARTEN = { hinweis: "Hinweis", link: "Link", datei: "Datei", blatt: "Aufgabenblatt" };
export const MAX_DATEI = 4 * 1024 * 1024;

async function rpc(name, body) {
  const kopf = { apikey: SYNC_SERVER.key, "Content-Type": "application/json" };
  if (SYNC_SERVER.key.startsWith("eyJ")) kopf.Authorization = "Bearer " + SYNC_SERVER.key;
  const r = await fetch(`${SYNC_SERVER.url.replace(/\/$/, "")}/rest/v1/rpc/${name}`, { method: "POST", headers: kopf, body: JSON.stringify(body) });
  const t = await r.text();
  if (!r.ok) { let m = `Server ${r.status}`; try { m = JSON.parse(t).message || m; } catch (_) { /* egal */ } throw new Error(m); }
  return t ? JSON.parse(t) : null;
}

const CACHE = "bsr.kurs";
const lies = () => { try { return JSON.parse(localStorage.getItem(CACHE) || "{}"); } catch (_) { return {}; } };
/** Zuletzt geladene Einträge eines Moduls (auch offline). */
export const zwischenstand = (fach) => lies()[fach] || null;

export async function liste(fach) {
  const l = (await rpc("kurs_liste", { p_fach: fach })) || [];
  try { const c = lies(); c[fach] = { t: Date.now(), l }; localStorage.setItem(CACHE, JSON.stringify(c)); } catch (_) { /* egal */ }
  return l;
}
export const datei = (id) => rpc("kurs_datei", { p_id: id });
export const pruefen = (pw) => rpc("kurs_pruefen", { p_passwort: pw });
export const speichern = (pw, eintrag) => rpc("kurs_speichern", { p_passwort: pw, p_eintrag: eintrag });
export const loeschen = (pw, id) => rpc("kurs_loeschen", { p_passwort: pw, p_id: id });
export const statistik = (pw, id) => rpc("kurs_statistik", { p_passwort: pw, p_id: id });
export const melden = (id, aufgabe, richtig) => rpc("kurs_melden", { p_id: id, p_aufgabe: aufgabe, p_richtig: !!richtig }).catch(() => {});

/** Neue Einträge seit dem letzten Besuch (für den Punkt an der Kachel). */
export function neuSeit(l, gesehen) { return (l || []).filter((e) => Date.parse(e.erstellt) > (gesehen || 0)).length; }

/** Einfacher Text mit Absätzen und Links (https) – alles andere wird maskiert. */
export function textHtml(t, esc) {
  return esc(t || "").split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>").replace(/(https:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')}</p>`).join("");
}

/** Datei (File) → data:-URL. */
export function alsDataUrl(file) {
  return new Promise((ok, fehler) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = () => fehler(r.error); r.readAsDataURL(file); });
}
