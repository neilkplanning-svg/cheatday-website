/** Small shared UI pieces */
import { SITE } from '../data/index.js';
import { esc, ic, icf, each } from '../lib/html.js';
import { tr, loc, getLang, LANGS, LANG_NAMES, LANG_SHORT } from '../lib/i18n.js';
import { langHref } from '../lib/paths.js';

/** Chip that marks sample content while the site is in draft mode */
export const sampleChip = () => (SITE.draft
  ? `<span class="chip bg-tertiary-fixed text-on-tertiary-fixed">${ic('info', '!text-[0.875rem]')}${tr('לדוגמה', 'Sample', 'Пример')}</span>`
  : '');

/** Five filled stars with a text alternative */
export const stars = (n = 5, sizeCls = '!text-[1.125rem]') =>
  `<span class="flex gap-0.5 text-primary" role="img" aria-label="${tr(`דירוג ${n} מתוך 5`, `Rated ${n} out of 5`, `Оценка ${n} из 5`)}">${each(Array.from({ length: n }), () => icf('star', sizeCls))}</span>`;

/** Eyebrow + h2 + optional subtitle */
export const sectionHead = ({ eyebrow, title, sub, icon = 'favorite', id = '' }) => `
  <div class="flex flex-col gap-space-xs">
    <span class="inline-flex items-center gap-space-xs text-primary text-label-md">${ic(icon, '!text-[1.125rem]')}${esc(eyebrow)}</span>
    <h2 ${id ? `id="${id}"` : ''} class="text-headline-lg-mobile md:text-headline-lg text-on-surface">${esc(title)}</h2>
    ${sub ? `<p class="text-body-md text-on-surface-variant">${esc(sub)}</p>` : ''}
  </div>`;

/** Quantity stepper used on product cards; the value is read by the "add" button */
export const stepper = (id, name) => `
  <div class="flex items-center bg-surface-container-lowest rounded-full p-space-xs shadow-sm" role="group" aria-label="${esc(tr(`כמות של ${name}`, `Quantity of ${name}`, `Количество: ${name}`))}">
    <button type="button" class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors" data-act="step" data-id="${id}" data-d="-1" aria-label="${tr('הפחתת כמות', 'Decrease quantity', 'Уменьшить количество')}">${ic('remove', '!text-[1.125rem]')}</button>
    <output class="text-label-lg px-space-sm min-w-[2rem] text-center tabular-nums" data-qty="${id}" aria-live="polite" aria-label="${tr('כמות', 'Quantity', 'Количество')}">1</output>
    <button type="button" class="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:opacity-90" data-act="step" data-id="${id}" data-d="1" aria-label="${tr('הגדלת כמות', 'Increase quantity', 'Увеличить количество')}">${ic('add', '!text-[1.125rem]')}</button>
  </div>`;

/** Category filter (a group of toggle buttons; the menu grid listens for changes) */
export const filterPills = (cats, current) => `
  <div class="flex items-center gap-space-sm overflow-x-auto no-scrollbar pb-space-xs" role="group" aria-label="${tr('סינון לפי קטגוריה', 'Filter by category', 'Фильтр по категориям')}" data-filters>
    ${each(cats, (c) => {
      const on = c.id === current;
      return `<button type="button" aria-pressed="${on}" data-act="filter" data-cat="${c.id}"
        class="shrink-0 whitespace-nowrap min-h-[2.75rem] px-space-lg py-space-sm rounded-full text-label-md flex items-center gap-space-xs transition-colors ${on ? 'bg-primary text-on-primary shadow-pop' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'}">
        ${ic(c.icon, '!text-[1.125rem]')}<span>${esc(loc(c.label))}</span></button>`;
    })}
  </div>`;

const langDir = (l) => (l === 'he' ? 'rtl' : 'ltr');

/** One link per language; each is written in its own language so everyone can find theirs */
const langLink = (pageId, l, cls) => {
  const on = l === getLang();
  return `<a href="${langHref(pageId, l)}" hreflang="${l}" lang="${l}" dir="${langDir(l)}" ${on ? 'aria-current="true"' : ''}
    class="${cls} ${on ? 'bg-secondary text-on-secondary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}">${on ? ic('check', '!text-[1rem]') : ''}${LANG_NAMES[l]}</a>`;
};

/** All languages side by side (menu drawer and footer) */
export const langLinks = (pageId) => `
  <ul class="flex flex-wrap items-center gap-space-xs" aria-label="${tr('שפה', 'Language', 'Язык')}">
    ${each(LANGS, (l) => `<li>${langLink(pageId, l, 'inline-flex items-center gap-1 min-h-[2.75rem] px-space-md rounded-full text-label-md transition-colors')}</li>`)}
  </ul>`;

/**
 * Header language menu: a native <details> disclosure, so it works without JavaScript.
 * The button shows the current language (short code on phones, full name from 640px up).
 */
export const langMenu = (pageId) => {
  const cur = getLang();
  return `<details class="lang-menu relative" data-lang-menu>
    <summary class="list-none [&::-webkit-details-marker]:hidden cursor-pointer inline-flex items-center justify-center gap-1 min-h-[2.75rem] min-w-[2.75rem] px-space-sm rounded-full bg-surface-container text-on-surface text-label-md hover:bg-secondary hover:text-on-secondary transition-colors"
      aria-label="${tr('שפה', 'Language', 'Язык')}: ${LANG_NAMES[cur]} (${LANG_SHORT[cur]})">${ic('translate', '!text-[1.25rem]')}<span class="sm:hidden">${LANG_SHORT[cur]}</span><span class="hidden sm:inline">${LANG_NAMES[cur]}</span></summary>
    <ul class="absolute top-full mt-space-xs end-0 z-[60] min-w-[10rem] p-space-xs flex flex-col gap-space-xs bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container">
      ${each(LANGS, (l) => `<li>${langLink(pageId, l, 'flex items-center gap-space-xs w-full min-h-[2.75rem] px-space-md rounded-xl text-label-md transition-colors')}</li>`)}
    </ul>
  </details>`;
};
