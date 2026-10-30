/** Installable web app: service worker + "install the app" buttons */
import { $$, toast } from './dom.js';
import { tr } from '../lib/i18n.js';
import { rootPrefix } from '../lib/paths.js';

let installEvent = null;

const isFramed = () => { try { return window.self !== window.top; } catch (e) { return true; } };

export function initPwa() {
  if ('serviceWorker' in navigator && location.protocol === 'https:' && !isFramed()) {
    navigator.serviceWorker.register(`${rootPrefix()}sw.js`).catch(() => {});
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installEvent = e;
    $$('[data-act="install"]').forEach((b) => { b.hidden = false; });
  });
  const iOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone;
  if (iOS && !isFramed()) $$('[data-act="install"]').forEach((b) => { b.hidden = false; });
}

export function install() {
  if (installEvent) { installEvent.prompt(); installEvent = null; return; }
  toast(tr('באייפון: כפתור השיתוף ← ״הוספה למסך הבית״', 'On iPhone: Share → “Add to Home Screen”', 'На iPhone: «Поделиться» → «На экран „Домой“»'), 'ios_share');
}
