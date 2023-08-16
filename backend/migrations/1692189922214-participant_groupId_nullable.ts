import { MigrationInterface, QueryRunner } from 'typeorm';

export class ParticipantGroupIdNullable1692189922214
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('participant');
    const oldColumn = table?.findColumnByName('groupId');

    if (oldColumn && !oldColumn.isNullable) {
      const newColumn = oldColumn.clone();
      newColumn.isNullable = true;

      await queryRunner.changeColumn('participant', oldColumn, newColumn);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('participant');
    const oldColumn = table?.findColumnByName('groupId');

    if (oldColumn && oldColumn.isNullable) {
      const newColumn = oldColumn.clone();
      newColumn.isNullable = false;

      await queryRunner.changeColumn('participant', oldColumn, newColumn);
    }
  }
}
