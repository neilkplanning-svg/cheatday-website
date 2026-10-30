/**
 * Everything that floats above the page: skip link, menu drawer, cart drawer, checkout dialog,
 * accessibility panel + its side button, mobile cart bar and the toast.
 * Rendered once per page; the client fills the dynamic parts.
 * Drawers slide from the reading-start side (menu) and the reading-end side (cart): see .layer in main.css.
 */
import { ic, each } from '../lib/html.js';
import { tr } from '../lib/i18n.js';
import { href } from '../lib/paths.js';
import { waLink } from '../lib/links.js';
import { logoWithName } from './brand.js';
import { langSwitch } from './ui.js';
import { nav, legalNav } from './nav.js';

export const skipLink = () => `<a href="#main" class="skip-link">${tr('דילוג לתוכן הראשי', 'Skip to main content')}</a>`;

const menuDrawer = (current) => `
<div id="drawer" role="dialog" aria-modal="true" aria-label="${tr('תפריט ראשי', 'Main menu')}" data-layer="drawer" hidden
  class="layer fixed top-0 bottom-0 start-0 z-[70] w-[min(20rem,86vw)] bg-surface shadow-2xl flex flex-col pt-safe pb-safe overflow-y-auto">
  <div class="flex items-center justify-between p-space-md">
    ${logoWithName(40)}
    <button type="button" data-act="close" class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center" aria-label="${tr('סגירת התפריט', 'Close menu')}">${ic('close')}</button>
  </div>
  <nav aria-label="${tr('ניווט ראשי (נייד)', 'Main navigation (mobile)')}"><ul class="flex flex-col gap-space-xs px-space-md">
    ${each(nav(), (n) => `<li><a href="${href(n.id)}" ${n.id === current ? 'aria-current="page"' : ''} class="flex items-center gap-space-sm px-space-md min-h-[3rem] rounded-full text-label-lg ${n.id === current ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-container'}">${ic(n.icon)}${n.label}</a></li>`)}
    ${each(legalNav(), (n) => `<li><a href="${href(n.id)}" ${n.id === current ? 'aria-current="page"' : ''} class="flex items-center gap-space-sm px-space-md min-h-[2.75rem] rounded-full text-label-md text-on-surface-variant hover:bg-surface-container">${ic(n.icon)}${n.label}</a></li>`)}
  </ul></nav>
  <div class="px-space-md pt-space-md">${langSwitch(current)}</div>
  <div class="mt-auto p-space-md flex flex-col gap-space-sm">
    <button type="button" data-act="install" class="btn-pop w-full min-h-[3rem] rounded-full bg-secondary text-on-secondary text-label-lg flex items-center justify-center gap-space-xs" hidden>${ic('install_mobile')}${tr('התקנת האפליקציה', 'Install the app')}</button>
    <a href="${waLink(tr('היי CheatDay! אשמח להזמין 🧁', "Hi CheatDay! I'd like to order 🧁"))}" target="_blank" rel="noopener" class="w-full min-h-[3rem] rounded-full bg-whatsapp text-on-primary text-label-lg flex items-center justify-center gap-space-xs">${ic('chat')}${tr('הזמנה בוואטסאפ', 'Order on WhatsApp')}<span class="sr-only">${tr(' (נפתח בחלון חדש)', ' (opens in a new tab)')}</span></a>
  </div>
</div>`;

const cartDrawer = () => `
<div id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title-drawer" data-layer="cart" hidden
  class="layer fixed z-[70] bg-surface-container-lowest shadow-2xl flex flex-col inset-x-0 bottom-0 max-h-[88vh] rounded-t-[1.75rem] pb-safe lg:inset-x-auto lg:end-0 lg:top-0 lg:bottom-0 lg:max-h-none lg:w-[26rem] lg:rounded-none lg:rounded-s-[1.75rem]">
  <div class="lg:hidden mx-auto mt-space-sm w-12 h-1.5 rounded-full bg-outline-variant" aria-hidden="true"></div>
  <div class="overflow-y-auto p-space-lg pt-space-md" data-cart-panel="drawer"></div>
</div>`;

const checkoutDialog = () => `
<div id="checkout" role="dialog" aria-modal="true" aria-labelledby="co-title" data-checkout hidden class="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-space-md">
  <div class="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm" data-act="close-checkout" aria-hidden="true"></div>
  <div class="relative w-full sm:max-w-xl max-h-[92vh] overflow-y-auto bg-surface rounded-t-[1.75rem] sm:rounded-[1.75rem] shadow-2xl p-space-lg pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]" data-checkout-body></div>
</div>`;

