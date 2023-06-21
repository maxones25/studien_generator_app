import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudyToDirector } from './studyToDirector.entity';

@Entity()
export class Study {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => StudyToDirector, studyToDirector => studyToDirector.study, {
    cascade: true,
})
  public studyToDirector: StudyToDirector[];
}