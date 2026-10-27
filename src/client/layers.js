/** Drawers and dialogs: open/close, focus trap, aria-expanded on their buttons */
import { $, $$, focusables } from './dom.js';

let returnFocus = null;

const scrim = () => $('[data-scrim]');
const openLayers = () => $$('[data-layer]').filter((el) => !el.hidden);

/** Mark every button that controls this layer as expanded/collapsed */
function setExpanded(id, value) {
  $$(`[aria-controls="${id}"]`).forEach((b) => b.setAttribute('aria-expanded', String(value)));
}

/** Make the rest of the page inert while a modal is open */
function setPageInert(value) {
  ['.site-header', '#main', 'footer', 'nav[aria-label="ניווט מהיר"]', '.skip-link'].forEach((sel) => {
    const el = $(sel);
    if (el) el.inert = value;
  });
}

export function openLayer(el) {
  closeLayers(false);
  returnFocus = document.activeElement;
  el.hidden = false;
  scrim().hidden = false;
  void el.offsetWidth; // let the hidden → visible change apply before animating
  el.classList.remove('translate-x-full', 'translate-y-full', 'lg:-translate-x-full');
  if (el.dataset.layer === 'cart') el.classList.add('lg:translate-x-0');
  setExpanded(el.id, true);
  setPageInert(true);
  document.body.classList.add('overflow-hidden');
  const first = focusables(el)[0];
  if (first) first.focus();
}

export function closeLayers(restoreFocus = true) {
  const open = openLayers();
  if (!open.length) return;
  open.forEach((el) => {
    if (el.dataset.layer === 'drawer') el.classList.add('translate-x-full');
    else { el.classList.add('translate-y-full', 'lg:-translate-x-full'); el.classList.remove('lg:translate-x-0'); }
    setExpanded(el.id, false);
    setTimeout(() => { el.hidden = true; }, 280);
  });
  scrim().hidden = true;
  setPageInert(false);
  document.body.classList.remove('overflow-hidden');
  if (restoreFocus && returnFocus && returnFocus.isConnected) returnFocus.focus();
}

export const isLayerOpen = () => openLayers().length > 0;

/** Keep Tab inside the open dialog */
export function trapFocus(e, container) {
  const items = focusables(container);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (!container.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/** The topmost open modal, if any */
export function activeModal() {
  const checkout = $('[data-checkout]');
  if (checkout && !checkout.hidden) return checkout;
  const a11y = $('[data-a11y]');
  if (a11y && !a11y.hidden) return a11y;
  return openLayers()[0] || null;
}

export { setPageInert };
