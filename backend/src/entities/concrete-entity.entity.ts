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
import { Group } from './group.entity';
import { AbstractEntity } from './abstract-entity.entity';
import { EntityFieldAttribute } from './entity-field-attribute.entity';

@Entity()
@Unique('unique_entity_for_group', ['abstractEntityId', 'groupId'])
export class ConcreteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studyId: string;

  @Column({ nullable: true })
  groupId: string;

  @Column()
  abstractEntityId: string;

  @OneToMany(() => EntityField, (field) => field.concreteEntity)
  fields: EntityField[];

  @OneToMany(
    () => EntityFieldAttribute,
    (attribute) => attribute.concreteEntity,
  )
  fieldAttributes: EntityFieldAttribute[];

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
