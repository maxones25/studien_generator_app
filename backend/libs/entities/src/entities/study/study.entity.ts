import { Column, OneToMany, Entity as TypeOrmEntity } from 'typeorm';
import { StudyAttribute, Chat, StudyMember } from '../..';
import { Group, Participant, FormConfiguration, Form, Entity } from '../..';
import { IdEntity } from '@entities/modules/IdEntity';

export class BaseStudy extends IdEntity {
  @Column({ unique: true })
  name: string;
}

@TypeOrmEntity()
export class Study extends BaseStudy {
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

  @OneToMany(() => StudyMember, (studyMember) => studyMember.study)
  members: StudyMember[];

  @OneToMany(() => Participant, (participant) => participant.study)
  participants: Participant[];

  @OneToMany(() => Entity, (entity) => entity.study)
  entities: Entity[];

  @OneToMany(() => Chat, (chat) => chat.study)
  chats: Chat[];
}
