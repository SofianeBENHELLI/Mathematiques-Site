"""Test PWA : avec le service worker actif, les ateliers réagissent, y compris hors ligne."""
import sys, subprocess, time, os
from playwright.sync_api import sync_playwright
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8793', '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
fails = 0
def check(c, m):
    global fails
    if not c: fails += 1; print('ECHEC', m)
def poke(pg, lab):
    root = pg.locator('#' + lab); g = root.locator('svg.fx-graph').first
    before = g.inner_html(); s = root.locator('input[type=range]').first
    s.evaluate("e=>{e.value=e.max;e.dispatchEvent(new Event('input',{bubbles:true}))}"); pg.wait_for_timeout(150)
    return before != g.inner_html()
try:
    with sync_playwright() as p:
        b = p.chromium.launch(); ctx = b.new_context(viewport={'width': 390, 'height': 844}, has_touch=True, is_mobile=True); pg = ctx.new_page()
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto('http://localhost:8793/fonctions/'); pg.wait_for_timeout(1500)
        pg.evaluate("navigator.serviceWorker.ready.then(()=>1)"); pg.wait_for_timeout(1500)
        pg.reload(); pg.wait_for_timeout(800)
        check(pg.evaluate("!!navigator.serviceWorker.controller"), 'service worker pas actif')
        for lab in ('lab1', 'lab2'): check(poke(pg, lab), f'en ligne {lab} non interactif')
        ctx.set_offline(True); pg.reload(); pg.wait_for_timeout(800)
        for lab in ('lab1', 'lab2'): check(poke(pg, lab), f'hors ligne {lab} non interactif')
        check(not errs, f'erreurs {errs}')
        b.close()
finally: srv.terminate()
print('OK' if not fails else f'{fails} échec(s)'); sys.exit(1 if fails else 0)
