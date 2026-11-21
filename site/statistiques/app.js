/* Mini-site Statistiques : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function st(arr) {
    var a = arr.slice().sort(function (x, y) { return x - y; }), n = a.length, m = a.reduce(function (s, x) { return s + x; }, 0) / n;
    var v = a.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0) / n;
    var med = n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2;
    return { a: a, n: n, mean: m, sd: Math.sqrt(v), med: med, q1: a[Math.ceil(n / 4) - 1], q3: a[Math.ceil(3 * n / 4) - 1], min: a[0], max: a[n - 1] };
  }
  function boxplot(g, y, s, color, half) {
    half = half || 0.12;
    g.line(s.min, y, s.q1, y, color, { width: 2.4 }); g.line(s.q3, y, s.max, y, color, { width: 2.4 });
    g.line(s.min, y - half / 2, s.min, y + half / 2, color, { width: 2.4 }); g.line(s.max, y - half / 2, s.max, y + half / 2, color, { width: 2.4 });
    g.rect(s.q1, s.q3, y - half, y + half, color, { opacity: 0.25 });
    g.line(s.q1, y - half, s.q3, y - half, color, { width: 2.4 }); g.line(s.q1, y + half, s.q3, y + half, color, { width: 2.4 });
    g.line(s.q1, y - half, s.q1, y + half, color, { width: 2.4 }); g.line(s.q3, y - half, s.q3, y + half, color, { width: 2.4 });
    g.line(s.med, y - half, s.med, y + half, '#20283d', { width: 3.4 });
  }
  function dots(g, y, a, color) { a.forEach(function (x) { g.point(x, y, color, { r: 4 }); }); }
  var SERIES = [
    { name: 'Notes d’une classe', v: [6, 8, 9, 10, 11, 12, 12, 13, 14, 15, 16] },
    { name: 'Temps de trajet (min)', v: [12, 14, 15, 15, 16, 18, 20, 22, 25, 28, 32] },
    { name: 'Salaires (k€) avec un record', v: [22, 24, 25, 26, 27, 28, 30, 31, 33, 36, 90] }
  ];

  /* 1. Indicateurs et boîte à moustaches */
  (function () {
    var L = Mini.makeLab('lab1', '1. Indicateurs d’une série', 'moyenne, médiane, quartiles, écart type');
    var g = new FX.Graph(L.graph, { xmin: 0, xmax: 100, ymin: 0, ymax: 1, label: 'Valeurs de la série et boîte à moustaches' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var idx = 0, extra = 0;
    function draw() {
      var base = SERIES[idx].v.slice(); base[base.length - 1] = SERIES[idx].v[base.length - 1] + extra;
      var s = st(base), lo = Math.min(0, s.min - 2), hi = s.max + 4;
      g.view(Math.floor(lo), Math.ceil(hi), 0, 1); g.clear(); dots(g, 0.15, base, GREY); boxplot(g, 0.6, s, BLUE, 0.14);
      g.point(s.mean, 0.38, ORANGE, { r: 7 }); g.label(s.mean, 0.38, 'moyenne', ORANGE, { dy: -10 });
      out.innerHTML = '<b>' + SERIES[idx].name + '</b> (n = ' + s.n + ', dernière valeur ' + base[base.length - 1] + ')<br>Moyenne x̄ = <b class="mono">' + r2(s.mean) + '</b> (point orange)<br>Médiane = <b class="mono">' + r2(s.med) + '</b> (trait noir)<br>Q₁ = <b class="mono">' + r2(s.q1) + '</b>, Q₃ = <b class="mono">' + r2(s.q3) + '</b>, écart interquartile = <b class="mono">' + r2(s.q3 - s.q1) + '</b><br>Écart type σ = <b class="mono">' + r2(s.sd) + '</b><br>Augmente la dernière valeur : la moyenne et σ montent beaucoup, la médiane et les quartiles à peine.';
    }
    L.side.appendChild(Mini.select('st1-s', 'Série', SERIES.map(function (x) { return x.name; }), function (i) { idx = i; draw(); }));
    L.side.appendChild(Mini.slider('st1-e', 'Augmenter la plus grande valeur de =', 0, 60, 2, 0, function (v) { extra = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 2. Comparer deux distributions */
  (function () {
    var L = Mini.makeLab('lab2', '2. Comparer deux séries', 'centre, dispersion, forme');
    var g = new FX.Graph(L.graph, { xmin: 0, xmax: 40, ymin: 0, ymax: 1, label: 'Deux boîtes à moustaches superposées' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var P = [
      { name: 'A : notes régulières', v: [9, 10, 11, 12, 12, 13, 13, 14, 15] },
      { name: 'B : notes très étalées', v: [3, 5, 8, 11, 12, 13, 16, 18, 20] },
      { name: 'C : bons résultats', v: [13, 14, 15, 16, 16, 17, 17, 18, 19] }
    ], a = 0, b = 1;
    function draw() {
      var sa = st(P[a].v), sb = st(P[b].v);
      g.view(0, 22, 0, 1); g.clear(); boxplot(g, 0.7, sa, BLUE, 0.13); boxplot(g, 0.3, sb, ORANGE, 0.13);
      g.label(0.2, 0.7, P[a].name.charAt(0), BLUE, { dx: 4, dy: 24 }); g.label(0.2, 0.3, P[b].name.charAt(0), ORANGE, { dx: 4, dy: 24 });
      function line(t, s) { return t + ' : médiane ' + r2(s.med) + ', Q₁ ' + r2(s.q1) + ', Q₃ ' + r2(s.q3) + ', écart interquartile ' + r2(s.q3 - s.q1) + ', σ ' + r2(s.sd); }
      var cmp = Math.abs(sa.med - sb.med) < 0.51 ? 'Centres comparables' : (sa.med > sb.med ? 'A est mieux centrée (médiane plus haute)' : 'B est mieux centrée (médiane plus haute)');
      var dsp = (sa.q3 - sa.q1) === (sb.q3 - sb.q1) ? 'même dispersion' : ((sa.q3 - sa.q1) < (sb.q3 - sb.q1) ? 'A est plus régulière' : 'B est plus régulière');
      out.innerHTML = line('A', sa) + '<br>' + line('B', sb) + '<br><b>Conclusion :</b> ' + cmp + ' ; ' + dsp + ' (écart interquartile plus petit = valeurs plus groupées).';
    }
    L.side.appendChild(Mini.select('st2-a', 'Série A (bleu)', P.map(function (x) { return x.name; }), function (i) { a = i; draw(); }));
    var sb = Mini.select('st2-b', 'Série B (orange)', P.map(function (x) { return x.name; }), function (i) { b = i; draw(); }); sb.select.value = '1';
    L.side.appendChild(sb); L.side.appendChild(out); draw();
  })();

  /* 3. Transformation affine */
  (function () {
    var L = Mini.makeLab('lab3', '3. Transformer une série : ax + b', 'ce qui change, ce qui reste');
    var g = new FX.Graph(L.graph, { xmin: -10, xmax: 60, ymin: 0, ymax: 1, label: 'Série initiale et série transformée' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var base = [6, 8, 9, 10, 11, 12, 12, 13, 14, 15, 16], s = { a: 2, b: 5 };
    function draw() {
      var t = base.map(function (x) { return s.a * x + s.b; }), s0 = st(base), s1 = st(t);
      var lo = Math.min(s0.min, s1.min) - 4, hi = Math.max(s0.max, s1.max) + 4;
      g.view(lo, hi, 0, 1); g.clear(); dots(g, 0.72, base, BLUE); dots(g, 0.28, t, ORANGE); boxplot(g, 0.58, s0, BLUE, 0.07); boxplot(g, 0.14, s1, ORANGE, 0.07);
      g.point(s0.mean, 0.86, BLUE, { r: 6 }); g.point(s1.mean, 0.42, ORANGE, { r: 6 });
      out.innerHTML = 'Chaque valeur x devient <b>' + s.a + 'x + ' + s.b + '</b>.<br>Moyenne : ' + r2(s0.mean) + ' → <b class="mono">' + r2(s1.mean) + '</b> (= ' + s.a + '×' + r2(s0.mean) + ' + ' + s.b + ')<br>Médiane : ' + r2(s0.med) + ' → <b class="mono">' + r2(s1.med) + '</b>' + (s.a < 0 ? ' (attention : avec a &lt; 0, les quartiles s’échangent)' : '') + '<br>Écart type : ' + r2(s0.sd) + ' → <b class="mono">' + r2(s1.sd) + '</b> (= |' + s.a + '| × ' + r2(s0.sd) + ')<br>Le +b ne change pas la dispersion, le facteur a la multiplie par |a|.';
    }
    L.side.appendChild(Mini.slider('st3-a', 'Facteur a =', -3, 4, 0.5, 2, function (v) { s.a = v; draw(); }));
    L.side.appendChild(Mini.slider('st3-b', 'Décalage b =', -10, 20, 1, 5, function (v) { s.b = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  Mini.exercises(document.getElementById('exos'), window.STA_EX, 'statistiques');
  Mini.checklist(document.getElementById('checklist'), 'statistiques', [
    'Je calcule moyenne (simple et pondérée) et médiane.',
    'Je trouve Q₁ et Q₃ avec les rangs ⌈n/4⌉ et ⌈3n/4⌉.',
    'Je calcule variance et écart type.',
    'Je prévois l’effet de x ↦ ax + b sur moyenne et écart type.',
    'Je construis et lis une boîte à moustaches.',
    'Je choisis un indicateur résistant (médiane) en présence de valeurs extrêmes.',
    'Je compare deux séries en parlant du centre ET de la dispersion.'
  ]);
})();
