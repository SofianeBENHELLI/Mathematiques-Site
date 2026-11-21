(() => {
const e=(prompt,answer,solution,hint)=>({prompt,answer,solution,hint});
const q=(prompt,options,answer,solution)=>({prompt,options,answer,solution});
globalThis.LEGACY_PRACTICE={
suites:{recap:'Une suite est une liste de nombres repérés par un rang entier. u₀ est le terme de rang 0, u₁ le suivant. Une suite arithmétique ajoute toujours le même nombre r ; une suite géométrique multiplie toujours par le même nombre q.',example:'Avec u₀=2 et uₙ₊₁=uₙ+3 : u₁=2+3=5, puis u₂=5+3=8. On écrit les rangs 0, 1, 2 au-dessus des valeurs 2, 5, 8. Deux passages séparent u₀ de u₂.',prereq:'Les indices donnent des rangs, pas des multiplications : u₃ signifie « terme de rang 3 ». Pour une hausse de 10 %, on multiplie par 1,10. Pour un calcul direct uₙ=2+3n, remplace n par le rang voulu.',link:'../#/m1',label:'Approfondir les pourcentages et les calculs',exercises:[
e('u₀=2 et on ajoute 3 à chaque étape. Calcule u₁.',5,'u₁=u₀+3=2+3=5. On effectue une seule addition.','Écris le passage du rang 0 au rang 1.'),
e('Avec u₀=2 et uₙ₊₁=uₙ+3, calcule u₂.',8,'u₁=5 puis u₂=5+3=8. Deux passages donnent 2+2×3=8.','Repars de u₁=5.'),
e('u₀=3 et on multiplie chaque terme par 2. Calcule u₁.',6,'u₁=2×u₀=2×3=6. La règle multiplie, elle n’ajoute pas 2.','Applique la règle une seule fois.'),
e('uₙ=4+2n. Calcule u₃.',10,'On remplace n par 3 : u₃=4+2×3=10.','Le rang 3 remplace seulement n.'),
e('u₀=2 et la raison géométrique est q=3. Calcule u₃.',54,'u₁=6, u₂=18, u₃=54. La formule donne aussi 2×3³=54.','Du rang 0 au rang 3, il y a trois multiplications.'),
e('Combien de termes contient u₂+u₃+…+u₆ ?',5,'Les rangs sont 2, 3, 4, 5, 6 : cinq termes. On retrouve 6−2+1=5.','Écris tous les rangs, en incluant les deux bornes.'),
e('u₀=2 et r=3. Calcule u₀+u₁+u₂+u₃.',26,'Les termes sont 2, 5, 8, 11. Somme : 26. La formule donne 4×(2+11)/2=26.','Il y a quatre termes et trois transitions.'),
e('u₀=3 et q=2. Calcule u₀+u₁+u₂+u₃.',45,'3+6+12+24=45. La somme géométrique vaut aussi 3×(1−2⁴)/(1−2)=45.','Commence par calculer les quatre termes.'),
e('Une épargne vaut uₙ=100+20n. Quel est le premier rang où elle atteint au moins 170 € ?',4,'100+20n≥170 donne n≥3,5. Le rang est entier : n=4. Vérification : u₃=160<170 et u₄=180≥170.','Le rang doit être entier ; vérifie le terme précédent.'),
e('u₀=−2 et uₙ₊₁=2uₙ. Calcule u₂−u₁, puis explique son signe sur ta feuille.',-4,'u₁=−4, u₂=−8, donc u₂−u₁=−4. En général uₙ<0 et uₙ₊₁−uₙ=uₙ<0 : la suite décroît. q>1 ne suffit pas seul.','Calcule les deux termes avec leur signe avant de soustraire.')],questions:[
q('u₀=2 et uₙ₊₁=uₙ+3. Combien vaut u₁ ?',['5','6','3'],0,'Une seule étape : u₁=2+3=5.'),
q('Dans u₃, le nombre 3 désigne…',['une multiplication par 3','le rang du terme','sa valeur'],1,'L’indice est le rang. Le terme u₃ peut avoir une valeur différente de 3.'),
q('On passe de 2 à 5, puis de 5 à 8, en ajoutant toujours 3. Cette règle est…',['géométrique','arithmétique','constante'],1,'La différence constante est r=3 : la suite est arithmétique.'),
q('u₀=3 et uₙ₊₁=2uₙ. Combien vaut u₂ ?',['6','9','12'],2,'u₁=6 puis u₂=12 : deux multiplications par 2.'),
q('Une quantité augmente de 10 % par période. Quelle est sa raison géométrique ?',['0,10','1,10','10'],1,'On conserve 100 % puis on ajoute 10 % : q=1+10/100=1,10.'),
q('De u₀ à u₄ inclus, il y a…',['4 termes','5 termes','6 termes'],1,'Les rangs sont 0, 1, 2, 3, 4 : cinq termes, mais quatre passages.'),
q('Pour u₀=4 et r=3, u₅ vaut…',['15','19','22'],1,'Du rang 0 au rang 5, on ajoute cinq fois la raison : u₅=u₀+5r=4+15=19.'),
q('1+2+…+10 vaut…',['50','55','100'],1,'Dix termes, moyenne des extrêmes (1+10)/2 : S=10×11/2=55.'),
q('u₀=−2 et q=2. La suite est…',['croissante','décroissante','constante'],1,'Les termes −2, −4, −8 diminuent. En général uₙ₊₁−uₙ=uₙ<0.'),
q('Observer 20 termes croissants prouve…',['la croissance à tout rang','seulement une observation sur ces termes','une limite infinie'],1,'Une fenêtre finie suggère une conjecture. Il faut une justification valable pour tout rang pour prouver la croissance.')]
},
polynomes:{recap:'Une fonction polynôme du second degré s’écrit f(x)=ax²+bx+c, avec a≠0. Pour calculer une image, remplace x par un nombre. Une racine est un nombre qui rend f(x) égal à 0. Le sommet se lit dans f(x)=a(x−h)²+k : S(h ; k).',example:'Pour f(x)=x²−4x+3 : a=1, b=−4 et c=3. f(0)=3. Pour x=1, f(1)=1−4+3=0 : 1 est une racine. La forme (x−2)²−1 donne directement le sommet S(2 ; −1).',prereq:'Un carré est positif ou nul : (−2)²=4. Pour f(−2), mets le nombre négatif entre parenthèses. Un produit est nul si au moins un facteur est nul. Le discriminant se calcule par Δ=b²−4ac.',link:'../#/m1',label:'Approfondir le calcul et les signes',exercises:[
e('Dans f(x)=2x²+3x+1, quelle est la valeur de a ?',2,'a est le coefficient de x². Ici a=2, b=3 et c=1.','Regarde le nombre devant x².'),
e('Pour f(x)=x²+1, calcule f(0).',1,'f(0)=0²+1=1. La courbe coupe l’axe vertical à la hauteur 1.','Remplace x par 0.'),
e('Pour f(x)=x², calcule f(2).',4,'f(2)=2²=2×2=4.','Un carré est un produit du nombre par lui-même.'),
e('Pour f(x)=x²−1, calcule f(1). Que signifie le résultat ?',0,'f(1)=1²−1=0. Donc 1 est une racine : la courbe passe par (1 ; 0).','Une racine annule la fonction.'),
e('f(x)=(x−3)²+2. Quelle est l’abscisse h du sommet ?',3,'La forme est (x−h)²+k avec h=3 et k=2 : S(3 ; 2).','Compare x−3 avec x−h.'),
e('Pour f(x)=x²−4x+3, calcule Δ.',4,'a=1, b=−4, c=3. Δ=(−4)²−4×1×3=16−12=4.','Le carré de b inclut le signe : (−4)²=16.'),
e('Pour x²−4x+3=0, Δ=4. Calcule la plus grande racine.',3,'x₂=(−b+√Δ)/(2a)=(4+2)/2=3. L’autre racine est (4−2)/2=1.','Utilise le signe + devant √Δ car a=1>0.'),
e('f(x)=−2(x−1)²+5. Quelle est sa valeur maximale ?',5,'Le carré est ≥0, donc −2(x−1)²≤0 et f(x)≤5. L’égalité est atteinte en x=1. Le maximum vaut 5.','Le coefficient devant le carré est négatif.'),
e('f(x)=(x−1)(x−3). Calcule f(2), puis explique son signe sur ta feuille.',-1,'f(2)=(2−1)(2−3)=1×(−1)=−1. Entre les racines, les deux facteurs sont de signes opposés.','À x=2, examine le signe de chaque facteur.'),
e('Un rectangle a un périmètre de 20 m. Son aire vaut A(x)=x(10−x). Donne son aire maximale en m².',25,'A(x)=−x²+10x=−(x−5)²+25. Le maximum vaut 25, atteint pour x=5, qui appartient à [0 ; 10]. Le rectangle est un carré.','Mets l’aire sous forme canonique et vérifie le domaine.')],questions:[
q('Dans f(x)=3x²+2x−1, le coefficient a vaut…',['3','2','−1'],0,'a multiplie x² ; b multiplie x ; c est le terme constant.'),
q('Pour f(x)=x²+2, f(0) vaut…',['0','2','4'],1,'Remplace x par 0 : f(0)=0²+2=2.'),
q('La courbe de f(x)=x² est tournée…',['vers le haut','vers le bas','c’est une droite'],0,'Le coefficient a=1 est positif : la parabole est ouverte vers le haut.'),
q('Une racine r vérifie…',['f(r)=r','f(r)=0','r=0'],1,'Une racine est une abscisse où la courbe rencontre l’axe horizontal.'),
q('Le sommet de f(x)=(x−2)²+3 est…',['(−2 ; 3)','(2 ; 3)','(3 ; 2)'],1,'Compare avec a(x−h)²+k : h=2 et k=3.'),
q('Le discriminant Δ s’écrit…',['b²−4ac','a²−4bc','b−4ac'],0,'On élève b au carré, puis on soustrait 4ac.'),
q('Si Δ>0, le polynôme possède…',['aucune racine réelle','une racine double','deux racines réelles distinctes'],2,'Les deux valeurs (−b−√Δ)/(2a) et (−b+√Δ)/(2a) sont distinctes.'),
q('f(x)=−(x−1)²+4 admet…',['un minimum 4','un maximum 4','un maximum 1'],1,'Le carré multiplié par −1 est ≤0, donc f(x)≤4, avec égalité en x=1.'),
q('Entre les racines 1 et 3, (x−1)(x−3) est…',['positif','négatif','nul partout'],1,'Le premier facteur est positif et le second négatif : leur produit est négatif.'),
q('Sur [0 ; 4], pour trouver le maximum d’une parabole, on compare…',['seulement les racines','les bornes et le sommet si son abscisse est dans l’intervalle','seulement f(0)'],1,'Le maximum sur un segment peut être au sommet ou à une borne : il faut examiner les candidats dans le domaine.')]
}};
})();
