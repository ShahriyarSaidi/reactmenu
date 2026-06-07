import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Wifi, Copy, Check, Instagram, MessageCircle, Facebook, ArrowRight, Clock } from 'lucide-react';
import { useState, useEffect, memo } from 'react';
import { useLang } from '@/lib/LanguageContext';
import LanguageSwitcher from '@/components/menu/LanguageSwitcher';

const HERO_IMAGE = "https://media.base44.com/images/public/6a1606fc78937bb55187b20e/f5a9dd8a1_generated_5f66308b.png";
const gold = '#D4A373';
const goldMid = '#F0C987';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } })
};

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] } })
};

const InfoCard = memo(({ children, style }) => (
  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', borderRadius: 16, ...style }}>
    {children}
  </div>
));

export default function Home() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  // ✅ FIX: mobil viewport yüksəkliyini düzgün hesabla (tab bar + browser chrome üçün)
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const updateVh = () => {
      // window.innerHeight mobil brauzerdə real görünən sahəni verir (tab bar çıxıldıqdan sonra)
      setVh(window.innerHeight);
      document.documentElement.style.setProperty('--real-vh', `${window.innerHeight}px`);
    };
    updateVh();
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    return () => {
      window.removeEventListener('resize', updateVh);
      window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  const copyPass = () => {
    navigator.clipboard.writeText(t.wifiPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const title = "Coffeelea";
  // ✅ Viewport yüksəkliyi: JS ilə hesablanmış dəyər varsa onu işlət, yoxsa 100dvh
  const minHeightStyle = vh > 0 ? `${vh}px` : '100dvh';

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: '#0A0A0A', minHeight: minHeightStyle, height: minHeightStyle }}
    >
      {/* Hero image — static, no parallax */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.85))' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0A0A0A 5%, transparent 50%)' }} />
      </div>

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${gold}, ${goldMid}, ${gold}, transparent)` }} />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-4">
        <span className="font-body text-[11px] tracking-widest tabular-nums" style={{ color: `${gold}B0` }}>{time}</span>
        <LanguageSwitcher />
      </div>

      {/* ✅ FIX: flex layout tam viewport-u doldurur, content aşağıya sıxılmır */}
      <div className="relative z-10 flex flex-col" style={{ height: minHeightStyle }}>
        {/* Hero center */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-4">

          {/* Top divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-6 w-28">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${gold})` }} />
            <div className="w-1 h-1 rounded-full" style={{ background: gold }} />
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${gold}, transparent)` }} />
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <div className="flex items-end justify-center">
              {title.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-display inline-block"
                  style={{
                    fontSize: 'clamp(52px, 14vw, 96px)',
                    lineHeight: 1,
                    color: '#F5F5F0',
                    textShadow: '0 4px 40px rgba(0,0,0,0.6)',
                  }}>
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <motion.div
            variants={fadeUp} custom={0.9} initial="hidden" animate="show"
            className="font-body text-[10px] tracking-[0.5em] uppercase mb-6"
            style={{ color: 'rgba(212,163,115,0.85)' }}>
            {t.fineDining}
          </motion.div>

          {/* Bottom divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex items-center gap-3 mb-10 w-28">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${gold})` }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ border: `1px solid ${gold}` }} />
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${gold}, transparent)` }} />
          </motion.div>

          {/* CTA button */}
          <motion.div variants={fadeUp} custom={1.2} initial="hidden" animate="show">
            <Link to="/menu"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-body text-[11px] tracking-[0.4em] uppercase transition-all duration-300"
              style={{
                border: `1px solid rgba(212,163,115,0.5)`,
                color: '#F5F5F0',
                backdropFilter: 'blur(10px)',
                background: 'rgba(212,163,115,0.06)',
              }}>
              {t.viewMenu}
              <ArrowRight className="w-3.5 h-3.5" style={{ color: gold }} />
            </Link>
          </motion.div>
        </div>

        {/* ✅ Bottom info cards — safe-area padding əlavə edilib */}
        <motion.div
          variants={fadeUp} custom={1.4} initial="hidden" animate="show"
          className="px-5 space-y-3"
          style={{
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
          }}>

          <div className="h-px mx-4 mb-4"
            style={{ background: `linear-gradient(90deg, transparent, rgba(212,163,115,0.25), transparent)` }} />

          {/* WiFi + Hours */}
          <div className="grid grid-cols-2 gap-2.5">
            <InfoCard style={{ padding: '12px' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <Wifi className="w-3.5 h-3.5 shrink-0" style={{ color: gold }} />
                <span className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: gold }}>{t.wifi}</span>
              </div>
              <p className="font-body text-sm" style={{ color: '#F5F5F0' }}>{t.wifiName}</p>
              <button onClick={copyPass} className="flex items-center gap-2 mt-1" style={{ color: '#8E8E8E' }}>
                <span className="font-mono text-xs tracking-wider">{t.wifiPass}</span>
                {copied ? <Check className="w-3 h-3" style={{ color: gold }} /> : <Copy className="w-3 h-3" />}
              </button>
            </InfoCard>

            <InfoCard style={{ padding: '12px' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: gold }} />
                <span className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: gold }}>{t.hours}</span>
              </div>
              <p className="font-body text-[11px]" style={{ color: '#C0B8A8' }}>{t.hoursWeekday}</p>
              <p className="font-body text-[11px]" style={{ color: '#C0B8A8' }}>{t.hoursWeekend}</p>
            </InfoCard>
          </div>

          {/* Social + Location */}
          <div className="flex items-center gap-2.5">
            <InfoCard style={{ padding: '12px', display: 'flex', flexDirection: 'row', gap: 8, flexShrink: 0 }}>
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Facebook, href: "https://facebook.com" },
                { icon: MessageCircle, href: "https://wa.me/994501234567" }
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#8E8E8E' }}>
                  <Icon style={{ width: 15, height: 15 }} />
                </a>
              ))}
            </InfoCard>

            <InfoCard style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, minWidth: 0 }}>
              <a href="https://maps.google.com/?q=Neftchilar+Avenue+Baku" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(212,163,115,0.1)' }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: gold }} />
                </div>
                <span className="font-body text-xs truncate" style={{ color: '#8E8E8E' }}>{t.address}</span>
              </a>
              <a href="tel:+994501234567" className="shrink-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(212,163,115,0.1)' }}>
                  <Phone className="w-3.5 h-3.5" style={{ color: gold }} />
                </div>
              </a>
            </InfoCard>
          </div>
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${gold}, ${goldMid}, ${gold}, transparent)` }} />
    </div>
  );
}
