import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { FormField, Record } from '.';
import { EntityField } from '.';

@TypeOrmEntity()
export class RecordField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recordId: string;

  @Column()
  formFieldId: string;

  @Column('json')
  value: any;

  @ManyToOne(() => Record, (record) => record.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  record: Record;

  @ManyToOne(() => FormField, (formField) => formField.recordFields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  formField: FormField;
}
