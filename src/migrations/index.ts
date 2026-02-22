import * as migration_20260221_212647_initial_schema from './20260221_212647_initial_schema'
import * as migration_20260221_213356_media_enhancements from './20260221_213356_media_enhancements'
import * as migration_20260221_232902 from './20260221_232902'
import * as migration_20260222_003624 from './20260222_003624'
import * as migration_20260222_005854 from './20260222_005854'
import * as migration_20260222_010638 from './20260222_010638'

export const migrations = [
  {
    up: migration_20260221_212647_initial_schema.up,
    down: migration_20260221_212647_initial_schema.down,
    name: '20260221_212647_initial_schema',
  },
  {
    up: migration_20260221_213356_media_enhancements.up,
    down: migration_20260221_213356_media_enhancements.down,
    name: '20260221_213356_media_enhancements',
  },
  {
    up: migration_20260221_232902.up,
    down: migration_20260221_232902.down,
    name: '20260221_232902',
  },
  {
    up: migration_20260222_003624.up,
    down: migration_20260222_003624.down,
    name: '20260222_003624',
  },
  {
    up: migration_20260222_005854.up,
    down: migration_20260222_005854.down,
    name: '20260222_005854',
  },
  {
    up: migration_20260222_010638.up,
    down: migration_20260222_010638.down,
    name: '20260222_010638',
  },
]
