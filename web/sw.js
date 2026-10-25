// Service Worker: speichert die komplette App für die Offline-Nutzung.
// Bei jeder inhaltlichen Änderung VERSION erhöhen, damit Geräte das Update laden.
const VERSION = "bsr-v24";
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
  "./js/ust/pfad.js",
  "./js/est/pfad.js",
  "./js/oer/pfad.js",
  "./js/bilr/pfad.js",
  "./js/ust/normen.js",
  "./js/ust/aufgaben.js",
  "./js/ust/paare.js",
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

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Netz zuerst (immer die aktuelle Version, wenn online), bei Offline oder nach 3 s der Speicher.
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
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
