/** Checkout dialog: customer details → WhatsApp message ready to send */
import { BUSINESS, DELIVERY, ORDERING } from '../data/index.js';
import { esc, ic, each } from '../lib/html.js';
import { nis, fmtDate, isoDate, dayName } from '../lib/format.js';
import { tr, loc, locList, ruPlural } from '../lib/i18n.js';
import { firstOrderDate, isOpenDay, slotsFor } from '../lib/schedule.js';
import { waLink } from '../lib/links.js';
import { store, KEYS } from '../lib/storage.js';
import { state, totals, setMode, clearCart, rememberCustomer } from './state.js';
import { $, toast, announce, hideToast } from './dom.js';
import { closeLayers, setPageInert } from './layers.js';
import { renderCart } from './cart.js';

let returnFocus = null;
const dialog = () => $('[data-checkout]');
const body = () => $('[data-checkout-body]');

const field = (id, label, input, hint = '') => `
  <div class="flex flex-col gap-space-xs">
    <label class="label" for="${id}">${label}</label>
    ${input}
    ${hint ? `<p id="${id}-hint" class="text-label-sm text-on-surface-variant">${hint}</p>` : ''}
    <p id="${id}-err" class="field-error" data-error-for="${id}"></p>
  </div>`;

const header = (title, icon) => `
  <div class="flex items-center justify-between mb-space-md">
    <h2 id="co-title" class="text-headline-md text-on-surface flex items-center gap-space-xs" tabindex="-1">${ic(icon, 'text-primary')}${title}</h2>
    <button type="button" data-act="close-checkout" class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center" aria-label="${tr('סגירת חלון ההזמנה', 'Close the order window', 'Закрыть окно заказа')}">${ic('close')}</button>
  </div>`;

function formHtml() {
  const c = state.customer;
  const minDate = isoDate(firstOrderDate());
  return `${header(tr('פרטי ההזמנה', 'Order details', 'Детали заказа'), 'receipt_long')}
  <form data-form="checkout" class="flex flex-col gap-space-md" novalidate>
    <p class="text-body-sm text-on-surface-variant">${tr('כל השדות חובה, חוץ מהערות.', 'All fields are required except notes.', 'Все поля обязательны, кроме комментария.')}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      ${field('co-name', tr('שם מלא', 'Full name', 'Имя и фамилия'), `<input class="field" id="co-name" name="name" required aria-required="true" autocomplete="name" value="${esc(c.name || '')}" aria-describedby="co-name-err">`)}
      ${field('co-phone', tr('טלפון נייד', 'Mobile phone', 'Мобильный телефон'), `<input class="field text-start" dir="ltr" id="co-phone" name="phone" type="tel" inputmode="tel" required aria-required="true" autocomplete="tel" value="${esc(c.phone || '')}" placeholder="050-0000000" aria-describedby="co-phone-err">`)}
    </div>
    ${DELIVERY.enabled ? `<fieldset class="flex flex-col gap-space-xs"><legend class="label mb-space-xs">${tr('קבלת ההזמנה', 'How to get it', 'Способ получения')}</legend>
      <div class="grid grid-cols-2 gap-space-xs p-space-xs bg-surface-container-low rounded-full">
        ${each([['pickup', 'storefront', tr(`איסוף עצמי ב${loc(BUSINESS.city)}`, `Pickup in ${loc(BUSINESS.city)}`, `Самовывоз (${loc(BUSINESS.city)})`)], ['delivery', 'moped', tr('משלוח עד הבית', 'Home delivery', 'Доставка на дом')]], ([v, i, l]) => `<label class="cursor-pointer"><input type="radio" name="mode" value="${v}" class="peer sr-only" ${state.mode === v ? 'checked' : ''}>
          <span class="flex items-center justify-center gap-space-xs min-h-[2.75rem] px-space-sm rounded-full text-label-sm peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary">${ic(i, '!text-[1rem]')}${l}</span></label>`)}
      </div></fieldset>` : ''}
    <div data-address ${state.mode === 'delivery' ? '' : 'hidden'}>
      ${field('co-address', tr('כתובת למשלוח', 'Delivery address', 'Адрес доставки'), `<input class="field" id="co-address" name="address" autocomplete="street-address" value="${esc(c.address || '')}" placeholder="${tr('רחוב, מספר, דירה, עיר', 'Street, number, flat, town', 'Улица, дом, квартира, город')}" aria-describedby="co-address-hint co-address-err">`, tr(`משלוחים ל${esc(locList(DELIVERY.areas).join(', '))}`, `We deliver to ${esc(locList(DELIVERY.areas).join(', '))}`, `Доставляем в: ${esc(locList(DELIVERY.areas).join(', '))}`))}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      ${field('co-date', tr('תאריך איסוף', 'Pickup date', 'Дата получения'), `<input class="field" id="co-date" name="date" type="date" min="${minDate}" value="${minDate}" required aria-required="true" aria-describedby="co-date-hint co-date-err">`, `${esc(loc(ORDERING.leadNote))}. ${esc(loc(ORDERING.rushNote))}.`)}
      ${field('co-slot', tr('שעה', 'Time', 'Время'), `<select class="field" id="co-slot" name="slot" required aria-required="true" aria-describedby="co-slot-err">${each(slotsFor(minDate), (s) => `<option>${s}</option>`)}</select>`)}
    </div>
    ${field('co-pay', tr('איך נוח לכם לשלם?', 'How would you like to pay?', 'Как вам удобнее оплатить?'), `<select class="field" id="co-pay" name="pay">${each(locList(ORDERING.payments), (p) => `<option ${c.pay === p ? 'selected' : ''}>${esc(p)}</option>`)}</select>`)}
    <div class="flex flex-col gap-space-xs"><label class="label" for="co-notes">${tr('הערות (רשות)', 'Notes (optional)', 'Комментарий (необязательно)')}</label>
      <textarea class="field resize-y" id="co-notes" name="notes" rows="2" placeholder="${tr('ברכה למארז, גלייז בצד, אלרגיות...', 'Greeting for the box, glaze on the side, allergies...', 'Поздравление к набору, глазурь отдельно, аллергии...')}">${esc(state.notes)}</textarea></div>
    <p class="p-space-sm rounded bg-surface-container-low flex items-center justify-between text-headline-sm"><span>${tr('סה״כ לתשלום', 'Total to pay', 'Итого к оплате')}</span><span class="text-primary tabular-nums" data-co-total>${nis(totals().total)}</span></p>
    <button type="submit" class="btn-pop w-full min-h-[3.25rem] rounded-full bg-primary text-on-primary text-headline-sm flex items-center justify-center gap-space-xs shadow-pop-md">${tr('סיכום ושליחה', 'Review & send', 'Проверить и отправить')} ${ic('arrow_back', 'fwd')}</button>
    <p class="text-label-sm text-on-surface-variant text-center">${tr('ההזמנה נשלחת אלינו בוואטסאפ ונאשר אותה בהקדם. התשלום רק אחרי האישור.', 'Your order reaches us on WhatsApp and we will confirm it soon. You pay only after we confirm.', 'Заказ придёт к нам в WhatsApp, и мы скоро его подтвердим. Оплата только после подтверждения.')}</p>
  </form>`;
}

