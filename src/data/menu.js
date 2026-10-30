/**
 * Menu: categories, products and side add-ons. Text values are bilingual: { he, en }.
 * `art` draws a temporary illustration. When a real photo exists, add
 * `image: 'assets/img/<file>.webp'` and `imageAlt: { he, en }` to the product.
 * Prices other than the classic roll and the classic pair are still samples (TODO).
 */
export const CATEGORIES = [
  { id: 'all', icon: 'auto_awesome', label: { he: 'הכל', en: 'All' } },
  { id: 'classic', icon: 'bakery_dining', label: { he: 'סינבונים קלאסיים', en: 'Classic rolls' } },
  { id: 'decadent', icon: 'favorite', label: { he: 'מהדורות מושחתות', en: 'Indulgent editions' } },
  { id: 'boxes', icon: 'inventory_2', label: { he: 'מארזים ומגשי אירוח', en: 'Boxes & party trays' } },
  { id: 'more', icon: 'cookie', label: { he: 'קינוחים נוספים', en: 'More treats' } },
];

export const PRODUCTS = [
  {
    id: 'classic', category: 'classic', featured: true, price: 27,
    name: { he: 'אוריג׳ינל סינבון פילדלפיה', en: 'Original Philadelphia cinnamon roll' },
    desc: {
      he: 'בצק שמרים רך וענני, מילוי חמאה, סוכר חום וקינמון, וגלייז גבינת שמנת נדיב שנמס בביס הראשון.',
      en: 'Soft, cloud-like yeast dough with butter, brown sugar and cinnamon, under a generous cream-cheese glaze that melts on the first bite.',
    },
    tags: [{ he: 'גלייז גבינה עשיר', en: 'Rich cream-cheese glaze' }, { he: 'סוכר חום', en: 'Brown sugar' }],
    badge: { icon: 'star', tone: 'primary', text: { he: 'הקלאסיקה', en: 'The classic' } },
    art: { kind: 'roll', glaze: 'cream' },
  },
  {
    id: 'classic-pair', category: 'classic', featured: true, price: 50,
    name: { he: 'מארז זוג סינבונים קלאסיים', en: 'Classic pair box' },
    desc: {
      he: 'שני סינבוני אוריג׳ינל פילדלפיה במארז אחד. אחד בשבילך ואחד למי שתבחרו לפנק (או לעצמך מחר).',
      en: 'Two Original Philadelphia rolls in one box. One for you and one for someone you love (or for you, tomorrow).',
    },
    tags: [{ he: '2 יחידות', en: '2 rolls' }, { he: 'במקום ₪54', en: 'Instead of ₪54' }],
    badge: { icon: 'savings', tone: 'brown', text: { he: 'חוסכים ₪4', en: 'Save ₪4' } },
    art: { kind: 'pair' },
  },
  {
    id: 'nutella', category: 'decadent', featured: true, price: 32,
    name: { he: 'נוטלה ואגוזי לוז', en: 'Nutella & hazelnut' },
    desc: {
      he: 'מעטפת נוטלה חמה, קרם פרלינה ושברי אגוזי לוז קלויים ומקורמלים. לחובבי שוקולד בלבד.',
      en: 'Warm Nutella, praline cream and caramelised toasted hazelnuts. For chocolate lovers only.',
    },
    tags: [{ he: 'נוטלה חמה', en: 'Warm Nutella' }, { he: 'קראנץ׳ לוז', en: 'Hazelnut crunch' }],
    badge: { icon: 'local_fire_department', tone: 'hot', text: { he: 'מושחת ברמות', en: 'Seriously indulgent' } },
    art: { kind: 'roll', glaze: 'nutella', topping: 'hazelnut' },
  },
  {
    id: 'caramel', category: 'decadent', featured: true, price: 32,
    name: { he: 'קרמל מלוח ופקאן', en: 'Salted caramel & pecan' },
    desc: {
      he: 'רוטב קרמל חמאה מלוח שמבושל במטבח שלנו, פקאנים קלויים ופתיתי מלח. מתוק־מלוח מושלם.',
      en: 'Salted butter caramel cooked in our kitchen, toasted pecans and sea-salt flakes. The perfect sweet-salty balance.',
    },
    tags: [{ he: 'קרמל ביתי', en: 'Homemade caramel' }, { he: 'פקאן קלוי', en: 'Toasted pecans' }],
    badge: { icon: 'bolt', tone: 'soft', text: { he: 'מתוק־מלוח', en: 'Sweet & salty' } },
    art: { kind: 'roll', glaze: 'caramel', topping: 'pecan', drizzle: 'cream' },
  },
  {
    id: 'lotus', category: 'decadent', price: 33,
    name: { he: 'פצצת לוטוס ביסקוף', en: 'Lotus Biscoff bomb' },
    desc: {
      he: 'קרם לוטוס מחומם על סינבון טרי, זילופי גבינה קטיפתיים וקראמבל עוגיות לוטוס פריך.',
      en: 'Warm Lotus spread on a fresh roll, silky cream-cheese drizzle and crunchy Lotus cookie crumble.',
    },
    tags: [{ he: 'ממרח לוטוס', en: 'Lotus spread' }, { he: 'קראמבל פריך', en: 'Cookie crumble' }],
    badge: { icon: 'new_releases', tone: 'brown', text: { he: 'חדש בתפריט', en: 'New' } },
    art: { kind: 'roll', glaze: 'lotus', topping: 'crumbs', drizzle: 'cream' },
  },
  {
    id: 'strawberry', category: 'decadent', price: 33,
    name: { he: 'תותים ושמנת חמוצה', en: 'Strawberries & sour cream' },
    desc: {
      he: 'קולי תותים ביתי, קרם שמנת חמוצה מאוזן ופרוסות תות טריות מעל הרול החם.',
      en: 'Homemade strawberry coulis, a balanced sour-cream frosting and fresh strawberry slices on a warm roll.',
    },
    tags: [{ he: 'עונתי', en: 'Seasonal' }, { he: 'קולי תות', en: 'Strawberry coulis' }],
    badge: { icon: 'eco', tone: 'primary', text: { he: 'מהדורה מוגבלת', en: 'Limited edition' } },
    art: { kind: 'roll', glaze: 'pink', topping: 'strawberry' },
  },
  {
    id: 'vegan', category: 'classic', price: 30,
    name: { he: 'סינבון טבעוני', en: 'Vegan cinnamon roll' },
    desc: {
      he: 'בצק על בסיס שמן קוקוס, מילוי קינמון וסוכר חום וציפוי מייפל־וניל. בלי חלב ובלי ביצים.',
      en: 'Coconut-oil dough, cinnamon and brown-sugar filling and a maple-vanilla glaze. No dairy, no eggs.',
    },
    tags: [{ he: 'טבעוני', en: 'Vegan' }, { he: 'ציפוי מייפל', en: 'Maple glaze' }],
    badge: { icon: 'spa', tone: 'soft', text: { he: 'טבעוני', en: 'Vegan' } },
    art: { kind: 'roll', glaze: 'maple', topping: 'dust' },
  },
  {
    id: 'box6', category: 'boxes', price: 159, wide: true,
    name: { he: 'מארז מיקס שישייה', en: 'Mixed box of six' },
    desc: {
      he: '2 אוריג׳ינל פילדלפיה, 2 נוטלה־לוז, 1 קרמל פקאן ו-1 לוטוס, בקופסת מתנה עם כרטיס ברכה אישי.',
      en: '2 Original Philadelphia, 2 Nutella-hazelnut, 1 salted caramel pecan and 1 Lotus, in a gift box with a personal card.',
    },
    tags: [{ he: 'מומלץ ל-6–8 אנשים', en: 'Serves 6–8' }, { he: 'כולל כרטיס ברכה', en: 'Greeting card included' }],
    badge: { icon: 'savings', tone: 'brown', text: { he: 'משתלם', en: 'Best value' } },
    art: { kind: 'box6' },
  },
  {
    id: 'tray', category: 'boxes', price: 180, wide: true,
    name: { he: 'מגש מיני סינבונים לאירוח (20 יח׳)', en: 'Mini cinnamon roll party tray (20 pcs)' },
    desc: {
      he: 'מיני רולים בארבעה טעמים, מסודרים על מגש הגשה. מושלם לימי הולדת, בריתות וישיבות צוות.',
      en: 'Mini rolls in four flavours, arranged on a serving tray. Perfect for birthdays, family events and office meetings.',
    },
    tags: [{ he: '20 מיני רולים', en: '20 mini rolls' }, { he: 'להזמין 72 שעות מראש', en: 'Order 72 hours ahead' }],
    badge: { icon: 'celebration', tone: 'primary', text: { he: 'לאירועים', en: 'For events' } },
    art: { kind: 'tray' },
  },
  {
    id: 'pullapart', category: 'more', price: 120,
    name: { he: 'עוגת סינבון נמשכת', en: 'Pull-apart cinnamon roll cake' },
    desc: {
      he: 'תבנית עגולה של 7 רולים מחוברים שנמשכים בחום, עם קערית גלייז גבינה בצד. מרכז השולחן.',
      en: 'A round pan of 7 connected rolls you pull apart warm, with a bowl of cream-cheese glaze on the side. The centre of the table.',
    },
    tags: [{ he: '8–10 מנות', en: '8–10 servings' }, { he: 'גלייז בצד', en: 'Glaze on the side' }],
    badge: { icon: 'cake', tone: 'soft', text: { he: 'לשולחן שישי', en: 'Friday table' } },
    art: { kind: 'cluster' },
  },
  {
    id: 'cookies', category: 'more', price: 36,
    name: { he: 'קוקיז סינבון (6 יח׳)', en: 'Cinnamon roll cookies (6 pcs)' },
    desc: {
      he: 'עוגיות חמאה רכות עם ספירלת קינמון וזילוף גלייז וניל. טעם של סינבון בביס אחד.',
      en: 'Soft butter cookies with a cinnamon swirl and vanilla glaze drizzle. A cinnamon roll in one bite.',
    },
    tags: [{ he: '6 עוגיות', en: '6 cookies' }, { he: 'מחזיק 5 ימים', en: 'Keeps 5 days' }],
    badge: { icon: 'redeem', tone: 'brown', text: { he: 'מתנה קטנה', en: 'Little gift' } },
    art: { kind: 'cookies' },
  },
];

export const ADDONS = [
  { id: 'addon-glaze', price: 5, name: { he: 'גלייז גבינה כפול', en: 'Double cream-cheese glaze' } },
  { id: 'addon-nutella', price: 6, name: { he: 'נוטלה בצד', en: 'Nutella on the side' } },
  { id: 'addon-caramel', price: 6, name: { he: 'קרמל מלוח בצד', en: 'Salted caramel on the side' } },
  { id: 'addon-gift', price: 8, name: { he: 'אריזת מתנה', en: 'Gift wrapping' } },
];

/** Any product or add-on by id */
export const findItem = (id) => PRODUCTS.find((p) => p.id === id) || ADDONS.find((a) => a.id === id);
