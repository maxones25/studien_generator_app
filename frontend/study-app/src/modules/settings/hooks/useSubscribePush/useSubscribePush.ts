import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Subscription } from "@modules/settings/types";

export interface UseSubscribePushOptions {}

export const useSubscribePush = () => {
  return useWriteRequest<Subscription, unknown>((options) =>
    apiRequest(`/push`, { method: "POST", ...options }), {
      onSuccess: ({ snackbar }) => {
        snackbar.showSuccess('saved');
      },
      onError: ({ snackbar }) => {
        snackbar.showError('server error');
      },
    }
  );
}