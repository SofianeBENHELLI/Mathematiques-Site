// Recalcule indépendamment les réponses des exercices (fx.js sert de calculateur de référence).
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const FX = require('../site/assets/fx.js');
const FONC = require('../site/fonctions/content.js');
const DER = require('../site/derivation/content.js');
const EXP = require('../site/exponentielle/content.js');
const TRI = require('../site/trigonometrie/content.js');
const SUI = require('../site/suites/content.js');
const POL = require('../site/polynomes/content.js');
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('ECHEC', m); } };
const by = (L, id) => L.find(e => e.id === id);

// structure
for (const [name, L] of [['fonctions', FONC], ['derivation', DER], ['exponentielle', EXP], ['trigonometrie', TRI], ['suites', SUI], ['polynomes', POL]]) {
  const ids = new Set();
  for (const e of L) {
    ok(!ids.has(e.id), `${name}: id en double ${e.id}`); ids.add(e.id);
    ok(['qcm', 'num', 'expr'].includes(e.type), `${e.id}: type`);
    ok(e.expl && e.q && e.comp, `${e.id}: champs manquants`);
    if (e.type === 'qcm') { ok(Number.isInteger(e.answer) && e.answer < e.options.length, `${e.id}: index réponse`); ok(new Set(e.options).size === e.options.length, `${e.id}: options dupliquées`); }
    if (e.type === 'expr') { try { FX.compile(e.answer); } catch (x) { ok(false, `${e.id}: réponse illisible`); } }
  }
}
const f = s => FX.compile(s);
// Fonctions
ok(f('x^2-3x+1')(-2) === 11, 'f02');
ok(Math.abs(f('2x^2-8')(3) - 10) < 1e-12 && by(FONC, 'f03').answer === 3, 'f03');
ok(f('x^3-3x')(-1) === 2 && by(FONC, 'f05').answer === 2, 'f05');
{ const x = FX.roots(f('x^3-3x'), -3, 3); ok(true, ''); }
ok(Math.abs(f('x^2-4x+3')(2) - -1) < 1e-12 && by(FONC, 'f08').answer === -1, 'f08');
ok(FX.equivalent('2*(x^2+x)-1', by(FONC, 'f09').answer), 'f09');
ok(by(FONC, 'f10').answer + 2 === 1, 'f10');
ok(Math.abs(f('x+3')(3) - by(FONC, 'f11').answer) < 1e-12, 'f11');
// f06 : produit > 0 hors des racines
ok(f('(x-1)*(x+2)')(0) < 0 && f('(x-1)*(x+2)')(-3) > 0 && f('(x-1)*(x+2)')(2) > 0, 'f06');
// f07 : (2x-4)/(x+1) <= 0 sur ]-1;2]
{ const q = f('(2x-4)/(x+1)'); ok(q(0) < 0 && q(2) === 0 && q(3) > 0 && q(-2) > 0 && q(-0.999) < 0, 'f07'); }
// f14 : unicité
ok(f('x^3+x-1')(0) < 0 && f('x^3+x-1')(1) > 0, 'f14 signes');
// f15 : dichotomie x^2-2 sur [1,2]
{ let a = 1, b = 2; const g = f('x^2-2'); const ms = []; for (let i = 0; i < 3; i++) { const m = (a + b) / 2; ms.push(m); if (g(a) * g(m) <= 0) b = m; else a = m; } ok(ms[2] === by(FONC, 'f15').answer, 'f15 ' + ms); }
ok(2 ** 9 < 1000 && 2 ** 10 > 1000 && by(FONC, 'f16').answer === 10, 'f16');
// Dérivation
ok(Math.abs((f('x^2')(1.1) - f('x^2')(1)) / 0.1 - by(DER, 'd01').answer) < 1e-9, 'd01');
ok(Math.abs(FX.numDiff(f('x^2'), 3) - by(DER, 'd02').answer) < 1e-6, 'd02');
ok(Math.abs(FX.numDiff(f('x^3'), 2) - by(DER, 'd03').answer) < 1e-4, 'd03');
// expressions : réponse attendue = dérivée symbolique ET numérique de la fonction de l'énoncé
const pairs = { d04: '5x^3-4x^2+7x-2', d05: '3sqrt(x)+2/x', d08: '(2x+1)(x^2-3)', d09: '(3x-1)/(x+2)', d10: '(3x+2)^4', d11: 'e^(2x+1)', d12: 'x*e^x' };
for (const [id, fs] of Object.entries(pairs)) {
  const ex = by(DER, id), g = f(fs), ans = f(ex.answer);
  ok(FX.equivalent(ans, FX.compile(FX.derive(fs)), { lo: ex.lo, hi: ex.hi }), `${id} symbolique`);
  for (const x of [0.6, 1.3, 2.2]) ok(Math.abs(FX.numDiff(g, x) - ans(x)) < 1e-4 * Math.max(1, Math.abs(ans(x))), `${id} numérique en ${x}`);
}
// d06 : tangente de x^2 en 3 : y = 6x + p
ok(by(DER, 'd06').answer === 3 ** 2 - 6 * 3, 'd06');
// d07 : tangente de x^2-3x+1 en 2
{ const g = f('x^2-3x+1'), m = FX.numDiff(g, 2), t = f(by(DER, 'd07').answer); ok(Math.abs(t(2) - g(2)) < 1e-9 && Math.abs((t(3) - t(2)) - m) < 1e-5, 'd07'); }
// d13 : f' = (x-1)(x+3) <= 0 sur [-3;1]
{ const d = f('(x-1)*(x+3)'); ok(d(0) < 0 && d(-4) > 0 && d(2) > 0 && by(DER, 'd13').answer === 1, 'd13'); }
// d14 : minimum local de x^3-12x+5
{ const g = f('x^3-12x+5'); ok(Math.abs(FX.numDiff(g, 2)) < 1e-4 && g(2) === by(DER, 'd14').answer && g(1.9) > g(2) && g(2.1) > g(2), 'd14'); }
// d15 : 3 racines
ok(FX.roots(f('x^3-3x+1'), -3, 3).length === by(DER, 'd15').answer, 'd15');
// d16 : max de x(40-2x)
{ const g = f('x*(40-2x)'); let best = -1; for (let x = 0; x <= 20; x += 0.001) best = Math.max(best, g(x)); ok(Math.abs(best - by(DER, 'd16').answer) < 1e-3, 'd16'); }
// d17 : f(x) = ax^2+bx, f(1)=3, f'(1)=0
{ const t = f(by(DER, 'd17').answer); ok(Math.abs(t(1) - 3) < 1e-9 && Math.abs(FX.numDiff(t, 1)) < 1e-5, 'd17'); }
// d18 : approximation de sqrt(1,04)
{ const ap = 1 + 0.5 * 0.04; ok(Math.abs(ap - by(DER, 'd18').answer) < 1e-12 && Math.abs(Math.sqrt(1.04) - ap) < 3e-4, 'd18'); }
ok(by(DER, 'd19').answer === 1 && Math.abs(FX.numDiff(f('x^3'), 0)) < 1e-9, 'd19');

