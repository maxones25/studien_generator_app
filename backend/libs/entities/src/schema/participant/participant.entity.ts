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
  GroupSchema,
  ParticipantAttribute,
  ParticipantNotification,
  Record,
  StudySchema,
  Task,
} from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import { AppointmentSchema } from '../appointment/appointment.entity';
import { Participant } from '@entities/core/participant/Participant';

export class BaseParticipantSchema extends IdEntity implements Participant {
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

@Entity('participant')
@Unique('unique_number_for_study', ['number', 'studyId'])
export class ParticipantSchema extends BaseParticipantSchema {
  @OneToMany(() => ParticipantAttribute, (attribute) => attribute.participant)
  attributes: ParticipantAttribute[];

  @OneToMany(() => AppointmentSchema, (appointment) => appointment.participant)
  appointments: AppointmentSchema[];

  @OneToMany(() => Record, (record) => record.participant)
  records: Record[];

  @OneToMany(() => Task, (task) => task.participant)
  tasks: Task[];

  @ManyToOne(() => StudySchema, (study) => study.participants, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: StudySchema;

  @ManyToOne(() => GroupSchema, (group) => group.participants, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: GroupSchema;

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
