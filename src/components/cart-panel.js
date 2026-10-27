/** Cart contents, totals and checkout button – rendered in the browser from the cart state */
import { ADDONS, CLUB, DELIVERY } from '../data/index.js';
import { esc, ic, each } from '../lib/html.js';
import { nis } from '../lib/format.js';
import { href } from '../lib/paths.js';

const modeButton = (mode, value, icon, label) => `
  <button type="button" data-act="mode" data-mode="${value}" aria-pressed="${mode === value}"
    class="min-h-[2.75rem] px-space-sm rounded-full text-label-sm flex items-center justify-center gap-space-xs transition-colors ${mode === value ? 'bg-primary text-on-primary shadow-pop-sm' : 'text-on-surface hover:bg-surface-container'}">${ic(icon, '!text-[1rem]')}${label}</button>`;

const line = (l) => `
  <li class="flex items-center justify-between gap-space-sm p-space-sm bg-surface-container-low/70 rounded">
    <div class="flex-1 min-w-0"><div class="text-label-md text-on-surface">${esc(l.item.name)}</div><div class="text-label-sm text-secondary tabular-nums">${nis(l.item.price)} ליחידה</div></div>
    <div class="flex items-center gap-space-xs shrink-0" role="group" aria-label="כמות של ${esc(l.item.name)}">
      <button type="button" data-act="qty" data-id="${l.id}" data-d="-1" class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-error hover:text-on-error transition-colors" aria-label="${l.qty === 1 ? 'הסרה' : 'הפחתה'}: ${esc(l.item.name)}">${ic(l.qty === 1 ? 'delete' : 'remove', '!text-[1rem]')}</button>
      <span class="text-label-md w-6 text-center tabular-nums">${l.qty}</span>
      <button type="button" data-act="qty" data-id="${l.id}" data-d="1" class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center" aria-label="הוספה: ${esc(l.item.name)}">${ic('add', '!text-[1rem]')}</button>
    </div>
    <span class="text-label-md text-on-surface shrink-0 w-12 text-left tabular-nums">${nis(l.item.price * l.qty)}</span>
  </li>`;

const freeDeliveryProgress = (t) => {
  const after = t.subtotal - t.discount;
  const pct = Math.min(100, Math.round((after / DELIVERY.freeAbove) * 100));
  return `<div class="py-space-xs">
    <div class="flex items-center justify-between text-label-sm text-secondary mb-1"><span>עוד ${nis(DELIVERY.freeAbove - after)} למשלוח חינם</span><span class="tabular-nums" aria-hidden="true">${pct}%</span></div>
    <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden" role="progressbar" aria-label="התקדמות למשלוח חינם" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="bg-primary h-full rounded-full" style="width:${pct}%"></div></div>
  </div>`;
};

/**
 * @param {object} s  cart state { mode, promo }
 * @param {object} t  totals from client/state.js
 * @param {string} where 'drawer' | 'side'
 */
