/* Enregistre le service worker : installation et mode hors ligne.
   Quand une nouvelle version prend le contrôle, la page se recharge une fois pour ne pas mélanger deux versions. */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  var hadController = !!navigator.serviceWorker.controller, reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (hadController && !reloaded) { reloaded = true; location.reload(); }
  });
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).then(function (r) { r.update(); }).catch(function () { /* hors ligne ou bloqué : le site marche sans */ });
  });
}
