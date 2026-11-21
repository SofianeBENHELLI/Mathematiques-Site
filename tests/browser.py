"""Test navigateur : chargement sans erreur console, interactions clés, captures.
Usage : python3 tests/browser.py <page> [<page> ...]   (ex. fonctions derivation)"""
import sys, subprocess, time, os
from playwright.sync_api import sync_playwright

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
PORT = 8791
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
fails = 0
def check(c, m):
    global fails
    if not c: fails += 1; print('ECHEC', m)
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for page_name in sys.argv[1:]:
            for label, vp in (('desktop', {'width': 1280, 'height': 900}), ('mobile', {'width': 390, 'height': 844})):
                ctx = b.new_context(viewport=vp); pg = ctx.new_page()
                errs = []
                pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
                pg.on('pageerror', lambda e: errs.append(str(e)))
                pg.goto(f'http://localhost:{PORT}/{page_name}/index.html'); pg.wait_for_timeout(600)
                check(not errs, f'{page_name} {label} erreurs console: {errs}')
                n_svg = pg.locator('svg.fx-graph').count()
                check(n_svg >= 3, f'{page_name} {label}: {n_svg} graphiques')
                # débordement horizontal
                ow = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
                check(ow <= 2, f'{page_name} {label}: débordement horizontal {ow}px')
                pg.screenshot(path=f'/tmp/{page_name}-{label}.png', full_page=False)
                ctx.close()
        b.close()
finally:
    srv.terminate()
print('OK' if not fails else f'{fails} échec(s)')
sys.exit(1 if fails else 0)
