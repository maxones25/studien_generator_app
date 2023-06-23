import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudyMember } from './study-member';
import { Group } from './group.entity';

@Entity()
export class Study {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Group, (group) => group.study)
  public groups: Group[];

  @OneToMany(() => StudyMember, (StudyMember) => StudyMember.study)
  public StudyMember: StudyMember[];
}
