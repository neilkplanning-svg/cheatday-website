/** Accessibility panel: preferences, applying them to <html>, reading guide and keyboard shortcut */
import { a11yPanel, TEXT_STEPS, A11Y_TOGGLES } from '../components/a11y-panel.js';
import { store, KEYS } from '../lib/storage.js';
import { $, $$, toast, focusables } from './dom.js';

const DEFAULTS = { scale: 100, ...Object.fromEntries(A11Y_TOGGLES.map(([k]) => [k, false])) };
const prefs = { ...DEFAULTS, ...store.get(KEYS.a11y, {}) };
if (!TEXT_STEPS.includes(prefs.scale)) prefs.scale = 100;

let returnFocus = null;
const panel = () => $('[data-a11y]');

/** Apply all preferences as classes on <html> */
export function applyA11y() {
  const html = document.documentElement;
  html.style.fontSize = prefs.scale === 100 ? '' : `${prefs.scale}%`;
  A11Y_TOGGLES.forEach(([key]) => html.classList.toggle(`a11y-${key}`, Boolean(prefs[key])));
  // the two contrast modes exclude each other
  if (prefs.contrast && prefs.dark) html.classList.remove('a11y-contrast');
  const guide = $('[data-reading-guide]');
  if (guide) guide.hidden = !prefs.guide;
  store.set(KEYS.a11y, prefs);
}

function render() {
  const p = panel();
  if (p) p.innerHTML = a11yPanel(prefs);
}

export function toggleA11y() {
  const p = panel();
  if (p.hidden) {
    returnFocus = document.activeElement;
    render();
    p.hidden = false;
    $$('[aria-controls="a11y-panel"]').forEach((b) => b.setAttribute('aria-expanded', 'true'));
    p.querySelector('h2').setAttribute('tabindex', '-1');
    p.querySelector('h2').focus();
  } else closeA11y();
}

export function closeA11y() {
  const p = panel();
  if (!p || p.hidden) return;
  p.hidden = true;
  $$('[aria-controls="a11y-panel"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  if (returnFocus && returnFocus.isConnected) returnFocus.focus();
}

const LABELS = Object.fromEntries(A11Y_TOGGLES.map(([k, , label]) => [k, label]));

export function setA11y(key) {
  const i = TEXT_STEPS.indexOf(prefs.scale);
  if (key === 'plus') prefs.scale = TEXT_STEPS[Math.min(i + 1, TEXT_STEPS.length - 1)];
  else if (key === 'minus') prefs.scale = TEXT_STEPS[Math.max(i - 1, 0)];
  else if (key === 'size-reset') prefs.scale = 100;
  else if (key === 'reset') Object.assign(prefs, DEFAULTS);
  else {
    prefs[key] = !prefs[key];
    if (key === 'contrast' && prefs.contrast) prefs.dark = false;
    if (key === 'dark' && prefs.dark) prefs.contrast = false;
  }
  applyA11y();
  render();
  const again = $(`[data-a11y] [data-k="${key}"]`);
  if (again && !again.disabled) again.focus();
  else panel().querySelector('h2').focus();
  if (key === 'reset') toast('הגדרות הנגישות אופסו', 'restart_alt');
  else if (['plus', 'minus', 'size-reset'].includes(key)) toast(`גודל טקסט: ${prefs.scale}%`, 'format_size');
  else toast(`${LABELS[key]}: ${prefs[key] ? 'מופעל' : 'כבוי'}`, 'accessibility_new');
}

/** Panel focus trap + Esc, and the global Alt+A shortcut */
export function a11yKeydown(e) {
  if (e.altKey && e.code === 'KeyA') { e.preventDefault(); toggleA11y(); return true; }
  const p = panel();
  if (!p || p.hidden) return false;
  if (e.key === 'Escape') { closeA11y(); return true; }
  if (e.key === 'Tab') {
    const items = focusables(p);
    const first = items[0];
    const last = items[items.length - 1];
    if (!p.contains(document.activeElement)) { e.preventDefault(); first.focus(); return true; }
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); return true; }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); return true; }
  }
  return false;
}

/** Horizontal reading guide that follows the pointer */
export function initReadingGuide() {
  const guide = $('[data-reading-guide]');
  if (!guide) return;
  document.addEventListener('pointermove', (e) => {
    if (!prefs.guide) return;
    guide.style.transform = `translateY(${e.clientY - 18}px)`;
  }, { passive: true });
}
