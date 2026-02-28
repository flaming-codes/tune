# Windows Packaging

Both apps can be packaged as standalone Windows executables via `@yao-pkg/pkg`, so they run on machines without Node.js installed.

## Architecture

### Standalone Output

Both `apps/web` and `apps/signatures` use Next.js `output: 'standalone'` mode. This produces a self-contained server in `.next/standalone/` during `next build`, with only the traced `node_modules` needed at runtime.

`outputFileTracingRoot` is set to the monorepo root (`../../`) so that workspace dependencies (`@med/theme`, shared hoisted modules) are traced correctly.

### pkg Executable Approach

`@yao-pkg/pkg` compiles a thin CJS launcher into a Windows `.exe` that bundles the Node.js runtime (~60-80 MB). The actual application files ship alongside the executable in an `app/` folder — pkg does **not** bundle `.next/`, `node_modules/`, or static assets into the binary. This keeps SQLite databases, media uploads, and native modules on writable disk.

**Distribution structure:**

```
dist/<appName>/
  med-<appName>.exe        # Node.js runtime + thin launcher
  app/                     # Next.js standalone build
    apps/<appName>/
      server.js            # Next.js standalone entry point
      .next/               # Compiled app (server + static)
      node_modules/        # App-level traced dependencies
      public/              # Static assets (favicons, etc.)
      media/               # Payload uploads (writable)
      .env                 # Environment variables (if present)
    node_modules/          # Root-level traced dependencies
```

### Launcher

The `.exe` embeds a CJS launcher generated at build time. On startup it:

1. Resolves the `app/` folder relative to the executable via `process.execPath`
2. Dynamically `import()`s the ESM `server.js` from the real filesystem
3. Node.js module resolution finds `node_modules/` and `.next/` normally

Named `.cjs` because the project uses `"type": "module"` and the entry must be CommonJS for pkg compatibility. The dynamic `import()` bridges CJS → ESM to load Next.js's standalone server.

### Build Script

`scripts/pkg-app.mjs` is a shared packaging script called by both apps via turbo:

1. Reads the app name from the current directory's `package.json`
2. Validates standalone build exists (`.next/standalone/`)
3. Copies standalone output into `dist/<appName>/app/`
4. Copies `.next/static/` (not included in standalone by default)
5. Copies `public/` directory
6. Copies `.env` if present
7. Generates the CJS launcher, runs `@yao-pkg/pkg` targeting `node20-win-x64`
8. Cleans up the temporary launcher file

## Commands

```bash
# Build both apps as executables (turbo ensures next build runs first)
pnpm build:exe

# Build for a single app
pnpm build:exe:web
pnpm build:exe:signatures
```

On the Windows target machine:

```
cd dist\web
med-web.exe
```

Default ports: 3000 (web), 3001 (signatures). Override with `PORT` env var.

## Native Module Considerations

The `.exe` **must be built on a Windows machine** (or with Windows native deps installed). Key native modules:

- `@libsql/win32-x64-msvc` — SQLite native driver for Payload CMS
- `@img/sharp-win32-x64` — Image processing for media uploads

When `pnpm install` runs on Windows, these are pulled automatically as optional dependencies.

## Environment Variables

The `.env` file lives at `app/apps/<appName>/.env` next to `server.js`:

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `DATABASE_URL` | Yes | — | `file:./web.db` or `file:./signatures.db` |
| `PAYLOAD_SECRET` | Yes | — | Random string for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | No | `http://localhost:<port>` | Public URL |
| `PORT` | No | `3000` / `3001` | Server port |

## Key Files

| File | Purpose |
|------|---------|
| `scripts/pkg-app.mjs` | Shared build orchestrator |
| `apps/web/next.config.mjs` | Standalone output config (web) |
| `apps/signatures/next.config.mjs` | Standalone output config (signatures) |
| `turbo.json` | `build:exe` task depends on `build`, cache disabled |
