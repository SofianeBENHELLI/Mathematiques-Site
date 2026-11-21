C = dict(
    id='variables-aleatoires', title='Variables aléatoires : espérance, variance, loi binomiale',
    desc='Loi, espérance, variance et écart type d’une variable aléatoire, linéarité, formule de König-Huygens, schéma de Bernoulli et loi binomiale : cours, ateliers interactifs et exercices corrigés pour la Première spécialité.',
    brand='variables aléatoires', sym='E(X)', tag='résumer le hasard par une moyenne et une dispersion',
    formula='E(X) = Σ xᵢpᵢ &nbsp;·&nbsp; P(X = k) = C(n,k) pᵏ (1 − p)ⁿ⁻ᵏ',
    eyebrow='PREMIÈRE SPÉCIALITÉ · VARIABLES ALÉATOIRES',
    h1='Résumer le hasard <em>par deux nombres.</em>',
    lead='Tu vas décrire une variable aléatoire par sa loi, calculer son espérance et sa variance, comprendre ce qu’elles disent, et reconnaître quand la loi binomiale s’applique.',
    parcours='Loi → espérance → variance → Bernoulli → binomiale',
    nlabs=4, nex=16, footer='Variables aléatoires',
    courses=[
        ('Loi d’une variable aléatoire discrète', '''<p>Une variable aléatoire X associe un nombre à chaque issue. Sa <b>loi</b> est la liste des probabilités P(X = xᵢ) = pᵢ. Elles sont positives et leur somme vaut <b>1</b>.</p>
<p>Exemple : X = gain d'un jeu. Pour trouver une probabilité manquante, on utilise Σpᵢ = 1.</p>'''),
        ('Espérance, variance, écart type', '''<p class="formula">E(X) = x₁p₁ + x₂p₂ + … &nbsp;&nbsp; V(X) = Σ pᵢ(xᵢ − E(X))² &nbsp;&nbsp; σ(X) = √V(X)</p>
<p>L'<b>espérance</b> est la moyenne des valeurs pondérée par les probabilités : ce qu'on obtient « en moyenne » sur un grand nombre de répétitions. La <b>variance</b> mesure la dispersion autour de cette moyenne, l'<b>écart type</b> la ramène à l'unité de X.</p>
<p>Pour un jeu : si E(gain net) = 0 le jeu est équitable, &gt; 0 favorable, &lt; 0 défavorable.</p>'''),
        ('Linéarité et formule de König-Huygens', '''<p class="formula">E(aX + b) = aE(X) + b &nbsp;&nbsp; V(aX + b) = a²V(X) &nbsp;&nbsp; σ(aX + b) = |a|σ(X)<br>V(X) = E(X²) − (E(X))²</p>
<p><b>Démonstration de E(aX + b).</b> Σ(axᵢ + b)pᵢ = aΣxᵢpᵢ + bΣpᵢ = aE(X) + b×1.</p>
<p><b>Démonstration de König-Huygens.</b> V(X) = Σpᵢ(xᵢ − m)² = Σpᵢxᵢ² − 2mΣpᵢxᵢ + m²Σpᵢ = E(X²) − 2m² + m² = E(X²) − m².</p>
<p>Ajouter une constante b décale la moyenne, ne change pas la dispersion. Multiplier par a multiplie l'écart type par |a|.</p>'''),
        ('Épreuve de Bernoulli et schéma de Bernoulli', '''<p>Une <b>épreuve de Bernoulli</b> a deux issues : succès (probabilité p) et échec (probabilité 1 − p). Un <b>schéma de Bernoulli</b> répète n fois la même épreuve de façon <b>indépendante</b>.</p>
<p>Sur l'arbre du schéma à 3 épreuves, la probabilité d'un chemin à k succès est pᵏ(1 − p)ⁿ⁻ᵏ. Il y a C(n,k) chemins à k succès, qu'on compte sur l'arbre ou avec la calculatrice.</p>'''),
        ('Loi binomiale B(n ; p)', '''<p>X = nombre de succès dans un schéma de Bernoulli de n épreuves de paramètre p suit la loi binomiale B(n ; p).</p>
<p class="formula">P(X = k) = C(n,k) pᵏ (1 − p)ⁿ⁻ᵏ &nbsp;&nbsp; E(X) = np &nbsp;&nbsp; V(X) = np(1 − p)</p>
<p>Exemple : B(4 ; 0,5), P(X = 2) = 6 × 0,5⁴ = 0,375. Pour « au moins un succès » on passe par l'événement contraire : P(X ≥ 1) = 1 − P(X = 0) = 1 − (1 − p)ⁿ.</p>
<p class="trap"><b>Piège.</b> Les épreuves doivent être <b>identiques et indépendantes</b> : tirer sans remise dans une petite urne ne donne pas une loi binomiale.</p>'''),
    ])
