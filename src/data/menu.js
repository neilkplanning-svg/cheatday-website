/**
 * Menu: categories, products and side add-ons.
 * `art` draws a temporary illustration. When a real photo exists, add
 * `image: 'assets/img/<file>.webp'` (and `imageAlt`) to the product.
 */
export const CATEGORIES = [
  { id: 'all', label: 'הכל', icon: 'auto_awesome' },
  { id: 'classic', label: 'סינבונים קלאסיים', icon: 'bakery_dining' },
  { id: 'decadent', label: 'מהדורות מושחתות', icon: 'favorite' },
  { id: 'boxes', label: 'מארזים ומגשי אירוח', icon: 'inventory_2' },
  { id: 'more', label: 'קינוחים נוספים', icon: 'cookie' },
];

export const PRODUCTS = [
  {
    id: 'classic', category: 'classic', featured: true, price: 28,
    name: 'אוריג׳ינל סינבון פילדלפיה',
    desc: 'בצק שמרים רך וענני, מילוי חמאה, סוכר חום וקינמון, וגלייז גבינת שמנת נדיב שנמס בביס הראשון.',
    tags: ['גלייז גבינה עשיר', 'סוכר חום'],
    badge: { text: 'הקלאסיקה', icon: 'star', tone: 'primary' },
    art: { kind: 'roll', glaze: 'cream' },
  },
  {
    id: 'nutella', category: 'decadent', featured: true, price: 32,
    name: 'נוטלה ואגוזי לוז',
    desc: 'מעטפת נוטלה חמה, קרם פרלינה ושברי אגוזי לוז קלויים ומקורמלים. לחובבי שוקולד בלבד.',
    tags: ['נוטלה חמה', 'קראנץ׳ לוז'],
    badge: { text: 'מושחת ברמות', icon: 'local_fire_department', tone: 'hot' },
    art: { kind: 'roll', glaze: 'nutella', topping: 'hazelnut' },
  },
  {
    id: 'caramel', category: 'decadent', featured: true, price: 32,
    name: 'קרמל מלוח ופקאן',
    desc: 'רוטב קרמל חמאה מלוח שמבושל במטבח שלנו, פקאנים קלויים ופתיתי מלח. מתוק־מלוח מושלם.',
    tags: ['קרמל ביתי', 'פקאן קלוי'],
    badge: { text: 'מתוק־מלוח', icon: 'bolt', tone: 'soft' },
    art: { kind: 'roll', glaze: 'caramel', topping: 'pecan', drizzle: 'cream' },
  },
  {
    id: 'lotus', category: 'decadent', featured: true, price: 33,
    name: 'פצצת לוטוס ביסקוף',
    desc: 'קרם לוטוס מחומם על סינבון טרי, זילופי גבינה קטיפתיים וקראמבל עוגיות לוטוס פריך.',
    tags: ['ממרח לוטוס', 'קראמבל פריך'],
    badge: { text: 'חדש בתפריט', icon: 'new_releases', tone: 'brown' },
    art: { kind: 'roll', glaze: 'lotus', topping: 'crumbs', drizzle: 'cream' },
  },
  {
    id: 'strawberry', category: 'decadent', price: 33,
    name: 'תותים ושמנת חמוצה',
    desc: 'קולי תותים ביתי, קרם שמנת חמוצה מאוזן ופרוסות תות טריות מעל הרול החם.',
    tags: ['עונתי', 'קולי תות'],
    badge: { text: 'מהדורה מוגבלת', icon: 'eco', tone: 'primary' },
    art: { kind: 'roll', glaze: 'pink', topping: 'strawberry' },
  },
  {
    id: 'vegan', category: 'classic', price: 30,
    name: 'סינבון טבעוני',
    desc: 'בצק על בסיס שמן קוקוס, מילוי קינמון וסוכר חום וציפוי מייפל־וניל. בלי חלב ובלי ביצים.',
    tags: ['טבעוני', 'ציפוי מייפל'],
    badge: { text: 'טבעוני', icon: 'spa', tone: 'soft' },
    art: { kind: 'roll', glaze: 'maple', topping: 'dust' },
  },
  {
    id: 'box6', category: 'boxes', price: 159, wide: true,
    name: 'מארז מיקס שישייה',
    desc: '2 אוריג׳ינל פילדלפיה, 2 נוטלה־לוז, 1 קרמל פקאן ו-1 לוטוס, בקופסת מתנה עם כרטיס ברכה אישי.',
    tags: ['מומלץ ל-6–8 אנשים', 'כולל כרטיס ברכה'],
    badge: { text: 'חוסכים ₪25', icon: 'savings', tone: 'brown' },
    art: { kind: 'box6' },
  },
  {
    id: 'tray', category: 'boxes', price: 180, wide: true,
    name: 'מגש מיני סינבונים לאירוח (20 יח׳)',
    desc: 'מיני רולים בארבעה טעמים, מסודרים על מגש הגשה. מושלם לימי הולדת, בריתות וישיבות צוות.',
    tags: ['20 מיני רולים', 'להזמין 72 שעות מראש'],
    badge: { text: 'לאירועים', icon: 'celebration', tone: 'primary' },
    art: { kind: 'tray' },
  },
  {
    id: 'pullapart', category: 'more', price: 120,
    name: 'עוגת סינבון נמשכת',
    desc: 'תבנית עגולה של 7 רולים מחוברים שנמשכים בחום, עם קערית גלייז גבינה בצד. מרכז השולחן.',
    tags: ['8–10 מנות', 'גלייז בצד'],
    badge: { text: 'לשולחן שישי', icon: 'cake', tone: 'soft' },
    art: { kind: 'cluster' },
  },
  {
    id: 'cookies', category: 'more', price: 36,
    name: 'קוקיז סינבון (6 יח׳)',
    desc: 'עוגיות חמאה רכות עם ספירלת קינמון וזילוף גלייז וניל. טעם של סינבון בביס אחד.',
    tags: ['6 עוגיות', 'מחזיק 5 ימים'],
    badge: { text: 'מתנה קטנה', icon: 'redeem', tone: 'brown' },
    art: { kind: 'cookies' },
  },
];

export const ADDONS = [
  { id: 'addon-glaze', name: 'גלייז גבינה כפול', price: 5 },
  { id: 'addon-nutella', name: 'נוטלה בצד', price: 6 },
  { id: 'addon-caramel', name: 'קרמל מלוח בצד', price: 6 },
  { id: 'addon-gift', name: 'אריזת מתנה', price: 8 },
];

/** Any product or add-on by id */
export const findItem = (id) => PRODUCTS.find((p) => p.id === id) || ADDONS.find((a) => a.id === id);
