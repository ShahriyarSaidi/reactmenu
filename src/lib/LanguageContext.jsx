import { createContext, useContext, useState, useEffect } from 'react';

export const translations = {
  az: {
    // Home
    location: 'Bakı, Azərbaycan',
    estYear: 'Quruluş tarixi: 2018',
    fineDining: 'Fine Dining & Lounge',
    viewMenu: 'Menyuya Bax',
    wifi: 'Wi-Fi',
    wifiName: 'COFFEELEA_GUEST',
    wifiPass: 'coffeelea2024',
    address: 'Neftçilər pr. 42, Bakı',
    hours: 'İş Saatları',
    hoursWeekday: 'B.e – Cüm: 12:00 – 23:00',
    hoursWeekend: 'Şnb – Baz: 12:00 – 00:00',
    // Menu
    menu: 'Menü',
    brand: 'Coffeelea Fine Dining',
    loading: 'Hazırlanır',
    soon: '— Tezliklə —',
    total: 'Cəmi',
    items: 'məhsul',
    categories: ['Başlanğıclar', 'Ana Yeməklər', 'Qril', 'Şirniyyatlar', 'İçkilər', 'Crazy Shakes', 'Wines', 'Cocktails', 'Spirits'],
    addBtn: 'Əlavə et',
    serviceCharge: '5% xidmət haqqı qiymətlərə daxil deyil',
    clearCart: 'Hamısını sil',
    clearConfirm: 'Səbəti təmizlə',
  },
  ru: {
    location: 'Баку, Азербайджан',
    estYear: 'Основан в 2018',
    fineDining: 'Изысканная кухня & Лаунж',
    viewMenu: 'Смотреть меню',
    wifi: 'Wi-Fi',
    wifiName: 'COFFEELEA_GUEST',
    wifiPass: 'coffeelea2024',
    address: 'пр. Нефтяников 42, Баку',
    hours: 'Часы работы',
    hoursWeekday: 'Пн – Пт: 12:00 – 23:00',
    hoursWeekend: 'Сб – Вс: 12:00 – 00:00',
    menu: 'Меню',
    brand: 'Coffeelea Fine Dining',
    loading: 'Загрузка',
    soon: '— Скоро —',
    total: 'Итого',
    items: 'блюда',
    categories: ['Закуски', 'Основные блюда', 'Гриль', 'Десерты', 'Напитки', 'Crazy Shakes', 'Wines', 'Cocktails', 'Spirits'],
    addBtn: 'Добавить',
    serviceCharge: 'Сервисный сбор 5% не включён в цены',
    clearCart: 'Очистить всё',
    clearConfirm: 'Очистить корзину',
  },
  en: {
    location: 'Baku, Azerbaijan',
    estYear: 'Est. 2018',
    fineDining: 'Fine Dining & Lounge',
    viewMenu: 'View Menu',
    wifi: 'Wi-Fi',
    wifiName: 'COFFEELEA_GUEST',
    wifiPass: 'coffeelea2024',
    address: '42 Neftchilar Ave, Baku',
    hours: 'Opening Hours',
    hoursWeekday: 'Mon – Fri: 12:00 – 23:00',
    hoursWeekend: 'Sat – Sun: 12:00 – 00:00',
    menu: 'Menu',
    brand: 'Coffeelea Fine Dining',
    loading: 'Loading',
    soon: '— Coming Soon —',
    total: 'Total',
    items: 'items',
    categories: ['Starters', 'Main Course', 'Grill', 'Desserts', 'Drinks', 'Crazy Shakes', 'Wines', 'Cocktails', 'Spirits'],
    addBtn: 'Add',
    serviceCharge: '5% service charge is not included in prices',
    clearCart: 'Clear all',
    clearConfirm: 'Clear cart',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('maison_lang') || 'az');
  const t = translations[lang];

  const handleSetLang = (l) => {
    localStorage.setItem('maison_lang', l);
    setLang(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}