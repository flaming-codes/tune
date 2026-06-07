#!/usr/bin/env node

import { spawnSync } from 'node:child_process'

const target = process.argv[2] ?? 'fast'

const commands = {
  fast: [
    ['pnpm', ['db:migrate']],
    ['turbo', ['run', 'lint', 'typecheck', 'test:int', 'build', '--output-logs=new-only']],
  ],
  web: [
    ['pnpm', ['db:migrate:web']],
    ['turbo', ['run', 'lint', 'typecheck', 'test:int', 'build', '--filter=web', '--output-logs=new-only']],
  ],
  signatures: [
    ['pnpm', ['db:migrate:signatures']],
    [
      'turbo',
      ['run', 'lint', 'typecheck', 'test:int', 'build', '--filter=signatures', '--output-logs=new-only'],
    ],
  ],
}

const selectedCommands = commands[target]

if (!selectedCommands) {
  console.error(`[run-ci] Unknown target "${target}". Expected one of: ${Object.keys(commands).join(', ')}`)
  process.exit(1)
}

const env = {
  ...process.env,
  DATABASE_URL: process.env.DATABASE_URL ?? 'file:./ci.db',
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ?? 'ci-payload-secret',
}

for (const [command, args] of selectedCommands) {
  const result = spawnSync(command, args, {
    env,
    shell: process.platform === 'win32',
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
