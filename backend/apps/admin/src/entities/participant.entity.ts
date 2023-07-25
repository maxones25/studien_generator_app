import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { Study } from './study.entity';
import { ParticipantAttributes } from './participant-attributes.entity';
import { Record } from './record.entity';
import { Task } from './task.entity';

@Entity()
@Unique('unique_number_for_study', ['number', 'studyId'])
export class Participant {
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
  number: string;

  @Column()
  password: string;

  @Column()
  groupId: string;

  @Column()
  studyId: string;

  @OneToMany(() => ParticipantAttributes, (attribute) => attribute.participant)
  attributes: ParticipantAttributes[];

  @OneToMany(() => Record, (record) => record.participant)
  records: Record[];

  @OneToMany(() => Task, (task) => task.participant)
  tasks: Task[];

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
