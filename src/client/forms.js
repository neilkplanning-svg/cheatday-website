/** Club sign-up, coupon code and the contact form */
import { BUSINESS, CLUB } from '../data/index.js';
import { waLink } from '../lib/links.js';
import { store, KEYS } from '../lib/storage.js';
import { setPromo } from './state.js';
import { renderCart } from './cart.js';
import { $, toast, announce } from './dom.js';
import { showErrors } from './checkout.js';

const validPhone = (v) => /^0\d{8,9}$/.test((v || '').replace(/[\s-]/g, ''));

export function submitClub(form) {
  const phone = form.phone.value.trim();
  const err = form.querySelector('[data-form-error]');
  let msg = '';
  if (!validPhone(phone)) msg = 'נא להזין מספר נייד תקין, למשל 050-1234567';
  else if (!form.consent.checked) msg = 'כדי להצטרף צריך לאשר קבלת עדכונים';
  err.textContent = msg;
  if (msg) {
    (validPhone(phone) ? form.consent : form.phone).focus();
    form.phone.toggleAttribute('aria-invalid', !validPhone(phone));
    announce(msg);
    return;
  }
  store.set(KEYS.club, phone);
  setPromo(CLUB.code);
  renderCart();
  form.hidden = true;
  const ok = $('[data-club-ok]');
  ok.classList.remove('hidden');
  ok.focus();
}

export function submitPromo(form) {
  const code = form.code.value.trim().toUpperCase();
  if (CLUB.enabled && code === CLUB.code) { setPromo(code); renderCart(); toast(`הקוד הופעל: ${CLUB.percent}% הנחה`, 'sell'); }
  else { toast('הקוד לא מוכר', 'error'); announce('קוד הקופון לא מוכר'); form.code.focus(); }
}

export function submitContact(form) {
  const f = Object.fromEntries(new FormData(form).entries());
  const errors = {};
  if (!f.name.trim()) errors['c-name'] = 'נא למלא שם מלא';
  if (!validPhone(f.phone)) errors['c-phone'] = 'מספר הטלפון לא תקין. למשל: 050-1234567';
  if (!f.message.trim()) errors['c-msg'] = 'נא לכתוב את תוכן ההודעה';
  if (!showErrors(form, errors)) return;
  const text = `היי ${BUSINESS.name}! פנייה מהאתר – ${f.topic}\n👤 ${f.name}\n📞 ${f.phone}\n\n${f.message}`;
  const box = $('[data-contact-ready]');
  box.querySelector('a').href = waLink(text);
  box.hidden = false;
  box.focus();
}

/** Restore the "joined" state of the club section on load */
export function initClub() {
  const form = $('[data-form="club"]');
  if (form && store.get(KEYS.club, null)) {
    form.hidden = true;
    $('[data-club-ok]').classList.remove('hidden');
  }
}
