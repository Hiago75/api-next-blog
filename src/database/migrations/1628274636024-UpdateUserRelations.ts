import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRelations1628274636024 implements MigrationInterface {
  name = 'UpdateUserRelations1628274636024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "user_id" varchar NOT NULL)`,
    );
    await queryRunner.query(`DROP TABLE "profile_photos"`);
    await queryRunner.query(`ALTER TABLE "temporary_profile_photos" RENAME TO "profile_photos"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "user_id" varchar NOT NULL, CONSTRAINT "FK_0a89ee3cad656bab0edbce226a4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`DROP TABLE "profile_photos"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`ALTER TABLE "temporary_profile_photos" RENAME TO "profile_photos"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" integer NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"), CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`ALTER TABLE "temporary_refresh_token" RENAME TO "refresh_token"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" integer NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "user_id") SELECT "id", "expiresOn", "user_id" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "profile_photos" RENAME TO "temporary_profile_photos"`);
    await queryRunner.query(
      `CREATE TABLE "profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "user_id" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "profile_photos"("id", "url", "created_at", "updated_at", "user_id") SELECT "id", "url", "created_at", "updated_at", "user_id" FROM "temporary_profile_photos"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_profile_photos"`);
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
    await queryRunner.query(`ALTER TABLE "profile_photos" RENAME TO "temporary_profile_photos"`);
    await queryRunner.query(
      `CREATE TABLE "profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "profile_photos"("id", "url", "created_at", "updated_at") SELECT "id", "url", "created_at", "updated_at" FROM "temporary_profile_photos"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_profile_photos"`);
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, "profile_photo" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "UQ_c4893be41ed9a9f9f68665e7cf5" UNIQUE ("profile_photo"))`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, "profile_photo" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "UQ_c4893be41ed9a9f9f68665e7cf5" UNIQUE ("profile_photo"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "temporary_refresh_token" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_a77bdfcefbe7a704015156d7c1f" FOREIGN KEY ("profile_photo") REFERENCES "profile_photos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token", "profile_photo") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token", "profile_photo" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" integer NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"), CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "user_id") SELECT "id", "expiresOn", "user_id" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "slug" varchar NOT NULL, "coverId" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "categoryId" varchar, "authorId" varchar, CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "temporary_authors" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "posts"("id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId") SELECT "id", "title", "content", "slug", "coverId", "created_at", "updated_at", "categoryId", "authorId" FROM "temporary_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_posts"`);
  }
}
