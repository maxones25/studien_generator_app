import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { ReadNotifications } from "@modules/notifications/types";
import { getGetNotificationsKey } from "..";

export const useReadNotifications = () => {
  return useWriteRequest<ReadNotifications, void>((options) =>
    apiRequest(`/notifications`, { method: "PUT", ...options }),
    {
      onSuccess: ({ queryClient }) => {
        queryClient.invalidateQueries(getGetNotificationsKey());
      },
    }
  );
}