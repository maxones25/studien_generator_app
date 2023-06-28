import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Study } from './study.entity';
import { EntityField } from './entity-field.entity';
import { ConcreteEntity } from './concrete-entity.entity';

@Entity()
@Unique('unique_name_for_study', ['name', 'studyId'])
export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  studyId: string;

  @OneToMany(() => EntityField, (field) => field.abstractEntity)
  fields: EntityField[];

  @OneToMany(() => ConcreteEntity, (entity) => entity.abstractEntity)
  concreteEntites: ConcreteEntity[];

  @ManyToOne(() => Study, (study) => study.abstractEntities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
