/* Mini-site Python : tableaux de suivi, dichotomie, simulation. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt, esc = Mini.esc;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function num(v) { return typeof v === 'number' ? fmt(Math.round(v * 1e6) / 1e6) : String(v); }

  /* 1. Tableau de suivi : on exécute à la main, ligne par ligne */
  var PROGS = [
    { name: 'Somme 1 + 2 + … + n', param: { id: 'n', label: 'n =', min: 2, max: 8, val: 4 },
      code: ['s = 0', 'for i in range(1, n + 1):', '    s = s + i', 'print(s)'],
      run: function (n) { var st = [], s = 0; st.push({ l: 0, v: { s: 0 } }); for (var i = 1; i <= n; i++) { st.push({ l: 1, v: { i: i, s: s } }); s += i; st.push({ l: 2, v: { i: i, s: s } }); } st.push({ l: 3, v: { i: n, s: s }, out: s }); return st; } },
    { name: 'Suite u₀ = 2, uₙ₊₁ = 3uₙ − 1', param: { id: 'n', label: 'Nombre de tours =', min: 1, max: 6, val: 3 },
      code: ['u = 2', 'for _ in range(n):', '    u = 3 * u - 1', 'print(u)'],
      run: function (n) { var st = [], u = 2; st.push({ l: 0, v: { u: 2 } }); for (var k = 1; k <= n; k++) { st.push({ l: 1, v: { tour: k, u: u } }); u = 3 * u - 1; st.push({ l: 2, v: { tour: k, u: u } }); } st.push({ l: 3, v: { u: u }, out: u }); return st; } },
    { name: 'Seuil : tant que u > S', param: { id: 'S', label: 'Seuil S =', min: 20, max: 90, val: 50, step: 10 },
      code: ['u = 100', 'n = 0', 'while u > S:', '    u = 0.9 * u', '    n = n + 1', 'print(n)'],
      run: function (S) { var st = [], u = 100, n = 0, g = 0; st.push({ l: 0, v: { u: u } }); st.push({ l: 1, v: { u: u, n: n } }); while (g++ < 60) { st.push({ l: 2, v: { u: u, n: n }, test: u + ' > ' + S + ' ? ' + (u > S ? 'vrai' : 'faux') }); if (!(u > S)) break; u = 0.9 * u; st.push({ l: 3, v: { u: u, n: n } }); n++; st.push({ l: 4, v: { u: u, n: n } }); } st.push({ l: 5, v: { u: u, n: n }, out: n }); return st; } },
    { name: 'Si pair, moitié ; sinon 3x + 1', param: { id: 'x', label: 'x de départ =', min: 1, max: 12, val: 7 },
      code: ['if x % 2 == 0:', '    y = x // 2', 'else:', '    y = 3 * x + 1', 'print(y)'],
      run: function (x) { var st = [], y; st.push({ l: 0, v: { x: x }, test: x + ' % 2 == 0 ? ' + (x % 2 === 0 ? 'vrai' : 'faux') }); if (x % 2 === 0) { y = x / 2; st.push({ l: 1, v: { x: x, y: y } }); } else { y = 3 * x + 1; st.push({ l: 3, v: { x: x, y: y } }); } st.push({ l: 4, v: { x: x, y: y }, out: y }); return st; } }
  ];
  (function () {
    var L = Mini.makeLab('lab1', '1. Le tableau de suivi', 'exécuter un programme à la main');
    L.graph.style.minHeight = '0';
    var codeBox = h('<pre style="background:#f1f4fb;color:#20283d;padding:12px;border-radius:8px;overflow:auto;font-size:15px;line-height:1.7;margin:0 0 10px"></pre>');
    var tbl = h('<div style="overflow:auto"></div>');
    var gdiv = h('<div></div>');
    L.graph.appendChild(codeBox); L.graph.appendChild(tbl); L.graph.appendChild(gdiv);
    var g1 = new FX.Graph(gdiv, { xmin: 0, xmax: 10, ymin: 0, ymax: 10, height: 220, label: 'Valeur de la variable principale à chaque étape du programme' });
    function mainVar(s) { var ks = ['s', 'u', 'y', 'x']; for (var i = 0; i < ks.length; i++) if (s.v[ks[i]] !== undefined) return s.v[ks[i]]; return 0; }
    function plot() {
      var vs = steps.map(mainVar), hi = Math.max.apply(null, vs), lo = Math.min.apply(null, vs);
      var pad = (hi - lo) * 0.15 || 1;
      g1.view(-0.5, steps.length, Math.min(0, lo - pad), hi + pad); g1.clear();
      for (var i = 0; i < steps.length; i++) { if (i > 0) g1.line(i - 1, vs[i - 1], i, vs[i], BLUE, { width: 1.5 }); g1.point(i, vs[i], i === k ? ORANGE : (i < k ? BLUE : GREY), { r: i === k ? 6 : 4 }); }
    }
    var out = h('<div class="readout" aria-live="polite"></div>');
    var idx = 0, val = PROGS[0].param.val, k = 0, steps = [];
    function build() { steps = PROGS[idx].run(val); if (k > steps.length - 1) k = steps.length - 1; render(); }
    function render() {
      var P = PROGS[idx], st = steps[k];
      codeBox.innerHTML = P.code.map(function (ln, i) { var line = esc(ln).replace(new RegExp('\\b' + P.param.id + '\\b'), '<b style="color:' + ORANGE + '">' + val + '</b>'); return '<div style="' + (i === st.l ? 'background:#fff3c4;border-left:4px solid ' + ORANGE + ';padding-left:6px' : 'padding-left:10px') + '">' + (i + 1) + '&nbsp;&nbsp;' + line + '</div>'; }).join('');
      var names = []; steps.slice(0, k + 1).forEach(function (s) { Object.keys(s.v).forEach(function (n) { if (names.indexOf(n) < 0) names.push(n); }); });
      var rows = steps.slice(0, k + 1).map(function (s, i) { return '<tr' + (i === k ? ' style="background:#fff3c4"' : '') + '><td>' + (i + 1) + '</td><td class="mono">ligne ' + (s.l + 1) + '</td>' + names.map(function (n) { return '<td class="mono">' + (s.v[n] === undefined ? '' : num(s.v[n])) + '</td>'; }).join('') + '</tr>'; }).join('');
      tbl.innerHTML = '<table><thead><tr><th>Étape</th><th>Ligne</th>' + names.map(function (n) { return '<th>' + n + '</th>'; }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table>';
      plot();
      out.innerHTML = 'Étape <b>' + (k + 1) + '</b> sur ' + steps.length + ' : ligne ' + (st.l + 1) + (st.test ? ' → test : <b>' + st.test + '</b>' : '') + '<br>' + (st.out !== undefined ? 'Le programme affiche : <b class="mono" style="font-size:1.15em">' + num(st.out) + '</b>' : 'Les valeurs des variables après cette ligne sont dans la dernière ligne du tableau.') + '<br>Fais avancer le curseur d’étape : avant de le faire, prévois la valeur des variables.';
    }
    var sel = Mini.select('py1-p', 'Programme', PROGS.map(function (p) { return p.name; }), function (i) { idx = i; var P = PROGS[i].param; val = P.val; k = 0; paramSl = rebuildSlider(); build(); });
    var holder = h('<div></div>'), stepSl, paramSl;
    function rebuildSlider() { holder.innerHTML = ''; var P = PROGS[idx].param, sl = Mini.slider('py1-v', P.label, P.min, P.max, P.step || 1, val, function (v) { val = v; k = 0; build(); stepSl.set(0); }); holder.appendChild(sl); return sl; }
    L.side.appendChild(sel); L.side.appendChild(holder);
    stepSl = Mini.slider('py1-k', 'Étape (curseur) =', 0, 30, 1, 0, function (v) { k = Math.min(v, steps.length - 1); render(); });
    L.side.appendChild(stepSl); L.side.appendChild(out);
    paramSl = rebuildSlider(); build();
  })();

  /* 2. Dichotomie */
  (function () {
    var L = Mini.makeLab('lab2', '2. Dichotomie : encadrer √2', 'x² − 2 = 0 sur [1 ; 2]');
    var g = new FX.Graph(L.graph, { xmin: 0.9, xmax: 2.1, ymin: -1.2, ymax: 2.2, label: 'Dichotomie sur la courbe de x au carré moins 2' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    function f(x) { return x * x - 2; }
    function draw(k) {
      var a = 1, b = 2, rows = [];
      for (var i = 0; i < k; i++) { var m = (a + b) / 2; rows.push(m); if (f(a) * f(m) <= 0) b = m; else a = m; }
      g.clear(); g.curve(f, BLUE); g.line(0.9, 0, 2.1, 0, GREY, { width: 1 });
      g.rect(a, b, -0.08, 0.08, GREEN, { opacity: 0.7 }); g.point(a, 0, GREEN, { r: 5 }); g.point(b, 0, GREEN, { r: 5 });
      var m2 = (a + b) / 2; g.point(m2, f(m2), ORANGE, { r: 6 }); g.line(m2, 0, m2, f(m2), ORANGE, { dashed: true });
      out.innerHTML = 'Après <b>' + k + '</b> tour(s) : a = <b class="mono">' + r3(a) + '</b>, b = <b class="mono">' + r3(b) + '</b><br>Largeur b − a = 1/2<sup>' + k + '</sup> = <b class="mono">' + r3(b - a) + '</b><br>f(a) = ' + r3(f(a)) + ' (négatif), f(b) = ' + r3(f(b)) + ' (positif) : √2 est entre a et b (bande verte).<br>Prochain milieu m = ' + r3(m2) + ', f(m) = ' + r3(f(m2)) + ' : on garde ' + (f(a) * f(m2) <= 0 ? 'la moitié gauche [a ; m]' : 'la moitié droite [m ; b]') + '.<br>Pour une précision de 0,001 il faut ' + Math.ceil(Math.log(1 / 0.001) / Math.log(2)) + ' tours (2<sup>10</sup> = 1024 &gt; 1000).';
    }
    L.side.appendChild(Mini.slider('py2-k', 'Nombre de tours =', 0, 10, 1, 1, draw)); L.side.appendChild(out); draw(1);
  })();

  /* 3. Simulation */
  (function () {
    var L = Mini.makeLab('lab3', '3. Simulation : la fréquence se stabilise', 'deux dés, somme égale à 7');
    var g = new FX.Graph(L.graph, { xmin: 0, xmax: 500, ymin: 0, ymax: 0.5, label: 'Fréquence de la somme 7 en fonction du nombre de lancers' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var N = 500;
    var btn = h('<button type="button" style="margin:6px 0;min-height:44px;padding:8px 16px;border-radius:8px;border:1px solid #b9c6f5;background:#e7edff;color:#294bd3;font-weight:600;cursor:pointer">▶ Simuler</button>');
    function run() {
      var hits = 0, prev = null, freqs = [];
      g.view(0, N, 0, 0.5); g.clear(); g.line(0, 1 / 6, N, 1 / 6, ORANGE, { dashed: true, width: 2 });
      for (var i = 1; i <= N; i++) { if (Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2 === 7) hits++; var f = hits / i; if (prev && i > 1) g.line(i - 1, prev, i, f, BLUE, { width: 1.6 }); prev = f; }
      out.innerHTML = 'Code : <code>if randint(1, 6) + randint(1, 6) == 7: hits = hits + 1</code><br>Après <b>' + N + '</b> lancers : fréquence <b class="mono">' + r3(hits / N) + '</b> (' + hits + ' fois la somme 7).<br>Probabilité théorique : 6/36 = <b class="mono">0,167</b> (trait orange).<br>La courbe bleue fluctue au début puis se rapproche de la valeur théorique. Relance : chaque simulation est différente.';
    }
    btn.addEventListener('click', run);
    L.side.appendChild(Mini.slider('py3-n', 'Nombre de lancers =', 50, 2000, 50, 500, function (v) { N = v; run(); }));
    L.side.appendChild(btn); L.side.appendChild(out); run();
  })();

  Mini.exercises(document.getElementById('exos'), window.PYT_EX, 'python');
  Mini.checklist(document.getElementById('checklist'), 'python', [
    'Je suis l’évolution des variables dans un tableau de suivi.',
    'Je distingue = (affectation) et == (test).',
    'Je sais combien de tours font range(n), range(a, b) et range(a, b, pas).',
    'Je choisis for (nombre de tours connu) ou while (condition).',
    'J’écris et utilise une fonction avec return.',
    'Je manipule les listes : indices à partir de 0, append, len, compréhension.',
    'J’écris la boucle d’un seuil et je vérifie qu’elle s’arrête.',
    'Je décris la dichotomie et une simulation avec randint.'
  ]);
})();
