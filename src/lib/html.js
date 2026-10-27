/** Small helpers for building HTML strings safely */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text for use inside HTML content or attribute values */
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Material Symbols icon (decorative – always hidden from screen readers) */
export const ic = (name, cls = '') => `<span class="ms ${cls}" aria-hidden="true">${name}</span>`;

/** Filled variant of an icon */
export const icf = (name, cls = '') => ic(name, `fill ${cls}`);

/** Join class names, skipping falsy values */
export const cx = (...parts) => parts.filter(Boolean).join(' ');

/** Render a list with a mapper and join without separators */
export const each = (list, fn) => list.map(fn).join('');

/** The brand name, marked as English so screen readers pronounce it correctly */
export const brandName = (name) => `<span lang="en">${esc(name)}</span>`;
