import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeExpiresOnFormat1628030730463 implements MigrationInterface {
  name = 'ChangeExpiresOnFormat1628030730463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "refresh_token" CASCADE`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" integer NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"), CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" TIMESTAMP NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"), CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "user_id") SELECT "id", "expiresOn", "user_id" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "refresh_token" RENAME TO "temporary_refresh_token"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" varchar PRIMARY KEY NOT NULL, "expiresOn" TIMESTAMP NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "UQ_6bbe63d2fe75e7f0ba1710351d4" UNIQUE ("user_id"), CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_token"("id", "expiresOn", "user_id") SELECT "id", "expiresOn", "user_id" FROM "temporary_refresh_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_token"`);
  }
}
