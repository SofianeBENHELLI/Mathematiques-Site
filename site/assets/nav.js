/* Barre de navigation commune à tous les ateliers. Ajouter un chapitre = ajouter une ligne ici. */
(function () {
  var items = [
    ['/#/home', '← Tous les chapitres', 'home'],
    ['/fonctions/', 'Fonctions', 'fonctions'],
    ['/derivation/', 'Dérivation', 'derivation'],
    ['/exponentielle/', 'Exponentielle', 'exponentielle'],
    ['/trigonometrie/', 'Trigonométrie', 'trigonometrie'],
    ['/polynomes/', 'Second degré', 'polynomes'],
    ['/suites/', 'Suites', 'suites'],
    ['/produit-scalaire/', 'Produit scalaire', 'produit-scalaire'],
    ['/droites-cercles/', 'Droites et cercles', 'droites-cercles'],
    ['/probabilites/', 'Probabilités', 'probabilites'],
    ['/variables-aleatoires/', 'Variables aléatoires', 'variables-aleatoires'],
    ['/statistiques/', 'Statistiques', 'statistiques'],
    ['/python/', 'Python', 'python'],
    ['/#/bac-blanc', '◷ Bac blanc', 'bac'],
    ['https://science.benhelli.org/', 'Sciences ↗', 'sciences']
  ];
  var host = document.getElementById('sitenav'); if (!host) return;
  var cur = host.getAttribute('data-current');
  host.setAttribute('role', 'navigation'); host.setAttribute('aria-label', 'Choisir un atelier');
  /* Une seule ligne qui défile sur le côté : le chapitre courant est centré, les autres sont à un geste. */
  host.style.cssText = 'overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;background:#f5f7fb;border-bottom:1px solid #e5e9f2;font-size:14px;scroll-snap-type:x proximity;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 14px,#000 calc(100% - 28px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 14px,#000 calc(100% - 28px),transparent 100%)';
  var row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;width:max-content;margin:0 auto;padding:8px 18px';
  host.appendChild(row);
  var curEl = null;
  items.forEach(function (it) {
    var a = document.createElement('a'); a.href = it[0]; a.textContent = it[1] === '← Tous les chapitres' ? '← Accueil' : it[1];
    var on = it[2] === cur, hi = it[2] === 'home' || it[2] === 'bac';
    a.style.cssText = 'flex:none;scroll-snap-align:center;display:inline-flex;align-items:center;min-height:40px;padding:6px 14px;border-radius:999px;text-decoration:none;font-weight:600;white-space:nowrap;' +
      (on ? 'color:#fff;background:#3459e8' : it[2] === 'sciences' ? 'color:#68459d;background:#f0eafb' : hi ? 'color:#294bd3;background:#e7edff' : 'color:#53617a;background:white;border:1px solid #e5e9f2');
    if (on) { a.setAttribute('aria-current', 'page'); curEl = a; }
    row.appendChild(a);
  });
  if (curEl) { var c = curEl.offsetLeft + curEl.offsetWidth / 2; host.scrollLeft = Math.max(0, c - host.clientWidth / 2); }
})();
