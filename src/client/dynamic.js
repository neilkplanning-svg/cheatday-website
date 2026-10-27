/** Content that depends on "now" or on this visitor: next order date, pickup status, draft bar, story tabs */
import { PROCESS } from '../data/index.js';
import { fmtDate } from '../lib/format.js';
import { firstOrderDate, pickupStatus } from '../lib/schedule.js';
import { store, KEYS } from '../lib/storage.js';
import { $, $$, toast } from './dom.js';

export function fillDynamic() {
  const next = fmtDate(firstOrderDate());
  $$('[data-dyn="next-date"]').forEach((el) => { el.textContent = next; });
  const status = pickupStatus();
  $$('[data-dyn="pickup-status"]').forEach((el) => {
    el.querySelector('span:last-child').textContent = status.text;
    el.querySelector('span:first-child').className = `w-2 h-2 rounded-full ${status.open ? 'bg-primary animate-pulse' : 'bg-outline'}`;
  });
}

export function initDraftBar() {
  const bar = $('[data-draft-bar]');
  if (bar && store.get(KEYS.draftHidden, false)) bar.hidden = true;
}

export function hideDraftBar() {
  const bar = $('[data-draft-bar]');
  if (bar) bar.hidden = true;
  store.set(KEYS.draftHidden, true);
  $('#main').focus();
}

/* ---------- story page: baking steps as accessible tabs ---------- */
export function selectChapter(i, focus = false) {
  const tabs = $$('[data-tabs] [role="tab"]');
  tabs.forEach((t, k) => {
    const on = k === i;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    t.querySelector('.chapter-num').className = `chapter-num w-10 h-10 rounded-full ${on ? 'bg-primary text-on-primary shadow-pop-sm' : 'bg-primary-container text-on-primary-container'} flex items-center justify-center text-headline-sm shrink-0`;
  });
  const panel = $('[data-chapter-text]');
  panel.textContent = PROCESS[i].text;
  panel.setAttribute('aria-labelledby', `chapter-tab-${i}`);
  if (focus) tabs[i].focus();
}

/** Arrow keys move between tabs (RTL: right = previous) */
export function tabsKeydown(e) {
  const tab = e.target.closest('[data-tabs] [role="tab"]');
  if (!tab) return false;
  const tabs = $$('[data-tabs] [role="tab"]');
  const i = tabs.indexOf(tab);
  const map = { ArrowLeft: i + 1, ArrowRight: i - 1, Home: 0, End: tabs.length - 1 };
  if (!(e.key in map)) return false;
  e.preventDefault();
  selectChapter((map[e.key] + tabs.length) % tabs.length, true);
  return true;
}

export function initStory() {
  if ($('[data-tabs]')) selectChapter(0);
}

export const videoSoon = () => toast('סרטון האפייה יעלה בקרוב', 'videocam');
