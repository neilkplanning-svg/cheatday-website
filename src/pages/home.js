/** Home page */
import { BUSINESS, DELIVERY, PRODUCTS, REVIEWS, CLUB } from '../data/index.js';
import * as ART from '../lib/art.js';
import { esc, ic, icf, each, brandName } from '../lib/html.js';
import { nis } from '../lib/format.js';
import { href } from '../lib/paths.js';
import { logo } from '../components/brand.js';
import { productCard } from '../components/product-card.js';
import { sectionHead, stars, sampleChip } from '../components/ui.js';
import { clubSection, pickupCard } from '../components/sections.js';

const hero = () => `
<section class="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pt-space-lg pb-space-xl" aria-labelledby="hero-title">
  <div class="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none" aria-hidden="true"></div>
  <div class="wrap gutter-x relative">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-gutter items-center">
      <div class="lg:col-span-7 flex flex-col items-start gap-space-md">
        <p class="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high text-primary rounded-full shadow-pop text-label-md">${icf('local_fire_department', '!text-[1.125rem]')}טרי מהתנור, תוצרת בית</p>
        <h1 id="hero-title" class="text-display-mobile md:text-display text-on-surface">${esc(BUSINESS.tagline)}:<br>
          <span class="text-primary underline decoration-secondary-container decoration-wavy decoration-4 underline-offset-8">סינמון רולס מושחתים</span><br>ביתיים וטריים</h1>
        <p class="text-body-lg text-on-surface-variant max-w-xl">בצק שמרים רך וענני בעבודת יד, ממולא בקינמון ציילון ומצופה בגלייז גבינה עשיר ונוטף. נאפה במיוחד בשבילכם, ביום שאתם בוחרים, ב${esc(BUSINESS.city)}.</p>
        <div class="flex flex-col sm:flex-row gap-space-sm w-full sm:w-auto pt-space-xs">
          <a href="${href('menu')}" class="btn-pop min-h-[3rem] px-space-xl py-space-md bg-primary text-on-primary text-label-lg rounded-full shadow-pop-md flex items-center justify-center gap-space-xs">להזמנה מהירה ${ic('arrow_back', '!text-[1.25rem]')}</a>
          <a href="${href('story', 'video')}" class="btn-pop min-h-[3rem] px-space-lg py-space-md bg-surface-container text-secondary text-label-lg rounded-full flex items-center justify-center gap-space-xs">${icf('play_circle', 'text-primary')}איך אנחנו אופים</a>
        </div>
        <ul class="flex flex-wrap items-center gap-space-sm pt-space-sm" aria-label="יתרונות">
          <li class="chip bg-surface-container-lowest text-on-surface shadow-sm">${ic('home_work', 'text-primary !text-[1rem]')}100% תוצרת בית</li>
          <li class="chip bg-surface-container-lowest text-on-surface shadow-sm">${ic('event_available', 'text-primary !text-[1rem]')}אפשר להזמין ל<span data-dyn="next-date">יום ההזמנה הקרוב</span></li>
        </ul>
      </div>
      <div class="lg:col-span-5 relative flex justify-center order-first lg:order-none">
        <div class="relative w-full max-w-[28rem]">
          <div class="absolute inset-0 bg-primary-container rounded-[1.75rem] rotate-3 shadow-pop-xl" aria-hidden="true"></div>
          <figure class="relative bg-surface-container-lowest rounded-[1.75rem] p-space-sm shadow-pop-xl overflow-hidden">
            <div class="art w-full h-72 sm:h-[22rem] rounded-2xl overflow-hidden">${ART.hero('איור: סינבון קלאסי עם גלייז גבינה וסוכריות צבעוניות')}</div>
            <span class="absolute top-6 left-6 bg-primary text-on-primary text-label-md px-space-md py-space-xs rounded-full shadow-pop flex items-center gap-space-xs">${ic('celebration', '!text-[1rem]')}נאפה לפי הזמנה</span>
            <figcaption class="p-space-md bg-surface-container-low mt-space-sm rounded-2xl flex items-center justify-between gap-space-sm">
              <span><span class="block text-headline-sm text-secondary">הקלאסי המפורסם</span><span class="text-body-sm text-on-surface-variant">גלייז גבינה, קינמון וסוכר חום נמס</span></span>
              <span class="text-headline-md text-primary tabular-nums"><span class="sr-only">מחיר: </span>${nis(PRODUCTS[0].price)}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</section>`;

const features = () => `
<section class="bg-surface-container py-space-lg" aria-label="למה CheatDay">
  <div class="wrap gutter-x">
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      ${each([
        ['bakery_dining', 'bg-primary-fixed text-primary', 'נאפה לפי הזמנה', 'כל מגש נכנס לתנור בשבילכם, ביום האיסוף'],
        ['verified', 'bg-secondary-fixed text-secondary', 'רכיבים איכותיים בלבד', 'חמאה אמיתית, קינמון ציילון ווניל אמיתי'],
        ['electric_moped', 'bg-primary-fixed-dim text-on-primary-fixed', `איסוף ומשלוח ב${BUSINESS.city}`, `משלוח חינם בהזמנה מעל ${nis(DELIVERY.freeAbove)}`],
      ], ([i, c, t, s]) => `<li class="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-2xl shadow-pop">
        <span class="w-14 h-14 rounded-full ${c} flex items-center justify-center shrink-0">${icf(i, '!text-[1.875rem]')}</span>
        <span class="min-w-0"><span class="block text-headline-sm text-secondary">${esc(t)}</span><span class="text-body-sm text-on-surface-variant">${esc(s)}</span></span>
      </li>`)}
    </ul>
  </div>
</section>`;

