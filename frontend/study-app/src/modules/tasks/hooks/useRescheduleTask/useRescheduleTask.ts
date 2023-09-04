import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { RescheduleTask } from "@modules/tasks/types";
import { getGetTasksKey } from "..";

export const useRescheduleTask = () => {
  return useWriteRequest<RescheduleTask, void>((options) =>
    apiRequest(`/tasks`, { method: "PUT", ...options }),
    {
      onSuccess: async ({ queryClient }) => {
        await queryClient.invalidateQueries(getGetTasksKey());
        await queryClient.invalidateQueries('getTasksByDate')
      },
    }
  );
}