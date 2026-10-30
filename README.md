# CheatDay – אתר ואפליקציית ווב

אתר לעסק הביתי **CheatDay**: סינבונים וקינוחים בעבודת יד מחריש.
האתר מותאם לנייד ולמחשב, אפשר להתקין אותו כאפליקציה במסך הבית (PWA), וההזמנות נשלחות לעסק כהודעת וואטסאפ מסודרת.
האתר בשלוש שפות: עברית בשורש האתר, אנגלית תחת `/en/` ורוסית תחת `/ru/`, עם תפריט בחירת שפה בכל עמוד.

- **עמודים:** דף הבית, תפריט והזמנות, הסוד שלנו ורכיבים, יצירת קשר, הצהרת נגישות, תנאי שימוש ופרטיות, ו-404.
- **גוגל:** כל עמוד נבנה מראש כקובץ HTML סטטי בכל שפה, עם canonical, קישורי hreflang בין השפות, תגיות Open Graph, `sitemap.xml`, `robots.txt` ונתונים מובנים (Bakery, Menu, FAQ, Breadcrumbs).
- **נגישות:** ת״י 5568 / WCAG 2.2 ברמה AA, עם תפריט נגישות מורחב (Alt+A). הבדיקה האוטומטית (`npm run audit:a11y`) מריצה axe-core על כל העמודים בשלוש השפות ומחזירה 0 הפרות.

## מבנה הקוד

```
src/
  data/          כל התוכן: site.js (כתובת, גוגל), business.js (קשר, שעות, משלוחים),
                 menu.js (מוצרים ומחירים), content.js (רכיבים, ביקורות, שאלות נפוצות)
  lib/           עזרים טהורים: i18n (שפות), html, format, schedule, links, storage, paths, art (איורי SVG)
  components/    חלקי ממשק: header, footer, overlays, product-card, cart-panel, a11y-panel, sections
  pages/         עמוד לכל קובץ: home, menu, story, contact, accessibility, terms, not-found
  seo/           meta.js (תגיות head), schema.js (JSON-LD)
  client/        הקוד שרץ בדפדפן: main (חיבור אירועים), state, cart, checkout, forms, a11y, dynamic, pwa
  styles/        main.css (Tailwind), a11y.css (מצבי נגישות)
  layout.js      עוטף כל עמוד ב-header, footer וסקריפטים
  sw.js          service worker לאפליקציה ולעבודה אופליין
public/          קבצים סטטיים: לוגו, אייקונים, תמונת שיתוף
scripts/         build, serve, a11y-audit, יצירת אייקונים ותמונת שיתוף מהלוגו
brand-source/    קובץ הלוגו המקורי
```

## עבודה שוטפת

```bash
npm install
npm run build          # בונה את dist/
npm run serve          # תצוגה מקומית ב-http://localhost:5173
npm run audit:a11y     # בדיקת נגישות (צריך Playwright: npx playwright install chromium)
npm run brand          # יוצר מחדש לוגו/אייקונים/תמונת שיתוף אחרי החלפת brand-source/logo-original.jpg
```

**לשנות מחיר, מוצר, שעות או טלפון:** עורכים רק את הקבצים ב-`src/data/` ודוחפים ל-`main`. GitHub Actions בונה ומעלה את האתר אוטומטית.

**טקסטים בשלוש שפות:** בקבצי `src/data/` כל טקסט כתוב כ-`{ he: '…', en: '…', ru: '…' }`. בעמודים ובחלקי הממשק משתמשים ב-`tr('עברית', 'English', 'Русский')`. מעדכנים תמיד את שלוש השפות יחד. אם חסר תרגום לרוסית, הבנייה מציגה את הטקסטים החסרים ונכשלת.

**תמונות אמיתיות:** שמים קובץ ב-`public/assets/img/` ומוסיפים למוצר ב-`src/data/menu.js` את השדות `image: 'assets/img/classic.webp'` ו-`imageAlt: { he: 'תיאור התמונה', en: 'Image description', ru: 'Описание фото' }`.

## עלייה לאוויר

1. ב-GitHub: **Settings ← Pages ← Source: GitHub Actions**. כל דחיפה ל-`main` מפרסמת את האתר.
2. **דומיין:** מגדירים ב-Settings ← Pages את ה-Custom domain, ומוסיפים ב-DNS ארבע רשומות A לכתובות של GitHub Pages ורשומת CNAME ל-www. אחר כך מעדכנים את `siteUrl` ו-`domain` ב-`src/data/site.js`.
3. **Google Search Console:** מאמתים את הדומיין ברשומת TXT, או מדביקים קוד אימות ב-`googleVerification`. אחר כך מגישים את `sitemap.xml`.
4. **לפני השקה:** ממלאים את שדות ה-TODO ב-`src/data/` ומעבירים `draft: false` ב-`src/data/site.js`. כל עוד `draft: true`, האתר מסומן לגוגל `noindex`, כדי שתוכן לדוגמה לא ייכנס לחיפוש.

## טכנולוגיה

HTML סטטי שנוצר בזמן הבנייה מתבניות JavaScript, Tailwind CSS 3 מקומפל, ו-esbuild לקוד הדפדפן.
אין צד שרת ואין מסד נתונים. אפשר לארח בחינם ב-GitHub Pages, Netlify או Cloudflare Pages.

© CheatDay. כל הזכויות שמורות.
