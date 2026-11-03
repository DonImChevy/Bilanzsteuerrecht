// Service Worker for the Präsenztest-Trainer (scope ./testtrainer/): stores the whole app for offline use.
// Bump VERSION with every change so devices load the update.
const VERSION = "tt-v1";
const DATEIEN = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/tt.css",
  "./js/app.js",
  "./js/zufall.js",
  "./js/typen.js",
  "./js/zahlen.js",
  "./js/vg.js",
  "./js/logik.js",
  "./js/englisch.js",
  "./js/speicher.js",
  "./js/plan.js",
  "../css/style.css",
  "../js/icons.js",
  "../icons/icon-192.png",
  "../icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(DATEIEN.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("tt-") && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first (fresh when online), cache when offline or after 3 s.
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
