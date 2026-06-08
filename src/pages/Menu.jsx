import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryNav, { getTabForCategory } from '../components/menu/CategoryNav';
import FoodCard from '../components/menu/FoodCard';
import CartBar from '../components/menu/CartBar';
import SearchBar from '../components/menu/SearchBar';
import { useLang } from '@/lib/LanguageContext';

import { useMenuItems } from '@/lib/menuData';

const enumCats = ['Başlanğıclar', 'Ana Yeməklər', 'Qril', 'İçkilər', 'Şirniyyatlar'];
const sheetCategoryAliases = [
  ['Baslangiclar', 'Starters'],
  ['Ana Yemekler', 'Main Course'],
  ['Qril', 'Grill'],
  ['Ickiler', 'Drinks'],
  ['Sirniyyatlar', 'Desserts'],
];

const gold = '#D4A373';
const goldMid = '#F0C987';

export default function Menu() {
  const { t, lang } = useLang();
  const categories = t.categories;
  const { items: menuItems } = useMenuItems();

  // ✅ FIX: sectionRefs artıq düzgün elan edilib
  const sectionRefs = useRef({});

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeTab, setActiveTab] = useState('food');
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_cart');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [viewMode, setViewMode] = useState(() => {
    try { return localStorage.getItem('maison_viewMode') || 'grid'; } catch { return 'grid'; }
  });
  const [search, setSearch] = useState('');

  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current < 200) { setShowScrollTop(false); }
      else if (current < lastScrollY.current) { setShowScrollTop(true); }
      else { setShowScrollTop(false); }
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const isScrollingRef = useRef(false);
  const stickyRef = useRef(null);

  const handleViewChange = (mode) => {
    try { localStorage.setItem('maison_viewMode', mode); } catch {}
    setViewMode(mode);
  };


  // ✅ Cart dəyişəndə localStorage-a yaz
  useEffect(() => {
    try { localStorage.setItem('maison_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  const addToCart = useCallback((id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 })), []);
  const removeFromCart = useCallback((id) => setCart((prev) => {
    const qty = (prev[id] || 0) - 1;
    if (qty <= 0) { const next = { ...prev }; delete next[id]; return next; }
    return { ...prev, [id]: qty };
  }), []);

  const filterItem = (item, catLabel) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = (lang === 'ru' && item.name_ru) ? item.name_ru : (lang === 'en' && item.name_en) ? item.name_en : item.name;
    const desc = (lang === 'ru' && item.description_ru) ? item.description_ru : (lang === 'en' && item.description_en) ? item.description_en : item.description;
    return name?.toLowerCase().includes(q) || desc?.toLowerCase().includes(q) || catLabel?.toLowerCase().includes(q);
  };

  const grouped = categories.reduce((acc, cat, idx) => {
    acc[cat] = menuItems.filter((i) => categoryMatches(i.category, idx) && filterItem(i, cat));
    return acc;
  }, {});

  const getStickyHeight = () => stickyRef.current ? stickyRef.current.offsetHeight + 8 : 110;

  const scrollToCategory = useCallback((cat) => {
    isScrollingRef.current = true;
    setActiveCategory(cat);
    const el = sectionRefs.current[cat];
    if (el) {
      const navHeight = getStickyHeight();
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - navHeight;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      setTimeout(() => { isScrollingRef.current = false; }, 900);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;
    const navHeight = getStickyHeight();
    for (const cat of categories) {
      const el = sectionRefs.current[cat];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navHeight && rect.bottom > navHeight) {
          setActiveCategory(cat);
          setActiveTab(getTabForCategory(cat));
          break;
        }
      }
    }
  }, [categories]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setActiveCategory(categories[0]);
  }, [categories]);

  const bgColor = '#080808';
  const headerBorder = 'rgba(255,255,255,0.04)';
  const backBtnStyle = { border: '1px solid rgba(212,163,115,0.2)', color: '#6E6E6E', background: 'rgba(212,163,115,0.04)' };
  const soonColor = '#2E2E2E';
  const notFoundColor = '#3A3A3A';
  const radialColor = 'rgba(212,163,115,0.08)';

  return (
    <div className="min-h-screen" style={{ background: bgColor, minHeight: '100dvh' }}>
      <div className="fixed top-0 left-0 right-0 h-64 pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse at 50% -20%, ${radialColor} 0%, transparent 70%)` }} />
      <div className="relative z-10 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${gold} 30%, ${goldMid} 50%, ${gold} 70%, transparent 100%)` }} />

      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 flex items-center px-4 pt-5 pb-5"
        style={{ borderBottom: `1px solid ${headerBorder}` }}
      >
        <div className="flex-1 flex items-center gap-2">
          <Link to="/"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={backBtnStyle}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <Link to="/" className="text-center">
          <div className="flex items-center gap-3 justify-center mb-1">
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${gold})` }} />
            <h1 className="font-display text-2xl tracking-wide" style={{ color: '#F5F5F0' }}>{t.menu}</h1>
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${gold}, transparent)` }} />
          </div>
          <p className="font-body text-[9px] tracking-[0.5em] uppercase" style={{ color: gold }}>{t.brand}</p>
        </Link>

        <div className="flex-1" />
      </motion.header>

      <div ref={stickyRef} className="sticky top-0 z-20">
        <SearchBar value={search} onChange={setSearch} viewMode={viewMode} onViewChange={handleViewChange} />
        <CategoryNav categories={categories} activeCategory={activeCategory} onSelect={scrollToCategory} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="relative z-10 px-4 pb-36 pt-6 space-y-16">
        {search.trim() ? (
          <motion.div key="search-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            {(() => {
              const allResults = categories.flatMap((cat) =>
                (grouped[cat] || []).map((item) => ({ item, cat }))
              );
              if (allResults.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ border: `1px solid ${gold}25` }}>
                      <span className="font-display text-xl" style={{ color: notFoundColor }}>∅</span>
                    </div>
                    <p className="font-body text-[10px] tracking-[0.4em] uppercase" style={{ color: notFoundColor }}>{t.noResults || 'Nəticə yoxdur'}</p>
                  </div>
                );
              }
              return (
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-3'}>
                  {allResults.map(({ item }, idx) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.04 }}>
                      <FoodCard item={localizeItem(item, lang)} qty={cart[item.id] || 0}
                        onAdd={() => addToCart(item.id)} onRemove={() => removeFromCart(item.id)}
                        horizontal={viewMode === 'list'} highlight={search} />
                    </motion.div>
                  ))}
                </div>
              );
            })()}
          </motion.div>
        ) : (
          categories.map((cat, catIdx) => (
            <motion.section
              key={cat}
              ref={(el) => (sectionRefs.current[cat] = el)}
              className="scroll-mt-[110px] relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: catIdx * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none"
                style={{ background: `radial-gradient(ellipse, ${radialColor} 0%, transparent 70%)` }} />

              <div className="flex items-center gap-4 mb-6 px-1">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,163,115,0.25))' }} />
                <div className="flex items-center gap-2.5">
                  <div className="w-px h-3" style={{ background: 'linear-gradient(180deg, transparent, #D4A373, transparent)' }} />
                  <h2 className="font-display text-xl tracking-wide" style={{ color: '#E8E0D0' }}>{cat}</h2>
                  <div className="w-px h-3" style={{ background: 'linear-gradient(180deg, transparent, #D4A373, transparent)' }} />
                </div>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(212,163,115,0.25), transparent)' }} />
              </div>

              {grouped[cat]?.length > 0 ? (
                <motion.div
                  key={`${cat}-${viewMode}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                  className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-3'}
                >
                  {grouped[cat].map((item, idx) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }}>
                      <FoodCard item={localizeItem(item, lang)} qty={cart[item.id] || 0}
                        onAdd={() => addToCart(item.id)} onRemove={() => removeFromCart(item.id)}
                        horizontal={viewMode === 'list'} highlight={search} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="font-body text-xs px-2 tracking-widest" style={{ color: soonColor }}>{t.soon}</p>
              )}
            </motion.section>
          ))
        )}
      </div>

      {/* Service charge footer */}
      <div className="relative z-10 px-4 pb-4 flex items-center justify-center gap-2">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,163,115,0.15))' }} />
        <p className="font-body text-[10px] tracking-wider text-center shrink-0" style={{ color: '#585858' }}>
          {t.serviceCharge}
        </p>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(212,163,115,0.15), transparent)' }} />
      </div>

      {/* ✅ Luxury Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={scrollToTop}
            className="fixed z-40 flex items-center justify-center group"
            style={{
              bottom: 96,
              right: 20,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(10,8,5,0.97) 0%, rgba(18,14,8,0.97) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,163,115,0.55)',
              boxShadow: '0 0 0 1px rgba(212,163,115,0.08), 0 0 20px rgba(212,163,115,0.15), 0 8px 32px rgba(0,0,0,0.6)',
              color: '#D4A373',
            }}
          >
            {/* Inner glow ring */}
            <span style={{
              position: 'absolute',
              inset: 3,
              borderRadius: '50%',
              border: '1px solid rgba(212,163,115,0.15)',
              pointerEvents: 'none',
            }} />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}><ArrowUp style={{ width: 16, height: 16, filter: "drop-shadow(0 0 4px rgba(212,163,115,0.5))" }} /></motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <CartBar cart={cart} items={menuItems} onAdd={addToCart} onRemove={removeFromCart} onClear={() => { setCart({}); try { localStorage.removeItem('maison_cart'); } catch {} }} />
    </div>
  );
}

function localizeItem(item, lang) {
  return {
    ...item,
    name: (lang === 'ru' && item.name_ru) ? item.name_ru : (lang === 'en' && item.name_en) ? item.name_en : item.name,
    description: (lang === 'ru' && item.description_ru) ? item.description_ru : (lang === 'en' && item.description_en) ? item.description_en : item.description,
  };
}

function categoryMatches(category, index) {
  return [enumCats[index], ...(sheetCategoryAliases[index] || [])].includes(category);
}
