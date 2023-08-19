import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Study } from '.';

@TypeOrmEntity()
export class StudyAttribute {
  @PrimaryColumn()
  studyId: string;

  @PrimaryColumn()
  key: string;

  @Column('json')
  value: any;

  @ManyToOne(() => Study, (study) => study.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
