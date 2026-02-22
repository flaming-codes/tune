import * as migration_20260222_152036 from './20260222_152036';
import * as migration_20260222_192908_analytics_subsystem from './20260222_192908_analytics_subsystem';
import * as migration_20260222_195213 from './20260222_195213';
import * as migration_20260222_210801 from './20260222_210801';
import * as migration_20260222_211327 from './20260222_211327';
import * as migration_20260222_213643_add_team_member_pages from './20260222_213643_add_team_member_pages';

export const migrations = [
  {
    up: migration_20260222_152036.up,
    down: migration_20260222_152036.down,
    name: '20260222_152036',
  },
  {
    up: migration_20260222_192908_analytics_subsystem.up,
    down: migration_20260222_192908_analytics_subsystem.down,
    name: '20260222_192908_analytics_subsystem',
  },
  {
    up: migration_20260222_195213.up,
    down: migration_20260222_195213.down,
    name: '20260222_195213',
  },
  {
    up: migration_20260222_210801.up,
    down: migration_20260222_210801.down,
    name: '20260222_210801',
  },
  {
    up: migration_20260222_211327.up,
    down: migration_20260222_211327.down,
    name: '20260222_211327',
  },
  {
    up: migration_20260222_213643_add_team_member_pages.up,
    down: migration_20260222_213643_add_team_member_pages.down,
    name: '20260222_213643_add_team_member_pages'
  },
];
