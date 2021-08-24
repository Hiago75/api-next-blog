import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationCoversFormats1626739430787 implements MigrationInterface {
  name = 'RelationCoversFormats1626739430787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "covers" CASCADE`);
    await queryRunner.query(
      `CREATE TABLE "temporary_covers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "public_id" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "provider" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "formatId" varchar, CONSTRAINT "UQ_f62a3e43cd721f5dbd71f28f006" UNIQUE ("formatId"), CONSTRAINT "FK_10ecdc1db35b42d34724b2abb5c" FOREIGN KEY ("formatId") REFERENCES "formats" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(`ALTER TABLE "temporary_covers" RENAME TO "covers"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "covers" RENAME TO "temporary_covers"`);
    await queryRunner.query(
      `CREATE TABLE "covers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "public_id" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "provider" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "formatId" varchar, CONSTRAINT "UQ_f62a3e43cd721f5dbd71f28f006" UNIQUE ("formatId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "covers"("id", "name", "public_id", "width", "height", "url", "provider", "created_at", "updated_at", "formatId") SELECT "id", "name", "public_id", "width", "height", "url", "provider", "created_at", "updated_at", "formatId" FROM "temporary_covers"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_covers"`);
    await queryRunner.query(`ALTER TABLE "covers" RENAME TO "temporary_covers"`);
    await queryRunner.query(
      `CREATE TABLE "covers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "public_id" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "url" varchar NOT NULL, "provider" varchar NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `INSERT INTO "covers"("id", "name", "public_id", "width", "height", "url", "provider", "created_at", "updated_at") SELECT "id", "name", "public_id", "width", "height", "url", "provider", "created_at", "updated_at" FROM "temporary_covers"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_covers"`);
  }
}
