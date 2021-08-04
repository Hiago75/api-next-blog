import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRefreshTokenRelations1627954845666 implements MigrationInterface {
  name = 'UpdateRefreshTokenRelations1627954845666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime NOT NULL, "userIdId" varchar NOT NULL, CONSTRAINT "UQ_dc078a0cdb9e929c9dad2fc6707" UNIQUE ("userIdId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_refresh_token"("id", "expiresOn", "userIdId") SELECT "id", "expiresOn", "userIdId" FROM "refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`ALTER TABLE "temporary_refresh_token" RENAME TO "refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "refresh_token" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token" FROM "authors"`,
    );
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_refresh_token"("id", "expiresOn", "user_id") SELECT "id", "expiresOn", "userIdId" FROM "refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`ALTER TABLE "temporary_refresh_token" RENAME TO "refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"), CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_refresh_token"("id", "expiresOn", "user_id") SELECT "id", "expiresOn", "user_id" FROM "refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`ALTER TABLE "temporary_refresh_token" RENAME TO "refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "refresh_token" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "refresh_token" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token" FROM "authors"`,
    );
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "refresh_token" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"))`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "user_id") SELECT "id", "expiresOn", "user_id" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime NOT NULL, "userIdId" varchar NOT NULL, CONSTRAINT "UQ_dc078a0cdb9e929c9dad2fc6707" UNIQUE ("userIdId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "userIdId") SELECT "id", "expiresOn", "user_id" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "refresh_token" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "temporary_refresh_token" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime NOT NULL, "userIdId" varchar NOT NULL, CONSTRAINT "UQ_dc078a0cdb9e929c9dad2fc6707" UNIQUE ("userIdId"), CONSTRAINT "FK_e516f42344dfb8d3938a5a0109a" FOREIGN KEY ("userIdId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "userIdId") SELECT "id", "expiresOn", "userIdId" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
  }
}
