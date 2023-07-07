import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Record } from "@modules/records/types";

export interface UseGetRecordsOptions {}

export const getGetRecordsKey = () => ["getRecords"];

export const useGetRecords = (options? : UseGetRecordsOptions) => {
  return useReadRequest<Record[]>(getGetRecordsKey(), (options) =>
    apiRequest(`/records`, { ...options })
  );
}