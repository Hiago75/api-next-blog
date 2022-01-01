import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateExternalPhotoUrlColumnOnPosts1636217641089 implements MigrationInterface {
    name = 'CreateExternalPhotoUrlColumnOnPosts1636217641089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "external_photo_url" character varying`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "coverId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "coverId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_04f7778a9d57576154ff9c4eb9a" FOREIGN KEY ("coverId") REFERENCES "covers"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "external_photo_url"`);
    }

}
