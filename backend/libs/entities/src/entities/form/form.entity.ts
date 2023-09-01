import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import {
  FormConfiguration,
  FormEntity,
  FormPage,
  Record,
  Study,
  Task,
} from '../..';
import { IdEntity } from '@entities/modules/IdEntity';

export class BaseForm extends IdEntity {
  @Column()
  studyId: string;

  @Column()
  name: string;
}

@TypeOrmEntity()
@Unique('unique_name_for_study', ['studyId', 'name'])
export class Form extends BaseForm {
  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.form,
  )
  configurations: FormConfiguration[];

  @OneToMany(() => Task, (task) => task.form)
  tasks: Task[];

  @OneToMany(() => FormPage, (page) => page.form)
  pages: FormPage[];

  @OneToMany(() => FormEntity, (formEntity) => formEntity.form)
  formEntities: FormEntity[];

  @OneToMany(() => Record, (record) => record.form)
  records: Record[];

  @ManyToOne(() => Study, (study) => study.forms, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
