/** Where each page lives. Pages are flat files so relative links work on any host and sub-path. */
export const PAGE_FILES = {
  home: 'index.html',
  menu: 'menu.html',
  story: 'story.html',
  contact: 'contact.html',
  accessibility: 'accessibility.html',
  terms: 'terms.html',
  notFound: '404.html',
};

let homeHref = './';

/** The build sets this: './' for the website, 'index.html' for the claude.ai preview */
export const setHomeHref = (value) => { homeHref = value; };

/** Link to a page by id, e.g. href('menu') → 'menu.html', with an optional #anchor */
export const href = (id, anchor = '') => (id === 'home' ? homeHref : PAGE_FILES[id]) + (anchor ? `#${anchor}` : '');

/** Absolute URL of a page (for canonical links, sitemap, structured data) */
export const absoluteUrl = (siteUrl, id) => siteUrl + (id === 'home' ? '' : PAGE_FILES[id]);
