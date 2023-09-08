import { Entity, Column, ManyToOne, OneToMany, Unique } from 'typeorm';
import { StudySchema, ParticipantSchema, FormConfiguration, AppointmentSchema } from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import { Group } from '@entities/core/group/Group';

export class BaseGroupSchema extends IdEntity implements Group {
  @Column()
  name: string;

  @Column()
  studyId: string;
}

@Entity("group")
@Unique('unique_name_for_study', ['name', 'studyId'])
export class GroupSchema extends BaseGroupSchema {
  @OneToMany(() => ParticipantSchema, (participant) => participant.group)
  participants: ParticipantSchema[];

  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.group,
  )
  forms: FormConfiguration[];

  @OneToMany(() => AppointmentSchema, (appointment) => appointment.group)
  appointments: AppointmentSchema[];

  @ManyToOne(() => StudySchema, (study) => study.groups, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: StudySchema;
}
