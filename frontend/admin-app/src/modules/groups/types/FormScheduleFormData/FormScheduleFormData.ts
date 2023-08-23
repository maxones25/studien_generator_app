import {
  FormScheduleDayOfMonth,
  FormScheduleDaysOfWeek,
  FormSchedulePeriod,
  FormScheduleType,
} from "..";

type BaseFormSchedule = {
  id?: string;
  configId: string;
  postpone: {
    times: number;
    duration: number;
  } | null;
};

type SpecificFormSchedule =
  | {
      type: typeof FormScheduleType.Fix;
      period: typeof FormSchedulePeriod.Day;
      times: string[];
      frequency: number;
    }
  | {
      type: typeof FormScheduleType.Fix;
      period: typeof FormSchedulePeriod.Week;
      times: string[];
      frequency: number;
      daysOfWeek: FormScheduleDaysOfWeek;
    }
  | {
      type: typeof FormScheduleType.Fix;
      period: typeof FormSchedulePeriod.Month;
      times: string[];
      frequency: number;
      dayOfMonth: FormScheduleDayOfMonth;
    }
  | {
      type: typeof FormScheduleType.Flexible;
      period: typeof FormSchedulePeriod.Week;
      times: string[];
      amount: number;
    }
  | {
      type: typeof FormScheduleType.Flexible;
      period: typeof FormSchedulePeriod.Month;
      times: string[];
      amount: number;
    };

export type FormScheduleFormData = BaseFormSchedule & SpecificFormSchedule;
