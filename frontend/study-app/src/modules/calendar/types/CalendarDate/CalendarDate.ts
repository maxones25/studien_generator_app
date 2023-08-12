import { Appointment, Task } from "@modules/tasks/types";

export type CalendarDate = {
  date: Date;
  entries: CalendarListItem[];
}

export type CalendarListItem = Appointment | Task;