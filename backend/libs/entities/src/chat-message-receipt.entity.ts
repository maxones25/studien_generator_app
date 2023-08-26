import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatMessage, Director, Participant } from ".";

@Entity()
export class ChatMessageReceipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @Column()
  messageId: string;

  @Column({ nullable: true })
  directorId: string;

  @Column({ nullable: true })
  participantId: string;

  @Column({ nullable: true })
  readAt: Date;

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

  @ManyToOne(() => Participant, (participant) => participant.messageReceipts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;
}