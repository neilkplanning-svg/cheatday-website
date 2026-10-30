/** Home page */
import { BUSINESS, DELIVERY, PRODUCTS, REVIEWS, CLUB, findItem } from '../data/index.js';
import * as ART from '../lib/art.js';
import { esc, ic, icf, each, brandName } from '../lib/html.js';
import { tr, loc } from '../lib/i18n.js';
import { nis } from '../lib/format.js';
import { href } from '../lib/paths.js';
import { logo } from '../components/brand.js';
import { productCard } from '../components/product-card.js';
import { sectionHead, stars, sampleChip } from '../components/ui.js';
import { clubSection, pickupCard } from '../components/sections.js';

const hero = () => {
  const city = loc(BUSINESS.city);
  const pair = findItem('classic-pair');
  return `
<section class="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pt-space-lg pb-space-xl" aria-labelledby="hero-title">
  <div class="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none" aria-hidden="true"></div>
  <div class="wrap gutter-x relative">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-gutter items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-space-md">
        <p class="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high text-primary rounded-full shadow-pop text-label-md">${icf('local_fire_department', '!text-[1.125rem]')}${tr('טרי מהתנור, תוצרת בית', 'Fresh from the oven, homemade', 'Прямо из духовки, домашнее')}</p>
        <h1 id="hero-title" class="text-display-mobile md:text-display text-on-surface">${esc(loc(BUSINESS.tagline))}:<br>
          <span class="text-primary underline decoration-secondary-container decoration-wavy decoration-4 underline-offset-8">${tr('סינבון רולס מושחתים', 'Seriously indulgent cinnamon rolls', 'Грешно вкусные синнабоны')}</span><br>${tr('ביתיים וטריים', 'homemade & fresh', 'домашние и свежие')}</h1>
        <p class="text-body-lg text-on-surface-variant max-w-xl">${tr(
          `בצק שמרים רך וענני בעבודת יד, ממולא בקינמון ציילון ומצופה בגלייז גבינה עשיר ונוטף. נאפה במיוחד בשבילכם, ביום שאתם בוחרים, ב${esc(city)}.`,
          `Soft, cloud-like handmade yeast dough, filled with Ceylon cinnamon and topped with a rich, dripping cream-cheese glaze. Baked just for you, on the day you choose, in ${esc(city)}.`, `Мягкое воздушное дрожжевое тесто ручной работы с цейлонской корицей под щедрой тающей глазурью из сливочного сыра. Испечём специально для вас в выбранный день, в г.\u00a0${esc(city)}.`)}</p>
        <div class="flex flex-col sm:flex-row gap-space-sm w-full sm:w-auto pt-space-xs">
          <a href="${href('menu')}" class="btn-pop min-h-[3rem] px-space-xl py-space-md bg-primary text-on-primary text-label-lg rounded-full shadow-pop-md flex items-center justify-center gap-space-xs">${tr('להזמנה מהירה', 'Quick order', 'Быстрый заказ')} ${ic('arrow_back', 'fwd !text-[1.25rem]')}</a>
          <a href="${href('story', 'video')}" class="btn-pop min-h-[3rem] px-space-lg py-space-md bg-surface-container text-secondary text-label-lg rounded-full flex items-center justify-center gap-space-xs">${icf('play_circle', 'text-primary')}${tr('איך אנחנו אופים', 'How we bake', 'Как мы печём')}</a>
        </div>
        <ul class="flex flex-wrap items-center gap-space-sm pt-space-sm" aria-label="${tr('יתרונות', 'Highlights', 'Преимущества')}">
          <li class="chip bg-surface-container-lowest text-on-surface shadow-sm">${ic('home_work', 'text-primary !text-[1rem]')}${tr('100% תוצרת בית', '100% homemade', '100% домашнее')}</li>
          <li class="chip bg-surface-container-lowest text-on-surface shadow-sm">${ic('event_available', 'text-primary !text-[1rem]')}${tr('אפשר להזמין ל', 'Earliest pickup: ', 'Ближайший самовывоз: ')}<span data-dyn="next-date">${tr('יום ההזמנה הקרוב', 'the next order day', 'ближайший день заказа')}</span></li>
        </ul>
      </div>
      <div class="lg:col-span-5 relative flex justify-center order-first lg:order-none">
        <div class="relative w-full max-w-[28rem]">
          <div class="absolute inset-0 bg-primary-container rounded-[1.75rem] rotate-3 shadow-pop-xl" aria-hidden="true"></div>
          <figure class="relative bg-surface-container-lowest rounded-[1.75rem] p-space-sm shadow-pop-xl overflow-hidden">
            <div class="art w-full h-72 sm:h-[22rem] rounded-2xl overflow-hidden">${ART.hero(tr('איור: סינבון קלאסי עם גלייז גבינה וסוכריות צבעוניות', 'Illustration: a classic cinnamon roll with cream-cheese glaze and sprinkles', 'Иллюстрация: классический синнабон с сырной глазурью и цветной посыпкой'))}</div>
            <span class="absolute top-6 end-6 bg-primary text-on-primary text-label-md px-space-md py-space-xs rounded-full shadow-pop flex items-center gap-space-xs">${ic('celebration', '!text-[1rem]')}${tr('נאפה לפי הזמנה', 'Baked to order', 'Печём под заказ')}</span>
            <figcaption class="p-space-md bg-surface-container-low mt-space-sm rounded-2xl flex items-center justify-between gap-space-sm">
              <span><span class="block text-headline-sm text-secondary">${tr('הקלאסי המפורסם', 'The famous classic', 'Знаменитая классика')}</span><span class="text-body-sm text-on-surface-variant">${tr('גלייז גבינה, קינמון וסוכר חום נמס', 'Cream-cheese glaze, cinnamon and melted brown sugar', 'Сырная глазурь, корица и растопленный коричневый сахар')}</span></span>
              <span class="flex flex-col items-end shrink-0 text-end">
                <span class="text-headline-md text-primary tabular-nums"><span class="sr-only">${tr('מחיר ליחידה', 'Price per roll', 'Цена за штуку')}: </span>${nis(PRODUCTS[0].price)}</span>
                ${pair ? `<span class="text-label-sm text-secondary tabular-nums">${tr(`זוג ב-${nis(pair.price)}`, `Pair for ${nis(pair.price)}`, `Пара за ${nis(pair.price)}`)}</span>` : ''}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</section>`;
};

