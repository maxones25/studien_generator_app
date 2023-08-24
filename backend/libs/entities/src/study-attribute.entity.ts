import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Study } from '.';
import { AttributeKey } from '@shared/modules/records/attribute.repository';

export type StudyAttributes = {
  isActive: boolean;
  duration: number | null;
  startDate: string | null;
  endDate: string | null;
};

@TypeOrmEntity()
export class StudyAttribute {
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

  @ManyToOne(() => Study, (study) => study.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  study: Study;
}
