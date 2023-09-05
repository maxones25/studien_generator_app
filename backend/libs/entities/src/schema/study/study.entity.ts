import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';
import {
  StudyAttribute,
  Chat,
  StudyMemberSchema,
  Group,
  Participant,
  FormConfiguration,
  Form,
  Entity,
} from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import { Study } from '@entities/core/study';

export class BaseStudySchema extends IdEntity implements Study {
  @Column({ unique: true })
  name: string;
}

@TypeOrmEntity("study")
export class StudySchema extends BaseStudySchema {
  @OneToMany(() => StudyAttribute, (attribute) => attribute.study)
  attributes: StudyAttribute[];

  @OneToMany(() => Group, (group) => group.study)
  groups: Group[];

  @OneToMany(
    () => FormConfiguration,
    (formConfiguration) => formConfiguration.study,
  )
  formConfigurations: FormConfiguration[];

  @OneToMany(() => Form, (form) => form.study)
  forms: Form[];

  @OneToMany(() => StudyMemberSchema, (studyMember) => studyMember.study)
  members: StudyMemberSchema[];

  @OneToMany(() => Participant, (participant) => participant.study)
  participants: Participant[];

  @OneToMany(() => Entity, (entity) => entity.study)
  entities: Entity[];

  @OneToMany(() => Chat, (chat) => chat.study)
  chats: Chat[];
}