const features = () => `
<section class="bg-surface-container py-space-lg" aria-label="${tr('למה CheatDay', 'Why CheatDay', 'Почему CheatDay')}">
  <div class="wrap gutter-x">
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      ${each([
        ['bakery_dining', 'bg-primary-fixed text-primary', tr('נאפה לפי הזמנה', 'Baked to order', 'Печём под заказ'), tr('כל מגש נכנס לתנור בשבילכם, ביום האיסוף', 'Every tray goes into the oven for you, on pickup day', 'Каждый противень отправляется в духовку для вас — в день самовывоза')],
        ['verified', 'bg-secondary-fixed text-secondary', tr('רכיבים איכותיים בלבד', 'Quality ingredients only', 'Только качественные ингредиенты'), tr('חמאה אמיתית, קינמון ציילון ווניל אמיתי', 'Real butter, Ceylon cinnamon and real vanilla', 'Настоящее масло, цейлонская корица и настоящая ваниль')],
        ['electric_moped', 'bg-primary-fixed-dim text-on-primary-fixed', tr(`איסוף ומשלוח ב${loc(BUSINESS.city)}`, `Pickup & delivery in ${loc(BUSINESS.city)}`, `Самовывоз и доставка, г.\u00a0${loc(BUSINESS.city)}`), tr(`משלוח חינם בהזמנה מעל ${nis(DELIVERY.freeAbove)}`, `Free delivery on orders over ${nis(DELIVERY.freeAbove)}`, `Бесплатная доставка при заказе от ${nis(DELIVERY.freeAbove)}`)],
      ], ([i, c, t, s]) => `<li class="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-2xl shadow-pop">
        <span class="w-14 h-14 rounded-full ${c} flex items-center justify-center shrink-0">${icf(i, '!text-[1.875rem]')}</span>
        <span class="min-w-0"><span class="block text-headline-sm text-secondary">${esc(t)}</span><span class="text-body-sm text-on-surface-variant">${esc(s)}</span></span>
      </li>`)}
    </ul>
  </div>
</section>`;

