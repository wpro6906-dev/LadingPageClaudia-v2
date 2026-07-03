import { useState, useEffect, Fragment } from "react";
import { API_BASE } from "@/lib/api-base";
import { useGetProfile, getGetProfileQueryKey, useGetLinks, getGetLinksQueryKey } from "@workspace/api-client-react";
import logoPath from "@assets/image_1781908878316.png";
import { getIconComponent, ChevronRight } from "@/components/ui/icons";
import { getFontFamily } from "@/components/ui/fonts";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Home, MapPin, Star, Key, Building2, Phone, Mail, Users, Sun, Sparkles, Flower2, Heart, Feather, Leaf } from "lucide-react";
import { BotanicalCorner, BotanicalEdgeVine, BotanicalSprig, BotanicalFlourish } from "@/components/ui/botanical-decor";

interface VisualConfig {
  firstName?: string;
  lastName?: string;
  firstNameColor?: string;
  lastNameColor?: string;
  firstNameFont?: string;
  lastNameFont?: string;
  subtitleText?: string;
  subtitleColor?: string;
  subtitleFont?: string;
  decoratorEnabled?: boolean;
  decoratorIcon?: string;
  decoratorColor?: string;
  tagline1?: string;
  tagline2?: string;
  tagline1Color?: string;
  tagline2Color?: string;
  tagline1Font?: string;
  tagline2Font?: string;
  bgOverlay?: number;
  bgBlur?: number;
  bgZoom?: number;
  bgPosition?: string;
  mobileBgPosition?: string;
  mobileBgZoom?: number;
  mobileBgOverlay?: number;
  gradientTop?: boolean;
  gradientBottom?: boolean;
  showDecorLines?: boolean;
  showGlow?: boolean;
  nameLetterSpacing?: string;
  showArrowOnButtons?: boolean;
  showAccentBarOnButtons?: boolean;
  badgeText?: string;
  badgeIcon?: string;
  badgeColor?: string;
  portraitUrl?: string;
  portraitOpacity?: number;
  portraitSize?: number;
  portraitBlendLeft?: number;
  portraitBlendTop?: number;
  portraitSizeMobile?: number;
  portraitOffsetXMobile?: number;
  portraitOffsetYMobile?: number;
  bgPhrase?: string;
  bgPhraseEnabled?: boolean;
  bgPhraseOpacity?: number;
  bgPhraseFont?: string;
  stats?: { icon: string; value: string; label: string; enabled: boolean }[];
  statsEnabled?: boolean;
  closingPhrase?: string;
  closingPhraseEnabled?: boolean;
  logoSize?: number;
  logoOffsetX?: number;
  logoOffsetY?: number;
  logoSizeMobile?: number;
  logoOffsetXMobile?: number;
  logoOffsetYMobile?: number;
}

