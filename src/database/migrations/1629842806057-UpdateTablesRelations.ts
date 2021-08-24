import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablesRelations1629842806057 implements MigrationInterface {
  name = 'UpdateTablesRelations1629842806057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "covers" ADD CONSTRAINT "FK_10ecdc1db35b42d34724b2abb5c" FOREIGN KEY ("formatId") REFERENCES "formats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"`);
    await queryRunner.query(`ALTER TABLE "covers" DROP CONSTRAINT "FK_10ecdc1db35b42d34724b2abb5c"`);
  }
}
