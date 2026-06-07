// ============================================================
//  MENYU MƏHSULLARİ — buradan redaktə edin
//
//  Hər məhsul üçün sahələr:
//    id          — unikal nömrə (dəyişməyin)
//    name        — Azərbaycanca ad
//    name_ru     — Rusca ad (istəyə görə)
//    name_en     — İngiliscə ad (istəyə görə)
//    description — Azərbaycanca açıqlama
//    description_ru / description_en — digər dillər (istəyə görə)
//    price       — qiymət (rəqəm)
//    category    — KATEQORİYA (aşağıdakı siyahıdan biri olmalıdır):
//                  'Başlanğıclar' | 'Ana Yeməklər' | 'Qril' | 'İçkilər' | 'Şirniyyatlar'
//    sort_order  — sıralama (1-dən başlayır)
//    image       — şəkil URL-i və ya '/images/fayl.jpg' (boş buraxsanız şəkil olmur)
//    allergens   — allergen siyahısı (boş [] ola bilər)
//                  mümkün dəyərlər: 'gluten','dairy','eggs','nuts','soy','fish','shellfish','sesame'
// ============================================================

export const menuItems = [

  // ── Başlanğıclar ───────────────────────────────────────────
  {
    id: '1',
    name: 'Bruschetta', name_ru: 'Брускетта', name_en: 'Bruschetta',
    description: 'Pomidor, reyhan və zeytinyağı ilə', description_ru: 'С томатами, базиликом и оливковым маслом', description_en: 'With tomatoes, basil and olive oil',
    price: 8, category: 'Başlanğıclar', sort_order: 1, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: ['gluten'],
  },
  {
    id: '2',
    name: 'Humus', name_ru: 'Хумус', name_en: 'Hummus',
    description: 'Noxud ezmesi, tahini və zeytinyağı ilə', description_ru: 'Паста из нута с тахини и оливковым маслом', description_en: 'Chickpea paste with tahini and olive oil',
    price: 7, category: 'Başlanğıclar', sort_order: 2, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: ['sesame'],
  },
  {
    id: '3',
    name: 'Karides Güveç', name_ru: 'Креветки в горшочке', name_en: 'Shrimp Casserole',
    description: 'Kərə yağı, sarımsaq və cəfəri ilə', description_ru: 'С маслом, чесноком и петрушкой', description_en: 'With butter, garlic and parsley',
    price: 14, category: 'Başlanğıclar', sort_order: 3, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: ['shellfish', 'dairy'],
  },

  // ── Ana Yeməklər ───────────────────────────────────────────
  {
    id: '4',
    name: 'Quzu Tandır', name_ru: 'Баранина Тандыр', name_en: 'Lamb Tandoor',
    description: '12 saat sobada bişirilmiş quzu əti', description_ru: 'Баранина, запечённая 12 часов в тандыре', description_en: 'Slow-roasted lamb, 12 hours in the oven',
    price: 28, category: 'Ana Yeməklər', sort_order: 1, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: [],
  },
  {
    id: '5',
    name: 'Somon Fileto', name_ru: 'Филе лосося', name_en: 'Salmon Fillet',
    description: 'Limon-kərə yağı sousu və kapers ilə', description_ru: 'С соусом из лимона и сливочного масла, каперсы', description_en: 'Lemon butter sauce and capers',
    price: 24, category: 'Ana Yeməklər', sort_order: 2, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: ['fish', 'dairy'],
  },
  {
    id: '6',
    name: 'Göbələkli Risotto', name_ru: 'Ризотто с грибами', name_en: 'Mushroom Risotto',
    description: 'Parmezan və təzə kəkotu ilə', description_ru: 'С пармезаном и свежим тимьяном', description_en: 'With parmesan and fresh thyme',
    price: 18, category: 'Ana Yeməklər', sort_order: 3, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: ['dairy'],
  },

  // ── Qril ───────────────────────────────────────────────────
  {
    id: '7',
    name: 'Dana Bonfile', name_ru: 'Говяжье филе', name_en: 'Beef Tenderloin',
    description: '250q, öz suyunda bişirilmiş', description_ru: '250г, приготовленное в собственном соку', description_en: '250g, cooked in its own juices',
    price: 36, category: 'Qril', sort_order: 1, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: [],
  },
  {
    id: '8',
    name: 'Quzu Pirzola', name_ru: 'Бараньи рёбрышки', name_en: 'Lamb Chops',
    description: '4 ədəd, nar ekşisi və ədviyyatlar ilə', description_ru: '4 шт., с гранатовым соусом и специями', description_en: '4 pcs, pomegranate glaze and spices',
    price: 32, category: 'Qril', sort_order: 2, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: [],
  },
  {
    id: '9',
    name: 'Toyuq Şiş', name_ru: 'Куриный шашлык', name_en: 'Chicken Skewer',
    description: 'Marinad edilmiş, tərəvəzli', description_ru: 'Маринованный, с овощами', description_en: 'Marinated, with vegetables',
    price: 16, category: 'Qril', sort_order: 3, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: [],
  },

  // ── İçkilər ────────────────────────────────────────────────
  {
    id: '10',
    name: 'Limonad', name_ru: 'Лимонад', name_en: 'Lemonade',
    description: 'Təzə sıxılmış, nanə yarpağı ilə', description_ru: 'Свежевыжатый, с мятой', description_en: 'Freshly squeezed, with mint',
    price: 5, category: 'İçkilər', sort_order: 1, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: [],
  },
  {
    id: '11',
    name: 'Azərbaycan Çayı', name_ru: 'Азербайджанский чай', name_en: 'Azerbaijani Tea',
    description: 'Ənənəvi armudu stəkanda', description_ru: 'В традиционном армудном стакане', description_en: 'Traditional pear-shaped glass',
    price: 3, category: 'İçkilər', sort_order: 2, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: [],
  },
  {
    id: '12',
    name: 'Türk Qəhvəsi', name_ru: 'Турецкий кофе', name_en: 'Turkish Coffee',
    description: 'Ənənəvi hazırlanış, rahat ilə', description_ru: 'Традиционное приготовление, с рахат-лукумом', description_en: 'Traditional brew, with Turkish delight',
    price: 4, category: 'İçkilər', sort_order: 3, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: [],
  },

  // ── Şirniyyatlar ───────────────────────────────────────────
  {
    id: '13',
    name: 'Künəfə', name_ru: 'Кюнефе', name_en: 'Kunefe',
    description: 'Qaymaq və şərbət ilə', description_ru: 'Со сливками и сиропом', description_en: 'With cream and syrup',
    price: 9, category: 'Şirniyyatlar', sort_order: 1, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: ['gluten', 'dairy'],
  },
  {
    id: '14',
    name: 'Sütlaç', name_ru: 'Рисовый пудинг', name_en: 'Rice Pudding',
    description: 'Fırın sütlaç, darçın ilə', description_ru: 'Запечённый рисовый пудинг с корицей', description_en: 'Baked rice pudding with cinnamon',
    price: 7, category: 'Şirniyyatlar', sort_order: 2, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: ['dairy'],
  },
  {
    id: '15',
    name: 'Şokoladlı Sufle', name_ru: 'Шоколадное суфле', name_en: 'Chocolate Soufflé',
    description: 'İsti servis, dondurma ilə', description_ru: 'Горячая подача, с мороженым', description_en: 'Served hot, with ice cream',
    price: 10, category: 'Şirniyyatlar', sort_order: 3, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80', allergens: ['gluten', 'dairy', 'eggs'],
  },
];
