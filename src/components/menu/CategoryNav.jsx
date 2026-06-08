import { useRef, useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, UtensilsCrossed, Wine } from 'lucide-react';

const gold = '#D4A373';

// Hansı kateqoriyalar hansı taba aid
const FOOD_CATS = ['Başlanğıclar', 'Ana Yeməklər', 'Qril', 'Şirniyyatlar', 'Закуски', 'Основные блюда', 'Гриль', 'Десерты', 'Starters', 'Main Course', 'Grill', 'Desserts'];
const DRINK_CATS = ['İçkilər', 'Crazy Shakes', 'Wines', 'Cocktails', 'Spirits', 'Напитки', 'Drinks'];

export function getTabForCategory(cat) {
  if (DRINK_CATS.some(d => cat?.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(cat?.toLowerCase()))) return 'drinks';
  return 'food';
}

const CategoryNav = memo(function CategoryNav({ categories, activeCategory, onSelect, activeTab, onTabChange }) {
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [showRightHint, setShowRightHint] = useState(true);

  const foodCats = categories.filter(c => getTabForCategory(c) === 'food');
  const drinkCats = categories.filter(c => getTabForCategory(c) === 'drinks');
  const currentCats = activeTab === 'food' ? foodCats : drinkCats;

  const checkScroll = () => {
    const nav = navRef.current;
    if (!nav) return;
    setShowRightHint(nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 4);
  };

  useEffect(() => {
    const el = itemRefs.current[activeCategory];
    if (el && navRef.current) {
      const nav = navRef.current;
      nav.scrollTo({ left: el.offsetLeft - nav.offsetWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  }, [activeCategory]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    checkScroll();
    nav.addEventListener('scroll', checkScroll, { passive: true });
    return () => nav.removeEventListener('scroll', checkScroll);
  }, [activeTab]);

  return (
    <div style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,163,115,0.08)' }}>

      {/* ✅ Luxury Tab Switcher */}
      <div className="px-4 pt-3 pb-2 flex justify-center">
        <div className="relative flex items-center rounded-full p-[3px]"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,163,115,0.2)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
          }}>

          {/* Sliding indicator */}
          <motion.div
            layout
            layoutId="tab-indicator"
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="absolute top-[3px] bottom-[3px] rounded-full"
            style={{
              left: activeTab === 'food' ? 3 : '50%',
              right: activeTab === 'food' ? '50%' : 3,
              background: 'linear-gradient(135deg, rgba(212,163,115,0.18), rgba(212,163,115,0.08))',
              border: '1px solid rgba(212,163,115,0.45)',
              boxShadow: '0 0 12px rgba(212,163,115,0.1)',
            }}
          />

          {[
            { key: 'food', label: 'Yeməklər', labelRu: 'Еда', labelEn: 'Food', icon: UtensilsCrossed },
            { key: 'drinks', label: 'İçkilər', labelRu: 'Напитки', labelEn: 'Drinks', icon: Wine },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                onTabChange(key);
                const cats = key === 'food' ? foodCats : drinkCats;
                if (cats.length > 0) onSelect(cats[0]);
              }}
              className="relative z-10 flex items-center gap-2 font-body tracking-[0.15em] uppercase transition-colors duration-300"
              style={{
                fontSize: 11,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 9,
                paddingBottom: 9,
                color: activeTab === key ? gold : 'rgba(100,100,100,0.8)',
                minWidth: 120,
                justifyContent: 'center',
              }}
            >
              <Icon style={{ width: 13, height: 13 }} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div className="px-4 pb-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden"
          >
            <nav ref={navRef} className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}
              onScroll={checkScroll}>
              <div className="flex gap-1.5 min-w-max">
                {currentCats.map((cat) => (
                  <button
                    key={cat}
                    ref={(el) => (itemRefs.current[cat] = el)}
                    onClick={() => onSelect(cat)}
                    className="font-body whitespace-nowrap tracking-wider transition-all duration-200"
                    style={{
                      fontSize: 12,
                      paddingLeft: 16, paddingRight: 16,
                      paddingTop: 7, paddingBottom: 7,
                      borderRadius: 999,
                      ...(activeCategory === cat
                        ? { background: 'rgba(212,163,115,0.12)', color: gold, border: '1px solid rgba(212,163,115,0.5)' }
                        : { color: '#6E6E6E', border: '1px solid rgba(255,255,255,0.06)' }
                      )
                    }}>
                    {cat}
                  </button>
                ))}
              </div>
            </nav>
            <div className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none flex items-center justify-end pr-1"
              style={{ opacity: showRightHint ? 1 : 0, background: 'linear-gradient(90deg, transparent, rgba(10,10,10,0.97))', transition: 'opacity 0.3s' }}>
              <ChevronRight className="w-3 h-3" style={{ color: 'rgba(212,163,115,0.4)' }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export default CategoryNav;