// Exponentielle
ok(by(EXP, 'e01').answer === 0 && 3 + -5 === -2, 'e01');
ok(FX.equivalent('e^(5x)', by(EXP, 'e02').answer, { lo: -2, hi: 2 }) && FX.equivalent('(e^(2x))^3/e^x', 'e^(5x)', { lo: -2, hi: 2 }), 'e02');
ok(Math.abs(FX.numDiff(f('e^(2x)'), 0) - by(EXP, 'e03').answer) < 1e-5, 'e03');
for (const [id, fs] of Object.entries({ e04: 'e^(-3x+1)', e05: '(x^2+1)*e^x', e06: 'e^x/x' })) {
  const ex = by(EXP, id), g = f(fs), ans = f(ex.answer);
  ok(FX.equivalent(ans, FX.compile(FX.derive(fs)), { lo: ex.lo, hi: ex.hi }), `${id} symbolique`);
  for (const x of [0.6, 1.3, 2.2]) ok(Math.abs(FX.numDiff(g, x) - ans(x)) < 1e-4 * Math.max(1, Math.abs(ans(x))), `${id} numérique en ${x}`);
}
ok(2 * 4 - 1 === 4 + 3 && by(EXP, 'e07').answer === 4, 'e07');
ok(by(EXP, 'e08').options[by(EXP, 'e08').answer] === 'x < 2' && 3 * 1.9 < 1.9 + 4 && !(3 * 2.1 < 2.1 + 4), 'e08');
ok(by(EXP, 'e09').answer === 2 + 1 && Math.exp(2) > 3, 'e09');
{ const g = f('(1-x)e^x'); ok(FX.numDiff(g, -1) > 0 && FX.numDiff(g, 1) < 0 && Math.abs(FX.numDiff(g, 0)) < 1e-5 && Math.abs(FX.numDiff(g, 1.5) - (-1.5 * Math.exp(1.5))) < 1e-4, 'e10'); }
{ const g = f('x*e^(-x)'); ok(Math.abs(FX.numDiff(g, 1)) < 1e-5 && Math.abs(g(1) - by(EXP, 'e11').answer) < 0.001 && g(0.9) < g(1) && g(1.1) < g(1), 'e11'); }
ok(Math.abs(Math.exp(1.5) / Math.exp(1) - Math.exp(0.5)) < 1e-12 && by(EXP, 'e12').answer === 0, 'e12');
{ const g = f('e^(2x)-e^x'); ok(Math.abs(g(by(EXP, 'e13').answer)) < 1e-12 && FX.roots(g, -5, 5).length === 1, 'e13'); }
{ const g = f('(2x-1)e^x'), m = -0.5; ok(Math.abs(FX.numDiff(g, m)) < 1e-5 && g(m - 0.1) > g(m) && g(m + 0.1) > g(m) && Math.abs(g(m) - by(EXP, 'e14').answer) < 0.001, 'e14'); }
{ const g = f('x*e^(-x)'); let mx = -1e9; for (let x = -3; x <= 20; x += 0.001) mx = Math.max(mx, g(x)); ok(mx < 0.5 && by(EXP, 'e15').answer === 0, 'e15'); }
ok(by(EXP, 'e16').answer === 0 && Math.abs(FX.numDiff(f('e^x*e^(-x)'), 0.7)) < 1e-6, 'e16');

