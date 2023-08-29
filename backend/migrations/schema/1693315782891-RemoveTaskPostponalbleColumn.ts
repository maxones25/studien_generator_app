import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveTaskPostponalbleColumn1693315782891
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('task', 'postponable');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'task',
      new TableColumn({ name: 'postponable', type: 'boolean' }),
    );
  }
}
