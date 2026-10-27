/** CheatDay design tokens.
 *  Colours come 1:1 from the Stitch design and are exposed as CSS variables, so the
 *  accessibility panel can swap the whole palette (high contrast / dark contrast) at runtime. */
const plugin = require('tailwindcss/plugin');

const palette = {
  'surface-bright': '#fff8f5', 'secondary-fixed-dim': '#ffb68c', 'on-primary-container': '#fffbff',
  'on-tertiary-fixed-variant': '#623f18', 'surface-container-high': '#ffe3d3', 'on-background': '#2d1606',
  'surface-tint': '#bb005a', 'secondary-container': '#ffa26a', 'on-primary': '#ffffff',
  'on-error-container': '#93000a', 'surface-container-lowest': '#ffffff', 'tertiary-container': '#966c41',
  'error': '#ba1a1a', 'on-tertiary-container': '#fffbff', 'on-error': '#ffffff', 'on-secondary': '#ffffff',
  'error-container': '#ffdad6', 'primary-fixed-dim': '#ffb1c4', 'background': '#fff8f5', 'on-tertiary': '#ffffff',
  'on-primary-fixed-variant': '#8f0044', 'on-secondary-container': '#783603', 'surface-container': '#ffeadf',
  'outline': '#8f6f76', 'tertiary': '#7b542b', 'secondary-fixed': '#ffdbc9', 'primary': '#b60058',
  'on-primary-fixed': '#3f001a', 'inverse-primary': '#ffb1c4', 'surface-variant': '#ffdbc7', 'surface-dim': '#fed1b6',
  'secondary': '#934b19', 'on-surface-variant': '#5b3f46', 'surface': '#fff8f5', 'surface-container-highest': '#ffdbc7',
  'outline-variant': '#e3bdc5', 'primary-fixed': '#ffd9e0', 'inverse-on-surface': '#ffede4', 'tertiary-fixed': '#ffdcbd',
  'tertiary-fixed-dim': '#f0bd8b', 'primary-container': '#e11170', 'on-tertiary-fixed': '#2c1600',
  'surface-container-low': '#fff1ea', 'on-secondary-fixed-variant': '#753401', 'on-secondary-fixed': '#321200',
  'on-surface': '#2d1606', 'inverse-surface': '#452a18',
  // brand additions
  'brand-pink': '#f4327b', // logo pink – decorative only (fails AA as a text colour on white)
  'whatsapp': '#0b6e61', // darker than WhatsApp green so white text passes AA (6.1:1)
};

/* Accessibility panel: "high contrast" – darker text and accents on white */
const contrast = {
  'on-surface-variant': '#2d1606', 'outline': '#4a2e22', 'outline-variant': '#5b3f46',
  'primary': '#8f0044', 'primary-container': '#8f0044', 'secondary': '#5c2a05', 'tertiary': '#4a2e10',
  'surface-container-low': '#ffffff', 'surface-container': '#fff6f1', 'surface-container-high': '#ffeadf',
  'surface': '#ffffff', 'background': '#ffffff', 'whatsapp': '#064a41',
};

/* Accessibility panel: "dark contrast" – light text on a near-black background */
const dark = {
  'surface': '#15100e', 'background': '#15100e', 'surface-bright': '#15100e', 'surface-container-lowest': '#000000',
  'surface-container-low': '#1f1916', 'surface-container': '#28201c', 'surface-container-high': '#322722',
  'surface-container-highest': '#3c2f28', 'surface-variant': '#3c2f28', 'surface-dim': '#3c2f28',
  'on-surface': '#ffffff', 'on-background': '#ffffff', 'on-surface-variant': '#f5e6df',
  'primary': '#ffb1c4', 'on-primary': '#2b0011', 'primary-container': '#ffd9e0', 'on-primary-container': '#2b0011',
  'primary-fixed': '#4d0a28', 'on-primary-fixed': '#ffd9e0', 'primary-fixed-dim': '#6b0a37',
  'secondary': '#ffc9a8', 'on-secondary': '#2a1000', 'secondary-fixed': '#4f2507', 'on-secondary-fixed': '#ffdbc9',
  'secondary-container': '#ffc9a8', 'on-secondary-container': '#2a1000', 'secondary-fixed-dim': '#6e3410',
  'tertiary': '#f6cfa6', 'on-tertiary': '#2c1600', 'tertiary-fixed': '#4a2e10', 'on-tertiary-fixed': '#ffdcbd',
  'tertiary-container': '#f6cfa6', 'on-tertiary-container': '#2c1600',
  'outline': '#e0cdd2', 'outline-variant': '#a88c93', 'inverse-surface': '#ffede4', 'inverse-on-surface': '#2d1606',
  'error': '#ffb4ab', 'on-error': '#2b0000', 'whatsapp': '#8ff0dc',
};

const rgb = (hex) => { const n = parseInt(hex.slice(1), 16); return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`; };
const vars = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [`--c-${k}`, rgb(v)]));
const colors = Object.fromEntries(Object.keys(palette).map((k) => [k, `rgb(var(--c-${k}) / <alpha-value>)`]));
const pop = (y) => `0 ${y} 0 rgb(var(--c-on-surface))`;

module.exports = {
  palette,
  content: ['./src/**/*.js'],
  // added at runtime by src/client/a11y.js (class names are built from strings, so Tailwind can't see them)
  safelist: ['a11y-contrast', 'a11y-dark'],
  theme: {
    extend: {
      colors,
      borderRadius: { DEFAULT: '1rem', lg: '2rem', xl: '3rem', full: '9999px' },
      spacing: {
        'space-xs': '0.25rem', 'space-sm': '0.5rem', 'space-md': '1rem', 'space-lg': '1.5rem', 'space-xl': '2.5rem',
        margin: '2rem', 'margin-mobile': '1rem', gutter: '1.25rem', 'gutter-mobile': '0.75rem',
      },
      fontFamily: { sans: ['Rubik', 'Arial', 'Helvetica', 'sans-serif'] },
      fontSize: {
        'label-xs': ['0.6875rem', { lineHeight: '0.875rem', fontWeight: '600' }],
        'label-sm': ['0.75rem', { lineHeight: '1rem', fontWeight: '600' }],
        'label-md': ['0.875rem', { lineHeight: '1.125rem', fontWeight: '600' }],
        'label-lg': ['1rem', { lineHeight: '1.25rem', fontWeight: '700' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.625rem', fontWeight: '400' }],
        'headline-sm': ['1.25rem', { lineHeight: '1.625rem', fontWeight: '600' }],
        'headline-md': ['1.5rem', { lineHeight: '1.875rem', fontWeight: '700' }],
        'headline-lg-mobile': ['1.625rem', { lineHeight: '2rem', fontWeight: '700' }],
        'headline-lg': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'display-mobile': ['2.25rem', { lineHeight: '2.625rem', letterSpacing: '-0.01em', fontWeight: '800' }],
        display: ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.02em', fontWeight: '800' }],
      },
      boxShadow: { 'pop-sm': pop('2px'), pop: pop('3px'), 'pop-md': pop('4px'), 'pop-lg': pop('6px'), 'pop-xl': pop('8px') },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({ ':root': vars(palette), 'html.a11y-contrast': vars(contrast), 'html.a11y-dark': vars(dark) });
    }),
  ],
};
