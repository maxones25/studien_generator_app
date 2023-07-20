import { useAccessTokenContext } from "@modules/auth/contexts";
import { LoginFormData } from "@modules/auth/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export const useLogin = () => {
  const accessToken = useAccessTokenContext();

  return useWriteRequest<LoginFormData, { accessToken: string }>(
    async (options) => {
      const res = await apiRequest<{ accessToken: string }>(
        `/auth/login`,
        {
          ...options,
          method: "POST",
        }
      );

      if (typeof res.accessToken !== "string")
        throw new Error("accessToken invalid");

      return res;
    },
    {
      onSuccess: ({ data: { accessToken: value } }) => {
        accessToken.set(value);
      },
    }
  );
};
