import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class ChangeUniqueFormEntities1693038631088
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'form_entity',
      'FK_59d37facb3632ac059beeea77dd',
    );
    await queryRunner.dropForeignKey(
      'form_entity',
      'FK_466c754952e7c2cac407dd49dcb',
    );

    await queryRunner.dropIndex('form_entity', 'unique_form_entity');

    await queryRunner.createForeignKey(
      'form_entity',
      new TableForeignKey({
        name: 'FK_59d37facb3632ac059beeea77dd',
        columnNames: ['entityId'],
        referencedTableName: 'entity',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'form_entity',
      new TableForeignKey({
        name: 'FK_466c754952e7c2cac407dd49dcb',
        columnNames: ['formId'],
        referencedTableName: 'form',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'form_entity',
      new TableIndex({
        name: 'unique_form_entity',
        columnNames: ['formId', 'name'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'form_entity',
      'FK_59d37facb3632ac059beeea77dd',
    );
    await queryRunner.dropForeignKey(
      'form_entity',
      'FK_466c754952e7c2cac407dd49dcb',
    );

    // Drop the new unique constraint
    await queryRunner.dropIndex('form_entity', 'unique_form_entity');

    await queryRunner.createForeignKey(
      'form_entity',
      new TableForeignKey({
        name: 'FK_59d37facb3632ac059beeea77dd',
        columnNames: ['entityId'],
        referencedTableName: 'entity',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'form_entity',
      new TableForeignKey({
        name: 'FK_466c754952e7c2cac407dd49dcb',
        columnNames: ['formId'],
        referencedTableName: 'form',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Restore the old unique constraint
    await queryRunner.createIndex(
      'form_entity',
      new TableIndex({
        name: 'unique_form_entity',
        columnNames: ['formId', 'entityId', 'name'],
        isUnique: true,
      }),
    );
  }
}
