/**
 * schema.org structured data (JSON-LD) – helps Google understand the business, menu and FAQ.
 * Written in the language of the page it sits on.
 * Validate with https://search.google.com/test/rich-results after publishing.
 * Sample reviews are never marked up as reviews.
 */
import { SITE, BUSINESS, HOURS, DELIVERY, ORDERING, CATEGORIES, PRODUCTS, FAQ } from '../data/index.js';
import { tr, loc, locList, val, getLang } from '../lib/i18n.js';
import { absoluteUrl } from '../lib/paths.js';
import { fillCopy } from '../lib/format.js';
import { socialProfiles } from '../lib/links.js';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const url = (id) => absoluteUrl(SITE.siteUrl, id, getLang());
const asset = (path) => SITE.siteUrl + path;
const BUSINESS_ID = () => `${SITE.siteUrl}#business`;
const inLanguage = () => tr('he-IL', 'en');

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': BUSINESS_ID(),
    name: BUSINESS.name,
    alternateName: BUSINESS.nameHe,
    description: loc(BUSINESS.about),
    slogan: loc(BUSINESS.tagline),
    url: url('home'),
    logo: asset('assets/brand/logo-badge-512.png'),
    image: asset('assets/brand/og-image.png'),
    founder: { '@type': 'Person', name: loc(BUSINESS.owner) },
    ...(BUSINESS.phone ? { telephone: `+${BUSINESS.whatsapp}` } : {}),
    ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
    address: { '@type': 'PostalAddress', addressLocality: loc(BUSINESS.city), addressCountry: 'IL' },
    areaServed: locList(DELIVERY.areas).map((name) => ({ '@type': 'City', name })),
    servesCuisine: tr(['קינוחים', 'סינבונים', 'מאפים'], ['Desserts', 'Cinnamon rolls', 'Pastries']),
    priceRange: '₪₪',
    currenciesAccepted: 'ILS',
    paymentAccepted: locList(ORDERING.payments).join(', '),
    hasMenu: url('menu'),
    openingHoursSpecification: HOURS.filter((h) => !h.closed).map((h) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => DAYS[d]), opens: h.from, closes: h.to,
    })),
    ...(socialProfiles().length ? { sameAs: socialProfiles() } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS.name,
    alternateName: BUSINESS.nameHe,
    url: url('home'),
    inLanguage: inLanguage(),
    publisher: { '@id': BUSINESS_ID() },
  };
}

export function breadcrumbSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tr('דף הבית', 'Home'), item: url('home') },
      { '@type': 'ListItem', position: 2, name: val(page.breadcrumb), item: url(page.id) },
    ],
  };
}

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: tr(`התפריט של ${BUSINESS.name}`, `${BUSINESS.name} menu`),
    url: url('menu'),
    inLanguage: inLanguage(),
    hasMenuSection: CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
      '@type': 'MenuSection',
      name: loc(c.label),
      hasMenuItem: PRODUCTS.filter((p) => p.category === c.id).map((p) => ({
        '@type': 'MenuItem',
        name: loc(p.name),
        description: loc(p.desc),
        ...(p.image ? { image: asset(p.image) } : {}),
        offers: { '@type': 'Offer', price: String(p.price), priceCurrency: 'ILS', availability: 'https://schema.org/PreOrder' },
      })),
    })).filter((s) => s.hasMenuItem.length),
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: inLanguage(),
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: loc(f.q), acceptedAnswer: { '@type': 'Answer', text: fillCopy(f.a) } })),
  };
}

/** Structured data blocks for one page */
export function schemasFor(page) {
  if (page.noindex) return [];
  if (page.id === 'home') return [businessSchema(), websiteSchema()];
  const list = [breadcrumbSchema(page)];
  if (page.id === 'menu') list.push(menuSchema());
  if (page.faq) list.push(faqSchema());
  return list;
}
