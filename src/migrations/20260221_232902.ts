import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_team_members\` (
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
  await db.run(sql`INSERT INTO \`__new_team_members\`("id", "name", "role", "description", "sort_order", "is_active", "updated_at", "created_at") SELECT "id", "name", "role", "description", "sort_order", "is_active", "updated_at", "created_at" FROM \`team_members\`;`)
  await db.run(sql`DROP TABLE \`team_members\`;`)
  await db.run(sql`ALTER TABLE \`__new_team_members\` RENAME TO \`team_members\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`team_members_updated_at_idx\` ON \`team_members\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`team_members_created_at_idx\` ON \`team_members\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`team_members_rels\`;`)
  await db.run(sql`ALTER TABLE \`team_members\` ADD \`photo_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`team_members_photo_idx\` ON \`team_members\` (\`photo_id\`);`)
}
