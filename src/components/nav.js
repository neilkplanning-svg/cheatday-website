/** Main navigation items (header, drawer and the mobile bottom bar) */
import { tr } from '../lib/i18n.js';

export const nav = () => [
  { id: 'home', label: tr('דף הבית', 'Home', 'Главная'), short: tr('דף הבית', 'Home', 'Главная'), icon: 'home' },
  { id: 'menu', label: tr('תפריט והזמנות', 'Menu & orders', 'Меню и заказы'), short: tr('תפריט', 'Menu', 'Меню'), icon: 'bakery_dining' },
  { id: 'story', label: tr('הסוד שלנו ורכיבים', 'Our secret', 'Наш секрет'), short: tr('הסוד שלנו', 'Our secret', 'Наш секрет'), icon: 'local_cafe' },
  { id: 'contact', label: tr('יצירת קשר', 'Contact', 'Контакты'), short: tr('קשר', 'Contact', 'Контакты'), icon: 'call' },
];

/** Secondary links (drawer and footer) */
export const legalNav = () => [
  { id: 'accessibility', label: tr('הצהרת נגישות', 'Accessibility statement', 'Заявление о доступности'), icon: 'accessible_forward' },
  { id: 'terms', label: tr('תנאי שימוש ופרטיות', 'Terms & privacy', 'Условия и конфиденциальность'), icon: 'gavel' },
];
