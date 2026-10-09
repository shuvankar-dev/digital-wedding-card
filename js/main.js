/* =========================================================
   Shubho Bibaho — Prity & Shubhankar
   ========================================================= */
(() => {
  'use strict';

  /* ---------- editable details ---------- */
  const CONFIG = {
    phone: '918101300532',
    // Replace with the exact venue (a place name, an address, or "lat,lng")
    // once it is confirmed — the map, the directions button and the calendar
    // entries all read from here.
    mapQuery: 'Ghoshpara, Kestopur, Kolkata, West Bengal',
    venue: 'Sudhakunja, Ghoshpara, Kolkata',
    // Optional background music. Drop an mp3 at this path (e.g. a shehnai
    // track) and it plays instead of the built-in tanpura drone.
    musicFile: 'assets/audio/music.mp3',
    weddingStart: '2026-12-12T00:00:00+05:30',
    events: {
      wedding: {
        title: 'Shubho Bibaho · Prity & Shubhankar',
        dates: '20261212/20261213',
        details: 'শুভবিবাহ — ২৫শে অগ্রহায়ণ, ১৪৩৩ (ইং ১২ই ডিসেম্বর, ২০২৬) শনিবার',
      },
      reception: {
        title: 'Bou-Bhat & Reception · Prity & Shubhankar',
        dates: '20261214/20261215',
        details: 'বধূবরণ ও প্রীতিভোজ — ২৭শে অগ্রহায়ণ, ১৪৩৩ (ইং ১৪ই ডিসেম্বর, ২০২৬) সোমবার',
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
      bn: 'প্রীতি ও শুভঙ্করের শুভবিবাহের নিমন্ত্রণপত্র — ১২ই ডিসেম্বর, ২০২৬',
      en: 'Wedding invitation · Prity & Shubhankar · 12 December 2026',
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
    const src = `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
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
     Marigolds & garlands
     ========================================================= */
  function marigold(parent, x, y, r, alt) {
    const g = el('g', {}, parent);
    el('circle', { cx: x, cy: y, r, fill: alt ? 'url(#gMarigold2)' : 'url(#gMarigold)' }, g);
    el('circle', {
      cx: x, cy: y, r: r * 0.78, fill: 'none',
      stroke: alt ? '#c07a14' : '#a9530f', 'stroke-width': r * 0.22,
      'stroke-dasharray': `${r * 0.28} ${r * 0.32}`, opacity: 0.55,
    }, g);
    el('circle', { cx: x - r * 0.25, cy: y - r * 0.3, r: r * 0.28, fill: '#fff3c4', opacity: 0.35 }, g);
    return g;
  }

  function jasmine(parent, x, y, r) {
    el('circle', { cx: x, cy: y, r, fill: '#fffaf0', stroke: '#e7dcc6', 'stroke-width': 0.6 }, parent);
    el('circle', { cx: x, cy: y, r: r * 0.35, fill: '#f1d58c' }, parent);
  }

  function bell(parent, x, y, s = 1) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, parent);
    el('path', { d: 'M0 0 V4', stroke: '#9a7432', 'stroke-width': 1 }, g);
    el('path', { d: 'M-6 14 C-6 6 -3 4 0 4 C3 4 6 6 6 14 Z', fill: 'url(#gGold)', stroke: '#8a6220', 'stroke-width': 0.6 }, g);
    el('circle', { cx: 0, cy: 15.5, r: 1.8, fill: '#8a6220' }, g);
    return g;
  }

  function leaf(parent, x, y, angle, len, color) {
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${angle})` }, parent);
    el('path', { d: `M0 0 C${-len * 0.28} ${len * 0.3} ${-len * 0.18} ${len * 0.75} 0 ${len} C${len * 0.18} ${len * 0.75} ${len * 0.28} ${len * 0.3} 0 0 Z`, fill: color }, g);
    el('path', { d: `M0 1 V${len - 2}`, stroke: '#3f5232', 'stroke-width': 0.6, opacity: 0.6 }, g);
    return g;
  }

  function strand(parent, x, y0, len, opts = {}) {
    const g = el('g', { class: 'strand' }, parent);
    g.style.animationDuration = `${rand(3.6, 5.6).toFixed(2)}s`;
    g.style.animationDelay = `${(-rand(0, 5)).toFixed(2)}s`;
    const r = opts.r || 5.2;
    el('path', { d: `M${x} ${y0} V${y0 + len}`, stroke: '#7a5a1e', 'stroke-width': 0.6 }, g);
    let i = 0;
    for (let y = y0 + r; y < y0 + len; y += r * 1.62, i++) {
      if (opts.jasmine && i % 6 === 5) jasmine(g, x, y, r * 0.62);
      else marigold(g, x, y, r, i % 2 === 1);
    }
    leaf(g, x, y0 + len, -28, 11, '#5d7348');
    leaf(g, x, y0 + len, 28, 11, '#6f8a57');
    if (opts.bell !== false) bell(g, x, y0 + len + 2, opts.bellScale || 0.9);
    return g;
  }

  function swag(parent, x1, x2, y, dip, r = 4.6) {
    const g = el('g', {}, parent);
    const n = Math.round((x2 - x1) / (r * 1.55));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = x1 + (x2 - x1) * t;
      const yy = y + dip * 4 * t * (1 - t);
      marigold(g, x, yy, r, i % 2 === 0);
    }
    return g;
  }

  function lights(parent, x1, x2, y, dip, count, warm = '#ffd98a') {
    const g = el('g', {}, parent);
    el('path', { d: `M${x1} ${y} Q${(x1 + x2) / 2} ${y + dip * 2} ${x2} ${y}`, fill: 'none', stroke: '#6b4a2a', 'stroke-width': 0.5, opacity: 0.7 }, g);
    for (let i = 1; i < count; i++) {
      const t = i / count;
      const x = x1 + (x2 - x1) * t;
      const yy = y + dip * 4 * t * (1 - t);
      const b = el('circle', { cx: x, cy: yy + 2, r: 1.7, fill: warm, class: 'bulb' }, g);
      b.style.animationDelay = `${(-rand(0, 2.4)).toFixed(2)}s`;
      b.style.filter = 'drop-shadow(0 0 2px rgba(255,200,110,.9))';
    }
    return g;
  }

  function buildToran() {
    const svg = $('#toran');
    if (!svg) return;
    // fairy lights behind
    lights(svg, 0, 400, 22, 60, 26);
    lights(svg, 0, 400, 30, 90, 30, '#fff1c8');
    // side strands (long, like a pandal entrance)
    strand(svg, 14, 8, 250, { jasmine: true });
    strand(svg, 36, 8, 196, { jasmine: true, r: 4.6 });
    strand(svg, 58, 8, 142, { r: 4.2, bellScale: 0.75 });
    strand(svg, 386, 8, 250, { jasmine: true });
    strand(svg, 364, 8, 196, { jasmine: true, r: 4.6 });
    strand(svg, 342, 8, 142, { r: 4.2, bellScale: 0.75 });
    // centre drop
    strand(svg, 200, 40, 44, { r: 4.4, bellScale: 1.1 });
    // swags
    swag(svg, 0, 200, 8, 32, 5);
    swag(svg, 200, 400, 8, 32, 5);
    // mango leaves along the top
    for (let x = 4; x <= 400; x += 13) {
      leaf(svg, x, 0, rand(-10, 10), rand(16, 22), (x / 13) % 2 < 1 ? '#5d7348' : '#738f59');
    }
    el('rect', { x: 0, y: 0, width: 400, height: 3, fill: '#7a5a1e' }, svg);
  }

  /* =========================================================
     Alpana (rotating floor art behind the title)
     ========================================================= */
  function buildAlpana() {
    const svg = $('#alpana');
    if (!svg) return;
    const g = el('g', { fill: 'none', stroke: '#f1dca2', 'stroke-width': 1.2, 'stroke-linecap': 'round' }, svg);
    el('circle', { r: 34 }, g);
    el('circle', { r: 150, 'stroke-dasharray': '1 6', 'stroke-width': 2 }, g);
    el('circle', { r: 104 }, g);
    for (let i = 0; i < 8; i++) {
      const rg = el('g', { transform: `rotate(${i * 45})` }, g);
      el('path', { d: 'M0 -36 C22 -52 20 -82 0 -100 C-20 -82 -22 -52 0 -36 Z' }, rg);
      el('path', { d: 'M0 -46 C10 -56 10 -76 0 -88 C-10 -76 -10 -56 0 -46 Z' }, rg);
      el('path', { d: 'M0 -100 C6 -108 4 -116 -2 -116 C-6 -116 -6 -110 -2 -109' }, rg);
    }
    for (let i = 0; i < 16; i++) {
      const rg = el('g', { transform: `rotate(${i * 22.5 + 11.25})` }, g);
      el('path', { d: 'M0 -106 C7 -112 7 -122 0 -130 C-7 -122 -7 -112 0 -106 Z' }, rg);
      el('circle', { cy: -138, r: 2.2, fill: '#f1dca2', stroke: 'none' }, rg);
    }
    for (let i = 0; i < 24; i++) {
      const rg = el('g', { transform: `rotate(${i * 15})` }, g);
      el('path', { d: 'M0 -144 c6 -3 10 -9 5 -13 c-4 -3 -9 0 -6 4' }, rg);
    }
    for (let i = 0; i < 8; i++) {
      const rg = el('g', { transform: `rotate(${i * 45 + 22.5})` }, g);
      el('path', { d: 'M0 -12 C5 -18 5 -26 0 -32 C-5 -26 -5 -18 0 -12 Z', fill: 'rgba(241,220,162,.25)' }, rg);
    }
    el('circle', { r: 6, fill: '#f1dca2', stroke: 'none' }, g);
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
    const C = '#4b1219';

    // traffic (drawn first so the lattice sits in front of it)
    const traffic = el('g', {}, g);
    const vehicles = [
      { type: 'taxi', dur: 13, delay: -2 }, { type: 'taxi', dur: 13, delay: -7.5 },
      { type: 'bus', dur: 18, delay: -11 }, { type: 'taxi', dur: 15, delay: -4, rev: true },
      { type: 'tram', dur: 24, delay: -14, rev: true }, { type: 'taxi', dur: 15, delay: -11, rev: true },
    ];
    vehicles.forEach((v) => {
      const vg = el('g', { class: `veh${v.rev ? ' rev' : ''}` }, traffic);
      vg.style.setProperty('--dur', `${v.dur}s`);
      vg.style.setProperty('--delay', `${v.delay}s`);
      const y = v.rev ? 185 : 182;
      if (v.type === 'taxi') {
        el('rect', { x: 0, y: y - 5, width: 11, height: 5, rx: 1.6, fill: '#e3b23c' }, vg);
        el('rect', { x: 2.5, y: y - 8, width: 6, height: 3.4, rx: 1.2, fill: '#e3b23c' }, vg);
        el('rect', { x: 3.4, y: y - 7.3, width: 4.2, height: 2, fill: '#6b5a3a', opacity: 0.6 }, vg);
      } else if (v.type === 'bus') {
        el('rect', { x: 0, y: y - 8, width: 20, height: 8, rx: 1.6, fill: '#2f5d74' }, vg);
        el('path', { d: `M2 ${y - 6} h16`, stroke: '#f6e7d2', 'stroke-width': 1.6, 'stroke-dasharray': '2.4 1.4' }, vg);
      } else {
        el('rect', { x: 0, y: y - 9, width: 26, height: 8, rx: 1.2, fill: '#3e6f9a' }, vg);
        el('rect', { x: 0, y: y - 4, width: 26, height: 3, fill: '#f6e7d2' }, vg);
        el('path', { d: `M3 ${y - 7.4} h20`, stroke: '#f6e7d2', 'stroke-width': 1.8, 'stroke-dasharray': '3 1.6' }, vg);
        el('path', { d: `M13 ${y - 9} l-3 -5 h6`, stroke: '#3d0a12', 'stroke-width': 0.6, fill: 'none' }, vg);
      }
      el('circle', { cx: 3, cy: y, r: 1.3, fill: '#2a060c' }, vg);
      el('circle', { cx: v.type === 'taxi' ? 8 : v.type === 'bus' ? 16 : 22, cy: y, r: 1.3, fill: '#2a060c' }, vg);
    });

    // lattice
    let d = '';
    const step = 10;
    for (let x = 0; x <= 400; x += step) {
      const y1 = topY(x);
      const x2 = x + step;
      const y2 = topY(Math.min(x2, 400));
      d += `M${x} ${DECK} L${x} ${y1.toFixed(1)} `;
      if (x < 400) {
        d += `M${x} ${DECK} L${x2} ${y2.toFixed(1)} M${x} ${y1.toFixed(1)} L${x2} ${DECK} `;
      }
    }
    el('path', { d, stroke: C, 'stroke-width': 0.85, fill: 'none', opacity: 0.88 }, g);

    let chord = '';
    for (let x = 0; x <= 400; x += 2) chord += `${x === 0 ? 'M' : 'L'}${x} ${topY(x).toFixed(1)} `;
    el('path', { d: chord, stroke: C, 'stroke-width': 3.2, fill: 'none', 'stroke-linejoin': 'round' }, g);
    el('rect', { x: 0, y: DECK - 2, width: 400, height: 6, fill: C }, g);
    el('path', { d: `M0 ${DECK + 7} H400`, stroke: C, 'stroke-width': 1.4 }, g);

    // towers
    [70, 330].forEach((tx) => {
      const tg = el('g', {}, g);
      el('path', { d: `M${tx - 7} ${TOWER - 4} L${tx - 7} 238 M${tx + 7} ${TOWER - 4} L${tx + 7} 238`, stroke: C, 'stroke-width': 3 }, tg);
      let x = '';
      for (let y = TOWER; y < 232; y += 14) x += `M${tx - 7} ${y} L${tx + 7} ${y + 14} M${tx + 7} ${y} L${tx - 7} ${y + 14} `;
      el('path', { d: x, stroke: C, 'stroke-width': 0.9 }, tg);
      el('rect', { x: tx - 11, y: TOWER - 9, width: 22, height: 6, fill: C }, tg);
      el('rect', { x: tx - 12, y: 228, width: 24, height: 16, fill: C }, tg);
      el('circle', { cx: tx, cy: TOWER - 12, r: 1.8, fill: '#ff5a4f', class: 'bulb' }, tg);
    });

    // evening lights along the top chord
    const lg = el('g', {}, g);
    for (let x = 8; x < 400; x += 16) {
      const b = el('circle', { cx: x, cy: topY(x) - 1, r: 1.25, fill: '#ffe2a0', class: 'bulb' }, lg);
      b.style.animationDelay = `${(-rand(0, 2.4)).toFixed(2)}s`;
    }
  }

  /* =========================================================
     Couple scene extras (lights, strands, balusters)
     ========================================================= */
  function buildCoupleExtras() {
    const lg = $('#cpLights');
    if (lg) {
      lights(lg, 20, 340, 84, 34, 24);
      lights(lg, 20, 340, 110, 30, 22, '#fff1c8');
    }
    const sg = $('#cpStrands');
    if (sg) {
      strand(sg, 40, 100, 210, { r: 5, jasmine: true });
      strand(sg, 64, 70, 140, { r: 4.4, bellScale: 0.8 });
      strand(sg, 296, 70, 140, { r: 4.4, bellScale: 0.8 });
      strand(sg, 320, 100, 210, { r: 5, jasmine: true });
    }
    const bal = $('#balusters');
    if (bal) {
      for (let x = 12; x < 360; x += 22) {
        el('path', { d: `M${x - 3} 348 C${x - 10} 360 ${x - 10} 376 ${x - 3} 386 L${x - 4} 400 H${x + 4} L${x + 3} 386 C${x + 10} 376 ${x + 10} 360 ${x + 3} 348 Z` }, bal);
        el('rect', { x: x - 6, y: 398, width: 12, height: 6 }, bal);
      }
    }
    const dt = $('#doorToran');
    if (dt) {
      for (let x = 62; x <= 168; x += 9) leaf(dt, x, 70, rand(-8, 8), 14, x % 18 ? '#5d7348' : '#738f59');
      swag(dt, 56, 174, 68, 9, 4);
    }
  }

  /* =========================================================
     Alta footsteps
     ========================================================= */
  function buildFootsteps() {
    const wrap = $('#footsteps');
    if (!wrap) return;
    const n = 7;
    for (let i = 0; i < n; i++) {
      const left = i % 2 === 0;
      const svg = el('svg', { viewBox: '0 0 40 76', class: 'fp' });
      el('use', { href: '#foot' }, svg);
      const y = 300 - 46 - i * 40;
      const x = 120 + (left ? -30 : 6);
      svg.style.left = `${x}px`;
      svg.style.top = `${y}px`;
      svg.style.setProperty('--i', i);
      svg.style.setProperty('--sx', left ? -1 : 1);
      svg.style.setProperty('--r', `${left ? 6 : -6}deg`);
      wrap.appendChild(svg);
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
      for (let i = 0; i < 3; i++) {
        const d = document.createElement('div');
        d.className = 'bfly';
        d.innerHTML = '<svg viewBox="-30 -24 60 48"><use href="#butterfly"/></svg>';
        host.appendChild(d);
        list.push({
          el: d,
          ax: rand(0.25, 0.4), ay: rand(0.12, 0.2),
          fx: rand(0.00011, 0.00018), fy: rand(0.00023, 0.00034),
          px: rand(0, 6.28), py: rand(0, 6.28),
          cx: rand(0.3, 0.7), cy: rand(0.35, 0.65),
          s: rand(0.75, 1.1), lx: 0, ly: 0,
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
     Falling petals canvas
     ========================================================= */
  const Petals = (() => {
    const c = $('#petals');
    const ctx = c && c.getContext('2d');
    const COLORS = [
      ['#e39a2a', '#f7c95a'], ['#d9821f', '#f2b34a'],
      ['#a3202b', '#c94a52'], ['#8a1823', '#b43a44'],
      ['#fffaf0', '#efe3cc'], ['#eebb3f', '#fbe08a'],
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
        size: spark ? rand(1.2, 2.4) : rand(5, 10),
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
        const a = 0.5 + 0.5 * Math.sin(p.flip * 3);
        ctx.globalAlpha = a;
        ctx.fillStyle = '#ffe9b0';
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s * 2.4); ctx.lineTo(s * 0.5, -s * 0.5); ctx.lineTo(s * 2.4, 0); ctx.lineTo(s * 0.5, s * 0.5);
        ctx.lineTo(0, s * 2.4); ctx.lineTo(-s * 0.5, s * 0.5); ctx.lineTo(-s * 2.4, 0); ctx.lineTo(-s * 0.5, -s * 0.5);
        ctx.closePath(); ctx.fill();
      } else {
        ctx.scale(1, 0.25 + 0.75 * Math.abs(Math.cos(p.flip)));
        const s = p.size;
        ctx.globalAlpha = 0.92;
        ctx.fillStyle = p.col[0];
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.9, -s * 0.7, s * 0.7, s * 0.6, 0, s);
        ctx.bezierCurveTo(-s * 0.7, s * 0.6, -s * 0.9, -s * 0.7, 0, -s);
        ctx.fill();
        ctx.fillStyle = p.col[1];
        ctx.globalAlpha = 0.55;
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
        if (p.burst && p.vy > 0.9) p.vy *= 0.996;
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
    function burst(n = 70) {
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
      const ring = new Float32Array(N);
      for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
      let idx = 0;
      for (let i = 0; i < len; i++) {
        const a = ring[idx];
        const b = ring[(idx + 1) % N];
        out[i] = a;
        ring[idx] = (a + b) * 0.5 * 0.9985;
        idx = (idx + 1) % N;
      }
      // gentle attack to soften the pluck
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
      const SA = 277.18; // C#4
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
      if (p && p.then) {
        p.then(() => { mode = 'file'; setUI(true); }).catch(() => startDrone());
      } else {
        startDrone();
      }
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
     Envelope
     ========================================================= */
  function initEnvelope() {
    const env = $('#envelope');
    const seal = $('#seal');
    const svg = $('.seal-svg', seal);
    $$('.seal-half', seal).forEach((h) => h.appendChild(svg.cloneNode(true)));

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
      env.classList.add('opening');
      // start audio inside the tap itself so mobile browsers allow it
      Music.chime();
      Music.start();
      setTimeout(() => {
        document.body.classList.remove('is-sealed');
        document.body.classList.add('is-open');
        env.classList.add('opened');
        Petals.start();
        Petals.burst(50);
        revealVisible();
      }, reduceMotion ? 200 : 2300);
      setTimeout(() => env.remove(), reduceMotion ? 400 : 3400);
    };
    env.addEventListener('click', open);
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
    $$('.scene, .couple-svg, .toran, .steps-scene').forEach((n) => pauseObs.observe(n));
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
    buildToran();
    buildAlpana();
    buildBridge();
    buildCoupleExtras();
    buildFootsteps();
    setLang(params.get('lang') || store.get('wc-lang') || 'bn');
    $('#langBtn').addEventListener('click', () => setLang(lang === 'bn' ? 'en' : 'bn'));
    tickCountdown();
    setInterval(tickCountdown, 1000);
    initReveal();
    initEnvelope();
    initShare();
    initHeroVideo();
    Butterflies.init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
