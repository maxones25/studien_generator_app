import { Column, Entity, ManyToOne } from 'typeorm';
import { ChatMessage, Director, ParticipantSchema} from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseChatMessageReceipt extends IdEntity {
  @Column()
  messageId: string;

  @Column({ nullable: true })
  directorId: string;

  @Column({ nullable: true })
  participantId: string;

  @Column({ nullable: true })
  readAt: Date;
}

@Entity()
export class ChatMessageReceipt extends BaseChatMessageReceipt {
  @ManyToOne(() => ChatMessage, (message) => message.receipts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  message: ChatMessage;

  @ManyToOne(() => Director, (director) => director.messageReceipts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  director: Director;

  @ManyToOne(() => ParticipantSchema, (participant) => participant.messageReceipts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: ParticipantSchema;
}
