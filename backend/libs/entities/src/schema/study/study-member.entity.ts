import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Director, StudySchema } from '..';
import { BaseEntity } from '@entities/modules/schema/BaseEntity';
import { Member, Role } from '@entities/core/study';

export class BaseStudyMemberSchema extends BaseEntity implements Member {
  @PrimaryColumn()
  public studyId: string;

  @PrimaryColumn()
  public directorId: string;

  @Column({
    type: 'varchar',
    length: '255',
  })
  public role: Role;
}

@Entity("study_member")
export class StudyMemberSchema extends BaseStudyMemberSchema {
  @ManyToOne(() => StudySchema, (study) => study.members, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public study: StudySchema;

  @ManyToOne(() => Director, (director) => director.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public director: Director;
}
