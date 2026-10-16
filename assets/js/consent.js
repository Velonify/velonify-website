/* Cookie-Banner + Microsoft Clarity. Clarity wird erst nach Zustimmung geladen. */
(function () {
  var KEY = 'velonify-consent', CLARITY_ID = 'yyoy0esqf2';
  var en = (document.documentElement.lang || '').slice(0, 2) === 'en';
  var T = en
    ? { text: 'We use cookies to improve your experience on our site.', more: 'Privacy', yes: 'Accept', no: 'Decline', url: '/en/privacy/' }
    : { text: 'Wir nutzen Cookies, um die User Experience auf unserer Seite zu verbessern.', more: 'Datenschutz', yes: 'Akzeptieren', no: 'Ablehnen', url: '/datenschutz/' };

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadClarity() {
    if (window.clarity && window.clarity.q === undefined && document.getElementById('clarity-tag')) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.id = 'clarity-tag'; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function revoke() {
    // Clarity-Cookies entfernen, wenn die Zustimmung zurückgenommen wird
    ['_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'MUID', 'SM'].forEach(function (n) {
      ['', '.' + location.hostname.replace(/^www\./, ''), '.clarity.ms'].forEach(function (d) {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  var css = '#vc{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:420px;box-sizing:border-box;padding:18px 20px;background:#2C0E18;color:#fff;border:1px solid rgba(255,255,255,.18);font:400 14px/1.5 "Albert Sans",system-ui,sans-serif}' +
    '#vc p{margin:0 0 14px}#vc a{color:#C5D8E6;text-decoration:underline;text-underline-offset:3px}' +
    '#vc div{display:flex;gap:8px}' +
    '#vc button{flex:1;height:40px;border-radius:0;cursor:pointer;font:700 14px "Albert Sans",system-ui,sans-serif;border:1px solid #C5D8E6;background:transparent;color:#C5D8E6}' +
    '#vc button[data-y]{background:#C5D8E6;color:#2C0E18}' +
    '#vc button:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
    '@media(min-width:640px){#vc{left:24px;bottom:24px}}';

  function close() { var b = document.getElementById('vc'); if (b) b.remove(); }

  function open() {
    if (document.getElementById('vc')) return;
    if (!document.getElementById('vc-css')) {
      var s = document.createElement('style'); s.id = 'vc-css'; s.textContent = css; document.head.appendChild(s);
    }
    var b = document.createElement('div');
    b.id = 'vc'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Cookies');
    b.innerHTML = '<p>' + T.text + ' <a href="' + T.url + '">' + T.more + '</a></p><div><button type="button" data-n>' + T.no + '</button><button type="button" data-y>' + T.yes + '</button></div>';
    b.querySelector('[data-y]').onclick = function () { set('granted'); close(); loadClarity(); };
    b.querySelector('[data-n]').onclick = function () { var was = get() === 'granted'; set('denied'); close(); if (was) { revoke(); location.reload(); } };
    document.body.appendChild(b);
  }

  window.velonifyConsent = { open: open };
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (t) { e.preventDefault(); open(); }
  });

  var v = get();
  if (v === 'granted') loadClarity();
  else if (v !== 'denied') {
    if (document.body) open(); else document.addEventListener('DOMContentLoaded', open);
  }
})();
