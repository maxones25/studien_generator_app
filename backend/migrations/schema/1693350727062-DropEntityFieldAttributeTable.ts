import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class DropEntityFieldAttributeTable1693350727062
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('entity_field_attribute');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entity_field_attribute',
        columns: [
          {
            name: 'fieldId',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'key',
            type: 'varchar',
            length: '255',
            isPrimary: true,
          },
          {
            name: 'value',
            type: 'json',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'entity_field_attribute',
      new TableForeignKey({
        name: 'FK_8abc19c63dd4d09efde3e5ab575',
        columnNames: ['fieldId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'entity_field',
        onDelete: 'CASCADE',
      }),
    );
  }
}
