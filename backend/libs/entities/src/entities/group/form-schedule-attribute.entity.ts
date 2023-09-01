import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { FormSchedule } from '../..';
import { AttributeKey } from '@shared/modules/records/attribute.repository';
import { BaseEntity } from '@entities/modules/BaseEntity';

export type FormScheduleAttributes = Partial<{
  frequency: number;
  daysOfWeek: DaysOfWeek;
  daysOfMonth: DaysOfMonth;
  amount: number;
}>;

export type DaysOfWeek = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
];

export type DaysOfMonth = number[];

export class BaseFormScheduleAttribute extends BaseEntity {
  @PrimaryColumn()
  scheduleId: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
    transformer: {
      from(value) {
        return value as AttributeKey<FormScheduleAttributes>;
      },
      to(value) {
        return value;
      },
    },
  })
  key: AttributeKey<FormScheduleAttributes>;
  @Column({
    type: 'json',
    transformer: {
      from(value) {
        return value;
      },
      to(value) {
        return JSON.stringify(value);
      },
    },
  })
  value: any;
}

@TypeOrmEntity()
export class FormScheduleAttribute extends BaseFormScheduleAttribute {
  @ManyToOne(() => FormSchedule, (schedule) => schedule.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  schedule: FormSchedule;
}
