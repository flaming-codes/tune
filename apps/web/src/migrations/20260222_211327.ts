import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`start_page_blocks_accordion\` ADD \`alignment\` text DEFAULT 'start';`,
  )
  await db.run(
    sql`ALTER TABLE \`_start_page_v_blocks_accordion\` ADD \`alignment\` text DEFAULT 'start';`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`start_page_blocks_accordion\` DROP COLUMN \`alignment\`;`)
  await db.run(sql`ALTER TABLE \`_start_page_v_blocks_accordion\` DROP COLUMN \`alignment\`;`)
}
