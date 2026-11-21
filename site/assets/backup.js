/* Sauvegarde et restauration de la progression (fichier JSON). Aucune donnée ne quitte l'appareil. */
(function (root) {
  'use strict';
  var PREFIXES = ['maths-sanaa:', 'sanaa-maths-v1'];
  function keys() { var out = []; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (PREFIXES.some(function (p) { return k.indexOf(p) === 0; })) out.push(k); } } catch (e) { } return out; }
  function exportData() { var d = { app: 'maths-sanaa', version: 1, date: new Date().toISOString(), items: {} }; keys().forEach(function (k) { d.items[k] = localStorage.getItem(k); }); return d; }
  function importData(d) {
    if (!d || d.app !== 'maths-sanaa' || !d.items || typeof d.items !== 'object') throw new Error('Fichier non reconnu');
    var n = 0; Object.keys(d.items).forEach(function (k) { if (PREFIXES.some(function (p) { return k.indexOf(p) === 0; }) && typeof d.items[k] === 'string') { localStorage.setItem(k, d.items[k]); n++; } });
    return n;
  }
  function chapters() { var o = {}; keys().forEach(function (k) { if (k.indexOf('maths-sanaa:') === 0) o[k] = localStorage.getItem(k); }); return o; }
  function restoreChapters(o) { var n = 0; if (o && typeof o === 'object') Object.keys(o).forEach(function (k) { if (k.indexOf('maths-sanaa:') === 0 && typeof o[k] === 'string') { try { localStorage.setItem(k, o[k]); n++; } catch (e) { } } }); return n; }
  function clearChapters() { keys().forEach(function (k) { if (k.indexOf('maths-sanaa:') === 0) { try { localStorage.removeItem(k); } catch (e) { } } }); }
  function download() {
    var blob = new Blob([JSON.stringify(exportData(), null, 1)], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'progression-maths-sanaa.json'; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function mount(el) {
    el.innerHTML = '<p class="muted" style="margin:0 0 8px">Ta progression est enregistrée sur cet appareil. Pour la garder ou la passer sur un autre appareil : enregistre un fichier, puis charge-le ailleurs.</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" id="bk-save" style="min-height:44px;padding:8px 16px;border-radius:8px;border:1px solid #b9c6f5;background:#e7edff;color:#294bd3;font-weight:600;cursor:pointer">⬇ Enregistrer ma progression</button>' +
      '<label style="display:inline-flex;align-items:center;min-height:44px;padding:8px 16px;border-radius:8px;border:1px solid #d5dbe8;background:#fff;color:#53617a;font-weight:600;cursor:pointer">⬆ Charger un fichier<input id="bk-load" type="file" accept="application/json,.json" style="display:none"></label></div><p id="bk-msg" role="status" class="muted" style="margin:8px 0 0"></p>';
    el.querySelector('#bk-save').addEventListener('click', function () { download(); el.querySelector('#bk-msg').textContent = 'Fichier enregistré dans tes téléchargements.'; });
    el.querySelector('#bk-load').addEventListener('change', function (ev) {
      var f = ev.target.files && ev.target.files[0]; if (!f) return; var r = new FileReader();
      r.onload = function () { try { var n = importData(JSON.parse(r.result)); el.querySelector('#bk-msg').textContent = n + ' éléments restaurés. La page va se recharger.'; setTimeout(function () { location.reload(); }, 900); } catch (e) { el.querySelector('#bk-msg').textContent = 'Ce fichier n’est pas une sauvegarde valide.'; } };
      r.readAsText(f);
    });
  }
  root.Backup = { chapters: chapters, restoreChapters: restoreChapters, clearChapters: clearChapters, keys: keys, exportData: exportData, importData: importData, download: download, mount: mount };
  if (typeof module === 'object' && module.exports) module.exports = root.Backup;
})(typeof self !== 'undefined' ? self : this);
