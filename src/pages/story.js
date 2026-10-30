/** "Our secret" page: baking video and ingredients */
import { BUSINESS, INGREDIENTS, PROCESS, VIDEO } from '../data/index.js';
import * as ART from '../lib/art.js';
import { esc, ic, icf, each, brandName } from '../lib/html.js';
import { tr, loc } from '../lib/i18n.js';
import { href, asset } from '../lib/paths.js';

const player = () => {
  if (VIDEO && VIDEO.src) {
    return `<video class="w-full aspect-video rounded bg-on-background" controls preload="metadata" ${VIDEO.poster ? `poster="${esc(asset(VIDEO.poster))}"` : ''} src="${esc(asset(VIDEO.src))}" aria-describedby="chapter-panel"></video>`;
  }
  const link = VIDEO && VIDEO.url;
  return `<div class="group relative w-full aspect-video rounded overflow-hidden bg-on-background flex items-center justify-center">
    <div class="art absolute inset-0 transition-transform duration-700 group-hover:scale-105">${ART.video('')}</div>
    <div class="absolute inset-0 bg-gradient-to-t from-on-background/85 via-on-background/20 to-on-background/40 pointer-events-none" aria-hidden="true"></div>
    <div class="absolute top-space-md inset-x-space-md flex items-center justify-between z-10 gap-space-sm">
      <span class="chip bg-black/70 text-white !px-space-md"><span class="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-pulse" aria-hidden="true"></span>${tr('מאחורי הקלעים במטבח', 'Behind the scenes in the kitchen', 'За кулисами нашей кухни')}</span>
      <span class="chip bg-white text-black !px-space-md">${ic('timer', '!text-[1rem]')}${link ? tr('צפייה', 'Watch', 'Смотреть') : tr('בקרוב', 'Soon', 'Скоро')}</span>
    </div>
    ${link
      ? `<a href="${esc(link)}" target="_blank" rel="noopener" class="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-pop-md hover:scale-110 transition-transform">${icf('play_arrow', '!text-[3rem]')}<span class="sr-only">${tr('צפייה בסרטון האפייה (נפתח בחלון חדש)', 'Watch the baking video (opens in a new tab)', 'Смотреть видео о выпечке (откроется в новой вкладке)')}</span></a>`
      : `<button type="button" data-act="video-soon" class="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-pop-md hover:scale-110 transition-transform" aria-label="${tr('סרטון האפייה יעלה בקרוב', 'The baking video is coming soon', 'Видео о выпечке скоро появится')}">${icf('play_arrow', '!text-[3rem]')}</button>`}
    <p class="absolute bottom-0 inset-x-0 p-space-md z-10 text-label-sm text-white bg-black/50">${link ? tr('הסרטון ייפתח בחלון חדש', 'The video opens in a new tab', 'Видео откроется в новой вкладке') : tr('הסרטון מצולם בימים אלה. בינתיים, הנה שלושת השלבים:', 'We are filming the video right now. Meanwhile, here are the three steps:', 'Мы как раз снимаем видео. А пока — три этапа:')}</p>
  </div>`;
};

const chapters = () => `
  <div class="mt-space-md grid grid-cols-1 sm:grid-cols-3 gap-gutter" role="tablist" aria-label="${tr('שלבי האפייה', 'Baking steps', 'Этапы выпечки')}" data-tabs>
    ${each(PROCESS, (s, i) => `<button type="button" role="tab" id="chapter-tab-${i}" aria-controls="chapter-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-act="chapter" data-i="${i}"
      class="chapter text-start p-space-sm min-h-[3.5rem] rounded flex items-start gap-space-sm transition-colors aria-selected:bg-surface-container-highest aria-selected:ring-2 aria-selected:ring-primary bg-surface-container hover:bg-surface-container-high">
      <span class="chapter-num w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-sm shrink-0" aria-hidden="true">${i + 1}</span>
      <span class="flex flex-col min-w-0"><span class="text-label-md text-on-surface">${esc(loc(s.title))}</span><span class="text-body-sm text-on-surface-variant">${esc(loc(s.sub))}</span></span>
    </button>`)}
  </div>
  <div id="chapter-panel" role="tabpanel" aria-labelledby="chapter-tab-0" tabindex="0" class="mt-space-sm p-space-sm bg-surface-container-low rounded text-body-md text-on-surface" data-chapter-text>${esc(loc(PROCESS[0].text))}</div>
`;

