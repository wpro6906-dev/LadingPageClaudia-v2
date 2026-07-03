import { useState, type ComponentType } from "react";
import {
  Home, Link as LinkIcon, Globe, Phone, Mail, MapPin, Star, Key, Building2,
  ChevronRight, ChevronDown, Linkedin, Twitter, Youtube, Award, TrendingUp, Briefcase,
  Heart, ThumbsUp, Calendar, Clock, User, Users, MessageCircle, DollarSign,
  Percent, Search, ShieldCheck, Zap, CheckCircle2, Sparkles, Flower2, Sun,
  Moon, Feather, Leaf, Wind, HandHeart, PlayCircle,
} from "lucide-react";
import { SiWhatsapp, SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

export function getIconComponent(name: string) {
  const n = name.toLowerCase();
  switch (n) {
    case "instagram":     return SiInstagram;
    case "facebook":      return SiFacebook;
    case "whatsapp":      return SiWhatsapp;
    case "tiktok":        return SiTiktok;
    case "linkedin":      return Linkedin;
    case "twitter": case "x": return Twitter;
    case "youtube":       return Youtube;
    case "phone":         return Phone;
    case "mail": case "email": return Mail;
    case "mappin": case "location": return MapPin;
    case "star":          return Star;
    case "key":           return Key;
    case "building": case "building2": return Building2;
    case "home":          return Home;
    case "globe": case "website": return Globe;
    case "users":         return Users;
    case "user":          return User;
    case "award":         return Award;
    case "trendingup":    return TrendingUp;
    case "briefcase":     return Briefcase;
    case "heart":         return Heart;
    case "thumbsup":      return ThumbsUp;
    case "calendar":      return Calendar;
    case "clock":         return Clock;
    case "messagecircle": return MessageCircle;
    case "dollar": case "dollarsign": return DollarSign;
    case "percent":       return Percent;
    case "search":        return Search;
    case "shieldcheck":   return ShieldCheck;
    case "zap":           return Zap;
    case "checkcircle2":  return CheckCircle2;
    case "sparkles": case "sparkle": return Sparkles;
    case "flower2": case "flower": return Flower2;
    case "sun":           return Sun;
    case "moon":          return Moon;
    case "feather": case "angel": return Feather;
    case "leaf":          return Leaf;
    case "wind":          return Wind;
    case "handheart": case "gratitude": return HandHeart;
    case "playcircle": case "meditation": return PlayCircle;
    default:              return LinkIcon;
  }
}

export { ChevronRight };

// ── Shared visual icon catalogue & picker ───────────────────────────────────
// Used anywhere in the admin dashboard where an icon needs to be chosen, so
// nobody ever has to type an icon name — everything is click-to-select.

export type IconEntry = { key: string; label: string; Icon: ComponentType<{ className?: string }> };
export type IconGroup = { group: string; icons: IconEntry[] };

export const ICON_GROUPS: IconGroup[] = [
  {
    group: "Espiritual",
    icons: [
      { key: "sun",        label: "Sol",        Icon: Sun },
      { key: "sparkles",   label: "Destellos",  Icon: Sparkles },
      { key: "flower2",    label: "Flor",       Icon: Flower2 },
      { key: "moon",       label: "Luna",       Icon: Moon },
      { key: "feather",    label: "Ángeles",    Icon: Feather },
      { key: "leaf",       label: "Hoja",       Icon: Leaf },
      { key: "wind",       label: "Viento",     Icon: Wind },
      { key: "handheart",  label: "Gratitud",   Icon: HandHeart },
      { key: "heart",      label: "Corazón",    Icon: Heart },
      { key: "playcircle", label: "Meditación", Icon: PlayCircle },
      { key: "star",       label: "Estrella",   Icon: Star },
      { key: "shieldcheck",label: "Protección", Icon: ShieldCheck },
    ],
  },
  {
    group: "Redes sociales",
    icons: [
      { key: "instagram",  label: "Instagram",  Icon: SiInstagram as ComponentType<{ className?: string }> },
      { key: "whatsapp",   label: "WhatsApp",   Icon: SiWhatsapp as ComponentType<{ className?: string }> },
      { key: "youtube",    label: "YouTube",    Icon: Youtube },
      { key: "facebook",   label: "Facebook",   Icon: SiFacebook as ComponentType<{ className?: string }> },
      { key: "tiktok",     label: "TikTok",     Icon: SiTiktok as ComponentType<{ className?: string }> },
      { key: "linkedin",   label: "LinkedIn",   Icon: Linkedin },
      { key: "twitter",    label: "Twitter",    Icon: Twitter },
      { key: "globe",      label: "Sitio Web",  Icon: Globe },
    ],
  },
  {
    group: "Contacto",
    icons: [
      { key: "phone",         label: "Teléfono", Icon: Phone },
      { key: "mail",          label: "Correo",   Icon: Mail },
      { key: "messagecircle", label: "Mensaje",  Icon: MessageCircle },
      { key: "mappin",        label: "Ubicación",Icon: MapPin },
      { key: "calendar",      label: "Fecha",    Icon: Calendar },
      { key: "clock",         label: "Tiempo",   Icon: Clock },
    ],
  },
  {
    group: "General",
    icons: [
      { key: "home",         label: "Casa",       Icon: Home },
      { key: "building2",    label: "Edificio",   Icon: Building2 },
      { key: "key",          label: "Llave",      Icon: Key },
      { key: "award",        label: "Premio",     Icon: Award },
      { key: "checkcircle2", label: "Verificado", Icon: CheckCircle2 },
      { key: "users",        label: "Clientes",   Icon: Users },
      { key: "user",         label: "Persona",    Icon: User },
      { key: "thumbsup",     label: "Aprobado",   Icon: ThumbsUp },
      { key: "trendingup",   label: "Tendencia",  Icon: TrendingUp },
      { key: "briefcase",    label: "Negocio",    Icon: Briefcase },
      { key: "dollar",       label: "Precio",     Icon: DollarSign },
      { key: "percent",      label: "Descuento",  Icon: Percent },
      { key: "search",       label: "Buscar",     Icon: Search },
      { key: "zap",          label: "Rápido",     Icon: Zap },
    ],
  },
];

export const ALL_ICONS: IconEntry[] = ICON_GROUPS.flatMap(g => g.icons);

export function IconPicker({ value, onChange }: { value: string; onChange: (key: string) => void }) {
  const [open, setOpen] = useState(false);
  const current = ALL_ICONS.find(e => e.key === value?.toLowerCase()) ?? ALL_ICONS[0];
  const CurrentIcon = current.Icon;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md border border-input bg-background text-sm hover:bg-accent transition-colors"
      >
        <span className="flex items-center gap-2">
          <CurrentIcon className="w-4 h-4 shrink-0" />
          <span className="truncate text-xs text-muted-foreground">{current.label}</span>
        </span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-50 bg-popover border border-border rounded-xl shadow-xl p-3 w-72 max-h-80 overflow-y-auto">
            {ICON_GROUPS.map(({ group, icons }) => (
              <div key={group} className="mb-3 last:mb-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-1.5 px-0.5">{group}</p>
                <div className="grid grid-cols-5 gap-1">
                  {icons.map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      title={label}
                      onClick={() => { onChange(key); setOpen(false); }}
                      className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-[10px] transition-colors hover:bg-accent ${value?.toLowerCase() === key ? "bg-primary/15 ring-1 ring-primary/50 text-primary" : "text-muted-foreground"}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="leading-none truncate w-full text-center">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
