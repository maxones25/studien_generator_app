import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { StudyMember } from './study-member';
import { Group } from './group.entity';
import { Participant } from './participant.entity';
import { AbstractEntity } from './abstract-entity.entity';
import { ConcreteEntity } from './concrete-entity.entity';

@TypeOrmEntity()
export class Study {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Group, (group) => group.study)
  public groups: Group[];

  @OneToMany(() => StudyMember, (studyMember) => studyMember.study)
  public members: StudyMember[];

  @OneToMany(() => Participant, (participant) => participant.study)
  public participants: Participant[];

  @OneToMany(() => AbstractEntity, (entity) => entity.study)
  public abstractEntities: AbstractEntity[];

  @OneToMany(() => ConcreteEntity, (entity) => entity.study)
  public entities: ConcreteEntity[];
}
