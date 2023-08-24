import { MigrationInterface, QueryRunner } from "typeorm"

export class Notifications1692871870953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ParticipantNotification-Entity
        await queryRunner.query(`
            CREATE TABLE \`participant_notification\` (
                \`id\` CHAR(36) NOT NULL PRIMARY KEY,
                \`participantId\` CHAR(36) NOT NULL,
                \`taskId\` CHAR(36),
                \`createdAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`modifiedAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`readAt\` DATETIME,
                \`processed\` BOOLEAN,
                \`oldDate\` DATETIME,
                \`newDate\` DATETIME
                -- FOREIGN KEY-Constraints hier hinzufügen, falls erforderlich
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`participant_notification\``);
    }
}
