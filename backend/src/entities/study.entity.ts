import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { StudyMember } from './study-member';
import { Group } from './group.entity';
import { Participant } from './participant.entity';
import { Entity } from './entity.entity';
import { Form } from './form.entity';
import { FormConfiguration } from './form-configuration.entity';

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
}
