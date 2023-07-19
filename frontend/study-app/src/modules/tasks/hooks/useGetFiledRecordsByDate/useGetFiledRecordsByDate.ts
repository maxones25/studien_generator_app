import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { RecordedEvent } from "@modules/tasks/types";

export interface UseGetFiledRecordsByDateOptions {
  date: Date
}

export const getGetFiledRecordsByDateKey = (date: Date) => ["getFiledReecordsByDate" + date.toString];

export const useGetFiledRecordsByDate = (options? : UseGetFiledRecordsByDateOptions) => {
  const date = options?.date ?? new Date()
  return useReadRequest<RecordedEvent[]>(getGetFiledRecordsByDateKey(date), (options) =>
    apiRequest(`/recordedevents/${date}`, { ...options })
  );
}