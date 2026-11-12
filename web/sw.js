// Service Worker: speichert die komplette App für die Offline-Nutzung.
// Bei jeder inhaltlichen Änderung VERSION erhöhen, damit Geräte das Update laden.
const VERSION = "bsr-v124";
const DATEIEN = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./js/app.js",
  "./js/geld.js",
  "./js/konten.js",
  "./js/kern.js",
  "./js/vorlagen.js",
  "./js/feste.js",
  "./js/katalog.js",
  "./js/lernkarten.js",
  "./js/meinekarten.js",
  "./js/handschrift.js",
  "./js/vorlesen.js",
  "./js/klausursim.js", "./js/klausur_stichworte.js", "./js/klausur_teilpunkte.js",
  "./js/ust/klausuren.js",
  "./js/pr/klausuren.js",
  "./js/bewr/normen.js",
  "./js/bewr/rechnen.js",
  "./js/bewr/aufgaben.js",
  "./js/bewr/aufgaben2.js",
  "./js/bewr/kompakt.js",
  "./js/bewr/beispiele.js",
  "./js/bewr/pfad.js",
  "./js/bewr/paare.js",
  "./js/bewr/klausuren.js",
  "./js/bilr/bbf_klausuren.js",
  "./js/oer/klausuren.js",
  "./js/bilr/klausur_sv.js",
  "./js/bilr/onlinetest.js",
  "./js/denkfehler.js",
  "./js/abfrage.js",
  "./js/kursraum.js",
  "./js/suche.js",
  "./js/schaubilder.js",
  "./js/satz.js",
  "./fonts/inter-latin-var.woff2",
  "./js/schaubilder_daten.js",
  "./js/hoeraudio.js",
  "./js/maskottchen.js",
  "./js/level.js",
  "./js/levelansicht.js",
  "./js/garderobe.js",
  "./js/garderobeansicht.js",
  "./js/termine.js",
  "./js/statistik.js",
  "./js/statistikansicht.js",
  "./js/duell.js",
  "./js/gruppe.js",
  "./js/neuigkeiten.js",
  "./js/hinweis.js",
  "./js/gesetzfarben.js",
  "./js/bildspeicher.js",
  "./js/bilr/bbf.js",
  "./js/bilr/bbf_kompakt.js",
  "./js/bilr/bbf_pfad.js",
  "./js/goodnotes.js",
  "./js/offen.js",
  "./js/sync.js",
  "./js/sync-config.js",
  "./js/lib/qrcode.js",
  "./js/stichworte/index.js",
  "./js/stichworte/oer-skript.js",
  "./js/stichworte/oer-fragen-a.js",
  "./js/stichworte/oer-fragen-b.js",
  "./js/stichworte/est.js",
  "./js/oer/normen.js",
  "./js/oer/gobt.js",
  "./js/oer/normtext.js",
  "./js/oer/fragen.js",
  "./js/oer/grafik.js",
  "./js/oer/uebertragung.js",
  "./js/oer/mc.js",
  "./js/oer/skript.js",
  "./js/bilr/normen.js",
  "./js/bilr/normen_zusatz.js",
  "./js/bilr/teil2.js",
  "./js/est/normen.js",
  "./js/est/tarif.js",
  "./js/est/aufgaben.js",
  "./js/est/punkte.js",
  "./js/paare.js",
  "./js/est/paare.js",
  "./js/bilr/teil1_zusatz.js",
  "./js/lernpfad.js",
  "./js/kompakt.js",
  "./js/ust/kompakt.js",
  "./js/bilr/kompakt.js",
  "./js/est/kompakt.js",
  "./js/oer/kompakt.js",
  "./js/ust/beispiele.js",
  "./js/bilr/beispiele.js",
  "./js/est/beispiele.js",
  "./js/oer/beispiele.js",
  "./js/bilr/gliederung.js",
  "./js/est/r2.js",
  "./js/ust/pfad.js",
  "./js/est/pfad.js",
  "./js/oer/pfad.js",
  "./js/bilr/pfad.js",
  "./js/ust/normen.js",
  "./js/ust/aufgaben.js",
  "./js/ust/paare.js",
  "./js/ao/hilfen.js",
  "./js/ao/aufgaben.js",
  "./js/ao/aufgaben2.js",
  "./js/ao/normen.js",
  "./js/ao/kompakt.js",
  "./js/ao/beispiele.js",
  "./js/ao/pfad.js",
  "./js/ao/paare.js",
  "./js/pr/aufgaben.js",
  "./js/pr/aufgaben2.js",
  "./js/pr/normen.js",
  "./js/pr/kompakt.js",
  "./js/pr/beispiele.js",
  "./js/pr/pfad.js",
  "./js/pr/paare.js",
  "./js/bilr/paare.js",
  "./js/oer/paare.js",
  "./js/markierungen.js",
  "./js/wiederholung.js",
  "./js/module.js",
  "./js/icons.js",
  "./js/aktivitaet.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  // cache: "reload" umgeht den HTTP-Cache, damit wirklich die neue Version gespeichert wird
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(DATEIEN.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

// Die App fragt die Version ab (Anzeige in den Einstellungen)
self.addEventListener("message", (e) => { if (e.data === "version") e.source?.postMessage({ version: VERSION }); });

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== "bsr-audio").map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Netz zuerst (immer die aktuelle Version, wenn online), bei Offline oder nach 3 s der Speicher.
async function audioAntwort(anfrage) {
  const gespeichert = await (await caches.open("bsr-audio")).match(anfrage.url);
  if (!gespeichert) return fetch(anfrage);
  const blob = await gespeichert.blob(), m = /bytes=(\d*)-(\d*)/.exec(anfrage.headers.get("range") || "");
  const kopf = { "Content-Type": "audio/mp4", "Accept-Ranges": "bytes" };
  if (!m) return new Response(blob, { status: 200, headers: { ...kopf, "Content-Length": String(blob.size) } });
  const start = m[1] ? Number(m[1]) : Math.max(0, blob.size - Number(m[2])), ende = m[1] && m[2] ? Math.min(Number(m[2]), blob.size - 1) : blob.size - 1;
  return new Response(blob.slice(start, ende + 1), { status: 206,
    headers: { ...kopf, "Content-Length": String(ende - start + 1), "Content-Range": `bytes ${start}-${ende}/${blob.size}` } });
}

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  // Vertonte Überblicke: offline gespeicherte (Cache „bsr-audio“, Knopf „Offline speichern“) mit Teilanfragen (Range)
  // ausliefern, damit Springen funktioniert; alles andere direkt aus dem Netz.
  if (url.pathname.includes("/audio/")) { e.respondWith(audioAntwort(e.request)); return; }
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const ausCache = () => cache.match(e.request, { ignoreSearch: true })
      .then((t) => t || (e.request.mode === "navigate" ? cache.match("./index.html") : undefined));
    const netz = fetch(e.request.url, { cache: "no-cache", credentials: "same-origin" }).then((antwort) => {
      if (antwort.ok) cache.put(e.request, antwort.clone());
      return antwort;
    });
    netz.catch(() => {});
    const zeitlimit = new Promise((ok) => setTimeout(ok, 3000)).then(ausCache);
    try {
      const sieger = await Promise.race([netz, zeitlimit]);
      return sieger || (await netz);
    } catch (_) {
      return (await ausCache()) || Response.error();
    }
  })());
});
