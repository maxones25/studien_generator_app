import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export interface UseGetNotificationsOptions {}

export const getGetNotificationsKey = () => ["getNotifications"];

export const useGetNotifications = () => {
  return useReadRequest<Notification[]>(getGetNotificationsKey(), (options) =>
    apiRequest(`/notifications`, { ...options })
  );
}