const ingredientCard = (g) => {
  const title = esc(loc(g.title));
  const art = `<div class="art w-full h-full group-hover:scale-105 transition-transform duration-500">${ART.ingredient(g.art, `${tr('איור', 'Illustration', 'Иллюстрация')}: ${loc(g.title)}`)}</div>`;
  const text = `
        <p class="flex items-center gap-space-xs text-secondary text-label-sm">${ic(g.icon, '!text-[1.25rem]')}${esc(loc(g.origin))}</p>
        <h3 id="ing-${g.id}" class="text-headline-md text-on-surface">${title}</h3>
        <p class="text-body-md text-on-surface-variant leading-relaxed">${esc(loc(g.text))}</p>`;
  if (g.wide) {
    return `
  <li class="bg-surface-container-lowest rounded-lg p-space-lg shadow-pop-md hover:-translate-y-1 transition-transform group md:col-span-2 lg:col-span-2">
    <article class="grid grid-cols-1 sm:grid-cols-2 gap-gutter items-center" aria-labelledby="ing-${g.id}">
      <div class="relative w-full h-56 rounded overflow-hidden bg-surface-container">${art}
        <span class="absolute top-space-sm start-space-sm chip bg-primary text-on-primary shadow-pop-sm !px-space-md">${esc(loc(g.badge))}</span></div>
      <div class="flex flex-col gap-space-xs">${text}
        ${g.check ? `<p class="chip bg-surface-container-high text-primary w-fit !px-space-md mt-space-xs">${ic('check_circle', '!text-[1rem]')}${esc(loc(g.check))}</p>` : ''}
      </div>
    </article>
  </li>`;
  }
  return `
  <li class="bg-surface-container-lowest rounded-lg p-space-lg shadow-pop-md hover:-translate-y-1 transition-transform group">
    <article class="flex flex-col gap-space-md" aria-labelledby="ing-${g.id}">
      <div class="relative w-full h-52 rounded overflow-hidden bg-surface-container">${art}
        <span class="absolute top-space-sm start-space-sm chip bg-secondary text-on-secondary shadow-pop-sm !px-space-md">${esc(loc(g.badge))}</span></div>
      <div class="flex flex-col gap-space-xs">${text}</div>
    </article>
  </li>`;
};