export function openCheckout() {
  if (!totals().count) { toast(tr('הסל עדיין ריק – בחרו משהו מתוק', 'Your cart is empty – pick something sweet', 'Корзина пока пуста — выберите что-нибудь сладкое'), 'cookie'); return; }
  returnFocus = document.activeElement && document.activeElement.closest('[data-layer]') ? $('.site-header [data-act="cart"]') : document.activeElement;
  closeLayers(false);
  body().innerHTML = formHtml();
  dialog().hidden = false;
  hideToast();
  setPageInert(true);
  document.body.classList.add('overflow-hidden');
  $('#co-title').focus();
}

export function closeCheckout() {
  dialog().hidden = true;
  setPageInert(false);
  document.body.classList.remove('overflow-hidden');
  if (returnFocus && returnFocus.isConnected) returnFocus.focus();
}

/** Order line; orders in other languages also carry the Hebrew name, on its own line, for the kitchen */
const orderLine = (l) => `• ${l.qty} × ${loc(l.item.name)} – ${nis(l.item.price * l.qty)}${tr('', `\n   ${l.item.name.he}`, `\n   ${l.item.name.he}`)}`;

/** WhatsApp message text */
export function orderText(f) {
  const t = totals();
  const club = store.get(KEYS.club, null);
  const sections = [
    [tr(`היי ${BUSINESS.name}! 🧁 הזמנה חדשה מהאתר`, `Hi ${BUSINESS.name}! 🧁 New order from the website (English)`, `Привет, ${BUSINESS.name}! 🧁 Новый заказ с сайта (на русском)`)],
    [
      `👤 ${tr('שם', 'Name', 'Имя')}: ${f.name}`,
      `📞 ${tr('טלפון', 'Phone', 'Телефон')}: ${f.phone}`,
      f.mode === 'delivery' ? `🛵 ${tr('משלוח לכתובת', 'Delivery to', 'Доставка по адресу')}: ${f.address}` : `🏠 ${tr(`איסוף עצמי ב${loc(BUSINESS.city)}`, `Pickup in ${loc(BUSINESS.city)}`, `Самовывоз (${loc(BUSINESS.city)})`)}`,
      `📅 ${fmtDate(new Date(`${f.date}T12:00:00`))} | ${f.slot}`,
    ],
    t.lines.map(orderLine),
    [
      `${tr('סכום ביניים', 'Subtotal', 'Сумма')}: ${nis(t.subtotal)}`,
      t.discount && `${tr('הנחת מועדון', 'Club discount', 'Скидка клуба')} (${state.promo}): −${nis(t.discount)}`,
      f.mode === 'delivery' && `${tr('משלוח', 'Delivery', 'Доставка')}: ${t.delivery ? nis(t.delivery) : tr('חינם', 'free', 'бесплатно')}`,
      `*${tr('סה״כ', 'Total', 'Итого')}: ${nis(t.total)}*`,
      `💳 ${tr('תשלום', 'Payment', 'Оплата')}: ${f.pay}`,
    ],
    [f.notes && `📝 ${tr('הערות', 'Notes', 'Комментарий')}: ${f.notes}`, club && `⭐ ${tr('הצטרף/ה למועדון', 'Joined the club', 'Вступил(а) в клуб')}: ${club}`],
  ];
  return sections.map((s) => s.filter(Boolean).join('\n')).filter(Boolean).join('\n\n');
}

