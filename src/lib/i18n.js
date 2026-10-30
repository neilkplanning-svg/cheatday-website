/**
 * Two languages: Hebrew (default, at the site root) and English (under /en/).
 * The build renders every page once per language; the browser reads <html lang>.
 *
 *   tr('שלום', 'Hello')        → text for the current language
 *   loc({ he: 'שלום', en: 'Hello' }) → same, for bilingual values in src/data
 */
export const LANGS = ['he', 'en'];

let lang = 'he';

export const setLang = (value) => { lang = value === 'en' ? 'en' : 'he'; };
export const getLang = () => lang;
export const isEn = () => lang === 'en';
export const dir = () => (lang === 'en' ? 'ltr' : 'rtl');

/** Inline translation */
export const tr = (he, en) => (lang === 'en' ? en : he);

/** Bilingual data value → string (plain strings pass through unchanged) */
export const loc = (value) => {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('he' in value || 'en' in value)) {
    return value[lang] ?? value.he;
  }
  return value;
};

/** Array of bilingual values → array of strings */
export const locList = (list) => (list || []).map(loc);

/** Page fields may be plain values or functions of the current language */
export const val = (v) => (typeof v === 'function' ? v() : v);
