import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudyMember } from './study-member';
import { Group } from './group.entity';
import { Participant } from './participant.entity';

@Entity()
export class Study {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Group, (group) => group.study, {
    cascade: true,
  })
  public groups: Group[];

  @OneToMany(() => StudyMember, (studyMember) => studyMember.study, {
    cascade: true,
  })
  public members: StudyMember[];

  @OneToMany(() => Participant, (participant) => participant.study, {
    cascade: true,
  })
  public participants: Participant[];
}
