import { CalendarListItem } from "@modules/calendar/types";

export const getDateFromItem = (item: CalendarListItem) => {
  const result = "scheduledAt" in item ? item.scheduledAt : item.start;
  return new Date(result);
}
