import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationPostsCovers1626387676871 implements MigrationInterface {
  name = 'RelationPostsCovers1626387676871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_covers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "public_id" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "provider" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_covers"("id", "name", "public_id", "width", "height", "url", "provider", "created_at", "updated_at") SELECT "id", "name", "public_id", "width", "height", "url", "provider", "created_at", "updated_at" FROM "covers"`,
    );
    await queryRunner.query(`DROP TABLE "covers"`);
    await queryRunner.query(`ALTER TABLE "temporary_covers" RENAME TO "covers"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
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
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
    await queryRunner.query(`ALTER TABLE "covers" RENAME TO "temporary_covers"`);
    await queryRunner.query(
      `CREATE TABLE "covers" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "public_id" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "provider" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "covers"("id", "name", "public_id", "width", "height", "url", "provider", "created_at", "updated_at") SELECT "id", "name", "public_id", "width", "height", "url", "provider", "created_at", "updated_at" FROM "temporary_covers"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_covers"`);
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "cover" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "cover", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
  }
}
