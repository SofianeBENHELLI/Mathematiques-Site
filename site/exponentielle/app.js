/* Mini-site Exponentielle : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46';
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r5(v) { return fmt(Math.round(v * 1e5) / 1e5); }

  /* 1. Construire l'exponentielle : la méthode d'Euler pour y' = y, y(0) = 1 */
  (function () {
    var L = Mini.makeLab('lab1', '1. Construire l’exponentielle : pente = hauteur', 'approximation pas à pas');
    var g = new FX.Graph(L.graph, { xmin: -0.3, xmax: 2.3, ymin: -0.5, ymax: 8.5, label: 'Courbe de l’exponentielle et approximation en escalier' });
    var out = h('<div class="readout" aria-live="polite"></div>'), tbl = h('<div class="readout"></div>');
    var nsl = Mini.slider('x-n', 'Nombre de pas n (pas h = 2/n) =', 1, 60, 1, 4, function (n) { draw(n); });
    L.side.appendChild(nsl); L.side.appendChild(out); L.side.appendChild(tbl);
    function draw(n) {
      g.clear(); g.curve(Math.exp, BLUE);
      var hh = 2 / n, x = 0, y = 1, pts = [[0, 1]];
      for (var i = 0; i < n; i++) { y = y + hh * y; x = x + hh; pts.push([x, y]); }
      for (var j = 0; j < pts.length - 1; j++) g.line(pts[j][0], pts[j][1], pts[j + 1][0], pts[j + 1][1], ORANGE, { width: 2.4 });
      pts.forEach(function (p) { g.point(p[0], p[1], ORANGE, { r: 3.5 }); });
      out.innerHTML = 'À chaque pas, on suit la tangente : <b>nouvelle hauteur = hauteur + h × pente</b>, et ici pente = hauteur. Donc y ← y(1 + h).<br>Après n = <b>' + n + '</b> pas, on atteint x = 2 avec <b class="mono">' + r3(y) + '</b>.<br>Valeur exacte e² = <b class="mono">' + r3(Math.E * Math.E) + '</b>. Écart : <b class="mono">' + r3(Math.abs(Math.E * Math.E - y)) + '</b>.';
      var rows = [1, 10, 100, 10000].map(function (m) { return '<tr><td>' + m + '</td><td class="mono">' + r5(Math.pow(1 + 1 / m, m)) + '</td></tr>'; }).join('');
      tbl.innerHTML = '<b>Et pour e ?</b> Avec x = 1 et m pas, on obtient (1 + 1/m)<sup>m</sup> :<table style="margin-top:6px"><thead><tr><th>m</th><th>(1 + 1/m)ᵐ</th></tr></thead><tbody>' + rows + '</tbody></table>Cette suite se rapproche de e ≈ 2,71828.';
    }
  })();

  /* 2. Pente = hauteur */
  (function () {
    var L = Mini.makeLab('lab2', '2. La tangente a la pente eˣ', '(eˣ)′ = eˣ');
    var g = new FX.Graph(L.graph, { xmin: -3, xmax: 3, ymin: -1, ymax: 9, label: 'Courbe exponentielle et tangente mobile' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sl = Mini.slider('p-x', 'Abscisse x =', -3, 2.2, 0.05, 1, function (x) {
      g.clear(); g.curve(Math.exp, BLUE);
      var y = Math.exp(x);
      g.slope(x, y, y, ORANGE, { width: 2.2 }); g.point(x, y, ORANGE); g.line(x, 0, x, y, '#8b96b0', { dashed: true });
      g.label(x, y / 2, 'hauteur ' + r2(y), '#53617a', { dx: 8, dy: 0 });
      out.innerHTML = 'Hauteur de la courbe : <b class="mono">' + r3(y) + '</b><br>Pente de la tangente : <b class="mono">' + r3(y) + '</b><br>Les deux nombres sont égaux : c’est (eˣ)′ = eˣ. Quand x est très négatif, la courbe est presque plate : la pente est petite parce que la hauteur l’est.';
    });
    L.side.appendChild(sl); L.side.appendChild(out);
  })();

  /* 3. k·e^(rx) : croissance et décroissance */
  Mini.paramLab('lab3', {
    title: '3. La famille k·e^(r·x)', sub: 'croissance, décroissance, dérivée', label: 'Courbe de k fois exponentielle de r x',
    params: [{ k: 'k', label: 'Facteur k =', min: -3, max: 3, step: 0.1, val: 1 }, { k: 'r', label: 'Taux r =', min: -2, max: 2, step: 0.1, val: 1 }],
    curves: [{ expr: 'k*e^(r*x)', color: BLUE }, { expr: 'k*r*e^(r*x)', color: PURPLE, dashed: true }],
    win: [-3, 3, -6, 8],
    presets: [{ name: 'Croissance : e^x', vals: { k: 1, r: 1 } }, { name: 'Décroissance : e^(−x)', vals: { k: 1, r: -1 } }, { name: 'Rapide : 0,5·e^(2x)', vals: { k: 0.5, r: 2 } }, { name: 'Négative : −e^(0,5x)', vals: { k: -1, r: 0.5 } }],
    readout: function (v) {
      var dir = v.k === 0 || v.r === 0 ? 'constante' : (v.k * v.r > 0 ? 'croissante' : 'décroissante');
      return 'f(x) = ' + r2(v.k) + '·e^(' + r2(v.r) + 'x)<br>f(0) = <b class="mono">' + r2(v.k) + '</b> (ordonnée à l’origine)<br>f′(x) = k·r·e^(rx) (violet pointillé), f′(0) = <b class="mono">' + r2(v.k * v.r) + '</b><br>La fonction est <b>' + dir + '</b> : le signe de f′ est celui de k·r, car e^(rx) &gt; 0.<br>Le signe de f est celui de k : la courbe ne traverse jamais l’axe des abscisses.';
    }
  });

  /* 4. Résoudre e^(m1 x + n1) = e^(m2 x + n2) */
  Mini.paramLab('lab4', {
    title: '4. Résoudre eᵃ = eᵇ : on compare les exposants', sub: 'équations avec exponentielles', label: 'Deux exponentielles qui se coupent',
    params: [{ k: 'a', label: 'Pente de l’exposant 1 (a) =', min: -2, max: 2, step: 0.5, val: 2 }, { k: 'b', label: 'Constante de l’exposant 1 (b) =', min: -3, max: 3, step: 0.5, val: -1 },
             { k: 'c', label: 'Pente de l’exposant 2 (c) =', min: -2, max: 2, step: 0.5, val: 1 }, { k: 'd', label: 'Constante de l’exposant 2 (d) =', min: -3, max: 3, step: 0.5, val: 3 }],
    curves: [{ expr: 'e^(a*x+b)', color: BLUE }, { expr: 'e^(c*x+d)', color: ORANGE }],
    win: [-4, 6, -1, 12],
    extra: function (g, v) {
      if (v.a !== v.c) { var x = (v.d - v.b) / (v.a - v.c), y = Math.exp(v.a * x + v.b); if (isFinite(y) && Math.abs(y) < 12) { g.point(x, y, PURPLE); g.line(x, 0, x, y, PURPLE, { dashed: true }); } }
    },
    readout: function (v) {
      var eq = 'e^(' + r2(v.a) + 'x + ' + r2(v.b) + ') = e^(' + r2(v.c) + 'x + ' + r2(v.d) + ')';
      if (v.a === v.c) return eq + '<br>Les exposants ont la même pente : l’équation devient ' + r2(v.b) + ' = ' + r2(v.d) + ', ' + (v.b === v.d ? '<b>vraie pour tout x</b> (courbes confondues).' : '<b>jamais vraie</b> (courbes parallèles, sans intersection).');
      var x = (v.d - v.b) / (v.a - v.c);
      return eq + '<br>⇔ ' + r2(v.a) + 'x + ' + r2(v.b) + ' = ' + r2(v.c) + 'x + ' + r2(v.d) + '<br>⇔ x = <b class="mono">' + r3(x) + '</b><br>C’est l’abscisse du point violet où les deux courbes se coupent. L’exponentielle est strictement croissante, donc l’équation se ramène à une équation du premier degré.';
    }
  });

  /* 5. Étudier (x + a)·e^(−x) */
  Mini.paramLab('lab5', {
    title: '5. Étudier f(x) = (x + a)·e⁻ˣ : le signe de f′ commande tout', sub: 'dérivée, factorisation, maximum', label: 'Courbe de x plus a fois exponentielle de moins x',
    params: [{ k: 'a', label: 'Paramètre a =', min: -2, max: 3, step: 0.1, val: 0 }],
    curves: [{ expr: '(x+a)*e^(-x)', color: BLUE }, { expr: '(1-a-x)*e^(-x)', color: PURPLE, dashed: true }],
    win: [-3, 6, -3, 4],
    extra: function (g, v) { var x = 1 - v.a, y = Math.exp(v.a - 1); g.point(x, y, GREEN); g.label(x, y, 'maximum', GREEN); },
    readout: function (v) {
      var x = 1 - v.a, y = Math.exp(v.a - 1);
      return 'f′(x) = e⁻ˣ − (x + a)e⁻ˣ = <b>(1 − a − x)·e⁻ˣ</b> (violet pointillé).<br>Comme e⁻ˣ &gt; 0, f′ a le signe de <b>1 − a − x</b> : positive avant x = ' + r2(x) + ', négative après.<br>f est croissante sur ]−∞ ; ' + r2(x) + '], décroissante ensuite.<br>Maximum : f(' + r2(x) + ') = e^(a−1) = <b class="mono">' + r3(y) + '</b>.<br>Là où la courbe violette coupe l’axe, la bleue change de sens.';
    }
  });

  Mini.exercises(document.getElementById('exos'), window.EXP_EX, 'exponentielle');
  Mini.checklist(document.getElementById('checklist'), 'exponentielle', [
    'Je sais énoncer la définition : f′ = f et f(0) = 1.',
    'Je maîtrise eˣ⁺ʸ, e⁻ˣ, eˣ⁻ʸ, (eˣ)ⁿ, et je sais que eˣ > 0.',
    'Je dérive e^(ax+b), un produit et un quotient avec l’exponentielle.',
    'Je factorise la dérivée par l’exponentielle avant d’étudier son signe.',
    'Je résous eᵃ = eᵇ, eᵃ < eᵇ et les équations qui se factorisent.',
    'Je fais le lien avec les suites géométriques de raison eᵃ.',
    'Je sais refaire la démonstration que eˣ ne s’annule pas.'
  ]);
})();
