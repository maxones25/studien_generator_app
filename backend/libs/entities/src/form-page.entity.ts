import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Form } from '.';
import { FormComponent } from '.';

@TypeOrmEntity()
@Unique('unique_number_for_form', ['formId', 'number'])
export class FormPage {
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

  @Column('integer')
  number: number;

  @OneToMany(() => FormComponent, (formComponent) => formComponent.page)
  components: FormComponent[];

  @ManyToOne(() => Form, (form) => form.pages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  form: Form;
}
