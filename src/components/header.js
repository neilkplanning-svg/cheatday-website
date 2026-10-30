/** Site header: logo, main navigation, language, accessibility and cart buttons */
import { BUSINESS } from '../data/index.js';
import { esc, ic, each } from '../lib/html.js';
import { tr } from '../lib/i18n.js';
import { href } from '../lib/paths.js';
import { logoWithName } from './brand.js';
import { langSwitch } from './ui.js';
import { nav } from './nav.js';

const navLink = (n, current) => {
  const on = n.id === current;
  return `<li><a href="${href(n.id)}" ${on ? 'aria-current="page"' : ''}
    class="block px-space-md py-space-sm rounded-full text-label-md transition-colors ${on ? 'bg-primary-container text-on-primary-container shadow-pop' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}">${n.label}</a></li>`;
};

export const header = (current) => `
<header class="site-header fixed top-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(45,22,6,0.08)]">
  <div class="wrap gutter-x h-16 lg:h-20 flex items-center justify-between gap-space-xs sm:gap-space-sm">
    <div class="flex items-center gap-space-xs lg:hidden">
      <button type="button" class="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container" data-act="drawer" aria-label="${tr('תפריט ראשי', 'Main menu')}" aria-haspopup="dialog" aria-controls="drawer" aria-expanded="false">${ic('menu')}</button>
      <button type="button" class="w-11 h-11 flex items-center justify-center rounded-full bg-secondary text-on-secondary" data-act="a11y" aria-label="${tr('תפריט נגישות', 'Accessibility menu')}" aria-haspopup="dialog" aria-controls="a11y-panel" aria-expanded="false">${ic('accessibility_new', '!text-[1.375rem]')}</button>
    </div>
    <a href="${href('home')}" class="rounded-full" aria-label="${esc(BUSINESS.name)} – ${tr('דף הבית', 'home')}">${logoWithName(44)}</a>
    <nav class="hidden lg:block" aria-label="${tr('ניווט ראשי', 'Main navigation')}">
      <ul class="flex items-center gap-space-xs p-space-xs bg-surface-container-low rounded-full">${each(nav(), (n) => navLink(n, current))}</ul>
    </nav>
    <div class="flex items-center gap-space-xs sm:gap-space-sm">
      ${langSwitch(current, true)}
      <button type="button" class="relative flex items-center gap-space-xs w-11 h-11 lg:w-auto lg:h-auto justify-center lg:px-space-md lg:py-space-sm lg:min-h-[2.75rem] bg-surface-container-high text-secondary text-label-md rounded-full hover:bg-secondary hover:text-on-secondary transition-colors"
        data-act="cart" aria-label="${tr('סל קניות ריק', 'Cart is empty')}" aria-haspopup="dialog" aria-controls="cart-drawer" aria-expanded="false">
        ${ic('shopping_bag')}<span class="hidden lg:inline" aria-hidden="true">${tr('סל קניות', 'Cart')}</span>
        <span data-cart-count hidden aria-hidden="true" class="absolute -top-1 -end-1 lg:static bg-primary text-on-primary text-label-xs min-w-[1.25rem] h-5 px-1 rounded-full flex items-center justify-center tabular-nums">0</span>
      </button>
      <a href="${href('menu')}" class="btn-pop hidden sm:inline-flex items-center min-h-[2.75rem] px-space-lg bg-primary text-on-primary text-label-md rounded-full">${tr('הזמינו עכשיו', 'Order now')}</a>
    </div>
  </div>
</header>`;
