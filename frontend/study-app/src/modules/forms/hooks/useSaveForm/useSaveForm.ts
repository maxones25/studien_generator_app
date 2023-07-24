import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Record } from "@modules/forms/types";

export interface UseSaveFormOptions {}

export const useSaveForm = () => {
  return useWriteRequest<Record, unknown>((options) =>
    apiRequest(`/records`, { method: "POST", ...options }), {
      onSuccess: ({ snackbar }) => {
        snackbar.showSuccess('saved');
      },
    }
  );
}