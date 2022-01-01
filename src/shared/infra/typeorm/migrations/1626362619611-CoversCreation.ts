import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CoversCreation1626362619611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'covers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'public_id',
            type: 'varchar',
          },
          {
            name: 'width',
            type: 'integer',
          },
          {
            name: 'height',
            type: 'integer',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
