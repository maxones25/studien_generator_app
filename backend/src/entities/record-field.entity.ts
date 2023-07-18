import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Record } from './record.entity';
import { EntityField } from './entity-field.entity';

@TypeOrmEntity()
export class RecordField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recordId: string;

  @Column()
  entityFieldId: string;

  @Column('json')
  value: any;

  @ManyToOne(() => Record, (record) => record.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  record: Record;

  @ManyToOne(() => EntityField, (entityField) => entityField.recordFields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  entityField: EntityField;
}
