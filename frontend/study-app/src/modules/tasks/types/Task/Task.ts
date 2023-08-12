import { CalendarEntry } from "@modules/calendar/types";

export interface Task extends CalendarEntry{
  formId: string,
  postponedTo?: Date,
  completedAt?: Date,
}