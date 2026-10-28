// Duell per Link: Beide spielen dieselben 10 Aufgaben (gleicher Zufallsstartwert), der Link trägt Name, Ergebnis und Zeit.
// Ohne Server: Herausforderung und Antwort werden als Link geteilt (#duell=…).

export const DUELL_ANZAHL = 10;

const b64 = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64 = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));

/** Neuer Startwert für die Aufgaben. */
export const neuerSeed = () => (crypto.getRandomValues(new Uint32Array(1))[0] >>> 0) || 1;

/**
 * Link-Inhalt: {f: Modul, s: Startwert, n: Name, r: richtig, z: Sekunden, a: Anzahl Aufgabentypen (Versionsprüfung),
 *  g?: {n, r, z} – Ergebnis des Herausforderers, wenn der Link eine Antwort ist}.
 */
export const duellKodieren = (d) => b64(JSON.stringify({ v: 1, ...d }));
export function duellLesen(text) {
  try {
    const d = JSON.parse(unb64(String(text)));
    if (d?.v !== 1 || typeof d.f !== "string" || !Number.isFinite(d.s) || !Number.isFinite(d.r) || !Number.isFinite(d.z)) return null;
    return { f: d.f, s: d.s >>> 0, n: String(d.n || "Jemand").slice(0, 24), r: Math.max(0, Math.min(DUELL_ANZAHL, d.r | 0)), z: Math.max(0, d.z | 0), a: d.a | 0,
      g: d.g && Number.isFinite(d.g.r) ? { n: String(d.g.n || "Jemand").slice(0, 24), r: d.g.r | 0, z: d.g.z | 0 } : null };
  } catch (_) { return null; }
}
export const duellLink = (basis, d) => `${basis}#duell=${duellKodieren(d)}`;

/** Wer hat gewonnen? Mehr richtig gewinnt, bei Gleichstand die schnellere Zeit. 1 = ich, −1 = Gegner, 0 = unentschieden. */
export function duellSieger(ich, gegner) {
  if (ich.r !== gegner.r) return ich.r > gegner.r ? 1 : -1;
  if (ich.z !== gegner.z) return ich.z < gegner.z ? 1 : -1;
  return 0;
}

export const zeitText = (sek) => `${Math.floor(sek / 60)}:${String(sek % 60).padStart(2, "0")}`;
