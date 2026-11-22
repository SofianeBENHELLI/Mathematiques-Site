/* Service worker généré par scripts/build-pwa.mjs : ne pas modifier sw.js à la main. */
const VERSION = "b3f9776b9711";
const CACHE = "maths-sanaa-" + VERSION;
const ASSETS = [
 "/",
 "/assets/app.js",
 "/assets/bac.js",
 "/assets/backup.js",
 "/assets/base.css",
 "/assets/fonts.css",
 "/assets/fonts/font-0.ttf",
 "/assets/fonts/font-1.ttf",
 "/assets/fonts/font-2.ttf",
 "/assets/fonts/font-3.ttf",
 "/assets/fonts/font-4.ttf",
 "/assets/fonts/font-5.ttf",
 "/assets/fonts/font-6.ttf",
 "/assets/fonts/font-7.ttf",
 "/assets/fonts/font-8.ttf",
 "/assets/fx.js",
 "/assets/icons.js",
 "/assets/legacy-practice.css",
 "/assets/legacy-practice.js",
 "/assets/mini.css",
 "/assets/mini.js",
 "/assets/mock-exam-state.js",
 "/assets/nav.js",
 "/assets/pwa.js",
 "/assets/simulations.js",
 "/assets/style.css",
 "/content/analysis.js",
 "/content/geometry-probability.js",
 "/content/learning-paths.js",
 "/content/legacy-practice.js",
 "/content/methods.js",
 "/content/mock-exams.js",
 "/content/revision-topics.js",
 "/content/variants.js",
 "/derivation/",
 "/derivation/app.js",
 "/derivation/content.js",
 "/droites-cercles/",
 "/droites-cercles/app.js",
 "/droites-cercles/content.js",
 "/exponentielle/",
 "/exponentielle/app.js",
 "/exponentielle/content.js",
 "/fonctions/",
 "/fonctions/app.js",
 "/fonctions/content.js",
 "/icons/apple-touch-icon.png",
 "/icons/icon-192.png",
 "/icons/icon-512.png",
 "/icons/icon-maskable-512.png",
 "/manifest.webmanifest",
 "/polynomes/",
 "/polynomes/app.js",
 "/polynomes/content.js",
 "/probabilites/",
 "/probabilites/app.js",
 "/probabilites/content.js",
 "/produit-scalaire/",
 "/produit-scalaire/app.js",
 "/produit-scalaire/content.js",
 "/python/",
 "/python/app.js",
 "/python/content.js",
 "/statistiques/",
 "/statistiques/app.js",
 "/statistiques/content.js",
 "/suites/",
 "/suites/app.js",
 "/suites/content.js",
 "/trigonometrie/",
 "/trigonometrie/app.js",
 "/trigonometrie/content.js",
 "/variables-aleatoires/",
 "/variables-aleatoires/app.js",
 "/variables-aleatoires/content.js"
];

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
