C = dict(
    id='python', title='Python et algorithmique : boucles, listes, suites, dichotomie',
    desc='Variables, conditions, boucles for et while, fonctions, listes, suites et seuils, dichotomie et simulation avec random : cours, tableaux de suivi interactifs et exercices corrigés pour la Première spécialité.',
    brand='python', sym='py', tag='lire, prévoir et écrire un programme',
    formula='for · while · if · def',
    eyebrow='PREMIÈRE SPÉCIALITÉ · ALGORITHMIQUE ET PROGRAMMATION',
    h1='Un programme, <em>c’est un raisonnement qui s’exécute.</em>',
    lead='Tu vas lire un programme ligne par ligne avec un tableau de suivi, prévoir ce qu’il affiche, et écrire les boucles dont tu as besoin pour les suites, les seuils, la dichotomie et les simulations.',
    parcours='Variables → conditions → boucles → fonctions → listes → seuil → dichotomie',
    nlabs=3, nex=16, footer='Python et algorithmique',
    courses=[
        ('Variables et affectation', '''<p>Une variable porte un nom et une valeur. L'instruction <b>x = 3</b> range la valeur 3 dans x. L'affectation se lit de droite à gauche : <b>x = x + 1</b> calcule x + 1 avec l'ancienne valeur, puis range le résultat dans x.</p>
<p class="formula">x = 3<br>y = 2 * x &nbsp;&nbsp; # y vaut 6<br>x = y + 1 &nbsp;&nbsp; # x vaut 7, y vaut toujours 6</p>
<p>Une opération comme / donne un nombre à virgule (7/2 vaut 3.5), // donne le quotient entier (7 // 2 vaut 3) et % le reste (7 % 2 vaut 1).</p>'''),
        ('Conditions : if, elif, else', '''<p class="formula">if x % 2 == 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;y = x / 2<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;y = 3 * x + 1</p>
<p>La condition est vraie ou fausse. <b>==</b> teste l'égalité, <b>=</b> affecte. Les opérateurs de comparaison : ==, !=, &lt;, &lt;=, &gt;, &gt;=, et on les combine avec <b>and</b>, <b>or</b>, <b>not</b>. L'indentation (4 espaces) délimite le bloc.</p>'''),
        ('Boucles for et while', '''<p><b>for</b> répète un nombre de fois connu : <code>for i in range(n)</code> prend i = 0, 1, …, n − 1 (n tours, la borne n est exclue). <code>range(a, b)</code> va de a à b − 1, <code>range(a, b, pas)</code> avance par pas.</p>
<p class="formula">s = 0<br>for i in range(1, 5):<br>&nbsp;&nbsp;&nbsp;&nbsp;s = s + i<br>print(s) &nbsp;&nbsp; # 1 + 2 + 3 + 4 = 10</p>
<p><b>while</b> répète tant qu'une condition est vraie, quand on ne connaît pas le nombre de tours. Il faut que quelque chose dans la boucle fasse changer la condition, sinon la boucle ne s'arrête jamais.</p>'''),
        ('Fonctions', '''<p class="formula">def f(x):<br>&nbsp;&nbsp;&nbsp;&nbsp;return x * x - 3<br><br>print(f(2)) &nbsp;&nbsp; # 1<br>print(f(f(2))) &nbsp;&nbsp; # f(1) = -2</p>
<p>Une fonction reçoit des paramètres et renvoie un résultat avec <b>return</b>. Elle permet de réutiliser un calcul et de le tester sur plusieurs valeurs. <b>print</b> affiche, <b>return</b> renvoie : ce n'est pas la même chose.</p>'''),
        ('Listes', '''<p class="formula">L = [3, 8, 1]<br>L.append(5) &nbsp;&nbsp; # [3, 8, 1, 5]<br>len(L) &nbsp;&nbsp; # 4<br>L[0] &nbsp;&nbsp; # 3 (le premier a l'indice 0)<br>[x * x for x in range(5)] &nbsp;&nbsp; # [0, 1, 4, 9, 16]<br>[x for x in range(20) if x % 3 == 0] &nbsp;&nbsp; # 7 éléments</p>
<p>On parcourt une liste avec <code>for x in L</code>. Les indices commencent à <b>0</b> : le dernier élément d'une liste de n éléments a pour indice n − 1 (ou −1).</p>'''),
        ('Suites et seuils', '''<p class="formula">u = 100 &nbsp;&nbsp; n = 0<br>while u &gt; 50:<br>&nbsp;&nbsp;&nbsp;&nbsp;u = 0.9 * u<br>&nbsp;&nbsp;&nbsp;&nbsp;n = n + 1<br>print(n) &nbsp;&nbsp; # premier rang où u ≤ 50</p>
<p>Pour calculer un terme : une boucle for. Pour chercher le premier rang qui dépasse un seuil : une boucle while avec un compteur n. Le test de la boucle est la <b>négation</b> de ce qu'on cherche : on continue tant que le seuil n'est pas atteint.</p>'''),
        ('Dichotomie et simulation', '''<p><b>Dichotomie.</b> Pour encadrer une solution de f(x) = 0 sur [a ; b] quand f est continue et change de signe : on coupe en m = (a + b)/2 et on garde la moitié où le signe change. Chaque tour divise la largeur par 2.</p>
<p class="formula">while b - a &gt; 0.001:<br>&nbsp;&nbsp;&nbsp;&nbsp;m = (a + b) / 2<br>&nbsp;&nbsp;&nbsp;&nbsp;if f(a) * f(m) &lt;= 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b = m<br>&nbsp;&nbsp;&nbsp;&nbsp;else:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a = m</p>
<p><b>Simulation.</b> <code>from random import randint, random</code> : randint(1, 6) donne un entier de 1 à 6 inclus, random() un réel de [0 ; 1[. On simule beaucoup d'expériences et on observe la fréquence : elle se rapproche de la probabilité.</p>'''),
    ])
