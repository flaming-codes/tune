import * as migration_20260221_212647_initial_schema from './20260221_212647_initial_schema';
import * as migration_20260221_213356_media_enhancements from './20260221_213356_media_enhancements';

export const migrations = [
  {
    up: migration_20260221_212647_initial_schema.up,
    down: migration_20260221_212647_initial_schema.down,
    name: '20260221_212647_initial_schema',
  },
  {
    up: migration_20260221_213356_media_enhancements.up,
    down: migration_20260221_213356_media_enhancements.down,
    name: '20260221_213356_media_enhancements'
  },
];
