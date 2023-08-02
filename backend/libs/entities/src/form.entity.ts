import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Study } from '.';
import { FormPage } from '.';
import { Record } from '.';
import { FormEntity } from '.';
import { FormConfiguration } from '.';
import { Task } from '.';

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
