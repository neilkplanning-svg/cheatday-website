/**
 * Page copy that is not menu or contact data: the "our secret" page, reviews and FAQ.
 * Bilingual values: { he, en }. FAQ answers may use {city}, {areas}, {fee}, {freeAbove},
 * {cancelHours} placeholders.
 */

/** TODO: confirm which ingredients are really used, and their brands */
export const INGREDIENTS = [
  { id: 'butter', art: 'butter', icon: 'water_drop',
    badge: { he: 'חמאה אמיתית', en: 'Real butter' }, origin: { he: 'בלי מרגרינה', en: 'No margarine' },
    title: { he: 'חמאה אמיתית 82%', en: 'Real 82% butter' },
    text: { he: 'הבסיס לכל שכבה בבצק. חמאה עשירה שנותנת רכות שנמסה על הלשון, ריח קרמי ואפס מרגרינה.',
      en: 'The base of every layer of dough. Rich butter for a melt-in-your-mouth softness, a creamy aroma and zero margarine.' } },
  { id: 'cinnamon', art: 'cinnamon', icon: 'spa',
    badge: { he: 'ציילון', en: 'Ceylon' }, origin: { he: 'הקינמון האמיתי', en: 'True cinnamon' },
    title: { he: 'קינמון ציילון', en: 'Ceylon cinnamon' },
    text: { he: 'מתקתק, עדין ועמוק, בלי המרירות של קינמון קסיה תעשייתי. הוא זה שממלא את הבית בריח.',
      en: 'Sweet, delicate and deep, without the bitterness of industrial cassia. It is what fills the house with that smell.' } },
  { id: 'flour', art: 'flour', icon: 'grain',
    badge: { he: 'ניפוי כפול', en: 'Sifted twice' }, origin: { he: 'בצק עננים', en: 'Cloud dough' },
    title: { he: 'קמח מנופה ותפיחה איטית', en: 'Sifted flour, slow rise' },
    text: { he: 'קמח לחם איכותי שמנופה פעמיים ובצק שמקבל זמן לתפוח. התוצאה: רול אוורירי שמחזיק את המילוי.',
      en: 'Quality bread flour sifted twice and a dough that gets time to rise. The result: an airy roll that holds its filling.' } },
  { id: 'vanilla', art: 'vanilla', icon: 'local_florist', wide: true,
    badge: { he: 'וניל אמיתי', en: 'Real vanilla' }, origin: { he: 'בגלייז', en: 'In the glaze' },
    title: { he: 'וניל אמיתי בגלייז', en: 'Real vanilla in the glaze' },
    text: { he: 'גרגירי וניל אמיתיים מוטמעים בגלייז גבינת השמנת, בלי תמציות מלאכותיות. רואים את הנקודות השחורות בכל ציפוי.',
      en: 'Real vanilla seeds folded into the cream-cheese glaze, no artificial extracts. You can see the black specks in every topping.' },
    check: { he: 'רואים את נקודות הווניל בכל ציפוי', en: 'Vanilla specks in every glaze' } },
  { id: 'chocolate', art: 'chocolate', icon: 'cookie',
    badge: { he: 'שוקולד בלגי', en: 'Belgian chocolate' }, origin: { he: 'למהדורות המושחתות', en: 'For the indulgent editions' },
    title: { he: 'שוקולד בלגי', en: 'Belgian chocolate' },
    text: { he: 'שוקולד עשיר ומאוזן שנמס לתוך המילויים והטופינגים, ויוצר ניגוד מושלם לקינמון המתוק.',
      en: 'Rich, balanced chocolate that melts into the fillings and toppings, a perfect contrast to the sweet cinnamon.' } },
];

/** Baking steps – also the chapters of the baking video */
export const PROCESS = [
  { title: { he: 'לישה ותפיחה', en: 'Knead & rise' }, sub: { he: 'בצק עננים', en: 'Cloud dough' },
    text: { he: 'לשים בצק שמרים עם חמאה אמיתית ונותנים לו זמן לתפוח לאט, עד שהוא רך ואוורירי.',
      en: 'We knead a yeast dough with real butter and let it rise slowly until it is soft and airy.' } },
  { title: { he: 'ספירלת קינמון', en: 'Cinnamon swirl' }, sub: { he: 'מילוי נדיב', en: 'A generous filling' },
    text: { he: 'מורחים שכבת חמאה, מפזרים סוכר חום וקינמון, מגלגלים וחותכים לרולים.',
      en: 'We spread butter, sprinkle brown sugar and cinnamon, roll it up and cut it into rolls.' } },
  { title: { he: 'אפייה וגלייז', en: 'Bake & glaze' }, sub: { he: 'הרגע הכי טעים', en: 'The tastiest moment' },
    text: { he: 'אופים עד הזהב, ומיד מזלפים גלייז גבינה חם שנמס לתוך כל הספירלות.',
      en: 'We bake until golden, then pour warm cream-cheese glaze that melts into every swirl.' } },
];

