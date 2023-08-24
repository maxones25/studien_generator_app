import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Record } from "@modules/tasks/types";
import { Dayjs } from "dayjs";

export interface useGetRecordedEventsByDateOptions {
  date: Dayjs
}

export const getGetRecordedEventsByDateKey = (date: Dayjs) => ["getRecordedEventsByDate", date];

export const useGetRecordedEventsByDate = (options : useGetRecordedEventsByDateOptions) => {
  const date = options.date
  return useReadRequest<Record[]>(getGetRecordedEventsByDateKey(date), (options) =>
    apiRequest(`/records/events/${date.toDate()}`, {...options }),
    {
      keepPreviousData: true
    }
  );
}