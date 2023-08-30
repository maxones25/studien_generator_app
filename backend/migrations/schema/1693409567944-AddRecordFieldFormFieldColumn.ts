import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddRecordFieldFormFieldColumn1693409567944
  implements MigrationInterface
{
  private formFieldForeignKey: TableForeignKey = new TableForeignKey({
    columnNames: ['formFieldId'],
    referencedTableName: 'form_field',
    referencedColumnNames: ['id'],
    onDelete: 'RESTRICT',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'record_field',
      new TableColumn({
        name: 'formFieldId',
        type: 'varchar',
        length: '36',
      }),
    );

    await queryRunner.createForeignKey(
      'record_field',
      this.formFieldForeignKey,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('record_field', this.formFieldForeignKey);

    await queryRunner.dropColumn('record_field', 'formFieldId');
  }
}
