import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Chat, ChatMessageReceipt, Director, ParticipantSchema } from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseChatMasse extends IdEntity {
  @Column()
  chatId: string;

  @Column({ nullable: true })
  directorId: string;

  @Column({ nullable: true })
  participantId: string;

  @Column()
  sentAt: Date;

  @Column('text')
  content: string;
}

@Entity()
export class ChatMessage extends BaseChatMasse {
  @OneToMany(() => ChatMessageReceipt, (receipt) => receipt.message)
  receipts: ChatMessageReceipt[];

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  chat: Chat;

  @ManyToOne(() => Director, (director) => director.messages, {
    onDelete: 'SET NULL',
  })
  director: Director;

  @ManyToOne(() => ParticipantSchema, (participant) => participant.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: ParticipantSchema;
}
