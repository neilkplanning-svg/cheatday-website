/**
 * Business details: contact, hours, ordering rules, delivery and payments.
 * Text values are translated: { he: '…', en: '…', ru: '…' }. Fields marked TODO come from the questionnaire.
 */
export const BUSINESS = {
  name: 'CheatDay',
  nameHe: 'צ׳יט דיי',
  owner: { he: 'אנסטסיה טורצ׳ין', en: 'Anastasia Tourchin', ru: 'Анастасия Турчин' },
  tagline: { he: 'היום מותר הכל', en: 'Today, anything goes', ru: 'Сегодня можно всё' },
  kind: { he: 'סינבונים וקינוחים ביתיים', en: 'Homemade cinnamon rolls & desserts', ru: 'Домашние синнабоны и десерты' },
  about: {
    he: 'סינבונים וקינוחים בעבודת יד, נאפים במטבח הביתי שלנו לפי הזמנה. בלי קיצורי דרך ובלי רגשות אשם.',
    en: 'Handmade cinnamon rolls and desserts, baked to order in our home kitchen. No shortcuts and no guilt.',
    ru: 'Синнабоны и десерты ручной работы. Печём на домашней кухне под заказ. Без компромиссов и без угрызений совести.',
  },
  city: { he: 'חריש', en: 'Harish', ru: 'Хариш' },
  pickupNote: {
    he: 'הכתובת המדויקת לאיסוף נשלחת בוואטסאפ עם אישור ההזמנה',
    en: 'The exact pickup address is sent on WhatsApp when we confirm your order',
    ru: 'Точный адрес самовывоза пришлём в WhatsApp вместе с подтверждением заказа',
  },
  phone: '054-8340793',
  whatsapp: '972548340793', // international format without + or leading 0
  email: '', // TODO
  instagram: '', // TODO full profile URL
  facebook: '',
  tiktok: '',
  foundedYear: 2026,
};

/** Pickup / hand-over hours. days: 0 = Sunday … 6 = Saturday. TODO: confirm */
export const HOURS = [
  { label: { he: 'ראשון – חמישי', en: 'Sunday – Thursday', ru: 'Воскресенье – четверг' }, days: [0, 1, 2, 3, 4], from: '16:00', to: '21:00' },
  { label: { he: 'שישי וערבי חג', en: 'Friday & holiday eves', ru: 'Пятница и канун праздников' }, days: [5], from: '09:00', to: '13:00' },
  { label: { he: 'שבת', en: 'Saturday', ru: 'Суббота' }, days: [6], closed: true },
];

export const ORDERING = {
  /** Earliest pickup is always two days from today – never same-day */
  leadDays: 2,
  leadNote: { he: 'מזמינים לפחות יומיים מראש', en: 'Order at least two days ahead', ru: 'Заказывайте минимум за два дня' },
  rushNote: {
    he: 'צריכים מוקדם יותר? כתבו לנו בוואטסאפ ונבדוק אם אפשר להקדים',
    en: "Need it sooner? Message us on WhatsApp and we'll check if we can fit you in", ru: 'Нужно раньше? Напишите нам в WhatsApp, и мы проверим, можно ли успеть',
  },
  eventsNote: { he: 'להזמנות אירועים ומגשים גדולים – לפחות 72 שעות מראש', en: 'Events and large trays: at least 72 hours ahead', ru: 'Мероприятия и большие подносы — минимум за 72 часа' },
  cancelHours: 24,
  payments: [ // TODO: confirm
    { he: 'ביט', en: 'Bit', ru: 'Bit' },
    { he: 'פייבוקס', en: 'PayBox', ru: 'PayBox' },
    { he: 'מזומן באיסוף', en: 'Cash on pickup', ru: 'Наличными при получении' },
  ],
};

export const DELIVERY = {
  enabled: true,
  fee: 18, // TODO
  freeAbove: 120, // TODO
  areas: [ // TODO
    { he: 'חריש', en: 'Harish', ru: 'Хариш' },
    { he: 'קציר', en: 'Katzir', ru: 'Кацир' },
    { he: 'פרדס חנה-כרכור', en: 'Pardes Hanna-Karkur', ru: 'Пардес-Хана-Каркур' },
    { he: 'עמק חפר', en: 'Emek Hefer', ru: 'Эмек-Хефер' },
  ],
};

export const CLUB = { enabled: true, code: 'CHEAT10', percent: 10 };

/** Contact person for accessibility requests (required in the accessibility statement) */
export const ACCESSIBILITY = {
  coordinator: BUSINESS.owner,
  phone: BUSINESS.phone,
  email: '',
  updated: '30.10.2026',
};
