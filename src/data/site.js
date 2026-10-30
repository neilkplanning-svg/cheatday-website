/**
 * Site-wide settings: address on the web, search engines and analytics.
 * After connecting a domain, change `siteUrl` and `domain` and push – the build updates
 * canonical links, language alternates, the sitemap and the CNAME file automatically.
 */
export const SITE = {
  /** Full public address, with a trailing slash */
  siteUrl: 'https://neilkplanning-svg.github.io/cheatday-website/',
  /** Custom domain for GitHub Pages (e.g. 'cheatday.co.il'). Empty = no CNAME file */
  domain: '',
  themeColor: '#b60058',
  locales: { he: 'he_IL', en: 'en_US' },

  /**
   * Draft mode: shows a "sample content" bar, marks sample reviews and tells search engines
   * NOT to index the site yet. Set to false when the real content is in.
   */
  draft: true,

  /** Google Search Console "HTML tag" verification code (only the content="…" value) */
  googleVerification: '',
  /** Google Analytics 4 measurement id, e.g. 'G-XXXXXXXXXX'. Empty = no analytics */
  analyticsId: '',
};

/** Search engines may index the site only when it holds real content */
export const indexable = () => !SITE.draft;
