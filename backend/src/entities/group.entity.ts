import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Study } from './study.entity';
import { Participant } from './participant.entity';
import { EntityField } from './entity-field.entity';
import { ConcreteEntity } from './concrete-entity.entity';

@Entity()
@Unique('unique_name_for_study', ['name', 'studyId'])
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  studyId: string;

  @OneToMany(() => Participant, (participant) => participant.group)
  participants: Participant[];

  @OneToMany(() => ConcreteEntity, (entity) => entity.group)
  entities: ConcreteEntity[];

  @ManyToOne(() => Study, (study) => study.groups, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
