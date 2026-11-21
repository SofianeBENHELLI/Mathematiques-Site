/* Mini-site Variables aléatoires : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function comb(n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
  function binom(n, p) { var a = []; for (var k = 0; k <= n; k++) a.push(comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)); return a; }
  function stats(xs, ps) { var E = 0, E2 = 0; xs.forEach(function (x, i) { E += x * ps[i]; E2 += x * x * ps[i]; }); var V = E2 - E * E; return { E: E, V: Math.max(0, V), S: Math.sqrt(Math.max(0, V)) }; }
  function bars(g, xs, ps, color, off) { xs.forEach(function (x, i) { g.rect(x - 0.35 + (off || 0), x + 0.35 + (off || 0), 0, ps[i], color, { opacity: 0.4 }); g.line(x - 0.35 + (off || 0), ps[i], x + 0.35 + (off || 0), ps[i], color, { width: 2.4 }); }); }

  /* 1. Loi, espérance, variance */
  (function () {
    var L = Mini.makeLab('lab1', '1. Une loi et ses indicateurs', 'espérance, variance, écart type');
    var g = new FX.Graph(L.graph, { xmin: -0.8, xmax: 3.8, ymin: 0, ymax: 1, label: 'Diagramme en barres de la loi de X' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { p0: 0.3, p1: 0.5, p2: 0.2 };
    function draw() {
      var p2 = Math.min(s.p2, Math.max(0, 1 - s.p0 - s.p1)), p3 = Math.max(0, Math.round((1 - s.p0 - s.p1 - p2) * 100) / 100), ps = [s.p0, s.p1, p2, p3], xs = [0, 1, 2, 3], st = stats(xs, ps);
      var total = ps.reduce(function (a, b) { return a + b; }, 0);
      g.clear(); bars(g, xs, ps, BLUE); g.line(st.E, 0, st.E, 1, ORANGE, { dashed: true, width: 2 }); g.point(st.E, 0, ORANGE, { r: 6 });
      out.innerHTML = 'Loi : P(0) = ' + r2(ps[0]) + ', P(1) = ' + r2(ps[1]) + ', P(2) = ' + r2(ps[2]) + ', P(3) = <b>' + r2(p3) + '</b> (complète à 1)<br>Somme : ' + r2(total) + (Math.abs(total - 1) < 1e-9 ? ' ✓' : ' ✗') + '<br>E(X) = <b class="mono">' + r3(st.E) + '</b> (trait orange, point d’équilibre)<br>V(X) = E(X²) − E(X)² = <b class="mono">' + r3(st.V) + '</b><br>σ(X) = <b class="mono">' + r3(st.S) + '</b><br>Plus les barres sont éloignées de la moyenne, plus V est grande.';
    }
    L.side.appendChild(Mini.slider('va1-0', 'P(X = 0) =', 0, 1, 0.05, 0.3, function (v) { s.p0 = Math.round(v * 100) / 100; draw(); }));
    L.side.appendChild(Mini.slider('va1-1', 'P(X = 1) =', 0, 1, 0.05, 0.5, function (v) { s.p1 = Math.round(v * 100) / 100; draw(); }));
    L.side.appendChild(Mini.slider('va1-2', 'P(X = 2) =', 0, 1, 0.05, 0.2, function (v) { s.p2 = Math.round(v * 100) / 100; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 2. Transformation affine aX + b */
  (function () {
    var L = Mini.makeLab('lab2', '2. Que devient la loi de aX + b ?', 'déplacer et étirer');
    var g = new FX.Graph(L.graph, { xmin: -8, xmax: 12, ymin: 0, ymax: 0.6, label: 'Loi de X en bleu et de aX + b en orange' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var X = [0, 1, 2, 3], P = [0.2, 0.4, 0.3, 0.1], s = { a: 2, b: 1 };
    function draw() {
      var Y = X.map(function (x) { return s.a * x + s.b; }), sx = stats(X, P), sy = stats(Y, P);
      g.clear(); bars(g, X, P, BLUE); Y.forEach(function (y, i) { g.rect(y - 0.3, y + 0.3, 0, P[i], ORANGE, { opacity: 0.4 }); g.line(y - 0.3, P[i], y + 0.3, P[i], ORANGE, { width: 2.4 }); });
      g.point(sx.E, 0, BLUE, { r: 6 }); g.point(sy.E, 0, ORANGE, { r: 6 });
      out.innerHTML = 'X : E(X) = <b class="mono">' + r2(sx.E) + '</b>, V(X) = <b class="mono">' + r3(sx.V) + '</b><br>Y = ' + s.a + 'X + ' + s.b + ' : valeurs ' + Y.map(r2).join(' ; ') + '<br>E(Y) = ' + s.a + '×' + r2(sx.E) + ' + ' + s.b + ' = <b class="mono">' + r3(sy.E) + '</b> (contrôle : ' + r3(s.a * sx.E + s.b) + ')<br>V(Y) = ' + s.a + '² × ' + r3(sx.V) + ' = <b class="mono">' + r3(sy.V) + '</b> (contrôle : ' + r3(s.a * s.a * sx.V) + ')<br>Ajouter b décale tout ; multiplier par a étire d’un facteur |a| (dispersion × a²).';
    }
    L.side.appendChild(Mini.slider('va2-a', 'a =', -3, 3, 1, 2, function (v) { s.a = v; draw(); }));
    L.side.appendChild(Mini.slider('va2-b', 'b =', -4, 6, 1, 1, function (v) { s.b = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 3. Loi binomiale */
  (function () {
    var L = Mini.makeLab('lab3', '3. La loi binomiale B(n ; p)', 'nombre de succès sur n épreuves');
    var g = new FX.Graph(L.graph, { xmin: -1, xmax: 11, ymin: 0, ymax: 0.5, label: 'Diagramme de la loi binomiale' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { n: 4, p: 0.5, k: 2 };
    function draw() {
      var ps = binom(s.n, s.p), xs = ps.map(function (_, i) { return i; }), k = Math.min(s.k, s.n), mx = Math.max.apply(null, ps) * 1.2;
      g.view(-1, s.n + 1, 0, Math.max(0.2, mx)); g.clear(); bars(g, xs, ps, BLUE);
      g.rect(k - 0.35, k + 0.35, 0, ps[k], ORANGE, { opacity: 0.5 });
      var st = stats(xs, ps);
      out.innerHTML = 'X ~ B(' + s.n + ' ; ' + s.p + ')<br>P(X = ' + k + ') = C(' + s.n + ',' + k + ') × ' + s.p + '<sup>' + k + '</sup> × ' + r2(1 - s.p) + '<sup>' + (s.n - k) + '</sup> = ' + comb(s.n, k) + ' × ' + r3(Math.pow(s.p, k)) + ' × ' + r3(Math.pow(1 - s.p, s.n - k)) + ' = <b class="mono">' + r3(ps[k]) + '</b> (barre orange)<br>P(X ≥ 1) = 1 − (1 − p)ⁿ = <b class="mono">' + r3(1 - Math.pow(1 - s.p, s.n)) + '</b><br>E(X) = np = <b class="mono">' + r3(s.n * s.p) + '</b> et V(X) = np(1 − p) = <b class="mono">' + r3(s.n * s.p * (1 - s.p)) + '</b> (contrôle par la loi : ' + r3(st.E) + ' et ' + r3(st.V) + ')';
    }
    L.side.appendChild(Mini.slider('va3-n', 'Nombre d’épreuves n =', 1, 10, 1, 4, function (v) { s.n = v; draw(); }));
    L.side.appendChild(Mini.slider('va3-p', 'Probabilité de succès p =', 0.1, 0.9, 0.05, 0.5, function (v) { s.p = Math.round(v * 100) / 100; draw(); }));
    L.side.appendChild(Mini.slider('va3-k', 'k (barre orange) =', 0, 10, 1, 2, function (v) { s.k = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 4. Simulation */
  (function () {
    var L = Mini.makeLab('lab4', '4. Simuler pour constater', 'fréquences observées contre loi théorique');
    var g = new FX.Graph(L.graph, { xmin: -1, xmax: 6, ymin: 0, ymax: 0.5, label: 'Fréquences simulées et loi binomiale' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { n: 5, p: 0.4, N: 100 }, counts = null, total = 0;
    var btn = h('<button type="button" class="btn" style="margin:6px 0;min-height:44px;padding:8px 16px;border-radius:8px;border:1px solid #b9c6f5;background:#e7edff;color:#294bd3;font-weight:600;cursor:pointer">▶ Lancer la simulation</button>');
    var reset = h('<button type="button" class="btn" style="margin:6px 0 6px 8px;min-height:44px;padding:8px 16px;border-radius:8px;border:1px solid #d5dbe8;background:#fff;color:#53617a;font-weight:600;cursor:pointer">↺ Effacer</button>');
    function draw() {
      var ps = binom(s.n, s.p), xs = ps.map(function (_, i) { return i; });
      g.view(-1, s.n + 1, 0, Math.max(0.3, Math.max.apply(null, ps) * 1.4)); g.clear(); bars(g, xs, ps, BLUE, -0.15);
      var txt = 'Loi théorique B(' + s.n + ' ; ' + s.p + ') en bleu.';
      if (counts && total) {
        var fr = xs.map(function (_, i) { return (counts[i] || 0) / total; }); xs.forEach(function (x, i) { g.rect(x - 0.05, x + 0.35, 0, fr[i], ORANGE, { opacity: 0.45 }); });
        var m = 0; fr.forEach(function (f, i) { m += f * i; });
        txt += '<br>Fréquences observées sur <b>' + total + '</b> expériences en orange.<br>Moyenne observée : <b class="mono">' + r3(m) + '</b> pour E(X) = np = <b class="mono">' + r3(s.n * s.p) + '</b>.<br>Plus on simule, plus les barres orange se rapprochent des bleues.';
      } else txt += '<br>Appuie sur le bouton : chaque expérience répète ' + s.n + ' épreuves et compte les succès.';
      out.innerHTML = txt;
    }
    function run() {
      if (!counts) counts = [];
      for (var e = 0; e < s.N; e++) { var k = 0; for (var i = 0; i < s.n; i++) if (Math.random() < s.p) k++; counts[k] = (counts[k] || 0) + 1; total++; }
      draw();
    }
    btn.addEventListener('click', run); reset.addEventListener('click', function () { counts = null; total = 0; draw(); });
    L.side.appendChild(Mini.slider('va4-n', 'Épreuves par expérience n =', 1, 8, 1, 5, function (v) { s.n = v; counts = null; total = 0; draw(); }));
    L.side.appendChild(Mini.slider('va4-p', 'Probabilité de succès p =', 0.1, 0.9, 0.1, 0.4, function (v) { s.p = Math.round(v * 10) / 10; counts = null; total = 0; draw(); }));
    L.side.appendChild(Mini.slider('va4-N', 'Expériences par clic =', 10, 1000, 10, 100, function (v) { s.N = v; }));
    var row = h('<div></div>'); row.appendChild(btn); row.appendChild(reset); L.side.appendChild(row);
    L.side.appendChild(out); draw();
  })();

  Mini.exercises(document.getElementById('exos'), window.VAR_EX, 'variables-aleatoires');
  Mini.checklist(document.getElementById('checklist'), 'variables-aleatoires', [
    'Je complète une loi avec Σpᵢ = 1.',
    'Je calcule E(X), V(X) et σ(X) à partir d’un tableau.',
    'J’applique E(aX + b) = aE(X) + b et V(aX + b) = a²V(X).',
    'J’utilise V(X) = E(X²) − E(X)² et je sais la démontrer.',
    'Je reconnais un schéma de Bernoulli (épreuves identiques et indépendantes).',
    'Je calcule P(X = k) pour B(n ; p) et P(X ≥ 1) par le contraire.',
    'Je donne E(X) = np et V(X) = np(1 − p).',
    'J’interprète un jeu équitable, favorable ou défavorable avec l’espérance.'
  ]);
})();
