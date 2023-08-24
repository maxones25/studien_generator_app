import { MigrationInterface, QueryRunner } from "typeorm"

export class Chat1692872936592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Chat-Entity
        await queryRunner.query(`
            CREATE TABLE \`chat\` (
                \`id\` CHAR(36) NOT NULL PRIMARY KEY,
                \`participantId\` CHAR(36) NOT NULL,
                \`studyId\` CHAR(36) NOT NULL
                FOREIGN KEY (\`studyId\`) REFERENCES \`study\`(\`id\`) ON DELETE CASCADE
                FOREIGN KEY (\`participantId\`) REFERENCES \`participant\`(\`id\`) ON DELETE CASCADE
            );
        `);
    
        // ChatMessage-Entity
        await queryRunner.query(`
            CREATE TABLE \`chat_message\` (
                \`id\` CHAR(36) NOT NULL PRIMARY KEY,
                \`createdAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`modifiedAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`chatId\` CHAR(36) NOT NULL,
                \`directorId\` CHAR(36),
                \`participantId\` CHAR(36),
                \`sentAt\` DATETIME NOT NULL,
                \`content\` TEXT NOT NULL,
                FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`(\`id\`) ON DELETE CASCADE
                FOREIGN KEY (\`directorId\`) REFERENCES \`director\`(\`id\`) ON DELETE CASCADE
                FOREIGN KEY (\`participantId\`) REFERENCES \`participant\`(\`id\`) ON DELETE CASCADE
            );
        `);

        // ChatMessageReceipt-Entity
        await queryRunner.query(`
            CREATE TABLE \`chat_message_receipt\` (
                \`id\` CHAR(36) NOT NULL PRIMARY KEY,
                \`messageId\` CHAR(36) NOT NULL,
                \`directorId\` CHAR(36),
                \`participantId\` CHAR(36),
                \`readAt\` DATETIME,
                FOREIGN KEY (\`messageId\`) REFERENCES \`chat_message\`(\`id\`) ON DELETE CASCADE
                FOREIGN KEY (\`directorId\`) REFERENCES \`director\`(\`id\`) ON DELETE CASCADE
                FOREIGN KEY (\`participantId\`) REFERENCES \`participant\`(\`id\`) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`chat_message_receipt\``);
        await queryRunner.query(`DROP TABLE \`chat_message\``);
        await queryRunner.query(`DROP TABLE \`chat\``);
    }

}
