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

@Entity()
@Unique('unique_name_for_study', ['name', 'studyId'])
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  studyId: string;

  @ManyToOne(() => Study, (study) => study.groups, {
    onDelete: 'CASCADE',
  })
  study: Study;

  @OneToMany(() => Participant, (participant) => participant.group)
  participants: Participant[];
}
