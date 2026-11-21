/* Enregistre le service worker : installation et mode hors ligne. */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function () { /* hors ligne ou bloqué : le site marche sans */ });
  });
}
