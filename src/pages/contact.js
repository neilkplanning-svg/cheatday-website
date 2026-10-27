/** Contact page: channels, contact form (opens WhatsApp), hours, delivery areas, FAQ */
import { BUSINESS, DELIVERY, ORDERING, FAQ, KOSHER } from '../data/index.js';
import { mapArt } from '../lib/art.js';
import { esc, ic, each } from '../lib/html.js';
import { nis, fillCopy } from '../lib/format.js';
import { waLink, telHref, instaHandle } from '../lib/links.js';
import { hoursList } from '../components/sections.js';

const channels = () => [
  { href: waLink('היי CheatDay! אשמח להזמין 🧁'), ext: true, icon: 'chat', tone: 'bg-[#25D366]/20 text-whatsapp', label: 'וואטסאפ להזמנות', value: BUSINESS.phone || 'שליחת הודעה' },
  { href: BUSINESS.phone ? telHref() : '', icon: 'call', tone: 'bg-surface-container-high text-primary', label: 'שיחה טלפונית', value: BUSINESS.phone || 'המספר יעודכן בקרוב', ltr: Boolean(BUSINESS.phone) },
  { href: BUSINESS.instagram || '', ext: true, icon: 'photo_camera', tone: 'bg-primary-fixed text-primary', label: 'אינסטגרם', value: instaHandle() || 'בקרוב', ltr: Boolean(BUSINESS.instagram) },
  { href: '', icon: 'pin_drop', tone: 'bg-surface-container-highest text-tertiary', label: 'איסוף עצמי', value: BUSINESS.city },
];

const channelCard = (c) => {
  const inner = `<span class="flex items-center gap-space-sm min-w-0"><span class="w-12 h-12 rounded-full ${c.tone} flex items-center justify-center shrink-0" aria-hidden="true">${ic(c.icon)}</span>
    <span class="flex flex-col min-w-0"><span class="text-label-sm text-on-surface-variant">${c.label}</span><span class="text-label-lg text-on-surface truncate" ${c.ltr ? 'dir="ltr"' : ''}>${esc(c.value)}</span></span></span>`;
  return `<li>${c.href
    ? `<a href="${esc(c.href)}" ${c.ext ? 'target="_blank" rel="noopener"' : ''} class="group h-full bg-surface-container-lowest rounded p-space-md shadow-md hover:-translate-y-1 transition-transform flex items-center justify-between gap-space-sm">${inner}${ic('arrow_back_ios_new', 'text-secondary !text-[1.125rem]')}${c.ext ? '<span class="sr-only"> (נפתח בחלון חדש)</span>' : ''}</a>`
    : `<div class="h-full bg-surface-container-lowest rounded p-space-md shadow-md flex items-center justify-between gap-space-sm">${inner}</div>`}</li>`;
};

const contactForm = () => `
  <form class="flex flex-col gap-space-md" data-form="contact" novalidate aria-describedby="contact-note">
    <p id="contact-note" class="text-body-sm text-on-surface-variant">שדות המסומנים בכוכבית (*) הם חובה. ההודעה תיפתח בוואטסאפ מוכנה לשליחה.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
      <div class="flex flex-col gap-space-xs"><label class="label" for="c-name">שם מלא <span aria-hidden="true">*</span></label>
        <input class="field" id="c-name" name="name" required aria-required="true" autocomplete="name" aria-describedby="c-name-err">
        <p id="c-name-err" class="field-error" data-error-for="c-name"></p></div>
      <div class="flex flex-col gap-space-xs"><label class="label" for="c-phone">טלפון <span aria-hidden="true">*</span></label>
        <input class="field text-right" dir="ltr" id="c-phone" name="phone" type="tel" inputmode="tel" required aria-required="true" autocomplete="tel" placeholder="050-0000000" aria-describedby="c-phone-err">
        <p id="c-phone-err" class="field-error" data-error-for="c-phone"></p></div>
    </div>
    <fieldset class="flex flex-col gap-space-xs"><legend class="label mb-space-xs">נושא הפנייה</legend>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
        ${each([['celebration', 'אירועים ומארזים'], ['help_outline', 'שאלה כללית'], ['sentiment_satisfied', 'משוב ומחמאות']], ([i, t], k) => `
        <label class="relative cursor-pointer"><input type="radio" name="topic" value="${t}" class="peer sr-only" ${k === 0 ? 'checked' : ''}>
          <span class="flex items-center justify-center gap-space-xs min-h-[2.75rem] px-space-md rounded bg-surface-container text-on-surface text-label-sm transition-colors peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2">${ic(i, '!text-[1rem]')}${t}</span></label>`)}
      </div>
    </fieldset>
    <div class="flex flex-col gap-space-xs"><label class="label" for="c-msg">תוכן ההודעה <span aria-hidden="true">*</span></label>
      <textarea class="field resize-y" id="c-msg" name="message" rows="4" required aria-required="true" placeholder="כמה אורחים, אילו טעמים, לאיזה תאריך..." aria-describedby="c-msg-err"></textarea>
      <p id="c-msg-err" class="field-error" data-error-for="c-msg"></p></div>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-space-md">
      <p class="flex items-center gap-space-xs text-on-surface-variant text-label-sm">${ic('lock', 'text-primary !text-[1.125rem]')}הפרטים משמשים רק למענה לפנייה</p>
      <button type="submit" class="btn-pop w-full sm:w-auto px-space-xl min-h-[3rem] rounded-full bg-primary text-on-primary text-label-lg flex items-center justify-center gap-space-xs">הכנת ההודעה ${ic('send', 'flip !text-[1.25rem]')}</button>
    </div>
  </form>
  <div data-contact-ready hidden tabindex="-1" class="p-space-md rounded bg-primary-fixed text-on-primary-fixed flex flex-col sm:flex-row items-center justify-between gap-space-sm">
    <p class="text-label-lg flex items-center gap-space-xs">${ic('mark_email_read')}ההודעה מוכנה. נשאר רק לשלוח</p>
    <a href="#" target="_blank" rel="noopener" class="btn-pop px-space-lg min-h-[2.75rem] rounded-full bg-whatsapp text-on-primary text-label-md flex items-center gap-space-xs">${ic('send', 'flip !text-[1.125rem]')}שליחה בוואטסאפ<span class="sr-only"> (נפתח בחלון חדש)</span></a>
  </div>`;

