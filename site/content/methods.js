/* Contenu pédagogique original — Première spécialité, rentrée 2026. */
globalThis.MATH_METHODS = [
  {
    "id": "m1",
    "slug": "automatismes-statistiques",
    "title": "Automatismes & statistiques",
    "category": "Méthodes",
    "intro": "Pour Sanaa : des réflexes sûrs pour libérer ton raisonnement. Compare des évolutions, lis un graphique et explore une série de données. À chaque fois, relie le calcul à ce que le résultat signifie.",
    "prerequisites": [
      "Fractions, priorités de calcul et nombres relatifs",
      "Lire un repère et ranger des nombres"
    ],
    "goals": [
      "Calculer et inverser une évolution",
      "Passer du calcul à un graphique",
      "Décrire une série et sa dispersion",
      "Choisir le bon dénominateur"
    ],
    "lessons": [
      {
        "title": "1 · Pourcentages : bien choisir le point de départ",
        "html": "<p>Un taux de 12 % s’écrit 0,12 dans les calculs. Une hausse de taux t multiplie une valeur par <strong>1 + t</strong> ; une baisse de 12 % a un taux signé t = −0,12 et multiplie par 0,88. Si V<sub>i</sub> ≠ 0, le taux d’évolution est <strong>t = (V<sub>f</sub> − V<sub>i</sub>)/V<sub>i</sub></strong>. Le dénominateur est toujours la valeur de départ.</p><p>Exemple : 80 € deviennent 92 €. La hausse vaut 12 €, mais le taux est 12/80 = 0,15, soit <strong>15 %</strong>. Retrouver le prix de départ consiste à diviser : 92/1,15 = 80, et non à enlever 15 % de 92.</p><p>Une proportion a elle aussi une base : si 40 % d’un groupe représentent 18 élèves, l’effectif du groupe est 18/0,40 = 45. Une augmentation de 20 % à 25 % représente <strong>5 points de pourcentage</strong> et une hausse relative de 25 %. Les deux nombres répondent à des questions différentes.</p>"
      },
      {
        "title": "2 · Évolutions successives et réciproques",
        "html": "<p>Deux évolutions successives se composent en <strong>multipliant leurs coefficients</strong> : C = (1 + t₁)(1 + t₂), puis t<sub>global</sub> = C − 1. Il faut recalculer la base à chaque étape. Une hausse de 20 % suivie d’une baisse de 20 % donne 1,20 × 0,80 = 0,96 : la baisse globale est 4 %, pas 0 %.</p><p>Pour revenir à la valeur initiale, le coefficient réciproque est <strong>1/C</strong>, si C ≠ 0. Après une hausse de 25 %, C = 1,25 ; le retour utilise 0,80, donc une baisse de 20 %. Après une baisse de 20 %, le retour exige une hausse de 25 %.</p><p>Une même hausse de taux t répétée n fois donne V<sub>n</sub> = V₀(1 + t)ⁿ. C’est une suite géométrique : le chapitre Suites explique le lien entre répétition d’un pourcentage et croissance multiplicative.</p>"
      },
      {
        "title": "3 · Calculer, développer et factoriser avec un objectif",
        "html": "<p>Avant de calculer, annonce ton but. Pour trouver une image, la forme développée peut être pratique ; pour chercher des zéros ou un signe, la forme factorisée est souvent meilleure. Les identités <strong>(a + b)² = a² + 2ab + b²</strong>, <strong>(a − b)² = a² − 2ab + b²</strong> et <strong>(a − b)(a + b) = a² − b²</strong> sont valables pour tous réels a, b.</p><p>Exemple : x² − 9 = (x − 3)(x + 3). Un produit vaut zéro si et seulement si un de ses facteurs vaut zéro : x² − 9 = 0 donne x = −3 ou x = 3. Cette règle ne s’applique pas à une somme : x + y = 0 ne force ni x ni y à être nul.</p><p>Pour ax + b avec a ≠ 0, la racine est −b/a. Le signe est celui de a à droite de cette racine et l’opposé à gauche. Ainsi −2x + 6 est positif pour x &lt; 3. Pour le produit (x − 3)(x + 3), combine les signes : positif hors de [−3 ; 3], négatif entre les racines, nul aux racines. Diviser une inégalité par un nombre négatif inverse son sens.</p><p>Puissances : pour a ≠ 0, a⁰ = 1 et a⁻ⁿ = 1/aⁿ. Pour les exposants entiers, aᵐaⁿ = aᵐ⁺ⁿ. Avec a,b ≥ 0, √(ab) = √a√b, mais √(a + b) n’est généralement pas √a + √b. Contrôle un cas simple pour repérer une fausse règle.</p>"
      },
      {
        "title": "4 · Lire une courbe, une droite et une inégalité",
        "html": "<p>Lire f(2), c’est partir de l’abscisse 2 vers la courbe, puis lire l’ordonnée. Résoudre f(x) = 2, c’est chercher toutes les abscisses des intersections avec la droite horizontale y = 2. Pour f(x) ≥ 2, repère les portions de courbe au-dessus de cette droite, puis donne les intervalles d’abscisses correspondants.</p><p>Le signe de f se lit par rapport à l’axe horizontal ; les variations se lisent en allant de gauche à droite. Une fonction peut être négative et croissante : par exemple f(x) = x − 4 sur [0 ; 3]. Ne confonds pas « au-dessus de zéro » et « monte ».</p><p>Une droite non verticale s’écrit <strong>y = ax + b</strong>. Sa pente est a = (y<sub>B</sub> − y<sub>A</sub>)/(x<sub>B</sub> − x<sub>A</sub>), pour x<sub>A</sub> ≠ x<sub>B</sub>. Avec A(1 ; 3) et B(4 ; 9), a = 2 et b = 3 − 2 × 1 = 1. La droite est y = 2x + 1. Une droite verticale a une équation x = k et pas de pente réelle.</p><p>Une lecture graphique fournit souvent une estimation. Pour une valeur exacte, utilise ensuite l’expression algébrique. Regarde toujours les graduations, les unités et le domaine représenté avant de conclure.</p>"
      },
      {
        "title": "5 · Moyenne, médiane et quartiles : trois regards",
        "html": "<p>Une série statistique décrit des observations. Si la valeur xᵢ apparaît nᵢ fois, l’effectif total est N = Σnᵢ, la fréquence est fᵢ = nᵢ/N et la moyenne pondérée est <strong>x̄ = Σnᵢxᵢ/N = Σfᵢxᵢ</strong>. Une moyenne simple des valeurs distinctes oublierait leurs effectifs.</p><p>Pour une liste ordonnée, la médiane partage les observations en deux moitiés. Avec un effectif impair, c’est la valeur centrale ; ici, pour un effectif pair, on prend la moyenne des deux valeurs centrales. Une valeur extrême peut déplacer fortement la moyenne sans beaucoup changer la médiane.</p><p>Convention utilisée dans l’atelier : Q₁ est la valeur au rang ⌈N/4⌉ et Q₃ au rang ⌈3N/4⌉ dans la liste ordonnée, en comptant les rangs à partir de 1. Pour 2 ; 4 ; 4 ; 6 ; 9 ; 11 ; 12 ; 16, la médiane vaut (6 + 9)/2 = 7,5, Q₁ = 4 et Q₃ = 11. La boîte va de Q₁ à Q₃, avec un trait pour la médiane ; les moustaches vont ici du minimum au maximum.</p><p>L’étendue est max − min et l’écart interquartile est Q₃ − Q₁. Précise la convention d’un logiciel : certains calculent les quartiles par interpolation et certaines boîtes utilisent d’autres règles pour les moustaches.</p>"
      },
      {
        "title": "6 · Dispersion, diagrammes et probabilité",
        "html": "<p>La variance d’une série est <strong>V = Σnᵢ(xᵢ − x̄)²/N</strong> et l’écart-type est <strong>σ = √V</strong>. Ici on décrit toute la série avec le diviseur N ; on ne calcule pas l’estimateur corrigé d’un échantillon avec N − 1. σ possède l’unité des données, V son carré. Pour 2 ; 4 ; 6, x̄ = 4, V = (4 + 0 + 4)/3 = 8/3 et σ ≈ 1,63.</p><p>Ajouter k à toutes les données ajoute k à la moyenne et aux quartiles, sans changer σ. Multiplier toutes les données par a multiplie la moyenne par a et σ par |a|. Une moyenne identique ne garantit donc pas une dispersion identique.</p><p>Un diagramme en barres compare des catégories ; dans un diagramme circulaire, l’angle d’un secteur est 360° × fréquence. Pour un histogramme à classes de largeurs inégales, c’est <strong>l’aire</strong> des rectangles qui représente l’effectif : comparer seulement les hauteurs serait trompeur. Lis la légende d’une boîte avant d’interpréter ses moustaches.</p><p>Si on tire uniformément un élève dans une liste, la probabilité d’un caractère est l’effectif de ce caractère divisé par N. Dans une sous-population, change le dénominateur : parmi 12 élèves inscrits à un club, si 9 viennent le mercredi, la proportion correspondante est 9/12, même si la classe compte 30 élèves. Les probabilités conditionnelles formalisent ce changement de référence.</p>"
      }
    ],
    "formulas": [
      "Vf = Vi(1 + t) ; t = (Vf − Vi)/Vi, Vi ≠ 0",
      "Cglobal = (1 + t₁)(1 + t₂) ; tréciproque = 1/(1 + t) − 1, t ≠ −1",
      "(a + b)² = a² + 2ab + b² ; a² − b² = (a − b)(a + b)",
      "a = (yB − yA)/(xB − xA), xA ≠ xB",
      "x̄ = Σnᵢxᵢ/N ; V = Σnᵢ(xᵢ − x̄)²/N ; σ = √V",
      "fᵢ = nᵢ/N ; angle d’un secteur = 360° × fᵢ",
      "Écart interquartile = Q₃ − Q₁ ; étendue = max − min"
    ],
    "pitfalls": [
      "Additionner les pourcentages de deux évolutions successives.",
      "Confondre points de pourcentage et évolution relative.",
      "Écrire (a + b)² = a² + b².",
      "Lire la croissance d’une fonction à partir de son signe.",
      "Oublier les effectifs dans une moyenne pondérée.",
      "Interpréter les quartiles sans connaître la convention.",
      "Diviser par N − 1 pour la variance descriptive demandée ici."
    ],
    "questions": [
      {
        "prompt": "Après une hausse de 20 % puis une baisse de 20 %, quel est le taux global ?",
        "options": [
          "0 %",
          "−4 %",
          "−40 %",
          "+4 %"
        ],
        "answer": 1,
        "explanation": "Les coefficients se multiplient : 1,20 × 0,80 = 0,96. La valeur finale représente 96 % de la valeur initiale, soit −4 %."
      },
      {
        "prompt": "Une quantité passe de 40 à 50. Son taux d’évolution est…",
        "options": [
          "20 %",
          "10 %",
          "25 %",
          "125 %"
        ],
        "answer": 2,
        "explanation": "Le changement est 10 et la référence initiale est 40 : 10/40 = 0,25 = 25 %."
      },
      {
        "prompt": "Quelle baisse annule exactement une hausse de 25 % ?",
        "options": [
          "25 %",
          "20 %",
          "80 %",
          "5 %"
        ],
        "answer": 1,
        "explanation": "1/1,25 = 0,80. Il faut donc une baisse de 20 % sur la valeur déjà augmentée."
      },
      {
        "prompt": "Quelle expression est égale à (x − 3)² pour tout réel x ?",
        "options": [
          "x² − 9",
          "x² − 6x + 9",
          "x² + 9",
          "x² − 3x + 9"
        ],
        "answer": 1,
        "explanation": "L’identité (a − b)² = a² − 2ab + b² donne x² − 6x + 9. Le double produit est indispensable."
      },
      {
        "prompt": "Quel est l’ensemble des solutions de (x − 2)(x + 5) = 0 ?",
        "options": [
          "{−2 ; 5}",
          "{2 ; −5}",
          "{−10}",
          "Tous les réels"
        ],
        "answer": 1,
        "explanation": "Un produit nul a au moins un facteur nul : x − 2 = 0 ou x + 5 = 0, donc x = 2 ou x = −5."
      },
      {
        "prompt": "Une courbe monte de gauche à droite tout en restant sous l’axe horizontal. La fonction est…",
        "options": [
          "Positive et croissante",
          "Négative et décroissante",
          "Négative et croissante",
          "Constante"
        ],
        "answer": 2,
        "explanation": "Le signe compare les ordonnées à zéro. Le sens de variation compare les ordonnées entre elles quand x augmente."
      },
      {
        "prompt": "Quelle est la pente de la droite passant par (1 ; 3) et (4 ; 9) ?",
        "options": [
          "2",
          "3",
          "1/2",
          "6"
        ],
        "answer": 0,
        "explanation": "Δy/Δx = (9 − 3)/(4 − 1) = 6/3 = 2. Quand x augmente de 1, y augmente de 2 le long de cette droite."
      },
      {
        "prompt": "Quelle est la moyenne de deux notes 10 et d’une note 16 ?",
        "options": [
          "13",
          "12",
          "26",
          "11"
        ],
        "answer": 1,
        "explanation": "L’effectif total est 3 : (2 × 10 + 16)/3 = 12. Faire (10 + 16)/2 oublierait que 10 apparaît deux fois."
      },
      {
        "prompt": "Dans la série ordonnée 2 ; 4 ; 4 ; 6 ; 9 ; 11 ; 12 ; 16, quel est Q₁ avec la convention des rangs supérieurs ?",
        "options": [
          "2",
          "4",
          "5",
          "7,5"
        ],
        "answer": 1,
        "explanation": "N/4 = 2. Le premier quartile est la valeur au rang 2, donc 4. La médiane vaut 7,5 et répond à une autre question."
      },
      {
        "prompt": "Si on ajoute 3 à chaque valeur d’une série, son écart-type…",
        "options": [
          "Augmente de 3",
          "Est multiplié par 3",
          "Ne change pas",
          "Devient nul"
        ],
        "answer": 2,
        "explanation": "La moyenne augmente également de 3 : chaque écart à la moyenne reste identique, donc la variance et l’écart-type aussi."
      }
    ],
    "exercises": [
      {
        "prompt": "Un cahier coûte 80 €. Son prix augmente de 15 %. Quel est son nouveau prix ?",
        "answer": 92,
        "unit": "€",
        "tolerance": 0.01,
        "solution": "80 × 1,15 = 92 €. On ajoute 12 €, soit 15 % de 80.",
        "hints": [
          "Transforme 15 % en 0,15.",
          "Le coefficient multiplicateur vaut 1,15."
        ],
        "mode": "guided"
      },
      {
        "prompt": "Après une réduction de 20 %, un article vaut 72 €. Quel était son prix initial ?",
        "answer": 90,
        "unit": "€",
        "tolerance": 0.01,
        "solution": "Vi × 0,80 = 72, donc Vi = 72/0,80 = 90 €.",
        "hints": [
          "La baisse conserve 80 % du prix initial.",
          "Résous 0,80 × Vi = 72."
        ],
        "mode": "guided"
      },
      {
        "prompt": "Une valeur augmente de 10 % puis de 20 %. Quel est son taux global, en pourcentage ?",
        "answer": 32,
        "unit": "%",
        "tolerance": 0.01,
        "solution": "1,10 × 1,20 = 1,32 ; le taux global est 1,32 − 1 = 0,32, soit 32 %.",
        "hints": [
          "Multiplie les coefficients, pas les taux.",
          "Retranche 1 au coefficient global puis multiplie par 100."
        ],
        "mode": "guided"
      },
      {
        "prompt": "La droite passe par A(−1 ; 5) et B(3 ; −3). Calcule sa pente.",
        "answer": -2,
        "unit": "",
        "tolerance": 0.01,
        "solution": "a = (−3 − 5)/(3 − (−1)) = −8/4 = −2.",
        "hints": [
          "Calcule la variation d’ordonnée de A vers B.",
          "Divise −8 par 4."
        ],
        "mode": "guided"
      },
      {
        "prompt": "Une série contient trois fois 8 et deux fois 13. Calcule sa moyenne.",
        "answer": 10,
        "unit": "",
        "tolerance": 0.01,
        "solution": "x̄ = (3 × 8 + 2 × 13)/5 = 50/5 = 10.",
        "hints": [
          "Pondère chaque valeur par son effectif.",
          "Le total des effectifs vaut 5."
        ],
        "mode": "guided"
      },
      {
        "prompt": "La série ordonnée est 1 ; 2 ; 3 ; 4 ; 7 ; 9 ; 10 ; 12. Calcule l’écart interquartile avec les rangs supérieurs.",
        "answer": 7,
        "unit": "",
        "tolerance": 0.01,
        "solution": "N = 8, donc Q₁ est au rang 2 : 2 ; Q₃ au rang 6 : 9. L’écart interquartile est 9 − 2 = 7.",
        "hints": [
          "Repère les rangs ⌈8/4⌉ et ⌈3 × 8/4⌉.",
          "Soustrais Q₁ à Q₃."
        ],
        "mode": "guided"
      },
      {
        "prompt": "Après une hausse de 60 %, quel taux signé, en pourcentage, permet de revenir à la valeur initiale ?",
        "answer": -37.5,
        "unit": "%",
        "tolerance": 0.01,
        "solution": "Le coefficient réciproque est 1/1,60 = 0,625. Le taux vaut 0,625 − 1 = −0,375, soit −37,5 %.",
        "hints": [
          "Le produit des deux coefficients doit valoir 1.",
          "Calcule (1/1,60 − 1) × 100."
        ],
        "mode": "autonomous"
      },
      {
        "prompt": "Calcule l’écart-type descriptif de la série 2 ; 2 ; 6 ; 6.",
        "answer": 2,
        "unit": "",
        "tolerance": 0.01,
        "solution": "La moyenne vaut 4. Les quatre écarts au carré valent 4 : V = 16/4 = 4 ; σ = √4 = 2.",
        "hints": [
          "Commence par la moyenne.",
          "Divise la somme des carrés des écarts par N = 4, puis prends la racine."
        ],
        "mode": "autonomous"
      },
      {
        "prompt": "Résous (x − 2)(x + 1) ≤ 0 et explique comment le tableau de signes justifie ta réponse.",
        "type": "open",
        "solution": "Les racines sont −1 et 2. Pour x < −1, les deux facteurs sont négatifs et le produit est positif ; pour −1 < x < 2, les signes sont opposés et le produit est négatif ; pour x > 2, ils sont positifs. Les racines sont incluses car l’inégalité est large : solution [−1 ; 2]. Autoévaluation : racines, trois intervalles, signes et bornes incluses.",
        "hints": [
          "Place −1 et 2 dans l’ordre.",
          "Un produit de deux facteurs de signes opposés est négatif."
        ],
        "mode": "autonomous"
      },
      {
        "prompt": "Dans une classe de 30 élèves, 12 font du théâtre, dont 9 viennent le mercredi. Compare « théâtre et mercredi parmi toute la classe » et « mercredi parmi les élèves du théâtre ».",
        "type": "open",
        "solution": "Dans la classe, la proportion théâtre ET mercredi vaut 9/30 = 0,30, soit 30 %. Parmi les élèves du théâtre, elle vaut 9/12 = 0,75, soit 75 %. Les numérateurs sont identiques mais les populations de référence diffèrent. Autoévaluation : deux fractions justes, deux pourcentages et explication des dénominateurs.",
        "hints": [
          "Identifie le groupe de référence de chaque phrase.",
          "Le mot « parmi » indique le dénominateur."
        ],
        "mode": "autonomous"
      }
    ],
    "exam": {
      "title": "Les chiffres d’un club de révision",
      "minutes": 20,
      "context": "Sujet original. Un club compte 40 membres, puis son effectif augmente de 25 % avant de diminuer de 20 %. Cinq durées de révision, en minutes, sont 20 ; 20 ; 30 ; 40 ; 40. Pour les quartiles, on utilise les rangs arrondis à l’entier supérieur.",
      "parts": [
        {
          "prompt": "Calcule les deux nouveaux effectifs successifs et le taux global. Explique pourquoi additionner les taux serait incorrect.",
          "points": 3,
          "solution": "40 × 1,25 = 50, puis 50 × 0,80 = 40 (1 pt). Le coefficient global vaut 1 et le taux 0 % (1 pt). Les pourcentages portent sur des bases différentes : la baisse de 20 % porte sur 50, pas sur 40 (1 pt)."
        },
        {
          "prompt": "Calcule moyenne, médiane, Q₁, Q₃ et écart interquartile des durées.",
          "points": 4,
          "solution": "Moyenne : 150/5 = 30 min (1 pt). Médiane : troisième durée = 30 min (1 pt). Q₁ : rang ⌈5/4⌉ = 2, donc 20 ; Q₃ : rang ⌈15/4⌉ = 4, donc 40 (1 pt). Écart interquartile = 20 min (1 pt)."
        },
        {
          "prompt": "Calcule la variance des durées et donne l’écart-type sous forme exacte. Si chacun révise 10 minutes de plus, comment changent moyenne et écart-type ?",
          "points": 3,
          "solution": "V = (100 + 100 + 0 + 100 + 100)/5 = 80 min² (1 pt). σ = √80 = 4√5 min (1 pt). La moyenne devient 40 min et l’écart-type reste 4√5 min, car les écarts à la moyenne sont inchangés (1 pt)."
        }
      ]
    }
  },
  {
    "id": "m2",
    "slug": "python-raisonnement",
    "title": "Python & raisonnement",
    "category": "Méthodes",
    "intro": "Un programme bien lu et une preuve bien écrite racontent chacun une suite d’étapes justifiées. Sanaa, avance ligne par ligne : prédis le résultat, observe la trace et explique pourquoi il est juste.",
    "prerequisites": [
      "Calcul avec des entiers et des réels",
      "Notion de suite et lecture d’une condition"
    ],
    "goals": [
      "Lire et écrire une boucle ou une fonction",
      "Construire et parcourir une liste",
      "Distinguer implication et équivalence",
      "Choisir une méthode de démonstration"
    ],
    "lessons": [
      {
        "title": "1 · Variables, types, affectation et conditions",
        "html": "<p>Une variable Python est un nom associé à une valeur. <code>x = 3</code> affecte la valeur 3 à x ; <code>x = x + 2</code> lit l’ancienne valeur puis la remplace par 5. Ce n’est pas une égalité mathématique affirmant x = x + 2. Pour tester l’égalité, Python utilise <code>==</code>.</p><p>Types usuels : <code>int</code> pour un entier, <code>float</code> pour une approximation décimale, <code>bool</code> pour <code>True</code> ou <code>False</code>, <code>str</code> pour du texte. <code>/</code> divise, <code>//</code> donne le quotient entier pour des entiers positifs, <code>%</code> le reste et <code>**</code> la puissance. Ainsi <code>7 // 3</code> vaut 2 et <code>7 % 3</code> vaut 1.</p><pre><code>x = -3\nif x &gt;= 0:\n    signe = \"positif ou nul\"\nelse:\n    signe = \"négatif\"</code></pre><p>Les deux-points et l’indentation délimitent les blocs. Une condition se combine avec <code>and</code>, <code>or</code> et <code>not</code>. Les nombres flottants sont des approximations : pour comparer deux résultats approchés, on peut tester <code>abs(a-b) &lt; 1e-8</code> plutôt qu’exiger une égalité exacte.</p>"
      },
      {
        "title": "2 · Boucles for et while : suivre une trace",
        "html": "<p><code>for</code> convient quand on connaît les valeurs à parcourir. <code>range(1, 5)</code> produit 1, 2, 3, 4 : la borne de fin est exclue. Un accumulateur doit être initialisé avant la boucle.</p><pre><code>s = 0\nfor k in range(1, 5):\n    s = s + k\n# s prend successivement 1, 3, 6, 10</code></pre><p><code>while</code> répète tant qu’une condition est vraie. Il faut vérifier qu’elle finira par devenir fausse. Pour la suite u₀ = 5 et uₙ₊₁ = 2uₙ, le programme ci-dessous cherche le premier indice n tel que uₙ ≥ 80.</p><pre><code>u = 5\nn = 0\nwhile u &lt; 80:\n    u = 2 * u\n    n = n + 1\n# après les tours : (n,u) = (1,10), (2,20), (3,40), (4,80)</code></pre><p>Le résultat est n = 4. Si la question demandait uₙ &gt; 80, il faudrait continuer tant que <code>u &lt;= 80</code> et obtenir n = 5. Un seuil impossible à atteindre peut produire une boucle infinie : raisonner sur la suite fait partie de la conception du programme.</p>"
      },
      {
        "title": "3 · Fonctions, suites, sommes et produits",
        "html": "<p>Une fonction permet de nommer un calcul et de le réutiliser. Les paramètres reçoivent les données de départ et <code>return</code> renvoie un résultat. Afficher avec <code>print</code> et renvoyer une valeur sont deux actions différentes.</p><pre><code>def terme(n):\n    u = 3\n    for k in range(n):\n        u = 2 * u + 1\n    return u\n# terme(0) vaut 3 ; terme(1) vaut 7 ; terme(2) vaut 15</code></pre><p>Un produit commence à 1, une somme à 0. La factorielle n! est le produit des entiers de 1 à n, avec 0! = 1. Voici un exemple de programme sur des entiers n ≥ 0 :</p><pre><code>def factorielle(n):\n    p = 1\n    for k in range(1, n + 1):\n        p = p * k\n    return p</code></pre><p>Pour Fibonacci, F₀ = 0, F₁ = 1 et Fₙ₊₂ = Fₙ₊₁ + Fₙ. L’affectation simultanée utilise les deux anciennes valeurs :</p><pre><code>def fibonacci(n):\n    a, b = 0, 1\n    for k in range(n):\n        a, b = b, a + b\n    return a</code></pre><p>Teste n = 0, n = 1 et quelques petits cas à la main. Une trace permet de détecter une erreur de rang ; quelques tests ne prouvent pas à eux seuls que le programme fonctionne pour toutes les entrées.</p>"
      },
      {
        "title": "4 · Listes : construire, modifier et parcourir",
        "html": "<p>Une liste est une collection ordonnée, par exemple <code>L = [3, 5, 8]</code>. Les indices commencent à <strong>0</strong> : <code>L[0]</code> vaut 3, <code>L[2]</code> vaut 8 et <code>len(L)</code> vaut 3. <code>L[-1]</code> désigne le dernier élément. Accéder à <code>L[3]</code> ici provoquerait une erreur.</p><pre><code>L = [3, 5, 8]\nL.append(13)  # ajoute à la fin : [3, 5, 8, 13]\nL[1] = 6     # remplace : [3, 6, 8, 13]\ndel L[0]     # supprime l’élément d’indice 0 : [6, 8, 13]</code></pre><p>Une liste en compréhension exprime un calcul sur une suite de valeurs :</p><pre><code>carres = [k**2 for k in range(5)]\n# [0, 1, 4, 9, 16]\npairs = [k for k in range(10) if k % 2 == 0]\n# [0, 2, 4, 6, 8]</code></pre><p>On peut parcourir les valeurs directement : <code>for x in L:</code>, ou les indices : <code>for i in range(len(L)):</code>. Pour calculer une moyenne, cumule les valeurs puis divise par l’effectif, à condition que la liste ne soit pas vide. Évite de supprimer des éléments pendant un parcours sans contrôler les indices ; créer une liste filtrée est souvent plus lisible.</p><pre><code>def moyenne(L):\n    if len(L) == 0:\n        return None\n    s = 0\n    for x in L:\n        s = s + x\n    return s / len(L)</code></pre>"
      },
      {
        "title": "5 · Ensembles, intervalles et couples",
        "html": "<p><strong>x ∈ A</strong> signifie que x est un élément de A. <strong>A ⊂ B</strong>, dans la convention utilisée ici, signifie que tout élément de A appartient à B (l’égalité est autorisée) ; on écrit aussi A ⊆ B pour éviter toute ambiguïté. ∅ est l’ensemble vide. Les ensembles de nombres usuels sont ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ; 1/2 est rationnel, √2 est réel mais non rationnel.</p><p>A ∩ B contient les éléments appartenant <strong>aux deux</strong> ensembles ; A ∪ B contient ceux appartenant à <strong>au moins un</strong>. Le complémentaire de A dépend d’un univers Ω fixé : il contient les éléments de Ω qui ne sont pas dans A.</p><p>Avec A = [−1 ; 3] et B = ]1 ; 5], A ∩ B = ]1 ; 3] et A ∪ B = [−1 ; 5]. Dans Ω = ℝ, le complémentaire de A est ]−∞ ; −1[ ∪ ]3 ; +∞[. Les crochets disent si la borne appartient à l’ensemble ; ±∞ ne sont jamais inclus.</p><p>Un <strong>couple ordonné</strong> (a ; b) distingue la première et la seconde composante : (1 ; 2) ≠ (2 ; 1). A × B est l’ensemble des couples avec a ∈ A et b ∈ B. Si A = {0 ; 1} et B = {2 ; 3 ; 4}, il contient 2 × 3 = 6 couples. Pour des ensembles finis, Card(A × B) = Card(A) × Card(B). Pour une union, Card(A ∪ B) = Card(A) + Card(B) − Card(A ∩ B) : on retire le double comptage.</p>"
      },
      {
        "title": "6 · Si, seulement si, équivalence et contre-exemple",
        "html": "<p>Une proposition est une affirmation dont on peut discuter la vérité. « P et Q » exige que les deux soient vraies. « P ou Q » est un ou inclusif : au moins une est vraie, éventuellement les deux. La négation de « P et Q » est « non P ou non Q » ; celle de « P ou Q » est « non P et non Q ».</p><p><strong>P implique Q</strong> signifie : chaque fois que P est vraie, Q est vraie. P est une condition suffisante pour Q ; Q est une condition nécessaire pour P. La réciproque est « Q implique P » et n’est pas automatique. Pour un réel x, x = 2 implique x² = 4, mais la réciproque échoue pour x = −2.</p><p>Une <strong>équivalence</strong> P ⇔ Q exige les deux implications. Ici x² = 4 équivaut à « x = −2 ou x = 2 ». La contraposée de P ⇒ Q est « non Q ⇒ non P » ; elle a toujours la même vérité que l’implication initiale. La négation de P ⇒ Q décrit au contraire le cas « P est vraie et Q est fausse ».</p><p>Une identité, comme (x + 1)² = x² + 2x + 1, est vraie pour tous les x du domaine. Une équation, comme x² = 4, est une condition à résoudre. Dans ax + 1 = 0, x peut être l’inconnue et a un paramètre fixé : traiter a = 0 à part évite une division interdite. Si a = 0, il n’y a aucune solution ; sinon x = −1/a.</p><p>Un seul <strong>contre-exemple</strong> réfute une affirmation universelle. « Tout nombre premier est impair » est faux : 2 est premier et pair. Cent exemples favorables ne constituent pas une preuve générale.</p>"
      },
      {
        "title": "7 · « Pour tout », « il existe » et leurs négations",
        "html": "<p>« Pour tout réel x, x² ≥ 0 » est une affirmation universelle. « Il existe un réel x tel que x² = 4 » affirme l’existence d’au moins une valeur, sans prétendre qu’elle est unique. Donner x = 2 suffit à prouver cette dernière affirmation.</p><p>Pour nier « pour tout x, P(x) », écris <strong>« il existe x tel que P(x) est fausse »</strong>. Ainsi la négation de « tous les élèves ont au moins 10 » est « au moins un élève a moins de 10 », et non « aucun n’a 10 ».</p><p>Pour nier « il existe x, P(x) », écris <strong>« pour tout x, P(x) est fausse »</strong>. La négation de « il existe un réel x tel que f(x) &gt; 3 » est « pour tout réel x, f(x) ≤ 3 ». L’inégalité stricte devient large.</p><p>L’ordre des mots compte : « pour chaque élève, il existe un exercice adapté » permet un exercice différent selon l’élève. « Il existe un exercice adapté à chaque élève » exige un même exercice pour tous. Précise toujours le domaine : une équation peut avoir une solution réelle mais aucune solution entière.</p>"
      },
      {
        "title": "8 · Construire une démonstration courte",
        "html": "<p><strong>Par cas :</strong> traite des situations qui couvrent toutes les possibilités. Pour un entier n, n(n + 1) est pair : si n est pair, le produit l’est ; si n est impair, n + 1 est pair et le produit l’est aussi. Les deux cas couvrent tous les entiers.</p><p><strong>Par contraposée :</strong> pour prouver « si n² est pair, alors n est pair », montre « si n est impair, alors n² est impair ». Écris n = 2k + 1 ; alors n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, qui est impair. Cela prouve l’implication initiale.</p><p><strong>Par l’absurde :</strong> suppose le contraire du résultat et déduis une contradiction. Il n’existe pas de plus grand entier naturel : s’il existait un plus grand entier N, l’entier N + 1 serait strictement plus grand, ce qui contredirait le choix de N.</p><p>Une rédaction solide annonce les hypothèses, justifie chaque transformation et termine par la conclusion demandée. Dans une résolution, vérifier les valeurs candidates dans l’énoncé initial repère les solutions ajoutées par une mise au carré. Une figure ou des tests numériques suggèrent une conjecture ; la preuve explique pourquoi elle tient dans tous les cas annoncés.</p>"
      }
    ],
    "formulas": [
      "range(a, b) parcourt a, a + 1, …, b − 1 (pas positif 1)",
      "Somme : initialiser à 0 ; produit : initialiser à 1",
      "Une liste de longueur N a pour indices 0, …, N − 1",
      "P ⇒ Q équivaut à non Q ⇒ non P",
      "P ⇔ Q signifie P ⇒ Q et Q ⇒ P",
      "Négation de « pour tout x, P(x) » : « il existe x, non P(x) »",
      "Négation de « il existe x, P(x) » : « pour tout x, non P(x) »",
      "Card(A ∪ B) = Card(A) + Card(B) − Card(A ∩ B)",
      "Card(A × B) = Card(A) × Card(B) pour des ensembles finis"
    ],
    "pitfalls": [
      "Confondre affectation = et comparaison == en Python.",
      "Oublier que range exclut sa borne finale et que les indices commencent à zéro.",
      "Initialiser un produit à zéro.",
      "Utiliser while sans vérifier que la condition finira par devenir fausse.",
      "Confondre une implication, sa réciproque et sa contraposée.",
      "Réfuter « pour tout » par des exemples favorables au lieu d’un contre-exemple.",
      "Prendre une vérification sur quelques valeurs pour une preuve générale.",
      "Nier x > 3 par x < 3 au lieu de x ≤ 3."
    ],
    "questions": [
      {
        "prompt": "Après x = 4 puis x = x + 3, que vaut x ?",
        "options": [
          "4",
          "7",
          "3",
          "La ligne est une égalité impossible"
        ],
        "answer": 1,
        "explanation": "La seconde ligne est une affectation : elle lit 4, ajoute 3, puis associe 7 au nom x."
      },
      {
        "prompt": "Quelles valeurs parcourt range(2, 6) ?",
        "options": [
          "2, 3, 4, 5, 6",
          "1, 2, 3, 4, 5",
          "2, 3, 4, 5",
          "2 et 6 seulement"
        ],
        "answer": 2,
        "explanation": "Le début est inclus et la borne finale exclue : 2, 3, 4, 5."
      },
      {
        "prompt": "Pour L = [3, 5, 8], que vaut L[1] ?",
        "options": [
          "3",
          "5",
          "8",
          "1"
        ],
        "answer": 1,
        "explanation": "L’indice 0 désigne 3 ; l’indice 1 désigne donc la deuxième valeur, 5."
      },
      {
        "prompt": "Que produit [k**2 for k in range(4)] ?",
        "options": [
          "[1, 4, 9, 16]",
          "[0, 2, 4, 6]",
          "[0, 1, 4, 9]",
          "[0, 1, 2, 3, 4]"
        ],
        "answer": 2,
        "explanation": "range(4) fournit 0, 1, 2, 3 ; la compréhension élève chaque entier au carré."
      },
      {
        "prompt": "Pour calculer le produit 1 × 2 × … × n dans une boucle, on initialise p à…",
        "options": [
          "0",
          "1",
          "n",
          "−1"
        ],
        "answer": 1,
        "explanation": "1 est l’élément neutre de la multiplication. Avec p = 0, tous les produits suivants resteraient nuls."
      },
      {
        "prompt": "Quelle est la réciproque de « si x = 2, alors x² = 4 » ?",
        "options": [
          "Si x² = 4, alors x = 2",
          "Si x² ≠ 4, alors x ≠ 2",
          "Si x ≠ 2, alors x² ≠ 4",
          "x = 2 et x² = 4"
        ],
        "answer": 0,
        "explanation": "La réciproque échange hypothèse et conclusion. Ici elle est fausse : x = −2 est un contre-exemple. La deuxième réponse est la contraposée, qui est vraie."
      },
      {
        "prompt": "Quelle est la négation de « tous les élèves ont une note ≥ 10 » ?",
        "options": [
          "Tous ont une note < 10",
          "Au moins un a une note < 10",
          "Au moins un a une note ≥ 10",
          "Personne n’a exactement 10"
        ],
        "answer": 1,
        "explanation": "Nier une affirmation universelle demande un cas où elle échoue ; la négation de ≥ 10 est < 10."
      },
      {
        "prompt": "Avec A = {1 ; 2 ; 3} et B = {3 ; 4}, que vaut A ∩ B ?",
        "options": [
          "{1 ; 2 ; 3 ; 4}",
          "{1 ; 2}",
          "{3}",
          "∅"
        ],
        "answer": 2,
        "explanation": "L’intersection contient les éléments communs aux deux ensembles : ici seulement 3."
      },
      {
        "prompt": "Si Card(A) = 2 et Card(B) = 5, combien de couples contient A × B ?",
        "options": [
          "7",
          "10",
          "25",
          "3"
        ],
        "answer": 1,
        "explanation": "Chaque premier élément a 5 choix possibles pour le second : 2 × 5 = 10 couples."
      },
      {
        "prompt": "On vérifie une propriété sur les entiers de 1 à 100. Peut-on conclure qu’elle est vraie pour tous les entiers positifs ?",
        "options": [
          "Oui, 100 tests suffisent",
          "Oui, si le programme ne renvoie pas d’erreur",
          "Non : cela suggère une conjecture, pas une preuve générale",
          "Non, donc la propriété est fausse"
        ],
        "answer": 2,
        "explanation": "Les tests ne couvrent pas les entiers au-delà de 100. Une preuve doit expliquer pourquoi la propriété tient pour chaque entier du domaine."
      }
    ],
    "exercises": [
      {
        "prompt": "Trace les instructions : x = 2 ; y = 3*x ; x = y − 1. Quelle est la valeur finale de x ?",
        "answer": 5,
        "unit": "",
        "tolerance": 0.01,
        "solution": "La première ligne donne x = 2 ; la deuxième donne y = 6 ; la troisième donne x = 5.",
        "hints": [
          "Lis les lignes dans l’ordre.",
          "La dernière ligne utilise y = 6."
        ],
        "mode": "guided"
      },
      {
        "prompt": "s = 0, puis on ajoute k à s pour chaque k dans range(1, 6). Quelle valeur finale obtient-on ?",
        "answer": 15,
        "unit": "",
        "tolerance": 0.01,
        "solution": "range(1, 6) parcourt 1 à 5. Les valeurs successives de s sont 1, 3, 6, 10 et 15.",
        "hints": [
          "La borne 6 est exclue.",
          "Calcule 1 + 2 + 3 + 4 + 5."
        ],
        "mode": "guided"
      },
      {
        "prompt": "L = [4, 7, 9] ; L.append(12) ; del L[1]. Quelle est alors la valeur de L[1] ?",
        "answer": 9,
        "unit": "",
        "tolerance": 0.01,
        "solution": "Après ajout, L = [4, 7, 9, 12]. Après suppression de l’élément d’indice 1, L = [4, 9, 12]. Le nouvel élément d’indice 1 vaut 9.",
        "hints": [
          "L’élément d’indice 1 est initialement 7.",
          "Les éléments suivants se décalent après la suppression."
        ],
        "mode": "guided"
      },
      {
        "prompt": "Pour u₀ = 5 et uₙ₊₁ = 2uₙ, quel est le premier rang n tel que uₙ ≥ 80 ?",
        "answer": 4,
        "unit": "",
        "tolerance": 0.01,
        "solution": "Les valeurs sont u₀ = 5, u₁ = 10, u₂ = 20, u₃ = 40 et u₄ = 80. Le premier rang est 4.",
        "hints": [
          "Le rang initial est 0.",
          "Il faut quatre doublements pour atteindre 80."
        ],
        "mode": "guided"
      },
      {
        "prompt": "Une fonction initialise p = 1 et multiplie p par chaque k dans range(1, 5). Que renvoie-t-elle ?",
        "answer": 24,
        "unit": "",
        "tolerance": 0.01,
        "solution": "Le programme renvoie 1 × 1 × 2 × 3 × 4 = 24, soit 4!.",
        "hints": [
          "Les facteurs de la boucle sont 1, 2, 3 et 4.",
          "Le facteur 5 n’est pas parcouru."
        ],
        "mode": "guided"
      },
      {
        "prompt": "A contient 8 éléments, B en contient 6 et A ∩ B en contient 3. Calcule Card(A ∪ B).",
        "answer": 11,
        "unit": "",
        "tolerance": 0.01,
        "solution": "Card(A ∪ B) = 8 + 6 − 3 = 11. Les trois éléments communs avaient été comptés deux fois.",
        "hints": [
          "Additionner 8 et 6 compte certains éléments deux fois.",
          "Retranche l’effectif de l’intersection."
        ],
        "mode": "guided"
      },
      {
        "prompt": "F₀ = 0, F₁ = 1 et Fₙ₊₂ = Fₙ₊₁ + Fₙ. Calcule F₆.",
        "answer": 8,
        "unit": "",
        "tolerance": 0.01,
        "solution": "La liste est 0 ; 1 ; 1 ; 2 ; 3 ; 5 ; 8 pour les rangs de 0 à 6. Donc F₆ = 8.",
        "hints": [
          "Écris les rangs au-dessus des valeurs.",
          "F₆ est la somme de F₅ = 5 et F₄ = 3."
        ],
        "mode": "autonomous"
      },
      {
        "prompt": "Écris une fonction Python carres(n) qui renvoie la liste des carrés des entiers de 0 à n inclus, pour un entier n ≥ 0. Donne la liste obtenue pour n = 3.",
        "type": "open",
        "solution": "Une solution est : def carres(n): return [k**2 for k in range(n + 1)]. Pour n = 3, la liste est [0, 1, 4, 9]. Autoévaluation : fonction avec paramètre, puissance **2, borne n + 1, return et exemple exact.",
        "hints": [
          "range exclut sa borne finale.",
          "On peut utiliser une liste en compréhension."
        ],
        "mode": "autonomous"
      },
      {
        "prompt": "Réfute l’affirmation « pour tout réel x, x² ≥ x », puis écris sa négation en français.",
        "type": "open",
        "solution": "Prendre x = 1/2 : x² = 1/4 < 1/2. Ce contre-exemple suffit. La négation est « il existe un réel x tel que x² < x ». Autoévaluation : un réel explicite, comparaison calculée, quantificateur existentiel et inégalité stricte.",
        "hints": [
          "Entre 0 et 1, compare un nombre avec son carré.",
          "Nier « pour tout » donne « il existe »."
        ],
        "mode": "autonomous"
      },
      {
        "prompt": "Démontre par contraposée : pour tout entier n, si n² est pair alors n est pair.",
        "type": "open",
        "solution": "On prouve : si n est impair, alors n² est impair. Écrivons n = 2k + 1 avec k entier. Alors n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, donc n² est impair. Par contraposée, si n² est pair, n est pair. Autoévaluation : contraposée annoncée, écriture d’un impair, développement correct, conclusion.",
        "hints": [
          "La contraposée échange et nie hypothèse et conclusion.",
          "Un entier impair s’écrit 2k + 1 avec k entier."
        ],
        "mode": "autonomous"
      }
    ],
    "exam": {
      "title": "Un programme et une preuve à défendre",
      "minutes": 20,
      "context": "Sujet original. On considère le programme : u = 3 ; n = 0 ; tant que u < 31, remplacer u par 2u + 1 puis n par n + 1. Les deux affectations font partie de la boucle. On veut aussi raisonner sur les nombres pairs et impairs.",
      "parts": [
        {
          "prompt": "Dresse la trace des couples (n ; u), donne le résultat final et explique ce que cherche la boucle.",
          "points": 4,
          "solution": "État initial (0 ; 3), puis (1 ; 7), (2 ; 15), (3 ; 31) (2 pts). La boucle s’arrête à n = 3 car 31 < 31 est faux (1 pt). Elle cherche le premier rang où la suite atteint ou dépasse 31, donc uₙ ≥ 31 (1 pt)."
        },
        {
          "prompt": "Écris une compréhension Python produisant les valeurs 2k + 1 pour k de 0 à 4 inclus ; donne la liste. Explique pourquoi tous ses éléments sont impairs.",
          "points": 3,
          "solution": "[2*k + 1 for k in range(5)] (1 pt) donne [1, 3, 5, 7, 9] (1 pt). Chaque valeur est de la forme 2k + 1 avec k entier, définition d’un entier impair (1 pt)."
        },
        {
          "prompt": "Démontre par cas que n(n + 1) est pair pour tout entier n. Un contrôle Python de 100 valeurs suffirait-il à le prouver ?",
          "points": 3,
          "solution": "Si n est pair, n(n + 1) est un multiple de 2 (1 pt). Si n est impair, n + 1 est pair ; le produit est encore pair. Les deux cas couvrent tous les entiers (1 pt). Cent tests ne traitent qu’un nombre fini d’entiers et ne remplacent pas cette preuve générale (1 pt)."
        }
      ]
    }
  }
];
