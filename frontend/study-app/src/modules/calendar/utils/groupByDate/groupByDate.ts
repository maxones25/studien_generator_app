import { CalendarListItem } from "@modules/calendar/types";
import { getDateFromItem } from "..";

export const groupByDate = (entries: Array<CalendarListItem>) => {
  const grouped: { [dateStr: string]: CalendarListItem[] } = {};

  entries.forEach(entry => {
      const date = getDateFromItem(entry)
      const dateStr = date.toISOString().split('T')[0];  // z.B. "2023-01-10"
      if (!grouped[dateStr]) {
          grouped[dateStr] = [];
      }
      grouped[dateStr].push(entry);
})

return Object.entries(grouped).map(([dateStr, entries]) => ({
  date: new Date(dateStr),
  entries
}));
}