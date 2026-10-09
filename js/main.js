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
    // Optional background music. Drop an mp3 at this path (e.g. a shehnai
    // track) and it plays instead of the built-in tanpura drone.
    musicFile: 'assets/audio/music.mp3',
    weddingStart: '2026-12-12T00:00:00+05:30',
    events: {
      wedding: {
        title: 'Shubho Bibaho · Prity & Shubhankar',
        dates: '20261212/20261213',
        details: 'শুভবিবাহ — ২৫শে অগ্রহায়ণ, ১৪৩৩ (ইং ১২ই ডিসেম্বর, ২০২৬) শনিবার। পাত্রীর বাসভবন, ওধানপুর, দেগঙ্গা।',
      },
    },
  };

  const FAMILY = {
    bride: {
      bn: [
        ['পিতা', 'শ্রী তিলক কুমার পাল'],
        ['মাতা', 'শ্রীমতী কাকলী পাল'],
        ['ভাই', 'শুভজিৎ পাল'],
        ['ঠাকুরদা', 'ঈশ্বর ভরত চন্দ্র পাল'],
        ['ঠাকুমা', 'ঈশ্বর সন্ধ্যা রানী পাল'],
        ['নিবাস', 'গ্রাম - ওধানপুর, পোঃ - সোহাই কুমারপুর, পুঃ স্টেঃ - দেগঙ্গা, উত্তর ২৪ পরগনা, পিন - ৭৪৩৪২৩'],
      ],
      en: [
        ['Father', 'Mr. Tilak Kumar Pal'],
        ['Mother', 'Mrs. Kakali Pal'],
        ['Brother', 'Shubhajit Pal'],
        ['Grandfather', 'Late Bharat Chandra Pal'],
        ['Grandmother', 'Late Sandhya Rani Pal'],
        ['Residence', 'Vill. Odhanpur, P.O. Sohai Kumarpur, P.S. Deganga, North 24 Parganas, PIN 743423'],
      ],
    },
    groom: {
      bn: [
        ['পিতা', 'শ্রী সুশান্ত দাস'],
        ['মাতা', 'শ্রীমতী কল্পনা দাস'],
        ['পিতামহ', 'ঈশ্বর শ্রী গৌরাঙ্গ চন্দ্র দাস'],
        ['পিতামহী', 'ঈশ্বর শ্রীমতী আলোরানী দাস'],
        ['জেঠু', 'শ্রীযুক্ত প্রশান্ত দাস'],
        ['কাকু', 'শ্রীযুক্ত মিন্টু দাস'],
        ['জেঠিমা', 'শ্রীমতী বিভা দাস'],
        ['কাকিমা', 'শ্রীমতী অর্পণা দাস'],
        ['নিবাস', 'কৃষ্ণপুর, হানাপাড়া, কলকাতা - ৭০০১০২'],
      ],
      en: [
        ['Father', 'Mr. Sushanta Das'],
        ['Mother', 'Mrs. Kalpana Das'],
        ['Grandfather', 'Late Gouranga Chandra Das'],
        ['Grandmother', 'Late Alorani Das'],
        ['Uncle (Jethu)', 'Mr. Prashanta Das'],
        ['Uncle (Kaku)', 'Mr. Mintu Das'],
        ['Aunt (Jethima)', 'Mrs. Viva Das'],
        ['Aunt (Kakima)', 'Mrs. Arpana Das'],
        ['Residence', 'Krishnapur, Hanapara, Kolkata - 700102'],
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
        data[l].forEach(([k, v], i) => {
          const isAddr = i === data[l].length - 1;
          const dt = document.createElement('dt');
          const dd = document.createElement('dd');
          dt.className = l + (isAddr ? ' addr-label' : '');
          dd.className = l + (isAddr ? ' addr-value' : '');
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
     Garlands (jasmine & rose strands, mango leaves, lights)
     ========================================================= */
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
    for (let y = y0 + r; y < y0 + len; y += r * 1.55, i++) {
      if (i % 7 === 6) rose(g, x, y, r * 1.05);
      else jasmine(g, x, y, r);
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
      if (i % 5 === 2) rose(g, x, yy, r * 1.05);
      else jasmine(g, x, yy, r);
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
     Howrah Bridge (lattice, lights, traffic)
     ========================================================= */
  function buildBridge() {
    const g = $('#bridge');
    if (!g) return;
    const DECK = 192;
    const TOWER = 62;
    const topY = (x) => {
      if (x > 200) return topY(400 - x);
      if (x <= 70) return 172 + (TOWER - 172) * (x / 70);
      if (x <= 150) {
        const t = (x - 70) / 80;
        return TOWER + (138 - TOWER) * (1 - Math.pow(1 - t, 1.7));
      }
      const t = (x - 150) / 100;
      return 138 - 10 * Math.sin(Math.PI * t);
    };
    const C = '#1f4f43';

    const traffic = el('g', {}, g);
    const vehicles = [
      { type: 'taxi', dur: 13, delay: -2 }, { type: 'taxi', dur: 13, delay: -7.5 },
      { type: 'bus', dur: 18, delay: -11 }, { type: 'taxi', dur: 15, delay: -4, rev: true },
      { type: 'tram', dur: 24, delay: -14, rev: true },
    ];
    vehicles.forEach((v) => {
      const vg = el('g', { class: `veh${v.rev ? ' rev' : ''}` }, traffic);
      vg.style.setProperty('--dur', `${v.dur}s`);
      vg.style.setProperty('--delay', `${v.delay}s`);
      const y = v.rev ? 185 : 182;
      if (v.type === 'taxi') {
        el('rect', { x: 0, y: y - 5, width: 11, height: 5, rx: 1.6, fill: '#e3b23c' }, vg);
        el('rect', { x: 2.5, y: y - 8, width: 6, height: 3.4, rx: 1.2, fill: '#e3b23c' }, vg);
      } else if (v.type === 'bus') {
        el('rect', { x: 0, y: y - 8, width: 20, height: 8, rx: 1.6, fill: '#d06d84' }, vg);
        el('path', { d: `M2 ${y - 6} h16`, stroke: '#fffaf0', 'stroke-width': 1.6, 'stroke-dasharray': '2.4 1.4' }, vg);
      } else {
        el('rect', { x: 0, y: y - 9, width: 26, height: 8, rx: 1.2, fill: '#649fb9' }, vg);
        el('rect', { x: 0, y: y - 4, width: 26, height: 3, fill: '#fffaf0' }, vg);
        el('path', { d: `M13 ${y - 9} l-3 -5 h6`, stroke: '#1f4f43', 'stroke-width': 0.6, fill: 'none' }, vg);
      }
      el('circle', { cx: 3, cy: y, r: 1.3, fill: '#143a31' }, vg);
      el('circle', { cx: v.type === 'taxi' ? 8 : v.type === 'bus' ? 16 : 22, cy: y, r: 1.3, fill: '#143a31' }, vg);
    });

    let d = '';
    const step = 10;
    for (let x = 0; x <= 400; x += step) {
      const y1 = topY(x);
      const x2 = x + step;
      const y2 = topY(Math.min(x2, 400));
      d += `M${x} ${DECK} L${x} ${y1.toFixed(1)} `;
      if (x < 400) d += `M${x} ${DECK} L${x2} ${y2.toFixed(1)} M${x} ${y1.toFixed(1)} L${x2} ${DECK} `;
    }
    el('path', { d, stroke: C, 'stroke-width': 0.9, fill: 'none', opacity: 0.85 }, g);
    let chord = '';
    for (let x = 0; x <= 400; x += 2) chord += `${x === 0 ? 'M' : 'L'}${x} ${topY(x).toFixed(1)} `;
    el('path', { d: chord, stroke: C, 'stroke-width': 3.4, fill: 'none', 'stroke-linejoin': 'round' }, g);
    el('rect', { x: 0, y: DECK - 2, width: 400, height: 6, fill: C }, g);
    el('path', { d: `M0 ${DECK + 7} H400`, stroke: C, 'stroke-width': 1.4 }, g);
    [70, 330].forEach((tx) => {
      const tg = el('g', {}, g);
      el('path', { d: `M${tx - 7} ${TOWER - 4} L${tx - 7} 238 M${tx + 7} ${TOWER - 4} L${tx + 7} 238`, stroke: C, 'stroke-width': 3 }, tg);
      let x = '';
      for (let y = TOWER; y < 232; y += 14) x += `M${tx - 7} ${y} L${tx + 7} ${y + 14} M${tx + 7} ${y} L${tx - 7} ${y + 14} `;
      el('path', { d: x, stroke: C, 'stroke-width': 0.9 }, tg);
      el('rect', { x: tx - 11, y: TOWER - 9, width: 22, height: 6, fill: C }, tg);
      el('rect', { x: tx - 12, y: 228, width: 24, height: 16, fill: C }, tg);
    });
    const lg = el('g', {}, g);
    for (let x = 8; x < 400; x += 16) {
      const b = el('circle', { cx: x, cy: topY(x) - 1, r: 1.6, fill: '#ffe2a0', class: 'bulb' }, lg);
      b.style.animationDelay = `${(-rand(0, 2.4)).toFixed(2)}s`;
    }
  }

  /* =========================================================
     Butterflies (প্রজাপতি) in the hero
     ========================================================= */
  const Butterflies = (() => {
    const host = $('#butterflies');
    const list = [];
    let raf = 0;
    let visible = true;
    function init() {
      if (!host || reduceMotion) return;
      for (let i = 0; i < 4; i++) {
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
      new IntersectionObserver((e) => {
        visible = e[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      }).observe(host);
      raf = requestAnimationFrame(loop);
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
    return { init };
  })();

  /* =========================================================
     Falling petals canvas (jasmine, rose, leaves, sparkles)
     ========================================================= */
  const Petals = (() => {
    const c = $('#petals');
    const ctx = c && c.getContext('2d');
    const COLORS = [
      ['#ffffff', '#e3f3ee'], ['#fdfdf8', '#dcefe8'],
      ['#e9a3ae', '#f7d0d6'], ['#d77d91', '#f0b5c0'],
      ['#7fbf9f', '#b9e3cf'], ['#e6d39d', '#fff3cc'],
    ];
    let W = 0; let H = 0; let list = []; let running = false;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make(burst) {
      const spark = Math.random() < 0.16;
      return {
        x: rand(0, W),
        y: burst ? rand(-H * 0.7, -10) : rand(-H, H),
        size: spark ? rand(1.2, 2.4) : rand(5, 9.5),
        vy: burst ? rand(1.1, 2.2) : rand(0.35, 0.85),
        vx: rand(-0.25, 0.25),
        rot: rand(0, 6.28), vr: rand(-0.025, 0.025),
        sway: rand(0, 6.28), swaySp: rand(0.008, 0.02),
        flip: rand(0, 6.28), flipSp: rand(0.02, 0.05),
        col: pick(COLORS), spark, burst,
      };
    }
    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (p.spark) {
        ctx.globalAlpha = 0.5 + 0.5 * Math.sin(p.flip * 3);
        ctx.fillStyle = '#e6c56a';
        const s = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -s * 2.4); ctx.lineTo(s * 0.5, -s * 0.5); ctx.lineTo(s * 2.4, 0); ctx.lineTo(s * 0.5, s * 0.5);
        ctx.lineTo(0, s * 2.4); ctx.lineTo(-s * 0.5, s * 0.5); ctx.lineTo(-s * 2.4, 0); ctx.lineTo(-s * 0.5, -s * 0.5);
        ctx.closePath(); ctx.fill();
      } else {
        ctx.scale(1, 0.25 + 0.75 * Math.abs(Math.cos(p.flip)));
        const s = p.size;
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = p.col[0];
        ctx.shadowColor = 'rgba(37,85,67,.25)';
        ctx.shadowBlur = 2;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.9, -s * 0.7, s * 0.7, s * 0.6, 0, s);
        ctx.bezierCurveTo(-s * 0.7, s * 0.6, -s * 0.9, -s * 0.7, 0, -s);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = p.col[1];
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.ellipse(-s * 0.15, -s * 0.2, s * 0.22, s * 0.5, 0, 0, 6.283);
        ctx.fill();
      }
      ctx.restore();
    }
    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.sway += p.swaySp; p.flip += p.flipSp; p.rot += p.vr;
        p.x += p.vx + Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        if (p.y > H + 20 || p.x < -30 || p.x > W + 30) {
          if (p.burst) { list.splice(i, 1); continue; }
          Object.assign(p, make(false), { y: -20 });
        }
        drawPetal(p);
      }
      requestAnimationFrame(loop);
    }
    function start() {
      if (!c || reduceMotion || running) return;
      resize();
      const n = Math.round(Math.min(18, Math.max(8, (W * H) / 36000)));
      list = Array.from({ length: n }, () => make(false));
      running = true;
      requestAnimationFrame(loop);
      window.addEventListener('resize', resize);
    }
    function burst(n = 50) {
      if (!running) return;
      for (let i = 0; i < n; i++) list.push(make(true));
    }
    return { start, burst };
  })();

  /* =========================================================
     Music: optional mp3, otherwise a soft synthesised tanpura
     ========================================================= */
  const Music = (() => {
    const btn = $('#musicBtn');
    const audio = $('#bgm');
    let ctx = null; let master = null; let timer = 0; let mode = null; let playing = false;
    let buffers = null; let step = 0;

    function setUI(on) {
      playing = on;
      btn.setAttribute('aria-pressed', String(on));
      btn.querySelector('use').setAttribute('href', on ? '#i-music' : '#i-mute');
    }
    function ksBuffer(freq, seconds) {
      const sr = ctx.sampleRate;
      const len = Math.floor(sr * seconds);
      const buf = ctx.createBuffer(1, len, sr);
      const out = buf.getChannelData(0);
      const N = Math.max(2, Math.round(sr / freq));
      const ringBuf = new Float32Array(N);
      for (let i = 0; i < N; i++) ringBuf[i] = Math.random() * 2 - 1;
      let idx = 0;
      for (let i = 0; i < len; i++) {
        const a = ringBuf[idx];
        const b = ringBuf[(idx + 1) % N];
        out[i] = a;
        ringBuf[idx] = (a + b) * 0.5 * 0.9985;
        idx = (idx + 1) % N;
      }
      for (let i = 0; i < 300 && i < len; i++) out[i] *= i / 300;
      return buf;
    }
    function ensureCtx() {
      if (ctx) return true;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 2600;
      const delay = ctx.createDelay(1);
      delay.delayTime.value = 0.23;
      const fb = ctx.createGain(); fb.gain.value = 0.32;
      master.connect(lp);
      lp.connect(ctx.destination);
      lp.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(ctx.destination);
      const SA = 277.18;
      buffers = [SA * 0.75, SA, SA, SA / 2].map((f) => ksBuffer(f, 5));
      return true;
    }
    function pluck(when) {
      const src = ctx.createBufferSource();
      src.buffer = buffers[step % buffers.length];
      const g = ctx.createGain();
      g.gain.value = step % 4 === 3 ? 0.55 : 0.4;
      src.connect(g); g.connect(master);
      src.start(when);
      step++;
    }
    function chime() {
      if (!ensureCtx()) return;
      if (ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime + 0.02;
      [[1, 0.16], [2.76, 0.07], [5.4, 0.035]].forEach(([mul, amp]) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = 880 * mul;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(amp, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6 / mul + 0.6);
        o.connect(g); g.connect(ctx.destination);
        o.start(t); o.stop(t + 3.4);
      });
    }
    function startDrone() {
      if (!ensureCtx()) return;
      if (ctx.state === 'suspended') ctx.resume();
      mode = 'drone';
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2);
      pluck(ctx.currentTime + 0.05);
      clearInterval(timer);
      timer = setInterval(() => pluck(ctx.currentTime + 0.05), 1150);
      setUI(true);
    }
    function stopDrone() {
      clearInterval(timer);
      if (ctx) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      }
    }
    function start() {
      if (!audio.getAttribute('src')) audio.setAttribute('src', CONFIG.musicFile);
      audio.volume = 0.6;
      const p = audio.play();
      if (p && p.then) p.then(() => { mode = 'file'; setUI(true); }).catch(() => startDrone());
      else startDrone();
    }
    function stop() {
      if (mode === 'file') audio.pause();
      else stopDrone();
      setUI(false);
    }
    btn.addEventListener('click', () => (playing ? stop() : start()));
    return { start, chime };
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
      // start audio inside the tap itself so mobile browsers allow it
      Music.chime();
      Music.start();
      setTimeout(() => {
        document.body.classList.remove('is-sealed');
        document.body.classList.add('is-open');
        Petals.start();
        Petals.burst(50);
        revealVisible();
      }, reduceMotion ? 100 : 1300);
      setTimeout(() => gate.classList.add('opened'), reduceMotion ? 150 : 1900);
      setTimeout(() => gate.remove(), reduceMotion ? 400 : 2800);
    };
    gate.addEventListener('click', open);
    seal.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
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
    $$('.scene, .couple-svg, .couple-bg, .toran').forEach((n) => pauseObs.observe(n));
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
    const s = v && $('source', v);
    if (!s || location.protocol === 'file:') return;
    const src = s.dataset.src;
    fetch(src, { method: 'HEAD' }).then((r) => {
      if (!r.ok) return;
      s.src = src;
      v.hidden = false;
      v.load();
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    }).catch(() => {});
  }

  /* =========================================================
     Optional painted couple image (assets/images/couple.png)
     ========================================================= */
  function initCouplePhoto() {
    const img = $('#couplePhoto');
    if (!img || location.protocol === 'file:') return;
    const src = img.dataset.src;
    fetch(src, { method: 'HEAD' }).then((r) => {
      if (!r.ok) return;
      img.onload = () => { img.hidden = false; };
      img.src = src;
    }).catch(() => {});
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
    buildBridge();
    setLang(params.get('lang') || store.get('wc-lang') || 'bn');
    $('#langBtn').addEventListener('click', () => setLang(lang === 'bn' ? 'en' : 'bn'));
    tickCountdown();
    setInterval(tickCountdown, 1000);
    initReveal();
    initGate();
    initShare();
    initHeroVideo();
    initCouplePhoto();
    Butterflies.init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
