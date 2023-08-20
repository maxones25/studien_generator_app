import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPostponableToTask1692549281457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'task',
      new TableColumn({
        name: 'postponable',
        type: 'boolean',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('task', 'postponable');
  }
}
