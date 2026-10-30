/**
 * Menu: categories, products and side add-ons. Text values are translated: { he, en, ru }.
 * `art` draws a temporary illustration. When a real photo exists, add
 * `image: 'assets/img/<file>.webp'` and `imageAlt: { he, en, ru }` to the product.
 * Prices other than the classic roll and the classic pair are still samples (TODO).
 */
export const CATEGORIES = [
  { id: 'all', icon: 'auto_awesome', label: { he: 'הכל', en: 'All', ru: 'Все' } },
  { id: 'classic', icon: 'bakery_dining', label: { he: 'סינבונים קלאסיים', en: 'Classic rolls', ru: 'Классические синнабоны' } },
  { id: 'decadent', icon: 'favorite', label: { he: 'מהדורות מושחתות', en: 'Indulgent editions', ru: 'Особые выпуски' } },
  { id: 'boxes', icon: 'inventory_2', label: { he: 'מארזים ומגשי אירוח', en: 'Boxes & party trays', ru: 'Наборы и подносы' } },
  { id: 'more', icon: 'cookie', label: { he: 'קינוחים נוספים', en: 'More treats', ru: 'Другие сладости' } },
];

export const PRODUCTS = [
  {
    id: 'classic', category: 'classic', featured: true, price: 27,
    name: { he: 'אוריג׳ינל סינבון פילדלפיה', en: 'Original Philadelphia cinnamon roll', ru: 'Синнабон «Оригинал Филадельфия»' },
    desc: {
      he: 'בצק שמרים רך וענני, מילוי חמאה, סוכר חום וקינמון, וגלייז גבינת שמנת נדיב שנמס בביס הראשון.',
      en: 'Soft, cloud-like yeast dough with butter, brown sugar and cinnamon, under a generous cream-cheese glaze that melts on the first bite.',
      ru: 'Мягкое воздушное дрожжевое тесто со сливочным маслом, коричневым сахаром и корицей под щедрой глазурью из сливочного сыра, которая тает с первого укуса.',
    },
    tags: [{ he: 'גלייז גבינה עשיר', en: 'Rich cream-cheese glaze', ru: 'Глазурь из сливочного сыра' }, { he: 'סוכר חום', en: 'Brown sugar', ru: 'Коричневый сахар' }],
    badge: { icon: 'star', tone: 'primary', text: { he: 'הקלאסיקה', en: 'The classic', ru: 'Классика' } },
    art: { kind: 'roll', glaze: 'cream' },
  },
  {
    id: 'classic-pair', category: 'classic', featured: true, price: 50,
    name: { he: 'מארז זוג סינבונים קלאסיים', en: 'Classic pair box', ru: 'Набор из двух классических синнабонов' },
    desc: {
      he: 'שני סינבוני אוריג׳ינל פילדלפיה במארז אחד. אחד בשבילך ואחד למי שתבחרו לפנק (או לעצמך מחר).',
      en: 'Two Original Philadelphia rolls in one box. One for you and one for someone you love (or for you, tomorrow).',
      ru: 'Два синнабона «Оригинал Филадельфия» в одной коробке. Один для вас, другой для того, кого хочется побаловать (или для вас — на завтра).',
    },
    tags: [{ he: '2 יחידות', en: '2 rolls', ru: '2 шт.' }, { he: 'במקום ₪54', en: 'Instead of ₪54', ru: 'Вместо 54 ₪' }],
    badge: { icon: 'savings', tone: 'brown', text: { he: 'חוסכים ₪4', en: 'Save ₪4', ru: 'Экономия 4 ₪' } },
    art: { kind: 'pair' },
  },
  {
    id: 'nutella', category: 'decadent', featured: true, price: 32,
    name: { he: 'נוטלה ואגוזי לוז', en: 'Nutella & hazelnut', ru: 'Нутелла и фундук' },
    desc: {
      he: 'מעטפת נוטלה חמה, קרם פרלינה ושברי אגוזי לוז קלויים ומקורמלים. לחובבי שוקולד בלבד.',
      en: 'Warm Nutella, praline cream and caramelised toasted hazelnuts. For chocolate lovers only.',
      ru: 'Тёплая нутелла, пралине и карамелизованный обжаренный фундук. Только для любителей шоколада.',
    },
    tags: [{ he: 'נוטלה חמה', en: 'Warm Nutella', ru: 'Тёплая нутелла' }, { he: 'קראנץ׳ לוז', en: 'Hazelnut crunch', ru: 'Хруст фундука' }],
    badge: { icon: 'local_fire_department', tone: 'hot', text: { he: 'מושחת ברמות', en: 'Seriously indulgent', ru: 'Очень грешный' } },
    art: { kind: 'roll', glaze: 'nutella', topping: 'hazelnut' },
  },
  {
    id: 'caramel', category: 'decadent', featured: true, price: 32,
    name: { he: 'קרמל מלוח ופקאן', en: 'Salted caramel & pecan', ru: 'Солёная карамель и пекан' },
    desc: {
      he: 'רוטב קרמל חמאה מלוח שמבושל במטבח שלנו, פקאנים קלויים ופתיתי מלח. מתוק־מלוח מושלם.',
      en: 'Salted butter caramel cooked in our kitchen, toasted pecans and sea-salt flakes. The perfect sweet-salty balance.',
      ru: 'Карамель на солёном сливочном масле, сваренная на нашей кухне, обжаренный пекан и хлопья морской соли. Идеальный баланс сладкого и солёного.',
    },
    tags: [{ he: 'קרמל ביתי', en: 'Homemade caramel', ru: 'Домашняя карамель' }, { he: 'פקאן קלוי', en: 'Toasted pecans', ru: 'Обжаренный пекан' }],
    badge: { icon: 'bolt', tone: 'soft', text: { he: 'מתוק־מלוח', en: 'Sweet & salty', ru: 'Сладко-солёный' } },
    art: { kind: 'roll', glaze: 'caramel', topping: 'pecan', drizzle: 'cream' },
  },
  {
    id: 'lotus', category: 'decadent', price: 33,
    name: { he: 'פצצת לוטוס ביסקוף', en: 'Lotus Biscoff bomb', ru: 'Бомба «Лотус Бискофф»' },
    desc: {
      he: 'קרם לוטוס מחומם על סינבון טרי, זילופי גבינה קטיפתיים וקראמבל עוגיות לוטוס פריך.',
      en: 'Warm Lotus spread on a fresh roll, silky cream-cheese drizzle and crunchy Lotus cookie crumble.',
      ru: 'Тёплая паста «Лотус» на свежем синнабоне, шелковистая сырная глазурь и хрустящая крошка печенья «Лотус».',
    },
    tags: [{ he: 'ממרח לוטוס', en: 'Lotus spread', ru: 'Паста «Лотус»' }, { he: 'קראמבל פריך', en: 'Cookie crumble', ru: 'Печеньевая крошка' }],
    badge: { icon: 'new_releases', tone: 'brown', text: { he: 'חדש בתפריט', en: 'New', ru: 'Новинка' } },
    art: { kind: 'roll', glaze: 'lotus', topping: 'crumbs', drizzle: 'cream' },
  },
  {
    id: 'strawberry', category: 'decadent', price: 33,
    name: { he: 'תותים ושמנת חמוצה', en: 'Strawberries & sour cream', ru: 'Клубника и сметана' },
    desc: {
      he: 'קולי תותים ביתי, קרם שמנת חמוצה מאוזן ופרוסות תות טריות מעל הרול החם.',
      en: 'Homemade strawberry coulis, a balanced sour-cream frosting and fresh strawberry slices on a warm roll.',
      ru: 'Домашний клубничный кули, сбалансированный крем на сметане и ломтики свежей клубники на тёплом синнабоне.',
    },
    tags: [{ he: 'עונתי', en: 'Seasonal', ru: 'Сезонный' }, { he: 'קולי תות', en: 'Strawberry coulis', ru: 'Клубничный кули' }],
    badge: { icon: 'eco', tone: 'primary', text: { he: 'מהדורה מוגבלת', en: 'Limited edition', ru: 'Ограниченный выпуск' } },
    art: { kind: 'roll', glaze: 'pink', topping: 'strawberry' },
  },
  {
    id: 'vegan', category: 'classic', price: 30,
    name: { he: 'סינבון טבעוני', en: 'Vegan cinnamon roll', ru: 'Веганский синнабон' },
    desc: {
      he: 'בצק על בסיס שמן קוקוס, מילוי קינמון וסוכר חום וציפוי מייפל־וניל. בלי חלב ובלי ביצים.',
      en: 'Coconut-oil dough, cinnamon and brown-sugar filling and a maple-vanilla glaze. No dairy, no eggs.',
      ru: 'Тесто на кокосовом масле, начинка из корицы и коричневого сахара и кленово-ванильная глазурь. Без молока и яиц.',
    },
    tags: [{ he: 'טבעוני', en: 'Vegan', ru: 'Веганский' }, { he: 'ציפוי מייפל', en: 'Maple glaze', ru: 'Кленовая глазурь' }],
    badge: { icon: 'spa', tone: 'soft', text: { he: 'טבעוני', en: 'Vegan', ru: 'Веганский' } },
    art: { kind: 'roll', glaze: 'maple', topping: 'dust' },
  },
  {
    id: 'box6', category: 'boxes', price: 159, wide: true,
    name: { he: 'מארז מיקס שישייה', en: 'Mixed box of six', ru: 'Набор-ассорти из шести' },
    desc: {
      he: '2 אוריג׳ינל פילדלפיה, 2 נוטלה־לוז, 1 קרמל פקאן ו-1 לוטוס, בקופסת מתנה עם כרטיס ברכה אישי.',
      en: '2 Original Philadelphia, 2 Nutella-hazelnut, 1 salted caramel pecan and 1 Lotus, in a gift box with a personal card.',
      ru: '2 «Оригинал Филадельфия», 2 «Нутелла и фундук», 1 «Солёная карамель и пекан» и 1 «Лотус» в подарочной коробке с открыткой.',
    },
    tags: [{ he: 'מומלץ ל-6–8 אנשים', en: 'Serves 6–8', ru: 'На 6–8 человек' }, { he: 'כולל כרטיס ברכה', en: 'Greeting card included', ru: 'С открыткой' }],
    badge: { icon: 'savings', tone: 'brown', text: { he: 'משתלם', en: 'Best value', ru: 'Выгодно' } },
    art: { kind: 'box6' },
  },
  {
    id: 'tray', category: 'boxes', price: 180, wide: true,
    name: { he: 'מגש מיני סינבונים לאירוח (20 יח׳)', en: 'Mini cinnamon roll party tray (20 pcs)', ru: 'Поднос мини-синнабонов для гостей (20 шт.)' },
    desc: {
      he: 'מיני רולים בארבעה טעמים, מסודרים על מגש הגשה. מושלם לימי הולדת, בריתות וישיבות צוות.',
      en: 'Mini rolls in four flavours, arranged on a serving tray. Perfect for birthdays, family events and office meetings.',
      ru: 'Мини-синнабоны четырёх вкусов на сервировочном подносе. Идеально для дней рождения, семейных праздников и встреч в офисе.',
    },
    tags: [{ he: '20 מיני רולים', en: '20 mini rolls', ru: '20 мини-синнабонов' }, { he: 'להזמין 72 שעות מראש', en: 'Order 72 hours ahead', ru: 'Заказ за 72 часа' }],
    badge: { icon: 'celebration', tone: 'primary', text: { he: 'לאירועים', en: 'For events', ru: 'Для мероприятий' } },
    art: { kind: 'tray' },
  },
  {
    id: 'pullapart', category: 'more', price: 120,
    name: { he: 'עוגת סינבון נמשכת', en: 'Pull-apart cinnamon roll cake', ru: 'Отрывной пирог из синнабонов' },
    desc: {
      he: 'תבנית עגולה של 7 רולים מחוברים שנמשכים בחום, עם קערית גלייז גבינה בצד. מרכז השולחן.',
      en: 'A round pan of 7 connected rolls you pull apart warm, with a bowl of cream-cheese glaze on the side. The centre of the table.',
      ru: 'Круглая форма из 7 соединённых синнабонов, которые отрывают тёплыми, с пиалой сырной глазури. Центр стола.',
    },
    tags: [{ he: '8–10 מנות', en: '8–10 servings', ru: '8–10 порций' }, { he: 'גלייז בצד', en: 'Glaze on the side', ru: 'Глазурь отдельно' }],
    badge: { icon: 'cake', tone: 'soft', text: { he: 'לשולחן שישי', en: 'Friday table', ru: 'Для пятничного стола' } },
    art: { kind: 'cluster' },
  },
  {
    id: 'cookies', category: 'more', price: 36,
    name: { he: 'קוקיז סינבון (6 יח׳)', en: 'Cinnamon roll cookies (6 pcs)', ru: 'Печенье-синнабон (6 шт.)' },
    desc: {
      he: 'עוגיות חמאה רכות עם ספירלת קינמון וזילוף גלייז וניל. טעם של סינבון בביס אחד.',
      en: 'Soft butter cookies with a cinnamon swirl and vanilla glaze drizzle. A cinnamon roll in one bite.',
      ru: 'Мягкое сливочное печенье со спиралью корицы и ванильной глазурью. Вкус синнабона в одном укусе.',
    },
    tags: [{ he: '6 עוגיות', en: '6 cookies', ru: '6 штук' }, { he: 'מחזיק 5 ימים', en: 'Keeps 5 days', ru: 'Хранится 5 дней' }],
    badge: { icon: 'redeem', tone: 'brown', text: { he: 'מתנה קטנה', en: 'Little gift', ru: 'Маленький подарок' } },
    art: { kind: 'cookies' },
  },
];

export const ADDONS = [
  { id: 'addon-glaze', price: 5, name: { he: 'גלייז גבינה כפול', en: 'Double cream-cheese glaze', ru: 'Двойная сырная глазурь' } },
  { id: 'addon-nutella', price: 6, name: { he: 'נוטלה בצד', en: 'Nutella on the side', ru: 'Нутелла отдельно' } },
  { id: 'addon-caramel', price: 6, name: { he: 'קרמל מלוח בצד', en: 'Salted caramel on the side', ru: 'Солёная карамель отдельно' } },
  { id: 'addon-gift', price: 8, name: { he: 'אריזת מתנה', en: 'Gift wrapping', ru: 'Подарочная упаковка' } },
];

/** Any product or add-on by id */
export const findItem = (id) => PRODUCTS.find((p) => p.id === id) || ADDONS.find((a) => a.id === id);
