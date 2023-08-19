import dateApi from "date-and-time";

export const addDays = (date: Date, days: number = 1) => {
  return dateApi.addDays(date, days);
};

export const removeDays = (date: Date, days: number = 1) => {
  return dateApi.addDays(date, -days);
};

export const isoDate = (date = new Date()) => {
  return dateApi.format(date, "YYYY-MM-DD");
};
