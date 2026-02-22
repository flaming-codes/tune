import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_navigation_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_navigation_links_order_idx\` ON \`_start_page_v_blocks_navigation_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_navigation_links_parent_id_idx\` ON \`_start_page_v_blocks_navigation_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_navigation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`practice_name\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri',
  	\`phone\` text DEFAULT '+43 699 190 12 012',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_navigation_order_idx\` ON \`_start_page_v_blocks_navigation\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_navigation_parent_id_idx\` ON \`_start_page_v_blocks_navigation\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_navigation_path_idx\` ON \`_start_page_v_blocks_navigation\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text DEFAULT 'Dr. Tune Lazri',
  	\`subheadline\` text DEFAULT 'Tierarztpraxis',
  	\`description\` text DEFAULT 'Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren Liebling gerne bei Ihnen zu Hause.',
  	\`hero_image_id\` integer,
  	\`cta_primary_text\` text DEFAULT 'Termin vereinbaren',
  	\`cta_primary_href\` text DEFAULT '#kontakt',
  	\`cta_secondary_text\` text DEFAULT 'Leistungen',
  	\`cta_secondary_href\` text DEFAULT '#leistungen',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hero_order_idx\` ON \`_start_page_v_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hero_parent_id_idx\` ON \`_start_page_v_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hero_path_idx\` ON \`_start_page_v_blocks_hero\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hero_hero_image_idx\` ON \`_start_page_v_blocks_hero\` (\`hero_image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_services_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_services_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_services_groups_items_order_idx\` ON \`_start_page_v_blocks_services_groups_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_services_groups_items_parent_id_idx\` ON \`_start_page_v_blocks_services_groups_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_services_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_services_groups_order_idx\` ON \`_start_page_v_blocks_services_groups\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_services_groups_parent_id_idx\` ON \`_start_page_v_blocks_services_groups\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Leistungen',
  	\`headline\` text DEFAULT 'Umfassende tierärztliche Betreuung für Ihren Liebling',
  	\`cta_text\` text DEFAULT 'Haben Sie Fragen zu unseren Leistungen?',
  	\`cta_button_label\` text DEFAULT 'Kontaktieren Sie uns',
  	\`cta_button_href\` text DEFAULT '#kontakt',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_services_order_idx\` ON \`_start_page_v_blocks_services\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_services_parent_id_idx\` ON \`_start_page_v_blocks_services\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_services_path_idx\` ON \`_start_page_v_blocks_services\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text DEFAULT 'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.',
  	\`author_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_quote_order_idx\` ON \`_start_page_v_blocks_quote\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_quote_parent_id_idx\` ON \`_start_page_v_blocks_quote\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_quote_path_idx\` ON \`_start_page_v_blocks_quote\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_quote_author_idx\` ON \`_start_page_v_blocks_quote\` (\`author_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Erfahrungen',
  	\`headline\` text DEFAULT 'Was die Lieblingsmenschen unserer Fellnasen über uns sagen',
  	\`description\` text DEFAULT 'Wir reden ungern über uns selbst, daher lassen wir lieber die Frauchen und Herrchen erzählen. Schau Dir ihre Erfahrungen an und überzeuge Dich selbst!',
  	\`google_review_url\` text DEFAULT 'https://search.google.com/local/writereview?placeid=ChIJ7aw4mO8FbUcRmAeyWnxejUs',
  	\`review_count\` numeric DEFAULT 0,
  	\`average_rating\` numeric DEFAULT 5,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_testimonials_order_idx\` ON \`_start_page_v_blocks_testimonials\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_testimonials_parent_id_idx\` ON \`_start_page_v_blocks_testimonials\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_testimonials_path_idx\` ON \`_start_page_v_blocks_testimonials\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Galerie',
  	\`headline\` text DEFAULT 'Das sind unsere tierischen Patienten',
  	\`description\` text DEFAULT 'Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.',
  	\`empty_state_text\` text DEFAULT 'Noch keine Bilder in der Galerie.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_gallery_order_idx\` ON \`_start_page_v_blocks_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_gallery_parent_id_idx\` ON \`_start_page_v_blocks_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_gallery_path_idx\` ON \`_start_page_v_blocks_gallery\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Über uns',
  	\`headline\` text DEFAULT 'Unser Team',
  	\`description\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_team_order_idx\` ON \`_start_page_v_blocks_team\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_team_parent_id_idx\` ON \`_start_page_v_blocks_team\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_team_path_idx\` ON \`_start_page_v_blocks_team\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_hours_opening_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`day\` text,
  	\`state\` text DEFAULT 'open',
  	\`times\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hours_opening_hours_order_idx\` ON \`_start_page_v_blocks_hours_opening_hours\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hours_opening_hours_parent_id_idx\` ON \`_start_page_v_blocks_hours_opening_hours\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Öffnungszeiten',
  	\`headline\` text DEFAULT 'Wann wir für Sie da sind',
  	\`description\` text DEFAULT 'Flexible Öffnungszeiten für Sie und Ihre Lieblinge. Auch Hausbesuche sind nach Vereinbarung möglich.',
  	\`emergency_title\` text DEFAULT 'Notfälle außerhalb der Öffnungszeiten',
  	\`emergency_description\` text DEFAULT 'Bei Notfällen rufen Sie uns bitte an. Wir sind für Sie erreichbar.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hours_order_idx\` ON \`_start_page_v_blocks_hours\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hours_parent_id_idx\` ON \`_start_page_v_blocks_hours\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_hours_path_idx\` ON \`_start_page_v_blocks_hours\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Kontakt',
  	\`headline\` text DEFAULT 'Wir freuen uns auf Sie',
  	\`description\` text DEFAULT 'Ihr Liebling braucht Zuhause tierärztliche Betreuung? Ich bin nur einen Anruf entfernt.',
  	\`address_street\` text DEFAULT 'Brünnerstraße 219-221',
  	\`address_city\` text DEFAULT '1210 Wien',
  	\`address_additional\` text DEFAULT '1 TOP 60 (Einkaufszentrum B7)',
  	\`phone\` text DEFAULT '+43 699 190 12 012',
  	\`email\` text DEFAULT 'contact@tierarztpraxis-lazri.at',
  	\`consultation_times\` text DEFAULT 'Mo–Fr: 09:00 – 12:00
  Nachmittags nach Vereinbarung',
  	\`directions_description\` text DEFAULT 'Unsere Praxis befindet sich im Einkaufszentrum B7 an der Brünnerstraße. Parkmöglichkeiten sind direkt vor dem Eingang vorhanden.',
  	\`directions_link_label\` text DEFAULT 'In Google Maps öffnen',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_contact_order_idx\` ON \`_start_page_v_blocks_contact\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_contact_parent_id_idx\` ON \`_start_page_v_blocks_contact\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_contact_path_idx\` ON \`_start_page_v_blocks_contact\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Anfrage',
  	\`headline\` text DEFAULT 'Schreiben Sie uns',
  	\`description\` text DEFAULT 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_contact_form_order_idx\` ON \`_start_page_v_blocks_contact_form\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_contact_form_parent_id_idx\` ON \`_start_page_v_blocks_contact_form\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_contact_form_path_idx\` ON \`_start_page_v_blocks_contact_form\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_footer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tagline\` text DEFAULT 'Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.',
  	\`copyright\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_footer_order_idx\` ON \`_start_page_v_blocks_footer\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_footer_parent_id_idx\` ON \`_start_page_v_blocks_footer\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_footer_path_idx\` ON \`_start_page_v_blocks_footer\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_version_meta_version_meta_image_idx\` ON \`_start_page_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_version_version__status_idx\` ON \`_start_page_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_created_at_idx\` ON \`_start_page_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_updated_at_idx\` ON \`_start_page_v\` (\`updated_at\`);`,
  )
  await db.run(sql`CREATE INDEX \`_start_page_v_latest_idx\` ON \`_start_page_v\` (\`latest\`);`)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_autosave_idx\` ON \`_start_page_v\` (\`autosave\`);`,
  )
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`image_id\` integer,
  	\`rating\` numeric DEFAULT 5 NOT NULL,
  	\`review_date\` text DEFAULT '2026-02-22T10:45:18.845Z' NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_testimonials\`("id", "text", "author", "image_id", "rating", "review_date", "sort_order", "is_active", "updated_at", "created_at") SELECT "id", "text", "author", "image_id", "rating", "review_date", "sort_order", "is_active", "updated_at", "created_at" FROM \`testimonials\`;`,
  )
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`ALTER TABLE \`__new_testimonials\` RENAME TO \`testimonials\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`testimonials_image_idx\` ON \`testimonials\` (\`image_id\`);`)
  await db.run(
    sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_navigation_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_navigation_links\`("_order", "_parent_id", "id", "label", "href") SELECT "_order", "_parent_id", "id", "label", "href" FROM \`start_page_blocks_navigation_links\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_navigation_links\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_navigation_links\` RENAME TO \`start_page_blocks_navigation_links\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_links_order_idx\` ON \`start_page_blocks_navigation_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_links_parent_id_idx\` ON \`start_page_blocks_navigation_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_navigation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`practice_name\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri',
  	\`phone\` text DEFAULT '+43 699 190 12 012',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_navigation\`("_order", "_parent_id", "_path", "id", "practice_name", "phone", "block_name") SELECT "_order", "_parent_id", "_path", "id", "practice_name", "phone", "block_name" FROM \`start_page_blocks_navigation\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_navigation\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_navigation\` RENAME TO \`start_page_blocks_navigation\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_order_idx\` ON \`start_page_blocks_navigation\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_parent_id_idx\` ON \`start_page_blocks_navigation\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_path_idx\` ON \`start_page_blocks_navigation\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text DEFAULT 'Dr. Tune Lazri',
  	\`subheadline\` text DEFAULT 'Tierarztpraxis',
  	\`description\` text DEFAULT 'Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren Liebling gerne bei Ihnen zu Hause.',
  	\`hero_image_id\` integer,
  	\`cta_primary_text\` text DEFAULT 'Termin vereinbaren',
  	\`cta_primary_href\` text DEFAULT '#kontakt',
  	\`cta_secondary_text\` text DEFAULT 'Leistungen',
  	\`cta_secondary_href\` text DEFAULT '#leistungen',
  	\`block_name\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_hero\`("_order", "_parent_id", "_path", "id", "headline", "subheadline", "description", "hero_image_id", "cta_primary_text", "cta_primary_href", "cta_secondary_text", "cta_secondary_href", "block_name") SELECT "_order", "_parent_id", "_path", "id", "headline", "subheadline", "description", "hero_image_id", "cta_primary_text", "cta_primary_href", "cta_secondary_text", "cta_secondary_href", "block_name" FROM \`start_page_blocks_hero\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_hero\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_hero\` RENAME TO \`start_page_blocks_hero\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hero_order_idx\` ON \`start_page_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hero_parent_id_idx\` ON \`start_page_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hero_path_idx\` ON \`start_page_blocks_hero\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hero_hero_image_idx\` ON \`start_page_blocks_hero\` (\`hero_image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_services_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_services_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_services_groups_items\`("_order", "_parent_id", "id", "text") SELECT "_order", "_parent_id", "id", "text" FROM \`start_page_blocks_services_groups_items\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_services_groups_items\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_services_groups_items\` RENAME TO \`start_page_blocks_services_groups_items\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_groups_items_order_idx\` ON \`start_page_blocks_services_groups_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_groups_items_parent_id_idx\` ON \`start_page_blocks_services_groups_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_services_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_services_groups\`("_order", "_parent_id", "id", "category") SELECT "_order", "_parent_id", "id", "category" FROM \`start_page_blocks_services_groups\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_services_groups\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_services_groups\` RENAME TO \`start_page_blocks_services_groups\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_groups_order_idx\` ON \`start_page_blocks_services_groups\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_groups_parent_id_idx\` ON \`start_page_blocks_services_groups\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Leistungen',
  	\`headline\` text DEFAULT 'Umfassende tierärztliche Betreuung für Ihren Liebling',
  	\`cta_text\` text DEFAULT 'Haben Sie Fragen zu unseren Leistungen?',
  	\`cta_button_label\` text DEFAULT 'Kontaktieren Sie uns',
  	\`cta_button_href\` text DEFAULT '#kontakt',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_services\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "cta_text", "cta_button_label", "cta_button_href", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "cta_text", "cta_button_label", "cta_button_href", "block_name" FROM \`start_page_blocks_services\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_services\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_services\` RENAME TO \`start_page_blocks_services\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_order_idx\` ON \`start_page_blocks_services\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_parent_id_idx\` ON \`start_page_blocks_services\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_path_idx\` ON \`start_page_blocks_services\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text DEFAULT 'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.',
  	\`author_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_quote\`("_order", "_parent_id", "_path", "id", "text", "author_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "text", "author_id", "block_name" FROM \`start_page_blocks_quote\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_quote\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_quote\` RENAME TO \`start_page_blocks_quote\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_quote_order_idx\` ON \`start_page_blocks_quote\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_quote_parent_id_idx\` ON \`start_page_blocks_quote\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_quote_path_idx\` ON \`start_page_blocks_quote\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_quote_author_idx\` ON \`start_page_blocks_quote\` (\`author_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Erfahrungen',
  	\`headline\` text DEFAULT 'Was die Lieblingsmenschen unserer Fellnasen über uns sagen',
  	\`description\` text DEFAULT 'Wir reden ungern über uns selbst, daher lassen wir lieber die Frauchen und Herrchen erzählen. Schau Dir ihre Erfahrungen an und überzeuge Dich selbst!',
  	\`google_review_url\` text DEFAULT 'https://search.google.com/local/writereview?placeid=ChIJ7aw4mO8FbUcRmAeyWnxejUs',
  	\`review_count\` numeric DEFAULT 0,
  	\`average_rating\` numeric DEFAULT 5,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_testimonials\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "google_review_url", "review_count", "average_rating", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "google_review_url", "review_count", "average_rating", "block_name" FROM \`start_page_blocks_testimonials\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_testimonials\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_testimonials\` RENAME TO \`start_page_blocks_testimonials\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_testimonials_order_idx\` ON \`start_page_blocks_testimonials\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_testimonials_parent_id_idx\` ON \`start_page_blocks_testimonials\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_testimonials_path_idx\` ON \`start_page_blocks_testimonials\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Galerie',
  	\`headline\` text DEFAULT 'Das sind unsere tierischen Patienten',
  	\`description\` text DEFAULT 'Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.',
  	\`empty_state_text\` text DEFAULT 'Noch keine Bilder in der Galerie.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_gallery\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "empty_state_text", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "empty_state_text", "block_name" FROM \`start_page_blocks_gallery\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_gallery\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_gallery\` RENAME TO \`start_page_blocks_gallery\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_gallery_order_idx\` ON \`start_page_blocks_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_gallery_parent_id_idx\` ON \`start_page_blocks_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_gallery_path_idx\` ON \`start_page_blocks_gallery\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Über uns',
  	\`headline\` text DEFAULT 'Unser Team',
  	\`description\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_team\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "block_name" FROM \`start_page_blocks_team\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_team\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_team\` RENAME TO \`start_page_blocks_team\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_team_order_idx\` ON \`start_page_blocks_team\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_team_parent_id_idx\` ON \`start_page_blocks_team\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_team_path_idx\` ON \`start_page_blocks_team\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_hours_opening_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text,
  	\`state\` text DEFAULT 'open',
  	\`times\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_hours_opening_hours\`("_order", "_parent_id", "id", "day", "state", "times") SELECT "_order", "_parent_id", "id", "day", "state", "times" FROM \`start_page_blocks_hours_opening_hours\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_hours_opening_hours\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_hours_opening_hours\` RENAME TO \`start_page_blocks_hours_opening_hours\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_opening_hours_order_idx\` ON \`start_page_blocks_hours_opening_hours\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_opening_hours_parent_id_idx\` ON \`start_page_blocks_hours_opening_hours\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Öffnungszeiten',
  	\`headline\` text DEFAULT 'Wann wir für Sie da sind',
  	\`description\` text DEFAULT 'Flexible Öffnungszeiten für Sie und Ihre Lieblinge. Auch Hausbesuche sind nach Vereinbarung möglich.',
  	\`emergency_title\` text DEFAULT 'Notfälle außerhalb der Öffnungszeiten',
  	\`emergency_description\` text DEFAULT 'Bei Notfällen rufen Sie uns bitte an. Wir sind für Sie erreichbar.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_hours\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "emergency_title", "emergency_description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "emergency_title", "emergency_description", "block_name" FROM \`start_page_blocks_hours\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_hours\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_hours\` RENAME TO \`start_page_blocks_hours\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_order_idx\` ON \`start_page_blocks_hours\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_parent_id_idx\` ON \`start_page_blocks_hours\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_path_idx\` ON \`start_page_blocks_hours\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Kontakt',
  	\`headline\` text DEFAULT 'Wir freuen uns auf Sie',
  	\`description\` text DEFAULT 'Ihr Liebling braucht Zuhause tierärztliche Betreuung? Ich bin nur einen Anruf entfernt.',
  	\`address_street\` text DEFAULT 'Brünnerstraße 219-221',
  	\`address_city\` text DEFAULT '1210 Wien',
  	\`address_additional\` text DEFAULT '1 TOP 60 (Einkaufszentrum B7)',
  	\`phone\` text DEFAULT '+43 699 190 12 012',
  	\`email\` text DEFAULT 'contact@tierarztpraxis-lazri.at',
  	\`consultation_times\` text DEFAULT 'Mo–Fr: 09:00 – 12:00
  Nachmittags nach Vereinbarung',
  	\`directions_description\` text DEFAULT 'Unsere Praxis befindet sich im Einkaufszentrum B7 an der Brünnerstraße. Parkmöglichkeiten sind direkt vor dem Eingang vorhanden.',
  	\`directions_link_label\` text DEFAULT 'In Google Maps öffnen',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_contact\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "address_street", "address_city", "address_additional", "phone", "email", "consultation_times", "directions_description", "directions_link_label", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "address_street", "address_city", "address_additional", "phone", "email", "consultation_times", "directions_description", "directions_link_label", "block_name" FROM \`start_page_blocks_contact\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_contact\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_contact\` RENAME TO \`start_page_blocks_contact\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_order_idx\` ON \`start_page_blocks_contact\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_parent_id_idx\` ON \`start_page_blocks_contact\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_path_idx\` ON \`start_page_blocks_contact\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Anfrage',
  	\`headline\` text DEFAULT 'Schreiben Sie uns',
  	\`description\` text DEFAULT 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_contact_form\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "block_name" FROM \`start_page_blocks_contact_form\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_contact_form\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_contact_form\` RENAME TO \`start_page_blocks_contact_form\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_form_order_idx\` ON \`start_page_blocks_contact_form\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_form_parent_id_idx\` ON \`start_page_blocks_contact_form\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_form_path_idx\` ON \`start_page_blocks_contact_form\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_footer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tagline\` text DEFAULT 'Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.',
  	\`copyright\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_footer\`("_order", "_parent_id", "_path", "id", "tagline", "copyright", "block_name") SELECT "_order", "_parent_id", "_path", "id", "tagline", "copyright", "block_name" FROM \`start_page_blocks_footer\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_footer\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_footer\` RENAME TO \`start_page_blocks_footer\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_footer_order_idx\` ON \`start_page_blocks_footer\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_footer_parent_id_idx\` ON \`start_page_blocks_footer\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_footer_path_idx\` ON \`start_page_blocks_footer\` (\`_path\`);`,
  )
  await db.run(sql`ALTER TABLE \`start_page\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`start_page__status_idx\` ON \`start_page\` (\`_status\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_navigation_links\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_navigation\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_services_groups_items\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_services_groups\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_services\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_team\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_hours_opening_hours\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_hours\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_footer\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v\`;`)
  await db.run(sql`DROP INDEX \`start_page__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`start_page\` DROP COLUMN \`_status\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`image_id\` integer,
  	\`rating\` numeric DEFAULT 5 NOT NULL,
  	\`review_date\` text DEFAULT '2026-02-22T10:30:26.337Z' NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_testimonials\`("id", "text", "author", "image_id", "rating", "review_date", "sort_order", "is_active", "updated_at", "created_at") SELECT "id", "text", "author", "image_id", "rating", "review_date", "sort_order", "is_active", "updated_at", "created_at" FROM \`testimonials\`;`,
  )
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`ALTER TABLE \`__new_testimonials\` RENAME TO \`testimonials\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`testimonials_image_idx\` ON \`testimonials\` (\`image_id\`);`)
  await db.run(
    sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_navigation_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_navigation_links\`("_order", "_parent_id", "id", "label", "href") SELECT "_order", "_parent_id", "id", "label", "href" FROM \`start_page_blocks_navigation_links\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_navigation_links\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_navigation_links\` RENAME TO \`start_page_blocks_navigation_links\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_links_order_idx\` ON \`start_page_blocks_navigation_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_links_parent_id_idx\` ON \`start_page_blocks_navigation_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_navigation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`practice_name\` text DEFAULT 'Tierarztpraxis Dr. Tune Lazri' NOT NULL,
  	\`phone\` text DEFAULT '+43 699 190 12 012' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_navigation\`("_order", "_parent_id", "_path", "id", "practice_name", "phone", "block_name") SELECT "_order", "_parent_id", "_path", "id", "practice_name", "phone", "block_name" FROM \`start_page_blocks_navigation\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_navigation\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_navigation\` RENAME TO \`start_page_blocks_navigation\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_order_idx\` ON \`start_page_blocks_navigation\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_parent_id_idx\` ON \`start_page_blocks_navigation\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_navigation_path_idx\` ON \`start_page_blocks_navigation\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_hero\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_hero\`("_order", "_parent_id", "_path", "id", "headline", "subheadline", "description", "hero_image_id", "cta_primary_text", "cta_primary_href", "cta_secondary_text", "cta_secondary_href", "block_name") SELECT "_order", "_parent_id", "_path", "id", "headline", "subheadline", "description", "hero_image_id", "cta_primary_text", "cta_primary_href", "cta_secondary_text", "cta_secondary_href", "block_name" FROM \`start_page_blocks_hero\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_hero\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_hero\` RENAME TO \`start_page_blocks_hero\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hero_order_idx\` ON \`start_page_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hero_parent_id_idx\` ON \`start_page_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hero_path_idx\` ON \`start_page_blocks_hero\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hero_hero_image_idx\` ON \`start_page_blocks_hero\` (\`hero_image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_services_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_services_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_services_groups_items\`("_order", "_parent_id", "id", "text") SELECT "_order", "_parent_id", "id", "text" FROM \`start_page_blocks_services_groups_items\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_services_groups_items\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_services_groups_items\` RENAME TO \`start_page_blocks_services_groups_items\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_groups_items_order_idx\` ON \`start_page_blocks_services_groups_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_groups_items_parent_id_idx\` ON \`start_page_blocks_services_groups_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_services_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_services_groups\`("_order", "_parent_id", "id", "category") SELECT "_order", "_parent_id", "id", "category" FROM \`start_page_blocks_services_groups\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_services_groups\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_services_groups\` RENAME TO \`start_page_blocks_services_groups\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_groups_order_idx\` ON \`start_page_blocks_services_groups\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_groups_parent_id_idx\` ON \`start_page_blocks_services_groups\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_services\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_services\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "cta_text", "cta_button_label", "cta_button_href", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "cta_text", "cta_button_label", "cta_button_href", "block_name" FROM \`start_page_blocks_services\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_services\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_services\` RENAME TO \`start_page_blocks_services\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_order_idx\` ON \`start_page_blocks_services\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_parent_id_idx\` ON \`start_page_blocks_services\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_services_path_idx\` ON \`start_page_blocks_services\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text DEFAULT 'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.' NOT NULL,
  	\`author_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_quote\`("_order", "_parent_id", "_path", "id", "text", "author_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "text", "author_id", "block_name" FROM \`start_page_blocks_quote\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_quote\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_quote\` RENAME TO \`start_page_blocks_quote\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_quote_order_idx\` ON \`start_page_blocks_quote\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_quote_parent_id_idx\` ON \`start_page_blocks_quote\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_quote_path_idx\` ON \`start_page_blocks_quote\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_quote_author_idx\` ON \`start_page_blocks_quote\` (\`author_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_testimonials\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_testimonials\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "google_review_url", "review_count", "average_rating", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "google_review_url", "review_count", "average_rating", "block_name" FROM \`start_page_blocks_testimonials\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_testimonials\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_testimonials\` RENAME TO \`start_page_blocks_testimonials\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_testimonials_order_idx\` ON \`start_page_blocks_testimonials\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_testimonials_parent_id_idx\` ON \`start_page_blocks_testimonials\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_testimonials_path_idx\` ON \`start_page_blocks_testimonials\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Galerie' NOT NULL,
  	\`headline\` text DEFAULT 'Das sind unsere tierischen Patienten' NOT NULL,
  	\`description\` text DEFAULT 'Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.' NOT NULL,
  	\`empty_state_text\` text DEFAULT 'Noch keine Bilder in der Galerie.' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_gallery\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "empty_state_text", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "empty_state_text", "block_name" FROM \`start_page_blocks_gallery\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_gallery\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_gallery\` RENAME TO \`start_page_blocks_gallery\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_gallery_order_idx\` ON \`start_page_blocks_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_gallery_parent_id_idx\` ON \`start_page_blocks_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_gallery_path_idx\` ON \`start_page_blocks_gallery\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Über uns' NOT NULL,
  	\`headline\` text DEFAULT 'Unser Team' NOT NULL,
  	\`description\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_team\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "block_name" FROM \`start_page_blocks_team\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_team\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_team\` RENAME TO \`start_page_blocks_team\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_team_order_idx\` ON \`start_page_blocks_team\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_team_parent_id_idx\` ON \`start_page_blocks_team\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_team_path_idx\` ON \`start_page_blocks_team\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_hours_opening_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text NOT NULL,
  	\`state\` text DEFAULT 'open' NOT NULL,
  	\`times\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_hours_opening_hours\`("_order", "_parent_id", "id", "day", "state", "times") SELECT "_order", "_parent_id", "id", "day", "state", "times" FROM \`start_page_blocks_hours_opening_hours\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_hours_opening_hours\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_hours_opening_hours\` RENAME TO \`start_page_blocks_hours_opening_hours\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_opening_hours_order_idx\` ON \`start_page_blocks_hours_opening_hours\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_opening_hours_parent_id_idx\` ON \`start_page_blocks_hours_opening_hours\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_hours\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_hours\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "emergency_title", "emergency_description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "emergency_title", "emergency_description", "block_name" FROM \`start_page_blocks_hours\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_hours\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_hours\` RENAME TO \`start_page_blocks_hours\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_order_idx\` ON \`start_page_blocks_hours\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_parent_id_idx\` ON \`start_page_blocks_hours\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_hours_path_idx\` ON \`start_page_blocks_hours\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_contact\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_contact\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "address_street", "address_city", "address_additional", "phone", "email", "consultation_times", "directions_description", "directions_link_label", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "address_street", "address_city", "address_additional", "phone", "email", "consultation_times", "directions_description", "directions_link_label", "block_name" FROM \`start_page_blocks_contact\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_contact\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_contact\` RENAME TO \`start_page_blocks_contact\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_order_idx\` ON \`start_page_blocks_contact\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_parent_id_idx\` ON \`start_page_blocks_contact\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_path_idx\` ON \`start_page_blocks_contact\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Anfrage' NOT NULL,
  	\`headline\` text DEFAULT 'Schreiben Sie uns' NOT NULL,
  	\`description\` text DEFAULT 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_contact_form\`("_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "headline", "description", "block_name" FROM \`start_page_blocks_contact_form\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_contact_form\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_contact_form\` RENAME TO \`start_page_blocks_contact_form\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_form_order_idx\` ON \`start_page_blocks_contact_form\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_form_parent_id_idx\` ON \`start_page_blocks_contact_form\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_contact_form_path_idx\` ON \`start_page_blocks_contact_form\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`__new_start_page_blocks_footer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tagline\` text DEFAULT 'Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.' NOT NULL,
  	\`copyright\` text DEFAULT 'Mit Leidenschaft für Ihre Lieblinge.' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_start_page_blocks_footer\`("_order", "_parent_id", "_path", "id", "tagline", "copyright", "block_name") SELECT "_order", "_parent_id", "_path", "id", "tagline", "copyright", "block_name" FROM \`start_page_blocks_footer\`;`,
  )
  await db.run(sql`DROP TABLE \`start_page_blocks_footer\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_start_page_blocks_footer\` RENAME TO \`start_page_blocks_footer\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_footer_order_idx\` ON \`start_page_blocks_footer\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_footer_parent_id_idx\` ON \`start_page_blocks_footer\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_footer_path_idx\` ON \`start_page_blocks_footer\` (\`_path\`);`,
  )
}
