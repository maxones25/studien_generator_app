import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { GroupSchema, StudySchema, Form, FormSchedule } from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import { IFormConfig } from '@entities/core/group/formConfig/FormConfig';

export class BaseFormConfiguration extends IdEntity {}

@TypeOrmEntity()
@Unique('unique_form_config', ['formId', 'studyId', 'groupId', 'type'])
export class FormConfiguration extends IdEntity implements IFormConfig {
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

  @ManyToOne(() => StudySchema, (study) => study.formConfigurations, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: StudySchema;

  @ManyToOne(() => GroupSchema, (group) => group.forms, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: GroupSchema;
}
