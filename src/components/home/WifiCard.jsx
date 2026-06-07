import { useState } from 'react';
import { Wifi, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function WifiCard() {
  const [copied, setCopied] = useState(false);
  const wifiName = "MAISON_GUEST";
  const wifiPass = "maison2024";

  const copyPassword = () => {
    navigator.clipboard.writeText(wifiPass);
    setCopied(true);
    toast.success("Şifre kopyalandı");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2 text-primary">
        <Wifi className="w-4 h-4" />
        <span className="text-xs font-body uppercase tracking-widest">Wi-Fi</span>
      </div>
      <div className="space-y-1">
        <p className="text-foreground font-body text-sm">{wifiName}</p>
        <button
          onClick={copyPassword}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
        >
          <span className="font-mono tracking-wider">{wifiPass}</span>
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}