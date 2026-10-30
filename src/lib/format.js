/** Money, dates and text templates */
import { BUSINESS, DELIVERY, ORDERING } from '../data/index.js';
import { loc, locList, tr } from './i18n.js';

const DAYS = {
  he: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

/** Weekday name in the current language */
export const dayName = (d) => tr(DAYS.he[d], DAYS.en[d]);

/** ₪27 */
export const nis = (n) => `₪${Math.round(n).toLocaleString('he-IL')}`;

/** "יום רביעי 28.10" / "Wednesday 28/10" */
export const fmtDate = (d) => tr(`יום ${DAYS.he[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}`, `${DAYS.en[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`);

/** "2026-10-28" in local time (for <input type="date">) */
export const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Fill {city} {areas} {fee} {freeAbove} {cancelHours} placeholders in copy */
export const fillCopy = (s) => String(loc(s))
  .replace(/\{city\}/g, loc(BUSINESS.city))
  .replace(/\{areas\}/g, locList(DELIVERY.areas).join(', '))
  .replace(/\{fee\}/g, DELIVERY.fee)
  .replace(/\{freeAbove\}/g, DELIVERY.freeAbove)
  .replace(/\{cancelHours\}/g, ORDERING.cancelHours);

/** "יום" / "יומיים" / "3 ימים" – and the English equivalents */
export const daysText = (n) => tr(n === 1 ? 'יום' : n === 2 ? 'יומיים' : `${n} ימים`, n === 1 ? 'one day' : n === 2 ? 'two days' : `${n} days`);
