import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { ConcreteEntity } from './concrete-entity.entity';
import { EntityFieldAttribute } from './entity-field-attribute.entity';
import { FieldType } from '../enums/field-type.enum';

@TypeOrmEntity()
@Unique('unique_name_for_entity', ['name', 'abstractEntityId'])
export class EntityField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: FieldType;

  @Column()
  abstractEntityId: string;

  @Column({ nullable: true })
  concreteEntityId: string;

  @OneToOne(() => EntityFieldAttribute, (attribute) => attribute.field)
  attributes: EntityFieldAttribute[];

  @ManyToOne(() => AbstractEntity, (entity) => entity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  abstractEntity: AbstractEntity;

  @ManyToOne(() => ConcreteEntity, (entity) => entity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  concreteEntity: ConcreteEntity;
}
