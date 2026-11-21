/* Sujets originaux transversaux — niveau Première, sans annales reproduites. */
globalThis.REVISION_TOPICS = [
  {
    title: 'Une courbe, sa tangente et son signe',
    links: ['d1', 'd2', 'd3'],
    minutes: 30,
    context: 'On étudie f(x) = (x − 1)eˣ sur [−2 ; 2]. On rappelle que eˣ est strictement positif et que sa dérivée est eˣ. Les valeurs exactes sont attendues : aucune calculatrice n’est nécessaire.',
    parts: [
      {
        prompt: 'Dérive f en justifiant la règle utilisée, puis établis son tableau de variations sur [−2 ; 2]. Donne la valeur et la position de son minimum.',
        points: 4,
        solution: 'Par la règle du produit, f′(x) = 1 × eˣ + (x − 1)eˣ = xeˣ (1 pt). Comme eˣ > 0, f′ a le signe de x : négatif sur [−2 ; 0[, nul en 0, positif sur ]0 ; 2] (1 pt). f décroît de f(−2) = −3e⁻² à f(0) = −1 puis croît jusqu’à f(2) = e² (1 pt). Le minimum est −1, atteint seulement pour x = 0 (1 pt).'
      },
      {
        prompt: 'Résous f(x) = 0 puis f(x) ≥ 0 sur l’intervalle étudié. Explique pourquoi le signe de f et le signe de f′ ne se confondent pas.',
        points: 3,
        solution: 'eˣ n’étant jamais nul, f(x) = 0 équivaut à x − 1 = 0, donc x = 1 (1 pt). Le signe de f est celui de x − 1 ; f(x) ≥ 0 sur [1 ; 2] (1 pt). Le signe de f décrit la position par rapport à l’axe horizontal, celui de f′ décrit les variations. Sur ]0 ; 1[, f est négative mais croissante (1 pt).'
      },
      {
        prompt: 'Détermine l’équation de la tangente à la courbe au point d’abscisse 1. Utilise cette tangente pour proposer une approximation de f(1 + h) quand h est proche de 0. Pourquoi n’est-ce pas une égalité exacte pour tout h ?',
        points: 3,
        solution: 'f(1) = 0 et f′(1) = e (1 pt). La tangente a pour équation y = f′(1)(x − 1) + f(1) = e(x − 1) (1 pt). Donc f(1 + h) ≈ eh près de h = 0. Exactement, f(1 + h) = he¹⁺ʰ = eh × eʰ ; remplacer eʰ par 1 est une approximation locale, pas une identité (1 pt).'
      }
    ]
  },
  {
    title: 'Un jeu, un arbre et une décision',
    links: ['p1', 'p2', 'm2'],
    minutes: 30,
    context: 'Un jeu choisit la boîte A avec probabilité 0,40, sinon la boîte B. Dans A, 75 % des tickets sont gagnants ; dans B, 25 % le sont. On note G « le ticket est gagnant ». Le gain net X vaut 10 € pour un ticket gagnant et −2 € sinon. On suppose ces probabilités exactes.',
    parts: [
      {
        prompt: 'Représente l’arbre, calcule P(A ∩ G) et P(G), puis la probabilité d’avoir choisi A sachant que le ticket est gagnant.',
        points: 4,
        solution: 'L’arbre porte P(A) = 0,40, P(B) = 0,60, puis depuis A les branches G = 0,75 et non G = 0,25 ; depuis B, G = 0,25 et non G = 0,75 (1 pt). P(A ∩ G) = 0,40 × 0,75 = 0,30 (1 pt). P(G) = 0,30 + 0,60 × 0,25 = 0,45 (1 pt). P_G(A) = 0,30/0,45 = 2/3 (1 pt).'
      },
      {
        prompt: 'Donne la loi de X, calcule son espérance et sa variance. Une espérance positive garantit-elle de gagner lors d’une partie ?',
        points: 4,
        solution: 'La loi est P(X = 10) = 0,45 et P(X = −2) = 0,55 (1 pt). E(X) = 10 × 0,45 − 2 × 0,55 = 3,40 € (1 pt). E(X²) = 100 × 0,45 + 4 × 0,55 = 47,20 ; V(X) = 47,20 − 3,40² = 35,64 €² (1 pt). Non : une partie peut perdre 2 € avec probabilité 0,55. L’espérance décrit un gain moyen théorique sur des répétitions, pas une garantie individuelle (1 pt).'
      },
      {
        prompt: 'A et G sont-ils indépendants ? Propose ensuite une simulation d’un ticket à l’aide de deux nombres aléatoires indépendants uniformes entre 0 et 1, et explique ce qu’une fréquence de succès estime.',
        points: 2,
        solution: 'Non : P(G sachant A) = 0,75 diffère de P(G) = 0,45 ; on peut aussi comparer P(A ∩ G) = 0,30 à P(A)P(G) = 0,18 (1 pt). Tirer r₁ et r₂ indépendants : si r₁ < 0,40, choisir A et déclarer gagnant si r₂ < 0,75 ; sinon choisir B et déclarer gagnant si r₂ < 0,25. Sur de nombreuses répétitions indépendantes, la fréquence de G estime 0,45 avec des fluctuations ; elle n’est pas nécessairement égale à 0,45 (1 pt).'
      }
    ]
  },
  {
    title: 'Sur le cercle : angle, vecteurs et tangente',
    links: ['d4', 'g1', 'g2'],
    minutes: 30,
    context: 'Dans un repère orthonormé, O(0 ; 0) est le centre du cercle unité, A(1 ; 0) et B(1/2 ; √3/2). On considère l’angle orienté de OA vers OB dans le sens direct, compris entre 0 et π. On peut utiliser cos(π/3) = 1/2 et sin(π/3) = √3/2.',
    parts: [
      {
        prompt: 'Vérifie que B appartient au cercle unité. Donne l’angle AOB en radians et en degrés, puis la longueur du petit arc AB.',
        points: 3,
        solution: 'OB² = (1/2)² + (√3/2)² = 1/4 + 3/4 = 1 : B appartient au cercle unité (1 pt). Ses coordonnées sont (cos(π/3) ; sin(π/3)), donc l’angle est π/3 rad, soit 60° (1 pt). Sur un cercle de rayon 1, la longueur d’arc correspondant à l’angle π/3 vaut π/3 unité de longueur (1 pt).'
      },
      {
        prompt: 'Calcule OA · OB à partir des coordonnées, puis AB² avec l’identité sur la norme d’une différence. Quelle est la nature du triangle OAB ?',
        points: 3,
        solution: 'OA · OB = 1 × 1/2 + 0 × √3/2 = 1/2 (1 pt). AB² = ||OB − OA||² = ||OB||² + ||OA||² − 2 OA · OB = 1 + 1 − 1 = 1 (1 pt). OA = OB = AB = 1 : le triangle est équilatéral (1 pt).'
      },
      {
        prompt: 'La tangente au cercle en B est perpendiculaire à OB. Établis son équation cartésienne, puis détermine son point d’intersection avec la tangente au cercle en A.',
        points: 4,
        solution: 'Un vecteur normal à la tangente en B est OB = (1/2 ; √3/2) (1 pt). Pour M(x ; y), OB · BM = 0 donne (1/2)(x − 1/2) + (√3/2)(y − √3/2) = 0, donc x + √3 y − 2 = 0 (1 pt). En A, la tangente est verticale, d’équation x = 1 (1 pt). En remplaçant x par 1, √3 y = 1, donc le point d’intersection est (1 ; 1/√3), ou (1 ; √3/3) (1 pt).'
      }
    ]
  }
];
