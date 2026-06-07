import { Instagram, MessageCircle, Facebook } from 'lucide-react';

const socials = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: MessageCircle, href: "https://wa.me/905551234567", label: "WhatsApp" },
];

export default function SocialIcons() {
  return (
    <div className="flex flex-col gap-4">
      {socials.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300 backdrop-blur-md bg-white/5"
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}