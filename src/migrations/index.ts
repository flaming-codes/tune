import * as migration_20260222_013957 from './20260222_013957'
import * as migration_20260222_065652_start_page_blocks from './20260222_065652_start_page_blocks'
import * as migration_20260222_090559 from './20260222_090559'

export const migrations = [
  {
    up: migration_20260222_013957.up,
    down: migration_20260222_013957.down,
    name: '20260222_013957',
  },
  {
    up: migration_20260222_065652_start_page_blocks.up,
    down: migration_20260222_065652_start_page_blocks.down,
    name: '20260222_065652_start_page_blocks',
  },
  {
    up: migration_20260222_090559.up,
    down: migration_20260222_090559.down,
    name: '20260222_090559',
  },
]
