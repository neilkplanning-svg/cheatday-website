/**
 * Page layout: wraps a page's content with the header, footer, overlays and scripts.
 * Used at build time (scripts/build.mjs) to write static HTML files, once per language
 * (the build calls setLang() before rendering).
 */
import { SITE, BUSINESS } from './data/index.js';
import { esc } from './lib/html.js';
import { tr, getLang, dir } from './lib/i18n.js';
import { asset } from './lib/paths.js';
import { header } from './components/header.js';
import { footer, bottomNav } from './components/footer.js';
import { overlays, skipLink, draftBar } from './components/overlays.js';
import { metaTags, styleLinks, analyticsTag } from './seo/meta.js';

/** Everything inside <body> */
export function pageBody(page, { version }) {
  return `${skipLink()}
${header(page.id)}
<main id="main" tabindex="-1" class="pt-16 lg:pt-20 min-h-[70vh] outline-none" data-page="${page.id}" data-lang="${getLang()}">
${SITE.draft ? draftBar() : ''}
${page.render()}
</main>
${footer(page.id)}
${bottomNav(page.id)}
${overlays(page.id)}
<noscript><p class="fixed bottom-0 inset-x-0 z-[100] bg-inverse-surface text-inverse-on-surface p-space-md text-center">${tr('כדי להזמין באתר צריך JavaScript. אפשר להזמין גם בוואטסאפ או בטלפון', 'Ordering on the site needs JavaScript. You can also order on WhatsApp or by phone', 'Для заказа на сайте нужен JavaScript. Заказать можно также в WhatsApp или по телефону')} <span dir="ltr">${esc(BUSINESS.phone)}</span>.</p></noscript>
<script src="${asset('assets/js/app.js')}?v=${version}" defer></script>`;
}

/** A complete HTML document (the real website) */
export function documentHtml(page, opts) {
  return `<!doctype html>
<html lang="${getLang()}" dir="${dir()}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${opts.base ? `<base href="${opts.base}">` : ''}
${metaTags(page)}
${styleLinks(opts)}
${analyticsTag()}
</head>
<body>
${pageBody(page, opts)}
</body>
</html>
`;
}

/**
 * claude.ai preview: the platform adds <html>/<head> to the main page itself,
 * so that one file carries only its title (the business name, kept stable), links and body content.
 * The client sets lang/dir on <html> from data-lang when the platform's wrapper doesn't.
 */
export function previewContent(page, opts) {
  return `<title>${esc(BUSINESS.name)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
${styleLinks(opts)}
${pageBody(page, opts)}
`;
}
