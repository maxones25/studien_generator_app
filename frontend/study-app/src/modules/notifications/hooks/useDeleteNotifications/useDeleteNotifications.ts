import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { getGetNotificationsKey } from "..";

export const useDeleteNotifications = () => {
  return useWriteRequest<undefined, void>((options) =>
    apiRequest(`/notifications`, { method: "DELETE", ...options }),
    {
      onSuccess: ({ queryClient }) => {
        queryClient.invalidateQueries(getGetNotificationsKey());
      },
    }
  );
}