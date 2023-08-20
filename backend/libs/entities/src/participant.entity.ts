import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Group } from '.';
import { Study } from '.';
import { Record } from '.';
import { Task } from '.';
import { ParticipantAttribute } from '.';

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

  @Column({ nullable: true })
  groupId: string;

  @Column()
  studyId: string;

  @Column('text', { nullable: true })
  subscription: string;

  @OneToMany(() => ParticipantAttribute, (attribute) => attribute.participant)
  attributes: ParticipantAttribute[];

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
