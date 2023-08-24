import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatMessage, Participant, Study } from ".";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  participantId: string;

  @Column()
  studyId: string;

  @OneToMany(() => ChatMessage, (message) => message.chat)
  messages: ChatMessage[];

  @ManyToOne(() => Study, (study) => study.chats, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;

  @OneToOne(() => Participant, (participant) => participant.chat, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  participant: Participant;
}
