/** Checkout dialog: customer details → WhatsApp message ready to send */
import { BUSINESS, DELIVERY, ORDERING } from '../data/index.js';
import { esc, ic, each } from '../lib/html.js';
import { nis, fmtDate, isoDate, DAY_NAMES } from '../lib/format.js';
import { firstOrderDate, isOpenDay, slotsFor } from '../lib/schedule.js';
import { waLink } from '../lib/links.js';
import { store, KEYS } from '../lib/storage.js';
import { state, totals, setMode, clearCart, rememberCustomer } from './state.js';
import { $, toast, announce } from './dom.js';
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
    <button type="button" data-act="close-checkout" class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center" aria-label="סגירת חלון ההזמנה">${ic('close')}</button>
  </div>`;

function formHtml() {
  const c = state.customer;
  const minDate = isoDate(firstOrderDate());
  return `${header('פרטי ההזמנה', 'receipt_long')}
  <form data-form="checkout" class="flex flex-col gap-space-md" novalidate>
    <p class="text-body-sm text-on-surface-variant">כל השדות חובה, חוץ מהערות.</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      ${field('co-name', 'שם מלא', `<input class="field" id="co-name" name="name" required aria-required="true" autocomplete="name" value="${esc(c.name || '')}" aria-describedby="co-name-err">`)}
      ${field('co-phone', 'טלפון נייד', `<input class="field text-right" dir="ltr" id="co-phone" name="phone" type="tel" inputmode="tel" required aria-required="true" autocomplete="tel" value="${esc(c.phone || '')}" placeholder="050-0000000" aria-describedby="co-phone-err">`)}
    </div>
    ${DELIVERY.enabled ? `<fieldset class="flex flex-col gap-space-xs"><legend class="label mb-space-xs">קבלת ההזמנה</legend>
      <div class="grid grid-cols-2 gap-space-xs p-space-xs bg-surface-container-low rounded-full">
        ${each([['pickup', 'storefront', `איסוף עצמי ב${BUSINESS.city}`], ['delivery', 'moped', 'משלוח עד הבית']], ([v, i, l]) => `<label class="cursor-pointer"><input type="radio" name="mode" value="${v}" class="peer sr-only" ${state.mode === v ? 'checked' : ''}>
          <span class="flex items-center justify-center gap-space-xs min-h-[2.75rem] px-space-sm rounded-full text-label-sm peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary">${ic(i, '!text-[1rem]')}${l}</span></label>`)}
      </div></fieldset>` : ''}
    <div data-address ${state.mode === 'delivery' ? '' : 'hidden'}>
      ${field('co-address', 'כתובת למשלוח', `<input class="field" id="co-address" name="address" autocomplete="street-address" value="${esc(c.address || '')}" placeholder="רחוב, מספר, דירה, עיר" aria-describedby="co-address-hint co-address-err">`, `משלוחים ל${esc(DELIVERY.areas.join(', '))}`)}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      ${field('co-date', 'תאריך', `<input class="field" id="co-date" name="date" type="date" min="${minDate}" value="${minDate}" required aria-required="true" aria-describedby="co-date-err">`)}
      ${field('co-slot', 'שעה', `<select class="field" id="co-slot" name="slot" required aria-required="true" aria-describedby="co-slot-err">${each(slotsFor(minDate), (s) => `<option>${s}</option>`)}</select>`)}
    </div>
    ${field('co-pay', 'איך נוח לכם לשלם?', `<select class="field" id="co-pay" name="pay">${each(ORDERING.payments, (p) => `<option ${c.pay === p ? 'selected' : ''}>${esc(p)}</option>`)}</select>`)}
    <div class="flex flex-col gap-space-xs"><label class="label" for="co-notes">הערות (רשות)</label>
      <textarea class="field resize-y" id="co-notes" name="notes" rows="2" placeholder="ברכה למארז, גלייז בצד, אלרגיות...">${esc(state.notes)}</textarea></div>
    <p class="p-space-sm rounded bg-surface-container-low flex items-center justify-between text-headline-sm"><span>סה״כ לתשלום</span><span class="text-primary tabular-nums" data-co-total>${nis(totals().total)}</span></p>
    <button type="submit" class="btn-pop w-full min-h-[3.25rem] rounded-full bg-primary text-on-primary text-headline-sm flex items-center justify-center gap-space-xs shadow-pop-md">סיכום ושליחה ${ic('arrow_back')}</button>
    <p class="text-label-sm text-on-surface-variant text-center">ההזמנה נשלחת אלינו בוואטסאפ ונאשר אותה בהקדם. התשלום רק אחרי האישור.</p>
  </form>`;
}

export function openCheckout() {
  if (!totals().count) { toast('הסל עדיין ריק – בחרו משהו מתוק', 'cookie'); return; }
  returnFocus = document.activeElement && document.activeElement.closest('[data-layer]') ? $('.site-header [data-act="cart"]') : document.activeElement;
  closeLayers(false);
  body().innerHTML = formHtml();
  dialog().hidden = false;
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

/** WhatsApp message text */
export function orderText(f) {
  const t = totals();
  const club = store.get(KEYS.club, null);
  const sections = [
    [`היי ${BUSINESS.name}! 🧁 הזמנה חדשה מהאתר`],
    [
      `👤 שם: ${f.name}`,
      `📞 טלפון: ${f.phone}`,
      f.mode === 'delivery' ? `🛵 משלוח לכתובת: ${f.address}` : `🏠 איסוף עצמי ב${BUSINESS.city}`,
      `📅 ${fmtDate(new Date(`${f.date}T12:00:00`))} | ${f.slot}`,
    ],
    t.lines.map((l) => `• ${l.qty} × ${l.item.name} – ${nis(l.item.price * l.qty)}`),
    [
      `סכום ביניים: ${nis(t.subtotal)}`,
      t.discount && `הנחת מועדון (${state.promo}): −${nis(t.discount)}`,
      f.mode === 'delivery' && `משלוח: ${t.delivery ? nis(t.delivery) : 'חינם'}`,
      `*סה״כ: ${nis(t.total)}*`,
      `💳 תשלום: ${f.pay}`,
    ],
    [f.notes && `📝 הערות: ${f.notes}`, club && `⭐ הצטרף/ה למועדון: ${club}`],
  ];
  return sections.map((s) => s.filter(Boolean).join('\n')).filter(Boolean).join('\n\n');
}

/** Show per-field errors; returns true when valid */
function validate(form, f) {
  const errors = {};
  const phoneOk = /^0\d{8,9}$/.test((f.phone || '').replace(/[\s-]/g, ''));
  const date = f.date ? new Date(`${f.date}T12:00:00`) : null;
  if (!f.name.trim()) errors['co-name'] = 'נא למלא שם מלא';
  if (!phoneOk) errors['co-phone'] = 'מספר הטלפון לא תקין. למשל: 050-1234567';
  if (f.mode === 'delivery' && !(f.address || '').trim()) errors['co-address'] = 'נא למלא כתובת למשלוח';
  if (!date || f.date < isoDate(firstOrderDate())) errors['co-date'] = `אפשר להזמין החל מ${fmtDate(firstOrderDate())}`;
  else if (!isOpenDay(date.getDay())) errors['co-date'] = `ביום ${DAY_NAMES[date.getDay()]} אין איסוף. בחרו יום אחר`;
  if (!errors['co-date'] && !f.slot) errors['co-slot'] = 'נא לבחור שעה';
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
    announce(`יש ${Object.keys(errors).length} שדות לתיקון. ${errors[first]}`);
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
  body().innerHTML = `${header('ההזמנה מוכנה לשליחה', 'task_alt')}
    <p class="text-body-md text-on-surface-variant mb-space-sm">זו ההודעה שתישלח אלינו. לחצו על הכפתור הירוק ושלחו את ההודעה בוואטסאפ.</p>
    <pre class="whitespace-pre-wrap font-sans text-body-md bg-surface-container-low rounded p-space-md max-h-72 overflow-y-auto text-on-surface" data-order-text tabindex="0" aria-label="תוכן ההזמנה">${esc(text)}</pre>
    <div class="flex flex-col gap-space-sm mt-space-md">
      <a href="${waLink(text)}" target="_blank" rel="noopener" data-act="sent" class="btn-pop w-full min-h-[3.25rem] rounded-full bg-whatsapp text-on-primary text-headline-sm flex items-center justify-center gap-space-xs shadow-pop-md">${ic('send', 'flip')}שליחה בוואטסאפ<span class="sr-only"> (נפתח בחלון חדש)</span></a>
      <div class="grid grid-cols-2 gap-space-sm">
        <button type="button" data-act="copy-order" class="min-h-[2.75rem] rounded-full bg-surface-container text-secondary text-label-md flex items-center justify-center gap-1">${ic('content_copy', '!text-[1.125rem]')}העתקת ההזמנה</button>
        <button type="button" data-act="checkout" class="min-h-[2.75rem] rounded-full bg-surface-container text-secondary text-label-md flex items-center justify-center gap-1">${ic('edit', '!text-[1.125rem]')}עריכת פרטים</button>
      </div>
      <div data-after-send hidden class="p-space-md rounded bg-primary-fixed text-on-primary-fixed flex flex-col gap-space-sm items-center text-center" role="status">
        <p class="text-label-lg">שלחתם? מעולה! נחזור אליכם לאישור בהקדם 🧡</p>
        <button type="button" data-act="done" class="px-space-lg min-h-[2.75rem] rounded-full bg-primary text-on-primary text-label-md">סיום וריקון הסל</button>
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
    $('#co-slot').innerHTML = slots.length ? each(slots, (s) => `<option>${s}</option>`) : '<option value="">אין איסוף ביום זה</option>';
  }
}

export function copyOrder() {
  const pre = $('[data-order-text]');
  const fallback = () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('הטקסט מסומן – העתיקו ידנית', 'content_copy'); };
  try { navigator.clipboard.writeText(pre.textContent).then(() => toast('ההזמנה הועתקה', 'content_copy'), fallback); } catch (err) { fallback(); }
}

export function afterSend() { setTimeout(() => { const s = $('[data-after-send]'); if (s) s.hidden = false; }, 400); }

export function finishOrder() {
  clearCart();
  rememberCustomer(state.customer, '');
  closeCheckout();
  renderCart();
  toast('תודה! ההזמנה בטיפול', 'favorite');
}