export const page = {
  id: 'contact',
  breadcrumb: 'יצירת קשר',
  title: `יצירת קשר, שעות איסוף ומשלוחים | ${BUSINESS.name}`,
  description: `איך מזמינים מ${BUSINESS.name}: וואטסאפ, שעות איסוף ב${BUSINESS.city}, אזורי משלוח ודמי משלוח, הזמנות לאירועים ושאלות נפוצות.`,
  faq: true,
  render: () => `
<section class="relative overflow-hidden bg-surface-container-low py-space-xl" aria-labelledby="contact-title">
  <div class="wrap gutter-x relative flex flex-col md:flex-row items-center justify-between gap-space-lg">
    <div class="flex flex-col gap-space-sm max-w-xl">
      <p class="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high w-fit text-primary text-label-md shadow-sm">${ic('favorite', '!text-[1.125rem]')}דברו איתנו, הריח כבר באוויר</p>
      <h1 id="contact-title" class="text-display-mobile md:text-display text-primary">בואו נדבר מתוק</h1>
      <p class="text-body-lg text-on-surface-variant">מארז ליום הולדת, מגש לאירוע, שאלה על אלרגנים או סתם חשק? כתבו לנו ונחזור אליכם עם חיוך וגלייז.</p>
    </div>
    <div class="bg-surface-container-lowest p-space-md rounded-lg shadow-md flex items-center gap-space-md max-w-sm w-full">
      <span class="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true">${ic('event_available', '!text-[1.75rem]')}</span>
      <p class="flex flex-col"><span class="text-label-sm text-primary">ההזמנה הבאה שאפשר לקבל</span><span class="text-headline-sm text-on-surface" data-dyn="next-date">יום ההזמנה הקרוב</span><span class="text-body-sm text-on-surface-variant">${esc(ORDERING.weekendNote)}</span></p>
    </div>
  </div>
</section>

<section class="wrap gutter-x -mt-6 relative z-10" aria-label="דרכי התקשרות">
  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">${each(channels(), channelCard)}</ul>
</section>

<div class="wrap gutter-x py-space-xl">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
    <section class="lg:col-span-7 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-lg shadow-md flex flex-col gap-space-md" aria-labelledby="form-title">
      <div class="flex flex-col gap-space-xs">
        <p class="text-label-sm text-primary font-bold">הודעה מהירה</p>
        <h2 id="form-title" class="text-headline-lg-mobile md:text-headline-lg text-on-surface">ספרו לנו מה מתחשק לכם</h2>
      </div>
      ${contactForm()}
    </section>
    <div class="lg:col-span-5 flex flex-col gap-space-md">
      <section id="hours" class="bg-surface-container-low p-space-lg rounded-lg shadow-sm flex flex-col gap-space-sm" aria-labelledby="hours-title">
        <h2 id="hours-title" class="flex items-center gap-space-xs text-secondary text-headline-sm">${ic('schedule')}שעות איסוף ומסירה</h2>
        <p class="text-body-sm text-on-surface-variant">אנחנו אופים לפי הזמנה. ההזמנות פתוחות תמיד באתר, והאיסוף בשעות האלה:</p>
        ${hoursList()}
        <p class="p-space-xs rounded bg-primary/5 text-primary text-center text-label-sm">${esc(ORDERING.weekendNote)}</p>
      </section>
      <section class="bg-surface-container-high p-space-lg rounded-lg shadow-sm flex flex-col gap-space-sm" aria-labelledby="quality-title">
        <h2 id="quality-title" class="flex items-center gap-space-xs text-primary text-headline-sm">${ic('verified_user')}איכות, אלרגנים וכשרות</h2>
        <ul class="flex flex-col gap-space-xs text-on-surface-variant text-body-sm">
          <li class="flex items-start gap-space-xs">${ic('check_circle', 'text-primary !text-[1.125rem]')}מוצרים חלביים, נאפים טרי לכל הזמנה</li>
          <li class="flex items-start gap-space-xs">${ic('check_circle', 'text-primary !text-[1.125rem]')}מכיל גלוטן, חלב וביצים. עשוי להכיל אגוזים</li>
          <li class="flex items-start gap-space-xs">${ic('check_circle', 'text-primary !text-[1.125rem]')}${KOSHER ? esc(KOSHER) : 'פרטי כשרות יעודכנו בקרוב'}</li>
        </ul>
      </section>
    </div>
  </div>
</div>

<section class="bg-surface-container-low py-space-xl" aria-labelledby="area-title">
  <div class="wrap gutter-x flex flex-col gap-space-lg">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
      <div class="flex flex-col gap-space-xs">
        <p class="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high text-secondary w-fit text-label-sm">${ic('navigation', '!text-[1rem]')}איסוף ומשלוחים</p>
        <h2 id="area-title" class="text-headline-lg-mobile md:text-headline-lg text-on-surface">${esc(BUSINESS.city)} והסביבה</h2>
        <p class="text-body-md text-on-surface-variant">${esc(BUSINESS.pickupNote)}.</p>
      </div>
      <ul class="flex flex-wrap items-center gap-space-sm">
        <li><a class="min-h-[2.75rem] px-space-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-label-md rounded-full shadow-sm flex items-center gap-space-xs" href="https://waze.com/ul?q=${encodeURIComponent(BUSINESS.city)}" target="_blank" rel="noopener">${ic('directions_car', 'text-primary !text-[1.25rem]')}<span lang="en">Waze</span><span class="sr-only"> (נפתח בחלון חדש)</span></a></li>
        <li><a class="min-h-[2.75rem] px-space-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-label-md rounded-full shadow-sm flex items-center gap-space-xs" href="https://maps.google.com/?q=${encodeURIComponent(BUSINESS.city)}" target="_blank" rel="noopener">${ic('map', 'text-secondary !text-[1.25rem]')}<span lang="en">Google Maps</span><span class="sr-only"> (נפתח בחלון חדש)</span></a></li>
      </ul>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
      <div class="lg:col-span-8 rounded-lg overflow-hidden shadow-md min-h-[18rem] relative bg-surface-container">
        ${mapArt()}
        <p class="absolute bottom-4 right-4 left-4 sm:left-auto bg-surface-container-lowest p-space-md rounded shadow-md flex items-center gap-space-sm">
          <span class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0" aria-hidden="true">${ic('store', '!text-[1.25rem]')}</span>
          <span><span class="block text-headline-sm text-primary">המטבח של <span lang="en">CheatDay</span></span><span class="text-body-sm text-on-surface-variant">${esc(BUSINESS.city)} • הכתובת נשלחת עם אישור ההזמנה</span></span>
        </p>
      </div>
      <dl class="lg:col-span-4 flex flex-col gap-space-sm">
        ${each([
          ['local_shipping', 'אזורי משלוח', DELIVERY.areas.join(' • ')],
          ['payments', 'דמי משלוח', `${nis(DELIVERY.fee)} להזמנה, וחינם בהזמנה מעל ${nis(DELIVERY.freeAbove)}.`],
          ['credit_card', 'אמצעי תשלום', ORDERING.payments.join(' • ')],
          ['takeout_dining', 'איסוף בלי לחכות', 'מזמינים באתר, מקבלים שעה מדויקת ואוספים מוכן.'],
        ], ([i, t, d]) => `<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col gap-space-xs">
          <dt class="flex items-center gap-space-xs text-secondary text-label-lg">${ic(i, '!text-[1.25rem]')}${t}</dt><dd class="text-body-sm text-on-surface-variant">${esc(d)}</dd></div>`)}
      </dl>
    </div>
  </div>
</section>

<section class="wrap gutter-x py-space-xl" aria-labelledby="faq-title">
  <div class="text-center max-w-xl mx-auto mb-space-lg flex flex-col gap-space-xs">
    <p class="text-label-sm text-primary">שאלות נפוצות</p>
    <h2 id="faq-title" class="text-headline-lg-mobile md:text-headline-lg text-on-surface">רגע לפני שיוצרים קשר</h2>
  </div>
  <div class="max-w-3xl mx-auto flex flex-col gap-space-xs">
    ${each(FAQ, (f, i) => `<details class="group rounded bg-surface-container-lowest shadow-sm overflow-hidden" ${i === 0 ? 'open' : ''}>
      <summary class="cursor-pointer list-none p-space-md min-h-[3rem] flex items-center justify-between gap-space-sm text-label-lg text-on-surface [&::-webkit-details-marker]:hidden"><h3 class="text-label-lg">${esc(f.q)}</h3>${ic('expand_more', 'text-outline transition-transform group-open:rotate-180')}</summary>
      <p class="px-space-md pb-space-md text-body-md text-on-surface-variant leading-relaxed">${esc(fillCopy(f.a))}</p></details>`)}
  </div>
</section>`,
};
