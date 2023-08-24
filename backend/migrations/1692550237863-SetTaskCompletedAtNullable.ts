import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class SetTaskCompletedAtNullable1692550237863
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'task', // the name of the table
      new TableColumn({
        name: 'completedAt',
        type: 'datetime',
        isNullable: false,
      }),
      new TableColumn({
        name: 'completedAt',
        type: 'datetime',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'task',
      new TableColumn({
        name: 'completedAt',
        type: 'datetime',
        isNullable: true,
      }),
      new TableColumn({
        name: 'completedAt',
        type: 'datetime',
        isNullable: false,
      }),
    );
  }
}
