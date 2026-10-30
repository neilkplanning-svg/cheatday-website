/** Main navigation items (header, drawer and the mobile bottom bar) */
import { tr } from '../lib/i18n.js';

export const nav = () => [
  { id: 'home', label: tr('דף הבית', 'Home'), short: tr('דף הבית', 'Home'), icon: 'home' },
  { id: 'menu', label: tr('תפריט והזמנות', 'Menu & orders'), short: tr('תפריט', 'Menu'), icon: 'bakery_dining' },
  { id: 'story', label: tr('הסוד שלנו ורכיבים', 'Our secret'), short: tr('הסוד שלנו', 'Our secret'), icon: 'local_cafe' },
  { id: 'contact', label: tr('יצירת קשר', 'Contact'), short: tr('קשר', 'Contact'), icon: 'call' },
];

/** Secondary links (drawer and footer) */
export const legalNav = () => [
  { id: 'accessibility', label: tr('הצהרת נגישות', 'Accessibility statement'), icon: 'accessible_forward' },
  { id: 'terms', label: tr('תנאי שימוש ופרטיות', 'Terms & privacy'), icon: 'gavel' },
];
