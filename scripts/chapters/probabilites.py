C = dict(
    id='probabilites', title='Probabilités : conditionnelles, arbres, indépendance',
    desc='Probabilité conditionnelle, arbres pondérés, formule des probabilités totales, tableaux croisés, indépendance de deux événements et succession d’épreuves : cours, ateliers interactifs et exercices corrigés pour la Première spécialité.',
    brand='probabilités', sym='P(A|B)', tag='lire une probabilité comme une proportion',
    formula='P<sub>A</sub>(B) = P(A ∩ B) / P(A)',
    eyebrow='PREMIÈRE SPÉCIALITÉ · PROBABILITÉS',
    h1='Une probabilité, c’est <em>une part d’un tout.</em>',
    lead='Tu vas voir les probabilités comme des aires, ne plus confondre P<sub>A</sub>(B) et P<sub>B</sub>(A), lire un arbre pondéré sans te tromper et reconnaître deux événements indépendants.',
    parcours='Proportion → conditionnelle → arbre → totales → indépendance',
    nlabs=4, nex=16, footer='Probabilités',
    courses=[
        ('Vocabulaire et règles de base', '''<p class="formula">0 ≤ P(A) ≤ 1 &nbsp;&nbsp; P(Ā) = 1 − P(A)<br>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</p>
<p>A ∩ B signifie « A <b>et</b> B », A ∪ B signifie « A <b>ou</b> B » (ou non exclusif). Deux événements sont <b>incompatibles</b> si A ∩ B = ∅ : alors P(A ∪ B) = P(A) + P(B).</p>'''),
        ('Probabilité conditionnelle', '''<p class="formula">P<sub>A</sub>(B) = P(A ∩ B) / P(A) &nbsp;&nbsp; (P(A) ≠ 0)<br>P(A ∩ B) = P(A) × P<sub>A</sub>(B)</p>
<p>P<sub>A</sub>(B) est la probabilité de B <b>sachant que A est réalisé</b> : on se restreint à la part A de l'univers, et on regarde quelle fraction de A est aussi dans B.</p>
<p class="trap"><b>Piège.</b> P<sub>A</sub>(B) et P<sub>B</sub>(A) sont différents en général : la probabilité d'avoir de la fièvre sachant qu'on a la grippe n'est pas celle d'avoir la grippe sachant qu'on a de la fièvre. Et P(A ∩ B) n'est pas P<sub>A</sub>(B).</p>'''),
        ('Arbre pondéré et probabilités totales', '''<p>Sur un arbre, on écrit sur chaque branche la probabilité conditionnelle. La somme des probabilités des branches qui partent d'un même nœud vaut 1. La probabilité d'un chemin est le <b>produit</b> des probabilités le long du chemin.</p>
<p class="formula">P(B) = P(A ∩ B) + P(Ā ∩ B) = P(A)·P<sub>A</sub>(B) + P(Ā)·P<sub>Ā</sub>(B)</p>
<p>C'est la formule des probabilités totales : on <b>additionne</b> tous les chemins qui mènent à B. Pour inverser : P<sub>B</sub>(A) = P(A ∩ B)/P(B).</p>'''),
        ('Tableau croisé', '''<p>Un tableau d'effectifs donne toutes les probabilités : P(A ∩ B) = effectif(A et B)/total, P(A) = total de la ligne A/total, P<sub>A</sub>(B) = effectif(A et B)/total de la ligne A. Il est idéal pour passer de P<sub>A</sub>(B) à P<sub>B</sub>(A).</p>
<p>Méthode : remplir le tableau en fraction du total (ou sur un total de 1000 pour éviter les décimales).</p>'''),
        ('Indépendance de deux événements', '''<p class="formula">A et B indépendants ⇔ P(A ∩ B) = P(A) × P(B) ⇔ P<sub>A</sub>(B) = P(B)</p>
<p>Savoir que A est réalisé ne change pas la probabilité de B. Ne pas confondre avec incompatibles : deux événements incompatibles de probabilité non nulle ne sont <b>jamais</b> indépendants (si A se réalise, B ne peut plus se réaliser).</p>
<p>Pour montrer l'indépendance, on <b>calcule</b> P(A ∩ B) et on le compare à P(A)P(B). Si A et B sont indépendants, Ā et B le sont aussi.</p>'''),
        ('Succession de deux épreuves indépendantes', '''<p>Quand deux épreuves se déroulent sans s'influencer (deux lancers, deux tirages avec remise), la probabilité d'un résultat (r₁ ; r₂) est <b>P(r₁) × P(r₂)</b>. Sur l'arbre, les branches du deuxième niveau sont les mêmes quel que soit le premier résultat.</p>
<p>Exemple : une pièce truquée donne pile avec probabilité 0,6, lancée deux fois : P(deux piles) = 0,36 ; P(exactement un pile) = 2 × 0,6 × 0,4 = 0,48.</p>'''),
    ])
