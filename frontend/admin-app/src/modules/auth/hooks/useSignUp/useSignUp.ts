import { SignUpFormData } from "@modules/auth/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export const useSignUp = () => {
  return useWriteRequest<SignUpFormData, void>((options) =>
    apiRequest(`/auth/signUp`, { method: "POST", ...options })
  );
};
