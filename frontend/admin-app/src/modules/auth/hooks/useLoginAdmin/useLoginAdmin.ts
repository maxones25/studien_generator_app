import { AdminLoginData } from "@modules/auth/components";
import { useAccessTokenContext } from "@modules/auth/contexts";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export const useLoginAdmin = () => {
  const accessToken = useAccessTokenContext();

  return useWriteRequest<AdminLoginData, string>(
    (options) => apiRequest(`/auth/loginAdmin`, { ...options, method: "POST" }),
    {
      onSuccess({ data }) {
        accessToken.set(data);
      },
    }
  );
};
