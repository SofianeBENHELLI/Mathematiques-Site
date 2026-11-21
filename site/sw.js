/* Service worker généré par scripts/build-pwa.mjs : ne pas modifier sw.js à la main. */
const VERSION = "689bf1a6b01c";
const CACHE = "maths-sanaa-" + VERSION;
const ASSETS = [
 "/",
 "/assets/app.js",
 "/assets/bac.js",
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
 "/suites/",
 "/suites/app.js",
 "/suites/content.js",
 "/trigonometrie/",
 "/trigonometrie/app.js",
 "/trigonometrie/content.js"
];

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
