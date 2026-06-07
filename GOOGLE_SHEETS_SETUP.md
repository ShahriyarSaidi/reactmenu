# Google Sheets, Cloudinary, Netlify setup

## Google Sheets data

Publish the Google Sheet as CSV and put the URL into a `.env` file:

```bash
VITE_GOOGLE_SHEETS_CSV_URL=https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_SHEET_ID/pub?output=csv
```

Required Sheet headers:

```text
id,name,name_ru,name_en,description,description_ru,description_en,price,category,sort_order,image,allergens
```

Use these category values so the existing menu sections keep working:

```text
Baslangiclar
Ana Yemekler
Qril
Ickiler
Sirniyyatlar
```

If you keep the current Azerbaijani category names from `src/data/menuItems.js`, those also work.

For allergens, separate values with commas or semicolons:

```text
gluten,dairy,eggs
```

## 24 hour localStorage cache

The app stores the Google Sheets menu data in `localStorage` for 24 hours. If the Sheet URL is empty or the Sheet request fails, the app automatically uses `src/data/menuItems.js` as fallback data.

## Cloudinary images

Any image URL from `res.cloudinary.com` is automatically optimized with:

```text
w_600,q_auto,f_auto
```

## Netlify

`netlify.toml` is already included:

```text
Build command: npm run build
Publish directory: dist
```
