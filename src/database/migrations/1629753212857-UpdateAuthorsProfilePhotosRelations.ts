import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAuthorsProfilePhotosRelations1629753212857 implements MigrationInterface {
  name = 'UpdateAuthorsProfilePhotosRelations1629753212857';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "user_id" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_profile_photos"("id", "url", "created_at", "updated_at", "user_id") SELECT "id", "url", "created_at", "updated_at", "user_id" FROM "profile_photos"`,
    );
    await queryRunner.query(`DROP TABLE "profile_photos"`);
    await queryRunner.query(`ALTER TABLE "temporary_profile_photos" RENAME TO "profile_photos"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_profile_photos"("id", "url", "created_at", "updated_at") SELECT "id", "url", "created_at", "updated_at" FROM "profile_photos"`,
    );
    await queryRunner.query(`DROP TABLE "profile_photos"`);
    await queryRunner.query(`ALTER TABLE "temporary_profile_photos" RENAME TO "profile_photos"`);
    await queryRunner.query(`DROP TABLE "authors" CASCADE`);
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "profile_photo" varchar, CONSTRAINT "UQ_c4893be41ed9a9f9f68665e7cf5" UNIQUE ("profile_photo"), CONSTRAINT "FK_a77bdfcefbe7a704015156d7c1f" FOREIGN KEY ("profile_photo") REFERENCES "profile_photos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "profile_photo" varchar, CONSTRAINT "UQ_c4893be41ed9a9f9f68665e7cf5" UNIQUE ("profile_photo"))`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "profile_photo") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "profile_photo" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "profile_photos" RENAME TO "temporary_profile_photos"`);
    await queryRunner.query(
      `CREATE TABLE "profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "user_id" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "profile_photos"("id", "url", "created_at", "updated_at") SELECT "id", "url", "created_at", "updated_at" FROM "temporary_profile_photos"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_profile_photos"`);
    await queryRunner.query(`ALTER TABLE "profile_photos" RENAME TO "temporary_profile_photos"`);
    await queryRunner.query(
      `CREATE TABLE "profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "user_id" varchar NOT NULL, CONSTRAINT "FK_0a89ee3cad656bab0edbce226a4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "profile_photos"("id", "url", "created_at", "updated_at", "user_id") SELECT "id", "url", "created_at", "updated_at", "user_id" FROM "temporary_profile_photos"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_profile_photos"`);
  }
}
