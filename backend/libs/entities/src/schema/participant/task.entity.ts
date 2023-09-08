import { Entity as TypeOrmEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import {
  Form,
  FormSchedule,
  ParticipantSchema,
  ParticipantNotification,
  Record,
} from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseTask extends IdEntity {
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

  @Column('integer')
  rescheduled: number;
}

@TypeOrmEntity()
export class Task extends BaseTask {
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

  @ManyToOne(() => ParticipantSchema, (participant) => participant.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: ParticipantSchema;

  @OneToMany(() => ParticipantNotification, (notification) => notification.task)
  notifications: ParticipantNotification[];
}
