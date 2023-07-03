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
  public groups: Group[];

  @OneToMany(() => StudyMember, (studyMember) => studyMember.study)
  public members: StudyMember[];

  @OneToMany(() => Participant, (participant) => participant.study)
  public participants: Participant[];

  @OneToMany(() => Entity, (entity) => entity.study)
  public entities: Entity[];
}
