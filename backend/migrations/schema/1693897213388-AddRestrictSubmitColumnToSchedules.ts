import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRestrictSubmitColumnToSchedules1693897213388
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'form_schedule',
      new TableColumn({ name: 'restrict', type: 'json', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('form_schedule', 'restrict');
  }
}
