import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const FX = require('../site/assets/fx.js');
let fail = 0;
function ok(c, m) { if (!c) { fail++; console.log('ECHEC', m); } }
const cases = [
  ['x^2','2x'],['3x^2-2x+1','6x-2'],['1/x','-1/x^2'],['sqrt(x)','1/(2sqrt(x))'],
  ['x*e^x','e^x+x*e^x'],['e^(2x+1)','2e^(2x+1)'],['(2x+1)^3','6(2x+1)^2'],
  ['ln(x)','1/x'],['x ln(x)','ln(x)+1'],['(x^2+1)/(x-1)','(2x(x-1)-(x^2+1))/(x-1)^2'],
  ['sin(2x)','2cos(2x)'],['cos(x)^2','-2cos(x)sin(x)'],['2^x','2^x*ln(2)'],['x^x','x^x*(ln(x)+1)'],
  ['xe^(-x)','e^(-x)-xe^(-x)'],['-x^3+3x','-3x^2+3'],['√(x)','1/(2√x)'],['x²-4x+3','2x-4'],
  ['tan(x)','1+tan(x)^2'],['5','0'],['(3x-1)/(x+2)','7/(x+2)^2'],['exp(3x)','3exp(3x)'],
];
for (const [f, d] of cases) {
  const got = FX.derive(f);
  const g = FX.compile(got);
  const ref = FX.compile(d);
  ok(FX.equivalent(g, ref, { lo: 0.3, hi: 4 }), `d/dx ${f} = ${FX.toString(got)} (attendu ${d})`);
  // contre-vérification numérique
  const h = FX.compile(f);
  for (const x of [0.7, 1.9, 3.1]) {
    const nd = FX.numDiff(h, x), sd = g(x);
    if (isFinite(nd)) ok(Math.abs(nd - sd) < 1e-4 * Math.max(1, Math.abs(nd)), `numérique ${f} en ${x}: ${nd} vs ${sd}`);
  }
}
// équivalence : formes équivalentes et non équivalentes
ok(FX.equivalent('(x+1)^2', 'x^2+2x+1'), 'identité remarquable');
ok(!FX.equivalent('(x+1)^2', 'x^2+1'), 'non équivalent');
ok(FX.equivalent('2(x-3)', '2x-6'), 'distributivité');
ok(FX.equivalent('(x^2-1)/(x-1)', 'x+1'), 'simplification avec trou');
ok(FX.equivalent('e^x*e^2', 'e^(x+2)'), 'puissances');
ok(!FX.equivalent('2x', '2x+0.001'), 'tolérance');
// parseur : erreurs
for (const bad of ['2+', '(x', 'x$', 'foo(x)', '']) { let t = false; try { FX.parse(bad); } catch (e) { t = true; } ok(t, 'devrait échouer : ' + bad); }
// valeurs
ok(Math.abs(FX.compile('2x^2-3')(2) - 5) < 1e-12, 'évaluation');
ok(Math.abs(FX.compile('1/2x')(4) - 2) < 1e-12, 'implicite');
ok(isNaN(FX.compile('ln(x)')(-1)), 'ln négatif');
ok(isNaN(FX.compile('sqrt(x)')(-1)), 'sqrt négatif');
// racines et dichotomie
const r = FX.roots(FX.compile('x^3-3x+1'), -3, 3);
ok(r.length === 3 && Math.abs(r[0] + 1.879385) < 1e-5, 'racines ' + r);
console.log('affichage :', ['x^2','x e^x','(2x+1)^3','1/x','sqrt(x)','(x^2+1)/(x-1)','cos(x)^2','xe^(-x)'].map(s => s + ' -> ' + FX.pretty(FX.toString(FX.derive(s)))).join('\n  '));
console.log(fail ? fail + ' échec(s)' : 'tous les tests passent');
process.exit(fail ? 1 : 0);
