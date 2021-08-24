import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRefreshTokenRelations1627954845666 implements MigrationInterface {
  name = 'UpdateRefreshTokenRelations1627954845666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" TIMESTAMP NOT NULL, "userId" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("userId"), CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("userId") REFERENCES "authors" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`DROP TABLE "refresh_token" CASCADE`);
    await queryRunner.query(`ALTER TABLE "temporary_refresh_token" RENAME TO "refresh_token"`);
    await queryRunner.query(`DROP TABLE "authors" CASCADE`);
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "refresh_token" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"))`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" TIMESTAMP NOT NULL, "userId" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("userId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "userId") SELECT "id", "expiresOn", "userId" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" TIMESTAMP NOT NULL, "userId" varchar NOT NULL, CONSTRAINT "UQ_dc078a0cdb9e929c9dad2fc6707" UNIQUE ("userId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "userId") SELECT "id", "expiresOn", "userId" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "refresh_token" varchar, CONSTRAINT "UQ_63d5ae3d751ecb4374007aa74db" UNIQUE ("refresh_token"), CONSTRAINT "FK_e1fb3824c71d4cd212ebc5bbed1" FOREIGN KEY ("refresh_token") REFERENCES "temporary_refresh_token" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at", "refresh_token" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" TIMESTAMP NOT NULL, "userId" varchar NOT NULL, CONSTRAINT "UQ_dc078a0cdb9e929c9dad2fc6707" UNIQUE ("userId"), CONSTRAINT "FK_e516f42344dfb8d3938a5a0109a" FOREIGN KEY ("userId") REFERENCES "authors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "userId") SELECT "id", "expiresOn", "userId" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
  }
}
