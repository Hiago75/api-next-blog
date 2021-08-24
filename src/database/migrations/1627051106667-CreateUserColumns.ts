import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserColumns1627051106667 implements MigrationInterface {
  name = 'CreateUserColumns1627051106667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_authors"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "authors"`,
    );
    await queryRunner.query(`DROP TABLE "authors" CASCADE`);
    await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "authors"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "temporary_authors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_authors"`);
  }
}
