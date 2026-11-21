/* Mini-site Dérivation : ateliers interactifs et entraîneur. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function r5(v) { return fmt(Math.round(v * 1e5) / 1e5); }
  function lab(rootId, title, sub) {
    var el = h('<div class="lab"><h3>' + title + '<small>' + (sub || '') + '</small></h3><div class="lab-grid"><div class="lab-graph"></div><div class="lab-side"></div></div></div>');
    document.getElementById(rootId).appendChild(el);
    return { graph: el.querySelector('.lab-graph'), side: el.querySelector('.lab-side'), el: el };
  }
  var P = [
    { n: 'x²', f: 'x^2', win: [-3, 5, -2, 10], a: 1 },
    { n: 'x³ − 3x', f: 'x^3-3x', win: [-3, 3, -5, 5], a: 1.5 },
    { n: '√x', f: 'sqrt(x)', win: [-1, 6, -1, 3.5], a: 1 },
    { n: '1/x', f: '1/x', win: [-1, 6, -4, 4], a: 1 },
    { n: 'eˣ', f: 'e^x', win: [-3, 3, -1, 10], a: 0.5 },
    { n: 'sin x', f: 'sin(x)', win: [-3.5, 6.5, -2, 2], a: 1 }
  ];
  P.forEach(function (p) { p.fn = FX.compile(p.f); p.d = FX.compile(FX.derive(p.f)); p.dstr = FX.pretty(FX.toString(FX.derive(p.f))); });
  function names() { return P.map(function (p) { return 'f(x) = ' + p.n; }); }

  /* ---------- 1. De la sécante à la tangente ---------- */
  (function () {
    var L = lab('lab1', '1. De la sécante à la tangente', 'taux de variation → nombre dérivé');
    var cur = P[0], g, a = 1, hi = 2, timer = null;
    var HS = [2, 1.5, 1, 0.75, 0.5, 0.25, 0.1, 0.05, 0.01, 0.001, 0.0001];
    var out = h('<div class="readout" aria-live="polite"></div>');
    var tbl = h('<div class="readout"></div>');
    var sel = Mini.select('s-sel', 'Fonction', names(), function (i) { cur = P[i]; asl.set(cur.a); });
    var asl = Mini.slider('s-a', 'Point A : a =', -2, 4, 0.1, 1, function (v) { a = v; draw(); });
    var hsl = Mini.slider('s-h', 'Écart h =', 0, HS.length - 1, 1, 2, function (v) { hi = v; draw(); });
    var play = h('<button type="button" class="primary">▶ Faire tendre h vers 0</button>');
    play.onclick = function () {
      if (timer) { clearInterval(timer); timer = null; play.textContent = '▶ Faire tendre h vers 0'; return; }
      hsl.set(0); play.textContent = '⏸ Pause';
      timer = setInterval(function () { if (hi >= HS.length - 1) { clearInterval(timer); timer = null; play.textContent = '▶ Faire tendre h vers 0'; return; } hsl.set(hi + 1); }, 650);
    };
    L.side.appendChild(sel); L.side.appendChild(asl); L.side.appendChild(hsl); L.side.appendChild(play); L.side.appendChild(out); L.side.appendChild(tbl);
    function newGraph() { L.graph.innerHTML = ''; g = new FX.Graph(L.graph, { xmin: cur.win[0], xmax: cur.win[1], ymin: cur.win[2], ymax: cur.win[3], label: 'Courbe, sécante et tangente' }); }
    var lastCur = null;
    function draw() {
      if (cur !== lastCur) { newGraph(); lastCur = cur; }
      hsl.querySelector('output').textContent = fmt(HS[hi]);
      g.clear(); g.curve(cur.fn, BLUE);
      var fa = cur.fn(a), hh = HS[hi], fb = cur.fn(a + hh);
      if (!isFinite(fa)) { out.className = 'readout warn'; out.innerHTML = 'f n’est pas définie en a = ' + r2(a) + '. Déplace le point A.'; tbl.innerHTML = ''; return; }
      var ex = cur.d(a);
      g.slope(a, fa, ex, GREEN, { dashed: true, width: 2 });
      g.point(a, fa, ORANGE); g.label(a, fa, 'A', ORANGE, { dx: -16, dy: -10 });
      if (isFinite(fb)) {
        var m = (fb - fa) / hh;
        g.slope(a, fa, m, ORANGE, { width: 2.4 });
        g.point(a + hh, fb, PURPLE); g.label(a + hh, fb, 'B', PURPLE, { dy: -10 });
        g.line(a, fa, a + hh, fa, GREY, { dashed: true }); g.line(a + hh, fa, a + hh, fb, GREY, { dashed: true });
        out.className = 'readout';
        out.innerHTML = 'h = <b class="mono">' + fmt(hh) + '</b> : B a pour abscisse a + h = ' + r3(a + hh) + '.<br>Pente de la sécante (AB) = (f(a + h) − f(a)) / h = <b class="mono">' + r5(m) + '</b><br>Nombre dérivé exact f′(' + r2(a) + ') = <b class="mono" style="color:' + GREEN + '">' + r5(ex) + '</b><br>Écart : <b class="mono">' + r5(Math.abs(m - ex)) + '</b>';
      } else { out.className = 'readout warn'; out.innerHTML = 'B n’existe pas pour ce h : f n’est pas définie en ' + r2(a + hh) + '.'; }
      var rows = [1, 0.1, 0.01, 0.001].map(function (t) { var y = cur.fn(a + t); return '<tr><td>' + fmt(t) + '</td><td class="mono">' + (isFinite(y) ? r5((y - fa) / t) : 'non défini') + '</td></tr>'; }).join('');
      tbl.innerHTML = '<b>Taux de variation en a = ' + r2(a) + '</b><table style="margin-top:6px"><thead><tr><th>h</th><th>(f(a+h) − f(a))/h</th></tr></thead><tbody>' + rows + '</tbody></table>La colonne de droite se stabilise : c’est f′(a).';
    }
    asl.set(cur.a);
  })();

  /* ---------- 2. Tangente et défi de lecture ---------- */
  (function () {
    var L = lab('lab2', '2. Équation de la tangente et lecture du nombre dérivé', 'y = f′(a)(x − a) + f(a)');
    var cur = P[1], g, a = 1.5, challenge = null;
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sel = Mini.select('t-sel', 'Fonction', names(), function (i) { cur = P[i]; asl.set(cur.a); challenge = null; setChallengeUi(); });
    var asl = Mini.slider('t-a', 'Abscisse a =', -2, 4, 0.1, 1.5, function (v) { a = v; if (!challenge) draw(); });
    var chBtn = h('<button type="button">🎯 Défi : lire la pente</button>');
    var ans = h('<div class="ex-row" hidden><input type="text" class="ex-input" placeholder="f′(a) = ?" aria-label="Ta lecture de la pente"><button type="button" class="primary">Valider</button></div>');
    var fb = h('<div class="ex-fb" aria-live="polite"></div>');
    sel.select.value = '1';
    L.side.appendChild(sel); L.side.appendChild(asl); L.side.appendChild(chBtn); L.side.appendChild(ans); L.side.appendChild(fb); L.side.appendChild(out);
    function setChallengeUi() { ans.hidden = !challenge; asl.hidden = !!challenge; fb.className = 'ex-fb'; fb.textContent = ''; draw(); }
    chBtn.onclick = function () {
      if (challenge) { challenge = null; setChallengeUi(); return; }
      var tries = 0, x;
      do { x = Math.round((cur.win[0] + 0.8 + Math.random() * (cur.win[1] - cur.win[0] - 1.6)) * 2) / 2; tries++; } while ((!isFinite(cur.fn(x)) || Math.abs(cur.d(x)) > 6 || Math.abs(cur.fn(x)) > cur.win[3] * 0.9) && tries < 200);
      challenge = { x: x }; a = x; setChallengeUi();
    };
    ans.querySelector('button').onclick = function () {
      var v = Mini.readNumber(ans.querySelector('input').value), ex = cur.d(challenge.x);
      if (isNaN(v)) { fb.className = 'ex-fb bad'; fb.textContent = 'Écris un nombre, par exemple 1,5.'; return; }
      if (Math.abs(v - ex) <= 0.2) { fb.className = 'ex-fb good'; fb.innerHTML = 'Bien lu. Valeur exacte : f′(' + r2(challenge.x) + ') = <b>' + r3(ex) + '</b>.'; }
      else { fb.className = 'ex-fb bad'; fb.textContent = 'Pas tout à fait. Compte de combien la tangente monte quand tu avances de 1 vers la droite (triangle en pointillés).'; }
    };
    function newGraph() { L.graph.innerHTML = ''; g = new FX.Graph(L.graph, { xmin: cur.win[0], xmax: cur.win[1], ymin: cur.win[2], ymax: cur.win[3], label: 'Courbe et tangente' }); }
    var last = null;
    function draw() {
      if (cur !== last) { newGraph(); last = cur; }
      g.clear(); g.curve(cur.fn, BLUE);
      var fa = cur.fn(a);
      if (!isFinite(fa)) { out.className = 'readout warn'; out.innerHTML = 'f n’est pas définie en ' + r2(a) + '.'; return; }
      var m = cur.d(a);
      g.slope(a, fa, m, ORANGE, { width: 2.4 }); g.point(a, fa, ORANGE);
      if (challenge) {
        g.line(a, fa, a + 1, fa, GREY, { dashed: true }); g.line(a + 1, fa, a + 1, fa + m, GREY, { dashed: true }); g.label(a + 0.5, fa, '1', GREY, { dy: 16, dx: -3 });
        out.className = 'readout'; out.innerHTML = 'Le point A(' + r2(a) + ' ; ' + r2(fa) + ') est marqué. Lis la <b>pente de la tangente</b> : de combien monte-t-elle (ou descend-elle) quand x augmente de 1 ?';
      } else {
        var pv = Math.round((fa - m * a) * 100) / 100;
        out.className = 'readout';
        out.innerHTML = 'f(' + r2(a) + ') = <b class="mono">' + r3(fa) + '</b> (hauteur du point)<br>f′(' + r2(a) + ') = <b class="mono">' + r3(m) + '</b> (pente)<br>Tangente : <b class="mono">y = ' + r3(m) + '(x − ' + r2(a) + ') + ' + r3(fa) + '</b><br>soit environ <b class="mono">y = ' + r3(m) + 'x ' + (pv < 0 ? '− ' + r2(Math.abs(pv)) : '+ ' + r2(pv)) + '</b><br>Fonction dérivée : f′(x) = ' + cur.dstr;
      }
    }
    asl.set(cur.a);
  })();

  /* ---------- 3. Approximation affine ---------- */
  (function () {
    var L = lab('lab3', '3. Approximation affine : f(a + h) ≈ f(a) + f′(a)·h', 'nouveauté du programme 2026');
    var cases = [
      { n: '√x en a = 1', f: P[2], a: 1, hmin: -0.5, hmax: 0.5, step: 0.01, h: 0.04 },
      { n: 'eˣ en a = 0', f: P[4], a: 0, hmin: -0.5, hmax: 0.5, step: 0.01, h: 0.1 },
      { n: '1/x en a = 1', f: P[3], a: 1, hmin: -0.4, hmax: 0.4, step: 0.01, h: 0.05 },
      { n: 'x² en a = 2', f: P[0], a: 2, hmin: -0.5, hmax: 0.5, step: 0.01, h: 0.1 }
    ];
    var cur = cases[0], g, hh = 0.04;
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sel = Mini.select('ap-sel', 'Cas', cases.map(function (c) { return c.n; }), function (i) { cur = cases[i]; hsl.input.min = cur.hmin; hsl.input.max = cur.hmax; hsl.input.step = cur.step; newGraph(); hsl.set(cur.h); });
    var hsl = Mini.slider('ap-h', 'Écart h =', -0.5, 0.5, 0.01, 0.04, function (v) { hh = v; draw(); });
    L.side.appendChild(sel); L.side.appendChild(hsl); L.side.appendChild(out);
    function newGraph() {
      L.graph.innerHTML = '';
      var a = cur.a, f = cur.f.fn, w = 0.7, ys = [];
      for (var i = 0; i <= 40; i++) { var y = f(a - w + 2 * w * i / 40); if (isFinite(y)) ys.push(y); }
      var lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys), pad = (hi - lo) * 0.25 + 0.05;
      g = new FX.Graph(L.graph, { xmin: a - w, xmax: a + w, ymin: lo - pad, ymax: hi + pad, label: 'Courbe et tangente autour de a' });
    }
    function draw() {
      if (!g) newGraph();
      g.clear(); var a = cur.a, f = cur.f.fn, d = cur.f.d;
      g.curve(f, BLUE); g.slope(a, f(a), d(a), ORANGE, { width: 2 });
      var ex = f(a + hh), ap = f(a) + d(a) * hh;
      g.point(a, f(a), ORANGE, { r: 4 });
      g.point(a + hh, ex, BLUE); g.point(a + hh, ap, ORANGE, { open: true });
      g.line(a + hh, ex, a + hh, ap, PURPLE, { width: 2.5 });
      out.className = 'readout';
      out.innerHTML = 'f(a) = <b class="mono">' + r5(f(a)) + '</b>, f′(a) = <b class="mono">' + r5(d(a)) + '</b><br>Valeur exacte f(a + h) = <b class="mono">' + r5(ex) + '</b><br>Approximation f(a) + f′(a)·h = <b class="mono">' + r5(ap) + '</b><br>Erreur : <b class="mono">' + r5(Math.abs(ex - ap)) + '</b>' + (Math.abs(hh) > 1e-9 ? ' (' + r3(Math.abs(ex - ap) / Math.abs(ex) * 100) + ' % de la valeur)' : '') + '<br>Plus |h| est petit, plus l’erreur est minuscule : elle diminue plus vite que h.';
    }
    newGraph(); hsl.set(cur.h);
  })();

  /* ---------- 4. f et f′ : le signe de f′ commande les variations ---------- */
  (function () {
    var L = lab('lab4', '4. Le signe de f′ commande les variations de f', 'courbe de f en haut, courbe de f′ en bas');
    var presets = [
      { n: 'x³ − 3x', f: 'x^3-3x', lo: -3, hi: 3 },
      { n: 'x·eˣ', f: 'x*e^x', lo: -4, hi: 2 },
      { n: '−x² + 4x', f: '-x^2+4x', lo: -1, hi: 5 },
      { n: 'x⁴ − 2x²', f: 'x^4-2x^2', lo: -2, hi: 2 }
    ];
    var cur, f, d, g1, g2, xv = 0;
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sel = Mini.select('fp-sel', 'Fonction', presets.map(function (p) { return 'f(x) = ' + p.n; }), function (i) { set(presets[i]); });
    var xsl = Mini.slider('fp-x', 'Point x =', -3, 3, 0.05, 0, function (v) { xv = v; draw(); });
    L.side.appendChild(sel); L.side.appendChild(xsl); L.side.appendChild(out);
    var box = h('<div style="overflow:auto;padding:0 12px 14px"></div>'); L.el.appendChild(box);
    function set(p) {
      cur = p; f = FX.compile(p.f); d = FX.compile(FX.derive(p.f));
      xsl.input.min = p.lo; xsl.input.max = p.hi; xv = (p.lo + p.hi) / 2;
      var ys = [], ds = [], i, x;
      for (i = 0; i <= 200; i++) { x = p.lo + (p.hi - p.lo) * i / 200; if (isFinite(f(x))) ys.push(f(x)); if (isFinite(d(x))) ds.push(d(x)); }
      function rng(a) { var lo = Math.min.apply(null, a), hi = Math.max.apply(null, a), pad = (hi - lo) * 0.12 + 0.2; return [lo - pad, hi + pad]; }
      var yr = rng(ys), dr = rng(ds);
      L.graph.innerHTML = '';
      var c1 = h('<div></div>'), c2 = h('<div style="margin-top:8px"></div>'); L.graph.appendChild(c1); L.graph.appendChild(c2);
      g1 = new FX.Graph(c1, { width: 640, height: 250, xmin: p.lo, xmax: p.hi, ymin: yr[0], ymax: yr[1], label: 'Courbe de f' });
      g2 = new FX.Graph(c2, { width: 640, height: 200, xmin: p.lo, xmax: p.hi, ymin: dr[0], ymax: dr[1], label: 'Courbe de la dérivée f prime' });
      var vt = Mini.variationTable(f, p.lo, p.hi, { df: d });
      box.innerHTML = '<p style="margin:10px 0 0"><b>Dérivée :</b> f′(x) = ' + FX.pretty(FX.toString(FX.derive(p.f))) + '</p>' + vt.html;
      xsl.set(xv);
    }
    function draw() {
      if (!g1) return;
      g1.clear(); g2.clear(); g1.curve(f, BLUE); g2.curve(d, PURPLE);
      var y = f(xv), m = d(xv);
      g1.slope(xv, y, m, ORANGE, { width: 2 }); g1.point(xv, y, ORANGE);
      g2.point(xv, m, ORANGE); g2.line(xv, 0, xv, m, ORANGE, { dashed: true });
      g1.label(g1.xmin, g1.ymax, 'f', BLUE, { dx: 10, dy: 16 }); g2.label(g2.xmin, g2.ymax, 'f′', PURPLE, { dx: 10, dy: 16 });
      var tol = 1e-6;
      out.className = 'readout';
      out.innerHTML = 'x = <b class="mono">' + r2(xv) + '</b><br>f′(x) = <b class="mono">' + r3(m) + '</b> ' + (m > tol ? '<span class="okk"><b>&gt; 0</b> : f monte ↗</span>' : m < -tol ? '<span class="ko"><b>&lt; 0</b> : f descend ↘</span>' : '<b>= 0</b> : tangente horizontale') + '<br>Quand la courbe du bas passe <b>sous</b> l’axe, la courbe du haut <b>descend</b>. Là où f′ s’annule en changeant de signe, f a un extremum.';
    }
    set(presets[0]);
  })();

  /* ---------- 5. Zoom : dérivable ou non ---------- */
  (function () {
    var L = lab('lab5', '5. Zoom : une courbe dérivable finit par ressembler à une droite', 'dérivable ≠ continue');
    var cases = [
      { n: 'x² en 1 (courbe lisse)', f: 'x^2', a: 1, w: 2, verdict: 'Dérivable : de près, la courbe se confond avec sa tangente. Les pentes à gauche et à droite tendent vers la même valeur, f′(1) = 2.' },
      { n: '|x − 1| en 1 (un coin)', f: 'abs(x-1)', a: 1, w: 2, verdict: 'Non dérivable : même très zoomée, la courbe garde son coin. Pente à gauche −1, pente à droite +1 : elles ne se rejoignent jamais. Pourtant f est continue en 1.' },
      { n: '√x en 0 (tangente verticale)', f: 'sqrt(x)', a: 0, w: 2, verdict: 'Non dérivable en 0 : la pente de la sécante (√h / h = 1/√h) grandit sans limite quand h tend vers 0. La tangente est verticale.' }
    ];
    var cur = cases[0], g, z = 0;
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sel = Mini.select('z-sel', 'Cas', cases.map(function (c) { return c.n; }), function (i) { cur = cases[i]; draw(); });
    var zsl = Mini.slider('z-z', 'Zoom ×', 0, 3, 0.05, 0, function (v) { z = v; draw(); });
    zsl.querySelector('output').style.display = 'none';
    var zl = h('<div class="readout" id="z-factor"></div>');
    L.side.appendChild(sel); L.side.appendChild(zsl); L.side.appendChild(zl); L.side.appendChild(out);
    function draw() {
      var f = FX.compile(cur.f), k = Math.pow(10, z), w = cur.w / k;
      var yc = f(cur.a), ratio = 0.62;
      L.graph.innerHTML = '';
      g = new FX.Graph(L.graph, { xmin: cur.a - w, xmax: cur.a + w, ymin: yc - w * ratio * 1.3, ymax: yc + w * ratio * 1.3, label: 'Courbe zoomée autour du point' });
      g.curve(f, BLUE, { joinJumps: true }); g.point(cur.a, yc, ORANGE);
      var sl = (yc - f(cur.a - w * 0.9)) / (w * 0.9), sr = (f(cur.a + w * 0.9) - yc) / (w * 0.9);
      zl.innerHTML = 'Zoom : <b class="mono">×' + (k >= 100 ? Math.round(k) : r2(k)) + '</b> (fenêtre de largeur ' + (2 * w).toPrecision(2) + ')';
      out.className = 'readout';
      out.innerHTML = 'Pente à gauche du point : <b class="mono">' + (isFinite(sl) ? r3(sl) : 'non définie') + '</b><br>Pente à droite du point : <b class="mono">' + r3(sr) + '</b><br>' + (z > 2 ? '<b>' + cur.verdict + '</b>' : 'Augmente le zoom pour observer ce qui se passe.');
    }
    draw();
  })();

  /* ---------- 6. Optimisation ---------- */
  (function () {
    var L = lab('lab6', '6. Optimiser : où la pente s’annule', 'maximum, minimum, problème concret');
    var cases = [
      { n: 'Enclos adossé à un mur (40 m de grillage)', f: 'x*(40-2x)', lo: 0, hi: 20, win: [0, 20, -20, 220], u: 'm²', lab: 'largeur x (m)', best: 10,
        steps: 'A(x) = x(40 − 2x) = 40x − 2x² sur [0 ; 20].<br>A′(x) = 40 − 4x = 4(10 − x).<br>A′ &gt; 0 sur [0 ; 10[, A′ &lt; 0 sur ]10 ; 20] : A est maximale en x = 10.<br><b>A(10) = 200 m².</b> L’enclos est 10 m × 20 m.' },
      { n: 'Boîte sans couvercle dans une feuille de 30 cm', f: 'x*(30-2x)^2', lo: 0, hi: 15, win: [0, 15, -100, 2300], u: 'cm³', lab: 'côté x des carrés découpés (cm)', best: 5,
        steps: 'V(x) = x(30 − 2x)² sur [0 ; 15].<br>V′(x) = (30 − 2x)² + x·2(30 − 2x)(−2) = (30 − 2x)(30 − 6x) = 6(15 − x)(5 − x)·2.<br>Signe : V′ &gt; 0 sur [0 ; 5[, V′ &lt; 0 sur ]5 ; 15[ : maximum en x = 5.<br><b>V(5) = 5 × 20² = 2000 cm³.</b>' },
      { n: 'Bénéfice d’une entreprise (en centaines d’euros)', f: '-x^2+60x-500', lo: 0, hi: 60, win: [0, 60, -600, 500], u: '(centaines d’€)', lab: 'quantité produite x', best: 30,
        steps: 'B(x) = −x² + 60x − 500 sur [0 ; 60].<br>B′(x) = −2x + 60 = −2(x − 30).<br>B′ &gt; 0 avant 30, &lt; 0 après : maximum en x = 30.<br><b>B(30) = 400</b> soit 40 000 €.' }
    ];
    var cur = cases[0], f, g, xv = 5;
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sel = Mini.select('o-sel', 'Problème', cases.map(function (c) { return c.n; }), function (i) { cur = cases[i]; set(); });
    var xsl = Mini.slider('o-x', 'x =', 0, 20, 0.1, 5, function (v) { xv = v; draw(); });
    var rev = h('<button type="button">Voir la résolution avec la dérivée</button>');
    var sol = h('<div class="readout" hidden></div>');
    rev.onclick = function () { sol.hidden = !sol.hidden; rev.textContent = sol.hidden ? 'Voir la résolution avec la dérivée' : 'Masquer la résolution'; };
    L.side.appendChild(sel); L.side.appendChild(xsl); L.side.appendChild(out); L.side.appendChild(rev); L.side.appendChild(sol);
    function set() {
      f = FX.compile(cur.f); xsl.input.min = cur.lo; xsl.input.max = cur.hi; xsl.input.step = (cur.hi - cur.lo) / 200; xv = cur.lo + (cur.hi - cur.lo) * 0.25;
      L.graph.innerHTML = ''; g = new FX.Graph(L.graph, { xmin: cur.win[0], xmax: cur.win[1], ymin: cur.win[2], ymax: cur.win[3], label: 'Fonction à optimiser' });
      sol.innerHTML = cur.steps; sol.hidden = true; rev.textContent = 'Voir la résolution avec la dérivée'; xsl.set(xv);
    }
    function draw() {
      if (!g) return; g.clear(); g.curve(f, BLUE);
      var y = f(xv), m = FX.numDiff(f, xv, 1e-5);
      g.slope(xv, y, m, ORANGE, { width: 2 }); g.point(xv, y, ORANGE);
      var near = Math.abs(m) < (cur.win[3] - cur.win[2]) / (cur.hi - cur.lo) * 0.04;
      out.className = 'readout' + (near ? '' : '');
      out.innerHTML = cur.lab + ' = <b class="mono">' + r2(xv) + '</b><br>Valeur = <b class="mono">' + r2(y) + '</b> ' + cur.u + '<br>Pente de la tangente = <b class="mono">' + r2(m) + '</b> ' + (near ? '<span class="okk"><b>≈ 0 : tu es au sommet.</b></span>' : m > 0 ? '(f monte : continue vers la droite)' : '(f descend : recule)') + '<br>Cherche la position où la tangente est horizontale.';
    }
    set();
  })();

  /* ---------- Entraîneur : Dérive-moi ---------- */
  (function () {
    var root = document.getElementById('trainer');
    var level = 1, cur = null, streak = 0, best = +(Mini.load('derivation:trainer').best || 0), solved = false;
    var ri = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
    var nz = function (a, b) { var v = 0; while (v === 0) v = ri(a, b); return v; };
    function term(c, body) { return (c === 1 ? '' : c === -1 ? '-' : String(c)) + body; }
    function join(parts) { return parts.filter(Boolean).reduce(function (s, p) { return s ? (p.charAt(0) === '-' ? s + ' - ' + p.slice(1) : s + ' + ' + p) : p; }, ''); }
    var GEN = {
      1: [
        function () { return { f: join([term(nz(-5, 6), 'x^' + ri(2, 4)), term(nz(-6, 6), 'x'), String(nz(-9, 9))]), lo: -4, hi: 4 }; },
        function () { return { f: join([term(nz(1, 5), 'x^3'), term(nz(-5, 5), 'x^2'), term(nz(-6, 6), 'x')]), lo: -4, hi: 4 }; }
      ],
      2: [
        function () { return { f: join([term(nz(1, 5), 'sqrt(x)'), term(nz(-4, 4), 'x^2')]), lo: 0.3, hi: 6 }; },
        function () { return { f: join([term(nz(1, 6), '/x').replace(/^(-?)(\d*)\/x$/, function (m, s, d) { return (s ? '-' : '') + (d || '1') + '/x'; }), term(nz(-4, 4), 'x')]), lo: 0.3, hi: 6 }; },
        function () { return { f: join([term(nz(1, 4), 'e^x'), term(nz(-5, 5), 'x')]), lo: -3, hi: 3 }; }
      ],
      3: [
        function () { return { f: '(' + term(nz(1, 4), 'x') + ' + ' + ri(1, 5) + ')(x^2 - ' + ri(1, 6) + ')', lo: -4, hi: 4 }; },
        function () { return { f: '(' + term(nz(1, 5), 'x') + ' - ' + ri(1, 4) + ')/(x + ' + ri(1, 4) + ')', lo: 0.3, hi: 6 }; },
        function () { return { f: term(ri(1, 3), 'x') + 'e^x', lo: -3, hi: 3 }; },
        function () { return { f: 'x^2 e^x', lo: -3, hi: 3 }; },
        function () { return { f: 'x sqrt(x)', lo: 0.3, hi: 6 }; }
      ],
      4: [
        function () { return { f: '(' + term(ri(2, 5), 'x') + ' + ' + ri(1, 5) + ')^' + ri(3, 5), lo: -2, hi: 2 }; },
        function () { return { f: 'e^(' + term(nz(-4, 4), 'x') + ' + ' + ri(1, 3) + ')', lo: -2, hi: 2 }; },
        function () { return { f: 'sqrt(' + term(ri(2, 5), 'x') + ' + ' + ri(1, 6) + ')', lo: 0.3, hi: 6 }; },
        function () { return { f: '(' + ri(1, 3) + 'x + ' + ri(1, 3) + ')e^(' + nz(-3, 3) + 'x)', lo: -2, hi: 2 }; },
        function () { return { f: 'cos(' + ri(2, 4) + 'x + ' + ri(0, 3) + ')', lo: -3, hi: 3 }; }
      ]
    };
    var chips = h('<div class="chips" role="group" aria-label="Niveau"></div>');
    [['1', 'Niveau 1 · polynômes'], ['2', 'Niveau 2 · racine, inverse, exp'], ['3', 'Niveau 3 · produits, quotients'], ['4', 'Niveau 4 · composées']].forEach(function (l) {
      var b = h('<button type="button" data-l="' + l[0] + '" aria-pressed="' + (l[0] === '1') + '">' + l[1] + '</button>');
      b.onclick = function () { level = +l[0]; chips.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); streak = 0; next(); };
      chips.appendChild(b);
    });
    var stmt = h('<div class="card" style="margin:14px 0"><div style="font-size:12px;color:#7a8499;letter-spacing:1px;font-weight:700">DÉRIVE</div><div id="t-f" class="mono" style="font-size:26px;margin:8px 0;overflow-wrap:anywhere"></div></div>');
    var row = h('<div class="ex-row"><span class="mono" style="align-self:center;font-size:18px">f′(x) =</span><input type="text" class="ex-input" id="t-in" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Ta dérivée"><button type="button" class="primary" id="t-ok">Vérifier</button><button type="button" id="t-new">Autre fonction</button></div>');
    var fb = h('<div class="ex-fb" aria-live="polite"></div>');
    var score = h('<div class="readout"></div>');
    var tip = h('<p class="ex-tip">Écris <code>x^2</code>, <code>sqrt(x)</code>, <code>e^(2x+1)</code>, <code>(x+1)/(x-2)</code>, <code>cos(3x)</code>. Toute forme équivalente est acceptée, développée ou non.</p>');
    [chips, stmt, row, tip, fb, score].forEach(function (e) { root.appendChild(e); });
    var inp = row.querySelector('#t-in');
    function next() {
      var list = GEN[level], g = list[Math.floor(Math.random() * list.length)]();
      cur = g; solved = false; document.getElementById('t-f').innerHTML = 'f(x) = ' + FX.pretty(g.f).replace(/\*/g, '·');
      inp.value = ''; fb.className = 'ex-fb'; fb.textContent = ''; showScore(); inp.focus({ preventScroll: true });
    }
    function showScore() { score.innerHTML = 'Série en cours : <b>' + streak + '</b> · meilleure série : <b>' + best + '</b>'; }
    function check() {
      var v = inp.value.trim(); if (!v) return;
      var c; try { c = FX.compile(v); } catch (e) { fb.className = 'ex-fb bad'; fb.textContent = 'Expression illisible : ' + e.message; return; }
      var truth = FX.derive(cur.f);
      if (FX.equivalent(c, FX.compile(truth), { lo: cur.lo, hi: cur.hi })) {
        if (!solved) { streak++; if (streak > best) { best = streak; Mini.save('derivation:trainer', { best: best }); } }
        solved = true; fb.className = 'ex-fb good'; fb.innerHTML = 'Correct. Une forme possible : <b class="mono">' + FX.pretty(FX.toString(truth)) + '</b>'; showScore();
      } else {
        streak = 0; showScore(); fb.className = 'ex-fb bad';
        fb.innerHTML = 'Pas équivalent. Vérifie la règle utilisée, puis le calcul. <button type="button" id="t-show" style="min-height:34px;padding:4px 10px">Voir la réponse</button>';
        document.getElementById('t-show').onclick = function () { fb.className = 'ex-fb hint'; fb.innerHTML = 'Réponse : <b class="mono">f′(x) = ' + FX.pretty(FX.toString(truth)) + '</b>'; };
      }
    }
    row.querySelector('#t-ok').onclick = check; inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    row.querySelector('#t-new').onclick = function () { if (!solved) streak = 0; next(); };
    next();
  })();

  /* ---------- Exercices, checklist, réinitialisation ---------- */
  Mini.exercises(document.getElementById('exos'), window.DER_EX, 'derivation');
  Mini.checklist(document.getElementById('checklist'), 'derivation', [
    'Je sais calculer un taux de variation et l’interpréter comme pente d’une sécante.',
    'Je sais définir le nombre dérivé comme limite du taux de variation.',
    'Je donne l’équation d’une tangente sans oublier f(a).',
    'Je connais les dérivées usuelles et les règles (somme, produit, quotient, g(ax + b)).',
    'Je factorise f′ avant d’étudier son signe.',
    'Je dresse un tableau de variations complet et je conclus par une phrase.',
    'Je modélise et résous un problème d’optimisation.',
    'Je sais refaire la démonstration de (x²)′ = 2x et (1/x)′ = −1/x².',
    'Je sais pourquoi dérivable implique continue, et pourquoi la réciproque est fausse.'
  ]);
  document.getElementById('reset').onclick = function () {
    if (!confirm('Effacer ta progression sur ce chapitre ?')) return;
    Mini.save('derivation', {}); Mini.save('derivation:check', {}); Mini.save('derivation:trainer', {}); location.reload();
  };
})();
