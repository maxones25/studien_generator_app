import { isValid, format, subtract } from 'date-and-time';

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

export default {
  isValid,
  isoDate,
  daysInBetween,
  isBefore,
  isAfter,
};
