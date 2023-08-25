import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Task } from "@modules/tasks/types";
import { Dayjs } from "dayjs";

export interface UseGetTasksByDateOptions {
  date: Dayjs;
}

export const getGetTasksByDateKey = (date: Dayjs) => ["getTasksByDate", date];

export const useGetTasksByDate = (options : UseGetTasksByDateOptions) => {
  const date = options.date;
  return useReadRequest<Task[]>(getGetTasksByDateKey(date), (options) =>
    apiRequest(`/tasks}`, {params: {
      date: date.toDate()
    }, ...options }),
    {
      keepPreviousData: true
    }
  );
}