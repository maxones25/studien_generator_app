import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSchedulePostponeAndRemoveDataColumn1692784310036
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the 'postpone' column
    await queryRunner.addColumn(
      'form_schedule',
      new TableColumn({
        name: 'postpone',
        type: 'json',
        isNullable: true,
        // If you have a default value, you can specify it here.
      }),
    );

    // Remove the 'data' column
    await queryRunner.dropColumn('form_schedule', 'data');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the 'postpone' column
    await queryRunner.dropColumn('form_schedule', 'postpone');

    // Re-add the 'data' column
    await queryRunner.addColumn(
      'form_schedule',
      new TableColumn({
        name: 'data',
        type: 'json',
        isNullable: false,
        // If you had a transformer or any other configurations for 'data', specify them here.
      }),
    );
  }
}
