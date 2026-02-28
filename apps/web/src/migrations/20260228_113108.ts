import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`team_members_blocks_member_sentence_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members_blocks_member_sentence_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_member_sentence_list_items_order_idx\` ON \`team_members_blocks_member_sentence_list_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_member_sentence_list_items_parent_id_idx\` ON \`team_members_blocks_member_sentence_list_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`team_members_blocks_member_sentence_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sentence_start\` text DEFAULT 'Ich helfe Ihnen mit …' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_member_sentence_list_order_idx\` ON \`team_members_blocks_member_sentence_list\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_member_sentence_list_parent_id_idx\` ON \`team_members_blocks_member_sentence_list\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`team_members_blocks_member_sentence_list_path_idx\` ON \`team_members_blocks_member_sentence_list\` (\`_path\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`team_members_blocks_member_sentence_list_items\`;`)
  await db.run(sql`DROP TABLE \`team_members_blocks_member_sentence_list\`;`)
}
