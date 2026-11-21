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

// Réseau d'abord pour les pages, scripts et styles (le HTML et le JS restent toujours de la même version),
// cache si hors ligne ou trop lent. Polices et images : cache d'abord.
function putCache(req, res) { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; }
function networkFirst(req, fallback) {
  return new Promise((resolve) => {
    let done = false;
    const timer = setTimeout(() => { caches.match(req, { ignoreSearch: true }).then((r) => { if (r && !done) { done = true; resolve(r); } }); }, 4000);
    fetch(req).then((res) => { clearTimeout(timer); if (!done) { done = true; resolve(putCache(req, res)); } else putCache(req, res); })
      .catch(() => { clearTimeout(timer); if (!done) { done = true; resolve(fallback()); } });
  });
}
self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  const dyn = req.mode === "navigate" || /\.(js|css|html|json|webmanifest)$/.test(url.pathname) || url.pathname.endsWith("/");
  if (dyn) {
    e.respondWith(networkFirst(req, () => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match(url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname, { ignoreSearch: true })).then((r) => r || (req.mode === "navigate" ? caches.match("/") : Response.error()))));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req).then(putCache.bind(null, req))));
});
