/** Menu & ordering page */
import { BUSINESS, DELIVERY, ORDERING, CATEGORIES, PRODUCTS } from '../data/index.js';
import { esc, ic, each } from '../lib/html.js';
import { nis } from '../lib/format.js';
import { productCard } from '../components/product-card.js';
import { filterPills } from '../components/ui.js';

export const page = {
  id: 'menu',
  breadcrumb: 'תפריט והזמנות',
  title: `תפריט סינבונים ומארזים | ${BUSINESS.name} ${BUSINESS.city}`,
  description: `התפריט המלא של ${BUSINESS.name}: סינבונים קלאסיים, מהדורות מושחתות, מארזי שישייה ומגשי אירוח. מחירים, הזמנה אונליין ומשלוח ל${BUSINESS.city} והסביבה.`,
  render: () => `
<div class="relative overflow-hidden">
  <div class="absolute -top-24 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
  <div class="wrap gutter-x pt-space-md pb-space-xl relative">
    <section class="w-full bg-surface-container rounded-lg p-space-md shadow-md mb-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md" aria-label="זמינות הזמנות">
      <div class="flex items-center gap-space-sm w-full md:w-auto">
        <span class="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-pop shrink-0" aria-hidden="true">${ic('oven_gen')}</span>
        <div class="min-w-0">
          <p class="flex items-center gap-space-xs text-label-md text-primary"><span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>מזמינים עכשיו, אוספים ב<span data-dyn="next-date">יום ההזמנה הקרוב</span></p>
          <p class="text-body-sm text-on-surface-variant">${esc(ORDERING.weekendNote)}. ${esc(ORDERING.eventsNote)}.</p>
        </div>
      </div>
      <ul class="flex flex-wrap items-center gap-space-sm w-full md:w-auto md:justify-end">
        <li class="chip bg-surface-bright text-on-surface shadow-sm !px-space-md">${ic('local_fire_department', 'text-secondary !text-[1.125rem]')}נאפה טרי לכל הזמנה</li>
        <li class="chip bg-surface-bright text-on-surface shadow-sm !px-space-md">${ic('workspace_premium', 'text-tertiary !text-[1.125rem]')}חמאה אמיתית</li>
      </ul>
    </section>

    <div class="menu-filters flex flex-col gap-space-sm mb-space-lg sticky lg:static top-[calc(4rem+env(safe-area-inset-top,0px))] z-30 bg-surface/95 backdrop-blur-md -mx-4 px-4 py-space-xs lg:mx-0 lg:px-0 lg:bg-transparent lg:backdrop-blur-none">
      <div class="flex items-center justify-between">
        <h1 class="text-headline-lg-mobile md:text-headline-lg text-on-surface">בחרו את הפינוק שלכם</h1>
        <p class="text-label-sm text-on-surface-variant hidden sm:block" data-filter-count aria-live="polite">${PRODUCTS.length} מוצרים ומארזים</p>
      </div>
      ${filterPills(CATEGORIES, 'all')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
      <section class="lg:col-span-8 flex flex-col gap-space-lg" aria-label="מוצרים">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter" id="products-grid">${each(PRODUCTS, (p) => productCard(p, 'menu'))}</div>
        <div class="w-full bg-surface-container-high rounded-[1.75rem] p-space-lg shadow-sm flex flex-col md:flex-row items-center gap-space-lg text-center md:text-right">
          <span class="w-20 h-20 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-md shrink-0" aria-hidden="true">${ic('local_shipping', 'text-primary !text-[2.25rem]')}</span>
          <div class="flex-1"><h2 class="text-headline-sm text-on-surface mb-space-xs">משלוח חינם בהזמנה מעל ${nis(DELIVERY.freeAbove)}</h2>
          <p class="text-body-sm text-on-surface-variant">כל הזמנה נארזת בקופסה מעוצבת עם הוראות חימום, כדי שהגלייז יימס בדיוק כמו ביציאה מהתנור.</p></div>
          <span class="chip bg-primary text-on-primary shadow-pop-sm !px-space-md !py-space-sm">משלוחים ל${esc(DELIVERY.areas[0])} והסביבה</span>
        </div>
      </section>
      <aside class="hidden lg:flex lg:col-span-4 lg:sticky lg:top-24 flex-col gap-space-md" aria-label="הסל שלך">
        <div class="bg-surface-container-lowest rounded-lg p-space-lg shadow-xl" data-cart-panel="side"></div>
        <div class="bg-surface-container rounded-lg p-space-md shadow-sm flex items-center gap-space-md">
          <span class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0" aria-hidden="true">${ic('location_on')}</span>
          <div><h2 class="text-headline-sm text-on-surface">איסוף עצמי ב${esc(BUSINESS.city)}</h2><p class="text-body-sm text-on-surface-variant">${esc(BUSINESS.pickupNote)}</p></div>
        </div>
      </aside>
    </div>
  </div>
</div>`,
};
