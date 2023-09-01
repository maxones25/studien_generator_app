import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
  OneToOne,
} from 'typeorm';
import {
  Chat,
  ChatMessage,
  ChatMessageReceipt,
  Group,
  ParticipantAttribute,
  ParticipantNotification,
  Record,
  Study,
  Task,
} from '../..';
import { IdEntity } from '@entities/modules/IdEntity';

export class BaseParticipant extends IdEntity {
  @Column()
  number: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  groupId: string;

  @Column()
  studyId: string;

  @Column('text', { nullable: true })
  subscription: string;
}

@Entity()
@Unique('unique_number_for_study', ['number', 'studyId'])
export class Participant extends BaseParticipant {
  @OneToMany(() => ParticipantAttribute, (attribute) => attribute.participant)
  attributes: ParticipantAttribute[];

  @OneToMany(() => Record, (record) => record.participant)
  records: Record[];

  @OneToMany(() => Task, (task) => task.participant)
  tasks: Task[];

  @ManyToOne(() => Study, (study) => study.participants, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;

  @ManyToOne(() => Group, (group) => group.participants, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: Group;

  @OneToOne(() => Chat, (chat) => chat.participant)
  chat: Chat;

  @OneToMany(() => ChatMessage, (message) => message.participant)
  messages: ChatMessage[];

  @OneToMany(
    () => ChatMessageReceipt,
    (messageReceipt) => messageReceipt.participant,
  )
  messageReceipts: ChatMessageReceipt[];

  @OneToMany(
    () => ParticipantNotification,
    (notification) => notification.participant,
  )
  notifications: ParticipantNotification[];
}
