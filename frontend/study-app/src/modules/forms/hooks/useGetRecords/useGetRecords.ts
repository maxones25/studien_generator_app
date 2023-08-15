import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Record } from "@modules/tasks/types";

export interface UseGetRecordsOptions {}

export const getGetRecordsKey = () => ["getRecords"];

export const useGetRecords = () => {
  return useReadRequest<Record[]>(getGetRecordsKey(), (options) =>
    apiRequest(`/records`, { ...options })
  );
}