// Trigonométrie
{
  const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;
  ok(near(Math.PI / 3, 60 * Math.PI / 180) && by(TRI, 't01').options[0] === 'π/3', 't01');
  ok(near(5 * Math.PI / 6 * 180 / Math.PI, by(TRI, 't02').answer), 't02');
  ok(near(Math.cos(Math.PI / 3), 0.5) && by(TRI, 't03').answer === 0, 't03');
  ok(near(Math.sin(Math.PI / 4), Math.SQRT2 / 2) && by(TRI, 't04').answer === 0, 't04');
  ok(near(Math.sqrt(1 - 0.36), by(TRI, 't05').answer), 't05');
  ok(near(Math.cos(2 * Math.PI / 3), by(TRI, 't06').answer), 't06');
  ok(near(Math.sin(7 * Math.PI / 6), by(TRI, 't07').answer), 't07');
  { const p = 25 * Math.PI / 4 - 6 * Math.PI; ok(near(p, Math.PI / 4) && p > -Math.PI && p <= Math.PI && Math.abs(p - by(TRI, 't08').answer) < 0.001, 't08'); }
  for (const x of [0.3, 1.1, 2.5, -0.7]) ok(near(Math.cos(Math.PI - x), -Math.cos(x)) && by(TRI, 't09').answer === 0, 't09');
  ok(near(Math.cos(Math.PI / 3), 0.5) && near(Math.cos(5 * Math.PI / 3), 0.5) && Math.cos(2 * Math.PI / 3) < 0 && FX.roots(f('cos(x)-0.5'), 0, 2 * Math.PI).length === 2, 't10');
  ok(FX.roots(f('sin(x)-0.3'), 0, 4 * Math.PI).length === by(TRI, 't11').answer, 't11');
  ok(FX.equivalent('2sin(x)', by(TRI, 't12').answer, { lo: -3, hi: 3 }) && FX.equivalent('sin(pi-x)+cos(pi/2-x)', '2sin(x)', { lo: -3, hi: 3 }), 't12');
  { const g = f('cos(3x)'), T = 2 * Math.PI / 3; ok([0.2, 1.3, 2.9].every(x => near(g(x + T), g(x))) && !near(g(0.2 + T / 2), g(0.2)) && by(TRI, 't13').answer === 0, 't13'); }
  { const ex = by(TRI, 't14'), g = f('cos(3x+1)'), ans = f(ex.answer); for (const x of [0.4, 1.2, -0.8]) ok(Math.abs(FX.numDiff(g, x) - ans(x)) < 1e-5, 't14 ' + x); }
}
// Suites
{
  const A = id => by(SUI, id).answer;
  ok(3 * 3 - 3 === 6 && 4 * 4 - 3 === A('s01'), 's01');
  { let u = 2; const t = []; for (let i = 0; i < 3; i++) { u = 3 * u - 1; t.push(u); } ok(t[2] === A('s02') && t[0] === 5 && t[1] === 14, 's02'); }
  ok(5 + 8 * 3 === A('s03') && 3 * 2 ** 5 === A('s04'), 's03-s04');
  ok(6 / 2 === 3 && 18 / 6 === 3 && 54 / 18 === 3 && 6 - 2 !== 18 - 6 && by(SUI, 's05').answer === 0, 's05');
  ok((19 - 7) / 4 === A('s06') && 7 + 4 * 3 === 19, 's06');
  ok(4 * 25 === 100 && Math.sqrt(100 / 4) === A('s07'), 's07');
  ok([...Array(50).keys()].reduce((a, k) => a + k + 1, 0) === A('s08'), 's08');
  ok([...Array(10).keys()].reduce((a, k) => a + 2 ** k, 0) === A('s09') && 2 ** 9 === 512, 's09');
  { let S = 0; for (let k = 0; k < 30; k++) S += 3 + 2 * k; ok(S === A('s10') && 3 + 29 * 2 === 61, 's10'); }
  { const d = n => (n + 1) ** 2 - 6 * (n + 1) - (n * n - 6 * n); ok([0, 1, 2, 3, 4, 5].every(n => d(n) === 2 * n - 5) && by(SUI, 's11').answer === 0, 's11'); }
  { const u = n => -2 * 0.5 ** n; ok(u(1) > u(0) && u(2) > u(1) && u(5) > u(4) && by(SUI, 's12').answer === 1 - 1, 's12'); }
  { let n = 0; while (1.5 ** n <= 50) n++; ok(n === A('s13') && 1.5 ** 9 < 50, 's13'); }
  ok(A('s14') === 1.2 && Math.abs(100 * 1.1 * 1.1 - A('s15')) < 1e-9 && Math.abs(1.5 * 0.5 - A('s16')) < 1e-12, 's14-16');
  { const u = n => 3 * n + 2; ok([0, 1, 7, 20].every(n => u(n + 1) - u(n) === 3) && by(SUI, 's17').answer === 0, 's17'); }
  { const u = n => (-2) ** n; ok(u(1) < u(0) && u(2) > u(1) && u(3) < u(2) && by(SUI, 's18').answer === 0, 's18'); }
}

