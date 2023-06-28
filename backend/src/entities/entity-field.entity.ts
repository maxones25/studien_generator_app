import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { ConcreteEntity } from './concrete-entity.entity';

@TypeOrmEntity()
@Unique('unique_name_for_entity', ['name', 'abtractEntityId'])
export class EntityField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  abtractEntityId: string;

  @Column({ nullable: true })
  concreteEntityId: string;

  @ManyToOne(() => AbstractEntity, (entity) => entity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  abstractEntity: AbstractEntity;

  @ManyToOne(() => ConcreteEntity, (entity) => entity.fields, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  concreteEntity: ConcreteEntity;
}
