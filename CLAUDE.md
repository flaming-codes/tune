# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Turborepo + PNPM monorepo for a veterinary practice website (Tierarztpraxis Dr. Tune Lazri). Two apps share the `@med/theme` package:

- `apps/web` — Main Next.js 16 + Payload CMS 3 site (port 3000)
- `apps/signatures` — Secondary Payload app for email signatures (port 3001)
- `packages/theme` — Shared Tailwind CSS theme (`@med/theme`)

## Commands

Run from monorepo root unless noted.

```bash
pnpm install           # install dependencies
pnpm dev               # run all apps in dev mode
pnpm dev:web           # run web app only
pnpm build             # production build
pnpm lint              # lint all packages
pnpm typecheck         # TypeScript check
pnpm test              # integration tests (Vitest)
pnpm test:e2e          # Playwright E2E tests
pnpm format            # Prettier formatting
pnpm ci:fast           # lint + typecheck + test:int + build (pre-task gate)
```

App-specific variants: `pnpm <cmd>:web` or `pnpm <cmd>:signatures`.

### Database / Schema (run from root or with `--filter web`)

```bash
pnpm db:generate       # regenerate payload-types.ts + importMap.js after schema changes
pnpm db:migrate        # run pending migrations
# In apps/web:
pnpm --filter web db:migrate:create   # create a new migration file
pnpm --filter web db:migrate:status   # check migration status
```

**Push mode is disabled** — all schema changes require explicit migration files in `src/migrations/`.

### Single test

```bash
# Integration (Vitest) — run one file
pnpm --filter web exec vitest run tests/int/api.int.spec.ts

# E2E (Playwright)
pnpm --filter web exec playwright test tests/e2e/admin.e2e.spec.ts
```

## Architecture

### Page Content Model (Block-Based)

The `StartPage` global and `TeamMember` collection use a **blocks-based layout** field. Each block type is defined under `src/blocks/startPage/` (e.g. `HeroBlock.ts`, `TeamBlock.ts`) and rendered by `RenderLayoutBlock.tsx` via a `switch` on `block.blockType`.

Adding a new page section = create a block config in `src/blocks/`, register it in `src/blocks/startPage/index.ts`, add the React section component to `sections/`, and add a case to `RenderLayoutBlock.tsx`.

### Payload CMS Config

`src/payload.config.ts` wires up:
- **Collections**: `Users`, `Media`, `TeamMembers`, `GalleryImages`, `Testimonials`, `AnalyticsEvents`
- **Globals**: `StartPage`, `ImprintPage`, `PrivacyPolicyPage`
- **DB**: SQLite via `@payloadcms/db-sqlite` with `push: false`
- **Versioning + autosave**: shared helpers in `src/lib/versioning.ts` (`createCollectionVersions`, `createGlobalVersions`)
- **Custom admin dashboard**: analytics widgets registered via `ComponentPath` file-path strings (not imports)

### Frontend Routes

```
app/(frontend)/           # public-facing Next.js routes
  page.tsx                # home page (fetches StartPage global)
  team/[slug]/            # team member profile pages
  impressum/              # legal pages
  datenschutzerklarung/
  sections/               # section components (Hero, Team, Gallery, …)
  components/             # frontend-specific shared components
  actions/                # Next.js server actions

app/(payload)/            # Payload admin (auto-managed)
```

### Key Patterns

**Fetching Payload data in Server Components:**
```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'team-members' })
```

**Custom Payload components** use file-path strings, not imports:
```typescript
ComponentPath: '/components/MyWidget#default'
```

**ClassName merging:** always use `clsx` (not `cn` / `twMerge`).

**Environment validation:** env vars are validated with Zod in `src/env/client.ts` (public) and `src/env/server.ts` (private); import from `src/env/index.ts`.

**Access control:** Local API bypasses access control by default — use `overrideAccess: false` when needed for data-fetch security.

### After Schema Changes (mandatory)

1. Create a migration: `pnpm --filter web db:migrate:create`
2. Apply it: `pnpm db:migrate`
3. Regenerate types: `pnpm db:generate` (updates `payload-types.ts` + `importMap.js`)

### Documentation (`docs/`)

Architecture and system-level implementations are documented in `docs/` as Markdown files (lower-kebab-case filenames).

**Pre-task:** List filenames in `docs/` and read any files relevant to the current task before starting work.

**Post-task:** After work is complete, list filenames in `docs/` again and update, create, or delete documentation to reflect new code. Only document architectural and system-relevant implementations — skip changelog-only items, simple fixes, and purely visual changes.

### Task Completion Gate

Before finishing any task, run:
```bash
pnpm ci:fast
```
This runs lint, typecheck, integration tests, and build in one shot.

## Payload CMS Reference

Detailed patterns for access control, hooks, fields, queries, and custom endpoints are documented in the [Payload CMS docs](https://payloadcms.com/docs) and the full LLM context at `https://payloadcms.com/llms-full.txt`.
