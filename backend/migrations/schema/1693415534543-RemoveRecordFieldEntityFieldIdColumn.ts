import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class RemoveRecordFieldEntityFieldIdColumn1693415534543
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'record_field',
      'FK_0243673ce23731f3927a09223ea',
    );

    await queryRunner.dropColumn('record_field', 'entityFieldId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'record_field',
      new TableForeignKey({
        columnNames: ['entityFieldId'],
        referencedTableName: 'entity_field',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.addColumn(
      'record_field',
      new TableColumn({ name: 'entityFieldId', type: 'varchar', length: '36' }),
    );
  }
}