export const page = {
  id: 'story',
  breadcrumb: () => tr('הסוד שלנו ורכיבים', 'Our secret & ingredients', 'Наш секрет и ингредиенты'),
  title: () => tr(`הסוד שלנו: איך אנחנו אופים ומה יש בפנים | ${BUSINESS.name}`, `Our secret: how we bake and what goes inside | ${BUSINESS.name}`, `Наш секрет: как мы печём и что внутри | ${BUSINESS.name}`),
  description: () => tr(
    `מאחורי הקלעים של ${BUSINESS.name}: בצק שמרים בתפיחה איטית, חמאה אמיתית, קינמון ציילון וגלייז גבינה עם וניל אמיתי. בלי מרגרינה ובלי חומרים משמרים.`,
    `Behind the scenes at ${BUSINESS.name}: slow-rise yeast dough, real butter, Ceylon cinnamon and a cream-cheese glaze with real vanilla. No margarine, no preservatives.`, `За кулисами ${BUSINESS.name}: дрожжевое тесто медленной расстойки, настоящее масло, цейлонская корица и сырная глазурь с настоящей ванилью. Без маргарина и консервантов.`),
  render: () => `
<div class="relative overflow-hidden">
  <div class="absolute -top-32 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
  <div class="wrap gutter-x pt-space-lg pb-space-md text-center flex flex-col items-center relative">
    <p class="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high text-primary rounded-full shadow-pop-sm mb-space-sm text-label-sm">${ic('videocam', '!text-[1.125rem]')}${tr('מאחורי התנור', 'Behind the oven', 'За дверцей духовки')}</p>
    <h1 class="text-display-mobile md:text-display text-on-surface mb-space-xs">${tr('הסוד של', 'The secret of', 'Секрет')} <span class="text-primary underline decoration-secondary-container decoration-wavy underline-offset-8">${brandName(BUSINESS.name)}</span></h1>
    <p class="text-body-lg text-on-surface-variant max-w-2xl">${tr(
      'מהלישה הראשונה של בצק העננים, דרך ספירלת הקינמון הנדיבה ועד הגלייז החם שאי אפשר לעמוד בפניו.',
      'From the first knead of our cloud dough, through the generous cinnamon swirl, to the warm glaze nobody can resist.', 'От первого замеса теста-облака через щедрую спираль корицы до тёплой глазури, перед которой невозможно устоять.')}</p>
  </div>
  <section id="video" class="wrap gutter-x pb-space-xl relative" aria-labelledby="video-title">
    <h2 id="video-title" class="sr-only">${tr('סרטון ותהליך האפייה', 'Baking video and process', 'Видео и процесс выпечки')}</h2>
    <div class="bg-surface-container-lowest rounded-lg p-space-sm sm:p-space-md shadow-pop-xl">${player()}${chapters()}</div>
  </section>
</div>

<section class="wrap gutter-x pb-space-sm" aria-labelledby="quality-title">
  <div class="bg-surface-container-high rounded-[1.75rem] p-space-lg sm:p-space-xl flex flex-col md:flex-row items-center justify-between gap-gutter shadow-pop-md relative overflow-hidden">
    <div class="flex flex-col gap-space-xs relative max-w-xl">
      <p class="flex items-center gap-space-xs text-secondary text-label-md">${ic('award_star', 'text-primary !text-[1.25rem]')}${tr('איכות בלי פשרות', 'Quality without compromise', 'Качество без компромиссов')}</p>
      <h2 id="quality-title" class="text-headline-lg-mobile md:text-headline-lg text-on-surface">${tr('רכיבים איכותיים בלבד. זה כל הסוד.', 'Only quality ingredients. That is the whole secret.', 'Только качественные ингредиенты. В этом весь секрет.')}</h2>
      <p class="text-body-md text-on-surface-variant">${tr(
        'אין אצלנו מקום לתחליפים זולים, מרגרינה או אבקות תעשייתיות. כל רכיב נבחר בקפידה, וכל רול נאפה לפי הזמנה.',
        'There is no room here for cheap substitutes, margarine or industrial mixes. Every ingredient is carefully chosen, and every roll is baked to order.', 'У нас нет места дешёвым заменителям, маргарину и промышленным смесям. Каждый ингредиент тщательно подобран, а каждый синнабон печётся под заказ.')}</p>
    </div>
    <p class="relative shrink-0 flex items-center gap-space-sm bg-surface rounded-full px-space-lg py-space-md shadow-pop">
      <span class="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center" aria-hidden="true">${ic('verified', '!text-[1.75rem]')}</span>
      <span class="flex flex-col"><span class="text-headline-sm text-on-surface">${tr('בלי חומרים משמרים', 'No preservatives', 'Без консервантов')}</span><span class="text-label-sm text-on-surface-variant">${tr('נאפה טרי לכל הזמנה', 'Baked fresh for every order', 'Печём свежим к каждому заказу')}</span></span>
    </p>
  </div>
</section>

<section class="wrap gutter-x py-space-xl" aria-labelledby="ingredients-title">
  <h2 id="ingredients-title" class="sr-only">${tr('הרכיבים שלנו', 'Our ingredients', 'Наши ингредиенты')}</h2>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter items-stretch">${each(INGREDIENTS, ingredientCard)}</ul>
</section>

<section class="wrap gutter-x pb-space-xl" aria-labelledby="cta-title">
  <div class="relative bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary rounded-[1.75rem] p-space-lg sm:p-space-xl shadow-pop-lg flex flex-col md:flex-row items-center justify-between gap-gutter overflow-hidden">
    <div class="flex flex-col gap-space-xs max-w-2xl relative">
      <p class="chip bg-surface/20 text-on-primary w-fit !px-space-md">${ic('workspace_premium', '!text-[1.125rem]')}${tr('התחייבות לטריות', 'Our freshness promise', 'Обещаем свежесть')}</p>
      <h2 id="cta-title" class="text-headline-lg md:text-display">${tr('מוכנים להרגיש את ההבדל בכל ביס?', 'Ready to taste the difference in every bite?', 'Готовы почувствовать разницу в каждом укусе?')}</h2>
      <p class="text-body-lg">${tr(
        'כשמשלבים חמאה אמיתית, וניל אמיתי וקינמון ציילון, הקינוח מפסיק להיות סתם מתוק והופך לחוויה.',
        'When you bring together real butter, real vanilla and Ceylon cinnamon, dessert stops being just sweet and becomes an experience.', 'Когда встречаются настоящее масло, настоящая ваниль и цейлонская корица, десерт перестаёт быть просто сладким и становится впечатлением.')}</p>
    </div>
    <a href="${href('menu')}" class="btn-pop relative w-full md:w-auto text-center min-h-[3rem] px-space-xl py-space-md bg-surface text-primary text-headline-sm rounded-full shadow-pop-md flex items-center justify-center gap-space-xs shrink-0">${tr('לטעום את ההבדל', 'Taste the difference', 'Попробовать разницу')} ${ic('arrow_back', 'fwd')}</a>
  </div>
</section>`,
};
