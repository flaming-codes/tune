import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`image_id\` integer,
  	\`rating\` numeric DEFAULT 5 NOT NULL,
  	\`review_date\` text DEFAULT '2026-02-22T09:05:58.868Z' NOT NULL,
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
  await db.run(
    sql`ALTER TABLE \`start_page_blocks_hours_opening_hours\` ADD \`state\` text DEFAULT 'open' NOT NULL;`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`image_id\` integer,
  	\`rating\` numeric DEFAULT 5 NOT NULL,
  	\`review_date\` text DEFAULT '2026-02-22T06:56:52.206Z' NOT NULL,
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
  await db.run(sql`ALTER TABLE \`start_page_blocks_hours_opening_hours\` DROP COLUMN \`state\`;`)
}