/** Show per-field errors; returns true when valid */
function validate(form, f) {
  const errors = {};
  const phoneOk = /^0\d{8,9}$/.test((f.phone || '').replace(/[\s-]/g, ''));
  const date = f.date ? new Date(`${f.date}T12:00:00`) : null;
  if (!f.name.trim()) errors['co-name'] = tr('נא למלא שם מלא', 'Please enter your full name', 'Пожалуйста, укажите имя и фамилию');
  if (!phoneOk) errors['co-phone'] = tr('מספר הטלפון לא תקין. למשל: 050-1234567', 'The phone number is not valid. For example: 050-1234567', 'Неверный номер телефона. Например: 050-1234567');
  if (f.mode === 'delivery' && !(f.address || '').trim()) errors['co-address'] = tr('נא למלא כתובת למשלוח', 'Please enter a delivery address', 'Пожалуйста, укажите адрес доставки');
  if (!date || f.date < isoDate(firstOrderDate())) {
    errors['co-date'] = tr(`אפשר להזמין החל מ${fmtDate(firstOrderDate())}. ${loc(ORDERING.rushNote)}`, `The earliest date is ${fmtDate(firstOrderDate())}. ${loc(ORDERING.rushNote)}`, `Ближайшая дата: ${fmtDate(firstOrderDate())}. ${loc(ORDERING.rushNote)}`);
  } else if (!isOpenDay(date.getDay())) {
    errors['co-date'] = tr(`ביום ${dayName(date.getDay())} אין איסוף. בחרו יום אחר`, `There is no pickup on ${dayName(date.getDay())}. Please choose another day`, `В этот день (${dayName(date.getDay())}) самовывоза нет. Выберите другой день`);
  }
  if (!errors['co-date'] && !f.slot) errors['co-slot'] = tr('נא לבחור שעה', 'Please choose a time', 'Пожалуйста, выберите время');
  return showErrors(form, errors);
}

/** Generic error display used by every form */
export function showErrors(form, errors) {
  form.querySelectorAll('[data-error-for]').forEach((p) => {
    const msg = errors[p.dataset.errorFor] || '';
    p.textContent = msg;
    const input = form.querySelector(`#${p.dataset.errorFor}`);
    if (input) { if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); }
  });
  const first = Object.keys(errors)[0];
  if (first) {
    const n = Object.keys(errors).length;
    announce(`${tr(`יש ${n} שדות לתיקון.`, `${n} ${n === 1 ? 'field needs' : 'fields need'} fixing.`, `Нужно исправить: ${n} ${ruPlural(n, 'поле', 'поля', 'полей')}.`)} ${errors[first]}`);
    form.querySelector(`#${first}`)?.focus();
    return false;
  }
  return true;
}

