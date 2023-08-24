import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTimesColumnToFormSchedule1692547081484
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'form_schedule',
      new TableColumn({
        name: 'times',
        type: 'json',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('form_schedule', 'times');
  }
}
