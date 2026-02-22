import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`team_members_blocks_member_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Team' NOT NULL,
  	\`headline\` text DEFAULT 'Für Tiere da. Mit Haltung.' NOT NULL,
  	\`subheadline\` text DEFAULT 'Persönlich, präzise und mit ruhiger Hand.' NOT NULL,
  	\`description\` text DEFAULT 'Ein klarer Blick, viel Erfahrung und ehrliche Kommunikation: so begleite ich Sie und Ihr Tier durch jede Lebensphase.' NOT NULL,
  	\`cover_image_id\` integer,
  	\`cta_label\` text DEFAULT 'Termin vereinbaren' NOT NULL,
  	\`cta_href\` text DEFAULT '/#kontakt' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_hero_order_idx\` ON \`team_members_blocks_member_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_hero_parent_id_idx\` ON \`team_members_blocks_member_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_hero_path_idx\` ON \`team_members_blocks_member_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_hero_cover_image_idx\` ON \`team_members_blocks_member_hero\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_member_cv_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`period\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`institution\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_member_cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_cv_entries_order_idx\` ON \`team_members_blocks_member_cv_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_cv_entries_parent_id_idx\` ON \`team_members_blocks_member_cv_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_member_cv\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Werdegang' NOT NULL,
  	\`headline\` text DEFAULT 'Curriculum Vitae' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_cv_order_idx\` ON \`team_members_blocks_member_cv\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_cv_parent_id_idx\` ON \`team_members_blocks_member_cv\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_member_cv_path_idx\` ON \`team_members_blocks_member_cv\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text DEFAULT 'Dr. Tune Lazri' NOT NULL,
  	\`subheadline\` text DEFAULT 'Tierarztpraxis' NOT NULL,
  	\`description\` text DEFAULT 'Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren Liebling gerne bei Ihnen zu Hause.' NOT NULL,
  	\`hero_image_id\` integer,
  	\`cta_primary_text\` text DEFAULT 'Termin vereinbaren' NOT NULL,
  	\`cta_primary_href\` text DEFAULT '#kontakt' NOT NULL,
  	\`cta_secondary_text\` text DEFAULT 'Leistungen' NOT NULL,
  	\`cta_secondary_href\` text DEFAULT '#leistungen' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hero_order_idx\` ON \`team_members_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hero_parent_id_idx\` ON \`team_members_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hero_path_idx\` ON \`team_members_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hero_hero_image_idx\` ON \`team_members_blocks_hero\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_services_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_services_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_services_groups_items_order_idx\` ON \`team_members_blocks_services_groups_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_services_groups_items_parent_id_idx\` ON \`team_members_blocks_services_groups_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_services_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_services_groups_order_idx\` ON \`team_members_blocks_services_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_services_groups_parent_id_idx\` ON \`team_members_blocks_services_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Leistungen' NOT NULL,
  	\`headline\` text DEFAULT 'Umfassende tierärztliche Betreuung für Ihren Liebling' NOT NULL,
  	\`cta_text\` text DEFAULT 'Haben Sie Fragen zu unseren Leistungen?' NOT NULL,
  	\`cta_button_label\` text DEFAULT 'Kontaktieren Sie uns' NOT NULL,
  	\`cta_button_href\` text DEFAULT '#kontakt' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_services_order_idx\` ON \`team_members_blocks_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_services_parent_id_idx\` ON \`team_members_blocks_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_services_path_idx\` ON \`team_members_blocks_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text DEFAULT 'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.' NOT NULL,
  	\`author_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_quote_order_idx\` ON \`team_members_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_quote_parent_id_idx\` ON \`team_members_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_quote_path_idx\` ON \`team_members_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_quote_author_idx\` ON \`team_members_blocks_quote\` (\`author_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Erfahrungen' NOT NULL,
  	\`headline\` text DEFAULT 'Was die Lieblingsmenschen unserer Fellnasen über uns sagen' NOT NULL,
  	\`description\` text DEFAULT 'Wir reden ungern über uns selbst, daher lassen wir lieber die Frauchen und Herrchen erzählen. Schau Dir ihre Erfahrungen an und überzeuge Dich selbst!' NOT NULL,
  	\`google_review_url\` text DEFAULT 'https://search.google.com/local/writereview?placeid=ChIJ7aw4mO8FbUcRmAeyWnxejUs' NOT NULL,
  	\`review_count\` numeric DEFAULT 0 NOT NULL,
  	\`average_rating\` numeric DEFAULT 5 NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_testimonials_order_idx\` ON \`team_members_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_testimonials_parent_id_idx\` ON \`team_members_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_testimonials_path_idx\` ON \`team_members_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Galerie' NOT NULL,
  	\`headline\` text DEFAULT 'Das sind unsere tierischen Patienten' NOT NULL,
  	\`description\` text DEFAULT 'Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.' NOT NULL,
  	\`empty_state_text\` text DEFAULT 'Noch keine Bilder in der Galerie.' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_gallery_order_idx\` ON \`team_members_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_gallery_parent_id_idx\` ON \`team_members_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_gallery_path_idx\` ON \`team_members_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Über uns' NOT NULL,
  	\`headline\` text DEFAULT 'Unser Team' NOT NULL,
  	\`description\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_team_order_idx\` ON \`team_members_blocks_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_team_parent_id_idx\` ON \`team_members_blocks_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_team_path_idx\` ON \`team_members_blocks_team\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_hours_opening_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text NOT NULL,
  	\`state\` text DEFAULT 'open' NOT NULL,
  	\`times\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hours_opening_hours_order_idx\` ON \`team_members_blocks_hours_opening_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hours_opening_hours_parent_id_idx\` ON \`team_members_blocks_hours_opening_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Öffnungszeiten' NOT NULL,
  	\`headline\` text DEFAULT 'Wann wir für Sie da sind' NOT NULL,
  	\`description\` text DEFAULT 'Flexible Öffnungszeiten für Sie und Ihre Lieblinge. Auch Hausbesuche sind nach Vereinbarung möglich.' NOT NULL,
  	\`emergency_title\` text DEFAULT 'Notfälle außerhalb der Öffnungszeiten' NOT NULL,
  	\`emergency_description\` text DEFAULT 'Bei Notfällen rufen Sie uns bitte an. Wir sind für Sie erreichbar.' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hours_order_idx\` ON \`team_members_blocks_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hours_parent_id_idx\` ON \`team_members_blocks_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_hours_path_idx\` ON \`team_members_blocks_hours\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Kontakt' NOT NULL,
  	\`headline\` text DEFAULT 'Wir freuen uns auf Sie' NOT NULL,
  	\`description\` text DEFAULT 'Ihr Liebling braucht Zuhause tierärztliche Betreuung? Ich bin nur einen Anruf entfernt.' NOT NULL,
  	\`address_street\` text DEFAULT 'Brünnerstraße 219-221' NOT NULL,
  	\`address_city\` text DEFAULT '1210 Wien' NOT NULL,
  	\`address_additional\` text DEFAULT '1 TOP 60 (Einkaufszentrum B7)',
  	\`phone\` text DEFAULT '+43 699 190 12 012' NOT NULL,
  	\`email\` text DEFAULT 'contact@tierarztpraxis-lazri.at' NOT NULL,
  	\`consultation_times\` text DEFAULT 'Mo–Fr: 09:00 – 12:00
  Nachmittags nach Vereinbarung' NOT NULL,
  	\`directions_description\` text DEFAULT 'Unsere Praxis befindet sich im Einkaufszentrum B7 an der Brünnerstraße. Parkmöglichkeiten sind direkt vor dem Eingang vorhanden.' NOT NULL,
  	\`directions_link_label\` text DEFAULT 'In Google Maps öffnen' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_contact_order_idx\` ON \`team_members_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_contact_parent_id_idx\` ON \`team_members_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_contact_path_idx\` ON \`team_members_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Anfrage' NOT NULL,
  	\`headline\` text DEFAULT 'Schreiben Sie uns' NOT NULL,
  	\`description\` text DEFAULT 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_contact_form_order_idx\` ON \`team_members_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_contact_form_parent_id_idx\` ON \`team_members_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_contact_form_path_idx\` ON \`team_members_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_accordion_items_order_idx\` ON \`team_members_blocks_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_accordion_items_parent_id_idx\` ON \`team_members_blocks_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'FAQ' NOT NULL,
  	\`headline\` text DEFAULT 'Häufig gestellte Fragen' NOT NULL,
  	\`description\` text,
  	\`alignment\` text DEFAULT 'start',
  	\`allow_multiple_open\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_blocks_accordion_order_idx\` ON \`team_members_blocks_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_accordion_parent_id_idx\` ON \`team_members_blocks_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_blocks_accordion_path_idx\` ON \`team_members_blocks_accordion\` (\`_path\`);`)
  await db.run(sql`ALTER TABLE \`team_members\` ADD \`slug\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`team_members_slug_idx\` ON \`team_members\` (\`slug\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`team_members_blocks_member_hero\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_member_cv_entries\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_member_cv\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_services_groups_items\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_services_groups\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_services\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_team\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_hours_opening_hours\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_hours\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_accordion\`;`)
  await db.run(sql`DROP INDEX \`team_members_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`team_members\` DROP COLUMN \`slug\`;`)
}
