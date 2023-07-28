import {
  Entity as TypeOrmEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Form } from '.';
import { Entity } from '.';
import { FormField } from '.';

@TypeOrmEntity()
@Unique('unique_form_entity', ['formId', 'entityId', 'name'])
export class FormEntity {
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
  formId: string;

  @Column()
  entityId: string;

  @Column()
  name: string;

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
