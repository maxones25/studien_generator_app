import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, Unique } from 'typeorm';
import { StudyToDirector } from './studyToDirector.entity';

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

  @OneToMany(() => StudyToDirector, studyToDirector => studyToDirector.director, {
    cascade: true,
    onDelete: 'CASCADE',
})
  public studyToDirector: StudyToDirector[];
}