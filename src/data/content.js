/**
 * Page copy that is not menu or contact data: the "our secret" page, reviews and FAQ.
 * Translated values: { he, en, ru }. FAQ answers may use {city}, {areas}, {fee}, {freeAbove},
 * {minOrder} placeholders.
 */

/** Confirmed by the owner (questionnaire): real butter, Ceylon cinnamon, real vanilla, Philadelphia cream cheese, slow-rise dough, no preservatives */
export const INGREDIENTS = [
  { id: 'butter', art: 'butter', icon: 'water_drop',
    badge: { he: 'חמאה אמיתית', en: 'Real butter', ru: 'Настоящее масло' }, origin: { he: 'בלי מרגרינה', en: 'No margarine', ru: 'Без маргарина' },
    title: { he: 'חמאה אמיתית 82%', en: 'Real 82% butter', ru: 'Настоящее сливочное масло 82%' },
    text: { he: 'הבסיס לכל שכבה בבצק. חמאה עשירה שנותנת רכות שנמסה על הלשון, ריח קרמי ואפס מרגרינה.',
      en: 'The base of every layer of dough. Rich butter for a melt-in-your-mouth softness, a creamy aroma and zero margarine.',
      ru: 'Основа каждого слоя теста. Насыщенное масло даёт тающую мягкость, сливочный аромат и ноль маргарина.' } },
  { id: 'cinnamon', art: 'cinnamon', icon: 'spa',
    badge: { he: 'ציילון', en: 'Ceylon', ru: 'Цейлонская' }, origin: { he: 'הקינמון האמיתי', en: 'True cinnamon', ru: 'Настоящая корица' },
    title: { he: 'קינמון ציילון', en: 'Ceylon cinnamon', ru: 'Цейлонская корица' },
    text: { he: 'מתקתק, עדין ועמוק, בלי המרירות של קינמון קסיה תעשייתי. הוא זה שממלא את הבית בריח.',
      en: 'Sweet, delicate and deep, without the bitterness of industrial cassia. It is what fills the house with that smell.',
      ru: 'Сладкая, нежная и глубокая, без горечи промышленной кассии. Именно она наполняет дом этим ароматом.' } },
  { id: 'flour', art: 'flour', icon: 'grain',
    badge: { he: 'תפיחה איטית', en: 'Slow rise', ru: 'Медленная расстойка' }, origin: { he: 'בצק עננים', en: 'Cloud dough', ru: 'Тесто-облако' },
    title: { he: 'בצק שמרים בתפיחה איטית', en: 'Slow-rise yeast dough', ru: 'Дрожжевое тесто медленной расстойки' },
    text: { he: 'בצק שמרים שמקבל את כל הזמן שהוא צריך כדי לתפוח בנחת. התוצאה: רול אוורירי ורך שמחזיק את המילוי.',
      en: 'A yeast dough that gets all the time it needs to rise slowly. The result: a soft, airy roll that holds its filling.',
      ru: 'Дрожжевое тесто, которому дают столько времени, сколько нужно, чтобы спокойно подойти. Результат — мягкая воздушная булочка, которая держит начинку.' } },
  { id: 'vanilla', art: 'vanilla', icon: 'local_florist', wide: true,
    badge: { he: 'וניל אמיתי', en: 'Real vanilla', ru: 'Настоящая ваниль' }, origin: { he: 'בגלייז', en: 'In the glaze', ru: 'В глазури' },
    title: { he: 'וניל אמיתי בגלייז', en: 'Real vanilla in the glaze', ru: 'Настоящая ваниль в глазури' },
    text: { he: 'גרגירי וניל אמיתיים מוטמעים בגלייז גבינת השמנת, בלי תמציות מלאכותיות. רואים את הנקודות השחורות בכל ציפוי.',
      en: 'Real vanilla seeds folded into the cream-cheese glaze, no artificial extracts. You can see the black specks in every topping.',
      ru: 'Зёрнышки настоящей ванили в глазури из сливочного сыра, без искусственных ароматизаторов. Чёрные точки видны в каждой глазури.' },
    check: { he: 'רואים את נקודות הווניל בכל ציפוי', en: 'Vanilla specks in every glaze', ru: 'Точки ванили в каждой глазури' } },
  { id: 'cheese', art: 'cheese', icon: 'kitchen',
    badge: { he: 'פילדלפיה', en: 'Philadelphia', ru: 'Philadelphia' }, origin: { he: 'הגבינה שבגלייז', en: 'The cheese in the glaze', ru: 'Сыр в глазури' },
    title: { he: 'גבינת שמנת פילדלפיה', en: 'Philadelphia cream cheese', ru: 'Сливочный сыр Philadelphia' },
    text: { he: 'הגלייז שלנו מוכן מגבינת שמנת פילדלפיה אמיתית: קרמי, עשיר ועם חמיצות עדינה שמאזנת את המתיקות של הקינמון.',
      en: 'Our glaze is made with real Philadelphia cream cheese: creamy, rich and with a gentle tang that balances the sweet cinnamon.',
      ru: 'Наша глазурь готовится на настоящем сливочном сыре Philadelphia: кремовая, насыщенная, с лёгкой кислинкой, которая уравновешивает сладость корицы.' } },
];

