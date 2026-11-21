/* Mini-site Droites et cercles : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  var D2R = Math.PI / 180, R = 8;
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function sg(v) { return v < 0 ? '− ' + r2(-v) : '+ ' + r2(v); }
  function plane(container, label) { return new FX.Graph(container, { width: 480, height: 480, xmin: -R, xmax: R, ymin: -R, ymax: R, label: label }); }
  function lineEq(g, a, b, c, color, o) {
    if (Math.abs(a) < 1e-12 && Math.abs(b) < 1e-12) return;
    if (Math.abs(b) >= Math.abs(a)) g.line(-R, (-c + a * R) / b, R, (-c - a * R) / b, color, o);
    else g.line((-c + b * R) / a, -R, (-c - b * R) / a, R, color, o);
  }
  function eqText(a, b, c) { return r2(a) + 'x ' + sg(b) + 'y ' + sg(c) + ' = 0'; }

  /* 1. Droite : équations, vecteurs directeur et normal */
  (function () {
    var L = Mini.makeLab('lab1', '1. Une droite, deux vecteurs', 'ax + by + c = 0');
    var g = plane(L.graph, 'Droite avec vecteur directeur et vecteur normal');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { a: 2, b: -1, c: -3 };
    function draw() {
      g.clear();
      if (s.a === 0 && s.b === 0) { out.innerHTML = '<b>Choisis (a ; b) différent de (0 ; 0).</b>'; return; }
      lineEq(g, s.a, s.b, s.c, BLUE, { width: 3 });
      var n2 = s.a * s.a + s.b * s.b, x0 = -s.a * s.c / n2, y0 = -s.b * s.c / n2; // pied de la perpendiculaire depuis O
      g.point(x0, y0, PURPLE, { r: 5 });
      g.arrow(x0, y0, x0 - s.b, y0 + s.a, GREEN); g.arrow(x0, y0, x0 + s.a, y0 + s.b, ORANGE);
      g.label(x0 - s.b, y0 + s.a, 'u', GREEN); g.label(x0 + s.a, y0 + s.b, 'n', ORANGE);
      out.innerHTML = '<b>' + eqText(s.a, s.b, s.c) + '</b><br>Vecteur directeur <span style="color:' + GREEN + '">u(−b ; a) = (' + r2(-s.b) + ' ; ' + r2(s.a) + ')</span><br>Vecteur normal <span style="color:' + ORANGE + '">n(a ; b) = (' + r2(s.a) + ' ; ' + r2(s.b) + ')</span><br>u·n = ' + r2(-s.b * s.a + s.a * s.b) + ' : orthogonaux.<br>' + (s.b !== 0 ? 'Réduite : y = <b class="mono">' + r3(-s.a / s.b) + '</b>x ' + sg(-s.c / s.b) + ' (pente ' + r3(-s.a / s.b) + ').' : 'Droite verticale : x = <b class="mono">' + r3(-s.c / s.a) + '</b>.');
    }
    [['a', 'a ='], ['b', 'b ='], ['c', 'c =']].forEach(function (k) { L.side.appendChild(Mini.slider('dc1-' + k[0], k[1], -6, 6, 1, s[k[0]], function (v) { s[k[0]] = v; draw(); })); });
    L.side.appendChild(out); draw();
  })();

  /* 2. Intersection de deux droites */
  (function () {
    var L = Mini.makeLab('lab2', '2. Intersection de deux droites', 'résoudre un système');
    var g = plane(L.graph, 'Deux droites et leur point d’intersection');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { m1: 1, p1: -1, m2: -0.5, p2: 3 };
    function draw() {
      g.clear(); lineEq(g, -s.m1, 1, -s.p1, BLUE, { width: 3 }); lineEq(g, -s.m2, 1, -s.p2, ORANGE, { width: 3 });
      var t = '(d₁) : y = ' + r2(s.m1) + 'x ' + sg(s.p1) + '<br>(d₂) : y = ' + r2(s.m2) + 'x ' + sg(s.p2) + '<br>';
      if (Math.abs(s.m1 - s.m2) < 1e-9) {
        out.innerHTML = t + (Math.abs(s.p1 - s.p2) < 1e-9 ? '<b>Droites confondues</b> : infinité de solutions.' : '<b>Même pente, ordonnées différentes : parallèles</b>, aucun point commun (le système n’a pas de solution).');
        return;
      }
      var x = (s.p2 - s.p1) / (s.m1 - s.m2), y = s.m1 * x + s.p1;
      if (Math.abs(x) <= R && Math.abs(y) <= R) g.point(x, y, PURPLE, { r: 7 });
      out.innerHTML = t + 'On résout m₁x + p₁ = m₂x + p₂ : x = (p₂ − p₁)/(m₁ − m₂) = <b class="mono">' + r3(x) + '</b><br>puis y = <b class="mono">' + r3(y) + '</b>.<br>Point d’intersection : <b>(' + r3(x) + ' ; ' + r3(y) + ')</b> (point violet).' + (Math.abs(s.m1 * s.m2 + 1) < 1e-9 ? '<br>m₁ × m₂ = −1 : les droites sont perpendiculaires.' : '');
    }
    [['m1', 'Pente de d₁ =', -3, 3, 0.5], ['p1', 'Ordonnée à l’origine de d₁ =', -6, 6, 1], ['m2', 'Pente de d₂ =', -3, 3, 0.5], ['p2', 'Ordonnée à l’origine de d₂ =', -6, 6, 1]].forEach(function (k) { L.side.appendChild(Mini.slider('dc2-' + k[0], k[1], k[2], k[3], k[4] || 1, s[k[0]], function (v) { s[k[0]] = v; draw(); })); });
    L.side.appendChild(out); draw();
  })();

  /* 3. Équation d'un cercle */
  (function () {
    var L = Mini.makeLab('lab3', '3. Équation d’un cercle', 'centre, rayon, forme développée');
    var g = plane(L.graph, 'Cercle de centre et de rayon réglables');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { p: 2, q: -1, r: 3, t: 30 };
    function draw() {
      g.clear(); g.circle(s.p, s.q, s.r, BLUE, { fill: BLUE }); g.point(s.p, s.q, PURPLE, { r: 5 });
      var mx = s.p + s.r * Math.cos(s.t * D2R), my = s.q + s.r * Math.sin(s.t * D2R);
      g.line(s.p, s.q, mx, my, ORANGE, { dashed: true }); g.point(mx, my, ORANGE, { r: 6 });
      var u = -2 * s.p, v = -2 * s.q, w = s.p * s.p + s.q * s.q - s.r * s.r;
      out.innerHTML = 'Canonique : (x ' + sg(-s.p) + ')² + (y ' + sg(-s.q) + ')² = ' + r2(s.r * s.r) + '<br>Développée : x² + y² ' + sg(u) + 'x ' + sg(v) + 'y ' + sg(w) + ' = 0<br>Le centre a les coordonnées <b>opposées</b> à celles des parenthèses : Ω(' + r2(s.p) + ' ; ' + r2(s.q) + ').<br>Point M (orange) : (' + r3(mx) + ' ; ' + r3(my) + '), ΩM = <b class="mono">' + r3(Math.hypot(mx - s.p, my - s.q)) + '</b> = r.';
    }
    L.side.appendChild(Mini.slider('dc3-p', 'Centre : abscisse p =', -5, 5, 1, 2, function (v) { s.p = v; draw(); }));
    L.side.appendChild(Mini.slider('dc3-q', 'Centre : ordonnée q =', -5, 5, 1, -1, function (v) { s.q = v; draw(); }));
    L.side.appendChild(Mini.slider('dc3-r', 'Rayon r =', 1, 5, 0.5, 3, function (v) { s.r = v; draw(); }));
    L.side.appendChild(Mini.slider('dc3-t', 'Point M (degrés) =', 0, 360, 5, 30, function (v) { s.t = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 4. Droite et cercle : position relative */
  (function () {
    var L = Mini.makeLab('lab4', '4. Droite et cercle : trois positions', 'comparer la distance au rayon');
    var g = plane(L.graph, 'Cercle de rayon 4 et droite à distance réglable');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { th: 30, d: 2 };
    function draw() {
      var c = Math.cos(s.th * D2R), sn = Math.sin(s.th * D2R), r = 4;
      g.clear(); g.circle(0, 0, r, BLUE, { fill: BLUE }); lineEq(g, c, sn, -s.d, ORANGE, { width: 3 });
      g.point(0, 0, '#20283d', { r: 4 }); g.point(s.d * c, s.d * sn, PURPLE, { r: 5 }); g.line(0, 0, s.d * c, s.d * sn, PURPLE, { dashed: true });
      var disc = r * r - s.d * s.d, pts = disc > 1e-9 ? 2 : Math.abs(disc) <= 1e-9 ? 1 : 0;
      if (pts) { var w = Math.sqrt(Math.max(0, disc)); [-1, 1].forEach(function (k) { if (pts === 1 && k === 1) return; g.point(s.d * c - k * w * sn, s.d * sn + k * w * c, GREEN, { r: 6.5 }); }); }
      out.innerHTML = 'Cercle de centre O et de rayon <b>4</b>. Droite : ' + r2(c) + 'x ' + sg(sn) + 'y = ' + r2(s.d) + ' (normale unitaire, orientée à ' + s.th + '°).<br>Distance de O à la droite : δ = <b class="mono">' + r2(s.d) + '</b> (segment violet).<br>' + (pts === 2 ? '<b>δ &lt; r : sécante</b>, deux points communs (points verts), à distance √(r² − δ²) = ' + r3(Math.sqrt(disc)) + ' du pied.' : pts === 1 ? '<b>δ = r : tangente</b>, un seul point commun, perpendiculaire au rayon.' : '<b>δ &gt; r : extérieure</b>, aucun point commun.');
    }
    L.side.appendChild(Mini.slider('dc4-th', 'Direction de la normale (degrés) =', 0, 180, 5, 30, function (v) { s.th = v; draw(); }));
    L.side.appendChild(Mini.slider('dc4-d', 'Distance δ de O à la droite =', 0, 6, 0.5, 2, function (v) { s.d = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 5. Tangente en un point */
  (function () {
    var L = Mini.makeLab('lab5', '5. Tangente à un cercle en A', 'ΩA est le vecteur normal');
    var g = plane(L.graph, 'Cercle et tangente en un point A');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { t: 53, r: 5 };
    function draw() {
      var ax = s.r * Math.cos(s.t * D2R), ay = s.r * Math.sin(s.t * D2R);
      g.clear(); g.circle(0, 0, s.r, BLUE, { fill: BLUE }); g.point(0, 0, '#20283d', { r: 4 });
      lineEq(g, ax, ay, -(ax * ax + ay * ay), ORANGE, { width: 3 }); g.arrow(0, 0, ax, ay, PURPLE); g.point(ax, ay, ORANGE, { r: 6.5 }); g.label(ax, ay, 'A', ORANGE);
      out.innerHTML = 'Cercle x² + y² = ' + r2(s.r * s.r) + '. A(<b class="mono">' + r3(ax) + '</b> ; <b class="mono">' + r3(ay) + '</b>), vecteur normal OA (violet).<br>Tangente : <b>' + r3(ax) + 'x ' + sg(ay).replace(/(\d)(?=\D*$)/, '$1') + 'y = ' + r2(s.r * s.r) + '</b><br>car ΩA·AM = 0 donne a·x + b·y = a·xA + b·yA = r².<br>La tangente n’a qu’un point commun avec le cercle et reste à distance r de O.';
    }
    L.side.appendChild(Mini.slider('dc5-t', 'Position de A (degrés) =', 0, 360, 1, 53, function (v) { s.t = v; draw(); }));
    L.side.appendChild(Mini.slider('dc5-r', 'Rayon r =', 2, 7, 1, 5, function (v) { s.r = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  Mini.exercises(document.getElementById('exos'), window.DCE_EX, 'droites-cercles');
  Mini.checklist(document.getElementById('checklist'), 'droites-cercles', [
    'Je passe de l’équation réduite à l’équation cartésienne et inversement.',
    'Je lis un vecteur directeur u(−b ; a) et un vecteur normal n(a ; b).',
    'Je teste colinéarité et alignement avec xy′ − x′y = 0.',
    'Je trouve l’intersection de deux droites par un système.',
    'Je détermine une droite par un point et un vecteur normal.',
    'Je passe de (x − p)² + (y − q)² = r² à la forme développée et inversement.',
    'Je détermine la position relative d’une droite et d’un cercle et l’équation d’une tangente.'
  ]);
})();
