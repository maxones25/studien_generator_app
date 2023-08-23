import { isValid, format, subtract, addDays, addMinutes } from 'date-and-time';

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

const generateDays = (startDate: Date, duration: number) => {
  return Array.from({ length: duration }, (_, i) => addDays(startDate, i));
};

const addTime = (date: Date, { hours, minutes }: Time) => {
  return addMinutes(date, hours * 60 + minutes, false);
};

export default {
  isValid,
  isoDate,
  daysInBetween,
  isBefore,
  isAfter,
  addDays,
  addTime,
  generateDays,
};
