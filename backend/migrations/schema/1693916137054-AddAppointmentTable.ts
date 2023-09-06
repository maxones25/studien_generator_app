import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddAppointmentTable1693916137054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointment',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'modifiedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deletedAt',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'startDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'startTime',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'endDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'endTime',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'subject',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'originId',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
          {
            name: 'studyId',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
          {
            name: 'groupId',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
          {
            name: 'participantId',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
        ],
      }),
    );

    // Create foreign keys
    const foreignKeys = [
      new TableForeignKey({
        columnNames: ['originId'],
        referencedTableName: 'appointment',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
      new TableForeignKey({
        columnNames: ['studyId'],
        referencedTableName: 'study',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['groupId'],
        referencedTableName: 'group',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['participantId'],
        referencedTableName: 'participant',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ];

    for (const fk of foreignKeys) {
      await queryRunner.createForeignKey('appointment', fk);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointment');
  }
}
