import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Group } from './group.entity';
import { Study } from './study.entity';

@Entity()
@Unique('unique_number_for_study', ['number', 'studyId'])
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt: Date;

  @Column()
  number: string;

  @Column()
  password: string;

  @Column()
  groupId: string;

  @Column()
  studyId: string;

  @ManyToOne(() => Study, (study) => study.participants, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;

  @ManyToOne(() => Group, (group) => group.participants, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: Group;
}
