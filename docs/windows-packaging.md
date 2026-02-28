# Windows Packaging

Both apps can be deployed to Windows machines either as standalone `.exe` files (via `@yao-pkg/pkg`) or through batch-file automation that uses the standard Node.js toolchain.

## Architecture

### Standalone Output

Both `apps/web` and `apps/signatures` use Next.js `output: 'standalone'` mode. This produces a self-contained server in `.next/standalone/` during `next build`, with only the traced `node_modules` needed at runtime.

`outputFileTracingRoot` is set to the monorepo root (`../../`) so that workspace dependencies (`@med/theme`, shared hoisted modules) are traced correctly.

### pkg Executable Approach

`@yao-pkg/pkg` compiles a thin Node.js entry script into a Windows `.exe` that bundles the Node.js runtime (~60-80MB). The actual application files ship alongside the executable — pkg does **not** bundle `.next/`, `node_modules/`, or static assets into the binary.

**Distribution structure:**

```
dist/<app>/
  <app>.exe              # Node.js runtime + entry script (double-click to start)
  server.js              # Patched Next.js standalone server
  .next/                 # Compiled application (server + static)
  node_modules/          # Traced dependencies (incl. native .node binaries)
  public/                # Static assets
  media/ or              # Upload directory (empty initially)
    screensaver-images/
  .env.example           # Template — copy to .env and configure
```

### Entry Point Scripts

Each app has a `standalone-entry.cjs` that pkg compiles into the `.exe`:

- Sets `process.cwd()` to the directory containing the executable
- Loads `.env` from that directory (fallback; Next.js also loads `.env` natively)
- Sets default `PORT` (3000 for web, 3001 for signatures) and `HOSTNAME`
- Requires `./server.js` to start the standalone Next.js server

Named `.cjs` because the project uses `"type": "module"` and the entry must be CommonJS for pkg compatibility.

### Build Orchestrator

`scripts/build-exe.mjs` handles the full assembly:

1. Verifies standalone output exists (requires `pnpm build` first)
2. Copies and patches `server.js` — strips `process.chdir(__dirname)` which breaks inside pkg's virtual filesystem
3. Copies `.next/` (from standalone), `.next/static/` (from original build), `node_modules/` (merged from monorepo + app level), and `public/`
4. Runs `@yao-pkg/pkg` targeting `node20-win-x64`
5. Generates `.env.example` and empty media directory
6. Cleans up intermediate files

Supports `--app=web` or `--app=signatures` to build a single app.

### Batch File Fallback

Three `.bat` files at the monorepo root for environments where Node.js + pnpm are installed:

| File | Purpose |
|------|---------|
| `start-web.bat` | Install → build → migrate → start web on port 3000 |
| `start-signatures.bat` | Install → build → migrate → start signatures on port 3001 |
| `start-all.bat` | Install → build → migrate → start both in separate windows |

Each checks for Node.js/pnpm availability, installs via corepack if needed, and provides error messages with progress indicators.

## Commands

```bash
# Build both apps in standalone mode (prerequisite)
pnpm build

# Build pkg executables for both apps
pnpm build:exe

# Build for a single app
pnpm build:exe:web
pnpm build:exe:signatures
```

## Native Module Considerations

The `.exe` must be built on a Windows machine (or with Windows native deps installed). Two native modules require platform-specific binaries:

- `@libsql/win32-x64-msvc` — SQLite native driver for Payload CMS
- `@img/sharp-win32-x64` — Image processing for media uploads

When `pnpm install` runs on Windows, these are pulled automatically as optional dependencies.

**Cross-build from macOS:** Install Windows binaries explicitly:
```bash
pnpm install @libsql/win32-x64-msvc @img/sharp-win32-x64 --save-optional
```

## Environment Variables

The `.env` file must exist next to the `.exe` (or in the monorepo root for batch files):

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `DATABASE_URL` | Yes | — | `file:./web.db` or `file:./signatures.db` |
| `PAYLOAD_SECRET` | Yes | — | Random string for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | No | `http://localhost:<port>` | Public URL |
| `NEXT_PUBLIC_PAYLOAD_URL` | No | `http://localhost:<port>` | API URL |
| `NEXT_PUBLIC_SCREENSAVER_TIMEOUT_SECONDS` | No | `120` | Signatures app only |

## Key Files

| File | Purpose |
|------|---------|
| `apps/web/next.config.mjs` | Standalone output config |
| `apps/signatures/next.config.mjs` | Standalone output config |
| `apps/web/standalone-entry.cjs` | pkg entry point (web) |
| `apps/signatures/standalone-entry.cjs` | pkg entry point (signatures) |
| `scripts/build-exe.mjs` | Build orchestrator |
| `start-web.bat` | Batch fallback (web) |
| `start-signatures.bat` | Batch fallback (signatures) |
| `start-all.bat` | Batch fallback (both) |
