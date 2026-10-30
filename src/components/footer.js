/** Site footer and the mobile bottom navigation */
import { BUSINESS, HOURS } from '../data/index.js';
import { esc, ic, each, brandName } from '../lib/html.js';
import { tr, loc } from '../lib/i18n.js';
import { href } from '../lib/paths.js';
import { waLink, telHref } from '../lib/links.js';
import { logo } from './brand.js';
import { langLinks } from './ui.js';
import { nav, legalNav } from './nav.js';

const social = () => [
  [BUSINESS.instagram, 'photo_camera', tr('אינסטגרם', 'Instagram', 'Instagram')],
  [BUSINESS.tiktok, 'videocam', tr('טיקטוק', 'TikTok', 'TikTok')],
  [BUSINESS.facebook, 'thumb_up', tr('פייסבוק', 'Facebook', 'Facebook')],
  [waLink(tr('היי CheatDay!', 'Hi CheatDay!', 'Привет, CheatDay!')), 'chat', tr('וואטסאפ', 'WhatsApp', 'WhatsApp')],
].filter(([url]) => url);

const newTab = () => tr(' (נפתח בחלון חדש)', ' (opens in a new tab)', ' (откроется в новой вкладке)');

export const footer = (current) => `
<footer class="bg-surface-container-low text-on-surface pb-[9.5rem] lg:pb-0">
  <div class="wrap gutter-x pt-space-xl pb-space-lg">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
      <div class="flex flex-col gap-space-sm">
        <div class="flex items-center gap-space-sm">${logo(64)}<span class="wordmark text-headline-md font-extrabold" lang="en">${esc(BUSINESS.name)}</span></div>
        <p class="text-on-surface-variant text-body-sm leading-relaxed">${esc(loc(BUSINESS.about))}</p>
      </div>
      <div class="flex flex-col gap-space-sm">
        <h2 class="text-headline-sm text-secondary">${tr('שעות איסוף', 'Pickup hours', 'Часы самовывоза')}</h2>
        <ul class="flex flex-col gap-space-xs text-on-surface-variant text-body-sm">
          ${each(HOURS, (h) => `<li>${esc(loc(h.label))}: <span class="tabular-nums">${h.closed ? tr('סגור', 'Closed', 'Закрыто') : `${h.from}–${h.to}`}</span></li>`)}
          <li>${tr(`משלוחים ל${loc(BUSINESS.city)} והסביבה`, `Delivery around ${loc(BUSINESS.city)}`, `Доставка: ${loc(BUSINESS.city)} и окрестности`)}</li>
        </ul>
      </div>
      <div class="flex flex-col gap-space-sm">
        <h2 class="text-headline-sm text-secondary">${tr('שירות וקשר', 'Contact', 'Контакты')}</h2>
        <ul class="flex flex-col gap-space-xs text-on-surface-variant text-body-sm">
          <li class="flex items-center gap-space-xs">${ic('person', 'text-primary !text-[1.125rem]')}${esc(loc(BUSINESS.owner))}</li>
          <li class="flex items-center gap-space-xs">${ic('call', 'text-primary !text-[1.125rem]')}<a class="underline underline-offset-2" href="${telHref()}" dir="ltr">${esc(BUSINESS.phone)}</a></li>
          <li class="flex items-center gap-space-xs">${ic('location_on', 'text-primary !text-[1.125rem]')}${esc(loc(BUSINESS.city))} ${tr('(איסוף עצמי)', '(pickup)', '(самовывоз)')}</li>
          ${BUSINESS.email ? `<li class="flex items-center gap-space-xs">${ic('mail', 'text-primary !text-[1.125rem]')}<a class="underline" href="mailto:${esc(BUSINESS.email)}" dir="ltr">${esc(BUSINESS.email)}</a></li>` : ''}
        </ul>
        <nav aria-label="${tr('ניווט בתחתית העמוד', 'Footer navigation', 'Навигация внизу страницы')}"><ul class="flex flex-wrap gap-x-space-md gap-y-space-xs text-body-sm">
          ${each(nav(), (n) => `<li><a class="underline underline-offset-2 hover:text-primary" href="${href(n.id)}">${n.label}</a></li>`)}
        </ul></nav>
      </div>
      <div class="flex flex-col gap-space-sm">
        <h2 class="text-headline-sm text-secondary">${tr('עקבו אחרינו', 'Follow us', 'Мы в соцсетях')}</h2>
        <p class="text-on-surface-variant text-body-sm">${tr('טעמים חדשים, מהדורות מיוחדות ותמונות שיגרמו לכם לרעוב.', 'New flavours, special editions and photos that will make you hungry.', 'Новые вкусы, особые выпуски и фото, от которых сразу захочется есть.')}</p>
        <ul class="flex items-center gap-space-sm">
          ${each(social(), ([url, icon, label]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener" class="w-11 h-11 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-secondary transition-colors flex items-center justify-center">${ic(icon)}<span class="sr-only">${label}${newTab()}</span></a></li>`)}
        </ul>
        <div class="flex flex-wrap items-center gap-space-sm">
          ${langLinks(current)}
          <button type="button" data-act="install" class="w-fit chip bg-primary text-on-primary !px-space-md !py-space-sm min-h-[2.75rem]" hidden>${ic('install_mobile', '!text-[1.125rem]')}${tr('התקנת האפליקציה', 'Install the app', 'Установить приложение')}</button>
        </div>
      </div>
    </div>
    <div class="py-space-md bg-surface-container-high/50 rounded-[1.75rem] px-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant text-label-sm text-center">
      <p>© ${BUSINESS.foundedYear} ${brandName(BUSINESS.name)}. ${tr(`כל הזכויות שמורות. נאפה באהבה ב${loc(BUSINESS.city)}.`, `All rights reserved. Baked with love in ${loc(BUSINESS.city)}.`, `Все права защищены. Испечено с любовью в г.\u00a0${loc(BUSINESS.city)}.`)}</p>
      <ul class="flex flex-wrap items-center justify-center gap-space-md">
        ${each(legalNav(), (n) => `<li><a class="underline underline-offset-2 hover:text-on-surface ${n.id === 'accessibility' ? 'text-primary' : ''}" href="${href(n.id)}">${n.label}</a></li>`)}
      </ul>
    </div>
  </div>
</footer>`;

export const bottomNav = (current) => `
<nav class="lg:hidden fixed bottom-0 inset-x-0 z-50 pb-safe gutter-x bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(45,22,6,0.1)]" aria-label="${tr('ניווט מהיר', 'Quick navigation', 'Быстрая навигация')}" data-bottom-nav>
  <ul class="flex justify-around items-center h-[4.5rem]">
    ${each(nav(), (n) => {
      const on = n.id === current;
      return `<li><a href="${href(n.id)}" ${on ? 'aria-current="page"' : ''} class="flex flex-col items-center justify-center gap-1 min-w-[4.5rem] h-14 rounded transition-colors ${on ? 'text-primary font-bold' : 'text-on-surface-variant'}">${ic(n.icon, on ? 'fill' : '')}<span class="text-label-sm">${n.short}</span></a></li>`;
    })}
  </ul>
</nav>`;
