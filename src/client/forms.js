/** Club sign-up, coupon code and the contact form */
import { BUSINESS, CLUB } from '../data/index.js';
import { waLink } from '../lib/links.js';
import { tr } from '../lib/i18n.js';
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
  if (!validPhone(phone)) msg = tr('נא להזין מספר נייד תקין, למשל 050-1234567', 'Please enter a valid Israeli mobile number, e.g. 050-1234567', 'Введите правильный израильский мобильный номер, например 050-1234567');
  else if (!form.consent.checked) msg = tr('כדי להצטרף צריך לאשר קבלת עדכונים', 'To join, please agree to receive updates', 'Чтобы вступить, подтвердите согласие на получение новостей');
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
  if (CLUB.enabled && code === CLUB.code) { setPromo(code); renderCart(); toast(tr(`הקוד הופעל: ${CLUB.percent}% הנחה`, `Code applied: ${CLUB.percent}% off`, `Промокод применён: скидка ${CLUB.percent}%`), 'sell'); }
  else { toast(tr('הקוד לא מוכר', 'Unknown code', 'Неизвестный код'), 'error'); announce(tr('קוד הקופון לא מוכר', 'The coupon code is not recognised', 'Такой промокод не найден')); form.code.focus(); }
}

export function submitContact(form) {
  const f = Object.fromEntries(new FormData(form).entries());
  const errors = {};
  if (!f.name.trim()) errors['c-name'] = tr('נא למלא שם מלא', 'Please enter your full name', 'Пожалуйста, укажите имя и фамилию');
  if (!validPhone(f.phone)) errors['c-phone'] = tr('מספר הטלפון לא תקין. למשל: 050-1234567', 'The phone number is not valid. For example: 050-1234567', 'Неверный номер телефона. Например: 050-1234567');
  if (!f.message.trim()) errors['c-msg'] = tr('נא לכתוב את תוכן ההודעה', 'Please write your message', 'Пожалуйста, напишите сообщение');
  if (!showErrors(form, errors)) return;
  const text = tr(`היי ${BUSINESS.name}! פנייה מהאתר – ${f.topic}`, `Hi ${BUSINESS.name}! Message from the website – ${f.topic}`, `Привет, ${BUSINESS.name}! Сообщение с сайта — ${f.topic}`) + `\n👤 ${f.name}\n📞 ${f.phone}\n\n${f.message}`;
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
