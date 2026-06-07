# Toolchain Updates

## Current Constraints

- The workspace is pinned to `pnpm@11.5.2`, which requires Node.js `>=22.13.0` for install and workspace commands.
- App package engines require Node.js `>=22.13.0` so package scripts, pnpm 11, and Windows executable packaging use one runtime floor.
- `eslint` is intentionally pinned to the latest compatible v9 release. ESLint 10 currently crashes through the `eslint-plugin-react` version bundled by `eslint-config-next`.
- `@conform-to/*` is pinned to `1.19.3` in `apps/signatures`; `1.19.4` was published inside the active pnpm minimum-release-age window in this install environment and was rejected by policy.

## Pnpm Build Approval

Pnpm 11 uses `allowBuilds` in `pnpm-workspace.yaml` for dependency lifecycle scripts:

- `esbuild`, `sharp`, and `unrs-resolver` are allowed because they install native/runtime binaries used by the apps.
- `lefthook` is denied because root `prepare` installs hooks explicitly.

## Turbo Environment

Turborepo runs tasks in strict environment mode. Required Payload and Next variables are allowlisted via `globalEnv` in `turbo.json` so build tasks receive:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `PAYLOAD_SEED`
- `PAYLOAD_SEED_OVERWRITE`
- `NEXT_PUBLIC_*`

## Integration Tests

Vitest setup files force test-only database settings by default, ignoring normal app `DATABASE_URL` values unless `TEST_DATABASE_URL` is set. API integration tests call `payload.db.migrate()` before querying Payload collections so a clean checkout can run against fresh ignored SQLite test databases.

## CI Build Ordering

The public `web` app reads Payload globals during static prerender. The root `ci:*` scripts use `scripts/run-ci.mjs` to provide local CI env defaults when needed, then run the relevant Payload migrations before `turbo run ... build` so fresh SQLite databases have the required schema before Next.js collects page data. Direct `pnpm build:*` commands still expect the configured database to already be migrated.
