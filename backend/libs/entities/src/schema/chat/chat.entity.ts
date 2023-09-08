import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ChatMessage, ParticipantSchema, StudySchema } from '..';
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

  @ManyToOne(() => StudySchema, (study) => study.chats, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: StudySchema;

  @OneToOne(() => ParticipantSchema, (participant) => participant.chat, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  participant: ParticipantSchema;
}
