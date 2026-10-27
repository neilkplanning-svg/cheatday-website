/**
 * Page layout: wraps a page's content with the header, footer, overlays and scripts.
 * Used at build time (scripts/build.mjs) to write static HTML files.
 */
import { SITE, BUSINESS } from './data/index.js';
import { esc } from './lib/html.js';
import { header } from './components/header.js';
import { footer, bottomNav } from './components/footer.js';
import { overlays, skipLink, draftBar } from './components/overlays.js';
import { metaTags, styleLinks, analyticsTag } from './seo/meta.js';

/** Everything inside <body> */
export function pageBody(page, { version }) {
  return `${skipLink()}
${header(page.id)}
<main id="main" tabindex="-1" class="pt-16 lg:pt-20 min-h-[70vh] outline-none" data-page="${page.id}">
${SITE.draft ? draftBar() : ''}
${page.render()}
</main>
${footer()}
${bottomNav(page.id)}
${overlays(page.id)}
<noscript><p class="fixed bottom-0 inset-x-0 z-[100] bg-inverse-surface text-inverse-on-surface p-space-md text-center">כדי להזמין באתר צריך JavaScript. אפשר להזמין גם בוואטסאפ או בטלפון.</p></noscript>
<script src="assets/js/app.js?v=${version}" defer></script>`;
}

/** A complete HTML document (the real website) */
export function documentHtml(page, opts) {
  return `<!doctype html>
<html lang="${SITE.lang}" dir="${SITE.dir}">
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
 */
export function previewContent(page, opts) {
  return `<title>${esc(BUSINESS.name)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
${styleLinks(opts)}
${pageBody(page, opts)}
`;
}
