// Delicate botanical/organic SVG ornaments — lavender + soft purple with small gold details.
// Designed to feel like part of the composition (hand-drawn botanical illustration), not stickers.

interface OrnamentProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  accentColor?: string;
  intensity?: number;
}

/**
 * A vine that grows from a bottom-left corner curling up and to the right, with several
 * leaves and a small blossom near the tip. Use CSS transforms to mirror it into any
 * of the four corners: as-is = bottom-left, scaleX(-1) = bottom-right,
 * scaleY(-1) = top-left, scale(-1,-1) = top-right.
 */
export function BotanicalCorner({ className = "", style, color, accentColor, intensity = 1 }: OrnamentProps) {
  const c = color || "#8B6BB8";
  const p = color || "#A98FCE";
  const a = accentColor || "#C9A15C";
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={{ ...style, opacity: intensity }}
      aria-hidden="true"
    >
      <path
        d="M4 98 C8 72 28 76 26 52 C24 30 50 34 46 8"
        stroke={c}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M26 52 C36 47 40 36 31 27"
        stroke={c}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M14 84 C8 80 4 74 6 66"
        stroke={c}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <ellipse cx="12" cy="83" rx="9" ry="4" transform="rotate(-42 12 83)" fill={p} opacity="0.75" />
      <ellipse cx="9" cy="68" rx="6.5" ry="2.9" transform="rotate(-70 9 68)" fill={p} opacity="0.6" />
      <ellipse cx="27" cy="60" rx="7.5" ry="3.3" transform="rotate(32 27 60)" fill={p} opacity="0.68" />
      <ellipse cx="33" cy="32" rx="6.8" ry="3" transform="rotate(-22 33 32)" fill={p} opacity="0.72" />
      <ellipse cx="43" cy="17" rx="6" ry="2.7" transform="rotate(48 43 17)" fill={p} opacity="0.62" />
      <g transform="translate(46 8)">
        <circle cx="-5.5" cy="-2" r="3.6" fill={p} opacity="0.8" />
        <circle cx="5.5" cy="-2" r="3.6" fill={p} opacity="0.8" />
        <circle cx="0" cy="-7.5" r="3.6" fill={p} opacity="0.8" />
        <circle cx="-3.5" cy="4.5" r="3.6" fill={p} opacity="0.75" />
        <circle cx="3.5" cy="4.5" r="3.6" fill={p} opacity="0.75" />
        <circle cx="0" cy="0" r="2.4" fill={a} opacity="0.95" />
      </g>
      <g transform="translate(18 72) scale(0.55)">
        <circle cx="-5.5" cy="-2" r="3.6" fill={p} opacity="0.65" />
        <circle cx="5.5" cy="-2" r="3.6" fill={p} opacity="0.65" />
        <circle cx="0" cy="-7.5" r="3.6" fill={p} opacity="0.65" />
        <circle cx="-3.5" cy="4.5" r="3.6" fill={p} opacity="0.6" />
        <circle cx="3.5" cy="4.5" r="3.6" fill={p} opacity="0.6" />
        <circle cx="0" cy="0" r="2.4" fill={a} opacity="0.85" />
      </g>
      <circle cx="20" cy="70" r="1.6" fill={a} opacity="0.8" />
      <circle cx="38" cy="22" r="1.3" fill={a} opacity="0.7" />
      <circle cx="6" cy="92" r="1.2" fill={a} opacity="0.6" />
    </svg>
  );
}

