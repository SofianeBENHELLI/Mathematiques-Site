"""Bouton « Installer l'appli » : invite native (Android/Chrome), mode d'emploi (iOS), absent si déjà installé."""
import sys, subprocess, time, os
from playwright.sync_api import sync_playwright
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8801', '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
fails = 0
def check(c, m):
    global fails
    if not c: fails += 1; print('ECHEC', m)
IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
AND = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36'
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, ua, url in (('android', AND, '/fonctions/'), ('ios', IOS, '/derivation/'), ('accueil-android', AND, '/')):
            ctx = b.new_context(user_agent=ua, viewport={'width': 390, 'height': 844}, has_touch=True, is_mobile=True); pg = ctx.new_page(); errs = []
            pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.goto('http://localhost:8801' + url); pg.wait_for_timeout(900)
            btn = pg.locator('.btn-install'); check(btn.count() == 1, f'{name}: bouton absent')
            if name == 'android':
                pg.evaluate("window.__p=0;var e=new Event('beforeinstallprompt');e.preventDefault=()=>{};e.prompt=()=>{window.__p++;return Promise.resolve()};e.userChoice=Promise.resolve({outcome:'accepted'});window.dispatchEvent(e)")
                btn.click(); pg.wait_for_timeout(200)
                check(pg.evaluate("window.__p") == 1, 'android: invite native non appelée')
                check(pg.locator('#install-dialog').count() == 0, 'android: dialogue inattendu')
            else:
                btn.click(); pg.wait_for_timeout(200)
                d = pg.locator('#install-dialog'); check(d.count() == 1, f'{name}: dialogue absent')
                txt = d.inner_text() if d.count() else ''
                check(('Partager' in txt) if name == 'ios' else ('Installer' in txt), f'{name}: mode d\'emploi')
                pg.keyboard.press('Escape'); pg.wait_for_timeout(100); check(pg.locator('#install-dialog').count() == 0, f'{name}: Échap ne ferme pas')
            check(not errs, f'{name}: erreurs {errs}'); ctx.close()
        # déjà installée : pas de bouton
        ctx = b.new_context(viewport={'width': 390, 'height': 844}); pg = ctx.new_page()
        pg.add_init_script("const m=window.matchMedia;window.matchMedia=q=>q.includes('standalone')?{matches:true,addEventListener(){},removeEventListener(){}}:m.call(window,q)")
        pg.goto('http://localhost:8801/fonctions/'); pg.wait_for_timeout(800)
        check(pg.locator('.btn-install').count() == 0, 'installée: bouton encore affiché')
        b.close()
finally: srv.terminate()
print('OK' if not fails else f'{fails} échec(s)'); sys.exit(1 if fails else 0)
