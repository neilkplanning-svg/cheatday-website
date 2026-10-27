/** Accessibility statement (Israeli Equal Rights for Persons with Disabilities regulations, 2013 / IS 5568) */
import { BUSINESS, ACCESSIBILITY } from '../data/index.js';
import { esc, ic, brandName } from '../lib/html.js';

const pending = (v, label) => (v ? esc(v) : `<span class="chip bg-tertiary-fixed text-on-tertiary-fixed">${label} יעודכן בקרוב</span>`);

export const page = {
  id: 'accessibility',
  breadcrumb: 'הצהרת נגישות',
  title: `הצהרת נגישות | ${BUSINESS.name}`,
  description: `הצהרת הנגישות של אתר ${BUSINESS.name}: התאמות שבוצעו לפי ת״י 5568 ברמה AA, תפריט נגישות, ופרטי קשר לפניות בנושא נגישות.`,
  render: () => `
<article class="wrap gutter-x py-space-xl max-w-3xl" aria-labelledby="a11y-page-title">
  <p class="chip bg-surface-container-high text-secondary !px-space-md mb-space-sm w-fit">${ic('accessibility_new', '!text-[1.125rem]')}ת״י 5568 ברמה AA</p>
  <h1 id="a11y-page-title" class="text-headline-lg md:text-display text-on-surface mb-space-md">הצהרת נגישות</h1>
  <div class="prose-cd">
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
    <p>אם משהו באתר לא נגיש לכם, נשמח לשמוע ולתקן בהקדם. ציינו בפנייה את העמוד, את הבעיה ואת הדפדפן או הטכנולוגיה המסייעת.</p>
    <ul>
      <li>רכז/ת נגישות: ${pending(ACCESSIBILITY.coordinator, 'השם')}</li>
      <li>טלפון: ${pending(ACCESSIBILITY.phone || BUSINESS.phone, 'הטלפון')}</li>
      <li>דוא״ל: ${pending(ACCESSIBILITY.email || BUSINESS.email, 'הדוא״ל')}</li>
    </ul>
    <p class="text-label-sm">עדכון אחרון של ההצהרה: ${esc(ACCESSIBILITY.updated)}</p>
  </div>
</article>`,
};
