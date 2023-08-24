import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateFormScheduleAttributeTable1692786431197
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'form_schedule_attribute',
        columns: [
          new TableColumn({
            name: 'scheduleId',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          }),
          new TableColumn({
            name: 'key',
            type: 'varchar',
            length: '255',
            isPrimary: true,
          }),
          new TableColumn({
            name: 'value',
            type: 'json',
          }),
        ],
      }),
    );

    // Create foreign key for 'scheduleId' column
    await queryRunner.createForeignKey(
      'form_schedule_attribute',
      new TableForeignKey({
        columnNames: ['scheduleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'form_schedule',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('form_schedule_attribute');

    // Find and drop the foreign key
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('scheduleId') !== -1,
    );
    await queryRunner.dropForeignKey('form_schedule_attribute', foreignKey);

    // Drop the 'form_schedule_attribute' table
    await queryRunner.dropTable('form_schedule_attribute');
  }
}
