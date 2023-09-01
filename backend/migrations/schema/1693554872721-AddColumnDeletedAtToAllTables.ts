import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnDeletedAtToAllTables1693554872721
  implements MigrationInterface
{
  private readonly tables = [
    'chat',
    'chat_message',
    'chat_message_receipt',
    'director',
    'entity',
    'entity_field',
    'form',
    'form_component',
    'form_component_attribute',
    'form_configuration',
    'form_entity',
    'form_field',
    'form_page',
    'form_schedule',
    'form_schedule_attribute',
    'participant',
    'participant_attributes',
    'participant_notification',
    'record',
    'record_field',
    'study_attribute',
    'study_member',
    'task',
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of this.tables) {
      await queryRunner.addColumns(table, [
        new TableColumn({
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true,
        }),
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of this.tables) {
      await queryRunner.dropColumn(table, 'deletedAt');
    }
  }
}
