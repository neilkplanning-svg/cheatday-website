/** localStorage that never throws (private windows, blocked storage) */
export const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  },
};

/** Keys used across the site, in one place */
export const KEYS = {
  cart: 'cd_cart',
  mode: 'cd_mode',
  promo: 'cd_promo',
  notes: 'cd_notes',
  customer: 'cd_customer',
  club: 'cd_club',
  a11y: 'cd_a11y_v2',
  draftHidden: 'cd_draft_hidden',
};
