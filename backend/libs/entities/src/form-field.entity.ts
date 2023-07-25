import { Entity as TypeOrmEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { EntityField } from './entity-field.entity';
import { FormComponent } from './form-component.entity';

@TypeOrmEntity()
export class FormField {
  @PrimaryColumn()
  formComponentId: string;

  @PrimaryColumn()
  entityFieldId: string;

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
