import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudyMember } from './study-member';

@Entity()
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => StudyMember, (studyMember) => studyMember.director)
  public studies: StudyMember[];
}
