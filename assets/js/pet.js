(() => {
  const dir = document.querySelector('script[data-polaroids]')?.dataset.polaroids || '/images/polaroids/';
  const PAL = { K: '#202024', S: '#dfddd4', H: '#f7f6f1', B: '#383a42', D: '#2a2c33', R: '#d9573b', L: '#4299e1', C: '#2b6cb0', W: '#ffffff', Y: '#f6c244', G: '#48bb78' };
  const PHOTOS = {
    eurosys: dir + 'eurosys2026.jpg', calton: dir + 'edinburgh_calton.jpg', cuhkLake: dir + 'cuhk_lake.jpg',
    cuhkPav: dir + 'cuhk_pavilion.jpg', hust: dir + 'hust_gate.jpg', bytedance: dir + 'bytedance.jpg',
    sjtu: dir + 'sjtu.jpg', stars: dir + 'stars.jpg', ccf: dir + 'honor_ccf.jpg',
    nat24: dir + 'honor_nat24.jpg', nat23: dir + 'honor_nat23.jpg', noip: dir + 'honor_noip.jpg'
  };
  const ALL_POOL = Object.values(PHOTOS);

  const sp = s => s.split('/');
  const BODY = '....KKK..RR......./...KSHSKKKKK....../..KSHHHHHHHSK...../..KKKKKKKKKKK...../..KBBBBBBBBBK.....';
  const LENS = '..KBBKKKKBBBK...../..KBKLLLLKBBK...../..KBKLWWCKBBK...../..KBBKKKKBBBK.....';
  const BASE = {
    idle: sp(`${BODY}/..KBWBBBBWBBK...../${LENS}/..KBBBBDDDDDK...../..KKKKKKKKKKK...../....KK...KK......./...KKK...KKK....../..................`),
    blink: sp(`${BODY}/..KBBBBBBBBBK...../${LENS}/..KBBBBDDDDDK...../..KKKKKKKKKKK...../....KK...KK......./...KKK...KKK....../..................`),
    sit: sp(`..................` + `/${BODY}/..KBWBBBBWBBK...../${LENS}/..KKKKKKKKKKK...../...KKK...KKK....../................../..................`),
    sitBlink: sp(`..................` + `/${BODY}/..KBBBBBBBBBK...../${LENS}/..KKKKKKKKKKK...../...KKK...KKK....../................../..................`),
    walk1: sp(`${BODY}/..KBWBBBBWBBK...../${LENS}/..KBBBBDDDDDK...../..KKKKKKKKKKK...../...KK.....KK....../..KKK......KK...../..................`),
    walk2: sp(`..................` + `/${BODY}/..KBWBBBBWBBK...../${LENS}/..KKKKKKKKKKK...../.....KK.KK......../....KKK.KKK......./..................`),
    focus: sp(`${BODY}/..KBWBBBBWBBK...../..KBBKKKKKBBK...../..KBKKKKLLLLK...../..KBKKKLLWWLK...../..KBKKKKLCCLK...../..KBBKKKKKBBK...../..KKKKKKKKKKK...../....KK...KK......./...KKK...KKK....../..................`),
    flash: sp(`.Y..KKK..RRY.Y..../..YKSHSKKKKK.Y..../.YKSHHHHHHHSK...../..KKKKKKKKKKK...../.KKBBBBBBBBBK...../K.KWWBBBBWWBK.K.../..KBBKKKKBBBK...../..KBKWWWWKBBK...../..KBKWYYWKBBK...../..KBBKKKKBBBK...../..KBBBBDDDDDK...../...KKKKKKKKK....../...KK.....KK....../................../..................`),
    dangle: sp(`${BODY.slice(0, -18)}.KKBBBBBBBBBKK..../K.KWBBBBBBWBK.K.../${LENS}/..KKKKKKKKKKK...../....KK...KK......./....KK...KK......./...KK.....KK....../..................`)
  };
  const HATS = {
    phd: sp('....KKKKKKK......./..KKKKKKKKKKK...../....KKKKKKK.Y...../............Y.....'),
    crown: sp('....Y..Y..Y......./....YYYYYYY......./....KKKKKKK.......'),
    star: sp('.......Y........../......YYY........./.......Y..........')
  };
  const ICONS = {
    phd: sp('...KK.../.KKKKKK./KKKKKKKK/..KKKK.Y/..KKKK.Y/.......Y/......../........'),
    chip: sp('.K.KK.K./KKKKKKKK/.KGGGGK./KKGWWGKK/.KGGGGK./KKKKKKKK/.K.KK.K./........'),
    trophy: sp('.YYYYYY./KYYYYYYK/KYYYYYYK/.KYYYYK./...YY.../...YY.../..KKKK../........'),
    news: sp('..RRRR../.RWWWWR./.RWRRWR./.RWWWWR./..RRRR../...KK.../...KK.../........'),
    mail: sp('KKKKKKKK/KWWWWWWK/KWRRRRWK/KWWWRWWK/KWWWWWWK/KKKKKKKK/......../........'),
    github: sp('..KKKK../.KBBBBK./KBWBBWBK/KBBBBBBK/.KBBBBK./..K..K../.KK..KK./........'),
    scholar: sp('...KK.../.KKKKKK./KKKKKKKK/..LLLL.Y/..LLLL.Y/......../......../........'),
    cv: sp('.KKKKKK./.KWWWWK./.KWRRWK./.KWWWWK./.KWLLWK./.KWWWWK./.KKKKKK./........'),
    gallery: sp('..KKRR../KKKKKKKK/KBLLLLBK/KBLWWLBK/KBLLLLBK/KKKKKKKK/......../........')
  };

  const paintGrid = (ctx, g, ox = 0, oy = 0) => {
    for (let y = 0; y < g.length; y++)
      for (let x = 0; x < g[y].length; x++)
        if (PAL[g[y][x]]) { ctx.fillStyle = PAL[g[y][x]]; ctx.fillRect(x + ox, y + oy, 1, 1); }
  };

  const miniCanvas = key => {
    const c = document.createElement('canvas');
    c.width = c.height = 8;
    if (ICONS[key]) paintGrid(c.getContext('2d'), ICONS[key]);
    return c;
  };

  const renderSprite = (ctx, pose, dx = 0, hat = null) => {
    ctx.clearRect(0, 0, 18, 20);
    paintGrid(ctx, BASE[pose] || BASE.idle, 0, 5);
    if ((pose === 'idle' || pose === 'sit') && dx) {
      const ey = (pose === 'sit' ? 6 : 5) + 5, ox = Math.max(-1, Math.min(1, Math.round(dx)));
      ctx.fillStyle = PAL.B; ctx.fillRect(4, ey, 1, 1); ctx.fillRect(9, ey, 1, 1);
      ctx.fillStyle = PAL.W; ctx.fillRect(4 + ox, ey, 1, 1); ctx.fillRect(9 + ox, ey, 1, 1);
    }
    if (hat && HATS[hat]) paintGrid(ctx, HATS[hat], 0, (pose.startsWith('sit') ? 6 : 5) - HATS[hat].length);
  };

  const burst = (cx, cy, color = '#f6c244', n = 8) => {
    for (let i = 0; i < n; i++) {
      const p = document.createElement('div');
      p.className = 'px-particle'; p.style.background = color;
      document.body.append(p);
      let px = cx, py = cy, vx = (Math.random() - .5) * 6, vy = -Math.random() * 5 - 2, life = 28;
      const t = () => {
        px += vx; py += vy; vy += .32;
        p.style.left = px + 'px'; p.style.top = py + 'px'; p.style.opacity = (--life / 28).toFixed(2);
        life > 0 ? requestAnimationFrame(t) : p.remove();
      };
      requestAnimationFrame(t);
    }
  };

  const flashRing = (cx, cy) => {
    const r = document.createElement('div');
    r.className = 'shutter-ring'; r.style.left = cx + 'px'; r.style.top = cy + 'px';
    document.body.append(r); setTimeout(() => r.remove(), 420);
  };

  const wrap = document.createElement('div');
  wrap.className = 'pet-wrap';
  wrap.innerHTML = '<canvas class="pet-canvas" width="18" height="20"></canvas>';
  const vf = document.createElement('div');
  vf.className = 'vf-box';
  vf.innerHTML = '<i></i><i></i><i></i><i></i><div class="vf-cross"></div><button type="button" class="vf-snap" aria-label="Snap"></button>';
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button'; clearBtn.className = 'pol-clear';
  document.body.append(wrap, vf, clearBtn);

  const cv = wrap.firstChild, ctx = cv.getContext('2d'), FOOT_Y = 57;
  let x = 200, y = 100, dragging = false, pose = 'sit', hat = null, mx = innerWidth / 2, my = innerHeight / 2;
  let curTarget = null, lastTarget = null, vfTimer = null, walkGoalX = null, walkLineY = null, restTicks = 540, chasingScroll = false;
  let busySnap = false, snapSeq = 0, activePerchKey = '', rotSeed = 0, lastScrollY = scrollY;
  const polaroids = [];

  const syncClearBtn = () => {
    clearBtn.textContent = `× Clear (${polaroids.length})`;
    clearBtn.classList.toggle('show', polaroids.length >= 2);
  };
  const removePolaroid = entry => {
    if (!entry) return;
    const i = polaroids.indexOf(entry);
    if (i >= 0) polaroids.splice(i, 1);
    entry.card.classList.add('out');
    setTimeout(() => entry.card.remove(), 220);
    syncClearBtn();
  };
  clearBtn.onclick = () => [...polaroids].forEach((p, i) => setTimeout(() => removePolaroid(p), i * 45));

  const photoFor = el => {
    if (el.dataset?.photo) return el.dataset.photo;
    if (el.matches('.left img, .photos img')) return el.src;
    const t = (el.textContent || '').toLowerCase();
    if (el.matches('#publications')) return PHOTOS.eurosys;
    if (el.matches('.news-side li')) return t.includes('eurosys') ? PHOTOS.calton : PHOTOS.cuhkLake;
    if (el.matches('#education li')) return t.includes('hong kong') ? PHOTOS.cuhkPav : PHOTOS.hust;
    if (el.matches('#internships li')) return t.includes('bytedance') ? PHOTOS.bytedance : PHOTOS.sjtu;
    if (el.matches('#honors li')) {
      if (t.includes('noip') || t.includes('olympiad')) return PHOTOS.noip;
      if (t.includes('ccf')) return PHOTOS.ccf;
      if (t.includes('2024')) return PHOTOS.nat24;
      if (t.includes('2023')) return PHOTOS.nat23;
      const used = new Set(polaroids.map(p => p.url));
      return ALL_POOL.find(u => !used.has(u)) || PHOTOS.ccf;
    }
    if (el.matches('.motto')) return PHOTOS.stars;
    return null;
  };

  const findFreeSpot = () => {
    const mob = innerWidth <= 720, cw = mob ? 80 : 110, ch = mob ? 94 : 128, px = cw + 10, py = ch + 12;
    const hit = (cx, cy) => polaroids.some(p => Math.abs(cx - p.tx) < px && Math.abs(cy - p.ty) < py);
    const cands = [];
    if (mob) {
      const cols = Math.max(2, Math.floor((innerWidth - 20) / px)), baseY = scrollY + innerHeight - ch - 58;
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < cols; c++) cands.push([innerWidth - 14 - cw - c * px, Math.max(scrollY + 58, baseY - r * py)]);
    } else if (innerWidth >= 1290) {
      const m = (innerWidth - 1050) / 2, lx = Math.max(14, Math.round(m - cw - 10)), rx = Math.min(innerWidth - cw - 14, Math.round(innerWidth - m + 10));
      for (let r = 0; r < 5; r++) cands.push([lx, scrollY + 78 + r * py], [rx, scrollY + 78 + r * py]);
    } else {
      const nr = (document.querySelector('.news-side') || document.querySelector('.left')).getBoundingClientRect();
      const sy = Math.max(scrollY + 78, Math.round(nr.bottom + scrollY + 20)), lx = Math.max(14, Math.round(nr.left + scrollX)), rx = innerWidth - cw - 16;
      for (let r = 0; r < 4; r++) {
        if (sy + r * py < scrollY + innerHeight - 40) cands.push([lx, sy + r * py], [lx + px, sy + r * py]);
        cands.push([rx, scrollY + 78 + r * py]);
      }
    }
    for (const c of cands) if (!hit(c[0], c[1])) return c;
    for (let gy = scrollY + 74; gy < scrollY + innerHeight + 500; gy += 36)
      for (let gx = 16; gx <= innerWidth - cw - 16; gx += 36) if (!hit(gx, gy)) return [gx, gy];
    return [20, scrollY + 80];
  };

  const ejectPolaroid = (sourceEl, ox, oy) => {
    removePolaroid(polaroids.find(p => p.sourceEl === sourceEl));
    const url = photoFor(sourceEl);
    if (!url) return;
    while (polaroids.length >= (innerWidth <= 720 ? 4 : 6)) removePolaroid(polaroids[0]);

    const [dx, dy] = findFreeSpot();
    const card = document.createElement('div');
    card.className = 'polaroid';
    const im = document.createElement('img');
    im.src = url;
    if (sourceEl.style?.objectPosition) im.style.objectPosition = sourceEl.style.objectPosition;
    const btnX = document.createElement('button');
    btnX.type = 'button'; btnX.className = 'pol-x'; btnX.setAttribute('aria-label', 'Remove photo'); btnX.textContent = '×';
    card.append(im, btnX);
    card.style.left = ox + 'px'; card.style.top = oy + 'px'; card.style.transform = 'scale(.3) rotate(0deg)';
    document.body.append(card);

    const entry = { card, sourceEl, url, tx: dx, ty: dy };
    polaroids.push(entry); syncClearBtn();
    btnX.onpointerdown = e => e.stopPropagation();
    btnX.onclick = e => (e.stopPropagation(), removePolaroid(entry));

    const rot = ((++rotSeed % 2 ? 1 : -1) * (2 + (rotSeed * 1.7) % 3.8)).toFixed(1);
    requestAnimationFrame(() => { card.style.left = dx + 'px'; card.style.top = dy + 'px'; card.style.transform = `scale(1) rotate(${rot}deg)`; });

    let pd = false, rx = 0, ry = 0, moved = false, lx = 0, vx = 0;
    card.onpointerdown = e => {
      e.stopPropagation(); pd = true; moved = false; vx = 0; lx = e.clientX;
      card.classList.add('dragging'); rx = e.pageX - parseFloat(card.style.left); ry = e.pageY - parseFloat(card.style.top);
      card.setPointerCapture(e.pointerId);
    };
    card.onpointermove = e => {
      if (!pd) return;
      if (Math.abs(e.clientX - lx) > 2) moved = true;
      vx = e.clientX - lx; lx = e.clientX;
      card.style.left = (e.pageX - rx) + 'px'; card.style.top = (e.pageY - ry) + 'px';
    };
    card.onpointerup = e => {
      if (!pd) return;
      pd = false; card.classList.remove('dragging');
      if (Math.abs(vx) > 22 || e.clientX < 16 || e.clientX > innerWidth - 16) removePolaroid(entry);
      else { entry.tx = parseFloat(card.style.left); entry.ty = parseFloat(card.style.top); if (!moved) sourceEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    };
  };

  const TARGET_SEL = '.left img, .left h1, .motto, .icons a, .news-side li, #about p, #publications, #education li, #internships li, #honors li, .photos img, .theme-btn';
  const showVf = el => {
    if (!el) return;
    clearTimeout(vfTimer); curTarget = lastTarget = el;
    const r = el.getBoundingClientRect(), p = el.matches('.icons a, .theme-btn') ? 4 : 6;
    vf.style.left = (r.left + scrollX - p) + 'px'; vf.style.top = (r.top + scrollY - p) + 'px';
    vf.style.width = (r.width + p * 2) + 'px'; vf.style.height = (r.height + p * 2) + 'px';
    vf.classList.toggle('needs-btn', el.matches('.photos img, .icons a'));
    vf.classList.remove('locked'); vf.classList.add('on');
    setTimeout(() => curTarget === el && vf.classList.add('locked'), 180);
  };
  const hideVf = () => { clearTimeout(vfTimer); vfTimer = setTimeout(() => { vf.classList.remove('on', 'locked'); curTarget = null; }, 320); };

  document.querySelectorAll(TARGET_SEL).forEach(el => {
    el.addEventListener('mouseenter', () => !dragging && showVf(el));
    el.addEventListener('mouseleave', () => !dragging && hideVf());
    el.addEventListener('click', e => {
      if (el.matches('.theme-btn') || e.target.closest('a')) return;
      e.stopPropagation(); runAndSnap(el);
    });
  });
  vf.onmouseenter = () => clearTimeout(vfTimer);
  vf.onmouseleave = () => !dragging && hideVf();
  vf.querySelector('.vf-snap').onclick = e => (e.preventDefault(), e.stopPropagation(), (curTarget || lastTarget) && runAndSnap(curTarget || lastTarget));

  const snapEffect = el => {
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    flashRing(cx, cy);
    el.classList.remove('snap-jolt'); void el.offsetWidth; el.classList.add('snap-jolt');
    const unPol = () => removePolaroid(polaroids.find(p => p.sourceEl === el));

    if (el.matches('.left img, .photos img')) {
      el.classList.toggle('is-pixelated') ? ejectPolaroid(el, x, y) : unPol();
    } else if (el.matches('#about p')) {
      const ms = el.querySelectorAll('.hl-mark');
      if (ms.length) { ms.forEach(m => { while (m.firstChild) m.before(m.firstChild); m.remove(); }); el.normalize(); }
      else {
        const re = /(AI infrastructure|large-scale distributed training|The Chinese University of Hong Kong|ByteDance Seed|Shanghai Jiao Tong University|Huazhong University of Science and Technology)/;
        const reG = new RegExp(re.source, 'g'), w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), ns = [];
        while (w.nextNode()) ns.push(w.currentNode);
        let d = 0;
        ns.forEach(tn => {
          if (!re.test(tn.nodeValue)) return;
          const f = document.createDocumentFragment(); let last = 0;
          tn.nodeValue.replace(reG, (m, _, idx) => {
            if (idx > last) f.append(tn.nodeValue.slice(last, idx));
            const s = document.createElement('span'); s.className = 'hl-mark'; s.style.animationDelay = (d++ * 85) + 'ms'; s.textContent = m;
            f.append(s); last = idx + m.length;
          });
          if (last < tn.nodeValue.length) f.append(tn.nodeValue.slice(last));
          tn.replaceWith(f);
        });
      }
    } else if (el.matches('#publications')) {
      const ms = el.querySelectorAll('.hl-mark');
      if (ms.length) { ms.forEach(m => m.replaceWith(...m.childNodes)); unPol(); }
      else {
        el.querySelectorAll('h3 a, strong, em').forEach((n, i) => {
          const s = document.createElement('span'); s.className = 'hl-mark'; s.style.animationDelay = (i * 90) + 'ms';
          n.before(s); s.append(n);
        });
        ejectPolaroid(el, x, y);
      }
    } else if (el.matches('#education li, #internships li, #honors li, .news-side li')) {
      const old = el.querySelector('.px-stamp');
      if (old) { old.remove(); unPol(); }
      else {
        const k = el.matches('#education li') ? 'phd' : el.matches('#internships li') ? 'chip' : el.matches('#honors li') ? 'trophy' : 'news';
        const st = miniCanvas(k); st.className = 'px-stamp'; el.append(st);
        if (k === 'phd') hat = 'phd'; else if (k === 'trophy') hat = 'crown';
        if (k === 'trophy' || k === 'news') burst(cx + scrollX, cy + scrollY, k === 'trophy' ? '#f6c244' : '#d9573b', 10);
        ejectPolaroid(el, x, y);
      }
    } else if (el.matches('.left h1')) {
      el.classList.toggle('is-px-text');
    } else if (el.matches('.motto')) {
      hat === 'star' ? (hat = null, unPol()) : (hat = 'star', burst(cx + scrollX, cy + scrollY, '#f6c244', 12), ejectPolaroid(el, x, y));
    } else if (el.matches('.icons a')) {
      if (el.classList.contains('px-ico')) { el.classList.remove('px-ico'); el.querySelector('canvas')?.remove(); }
      else {
        const l = (el.getAttribute('aria-label') || '').toLowerCase();
        el.append(miniCanvas(l.includes('mail') ? 'mail' : l.includes('git') ? 'github' : l.includes('scholar') ? 'scholar' : l.includes('cv') ? 'cv' : 'gallery'));
        el.classList.add('px-ico');
      }
    } else if (el.matches('.theme-btn')) {
      const root = document.documentElement;
      root.dataset.theme = localStorage.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    }
  };

  function runAndSnap(el) {
    if (!el) return;
    const seq = ++snapSeq;
    busySnap = true; chasingScroll = false; walkGoalX = null; showVf(el);
    const r = el.getBoundingClientRect();
    const dx = Math.min(document.documentElement.clientWidth - 60, Math.max(12, r.right + scrollX - 46));
    let dy = r.top + scrollY - FOOT_Y;
    if (dy < scrollY + 52) dy = r.bottom + scrollY - FOOT_Y + 12;
    const sx = x, sy = y, dist = Math.hypot(dx - sx, dy - sy), steps = Math.max(10, Math.min(26, Math.round(dist / 18)));
    cv.classList.toggle('pet-flip', (r.left + r.width / 2) < (dx - scrollX + 27));
    let k = 0;
    const hop = () => {
      if (seq !== snapSeq) return;
      const t = ++k / steps, e = 1 - Math.pow(1 - t, 3);
      x = sx + (dx - sx) * e; y = sy + (dy - sy) * e - Math.sin(t * Math.PI) * Math.min(34, dist * .16);
      pose = k % 4 < 2 ? 'walk1' : 'walk2';
      if (k < steps) requestAnimationFrame(hop);
      else {
        pose = 'focus';
        setTimeout(() => seq === snapSeq && (pose = 'flash', snapEffect(el), setTimeout(() => {
          if (seq === snapSeq) { pose = 'sit'; walkLineY = y; restTicks = 840; busySnap = false; }
        }, 380)), 180);
      }
    };
    requestAnimationFrame(hop);
  }

  const collectPerches = () => {
    const list = [], mob = innerWidth <= 720, ava = document.querySelector('.left img'), icons = document.querySelector('.icons'), left = document.querySelector('.left');
    if (mob) {
      if (ava) { const r = ava.getBoundingClientRect(); list.push({ key: 'm-ava', vy: r.bottom, docY: r.bottom + scrollY - FOOT_Y, minX: r.right + scrollX + 8, maxX: document.documentElement.clientWidth - 62 }); }
      if (icons) { const r = icons.getBoundingClientRect(); list.push({ key: 'm-ico', vy: r.bottom, docY: r.bottom + scrollY - FOOT_Y, minX: 190, maxX: r.right + scrollX - 52 }); }
      if (left) { const r = left.getBoundingClientRect(); list.push({ key: 'm-abt', vy: r.bottom, docY: r.bottom + scrollY - FOOT_Y, minX: 120, maxX: r.right + scrollX - 52 }); }
    } else if (ava) {
      const r = ava.getBoundingClientRect();
      if (r.top >= 94) list.push({ key: 'd-ava', vy: r.top, docY: r.top + scrollY - FOOT_Y, minX: r.left + scrollX, maxX: r.right + scrollX - 48 });
      else if (icons) { const ir = icons.getBoundingClientRect(); list.push({ key: 'd-ico', vy: ir.bottom, docY: ir.bottom + scrollY - FOOT_Y, minX: ir.left + scrollX + 80, maxX: ir.right + scrollX - 46 }); }
    }
    document.querySelectorAll('.sec').forEach(s => {
      const r = s.getBoundingClientRect();
      list.push({ key: 's-' + s.id, vy: r.top, docY: r.top + scrollY - FOOT_Y, minX: r.left + scrollX + Math.min(200, r.width * .38), maxX: r.right + scrollX - 52 });
    });
    if (mob) {
      const ps = document.querySelectorAll('.photos img');
      if (ps.length) { const r = ps[ps.length - 1].getBoundingClientRect(); list.push({ key: 'm-end', vy: r.top, docY: r.top + scrollY - FOOT_Y, minX: r.left + scrollX + 10, maxX: r.right + scrollX - 48 }); }
    }
    return list;
  };

  const syncScroll = (force = false) => {
    if (dragging || busySnap) return;
    const ps = collectPerches();
    if (!ps.length) return;
    const minY = innerWidth <= 720 ? 96 : 92, maxY = innerHeight - 20;
    const prog = Math.min(1, Math.max(0, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)));
    const vis = ps.filter(p => p.vy >= minY && p.vy <= maxY), focal = minY + 24 + prog * (maxY - minY - 64), pool = vis.length ? vis : ps;
    const chosen = innerWidth > 720 && scrollY < 40 ? ps[0] : pool.reduce((b, p) => Math.abs(p.vy - focal) < Math.abs(b.vy - focal) ? p : b, pool[0]);
    if (force || chosen.key !== activePerchKey) {
      activePerchKey = chosen.key; walkLineY = chosen.docY; walkGoalX = Math.max(chosen.minX, chosen.maxX); chasingScroll = true;
    } else walkLineY = chosen.docY;
  };

  setTimeout(() => { syncScroll(true); if (walkGoalX !== null) { x = walkGoalX; y = walkLineY; walkGoalX = null; chasingScroll = false; } }, 60);
  addEventListener('resize', () => syncScroll(true));
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  let sx = 0, sy = 0, moved = false;
  wrap.onpointerdown = e => {
    e.stopPropagation(); snapSeq++; busySnap = chasingScroll = moved = false; dragging = true; walkGoalX = null;
    sx = e.clientX; sy = e.clientY; wrap.setPointerCapture(e.pointerId); pose = 'dangle';
  };
  wrap.onpointermove = e => {
    mx = e.clientX; my = e.clientY;
    if (!dragging) return;
    if (Math.hypot(e.clientX - sx, e.clientY - sy) > 4) moved = true;
    x = e.pageX - 27; y = e.pageY - 30;
    wrap.style.pointerEvents = 'none';
    const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest(TARGET_SEL);
    wrap.style.pointerEvents = '';
    hit ? showVf(hit) : hideVf();
  };
  wrap.onpointerup = () => {
    if (!dragging) return;
    dragging = false;
    if (!moved) lastTarget ? runAndSnap(lastTarget) : (pose = 'flash', flashRing(mx, my), setTimeout(() => pose = 'sit', 400));
    else if (curTarget) { const t = curTarget; pose = 'flash'; snapEffect(t); setTimeout(() => { pose = 'sit'; restTicks = 840; }, 400); }
    else { pose = 'sit'; walkLineY = y; restTicks = 840; }
  };

  let frame = 0;
  const tick = () => {
    frame++;
    if (Math.abs(scrollY - lastScrollY) > 1) { lastScrollY = scrollY; syncScroll(false); }
    if (!dragging && !busySnap) {
      if (walkGoalX !== null || (walkLineY !== null && Math.abs(walkLineY - y) > 2)) {
        const gx = walkGoalX ?? x, gy = walkLineY ?? y, dx = gx - x, dy = gy - y;
        if (Math.hypot(dx, dy) > 2) {
          if (chasingScroll || Math.abs(dy) > 5) {
            x += dx * .22; y = Math.max(scrollY + 36, Math.min(scrollY + innerHeight - 24, y + dy * .22));
          } else { x += Math.sign(dx) * Math.min(Math.abs(dx), .42); y = gy; }
          if (Math.abs(dx) > 1.5) cv.classList.toggle('pet-flip', dx < 0);
          pose = (Math.floor(frame / 9) % 2) ? 'walk1' : 'walk2';
        } else { x = gx; y = gy; walkGoalX = null; chasingScroll = false; pose = 'sit'; restTicks = 720 + Math.floor(Math.random() * 360); }
      } else if (curTarget) {
        pose = 'focus';
        const tr = curTarget.getBoundingClientRect();
        cv.classList.toggle('pet-flip', (tr.left + tr.width / 2) < (x - scrollX + 27));
      } else {
        pose = 'sit';
        if (--restTicks <= 0) {
          const cur = collectPerches().find(p => p.key === activePerchKey);
          if (cur && cur.maxX - cur.minX > 40) {
            walkLineY = cur.docY;
            walkGoalX = Math.max(cur.minX, Math.min(cur.maxX, x + (Math.random() < .5 ? -1 : 1) * (50 + Math.random() * 60)));
            chasingScroll = false;
          } else { pose = 'idle'; restTicks = 720; }
        }
      }
    }
    wrap.style.transform = `translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`;
    if (frame % 4 === 0) {
      const r = wrap.getBoundingClientRect();
      const look = Math.hypot(mx - (r.left + 27), my - (r.top + 30)) < 340 ? (mx - (r.left + 27)) / 140 : 0;
      let dp = dragging ? 'dangle' : pose;
      if (dp === 'sit' && frame % 320 < 8) dp = 'sitBlink';
      else if (dp === 'idle' && frame % 320 < 8) dp = 'blink';
      renderSprite(ctx, dp, look, hat);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
