import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { EntityField } from './entity-field.entity';
import { Group } from './group.entity';

@Entity()
@Unique('unique_key_for_concrete_entity', [
  'fieldId',
  'key',
])
export class EntityFieldAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt: Date;

  @Column()
  fieldId: string;

  @Column()
  key: string;

  @Column({ type: 'json' })
  value: any;

  @Column({ nullable: true })
  groupId: string;

  @ManyToOne(() => EntityField, (field) => field.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  field: EntityField;

  @ManyToOne(() => Group, (group) => group.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: Group;
}
