# med-site Monorepo - AI Agent Guide

This document provides essential information for AI coding agents working on the med-site project.

## Project Overview

This is a **Turborepo monorepo** containing a Next.js + Payload CMS application for a veterinary practice website (Tierarztpraxis Dr. Tune Lazri). The project uses a PNPM workspace setup with shared theme packages.

### Applications

| App | Path | Port | Description |
|-----|------|------|-------------|
| `web` | `apps/web` | 3000 | Main website with Payload CMS backend |
| `signatures` | `apps/signatures` | 3001 | Secondary Payload app for email signatures |

### Shared Package

| Package | Path | Description |
|---------|------|-------------|
| `@med/theme` | `packages/theme` | Shared Tailwind CSS theme and global styles |

## Technology Stack

### Core Technologies
- **Framework**: Next.js 16.1.6 with App Router
- **CMS**: Payload CMS 3.77.0
- **Language**: TypeScript 5.9.3
- **Runtime**: Node.js 18.20.2+ or >=20.9.0
- **Package Manager**: pnpm 10.19.0

### Database & Storage
- **Database**: SQLite (via `@payloadcms/db-sqlite`)
- **File Uploads**: Local filesystem with Sharp image processing
- **Migrations**: Explicit migration files (push mode disabled)

### Styling & UI
- **CSS Framework**: Tailwind CSS 4.2.0
- **Rich Text Editor**: Lexical (`@payloadcms/richtext-lexical`)
- **Animation**: Motion library
- **Maps**: Leaflet + React-Leaflet
- **Icons/UI**: Radix UI Navigation Menu

### Testing
- **Unit/Integration**: Vitest 4.0.18 with jsdom
- **E2E**: Playwright 1.58.2
- **Testing Library**: React Testing Library 16.3.2

### Code Quality
- **Linter**: ESLint 9.x with Next.js config
- **Formatter**: Prettier 3.8.1
- **Git Hooks**: Lefthook 2.1.1

## Workspace Structure

```
med-site/
├── apps/
│   ├── web/                    # Main website application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (frontend)/ # Public-facing routes
│   │   │   │   │   ├── sections/   # Page section components
│   │   │   │   │   ├── components/ # Shared frontend components
│   │   │   │   │   ├── actions/    # Server actions
│   │   │   │   │   ├── page.tsx    # Home page
│   │   │   │   │   └── layout.tsx
│   │   │   │   └── (payload)/  # CMS admin routes
│   │   │   │       ├── admin/
│   │   │   │       ├── api/
│   │   │   │       └── layout.tsx
│   │   │   ├── collections/    # Payload collection configs
│   │   │   ├── globals/        # Payload global configs
│   │   │   ├── components/     # Reusable React components
│   │   │   ├── lib/            # Utility functions
│   │   │   ├── env/            # Environment validation (client.ts, server.ts, index.ts)
│   │   │   ├── migrations/     # Database migrations
│   │   │   ├── seed/           # Database seeding scripts
│   │   │   ├── payload.config.ts
│   │   │   └── payload-types.ts
│   │   ├── tests/
│   │   │   ├── e2e/            # Playwright E2E tests
│   │   │   ├── int/            # Vitest integration tests
│   │   │   └── helpers/        # Test utilities
│   │   ├── .env / .env.example
│   │   └── docker-compose.yml
│   │
│   └── signatures/             # Secondary Payload app (simpler structure)
│       └── src/
│           ├── app/(frontend)/
│           ├── app/(payload)/
│           ├── collections/
│           ├── migrations/
│           └── payload.config.ts
│
├── packages/
│   └── theme/
│       └── src/
│           └── global.css      # Shared Tailwind CSS + theme variables
│
├── .cursor/rules/              # Cursor IDE rules for Payload CMS
├── package.json                # Root monorepo config
├── pnpm-workspace.yaml         # PNPM workspace definition
├── turbo.json                  # Turborepo pipeline config
└── lefthook.yml                # Git hooks configuration
```

## Build and Development Commands

### Installation
```bash
pnpm install
```

### Development
```bash
# Run all apps in dev mode (turborepo)
pnpm dev

# Run specific app
pnpm dev:web          # Port 3000
pnpm dev:signatures   # Port 3001
```

### Building
```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:web
pnpm build:signatures
```

### Code Quality
```bash
# Lint all apps
pnpm lint
pnpm lint:web
pnpm lint:signatures

# Type checking
pnpm typecheck
pnpm typecheck:web
pnpm typecheck:signatures

# Format code
pnpm format
pnpm format:web
```

### Testing
```bash
# Run all tests (integration + e2e)
pnpm test

# App-specific tests
pnpm test:web
pnpm test:signatures

# E2E only
pnpm test:e2e
pnpm test:e2e:web
```

### Database Operations
```bash
# Generate types and import maps
pnpm db:generate
pnpm db:generate:web
pnpm db:generate:signatures

# Run migrations
pnpm db:migrate
pnpm db:migrate:web
pnpm db:migrate:signatures

# Seed start page (web app only)
pnpm seed:start-page
```

### CI/CD
```bash
# Fast CI pipeline (lint, typecheck, test:int, build)
pnpm ci:fast

# App-specific CI
pnpm ci:web
pnpm ci:signatures
```

## Code Organization Guidelines

### Collection Configuration Pattern

Collections are defined in `src/collections/*.ts`:

```typescript
import type { CollectionConfig } from 'payload'

export const CollectionName: CollectionConfig = {
  slug: 'collection-slug',
  admin: {
    useAsTitle: 'fieldName',
    defaultColumns: ['title', 'status', 'createdAt'],
  },
  fields: [
    // Field definitions
  ],
  timestamps: true,
}
```

