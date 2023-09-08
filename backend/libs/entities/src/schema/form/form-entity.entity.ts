import {
  Entity as TypeOrmEntity,
  ManyToOne,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Form, FormField, Entity } from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseFormEntity extends IdEntity {
  @Column()
  formId: string;

  @Column()
  entityId: string;

  @Column()
  name: string;
}

@TypeOrmEntity()
@Unique('unique_form_entity', ['formId', 'name'])
export class FormEntity extends BaseFormEntity {
  @OneToMany(() => FormField, (formField) => formField.entity)
  fields: FormField[];

  @ManyToOne(() => Form, (form) => form.formEntities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  form: Form;

  @ManyToOne(() => Entity, (entity) => entity.formEntities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  entity: Entity;
}
