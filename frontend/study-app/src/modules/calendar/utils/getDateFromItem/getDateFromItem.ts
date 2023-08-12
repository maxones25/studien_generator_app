import { CalendarListItem } from "@modules/calendar/types";

export const getDateFromItem = (item: CalendarListItem) => {
  return "scheduledAt" in item ? item.postponedTo ?? item.scheduledAt : item.start;
}
