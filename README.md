# Maison — QR Menü

## Qurulum

```bash
npm install
npm run dev
```

Brauzer: http://localhost:5173

---

## Nəyi harada dəyişim?

### 🍽️ Yemək əlavə / dəyişdirmək
`src/data/menuItems.js` — bütün yeməklər buradadır.

```js
{
  id: '1',                         // dəyişməyin
  name: 'Bruschetta',              // Azərcə ad
  name_ru: 'Брускетта',            // Rusca (istəyə görə)
  name_en: 'Bruschetta',           // İngiliscə (istəyə görə)
  description: 'Açıqlama...',
  price: 8,                        // qiymət (rəqəm)
  category: 'Başlanğıclar',        // kateqoriya (aşağıya bax)
  sort_order: 1,                   // sıra nömrəsi
  image: '',                       // URL və ya '/images/fayl.jpg'
  allergens: ['gluten'],           // allergen siyahısı
}
```

**Kateqoriyalar:** `Başlanğıclar` · `Ana Yeməklər` · `Qril` · `İçkilər` · `Şirniyyatlar`

**Allergenlər:** `gluten` · `dairy` · `eggs` · `nuts` · `soy` · `fish` · `shellfish` · `sesame`

---

### 📝 Restoran məlumatları (ünvan, telefon, WiFi, saatlar)
`src/lib/LanguageContext.jsx` — `translations` obyekti içində hər dil üçün dəyişin.

---

### 🖼️ Şəkil əlavə etmək
1. Şəkili `public/images/` qovluğuna qoyun
2. `menuItems.js`-də: `image: '/images/bruschetta.jpg'`
Və ya Unsplash URL: `image: 'https://images.unsplash.com/photo-xxx?w=600'`

---

### 🪑 Masa sayını dəyişmək
`src/components/menu/TableSelector.jsx` — `TABLE_COUNT = 20`

---

### 🌐 Dil parametrləri
`src/lib/LanguageContext.jsx` — `translations` obyektini redaktə edin.

---

## GitHub + Netlify Deploy

```bash
git init
git add .
git commit -m "initial commit"
# GitHub-da repo yarat, sonra:
git remote add origin https://github.com/SƏNIN_AD/repo.git
git push -u origin main
```

Netlify-da: New site → GitHub repo → Build: `npm run build` → Publish: `dist`
