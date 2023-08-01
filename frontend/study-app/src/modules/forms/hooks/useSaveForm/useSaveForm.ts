import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useDateContext } from "@modules/date/contexts";
import { Record } from "@modules/forms/types";
import { getGetRecordedEventsByDateKey } from "@modules/tasks/hooks";

export interface UseSaveFormOptions {}

export const useSaveForm = () => {
  const { date } = useDateContext();

  return useWriteRequest<Record, unknown>((options) =>
    apiRequest(`/records`, { method: "POST", ...options }), {
      onSuccess: ({ queryClient, snackbar }) => {
        queryClient.invalidateQueries(getGetRecordedEventsByDateKey(date));
        snackbar.showSuccess('saved');
      },
    }
  );
}