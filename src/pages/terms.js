/** Terms of use, ordering policy and privacy */
import { SITE, BUSINESS, ORDERING } from '../data/index.js';
import { esc, ic } from '../lib/html.js';
import { tr, loc, locList, ruPlural } from '../lib/i18n.js';
import { daysText } from '../lib/format.js';
import { href } from '../lib/paths.js';

const emailLink = () => (BUSINESS.email ? `<span dir="ltr">${esc(BUSINESS.email)}</span>` : '');

const hebrew = () => `
    <h2>הזמנות</h2>
    <p>ההזמנה באתר נשלחת אלינו בוואטסאפ ונחשבת סופית רק לאחר אישור שלנו. אנחנו אופים לפי הזמנה, ולכן מועד האיסוף המוקדם ביותר הוא ${daysText(ORDERING.leadDays)} מהיום, ולא באותו יום. ${esc(loc(ORDERING.rushNote))}. ${esc(loc(ORDERING.eventsNote))}.</p>
    <h2>תשלום</h2>
    <p>התשלום מתבצע ב${esc(locList(ORDERING.payments).join(', '))}, לפי התיאום בעת אישור ההזמנה. הבצק נכנס להכנה רק אחרי התשלום.</p>
    <h2>ביטולים ושינויים</h2>
    <p>אפשר לבטל או לשנות הזמנה ללא עלות עד ${ORDERING.cancelHours} שעות לפני מועד האיסוף. לאחר מכן המוצרים כבר בהכנה ולא נוכל להחזיר את התשלום.</p>
    <h2>אלרגנים</h2>
    <p>המוצרים מכילים גלוטן, חלב וביצים, ועשויים להכיל אגוזים, בוטנים ושומשום. כל המוצרים נאפים באותו מטבח. יש לכם אלרגיה? כתבו לנו לפני ההזמנה.</p>
    <h2>פרטיות</h2>
    <p>הפרטים שאתם ממלאים (שם, טלפון וכתובת) משמשים רק לטיפול בהזמנה ונשלחים אלינו בהודעת הוואטסאפ שאתם שולחים. הסל ופרטי ההזמנה האחרונה נשמרים בדפדפן שלכם בלבד, לנוחותכם, ואינם נשלחים לשום שרת. אפשר למחוק אותם בניקוי נתוני הדפדפן.</p>
    <p>הצטרפות למועדון נעשית רק בהסכמה מפורשת. נשלח עדכונים ומבצעים רק למי שאישר, ובכל הודעה אפשר לבקש הסרה. לבקשת עיון או מחיקה של פרטים, פנו אלינו בוואטסאפ או בטלפון <span dir="ltr">${esc(BUSINESS.phone)}</span>${BUSINESS.email ? ` או בכתובת ${emailLink()}` : ''}.</p>
    <h2>נגישות</h2>
    <p>פרטים מלאים ב<a href="${href('accessibility')}">הצהרת הנגישות</a>.</p>`;

const english = () => `
    <h2>Orders</h2>
    <p>An order placed on the site is sent to us on WhatsApp and is final only once we confirm it. We bake to order, so the earliest pickup is ${daysText(ORDERING.leadDays)} from today, never the same day. ${esc(loc(ORDERING.rushNote))}. ${esc(loc(ORDERING.eventsNote))}.</p>
    <h2>Payment</h2>
    <p>Payment is by ${esc(locList(ORDERING.payments).join(', '))}, as arranged when we confirm the order. We start preparing the dough only after payment.</p>
    <h2>Cancellations and changes</h2>
    <p>You can cancel or change an order free of charge up to ${ORDERING.cancelHours} hours before pickup. After that the products are already being prepared and we cannot refund the payment.</p>
    <h2>Allergens</h2>
    <p>Our products contain gluten, milk and eggs, and may contain nuts, peanuts and sesame. Everything is baked in the same kitchen. Have an allergy? Message us before you order.</p>
    <h2>Privacy</h2>
    <p>The details you fill in (name, phone and address) are used only to handle your order and reach us inside the WhatsApp message you send. Your cart and the details of your last order are stored only in your own browser, for your convenience, and are never sent to any server. You can delete them by clearing your browser data.</p>
    <p>Joining the club requires your explicit consent. We send updates and offers only to people who agreed, and every message lets you unsubscribe. To see or delete your details, contact us on WhatsApp or by phone at <span dir="ltr">${esc(BUSINESS.phone)}</span>${BUSINESS.email ? ` or at ${emailLink()}` : ''}.</p>
    <h2>Accessibility</h2>
    <p>Full details are in our <a href="${href('accessibility')}">accessibility statement</a>.</p>`;

