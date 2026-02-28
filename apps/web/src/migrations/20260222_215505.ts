import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`team_members_blocks_member_hero\` ADD \`variant\` text DEFAULT 'editorial' NOT NULL;`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`team_members_blocks_member_hero\` DROP COLUMN \`variant\`;`)
}