### Access Control Pattern

Always implement access control in collections:

```typescript
access: {
  read: ({ req: { user } }) => {
    // Public sees only published
    if (!user) return { _status: { equals: 'published' } }
    return true
  },
  update: ({ req: { user } }) => user?.roles?.includes('admin'),
}
```

### Server Components with Payload

```typescript
// In Server Components
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Page() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'posts' })
  return <div>{docs.map(post => <h1 key={post.id}>{post.title}</h1>)}</div>
}
```

### Custom Components

Use file paths (not imports) in Payload config:

```typescript
admin: {
  components: {
    Nav: '/components/Nav',
    logout: {
      Button: '/components/Logout#MyComponent', // Named export
    },
  },
}
```

## Environment Variables

### Web App (`apps/web/.env`)

```bash
# Required
DATABASE_URL=file:./web.db
PAYLOAD_SECRET=your_secret_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000

# Optional (for seeding)
PAYLOAD_SEED=true
PAYLOAD_SEED_OVERWRITE=false
```

### Environment Validation

Environment variables are validated using Zod schemas in:
- `src/env/client.ts` - Client-side env vars (NEXT_PUBLIC_*)
- `src/env/server.ts` - Server-side env vars
- `src/env/index.ts` - Combined export

## Testing Strategy

### Integration Tests (Vitest)
- Location: `tests/int/*.int.spec.ts`
- Environment: jsdom
- Config: `vitest.config.mts`

### E2E Tests (Playwright)
- Location: `tests/e2e/*.e2e.spec.ts`
- Config: `playwright.config.ts`
- Runs against dev server on port 3000

### Test Helpers
- `tests/helpers/login.ts` - Authentication helpers
- `tests/helpers/seedUser.ts` - User seeding for tests

## Database and Migrations

### Migration Policy
- **Push mode is disabled** (`push: false` in payload.config.ts)
- All schema changes require explicit migration files
- Migrations are stored in `src/migrations/`

### Creating Migrations
```bash
pnpm --filter web db:migrate:create
```

### Migration Files
- Named with timestamp: `20260222_095811_init_signatures.ts`
- Include both `up` and `down` functions
- JSON snapshots stored alongside `.ts` files

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- No implicit any
- Unused vars must start with `_`
- Path alias: `@/*` maps to `./src/*`

### ESLint Rules
- Based on `eslint-config-next/core-web-vitals` and `typescript`
- `@typescript-eslint/no-explicit-any`: warn
- `@typescript-eslint/no-unused-vars`: warn (with `_` prefix allowed)

### Prettier Configuration
- Default formatting for `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.css`, `.scss`, `.md`
- Run via: `pnpm format` or `pnpm format:web`

### Git Hooks (Lefthook)
- **Pre-commit**: Format and lint web app
- **Pre-push**: Run lint and TypeScript check on web app

## Security Considerations

### Access Control
- All collections should implement proper access control
- Local API bypasses access control by default - use `overrideAccess: false` when needed
- Include `req` in nested operations for transaction safety

### Authentication
- Users collection with JWT-based auth
- Roles field with `saveToJWT: true` for fast access checks

### Environment Secrets
- `PAYLOAD_SECRET` must be cryptographically secure
- Never commit `.env` files (ignored in `.gitignore`)

### File Uploads
- Media collection with mime type restrictions
- Sharp for image processing
- Alt text required for accessibility

## Payload CMS Specific Patterns

### Type Generation
After any schema changes, regenerate types:
```bash
pnpm db:generate
```

This updates:
- `src/payload-types.ts` - TypeScript types
- `app/(payload)/admin/importMap.js` - Component import map

### Live Preview
Configured in `payload.config.ts`:
```typescript
admin: {
  livePreview: {
    url: envClient.NEXT_PUBLIC_SITE_URL,
  },
}
```

### SEO Plugin
SEO metadata managed via `@payloadcms/plugin-seo`:
- Applied to globals: `start-page`
- Image source: `media` collection
- Generates default title/description fallbacks

## Cursor IDE Rules

The `.cursor/rules/` directory contains comprehensive Payload CMS development guidelines:

- `payload-overview.md` - Core principles and quick reference
- `collections.md` - Collection configuration patterns
- `components.md` - Custom component development
- `access-control.md` - Access control patterns
- `hooks.md` - Hook functions
- `fields.md` - Field type patterns
- `queries.md` - Query patterns
- `endpoints.md` - Custom endpoints
- `adapters.md` - Storage adapters

## Common Issues and Solutions

### Hook Version Mismatch
Ensure all `@payloadcms/*` packages use the exact same version:
```json
{
  "payload": "3.77.0",
  "@payloadcms/ui": "3.77.0",
  "@payloadcms/next": "3.77.0"
}
```

### Import Map Issues
If custom components don't load:
```bash
payload generate:importmap
```

### Database Locked
SQLite can lock during concurrent operations. Ensure proper transaction handling by passing `req` to nested operations.

## Deployment Notes

### Build Output
- Next.js builds to `.next/` directory
- Payload admin panel served at `/admin`
- API routes at `/api/*`

### Docker
Docker Compose files available in each app:
- `apps/web/docker-compose.yml`
- `apps/signatures/docker-compose.yml`

### Production Checklist
- [ ] Set secure `PAYLOAD_SECRET`
- [ ] Run all migrations
- [ ] Set production `NEXT_PUBLIC_SITE_URL`
- [ ] Configure image domains in `next.config.mjs`
- [ ] Run `pnpm ci:fast` to verify build

## Resources

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Payload LLM Context](https://payloadcms.com/llms-full.txt)
- [Next.js Docs](https://nextjs.org/docs)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
