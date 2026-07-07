---
name: Claudia Alzate — stack & conventions
description: Key rules, gotchas, and decisions for the Claudia Alzate Realtor® Linktree project
---

## Icons
- `SiLinkedin` does NOT exist in the installed version of react-icons. Use lucide-react's `Linkedin` instead.
- `SiX` (Twitter/X), `SiYoutube` are also unavailable — use lucide-react `Twitter`, `Youtube`.
- Safe react-icons/si exports confirmed working: `SiWhatsapp`, `SiInstagram`, `SiFacebook`, `SiTiktok`.

**Why:** react-icons version in workspace doesn't export several newer social icons. lucide-react is the safe fallback.

## VisualConfig
- Stored as JSON text in `profile.visual_config` column in PostgreSQL.
- Parsed server-side in `serializeProfile()` in `artifacts/api-server/src/routes/profile.ts`.
- Returned as `visualConfig: Record<string,unknown>` in API response.
- Frontend reads it as `profile.visualConfig` (may be null/undefined — always use defaults via `getVC(profile)`).
- When saving: pass as object to mutation, NOT a JSON string. The route handles serialization.

## framer-motion
- Import: `import { motion, AnimatePresence } from "framer-motion"` — NOT from `motion/react`.

## React Query hooks
- Always import from `@workspace/api-client-react`, never relative paths.
- Profile hook: `useGetProfile({ query: { queryKey: getGetProfileQueryKey() } })`
- Do NOT import `useGetAnalytics` in public page — analytics-manager only.

## Tailwind gotchas
- Do NOT use `bg-radial` — not a standard Tailwind class. Use inline style for radial gradients.
- Do NOT use `text-balance` — not universally supported. Use `text-center`.

## Drizzle ORM — .set() usa camelCase, NO snake_case
- `db.update(table).set({ backgroundUrl: value })` ✅ correcto
- `db.update(table).set({ background_url: value })` ❌ Drizzle ignora la clave — genera `UPDATE SET` vacío y falla con error SQL
- **Por qué:** Drizzle mapea internamente sus propiedades JS → columnas SQL. Nunca construir el objeto `set()` con nombres de columna SQL.

## Admin credentials
- username: `ClaudiaAlzate`, password `Claudia321`. Auth is JWT-based (stateless, HS256).
- `seedAdmin()` in `artifacts/api-server/src/index.ts` now ALWAYS syncs the password to the `ADMIN_PASSWORD` env var on every boot (creates row if missing, updates password if it exists). This means changing `ADMIN_PASSWORD` on Render takes effect on next deploy — no manual DB edits needed.
- Both `ADMIN_USERNAME` and `ADMIN_PASSWORD` are read from env vars with defaults `ClaudiaAlzate` / `Claudia321`.

