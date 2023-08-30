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

export const isBefore = (start: string, end: string) => {
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()

  return startTime < endTime;
}

export const isAfter = (start: string, end: string) => {
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()

  return startTime < endTime;
}
