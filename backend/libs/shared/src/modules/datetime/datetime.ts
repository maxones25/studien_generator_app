import {
  isValid as apiIsValid,
  format,
  subtract,
  addDays,
  addMinutes,
} from 'date-and-time';

export type Time = { hours: number; minutes: number };

const isoDate = (date = new Date()) => {
  return format(date, 'YYYY-MM-DD');
};

const daysInBetween = (start: Date, end: Date) => {
  return subtract(end, start).toDays();
};

const weeksInBetween = (start: Date, end: Date) => {
  const days = daysInBetween(start, end);
  return Math.floor(days / 7);
};

const monthsInBetween = (start: Date, end: Date) => {
  return Math.abs(start.getMonth() - end.getMonth());
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

const isValid = (dateString: string, formatString: string) => {
  return apiIsValid(dateString, formatString);
};

const getLastMonday = (d: Date) => {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust for Sundays
  return new Date(d.setDate(diff));
};

const parseTimes = (times: string[]): Time[] => {
  return times.map((time) => {
    const [rawHours, rawMinutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(rawHours), parseInt(rawMinutes));
    return {
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
    };
  });
};

const getDayOfWeekIndex = (day: Date) => {
  return (day.getDay() + 6) % 7;
};

export default {
  getDayOfWeekIndex,
  isValid,
  isoDate,
  daysInBetween,
  weeksInBetween,
  monthsInBetween,
  isBefore,
  isAfter,
  addDays,
  addTime,
  generateDays,
  getLastMonday,
  parseTimes,
};
