// Service Worker: speichert die komplette App für die Offline-Nutzung.
// Bei jeder inhaltlichen Änderung VERSION erhöhen, damit Geräte das Update laden.
const VERSION = "bsr-v1";
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
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache zuerst (schnell und offline), im Hintergrund aktualisieren.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const treffer = await cache.match(e.request, { ignoreSearch: true });
      const netz = fetch(e.request)
        .then((antwort) => {
          if (antwort.ok) cache.put(e.request, antwort.clone());
          return antwort;
        })
        .catch(() => treffer);
      return treffer || netz;
    })
  );
});
