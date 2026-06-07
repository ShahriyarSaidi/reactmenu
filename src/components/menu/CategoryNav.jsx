import { useRef, useEffect, useState, memo } from 'react';
import { ChevronRight } from 'lucide-react';

const CategoryNav = memo(function CategoryNav({ categories, activeCategory, onSelect }) {
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [showRightHint, setShowRightHint] = useState(true);

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
  }, []);

  return (
    <div className="px-4 py-2"
      style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,163,115,0.1)' }}>
      <div className="relative overflow-hidden">
        <nav ref={navRef} className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-1.5 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                ref={(el) => (itemRefs.current[cat] = el)}
                onClick={() => onSelect(cat)}
                className="font-body whitespace-nowrap tracking-wider transition-all duration-200"
                style={{
                  fontSize: 12,
                  paddingLeft: 16, paddingRight: 16,
                  paddingTop: 8, paddingBottom: 8,
                  borderRadius: 999,
                  ...(activeCategory === cat
                    ? { background: 'rgba(212,163,115,0.12)', color: '#D4A373', border: '1px solid rgba(212,163,115,0.5)' }
                    : { color: '#8E8E8E', border: '1px solid transparent' }
                  )
                }}>
                {cat}
              </button>
            ))}
          </div>
        </nav>
        <div className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none flex items-center justify-end pr-1 transition-opacity duration-300"
          style={{ opacity: showRightHint ? 1 : 0, background: 'linear-gradient(90deg, transparent, rgba(10,10,10,0.97))' }}>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(212,163,115,0.5)' }} />
        </div>
      </div>
    </div>
  );
});

export default CategoryNav;
