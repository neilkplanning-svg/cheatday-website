/**
 * Where each page lives. Hebrew pages sit at the site root, the other languages in a folder named
 * after the language (/en/, /ru/), with the same file names. All links are relative so the site
 * works on any host or sub-path.
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

/** Folder of a language, relative to the site root ('' for Hebrew) */
export const langFolder = (lang) => (lang === 'he' ? '' : `${lang}/`);

/** Prefix that leads from the current page's folder back to the site root */
export const rootPrefix = () => (getLang() === 'he' ? '' : '../');

/** Static file (logo, css, js, icons) relative to the current page */
export const asset = (path) => rootPrefix() + path;

/** Link to a page in the current language, with an optional #anchor */
export const href = (id, anchor = '') => (id === 'home' ? home() : PAGE_FILES[id]) + (anchor ? `#${anchor}` : '');

/** Link to the same page in another language */
export function langHref(pageId, lang) {
  const id = pageId === 'notFound' ? 'home' : pageId; // the 404 page exists only once
  const file = id === 'home' ? (preview ? 'index.html' : '') : PAGE_FILES[id];
  return rootPrefix() + langFolder(lang) + file;
}

/** Absolute URL of a page in a language (canonical links, hreflang, sitemap, structured data) */
export const absoluteUrl = (siteUrl, id, lang = 'he') =>
  siteUrl + langFolder(lang) + (id === 'home' ? '' : PAGE_FILES[id]);
