import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useDateContext } from "@modules/date/contexts";
import { Record } from "@modules/forms/types";
import { getGetRecordedEventsByDateKey, getGetRecordsKey, getGetTasksByDateKey, getGetTasksKey } from "@modules/tasks/hooks";

export interface UseSaveFormOptions {}

export const useSaveForm = () => {
  const { date } = useDateContext();

  return useWriteRequest<Record, unknown>((options) =>
    apiRequest(`/records`, { method: "POST", ...options }), {
      onSuccess: async ({ queryClient, snackbar }) => {
        await queryClient.invalidateQueries(getGetTasksKey());
        await queryClient.invalidateQueries(getGetRecordsKey());
        await queryClient.invalidateQueries(getGetTasksByDateKey(date));
        await queryClient.invalidateQueries(getGetRecordedEventsByDateKey(date));
        snackbar.showSuccess('saved');
      },
    }
  );
}