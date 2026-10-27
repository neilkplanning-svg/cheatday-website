/** Accessibility panel content. The state lives in client/a11y.js */
import { ic, each } from '../lib/html.js';
import { href } from '../lib/paths.js';

/** Text size steps (percent of the default) */
export const TEXT_STEPS = [100, 115, 130, 150, 175, 200];

/** Toggle options: key, icon, label, short explanation */
export const A11Y_TOGGLES = [
  ['contrast', 'contrast', 'ניגודיות גבוהה', 'טקסט כהה יותר על רקע לבן'],
  ['dark', 'dark_mode', 'ניגודיות כהה', 'טקסט בהיר על רקע כהה'],
  ['gray', 'filter_b_and_w', 'גווני אפור', 'ביטול צבעים'],
  ['links', 'link', 'הדגשת קישורים', 'קו תחתון ומסגרת לכל קישור'],
  ['headings', 'title', 'הדגשת כותרות', 'מסגרת סביב כותרות'],
  ['readable', 'font_download', 'גופן קריא', 'גופן פשוט וברור'],
  ['spacing', 'format_line_spacing', 'ריווח טקסט', 'רווח גדול בין שורות ואותיות'],
  ['cursor', 'arrow_selector_tool', 'סמן גדול', 'סמן עכבר מוגדל'],
  ['guide', 'horizontal_rule', 'סרגל קריאה', 'פס שעוקב אחרי העכבר'],
  ['focus', 'center_focus_strong', 'הדגשת מיקוד', 'מסגרת עבה סביב הרכיב הנבחר'],
  ['nomotion', 'motion_photos_off', 'עצירת אנימציות', 'בלי תנועה ומעברים'],
  ['noimages', 'hide_image', 'הסתרת איורים', 'הסתרת תמונות ואיורים דקורטיביים'],
];

const toggle = ([key, icon, label, hint], on) => `
  <button type="button" data-act="a11y-set" data-k="${key}" aria-pressed="${on}"
    class="a11y-opt min-h-[3.5rem] p-space-sm rounded-2xl flex items-center gap-space-sm text-right transition-colors border-2 ${on ? 'bg-secondary text-on-secondary border-secondary' : 'bg-surface-container text-on-surface border-transparent hover:border-secondary'}">
    ${ic(icon, '!text-[1.5rem]')}
    <span class="flex flex-col"><span class="text-label-md">${label}</span><span class="text-label-sm opacity-90 font-normal">${hint}</span></span>
    ${on ? ic('check_circle', 'fill ms-auto !text-[1.25rem]') : ''}
  </button>`;

export function a11yPanel(prefs) {
  const step = TEXT_STEPS.indexOf(prefs.scale);
  return `
  <div class="flex items-center justify-between gap-space-sm mb-space-md">
    <h2 id="a11y-title" class="flex items-center gap-space-xs text-secondary text-headline-sm">${ic('accessibility_new', '!text-[1.5rem]')}התאמות נגישות</h2>
    <button type="button" data-act="a11y" class="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center" aria-label="סגירת תפריט הנגישות">${ic('close')}</button>
  </div>
  <div class="flex flex-col gap-space-md">
    <div class="flex flex-col gap-space-xs" role="group" aria-labelledby="a11y-size-label">
      <span id="a11y-size-label" class="text-label-md">גודל טקסט: <span class="tabular-nums">${prefs.scale}%</span></span>
      <div class="grid grid-cols-3 gap-space-xs">
        <button type="button" data-act="a11y-set" data-k="minus" ${step <= 0 ? 'disabled aria-disabled="true"' : ''} class="min-h-[3rem] rounded-2xl bg-surface-container text-on-surface text-label-lg flex items-center justify-center gap-1 disabled:opacity-50" aria-label="הקטנת טקסט">${ic('text_decrease')}<span aria-hidden="true">א-</span></button>
        <button type="button" data-act="a11y-set" data-k="size-reset" class="min-h-[3rem] rounded-2xl bg-surface-container text-on-surface text-label-md" aria-label="גודל טקסט רגיל">רגיל</button>
        <button type="button" data-act="a11y-set" data-k="plus" ${step >= TEXT_STEPS.length - 1 ? 'disabled aria-disabled="true"' : ''} class="min-h-[3rem] rounded-2xl bg-surface-container text-on-surface text-label-lg flex items-center justify-center gap-1 disabled:opacity-50" aria-label="הגדלת טקסט">${ic('text_increase')}<span aria-hidden="true">א+</span></button>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">${each(A11Y_TOGGLES, (t) => toggle(t, Boolean(prefs[t[0]])))}</div>
    <button type="button" data-act="a11y-set" data-k="reset" class="min-h-[3rem] rounded-2xl bg-surface-variant text-on-surface text-label-md flex items-center justify-center gap-space-xs">${ic('restart_alt')}איפוס כל ההגדרות</button>
    <div class="text-body-sm text-on-surface-variant flex flex-col gap-space-xs border-t border-surface-container pt-space-sm">
      <p>ניווט במקלדת: Tab ו-Shift+Tab לתנועה, Enter לבחירה, Esc לסגירת חלונות. Alt+A פותח את התפריט הזה.</p>
      <p class="flex flex-wrap items-center justify-between gap-space-sm"><a class="text-primary underline" href="${href('accessibility')}">להצהרת הנגישות המלאה</a><span class="text-secondary text-label-sm">ת״י 5568 ברמה AA</span></p>
    </div>
  </div>`;
}
