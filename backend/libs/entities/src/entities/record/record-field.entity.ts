import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { FormField, Record } from '../..';
import { IdEntity } from '@entities/modules/IdEntity';

export class BaseRecordField extends IdEntity {
  @Column()
  recordId: string;

  @Column()
  formFieldId: string;

  @Column('json')
  value: any;
}

@TypeOrmEntity()
export class RecordField extends BaseRecordField {
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
