import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToOne,
} from 'typeorm';
import { Entity } from './entity.entity';
import { EntityFieldAttribute } from './entity-field-attribute.entity';
import { FieldType } from '../enums/field-type.enum';
import { Group } from './group.entity';
import { FieldData } from '../modules/fields/dtos/FieldData';

@TypeOrmEntity()
@Unique('unique_name_for_entity', ['name', 'entityId'])
export class EntityField {
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
  type: FieldType;

  @Column('json', { nullable: true })
  data: FieldData;

  @Column()
  entityId: string;

  @Column({ nullable: true })
  groupId: string;

  @OneToOne(() => EntityFieldAttribute, (attribute) => attribute.field)
  attributes: EntityFieldAttribute[];

  @ManyToOne(() => Entity, (entity) => entity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  entity: Entity;

  @ManyToOne(() => Group, (entity) => entity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: Group;
}
