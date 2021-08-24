import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablesTimeFormat1629843752176 implements MigrationInterface {
  name = 'UpdateTablesTimeFormat1629843752176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "covers" DROP CONSTRAINT "FK_10ecdc1db35b42d34724b2abb5c"`);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "large" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "large" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "medium" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "medium" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "small" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "small" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "thumbnail" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "thumbnail" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "formats" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "formats" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "covers" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "covers" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "profile_photos" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "profile_photos" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "authors" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "authors" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(
      `ALTER TABLE "covers" ADD CONSTRAINT "FK_10ecdc1db35b42d34724b2abb5c" FOREIGN KEY ("formatId") REFERENCES "formats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "covers" DROP CONSTRAINT "FK_10ecdc1db35b42d34724b2abb5c"`);
    await queryRunner.query(`ALTER TABLE "authors" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "authors" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "profile_photos" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "profile_photos" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "covers" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "covers" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "formats" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "formats" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "thumbnail" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "thumbnail" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "small" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "small" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "medium" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "medium" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "large" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "large" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "covers" ADD CONSTRAINT "FK_10ecdc1db35b42d34724b2abb5c" FOREIGN KEY ("formatId") REFERENCES "formats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