function getVC(profile: any): Required<VisualConfig> {
  const defaults = {
    firstName: "Claudia", lastName: "Alzate",
    firstNameColor: "#6B4F8A", lastNameColor: "#C9A15C",
    firstNameFont: "elegante", lastNameFont: "elegante",
    subtitleText: "COACH ESPIRITUAL", subtitleColor: "#8C7AA6", subtitleFont: "moderna",
    decoratorEnabled: true, decoratorIcon: "sun", decoratorColor: "#C9A15C",
    tagline1: "Coach de manifestación y abundancia, facilitadora de ceremonias holísticas", tagline2: "y guía en procesos de transformación.",
    tagline1Color: "#6B5B7B", tagline2Color: "#C9A15C",
    tagline1Font: "moderna", tagline2Font: "elegante",
    bgOverlay: 0.25, bgBlur: 0, bgZoom: 1, bgPosition: "center",
    mobileBgPosition: "60% center", mobileBgZoom: 1.1, mobileBgOverlay: 0.2,
    gradientTop: true, gradientBottom: true, showDecorLines: true, showGlow: true,
    nameLetterSpacing: "0.05em", showArrowOnButtons: true, showAccentBarOnButtons: true,
    badgeText: "", badgeIcon: "sparkles", badgeColor: "#C9A15C",
    portraitUrl: "", portraitOpacity: 0.9, portraitSize: 68,
    portraitBlendLeft: 0, portraitBlendTop: 0,
    portraitSizeMobile: 30, portraitOffsetXMobile: 0, portraitOffsetYMobile: 0,
    bgPhrase: "Guío a mujeres a despertar su luz, conectar con su esencia y manifestar una vida plena y en expansión.", bgPhraseEnabled: true, bgPhraseOpacity: 0.9, bgPhraseFont: "elegante",
    closingPhrase: "Que cada paso te acerque más a tu luz interior.", closingPhraseEnabled: true,
    logoSize: 100, logoOffsetX: 0, logoOffsetY: 0,
    logoSizeMobile: 100, logoOffsetXMobile: 0, logoOffsetYMobile: 0,
    statsEnabled: true,
    stats: [
      { icon: "handheart", value: "", label: "Vivir bajo la luz", enabled: true },
      { icon: "sparkles", value: "500+", label: "Mujeres Acompañadas", enabled: true },
      { icon: "flower2", value: "10+", label: "Años de Experiencia", enabled: true },
      { icon: "feather", value: "100+", label: "Ceremonias Facilitadas", enabled: true },
    ],
  };
  return { ...defaults, ...(profile?.visualConfig || {}) };
}

const STALE_MS = 5 * 60 * 1000;

