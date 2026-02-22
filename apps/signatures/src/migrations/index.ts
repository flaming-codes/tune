import * as migration_20260222_095811_init_signatures from './20260222_095811_init_signatures'
import * as migration_20260222_113307 from './20260222_113307'
import * as migration_20260222_145853 from './20260222_145853'

export const migrations = [
  {
    up: migration_20260222_095811_init_signatures.up,
    down: migration_20260222_095811_init_signatures.down,
    name: '20260222_095811_init_signatures',
  },
  {
    up: migration_20260222_113307.up,
    down: migration_20260222_113307.down,
    name: '20260222_113307',
  },
  {
    up: migration_20260222_145853.up,
    down: migration_20260222_145853.down,
    name: '20260222_145853',
  },
]
