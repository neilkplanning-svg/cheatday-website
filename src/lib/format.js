/** Money, dates and text templates */
import { BUSINESS, DELIVERY, ORDERING } from '../data/index.js';
import { loc, locList, tr, getLang, ruPlural } from './i18n.js';

const DAYS = {
  he: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
};

/** Weekday name in the current language */
export const dayName = (d) => tr(DAYS.he[d], DAYS.en[d], DAYS.ru[d]);

/** ₪27 (Hebrew, English) / 27 ₪ (Russian) */
export const nis = (n) => {
  const num = Math.round(n).toLocaleString('he-IL');
  return getLang() === 'ru' ? `${num}\u00a0₪` : `₪${num}`;
};

/** "יום רביעי 28.10" / "Wednesday 28/10" / "среда, 28.10" */
export const fmtDate = (d) => tr(`יום ${DAYS.he[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}`, `${DAYS.en[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`, `${DAYS.ru[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`);

/** "2026-10-28" in local time (for <input type="date">) */
export const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Fill {city} {areas} {fee} {freeAbove} {cancelHours} placeholders in copy */
export const fillCopy = (s) => String(loc(s))
  .replace(/\{city\}/g, loc(BUSINESS.city))
  .replace(/\{areas\}/g, locList(DELIVERY.areas).join(', '))
  .replace(/\{fee\}/g, DELIVERY.fee)
  .replace(/\{freeAbove\}/g, DELIVERY.freeAbove)
  .replace(/\{cancelHours\}/g, ORDERING.cancelHours);

/** "יום" / "יומיים" / "3 ימים" – and the English and Russian equivalents */
export const daysText = (n) => tr(n === 1 ? 'יום' : n === 2 ? 'יומיים' : `${n} ימים`, n === 1 ? 'one day' : n === 2 ? 'two days' : `${n} days`, n === 1 ? 'один день' : n === 2 ? 'два дня' : `${n} ${ruPlural(n, 'день', 'дня', 'дней')}`);
