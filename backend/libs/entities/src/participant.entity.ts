import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Chat, ChatMessage, ChatMessageReceipt, Group } from '.';
import { Study } from '.';
import { Record } from '.';
import { Task } from '.';
import { ParticipantAttributes, ParticipantNotification } from '.';

@Entity()
@Unique('unique_number_for_study', ['number', 'studyId'])
export class Participant {
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
  number: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  groupId: string;

  @Column()
  studyId: string;

  @Column('text', { nullable: true })
  subscription: string;

  @OneToMany(() => ParticipantAttributes, (attribute) => attribute.participant)
  attributes: ParticipantAttributes[];

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

  @OneToMany(() => ChatMessageReceipt, (messageReceipt) => messageReceipt.participant)
  messageReceipts: ChatMessageReceipt[];
  
  @OneToMany(() => ParticipantNotification, (notification) => notification.participant)
  notifications: ParticipantNotification[];
}
