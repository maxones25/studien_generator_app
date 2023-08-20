import { isValid, format, subtract, addDays } from 'date-and-time';

export type Time = { hours: number; minutes: number };

const isoDate = (date = new Date()) => {
  return format(date, 'YYYY-MM-DD');
};

const daysInBetween = (start: Date, end: Date) => {
  return subtract(end, start).toDays();
};

const isBefore = (source: Date, target: Date) => {
  return daysInBetween(source, target) > 0;
};

const isAfter = (source: Date, target: Date) => {
  return daysInBetween(source, target) < 0;
};

const generateDays = (startDate: Date, duration: number, times: Time[]) => {
  return Array.from({ length: duration }, (_, i) =>
    addDays(startDate, i),
  ).reduce(
    (days, day) => [
      ...days,
      ...times.map(({ hours, minutes }) => {
        day.setHours(hours);
        day.setMinutes(minutes);
        return day;
      }),
    ],
    [],
  );
};

export default {
  isValid,
  isoDate,
  daysInBetween,
  isBefore,
  isAfter,
  addDays,
  generateDays,
};
