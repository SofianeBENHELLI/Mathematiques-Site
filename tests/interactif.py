"""Chaque atelier : un curseur, un menu ou un bouton doit modifier l'affichage."""
import sys, subprocess, time, os
from playwright.sync_api import sync_playwright
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8794', '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
pages = ['fonctions','derivation','exponentielle','trigonometrie','polynomes','suites','produit-scalaire','droites-cercles','probabilites','variables-aleatoires','statistiques','python']
fails = 0
try:
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 390, 'height': 844}, has_touch=True)
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        for name in pages:
            pg.goto(f'http://localhost:8794/{name}/'); pg.wait_for_timeout(400)
            labs = pg.locator('.lab'); n = labs.count()
            for i in range(n):
                lab = labs.nth(i); snap = lambda: lab.inner_html()
                before = snap(); changed = False
                for s in range(lab.locator('input[type=range]').count()):
                    lab.locator('input[type=range]').nth(s).evaluate("e=>{e.value=e.max;e.dispatchEvent(new Event('input',{bubbles:true}))}"); pg.wait_for_timeout(80)
                    if snap() != before: changed = True; break
                if not changed:
                    for s in range(lab.locator('select').count()):
                        sl = lab.locator('select').nth(s); k = sl.locator('option').count()
                        sl.select_option(index=k - 1); pg.wait_for_timeout(80)
                        if snap() != before: changed = True; break
                if not changed:
                    for s in range(lab.locator('button').count()):
                        lab.locator('button').nth(s).click(); pg.wait_for_timeout(80)
                        if snap() != before: changed = True; break
                if not changed: fails += 1; print('ECHEC', name, 'atelier', i + 1, 'ne réagit pas')
            print(name, n, 'ateliers')
        if errs: fails += 1; print('erreurs JS', errs)
        b.close()
finally: srv.terminate()
print('OK' if not fails else f'{fails} échec(s)'); sys.exit(1 if fails else 0)