/** A vertical vine with several leaves and blossoms, meant to run along an edge. */
export function BotanicalEdgeVine({ className = "", style, color, accentColor, intensity = 1 }: OrnamentProps) {
  const c = color || "#8B6BB8";
  const p = color || "#A98FCE";
  const a = accentColor || "#C9A15C";
  return (
    <svg
      viewBox="0 0 40 400"
      fill="none"
      className={className}
      style={{ ...style, opacity: intensity }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M22 2 C8 40 32 70 16 108 C2 144 30 178 14 214 C2 246 28 282 16 316 C6 346 26 372 20 398"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <ellipse cx="27" cy="60" rx="7.5" ry="3.1" transform="rotate(35 27 60)" fill={p} opacity="0.65" />
      <ellipse cx="6" cy="130" rx="7" ry="2.9" transform="rotate(-30 6 130)" fill={p} opacity="0.65" />
      <ellipse cx="26" cy="240" rx="7" ry="2.9" transform="rotate(28 26 240)" fill={p} opacity="0.62" />
      <ellipse cx="4" cy="330" rx="6.5" ry="2.8" transform="rotate(-25 4 330)" fill={p} opacity="0.62" />
      <g transform="translate(16 108)">
        <circle cx="-4" cy="-1.5" r="2.8" fill={p} opacity="0.7" />
        <circle cx="4" cy="-1.5" r="2.8" fill={p} opacity="0.7" />
        <circle cx="0" cy="-5.5" r="2.8" fill={p} opacity="0.7" />
        <circle cx="0" cy="1.8" r="2" fill={a} opacity="0.9" />
      </g>
      <g transform="translate(14 214)">
        <circle cx="-4" cy="-1.5" r="2.8" fill={p} opacity="0.65" />
        <circle cx="4" cy="-1.5" r="2.8" fill={p} opacity="0.65" />
        <circle cx="0" cy="-5.5" r="2.8" fill={p} opacity="0.65" />
        <circle cx="0" cy="1.8" r="2" fill={a} opacity="0.85" />
      </g>
      <g transform="translate(24 300)">
        <circle cx="-3.5" cy="-1.3" r="2.4" fill={p} opacity="0.6" />
        <circle cx="3.5" cy="-1.3" r="2.4" fill={p} opacity="0.6" />
        <circle cx="0" cy="-4.8" r="2.4" fill={p} opacity="0.6" />
        <circle cx="0" cy="1.5" r="1.7" fill={a} opacity="0.8" />
      </g>
    </svg>
  );
}

/** A small horizontal blossom sprig meant to sit tucked beside/behind a button's edge. */
export function BotanicalSprig({ className = "", style, color, accentColor, intensity = 1 }: OrnamentProps) {
  const c = color || "#8B6BB8";
  const p = color || "#A98FCE";
  const a = accentColor || "#C9A15C";
  return (
    <svg viewBox="0 0 70 40" fill="none" className={className} style={{ ...style, opacity: intensity }} aria-hidden="true">
      <path
        d="M2 35 C16 31 22 20 34 17"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <ellipse cx="11" cy="31" rx="6.5" ry="2.7" transform="rotate(-18 11 31)" fill={p} opacity="0.65" />
      <ellipse cx="21" cy="23" rx="6" ry="2.5" transform="rotate(-10 21 23)" fill={p} opacity="0.62" />
      <g transform="translate(34 17)">
        <circle cx="-4" cy="-1.7" r="3" fill={p} opacity="0.75" />
        <circle cx="4" cy="-1.7" r="3" fill={p} opacity="0.75" />
        <circle cx="0" cy="-6" r="3" fill={p} opacity="0.75" />
        <circle cx="0" cy="1.8" r="2.1" fill={a} opacity="0.9" />
      </g>
    </svg>
  );
}

/** Symmetric floral flourish — two mirrored sprigs framing a center gold blossom, for closing the page. */
export function BotanicalFlourish({ className = "", style, color, accentColor, intensity = 1 }: OrnamentProps) {
  const c = color || "#8B6BB8";
  const p = color || "#A98FCE";
  const a = accentColor || "#C9A15C";
  return (
    <svg viewBox="0 0 260 60" fill="none" className={className} style={{ ...style, opacity: intensity }} aria-hidden="true">
      <path d="M112 30 C92 26 78 34 60 28 C44 23 32 30 16 26" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M148 30 C168 26 182 34 200 28 C216 23 228 30 244 26" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="82" cy="29" rx="7" ry="3" transform="rotate(8 82 29)" fill={p} opacity="0.62" />
      <ellipse cx="44" cy="25" rx="6.5" ry="2.8" transform="rotate(-6 44 25)" fill={p} opacity="0.62" />
      <ellipse cx="178" cy="29" rx="7" ry="3" transform="rotate(-8 178 29)" fill={p} opacity="0.62" />
      <ellipse cx="216" cy="25" rx="6.5" ry="2.8" transform="rotate(6 216 25)" fill={p} opacity="0.62" />
      <g transform="translate(130 30)">
        <circle cx="-7" cy="-3.5" r="4.6" fill={p} opacity="0.75" />
        <circle cx="7" cy="-3.5" r="4.6" fill={p} opacity="0.75" />
        <circle cx="0" cy="-10" r="4.6" fill={p} opacity="0.75" />
        <circle cx="-5.5" cy="5.5" r="4.6" fill={p} opacity="0.7" />
        <circle cx="5.5" cy="5.5" r="4.6" fill={p} opacity="0.7" />
        <circle cx="0" cy="0" r="3.2" fill={a} opacity="0.95" />
      </g>
    </svg>
  );
}
