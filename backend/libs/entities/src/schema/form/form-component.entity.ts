import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { FormPage, FormField, FormComponentAttribute } from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseFormComponent extends IdEntity {
  @Column()
  pageId: string;

  @Column('integer')
  number: number;

  @Column()
  type: string;
}

@TypeOrmEntity()
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
