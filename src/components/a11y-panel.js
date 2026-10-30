/** Accessibility panel content. The state lives in client/a11y.js */
import { ic, each } from '../lib/html.js';
import { tr } from '../lib/i18n.js';
import { href } from '../lib/paths.js';

/** Text size steps (percent of the default) */
export const TEXT_STEPS = [100, 115, 130, 150, 175, 200];

/** Toggle options: key, icon, label, short explanation */
export const a11yToggles = () => [
  ['contrast', 'contrast', tr('ניגודיות גבוהה', 'High contrast', 'Высокий контраст'), tr('טקסט כהה יותר על רקע לבן', 'Darker text on white', 'Более тёмный текст на белом')],
  ['dark', 'dark_mode', tr('ניגודיות כהה', 'Dark contrast', 'Тёмный контраст'), tr('טקסט בהיר על רקע כהה', 'Light text on dark', 'Светлый текст на тёмном фоне')],
  ['gray', 'filter_b_and_w', tr('גווני אפור', 'Grayscale', 'Оттенки серого'), tr('ביטול צבעים', 'Remove colours', 'Без цветов')],
  ['links', 'link', tr('הדגשת קישורים', 'Highlight links', 'Выделить ссылки'), tr('קו תחתון ומסגרת לכל קישור', 'Underline and outline links', 'Подчеркнуть и обвести ссылки')],
  ['headings', 'title', tr('הדגשת כותרות', 'Highlight headings', 'Выделить заголовки'), tr('מסגרת סביב כותרות', 'Outline every heading', 'Рамка вокруг заголовков')],
  ['readable', 'font_download', tr('גופן קריא', 'Readable font', 'Читаемый шрифт'), tr('גופן פשוט וברור', 'A plain, clear typeface', 'Простой и чёткий шрифт')],
  ['spacing', 'format_line_spacing', tr('ריווח טקסט', 'Text spacing', 'Интервалы текста'), tr('רווח גדול בין שורות ואותיות', 'More space between lines and letters', 'Больше места между строками и буквами')],
  ['cursor', 'arrow_selector_tool', tr('סמן גדול', 'Big cursor', 'Большой курсор'), tr('סמן עכבר מוגדל', 'A larger mouse pointer', 'Увеличенный указатель мыши')],
  ['guide', 'horizontal_rule', tr('סרגל קריאה', 'Reading guide', 'Линейка для чтения'), tr('פס שעוקב אחרי העכבר', 'A bar that follows the pointer', 'Полоса, которая следует за указателем')],
  ['focus', 'center_focus_strong', tr('הדגשת מיקוד', 'Strong focus', 'Яркий фокус'), tr('מסגרת עבה סביב הרכיב הנבחר', 'Thick outline on the focused item', 'Толстая рамка вокруг выбранного элемента')],
  ['nomotion', 'motion_photos_off', tr('עצירת אנימציות', 'Stop animations', 'Остановить анимацию'), tr('בלי תנועה ומעברים', 'No motion or transitions', 'Без движения и переходов')],
  ['noimages', 'hide_image', tr('הסתרת איורים', 'Hide images', 'Скрыть картинки'), tr('הסתרת תמונות ואיורים דקורטיביים', 'Hide decorative pictures', 'Скрыть декоративные изображения')],
];

/** All toggle keys (language-independent) */
export const A11Y_KEYS = ['contrast', 'dark', 'gray', 'links', 'headings', 'readable', 'spacing', 'cursor', 'guide', 'focus', 'nomotion', 'noimages'];

const toggle = ([key, icon, label, hint], on) => `
  <button type="button" data-act="a11y-set" data-k="${key}" aria-pressed="${on}"
    class="a11y-opt min-h-[3.5rem] p-space-sm rounded-2xl flex items-center gap-space-sm text-start transition-colors border-2 ${on ? 'bg-secondary text-on-secondary border-secondary' : 'bg-surface-container text-on-surface border-transparent hover:border-secondary'}">
    ${ic(icon, '!text-[1.5rem]')}
    <span class="flex flex-col"><span class="text-label-md">${label}</span><span class="text-label-sm opacity-90 font-normal">${hint}</span></span>
    ${on ? ic('check_circle', 'fill ms-auto !text-[1.25rem]') : ''}
  </button>`;

