import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`start_page_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_accordion_items_order_idx\` ON \`start_page_blocks_accordion_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_accordion_items_parent_id_idx\` ON \`start_page_blocks_accordion_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`start_page_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'FAQ',
  	\`headline\` text DEFAULT 'Häufig gestellte Fragen',
  	\`description\` text,
  	\`allow_multiple_open\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`start_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_accordion_order_idx\` ON \`start_page_blocks_accordion\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_accordion_parent_id_idx\` ON \`start_page_blocks_accordion\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`start_page_blocks_accordion_path_idx\` ON \`start_page_blocks_accordion\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_accordion_items_order_idx\` ON \`_start_page_v_blocks_accordion_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_accordion_items_parent_id_idx\` ON \`_start_page_v_blocks_accordion_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_start_page_v_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'FAQ',
  	\`headline\` text DEFAULT 'Häufig gestellte Fragen',
  	\`description\` text,
  	\`allow_multiple_open\` integer DEFAULT false,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_start_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_accordion_order_idx\` ON \`_start_page_v_blocks_accordion\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_accordion_parent_id_idx\` ON \`_start_page_v_blocks_accordion\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_start_page_v_blocks_accordion_path_idx\` ON \`_start_page_v_blocks_accordion\` (\`_path\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`start_page_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`start_page_blocks_accordion\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`_start_page_v_blocks_accordion\`;`)
}
