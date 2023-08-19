import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudyAttributeTable1692281313075
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`study_attribute\` (
                \`studyId\` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                \`key\` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                \`value\` json NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

    await queryRunner.query(`
            ALTER TABLE \`study_attribute\`
            ADD PRIMARY KEY (\`studyId\`, \`key\`);
        `);

    await queryRunner.query(`
            ALTER TABLE \`study_attribute\`
            ADD CONSTRAINT \`FK_a3d9b215e6f4c07b89e5826c4b0d\` FOREIGN KEY (\`studyId\`) REFERENCES \`study\` (\`id\`) ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE study_attribute;`);
  }
}
