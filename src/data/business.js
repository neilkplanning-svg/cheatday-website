/**
 * Business details: contact, hours, ordering rules, delivery and payments.
 * Fields marked TODO are filled from the questionnaire.
 */
export const BUSINESS = {
  name: 'CheatDay',
  nameHe: 'צ׳יט דיי',
  tagline: 'היום מותר הכל',
  kind: 'סינבונים וקינוחים ביתיים',
  about: 'סינבונים וקינוחים בעבודת יד, נאפים במטבח הביתי שלנו לפי הזמנה. בלי קיצורי דרך ובלי רגשות אשם.',
  city: 'חריש', // TODO: confirm
  pickupNote: 'הכתובת המדויקת לאיסוף נשלחת בוואטסאפ עם אישור ההזמנה',
  phone: '', // TODO e.g. '050-1234567'
  whatsapp: '', // TODO international format without + or leading 0, e.g. '972501234567'. Empty = WhatsApp asks for a contact
  email: '', // TODO
  instagram: '', // TODO full profile URL
  facebook: '',
  tiktok: '',
  foundedYear: 2026,
};

/** Pickup / hand-over hours. days: 0 = Sunday … 6 = Saturday. TODO: confirm */
export const HOURS = [
  { label: 'ראשון – חמישי', days: [0, 1, 2, 3, 4], from: '16:00', to: '21:00' },
  { label: 'שישי וערבי חג', days: [5], from: '09:00', to: '13:00' },
  { label: 'שבת', days: [6], closed: true },
];

export const ORDERING = {
  leadDays: 1, // order at least this many days ahead
  cutoffHour: 20, // after this hour, "tomorrow" becomes the day after
  weekendNote: 'הזמנות לשישי נסגרות ביום חמישי ב-12:00',
  eventsNote: 'להזמנות אירועים ומגשים גדולים – לפחות 72 שעות מראש',
  cancelHours: 24,
  payments: ['ביט', 'פייבוקס', 'מזומן באיסוף'], // TODO
};

export const DELIVERY = {
  enabled: true,
  fee: 18, // TODO
  freeAbove: 120, // TODO
  areas: ['חריש', 'קציר', 'פרדס חנה-כרכור', 'עמק חפר'], // TODO
};

export const CLUB = { enabled: true, code: 'CHEAT10', percent: 10 };

/** Contact person for accessibility requests (required in the accessibility statement) */
export const ACCESSIBILITY = {
  coordinator: '', // TODO
  phone: '',
  email: '',
  updated: '27.10.2026',
};
