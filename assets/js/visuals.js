/* Velonify service visuals: start when in view, count numbers up, run live feeds, A/B toggle */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var locale = document.documentElement.lang === 'en' ? 'en-US' : 'de-DE';

  function count(el) {
    var to = parseFloat(el.dataset.to), from = parseFloat(el.dataset.from || 0), dec = +(el.dataset.dec || 0), tok = {};
    var fmt = function (v) { return v.toLocaleString(locale, { minimumFractionDigits: dec, maximumFractionDigits: dec }); };
    el._tok = tok;
    if (reduce) { el.textContent = fmt(to); return; }
    el.textContent = fmt(from);
    setTimeout(function () {
      var t0 = null;
      requestAnimationFrame(function step(ts) {
        if (el._tok !== tok) return;
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / 1500); p = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(from + (to - from) * p);
        if (p < 1) requestAnimationFrame(step);
      });
    }, +(el.dataset.delay || 0));
  }

  // feed: rows come from a <template>, newest on top
  function feed(ul) {
    var items = [].slice.call(ul.querySelector('template').content.children);
    var rows = +(ul.dataset.rows || 4), next = rows % items.length;
    ul.style.setProperty('--rows', rows);
    for (var k = rows - 1; k >= 0; k--) ul.appendChild(items[k % items.length].cloneNode(true));
    return function () {
      var li = items[next].cloneNode(true);
      next = (next + 1) % items.length;
      li.classList.add('vz-new');
      ul.insertBefore(li, ul.querySelector('li'));
      var all = ul.querySelectorAll('li');
      if (all.length > rows) all[all.length - 1].remove();
    };
  }

  function init(vz) {
    var ticks = [].map.call(vz.querySelectorAll('.vz-feed'), function (ul) { return { step: feed(ul), every: +(ul.dataset.every || 1800), last: 0 }; });
    var visible = false, started = false, raf = null;

    // A/B toggle (conversion visual)
    var tabs = vz.querySelectorAll('.vc-tab'), auto = !reduce, abLast = 0;
    function ab(b) {
      vz.classList.toggle('vc-b', b);
      tabs.forEach(function (t, k) { t.classList.toggle('on', (k === 1) === b); t.setAttribute('aria-pressed', (k === 1) === b ? 'true' : 'false'); });
      if (b) vz.querySelectorAll('.nb [data-to]').forEach(count);
    }
    tabs.forEach(function (t, k) { t.addEventListener('click', function () { auto = false; ab(k === 1); }); });

    function loop(ts) {
      ticks.forEach(function (t) { if (!t.last) t.last = ts; if (ts - t.last > t.every) { t.last = ts; t.step(); } });
      if (tabs.length && auto) { if (!abLast) abLast = ts; if (ts - abLast > 5200) { abLast = ts; ab(!vz.classList.contains('vc-b')); } }
      raf = visible ? requestAnimationFrame(loop) : null;
    }

    function show(on) {
      visible = on;
      vz.classList.toggle('vz-idle', !on);
      if (on && !started) {
        started = true;
        vz.classList.add('on');
        vz.querySelectorAll('[data-to]').forEach(function (el) { if (!el.closest('.nb')) count(el); });
        if (tabs.length) ab(false);
      }
      if (on && !reduce && !raf) {
        ticks.forEach(function (t) { t.last = 0; }); abLast = 0;
        raf = requestAnimationFrame(loop);
      }
    }

    if (!('IntersectionObserver' in window)) { show(true); return; }
    new IntersectionObserver(function (e) { show(e[0].isIntersecting); }, { threshold: 0.25 }).observe(vz);
  }

  // case e-mails scroll inside the phone: the scroll distance depends on the visible height
  function mailHeights() {
    document.querySelectorAll('.cs-mail-body').forEach(function (b) { b.style.setProperty('--h', b.clientHeight + 'px'); });
  }

  function ready() {
    document.querySelectorAll('.vz').forEach(init);
    mailHeights();
    window.addEventListener('resize', mailHeights);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
