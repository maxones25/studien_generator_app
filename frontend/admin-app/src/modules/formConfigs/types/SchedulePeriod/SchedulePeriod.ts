export const SchedulePeriod = {
  Day: "Day",
  Week: "Week",
  Month: "Month",
} as const;

export type SchedulePeriodType =
  (typeof SchedulePeriod)[keyof typeof SchedulePeriod];
