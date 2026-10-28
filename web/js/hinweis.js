// Hinweise zu Aufgaben direkt an den Entwickler: Versand über Web3Forms (api.web3forms.com).
// Die Empfängeradresse ist nur beim Dienst hinterlegt – in der App steht allein der öffentliche Access Key.
// Leer = kein Versand, der Knopf „Hinweis“ teilt den Text dann über das Teilen-Menü.
export const HINWEIS_SCHLUESSEL = "df9a545c-fe87-464d-bbd8-b9ba3b66404a";

const OFFEN = "bsr.hinweise.offen";
export const hinweisAktiv = () => !!HINWEIS_SCHLUESSEL;

const lies = () => { try { return JSON.parse(localStorage.getItem(OFFEN) || "[]"); } catch (_) { return []; } };
const schreib = (l) => { try { localStorage.setItem(OFFEN, JSON.stringify(l)); } catch (_) {} };

async function senden(h) {
  const r = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: HINWEIS_SCHLUESSEL,
      subject: `Finanzwirt-Trainer – Hinweis zu ${h.aufgabe} (${h.modul})`,
      from_name: "Finanzwirt-Trainer",
      Modul: h.modul, Thema: h.thema, Aufgabe: h.aufgabe, Aufgabentext: h.text,
      Hinweis: h.hinweis, Kontakt: h.kontakt || "–", Datum: h.datum,
      ...(/^\S+@\S+\.\S+$/.test(h.kontakt || "") ? { replyto: h.kontakt } : {}),
    }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.success === false) throw new Error(j.message || `Fehler ${r.status}`);
}

/** Sendet einen Hinweis; ohne Netz wird er gespeichert und später nachgeschickt. → "gesendet" | "wartet" */
export async function hinweisSenden(h) {
  if (!navigator.onLine) { schreib([...lies(), h]); return "wartet"; }
  try { await senden(h); return "gesendet"; } catch (e) {
    if (e instanceof TypeError) { schreib([...lies(), h]); return "wartet"; } // Netzwerkfehler
    throw e;
  }
}

/** Gespeicherte Hinweise nachschicken (beim Start und sobald wieder Netz da ist). */
export async function offeneHinweiseSenden() {
  if (!hinweisAktiv() || !navigator.onLine) return;
  const l = lies(); if (!l.length) return;
  const rest = [];
  for (const h of l) { try { await senden(h); } catch (_) { rest.push(h); } }
  schreib(rest);
}
