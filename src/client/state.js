/** Cart state, persisted in the browser, and the price calculation */
import { CLUB, DELIVERY, findItem } from '../data/index.js';
import { store, KEYS } from '../lib/storage.js';

export const state = {
  cart: store.get(KEYS.cart, []), // [{ id, qty }]
  mode: store.get(KEYS.mode, 'pickup'), // 'pickup' | 'delivery'
  promo: store.get(KEYS.promo, null),
  notes: store.get(KEYS.notes, ''),
  customer: store.get(KEYS.customer, {}),
};

export function saveCart() {
  store.set(KEYS.cart, state.cart);
  store.set(KEYS.mode, state.mode);
  store.set(KEYS.promo, state.promo);
}

/** Lines with their product, subtotal, discount, delivery and total */
export function totals() {
  const lines = state.cart.map((l) => ({ ...l, item: findItem(l.id) })).filter((l) => l.item);
  const subtotal = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0);
  const discount = CLUB.enabled && state.promo === CLUB.code ? Math.round((subtotal * CLUB.percent) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const delivery = state.mode === 'delivery' && subtotal > 0 && afterDiscount < DELIVERY.freeAbove ? DELIVERY.fee : 0;
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  return { lines, subtotal, discount, delivery, total: afterDiscount + delivery, count };
}

export function addItem(id, qty = 1) {
  const line = state.cart.find((l) => l.id === id);
  if (line) line.qty = Math.min(line.qty + qty, 99);
  else state.cart.push({ id, qty });
  saveCart();
}

export function setQty(id, qty) {
  if (qty <= 0) state.cart = state.cart.filter((l) => l.id !== id);
  else { const line = state.cart.find((l) => l.id === id); if (line) line.qty = Math.min(qty, 99); }
  saveCart();
}

export function clearCart() { state.cart = []; saveCart(); }
export function setMode(mode) { state.mode = mode; saveCart(); }
export function setPromo(code) { state.promo = code; saveCart(); }

export function rememberCustomer(customer, notes) {
  state.customer = customer;
  state.notes = notes;
  store.set(KEYS.customer, customer);
  store.set(KEYS.notes, notes);
}
