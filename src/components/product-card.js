/** Product card – two variants: 'home' (compact, no stepper) and 'menu' (full) */
import * as ART from '../lib/art.js';
import { esc, ic, icf, each } from '../lib/html.js';
import { nis } from '../lib/format.js';
import { stepper } from './ui.js';

const BADGE_TONE = {
  primary: 'bg-primary text-on-primary',
  hot: 'bg-primary-container text-on-primary-container',
  soft: 'bg-surface-container-high text-secondary',
  brown: 'bg-secondary text-on-secondary',
};

/** Photo when available, otherwise the drawn illustration */
const media = (p) => (p.image
  ? `<img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async">`
  : `<div class="art w-full h-full group-hover:scale-105 transition-transform duration-300">${ART.product(p.art, p.id, `איור: ${p.name}`)}</div>`);

const badge = (p) => (p.badge
  ? `<span class="absolute top-space-sm right-space-sm chip ${BADGE_TONE[p.badge.tone] || BADGE_TONE.soft} shadow-sm">${icf(p.badge.icon, '!text-[0.875rem]')}${esc(p.badge.text)}</span>`
  : '');

const price = (p) => `<span class="absolute top-space-sm left-space-sm bg-primary text-on-primary text-label-md px-space-md py-space-xs rounded-full shadow-pop-sm tabular-nums"><span class="sr-only">מחיר: </span>${nis(p.price)}</span>`;

const addButton = (p, label, fixed = false) => `
  <button type="button" class="btn-pop flex-1 min-h-[2.75rem] px-space-md bg-primary text-on-primary text-label-md rounded-full flex items-center justify-center gap-space-xs whitespace-nowrap"
    data-act="add" data-id="${p.id}" ${fixed ? 'data-fixed="1"' : ''} aria-label="${esc(label)}: ${esc(p.name)}">
    ${ic('add_shopping_cart', '!text-[1.125rem]')}<span>${esc(label)}</span>
  </button>`;

export function productCard(p, variant = 'menu') {
  const headingId = `p-${p.id}-${variant}`;
  const tags = each(p.tags || [], (t, i) => `<li class="chip bg-surface-container-low ${i ? 'text-on-surface-variant' : 'text-secondary'}">${esc(t)}</li>`);

  if (variant === 'home') {
    return `<article class="product-card group relative bg-surface-container-lowest rounded-2xl p-space-sm shadow-pop-md flex flex-col gap-space-md hover:-translate-y-1 transition-transform" aria-labelledby="${headingId}">
      <div class="relative h-56 rounded-xl overflow-hidden bg-surface-container">${media(p)}${price(p)}${badge(p)}</div>
      <div class="px-space-xs flex flex-col gap-space-xs">
        <h3 id="${headingId}" class="text-headline-sm text-on-surface">${esc(p.name)}</h3>
        <p class="text-body-sm text-on-surface-variant line-clamp-3">${esc(p.desc)}</p>
      </div>
      <div class="mt-auto px-space-xs pb-space-xs flex">${addButton(p, 'הוספה לסל', true)}</div>
    </article>`;
  }

  const actions = `<div class="mt-auto bg-surface-container-low/60 rounded p-space-sm flex flex-wrap items-center justify-between gap-space-sm">
      ${stepper(p.id, p.name)}${addButton(p, 'הוספה להזמנה')}
    </div>`;
  const body = `<div class="flex flex-col gap-space-xs">
      <h3 id="${headingId}" class="${p.wide ? 'text-headline-md' : 'text-headline-sm'} text-on-surface">${esc(p.name)}</h3>
      <p class="text-body-sm text-on-surface-variant">${esc(p.desc)}</p>
      <ul class="flex flex-wrap gap-space-xs pt-space-xs" aria-label="מאפיינים">${tags}</ul>
    </div>`;
  const pic = `<div class="relative w-full ${p.wide ? 'h-56' : 'h-52'} rounded overflow-hidden bg-surface-container">${media(p)}${price(p)}${badge(p)}</div>`;

  if (p.wide) {
    return `<article class="product-card group bg-surface-container-lowest rounded-lg p-space-md shadow-md hover:shadow-xl transition-shadow flex flex-col gap-space-md md:col-span-2" data-cat="${p.category}" aria-labelledby="${headingId}">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md items-center">${pic}${body}</div>${actions}</article>`;
  }
  return `<article class="product-card group bg-surface-container-lowest rounded-lg p-space-sm sm:p-space-md shadow-pop-md flex flex-col gap-space-md hover:-translate-y-1 transition-transform" data-cat="${p.category}" aria-labelledby="${headingId}">
    ${pic}<div class="px-space-xs">${body}</div>${actions}</article>`;
}
