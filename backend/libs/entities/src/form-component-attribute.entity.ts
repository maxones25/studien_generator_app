import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { FormComponent } from '.';

@TypeOrmEntity()
export class FormComponentAttribute {
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @PrimaryColumn()
  componentId: string;

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
