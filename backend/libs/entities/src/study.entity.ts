import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { StudyAttribute, Chat, StudyMember } from '.';
import { Group, Participant, FormConfiguration, Form, Entity } from '.';

@TypeOrmEntity()
export class Study {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @Column({ unique: true })
  name: string;

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
