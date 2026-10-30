/**
 * 404 page (GitHub Pages serves 404.html for unknown addresses at any depth, so the build gives it a <base>).
 * Built once, in Hebrew, with short English and Russian parts.
 */
import { BUSINESS } from '../data/index.js';
import { ic } from '../lib/html.js';
import { logo } from '../components/brand.js';
import { href } from '../lib/paths.js';

export const page = {
  id: 'notFound',
  noindex: true,
  langs: ['he'],
  title: () => `העמוד לא נמצא | Page not found | Страница не найдена | ${BUSINESS.name}`,
  description: () => 'העמוד שחיפשתם לא קיים. חזרו לדף הבית או לתפריט.',
  render: () => `
<section class="wrap gutter-x py-space-xl text-center flex flex-col items-center gap-space-md" aria-labelledby="nf-title">
  ${logo(160)}
  <h1 id="nf-title" class="text-headline-lg md:text-display text-on-surface">אופס, העמוד הזה נאכל</h1>
  <p class="text-body-lg text-on-surface-variant max-w-xl">לא מצאנו את מה שחיפשתם. אולי הוא כבר יצא מהתנור? אפשר לחזור לדף הבית או ישר לתפריט.</p>
  <div class="flex flex-col sm:flex-row gap-space-sm">
    <a href="${href('menu')}" class="btn-pop min-h-[3rem] px-space-xl bg-primary text-on-primary text-label-lg rounded-full flex items-center justify-center gap-space-xs">לתפריט ${ic('arrow_back', 'fwd')}</a>
    <a href="${href('home')}" class="min-h-[3rem] px-space-xl bg-surface-container text-secondary text-label-lg rounded-full flex items-center justify-center">לדף הבית</a>
  </div>
  <div lang="en" dir="ltr" class="mt-space-md pt-space-md border-t border-surface-container flex flex-col items-center gap-space-sm">
    <h2 class="text-headline-sm text-on-surface">Oops, this page has been eaten</h2>
    <a href="en/" class="text-label-lg text-primary underline min-h-[2.75rem] inline-flex items-center">Go to the English home page</a>
  </div>
  <div lang="ru" dir="ltr" class="flex flex-col items-center gap-space-sm">
    <h2 class="text-headline-sm text-on-surface">Ой, эту страницу уже съели</h2>
    <a href="ru/" class="text-label-lg text-primary underline min-h-[2.75rem] inline-flex items-center">На главную страницу на русском</a>
  </div>
</section>`,
};
