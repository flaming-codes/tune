import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`practice_name\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri' NOT NULL,
  	\`hero_headline\` text DEFAULT 'Dr. Tune Lazri' NOT NULL,
  	\`hero_subheadline\` text DEFAULT 'Tierarztpraxis' NOT NULL,
  	\`hero_description\` text DEFAULT 'Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren Liebling gerne bei Ihnen zu Hause.' NOT NULL,
  	\`hero_hero_image_id\` integer,
  	\`hero_cta_primary\` text DEFAULT 'Termin vereinbaren' NOT NULL,
  	\`hero_cta_secondary\` text DEFAULT 'Leistungen' NOT NULL,
  	\`contact_address_street\` text DEFAULT 'Brünnerstraße 219-221' NOT NULL,
  	\`contact_address_city\` text DEFAULT '1210 Wien' NOT NULL,
  	\`contact_address_additional\` text DEFAULT '1 TOP 60 (Einkaufszentrum B7)',
  	\`contact_phone\` text DEFAULT '+43 699 190 12 012' NOT NULL,
  	\`contact_email\` text DEFAULT 'contact@tierarztpraxis-lazri.at' NOT NULL,
  	\`emergency_title\` text DEFAULT 'Notfälle außerhalb der Öffnungszeiten' NOT NULL,
  	\`emergency_description\` text DEFAULT 'Bei Notfällen rufen Sie uns bitte an. Wir sind für Sie erreichbar.' NOT NULL,
  	\`contact_form_eyebrow\` text DEFAULT 'Anfrage' NOT NULL,
  	\`contact_form_headline\` text DEFAULT 'Schreiben Sie uns' NOT NULL,
  	\`contact_form_description\` text DEFAULT 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.' NOT NULL,
  	\`footer_tagline\` text DEFAULT 'Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.' NOT NULL,
  	\`footer_copyright\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge.' NOT NULL,
  	\`quote_text\` text DEFAULT 'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.' NOT NULL,
  	\`quote_author_id\` integer,
  	\`seo_title\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri | Wien' NOT NULL,
  	\`seo_description\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri in Wien. Hausbesuche, Vorsorge, Diagnostik, Operationen. Mit Leidenschaft für Ihre Lieblinge.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quote_author_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_site_settings\`("id", "practice_name", "hero_headline", "hero_subheadline", "hero_description", "hero_hero_image_id", "hero_cta_primary", "hero_cta_secondary", "contact_address_street", "contact_address_city", "contact_address_additional", "contact_phone", "contact_email", "emergency_title", "emergency_description", "contact_form_eyebrow", "contact_form_headline", "contact_form_description", "footer_tagline", "footer_copyright", "quote_text", "quote_author_id", "seo_title", "seo_description", "updated_at", "created_at") SELECT "id", "practice_name", "hero_headline", "hero_subheadline", "hero_description", "hero_hero_image_id", "hero_cta_primary", "hero_cta_secondary", "contact_address_street", "contact_address_city", "contact_address_additional", "contact_phone", "contact_email", "emergency_title", "emergency_description", "contact_form_eyebrow", "contact_form_headline", "contact_form_description", "footer_tagline", "footer_copyright", "quote_text", "quote_author_id", "seo_title", "seo_description", "updated_at", "created_at" FROM \`site_settings\`;`,
  )
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(
    sql`CREATE INDEX \`site_settings_hero_hero_hero_image_idx\` ON \`site_settings\` (\`hero_hero_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_quote_quote_author_idx\` ON \`site_settings\` (\`quote_author_id\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`practice_name\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri' NOT NULL,
  	\`hero_headline\` text DEFAULT 'Dr. Tune Lazri' NOT NULL,
  	\`hero_subheadline\` text DEFAULT 'Tierarztpraxis' NOT NULL,
  	\`hero_description\` text DEFAULT 'Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren Liebling gerne bei Ihnen zu Hause.' NOT NULL,
  	\`hero_hero_image_id\` integer,
  	\`hero_cta_primary\` text DEFAULT 'Termin vereinbaren' NOT NULL,
  	\`hero_cta_secondary\` text DEFAULT 'Leistungen' NOT NULL,
  	\`contact_address_street\` text DEFAULT 'Brünnerstraße 219-221' NOT NULL,
  	\`contact_address_city\` text DEFAULT '1210 Wien' NOT NULL,
  	\`contact_address_additional\` text DEFAULT '1 TOP 60 (Einkaufszentrum B7)',
  	\`contact_phone\` text DEFAULT '+43 699 190 12 012' NOT NULL,
  	\`contact_email\` text DEFAULT 'contact@tierarztpraxis-lazri.at' NOT NULL,
  	\`emergency_title\` text DEFAULT 'Notfälle außerhalb der Öffnungszeiten' NOT NULL,
  	\`emergency_description\` text DEFAULT 'Bei Notfällen rufen Sie uns bitte an. Wir sind für Sie erreichbar.' NOT NULL,
  	\`contact_form_eyebrow\` text DEFAULT 'Anfrage' NOT NULL,
  	\`contact_form_headline\` text DEFAULT 'Schreiben Sie uns' NOT NULL,
  	\`contact_form_description\` text DEFAULT 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.' NOT NULL,
  	\`footer_tagline\` text DEFAULT 'Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.' NOT NULL,
  	\`footer_copyright\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge.' NOT NULL,
  	\`quote_text\` text DEFAULT 'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.' NOT NULL,
  	\`quote_author\` text DEFAULT 'Dr. Tune Lazri',
  	\`seo_title\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri | Wien' NOT NULL,
  	\`seo_description\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri in Wien. Hausbesuche, Vorsorge, Diagnostik, Operationen. Mit Leidenschaft für Ihre Lieblinge.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_site_settings\`("id", "practice_name", "hero_headline", "hero_subheadline", "hero_description", "hero_hero_image_id", "hero_cta_primary", "hero_cta_secondary", "contact_address_street", "contact_address_city", "contact_address_additional", "contact_phone", "contact_email", "emergency_title", "emergency_description", "contact_form_eyebrow", "contact_form_headline", "contact_form_description", "footer_tagline", "footer_copyright", "quote_text", "quote_author", "seo_title", "seo_description", "updated_at", "created_at") SELECT "id", "practice_name", "hero_headline", "hero_subheadline", "hero_description", "hero_hero_image_id", "hero_cta_primary", "hero_cta_secondary", "contact_address_street", "contact_address_city", "contact_address_additional", "contact_phone", "contact_email", "emergency_title", "emergency_description", "contact_form_eyebrow", "contact_form_headline", "contact_form_description", "footer_tagline", "footer_copyright", "quote_text", "quote_author", "seo_title", "seo_description", "updated_at", "created_at" FROM \`site_settings\`;`,
  )
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(
    sql`CREATE INDEX \`site_settings_hero_hero_hero_image_idx\` ON \`site_settings\` (\`hero_hero_image_id\`);`,
  )
}
