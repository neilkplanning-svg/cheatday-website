/** DOM helpers shared by the client modules */
import { esc, ic } from '../lib/html.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

let toastTimer;
/** Short visual + spoken confirmation (role="status") */
export function toast(message, icon = 'check_circle') {
  const el = $('[data-toast]');
  if (!el) return;
  el.innerHTML = `${ic(icon, 'text-primary-fixed !text-[1.25rem]')}<span>${esc(message)}</span>`;
  el.classList.remove('opacity-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('opacity-0'), 3200);
}

/** Hide the toast at once (when a drawer or dialog opens over it) */
export function hideToast() {
  clearTimeout(toastTimer);
  $('[data-toast]')?.classList.add('opacity-0');
}

/** Urgent message for screen readers only (form errors) */
export function announce(message) {
  const el = $('[data-alert]');
  if (!el) return;
  el.textContent = '';
  setTimeout(() => { el.textContent = message; }, 30);
}

/** Visible, focusable elements inside a container (for focus trapping) */
export function focusables(root) {
  return $$('a[href], button:not([disabled]), input:not([type="hidden"]):not(.sr-only), input.sr-only:checked, select, textarea, [tabindex]:not([tabindex="-1"])', root)
    .filter((el) => !el.closest('[hidden]') && el.getClientRects().length);
}
