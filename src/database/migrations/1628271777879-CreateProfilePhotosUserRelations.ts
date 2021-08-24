import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilePhotosUserRelations1628271777879 implements MigrationInterface {
  name = 'CreateProfilePhotosUserRelations1628271777879';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "authors" CASCADE`);
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, "profile_photo" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "UQ_c4893be41ed9a9f9f68665e7cf5" UNIQUE ("profile_photo"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "refresh_token" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_a77bdfcefbe7a704015156d7c1f" FOREIGN KEY ("profile_photo") REFERENCES "profile_photos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, "profile_photo" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "UQ_c4893be41ed9a9f9f68665e7cf5" UNIQUE ("profile_photo"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "refresh_token" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token", "profile_photo") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token", "profile_photo" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, "profile_photo" varchar(255) DEFAULT (NULL), CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "refresh_token" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token", "profile_photo") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token", "profile_photo" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "profile_photos" RENAME TO "temporary_profile_photos"`);
    await queryRunner.query(
      `CREATE TABLE "profile_photos" ("id" uuid PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "profile_photos"("id", "url", "created_at", "updated_at") SELECT "id", "url", "created_at", "updated_at" FROM "temporary_profile_photos"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_profile_photos"`);
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, "profile_photo" varchar(255) DEFAULT (NULL), CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "refresh_token" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token", "profile_photo") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token", "profile_photo" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
  }
}