/** Baking video: { src: 'assets/video/baking.mp4', poster: '…' } or { url: 'https://instagram.com/reel/…' } */
export const VIDEO = null;

/** Sample reviews – shown with a "sample" tag while SITE.draft is true. Replace with real ones (with permission). */
export const REVIEWS = [
  { initial: { he: 'ש', en: 'S' }, name: { he: 'שירה', en: 'Shira' }, place: { he: 'חריש', en: 'Harish' },
    text: { he: 'הזמנתי מארז ליום ההולדת במשרד ופשוט עצרנו את העבודה. הנוטלה־לוז זה הדבר הכי טעים שאכלתי השנה.',
      en: 'I ordered a box for a birthday at the office and we simply stopped working. The Nutella-hazelnut is the best thing I ate this year.' } },
  { initial: { he: 'י', en: 'Y' }, name: { he: 'יונתן', en: 'Yonatan' }, place: { he: 'קציר', en: 'Katzir' },
    text: { he: 'הקרמל המלוח עם הפקאן מטורף. בצק קליל שלא מכביד, והאיזון בין מלוח למתוק מדויק.',
      en: 'The salted caramel pecan is crazy good. Light dough that does not weigh you down, and the sweet-salty balance is spot on.' } },
  { initial: { he: 'מ', en: 'M' }, name: { he: 'מיכל', en: 'Michal' }, place: { he: 'פרדס חנה', en: 'Pardes Hanna' },
    text: { he: 'גלייז הגבינה של הקלאסי ממכר, ושמו ממנו בנדיבות. הגיע ארוז יפה עם הוראות חימום. ממליצה בחום.',
      en: 'The cream-cheese glaze on the classic is addictive, and they were generous with it. Beautifully packed with reheating instructions. Highly recommended.' } },
];

export const FAQ = [
  { q: { he: 'איך מזמינים?', en: 'How do I order?' },
    a: { he: 'בוחרים בתפריט, מוסיפים לסל, ממלאים פרטים ושולחים את ההזמנה בוואטסאפ בלחיצה אחת. נחזור אליכם לאישור ותיאום תשלום.',
      en: 'Pick from the menu, add to your cart, fill in your details and send the order on WhatsApp in one tap. We will get back to you to confirm and arrange payment.' } },
  { q: { he: 'כמה זמן מראש צריך להזמין?', en: 'How far ahead should I order?' },
    a: { he: 'אנחנו אופים לפי הזמנה, ולכן מזמינים לפחות יומיים מראש ולא באותו יום. צריכים מוקדם יותר? כתבו לנו בוואטסאפ ונבדוק אם אפשר להקדים. לאירועים מזמינים לפחות 72 שעות מראש.',
      en: 'We bake to order, so orders are placed at least two days ahead, never same-day. Need it sooner? Message us on WhatsApp and we will check if we can fit you in. Events need at least 72 hours.' } },
  { q: { he: 'יש משלוחים?', en: 'Do you deliver?' },
    a: { he: 'כן. איסוף עצמי מ{city}, או משלוח ל{areas}. דמי המשלוח ₪{fee}, וחינם בהזמנה מעל ₪{freeAbove}.',
      en: 'Yes. Pick up in {city}, or get delivery to {areas}. Delivery is ₪{fee}, and free on orders over ₪{freeAbove}.' } },
  { q: { he: 'איך מחממים כדי שיהיה כמו מהתנור?', en: 'How do I reheat it?' },
    a: { he: '10–15 שניות במיקרוגל, או 5 דקות בתנור שחומם ל-160 מעלות. הגלייז נמס בדיוק כמו שצריך.',
      en: '10–15 seconds in the microwave, or 5 minutes in an oven preheated to 160°C. The glaze melts just right.' } },
  { q: { he: 'מה עם אלרגנים?', en: 'What about allergens?' },
    a: { he: 'המוצרים מכילים גלוטן, חלב וביצים, ועשויים להכיל אגוזים ושומשום. הרול הטבעוני ללא חלב וביצים, אך נאפה באותו מטבח.',
      en: 'Our products contain gluten, milk and eggs, and may contain nuts and sesame. The vegan roll has no dairy or eggs but is baked in the same kitchen.' } },
  { q: { he: 'אפשר לבטל או לשנות הזמנה?', en: 'Can I cancel or change an order?' },
    a: { he: 'כן, ללא עלות עד {cancelHours} שעות לפני מועד האיסוף. אחרי זה הבצק כבר בהכנה.',
      en: 'Yes, free of charge up to {cancelHours} hours before pickup. After that the dough is already being prepared.' } },
  { q: { he: 'אפשר להזמין לאירוע?', en: 'Can I order for an event?' },
    a: { he: 'בטח. מגשי מיני סינבונים, מארזים ממותגים ועמדת סינבון חם. שלחו לנו פרטים בטופס או בוואטסאפ ונבנה הצעה.',
      en: 'Of course. Mini roll trays, branded boxes and a warm cinnamon roll station. Send us the details in the form or on WhatsApp and we will put together an offer.' } },
];
