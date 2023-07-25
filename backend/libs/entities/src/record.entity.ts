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
import { Task } from './task.entity';
import { RecordField } from './record-field.entity';

@TypeOrmEntity()
export class Record {
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

  @Column({ nullable: true })
  taskId: string;

  @ManyToOne(() => Task, (task) => task.record, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  task: Task;

  @OneToMany(() => RecordField, (field) => field.record)
  fields: RecordField[];

  @ManyToOne(() => Form, (form) => form.records, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  form: Form;

  @ManyToOne(() => Participant, (participant) => participant.records, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;
}
