import { formatiOSDateShortWithTime } from "@modules/date/utils";
import dayjs from "dayjs";

export const formatDateTime = (date: Date) => {
  const now = dayjs();
  const givenDate = dayjs(date);

  if (givenDate.isSame(now, 'day')) {
    return givenDate.format('HH:mm');
  } else {
    return formatiOSDateShortWithTime(date); 
  }
}