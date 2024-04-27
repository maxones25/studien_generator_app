import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export interface UseDeleteSubscriptionOptions {}

export const useDeleteSubscription = () => {
  return useWriteRequest<undefined, unknown>((options) =>
    apiRequest(`/push`, { method: "DELETE", ...options }), {
      onSuccess: ({ snackbar }) => {
        snackbar.showSuccess('retracted');
      },
      onError: ({ snackbar }) => {
        snackbar.showError('server error');
      },
    }
  );
}