/**
 * Business details: contact, hours, ordering rules, delivery and payments.
 * Text values are bilingual: { he: '…', en: '…' }. Fields marked TODO come from the questionnaire.
 */
export const BUSINESS = {
  name: 'CheatDay',
  nameHe: 'צ׳יט דיי',
  owner: { he: 'אנסטסיה טורצ׳ין', en: 'Anastasya Turchin' },
  tagline: { he: 'היום מותר הכל', en: 'Today, anything goes' },
  kind: { he: 'סינבונים וקינוחים ביתיים', en: 'Homemade cinnamon rolls & desserts' },
  about: {
    he: 'סינבונים וקינוחים בעבודת יד, נאפים במטבח הביתי שלנו לפי הזמנה. בלי קיצורי דרך ובלי רגשות אשם.',
    en: 'Handmade cinnamon rolls and desserts, baked to order in our home kitchen. No shortcuts and no guilt.',
  },
  city: { he: 'חריש', en: 'Harish' },
  pickupNote: {
    he: 'הכתובת המדויקת לאיסוף נשלחת בוואטסאפ עם אישור ההזמנה',
    en: 'The exact pickup address is sent on WhatsApp when we confirm your order',
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
  { label: { he: 'ראשון – חמישי', en: 'Sunday – Thursday' }, days: [0, 1, 2, 3, 4], from: '16:00', to: '21:00' },
  { label: { he: 'שישי וערבי חג', en: 'Friday & holiday eves' }, days: [5], from: '09:00', to: '13:00' },
  { label: { he: 'שבת', en: 'Saturday' }, days: [6], closed: true },
];

export const ORDERING = {
  /** Earliest pickup is always two days from today – never same-day */
  leadDays: 2,
  leadNote: { he: 'מזמינים לפחות יומיים מראש', en: 'Order at least two days ahead' },
  rushNote: {
    he: 'צריכים מוקדם יותר? כתבו לנו בוואטסאפ ונבדוק אם אפשר להקדים',
    en: "Need it sooner? Message us on WhatsApp and we'll check if we can fit you in",
  },
  eventsNote: { he: 'להזמנות אירועים ומגשים גדולים – לפחות 72 שעות מראש', en: 'Events and large trays: at least 72 hours ahead' },
  cancelHours: 24,
  payments: [ // TODO: confirm
    { he: 'ביט', en: 'Bit' },
    { he: 'פייבוקס', en: 'PayBox' },
    { he: 'מזומן באיסוף', en: 'Cash on pickup' },
  ],
};

export const DELIVERY = {
  enabled: true,
  fee: 18, // TODO
  freeAbove: 120, // TODO
  areas: [ // TODO
    { he: 'חריש', en: 'Harish' },
    { he: 'קציר', en: 'Katzir' },
    { he: 'פרדס חנה-כרכור', en: 'Pardes Hanna-Karkur' },
    { he: 'עמק חפר', en: 'Emek Hefer' },
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
