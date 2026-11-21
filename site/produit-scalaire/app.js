/* Mini-site Produit scalaire : ateliers. Dépend de fx.js et mini.js. */
(function () {
  'use strict';
  var h = Mini.h, fmt = FX.fmt;
  var BLUE = '#3459e8', ORANGE = '#da681e', PURPLE = '#8053bd', GREEN = '#1d7a46', GREY = '#8b96b0';
  var D2R = Math.PI / 180;
  function r2(v) { return fmt(Math.round(v * 100) / 100); }
  function r3(v) { return fmt(Math.round(v * 1000) / 1000); }
  function plane(container, R, label) { return new FX.Graph(container, { width: 480, height: 480, xmin: -R, xmax: R, ymin: -R, ymax: R, label: label }); }

  /* 1. Trois façons de calculer u·v */
  (function () {
    var L = Mini.makeLab('lab1', '1. Un nombre, trois calculs', 'coordonnées, angle, projection');
    var g = plane(L.graph, 6, 'Deux vecteurs u et v issus de O et projection de v sur u');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { ux: 4, uy: 1, vx: 2, vy: 3 }, S1 = {}, syncU, syncV;
    function draw() {
      var nu = Math.hypot(s.ux, s.uy), nv = Math.hypot(s.vx, s.vy), dot = s.ux * s.vx + s.uy * s.vy;
      g.clear(); if (syncU) { syncU(); syncV(); }
      g.arrow(0, 0, s.ux, s.uy, BLUE); g.arrow(0, 0, s.vx, s.vy, ORANGE);
      g.label(s.ux, s.uy, 'u', BLUE); g.label(s.vx, s.vy, 'v', ORANGE);
      if (nu > 1e-9) {
        var k = dot / (nu * nu), hx = k * s.ux, hy = k * s.uy;
        g.line(-6 * s.ux / nu, -6 * s.uy / nu, 6 * s.ux / nu, 6 * s.uy / nu, GREY, { dashed: true, width: 1.2 });
        g.line(s.vx, s.vy, hx, hy, PURPLE, { dashed: true }); g.point(hx, hy, PURPLE, { r: 5 });
      }
      var cos = nu * nv > 1e-9 ? dot / (nu * nv) : 0, ang = Math.acos(Math.max(-1, Math.min(1, cos))) / D2R;
      out.innerHTML = '<b>Coordonnées :</b> ' + s.ux + '×' + s.vx + ' + ' + s.uy + '×' + s.vy + ' = <b class="mono">' + r2(dot) + '</b><br><b>Angle :</b> ‖u‖ = ' + r3(nu) + ', ‖v‖ = ' + r3(nv) + ', θ = ' + r2(ang) + '° donc ‖u‖‖v‖cos θ = <b class="mono">' + r2(nu * nv * cos) + '</b><br><b>Projection :</b> longueur algébrique de la projection de v sur u = ' + r3(nu > 0 ? dot / nu : 0) + ', multipliée par ‖u‖ = <b class="mono">' + r2(dot) + '</b><br>' + (Math.abs(dot) < 1e-9 ? 'Produit nul : <b>u ⊥ v</b>.' : dot > 0 ? 'Produit positif : angle aigu.' : 'Produit négatif : angle obtus.');
    }
    ['ux', 'uy', 'vx', 'vy'].forEach(function (k, i) { var sl = Mini.slider('ps1-' + k, ['u : abscisse x =', 'u : ordonnée y =', 'v : abscisse x′ =', 'v : ordonnée y′ ='][i], -5, 5, 1, s[k], function (v) { s[k] = v; draw(); }); S1[k] = sl; L.side.appendChild(sl); });
    function tip(a, b, col) { return { color: col, pos: function (v) { return { x: v[0], y: v[1] }; }, vals: function (x, y) { return [Math.round(x), Math.round(y)]; } }; }
    syncU = Mini.dragSliders(g, 'u', [S1.ux, S1.uy], tip(0, 0, BLUE)); syncV = Mini.dragSliders(g, 'v', [S1.vx, S1.vy], tip(0, 0, ORANGE));
    L.side.appendChild(out); draw();
  })();

  /* 2. Projection orthogonale */
  (function () {
    var L = Mini.makeLab('lab2', '2. Projection orthogonale', 'AB·AC = AB × AH (mesure algébrique)');
    var g = plane(L.graph, 6, 'Projection du point C sur la droite AB');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { b: 4, cx: 2, cy: 3 }, syncB, syncC;
    function draw() {
      g.clear(); if (syncB) { syncB(); syncC(); } g.line(-6, 0, 6, 0, GREY, { width: 1.2 });
      g.arrow(0, 0, s.b, 0, BLUE); g.arrow(0, 0, s.cx, s.cy, ORANGE);
      g.line(s.cx, s.cy, s.cx, 0, PURPLE, { dashed: true }); g.point(0, 0, '#20283d', { r: 4 }); g.point(s.b, 0, BLUE, { r: 5 }); g.point(s.cx, s.cy, ORANGE, { r: 5 }); g.point(s.cx, 0, PURPLE, { r: 6 });
      g.label(0, 0, 'A', '#20283d'); g.label(s.b, 0, 'B', BLUE); g.label(s.cx, s.cy, 'C', ORANGE); g.label(s.cx, 0, 'H', PURPLE, { dy: 16 });
      var dot = s.b * s.cx;
      out.innerHTML = 'A(0 ; 0), B(' + s.b + ' ; 0), C(' + s.cx + ' ; ' + s.cy + ')<br>Le projeté orthogonal de C sur (AB) est <b>H(' + s.cx + ' ; 0)</b> (point violet).<br>AB = ' + Math.abs(s.b) + ', AH algébrique = ' + s.cx + '<br>AB·AC = AB × AH = <b class="mono">' + r2(dot) + '</b><br>Contrôle par les coordonnées : ' + s.b + '×' + s.cx + ' + 0×' + s.cy + ' = <b class="mono">' + r2(dot) + '</b><br>' + (s.cx === 0 ? 'H = A : angle droit en A, produit nul.' : (dot > 0 ? 'H est du même côté de A que B : produit positif.' : 'H est du côté opposé : produit négatif.'));
    }
    var sb = Mini.slider('ps2-b', 'B : abscisse =', -5, 5, 1, 4, function (v) { s.b = v; draw(); }), scx = Mini.slider('ps2-cx', 'C : abscisse =', -5, 5, 1, 2, function (v) { s.cx = v; draw(); }), scy = Mini.slider('ps2-cy', 'C : ordonnée =', -5, 5, 1, 3, function (v) { s.cy = v; draw(); });
    L.side.appendChild(sb); L.side.appendChild(scx); L.side.appendChild(scy);
    syncB = Mini.dragSliders(g, 'B', [sb], { color: BLUE, pos: function (v) { return { x: v[0], y: 0 }; }, vals: function (x) { return [Math.round(x)]; }, move: function (x) { return { x: Math.round(x), y: 0 }; } });
    syncC = Mini.dragSliders(g, 'C', [scx, scy], { color: ORANGE, pos: function (v) { return { x: v[0], y: v[1] }; }, vals: function (x, y) { return [Math.round(x), Math.round(y)]; } });
    L.side.appendChild(out); draw();
  })();

  /* 3. Orthogonalité */
  (function () {
    var L = Mini.makeLab('lab3', '3. Quand le produit scalaire s’annule', 'u·v = 0 ⇔ u ⊥ v');
    var g = plane(L.graph, 5, 'Le vecteur v tourne autour de O, u est fixe');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var sync3;
    function draw(deg) {
      var t = deg * D2R, vx = 3 * Math.cos(t), vy = 3 * Math.sin(t), dot = 4 * vx;
      g.clear(); if (sync3) sync3(); g.circle(0, 0, 3, '#c5cde0', { dashed: true });
      g.arrow(0, 0, 4, 0, BLUE); g.arrow(0, 0, vx, vy, Math.abs(dot) < 1e-6 ? GREEN : ORANGE);
      g.label(4, 0, 'u(4 ; 0)', BLUE); g.label(vx, vy, 'v', ORANGE);
      out.innerHTML = 'u(4 ; 0) fixe, v de norme 3 et d’angle <b>' + deg + '°</b> avec u.<br>v(' + r3(vx) + ' ; ' + r3(vy) + ')<br>u·v = 4 × ' + r3(vx) + ' + 0 = <b class="mono">' + r3(dot) + '</b> = 12 cos ' + deg + '°<br>' + (Math.abs(dot) < 1e-6 ? '<b style="color:' + GREEN + '">u·v = 0 : u et v sont orthogonaux</b> (angle 90° ou 270°).' : dot > 0 ? 'Angle aigu (moins de 90° d’écart) : produit positif.' : 'Angle obtus : produit négatif. Minimum −12 à 180°, maximum 12 à 0°.');
    }
    var sa = Mini.slider('ps3-a', 'Angle de v (degrés) =', 0, 360, 5, 45, draw);
    sync3 = Mini.dragSliders(g, 'v', [sa], { color: ORANGE, pos: function (v) { var t = v[0] * D2R; return { x: 3 * Math.cos(t), y: 3 * Math.sin(t) }; }, vals: function (x, y) { var d = Math.atan2(y, x) / D2R; return [d < 0 ? d + 360 : d]; }, move: function (x, y) { var n = Math.hypot(x, y) || 1; return { x: 3 * x / n, y: 3 * y / n }; } });
    L.side.appendChild(sa); L.side.appendChild(out); draw(45);
  })();

  /* 4. Al-Kashi */
  (function () {
    var L = Mini.makeLab('lab4', '4. Théorème d’Al-Kashi', 'a² = b² + c² − 2bc cos A');
    var g = new FX.Graph(L.graph, { width: 480, height: 480, xmin: -1, xmax: 9, ymin: -1, ymax: 9, label: 'Triangle ABC avec deux côtés et l’angle compris' });
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { b: 5, c: 6, A: 60 };
    function draw() {
      var t = s.A * D2R, Cx = s.b * Math.cos(t), Cy = s.b * Math.sin(t), a2 = s.b * s.b + s.c * s.c - 2 * s.b * s.c * Math.cos(t), a = Math.sqrt(a2);
      g.clear(); g.line(0, 0, s.c, 0, BLUE, { width: 2.6 }); g.line(0, 0, Cx, Cy, ORANGE, { width: 2.6 }); g.line(s.c, 0, Cx, Cy, PURPLE, { width: 2.6 });
      g.point(0, 0, '#20283d'); g.point(s.c, 0, BLUE); g.point(Cx, Cy, ORANGE);
      g.label(0, 0, 'A', '#20283d'); g.label(s.c, 0, 'B', BLUE); g.label(Cx, Cy, 'C', ORANGE);
      g.label(s.c / 2, 0, 'c = ' + s.c, BLUE, { dy: 18, dx: -12 }); g.label(Cx / 2, Cy / 2, 'b = ' + s.b, ORANGE, { dx: -48, dy: -4 }); g.label((s.c + Cx) / 2, Cy / 2, 'a ≈ ' + r2(a), PURPLE, { dx: 6 });
      var dist = Math.hypot(s.c - Cx, Cy);
      out.innerHTML = 'b = ' + s.b + ', c = ' + s.c + ', Â = ' + s.A + '°<br>a² = ' + s.b + '² + ' + s.c + '² − 2×' + s.b + '×' + s.c + '×cos ' + s.A + '° = <b class="mono">' + r2(a2) + '</b><br>a = <b class="mono">' + r3(a) + '</b><br>Contrôle avec les coordonnées de B et C : BC = ' + r3(dist) + '<br>' + (s.A === 90 ? 'Angle droit : cos 90° = 0, on retrouve le théorème de Pythagore a² = b² + c².' : s.A < 90 ? 'Angle aigu : a² est plus petit que b² + c².' : 'Angle obtus : a² est plus grand que b² + c².');
    }
    L.side.appendChild(Mini.slider('ps4-b', 'Côté b (AC) =', 2, 8, 1, 5, function (v) { s.b = v; draw(); }));
    L.side.appendChild(Mini.slider('ps4-c', 'Côté c (AB) =', 2, 8, 1, 6, function (v) { s.c = v; draw(); }));
    L.side.appendChild(Mini.slider('ps4-A', 'Angle Â (degrés) =', 10, 170, 5, 60, function (v) { s.A = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  /* 5. Lieu MA·MB = k */
  (function () {
    var L = Mini.makeLab('lab5', '5. Ensemble des points M tels que MA·MB = k', 'cercle de centre le milieu de [AB]');
    var g = plane(L.graph, 6, 'Cercle des points M tels que MA·MB = k');
    var out = h('<div class="readout" aria-live="polite"></div>');
    var s = { k: 0, t: 40 };
    function draw() {
      g.clear(); g.point(-2, 0, '#20283d'); g.point(2, 0, '#20283d'); g.label(-2, 0, 'A', '#20283d'); g.label(2, 0, 'B', '#20283d'); g.point(0, 0, GREY, { r: 3 });
      var r2_ = s.k + 4;
      if (r2_ < -1e-9) { out.innerHTML = 'MA·MB = OM² − 4 ≥ −4 : pour k = ' + s.k + ' &lt; −4, <b>aucun point</b>.'; return; }
      if (Math.abs(r2_) < 1e-9) { g.point(0, 0, GREEN, { r: 7 }); out.innerHTML = 'k = −4 : l’ensemble est <b>{O}</b>, le milieu de [AB].'; return; }
      var r = Math.sqrt(r2_); g.circle(0, 0, r, BLUE, { fill: BLUE });
      var mx = r * Math.cos(s.t * D2R), my = r * Math.sin(s.t * D2R);
      g.line(mx, my, -2, 0, ORANGE, { dashed: true }); g.line(mx, my, 2, 0, ORANGE, { dashed: true }); g.point(mx, my, ORANGE, { r: 6 }); g.label(mx, my, 'M', ORANGE);
      var dot = (-2 - mx) * (2 - mx) + (0 - my) * (0 - my);
      out.innerHTML = 'A(−2 ; 0), B(2 ; 0), O(0 ; 0) milieu de [AB].<br>Pour tout M : MA·MB = OM² − 4 (identité du milieu).<br>MA·MB = ' + s.k + ' ⇔ OM² = ' + (s.k + 4) + ' ⇔ M sur le cercle de centre O et de rayon <b class="mono">' + r3(r) + '</b>.<br>Pour le point M choisi : MA·MB = <b class="mono">' + r3(dot) + '</b>.<br>' + (s.k === 0 ? 'k = 0 : cercle de diamètre [AB] (angle droit en M).' : '');
    }
    L.side.appendChild(Mini.slider('ps5-k', 'k =', -5, 12, 1, 0, function (v) { s.k = v; draw(); }));
    L.side.appendChild(Mini.slider('ps5-t', 'Position de M (degrés) =', 0, 360, 5, 40, function (v) { s.t = v; draw(); }));
    L.side.appendChild(out); draw();
  })();

  Mini.exercises(document.getElementById('exos'), window.PSC_EX, 'produit-scalaire');
  Mini.checklist(document.getElementById('checklist'), 'produit-scalaire', [
    'Je calcule u·v avec les coordonnées, avec l’angle et avec une projection.',
    'Je choisis la formule adaptée à la situation.',
    'Je prouve une orthogonalité avec u·v = 0.',
    'Je développe ‖u + v‖² et j’utilise l’identité de polarisation.',
    'J’applique Al-Kashi pour une longueur ou un angle.',
    'Je donne le signe du produit à partir de l’angle (aigu, droit, obtus).',
    'Je reconnais que MA·MB = 0 décrit le cercle de diamètre [AB].'
  ]);
})();
