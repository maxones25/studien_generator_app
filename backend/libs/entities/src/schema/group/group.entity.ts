import { Entity, Column, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Study, Participant, FormConfiguration, Appointment } from '../..';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import { Group } from '@entities/core/group/Group';

export class BaseGroupSchema extends IdEntity implements Group {
  @Column()
  name: string;

  @Column()
  studyId: string;
}

@Entity('group')
@Unique('unique_name_for_study', ['name', 'studyId'])
export class GroupSchema extends BaseGroupSchema {
  @OneToMany(() => Participant, (participant) => participant.group)
  participants: Participant[];

  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.group,
  )
  forms: FormConfiguration[];

  @OneToMany(() => Appointment, (appointment) => appointment.group)
  appointments: Appointment[];

  @ManyToOne(() => Study, (study) => study.groups, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