export function submitCheckout(form) {
  const f = Object.fromEntries(new FormData(form).entries());
  f.mode = f.mode || 'pickup';
  if (!validate(form, f)) return;
  rememberCustomer({ name: f.name, phone: f.phone, address: f.address || state.customer.address, pay: f.pay }, f.notes || '');
  const text = orderText(f);
  body().innerHTML = `${header(tr('ההזמנה מוכנה לשליחה', 'Your order is ready to send', 'Заказ готов к отправке'), 'task_alt')}
    <p class="text-body-md text-on-surface-variant mb-space-sm">${tr('זו ההודעה שתישלח אלינו. לחצו על הכפתור הירוק ושלחו את ההודעה בוואטסאפ.', 'This is the message we will receive. Tap the green button and send it on WhatsApp.', 'Вот сообщение, которое мы получим. Нажмите зелёную кнопку и отправьте его в WhatsApp.')}</p>
    <pre class="whitespace-pre-wrap font-sans text-body-md bg-surface-container-low rounded p-space-md max-h-72 overflow-y-auto text-on-surface" data-order-text tabindex="0" aria-label="${tr('תוכן ההזמנה', 'Order message', 'Текст заказа')}">${esc(text)}</pre>
    <div class="flex flex-col gap-space-sm mt-space-md">
      <a href="${waLink(text)}" target="_blank" rel="noopener" data-act="sent" class="btn-pop w-full min-h-[3.25rem] rounded-full bg-whatsapp text-on-primary text-headline-sm flex items-center justify-center gap-space-xs shadow-pop-md">${ic('send', 'flip')}${tr('שליחה בוואטסאפ', 'Send on WhatsApp', 'Отправить в WhatsApp')}<span class="sr-only">${tr(' (נפתח בחלון חדש)', ' (opens in a new tab)', ' (откроется в новой вкладке)')}</span></a>
      <div class="grid grid-cols-2 gap-space-sm">
        <button type="button" data-act="copy-order" class="min-h-[2.75rem] rounded-full bg-surface-container text-secondary text-label-md flex items-center justify-center gap-1">${ic('content_copy', '!text-[1.125rem]')}${tr('העתקת ההזמנה', 'Copy order', 'Скопировать заказ')}</button>
        <button type="button" data-act="checkout" class="min-h-[2.75rem] rounded-full bg-surface-container text-secondary text-label-md flex items-center justify-center gap-1">${ic('edit', '!text-[1.125rem]')}${tr('עריכת פרטים', 'Edit details', 'Изменить данные')}</button>
      </div>
      <div data-after-send hidden class="p-space-md rounded bg-primary-fixed text-on-primary-fixed flex flex-col gap-space-sm items-center text-center" role="status">
        <p class="text-label-lg">${tr('שלחתם? מעולה! נחזור אליכם לאישור בהקדם 🧡', 'Sent? Great! We will get back to you to confirm soon 🧡', 'Отправили? Отлично! Мы скоро свяжемся с вами для подтверждения 🧡')}</p>
        <button type="button" data-act="done" class="px-space-lg min-h-[2.75rem] rounded-full bg-primary text-on-primary text-label-md">${tr('סיום וריקון הסל', 'Done – empty the cart', 'Готово — очистить корзину')}</button>
      </div>
    </div>`;
  body().scrollTop = 0;
  $('#co-title').focus();
}

export function onCheckoutChange(e) {
  const el = e.target;
  if (el.name === 'mode' && el.closest('[data-form="checkout"]')) {
    setMode(el.value);
    renderCart();
    $('[data-address]').hidden = el.value !== 'delivery';
    $('[data-co-total]').textContent = nis(totals().total);
  }
  if (el.id === 'co-date') {
    const slots = slotsFor(el.value);
    $('#co-slot').innerHTML = slots.length ? each(slots, (s) => `<option>${s}</option>`) : `<option value="">${tr('אין איסוף ביום זה', 'No pickup on this day', 'В этот день самовывоза нет')}</option>`;
  }
}

export function copyOrder() {
  const pre = $('[data-order-text]');
  const fallback = () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast(tr('הטקסט מסומן – העתיקו ידנית', 'Text selected – copy it manually', 'Текст выделен — скопируйте его вручную'), 'content_copy'); };
  try { navigator.clipboard.writeText(pre.textContent).then(() => toast(tr('ההזמנה הועתקה', 'Order copied', 'Заказ скопирован'), 'content_copy'), fallback); } catch (err) { fallback(); }
}

export function afterSend() { setTimeout(() => { const s = $('[data-after-send]'); if (s) s.hidden = false; }, 400); }

export function finishOrder() {
  clearCart();
  rememberCustomer(state.customer, '');
  closeCheckout();
  renderCart();
  toast(tr('תודה! ההזמנה בטיפול', 'Thank you! Your order is on its way', 'Спасибо! Ваш заказ уже в работе'), 'favorite');
}
