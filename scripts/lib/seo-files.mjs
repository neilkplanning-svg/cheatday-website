/** sitemap.xml, robots.txt and manifest.webmanifest */
import { absoluteUrl, rootPrefix } from '../../src/lib/paths.js';
import { tr, loc, getLang, dir } from '../../src/lib/i18n.js';

/** One <url> per page and language, each listing all language versions (hreflang) */
export function sitemapXml(site, pages, langs, lastmod) {
  const priority = { home: '1.0', menu: '0.9', story: '0.7', contact: '0.8' };
  const urls = pages.flatMap((p) => langs.map((lang) => `  <url>
    <loc>${absoluteUrl(site.siteUrl, p.id, lang)}</loc>
${langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(site.siteUrl, p.id, l)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(site.siteUrl, p.id, 'he')}"/>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority[p.id] || '0.4'}</priority>
  </url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

/** Crawling stays open even in draft mode, so Google can read the "noindex" tag on each page */
export const robotsTxt = (site) => `User-agent: *
Allow: /

Sitemap: ${site.siteUrl}sitemap.xml
`;

/** Web app manifest for the current language (written next to that language's pages) */
export function manifest(business, site) {
  const up = rootPrefix();
  return JSON.stringify({
    name: `${business.name} – ${loc(business.kind)}`,
    short_name: business.name,
    description: loc(business.about),
    lang: getLang(),
    dir: dir(),
    start_url: './',
    scope: './',
    display: 'standalone',
    background_color: '#fdfaf3',
    theme_color: site.themeColor,
    icons: [
      { src: `${up}icons/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${up}icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${up}icons/icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: tr('תפריט והזמנות', 'Menu & orders'), url: './menu.html' },
      { name: tr('יצירת קשר', 'Contact'), url: './contact.html' },
    ],
  }, null, 2);
}
