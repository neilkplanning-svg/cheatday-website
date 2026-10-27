/** The CheatDay logo (round badge from brand-source/logo-original.jpg) */
import { BUSINESS } from '../data/index.js';
import { esc } from '../lib/html.js';

/**
 * @param {number} size  displayed size in px
 * @param {string} alt   '' when the logo sits next to the business name (decorative)
 */
export function logo(size = 48, alt = '', cls = '') {
  const src = size <= 64 ? 96 : size <= 128 ? 192 : 512;
  return `<picture class="shrink-0 ${cls}">
    <source srcset="assets/brand/logo-badge-${src}.webp" type="image/webp">
    <img src="assets/brand/logo-badge-${src}.png" width="${size}" height="${size}" alt="${esc(alt)}" class="block rounded-full" decoding="async">
  </picture>`;
}

/** Logo + name, used in the header and drawer */
export const logoWithName = (size = 48) => `
  <span class="flex items-center gap-space-sm">
    ${logo(size)}
    <span class="wordmark text-headline-sm lg:text-headline-md font-extrabold tracking-tight" lang="en">${esc(BUSINESS.name)}</span>
  </span>`;
