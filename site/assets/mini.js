/* mini.js : briques communes des mini-sites Fonctions et Dérivation.
   Dépend de fx.js. Exercices corrigés, progression locale, tableau de variations. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./fx.js'));
  else root.Mini = factory(root.FX);
})(typeof self !== 'undefined' ? self : this, function (FX) {
  'use strict';

  /* ---------- Stockage local, tolérant aux erreurs ---------- */
  var mem = {};
  function store(key, val) {
    try {
      if (val === undefined) { var r = localStorage.getItem(key); return r === null ? (mem[key] || null) : r; }
      localStorage.setItem(key, val);
    } catch (e) { if (val === undefined) return mem[key] || null; mem[key] = val; }
  }
  function load(ns) { try { return JSON.parse(store('maths-sanaa:' + ns) || '{}') || {}; } catch (e) { return {}; } }
  function save(ns, d) { store('maths-sanaa:' + ns, JSON.stringify(d)); }

  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Lecture d'une réponse numérique ou d'une fraction ---------- */
  function readNumber(s) {
    s = String(s).trim().replace(',', '.');
    if (!s) return NaN;
    try { return FX.compile(s)(0); } catch (e) { return NaN; }
  }

  /* ---------- Moteur d'exercices ---------- */
  function exercises(rootEl, list, ns, opts) {
    opts = opts || {};
    var state = load(ns);
    var bar = h('<div class="ex-progress" aria-live="polite"></div>');
    rootEl.appendChild(bar);
    function refresh() {
      var ok = list.filter(function (e) { return state[e.id] === 'ok'; }).length;
      bar.innerHTML = '<b>' + ok + ' / ' + list.length + '</b> exercices réussis <span class="ex-track"><i style="width:' + Math.round(100 * ok / list.length) + '%"></i></span>' +
        '<button type="button" class="ex-reset">Recommencer</button>';
      bar.querySelector('.ex-reset').onclick = function () { state = {}; save(ns, state); rootEl.innerHTML = ''; exercises(rootEl, list, ns, opts); };
    }
    refresh();
    list.forEach(function (ex, idx) {
      var stars = '★'.repeat(ex.level || 1) + '☆'.repeat(3 - (ex.level || 1));
      var card = h('<article class="ex" id="ex-' + esc(ex.id) + '"><header><span class="ex-n">Exercice ' + (idx + 1) + '</span><span class="ex-level" title="Difficulté">' + stars + '</span>' +
        (ex.comp ? '<span class="ex-comp" title="Compétence de la spécification">' + esc(ex.comp) + '</span>' : '') +
        '<span class="ex-state"></span></header><div class="ex-q">' + ex.q + '</div><div class="ex-body"></div><div class="ex-fb" aria-live="polite"></div><div class="ex-actions"></div><div class="ex-expl" hidden></div></article>');
      var body = card.querySelector('.ex-body'), fb = card.querySelector('.ex-fb'), act = card.querySelector('.ex-actions'), expl = card.querySelector('.ex-expl'), st = card.querySelector('.ex-state');
      var hintN = 0, tries = 0;
      function mark() { st.textContent = state[ex.id] === 'ok' ? '✓ réussi' : state[ex.id] === 'seen' ? 'corrigé vu' : ''; st.className = 'ex-state ' + (state[ex.id] || ''); }
      function good(msg) { fb.className = 'ex-fb good'; fb.textContent = msg || 'Correct.'; if (state[ex.id] !== 'ok') { state[ex.id] = 'ok'; save(ns, state); refresh(); mark(); } showExpl(); }
      function bad(msg) { tries++; fb.className = 'ex-fb bad'; fb.innerHTML = msg || 'Pas encore. Relis la question, utilise un indice ou compare avec un cas simple.'; }
      function showExpl() { expl.hidden = false; expl.innerHTML = '<b>Correction</b><div>' + ex.expl + '</div>'; }
      if (ex.type === 'qcm') {
        var grid = h('<div class="answers"></div>');
        ex.options.forEach(function (o, i) {
          var b = h('<button type="button">' + o + '</button>');
          b.onclick = function () {
            if (i === ex.answer) { b.className = 'correct'; good('Bonne réponse.'); }
            else { b.className = 'wrong'; bad(ex.wrong && ex.wrong[i] ? ex.wrong[i] : 'Ce n’est pas la bonne réponse. Élimine ce qui est incompatible avec la question.'); }
          };
          grid.appendChild(b);
        });
        body.appendChild(grid);
      } else {
        var inp = h('<input type="text" class="ex-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + esc(ex.placeholder || (ex.type === 'expr' ? 'ex. 3x^2 - 2x' : 'ta réponse')) + '" aria-label="Ta réponse">');
        var btn = h('<button type="button" class="primary">Vérifier</button>');
        var row = h('<div class="ex-row"></div>'); row.appendChild(inp); row.appendChild(btn); body.appendChild(row);
        if (ex.type === 'expr') body.appendChild(h('<p class="ex-tip">Écris par exemple <code>x^2</code>, <code>2x+1</code>, <code>e^(2x)</code>, <code>sqrt(x)</code>, <code>(x+1)/(x-2)</code>, <code>ln(x)</code>. Toute forme équivalente est acceptée.</p>'));
        var check = function () {
          var v = inp.value.trim();
          if (!v) { bad('Écris une réponse avant de vérifier.'); return; }
          if (ex.type === 'num') {
            var n = readNumber(v);
            if (isNaN(n)) { bad('Je ne comprends pas ce nombre. Écris un nombre ou une fraction, par exemple 2,5 ou 5/2.'); return; }
            var tol = ex.tol === undefined ? 1e-6 : ex.tol;
            if (Math.abs(n - ex.answer) <= tol) good('Correct : ' + FX.fmt(ex.answer) + '.');
            else bad(ex.hintWrong ? ex.hintWrong(n) : 'Ce n’est pas la valeur attendue.');
          } else {
            var c; try { c = FX.compile(v); } catch (e) { bad('Expression illisible : ' + esc(e.message) + '. Vérifie les parenthèses et écris le produit avec * ou colle les termes (2x).'); return; }
            if (FX.equivalent(c, ex.answer, { lo: ex.lo, hi: ex.hi })) good('Correct : ton expression est équivalente à la réponse attendue.');
            else bad(ex.hintWrong ? ex.hintWrong(v) : 'Cette expression n’est pas équivalente à la réponse attendue. Teste-la en x = 1 et compare.');
          }
        };
        btn.onclick = check; inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      }
      if (ex.hints && ex.hints.length) {
        var hb = h('<button type="button">Indice</button>');
        hb.onclick = function () {
          if (hintN < ex.hints.length) { fb.className = 'ex-fb hint'; fb.innerHTML = '<b>Indice ' + (hintN + 1) + '/' + ex.hints.length + ' :</b> ' + ex.hints[hintN]; hintN++; }
          if (hintN >= ex.hints.length) hb.disabled = true;
        };
        act.appendChild(hb);
      }
      var cb = h('<button type="button">Voir la correction</button>');
      cb.onclick = function () { if (state[ex.id] !== 'ok') { state[ex.id] = 'seen'; save(ns, state); mark(); } showExpl(); };
      act.appendChild(cb);
      mark();
      if (state[ex.id] === 'ok') { /* on laisse la correction repliée */ }
      rootEl.appendChild(card);
    });
  }

  /* ---------- Tableau de variations automatique ---------- */
  function signChars(v) { return v > 0 ? '+' : v < 0 ? '−' : '0'; }
  function variationTable(f, lo, hi, opts) {
    opts = opts || {};
    var df = opts.df || function (x) { return FX.numDiff(f, x, 1e-5); };
    var crit = FX.roots(df, lo, hi, 1500).filter(function (r) { return r > lo + 1e-6 && r < hi - 1e-6; });
    // dédoublonnage
    var pts = [lo], i;
    crit.forEach(function (r) { if (Math.abs(r - pts[pts.length - 1]) > 1e-4) pts.push(r); });
    pts.push(hi);
    var signs = [], vals = pts.map(function (x) { return f(x); });
    for (i = 0; i < pts.length - 1; i++) { var m = (pts[i] + pts[i + 1]) / 2; signs.push(df(m) >= 0 ? 1 : -1); }
    var r2 = function (v) { return isFinite(v) ? FX.fmt(Math.round(v * 100) / 100) : 'non défini'; };
    var head = '<tr><th scope="row">x</th>' + pts.map(function (x, j) { return '<td class="cx">' + r2(x) + '</td>' + (j < pts.length - 1 ? '<td></td>' : ''); }).join('') + '</tr>';
    var sg = '<tr><th scope="row">signe de f′(x)</th>' + pts.map(function (x, j) {
      var cell = (j > 0 && j < pts.length - 1) ? '<td class="cx">0</td>' : '<td></td>';
      return cell + (j < pts.length - 1 ? '<td class="cs ' + (signs[j] > 0 ? 'up' : 'down') + '">' + (signs[j] > 0 ? '+' : '−') + '</td>' : '');
    }).join('') + '</tr>';
    var va = '<tr><th scope="row">variations de f</th>' + pts.map(function (x, j) {
      var up = j < signs.length ? signs[j] : 0;
      var dirPrev = j > 0 ? signs[j - 1] : 0;
      var cls = (j === 0 || j === pts.length - 1) ? '' : (dirPrev > 0 && up < 0 ? 'max' : dirPrev < 0 && up > 0 ? 'min' : '');
      var cell = '<td class="cv ' + cls + '">' + r2(vals[j]) + '</td>';
      return cell + (j < pts.length - 1 ? '<td class="ca ' + (signs[j] > 0 ? 'up' : 'down') + '">' + (signs[j] > 0 ? '↗' : '↘') + '</td>' : '');
    }).join('') + '</tr>';
    return { html: '<table class="vt" aria-label="Tableau de variations">' + head + sg + va + '</table>', points: pts, signs: signs, values: vals };
  }

  /* ---------- Intervalles de solutions de f(x) > k ---------- */
  function solveIneq(f, k, lo, hi, strictGreater) {
    var N = 4000, out = [], start = null, prevIn = false, dx = (hi - lo) / N;
    for (var i = 0; i <= N; i++) {
      var x = lo + dx * i, y = f(x), inside = isFinite(y) && (strictGreater ? y > k : y < k);
      if (inside && !prevIn) start = x;
      if (!inside && prevIn) out.push([start, x - dx]);
      prevIn = inside;
    }
    if (prevIn) out.push([start, hi]);
    return out;
  }

  /* ---------- Éléments d'interface ---------- */
  function slider(id, label, min, max, step, value, onInput) {
    var w = h('<label class="sl"><span>' + label + ' <output id="' + id + '-o"></output></span><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '"></label>');
    var inp = w.querySelector('input'), out = w.querySelector('output');
    function upd() { out.textContent = FX.fmt(+inp.value); onInput(+inp.value); }
    inp.addEventListener('input', upd);
    setTimeout(upd, 0);
    w.input = inp; w.set = function (v) { inp.value = v; upd(); };
    return w;
  }
  function select(id, label, options, onChange) {
    var w = h('<label class="sel"><span>' + label + '</span><select id="' + id + '">' + options.map(function (o, i) { return '<option value="' + i + '">' + o + '</option>'; }).join('') + '</select></label>');
    var s = w.querySelector('select');
    s.addEventListener('change', function () { onChange(+s.value); });
    w.select = s; return w;
  }
  function checklist(rootEl, ns, items) {
    var state = load(ns + ':check');
    items.forEach(function (it, i) {
      var l = h('<label><input type="checkbox"' + (state[i] ? ' checked' : '') + '> <span>' + it + '</span></label>');
      l.querySelector('input').onchange = function (e) { state[i] = e.target.checked; save(ns + ':check', state); };
      rootEl.appendChild(l);
    });
  }

  return { exercises: exercises, variationTable: variationTable, solveIneq: solveIneq, slider: slider, select: select, checklist: checklist, h: h, esc: esc, load: load, save: save, readNumber: readNumber };
});