const bestsellers = () => {
  const box = findItem('box6');
  return `
<section class="py-space-xl" aria-labelledby="best-title">
  <div class="wrap gutter-x">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
      ${sectionHead({
        eyebrow: tr('הנבחרת המושחתת שלנו', 'Our indulgent line-up', 'Наша грешная подборка'),
        title: tr('הכי מבוקשים אצלנו', 'Most wanted', 'Самые популярные'),
        sub: tr('הרולים שגורמים לכולם לבקש עוד אחד', 'The rolls that make everyone ask for one more', 'Синнабоны, после которых все просят ещё один'),
        id: 'best-title',
      })}
      <a href="${href('menu')}" class="text-label-md text-primary flex items-center gap-1 underline underline-offset-4 min-h-[2.75rem] shrink-0">${tr('לכל התפריט', 'Full menu', 'Всё меню')} ${ic('chevron_left', 'fwd !text-[1.125rem]')}</a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">${each(PRODUCTS.filter((p) => p.featured), (p) => productCard(p, 'home'))}</div>
    ${box ? `<div class="mt-space-xl p-space-lg bg-surface-container-high rounded-[1.75rem] shadow-pop-md flex flex-col lg:flex-row items-center justify-between gap-space-lg">
      <div class="flex flex-col sm:flex-row items-center gap-space-md text-center sm:text-start">
        <span class="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-pop shrink-0">${icf('redeem', '!text-[2rem]')}</span>
        <div><h3 class="text-headline-md text-secondary">${tr('מתכננים מפגש או מסיבה? קחו מארז שישייה', 'Planning a get-together? Grab a box of six', 'Собираетесь с друзьями? Возьмите набор из шести')}</h3><p class="text-body-md text-on-surface-variant">${esc(loc(box.desc))}</p></div>
      </div>
      <button type="button" class="btn-pop w-full lg:w-auto min-h-[3rem] px-space-xl bg-secondary text-on-secondary text-label-lg rounded-full whitespace-nowrap" data-act="add" data-id="box6" data-fixed="1">${tr(`מארז ב-${nis(box.price)} לסל`, `Add the ${nis(box.price)} box to cart`, `Набор за ${nis(box.price)} — в корзину`)}</button>
    </div>` : ''}
  </div>
</section>`;
};

const slogan = () => `
<section class="bg-secondary text-on-secondary py-space-xl relative overflow-hidden" aria-label="${tr('המשפט שלנו', 'Our motto', 'Наш девиз')}">
  <div class="max-w-[1000px] mx-auto gutter-x text-center relative flex flex-col items-center gap-space-md">
    ${logo(112, '', 'shadow-pop-md rounded-full')}
    <p class="text-headline-lg md:text-display font-extrabold">${tr(
      `״כי לכל אחד מגיע <span class="text-primary-fixed underline decoration-primary-fixed decoration-4 underline-offset-8">${brandName('CheatDay')} אמיתי</span>״`,
      `“Because everyone deserves a <span class="text-primary-fixed underline decoration-primary-fixed decoration-4 underline-offset-8">real ${brandName('CheatDay')}</span>”`, `«Потому что каждый заслуживает <span class="text-primary-fixed underline decoration-primary-fixed decoration-4 underline-offset-8">настоящий ${brandName('CheatDay')}</span>»`)}</p>
    <p class="text-body-lg text-secondary-fixed max-w-2xl">${tr(
      'בלי רגשות אשם, בלי פשרות על הטעם ובלי לספור קלוריות. רק אתם, בצק חם ונימוח ושכבה עבה של אושר מתוק.',
      'No guilt, no compromise on taste and no counting calories. Just you, warm tender dough and a thick layer of sweet happiness.', 'Без чувства вины, без компромиссов во вкусе и без подсчёта калорий. Только вы, тёплое нежное тесто и толстый слой сладкого счастья.')}</p>
  </div>
</section>`;

