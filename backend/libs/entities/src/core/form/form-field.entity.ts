import { Entity as TypeOrmEntity, ManyToOne, Column, OneToMany } from 'typeorm';
import { EntityField, RecordField, FormComponent, FormEntity } from '../..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseFormField extends IdEntity {
  @Column()
  entityId: string;

  @Column()
  formComponentId: string;

  @Column()
  entityFieldId: string;
}

@TypeOrmEntity()
export class FormField extends BaseFormField {
  @OneToMany(() => RecordField, (recordField) => recordField.formField)
  recordFields: RecordField[];

  @ManyToOne(() => FormEntity, (formEntity) => formEntity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
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
