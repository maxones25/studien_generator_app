import dateApi from "date-and-time";

export const formatIsoDate = (date: Date) => {
  return dateApi.format(date, "YYYY-MM-DD");
};
