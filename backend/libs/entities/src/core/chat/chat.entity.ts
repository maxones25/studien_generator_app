import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ChatMessage, Participant, Study } from '../..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseChat extends IdEntity {
  @Column()
  participantId: string;

  @Column()
  studyId: string;
}

@Entity()
export class Chat extends BaseChat {
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
