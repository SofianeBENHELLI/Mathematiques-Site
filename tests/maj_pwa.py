"""Test : une nouvelle version du service worker fait apparaître le bandeau de mise à jour."""
import sys, subprocess, time, os, shutil, tempfile, re
from playwright.sync_api import sync_playwright
src = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
tmp = tempfile.mkdtemp(); site = os.path.join(tmp, 'site'); shutil.copytree(src, site)
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8797', '-d', site], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
fails = 0
def check(c, m):
    global fails
    if not c: fails += 1; print('ECHEC', m)
try:
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page()
        pg.goto('http://localhost:8797/fonctions/'); pg.wait_for_timeout(1500)
        pg.reload(); pg.wait_for_timeout(1000)
        check(pg.locator('#maj-pwa').count() == 0, 'bandeau affiché à la première visite')
        sw = open(os.path.join(site, 'sw.js'), encoding='utf-8').read()
        open(os.path.join(site, 'sw.js'), 'w', encoding='utf-8').write(re.sub(r'const VERSION = "[0-9a-f]+"', 'const VERSION = "nouvelleversion"', sw))
        pg.evaluate("navigator.serviceWorker.getRegistration().then(r=>r.update())"); pg.wait_for_timeout(2500)
        check(pg.locator('#maj-pwa').count() == 1, 'bandeau absent après une nouvelle version')
        check('Mettre à jour' in pg.locator('#maj-pwa').inner_text(), 'bouton absent')
        pg.locator('#maj-pwa button', has_text='Mettre à jour').click(); pg.wait_for_timeout(1200)
        check(pg.locator('#maj-pwa').count() == 0, 'bandeau toujours là après rechargement')
        b.close()
finally:
    srv.terminate(); shutil.rmtree(tmp, ignore_errors=True)
print('OK' if not fails else f'{fails} échec(s)'); sys.exit(1 if fails else 0)
