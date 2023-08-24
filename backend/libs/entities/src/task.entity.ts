import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Form, ParticipantNotification } from '.';
import { Participant } from '.';
import { Record } from '.';
import { FormSchedule } from '.';
import { Transform } from 'class-transformer';

@TypeOrmEntity()
export class Task {
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
  participantId: string;

  @Column()
  formId: string;

  @Column({ nullable: true })
  scheduleId: string;

  @Column('datetime')
  originalScheduledAt: Date;

  @Column('datetime')
  scheduledAt: Date;

  @Column('datetime')
  completedAt: Date;

  @Column('boolean')
  postponable: boolean;

  @Column('integer')
  rescheduled: number;

  @OneToMany(() => Record, (record) => record.task)
  records: Record[];

  @ManyToOne(() => Form, (form) => form.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  form: Form;

  @ManyToOne(() => FormSchedule, (schedule) => schedule.tasks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  schedule: FormSchedule;

  @ManyToOne(() => Participant, (participant) => participant.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;

  @OneToMany(() => ParticipantNotification, (notification) => notification.task)
  notifications: ParticipantNotification[];
}
