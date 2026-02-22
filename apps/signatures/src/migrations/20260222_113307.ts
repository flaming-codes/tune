import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`privacy_acknowledgments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`owner_last_name\` text NOT NULL,
  	\`owner_first_name\` text NOT NULL,
  	\`owner_full_name\` text,
  	\`owner_title\` text,
  	\`owner_date_of_birth\` text,
  	\`owner_street\` text NOT NULL,
  	\`owner_postal_code\` text NOT NULL,
  	\`owner_city\` text NOT NULL,
  	\`owner_phone\` text NOT NULL,
  	\`owner_email\` text,
  	\`patient_name\` text NOT NULL,
  	\`patient_animal_type\` text NOT NULL,
  	\`patient_breed\` text,
  	\`patient_color\` text,
  	\`patient_gender\` text,
  	\`patient_date_of_birth\` text,
  	\`patient_weight\` text,
  	\`patient_special_notes\` text,
  	\`signed_at\` text NOT NULL,
  	\`signature_data_url\` text NOT NULL,
  	\`client_ip\` text,
  	\`user_agent\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`privacy_acknowledgments_updated_at_idx\` ON \`privacy_acknowledgments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`privacy_acknowledgments_created_at_idx\` ON \`privacy_acknowledgments\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`privacy_acknowledgments_id\` integer REFERENCES privacy_acknowledgments(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_privacy_acknowledgments_id_idx\` ON \`payload_locked_documents_rels\` (\`privacy_acknowledgments_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`privacy_acknowledgments\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id") SELECT "id", "order", "parent_id", "path", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
