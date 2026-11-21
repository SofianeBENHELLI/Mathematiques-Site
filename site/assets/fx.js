/* fx.js : moteur mathématique sans dépendance (navigateur et Node).
   Parseur sûr (pas d'eval), évaluation, dérivation symbolique avec simplification,
   comparaison d'expressions, et petit traceur SVG. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FX = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------- Parseur ---------- */
  var FUNCS = { exp: 1, ln: 1, sqrt: 1, sin: 1, cos: 1, tan: 1, abs: 1 };
  var CONSTS = { pi: Math.PI, e: Math.E };

  function normalize(s) {
    return String(s)
      .replace(/×|·|⋅/g, '*')
      .replace(/−|–|\u2014/g, '-')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt')
      .replace(/²/g, '^2').replace(/³/g, '^3')
      .replace(/,/g, '.')
      .replace(/\bln\s*\|/g, 'ln(')
      .toLowerCase();
  }

  function tokenize(src, params) {
    params = params || [];
    var s = normalize(src), i = 0, out = [], m;
    while (i < s.length) {
      var c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (/[0-9.]/.test(c)) {
        m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
        if (!m) throw new Error('nombre invalide');
        out.push({ k: 'num', v: parseFloat(m[1]) }); i += m[1].length; continue;
      }
      if (/[a-z]/.test(c)) {
        m = /^[a-z]+/.exec(s.slice(i))[0];
        // découpe "xe", "2pi"... : un identifiant collé est séparé en tokens connus
        var rest = m, parts = [];
        while (rest.length) {
          var hit = null, names = Object.keys(FUNCS).concat(Object.keys(CONSTS));
          for (var j = 0; j < names.length; j++) if (rest.indexOf(names[j]) === 0 && (!hit || names[j].length > hit.length)) hit = names[j];
          if (hit) { parts.push(hit); rest = rest.slice(hit.length); }
          else if (rest[0] === 'x') { parts.push('x'); rest = rest.slice(1); }
          else if (params.indexOf(rest[0]) >= 0) { parts.push(rest[0]); rest = rest.slice(1); }
          else throw new Error('symbole inconnu : ' + rest);
        }
        parts.forEach(function (p) { out.push({ k: 'id', v: p }); });
        i += m.length; continue;
      }
      if ('+-*/^()'.indexOf(c) >= 0) { out.push({ k: 'op', v: c }); i++; continue; }
      throw new Error('caractère inattendu : ' + c);
    }
    return out;
  }

  function parse(src, params) {
    var t = tokenize(src, params), p = 0;
    function peek() { return t[p]; }
    function isOp(v) { var x = t[p]; return x && x.k === 'op' && x.v === v; }
    function startsAtom() {
      var x = t[p]; if (!x) return false;
      return x.k === 'num' || x.k === 'id' || (x.k === 'op' && x.v === '(');
    }
    function expr() {
      var a = term();
      while (isOp('+') || isOp('-')) { var op = t[p++].v; a = { t: 'bin', op: op, a: a, b: term() }; }
      return a;
    }
    function term() {
      var a = unary();
      for (;;) {
        if (isOp('*') || isOp('/')) { var op = t[p++].v; a = { t: 'bin', op: op, a: a, b: unary() }; }
        else if (startsAtom()) a = { t: 'bin', op: '*', a: a, b: unary() }; // multiplication implicite
        else break;
      }
      return a;
    }
    function unary() {
      if (isOp('-')) { p++; return { t: 'neg', a: unary() }; }
      if (isOp('+')) { p++; return unary(); }
      return power();
    }
    function power() {
      var base = atom();
      if (isOp('^')) { p++; var ex = isOp('-') ? (p++, { t: 'neg', a: power() }) : power(); return { t: 'bin', op: '^', a: base, b: ex }; }
      return base;
    }
    function atom() {
      var x = peek();
      if (!x) throw new Error('expression incomplète');
      if (x.k === 'num') { p++; return { t: 'num', v: x.v }; }
      if (x.k === 'op' && x.v === '(') {
        p++; var e = expr();
        if (!isOp(')')) throw new Error('parenthèse fermante manquante');
        p++; return e;
      }
      if (x.k === 'id') {
        p++;
        if (x.v === 'x') return { t: 'var' };
        if (params && params.indexOf(x.v) >= 0) return { t: 'par', n: x.v };
        if (CONSTS[x.v] !== undefined) return { t: 'const', n: x.v };
        // fonction : argument entre parenthèses, ou atome/puissance collée (ex. sqrt x, e^x géré ailleurs)
        var arg;
        if (isOp('(')) { p++; arg = expr(); if (!isOp(')')) throw new Error('parenthèse fermante manquante'); p++; }
        else arg = power();
        return { t: 'fn', name: x.v, a: arg };
      }
      throw new Error('symbole inattendu');
    }
    var tree = expr();
    if (p < t.length) throw new Error('fin d\'expression inattendue');
    return tree;
  }

  /* ---------- Évaluation ---------- */
  function ev(n, x, p) {
    switch (n.t) {
      case 'num': return n.v;
      case 'var': return x;
      case 'par': return p ? p[n.n] : NaN;
      case 'const': return CONSTS[n.n];
      case 'neg': return -ev(n.a, x, p);
      case 'bin': {
        var a = ev(n.a, x, p), b = ev(n.b, x, p);
        if (n.op === '+') return a + b;
        if (n.op === '-') return a - b;
        if (n.op === '*') return a * b;
        if (n.op === '/') return b === 0 ? NaN : a / b;
        if (a < 0 && Math.abs(b - Math.round(b)) > 1e-12) return NaN;
        return Math.pow(a, b);
      }
      case 'fn': {
        var u = ev(n.a, x, p);
        switch (n.name) {
          case 'exp': return Math.exp(u);
          case 'ln': return u > 0 ? Math.log(u) : NaN;
          case 'sqrt': return u >= 0 ? Math.sqrt(u) : NaN;
          case 'sin': return Math.sin(u);
          case 'cos': return Math.cos(u);
          case 'tan': return Math.tan(u);
          case 'abs': return Math.abs(u);
        }
      }
    }
    return NaN;
  }

  function compile(src, params) {
    var tree = typeof src === 'string' ? parse(src, params) : src;
    var f = function (x, p) { return ev(tree, x, p); };
    f.tree = tree;
    return f;
  }

  /* ---------- Constructeurs simplifiants ---------- */
  var N = function (v) { return { t: 'num', v: v }; };
  var X = { t: 'var' };
  function isNum(n, v) { return n.t === 'num' && (v === undefined || n.v === v); }
  function hasX(n) {
    switch (n.t) {
      case 'var': return true;
      case 'num': case 'const': case 'par': return false;
      case 'neg': return hasX(n.a);
      case 'fn': return hasX(n.a);
      default: return hasX(n.a) || hasX(n.b);
    }
  }
  function neg(a) {
    if (a.t === 'num') return N(-a.v);
    if (a.t === 'neg') return a.a;
    return { t: 'neg', a: a };
  }
  function add(a, b) {
    if (isNum(a, 0)) return b;
    if (isNum(b, 0)) return a;
    if (a.t === 'num' && b.t === 'num') return N(a.v + b.v);
    if (b.t === 'neg') return sub(a, b.a);
    if (b.t === 'num' && b.v < 0) return { t: 'bin', op: '-', a: a, b: N(-b.v) };
    return { t: 'bin', op: '+', a: a, b: b };
  }
  function sub(a, b) {
    if (isNum(b, 0)) return a;
    if (isNum(a, 0)) return neg(b);
    if (a.t === 'num' && b.t === 'num') return N(a.v - b.v);
    if (b.t === 'neg') return add(a, b.a);
    return { t: 'bin', op: '-', a: a, b: b };
  }
  function mul(a, b) {
    if (isNum(a, 0) || isNum(b, 0)) return N(0);
    if (isNum(a, 1)) return b;
    if (isNum(b, 1)) return a;
    if (isNum(a, -1)) return neg(b);
    if (isNum(b, -1)) return neg(a);
    if (a.t === 'num' && b.t === 'num') return N(a.v * b.v);
    if (a.t === 'neg') return neg(mul(a.a, b));
    if (b.t === 'neg') return neg(mul(a, b.a));
    if (b.t === 'num' && a.t !== 'num') return mul(b, a);
    if (a.t === 'num' && b.t === 'bin' && b.op === '*' && b.a.t === 'num') return mul(N(a.v * b.a.v), b.b);
    return { t: 'bin', op: '*', a: a, b: b };
  }
  function div(a, b) {
    if (isNum(a, 0)) return N(0);
    if (isNum(b, 1)) return a;
    if (a.t === 'num' && b.t === 'num' && b.v !== 0 && Number.isInteger(a.v / b.v)) return N(a.v / b.v);
    if (a.t === 'neg') return neg(div(a.a, b));
    return { t: 'bin', op: '/', a: a, b: b };
  }
  function pow(a, b) {
    if (isNum(b, 0)) return N(1);
    if (isNum(b, 1)) return a;
    if (isNum(a, 1)) return N(1);
    if (a.t === 'num' && b.t === 'num') return N(Math.pow(a.v, b.v));
    return { t: 'bin', op: '^', a: a, b: b };
  }
  function fn(name, a) { return { t: 'fn', name: name, a: a }; }
  var E = { t: 'const', n: 'e' };

  /* ---------- Dérivation symbolique ---------- */
  function diff(n) {
    switch (n.t) {
      case 'num': case 'const': case 'par': return N(0);
      case 'var': return N(1);
      case 'neg': return neg(diff(n.a));
      case 'bin': {
        var a = n.a, b = n.b, da = diff(a), db = diff(b);
        if (n.op === '+') return add(da, db);
        if (n.op === '-') return sub(da, db);
        if (n.op === '*') return add(mul(da, b), mul(a, db));
        if (n.op === '/') return div(sub(mul(da, b), mul(a, db)), pow(b, N(2)));
        // puissance
        if (!hasX(b)) {
          if (b.t === 'num') return mul(mul(b, pow(a, N(b.v - 1))), da);
          return mul(mul(b, pow(a, sub(b, N(1)))), da);
        }
        if (!hasX(a)) {
          var lna = (a.t === 'const' && a.n === 'e') ? N(1) : fn('ln', a);
          return mul(mul(n, lna), db);
        }
        // u^v = exp(v ln u)
        return mul(n, add(mul(db, fn('ln', a)), div(mul(b, da), a)));
      }
      case 'fn': {
        var u = n.a, du = diff(u), r;
        switch (n.name) {
          case 'exp': r = n; break;
          case 'ln': r = div(N(1), u); break;
          case 'sqrt': r = div(N(1), mul(N(2), n)); break;
          case 'sin': r = fn('cos', u); break;
          case 'cos': r = neg(fn('sin', u)); break;
          case 'tan': r = add(N(1), pow(n, N(2))); break;
          case 'abs': r = div(u, n); break; // u/|u|
        }
        return mul(du, r);
      }
    }
  }
  // On met le facteur dérivé interne devant : (2x+1)' * f'(u) s'écrit f'(u) × u' selon l'usage ;
  // la forme n'a pas d'importance pour la comparaison, seulement pour l'affichage.

  /* ---------- Affichage ---------- */
  var PREC = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 4 };
  function fmtNum(v) {
    if (Number.isInteger(v)) return String(v);
    return String(Math.round(v * 1e6) / 1e6).replace('.', ',');
  }
  function str(n, parent, right) {
    var s, p;
    switch (n.t) {
      case 'num': s = fmtNum(Math.abs(n.v)); p = 5; if (n.v < 0) { s = '-' + s; p = 3; } break;
      case 'var': s = 'x'; p = 5; break;
      case 'par': s = n.n; p = 5; break;
      case 'const': s = n.n === 'pi' ? 'π' : 'e'; p = 5; break;
      case 'neg': s = '-' + str(n.a, 2); p = 3; break;
      case 'fn': s = n.name + '(' + str(n.a, 0) + ')'; p = 5; break;
      case 'bin': {
        p = PREC[n.op];
        if (n.op === '*') {
          var l = str(n.a, 2, false), r = str(n.b, 2, true);
          var implicit = (n.a.t === 'num' && (n.b.t === 'var' || n.b.t === 'fn' || n.b.t === 'const' || (n.b.t === 'bin' && n.b.op === '^'))) ||
                         (n.a.t === 'num' && n.b.t === 'bin' && n.b.op === '*' && false);
          s = (implicit || r.charAt(0) === '(') ? l + r : l + '·' + r;
          if (n.a.t === 'num' && n.b.t === 'bin' && (n.b.op === '+' || n.b.op === '-')) s = l + '(' + str(n.b, 0) + ')';
          if (n.a.t === 'num' && n.b.t === 'num') s = l + '×' + r;
        } else if (n.op === '^') {
          s = str(n.a, 4, false) + '^' + str(n.b, 5, true);
        } else if (n.op === '/') {
          s = str(n.a, 2, false) + '/' + str(n.b, 3, true);
        } else {
          s = str(n.a, p, false) + ' ' + n.op + ' ' + str(n.b, p + (n.op === '-' ? 1 : 0), true);
        }
        break;
      }
    }
    if (parent !== undefined && p < parent) s = '(' + s + ')';
    return s;
  }
  function toString(n, params) { return str(typeof n === 'string' ? parse(n, params) : (n.tree || n), 0); }

  var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
  function pretty(s) {
    return s.replace(/\^(-?\d+)(?![\d.,])/g, function (m, d) { return d.split('').map(function (c) { return SUP[c] || c; }).join(''); });
  }

  /* ---------- Comparaison d'expressions ---------- */
  function seeded(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function equivalent(a, b, opts) {
    opts = opts || {};
    var fa = typeof a === 'function' ? a : compile(a), fb = typeof b === 'function' ? b : compile(b);
    var lo = opts.lo === undefined ? -6 : opts.lo, hi = opts.hi === undefined ? 6 : opts.hi;
    var rnd = seeded(opts.seed || 12345), ok = 0, bad = 0;
    for (var i = 0; i < 60 && ok < 14; i++) {
      var x = lo + (hi - lo) * rnd();
      var ya = fa(x), yb = fb(x);
      if (!isFinite(ya) && !isFinite(yb)) continue;
      if (!isFinite(ya) || !isFinite(yb)) { bad++; continue; }
      var tol = 1e-7 * Math.max(1, Math.abs(ya), Math.abs(yb));
      if (Math.abs(ya - yb) > tol) return false;
      ok++;
    }
    return ok >= 6 && bad < ok;
  }

  /* ---------- Numérique ---------- */
  function numDiff(f, a, h) { h = h || 1e-6; return (f(a + h) - f(a - h)) / (2 * h); }
  function bisect(f, a, b, tol) {
    tol = tol || 1e-10; var fa = f(a);
    for (var i = 0; i < 200 && b - a > tol; i++) {
      var m = (a + b) / 2, fm = f(m);
      if (fa * fm <= 0) b = m; else { a = m; fa = fm; }
    }
    return (a + b) / 2;
  }
  function roots(f, lo, hi, steps) {
    steps = steps || 600; var out = [], px = lo, py = f(px);
    for (var i = 1; i <= steps; i++) {
      var x = lo + (hi - lo) * i / steps, y = f(x);
      if (isFinite(py) && isFinite(y)) {
        if (py === 0) out.push(px);
        else if (py * y < 0 && Math.abs(y - py) < 1e3) out.push(bisect(f, px, x));
      }
      px = x; py = y;
    }
    return out;
  }

  /* ---------- Traceur SVG ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function niceStep(span, target) {
    var raw = span / target, mag = Math.pow(10, Math.floor(Math.log10(raw))), r = raw / mag;
    return (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * mag;
  }
  function Graph(container, o) {
    o = o || {};
    var W = o.width || 640, H = o.height || 400, pad = 28;
    var g = this;
    g.xmin = o.xmin === undefined ? -5 : o.xmin; g.xmax = o.xmax === undefined ? 5 : o.xmax;
    g.ymin = o.ymin === undefined ? -4 : o.ymin; g.ymax = o.ymax === undefined ? 4 : o.ymax;
    g.W = W; g.H = H; g.pad = pad;
    g.svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'fx-graph', role: 'img', 'aria-label': o.label || 'graphique' });
    g.layerGrid = el('g', {}, g.svg); g.layerCurves = el('g', {}, g.svg); g.layerTop = el('g', {}, g.svg);
    container.appendChild(g.svg);
    g.sx = function (x) { return pad + (x - g.xmin) / (g.xmax - g.xmin) * (W - 2 * pad); };
    g.sy = function (y) { return H - pad - (y - g.ymin) / (g.ymax - g.ymin) * (H - 2 * pad); };
    g.ix = function (px) { return g.xmin + (px - pad) / (W - 2 * pad) * (g.xmax - g.xmin); };
    g.iy = function (py) { return g.ymin + (H - pad - py) / (H - 2 * pad) * (g.ymax - g.ymin); };
    g.grid();
  }
  Graph.prototype.clientToX = function (evt) {
    var r = this.svg.getBoundingClientRect();
    var px = (evt.clientX - r.left) / r.width * this.W;
    return this.ix(px);
  };
  Graph.prototype.grid = function () {
    var g = this, L = g.layerGrid;
    while (L.firstChild) L.removeChild(L.firstChild);
    var sx = niceStep(g.xmax - g.xmin, 10), sy = niceStep(g.ymax - g.ymin, 8);
    var x0 = Math.ceil(g.xmin / sx) * sx, y0 = Math.ceil(g.ymin / sy) * sy, v;
    for (v = x0; v <= g.xmax + 1e-9; v += sx) {
      el('line', { x1: g.sx(v), x2: g.sx(v), y1: g.sy(g.ymin), y2: g.sy(g.ymax), class: 'fx-grid' }, L);
      if (Math.abs(v) > 1e-9) { var t = el('text', { x: g.sx(v), y: Math.min(Math.max(g.sy(0) + 14, 14), g.H - 4), class: 'fx-tick', 'text-anchor': 'middle' }, L); t.textContent = fmtNum(Math.round(v * 1e6) / 1e6); }
    }
    for (v = y0; v <= g.ymax + 1e-9; v += sy) {
      el('line', { x1: g.sx(g.xmin), x2: g.sx(g.xmax), y1: g.sy(v), y2: g.sy(v), class: 'fx-grid' }, L);
      if (Math.abs(v) > 1e-9) { var onAxis = g.xmin <= 0 && g.xmax >= 0; var u = el('text', { x: onAxis ? Math.max(g.sx(0) - 5, 22) : g.pad + 3, y: g.sy(v) - 3, class: 'fx-tick', 'text-anchor': onAxis ? 'end' : 'start' }, L); u.textContent = fmtNum(Math.round(v * 1e6) / 1e6); }
    }
    if (g.ymin <= 0 && g.ymax >= 0) el('line', { x1: g.sx(g.xmin), x2: g.sx(g.xmax), y1: g.sy(0), y2: g.sy(0), class: 'fx-axis' }, L);
    if (g.xmin <= 0 && g.xmax >= 0) el('line', { x1: g.sx(0), x2: g.sx(0), y1: g.sy(g.ymin), y2: g.sy(g.ymax), class: 'fx-axis' }, L);
  };
  Graph.prototype.clear = function () {
    [this.layerCurves, this.layerTop].forEach(function (L) { while (L.firstChild) L.removeChild(L.firstChild); });
  };
  Graph.prototype.view = function (xmin, xmax, ymin, ymax) {
    this.xmin = xmin; this.xmax = xmax; this.ymin = ymin; this.ymax = ymax; this.grid();
  };
  // Courbe avec gestion des discontinuités : on coupe le tracé sur NaN et sur les sauts verticaux
  Graph.prototype.curve = function (f, color, o) {
    o = o || {};
    var g = this, n = 700, d = '', pen = false, prevY = null, span = g.ymax - g.ymin;
    var a = o.from === undefined ? g.xmin : o.from, b = o.to === undefined ? g.xmax : o.to;
    for (var i = 0; i <= n; i++) {
      var x = a + (b - a) * i / n, y = f(x);
      if (!isFinite(y) || Math.abs(y) > span * 40) { pen = false; prevY = null; continue; }
      if (prevY !== null && Math.abs(y - prevY) > span * 0.8 && !o.joinJumps) pen = false;
      d += (pen ? 'L' : 'M') + g.sx(x).toFixed(1) + ' ' + g.sy(y).toFixed(1);
      pen = true; prevY = y;
    }
    return el('path', { d: d, class: 'fx-curve' + (o.dashed ? ' fx-dashed' : ''), stroke: color || '#3459e8', fill: 'none', 'stroke-width': o.width || 2.6 }, g.layerCurves);
  };
  Graph.prototype.point = function (x, y, color, o) {
    o = o || {};
    var c = el('circle', { cx: this.sx(x), cy: this.sy(y), r: o.r || 5.5, fill: o.open ? '#fff' : (color || '#da681e'), stroke: color || '#da681e', 'stroke-width': 2 }, this.layerTop);
    return c;
  };
  Graph.prototype.line = function (x1, y1, x2, y2, color, o) {
    o = o || {};
    return el('line', { x1: this.sx(x1), y1: this.sy(y1), x2: this.sx(x2), y2: this.sy(y2), stroke: color || '#da681e', 'stroke-width': o.width || 2, 'stroke-dasharray': o.dashed ? '6 5' : '' }, this.layerTop);
  };
  // droite de pente m passant par (x0, y0), sur toute la fenêtre
  Graph.prototype.slope = function (x0, y0, m, color, o) {
    return this.line(this.xmin, y0 + m * (this.xmin - x0), this.xmax, y0 + m * (this.xmax - x0), color, o);
  };
  Graph.prototype.label = function (x, y, txt, color, o) {
    o = o || {};
    var t = el('text', { x: this.sx(x) + (o.dx || 8), y: this.sy(y) + (o.dy || -8), class: 'fx-label', fill: color || '#20283d' }, this.layerTop);
    t.textContent = txt; return t;
  };
  Graph.prototype.rect = function (x1, x2, y1, y2, color, o) {
    o = o || {};
    return el('rect', { x: this.sx(x1), y: this.sy(Math.max(y1, y2)), width: Math.abs(this.sx(x2) - this.sx(x1)), height: Math.abs(this.sy(y1) - this.sy(y2)), fill: color || '#3459e8', opacity: o.opacity || 0.12 }, this.layerCurves);
  };

  return {
    parse: parse, compile: compile, diff: diff, derive: function (src, params) { return diff(typeof src === 'string' ? parse(src, params) : (src.tree || src)); },
    toString: toString, pretty: pretty, equivalent: equivalent, numDiff: numDiff, bisect: bisect, roots: roots,
    Graph: Graph, fmt: fmtNum, evalTree: ev,
    _n: { N: N, add: add, mul: mul, pow: pow }
  };
});
