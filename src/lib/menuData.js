import { useEffect, useState } from 'react';
import { menuItems as fallbackMenuItems } from '../data/menuItems';
import { optimizeCloudinaryUrl } from './cloudinary';

const CACHE_KEY = 'maison_menu_items_cache_v3';
const CACHE_TTL = 24 * 60 * 60 * 1000;

const sheetUrl = import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL;

export function useMenuItems() {
  // ✅ Cache-i oxuma — birbaşa fallback ilə başla, sheet gələndə əvəz et
  const [items, setItems] = useState(() => normalizeMenuItems(fallbackMenuItems));
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let ignore = false;

    // Köhnə cache versiyalarını təmizlə
    try {
      ['v1', 'v2'].forEach(v => localStorage.removeItem(`maison_menu_items_cache_${v}`));
    } catch {}

    async function loadMenu() {
      if (!sheetUrl) {
        setStatus('fallback');
        return;
      }

      // v3 cache varsa işlət
      const cachedItems = getCachedItems();
      if (cachedItems) {
        if (!ignore) {
          setItems(cachedItems);
          setStatus('cached');
        }
        return;
      }

      try {
        const response = await fetch(sheetUrl, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Google Sheets returned ${response.status}`);

        const csv = await response.text();
        const nextItems = normalizeMenuItems(parseCsv(csv));
        if (!nextItems.length) throw new Error('Google Sheets data is empty');

        saveCachedItems(nextItems);
        if (!ignore) {
          setItems(nextItems);
          setStatus('live');
        }
      } catch (error) {
        console.warn('Menu data fallback is active:', error);
        if (!ignore) {
          setItems(normalizeMenuItems(fallbackMenuItems));
          setStatus('fallback');
        }
      }
    }

    loadMenu();
    return () => { ignore = true; };
  }, []);

  return { items, status };
}

function getCachedItems() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const cache = JSON.parse(raw);
    if (!cache?.timestamp || !Array.isArray(cache.items)) return null;
    if (Date.now() - cache.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cache.items;
  } catch {
    return null;
  }
}

function saveCachedItems(items) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), items }));
  } catch {}
}

function normalizeMenuItems(items) {
  return items
    .map((item, index) => ({
      id: stringValue(getField(item, ['id', 'ID']) || index + 1),
      name: stringValue(getField(item, ['name', 'ad', 'Ad'])),
      name_ru: stringValue(getField(item, ['name_ru', 'ad_ru'])),
      name_en: stringValue(getField(item, ['name_en', 'ad_en'])),
      description: stringValue(getField(item, ['description', 'aciqlama', 'açıqlama'])),
      description_ru: stringValue(getField(item, ['description_ru', 'aciqlama_ru', 'açıqlama_ru'])),
      description_en: stringValue(getField(item, ['description_en', 'aciqlama_en', 'açıqlama_en'])),
      price: parsePrice(getField(item, ['price', 'qiymet', 'qiymət', 'Qiymet', 'Qiymət'])),
      category: stringValue(getField(item, ['category', 'kateqoriya', 'Kateqoriya'])),
      sort_order: parsePrice(getField(item, ['sort_order', 'sira', 'sıra'])) || index + 1,
      image: optimizeCloudinaryUrl(stringValue(getField(item, ['image', 'sekil', 'şəkil', 'Sekil', 'Şəkil']))),
    }))
    .filter((item) => item.id && item.name && item.category)
    .sort((a, b) => a.category.localeCompare(b.category) || a.sort_order - b.sort_order);
}

function getField(item, names) {
  for (const name of names) {
    if (item[name] != null && item[name] !== '') return item[name];
  }
  return '';
}

function parsePrice(value) {
  if (typeof value === 'number') return value;
  const cleaned = stringValue(value)
    .replace(',', '.')
    .replace(/[^0-9.]/g, '');
  return Number.parseFloat(cleaned) || 0;
}

function stringValue(value) {
  return value == null ? '' : String(value).trim();
}

function parseCsv(csv) {
  const rows = csvToRows(csv);
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows
    .filter((row) => row.some((cell) => cell.trim()))
    .map((row) => headers.reduce((item, header, index) => {
      item[header] = row[index] || '';
      return item;
    }, {}));
}

function csvToRows(csv) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);
  return rows;
}
