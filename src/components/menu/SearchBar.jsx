import { useState, memo } from 'react';
import { Search, X, LayoutGrid, AlignJustify } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = memo(function SearchBar({ value, onChange, viewMode, onViewChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="px-4 py-2.5 flex items-center gap-2"
      style={{ background: 'rgba(10,10,10,0.98)', borderBottom: '1px solid rgba(212,163,115,0.08)' }}>
      <div className="flex-1 flex items-center gap-3 px-4 h-9 rounded-full transition-colors duration-200"
        style={{
          background: focused ? 'rgba(212,163,115,0.05)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${focused ? 'rgba(212,163,115,0.35)' : 'rgba(255,255,255,0.07)'}`,
        }}>
        <Search className="w-3.5 h-3.5 shrink-0" style={{ color: focused ? '#D4A373' : '#4A4A4A' }} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Axtar…"
          className="flex-1 bg-transparent outline-none font-body text-[12px] tracking-wider"
          style={{ color: '#E8E0D0', caretColor: '#D4A373' }}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              onClick={() => onChange('')}
              style={{ color: '#4A4A4A' }}>
              <X className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {viewMode && onViewChange && (
        <div className="flex items-center rounded-full overflow-hidden shrink-0"
          style={{ border: '1px solid rgba(212,163,115,0.3)', background: 'rgba(212,163,115,0.03)' }}>
          <button
            onClick={() => onViewChange('grid')}
            className="flex items-center justify-center transition-colors duration-150"
            style={{
              width: 36, height: 36,
              color: viewMode === 'grid' ? '#D4A373' : '#484848',
              background: viewMode === 'grid' ? 'rgba(212,163,115,0.12)' : 'transparent',
              borderRight: '1px solid rgba(212,163,115,0.3)',
            }}>
            <LayoutGrid style={{ width: 14, height: 14 }} />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className="flex items-center justify-center transition-colors duration-150"
            style={{
              width: 36, height: 36,
              color: viewMode === 'list' ? '#D4A373' : '#484848',
              background: viewMode === 'list' ? 'rgba(212,163,115,0.12)' : 'transparent',
            }}>
            <AlignJustify style={{ width: 14, height: 14 }} />
          </button>
        </div>
      )}
    </div>
  );
});

export default SearchBar;
