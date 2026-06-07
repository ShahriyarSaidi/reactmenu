import { MapPin, Phone, Clock } from 'lucide-react';

export default function ContactFooter() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 text-foreground/80 hover:text-primary transition-colors"
      >
        <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
        <span className="text-sm font-body leading-relaxed">
          İstiklal Caddesi No:42, Beyoğlu / İstanbul
        </span>
      </a>
      <a
        href="tel:+902121234567"
        className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
      >
        <Phone className="w-4 h-4 shrink-0 text-primary" />
        <span className="text-sm font-body">+90 212 123 45 67</span>
      </a>
      <div className="flex items-center gap-3 text-foreground/60">
        <Clock className="w-4 h-4 shrink-0 text-primary/60" />
        <span className="text-sm font-body">Her gün 11:00 – 00:00</span>
      </div>
    </div>
  );
}