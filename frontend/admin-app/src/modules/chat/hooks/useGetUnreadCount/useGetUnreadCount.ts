import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetUnreadCountKey = (deps: { studyId: string }) => [
  "getUnreadCount",
  deps,
];

export const useGetUnreadCount = () => {
  const studyId = useStudyId()!;
  return useReadRequest<number>(
    getGetUnreadCountKey({ studyId }),
    (options) =>
      apiRequest(`/chats/unreadMessages`, { ...options, params: { studyId } }),
    {
      refetchInterval: 10000,
    }
  );
};
