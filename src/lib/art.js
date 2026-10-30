/**
 * Temporary product illustrations, drawn as inline SVG (no image files, nothing to download).
 * Every function is pure and returns an <svg> string, so the same code runs at build time
 * and in the browser. Replace with real photos via `image` on a product in src/data/menu.js.
 */
const rng = (seed) => {
  let s = 2166136261;
  for (const c of String(seed)) s = Math.imul(s ^ c.charCodeAt(0), 16777619) >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
};
const f = (n) => n.toFixed(1);
let uid = 0;
const nextId = (p) => `${p}${++uid}`;

const GLAZE = {
  cream: { fill: '#fffaf2', shade: '#efdcc4', cover: 0.66 },
  nutella: { fill: '#5b2e15', shade: '#3c1c0b', cover: 0.6 },
  caramel: { fill: '#d98a2b', shade: '#a9601a', cover: 0.56 },
  lotus: { fill: '#c78a4f', shade: '#9a6230', cover: 0.58 },
  pink: { fill: '#ffc2d2', shade: '#f08aa8', cover: 0.64 },
  maple: { fill: '#f6deb0', shade: '#d9b273', cover: 0.62 },
};
const BG = {
  cream: ['#ffe9dc', '#ffd2bd'], nutella: ['#ffe3d3', '#f0bd8b'], caramel: ['#ffeadf', '#ffc79f'],
  lotus: ['#fff1ea', '#f0cfa8'], pink: ['#ffe6ee', '#ffc2d2'], maple: ['#fff4e3', '#f6d9b0'],
  box: ['#ffe9ef', '#ffc9d8'], tray: ['#fff1ea', '#ffd9c2'], cluster: ['#ffeadf', '#fed1b6'], cookies: ['#fff4ea', '#ffdcbd'],
};

/* ---------- primitives ---------- */
function spiral(cx, cy, r0, r1, turns, phase) {
  const steps = Math.round(turns * 56);
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const th = phase + t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * Math.pow(t, 0.92);
    d += `${i ? 'L' : 'M'}${f(cx + r * Math.cos(th))} ${f(cy + r * Math.sin(th))}`;
  }
  return d;
}

// Closed smooth blob with optional drips, used for glaze.
function blob(cx, cy, r, rand, drips) {
  const n = 64;
  const phase = rand() * 6.28;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const th = (i / n) * Math.PI * 2;
    let rr = r * (1 + 0.045 * Math.sin(5 * th + phase) + 0.03 * Math.sin(9 * th + phase * 2));
    for (const d of drips) {
      let diff = Math.abs(th - d.a);
      diff = Math.min(diff, Math.PI * 2 - diff);
      const k = 1 - Math.pow(diff / d.w, 2);
      if (k > 0) rr += d.len * Math.pow(k, 1.6);
    }
    pts.push([cx + rr * Math.cos(th), cy + rr * Math.sin(th)]);
  }
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let m = mid(pts[n - 1], pts[0]);
  let d = `M${f(m[0])} ${f(m[1])}`;
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const q = mid(p, pts[(i + 1) % n]);
    d += `Q${f(p[0])} ${f(p[1])} ${f(q[0])} ${f(q[1])}`;
  }
  return d + 'Z';
}

function scatter(rand, cx, cy, R, count, draw) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const rr = Math.sqrt(rand()) * R;
    out += draw(cx + rr * Math.cos(a), cy + rr * Math.sin(a), rand() * 360, rand, i);
  }
  return out;
}