export function a11yPanel(prefs) {
  const step = TEXT_STEPS.indexOf(prefs.scale);
  return `
  <div class="flex items-center justify-between gap-space-sm mb-space-md">
    <h2 id="a11y-title" class="flex items-center gap-space-xs text-secondary text-headline-sm">${ic('accessibility_new', '!text-[1.5rem]')}${tr('התאמות נגישות', 'Accessibility settings', 'Настройки доступности')}</h2>
    <button type="button" data-act="a11y" class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center" aria-label="${tr('סגירת תפריט הנגישות', 'Close the accessibility menu', 'Закрыть меню доступности')}">${ic('close')}</button>
  </div>
  <div class="flex flex-col gap-space-md">
    <div class="flex flex-col gap-space-xs" role="group" aria-labelledby="a11y-size-label">
      <span id="a11y-size-label" class="text-label-md">${tr('גודל טקסט', 'Text size', 'Размер текста')}: <span class="tabular-nums">${prefs.scale}%</span></span>
      <div class="grid grid-cols-3 gap-space-xs">
        <button type="button" data-act="a11y-set" data-k="minus" ${step <= 0 ? 'disabled aria-disabled="true"' : ''} class="min-h-[3rem] rounded-2xl bg-surface-container text-on-surface text-label-lg flex items-center justify-center gap-1 disabled:opacity-50" aria-label="${tr('הקטנת טקסט', 'Smaller text', 'Уменьшить текст')}">${ic('text_decrease')}<span aria-hidden="true">${tr('א-', 'A-', 'А-')}</span></button>
        <button type="button" data-act="a11y-set" data-k="size-reset" class="min-h-[3rem] rounded-2xl bg-surface-container text-on-surface text-label-md" aria-label="${tr('גודל טקסט רגיל', 'Normal text size', 'Обычный размер текста')}">${tr('רגיל', 'Normal', 'Обычный')}</button>
        <button type="button" data-act="a11y-set" data-k="plus" ${step >= TEXT_STEPS.length - 1 ? 'disabled aria-disabled="true"' : ''} class="min-h-[3rem] rounded-2xl bg-surface-container text-on-surface text-label-lg flex items-center justify-center gap-1 disabled:opacity-50" aria-label="${tr('הגדלת טקסט', 'Larger text', 'Увеличить текст')}">${ic('text_increase')}<span aria-hidden="true">${tr('א+', 'A+', 'А+')}</span></button>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">${each(a11yToggles(), (t) => toggle(t, Boolean(prefs[t[0]])))}</div>
    <button type="button" data-act="a11y-set" data-k="reset" class="min-h-[3rem] rounded-2xl bg-surface-variant text-on-surface text-label-md flex items-center justify-center gap-space-xs">${ic('restart_alt')}${tr('איפוס כל ההגדרות', 'Reset all settings', 'Сбросить все настройки')}</button>
    <div class="text-body-sm text-on-surface-variant flex flex-col gap-space-xs border-t border-surface-container pt-space-sm">
      <p>${tr('ניווט במקלדת: Tab ו-Shift+Tab לתנועה, Enter לבחירה, Esc לסגירת חלונות. Alt+A פותח את התפריט הזה.', 'Keyboard: Tab and Shift+Tab to move, Enter to select, Esc to close windows. Alt+A opens this menu.', 'Клавиатура: Tab и Shift+Tab — перемещение, Enter — выбор, Esc — закрыть окно. Alt+A открывает это меню.')}</p>
      <p class="flex flex-wrap items-center justify-between gap-space-sm"><a class="text-primary underline" href="${href('accessibility')}">${tr('להצהרת הנגישות המלאה', 'Full accessibility statement', 'Полное заявление о доступности')}</a><span class="text-secondary text-label-sm">${tr('ת״י 5568 ברמה AA', 'IS 5568, level AA', 'IS 5568, уровень AA')}</span></p>
    </div>
  </div>`;
}