/** Baking steps – also the chapters of the baking video */
export const PROCESS = [
  { title: { he: 'לישה ותפיחה', en: 'Knead & rise', ru: 'Замес и расстойка' }, sub: { he: 'בצק עננים', en: 'Cloud dough', ru: 'Тесто-облако' },
    text: { he: 'לשים בצק שמרים עם חמאה אמיתית ונותנים לו זמן לתפוח לאט, עד שהוא רך ואוורירי.',
      en: 'We knead a yeast dough with real butter and let it rise slowly until it is soft and airy.',
      ru: 'Замешиваем дрожжевое тесто на настоящем масле и даём ему медленно подойти, пока оно не станет мягким и воздушным.' } },
  { title: { he: 'ספירלת קינמון', en: 'Cinnamon swirl', ru: 'Спираль корицы' }, sub: { he: 'מילוי נדיב', en: 'A generous filling', ru: 'Щедрая начинка' },
    text: { he: 'מורחים שכבת חמאה, מפזרים סוכר חום וקינמון, מגלגלים וחותכים לרולים.',
      en: 'We spread butter, sprinkle brown sugar and cinnamon, roll it up and cut it into rolls.',
      ru: 'Смазываем маслом, посыпаем коричневым сахаром и корицей, сворачиваем рулетом и нарезаем на булочки.' } },
  { title: { he: 'אפייה וגלייז', en: 'Bake & glaze', ru: 'Выпечка и глазурь' }, sub: { he: 'הרגע הכי טעים', en: 'The tastiest moment', ru: 'Самый вкусный момент' },
    text: { he: 'אופים עד הזהב, ומיד מזלפים גלייז גבינה חם שנמס לתוך כל הספירלות.',
      en: 'We bake until golden, then pour warm cream-cheese glaze that melts into every swirl.',
      ru: 'Выпекаем до золотистого цвета и сразу поливаем тёплой глазурью из сливочного сыра, которая затекает в каждый завиток.' } },
];

/** Baking video: { src: 'assets/video/baking.mp4', poster: '…' } or { url: 'https://instagram.com/reel/…' } */
export const VIDEO = null;

/** Sample reviews – shown with a "sample" tag while SITE.draft is true. Replace with real ones (with permission). */
export const REVIEWS = [
  { initial: { he: 'ש', en: 'S', ru: 'Ш' }, name: { he: 'שירה', en: 'Shira', ru: 'Шира' }, place: { he: 'חריש', en: 'Harish', ru: 'Хариш' },
    text: { he: 'הזמנתי מארז ליום ההולדת במשרד ופשוט עצרנו את העבודה. הנוטלה־לוז זה הדבר הכי טעים שאכלתי השנה.',
      en: 'I ordered a box for a birthday at the office and we simply stopped working. The Nutella-hazelnut is the best thing I ate this year.',
      ru: 'Заказала набор на день рождения в офисе, и мы просто перестали работать. Нутелла с фундуком — самое вкусное, что я ела в этом году.' } },
  { initial: { he: 'י', en: 'Y', ru: 'Й' }, name: { he: 'יונתן', en: 'Yonatan', ru: 'Йонатан' }, place: { he: 'קציר', en: 'Katzir', ru: 'Кацир' },
    text: { he: 'הקרמל המלוח עם הפקאן מטורף. בצק קליל שלא מכביד, והאיזון בין מלוח למתוק מדויק.',
      en: 'The salted caramel pecan is crazy good. Light dough that does not weigh you down, and the sweet-salty balance is spot on.',
      ru: 'Солёная карамель с пеканом — это что-то невероятное. Лёгкое тесто, которое не утяжеляет, и идеальный баланс сладкого и солёного.' } },
  { initial: { he: 'מ', en: 'M', ru: 'М' }, name: { he: 'מיכל', en: 'Michal', ru: 'Михаль' }, place: { he: 'פרדס חנה', en: 'Pardes Hanna', ru: 'Пардес-Хана' },
    text: { he: 'גלייז הגבינה של הקלאסי ממכר, ושמו ממנו בנדיבות. הגיע ארוז יפה עם הוראות חימום. ממליצה בחום.',
      en: 'The cream-cheese glaze on the classic is addictive, and they were generous with it. Beautifully packed with reheating instructions. Highly recommended.',
      ru: 'Глазурь из сливочного сыра на классическом синнабоне вызывает привыкание, и её не пожалели. Красиво упаковано, с инструкцией по разогреву. Очень рекомендую.' } },
];

