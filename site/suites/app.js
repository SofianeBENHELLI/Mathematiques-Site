/* Mini-site Suites : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function big(v) { return Math.abs(v) >= 1e6 ? v.toExponential(2).replace('.', ',') : r2(v); }
  function range(vals, pad) { var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals); if (hi - lo < 1e-9) { lo -= 1; hi += 1; } var p = (hi - lo) * (pad || 0.15); return [lo - p, hi + p]; }
  function plot(g, vals, color, o) {
    o = o || {};
    if (o.link) for (var i = 0; i < vals.length - 1; i++) g.line(i, vals[i], i + 1, vals[i + 1], color, { width: 1.2, dashed: true });
    vals.forEach(function (v, i) { g.point(i, v, color, { r: o.r || 4.5 }); });
  }
  function seqArith(u0, r, N) { var a = []; for (var i = 0; i <= N; i++) a.push(u0 + i * r); return a; }
  function seqGeo(u0, q, N) { var a = []; for (var i = 0; i <= N; i++) a.push(u0 * Math.pow(q, i)); return a; }
  function rec(u0, f, N) { var a = [u0]; for (var i = 0; i < N; i++) a.push(f(a[i], i)); return a; }
  function tableHTML(vals, label) {
    var n = Math.min(vals.length, 9), rows = '<tr><th>n</th>', row2 = '<tr><th>' + label + '</th>';
    for (var i = 0; i < n; i++) { rows += '<td>' + i + '</td>'; row2 += '<td class="mono">' + big(vals[i]) + '</td>'; }
    return '<table style="margin-top:6px"><tbody>' + rows + '</tr>' + row2 + '</tr></tbody></table>';
  }

  /* 1. Générer une suite */
  (function () {
    var L = Mini.makeLab('lab1', '1. Générer une suite', 'explicite ou par récurrence');
    var g = new FX.Graph(L.graph, { xmin: -0.5, xmax: 10.5, ymin: -5, ymax: 20, label: 'Termes de la suite en points' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var P = [
      { name: 'uₙ = n² − 3 (explicite)', kind: 'Explicite : on calcule uₙ directement.', gen: function (N) { var a = []; for (var i = 0; i <= N; i++) a.push(i * i - 3); return a; } },
      { name: 'u₀ = 2, uₙ₊₁ = 3uₙ − 1 (récurrence)', kind: 'Récurrence : chaque terme se calcule à partir du précédent.', gen: function (N) { return rec(2, function (u) { return 3 * u - 1; }, N); } },
      { name: 'u₀ = 20, uₙ₊₁ = 0,5uₙ + 4', kind: 'Récurrence : la suite semble se stabiliser près de 8.', gen: function (N) { return rec(20, function (u) { return 0.5 * u + 4; }, N); } },
      { name: 'uₙ = (−1)ⁿ × n', kind: 'Explicite : les signes alternent, pas de limite.', gen: function (N) { var a = []; for (var i = 0; i <= N; i++) a.push((i % 2 ? -1 : 1) * i); return a; } },
      { name: 'u₀ = 1, uₙ₊₁ = uₙ + n + 1', kind: 'Récurrence : on ajoute n + 1 : ce sont les nombres triangulaires.', gen: function (N) { return rec(1, function (u, i) { return u + i + 2; }, N); } }
    ];
    var idx = 0, N = 8;
    function draw() {
      var v = P[idx].gen(N), rg = range(v);
      g.view(-0.5, N + 0.5, rg[0], rg[1]); g.clear(); plot(g, v, BLUE, { link: true });
      out.innerHTML = '<b>' + P[idx].kind + '</b>' + tableHTML(v, 'uₙ');
    }
    L.side.appendChild(Mini.select('s1-p', 'Suite', P.map(function (p) { return p.name; }), function (i) { idx = i; draw(); }));
    L.side.appendChild(Mini.slider('s1-n', 'Jusqu’au rang N =', 4, 15, 1, 8, function (v) { N = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 2. Arithmétique contre géométrique */
  (function () {
    var L = Mini.makeLab('lab2', '2. Arithmétique contre géométrique', 'additionner ou multiplier');
    var g = new FX.Graph(L.graph, { xmin: -0.5, xmax: 10.5, ymin: -5, ymax: 30, label: 'Une suite arithmétique et une suite géométrique' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { u0: 2, r: 3, q: 1.4, N: 10 };
    function draw() {
      var a = seqArith(s.u0, s.r, s.N), b = seqGeo(s.u0, s.q, s.N), rg = range(a.concat(b));
      g.view(-0.5, s.N + 0.5, rg[0], rg[1]); g.clear(); plot(g, a, BLUE, { link: true }); plot(g, b, ORANGE, { link: true });
      var first = null; for (var i = 1; i <= s.N; i++) if (b[i] > a[i] && s.q > 1) { first = i; break; }
      out.innerHTML = '<span style="color:' + BLUE + '">Arithmétique : uₙ = ' + r2(s.u0) + ' + ' + r2(s.r) + 'n</span> (points alignés)<br><span style="color:' + ORANGE + '">Géométrique : vₙ = ' + r2(s.u0) + ' × ' + r2(s.q) + 'ⁿ</span> (courbe)<br>Au rang ' + s.N + ' : uₙ = <b class="mono">' + big(a[s.N]) + '</b> et vₙ = <b class="mono">' + big(b[s.N]) + '</b>.<br>' +
        (first ? 'La géométrique dépasse l’arithmétique à partir du rang <b>' + first + '</b> : multiplier finit toujours par l’emporter sur additionner (si q &gt; 1).' : (s.q > 1 ? 'Sur cette fenêtre, la géométrique ne dépasse pas encore l’arithmétique : augmente N.' : 'Avec q ≤ 1 la géométrique ne grandit pas : elle ne dépasse pas la croissance linéaire.'));
    }
    L.side.appendChild(Mini.slider('s2-u', 'Premier terme u₀ =', -5, 10, 1, 2, function (v) { s.u0 = v; draw(); }));
    L.side.appendChild(Mini.slider('s2-r', 'Raison r (arithmétique) =', -5, 5, 0.5, 3, function (v) { s.r = v; draw(); }));
    L.side.appendChild(Mini.slider('s2-q', 'Raison q (géométrique) =', -1.5, 2, 0.1, 1.4, function (v) { s.q = v; draw(); }));
    L.side.appendChild(Mini.slider('s2-n', 'Jusqu’au rang N =', 5, 20, 1, 10, function (v) { s.N = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 3. Sommes */
  (function () {
    var L = Mini.makeLab('lab3', '3. Les sommes : la preuve en barres', '1 + 2 + … + n et 1 + q + … + qⁿ');
    var g = new FX.Graph(L.graph, { xmin: -0.5, xmax: 12, ymin: 0, ymax: 14, label: 'Barres des termes de la somme' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var kind = 0, n = 6, q = 2;
    function draw() {
      var terms = [], i;
      if (kind === 0) for (i = 1; i <= n; i++) terms.push(i); else for (i = 0; i <= n; i++) terms.push(Math.pow(q, i));
      var top = Math.max.apply(null, terms) * 1.15;
      g.view(-0.5, terms.length + 0.5, 0, top); g.clear();
      terms.forEach(function (t, k) { g.rect(k + 0.1, k + 0.9, 0, t, kind === 0 ? BLUE : ORANGE, { opacity: 0.35 }); });
      var S = terms.reduce(function (a, b) { return a + b; }, 0), formula;
      if (kind === 0) {
        formula = n + ' × ' + (n + 1) + ' / 2 = <b class="mono">' + (n * (n + 1) / 2) + '</b>';
        out.innerHTML = '1 + 2 + … + ' + n + ' = <b class="mono">' + S + '</b> (somme des barres).<br>Formule : ' + formula + '<br><b>Idée de Gauss :</b> chaque barre k s’associe à la barre n + 1 − k, et chaque paire vaut n + 1. Il y a n barres donc 2S = n(n + 1).';
      } else {
        var f = Math.abs(q - 1) < 1e-9 ? n + 1 : (1 - Math.pow(q, n + 1)) / (1 - q);
        out.innerHTML = '1 + q + … + qⁿ avec q = ' + r2(q) + ' et n = ' + n + ' (' + (n + 1) + ' termes)<br>Somme des barres : <b class="mono">' + big(S) + '</b><br>Formule (1 − qⁿ⁺¹)/(1 − q) = <b class="mono">' + big(f) + '</b>' + (Math.abs(q - 1) < 1e-9 ? ' (cas q = 1 : la formule ne s’applique pas, la somme vaut n + 1)' : '') + '<br><b>Idée :</b> qS − S = qⁿ⁺¹ − 1, car tout se simplifie sauf les extrémités.';
      }
    }
    var sel = Mini.select('s3-k', 'Somme', ['Arithmétique : 1 + 2 + … + n', 'Géométrique : 1 + q + … + qⁿ'], function (i) { kind = i; draw(); });
    L.side.appendChild(sel);
    L.side.appendChild(Mini.slider('s3-n', 'n =', 2, 12, 1, 6, function (v) { n = v; draw(); }));
    L.side.appendChild(Mini.slider('s3-q', 'Raison q (géométrique) =', 0.5, 2, 0.1, 2, function (v) { q = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 4. Variations : le signe de uₙ₊₁ − uₙ */
  (function () {
    var L = Mini.makeLab('lab4', '4. Variations : étudier uₙ₊₁ − uₙ', 'la différence commande');
    var g = new FX.Graph(L.graph, { xmin: -0.5, xmax: 10.5, ymin: -10, ymax: 20, label: 'Termes de la suite et leurs différences' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var P = [
      { name: 'uₙ = n² − 6n', f: function (n) { return n * n - 6 * n; }, d: '2n − 5' },
      { name: 'uₙ = 10 − 2n', f: function (n) { return 10 - 2 * n; }, d: '−2 (constante : arithmétique)' },
      { name: 'uₙ = 100 / (n + 1)', f: function (n) { return 100 / (n + 1); }, d: '−100/((n+1)(n+2)), toujours négatif' },
      { name: 'uₙ = (−2)ⁿ', f: function (n) { return Math.pow(-2, n); }, d: '(−2)ⁿ × (−3), signe alterné' },
      { name: 'uₙ = 0,8ⁿ × 20', f: function (n) { return 20 * Math.pow(0.8, n); }, d: '20·0,8ⁿ × (−0,2), toujours négatif' }
    ];
    var idx = 0, N = 10;
    function draw() {
      var p = P[idx], u = [], d = [], i;
      for (i = 0; i <= N; i++) u.push(p.f(i)); for (i = 0; i < N; i++) d.push(u[i + 1] - u[i]);
      var rg = range(u.concat(d).concat([0]));
      g.view(-0.5, N + 0.5, rg[0], rg[1]); g.clear(); g.line(-0.5, 0, N + 0.5, 0, GREY, { dashed: true });
      plot(g, u, BLUE, { link: true }); d.forEach(function (v, k) { g.point(k, v, PURPLE, { r: 3.5, open: true }); });
      var pos = d.every(function (x) { return x >= -1e-9; }), neg = d.every(function (x) { return x <= 1e-9; });
      out.innerHTML = '<span style="color:' + BLUE + '">● uₙ</span> &nbsp; <span style="color:' + PURPLE + '">○ uₙ₊₁ − uₙ</span><br>uₙ₊₁ − uₙ = <b>' + p.d + '</b><br>Sur les ' + (N + 1) + ' premiers rangs : ' + (pos && neg ? '<b>constante nulle</b>' : pos ? '<b>croissante</b> (différences ≥ 0)' : neg ? '<b>décroissante</b> (différences ≤ 0)' : '<b>pas monotone</b> : les différences changent de signe') + '.<br>Les points violets au-dessus de 0 correspondent aux rangs où la suite monte.';
    }
    L.side.appendChild(Mini.select('s4-p', 'Suite', P.map(function (p) { return p.name; }), function (i) { idx = i; draw(); }));
    L.side.appendChild(Mini.slider('s4-n', 'Jusqu’au rang N =', 5, 15, 1, 10, function (v) { N = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 5. Seuil et Python */
  (function () {
    var L = Mini.makeLab('lab5', '5. Seuil : premier rang qui dépasse S', 'boucle while');
    var g = new FX.Graph(L.graph, { xmin: -0.5, xmax: 20.5, ymin: 0, ymax: 100, label: 'Suite géométrique et seuil' });
    var out = h('<div class="readout" aria-live="polite"></div>'), code = h('<pre class="code" style="background:#f1f4fb;color:#20283d;padding:10px;border-radius:8px;overflow:auto;font-size:13px"></pre>');
    var s = { u0: 5, q: 1.3, S: 60 };
    function draw() {
      var n = 0, u = s.u0, guard = 0;
      while (u <= s.S && guard < 500) { u = u * s.q; n++; guard++; }
      var found = guard < 500 && s.q > 1 && s.u0 > 0;
      var N = Math.max(8, Math.min(40, (found ? n + 4 : 20))), vals = seqGeo(s.u0, s.q, N), rg = range(vals.concat([s.S]));
      g.view(-0.5, N + 0.5, Math.min(0, rg[0]), rg[1]); g.clear(); g.line(-0.5, s.S, N + 0.5, s.S, PURPLE, { width: 2 });
      plot(g, vals, BLUE, { link: true }); if (found) g.point(n, vals[n], GREEN, { r: 7 });
      code.textContent = 'u = ' + r2(s.u0) + '\nn = 0\nwhile u <= ' + r2(s.S) + ':\n    u = ' + r2(s.q) + ' * u\n    n = n + 1\nprint(n)   # affiche ' + (found ? n : '(boucle infinie)');
      out.innerHTML = found ? 'Premier rang avec uₙ &gt; ' + r2(s.S) + ' : <b class="mono">n = ' + n + '</b> (u<sub>' + n + '</sub> ≈ ' + r2(u) + ', alors que u<sub>' + (n - 1) + '</sub> ≈ ' + r2(u / s.q) + ' ≤ ' + r2(s.S) + ').<br>Comme la suite est croissante, uₙ &gt; S pour tout rang ≥ ' + n + '.' : (s.u0 <= 0 || s.q <= 1 ? '<b>Le seuil n’est jamais dépassé</b> : il faut u₀ &gt; 0 et q &gt; 1. Attention : sans cette condition, la boucle while ne s’arrête jamais.' : 'Seuil déjà dépassé dès le rang 0.');
      if (s.u0 > s.S) out.innerHTML = 'Le seuil est déjà dépassé au rang 0 : n = 0.';
    }
    L.side.appendChild(Mini.slider('s5-u', 'Premier terme u₀ =', 1, 20, 1, 5, function (v) { s.u0 = v; draw(); }));
    L.side.appendChild(Mini.slider('s5-q', 'Raison q =', 1.05, 2, 0.05, 1.3, function (v) { s.q = v; draw(); }));
    L.side.appendChild(Mini.slider('s5-s', 'Seuil S =', 20, 200, 5, 60, function (v) { s.S = v; draw(); }));
    L.side.appendChild(code); L.side.appendChild(out); draw();
  })();

  /* 6. Modéliser : un taux constant */
  (function () {
    var L = Mini.makeLab('lab6', '6. Modéliser un taux constant', 'capital, population, baisse');
    var g = new FX.Graph(L.graph, { xmin: -0.5, xmax: 20.5, ymin: 0, ymax: 3000, label: 'Évolution à taux constant' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { c: 1000, t: 5, N: 15 };
    function draw() {
      var q = 1 + s.t / 100, v = seqGeo(s.c, q, s.N), rg = range(v.concat([0]), 0.1);
      g.view(-0.5, s.N + 0.5, Math.max(0, rg[0]), rg[1]); g.clear(); plot(g, v, BLUE, { link: true });
      var dbl = null, half = null; for (var i = 1; i <= 400; i++) { var x = s.c * Math.pow(q, i); if (!dbl && x >= 2 * s.c) dbl = i; if (!half && x <= s.c / 2) half = i; }
      var lin = s.c * (1 + s.t / 100 * s.N);
      out.innerHTML = 'Taux ' + (s.t >= 0 ? '+' : '') + s.t + ' % par période : coefficient <b class="mono">q = ' + r3(q) + '</b>.<br>Après ' + s.N + ' périodes : <b class="mono">' + r2(v[s.N]) + '</b> (variation totale ' + r2((v[s.N] / s.c - 1) * 100) + ' %).<br>' + (dbl ? 'Le capital double au bout de <b>' + dbl + '</b> périodes.' : '') + (half ? 'Il est divisé par 2 au bout de <b>' + half + '</b> périodes.' : '') + '<br>Piège : ' + s.N + ' hausses de ' + s.t + ' % ne font pas ' + r2(s.t * s.N) + ' % (ce serait ' + r2(lin) + ') mais bien plus quand t &gt; 0 : les intérêts rapportent des intérêts.';
    }
    L.side.appendChild(Mini.slider('s6-c', 'Valeur initiale =', 100, 2000, 100, 1000, function (v) { s.c = v; draw(); }));
    L.side.appendChild(Mini.slider('s6-t', 'Taux par période (%) =', -20, 20, 1, 5, function (v) { s.t = v; draw(); }));
    L.side.appendChild(Mini.slider('s6-n', 'Nombre de périodes N =', 5, 30, 1, 15, function (v) { s.N = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  Mini.exercises(document.getElementById('exos'), window.SUI_EX, 'suites');
  Mini.checklist(document.getElementById('checklist'), 'suites', [
    'Je calcule des termes d’une suite explicite et d’une suite récurrente.',
    'Je reconnais une suite arithmétique (différence constante) ou géométrique (quotient constant).',
    'Je donne uₙ en fonction de u₀ ou de uₚ.',
    'Je connais et sais démontrer 1 + 2 + … + n et la somme géométrique.',
    'Je compte correctement le nombre de termes d’une somme.',
    'J’étudie le signe de uₙ₊₁ − uₙ pour trouver les variations.',
    'J’écris et lis une boucle while pour un seuil.',
    'Je traduis « +t % » en coefficient 1 + t/100 et j’enchaîne les évolutions.'
  ]);
})();
