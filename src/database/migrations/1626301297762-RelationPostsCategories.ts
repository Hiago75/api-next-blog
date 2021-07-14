import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationPostsCategories1626301297762 implements MigrationInterface {
  name = 'RelationPostsCategories1626301297762';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "categoryId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_authors"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "authors"`,
    );
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_categories" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_categories"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "categories"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`ALTER TABLE "temporary_categories" RENAME TO "categories"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
    await queryRunner.query(`ALTER TABLE "categories" RENAME TO "temporary_categories"`);
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "categories"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "temporary_categories"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_categories"`);
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "categoryId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
  }
}
