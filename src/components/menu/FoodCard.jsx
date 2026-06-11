import { memo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const gold = '#D4A373';

function CardImage({ src, alt, className, style }) {
  return (
    <img src={src} alt={alt} className={className} style={style} loading="eager" />
  );
}

const FoodCard = memo(function FoodCard({ item, qty, onAdd, onRemove, horizontal = false, highlight = '' }) {
  const { t } = useLang();

  const hilite = (text) => {
    if (!highlight?.trim() || !text) return text;
    const regex = new RegExp(`(${highlight.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} style={{ background: 'rgba(212,163,115,0.25)', color: '#F0C987', borderRadius: 2, padding: '0 1px' }}>{part}</mark>
        : part
    );
  };

  const Counter = ({ sm }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="inline-flex items-center rounded-full overflow-hidden"
      style={{ border: '1px solid rgba(212,163,115,0.5)', background: 'rgba(212,163,115,0.06)' }}
    >
      <button onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="flex items-center justify-center"
        style={{ width: sm ? 28 : 32, height: sm ? 28 : 32, color: gold, borderRight: '1px solid rgba(212,163,115,0.25)' }}>
        <Minus style={{ width: sm ? 11 : 13, height: sm ? 11 : 13 }} />
      </button>
      <span className="font-display text-xs text-center" style={{ width: sm ? 22 : 26, color: '#F5F5F0' }}>{qty}</span>
      <button onClick={(e) => { e.stopPropagation(); onAdd(); }}
        className="flex items-center justify-center"
        style={{ width: sm ? 28 : 32, height: sm ? 28 : 32, color: gold, borderLeft: '1px solid rgba(212,163,115,0.25)' }}>
        <Plus style={{ width: sm ? 11 : 13, height: sm ? 11 : 13 }} />
      </button>
    </motion.div>
  );

  const AddBtn = ({ full, sm }) => (
    <button onClick={onAdd}
      className={`${full ? 'w-full' : ''} flex items-center justify-center gap-1.5 rounded-full font-body tracking-[0.15em] uppercase transition-all duration-200`}
      style={{
        fontSize: 10,
        paddingLeft: sm ? 12 : 16,
        paddingRight: sm ? 12 : 16,
        paddingTop: sm ? 6 : 8,
        paddingBottom: sm ? 6 : 8,
        border: '1px solid rgba(212,163,115,0.33)',
        color: 'rgba(192,144,96,0.9)',
        background: 'rgba(212,163,115,0.03)',
      }}>
      <Plus style={{ width: 11, height: 11 }} />
      {t.addBtn}
    </button>
  );

  if (horizontal) {
    return (
      <div className="flex items-stretch rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(145deg, #141414, #0F0F0F)',
          border: `1px solid ${qty > 0 ? 'rgba(212,163,115,0.35)' : 'rgba(255,255,255,0.06)'}`,
        }}>
        {item.image ? (
          <div className="w-28 shrink-0 overflow-hidden" style={{ position: 'relative' }}>
            <CardImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-1 shrink-0" style={{ background: 'linear-gradient(180deg, rgba(212,163,115,0.5), rgba(212,163,115,0.05))' }} />
        )}
        <div className="flex-1 min-w-0 flex flex-col px-3 py-3 gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[14px] leading-[1.4]" style={{ color: '#EDE8DF' }}>{hilite(item.name)}</h3>
            <span className="font-body text-sm shrink-0" style={{ color: gold }}>₼ {item.price}</span>
          </div>
          {item.description && (
            <p className="font-body text-[11px] leading-[1.6]" style={{ color: '#585858' }}>{hilite(item.description)}</p>
          )}
          <div className="mt-auto pt-1">
            {qty === 0 ? <AddBtn sm /> : <Counter sm />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl flex flex-col transition-all duration-300 h-full"
      style={{
        background: 'linear-gradient(145deg, #141414, #0F0F0F)',
        border: `1px solid ${qty > 0 ? 'rgba(212,163,115,0.35)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: qty > 0 ? '0 4px 24px rgba(0,0,0,0.5), 0 0 20px rgba(212,163,115,0.05)' : '0 2px 12px rgba(0,0,0,0.3)',
      }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,163,115,0.12), transparent)' }} />

      {item.image ? (
        <div className="aspect-[4/3] overflow-hidden shrink-0">
          <CardImage
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="px-3 pt-3 pb-3 flex flex-col flex-1 gap-1">
        <div className="flex items-baseline justify-between gap-2 mb-0.5">
          <h3 className="font-display text-[14px] leading-[1.45]" style={{ color: '#EDE8DF' }}>{hilite(item.name)}</h3>
          <span className="font-body text-sm shrink-0" style={{ color: gold }}>₼ {item.price}</span>
        </div>
        <p className="font-body text-[11px] leading-[1.55]"
          style={{
            color: '#585858',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4em',
          }}>
          {item.description ? hilite(item.description) : ''}
        </p>
        <div className="mt-auto pt-2.5">
          {qty === 0 ? <AddBtn full /> : <div className="flex justify-center"><Counter /></div>}
        </div>
      </div>
    </div>
  );
});

export default FoodCard;