export const FAQ = [
  { q: { he: 'איך מזמינים?', en: 'How do I order?', ru: 'Как сделать заказ?' },
    a: { he: 'בוחרים בתפריט, מוסיפים לסל, ממלאים פרטים ושולחים את ההזמנה בוואטסאפ בלחיצה אחת. נחזור אליכם לאישור ותיאום תשלום. מינימום הזמנה ₪{minOrder}.',
      en: 'Pick from the menu, add to your cart, fill in your details and send the order on WhatsApp in one tap. We will get back to you to confirm and arrange payment. Minimum order ₪{minOrder}.',
      ru: 'Выберите в меню, добавьте в корзину, заполните данные и отправьте заказ в WhatsApp одним нажатием. Мы свяжемся с вами, чтобы подтвердить заказ и договориться об оплате. Минимальный заказ — {minOrder} ₪.' } },
  { q: { he: 'כמה זמן מראש צריך להזמין?', en: 'How far ahead should I order?', ru: 'За сколько дней нужно заказывать?' },
    a: { he: 'אנחנו אופים לפי הזמנה, ולכן מזמינים לפחות יומיים מראש ולא באותו יום. צריכים מוקדם יותר? כתבו לנו בוואטסאפ ונבדוק אם אפשר להקדים. לאירועים מזמינים לפחות 72 שעות מראש.',
      en: 'We bake to order, so orders are placed at least two days ahead, never same-day. Need it sooner? Message us on WhatsApp and we will check if we can fit you in. Events need at least 72 hours.',
      ru: 'Мы печём под заказ, поэтому заказывать нужно минимум за два дня, не день в день. Нужно раньше? Напишите нам в WhatsApp, и мы проверим, можно ли успеть. Для мероприятий — минимум за 72 часа.' } },
  { q: { he: 'יש משלוחים?', en: 'Do you deliver?', ru: 'Есть доставка?' },
    a: { he: 'כן. איסוף עצמי מ{city}, או משלוח ל{areas}. דמי המשלוח ₪{fee}, וחינם בהזמנה מעל ₪{freeAbove}.',
      en: 'Yes. Pick up in {city}, or get delivery to {areas}. Delivery is ₪{fee}, and free on orders over ₪{freeAbove}.',
      ru: 'Да. Самовывоз в г.\u00a0{city} или доставка: {areas}. Доставка стоит {fee} ₪, а при заказе от {freeAbove} ₪ — бесплатно.' } },
  { q: { he: 'איך מחממים כדי שיהיה כמו מהתנור?', en: 'How do I reheat it?', ru: 'Как разогреть?' },
    a: { he: '10–15 שניות במיקרוגל, או 5 דקות בתנור שחומם ל-160 מעלות. הגלייז נמס בדיוק כמו שצריך.',
      en: '10–15 seconds in the microwave, or 5 minutes in an oven preheated to 160°C. The glaze melts just right.',
      ru: '10–15 секунд в микроволновке или 5 минут в духовке, разогретой до 160 °C. Глазурь растает как надо.' } },
  { q: { he: 'מה עם אלרגנים?', en: 'What about allergens?', ru: 'А что с аллергенами?' },
    a: { he: 'המוצרים מכילים גלוטן, חלב וביצים, ועשויים להכיל אגוזים, בוטנים, שומשום וסויה. הרול הטבעוני ללא חלב וביצים, אך נאפה באותו מטבח.',
      en: 'Our products contain gluten, milk and eggs, and may contain nuts, peanuts, sesame and soy. The vegan roll has no dairy or eggs but is baked in the same kitchen.',
      ru: 'Наша продукция содержит глютен, молоко и яйца и может содержать орехи, арахис, кунжут и сою. Веганский синнабон без молочных продуктов и яиц, но печётся на той же кухне.' } },
  { q: { he: 'אפשר לבטל או לשנות הזמנה?', en: 'Can I cancel or change an order?', ru: 'Можно отменить или изменить заказ?' },
    a: { he: 'אחרי שאישרנו את ההזמנה אי אפשר לבטל אותה, כי אנחנו קונים חומרי גלם ואופים במיוחד בשבילכם. צריכים לשנות שעה או פרט קטן? כתבו לנו ונשתדל לעזור.',
      en: 'Once we confirm an order it cannot be cancelled, because we buy the ingredients and bake especially for you. Need to change the time or a small detail? Message us and we will do our best.',
      ru: 'После подтверждения заказ отменить нельзя: мы закупаем продукты и печём специально для вас. Нужно изменить время или мелкую деталь? Напишите нам, и мы постараемся помочь.' } },
  { q: { he: 'אפשר להזמין לאירוע?', en: 'Can I order for an event?', ru: 'Можно заказать на мероприятие?' },
    a: { he: 'בטח. מכינים מארזים בכמויות גדולות לימי הולדת, לאירועים ולמשרדים. שלחו לנו פרטים בטופס או בוואטסאפ ונבנה הצעה.',
      en: 'Of course. We make large orders of boxes for birthdays, events and offices. Send us the details in the form or on WhatsApp and we will put together an offer.',
      ru: 'Конечно. Готовим большие заказы наборов на дни рождения, мероприятия и в офис. Пришлите детали через форму или в WhatsApp, и мы подготовим предложение.' } },
];
