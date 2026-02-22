import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`imprint_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`page_title\` text DEFAULT 'Impressum',
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`imprint_page_meta_meta_image_idx\` ON \`imprint_page\` (\`meta_image_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`imprint_page__status_idx\` ON \`imprint_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_imprint_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_page_title\` text DEFAULT 'Impressum',
  	\`version_content\` text,
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
    sql`CREATE INDEX \`_imprint_page_v_version_meta_version_meta_image_idx\` ON \`_imprint_page_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_imprint_page_v_version_version__status_idx\` ON \`_imprint_page_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_imprint_page_v_created_at_idx\` ON \`_imprint_page_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_imprint_page_v_updated_at_idx\` ON \`_imprint_page_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_imprint_page_v_latest_idx\` ON \`_imprint_page_v\` (\`latest\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_imprint_page_v_autosave_idx\` ON \`_imprint_page_v\` (\`autosave\`);`,
  )
  await db.run(sql`CREATE TABLE \`privacy_policy_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`page_title\` text DEFAULT 'Datenschutzerklärung',
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`privacy_policy_page_meta_meta_image_idx\` ON \`privacy_policy_page\` (\`meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`privacy_policy_page__status_idx\` ON \`privacy_policy_page\` (\`_status\`);`,
  )
  await db.run(sql`CREATE TABLE \`_privacy_policy_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_page_title\` text DEFAULT 'Datenschutzerklärung',
  	\`version_content\` text,
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
    sql`CREATE INDEX \`_privacy_policy_page_v_version_meta_version_meta_image_idx\` ON \`_privacy_policy_page_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_privacy_policy_page_v_version_version__status_idx\` ON \`_privacy_policy_page_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_privacy_policy_page_v_created_at_idx\` ON \`_privacy_policy_page_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_privacy_policy_page_v_updated_at_idx\` ON \`_privacy_policy_page_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_privacy_policy_page_v_latest_idx\` ON \`_privacy_policy_page_v\` (\`latest\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_privacy_policy_page_v_autosave_idx\` ON \`_privacy_policy_page_v\` (\`autosave\`);`,
  )
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`image_id\` integer,
  	\`rating\` numeric DEFAULT 5 NOT NULL,
  	\`review_date\` text DEFAULT '2026-02-22T11:38:28.330Z' NOT NULL,
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
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`imprint_page\`;`)
  await db.run(sql`DROP TABLE \`_imprint_page_v\`;`)
  await db.run(sql`DROP TABLE \`privacy_policy_page\`;`)
  await db.run(sql`DROP TABLE \`_privacy_policy_page_v\`;`)
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
}
