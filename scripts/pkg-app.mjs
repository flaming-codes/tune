#!/usr/bin/env node

/**
 * Packages a Next.js standalone app into a distributable folder with a
 * Node.js runtime executable (via @yao-pkg/pkg).
 *
 * Expected to run from an app directory (e.g. apps/web/) via turbo.
 * Reads the app name from the local package.json.
 *
 * Output structure:
 *   dist/<appName>/
 *     med-<appName>.exe   – Node.js runtime + thin launcher
 *     app/                – Next.js standalone build (real filesystem)
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const appDir = process.cwd()
const appPkg = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf-8'))
const appName = appPkg.name
const monoRoot = path.resolve(appDir, '../../')
const distDir = path.join(monoRoot, 'dist', appName)

// ── Paths ────────────────────────────────────────────────────────────
const standaloneSrc = path.join(appDir, '.next', 'standalone')
const staticSrc = path.join(appDir, '.next', 'static')
const publicSrc = path.join(appDir, 'public')

// ── Validate build exists ────────────────────────────────────────────
if (!fs.existsSync(standaloneSrc)) {
  console.error(
    `[pkg-app] Standalone build not found at ${standaloneSrc}\n` +
      '  Run "pnpm build" first, or let turbo handle it (build:exe depends on build).',
  )
  process.exit(1)
}

console.log(`[pkg-app] Packaging "${appName}" for Windows x64...`)

// ── Clean & create dist directory ────────────────────────────────────
fs.rmSync(distDir, { recursive: true, force: true })
fs.mkdirSync(distDir, { recursive: true })

const appDataDir = path.join(distDir, 'app')

// ── 1. Copy standalone output ────────────────────────────────────────
console.log('[pkg-app] Copying standalone build...')
fs.cpSync(standaloneSrc, appDataDir, { recursive: true })

// ── 2. Copy .next/static/ (not included in standalone) ───────────────
const staticDest = path.join(appDataDir, 'apps', appName, '.next', 'static')
if (fs.existsSync(staticSrc)) {
  console.log('[pkg-app] Copying .next/static/...')
  fs.cpSync(staticSrc, staticDest, { recursive: true })
}

// ── 3. Copy public/ directory ────────────────────────────────────────
const publicDest = path.join(appDataDir, 'apps', appName, 'public')
if (fs.existsSync(publicSrc)) {
  console.log('[pkg-app] Copying public/...')
  fs.cpSync(publicSrc, publicDest, { recursive: true })
}

// ── 4. Copy .env if it exists ────────────────────────────────────────
const envSrc = path.join(appDir, '.env')
const envDest = path.join(appDataDir, 'apps', appName, '.env')
if (fs.existsSync(envSrc)) {
  console.log('[pkg-app] Copying .env...')
  fs.copyFileSync(envSrc, envDest)
}

// ── 5. Generate thin CJS launcher ────────────────────────────────────
//
// pkg embeds this into the exe. At runtime it locates the standalone
// server.js on the real filesystem (next to the exe) and loads it via
// dynamic import(). This keeps the entire Next.js app on writable disk
// so SQLite, media uploads, and native modules all work normally.
const launcherPath = path.join(distDir, '_launcher.cjs')
const launcherContent = `\
'use strict';
const path = require('path');

const exeDir = path.dirname(process.execPath);
const serverPath = path.join(exeDir, 'app', 'apps', '${appName}', 'server.js');

// Convert to file:// URL (required for ESM dynamic import on Windows)
const serverUrl = 'file:///' + serverPath.replace(/\\\\/g, '/');

import(serverUrl).catch(function (err) {
  console.error('Failed to start server:', err);
  process.exit(1);
});
`
fs.writeFileSync(launcherPath, launcherContent)

// ── 6. Run pkg ───────────────────────────────────────────────────────
const exeName = `med-${appName}`
const pkgTarget = 'node20-win-x64'
const pkgCmd = [
  'npx @yao-pkg/pkg',
  JSON.stringify(launcherPath),
  `--target ${pkgTarget}`,
  `--output ${JSON.stringify(path.join(distDir, exeName))}`,
  '--no-bytecode',
  '--public-packages "*"',
  '--public',
].join(' ')

console.log(`[pkg-app] Running pkg (target: ${pkgTarget})...`)
try {
  execSync(pkgCmd, { stdio: 'inherit', cwd: monoRoot })
} catch {
  console.error('[pkg-app] pkg failed. See output above.')
  process.exit(1)
}

// ── 7. Clean up launcher ─────────────────────────────────────────────
fs.unlinkSync(launcherPath)

console.log()
console.log(`[pkg-app] Done! Output: dist/${appName}/`)
console.log(`  Executable : ${exeName}.exe`)
console.log(`  App data   : dist/${appName}/app/`)
console.log()
console.log(`  To run: cd dist\\${appName} && ${exeName}.exe`)
console.log(`  The server starts on port ${appName === 'web' ? '3000' : '3001'} by default (override with PORT env var).`)
