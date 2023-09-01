import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { FormComponent } from '../..';
import { BaseEntity } from '@entities/modules/BaseEntity';

export class BaseFormComponentAttribute extends BaseEntity {
  @PrimaryColumn()
  componentId: string;

  @PrimaryColumn()
  key: string;

  @Column('json')
  value: any;
}

@TypeOrmEntity()
export class FormComponentAttribute extends BaseFormComponentAttribute {
  @ManyToOne(() => FormComponent, (field) => field.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  component: FormComponent;
}
