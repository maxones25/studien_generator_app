import { Entity as TypeOrmEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Form } from './form.entity';
import { Entity } from './entity.entity';

@TypeOrmEntity()
export class FormEntity {
  @PrimaryColumn()
  formId: string;

  @PrimaryColumn()
  entityId: string;

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
