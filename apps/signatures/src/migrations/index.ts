import * as migration_20260222_095811_init_signatures from './20260222_095811_init_signatures';

export const migrations = [
  {
    up: migration_20260222_095811_init_signatures.up,
    down: migration_20260222_095811_init_signatures.down,
    name: '20260222_095811_init_signatures'
  },
];
