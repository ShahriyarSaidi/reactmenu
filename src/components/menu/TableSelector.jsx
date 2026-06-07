import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, ChevronRight } from 'lucide-react';

const TABLE_COUNT = 20;

export default function TableSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{ background: '#080808' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(212,163,115,0.08) 0%, transparent 70%)' }} />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A373, #F0C987, #D4A373, transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-sm flex flex-col items-center gap-8"
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ border: '1px solid rgba(212,163,115,0.25)', background: 'rgba(212,163,115,0.06)' }}>
          <UtensilsCrossed className="w-6 h-6" style={{ color: '#D4A373' }} />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center gap-3 justify-center mb-1">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #D4A373)' }} />
            <h1 className="font-display text-2xl tracking-wide" style={{ color: '#F5F5F0' }}>Masa Seçin</h1>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #D4A373, transparent)' }} />
          </div>
          <p className="font-body text-xs tracking-widest uppercase" style={{ color: '#6E6E6E' }}>Sipariş vermeden önce masanızı seçin</p>
        </div>

        {/* Table grid */}
        <div className="grid grid-cols-5 gap-2.5 w-full">
          {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map((num) => (
            <motion.button
              key={num}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelected(num)}
              className="aspect-square rounded-xl flex items-center justify-center font-display text-base transition-all duration-200"
              style={selected === num
                ? { background: 'rgba(212,163,115,0.15)', border: '1px solid rgba(212,163,115,0.5)', color: '#D4A373' }
                : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#6E6E6E' }
              }
            >
              {num}
            </motion.button>
          ))}
        </div>

        {/* Confirm button */}
        <AnimatePresence>
          {selected && (
            <motion.button
              key="confirm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(selected)}
              className="flex items-center gap-3 px-10 py-4 rounded-full font-body text-[11px] tracking-[0.4em] uppercase transition-all duration-300"
              style={{
                border: '1px solid rgba(212,163,115,0.35)',
                color: '#D4A373',
                background: 'rgba(212,163,115,0.06)',
              }}
            >
              Masa {selected} — Devam Et
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A373, #F0C987, #D4A373, transparent)' }} />
    </div>
  );
}