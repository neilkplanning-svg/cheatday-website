/** Sections reused by more than one page */
import { BUSINESS, HOURS, DELIVERY, CLUB } from '../data/index.js';
import { esc, ic, icf, each } from '../lib/html.js';
import { href } from '../lib/paths.js';
import { waLink } from '../lib/links.js';

/** Live pickup status pill – text is refreshed in the browser (data-dyn) */
export const pickupStatusPill = () => `
  <span class="chip bg-primary-fixed text-on-primary-fixed" data-dyn="pickup-status"><span class="w-2 h-2 rounded-full bg-outline" aria-hidden="true"></span><span>ההזמנות פתוחות באתר 24/7</span></span>`;

export const pickupCard = () => `
  <section class="bg-surface-container-lowest p-space-md md:p-space-lg rounded-lg shadow-pop-md flex flex-col gap-space-sm" aria-labelledby="pickup-title">
    <div class="flex items-center justify-between gap-space-sm flex-wrap">
      <h2 id="pickup-title" class="flex items-center gap-space-xs text-secondary text-headline-sm">${ic('storefront', 'text-primary')}איסוף מהמטבח שלנו ב${esc(BUSINESS.city)}</h2>
      ${pickupStatusPill()}
    </div>
    <p class="text-body-sm text-on-surface-variant">${esc(BUSINESS.pickupNote)}. משלוחים ל${esc(DELIVERY.areas.join(', '))}.</p>
    <div class="flex flex-col sm:flex-row gap-space-sm mt-space-xs">
      <a class="flex-1 min-h-[2.75rem] bg-surface-container text-secondary rounded-full text-label-md flex items-center justify-center gap-1 hover:bg-surface-container-high" href="${waLink('היי CheatDay, יש לי שאלה על הזמנה 🙂')}" target="_blank" rel="noopener">${ic('chat', '!text-[1.125rem]')}שאלה בוואטסאפ<span class="sr-only"> (נפתח בחלון חדש)</span></a>
      <a class="flex-1 min-h-[2.75rem] bg-surface-container text-secondary rounded-full text-label-md flex items-center justify-center gap-1 hover:bg-surface-container-high" href="${href('contact', 'hours')}">${ic('schedule', '!text-[1.125rem]')}שעות ואזורי משלוח</a>
    </div>
  </section>`;

export const hoursList = () => `
  <dl class="flex flex-col gap-space-xs">
    ${each(HOURS, (h, i) => `<div class="flex items-center justify-between gap-space-sm p-space-sm rounded bg-surface-container-lowest">
      <dt class="flex items-center gap-space-xs text-label-md text-on-surface"><span class="w-2 h-2 rounded-full ${['bg-primary', 'bg-secondary-container', 'bg-tertiary'][i % 3]}" aria-hidden="true"></span>${esc(h.label)}</dt>
      <dd class="text-label-md text-secondary tabular-nums">${h.closed ? 'סגור' : `${h.from} – ${h.to}`}</dd></div>`)}
  </dl>`;

/** VIP club sign-up. Explicit marketing consent is required by Israeli anti-spam law (section 30A). */
export const clubSection = () => `
  <section class="py-space-xl" aria-labelledby="club-title">
    <div class="max-w-[1000px] mx-auto gutter-x">
      <div class="bg-gradient-to-br from-surface-container-high via-surface-container to-surface-variant p-space-lg md:p-space-xl rounded-[1.75rem] shadow-pop-lg text-center relative overflow-hidden">
        <span class="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary rounded-full text-label-md shadow-pop-sm mb-space-sm">${ic('loyalty', '!text-[1.125rem]')}מועדון החטאים המתוקים</span>
        <h2 id="club-title" class="text-headline-md md:text-headline-lg text-on-surface mb-space-xs">${CLUB.percent}% הנחה על ההזמנה הראשונה</h2>
        <p class="text-body-md text-on-surface-variant max-w-lg mx-auto mb-space-lg">השאירו מספר נייד, קבלו קוד הנחה מיידי והיו הראשונים לשמוע על טעמים חדשים.</p>
        <form class="max-w-md mx-auto flex flex-col gap-space-sm text-right" data-form="club" novalidate>
          <div class="flex flex-col sm:flex-row items-stretch gap-space-xs">
            <label for="club-phone" class="sr-only">מספר טלפון נייד (חובה)</label>
            <input id="club-phone" name="phone" type="tel" inputmode="tel" required aria-required="true" autocomplete="tel" dir="ltr" placeholder="050-1234567" aria-describedby="club-phone-err" class="field !rounded-full !bg-surface-container-lowest shadow-pop-sm text-right">
            <button type="submit" class="btn-pop px-space-xl min-h-[3rem] bg-primary text-on-primary text-label-lg rounded-full whitespace-nowrap">לקבלת ההטבה</button>
          </div>
          <label class="flex items-start gap-space-sm text-body-sm text-on-surface cursor-pointer">
            <input type="checkbox" name="consent" id="club-consent" class="mt-1 w-5 h-5 accent-[rgb(var(--c-primary))] shrink-0" aria-describedby="club-phone-err">
            <span>אני מאשר/ת לקבל מ-CheatDay עדכונים ומבצעים בוואטסאפ או ב-SMS. אפשר להסיר בכל עת.</span>
          </label>
          <p id="club-phone-err" class="text-label-sm text-error min-h-[1rem]" data-form-error></p>
        </form>
        <div class="hidden mt-space-md p-space-sm bg-surface-container-lowest text-primary rounded-2xl text-label-md shadow-pop-sm max-w-md mx-auto" data-club-ok role="status" tabindex="-1">
          ${icf('celebration', '!text-[1.25rem] align-middle')} הקוד שלכם: <strong class="underline" dir="ltr">${CLUB.code}</strong> הופעל אוטומטית בסל
        </div>
      </div>
    </div>
  </section>`;
