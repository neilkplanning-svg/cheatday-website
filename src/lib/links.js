/** External links: WhatsApp, phone, social */
import { BUSINESS } from '../data/index.js';

export const waNumber = () => (BUSINESS.whatsapp || '').replace(/\D/g, '');

/** wa.me link with a prefilled message. Without a number WhatsApp lets the user pick a chat. */
export const waLink = (text) => `https://wa.me/${waNumber()}?text=${encodeURIComponent(text)}`;

export const telHref = () => `tel:${(BUSINESS.phone || '').replace(/[^\d+]/g, '')}`;

/** "@cheatday" from a profile URL */
export const instaHandle = () => (BUSINESS.instagram ? `@${BUSINESS.instagram.replace(/\/+$/, '').split('/').pop()}` : '');

/** Social profiles that exist (for footer icons and structured data) */
export const socialProfiles = () => [BUSINESS.instagram, BUSINESS.facebook, BUSINESS.tiktok].filter(Boolean);
