import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsCreatedAtAndModifiedAtToAllTables1693554642061
  implements MigrationInterface
{
  private readonly tables = [
    'chat',
    'form_schedule_attribute',
    'participant_attributes',
    'record_field',
    'study_attribute',
    'study_member',
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of this.tables) {
      await queryRunner.addColumns(table, [
        new TableColumn({
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        }),
        new TableColumn({
          name: 'modifiedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        }),
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of this.tables) {
      await queryRunner.dropColumn(table, 'createdAt');
      await queryRunner.dropColumn(table, 'modifiedAt');
    }
  }
}