const reviews = () => `
<section class="bg-surface-container-low py-space-xl" aria-labelledby="reviews-title">
  <div class="wrap gutter-x">
    <div class="text-center max-w-xl mx-auto mb-space-xl flex flex-col items-center gap-space-xs">
      ${stars(5, '!text-[1.5rem]')}
      <h2 id="reviews-title" class="text-headline-lg-mobile md:text-headline-lg text-on-surface">${tr('מה אומרים עלינו', 'What people say', 'Что о нас говорят')}</h2>
      <p class="text-body-md text-on-surface-variant">${tr('הלקוחות שלנו מתמכרים כבר מהביס הראשון', 'Our customers are hooked from the first bite', 'Наши клиенты влюбляются с первого укуса')}</p>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      ${each(REVIEWS, (r, i) => `<li><figure class="h-full bg-surface-container-lowest p-space-lg rounded-2xl shadow-pop-md flex flex-col justify-between gap-space-md">
        <div class="flex flex-col gap-space-sm"><div class="flex items-center justify-between">${stars(5)}${sampleChip()}</div>
        <blockquote class="text-body-md text-on-surface font-medium"><p>${tr('״', '“', '«')}${esc(loc(r.text))}${tr('״', '”', '»')}</p></blockquote></div>
        <figcaption class="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
          <span class="w-10 h-10 rounded-full ${['bg-primary-fixed text-primary', 'bg-secondary-fixed text-secondary', 'bg-primary-fixed-dim text-on-primary-fixed'][i % 3]} flex items-center justify-center text-headline-sm" aria-hidden="true">${esc(loc(r.initial))}</span>
          <span><span class="block text-label-md text-on-surface">${esc(loc(r.name))}</span><span class="text-body-sm text-on-surface-variant">${esc(loc(r.place))}</span></span>
        </figcaption></figure></li>`)}
    </ul>
  </div>
</section>`;

export const page = {
  id: 'home',
  title: () => tr(
    `${BUSINESS.name} | סינבונים וקינוחים ביתיים ב${loc(BUSINESS.city)} – הזמנה אונליין`,
    `${BUSINESS.name} | Homemade cinnamon rolls & desserts in ${loc(BUSINESS.city)} – order online`, `${BUSINESS.name} | Домашние синнабоны и десерты в г.\u00a0${loc(BUSINESS.city)} — заказ онлайн`),
  description: () => tr(
    `סינבונים ביתיים טריים ב${loc(BUSINESS.city)}: סינבון קלאסי ב-${nis(PRODUCTS[0].price)}, זוג ב-${nis(findItem('classic-pair').price)}, נוטלה, קרמל מלוח ולוטוס. נאפה לפי הזמנה, איסוף עצמי או משלוח. מזמינים באתר ומאשרים בוואטסאפ.`,
    `Fresh homemade cinnamon rolls in ${loc(BUSINESS.city)}, Israel: classic roll ${nis(PRODUCTS[0].price)}, pair box ${nis(findItem('classic-pair').price)}, Nutella, salted caramel and Lotus. Baked to order, pickup or delivery. Order online and confirm on WhatsApp.`, `Свежие домашние синнабоны в г.\u00a0${loc(BUSINESS.city)} (Израиль): классический синнабон ${nis(PRODUCTS[0].price)}, набор из двух ${nis(findItem('classic-pair').price)}, нутелла, солёная карамель и «Лотус». Печём под заказ, самовывоз или доставка. Заказ на сайте с подтверждением в WhatsApp.`),
  render: () => [hero(), features(), bestsellers(), slogan(), reviews(), CLUB.enabled ? clubSection() : '',
    `<div class="pb-space-xl"><div class="max-w-[1000px] mx-auto gutter-x">${pickupCard()}</div></div>`].join('\n'),
};
