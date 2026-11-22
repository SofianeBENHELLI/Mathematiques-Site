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

  /* ---- Bouton « Installer l'application » : Android et ordinateur (invite native), iPhone et iPad (mode d'emploi) ---- */
  var deferred = null, buttons = [];
  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  function installed() { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true; }
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; });
  window.addEventListener('appinstalled', function () { deferred = null; buttons.forEach(function (b) { b.remove(); }); buttons = []; });

  function steps() {
    if (isIOS) return ['Ouvre ce site dans <b>Safari</b> (sur iPhone et iPad, c’est le plus fiable).', 'Touche le bouton <b>Partager</b> (le carré avec une flèche vers le haut, en bas ou en haut de l’écran).', 'Fais défiler et touche <b>Sur l’écran d’accueil</b>.', 'Touche <b>Ajouter</b>. L’icône « Maths de Sanaa » apparaît sur l’écran d’accueil.'];
    if (isAndroid) return ['Ouvre ce site dans <b>Chrome</b>.', 'Touche le menu <b>⋮</b> (en haut à droite).', 'Touche <b>Installer l’application</b> (ou <b>Ajouter à l’écran d’accueil</b>).', 'Confirme avec <b>Installer</b>.'];
    return ['Dans Chrome ou Edge, cherche l’icône <b>Installer</b> à droite de la barre d’adresse (ou le menu ⋮ puis <b>Installer Maths de Sanaa</b>).', 'Sur Safari (Mac) : menu <b>Fichier</b> puis <b>Ajouter au Dock</b>.'];
  }
  function dialog() {
    if (document.getElementById('install-dialog')) return;
    var o = document.createElement('div'); o.id = 'install-dialog'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', 'Installer l’application');
    o.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(20,30,70,.5);display:flex;align-items:flex-end;justify-content:center;padding:12px;font-family:system-ui,-apple-system,Segoe UI,sans-serif';
    var c = document.createElement('div'); c.style.cssText = 'background:#fff;color:#20283d;border-radius:16px;padding:20px;max-width:460px;width:100%;box-shadow:0 12px 40px rgba(20,30,70,.4);max-height:90vh;overflow:auto';
    c.innerHTML = '<h2 style="margin:0 0 6px;font-size:20px">Installer les maths de Sanaa</h2><p style="margin:0 0 12px;color:#53617a;font-size:15px;line-height:1.5">L’application s’ouvre en plein écran, comme une vraie appli, et marche aussi sans connexion une fois chargée.</p><ol style="margin:0 0 16px;padding-left:22px;font-size:16px;line-height:1.6">' + steps().map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ol>';
    var ok = document.createElement('button'); ok.type = 'button'; ok.textContent = 'J’ai compris';
    ok.style.cssText = 'width:100%;min-height:48px;border:0;border-radius:10px;background:#3459e8;color:#fff;font:700 16px system-ui,sans-serif;cursor:pointer';
    function close() { o.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    ok.onclick = close; o.addEventListener('click', function (e) { if (e.target === o) close(); }); document.addEventListener('keydown', onKey);
    c.appendChild(ok); o.appendChild(c); document.body.appendChild(o); ok.focus();
  }
  function onInstall() {
    if (deferred) { var d = deferred; deferred = null; d.prompt(); d.userChoice.finally(function () {}); }
    else dialog();
  }
  function makeButton(style) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'btn-install'; b.textContent = '⤓ Installer l’appli'; b.style.cssText = style; b.onclick = onInstall; buttons.push(b); return b;
  }
  function mountInstall() {
    if (installed()) return;
    var row = document.querySelector('#sitenav > div');
    if (row && !row.querySelector('.btn-install')) row.insertBefore(makeButton('flex:none;display:inline-flex;align-items:center;min-height:40px;padding:6px 14px;border-radius:999px;border:0;background:#20283d;color:#fff;font:600 14px system-ui,sans-serif;white-space:nowrap;cursor:pointer'), row.firstChild);
    var hl = document.querySelector('.header-links');
    if (hl && !hl.querySelector('.btn-install')) hl.appendChild(makeButton('min-height:44px;padding:8px 14px;border-radius:10px;border:0;background:#20283d;color:#fff;font:600 14px system-ui,sans-serif;cursor:pointer;margin-left:8px'));
  }
  window.addEventListener('load', function () { setTimeout(mountInstall, 0); });
  window.PWAInstall = { open: onInstall, installed: installed };
})();
