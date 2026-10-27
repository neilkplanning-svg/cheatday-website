/** Money, dates and text templates */
import { BUSINESS, DELIVERY, ORDERING } from '../data/index.js';

export const DAY_NAMES = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

/** ₪28 */
export const nis = (n) => `₪${Math.round(n).toLocaleString('he-IL')}`;

/** "יום רביעי 28.10" */
export const fmtDate = (d) => `יום ${DAY_NAMES[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}`;

/** "2026-10-28" in local time (for <input type="date">) */
export const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Fill {city} {areas} {fee} {freeAbove} {cancelHours} placeholders in copy */
export const fillCopy = (s) => String(s)
  .replace(/\{city\}/g, BUSINESS.city)
  .replace(/\{areas\}/g, DELIVERY.areas.join(', '))
  .replace(/\{fee\}/g, DELIVERY.fee)
  .replace(/\{freeAbove\}/g, DELIVERY.freeAbove)
  .replace(/\{cancelHours\}/g, ORDERING.cancelHours);

/** "יום" / "2 ימים" */
export const daysText = (n) => (n === 1 ? 'יום' : `${n} ימים`);
