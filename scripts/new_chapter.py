#!/usr/bin/env python3
"""Génère site/<id>/index.html depuis une définition de chapitre (scripts/chapters/<id>.py).
Usage : python3 scripts/new_chapter.py <id> [<id> ...]"""
import sys, os, importlib.util, html
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
HEAD = open(os.path.join(ROOT, 'scripts', 'chapter_head.html'), encoding='utf-8').read()

def build(c):
    h = HEAD
    for k, v in (('TITLE', c['title']), ('DESC', c['desc']), ('BRAND', c['brand']), ('SYM', c['sym']), ('TAG', c['tag'])):
        h = h.replace('{{%s}}' % k, v)
    courses = ''
    for i, (t, body) in enumerate(c['courses']):
        courses += '<details class="course"%s><summary>▤ %d. %s<span>+</span></summary><div>%s</div></details>\n' % (' open' if i == 0 else '', i + 1, t, body)
    labs = ''.join('<div id="lab%d"></div>' % (i + 1) for i in range(c['nlabs']))
    nums = {4: 'Quatre', 5: 'Cinq', 6: 'Six', 7: 'Sept', 8: 'Huit', 3: 'Trois'}
    cn = {5: 'Cinq', 6: 'Six', 7: 'Sept', 8: 'Huit'}[len(c['courses'])] if len(c['courses']) in (5, 6, 7, 8) else str(len(c['courses']))
    body = f'''<div id="sitenav" data-current="{c['id']}"></div>
<div class="navwrap"><strong id="sticky-formula">{c['formula']}</strong>
<nav aria-label="Chapitres"><a href="#essentiel">Essentiel</a><a href="#ateliers">Ateliers</a><a href="#exercices">Exercices</a></nav></div>
<main>
<section class="hero"><div><p class="eyebrow">{c['eyebrow']}</p>
<h1>{c['h1']}</h1>
<p>{c['lead']}</p></div>
<div class="hero-note"><span>TON PARCOURS</span><b>{c['parcours']}</b><p>Chaque idée a son atelier : manipule d'abord, retiens ensuite.</p></div></section>

<section id="essentiel"><div class="section-heading"><span>01 / L'ESSENTIEL</span><h2>{cn} idées à posséder.</h2></div>
{courses}</section>

<section id="ateliers"><div class="section-heading"><span>02 / MANIPULER</span><h2>{nums.get(c['nlabs'], str(c['nlabs']))} ateliers.</h2></div>
{labs}</section>

<section id="exercices"><div class="section-heading"><span>03 / S'ENTRAÎNER</span><h2>{c['nex']} exercices corrigés.</h2></div>
<p>Niveau ★ : réflexe. ★★ : application directe. ★★★ : raisonnement et rédaction.</p>
<div id="exos"></div>
<details class="panel"><summary>Ma checklist de révision <span>+</span></summary><div id="checklist" class="panel-body"></div></details></section>
<footer><b>Fait pour Sanaa, avec confiance en sa réussite.</b><p>{c['footer']} · Première générale, spécialité mathématiques. Les ateliers illustrent, ils ne remplacent pas une démonstration.</p></footer>
</main>
<script src="../assets/fx.js"></script><script src="../assets/mini.js"></script><script src="content.js"></script><script src="app.js"></script><script src="/assets/nav.js"></script><script src="/assets/pwa.js"></script>
</body></html>
'''
    return h + body

for cid in sys.argv[1:]:
    spec = importlib.util.spec_from_file_location('ch', os.path.join(ROOT, 'scripts', 'chapters', cid + '.py'))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    d = os.path.join(ROOT, 'site', m.C['id']); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(build(m.C))
    print('ecrit', m.C['id'])
