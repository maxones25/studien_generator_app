import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { StudyToDirector } from './studyToDirector.entity';

@Entity()
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => StudyToDirector, studyToDirector => studyToDirector.director, {
    cascade: true,
})
  public studyToDirector: StudyToDirector[];
}