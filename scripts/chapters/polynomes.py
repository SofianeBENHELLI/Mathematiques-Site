C = dict(
    id='polynomes', title='Second degré : trinôme, discriminant, signe, parabole',
    desc='Formes développée, canonique et factorisée, discriminant, racines, signe d’un trinôme, parabole, somme et produit des racines, changement d’inconnue : cours, ateliers et exercices corrigés pour la Première spécialité.',
    brand='second degré', sym='x²', tag='une parabole, trois écritures, un discriminant',
    formula='ax² + bx + c &nbsp;·&nbsp; Δ = b² − 4ac',
    eyebrow='PREMIÈRE SPÉCIALITÉ · SECOND DEGRÉ',
    h1='Une parabole, <em>trois écritures, un seul discriminant.</em>',
    lead='Tu vas passer d’une forme à l’autre sans te tromper, savoir à l’avance combien de racines il y a, et lire le signe d’un trinôme sur sa parabole.',
    parcours='Trois formes → discriminant → signe → parabole → racines → inconnue',
    nlabs=6, nex=18, footer='Second degré',
    courses=[
        ('Les trois formes d’un trinôme', '''<p class="formula">Développée : f(x) = ax² + bx + c &nbsp; (a ≠ 0)<br>Canonique : f(x) = a(x − α)² + β &nbsp; avec α = −b/(2a) et β = f(α)<br>Factorisée : f(x) = a(x − x₁)(x − x₂) &nbsp; (si des racines existent)</p>
<p>Chaque forme répond à une question : la <b>développée</b> donne f(0) = c ; la <b>canonique</b> donne le sommet S(α ; β) et les variations ; la <b>factorisée</b> donne les racines et le signe.</p>
<p>Passer de la canonique à la développée : on développe. De la développée à la canonique : α = −b/(2a), β = f(α). Exemple : x² − 6x + 5, α = 3, β = 9 − 18 + 5 = −4, donc (x − 3)² − 4.</p>'''),
        ('Discriminant et racines', '''<p class="formula">Δ = b² − 4ac<br>Δ &gt; 0 : deux racines x = (−b ± √Δ)/(2a)<br>Δ = 0 : une racine double x = −b/(2a)<br>Δ &lt; 0 : aucune racine réelle</p>
<p><b>D'où vient Δ ?</b> En mettant a(x + b/(2a))² − Δ/(4a) sous forme canonique, l'équation devient (x + b/(2a))² = Δ/(4a²). Un carré ne peut valoir qu'un nombre positif ou nul : c'est le signe de Δ qui décide.</p>
<p class="trap"><b>Piège.</b> Δ se calcule avec les signes de b et c : pour 2x² − 3x − 2, Δ = (−3)² − 4×2×(−2) = 9 + 16 = 25. Et −b/(2a) quand b est négatif devient positif.</p>'''),
        ('Signe du trinôme et inéquations', '''<p class="formula">Δ &gt; 0 : signe de a à l'extérieur des racines, signe de −a entre les racines<br>Δ = 0 : signe de a partout, sauf en la racine double (0)<br>Δ &lt; 0 : signe de a partout</p>
<p>Méthode : <b>1.</b> calculer Δ et les racines ; <b>2.</b> dessiner la parabole (a &gt; 0 : en U, a &lt; 0 : en ∩) ; <b>3.</b> lire où la courbe est au-dessus ou au-dessous de l'axe ; <b>4.</b> écrire l'ensemble solution avec les crochets qui conviennent (fermés pour ≤ et ≥, ouverts pour &lt; et &gt;).</p>'''),
        ('Parabole : axe, sommet, variations', '''<p>La courbe de f est une parabole d'<b>axe de symétrie x = α = −b/(2a)</b> et de sommet S(α ; β).</p>
<p class="formula">a &gt; 0 : décroissante sur ]−∞ ; α], croissante sur [α ; +∞[, minimum β<br>a &lt; 0 : croissante sur ]−∞ ; α], décroissante sur [α ; +∞[, maximum β</p>
<p>Si les racines existent, α est leur milieu : α = (x₁ + x₂)/2. C'est utile pour optimiser (aire maximale, bénéfice maximal).</p>'''),
        ('Somme et produit des racines', '''<p class="formula">x₁ + x₂ = −b/a &nbsp;&nbsp; x₁ × x₂ = c/a</p>
<p><b>Démonstration.</b> a(x − x₁)(x − x₂) = ax² − a(x₁ + x₂)x + a·x₁x₂. Par identification avec ax² + bx + c : b = −a(x₁ + x₂) et c = a·x₁x₂.</p>
<p>Usages : trouver la seconde racine quand l'une est connue (ou évidente), ou construire un trinôme de racines données. Pour deux nombres de somme S et de produit P : ce sont les racines de x² − Sx + P.</p>'''),
        ('Changement d’inconnue', '''<p>Une équation comme x⁴ − 5x² + 4 = 0 se ramène au second degré en posant X = x². On résout X² − 5X + 4 = 0, soit X = 1 ou X = 4.</p>
<p>Puis on <b>revient à x</b> : x² = 1 donne x = ±1, x² = 4 donne x = ±2. Quatre solutions. Si X &lt; 0, x² = X n'a pas de solution ; si X = 0, une seule (x = 0).</p>
<p class="trap"><b>Piège.</b> Oublier de revenir à x, ou accepter une valeur négative de X = x².</p>'''),
    ])
