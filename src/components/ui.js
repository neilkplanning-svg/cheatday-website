/** Small shared UI pieces */
import { SITE } from '../data/index.js';
import { esc, ic, icf, each } from '../lib/html.js';

/** Chip that marks sample content while the site is in draft mode */
export const sampleChip = () => (SITE.draft
  ? `<span class="chip bg-tertiary-fixed text-on-tertiary-fixed">${ic('info', '!text-[0.875rem]')}לדוגמה</span>`
  : '');

/** Five filled stars with a text alternative */
export const stars = (n = 5, sizeCls = '!text-[1.125rem]') =>
  `<span class="flex gap-0.5 text-primary" role="img" aria-label="דירוג ${n} מתוך 5">${each(Array.from({ length: n }), () => icf('star', sizeCls))}</span>`;

/** Eyebrow + h2 + optional subtitle */
export const sectionHead = ({ eyebrow, title, sub, icon = 'favorite', id = '' }) => `
  <div class="flex flex-col gap-space-xs">
    <span class="inline-flex items-center gap-space-xs text-primary text-label-md">${ic(icon, '!text-[1.125rem]')}${esc(eyebrow)}</span>
    <h2 ${id ? `id="${id}"` : ''} class="text-headline-lg-mobile md:text-headline-lg text-on-surface">${esc(title)}</h2>
    ${sub ? `<p class="text-body-md text-on-surface-variant">${esc(sub)}</p>` : ''}
  </div>`;

/** Quantity stepper used on product cards; the value is read by the "add" button */
export const stepper = (id, name) => `
  <div class="flex items-center bg-surface-container-lowest rounded-full p-space-xs shadow-sm" role="group" aria-label="כמות של ${esc(name)}">
    <button type="button" class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors" data-act="step" data-id="${id}" data-d="-1" aria-label="הפחתת כמות">${ic('remove', '!text-[1.125rem]')}</button>
    <output class="text-label-lg px-space-sm min-w-[2rem] text-center tabular-nums" data-qty="${id}" aria-live="polite" aria-label="כמות">1</output>
    <button type="button" class="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:opacity-90" data-act="step" data-id="${id}" data-d="1" aria-label="הגדלת כמות">${ic('add', '!text-[1.125rem]')}</button>
  </div>`;

/** Category filter (a group of toggle buttons; the menu grid listens for changes) */
export const filterPills = (cats, current) => `
  <div class="flex items-center gap-space-sm overflow-x-auto no-scrollbar pb-space-xs" role="group" aria-label="סינון לפי קטגוריה" data-filters>
    ${each(cats, (c) => {
      const on = c.id === current;
      return `<button type="button" aria-pressed="${on}" data-act="filter" data-cat="${c.id}"
        class="shrink-0 whitespace-nowrap min-h-[2.75rem] px-space-lg py-space-sm rounded-full text-label-md flex items-center gap-space-xs transition-colors ${on ? 'bg-primary text-on-primary shadow-pop' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'}">
        ${ic(c.icon, '!text-[1.125rem]')}<span>${esc(c.label)}</span></button>`;
    })}
  </div>`;

