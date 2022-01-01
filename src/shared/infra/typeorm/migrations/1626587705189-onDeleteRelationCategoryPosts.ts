import { MigrationInterface, QueryRunner } from 'typeorm';

export class onDeleteRelationCategoryPosts1626587705189 implements MigrationInterface {
  name = 'onDeleteRelationCategoryPosts1626587705189';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "posts"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
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
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
  }
}
