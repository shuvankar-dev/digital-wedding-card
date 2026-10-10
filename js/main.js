/* =========================================================
   Shubho Bibaho — Prity & Shubhankar (bride-side invitation)
   ========================================================= */
(() => {
  'use strict';

  /* ---------- editable details ---------- */
  const CONFIG = {
    phone: '918101300532',
    // Replace with the exact location (a place name, an address, or
    // "lat,lng") once it is confirmed — the map, the directions button and
    // the calendar entry all read from here.
    mapQuery: 'Odhanpur, Deganga, North 24 Parganas, West Bengal 743423',
    venue: 'Bride\'s residence, Vill. Odhanpur, P.O. Sohai Kumarpur, P.S. Deganga, North 24 Parganas, PIN 743423',
    // Background song "Rote Gachey Khobor" in two moods, cut from the song:
    // 0:10–0:20 plays on the closed card, 0:53–1:15 once it is opened. Each
    // part loops, blending its end into its start over `blend` seconds, so
    // every file is its part plus `blend` seconds of tail.
    music: {
      envelope: 'assets/audio/khobor-envelope.mp3',
      main: 'assets/audio/khobor-main.mp3',
      blend: 1.2,
      volume: 0.85,
    },
    // Optional short looping clip (for example an AI-animated version of the
    // opening painting) played over the painting. Leave empty for none.
    heroVideo: '',
    weddingStart: '2026-12-12T00:00:00+05:30',
    events: {
      wedding: {
        title: 'Shubho Bibaho · Prity & Shubhankar',
        dates: '20261212/20261213',
        details: 'শুভবিবাহ — ২৫শে অগ্রহায়ণ, ১৪৩৩ (ইং ১২ই ডিসেম্বর, ২০২৬) শনিবার। পাত্রীর বাসভবন, ওধানপুর, দেগঙ্গা।',
      },
    },
  };

  // the পরিচিতি cards show the bride and groom with their parents
  const FAMILY = {
    bride: {
      bn: [
        ['পিতা', 'শ্রী তিলক কুমার পাল'],
        ['মাতা', 'শ্রীমতী কাকলী পাল'],
      ],
      en: [
        ['Father', 'Mr. Tilak Kumar Pal'],
        ['Mother', 'Mrs. Kakali Pal'],
      ],
    },
    groom: {
      bn: [
        ['পিতা', 'শ্রী সুশান্ত দাস'],
        ['মাতা', 'শ্রীমতী কল্পনা দাস'],
      ],
      en: [
        ['Father', 'Mr. Sushanta Das'],
        ['Mother', 'Mrs. Kalpana Das'],
      ],
    },
  };

  const TEXT = {
    wa: {
      bn: 'নমস্কার! প্রীতি ও শুভঙ্করের শুভবিবাহের নিমন্ত্রণপত্র পেয়েছি। নবদম্পতির জন্য রইল আন্তরিক শুভেচ্ছা ও আশীর্বাদ।',
      en: 'Namaskar! We received the wedding invitation of Prity & Shubhankar. Warm wishes and blessings to the couple!',
    },
    share: {
      bn: 'প্রীতি ও শুভঙ্করের শুভবিবাহের নিমন্ত্রণপত্র — ১২ই ডিসেম্বর, ২০২৬, দেগঙ্গা',
      en: 'Wedding invitation · Prity & Shubhankar · 12 December 2026 · Deganga',
    },
    copied: { bn: 'লিংক কপি হয়েছে', en: 'Link copied' },
    guest: { bn: 'শ্রদ্ধেয় / প্রিয়', en: 'Dear' },
  };

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const SVGNS = 'http://www.w3.org/2000/svg';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
  const toBn = (s) => String(s).replace(/\d/g, (d) => BN_DIGITS[d]);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
  };
  const el = (name, attrs = {}, parent) => {
    const n = document.createElementNS(SVGNS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  let lang = 'bn';

  /* =========================================================
     Language
     ========================================================= */
  function setLang(next) {
    lang = next === 'en' ? 'en' : 'bn';
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.classList.toggle('lang-bn', lang === 'bn');
    document.documentElement.lang = lang;
    store.set('wc-lang', lang);
    updateLinks();
    tickCountdown();
  }

  /* =========================================================
     Family lists
     ========================================================= */
  function renderFamily() {
    $$('.pc-list').forEach((dl) => {
      const data = FAMILY[dl.dataset.list];
      ['bn', 'en'].forEach((l) => {
        data[l].forEach(([k, v]) => {
          const dt = document.createElement('dt');
          const dd = document.createElement('dd');
          dt.className = l;
          dd.className = l;
          dt.textContent = k;
          dd.textContent = v;
          dl.append(dt, dd);
        });
      });
    });
  }

  /* =========================================================
     Links: map, directions, WhatsApp, calendar
     ========================================================= */
  function updateLinks() {
    const q = encodeURIComponent(CONFIG.mapQuery);
    const frame = $('#mapFrame');
    const src = `https://maps.google.com/maps?q=${q}&z=14&output=embed`;
    if (frame.getAttribute('src') !== src) frame.setAttribute('src', src);
    $('#dirBtn').href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

    const wa = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(TEXT.wa[lang])}`;
    $('#waBtn').href = wa;
    $('#waDock').href = wa;

    $$('[data-cal]').forEach((a) => {
      const ev = CONFIG.events[a.dataset.cal];
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: ev.title,
        dates: ev.dates,
        details: ev.details,
        location: CONFIG.venue,
      });
      a.href = `https://calendar.google.com/calendar/render?${params.toString()}`;
    });
  }

  /* =========================================================
     Countdown
     ========================================================= */
  const target = new Date(CONFIG.weddingStart).getTime();
  const cdEls = {};
  function tickCountdown() {
    if (!cdEls.d) $$('[data-cd]').forEach((b) => { cdEls[b.dataset.cd] = b; });
    let diff = Math.max(0, target - Date.now());
    if (diff <= 0) {
      $('#countdown').hidden = true;
      $('#cdDone').hidden = false;
      return;
    }
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    const fmt = (n) => {
      const t = String(n).padStart(2, '0');
      return lang === 'bn' ? toBn(t) : t;
    };
    cdEls.d.textContent = fmt(d);
    cdEls.h.textContent = fmt(h);
    cdEls.m.textContent = fmt(m);
    cdEls.s.textContent = fmt(s);
  }

  /* =========================================================
     Mandala (line-art, like a printed card)
     ========================================================= */
  function ring(g, count, offset, d, attrs = {}) {
    for (let i = 0; i < count; i++) {
      el('path', { d, transform: `rotate(${(i * 360) / count + offset})`, ...attrs }, g);
    }
  }
  function dots(g, count, r, size, color) {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      el('circle', { cx: (Math.sin(a) * r).toFixed(2), cy: (-Math.cos(a) * r).toFixed(2), r: size, fill: color, stroke: 'none' }, g);
    }
  }
  function buildMandala(svg) {
    const color = svg.dataset.color || '#255543';
    const simple = svg.dataset.simple === '1';
    const g = el('g', { fill: 'none', stroke: color, 'stroke-width': 0.9, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
    el('circle', { r: 5, fill: color, stroke: 'none' }, g);
    ring(g, 8, 0, 'M0 -6 C5 -10 5 -15 0 -19 C-5 -15 -5 -10 0 -6 Z');
    el('circle', { r: 21 }, g);
    el('circle', { r: 24 }, g);
    ring(g, 16, 0, 'M0 -24 C6 -28 7 -34 0 -41 C-7 -34 -6 -28 0 -24 Z');
    ring(g, 16, 0, 'M0 -28 V-37', { 'stroke-width': 0.6 });
    dots(g, 36, 44.5, 1.3, color);
    el('circle', { r: 48 }, g);
    ring(g, 12, 0, 'M0 -48 C14 -54 16 -68 0 -80 C-16 -68 -14 -54 0 -48 Z');
    ring(g, 12, 0, 'M0 -53 C8 -58 9 -66 0 -73 C-9 -66 -8 -58 0 -53 Z', { 'stroke-width': 0.7 });
    ring(g, 12, 15, 'M0 -52 C3.5 -56 3.5 -61 0 -65 C-3.5 -61 -3.5 -56 0 -52 Z');
    const dg = el('g', { fill: color, stroke: 'none' }, g);
    ring(dg, 12, 0, 'M0 -60 a1.8 1.8 0 1 0 .1 0 Z');
    el('circle', { r: 82 }, g);
    ring(g, 24, 0, 'M-10.7 -81.3 Q0 -97 10.7 -81.3');
    dots(g, 24, 87, 1.2, color);
    if (!simple) {
      el('circle', { r: 95, 'stroke-width': 0.6 }, g);
      el('circle', { r: 98 }, g);
      ring(g, 32, 0, 'M0 -98 C3.4 -102 3.4 -107 0 -113 C-3.4 -107 -3.4 -102 0 -98 Z');
      dots(g, 48, 117, 1, color);
      ring(g, 16, 11.25, 'M0 -120 c4 -2 7 -6 4 -9.5 c-3 -2.4 -6.4 .8 -4.4 3.4');
      el('circle', { r: 127, 'stroke-width': 0.6, 'stroke-dasharray': '2 3' }, g);
    }
  }

  /* =========================================================
     Garlands (marigold strings, mango leaves, bells, lights)
     ========================================================= */
  const ORANGE = ['#e46f17', '#ffa23a', '#a8470b'];
  const YELLOW = ['#f0ac12', '#ffd34a', '#b97c06'];
  function marigold(parent, x, y, r, tone) {
    const g = el('g', {}, parent);
    el('circle', { cx: x, cy: y, r, fill: tone[0] }, g);
    el('circle', { cx: x, cy: y, r: r * 0.68, fill: 'none', stroke: tone[1], 'stroke-width': r * 0.5, 'stroke-dasharray': `${(r * 0.3).toFixed(2)} ${(r * 0.2).toFixed(2)}` }, g);
    el('circle', { cx: x, cy: y, r: r * 0.24, fill: tone[2] }, g);
    return g;
  }
  function jasmine(parent, x, y, r) {
    const g = el('g', {}, parent);
    el('circle', { cx: x, cy: y, r, fill: 'url(#gJasmine)', stroke: '#bcd9cf', 'stroke-width': 0.5 }, g);
    el('circle', { cx: x, cy: y, r: r * 0.62, fill: 'none', stroke: '#d7ebe4', 'stroke-width': r * 0.25, 'stroke-dasharray': `${r * 0.3} ${r * 0.35}` }, g);
    el('circle', { cx: x, cy: y, r: r * 0.22, fill: '#e9d27d' }, g);
    return g;
  }
  function rose(parent, x, y, r) {
    const g = el('g', {}, parent);
    el('circle', { cx: x, cy: y, r, fill: 'url(#gRose)' }, g);
    el('path', { d: `M${x - r * 0.4} ${y} a${r * 0.45} ${r * 0.45} 0 1 1 ${r * 0.45} ${r * 0.45}`, fill: 'none', stroke: '#b4505f', 'stroke-width': 0.6 }, g);
    return g;
  }
  function bell(parent, x, y, s = 1) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, parent);
    el('path', { d: 'M0 0 V4', stroke: '#9a7b3d', 'stroke-width': 1 }, g);
    el('path', { d: 'M-6 14 C-6 6 -3 4 0 4 C3 4 6 6 6 14 Z', fill: 'url(#gGold)', stroke: '#8a6a32', 'stroke-width': 0.6 }, g);
    el('circle', { cx: 0, cy: 15.5, r: 1.8, fill: '#8a6a32' }, g);
    return g;
  }
  function leaf(parent, x, y, angle, len, color) {
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${angle})` }, parent);
    el('path', { d: `M0 0 C${-len * 0.28} ${len * 0.3} ${-len * 0.18} ${len * 0.75} 0 ${len} C${len * 0.18} ${len * 0.75} ${len * 0.28} ${len * 0.3} 0 0 Z`, fill: color }, g);
    el('path', { d: `M0 1 V${len - 2}`, stroke: '#24452f', 'stroke-width': 0.6, opacity: 0.5 }, g);
    return g;
  }
  function strand(parent, x, y0, len, opts = {}) {
    const g = el('g', { class: 'strand' }, parent);
    g.style.animationDuration = `${rand(3.6, 5.6).toFixed(2)}s`;
    g.style.animationDelay = `${(-rand(0, 5)).toFixed(2)}s`;
    const r = opts.r || 4.6;
    el('path', { d: `M${x} ${y0} V${y0 + len}`, stroke: '#5e8d6b', 'stroke-width': 0.6 }, g);
    let i = 0;
    for (let y = y0 + r; y < y0 + len; y += r * 1.5, i++) {
      if (i % 9 === 8) jasmine(g, x, y, r * 0.85);
      else marigold(g, x, y, r, Math.floor(i / 4) % 2 ? YELLOW : ORANGE);
    }
    leaf(g, x, y0 + len, -28, 11, '#4f8a5e');
    leaf(g, x, y0 + len, 28, 11, '#6fa36f');
    if (opts.bell !== false) bell(g, x, y0 + len + 2, opts.bellScale || 0.9);
    return g;
  }
  function swag(parent, x1, x2, y, dip, r = 4.4) {
    const g = el('g', {}, parent);
    const n = Math.round((x2 - x1) / (r * 1.5));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = x1 + (x2 - x1) * t;
      const yy = y + dip * 4 * t * (1 - t);
      if (i % 6 === 3) rose(g, x, yy, r);
      else marigold(g, x, yy, r, i % 2 ? YELLOW : ORANGE);
    }
    return g;
  }
  function lights(parent, x1, x2, y, dip, count, warm = '#ffe6a3') {
    const g = el('g', {}, parent);
    el('path', { d: `M${x1} ${y} Q${(x1 + x2) / 2} ${y + dip * 2} ${x2} ${y}`, fill: 'none', stroke: '#5e8d6b', 'stroke-width': 0.5, opacity: 0.6 }, g);
    for (let i = 1; i < count; i++) {
      const t = i / count;
      const x = x1 + (x2 - x1) * t;
      const yy = y + dip * 4 * t * (1 - t);
      const b = el('circle', { cx: x, cy: yy + 2, r: 1.7, fill: warm, class: 'bulb' }, g);
      b.style.animationDelay = `${(-rand(0, 2.4)).toFixed(2)}s`;
      b.style.filter = 'drop-shadow(0 0 2px rgba(255,214,120,.95))';
    }
    return g;
  }
  function buildToran() {
    const svg = $('#toran');
    if (!svg) return;
    lights(svg, 0, 400, 20, 50, 26);
    strand(svg, 14, 8, 210, {});
    strand(svg, 34, 8, 160, { r: 4.2 });
    strand(svg, 54, 8, 110, { r: 3.8, bellScale: 0.75 });
    strand(svg, 386, 8, 210, {});
    strand(svg, 366, 8, 160, { r: 4.2 });
    strand(svg, 346, 8, 110, { r: 3.8, bellScale: 0.75 });
    swag(svg, 0, 200, 8, 26, 4.6);
    swag(svg, 200, 400, 8, 26, 4.6);
    bell(svg, 200, 12, 1.1);
    for (let x = 4; x <= 400; x += 13) {
      leaf(svg, x, 0, rand(-10, 10), rand(15, 21), (x / 13) % 2 < 1 ? '#3f7d58' : '#5f9c6a');
    }
    el('rect', { x: 0, y: 0, width: 400, height: 3, fill: '#5e8d6b' }, svg);
  }

  /* =========================================================
     Butterflies (প্রজাপতি) around the couple
     ========================================================= */
  const Butterflies = (() => {
    function fly(host) {
      const list = [];
      let raf = 0;
      let visible = true;
      const count = Number(host.dataset.count) || 4;
      for (let i = 0; i < count; i++) {
        const d = document.createElement('div');
        d.className = 'bfly';
        d.innerHTML = '<svg viewBox="-30 -24 60 48"><use href="#butterfly" x="-30" y="-24" width="60" height="48"/></svg>';
        host.appendChild(d);
        list.push({
          el: d,
          ax: rand(0.25, 0.4), ay: rand(0.12, 0.22),
          fx: rand(0.00011, 0.00018), fy: rand(0.00023, 0.00034),
          px: rand(0, 6.28), py: rand(0, 6.28),
          cx: rand(0.3, 0.7), cy: rand(0.3, 0.7),
          s: rand(0.75, 1.15), lx: 0, ly: 0,
        });
      }
      function loop(t) {
        if (!visible) { raf = 0; return; }
        const W = host.clientWidth;
        const H = host.clientHeight;
        list.forEach((b) => {
          const x = W * (b.cx + b.ax * Math.sin(t * b.fx + b.px));
          const y = H * (b.cy + b.ay * Math.sin(t * b.fy + b.py)) + 8 * Math.sin(t * 0.004 + b.px);
          const ang = Math.atan2(y - b.ly, x - b.lx) * 57.3 + 90;
          b.lx = x; b.ly = y;
          b.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${(ang * 0.25).toFixed(1)}deg) scale(${b.s})`;
        });
        raf = requestAnimationFrame(loop);
      }
      new IntersectionObserver((e) => {
        visible = e[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      }).observe(host);
    }
    function init() {
      if (!reduceMotion) $$('.butterflies').forEach(fly);
    }
    return { init };
  })();

  /* =========================================================
     Falling flowers: rose petals, marigolds, jasmine, gold
     ========================================================= */
  const Petals = (() => {
    const c = $('#petals');
    const ctx = c && c.getContext('2d');
    let W = 0; let H = 0; let dpr = 1;
    let list = []; let running = false; let kinds = []; let total = 0;

    // each flower is drawn once into a small canvas, then stamped every frame
    function sprite(r, draw) {
      const s = document.createElement('canvas');
      s.width = s.height = Math.ceil(r * 2 * dpr);
      const g = s.getContext('2d');
      g.scale(dpr, dpr);
      g.translate(r, r);
      draw(g, r * 0.92);
      return s;
    }
    function petal(g, r, deep, light) {
      const gr = g.createRadialGradient(-r * 0.2, -r * 0.25, r * 0.08, 0, 0, r * 1.1);
      gr.addColorStop(0, light);
      gr.addColorStop(1, deep);
      g.fillStyle = gr;
      g.beginPath();
      g.moveTo(0, r);
      g.bezierCurveTo(-r * 1.05, r * 0.35, -r * 0.8, -r * 0.95, 0, -r * 0.62);
      g.bezierCurveTo(r * 0.8, -r * 0.95, r * 1.05, r * 0.35, 0, r);
      g.fill();
      g.strokeStyle = 'rgba(255,255,255,.35)';
      g.lineWidth = r * 0.07;
      g.beginPath();
      g.moveTo(0, r * 0.82);
      g.quadraticCurveTo(-r * 0.12, 0, 0, -r * 0.42);
      g.stroke();
    }
    function marigold(g, r, outer, inner) {
      [[1, 16, outer], [0.74, 13, inner], [0.5, 9, outer]].forEach(([k, n, col], ring) => {
        g.fillStyle = col;
        for (let i = 0; i < n; i++) {
          g.save();
          g.rotate((i / n) * Math.PI * 2 + ring * 0.35);
          g.beginPath();
          g.ellipse(0, -r * k * 0.62, r * k * 0.26, r * k * 0.42, 0, 0, Math.PI * 2);
          g.fill();
          g.restore();
        }
      });
      g.fillStyle = '#b5520f';
      g.beginPath();
      g.arc(0, 0, r * 0.15, 0, Math.PI * 2);
      g.fill();
    }
    function jasmine(g, r) {
      g.shadowColor = 'rgba(30,60,50,.25)';
      g.shadowBlur = r * 0.3;
      g.fillStyle = '#fffdf6';
      for (let i = 0; i < 5; i++) {
        g.save();
        g.rotate((i / 5) * Math.PI * 2);
        g.beginPath();
        g.ellipse(0, -r * 0.55, r * 0.3, r * 0.5, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
      }
      g.shadowBlur = 0;
      g.fillStyle = '#f3dd8a';
      g.beginPath();
      g.arc(0, 0, r * 0.15, 0, Math.PI * 2);
      g.fill();
    }
    function star(g, r) {
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, r);
      gr.addColorStop(0, 'rgba(255,248,220,1)');
      gr.addColorStop(0.35, 'rgba(255,224,140,.9)');
      gr.addColorStop(1, 'rgba(255,214,120,0)');
      g.fillStyle = gr;
      g.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const rr = i % 2 ? r * 0.2 : r;
        g.lineTo(Math.sin(a) * rr, -Math.cos(a) * rr);
      }
      g.closePath();
      g.fill();
    }
    function build() {
      kinds = [
        { type: 'petal', size: 11, weight: 6, img: sprite(11, (g, r) => petal(g, r, '#c2183f', '#ff8aa3')) },
        { type: 'petal', size: 11, weight: 5, img: sprite(11, (g, r) => petal(g, r, '#e23d5c', '#ffb8c6')) },
        { type: 'petal', size: 10, weight: 4, img: sprite(10, (g, r) => petal(g, r, '#f07fa4', '#ffe0ea')) },
        { type: 'petal', size: 9, weight: 4, img: sprite(9, (g, r) => petal(g, r, '#ea7a12', '#ffc670')) },
        { type: 'flower', size: 10, weight: 3, img: sprite(10, (g, r) => marigold(g, r, '#ef7b10', '#ffb43a')) },
        { type: 'flower', size: 10, weight: 3, img: sprite(10, (g, r) => marigold(g, r, '#f4ad0c', '#ffd859')) },
        { type: 'flower', size: 10, weight: 3, img: sprite(10, (g, r) => jasmine(g, r)) },
        { type: 'star', size: 7, weight: 3, img: sprite(7, (g, r) => star(g, r)) },
      ];
      total = kinds.reduce((s, k) => s + k.weight, 0);
    }
    function kind() {
      let n = Math.random() * total;
      for (const k of kinds) { n -= k.weight; if (n <= 0) return k; }
      return kinds[0];
    }
    function make(opts = {}) {
      const k = kind();
      return {
        k,
        x: opts.x !== undefined ? opts.x : rand(-10, W + 10),
        y: opts.y !== undefined ? opts.y : rand(-H, H),
        vx: opts.vx !== undefined ? opts.vx : rand(-0.25, 0.25),
        vy: opts.vy !== undefined ? opts.vy : rand(0.45, 1.05),
        fall: rand(0.55, 1.25),
        scale: rand(0.7, 1.2),
        rot: rand(0, 6.28), vr: rand(-0.03, 0.03),
        sway: rand(0, 6.28), swaySp: rand(0.01, 0.025),
        flip: rand(0, 6.28), flipSp: rand(0.025, 0.06),
        once: !!opts.once,
      };
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }
    function draw(p) {
      const k = p.k;
      const s = k.size * 2 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (k.type === 'petal') ctx.scale(1, 0.3 + 0.7 * Math.abs(Math.cos(p.flip)));
      else if (k.type === 'flower') ctx.scale(1, 0.65 + 0.35 * Math.abs(Math.cos(p.flip)));
      else ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(p.flip * 1.6));
      ctx.drawImage(k.img, -s / 2, -s / 2, s, s);
      ctx.restore();
    }
    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.sway += p.swaySp; p.flip += p.flipSp; p.rot += p.vr;
        // thrown flowers slow down and settle into a gentle fall
        p.vx = p.vx * 0.975 + Math.sin(p.sway) * 0.02;
        p.vy += (p.fall - p.vy) * 0.03;
        p.x += p.vx + Math.sin(p.sway) * 0.45;
        p.y += p.vy;
        if (p.y > H + 30 || p.x < -40 || p.x > W + 40) {
          if (p.once) { list.splice(i, 1); continue; }
          Object.assign(p, make({ y: -30 }));
        }
        draw(p);
      }
      requestAnimationFrame(loop);
    }
    function start() {
      if (!c || reduceMotion || running) return;
      resize();
      const n = Math.round(Math.min(26, Math.max(12, (W * H) / 20000)));
      list = Array.from({ length: n }, () => make());
      running = true;
      requestAnimationFrame(loop);
      window.addEventListener('resize', resize);
    }
    // a shower of flowers thrown up and out from a point (the Ganesh seal)
    function shower(x, y, n = 70) {
      if (!running) return;
      for (let i = 0; i < n; i++) {
        const a = rand(-Math.PI, 0) + rand(-0.35, 0.35);
        const v = rand(3, 9.5);
        list.push(make({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.5, once: true }));
      }
      // and a second wave drifting down from the top
      for (let i = 0; i < n * 0.6; i++) list.push(make({ y: rand(-H * 0.6, -10), vy: rand(1.4, 2.4), once: true }));
    }
    return { start, shower };
  })();

  /* =========================================================
     Gold sparkles twinkling over the opening scene
     ========================================================= */
  function sparkleLayer(canvas) {
    const ctx = canvas.getContext('2d');
    const count = Number(canvas.dataset.count) || 20;
    const top = Number(canvas.dataset.top) || 0;
    const bottom = Number(canvas.dataset.bottom) || 1;
    let W = 0; let H = 0; let list = []; let raf = 0; let visible = false;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make() {
      return { x: rand(0, W), y: rand(H * top, H * bottom), r: rand(2.5, 6), ph: rand(0, 6.28), sp: rand(0.02, 0.05), vy: rand(0.03, 0.12) };
    }
    function frame() {
      if (!visible) { raf = 0; return; }
      ctx.clearRect(0, 0, W, H);
      list.forEach((p) => {
        p.ph += p.sp;
        p.y += p.vy;
        if (p.y > H * bottom) Object.assign(p, make(), { y: H * top });
        const a = Math.max(0, Math.sin(p.ph));
        if (a < 0.02) return;
        const r = p.r * (0.5 + 0.5 * a);
        ctx.globalAlpha = a;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.4);
        g.addColorStop(0, 'rgba(255,246,214,.9)');
        g.addColorStop(1, 'rgba(255,220,140,0)');
        ctx.fillStyle = g;
        ctx.fillRect(p.x - r * 2.4, p.y - r * 2.4, r * 4.8, r * 4.8);
        ctx.fillStyle = '#fff8e0';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - r * 2); ctx.lineTo(p.x + r * 0.28, p.y - r * 0.28); ctx.lineTo(p.x + r * 2, p.y);
        ctx.lineTo(p.x + r * 0.28, p.y + r * 0.28); ctx.lineTo(p.x, p.y + r * 2); ctx.lineTo(p.x - r * 0.28, p.y + r * 0.28);
        ctx.lineTo(p.x - r * 2, p.y); ctx.lineTo(p.x - r * 0.28, p.y - r * 0.28);
        ctx.closePath();
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    resize();
    list = Array.from({ length: count }, make);
    window.addEventListener('resize', resize);
    new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }).observe(canvas);
  }

  /* =========================================================
     Music: "Rote Gachey Khobor" — one mood on the closed card,
     another once it opens; each part loops with a soft blend
     ========================================================= */
  const Music = (() => {
    const M = CONFIG.music;
    const AC = window.AudioContext || window.webkitAudioContext;
    const toggles = $$('.music-toggle');
    let ctx = null; let out = null;
    let mode = AC ? 'buffer' : 'element'; // <audio> fallback: file:// or no Web Audio
    const buffers = {};
    const els = {};
    let scene = 'envelope'; // the mood that belongs on screen now
    let on = true;          // the guest's choice (music buttons)
    let voice = null;       // the loop that is sounding
    let current = null;     // which mood `voice` is

    function setUI(playing) {
      toggles.forEach((b) => {
        b.setAttribute('aria-pressed', String(playing));
        b.querySelector('use').setAttribute('href', playing ? '#i-music' : '#i-mute');
      });
    }

    // Every repeat starts `blend` seconds before the last one ends and the two
    // cross-fade, so the loop point is a soft blend rather than a cut.
    function bufferLoop(buf, fadeIn) {
      const g = ctx.createGain();
      g.connect(out);
      const t0 = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(1, t0 + fadeIn);
      const step = Math.max(1, buf.duration - M.blend);
      const live = new Set();
      let next = t0 + 0.03;
      function schedule() {
        while (next < ctx.currentTime + 3) {
          const s = ctx.createBufferSource();
          const sg = ctx.createGain();
          s.buffer = buf;
          s.connect(sg);
          sg.connect(g);
          sg.gain.setValueAtTime(0, next);
          sg.gain.linearRampToValueAtTime(1, next + M.blend);
          sg.gain.setValueAtTime(1, next + step);
          sg.gain.linearRampToValueAtTime(0, next + buf.duration);
          s.start(next);
          s.stop(next + buf.duration + 0.05);
          live.add(s);
          s.onended = () => live.delete(s);
          next += step;
        }
      }
      schedule();
      const timer = setInterval(schedule, 700);
      return {
        stop(fadeOut) {
          clearInterval(timer);
          const t = ctx.currentTime;
          g.gain.cancelScheduledValues(t);
          g.gain.setValueAtTime(g.gain.value, t);
          g.gain.linearRampToValueAtTime(0.0001, t + fadeOut);
          live.forEach((s) => { try { s.stop(t + fadeOut + 0.05); } catch (e) { /* already ended */ } });
        },
      };
    }

    function elementLoop(name) {
      const a = els[name] || (els[name] = new Audio(M[name]));
      a.loop = true;
      a.volume = M.volume;
      a.currentTime = 0;
      const v = { stop() { a.pause(); } };
      const p = a.play();
      if (p && p.catch) p.catch(() => { if (voice === v) { voice = null; current = null; setUI(false); document.body.dataset.music = 'off'; } });
      return v;
    }

    // Bring what is sounding in line with the scene, the guest's choice
    // and tab visibility.
    function sync(fade = 1.4) {
      const want = on && !document.hidden ? scene : null;
      if (want === current) return;
      if (want) {
        if (mode === 'buffer' && (!buffers[want] || ctx.state !== 'running')) return; // decoding, or waiting for a tap
      }
      if (voice) voice.stop(want ? fade : 0.7);
      voice = null;
      current = want;
      if (want) voice = mode === 'buffer' ? bufferLoop(buffers[want], fade) : elementLoop(want);
      setUI(!!voice);
      document.body.dataset.music = current || 'off';
    }

    // must run inside a tap: browsers only start sound after one
    function wake() {
      if (ctx && ctx.state !== 'running') ctx.resume().then(() => sync(), () => {});
      sync();
    }

    function cue(name) { scene = name; wake(); }

    function init() {
      if (AC) {
        ctx = new AC();
        out = ctx.createGain();
        out.gain.value = M.volume;
        out.connect(ctx.destination);
        ctx.onstatechange = () => sync();
        // let iPhones play it even with the ring/silent switch on silent
        if (navigator.audioSession) { try { navigator.audioSession.type = 'playback'; } catch (e) { /* older Safari */ } }
        ['envelope', 'main'].forEach((name) => {
          fetch(M[name])
            .then((r) => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
            .then((data) => new Promise((res, rej) => ctx.decodeAudioData(data, res, rej)))
            .then((buf) => { buffers[name] = buf; sync(); })
            .catch(() => { mode = 'element'; current = null; sync(); });
        });
      }
      // the first tap anywhere starts the mood on screen (the seal, its hint
      // and the music buttons handle it themselves)
      const onTap = (e) => { if (!(e.target.closest && e.target.closest('#seal, .gate-hint, .music-toggle'))) wake(); };
      ['click', 'touchend', 'keydown'].forEach((ev) => document.addEventListener(ev, onTap, true));
      toggles.forEach((b) => b.addEventListener('click', () => {
        on = !voice;
        if (on) wake(); else sync();
      }));
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && ctx && ctx.state !== 'running') ctx.resume().then(() => sync(), () => {});
        sync();
      });
      sync(); // plays right away where the browser allows sound without a tap
    }
    return { init, cue };
  })();

  /* =========================================================
     Gatefold intro
     ========================================================= */
  function initGate() {
    const gate = $('#gate');
    const seal = $('#seal');

    // personalised greeting: ?to=Name
    const params = new URLSearchParams(location.search);
    const guest = (params.get('to') || params.get('guest') || '').trim().slice(0, 60);
    if (guest) {
      const line = $('#guestLine');
      line.hidden = false;
      line.innerHTML = '<span class="bn"></span><span class="en"></span>';
      line.firstChild.textContent = `${TEXT.guest.bn} ${guest}`;
      line.lastChild.textContent = `${TEXT.guest.en} ${guest}`;
    }

    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      gate.classList.add('opening');
      // switch to the second mood inside the tap itself so phones allow it
      Music.cue('main');
      // a shower of flowers bursts from the seal, in front of the opening doors
      const petals = $('#petals');
      petals.classList.add('front');
      Petals.start();
      const r = seal.getBoundingClientRect();
      Petals.shower(r.left + r.width / 2, r.top + r.height / 2, 70);
      setTimeout(() => petals.classList.remove('front'), reduceMotion ? 0 : 3200);
      setTimeout(() => {
        document.body.classList.remove('is-sealed');
        document.body.classList.add('is-open');
        revealVisible();
      }, reduceMotion ? 100 : 1300);
      setTimeout(() => gate.classList.add('opened'), reduceMotion ? 150 : 1900);
      setTimeout(() => gate.remove(), reduceMotion ? 400 : 2800);
    };
    seal.addEventListener('click', open);
    $('.gate-hint').addEventListener('click', open);
    // a tap anywhere else starts the music; nudge the seal to show where to tap
    gate.addEventListener('click', (e) => {
      if (opened || e.target.closest('#seal, .gate-hint, .music-toggle')) return;
      seal.classList.remove('nudge');
      void seal.offsetWidth;
      seal.classList.add('nudge');
    });
    if (params.has('open')) open();
  }

  /* =========================================================
     Reveal on scroll & pause off-screen animations
     ========================================================= */
  let revealObs = null;
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach((n) => n.classList.add('in'));
      return;
    }
    revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && document.body.classList.contains('is-open')) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach((n) => revealObs.observe(n));

    const pauseObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('is-off', !e.isIntersecting));
    }, { rootMargin: '80px' });
    $$('.film, .info, .couple-bg, .portrait-frame').forEach((n) => pauseObs.observe(n));
  }
  function revealVisible() {
    const vh = window.innerHeight;
    $$('.reveal').forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > 0) {
        n.classList.add('in');
        if (revealObs) revealObs.unobserve(n);
      }
    });
  }

  /* =========================================================
     Optional hero video (assets/video/hero.mp4)
     ========================================================= */
  function initHeroVideo() {
    const v = $('#heroVideo');
    if (!v || !CONFIG.heroVideo || reduceMotion) return;
    $('source', v).src = CONFIG.heroVideo;
    v.addEventListener('playing', () => v.classList.add('on'), { once: true });
    v.hidden = false;
    v.load();
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }

  /* =========================================================
     Share & toast
     ========================================================= */
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove('show'), 2200);
  }
  function initShare() {
    $('#shareBtn').addEventListener('click', async () => {
      const url = location.origin + location.pathname;
      const data = { title: document.title, text: TEXT.share[lang], url };
      if (navigator.share) {
        try { await navigator.share(data); } catch (e) { /* dismissed */ }
        return;
      }
      try {
        await navigator.clipboard.writeText(`${data.text}\n${url}`);
        toast(TEXT.copied[lang]);
      } catch (e) {
        window.prompt('', url);
      }
    });
  }

  /* =========================================================
     Boot
     ========================================================= */
  function boot() {
    const params = new URLSearchParams(location.search);
    renderFamily();
    $$('.mandala-src').forEach(buildMandala);
    buildToran();
    setLang(params.get('lang') || store.get('wc-lang') || 'bn');
    $('#langBtn').addEventListener('click', () => setLang(lang === 'bn' ? 'en' : 'bn'));
    tickCountdown();
    setInterval(tickCountdown, 1000);
    initReveal();
    Music.init();
    initGate();
    initShare();
    initHeroVideo();
    if (!reduceMotion) $$('.glow-fx').forEach(sparkleLayer);
    Butterflies.init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
