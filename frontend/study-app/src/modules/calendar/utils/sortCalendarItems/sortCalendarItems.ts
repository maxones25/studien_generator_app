import { CalendarListItem } from "@modules/calendar/types";
import { getDateFromItem } from "..";

export const sortCalendarItems = (items: CalendarListItem[]) => {
  return items.sort((a, b) => {
    const aTime = getDateFromItem(a).getTime();
    const bTime = getDateFromItem(b).getTime();
    return aTime - bTime;
  });
}