/**
 * schema.org structured data (JSON-LD) – helps Google understand the business, menu and FAQ.
 * Validate with https://search.google.com/test/rich-results after publishing.
 * Sample reviews are never marked up as reviews.
 */
import { SITE, BUSINESS, HOURS, DELIVERY, ORDERING, CATEGORIES, PRODUCTS, FAQ } from '../data/index.js';
import { absoluteUrl } from '../lib/paths.js';
import { fillCopy } from '../lib/format.js';
import { socialProfiles } from '../lib/links.js';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const url = (id) => absoluteUrl(SITE.siteUrl, id);
const asset = (path) => SITE.siteUrl + path;
const BUSINESS_ID = () => `${SITE.siteUrl}#business`;

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': BUSINESS_ID(),
    name: BUSINESS.name,
    alternateName: BUSINESS.nameHe,
    description: BUSINESS.about,
    slogan: BUSINESS.tagline,
    url: url('home'),
    logo: asset('assets/brand/logo-badge-512.png'),
    image: asset('assets/brand/og-image.png'),
    ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
    ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
    address: { '@type': 'PostalAddress', addressLocality: BUSINESS.city, addressCountry: 'IL' },
    areaServed: DELIVERY.areas.map((name) => ({ '@type': 'City', name })),
    servesCuisine: ['קינוחים', 'סינבונים', 'מאפים'],
    priceRange: '₪₪',
    currenciesAccepted: 'ILS',
    paymentAccepted: ORDERING.payments.join(', '),
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
    inLanguage: 'he-IL',
    publisher: { '@id': BUSINESS_ID() },
  };
}

export function breadcrumbSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'דף הבית', item: url('home') },
      { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: url(page.id) },
    ],
  };
}

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `התפריט של ${BUSINESS.name}`,
    url: url('menu'),
    inLanguage: 'he-IL',
    hasMenuSection: CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
      '@type': 'MenuSection',
      name: c.label,
      hasMenuItem: PRODUCTS.filter((p) => p.category === c.id).map((p) => ({
        '@type': 'MenuItem',
        name: p.name,
        description: p.desc,
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
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fillCopy(f.a) } })),
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