const a11yPanel = () => `
<div id="a11y-panel" role="dialog" aria-modal="true" aria-labelledby="a11y-title" data-a11y hidden
  class="fixed z-[85] inset-x-2 bottom-2 top-auto max-h-[calc(100vh-1rem)] overflow-y-auto lg:inset-x-auto lg:left-20 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:w-[26rem] bg-surface-container-lowest text-on-surface rounded-lg p-space-md shadow-2xl border-2 border-secondary"></div>
<button type="button" data-act="a11y" class="a11y-tab fixed z-[60] left-0 top-[38%] flex items-center gap-space-xs ps-space-sm pe-space-sm min-h-[3rem] rounded-r-full bg-secondary text-on-secondary shadow-pop-md"
  aria-label="${tr('תפריט נגישות (קיצור מקלדת Alt+A)', 'Accessibility menu (keyboard shortcut Alt+A)')}" aria-haspopup="dialog" aria-controls="a11y-panel" aria-expanded="false">
  ${ic('accessibility_new', '!text-[1.75rem]')}<span class="a11y-tab-label text-label-md">${tr('נגישות', 'Accessibility')}</span>
</button>`;

const cartBar = () => `
<div class="lg:hidden fixed inset-x-0 z-40 gutter-x pointer-events-none bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))]" data-cart-bar hidden>
  <div class="pointer-events-auto mx-auto max-w-md bg-inverse-surface text-inverse-on-surface rounded-full p-2 ps-3 shadow-xl flex items-center justify-between gap-space-sm">
    <button type="button" data-act="cart" class="flex items-center gap-space-sm text-start min-h-[2.75rem]" aria-haspopup="dialog" aria-controls="cart-drawer">
      <span class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center relative">${ic('shopping_basket', '!text-[1.25rem]')}<span data-cart-count aria-hidden="true" class="absolute -top-1 -start-1 bg-surface text-on-surface rounded-full text-label-xs min-w-[1.25rem] h-5 px-1 flex items-center justify-center tabular-nums">0</span></span>
      <span class="flex flex-col"><span class="text-label-md">${tr('לצפייה בסל', 'View cart')}</span><span class="text-headline-sm text-primary-fixed leading-tight tabular-nums" data-cart-total>₪0</span></span>
    </button>
    <button type="button" data-act="checkout" class="min-h-[2.75rem] px-space-md rounded-full bg-primary text-on-primary text-label-md flex items-center gap-space-xs">${tr('להזמנה', 'Checkout')} ${ic('arrow_back', 'fwd !text-[1.125rem]')}</button>
  </div>
</div>`;

const toast = () => `
<div class="toast fixed z-[95] left-1/2 -translate-x-1/2 top-[calc(4.75rem+env(safe-area-inset-top,0px))] lg:top-auto lg:bottom-8 w-max max-w-[calc(100vw-2rem)] bg-secondary text-on-secondary px-space-lg py-space-sm rounded-full shadow-2xl text-label-md flex items-center gap-space-xs opacity-0 pointer-events-none transition-opacity duration-300" data-toast role="status" aria-live="polite"></div>
<div class="sr-only" aria-live="assertive" data-alert></div>`;

const reading = () => `<div class="reading-guide" data-reading-guide hidden aria-hidden="true"></div>`;

export const overlays = (current) => [
  `<div class="fixed inset-0 z-[60] bg-inverse-surface/50 backdrop-blur-sm" data-scrim hidden aria-hidden="true"></div>`,
  menuDrawer(current), cartDrawer(), checkoutDialog(), a11yPanel(), cartBar(), toast(), reading(),
].join('\n');

/** Thin draft banner under the header */
export const draftBar = () => `
<div class="bg-tertiary-fixed text-on-tertiary-fixed" data-draft-bar>
  <div class="wrap gutter-x py-space-xs flex items-center justify-between gap-space-sm text-label-sm">
    <p class="flex items-center gap-space-xs">${ic('construction', '!text-[1rem]')}${tr('גרסת טיוטה: חלק מהמחירים, האיורים והביקורות הם לדוגמה עד להשלמת הפרטים.', 'Draft version: some prices, illustrations and reviews are samples until the details are complete.')}</p>
    <button type="button" data-act="hide-draft" class="w-10 h-10 rounded-full hover:bg-on-tertiary-fixed/10 flex items-center justify-center shrink-0" aria-label="${tr('הסתרת הודעת הטיוטה', 'Hide the draft notice')}">${ic('close', '!text-[1.125rem]')}</button>
  </div>
</div>`;
