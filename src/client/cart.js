/** Cart UI: panels, badges, mobile bar, add-to-cart feedback and the menu filter */
import { findItem, PRODUCTS, CATEGORIES } from '../data/index.js';
import { nis } from '../lib/format.js';
import { tr, loc, ruPlural } from '../lib/i18n.js';
import { cartPanel } from '../components/cart-panel.js';
import { filterPills } from '../components/ui.js';
import { state, totals, addItem, setQty, clearCart, setMode, setPromo } from './state.js';
import { $, $$, toast } from './dom.js';
import { openLayer, closeLayers } from './layers.js';

export function renderCart() {
  const t = totals();
  $$('[data-cart-panel]').forEach((el) => {
    // keep keyboard focus on the same control after re-rendering the panel
    const active = document.activeElement;
    const had = active && el.contains(active) ? { act: active.dataset.act, id: active.dataset.id || '', mode: active.dataset.mode || '' } : null;
    el.innerHTML = cartPanel(state, t, el.dataset.cartPanel);
    if (!had) return;
    const match = $$('[data-act]', el).find((b) => b.dataset.act === had.act && (b.dataset.id || '') === had.id && (b.dataset.mode || '') === had.mode);
    const target = match || el.querySelector('h2');
    if (target === el.querySelector('h2')) target.tabIndex = -1;
    target.focus();
  });
  $$('[data-cart-count]').forEach((el) => { el.textContent = t.count; el.hidden = !t.count; });
  $$('[data-cart-total]').forEach((el) => { el.textContent = nis(t.total); });
  $$('.site-header [data-act="cart"]').forEach((b) => b.setAttribute('aria-label', t.count ? tr(`סל קניות, ${t.count} פריטים, ${nis(t.total)}`, `Cart, ${t.count} ${t.count === 1 ? 'item' : 'items'}, ${nis(t.total)}`, `Корзина: ${t.count} ${ruPlural(t.count, 'товар', 'товара', 'товаров')}, ${nis(t.total)}`) : tr('סל קניות ריק', 'Cart is empty', 'Корзина пуста')));
  const bar = $('[data-cart-bar]');
  if (bar) bar.hidden = !t.count;
}

/** Product card "add" button: uses the card's stepper quantity unless data-fixed */
export function onAdd(el) {
  const id = el.dataset.id;
  const card = el.closest('article');
  const qtyEl = !el.dataset.fixed && card ? card.querySelector(`[data-qty="${id}"]`) : null;
  const qty = qtyEl ? Number(qtyEl.textContent) : 1;
  addItem(id, qty);
  if (qtyEl) qtyEl.textContent = '1';
  renderCart();
  const name = loc(findItem(id).name);
  toast(tr(`${qty > 1 ? `${qty} × ` : ''}${name} נוסף לסל`, `${qty > 1 ? `${qty} × ` : ''}${name} added to cart`, `Добавлено в корзину: ${qty > 1 ? `${qty} × ` : ''}${name}`));
  $$('[data-cart-count]').forEach((b) => { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });
  if (!el.dataset.fixed) {
    const label = el.querySelector('span:last-child');
    const original = label ? label.textContent : '';
    if (label) label.textContent = tr('נוסף לסל', 'Added', 'Добавлено');
    el.classList.replace('bg-primary', 'bg-secondary');
    setTimeout(() => { if (label) label.textContent = original; el.classList.replace('bg-secondary', 'bg-primary'); }, 1400);
  }
}

export function onStep(el) {
  const out = el.closest('[role="group"]').querySelector('[data-qty]');
  out.textContent = Math.max(1, Math.min(20, Number(out.textContent) + Number(el.dataset.d)));
}

export function onQty(el) {
  const line = state.cart.find((l) => l.id === el.dataset.id);
  if (!line) return;
  const next = line.qty + Number(el.dataset.d);
  setQty(el.dataset.id, next);
  renderCart();
  if (next <= 0) toast(tr(`${loc(findItem(el.dataset.id).name)} הוסר מהסל`, `${loc(findItem(el.dataset.id).name)} removed from cart`, `Удалено из корзины: ${loc(findItem(el.dataset.id).name)}`), 'delete');
}

export function onClear() { clearCart(); renderCart(); toast(tr('הסל רוקן', 'Cart emptied', 'Корзина очищена'), 'delete_sweep'); }
export function onMode(el) { setMode(el.dataset.mode); renderCart(); }
export function onUnpromo() { setPromo(null); renderCart(); toast(tr('קוד ההנחה הוסר', 'Discount code removed', 'Промокод удалён'), 'sell'); }

export function onCartButton() {
  const drawer = $('[data-layer="cart"]');
  if (!drawer.hidden) { closeLayers(); return; }
  renderCart();
  openLayer(drawer);
}

/* ---------- menu filter ---------- */
export function onFilter(el) {
  const cat = el.dataset.cat;
  const wrap = el.closest('[data-filters]');
  wrap.outerHTML = filterPills(CATEGORIES, cat);
  let shown = 0;
  $$('.product-card[data-cat]').forEach((card) => {
    const visible = cat === 'all' || card.dataset.cat === cat;
    card.hidden = !visible;
    if (visible) shown++;
  });
  const count = $('[data-filter-count]');
  const label = loc(CATEGORIES.find((c) => c.id === cat).label);
  if (count) {
    count.textContent = cat === 'all'
      ? tr(`${PRODUCTS.length} מוצרים ומארזים`, `${PRODUCTS.length} products and boxes`, `Товаров и наборов: ${PRODUCTS.length}`)
      : tr(`${shown} מוצרים: ${label}`, `${shown} products: ${label}`, `${label}: ${shown}`);
  }
  toast(cat === 'all' ? tr(`מוצגים ${shown} מוצרים`, `Showing ${shown} products`, `Показано товаров: ${shown}`) : tr(`מוצגים ${shown} מוצרים בקטגוריה ${label}`, `Showing ${shown} products in ${label}`, `Категория «${label}», товаров: ${shown}`), 'filter_list');
  $(`[data-filters] [data-cat="${cat}"]`)?.focus();
}