## Icon selection UX
- All admin-dashboard icon fields (identity decorator/badge, stats, links) must use the shared click-based `IconPicker` + categorized catalogue in `artifacts/claudia-alzate/src/components/ui/icons.tsx` — never a free-text icon-name input.
- **Why:** product requirement — no typing icon names anywhere in the dashboard; the picker also keeps icon keys valid against `getIconComponent()`.
- **How to apply:** when adding any new icon-choosing field, import `{ IconPicker }` from `@/components/ui/icons` and bind it directly to the string field; add new icon options to `ICON_GROUPS` in that file (and to `getIconComponent()`'s switch) rather than creating a local picker/catalogue.

## Font selection UX — per-field, not global
- Font choice must be per-text-field (firstName, lastName, subtitle, tagline1, tagline2, bgPhrase), each with its own key in `visualConfig` (e.g. `firstNameFont`), NOT one shared/global font applied to all texts.
- **Why:** product explicitly rejected a single global font picker after it shipped — wanted each text individually customizable, matching how colors are already per-field.
- **How to apply:** use `FontPickerCompact` (dropdown, shows live font preview) from `@/components/ui/fonts` under each text input in the dashboard; store each field's choice as `<field>Font` inside `visualConfig`, read via `getFontFamily(vc.<field>Font)` on the public page. The legacy top-level `profile.fontTitle` DB column was an earlier global-font attempt — still normalized as a fallback default when a per-field key is absent, but no longer written to on save.

## Mobile layout — percentage heights break inside auto-height columns
- The left/header column has no explicit height on mobile (only `lg:h-[100dvh]`), so any absolutely-positioned child using `height: X%` resolves against an "auto" containing block and renders at the image's raw intrinsic size instead — it then gets clipped to a near-invisible sliver by the column's `overflow-hidden`.
- **Why:** CSS spec treats percentage-height on a box whose container has no definite height as `auto`, not "no-op" — easy to miss because desktop (`lg:h-[100dvh]`) is unaffected and looks correct in review.
- **How to apply:** size elements scoped to that mobile column with `vh` or `px` units, never bare `%`, unless the column itself gets an explicit height. Also keep any background/portrait/vignette layers that must track that column's own height nested *inside* the column div (not as siblings using page-wide `absolute inset-0`), otherwise gradients/fades are computed against total scrollable page height and create a visible seam wherever the column's real content boundary falls.
- Even with `vh` sizing, an absolutely-positioned `bottom-0`/`right-0` child (e.g. portrait photo) still anchors against the column's *content-driven* height, not the visual hero area — if the column has no `min-h` on mobile, its height collapses to just the text/logo content, so the child lands high up and any downward offset quickly exceeds that short box and gets clipped by `overflow-hidden`. Fix: give the mobile column an explicit `min-h-[Xvh]` (reset with `lg:min-h-0` on desktop) so there's real room for the child to sit at the true bottom and for offset sliders to have effect.

## framer-motion — never wrap a `variants`-driven child in an extra plain `motion.div`
- Inserting a bare `<motion.div>` (no `variants`/`initial`/`animate` of its own) between a `variants`-controlled parent and its `variants`-controlled child silently breaks the hidden→show propagation — the child never animates in and stays effectively invisible (0 height/opacity), while sibling static elements render fine.
- **Why:** discovered when adding conditional separators between mapped list items required an extra wrapper per item; the extra `motion.div` layer broke the container/item stagger animation even though it looked like valid nesting.
- **How to apply:** when you need a non-animated wrapper around a `variants` item (e.g. to also render a conditional sibling like a separator), use `<Fragment key={...}>` instead of `<motion.div>` for that wrapper — plain Fragments don't interfere with variant propagation.

## Codegen
- After any OpenAPI spec change: `pnpm --filter @workspace/api-spec run codegen`
- After any DB schema change: `pnpm --filter @workspace/db run push`
- Both can run in parallel.

## Deploy prep — Render + Neon + Vercel
- `render.yaml` at REPO ROOT (not in artifacts/api-server) — Render's Blueprint feature only finds it at the root. Keep a copy in `artifacts/api-server/render.yaml` as reference. Both must use buildCommand WITHOUT `cd ../..` since Render's working dir is always the repo root.
- `@assets` alias in `vite.config.ts` must point to `src/assets/` (inside the frontend), NOT to `../../attached_assets`. The logo image was copied to `artifacts/claudia-alzate/src/assets/`. This makes the frontend self-contained.
- `lib/db/src/index.ts`: Pool needs `ssl: { rejectUnauthorized: false }` when `NODE_ENV=production` — required for Neon/Supabase SSL connections.
- Vercel: Root Directory in UI = `artifacts/claudia-alzate`. `vercel.json` installCommand uses `cd ../.. && npm install -g pnpm@10 && pnpm install --frozen-lockfile` (cd back to monorepo root).
- CORS: `*.vercel.app` is already auto-allowed in `app.ts`. For custom domains, add to `ALLOWED_ORIGINS` env var on Render.
- `artifacts/claudia-alzate/.env.local.example` — created. Set `VITE_API_URL=https://your-render-url` in Vercel env vars.
