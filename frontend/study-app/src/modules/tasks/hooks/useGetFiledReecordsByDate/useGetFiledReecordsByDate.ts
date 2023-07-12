import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export interface UseGetFiledReecordsByDateOptions {
  date: Date
}

export const getGetFiledReecordsByDateKey = () => ["getFiledReecordsByDate"];

export const useGetFiledReecordsByDate = (options? : UseGetFiledReecordsByDateOptions) => {
  const date = options?.date
  return useReadRequest<unknown[]>(getGetFiledReecordsByDateKey(), (options) =>
    apiRequest(`/filedrecords/${date}`, { ...options })
  );
}