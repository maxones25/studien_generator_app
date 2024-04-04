import dateApi from "date-and-time";
import dayjs from "dayjs";

export const formatIsoDate = (date: Date) => {
  return dateApi.format(date, "YYYY-MM-DD");
};

export const formatiOSDate = (date: Date) => {
  if (dayjs(date).isSame(new Date(), 'y'))
    return dayjs(date).format('dddd, D. MMMM')
  return dayjs(date).format('dddd, D. MMMM YYYY')
}

export const formatiOSDateShort = (date: Date) => {
  if (dayjs(date).isSame(new Date(), 'y'))
    return dayjs(date).format('dd, D. MMMM')
  return dayjs(date).format('dd, D. MMMM YYYY')
}
