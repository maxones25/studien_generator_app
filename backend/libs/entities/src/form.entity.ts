import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Study } from './study.entity';
import { FormPage } from './form-page.entity';
import { Record } from './record.entity';
import { FormEntity } from './form-entity.entity';
import { FormConfiguration } from './form-configuration.entity';
import { Task } from './task.entity';
import { FormComponent } from './form-component.entity';

@TypeOrmEntity()
@Unique('unique_name_for_study', ['studyId', 'name'])
export class Form {
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
  studyId: string;

  @Column()
  name: string;

  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.form,
  )
  configurations: FormEntity[];

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
