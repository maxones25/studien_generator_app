import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';
import {
  StudyAttribute,
  Chat,
  StudyMemberSchema,
  GroupSchema,
  ParticipantSchema,
  FormConfiguration,
  Form,
  Entity,
} from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import { Study } from '@entities/core/study';
import { AppointmentSchema } from '../appointment/appointment.entity';

export class BaseStudySchema extends IdEntity implements Study {
  @Column({ unique: true })
  name: string;
}

@TypeOrmEntity('study')
export class StudySchema extends BaseStudySchema {
  @OneToMany(() => StudyAttribute, (attribute) => attribute.study)
  attributes: StudyAttribute[];

  @OneToMany(() => GroupSchema, (group) => group.study)
  groups: GroupSchema[];

  @OneToMany(() => AppointmentSchema, (appointment) => appointment.study)
  appointments: AppointmentSchema[];

  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.study,
  )
  formConfigurations: FormConfiguration[];

  @OneToMany(() => Form, (form) => form.study)
  forms: Form[];

  @OneToMany(() => StudyMemberSchema, (studyMember) => studyMember.study)
  members: StudyMemberSchema[];

  @OneToMany(() => ParticipantSchema, (participant) => participant.study)
  participants: ParticipantSchema[];

  @OneToMany(() => Entity, (entity) => entity.study)
  entities: Entity[];

  @OneToMany(() => Chat, (chat) => chat.study)
  chats: Chat[];
}
