import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { ChangePasswordFormData } from "@modules/settings/types";

export interface UseChangePasswordOptions {}

export const useChangePassword = () => {
  return useWriteRequest<ChangePasswordFormData, unknown>((options) =>
    apiRequest(`/auth`, { method: "PUT", ...options }), {
      onSuccess: ({ snackbar }) => {
        snackbar.showSuccess('saved');
      },
      onError: ({ snackbar }) => {
        snackbar.showError('server error');
      },
    }
  );
}