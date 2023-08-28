import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Notification } from "@modules/notifications/types";

export interface UseGetNotificationsOptions {}

export const getGetNotificationsKey = () => ["getNotifications"];

export const useGetNotifications = () => {
  return useReadRequest<Notification[]>(getGetNotificationsKey(), (options) =>
    apiRequest(`/notifications`, { ...options }),
    {
      staleTime: 1000 * 10,
      refetchInterval: 1000 * 60,
      refetchIntervalInBackground: true,
    }
  );
}