export function cartPanel(s, t, where) {
  const titleId = `cart-title-${where}`;
  const showProgress = s.mode === 'delivery' && t.count && t.subtotal - t.discount < DELIVERY.freeAbove;
  const items = t.lines.length
    ? `<ul class="flex flex-col gap-space-sm" aria-label="פריטים בסל">${each(t.lines, line)}</ul>`
    : `<div class="py-space-lg text-center text-on-surface-variant flex flex-col items-center gap-space-xs">${ic('cookie', 'text-tertiary !text-[2.25rem]')}<p class="text-body-sm">הסל שלכם מחכה לרול חם...</p><a href="${href('menu')}" class="text-label-md text-primary underline min-h-[2.75rem] inline-flex items-center">לתפריט</a></div>`;

  return `
  <div class="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container">
    <div class="flex items-center gap-space-xs">
      <span class="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center" aria-hidden="true">${ic('shopping_bag', '!text-[1.25rem]')}</span>
      <div><h2 id="${titleId}" class="text-headline-sm text-on-surface">הסל שלך</h2><span class="text-label-sm text-primary">${t.count} פריטים</span></div>
    </div>
    <div class="flex items-center gap-space-xs">
      ${t.count ? `<button type="button" data-act="clear" class="min-h-[2.75rem] px-space-sm text-on-surface-variant hover:text-error text-label-sm flex items-center gap-1">${ic('delete_sweep', '!text-[1rem]')}ריקון הסל</button>` : ''}
      ${where === 'drawer' ? `<button type="button" data-act="close" class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center" aria-label="סגירת הסל">${ic('close', '!text-[1.25rem]')}</button>` : ''}
    </div>
  </div>
  <div class="flex flex-col gap-space-md">
    ${DELIVERY.enabled ? `<div class="flex flex-col gap-space-xs" role="group" aria-labelledby="${titleId}-mode">
      <span id="${titleId}-mode" class="text-label-sm text-on-surface-variant">איך תרצו לקבל את ההזמנה?</span>
      <div class="grid grid-cols-2 gap-space-xs p-space-xs bg-surface-container-low rounded-full">${modeButton(s.mode, 'pickup', 'storefront', 'איסוף עצמי')}${modeButton(s.mode, 'delivery', 'moped', 'משלוח')}</div>
    </div>` : ''}
    ${items}
    ${t.count ? `
    <div class="p-space-sm bg-surface-container rounded flex flex-col gap-space-xs">
      <span class="text-label-sm text-on-surface flex items-center gap-space-xs">${ic('add_circle', 'text-primary !text-[1rem]')}תוספות בצד?</span>
      <div class="flex flex-wrap items-center gap-space-xs">${each(ADDONS, (a) => `<button type="button" data-act="add" data-id="${a.id}" data-fixed="1" class="chip bg-surface-container-lowest text-secondary hover:bg-primary hover:text-on-primary transition-colors shadow-sm min-h-[2.5rem]">+ ${esc(a.name)} ${nis(a.price)}</button>`)}</div>
    </div>
    ${CLUB.enabled && !s.promo ? `<form data-form="promo" class="flex gap-space-xs" novalidate>
      <label class="sr-only" for="promo-${where}">קוד קופון</label>
      <input class="field !min-h-[2.75rem] !py-1 text-label-md uppercase" id="promo-${where}" name="code" placeholder="קוד קופון" autocomplete="off" dir="ltr">
      <button class="px-space-md min-h-[2.75rem] rounded-full bg-surface-container-high text-secondary text-label-md shrink-0">החלה</button>
    </form>` : ''}
    <dl class="flex flex-col gap-space-xs p-space-sm bg-surface-container-low/50 rounded text-body-sm text-on-surface-variant">
      <div class="flex justify-between"><dt>סכום ביניים</dt><dd class="tabular-nums">${nis(t.subtotal)}</dd></div>
      ${t.discount ? `<div class="flex justify-between text-primary"><dt class="flex items-center gap-1">הנחת מועדון ${CLUB.percent}% <button type="button" data-act="unpromo" class="underline text-label-sm min-h-[2rem]">הסרת הקוד</button></dt><dd class="tabular-nums">−${nis(t.discount)}</dd></div>` : ''}
      <div class="flex justify-between"><dt>${s.mode === 'delivery' ? 'משלוח' : 'איסוף עצמי'}</dt><dd class="tabular-nums">${s.mode === 'delivery' ? (t.delivery ? nis(t.delivery) : 'חינם') : '₪0'}</dd></div>
      <div class="pt-space-xs flex justify-between text-headline-sm text-on-surface"><dt>סה״כ</dt><dd class="text-primary tabular-nums">${nis(t.total)}</dd></div>
    </dl>
    ${showProgress ? freeDeliveryProgress(t) : ''}
    <button type="button" data-act="checkout" class="btn-pop w-full min-h-[3.25rem] px-space-lg bg-primary text-on-primary text-headline-sm rounded-full shadow-pop-md flex items-center justify-center gap-space-sm">המשך להזמנה ${ic('arrow_back')}</button>
    <p class="flex items-center justify-center gap-space-md text-on-surface-variant text-label-sm">
      <span class="flex items-center gap-1">${ic('chat', 'text-tertiary !text-[1rem]')}אישור מהיר בוואטסאפ</span>
      <span class="flex items-center gap-1">${ic('verified_user', 'text-tertiary !text-[1rem]')}תשלום רק אחרי אישור</span>
    </p>` : ''}
  </div>`;
}
