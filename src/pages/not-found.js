/** 404 page (GitHub Pages serves 404.html for unknown addresses) */
import { BUSINESS } from '../data/index.js';
import { ic } from '../lib/html.js';
import { href } from '../lib/paths.js';
import { logo } from '../components/brand.js';

export const page = {
  id: 'notFound',
  noindex: true,
  title: `העמוד לא נמצא | ${BUSINESS.name}`,
  description: 'העמוד שחיפשתם לא קיים. חזרו לדף הבית או לתפריט.',
  render: () => `
<section class="wrap gutter-x py-space-xl text-center flex flex-col items-center gap-space-md" aria-labelledby="nf-title">
  ${logo(160)}
  <h1 id="nf-title" class="text-headline-lg md:text-display text-on-surface">אופס, העמוד הזה נאכל</h1>
  <p class="text-body-lg text-on-surface-variant max-w-xl">לא מצאנו את מה שחיפשתם. אולי הוא כבר יצא מהתנור? אפשר לחזור לדף הבית או ישר לתפריט.</p>
  <div class="flex flex-col sm:flex-row gap-space-sm">
    <a href="${href('menu')}" class="btn-pop min-h-[3rem] px-space-xl bg-primary text-on-primary text-label-lg rounded-full flex items-center justify-center gap-space-xs">לתפריט ${ic('arrow_back')}</a>
    <a href="${href('home')}" class="min-h-[3rem] px-space-xl bg-surface-container text-secondary text-label-lg rounded-full flex items-center justify-center">לדף הבית</a>
  </div>
</section>`,
};
