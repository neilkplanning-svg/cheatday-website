/* CheatDay service worker – makes the site installable and fast on repeat visits.
   Bump VERSION on every deploy so phones pick up the new files. */
const VERSION = 'cheatday-__BUILD__';
const PAGES = ['', 'index.html', 'menu.html', 'story.html', 'contact.html'];
const CORE = [
  ...PAGES.map((p) => `./${p}`), ...PAGES.map((p) => `./en/${p}`),
  './assets/css/app.css', './assets/js/app.js', './assets/brand/logo-badge-96.webp', './manifest.webmanifest', './icons/icon-192.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Pages: network first, so a new menu shows up immediately; fall back to cache offline.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return r; }).catch(() => caches.match(req).then((hit) => hit || caches.match(url.pathname.includes('/en/') ? './en/index.html' : './index.html'))));
    return;
  }
  // Own assets and Google Fonts: cache first, refresh in the background.
  const isFont = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (url.origin === location.origin || isFont) {
    e.respondWith(caches.match(req).then((hit) => {
      const net = fetch(req).then((r) => { if (r.ok || r.type === 'opaque') caches.open(VERSION).then((c) => c.put(req, r.clone())); return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
