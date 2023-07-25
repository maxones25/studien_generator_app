import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { Study } from './study.entity';
import { Task } from './task.entity';
import { Form } from './form.entity';
import { FormConfigType } from '@shared/enums/form-config-type.enum';

@TypeOrmEntity()
export class FormConfiguration {
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
  studyId: string;

  @Column({ nullable: true })
  groupId: string;

  @Column()
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: FormConfigType,
  })
  type: FormConfigType;

  @OneToMany(() => Task, (task) => task.form)
  tasks: Task[];

  @ManyToOne(() => Form, (form) => form.configurations, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  form: Form;

  @ManyToOne(() => Study, (study) => study.formConfigurations, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;

  @ManyToOne(() => Group, (group) => group.forms, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: Group;
}
