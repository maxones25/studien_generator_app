import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat, ChatMessageReceipt, Director, Participant } from "."

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  chatId: string;

  @Column({ nullable: true })
  directorId: string;

  @Column({ nullable: true })
  participantId: string;

  @Column()
  sendAt: Date;

  @Column('text')
  content: string;

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

  @ManyToOne(() => Participant, (participant) => participant.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;
}