const TOPPING = {
  hazelnut: (x, y, rot, rand) => {
    const s = 7 + rand() * 3;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><ellipse rx="${f(s)}" ry="${f(s * 0.85)}" fill="#a8652f"/><ellipse rx="${f(s * 0.55)}" ry="${f(s * 0.4)}" cx="${f(-s * 0.2)}" cy="${f(-s * 0.2)}" fill="#d9a16a" opacity=".8"/></g>`;
  },
  pecan: (x, y, rot) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><ellipse rx="13" ry="7" fill="#7a3e15"/><path d="M-10 0H10M-6-4 -4 0-6 4M0-5 2 0 0 5M6-4 8 0 6 4" stroke="#4e2408" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`,
  crumbs: (x, y, rot, rand) => {
    const w = 5 + rand() * 7, h = 4 + rand() * 5;
    return `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="2" fill="${rand() > 0.5 ? '#b5793f' : '#d9a464'}" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`;
  },
  strawberry: (x, y, rot) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><path d="M0 -13C9 -13 13 -5 11 3C9 10 3 14 0 15C-3 14-9 10-11 3C-13-5-9-13 0-13Z" fill="#e2364f"/><path d="M0 -8C5 -8 7 -3 6 2C5 6 2 9 0 10C-2 9-5 6-6 2C-7-3-5-8 0-8Z" fill="#ff8a9e" opacity=".75"/><circle cx="-4" cy="-2" r="1" fill="#ffe08a"/><circle cx="3" cy="1" r="1" fill="#ffe08a"/><circle cx="0" cy="6" r="1" fill="#ffe08a"/></g>`,
  dust: (x, y, rot, rand) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(1 + rand() * 1.6)}" fill="#a0521d" opacity=".75"/>`,
  sprinkles: (x, y, rot, rand) => `<rect x="${f(x - 4)}" y="${f(y - 1.5)}" width="8" height="3" rx="1.5" fill="${['#e11170', '#ffb1c4', '#ffffff', '#ffa26a'][Math.floor(rand() * 4)]}" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`,
  salt: (x, y, rot) => `<rect x="${f(x - 2)}" y="${f(y - 2)}" width="4" height="4" fill="#ffffff" opacity=".9" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`,
};

/* One top-down cinnamon roll. */
function roll(cx, cy, r, opt, seed) {
  const rand = rng(seed);
  const id = nextId('r');
  const g = GLAZE[opt.glaze] || GLAZE.cream;
  let s = `<defs><radialGradient id="${id}d" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#f0c27f"/><stop offset=".7" stop-color="#d9934c"/><stop offset="1" stop-color="#b8692f"/></radialGradient><clipPath id="${id}c"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"/></clipPath></defs>`;
  s += `<ellipse cx="${f(cx + r * 0.06)}" cy="${f(cy + r * 0.12)}" rx="${f(r * 1.04)}" ry="${f(r * 1.0)}" fill="#2d1606" opacity=".16"/>`;
  s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="url(#${id}d)"/>`;
  s += `<path d="${spiral(cx, cy, r * 0.04, r * 0.93, 3.3, rand() * 6.28)}" fill="none" stroke="#7d3a12" stroke-width="${f(r * 0.085)}" stroke-linecap="round" opacity=".88"/>`;
  s += `<path d="${spiral(cx, cy, r * 0.1, r * 0.86, 3.3, 0.5)}" fill="none" stroke="#f6d39b" stroke-width="${f(r * 0.03)}" stroke-linecap="round" opacity=".55" clip-path="url(#${id}c)"/>`;
  if (opt.glaze) {
    const base = r * g.cover;
    const lobes = [];
    for (let i = 0; i < 4; i++) lobes.push({ a: rand() * 6.28, w: 0.5 + rand() * 0.3, len: base * (0.06 + rand() * 0.08) });
    const bp = blob(cx, cy, base, rand, lobes);
    // drips: rounded capsules running from the glaze edge over the dough
    let drips = '';
    const nd = 4 + Math.floor(rand() * 3);
    const off = rand() * 6.28;
    for (let i = 0; i < nd; i++) {
      const a = off + (i / nd) * 6.28 + (rand() - 0.5) * 0.5;
      const len = r * (0.06 + rand() * 0.12);
      const w = r * (0.17 + rand() * 0.08);
      const x1 = cx + base * 0.85 * Math.cos(a), y1 = cy + base * 0.85 * Math.sin(a);
      const x2 = cx + (base + len) * Math.cos(a), y2 = cy + (base + len) * Math.sin(a);
      drips += `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke-width="${f(w)}"/>`;
    }
    const dripG = (fill, tr) => `<g stroke="${fill}" stroke-linecap="round" fill="none"${tr ? ` transform="${tr}"` : ''}>${drips}</g>`;
    const shadowTr = `translate(${f(r * 0.03)} ${f(r * 0.05)})`;
    s += `<g opacity=".5"><path d="${bp}" fill="${g.shade}" transform="${shadowTr}"/>${dripG(g.shade, shadowTr)}</g>`;
    s += `<path d="${bp}" fill="${g.fill}"/>${dripG(g.fill)}`;
    s += `<path d="${spiral(cx, cy, r * 0.05, base * 0.9, 2.6, 1.2)}" fill="none" stroke="${g.shade}" stroke-width="${f(r * 0.03)}" opacity=".35" stroke-linecap="round"/>`;
    s += `<path d="M${f(cx - base * 0.62)} ${f(cy - base * 0.2)}A${f(base * 0.66)} ${f(base * 0.66)} 0 0 1 ${f(cx - base * 0.18)} ${f(cy - base * 0.62)}" stroke="#ffffff" stroke-width="${f(r * 0.05)}" fill="none" stroke-linecap="round" opacity=".5"/>`;
  }
  if (opt.drizzle) {
    const dc = (GLAZE[opt.drizzle] || GLAZE.cream).fill;
    let d = '';
    const lines = 4;
    for (let i = 0; i < lines; i++) {
      const y = cy - r * 0.6 + (i / (lines - 1)) * r * 1.2;
      const amp = r * 0.09;
      d += `M${f(cx - r * 1.1)} ${f(y)}`;
      for (let k = 0; k < 6; k++) {
        const x0 = cx - r * 1.1 + k * r * 0.37;
        d += `Q${f(x0 + r * 0.0925)} ${f(y + (k % 2 ? amp : -amp) * 2)} ${f(x0 + r * 0.185)} ${f(y)}T${f(x0 + r * 0.37)} ${f(y)}`;
      }
    }
    s += `<g clip-path="url(#${id}c)"><path d="${d}" fill="none" stroke="${dc}" stroke-width="${f(r * 0.045)}" stroke-linecap="round" opacity=".95" transform="rotate(${f(-25 + rand() * 50)} ${f(cx)} ${f(cy)})"/></g>`;
  }
  if (opt.topping && TOPPING[opt.topping]) {
    const count = { dust: 60, salt: 14, crumbs: 22, sprinkles: 26, hazelnut: 10, pecan: 6, strawberry: 5 }[opt.topping] || 10;
    s += scatter(rand, cx, cy, r * 0.62, count, TOPPING[opt.topping]);
    if (opt.topping === 'pecan') s += scatter(rand, cx, cy, r * 0.6, 12, TOPPING.salt);
  }
  return s;
}

function backdrop(w, h, colors, seed, confetti = true) {
  const id = nextId('b');
  const rand = rng(seed + 'bg');
  let s = `<defs><radialGradient id="${id}" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></radialGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>`;
  if (confetti) {
    for (let i = 0; i < 18; i++) {
      const x = rand() * w, y = rand() * h;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2 + rand() * 3)}" fill="#ffffff" opacity="${f(0.25 + rand() * 0.35)}"/>`;
    }
  }
  return s;
}

