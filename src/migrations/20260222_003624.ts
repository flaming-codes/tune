import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`contact_form_eyebrow\` text DEFAULT 'Anfrage' NOT NULL;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`contact_form_headline\` text DEFAULT 'Schreiben Sie uns' NOT NULL;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`contact_form_description\` text DEFAULT 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.' NOT NULL;`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`contact_form_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`contact_form_headline\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`contact_form_description\`;`)
}
