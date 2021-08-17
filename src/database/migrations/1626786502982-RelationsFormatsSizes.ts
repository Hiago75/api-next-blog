import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationsFormatsSizes1626786502982 implements MigrationInterface {
  name = 'RelationsFormatsSizes1626786502982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(`DROP TABLE "thumbnail"`);
    await queryRunner.query(
      `CREATE TABLE "thumbnail" ("id" varchar PRIMARY KEY NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_formats" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "largeId" varchar, "mediumId" varchar, "smallId" varchar, "thumbnailId" varchar, CONSTRAINT "UQ_d8d3269d66232033016a529a74a" UNIQUE ("largeId"), CONSTRAINT "UQ_927685b02efb946412628456371" UNIQUE ("mediumId"), CONSTRAINT "UQ_38257b37aa78c36d231e8678a5f" UNIQUE ("smallId"), CONSTRAINT "UQ_d9a6f5cdc2201a4ba48afb648dc" UNIQUE ("thumbnailId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_formats"("id", "created_at", "updated_at") SELECT "id", "created_at", "updated_at" FROM "formats"`,
    );
    await queryRunner.query(`DROP TABLE "formats"`);
    await queryRunner.query(`ALTER TABLE "temporary_formats" RENAME TO "formats"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_large" ("id" varchar PRIMARY KEY NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_large"("id", "width", "height", "url", "created_at", "updated_at") SELECT "id", "width", "height", "url", "created_at", "updated_at" FROM "large"`,
    );
    await queryRunner.query(`DROP TABLE "large"`);
    await queryRunner.query(`ALTER TABLE "temporary_large" RENAME TO "large"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_medium" ("id" varchar PRIMARY KEY NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_medium"("id", "width", "height", "url", "created_at", "updated_at") SELECT "id", "width", "height", "url", "created_at", "updated_at" FROM "medium"`,
    );
    await queryRunner.query(`DROP TABLE "medium"`);
    await queryRunner.query(`ALTER TABLE "temporary_medium" RENAME TO "medium"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_small" ("id" varchar PRIMARY KEY NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_small"("id", "width", "height", "url", "created_at", "updated_at") SELECT "id", "width", "height", "url", "created_at", "updated_at" FROM "small"`,
    );
    await queryRunner.query(`DROP TABLE "small"`);
    await queryRunner.query(`ALTER TABLE "temporary_small" RENAME TO "small"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_formats" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "largeId" varchar, "mediumId" varchar, "smallId" varchar, "thumbnailId" varchar, CONSTRAINT "UQ_d8d3269d66232033016a529a74a" UNIQUE ("largeId"), CONSTRAINT "UQ_927685b02efb946412628456371" UNIQUE ("mediumId"), CONSTRAINT "UQ_38257b37aa78c36d231e8678a5f" UNIQUE ("smallId"), CONSTRAINT "UQ_d9a6f5cdc2201a4ba48afb648dc" UNIQUE ("thumbnailId"), CONSTRAINT "FK_723b3cbb8fe44443071a0c4b8a2" FOREIGN KEY ("largeId") REFERENCES "large" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1ac96be07205f4c09a754b64b02" FOREIGN KEY ("mediumId") REFERENCES "medium" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f3a0c2ef10f983c24fb1d761b3d" FOREIGN KEY ("smallId") REFERENCES "small" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbf3d0a469f3d843a245feab8e6" FOREIGN KEY ("thumbnailId") REFERENCES "thumbnail" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_formats"("id", "created_at", "updated_at", "largeId", "mediumId", "smallId", "thumbnailId") SELECT "id", "created_at", "updated_at", "largeId", "mediumId", "smallId", "thumbnailId" FROM "formats"`,
    );
    await queryRunner.query(`DROP TABLE "formats"`);
    await queryRunner.query(`ALTER TABLE "temporary_formats" RENAME TO "formats"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
    await queryRunner.query(`ALTER TABLE "formats" RENAME TO "temporary_formats"`);
    await queryRunner.query(
      `CREATE TABLE "formats" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "largeId" varchar, "mediumId" varchar, "smallId" varchar, "thumbnailId" varchar, CONSTRAINT "UQ_d8d3269d66232033016a529a74a" UNIQUE ("largeId"), CONSTRAINT "UQ_927685b02efb946412628456371" UNIQUE ("mediumId"), CONSTRAINT "UQ_38257b37aa78c36d231e8678a5f" UNIQUE ("smallId"), CONSTRAINT "UQ_d9a6f5cdc2201a4ba48afb648dc" UNIQUE ("thumbnailId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "formats"("id", "created_at", "updated_at", "largeId", "mediumId", "smallId", "thumbnailId") SELECT "id", "created_at", "updated_at", "largeId", "mediumId", "smallId", "thumbnailId" FROM "temporary_formats"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_formats"`);
    await queryRunner.query(`ALTER TABLE "small" RENAME TO "temporary_small"`);
    await queryRunner.query(
      `CREATE TABLE "small" ("id" uuid PRIMARY KEY NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "small"("id", "width", "height", "url", "created_at", "updated_at") SELECT "id", "width", "height", "url", "created_at", "updated_at" FROM "temporary_small"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_small"`);
    await queryRunner.query(`ALTER TABLE "medium" RENAME TO "temporary_medium"`);
    await queryRunner.query(
      `CREATE TABLE "medium" ("id" uuid PRIMARY KEY NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "medium"("id", "width", "height", "url", "created_at", "updated_at") SELECT "id", "width", "height", "url", "created_at", "updated_at" FROM "temporary_medium"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_medium"`);
    await queryRunner.query(`ALTER TABLE "large" RENAME TO "temporary_large"`);
    await queryRunner.query(
      `CREATE TABLE "large" ("id" uuid PRIMARY KEY NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "large"("id", "width", "height", "url", "created_at", "updated_at") SELECT "id", "width", "height", "url", "created_at", "updated_at" FROM "temporary_large"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_large"`);
    await queryRunner.query(`ALTER TABLE "formats" RENAME TO "temporary_formats"`);
    await queryRunner.query(
      `CREATE TABLE "formats" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "formats"("id", "created_at", "updated_at") SELECT "id", "created_at", "updated_at" FROM "temporary_formats"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_formats"`);
    await queryRunner.query(`DROP TABLE "thumbnail"`);
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "temporary_covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
  }
}
