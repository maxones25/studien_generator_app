import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Form } from './form.entity';
import { Participant } from './participant.entity';
import { Record } from './record.entity';

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
  formId: string;

  @Column()
  participantId: string;

  @Column('datetime')
  scheduledAt: Date;

  @Column('datetime')
  completedAt: Date;

  @OneToMany(() => Record, (record) => record.task)
  record: Record;

  @ManyToOne(() => Form, (form) => form.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  form: Form;

  @ManyToOne(() => Participant, (participant) => participant.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;
}
