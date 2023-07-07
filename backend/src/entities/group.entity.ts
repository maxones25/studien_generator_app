import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Study } from './study.entity';
import { Participant } from './participant.entity';
import { EntityField } from './entity-field.entity';
import { EntityFieldAttribute } from './entity-field-attribute.entity';
import { Form } from './form.entity';

@Entity()
@Unique('unique_name_for_study', ['name', 'studyId'])
export class Group {
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
  name: string;

  @Column()
  studyId: string;

  @OneToMany(() => Participant, (participant) => participant.group)
  participants: Participant[];

  @OneToMany(() => EntityField, (field) => field.group)
  fields: EntityField[];

  @OneToMany(() => EntityFieldAttribute, (attribute) => attribute.group)
  attributes: EntityField[];

  @OneToMany(() => Form, (form) => form.group)
  forms: Form[];

  @ManyToOne(() => Study, (study) => study.groups, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
