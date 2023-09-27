import { Entity } from '@entities/modules/core';
import { DaysOfMonth } from './DaysOfMonth';
import { DaysOfWeek } from './DaysOfWeek';
import { FormSchedulePeriod } from './FormSchedulePeriod';
import { Postpone } from './Postpone';
import { Restrict } from './Restrict';
import { FormScheduleType } from './FormScheduleType';

export type FormScheduleAttributes = Partial<{
  frequency: number;
  daysOfWeek: DaysOfWeek;
  daysOfMonth: DaysOfMonth;
  amount: number;
}>;

export interface ISchedule extends Entity {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  configId: string;
  type: FormScheduleType;
  period: FormSchedulePeriod;
  times: string[];
  postpone: Postpone;
  restrict: Restrict;
}

export class Schedule implements ISchedule, FormScheduleAttributes {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  configId: string;
  type: FormScheduleType;
  period: FormSchedulePeriod;
  times: string[];
  postpone: Postpone;
  restrict: Restrict;
  frequency?: number;
  daysOfWeek?: DaysOfWeek;
  daysOfMonth?: DaysOfMonth;
  amount?: number;

  constructor(data: Partial<ISchedule> & FormScheduleAttributes) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}
