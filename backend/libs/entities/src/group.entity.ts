import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Study } from '.';
import { Participant } from '.';
import { FormConfiguration } from './form-configuration.entity';

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

  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.group,
  )
  forms: FormConfiguration[];

  @ManyToOne(() => Study, (study) => study.groups, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
