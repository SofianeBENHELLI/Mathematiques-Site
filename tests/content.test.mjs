// Recalcule indépendamment les réponses des exercices (fx.js sert de calculateur de référence).
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const FX = require('../site/assets/fx.js');
const FONC = require('../site/fonctions/content.js');
const DER = require('../site/derivation/content.js');
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('ECHEC', m); } };
const by = (L, id) => L.find(e => e.id === id);

// structure
for (const [name, L] of [['fonctions', FONC], ['derivation', DER]]) {
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
console.log(fail ? fail + ' échec(s)' : 'contenu d\'exercices : tout est cohérent (' + (FONC.length + DER.length) + ' exercices)');
process.exit(fail ? 1 : 0);