const svg = (w, h, body, label) =>
  `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" ${label ? `role="img" aria-label="${String(label).replace(/[<>"&]/g, '')}"` : 'aria-hidden="true"'} focusable="false" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

const MIX = [{ glaze: 'cream' }, { glaze: 'nutella', topping: 'hazelnut' }, { glaze: 'caramel', topping: 'pecan', drizzle: 'cream' }, { glaze: 'lotus', topping: 'crumbs', drizzle: 'cream' }, { glaze: 'cream' }, { glaze: 'nutella', topping: 'hazelnut' }];

/* ---------- product scenes ---------- */
export function product(art, seed, label) {
  const W = 400, H = 300;
  if (!art || art.kind === 'roll') {
    const bg = BG[art && art.glaze] || BG.cream;
    return svg(W, H, backdrop(W, H, bg, seed) + roll(200, 150, 100, art || { glaze: 'cream' }, seed), label);
  }
  if (art.kind === 'box6') {
    let s = backdrop(W, H, BG.box, seed);
    s += `<rect x="38" y="30" width="324" height="240" rx="26" fill="#2d1606" opacity=".14" transform="translate(6 10)"/>`;
    s += `<rect x="38" y="30" width="324" height="240" rx="26" fill="#e11170"/><rect x="52" y="44" width="296" height="212" rx="18" fill="#fff1ea"/>`;
    MIX.forEach((m, i) => { s += roll(100 + (i % 3) * 100, 100 + Math.floor(i / 3) * 100, 42, m, seed + i); });
    return svg(W, H, s, label);
  }
  if (art.kind === 'pair') {
    let s = backdrop(W, H, BG.box, seed);
    s += `<rect x="62" y="58" width="276" height="184" rx="26" fill="#2d1606" opacity=".14" transform="translate(6 10)"/>`;
    s += `<rect x="62" y="58" width="276" height="184" rx="26" fill="#e11170"/><rect x="76" y="72" width="248" height="156" rx="18" fill="#fff1ea"/>`;
    s += roll(140, 150, 62, { glaze: 'cream' }, seed + 'a') + roll(260, 150, 62, { glaze: 'cream' }, seed + 'b');
    return svg(W, H, s, label);
  }
  if (art.kind === 'tray') {
    let s = backdrop(W, H, BG.tray, seed);
    s += `<rect x="24" y="44" width="352" height="222" rx="30" fill="#2d1606" opacity=".14" transform="translate(5 9)"/><rect x="24" y="44" width="352" height="222" rx="30" fill="#e8c49a"/><rect x="36" y="56" width="328" height="198" rx="22" fill="#f3d6b2"/>`;
    const minis = [{ glaze: 'cream' }, { glaze: 'nutella', topping: 'hazelnut' }, { glaze: 'pink', topping: 'sprinkles' }, { glaze: 'caramel', drizzle: 'cream' }];
    for (let i = 0; i < 15; i++) s += roll(70 + (i % 5) * 65, 92 + Math.floor(i / 5) * 63, 27, minis[i % 4], seed + i);
    return svg(W, H, s, label);
  }
  if (art.kind === 'cluster') {
    let s = backdrop(W, H, BG.cluster, seed);
    s += `<circle cx="206" cy="160" r="138" fill="#2d1606" opacity=".15"/><circle cx="200" cy="150" r="138" fill="#5a3b28"/><circle cx="200" cy="150" r="126" fill="#7a5238"/>`;
    s += roll(200, 150, 44, { glaze: 'cream' }, seed + 'c');
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + 0.3; s += roll(200 + 84 * Math.cos(a), 150 + 84 * Math.sin(a), 42, { glaze: 'cream' }, seed + i); }
    return svg(W, H, s, label);
  }
  if (art.kind === 'cookies') {
    let s = backdrop(W, H, BG.cookies, seed);
    const pos = [[120, 105], [230, 90], [320, 150], [150, 210], [255, 205], [70, 190]];
    pos.forEach(([x, y], i) => {
      const rand = rng(seed + i);
      s += `<circle cx="${x + 4}" cy="${y + 7}" r="52" fill="#2d1606" opacity=".14"/><circle cx="${x}" cy="${y}" r="52" fill="#dca263"/><circle cx="${x}" cy="${y}" r="46" fill="#e8b779"/>`;
      s += `<path d="${spiral(x, y, 3, 40, 2.4, rand() * 6)}" fill="none" stroke="#9c5420" stroke-width="5" stroke-linecap="round" opacity=".75"/>`;
      s += `<path d="M${x - 34} ${y - 6}q8.5-14 17 0t17 0 17 0 17 0" fill="none" stroke="#fffaf2" stroke-width="5" stroke-linecap="round" opacity=".9"/>`;
    });
    return svg(W, H, s, label);
  }
  return svg(W, H, backdrop(W, H, BG.cream, seed) + roll(200, 150, 112, { glaze: 'cream' }, seed), label);
}

