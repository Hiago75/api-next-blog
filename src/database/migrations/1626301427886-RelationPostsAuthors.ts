import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationPostsAuthors1626301427886 implements MigrationInterface {
  name = 'RelationPostsAuthors1626301427886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "categoryId" varchar, "authorId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_categories" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_categories"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "categories"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`ALTER TABLE "temporary_categories" RENAME TO "categories"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_authors"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "authors"`,
    );
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
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
      `CREATE TABLE "posts" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "categoryId" varchar, "authorId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
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
      `CREATE TABLE "posts" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
  }
}
