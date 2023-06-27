import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Study } from './study.entity';
import { EntityField } from './entity-field.entity';
import { Group } from './group.entity';
import { AbstractEntity } from './abstract-entity.entity';

@TypeOrmEntity()
@Unique('unique_entity_for_study', ['abstractEntityId', 'studyId'])
@Unique('unique_entity_for_group', ['abstractEntityId', 'groupId'])
export class ConcreteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  studyId: string;

  @Column({ nullable: true })
  groupId: string;

  @Column()
  abstractEntityId: string;

  @OneToMany(() => EntityField, (field) => field.concreteEntity)
  fields: EntityField[];

  @ManyToOne(() => Study, (study) => study.entities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;

  @ManyToOne(() => Group, (group) => group.entities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: Group;

  @ManyToOne(() => AbstractEntity, (entity) => entity.concreteEntites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  abstractEntity: AbstractEntity;
}