export function hero(label) {
  const W = 460, H = 420;
  let s = backdrop(W, H, ['#ffe6ee', '#ffc9b0'], 'hero');
  s += `<ellipse cx="236" cy="226" rx="196" ry="188" fill="#2d1606" opacity=".12"/><circle cx="230" cy="214" r="190" fill="#ffffff"/><circle cx="230" cy="214" r="174" fill="#fff6f1"/>`;
  s += roll(230, 210, 150, { glaze: 'cream', topping: 'sprinkles' }, 'hero-roll');
  s += `<g opacity=".55" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"><path d="M180 40c-14 16 14 26 0 44"/><path d="M230 26c-14 18 14 28 0 48"/><path d="M280 40c-14 16 14 26 0 44"/></g>`;
  return svg(W, H, s, label);
}

/* ---------- ingredient scenes ---------- */
export function ingredient(kind, label) {
  const W = 400, H = 260;
  const bgs = { butter: ['#fff8e6', '#ffe7a8'], cinnamon: ['#ffeadf', '#f0bd8b'], vanilla: ['#fff6ec', '#f3dcc0'], chocolate: ['#ffe3d3', '#e2b48c'], flour: ['#fffaf5', '#f1e2d2'] };
  let s = backdrop(W, H, bgs[kind] || bgs.flour, kind, kind !== 'flour');
  if (kind === 'butter') {
    s += `<path d="M70 190 L200 222 L340 178 L210 150Z" fill="#ffffff" opacity=".9"/><path d="M200 222 L210 150" stroke="#eadfcf" stroke-width="2"/>`;
    s += `<path d="M120 112 L230 82 L310 112 L200 142Z" fill="#ffe991"/><path d="M120 112 L200 142 L200 196 L120 166Z" fill="#ffd64f"/><path d="M200 142 L310 112 L310 166 L200 196Z" fill="#f2bf2e"/>`;
    s += `<path d="M150 116 L220 96" stroke="#fff6c9" stroke-width="6" stroke-linecap="round" opacity=".8"/>`;
    s += `<path d="M300 70c22-10 44 4 36 20-6 12-26 10-26 0 0-8 12-10 16-4" fill="none" stroke="#ffd64f" stroke-width="10" stroke-linecap="round"/>`;
  } else if (kind === 'cinnamon') {
    s += `<path d="M60 220 Q130 150 210 220Z" fill="#a85a22"/><path d="M80 220 Q130 170 190 220Z" fill="#c4712f" opacity=".7"/>`;
    [[150, 92, -14], [170, 122, -8], [160, 152, -20]].forEach(([x, y, r]) => {
      s += `<g transform="rotate(${r} ${x + 90} ${y})"><rect x="${x}" y="${y - 12}" width="190" height="24" rx="12" fill="#8f4a1a"/><rect x="${x}" y="${y - 12}" width="190" height="8" rx="4" fill="#b8682d" opacity=".7"/><circle cx="${x + 190}" cy="${y}" r="13" fill="#6e3610"/><path d="${spiral(x + 190, y, 1, 11, 2.2, 0)}" fill="none" stroke="#c98a4f" stroke-width="2"/></g>`;
    });
  } else if (kind === 'vanilla') {
    s += `<g fill="none" stroke-linecap="round"><path d="M60 200 C140 120 240 110 340 70" stroke="#2b160c" stroke-width="15"/><path d="M70 220 C150 150 250 150 350 110" stroke="#3a1f10" stroke-width="15"/><path d="M80 236 C170 186 260 190 340 160" stroke="#2b160c" stroke-width="15"/></g>`;
    s += `<path d="M100 214 C160 168 230 166 300 144" stroke="#120804" stroke-width="5" fill="none" stroke-dasharray="1 6" stroke-linecap="round"/>`;
    s += `<g transform="translate(300 190)">${[0, 72, 144, 216, 288].map((a) => `<ellipse rx="14" ry="30" cy="-24" fill="#fff3d6" transform="rotate(${a})"/>`).join('')}<circle r="10" fill="#f5c04a"/></g>`;
  } else if (kind === 'chocolate') {
    s += `<g transform="rotate(-10 200 130)"><rect x="90" y="60" width="220" height="140" rx="14" fill="#3e1c0c"/>`;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) s += `<rect x="${102 + i * 52}" y="${72 + j * 42}" width="44" height="34" rx="6" fill="#5a2d16"/><rect x="${106 + i * 52}" y="${75 + j * 42}" width="30" height="6" rx="3" fill="#7a4428" opacity=".7"/>`;
    s += `</g><g transform="rotate(18 320 200)"><rect x="290" y="176" width="60" height="44" rx="6" fill="#4a2412"/><rect x="296" y="182" width="48" height="10" rx="4" fill="#6b3a20"/></g>`;
    s += `<path d="M60 210c10-8 22-8 30 0" stroke="#5a2d16" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  } else if (kind === 'flour') {
    s += `<path d="M50 230 C90 120 150 90 200 90 C250 90 310 120 350 230Z" fill="#efe4d8"/><path d="M70 230 C110 140 160 110 200 110 C240 110 290 140 330 230Z" fill="#fffdf9"/>`;
    s += `<g transform="rotate(-24 290 110)"><rect x="250" y="96" width="120" height="16" rx="8" fill="#c8915a"/><ellipse cx="240" cy="104" rx="40" ry="28" fill="#d9a46b"/><ellipse cx="240" cy="100" rx="30" ry="18" fill="#fffdf9"/></g>`;
    s += `<g stroke="#d9a464" stroke-width="3" fill="#e8c27a"><path d="M60 40 L110 150" fill="none"/>${[0, 1, 2, 3].map((i) => `<ellipse cx="${70 + i * 9}" cy="${62 + i * 20}" rx="5" ry="10" transform="rotate(-24 ${70 + i * 9} ${62 + i * 20})"/>`).join('')}</g>`;
  }
  return svg(W, H, s, label);
}

export function video(label) {
  const W = 640, H = 360;
  let s = backdrop(W, H, ['#5a2d16', '#2d1606'], 'video', false);
  for (let i = 0; i < 3; i++) s += roll(170 + i * 150, 190 + (i % 2) * 20, 84, MIX[i], 'v' + i);
  return svg(W, H, s, label);
}

/** Stylised map used on the contact page (no third-party map embeds) */
export function mapArt() {
  const roads = [[0, 120, 800, 90], [0, 260, 800, 300], [180, 0, 220, 400], [520, 0, 470, 400], [0, 360, 800, 330], [320, 0, 380, 400]]
    .map(([a, b, c, d], i) => `<path d="M${a} ${b}L${c} ${d}" stroke="#ffffff" stroke-width="${i % 2 ? 10 : 16}" stroke-linecap="round"/>`).join('');
  return `<svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="400" fill="#ffeadf"/>
    <path d="M40 20h120v80H40zM240 140h100v90H240zM560 30h180v60H560zM600 140h150v140H600zM60 300h90v50H60z" fill="#ffdbc7"/>
    <circle cx="660" cy="220" r="46" fill="#d9ead2"/><circle cx="110" cy="200" r="34" fill="#d9ead2"/>
    ${roads}
    <circle cx="420" cy="190" r="70" fill="#b60058" opacity=".12"/><circle cx="420" cy="190" r="40" fill="#b60058" opacity=".18"/>
    <path d="M420 128c-24 0-42 18-42 41 0 31 42 69 42 69s42-38 42-69c0-23-18-41-42-41z" fill="#b60058"/><circle cx="420" cy="169" r="15" fill="#fff"/>
  </svg>`;
}
