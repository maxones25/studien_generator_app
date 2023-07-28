import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Study } from '.';
import { EntityField } from '.';
import { FormEntity } from '.';

@TypeOrmEntity()
@Unique('unique_name_for_study', ['name', 'studyId'])
export class Entity {
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
  name: string;

  @Column()
  studyId: string;

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
