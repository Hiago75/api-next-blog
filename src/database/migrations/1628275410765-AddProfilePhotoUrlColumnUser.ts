import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProfilePhotoUrlColumnUser1628275410765 implements MigrationInterface {
    name = 'AddProfilePhotoUrlColumnUser1628275410765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "profile_photo" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_authors"("id", "name", "email", "password", "admin", "created_at", "updated_at") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at" FROM "authors"`);
        await queryRunner.query(`DROP TABLE "authors"`);
        await queryRunner.query(`ALTER TABLE "temporary_authors" RENAME TO "authors"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authors" RENAME TO "temporary_authors"`);
        await queryRunner.query(`CREATE TABLE "authors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "authors"("id", "name", "email", "password", "admin", "created_at", "updated_at") SELECT "id", "name", "email", "password", "admin", "created_at", "updated_at" FROM "temporary_authors"`);
        await queryRunner.query(`DROP TABLE "temporary_authors"`);
    }

}
