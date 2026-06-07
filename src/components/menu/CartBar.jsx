import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, ChevronUp, Trash2 } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const gold = '#D4A373';
const goldMid = '#F0C987';

export default memo(function CartBar({ cart, items, onAdd, onRemove, onClear }) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const totalQty = Object.values(cart).reduce((s, q) => s + q, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, qty]) => {
    const item = items.find(i => i.id === id);
    return s + (item ? item.price * qty : 0);
  }, 0);

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ item: items.find(i => i.id === id), qty }))
    .filter(({ item }) => !!item);

  const handleClear = () => {
    if (confirmClear) {
      onClear && onClear();
      setConfirmClear(false);
      setExpanded(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {totalQty > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(12,9,6,0.97)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(212,163,115,0.35)',
            boxShadow: '0 -4px 60px rgba(0,0,0,0.7)',
          }}
        >
          <div className="h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${gold}, ${goldMid}, ${gold}, transparent)` }} />

          {/* Expanded items list */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="px-4 pt-4 pb-2 space-y-2 max-h-56 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                  {cartItems.map(({ item, qty }) => (
                    <div key={item.id}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      {item.image && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-[13px] leading-tight truncate" style={{ color: '#F5F5F0' }}>{item.name}</p>
                        <p className="font-body text-[11px] mt-0.5" style={{ color: gold }}>₼ {(item.price * qty).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center rounded-full overflow-hidden shrink-0"
                        style={{ border: '1px solid rgba(212,163,115,0.4)', background: 'rgba(212,163,115,0.05)' }}>
                        <button onClick={() => onRemove(item.id)}
                          className="flex items-center justify-center"
                          style={{ width: 32, height: 32, color: gold, borderRight: '1px solid rgba(212,163,115,0.2)' }}>
                          <Minus style={{ width: 11, height: 11 }} />
                        </button>
                        <span className="font-display text-xs text-center" style={{ width: 24, color: '#F5F5F0' }}>{qty}</span>
                        <button onClick={() => onAdd(item.id)}
                          className="flex items-center justify-center"
                          style={{ width: 32, height: 32, color: gold, borderLeft: '1px solid rgba(212,163,115,0.2)' }}>
                          <Plus style={{ width: 11, height: 11 }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear all button */}
                <div className="px-4 pb-3">
                  <button
                    onClick={handleClear}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-body text-[10px] tracking-[0.2em] uppercase transition-all duration-200"
                    style={{
                      border: confirmClear ? '1px solid rgba(220,80,80,0.6)' : '1px solid rgba(212,163,115,0.15)',
                      color: confirmClear ? '#E07070' : '#6E6E6E',
                      background: confirmClear ? 'rgba(220,80,80,0.08)' : 'transparent',
                    }}
                  >
                    <Trash2 style={{ width: 12, height: 12 }} />
                    {confirmClear ? t.clearConfirm : t.clearCart}
                  </button>
                </div>

                <div className="h-px mx-4 mb-0" style={{ background: 'rgba(212,163,115,0.1)' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main bar */}
          <div className="flex items-center justify-between px-5 py-4">
            <button onClick={() => setExpanded(e => !e)} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center relative"
                style={{ background: 'rgba(212,163,115,0.12)', border: '1px solid rgba(212,163,115,0.4)' }}>
                <ShoppingBag className="w-4 h-4" style={{ color: gold }} />
                <motion.span
                  key={totalQty}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center font-body text-[9px] font-semibold"
                  style={{ background: gold, color: '#0A0A0A' }}>
                  {totalQty}
                </motion.span>
              </div>
              <div className="text-left">
                <p className="font-body text-[10px] tracking-wider uppercase" style={{ color: '#8E8E8E' }}>{t.total}</p>
                <p className="font-display text-base leading-tight" style={{ color: '#F5F5F0' }}>
                  ₼ {totalPrice.toFixed(2)}
                </p>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ border: '1px solid rgba(212,163,115,0.25)', background: 'rgba(212,163,115,0.05)' }}>
                <div className="w-1 h-1 rounded-full" style={{ background: gold }} />
                <span className="font-body text-xs tracking-wider" style={{ color: gold }}>{totalQty} {t.items}</span>
              </div>
              <button
                onClick={() => setExpanded(e => !e)}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: '1px solid rgba(212,163,115,0.3)', color: gold, background: 'rgba(212,163,115,0.05)' }}
              >
                <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.22 }}>
                  <ChevronUp style={{ width: 14, height: 14 }} />
                </motion.div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
