import { Entity, Column, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Study, Participant, FormConfiguration } from '../..';
import { IdEntity } from '@entities/modules/IdEntity';

export class BaseGroup extends IdEntity {
  @Column({
    type: 'datetime',
    nullable: true,
  })
  deletedAt: Date;

  @Column()
  name: string;

  @Column()
  studyId: string;
}

@Entity()
@Unique('unique_name_for_study', ['name', 'studyId'])
export class Group extends BaseGroup {
  @OneToMany(() => Participant, (participant) => participant.group)
  participants: Participant[];

  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.group,
  )
  forms: FormConfiguration[];

  @ManyToOne(() => Study, (study) => study.groups, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
