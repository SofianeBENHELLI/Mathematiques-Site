/* Mini-site Fonctions : ateliers interactifs. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46';
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function r2(v) { return fmt(Math.round(v * 100) / 100); }

  function lab(rootId, title, sub) {
    var el = h('<div class="lab"><h3>' + title + '<small>' + (sub || '') + '</small></h3><div class="lab-grid"><div class="lab-graph"></div><div class="lab-side"></div></div></div>');
    document.getElementById(rootId).appendChild(el);
    return { graph: el.querySelector('.lab-graph'), side: el.querySelector('.lab-side'), el: el };
  }

  /* ---------- Atelier 1 : la machine à fonction ---------- */
  (function () {
    var L = lab('lab1', '1. La machine à fonction', 'image, antécédent, ensemble de définition');
    var presets = [
      { name: 'x² − 4x + 3', f: 'x^2-4x+3', win: [-3, 7, -3, 8], dom: 'ℝ' },
      { name: '1/(x − 2)', f: '1/(x-2)', win: [-3, 7, -6, 6], dom: 'ℝ \\ {2}', why: 'on ne divise pas par 0 : x − 2 = 0 en x = 2' },
      { name: '√(x − 1)', f: 'sqrt(x-1)', win: [-3, 7, -3, 4], dom: '[1 ; +∞[', why: 'sous la racine, x − 1 doit être ≥ 0' },
      { name: 'ln(x + 3)', f: 'ln(x+3)', win: [-5, 5, -4, 4], dom: ']−3 ; +∞[', why: 'ln n’existe que pour un nombre strictement positif : x + 3 > 0' },
      { name: 'x²', f: 'x^2', win: [-4, 4, -2, 10], dom: 'ℝ' }
    ];
    var cur = presets[0], f = FX.compile(cur.f), g, xval = 2;
    var out = h('<div class="readout" aria-live="polite"></div>');
    var dom = h('<div class="readout"></div>');
    var sel = Mini.select('m-sel', 'Choisis une fonction', presets.map(function (p) { return 'f(x) = ' + p.name; }), function (i) { cur = presets[i]; f = FX.compile(cur.f); newGraph(); draw(); });
    var sl = Mini.slider('m-x', 'Entrée x =', -5, 7, 0.1, 2, function (v) { xval = v; draw(); });
    L.side.appendChild(sel); L.side.appendChild(sl); L.side.appendChild(out); L.side.appendChild(dom);
    var sync;
    function newGraph() {
      L.graph.innerHTML = ''; g = new FX.Graph(L.graph, { xmin: cur.win[0], xmax: cur.win[1], ymin: cur.win[2], ymax: cur.win[3], label: 'Courbe de la fonction choisie' });
      sync = Mini.dragSlider(g, 'x', sl, { color: ORANGE, pos: function (v) { var y = f(v); return { x: v, y: isFinite(y) ? Math.max(g.ymin, Math.min(g.ymax, y)) : 0 }; }, val: function (x) { return x; } });
    }
    function draw() {
      if (!g) return;
      g.clear(); g.curve(f, BLUE);
      var y = f(xval); sync(xval);
      dom.innerHTML = 'Ensemble de définition : <b>' + cur.dom + '</b>';
      if (isFinite(y)) {
        g.line(xval, 0, xval, y, ORANGE, { dashed: true }); g.line(g.xmin, y, xval, y, ORANGE, { dashed: true }); g.point(xval, y, ORANGE);
        g.label(xval, y, '(' + r2(xval) + ' ; ' + r2(y) + ')', ORANGE);
        out.className = 'readout';
        out.innerHTML = '<b class="mono">x = ' + r2(xval) + '</b> entre dans la machine.<br>Sortie : <b class="mono">f(' + r2(xval) + ') = ' + r3(y) + '</b><br>On dit que ' + r3(y) + ' est l’<b>image</b> de ' + r2(xval) + ', et que ' + r2(xval) + ' est un <b>antécédent</b> de ' + r3(y) + '.';
      } else {
        out.className = 'readout warn';
        out.innerHTML = '<b>x = ' + r2(xval) + ' n’a pas d’image.</b><br>La machine refuse cette entrée : ' + (cur.why || 'f n’est pas définie ici') + '. Ce x n’est pas dans l’ensemble de définition.';
      }
    }
    newGraph(); draw();
  })();

  /* ---------- Atelier 2 : lecture graphique de f(x) = k, f(x) > k ---------- */
  (function () {
    var L = lab('lab2', '2. Lire f(x) = k et f(x) > k sur le graphique', 'résolution graphique');
    var presets = [
      { name: 'x³ − 3x + 1', f: 'x^3-3x+1', win: [-3, 3, -5, 6] },
      { name: '−x² + 4x', f: '-x^2+4x', win: [-2, 6, -6, 6] },
      { name: '3 sin(x)', f: '3sin(x)', win: [-6.3, 6.3, -4, 4] }
    ];
    var cur = presets[0], f = FX.compile(cur.f), g, k = 1, mode = 'eq';
    var out = h('<div class="readout" aria-live="polite"></div>');
    var chips = h('<div class="chips" role="group" aria-label="Type de question"><button type="button" data-m="eq" aria-pressed="true">f(x) = k</button><button type="button" data-m="gt" aria-pressed="false">f(x) &gt; k</button><button type="button" data-m="lt" aria-pressed="false">f(x) &lt; k</button></div>');
    var sel = Mini.select('r-sel', 'Fonction', presets.map(function (p) { return 'f(x) = ' + p.name; }), function (i) { cur = presets[i]; f = FX.compile(cur.f); newGraph(); ksl.input.min = cur.win[2]; ksl.input.max = cur.win[3]; ksl.set(Math.round((cur.win[2] + cur.win[3]) / 4)); });
    var ksl = Mini.slider('r-k', 'Valeur de k =', -5, 6, 0.1, 1, function (v) { k = v; draw(); });
    chips.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; mode = b.dataset.m; chips.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); draw(); });
    L.side.appendChild(sel); L.side.appendChild(chips); L.side.appendChild(ksl); L.side.appendChild(out);
    function newGraph() { L.graph.innerHTML = ''; g = new FX.Graph(L.graph, { xmin: cur.win[0], xmax: cur.win[1], ymin: cur.win[2], ymax: cur.win[3], label: 'Courbe et droite horizontale y = k' });
      var hx = g.xmin + (g.xmax - g.xmin) * 0.9;
      sync = Mini.dragSlider(g, 'k', ksl, { color: ORANGE, pos: function (v) { return { x: hx, y: v }; }, val: function (x, y) { return y; }, move: function (x, y) { return { x: hx, y: y }; } });
      draw(); }
    var sync;
    function interval(a, b) { return ']' + r2(a) + ' ; ' + r2(b) + '['; }
    function draw() {
      if (!g) return;
      g.clear(); g.curve(f, BLUE);
      g.line(g.xmin, k, g.xmax, k, ORANGE); sync(k);
      g.label(g.xmin + 0.1, k, 'y = ' + r2(k), ORANGE, { dy: -6 });
      if (mode === 'eq') {
        var rts = FX.roots(function (x) { return f(x) - k; }, g.xmin, g.xmax, 1500);
        rts.forEach(function (x) { g.point(x, k, ORANGE); g.line(x, k, x, 0, ORANGE, { dashed: true }); });
        out.innerHTML = rts.length ? 'La droite coupe la courbe en <b>' + rts.length + ' point' + (rts.length > 1 ? 's' : '') + '</b> : k a <b>' + rts.length + ' antécédent' + (rts.length > 1 ? 's' : '') + '</b>.<br>Solutions de f(x) = ' + r2(k) + ' : <b class="mono">{ ' + rts.map(r2).join(' ; ') + ' }</b>' : 'La droite ne coupe pas la courbe : <b>f(x) = ' + r2(k) + ' n’a aucune solution</b> sur cette fenêtre.';
      } else {
        var sol = Mini.solveIneq(f, k, g.xmin, g.xmax, mode === 'gt');
        sol.forEach(function (s) { g.rect(s[0], s[1], g.ymin, g.ymax, mode === 'gt' ? GREEN : PURPLE, { opacity: 0.14 }); });
        out.innerHTML = 'On cherche les x où la courbe est ' + (mode === 'gt' ? '<b>au-dessus</b>' : '<b>en dessous</b>') + ' de la droite.<br>' + (sol.length ? 'Solutions : <b class="mono">' + sol.map(function (s) { return interval(s[0], s[1]); }).join(' ∪ ') + '</b>' : 'Aucune solution sur cette fenêtre.') + '<br><small>Valeurs lues sur la fenêtre affichée, arrondies à 0,01. Les bornes sont les solutions de f(x) = k.</small>';
      }
    }
    newGraph();
  })();

  /* ---------- Atelier 3 : variations et tableau ---------- */
  (function () {
    var L = lab('lab3', '3. Du graphique au tableau de variations', 'extremums, flèches');
    var presets = [
      { name: 'x³ − 3x', f: 'x^3-3x', lo: -3, hi: 3, win: [-3, 3, -6, 6] },
      { name: 'x⁴ − 2x²', f: 'x^4-2x^2', lo: -2, hi: 2, win: [-2, 2, -2, 8] },
      { name: 'x·eˣ', f: 'x*e^x', lo: -4, hi: 2, win: [-4, 2, -1, 8] },
      { name: '−x² + 2x + 1', f: '-x^2+2x+1', lo: -1, hi: 3, win: [-1, 3, -3, 3] }
    ];
    var g, cur, f;
    var sel = Mini.select('v-sel', 'Fonction', presets.map(function (p) { return 'f(x) = ' + p.name; }), function (i) { set(presets[i]); });
    var info = h('<div class="readout"></div>');
    L.side.appendChild(sel); L.side.appendChild(info);
    var tableBox = h('<div style="overflow:auto;padding:0 12px 14px"></div>'); L.el.appendChild(tableBox);
    function set(p) {
      cur = p; f = FX.compile(p.f); L.graph.innerHTML = '';
      g = new FX.Graph(L.graph, { xmin: p.win[0], xmax: p.win[1], ymin: p.win[2], ymax: p.win[3], label: 'Courbe et extremums' });
      g.curve(f, BLUE);
      var vt = Mini.variationTable(f, p.lo, p.hi);
      tableBox.innerHTML = vt.html;
      vt.points.forEach(function (x, j) {
        var y = f(x);
        if (j === 0 || j === vt.points.length - 1) { g.point(x, y, PURPLE, { r: 4 }); return; }
        var isMax = vt.signs[j - 1] > 0 && vt.signs[j] < 0;
        g.point(x, y, isMax ? GREEN : ORANGE); g.label(x, y, (isMax ? 'max local ' : 'min local ') + '(' + r2(x) + ' ; ' + r2(y) + ')', isMax ? GREEN : ORANGE);
      });
      info.innerHTML = 'Sur [' + p.lo + ' ; ' + p.hi + '], la courbe change de sens aux points marqués. Chaque changement de flèche correspond à un <b>extremum local</b>. Le tableau est construit à partir du signe de la dérivée (atelier suivant : mini-site Dérivation).';
    }
    set(presets[0]);
  })();

  /* ---------- Atelier 4 : continuité ---------- */
  (function () {
    var L = lab('lab4', '4. Continuité : lever ou ne pas lever le stylo', 'limites à gauche et à droite');
    var presets = [
      { name: 'Recollement : f(x) = x² (x < 1), a·x + 2 (x ≥ 1)', par: 'a', min: -3, max: 3, step: 0.1, val: 0, x0: 1, win: [-2, 4, -3, 6],
        left: function () { return 1; }, right: function (a) { return a + 2; }, val0: function (a) { return a + 2; },
        fl: function (a) { return function (x) { return x < 1 ? x * x : a * x + 2; }; }, hint: 'Pour recoller, il faut a + 2 = 1.' },
      { name: 'Un trou : f(x) = (x² − 1)/(x − 1) (x ≠ 1), f(1) = b', par: 'b', min: -1, max: 5, step: 0.1, val: 0.5, x0: 1, win: [-2, 4, -2, 6],
        left: function () { return 2; }, right: function () { return 2; }, val0: function (b) { return b; },
        fl: function (b) { return function (x) { return Math.abs(x - 1) < 1e-9 ? NaN : (x * x - 1) / (x - 1); }; }, hole: true, hint: 'Pour x ≠ 1, f(x) = x + 1 : la limite en 1 vaut 2. Il faut b = 2.' },
      { name: 'Un saut : partie entière E(x) en x = 1', par: null, x0: 1, win: [-2, 4, -3, 5],
        left: function () { return 0; }, right: function () { return 1; }, val0: function () { return 1; },
        fl: function () { return function (x) { return Math.floor(x); }; }, jump: true, hint: 'Les limites à gauche (0) et à droite (1) diffèrent : aucun réglage ne peut y remédier.' },
      { name: 'Asymptote : f(x) = 1/x en x = 0', par: null, x0: 0, win: [-4, 4, -5, 5],
        left: function () { return -Infinity; }, right: function () { return Infinity; }, val0: function () { return NaN; },
        fl: function () { return function (x) { return x === 0 ? NaN : 1 / x; }; }, hint: 'f n’est pas définie en 0 et ses valeurs partent vers ±∞ : pas de limite finie.' }
    ];
    var cur = presets[0], g, p = 0;
    var out = h('<div class="readout" aria-live="polite"></div>');
    var holder = h('<div></div>');
    var sel = Mini.select('c-sel', 'Situation', presets.map(function (q) { return q.name; }), function (i) { cur = presets[i]; setup(); });
    L.side.appendChild(sel); L.side.appendChild(holder); L.side.appendChild(out);
    function setup() {
      holder.innerHTML = '';
      p = cur.par ? cur.val : 0;
      if (cur.par) { var s = Mini.slider('c-p', 'Paramètre ' + cur.par + ' =', cur.min, cur.max, cur.step, cur.val, function (v) { p = v; draw(); }); holder.appendChild(s); }
      L.graph.innerHTML = '';
      g = new FX.Graph(L.graph, { xmin: cur.win[0], xmax: cur.win[1], ymin: cur.win[2], ymax: cur.win[3], label: 'Courbe autour du point de raccord' });
      draw();
    }
    function draw() {
      g.clear();
      var f = cur.fl(p), x0 = cur.x0;
      g.curve(f, BLUE, { from: g.xmin, to: x0 - 1e-6 }); g.curve(f, BLUE, { from: x0 + 1e-6, to: g.xmax });
      var L0 = cur.left(p), R0 = cur.right(p), V = cur.val0(p);
      g.line(x0, g.ymin, x0, g.ymax, '#aab4cc', { dashed: true });
      if (isFinite(L0)) g.point(x0, L0, BLUE, { open: !(isFinite(V) && Math.abs(V - L0) < 0.05) });
      if (isFinite(R0) && Math.abs(R0 - L0) > 0.05) g.point(x0, R0, BLUE, { open: !(isFinite(V) && Math.abs(V - R0) < 0.05) });
      if (isFinite(V)) g.point(x0, V, ORANGE, { r: 4 });
      var cont = isFinite(L0) && isFinite(R0) && isFinite(V) && Math.abs(L0 - R0) < 0.05 && Math.abs(L0 - V) < 0.05;
      var show = function (v) { return isFinite(v) ? '<b class="mono">' + r2(v) + '</b>' : '<b>' + (v > 0 ? '+∞' : v < 0 ? '−∞' : 'non définie') + '</b>'; };
      out.className = 'readout' + (cont ? '' : ' warn');
      out.innerHTML = 'En x = ' + cur.x0 + ' :<br>limite à gauche = ' + show(L0) + '<br>limite à droite = ' + show(R0) + '<br>f(' + cur.x0 + ') = ' + show(V) + '<br>' +
        (cont ? '<span class="okk"><b>Les trois valeurs sont égales : f est continue en ' + cur.x0 + '.</b></span> Tu peux tracer sans lever le stylo.' : '<span class="ko"><b>f n’est pas continue en ' + cur.x0 + '.</b></span> ' + cur.hint);
    }
    setup();
  })();

  /* ---------- Atelier 5 : TVI et dichotomie ---------- */
  (function () {
    var L = lab('lab5', '5. Théorème des valeurs intermédiaires et dichotomie', 'existence, unicité, encadrement');
    var presets = [
      { name: 'f(x) = x³ + x − 1 sur [0 ; 1]', f: 'x^3+x-1', a: 0, b: 1, win: [-0.3, 1.3, -1.5, 1.5], cont: true },
      { name: 'f(x) = cos(x) − x sur [0 ; 1]', f: 'cos(x)-x', a: 0, b: 1, win: [-0.3, 1.3, -1.5, 1.5], cont: true },
      { name: 'f(x) = x² − 2 sur [1 ; 2]', f: 'x^2-2', a: 1, b: 2, win: [0.5, 2.5, -2, 3], cont: true },
      { name: 'Contre-exemple : f(x) = 1/x sur [−1 ; 2]', f: '1/x', a: -1, b: 2, win: [-1.5, 2.5, -4, 4], cont: false }
    ];
    var cur, f, g, a, b, step, log;
    var out = h('<div class="readout" aria-live="polite"></div>');
    var hyp = h('<div class="readout"></div>');
    var btns = h('<div class="chips"><button type="button" id="d-step" class="primary">Couper en deux</button><button type="button" id="d-auto">10 étapes</button><button type="button" id="d-reset">Recommencer</button></div>');
    var sel = Mini.select('t-sel', 'Situation', presets.map(function (p) { return p.name; }), function (i) { init(presets[i]); });
    L.side.appendChild(sel); L.side.appendChild(hyp); L.side.appendChild(btns); L.side.appendChild(out);
    var logBox = h('<div style="overflow:auto;max-height:230px;padding:0 12px 14px"></div>'); L.el.appendChild(logBox);
    function init(p) {
      cur = p; f = FX.compile(p.f); a = p.a; b = p.b; step = 0; log = [];
      L.graph.innerHTML = ''; g = new FX.Graph(L.graph, { xmin: p.win[0], xmax: p.win[1], ymin: p.win[2], ymax: p.win[3], label: 'Dichotomie sur la courbe' });
      var fa = f(a), fb = f(b);
      var mono = true, sgn = 0;
      for (var i = 1; i < 400; i++) { var x = a + (b - a) * i / 400, d = f(x + 1e-6) - f(x); if (isFinite(d)) { if (!sgn) sgn = Math.sign(d); else if (Math.sign(d) !== sgn) mono = false; } }
      hyp.innerHTML = '<b>Hypothèses du TVI</b><br>' +
        (p.cont ? '<span class="okk">✓ f continue sur [' + a + ' ; ' + b + ']</span>' : '<span class="ko">✗ f n’est pas continue sur [' + a + ' ; ' + b + '] (non définie en 0)</span>') + '<br>' +
        'f(' + a + ') = ' + r3(fa) + ', f(' + b + ') = ' + r3(fb) + (fa * fb < 0 ? ' : <span class="okk">signes opposés ✓</span>' : ' : <span class="ko">mêmes signes ✗</span>') + '<br>' +
        (!p.cont ? '<span class="ko">✗ monotonie sans objet : f n\u2019est pas définie sur tout l\u2019intervalle</span>' : mono ? '<span class="okk">✓ strictement monotone (solution unique)</span>' : '<span class="ko">✗ monotonie non établie</span>');
      draw();
    }
    function draw() {
      g.clear(); g.curve(f, BLUE);
      g.rect(a, b, g.ymin, g.ymax, ORANGE, { opacity: 0.12 });
      g.line(a, g.ymin, a, g.ymax, ORANGE, { dashed: true }); g.line(b, g.ymin, b, g.ymax, ORANGE, { dashed: true });
      var m = (a + b) / 2;
      out.innerHTML = 'Encadrement actuel : <b class="mono">[' + r3(a) + ' ; ' + r3(b) + ']</b><br>Amplitude : <b class="mono">' + (b - a).toPrecision(3) + '</b> après ' + step + ' étape' + (step > 1 ? 's' : '') + '.<br>' +
        (step === 0 ? 'Clique sur « Couper en deux » : on teste le milieu et on garde la moitié où f change de signe.' : (cur.cont ? 'La solution est dans cet intervalle.' : '<span class="ko">L’algorithme se resserre autour de 0, mais f(0) n’existe pas : il n’y a pas de solution. Le TVI ne s’applique pas car f n’est pas continue.</span>'));
      logBox.innerHTML = log.length ? '<table><thead><tr><th>étape</th><th>a</th><th>b</th><th>milieu m</th><th>f(m)</th><th>on garde</th></tr></thead><tbody>' + log.map(function (r) { return '<tr><td>' + r.n + '</td><td class="mono">' + r3(r.a) + '</td><td class="mono">' + r3(r.b) + '</td><td class="mono">' + r3(r.m) + '</td><td class="mono">' + r3(r.fm) + '</td><td>' + r.keep + '</td></tr>'; }).join('') + '</tbody></table>' : '';
      if (step > 0) { var mm = (a + b) / 2; g.point(mm, 0, ORANGE, { r: 4 }); }
    }
    function once() {
      var m = (a + b) / 2, fm = f(m), fa = f(a);
      step++;
      var left = fa * fm <= 0;
      log.push({ n: step, a: a, b: b, m: m, fm: fm, keep: left ? '[a ; m]' : '[m ; b]' });
      if (left) b = m; else a = m;
      draw();
    }
    document.getElementById('d-step').onclick = function () { if (b - a > 1e-9) once(); };
    document.getElementById('d-auto').onclick = function () { for (var i = 0; i < 10 && b - a > 1e-9; i++) once(); };
    document.getElementById('d-reset').onclick = function () { init(cur); };
    init(presets[0]);
  })();

  /* ---------- Exercices, checklist, réinitialisation ---------- */
  Mini.exercises(document.getElementById('exos'), window.FONC_EX, 'fonctions');
  Mini.checklist(document.getElementById('checklist'), 'fonctions', [
    'Je sais définir image et antécédent, et donner l’ensemble de définition d’une fonction.',
    'Je lis graphiquement f(x) = k, f(x) > k et les variations.',
    'Je construis un tableau de variations complet.',
    'Je sais vérifier la continuité en un point avec limites à gauche et à droite.',
    'Je sais citer le TVI avec ses hypothèses, et son corollaire pour l’unicité.',
    'Je sais appliquer la dichotomie et dire combien d’étapes sont nécessaires.',
    'Je sais refaire : dérivable implique continue.'
  ]);
  document.getElementById('reset').onclick = function () {
    if (!confirm('Effacer ta progression sur ce chapitre ?')) return;
    Mini.save('fonctions', {}); Mini.save('fonctions:check', {}); location.reload();
  };
})();
