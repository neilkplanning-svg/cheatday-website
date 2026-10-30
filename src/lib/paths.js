/**
 * Where each page lives. Hebrew pages sit at the site root, English pages under /en/,
 * with the same file names. All links are relative so the site works on any host or sub-path.
 */
import { getLang } from './i18n.js';

export const PAGE_FILES = {
  home: 'index.html',
  menu: 'menu.html',
  story: 'story.html',
  contact: 'contact.html',
  accessibility: 'accessibility.html',
  terms: 'terms.html',
  notFound: '404.html',
};

/** preview = claude.ai preview, where the home page must be linked as 'index.html' */
let preview = false;
export const setPreview = (value) => { preview = value; };

const home = () => (preview ? 'index.html' : './');

/** Prefix that leads from the current page's folder back to the site root */
export const rootPrefix = () => (getLang() === 'en' ? '../' : '');

/** Static file (logo, css, js, icons) relative to the current page */
export const asset = (path) => rootPrefix() + path;

/** Link to a page in the current language, with an optional #anchor */
export const href = (id, anchor = '') => (id === 'home' ? home() : PAGE_FILES[id]) + (anchor ? `#${anchor}` : '');

/** Link to the same page in the other language */
export function altHref(pageId) {
  const id = pageId === 'notFound' ? 'home' : pageId; // the 404 page exists only once
  const file = id === 'home' ? (preview ? 'index.html' : '') : PAGE_FILES[id];
  return getLang() === 'en' ? `../${file}` : `en/${file}`;
}

/** Absolute URL of a page in a language (canonical links, hreflang, sitemap, structured data) */
export const absoluteUrl = (siteUrl, id, lang = 'he') =>
  siteUrl + (lang === 'en' ? 'en/' : '') + (id === 'home' ? '' : PAGE_FILES[id]);
