import { Schedule, ScheduleDaysOfWeek } from "@modules/formConfigs/types";
import { FormScheduleDayOfMonth } from "@modules/groups/types";
import { TFunction } from "@modules/translation/types";

export const formatDayOfWeek = (dayOfWeek?: ScheduleDaysOfWeek): string[] => {
  if (!dayOfWeek) return [];
  return dayOfWeek
    .map((active, i) => {
      if (!active) return "-";
      switch (i) {
        case 0:
          return "mo";
        case 1:
          return "tu";
        case 2:
          return "we";
        case 3:
          return "th";
        case 4:
          return "fr";
        case 5:
          return "sa";
        case 6:
          return "su";
        default:
          return "-";
      }
    })
    .filter((day) => day !== "-");
};

export const formatDayOfMonth = (daysOfMonth?: FormScheduleDayOfMonth) => {
  if (!daysOfMonth) return "-";
  return daysOfMonth.sort((a, b) => (a < b ? -1 : 1)).join(", ");
};

export const formatSchedule = (t: TFunction, schedule: Schedule) => {
  const { type, period } = schedule;
  if (type === "Fix" && period === "Day") {
    return `alle ${schedule.frequency} Tage`;
  }
  if (type === "Fix" && period === "Week") {
    return formatDayOfWeek(schedule.daysOfWeek)
      .map((day) => t(day))
      .join(", ");
  }
  if (type === "Fix" && period === "Month") {
    return `am ${formatDayOfMonth(schedule.daysOfMonth)} des Monats`;
  }
  if (type === "Flexible") {
    return `${schedule.amount} mal ${t(period)}`;
  }
  return "-";
};
