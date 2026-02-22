import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`blur_data_u_r_l\` text,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_tablet_url\` text,
  	\`sizes_tablet_width\` numeric,
  	\`sizes_tablet_height\` numeric,
  	\`sizes_tablet_mime_type\` text,
  	\`sizes_tablet_filesize\` numeric,
  	\`sizes_tablet_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\` ON \`media\` (\`sizes_tablet_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE TABLE \`team_members\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_updated_at_idx\` ON \`team_members\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`team_members_created_at_idx\` ON \`team_members\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`team_members_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_rels_order_idx\` ON \`team_members_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_rels_parent_idx\` ON \`team_members_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_rels_path_idx\` ON \`team_members_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`team_members_rels_media_id_idx\` ON \`team_members_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`gallery_images\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`is_featured\` integer DEFAULT false,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`gallery_images_image_idx\` ON \`gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_images_updated_at_idx\` ON \`gallery_images\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gallery_images_created_at_idx\` ON \`gallery_images\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
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
  await db.run(sql`CREATE INDEX \`testimonials_image_idx\` ON \`testimonials\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`team_members_id\` integer,
  	\`gallery_images_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`team_members_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gallery_images_id\`) REFERENCES \`gallery_images\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_team_members_id_idx\` ON \`payload_locked_documents_rels\` (\`team_members_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_gallery_images_id_idx\` ON \`payload_locked_documents_rels\` (\`gallery_images_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_navigation_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`start_page_blocks_navigation_links_order_idx\` ON \`start_page_blocks_navigation_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_navigation_links_parent_id_idx\` ON \`start_page_blocks_navigation_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_navigation\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_navigation_order_idx\` ON \`start_page_blocks_navigation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_navigation_parent_id_idx\` ON \`start_page_blocks_navigation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_navigation_path_idx\` ON \`start_page_blocks_navigation\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_hero\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_hero_order_idx\` ON \`start_page_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_hero_parent_id_idx\` ON \`start_page_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_hero_path_idx\` ON \`start_page_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_hero_hero_image_idx\` ON \`start_page_blocks_hero\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_services_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_services_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`start_page_blocks_services_groups_items_order_idx\` ON \`start_page_blocks_services_groups_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_services_groups_items_parent_id_idx\` ON \`start_page_blocks_services_groups_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_services_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`start_page_blocks_services_groups_order_idx\` ON \`start_page_blocks_services_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_services_groups_parent_id_idx\` ON \`start_page_blocks_services_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_services\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_services_order_idx\` ON \`start_page_blocks_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_services_parent_id_idx\` ON \`start_page_blocks_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_services_path_idx\` ON \`start_page_blocks_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_quote\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_quote_order_idx\` ON \`start_page_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_quote_parent_id_idx\` ON \`start_page_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_quote_path_idx\` ON \`start_page_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_quote_author_idx\` ON \`start_page_blocks_quote\` (\`author_id\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_testimonials\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_testimonials_order_idx\` ON \`start_page_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_testimonials_parent_id_idx\` ON \`start_page_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_testimonials_path_idx\` ON \`start_page_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_gallery\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_gallery_order_idx\` ON \`start_page_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_gallery_parent_id_idx\` ON \`start_page_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_gallery_path_idx\` ON \`start_page_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_team\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_team_order_idx\` ON \`start_page_blocks_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_team_parent_id_idx\` ON \`start_page_blocks_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_team_path_idx\` ON \`start_page_blocks_team\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_hours_opening_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text NOT NULL,
  	\`state\` text DEFAULT 'open' NOT NULL,
  	\`times\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`start_page_blocks_hours_opening_hours_order_idx\` ON \`start_page_blocks_hours_opening_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_hours_opening_hours_parent_id_idx\` ON \`start_page_blocks_hours_opening_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_hours\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_hours_order_idx\` ON \`start_page_blocks_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_hours_parent_id_idx\` ON \`start_page_blocks_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_hours_path_idx\` ON \`start_page_blocks_hours\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_contact\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_contact_order_idx\` ON \`start_page_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_contact_parent_id_idx\` ON \`start_page_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_contact_path_idx\` ON \`start_page_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_contact_form\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_contact_form_order_idx\` ON \`start_page_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_contact_form_parent_id_idx\` ON \`start_page_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_contact_form_path_idx\` ON \`start_page_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page_blocks_footer\` (
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
  await db.run(sql`CREATE INDEX \`start_page_blocks_footer_order_idx\` ON \`start_page_blocks_footer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_footer_parent_id_idx\` ON \`start_page_blocks_footer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`start_page_blocks_footer_path_idx\` ON \`start_page_blocks_footer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`start_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`start_page_meta_meta_image_idx\` ON \`start_page\` (\`meta_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`team_members\`;`)
  await db.run(sql`DROP TABLE \`team_members_rels\`;`)
  await db.run(sql`DROP TABLE \`gallery_images\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_navigation_links\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_navigation\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_services_groups_items\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_services_groups\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_services\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_team\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_hours_opening_hours\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_hours\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_footer\`;`)
  await db.run(sql`DROP TABLE \`start_page\`;`)
}
