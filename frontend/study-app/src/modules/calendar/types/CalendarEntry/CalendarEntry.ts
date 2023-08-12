export type CalendarEntry = {
  id: string;
  scheduledAt: Date;
  name: string;
}

export type CalendarDate = {
  date: Date;
  entries: CalendarEntry[];
}