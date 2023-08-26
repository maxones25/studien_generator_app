import { getDB } from "../../../../serviceworker/indexedDB/getDB";
import dayjs from "dayjs";
import { useQuery } from "react-query";

export interface UseGetQueueStatusOptions {}

export interface UseGetQueueStatusResult {
  getQueueStatus: () => 'red' | 'yellow' | 'green';
}

export const useGetQueueStatus = () : UseGetQueueStatusResult => {

  const getCount = useQuery({
    queryKey: ['queueCount'],
    queryFn: async () => {
      const queueDB = await getDB("workbox-background-sync");
      const result = await queueDB.count("requests");
      return result;
    },
    refetchOnReconnect: 'always',
  });
  const getLastUpdated = useQuery({
    queryKey: ['lastUpdated'],
    queryFn: async () => {
      const studyDB = await getDB();
      const metaData = await studyDB.getAll("metaData")
      const oldestDate = dayjs(Math.min(...metaData as any));
      return oldestDate;
    },
    refetchOnReconnect: 'always',
  });

  const getQueueStatus = () => {
    const count = getCount.data ?? 0;
    const lastUpdated = getLastUpdated.data ?? dayjs();
    if (count === 0 && lastUpdated.diff(dayjs(), 'hour') < 2) return 'green';
    if (count < 5 && lastUpdated.diff(dayjs(), 'day') < 1) return 'yellow';
    return 'red';
  }

  return {
    getQueueStatus,
  }
}