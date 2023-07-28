import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Director } from '.';
import { Study } from '.';

@Entity()
export class StudyMember {
  @PrimaryColumn()
  public studyId: string;

  @PrimaryColumn()
  public directorId: string;

  @Column()
  public role: string;

  @ManyToOne(() => Study, (study) => study.members, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public study: Study;

  @ManyToOne(() => Director, (director) => director.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public director: Director;
}
