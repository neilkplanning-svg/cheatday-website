/** Accessibility statement (Israeli Equal Rights for Persons with Disabilities regulations, 2013 / IS 5568) */
import { BUSINESS, ACCESSIBILITY } from '../data/index.js';
import { esc, ic, brandName } from '../lib/html.js';
import { tr, loc } from '../lib/i18n.js';
import { telHref } from '../lib/links.js';

const pending = (v, he, en) => (v ? esc(v) : `<span class="chip bg-tertiary-fixed text-on-tertiary-fixed">${tr(`${he} יעודכן בקרוב`, `${en} coming soon`)}</span>`);

const contactList = () => {
  const phone = ACCESSIBILITY.phone || BUSINESS.phone;
  const email = ACCESSIBILITY.email || BUSINESS.email;
  return `<ul>
      <li>${tr('רכזת נגישות', 'Accessibility coordinator')}: ${pending(loc(ACCESSIBILITY.coordinator), 'השם', 'Name')}</li>
      <li>${tr('טלפון / וואטסאפ', 'Phone / WhatsApp')}: ${phone ? `<a href="${telHref()}" dir="ltr">${esc(phone)}</a>` : pending('', 'הטלפון', 'Phone')}</li>
      <li>${tr('דוא״ל', 'Email')}: ${email ? `<a href="mailto:${esc(email)}" dir="ltr">${esc(email)}</a>` : pending('', 'הדוא״ל', 'Email')}</li>
    </ul>`;
};

const hebrew = () => `
    <p>ב-${brandName(BUSINESS.name)} אנחנו רוצים שכל אחד ואחת יוכלו להזמין אצלנו בקלות, בכל מכשיר ועם כל טכנולוגיה מסייעת. האתר הותאם לפי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013, ולפי התקן הישראלי ת״י 5568, המבוסס על הנחיות WCAG 2.0, ברמה AA. בפיתוח יישמנו גם דרישות מ-WCAG 2.1 ו-2.2.</p>

    <h2>מה עשינו באתר</h2>
    <ul>
      <li>כפתור נגישות קבוע בצד המסך (וגם בקיצור המקלדת Alt+A) עם: הגדלת טקסט עד 200%, ניגודיות גבוהה, ניגודיות כהה, גווני אפור, הדגשת קישורים וכותרות, גופן קריא, ריווח טקסט, סמן גדול, סרגל קריאה, הדגשת מיקוד, עצירת אנימציות והסתרת איורים. ההגדרות נשמרות בדפדפן.</li>
      <li>ניווט מלא במקלדת, סדר מיקוד הגיוני, מסגרת מיקוד בולטת וקישור ״דילוג לתוכן הראשי״ בתחילת כל עמוד.</li>
      <li>מבנה עמוד סמנטי: אזורי כותרת, ניווט, תוכן ראשי ותחתית, והיררכיית כותרות עקבית.</li>
      <li>ניגודיות צבעים של 4.5:1 לפחות לטקסט, וטקסט חלופי לכל איור בעל משמעות.</li>
      <li>טפסים עם תוויות ברורות, סימון שדות חובה והודעות שגיאה שמוקראות לקוראי מסך.</li>
      <li>חלונות קופצים (סל, הזמנה, תפריט) נגישים: המיקוד עובר אליהם, נשאר בתוכם ונסגר במקש Esc.</li>
      <li>התאמה לטלפונים, לטאבלטים ולמחשבים, ותמיכה בהגדלת תצוגה עד 400% בלי גלילה לרוחב.</li>
      <li>כיבוד הגדרת ״הפחתת תנועה״ של מערכת ההפעלה.</li>
      <li>האתר זמין בעברית ובאנגלית, עם הגדרת שפה וכיוון טקסט נכונים בכל עמוד.</li>
    </ul>

    <h2>היכן נבדק האתר</h2>
    <p>האתר נבדק בכלי הבדיקה האוטומטי axe-core מול כללי WCAG 2.1 AA, בניווט מקלדת וברוחב מסך של 320 פיקסלים. הוא בנוי לגרסאות העדכניות של Chrome, Safari, Edge ו-Firefox ולעבודה עם קוראי מסך.</p>

    <h2>מגבלות ידועות</h2>
    <ul>
      <li>שליחת ההזמנה נעשית בוואטסאפ, שהוא שירות חיצוני שאינו בשליטתנו. אפשר תמיד להזמין גם בטלפון.</li>
      <li>האיורים באתר זמניים ויוחלפו בתמונות. לכל תמונה יתווסף תיאור טקסטואלי.</li>
    </ul>

    <h2>הסדרי נגישות בשירות</h2>
    <p>העסק פועל ממטבח ביתי ואינו מקבל קהל. האיסוף נעשה מחוץ לבית, ואפשר לתאם מסירה עד לרכב או משלוח עד הבית. צריכים התאמה? כתבו לנו ונעשה הכל כדי לעזור.</p>

    <h2>נתקלתם בבעיה?</h2>
    <p>אם משהו באתר לא נגיש לכם, נשמח לשמוע ולתקן בהקדם. ציינו בפנייה את העמוד, את הבעיה ואת הדפדפן או הטכנולוגיה המסייעת.</p>`;

