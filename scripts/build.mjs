/**
 * CheatDay build – `npm run build`
 *
 *   dist/          the website: one static HTML file per page and language, ready for GitHub Pages or any host
 *                  (Hebrew at the root, English under dist/en/ with the same file names)
 *   dist-preview/  (with --preview) the same pages for the claude.ai preview
 *
 * Steps: CSS (Tailwind) → JS bundle (esbuild) → pre-render pages → SEO files → PWA files → static assets
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

import { SITE, BUSINESS } from '../src/data/index.js';
import { PAGES } from '../src/pages/index.js';
import { PAGE_FILES, setPreview } from '../src/lib/paths.js';
import { LANGS, setLang } from '../src/lib/i18n.js';
import { documentHtml, previewContent } from '../src/layout.js';
import { sitemapXml, robotsTxt, manifest } from './lib/seo-files.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const at = (...p) => path.join(root, ...p);
const write = (file, content) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); };
const copyDir = (from, to) => fs.cpSync(from, to, { recursive: true });
const withPreview = process.argv.includes('--preview');

const version = new Date().toISOString().replace(/\D/g, '').slice(0, 12);
const today = new Date().toISOString().slice(0, 10);

/* 1. clean */
fs.rmSync(at('dist'), { recursive: true, force: true });
fs.rmSync(at('dist-preview'), { recursive: true, force: true });

/* 2. CSS */
execSync('npx tailwindcss -c tailwind.config.cjs -i src/styles/main.css -o dist/assets/css/app.css --minify', { cwd: root, stdio: 'inherit' });

/* 3. JS bundle */
await esbuild.build({
  entryPoints: [at('src/client/main.js')],
  outfile: at('dist/assets/js/app.js'),
  bundle: true, minify: true, format: 'iife', target: ['es2019'], legalComments: 'none', logLevel: 'warning',
});

/* 4. Icons used anywhere in the code → subset of the Material Symbols font */
function iconNames() {
  const names = new Set();
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) walk(p);
    else if (p.endsWith('.js')) {
      const code = fs.readFileSync(p, 'utf8');
      for (const m of code.matchAll(/['"`]([a-z][a-z0-9_]{1,40})['"`]/g)) names.add(m[1]);
    }
  });
  walk(at('src'));
  return names;
}
const opts = { iconNames: iconNames(), version };

/* 5. Pages, once per language */
const basePath = new URL(SITE.siteUrl).pathname; // "/cheatday-website/" or "/" with a custom domain
const langsOf = (page) => page.langs || LANGS;
const folder = (lang) => (lang === 'he' ? '' : lang);
let pageCount = 0;
for (const lang of LANGS) {
  setLang(lang);
  for (const page of PAGES.filter((p) => langsOf(p).includes(lang))) {
    write(at('dist', folder(lang), PAGE_FILES[page.id]), documentHtml(page, { ...opts, base: page.id === 'notFound' ? basePath : '' }));
    pageCount++;
  }
}
setLang('he');

/* 6. SEO + hosting files */
write(at('dist/sitemap.xml'), sitemapXml(SITE, PAGES.filter((p) => !p.noindex), LANGS, today));
write(at('dist/robots.txt'), robotsTxt(SITE));
write(at('dist/.nojekyll'), '');
if (SITE.domain) write(at('dist/CNAME'), `${SITE.domain}\n`);

/* 7. PWA */
for (const lang of LANGS) { setLang(lang); write(at('dist', folder(lang), 'manifest.webmanifest'), manifest(BUSINESS, SITE)); }
setLang('he');
write(at('dist/sw.js'), fs.readFileSync(at('src/sw.js'), 'utf8').replace('__BUILD__', version));

/* 8. Static files (logo, icons, images) */
copyDir(at('public'), at('dist'));

/* 9. Optional claude.ai preview (Hebrew home page without <html>/<head>, every other page complete) */
if (withPreview) {
  setPreview(true);
  for (const lang of LANGS) {
    setLang(lang);
    for (const page of PAGES.filter((p) => p.id !== 'notFound')) {
      const main = lang === 'he' && page.id === 'home';
      const file = main ? '_index.html' : PAGE_FILES[page.id];
      write(at('dist-preview', folder(lang), file), main ? previewContent(page, opts) : documentHtml(page, opts));
    }
  }
  setLang('he');
  setPreview(false);
  copyDir(at('dist/assets'), at('dist-preview/assets'));
  copyDir(at('dist/icons'), at('dist-preview/icons'));
}

console.log(`✓ built ${pageCount} pages (${LANGS.join(' + ')}) into dist/${withPreview ? ' (+ dist-preview/)' : ''} · ${opts.iconNames.size} icon names · ${SITE.draft ? 'DRAFT (noindex)' : 'indexable'}`);
