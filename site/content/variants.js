const VARIANTS=(()=>{const ri=(r,a,b)=>a+Math.floor(r()*(b-a+1)),e=(prompt,answer,solution,unit='')=>({prompt,answer,solution,unit,tolerance:.005});return {
d1:r=>{let a=ri(r,-4,4),b=ri(r,-5,5),c=ri(r,1,5);return e(`f(x) = ${c}x² + (${b})x. Calcule f′(${a}).`,2*c*a+b,`f′(x) = ${2*c}x + (${b}), donc f′(${a}) = ${2*c*a+b}.`)},
d2:r=>{let a=ri(r,1,6),b=ri(r,1,12);return e(`f(x) = −${a}x² + ${b}x sur ℝ. À quelle abscisse le maximum est-il atteint ?`,b/(2*a),`f′(x) = −${2*a}x + ${b}, positive avant x = ${b}/${2*a}, négative après. Le maximum est atteint en ${b/(2*a)}.`)},
d3:r=>{let a=ri(r,-6,6),b=ri(r,-6,6);return e(`Écris e^(${a}) × e^(${b}) sous la forme eᵏ. Quelle est la valeur de k ?`,a+b,`On additionne les exposants : k = (${a}) + (${b}) = ${a+b}.`)},
d4:r=>{let a=ri(r,-8,8);return e(`L’angle θ vaut ${a}π/6 radians. Combien cela représente-t-il en degrés ?`,a*30,`π radians correspondent à 180°, donc θ = ${a} × 180/6 = ${a*30}°.`, '°')},
g1:r=>{let a=ri(r,-4,4),b=ri(r,-4,4),c=ri(r,-4,4),d=ri(r,-4,4);return e(`Dans un repère orthonormé, u = (${a} ; ${b}) et v = (${c} ; ${d}). Calcule u·v.`,a*c+b*d,`u·v = ${a} × (${c}) + ${b} × (${d}) = ${a*c+b*d}.`)},
g2:r=>{let a=ri(r,-4,4),b=ri(r,-4,4),radius=ri(r,1,5);return e(`Un cercle de centre (${a} ; ${b}) et de rayon ${radius} a pour équation (x − (${a}))² + (y − (${b}))² = k. Trouve k.`,radius*radius,`Le second membre est R² : ${radius}² = ${radius*radius}.`)},
p1:r=>{let p=ri(r,1,9)/10,q=ri(r,1,9)/10;return e(`P(A) = ${p} et P(B sachant A) = ${q}. Calcule P(A ∩ B), sous forme décimale.`,p*q,`P(A ∩ B) = P(A) × Pₐ(B) = ${p} × ${q} = ${Number((p*q).toFixed(2))}.`)},
p2:r=>{let p=ri(r,1,9)/10,gain=ri(r,1,10),cost=ri(r,1,4);return e(`Un jeu verse ${gain} € avec probabilité ${p}, sinon 0 €. La mise est ${cost} €. Quelle est l’espérance du gain net ?`,p*gain-cost,`E(gain net) = ${p} × ${gain} − ${cost} = ${Number((p*gain-cost).toFixed(2))} €.`, '€')},
m1:r=>{let base=ri(r,2,10)*20,t=ri(r,1,6)*5;return e(`Un article coûte ${base} €. Son prix baisse de ${t} %. Quel est le nouveau prix ?`,base*(1-t/100),`Le coefficient est 1 − ${t}/100 = ${1-t/100}. Prix final : ${Number((base*(1-t/100)).toFixed(2))} €.`, '€')},
m2:r=>{let u=ri(r,1,8),d=ri(r,1,5),n=ri(r,2,8);return e(`Python : u = ${u}, puis ${n} itérations de « u = u + ${d} ». Quelle est la valeur finale de u ?`,u+n*d,`On ajoute ${d} exactement ${n} fois : ${u} + ${n} × ${d} = ${u+n*d}.`)}
}})();
if(typeof module!=='undefined')module.exports=VARIANTS;
