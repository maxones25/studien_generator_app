import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Record } from "@modules/records/types";

export interface UseGetRecordsOptions {}

export const getGetRecordsKey = () => ["getRecords"];

export const useGetRecords = (options? : UseGetRecordsOptions) => {
  return useReadRequest<Record[]>(getGetRecordsKey(), (options) =>
  new Promise((resolve, reject) => {
    resolve([{
      id: "1",
      name: "test",
    },
    {
      id: "2",
      name: "test",
    }])
  })  
  // apiRequest(`/records`, { ...options })
  );
}