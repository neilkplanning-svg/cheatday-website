/** sitemap.xml, robots.txt, manifest.webmanifest and CNAME */
import { absoluteUrl } from '../../src/lib/paths.js';

export function sitemapXml(site, pages, lastmod) {
  const priority = { home: '1.0', menu: '0.9', story: '0.7', contact: '0.8' };
  const urls = pages.filter((p) => !p.noindex).map((p) => `  <url>
    <loc>${absoluteUrl(site.siteUrl, p.id)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority[p.id] || '0.4'}</priority>
  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

/** Crawling stays open even in draft mode, so Google can read the "noindex" tag on each page */
export const robotsTxt = (site) => `User-agent: *
Allow: /

Sitemap: ${site.siteUrl}sitemap.xml
`;

export function manifest(business, site) {
  return JSON.stringify({
    name: `${business.name} – ${business.kind}`,
    short_name: business.name,
    description: business.about,
    lang: site.lang,
    dir: site.dir,
    start_url: './',
    scope: './',
    display: 'standalone',
    background_color: '#fdfaf3',
    theme_color: site.themeColor,
    icons: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'תפריט והזמנות', url: './menu.html' },
      { name: 'יצירת קשר', url: './contact.html' },
    ],
  }, null, 2);
}
