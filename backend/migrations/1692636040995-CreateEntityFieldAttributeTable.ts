import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEntityFieldAttributeTable1692636040995
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entity_field_attribute',
        columns: [
          {
            name: 'fieldId',
            type: 'varchar',
            length: '36',
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
        columnNames: ['fieldId'],
        referencedColumnNames: ['id'], // Assuming the primary column in EntityField is named "id"
        referencedTableName: 'entity_field', // Assuming the table name for EntityField is "entity_field"
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('entity_field_attribute');

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('fieldId') !== -1,
    );

    await queryRunner.dropForeignKey('entity_field_attribute', foreignKey);
    await queryRunner.dropTable('entity_field_attribute');
  }
}
