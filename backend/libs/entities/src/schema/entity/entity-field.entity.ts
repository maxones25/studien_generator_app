import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Entity, FormField } from '..';
import { FieldType } from '@shared/enums/field-type.enum';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseEntityField extends IdEntity {
  @Column()
  entityId: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FieldType,
  })
  type: FieldType;
}

@TypeOrmEntity()
@Unique('unique_name_for_entity', ['name', 'entityId'])
export class EntityField extends BaseEntityField {
  @OneToMany(() => FormField, (formField) => formField.entityField)
  formFields: FormField[];

  @ManyToOne(() => Entity, (entity) => entity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  entity: Entity;
}
