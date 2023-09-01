import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { FormPage, FormField, FormComponentAttribute } from '../..';
import { IdEntity } from '@entities/modules/IdEntity';

export class BaseFormComponent extends IdEntity {
  @Column()
  pageId: string;

  @Column('integer')
  number: number;

  @Column()
  type: string;
}

@TypeOrmEntity()
@Unique('unique_number_for_form_page', ['pageId', 'number'])
export class FormComponent extends BaseFormComponent {
  @OneToMany(() => FormComponentAttribute, (attribute) => attribute.component)
  attributes: FormComponentAttribute[];

  @OneToMany(() => FormField, (formField) => formField.formComponent)
  formFields: FormField[];

  @ManyToOne(() => FormPage, (page) => page.components, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  page: FormPage;
}
