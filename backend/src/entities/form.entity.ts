import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Entity } from './entity.entity';
import { Group } from './group.entity';

@TypeOrmEntity()
@Unique('unique_form_for_group', ['entityId', 'groupId'])
export class Form {
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

  @Column()
  entityId: string;

  @Column({ nullable: true })
  groupId: string;

  @Column()
  active: boolean;

  @Column('json')
  data: any;

  @ManyToOne(() => Group, (group) => group.forms, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  group: Group;

  @ManyToOne(() => Entity, (entity) => entity.forms, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  entity: Entity;
}
