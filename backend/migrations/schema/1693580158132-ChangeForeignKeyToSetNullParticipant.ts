import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class ChangeForeignKeyToSetNullParticipant1693580158132
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'participant',
      'FK_dc56154aca4ec8aaaa49e7f6f61',
    );
    await queryRunner.createForeignKey(
      'participant',
      new TableForeignKey({
        name: 'FK_dc56154aca4ec8aaaa49e7f6f61',
        columnNames: ['groupId'],
        referencedTableName: 'group',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'participant',
      'FK_dc56154aca4ec8aaaa49e7f6f61',
    );
    await queryRunner.createForeignKey(
      'participant',
      new TableForeignKey({
        name: 'FK_dc56154aca4ec8aaaa49e7f6f61',
        columnNames: ['groupId'],
        referencedTableName: 'group',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }
}
