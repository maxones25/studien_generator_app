import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';
import {
  StudyAttribute,
  Chat,
  StudyMember,
  Group,
  Participant,
  FormConfiguration,
  Form,
  Entity,
  Appointment,
} from '../..';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import { Study } from '@entities/core/study';

@TypeOrmEntity('study')
export class StudySchema extends IdEntity implements Study {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => StudyAttribute, (attribute) => attribute.study)
  attributes: StudyAttribute[];

  @OneToMany(() => Group, (group) => group.study)
  groups: Group[];

  @OneToMany(() => Appointment, (appointment) => appointment.study)
  appointments: Appointment[];

  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.study,
  )
  formConfigurations: FormConfiguration[];

  @OneToMany(() => Form, (form) => form.study)
  forms: Form[];

  @OneToMany(() => StudyMember, (studyMember) => studyMember.study)
  members: StudyMember[];

  @OneToMany(() => Participant, (participant) => participant.study)
  participants: Participant[];

  @OneToMany(() => Entity, (entity) => entity.study)
  entities: Entity[];

  @OneToMany(() => Chat, (chat) => chat.study)
  chats: Chat[];
}
