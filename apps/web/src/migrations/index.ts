import * as migration_20260222_103026 from './20260222_103026'
import * as migration_20260222_104519 from './20260222_104519'

export const migrations = [
  {
    up: migration_20260222_103026.up,
    down: migration_20260222_103026.down,
    name: '20260222_103026',
  },
  {
    up: migration_20260222_104519.up,
    down: migration_20260222_104519.down,
    name: '20260222_104519',
  },
]
