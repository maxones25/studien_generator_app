import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Study } from '../..';
import { AttributeKey } from '@shared/modules/records/attribute.repository';
import { BaseEntity } from '@entities/modules/BaseEntity';

export type StudyAttributes = {
  isActive: boolean;
  duration: number | null;
  startDate: string | null;
  endDate: string | null;
};

export class BaseStudyAttribute extends BaseEntity {
  @PrimaryColumn()
  studyId: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value: AttributeKey<StudyAttributes>): string => value,
      from: (value: string): AttributeKey<StudyAttributes> =>
        value as AttributeKey<StudyAttributes>,
    },
  })
  key: AttributeKey<StudyAttributes>;

  @Column('json')
  value: any;
}

@TypeOrmEntity()
export class StudyAttribute extends BaseStudyAttribute {
  @ManyToOne(() => Study, (study) => study.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
