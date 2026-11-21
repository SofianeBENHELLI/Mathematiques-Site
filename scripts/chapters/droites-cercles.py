C = dict(
    id='droites-cercles', title='Droites et cercles : équations, vecteurs normaux, tangentes',
    desc='Équation réduite et cartésienne d’une droite, vecteurs directeur et normal, colinéarité, intersection, équation d’un cercle et tangente : cours, ateliers interactifs et exercices corrigés pour la Première spécialité.',
    brand='droites et cercles', sym='ax+by', tag='une équation décrit une forme',
    formula='ax + by + c = 0 &nbsp;·&nbsp; (x − p)² + (y − q)² = r²',
    eyebrow='PREMIÈRE SPÉCIALITÉ · GÉOMÉTRIE REPÉRÉE',
    h1='Une équation, <em>une droite ou un cercle.</em>',
    lead='Tu vas passer sans hésiter d’une droite à son équation et inversement, trouver intersections et tangentes, et utiliser le vecteur normal pour tout ramener à un produit scalaire.',
    parcours='Droite → vecteurs → intersection → cercle → tangente',
    nlabs=5, nex=16, footer='Droites et cercles',
    courses=[
        ('Équations d’une droite', '''<p class="formula">Réduite : y = mx + p (m = pente, p = ordonnée à l'origine)<br>Cartésienne : ax + by + c = 0 avec (a ; b) ≠ (0 ; 0)<br>Verticale : x = k</p>
<p>La pente passant par A(xA ; yA) et B(xB ; yB) est m = (yB − yA)/(xB − xA) si xA ≠ xB. On trouve p en remplaçant un point.</p>
<p>Un vecteur directeur de ax + by + c = 0 est <b>u(−b ; a)</b>. Un vecteur normal est <b>n(a ; b)</b>. Ils sont orthogonaux : (−b)a + a·b = 0.</p>'''),
        ('Colinéarité, parallélisme, alignement', '''<p class="formula">u(x ; y) et v(x′ ; y′) colinéaires ⇔ xy′ − x′y = 0</p>
<p>Trois points A, B, C sont <b>alignés</b> si AB et AC sont colinéaires. Deux droites sont <b>parallèles</b> si leurs vecteurs directeurs sont colinéaires (même pente).</p>
<p>Pour trouver le point d'intersection de deux droites sécantes, on résout le <b>système</b> formé par leurs deux équations. Sans solution : parallèles distinctes. Une infinité : droites confondues.</p>'''),
        ('Droite définie par un vecteur normal', '''<p>La droite passant par A et de vecteur normal n(a ; b) est l'ensemble des points M tels que <b>AM·n = 0</b>. En coordonnées : a(x − xA) + b(y − yA) = 0, soit ax + by + c = 0 avec c = −(a·xA + b·yA).</p>
<p>Exemple : A(2 ; 1), n(3 ; 4) donne 3(x − 2) + 4(y − 1) = 0, soit 3x + 4y − 10 = 0.</p>
<p>Une parallèle à ax + by + c = 0 garde les mêmes a et b, seul c change. Une perpendiculaire a pour normal le vecteur directeur de l'autre.</p>'''),
        ('Équation d’un cercle', '''<p>Le cercle de centre Ω(p ; q) et de rayon r est l'ensemble des points M tels que ΩM = r :</p>
<p class="formula">(x − p)² + (y − q)² = r² &nbsp;&nbsp; soit &nbsp;&nbsp; x² + y² − 2px − 2qy + (p² + q² − r²) = 0</p>
<p>Réciproquement, pour reconnaître x² + y² + ux + vy + w = 0, on écrit la forme canonique : (x + u/2)² + (y + v/2)² = u²/4 + v²/4 − w. Si le second membre est positif : cercle ; nul : un point ; négatif : ensemble vide.</p>
<p class="trap"><b>Piège.</b> Le centre a des coordonnées opposées à celles de la parenthèse : (x + 1)² donne p = −1.</p>'''),
        ('Tangente et position relative', '''<p>Une droite d et un cercle de centre Ω et de rayon r : soit δ la distance de Ω à d. Si δ &lt; r : deux points communs ; δ = r : tangente (un point) ; δ &gt; r : aucun point.</p>
<p>La <b>tangente au cercle en un point A</b> du cercle est la droite passant par A et de vecteur normal ΩA : c'est l'ensemble des M tels que ΩA·AM = 0.</p>
<p>Distance d'un point P(x₀ ; y₀) à la droite ax + by + c = 0 : δ = |ax₀ + by₀ + c|/√(a² + b²).</p>
<p><b>Ensembles de points.</b> MA·u = k est une droite de vecteur normal u. MA·MB = 0 est le cercle de diamètre [AB].</p>'''),
    ])
