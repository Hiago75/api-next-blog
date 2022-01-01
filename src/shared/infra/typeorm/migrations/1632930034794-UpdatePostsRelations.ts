import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePostsRelations1632930034794 implements MigrationInterface {
    name = 'UpdatePostsRelations1632930034794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_168bf21b341e2ae340748e2541d"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "coverId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_168bf21b341e2ae340748e2541d"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "coverId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
