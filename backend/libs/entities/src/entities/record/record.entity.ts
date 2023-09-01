import { Entity as TypeOrmEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Form, Participant, RecordField, Task } from '../..';
import { IdEntity } from '@entities/modules/IdEntity';

export class BaseRecord extends IdEntity {
  @Column()
  formId: string;

  @Column()
  participantId: string;

  @Column({ nullable: true })
  taskId: string;

  @Column({ nullable: true })
  failureReason: string;
}

@TypeOrmEntity()
export class Record extends BaseRecord {
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
