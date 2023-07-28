import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { Group, Study, Form, FormSchedule } from '.';

@TypeOrmEntity()
@Unique('unique_form_config', ['formId', 'studyId', 'groupId', 'type'])
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

  @OneToMany(() => FormSchedule, (schedule) => schedule.config)
  schedules: FormSchedule[];

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
