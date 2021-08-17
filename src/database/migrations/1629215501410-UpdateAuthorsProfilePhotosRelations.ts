import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAuthorsProfilePhotosRelations1629215501410 implements MigrationInterface {
    name = 'UpdateAuthorsProfilePhotosRelations1629215501410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_profile_photos"("id", "url", "created_at", "updated_at", "user_id") SELECT "id", "url", "created_at", "updated_at", "user_id" FROM "profile_photos"`);
        await queryRunner.query(`DROP TABLE "profile_photos"`);
        await queryRunner.query(`ALTER TABLE "temporary_profile_photos" RENAME TO "profile_photos"`);
        await queryRunner.query(`CREATE TABLE "temporary_profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_profile_photos"("id", "url", "created_at", "updated_at") SELECT "id", "url", "created_at", "updated_at" FROM "profile_photos"`);
        await queryRunner.query(`DROP TABLE "profile_photos"`);
        await queryRunner.query(`ALTER TABLE "temporary_profile_photos" RENAME TO "profile_photos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_photos" RENAME TO "temporary_profile_photos"`);
        await queryRunner.query(`CREATE TABLE "profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "profile_photos"("id", "url", "created_at", "updated_at") SELECT "id", "url", "created_at", "updated_at" FROM "temporary_profile_photos"`);
        await queryRunner.query(`DROP TABLE "temporary_profile_photos"`);
        await queryRunner.query(`ALTER TABLE "profile_photos" RENAME TO "temporary_profile_photos"`);
        await queryRunner.query(`CREATE TABLE "profile_photos" ("id" varchar PRIMARY KEY NOT NULL, "url" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar NOT NULL, CONSTRAINT "FK_0a89ee3cad656bab0edbce226a4" FOREIGN KEY ("user_id") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "profile_photos"("id", "url", "created_at", "updated_at", "user_id") SELECT "id", "url", "created_at", "updated_at", "user_id" FROM "temporary_profile_photos"`);
        await queryRunner.query(`DROP TABLE "temporary_profile_photos"`);
    }

}
