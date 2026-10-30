/** Menu & ordering page */
import { BUSINESS, DELIVERY, ORDERING, CATEGORIES, PRODUCTS } from '../data/index.js';
import { esc, ic, each } from '../lib/html.js';
import { tr, loc } from '../lib/i18n.js';
import { nis } from '../lib/format.js';
import { productCard } from '../components/product-card.js';
import { filterPills } from '../components/ui.js';

export const page = {
  id: 'menu',
  breadcrumb: () => tr('תפריט והזמנות', 'Menu & orders', 'Меню и заказы'),
  title: () => tr(`תפריט סינבונים ומארזים | ${BUSINESS.name} ${loc(BUSINESS.city)}`, `Cinnamon roll menu & boxes | ${BUSINESS.name} ${loc(BUSINESS.city)}`, `Меню синнабонов и наборов | ${BUSINESS.name}, ${loc(BUSINESS.city)}`),
  description: () => tr(
    `התפריט המלא של ${BUSINESS.name}: סינבון קלאסי ב-${nis(PRODUCTS[0].price)}, מארז זוג, מהדורות מושחתות, מארזי שישייה ומגשי אירוח. מחירים, הזמנה אונליין ומשלוח ל${loc(BUSINESS.city)} והסביבה.`,
    `The full ${BUSINESS.name} menu: classic cinnamon roll ${nis(PRODUCTS[0].price)}, pair box, indulgent editions, boxes of six and party trays. Prices, online ordering and delivery around ${loc(BUSINESS.city)}.`, `Полное меню ${BUSINESS.name}: классический синнабон ${nis(PRODUCTS[0].price)}, набор из двух, особые выпуски, наборы из шести и подносы для гостей. Цены, онлайн-заказ и доставка (${loc(BUSINESS.city)} и окрестности).`),
  render: () => `
<div class="relative overflow-hidden">
  <div class="absolute -top-24 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
  <div class="wrap gutter-x pt-space-md pb-space-xl relative">
    <section class="w-full bg-surface-container rounded-lg p-space-md shadow-md mb-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md" aria-label="${tr('זמינות הזמנות', 'Order availability', 'Доступность заказов')}">
      <div class="flex items-center gap-space-sm w-full md:w-auto">
        <span class="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-pop shrink-0" aria-hidden="true">${ic('oven_gen')}</span>
        <div class="min-w-0">
          <p class="flex flex-wrap items-center gap-x-space-xs text-label-md text-primary"><span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>${tr('מזמינים עכשיו, אוספים כבר ב', 'Order now, pick up as early as ', 'Закажите сейчас. Ближайший самовывоз: ')}<span data-dyn="next-date">${tr('יום ההזמנה הקרוב', 'the next order day', 'ближайший день заказа')}</span></p>
          <p class="text-body-sm text-on-surface-variant">${esc(loc(ORDERING.leadNote))}. ${esc(loc(ORDERING.rushNote))}.</p>
        </div>
      </div>
      <ul class="flex flex-wrap items-center gap-space-sm w-full md:w-auto md:justify-end">
        <li class="chip bg-surface-bright text-on-surface shadow-sm !px-space-md">${ic('local_fire_department', 'text-secondary !text-[1.125rem]')}${tr('נאפה טרי לכל הזמנה', 'Baked fresh for every order', 'Печём свежим к каждому заказу')}</li>
        <li class="chip bg-surface-bright text-on-surface shadow-sm !px-space-md">${ic('workspace_premium', 'text-tertiary !text-[1.125rem]')}${tr('חמאה אמיתית', 'Real butter', 'Настоящее масло')}</li>
      </ul>
    </section>

    <div class="menu-filters flex flex-col gap-space-sm mb-space-lg sticky lg:static top-[calc(4rem+env(safe-area-inset-top,0px))] z-30 bg-surface/95 backdrop-blur-md -mx-4 px-4 py-space-xs lg:mx-0 lg:px-0 lg:bg-transparent lg:backdrop-blur-none">
      <div class="flex items-center justify-between">
        <h1 class="text-headline-lg-mobile md:text-headline-lg text-on-surface">${tr('בחרו את הפינוק שלכם', 'Pick your treat', 'Выберите своё лакомство')}</h1>
        <p class="text-label-sm text-on-surface-variant hidden sm:block" data-filter-count aria-live="polite">${tr(`${PRODUCTS.length} מוצרים ומארזים`, `${PRODUCTS.length} products and boxes`, `Товаров и наборов: ${PRODUCTS.length}`)}</p>
      </div>
      ${filterPills(CATEGORIES, 'all')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
      <section class="lg:col-span-8 flex flex-col gap-space-lg" aria-label="${tr('מוצרים', 'Products', 'Товары')}">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter" id="products-grid">${each(PRODUCTS, (p) => productCard(p, 'menu'))}</div>
        <div class="w-full bg-surface-container-high rounded-[1.75rem] p-space-lg shadow-sm flex flex-col md:flex-row items-center gap-space-lg text-center md:text-start">
          <span class="w-20 h-20 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-md shrink-0" aria-hidden="true">${ic('local_shipping', 'text-primary !text-[2.25rem]')}</span>
          <div class="flex-1"><h2 class="text-headline-sm text-on-surface mb-space-xs">${tr(`משלוח חינם בהזמנה מעל ${nis(DELIVERY.freeAbove)}`, `Free delivery on orders over ${nis(DELIVERY.freeAbove)}`, `Бесплатная доставка при заказе от ${nis(DELIVERY.freeAbove)}`)}</h2>
          <p class="text-body-sm text-on-surface-variant">${tr('כל הזמנה נארזת בקופסה מעוצבת עם הוראות חימום, כדי שהגלייז יימס בדיוק כמו ביציאה מהתנור.', 'Every order is packed in a designed box with reheating instructions, so the glaze melts just like it did straight out of the oven.', 'Каждый заказ упакован в фирменную коробку с инструкцией по разогреву, чтобы глазурь растаяла так же, как прямо из духовки.')}</p></div>
          <span class="chip bg-primary text-on-primary shadow-pop-sm !px-space-md !py-space-sm">${tr(`משלוחים ל${loc(DELIVERY.areas[0])} והסביבה`, `Delivery around ${loc(DELIVERY.areas[0])}`, `Доставка: ${loc(DELIVERY.areas[0])} и окрестности`)}</span>
        </div>
      </section>
      <aside class="hidden lg:flex lg:col-span-4 lg:sticky lg:top-24 flex-col gap-space-md" aria-label="${tr('הסל שלך', 'Your cart', 'Ваша корзина')}">
        <div class="bg-surface-container-lowest rounded-lg p-space-lg shadow-xl" data-cart-panel="side"></div>
        <div class="bg-surface-container rounded-lg p-space-md shadow-sm flex items-center gap-space-md">
          <span class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0" aria-hidden="true">${ic('location_on')}</span>
          <div><h2 class="text-headline-sm text-on-surface">${tr(`איסוף עצמי ב${loc(BUSINESS.city)}`, `Pickup in ${loc(BUSINESS.city)}`, `Самовывоз (${loc(BUSINESS.city)})`)}</h2><p class="text-body-sm text-on-surface-variant">${esc(loc(BUSINESS.pickupNote))}</p></div>
        </div>
      </aside>
    </div>
  </div>
</div>`,
};
