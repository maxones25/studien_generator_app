import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Entity } from './entity.entity';
import { FormField } from './form-field.entity';
import { RecordField } from './record-field.entity';
import { FieldData } from '@admin/modules/entities/fields/dtos/FieldData';
import { FieldType } from '@shared/enums/field-type.enum';

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
  entityId: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FieldType,
  })
  type: FieldType;

  @Column('json', { nullable: true })
  data: FieldData;

  @OneToMany(() => FormField, (formField) => formField.entityField)
  formFields: FormField[];

  @OneToMany(() => RecordField, (recordField) => recordField.entityField)
  recordFields: RecordField[];

  @ManyToOne(() => Entity, (entity) => entity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  entity: Entity;
}
