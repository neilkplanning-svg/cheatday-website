/** Opening hours logic: when can a customer pick up, and which time slots exist */
import { HOURS, ORDERING } from '../data/index.js';
import { tr } from './i18n.js';

const toMinutes = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

/** Hours row for a weekday (0 = Sunday) */
export const hoursFor = (dow) => HOURS.find((h) => h.days.includes(dow));

/** Is pickup possible on this weekday? */
export const isOpenDay = (dow) => { const h = hoursFor(dow); return Boolean(h && !h.closed); };

/** First date a new order can be ready: always `leadDays` from today (never same-day), skipping closed days */
export function firstOrderDate(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  d.setDate(d.getDate() + ORDERING.leadDays);
  for (let i = 0; i < 14 && !isOpenDay(d.getDay()); i++) d.setDate(d.getDate() + 1);
  return d;
}

/** One-hour pickup slots for a YYYY-MM-DD date ("16:00–17:00") */
export function slotsFor(dateStr) {
  if (!dateStr) return [];
  const h = hoursFor(new Date(`${dateStr}T12:00:00`).getDay());
  if (!h || h.closed) return [];
  const start = Math.floor(toMinutes(h.from) / 60);
  const end = Math.ceil(toMinutes(h.to) / 60);
  const pad = (x) => String(x).padStart(2, '0');
  const out = [];
  for (let x = start; x < end; x++) out.push(`${pad(x)}:00–${pad(x + 1)}:00`);
  return out;
}

/** Is pickup open right now? */
export function pickupStatus(now = new Date()) {
  const h = hoursFor(now.getDay());
  const mins = now.getHours() * 60 + now.getMinutes();
  if (h && !h.closed && mins >= toMinutes(h.from) && mins < toMinutes(h.to)) {
    return { open: true, text: tr(`האיסוף פתוח עד ${h.to}`, `Pickup open until ${h.to}`) };
  }
  return { open: false, text: tr('ההזמנות פתוחות באתר 24/7', 'Online orders open 24/7') };
}
