/* Enregistre le service worker : installation, mode hors ligne et message de mise à jour.
   Quand une nouvelle version est installée, un bandeau propose de recharger l'application. */
(function () {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  var hadController = !!navigator.serviceWorker.controller, shown = false;

  function banner() {
    if (shown || document.getElementById('maj-pwa')) return; shown = true;
    var b = document.createElement('div');
    b.id = 'maj-pwa'; b.setAttribute('role', 'status'); b.setAttribute('aria-live', 'polite');
    b.style.cssText = 'position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:99999;max-width:520px;margin:0 auto;background:#20283d;color:#fff;border-radius:12px;padding:12px 14px;display:flex;gap:12px;align-items:center;box-shadow:0 8px 28px rgba(20,30,70,.35);font:600 15px/1.35 system-ui,-apple-system,Segoe UI,sans-serif';
    var t = document.createElement('span'); t.style.flex = '1'; t.textContent = 'Nouvelle version des maths de Sanaa disponible.';
    var go = document.createElement('button'); go.type = 'button'; go.textContent = 'Mettre à jour';
    go.style.cssText = 'min-height:44px;padding:8px 14px;border:0;border-radius:8px;background:#fff;color:#20283d;font:700 15px system-ui,sans-serif;cursor:pointer';
    var later = document.createElement('button'); later.type = 'button'; later.textContent = 'Plus tard'; later.setAttribute('aria-label', 'Plus tard');
    later.style.cssText = 'min-height:44px;padding:8px 10px;border:0;background:transparent;color:#c9d3f2;font:600 14px system-ui,sans-serif;cursor:pointer';
    go.onclick = function () { location.reload(); };
    later.onclick = function () { b.remove(); };
    b.appendChild(t); b.appendChild(go); b.appendChild(later); document.body.appendChild(b);
  }

  // Une nouvelle version vient de prendre le contrôle (la première installation ne déclenche rien).
  navigator.serviceWorker.addEventListener('controllerchange', function () { if (hadController) banner(); });

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).then(function (r) {
      function check() { r.update().catch(function () {}); }
      check();
      document.addEventListener('visibilitychange', function () { if (!document.hidden) check(); });
      setInterval(check, 30 * 60 * 1000);
    }).catch(function () { /* hors ligne ou bloqué : le site marche sans */ });
  });
})();
