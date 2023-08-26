import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddFieldsToMessageReceipts1693054794189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adding the 'createdAt' column
        await queryRunner.addColumn('chat_message_receipt', new TableColumn({
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP'
        }));

        // Adding the 'modifiedAt' column
        await queryRunner.addColumn('chat_message_receipt', new TableColumn({
            name: 'modifiedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Dropping the 'modifiedAt' column
        await queryRunner.dropColumn('chat_message_receipt', 'modifiedAt');

        // Dropping the 'createdAt' column
        await queryRunner.dropColumn('chat_message_receipt', 'createdAt');
    }

}