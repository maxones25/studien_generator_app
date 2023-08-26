export const ScheduleType = {
  Fix: "Fix",
  Flexible: "Flexible",
} as const;

export type ScheduleTypeType =
  (typeof ScheduleType)[keyof typeof ScheduleType];
