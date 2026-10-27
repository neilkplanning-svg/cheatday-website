/**
 * Page copy that is not menu or contact data: the "our secret" page, reviews and FAQ.
 * FAQ answers may use {city}, {areas}, {fee}, {freeAbove}, {cancelHours} placeholders.
 */

/** TODO: confirm which ingredients are really used, and their brands */
export const INGREDIENTS = [
  { id: 'butter', art: 'butter', badge: 'חמאה אמיתית', origin: 'בלי מרגרינה', title: 'חמאה אמיתית 82%', icon: 'water_drop',
    text: 'הבסיס לכל שכבה בבצק. חמאה עשירה שנותנת רכות שנמסה על הלשון, ריח קרמי ואפס מרגרינה.' },
  { id: 'cinnamon', art: 'cinnamon', badge: 'ציילון', origin: 'הקינמון האמיתי', title: 'קינמון ציילון', icon: 'spa',
    text: 'מתקתק, עדין ועמוק, בלי המרירות של קינמון קסיה תעשייתי. הוא זה שממלא את הבית בריח.' },
  { id: 'flour', art: 'flour', badge: 'ניפוי כפול', origin: 'בצק עננים', title: 'קמח מנופה ותפיחה איטית', icon: 'grain',
    text: 'קמח לחם איכותי שמנופה פעמיים ובצק שמקבל זמן לתפוח. התוצאה: רול אוורירי שמחזיק את המילוי.' },
  { id: 'vanilla', art: 'vanilla', badge: 'וניל אמיתי', origin: 'בגלייז', title: 'וניל אמיתי בגלייז', icon: 'local_florist', wide: true,
    text: 'גרגירי וניל אמיתיים מוטמעים בגלייז גבינת השמנת, בלי תמציות מלאכותיות. רואים את הנקודות השחורות בכל ציפוי.',
    check: 'רואים את נקודות הווניל בכל ציפוי' },
  { id: 'chocolate', art: 'chocolate', badge: 'שוקולד בלגי', origin: 'למהדורות המושחתות', title: 'שוקולד בלגי', icon: 'cookie',
    text: 'שוקולד עשיר ומאוזן שנמס לתוך המילויים והטופינגים, ויוצר ניגוד מושלם לקינמון המתוק.' },
];

/** Baking steps – also the chapters of the baking video */
export const PROCESS = [
  { title: 'לישה ותפיחה', sub: 'בצק עננים', text: 'לשים בצק שמרים עם חמאה אמיתית ונותנים לו זמן לתפוח לאט, עד שהוא רך ואוורירי.' },
  { title: 'ספירלת קינמון', sub: 'מילוי נדיב', text: 'מורחים שכבת חמאה, מפזרים סוכר חום וקינמון, מגלגלים וחותכים לרולים.' },
  { title: 'אפייה וגלייז', sub: 'הרגע הכי טעים', text: 'אופים עד הזהב, ומיד מזלפים גלייז גבינה חם שנמס לתוך כל הספירלות.' },
];

/** Baking video: { src: 'assets/video/baking.mp4', poster: '…' } or { url: 'https://instagram.com/reel/…' } */
export const VIDEO = null;

/** Sample reviews – shown with a "sample" tag while SITE.draft is true. Replace with real ones (with permission). */
export const REVIEWS = [
  { name: 'שירה', initial: 'ש', place: 'חריש', text: 'הזמנתי מארז ליום ההולדת במשרד ופשוט עצרנו את העבודה. הנוטלה־לוז זה הדבר הכי טעים שאכלתי השנה.' },
  { name: 'יונתן', initial: 'י', place: 'קציר', text: 'הקרמל המלוח עם הפקאן מטורף. בצק קליל שלא מכביד, והאיזון בין מלוח למתוק מדויק.' },
  { name: 'מיכל', initial: 'מ', place: 'פרדס חנה', text: 'גלייז הגבינה של הקלאסי ממכר, ושמו ממנו בנדיבות. הגיע ארוז יפה עם הוראות חימום. ממליצה בחום.' },
];

export const FAQ = [
  { q: 'איך מזמינים?', a: 'בוחרים בתפריט, מוסיפים לסל, ממלאים פרטים ושולחים את ההזמנה בוואטסאפ בלחיצה אחת. נחזור אליכם לאישור ותיאום תשלום.' },
  { q: 'כמה זמן מראש צריך להזמין?', a: 'אנחנו אופים לפי הזמנה, לכן מזמינים לפחות יום מראש. הזמנות לשישי נסגרות ביום חמישי ב-12:00, ולאירועים לפחות 72 שעות מראש.' },
  { q: 'יש משלוחים?', a: 'כן. איסוף עצמי מ{city}, או משלוח ל{areas}. דמי המשלוח ₪{fee}, וחינם בהזמנה מעל ₪{freeAbove}.' },
  { q: 'איך מחממים כדי שיהיה כמו מהתנור?', a: '10–15 שניות במיקרוגל, או 5 דקות בתנור שחומם ל-160 מעלות. הגלייז נמס בדיוק כמו שצריך.' },
  { q: 'מה עם אלרגנים?', a: 'המוצרים מכילים גלוטן, חלב וביצים, ועשויים להכיל אגוזים ושומשום. הרול הטבעוני ללא חלב וביצים, אך נאפה באותו מטבח.' },
  { q: 'אפשר לבטל או לשנות הזמנה?', a: 'כן, ללא עלות עד {cancelHours} שעות לפני מועד האיסוף. אחרי זה הבצק כבר בהכנה.' },
  { q: 'אפשר להזמין לאירוע?', a: 'בטח. מגשי מיני סינבונים, מארזים ממותגים ועמדת סינבון חם. שלחו לנו פרטים בטופס או בוואטסאפ ונבנה הצעה.' },
];

/** Kashrut line. Leave null unless there is a real certificate (see the questionnaire note). */
export const KOSHER = null;
