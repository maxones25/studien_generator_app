import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Form, FormComponent } from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseFormPage extends IdEntity {
  @Column()
  formId: string;

  @Column('integer')
  number: number;
}

@TypeOrmEntity()
@Unique('unique_number_for_form', ['formId', 'number'])
export class FormPage extends BaseFormPage {
  @OneToMany(() => FormComponent, (formComponent) => formComponent.page)
  components: FormComponent[];

  @ManyToOne(() => Form, (form) => form.pages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  form: Form;
}
