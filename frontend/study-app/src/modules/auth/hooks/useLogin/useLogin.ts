import { useAccessTokenContext } from "@modules/auth/contexts";
import { LoginFormData } from "@modules/auth/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export const useLogin = () => {
  const accessToken = useAccessTokenContext();

  return useWriteRequest<LoginFormData, { accessToken: string }>(
    (options) =>
      apiRequest(`/auth/participants/login`, { ...options, method: "POST" }),
    {
      onSuccess: ({ data: { accessToken: value }}) => {
        accessToken.set(value);
      },
    }
  );
};
