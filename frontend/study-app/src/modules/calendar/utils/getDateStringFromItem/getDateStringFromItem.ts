import { CalendarListItem } from "@modules/calendar/types";
import dayjs from "dayjs";

export const getDateStringFromItem = (item: CalendarListItem) => {
  if ("scheduledAt" in item) {
    return dayjs(item.scheduledAt).format('HH:mm');
  }
  else {
    const endString = item.end ? ` - ${dayjs(item.end).format('HH:mm')}` : '';
    const dateString = dayjs(item.start).format('HH:mm') + endString;
    return dateString;
  }
}