const english = () => `
    <p>At ${brandName(BUSINESS.name)} we want everyone to be able to order easily, on any device and with any assistive technology. The site follows the Israeli Equal Rights for Persons with Disabilities (Service Accessibility Adjustments) Regulations, 2013, and Israeli Standard IS 5568, which is based on WCAG 2.0, at level AA. During development we also applied requirements from WCAG 2.1 and 2.2.</p>

    <h2>What we did</h2>
    <ul>
      <li>A fixed accessibility button at the side of the screen (also the keyboard shortcut Alt+A) with: text size up to 200%, high contrast, dark contrast, grayscale, highlighted links and headings, a readable font, text spacing, a big cursor, a reading guide, strong focus, stopping animations and hiding images. Your settings are saved in your browser.</li>
      <li>Full keyboard navigation, a logical focus order, a clearly visible focus outline and a “Skip to main content” link at the top of every page.</li>
      <li>Semantic page structure: header, navigation, main content and footer landmarks, and a consistent heading hierarchy.</li>
      <li>Colour contrast of at least 4.5:1 for text, and a text alternative for every meaningful illustration.</li>
      <li>Forms with clear labels, marked required fields and error messages that screen readers announce.</li>
      <li>Accessible pop-up windows (cart, checkout, menu): focus moves into them, stays inside, and Esc closes them.</li>
      <li>Layouts for phones, tablets and computers, with zoom up to 400% and no horizontal scrolling.</li>
      <li>We respect the operating system’s “reduce motion” setting.</li>
      <li>The site is available in Hebrew and English, with the correct language and text direction set on every page.</li>
    </ul>

    <h2>How the site was tested</h2>
    <p>The site was tested with the automated axe-core checker against WCAG 2.1 AA rules, with keyboard navigation and at a screen width of 320 pixels. It is built for current versions of Chrome, Safari, Edge and Firefox and to work with screen readers.</p>

    <h2>Known limitations</h2>
    <ul>
      <li>Orders are sent through WhatsApp, an external service outside our control. You can always order by phone instead.</li>
      <li>The illustrations on the site are temporary and will be replaced with photos. Every photo will get a text description.</li>
    </ul>

    <h2>Accessibility of the service</h2>
    <p>The business runs from a home kitchen and has no public premises. Pickup is outside the house, and we can arrange hand-over to your car or delivery to your door. Need an adjustment? Message us and we will do everything we can to help.</p>

    <h2>Found a problem?</h2>
    <p>If anything on the site is not accessible to you, we want to hear about it and fix it quickly. Please tell us the page, the problem and the browser or assistive technology you use.</p>`;

export const page = {
  id: 'accessibility',
  breadcrumb: () => tr('הצהרת נגישות', 'Accessibility statement'),
  title: () => tr(`הצהרת נגישות | ${BUSINESS.name}`, `Accessibility statement | ${BUSINESS.name}`),
  description: () => tr(
    `הצהרת הנגישות של אתר ${BUSINESS.name}: התאמות שבוצעו לפי ת״י 5568 ברמה AA, תפריט נגישות, ופרטי קשר לפניות בנושא נגישות.`,
    `The ${BUSINESS.name} accessibility statement: adjustments made under Israeli Standard IS 5568 level AA, the accessibility menu, and who to contact about accessibility.`),
  render: () => `
<article class="wrap gutter-x py-space-xl max-w-3xl" aria-labelledby="a11y-page-title">
  <p class="chip bg-surface-container-high text-secondary !px-space-md mb-space-sm w-fit">${ic('accessibility_new', '!text-[1.125rem]')}${tr('ת״י 5568 ברמה AA', 'IS 5568, level AA')}</p>
  <h1 id="a11y-page-title" class="text-headline-lg md:text-display text-on-surface mb-space-md">${tr('הצהרת נגישות', 'Accessibility statement')}</h1>
  <div class="prose-cd">
    ${tr(hebrew(), english())}
    ${contactList()}
    <p class="text-label-sm">${tr('עדכון אחרון של ההצהרה', 'Statement last updated')}: ${esc(ACCESSIBILITY.updated)}</p>
  </div>
</article>`,
};
