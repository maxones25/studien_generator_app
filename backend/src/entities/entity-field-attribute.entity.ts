import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  PrimaryColumn,
} from 'typeorm';
import { ConcreteEntity } from './concrete-entity.entity';
import { EntityField } from './entity-field.entity';

@Entity()
@Unique('unique_key_for_concrete_entity', ['fieldId', 'concreteEntityId', 'key'])
export class EntityFieldAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fieldId: string;

  @Column({ nullable: true })
  concreteEntityId: string;

  @Column()
  key: string;

  @Column({ type: 'json' })
  value: any;

  @ManyToOne(() => EntityField, (field) => field.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  field: EntityField;

  @ManyToOne(() => ConcreteEntity, (entity) => entity.fieldAttributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  concreteEntity: ConcreteEntity;
}
