/* Mini-site Second degré : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function sgn(v) { return v < 0 ? '− ' + r2(-v) : '+ ' + r2(v); }
  function roots(a, b, c) { var D = b * b - 4 * a * c; if (D < -1e-12) return []; if (Math.abs(D) < 1e-12) return [-b / (2 * a)]; var s = Math.sqrt(D); return [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort(function (x, y) { return x - y; }); }

  /* 1. Explorer le trinôme */
  Mini.paramLab('lab1', {
    title: '1. Explorer ax² + bx + c', sub: 'discriminant, racines, sommet', label: 'Parabole de ax² + bx + c',
    params: [{ k: 'a', label: 'a =', min: -3, max: 3, step: 0.5, val: 1 }, { k: 'b', label: 'b =', min: -6, max: 6, step: 0.5, val: -2 }, { k: 'c', label: 'c =', min: -6, max: 6, step: 0.5, val: -3 }],
    curves: [{ expr: 'a*x^2+b*x+c', color: BLUE }],
    win: [-6, 6, -8, 8],
    handles: [{ id: 'S', color: PURPLE, params: ['b', 'c'], pos: function (v) { if (v.a === 0) return null; var al = -v.b / (2 * v.a); return { x: al, y: v.a * al * al + v.b * al + v.c }; }, vals: function (x, y, v) { return [-2 * v.a * x, y + v.a * x * x]; } }],
    presets: [{ name: 'Deux racines : x² − 2x − 3', vals: { a: 1, b: -2, c: -3 } }, { name: 'Racine double : x² − 4x + 4', vals: { a: 1, b: -4, c: 4 } }, { name: 'Aucune racine : x² + 2x + 3', vals: { a: 1, b: 2, c: 3 } }, { name: 'Ouverte vers le bas : −x² + 4', vals: { a: -1, b: 0, c: 4 } }],
    extra: function (g, v) {
      if (v.a === 0) return;
      var al = -v.b / (2 * v.a), be = v.a * al * al + v.b * al + v.c;
      g.line(al, -8, al, 8, GREY, { dashed: true }); g.point(al, be, PURPLE, { r: 6 });
      roots(v.a, v.b, v.c).forEach(function (x) { g.point(x, 0, GREEN, { r: 6 }); });
    },
    readout: function (v) {
      if (v.a === 0) return '<b>a = 0 : ce n’est plus un trinôme du second degré</b> (c’est une droite). Choisis a ≠ 0.';
      var D = v.b * v.b - 4 * v.a * v.c, al = -v.b / (2 * v.a), be = v.a * al * al + v.b * al + v.c, R = roots(v.a, v.b, v.c);
      return 'f(x) = ' + r2(v.a) + 'x² ' + sgn(v.b) + 'x ' + sgn(v.c) + '<br>Δ = b² − 4ac = <b class="mono">' + r2(D) + '</b> ' + (D > 1e-12 ? '&gt; 0 : <b>deux racines</b>' : D < -1e-12 ? '&lt; 0 : <b>aucune racine réelle</b>' : '= 0 : <b>une racine double</b>') +
        (R.length ? '<br>Racines (points verts) : ' + R.map(function (x) { return '<b class="mono">' + r3(x) + '</b>'; }).join(' et ') : '') +
        '<br>Sommet (point violet) : S(<b class="mono">' + r3(al) + '</b> ; <b class="mono">' + r3(be) + '</b>), axe x = ' + r3(al) + '<br>' + (v.a > 0 ? 'a &gt; 0 : parabole en U, minimum ' + r3(be) : 'a &lt; 0 : parabole en ∩, maximum ' + r3(be)) + '<br>f(0) = c = ' + r2(v.c) + ' (ordonnée à l’origine).';
    }
  });

  /* 2. Forme canonique a(x − α)² + β */
  Mini.paramLab('lab2', {
    title: '2. Forme canonique : a(x − α)² + β', sub: 'le sommet se lit directement', label: 'Parabole en forme canonique',
    params: [{ k: 'a', label: 'a =', min: -3, max: 3, step: 0.5, val: 1 }, { k: 'p', label: 'α (abscisse du sommet) =', min: -4, max: 4, step: 0.5, val: 2 }, { k: 'q', label: 'β (ordonnée du sommet) =', min: -6, max: 6, step: 0.5, val: -1 }],
    curves: [{ expr: 'a*(x-p)^2+q', color: BLUE }],
    win: [-6, 6, -8, 8],
    handles: [{ id: 'S', color: PURPLE, params: ['p', 'q'], pos: function (v) { return { x: v.p, y: v.q }; }, vals: function (x, y) { return [x, y]; } }],
    extra: function (g, v) { g.line(v.p, -8, v.p, 8, GREY, { dashed: true }); g.point(v.p, v.q, PURPLE, { r: 6.5 }); },
    readout: function (v) {
      if (v.a === 0) return '<b>a = 0 : choisis a ≠ 0.</b>';
      var b = -2 * v.a * v.p, c = v.a * v.p * v.p + v.q, D = b * b - 4 * v.a * c;
      return 'Canonique : f(x) = ' + r2(v.a) + '(x ' + sgn(-v.p) + ')² ' + sgn(v.q) + '<br>Développée : f(x) = ' + r2(v.a) + 'x² ' + sgn(b) + 'x ' + sgn(c) + '<br>Dictionnaire : b = −2aα = <b class="mono">' + r2(b) + '</b>, c = aα² + β = <b class="mono">' + r2(c) + '</b>.<br>Retour : α = −b/(2a) = <b class="mono">' + r2(-b / (2 * v.a)) + '</b>, β = f(α) = <b class="mono">' + r2(v.q) + '</b>.<br>Δ = b² − 4ac = <b class="mono">' + r2(D) + '</b> : ' + (v.a * v.q < 0 ? 'le sommet est de l’autre côté de l’axe que l’ouverture, donc deux racines.' : Math.abs(v.q) < 1e-9 ? 'le sommet est sur l’axe : racine double.' : 'le sommet est du même côté que l’ouverture : aucune racine.');
    }
  });

  /* 3. Signe et inéquation */
  (function () {
    var L = Mini.makeLab('lab3', '3. Signe du trinôme et inéquations', 'lire l’ensemble solution');
    var g = new FX.Graph(L.graph, { xmin: -6, xmax: 6, ymin: -8, ymax: 8, label: 'Parabole et zone solution' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { a: 1, b: -1, c: -6 }, mode = 3;
    var ops = ['f(x) > 0', 'f(x) ≥ 0', 'f(x) < 0', 'f(x) ≤ 0'];
    function setText(R, a, op) {
      var pos = op < 2, strict = (op === 0 || op === 2); // 0: >, 1: >=, 2: <, 3: <=
      var L_ = strict ? ']' : '[', R_ = strict ? '[' : ']';
      var wantPositive = pos, aPos = a > 0;
      if (!R.length) { var always = (wantPositive === aPos); return always ? 'ℝ tout entier (Δ &lt; 0 : f garde le signe de a)' : '∅ (aucune solution)'; }
      if (R.length === 1) {
        var r = r2(R[0]);
        if (wantPositive === aPos) return strict ? 'ℝ \\ {' + r + '}' : 'ℝ tout entier';
        return strict ? '∅ (aucune solution)' : '{' + r + '}';
      }
      var x1 = r2(R[0]), x2 = r2(R[1]);
      var outside = (wantPositive === aPos);
      if (outside) return ']−∞ ; ' + x1 + (strict ? '[' : ']') + ' ∪ ' + (strict ? ']' : '[') + x2 + ' ; +∞[';
      return (strict ? ']' : '[') + x1 + ' ; ' + x2 + (strict ? '[' : ']');
    }
    function draw() {
      var R = roots(s.a, s.b, s.c), op = mode, f = function (x) { return s.a * x * x + s.b * x + s.c; };
      g.clear(); g.line(-6, 0, 6, 0, GREY, { width: 1 });
      // zone solution : balayage fin
      var steps = 600, prev = null, start = null, strict = (op === 0 || op === 2), wantPos = op < 2;
      function ok(x) { var v = f(x); return wantPos ? (strict ? v > 1e-12 : v >= -1e-12) : (strict ? v < -1e-12 : v <= 1e-12); }
      for (var i = 0; i <= steps; i++) {
        var x = -6 + 12 * i / steps, o = ok(x);
        if (o && start === null) start = x;
        if ((!o || i === steps) && start !== null) { g.rect(start, o ? x : x - 12 / steps, -0.15, 0.15, GREEN, { opacity: 0.55 }); start = null; }
      }
      g.curve(f, BLUE);
      R.forEach(function (x) { g.point(x, 0, PURPLE, { r: 6, open: !(op === 1 || op === 3) }); });
      if (s.a === 0) { out.innerHTML = '<b>a = 0 : choisis a ≠ 0.</b>'; return; }
      var D = s.b * s.b - 4 * s.a * s.c;
      out.innerHTML = 'f(x) = ' + r2(s.a) + 'x² ' + sgn(s.b) + 'x ' + sgn(s.c) + ', Δ = <b class="mono">' + r2(D) + '</b>' + (R.length ? ', racines ' + R.map(function (x) { return '<b class="mono">' + r2(x) + '</b>'; }).join(' et ') : '') + '<br>Inéquation <b>' + ops[op] + '</b><br>Solution (bande verte sur l’axe) : <b>' + setText(R, s.a, op) + '</b><br>Point plein = racine incluse (inégalité large), point creux = racine exclue.';
    }
    var opSel = Mini.select('p3-op', 'Inéquation', ops, function (i) { mode = i; draw(); });
    opSel.select.value = '3';
    L.side.appendChild(opSel);
    L.side.appendChild(Mini.slider('p3-a', 'a =', -3, 3, 0.5, 1, function (v) { s.a = v; draw(); }));
    L.side.appendChild(Mini.slider('p3-b', 'b =', -6, 6, 0.5, -1, function (v) { s.b = v; draw(); }));
    L.side.appendChild(Mini.slider('p3-c', 'c =', -8, 8, 0.5, -6, function (v) { s.c = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 4. Somme et produit */
  Mini.paramLab('lab4', {
    title: '4. Somme et produit des racines', sub: 'construire un trinôme de racines données', label: 'Parabole de racines x1 et x2',
    params: [{ k: 'r', label: 'Racine x₁ =', min: -5, max: 5, step: 0.5, val: -1 }, { k: 's', label: 'Racine x₂ =', min: -5, max: 5, step: 0.5, val: 3 }],
    curves: [{ expr: '(x-r)*(x-s)', color: BLUE }],
    win: [-6, 6, -8, 8],
    handles: [{ id: 'x1', color: GREEN, params: ['r'], pos: function (v) { return { x: v.r, y: 0 }; }, vals: function (x) { return [x]; }, move: function (x) { return { x: x, y: 0 }; } }, { id: 'x2', color: ORANGE, params: ['s'], pos: function (v) { return { x: v.s, y: 0 }; }, vals: function (x) { return [x]; }, move: function (x) { return { x: x, y: 0 }; } }],
    extra: function (g, v) { g.point(v.r, 0, GREEN, { r: 6.5 }); g.point(v.s, 0, GREEN, { r: 6.5 }); g.line((v.r + v.s) / 2, -8, (v.r + v.s) / 2, 8, GREY, { dashed: true }); },
    readout: function (v) {
      var S = v.r + v.s, P = v.r * v.s;
      return 'f(x) = (x − ' + r2(v.r) + ')(x − ' + r2(v.s) + ') = x² ' + sgn(-S) + 'x ' + sgn(P) + '<br>Somme S = x₁ + x₂ = <b class="mono">' + r2(S) + '</b> = −b/a<br>Produit P = x₁ × x₂ = <b class="mono">' + r2(P) + '</b> = c/a<br>Le trinôme est <b>x² − S·x + P</b> : lis S et P sur la forme développée pour retrouver les racines.<br>Axe de symétrie : x = (x₁ + x₂)/2 = <b class="mono">' + r2(S / 2) + '</b> (pointillé).';
    }
  });

  /* 5. Changement d'inconnue */
  Mini.paramLab('lab5', {
    title: '5. Se ramener au second degré : ax⁴ + bx² + c', sub: 'X = x², puis retour à x', label: 'Courbe de ax4 + bx2 + c',
    params: [{ k: 'a', label: 'a =', min: -2, max: 2, step: 0.5, val: 1 }, { k: 'b', label: 'b =', min: -8, max: 8, step: 0.5, val: -5 }, { k: 'c', label: 'c =', min: -6, max: 8, step: 0.5, val: 4 }],
    curves: [{ expr: 'a*x^4+b*x^2+c', color: BLUE }],
    win: [-4, 4, -10, 10],
    presets: [{ name: 'x⁴ − 5x² + 4 : 4 solutions', vals: { a: 1, b: -5, c: 4 } }, { name: 'x⁴ + x² − 2 : 2 solutions', vals: { a: 1, b: 1, c: -2 } }, { name: 'x⁴ + 2x² + 1 : 0 solution', vals: { a: 1, b: 2, c: 1 } }, { name: 'x⁴ − 4x² : 3 solutions', vals: { a: 1, b: -4, c: 0 } }],
    extra: function (g, v) {
      if (v.a === 0) return;
      roots(v.a, v.b, v.c).forEach(function (X) { if (X > 1e-12) { g.point(Math.sqrt(X), 0, GREEN, { r: 6 }); g.point(-Math.sqrt(X), 0, GREEN, { r: 6 }); } else if (Math.abs(X) <= 1e-12) g.point(0, 0, GREEN, { r: 6 }); });
    },
    readout: function (v) {
      if (v.a === 0) return '<b>a = 0 : choisis a ≠ 0.</b>';
      var R = roots(v.a, v.b, v.c), D = v.b * v.b - 4 * v.a * v.c, sol = [];
      R.forEach(function (X) { if (X > 1e-12) { sol.push(Math.sqrt(X)); sol.push(-Math.sqrt(X)); } else if (Math.abs(X) <= 1e-12) sol.push(0); });
      var txt = 'Avec X = x² : ' + r2(v.a) + 'X² ' + sgn(v.b) + 'X ' + sgn(v.c) + ' = 0, Δ = <b class="mono">' + r2(D) + '</b><br>' + (R.length ? 'Valeurs de X : ' + R.map(function (X) { return '<b class="mono">' + r3(X) + '</b>' + (X < -1e-12 ? ' (négative : impossible, x² ≥ 0)' : ''); }).join(' ; ') : 'Aucune valeur de X.');
      return txt + '<br>Retour à x : <b>' + sol.length + ' solution' + (sol.length > 1 ? 's' : '') + '</b>' + (sol.length ? ' : ' + sol.sort(function (p, q) { return p - q; }).map(function (x) { return r3(x); }).join(' ; ') : '') + ' (points verts).';
    }
  });

  /* 6. Optimiser : rectangle de périmètre fixé */
  (function () {
    var L = Mini.makeLab('lab6', '6. Optimiser : l’aire d’un rectangle', 'périmètre 20 m, largeur x');
    var g = new FX.Graph(L.graph, { xmin: -0.5, xmax: 10.5, ymin: -2, ymax: 28, label: 'Aire du rectangle en fonction de sa largeur' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sync6;
    function draw(x) {
      g.clear(); if (sync6) sync6(); g.curve(function (t) { return t * (10 - t); }, BLUE, { from: 0, to: 10 });
      g.point(5, 25, GREEN, { r: 6 }); g.label(5, 25, 'maximum', GREEN);
      g.point(x, x * (10 - x), ORANGE, { r: 6.5 }); g.line(x, 0, x, x * (10 - x), ORANGE, { dashed: true });
      out.innerHTML = 'Largeur x = <b class="mono">' + r2(x) + '</b> m, longueur 10 − x = <b class="mono">' + r2(10 - x) + '</b> m<br>Aire A(x) = x(10 − x) = −x² + 10x = <b class="mono">' + r2(x * (10 - x)) + '</b> m²<br>a = −1 &lt; 0 : maximum au sommet x = −b/(2a) = 5, A(5) = 25.<br>Forme canonique : A(x) = 25 − (x − 5)². L’aire est maximale quand le rectangle est un carré.';
    }
    var sx6 = Mini.slider('p6-x', 'Largeur x (m) =', 0, 10, 0.25, 3, draw);
    sync6 = Mini.dragSlider(g, 'x', sx6, { color: ORANGE, pos: function (v) { return { x: v, y: v * (10 - v) }; }, val: function (x) { return x; }, move: function (x) { x = Math.max(0, Math.min(10, x)); return { x: x, y: x * (10 - x) }; } });
    L.side.appendChild(sx6); L.side.appendChild(out); draw(3);
  })();

  Mini.exercises(document.getElementById('exos'), window.POL_EX, 'second-degre');
  Mini.checklist(document.getElementById('checklist'), 'second-degre', [
    'Je passe de la forme développée à la forme canonique, et inversement.',
    'Je calcule Δ sans me tromper de signe et j’en déduis le nombre de racines.',
    'Je donne les racines et je factorise ax² + bx + c.',
    'Je lis le signe d’un trinôme et je résous une inéquation du second degré.',
    'Je trouve le sommet et les variations d’une parabole.',
    'J’utilise somme (−b/a) et produit (c/a) des racines.',
    'Je résous ax⁴ + bx² + c = 0 par changement d’inconnue, en revenant à x.',
    'Je sais refaire la démonstration des formules de racines.'
  ]);
})();
