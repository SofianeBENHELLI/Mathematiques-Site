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
    ['/#/bac-blanc', '◷ Bac blanc', 'bac'],
    ['https://science.benhelli.org/', 'Sciences ↗', 'sciences']
  ];
  var host = document.getElementById('sitenav'); if (!host) return;
  var cur = host.getAttribute('data-current');
  host.setAttribute('role', 'navigation'); host.setAttribute('aria-label', 'Choisir un atelier');
  host.style.cssText = 'display:flex;justify-content:center;gap:10px;flex-wrap:wrap;padding:12px 16px;background:#f5f7fb;border-bottom:1px solid #e5e9f2;font-size:14px';
  items.forEach(function (it) {
    var a = document.createElement('a'); a.href = it[0]; a.textContent = it[1];
    var on = it[2] === cur, hi = it[2] === 'home' || it[2] === 'bac';
    a.style.cssText = 'display:inline-flex;align-items:center;min-height:44px;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:600;' +
      (on ? 'color:#294bd3;background:#e7edff' : it[2] === 'sciences' ? 'color:#68459d;background:#f0eafb' : hi ? 'color:#294bd3;background:#e7edff' : 'color:#53617a;background:white');
    if (on) a.setAttribute('aria-current', 'page');
    host.appendChild(a);
  });
})();
