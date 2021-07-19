import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationPostsCovers1626729518427 implements MigrationInterface {
  name = 'RelationPostsCovers1626729518427';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_formats" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "coverId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_formats"("id", "name", "width", "height", "url", "created_at", "updated_at") SELECT "id", "name", "width", "height", "url", "created_at", "updated_at" FROM "formats"`,
    );
    await queryRunner.query(`DROP TABLE "formats"`);
    await queryRunner.query(`ALTER TABLE "temporary_formats" RENAME TO "formats"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_formats" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "coverId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_formats"("id", "name", "width", "height", "url", "created_at", "updated_at", "coverId") SELECT "id", "name", "width", "height", "url", "created_at", "updated_at", "coverId" FROM "formats"`,
    );
    await queryRunner.query(`DROP TABLE "formats"`);
    await queryRunner.query(`ALTER TABLE "temporary_formats" RENAME TO "formats"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_formats" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "coverId" varchar, CONSTRAINT "FK_7b06fef60d59f4f98633558a8da" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_formats"("id", "name", "width", "height", "url", "created_at", "updated_at", "coverId") SELECT "id", "name", "width", "height", "url", "created_at", "updated_at", "coverId" FROM "formats"`,
    );
    await queryRunner.query(`DROP TABLE "formats"`);
    await queryRunner.query(`ALTER TABLE "temporary_formats" RENAME TO "formats"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "formats" RENAME TO "temporary_formats"`);
    await queryRunner.query(
      `CREATE TABLE "formats" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "coverId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "formats"("id", "name", "width", "height", "url", "created_at", "updated_at", "coverId") SELECT "id", "name", "width", "height", "url", "created_at", "updated_at", "coverId" FROM "temporary_formats"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_formats"`);
    await queryRunner.query(`ALTER TABLE "formats" RENAME TO "temporary_formats"`);
    await queryRunner.query(
      `CREATE TABLE "formats" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "coverId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "formats"("id", "name", "width", "height", "url", "created_at", "updated_at", "coverId") SELECT "id", "name", "width", "height", "url", "created_at", "updated_at", "coverId" FROM "temporary_formats"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_formats"`);
    await queryRunner.query(`ALTER TABLE "formats" RENAME TO "temporary_formats"`);
    await queryRunner.query(
      `CREATE TABLE "formats" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "formats"("id", "name", "width", "height", "url", "created_at", "updated_at") SELECT "id", "name", "width", "height", "url", "created_at", "updated_at" FROM "temporary_formats"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_formats"`);
  }
}
