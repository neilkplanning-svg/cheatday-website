/**
 * Accessibility audit: runs axe-core (WCAG 2.0/2.1/2.2 A + AA rules) on every page,
 * on phone and desktop sizes, in normal, high-contrast and dark-contrast modes.
 * Also checks for horizontal scrolling at 320px (WCAG 1.4.10 reflow).
 *
 *   npm run build && npm run audit:a11y
 * Needs Playwright with Chromium installed locally (`npx playwright install chromium`).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { serve } from './lib/static-server.mjs';
import { SITE } from '../src/data/index.js';
import { PAGES } from '../src/pages/index.js';
import { PAGE_FILES } from '../src/lib/paths.js';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const prefix = new URL(SITE.siteUrl).pathname;
const port = 5199;
const server = await serve(path.join(root, 'dist'), port, prefix);
const base = `http://localhost:${port}${prefix}`;

const VIEWPORTS = [['phone', 390, 844], ['reflow-320', 320, 700], ['desktop', 1366, 900]];
const MODES = [['normal', null], ['contrast', 'a11y-contrast'], ['dark', 'a11y-dark']];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const browser = await chromium.launch(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY, bypass: 'localhost' } } : {});
const problems = [];
let runs = 0;
for (const [vpName, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => problems.push(`[${vpName}] JS error: ${e.message}`));
  for (const p of PAGES) {
    await page.goto(base + (p.id === 'home' ? '' : PAGE_FILES[p.id]), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) problems.push(`[${vpName}] ${p.id}: horizontal scroll of ${overflow}px`);
    for (const [modeName, cls] of (vpName === 'desktop' ? MODES : [MODES[0]])) {
      await page.evaluate((c) => { document.documentElement.className = c || ''; }, cls);
      await page.waitForTimeout(400); // let colour transitions finish before measuring contrast
      await page.addScriptTag({ content: axeSource });
      const result = await page.evaluate((tags) => window.axe.run(document, { runOnly: { type: 'tag', values: tags }, resultTypes: ['violations'] }), TAGS);
      runs++;
      for (const v of result.violations) {
        const where = v.nodes.slice(0, 4).map((n) => `${n.target.join(' ')} → ${(n.any[0] || n.all[0] || {}).message || ''}`);
        problems.push(`[${vpName}/${modeName}] ${p.id}: ${v.id} (${v.impact}) – ${v.help} – ${v.nodes.length}×\n     ${where.join('\n     ')}`);
      }
    }
  }
  await ctx.close();
}
await browser.close();
server.close();
console.log(`axe runs: ${runs}`);
console.log(problems.length ? problems.join('\n') : '✓ no WCAG A/AA violations found');
process.exitCode = problems.length ? 1 : 0;
