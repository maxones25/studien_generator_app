import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Form } from '.';
import { Participant } from '.';
import { Task } from '.';
import { RecordField } from '.';

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

  @Column({ nullable: true })
  failureReason: string;

  get isFailed() {
    return this.failureReason !== null;
  }

  @ManyToOne(() => Task, (task) => task.records, {
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
