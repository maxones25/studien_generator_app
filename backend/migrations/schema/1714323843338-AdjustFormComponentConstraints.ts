import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustFormComponentConstraints1714323843338 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign key constraint if it exists and depends on the unique index
        // This SQL needs to be customized based on your actual foreign key names and table structure
        await queryRunner.query(`ALTER TABLE \`form_component\` DROP FOREIGN KEY \`FK_07806ec3a1b11fba12d167c730f\``);

        // Drop the unique index
        await queryRunner.query(`ALTER TABLE \`form_component\` DROP INDEX \`unique_number_for_form_page\``);

        // Re-add the foreign key constraint without relying on the unique index if needed
        // Ensure to adjust columns and referenced table/columns based on your actual schema
        await queryRunner.query(`ALTER TABLE \`form_component\` ADD CONSTRAINT \`FK_07806ec3a1b11fba12d167c730f\` FOREIGN KEY (\`pageId\`) REFERENCES \`form_page\`(\`id\`) ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse the changes made in up method
        // Re-add the unique index
        await queryRunner.query(`ALTER TABLE \`form_component\` ADD UNIQUE INDEX \`unique_number_for_form_page\` (\`pageId\`, \`number\`)`);

        // Optionally drop and re-add the foreign key constraint to ensure it matches the original state
        await queryRunner.query(`ALTER TABLE \`form_component\` DROP FOREIGN KEY \`FK_07806ec3a1b11fba12d167c730f\``);
        await queryRunner.query(`ALTER TABLE \`form_component\` ADD CONSTRAINT \`FK_07806ec3a1b11fba12d167c730f\` FOREIGN KEY (\`pageId\`) REFERENCES \`form_page\`(\`id\`) ON DELETE CASCADE`);
    }
}
