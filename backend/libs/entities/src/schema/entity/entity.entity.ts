import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Study, EntityField, FormEntity } from '../..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseEntity extends IdEntity {
  @Column()
  name: string;

  @Column()
  studyId: string;
}

@TypeOrmEntity()
@Unique('unique_name_for_study', ['name', 'studyId'])
export class Entity extends BaseEntity {
  @OneToMany(() => EntityField, (field) => field.entity)
  fields: EntityField[];

  @OneToMany(() => FormEntity, (formEntity) => formEntity.entity)
  formEntities: FormEntity[];

  @ManyToOne(() => Study, (study) => study.entities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
