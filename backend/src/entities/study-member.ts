import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Director } from './director.entity';
import { Study } from './study.entity';

@Entity()
export class StudyMember {
  @PrimaryColumn()
  public studyId: string;

  @PrimaryColumn()
  public directorId: string;

  @Column()
  public role: string;

  @ManyToOne(() => Study, (study) => study.members, {
    onDelete: 'CASCADE',
  })
  public study: Study;

  @ManyToOne(() => Director, (director) => director.id, {
    onDelete: 'CASCADE',
  })
  public director: Director;
}
