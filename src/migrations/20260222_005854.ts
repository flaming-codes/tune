import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`quote_text\` text DEFAULT 'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.' NOT NULL;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`quote_author\` text DEFAULT 'Dr. Tune Lazri';`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`quote_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`quote_author\`;`)
}