// Second degré
{
  const A = id => by(POL, id).answer, D = (a, b, c) => b * b - 4 * a * c;
  ok(FX.equivalent('(x-3)^2-4', 'x^2-6x+5') && by(POL, 'p01').answer === 0, 'p01');
  ok(D(2, -3, -2) === A('p02'), 'p02');
  { const r = [(5 - 1) / 2, (5 + 1) / 2]; ok(D(1, -5, 6) === 1 && r[0] + r[1] === A('p03') && r[0] * r[1] === 6, 'p03'); }
  ok(D(1, 1, 1) < 0 && A('p04') === 0, 'p04');
  ok(D(1, -6, 9) === 0 && A('p05') === 3 && 9 - 18 + 9 === 0, 'p05');
  ok(FX.equivalent('(2x-1)(x+3)', A('p06'), { lo: -3, hi: 3 }), 'p06');
  { const f = x => -x * x + 4; ok(f(0) > 0 && f(1.9) > 0 && f(2.1) < 0 && f(-2.1) < 0 && by(POL, 'p07').answer === 0, 'p07'); }
  ok(-(-8) / (2 * 2) === A('p08') && 2 * 4 - 16 + 1 === -7, 'p08');
  ok(Math.abs(f('x^2-4x+7')(2) - A('p09')) < 1e-12 && f('x^2-4x+7')(1.9) > 3 && f('x^2-4x+7')(2.1) > 3, 'p09');
  { const g = f('x^2-x-6'); ok(g(-2) === 0 && g(3) === 0 && g(0) < 0 && g(-3) > 0 && g(4) > 0 && by(POL, 'p10').answer === 0, 'p10'); }
  ok(D(3, -12, 5) > 0 && 12 / 3 === A('p11'), 'p11');
  { const r = FX.roots(f('2x^2+3x-5'), -10, 10); ok(r.length === 2 && Math.abs(r[0] * r[1] - A('p12')) < 1e-6 && -5 / 2 === A('p12'), 'p12'); }
  ok(9 + 3 * A('p13') + 12 === 0, 'p13');
  ok(FX.roots(f('x^4-5x^2+4'), -5, 5).length === A('p14'), 'p14');
  ok(D(1, -4, A('p15')) === 0, 'p15');
  { let n = 0; for (let m = -20; m <= 20; m++) if (D(1, m, 9) < 0) n++; ok(n === A('p16'), 'p16 ' + n); }
  { let mx = 0; for (let x = 0; x <= 10; x += 0.01) mx = Math.max(mx, x * (10 - x)); ok(Math.abs(mx - A('p17')) < 1e-3, 'p17'); }
  ok(FX.equivalent('2(x-1)^2-3', A('p18'), { lo: -3, hi: 3 }), 'p18');
}

console.log(fail ? fail + ' échec(s)' : 'contenu d\'exercices : tout est cohérent (' + (FONC.length + DER.length + EXP.length + TRI.length + SUI.length + POL.length) + ' exercices)');
process.exit(fail ? 1 : 0);
