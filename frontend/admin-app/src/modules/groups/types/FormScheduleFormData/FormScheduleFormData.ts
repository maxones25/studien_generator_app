import {
  FormScheduleDayOfMonth,
  FormScheduleDaysOfWeek,
  FormSchedulePeriodType,
  FormScheduleTypeType,
} from "..";

export type FormScheduleFormData = {
  id?: string;
  configId: string;
  type: FormScheduleTypeType;
  period: FormSchedulePeriodType;
  frequency: number;
  postpone: {
    isActive: boolean;
    times: number;
    duration: number;
  };
  daysOfWeek?: FormScheduleDaysOfWeek;
  dayOfMonth?: FormScheduleDayOfMonth;
};
