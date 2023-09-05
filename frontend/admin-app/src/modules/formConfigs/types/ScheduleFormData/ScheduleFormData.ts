import {
  ScheduleDaysOfMonth,
  ScheduleDaysOfWeek,
  SchedulePeriod,
  ScheduleType,
} from "@modules/formConfigs/types";

type BaseFormSchedule = {
  configId: string;
  times: string[];
  postpone: {
    times: number;
    duration: number;
  } | null;
  restrict: {
    before: number;
    after: number;
  } | null;
};

type SpecificFormSchedule =
  | {
      type: typeof ScheduleType.Fix;
      period: typeof SchedulePeriod.Day;
      frequency: number;
    }
  | {
      type: typeof ScheduleType.Fix;
      period: typeof SchedulePeriod.Week;
      frequency: number;
      daysOfWeek: ScheduleDaysOfWeek;
    }
  | {
      type: typeof ScheduleType.Fix;
      period: typeof SchedulePeriod.Month;
      frequency: number;
      daysOfMonth: ScheduleDaysOfMonth;
    }
  | {
      type: typeof ScheduleType.Flexible;
      period: typeof SchedulePeriod.Week;
      amount: number;
    }
  | {
      type: typeof ScheduleType.Flexible;
      period: typeof SchedulePeriod.Month;
      amount: number;
    };

export type BaseSchedule = BaseFormSchedule & SpecificFormSchedule;
export type ScheduleFormData = BaseSchedule & { id?: string };
