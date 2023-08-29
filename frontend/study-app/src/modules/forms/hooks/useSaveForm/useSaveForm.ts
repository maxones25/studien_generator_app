import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useDateContext } from "@modules/date/contexts";
import { Record } from "@modules/forms/types";

export interface UseSaveFormOptions {}

export const useSaveForm = () => {
  const { date } = useDateContext();

  return useWriteRequest<Record, unknown>((options) =>
    apiRequest(`/records`, { method: "POST", ...options }), {
      onSuccess: async ({ queryClient, snackbar }) => {
        await queryClient.invalidateQueries('getTasks');
        await queryClient.invalidateQueries('getRecords');
        await queryClient.invalidateQueries(date.toISOString());
        snackbar.showSuccess('saved');
      },
    }
  );
}