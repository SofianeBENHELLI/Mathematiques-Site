/* Mini-site Probabilités : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  function p3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function sq(container, label) { return new FX.Graph(container, { width: 480, height: 480, xmin: -0.08, xmax: 1.08, ymin: -0.08, ymax: 1.08, label: label }); }
  function box(g, x1, x2, y1, y2, color, txt) { g.rect(x1, x2, y1, y2, color, { opacity: 0.35 }); g.line(x1, y1, x2, y1, '#20283d', { width: 1.2 }); g.line(x1, y2, x2, y2, '#20283d', { width: 1.2 }); g.line(x1, y1, x1, y2, '#20283d', { width: 1.2 }); g.line(x2, y1, x2, y2, '#20283d', { width: 1.2 }); if (txt && (x2 - x1) > 0.12 && (y2 - y1) > 0.06) g.label((x1 + x2) / 2, (y1 + y2) / 2, txt, '#20283d', { dx: -20, dy: 4 }); }

  /* 1. Tableau croisé et probabilités */
  (function () {
    var L = Mini.makeLab('lab1', '1. Le tableau croisé', 'effectifs, P(A), P(B), P_A(B), P_B(A)');
    var g = sq(L.graph, 'Carré unité divisé selon A et B');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { ab: 20, anb: 20, nab: 30, nanb: 30 };
    function draw() {
      var T = s.ab + s.anb + s.nab + s.nanb, pa = (s.ab + s.anb) / T, pb = (s.ab + s.nab) / T, pab = s.ab / T;
      g.clear();
      // colonnes : A (largeur pa) puis non A ; dans chaque, B en bas
      var hA = pa > 0 ? s.ab / (s.ab + s.anb) : 0, hN = (1 - pa) > 0 ? s.nab / (s.nab + s.nanb) : 0;
      box(g, 0, pa, 0, hA, BLUE, 'A∩B'); box(g, 0, pa, hA, 1, '#c5cde0', 'A∩B̄'); box(g, pa, 1, 0, hN, ORANGE, 'Ā∩B'); box(g, pa, 1, hN, 1, '#e8ecf6', 'Ā∩B̄');
      var cond = pa > 0 ? pab / pa : 0, condb = pb > 0 ? pab / pb : 0;
      out.innerHTML = '<table><thead><tr><th></th><th>B</th><th>B̄</th><th>Total</th></tr></thead><tbody><tr><th>A</th><td>' + s.ab + '</td><td>' + s.anb + '</td><td>' + (s.ab + s.anb) + '</td></tr><tr><th>Ā</th><td>' + s.nab + '</td><td>' + s.nanb + '</td><td>' + (s.nab + s.nanb) + '</td></tr><tr><th>Total</th><td>' + (s.ab + s.nab) + '</td><td>' + (s.anb + s.nanb) + '</td><td>' + T + '</td></tr></tbody></table>' +
        '<br>P(A) = <b class="mono">' + p3(pa) + '</b>, P(B) = <b class="mono">' + p3(pb) + '</b>, P(A ∩ B) = <b class="mono">' + p3(pab) + '</b><br>P<sub>A</sub>(B) = ' + s.ab + '/' + (s.ab + s.anb) + ' = <b class="mono">' + p3(cond) + '</b><br>P<sub>B</sub>(A) = ' + s.ab + '/' + (s.ab + s.nab) + ' = <b class="mono">' + p3(condb) + '</b> (différent !)<br>Les aires du carré représentent les probabilités : largeur = P(A), hauteur dans A = P<sub>A</sub>(B).';
    }
    [['ab', 'Effectif A et B ='], ['anb', 'Effectif A et non B ='], ['nab', 'Effectif non A et B ='], ['nanb', 'Effectif non A et non B =']].forEach(function (k) { L.side.appendChild(Mini.slider('pr1-' + k[0], k[1], 1, 60, 1, s[k[0]], function (v) { s[k[0]] = v; draw(); })); });
    L.side.appendChild(out); draw();
  })();

  /* 2. Arbre pondéré et probabilités totales */
  (function () {
    var L = Mini.makeLab('lab2', '2. Arbre pondéré et probabilités totales', 'multiplier le long, additionner entre chemins');
    var g = sq(L.graph, 'Carré unité : chaque chemin de l’arbre est un rectangle');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { a: 0.4, ba: 0.5, bn: 0.2 };
    function draw() {
      g.clear();
      box(g, 0, s.a, 0, s.ba, BLUE, 'A∩B'); box(g, 0, s.a, s.ba, 1, '#c5cde0', 'A∩B̄'); box(g, s.a, 1, 0, s.bn, ORANGE, 'Ā∩B'); box(g, s.a, 1, s.bn, 1, '#e8ecf6', 'Ā∩B̄');
      var c1 = s.a * s.ba, c2 = (1 - s.a) * s.bn, pb = c1 + c2;
      out.innerHTML = '<b>Arbre :</b> A (' + s.a + ') → B (' + s.ba + ') ou B̄ (' + p3(1 - s.ba) + ') ; Ā (' + p3(1 - s.a) + ') → B (' + s.bn + ') ou B̄ (' + p3(1 - s.bn) + ')<br>Chemin A,B : ' + s.a + ' × ' + s.ba + ' = <b class="mono">' + p3(c1) + '</b> (rectangle bleu)<br>Chemin Ā,B : ' + p3(1 - s.a) + ' × ' + s.bn + ' = <b class="mono">' + p3(c2) + '</b> (rectangle orange)<br><b>P(B) = ' + p3(c1) + ' + ' + p3(c2) + ' = ' + p3(pb) + '</b> (probabilités totales)<br>Inversion : P<sub>B</sub>(A) = ' + p3(c1) + '/' + p3(pb) + ' = <b class="mono">' + p3(pb > 0 ? c1 / pb : 0) + '</b>';
    }
    L.side.appendChild(Mini.slider('pr2-a', 'P(A) =', 0.05, 0.95, 0.05, 0.4, function (v) { s.a = Math.round(v * 100) / 100; draw(); }));
    L.side.appendChild(Mini.slider('pr2-b', 'P<sub>A</sub>(B) =', 0, 1, 0.05, 0.5, function (v) { s.ba = Math.round(v * 100) / 100; draw(); }));
    L.side.appendChild(Mini.slider('pr2-n', 'P<sub>Ā</sub>(B) =', 0, 1, 0.05, 0.2, function (v) { s.bn = Math.round(v * 100) / 100; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 3. Indépendance */
  (function () {
    var L = Mini.makeLab('lab3', '3. Indépendance : P(A ∩ B) = P(A) × P(B)', 'quand les rectangles s’alignent');
    var g = sq(L.graph, 'Carré unité pour tester l’indépendance');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { a: 0.5, b: 0.4, c: 0.2 };
    function draw() {
      var cmax = Math.min(s.a, s.b), cmin = Math.max(0, s.a + s.b - 1), c = Math.min(cmax, Math.max(cmin, s.c));
      g.clear();
      var hA = s.a > 0 ? c / s.a : 0, hN = (1 - s.a) > 0 ? (s.b - c) / (1 - s.a) : 0;
      box(g, 0, s.a, 0, hA, BLUE, 'A∩B'); box(g, 0, s.a, hA, 1, '#c5cde0', ''); box(g, s.a, 1, 0, hN, ORANGE, 'Ā∩B'); box(g, s.a, 1, hN, 1, '#e8ecf6', '');
      g.line(0, s.b, 1, s.b, GREEN, { dashed: true, width: 2 }); g.label(1, s.b, 'P(B)', GREEN, { dx: -34, dy: -6 });
      var ind = Math.abs(c - s.a * s.b) < 1e-9;
      out.innerHTML = 'P(A) = ' + s.a + ', P(B) = ' + s.b + ', P(A ∩ B) = ' + p3(c) + (c !== s.c ? ' (ramené à une valeur possible)' : '') + '<br>P(A) × P(B) = <b class="mono">' + p3(s.a * s.b) + '</b><br>P<sub>A</sub>(B) = <b class="mono">' + p3(s.a > 0 ? c / s.a : 0) + '</b> contre P(B) = ' + s.b + '<br>' + (ind ? '<b style="color:' + GREEN + '">Indépendants</b> : la hauteur de B est la même dans A et hors de A (le trait vert coupe les deux colonnes à la même hauteur).' : '<b>Non indépendants</b> : la part de B n’est pas la même dans A et hors de A.') + (c === 0 ? '<br>P(A ∩ B) = 0 : incompatibles, donc jamais indépendants (si P(A) P(B) ≠ 0).' : '');
    }
    L.side.appendChild(Mini.slider('pr3-a', 'P(A) =', 0.1, 0.9, 0.1, 0.5, function (v) { s.a = Math.round(v * 10) / 10; draw(); }));
    L.side.appendChild(Mini.slider('pr3-b', 'P(B) =', 0.1, 0.9, 0.1, 0.4, function (v) { s.b = Math.round(v * 10) / 10; draw(); }));
    L.side.appendChild(Mini.slider('pr3-c', 'P(A ∩ B) =', 0, 0.9, 0.02, 0.2, function (v) { s.c = Math.round(v * 100) / 100; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 4. Deux épreuves indépendantes */
  (function () {
    var L = Mini.makeLab('lab4', '4. Deux épreuves indépendantes', 'produits le long des branches');
    var g = sq(L.graph, 'Carré unité : résultats de deux épreuves successives');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { p: 0.6, q: 0.3 };
    function draw() {
      g.clear();
      box(g, 0, s.p, 0, s.q, BLUE, 'S1,S2'); box(g, 0, s.p, s.q, 1, '#c5cde0', 'S1,E2'); box(g, s.p, 1, 0, s.q, ORANGE, 'E1,S2'); box(g, s.p, 1, s.q, 1, '#e8ecf6', 'E1,E2');
      var pq = s.p * s.q;
      out.innerHTML = 'Épreuve 1 : succès avec la probabilité p = <b>' + s.p + '</b>. Épreuve 2 : succès avec q = <b>' + s.q + '</b>.<br>Les deux succès : p × q = <b class="mono">' + p3(pq) + '</b> (rectangle bleu)<br>Exactement un succès : p(1 − q) + (1 − p)q = <b class="mono">' + p3(s.p * (1 - s.q) + (1 - s.p) * s.q) + '</b><br>Aucun succès : (1 − p)(1 − q) = <b class="mono">' + p3((1 - s.p) * (1 - s.q)) + '</b><br>Au moins un succès : 1 − (1 − p)(1 − q) = <b class="mono">' + p3(1 - (1 - s.p) * (1 - s.q)) + '</b><br>Les largeurs ne dépendent pas de l’épreuve 2 : les épreuves sont indépendantes.';
    }
    L.side.appendChild(Mini.slider('pr4-p', 'p =', 0.1, 0.9, 0.1, 0.6, function (v) { s.p = Math.round(v * 10) / 10; draw(); }));
    L.side.appendChild(Mini.slider('pr4-q', 'q =', 0.1, 0.9, 0.1, 0.3, function (v) { s.q = Math.round(v * 10) / 10; draw(); }));
    L.side.appendChild(out); draw();
  })();

  Mini.exercises(document.getElementById('exos'), window.PRB_EX, 'probabilites');
  Mini.checklist(document.getElementById('checklist'), 'probabilites', [
    'Je calcule P(A ∪ B) et P(Ā).',
    'Je distingue P(A ∩ B), P<sub>A</sub>(B) et P<sub>B</sub>(A).',
    'Je complète un arbre pondéré et je multiplie le long des chemins.',
    'J’applique les probabilités totales en additionnant les chemins.',
    'J’utilise un tableau croisé pour inverser une conditionnelle.',
    'Je teste l’indépendance par P(A ∩ B) = P(A)P(B).',
    'Je sais que deux événements incompatibles ne sont pas indépendants.'
  ]);
})();
