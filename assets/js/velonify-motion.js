/*!
 * Velonify Motion 1.5: site-wide GSAP layer (ScrollTrigger, SplitText, ScrambleText, Draggable, Inertia) + Lenis smooth scroll.
 * Works off the classes the pages already use (.reveal, .line, .svc, .case-card, .vrow, .bar, .drift, .btn, .navlink …)
 * plus opt-in tokens in data-vm (several allowed, space separated):
 *   highlight  words light up while scrolling      scramble   text decodes after the hero intro
 *   chars      headline flips in letter by letter   decode     headline decodes like a terminal on enter
 *   repel      letters dodge the cursor             count      numbers count up on enter
 * Content stays visible if anything fails: from-states are only applied once GSAP is running,
 * and prefers-reduced-motion leaves the page to its CSS.
 */
(function () {
  if (window.__velonifyMotion) return;
  window.__velonifyMotion = true;
  var doc = document, html = doc.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (reduce || !window.gsap) return;

  // 1) Hand the CSS keyframe intros over to GSAP and hold the hero until the timeline starts
  var css = doc.createElement('style');
  css.setAttribute('data-velonify-motion', '');
  css.textContent =
    'html.gsap-on .reveal, html.gsap-on .line > span, html.gsap-on .hero-fade, html.gsap-on .hero-fade-2,' +
    'html.gsap-on .bar, html.gsap-on .drift, html.gsap-on .ticker-track, html.gsap-on .mark-a, html.gsap-on .mark-b,' +
    'html.gsap-on .menu-panel, html.gsap-on .menu-link { animation: none !important; }' +
    'html.vm-pre .line > span, html.vm-pre .hero-fade, html.vm-pre .hero-fade-2, html.vm-pre .mark-a, html.vm-pre .mark-b,' +
    'html.vm-pre canvas.flock, html.vm-pre header { visibility: hidden; }' +
    '.vm-txt { display: inline-block; }' +
    '.vm-progress { position: fixed; left: 0; top: 0; width: 100%; height: 3px; background: #C5D8E6; transform-origin: 0 50%; z-index: 9998; pointer-events: none; }' +
    'html.vm-dragging, html.vm-dragging * { user-select: none; }' +
    // Lenis base styles (from lenis.css) and no native smooth scrolling underneath it
    'html.lenis, html.lenis body { height: auto; } html.lenis { scroll-behavior: auto !important; }' +
    '.lenis:not(.lenis-autoToggle).lenis-stopped { overflow: clip; }' +
    '.lenis [data-lenis-prevent], .lenis [data-lenis-prevent-wheel], .lenis [data-lenis-prevent-touch] { overscroll-behavior: contain; }' +
    '.lenis.lenis-smooth iframe { pointer-events: none; }';
  (doc.head || html).appendChild(css);
  html.classList.add('gsap-on', 'vm-pre');
  var failsafe = setTimeout(function () { html.classList.remove('gsap-on', 'vm-pre'); }, 6000);

  var gsap = window.gsap;
  var plugins = [];
  if (window.ScrollTrigger) plugins.push(window.ScrollTrigger);
  if (window.SplitText) plugins.push(window.SplitText);
  if (window.ScrambleTextPlugin) plugins.push(window.ScrambleTextPlugin);
  if (window.Draggable) plugins.push(window.Draggable);
  if (window.InertiaPlugin) plugins.push(window.InertiaPlugin);
  gsap.registerPlugin.apply(gsap, plugins);
  var ST = window.ScrollTrigger, Split = window.SplitText;
  var canHover = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }
  function safe(name, fn) { try { fn(); } catch (e) { if (window.console) console.warn('[velonify-motion] ' + name, e); } }
  function split(el, vars) { return Split ? Split.create(el, vars) : null; }
  function vm(el, token) { return (' ' + (el.getAttribute('data-vm') || '') + ' ').indexOf(' ' + token + ' ') > -1; }

  // Letters that dodge the cursor: split once, keep split, push chars away from the pointer
  function initRepel(el) {
    if (!canHover) return initTapBounce(el);
    if (el.__vmRepel || !Split) return;
    el.__vmRepel = true;
    var s = split(el, { type: 'words,chars' });
    if (!s || !s.chars.length) return;
    var zone = el.closest('section') || el, R = 170, rects = null, stamp = 0;
    var qs = s.chars.map(function (c) {
      gsap.set(c, { transformOrigin: '50% 100%' });
      return { el: c, y: gsap.quickTo(c, 'y', { duration: 0.45, ease: 'power3.out' }), r: gsap.quickTo(c, 'rotation', { duration: 0.45, ease: 'power3.out' }), sx: gsap.quickTo(c, 'scaleX', { duration: 0.45, ease: 'power3.out' }), sy: gsap.quickTo(c, 'scaleY', { duration: 0.45, ease: 'power3.out' }) };
    });
    function measure() { rects = qs.map(function (q) { var b = q.el.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }); stamp = Date.now(); }
    zone.addEventListener('pointerenter', measure);
    window.addEventListener('scroll', function () { rects = null; }, { passive: true });
    zone.addEventListener('pointermove', function (e) {
      if (!rects || Date.now() - stamp > 400) measure();
      for (var i = 0; i < qs.length; i++) {
        var dx = rects[i][0] - e.clientX, dy = rects[i][1] - e.clientY, d = Math.sqrt(dx * dx + dy * dy);
        var f = d < R ? Math.pow(1 - d / R, 2) : 0;
        qs[i].y(-f * 34); qs[i].r((dx < 0 ? -1 : 1) * f * 14); qs[i].sx(1 + f * 0.18); qs[i].sy(1 + f * 0.18);
      }
    });
    zone.addEventListener('pointerleave', function () {
      gsap.to(s.chars, { y: 0, rotation: 0, scaleX: 1, scaleY: 1, duration: 1.1, ease: 'elastic.out(1, 0.35)', stagger: 0.01, overwrite: true });
    });
  }

  // Touch stand-in for the repel effect: tap the headline and the letters jump in a wave
  function initTapBounce(el) {
    if (el.__vmTap || !Split) return;
    el.__vmTap = true;
    el.addEventListener('click', function () {
      if (el.__vmBusy) return; el.__vmBusy = true;
      var s = split(el, { type: 'words,chars' });
      gsap.to(s.chars, { keyframes: { y: [0, -18, 0], rotation: [0, -8, 0], ease: 'sine.inOut' }, duration: 0.6, stagger: 0.025,
        onComplete: function () { s.revert(); el.__vmBusy = false; } });
    });
  }

  // Text roll: letters slide out the top and come back in from below
  function textTarget(el) {
    var d = getComputedStyle(el).display;
    if (d.indexOf('flex') === -1 && d.indexOf('grid') === -1) return el;
    if (el.__vmTxt) return el.__vmTxt;
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3 && n.nodeValue.trim()) {
        var w = doc.createElement('span'); w.className = 'vm-txt';
        el.insertBefore(w, n); w.appendChild(n); el.__vmTxt = w; return w;
      }
      if (n.nodeType === 1 && n.tagName !== 'svg' && n.textContent.trim()) return n;
    }
    return null;
  }
  function roll(el) {
    var t = textTarget(el);
    if (!t || t.__vmRolling || !Split) return;
    t.__vmRolling = true;
    var s = split(t, { type: 'chars', mask: 'chars' });
    gsap.to(s.chars, { keyframes: [{ yPercent: -110, duration: 0.2, ease: 'power2.in' }, { yPercent: 110, duration: 0 }, { yPercent: 0, duration: 0.38, ease: 'power3.out' }],
      stagger: 0.014, onComplete: function () { s.revert(); t.__vmRolling = false; } });
  }

  // Wait until the runtime has rendered the artboard and the DOM has settled, then fonts
  function whenReady(fn) {
    var started = Date.now(), quietTimer = 0, done = false;
    function go() {
      if (done) return; done = true; if (mo) mo.disconnect();
      var fonts = doc.fonts && doc.fonts.ready ? doc.fonts.ready : Promise.resolve();
      Promise.race([fonts, new Promise(function (r) { setTimeout(r, 1500); })]).then(function () { requestAnimationFrame(fn); });
    }
    function settle() { clearTimeout(quietTimer); quietTimer = setTimeout(function () { if (doc.querySelector('section')) go(); }, 180); }
    var mo = window.MutationObserver ? new MutationObserver(function () { settle(); if (Date.now() - started > 4000 && doc.querySelector('section')) go(); }) : null;
    function begin() { if (mo) mo.observe(doc.body || html, { childList: true, subtree: true }); settle(); }
    if (doc.body) begin(); else doc.addEventListener('DOMContentLoaded', begin);
  }

  whenReady(function () {
    clearTimeout(failsafe);
    var handled = new WeakSet();

    // ---------- LENIS: smooth, weighted scrolling driven by the GSAP ticker ----------
    safe('lenis', function () {
      if (!window.Lenis) return;
      var lenis = new window.Lenis({
        lerp: 0.085, wheelMultiplier: 1, smoothWheel: true, syncTouch: false,
        anchors: { offset: 0, duration: 1.4 },
        prevent: function (node) { return !!(node && node.closest && node.closest('.car, textarea, .dd-menu')); }
      });
      window.velonifyLenis = lenis;
      if (ST) lenis.on('scroll', ST.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    });
    function claim(el) { if (!el || handled.has(el)) return false; handled.add(el); return true; }

    // ---------- HERO INTRO ----------
    safe('hero', function () {
      var hero = doc.querySelector('section#top') || doc.querySelector('section');
      var header = doc.querySelector('header');
      var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      if (header) {
        gsap.set(header, { autoAlpha: 1 });
        var navBits = $$(':scope > a, :scope > nav > *, :scope > button', header);
        if (navBits.length) tl.from(navBits, { y: -24, autoAlpha: 0, duration: 0.9, stagger: 0.05 }, 0);
      }

      var flock = hero && hero.querySelector('canvas.flock');
      if (flock) { claim(flock); tl.fromTo(flock, { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, 0); }

      var marks = hero ? $$('.mark-a, .mark-b', hero) : [];
      marks.forEach(function (m, i) {
        claim(m);
        tl.fromTo(m, { autoAlpha: 0, x: i % 2 ? 160 : -160, rotate: i % 2 ? 8 : -8 }, { autoAlpha: 1, x: 0, rotate: 0, duration: 1.6 }, 0.15);
      });

      var h1 = hero && hero.querySelector('h1');
      if (h1) {
        claim(h1);
        var lines = $$('.line > span', h1);
        var targets = lines.length ? lines : [h1];
        targets.forEach(function (t) { gsap.set(t, { autoAlpha: 1 }); });
        var splits = targets.map(function (t) { return split(t, lines.length ? { type: 'words,chars' } : { type: 'words,chars', mask: 'lines' }); });
        var chars = [];
        splits.forEach(function (s) { if (s) chars = chars.concat(s.chars); });
        if (chars.length) {
          tl.from(chars, { yPercent: 120, rotate: 10, transformOrigin: '0% 100%', duration: 1.2, stagger: 0.022 }, 0.2);
          tl.add(function () {
            splits.forEach(function (s) { if (s) s.revert(); });
            var scr = $$('[data-vm~="scramble"]', h1);
            var after = function () { if (vm(h1, 'repel')) initRepel(h1); };
            if (!scr.length || !window.ScrambleTextPlugin) { after(); return; }
            scr.forEach(function (el, i) {
              var txt = el.textContent;
              gsap.to(el, { duration: 1.1, scrambleText: { text: txt, chars: 'VELONIFY/0123456789', speed: 0.5, revealDelay: 0.25 }, onComplete: i === scr.length - 1 ? after : null });
            });
          });
        } else {
          tl.from(targets, { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.2);
        }
      }

      $$('.hero-fade, .hero-fade-2', hero || doc).forEach(function (el, i) {
        claim(el);
        gsap.set(el, { autoAlpha: 1 });
        if (el.tagName === 'P') {
          var s = split(el, { type: 'lines', mask: 'lines' });
          if (s) { tl.from(s.lines, { yPercent: 105, duration: 1, stagger: 0.07, onComplete: function () { s.revert(); } }, 0.55); return; }
        }
        var kids = el.querySelector('img') ? $$('img', el) : Array.prototype.slice.call(el.children);
        tl.from(kids.length ? kids : el, { y: 36, autoAlpha: 0, scale: 0.96, duration: 1, stagger: 0.09 }, 0.75 + i * 0.08);
      });

      // Hero content lifts away and the flock sinks back as you scroll out
      if (ST && hero) {
        var content = null;
        for (var ci = 0; ci < hero.children.length; ci++) { if (h1 && hero.children[ci].contains(h1)) content = hero.children[ci]; }
        if (content) gsap.to(content, { yPercent: -18, autoAlpha: 0.25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
        if (flock) gsap.to(flock, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
      }
    });

    // whatever happened above, nothing stays held back
    html.classList.remove('vm-pre');

    // ---------- HEADER: hide on scroll down, return on scroll up ----------
    safe('header', function () {
      var header = doc.querySelector('header');
      if (!ST || !header || getComputedStyle(header).position !== 'sticky') return;
      var shown = true;
      ST.create({ start: 240, end: 'max', onUpdate: function (self) {
        var want = self.direction < 0;
        if (want !== shown) { shown = want; gsap.to(header, { yPercent: want ? 0 : -100, duration: 0.45, ease: 'power3.out', overwrite: true }); }
      }, onLeaveBack: function () { shown = true; gsap.to(header, { yPercent: 0, duration: 0.3, overwrite: true }); } });
    });

    // ---------- TICKER: endless loop that reacts to scroll speed and direction ----------
    safe('ticker', function () {
      $$('.ticker-track').forEach(function (track) {
        claim(track);
        var loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 38, repeat: -1 });
        loop.totalTime(38 * 400);
        var dir = 1, hover = 1;
        if (ST) ST.create({ onUpdate: function (self) {
          dir = self.direction || dir;
          var boost = Math.min(7, 1 + Math.abs(self.getVelocity()) / 260);
          gsap.to(loop, { timeScale: dir * boost * hover, duration: 0.18, ease: 'power1.out', overwrite: true,
            onComplete: function () { gsap.to(loop, { timeScale: dir * hover, duration: 1.2, ease: 'power2.out', overwrite: true }); } });
        } });
        var box = track.closest('.ticker') || track;
        if (canHover) {
          box.addEventListener('mouseenter', function () { hover = 0.2; gsap.to(loop, { timeScale: dir * hover, duration: 0.6 }); });
          box.addEventListener('mouseleave', function () { hover = 1; gsap.to(loop, { timeScale: dir, duration: 0.6 }); });
        }
      });
    });

    if (!ST) return;

    // ---------- WORD HIGHLIGHT: statement text lights up word by word while scrolling ----------
    safe('highlight', function () {
      $$('[data-vm~="highlight"]').forEach(function (el) {
        claim(el);
        var s = split(el, { type: 'words' });
        if (!s) return;
        gsap.fromTo(s.words, { opacity: 0.12, y: 10 }, { opacity: 1, y: 0, ease: 'none', stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: 0.8 } });
      });
    });

    function ScrollTriggerOnce(el, fn) { ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: fn }); }

    // ---------- HEADLINES: lines rise out of a mask (or data-vm chars / decode variants) ----------
    safe('headlines', function () {
      $$('section h2').forEach(function (h) {
        if (!claim(h)) return;
        var st = { trigger: h, start: 'top 88%', once: true };
        var done = function () { if (vm(h, 'repel')) initRepel(h); };
        if (vm(h, 'decode') && window.ScrambleTextPlugin) {
          var txt = h.textContent;
          gsap.set(h, { autoAlpha: 0 });
          ScrollTriggerOnce(h, function () {
            gsap.set(h, { autoAlpha: 1 });
            gsap.fromTo(h, { scrambleText: { text: ' ' } }, { duration: 1.6, ease: 'none', scrambleText: { text: txt, chars: 'upperCase', speed: 0.7, revealDelay: 0.2 }, onComplete: done });
          });
          return;
        }
        if (vm(h, 'chars')) {
          var c = split(h, { type: 'words,chars' });
          if (!c) return;
          gsap.from(c.chars, { rotationX: -95, yPercent: 60, autoAlpha: 0, transformOrigin: '50% 100% -30', transformPerspective: 600,
            duration: 1, ease: 'back.out(1.6)', stagger: { each: 0.035, from: 'start' }, scrollTrigger: st,
            onComplete: function () { c.revert(); done(); } });
          return;
        }
        var s = split(h, { type: 'lines', mask: 'lines', linesClass: 'vm-line' });
        if (!s) return;
        gsap.from(s.lines, { yPercent: 110, rotate: 2, transformOrigin: '0% 0%', duration: 1.15, ease: 'expo.out', stagger: 0.11,
          scrollTrigger: st, onComplete: function () { s.revert(); done(); } });
      });
    });

    // ---------- SERVICE ROWS: wipe in from the right, arrow swings round ----------
    safe('services', function () {
      var rows = $$('.svc');
      if (!rows.length) return;
      rows.forEach(claim);
      gsap.set(rows, { clipPath: 'inset(0% 0% 0% 100%)' });
      ST.batch(rows, { start: 'top 90%', once: true, onEnter: function (batch) {
        gsap.to(batch, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut', stagger: 0.1, clearProps: 'clipPath' });
        var arrows = []; batch.forEach(function (r) { var a = r.querySelector('.svc-arrow'); if (a) arrows.push(a); });
        if (arrows.length) gsap.from(arrows, { rotate: -135, scale: 0.4, autoAlpha: 0, duration: 1, ease: 'back.out(2)', stagger: 0.1, delay: 0.35, clearProps: 'transform,opacity,visibility' });
      } });
    });

    // ---------- CASE CARDS: fan in, numbers count up ----------
    safe('cases', function () {
      var cards = $$('.case-card');
      if (!cards.length) return;
      cards.forEach(claim);
      gsap.set(cards, { x: 220, rotate: 4, autoAlpha: 0, transformOrigin: '0% 100%' });
      ST.batch(cards, { start: 'top 88%', once: true, onEnter: function (batch) {
        gsap.to(batch, { x: 0, rotate: 0, autoAlpha: 1, duration: 1.3, ease: 'expo.out', stagger: 0.14, clearProps: 'transform' });
        batch.forEach(function (card) { $$('.ck', card).forEach(countUp); });
      } });
    });

    function countUp(el) {
      var node = el.firstChild;
      if (!node || node.nodeType !== 3) return;
      var original = node.nodeValue, m = original.match(/^(\D*?)(\d+(?:,\d+)?)(.*)$/);
      if (!m) return;
      var decimals = (m[2].split(',')[1] || '').length, target = parseFloat(m[2].replace(',', '.')), o = { v: 0 };
      gsap.to(o, { v: target, duration: 1.8, ease: 'power3.out', delay: 0.3,
        onUpdate: function () { node.nodeValue = m[1] + o.v.toFixed(decimals).replace('.', ',') + m[3]; },
        onComplete: function () { node.nodeValue = original; } });
    }
    safe('counters', function () {
      $$('[data-vm~="count"]').forEach(function (el) {
        if (!claim(el)) return;
        ST.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { countUp(el); } });
      });
    });

    // ---------- GLOBE + MARKET CHIPS ----------
    safe('globe', function () {
      $$('.globe-wrap').forEach(function (g) {
        claim(g);
        gsap.from(g, { scale: 0.72, rotate: -18, autoAlpha: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: g, start: 'top 85%', once: true } });
        var sec = g.closest('section');
        var chips = sec ? $$('ul > li', sec) : [];
        if (chips.length) gsap.from(chips, { y: 26, autoAlpha: 0, scale: 0.9, duration: 0.8, ease: 'back.out(2)', stagger: 0.08, scrollTrigger: { trigger: chips[0], start: 'top 92%', once: true } });
      });
    });

    // ---------- VALUE ROWS: words slide in from alternating sides ----------
    safe('values', function () {
      $$('.vrow').forEach(function (row, i) {
        claim(row);
        var w = row.querySelector('.vword') || row;
        gsap.from(w, { xPercent: i % 2 ? 18 : -18, autoAlpha: 0, duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true }, clearProps: 'transform,opacity,visibility' });
      });
    });

    // ---------- DECOR: drifting mark, growing bars ----------
    safe('decor', function () {
      $$('.drift').forEach(function (d) {
        claim(d);
        gsap.fromTo(d, { y: -140, rotate: -10 }, { y: 160, rotate: 10, ease: 'none', scrollTrigger: { trigger: d.closest('section') || d, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
      $$('.bar').forEach(function (b) {
        claim(b);
        gsap.from(b, { scaleX: 0, transformOrigin: '0% 50%', duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: b, start: 'top 92%', once: true } });
      });
    });

    // ---------- FORMS: fields stack in ----------
    safe('forms', function () {
      $$('form').forEach(function (f) {
        var parts = Array.prototype.slice.call(f.children);
        if (!parts.length) return;
        gsap.from(parts, { y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08, clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: f, start: 'top 85%', once: true } });
      });
    });

    // ---------- EVERYTHING ELSE MARKED .reveal: fade up in batches ----------
    safe('reveal', function () {
      var els = $$('.reveal').filter(function (el) { return !handled.has(el); });
      els = els.filter(function (el) {
        if (el.tagName !== 'P' || !Split) return true;
        claim(el);
        var s = split(el, { type: 'lines', mask: 'lines' });
        gsap.from(s.lines, { yPercent: 105, duration: 1, ease: 'expo.out', stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onComplete: function () { s.revert(); } });
        return false;
      });
      if (!els.length) return;
      gsap.set(els, { y: 60, autoAlpha: 0 });
      ST.batch(els, { start: 'top 90%', once: true, onEnter: function (batch) {
        gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', stagger: 0.09, clearProps: 'transform' });
      } });
    });

    // ---------- MAGNETIC BUTTONS ----------
    safe('magnetic', function () {
      if (!canHover) return;
      $$('.btn, .car-btn').forEach(function (b) {
        var xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' });
        var yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' });
        b.addEventListener('pointermove', function (e) {
          var r = b.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.28);
          yTo((e.clientY - r.top - r.height / 2) * 0.38);
        });
        b.addEventListener('pointerleave', function () {
          gsap.to(b, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: true });
        });
      });
    });

    // ---------- TEXT ROLL on links and buttons ----------
    safe('roll', function () {
      if (!canHover) return;
      $$('.navlink, .btn').forEach(function (el) { el.addEventListener('mouseenter', function () { roll(el); }); });
      $$('.dd-item').forEach(function (el) { var t = el.querySelector('span'); if (t) el.addEventListener('mouseenter', function () { roll(t); }); });
    });

    // ---------- SERVICE ROWS: title ripples, arrow leans toward the cursor ----------
    safe('svc-hover', function () {
      if (!canHover) return;
      $$('.svc').forEach(function (row) {
        var title = row.querySelector(':scope > span > span');
        var arrow = row.querySelector('.svc-arrow');
        if (title) row.addEventListener('mouseenter', function () {
          if (title.__vmWave || !Split) return; title.__vmWave = true;
          var s = split(title, { type: 'chars' });
          gsap.to(s.chars, { keyframes: { yPercent: [0, -28, 0], ease: 'sine.inOut' }, duration: 0.55, stagger: 0.018,
            onComplete: function () { s.revert(); title.__vmWave = false; } });
        });
        if (arrow) {
          var ax = gsap.quickTo(arrow, 'x', { duration: 0.4, ease: 'power3.out' }), ay = gsap.quickTo(arrow, 'y', { duration: 0.4, ease: 'power3.out' });
          row.addEventListener('pointermove', function (e) {
            var r = arrow.getBoundingClientRect();
            ax(gsap.utils.clamp(-60, 60, (e.clientX - r.left - r.width / 2) * 0.12));
            ay(gsap.utils.clamp(-24, 24, (e.clientY - r.top - r.height / 2) * 0.3));
          });
          row.addEventListener('pointerleave', function () { gsap.to(arrow, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)', overwrite: true }); });
        }
      });
    });

    // ---------- VALUE WORDS: letters wave as the row opens ----------
    safe('vword-hover', function () {
      $$('.vrow').forEach(function (row) {
        var w = row.querySelector('.vword');
        if (!w) return;
        var go = function () {
          if (w.__vmWave || !Split) return; w.__vmWave = true;
          var s = split(w, { type: 'chars' });
          gsap.from(s.chars, { yPercent: 40, rotate: -6, autoAlpha: 0.2, duration: 0.7, ease: 'back.out(2)', stagger: 0.03,
            onComplete: function () { s.revert(); w.__vmWave = false; } });
        };
        row.addEventListener('mouseenter', go); row.addEventListener('focus', go);
      });
    });

    // ---------- CASE CARDS: 3D tilt that follows the cursor ----------
    safe('tilt', function () {
      if (!canHover) return;
      $$('.case-card').forEach(function (card) {
        var rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' }), ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        gsap.set(card, { transformPerspective: 1100 });
        card.addEventListener('pointermove', function (e) {
          var r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 9);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
        });
        card.addEventListener('pointerleave', function () { rx(0); ry(0); });
      });
    });

    // ---------- CASE CAROUSEL: drag with the mouse, throw with inertia, land on a card ----------
    safe('drag', function () {
      if (!canHover || !window.Draggable) return;
      $$('.car').forEach(function (car) {
        var moved = false;
        // land on the nearest card (or the very end), whatever sign Draggable reports the scroll in
        var landing = function (v) {
          var max = car.scrollWidth - car.clientWidth, pad = parseFloat(getComputedStyle(car).scrollPaddingLeft) || 0;
          var stops = $$('.case-card', car).map(function (c) { return Math.min(max, Math.max(0, c.offsetLeft - car.offsetLeft - pad)); });
          stops.push(max);
          var a = Math.abs(v), best = stops[0] || 0;
          stops.forEach(function (p) { if (Math.abs(p - a) < Math.abs(best - a)) best = p; });
          return v < 0 ? -best : best;
        };
        // drag a hidden proxy and mirror it into the native scroll, so the carousel stays a real scroller
        var proxy = doc.createElement('div');
        var sync = function () { car.scrollLeft = -gsap.getProperty(proxy, 'x'); };
        window.Draggable.create(proxy, {
          trigger: car, type: 'x', inertia: !!window.InertiaPlugin, edgeResistance: 0.8, minimumMovement: 6, dragClickables: true,
          cursor: false, activeCursor: false, allowContextMenu: true, snap: landing,
          onPress: function () {
            moved = false; car.style.scrollSnapType = 'none';
            gsap.killTweensOf(proxy); gsap.set(proxy, { x: -car.scrollLeft });
            this.applyBounds({ minX: -(car.scrollWidth - car.clientWidth), maxX: 0 }); this.update();
          },
          onDragStart: function () { moved = true; html.classList.add('vm-dragging'); },
          onDrag: sync, onThrowUpdate: sync,
          onRelease: function () { html.classList.remove('vm-dragging'); if (!this.isThrowing) car.style.scrollSnapType = ''; },
          onThrowComplete: function () { car.style.scrollSnapType = ''; }
        });
        car.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
      });
    });

    // ---------- CHIPS: springy press ----------
    safe('chips', function () {
      doc.addEventListener('click', function (e) {
        var c = e.target && e.target.closest && e.target.closest('.chip');
        if (c) gsap.fromTo(c, { scale: 0.86 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: true });
      });
    });

    // ---------- SCROLL VELOCITY: headlines lean, the ticker skews ----------
    safe('skew', function () {
      var heads = $$('section h2').filter(function (h) { return !vm(h, 'repel'); });
      var ticks = $$('.ticker-track');
      if (!heads.length && !ticks.length) return;
      var proxy = { k: 0 }, clamp = gsap.utils.clamp(-7, 7);
      var hs = heads.length ? gsap.quickSetter(heads, 'skewY', 'deg') : null, ts = ticks.length ? gsap.quickSetter(ticks, 'skewX', 'deg') : null;
      ST.create({ onUpdate: function (self) {
        var k = clamp(self.getVelocity() / -320);
        if (Math.abs(k) > Math.abs(proxy.k)) {
          proxy.k = k;
          gsap.to(proxy, { k: 0, duration: 0.8, ease: 'power3', overwrite: true, onUpdate: function () { if (hs) hs(proxy.k * 0.5); if (ts) ts(proxy.k * 2); } });
        }
      } });
    });

    // ---------- SCROLL PROGRESS BAR ----------
    safe('progress', function () {
      var bar = doc.createElement('div');
      bar.setAttribute('aria-hidden', 'true');
      bar.className = 'vm-progress';
      doc.body.appendChild(bar);
      gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
    });

    // ---------- MOBILE MENU: panel wipes down, links rise in one after another ----------
    safe('menu', function () {
      var seen = new WeakSet();
      function animate(panel) {
        if (seen.has(panel)) return; seen.add(panel);
        var links = $$('.menu-link', panel), rest = $$(':scope > div, :scope > .btn', panel);
        gsap.timeline({ defaults: { ease: 'expo.out' } })
          .fromTo(panel, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, clearProps: 'clipPath' })
          .from(links, { yPercent: 80, autoAlpha: 0, duration: 0.8, stagger: 0.035 }, 0.15)
          .from(rest, { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, 0.35);
        if (window.velonifyLenis) window.velonifyLenis.stop();
      }
      // the menu counts as open while its panel is in the DOM and not [hidden] (canvas mounts it, the static site toggles hidden)
      var wasOpen = false;
      function check() {
        var panel = doc.querySelector('.menu-panel');
        var open = !!(panel && !panel.hasAttribute('hidden'));
        if (open && !wasOpen) { seen = new WeakSet(); animate(panel); }
        if (!open && wasOpen && window.velonifyLenis) window.velonifyLenis.start();
        wasOpen = open;
      }
      check();
      if (!window.MutationObserver) return;
      new MutationObserver(check).observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
    });

    if (!canHover) {
      // ---------- TOUCH: pressed state that springs back ----------
      safe('press', function () {
        var sel = '.btn, .svc, .case-card, .car-btn, .menu-link, .burger';
        doc.addEventListener('pointerdown', function (e) {
          var t = e.target && e.target.closest && e.target.closest(sel);
          if (t) gsap.to(t, { scale: 0.965, duration: 0.12, ease: 'power2.out', overwrite: 'auto' });
        }, { passive: true });
        var up = function (e) {
          var t = e.target && e.target.closest && e.target.closest(sel);
          if (t) gsap.to(t, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
        };
        doc.addEventListener('pointerup', up, { passive: true });
        doc.addEventListener('pointercancel', up, { passive: true });
      });

      // ---------- TOUCH: the card in front is full size, the ones beside it step back ----------
      safe('car-focus', function () {
        $$('.car').forEach(function (car) {
          var cards = $$('.case-card', car);
          if (!cards.length) return;
          var ticking = false;
          function update() {
            ticking = false;
            var pad = parseFloat(getComputedStyle(car).scrollPaddingLeft) || 0, cr = car.getBoundingClientRect();
            cards.forEach(function (c) {
              var r = c.getBoundingClientRect(), d = Math.abs(r.left - (cr.left + pad)) / (r.width || 1), f = Math.min(1, d);
              c.style.scale = String(1 - f * 0.07); c.style.opacity = String(1 - f * 0.35);
            });
          }
          car.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
          ST.create({ trigger: car, start: 'top bottom', once: true, onEnter: function () { setTimeout(update, 2600); } });
        });
      });

      // ---------- TOUCH: the row in the middle of the screen takes the hover state ----------
      safe('active-rows', function () {
        $$('.vrow').forEach(function (row) {
          var w = row.querySelector('.vword');
          if (!w) return;
          ST.create({ trigger: row, start: 'top 55%', end: 'bottom 55%', onToggle: function (self) {
            gsap.to(w, { color: self.isActive ? '#45142D' : 'rgba(69,20,45,0)', duration: 0.5, ease: 'power2.out' });
            if (self.isActive && !w.__vmWave && Split) {
              w.__vmWave = true;
              var sp = split(w, { type: 'chars' });
              gsap.from(sp.chars, { yPercent: 35, duration: 0.6, ease: 'back.out(2)', stagger: 0.03, onComplete: function () { sp.revert(); w.__vmWave = false; } });
            }
          } });
        });
        $$('.svc').forEach(function (row) {
          var title = row.querySelector(':scope > span > span'), arrow = row.querySelector('.svc-arrow');
          ST.create({ trigger: row, start: 'top 55%', end: 'bottom 55%', onToggle: function (self) {
            if (arrow) gsap.to(arrow, { x: self.isActive ? 6 : 0, y: self.isActive ? -6 : 0, duration: 0.5, ease: 'power3.out' });
            if (self.isActive && title && !title.__vmWave && Split) {
              title.__vmWave = true;
              var sp = split(title, { type: 'chars' });
              gsap.to(sp.chars, { keyframes: { yPercent: [0, -24, 0], ease: 'sine.inOut' }, duration: 0.5, stagger: 0.016, onComplete: function () { sp.revert(); title.__vmWave = false; } });
            }
          } });
        });
      });
    }

    // Layout can still shift when images and fonts land
    window.addEventListener('load', function () { ST.refresh(); });
    setTimeout(function () { ST.refresh(); }, 1200);
  });
})();
