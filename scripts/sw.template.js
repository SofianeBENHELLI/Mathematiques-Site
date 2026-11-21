/* Service worker généré par scripts/build-pwa.mjs : ne pas modifier sw.js à la main. */
const VERSION = "__VERSION__";
const CACHE = "maths-sanaa-" + VERSION;
const ASSETS = __ASSETS__;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("maths-sanaa-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Pages : le réseau d'abord (contenu à jour), le cache si hors ligne. Reste : cache d'abord.
self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match(url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname, { ignoreSearch: true })).then((r) => r || caches.match("/")))
    );
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; })));
});
