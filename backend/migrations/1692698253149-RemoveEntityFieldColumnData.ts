import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveEntityFieldColumnData1692698253149
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('entity_field', 'data');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'entity_field',
      new TableColumn({
        name: 'data',
        type: 'json',
        isNullable: true,
      }),
    );
  }
}
