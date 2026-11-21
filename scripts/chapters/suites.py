C = dict(
    id='suites', title='Suites numériques : arithmétiques, géométriques, seuils',
    desc='Suites explicites et récurrentes, arithmétiques et géométriques, sommes, variations, seuils en Python et modélisation : cours, ateliers interactifs et exercices corrigés pour la Première spécialité.',
    brand='suites', sym='uₙ', tag='une liste de nombres qui obéit à une règle',
    formula='uₙ₊₁ = uₙ + r &nbsp;·&nbsp; uₙ₊₁ = q·uₙ',
    eyebrow='PREMIÈRE SPÉCIALITÉ · SUITES',
    h1='Une règle, <em>et la suite se déroule.</em>',
    lead='Tu vas apprendre à reconnaître une suite arithmétique ou géométrique, à calculer ses termes et ses sommes, à prévoir son comportement et à trouver le moment où elle dépasse un seuil.',
    parcours='Générer → reconnaître → sommer → varier → seuil → modéliser',
    nlabs=6, nex=18, footer='Suites numériques',
    courses=[
        ('Générer une suite : explicite ou par récurrence', '''<p>Une suite (uₙ) associe à chaque entier n un réel uₙ. Deux façons de la définir :</p>
<p class="formula">Explicite : uₙ = f(n) &nbsp; (on calcule uₙ directement)<br>Récurrence : u₀ donné et uₙ₊₁ = f(uₙ) &nbsp; (il faut passer par tous les termes précédents)</p>
<p>Exemples : uₙ = n² − 3 donne u₄ = 13 d'un coup. u₀ = 2 et uₙ₊₁ = 3uₙ − 1 donne u₁ = 5, u₂ = 14, u₃ = 41 : on ne saute pas d'étape. Les termes se calculent à la main, au tableur ou en Python (atelier 5).</p>
<p class="trap"><b>Piège.</b> uₙ₊₁ n'est pas uₙ + 1, c'est le terme suivant. Et u₂ₙ n'est pas 2uₙ.</p>'''),
        ('Suite arithmétique : on ajoute toujours la même chose', '''<p class="formula">uₙ₊₁ = uₙ + r &nbsp;&nbsp; uₙ = u₀ + n·r &nbsp;&nbsp; uₙ = uₚ + (n − p)·r</p>
<p>r est la <b>raison</b>. Pour reconnaître une suite arithmétique : montrer que uₙ₊₁ − uₙ est <b>le même nombre pour tout n</b>. Graphiquement, les points (n ; uₙ) sont alignés sur une droite de pente r : croissante si r &gt; 0, décroissante si r &lt; 0, constante si r = 0.</p>'''),
        ('Suite géométrique : on multiplie toujours par la même chose', '''<p class="formula">uₙ₊₁ = q·uₙ &nbsp;&nbsp; uₙ = u₀·qⁿ &nbsp;&nbsp; uₙ = uₚ·qⁿ⁻ᵖ</p>
<p>q est la <b>raison</b>. Pour reconnaître : montrer que uₙ₊₁/uₙ est constant (en vérifiant que uₙ ≠ 0). Si u₀ &gt; 0 : croissante pour q &gt; 1, décroissante pour 0 &lt; q &lt; 1, et alternée (signes + − + −) pour q &lt; 0.</p>
<p>Lien avec l'exponentielle : (eᵃⁿ) est géométrique de raison eᵃ. C'est la même croissance, en pas entiers.</p>'''),
        ('Sommes de termes consécutifs (démonstrations exigibles)', '''<p class="formula">1 + 2 + … + n = n(n + 1)/2<br>1 + q + q² + … + qⁿ = (1 − qⁿ⁺¹)/(1 − q) &nbsp; (q ≠ 1)</p>
<p><b>Démonstration de la première.</b> Écris S = 1 + 2 + … + n puis S = n + (n − 1) + … + 1. En additionnant colonne par colonne, chaque somme vaut n + 1 et il y a n colonnes : 2S = n(n + 1).</p>
<p><b>Démonstration de la seconde.</b> Posons S = 1 + q + … + qⁿ. Alors qS = q + q² + … + qⁿ⁺¹. En soustrayant, S − qS = 1 − qⁿ⁺¹, donc S(1 − q) = 1 − qⁿ⁺¹.</p>
<p><b>Somme arithmétique :</b> nombre de termes × (premier + dernier)/2. <b>Somme géométrique :</b> premier terme × (1 − qᶰᵒᵐᵇʳᵉ ᵈᵉ ᵗᵉʳᵐᵉˢ)/(1 − q).</p>
<p class="trap"><b>Piège.</b> De u₀ à uₙ, il y a <b>n + 1</b> termes, pas n.</p>'''),
        ('Variations et comportement', '''<p class="formula">(uₙ) croissante ⇔ uₙ₊₁ − uₙ ≥ 0 pour tout n<br>Si uₙ &gt; 0 : croissante ⇔ uₙ₊₁/uₙ ≥ 1</p>
<p>On étudie le <b>signe de uₙ₊₁ − uₙ</b>. Pour une suite explicite uₙ = f(n), on peut aussi étudier les variations de f, mais la réciproque est fausse : la suite peut croître sans que f soit monotone.</p>
<p><b>Conjecturer le comportement :</b> arithmétique de raison r &gt; 0 : tend vers +∞ ; géométrique de raison q &gt; 1 et u₀ &gt; 0 : tend vers +∞ ; avec 0 &lt; q &lt; 1 : se rapproche de 0 ; avec q ≤ −1 : n'a pas de limite, elle oscille.</p>'''),
        ('Seuil et algorithme', '''<p>Chercher le plus petit n tel que uₙ dépasse un seuil S, c'est exécuter une boucle <b>while</b> :</p>
<p class="formula">n = 0 ; u = u0<br>while u &lt;= S :<br>&nbsp;&nbsp;&nbsp;&nbsp;u = q * u &nbsp;&nbsp; (ou u + r)<br>&nbsp;&nbsp;&nbsp;&nbsp;n = n + 1<br>(à la sortie, n est le plus petit indice tel que u &gt; S)</p>
<p>Pour une suite croissante, dès que le seuil est franchi il le reste. On peut aussi résoudre l'inéquation u₀·qⁿ &gt; S par essais, avec la calculatrice.</p>'''),
        ('Modéliser une évolution', '''<p><b>Variation à pas constant</b> (on ajoute 15 € par mois) : suite arithmétique. <b>Variation à taux constant</b> (+3 % par an) : suite géométrique de raison q = 1 + t/100. Une baisse de 20 % donne q = 0,8.</p>
<p>Attention : deux hausses successives de 10 % ne font pas 20 % mais 1,1 × 1,1 = 1,21, soit +21 %. Une hausse de 50 % suivie d'une baisse de 50 % donne 1,5 × 0,5 = 0,75 : −25 %.</p>'''),
    ])