const bestsellers = () => {
  const box = PRODUCTS.find((p) => p.id === 'box6');
  return `
<section class="py-space-xl" aria-labelledby="best-title">
  <div class="wrap gutter-x">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
      ${sectionHead({ eyebrow: 'הנבחרת המושחתת שלנו', title: 'הכי מבוקשים אצלנו', sub: 'הרולים שגורמים לכולם לבקש עוד אחד', id: 'best-title' })}
      <a href="${href('menu')}" class="text-label-md text-primary flex items-center gap-1 underline underline-offset-4 min-h-[2.75rem] shrink-0">לכל התפריט ${ic('chevron_left', '!text-[1.125rem]')}</a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">${each(PRODUCTS.filter((p) => p.featured), (p) => productCard(p, 'home'))}</div>
    ${box ? `<div class="mt-space-xl p-space-lg bg-surface-container-high rounded-[1.75rem] shadow-pop-md flex flex-col lg:flex-row items-center justify-between gap-space-lg">
      <div class="flex flex-col sm:flex-row items-center gap-space-md text-center sm:text-right">
        <span class="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-pop shrink-0">${icf('redeem', '!text-[2rem]')}</span>
        <div><h3 class="text-headline-md text-secondary">מתכננים מפגש או מסיבה? קחו מארז שישייה</h3><p class="text-body-md text-on-surface-variant">${esc(box.desc)}</p></div>
      </div>
      <button type="button" class="btn-pop w-full lg:w-auto min-h-[3rem] px-space-xl bg-secondary text-on-secondary text-label-lg rounded-full whitespace-nowrap" data-act="add" data-id="box6" data-fixed="1">מארז ב-${nis(box.price)} לסל</button>
    </div>` : ''}
  </div>
</section>`;
};

const slogan = () => `
<section class="bg-secondary text-on-secondary py-space-xl relative overflow-hidden" aria-label="המשפט שלנו">
  <div class="max-w-[1000px] mx-auto gutter-x text-center relative flex flex-col items-center gap-space-md">
    ${logo(112, '', 'shadow-pop-md rounded-full')}
    <p class="text-headline-lg md:text-display font-extrabold">״כי לכל אחד מגיע <span class="text-primary-fixed underline decoration-primary-fixed decoration-4 underline-offset-8">${brandName('CheatDay')} אמיתי</span>״</p>
    <p class="text-body-lg text-secondary-fixed max-w-2xl">בלי רגשות אשם, בלי פשרות על הטעם ובלי לספור קלוריות. רק אתם, בצק חם ונימוח ושכבה עבה של אושר מתוק.</p>
  </div>
</section>`;

const reviews = () => `
<section class="bg-surface-container-low py-space-xl" aria-labelledby="reviews-title">
  <div class="wrap gutter-x">
    <div class="text-center max-w-xl mx-auto mb-space-xl flex flex-col items-center gap-space-xs">
      ${stars(5, '!text-[1.5rem]')}
      <h2 id="reviews-title" class="text-headline-lg-mobile md:text-headline-lg text-on-surface">מה אומרים עלינו</h2>
      <p class="text-body-md text-on-surface-variant">הלקוחות שלנו מתמכרים כבר מהביס הראשון</p>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      ${each(REVIEWS, (r, i) => `<li><figure class="h-full bg-surface-container-lowest p-space-lg rounded-2xl shadow-pop-md flex flex-col justify-between gap-space-md">
        <div class="flex flex-col gap-space-sm"><div class="flex items-center justify-between">${stars(5)}${sampleChip()}</div>
        <blockquote class="text-body-md text-on-surface font-medium"><p>״${esc(r.text)}״</p></blockquote></div>
        <figcaption class="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
          <span class="w-10 h-10 rounded-full ${['bg-primary-fixed text-primary', 'bg-secondary-fixed text-secondary', 'bg-primary-fixed-dim text-on-primary-fixed'][i % 3]} flex items-center justify-center text-headline-sm" aria-hidden="true">${esc(r.initial)}</span>
          <span><span class="block text-label-md text-on-surface">${esc(r.name)}</span><span class="text-body-sm text-on-surface-variant">${esc(r.place)}</span></span>
        </figcaption></figure></li>`)}
    </ul>
  </div>
</section>`;

export const page = {
  id: 'home',
  title: `${BUSINESS.name} | סינבונים וקינוחים ביתיים ב${BUSINESS.city} – הזמנה אונליין`,
  description: `סינבונים ביתיים טריים ב${BUSINESS.city}: אוריג׳ינל פילדלפיה, נוטלה, קרמל מלוח ולוטוס. נאפה לפי הזמנה, איסוף עצמי או משלוח. מזמינים באתר ומאשרים בוואטסאפ.`,
  render: () => [hero(), features(), bestsellers(), slogan(), reviews(), CLUB.enabled ? clubSection() : '',
    `<div class="pb-space-xl"><div class="max-w-[1000px] mx-auto gutter-x">${pickupCard()}</div></div>`].join('\n'),
};
