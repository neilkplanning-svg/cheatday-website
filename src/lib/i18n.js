/**
 * Three languages: Hebrew (default, at the site root), English (under /en/) and Russian (under /ru/).
 * The build renders every page once per language; the browser reads <main data-lang>.
 *
 *   tr('שלום', 'Hello', 'Привет')                  → text for the current language
 *   loc({ he: 'שלום', en: 'Hello', ru: 'Привет' }) → same, for the values in src/data
 *
 * A missing Russian text falls back to English and is recorded, so the build can list it.
 */
export const LANGS = ['he', 'en', 'ru'];

/** Name of each language in itself, and its short code for tight spaces */
export const LANG_NAMES = { he: 'עברית', en: 'English', ru: 'Русский' };
export const LANG_SHORT = { he: 'עב', en: 'EN', ru: 'RU' };

let lang = 'he';

export const setLang = (value) => { lang = LANGS.includes(value) ? value : 'he'; };
export const getLang = () => lang;
export const isRtl = () => lang === 'he';
export const dir = () => (isRtl() ? 'rtl' : 'ltr');

/** Texts that had no translation in the current language (checked by the build) */
export const missing = new Set();

const pick = (he, en, ru) => {
  if (lang === 'he') return he;
  if (lang === 'ru') {
    if (ru !== undefined) return ru;
    missing.add(String(en));
  }
  return en;
};

/** Inline translation */
export const tr = (he, en, ru) => pick(he, en, ru);

/** Translated data value → string (plain strings pass through unchanged) */
export const loc = (value) => {
  if (value && typeof value === 'object' && !Array.isArray(value) && 'he' in value) {
    return pick(value.he, value.en ?? value.he, value.ru);
  }
  return value;
};

/** Array of translated values → array of strings */
export const locList = (list) => (list || []).map(loc);

/** Page fields may be plain values or functions of the current language */
export const val = (v) => (typeof v === 'function' ? v() : v);

/** Russian plural: ruPlural(n, 'товар', 'товара', 'товаров') → 1 товар, 2 товара, 5 товаров */
export function ruPlural(n, one, few, many) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b === 1) return one;
  if (b >= 2 && b <= 4) return few;
  return many;
}
