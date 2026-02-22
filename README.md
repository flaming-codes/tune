# med-site monorepo

PNPM workspace + Turborepo setup for the website and shared design primitives.

## Workspace layout

- `apps/web`: Next.js + Payload application
- `packages/theme`: shared Tailwind/global theme stylesheet package (`@med/theme`)

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Copy env file for the web app:

```bash
cp apps/web/.env.example apps/web/.env
```

3. Start the app from the monorepo root:

```bash
pnpm dev
```

4. Open `http://localhost:3000`.

## Common commands

- `pnpm dev` - run web app in dev mode through Turborepo
- `pnpm build` - production build for `apps/web`
- `pnpm lint` - lint all workspace packages that expose a `lint` script
- `pnpm typecheck` - run TypeScript checks for `apps/web`
- `pnpm test` - run integration tests (`test:int`) for `apps/web`
- `pnpm test:e2e` - run Playwright end-to-end tests for `apps/web`
- `pnpm ci:fast` - optimized CI task set (`lint`, `typecheck`, `test:int`, `build`)
- `pnpm db:migrate` - run Payload migrations for `apps/web`

## Theme package

The global Tailwind/theme stylesheet is provided by `@med/theme` and imported in `apps/web/src/app/(frontend)/layout.tsx` via:

```ts
import '@med/theme/global.css'
```

This keeps the theme reusable for additional apps while leaving app-specific components in `apps/web`.