const russian = () => `
    <h2>Заказы</h2>
    <p>Заказ с сайта приходит к нам в WhatsApp и считается окончательным только после нашего подтверждения. Мы печём под заказ, поэтому самый ранний самовывоз — через ${daysText(ORDERING.leadDays)} после заказа, не день в день. ${esc(loc(ORDERING.rushNote))}. ${esc(loc(ORDERING.eventsNote))}.</p>
    <h2>Оплата</h2>
    <p>Способы оплаты: ${esc(locList(ORDERING.payments).join(', '))} — по договорённости при подтверждении заказа. Мы начинаем готовить тесто только после оплаты.</p>
    <h2>Отмена и изменения</h2>
    <p>Отменить или изменить заказ можно бесплатно не позднее чем за ${ORDERING.cancelHours} ${ruPlural(ORDERING.cancelHours, 'час', 'часа', 'часов')} до самовывоза. После этого продукция уже готовится, и вернуть оплату мы не сможем.</p>
    <h2>Аллергены</h2>
    <p>Наша продукция содержит глютен, молоко и яйца и может содержать орехи, арахис и кунжут. Всё печётся на одной кухне. Есть аллергия? Напишите нам до заказа.</p>
    <h2>Конфиденциальность</h2>
    <p>Данные, которые вы указываете (имя, телефон и адрес), используются только для выполнения заказа и попадают к нам в сообщении WhatsApp, которое вы отправляете. Корзина и данные последнего заказа хранятся только в вашем браузере для вашего удобства и никуда не отправляются. Их можно удалить, очистив данные браузера.</p>
    <p>Вступление в клуб — только с вашего явного согласия. Мы отправляем новости и предложения только тем, кто согласился, и в каждом сообщении можно отписаться. Чтобы посмотреть или удалить свои данные, напишите нам в WhatsApp или позвоните по номеру <span dir="ltr">${esc(BUSINESS.phone)}</span>${BUSINESS.email ? ` или напишите на ${emailLink()}` : ''}.</p>
    <h2>Доступность</h2>
    <p>Подробности — в нашем <a href="${href('accessibility')}">заявлении о доступности</a>.</p>`;

export const page = {
  id: 'terms',
  breadcrumb: () => tr('תנאי שימוש ופרטיות', 'Terms & privacy', 'Условия и конфиденциальность'),
  title: () => tr(`תנאי שימוש, הזמנות ופרטיות | ${BUSINESS.name}`, `Terms of use, orders & privacy | ${BUSINESS.name}`, `Условия использования, заказы и конфиденциальность | ${BUSINESS.name}`),
  description: () => tr(
    `תנאי ההזמנה, התשלום והביטול של ${BUSINESS.name}, מידע על אלרגנים ומדיניות הפרטיות של האתר.`,
    `${BUSINESS.name} ordering, payment and cancellation terms, allergen information and the site privacy policy.`, `Условия заказа, оплаты и отмены ${BUSINESS.name}, информация об аллергенах и политика конфиденциальности сайта.`),
  render: () => `
<article class="wrap gutter-x py-space-xl max-w-3xl" aria-labelledby="terms-title">
  ${SITE.draft ? `<p class="chip bg-tertiary-fixed text-on-tertiary-fixed !px-space-md mb-space-sm w-fit">${ic('edit_note', '!text-[1rem]')}${tr('טיוטה – יעודכן לפי פרטי העסק', 'Draft – will be updated with the business details', 'Черновик — будет обновлён по данным бизнеса')}</p>` : ''}
  <h1 id="terms-title" class="text-headline-lg md:text-display text-on-surface mb-space-md">${tr('תנאי שימוש, הזמנות ופרטיות', 'Terms of use, orders & privacy', 'Условия использования, заказы и конфиденци&shy;альность')}</h1>
  <div class="prose-cd">${tr(hebrew(), english(), russian())}</div>
</article>`,
};
