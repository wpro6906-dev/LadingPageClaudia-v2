# Claudia Alzate — Mini-Web Platform

A "premium mini-web" (Linktree-style) personal profile site for Claudia Alzate, with an admin panel for managing profile, links, and appearance.

## Run & Operate

- **API server:** managed by the `artifacts/api-server: API Server` workflow (runs on `$PORT`)
- **Frontend:** managed by the `artifacts/claudia-alzate: web` workflow (Vite dev server)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- **Required env:** `DATABASE_URL` — auto-provisioned by Replit (no manual setup needed)

## Default admin credentials

- Username: `ClaudiaAlzate`  
- Password: `Claudia321`  
  (Override via `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 (`artifacts/api-server`)
- Frontend: React + Vite + Tailwind CSS + Radix UI + Framer Motion (`artifacts/claudia-alzate`)
- DB: PostgreSQL + Drizzle ORM (`lib/db`) — schema auto-applied on API startup via `ensureSchema()`
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API contract: OpenAPI spec (`lib/api-spec`) → Orval codegen → typed hooks (`lib/api-client-react`) + Zod schemas (`lib/api-zod`)
- Build: esbuild

## Where things live

- DB schema: `lib/db/src/schema/`
- API spec (source of truth for routes): `lib/api-spec/openapi.yaml`
- API server entry: `artifacts/api-server/src/index.ts`
- Frontend entry: `artifacts/claudia-alzate/src/main.tsx`
- Admin panel: `artifacts/claudia-alzate/src/pages/admin/`
- CORS config: `artifacts/api-server/src/app.ts` → `isOriginAllowed()`
- Session store (JWT-based, stateless): `artifacts/api-server/src/lib/session-store.ts`

## Architecture decisions

- **Contract-first API:** The OpenAPI spec drives both backend Zod validation and frontend typed hooks via Orval codegen. Always update `openapi.yaml` first, then run codegen.
- **Stateless JWT sessions:** Sessions use HS256 JWTs (built-in Node crypto) so the API can run stateless across multiple instances without a shared store.
- **Schema auto-migration on startup:** `ensureSchema()` applies Drizzle schema changes on every API boot — no separate migration step in development.
- **CORS exact-host matching:** Dev-mode allows `localhost` and `127.0.0.1` via URL parsing (not prefix matching) to avoid overly broad rules.

## Gotchas

- After changing `openapi.yaml`, run codegen before building the frontend or you'll get type errors.
- `DATABASE_URL` is runtime-managed by Replit — do not set it manually.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
