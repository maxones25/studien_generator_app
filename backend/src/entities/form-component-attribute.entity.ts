import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { FormComponent } from './form-component.entity';

@TypeOrmEntity()
export class FormComponentAttribute {
  @PrimaryColumn()
  formFieldId: string;

  @PrimaryColumn()
  key: string;

  @Column('json')
  value: any;

  @ManyToOne(() => FormComponent, (field) => field.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  component: FormComponent;
}
