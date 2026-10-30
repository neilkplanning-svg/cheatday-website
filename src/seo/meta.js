/** <head> tags for every page: title, description, canonical, language alternates, social cards, icons, verification */
import { SITE, BUSINESS, indexable } from '../data/index.js';
import { esc } from '../lib/html.js';
import { tr, val, getLang, LANGS } from '../lib/i18n.js';
import { absoluteUrl, asset } from '../lib/paths.js';
import { schemasFor } from './schema.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap';

/** Material Symbols, limited to the icons the site uses (keeps the font file small) */
export const iconFontUrl = (names) =>
  `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&icon_names=${[...names].sort().join(',')}&display=block`;

/** Font and stylesheet links (shared by the website and the preview) */
export const styleLinks = ({ iconNames, version }) => `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${esc(iconFontUrl(iconNames))}">
<link rel="stylesheet" href="${asset('assets/css/app.css')}?v=${version}">`;

/** hreflang links: every language version of the page, plus x-default (Hebrew) */
const alternates = (page) => [
  ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${esc(absoluteUrl(SITE.siteUrl, page.id, l))}">`),
  `<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(SITE.siteUrl, page.id, 'he'))}">`,
].join('\n');

/** SEO and social meta tags */
export function metaTags(page) {
  const lang = getLang();
  const url = absoluteUrl(SITE.siteUrl, page.id, lang);
  const title = val(page.title);
  const description = val(page.description);
  const image = `${SITE.siteUrl}assets/brand/og-image.png`;
  const robots = page.noindex || !indexable() ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const otherLocale = LANGS.filter((l) => l !== lang).map((l) => SITE.locales[l]);
  return `
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
${page.noindex ? '' : `<link rel="canonical" href="${esc(url)}">\n${alternates(page)}`}
${SITE.googleVerification ? `<meta name="google-site-verification" content="${esc(SITE.googleVerification)}">` : ''}
<meta name="theme-color" content="${SITE.themeColor}">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:locale" content="${SITE.locales[lang]}">
${otherLocale.map((l) => `<meta property="og:locale:alternate" content="${l}">`).join('\n')}
<meta property="og:site_name" content="${esc(BUSINESS.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(tr(`הלוגו של ${BUSINESS.name} – סינבון עם גלייז ורוד`, `The ${BUSINESS.name} logo – a cinnamon roll with pink glaze`, `Логотип ${BUSINESS.name} — синнабон с розовой глазурью`))}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${asset('icons/favicon.ico')}" sizes="48x48">
<link rel="icon" href="${asset('icons/favicon-32.png')}" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${asset('icons/apple-touch-icon.png')}">
<link rel="manifest" href="manifest.webmanifest">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="${esc(BUSINESS.name)}">
${schemasFor(page).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}`;
}

/** Google Analytics 4 – only when an id is set in src/data/site.js */
export const analyticsTag = () => (SITE.analyticsId ? `
<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(SITE.analyticsId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(SITE.analyticsId)}',{anonymize_ip:true});</script>` : '');
