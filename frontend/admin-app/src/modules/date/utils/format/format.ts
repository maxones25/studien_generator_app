import dateApi from "date-and-time";

export const formatIsoDate = (date: Date) => {
  return dateApi.format(date, "YYYY-MM-DD");
};

export const formatInputDateTime = (
  date: Date | null | string | undefined = new Date()
) => {
  if (date === undefined || date === null) return "";
  if (typeof date === "string") {
    return dateApi.format(new Date(date), "YYYY-MM-DDTH:mm", false);
  }
  return dateApi.format(date, "YYYY-MM-DDTH:mm", false);
};
