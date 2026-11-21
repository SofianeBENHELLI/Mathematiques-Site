C = dict(
    id='produit-scalaire', title='Produit scalaire : projection, angle, Al-Kashi',
    desc='Produit scalaire par la norme et l’angle, la projection et les coordonnées, orthogonalité, identités, théorème d’Al-Kashi : cours, ateliers interactifs et exercices corrigés pour la Première spécialité.',
    brand='produit scalaire', sym='u·v', tag='trois façons de calculer le même nombre',
    formula='u·v = x x′ + y y′ = ‖u‖ ‖v‖ cos θ',
    eyebrow='PREMIÈRE SPÉCIALITÉ · PRODUIT SCALAIRE',
    h1='Un seul nombre, <em>trois façons de le calculer.</em>',
    lead='Tu vas voir que le produit scalaire mesure « combien deux vecteurs vont dans le même sens », le calculer avec les coordonnées, une projection ou un angle, et l’utiliser pour prouver une orthogonalité ou trouver une longueur.',
    parcours='Définitions → projection → orthogonalité → identités → Al-Kashi',
    nlabs=5, nex=16, footer='Produit scalaire',
    courses=[
        ('Trois définitions du même nombre', '''<p class="formula">Avec les coordonnées : u(x ; y) et v(x′ ; y′) donnent <b>u·v = xx′ + yy′</b><br>Avec l'angle : <b>u·v = ‖u‖ × ‖v‖ × cos θ</b> (θ = angle entre u et v)<br>Avec la projection : <b>u·v = AB × AH</b> (mesure algébrique) où H est le projeté orthogonal de C sur (AB), pour u = AB et v = AC</p>
<p>Le résultat est un <b>nombre</b>, pas un vecteur. Il est positif si l'angle est aigu, négatif s'il est obtus, nul si les vecteurs sont orthogonaux.</p>
<p>Choisir la bonne formule : coordonnées connues → la première ; longueurs et angle connus → la deuxième ; figure avec un angle droit → la troisième.</p>'''),
        ('Orthogonalité', '''<p class="formula">u ⊥ v ⇔ u·v = 0</p>
<p>Pour deux vecteurs non nuls, u·v = ‖u‖‖v‖cos θ est nul si et seulement si cos θ = 0, c'est-à-dire θ = 90°. Avec les coordonnées : (3 ; 2) et (−2 ; 3) sont orthogonaux car 3×(−2) + 2×3 = 0.</p>
<p><b>Méthode.</b> Pour prouver que deux droites (AB) et (CD) sont perpendiculaires : calculer AB·CD avec les coordonnées et trouver 0. Pour un triangle rectangle en A : AB·AC = 0.</p>
<p class="trap"><b>Piège.</b> Ne pas confondre u·v = 0 (orthogonal) avec « u et v colinéaires » (qui se teste avec xy′ − x′y = 0).</p>'''),
        ('Propriétés et identités remarquables', '''<p class="formula">u·v = v·u &nbsp;&nbsp; u·(v + w) = u·v + u·w &nbsp;&nbsp; (ku)·v = k(u·v)<br>u·u = ‖u‖² (on le note u²)<br>‖u + v‖² = ‖u‖² + 2u·v + ‖v‖²<br>‖u − v‖² = ‖u‖² − 2u·v + ‖v‖²<br>u·v = ½(‖u + v‖² − ‖u‖² − ‖v‖²)</p>
<p>Elles se démontrent en développant avec la bilinéarité, comme (a + b)² en algèbre. Elles permettent de calculer u·v quand on connaît les trois longueurs d'un triangle, sans coordonnées.</p>'''),
        ('Longueurs et angles : théorème d’Al-Kashi', '''<p class="formula">Dans un triangle ABC de côtés a = BC, b = AC, c = AB :<br><b>a² = b² + c² − 2bc cos Â</b></p>
<p><b>Démonstration.</b> BC² = ‖AC − AB‖² = AC² + AB² − 2 AB·AC = b² + c² − 2bc cos Â.</p>
<p>Si Â = 90°, cos Â = 0 : on retrouve le théorème de Pythagore. Al-Kashi permet de trouver un côté (deux côtés et l'angle compris) ou un angle (trois côtés) : cos Â = (b² + c² − a²)/(2bc).</p>
<p>Pour un angle avec les coordonnées : cos(AB, AC) = AB·AC / (AB × AC).</p>'''),
        ('Projection orthogonale', '''<p>Le projeté orthogonal de C sur la droite (AB) est le point H de (AB) tel que (CH) ⊥ (AB). Alors AB·AC = AB·AH.</p>
<p>Si H est du même côté de A que B : le produit est positif et vaut AB × AH. Si H est du côté opposé : il est négatif et vaut −AB × AH.</p>
<p>Cette formule évite de calculer l'angle : utile dans un rectangle, un carré ou un triangle isocèle où les projetés sont des milieux ou des sommets.</p>'''),
    ])
