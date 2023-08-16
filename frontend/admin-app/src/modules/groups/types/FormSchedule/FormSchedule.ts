import { FormScheduleDaysOfWeek } from "..";

export type FormSchedulePostpone = {
  isActive: true;
  times: number;
  duration: number;
};

export type FormScheduleDayOfMonth = number[];

export const FormScheduleType = {
  Fix: "Fix",
} as const;

export const FormSchedulePeriod = {
  Day: "Day",
  Week: "Week",
  Month: "Month",
} as const;

export type FormScheduleTypeType =
  (typeof FormScheduleType)[keyof typeof FormScheduleType];

export type FormSchedulePeriodType =
  (typeof FormSchedulePeriod)[keyof typeof FormSchedulePeriod];

export type FormSchedule =
  | {
      id: string;
      formId: string;
      type: "Fix";
      period: "Day";
      frequency: number;
      postpone: FormSchedulePostpone;
      times: string[];
    }
    | {
      id: string;
      formId: string;
      type: "Fix";
      period: "Week";
      frequency: number;
      postpone: FormSchedulePostpone;
      times: string[];
      daysOfWeek: FormScheduleDaysOfWeek;
    }
    | {
      id: string;
      formId: string;
      type: "Fix";
      period: "Month";
      frequency: number;
      postpone: FormSchedulePostpone;
      times: string[];
      dayOfMonth: FormScheduleDayOfMonth;
    };
