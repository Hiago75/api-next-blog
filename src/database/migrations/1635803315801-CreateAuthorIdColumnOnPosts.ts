import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAuthorIdColumnOnPosts1635803315801 implements MigrationInterface {
    name = 'CreateAuthorIdColumnOnPosts1635803315801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "authorId" TO "author_id"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "author_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "author_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "author_id" TO "authorId"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
