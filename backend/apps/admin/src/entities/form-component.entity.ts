import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { FormPage } from './form-page.entity';
import { FormComponentAttribute } from './form-component-attribute.entity';
import { FormField } from './form-field.entity';
import { Form } from './form.entity';

@TypeOrmEntity()
@Unique('unique_number_for_form_page', ['pageId', 'number'])
export class FormComponent {
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
  pageId: string;

  @Column('integer')
  number: number;

  @Column()
  type: string;

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
