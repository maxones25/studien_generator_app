import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnDeletedAtStudy1693493178241
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'study',
      new TableColumn({
        name: 'deletedAt',
        type: 'datetime',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("study", "deletedAt")
  }
}
