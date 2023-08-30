import {
  Entity as TypeOrmEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityField, RecordField } from '.';
import { FormComponent } from '.';
import { FormEntity } from '.';

@TypeOrmEntity()
export class FormField {
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
  formComponentId: string;

  @Column()
  entityFieldId: string;

  @OneToMany(() => RecordField, recordField => recordField.formField)
  recordFields: RecordField[];

  @ManyToOne(() => FormEntity, formEntity => formEntity.fields, {
    cascade: true,
    onDelete: "CASCADE",
  })
  entity: FormEntity;

  @ManyToOne(() => FormComponent, (formComponent) => formComponent.formFields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  formComponent: FormComponent;

  @ManyToOne(() => EntityField, (entityField) => entityField.formFields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  entityField: EntityField;
}
