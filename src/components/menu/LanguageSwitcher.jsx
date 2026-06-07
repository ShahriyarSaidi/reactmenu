import { useState, useRef, useEffect, memo } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const LANGS = [{ code: 'az', label: 'AZ' }, { code: 'ru', label: 'RU' }, { code: 'en', label: 'EN' }];

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGS.find(l => l.code === lang);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 rounded-full font-body text-[10px] tracking-[0.25em] uppercase"
        style={{ height: 36, border: '1px solid rgba(212,163,115,0.4)', background: 'rgba(212,163,115,0.05)', color: '#D4A373' }}>
        {current?.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3 h-3" style={{ color: '#D4A373' }} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 rounded-xl overflow-hidden z-50"
            style={{ background: 'rgba(14,11,8,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212,163,115,0.18)', minWidth: 72, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            {LANGS.map(({ code, label }) => (
              <button key={code} onClick={() => { setLang(code); setOpen(false); }}
                className="w-full flex items-center justify-center px-4 font-body text-[10px] tracking-[0.25em] uppercase transition-colors duration-150"
                style={{ height: 40, color: lang === code ? '#D4A373' : '#6E6E6E', background: lang === code ? 'rgba(212,163,115,0.08)' : 'transparent', borderBottom: code !== 'en' ? '1px solid rgba(212,163,115,0.1)' : 'none' }}>
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default LanguageSwitcher;
