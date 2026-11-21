import subprocess,sys,time,json
from playwright.sync_api import sync_playwright
srv=subprocess.Popen([sys.executable,'-m','http.server','8794','-d',__import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)),'..','site')],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
try:
  with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(accept_downloads=True);pg=ctx.new_page()
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8794/exponentielle/index.html');pg.wait_for_timeout(500)
    # produire de la progression dans un chapitre : repondre a e01
    pg.evaluate("localStorage.setItem('maths-sanaa:exponentielle','{\"e01\":{\"ok\":true}}')")
    pg.goto('http://localhost:8794/index.html');pg.wait_for_timeout(500)
    pg.click('#data-settings')
    with pg.expect_download() as d: pg.click('#export')
    path=d.value.path(); data=json.load(open(path))
    print('chapters' in data, list(data.get('chapters',{}).keys()))
    pg.evaluate("localStorage.clear()")
    pg.set_input_files('#import',path);pg.wait_for_timeout(500)
    print('restore',pg.evaluate("localStorage.getItem('maths-sanaa:exponentielle')"), pg.inner_text('#import-status'))
    pg.click('summary:has-text("Recommencer")');pg.click('#reset-data');pg.wait_for_timeout(300)
    print('after reset',pg.evaluate("localStorage.getItem('maths-sanaa:exponentielle')"))
    print(errs)
    b.close()
finally: srv.terminate()
