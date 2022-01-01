import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTags1633967389897 implements MigrationInterface {
    name = 'CreateTags1633967389897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_tags_tags" ("postsId" character varying NOT NULL, "tagsId" character varying NOT NULL, CONSTRAINT "PK_0102fd077ecbe473388af8f3358" PRIMARY KEY ("postsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf364c7e6905b285c4b55a0034" ON "posts_tags_tags" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce163a967812183a51b044f740" ON "posts_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "large" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "large" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "medium" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "medium" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "small" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "small" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "thumbnail" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "thumbnail" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "formats" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "formats" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" ADD CONSTRAINT "FK_cf364c7e6905b285c4b55a00343" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" ADD CONSTRAINT "FK_ce163a967812183a51b044f7404" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" DROP CONSTRAINT "FK_ce163a967812183a51b044f7404"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" DROP CONSTRAINT "FK_cf364c7e6905b285c4b55a00343"`);
        await queryRunner.query(`ALTER TABLE "formats" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "formats" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "thumbnail" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "thumbnail" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "small" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "small" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "medium" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "medium" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "large" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "large" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP INDEX "IDX_ce163a967812183a51b044f740"`);
        await queryRunner.query(`DROP INDEX "IDX_cf364c7e6905b285c4b55a0034"`);
        await queryRunner.query(`DROP TABLE "posts_tags_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
