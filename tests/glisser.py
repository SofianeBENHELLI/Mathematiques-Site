"""Chaque poignée glissable déplace réellement l'atelier (souris), sans erreur JS."""
import sys, subprocess, time, os
from playwright.sync_api import sync_playwright
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8796', '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
pages = ['fonctions','derivation','exponentielle','trigonometrie','polynomes','produit-scalaire','droites-cercles']
fails = 0; total = 0
try:
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1200, 'height': 1000})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        for name in pages:
            pg.goto(f'http://localhost:8796/{name}/'); pg.wait_for_timeout(400)
            for i in range(pg.locator('.lab').count()):
                lab = pg.locator('.lab').nth(i); n = lab.locator('circle.fx-handle').count()
                for j in range(n):
                    hd = lab.locator('circle.fx-handle').nth(j)
                    if hd.get_attribute('visibility') == 'hidden': continue
                    hd.scroll_into_view_if_needed(); bb = hd.bounding_box(); total += 1
                    before = lab.inner_html(); x0, y0 = bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2
                    moved = False
                    for dx, dy in ((70, -50), (-70, 50), (40, 60)):
                        pg.mouse.move(x0, y0); pg.mouse.down(); pg.mouse.move(x0 + dx / 2, y0 + dy / 2, steps=4); pg.mouse.move(x0 + dx, y0 + dy, steps=4); pg.mouse.up(); pg.wait_for_timeout(80)
                        if lab.inner_html() != before: moved = True; break
                    if not moved: fails += 1; print('ECHEC', name, 'atelier', i + 1, 'poignée', j + 1, 'ne bouge pas')
        if errs: fails += 1; print('erreurs JS', errs[:3])
        b.close()
finally: srv.terminate()
print(f'{total} poignées testées'); print('OK' if not fails else f'{fails} échec(s)'); sys.exit(1 if fails else 0)
