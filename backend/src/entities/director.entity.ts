import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudyMember } from './study-member';

@Entity()
export class Director {
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
