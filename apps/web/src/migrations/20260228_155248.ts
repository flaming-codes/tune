import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`team_members_blocks_metrics_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` numeric NOT NULL,
  	\`suffix\` text,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_metrics_items_order_idx\` ON \`team_members_blocks_metrics_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_metrics_items_parent_id_idx\` ON \`team_members_blocks_metrics_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`headline\` text,
  	\`description\` text,
  	\`variant\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_metrics_order_idx\` ON \`team_members_blocks_metrics\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_metrics_parent_id_idx\` ON \`team_members_blocks_metrics\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_metrics_path_idx\` ON \`team_members_blocks_metrics\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_marquee_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text DEFAULT 'Ihre Tiere in besten Händen' NOT NULL,
  	\`separator\` text DEFAULT 'dot',
  	\`style\` text DEFAULT 'filled',
  	\`speed\` text DEFAULT 'normal',
  	\`direction\` text DEFAULT 'left',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_marquee_text_order_idx\` ON \`team_members_blocks_marquee_text\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_marquee_text_parent_id_idx\` ON \`team_members_blocks_marquee_text\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_marquee_text_path_idx\` ON \`team_members_blocks_marquee_text\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_stacking_cards_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_stacking_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_stacking_cards_steps_order_idx\` ON \`team_members_blocks_stacking_cards_steps\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_stacking_cards_steps_parent_id_idx\` ON \`team_members_blocks_stacking_cards_steps\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_stacking_cards_steps_icon_idx\` ON \`team_members_blocks_stacking_cards_steps\` (\`icon_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_stacking_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Ihr Besuch' NOT NULL,
  	\`headline\` text DEFAULT 'Schritt für Schritt bestens betreut' NOT NULL,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_stacking_cards_order_idx\` ON \`team_members_blocks_stacking_cards\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_stacking_cards_parent_id_idx\` ON \`team_members_blocks_stacking_cards\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_stacking_cards_path_idx\` ON \`team_members_blocks_stacking_cards\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_split_reveal_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_split_reveal\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_split_reveal_items_order_idx\` ON \`team_members_blocks_split_reveal_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_split_reveal_items_parent_id_idx\` ON \`team_members_blocks_split_reveal_items\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_split_reveal_items_image_idx\` ON \`team_members_blocks_split_reveal_items\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_split_reveal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Unsere Werte' NOT NULL,
  	\`headline\` text DEFAULT 'Was uns antreibt' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_split_reveal_order_idx\` ON \`team_members_blocks_split_reveal\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_split_reveal_parent_id_idx\` ON \`team_members_blocks_split_reveal\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_split_reveal_path_idx\` ON \`team_members_blocks_split_reveal\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_parallax_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`headline\` text,
  	\`subtext\` text,
  	\`overlay_opacity\` numeric DEFAULT 40,
  	\`height\` text DEFAULT 'tall',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_parallax_image_order_idx\` ON \`team_members_blocks_parallax_image\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_parallax_image_parent_id_idx\` ON \`team_members_blocks_parallax_image\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_parallax_image_path_idx\` ON \`team_members_blocks_parallax_image\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_parallax_image_image_idx\` ON \`team_members_blocks_parallax_image\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_editorial_reveal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`author_name\` text,
  	\`author_role\` text,
  	\`author_photo_id\` integer,
  	\`alignment\` text DEFAULT 'center',
  	\`show_divider\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`author_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_editorial_reveal_order_idx\` ON \`team_members_blocks_editorial_reveal\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_editorial_reveal_parent_id_idx\` ON \`team_members_blocks_editorial_reveal\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_editorial_reveal_path_idx\` ON \`team_members_blocks_editorial_reveal\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_editorial_reveal_author_photo_idx\` ON \`team_members_blocks_editorial_reveal\` (\`author_photo_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_before_after_pairs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`before_image_id\` integer NOT NULL,
  	\`after_image_id\` integer NOT NULL,
  	\`before_label\` text DEFAULT 'Vorher',
  	\`after_label\` text DEFAULT 'Nachher',
  	\`caption\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_before_after\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_before_after_pairs_order_idx\` ON \`team_members_blocks_before_after_pairs\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_before_after_pairs_parent_id_idx\` ON \`team_members_blocks_before_after_pairs\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_before_after_pairs_before_image_idx\` ON \`team_members_blocks_before_after_pairs\` (\`before_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_before_after_pairs_after_image_idx\` ON \`team_members_blocks_before_after_pairs\` (\`after_image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_before_after\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`headline\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_before_after_order_idx\` ON \`team_members_blocks_before_after\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_before_after_parent_id_idx\` ON \`team_members_blocks_before_after\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_before_after_path_idx\` ON \`team_members_blocks_before_after\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_timeline_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_timeline\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_timeline_events_order_idx\` ON \`team_members_blocks_timeline_events\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_timeline_events_parent_id_idx\` ON \`team_members_blocks_timeline_events\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_timeline_events_image_idx\` ON \`team_members_blocks_timeline_events\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Unsere Geschichte' NOT NULL,
  	\`headline\` text DEFAULT 'Meilensteine unserer Praxis' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_timeline_order_idx\` ON \`team_members_blocks_timeline\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_timeline_parent_id_idx\` ON \`team_members_blocks_timeline\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_timeline_path_idx\` ON \`team_members_blocks_timeline\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_metrics_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` numeric,
  	\`suffix\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_metrics_items_order_idx\` ON \`start_page_blocks_metrics_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_metrics_items_parent_id_idx\` ON \`start_page_blocks_metrics_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`headline\` text,
  	\`description\` text,
  	\`variant\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_metrics_order_idx\` ON \`start_page_blocks_metrics\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_metrics_parent_id_idx\` ON \`start_page_blocks_metrics\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_metrics_path_idx\` ON \`start_page_blocks_metrics\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_marquee_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text DEFAULT 'Ihre Tiere in besten Händen',
  	\`separator\` text DEFAULT 'dot',
  	\`style\` text DEFAULT 'filled',
  	\`speed\` text DEFAULT 'normal',
  	\`direction\` text DEFAULT 'left',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_marquee_text_order_idx\` ON \`start_page_blocks_marquee_text\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_marquee_text_parent_id_idx\` ON \`start_page_blocks_marquee_text\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_marquee_text_path_idx\` ON \`start_page_blocks_marquee_text\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_stacking_cards_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_stacking_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_stacking_cards_steps_order_idx\` ON \`start_page_blocks_stacking_cards_steps\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_stacking_cards_steps_parent_id_idx\` ON \`start_page_blocks_stacking_cards_steps\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_stacking_cards_steps_icon_idx\` ON \`start_page_blocks_stacking_cards_steps\` (\`icon_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_stacking_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Ihr Besuch',
  	\`headline\` text DEFAULT 'Schritt für Schritt bestens betreut',
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_stacking_cards_order_idx\` ON \`start_page_blocks_stacking_cards\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_stacking_cards_parent_id_idx\` ON \`start_page_blocks_stacking_cards\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_stacking_cards_path_idx\` ON \`start_page_blocks_stacking_cards\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_split_reveal_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_split_reveal\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_split_reveal_items_order_idx\` ON \`start_page_blocks_split_reveal_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_split_reveal_items_parent_id_idx\` ON \`start_page_blocks_split_reveal_items\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_split_reveal_items_image_idx\` ON \`start_page_blocks_split_reveal_items\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_split_reveal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Unsere Werte',
  	\`headline\` text DEFAULT 'Was uns antreibt',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_split_reveal_order_idx\` ON \`start_page_blocks_split_reveal\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_split_reveal_parent_id_idx\` ON \`start_page_blocks_split_reveal\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_split_reveal_path_idx\` ON \`start_page_blocks_split_reveal\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_parallax_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`headline\` text,
  	\`subtext\` text,
  	\`overlay_opacity\` numeric DEFAULT 40,
  	\`height\` text DEFAULT 'tall',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_parallax_image_order_idx\` ON \`start_page_blocks_parallax_image\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_parallax_image_parent_id_idx\` ON \`start_page_blocks_parallax_image\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_parallax_image_path_idx\` ON \`start_page_blocks_parallax_image\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_parallax_image_image_idx\` ON \`start_page_blocks_parallax_image\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_editorial_reveal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`author_name\` text,
  	\`author_role\` text,
  	\`author_photo_id\` integer,
  	\`alignment\` text DEFAULT 'center',
  	\`show_divider\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`author_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_editorial_reveal_order_idx\` ON \`start_page_blocks_editorial_reveal\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_editorial_reveal_parent_id_idx\` ON \`start_page_blocks_editorial_reveal\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_editorial_reveal_path_idx\` ON \`start_page_blocks_editorial_reveal\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_editorial_reveal_author_photo_idx\` ON \`start_page_blocks_editorial_reveal\` (\`author_photo_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_before_after_pairs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`before_label\` text DEFAULT 'Vorher',
  	\`after_label\` text DEFAULT 'Nachher',
  	\`caption\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_before_after\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_before_after_pairs_order_idx\` ON \`start_page_blocks_before_after_pairs\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_before_after_pairs_parent_id_idx\` ON \`start_page_blocks_before_after_pairs\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_before_after_pairs_before_image_idx\` ON \`start_page_blocks_before_after_pairs\` (\`before_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_before_after_pairs_after_image_idx\` ON \`start_page_blocks_before_after_pairs\` (\`after_image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_before_after\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`headline\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_before_after_order_idx\` ON \`start_page_blocks_before_after\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_before_after_parent_id_idx\` ON \`start_page_blocks_before_after\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_before_after_path_idx\` ON \`start_page_blocks_before_after\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_timeline_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` text,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_timeline\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_timeline_events_order_idx\` ON \`start_page_blocks_timeline_events\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_timeline_events_parent_id_idx\` ON \`start_page_blocks_timeline_events\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_timeline_events_image_idx\` ON \`start_page_blocks_timeline_events\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Unsere Geschichte',
  	\`headline\` text DEFAULT 'Meilensteine unserer Praxis',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_timeline_order_idx\` ON \`start_page_blocks_timeline\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_timeline_parent_id_idx\` ON \`start_page_blocks_timeline\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_timeline_path_idx\` ON \`start_page_blocks_timeline\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_metrics_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` numeric,
  	\`suffix\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_metrics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_metrics_items_order_idx\` ON \`_start_page_v_blocks_metrics_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_metrics_items_parent_id_idx\` ON \`_start_page_v_blocks_metrics_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`headline\` text,
  	\`description\` text,
  	\`variant\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_metrics_order_idx\` ON \`_start_page_v_blocks_metrics\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_metrics_parent_id_idx\` ON \`_start_page_v_blocks_metrics\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_metrics_path_idx\` ON \`_start_page_v_blocks_metrics\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_marquee_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text DEFAULT 'Ihre Tiere in besten Händen',
  	\`separator\` text DEFAULT 'dot',
  	\`style\` text DEFAULT 'filled',
  	\`speed\` text DEFAULT 'normal',
  	\`direction\` text DEFAULT 'left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_marquee_text_order_idx\` ON \`_start_page_v_blocks_marquee_text\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_marquee_text_parent_id_idx\` ON \`_start_page_v_blocks_marquee_text\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_marquee_text_path_idx\` ON \`_start_page_v_blocks_marquee_text\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_stacking_cards_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_stacking_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_stacking_cards_steps_order_idx\` ON \`_start_page_v_blocks_stacking_cards_steps\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_stacking_cards_steps_parent_id_idx\` ON \`_start_page_v_blocks_stacking_cards_steps\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_stacking_cards_steps_icon_idx\` ON \`_start_page_v_blocks_stacking_cards_steps\` (\`icon_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_stacking_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Ihr Besuch',
  	\`headline\` text DEFAULT 'Schritt für Schritt bestens betreut',
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_stacking_cards_order_idx\` ON \`_start_page_v_blocks_stacking_cards\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_stacking_cards_parent_id_idx\` ON \`_start_page_v_blocks_stacking_cards\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_stacking_cards_path_idx\` ON \`_start_page_v_blocks_stacking_cards\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_split_reveal_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_split_reveal\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_split_reveal_items_order_idx\` ON \`_start_page_v_blocks_split_reveal_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_split_reveal_items_parent_id_idx\` ON \`_start_page_v_blocks_split_reveal_items\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_split_reveal_items_image_idx\` ON \`_start_page_v_blocks_split_reveal_items\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_split_reveal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Unsere Werte',
  	\`headline\` text DEFAULT 'Was uns antreibt',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_split_reveal_order_idx\` ON \`_start_page_v_blocks_split_reveal\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_split_reveal_parent_id_idx\` ON \`_start_page_v_blocks_split_reveal\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_split_reveal_path_idx\` ON \`_start_page_v_blocks_split_reveal\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_parallax_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`headline\` text,
  	\`subtext\` text,
  	\`overlay_opacity\` numeric DEFAULT 40,
  	\`height\` text DEFAULT 'tall',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_parallax_image_order_idx\` ON \`_start_page_v_blocks_parallax_image\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_parallax_image_parent_id_idx\` ON \`_start_page_v_blocks_parallax_image\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_parallax_image_path_idx\` ON \`_start_page_v_blocks_parallax_image\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_parallax_image_image_idx\` ON \`_start_page_v_blocks_parallax_image\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_editorial_reveal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`author_name\` text,
  	\`author_role\` text,
  	\`author_photo_id\` integer,
  	\`alignment\` text DEFAULT 'center',
  	\`show_divider\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`author_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_editorial_reveal_order_idx\` ON \`_start_page_v_blocks_editorial_reveal\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_editorial_reveal_parent_id_idx\` ON \`_start_page_v_blocks_editorial_reveal\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_editorial_reveal_path_idx\` ON \`_start_page_v_blocks_editorial_reveal\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_editorial_reveal_author_photo_idx\` ON \`_start_page_v_blocks_editorial_reveal\` (\`author_photo_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_before_after_pairs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`before_label\` text DEFAULT 'Vorher',
  	\`after_label\` text DEFAULT 'Nachher',
  	\`caption\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_before_after\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_before_after_pairs_order_idx\` ON \`_start_page_v_blocks_before_after_pairs\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_before_after_pairs_parent_id_idx\` ON \`_start_page_v_blocks_before_after_pairs\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_before_after_pairs_before_image_idx\` ON \`_start_page_v_blocks_before_after_pairs\` (\`before_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_before_after_pairs_after_image_idx\` ON \`_start_page_v_blocks_before_after_pairs\` (\`after_image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_before_after\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`headline\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_before_after_order_idx\` ON \`_start_page_v_blocks_before_after\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_before_after_parent_id_idx\` ON \`_start_page_v_blocks_before_after\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_before_after_path_idx\` ON \`_start_page_v_blocks_before_after\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_timeline_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`year\` text,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_timeline\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_timeline_events_order_idx\` ON \`_start_page_v_blocks_timeline_events\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_timeline_events_parent_id_idx\` ON \`_start_page_v_blocks_timeline_events\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_timeline_events_image_idx\` ON \`_start_page_v_blocks_timeline_events\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Unsere Geschichte',
  	\`headline\` text DEFAULT 'Meilensteine unserer Praxis',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_timeline_order_idx\` ON \`_start_page_v_blocks_timeline\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_timeline_parent_id_idx\` ON \`_start_page_v_blocks_timeline\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_timeline_path_idx\` ON \`_start_page_v_blocks_timeline\` (\`_path\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`team_members_blocks_metrics_items\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_marquee_text\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_stacking_cards_steps\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_stacking_cards\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_split_reveal_items\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_split_reveal\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_parallax_image\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_editorial_reveal\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_before_after_pairs\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_before_after\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_timeline_events\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_timeline\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_metrics_items\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_marquee_text\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_stacking_cards_steps\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_stacking_cards\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_split_reveal_items\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_split_reveal\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_parallax_image\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_editorial_reveal\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_before_after_pairs\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_before_after\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_timeline_events\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_timeline\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_metrics_items\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_metrics\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_marquee_text\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_stacking_cards_steps\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_stacking_cards\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_split_reveal_items\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_split_reveal\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_parallax_image\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_editorial_reveal\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_before_after_pairs\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_before_after\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_timeline_events\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_timeline\`;`)
}
