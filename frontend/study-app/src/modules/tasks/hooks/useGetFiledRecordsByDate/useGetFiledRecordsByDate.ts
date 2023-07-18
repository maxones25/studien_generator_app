import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export interface UseGetFiledRecordsByDateOptions {
  date: Date
}

export const getGetFiledRecordsByDateKey = () => ["getFiledReecordsByDate"];

export const useGetFiledRecordsByDate = (options? : UseGetFiledRecordsByDateOptions) => {
  const date = options?.date
  return useReadRequest<unknown[]>(getGetFiledRecordsByDateKey(), (options) =>
    apiRequest(`/filedrecords/${date}`, { ...options })
  );
}