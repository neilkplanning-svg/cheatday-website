/**
 * Browser entry point. Pages are static HTML; this file wires the interactive parts
 * through event delegation: every control declares data-act="<action>".
 */
import { $ } from './dom.js';
import { renderCart, onAdd, onStep, onQty, onClear, onMode, onUnpromo, onCartButton, onFilter } from './cart.js';
import { openCheckout, closeCheckout, submitCheckout, onCheckoutChange, copyOrder, afterSend, finishOrder } from './checkout.js';
import { submitClub, submitPromo, submitContact, initClub } from './forms.js';
import { applyA11y, toggleA11y, setA11y, a11yKeydown, initReadingGuide, closeA11y } from './a11y.js';
import { fillDynamic, initDraftBar, hideDraftBar, selectChapter, tabsKeydown, initStory, videoSoon } from './dynamic.js';
import { openLayer, closeLayers, activeModal, trapFocus } from './layers.js';
import { initPwa, install } from './pwa.js';
import { setLang, getLang, dir } from '../lib/i18n.js';

/* Language of this page: <main data-lang> is set by the build (the claude.ai preview wraps
   the home page in its own <html>, so that element may not carry lang/dir). */
setLang(document.querySelector('main')?.dataset.lang || document.documentElement.lang);
if (document.documentElement.lang !== getLang()) {
  document.documentElement.lang = getLang();
  document.documentElement.dir = dir();
}

const CLICK = {
  add: onAdd,
  step: onStep,
  qty: onQty,
  clear: onClear,
  mode: onMode,
  unpromo: onUnpromo,
  filter: onFilter,
  cart: onCartButton,
  drawer: () => openLayer($('[data-layer="drawer"]')),
  close: () => closeLayers(),
  a11y: toggleA11y,
  'a11y-set': (el) => setA11y(el.dataset.k),
  checkout: openCheckout,
  'close-checkout': closeCheckout,
  'copy-order': copyOrder,
  sent: afterSend,
  done: finishOrder,
  'hide-draft': hideDraftBar,
  'video-soon': videoSoon,
  chapter: (el) => selectChapter(Number(el.dataset.i)),
  install,
};

const SUBMIT = { checkout: submitCheckout, club: submitClub, promo: submitPromo, contact: submitContact };

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-scrim]')) { closeLayers(); return; }
  const el = e.target.closest('[data-act]');
  if (el && CLICK[el.dataset.act]) CLICK[el.dataset.act](el, e);
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-form]');
  if (!form || !SUBMIT[form.dataset.form]) return;
  e.preventDefault();
  SUBMIT[form.dataset.form](form);
});

document.addEventListener('change', onCheckoutChange);

document.addEventListener('keydown', (e) => {
  if (a11yKeydown(e) || tabsKeydown(e)) return;
  const modal = activeModal();
  if (!modal) return;
  if (e.key === 'Escape') {
    if (modal.matches('[data-checkout]')) closeCheckout();
    else if (modal.matches('[data-a11y]')) closeA11y();
    else closeLayers();
  } else if (e.key === 'Tab') trapFocus(e, modal);
});

/* the "skip to content" link: move focus, not only scroll */
document.addEventListener('click', (e) => {
  if (e.target.closest('.skip-link')) { e.preventDefault(); $('#main').focus(); }
});

function boot() {
  applyA11y();
  initReadingGuide();
  fillDynamic();
  initDraftBar();
  initClub();
  initStory();
  renderCart();
  initPwa();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
