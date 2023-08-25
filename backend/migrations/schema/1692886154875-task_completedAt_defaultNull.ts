import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class TaskCompletedAtDefaultNull1692886154875
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'task',
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
