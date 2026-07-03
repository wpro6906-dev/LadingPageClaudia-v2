import { useState } from "react";
import { ChevronDown } from "lucide-react";

// ── Shared visual font catalogue & picker ───────────────────────────────────
// Used for the main headline texts (name + phrases). Three deliberately
// different styles so they can be mixed & matched: one marked script/cursive
// and two "normal" but visually distinct options.

export type FontOption = { key: string; label: string; family: string; hint: string };

export const FONT_OPTIONS: FontOption[] = [
  { key: "elegante", label: "Elegante", family: "'Cormorant Garamond', serif", hint: "Serif clásica" },
  { key: "cursiva",  label: "Cursiva",  family: "'Alex Brush', cursive",        hint: "Caligráfica" },
  { key: "moderna",  label: "Moderna",  family: "'Josefin Sans', sans-serif",   hint: "Sans minimal" },
];

const LEGACY_ALIASES: Record<string, string> = {
  "Cormorant Garamond": "elegante",
  "Playfair Display": "elegante",
  "Montserrat": "moderna",
  "Poppins": "moderna",
};

export function getFontFamily(key?: string | null): string {
  if (!key) return FONT_OPTIONS[0].family;
  const direct = FONT_OPTIONS.find(f => f.key === key);
  if (direct) return direct.family;
  const aliasKey = LEGACY_ALIASES[key];
  const aliased = aliasKey ? FONT_OPTIONS.find(f => f.key === aliasKey) : undefined;
  return aliased ? aliased.family : FONT_OPTIONS[0].family;
}

export function normalizeFontKey(key?: string | null): string {
  if (!key) return FONT_OPTIONS[0].key;
  if (FONT_OPTIONS.some(f => f.key === key)) return key;
  return LEGACY_ALIASES[key] ?? FONT_OPTIONS[0].key;
}

export function FontPicker({
  value,
  onChange,
  sampleText = "Claudia Alzate",
}: {
  value: string;
  onChange: (key: string) => void;
  sampleText?: string;
}) {
  const normalized = normalizeFontKey(value);
  return (
    <div className="grid grid-cols-3 gap-2">
      {FONT_OPTIONS.map(({ key, label, family, hint }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-xl border-2 transition-all text-center ${
            normalized === key
              ? "border-primary bg-primary/10 shadow-sm"
              : "border-border hover:border-primary/40"
          }`}
        >
          <span
            style={{ fontFamily: family }}
            className="text-2xl leading-tight text-foreground truncate max-w-full"
          >
            {sampleText}
          </span>
          <span className={`text-[11px] font-medium ${normalized === key ? "text-primary" : "text-foreground"}`}>{label}</span>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground">{hint}</span>
        </button>
      ))}
    </div>
  );
}

export function FontPickerCompact({ value, onChange }: { value: string; onChange: (key: string) => void }) {
  const [open, setOpen] = useState(false);
  const normalized = normalizeFontKey(value);
  const current = FONT_OPTIONS.find(f => f.key === normalized) ?? FONT_OPTIONS[0];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md border border-input bg-background text-sm hover:bg-accent transition-colors"
      >
        <span style={{ fontFamily: current.family }} className="truncate text-sm">{current.label}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-50 bg-popover border border-border rounded-xl shadow-xl p-2 w-full">
            {FONT_OPTIONS.map(({ key, label, family }) => (
              <button
                key={key}
                type="button"
                onClick={() => { onChange(key); setOpen(false); }}
                style={{ fontFamily: family }}
                className={`w-full text-left px-3 py-2 rounded-lg text-base hover:bg-accent transition-colors ${normalized === key ? "text-primary" : "text-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
