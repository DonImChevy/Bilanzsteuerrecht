// Import von Goodnotes-Lernsets (Export „.goodnotes“) – nur getippter Text.
// Aufbau (aus einer Beispieldatei ermittelt, nicht offiziell dokumentiert):
// • ZIP-Archiv; darin index.events.pb = Änderungsprotokoll, eine Folge längenpräfixierter Protobuf-Nachrichten.
// • Feld 30: Lernset {1: id, 2: {1: Titel}}.
// • Feld 151 (Karte angelegt) / 152 (Karte geändert): {1: Karten-id, 2: Lernset-id, 3|4: {1: Sortierschlüssel},
//   Frage und Antwort als {1: {1: {1: MIME-Typ, 2: Text}}} – bei 152 in Feld 4/5, bei 151 in Feld 5/6.
// Spätere Einträge zur selben Karte ersetzen frühere. Bilder und Handschrift werden übersprungen.

// ---------------------------------------------------------------- Protobuf (nur was wir brauchen)
function varint(b, i) {
  let r = 0, s = 0, x;
  do { if (i >= b.length) throw new Error("Ende"); x = b[i++]; r += (x & 0x7f) * 2 ** s; s += 7; } while (x >= 0x80);
  return [r, i];
}
/** Felder einer Nachricht als Liste {f, w, v}; v = Zahl (varint) oder Uint8Array (längenbegrenzt). */
function felder(b) {
  const out = [];
  let i = 0;
  while (i < b.length) {
    let k; [k, i] = varint(b, i);
    const f = Math.floor(k / 8), w = k & 7;
    if (!f) throw new Error("Feld 0");
    if (w === 0) { let v; [v, i] = varint(b, i); out.push({ f, w, v }); }
    else if (w === 1) i += 8;
    else if (w === 5) i += 4;
    else if (w === 2) { let n; [n, i] = varint(b, i); if (i + n > b.length) throw new Error("Länge"); out.push({ f, w, v: b.subarray(i, i + n) }); i += n; }
    else throw new Error("Typ " + w);
  }
  return out;
}
const sub = (b, ...pfad) => {
  for (const f of pfad) { const x = b && felder(b).find((y) => y.f === f && y.w === 2); b = x?.v; }
  return b;
};
const alle = (b, f) => (b ? felder(b).filter((y) => y.f === f && y.w === 2).map((y) => y.v) : []);
const utf8 = new TextDecoder();
const text = (b) => (b ? utf8.decode(b) : "");

/** Text einer Kartenseite: alle Textteile {1: {1: MIME, 2: Text}} zusammengefügt. */
function seite(b) {
  return alle(b, 1).flatMap((teil) => alle(teil, 1))
    .filter((x) => text(sub(x, 1)).startsWith("text/"))
    .map((x) => { const t = felder(x).find((y) => y.f === 2 && y.w === 2); return t ? text(t.v) : ""; })
    .join("\n").trim();
}

// ---------------------------------------------------------------- ZIP (gespeichert oder Deflate)
async function zipEintrag(buf, name) {
  const b = new Uint8Array(buf), d = new DataView(buf);
  let e = b.length - 22;
  while (e >= 0 && d.getUint32(e, true) !== 0x06054b50) e--;
  if (e < 0) return null; // kein ZIP
  let p = d.getUint32(e + 16, true);
  const anzahl = d.getUint16(e + 10, true);
  for (let n = 0; n < anzahl; n++) {
    if (d.getUint32(p, true) !== 0x02014b50) break;
    const methode = d.getUint16(p + 10, true), komprimiert = d.getUint32(p + 20, true);
    const nl = d.getUint16(p + 28, true), el = d.getUint16(p + 30, true), kl = d.getUint16(p + 32, true), lokal = d.getUint32(p + 42, true);
    const datei = utf8.decode(b.subarray(p + 46, p + 46 + nl));
    if (datei === name) {
      const start = lokal + 30 + d.getUint16(lokal + 26, true) + d.getUint16(lokal + 28, true);
      const roh = b.subarray(start, start + komprimiert);
      if (methode === 0) return roh;
      if (methode !== 8) throw new Error("Unbekannte ZIP-Kompression");
      if (typeof DecompressionStream === "undefined") throw new Error("Dieser Browser kann die Datei nicht entpacken – bitte iOS/iPadOS aktualisieren.");
      const strom = new Blob([roh]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return new Uint8Array(await new Response(strom).arrayBuffer());
    }
    p += 46 + nl + el + kl;
  }
  return null;
}

/**
 * Liest ein Goodnotes-Lernset. Eingabe: ArrayBuffer der .goodnotes-Datei (oder direkt index.events.pb).
 * Ergebnis: { titel, karten: [{ v: Frage, h: Antwort }] } in der Reihenfolge des Lernsets.
 */
export async function goodnotesLesen(buf) {
  const ereignisse = (await zipEintrag(buf, "index.events.pb")) ?? new Uint8Array(buf);
  const sets = new Map(), karten = new Map();
  let i = 0;
  while (i < ereignisse.length) {
    let n; [n, i] = varint(ereignisse, i);
    const nachricht = ereignisse.subarray(i, i + n);
    i += n;
    for (const { f, w, v } of felder(nachricht)) {
      if (w !== 2) continue;
      if (f === 30) {
        const id = text(sub(v, 1)), titel = text(sub(v, 2, 1));
        if (id) sets.set(id, titel || sets.get(id) || "");
      } else if (f === 151 || f === 152) {
        const id = text(sub(v, 1));
        if (!id) continue;
        const [s, fr, an] = f === 151 ? [4, 5, 6] : [3, 4, 5];
        const alt = karten.get(id) || { reihe: karten.size };
        karten.set(id, { ...alt, set: text(sub(v, 2)) || alt.set, sort: text(sub(v, s, 1)) || alt.sort || "",
          v: seite(sub(v, fr)), h: seite(sub(v, an)) });
      }
    }
  }
  if (!sets.size && !karten.size) throw new Error("Kein Goodnotes-Lernset");
  const liste = [...karten.values()].filter((k) => k.v || k.h)
    .sort((a, b) => (a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : a.reihe - b.reihe));
  const titel = [...sets.values()].find(Boolean) || "Goodnotes-Lernset";
  return { titel, karten: liste.map(({ v, h }) => ({ v, h })), ohneText: [...karten.values()].filter((k) => !k.v || !k.h).length };
}
