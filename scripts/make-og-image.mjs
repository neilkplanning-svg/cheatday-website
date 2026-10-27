/**
 * Social share image (1200×630) shown when the site link is shared on WhatsApp / Facebook.
 * Needs Playwright with Chromium installed locally: `npx playwright install chromium`.
 * Output: public/assets/brand/og-image.png (committed).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { BUSINESS } from '../src/data/index.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const logo = fs.readFileSync(path.join(root, 'public/assets/brand/logo-badge-512.png')).toString('base64');
const html = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;800&display=block">
<style>
  body{margin:0;width:1200px;height:630px;font-family:Rubik,Arial,sans-serif;background:#fff8f5;display:flex;align-items:center;gap:56px;padding:0 80px;box-sizing:border-box;overflow:hidden;position:relative}
  .blob{position:absolute;border-radius:50%;filter:blur(40px)}
  img{width:430px;height:430px;border-radius:50%;box-shadow:0 10px 0 #2d1606;position:relative}
  h1{margin:0;font-size:84px;line-height:1;color:#f4327b;-webkit-text-stroke:3px #2d1606;paint-order:stroke fill;font-weight:800}
  p{margin:18px 0 0;font-size:40px;color:#2d1606;font-weight:500;line-height:1.25}
  .pill{display:inline-block;margin-top:28px;background:#b60058;color:#fff;font-size:30px;padding:12px 28px;border-radius:999px;box-shadow:0 5px 0 #2d1606;font-weight:500}
</style></head><body>
<div class="blob" style="width:520px;height:520px;background:#ffd9e0;top:-160px;left:-120px"></div>
<div class="blob" style="width:420px;height:420px;background:#ffdbc9;bottom:-180px;right:300px"></div>
<div style="position:relative;flex:1"><h1 lang="en">${BUSINESS.name}</h1><p>${BUSINESS.kind}<br>נאפים לפי הזמנה ב${BUSINESS.city}</p><span class="pill">${BUSINESS.tagline} 🧁</span></div>
<img src="data:image/png;base64,${logo}" alt="">
</body></html>`;

const browser = await chromium.launch(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'public/assets/brand/og-image.png') });
await browser.close();
console.log('✓ public/assets/brand/og-image.png');
