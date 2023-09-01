import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnDeletedAtGroup1693503956670
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'group',
      new TableColumn({
        name: 'deletedAt',
        type: 'datetime',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("group", "deletedAt")
  }
}
