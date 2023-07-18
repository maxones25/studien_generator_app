import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Form } from './form.entity';
import { FormField } from './form-field.entity';
import { FormComponent } from './form-component.entity';

@TypeOrmEntity()
@Unique('unique_number_for_form', ['formId', 'number'])
export class FormPage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  formId: string;

  @Column('integer')
  number: number;

  @Column()
  title: string;

  @OneToMany(() => FormComponent, (formComponent) => formComponent.page)
  components: FormComponent[];

  @ManyToOne(() => Form, (form) => form.pages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  form: Form;
}
