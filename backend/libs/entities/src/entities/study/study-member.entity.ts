import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Director, Study } from '../..';
import { BaseEntity } from '@entities/modules/BaseEntity';

export class BaseStudyMember extends BaseEntity {
  @PrimaryColumn()
  public studyId: string;

  @PrimaryColumn()
  public directorId: string;

  @Column()
  public role: string;
}

@Entity()
export class StudyMember extends BaseStudyMember {
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