export default function PublicProfile() {
  const { data: profile } = useGetProfile({
    query: {
      queryKey: getGetProfileQueryKey(),
      staleTime: STALE_MS,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  });

  const { data: links, isLoading: isLinksLoading } = useGetLinks({
    query: {
      queryKey: getGetLinksQueryKey(),
      staleTime: STALE_MS,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  });

  const activeLinks = links?.filter(link => link.active).sort((a, b) => a.order - b.order) || [];

  useEffect(() => {
    fetch(`${API_BASE}/api/analytics/track`, {
      method: 'POST',
      body: JSON.stringify({ type: 'page_view' }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(() => {});
  }, []);

  // Ensure external URLs always have a protocol so browsers never treat them as
  // relative paths (which would let wouter intercept them and show a 404).
  const toExternalUrl = (url: string) => {
    if (!url) return '#';
    if (/^https?:\/\//i.test(url)) return url;
    if (/^mailto:|^tel:|^sms:/i.test(url)) return url;
    return `https://${url}`;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: any) => {
    e.preventDefault();
    // Open immediately — must be synchronous within the user gesture (tap/click)
    // so mobile browsers don't block it as a popup.
    window.open(toExternalUrl(link.url), '_blank', 'noopener,noreferrer');
    // Track analytics in background after navigation is already triggered
    fetch(`${API_BASE}/api/analytics/track`, {
      method: 'POST',
      body: JSON.stringify({ type: 'link_click', linkId: link.id }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(() => {});
  };

  const vc = getVC(profile);
  const firstNameFontFamily = getFontFamily(vc.firstNameFont);
  const lastNameFontFamily = getFontFamily(vc.lastNameFont);
  const subtitleFontFamily = getFontFamily(vc.subtitleFont);
  const tagline1FontFamily = getFontFamily(vc.tagline1Font);
  const tagline2FontFamily = getFontFamily(vc.tagline2Font);
  const bgPhraseFontFamily = getFontFamily(vc.bgPhraseFont);

  const BadgeIcon = (() => {
    const n = vc.badgeIcon?.toLowerCase();
    if (n === "phone") return Phone;
    if (n === "mail") return Mail;
    if (n === "building2" || n === "building") return Building2;
    if (n === "sparkles" || n === "sparkle") return Sparkles;
    if (n === "flower2" || n === "flower") return Flower2;
    if (n === "sun") return Sun;
    if (n === "heart") return Heart;
    if (n === "feather" || n === "angel") return Feather;
    return MapPin;
  })();

  const DecoratorIcon = (() => {
    const name = vc.decoratorIcon?.toLowerCase();
    if (name === "mappin") return MapPin;
    if (name === "star") return Star;
    if (name === "key") return Key;
    if (name === "building2" || name === "building") return Building2;
    if (name === "sparkles" || name === "sparkle") return Sparkles;
    if (name === "flower2" || name === "flower") return Flower2;
    if (name === "sun") return Sun;
    if (name === "heart") return Heart;
    if (name === "feather" || name === "angel") return Feather;
    if (name === "home") return Home;
    return Sun;
  })();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-[100dvh] bg-transparent lg:bg-background text-foreground relative flex flex-col lg:flex-row overflow-hidden lg:overflow-hidden">
      {/* Left Column / Mobile Header */}
      <div className="relative w-full lg:w-[40%] flex flex-col items-center justify-center px-8 pt-6 pb-[46px] lg:p-12 z-10 
        lg:border-r border-primary/15 shrink-0 lg:h-[100dvh] overflow-hidden">

        {/* Mobile background — scoped to this header block's own height, so the fade to the links
            section below always lands exactly at the block's edge, no matter how tall the page grows */}
        <div className="absolute inset-0 lg:hidden -z-10 overflow-hidden bg-background">
          {profile?.backgroundUrl ? (
            <>
              {/* Base image */}
              <img
                src={profile.backgroundUrl}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: vc.mobileBgPosition || "60% center",
                  transform: `scale(${vc.mobileBgZoom || 1.1})`,
                  transformOrigin: "center center",
                  filter: vc.bgBlur ? `blur(${vc.bgBlur}px)` : undefined,
                }}
              />
              {/* Base overlay — barely-there wash, just to settle the photo tone; contrast for text now comes from the text styling, not from dimming the image */}
              <div className="absolute inset-0" style={{ background: `rgba(15,10,20,${vc.mobileBgOverlay ?? 0.06})` }} />
              {/* Bottom fade — starts low and stays gentle, so the photo keeps its color and depth almost all the way down; only turns fully solid right at the block's own edge (where the first button begins) */}
              <div
                className="absolute inset-x-0 bottom-0"
                style={{
                  height: "48%",
                  background: "linear-gradient(to top, hsl(35,45%,97%) 0%, hsl(35,45%,97%) 4%, hsla(35,45%,97%,0.92) 16%, hsla(35,45%,97%,0.68) 34%, hsla(35,45%,97%,0.36) 56%, hsla(35,45%,97%,0.12) 78%, transparent 100%)",
                }}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-[#F3E9FB] via-[#FBF6F0] to-background" />
          )}
        </div>

        {/* Desktop left column background */}
        <div className="absolute inset-0 hidden lg:block -z-10">
          {profile?.backgroundUrl ? (
            <>
              <div 
                className="absolute inset-0 scale-105"
                style={{
                  backgroundImage: `url(${profile.backgroundUrl})`,
                  backgroundSize: `${(vc.bgZoom || 1) * 100}%`,
                  backgroundPosition: vc.bgPosition || "center",
                  filter: `blur(${vc.bgBlur || 0}px)`
                }}
              />
              <div className="absolute inset-0" style={{ background: "#0a0610", opacity: vc.bgOverlay ?? 0.25 }} />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#F3E9FB] via-[#FBF6F0] to-[#EFF5EA]" />
          )}

          {/* Organic soft blobs — lavender + green + gold, replacing hard luxury edges */}
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-40" style={{ background: "radial-gradient(circle, hsl(262,55%,80%) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 -right-10 w-80 h-80 rounded-full blur-3xl opacity-35" style={{ background: "radial-gradient(circle, hsl(100,35%,78%) 0%, transparent 70%)" }} />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, hsl(38,55%,80%) 0%, transparent 70%)" }} />
        </div>

        {vc.gradientTop && (
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent z-0 pointer-events-none" />
        )}
        
        {vc.gradientBottom && (
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-background z-0 hidden lg:block pointer-events-none" />
        )}

        {vc.showDecorLines && (
          <>
            <div className="absolute w-px h-1/2 bg-gradient-to-b from-transparent via-primary/25 to-transparent left-0 top-1/4 pointer-events-none" />
            <div className="absolute w-px h-1/2 bg-gradient-to-b from-transparent via-primary/25 to-transparent right-0 top-1/4 pointer-events-none" />
          </>
        )}

        {/* Desktop-only floral corner accents — soft organic instead of hard brackets */}
        <div className="hidden lg:flex absolute top-8 left-8 z-10 pointer-events-none items-center justify-center opacity-60">
          <Flower2 className="w-6 h-6" style={{ color: "hsl(262,38%,70%)" }} strokeWidth={1.2} />
        </div>
        <div className="hidden lg:flex absolute top-8 right-8 z-10 pointer-events-none items-center justify-center opacity-50">
          <Sparkles className="w-5 h-5" style={{ color: "hsl(38,48%,62%)" }} strokeWidth={1.2} />
        </div>
        <div className="hidden lg:flex absolute bottom-8 left-8 z-10 pointer-events-none items-center justify-center opacity-45">
          <Leaf className="w-5 h-5" style={{ color: "hsl(100,25%,55%)" }} strokeWidth={1.2} />
        </div>

        {vc.showGlow && (
          <div className="absolute w-96 h-96 -top-24 left-1/2 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        )}

        {/* Logo — mobile */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:hidden mb-3 rounded-full relative z-10"
          style={{
            width: `${80 * ((vc.logoSizeMobile ?? 100) / 100)}px`,
            height: `${80 * ((vc.logoSizeMobile ?? 100) / 100)}px`,
            transform: `translate(${vc.logoOffsetXMobile ?? 0}px, ${vc.logoOffsetYMobile ?? 0}px)`,
          }}
        >
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse shadow-[0_0_24px_rgba(201,161,92,0.20)] scale-[1.08]"></div>
          <div className="w-full h-full overflow-hidden rounded-full border border-primary/30 bg-white/70 p-1 backdrop-blur-sm relative z-10 shadow-lg">
            <img src={profile?.logoUrl || logoPath} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
        </motion.div>

        {/* Logo — desktop */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:block lg:mb-8 rounded-full relative z-10"
          style={{
            width: `${144 * ((vc.logoSize ?? 100) / 100)}px`,
            height: `${144 * ((vc.logoSize ?? 100) / 100)}px`,
            transform: `translate(${vc.logoOffsetX ?? 0}px, ${vc.logoOffsetY ?? 0}px)`,
          }}
        >
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse shadow-[0_0_24px_rgba(201,161,92,0.20)] scale-[1.08]"></div>
          <div className="w-full h-full overflow-hidden rounded-full border border-primary/30 bg-white/70 p-1 backdrop-blur-sm relative z-10 shadow-lg">
            <img src={profile?.logoUrl || logoPath} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
        </motion.div>

        {/* Identity — mobile: fixed high-contrast palette (white/cream/gold) so the name reads instantly over any photo, without dimming the image */}
        <div className="lg:hidden flex flex-col items-center mb-1 leading-[1] gap-0.5 z-10">
          <motion.span 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl text-center font-semibold leading-[1.05]"
            style={{ color: "#FFFFFF", letterSpacing: vc.nameLetterSpacing, fontFamily: firstNameFontFamily, textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 3px 10px rgba(0,0,0,0.3)" }}
          >
            {vc.firstName}
          </motion.span>
          <motion.span 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl text-center font-bold leading-[1.05]"
            style={{ color: "#F6D68A", letterSpacing: vc.nameLetterSpacing, fontFamily: lastNameFontFamily, textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 3px 10px rgba(0,0,0,0.3)" }}
          >
            {vc.lastName}
          </motion.span>
        </div>

        {/* Identity — desktop: fixed high-contrast palette, same treatment as mobile, so the name reads clearly against any part of the photo */}
        <div className="hidden lg:flex flex-col items-center lg:mb-3 z-10">
          <motion.span 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl text-center font-light"
            style={{ color: "#FFFFFF", letterSpacing: vc.nameLetterSpacing, fontFamily: firstNameFontFamily, textShadow: "0 1px 3px rgba(0,0,0,0.55), 0 4px 18px rgba(0,0,0,0.35)" }}
          >
            {vc.firstName}
          </motion.span>
          <motion.span 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl text-center font-medium"
            style={{ color: "#F6D68A", letterSpacing: vc.nameLetterSpacing, fontFamily: lastNameFontFamily, textShadow: "0 1px 3px rgba(0,0,0,0.55), 0 4px 18px rgba(0,0,0,0.35)" }}
          >
            {vc.lastName}
          </motion.span>
        </div>
        
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs font-sans uppercase mb-1.5 lg:mb-6 text-center tracking-[0.35em] lg:tracking-[0.4em] z-10 font-semibold lg:font-normal"
          style={{
            fontFamily: subtitleFontFamily,
          }}
        >
          <span style={{ color: "#FDF8ED", textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)" }}>{vc.subtitleText}</span>
        </motion.p>

        {vc.decoratorEnabled !== false && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-row items-center gap-3 mb-1.5 lg:mb-6 z-10 w-full max-w-[160px]"
          >
            <div className="flex-1 max-w-[60px] h-px bg-primary opacity-40" />
            <DecoratorIcon className="w-3.5 h-3.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] lg:drop-shadow-none" style={{ color: vc.decoratorColor }} />
            <div className="flex-1 max-w-[60px] h-px bg-primary opacity-40" />
          </motion.div>
        )}
        
        <div className="flex flex-col items-center gap-1 lg:gap-2 z-10">
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs lg:text-sm text-center"
            style={{ fontFamily: tagline1FontFamily }}
          >
            <span style={{ color: "#FBF5EA", textShadow: "0 1px 2px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.28)" }}>{vc.tagline1}</span>
          </motion.p>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg lg:text-2xl font-semibold text-center"
            style={{ fontFamily: tagline2FontFamily, fontStyle: "italic" }}
          >
            <span style={{ color: "#F6D68A", textShadow: "0 1px 2px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)" }}>{vc.tagline2}</span>
          </motion.p>
        </div>

        {/* Desktop bottom bar: copyright only (badge moved to right column) */}
        <div className="hidden lg:flex absolute bottom-8 left-0 right-0 items-end justify-center z-10 px-8">
          <p className="text-[10px] text-muted-foreground/70 font-sans tracking-widest uppercase">
            © {new Date().getFullYear()} {vc.firstName} {vc.lastName}
          </p>
        </div>
      </div>

      {/* Right Column / Mobile Links */}
      <div className="w-full lg:w-[60%] flex flex-col items-center justify-center px-6 pt-2 pb-6 lg:p-12 lg:h-[100dvh] lg:overflow-y-auto lg:bg-background/60 relative z-10 overflow-hidden -mt-[46px] lg:mt-0">

        {/* Mobile only: the header's photo fade continues seamlessly into this column's own
            top edge, so the transition finishes gradually around the first card instead of
            cutting off abruptly at the column boundary. Purely visual — doesn't affect layout. */}
        <div className="absolute inset-x-0 top-[46px] bottom-0 lg:hidden -z-10" style={{ background: "hsl(var(--background))" }} />
        <div className="absolute inset-x-0 top-0 h-[46px] lg:hidden -z-10" style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)" }} />

        {/* ── Desktop-only decorative layer ── */}

        {/* Top gold separator line */}
        <div className="hidden lg:block absolute top-0 inset-x-0 pointer-events-none" style={{ height: "2px", background: "linear-gradient(to right, transparent 0%, rgba(201,161,92,0.25) 15%, rgba(201,161,92,0.55) 50%, rgba(201,161,92,0.25) 85%, transparent 100%)" }} />

        {/* Top-right floral accent */}
        <div className="hidden lg:flex absolute top-7 right-7 pointer-events-none z-10 opacity-45">
          <Sparkles className="w-5 h-5" style={{ color: "hsl(38,48%,62%)" }} strokeWidth={1.2} />
        </div>

        {/* Top-left floral accent */}
        <div className="hidden lg:flex absolute top-7 left-7 pointer-events-none z-10 opacity-45">
          <Flower2 className="w-5 h-5" style={{ color: "hsl(262,38%,68%)" }} strokeWidth={1.2} />
        </div>

        {/* Left vertical accent line */}
        <div className="hidden lg:block absolute left-0 top-1/4 w-px h-1/2 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(201,161,92,0.30) 50%, transparent)" }} />

        {/* Soft lavender glow — upper center */}
        <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 360, height: 200, background: "radial-gradient(ellipse at top, rgba(155,127,196,0.14) 0%, transparent 70%)" }} />

        {/* Soft organic blob — lower right, warm sage */}
        <div className="hidden lg:block absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(100,35%,78%) 0%, transparent 70%)" }} />

        {/* Flower ornament — top center */}
        <div className="hidden lg:flex absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 opacity-70">
          <Flower2 className="w-3.5 h-3.5" style={{ color: "rgba(201,161,92,0.75)" }} strokeWidth={1.4} />
        </div>

        {/* Bottom separator */}
        <div className="hidden lg:block absolute bottom-0 inset-x-0 pointer-events-none" style={{ height: "1px", background: "linear-gradient(to right, transparent 0%, rgba(201,161,92,0.28) 30%, rgba(201,161,92,0.28) 70%, transparent 100%)" }} />

        {/* Subtle branch accent — desktop only, resting on the bottom separator */}
        <div className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none z-10 opacity-30">
          <Leaf className="w-3.5 h-3.5" style={{ color: "hsl(100,30%,50%)" }} strokeWidth={1.2} />
        </div>

        {/* Subtle feather accent — desktop only, left edge mid-height */}
        <div className="hidden lg:flex absolute left-5 top-2/3 pointer-events-none z-10 opacity-25">
          <Feather className="w-4 h-4 -rotate-12" style={{ color: "hsl(262,38%,60%)" }} strokeWidth={1.2} />
        </div>

        {/* Portrait — desktop only, large transparent PNG anchored bottom-right */}
        {vc.portraitUrl && (
          <img
            src={vc.portraitUrl}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute bottom-0 right-0 pointer-events-none z-0"
            style={{
              height: `${vc.portraitSize ?? 68}%`,
              width: "auto",
              maxWidth: "40%",
              objectFit: "contain",
              objectPosition: "bottom right",
              opacity: vc.portraitOpacity ?? 0.9,
              transform: `translate(${vc.portraitBlendLeft ?? 0}px, ${vc.portraitBlendTop ?? 0}px)`,
            }}
          />
        )}

        {/* ── Quote block — desktop only, upper-right, above portrait ── */}
        {vc.bgPhraseEnabled !== false && vc.bgPhrase && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex absolute top-[14%] right-10 flex-col items-end pointer-events-none z-10 max-w-[260px]"
          >
            {/* Top accent line */}
            <div className="w-8 h-px mb-3" style={{ background: "linear-gradient(to left, rgba(201,161,92,0.9), transparent)" }} />
            <p
              style={{
                fontFamily: bgPhraseFontFamily,
                fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.5,
                letterSpacing: "0.02em",
                opacity: vc.bgPhraseOpacity ?? 0.9,
                color: "#8C6FB0",
                textAlign: "right",
              }}
            >
              {vc.bgPhrase}
            </p>
            {/* Bottom accent line */}
            <div className="w-5 h-px mt-3" style={{ background: "linear-gradient(to left, rgba(201,161,92,0.5), transparent)" }} />
          </motion.div>
        )}

        {/* ── Mobile-only botanical decorative layer — delicate vines, leaves and blossoms framing the section, lavender + gold ── */}
        <BotanicalCorner className="absolute -top-2 -left-2 w-32 h-32 lg:hidden pointer-events-none z-0" style={{ transform: "scaleY(-1)" }} />
        <BotanicalCorner className="absolute -bottom-2 -right-2 w-36 h-36 lg:hidden pointer-events-none z-0" style={{ transform: "scaleX(-1)" }} />
        <BotanicalCorner className="absolute top-2 -right-3 w-20 h-20 lg:hidden pointer-events-none z-0 opacity-80" style={{ transform: "scale(-1,-1)" }} />
        <BotanicalEdgeVine className="absolute right-0 top-8 bottom-8 w-9 lg:hidden pointer-events-none z-0" style={{ height: "auto" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:hidden pointer-events-none z-0"
          style={{ width: 260, height: 140, background: "radial-gradient(ellipse at top, rgba(155,127,196,0.14) 0%, transparent 72%)" }} />
        {/* Soft light particles */}
        <div className="absolute top-[18%] left-[8%] w-1 h-1 rounded-full lg:hidden pointer-events-none z-0" style={{ background: "#C9A15C", opacity: 0.5, boxShadow: "0 0 6px 1px rgba(201,161,92,0.5)" }} />
        <div className="absolute top-[38%] right-[10%] w-[3px] h-[3px] rounded-full lg:hidden pointer-events-none z-0" style={{ background: "#B9A4D9", opacity: 0.55, boxShadow: "0 0 6px 1px rgba(155,127,196,0.5)" }} />
        <div className="absolute top-[62%] left-[6%] w-1 h-1 rounded-full lg:hidden pointer-events-none z-0" style={{ background: "#C9A9E0", opacity: 0.45, boxShadow: "0 0 5px 1px rgba(201,169,224,0.45)" }} />

        <main className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-14 lg:mr-auto flex flex-col flex-1 lg:flex-none justify-center relative z-10">
          
          {/* Links */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full space-y-3 lg:space-y-4 mb-8 lg:mb-0 relative"
          >
            {isLinksLoading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-full h-20 rounded-2xl bg-card/60" />)
            ) : (
              activeLinks.map((link, index) => {
                const Icon = getIconComponent(link.icon);
                return (
                  <motion.div variants={itemVariants} key={link.id} className="relative">
                    {index === 0 && (
                      <BotanicalSprig className="lg:hidden absolute -top-2 -left-3 w-14 h-8 pointer-events-none z-0 -scale-x-100" />
                    )}
                    {index === activeLinks.length - 2 && (
                      <BotanicalSprig className="lg:hidden absolute -bottom-2 -right-3 w-14 h-8 pointer-events-none z-0" />
                    )}
                    <a
                      href={toExternalUrl(link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleLinkClick(e, link)}
                      className="group relative block w-full bg-card/70 backdrop-blur-md border border-primary/15 rounded-2xl py-5 px-6 transition-all duration-400 hover:bg-card hover:border-primary/40 hover:shadow-[0_8px_28px_-6px_rgba(155,127,196,0.25)] overflow-hidden z-10"
                    >
                      {vc.showAccentBarOnButtons !== false && (
                        <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                      )}
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <h3 className="font-sans font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                            {link.title}
                          </h3>
                          {link.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {link.description}
                            </p>
                          )}
                        </div>
                        {vc.showArrowOnButtons !== false && (
                          <div className="shrink-0">
                            <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        )}
                      </div>
                    </a>
                  </motion.div>
                );
              })
            )}
          </motion.div>

          {/* ── Closing phrase — mobile only, editable from the dashboard ── */}
          {vc.closingPhraseEnabled !== false && vc.closingPhrase && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="lg:hidden flex flex-col items-center gap-1 mt-3 mb-6 px-6 text-center relative z-10"
            >
              <BotanicalFlourish className="w-44 h-9" />
              <p
                className="text-sm italic leading-relaxed -mt-1"
                style={{ color: "#8C6FB0", fontFamily: bgPhraseFontFamily }}
              >
                {vc.closingPhrase}
              </p>
              <BotanicalFlourish className="w-32 h-6 rotate-180 opacity-70" />
            </motion.div>
          )}

          {/* ── Stats — desktop only ── */}
          {vc.statsEnabled !== false && (vc.stats || []).filter(s => s.enabled).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden lg:grid grid-cols-2 gap-x-6 gap-y-5 mt-8 pt-7 border-t border-primary/15"
            >
              {(vc.stats || []).filter(s => s.enabled).map((stat, i) => {
                const StatIcon = getIconComponent(stat.icon);
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <StatIcon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      {stat.value && (
                        <p
                          className="text-sm font-semibold leading-tight font-sans"
                          style={{ color: "#C9A15C" }}
                        >
                          {stat.value}
                        </p>
                      )}
                      <p className={`text-xs leading-tight font-sans ${stat.value ? "text-muted-foreground mt-0.5" : "text-foreground/80 font-medium"}`}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </main>

        {/* Desktop badge — bottom-left of right column, above portrait area */}
        {vc.badgeText && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="hidden lg:flex absolute bottom-8 left-8 z-20 items-center gap-2 bg-white/70 backdrop-blur-md border border-primary/20 rounded-full px-3.5 py-2 shadow-sm"
          >
            <BadgeIcon className="w-3.5 h-3.5 shrink-0" style={{ color: vc.badgeColor }} />
            <span
              className="text-[11px] font-medium leading-none"
              style={{ color: vc.badgeColor, fontFamily: "'Poppins', sans-serif" }}
            >
              {vc.badgeText}
            </span>
          </motion.div>
        )}

        {/* Footer (Mobile only, Desktop handles it in left col) */}
        <footer className="lg:hidden py-10 text-center w-full mt-auto flex flex-col items-center border-t border-primary/15">
          <div className="w-12 h-px bg-primary/40 mb-6" />
          <p className="text-[10px] text-muted-foreground/60 font-sans tracking-wider uppercase">
            © {new Date().getFullYear()} {vc.firstName} {vc.lastName}
          </p>
        </footer>

        {/* Mobile portrait — anchored to this column's own bottom-right corner, so it overlaps the last card like a signature photo without pushing the footer or links */}
        {vc.portraitUrl && (
          <img
            src={vc.portraitUrl}
            alt=""
            aria-hidden="true"
            className="lg:hidden absolute bottom-0 right-0 z-30 pointer-events-none"
            style={{
              height: `${vc.portraitSizeMobile ?? 30}vh`,
              width: "auto",
              maxWidth: "55%",
              objectFit: "contain",
              objectPosition: "bottom right",
              opacity: vc.portraitOpacity ?? 0.9,
              transform: `translate(${vc.portraitOffsetXMobile ?? 0}px, ${vc.portraitOffsetYMobile ?? 0}px)`,
            }}
          />
        )}
      </div>

      {/* Mobile badge — fixed bottom-left, visible only on mobile */}
      {vc.badgeText && (
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed bottom-5 left-4 z-50 lg:hidden flex items-center gap-2 bg-white/75 backdrop-blur-md border border-primary/15 rounded-full px-3.5 py-2 shadow-lg"
        >
          <BadgeIcon className="w-3.5 h-3.5 shrink-0" style={{ color: vc.badgeColor }} />
          <span
            className="text-[12px] font-medium leading-none"
            style={{ color: vc.badgeColor, fontFamily: "'Poppins', sans-serif" }}
          >
            {vc.badgeText}
          </span>
        </motion.div>
      )}
    </div>
  );
}
