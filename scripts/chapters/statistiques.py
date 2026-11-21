C = dict(
    id='statistiques', title='Statistiques : moyenne, médiane, écart type, boîtes à moustaches',
    desc='Moyenne, médiane, quartiles, écart type, effet d’une transformation affine et comparaison de distributions par boîtes à moustaches : cours, ateliers interactifs et exercices corrigés pour la Première spécialité.',
    brand='statistiques', sym='x̄', tag='résumer une série sans la déformer',
    formula='x̄ = Σ xᵢ/n &nbsp;·&nbsp; σ = √V',
    eyebrow='PREMIÈRE SPÉCIALITÉ · STATISTIQUES',
    h1='Une série de nombres, <em>trois ou quatre réponses honnêtes.</em>',
    lead='Tu vas choisir l’indicateur qui dit vraiment quelque chose d’une série, calculer médiane, quartiles et écart type sans erreur, et comparer deux distributions d’un coup d’œil.',
    parcours='Centre → dispersion → transformation → boîtes → comparer',
    nlabs=3, nex=14, footer='Statistiques',
    courses=[
        ('Moyenne, médiane, quartiles', '''<p class="formula">Moyenne : x̄ = (x₁ + … + xₙ)/n (pondérée : Σ nᵢxᵢ / Σ nᵢ)<br>Médiane : valeur qui partage la série ordonnée en deux moitiés<br>Q₁ : plus petite valeur telle qu'au moins 25 % des valeurs lui soient inférieures ou égales<br>Q₃ : plus petite valeur telle qu'au moins 75 % des valeurs lui soient inférieures ou égales</p>
<p><b>Méthode.</b> On range les valeurs dans l'ordre croissant. Si n est impair, la médiane est la valeur centrale ; s'il est pair, c'est la moyenne des deux valeurs centrales. Q₁ est la valeur de rang <b>⌈n/4⌉</b> et Q₃ celle de rang <b>⌈3n/4⌉</b>. L'<b>écart interquartile</b> est Q₃ − Q₁.</p>'''),
        ('Variance et écart type', '''<p class="formula">V = (1/n) Σ (xᵢ − x̄)² = (1/n) Σ xᵢ² − x̄² &nbsp;&nbsp; σ = √V</p>
<p>L'écart type mesure la dispersion autour de la moyenne, dans la même unité que les données. Plus il est grand, plus les valeurs sont étalées. Deux séries peuvent avoir la même moyenne et des écarts types très différents.</p>
<p class="trap"><b>Piège.</b> Un écart type ne peut pas être négatif, et il est nul seulement si toutes les valeurs sont égales.</p>'''),
        ('Effet d’une transformation affine', '''<p>Si chaque valeur xᵢ devient axᵢ + b :</p>
<p class="formula">moyenne : a·x̄ + b &nbsp;&nbsp; médiane : a·Me + b (si a &gt; 0) &nbsp;&nbsp; écart type : |a|·σ</p>
<p>Ajouter b décale tout, ne change pas la dispersion. Multiplier par a étire la série. Exemple : des températures passées des °C aux °F (×1,8 + 32).</p>'''),
        ('Boîte à moustaches', '''<p>On dessine une boîte de Q₁ à Q₃ coupée par la médiane, et des moustaches jusqu'au minimum et au maximum (ou jusqu'à d'autres bornes précisées dans l'énoncé).</p>
<p>La boîte contient environ <b>50 %</b> des valeurs, chaque quart de la série est séparé par Q₁, Me, Q₃. On y lit d'un coup d'œil le centre, l'étalement, la symétrie et les valeurs extrêmes.</p>'''),
        ('Choisir et comparer', '''<p>La <b>moyenne</b> et l'<b>écart type</b> sont sensibles aux valeurs extrêmes. La <b>médiane</b> et l'<b>écart interquartile</b> y résistent : on les préfère pour des revenus, des loyers, des durées avec quelques records.</p>
<p>Pour comparer deux séries : comparer d'abord les centres (médianes ou moyennes), puis les dispersions (écart interquartile ou écart type), puis la forme (symétrique ou non). Une conclusion complète nomme les deux.</p>'''),
    ])
