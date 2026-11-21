/* Mini-site Trigonométrie : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  var PI = Math.PI, TAU = 2 * Math.PI;
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function gcd(a, b) { return b ? gcd(b, a % b) : Math.abs(a); }
  /* angle en degrés entiers -> texte en radians : 30 -> "π/6" */
  function radText(deg) {
    deg = Math.round(deg);
    if (deg === 0) return '0';
    var g = gcd(deg, 180), n = deg / g, d = 180 / g;
    var num = n === 1 ? 'π' : n === -1 ? '−π' : (n < 0 ? '−' : '') + Math.abs(n) + 'π';
    return d === 1 ? num : num + '/' + d;
  }
  /* valeur exacte pour les angles remarquables, sinon décimal */
  var EXACT = { 0: ['1', '0'], 30: ['√3/2', '1/2'], 45: ['√2/2', '√2/2'], 60: ['1/2', '√3/2'], 90: ['0', '1'], 120: ['−1/2', '√3/2'], 135: ['−√2/2', '√2/2'], 150: ['−√3/2', '1/2'], 180: ['−1', '0'],
    210: ['−√3/2', '−1/2'], 225: ['−√2/2', '−√2/2'], 240: ['−1/2', '−√3/2'], 270: ['0', '−1'], 300: ['1/2', '−√3/2'], 315: ['√2/2', '−√2/2'], 330: ['√3/2', '−1/2'], 360: ['1', '0'] };
  function unitCircle(container, label) {
    var g = new FX.Graph(container, { width: 480, height: 480, xmin: -1.45, xmax: 1.45, ymin: -1.45, ymax: 1.45, label: label });
    return g;
  }
  function drawCircle(g) {
    var n = 120;
    for (var i = 0; i < n; i++) { var a = TAU * i / n, b = TAU * (i + 1) / n; g.line(Math.cos(a), Math.sin(a), Math.cos(b), Math.sin(b), '#53617a', { width: 2 }); }
  }

  /* 1. Le cercle trigonométrique */
  (function () {
    var L = Mini.makeLab('lab1', '1. Le cercle : cos est l’abscisse, sin est l’ordonnée', 'angle, radian, point image');
    var g = unitCircle(L.graph, 'Cercle trigonométrique avec point mobile');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sl, sel;
    var marks = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
    function draw(d) {
      var t = d * PI / 180, c = Math.cos(t), s = Math.sin(t);
      g.clear(); drawCircle(g);
      marks.forEach(function (m) { g.point(Math.cos(m * PI / 180), Math.sin(m * PI / 180), '#c5cde0', { r: 3 }); });
      g.line(0, 0, c, s, PURPLE, { width: 2.4 });
      g.line(c, 0, c, s, ORANGE, { width: 2.6, dashed: true });
      g.line(0, 0, c, 0, BLUE, { width: 3.4 });
      g.point(c, s, PURPLE, { r: 6 });
      g.label(c, s, 'M', PURPLE, { dx: 10, dy: -8 });
      var ex = EXACT[d];
      out.innerHTML = 'Angle : <b class="mono">' + d + '°</b> = <b class="mono">' + radText(d) + '</b> rad ≈ ' + r3(t) + '<br>' +
        '<span style="color:' + BLUE + '">cos x = ' + (ex ? ex[0] + ' ≈ ' : '') + '<b class="mono">' + r3(c) + '</b></span> (abscisse de M, trait bleu)<br>' +
        '<span style="color:' + ORANGE + '">sin x = ' + (ex ? ex[1] + ' ≈ ' : '') + '<b class="mono">' + r3(s) + '</b></span> (ordonnée de M, pointillé orange)<br>' +
        'Contrôle : cos² x + sin² x = <b class="mono">' + r3(c * c + s * s) + '</b><br>' +
        'Signes : cos ' + (c > 1e-9 ? '&gt; 0' : c < -1e-9 ? '&lt; 0' : '= 0') + ', sin ' + (s > 1e-9 ? '&gt; 0' : s < -1e-9 ? '&lt; 0' : '= 0') + '.';
    }
    sl = Mini.slider('c-ang', 'Angle (degrés) =', 0, 360, 5, 60, function (v) { draw(v); });
    sel = Mini.select('c-pre', 'Angle remarquable', ['Choisir…'].concat(marks.map(function (m) { return m + '° = ' + radText(m); })), function (i) { if (i > 0) sl.set(marks[i - 1]); });
    L.side.appendChild(sl); L.side.appendChild(sel); L.side.appendChild(out);
    draw(60);
  })();

  /* 2. Du cercle aux courbes */
  (function () {
    var L = Mini.makeLab('lab2', '2. Du cercle aux courbes de cos et sin', 'chaque point du cercle donne un point de chaque courbe');
    var g = new FX.Graph(L.graph, { xmin: -0.5, xmax: 6.9, ymin: -1.5, ymax: 1.5, label: 'Courbes de cosinus et sinus avec point mobile' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    function draw(d) {
      var x = d * PI / 180;
      g.clear();
      [PI / 2, PI, 3 * PI / 2, TAU].forEach(function (k, i) { g.line(k, -1.5, k, 1.5, '#dfe5f2', { dashed: true }); g.label(k, -1.28, ['π/2', 'π', '3π/2', '2π'][i], '#53617a', { dx: -6, dy: 0 }); });
      g.curve(Math.cos, BLUE); g.curve(Math.sin, ORANGE);
      g.line(x, 0, x, Math.cos(x), BLUE, { dashed: true }); g.line(x, 0, x, Math.sin(x), ORANGE, { dashed: true });
      g.point(x, Math.cos(x), BLUE, { r: 5 }); g.point(x, Math.sin(x), ORANGE, { r: 5 });
      out.innerHTML = 'x = <b class="mono">' + radText(d) + '</b> ≈ ' + r3(x) + '<br><span style="color:' + BLUE + '">cos x (bleu) = <b class="mono">' + r3(Math.cos(x)) + '</b></span><br><span style="color:' + ORANGE + '">sin x (orange) = <b class="mono">' + r3(Math.sin(x)) + '</b></span><br>Les deux courbes oscillent entre −1 et 1 et se répètent tous les 2π. La courbe orange est la bleue décalée de π/2 vers la droite : sin x = cos(x − π/2).';
    }
    L.side.appendChild(Mini.slider('c2-ang', 'x (degrés) =', 0, 360, 5, 60, draw)); L.side.appendChild(out);
    draw(60);
  })();

  /* 3. Symétries */
  (function () {
    var L = Mini.makeLab('lab3', '3. Les symétries : voir au lieu d’apprendre', 'x, −x, π − x, π + x, π/2 − x');
    var g = unitCircle(L.graph, 'Cercle avec un point et son symétrique');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var names = ['−x', 'π − x', 'π + x', 'π/2 − x'];
    var maps = [function (d) { return -d; }, function (d) { return 180 - d; }, function (d) { return 180 + d; }, function (d) { return 90 - d; }];
    var axes = ['par rapport à l’axe des abscisses (Ox)', 'par rapport à l’axe des ordonnées (Oy)', 'par rapport à l’origine O', 'par rapport à la première bissectrice (y = x)'];
    var rules = [['cos(−x) = cos x', 'sin(−x) = −sin x'], ['cos(π − x) = −cos x', 'sin(π − x) = sin x'], ['cos(π + x) = −cos x', 'sin(π + x) = −sin x'], ['cos(π/2 − x) = sin x', 'sin(π/2 − x) = cos x']];
    var idx = 1, ang = 30;
    function draw() {
      var t = ang * PI / 180, c = Math.cos(t), s = Math.sin(t), t2 = maps[idx](ang) * PI / 180, c2 = Math.cos(t2), s2 = Math.sin(t2);
      g.clear(); drawCircle(g);
      if (idx === 0) g.line(-1.3, 0, 1.3, 0, GREY, { dashed: true });
      if (idx === 1) g.line(0, -1.3, 0, 1.3, GREY, { dashed: true });
      if (idx === 3) g.line(-1.3, -1.3, 1.3, 1.3, GREY, { dashed: true });
      g.line(0, 0, c, s, BLUE, { width: 2.2 }); g.line(0, 0, c2, s2, ORANGE, { width: 2.2 });
      g.line(c, s, c2, s2, GREY, { dashed: true });
      g.point(c, s, BLUE, { r: 6 }); g.point(c2, s2, ORANGE, { r: 6 });
      g.label(c, s, 'M(x)', BLUE, { dx: 10, dy: -8 }); g.label(c2, s2, "M'", ORANGE, { dx: 10, dy: -8 });
      out.innerHTML = 'M (bleu) est le point image de x = ' + ang + '°. M’ (orange) est celui de <b>' + names[idx] + '</b>.<br>M’ est le symétrique de M <b>' + axes[idx] + '</b>.<br>' +
        'cos x = <b class="mono">' + r3(c) + '</b>, sin x = <b class="mono">' + r3(s) + '</b><br>' +
        'Coordonnées de M’ : (<b class="mono">' + r3(c2) + '</b> ; <b class="mono">' + r3(s2) + '</b>)<br>' +
        '<b>' + rules[idx][0] + '</b><br><b>' + rules[idx][1] + '</b>';
    }
    var symSel = Mini.select('c3-sym', 'Transformation', names, function (k) { idx = k; draw(); });
    symSel.select.value = '1';
    L.side.appendChild(symSel);
    L.side.appendChild(Mini.slider('c3-ang', 'x (degrés) =', 5, 85, 5, 30, function (v) { ang = v; draw(); }));
    L.side.appendChild(out);
    draw();
  })();

  /* 4. a·cos(bx + c) + d */
  Mini.paramLab('lab4', {
    title: '4. Transformer la sinusoïde : a·cos(bx + c) + d', sub: 'amplitude, période, décalage', label: 'Courbe de a cos(bx + c) + d',
    params: [{ k: 'a', label: 'Amplitude a =', min: -3, max: 3, step: 0.5, val: 1 }, { k: 'b', label: 'Fréquence b =', min: 0.5, max: 3, step: 0.5, val: 1 },
             { k: 'c', label: 'Décalage c =', min: -3, max: 3, step: 0.5, val: 0 }, { k: 'd', label: 'Axe médian d =', min: -2, max: 2, step: 0.5, val: 0 }],
    curves: [{ expr: 'cos(x)', color: '#c5cde0', dashed: true }, { expr: 'a*cos(b*x+c)+d', color: BLUE }],
    win: [-7, 7, -5, 5],
    presets: [{ name: 'cos x (référence)', vals: { a: 1, b: 1, c: 0, d: 0 } }, { name: '2cos x : amplitude doublée', vals: { a: 2, b: 1, c: 0, d: 0 } }, { name: 'cos 2x : période π', vals: { a: 1, b: 2, c: 0, d: 0 } }, { name: 'cos(x − π/2) ≈ sin x', vals: { a: 1, b: 1, c: -1.5, d: 0 } }, { name: 'cos x + 1 : montée', vals: { a: 1, b: 1, c: 0, d: 1 } }],
    extra: function (g, v) { g.line(-7, v.d, 7, v.d, GREEN, { dashed: true }); },
    readout: function (v) {
      return 'f(x) = ' + r2(v.a) + '·cos(' + r2(v.b) + 'x + ' + r2(v.c) + ') + ' + r2(v.d) + '<br>Amplitude <b class="mono">' + r2(Math.abs(v.a)) + '</b> : la courbe va de <b class="mono">' + r2(v.d - Math.abs(v.a)) + '</b> à <b class="mono">' + r2(v.d + Math.abs(v.a)) + '</b>.<br>Période 2π/b ≈ <b class="mono">' + r3(TAU / v.b) + '</b>.<br>Décalage horizontal −c/b ≈ <b class="mono">' + r3(-v.c / v.b) + '</b> (vers la droite si positif).<br>Axe médian y = <b class="mono">' + r2(v.d) + '</b> (vert pointillé). En gris : cos x.';
    }
  });

  /* 5. Résoudre cos x = a ou sin x = a sur [0 ; 2π] */
  (function () {
    var L = Mini.makeLab('lab5', '5. Résoudre cos x = a ou sin x = a', 'sur [0 ; 2π]');
    var g = new FX.Graph(L.graph, { xmin: -0.3, xmax: 6.6, ymin: -1.5, ymax: 1.5, label: 'Résolution graphique de cos x = a ou sin x = a' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var which = 0, a = 0.5;
    function sols() {
      var al, r = [];
      if (which === 0) { al = Math.acos(a); r = [al, TAU - al]; }
      else { al = Math.asin(a); r = [(al + TAU) % TAU, (PI - al + TAU) % TAU]; }
      r = r.map(function (v) { return Math.round(v * 1e9) / 1e9; });
      if (Math.abs(r[0] - r[1]) < 1e-6) r = [r[0]];
      return r.sort(function (p, q) { return p - q; });
    }
    function nice(v) { var d = Math.round(v * 180 / PI * 1e6) / 1e6; return Math.abs(d - Math.round(d)) < 1e-6 && EXACT[Math.round(d)] ? radText(Math.round(d)) : r3(v); }
    function draw() {
      var f = which === 0 ? Math.cos : Math.sin, col = which === 0 ? BLUE : ORANGE, S = sols();
      g.clear();
      [PI / 2, PI, 3 * PI / 2, TAU].forEach(function (k, i) { g.line(k, -1.5, k, 1.5, '#e8ecf6', { dashed: true }); g.label(k, -1.3, ['π/2', 'π', '3π/2', '2π'][i], '#53617a', { dx: -6, dy: 0 }); });
      g.curve(f, col, { from: 0, to: TAU });
      g.line(-0.3, a, 6.6, a, PURPLE, { width: 2 });
      S.forEach(function (x) { g.point(x, a, GREEN, { r: 6 }); g.line(x, 0, x, a, GREEN, { dashed: true }); });
      out.innerHTML = (which === 0 ? 'cos' : 'sin') + ' x = <b class="mono">' + r2(a) + '</b> sur [0 ; 2π]<br>' +
        (S.length === 1 ? 'Une seule solution : x = <b class="mono">' + nice(S[0]) + '</b> (≈ ' + r3(S[0]) + ').' : 'Deux solutions : <b class="mono">' + nice(S[0]) + '</b> et <b class="mono">' + nice(S[1]) + '</b> (≈ ' + r3(S[0]) + ' et ' + r3(S[1]) + ').') +
        '<br>Lecture sur le cercle : ' + (which === 0 ? 'les deux points ont la même abscisse, ils sont symétriques par rapport à (Ox) : α et −α (donc 2π − α).' : 'les deux points ont la même ordonnée, ils sont symétriques par rapport à (Oy) : α et π − α.') +
        '<br>Sur ℝ, on ajoute 2kπ à chaque solution.';
    }
    var sel = Mini.select('c5-f', 'Équation', ['cos x = a', 'sin x = a'], function (i) { which = i; draw(); });
    L.side.appendChild(sel);
    L.side.appendChild(Mini.slider('c5-a', 'Valeur a =', -1, 1, 0.05, 0.5, function (v) { a = v; draw(); }));
    L.side.appendChild(out);
    draw();
  })();

  Mini.exercises(document.getElementById('exos'), window.TRI_EX, 'trigonometrie');
  Mini.checklist(document.getElementById('checklist'), 'trigonometrie', [
    'Je convertis degrés et radians sans calculatrice (π = 180°).',
    'Je place un point sur le cercle et lis cos (abscisse) et sin (ordonnée).',
    'Je connais ou retrouve les valeurs pour 0, π/6, π/4, π/3, π/2, π.',
    'J’utilise cos² x + sin² x = 1 en vérifiant le signe.',
    'Je vois les symétries −x, π − x, π + x, π/2 − x sur le cercle.',
    'Je donne la mesure principale d’un angle (retirer des tours complets).',
    'Je résous cos x = a et sin x = a sur un intervalle.',
    'Je lis amplitude, période et décalage sur a·cos(bx + c) + d.'
  ]);
})();
