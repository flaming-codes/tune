import * as migration_20260222_103026 from './20260222_103026'
import * as migration_20260222_104519 from './20260222_104519'
import * as migration_20260222_113828 from './20260222_113828'
import * as migration_20260222_114005 from './20260222_114005'

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
  {
    up: migration_20260222_113828.up,
    down: migration_20260222_113828.down,
    name: '20260222_113828',
  },
  {
    up: migration_20260222_114005.up,
    down: migration_20260222_114005.down,
    name: '20260222_114005',
  },
]
