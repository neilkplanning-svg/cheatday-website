/** Terms of use, ordering policy and privacy */
import { SITE, BUSINESS, ORDERING } from '../data/index.js';
import { esc, ic } from '../lib/html.js';
import { daysText } from '../lib/format.js';
import { href } from '../lib/paths.js';

export const page = {
  id: 'terms',
  breadcrumb: 'תנאי שימוש ופרטיות',
  title: `תנאי שימוש, הזמנות ופרטיות | ${BUSINESS.name}`,
  description: `תנאי ההזמנה, התשלום והביטול של ${BUSINESS.name}, מידע על אלרגנים ומדיניות הפרטיות של האתר.`,
  render: () => `
<article class="wrap gutter-x py-space-xl max-w-3xl" aria-labelledby="terms-title">
  ${SITE.draft ? `<p class="chip bg-tertiary-fixed text-on-tertiary-fixed !px-space-md mb-space-sm w-fit">${ic('edit_note', '!text-[1rem]')}טיוטה – יעודכן לפי פרטי העסק</p>` : ''}
  <h1 id="terms-title" class="text-headline-lg md:text-display text-on-surface mb-space-md">תנאי שימוש, הזמנות ופרטיות</h1>
  <div class="prose-cd">
    <h2>הזמנות</h2>
    <p>ההזמנה באתר נשלחת אלינו בוואטסאפ ונחשבת סופית רק לאחר אישור שלנו. אנחנו אופים לפי הזמנה, ולכן מזמינים לפחות ${daysText(ORDERING.leadDays)} מראש. ${esc(ORDERING.weekendNote)}.</p>
    <h2>תשלום</h2>
    <p>התשלום מתבצע ב${esc(ORDERING.payments.join(', '))}, לפי התיאום בעת אישור ההזמנה. הבצק נכנס להכנה רק אחרי התשלום.</p>
    <h2>ביטולים ושינויים</h2>
    <p>אפשר לבטל או לשנות הזמנה ללא עלות עד ${ORDERING.cancelHours} שעות לפני מועד האיסוף. לאחר מכן המוצרים כבר בהכנה ולא נוכל להחזיר את התשלום.</p>
    <h2>אלרגנים</h2>
    <p>המוצרים מכילים גלוטן, חלב וביצים, ועשויים להכיל אגוזים, בוטנים ושומשום. כל המוצרים נאפים באותו מטבח. יש לכם אלרגיה? כתבו לנו לפני ההזמנה.</p>
    <h2>פרטיות</h2>
    <p>הפרטים שאתם ממלאים (שם, טלפון וכתובת) משמשים רק לטיפול בהזמנה ונשלחים אלינו בהודעת הוואטסאפ שאתם שולחים. הסל ופרטי ההזמנה האחרונה נשמרים בדפדפן שלכם בלבד, לנוחותכם, ואינם נשלחים לשום שרת. אפשר למחוק אותם בניקוי נתוני הדפדפן.</p>
    <p>הצטרפות למועדון נעשית רק בהסכמה מפורשת. נשלח עדכונים ומבצעים רק למי שאישר, ובכל הודעה אפשר לבקש הסרה. לבקשת עיון או מחיקה של פרטים, פנו אלינו בוואטסאפ${BUSINESS.email ? ` או בכתובת <span dir="ltr">${esc(BUSINESS.email)}</span>` : ''}.</p>
    <h2>נגישות</h2>
    <p>פרטים מלאים ב<a href="${href('accessibility')}">הצהרת הנגישות</a>.</p>
  </div>
</article>`,
};
