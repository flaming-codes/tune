import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`screensaver_images\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`active\` integer DEFAULT true,
  	\`display_order\` numeric,
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
  	\`sizes_fullscreen_url\` text,
  	\`sizes_fullscreen_width\` numeric,
  	\`sizes_fullscreen_height\` numeric,
  	\`sizes_fullscreen_mime_type\` text,
  	\`sizes_fullscreen_filesize\` numeric,
  	\`sizes_fullscreen_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`screensaver_images_updated_at_idx\` ON \`screensaver_images\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`screensaver_images_created_at_idx\` ON \`screensaver_images\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`screensaver_images_filename_idx\` ON \`screensaver_images\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`screensaver_images_sizes_thumbnail_sizes_thumbnail_filen_idx\` ON \`screensaver_images\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`screensaver_images_sizes_fullscreen_sizes_fullscreen_fil_idx\` ON \`screensaver_images\` (\`sizes_fullscreen_filename\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`screensaver_images_id\` integer REFERENCES screensaver_images(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_screensaver_images_id_idx\` ON \`payload_locked_documents_rels\` (\`screensaver_images_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`screensaver_images\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`privacy_acknowledgments_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`privacy_acknowledgments_id\`) REFERENCES \`privacy_acknowledgments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "privacy_acknowledgments_id") SELECT "id", "order", "parent_id", "path", "users_id", "privacy_acknowledgments_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_privacy_acknowledgments_id_idx\` ON \`payload_locked_documents_rels\` (\`privacy_acknowledgments_id\`);`)
}
